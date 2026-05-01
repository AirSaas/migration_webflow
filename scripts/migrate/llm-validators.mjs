/**
 * llm-validators.mjs — 7 checks de validation post-LLM + feedback generator
 * pour le test concept Opus.
 *
 * Chaque check retourne soit null (OK) soit { type, detail, severity } pour
 * être inséré dans le feedback de la prochaine itération.
 */

const HTML_ENTITY_RE = /&(amp|lt|gt|quot|apos|nbsp|#\d+|#x[0-9a-fA-F]+);/g;
const ZWSP_RE = /[​‌‍⁠﻿]/g;
const PLACEHOLDER_PATTERNS = [
  /Speaker avatar:/i,
  /LINK_SPEAKER_PAGE/,
  /insert the link/i,
  /change url of background-image/i,
  /\bTODO\b/,
  /\bFIXME\b/,
];

const REQUIRED_FIELDS_BY_TYPE = {
  hero: ["title"],
  intro: [], // title and body both optional but at least one expected
  "feature-split": ["title"],
  "pain-points": ["title", "items"],
  stats: ["items"],
  "logo-bar": ["logos"],
  "press-quotes": ["quotes"],
  testimonials: ["testimonials"],
  "customer-testimonials": ["testimonials"],
  "comparison-table": ["columns", "rows"],
  steps: ["steps"],
  faq: ["items"],
  cta: ["title", "ctaLabel"],
  "icon-row": ["items"],
  related: ["items"],
  "trust-badges": ["badges"],
  raw: ["html"],
};

const ITEM_REQUIREMENTS = {
  testimonials: ["text", "name"],
  "customer-testimonials": ["text", "name"],
  stats: ["value", "label"],
  steps: ["title"],
  faq: ["question", "answer"],
};

function walkTextFields(obj, visit, path = []) {
  if (typeof obj === "string") {
    visit(obj, path);
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walkTextFields(v, visit, [...path, i]));
    return;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) walkTextFields(v, visit, [...path, k]);
  }
}

// ─── Check 1 : Structure ────────────────────────────────────────────────────
function checkStructure(out) {
  if (!out || typeof out !== "object") return [{ type: "structure", detail: "output is not an object" }];
  const errs = [];
  if (!out.meta || typeof out.meta !== "object") errs.push({ type: "structure", detail: "meta missing" });
  else {
    if (!out.meta.title) errs.push({ type: "structure", detail: "meta.title missing" });
    if (!out.meta.description) errs.push({ type: "structure", detail: "meta.description missing" });
  }
  if (!Array.isArray(out.sections)) errs.push({ type: "structure", detail: "sections must be an array" });
  else if (out.sections.length === 0) errs.push({ type: "structure", detail: "sections array is empty" });
  return errs;
}

// ─── Check 2 : Hero present ─────────────────────────────────────────────────
function checkHero(out) {
  if (!Array.isArray(out?.sections) || out.sections.length === 0) return [];
  const first = out.sections[0];
  if (first.type !== "hero") {
    return [{
      type: "hero-position",
      detail: `first section type is "${first.type}", must be "hero"`,
    }];
  }
  if (!first.title || typeof first.title !== "string" || first.title.length < 3) {
    return [{
      type: "hero-title",
      detail: "hero.title is missing or too short",
    }];
  }
  return [];
}

// ─── Check 3 : Section count ────────────────────────────────────────────────
function checkSectionCount(out, minExpected = 5) {
  if (!Array.isArray(out?.sections)) return [];
  const len = out.sections.length;
  if (len < minExpected) {
    return [{
      type: "section-count",
      detail: `only ${len} sections emitted — landings typically have 8-15. Walk the DOM more thoroughly and emit ALL visible sections (testimonials, faq, cta, feature-splits, etc.)`,
    }];
  }
  return [];
}

