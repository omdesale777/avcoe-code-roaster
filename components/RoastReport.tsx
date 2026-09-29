import React from "react";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { SectionHeader } from "./SectionHeader";
import { IssueCard } from "./IssueCard";
import { FixedCode } from "./FixedCode";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string | null;
  onRetry: () => void;
  onApplyFix: (fixedCode: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const issueCount = result?.issues?.length ?? 0;
  const issueLabel = issueCount === 1 ? "1 ISSUE" : `${issueCount} ISSUES`;

  const hasCorrectedCode = Boolean(
    result?.correctedCode && result.correctedCode.trim().length > 0
  );
  const hasTakeaway = Boolean(
    result?.takeaway && result.takeaway.trim().length > 0
  );

  const takeawaySectionNumber = hasCorrectedCode ? 4 : 3;

  return (
    <div className="flex flex-col h-full bg-white rounded-[18px] brutal-border brutal-shadow-lg overflow-hidden">
      {/* 40px Header Strip */}
      <div className="h-10 bg-[#F8F4EC] px-4 border-b-2 border-black flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="bg-[#D9503F] text-white font-mono text-xs font-bold px-2 py-0.5 rounded border border-black uppercase">
            AUDIT // REPORT
          </span>
        </div>

        <div className="font-display font-bold text-xs tracking-wider uppercase text-charcoal">
          Roast Report
        </div>

        <div className="w-12" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && (
          <ErrorState error={errorMsg} onRetry={onRetry} />
        )}

        {state === "results" && result && (
          <div className="p-5 space-y-6">
            {/* Warli Geometric Divider Ribbon */}
            <div className="flex items-center justify-center gap-1 text-[11px] tracking-widest text-[#141414] select-none opacity-80 overflow-hidden py-1 border-y-2 border-black bg-[#F8F4EC]">
              <span>▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼ ▲ ▼</span>
            </div>

            {/* Section 1: Roast Verdict Card with Rubber-Stamp Score Badge */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="font-mono text-xs font-bold text-gray-500 uppercase">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>

              {(() => {
                const fatalCount = result.issues.filter(
                  (i) => i.severity === "FATAL BUG"
                ).length;
                const smellCount = result.issues.filter(
                  (i) => i.severity === "CODE SMELL"
                ).length;
                const optCount = result.issues.filter(
                  (i) => i.severity === "OPTIMIZATION"
                ).length;
                const rawScore = 100 - (fatalCount * 30 + smellCount * 15 + optCount * 8);
                const roastScore = result.issues.length === 0 ? 98 : Math.max(12, Math.min(92, rawScore));
                const scoreTag =
                  roastScore < 50
                    ? "GANGAPUR DAM DRY 💀"
                    : roastScore < 75
                    ? "ATTENDANCE SHORT, CODE SHORT 🤦"
                    : "MISAL LEVEL SPICY 🔥";

                return (
                  <div className="bg-[#F7E3A8] rounded-[18px] brutal-border brutal-shadow p-5 mb-2 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 relative z-10">
                      <div className="space-y-2 flex-1">
                        <div className="inline-flex items-center gap-1.5 bg-[#D9503F] text-white text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                          <span>🔥 VERDICT // {roastLevel.toUpperCase()} AUDIT</span>
                        </div>
                        <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#141414] leading-snug">
                          &ldquo;{result.roast}&rdquo;
                        </h3>
                        <p className="text-xs font-sans text-gray-700 italic">
                          — Desi Code Roaster, DevFest Nashik Developer Lounge
                        </p>
                      </div>

                      {/* Rubber-Stamp Score Badge */}
                      <div className="shrink-0 transform rotate-[-3deg] bg-white rounded-xl brutal-border brutal-shadow-sm p-3 text-center min-w-[125px] border-2 border-black">
                        <div className="text-[9px] font-mono font-black uppercase tracking-wider text-[#D9503F]">
                          ROAST SCORE
                        </div>
                        <div className="font-display font-black text-3xl text-[#141414] tracking-tight">
                          {roastScore}
                          <span className="text-sm text-gray-400 font-bold">/100</span>
                        </div>
                        <div className="text-[8px] font-mono font-extrabold uppercase bg-[#EDB13E] px-1.5 py-0.5 rounded mt-1 border border-black truncate">
                          {scoreTag}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Section 2: What's Wrong */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="font-mono text-xs font-bold text-gray-500 uppercase">
                  {issueLabel}
                </span>
              </SectionHeader>

              {issueCount === 0 ? (
                <div className="p-4 bg-[#F8F4EC] rounded-xl border border-black/20 text-center font-mono text-xs text-[#4FA35A] font-bold">
                  ✓ No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix (Only when correctedCode is non-empty) */}
            {hasCorrectedCode && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section 4 (or 3): Takeaway (Only when non-empty) */}
            {hasTakeaway && (
              <div>
                <SectionHeader
                  number={takeawaySectionNumber}
                  title="Takeaway"
                />
                <div className="bg-[#EFF2FB] rounded-xl brutal-border p-4 font-sans text-xs sm:text-sm text-charcoal leading-relaxed">
                  {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
