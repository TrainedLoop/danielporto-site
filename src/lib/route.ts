import { useEffect, useState } from "react";

export type Route = "home" | "historia" | "curriculo" | "creditos";

/** O hash pode ter parâmetros depois da rota, ex.: #/curriculo?exp=fu2re-smart-solutions-... */
function parts(): [string, URLSearchParams] {
  const [path, query = ""] = window.location.hash.replace(/^#\/?/, "").split("?");
  return [path, new URLSearchParams(query)];
}

function current(): Route {
  const [path] = parts();
  return path === "historia" || path === "curriculo" || path === "creditos" ? path : "home";
}

/** Lê um parâmetro do hash da rota atual. */
export const hashParam = (name: string) => parts()[1].get(name);

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

/** Link para um emprego no currículo; o Resume rola até ele ao abrir. */
export const jobHref = (jobId: string) => `${href("curriculo")}?exp=${jobId}`;
