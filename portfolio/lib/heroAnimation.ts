// Approximate headline word count, used only to time when the chat intro pops
// in after the headline finishes animating. Decoupled from the (now localized)
// headline text — the delay formula is bounded, so the exact count is immaterial.
const HERO_WORD_COUNT = 8;

export const HERO_ANIM = {
  startDelayS: 0.2,
  staggerS: 0.35,
  durationS: 0.15,
  phiInverse: 0.6180339887498949,
  chatPopupDelayAfterHeroS: 0.2,
} as const;

export const CHAT_INTRO_ANIM = {
  durationS: 0.45,
  composerDelayAfterIntroS: 0.2,
  promptDurationS: 0.4,
} as const;

export const HERO_PORTRAIT_ANIM = {
  delayAfterComposerPopS: 0.8,
  durationS: 0.45,
} as const;

export function getWordDelayS(index: number): number {
  return (
    HERO_ANIM.startDelayS +
    (((index + 1) * HERO_ANIM.phiInverse) % 1) * HERO_ANIM.staggerS
  );
}

/** When the last hero word finishes its fade-in. */
export function getHeroAnimEndS(wordCount: number): number {
  let maxDelay = 0;
  for (let i = 0; i < wordCount; i++) {
    maxDelay = Math.max(maxDelay, getWordDelayS(i));
  }
  return maxDelay + HERO_ANIM.durationS;
}

export function getChatIntroDelayS(): number {
  return getHeroAnimEndS(HERO_WORD_COUNT) + HERO_ANIM.chatPopupDelayAfterHeroS;
}

export function getChatComposerDelayS(): number {
  return (
    getChatIntroDelayS() +
    CHAT_INTRO_ANIM.durationS +
    CHAT_INTRO_ANIM.composerDelayAfterIntroS
  );
}

/** Portrait pop — 0.8s after the “Ask me anything” composer starts its pop-in. */
export function getHeroPortraitDelayS(): number {
  return getChatComposerDelayS() + HERO_PORTRAIT_ANIM.delayAfterComposerPopS;
}
