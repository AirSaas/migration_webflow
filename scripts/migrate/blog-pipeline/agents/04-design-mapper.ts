import { readFileSync } from "node:fs";
import yaml from "js-yaml";
import { z } from "zod";
import {
  RenderingSpec,
  type ContentBlocks,
  type CmsToggles,
} from "../../../../src/types/blog-v3.js";
import { callToolUse } from "../utils/anthropic.js";
import { PATHS } from "../config.js";
import type { ArticleLogger } from "../utils/logger.js";

/**
 * Agent 4 — Design Mapper (Opus)
 *
 * Input  : ContentBlocks (extractor) + CmsToggles + DS registry + design rules YAML
 * Output : RenderingSpec V3 = BlogArticleV3 with explicit variants
 *
 * Responsibilities :
 *   - Map content blocks to V3 blocks with explicit variant/gradient/widthMode
 *   - Apply YAML rules (Quote→card, H3→gradient primary, Figure→breakout…)
 *   - Convert alert-blockquotes (isAlertCallout=true) → insight-callout
 *   - Convert hubspot-cta-embed → inline-cta /fr/meetings-pages
 *   - Decide layout (centeredToc / stickyToc / noToc)
 *   - Apply CmsToggles to article-level toggles + customCta
 *
 * Opus is used (not Sonnet) for the design judgment — the YAML is loose
 * (English/French rules) and Opus handles ambiguity better than Sonnet
 * when applying creative decisions like "infer warning variant from emoji".
 */

let designRulesCache: string | null = null;
function loadDesignRules(): string {
  if (designRulesCache) return designRulesCache;
  designRulesCache = readFileSync(PATHS.rulesYaml, "utf8");
  return designRulesCache;
}

let dsRegistryCache: string | null = null;
function loadDsRegistry(): string {
  if (dsRegistryCache) return dsRegistryCache;
  const raw = JSON.parse(readFileSync(PATHS.dsRegistry, "utf8")) as {
    componentsByName: Record<string, unknown>;
  };
  // Slim the registry to keys that matter to the Designer — full
  // 64-component list would burn tokens. We keep the names + variants.
  const slim: Record<string, unknown> = {};
  for (const [name, c] of Object.entries(raw.componentsByName)) {
    const obj = c as { variants?: unknown };
    slim[name] = { variants: obj.variants ?? {} };
  }
  dsRegistryCache = JSON.stringify(slim);
  return dsRegistryCache;
}

const SYSTEM_PROMPT = `You are the Design Mapper for the AirSaas blog migration pipeline.

Input you receive (in the user message) :
  - 'content' : structured blocks the extractor produced (no variant decisions yet)
  - 'cmsToggles' : per-article booleans + optional customCta
  - 'designRules' : the YAML acceptance checklist (Quote→card, H3→gradient primary, etc.)
  - 'dsRegistry' : the allowed DS components / variants
  - 'feedback' (optional) : issues from a previous attempt the Designer must fix

Your job : produce a RenderingSpec V3 — an exact BlogArticleV3 with every block carrying its variant decision. The Renderer is passive: whatever you decide here will render verbatim.

NON-NEGOTIABLE rules (encoded in designRules — STRICTLY apply) :

1. EVERY 'quote' block → variant="card", align="left". Never "pull".
2. EVERY content.heading with sourceLevel<=3 → DS level=3, gradient="primary".
   Content.heading with sourceLevel>=4 → DS level=4, gradient="none".
3. EVERY content.figure → widthMode="breakout", tone="warm".
4. ALERT blockquotes (content.quote with isAlertCallout=true) → CONVERT to insight-callout :
     - Pick label from the leading <strong> text (or map emoji : ⚠️→"Attention", 💡→"Le saviez-vous", 📌→"À retenir", 🚨→"Alerte", ✅→"Bon à savoir").
     - Pick variant : warning if emoji in {⚠️,🚨,❗} or label includes "Méfions"/"Attention" ; success if {✅,Bon à savoir,Pro tip,Astuce} ; primary otherwise.
     - The 'html' field is the original block.text (with the leading emoji+<strong> stripped if redundant with label).
5. HUBSPOT-CTA-EMBED → CONVERT to inline-cta with text="Vous voulez en savoir plus ?", ctaLabel="Réservez votre démo de 30 min", ctaHref="/fr/meetings-pages".
6. INSIGHT-CALLOUT from extractor → keep as insight-callout. Use label from extractor or "À retenir".
7. TABLE → keep as-is (TableFrame is fixed; headers will render white on primary).
8. PARAGRAPH/LIST/INLINE-CTA → pass through with normalized fields.

LAYOUT decision :
  - If toc.length >= 3 → layout="centeredToc" (TableOfContentsFrame at top)
  - If toc.length < 3 → layout="noToc"
  Never use stickyToc by default — only if a future rule requests it.

TOGGLES :
  - showFaq, showNewsletter, showCta, showRelated, showTrending : copy from cmsToggles
  - customCta : copy from cmsToggles (may be null)

META :
  - Pass through meta.title, description, h1, heroImage, author, publishedDate from content.meta.
  - If author is null, leave it null — the renderer falls back to "AirSaas" + the brand icon.

FAQ : copy from content.faq, mark hidden=false for all items (Webflow hidden filtering is done by deterministic agent later if available).

TOC : copy from content.toc (label, href, level).

RELATED : copy from content.related.

OUTPUT EXACTLY a RenderingSpec V3 object. No prose, no markdown — the tool_use call enforces JSON.`;

