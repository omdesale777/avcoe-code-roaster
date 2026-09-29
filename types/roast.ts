import { LANGUAGES, ROAST_LEVELS, SEVERITIES } from "@/config/app.config";

export type LanguageId = (typeof LANGUAGES)[number]["id"];
export type RoastLevel = (typeof ROAST_LEVELS)[number]["id"];
export type Severity = (typeof SEVERITIES)[number];

export interface RoastRequest {
  language: LanguageId;
  code: string;
  roastLevel: RoastLevel;
  errorMessage?: string;
}

export interface RoastIssue {
  line: number;
  severity: Severity;
  title: string;
  codeSnippet: string;
  diagnosis: string;
  expected: string;
}

export interface RoastResult {
  roast: string;
  issues: RoastIssue[];
  correctedCode: string;
  takeaway: string;
}

export type ReportState = "empty" | "loading" | "results" | "error";

export const isFatalBug = (issue: RoastIssue): boolean => issue.severity === "FATAL BUG";
export const isCodeSmell = (issue: RoastIssue): boolean => issue.severity === "CODE SMELL";
export const isOptimization = (issue: RoastIssue): boolean => issue.severity === "OPTIMIZATION";

