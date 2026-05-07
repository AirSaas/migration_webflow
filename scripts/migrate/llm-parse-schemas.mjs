/**
 * llm-parse-schemas.mjs — JSON Schemas + lightweight validators for LLM-driven
 * extraction of LandingPage and BlogArticleV2.
 *
 * Mirror of src/types/landing.ts + src/types/blog.ts + src/types/blog-v2.ts.
 * Updated when the TypeScript types change.
 *
 * No Zod dependency — pure JSON Schema (for tool_use) + minimal runtime
 * validation (slug, type discriminant, required meta).
 */

// ─── Landing page schema ────────────────────────────────────────────────────

const heroSchema = {
  type: "object",
  required: ["type", "title"],
  additionalProperties: false,
  properties: {
    type: { const: "hero" },
    title: { type: "string", minLength: 1 },
    titleHighlight: { type: ["string", "null"] },
    subtitle: { type: ["string", "null"] },
    primaryCta: {
      type: ["object", "null"],
      required: ["label", "href"],
      properties: { label: { type: "string" }, href: { type: "string" } },
    },
    secondaryCta: {
      type: ["object", "null"],
      required: ["label", "href"],
      properties: { label: { type: "string" }, href: { type: "string" } },
    },
    imageSrc: { type: ["string", "null"] },
    imageAlt: { type: ["string", "null"] },
  },
};

const introSchema = {
  type: "object",
  required: ["type"],
  additionalProperties: false,
  properties: {
    type: { const: "intro" },
    title: { type: ["string", "null"] },
    body: { type: ["string", "null"] },
    headingLevel: { type: ["integer", "null"], enum: [2, 3, 4, null] },
    subSections: {
      type: ["array", "null"],
      items: {
        type: "object",
        properties: {
          title: { type: ["string", "null"] },
          body: { type: ["string", "null"] },
        },
      },
    },
  },
};

const featureSplitSchema = {
  type: "object",
  required: ["type", "title"],
  additionalProperties: false,
  properties: {
    type: { const: "feature-split" },
    reversed: { type: ["boolean", "null"] },
    title: { type: "string", minLength: 1 },
    titleHighlight: { type: ["string", "null"] },
    body: { type: ["string", "null"] },
    imageSrc: { type: ["string", "null"] },
    imageAlt: { type: ["string", "null"] },
    bullets: { type: ["array", "null"], items: { type: "string" } },
  },
};

const logoBarSchema = {
  type: "object",
  required: ["type", "logos"],
  additionalProperties: false,
  properties: {
    type: { const: "logo-bar" },
    title: { type: ["string", "null"] },
    variant: { type: ["string", "null"], enum: ["client", "press", "partner", null] },
    logos: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["src"],
        properties: { src: { type: "string" }, alt: { type: "string" } },
      },
    },
  },
};

const testimonialsSchema = {
  type: "object",
  required: ["type", "testimonials"],
  additionalProperties: false,
  properties: {
    type: { const: "testimonials" },
    title: { type: ["string", "null"] },
    titleHighlight: { type: ["string", "null"] },
    testimonials: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["text", "name"],
        properties: {
          text: { type: "string" },
          name: { type: "string" },
          role: { type: ["string", "null"] },
          company: { type: ["string", "null"] },
          avatarSrc: { type: ["string", "null"] },
          linkedinUrl: { type: ["string", "null"] },
          href: { type: ["string", "null"] },
        },
      },
    },
  },
};

const faqSchema = {
  type: "object",
  required: ["type", "items"],
  additionalProperties: false,
  properties: {
    type: { const: "faq" },
    title: { type: ["string", "null"] },
    titleHighlight: { type: ["string", "null"] },
    items: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["question", "answer"],
        properties: {
          question: { type: "string" },
          answer: { type: "string" },
        },
      },
    },
  },
};

const ctaSchema = {
  type: "object",
  required: ["type", "title", "ctaLabel"],
  additionalProperties: false,
  properties: {
    type: { const: "cta" },
    title: { type: "string" },
    titleHighlight: { type: ["string", "null"] },
    subtitle: { type: ["string", "null"] },
    ctaLabel: { type: "string" },
    ctaHref: { type: ["string", "null"] },
    videoHref: { type: ["string", "null"] },
  },
};

