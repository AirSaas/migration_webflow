import { z } from "zod";
import { CmsToggles } from "../../../../src/types/blog-v3.js";
import { getBlogItemBySlug, type WebflowItem } from "../utils/webflow.js";
import type { ArticleLogger } from "../utils/logger.js";

/**
 * Agent 2 — CMS Toggles Reader
 *
 * Input  : slug
 * Output : CmsToggles (showFaq/showNewsletter/showCta/customCta…)
 *
 * Reads the per-article booleans from Webflow CMS via the REST API v2.
 * Webflow field names vary between projects — we probe a list of likely
 * `field_data` keys and fall back to safe defaults (true for required UI
 * sections, null for customCta). When a field genuinely doesn't exist,
 * the article uses the global blog default (BLOG_INDEX_DATA.cta).
 *
 * Field-name heuristic — common Webflow CMS conventions :
 *   show-faq / show_faq / showFaq / hide-faq / faq-hidden
 *   show-newsletter / show_newsletter / hide-newsletter
 *   show-cta / show_cta / cta-hidden
 *   custom-cta-title / custom_cta_title — when set, overrides default CTA.
 *
 * Deterministic, no LLM. If the Webflow API rate-limits or fails, the
 * agent throws — state machine catches + retries with backoff.
 */

function readBool(item: WebflowItem | null, ...keys: string[]): boolean | undefined {
  if (!item) return undefined;
  for (const k of keys) {
    if (k in item.fieldData) {
      const v = item.fieldData[k];
      if (typeof v === "boolean") return v;
      if (typeof v === "string") {
        if (/^(true|yes|1|on)$/i.test(v)) return true;
        if (/^(false|no|0|off)$/i.test(v)) return false;
      }
    }
  }
  return undefined;
}

function readString(item: WebflowItem | null, ...keys: string[]): string | undefined {
  if (!item) return undefined;
  for (const k of keys) {
    const v = item.fieldData[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}

export interface CmsTogglesInput {
  slug: string;
}

export type CmsTogglesOutput = z.infer<typeof CmsToggles>;

export async function runCmsTogglesReader(
  input: CmsTogglesInput,
  logger: ArticleLogger,
): Promise<CmsTogglesOutput> {
  let item: WebflowItem | null = null;
  try {
    item = await getBlogItemBySlug(input.slug);
  } catch (e) {
    logger.warn("cms-toggles-reader", `Webflow API failed: ${(e as Error).message}. Falling back to defaults.`);
  }

  if (!item) {
    logger.warn("cms-toggles-reader", `No Webflow CMS item for slug=${input.slug}. Using defaults.`);
  } else {
    logger.info("cms-toggles-reader", `Webflow CMS item id=${item.id}`);
  }

  // Boolean toggles. Webflow stores "hide-X" booleans by convention — when
  // we see one we invert. Default behavior : everything shown.
  const showFaq =
    readBool(item, "show-faq", "show_faq", "showFaq") ??
    invertIfDefined(readBool(item, "hide-faq", "faq-hidden", "hide_faq")) ??
    true;
  const showNewsletter =
    readBool(item, "show-newsletter", "show_newsletter", "showNewsletter") ??
    invertIfDefined(readBool(item, "hide-newsletter")) ??
    true;
  const showCta =
    readBool(item, "show-cta", "show_cta", "showCta") ??
    invertIfDefined(readBool(item, "hide-cta", "cta-hidden")) ??
    true;
  const showRelated = readBool(item, "show-related", "show_related") ?? true;
  const showTrending = readBool(item, "show-trending", "show_trending") ?? true;

  // Custom CTA — when at least the highlight text is set, the article
  // overrides the default closing CTA.
  const customTitle = readString(item, "custom-cta-title", "cta-title", "custom_cta_title");
  const customHighlight = readString(item, "custom-cta-highlight", "cta-highlight", "custom_cta_highlight");
  const customLabel = readString(item, "custom-cta-label", "cta-label", "custom_cta_label");
  const customHref = readString(item, "custom-cta-href", "cta-href", "custom_cta_href");

  let customCta: CmsTogglesOutput["customCta"] = null;
  if (customHighlight || customTitle) {
    customCta = {
      titlePrefix: customTitle ?? "",
      titleHighlight: customHighlight ?? customTitle ?? "Découvrir AirSaas",
      titleSuffix: readString(item, "custom-cta-suffix", "cta-suffix") ?? undefined,
      subtitle: readString(item, "custom-cta-subtitle", "cta-subtitle") ?? undefined,
      ctaLabel: customLabel ?? "Réserver une démo",
      ctaHref: customHref ?? "/fr/meetings-pages",
    };
  }

  // FAQ visibility flags — Webflow models hidden FAQ items as a separate
  // reference collection in some projects, or with per-item booleans in
  // others. For v0 we leave the array empty; the Designer agent will use
  // heuristics on the rendered HTML (`display:none`, `w-condition-invisible`).
  const hiddenFaqIndices: number[] = [];

  const result: CmsTogglesOutput = {
    showFaq,
    showNewsletter,
    showCta,
    showRelated,
    showTrending,
    customCta,
    hiddenFaqIndices,
  };

  // Zod validate before returning.
  const parsed = CmsToggles.safeParse(result);
  if (!parsed.success) {
    throw new Error(`CmsToggles Zod failure: ${parsed.error.message}`);
  }

  logger.info(
    "cms-toggles-reader",
    `toggles : faq=${showFaq} newsletter=${showNewsletter} cta=${showCta} customCta=${customCta ? "set" : "null"}`,
  );
  return parsed.data;
}

function invertIfDefined(v: boolean | undefined): boolean | undefined {
  return v === undefined ? undefined : !v;
}
