import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright visual regression — snapshots of key DS pages + storybook stories.
 *
 * Run all tests:     npm run test:visual
 * Update baselines:  npm run test:visual:update
 *
 * Pairs with `npm run lint:ds` for the full DS guarantee chain:
 *   - lint:ds (rules) → test:visual (pixels) → build/deploy.
 */
export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
  /** Snapshot comparison: small tolerance for anti-aliasing + scrollbars. */
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 200,
      threshold: 0.2,
    },
  },
  webServer: [
    {
      command: "npm run dev",
      url: "http://localhost:3000",
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      // Storybook required for ds-components-storybook.spec.ts. If a local
      // Storybook is already running (typical during DS work), this reuses it.
      command: "npm run storybook",
      url: "http://localhost:6007",
      reuseExistingServer: true,
      timeout: 180_000,
    },
  ],
});
