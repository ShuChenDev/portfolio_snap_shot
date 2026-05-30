"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

type NavLinkProps = {
  href: string;
  label: string;
};

export function NavLink({ href, label }: NavLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className="nav-link text-base">
        {label}
      </Link>
    );
  }

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!href.startsWith("#")) return;

    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
  }

  return (
    <a href={href} onClick={handleClick} className="nav-link text-base">
      {label}
    </a>
  );
}
