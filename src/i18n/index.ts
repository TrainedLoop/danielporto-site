import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import type { Lang } from "../lib/route";
import en from "./locales/en";
import pt from "./locales/pt";

/**
 * Translations with i18next. The language comes from the page (/en/ is English), not from
 * the browser: it is switched by navigation (src/lib/route.ts), by main.tsx on boot and by
 * the build for each page. The messages ship in the bundle, so initialization and language
 * changes are synchronous, which the build's prerendered HTML needs.
 */
export const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  resources: { pt: { translation: pt }, en: { translation: en } },
  lng: "pt",
  fallbackLng: "pt",
  initAsync: false,
  returnObjects: true,
  interpolation: { escapeValue: false }, // React already escapes
});

export function setLang(lang: Lang) {
  if (i18n.language !== lang) void i18n.changeLanguage(lang);
}
