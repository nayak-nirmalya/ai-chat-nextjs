import { google } from "@ai-sdk/google";
import { wrapLanguageModel } from "ai";

import { customMiddleware } from "@/ai/custom-middleware";

export const geminiFlashModel = wrapLanguageModel({
  model: google("gemini-1.5-flash-002"),
  middleware: customMiddleware,
});
