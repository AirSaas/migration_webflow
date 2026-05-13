import type { ContentBlocks } from "../../../../src/types/blog-v3.js";
import { extractArticleBody } from "../utils/html.js";
import type { ArticleLogger } from "../utils/logger.js";
import { fetchWebflowHtml } from "../utils/supabase.js";

/**
 * Agent 3 — Content Validator (deterministic)
 *
 * Validates the extractor's output against the source HTML using regex
 * hints. Cross-checks structural counts (quotes / tables / callouts /
 * headings) so we catch over- or under-emission. Re-uses the proven
 * regex patterns from blog-structural-hints.mjs (v7 final, class-exact).
 *
 * Returns a list of mismatches. Empty list = pass. The state machine
 * forwards mismatches as feedback to the Design Mapper on retry — same
 * recovery pattern as v6.
 */

export interface ContentValidatorInput {
  slug: string;
  /** ContentBlocks emitted by agent 1. */
  content: import("zod").infer<typeof import("../../../../src/types/blog-v3.js").ContentBlocks>;
  /** Optional source HTML — fetched if not passed. */
  sourceHtml?: string;
}

export interface ContentValidationIssue {
  kind: "block-count-mismatch";
  blockType: string;
  expected: number;
  actual: number;
  severity: "P0" | "P1" | "P2";
  fixHint: string;
}

export interface ContentValidatorOutput {
  passed: boolean;
  issues: ContentValidationIssue[];
  hints: {
    blockquote: number;
    table: number;
    callout: number;
    inlineCta: number;
    hubspotCta: number;
    linkedFigure: number;
    h2: number;
    h3: number;
  };
}

function countMatches(s: string, re: RegExp): number {
  const m = s.match(re);
  return m ? m.length : 0;
}

function countByExactClass(html: string, tagPattern: string, classes: string[]): number {
  const tagRe = new RegExp(`<(?:${tagPattern})\\b[^>]*\\bclass="([^"]*)"[^>]*>`, "gi");
  const wanted = new Set(classes);
  let count = 0;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(html)) !== null) {
    const cls = m[1].split(/\s+/);
    if (cls.some((c) => wanted.has(c))) count++;
  }
  return count;
}

function countQuotes(html: string): number {
  const bq = countMatches(html, /<blockquote\b[^>]*>/gi);
  // .citation-blog / .pull-quote / .quote-block / .testimonial-blog wrappers
  // — only count when they DON'T contain a nested <blockquote> (which is
  // already counted). The Webflow speaker-blog-quote avatar div is
  // intentionally EXCLUDED to avoid the v6 triple-count bug.
  const wrapperRe =
    /<(?:div|aside)\b[^>]*\bclass="([^"]*)"[^>]*>([\s\S]*?)<\/(?:div|aside)>/gi;
  const want = new Set(["citation-blog", "pull-quote", "quote-block", "testimonial-blog"]);
  let stand = 0;
  let m: RegExpExecArray | null;
  while ((m = wrapperRe.exec(html)) !== null) {
    const cls = m[1].split(/\s+/);
    if (!cls.some((c) => want.has(c))) continue;
    if (/<blockquote\b/i.test(m[2])) continue;
    stand++;
  }
  return bq + stand;
}

