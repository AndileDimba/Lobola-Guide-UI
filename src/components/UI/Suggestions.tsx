import React from "react";
import { SUGGESTION_FORM_URL, suggestionEmailHref } from "../../data/feedback";

interface SuggestionsProps {
  // What the suggestion is about, such as a stage title; it names the email
  subject?: string;
  // Just the heading and links, for the footer
  compact?: boolean;
}

const link =
  "underline decoration-1 underline-offset-4 hover:decoration-2";

/**
 * Two ways to tell us something is wrong, or something the site should have:
 * the form, or an email.
 */
const Suggestions: React.FC<SuggestionsProps> = ({ subject, compact }) => {
  const emailHref = () =>
    suggestionEmailHref(
      subject ? `Suggestion: ${subject}` : "Suggestion for Lobola Hub",
      "What is wrong, or what would you like to see?"
    );

  const options = (
    <ul className={`flex flex-wrap gap-x-6 gap-y-1 ${compact ? "" : "mt-3"}`}>
      {SUGGESTION_FORM_URL && (
        <li>
          <a href={SUGGESTION_FORM_URL} target="_blank" rel="noopener noreferrer" className={`text-ink ${link}`}>
            Use the form
          </a>
        </li>
      )}
      <li>
        <a
          href={emailHref()}
          // The footer does not redraw when the page changes, so the email
          // names the page as it is when the link is clicked
          onClick={(e) => {
            e.currentTarget.href = emailHref();
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
        <h3 className="mb-1.5 text-[13px] font-medium uppercase tracking-[0.16em]">Suggestions and corrections</h3>
        {options}
      </div>
    );
  }

  return (
    <aside aria-labelledby="suggestions" className="mt-11 border-t border-rule pt-6 text-base leading-relaxed text-ink-soft lg:mt-14 lg:text-lg">
      <h2 id="suggestions" className="font-display text-xl font-semibold text-ink lg:text-[1.375rem]">
        Suggest a correction or an idea
      </h2>
      <p className="mt-1.5">
        Families and regions differ. If something here is wrong, your family does it another way, or there is something you would like this site to have, tell us.
      </p>
      {options}
    </aside>
  );
};

export default Suggestions;
