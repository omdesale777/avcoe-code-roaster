import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="bg-[#EFF2FB] border-b-2 border-black px-4 py-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
          <span>⚠️</span> Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          onClick={onClose}
          className="text-xs font-mono font-bold text-gray-500 hover:text-black px-2 py-0.5 rounded border border-transparent hover:border-black transition-colors"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. TypeError: unsupported operand type(s) for +=: 'int' and 'list' at line 4"
        className="w-full p-2.5 bg-white font-mono text-xs rounded-xl border-2 border-black brutal-shadow-sm focus:outline-none placeholder:text-gray-400"
      />
    </div>
  );
}
