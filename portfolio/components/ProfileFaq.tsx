import { Container } from "@/components/ui/Container";
import type { ProfileContent } from "@/lib/career-content";

/**
 * "Who is Shu Chen?" — the highest-leverage AEO block. Server-rendered,
 * answer-first, self-contained Q/A in semantic <dl> markup so AI answer
 * engines can lift each pair cleanly. Pairs with FAQPage JSON-LD on the page.
 */
export function ProfileFaq({ content }: { content: ProfileContent }) {
  return (
    <section
      id="about-shu-chen"
      aria-labelledby="profile-heading"
      className="pt-12 pb-12"
    >
      <Container>
        <h2
          id="profile-heading"
          className="mb-6 text-xl font-medium tracking-tight md:text-2xl"
        >
          {content.heading}
        </h2>
        <p className="mb-8 max-w-3xl text-base leading-relaxed text-ink/80 md:text-lg">
          {content.tldr}
        </p>
        <dl className="flex flex-col border-t border-rule/50">
          {content.faq.map((item) => (
            <div key={item.q} className="border-b border-rule/50 py-5">
              <dt className="font-serif text-lg font-medium md:text-xl">
                {item.q}
              </dt>
              <dd className="mt-2 max-w-3xl text-base leading-relaxed text-ink/80">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
