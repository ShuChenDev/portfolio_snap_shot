"use client";

import { useEffect, useId, useState } from "react";

type ContactItem = { label: string; value: string };

type NavContactMenuProps = {
  items: ContactItem[];
  label: string;
};

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.5 5.5V4.25C10.5 3.56 9.94 3 9.25 3H4.25C3.56 3 3 3.56 3 4.25V9.25C3 9.94 3.56 10.5 4.25 10.5H5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NavContactMenu({ items, label }: NavContactMenuProps) {
  const menuId = useId();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (copiedKey === null) return;
    const timer = window.setTimeout(() => setCopiedKey(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedKey]);

  async function handleCopy(item: ContactItem) {
    try {
      await copyToClipboard(item.value);
      setCopiedKey(item.label);
    } catch {
      setCopiedKey(null);
    }
  }

  return (
    <div className="group/contact relative">
      <button
        type="button"
        className="nav-link inline-flex items-center gap-1.5 text-base"
        aria-haspopup="true"
        aria-controls={menuId}
      >
        {label}
        <ChevronDownIcon className="shrink-0 transition-transform duration-200 group-hover/contact:rotate-180 group-focus-within/contact:rotate-180" />
      </button>

      <div className="invisible absolute top-full right-0 z-[60] pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover/contact:visible group-hover/contact:opacity-100 group-focus-within/contact:visible group-focus-within/contact:opacity-100">
        <div
          id={menuId}
          role="menu"
          className="w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-rule/60 bg-canvas p-2 shadow-[0_12px_40px_rgba(17,17,17,0.12)]"
        >
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const copied = copiedKey === item.label;
              return (
                <li key={item.label} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-btn-light-hover"
                    aria-label={copied ? `${item.label} copied` : `Copy ${item.label}`}
                    onClick={() => void handleCopy(item)}
                  >
                    <span className="text-xs font-medium tracking-wider text-ink/70 uppercase">
                      {item.label}
                    </span>
                    <span className="flex items-center justify-between gap-3">
                      <span className="min-w-0 text-base leading-snug font-medium text-ink md:text-lg">
                        {item.value}
                      </span>
                      <span className="flex size-11 shrink-0 items-center justify-center text-ink/70">
                        {copied ? <CheckIcon className="text-ink" /> : <CopyIcon />}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
