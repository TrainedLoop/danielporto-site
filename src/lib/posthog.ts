/**
 * PostHog plus the session replay recorder, in one module so both land in the same lazy
 * chunk (src/lib/analytics.ts imports this file dynamically, never statically).
 *
 * The recorder normally comes from PostHog's CDN as an extra script. Bundling it here
 * registers it on `window.__PosthogExtensions__` before init, so posthog-js finds it and
 * never needs to load external scripts (`disable_external_dependency_loading` stays on).
 */
import posthog from "posthog-js";
import "posthog-js/dist/posthog-recorder";

export default posthog;
