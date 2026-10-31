import { expect, test } from "./helpers.ts";

const SPECS = "https://github.com/TrainedLoop/sealdown/tree/main/docs/superpowers";
const SITE_CODE = "https://github.com/TrainedLoop/danielporto-site";

const CASES = [
  {
    home: "/",
    path: "/projetos/desenvolvimento-com-agentes/",
    title: "Desenvolvimento com agentes de IA",
    previous: "/projetos/mailhub-mcp/",
    resume: "/curriculo/#purple-metrics-desenvolvedor-full-stack-senior",
  },
  {
    home: "/en/",
    path: "/en/projects/ai-agent-development/",
    title: "Development with AI agents",
    previous: "/en/projects/mailhub-mcp/",
    resume: "/en/resume/#purple-metrics-desenvolvedor-full-stack-senior",
  },
];

for (const { home, path, title, previous, resume } of CASES) {
  test.describe(path, () => {
    test("renders the case with links to the public specs and code", async ({ page, problems }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveText(title);
      const links = page.locator(".case__links a");
      await expect(links).toHaveCount(2);
      await expect(links.nth(0)).toHaveAttribute("href", SPECS);
      await expect(links.nth(0)).toHaveClass(/button--primary/);
      await expect(links.nth(1)).toHaveAttribute("href", SITE_CODE);
      for (const link of await links.all()) {
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", "noopener");
      }
      expect(problems).toEqual([]);
    });

    test("is the last case: previous is mailhub-mcp, no next", async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("a.case__previous")).toHaveAttribute("href", previous);
      await expect(page.locator("a.case__next")).toHaveCount(0);
      await expect(page.locator("a.case__resume")).toHaveAttribute("href", resume);
    });

    test("the home's AI agents card links to it", async ({ page }) => {
      await page.goto(home);
      await page.locator(`a.achievement__link[href="${path}"]`).click();
      await expect(page).toHaveURL(path);
      await expect(page.locator("h1")).toHaveText(title);
    });
  });
}
