/**
 * Site configuration. User-facing prose lives in `messages/en.json` (see
 * lib/content.ts); this file holds stable facts: URLs, links, and the
 * canonical identity used for structured data.
 */
export const siteConfig = {
  /** Canonical production origin. Override per env with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shuchen.ca",
  /** Short brand name. */
  name: "Shu Chen",
  links: {
    portfolio: "https://www.shuchen.ca",
    algolite: "https://algolite.ca",
    stockmails: "https://stockmail.ca",
    github: "https://github.com/ShuChenDev",
    linkedin: "https://www.linkedin.com/in/scscscscsc",
    resume: "/resume.pdf",
  },
  /** Public contact details, shown in the nav contact menu. */
  contact: {
    phone: "+1 (613) 296-0821",
    email: "shu.chen.xm.work@gmail.com",
    studentEmail: "shu.chen060@uottawa.ca",
  },
} as const;

/**
 * Canonical identity for Person / ProfilePage structured data and on-page
 * facts. This is the single source of truth that lets search and AI engines
 * disambiguate THIS Shu Chen (陈术) — a software engineer in Ottawa, Canada —
 * from others who share the name. PII (phone/email) is intentionally absent.
 */
export const person = {
  name: "Shu Chen",
  /** Chinese name + romanized order variant, for cross-language matching. */
  alternateName: ["陈术", "Chen Shu", "Shu Chen Developer", "Shu Chen Software Engineer"],
  givenName: "Shu",
  familyName: "Chen",
  jobTitle: "Software Engineer & Developer",
  alumniOf: "University of Ottawa",
  /** Where he genuinely lives — the anchor for all geo signals. */
  homeLocation: {
    city: "Ottawa",
    region: "Ontario",
    country: "CA",
  },
  worksFor: "Correctional Service Canada",
  /**
   * Canadian locations he is genuinely open to working in (in-person or
   * remote). Used for honest `workLocation` schema and on-page copy — NOT a
   * claim of residence in each city.
   */
  availableLocations: [
    "Ottawa",
    "Toronto",
    "Waterloo",
    "Montreal",
    "Vancouver",
    "Canada (remote)",
  ],
  knowsAbout: [
    "Software Engineering",
    "Artificial Intelligence",
    "AI Agents",
    "Retrieval-Augmented Generation (RAG)",
    "Model Context Protocol (MCP)",
    "Full-Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Microsoft Azure",
    "Fintech",
    "Machine Learning",
  ],
  /** Off-site profiles that corroborate the same identity. */
  sameAs: [
    "https://github.com/ShuChenDev",
    "https://www.linkedin.com/in/scscscscsc",
    "https://algolite.ca",
    "https://stockmail.ca",
  ],
} as const;

/** Nav items: stable hrefs (locale prefix added at render). Labels come from the dictionary by `key`. */
export const navItems = [
  { key: "home", href: "/" },
  { key: "career", href: "/career" },
  { key: "about", href: "/about" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];

/** Build an absolute URL for a route (path starting with "/"). */
export function absoluteUrl(route: string = "/"): string {
  const normalized = route.startsWith("/") ? route : `/${route}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}
