import { test, expect } from "@playwright/test";

/**
 * DS components — Storybook visual regression.
 *
 * Snapshots of the 11 components created during the 26-pages + blog audits
 * (2026-04). Plus LpExamplePage blueprint + LpNavbar/LpFooter layout.
 *
 * These stories are Storybook-only (the components aren't mounted on live
 * Next routes yet). Run `npm run test:visual:update` to regenerate
 * baselines when a change is intentional.
 *
 * **Requires Storybook running** on :6007. Playwright will start it via
 * the second webServer entry in playwright.config.ts if not already up.
 *
 * Covered:
 *   - StepsFrame                     (26-pages P1-#2)
 *   - RelatedSolutionsFrame          (26-pages P1-#3)
 *   - ClientsFrame                   (initial audit)
 *   - TabsFrame — WithScrollTargets  (26-pages P1-#1)
 *   - ProseFrame                     (26-pages P1-#4)
 *   - BlogRelatedFrame               (blog audit Fase A1)
 *   - TocSidebar                     (blog audit Fase A2, standalone only)
 *   - InlineCta                      (blog audit Fase B)
 *   - InsightCallout                 (blog audit Fase B)
 *   - LpNavbar                       (Bloque B4 library-design/layout)
 *   - LpFooter                       (Bloque B4 library-design/layout)
 *   - LpExamplePage                  (blueprint for LP rebuild)
 */

const STORYBOOK = "http://localhost:6007";

/**
 * Navigate to a Storybook story iframe, stabilize animations, wait for
 * fonts/images, snapshot the root.
 */
async function snapshotStory(
  page: import("@playwright/test").Page,
  storyId: string,
  snapshotName: string,
  options?: { fullPage?: boolean },
) {
  await page.goto(
    `${STORYBOOK}/iframe.html?viewMode=story&id=${storyId}`,
  );
  await page.waitForLoadState("networkidle");
  // Disable animations for deterministic snapshots
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }`,
  });
  await page.waitForTimeout(500);
  await expect(page).toHaveScreenshot(snapshotName, {
    fullPage: options?.fullPage ?? true,
  });
}

test.describe("DS components — Storybook visual regression", () => {
  test("StepsFrame — LpPpmDeployment", async ({ page }) => {
    await snapshotStory(
      page,
      "sections-value-proposition-sections-stepsframe--lp-ppm-deployment",
      "stepsframe-lp-ppm.png",
    );
  });

  test("RelatedSolutionsFrame — DefaultThreeSolutions", async ({ page }) => {
    await snapshotStory(
      page,
      "sections-cta-sections-relatedsolutionsframe--default-three-solutions",
      "relatedsolutionsframe-default.png",
    );
  });

  test("ClientsFrame — Default9ClientsTinted", async ({ page }) => {
    await snapshotStory(
      page,
      "sections-social-proof-sections-clientsframe--default-9-clients-tinted",
      "clientsframe-default.png",
    );
  });

  test("TabsFrame — WithScrollTargets", async ({ page }) => {
    await snapshotStory(
      page,
      "sections-navigation-sections-tabsframe--with-scroll-targets",
      "tabsframe-with-scroll-targets.png",
    );
  });

  test("ProseFrame — ReadingLight", async ({ page }) => {
    await snapshotStory(
      page,
      "sections-editorial-sections-proseframe--reading-light",
      "proseframe-reading-light.png",
    );
  });

  test("BlogRelatedFrame — DefaultThreeArticles", async ({ page }) => {
    await snapshotStory(
      page,
      "sections-blog-blogrelatedframe--default-three-articles",
      "blogrelatedframe-default.png",
    );
  });

  test("TocSidebar — Standalone", async ({ page }) => {
    await snapshotStory(
      page,
      "sections-blog-tocsidebar--standalone",
      "tocsidebar-standalone.png",
    );
  });

  test("InlineCta — Default", async ({ page }) => {
    await snapshotStory(
      page,
      "ui-inlinecta--default",
      "inlinecta-default.png",
      { fullPage: false },
    );
  });

  test("InsightCallout — Default", async ({ page }) => {
    await snapshotStory(
      page,
      "ui-insightcallout--default",
      "insightcallout-default.png",
      { fullPage: false },
    );
  });

  test("LpNavbar — Default", async ({ page }) => {
    await snapshotStory(
      page,
      "layout-lpnavbar--default",
      "lpnavbar-default.png",
      { fullPage: false },
    );
  });

  test("LpFooter — Default", async ({ page }) => {
    await snapshotStory(
      page,
      "layout-lpfooter--default",
      "lpfooter-default.png",
      { fullPage: false },
    );
  });

  test("LpExamplePage — Default (blueprint)", async ({ page }) => {
    await snapshotStory(
      page,
      "pages-lpexamplepage-blueprint--default",
      "lpexamplepage-default.png",
    );
  });
});