const TOOL_INPUT_SCHEMA = {
  type: "object",
  required: ["slug", "skip", "meta", "blocks", "layout", "toggles", "customCta", "faq", "toc", "related"],
  properties: {
    slug: { type: "string", minLength: 1 },
    skip: { type: "boolean" },
    reason: { type: "string" },
    meta: {
      type: "object",
      required: ["title", "description", "h1", "heroImage", "author"],
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        h1: { type: "string" },
        heroImage: {
          oneOf: [
            { type: "null" },
            { type: "object", required: ["src", "alt"], properties: { src: { type: "string" }, alt: { type: "string" } } },
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
            ],
          },
          level: { type: "integer", enum: [2, 3, 4] },
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
          headers: { type: "array", items: { type: "string" } },
          rows: { type: "array", items: { type: "array", items: { type: "string" } } },
          label: { type: "string" },
          ctaLabel: { type: "string" },
          ctaHref: { type: "string" },
          gradient: { type: "string", enum: ["none", "primary"] },
          variant: { type: "string", enum: ["card", "pull", "primary", "success", "warning"] },
          align: { type: "string", enum: ["left", "center"] },
          widthMode: { type: "string", enum: ["reading", "breakout"] },
          tone: { type: "string", enum: ["neutral", "warm"] },
        },
      },
    },
    layout: { type: "string", enum: ["centeredToc", "stickyToc", "noToc"] },
    toggles: {
      type: "object",
      required: ["showFaq", "showNewsletter", "showCta", "showRelated", "showTrending"],
      properties: {
        showFaq: { type: "boolean" },
        showNewsletter: { type: "boolean" },
        showCta: { type: "boolean" },
        showRelated: { type: "boolean" },
        showTrending: { type: "boolean" },
      },
    },
    customCta: {
      oneOf: [
        { type: "null" },
        {
          type: "object",
          required: ["titlePrefix", "titleHighlight", "ctaLabel", "ctaHref"],
          properties: {
            titlePrefix: { type: "string" },
            titleHighlight: { type: "string" },
            titleSuffix: { type: "string" },
            subtitle: { type: "string" },
            ctaLabel: { type: "string" },
            ctaHref: { type: "string" },
          },
        },
      ],
    },
    faq: {
      type: "array",
      items: {
        type: "object",
        required: ["question", "answer"],
        properties: {
          question: { type: "string" },
          answer: { type: "string" },
          hidden: { type: "boolean" },
        },
      },
    },
    toc: {
      type: "array",
      items: {
        type: "object",
        required: ["label", "href", "level"],
        properties: { label: { type: "string" }, href: { type: "string" }, level: { type: "integer", enum: [2, 3] } },
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

export interface DesignMapperInput {
  slug: string;
  content: ContentBlocks;
  cmsToggles: CmsToggles;
  /** Optional feedback from a failed attempt — Designer must address. */
  feedback?: {
    issues: Array<{ ruleId?: string; blockType?: string; severity: string; details: string; fixHint?: string }>;
    attempt: number;
  };
}

export type DesignMapperOutput = z.infer<typeof RenderingSpec>;

export async function runDesignMapper(
  input: DesignMapperInput,
  logger: ArticleLogger,
): Promise<DesignMapperOutput> {
  const rules = loadDesignRules();
  const registry = loadDsRegistry();

  const feedbackBlock = input.feedback
    ? `\n\n--- FEEDBACK from attempt ${input.feedback.attempt} ---\n` +
      `The previous spec failed audit. You MUST fix these issues :\n` +
      input.feedback.issues
        .map((i) => `- [${i.severity}] ${i.ruleId ?? i.blockType ?? "issue"}: ${i.details}${i.fixHint ? ` → ${i.fixHint}` : ""}`)
        .join("\n") +
      "\n--- END FEEDBACK ---\n"
    : "";

  const userPrompt = `slug = ${input.slug}

--- designRules (YAML) ---
${rules}
--- end designRules ---

--- dsRegistry (slim) ---
${registry}
--- end dsRegistry ---

--- content (extractor output) ---
${JSON.stringify(input.content, null, 2)}
--- end content ---

--- cmsToggles ---
${JSON.stringify(input.cmsToggles, null, 2)}
--- end cmsToggles ---${feedbackBlock}

Produce the RenderingSpec V3 for this article, applying ALL designRules.`;

  const { output, usage } = await callToolUse<unknown>({
    model: "claude-opus-4-7",
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    toolName: "produce_rendering_spec",
    toolDescription: "Produce the RenderingSpec V3 with explicit variants/layout/toggles",
    inputSchema: TOOL_INPUT_SCHEMA,
    maxTokens: 16000,
    slug: input.slug,
    cacheSystem: true,
  });

  // Inject slug (the LLM should set it but we enforce).
  const candidate = { ...(output as Record<string, unknown>), slug: input.slug };

  const parsed = RenderingSpec.safeParse(candidate);
  if (!parsed.success) {
    logger.error("design-mapper", "Zod validation failed", parsed.error.flatten());
    throw new Error(`DesignMapper Zod failure: ${parsed.error.message}`);
  }
  logger.info(
    "design-mapper",
    `spec : ${parsed.data.blocks.length} blocks, layout=${parsed.data.layout} (in=${usage.input_tokens} out=${usage.output_tokens})`,
  );
  return parsed.data;
}
