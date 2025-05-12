import { google } from "@ai-sdk/google";
import { wrapLanguageModel } from "ai";

import { customMiddleware } from "@/ai/custom-middleware";

export const geminiFlashModel = wrapLanguageModel({
  model: google("gemini-2.5-flash-preview-04-17"),
  middleware: customMiddleware,
});
