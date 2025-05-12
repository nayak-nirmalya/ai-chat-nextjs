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
        <div>
          I can help you with displaying information about:
          <ul>
            <li>* Weather for a location</li>
            <li>* Stock prices for a company</li>
            <li>* Details of a book</li>
            <li>* Details of a movie</li>
          </ul>
          Just tell me what you&apos;d like to know! For example, you could ask
          <ul>
            <li>What&apos;s the weather in London?</li>
            <li>Display stock price for Google</li>
            <li>Display book details of Beyond Good And Evil</li>
            <li>Display movie details of Avatar.</li>
          </ul>
        </div>
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
      </div>
    </div>
  );
};
