import { Container } from "@/components/ui/Container";
import type { SkillCategory } from "@/lib/career-content";
import {
  CAREER_TIMELINE_GAP_X_CLASS,
  CAREER_TIMELINE_WIDTH_CLASS,
} from "@/lib/careerLayout";

const TWO_COLUMN_MIN_ITEMS = 5;

function splitBalancedColumns(items: string[]) {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)] as const;
}

function SkillItems({ items, categoryTitle }: { items: string[]; categoryTitle: string }) {
  const itemClassName =
    "text-base leading-snug text-ink/90 md:text-lg md:leading-snug";

  if (items.length < TWO_COLUMN_MIN_ITEMS) {
    return (
      <ul className="mt-5 flex flex-col gap-2.5 md:mt-6 md:gap-3">
        {items.map((item, index) => (
          <li
            key={`${categoryTitle}-${index}`}
            className={itemClassName}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  const [left, right] = splitBalancedColumns(items);

  return (
    <div
      className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-x-4 gap-y-0 md:mt-5 md:gap-x-5"
    >
      <ul className="flex flex-col gap-2 md:gap-2.5">
        {left.map((item, index) => (
          <li key={`${categoryTitle}-l-${index}`} className={itemClassName}>
            {item}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-2 md:gap-2.5">
        {right.map((item, index) => (
          <li key={`${categoryTitle}-r-${index}`} className={itemClassName}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CareerSkillsPanel({
  categories,
  heading,
}: {
  categories: SkillCategory[];
  heading: string;
}) {
  return (
    <Container>
      <div
        className={`flex flex-col gap-10 md:gap-12 ${CAREER_TIMELINE_WIDTH_CLASS}`}
      >
        <header className="flex justify-end">
          <h2
            id="skills-heading"
            className="w-max font-serif text-4xl leading-[1.05] font-medium tracking-tight whitespace-nowrap md:text-5xl"
          >
            {heading}
          </h2>
        </header>

        <ul
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${CAREER_TIMELINE_GAP_X_CLASS} sm:gap-y-10 lg:gap-y-14`}
        >
          {categories.map((category) => (
            <li key={category.title} className="min-h-0">
              <article className="bg-card text-ink flex aspect-square w-full flex-col overflow-hidden rounded-2xl p-6 md:p-8">
                <h3 className="shrink-0 font-serif text-3xl leading-[1.05] font-medium md:text-4xl">
                  {category.title}
                </h3>
                <SkillItems items={category.items} categoryTitle={category.title} />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
