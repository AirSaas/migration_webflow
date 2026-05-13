# DS Rules — AirSaaS Design System

**⚠️ READ BEFORE TOUCHING ANY COMPONENT OR PAGE ⚠️**

These rules are strict. They exist because the DS is a contract — agents and humans follow the same guardrails so the aesthetic stays solid across all pages. If a need can't be satisfied with the DS, the answer is to **extend the DS** (new token, new prop, new component), never bypass it.

---

## 🥇 Golden rules (5)

1. **Product Sans is the only font.** No Google Fonts, no custom font imports, no exceptions. Configured in [src/app/globals.css](../src/app/globals.css) via `@font-face`. [src/lib/fonts.ts](../src/lib/fonts.ts) is intentionally empty.
2. **No hardcoded colors.** Every color in the product is a token from the palette. No hex values in `.tsx` / `.ts`, no `rgba()` literals, no default Tailwind palette (`bg-gray-*`, `text-slate-*`, `bg-blue-500`, …), no arbitrary values (`bg-[#abc]`, `text-[14px]`).
3. **No raw `<h1>` – `<h6>` or typography `<p>` tags outside the canonical components.** Use `<Heading>` / `<Text>` / `<SectionHeading>` from `src/components/library-design/ui/`. Do not reinvent `fontSize` / `fontWeight` inline.
4. **No inline `style={{}}` for values that exist as tokens.** Spacing, colors, shadows, radius, typography → always via Tailwind classes or CSS variables. Inline style only for genuinely dynamic values (computed at runtime) or CSS properties Tailwind doesn't cover.
5. **No decorative concentric circles or baked-in rings in images.** Illustrations must arrive "flat" — no gray/primary spinner rings, no semicircle halos baked into screenshots. If an old image has them, crop them with [scripts/crop-illustrations.py](../scripts/crop-illustrations.py) before shipping. Decorative rings as DOM elements are also banned (the single, near-invisible Hero ring at 6% alpha is the only authorized exception).

---

## 🎨 Palette — canonical tokens

Source of truth : Figma file `stwOIKqkRzLAXL8oE9dAeU` / node-id `118-35646`.

All token values live in [src/app/globals.css](../src/app/globals.css) `@theme inline` block. Any color you reach for **must** exist there. If it doesn't, the process is: (1) prove the need, (2) add the token, (3) document it in this file.

Groups :

- **Primary** — `primary`, `primary-70/60/40/20/10/5/2`, `primary-dark` (gradient-only)
- **Secondary** (text + neutrals) — `secondary`, `secondary-70/50/40/20/10/5/2`, `foreground` (= `secondary`)
- **Text** — `text-p`, `text-muted`, `text-blog`, `text-secondary` (legacy aliases mapped to Figma scale)
- **Status** — `success` + 40/20/10, `warning` + 40/10/5, `prevention` + 40/30/20, `orange` + 70, `terracotta`
- **Backgrounds** — `background`, `bg-alt`, `bg-light`, `bg-lavender`, `bg-seashell`, `bg-warning`
- **Accent (legacy brand extras)** — `crimson`, `emerald`, `green`, `orange-bright`, `royal-blue`, `sky-blue`, `turquoise`, `medium-blue`, `orchid`, `success-text`, `warning-text`, `text-light` (all aliased to Figma core)
- **Borders** — `border` (= `secondary-10`)

**Gradients** : `gradient-primary`, `gradient-dark-to-primary`, `gradient-orange`, `gradient-green`, `gradient-hero-bg`, `gradient-hero-dark-bg`, `gradient-cta-bg`.

**Shadows** : `shadow-elevation-sm`, `shadow-elevation-md`, `shadow-elevation-lg`.

**Alpha overlays** : `color-primary-70-alpha-6`, `color-white-alpha-6` (for decorative rings, low-opacity borders).

---

## 🔤 Typography — canonical components

Source of truth : Figma node-id `115-12821`.

| Style | Component | Size token | Weight | Line-height |
|---|---|---|---|---|
| H1 | `<Heading level={1}>` | `--text-h1` (clamp 40 → 95px) | Black 900 | 0.95 |
| H2 | `<Heading level={2}>` | `--text-h2` (clamp 32 → 72px) | Black 900 | 1.1 |
| H3 | `<Heading level={3}>` | `--text-h3` (clamp 28 → 70px) | Black 900 | 1.18 |
| H4 | TODO `<Heading level={4}>` | `--text-h4` (clamp 24 → 40px) | Bold 700 | 1.2 |
| Paragraph | `<Text size="md">` | `--text-paragraph` (clamp 18 → 25px) | Light 300 | 1.4 |
| Small | `<Text size="sm">` | `--text-small` (16px) | Light 300 | — |
| Link | inline `<a>` + `text-primary` | same as Text | Light 300 | — |