// Anthropic tool_use handles oneOf poorly — large oneOf payloads cause the
// model to emit only the first/required item. Instead: a permissive item
// schema that accepts any object with a `type` discriminator. We validate
// the discriminant + required fields per type post-hoc in JS (validateLandingPage).
const landingSectionSchema = {
  type: "object",
  required: ["type"],
  properties: {
    type: {
      type: "string",
      enum: [
        "hero",
        "intro",
        "feature-split",
        "logo-bar",
        "testimonials",
        "faq",
        "cta",
        "stats",
        "pain-points",
        "press-quotes",
        "customer-testimonials",
        "comparison-table",
        "steps",
        "icon-row",
        "related",
        "trust-badges",
        "tabs-frame",
        "cta-highlight",
        "comparison-frame",
        "pillar-frame",
        "highlight-frame",
        "feature-stacked",
        "value-proposition",
        "steps-rich",
        "raw",
      ],
    },
    // Common fields across variants — listed so the model knows what's available.
    title: { type: "string" },
    titleHighlight: { type: "string" },
    subtitle: { type: "string" },
    body: { type: "string" },
    primaryCta: {
      type: "object",
      properties: { label: { type: "string" }, href: { type: "string" } },
    },
    secondaryCta: {
      type: "object",
      properties: { label: { type: "string" }, href: { type: "string" } },
    },
    imageSrc: { type: "string" },
    imageAlt: { type: "string" },
    reversed: { type: "boolean" },
    bullets: { type: "array", items: { type: "string" } },
    headingLevel: { type: "integer", enum: [2, 3, 4] },
    subSections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          body: { type: "string" },
        },
      },
    },
    variant: { type: "string", enum: ["client", "press", "partner"] },
    logos: {
      type: "array",
      items: {
        type: "object",
        properties: { src: { type: "string" }, alt: { type: "string" } },
      },
    },
    testimonials: {
      type: "array",
      items: {
        type: "object",
        properties: {
          text: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          company: { type: "string" },
          avatarSrc: { type: "string" },
          linkedinUrl: { type: "string" },
          href: { type: "string" },
        },
      },
    },
    items: { type: "array" },
    ctaLabel: { type: "string" },
    ctaHref: { type: "string" },
    videoHref: { type: "string" },
    // Phase 1 schema extension : new section type fields
    tabs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          href: { type: "string" },
        },
      },
    },
    sticky: { type: "boolean" },
    titlePrefix: { type: "string" },
    titleSuffix: { type: "string" },
    emoji: { type: "string" },
    columns: { type: "integer", enum: [2, 3, 4, 5, 6] },
    pillars: {
      type: "array",
      items: {
        type: "object",
        properties: {
          iconName: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          example: { type: "string" },
          exampleLabel: { type: "string" },
        },
      },
    },
    titleGradient: { type: "string" },
    titleDark: { type: "string" },
    titleDarkPrefix: { type: "string" },
    listItems: { type: "array", items: { type: "string" } },
    steps: { type: "array" },
    tag: { type: "string" },
  },
};

export const landingPageJsonSchema = {
  type: "object",
  required: ["meta", "sections"],
  properties: {
    meta: {
      type: "object",
      required: ["title", "description"],
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        ogImage: { type: "string" },
      },
    },
    sections: {
      type: "array",
      minItems: 1,
      maxItems: 30,
      items: landingSectionSchema,
    },
  },
};

// ─── Blog article schema ────────────────────────────────────────────────────

const blogParagraphSchema = {
  type: "object",
  required: ["type", "html"],
  additionalProperties: false,
  properties: { type: { const: "paragraph" }, html: { type: "string" } },
};

const blogHeadingSchema = {
  type: "object",
  required: ["type", "level", "text", "id"],
  additionalProperties: false,
  properties: {
    type: { const: "heading" },
    level: { type: "integer", enum: [2, 3, 4, 5, 6] },
    text: { type: "string" },
    id: { type: "string" },
  },
};

const blogListSchema = {
  type: "object",
  required: ["type", "ordered", "items"],
  additionalProperties: false,
  properties: {
    type: { const: "list" },
    ordered: { type: "boolean" },
    items: { type: "array", minItems: 1, items: { type: "string" } },
  },
};

const blogFigureSchema = {
  type: "object",
  required: ["type", "src", "alt"],
  additionalProperties: false,
  properties: {
    type: { const: "figure" },
    src: { type: "string" },
    alt: { type: "string" },
    caption: { type: ["string", "null"] },
  },
};

const blogQuoteSchema = {
  type: "object",
  required: ["type", "text"],
  additionalProperties: false,
  properties: {
    type: { const: "quote" },
    text: { type: "string" },
    author: { type: ["string", "null"] },
    authorAvatar: { type: ["string", "null"] },
  },
};

