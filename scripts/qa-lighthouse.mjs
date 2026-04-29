#!/usr/bin/env node
/**
 * qa-lighthouse.mjs — Lighthouse audit (a11y + perf + SEO + best-practices)
 * across the 88 rebuild pages.
 *
 * Default mode : desktop only (1440×900, 10 Mbps, no throttling). 88 pages
 * ≈ 30-45 min. Pass --mobile to also run mobile Moto-G4 throttled audits
 * (doubles wall-clock).
 *
 * Output : docs/raw/lighthouse.json + docs/qa-lighthouse-report.md
 *
 * Pre-req : next dev on http://localhost:3000 + Chrome installed.
 *
 * Usage:
 *   node scripts/qa-lighthouse.mjs
 *   node scripts/qa-lighthouse.mjs --mobile
 *   node scripts/qa-lighthouse.mjs --type=blog --limit=5
 *   node scripts/qa-lighthouse.mjs --slug=ppm
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import {
  REPO_ROOT,
  REBUILD_BASE,
  getAllTargets,
  parseArgs,
  filterTargets,
} from "./qa-shared.mjs";

const REPORT_PATH = join(REPO_ROOT, "docs/qa-lighthouse-report.md");
const REPORT_JSON = join(REPO_ROOT, "docs/raw/lighthouse.json");

const args = parseArgs(process.argv);
const targets = filterTargets(getAllTargets(), args);
const RUN_MOBILE = process.argv.includes("--mobile");
console.log(`[qa-lighthouse] target count = ${targets.length} (mobile=${RUN_MOBILE})`);

const DESKTOP_OPTS = {
  output: "json",
  logLevel: "error",
  onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  formFactor: "desktop",
  screenEmulation: {
    mobile: false,
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    disabled: false,
  },
  throttling: {
    rttMs: 40,
    throughputKbps: 10240,
    cpuSlowdownMultiplier: 1,
    requestLatencyMs: 0,
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0,
  },
  emulatedUserAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
};

const MOBILE_OPTS = {
  ...DESKTOP_OPTS,
  formFactor: "mobile",
  screenEmulation: {
    mobile: true,
    width: 412,
    height: 823,
    deviceScaleFactor: 1.75,
    disabled: false,
  },
  throttling: {
    rttMs: 150,
    throughputKbps: 1638.4,
    cpuSlowdownMultiplier: 4,
  },
  emulatedUserAgent:
    "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36",
};

async function runLighthouse(url, opts, port) {
  const result = await lighthouse(url, { port, ...opts });
  if (!result || !result.lhr) throw new Error("Lighthouse returned empty result");
  const lhr = result.lhr;
  return {
    finalUrl: lhr.finalUrl,
    perf: Math.round((lhr.categories.performance?.score ?? 0) * 100),
    a11y: Math.round((lhr.categories.accessibility?.score ?? 0) * 100),
    bp: Math.round((lhr.categories["best-practices"]?.score ?? 0) * 100),
    seo: Math.round((lhr.categories.seo?.score ?? 0) * 100),
    lcp: lhr.audits["largest-contentful-paint"]?.numericValue ?? null,
    cls: lhr.audits["cumulative-layout-shift"]?.numericValue ?? null,
    inp: lhr.audits["interaction-to-next-paint"]?.numericValue ?? null,
    fcp: lhr.audits["first-contentful-paint"]?.numericValue ?? null,
    tbt: lhr.audits["total-blocking-time"]?.numericValue ?? null,
    a11yFails: Object.values(lhr.audits)
      .filter((a) => a.score !== null && a.score < 1 && a.id && lhr.categories.accessibility?.auditRefs?.find((r) => r.id === a.id))
      .map((a) => ({ id: a.id, title: a.title, score: a.score })),
    seoFails: Object.values(lhr.audits)
      .filter((a) => a.score !== null && a.score < 1 && a.id && lhr.categories.seo?.auditRefs?.find((r) => r.id === a.id))
      .map((a) => ({ id: a.id, title: a.title, score: a.score })),
  };
}

async function main() {
  mkdirSync(dirname(REPORT_JSON), { recursive: true });
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });
  const t0 = Date.now();
  const out = [];
  try {
    for (let i = 0; i < targets.length; i++) {
      const t = targets[i];
      const url = REBUILD_BASE + t.path;
      const row = { ...t };
      const ts = Date.now();
      try {
        row.desktop = await runLighthouse(url, DESKTOP_OPTS, chrome.port);
      } catch (e) {
        row.desktop = { error: e.message };
      }
      if (RUN_MOBILE) {
        try {
          row.mobile = await runLighthouse(url, MOBILE_OPTS, chrome.port);
        } catch (e) {
          row.mobile = { error: e.message };
        }
      }
      out.push(row);
      const dt = Math.round((Date.now() - ts) / 1000);
      const d = row.desktop?.error
        ? `ERR ${row.desktop.error}`
        : `desk perf=${row.desktop.perf} a11y=${row.desktop.a11y} seo=${row.desktop.seo}`;
      console.log(`  [${i + 1}/${targets.length}] ${t.type}/${t.slug}  ${d}  (${dt}s)`);
    }
  } finally {
    await chrome.kill();
  }
  writeFileSync(REPORT_JSON, JSON.stringify(out, null, 2));

  // ─── Markdown report ────────────────────────────────────────────────────
  const ok = out.filter((r) => !r.desktop?.error);
  function median(arr) {
    if (!arr.length) return null;
    const s = [...arr].sort((a, b) => a - b);
    return s[Math.floor(s.length / 2)];
  }
  const m = (key) => median(ok.map((r) => r.desktop[key]).filter((v) => typeof v === "number"));
  const lines = [];
  lines.push(`# QA Lighthouse report (desktop)`);
  lines.push("");
  lines.push(`**Date** : ${new Date().toISOString()}`);
  lines.push(`**Pages audited** : ${out.length} (errors: ${out.length - ok.length})`);
  lines.push("");
  lines.push(`## Medians`);
  lines.push("");
  lines.push(`| Metric | Median | Target |`);
  lines.push(`|---|---|---|`);
  lines.push(`| Performance | ${m("perf")} | ≥75 mobile / ≥90 desktop |`);
  lines.push(`| Accessibility | ${m("a11y")} | ≥90 |`);
  lines.push(`| SEO | ${m("seo")} | ≥95 |`);
  lines.push(`| Best Practices | ${m("bp")} | ≥90 |`);
  const lcpVals = ok.map((r) => r.desktop.lcp).filter((v) => typeof v === "number");
  const clsVals = ok.map((r) => r.desktop.cls).filter((v) => typeof v === "number");
  lines.push(`| LCP (ms) | ${median(lcpVals)} | <2500 |`);
  lines.push(`| CLS | ${median(clsVals)?.toFixed(3)} | <0.1 |`);
  lines.push("");
  lines.push(`## A11y < 90 — pages`);
  const a11yBad = ok.filter((r) => r.desktop.a11y < 90).sort((a, b) => a.desktop.a11y - b.desktop.a11y);
  for (const r of a11yBad) {
    const fails = r.desktop.a11yFails.map((f) => f.id).join(", ");
    lines.push(`- **${r.type}/${r.slug}** — score ${r.desktop.a11y} — fails: ${fails}`);
  }
  if (!a11yBad.length) lines.push(`*All pages ≥ 90.*`);
  lines.push("");
  lines.push(`## SEO < 95 — pages`);
  const seoBad = ok.filter((r) => r.desktop.seo < 95).sort((a, b) => a.desktop.seo - b.desktop.seo);
  for (const r of seoBad) {
    const fails = r.desktop.seoFails.map((f) => f.id).join(", ");
    lines.push(`- **${r.type}/${r.slug}** — score ${r.desktop.seo} — fails: ${fails}`);
  }
  if (!seoBad.length) lines.push(`*All pages ≥ 95.*`);
  lines.push("");
  lines.push(`## Top 20 worst LCP`);
  const worstLcp = ok
    .filter((r) => typeof r.desktop.lcp === "number")
    .sort((a, b) => b.desktop.lcp - a.desktop.lcp)
    .slice(0, 20);
  lines.push(`| Page | LCP (ms) | CLS | Perf |`);
  lines.push(`|---|---|---|---|`);
  for (const r of worstLcp) {
    lines.push(
      `| ${r.type}/${r.slug} | ${Math.round(r.desktop.lcp)} | ${r.desktop.cls?.toFixed(3)} | ${r.desktop.perf} |`,
    );
  }
  lines.push("");
  lines.push(`Raw JSON : \`docs/raw/lighthouse.json\``);
  writeFileSync(REPORT_PATH, lines.join("\n"));

  console.log(
    `\n[qa-lighthouse] DONE in ${((Date.now() - t0) / 1000 / 60).toFixed(1)} min — perf=${m("perf")} a11y=${m("a11y")} seo=${m("seo")}`,
  );
  console.log(`[qa-lighthouse] report → ${REPORT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
