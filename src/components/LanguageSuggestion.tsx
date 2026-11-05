import { useState, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { track } from "../lib/analytics";
import { rememberLanguageChoice, suggestedLang } from "../lib/languageChoice";
import { equivalentHref, type Lang, type Route } from "../lib/route";

// The browser's languages don't change while the page is open: nothing to subscribe to.
const subscribe = () => () => {};

/**
 * A bar at the bottom of the screen offering the same page in the visitor's language. The site
 * never redirects by language: search engines render pages with an English browser, and a
 * redirect would hide the Portuguese pages from them. Rendered only in the browser (the build's
 * HTML and the hydration pass see no suggestion), in the suggested language.
 */
export function LanguageSuggestion({ route, lang }: { route: Route; lang: Lang }) {
  const { i18n } = useTranslation();
  const target = useSyncExternalStore(subscribe, () => suggestedLang(lang), () => null);
  const [closed, setClosed] = useState(false);

  if (!target || closed) return null;
  const t = i18n.getFixedT(target);
  const code = target === "en" ? "en" : "pt-BR";

  const close = () => {
    rememberLanguageChoice();
    track("lang_suggestion", { action: "dismiss", suggested: target });
    setClosed(true);
  };

  return (
    <div className="lang-suggestion no-print" lang={code} role="region" aria-label={t("langSuggestion.label")}>
      <p className="lang-suggestion__text">{t("langSuggestion.text")}</p>
      <a
        className="button button--primary lang-suggestion__link"
        href={equivalentHref(route, target)}
        hrefLang={code}
        onClick={(event) => {
          // Read at click time: the story's phase or the résumé's job may have changed.
          event.currentTarget.href = equivalentHref(route, target);
          rememberLanguageChoice();
          track("lang_suggestion", { action: "switch", suggested: target });
        }}
      >
        {t("langSuggestion.link")}
      </a>
      <button type="button" className="lang-suggestion__close" onClick={close} aria-label={t("langSuggestion.close")}>
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
