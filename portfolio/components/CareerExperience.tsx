import { Container } from "@/components/ui/Container";
import type { Experience } from "@/lib/career-content";
import {
  CAREER_POP_SEQUENCE,
  getCareerPopDelayS,
} from "@/lib/careerAnimation";
import { CAREER_TIMELINE_GAP_X_CLASS } from "@/lib/careerLayout";
import type { ReactNode } from "react";

const TREE_ROW_CLASS: Record<number, string> = {
  1: "md:row-start-1",
  2: "md:row-start-2",
  3: "md:row-start-3",
  4: "md:row-start-4",
};

function PopIn({
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
      style={{ animationDelay: `${getCareerPopDelayS(sequenceIndex)}s` }}
    >
      {children}
    </div>
  );
}

function CareerTitle({ title }: { title: string }) {
  return (
    <h1
      id="career-heading"
      className="w-max font-serif text-5xl leading-[1.05] font-medium tracking-tight whitespace-nowrap md:text-6xl"
    >
      {title}
    </h1>
  );
}

function ExperienceCard({
  organization,
  role,
  roleSuffix,
  period,
  description,
}: Experience) {
  const hasDescription = description.trim().length > 0;

  return (
    <article className="bg-card text-ink box-border w-full max-w-[36.8rem] shrink-0 rounded-2xl p-5 md:w-[36.8rem] md:min-h-[9.5rem] md:max-w-none md:p-6">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h2 className="font-serif text-xl leading-[1.05] font-medium md:text-2xl">
          {organization}
        </h2>
        <p className="text-[11px] tracking-wider text-ink/65 uppercase whitespace-nowrap">
          {period}
        </p>
      </header>
      {role ? (
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-sm font-medium md:text-base">
          <span>{role}</span>
          {roleSuffix ? (
            <span className="font-normal text-ink/65">| {roleSuffix}</span>
          ) : null}
        </p>
      ) : null}
      {hasDescription ? (
        <p className="mt-3 text-sm leading-relaxed text-ink/80 md:text-base">
          {description}
        </p>
      ) : null}
    </article>
  );
}

function ExperienceSlot({
  job,
  sequenceIndex,
  className = "",
}: {
  job: Experience;
  sequenceIndex: number;
  className?: string;
}) {
  return (
    <PopIn sequenceIndex={sequenceIndex} className={className}>
      <ExperienceCard {...job} />
    </PopIn>
  );
}

// Keyed by tree row (stable across locales), not organization name.
const POP_BY_TREE_ROW: Record<number, number> = {
  1: CAREER_POP_SEQUENCE.work1,
  2: CAREER_POP_SEQUENCE.work2,
  3: CAREER_POP_SEQUENCE.work3,
  4: CAREER_POP_SEQUENCE.graduation,
};

function getPopIndex(job: Experience): number {
  return POP_BY_TREE_ROW[job.treeRow] ?? 0;
}

export function CareerExperience({
  experiences,
  title,
}: {
  experiences: Experience[];
  title: string;
}) {
  const leftBranches = experiences.filter((job) => job.side === "left");
  const rightBranches = experiences.filter((job) => job.side === "right");

  const mobileOrder = [...experiences].sort(
    (a, b) => getPopIndex(a) - getPopIndex(b),
  );

  return (
    <section className="pt-32 pb-16" aria-labelledby="career-heading">
      <Container>
        <header className="mb-12 md:mb-14">
          <PopIn sequenceIndex={CAREER_POP_SEQUENCE.title}>
            <CareerTitle title={title} />
          </PopIn>
        </header>

        <ul className="flex flex-col gap-8 md:hidden">
          {mobileOrder.map((job) => (
            <li key={`${job.organization}-${job.period}`}>
              <ExperienceSlot
                job={job}
                sequenceIndex={getPopIndex(job)}
              />
            </li>
          ))}
        </ul>

        <div
          className={`relative mx-auto hidden w-fit md:grid md:grid-cols-[36.8rem_4px_36.8rem] md:grid-rows-[auto_auto_auto_auto] md:items-stretch md:gap-y-12 lg:gap-y-14 ${CAREER_TIMELINE_GAP_X_CLASS}`}
          role="list"
          aria-label="Work experience timeline"
        >
          {rightBranches.map((job) => (
            <ExperienceSlot
              key={`${job.organization}-${job.period}`}
              job={job}
              sequenceIndex={getPopIndex(job)}
              className={`md:col-start-3 ${TREE_ROW_CLASS[job.treeRow]}`}
            />
          ))}

          {leftBranches.map((job) => (
            <ExperienceSlot
              key={`${job.organization}-${job.period}`}
              job={job}
              sequenceIndex={getPopIndex(job)}
              className={`md:col-start-1 ${TREE_ROW_CLASS[job.treeRow]}`}
            />
          ))}

          <div
            aria-hidden
            className="bg-ink md:col-start-2 md:row-start-1 md:row-span-4 md:w-1 md:justify-self-center md:self-stretch"
          />
        </div>
      </Container>
    </section>
  );
}
