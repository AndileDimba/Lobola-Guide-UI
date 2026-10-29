import React from "react";
import { Link } from "react-router-dom";
import type { Step, Theme } from "../../data/types";
import SceneFigure from "./SceneFigure";
import SceneView from "./SceneView";

interface StageChapterProps {
  step: Step;
  index: number;
  total: number;
  theme: Theme;
  previous?: Step;
  next?: Step;
  hrefFor: (step: Step) => string;
}

const NUMBER_WORDS = [
  "one", "two", "three", "four", "five", "six",
  "seven", "eight", "nine", "ten", "eleven", "twelve",
];

// "four" reads like a book; past twelve, digits read better than words
const inWords = (n: number) => NUMBER_WORDS[n - 1] ?? String(n);

const eyebrow =
  "text-[13px] font-medium uppercase leading-snug tracking-[0.16em]";

/**
 * One stage, laid out as a chapter: title in English with the isiZulu name
 * beneath, the English lede, the scene slot, then the scene itself or, until
 * the stage has one, its details.
 */
const StageChapter: React.FC<StageChapterProps> = ({
  step,
  index,
  total,
  theme,
  previous,
  next,
  hrefFor,
}) => {
  const number = index + 1;
  // A scene's narration is the doorway into the stage; without one, the
  // English summary leads. isiZulu-only stages fall back to the description.
  const lede = step.scene?.narration ?? step.summary;

  return (
    <article className="min-w-0 max-w-[660px] flex-1">
      <p className={`hidden lg:mb-3.5 lg:block ${eyebrow} ${theme.accent}`}>
        Stage {inWords(number)} of {inWords(total)}
      </p>
      <h1 className="font-display text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.01em] lg:text-[4rem]">
        {step.title}
      </h1>
      {step.zuluTitle && (
        <p
          lang="zu"
          className="mt-2.5 font-display text-2xl italic leading-[1.3] text-ink-soft lg:mt-3.5 lg:text-[1.75rem]"
        >
          {step.zuluTitle}
        </p>
      )}

      {/* On a phone the scene comes first; on a wide screen the lede does */}
      <div className="flex flex-col">
        <div className="order-2 mt-7 lg:order-1 lg:mt-8">
          {lede && (
            <p className="text-[1.3125rem] leading-[1.55] lg:text-2xl">{lede}</p>
          )}
          <p
            lang="zu"
            className={
              lede
                ? "mt-4 text-base italic text-ink-soft lg:text-lg"
                : "text-[1.3125rem] leading-[1.55] lg:text-2xl"
            }
          >
            {step.description}
          </p>
        </div>
        <SceneFigure
          media={step.scene?.media ?? step.media}
          label={`Scene ${inWords(number)}`}
          className="order-1 -mx-5 mt-6 sm:mx-0 lg:order-2 lg:mt-9"
        />
      </div>

      <div className="mt-7 lg:mt-11">
        {step.scene ? (
          <SceneView scene={step.scene} theme={theme} />
        ) : (
          <>
            <h2 className="mb-2.5 font-display text-[1.625rem] font-semibold leading-tight lg:mb-3 lg:text-[1.875rem]">
              What happens
            </h2>
            <ul lang="zu" className="space-y-3">
              {step.details.map((detail, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className={`mt-[0.7em] h-1.5 w-1.5 flex-shrink-0 rounded-full ${theme.primary}`}
                    aria-hidden="true"
                  />
                  {detail}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {step.tool && (
        <aside className="mt-9 border-t border-rule pt-6 lg:mt-11 lg:pt-7">
          <p>{step.tool.description}</p>
          <Link
            to={step.tool.to}
            className={`mt-4 inline-flex min-h-[52px] items-center justify-center gap-2.5 px-7 text-lg font-medium transition-colors ${theme.button}`}
          >
            {step.tool.label}
            <Arrow direction="next" />
          </Link>
        </aside>
      )}

      <nav
        aria-label="Stage navigation"
        className="mt-11 flex flex-wrap gap-x-10 lg:mt-16"
      >
        {previous ? (
          <StageLink
            step={previous}
            to={hrefFor(previous)}
            label={`Previous, stage ${inWords(number - 1)}`}
            direction="previous"
          />
        ) : (
          // Keeps "Next" in the right-hand column on the first stage
          <div className="hidden flex-1 basis-[260px] sm:block" />
        )}
        {next && (
          <StageLink
            step={next}
            to={hrefFor(next)}
            label={`Next, stage ${inWords(number + 1)}`}
            direction="next"
          />
        )}
      </nav>
    </article>
  );
};

interface StageLinkProps {
  step: Step;
  to: string;
  label: string;
  direction: "previous" | "next";
}

const StageLink: React.FC<StageLinkProps> = ({ step, to, label, direction }) => (
  <Link
    to={to}
    rel={direction === "previous" ? "prev" : "next"}
    className="group block flex-1 basis-[260px] border-t-2 border-ink-deep pb-[22px] pt-[18px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:pb-7 lg:pt-5"
  >
    <span className={`flex items-center gap-2 text-ink-soft ${eyebrow}`}>
      {direction === "previous" && <Arrow direction="previous" />}
      {label}
      {direction === "next" && <Arrow direction="next" />}
    </span>
    <span className="mt-1.5 block font-display text-2xl font-semibold leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 lg:mt-2 lg:text-[1.625rem]">
      {step.title}
    </span>
    {step.zuluTitle && (
      <span lang="zu" className="block text-[17px] italic text-ink-soft lg:text-lg">
        {step.zuluTitle}
      </span>
    )}
  </Link>
);

const Arrow: React.FC<{ direction: "previous" | "next" }> = ({ direction }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {direction === "previous" ? (
      <>
        <path d="M19 12H5" />
        <path d="M11 6l-6 6 6 6" />
      </>
    ) : (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    )}
  </svg>
);

export default StageChapter;
