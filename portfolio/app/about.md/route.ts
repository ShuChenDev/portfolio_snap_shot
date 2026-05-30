import { pageMarkdownResponse } from "@/lib/page-markdown";

/** Markdown mirror of the About page. See lib/page-markdown.ts. */
export function GET() {
  return pageMarkdownResponse("about");
}
