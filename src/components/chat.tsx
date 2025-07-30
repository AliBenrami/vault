"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send } from "lucide-react";
import ThemeButton from "./theme-button";

interface chatHistory {
  role: "user" | "assistant";
  parts: {
    type?: "text" | "image" | "audio" | "video";
    text?: string;
    image?: string;
  }[];
}

interface chatState {
  history: chatHistory[];
  input: string;
  isLoading: boolean;
}

const Chat = () => {
  const [chatState, setChatState] = useState<chatState>({
    history: [],
    input: "",
    isLoading: false,
  });

  const scrollToBottom = () => {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const handleSend = () => {
    if (chatState.input.trim() === "") return;

    scrollToBottom();

    const currentHistory: chatHistory[] = [
      ...chatState.history,
      { role: "user", parts: [{ text: chatState.input }] },
    ] as chatHistory[];

    setChatState({
      ...chatState,
      history: currentHistory,
      input: "",
      isLoading: true,
    });

    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        prompt: chatState.input,
        history: chatState.history,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to call RAG LLM");
        }
        return res.json();
      })
      .then((data) => {
        setChatState({
          ...chatState,
          history: [
            ...currentHistory,
            { role: "assistant", parts: [{ text: data.response }] },
          ],
          isLoading: false,
          input: "",
        });
      })
      .catch((err) => {
        console.error(err);
        setChatState({
          ...chatState,
          isLoading: false,
          input: "",
        });
      });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
      <Card className="w-full h-[80%] overflow-y-auto">
        <CardContent className="flex flex-col-reverse gap-2 overflow-y-auto scrollbar-hidden chat-container">
          {chatState.history.toReversed().map((message, index) => (
            <div
              key={index}
              className={
                "flex flex-col gap-2" +
                (message.role === "user" ? " items-end" : " items-start")
              }
            >
              <CardDescription>{message.role}</CardDescription>
              {message.parts.map((part, index) => (
                <div
                  className={
                    message.role === "user"
                      ? "bg-gray-100 dark:bg-gray-800 p-2 rounded-md"
                      : ""
                  }
                  key={index}
                >
                  <CardDescription>{part.text}</CardDescription>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex flex-row gap-4 w-full">
        <Textarea
          placeholder="Ask me anything..."
          className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none"
          rows={1}
          value={chatState.input}
          onChange={(e) =>
            setChatState({ ...chatState, input: e.target.value })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button variant="outline" className="w-24 h-24" onClick={handleSend}>
          <Send className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
