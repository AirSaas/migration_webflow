/**
 * Blog article types V3 — passive renderer model.
 *
 * Difference from V2 :
 *   - Each block CARRIES the explicit rendering choice (variant, gradient,
 *     layout flag) — the renderer just maps the spec to the DS primitive
 *     without hardcoded "if this then that" logic. This eliminates the
 *     class of bugs identified in Marianela's audit (Quote always `pull`,
 *     H3 always solid, etc.).
 *   - Article-level toggles (showFaq / showNewsletter / showCta) come from
 *     Webflow CMS, not heuristics on the rendered HTML.
 *   - Custom CTA per article (override the global blog default) is
 *     explicit.
 *
 * Zod schemas mirror the TS types and are used by every agent of the
 * blog migration pipeline (Phase 2). LLM-driven extraction is constrained
 * by these schemas via Anthropic `tool_use` inputSchema — eliminating
 * hallucinated variants / shapes.
 */
import { z } from "zod";

// ─── Heading ────────────────────────────────────────────────────────────────

export const HeadingBlockV3 = z.object({
  type: z.literal("heading"),
  /** DS-mapped level — body H2 → DS 3, body H3+ → DS 4. */
  level: z.union([z.literal(2), z.literal(3), z.literal(4)]),
  /** Source level from Webflow HTML (informational only — drives gradient choice). */
  sourceLevel: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]).optional(),
  /** Visible heading text. */
  text: z.string().min(1),
  /** Slugified id for in-page anchors (TOC + scroll-spy). */
  id: z.string().min(1),
  /** Gradient applied via the DS Heading prop. */
  gradient: z.enum(["none", "primary"]),
});
export type HeadingBlockV3 = z.infer<typeof HeadingBlockV3>;

// ─── Paragraph ──────────────────────────────────────────────────────────────

export const ParagraphBlockV3 = z.object({
  type: z.literal("paragraph"),
  /** Inner HTML — may contain `<strong>`, `<em>`, `<a>`, `<br>`. */
  html: z.string().min(1),
});
export type ParagraphBlockV3 = z.infer<typeof ParagraphBlockV3>;

// ─── List ───────────────────────────────────────────────────────────────────

export const ListBlockV3 = z.object({
  type: z.literal("list"),
  ordered: z.boolean(),
  /** Each item is inline HTML (preserved). */
  items: z.array(z.string().min(1)).min(1).max(20),
});
export type ListBlockV3 = z.infer<typeof ListBlockV3>;

// ─── Figure ─────────────────────────────────────────────────────────────────

export const FigureBlockV3 = z.object({
  type: z.literal("figure"),
  src: z.string().url(),
  alt: z.string(),
  caption: z.string().nullable().optional(),
  /** Image width handling : "reading" (50rem cap) or "breakout" (full prose frame). */
  widthMode: z.enum(["reading", "breakout"]).default("breakout"),
  /** Background frame tone (matches IllustrationFrame `tone` prop). */
  tone: z.enum(["neutral", "warm"]).default("warm"),
});
export type FigureBlockV3 = z.infer<typeof FigureBlockV3>;

// ─── Quote ──────────────────────────────────────────────────────────────────

export const QuoteBlockV3 = z.object({
  type: z.literal("quote"),
  text: z.string().min(1),
  author: z.string().nullable().optional(),
  authorAvatar: z.string().url().nullable().optional(),
  /** DS Quote variant — `card` is the Figma default for blog body. */
  variant: z.enum(["card", "pull"]).default("card"),
  align: z.enum(["left", "center"]).default("left"),
});
export type QuoteBlockV3 = z.infer<typeof QuoteBlockV3>;

// ─── Table ──────────────────────────────────────────────────────────────────

export const TableBlockV3 = z.object({
  type: z.literal("table"),
  headers: z.array(z.string()).min(2).max(6),
  rows: z.array(z.array(z.string()).min(2).max(6)).min(1).max(20),
});
export type TableBlockV3 = z.infer<typeof TableBlockV3>;

// ─── Insight callout ────────────────────────────────────────────────────────

export const InsightCalloutBlockV3 = z.object({
  type: z.literal("insight-callout"),
  /** Inner HTML — may contain `<strong>`, `<em>`, `<a>`, `<ul>/<li>`. */
  html: z.string().min(1),
  /** Title shown above the body. Maps to `<InsightCallout title>`. */
  label: z.string().min(1).max(40).default("À retenir"),
  /** DS variant — drives color theme. */
  variant: z.enum(["primary", "success", "warning"]).default("primary"),
});
export type InsightCalloutBlockV3 = z.infer<typeof InsightCalloutBlockV3>;

