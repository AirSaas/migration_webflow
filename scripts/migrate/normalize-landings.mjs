#!/usr/bin/env node
/**
 * normalize-landings.mjs — One-shot post-process : apply field normalization
 * to the LLM-extracted landings data files. Avoids re-running the LLM when
 * only the normalization rules change.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { writeLandingsTsFile, REPO_ROOT } from "./llm-parse-shared.mjs";

function normalizeSection(s) {
  if (!s || typeof s !== "object" || !s.type) return null;
  const out = { ...s };

  switch (s.type) {
    case "pain-points":
      if (!Array.isArray(out.items) && Array.isArray(out.bullets)) out.items = out.bullets;
      if (!Array.isArray(out.items) || out.items.length === 0) return null;
      delete out.bullets;
      return out;
    case "stats":
      if (Array.isArray(out.items)) {
        out.items = out.items
          .map((it) => ({
            value: it.value ?? it.title ?? "",
            label: it.label ?? it.body ?? it.description ?? "",
          }))
          .filter((it) => it.value && it.label);
      }
      if (!Array.isArray(out.items) || out.items.length === 0) return null;
      return out;
    case "steps":
      if (Array.isArray(out.items) && !Array.isArray(out.steps)) out.steps = out.items;
      if (Array.isArray(out.steps)) {
        out.steps = out.steps
          .map((st) => ({
            title: st.title ?? "",
            description: st.description ?? st.body ?? null,
          }))
          .filter((st) => st.title);
      }
      delete out.items;
      if (!Array.isArray(out.steps) || out.steps.length === 0) return null;
      return out;
    case "icon-row":
      if (!Array.isArray(out.items) || out.items.length === 0) return null;
      out.items = out.items
        .map((it) => ({ iconSrc: it.iconSrc ?? null, label: it.label ?? it.title ?? "" }))
        .filter((it) => it.label);
      return out;
    case "trust-badges":
      if (Array.isArray(out.items) && !Array.isArray(out.badges)) {
        out.badges = out.items.map((it) => ({ label: it.label ?? it.title ?? "", iconSrc: it.iconSrc ?? null }));
      }
      delete out.items;
      if (!Array.isArray(out.badges) || out.badges.length === 0) return null;
      return out;
    case "comparison-table":
      if (!Array.isArray(out.columns) || !Array.isArray(out.rows)) return null;
      return out;
    case "press-quotes":
      if (!Array.isArray(out.quotes) || out.quotes.length === 0) return null;
      out.quotes = out.quotes
        .map((q) => ({ text: q.text ?? "", source: q.source ?? q.author ?? "", logoSrc: q.logoSrc ?? null }))
        .filter((q) => q.text);
      return out;
    case "related":
      if (!Array.isArray(out.items) || out.items.length === 0) return null;
      out.items = out.items
        .map((it) => ({
          title: it.title ?? "",
          description: it.description ?? null,
          imageSrc: it.imageSrc ?? null,
          href: it.href ?? "#",
        }))
        .filter((it) => it.title);
      return out;
    case "testimonials":
    case "customer-testimonials":
      if (!Array.isArray(out.testimonials)) return null;
      out.testimonials = out.testimonials.filter(
        (t) => t && typeof t.text === "string" && t.text.length > 0 && typeof t.name === "string" && t.name.length > 0,
      );
      if (out.testimonials.length === 0) return null;
      return out;
    case "logo-bar":
      if (!Array.isArray(out.logos)) return null;
      out.logos = out.logos.filter((l) => l && typeof l.src === "string" && l.src.length > 0);
      if (out.logos.length === 0) return null;
      return out;
    case "faq":
      if (!Array.isArray(out.items)) return null;
      out.items = out.items.filter((q) => q && q.question && q.answer);
      if (out.items.length === 0) return null;
      return out;
    case "feature-split":
      if (!out.title) return null;
      return out;
    case "intro": {
      const hasBody = out.body && typeof out.body === "string" && out.body.replace(/<[^>]+>|\s/g, "").length > 0;
      const hasSubs = Array.isArray(out.subSections) && out.subSections.length > 0;
      if (!hasBody && !hasSubs) return null;
      return out;
    }
    case "hero":
    case "cta":
    case "raw":
      return out;
    default:
      return out;
  }
}

const TYPE_TO_FILE = {
  lp: "lp.ts",
  produit: "produit.ts",
  solution: "solutions.ts",
  equipe: "equipes.ts",
};

for (const [type, file] of Object.entries(TYPE_TO_FILE)) {
  const path = join(REPO_ROOT, "src/data/landings-v2", file);
  const txt = readFileSync(path, "utf8");
  const m = txt.match(/PAGES.*?=\s*(\[[\s\S]*?\])\s+as const/);
  if (!m) {
    console.log(`  skip ${file} — no PAGES match`);
    continue;
  }
  const pages = JSON.parse(m[1]);
  let dropped = 0;
  for (const p of pages) {
    const before = p.sections.length;
    p.sections = p.sections.map(normalizeSection).filter((s) => s !== null);
    dropped += before - p.sections.length;
  }
  writeLandingsTsFile(path, pages, type);
  console.log(`  ${file}: ${pages.length} pages, dropped ${dropped} invalid sections`);
}
console.log("[normalize-landings] done");
