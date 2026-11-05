import { expect, test } from "./helpers.ts";

for (const [path, first] of [
  ["/projetos/", "Copiloto que responde perguntas dos clientes da Purple Metrics"],
  ["/en/projects/", "A copilot that answers Purple Metrics customers' questions"],
]) {
  test(`${path} cards say what each project is`, async ({ page }) => {
    await page.goto(path);
    const summaries = page.locator(".case-card .case-card__summary");
    await expect(summaries).toHaveCount(6);
    await expect(summaries.first()).toContainText(first);
    for (const summary of await summaries.all()) expect((await summary.textContent())?.trim().length).toBeGreaterThan(30);
  });
}
