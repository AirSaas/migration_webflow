---
name: ds-component-builder
description: Build or modify ANY UI in the AirSaaS codebase — new pages, new landings, new sections, new components, new variants, refactors. Triggers on creation requests like "create a new landing page", "crée une nouvelle landing", "build a new section", "ajoute une section", "new component", "nouveau composant", "créer une page blog", "add a variant", "refactor into the DS", "extract into the DS", "blog template", "new card". Also triggers when the user mentions they will start building a new feature area (blog, pricing, integrations, docs, etc.). ANY UI work in this repo must go through this skill — zero tolerance for hardcoded colors, hardcoded fonts, raw typography tags, or off-palette choices.
---

# DS Component Builder — AirSaaS

**ABSOLUTE RULE: 100% of colors and fonts come from the DS. ZERO hardcoded values. EVER.**

Before doing ANYTHING UI-related in this repo, read `docs/ds-rules.md`. It's the contract every single page, section, component, and variant must follow. This skill operationalizes those rules and adds mandatory workflow gates so agents never cut corners.

---

## 🛑 Absolute non-negotiables (read first, every time)

These are not guidelines. They are **rules with zero exceptions**:

1. **Colors — only DS tokens.** Every color in TypeScript, TSX, or CSS is a `var(--color-*)` from `src/app/globals.css`. No hex anywhere except inside that file (token definitions). No `rgb()`, no `rgba()`. No default Tailwind palette (`bg-gray-*`, `text-slate-*`, `border-zinc-*`, `bg-blue-500`, etc.). No arbitrary values (`bg-[#abc]`, `text-[#fff]`).
2. **Fonts — only Product Sans.** Loaded via `@font-face` in `globals.css`. Never `next/font/google`. Never a CSS `font-family` override. If you need a weight that isn't 300/400/700/900 — it's not available. Pick an existing weight.
3. **Typography — only `<Heading>` / `<Text>` / `<GradientText>` / `<SectionHeading>`.** No raw `<h1-h6>` with inline styles. No `<p>` with `font-*` / `text-*` classes. No inline `style={{ fontSize }}`.
4. **Arbitrary Tailwind color/text values are banned.** `bg-[#X]`, `text-[Npx]`, `leading-[X]`, `tracking-[X]` — forbidden. Spacing-only arbitraries (`px-[1.5rem]`, `gap-[2rem]`, `w-[10rem]`) are allowed because the design often requires precise Figma rem values.
5. **All user-facing text comes from props — ZERO hardcoded copy in components.** No default strings like `label = "Ils gèrent leur capacité avec AirSaas"` or `copyright = "Made with love in France..."`. No hardcoded button labels, aria-labels, emojis, flags, or localizable text inside the component body. Every string shown to users — titles, subtitles, button labels, placeholders, empty-state messages, aria-labels for prev/next/close, alt text, copyright, social-proof strings — is passed via props by the caller (page / CMS / next-intl). A component's defaults, if any, must be **English or locale-agnostic** ("Previous slide", "Loading"), never French or brand-specific. This rule applies to: `string` props, default param values, conditional rendering of hardcoded strings, and any inline JSX text node.

If you catch yourself about to write hardcoded, STOP. The answer is in `globals.css` — 60+ tokens cover every need. If it genuinely doesn't, you trigger the **Extension process** (below), you do NOT hardcode.

---

## 🔐 Mandatory agent workflow — every UI task goes through these gates

### Gate 1 — Before any code, ASK

If the user's request is ambiguous about **whether it's a new variant or a new component**, the agent MUST ask before writing code. Example:

> User: "Add a dark version of the testimonial card."
>
> Agent (REQUIRED): "Should this be:
> (A) A new `variant="dark"` prop on the existing `TestimonialCard` (cheapest, preferred if the API stays coherent), or
> (B) A new `TestimonialCardDark` component (only if the dark version has structurally different content/props)?
> I lean toward (A) unless you see a reason otherwise."

Never silently pick. Always present the options with a recommendation and wait for confirmation.

Same rule when the user asks to modify an existing component: ask whether the change is:
- A **new variant** of the existing component (new prop value), or
- A **new component** (copy-rename-diverge), or
- A **refactor in place** (behavior change for all consumers).

Each has different implications — don't conflate them.

### Gate 2 — Check what already exists

Before writing a single line:

1. `grep -rn "ComponentName" src/components/library-design/` — is something similar already there?
2. Read `src/app/globals.css` `@theme inline` block — which tokens are available?
3. Read the target location (e.g. `library-design/sections/`) — list existing peers.
4. If a similar component exists, the answer is **extend it** (new prop, new variant) — not create a new one.