const blogTableSchema = {
  type: "object",
  required: ["type", "headers", "rows"],
  additionalProperties: false,
  properties: {
    type: { const: "table" },
    headers: { type: "array", items: { type: "string" } },
    rows: { type: "array", items: { type: "array", items: { type: "string" } } },
  },
};

const blogCalloutSchema = {
  type: "object",
  required: ["type", "html"],
  additionalProperties: false,
  properties: {
    type: { const: "insight-callout" },
    html: { type: "string", minLength: 10 },
  },
};

const blogHubspotCtaSchema = {
  type: "object",
  required: ["type", "label", "href"],
  additionalProperties: false,
  properties: {
    type: { const: "hubspot-cta" },
    label: { type: "string" },
    href: { type: "string" },
  },
};

// Permissive blog block schema — same rationale as landings (oneOf pitfall).
const blogBlockSchema = {
  type: "object",
  required: ["type"],
  properties: {
    type: {
      type: "string",
      enum: [
        "paragraph",
        "heading",
        "list",
        "figure",
        "quote",
        "table",
        "insight-callout",
        "inline-cta",
        "hubspot-cta",
      ],
    },
    html: { type: "string" },
    level: { type: "integer", enum: [2, 3, 4, 5, 6] },
    text: { type: "string" },
    id: { type: "string" },
    ordered: { type: "boolean" },
    items: { type: "array", items: { type: "string" } },
    src: { type: "string" },
    alt: { type: "string" },
    caption: { type: "string" },
    author: { type: "string" },
    authorAvatar: { type: "string" },
    headers: { type: "array", items: { type: "string" } },
    rows: { type: "array", items: { type: "array", items: { type: "string" } } },
    label: { type: "string" },
    href: { type: "string" },
  },
};

export const blogArticleJsonSchema = {
  type: "object",
  required: ["meta", "blocks"],
  properties: {
    meta: {
      type: "object",
      required: ["title", "h1", "description"],
      properties: {
        title: { type: "string" },
        h1: { type: "string" },
        description: { type: "string" },
        publishedDate: { type: "string" },
        heroImage: {
          type: "object",
          properties: { src: { type: "string" }, alt: { type: "string" } },
        },
        author: {
          type: "object",
          properties: {
            name: { type: "string" },
            avatarSrc: { type: "string" },
            publishedDate: { type: "string" },
            category: { type: "string" },
          },
        },
      },
    },
    blocks: {
      type: "array",
      minItems: 1,
      maxItems: 200,
      items: blogBlockSchema,
    },
    faq: {
      type: "array",
      items: {
        type: "object",
        properties: { question: { type: "string" }, answer: { type: "string" } },
      },
    },
    related: {
      type: "array",
      items: {
        type: "object",
        properties: { label: { type: "string" }, href: { type: "string" } },
      },
    },
    toc: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          href: { type: "string" },
          // Heading depth — 2 for top-level sections, 3 for nested sub-sections.
          // Used by TocSidebar to indent and by scroll-spy to track active.
          level: { type: "integer", enum: [2, 3] },
        },
      },
    },
  },
};

// ─── Light validators (post-LLM, pre-write) ─────────────────────────────────

export function validateLandingPage(obj, slug, type) {
  const errs = [];
  if (!obj || typeof obj !== "object") errs.push("not an object");
  if (!obj.meta?.title) errs.push("meta.title missing");
  if (!obj.meta?.description) errs.push("meta.description missing");
  if (!Array.isArray(obj.sections) || obj.sections.length === 0) errs.push("sections empty");
  else {
    if (obj.sections[0]?.type !== "hero") errs.push("first section must be hero");
    for (const [i, s] of obj.sections.entries()) {
      if (!s.type) errs.push(`section[${i}] missing type`);
    }
  }
  return errs;
}

export function validateBlogArticle(obj, slug) {
  const errs = [];
  if (!obj || typeof obj !== "object") errs.push("not an object");
  if (!obj.meta?.title) errs.push("meta.title missing");
  if (!obj.meta?.h1) errs.push("meta.h1 missing");
  if (!obj.meta?.description) errs.push("meta.description missing");
  if (!Array.isArray(obj.blocks) || obj.blocks.length === 0) errs.push("blocks empty");
  return errs;
}

// ─── Extraction rules (system prompt content) ──────────────────────────────

