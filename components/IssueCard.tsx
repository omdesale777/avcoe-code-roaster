import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const SEVERITY_STYLES: Record<
  Severity,
  { bg: string; text: string; border: string; label: string }
> = {
  "FATAL BUG": {
    bg: "bg-[#D9503F] text-white",
    text: "text-[#D9503F]",
    border: "border-l-[#D9503F]",
    label: "● FATAL BUG",
  },
  "CODE SMELL": {
    bg: "bg-[#EDB13E] text-black",
    text: "text-[#EDB13E]",
    border: "border-l-[#EDB13E]",
    label: "▲ CODE SMELL",
  },
  OPTIMIZATION: {
    bg: "bg-[#4FA35A] text-white",
    text: "text-[#4FA35A]",
    border: "border-l-[#4FA35A]",
    label: "◆ OPTIMIZATION",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");
  const severityStyle =
    SEVERITY_STYLES[issue.severity] || SEVERITY_STYLES["FATAL BUG"];

  return (
    <div className="bg-white rounded-[16px] brutal-border brutal-shadow-sm p-4 space-y-3 transition-transform hover:-translate-y-0.5">
      {/* Top Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-[#141414] text-white font-mono text-xs font-bold px-2 py-0.5 rounded border border-black">
            #{paddedIndex}
          </span>
          <span className="font-mono text-xs font-bold text-charcoal">
            LINE {issue.line}
          </span>
          <span
            className={`font-mono text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#141414] ${severityStyle.bg}`}
          >
            {severityStyle.label}
          </span>
        </div>
        <span className="text-xs font-sans font-semibold text-gray-500 text-right max-w-[50%] break-words">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <div
          className={`bg-[#171717] rounded-lg p-3 text-white overflow-x-auto border-l-4 ${severityStyle.border}`}
        >
          <pre className="font-mono text-xs text-[#F7F3EA] leading-relaxed">
            <code>{issue.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1.5 text-xs font-mono pt-1">
        <div className="flex items-start gap-1.5 text-gray-800">
          <span className="font-bold text-[#D9503F] shrink-0">✕ Diagnosis:</span>
          <span className="text-gray-900 font-sans leading-relaxed">
            {issue.diagnosis}
          </span>
        </div>
        <div className="flex items-start gap-1.5 text-gray-800">
          <span className="font-bold text-[#4FA35A] shrink-0">✓ Expected:</span>
          <span className="text-gray-900 font-sans leading-relaxed">
            {issue.expected}
          </span>
        </div>
      </div>
    </div>
  );
}
