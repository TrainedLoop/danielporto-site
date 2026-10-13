import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import type { Lang } from "../lib/route";
import en from "./locales/en";
import pt from "./locales/pt";

/**
 * Traduções com i18next. O idioma vem da página (/en/ é inglês), não do navegador:
 * quem troca é a navegação (src/lib/route.ts), o main.tsx no boot e o build em cada página.
 * As mensagens vão junto no bundle, então a inicialização e a troca de idioma são síncronas,
 * o que o HTML gerado no build precisa.
 */
export const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  resources: { pt: { translation: pt }, en: { translation: en } },
  lng: "pt",
  fallbackLng: "pt",
  initAsync: false,
  returnObjects: true,
  interpolation: { escapeValue: false }, // o React já escapa
});

export function setLang(lang: Lang) {
  if (i18n.language !== lang) void i18n.changeLanguage(lang);
}
