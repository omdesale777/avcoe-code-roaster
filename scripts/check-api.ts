import { AI, SAMPLE } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";

async function main() {
  console.log(`[check-api] Testing model: ${AI.model} (${AI.modelLabel})...`);
  console.log(`[check-api] Target language: ${SAMPLE.language}`);
  console.log("[check-api] Sending sample buggy code to Gemini...\n");

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("================== ROAST RESULT ==================");
    console.log(`🔥 ROAST:\n${result.roast}\n`);
    console.log(`📋 ISSUES DETECTED: ${result.issues.length}`);
    result.issues.forEach((issue, i) => {
      console.log(`  ${i + 1}. [${issue.severity}] Line ${issue.line}: ${issue.title}`);
      console.log(`     Snippet: ${issue.codeSnippet}`);
      console.log(`     Diagnosis: ${issue.diagnosis}`);
      console.log(`     Expected: ${issue.expected}\n`);
    });
    console.log(`✨ CORRECTED CODE:\n${result.correctedCode}\n`);
    console.log(`💬 TAKEAWAY:\n${result.takeaway}`);
    console.log("==================================================");
    console.log("✅ [check-api] Gemini API check completed successfully!");
  } catch (error) {
    console.error("❌ [check-api] Verification failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
