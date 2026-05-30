"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { askMeAnything, ChatApiError } from "@/lib/chat-api";
import { createChatMessage } from "@/lib/chat-history";
import type { ChatHistory } from "@/lib/chat-types";

type ChatContextValue = {
  /** Current composer draft (not added to history until send). */
  prompt: string;
  setPrompt: (value: string) => void;
  history: ChatHistory;
  isSending: boolean;
  /** Appends user + agent entries; only call when the user presses send. */
  sendMessage: () => Promise<void>;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<ChatHistory>([]);
  const [isSending, setIsSending] = useState(false);

  const sendMessage = useCallback(async () => {
    const trimmed = prompt.trim();
    if (!trimmed || isSending) return;

    setIsSending(true);
    setPrompt("");

    const priorHistory = history;

    setHistory((prev) => [...prev, createChatMessage("user", trimmed)]);

    try {
      const { message } = await askMeAnything(trimmed, priorHistory);
      setHistory((prev) => [...prev, createChatMessage("agent", message)]);
    } catch (error) {
      const fallback =
        error instanceof ChatApiError && error.status === 503
          ? "The agent is unavailable. Run npm run dev and set ANTHROPIC_API_KEY in .env.local."
          : "Something went wrong. Please try again.";

      const detail =
        error instanceof ChatApiError ? error.message : fallback;

      setHistory((prev) => [...prev, createChatMessage("agent", detail)]);
    } finally {
      setIsSending(false);
    }
  }, [prompt, isSending, history]);

  const value = useMemo(
    () => ({ prompt, setPrompt, history, isSending, sendMessage }),
    [prompt, history, isSending, sendMessage],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
