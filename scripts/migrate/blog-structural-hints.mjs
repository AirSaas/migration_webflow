/**
 * blog-structural-hints.mjs
 *
 * Pre-extraction structural analysis of blog HTML.
 * Counts the discrete structures (blockquote, table, callout, inline-cta,
 * hubspot-cta, linked-figure) that Opus must emit at minimum during
 * extraction. The counts are passed to the LLM as numeric targets,
 * removing subjectivity and making the extraction self-validating.
 *
 * Usage : import { computeStructuralHints, validateExtractAgainstHints } from "./blog-structural-hints.mjs";
 */

/**
 * Extract the article body from full HTML (priority order matches BLOG_RULES rule 1).
 */
function extractArticleBody(html) {
  if (!html) return "";
  const containers = [
    /<div[^>]*class="[^"]*container__article__integrations__text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i,
    /<div[^>]*class="[^"]*blog-post-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/i,
    /<div[^>]*class="[^"]*rich-text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i,
    /<div[^>]*class="[^"]*post-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  ];
  for (const re of containers) {
    const m = html.match(re);
    if (m && m[1].length > 500) return m[1];
  }
  // Fallback : full body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

/**
 * Count occurrences of a regex in a string (returns total match count).
 */
function countMatches(str, re) {
  const m = str.match(re);
  return m ? m.length : 0;
}

/**
 * Count elements where the class attribute contains at least one of the
 * exact-named classes from `classNames`. Class match is whitespace-bounded
 * — `blog-quote` matches `class="x blog-quote y"` but NOT
 * `class="speaker-blog-quote"`.
 */
function countByExactClass(html, tagPattern, classNames) {
  const tagRe = new RegExp(`<(?:${tagPattern})\\b[^>]*\\bclass="([^"]*)"[^>]*>`, "gi");
  const wanted = new Set(classNames);
  let count = 0;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    const classes = m[1].split(/\s+/);
    if (classes.some((c) => wanted.has(c))) count++;
  }
  return count;
}

/**
 * Count visible quotes — de-duplicates nested `<blockquote>` wrapped in
 * `.citation-blog`/`.pull-quote` divs (Webflow CMS template pattern).
 * Logic: count `<blockquote>` tags first; only count quote-class divs that
 * do NOT contain a `<blockquote>` (rare standalone case).
 */
function countQuotes(html) {
  const blockquoteCount = countMatches(html, /<blockquote\b[^>]*>/gi);
  // Match each .citation-blog / .pull-quote / .quote-block / .testimonial-blog
  // div as a complete element (with body), then check if it nests a blockquote.
  // .blog-quote is intentionally EXCLUDED: in this Webflow site it tags the
  // .speaker-blog-quote avatar div (decorative), not the quote itself.
  const wrapperRe = /<(?:div|aside)\b[^>]*\bclass="([^"]*)"[^>]*>([\s\S]*?)<\/(?:div|aside)>/gi;
  const wantedClasses = new Set(["citation-blog", "pull-quote", "quote-block", "testimonial-blog"]);
  let standaloneWrappers = 0;
  let m;
  while ((m = wrapperRe.exec(html)) !== null) {
    const classes = m[1].split(/\s+/);
    if (!classes.some((c) => wantedClasses.has(c))) continue;
    // If the wrapper already contains a <blockquote>, it's nested → already counted.
    if (/<blockquote\b/i.test(m[2])) continue;
    standaloneWrappers++;
  }
  return blockquoteCount + standaloneWrappers;
}

/**
 * Compute structural hints for a blog article HTML.
 *
 * @param {string} html — full Webflow HTML (from Supabase rebuild table)
 * @returns {{
 *   blockquote: number,
 *   table: number,
 *   callout: number,
 *   inlineCta: number,
 *   hubspotCta: number,
 *   linkedFigure: number,
 *   h2: number,
 *   h3: number,
 * }}
 */
