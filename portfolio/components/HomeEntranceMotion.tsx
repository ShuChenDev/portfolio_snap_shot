"use client";

import {
  consumeSkipHomePop,
  isHomePathname,
  isSameSiteHref,
  markSkipHomePopOnNextVisit,
} from "@/lib/homeMotion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function applyHomeAnimateAttribute(skipPop: boolean) {
  if (skipPop) {
    document.documentElement.dataset.homeAnimate = "false";
    return;
  }
  delete document.documentElement.dataset.homeAnimate;
}

export function HomeEntranceMotion() {
  const pathname = usePathname();
  const previousPathnameRef = useRef<string | null>(null);
  const isFirstPathnameEffectRef = useRef(true);

  useEffect(() => {
    if (!isHomePathname(pathname)) {
      delete document.documentElement.dataset.homeAnimate;
      previousPathnameRef.current = pathname;
      return;
    }

    const previous = previousPathnameRef.current;

    if (
      !isFirstPathnameEffectRef.current &&
      previous !== null &&
      !isHomePathname(previous)
    ) {
      applyHomeAnimateAttribute(true);
    } else {
      applyHomeAnimateAttribute(consumeSkipHomePop());
    }

    isFirstPathnameEffectRef.current = false;
    previousPathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isSameSiteHref(anchor.href)) return;

      const url = new URL(anchor.href);
      if (isHomePathname(url.pathname)) {
        markSkipHomePopOnNextVisit();
      }
    }

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, []);

  return null;
}
