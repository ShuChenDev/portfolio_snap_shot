import { NextResponse } from "next/server";
import { content, type Content } from "./content";
import { absoluteUrl } from "./site";

export type PageKey = "home" | "about" | "career";

/**
 * Markdown mirror for AI answer engines. Serves clean, extractable plain text
 * for each page at `/<page>.md` (and `/index.md` for home), so crawlers that
 * don't execute the page's animated/client JS still get the full content.
 */

function renderHome(dict: Content): string {
  const { profile, work, site } = dict;
  const out: string[] = [];
  out.push(`# ${profile.heading}`);
  out.push("");
  out.push(`> ${profile.tldr}`);
  out.push("");
  out.push(`_Source: ${absoluteUrl("/")}_`);
  out.push("");
  out.push(profile.faq.map((f) => `## ${f.q}\n\n${f.a}`).join("\n\n"));
  out.push("");
  out.push(`## ${work.heading}`);
  out.push("");
  for (const p of work.projects) {
    out.push(`### ${p.title} — ${p.category}`);
    out.push("");
    out.push(`${p.description} (${p.href})`);
    out.push("");
  }
  out.push(`_${site.description}_`);
  return out.join("\n");
}

function renderAbout(dict: Content): string {
  const { about } = dict;
  const out: string[] = [];
  out.push(`# ${about.h1}`);
  out.push("");
  out.push(`> ${about.tldr}`);
  out.push("");
  out.push(`_Source: ${absoluteUrl("/about")}_`);
  out.push("");
  for (const para of about.paragraphs) {
    out.push(para);
    out.push("");
  }
  return out.join("\n");
}

function renderCareer(dict: Content): string {
  const { career } = dict;
  const out: string[] = [];
  out.push(`# ${career.h1}`);
  out.push("");
  out.push(`> ${career.tldr}`);
  out.push("");
  out.push(`_Source: ${absoluteUrl("/career")}_`);
  out.push("");
  out.push(`## Experience`);
  out.push("");
  for (const e of career.experiences) {
    const role = [e.role, e.roleSuffix].filter(Boolean).join(" — ");
    out.push(`### ${e.organization}${role ? ` — ${role}` : ""} (${e.period})`);
    out.push("");
    if (e.description) {
      out.push(e.description);
      out.push("");
    }
  }
  out.push(`## ${career.skillsHeading}`);
  out.push("");
  for (const cat of career.skillCategories) {
    out.push(`- **${cat.title}:** ${cat.items.join(", ")}`);
  }
  out.push("");
  return out.join("\n");
}

function renderMarkdown(pageKey: PageKey): string {
  switch (pageKey) {
    case "home":
      return renderHome(content);
    case "about":
      return renderAbout(content);
    case "career":
      return renderCareer(content);
  }
}

export function pageMarkdownResponse(pageKey: PageKey): NextResponse {
  return new NextResponse(renderMarkdown(pageKey), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
