import { test, expect } from "@playwright/test";

/**
 * LP PPM (/fr/lp/ppm) visual regression.
 *
 * Snapshots the hero plus 4 critical sections: the 4-column security
 * PillarFrame (uses the new columns=4 extension), the integrations
 * IconRow, the testimonials grid and the closing dual CTA. Run
 * `npm run test:visual:update` to refresh baselines when a change
 * is intentional.
 */
test.describe("LP PPM — visual", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/fr/lp/ppm");
    await page.waitForLoadState("networkidle");
    await page.addStyleTag({
      content: `*, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }`,
    });
  });

  test("Hero", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await expect(page.locator("main > section").first()).toHaveScreenshot(
      "hero.png",
      { fullPage: false },
    );
  });

  test("Stats — ValuePropositionFrame 4 FeatureCard", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: /qui changent avec AirSaas/i,
    });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(heading.locator("xpath=ancestor::section[1]")).toHaveScreenshot(
      "stats.png",
    );
  });

  test("Security — ValuePropositionFrame 4 FeatureCard", async ({ page }) => {
    const heading = page.getByRole("heading", { name: /Sécurité au top/i });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(heading.locator("xpath=ancestor::section[1]")).toHaveScreenshot(
      "security-4col.png",
    );
  });

  test("Integrations — IconRowFrame", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: /Connecté à votre écosystème/i,
    });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(heading.locator("xpath=ancestor::section[1]")).toHaveScreenshot(
      "integrations.png",
    );
  });

  test("Testimonials — TestimonialsFrame 2 cards", async ({ page }) => {
    const heading = page.getByRole("heading", { name: /Ils parlent de nous/i });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(heading.locator("xpath=ancestor::section[1]")).toHaveScreenshot(
      "testimonials.png",
    );
  });

  test("Closing CTA — dual CardCta", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: /De contremaître à coach d'organisation/i,
    });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(heading.locator("xpath=ancestor::section[1]")).toHaveScreenshot(
      "closing-cta.png",
    );
  });
});