// ─── Inline CTA ─────────────────────────────────────────────────────────────

export const InlineCtaBlockV3 = z.object({
  type: z.literal("inline-cta"),
  /** Surrounding message text. Required (the CTA button needs context). */
  text: z.string().min(1),
  /** CTA button label. */
  ctaLabel: z.string().min(1).max(40),
  /** CTA button href. */
  ctaHref: z.string().min(1),
});
export type InlineCtaBlockV3 = z.infer<typeof InlineCtaBlockV3>;

// ─── Block discriminated union ──────────────────────────────────────────────

export const BlockV3 = z.discriminatedUnion("type", [
  HeadingBlockV3,
  ParagraphBlockV3,
  ListBlockV3,
  FigureBlockV3,
  QuoteBlockV3,
  TableBlockV3,
  InsightCalloutBlockV3,
  InlineCtaBlockV3,
]);
export type BlockV3 = z.infer<typeof BlockV3>;

// ─── Layout flags ───────────────────────────────────────────────────────────

export const LayoutV3 = z.enum([
  "centeredToc", // Figma 303:1015 — centered TableOfContentsFrame at top, no sidebar
  "stickyToc",   // legacy — sticky left sidebar (kept for fallback / future use)
  "noToc",       // short articles without TOC
]);
export type LayoutV3 = z.infer<typeof LayoutV3>;

// ─── Article-level toggles ──────────────────────────────────────────────────

export const TogglesV3 = z.object({
  /** Render the FAQ frame after the article body. From Webflow CMS toggle. */
  showFaq: z.boolean(),
  /** Render the inline NewsletterInlineCard inside the article body. */
  showNewsletter: z.boolean(),
  /** Render the CtaHighlightFrame closing CTA after FAQ. */
  showCta: z.boolean(),
  /** Render the "Pour aller plus loin" related grid. */
  showRelated: z.boolean(),
  /** Render the "Trending" 3-card sibling grid. */
  showTrending: z.boolean(),
});
export type TogglesV3 = z.infer<typeof TogglesV3>;

// ─── Custom CTA (article override) ──────────────────────────────────────────

export const CustomCtaV3 = z
  .object({
    titlePrefix: z.string().min(1).max(60),
    titleHighlight: z.string().min(1).max(60),
    titleSuffix: z.string().max(30).optional(),
    subtitle: z.string().max(220).optional(),
    ctaLabel: z.string().min(1).max(40),
    ctaHref: z.string().min(1),
  })
  .nullable();
export type CustomCtaV3 = z.infer<typeof CustomCtaV3>;

// ─── Author / meta ──────────────────────────────────────────────────────────

// `name: z.string()` (no .min) — articles without an author have name=""
// and the renderer falls back to "AirSaas". The Zod schema must accept this
// rather than fail extraction.
export const AuthorV3 = z
  .object({
    name: z.string(),
    category: z.string().optional(),
    publishedDate: z.string().optional(),
    avatarSrc: z.string().url().nullable().optional(),
  })
  .nullable();
export type AuthorV3 = z.infer<typeof AuthorV3>;

export const HeroImageV3 = z
  .object({
    src: z.string().url(),
    alt: z.string(),
  })
  .nullable();
export type HeroImageV3 = z.infer<typeof HeroImageV3>;

export const MetaV3 = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  h1: z.string().min(1),
  heroImage: HeroImageV3,
  author: AuthorV3,
  publishedDate: z.string().nullable().optional(),
});
export type MetaV3 = z.infer<typeof MetaV3>;

// ─── FAQ / TOC / Related ────────────────────────────────────────────────────

export const FaqItemV3 = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  /** Hidden in Webflow CMS — kept for tracing but NOT rendered. */
  hidden: z.boolean().default(false),
});
export type FaqItemV3 = z.infer<typeof FaqItemV3>;

export const TocItemV3 = z.object({
  label: z.string().min(1),
  href: z.string().regex(/^#/),
  level: z.union([z.literal(2), z.literal(3)]),
});
export type TocItemV3 = z.infer<typeof TocItemV3>;

export const RelatedItemV3 = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});
export type RelatedItemV3 = z.infer<typeof RelatedItemV3>;

// ─── Top-level article ──────────────────────────────────────────────────────

