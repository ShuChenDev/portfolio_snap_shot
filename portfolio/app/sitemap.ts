import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const ROUTES = ["/", "/about", "/career"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : 0.7,
  }));
}
