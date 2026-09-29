import React from "react";
import { APP } from "@/config/app.config";
import { DevFest26Logo, GDGNashikLogo } from "./Logos";

interface TopBarProps {
  children: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="bg-white border-b-2 border-black p-4 flex flex-col xl:flex-row items-center justify-between gap-4">
      {/* Left: Branding & Version Tag */}
      <div className="flex items-center gap-3 shrink-0">
        <GDGNashikLogo className="h-7 md:h-8 w-auto" />
        <div className="h-6 w-[2px] bg-black/20 hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="font-display font-black tracking-tight text-base uppercase text-charcoal">
            {APP.name}
          </span>
          <span className="font-mono text-[10px] font-bold bg-[#F7E3A8] text-charcoal px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#141414]">
            {APP.version}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 bg-[#F7E3A8] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#141414]">
            🌶️ DESI
          </span>
        </div>
      </div>

      {/* Right: DevFest Logo & Controls */}
      <div className="w-full xl:w-auto flex-1 flex items-center justify-end gap-3">
        <div className="hidden 2xl:block shrink-0">
          <DevFest26Logo className="h-7 w-auto" />
        </div>
        {children}
      </div>
    </header>
  );
}
