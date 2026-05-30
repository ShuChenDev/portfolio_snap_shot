import { pageMarkdownResponse } from "@/lib/page-markdown";

/** Markdown mirror of the Career page. See lib/page-markdown.ts. */
export function GET() {
  return pageMarkdownResponse("career");
}
