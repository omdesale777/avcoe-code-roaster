import { Type, type Schema } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "The savage, funny Hinglish roast of the submitted code.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of identified issues ordered from most to least severe.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue occurs.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity category of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short, punchy Hinglish title for the issue.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "The exact problematic code snippet from user submission.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Funny and accurate explanation in Hinglish of what is wrong.",
          },
          expected: {
            type: Type.STRING,
            description: "What the code should have done instead.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete, working, corrected code without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "A short closing takeaway or encouraging advice in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
