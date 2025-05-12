import { Message, streamText } from "ai";

import { geminiFlashModel } from "@/ai";

export async function POST(request: Request) {
  const { messages }: { id: string; messages: Array<Message> } =
    await request.json();

  const result = await streamText({
    model: geminiFlashModel,
    system:
      "You are a helpful assistant. " +
      "You write simple, clear, and concise content." +
      "You can only answer in English." +
      "You can only in simple plain text." +
      "You can answer question only about Next.js, React & TypeScript" +
      "You are made by Nirmalya Nayak.",
    messages,
    temperature: 0.5,
  });

  return result.toDataStreamResponse({});
}
