import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-auto space-y-4">
      <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-gray-400 flex items-center justify-center text-2xl font-mono text-gray-400 bg-white/50 select-none">
        &#123;&#125;
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h3 className="font-display font-bold text-base uppercase tracking-wider text-charcoal">
          Awaiting Code Submission
        </h3>
        <p className="font-sans text-xs text-gray-600 leading-relaxed">
          Paste your code on the left, then click &ldquo;ROAST MY CODE&rdquo; or press{" "}
          <kbd className="px-1.5 py-0.5 bg-white border border-black rounded text-[10px] shadow-[1px_1px_0px_#000] font-mono">
            Ctrl+Enter
          </kbd>{" "}
          (⌘+Enter on Mac).
        </p>
      </div>
    </div>
  );
}
