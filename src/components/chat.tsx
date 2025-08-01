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
import { Link, Send } from "lucide-react";
import ThemeButton from "./theme-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./ui/separator";

interface officalChatMessage {
  role: "user" | "assistant";
  parts: {
    text: string;
  }[];
}

interface chatMessage {
  role: "user" | "assistant";
  parts: {
    text: string;
    rating: string;
    context: string[];
  }[];
}

interface chatState {
  history: chatMessage[];
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

  const handleSend = async () => {
    if (chatState.input.trim() === "") return;
    if (chatState.isLoading) return;

    scrollToBottom();

    const currentHistory: chatMessage[] = [
      ...chatState.history,
      { role: "user", parts: [{ text: chatState.input }] },
    ] as chatMessage[];

    setChatState({
      ...chatState,
      history: currentHistory,
      input: "",
      isLoading: true,
    });

    const response = await fetch("http://127.0.0.1:8000/call-rag-llm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: chatState.input,
        history: chatState.history.map((message) => ({
          role: message.role,
          parts: message.parts.map((part) => ({
            text: part.text,
          })),
        })) as officalChatMessage[],
      }),
    }).catch((err) => {
      console.error(err);
      setChatState({
        ...chatState,
        input: "",
        isLoading: false,
      });
    });

    if (!response) return;

    const data = await response.json();

    setChatState({
      ...chatState,
      history: [
        ...currentHistory,
        {
          role: "assistant",
          parts: [
            {
              text: data.response,
              rating: data.confidence_rating,
              context: data.doc_chunks,
            },
          ],
        },
      ],
      input: "",
      isLoading: false,
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
                  {part.rating && (
                    <CardDescription
                      className={`text-xs ${
                        parseInt(part.rating.split("/")[0]) /
                          parseInt(part.rating.split("/")[1]) >
                        0.5
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      Confidence Rating: {part.rating}
                    </CardDescription>
                  )}
                  {part.context && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="outline">Context</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[300px]">
                        {part.context.map((chunk, index) => (
                          <div key={index} className="flex flex-col gap-2">
                            <DropdownMenuItem
                              key={index}
                              className="flex flex-col gap-2"
                            >
                              <CardDescription className="text-sm whitespace-pre-wrap">
                                {chunk}
                              </CardDescription>
                            </DropdownMenuItem>
                            <Separator />
                          </div>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
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
        <Button
          variant="outline"
          className="w-24 h-24 hover:scale-110 active:scale-95 transition-all duration-300"
          onClick={handleSend}
          disabled={chatState.isLoading}
        >
          <Send className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
