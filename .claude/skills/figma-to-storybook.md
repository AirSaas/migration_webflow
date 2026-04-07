---
name: figma-to-storybook
description: Methodology for building a design system from Figma to Storybook using atomic design (Primitives + Blocks)
---

# Figma to Storybook — Design System Methodology

## Architecture

We follow an **atomic design** approach with two layers:

```
Primitives (atoms)  →  Blocks (section templates)  →  Pages
```

### Primitives (`src/ds/primitives/`)

Small, reusable UI elements that cannot be broken down further:
- Buttons, tags/badges, headings, text, icons
- Decorative elements (backgrounds, floating cards, illustration frames)
- Each primitive has variants (not separate components)

### Blocks (`src/ds/blocks/`)

Composed section templates built entirely from Primitives:
- Hero, CTA, FAQ, Feature Row, Testimonials, Comparison, etc.
- A Block is a full-width page section ready to be dropped into a page
- Blocks are props-driven — all content is passed in, no hardcoded text

### Pages

Pages are assembled by stacking Blocks. Pages are NOT part of the design system — they live in the Next.js app router (`src/app/`).

## Storybook Structure

```
Foundation/
├── Colors              ← Full palette reference (hex + token names + gradients)
└── Typography          ← Font weights, heading scale, gradient text

Primitives/
├── Tag
├── Heading
├── Text
├── Button
├── IllustrationFrame
├── FloatingCard
├── EllipseBackground
└── GradientBackground

Blocks/
├── Hero
├── ValueProposition
├── FeatureRow
├── Comparison
├── Testimonials
├── Faq
├── CtaSplit
└── CtaStacked
```

## File Organization

```
src/ds/
├── primitives/
│   ├── Tag.tsx
│   ├── Tag.stories.tsx
│   ├── Heading.tsx
│   ├── Heading.stories.tsx
│   ├── ...
│   └── index.ts              ← barrel export
├── blocks/
│   ├── Hero.tsx
│   ├── Hero.stories.tsx
│   ├── ...
│   └── index.ts              ← barrel export
└── utils.ts                   ← shared helpers (cn, etc.)
```

## Component Creation Rules

### 1. Variants over new components

If a visual variation can be expressed as a prop variant, it is NOT a new component.
- A blue button and an orange button → same `Button` component with `variant: 'primary' | 'secondary'`
- A light tag and a green tag → same `Tag` component with `variant: 'muted' | 'success'`
- Challenge every new component: "Is this really new, or just a variant?"

### 2. Our names, not Figma layer names

We define our own component names. Figma layer names are internal references only.
- Figma "Primary Button medium" → our `Button` with `variant="primary" size="md"`
- Figma "tag" → our `Tag`
- Figma "H1" → our `Heading` with `level={1}`

### 3. Design tokens first — ZERO hardcoded values

**Colors**: Always use `var(--color-xxx)` via Tailwind classes or inline styles. NEVER hardcode hex values.
- `bg-primary` not `bg-[#3a51e2]`
- `text-foreground` not `text-[#041230]`
- `bg-success-10` not `bg-[#e6fcf0]`
- If a Figma color has no token → add it to `globals.css` FIRST, then reference it

**Typography**: Always use `var(--text-xxx)` scale tokens. NEVER hardcode font sizes.
- `text-[var(--text-h1)]` not `text-[95px]` or `text-[clamp(2.5rem,5vw,5.9375rem)]`
- `text-[var(--text-paragraph)]` not `text-[25px]`
- Available tokens: `--text-h1`, `--text-h2`, `--text-h3`, `--text-h4`, `--text-paragraph`, `--text-small`

**Gradients**: Always use `var(--gradient-xxx)` tokens. NEVER hardcode gradient strings.
- `var(--gradient-dark-to-primary)` not `linear-gradient(36deg, #061333 20%, #3c51e2 124%)`
- `var(--gradient-primary)` not `linear-gradient(55deg, #3c51e2 20%, #3547c6 124%)`
- `var(--gradient-hero-bg)` / `var(--gradient-cta-bg)` for background gradients

**Token source of truth**: `src/app/globals.css` — all CSS custom properties defined in `@theme inline {}`

### 4. Generic props

Components accept all content via props. No hardcoded text, no hardcoded locale.
- Stories provide example content (can be French for default story)
- Multiple story variants show different content/configurations

### 5. Figma extraction workflow

For each component:
1. **Get design context**: Use `get_design_context` on the Figma node
2. **Read the screenshot**: Understand the visual target
3. **Adapt**: Convert Figma-generated code to use project tokens and patterns
4. **Create component**: `.tsx` file with TypeScript props interface
5. **Create story**: `.stories.tsx` with default + variant stories
6. **Verify**: Check in Storybook that it matches the Figma screenshot

### 6. Composition pattern

Blocks import Primitives. Never duplicate primitive code inside a block.

```tsx
// src/ds/blocks/Hero.tsx
import { Tag } from '@/ds/primitives/Tag'
import { Heading } from '@/ds/primitives/Heading'
import { Button } from '@/ds/primitives/Button'
// ... compose them
```

### 7. Story conventions

- Stories use `satisfies Meta<typeof Component>` for type safety
- Default story shows the most common usage
- Variant stories show alternative configurations
- Story titles follow: `Primitives/ComponentName` or `Blocks/ComponentName`

## Hero Anatomy (18 components → ~10 unique Primitives)

From the Figma Hero specification:

| # | Figma Layer | Primitive | Type |
|---|------------|-----------|------|
| 1 | Hero | Block (not a primitive) | Section container |
| 2 | Ellipse background | `EllipseBackground` | Decorative |
| 3 | gradient background | `GradientBackground` | Decorative |
| 4 | Wrapper Hero | (internal layout) | Not a component |
| 5 | Navbar | (separate concern) | Layout component |
| 6 | Cont | (internal layout) | Not a component |
| 7 | tag | `Tag` variant="muted" | Pill badge |
| 8 | H1 | `Heading` level={1} | Typography |
| 9 | Paragraph | `Text` | Typography |
| 10 | Primary Button medium | `Button` variant="primary" size="md" | Interactive |
| 11 | Secondary Button medium | `Button` variant="secondary" size="md" | Interactive |
| 12 | tag | `Tag` variant="success" | Pill badge |
| 13 | tag | `Tag` variant="success" | Pill badge |
| 14 | illustration frame | `IllustrationFrame` | Container |
| 15 | Illustration | (just an `<img>`) | Not a component |
| 16 | floating card | `FloatingCard` | Decorative |
| 17 | floating card | `FloatingCard` | Decorative |
| 18 | floating card | `FloatingCard` | Decorative |

## Cross-section reuse (homepage analysis)

These primitives appear across the full homepage:
- `Tag`: 144 occurrences across all sections
- `Button` (primary): 102 occurrences
- `FloatingCard`: 222 occurrences
- `Heading`: 162 occurrences
- `Text`/Paragraph: 159 occurrences
- `IllustrationFrame`: 49 occurrences

This validates the atomic approach — building these once as primitives saves massive duplication.
