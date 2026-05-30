"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useChat } from "@/components/FeaturedChat/ChatProvider";
import type { ChatContent } from "@/lib/career-content";
import { getChatComposerDelayS, getChatIntroDelayS } from "@/lib/heroAnimation";

const introDelayS = getChatIntroDelayS();
const promptDelayS = getChatComposerDelayS();
const COMPOSER_MAX_HEIGHT_PX = 240;

type ChatIntroProps = {
  chat: ChatContent;
};

export function ChatIntro({ chat }: ChatIntroProps) {
  const { prompt, setPrompt, history, isSending, sendMessage } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasText = prompt.trim().length > 0;
  const canSend = hasText && !isSending;
  const hasHistory = history.length > 0;

  const resizeComposer = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "0px";
    const nextHeight = Math.min(el.scrollHeight, COMPOSER_MAX_HEIGHT_PX);
    el.style.height = `${nextHeight}px`;
    el.style.overflowY =
      el.scrollHeight > COMPOSER_MAX_HEIGHT_PX ? "auto" : "hidden";
  }, []);

  useEffect(() => {
    resizeComposer();
  }, [prompt, resizeComposer]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col p-8 ${
        hasHistory ? "justify-end" : "items-center justify-center gap-6"
      }`}
      role="dialog"
      aria-label="Chat introduction"
    >
      {!hasHistory ? (
        <div
          className="chat-intro-in text-center"
          style={{ animationDelay: `${introDelayS}s` }}
        >
          <p className="font-serif text-3xl leading-tight font-medium text-chrome-ink md:text-4xl">
            {chat.popupLine1}
          </p>
          <p className="mt-1 font-serif text-2xl leading-tight font-medium text-chrome-ink md:text-3xl">
            {chat.popupLine2}
          </p>
          <p className="mt-3 text-sm text-chrome-ink/70">{chat.blurb}</p>
        </div>
      ) : null}

      <form
        className={`chat-prompt-in relative ${hasHistory ? "w-full" : "w-[75%]"}`}
        style={{ animationDelay: `${promptDelayS}s` }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="chat-prompt-input" className="sr-only">
          Message
        </label>
        <textarea
          ref={textareaRef}
          id="chat-prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={chat.composerPlaceholder}
          autoComplete="off"
          rows={1}
          className="chat-scroll min-h-16 w-full resize-none overflow-hidden rounded-2xl border border-white/15 bg-white/10 py-4 pr-16 pl-6 text-lg leading-relaxed text-chrome-ink outline-none placeholder:text-chrome-ink/45 focus:border-white/30 focus:bg-white/14 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className="chat-send-dot absolute right-3 bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full p-0 disabled:cursor-not-allowed"
          style={{
            backgroundColor: canSend ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={canSend ? "#111111" : "rgba(244, 239, 230, 0.45)"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 5v14M6 11l6-6 6 6" />
          </svg>
        </button>
      </form>
    </div>
  );
}
