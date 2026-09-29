import { GoogleGenAI, ApiError } from "@google/genai";
import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const err = error as { message?: string };
  switch (status) {
    case 400:
      return "Invalid request or prompt format. Check your code input and try again.";
    case 403:
      return "Invalid or unauthorized API key. Please check your GEMINI_API_KEY in .env.local.";
    case 404:
      return `Model "${AI.model}" not found. Verify AI.model in config/app.config.ts.`;
    case 429:
      return "Rate limit reached. Gemini is taking a quick chai break! Please wait a moment and try again.";
    case 503:
      return "Gemini service is temporarily overloaded. Please retry in a few seconds.";
    default:
      return `Failed to analyze code (${status || "unknown"}): ${err?.message || "Internal evaluation error"}`;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = buildUserPrompt(request);

  let lastError: unknown;
  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || responseText.trim().length === 0) {
        throw new Error("Received empty response text from Gemini.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error(`Failed to parse Gemini response as JSON: ${parseErr}`);
      }

      return {
        roast: parsed.roast ?? "Bhai, code dekh ke speechless ho gaya!",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? request.code,
        takeaway:
          parsed.takeaway ??
          "Code sudhaar lo bhau, warna production mein aag lag jayegi.",
      };
    } catch (err: unknown) {
      lastError = err;
      if (err instanceof ApiError && err.status === 503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      const status = err instanceof ApiError ? err.status : undefined;
      throw new Error(friendlyErrorMessage(status, err));
    }
  }

  throw new Error(
    lastError instanceof Error ? lastError.message : "Failed after retrying."
  );
}
