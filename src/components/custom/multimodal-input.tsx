"use client";

import React, { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

import { ArrowUpIcon, StopIcon } from "@/components/custom/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useWindowSize from "@/components/custom/use-window-size";

import { Messages } from "@/lib/types";

export function MultimodalInput({
  input,
  setInput,
  isLoading,
  setIsLoading,
  setMessages,
}: {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setMessages: Dispatch<SetStateAction<Messages>>;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 0
      }px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const submitForm = async () => {
    if (input.length === 0) return;

    if (isLoading) {
      toast.error("Please wait for the model to finish its response!");
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: input, createdAt: new Date().toISOString() },
    ]);

    try {
      setIsLoading(true);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          text: data.text,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      toast.error("An error occurred while sending the message.");
      console.error("Error: ", error);
    } finally {
      setInput("");
      setIsLoading(false);
    }

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-4">
      <Textarea
        ref={textareaRef}
        placeholder="Send a message about Next.js & TypeScript ..."
        value={input}
        onChange={handleInput}
        className="min-h-[120px] overflow-hidden resize-none rounded-lg text-base bg-muted border-none"
        rows={3}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            if (isLoading) {
              toast.error("Please wait for the model to finish its response!");
            } else {
              submitForm();
            }
          }
        }}
      />

      {isLoading ? (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 text-white"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <StopIcon size={14} />
        </Button>
      ) : (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 text-white"
          onClick={(event) => {
            event.preventDefault();
            submitForm();
          }}
          disabled={input.length === 0}
        >
          <ArrowUpIcon size={14} />
        </Button>
      )}
    </div>
  );
}