Available weights : 300, 400, 700, 900 (exactly these four, no others).

---

## 🧱 Component choice — decision tree

When you need to build a section, consult the table first. If nothing fits, go to the **Extension process** below.

| Need | Component |
|---|---|
| Top of page, headline + CTA + product image | `<Hero>` (variants `light`/`dark`, layouts `centered`/`split`). **Always verify the live first** — pass `layout` explicitly based on whether the image is BESIDE the text (`split`) or BELOW it (`centered`). Per-category defaults are starting hypotheses, not rules: Équipes / LP / Produit / Solution pages USUALLY render `centered` with image full-width below the headline; some Solution and LP pages render `split` (image beside text). The data dispatcher's auto-pick (`split` when `imageSrc` is set) is unreliable across the catalog — set the layout explicitly. |
| Top of page with multiple dashboard views cycling (icon+label tabs swap the screenshot) | `<Hero>` with `mediaTabs` prop — auto-rotates, pauses on interaction. Layout must stay `centered`. |
| Feature section with text + image side by side | `<FeatureFrame>` (prop `imagePosition`). For the **CompositeImageWithArrowedText** pattern (1 composite image + 3 arrowed sub-block labels), pass `subSections: [{title, body}, ...]` in the data — the dispatcher renders them as raw `<h5>+<p>` inside the prose `richContent`. The composite image must be a single asset with arrows baked in (e.g. `public/assets/screenshots/newsletter-sponsor-composite.png`). |
| Call-to-action block with cards | `<CtaFrame>` + children (requires 2 `<CardCta>` children) **or** `<CtaHighlightFrame>` for a single centered CTA (data type `cta-highlight` or `cta`). |
| 3–6 feature cards in a grid | `<ValuePropositionFrame>` + `<FeatureCard>` children. Each card supports an optional `icon` prop — pass via data `iconName` for KPI rows (`stats` type). |
| Mixed press + LinkedIn testimonials in one block | data type `mixed-testimonials` (renders `<TestimonialsFrame>` with 2 child rows: press `<TestimonialCompanyCard>` row + personal `<TestimonialCard>` row). Grid adaptive — lg cols = `min(N, 4)` per row. Canonical: TestimonialsFrame story `MixedPressAndPersonal`. |
| Single-quote customer testimonials (LinkedIn) | `<TestimonialsFrame>` + `<TestimonialCard>` (1-6 items) |
| FAQ accordion | `<FaqFrame>` |
| Avec / sans paired narrative (numbered cards, 2 columns) | `<ComparisonDualFrame>` (data type `comparison-dual`, 3-10 paired items). **NOT `<ComparisonTableFrame>`** — its contract `@forbidden` use for avec/sans narrative. |
| Feature matrix comparison (rows=features, cols=plans/products) | `<ComparisonTableFrame>` (data type `comparison-table`). Use for pricing matrices, competitor comparisons — never for avec/sans narrative. |
| Stacked feature list with image (3-6 bullets + bleed image) | `<FeatureSectionStacked>` (data type `feature-stacked`). **Forbidden without an image** — for text-only stacked headings use `section-heading` instead. |
| Standalone H2 + subtitle, no image | data type `section-heading` (renders `<SectionHeading>`). The dispatcher overrides the DS component's `lg:px-[14.375rem]` to `lg:px-[10rem]` so the heading lines up with other section frames. |
| Image carousel (2-8 slides, marketplace / multi-screen) | data type `slider` (renders `<SliderFrame>`). For static single image use `<FeatureFrame>`. |
| Dense client grid (6-9 ClientCards with avatar + role + sector + size) | data type `clients` (renders `<ClientsFrame>`). **Overflow rule**: when the live shows ≥10 cards, render 6-9 representative cards + `collectionCtaLabel` pointing to the collection page (e.g. `/fr/temoignages`). Do NOT extend the contract, do NOT use a slider, do NOT swap for TestimonialsFrame. |
| Logos row | `<LogosBar>` |
| Page footer | `<Footer>` |
| Typography | `<Heading level={1-4}>` / `<Text size="sm|md|lg">` / `<SectionHeading>` |
| Button | `<Button variant="…" size="…">` |
| Tag / badge | `<Tag variant="…">` (12 custom variants available for categories) |
| Decorative rounded card with shadow | `<FloatingCard>` |
| Floating animation wrapper | `<Float variant={1–3}>` |

### Gradient-split title rule (FeatureFrame / SectionHeading / ClientsFrame)

