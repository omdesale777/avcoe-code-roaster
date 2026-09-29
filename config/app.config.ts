export const APP = {
  name: "Code Roaster",
  version: "v3",
  tagline: "Your code. Our problem now.",
} as const;

export const AI = {
  model: "gemini-2.5-flash-lite",
  modelLabel: "Gemini 2.5 Flash-Lite",
  maxAttempts: 3,
} as const;

export const ROAST_LEVELS = [
  {
    id: "dry",
    label: "Dry",
    description: "Mild and deadpan. Gentle jabs, mostly helpful.",
  },
  {
    id: "sharp",
    label: "Sharp",
    description: "Pointed and witty. Calls out every mistake directly.",
  },
  {
    id: "savage",
    label: "Savage",
    description: "Maximum burn. Brutally honest, but still technically accurate.",
  },
] as const;

export const LANGUAGES = [
  { id: "python", label: "Python", extension: "py" },
  { id: "javascript", label: "JavaScript", extension: "js" },
  { id: "typescript", label: "TypeScript", extension: "ts" },
  { id: "java", label: "Java", extension: "java" },
  { id: "c", label: "C", extension: "c" },
  { id: "cpp", label: "C++", extension: "cpp" },
  { id: "go", label: "Go", extension: "go" },
  { id: "rust", label: "Rust", extension: "rs" },
] as const;

export const DEFAULTS = {
  language: "python",
  roastLevel: "savage",
} as const;

export const SEVERITIES = ["FATAL BUG", "CODE SMELL", "OPTIMIZATION"] as const;

export const LIMITS = {
  maxCodeLength: 20_000,
  maxErrorMessageLength: 4_000,
} as const;

export const SAMPLE = {
  language: "python",
  code: `def calculate_average(numbers):
    total = 0
    for number in numbers:
        total += numbers  # Bug: adding list to int
    return total / len(numbers)

# Example usage:
scores = [85, 90, 78, 92]
print(calculate_average(scores))`,
} as const;
