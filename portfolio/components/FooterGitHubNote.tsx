"use client";

import { usePathname } from "next/navigation";
import { isHomePathname } from "@/lib/homeMotion";

export function FooterGitHubNote({ note }: { note: string }) {
  const pathname = usePathname();

  if (!isHomePathname(pathname)) return null;

  return (
    <p className="mt-4 max-w-2xl text-[10px] leading-relaxed text-canvas/70 md:text-[11px]">
      {note}
    </p>
  );
}
