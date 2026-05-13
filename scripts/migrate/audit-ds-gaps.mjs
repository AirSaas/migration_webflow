#!/usr/bin/env node
/**
 * audit-ds-gaps.mjs
 *
 * Pre-flight DS gap audit before the blog migration pipeline runs. Compares
 * what the blog template (Figma node 303:1015) needs against what the DS
 * currently provides (docs/raw/ds-registry.json) and what the V0 acceptance
 * rules (docs/blog-design-rules.yaml) reference.
 *
 * The mapping from Figma layer names → DS components is encoded here
 * (analysis already done by Claude reading docs/raw/figma-dumps/
 * blog-template-303-1015.tsx + the source TSX of each DS component). When
 * Marianela ships a NEW Figma frame later, this mapping is updated.
 *
 * Output : docs/ds-gaps-blog-migration.md with three sections :
 *   - NEW COMPONENTS to create
 *   - NEW PROPS / VARIANTS to add to existing components
 *   - DS BUGS to fix (e.g. tailwind-merge silently drops `text-white`)
 *
 * Re-run after each round of DS extensions until the doc reports `0 gaps`.
 *
 * Usage : node scripts/migrate/audit-ds-gaps.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");

const REGISTRY_PATH = join(REPO_ROOT, "docs/raw/ds-registry.json");
const OUT_PATH = join(REPO_ROOT, "docs/ds-gaps-blog-migration.md");

/**
 * What the blog template (Figma 303:1015) requires from the DS.
 * Manually compiled by Claude from :
 *   - docs/raw/figma-dumps/blog-template-303-1015.tsx (Figma → React+Tailwind dump)
 *   - docs/blog-design-rules.yaml (acceptance rules)
 *   - .context/attachments/AUDIT BLOG REBUILD vs FIGMA 2.docx (Marianela's audit)
 */
const REQUIRED_COMPONENTS = [
  {
    name: "TableOfContentsFrame",
    purpose: "Centered card TOC at top of blog body — bordered, circle-small bullets, blue text. Figma node 303:1107.",
    figmaLayer: "Blog Sommaire",
    requiredVariants: {},
    requiredProps: ["title", "items"],
    rationale:
      "Marianela audit #1 — the current <TocSidebar> is a sticky left sidebar with numbered items and orange active state. Figma wants a centered bordered card with circle bullets, no sticky.",
  },
  {
    name: "Quote",
    figmaLayer: "Quote",
    requiredVariants: { variant: ["card"] },
    requiredProps: ["author", "authorAvatar"],
    rationale:
      "Marianela audit #3 — body quotes must render as <Quote variant='card'> (bordered card with icon-quote decoration), NOT variant='pull'.",
  },
  {
    name: "Heading",
    figmaLayer: "(40px subsection titles, 70px section titles)",
    requiredVariants: { gradient: ["primary"], level: [2, 3, 4] },
    requiredProps: ["level", "gradient", "align"],
    /** Hand-verified in Heading.tsx (2026-05-13): supports level 1-6 and
     *  gradient="primary" | "dark-to-primary" | "none" with `level !== 4`
     *  guard for gradient. No DS gap — the bug is renderer-side hardcoding. */
    verifiedOnDisk: true,
    rationale:
      "Marianela audit #4 — body subsection headings (DS level=3) must render with gradient='primary' (Figma : linear-gradient #3c51e2 → #3547c6). Currently the renderer hardcodes gradient='none'.",
  },
  {
    name: "TableFrame",
    figmaLayer: "table richtext blog",
    requiredVariants: {},
    requiredProps: ["columns", "rows"],
    rationale:
      "Marianela audit #5 — table headers must render WHITE text on bg-primary. Currently text-white is silently dropped by tailwind-merge (text-paragraph treated as text-color group).",
  },
  {
    name: "IllustrationFrame",
    figmaLayer: "Image richtext blog",
    requiredVariants: { tone: ["warm"], widthMode: ["breakout"] },
    requiredProps: ["src", "alt", "tone", "widthMode", "caption"],
    /** widthMode="breakout" added 2026-05-13 (P1 fix). Hand-verified. */
    verifiedOnDisk: true,
    rationale:
      "Marianela audit #2 — body images need to span the full prose-frame width (not constrained to max-w-50rem) with cream bg-prevention-10 frame. New prop `widthMode='breakout'` to escape the reading column.",
  },
  {
    name: "InsightCallout",
    figmaLayer: "(not in template but used for alert blockquotes)",
    requiredVariants: { variant: ["primary", "success", "warning"] },
    requiredProps: ["title", "items"],
    rationale:
      "v7 carry-over — alert blockquotes (⚠️ 💡 📌 …) converted to InsightCallout in render. Items prop now accepts ReactNode (preserves <strong>/<em>/<a>).",
  },
  {
    name: "InlineCta",
    figmaLayer: "(used as fallback for HubSpot embeds)",
    requiredVariants: {},
    requiredProps: ["text", "ctaLabel", "ctaHref"],
    rationale: "v7 carry-over — HubSpot CTA embeds rendered as /fr/meetings-pages CTA.",
  },
  {
    name: "CtaHighlightFrame",
    figmaLayer: "CTA Frame Stacked (centered)",
    requiredVariants: {},
    requiredProps: ["titlePrefix", "titleHighlight", "titleSuffix", "subtitle", "ctaLabel", "ctaHref"],
    rationale: "Closing CTA with gradient background + floating cards. Already wired.",
  },
  {
    name: "BlogHero",
    figmaLayer: "Hero Blog / Wrapper Hero Blog",
    requiredVariants: {},
    requiredProps: [],
    rationale: "Page hero with title + author byline + reading time. Already wired.",
  },
  {
    name: "FaqFrame",
    figmaLayer: "FAQ Frame",
    requiredVariants: {},
    requiredProps: [],
    rationale: "FAQ accordion section. Already wired.",
  },
  {
    name: "NewsletterInlineCard",
    figmaLayer: "(inside body)",
    requiredVariants: {},
    requiredProps: [],
    rationale: "Inline newsletter card between body sections. Toggleable per article (CMS).",
  },
];

