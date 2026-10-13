import { i18n } from "../i18n";
import type { Page } from "../lib/route";

/** Public address of the site, used in each page's canonical and og:url. */
export const SITE_URL = "https://www.danielporto.com.br/";

/** Title and description of a page, in its language (texts in src/i18n/locales). */
export function pageMeta({ route, lang }: Page) {
  const t = i18n.getFixedT(lang);
  return { title: t(`meta.${route}.title`), description: t(`meta.${route}.description`) };
}
