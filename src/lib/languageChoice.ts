import type { Lang } from "./route";

/** Set once the visitor picks a language (in the suggestion bar or the PT · EN switch) or closes the bar. */
const CHOSEN_KEY = "lang:chosen";

/** Marks the language as chosen, so the suggestion bar doesn't come back. Storage may be unavailable. */
export function rememberLanguageChoice() {
  try {
    localStorage.setItem(CHOSEN_KEY, "1");
  } catch {
    // Private mode or blocked storage: the bar may show again on the next visit.
  }
}

function languageChosen(): boolean {
  try {
    return localStorage.getItem(CHOSEN_KEY) !== null;
  } catch {
    return false;
  }
}

/**
 * The language to offer on a page, or null: English for a Portuguese page read in a browser with
 * no Portuguese among its languages, Portuguese for an English page whose browser puts Portuguese
 * first. Null once the visitor has chosen a language.
 */
export function suggestedLang(page: Lang): Lang | null {
  if (languageChosen()) return null;
  const languages = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((l) => l.toLowerCase());
  if (page === "pt") return languages.some((l) => l.startsWith("pt")) ? null : "en";
  return languages[0]?.startsWith("pt") ? "pt" : null;
}
