import React from "react";

interface ErrorStateProps {
  error?: string | null;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-auto space-y-4">
      <div className="w-16 h-16 rounded-2xl border-2 border-[#D9503F] flex items-center justify-center bg-white shadow-[3px_3px_0px_#D9503F]">
        <span className="text-2xl font-mono font-bold text-[#D9503F] select-none">
          !
        </span>
      </div>
      <div className="space-y-2 max-w-md">
        <h3 className="font-display font-bold text-base uppercase tracking-wider text-[#D9503F]">
          Analysis Failed
        </h3>
        <p className="font-sans text-xs text-gray-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-black/10">
          {error || "An unknown error occurred during code evaluation."}
        </p>
      </div>
      <div>
        <button
          onClick={onRetry}
          className="bg-white hover:bg-[#EDB13E] active:translate-x-[1px] active:translate-y-[1px] text-xs font-mono font-bold px-4 py-2 rounded-full border-2 border-black brutal-shadow-sm transition-all"
        >
          RETRY ANALYSIS ↵
        </button>
      </div>
    </div>
  );
}
