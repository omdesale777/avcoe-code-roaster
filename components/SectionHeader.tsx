import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const padded = String(number).padStart(2, "0");
  return (
    <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-black/10">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-bold tracking-widest uppercase text-charcoal">
          {padded} // {title}
        </span>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