/**
 * Known DS BUGS that must be fixed for the blog to render correctly.
 * Each entry triggers a "BUG" item in the gap report regardless of registry contents.
 */
const KNOWN_DS_BUGS = [
  {
    name: "TableFrame text-white drop (tailwind-merge) — FIXED",
    severity: "P0",
    location: "src/lib/utils.ts (cn) + src/components/library-design/ui/TableFrame.tsx",
    issue:
      "twMerge dedup drops `text-white` because `text-paragraph` (a font-size token) is mis-classified as text-color. Result: header text invisible (black on primary blue).",
    fix: "DONE 2026-05-13 — cn() now uses extendTailwindMerge({extend:{classGroups:{font-size:[{text:['paragraph','small','h1-h4']}]}}}). Verified: rendered <th> now keeps text-white. Marked as bug-fixed in pre-flight.",
    resolved: true,
  },
  {
    name: "renderBlogBlocks hardcodes variant='pull' and gradient='none' (PHASE-5)",
    severity: "P0",
    location: "src/components/blog/renderBlogBlocks.tsx",
    issue:
      "Renderer makes design decisions instead of consuming an explicit spec. Will be replaced by V3 passive renderer in Phase 5 (renderBlogBlocksV3.tsx).",
    fix: "Phase 5 task — passive renderer reads variant/gradient from spec. Not a pre-flight blocker.",
    deferToPhase: 5,
  },
];

