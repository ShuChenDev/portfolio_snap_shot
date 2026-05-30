import type { Metadata } from "next";
import { CareerExperience } from "@/components/CareerExperience";
import { CareerSkills } from "@/components/CareerSkills";
import { Footer } from "@/components/Footer";
import { content } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";
import { absoluteUrl } from "@/lib/site";
import {
  profilePageJsonLd,
  breadcrumbJsonLd,
  jsonLdScriptProps,
} from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  route: "/career",
  title: content.career.metaTitle,
  description: content.career.metaDescription,
  ogType: "profile",
});

export default function CareerPage() {
  const { career, nav } = content;

  return (
    <>
      <script
        {...jsonLdScriptProps(
          profilePageJsonLd({
            name: career.metaTitle,
            description: career.tldr,
            route: "/career",
          }),
        )}
      />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: nav.items.home, url: absoluteUrl("/") },
            { name: nav.items.career, url: absoluteUrl("/career") },
          ]),
        )}
      />
      <main id="main" className="flex flex-1 flex-col">
        <CareerExperience experiences={career.experiences} title={career.h1} />
        <CareerSkills
          categories={career.skillCategories}
          heading={career.skillsHeading}
        />
      </main>
      <Footer />
    </>
  );
}
