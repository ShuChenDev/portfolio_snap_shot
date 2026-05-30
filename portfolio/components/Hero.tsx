import { Fragment } from "react";
import Image from "next/image";
import { getHeroPortraitDelayS, getWordDelayS } from "@/lib/heroAnimation";
import type { HeroContent } from "@/lib/career-content";

type Word = { text: string; emphasis: boolean };

type HeroProps = {
  content: HeroContent;
};

function buildWords(content: HeroContent): Word[] {
  return content.headline.flatMap((part) =>
    part.text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((text) => ({ text, emphasis: !!part.emphasis })),
  );
}

export function Hero({ content }: HeroProps) {
  const words = buildWords(content);
  const wordDelays = words.map((_, i) => getWordDelayS(i));
  const portraitDelayS = getHeroPortraitDelayS();

  return (
    <header className="pt-32 pb-[3.686rem]">
      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[minmax(0,34rem)_1fr] sm:gap-8 md:gap-10">
        <div className="min-w-0 max-w-[34rem]">
          <h1 className="font-serif text-5xl leading-[1.05] font-medium tracking-tight md:text-6xl">
            {words.map((w, i) => (
              <Fragment key={i}>
                {i > 0 ? " " : null}
                <span
                  className="word-in inline-block"
                  style={{ animationDelay: `${wordDelays[i].toFixed(3)}s` }}
                >
                  {w.emphasis ? (
                    <u className="underline decoration-1 underline-offset-4">
                      {w.text}
                    </u>
                  ) : (
                    w.text
                  )}
                </span>
              </Fragment>
            ))}
          </h1>
          <p className="mt-6 text-left text-base leading-relaxed md:mt-8 md:text-lg">
            {content.paragraph}
          </p>
        </div>

        <div
          className="hero-portrait-in flex w-full translate-x-4 justify-center sm:translate-x-6 md:translate-x-8"
          style={{ animationDelay: `${portraitDelayS.toFixed(3)}s` }}
        >
          <Image
            src="/images/selfie1.jpg"
            alt={content.portraitAlt}
            width={346}
            height={346}
            priority
            className="aspect-square w-full max-w-[10.8rem] rounded-[1.65rem] border border-rule/50 object-cover object-top shadow-[0_8px_24px_rgba(17,17,17,0.08)] sm:max-w-[14.4rem] md:max-w-[18rem] lg:max-w-[21.6rem]"
          />
        </div>
      </div>
    </header>
  );
}