The DS has 47+ components. Adding the 48th is a commitment. It must have a clear place in the decision tree of `docs/ds-rules.md`.

### Gate 3 — Write the JSDoc contract FIRST

Every new or modified component gets a JSDoc contract at the top of the file, BEFORE the implementation. No contract = no component. The contract is what tells future agents (and humans) how to use the thing correctly.

Canonical template:

```ts
/**
 * <ComponentName>
 *
 * @purpose    One sentence — what this component is for.
 * @useWhen    2–3 concrete use cases.
 * @dontUse    1–2 anti-cases with the DS alternative to use instead.
 *
 * @limits
 *   - textPropName: max N chars (rationale: visual constraint)
 *   - arrayPropName: M–K items
 *   - numericPropName: bounded range
 *
 * @forbidden
 *   - Do NOT pass className with typography / color overrides — use variant props
 *   - Do NOT nest inside <Other>
 *   - Do NOT [component-specific constraint]
 *
 * @figma node-id 123-45678 (optional, if Figma source exists)
 */
```

The `@limits` and `@forbidden` sections are not optional for components with constrainable inputs. They tell future agents:
- The exact character cap on each text prop
- The exact range for array props
- What `className` overrides will break the design
- What compositions are unsupported

Missing `@limits` = future agent will misuse the component. Write them carefully, based on real visual constraints.

### Gate 4 — Wire runtime validators

For every `@limits` entry, wire the corresponding assertion in the component body:

```ts
import { assertMaxLength, assertArrayBounds, assertOneOf, assertNoClassNameOverride } from "@/lib/ds-validators";

export function MyCard({ title, subtitle, items, className }: Props) {
  assertMaxLength("MyCard", "title", title, 60);
  if (subtitle) assertMaxLength("MyCard", "subtitle", subtitle, 200);
  assertArrayBounds("MyCard", "items", items, 2, 6);
  assertNoClassNameOverride("MyCard", className, ["bg-", "text-", "font-", "p-"]);
  // ...render
}
```

Assertions are dev-only (tree-shaken in prod). If `@limits` says "max 60 chars", you MUST have `assertMaxLength(..., 60)`. No exceptions. Contract without enforcement is a lie.

### Gate 5 — Storybook story (every component)

Every component has a sibling `.stories.tsx` file. Minimum shape:

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MyCard } from "./MyCard";

const meta = {
  title: "UI/MyCard", // or "Sections/MyCard" for section-level
  component: MyCard,
  parameters: { layout: "centered" },
} satisfies Meta<typeof MyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { /* realistic values */ } };

/** Every variant + at least one edge case (long text, empty, loading). */
export const AllVariants: Story = {
  render: () => (/* grid showing all variants */),
};
```

Stories are the second source of truth after the component. They're what a designer / QA / future agent sees when reviewing. A component without stories is invisible to the rest of the team.

### Gate 6 — Playwright visual regression test (MANDATORY for any new page / section / card)

Every new component or page that renders on a live route goes into `tests/visual/`. Minimum — add a snapshot for it:

```ts
// tests/visual/homepage.spec.ts — add a new test block
test("BlogCard — default", async ({ page }) => {
  await page.goto("/fr/blog");
  const card = page.getByTestId("blog-card").first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await expect(card).toHaveScreenshot("blog-card.png");
});
```

If the component has variants, snapshot each. If it's a page, snapshot each major section like `tests/visual/homepage.spec.ts` does.

Then run:
```bash
npm run test:visual:update   # creates new baselines
npm run test:visual          # verify green
```

Commit the new `.png` baselines along with the component. Skipping the Playwright test = skipping the long-term guarantee.

### Gate 7 — Pre-flight verification before declaring done

Run in order, all must pass:

1. `node scripts/ds-audit.mjs` → `✅ clean`
2. `npm run lint` → no warnings in the `dsStrictRules` block
3. `npm run test:visual` → all baselines green
4. Storybook (`http://localhost:6007`) → scroll through new + related stories, no regression
5. Next dev (`http://localhost:3000`) → the rendered page, no console `[DS]` warns from validators
6. `git commit` runs the pre-commit hook → if blocked, fix the rule, never bypass with `--no-verify`

If ANY step fails, the task is NOT done. Return to the failed step.

---

## 🧭 Decision tree — do I need a new component?

For EVERY UI addition, work through this in order:

