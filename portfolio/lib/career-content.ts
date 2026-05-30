import type { Content } from "./content";

/** Content shapes, derived from the content module so components stay in sync with `messages/en.json`. */
export type HeroContent = Content["hero"];
export type WorkContent = Content["work"];
export type ExtrasContent = Content["extras"];
export type ChatContent = Content["chat"];
export type ProfileContent = Content["profile"];
export type CareerContent = Content["career"];
export type Experience = CareerContent["experiences"][number];
export type SkillCategory = CareerContent["skillCategories"][number];
export type ExperienceSide = "left" | "right";
