import type { PostHog } from "posthog-js";

/**
 * Métricas de uso com o PostHog, carregado depois que a página aparece (num chunk
 * separado) para não pesar no bundle inicial.
 *
 * Privacidade: nada de cookie nem localStorage (persistence "memory", então cada
 * visita é um visitante anônimo novo), sem gravação de sessão, sem autocapture e sem
 * scripts extras do PostHog. Com Do Not Track ou Global Privacy Control ligado, ou
 * sem VITE_POSTHOG_KEY no build (dev local, forks), tudo aqui vira no-op.
 */

type Props = Record<string, string | number | boolean>;

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || "https://us.i.posthog.com";

function optedOut(): boolean {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  const win = window as Window & { doNotTrack?: string };
  return nav.doNotTrack === "1" || win.doNotTrack === "1" || nav.globalPrivacyControl === true;
}

const enabled = Boolean(KEY) && !optedOut();
let client: PostHog | null = null;
// Eventos disparados antes do PostHog terminar de carregar.
const queue: [string, Props | undefined][] = [];

export function track(event: string, props?: Props) {
  if (!enabled) return;
  if (client) client.capture(event, props);
  else queue.push([event, props]);
}

/** Propriedades de uma fase da história; os ids são "phase0".."phase7", na ordem. */
export function trackFase(event: "fase_iniciada" | "fase_concluida" | "fase_pulada", id: string) {
  track(event, { fase: Number(id.replace(/\D/g, "")), fase_id: id });
}

/** Chamado no boot e a cada troca de página (src/lib/route.ts): as rotas usam a History API. */
export function trackPageview() {
  const base = import.meta.env.BASE_URL;
  const rota = window.location.pathname.slice(base.length).replace(/\/+$/, "") || "home";
  track("$pageview", { rota });
}

/** Links para fora que interessam: LinkedIn, GitHub e email. */
function destino(link: HTMLAnchorElement): string | null {
  if (link.protocol === "mailto:") return "email";
  if (/(^|\.)linkedin\.com$/.test(link.hostname)) return "linkedin";
  if (/(^|\.)github\.com$/.test(link.hostname)) return "github";
  return null;
}

function onClick(event: MouseEvent) {
  const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
  if (!(link instanceof HTMLAnchorElement)) return;
  const dest = destino(link);
  if (dest) track("link_externo", { destino: dest, url: link.href });
}

async function load() {
  const { default: posthog } = await import("posthog-js");
  posthog.init(KEY!, {
    api_host: HOST,
    persistence: "memory",
    capture_pageview: false, // o $pageview é manual, a cada troca de página
    capture_pageleave: false,
    autocapture: false,
    disable_session_recording: true,
    disable_surveys: true,
    disable_product_tours: true,
    disable_conversations: true,
    disable_web_experiments: true,
    disable_external_dependency_loading: true,
    advanced_disable_flags: true,
    capture_heatmaps: false,
    capture_dead_clicks: false,
    capture_exceptions: false,
    capture_performance: false,
    respect_dnt: true,
    // Sem fila em lote: o evento sai na hora, antes de um link para fora tirar a pessoa da página.
    request_batching: false,
  });
  client = posthog;
  for (const [event, props] of queue.splice(0)) client.capture(event, props);
}

/** Chamado uma vez no boot: registra os ouvintes e agenda o carregamento do PostHog. */
export function initAnalytics() {
  if (!enabled) return;
  trackPageview();
  document.addEventListener("click", onClick, { capture: true });
  const start = () => void load().catch(() => {});
  if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 4000 });
  else setTimeout(start, 1500);
}
