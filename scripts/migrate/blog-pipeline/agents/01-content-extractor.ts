import { z } from "zod";
import { ContentBlocks } from "../../../../src/types/blog-v3.js";
import { cleanHtmlForLlm } from "../utils/html.js";
import { callToolUse } from "../utils/anthropic.js";
import type { ArticleLogger } from "../utils/logger.js";
import { fetchWebflowHtml } from "../utils/supabase.js";

/**
 * Agent 1 — Content Extractor
 *
 * Input  : slug
 * Output : ContentBlocks (typed Zod) — raw blocks WITHOUT design variant decisions.
 *
 * Responsibility :
 *   - Fetch Webflow HTML from Supabase
 *   - Strip noise (scripts, styles, nav, footer)
 *   - Call Sonnet with tool_use to extract a typed structure
 *   - Mark alert-blockquotes (⚠️ 💡 📌 …) with isAlertCallout=true so the
 *     Designer agent can convert them to insight-callouts.
 *
 * Anti-hallucination guarantees :
 *   - tool_use forces JSON schema compliance (no free-form text)
 *   - schema requires every block to have type+required fields (no inventing
 *     a block type Zod can't validate)
 *   - The Content Validator (agent 3) runs after and cross-checks counts
 *     against regex hints on the source HTML.
 */

const SYSTEM_PROMPT = `You are a precision content extractor for AirSaas blog articles.

Your job: convert rendered Webflow HTML into a strict typed structure that downstream agents will use.

EXTRACTION RULES :

1. Extract content from the article body container. Priority order :
   div.container__article__integrations__text, div.blog-post-body, div.rich-text,
   div.post-body, then the outermost <article>. Pick the first with substantial content.

2. Meta :
   - title : <title> tag
   - description : <meta name="description">
   - h1 : first <h1> in the body
   - heroImage.src : <img class="post-img-blog"> or first hero figure src; alt from that img
   - author.name : <.author__text> value div (NOT the label div). Empty string if not set.
   - author.avatarSrc : <.author__photo> img src or null
   - author.category : the category link text near the author (e.g. "Gestion de projets")
   - author.publishedDate : the date string (e.g. "15/7/2023")

3. Block extraction. For each body block, emit ONE entry in 'blocks' array :
   - <h2>/<h3>/<h4>/<h5>/<h6>          → { type:"heading", sourceLevel, text, id (slugified) }
   - <p>                                → { type:"paragraph", html (preserve <strong>/<em>/<a>/<br>) }
   - <ul>/<ol>                          → { type:"list", ordered, items: string[] of inline HTML }
   - <figure>/<img>                     → { type:"figure", src, alt, caption (or null) }
   - <blockquote>                       → { type:"quote", text, author (or null), authorAvatar (or null), isAlertCallout }
   - <table>                            → { type:"table", headers: string[], rows: string[][] }
   - .a-retenir / .callout / .insight / .highlight divs
     OR <aside> with colored bg + visible "À retenir" / "À noter" header  → { type:"insight-callout", html, label? }
   - <a class="btn-*"|"cta-*"|"w-button">  → { type:"inline-cta", text, ctaLabel, ctaHref }
   - .hs-cta-embed / .hbspt-cta wrappers → { type:"hubspot-cta-embed", iframeSrc (extract from inner <iframe>) }

4. ALERT-CALLOUT DETECTION. A <blockquote> is an "alert callout" — NOT a regular pull-quote — when its first inner text starts with :
   - One of these alert emojis : ⚠️ 💡 ✨ 📌 🚨 ❗ 🔔 ✅ 💬
   - OR a <strong> tag containing one of : "À retenir", "À noter", "Bon à savoir", "En résumé", "Le saviez-vous", "Astuce", "Pro tip", "Méfions-nous"
   In either case set isAlertCallout=true. STILL emit it as type="quote" — the Design Mapper will convert it. Do NOT emit it as insight-callout (that type is for .a-retenir style panels only).

5. Drop content with CMS placeholders : "Speaker avatar:", "LINK_SPEAKER_PAGE", "insert the link", "change url of background-image". These are unfilled Webflow editor instructions, not real content.

6. Skip the article (return blocks=[] with skip:true via reason) if :
   - The body container is empty / unfindable
   - Page is a 404 / redirect placeholder
   - H1 is absent

7. Word boundary hygiene : preserve French apostrophes; never produce concat bugs like "PPMpour" or drop-cap artifacts like "A joutez". Insert space around <strong> boundaries when the source has run them together.

8. Heading IDs : slugify the text (lowercase, ASCII, hyphens, no diacritics). Truncate to 80 chars max. If empty, fall back to "section".

9. Heading levels : preserve the SOURCE level (2-6). Do NOT remap here — the Design Mapper handles DS level downshift.

10. FAQ block : extract from .wrapper__faq into the 'faq' array (question + answer plain text).
   TOC block : extract from .fs-toc-element / .summary-link into 'toc' array (label, href anchor, level 2 or 3).
   Related links : "Pour aller plus loin" section <ul>/<a> into 'related' array.

11. Tables : preserve the 2D structure (max 6 cols × 20 rows). Never flatten to a paragraph.

12. STRICT TYPING : every block MUST match its schema. If unsure of a type, prefer "paragraph" with the raw HTML.

NO HALLUCINATIONS : every block must trace to a node in the source HTML. Don't invent quotes, callouts, or CTAs.`;

