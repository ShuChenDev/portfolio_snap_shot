import { siteConfig, person, absoluteUrl } from "./site";

/**
 * Render JSON-LD as a `<script type="application/ld+json">` safely.
 * `JSON.stringify` does not sanitize `<` — escape it per the Next.js docs.
 *
 * Usage:  <script {...jsonLdScriptProps(personJsonLd())} />
 */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  };
}

export interface JsonLd {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
}

/** Stable @id for the Person entity, referenced from ProfilePage / WebSite. */
const PERSON_ID = `${siteConfig.url}/#person`;

/**
 * Person — the keystone schema. Lets Google and AI answer engines resolve THIS
 * Shu Chen, a software engineer in Ottawa, Canada, as a distinct entity from
 * the actor/musician who share the name.
 */
export function personJsonLd(description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: person.name,
    alternateName: ["陈术", "Chen Shu"],
    givenName: person.givenName,
    familyName: person.familyName,
    jobTitle: person.jobTitle,
    description,
    url: siteConfig.url,
    image: `${siteConfig.url}/opengraph-image`,
    email: `mailto:${siteConfig.contact.email}`,
    nationality: { "@type": "Country", name: "Canada" },
    address: {
      "@type": "PostalAddress",
      addressLocality: person.homeLocation.city,
      addressRegion: person.homeLocation.region,
      addressCountry: person.homeLocation.country,
    },
    homeLocation: {
      "@type": "Place",
      name: `${person.homeLocation.city}, ${person.homeLocation.region}, Canada`,
    },
    workLocation: person.availableLocations.map((loc) => ({
      "@type": "Place",
      name: loc.includes("remote") ? loc : `${loc}, Canada`,
    })),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: person.alumniOf,
      sameAs: "https://www.uottawa.ca",
    },
    worksFor: { "@type": "Organization", name: person.worksFor },
    knowsAbout: [...person.knowsAbout],
    sameAs: [...person.sameAs],
  };
}

/** ProfilePage — Google's wrapper for a page that IS a person's profile. */
export function profilePageJsonLd(opts: {
  name: string;
  description: string;
  route: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(opts.route),
    name: opts.name,
    description: opts.description,
    inLanguage: "en",
    mainEntity: { "@id": PERSON_ID },
  };
}

/** WebSite — site identity; publisher points at the Person. */
export function websiteJsonLd(description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: "陈术",
    url: siteConfig.url,
    description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

/** FAQPage — for the "Who is Shu Chen?" answer block. */
export function faqPageJsonLd(items: ReadonlyArray<{ q: string; a: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** BreadcrumbList — helps search engines and AI understand hierarchy. */
export function breadcrumbJsonLd(
  trail: Array<{ name: string; url: string }>
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: step.url,
    })),
  };
}