export function computeStructuralHints(html) {
  const body = extractArticleBody(html);
  // Strip <script>/<style>/<noscript> to avoid false positives
  const cleaned = body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "");

  // Callouts: count panel-like divs/asides AND <blockquote>s used as alert
  // callouts (e.g. `<blockquote>💡 <strong>Le saviez-vous ?</strong>...`).
  // A standalone <h2>Astuce…</h2> is a section header, NOT a callout — only
  // count phrase matches when the parent element is a panel-like wrapper.
  const calloutPanelDivs = countByExactClass(cleaned, "div|aside|section", [
    "a-retenir",
    "callout",
    "insight",
    "highlight",
    "note-bloc",
    "info-bloc",
    "warning-bloc",
    "tip-bloc",
    "encart",
    "bon-a-savoir",
    "cta-product",
  ]);
  // Match <blockquote> whose first inner text starts with an alert emoji
  // (⚠️/💡/✨/📌/🚨/❗/🔔/✅/💬) OR with a known callout label in <strong>.
  const calloutBlockquotes = countMatches(
    cleaned,
    /<blockquote\b[^>]*>\s*(?:<p[^>]*>\s*)?(?:⚠️|💡|✨|📌|🚨|❗|🔔|✅|💬|<strong[^>]*>\s*(?:À retenir|À noter|Bon à savoir|En résumé|Le saviez-vous|Astuce|Pro tip))/gi,
  );

  const quoteTotal = countQuotes(cleaned);
  // Some <blockquote>s are alert-callouts (counted above) — don't double-count
  // them as quotes. Cap at 0.
  const realQuotes = Math.max(0, quoteTotal - calloutBlockquotes);

  // HubSpot CTA embeds are JS-injected iframes with no extractable label/href.
  // In the rebuild they are rendered as a generic `inline-cta` linking to the
  // site-wide demo route, so we count them under `inlineCta` (not a separate
  // `hubspotCta` dim) for the audit to match what we actually render.
  const hubspotEmbeds = countMatches(
    cleaned,
    /<(?:div|span|iframe)\b[^>]*class="[^"]*(?:hs-cta-embed|hbspt-cta|hs-cta-wrapper)[^"]*"/gi,
  );

  return {
    blockquote: realQuotes,
    table: countMatches(cleaned, /<table\b[^>]*>/gi),
    callout: calloutPanelDivs + calloutBlockquotes,
    inlineCta:
      countMatches(
        cleaned,
        /<a\b[^>]*class="[^"]*(?:btn-|cta-|button-|wp-block-button|wf-button|w-button)[^"]*"/gi,
      ) +
      countByExactClass(cleaned, "div", [
        "cta-inline",
        "cta-card-product",
        "cta-encart",
        "encart-cta",
      ]) +
      hubspotEmbeds,
    hubspotCta: 0,
    linkedFigure: countMatches(
      cleaned,
      /<a\b[^>]*>\s*<(?:figure|img)\b[^>]*>/gi,
    ),
    h2: countMatches(cleaned, /<h2\b[^>]*>/gi),
    h3: countMatches(cleaned, /<h3\b[^>]*>/gi),
  };
}

/**
 * Format hints as a human-readable string for the LLM system prompt.
 *
 * @param {ReturnType<typeof computeStructuralHints>} hints
 * @returns {string}
 */
