import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 w-full">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-600">
          Roast Level:
        </span>
        <div className="inline-flex items-center p-1 bg-[#F8F4EC] rounded-full border-2 border-black gap-1">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className={`cursor-pointer px-3 py-1 text-xs font-mono font-bold rounded-full transition-all flex items-center gap-1.5 select-none ${
                  isSelected
                    ? "bg-[#EDB13E] text-black border border-black shadow-[1px_1px_0px_#141414]"
                    : "text-gray-700 hover:text-black hover:bg-white/80"
                }`}
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="sr-only"
                />
                <span
                  className={`w-2 h-2 rounded-full border border-black ${
                    isSelected ? "bg-black" : "bg-white"
                  }`}
                />
                <span>{level.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Language + Error Drawer + CTA */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Language selector */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-white text-xs font-mono font-semibold pl-3 pr-8 py-2 rounded-full border-2 border-black brutal-shadow-sm cursor-pointer focus:outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-black">
            ▼
          </span>
        </div>

        {/* 3. Error Drawer Button */}
        <button
          type="button"
          onClick={onToggleErrorDrawer}
          className={`text-xs font-mono font-bold px-3 py-2 rounded-full border-2 border-dashed transition-all flex items-center gap-1 ${
            errorDrawerOpen
              ? "bg-[#141414] text-white border-black"
              : "bg-white text-gray-700 border-black hover:bg-[#EFF2FB]"
          }`}
        >
          <span>{errorDrawerOpen ? "−" : "+"}</span>
          <span>ERROR MESSAGE</span>
        </button>

        {/* 4. Primary Roast CTA */}
        <button
          type="button"
          disabled={isRoasting}
          onClick={onRoast}
          className={`px-5 py-2 rounded-full border-2 border-black brutal-shadow flex items-center gap-2 font-display font-black text-xs md:text-sm uppercase tracking-tight transition-all duration-75 ${
            isRoasting
              ? "bg-gray-300 text-gray-600 cursor-not-allowed animate-pulse"
              : "bg-[#EDB13E] hover:bg-[#e2a42f] text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
          }`}
        >
          <span>{isRoasting ? "ANALYZING..." : "ROAST MY CODE"}</span>
          <span className="text-[10px] font-mono font-normal bg-black text-white px-1.5 py-0.5 rounded border border-black/40">
            Ctrl ⏎
          </span>
        </button>
      </div>
    </div>
  );
}
