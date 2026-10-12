import { useEffect, useState } from "react";

export type Route = "home" | "historia" | "curriculo" | "creditos";

function current(): Route {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return hash === "historia" || hash === "curriculo" || hash === "creditos" ? hash : "home";
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
