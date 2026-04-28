#!/usr/bin/env node
/**
 * qa-go-no-go.mjs — Consolidate the 6 QA dimensions into one go/no-go report.
 *
 * Reads (when present):
 *   - docs/raw/qa-page.json
 *   - docs/raw/qa-llm.json
 *   - docs/raw/rebuild-verification.json   (text coverage)
 *   - docs/raw/visual-diff.json            (pixel diff)
 *   - docs/raw/lighthouse.json             (a11y + perf + SEO)
 *   - docs/raw/broken-links.json
 *   - docs/raw/ds-audit.json               (optional, see TODO)
 *
 * Outputs : docs/qa-go-no-go.md
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT, getAllTargets } from "./qa-shared.mjs";

const SOURCES = {
  qaPage: "docs/raw/qa-page.json",
  qaLlm: "docs/raw/qa-llm.json",
  textCov: "docs/raw/rebuild-verification.json",
  visual: "docs/raw/visual-diff.json",
  lighthouse: "docs/raw/lighthouse.json",
  links: "docs/raw/broken-links.json",
  ds: "docs/raw/ds-audit.json",
};

function load(name) {
  const p = join(REPO_ROOT, SOURCES[name]);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch (e) {
    console.warn(`[qa-go-no-go] cannot parse ${p}: ${e.message}`);
    return null;
  }
}

function indexBy(arr, keyFn) {
  const m = new Map();
  for (const r of arr || []) m.set(keyFn(r), r);
  return m;
}

const targets = getAllTargets();
const sources = {
  qaPage: load("qaPage"),
  qaLlm: load("qaLlm"),
  textCov: load("textCov"),
  visual: load("visual"),
  lighthouse: load("lighthouse"),
  links: load("links"),
  ds: load("ds"),
};

const idx = {
  qaPage: indexBy(sources.qaPage, (r) => `${r.type}/${r.slug}`),
  qaLlm: indexBy(sources.qaLlm, (r) => `${r.type}/${r.slug}`),
  textCov: indexBy(sources.textCov, (r) => `${r.type}/${r.slug}`),
  visual: indexBy(sources.visual, (r) => `${r.type}/${r.slug}`),
  lighthouse: indexBy(sources.lighthouse, (r) => `${r.type}/${r.slug}`),
  links: indexBy(sources.links, (r) => `${r.type}/${r.slug}`),
};

function severityCounts(issues) {
  const c = { P0: 0, P1: 0, P2: 0, P3: 0 };
  for (const i of issues || []) {
    const s = i.severity || "P3";
    c[s] = (c[s] || 0) + 1;
  }
  return c;
}

function pageVerdict(t) {
  const k = `${t.type}/${t.slug}`;
  const reasons = [];
  let block = false;
  let warn = false;

  // qa-page
  const pp = idx.qaPage.get(k);
  if (pp) {
    const c = severityCounts(pp.issues);
    if (c.P0 > 0) {
      block = true;
      reasons.push(`regex P0=${c.P0}`);
    } else if (c.P1 > 0) {
      warn = true;
    }
  }
  // qa-llm
  const pl = idx.qaLlm.get(k);
  if (pl) {
    const c = severityCounts(pl.issues);
    if (c.P0 > 0) {
      block = true;
      reasons.push(`llm P0=${c.P0}`);
    } else if (c.P1 > 1) {
      warn = true;
    }
  }
  // text coverage
  const tc = idx.textCov.get(k);
  if (tc && typeof tc.coverage === "number") {
    if (tc.coverage < 0.85) {
      block = true;
      reasons.push(`textCov=${(tc.coverage * 100).toFixed(0)}%`);
    } else if (tc.coverage < 0.92) {
      warn = true;
    }
  }
  // visual diff
  const vd = idx.visual.get(k);
  if (vd && vd.widths) {
    for (const [w, wr] of Object.entries(vd.widths)) {
      if (typeof wr.diffPercent === "number") {
        if (wr.diffPercent > 25) {
          warn = true;
          reasons.push(`visual${w}=${wr.diffPercent.toFixed(0)}%`);
        }
      }
    }
  }
  // lighthouse
  const lh = idx.lighthouse.get(k);
  if (lh && lh.desktop && !lh.desktop.error) {
    if (lh.desktop.a11y < 90) {
      warn = true;
      reasons.push(`a11y=${lh.desktop.a11y}`);
    }
    if (lh.desktop.seo < 90) {
      warn = true;
      reasons.push(`seo=${lh.desktop.seo}`);
    }
    if (lh.desktop.perf < 50) {
      warn = true;
      reasons.push(`perf=${lh.desktop.perf}`);
    }
  }
  // broken links
  const bl = idx.links.get(k);
  if (bl) {
    const c = severityCounts(bl.issues);
    if (c.P0 > 0) {
      block = true;
      reasons.push(`links P0=${c.P0}`);
    } else if (c.P1 > 0) {
      warn = true;
    }
  }

  return {
    verdict: block ? "BLOCK" : warn ? "WARN" : "PASS",
    reasons,
  };
}

const verdicts = targets.map((t) => ({ ...t, ...pageVerdict(t) }));
const counts = { PASS: 0, WARN: 0, BLOCK: 0 };
for (const v of verdicts) counts[v.verdict]++;

const blocked = verdicts.filter((v) => v.verdict === "BLOCK");
const warned = verdicts.filter((v) => v.verdict === "WARN");

function median(arr) {
  if (!arr.length) return null;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

// Aggregate metrics across sources
const lhArr = sources.lighthouse?.filter((r) => r.desktop && !r.desktop.error) ?? [];
const visualArr = [];
for (const r of sources.visual ?? []) {
  for (const wr of Object.values(r.widths || {})) {
    if (typeof wr.diffPercent === "number") visualArr.push(wr.diffPercent);
  }
}
const tcArr = sources.textCov?.map((r) => r.coverage).filter((v) => typeof v === "number") ?? [];

// Pattern detection: what bugs are systemic?
const patternMap = new Map();
for (const r of sources.qaLlm ?? []) {
  for (const i of r.issues || []) {
    if (i.severity !== "P0") continue;
    const sig = (i.description || "").slice(0, 80).replace(/\s+/g, " ").trim();
    if (!sig) continue;
    if (!patternMap.has(sig)) patternMap.set(sig, []);
    patternMap.get(sig).push(`${r.type}/${r.slug}`);
  }
}
const systemicPatterns = [...patternMap.entries()]
  .filter(([, arr]) => arr.length >= 3)
  .sort((a, b) => b[1].length - a[1].length);

// ─── Verdict global ────────────────────────────────────────────────────────
const passRatio = counts.PASS / verdicts.length;
const lhA11yMedian = median(lhArr.map((r) => r.desktop.a11y));
const lhSeoMedian = median(lhArr.map((r) => r.desktop.seo));
const lhPerfMedian = median(lhArr.map((r) => r.desktop.perf));

const goConditions = [
  { name: "0 P0 toutes catégories", pass: counts.BLOCK === 0 },
  { name: "≥ 90% pages PASS (≥ 80/88)", pass: passRatio >= 0.9 },
  { name: "A11y médiane ≥ 90", pass: lhA11yMedian == null || lhA11yMedian >= 90 },
  { name: "SEO médiane ≥ 95", pass: lhSeoMedian == null || lhSeoMedian >= 95 },
  { name: "0 broken link P0", pass: !sources.links?.some((r) => r.issues?.some((i) => i.severity === "P0")) },
];
const allPass = goConditions.every((c) => c.pass);

// ─── Report ────────────────────────────────────────────────────────────────
const lines = [];
lines.push(`# QA Go / No-Go report`);
lines.push("");
lines.push(`**Date** : ${new Date().toISOString()}`);
lines.push("");
lines.push(`## Verdict global : ${allPass ? "✅ GO" : "🛑 NO-GO"}`);
lines.push("");
lines.push(`| Critère | Statut |`);
lines.push(`|---|---|`);
for (const c of goConditions) lines.push(`| ${c.name} | ${c.pass ? "✅" : "❌"} |`);
lines.push("");
lines.push(`## Pages — ${verdicts.length} total`);
lines.push(`- ✅ PASS : ${counts.PASS}`);
lines.push(`- ⚠️ WARN : ${counts.WARN}`);
lines.push(`- 🛑 BLOCK : ${counts.BLOCK}`);
lines.push("");

const byType = new Map();
for (const v of verdicts) {
  if (!byType.has(v.type)) byType.set(v.type, { PASS: 0, WARN: 0, BLOCK: 0, total: 0 });
  const b = byType.get(v.type);
  b[v.verdict]++;
  b.total++;
}
lines.push(`### Par type`);
lines.push(``);
lines.push(`| Type | Total | PASS | WARN | BLOCK |`);
lines.push(`|---|---|---|---|---|`);
for (const [type, b] of byType) {
  lines.push(`| ${type} | ${b.total} | ${b.PASS} | ${b.WARN} | ${b.BLOCK} |`);
}
lines.push("");

lines.push(`## Aggregate metrics`);
lines.push(``);
lines.push(`| Source | Median | Coverage |`);
lines.push(`|---|---|---|`);
if (lhArr.length) {
  lines.push(`| Lighthouse perf | ${lhPerfMedian} | ${lhArr.length}/88 |`);
  lines.push(`| Lighthouse a11y | ${lhA11yMedian} | ${lhArr.length}/88 |`);
  lines.push(`| Lighthouse SEO | ${lhSeoMedian} | ${lhArr.length}/88 |`);
}
if (visualArr.length) {
  lines.push(`| Visual diff % | ${median(visualArr)?.toFixed(1)}% | ${visualArr.length} captures |`);
}
if (tcArr.length) {
  lines.push(`| Text coverage | ${(median(tcArr) * 100).toFixed(1)}% | ${tcArr.length}/88 |`);
}
lines.push("");

if (systemicPatterns.length) {
  lines.push(`## Systemic P0 patterns (≥3 pages affected)`);
  lines.push(``);
  for (const [sig, pages] of systemicPatterns) {
    lines.push(`### \`${sig}…\` — ${pages.length} pages`);
    for (const p of pages) lines.push(`- ${p}`);
    lines.push(``);
  }
}

if (blocked.length) {
  lines.push(`## Pages BLOCK — ${blocked.length}`);
  for (const v of blocked) {
    lines.push(`- **${v.type}/${v.slug}** — ${v.reasons.join(", ")}`);
  }
  lines.push("");
}

if (warned.length) {
  lines.push(`## Pages WARN — ${warned.length}`);
  for (const v of warned.slice(0, 30)) {
    lines.push(`- ${v.type}/${v.slug} — ${v.reasons.join(", ")}`);
  }
  if (warned.length > 30) lines.push(`- … +${warned.length - 30} more`);
  lines.push("");
}

lines.push(`## Source data`);
for (const [k, p] of Object.entries(SOURCES)) {
  lines.push(`- ${k} → \`${p}\` ${existsSync(join(REPO_ROOT, p)) ? "✅" : "❌ missing"}`);
}

writeFileSync(join(REPO_ROOT, "docs/qa-go-no-go.md"), lines.join("\n"));
console.log(`[qa-go-no-go] verdict = ${allPass ? "GO" : "NO-GO"}`);
console.log(`[qa-go-no-go] PASS=${counts.PASS} WARN=${counts.WARN} BLOCK=${counts.BLOCK}`);
console.log(`[qa-go-no-go] report → docs/qa-go-no-go.md`);
