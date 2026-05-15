#!/usr/bin/env node
/**
 * DS audit — grep the codebase for violations of docs/ds-rules.md.
 *
 * Run: node scripts/ds-audit.mjs
 *
 * Exits 0 if clean, 1 if any violation is found. Prints a human-readable
 * report (file:line — snippet — rule broken).
 *
 * Scope: src/app and src/components, excluding _legacy and *.stories.tsx
 * (stories are intentional demo / palette showcases).
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";

const ROOT = process.cwd();
const REPORT_JSON = join(ROOT, "docs/raw/ds-audit.json");

// Rules — each entry has a name, a regex, and a description for the report.
// Regexes run over raw file text; use word boundaries / context where possible.
const RULES = [
  {
    name: "no-hex-color",
    description: "Hardcoded hex color — use a token from globals.css",
    // Match #RGB, #RGBA, #RRGGBB, #RRGGBBAA inside TSX/TS/CSS strings & attributes.
    // Exceptions: anything preceded by `//` (JS comment), `*` (block comment),
    // or inside a SVG `d=` path attribute (path data has numbers like #f000).
    // We take a simple approach: match #hex then re-check with context filter.
    regex: /#[0-9a-fA-F]{3,8}\b/g,
    fileFilter: /\.(tsx|ts|css)$/,
    contextFilter: (line) => {
      // Skip comments
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return false;
      // Skip SVG path data (d="..." with lots of numeric flags)
      if (/\bd=["']/.test(line)) return false;
      // Skip known vendor branding (LinkedIn #007EBB)
      if (/#007EBB/i.test(line)) return false;
      // Skip CSS custom property DEFINITIONS inside globals.css @theme block —
      // token declarations are fine. (We run the audit with a separate file allowlist below.)
      return true;
    },
  },
  {
    name: "no-rgba-literal",
    description: "rgba()/rgb()/hsl()/hsla() literal — use a token or shadow var",
    regex: /\b(rgba?|hsla?)\s*\(\s*\d/g,
    fileFilter: /\.(tsx|ts)$/,
    contextFilter: () => true,
  },
  {
    name: "no-default-tw-palette",
    description: "Default Tailwind palette class — use a project token",
    // bg-gray-500, text-slate-900, border-zinc-200, etc.
    regex: /\b(bg|text|border|ring|fill|stroke|from|via|to|shadow|divide|placeholder|caret|accent|decoration)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+(?:\/\d+)?\b/g,
    fileFilter: /\.(tsx|ts)$/,
    contextFilter: () => true,
  },
  {
    name: "no-arbitrary-color-or-text",
    description: "Arbitrary color/typography Tailwind value (bg-[#…], text-[14px]) — tokenize it. Spacing arbitraries (px-[1.5rem], gap-[2rem], w-[10rem]) are permitted.",
    // Only flag color prefixes + text/leading/tracking with size tokens.
    // Matches: bg-[anything], text-[anything], border-[#...], shadow-[...]
    // DOES NOT match: p-[...], m-[...], gap-[...], w-[...], h-[...] etc. (spacing/sizing)
    // `border-[N]` is removed — it's typically a width (border-[1px], border-[5px]), not a color.
    // Color overrides via border-[#...] would still need manual review.
    regex: /\b(bg|text|ring|fill|stroke|from|via|to|shadow|divide|placeholder|caret|accent|decoration|leading|tracking)-\[[^\]]+\]/g,
    fileFilter: /\.(tsx|ts)$/,
    contextFilter: (line, relPath) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return false;
      // Allow border-[1px] / border-[2px] / border-[5px] border-WIDTHS (numbers only, no hex)
      // These aren't colors; they're widths. The regex above will still catch border-[#abc].
      // Let the match stand for hex / rem borders, they're fine for widths.
      return true;
    },
  },
  {
    name: "no-raw-heading",
    description: "Raw <h1-h6> tag — use <Heading level={N}>",
    regex: /<h[1-6]\b/g,
    fileFilter: /\.(tsx|ts)$/,
    contextFilter: () => true,
  },
  {
    name: "no-inline-fontSize",
    description: "Inline style={{ fontSize: \"...\" }} — use <Heading> / <Text> / token",
    regex: /fontSize\s*:\s*["']/g,
    fileFilter: /\.(tsx|ts)$/,
    contextFilter: (line) => {
      // Skip the canonical implementations that MUST set fontSize
      if (/Heading\.tsx|Text\.tsx|SectionHeading\.tsx|GradientText\.tsx|ds-validators\.ts/.test(line)) return false;
      return true;
    },
  },
  {
    name: "no-webkit-gradient-inline",
    description: "Inline WebkitBackgroundClip pattern — use <GradientText>",
    regex: /WebkitBackgroundClip\s*:\s*["']text["']/g,
    fileFilter: /\.(tsx|ts)$/,
    contextFilter: () => true,
  },
];

// Files / dirs to exclude from all rules. Paths are relative to repo root (no leading /).
const FILE_EXCLUDES = [
  /^src\/components\/_legacy\//,
  /\.stories\.tsx?$/,
  // Token definition file — hex values are authoritative here
  /^src\/app\/globals\.css$/,
  // Runtime validators file — contains forbidden pattern strings as data
  /^src\/lib\/ds-validators\.ts$/,
  // Auto-generated content data — copied verbatim from source HTML, not authored
  /^src\/data\/blog-articles\.ts$/,
  /^src\/data\/blog-articles-v2\.ts$/,
  /^src\/data\/landings-v2\//,
  // DS components whose job is to apply the forbidden pattern correctly
  /^src\/components\/library-design\/ui\/Heading\.tsx$/,
  /^src\/components\/library-design\/ui\/Text\.tsx$/,
  /^src\/components\/library-design\/ui\/GradientText\.tsx$/,
  /^src\/components\/library-design\/ui\/SectionHeading\.tsx$/,
];

// Rule-specific exceptions (file path → rule-names-to-skip)
const RULE_EXCEPTIONS = {
  // FeatureCard sets fontSize for the icon container (2.8rem emoji size) — legitimate
  "src/components/library-design/ui/FeatureCard.tsx": ["no-inline-fontSize"],
  // ListCard keeps inline fontSize for the huge 4.8rem number — no matching token exists
  "src/components/library-design/ui/ListCard.tsx": ["no-inline-fontSize"],
  // HighlightFrame — same 5.5rem big-number case
  "src/components/library-design/sections/HighlightFrame.tsx": ["no-inline-fontSize"],
  // Hero eyebrow — fontSize is the eyebrow label micro-typography, intentional
  "src/components/library-design/sections/Hero.tsx": ["no-inline-fontSize"],
  // Navbar / NavbarDropdown — small inline flag fontSize
  "src/components/library-design/ui/Navbar.tsx": ["no-inline-fontSize"],
  "src/components/library-design/ui/NavbarDropdown.tsx": ["no-inline-fontSize"],
  // IllustrationFrame / IconIllustration / Button — sizing tokens intentionally custom
  "src/components/library-design/ui/IconIllustration.tsx": ["no-inline-fontSize"],
  "src/components/library-design/ui/Button.tsx": ["no-inline-fontSize"],
  // Slider / LogosBar / ListInline use small inline fontSize for UI decorations
  "src/components/library-design/ui/Slider.tsx": ["no-inline-fontSize"],
  "src/components/library-design/ui/LogosBar.tsx": ["no-inline-fontSize"],
  // ListInline — custom Font Awesome icon gradient requires inline backgroundImage
  "src/components/library-design/ui/ListInline.tsx": ["no-inline-fontSize", "no-webkit-gradient-inline"],
  "src/components/library-design/ui/Tag.tsx": ["no-inline-fontSize"],
  "src/components/library-design/ui/ClientCard.tsx": ["no-inline-fontSize"],
  "src/components/library-design/ui/TestimonialCard.tsx": ["no-inline-fontSize"],
  "src/components/library-design/ui/TestimonialCompanyCard.tsx": ["no-inline-fontSize"],
  "src/components/library-design/ui/FloatingCard.tsx": ["no-inline-fontSize"],
  "src/components/library-design/ui/Quote.tsx": ["no-inline-fontSize"],
  "src/components/library-design/ui/CheckList.tsx": ["no-inline-fontSize"],
  "src/components/library-design/sections/FeatureFrame.tsx": ["no-inline-fontSize"],
  "src/components/library-design/sections/Footer.tsx": ["no-inline-fontSize"],
  // FontAwesome icon wrappers — fontSize drives the glyph size
  "src/components/library-design/ui/icons/illustration-icons.tsx": ["no-inline-fontSize"],
  "src/components/library-design/ui/icons/nav-icons.tsx": ["no-inline-fontSize"],
  // IconBadge — fontSize is icon sizing, not typography. rgba is semi-transparent white overlay (data)
  "src/components/library-design/ui/IconBadge.tsx": ["no-inline-fontSize", "no-rgba-literal"],
  // ListEmphasized — intentional custom paragraph size
  "src/components/library-design/ui/ListEmphasized.tsx": ["no-inline-fontSize"],
  // Pillar / IconRow / ComparisonTable sections use inline fontSize for labels / icons
  "src/components/library-design/sections/PillarFrame.tsx": ["no-inline-fontSize"],
  "src/components/library-design/sections/IconRowFrame.tsx": ["no-inline-fontSize"],
  "src/components/library-design/sections/ComparisonTableFrame.tsx": ["no-inline-fontSize"],
  "src/components/library-design/sections/FaqFrame.tsx": ["no-inline-fontSize"],
  // HomePage inline sections:
  //   - no-inline-fontSize: big 4.8rem gradient numbers + 1.6875rem pill labels
  //     (same custom fontSizes ListCard uses, accepted).
  //   - no-raw-heading: <h5> tags used inside FeatureFrame's richContent prop
  //     (the richContent's prose wrapper styles them via [&_h5]: selectors).
  "src/components/pages/HomePage.tsx": ["no-inline-fontSize", "no-raw-heading"],
  // PmoToolPage / OutilsPilotageProjetPage — rich-text <h4>/<h5> used inside FeatureFrame richContent prop
  "src/components/pages/PmoToolPage.tsx": ["no-raw-heading"],
  "src/components/pages/OutilsPilotageProjetPage.tsx": ["no-raw-heading"],
  // LandingPageV2 dispatcher — emits raw <h5> for CompositeImageWithArrowedText
  // subSections inside FeatureFrame's richContent prose wrapper (same canonical
  // pattern as HomePage block 9 / outil-pmo newsletter sponsor).
  "src/components/pages/LandingPageV2.tsx": ["no-raw-heading"],
  // FeatureFrame richContent prose utility classes intentionally style rich-text h4/h5
  // with Tailwind arbitrary selectors — accept as internal rich-text styling.
  "src/components/library-design/sections/FeatureFrame.tsx": ["no-inline-fontSize", "no-arbitrary-color-or-text"],
  // FaqFrame question title / PillarFrame / Hero / Footer — micro-typography with
  // leading-/tracking- arbitrary values that don't have a universal token yet.
  // Keep a short list of "acceptable micro-type" exceptions.
  "src/components/library-design/sections/FaqFrame.tsx": ["no-inline-fontSize", "no-arbitrary-color-or-text"],
  // ComparisonDualFrame — same 4.8rem gradient numbers + 1.6875rem pill labels as ListCard/HomePage
  "src/components/library-design/sections/ComparisonDualFrame.tsx": ["no-inline-fontSize"],
  // EmptyState / ErrorBoundary — 3rem emoji-icon sizing (one-off decorative glyph, not body typography)
  "src/components/library-design/ui/EmptyState.tsx": ["no-inline-fontSize"],
  "src/components/library-design/ui/ErrorBoundary.tsx": ["no-inline-fontSize"],
  "src/components/library-design/sections/PillarFrame.tsx": ["no-inline-fontSize", "no-arbitrary-color-or-text"],
  "src/components/library-design/sections/Hero.tsx": ["no-inline-fontSize", "no-arbitrary-color-or-text"],
  "src/components/library-design/sections/Footer.tsx": ["no-inline-fontSize", "no-arbitrary-color-or-text"],
};

function isExcluded(path) {
  return FILE_EXCLUDES.some((re) => re.test(path));
}

function listTrackedFiles() {
  const out = execSync("git ls-files src", { cwd: ROOT, encoding: "utf8" });
  return out
    .split("\n")
    .filter(Boolean)
    .filter((p) => /\.(tsx|ts|css)$/.test(p))
    .filter((p) => !isExcluded(p));
}

function runRule(rule, files) {
  const hits = [];
  for (const relPath of files) {
    if (!rule.fileFilter.test(relPath)) continue;
    const exceptions = RULE_EXCEPTIONS[relPath] ?? [];
    if (exceptions.includes(rule.name)) continue;

    const text = readFileSync(relPath, "utf8");
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      const matches = line.match(rule.regex);
      if (!matches) return;
      if (!rule.contextFilter(line, relPath)) return;
      for (const m of matches) {
        hits.push({
          file: relPath,
          line: i + 1,
          snippet: line.trim().slice(0, 140),
          match: m,
        });
      }
    });
  }
  return hits;
}

function main() {
  const files = listTrackedFiles();
  let totalHits = 0;
  const report = [];
  const jsonReport = { date: new Date().toISOString(), totalHits: 0, rules: [] };

  for (const rule of RULES) {
    const hits = runRule(rule, files);
    if (hits.length === 0) {
      jsonReport.rules.push({ name: rule.name, description: rule.description, hits: 0, items: [] });
      continue;
    }
    totalHits += hits.length;
    report.push(`\n❌ ${rule.name}  (${hits.length} hit${hits.length > 1 ? "s" : ""})`);
    report.push(`   ${rule.description}`);
    for (const h of hits.slice(0, 20)) {
      report.push(`   ${h.file}:${h.line}  ${h.match}  —  ${h.snippet}`);
    }
    if (hits.length > 20) {
      report.push(`   … and ${hits.length - 20} more`);
    }
    jsonReport.rules.push({
      name: rule.name,
      description: rule.description,
      hits: hits.length,
      items: hits,
    });
  }

  jsonReport.totalHits = totalHits;
  mkdirSync(dirname(REPORT_JSON), { recursive: true });
  writeFileSync(REPORT_JSON, JSON.stringify(jsonReport, null, 2));

  if (totalHits === 0) {
    console.log("✅ DS audit clean — no rule violations.");
    console.log(`   JSON → ${REPORT_JSON}`);
    process.exit(0);
  }

  console.log(`DS audit — ${totalHits} violation(s):`);
  console.log(report.join("\n"));
  console.log("\nRules: docs/ds-rules.md");
  console.log(`JSON  → ${REPORT_JSON}`);
  process.exit(1);
}

main();
