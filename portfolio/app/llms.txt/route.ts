import { NextResponse } from "next/server";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { content } from "@/lib/content";

/**
 * /llms.txt — curated index of the site for AI answer engines.
 * Convention: https://llmstxt.org/. Each entry points at the clean `.md`
 * mirror of a page (see app/*.md/route.ts).
 */
export const dynamic = "force-static";

const ROUTES = [
  { md: "/index.md", title: content.home.metaTitle, desc: content.home.metaDescription },
  { md: "/about.md", title: content.about.metaTitle, desc: content.about.metaDescription },
  { md: "/career.md", title: content.career.metaTitle, desc: content.career.metaDescription },
];

export function GET() {
  const lines: string[] = [];
  lines.push(`# ${content.site.name} (陈术)`);
  lines.push("");
  lines.push(`> ${content.site.description}`);
  lines.push("");
  lines.push("## Pages");
  lines.push("");
  for (const r of ROUTES) {
    lines.push(`- [${r.title}](${absoluteUrl(r.md)}): ${r.desc}`);
  }
  lines.push("");

  return new NextResponse(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "x-source": `${siteConfig.name} llms.txt`,
    },
  });
}
