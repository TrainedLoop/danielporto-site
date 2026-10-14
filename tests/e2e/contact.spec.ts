import { expect, test } from "./helpers.ts";

const LINKEDIN = "https://www.linkedin.com/in/daniel-porto/";

// The "contact me" buttons open the LinkedIn profile in a new tab (LinkedIn has no compose URL).
for (const [path, label] of [
  ["/", "Falar comigo no LinkedIn"],
  ["/en/", "Message me on LinkedIn"],
  ["/curriculo/", "Falar comigo no LinkedIn"],
  ["/en/resume/", "Message me on LinkedIn"],
]) {
  test(`${path} contact button opens LinkedIn in a new tab`, async ({ page }) => {
    await page.goto(path);
    const button = page.locator("main a.button", { hasText: label });
    await expect(button).toHaveAttribute("href", LINKEDIN);
    await expect(button).toHaveAttribute("target", "_blank");
    await expect(button).toHaveAttribute("rel", "noopener");
  });
}