1. **Can an existing DS component render this?** If yes, use it.
2. **Can an existing component handle it with a NEW PROP or VARIANT?** If yes, ask the user (Gate 1), then extend. Cheapest path.
3. **Can it be COMPOSED from 2-3 existing DS components inline in the page file?** For one-off arrangements. Don't promote to DS yet.
4. **Is this pattern used ≥2 times across pages?** Only then promote to `library-design/sections/` or `library-design/ui/` with full Gate 3–6 treatment.

One-off section → keep inline in the page. Repeated section → promote to DS. Never the reverse.

---

## 📦 Available tokens (always reference — never invent)

All colors, spacing, shadows, radius, typography live in `src/app/globals.css`. Here's the mental map:

### Colors

- **Brand primary scale**: `primary`, `primary-2`, `primary-5`, `primary-10`, `primary-20`, `primary-40`, `primary-60`, `primary-70`, `primary-dark`
- **Secondary / neutral / text**: `secondary`, `secondary-2`, `secondary-5`, `secondary-10`, `secondary-20`, `secondary-40`, `secondary-50`, `secondary-70`, `text-p`, `text-muted`, `foreground`
- **Status**: `success` + `success-10/20/40`, `warning` + `warning-5/10/40`, `prevention` + `prevention-10/20/30/40` + `prevention-ink`, `orange` + `orange-70`, `terracotta`
- **Accents (brand extras)**: `accent-amber`, `accent-coral`, `accent-emerald`, `accent-navy`, `accent-orchid`, `accent-royal`, `accent-sky`, `accent-turquoise`
- **Surfaces**: `background`, `surface-neutral`, `surface-light`, `surface-lavender`, `surface-warm`
- **Tags (Figma 12-variant palette)**: `tag-default-text`/`tag-default-bg`, and `tag-1-text`/`tag-1-bg` through `tag-12-text`/`tag-12-bg`. Consumed via inline style (`var(--color-tag-N-bg)`) because Tailwind can't see dynamically-interpolated class names.

### Shadows

- `--shadow-elevation-sm`, `--shadow-elevation-md`, `--shadow-elevation-lg`
- `--shadow-floating` (navbars, popovers, mobile menus)
- `--shadow-card-hover` (card hover lift)

### Radius

- `--radius`, `--radius-sm`, `--radius-lg`, `--radius-full`

### Typography

- Headings: `--text-h1/h2/h3/h4` (clamped, responsive)
- Body: `--text-paragraph`, `--text-small`
- Micro: `--text-micro-xl/lg/md/sm` (footer, captions, labels)
- Font family: `--font-sans: "Product Sans"` (the only one)
- Weights available: 300, 400, 700, 900 (no 500/600/800 — not loaded)

**If a token you want doesn't exist, DO NOT invent an arbitrary value.** Follow the Extension process below.

---

## 🧱 Typography — use these, nothing else

- `<Heading level={1 | 2 | 3 | 4} gradient="dark-to-primary" | "primary" | "none" align="center" | "left">` — levels 1-3 are Product Sans Black 900, level 4 is Bold 700. Level 4 forbids gradient by design.
- `<Text size="sm" | "md" | "lg" align="left" | "center" maxWidth="Xrem">` — body / paragraph.
- `<GradientText gradient="primary" | "dark-to-primary" | "orange" | "green">children</GradientText>` — inline gradient span inside a Heading or Text. Never as a standalone block heading.
- `<SectionHeading titleGradient subtitle titleDark />` — pre-composed section intro with heading + optional subtitle.

For micro-typography (small labels, footer-like), use Tailwind classes `text-micro-xl`, `text-micro-lg`, `text-micro-md`, `text-micro-sm`. They're responsive clamps and avoid arbitrary `text-[N]`.

---

## 📐 Prop API — the strict convention

Across section frames, use these names (consumer muscle memory):

- `title` — main heading (string)
- `titleHighlight` — gradient portion of title (string)
- `titleSuffix` — trailing dark portion (optional)
- `subtitle` — paragraph below title (never `description` at section level)
- `imageSrc` + `imageAlt` — image + required alt (empty string `""` allowed for decorative)
- `ctaLabel` + `ctaHref` + `ctaVariant` — CTA button props
- `gradient` — enum "primary" | "dark-to-primary" | "orange" | "green" | "none"
- `variant` — component-specific enum ("light"/"dark" for backgrounds, etc.)
- `size` — "xs" | "sm" | "md" | "lg" (buttons) or component-specific

Introducing a new prop name (e.g. `headline` instead of `title`) is a bug — don't do it.

---

## 🏗️ Building a new page / section / landing

### For a new landing page

