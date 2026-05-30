import { Container } from "@/components/ui/Container";
import type { WorkContent } from "@/lib/career-content";

type SelectedWorkProps = {
  content: WorkContent;
  sectionId?: string;
};

export function SelectedWork({
  content,
  sectionId = "projects",
}: SelectedWorkProps) {
  return (
    <section id={sectionId} className="pt-12 pb-12">
      <Container>
        {content.heading ? (
          <h2 className="mb-8 text-xl font-medium tracking-tight md:text-2xl">
            {content.heading}
          </h2>
        ) : null}
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {content.projects.map((p) => (
            <li key={p.title}>
              <article className="bg-card text-ink flex aspect-[4/5] flex-col rounded-2xl p-6">
                <h3 className="font-serif text-3xl leading-[1.05] font-medium md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed">{p.description}</p>
                <div className="mt-auto flex items-end justify-between gap-3 pt-8">
                  <div>
                    <p className="text-[10px] tracking-wider text-ink/50 uppercase">
                      Category
                    </p>
                    <p className="text-xs">{p.category}</p>
                  </div>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark bg-chrome text-chrome-ink inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap"
                  >
                    {p.cta} →
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
