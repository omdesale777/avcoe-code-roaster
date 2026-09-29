import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULTS,
  LANGUAGES,
  LIMITS,
  ROAST_LEVELS,
} from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel } from "@/types/roast";

const VALID_LANGUAGES = new Set(LANGUAGES.map((l) => l.id));
const VALID_ROAST_LEVELS = new Set(ROAST_LEVELS.map((r) => r.id));

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const raw = (body && typeof body === "object" ? body : {}) as Record<
    string,
    unknown
  >;

  const code = typeof raw.code === "string" ? raw.code : "";
  const errorMessage =
    typeof raw.errorMessage === "string" ? raw.errorMessage.trim() : "";

  // 1. Validate empty code
  if (code.trim().length === 0) {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }

  // 2. Validate code length
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // 3. Validate error message length
  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Resolve language and roast level with fallback to defaults
  const rawLang = typeof raw.language === "string" ? raw.language : "";
  const rawRoast = typeof raw.roastLevel === "string" ? raw.roastLevel : "";

  const language: LanguageId = VALID_LANGUAGES.has(rawLang as LanguageId)
    ? (rawLang as LanguageId)
    : DEFAULTS.language;

  const roastLevel: RoastLevel = VALID_ROAST_LEVELS.has(rawRoast as RoastLevel)
    ? (rawRoast as RoastLevel)
    : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      errorMessage: errorMessage.length > 0 ? errorMessage : undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[api/roast] Error analyzing code:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
