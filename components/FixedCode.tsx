"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import { SectionHeader } from "./SectionHeader";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (fixedCode: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const extension = langConfig ? langConfig.extension : "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="space-y-3">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-mono text-xs font-bold text-[#4FA35A]">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="bg-[#171717] rounded-[18px] brutal-border brutal-shadow overflow-hidden text-white">
        {/* Header strip */}
        <div className="bg-[#212121] px-4 py-2 border-b-2 border-black flex items-center justify-between">
          <span className="font-mono text-xs text-gray-300">
            solution.{extension}
          </span>
          <span className="font-mono text-[11px] font-bold text-[#4FA35A]">
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto">
          <pre className="font-mono text-xs text-[#F7F3EA] leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          onClick={handleCopy}
          className="flex-1 bg-white hover:bg-[#141414] hover:text-white active:translate-x-[1px] active:translate-y-[1px] text-xs font-mono font-bold py-2.5 px-4 rounded-full border-2 border-black brutal-shadow-sm transition-all text-center"
        >
          {copyLabel}
        </button>

        <button
          onClick={() => onApply(code)}
          className="flex-1 bg-[#EDB13E] hover:bg-[#141414] hover:text-white active:translate-x-[1px] active:translate-y-[1px] text-xs font-mono font-bold py-2.5 px-4 rounded-full border-2 border-black brutal-shadow-sm transition-all text-center"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
