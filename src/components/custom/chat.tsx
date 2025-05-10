"use client";

import { useState } from "react";
import { Loader } from "lucide-react";

import { useScrollToBottom } from "@/components/custom/use-scroll-to-bottom";
import { MultimodalInput } from "@/components/custom/multimodal-input";
import { Overview } from "@/components/custom/overview";
import { UserAvatar } from "@/components/custom/user-avatar";
import { BotAvatar } from "@/components/custom/bot-avatar";

import { Messages } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Chat() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Messages>([]);

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div className="flex flex-row justify-center pb-4 md:pb-8 h-dvh bg-background">
      <div className="flex flex-col justify-between items-center gap-4">
        <div
          ref={messagesContainerRef}
          className="flex flex-col gap-4 h-full w-dvw items-center overflow-y-scroll mt-10"
        >
          {messages.length === 0 && <Overview />}
          <div className="flex flex-col gap-4 w-md md:w-lg lg:w-xl">
            {messages.map((message, index) => (
              <div key={index} className="flex flex-row gap-2">
                <div className={cn("flex gap-2 items-center")}>
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <div className="text-base bg-muted p-3 rounded-lg">
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isLoading && (
            <Loader className="animate-spin text-muted-foreground" />
          )}
          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>

        <form className="flex flex-row gap-2 relative items-end w-full md:max-w-[500px] max-w-[calc(100dvw-32px) px-4 md:px-0">
          <MultimodalInput
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setMessages={setMessages}
          />
        </form>
      </div>
    </div>
  );
}
