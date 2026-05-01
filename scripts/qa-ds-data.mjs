#!/usr/bin/env node
/**
 * qa-ds-data.mjs — Scan rebuild data files for DS violations.
 *
 * The main ds-audit.mjs excludes src/data/landings-v2/* and
 * src/data/blog-articles-v2.ts (they're auto-generated). This script scans
 * them for the violations that *should* never appear in data — they would
 * indicate a parser bug, not an authoring choice.
 *
 * Output : docs/raw/ds-data-audit.json + docs/qa-ds-data-report.md
 *
 * Usage:
 *   node scripts/qa-ds-data.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";
import { REPO_ROOT } from "./qa-shared.mjs";

const REPORT_JSON = join(REPO_ROOT, "docs/raw/ds-data-audit.json");
const REPORT_MD = join(REPO_ROOT, "docs/qa-ds-data-report.md");

// Files to scan — all the data files containing parsed page content
const TARGET_GLOB = "src/data/landings-v2 src/data/blog-articles-v2.ts";

const RULES = [
  {
    name: "data-no-hex-color",
    description: "Hex color in data file — parser should tokenize",
    regex: /#[0-9a-fA-F]{3,8}\b/g,
    severity: "P1",
    contextFilter: (line) => {
      // Skip URL fragments (#anchor in href values)
      if (/href=["'][^"']*#[\w-]+["']?/.test(line) && !/#[0-9a-fA-F]{6}\b/.test(line)) return false;
      // Skip vendor brand colors (LinkedIn etc.) if any
      if (/#007EBB/i.test(line)) return false;
      // Skip inside SVG path data
      if (/\bd=["']/.test(line)) return false;
      return true;
    },
  },
  {
    name: "data-no-rgba-literal",
    description: "rgba()/rgb()/hsl() literal in data — parser should tokenize",
    regex: /\b(rgba?|hsla?)\s*\(\s*\d/g,
    severity: "P1",
    contextFilter: () => true,
  },
  {
    name: "data-no-default-tw-palette",
    description: "Default Tailwind palette class in data className",
    regex:
      /\b(bg|text|border|ring|fill|stroke|from|via|to|shadow|divide|placeholder|caret|accent|decoration)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+\b/g,
    severity: "P1",
    contextFilter: () => true,
  },
  {
    name: "data-no-arbitrary-color",
    description: "Arbitrary color class (bg-[#...]) in data",
    regex: /\b(bg|text|ring|fill|stroke|from|via|shadow)-\[#[0-9a-fA-F]{3,8}\]/g,
    severity: "P0",
    contextFilter: () => true,
  },
  {
    name: "data-no-html-literal",
    description: "Raw HTML tag in data string (should be plain text)",
    regex: /<(?:strong|em|br|span|h[1-6]|p|div|a|img)[^>]*>/g,
    severity: "P0",
    contextFilter: (line) => {
      // Skip if inside a 'rawHtml' or 'html' field (legitimate)
      if (/\b(rawHtml|html)\s*:\s*['"`]/.test(line)) return false;
      // Skip storybook-style content fields that explicitly accept HTML
      return true;
    },
  },
  {
    name: "data-no-html-entity",
    description: "HTML entity in data string (should be normal char)",
    regex: /&(amp|lt|gt|quot|nbsp|#\d+|#x[0-9a-fA-F]+);/g,
    severity: "P1",
    contextFilter: () => true,
  },
  {
    name: "data-no-empty-href",
    description: "Empty or # href in data",
    regex: /href\s*[:=]\s*["'](?:#|)["']/g,
    severity: "P0",
    contextFilter: () => true,
  },
  {
    name: "data-no-placeholder-text",
    description: "CMS placeholder leaked through parser",
    regex: /(insert the link|LINK_SPEAKER_PAGE|placeholder|TODO|FIXME|change url of|background-image" to)/gi,
    severity: "P0",
    contextFilter: () => true,
  },
  {
    name: "data-no-placeholdco-image",
    description: "placehold.co image when real asset should exist",
    regex: /https?:\/\/placehold\.co\/[\w]+/g,
    severity: "P1",
    contextFilter: () => true,
  },
];

function listFiles() {
  const out = execSync(`git ls-files ${TARGET_GLOB}`, { cwd: REPO_ROOT, encoding: "utf8" });
  return out.split("\n").filter(Boolean);
}

function runRule(rule, files) {
  const hits = [];
  for (const relPath of files) {
    const text = readFileSync(join(REPO_ROOT, relPath), "utf8");
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      const matches = line.match(rule.regex);
      if (!matches) return;
      if (!rule.contextFilter(line, relPath)) return;
      for (const m of matches) {
        hits.push({
          file: relPath,
          line: i + 1,
          snippet: line.trim().slice(0, 160),
          match: m,
          severity: rule.severity,
        });
      }
    });
  }
  return hits;
}

function main() {
  const files = listFiles();
  console.log(`[qa-ds-data] scanning ${files.length} data files…`);
  let total = { P0: 0, P1: 0, P2: 0 };
  const json = { date: new Date().toISOString(), files: files.length, rules: [] };
  const md = [`# QA — DS data audit`, "", `**Date** : ${new Date().toISOString()}`, ""];

  for (const rule of RULES) {
    const hits = runRule(rule, files);
    json.rules.push({
      name: rule.name,
      description: rule.description,
      severity: rule.severity,
      hits: hits.length,
      items: hits,
    });
    total[rule.severity] = (total[rule.severity] || 0) + hits.length;
    if (hits.length === 0) continue;
    md.push(`## ${rule.severity} — ${rule.name} — ${hits.length} hit(s)`);
    md.push(`*${rule.description}*`);
    md.push(``);
    for (const h of hits.slice(0, 25)) {
      md.push(`- \`${h.file}:${h.line}\` — \`${h.match}\` — ${h.snippet}`);
    }
    if (hits.length > 25) md.push(`- … +${hits.length - 25} more`);
    md.push(``);
    console.log(`  [${rule.severity}] ${rule.name} — ${hits.length} hits`);
  }

  json.totals = total;
  md.unshift(
    `**Totals** : P0 = ${total.P0}, P1 = ${total.P1}, P2 = ${total.P2 || 0}`,
    ``,
  );
  mkdirSync(dirname(REPORT_JSON), { recursive: true });
  writeFileSync(REPORT_JSON, JSON.stringify(json, null, 2));
  writeFileSync(REPORT_MD, md.join("\n"));
  console.log(`\n[qa-ds-data] DONE — P0=${total.P0} P1=${total.P1}`);
  console.log(`[qa-ds-data] report → ${REPORT_MD}`);
  console.log(`[qa-ds-data] JSON   → ${REPORT_JSON}`);
}

main();
