export const ABOUT_POP_ANIM = {
  durationS: 0.45,
  staggerS: 0.1,
} as const;

/** Head → paragraph 1 → paragraph 3 → paragraph 2 → Voron image. */
export const ABOUT_POP_SEQUENCE = {
  head: 0,
  paragraph1: 1,
  paragraph3: 2,
  paragraph2: 3,
  voron: 4,
} as const;

export function getAboutPopDelayS(sequenceIndex: number): number {
  return sequenceIndex * ABOUT_POP_ANIM.staggerS;
}
