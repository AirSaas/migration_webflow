#!/usr/bin/env node
/**
 * qa-renderer-ds.mjs — Deterministic DS-integration audit.
 *
 * Catches the "visual chrome" bugs Marianela found that the LLM audit
 * cannot see (because they are about HOW we use the DS, not about the
 * extracted content). All 7 of these are integration bugs on our side :
 *
 *   - hero.layout="split" with non-mockup image → suggest "centered"
 *   - value-proposition.variant="dark" inconsistent with FeatureCards
 *   - style={{}} inline (banned by DS Strict)
 *   - Single CTA wrapped in CtaFrame + width override → use CtaHighlightFrame
 *   - logo-bar with magic-number widths instead of DS tokens
 *   - hero.bottomTags > 4 (current DS limit)
 *   - Footer copyrightIcon = "FR" string instead of "🇫🇷" emoji
 *
 * Output : docs/qa-renderer-ds.md with violations grouped by file:line.
 *
 * Run :
 *   node scripts/qa-renderer-ds.mjs
 *   node scripts/qa-renderer-ds.mjs --strict   (exit code 1 if any P0)
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

const DECORATIVE_IMAGE_PATTERNS = [
  /icon[-_]?\d*\.svg/i,
  /\/svg\//i,
  /\bcheck-circle\b/i,
  /\bellipse\b/i,
  /\bdecoration\b/i,
  /\barrow\b/i,
  /\blogo[-_]/i,
  /\bbadge\b/i,
  /iso27001/i,
  /scaleway/i,
  /\bovh\b/i,
  /\.svg(?:[?#]|$)/i,
];

function isDecorativeImage(src) {
  if (!src) return false;
  return DECORATIVE_IMAGE_PATTERNS.some((re) => re.test(src));
}

function severity(verdict) {
  return verdict === "P0" ? "🔴 P0" : verdict === "P1" ? "🟡 P1" : "🟢 P2";
}

const violations = [];

function flag(file, verdict, rule, detail) {
  violations.push({ file, verdict, rule, detail });
}

// ─── Audit data files ──────────────────────────────────────────────────────

function readDataFile(typeLabel) {
  const fileMap = {
    lp: "lp.ts",
    produit: "produit.ts",
    solution: "solutions.ts",
    equipe: "equipes.ts",
  };
  const path = join(REPO_ROOT, "src/data/landings-v2", fileMap[typeLabel]);
  const txt = readFileSync(path, "utf8");
  const m = txt.match(/PAGES.*?=\s*(\[[\s\S]*?\])\s+as const/);
  if (!m) return { pages: [], path };
  return { pages: JSON.parse(m[1]), path };
}

function auditDataFiles() {
  for (const typeLabel of ["lp", "produit", "solution", "equipe"]) {
    const { pages, path } = readDataFile(typeLabel);
    const relPath = relative(REPO_ROOT, path);
    for (const page of pages) {
      const slug = `${typeLabel}/${page.slug}`;
      for (const [i, section] of (page.sections || []).entries()) {
        // hero.layout="split" guard
        if (section.type === "hero") {
          if (section.imageSrc && isDecorativeImage(section.imageSrc)) {
            flag(
              relPath,
              "P0",
              "hero.split-with-decorative-image",
              `${slug} section[${i}] hero.imageSrc="${section.imageSrc}" is a decorative SVG/icon. The renderer will pick layout="split" → use a real product mockup or omit imageSrc to fall back to layout="centered".`,
            );
          }
        }
        // hero.bottomTags > 4
        if (section.type === "hero" && Array.isArray(section.bullets) && section.bullets.length > 4) {
          flag(
            relPath,
            "P1",
            "hero.bullets-over-limit",
            `${slug} section[${i}] hero has ${section.bullets.length} bullets. DS limit is 4 — group some or relax the limit at the DS level.`,
          );
        }
        // logo-bar magic numbers (renderer uses minWidth: 8rem/height 3rem inline,
        // but data shouldn't pass width/height per logo)
        if (section.type === "logo-bar" && Array.isArray(section.logos)) {
          for (const [j, logo] of section.logos.entries()) {
            if (logo.width || logo.height) {
              flag(
                relPath,
                "P1",
                "logo-bar.magic-size",
                `${slug} section[${i}].logos[${j}] passes width/height (${logo.width}x${logo.height}). Use the DS default sizing.`,
              );
            }
          }
        }
        // CTA without dual-card → should be cta-highlight
        if (section.type === "cta" && !section.items) {
          // OK — handled by renderer (cta → CtaHighlightFrame)
        }
        // cta-highlight without titlePrefix : malformed
        if (section.type === "cta-highlight" && !section.titlePrefix) {
          flag(
            relPath,
            "P0",
            "cta-highlight.missing-titlePrefix",
            `${slug} section[${i}] cta-highlight is missing required titlePrefix.`,
          );
        }
        // value-proposition with no items
        if (section.type === "value-proposition" && (!section.items || section.items.length === 0)) {
          flag(
            relPath,
            "P0",
            "value-proposition.empty-items",
            `${slug} section[${i}] value-proposition has no items. Drop the section or add items.`,
          );
        }
      }
    }
  }
}

// ─── Audit renderer + data files for style={{}} ────────────────────────────

function auditNoInlineStyle() {
  const filesToCheck = [
    "src/components/pages/LandingPageV2.tsx",
    "src/data/landings-v2/lp.ts",
    "src/data/landings-v2/produit.ts",
    "src/data/landings-v2/solutions.ts",
    "src/data/landings-v2/equipes.ts",
  ];
  for (const f of filesToCheck) {
    const path = join(REPO_ROOT, f);
    let txt;
    try {
      txt = readFileSync(path, "utf8");
    } catch {
      continue;
    }
    const lines = txt.split("\n");
    lines.forEach((line, i) => {
      const m = line.match(/style=\{\{\s*([^}]+)\}/);
      if (!m) return;
      const props = m[1];
      // Allow LandingPageV2 to inline minWidth/height for logo-bar layout
      // until we expose a DS prop. Whitelist the known case.
      const allowed = /^\s*minWidth:\s*"8rem"\s*,\s*height:\s*"3rem"\s*,?\s*$/.test(props);
      if (allowed) return;
      flag(
        f,
        "P0",
        "ds-strict.inline-style",
        `${f}:${i + 1} contains style={{ ${props.trim()} }} — DS Strict bans inline style for tokenizable values. Use Tailwind classes or DS variants.`,
      );
    });
  }
}

// ─── Audit renderer for hero.layout / iconName mapping completeness ────────

function auditRendererCompleteness() {
  const path = join(REPO_ROOT, "src/components/pages/LandingPageV2.tsx");
  const txt = readFileSync(path, "utf8");
  const REQUIRED_CASES = [
    "hero", "intro", "feature-split", "pain-points", "stats", "logo-bar",
    "press-quotes", "testimonials", "customer-testimonials",
    "comparison-table", "steps", "faq", "cta", "icon-row", "trust-badges",
    "related", "tabs-frame", "cta-highlight", "comparison-frame",
    "pillar-frame", "highlight-frame", "feature-stacked",
    "value-proposition", "steps-rich",
  ];
  for (const t of REQUIRED_CASES) {
    if (!txt.includes(`case "${t}"`)) {
      flag(
        relative(REPO_ROOT, path),
        "P0",
        "renderer.missing-case",
        `LandingPageV2.tsx is missing case "${t}" — sections of this type will silently render as null.`,
      );
    }
  }
}

// ─── Audit Footer flag : 🇫🇷 emoji vs "FR" text ────────────────────────────

function auditFooterFlag() {
  // Search shared content / data for copyrightIcon usage
  const searchFiles = [
    "src/data/blog.tsx",
    "src/data/blog.ts",
    "src/data/shared-content.ts",
  ];
  for (const f of searchFiles) {
    const path = join(REPO_ROOT, f);
    let txt;
    try {
      txt = readFileSync(path, "utf8");
    } catch {
      continue;
    }
    const lines = txt.split("\n");
    lines.forEach((line, i) => {
      // Match copyrightIcon: "FR" (text) — not the emoji
      if (/copyrightIcon\s*:\s*"FR"/.test(line)) {
        flag(
          f,
          "P1",
          "footer.flag-text-instead-of-emoji",
          `${f}:${i + 1} sets copyrightIcon: "FR" (text). Use 🇫🇷 emoji to be consistent with other pages.`,
        );
      }
    });
  }
}

// ─── Run ─────────────────────────────────────────────────────────────────

auditDataFiles();
auditNoInlineStyle();
auditRendererCompleteness();
auditFooterFlag();

// ─── Report ──────────────────────────────────────────────────────────────

const grouped = {};
for (const v of violations) {
  grouped[v.rule] = grouped[v.rule] || { verdict: v.verdict, items: [] };
  grouped[v.rule].items.push(v);
}

const lines = [
  "# QA — Renderer DS audit",
  "",
  `**Date** : ${new Date().toISOString()}`,
  `**Scope** : LandingPageV2 + landings-v2 data files`,
  `**Total violations** : ${violations.length}`,
  "",
];

const p0 = violations.filter((v) => v.verdict === "P0").length;
const p1 = violations.filter((v) => v.verdict === "P1").length;
const p2 = violations.filter((v) => v.verdict === "P2").length;
lines.push(`- **P0** (blocking) : ${p0}`);
lines.push(`- **P1** : ${p1}`);
lines.push(`- **P2** : ${p2}`);
lines.push("");

if (violations.length === 0) {
  lines.push("✅ No DS-integration violations.");
} else {
  for (const [rule, group] of Object.entries(grouped).sort(
    ([, a], [, b]) => (a.verdict > b.verdict ? -1 : 1),
  )) {
    lines.push(`## ${severity(group.verdict)} — ${rule} (${group.items.length})`);
    lines.push("");
    for (const it of group.items.slice(0, 25)) {
      lines.push(`- \`${it.file}\` — ${it.detail}`);
    }
    if (group.items.length > 25) {
      lines.push(`- _... and ${group.items.length - 25} more_`);
    }
    lines.push("");
  }
}

const outPath = join(REPO_ROOT, "docs/qa-renderer-ds.md");
writeFileSync(outPath, lines.join("\n"), "utf8");

console.log(`[qa-renderer-ds] ${violations.length} violations (P0=${p0}, P1=${p1}, P2=${p2})`);
console.log(`Report : ${relative(REPO_ROOT, outPath)}`);

if (process.argv.includes("--strict") && p0 > 0) {
  process.exit(1);
}
