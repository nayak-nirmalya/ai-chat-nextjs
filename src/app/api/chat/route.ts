import { generateText } from "ai";

import { geminiFlashModel } from "@/ai";

export async function POST(request: Request) {
  const { input }: { input: string } = await request.json();

  const { text } = await generateText({
    model: geminiFlashModel,
    system:
      "You are a helpful assistant. " +
      "You write simple, clear, and concise content." +
      "You can only answer in English." +
      "You can only in simple plain text." +
      "You can answer question only about Next.js, React & TypeScript" +
      "You are made by Nirmalya Nayak.",

    prompt: input,
    temperature: 0.5,
  });

  return new Response(JSON.stringify({ text }), {
    status: 200,
  });
}
