import type { Page } from "@playwright/test";
import { expect, test, topBarHeight, topOf } from "./helpers.ts";

const DEMO = "https://trainedloop.github.io/sealdown/";
const CODE = "https://github.com/TrainedLoop/sealdown";

const CASES = [
  {
    path: "/projetos/sealdown/",
    title: "Sealdown: documentos que só quem tem o link lê",
    open: "Abrir",
    code: "Código",
    previous: "/projetos/extracao-ocr-llm/",
    resume: "/curriculo/#personal-project",
  },
  {
    path: "/en/projects/sealdown/",
    title: "Sealdown: documents only people with the link can read",
    open: "Open",
    code: "Code",
    previous: "/en/projects/ocr-llm-extraction/",
    resume: "/en/resume/#personal-project",
  },
];

/**
 * The personal project is the last block of the résumé, so the page can't scroll it up to the
 * top bar (expectLandedBelowTopBar): it lands once the page is scrolled to the bottom, with the
 * whole block on screen and clear of the top bar.
 */
async function expectPersonalProjectOnScreen(page: Page) {
  const bar = await topBarHeight(page);
  await expect
    .poll(async () => {
      const top = await topOf(page, "personal-project");
      const atBottom = await page.evaluate(
        () => Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight,
      );
      return (top >= bar && top < 200) || (top >= bar && atBottom) ? "landed" : `top = ${top}`;
    })
    .toBe("landed");
  await expect(page.locator("#personal-project")).toBeInViewport({ ratio: 1 });
}

for (const { path, title, open, code, previous, resume } of CASES) {
  test.describe(path, () => {
    test("renders the case with its screenshot", async ({ page, problems }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveText(title);
      const image = page.locator("img.case__image");
      await expect(image).toHaveAttribute("loading", "lazy");
      await expect(image).toHaveAttribute("width", /\d+/);
      await expect(image).toHaveAttribute("height", /\d+/);
      expect((await image.getAttribute("alt"))?.length).toBeGreaterThan(20);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth)).toBeGreaterThan(0);
      expect(problems).toEqual([]);
    });

    test("opens the app and the code in a new tab", async ({ page }) => {
      await page.goto(path);
      for (const [label, url] of [
        [open, DEMO],
        [code, CODE],
      ]) {
        const link = page.locator(".case__links a", { hasText: label });
        await expect(link).toHaveAttribute("href", url);
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", "noopener");
      }
    });

    test("is the last case: previous is the OCR case, no next", async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("a.case__previous")).toHaveAttribute("href", previous);
      await expect(page.locator("a.case__next")).toHaveCount(0);
      await expect(page.locator("a.case__resume")).toHaveAttribute("href", resume);
    });
  });
}

test.describe("résumé personal project", () => {
  for (const [path, casePath] of [
    ["/curriculo/", "/projetos/sealdown/"],
    ["/en/resume/", "/en/projects/sealdown/"],
  ]) {
    test(`${path} links to the case, after and outside the selected projects`, async ({ page }) => {
      await page.goto(path);
      const block = page.locator("#personal-project");
      await expect(block.locator(`a[href="${casePath}"]`)).toHaveCount(1);
      await expect(page.locator(`#projects a[href="${casePath}"]`)).toHaveCount(0);
      await expect(page.locator("#projects")).not.toContainText("Sealdown");
      // Right after the selected projects, never inside them.
      const order = await page.evaluate(() => {
        const projects = document.getElementById("projects")!;
        const personal = document.getElementById("personal-project")!;
        return {
          inside: projects.contains(personal),
          after: Boolean(projects.compareDocumentPosition(personal) & Node.DOCUMENT_POSITION_FOLLOWING),
        };
      });
      expect(order).toEqual({ inside: false, after: true });
    });
  }

  test("case page: see on résumé → personal project, on screen below the top bar", async ({ page }) => {
    await page.goto("/projetos/sealdown/");
    await page.locator("a.case__resume").click();
    await expect(page).toHaveURL("/curriculo/#personal-project");
    await expectPersonalProjectOnScreen(page);
  });

  test("direct load of /en/resume/#personal-project", async ({ page }) => {
    await page.goto("/en/resume/#personal-project");
    await expectPersonalProjectOnScreen(page);
  });
});