// ─── Check 4 : No HTML entities ─────────────────────────────────────────────
function checkNoEntities(out) {
  const errs = [];
  walkTextFields(out, (str, path) => {
    if (typeof str !== "string") return;
    if (HTML_ENTITY_RE.test(str)) {
      errs.push({
        type: "html-entity",
        detail: `field "${path.join(".")}" contains HTML entities (e.g. ${str.match(HTML_ENTITY_RE)?.slice(0, 2).join(", ")}) — use literal characters instead (& not &amp;, etc.)`,
      });
    }
  });
  // Dedup by path
  const seen = new Set();
  return errs.filter((e) => {
    if (seen.has(e.detail)) return false;
    seen.add(e.detail);
    return true;
  }).slice(0, 5);
}

// ─── Check 5 : No CMS placeholder ───────────────────────────────────────────
function checkNoPlaceholder(out) {
  const errs = [];
  walkTextFields(out, (str, path) => {
    if (typeof str !== "string") return;
    for (const pat of PLACEHOLDER_PATTERNS) {
      if (pat.test(str)) {
        errs.push({
          type: "cms-placeholder",
          detail: `field "${path.join(".")}" contains CMS placeholder text matching ${pat} — drop the section or replace with real content`,
        });
        return;
      }
    }
  });
  return errs.slice(0, 5);
}

// ─── Check 6 : Field names canonical ────────────────────────────────────────
function checkFieldNames(out) {
  const errs = [];
  if (!Array.isArray(out?.sections)) return errs;
  for (const [i, section] of out.sections.entries()) {
    const t = section.type;
    if (!t) {
      errs.push({ type: "field-names", detail: `section[${i}] has no type` });
      continue;
    }
    const required = REQUIRED_FIELDS_BY_TYPE[t];
    if (required === undefined) {
      errs.push({
        type: "field-names",
        detail: `section[${i}] has unknown type "${t}" — use one of the 17 documented types (hero, intro, feature-split, pain-points, stats, logo-bar, press-quotes, testimonials, customer-testimonials, comparison-table, steps, faq, cta, icon-row, related, trust-badges, raw)`,
      });
      continue;
    }
    for (const field of required) {
      if (
        section[field] === undefined ||
        section[field] === null ||
        (Array.isArray(section[field]) && section[field].length === 0)
      ) {
        errs.push({
          type: "field-names",
          detail: `section[${i}] type=${t} is missing required field "${field}"`,
        });
      }
    }
    // Item-level checks
    const itemReq = ITEM_REQUIREMENTS[t];
    if (itemReq) {
      // The items array may be at .items, .testimonials, .steps, etc.
      const candidates = ["items", "testimonials", "steps", "quotes", "rows"];
      for (const c of candidates) {
        if (Array.isArray(section[c])) {
          section[c].forEach((item, j) => {
            if (typeof item !== "object") return;
            for (const f of itemReq) {
              if (!item[f]) {
                errs.push({
                  type: "field-names",
                  detail: `section[${i}].${c}[${j}] type=${t} is missing required field "${f}"`,
                });
              }
            }
          });
          break;
        }
      }
    }
  }
  return errs.slice(0, 8);
}

// ─── Check 7 : HTML markup not leaked as text ───────────────────────────────
function checkHtmlNotLeaked(out) {
  const errs = [];
  walkTextFields(out, (str, path) => {
    if (typeof str !== "string") return;
    // body fields are allowed to have HTML markup
    const isBody = path.includes("body") || path.includes("html");
    if (isBody) return;
    // For non-body fields, presence of literal <strong> or <em> is suspicious
    if (/<(strong|em|p|br|ul|li|h\d|a)\b/i.test(str)) {
      errs.push({
        type: "html-leaked",
        detail: `field "${path.join(".")}" contains HTML markup that should be plain text — strip the <tags>`,
      });
    }
  });
  return errs.slice(0, 5);
}

// ─── Blog-specific checks ──────────────────────────────────────────────────

const BLOG_BLOCK_REQUIREMENTS = {
  paragraph: ["html"],
  heading: ["level", "text"],
  list: ["items"],
  figure: ["src"],
  quote: ["text"],
  table: ["rows"],
  "insight-callout": ["html"],
  "inline-cta": ["label", "href"],
  "hubspot-cta": ["label", "href"],
};

