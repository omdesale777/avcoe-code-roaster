"use client";

import React, { useRef, useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langConfig ? langConfig.label : "Plain Text";

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const handleSelect = () => {
    if (!textareaRef.current) return;
    const pos = textareaRef.current.selectionStart;
    const textBefore = code.slice(0, pos);
    const lineIndex = textBefore.split("\n").length;
    const lastNewline = textBefore.lastIndexOf("\n");
    const colIndex = lastNewline === -1 ? pos + 1 : pos - lastNewline;
    setCursor({ line: lineIndex, col: colIndex });
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#171717] rounded-[18px] brutal-border brutal-shadow-lg overflow-hidden text-white">
      {/* 40px Header Strip */}
      <div className="h-10 bg-[#212121] px-4 border-b-2 border-black flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D9503F] border border-black/40 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#EDB13E] border border-black/40 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#4FA35A] border border-black/40 inline-block"></span>
          <span className="font-mono text-xs text-gray-400 ml-1.5 font-bold uppercase">
            INPUT // SRC
          </span>
        </div>

        <div className="font-display font-bold text-xs tracking-wider uppercase text-gray-300">
          Your Code
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-xs font-mono font-bold text-[#4C80F0] hover:underline cursor-pointer"
          >
            SAMPLE BUG
          </button>
          <span className="text-gray-600">•</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-mono font-bold text-[#D9503F] hover:underline cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Gutter + Textarea Canvas */}
      <div className="flex-1 flex overflow-hidden relative font-mono text-xs leading-[22px] min-h-[360px]">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="w-12 py-3 pr-3 text-right bg-[#1f1f1f] text-gray-500 border-r border-black/80 select-none overflow-hidden shrink-0"
        >
          {lineNumbers.map((num) => {
            const isError = errorLine === num;
            return (
              <div
                key={num}
                className={`${
                  isError
                    ? "text-[#D9503F] font-bold bg-[#D9503F]/20 rounded-sm"
                    : ""
                }`}
              >
                {String(num).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <div className="flex-1 relative overflow-hidden bg-[#171717]">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onSelect={handleSelect}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            wrap="off"
            spellCheck={false}
            placeholder="// Paste your code here..."
            className="w-full h-full p-3 font-mono text-xs text-[#F7F3EA] bg-transparent resize-none focus:outline-none overflow-auto leading-[22px] placeholder:text-gray-600 whitespace-pre"
          />
        </div>
      </div>

      {/* Bottom Status Strip Overlay */}
      <div className="h-8 bg-[#212121] px-4 border-t border-[#333333] flex items-center justify-between text-[11px] font-mono text-gray-400 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4FA35A]"></span>
          <span>
            Ln {cursor.line}, Col {cursor.col} · {languageLabel}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>UTF-8 · Tab Size: 4</span>
        </div>
      </div>
    </div>
  );
}
