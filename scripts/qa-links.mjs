#!/usr/bin/env node
/**
 * qa-links.mjs — Broken-links audit on the 88 rebuild pages.
 *
 * Phase 1 : crawl rebuild HTML and collect every <a href> + <img src> + <link href>.
 * Phase 2 : check unique URLs (HEAD with GET fallback, redirect-following, throttled).
 *
 * Output : docs/raw/broken-links.json + docs/qa-links-report.md
 *
 * Pre-req : next dev on http://localhost:3000.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  REPO_ROOT,
  REBUILD_BASE,
  getAllTargets,
  parseArgs,
  filterTargets,
  PAGE_BUDGET_MS,
} from "./qa-shared.mjs";

const REPORT_PATH = join(REPO_ROOT, "docs/qa-links-report.md");
const REPORT_JSON = join(REPO_ROOT, "docs/raw/broken-links.json");

const args = parseArgs(process.argv);
const targets = filterTargets(getAllTargets(), args);
console.log(`[qa-links] target count = ${targets.length}`);

const PARALLELISM = 6;
const URL_TIMEOUT_MS = 10000;

// ─── Extraction ─────────────────────────────────────────────────────────────

function extractLinks(html) {
  const links = [];
  for (const m of html.matchAll(/<a\s[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = m[1].trim();
    const text = m[2].replace(/<[^>]+>/g, "").trim().toLowerCase();
    const isCta =
      /\b(demande|réserv|reserv|book|demo|contact|essai|free trial|commenc|inscri|sign[- ]?up)\b/.test(
        text,
      );
    links.push({ kind: "a", raw: href, isCta });
  }
  for (const m of html.matchAll(/<img\s[^>]*src=["']([^"']*)["'][^>]*>/gi)) {
    links.push({ kind: "img", raw: m[1].trim(), isCta: false });
  }
  for (const m of html.matchAll(/<link\s[^>]*href=["']([^"']*)["'][^>]*>/gi)) {
    links.push({ kind: "link", raw: m[1].trim(), isCta: false });
  }
  return links;
}

function classify(href) {
  if (href === "" || href === "#" || href === "javascript:void(0)") return "EMPTY";
  if (href.startsWith("data:") || href.startsWith("blob:")) return "DATA";
  if (href.startsWith("#")) return "ANCHOR";
  if (href.startsWith("tel:")) return "TEL";
  if (href.startsWith("mailto:")) {
    if (!/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+/.test(href)) return "MAILTO_INVALID";
    return "MAILTO";
  }
  return "URL";
}

function resolveUrl(href, base) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

// ─── Single URL check (HEAD, with GET fallback) ────────────────────────────

async function checkUrl(url) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort("timeout"), URL_TIMEOUT_MS);
  try {
    let res;
    try {
      res = await fetch(url, { method: "HEAD", redirect: "follow", signal: ac.signal });
    } catch (e) {
      // HEAD itself failed — try GET
      res = await fetch(url, { method: "GET", redirect: "follow", signal: ac.signal });
    }
    if (res.status === 405 || res.status === 403) {
      const g = await fetch(url, { method: "GET", redirect: "follow", signal: ac.signal });
      return { status: g.status, finalUrl: g.url };
    }
    return { status: res.status, finalUrl: res.url };
  } catch (e) {
    return { status: 0, error: e.name === "AbortError" ? "timeout" : (e.message || String(e)) };
  } finally {
    clearTimeout(t);
  }
}

// ─── Pool ───────────────────────────────────────────────────────────────────

async function runWithPool(items, n, worker) {
  const queue = [...items];
  const results = [];
  const workers = Array.from({ length: Math.min(n, items.length) }, async () => {
    while (queue.length) {
      const item = queue.shift();
      try {
        results.push(await worker(item));
      } catch (e) {
        results.push({ item, error: e.message });
      }
    }
  });
  await Promise.all(workers);
  return results;
}

// ─── Severity ──────────────────────────────────────────────────────────────

function severity(rec, isCta) {
  if (rec.classify === "EMPTY") return isCta ? "P0" : "P2";
  if (rec.classify === "MAILTO_INVALID") return "P1";
  if (rec.status === 0) return "P1";
  if (rec.status === 404) return isCta ? "P0" : "P1";
  if (rec.status >= 500) return "P1";
  return null;
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  mkdirSync(dirname(REPORT_JSON), { recursive: true });

  // Phase 1 — collect links per page
  console.log(`[qa-links] phase 1 — fetching ${targets.length} pages and extracting links…`);
  const pageRows = [];
  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    const url = REBUILD_BASE + t.path;
    let html = "", status = 0;
    try {
      const ac = new AbortController();
      const tm = setTimeout(() => ac.abort(), PAGE_BUDGET_MS);
      const res = await fetch(url, { signal: ac.signal });
      clearTimeout(tm);
      status = res.status;
      html = res.ok ? await res.text() : "";
    } catch (e) {
      status = 0;
    }
    const links = extractLinks(html);
    pageRows.push({ ...t, pageStatus: status, links });
    console.log(`  [${i + 1}/${targets.length}] ${t.type}/${t.slug}  status=${status}  links=${links.length}`);
  }

  // Phase 2 — collect unique URLs to actually check
  const urlSet = new Set();
  for (const p of pageRows) {
    for (const l of p.links) {
      const c = classify(l.raw);
      if (c !== "URL") continue;
      const abs = resolveUrl(l.raw, REBUILD_BASE + p.path);
      if (abs && /^https?:/i.test(abs)) urlSet.add(abs);
    }
  }
  const uniqueUrls = [...urlSet];
  console.log(`[qa-links] phase 2 — checking ${uniqueUrls.length} unique URLs (parallelism=${PARALLELISM})…`);

  const t1 = Date.now();
  const checked = await runWithPool(uniqueUrls, PARALLELISM, async (url) => ({
    url,
    ...(await checkUrl(url)),
  }));
  const checkMap = new Map(checked.map((r) => [r.url, r]));
  console.log(`[qa-links] phase 2 done in ${((Date.now() - t1) / 1000).toFixed(1)}s`);

  // Phase 3 — assemble issues per page
  const out = [];
  const totals = { P0: 0, P1: 0, P2: 0 };
  for (const p of pageRows) {
    const issues = [];
    if (p.pageStatus !== 200) {
      issues.push({ severity: "P0", classify: "PAGE_FAIL", status: p.pageStatus });
    }
    for (const l of p.links) {
      const c = classify(l.raw);
      if (c === "EMPTY" || c === "MAILTO_INVALID") {
        const sev = severity({ classify: c }, l.isCta);
        if (sev) issues.push({ kind: l.kind, raw: l.raw, classify: c, severity: sev, isCta: l.isCta });
        continue;
      }
      if (c !== "URL") continue;
      const abs = resolveUrl(l.raw, REBUILD_BASE + p.path);
      if (!abs || !/^https?:/i.test(abs)) continue;
      const r = checkMap.get(abs);
      if (!r) continue;
      const sev = severity({ status: r.status, classify: "URL" }, l.isCta);
      if (sev) {
        issues.push({
          kind: l.kind,
          raw: l.raw,
          resolved: abs,
          status: r.status,
          error: r.error,
          severity: sev,
          isCta: l.isCta,
        });
      }
    }
    for (const i of issues) totals[i.severity] = (totals[i.severity] || 0) + 1;
    out.push({ ...p, links: undefined, linkCount: p.links.length, issues });
  }

  writeFileSync(REPORT_JSON, JSON.stringify(out, null, 2));

  // ─── MD ──────────────────────────────────────────────────────────────────
  const lines = [];
  lines.push(`# QA links report`);
  lines.push("");
  lines.push(`**Date** : ${new Date().toISOString()}`);
  lines.push(`**Pages** : ${out.length} — Unique URLs checked : ${uniqueUrls.length}`);
  lines.push(`**Totals** : P0 = ${totals.P0}, P1 = ${totals.P1}, P2 = ${totals.P2}`);
  lines.push("");
  const blockers = out.filter((r) => r.issues.some((i) => i.severity === "P0"));
  lines.push(`## Blockers (P0) — ${blockers.length} pages`);
  for (const r of blockers) {
    lines.push(`### ${r.type}/${r.slug}`);
    for (const i of r.issues.filter((x) => x.severity === "P0")) {
      const detail = i.classify || `HTTP ${i.status}`;
      const cta = i.isCta ? " (CTA)" : "";
      lines.push(`- ${i.kind || "page"} \`${i.raw || i.classify}\` — ${detail}${cta}`);
    }
  }
  lines.push("");
  const p1Pages = out
    .map((r) => ({ ...r, p1: r.issues.filter((i) => i.severity === "P1").length }))
    .filter((r) => r.p1 > 0)
    .sort((a, b) => b.p1 - a.p1)
    .slice(0, 30);
  lines.push(`## Top 30 pages by P1 count`);
  for (const r of p1Pages) lines.push(`- **${r.type}/${r.slug}** — ${r.p1} P1`);
  lines.push("");
  // Aggregate: what URLs are most-broken?
  const brokenByUrl = new Map();
  for (const r of out) {
    for (const i of r.issues) {
      if (!i.resolved) continue;
      if (i.severity === "P0" || i.severity === "P1") {
        const k = `${i.resolved} (${i.status})`;
        brokenByUrl.set(k, (brokenByUrl.get(k) || 0) + 1);
      }
    }
  }
  if (brokenByUrl.size) {
    lines.push(`## Top broken URLs (count = pages where they appear)`);
    const sorted = [...brokenByUrl.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25);
    for (const [k, n] of sorted) lines.push(`- ${n}× ${k}`);
    lines.push("");
  }
  lines.push(`Raw JSON : \`docs/raw/broken-links.json\``);
  writeFileSync(REPORT_PATH, lines.join("\n"));

  console.log(`\n[qa-links] DONE — P0=${totals.P0} P1=${totals.P1} P2=${totals.P2}`);
  console.log(`[qa-links] report → ${REPORT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
