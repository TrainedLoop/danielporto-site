import { readFileSync } from "node:fs";
import { test as base, expect, type Page } from "@playwright/test";

export { expect };

/**
 * Every page of the site, as a path from the root ("/", "/curriculo/", "/en/resume/"...).
 * Read from the build's dist/sitemap.xml, which scripts/prerender.js writes from the app's own
 * route list (PAGES in src/lib/route.ts). route.ts itself can't be imported here: it pulls in
 * React, i18n and import.meta.env.
 */
export const SITE_PATHS: string[] = [
  ...readFileSync(new URL("../../dist/sitemap.xml", import.meta.url), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g),
].map(([, loc]) => new URL(loc).pathname);

/** The `<html lang>` each page must have: English under /en/, Brazilian Portuguese elsewhere. */
export const langOf = (path: string) => (path.startsWith("/en/") ? "en" : "pt-BR");

/** Console messages that point to PostHog (blocked in the tests; the CI build uses a fake key). */
const isPostHogNoise = (text: string, url: string) => /posthog/i.test(url) || /posthog/i.test(text);

/**
 * Shared test: blocks every request to PostHog and collects page errors, console errors and
 * React hydration warnings in `problems`, which tests assert to be empty.
 */
export const test = base.extend<{ problems: string[] }>({
  problems: [
    async ({ page }, use) => {
      await page.route(/^https?:\/\/([^/]+\.)?posthog\.com\//, (route) => route.abort());
      const problems: string[] = [];
      page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
      page.on("console", (message) => {
        const text = message.text();
        if (isPostHogNoise(text, message.location().url)) return;
        if (message.type() === "error" || /hydrat/i.test(text)) problems.push(`${message.type()}: ${text}`);
      });
      await use(problems);
    },
    { auto: true },
  ],
});

/** Height of the fixed top bar, in CSS pixels. */
export const topBarHeight = (page: Page) =>
  page.locator(".topbar").evaluate((el) => el.getBoundingClientRect().height);

/** Distance from the top of the viewport to the element with this id. */
export const topOf = (page: Page, id: string) =>
  page.evaluate((target) => document.getElementById(target)?.getBoundingClientRect().top ?? NaN, id);

/** Waits until the element with this id rests just below the top bar (anchor landings). */
export async function expectLandedBelowTopBar(page: Page, id: string) {
  const bar = await topBarHeight(page);
  // Both bounds at once: before the scroll the target is far below, which passes the first one.
  await expect
    .poll(
      async () => {
        const top = await topOf(page, id);
        return top >= bar && top < 200 ? "landed" : `top = ${top}`;
      },
      { message: `#${id} should rest between the ${bar}px top bar and 200px` },
    )
    .toBe("landed");
}
