/**
 * Where suggestions go: corrections, ideas for the site, questions for the
 * FAQ. Leaving the form address empty hides the form and offers only email.
 */
export const SUGGESTION_FORM_URL = "https://forms.gle/FNEuQz8r71EXc4SQ9";
export const SUGGESTION_EMAIL = "mlamulia75@gmail.com";

/**
 * A mailto link whose message starts with the page it was sent from. Build it
 * when the link is clicked, so it names the page the reader is on.
 */
export const suggestionEmailHref = (subject: string, prompt: string) => {
  const body = `Page: ${window.location.href}\n\n${prompt}\n`;
  return `mailto:${SUGGESTION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
