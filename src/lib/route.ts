import { useEffect, useState } from "react";

export type Route = "home" | "historia" | "curriculo" | "creditos";

/** Idioma da página: português por padrão, inglês sob o prefixo #/en. */
export type Lang = "pt" | "en";

/** Rotas com versão em inglês. A história e os créditos ficam só em português. */
const EN_ROUTES: Route[] = ["home", "curriculo"];

function parse(): { route: Route; lang: Lang } {
  let hash = window.location.hash.replace(/^#\/?/, "");
  let lang: Lang = "pt";
  if (/^en(\/|$)/.test(hash)) {
    lang = "en";
    hash = hash.replace(/^en\/?/, "");
  }
  const route: Route = hash === "historia" || hash === "curriculo" || hash === "creditos" ? hash : "home";
  return { route, lang: EN_ROUTES.includes(route) ? lang : "pt" };
}

const current = () => parse().route;
const currentLang = () => parse().lang;

/** Rotas pelo hash (#/historia, #/curriculo): funciona no GitHub Pages sem configuração. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(current);
  useEffect(() => {
    const onChange = () => {
      setRoute(current());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

/** Idioma pelo hash: #/en e #/en/curriculo são as versões em inglês. */
export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>(currentLang);
  useEffect(() => {
    const onChange = () => setLang(currentLang());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return lang;
}

export const href = (route: Route, lang: Lang = "pt") => {
  if (lang === "en" && EN_ROUTES.includes(route)) return route === "home" ? "#/en" : `#/en/${route}`;
  return route === "home" ? "#/" : `#/${route}`;
};
