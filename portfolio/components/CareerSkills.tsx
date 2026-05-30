import { CareerSkillsPanel } from "@/components/CareerSkillsPanel";
import type { SkillCategory } from "@/lib/career-content";

export function CareerSkills({
  categories,
  heading,
}: {
  categories: SkillCategory[];
  heading: string;
}) {
  return (
    <section id="skills" className="pt-12 pb-12" aria-labelledby="skills-heading">
      <CareerSkillsPanel categories={categories} heading={heading} />
    </section>
  );
}
