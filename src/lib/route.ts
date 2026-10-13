import { useEffect, useState } from "react";
import { pageMeta } from "../content/pages";
import { trackPageview } from "./analytics";

export type Route = "home" | "historia" | "curriculo" | "creditos";

export const ROUTES: Route[] = ["home", "historia", "curriculo", "creditos"];

/** Idioma da página: português por padrão, inglês sob o prefixo /en/. */
export type Lang = "pt" | "en";

/** Rotas com versão em inglês. A história e os créditos ficam só em português. */
export const EN_ROUTES: Route[] = ["home", "curriculo"];

/** Uma página do site: a rota e o idioma. */
export type Page = { route: Route; lang: Lang };

/** Todas as páginas, na ordem em que o build gera o HTML estático. */
export const PAGES: Page[] = [
  ...ROUTES.map((route) => ({ route, lang: "pt" as const })),
  ...EN_ROUTES.map((route) => ({ route, lang: "en" as const })),
];

/** Identifica a página no HTML do build (data-route): "curriculo", "en/curriculo"... */
export const pageKey = ({ route, lang }: Page) => (lang === "en" ? `en/${route}` : route);

const BASE = import.meta.env.BASE_URL;

/** Caminho da página a partir da raiz do site, sem o BASE_PATH: "" para a home, "curriculo/", "en/curriculo/" etc. */
export function routePath(route: Route, lang: Lang = "pt") {
  const prefix = lang === "en" && EN_ROUTES.includes(route) ? "en/" : "";
  return prefix + (route === "home" ? "" : `${route}/`);
}

/** Link para a página, já com o BASE_PATH: "/", "/curriculo/", "/en/"... */
export const href = (route: Route, lang: Lang = "pt") => `${BASE}${routePath(route, lang)}`;

/** A página de um caminho do navegador, ou `null` se não for uma página do site. */
export function pageFromPath(pathname: string): Page | null {
  const base = BASE.replace(/\/$/, "");
  if (!pathname.startsWith(base)) return null;
  let name = pathname
    .slice(base.length)
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/?index\.html$/, "");
  let lang: Lang = "pt";
  if (/^en(\/|$)/.test(name)) {
    lang = "en";
    name = name.replace(/^en\/?/, "");
  }
  const route: Route | null = name === "" ? "home" : ROUTES.includes(name as Route) ? (name as Route) : null;
  if (!route) return null;
  return { route, lang: EN_ROUTES.includes(route) ? lang : "pt" };
}

/** Links antigos com hash (#/curriculo, #/en/curriculo) apontam para o caminho novo (/curriculo/). */
export function pathFromLegacyHash(hash: string): string | null {
  if (!hash.startsWith("#/")) return null;
  const name = hash.slice(2).replace(/\/+$/, "");
  const fase = /^historia\/(\d+)$/.exec(name);
  if (fase) return storyHref(Number(fase[1]));
  const page = pageFromPath(`${BASE}${name}`) ?? { route: "home", lang: "pt" };
  return href(page.route, page.lang);
}

/**
 * Rotas por caminho (/historia/, /curriculo/, /en/), com a History API: os links internos
 * trocam de página sem recarregar, e voltar/avançar do navegador continuam funcionando.
 * Cada página também existe como HTML estático, gerado no build (scripts/prerender.js).
 */
export function useRoute(initial: Page): Page {
  const [page, setPage] = useState<Page>(initial);

  useEffect(() => {
    const show = (next: Page) => {
      setPage(next);
      document.title = pageMeta(next).title;
      window.scrollTo(0, 0);
      trackPageview();
    };

    const onPopState = () => show(pageFromPath(window.location.pathname) ?? { route: "home", lang: "pt" });

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link || link.target || link.hasAttribute("download")) return;
      if (link.origin !== window.location.origin) return;
      const next = pageFromPath(link.pathname);
      if (!next) return;
      event.preventDefault();
      if (link.href !== window.location.href) window.history.pushState(null, "", link.href);
      show(next);
    };

    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return page;
}

/** Fase pedida no link (/historia/?fase=3 → 3, contando a partir de 1), ou null se não houver. */
export function storyPhase(): number | null {
  if (typeof window === "undefined") return null;
  const fase = new URLSearchParams(window.location.search).get("fase");
  return fase && /^\d+$/.test(fase) ? Number(fase) : null;
}

/** Link direto para uma fase da história (contando a partir de 1, como o contador "3/8"). */
export const storyHref = (phase: number) => `${href("historia")}?fase=${phase}`;

/** Link para um emprego no currículo (/curriculo/#id); o Resume rola até ele ao abrir. */
export const jobHref = (jobId: string) => `${href("curriculo")}#${jobId}`;