export function formatHintsForPrompt(hints) {
  const lines = [];
  lines.push("STRUCTURAL HINTS (deterministic count from source HTML — non-negotiable):");
  lines.push(`- blockquote elements detected : ${hints.blockquote}`);
  lines.push(`- table elements detected : ${hints.table}`);
  lines.push(`- callout/insight panels detected : ${hints.callout}`);
  lines.push(`- inline-CTA buttons detected : ${hints.inlineCta}`);
  lines.push(`- HubSpot CTA embeds detected : ${hints.hubspotCta}`);
  lines.push(`- linked figures (<a><img>) detected : ${hints.linkedFigure}`);
  lines.push(`- h2 headings detected : ${hints.h2}`);
  lines.push(`- h3 headings detected : ${hints.h3}`);
  lines.push("");
  lines.push("YOU MUST emit AT LEAST :");
  lines.push(`- ${hints.blockquote} "quote" blocks`);
  lines.push(`- ${hints.table} "table" blocks`);
  lines.push(`- ${hints.callout} "insight-callout" blocks`);
  lines.push(`- ${hints.inlineCta} "inline-cta" blocks`);
  lines.push(`- ${hints.hubspotCta} "hubspot-cta" blocks`);
  lines.push(`- ${hints.h2 + hints.h3} "heading" blocks (level 2 + 3)`);
  lines.push("");
  lines.push("If your output has fewer than these counts you have failed the extraction.");
  lines.push("If a structure is genuinely absent in the source, set the count to 0 — but the count above is computed from regex matches, so 0 means 0.");
  return lines.join("\n");
}

/**
 * Validate an extracted BlogArticleV2 against the structural hints.
 * Returns array of mismatches (empty array = valid).
 *
 * @param {{blocks: Array<{type:string}>}} extract
 * @param {ReturnType<typeof computeStructuralHints>} hints
 * @returns {Array<{kind:string, expected:number, actual:number}>}
 */
export function validateExtractAgainstHints(extract, hints) {
  const counts = {
    quote: 0,
    table: 0,
    "insight-callout": 0,
    "inline-cta": 0,
    "hubspot-cta": 0,
    heading: 0,
  };
  for (const b of extract.blocks || []) {
    if (b.type in counts) counts[b.type]++;
  }
  const mismatches = [];
  if (counts.quote < hints.blockquote)
    mismatches.push({ kind: "quote", expected: hints.blockquote, actual: counts.quote });
  if (counts.table < hints.table)
    mismatches.push({ kind: "table", expected: hints.table, actual: counts.table });
  if (counts["insight-callout"] < hints.callout)
    mismatches.push({ kind: "insight-callout", expected: hints.callout, actual: counts["insight-callout"] });
  if (counts["inline-cta"] < hints.inlineCta)
    mismatches.push({ kind: "inline-cta", expected: hints.inlineCta, actual: counts["inline-cta"] });
  if (counts["hubspot-cta"] < hints.hubspotCta)
    mismatches.push({ kind: "hubspot-cta", expected: hints.hubspotCta, actual: counts["hubspot-cta"] });
  if (counts.heading < hints.h2 + hints.h3)
    mismatches.push({
      kind: "heading",
      expected: hints.h2 + hints.h3,
      actual: counts.heading,
    });
  return mismatches;
}

/**
 * Format mismatches as a re-prompt focused on what was missed.
 *
 * @param {Array<{kind:string, expected:number, actual:number}>} mismatches
 * @returns {string}
 */
export function formatMismatchesForRetry(mismatches) {
  const lines = ["YOUR PREVIOUS EXTRACT MISSED STRUCTURES — rerun with these targets :"];
  for (const m of mismatches) {
    lines.push(
      `- "${m.kind}" : you emitted ${m.actual}, source has ${m.expected}. Find the missing ${m.expected - m.actual} in the body.`,
    );
  }
  lines.push("");
  lines.push("Possible reasons you missed them :");
  lines.push("- A `<blockquote>` was misclassified as a `<p>` paragraph");
  lines.push('- A panel with `class="a-retenir"` or visible "À retenir" heading was extracted as paragraph');
  lines.push("- A button-styled `<a>` link was kept inline in a paragraph instead of split into inline-cta");
  lines.push("- A nested table (inside .rich-text-content) was flattened to text");
  lines.push("");
  lines.push("Re-extract the article keeping the same valid blocks AND adding the missing structures.");
  return lines.join("\n");
}
