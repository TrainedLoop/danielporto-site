import type { Route } from "../lib/route";

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