export const BlogArticleV3 = z.object({
  slug: z.string().min(1),
  skip: z.boolean(),
  reason: z.string().optional(),
  meta: MetaV3,
  blocks: z.array(BlockV3).min(0),
  layout: LayoutV3,
  toggles: TogglesV3,
  customCta: CustomCtaV3,
  faq: z.array(FaqItemV3).default([]),
  toc: z.array(TocItemV3).default([]),
  related: z.array(RelatedItemV3).default([]),
});
export type BlogArticleV3 = z.infer<typeof BlogArticleV3>;

// ─── Pipeline intermediates (used by agents) ────────────────────────────────

/**
 * Output of agent [1. Content Extractor] — raw blocks before design mapping.
 * Variants/layout/toggles are NOT decided yet; the Design Mapper will pick.
 */
export const ContentBlocks = z.object({
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    h1: z.string().min(1),
    heroImage: HeroImageV3.nullable().optional(),
    author: AuthorV3.nullable().optional(),
    publishedDate: z.string().nullable().optional(),
  }),
  /** Blocks with NO variant/layout decision — just typed content. */
  blocks: z.array(
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("heading"),
        sourceLevel: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]),
        text: z.string().min(1),
        id: z.string().min(1),
      }),
      z.object({ type: z.literal("paragraph"), html: z.string().min(1) }),
      z.object({
        type: z.literal("list"),
        ordered: z.boolean(),
        items: z.array(z.string().min(1)).min(1).max(20),
      }),
      z.object({
        type: z.literal("figure"),
        src: z.string().url(),
        alt: z.string(),
        caption: z.string().nullable().optional(),
      }),
      z.object({
        type: z.literal("quote"),
        text: z.string().min(1),
        author: z.string().nullable().optional(),
        authorAvatar: z.string().url().nullable().optional(),
        /** If `true`, the source blockquote starts with an alert emoji
         *  (⚠️/💡/...) — the Designer should map to insight-callout. */
        isAlertCallout: z.boolean().default(false),
      }),
      z.object({
        type: z.literal("table"),
        headers: z.array(z.string()).min(2).max(6),
        rows: z.array(z.array(z.string()).min(2).max(6)).min(1).max(20),
      }),
      z.object({
        type: z.literal("insight-callout"),
        html: z.string().min(1),
        label: z.string().optional(),
      }),
      z.object({
        type: z.literal("inline-cta"),
        text: z.string().min(1),
        ctaLabel: z.string().min(1),
        ctaHref: z.string().min(1),
      }),
      z.object({
        type: z.literal("hubspot-cta-embed"),
        /** Source iframe src — used by Designer to decide replacement strategy. */
        iframeSrc: z.string().url().optional(),
      }),
    ]),
  ),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  toc: z
    .array(
      z.object({ label: z.string(), href: z.string(), level: z.union([z.literal(2), z.literal(3)]) }),
    )
    .default([]),
  related: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
});
export type ContentBlocks = z.infer<typeof ContentBlocks>;

/**
 * Output of agent [2. CMS Toggles Reader] — Webflow CMS booleans + custom CTA.
 */
export const CmsToggles = z.object({
  showFaq: z.boolean(),
  showNewsletter: z.boolean(),
  showCta: z.boolean(),
  showRelated: z.boolean(),
  showTrending: z.boolean(),
  customCta: CustomCtaV3,
  /** FAQ items that are hidden in Webflow CMS (will be dropped). */
  hiddenFaqIndices: z.array(z.number()).default([]),
});
export type CmsToggles = z.infer<typeof CmsToggles>;

/**
 * Output of agent [4. Design Mapper] — final RenderingSpec (same as BlogArticleV3).
 * The Renderer (agent 6) consumes this directly.
 */
export const RenderingSpec = BlogArticleV3;
export type RenderingSpec = z.infer<typeof RenderingSpec>;

/**
 * Output of agent [7. Visual Auditor] — per-rule verdict + overall pass/fail.
 */
export const RuleVerdict = z.object({
  ruleId: z.string(),
  status: z.enum(["pass", "fail", "skip"]),
  severity: z.enum(["P0", "P1", "P2"]),
  evidence: z.string().optional(),
  suggestedFix: z
    .object({
      target: z.string(),
      action: z.string(),
      hint: z.string().optional(),
    })
    .optional(),
});
export type RuleVerdict = z.infer<typeof RuleVerdict>;

export const AuditVerdict = z.object({
  slug: z.string(),
  attempt: z.number().int().nonnegative(),
  rules: z.array(RuleVerdict),
  /** Overall pass = no P0/P1 failures. */
  passed: z.boolean(),
  totalCostUsd: z.number().nonnegative(),
});
export type AuditVerdict = z.infer<typeof AuditVerdict>;