export const LANDING_RULES = `You extract a typed LandingPage from rendered Webflow HTML.

EXTRACTION RULES (must follow strictly):

1. Extract ONLY content visually present in the rendered HTML body. Never invent
   or paraphrase missing content. If a section is empty, drop it.

2. Skip sections whose body is empty or contains only whitespace, zero-width
   characters (U+200B U+200C U+200D U+2060 U+FEFF), <br/>, or empty <p>.

3. Strip text matching CMS template instructions:
   - "Speaker avatar:" / "LINK_SPEAKER_PAGE" / "insert the link"
   - "change url of background-image"
   - "TODO" / "FIXME" markers
   Drop the containing block if it has no real content after stripping.

4. Decorative drop-caps : <em class="heading__pill">A</em>joutez or
   <em class="heading__pill">L'o</em>util belong to the next word — output
   "Ajoutez" / "L'outil", NEVER "A joutez" / "L'o util".

5. Word boundaries between adjacent inline tags must be preserved when they
   represent separate words: <strong>PPM</strong>pour → "PPM pour" (real word
   boundary). NEVER produce "PPMpour" / "enmultilingue" / similar.

6. Hero CTA fallback: if the source has no CTA, omit primaryCta. If only
   one CTA, omit secondaryCta. Preserve the exact href and label from source.

7. Hero imageSrc: reject decorative SVG patterns (icons, arrows, logos,
   check-circles, ellipses, "icon-*", "logo-*"). Only keep product mockups,
   dashboards, hero illustrations.

8. H2/H3 headings that DUPLICATE the H1 title (Webflow CMS quirk) must be
   dropped — they create duplicate-content noise.

9. H2 sections that have no body, no subSections, no image, no bullets, no
   meaningful child content must be dropped — they render as visible empty
   boxes.

10. Preserve French apostrophes : "L'outil" not "L' outil". Em-dashes,
    quotation marks, accented chars must round-trip exactly.

11. Hero is REQUIRED and must be the first section. If you cannot find an H1
    + hero block, throw — do not fabricate one.

12. \`body\` fields contain inline HTML : <strong>, <em>, <a>, <p>, <br/>,
    <ul>/<ol>/<li> are allowed. Strip any other tags. Strip inline event
    handlers (onclick, onmouseover) and style attributes.

13. Sections to extract (use the exact discriminator value):
    - "hero"            → first section, H1 + subtitle + CTAs + image
    - "intro"           → centered text block (heading + body, optional subSections)
    - "feature-split"   → image + text side-by-side block (.container__features__section)
    - "logo-bar"        → row of customer/press logos (.logo_customer / .press__logo)
    - "testimonials"    → LinkedIn-style testimonial cards
    - "faq"             → accordion (.wrapper__faq)
    - "cta"             → closing call-to-action banner (.section--call)
    Other section types in the schema may exist but are rare — only emit them
    if you see clear DOM evidence.

14. ANTI-FRAGMENTATION (R5 — critical Solutions). Before emitting sections,
    COUNT visible H2 elements in the article body. The number of top-level
    sections (intro / feature-split / value-proposition / steps / etc.) MUST
    NOT exceed (H2 count + 3). If you have more candidate sections, MERGE
    consecutive H3/H4 (< 200 words) under their nearest H2 into a single
    feature-split with subSections[] OR an intro with subSections[]. Bug to
    avoid: outil-ppm rebuild was 31 sections vs live 8 — that is a fail.

15. HERO LP eyebrow + trust strip (R1). For /lp/* pages, hero MUST set:
    - tag = visible <span class="tag-*">, <div class="hero__pill">, or
      uppercase eyebrow strip directly above the H1 (e.g. "PPM",
      "Capacity Planning"). When present in source, REQUIRED.
    - bullets = 3-6 trust items extracted from the small grey strip below
      the H1 + subtitle ("Sécurité au top", "Made in France", "Support FR",
      etc.). Look for ".trust-strip li", check-icon rows, or short label
      pills. When 3+ trust items visible, REQUIRED.
    - imageSrc = product mockup ≥ 800×500 visible inside the hero block.

16. EYEBROW & TAGS for feature-split (R24, R26). Preserve tag/eyebrow strips
    above feature-split titles : <span class="eyebrow">, <div class="tag--*">,
    or short uppercase pills inside the section header → feature-split.tag.
    Preserve <strong> / <em> / <span class="text-orange"> highlights inline
    inside body fields (HTML preserved).

17. CTA UNIQUE per page (R40, N1). Emit EXACTLY 1 orphan "cta" or
    "cta-highlight" section — the page's outro before the footer. ALL
    other CTA buttons found inside body sections → put them on
    feature-split.primaryCta. If you see two "Réserver une démo" buttons
    at different points of the page, the second one is inline, NOT a new
    cta section.

18. KPI ZERO HALLUCINATION (R11). For "stats" / "highlight-frame" sections,
    every items[].value MUST appear verbatim in the source HTML within
    100 chars of its label. If you see an icon WITHOUT an adjacent number
    in the HTML, do NOT invent one : either omit the section entirely or
    set items[].value = "". Past incident: équipes-comite-direction had
    "70%/1h/120j/4×" entirely fabricated — banned.

19. SECTIONS THAT EXIST IN LIVE (R13, R38). If the source has a section
    "Sécurité au top" (or similar trust title) with 4 trust cards/icons,
    you MUST emit it as a "trust-badges" section. If the source has a
    composite image+arrow narrative, emit feature-split with
    imageSize="narrow" + subSections. Do not silently drop visible sections.

20. STRICT IMAGE BG COLOR for feature-split (R17). When the source feature
    has a colored background panel behind the illustration, set imageSize
    based on the panel's primary color : yellow / lavender / blue → keep
    "narrow" (33/67) so the editorial layout matches live.
`;

