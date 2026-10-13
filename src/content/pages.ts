import { i18n } from "../i18n";
import type { Page } from "../lib/route";

/** Endereço público do site, usado no canonical e no og:url de cada página. */
export const SITE_URL = "https://www.danielporto.com.br/";

/** Título e descrição de uma página, no idioma dela (textos em src/i18n/locales). */
export function pageMeta({ route, lang }: Page) {
  const t = i18n.getFixedT(lang);
  return { title: t(`meta.${route}.title`), description: t(`meta.${route}.description`) };
}