function loadRegistry() {
  if (!existsSync(REGISTRY_PATH)) {
    console.error(`Registry not found at ${REGISTRY_PATH}. Run: node scripts/migrate/generate-ds-registry.mjs`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
}

/**
 * Filesystem fallback : the markdown registry can be out of date
 * (docs/ds-components-reference.md regenerated manually). Check disk too.
 */
function componentExistsOnDisk(name) {
  const candidates = [
    join(REPO_ROOT, `src/components/library-design/ui/${name}.tsx`),
    join(REPO_ROOT, `src/components/library-design/sections/${name}.tsx`),
    join(REPO_ROOT, `src/components/library-design/${name}.tsx`),
  ];
  return candidates.some((p) => existsSync(p));
}

function detectGaps(registry) {
  const newComponents = [];
  const missingVariants = [];
  const missingProps = [];

  for (const req of REQUIRED_COMPONENTS) {
    const inDs = registry.componentsByName[req.name];
    const onDisk = componentExistsOnDisk(req.name);

    // Component is "missing" only if neither registry nor disk has it.
    if (!inDs && !onDisk) {
      newComponents.push(req);
      continue;
    }
    // If only on disk (registry out of date), we still want to assert
    // variants — but we have no registry data. Skip variant check; the
    // pipeline's DS Conformance Validator will catch any runtime mismatch.
    if (!inDs) continue;
    // Components explicitly hand-verified — skip variant scan.
    if (req.verifiedOnDisk) continue;

    // Variants : check each required variant value is registered.
    // The registry's `variants` map may be noisy (extracted from markdown);
    // we treat ABSENCE of the variant value as the gap signal.
    for (const [propName, requiredValues] of Object.entries(req.requiredVariants)) {
      const registered = (inDs.variants && inDs.variants[propName]) || [];
      const registeredSet = new Set(registered.map((v) => String(v).toLowerCase()));
      const missing = requiredValues.filter((v) => !registeredSet.has(String(v).toLowerCase()));
      if (missing.length > 0) {
        missingVariants.push({
          component: req.name,
          prop: propName,
          missing,
          rationale: req.rationale,
        });
      }
    }

    // Props : we can't reliably know if a prop EXISTS from the markdown
    // registry (it doesn't always document every prop). So we report
    // requiredProps as "informational" only, not as gaps.
  }

  return { newComponents, missingVariants, missingProps };
}

function renderReport({ newComponents, missingVariants, missingProps }) {
  const activeBugs = KNOWN_DS_BUGS.filter((b) => !b.resolved && !b.deferToPhase);
  const resolvedBugs = KNOWN_DS_BUGS.filter((b) => b.resolved);
  const deferredBugs = KNOWN_DS_BUGS.filter((b) => b.deferToPhase);
  const totalGaps = newComponents.length + missingVariants.length + activeBugs.length;
  const lines = [];
  lines.push("# DS gaps for blog migration v8");
  lines.push("");
  lines.push(`Generated : ${new Date().toISOString()}`);
  lines.push("");
  lines.push(`**Active gaps : ${totalGaps}**  (new components: ${newComponents.length}, missing variants: ${missingVariants.length}, active DS bugs: ${activeBugs.length})`);
  if (resolvedBugs.length || deferredBugs.length) {
    lines.push(`Resolved bugs : ${resolvedBugs.length} ; deferred (Phase 5) : ${deferredBugs.length}`);
  }
  lines.push("");
  lines.push("Sources :");
  lines.push("- `docs/raw/figma-dumps/blog-template-303-1015.tsx` (Figma → React dump)");
  lines.push("- `docs/raw/ds-registry.json` (DS catalog)");
  lines.push("- `docs/blog-design-rules.yaml` (acceptance rules V0)");
  lines.push("- `.context/attachments/AUDIT BLOG REBUILD vs FIGMA 2.docx` (Marianela's audit)");
  lines.push("");
  lines.push("Re-run this audit after each round of DS extensions: `node scripts/migrate/audit-ds-gaps.mjs`. Goal : 0 gaps before pipeline starts.");
  lines.push("");

  // ── New components ──
  lines.push("## 1. NEW components to create");
  lines.push("");
  if (newComponents.length === 0) {
    lines.push("_None_");
  } else {
    for (const c of newComponents) {
      lines.push(`### \`<${c.name}>\``);
      lines.push("");
      lines.push(`- **Figma layer** : \`${c.figmaLayer}\``);
      lines.push(`- **Purpose** : ${c.purpose ?? "(see rationale)"}`);
      lines.push(`- **Required props** : ${c.requiredProps.join(", ") || "_none_"}`);
      if (Object.keys(c.requiredVariants).length > 0) {
        const v = Object.entries(c.requiredVariants).map(([k, vals]) => `${k}=[${vals.join("|")}]`).join(", ");
        lines.push(`- **Required variants** : ${v}`);
      }
      lines.push(`- **Why** : ${c.rationale}`);
      lines.push("");
    }
  }

  // ── Missing variants on existing components ──
  lines.push("## 2. NEW variants / props on existing components");
  lines.push("");
  if (missingVariants.length === 0) {
    lines.push("_None_");
  } else {
    for (const m of missingVariants) {
      lines.push(`### \`<${m.component}>\` — add \`${m.prop}\` values: ${m.missing.map((v) => `"${v}"`).join(", ")}`);
      lines.push("");
      lines.push(`- **Why** : ${m.rationale}`);
      lines.push("");
    }
  }

  // ── DS bugs (active / resolved / deferred) ──
  lines.push("## 3. DS bugs");
  lines.push("");
  lines.push("### Active");
  lines.push("");
  if (activeBugs.length === 0) lines.push("_None_");
  for (const b of activeBugs) {
    lines.push(`#### [${b.severity}] ${b.name}`);
    lines.push("");
    lines.push(`- **Location** : \`${b.location}\``);
    lines.push(`- **Issue** : ${b.issue}`);
    lines.push(`- **Fix** : ${b.fix}`);
    lines.push("");
  }
  if (resolvedBugs.length > 0) {
    lines.push("### Resolved (kept for history)");
    lines.push("");
    for (const b of resolvedBugs) {
      lines.push(`- ✅ **${b.name}** — ${b.fix}`);
    }
    lines.push("");
  }
  if (deferredBugs.length > 0) {
    lines.push("### Deferred to later phases");
    lines.push("");
    for (const b of deferredBugs) {
      lines.push(`- ⏭ **${b.name}** (Phase ${b.deferToPhase}) — ${b.fix}`);
    }
    lines.push("");
  }

  // ── Footer / next steps ──
  lines.push("## Next steps");
  lines.push("");
  if (totalGaps === 0) {
    lines.push("✅ All gaps closed. Phase 2 (build the pipeline) can start.");
  } else {
    lines.push("1. Address each gap in the order shown above (new components first, then variants, then bugs).");
    lines.push("2. Re-run `node scripts/migrate/audit-ds-gaps.mjs` after each change.");
    lines.push("3. When the report shows 0 gaps, proceed to Phase 2 (pipeline build).");
  }
  lines.push("");

  return lines.join("\n");
}

function main() {
  console.log("[audit-ds-gaps] starting");
  const registry = loadRegistry();
  console.log(`[audit-ds-gaps] loaded registry : ${registry.componentCount} components`);
  const gaps = detectGaps(registry);
  console.log(
    `[audit-ds-gaps] gaps detected : ${gaps.newComponents.length} new components, ${gaps.missingVariants.length} missing variants, ${KNOWN_DS_BUGS.length} known DS bugs`,
  );
  const report = renderReport(gaps);
  writeFileSync(OUT_PATH, report);
  console.log(`[audit-ds-gaps] report written → ${OUT_PATH}`);
}

main();
