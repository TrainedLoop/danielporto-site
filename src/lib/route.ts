import { useEffect, useState } from "react";
import { pages } from "../content/pages";

export type Route = "home" | "historia" | "curriculo" | "creditos";

export const ROUTES: Route[] = ["home", "historia", "curriculo", "creditos"];

const BASE = import.meta.env.BASE_URL;

/** Caminho da rota a partir da raiz do site, sem o BASE_PATH: "" para a home, "curriculo/" etc. */
export const routePath = (route: Route) => (route === "home" ? "" : `${route}/`);

/** Link para a rota, já com o BASE_PATH: "/", "/curriculo/"... */
export const href = (route: Route) => `${BASE}${routePath(route)}`;

/** A rota de um caminho do navegador, ou `null` se não for uma página do site. */
export function routeFromPath(pathname: string): Route | null {
  const base = BASE.replace(/\/$/, "");
  if (!pathname.startsWith(base)) return null;
  const name = pathname
    .slice(base.length)
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/?index\.html$/, "");
  if (name === "") return "home";
  return ROUTES.includes(name as Route) ? (name as Route) : null;
}

/** Links antigos com hash (#/curriculo) apontam para o caminho novo (/curriculo/). */
export function pathFromLegacyHash(hash: string): string | null {
  if (!hash.startsWith("#/")) return null;
  const name = hash.slice(2).replace(/\/+$/, "");
  return href(ROUTES.includes(name as Route) ? (name as Route) : "home");
}

/**
 * Rotas por caminho (/historia/, /curriculo/), com a History API: os links internos
 * trocam de página sem recarregar, e voltar/avançar do navegador continuam funcionando.
 * Cada rota também existe como HTML estático, gerado no build (scripts/prerender.js).
 */
export function useRoute(initial: Route): Route {
  const [route, setRoute] = useState<Route>(initial);

  useEffect(() => {
    const show = (next: Route) => {
      setRoute(next);
      document.title = pages[next].title;
      window.scrollTo(0, 0);
    };

    const onPopState = () => show(routeFromPath(window.location.pathname) ?? "home");

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link || link.target || link.hasAttribute("download")) return;
      if (link.origin !== window.location.origin) return;
      const next = routeFromPath(link.pathname);
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

  return route;
}