Most marketing headings on the live have a primary-gradient portion (blue text). Match by splitting the title:

- **Blue at start** (prefix-style): `titleHighlight: "Les chiffres"` + `title: "qui vous feront adopter AirSaas"`. Default order — `titleHighlightAtEnd: false`.
- **Blue at end** (suffix-style): `title: "Partagez simplement les roadmaps"` + `titleHighlight: "à toute l'organisation"` + `titleHighlightAtEnd: true`.
- **Blue in the middle**: the DS prefix/suffix split can't express this exactly. Compromise — extend the blue toward the nearest side. Example: live "Impliquez **simplement** les chefs de projet" → `title: "Impliquez"` + `titleHighlight: "simplement les chefs de projet"` (suffix). This matches the HomePage convention for the same headings.

---

## 🚫 Forbidden patterns — examples

```tsx
// ❌ BAD
<h2 style={{ fontSize: "3rem", fontWeight: 900, color: "#3a51e2" }}>Titre</h2>

// ✅ GOOD
<Heading level={2}>Titre</Heading>
```

```tsx
// ❌ BAD
<div className="bg-gray-100 text-slate-900 p-4">…</div>

// ✅ GOOD
<div className="bg-secondary-5 text-secondary p-4">…</div>
```

```tsx
// ❌ BAD — arbitrary hex
<span style={{ color: "#ff922b" }}>⚠</span>

// ✅ GOOD — token
<span className="text-orange">⚠</span>
```

```tsx
// ❌ BAD — decorative concentric ring
<div className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-primary">
  <div className="absolute inset-2 rounded-full border-4 border-secondary-40" />
</div>

// ✅ GOOD — use a DS component, or don't add the decoration
```

```tsx
// ❌ BAD — loads a new font
import { Inter } from "next/font/google";

// ✅ GOOD — Product Sans is already loaded in globals.css. Do not add fonts.
```

---

## 🔧 Extension process — when the DS doesn't cover a need

1. **Prove the gap.** Document what you need and why no existing component fits. Screenshot the Figma frame. List the props combinations you tried.
2. **Propose, don't implement.** Suggest one of :
   - **New prop on existing component** (cheapest — always prefer this)
   - **New variant** of an existing component (e.g. `<Button variant="ghost">`)
   - **New component** in `src/components/library-design/ui/` or `/sections/`
   - **New token** in `globals.css` (`@theme inline` block)
3. **Get approval.** In the conversation, get the user to confirm the approach before touching code. For new components, follow the existing file/story pattern in `src/components/library-design/`.
4. **Implement with contract.** New component must include :
   - JSDoc contract at top of file (purpose, limits, forbidden overrides)
   - Storybook story with DO/DON'T examples
   - Entry in this `ds-rules.md` decision tree
   - Entry in [docs/sections-catalog.md](sections-catalog.md) if it's a section

**Never** : bypass by writing inline styles, duplicate an existing component, or import a third-party UI lib.

---

## ♿ Accessibility contract

- **Focus rings** — every interactive component (`<Button>`, `<a>`, nav links) must have a visible `focus-visible` ring. The DS `<Button>` ships with `focus-visible:ring-primary` by default; keep it.
- **Motion** — all animations use `motion-reduce:transition-none motion-reduce:hover:scale-100`. Never introduce movement without a `prefers-reduced-motion` opt-out.
- **Color as meaning** — tag/badge colors must never be the *only* signal. The text content carries the semantic (e.g. "Opérationnel" is clear without the green). Designers validated the pastel Tag 1–12 pairs for use as category markers, not as status indicators — don't use them to communicate warnings/errors.
- **ARIA** — Navbar exposes `aria-label`, `aria-expanded`, `aria-controls`, `role=menu`. Any new interactive section must match that baseline. Avoid `aria-hidden` except on purely decorative SVGs.
- **Alt text** — every `<img>` has an `alt`. Decorative imagery uses `alt=""` + an explicit parent `aria-hidden="true"`.
- **Landmarks** — one `<header>` (navbar lives inside Hero), one `<main>`, one `<footer>` per page.

## 📏 Character limits — component contracts

_To be populated during Phase 5 — component-by-component character limits will live here._

For now : stick to Figma frame text length. If text overflows visibly in the rendered DS, that's a bug — shorten the text or ask about a new variant.

---

## 🧩 DS components inventory

Canonical source : `src/components/library-design/`.

- `foundation/` — token showcases (Colors, Typography) — not importable
- `ui/` — atomic primitives (buttons, cards, typography, icons)
- `sections/` — composed page sections (Hero, FeatureFrame, Footer, etc.)

Pages are assembled in `src/components/pages/` using these sections.
