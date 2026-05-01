#!/usr/bin/env node
/**
 * verify-ground-truth.mjs — Deterministic anti-hallucination check.
 *
 * For each section in the Opus extract :
 *   1. Walk every text-bearing field (titles, body, item.text, item.label,
 *      stat.value/label, testimonial.name, FAQ q/a, etc.)
 *   2. Normalize the string (lowercase, accent-strip, whitespace collapse)
 *   3. Substring-match against the normalized HTML source from Supabase
 *   4. If not found → flag FABRICATED
 *
 * Also verifies that every imageSrc appears literally in the HTML source.
 *
 * Run :
 *   node scripts/migrate/verify-ground-truth.mjs                 # all pages
 *   node scripts/migrate/verify-ground-truth.mjs --slug=ppm      # one
 *   node scripts/migrate/verify-ground-truth.mjs --type=lp       # one type
 *
 * Output : docs/raw/llm-verify/{type}-{slug}.json with detailed flags
 *          + console summary.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT, cleanHtmlForLlm } from "./llm-parse-shared.mjs";

const SUPABASE_URL = "https://ydudpmtbnvpxxenbnvab.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkdWRwbXRibnZweHhlbmJudmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3ODgzMDEsImV4cCI6MjA4NTM2NDMwMX0.62_iMmq47ZUCLraNvMjW5qhT_hH6pfSfxBZH0y8mMfQ";

const EXTRACT_DIR = join(REPO_ROOT, "docs/raw/llm-test");
const OUT_DIR = join(REPO_ROOT, "docs/raw/llm-verify");

const ZWSP_RE = /[​‌‍⁠﻿]/g;

function normalize(s) {
  if (typeof s !== "string") return "";
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(ZWSP_RE, "")
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(s) {
  if (typeof s !== "string") return "";
  return s.replace(/<[^>]+>/g, " ");
}

async function fetchPageHtml(type, slug) {
  const url =
    `${SUPABASE_URL}/rest/v1/airsaas_pages_rebuild` +
    `?type=eq.${type}&slug=eq.${slug}&select=html_rendered`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  const arr = await res.json();
  if (!arr.length) throw new Error(`Page ${type}/${slug} not found`);
  return arr[0].html_rendered;
}

// Fields whose text content must come from source HTML. Alt attributes and
// labels are excluded — they are routinely paraphrased by Opus from context
// (e.g. <img alt=""> populated by Opus from the surrounding heading) and
// generate noise without catching real bugs.
const TEXT_FIELDS = [
  "title", "titleHighlight", "titleSuffix", "titlePrefix",
  "subtitle", "body",
  "description", "answer", "question", "text", "name",
  "company", "value",
  "titleGradient", "titleDark", "titleDarkPrefix",
];

// Min character length to verify — short strings (single words / labels)
// are too noisy to match reliably. 25 chars roughly = "a 4-word phrase".
const MIN_VERIFY_LENGTH = 25;

function visitFields(obj, path, visit) {
  if (typeof obj === "string") return;
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => visitFields(v, [...path, i], visit));
    return;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const newPath = [...path, k];
      if (typeof v === "string" && TEXT_FIELDS.includes(k)) {
        visit(v, newPath);
      }
      if (typeof v === "object" && v !== null) {
        visitFields(v, newPath, visit);
      }
    }
  }
}

function verifyExtract(extract, htmlSource) {
  const normSource = normalize(stripHtml(htmlSource));
  const flags = [];

  visitFields(extract.sections || [], ["sections"], (str, path) => {
    if (str.length < MIN_VERIFY_LENGTH) return;
    const plain = stripHtml(str);
    const norm = normalize(plain);
    if (norm.length < MIN_VERIFY_LENGTH) return;
    // For long strings, check the first ~120 chars (paraphrase tolerance).
    // For shorter strings, the whole string must be present.
    const probe = norm.slice(0, 120);
    if (!normSource.includes(probe)) {
      flags.push({
        type: "FABRICATED_TEXT",
        path: path.join("."),
        sample: str.slice(0, 100),
      });
    }
  });

  // Verify imageSrc URLs : must appear literally in HTML source
  const visitImages = (obj, path) => {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) {
      obj.forEach((v, i) => visitImages(v, [...path, i]));
      return;
    }
    for (const [k, v] of Object.entries(obj)) {
      const newPath = [...path, k];
      if (
        (k === "imageSrc" || k === "src" || k === "iconSrc" || k === "avatarSrc" || k === "logoSrc") &&
        typeof v === "string" && v.length > 0
      ) {
        if (!htmlSource.includes(v)) {
          flags.push({
            type: "FABRICATED_IMAGE",
            path: newPath.join("."),
            sample: v,
          });
        }
      }
      if (typeof v === "object" && v !== null) visitImages(v, newPath);
    }
  };
  visitImages(extract.sections || [], ["sections"]);

  return flags;
}

function generateFeedback(flags) {
  if (!flags.length) return null;
  const grouped = {};
  for (const f of flags) {
    grouped[f.type] = grouped[f.type] || [];
    grouped[f.type].push(f);
  }
  let msg = "Your previous extraction has FABRICATED content not present in the source HTML. Fix specifically these :\n\n";
  if (grouped.FABRICATED_TEXT?.length) {
    msg += "## Texts not found in source HTML — REMOVE these from the output :\n";
    for (const f of grouped.FABRICATED_TEXT.slice(0, 10)) {
      msg += `- field "${f.path}" contains "${f.sample}" which doesn't appear in the source. Either it's hallucinated, or it's a paraphrase — re-emit the exact source text or omit the field.\n`;
    }
    if (grouped.FABRICATED_TEXT.length > 10) {
      msg += `- ... +${grouped.FABRICATED_TEXT.length - 10} more.\n`;
    }
    msg += "\n";
  }
  if (grouped.FABRICATED_IMAGE?.length) {
    msg += "## Image URLs not in source HTML — these will 404 in prod :\n";
    for (const f of grouped.FABRICATED_IMAGE) {
      msg += `- "${f.path}" = "${f.sample}" — pick an image that actually appears in the HTML, or omit imageSrc.\n`;
    }
    msg += "\n";
  }
  msg += "Re-emit the COMPLETE extract via the extract_landing_page tool with these issues fixed.\n";
  return msg;
}

const args = process.argv.slice(2);
const slugFilter = args.find((a) => a.startsWith("--slug="))?.slice(7);
const typeFilter = args.find((a) => a.startsWith("--type="))?.slice(7)?.split(",");

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  const files = readdirSync(EXTRACT_DIR).filter((f) => f.endsWith(".json") && !f.startsWith("_"));
  const results = [];
  for (const file of files) {
    const data = JSON.parse(readFileSync(join(EXTRACT_DIR, file), "utf8"));
    if (!data.result || !data.type || !data.slug) continue;
    if (slugFilter && data.slug !== slugFilter) continue;
    if (typeFilter && !typeFilter.includes(data.type)) continue;
    if (!["lp", "produit", "solution", "equipe"].includes(data.type)) continue;

    const html = await fetchPageHtml(data.type, data.slug);
    // Verify against RAW Supabase HTML (not cleanHtmlForLlm output, which
    // truncates at 100K and strips nav/footer). The whole point is to catch
    // text that doesn't exist anywhere on the live page.
    const flags = verifyExtract(data.result, html);
    const out = {
      type: data.type,
      slug: data.slug,
      verifiedAt: new Date().toISOString(),
      flagsCount: flags.length,
      flags,
      feedback: generateFeedback(flags),
    };
    writeFileSync(join(OUT_DIR, `${data.type}-${data.slug}.json`), JSON.stringify(out, null, 2));
    const status = flags.length === 0 ? "✅ CLEAN" : `❌ ${flags.length} flags`;
    console.log(`${status.padEnd(20)} ${data.type}/${data.slug}`);
    results.push(out);
  }

  // Summary
  const total = results.length;
  const clean = results.filter((r) => r.flagsCount === 0).length;
  const totalFlags = results.reduce((s, r) => s + r.flagsCount, 0);
  console.log(`\n[verify] ${total} pages, ${clean} clean, ${totalFlags} flags total`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
