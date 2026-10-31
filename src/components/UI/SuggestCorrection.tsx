import React from "react";

// The Google Form for corrections. Empty until the form exists; while it is,
// only the email option shows.
const CORRECTION_FORM_URL = "";
const CORRECTION_EMAIL = "mlamulia75@gmail.com";

interface SuggestCorrectionProps {
  // What the correction is about, such as a stage title; it names the email
  subject?: string;
  // The full page as a heading and a sentence, or just the links (the footer)
  compact?: boolean;
}

const emailHref = (subject?: string) => {
  const about = subject ? `Correction: ${subject}` : "Correction to Lobola Hub";
  const body = `Page: ${window.location.href}\n\nWhat should change:\n`;
  return `mailto:${CORRECTION_EMAIL}?subject=${encodeURIComponent(about)}&body=${encodeURIComponent(body)}`;
};

const link =
  "underline decoration-1 underline-offset-4 hover:decoration-2";

/**
 * Two ways to tell us something is wrong or missing: the form, or an email.
 */
const SuggestCorrection: React.FC<SuggestCorrectionProps> = ({ subject, compact }) => {
  const options = (
    <ul className={`flex flex-wrap gap-x-6 gap-y-1 ${compact ? "" : "mt-3"}`}>
      {CORRECTION_FORM_URL && (
        <li>
          <a href={CORRECTION_FORM_URL} target="_blank" rel="noopener noreferrer" className={`text-ink ${link}`}>
            Use the form
          </a>
        </li>
      )}
      <li>
        <a
          href={emailHref(subject)}
          // The footer does not redraw when the page changes, so the email
          // names the page as it is when the link is clicked
          onClick={(e) => {
            e.currentTarget.href = emailHref(subject);
          }}
          className={`text-ink ${link}`}
        >
          Send an email
        </a>
      </li>
    </ul>
  );

  if (compact) {
    return (
      <div className="mt-5">
        <h3 className="mb-1.5 text-[13px] font-medium uppercase tracking-[0.16em]">Suggest a correction</h3>
        {options}
      </div>
    );
  }

  return (
    <aside aria-labelledby="suggest-correction" className="mt-11 border-t border-rule pt-6 text-base leading-relaxed text-ink-soft lg:mt-14 lg:text-lg">
      <h2 id="suggest-correction" className="font-display text-xl font-semibold text-ink lg:text-[1.375rem]">
        Suggest a correction
      </h2>
      <p className="mt-1.5">
        Families and regions differ. If something here is wrong, or your family does it another way, tell us.
      </p>
      {options}
    </aside>
  );
};

export default SuggestCorrection;
