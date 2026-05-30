import { Container } from "@/components/ui/Container";
import type { ExtrasContent } from "@/lib/career-content";

type FeatureDuoProps = {
  content: ExtrasContent;
};

export function FeatureDuo({ content }: FeatureDuoProps) {
  return (
    <section className="pt-12 pb-12">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          <div>
            {content.statement ? (
              <p className="font-serif text-lg leading-tight font-medium tracking-tight md:text-xl">
                {content.statement}
              </p>
            ) : null}
          </div>
          <ul className="flex flex-col md:col-span-2">
            {content.links.map((link) => (
              <li key={link.href} className="border-t border-rule">
                <a
                  href={link.href}
                  target={link.download ? undefined : "_blank"}
                  rel={link.download ? undefined : "noopener noreferrer"}
                  download={link.download ? "" : undefined}
                  className="flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70"
                >
                  <span className="text-sm font-medium md:text-base">
                    {link.label}
                  </span>
                  <span className="text-[11px] whitespace-nowrap text-ink/60">
                    {link.category}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
