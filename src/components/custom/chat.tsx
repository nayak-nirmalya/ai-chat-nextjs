"use client";

import { Loader } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";

import { useScrollToBottom } from "@/components/custom/use-scroll-to-bottom";
import { MultimodalInput } from "@/components/custom/multimodal-input";
import { Overview } from "@/components/custom/overview";
import { UserAvatar } from "@/components/custom/user-avatar";
import { BotAvatar } from "@/components/custom/bot-avatar";
import { Weather } from "@/components/custom/weather";
import { Stock } from "@/components/custom/stock";
import { Book } from "@/components/custom/book";
import { Movie } from "@/components/custom/movie";
import { Blog } from "@/components/custom/blog";

import { cn } from "@/lib/utils";

export function Chat() {
  const { messages, input, setInput, handleSubmit, isLoading } = useChat();

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

                  {!message.toolInvocations ? (
                    <div className="text-base bg-muted p-3 rounded-lg">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : null}

                  <div>
                    {message.toolInvocations?.map((toolInvocation) => {
                      const { toolName, toolCallId, state } = toolInvocation;

                      if (state === "result") {
                        const { result } = toolInvocation;

                        switch (toolName) {
                          case "displayWeather":
                            return <Weather key={toolCallId} {...result} />;
                          case "displayStockPrice":
                            return <Stock key={toolCallId} {...result} />;
                          case "displayBookDetails":
                            return <Book key={toolCallId} {...result} />;
                          case "displayMovieDetails":
                            return <Movie key={toolCallId} {...result} />;
                          case "displayBlog":
                            return <Blog key={toolCallId} {...result} />;
                        }
                      } else {
                        return (
                          <div key={toolCallId}>
                            {toolName === "displayWeather" ? (
                              <div>Loading weather...</div>
                            ) : toolName === "displayStockPrice" ? (
                              <div>Loading stock price...</div>
                            ) : toolName === "displayBookDetails" ? (
                              <div>Loading book details...</div>
                            ) : toolName === "displayMovieDetails" ? (
                              <div>Loading movie details...</div>
                            ) : toolName === "displayBlog" ? (
                              <div>Generating blog ...</div>
                            ) : (
                              <div>Loading...</div>
                            )}
                          </div>
                        );
                      }
                    })}
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
            handleSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
