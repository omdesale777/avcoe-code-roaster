"use client";

import React, { useState, useCallback, useEffect } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import {
  LanguageId,
  ReportState,
  RoastLevel,
  RoastResult,
} from "@/types/roast";
import { TopBar } from "./TopBar";
import { RoastControls } from "./RoastControls";
import { ErrorMessageInput } from "./ErrorMessageInput";
import { CodeEditor } from "./CodeEditor";
import { RoastReport } from "./RoastReport";
import { StatusBar } from "./StatusBar";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);

  const isRoasting = reportState === "loading";

  // Trigger Roast Handler
  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || code.trim().length === 0) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError(null);

    try {
      const result = await requestRoast({
        code,
        language,
        roastLevel,
        errorMessage: errorMessage.trim().length > 0 ? errorMessage : undefined,
      });
      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Failed to analyze code.");
      setReportState("error");
    }
  }, [code, errorMessage, isRoasting, language, roastLevel]);

  // Load Built-in Sample Bug
  const handleLoadSample = useCallback(() => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  }, []);

  // Apply Fixed Code to Editor without re-roasting
  const handleApplyFix = useCallback((fixedCode: string) => {
    setCode(fixedCode);
  }, []);

  // Global Keyboard Listener for Ctrl/Cmd + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  // errorLine: only defined when reportState === "results" && code === roastedCode
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues[0]?.line
      : undefined;

  return (
    <main className="w-full max-w-[1360px] mx-auto my-4 sm:my-6 md:my-8 px-3 sm:px-4 flex-1 flex flex-col gap-8">
      {/* Hero Section */}
      <section className="text-center pt-2 pb-2 px-4">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-white rounded-full brutal-border-sm brutal-shadow-sm px-4 py-1 mb-4 text-xs font-mono font-bold tracking-tight">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D9503F] animate-pulse" />
          <span>CODE BOL RAHA HAI · मला वाचवा!</span>
          <span className="text-gray-400">|</span>
          <span className="text-[#4C80F0]">DevFest Nashik 2026</span>
        </div>

        {/* Title with Tilted Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-3">
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#141414]">
            Code Roaster
          </h1>
          <span className="inline-block transform -rotate-2 bg-[#EDB13E] font-display font-black text-2xl sm:text-3xl md:text-4xl px-3.5 py-1 rounded-xl brutal-border-sm brutal-shadow">
            Desi Edition
          </span>
        </div>

        {/* Subheading & Local Microcopy */}
        <p className="font-sans text-base md:text-lg text-gray-700 font-medium max-w-2xl mx-auto mb-2">
          Paste your code. Pick your roast level. Get humbled. Get the fix.
        </p>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-600 bg-white/80 px-3 py-1 rounded-full border border-black/20">
          <span>⚡ Desi debugging, powered by Gemini 2.5 Flash &amp; cutting chai ☕</span>
        </div>
      </section>

      {/* Centered Workstation Card */}
      <div id="workbench" className="flex-1 flex flex-col bg-white rounded-[22px] brutal-border brutal-shadow-lg overflow-hidden min-h-[calc(100vh-14rem)]">
        {/* TopBar with Roast Controls */}
        <TopBar>
          <RoastControls
            roastLevel={roastLevel}
            onRoastLevelChange={setRoastLevel}
            language={language}
            onLanguageChange={setLanguage}
            onRoast={handleRoast}
            isRoasting={isRoasting}
            errorDrawerOpen={errorDrawerOpen}
            onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
          />
        </TopBar>

        {/* Conditionally Rendered Error Drawer */}
        {errorDrawerOpen && (
          <ErrorMessageInput
            value={errorMessage}
            onChange={setErrorMessage}
            onClose={() => setErrorDrawerOpen(false)}
          />
        )}

        {/* Responsive Split Pane (Editor ~54-55%, Report ~46-45%) */}
        <div className="flex-1 flex flex-col lg:flex-row p-4 sm:p-5 gap-5 overflow-hidden">
          {/* Left Column: Code Editor */}
          <div className="w-full lg:w-[55%] flex flex-col min-h-[420px] lg:min-h-0">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              errorLine={errorLine}
              onLoadSample={handleLoadSample}
            />
          </div>

          {/* Right Column: Roast Report */}
          <div className="w-full lg:w-[45%] flex flex-col min-h-[420px] lg:min-h-0">
            <RoastReport
              state={reportState}
              roastLevel={roastLevel}
              language={language}
              result={roastResult}
              errorMsg={apiError}
              onRetry={handleRoast}
              onApplyFix={handleApplyFix}
            />
          </div>
        </div>

        {/* StatusBar */}
        <StatusBar isRoasting={isRoasting} />
      </div>

      {/* Hall of Shame / Community Highlights Strip */}
      <section className="bg-[#F7E3A8] rounded-[22px] brutal-border brutal-shadow p-6 mb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-3 border-b-2 border-black/20">
          <div>
            <h2 className="font-display font-black text-xl text-[#141414] flex items-center gap-2">
              <span>Hall of Shame // DevFest Nashik 2026</span>
              <span className="text-xs font-mono font-normal bg-black text-white px-2 py-0.5 rounded-full">
                LIVE FEED
              </span>
            </h2>
            <p className="text-xs font-sans text-gray-700 mt-0.5">
              Live telemetry from developer laptops roasting right now at Sula Vineyards Convention Hall.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-1 border-2 border-black text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-[#D9503F] animate-ping" />
            <span>1,842 ROASTS SERVED TODAY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Metric Card 1 */}
          <div className="bg-white rounded-xl brutal-border-sm p-4 brutal-shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-500 mb-2">
              <span>STATS // METRIC</span>
              <span>🔥</span>
            </div>
            <div className="font-display font-black text-lg text-[#141414] mb-1">
              Most Roasted Bug Type
            </div>
            <p className="text-xs text-gray-600 mb-3">
              43% of submissions tonight contain unhandled Promises or mutating state directly in React components.
            </p>
            <div className="bg-[#F8F4EC] rounded-lg p-2 border border-black/10 text-xs font-mono flex justify-between font-bold">
              <span>1. React useEffect() infinite loop</span>
              <span className="text-[#D9503F]">612 roasts</span>
            </div>
          </div>

          {/* Metric Card 2 */}
          <div className="bg-white rounded-xl brutal-border-sm p-4 brutal-shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-500 mb-2">
              <span>SHARMA JI&apos;S PICK</span>
              <span className="bg-[#D9503F] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                Score: 2/100
              </span>
            </div>
            <div className="font-display font-black text-lg text-[#141414] mb-1">
              &ldquo;Code hai ya misal pav?&rdquo;
            </div>
            <p className="text-xs text-gray-600 italic mb-3">
              &ldquo;Sharma ji&apos;s son wrote clean Rust with zero runtime allocations at age 12, and here you are writing 4 nested ternary operators in a CSS style attribute.&rdquo;
            </p>
            <div className="text-[11px] font-mono text-gray-500 flex justify-between">
              <span>User: @nashik_coder_99</span>
              <span className="text-[#EDB13E] font-bold">Tikhat Level 🌶️🌶️</span>
            </div>
          </div>

          {/* Metric Card 3 */}
          <div className="bg-white rounded-xl brutal-border-sm p-4 brutal-shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-500 mb-2">
                <span>SPECIAL COMMENDATION</span>
                <span>🏆</span>
              </div>
              <div className="font-display font-black text-lg text-[#141414] mb-1">
                The &ldquo;Zero Warning&rdquo; Myth
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Only 3 developers out of 450 today passed without a single warning. Their reward? An extra cutting chai token.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                handleLoadSample();
                document.getElementById("workbench")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-[#141414] hover:bg-gray-800 text-white font-mono text-xs font-bold py-2 rounded-lg border border-black brutal-shadow-sm transition-all cursor-pointer"
            >
              CHALLENGE THE ROASTER →
            </button>
          </div>
        </div>
      </section>

      {/* Warli Pattern Ribbon Strip */}
      <div className="w-full bg-white rounded-xl border-2 border-black py-2 px-4 overflow-hidden mb-6">
        <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-[#141414] uppercase select-none text-center">
          <span>◆ ◇ ◆ ◇</span>
          <span className="font-bold">
            WARLI TRADITIONAL ART INSPIRATION • NASHIK • MAHARASHTRA • DEVFEST 2026
          </span>
          <span>◆ ◇ ◆ ◇</span>
        </div>
      </div>
    </main>
  );
}
