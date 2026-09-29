import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-auto space-y-4">
      <div className="w-16 h-16 rounded-2xl border-2 border-black flex items-center justify-center bg-white shadow-[3px_3px_0px_#141414]">
        <span className="text-2xl font-mono font-bold animate-spin select-none text-[#EDB13E]">
          /
        </span>
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h3 className="font-display font-bold text-base uppercase tracking-wider text-charcoal animate-pulse">
          Analyzing Code...
        </h3>
        <p className="font-sans text-xs text-gray-600 leading-relaxed">
          Evaluating computational complexity and architectural purity... Compiler ki chai thandi ho rahi hai ☕
        </p>
      </div>
    </div>
  );
}
