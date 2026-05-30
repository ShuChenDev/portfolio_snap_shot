export const CAREER_POP_ANIM = {
  durationS: 0.45,
  staggerS: 0.1,
} as const;

/** Work 1 → Work 3 → Title → Work 2 → Graduation; each starts 0.1s after the previous. */
export function getCareerPopDelayS(sequenceIndex: number): number {
  return sequenceIndex * CAREER_POP_ANIM.staggerS;
}

export const CAREER_POP_SEQUENCE = {
  work1: 0,
  work3: 1,
  title: 2,
  work2: 3,
  graduation: 4,
} as const;
