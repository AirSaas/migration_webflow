import { test, expect } from "@playwright/test";

/**
 * BlogIndexPage visual regression — /fr/blog.
 *
 * Covers the 3 collections (articles / podcast / nouveautés), the
 * collection-author pill pattern, the multi-author byline on cards,
 * the alternating light/alt backgrounds, and the closing CTA + footer.
 *
 * Mock data lives in src/data/blog.tsx (Step 0/1). Regenerate baselines
 * with `npm run test:visual:update` after any intentional change.
 */

test.describe("BlogIndexPage — visual", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/fr/blog");
    await page.waitForLoadState("networkidle");
    // Disable CSS animations for deterministic snapshots
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
    await expect(page.locator("section").first()).toHaveScreenshot("blog-hero.png", {
      fullPage: false,
    });
  });

  test("Collection — Leurs articles (single + multi-author cards)", async ({ page }) => {
    const heading = page.getByRole("heading", { name: /^Leurs articles$/i });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(heading.locator("xpath=ancestor::section[1]")).toHaveScreenshot(
      "blog-collection-articles.png",
    );
  });

  test("Collection — Leurs podcast (collectionAuthor + alt background)", async ({ page }) => {
    const heading = page.getByRole("heading", { name: /^Leurs podcast$/i });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(heading.locator("xpath=ancestor::section[1]")).toHaveScreenshot(
      "blog-collection-podcast.png",
    );
  });

  test("Collection — Leurs nouveautés (light background + no-avatar author)", async ({ page }) => {
    const heading = page.getByRole("heading", { name: /^Leurs nouveautés$/i });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(heading.locator("xpath=ancestor::section[1]")).toHaveScreenshot(
      "blog-collection-nouveautes.png",
    );
  });

  test("Closing CTA", async ({ page }) => {
    const heading = page.getByRole("heading", { name: /repreniez le contrôle/i });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(heading.locator("xpath=ancestor::section[1]")).toHaveScreenshot(
      "blog-cta-highlight.png",
    );
  });

  test("Footer", async ({ page }) => {
    const footer = page.locator("footer").first();
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(footer).toHaveScreenshot("blog-footer.png");
  });
});
