"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@/components/FeaturedChat/ChatProvider";

export function ChatSurface() {
  const { history, isSending } = useChat();
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
  }, [history, isSending]);

  if (history.length === 0) {
    return null;
  }

  return (
    <ol
      ref={listRef}
      aria-label="Chat history"
      className="chat-scroll absolute inset-x-0 top-8 bottom-32 z-20 mx-auto flex min-h-0 w-[85%] flex-col gap-2 overflow-y-auto px-2"
    >
      <li aria-hidden className="min-h-0 flex-1 shrink list-none" />
      {history.map((entry) => {
        const isUser = entry.role === "user";
        const bubbleClass =
          "max-w-[85%] shrink-0 rounded-2xl bg-white/15 px-4 py-2.5 text-base leading-relaxed text-chrome-ink";

        return (
          <li
            key={entry.id}
            className={isUser ? `ml-auto ${bubbleClass}` : `mr-auto ${bubbleClass}`}
          >
            <span className="sr-only">{isUser ? "You" : "Agent"}</span>
            <p className="overflow-visible whitespace-pre-wrap break-words">
              {entry.content}
            </p>
          </li>
        );
      })}
      {isSending ? (
        <li
          aria-live="polite"
          className="mr-auto max-w-[85%] shrink-0 rounded-2xl bg-white/10 px-4 py-2.5 text-base text-chrome-ink/60"
        >
          <span className="sr-only">Agent is typing</span>
          <p className="animate-pulse">Thinking…</p>
        </li>
      ) : null}
    </ol>
  );
}