1. File: `src/components/pages/<Name>Page.tsx` + `<Name>Page.stories.tsx`
2. Mount to a Next.js route if the page needs to be live (`src/app/[locale]/<slug>/page.tsx` that imports and renders the component).
3. Compose from `library-design/sections/*` — Hero, FeatureFrame, ValuePropositionFrame, TestimonialsFrame, CtaHighlightFrame, Footer, etc.
4. Page-level one-off sections live as inline `function SomeSection()` within the page file — only promote to `library-design/sections/` when used on ≥2 pages.
5. Add a `tests/visual/<name>.spec.ts` with snapshots for each major section.
6. Run Gate 7 checklist.

### For a new section pattern

1. Decide: is this a one-off (stays inline in the page) or reusable (`library-design/sections/<Name>Frame.tsx`)?
2. Follow Gate 3–6: JSDoc contract → validators → Storybook story → Playwright.
3. Update `docs/sections-catalog.md` with the new section, its intended use, and its props summary.

### For a new component (card, input, badge, etc.)

1. File: `src/components/library-design/ui/<Name>.tsx` + `<Name>.stories.tsx`
2. Start with the JSDoc contract — it forces you to articulate the exact purpose.
3. Wire validators for every `@limits`.
4. Compose internal structure from existing primitives (`<Heading>`, `<Text>`, `<Button>`, `<GradientText>`, etc.).
5. Storybook `Default` + `AllVariants` stories.
6. Playwright snapshot.
7. Gate 7 checklist.

### For a blog specifically

Expected pieces (not all needed upfront):

- **`BlogCard`** (ui) — thumbnail + tag + title + excerpt + author + date. Use `<Text>` for excerpt, `<Tag variant={1..12}>` for category, `<Heading level={4}>` for title. Alt required on thumbnail.
- **`BlogCardGrid`** (section) — 3-col grid wrapping `<BlogCard>` children. Reuse the grid pattern from `ValuePropositionFrame`.
- **`BlogIndexPage`** (page) — Hero + optional filter tags + `<BlogCardGrid>` + `<CtaHighlightFrame>` + Footer.
- **`BlogPostPage`** (page) — Hero (with `titleHighlight` = post title), `<ProseFrame>` (new — wraps rich text with proper prose styling; model after `FeatureFrame.richContent` prose classes), `<AuthorCard>` (new ui — avatar + name + role + date), `<CtaHighlightFrame>` at the bottom.
- **`AuthorCard`** (ui) — avatar (required alt), name, role, bio snippet.
- **Tag categories** — use existing `<Tag>` with `variant={1..12}` from the Figma palette. Map each category to a fixed variant in a constant.

Before coding any of these, Gate 1 applies — ask:
- Should `BlogPostPage` use the existing `FeatureFrame.richContent` prose pattern, or do we extract a new `ProseFrame` (if blog rich text has styling needs FeatureFrame's doesn't cover)?
- Should `AuthorCard` be new, or a variant of `TestimonialCard` with a different content block?

Don't pick silently.

---

## 🔧 Extension process — when the DS genuinely doesn't cover a need

If after going through Gate 1–2 you're certain no existing component / prop / token fits:

1. **Propose** — describe the gap to the user: what you want to build, which DS piece is closest, why it doesn't fit, what you propose (new prop / new variant / new component / new token).
2. **Wait for approval** — never implement an "extension" unilaterally. The DS is a shared contract; expanding it is a decision.
3. **Implement** with full treatment — Gate 3 (JSDoc contract), Gate 4 (validators), Gate 5 (story), Gate 6 (Playwright), Gate 7 (verification).
4. **Document** — add an entry to `docs/decisions.md` explaining what you added and why. Update `docs/ds-rules.md` decision tree if relevant.

NEVER bypass by hardcoding. If a token doesn't exist and you need a color, the answer is "propose the token", not "use hex this once."

---

## 🚨 Forbidden patterns — with concrete fixes

```tsx
// ❌ FORBIDDEN
<h2 style={{ fontSize: "2rem", fontWeight: 900 }}>Le blog</h2>

// ✅ CORRECT
<Heading level={2}>Le blog</Heading>
```

```tsx
// ❌ FORBIDDEN
<div className="bg-gray-100 text-slate-900 border-zinc-200 p-4">…</div>

// ✅ CORRECT
<div className="bg-surface-neutral text-secondary border-secondary-10 p-4">…</div>
```

```tsx
// ❌ FORBIDDEN — arbitrary color
<span style={{ color: "#FF922B", backgroundColor: "#FFF6D8" }}>⚠</span>

// ✅ CORRECT
<span className="text-orange bg-prevention-20">⚠</span>
```

