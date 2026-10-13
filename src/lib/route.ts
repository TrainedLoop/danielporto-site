import { useEffect, useState } from "react";

export type Route = "home" | "historia" | "curriculo" | "creditos";

const hashPath = () => window.location.hash.replace(/^#\/?/, "");

function current(): Route {
  // "historia/3" continua sendo a rota da história, só que já numa fase.
  const hash = hashPath().replace(/^historia\/\d+$/, "historia");
  return hash === "historia" || hash === "curriculo" || hash === "creditos" ? hash : "home";
}

/** Fase pedida no link (#/historia/3 → 3, contando a partir de 1), ou null se não houver. */
export function storyPhase(): number | null {
  const match = /^historia\/(\d+)$/.exec(hashPath());
  return match ? Number(match[1]) : null;
}

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

export const href = (route: Route) => (route === "home" ? "#/" : `#/${route}`);

/** Link direto para uma fase da história (contando a partir de 1, como o contador "3/8"). */
export const storyHref = (phase: number) => `#/historia/${phase}`;
