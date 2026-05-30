import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import { HomeEntranceMotion } from "@/components/HomeEntranceMotion";
import { Nav } from "@/components/Nav";
import { homeEntranceMotionBootstrapScript } from "@/lib/homeMotion";
import { content } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { personJsonLd, websiteJsonLd, jsonLdScriptProps } from "@/lib/jsonld";
import "./globals.css";

const serif = Newsreader({
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${content.site.name} — ${content.site.tagline}`,
    template: `%s — ${content.site.name}`,
  },
  description: content.site.description,
  applicationName: content.site.name,
  authors: [{ name: "Shu Chen", url: siteConfig.url }],
  creator: "Shu Chen",
  keywords: [
    "Shu Chen",
    "陈术",
    "Shu Chen developer",
    "Shu Chen software engineer",
    "Shu Chen Ottawa",
    "Shu Chen Ontario",
    "Shu Chen Canada",
    "Shu Chen Toronto",
    "software engineer Ottawa",
    "University of Ottawa",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    siteName: content.site.name,
    title: `${content.site.name} — ${content.site.tagline}`,
    description: content.site.description,
    url: siteConfig.url,
    locale: "en_US",
    type: "profile",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: homeEntranceMotionBootstrapScript(),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-canvas pt-[var(--nav-offset)] font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-canvas"
        >
          {content.nav.skipToContent}
        </a>
        <script {...jsonLdScriptProps(personJsonLd(content.profile.tldr))} />
        <script {...jsonLdScriptProps(websiteJsonLd(content.site.description))} />
        <HomeEntranceMotion />
        <Nav />
        {children}
      </body>
    </html>
  );
}
