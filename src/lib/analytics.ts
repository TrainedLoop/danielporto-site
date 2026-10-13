import type { PostHog } from "posthog-js";
import { i18n } from "../i18n";

/**
 * Usage metrics and session replay with PostHog, loaded after the page shows up (in a
 * separate chunk, src/lib/posthog.ts, which also bundles the replay recorder) so it doesn't
 * weigh on the initial bundle.
 *
 * Privacy: no cookies or localStorage (persistence "memory", so each visit is a new
 * anonymous visitor and a new recording), no autocapture and no extra PostHog scripts.
 * Replay masks every input and skips network headers/bodies and console logs; page text is
 * public content, so it is recorded as is. Pages change through the History API without
 * reloads (src/lib/route.ts), so one visit is one page load and one recording.
 * With Do Not Track or Global Privacy Control on, or without VITE_POSTHOG_KEY in the build
 * (local dev, forks), everything here is a no-op.
 */

type Props = Record<string, string | number | boolean>;

/** Events sent by the site (besides $pageview); see the table in the README. */
export type EventName =
  | "home_choice"
  | "phase_started"
  | "phase_completed"
  | "phase_skipped"
  | "story_completed"
  | "outbound_link";

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || "https://us.i.posthog.com";

function optedOut(): boolean {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  const win = window as Window & { doNotTrack?: string };
  return nav.doNotTrack === "1" || win.doNotTrack === "1" || nav.globalPrivacyControl === true;
}

// In the build (prerendering in Node) there is no browser: nothing is sent.
const enabled = typeof window !== "undefined" && Boolean(KEY) && !optedOut();
let client: PostHog | null = null;
// Events fired before PostHog finishes loading.
const queue: [string, Props][] = [];

/** Sends an event; every event carries the page language (`lang`: "pt" | "en"). */
export function track(event: EventName | "$pageview", props?: Props) {
  if (!enabled) return;
  const withLang = { lang: i18n.language, ...props };
  if (client) client.capture(event, withLang);
  else queue.push([event, withLang]);
}

/** Properties of a story phase; ids are "phase0".."phase7", in order. */
export function trackPhase(event: "phase_started" | "phase_completed" | "phase_skipped", id: string) {
  track(event, { phase: Number(id.replace(/\D/g, "")), phase_id: id });
}

/** Called on boot and on every page change (src/lib/route.ts): routes use the History API. */
export function trackPageview() {
  const base = import.meta.env.BASE_URL;
  const route = window.location.pathname.slice(base.length).replace(/\/+$/, "") || "home";
  track("$pageview", { route });
}

/** Outbound links we care about: LinkedIn, GitHub and email. */
function destination(link: HTMLAnchorElement): string | null {
  if (link.protocol === "mailto:") return "email";
  if (/(^|\.)linkedin\.com$/.test(link.hostname)) return "linkedin";
  if (/(^|\.)github\.com$/.test(link.hostname)) return "github";
  return null;
}

function onClick(event: MouseEvent) {
  const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
  if (!(link instanceof HTMLAnchorElement)) return;
  const dest = destination(link);
  if (dest) track("outbound_link", { destination: dest, url: link.href });
}

async function load() {
  const { default: posthog } = await import("./posthog");
  posthog.init(KEY!, {
    api_host: HOST,
    persistence: "memory",
    capture_pageview: false, // $pageview is manual, on every page change
    capture_pageleave: false,
    autocapture: false,
    // Replay also needs "Record user sessions" on in the PostHog project: the client only
    // starts after the project's remote config (/array/<key>/config, a JSON request) says so.
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      recordHeaders: false,
      recordBody: false,
      // The story is drawn on a <canvas>, which replays blank unless its frames are captured.
      // Few frames and modest quality keep recordings small; the scenes are mostly static.
      captureCanvas: { recordCanvas: true, canvasFps: 3, canvasQuality: "0.4" },
    },
    enable_recording_console_log: false,
    disable_surveys: true,
    disable_product_tours: true,
    disable_conversations: true,
    disable_web_experiments: true,
    disable_external_dependency_loading: true,
    // Must stay false so the remote config above loads (it carries the replay settings).
    // The site uses no feature flags, so those are never fetched.
    advanced_disable_flags: false,
    advanced_disable_feature_flags: true,
    advanced_disable_feature_flags_on_first_load: true,
    capture_heatmaps: false,
    capture_dead_clicks: false,
    capture_exceptions: false,
    capture_performance: false, // also keeps network timing out of recordings
    respect_dnt: true,
    // No batching: the event goes out right away, before an outbound link takes the visitor away.
    request_batching: false,
  });
  client = posthog;
  for (const [event, props] of queue.splice(0)) client.capture(event, props);
}

/** Called once on boot: registers the listeners and schedules loading PostHog. */
export function initAnalytics() {
  if (!enabled) return;
  trackPageview();
  document.addEventListener("click", onClick, { capture: true });
  const start = () => void load().catch(() => {});
  if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 4000 });
  else setTimeout(start, 1500);
}
