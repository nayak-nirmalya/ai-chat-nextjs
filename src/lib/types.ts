export type Message = {
  role: "user" | "assistant" | "system";
  text: string;
  createdAt: string;
};

export type Messages = Message[];
