"use client";

import { useEffect, useRef, useState } from "react";

// One-shot intersection observer: flips to true the first time the element
// enters the viewport and stays there. The chat chrome's rest→wide transition
// should be a one-way settle, not a yo-yo as the user scrolls past.
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
