import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeaturedChat } from "@/components/FeaturedChat";
import { SelectedWork } from "@/components/SelectedWork";
import { FeatureDuo } from "@/components/FeatureDuo";
import { ProfileFaq } from "@/components/ProfileFaq";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { content } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";
import {
  profilePageJsonLd,
  faqPageJsonLd,
  jsonLdScriptProps,
} from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  route: "/",
  title: content.home.metaTitle,
  description: content.home.metaDescription,
  ogType: "profile",
});

export default function HomePage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          profilePageJsonLd({
            name: content.home.metaTitle,
            description: content.profile.tldr,
            route: "/",
          }),
        )}
      />
      <script {...jsonLdScriptProps(faqPageJsonLd(content.profile.faq))} />
      <main id="main" className="flex flex-1 flex-col">
        <Container className="relative">
          <Hero content={content.hero} />
          <FeaturedChat chat={content.chat} showIntro />
        </Container>
        <ProfileFaq content={content.profile} />
        <SelectedWork content={content.work} />
        <FeatureDuo content={content.extras} />
      </main>
      <Footer />
    </>
  );
}
