// Capture canonical DS Storybook stories with sidebar visible.
// Used to produce the audit report pairing rebuild bugs with DS references.
//
// Usage:
//   1. Make sure Storybook is running on :6007 (npm run storybook)
//   2. node scripts/capture-ds-canonical.mjs
//   3. Output: docs/audit-screenshots/<slug>.png
//
// The sidebar is left visible so the component path (e.g. "Sections /
// Comparison Sections / ComparisonFrame / Default") shows up in the screenshot
// — that's the search string the rebuild agent uses to locate the canonical.

import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "docs/audit-screenshots");

const STORYBOOK = "http://localhost:6007";

// Each entry: [out filename, story ID (the path= value), human label].
// Story IDs are kebab-case of the Storybook title with the story name appended.
const STORIES = [
  [
    "01-hero-five-trust-badges",
    "sections-hero--five-trust-badges",
    "Hero / FiveTrustBadges — 5 trust badges sous CTAs (LP PPM)",
  ],
  [
    "02-logosbar-variant-comparison",
    "ui-logosbar--variant-comparison",
    "LogosBar / VariantComparison — bordered+gray (clients) vs plain+colored (intégrations)",
  ],
  [
    "03-logosbar-size-comparison",
    "ui-logosbar--size-comparison",
    "LogosBar / SizeComparison — md (4.14rem inner) vs lg (5.5rem hero)",
  ],
  [
    "04-testimonialsframe-adaptive-grid",
    "sections-testimonialsframe--adaptive-grid",
    "TestimonialsFrame / AdaptiveGrid — N=1 / N=2 / N=3 cols",
  ],
  [
    "05-testimonialsframe-mixed-press-personal",
    "sections-testimonialsframe--mixed-press-and-personal",
    "TestimonialsFrame / MixedPressAndPersonal — press + LinkedIn fusionnés",
  ],
  [
    "06-comparisonframe-default",
    "sections-comparison-sections-comparisonframe-default--default",
    "ComparisonFrame — Avec/sans narratif numéroté (PAS ComparisonTableFrame)",
  ],
  [
    "07-comparisontableframe-default",
    "sections-comparison-sections-comparisonframe-table--default",
    "ComparisonTableFrame — feature matrix multi-colonnes",
  ],
  [
    "08-featureframe-rich-editorial-illustration",
    "sections-features-sections-featureframe-rich-text--editorial-illustration",
    "FeatureFrame / EditorialIllustration — narrow 33% (illustration schématique)",
  ],
  [
    "09-featureframe-rich-composite-arrowed",
    "sections-features-sections-featureframe-rich-text--composite-image-with-arrowed-text",
    "FeatureFrame / CompositeImageWithArrowedText — 1 image fusionnée + 3 H5 →",
  ],
  [
    "10-featureframe-rich-image-right",
    "sections-features-sections-featureframe-rich-text--image-right",
    "FeatureFrame / ImageRight (default 60%) — pour screenshots produit",
  ],
  [
    "11-stepsframe-default",
    "sections-value-proposition-sections-stepsframe--lp-ppm-deployment",
    "StepsFrame / LpPpmDeployment — zigzag cards avec floating numbered badges",
  ],
  [
    "12-valuepropositionframe-default",
    "sections-value-proposition-sections-valuepropositionframe-cards--default",
    "ValuePropositionFrame / Cards / Default — cards on light bg (résout 'Pourquoi les équipes adoptent')",
  ],
  [
    "13-relatedsolutionsframe-default",
    "sections-cta-sections-relatedsolutionsframe--default-three-solutions",
    "RelatedSolutionsFrame / DefaultThreeSolutions — grid 'Allez plus loin' fin de page Solution",
  ],
  [
    "14-blogrelatedframe-default",
    "sections-blog-blogrelatedframe--default-three-articles",
    "BlogRelatedFrame / DefaultThreeArticles — grid d'articles related fin de blog post",
  ],
  [
    "15-relatedarticlesframe-default",
    "sections-blog-relatedarticlesframe--default",
    "RelatedArticlesFrame — grid d'articles related (alternative)",
  ],
  [
    "16-quote-default",
    "ui-quote--default",
    "Quote / Default — citation/quote bloc dans articles blog",
  ],
  [
    "17-insightcallout-default",
    "ui-insightcallout--default",
    "InsightCallout / Default — encadré d'info/insight",
  ],
  [
    "18-pillarframe-daki",
    "sections-value-proposition-sections-valuepropositionframe-pillars--daki",
    "PillarFrame / DAKI — 4 piliers horizontaux Drop/Add/Keep/Improve",
  ],
  [
    "19-iconrowframe-default",
    "sections-value-proposition-sections-valuepropositionframe-icons--default",
    "IconRowFrame / Default — bandeau d'icônes labels",
  ],
  [
    "20-tabsframe-lp-six-tabs",
    "sections-navigation-sections-tabsframe--lp-six-tabs",
    "TabsFrame / LpSixTabs — anchor tabs scroll-spy (LP hero-adjacent, 6 ancres)",
  ],
  [
    "21-cta-frame-split",
    "sections-call-to-action-ctaframe--split",
    "CtaFrame / Split — 2 cards CTA côte à côte",
  ],
  [
    "22-blogcollectionframe-default",
    "sections-blogcollectionframe--default",
    "BlogCollectionFrame / Default — grid 'tendances' / 'leurs articles' fin blog",
  ],
  [
    "23-lpexamplepage-blueprint",
    "pages-lpexamplepage-blueprint--default",
    "LpExamplePage / Default (blueprint) — LP rendue avec tous les composants DS bien invoqués (référence META-1)",
  ],
];

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const failures = [];
  for (const [filename, storyId, label] of STORIES) {
    const url = `${STORYBOOK}/?path=/story/${storyId}`;
    process.stdout.write(`📸 ${filename} — ${label}\n   ${url}\n`);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
      // Wait for the story preview iframe to render
      await page.waitForTimeout(1500);
      // Disable animations for deterministic shots
      await page.addStyleTag({
        content: `*, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }`,
      });
      const out = path.join(OUT_DIR, `${filename}.png`);
      await page.screenshot({ path: out, fullPage: false });
      process.stdout.write(`   ✓ saved → ${path.relative(ROOT, out)}\n\n`);
    } catch (err) {
      process.stderr.write(`   ✗ FAILED: ${err.message}\n\n`);
      failures.push({ filename, storyId, error: err.message });
    }
  }

  await browser.close();

  if (failures.length) {
    process.stderr.write(
      `\n${failures.length} screenshot(s) failed:\n` +
        failures.map((f) => `  - ${f.filename} (${f.storyId}): ${f.error}`).join("\n") +
        "\n",
    );
    process.exit(1);
  }
  process.stdout.write(`\n✅ ${STORIES.length} canonical screenshots saved to ${path.relative(ROOT, OUT_DIR)}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