```tsx
// ❌ FORBIDDEN — inline gradient text
<span style={{ backgroundImage: "var(--gradient-primary)", WebkitBackgroundClip: "text", color: "transparent" }}>
  portfolio
</span>

// ✅ CORRECT
<GradientText gradient="primary">portfolio</GradientText>
```

```tsx
// ❌ FORBIDDEN — optional alt
interface Props { imageSrc: string; imageAlt?: string }

// ✅ CORRECT — explicit decision required
interface Props { imageSrc: string; imageAlt: string /* pass "" for purely decorative */ }
```

```tsx
// ❌ FORBIDDEN — Google font import
import { Inter } from "next/font/google";

// ✅ CORRECT — Product Sans is loaded in globals.css, never add a font here
// (fonts.ts is intentionally empty — if you need a different font, you don't)
```

```tsx
// ❌ FORBIDDEN — arbitrary Tailwind color/text
<button className="bg-[#3C51E2] text-[14px] rounded-[10px]">Cliquer</button>

// ✅ CORRECT
<Button variant="primary" size="sm">Cliquer</Button>
```

```tsx
// ❌ FORBIDDEN — hardcoded French / brand-specific default copy inside the component
export function LogosBar({
  label = "Ils gèrent leur capacité avec AirSaas", // ❌ locale + brand leaked into the DS
  logos,
}: Props) { ... }

export function Footer({
  copyright = "Made with love in France | © 2025 AirSaas · Mentions légales", // ❌ same
}: Props) { ... }

export function Slider() {
  return <button aria-label="Slide précédente">←</button>; // ❌ French aria-label inline
}

// ✅ CORRECT — no defaults, or locale-agnostic English fallback for aria-labels
export function LogosBar({ label, logos }: Props) {
  return (
    <div>
      {label && <span>{label}</span>}  {/* Caller passes the string from i18n / CMS */}
      {/* ...logos */}
    </div>
  );
}

export function Slider({
  slides,
  prevLabel = "Previous slide",  // ✅ English fallback is OK — caller overrides for locale
  nextLabel = "Next slide",
}: Props) { ... }
```

---

## 📚 Reference files — read these when working on UI

- **`docs/ds-components-reference.md`** — **READ THIS FIRST**. Every DS component's `@purpose / @useWhen / @dontUse / @limits / @forbidden` in one file. Regenerate via `python3 scripts/generate-ds-reference.py` after adding or modifying a contract.
- `docs/ds-rules.md` — the source of truth for rules
- `docs/decisions.md` — past architectural choices (dark mode out-of-scope, tag palette aligned Figma, etc.)
- `docs/sections-catalog.md` — catalog of existing section patterns
- `CLAUDE.md` — project-wide rules including DS Strict Mode
- `src/app/globals.css` — ALL tokens (colors, shadows, typography, radius). Always reference before inventing.
- Canonical examples to imitate:
  - `src/components/library-design/ui/Button.tsx` — full prop API + states + JSDoc + validators
  - `src/components/library-design/ui/Tag.tsx` — variant enum + Figma custom palette handling
  - `src/components/library-design/sections/CtaHighlightFrame.tsx` — clean section with JSDoc + GradientText + validators
  - `src/components/library-design/ui/Skeleton.tsx` / `EmptyState.tsx` / `ErrorBoundary.tsx` — state patterns (sparingly used, SSG site)

---

## 🧪 Verification script — run before saying "done"

```bash
node scripts/ds-audit.mjs       # DS rule audit (must be clean)
npm run lint                     # ESLint with DS strict rules
npm run test:visual              # Playwright snapshots (add a new one for your component!)
# Then visual check:
# - http://localhost:6007  (Storybook — scroll through your story)
# - http://localhost:3000  (Next dev — verify the page that uses it)
# - Browser console → no [DS] warnings from validators
```

If you're about to commit, the pre-commit hook will run `lint:ds` automatically. If it fails, fix the violation — never `git commit --no-verify`.

---

## ⚠️ Summary — the 6 things an agent must NEVER do

1. **Never hardcode a color** (hex, rgb, rgba). Use `var(--color-*)` or a DS class.
2. **Never import a new font.** Product Sans or nothing.
3. **Never add a raw `<h1-h6>` / styled `<p>`** with typography. Use `<Heading>` / `<Text>` / `<GradientText>`.
4. **Never hardcode user-facing copy inside a component** (no French default strings, no brand-specific labels, no hardcoded aria-labels). All text comes from props, always.
5. **Never silently decide "new variant vs new component".** Ask the user (Gate 1).
6. **Never ship a component without JSDoc contract + validators + Storybook story + Playwright test.** All four, every time.

The DS is a contract. Every agent — human or AI — follows it. No exceptions.
