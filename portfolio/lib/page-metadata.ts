import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";

/**
 * Build per-page `Metadata` with the SEO defaults every page must have:
 * unique title/description, canonical, and OpenGraph + Twitter card. The
 * OG/Twitter image is inherited from the root `opengraph-image` file.
 */
export function pageMetadata(opts: {
  /** Route, e.g. "/about" or "/". */
  route: string;
  title: string;
  description: string;
  ogType?: "website" | "profile" | "article";
}): Metadata {
  const url = absoluteUrl(opts.route);
  return {
    // Absolute: each page title already contains "Shu Chen", so we bypass the
    // layout's "%s — Shu Chen" template to avoid a doubled name.
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      siteName: siteConfig.name,
      title: opts.title,
      description: opts.description,
      url,
      locale: "en_US",
      type: opts.ogType ?? "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}