/**
 * Build a Zod-derived JSON Schema for Anthropic tool_use. We hand-roll it
 * here because the Zod-to-JSON-Schema converter isn't 1:1 with Anthropic's
 * stricter draft-7. The schema mirrors ContentBlocks from src/types/blog-v3.ts.
 */
const TOOL_INPUT_SCHEMA = {
  type: "object",
  // Anthropic tool_use treats unlisted fields as optional. We only require
  // the structural ones the downstream agents can't synthesize. faq/toc/
  // related default to [] in the Zod schema so omission is safe.
  required: ["meta", "blocks"],
  properties: {
    meta: {
      type: "object",
      required: ["title", "description", "h1", "heroImage", "author"],
      properties: {
        title: { type: "string", minLength: 1 },
        description: { type: "string", minLength: 1 },
        h1: { type: "string", minLength: 1 },
        heroImage: {
          oneOf: [
            { type: "null" },
            {
              type: "object",
              required: ["src", "alt"],
              properties: { src: { type: "string" }, alt: { type: "string" } },
            },
          ],
        },
        author: {
          oneOf: [
            { type: "null" },
            {
              type: "object",
              required: ["name"],
              properties: {
                name: { type: "string" },
                category: { type: "string" },
                publishedDate: { type: "string" },
                avatarSrc: { type: ["string", "null"] },
              },
            },
          ],
        },
        publishedDate: { type: ["string", "null"] },
      },
    },
    blocks: {
      type: "array",
      items: {
        type: "object",
        required: ["type"],
        properties: {
          type: {
            type: "string",
            enum: [
              "heading",
              "paragraph",
              "list",
              "figure",
              "quote",
              "table",
              "insight-callout",
              "inline-cta",
              "hubspot-cta-embed",
            ],
          },
          sourceLevel: { type: "integer", enum: [2, 3, 4, 5, 6] },
          text: { type: "string" },
          html: { type: "string" },
          id: { type: "string" },
          ordered: { type: "boolean" },
          items: { type: "array", items: { type: "string" } },
          src: { type: "string" },
          alt: { type: "string" },
          caption: { type: ["string", "null"] },
          author: { type: ["string", "null"] },
          authorAvatar: { type: ["string", "null"] },
          isAlertCallout: { type: "boolean" },
          headers: { type: "array", items: { type: "string" } },
          rows: { type: "array", items: { type: "array", items: { type: "string" } } },
          label: { type: "string" },
          ctaLabel: { type: "string" },
          ctaHref: { type: "string" },
          iframeSrc: { type: "string" },
        },
      },
    },
    faq: {
      type: "array",
      items: {
        type: "object",
        required: ["question", "answer"],
        properties: { question: { type: "string" }, answer: { type: "string" } },
      },
    },
    toc: {
      type: "array",
      items: {
        type: "object",
        required: ["label", "href", "level"],
        properties: {
          label: { type: "string" },
          href: { type: "string" },
          level: { type: "integer", enum: [2, 3] },
        },
      },
    },
    related: {
      type: "array",
      items: {
        type: "object",
        required: ["label", "href"],
        properties: { label: { type: "string" }, href: { type: "string" } },
      },
    },
  },
};