function computeHints(html: string) {
  const body = extractArticleBody(html);
  const cleaned = body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "");

  const calloutDivs = countByExactClass(cleaned, "div|aside|section", [
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
  // Alert-emoji blockquotes count as callouts. The Designer should map them.
  const calloutBlockquotes = countMatches(
    cleaned,
    /<blockquote\b[^>]*>\s*(?:<p[^>]*>\s*)?(?:⚠️|💡|✨|📌|🚨|❗|🔔|✅|💬|<strong[^>]*>\s*(?:À retenir|À noter|Bon à savoir|En résumé|Le saviez-vous|Astuce|Pro tip))/gi,
  );
  const quoteTotal = countQuotes(cleaned);
  const realQuotes = Math.max(0, quoteTotal - calloutBlockquotes);
  const hubspotEmbeds = countMatches(
    cleaned,
    /<(?:div|span|iframe)\b[^>]*class="[^"]*(?:hs-cta-embed|hbspt-cta|hs-cta-wrapper)[^"]*"/gi,
  );

  return {
    blockquote: realQuotes,
    table: countMatches(cleaned, /<table\b[^>]*>/gi),
    callout: calloutDivs + calloutBlockquotes,
    inlineCta:
      countMatches(
        cleaned,
        /<a\b[^>]*class="[^"]*(?:btn-|cta-|button-|wp-block-button|wf-button|w-button)[^"]*"/gi,
      ) + hubspotEmbeds,
    hubspotCta: 0,
    linkedFigure: countMatches(cleaned, /<a\b[^>]*>\s*<(?:figure|img)\b[^>]*>/gi),
    h2: countMatches(cleaned, /<h2\b[^>]*>/gi),
    h3: countMatches(cleaned, /<h3\b[^>]*>/gi),
  };
}

function countBlocksByType(content: ContentBlocks) {
  const c = {
    quote: 0,
    table: 0,
    "insight-callout": 0,
    "inline-cta": 0,
    "hubspot-cta-embed": 0,
    heading: 0,
  } as Record<string, number>;
  for (const b of content.blocks) {
    if (b.type in c) c[b.type]++;
  }
  // Sum hubspot embeds into inline-cta budget — they'll convert in Designer.
  return c;
}

export async function runContentValidator(
  input: ContentValidatorInput,
  logger: ArticleLogger,
): Promise<ContentValidatorOutput> {
  const html = input.sourceHtml ?? (await fetchWebflowHtml(input.slug));
  const hints = computeHints(html);
  const counts = countBlocksByType(input.content);
  const issues: ContentValidationIssue[] = [];

  // Alert blockquotes (counted as callouts by regex) are still emitted as
  // type="quote" by the extractor — with isAlertCallout=true. The Designer
  // converts them. So for the count check we ADD them back to the quote
  // expected count.
  const alertQuotesInExtract = input.content.blocks.filter(
    (b) => b.type === "quote" && b.isAlertCallout,
  ).length;
  const realQuotesInExtract = counts.quote - alertQuotesInExtract;

  // Quote count : real quotes only (alerts go to callouts).
  if (realQuotesInExtract < hints.blockquote) {
    issues.push({
      kind: "block-count-mismatch",
      blockType: "quote",
      expected: hints.blockquote,
      actual: realQuotesInExtract,
      severity: "P1",
      fixHint:
        "Source has more <blockquote> elements than the extractor emitted. Re-scan the article body and emit missing quotes (look for .citation-blog wrappers).",
    });
  }

  // Callouts : extracted insight-callout + alert blockquotes.
  const totalCalloutsInExtract = counts["insight-callout"] + alertQuotesInExtract;
  if (totalCalloutsInExtract < hints.callout) {
    issues.push({
      kind: "block-count-mismatch",
      blockType: "insight-callout",
      expected: hints.callout,
      actual: totalCalloutsInExtract,
      severity: "P1",
      fixHint:
        "Source has more callout panels (.a-retenir / .insight / alert blockquotes) than emitted. Look for visible 'À retenir' / 'Le saviez-vous' / ⚠️/💡 markers.",
    });
  }

  if (counts.table < hints.table) {
    issues.push({
      kind: "block-count-mismatch",
      blockType: "table",
      expected: hints.table,
      actual: counts.table,
      severity: "P0",
      fixHint: "Source has <table> elements not emitted. Tables must NEVER be flattened to paragraphs.",
    });
  }

  // HubSpot embeds become inline-cta in Design Mapper. The extractor
  // emits them as `hubspot-cta-embed`. Count this as inline-cta budget.
  const inlineCtaInExtract = counts["inline-cta"] + counts["hubspot-cta-embed"];
  if (inlineCtaInExtract < hints.inlineCta) {
    issues.push({
      kind: "block-count-mismatch",
      blockType: "inline-cta",
      expected: hints.inlineCta,
      actual: inlineCtaInExtract,
      severity: "P2",
      fixHint:
        "Source has more inline CTAs (btn-/cta-/w-button classes) than emitted. Look for button-styled <a> links in the body.",
    });
  }

  const headingExpected = hints.h2 + hints.h3;
  if (counts.heading < headingExpected) {
    issues.push({
      kind: "block-count-mismatch",
      blockType: "heading",
      expected: headingExpected,
      actual: counts.heading,
      severity: "P1",
      fixHint:
        "Source has more H2/H3 headings than emitted. Don't skip headings — sections without bodies are still emitted.",
    });
  }

  const passed = issues.length === 0;
  logger.info(
    "content-validator",
    `hints q=${hints.blockquote} t=${hints.table} c=${hints.callout} cta=${hints.inlineCta} h=${headingExpected} ; extract q=${realQuotesInExtract} t=${counts.table} c=${totalCalloutsInExtract} cta=${inlineCtaInExtract} h=${counts.heading} → ${passed ? "PASS" : "FAIL (" + issues.length + ")"}`,
  );
  return { passed, issues, hints };
}
