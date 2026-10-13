import { i18n } from "../i18n";
import { routePath, type Lang, type Page, type Route } from "../lib/route";

/** Public address of the site, used in each page's canonical and og:url. */
export const SITE_URL = "https://www.danielporto.com.br/";

/** Absolute address of a page: "https://www.danielporto.com.br/en/resume/". */
export const pageUrl = (route: Route, lang: Lang) => `${SITE_URL}${routePath(route, lang)}`;

/** Absolute address of the share image in each language (public/og-image.png, og-image.en.png). */
export const ogImage = (lang: Lang) => `${SITE_URL}${lang === "en" ? "og-image.en.png" : "og-image.png"}`;

/**
 * Date the content last changed (YYYY-MM-DD), from git at build time (vite.config.ts).
 * The same constant goes into the client and SSR bundles, so the résumé hydrates cleanly.
 */
export const CONTENT_DATE: string = __CONTENT_DATE__;

/** BCP 47 code of each page language (html lang, hreflang, inLanguage). */
export const LANG_CODE: Record<Lang, string> = { pt: "pt-BR", en: "en" };

/** The content date in the page's language ("13 de outubro de 2026", "October 13, 2026"). */
export function formatContentDate(lang: Lang) {
  // UTC: the date has no time, so formatting must not depend on the build's or the visitor's time zone.
  const format = new Intl.DateTimeFormat(lang === "en" ? "en-US" : "pt-BR", { dateStyle: "long", timeZone: "UTC" });
  return format.format(new Date(`${CONTENT_DATE}T00:00:00Z`));
}

/** Title and description of a page, in its language (texts in src/i18n/locales). */
export function pageMeta({ route, lang }: Page) {
  const t = i18n.getFixedT(lang);
  return { title: t(`meta.${route}.title`), description: t(`meta.${route}.description`) };
}
