# DS Components — Rules Reference

**Auto-generated from JSDoc contracts in source files.** Regenerate via `python3 scripts/generate-ds-reference.py` (or similar — this was generated once).

This is the authoritative index of **what each component does, when to use it, when NOT to, and what breaks it**. Read the entry for any component before you modify it or create a similar one.

Components are grouped into:
- **Primitives (`ui/`)** — atoms and small composables (buttons, cards, badges, typography, icons, utilities)
- **Section Frames (`sections/`)** — full-width page sections (Hero, CtaFrame, FeatureFrame, etc.)

Every entry shows its `@purpose` / `@useWhen` / `@dontUse` / `@limits` / `@forbidden` straight from the source — those are the enforceable rules.

---

## Decision: where does my new component live?

1. **Does an existing component fit?** Look at the table below first.
2. **Can an existing component accept a new prop or variant?** Extend it. Cheapest path.
3. **Is the pattern repeated ≥2 times across pages?** Promote to `library-design/`. Otherwise keep inline in the page file.
4. **Is it a small atom (card, badge, pill)?** → `ui/`
   **Is it a full-width section (Hero-style, CtaFrame-style)?** → `sections/`

---

## 📇 Index — all DS components at a glance

### Primitives (`ui/`)

| Component | Purpose (1-line) |
|---|---|
| `<AnimateOnScroll>` | Wraps content in an intersection-observer driven entrance animation that replays on scroll. |
| `<BlogAuthorTag>` | Author attribution block for blog articles: "Publié par" label + green pill with avatar + author name + "dans [catego… |
| `<BlogCard>` | Single blog article preview card — thumbnail, publication date, title, excerpt, and a compact multi-author byline. Th… |
| `<Button>` | Canonical interactive element for all CTAs, links-as-buttons, and actions. Renders `<a>` if `href` is provided, `<but… |
| `<CardCta>` | Minimal card with a short gradient title, a one-line description, and a primary CTA. Usually rendered as children of … |
| `<CheckList>` | Vertical list where each item is prefixed by a green gradient circle-check icon. |
| `<ClientCard>` | Two-section card showcasing a client: avatar + name + role on top, company name + metadata rows on a tinted bottom se… |
| `<EllipseBackground>` | Decorative thick-bordered circle used as a soft halo behind hero illustrations and key sections. |
| `<EmptyState>` | Friendly placeholder rendered when a collection (search results, filter output, list of items) has zero entries. |
| `<ErrorBoundary>` | React class component that catches render-time errors in its subtree and renders a branded fallback instead of a cras… |
| `<FeatureCard>` | Card used to display a big metric / short feature statement with icon, title (often a gradient number or short phrase… |
| `<Float>` | Continuously bobs its child up and down with a subtle looping animation. |
| `<FloatingCard>` | Small rounded white card with soft elevation, used as a decorative satellite around hero illustrations or as a conten… |
| `<GradientBackground>` | Absolutely positioned blurred gradient layer used as section ambiance. |
| `<GradientText>` | Apply a brand gradient to a text fragment (inline span). Replaces scattered `style={{ backgroundImage, WebkitBackgrou… |
| `<Heading>` | Canonical headline component for all H1 / H2 / H3 / H4 in the product. |
| `<IconBadge>` | Circular badge hosting a large duotone icon — the main visual anchor in icon-led sections. |
| `<IconIllustration>` | Stylised icon with a drop-shadow offset and a solid ellipse "base" underneath — AirSaas's signature illustrated icon … |
| `<IllustrationFrame>` | Rounded frame that wraps a hero / section / blog-body illustration with consistent padding, border, and radius. |
| `<ListCard>` | Numbered card with a big gradient number + short description. Used inside <ComparisonFrame> for "avec/sans" lists or … |
| `<ListEmphasized>` | Horizontal row of short text blocks separated by an orange left border — used to highlight 2–4 key points side-by-side. |
| `<ListInline>` | Single inline item (icon + text) — the row primitive behind <CheckList>, <TableOfContentsFrame>, and blog body bullet… |
| `<LogosBar>` | Horizontal bar of grayscale customer/partner logos with a leading label and divider. |
| `<Navbar>` | Top-of-page navigation. Logo + links (flat or with dropdown) + optional flag / locale / login / CTA. |
| `<NavbarDropdown>` | Floating menu panel containing a vertical list of icon + title + subtitle links — the reusable body of navbar mega-me… |
| `<Quote>` | Italic citation block in a lavender-bordered card with a decorative quote icon and optional author + avatar. |
| `<SectionHeading>` | Standalone centered H2 + subtitle block used to introduce a section. |
| `<Skeleton>` | Placeholder block that renders while async content is loading. Uses a subtle `secondary-5` bg + pulse animation to si… |
| `<Slider>` | Minimal image carousel with prev/next chevron buttons and a lavender top-framed illustration well. |
| `<TableFrame>` | Responsive comparison / data table with a primary-blue header row and soft lavender body cells. Scrolls horizontally … |
| `<Tag>` | Small inline pill/badge used for categories, status indicators, eyebrow labels, and filter chips. |
| `<TestimonialCard>` | Display a customer testimonial: quote + pill with name/role/avatar, optional LinkedIn link, optional collapsible "rea… |
| `<TestimonialCompanyCard>` | Company-facing testimonial: quote + company logo, framed by an asymmetric primary border. |
| `<Text>` | Canonical body/paragraph component. Always use this instead of raw <p>. |

### Section Frames (`sections/`)

| Component | Purpose (1-line) |
|---|---|
| `<BlogArticleBody>` | Outer wrapper for the rich-text body of a blog article — white background, responsive side padding, 91.25rem inner ma… |
| `<BlogCollectionFrame>` | Full-width section introducing a blog content collection — H2 title + optional subtitle + optional collection-level a… |
| `<BlogHero>` | Article header for a single blog post: navbar + "Le Blog" tag + article title + author attribution (<BlogAuthorTag>) … |
| `<ClientsFrame>` | Section wrapper for a large grid of <ClientCard> items — avatar + name + role + company + metadata rows. Dense social… |
| `<ComparisonDualFrame>` | "Avec / sans" dual-column comparison: a row of numbered cards per column, each column led by a colored pill label. |
| `<ComparisonFrame>` | "Avec / sans" style numbered-list section showing pain points OR gains. |
| `<ComparisonTableFrame>` | Feature comparison grid — one card per row, one wide "feature" cell on the left, N narrower value cells on the right … |
| `<CtaFrame>` | End-of-page conversion block: large gradient heading + subtitle + 2 CTA cards. |
| `<CtaHighlightFrame>` | Full-width closing CTA section — large 3-part tri-gradient H2 (dark / primary / dark) + a centered white card contain… |
| `<FaqFrame>` | Expandable FAQ section with a highlighted title and accordion items. |
| `<FeatureFrame>` | Single feature section: title + subtitle + checklist / rich content + optional image (side-by-side or stacked) + opti… |
| `<FeatureSectionStacked>` | Centered title + subtitle + orange-bordered item list, with an illustration image that bleeds from the bottom into th… |
| `<Footer>` | Page footer — 4 columns of navigation links + floating logo + copyright card. |
| `<Hero>` | First section of a page: navbar + title + subtitle + CTAs + illustration. |
| `<HighlightFrame>` | Alternating-zigzag vertically stacked cards, each with a big green gradient number outside the card (left on odd, rig… |
| `<IconRowFrame>` | Horizontal row of icon + label pairs (integrations, tech stack, trusted-by logos rendered as iconography). Icons sit … |
| `<PillarFrame>` | Grid of "pillar" cards — each with a large icon illustration, uppercase primary title, description, and an optional e… |
| `<RelatedArticlesFrame>` | "Further reading" block at the end of a blog article — centered primary-gradient title + white rounded card listing o… |
| `<RelatedSolutionsFrame>` | Cross-sell grid — 3 image-first cards each linking to a related solution or product. Rendered at the bottom (or top) … |
| `<SliderFrame>` | Centered title + subtitle + interactive screenshot carousel. |
| `<StepsFrame>` | Horizontal row of numbered sequential steps — each step has a large primary-gradient number, an icon, a short title, … |
| `<TableOfContentsFrame>` | Article-level table of contents — centered primary-gradient title + white rounded card listing anchor links to each a… |
| `<TestimonialsFrame>` | Section wrapper for testimonial cards: gradient heading + 3-col grid. |
| `<ValuePropositionFrame>` | Section with title + subtitle + a 2-to-6-column grid of child cards (usually <FeatureCard> or custom). |

---

## 🧱 Primitives — full rules

### `<AnimateOnScroll>`

📄 [`src/components/library-design/ui/AnimateOnScroll.tsx`](src/components/library-design/ui/AnimateOnScroll.tsx)

**Purpose** — Wraps content in an intersection-observer driven entrance animation that replays on scroll.
**Use when** — Revealing hero headlines, section headings, cards, or any block that should fade/slide in as it enters the viewport.
**Don't use** — For critical above-the-fold content that must render instantly — the element starts hidden (opacity-0). Also skip for continuous loops — use <Float> instead.

**Limits:**
- threshold: 0–1 (fraction of element visible before triggering)
- delay / duration: milliseconds
- stagger: ms between child reveals; children must be wrapped in <AnimateChild>

**Forbidden:**
- Do NOT nest AnimateOnScroll inside another AnimateOnScroll — use `stagger` + <AnimateChild> instead
- Do NOT override opacity/transform via `className` — it will fight the animation state

---

### `<BlogAuthorTag>`

📄 [`src/components/library-design/ui/BlogAuthorTag.tsx`](src/components/library-design/ui/BlogAuthorTag.tsx)
🎨 Figma `node-id 303-1655`

**Purpose** — Author attribution block for blog articles: "Publié par" label + green pill with avatar + author name + "dans [category]" link + publication date.
**Use when** — Blog article heros (<BlogHero>), blog card bylines, author attribution strips. Anywhere a blog post needs to surface author + category + date as a grouped meta block.
**Don't use** — For testimonial attribution (use <TestimonialCard>). For client / team cards (use <ClientCard>). For a plain metadata row with no author pill (use raw <Text> blocks).

**Limits:**
- name: max 40 chars (longer breaks the pill on 2 lines)
- categoryLabel: max 40 chars
- publishedDate: caller passes a pre-formatted string (i18n done upstream)
- avatarAlt: required if avatarSrc is provided; "" allowed for decorative

**Forbidden:**
- Do NOT pass className with bg / text color / font / rounding overrides — the green pill + grey meta colors are part of the component contract
- Do NOT nest this inside <Tag> — this IS a composed tag+meta block
- Do NOT pass a hex color for the pill; the pill uses --color-success-text

---

### `<BlogCard>`

📄 [`src/components/library-design/ui/BlogCard.tsx`](src/components/library-design/ui/BlogCard.tsx)
🎨 Figma `node-id 312-2107 (inside 312-2093)`

**Purpose** — Single blog article preview card — thumbnail, publication date, title, excerpt, and a compact multi-author byline. The entire card surfaces the article and the title acts as the primary link; an optional category link (e.g. a newsletter / section name) stays independently clickable.
**Use when** — Inside <BlogCollectionFrame> for blog index / listing pages, the homepage "featured articles" section, or any CMS-driven content grid that lists thumbnails + excerpts.
**Don't use** — For testimonial / client logos (use <TestimonialCard> / <ClientCard>). For author attribution inside an article hero (use <BlogAuthorTag>). For non-article content preview (use <CardCta>).

**Limits:**
- title: max 120 chars (H4 wraps cleanly up to ~2 lines at that length)
- excerpt: max 200 chars (3 lines at --text-paragraph)
- thumbnailAlt: required. Empty string `""` only for purely decorative thumbnails (rare — blog thumbnails should describe)
- authors: 1–4 items. Max 3 avatars shown (stacked); overflow collapses to a "+N autres" label driven by `authorsMoreLabel`
- authors[i].name: max 40 chars
- categoryLabel: max 60 chars (if provided)

**Forbidden:**
- Do NOT pass className that overrides bg / border / padding / rounded — the white card chrome is part of the contract
- Do NOT nest <BlogCard> inside another card (use plain markup for inline previews)
- Do NOT hardcode any locale copy ("Publié par", "dans", "autres") — all labels are locale-driven via props
- Do NOT omit `authors` — empty byline is unsupported (use a dedicated "anonymous" placeholder on the consumer side if truly needed)

---

### `<Button>`

📄 [`src/components/library-design/ui/Button.tsx`](src/components/library-design/ui/Button.tsx)
🎨 Figma `node-id 117-12841`

**Purpose** — Canonical interactive element for all CTAs, links-as-buttons, and actions. Renders `<a>` if `href` is provided, `<button>` otherwise.
**Use when** — Any actionable element — primary CTA, secondary CTA, quiet link-button.
**Don't use** — For navigation inside a text paragraph (use an inline `<a>` with text-primary instead). For toggle chips / filters (use `<Tag>` if non-interactive).

**Limits:**
- children label: max 30 chars (longer breaks responsive layouts on mobile)
- icon + label combined: keep under ~24 chars

**Forbidden:**
- Do NOT pass className overriding color / padding / fontSize — use `variant` + `size`
- Do NOT pass `disabled` on an `<a>`-rendered button (use `href={undefined}` instead)

---

### `<CardCta>`

📄 [`src/components/library-design/ui/CardCta.tsx`](src/components/library-design/ui/CardCta.tsx)

**Purpose** — Minimal card with a short gradient title, a one-line description, and a primary CTA. Usually rendered as children of `<CtaFrame>`.
**Use when** — Offering a quick CTA choice (e.g. "Démo" / "Newsletter" / "Contact").
**Don't use** — For a feature/benefit card (use `<FeatureCard>`).

**Limits:**
- title: max 30 chars (Figma H4)
- description: max 100 chars (one-line paragraph)
- ctaLabel: max 18 chars
- mediaThumbnail: optional landscape 16/9 image rendered above the title — use for video replay teasers, media cards, etc.

**Forbidden:**
- Do NOT pass typography className overrides
- Do NOT omit mediaThumbnail.alt (required when prop is used; pass `""` for decorative)

---

### `<CheckList>`

📄 [`src/components/library-design/ui/CheckList.tsx`](src/components/library-design/ui/CheckList.tsx)

**Purpose** — Vertical list where each item is prefixed by a green gradient circle-check icon.
**Use when** — Standalone bullet lists of benefits/features outside a FeatureFrame. Visually matches the checklist used inside <FeatureFrame>.
**Don't use** — Inside a FeatureFrame — the frame already renders its own checklist from `checklistItems`. For a single inline check item, use <ListInline> directly.

**Limits:**
- items: plain strings or rich ReactNode (bold, links, etc.)

---

### `<ClientCard>`

📄 [`src/components/library-design/ui/ClientCard.tsx`](src/components/library-design/ui/ClientCard.tsx)

**Purpose** — Two-section card showcasing a client: avatar + name + role on top, company name + metadata rows on a tinted bottom section.
**Use when** — Grids of anonymous/public client cards (e.g. "Ils parlent de nous").
**Don't use** — For a testimonial with a quote (use <TestimonialCard>).

**Limits:**
- name: max 30 chars (wraps past that)
- jobTitle: max 45 chars
- companyName: max 30 chars
- infoRows: 2–5 items

**Forbidden:**
- Do NOT pass className with typography / color overrides — use the props

---

### `<EllipseBackground>`

📄 [`src/components/library-design/ui/EllipseBackground.tsx`](src/components/library-design/ui/EllipseBackground.tsx)

**Purpose** — Decorative thick-bordered circle used as a soft halo behind hero illustrations and key sections.
**Use when** — Hero sections or landing blocks that need a large primary-tinted accent ring behind the content.
**Don't use** — As a content container — it's purely decorative (`aria-hidden`) and positioned absolutely. For actual circles around content, use a bordered <div>.

**Limits:**
- size: pixel value (default 1250) — render scales from this

---

### `<EmptyState>`

📄 [`src/components/library-design/ui/EmptyState.tsx`](src/components/library-design/ui/EmptyState.tsx)

**Purpose** — Friendly placeholder rendered when a collection (search results, filter output, list of items) has zero entries.
**Use when** — Client-side filtering returns no results; a blog tag has no posts; a search query finds nothing.
**Don't use** — For loading (use <Skeleton>). For errors (use <ErrorBoundary> or pass your own error UI). For static content where empty shouldn't happen in prod.

**Limits:**
- title: max 60 chars
- description: max 240 chars
- ctaLabel: max 24 chars (when provided, both ctaLabel + ctaHref|onClick required)

**Forbidden:**
- Do NOT use as a generic "page not found" — use a dedicated 404 page
- Do NOT use as a loading placeholder — use <Skeleton>

---

### `<ErrorBoundary>`

📄 [`src/components/library-design/ui/ErrorBoundary.tsx`](src/components/library-design/ui/ErrorBoundary.tsx)

**Purpose** — React class component that catches render-time errors in its subtree and renders a branded fallback instead of a crashed page.
**Use when** — Wrapping dynamic / client-side features (search, forms, widgets) that could throw at render. One per isolated feature, not page-wide (page-wide is Next.js `error.tsx`).
**Don't use** — For async errors (catch them in the handler, not via boundary). For 404s (use Next.js `not-found.tsx`). For form validation (use inline field errors).

**Limits:**
- fallback: optional custom ReactNode; if absent, a default branded error block with a "Rafraîchir" CTA is rendered

**Forbidden:**
- Do NOT use as the root page fallback — Next.js `error.tsx` owns that

---

### `<FeatureCard>`

📄 [`src/components/library-design/ui/FeatureCard.tsx`](src/components/library-design/ui/FeatureCard.tsx)

**Purpose** — Card used to display a big metric / short feature statement with icon, title (often a gradient number or short phrase), optional subtitle, and a description paragraph.
**Use when** — Showing 3–6 metrics / features in a grid (usually inside `<ValuePropositionFrame>`).
**Don't use** — For a testimonial (use `<TestimonialCard>`), or a full feature section with image (use `<FeatureFrame>`).

**Limits:**
- title: max 12 chars (Figma H4, 40px — breaks past ~1 line)
- subtitle: max 20 chars (Text lg, ~28px — optional)
- description: max 220 chars (Text md paragraph)

**Forbidden:**
- Do NOT pass className with typography overrides — use Text / Heading props
- Do NOT mix different `gradient` colors in the same grid (visual noise)

---

### `<Float>`

📄 [`src/components/library-design/ui/Float.tsx`](src/components/library-design/ui/Float.tsx)

**Purpose** — Continuously bobs its child up and down with a subtle looping animation.
**Use when** — Floating decorative cards, icons, or illustrations around a hero (e.g. <FloatingCard> satellites).
**Don't use** — For one-shot entrance animations — use <AnimateOnScroll>. For critical UI that needs a stable position, skip entirely.

**Limits:**
- variant: 1 | 2 | 3 (different keyframes — pick different variants to desync neighbouring floats)
- duration / delay: seconds

---

### `<FloatingCard>`

📄 [`src/components/library-design/ui/FloatingCard.tsx`](src/components/library-design/ui/FloatingCard.tsx)

**Purpose** — Small rounded white card with soft elevation, used as a decorative satellite around hero illustrations or as a content-bearing pill (Footer copyright).
**Use when** — Floating mini-cards that orbit a hero visual (KPI snippets, status pills, feature teasers — typically wrapped in <Float>). Also as a standalone content pill when the elevated white chrome is the desired affordance (pass `decorative={false}`).
**Don't use** — As a large content card with headings + body — use <FeatureCard> or a section-level card for that. For plain cards without shadow, use inline markup.

**Limits:**
- children: optional — when omitted, a placeholder (icon + 2 skeleton bars) renders
- icon: only used by the placeholder; ignored when `children` is provided
- decorative: true (default — aria-hidden + pointer-events-none, so the card never obstructs reading / interaction with the text underneath) | false (real content — announced by screen readers and keeps pointer events)

**Forbidden:**
- Do NOT pass `decorative={true}` when the card contains real text the user needs to read or select (aria-hidden hides it from screen readers)
- Do NOT rely on `decorative={true}` cards for click / hover interactions — they have pointer-events-none

---

### `<GradientBackground>`

📄 [`src/components/library-design/ui/GradientBackground.tsx`](src/components/library-design/ui/GradientBackground.tsx)

**Purpose** — Absolutely positioned blurred gradient layer used as section ambiance.
**Use when** — Hero backgrounds ("hero" / "hero-dark"), CTA bands ("cta"), or comparison sections ("comparison"). Place inside a `relative` parent.
**Don't use** — As a card or content background — it's `aria-hidden`, blurred, and absolutely positioned. For solid fills, use Tailwind bg-* classes.

**Limits:**
- variant: "hero" | "hero-dark" | "blog-hero" | "cta" | "comparison" — each has a fixed gradient + positioning

---

### `<GradientText>`

📄 [`src/components/library-design/ui/GradientText.tsx`](src/components/library-design/ui/GradientText.tsx)

**Purpose** — Apply a brand gradient to a text fragment (inline span). Replaces scattered `style={{ backgroundImage, WebkitBackgroundClip }}` blocks.
**Use when** — Emphasizing a word or phrase with a brand gradient inside a `<Heading>`, `<Text>`, or any inline context. NOT a headline by itself.
**Don't use** — As a full headline — use `<Heading gradient="primary">` instead.

**Limits:**
- text: keep short (1–10 words). Long gradient runs hurt readability.

**Forbidden:**
- Do NOT override color / background — use the `gradient` prop
- Do NOT apply to block-level content; this is inline only

---

### `<Heading>`

📄 [`src/components/library-design/ui/Heading.tsx`](src/components/library-design/ui/Heading.tsx)
🎨 Figma `node-id 115-12821`

**Purpose** — Canonical headline component for all H1 / H2 / H3 / H4 in the product.
**Use when** — Any headline on a page. Always prefer this over raw <h1-h4>.
**Don't use** — Inside body copy — use <Text> with `font-bold` if you need emphasis.

**Limits:**
- level 1: max ~40 chars on 1 line (clamp 40 → 95px)
- level 2: max ~60 chars on 1 line (clamp 32 → 72px)
- level 3: max ~60 chars on 1 line (clamp 24 → 40px — aligned Figma spec)
- level 4: max ~80 chars on 1 line (clamp 24 → 40px)

**Forbidden:**
- Do NOT pass fontSize / fontWeight via `className` — use `level`
- Do NOT override font-family — Product Sans only (enforced in globals.css)
- Do NOT use `gradient` on level 4 (by design: body-adjacent headings stay solid)

---

### `<IconBadge>`

📄 [`src/components/library-design/ui/IconBadge.tsx`](src/components/library-design/ui/IconBadge.tsx)

**Purpose** — Circular badge hosting a large duotone icon — the main visual anchor in icon-led sections.
**Use when** — Inside <IconRowFrame>, feature grids, or anywhere a headline is introduced by a prominent circular icon.
**Don't use** — For small inline icons (list bullets, button icons) — use <ListInline> or raw icon components. For sharp-cornered icon tiles, use <IconIllustration>.

**Limits:**
- variant: "light" (primary-10 bg, primary-40 icon) | "solid" (translucent white on dark sections)
- size: "md" (5rem) | "lg" (6.5rem)

---

### `<IconIllustration>`

📄 [`src/components/library-design/ui/IconIllustration.tsx`](src/components/library-design/ui/IconIllustration.tsx)

**Purpose** — Stylised icon with a drop-shadow offset and a solid ellipse "base" underneath — AirSaas's signature illustrated icon treatment.
**Use when** — Section-level iconography that needs more presence than a flat glyph (feature grids, landing hero highlights, <IconRowFrame>).
**Don't use** — For plain circular badges — use <IconBadge>. For small inline icons, use the raw icon component directly.

**Limits:**
- size: "sm" | "md" | "lg" — drives container, font-size, and ellipse proportions
- variant: "dark" (primary icon on light bg) | "light" (white icon with primary glow, for dark sections)

---

### `<IllustrationFrame>`

📄 [`src/components/library-design/ui/IllustrationFrame.tsx`](src/components/library-design/ui/IllustrationFrame.tsx)
🎨 Figma `node-id 303-1146 (warm tone — Blog body image well)`

**Purpose** — Rounded frame that wraps a hero / section / blog-body illustration with consistent padding, border, and radius.
**Use when** — `tone="neutral"` — hero split visuals, feature screenshots, any product illustration with the AirSaas "glass" frame. `tone="warm"` — editorial images inside a blog article body (BlogArticleBody), where the pale prevention-10 well frames the visual against the white article background.
**Don't use** — For decorative floating cards — use <FloatingCard>. For plain images without any frame chrome, use a raw <img>.

**Limits:**
- shape: "open-bottom" (default — rounded top, bleeds into next section) | "contained" (all 4 corners rounded, standalone). Ignored when tone="warm" (always contained).
- tone: "neutral" (default — glass) | "warm" (prevention-10 well)
- alt: empty string marks the image as decorative (`aria-hidden`)

**Forbidden:**
- Do NOT pass className that overrides bg / border / padding — the frame chrome is part of the tone contract
- Do NOT combine `tone="warm"` with `shape="open-bottom"` — warm frames are always contained

---

### `<ListCard>`

📄 [`src/components/library-design/ui/ListCard.tsx`](src/components/library-design/ui/ListCard.tsx)

**Purpose** — Numbered card with a big gradient number + short description. Used inside <ComparisonFrame> for "avec/sans" lists or similar numbered lists.
**Use when** — Showing 3–7 numbered items where the number is the hero of each row.
**Don't use** — For simple bullet lists (use <ListInline> or <ListEmphasized>).

**Limits:**
- value: max 2 digits (styles go big — 1–2 digits / 4.8rem)
- children text: max 220 chars

**Forbidden:**
- Do NOT pass className with typography overrides

---

### `<ListEmphasized>`

📄 [`src/components/library-design/ui/ListEmphasized.tsx`](src/components/library-design/ui/ListEmphasized.tsx)

**Purpose** — Horizontal row of short text blocks separated by an orange left border — used to highlight 2–4 key points side-by-side.
**Use when** — Section intros that list a few emphasised takeaways (e.g. "3 bénéfices", short pillar statements) under a heading.
**Don't use** — For long bulleted content — use <CheckList>. For vertical stacks with checkmarks, use <CheckList>.

**Limits:**
- items: 2–4 strings recommended (layout wraps column → row at md breakpoint)

---

### `<ListInline>`

📄 [`src/components/library-design/ui/ListInline.tsx`](src/components/library-design/ui/ListInline.tsx)

**Purpose** — Single inline item (icon + text) — the row primitive behind <CheckList>, <TableOfContentsFrame>, and blog body bullet lists.
**Use when** — One check-prefixed line inside rich content, or a vertical bullet list where each item shares the same preset bullet. Pass `bullet="circle-primary"` for blog body lists (primary outlined ring), default `"check-green"` for feature lists.
**Don't use** — For multi-item vertical lists of features — use <CheckList> (which composes this under the hood with the green bullet). For anchor-link tables of contents, use <TableOfContentsFrame>.

**Limits:**
- bullet: "check-green" (default, green gradient check — feature / benefit lists) | "circle-primary" (outlined primary-60 ring — blog body lists)
- icon: optional custom node; overrides `bullet` when provided

**Forbidden:**
- Do NOT pass className with font-size / color overrides on the text — the font-light + foreground color is part of the contract

---

### `<LogosBar>`

📄 [`src/components/library-design/ui/LogosBar.tsx`](src/components/library-design/ui/LogosBar.tsx)

**Purpose** — Horizontal bar of grayscale customer/partner logos with a leading label and divider.
**Use when** — Social-proof strip under a hero ("Ils gèrent leur capacité avec AirSaas") or above/below a CTA section.
**Don't use** — As a full case-studies section — use a dedicated logo grid or testimonials section. For a single featured logo, use a plain <img>.

**Limits:**
- logos: array of { src, alt, width?, height? } — rendered grayscale at 70% opacity
- label: optional — if omitted, no leading label is rendered. Pass a localized string from CMS / i18n.

---

### `<Navbar>`

📄 [`src/components/library-design/ui/Navbar.tsx`](src/components/library-design/ui/Navbar.tsx)
🎨 Figma `node-id 123-55815`

**Purpose** — Top-of-page navigation. Logo + links (flat or with dropdown) + optional flag / locale / login / CTA.
**Use when** — On every marketing / product page as the first interactive element. Mount inside a `<Hero>` so it picks up the hero background gradient.
**Don't use** — For in-app chrome / admin layouts — build a dedicated component.

**Limits:**
- items: 2–9 top-level items (past that the nav overflows on desktop)
- dropdownItems per menu: 2–10
- ctaLabel: max 24 chars
- loginLabel: max 12 chars

**Forbidden:**
- Do NOT hardcode text inside the Navbar file — all copy comes from props (callers pass translated strings via next-intl / CMS)
- Do NOT override typography / color via className — extend the DS if needed
- Do NOT pass an image `<img>` as `logo` — use an inline SVG so it adopts currentColor and scales cleanly

---

### `<NavbarDropdown>`

📄 [`src/components/library-design/ui/NavbarDropdown.tsx`](src/components/library-design/ui/NavbarDropdown.tsx)

**Purpose** — Floating menu panel containing a vertical list of icon + title + subtitle links — the reusable body of navbar mega-menus.
**Use when** — Desktop navbar dropdown panels (Solutions, Produit, Ressources…) where each entry needs an icon, bold title, and light subtitle.
**Don't use** — For mobile navigation — use a dedicated mobile drawer. For plain anchor lists (footer columns), use simple <a> lists.

**Limits:**
- items: each entry must provide { icon, title, subtitle }; `href` defaults to "#" when omitted

---

### `<Quote>`

📄 [`src/components/library-design/ui/Quote.tsx`](src/components/library-design/ui/Quote.tsx)

**Purpose** — Italic citation block in a lavender-bordered card with a decorative quote icon and optional author + avatar.
**Use when** — Customer/expert citations inside FeatureFrame `richContent`, landing sections, or anywhere a testimonial needs visual weight without a full testimonial section.
**Don't use** — For full testimonial grids with photos + roles + logos — use a dedicated testimonials section. For plain inline italic text, use <Text italic>.

**Limits:**
- align: "center" (default, matches stacked FeatureFrame) | "left" (image-side content)
- children: quote text only — keep under ~3 sentences; body clamps to 1.125–1.375rem

---

### `<SectionHeading>`

📄 [`src/components/library-design/ui/SectionHeading.tsx`](src/components/library-design/ui/SectionHeading.tsx)

**Purpose** — Standalone centered H2 + subtitle block used to introduce a section.
**Use when** — A section needs a highlighted title (with gradient portion) + short paragraph, and no further custom content in the heading area.
**Don't use** — When the section has a more complex heading (custom CTA row, tags, eyebrow) — compose `<Heading>` + `<Text>` directly instead.

**Limits:**
- titleGradient: max ~50 chars
- titleDark: max ~60 chars
- subtitle: max ~260 chars

**Forbidden:**
- Do NOT pass className with typography overrides — use Heading / Text props instead

---

### `<Skeleton>`

📄 [`src/components/library-design/ui/Skeleton.tsx`](src/components/library-design/ui/Skeleton.tsx)

**Purpose** — Placeholder block that renders while async content is loading. Uses a subtle `secondary-5` bg + pulse animation to signal "something is coming here".
**Use when** — Replacing text / cards / images that are fetched client-side and have a measurable target shape (text lines, avatar circle, card rectangle).
**Don't use** — For static content (the site is SSG — most pages don't need this). For errors (use <ErrorBoundary>) or empty collections (use <EmptyState>).

**Limits:**
- variant: "text" | "circle" | "rect"
- label: optional aria-label, max 60 chars

**Forbidden:**
- Do NOT use as a persistent visual element — it's for transient loading states only

---

### `<Slider>`

📄 [`src/components/library-design/ui/Slider.tsx`](src/components/library-design/ui/Slider.tsx)

**Purpose** — Minimal image carousel with prev/next chevron buttons and a lavender top-framed illustration well.
**Use when** — Section-level image showcases that cycle through 2+ product screenshots (feature walkthroughs, before/after, dashboard variants).
**Don't use** — For a single static image — use <IllustrationFrame>. For rich multi-content slides with captions/CTAs, build a dedicated section.

**Limits:**
- slides: array of { imageSrc, imageAlt? } — returns null when empty
- no autoplay, no dots; navigation is prev/next only

---

### `<TableFrame>`

📄 [`src/components/library-design/ui/TableFrame.tsx`](src/components/library-design/ui/TableFrame.tsx)
🎨 Figma `node-id 309-1899 (inside blog body 303-1146)`

**Purpose** — Responsive comparison / data table with a primary-blue header row and soft lavender body cells. Scrolls horizontally on narrow viewports.
**Use when** — Blog article body (comparisons: chef de projet vs PMO), pricing plan comparisons, feature matrix. 2–6 columns, up to 20 rows. Use outside a FeatureFrame / CardCta pattern.
**Don't use** — For feature lists (use <CheckList> / <ListInline>). For 2-column key-value metadata (use a <dl> inline in the page). For over 20 rows — paginate or reduce.

**Limits:**
- columns: 2–6 (wider breaks the readable column width on desktop)
- rows: 1–20 (beyond 20, the visual density hurts readability)
- every row.length must equal columns.length (enforced in dev)
- each column header: max 60 chars

**Forbidden:**
- Do NOT pass className with bg-* / text-* / border-* overrides — the primary header + primary-2 cells + primary-20 separators are part of the visual contract
- Do NOT nest another <TableFrame> inside a cell
- Do NOT pass a row with fewer / more cells than columns

---

### `<Tag>`

📄 [`src/components/library-design/ui/Tag.tsx`](src/components/library-design/ui/Tag.tsx)
🎨 Figma `node-id 120-48047`

**Purpose** — Small inline pill/badge used for categories, status indicators, eyebrow labels, and filter chips.
**Use when** — Labeling content with a short category or status. Always inline.
**Don't use** — For CTAs (use <Button>), for long descriptions (use <Text>), or for decorative pills inside complex layouts — extract the specific need first.

**Limits:**
- children (label text): max 30 chars. Past that the pill breaks on 2 lines.
- icon: 1 inline element, rendered before children.

**Forbidden:**
- Do NOT pass className with typography / color overrides — use `variant`.
- Do NOT nest <Tag> inside <Tag>.

---

### `<TestimonialCard>`

📄 [`src/components/library-design/ui/TestimonialCard.tsx`](src/components/library-design/ui/TestimonialCard.tsx)

**Purpose** — Display a customer testimonial: quote + pill with name/role/avatar, optional LinkedIn link, optional collapsible "read more" when the quote exceeds `truncateAt` characters.
**Use when** — Inside `<TestimonialsFrame>` to render individual testimonials.
**Don't use** — For a company-level endorsement with a big logo — use `<TestimonialCompanyCard>`.

**Limits:**
- quote: max 2000 chars (hard ceiling for safety)
- truncateAt: default 400 chars — quotes longer collapse to "read more"
- name: max 30 chars (pill gets elliptical past that)
- role: max 45 chars

**Forbidden:**
- Do NOT pass className with typography overrides
- Do NOT hardcode French read-more / read-less labels — pass via i18n

---

### `<TestimonialCompanyCard>`

📄 [`src/components/library-design/ui/TestimonialCompanyCard.tsx`](src/components/library-design/ui/TestimonialCompanyCard.tsx)

**Purpose** — Company-facing testimonial: quote + company logo, framed by an asymmetric primary border.
**Use when** — Press quotes, company endorsements, partner testimonials.
**Don't use** — For a person-level testimonial — use `<TestimonialCard>` (keeps avatar + name + role + LinkedIn pattern).

**Limits:**
- quote: max 220 chars (matches TestimonialCard quote limit)
- logoSrc: should be an SVG or transparent PNG. Fixed logo box: 2.25 × 6.5 rem.
- href: optional URL — when provided, the whole card becomes a link. External URLs (starting with http) open in a new tab with noopener.

**Forbidden:**
- Do NOT pass className with typography / color overrides — use props
- Do NOT nest interactive elements inside the card when `href` is set (block-level link cannot contain nested interactives)

---

### `<Text>`

📄 [`src/components/library-design/ui/Text.tsx`](src/components/library-design/ui/Text.tsx)

**Purpose** — Canonical body/paragraph component. Always use this instead of raw <p>.
**Use when** — Paragraphs, subtitles, body copy, card descriptions.
**Don't use** — For headings (use <Heading>), inline emphasis (use <GradientText>), or UI labels inside badges/pills (a plain <span> is fine there).

**Limits:**
- size="sm": 16px fixed — short captions, meta info
- size="md": 18–25px clamp — default body paragraph
- size="lg": 20–28px clamp — emphasized paragraph / lead

**Forbidden:**
- Do NOT pass className with fontSize / fontWeight overrides — use `size` + `className="font-bold"` for weight adjustment only. Typography overrides break the type scale.

---


## 🧩 Section Frames — full rules

### `<BlogArticleBody>`

📄 [`src/components/library-design/sections/BlogArticleBody.tsx`](src/components/library-design/sections/BlogArticleBody.tsx)
🎨 Figma `node-id 303-1146`

**Purpose** — Outer wrapper for the rich-text body of a blog article — white background, responsive side padding, 91.25rem inner max-width, and a 3.125rem vertical rhythm between children.
**Use when** — Between <TableOfContentsFrame> and <CtaHighlightFrame> on a blog article page. Compose children from the DS primitives listed in the prop doc (Heading, Text, Quote, ListInline, TableFrame, IllustrationFrame with tone="warm", plus inline markup). In Step 5 CMS, a `blocks` prop backed by `@strapi/blocks-react-renderer` will be added alongside `children`.
**Don't use** — As a marketing section (use <FeatureFrame> / <CtaHighlightFrame>). For non-article pages (it assumes long-form vertical rhythm and centered narrow-max-width reading flow).

**Limits:**
- children: article content — DS primitives only. No raw heading tags (h1–h6) or paragraph tags — the ESLint + ds-audit rules enforce this; use <Heading> and <Text> instead.

**Forbidden:**
- Do NOT hardcode article content inside the component — copy flows in via children (rendered by the page, sourced from i18n / CMS)
- Do NOT override bg / padding / max-w / gap via className — they are part of the reading-flow contract
- Do NOT render more than one <BlogArticleBody> per page

---

### `<BlogCollectionFrame>`

📄 [`src/components/library-design/sections/BlogCollectionFrame.tsx`](src/components/library-design/sections/BlogCollectionFrame.tsx)

**Purpose** — Full-width section introducing a blog content collection — H2 title + optional subtitle + optional collection-level author (when a single person runs the whole series) + a responsive 3-col grid of <BlogCard> previews + a "see all" CTA below the grid.
**Use when** — On the /blog index page (one frame per collection: articles / podcasts / releases), on pages that surface a related collection, or as a homepage "featured articles" block. Pair two or more frames with alternating `background="light"` / `"alt"` for visual rhythm.
**Don't use** — For a simple single-row card grid without title/subtitle (compose <BlogCard> directly inside a <div grid>). For a paginated full archive (build a dedicated paginated listing). For mixed content (articles + testimonials) — split into separate frames.

**Limits:**
- title: max 80 chars (H2 scale)
- titleHighlight: max 40 chars (gradient portion of the H2)
- subtitle: max 260 chars
- items: 1–9 (1 = featured highlight; 3 fills a row; 6/9 for longer index pages)
- viewAllLabel: max 30 chars
- collectionAuthor.name: max 40 chars

**Forbidden:**
- Do NOT pass className that overrides bg / padding / rounded on the outer section — use `background` prop to switch between white and bg-alt (for alternating-row pages)
- Do NOT hardcode any locale copy (title, subtitle, viewAllLabel, collectionAuthor.label) — pass translated strings via next-intl
- Do NOT render an empty grid (items.length must be ≥ 1)
- Do NOT pass both `collectionAuthor` on this frame AND per-card `authors` intending them to merge — they live in different slots. If a collection has one host, set `collectionAuthor` on the frame and keep per-card `authors` too (they describe individual articles)

---

### `<BlogHero>`

📄 [`src/components/library-design/sections/BlogHero.tsx`](src/components/library-design/sections/BlogHero.tsx)
🎨 Figma `node-id 303-1016`

**Purpose** — Article header for a single blog post: navbar + "Le Blog" tag + article title + author attribution (<BlogAuthorTag>) + featured illustration frame that bleeds into the next section.
**Use when** — Top of a blog article page. One per page.
**Don't use** — As a blog index / landing hero (use <Hero> with a CTA). For non-blog pages (use <Hero>). For inline author attribution inside a card (use <BlogAuthorTag> directly).

**Limits:**
- title: max 180 chars (articles tolerate long titles, but past that H1 wraps too aggressively and hurts readability)
- topTagLabel: max 30 chars (default "Le Blog")
- navItems: 2–9 top-level items
- imageAlt: required — pass "" only if the featured image is purely decorative

**Forbidden:**
- Do NOT render multiple <BlogHero> per page
- Do NOT pass className that changes background / min-height — the white bg + gradient + ellipse are part of the section contract
- Do NOT pass arbitrary color / typography overrides via className

---

### `<ClientsFrame>`

📄 [`src/components/library-design/sections/ClientsFrame.tsx`](src/components/library-design/sections/ClientsFrame.tsx)

**Purpose** — Section wrapper for a large grid of <ClientCard> items — avatar + name + role + company + metadata rows. Dense social-proof block for when the page needs to show 6–9 clients at once without quotes ("Ils nous font confiance", "Laissez nos clients vous parler d'AirSaas"). Grid locked at 3 columns on desktop (lg); an optional CTA below links to the full client collection.
**Use when** — Equipes / Solution type-B pages surfacing 6–9 client cards as a dense trust signal. Grid renders 1 col mobile → 2 col md → 3 col lg (fixed).
**Don't use** — For fewer than 6 clients (use <TestimonialsFrame> + <TestimonialCard>). For quote-based testimonials (use <TestimonialsFrame> + <TestimonialCard>). For company-logo-only social proof with no metadata (use <LogosBar>).

**Limits:**
- titleHighlight: max 40 chars
- title: max 80 chars
- subtitle: max 260 chars
- clients: 6–9 items (below 6 looks sparse; above 9 breaks the 3×3 rhythm — use the collection CTA for overflow)
- collectionCtaLabel: max 36 chars

**Forbidden:**
- Do NOT use for fewer than 6 clients — use <TestimonialsFrame>
- Do NOT pass className with bg / text / font / padding overrides
- Do NOT mix clients prop AND children — children wins, clients ignored
- Do NOT nest another ClientsFrame inside a client card
- Do NOT hardcode collectionCtaLabel locale copy — pass via i18n

---

### `<ComparisonDualFrame>`

📄 [`src/components/library-design/sections/ComparisonDualFrame.tsx`](src/components/library-design/sections/ComparisonDualFrame.tsx)

**Purpose** — "Avec / sans" dual-column comparison: a row of numbered cards per column, each column led by a colored pill label.
**Use when** — Driving contrast between the old way (sans) and new way (avec) with concrete paired points. Typically placed before a CTA.
**Don't use** — For a single-column numbered list (use <ComparisonFrame>). For feature-matrix style comparison (use <ComparisonTableFrame>).

**Limits:**
- titlePrefix: max 70 chars (dark-to-primary gradient portion)
- titleHighlight: max 30 chars (primary gradient portion)
- sansLabel / avecLabel: max 20 chars
- sansItems / avecItems: 3–10 items each, ideally paired
- item.description: max 220 chars

**Forbidden:**
- Do NOT pass asymmetric item counts that break the paired narrative (use <ComparisonFrame> twice instead)

---

### `<ComparisonFrame>`

📄 [`src/components/library-design/sections/ComparisonFrame.tsx`](src/components/library-design/sections/ComparisonFrame.tsx)

**Purpose** — "Avec / sans" style numbered-list section showing pain points OR gains.
**Use when** — Driving contrast between old-way and new-way (before/after) on a single page. Typically used twice on the same page — one red/orange "sans" block + one green "avec" block.
**Don't use** — For side-by-side feature comparison tables (use <ComparisonTableFrame>).

**Limits:**
- title: max 80 chars
- subtitle: max 220 chars
- items: 3–8 (below 3 the block looks sparse; above 8 visual rhythm breaks)
- items[].description: max 220 chars
- emoji: 1–2 chars

---

### `<ComparisonTableFrame>`

📄 [`src/components/library-design/sections/ComparisonTableFrame.tsx`](src/components/library-design/sections/ComparisonTableFrame.tsx)

**Purpose** — Feature comparison grid — one card per row, one wide "feature" cell on the left, N narrower value cells on the right (one per column). Supports boolean (check/X), string, or custom ReactNode cell content.
**Use when** — Competitor comparisons, plan/pricing feature matrices, "Avec vs sans vs autre" tables. The highlighted column (primary tint) is typically AirSaas itself.
**Don't use** — For side-by-side narrative lists (use <ComparisonFrame> or <ComparisonDualFrame>). For 2+ features needing heavy copy, prefer stacked feature sections.

**Limits:**
- title: max 80 chars
- titleHighlight: max 40 chars
- subtitle: max 260 chars
- columns: 2–4 (past 4 the grid overflows on desktop)
- rows: 3–15 (past 15 the page gets heavy — split into multiple tables)
- row.label: max 80 chars
- cell string values: max 40 chars

**Forbidden:**
- Do NOT mix boolean + string cells in the same column (visual inconsistency)
- Do NOT use for "avec / sans" paired narrative — use <ComparisonDualFrame>

---

### `<CtaFrame>`

📄 [`src/components/library-design/sections/CtaFrame.tsx`](src/components/library-design/sections/CtaFrame.tsx)

**Purpose** — End-of-page conversion block: large gradient heading + subtitle + 2 CTA cards.
**Use when** — Closing a page that wants a direct conversion action (demo + newsletter, etc.).
**Don't use** — Mid-page — this is designed to be the last visual beat before the footer.

**Limits:**
- title: max 80 chars (fits Heading level 2 in 2 lines)
- subtitle: max 220 chars
- children: 2 <CardCta> components side by side (1 column on mobile)

**Forbidden:**
- Do NOT pass more than 2 cards — layout is grid-cols-2 at md+
- Do NOT override gradient via className

---

### `<CtaHighlightFrame>`

📄 [`src/components/library-design/sections/CtaHighlightFrame.tsx`](src/components/library-design/sections/CtaHighlightFrame.tsx)

**Purpose** — Full-width closing CTA section — large 3-part tri-gradient H2 (dark / primary / dark) + a centered white card containing a short subtitle and a single primary CTA.
**Use when** — Closing a product page with a strong "book a demo" ask. One per page max.
**Don't use** — For a side-by-side double CTA block (use <CtaFrame> with two CardCta children).

**Limits:**
- titlePrefix: max 30 chars (dark-to-primary gradient, before the highlight)
- titleHighlight: max 50 chars (primary gradient, the emphasized middle)
- titleSuffix: max 20 chars (dark-to-primary gradient, after the highlight)
- subtitle: max 220 chars
- ctaLabel: max 24 chars

**Forbidden:**
- Do NOT override gradient colors via className
- Do NOT stack two CtaHighlightFrame on one page

---

### `<FaqFrame>`

📄 [`src/components/library-design/sections/FaqFrame.tsx`](src/components/library-design/sections/FaqFrame.tsx)

**Purpose** — Expandable FAQ section with a highlighted title and accordion items.
**Use when** — The page needs to surface common objections / pricing questions / setup steps before conversion.
**Don't use** — For a short list of 2–3 hints (use inline <details> or custom block).

**Limits:**
- title: max 40 chars (plain dark-to-primary portion)
- titleHighlight: max 40 chars (gradient portion)
- items: 2–12 (past 12, split into multiple FAQs or a dedicated page)
- items[].question: max 120 chars
- items[].answer: max 500 chars

**Forbidden:**
- Do NOT nest FAQs (no accordion inside an answer)

---

### `<FeatureFrame>`

📄 [`src/components/library-design/sections/FeatureFrame.tsx`](src/components/library-design/sections/FeatureFrame.tsx)

**Purpose** — Single feature section: title + subtitle + checklist / rich content + optional image (side-by-side or stacked) + optional CTA.
**Use when** — Showcasing one feature or concept per section. The workhorse of the marketing page — most body sections below Hero use this.
**Don't use** — For a metrics grid (use <ValuePropositionFrame>), for testimonials (use <TestimonialsFrame>), or for FAQs (use <FaqFrame>).

**Limits:**
- title: max 120 chars (ReactNode allows spans; plain string best < 80)
- titleHighlight: max 40 chars
- subtitle: max 300 chars (ignored when richContent is provided)
- checklist: 2–6 items
- ctaLabel: max 24 chars
- richContent: prefer 1–4 paragraphs; the prose wrapper handles lists/links

**Forbidden:**
- Do NOT mix `subtitle`, `richContent`, and `checklist` — pick one content strategy per instance
- Do NOT use `imageSize="narrow"` with `layout="stacked"` (no effect)

---

### `<FeatureSectionStacked>`

📄 [`src/components/library-design/sections/FeatureSectionStacked.tsx`](src/components/library-design/sections/FeatureSectionStacked.tsx)

**Purpose** — Centered title + subtitle + orange-bordered item list, with an illustration image that bleeds from the bottom into the next section.
**Use when** — Mid-page feature moment where text is stacked on top and the screenshot/illustration anchors below (e.g. "Un capacity planning par équipe simple et actionnable" on HomePage).
**Don't use** — For feature + image side-by-side (use <FeatureFrame>). For a numbered "avec/sans" list (use <ComparisonFrame>).

**Limits:**
- titleGradient: max 40 chars (primary gradient portion)
- titleDark: max 60 chars
- titleDarkPrefix: max 20 chars
- subtitle: max 260 chars
- listItems: 3–6 strings (past 6 the list looks cluttered)

**Forbidden:**
- Do NOT use without an image — the design expects the bleed illustration

---

### `<Footer>`

📄 [`src/components/library-design/sections/Footer.tsx`](src/components/library-design/sections/Footer.tsx)

**Purpose** — Page footer — 4 columns of navigation links + floating logo + copyright card.
**Use when** — Last element on every page. Pass localized copy via `columns` + `copyright`.
**Don't use** — As an in-page card — this is designed as a full-width section.

**Limits:**
- columns: exactly 4 (matches the lg grid; fewer renders unbalanced)
- column.title: max 30 chars
- column.links[]: 3–10 per column
- link.label: max 50 chars
- copyright: max 220 chars

**Forbidden:**
- Do NOT hardcode text inside Footer — all copy comes from `columns` + `copyright` (callers load it from next-intl / CMS)

---

### `<Hero>`

📄 [`src/components/library-design/sections/Hero.tsx`](src/components/library-design/sections/Hero.tsx)
🎨 Figma `node-id 115-12821 (typography scale) + site templates`

**Purpose** — First section of a page: navbar + title + subtitle + CTAs + illustration.
**Use when** — Top of every marketing / product / solution page.
**Don't use** — As a mid-page section — that's what FeatureFrame / ValuePropositionFrame are for. Only one <Hero> per page.

**Limits:**
- title: max 60 chars
- titleHighlight: max 30 chars
- titleSuffix: max 30 chars
- subtitle: max 220 chars
- eyebrow: max 30 chars (uppercase, tracking)
- navItems: 2–7 top-level items
- bottomTags: 0–4

**Forbidden:**
- Do NOT render multiple <Hero> on a single page
- Do NOT pass className that changes the min-h-screen or background

---

### `<HighlightFrame>`

📄 [`src/components/library-design/sections/HighlightFrame.tsx`](src/components/library-design/sections/HighlightFrame.tsx)

**Purpose** — Alternating-zigzag vertically stacked cards, each with a big green gradient number outside the card (left on odd, right on even rows).
**Use when** — Emphasizing key positive metrics or numbered gains (3–7 items) with a success/green visual tone. Typically used after a ComparisonFrame.
**Don't use** — For negative / warning narratives (use <ComparisonFrame>). For metrics grid without the zigzag (use <ValuePropositionFrame> with <FeatureCard> children).

**Limits:**
- titleHighlight: max 40 chars (green gradient)
- title: max 80 chars
- subtitle: max 260 chars
- items: 3–7 (past 7 the zigzag rhythm breaks)
- item.value: 1–3 chars (big 5.5rem number)
- item.description: max 200 chars

**Forbidden:**
- Do NOT mix HighlightFrame with ComparisonFrame on the same page (redundant)

---

### `<IconRowFrame>`

📄 [`src/components/library-design/sections/IconRowFrame.tsx`](src/components/library-design/sections/IconRowFrame.tsx)

**Purpose** — Horizontal row of icon + label pairs (integrations, tech stack, trusted-by logos rendered as iconography). Icons sit above labels.
**Use when** — Displaying 4–8 tools / integrations / ecosystems on a single visual strip (e.g. "Ils s'intègrent à votre stack").
**Don't use** — For brand logos (use <LogosBar>). For a grid with richer content per item (use <ValuePropositionFrame> + <FeatureCard>).

**Limits:**
- titleHighlight / title: max 40 / 80 chars
- singleTitle: max 80 chars (alternative to titleHighlight + title)
- subtitle: max 260 chars
- items: 3–8 (below 3 the row looks sparse; past 8 it wraps awkwardly on tablet)
- item.label: max 24 chars
- tag: max 24 chars

**Forbidden:**
- Do NOT mix singleTitle with titleHighlight/title — pick one strategy
- Do NOT use emoji as item.icon — use <IconBadge> for consistency

---

### `<PillarFrame>`

📄 [`src/components/library-design/sections/PillarFrame.tsx`](src/components/library-design/sections/PillarFrame.tsx)

**Purpose** — Grid of "pillar" cards — each with a large icon illustration, uppercase primary title, description, and an optional example note with a left-border accent.
**Use when** — Articulating 2–6 core principles / methodology steps / framework pillars (e.g. "DROP / KEEP / ADD" methodology; 4 product pillars).
**Don't use** — For generic feature grids (use <ValuePropositionFrame>). For metric-heavy cards (use <FeatureCard>).

**Limits:**
- titleHighlight: max 40 chars
- title: max 80 chars
- subtitle: max 260 chars
- pillars: 2–6 items (matches columns 2 or 3)
- pillar.title: max 20 chars (uppercase, short — "DROP", "ADD")
- pillar.description: max 220 chars
- pillar.example: max 180 chars (optional)
- tag: max 24 chars

**Forbidden:**
- Do NOT use for sequential steps (use a numbered pattern instead)

---

### `<RelatedArticlesFrame>`

📄 [`src/components/library-design/sections/RelatedArticlesFrame.tsx`](src/components/library-design/sections/RelatedArticlesFrame.tsx)
🎨 Figma `node-id 309-1986`

**Purpose** — "Further reading" block at the end of a blog article — centered primary-gradient title + white rounded card listing outbound links to related resources (other articles, whitepapers, videos, external sources). Each item is prefixed by a small "external-link" square icon.
**Use when** — Bottom of a blog article (before the CTA block), to surface 3–10 pieces of further reading. Coexists with <TableOfContentsFrame> on the same page (TOC at the top, further-reading at the bottom).
**Don't use** — For in-page anchor navigation (use <TableOfContentsFrame>). For marketing CTAs with cards + imagery (use <CardCta>). For footer-style multi-column directories (use <Footer>). For fewer than 3 links (looks sparse — just inline them in the article body).

**Limits:**
- title: max 30 chars (e.g. "Pour aller plus loin", "Further reading")
- items: 3–10 (below 3 looks sparse; above 10 becomes a directory)
- each item.label: max 120 chars (matches blog article title tolerance)
- each item.href: resolvable URL (internal route or external)
- each item.target: "_self" (default) | "_blank" (external — adds rel noopener noreferrer automatically)

**Forbidden:**
- Do NOT pass className that changes background / border / padding — the lavender section + white card + primary-40 border are part of the contract
- Do NOT hardcode the title text — pass via `title` prop from i18n / CMS (locale-driven)
- Do NOT render more than one <RelatedArticlesFrame> per page

---

### `<RelatedSolutionsFrame>`

📄 [`src/components/library-design/sections/RelatedSolutionsFrame.tsx`](src/components/library-design/sections/RelatedSolutionsFrame.tsx)

**Purpose** — Cross-sell grid — 3 image-first cards each linking to a related solution or product. Rendered at the bottom (or top) of LP, Produit, and Solution pages to surface "other relevant features". Grid locked at 3 columns on desktop; optional collection CTA below links to the full platform directory.
**Use when** — Surfacing 3 related solutions/products with a screenshot + title + short description + "Voir plus" link. Typical footer cross-sell on landing / product / solution pages.
**Don't use** — For icon-first feature grids (use <ValuePropositionFrame> + <FeatureCard>). For blog-style previews with author bylines (use <BlogCard>). For quick CTA choices with only a button (use <CtaFrame> + <CardCta>).

**Limits:**
- tag: max 24 chars
- titleHighlight: max 40 chars
- title: max 80 chars
- subtitle: max 260 chars
- solutions: exactly 3 items (grid locked to 3 columns on desktop)
- solution.title: max 40 chars
- solution.description: max 120 chars
- solution.imageAlt: required (empty `""` only for decorative)
- linkLabel: max 18 chars
- collectionCtaLabel: max 36 chars

**Forbidden:**
- Do NOT pass className with bg / text / font / padding overrides
- Do NOT hardcode linkLabel / collectionCtaLabel locale copy — pass via i18n
- Do NOT nest another RelatedSolutionsFrame inside a card
- Do NOT pass fewer or more than 3 solutions (grid breaks)

---

### `<SliderFrame>`

📄 [`src/components/library-design/sections/SliderFrame.tsx`](src/components/library-design/sections/SliderFrame.tsx)

**Purpose** — Centered title + subtitle + interactive screenshot carousel.
**Use when** — Showcasing a product surface (marketplace, integrations, multi-screen flow, bootcamp gallery, community LPDT) with 2–8 slides that the user navigates through. `variant="dark"` for sections that need to break the rhythm with a primary-70 background.
**Don't use** — For a static feature/image (use <FeatureFrame>). For a single image, no carousel wrapper needed.

**Limits:**
- variant: "light" (default, white bg) | "dark" (primary-70 bg, white typography)
- titleHighlight: max 40 chars (primary gradient light / white dark)
- titleRest: max 70 chars (dark foreground light / white dark)
- subtitle: max 280 chars
- slides: 2–8 (above 8, navigation feels tedious — split into 2 sections)

**Forbidden:**
- Do NOT nest another <Slider> inside this frame

---

### `<StepsFrame>`

📄 [`src/components/library-design/sections/StepsFrame.tsx`](src/components/library-design/sections/StepsFrame.tsx)

**Purpose** — Horizontal row of numbered sequential steps — each step has a large primary-gradient number, an icon, a short title, and a description. Cards are visually connected by chevron indicators between them on desktop (hidden on mobile, where steps stack).
**Use when** — Presenting a linear deployment / onboarding / how-it-works flow of 3–5 discrete steps that must be read in order (e.g. "Lancez votre déploiement en 4 étapes").
**Don't use** — For non-sequential principles or methodology pillars (use <PillarFrame>). For metrics / stats grids (use <ValuePropositionFrame> + <FeatureCard>). For a zigzag vertical list with big outside numbers (use <HighlightFrame>).

**Limits:**
- tag: max 24 chars
- titleHighlight: max 40 chars
- title: max 80 chars
- subtitle: max 260 chars
- steps: 3–5 items (below 3 looks sparse; above 5 the row breaks on md)
- step.title: max 24 chars (e.g. "Kick-off", "Go live")
- step.description: max 180 chars
- step.number: 1–9 (auto-derived from index if omitted)

**Forbidden:**
- Do NOT use for non-sequential content — use <PillarFrame>
- Do NOT pass className with bg / text / font / padding overrides
- Do NOT mix items with and without explicit step.number (all or none)
- Do NOT nest another StepsFrame inside a step card

---

### `<TableOfContentsFrame>`

📄 [`src/components/library-design/sections/TableOfContentsFrame.tsx`](src/components/library-design/sections/TableOfContentsFrame.tsx)
🎨 Figma `node-id 303-1104`

**Purpose** — Article-level table of contents — centered primary-gradient title + white rounded card listing anchor links to each article section.
**Use when** — Top of a long-form blog article (right after <BlogHero>), or any documentation page that benefits from a jump-to-section index. Title is locale-driven — caller passes "Sommaire" / "Contents" / "Inhalt" from next-intl.
**Don't use** — For primary site navigation (use <Navbar>). For CTA-rich lists (use <ListEmphasized> or <CardCta>). For multi-column link directories (use <Footer>). For 1-2 items (looks sparse — just omit the block).

**Limits:**
- title: max 30 chars (often uppercased by caller, e.g. "SOMMAIRE")
- items: 3–15 anchors (below 3 looks sparse, above 15 breaks reading flow)
- each item.label: max 120 chars (matches blog H2/H3 title tolerance)
- each item.href: must resolve to an on-page anchor ("#slug")

**Forbidden:**
- Do NOT pass className that changes background / border / padding — the lavender surface + white card + primary-40 border are part of the contract
- Do NOT hardcode the title text — always pass via `title` prop from i18n / CMS (locale-driven)
- Do NOT render more than one <TableOfContentsFrame> per page

---

### `<TestimonialsFrame>`

📄 [`src/components/library-design/sections/TestimonialsFrame.tsx`](src/components/library-design/sections/TestimonialsFrame.tsx)

**Purpose** — Section wrapper for testimonial cards: gradient heading + 3-col grid.
**Use when** — Surfacing 2–6 customer quotes on a marketing page. 1 quote = use <TestimonialCard> inline (no frame).
**Don't use** — For a single hero testimonial — just render a <TestimonialCard> inline. For company-logo-based testimonials, prefer <TestimonialCompanyCard>.

**Limits:**
- title: max 40 chars (gradient dark-to-primary)
- titleHighlight: max 40 chars (gradient primary)
- testimonials: 2–6 items (renders grid-cols-3 at lg — 2 items center on md+)

**Forbidden:**
- Do NOT mix testimonials prop AND children — children wins, testimonials ignored

---

### `<ValuePropositionFrame>`

📄 [`src/components/library-design/sections/ValuePropositionFrame.tsx`](src/components/library-design/sections/ValuePropositionFrame.tsx)

**Purpose** — Section with title + subtitle + a 2-to-6-column grid of child cards (usually <FeatureCard> or custom).
**Use when** — Presenting 2–6 equal-weight benefits / value props / metrics.
**Don't use** — For a narrative "feature + image" flow (use <FeatureFrame>). For a listing of 7+ items (use <PillarFrame> or <HighlightFrame>).

**Limits:**
- title: max 80 chars
- titleHighlight: max 40 chars
- subtitle: max 250 chars
- children: 2–6 cards (should match `columns` prop for visual balance)
- columns: 2 | 3 | 4 | 5 | 6 (lg breakpoint; default 4)
- tag: max 24 chars

**Forbidden:**
- Do NOT mix different card components as children (visual consistency)

---


## ⚠️ Components without @purpose contract

None — all components have contracts.
