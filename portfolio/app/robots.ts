import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * robots.txt
 *
 * Default posture: allow all crawlers, including AI answer-engine bots
 * (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended,
 * Applebot-Extended, Bingbot, …). The goal here is maximum visibility in both
 * search and AI answers, so every bot is allowed. Flip individual bots to
 * `disallow` below if that ever changes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // === Opt-out templates — uncomment to block specific AI bots ===
      // { userAgent: "GPTBot", disallow: "/" },
      // { userAgent: "ClaudeBot", disallow: "/" },
      // { userAgent: "Google-Extended", disallow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
