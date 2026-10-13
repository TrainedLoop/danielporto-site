import type { Page, Route } from "../lib/route";

/** Endereço público do site, usado no canonical e no og:url de cada página. */
export const SITE_URL = "https://www.danielporto.com.br/";

/** Título e descrição de cada página, gravados no HTML estático de cada rota no build. */
export const pages: Record<Route, { title: string; description: string }> = {
  home: {
    title: "Daniel Porto · Desenvolvedor Full Stack Sênior · IA aplicada",
    description:
      "Desenvolvedor full stack sênior na Purple Metrics. Levo IA para produção: LLMs, agentes e visão computacional, com React, TypeScript e C#/.NET. Currículo e a minha história em pixel art.",
  },
  historia: {
    title: "A história em pixel art · Daniel Porto",
    description:
      "A trajetória do Daniel Porto contada como um jogo em pixel art: 8 fases, da casa da avó até a IA em produção na Purple Metrics.",
  },
  curriculo: {
    title: "Currículo · Daniel Porto · Desenvolvedor Full Stack Sênior",
    description:
      "Currículo do Daniel Porto: desenvolvedor full stack sênior na Purple Metrics, com IA em produção (LLMs, MCP, agentes e visão computacional), React, TypeScript, C#/.NET e mais de 10 anos de experiência.",
  },
  creditos: {
    title: "Créditos dos sprites e da fonte · Daniel Porto",
    description:
      "Autores e licenças da arte em pixel art do site do Daniel Porto: sprites do Liberated Pixel Cup e do OpenGameArt e a fonte Press Start 2P.",
  },
};

/** Título e descrição das páginas em inglês (só a home e o currículo têm versão em inglês). */
export const pagesEn: Partial<Record<Route, { title: string; description: string }>> = {
  home: {
    title: "Daniel Porto · Senior Full Stack Developer · Applied AI",
    description:
      "Senior full stack developer at Purple Metrics. I take AI to production: LLMs, agents and computer vision, with React, TypeScript and C#/.NET. Résumé and my story in pixel art.",
  },
  curriculo: {
    title: "Résumé · Daniel Porto · Senior Full Stack Developer",
    description:
      "Daniel Porto's résumé: senior full stack developer at Purple Metrics, with AI in production (LLMs, MCP, agents and computer vision), React, TypeScript, C#/.NET and over 10 years of experience.",
  },
};

/** Título e descrição de uma página, no idioma dela. */
export const pageMeta = ({ route, lang }: Page) => (lang === "en" && pagesEn[route]) || pages[route];
