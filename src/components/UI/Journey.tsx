import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { Step, Theme } from "../../data/types";

interface JourneyProps {
  steps: Step[];
  currentIndex: number;
  theme: Theme;
  hrefFor: (step: Step) => string;
}

/**
 * Every stage as a stop on one line. Stages before the reader are filled in,
 * the current stage is ringed, and the road ahead is dashed.
 */
export const JourneyLine: React.FC<JourneyProps> = ({
  steps,
  currentIndex,
  theme,
  hrefFor,
}) => (
  <ol>
    {steps.map((step, i) => {
      const isPast = i < currentIndex;
      const isCurrent = i === currentIndex;
      const isLast = i === steps.length - 1;

      return (
        <li key={step.id}>
          <Link
            to={hrefFor(step)}
            aria-current={isCurrent ? "page" : undefined}
            className="group flex gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <span
              className="flex w-5 flex-shrink-0 flex-col items-center"
              aria-hidden="true"
            >
              {isCurrent ? (
                <span
                  className={`mb-1 mt-1 h-5 w-5 rounded-full border-[5px] bg-paper ${theme.border}`}
                />
              ) : isPast ? (
                <span
                  className={`mb-1 mt-[7px] h-3.5 w-3.5 rounded-full ${theme.primary}`}
                />
              ) : (
                <span className="mb-1 mt-[7px] h-3.5 w-3.5 rounded-full border-2 border-ink-faint" />
              )}
              {!isLast && (
                <span
                  className={`mb-1 min-h-6 w-0 flex-grow border-l-2 ${
                    isPast ? theme.border : "border-dashed border-ink-faint"
                  }`}
                />
              )}
            </span>
            <span className={`leading-[1.35] ${isLast ? "" : "pb-[18px]"}`}>
              <span
                className={`block text-lg group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 ${
                  isCurrent ? "font-semibold" : isPast ? "font-medium" : ""
                }`}
              >
                {i + 1}. {step.title}
              </span>
              {step.zuluTitle && (
                <span lang="zu" className="block text-base italic text-ink-soft">
                  {step.zuluTitle}
                </span>
              )}
            </span>
          </Link>
        </li>
      );
    })}
  </ol>
);

/**
 * The phone version of the journey: one segment per stage, with the full
 * line folded away behind "All stages".
 */
export const JourneyBar: React.FC<JourneyProps> = (props) => {
  const { steps, currentIndex, theme } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav aria-label="Journey progress">
      <div className="flex gap-1.5" aria-hidden="true">
        {steps.map((step, i) => (
          <span
            key={step.id}
            className={`h-2 flex-1 rounded ${
              i < currentIndex
                ? theme.primary
                : i === currentIndex
                  ? "bg-ink-deep"
                  : "border-2 border-ink-faint"
            }`}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[13px] font-medium uppercase leading-snug tracking-[0.16em] text-ink-soft">
          Stage {currentIndex + 1} of {steps.length}
        </span>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="journey-all-stages"
          className="inline-flex items-center gap-1 py-2.5 text-base"
        >
          All stages
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div id="journey-all-stages" className="mt-4 animate-fade-in">
          <JourneyLine {...props} />
        </div>
      )}
    </nav>
  );
};
