import { streamText } from "ai";

import { geminiFlashModel } from "@/ai";
import { tools } from "@/ai/tools";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = await streamText({
    model: geminiFlashModel,
    system:
      "You are a friendly assistant! You can use tools to get information.",
    messages,
    maxSteps: 5,
    tools,
    temperature: 0.5,
  });

  return result.toDataStreamResponse({});
}
