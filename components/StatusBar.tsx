import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="bg-white border-t-2 border-black py-2.5 px-4 font-mono text-xs select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 text-gray-600">
        {/* Left: Engine Status */}
        <div className="flex items-center gap-2">
          <span>STATUS:</span>
          {isRoasting ? (
            <span className="text-[#EDB13E] font-bold flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#EDB13E]"></span>
              PROCESSING...
            </span>
          ) : (
            <span className="text-[#4FA35A] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4FA35A]"></span>
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="text-gray-400 hidden sm:inline">|</span>
          <span className="text-gray-500 hidden sm:inline">ENGINE: GOOGLE GEMINI</span>
        </div>

        {/* Right: Live Tag */}
        <div className="uppercase tracking-widest text-gray-500 font-bold text-[11px]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Second Line: Understated Attribution Line */}
      <div className="text-center text-[11px] font-mono text-gray-500 tracking-wide pt-1.5 border-t border-black/10 mt-1.5">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
