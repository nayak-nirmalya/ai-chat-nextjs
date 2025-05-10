import Link from "next/link";

import { MessageIcon, VercelIcon } from "@/components/custom/icons";

export const Overview = () => {
  return (
    <div key="overview" className="max-w-[500px] mt-20 mx-4 md:mx-0">
      <div className="border-none bg-muted/50 rounded-2xl p-6 flex flex-col gap-4 text-zinc-500 text-sm dark:text-zinc-400 dark:border-zinc-700">
        <p className="flex flex-row justify-center gap-4 items-center text-zinc-900 dark:text-zinc-50">
          <VercelIcon />
          <span>+</span>
          <MessageIcon />
        </p>
        <p>
          This is an Chatbot powered by the Google Gemini model built with
          Next.js, React, TypeScript, TailwindCSS and the AI SDK by Vercel.
        </p>
        <p>
          {" "}
          It is made by Nirmalya Nayak{" "}
          <Link
            className="text-blue-500 dark:text-blue-400"
            href="https://www.nirmalya.xyz/"
            target="_blank"
          >
            Portfolio Link
          </Link>{" "}
          & GitHub Repo{" "}
          <Link
            className="text-blue-500 dark:text-blue-400"
            href="https://github.com/nayak-nirmalya/ai-chat-nextjs"
            target="_blank"
          >
            Link
          </Link>{" "}
          .
        </p>
        <p>
          You can ask me only about the Next.js and TypeScript. I'll give you
          short and concise reply only with text.
        </p>
      </div>
    </div>
  );
};
