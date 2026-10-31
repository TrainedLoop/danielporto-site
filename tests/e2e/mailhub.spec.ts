import { expect, test } from "./helpers.ts";

const SITE = "https://trainedloop.github.io/mailhub-mcp/";
const CODE = "https://github.com/TrainedLoop/mailhub-mcp";

const CASES = [
  {
    path: "/projetos/mailhub-mcp/",
    resumePath: "/curriculo/",
    title: "mailhub-mcp: e-mail seguro para agentes de IA",
    open: "Abrir",
    code: "Código",
    previous: "/projetos/sealdown/",
    next: "/projetos/desenvolvimento-com-agentes/",
  },
  {
    path: "/en/projects/mailhub-mcp/",
    resumePath: "/en/resume/",
    title: "mailhub-mcp: safe email for AI agents",
    open: "Open",
    code: "Code",
    previous: "/en/projects/sealdown/",
    next: "/en/projects/ai-agent-development/",
  },
];

for (const { path, resumePath, title, open, code, previous, next } of CASES) {
  test.describe(path, () => {
    test("renders the case with its screenshot", async ({ page, problems }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveText(title);
      const image = page.locator("img.case__image");
      await expect(image).toHaveAttribute("width", "1280");
      await expect(image).toHaveAttribute("height", "900");
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth)).toBeGreaterThan(0);
      expect(problems).toEqual([]);
    });

    test("opens the site and the code in a new tab", async ({ page }) => {
      await page.goto(path);
      for (const [label, url] of [
        [open, SITE],
        [code, CODE],
      ]) {
        const link = page.locator(".case__links a", { hasText: label });
        await expect(link).toHaveAttribute("href", url);
        await expect(link).toHaveAttribute("target", "_blank");
      }
    });

    test("sits between Sealdown and the AI agents case", async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("a.case__previous")).toHaveAttribute("href", previous);
      await expect(page.locator("a.case__next")).toHaveAttribute("href", next);
      await expect(page.locator("a.case__resume")).toHaveAttribute("href", `${resumePath}#personal-project`);
    });

    test("the résumé lists it with the personal projects, outside the selected projects", async ({ page }) => {
      await page.goto(resumePath);
      await expect(page.locator(`#personal-project a[href="${path}"]`)).toHaveCount(1);
      await expect(page.locator(`#projects a[href="${path}"]`)).toHaveCount(0);
      await expect(page.locator("#projects")).not.toContainText("mailhub");
    });
  });
}
