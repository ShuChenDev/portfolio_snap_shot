import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { content } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";
import { absoluteUrl } from "@/lib/site";
import {
  profilePageJsonLd,
  breadcrumbJsonLd,
  jsonLdScriptProps,
} from "@/lib/jsonld";
import { ABOUT_POP_SEQUENCE, getAboutPopDelayS } from "@/lib/aboutAnimation";

function AboutPopIn({
  sequenceIndex,
  children,
  className = "",
}: {
  sequenceIndex: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`career-pop-in ${className}`.trim()}
      style={{ animationDelay: `${getAboutPopDelayS(sequenceIndex)}s` }}
    >
      {children}
    </div>
  );
}

function splitFirstWord(text: string) {
  const space = text.indexOf(" ");
  if (space === -1) return { firstWord: text, rest: "" };
  return { firstWord: text.slice(0, space), rest: text.slice(space + 1) };
}

function AboutParagraphDivider() {
  return (
    <hr
      className="my-[calc(1em+1.5rem)] border-0 border-t border-rule/50"
      aria-hidden
    />
  );
}

function NewspaperParagraph({ text }: { text: string }) {
  const { firstWord, rest } = splitFirstWord(text);
  return (
    <p className="text-left font-[Times_New_Roman,Times,serif]">
      <span className="font-bold text-[1.125em]">{firstWord}</span>
      {rest ? <> {rest}</> : null}
    </p>
  );
}

export const metadata: Metadata = pageMetadata({
  route: "/about",
  title: content.about.metaTitle,
  description: content.about.metaDescription,
  ogType: "profile",
});

export default function AboutPage() {
  const { about, nav } = content;

  return (
    <>
      <script
        {...jsonLdScriptProps(
          profilePageJsonLd({
            name: about.metaTitle,
            description: about.tldr,
            route: "/about",
          }),
        )}
      />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: nav.items.home, url: absoluteUrl("/") },
            { name: nav.items.about, url: absoluteUrl("/about") },
          ]),
        )}
      />
      <main id="main" className="flex flex-1 flex-col">
        <section className="pt-32 pb-16" aria-labelledby="about-heading">
          <Container>
            <h1
              id="about-heading"
              className="mb-10 font-serif text-4xl font-medium tracking-tight md:text-5xl"
            >
              {about.h1}
            </h1>

            <article className="about-article mx-auto max-w-[62.4rem] font-[Times_New_Roman,Times,serif]">
              <AboutPopIn
                sequenceIndex={ABOUT_POP_SEQUENCE.head}
                className="mb-10 flex justify-center"
              >
                <Image
                  src="/images/selfie1.jpg"
                  alt={about.portraitAlt}
                  width={450}
                  height={450}
                  priority
                  className="aspect-square w-full max-w-[18.2rem] rounded-[1.65rem] border border-rule/50 object-cover object-top shadow-[0_8px_24px_rgba(17,17,17,0.08)] sm:max-w-[20.8rem] md:max-w-[23.4rem]"
                />
              </AboutPopIn>

              <div>
                <AboutPopIn sequenceIndex={ABOUT_POP_SEQUENCE.paragraph1}>
                  <NewspaperParagraph text={about.paragraphs[0]} />
                </AboutPopIn>
                <AboutParagraphDivider />
                <AboutPopIn sequenceIndex={ABOUT_POP_SEQUENCE.paragraph2}>
                  <NewspaperParagraph text={about.paragraphs[1]} />
                </AboutPopIn>
                <AboutParagraphDivider />
                <AboutPopIn sequenceIndex={ABOUT_POP_SEQUENCE.paragraph3}>
                  <NewspaperParagraph text={about.paragraphs[2]} />
                </AboutPopIn>

                <AboutPopIn sequenceIndex={ABOUT_POP_SEQUENCE.voron}>
                  <figure className="mx-auto w-1/2 min-w-[16rem] indent-0">
                    <Image
                      src="/images/voron.jpg"
                      alt={about.voronCaption}
                      width={624}
                      height={416}
                      className="w-full rounded-2xl border border-rule/50 object-cover shadow-[0_8px_24px_rgba(17,17,17,0.08)]"
                    />
                    <figcaption className="mt-3 text-center font-[Times_New_Roman,Times,serif] text-sm text-ink/60">
                      {about.voronCaption}
                    </figcaption>
                  </figure>
                </AboutPopIn>
              </div>
            </article>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