export const BLOG_RULES = `You extract a typed BlogArticleV2 from rendered Webflow HTML of an airsaas.io blog post.

EXTRACTION RULES (must follow strictly):

1. Extract content from the article body container in priority order:
   div.container__article__integrations__text, div.blog-post-body, div.rich-text,
   div.post-body, then the outermost <article>. Pick the first one that has substantial content.

2. \`meta.title\` = <title> tag. \`meta.description\` = <meta name="description">.
   \`meta.h1\` = first H1 in the body. \`meta.heroImage.src\` = <img class="post-img-blog">
   or first hero figure. \`meta.author\` = pair of <.author__text> divs (label + value).

3. Block extraction rules:
   - Each <h2>/<h3>/<h4>/<h5>/<h6> → "heading" block with proper level + slugified id
   - Each <p> → "paragraph" block (preserve <strong>, <em>, <a>, <br>)
   - Each <ul>/<ol> → "list" block (items as inline HTML)
   - Each <figure>/<img> → "figure" block (skip decorative icons)
   - Each <blockquote> → "quote" block
   - Each <table> → "table" block
   - .citation-blog / .a-retenir / .callout / .insight / .highlight divs →
     "insight-callout" block
   - HubSpot CTA embeds (.hs-cta-embed, .hbspt-cta) → "hubspot-cta" block

4. Drop callouts whose content matches the CMS template "Speaker avatar:" /
   "LINK_SPEAKER_PAGE" / "insert the link" / "change url of background-image".
   These are unfilled Webflow editor instructions, NOT real content.

5. Extract trailing sections separately:
   - .wrapper__faq blocks → \`faq\` array (question + answer)
   - "Pour aller plus loin" section's <ul>/<a> → \`related\` array (label + href)
   - .fs-toc-element / .summary-link list → \`toc\` array (label + href + level)
     where level is 2 for top-level sections, 3 for nested. Infer level from
     the source HTML class (.toc-h2 / .toc-h3) OR by matching the toc anchor
     to the heading block in the body and reading its level.

6. Word boundary rules : same as landings (no PPMpour / enmultilingue / drop-cap
   bugs). Preserve French apostrophes.

7. Heading IDs : slugify the text (lowercase, ASCII, hyphens, no diacritics).
   Truncate to 80 chars max. If empty, fall back to "section".

8. Skip the article entirely (return skip:true with a reason) if:
   - The body container is empty or unfindable
   - The page is a 404 / redirect placeholder
   - The H1 is absent

9. STRUCTURED BLOCKQUOTES (R18). EVERY <blockquote> in the body MUST emit
   a "quote" block (variant pull) — never a "paragraph". Capture the quote
   text and the optional author attribution (<cite> or following <p class="author">).

10. INSIGHT-CALLOUTS (R20). EVERY .a-retenir / .citation-blog / .insight /
   .callout / .highlight panel, OR <aside> with a colored background, OR a
   visible "À retenir" / "À noter" / "Bon à savoir" / "En résumé" panel
   MUST emit an "insight-callout" block. Preserve inner HTML (<ul>/<li>
   bullets when present) and set label="À retenir" when missing.

11. STRUCTURED TABLES (R21). EVERY <table> MUST emit a "table" block with
   headers (string[]) + rows (string[][]). Preserve the 2D structure —
   never flatten to a paragraph. Cap to 6 cols × 20 rows max.

12. INLINE CTAs in body (R22). Links inside the body that visually look
   like buttons (class="btn-*", class="cta-*", inside <div class="cta-inline">,
   or <a class="button">) MUST emit an "inline-cta" block (label + href),
   NOT a paragraph. Standalone .hs-cta-embed / .hbspt-cta blocks remain
   "hubspot-cta" (rule 3).
`;
