import { expect, test } from "./helpers.ts";

/**
 * The OCR case is anonymous: no company, client, year or "freelance" anywhere in the page,
 * including the head and the JSON-LD. Two site-wide things are left out because they carry
 * no information about the case: the JSON-LD `dateModified` (the build date, on every page)
 * and the hashed file names under /assets/, which could contain a year-like run of digits by
 * chance.
 */
const NAMES = /purple|fu2re|fulllab|hebara|freela/i;
const YEAR = /\b(19|20)\d{2}\b/;

const withoutSiteWideDates = (html: string) =>
  html.replace(/"dateModified":"[\d-]+"/g, "").replace(/\/assets\/[\w.-]+/g, "/assets/");

for (const path of ["/projetos/extracao-ocr-llm/", "/en/projects/ocr-llm-extraction/"]) {
  test(`${path} names no company and no year`, async ({ page, request }) => {
    const served = await (await request.get(path)).text();
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const hydrated = await page.content();

    for (const [label, html] of [
      ["served HTML", served],
      ["hydrated DOM", hydrated],
    ]) {
      expect(html, label).toContain('application/ld+json');
      expect(html.match(NAMES)?.[0], `${label}: company name`).toBeUndefined();
      expect(withoutSiteWideDates(html).match(YEAR)?.[0], `${label}: year`).toBeUndefined();
    }
  });
}