export interface ExtractInput {
  slug: string;
  /** Optional override — when null, fetched from Supabase. */
  html?: string;
}

export type ExtractOutput = z.infer<typeof ContentBlocks>;

/**
 * Cheap shape sniff used to decide if a retry-with-bigger-tokens is needed.
 * Sonnet sometimes returns the tool_use input without the `blocks` array
 * when its output token budget is exhausted mid-emission.
 */
function isUsableExtract(o: unknown): boolean {
  if (!o || typeof o !== "object") return false;
  const r = o as { blocks?: unknown; meta?: unknown };
  if (!Array.isArray(r.blocks)) return false;
  if (r.blocks.length === 0) return false;
  if (!r.meta || typeof r.meta !== "object") return false;
  return true;
}

export async function runContentExtractor(
  input: ExtractInput,
  logger: ArticleLogger,
): Promise<ExtractOutput> {
  const html = input.html ?? (await fetchWebflowHtml(input.slug));
  const cleaned = cleanHtmlForLlm(html);
  logger.info("content-extractor", `cleaned HTML: ${(cleaned.length / 1024).toFixed(0)}KB`);
  const userPrompt = `slug = ${input.slug}\n\n--- HTML start ---\n${cleaned}\n--- HTML end ---`;

  // Long articles (50+ blocks) can hit the 16k cap and return truncated
  // output (missing `blocks`). We bump to 32k if the first pass looks bad.
  let output: unknown;
  let usage: Awaited<ReturnType<typeof callToolUse<unknown>>>["usage"];
  ({ output, usage } = await callToolUse<unknown>({
    model: "claude-sonnet-4-6",
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    toolName: "extract_blog_content",
    toolDescription: "Extract structured BlogArticle content from rendered Webflow HTML",
    inputSchema: TOOL_INPUT_SCHEMA,
    maxTokens: 16000,
    slug: input.slug,
    cacheSystem: true,
  }));
  if (!isUsableExtract(output)) {
    logger.warn(
      "content-extractor",
      `first pass output looks truncated — retrying with maxTokens=32000`,
    );
    ({ output, usage } = await callToolUse<unknown>({
      model: "claude-sonnet-4-6",
      systemPrompt: SYSTEM_PROMPT,
      userPrompt,
      toolName: "extract_blog_content",
      toolDescription: "Extract structured BlogArticle content from rendered Webflow HTML",
      inputSchema: TOOL_INPUT_SCHEMA,
      maxTokens: 32000,
      slug: input.slug,
      cacheSystem: true,
    }));
  }

  // Zod-validate before passing downstream. If Anthropic returns invalid
  // shape, throw — the state machine surfaces the error in the report.
  const parsed = ContentBlocks.safeParse(output);
  if (!parsed.success) {
    logger.error("content-extractor", "Zod validation failed", parsed.error.flatten());
    throw new Error(`ContentExtractor Zod failure: ${parsed.error.message}`);
  }
  logger.info(
    "content-extractor",
    `extracted ${parsed.data.blocks.length} blocks (in=${usage.input_tokens} out=${usage.output_tokens})`,
  );
  return parsed.data;
}