function checkBlogStructure(out) {
  const errs = [];
  if (!out || typeof out !== "object")
    return [{ type: "structure", detail: "output is not an object" }];
  if (!out.meta || typeof out.meta !== "object")
    errs.push({ type: "structure", detail: "meta missing" });
  else {
    if (!out.meta.title) errs.push({ type: "structure", detail: "meta.title missing" });
    if (!out.meta.h1) errs.push({ type: "structure", detail: "meta.h1 missing" });
    if (!out.meta.description) errs.push({ type: "structure", detail: "meta.description missing" });
  }
  if (!Array.isArray(out.blocks)) {
    errs.push({ type: "structure", detail: "blocks must be an array" });
  } else if (out.blocks.length < 10) {
    errs.push({
      type: "block-count",
      detail: `only ${out.blocks.length} blocks emitted — typical blog articles have 30-150 blocks (paragraph, heading, list, figure, etc.). Walk the article body more thoroughly.`,
    });
  }
  return errs;
}

function checkBlogBlocks(out) {
  const errs = [];
  if (!Array.isArray(out?.blocks)) return errs;
  for (const [i, block] of out.blocks.entries()) {
    if (!block.type) {
      errs.push({ type: "field-names", detail: `block[${i}] has no type` });
      continue;
    }
    const required = BLOG_BLOCK_REQUIREMENTS[block.type];
    if (required === undefined) {
      errs.push({
        type: "field-names",
        detail: `block[${i}] has unknown type "${block.type}" — use one of: paragraph, heading, list, figure, quote, table, insight-callout, inline-cta, hubspot-cta`,
      });
      continue;
    }
    for (const f of required) {
      if (block[f] === undefined || block[f] === null || block[f] === "") {
        errs.push({
          type: "field-names",
          detail: `block[${i}] type=${block.type} missing required "${f}"`,
        });
      }
    }
  }
  return errs.slice(0, 8);
}

// ─── Run all checks ────────────────────────────────────────────────────────

export function validate(out, pageType = "landing") {
  if (pageType === "blog") {
    return validateBlog(out);
  }
  const errors = [
    ...checkStructure(out),
    ...checkHero(out),
    ...checkSectionCount(out),
    ...checkNoEntities(out),
    ...checkNoPlaceholder(out),
    ...checkFieldNames(out),
    ...checkHtmlNotLeaked(out),
  ];
  return { ok: errors.length === 0, errors };
}

export function validateBlog(out) {
  const errors = [
    ...checkBlogStructure(out),
    ...checkNoEntities(out),
    ...checkNoPlaceholder(out),
    ...checkBlogBlocks(out),
  ];
  return { ok: errors.length === 0, errors };
}

// ─── Feedback generator for retry ──────────────────────────────────────────

export function generateFeedback(errors) {
  if (!errors.length) return "";
  const grouped = {};
  for (const e of errors) {
    grouped[e.type] = grouped[e.type] || [];
    grouped[e.type].push(e.detail);
  }
  let msg = "Your previous extraction had issues. Fix specifically these and re-extract the entire page :\n\n";
  for (const [type, details] of Object.entries(grouped)) {
    msg += `## ${type}\n`;
    for (const d of details.slice(0, 3)) msg += `- ${d}\n`;
    if (details.length > 3) msg += `- … +${details.length - 3} more of this type\n`;
    msg += "\n";
  }
  msg += "Re-emit the COMPLETE landing-page output via the extract_landing_page tool, fixing all issues above.\n";
  return msg;
}

// ─── Summary helpers ───────────────────────────────────────────────────────

export function summarize(out, pageType = "landing") {
  if (pageType === "blog") {
    if (!out?.blocks) return { blocks: 0, types: [] };
    const blocks = out.blocks.length;
    const types = [...new Set(out.blocks.map((b) => b.type))];
    return { blocks, types };
  }
  if (!out?.sections) return { sections: 0, types: [] };
  const sections = out.sections.length;
  const types = [...new Set(out.sections.map((s) => s.type))];
  return { sections, types };
}
