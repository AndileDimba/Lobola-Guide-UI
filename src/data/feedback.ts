/**
 * Where suggestions go: corrections, ideas for the site, questions for the
 * FAQ. The Google Form is empty until it exists; while it is, only email
 * is offered.
 */
export const SUGGESTION_FORM_URL = "";
export const SUGGESTION_EMAIL = "mlamulia75@gmail.com";

/**
 * A mailto link whose message starts with the page it was sent from. Build it
 * when the link is clicked, so it names the page the reader is on.
 */
export const suggestionEmailHref = (subject: string, prompt: string) => {
  const body = `Page: ${window.location.href}\n\n${prompt}\n`;
  return `mailto:${SUGGESTION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
