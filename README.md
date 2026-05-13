# AirSaaS — Webflow to Next.js Migration

Migration of [airsaas.io](https://www.airsaas.io) from Webflow to **Next.js 15** (App Router) + **Strapi 5** (headless CMS).

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React 19) |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5 |
| CMS | Strapi 5 (REST API, Dynamic Zones) |
| i18n | next-intl — 7 locales: `fr` (default), `en`, `es`, `de`, `pt`, `it` |
| Component dev | Storybook |
| Images | next/image (optimized) |
| Fonts | Product Sans, Font Awesome 6 (local, `public/fonts/`) |
| Deployment | Vercel |

## Project Structure

```
├── src/
│   ├── app/                          ← Next.js App Router (pages & layouts)
│   │   ├── layout.tsx                ← Root layout
│   │   ├── page.tsx                  ← Homepage (assembles ds/compositions)
│   │   └── globals.css               ← Tailwind theme & global styles
│   │
│   ├── ds/                           ← 🎨 DESIGN SYSTEM (active)
│   │   ├── primitives/               ← Base components (Button, Heading, Text, Tag, Navbar…)
│   │   ├── blocks/                   ← Assembled sections (Hero, Footer, CtaFrame, FaqFrame…)
│   │   ├── compositions/             ← Full page compositions (HomePage…)
│   │   ├── foundation/               ← Design tokens stories (Colors, Typography)
│   │   └── utils.ts                  ← DS utility functions
│   │
│   ├── components/
│   │   └── _legacy/                  ← Old components (reference only — DO NOT USE)
│   │
│   ├── data/                         ← Hardcoded page data (will be replaced by Strapi)
│   ├── lib/
│   │   ├── utils.ts                  ← cn() utility (clsx + tailwind-merge)
│   │   ├── fonts.ts                  ← Font configuration
│   │   ├── strapi.ts                 ← Strapi API client
│   │   └── metadata.ts              ← SEO helpers
│   └── i18n/                         ← next-intl routing config (backed up in _backup/)
│
├── _backup/                          ← Backup of i18n routing (pre-redesign)
├── messages/                         ← i18n translations (fr.json, en.json…)
├── public/
│   ├── assets/                       ← Static images from Webflow
│   └── fonts/                        ← Product Sans + Font Awesome 6
├── backend/                          ← Strapi 5 instance
├── docs/                             ← Project documentation
├── .storybook/                       ← Storybook configuration
└── package.json
```

## Design System — `src/ds/`

The design system is organized in 3 layers:

### Primitives (`ds/primitives/`)
Atomic building blocks — the smallest reusable components.

| Component | Description |
|-----------|-------------|
| `Button` | CTA buttons with variants |
| `Heading` | Typography headings |
| `Text` | Body text |
| `Tag` | Labels & badges |
| `Navbar` | Navigation bar |
| `LogosBar` | Client logos strip |
| `FeatureCard` | Feature highlight card |
| `TestimonialCard` | Customer testimonial |
| `FloatingCard` | Animated floating card |
| `CardCta` | CTA card |
| `ListCard` | List-based card |
| `ListInline` | Horizontal list |
| `IconIllustration` | Icon + illustration |
| `IllustrationFrame` | Illustration container |
| `AnimateOnScroll` | Scroll-triggered animation |
| `EllipseBackground` | Decorative ellipse |
| `GradientBackground` | Gradient backdrop |

### Blocks (`ds/blocks/`)
Page sections that compose primitives into complete, reusable blocks.

| Block | Description |
|-------|-------------|
| `Hero` | Hero section with CTA |
| `Footer` | Site footer |
| `FeatureFrame` | Feature showcase section |
| `CtaFrame` | Call-to-action section |
| `FaqFrame` | FAQ accordion section |
| `ComparisonFrame` | Comparison layout |
| `TestimonialsFrame` | Testimonials section |
| `ValuePropositionFrame` | Value proposition section |

### Compositions (`ds/compositions/`)
Full page assemblies that combine blocks into complete pages.

| Composition | Description |
|-------------|-------------|
| `HomePage` | Complete homepage layout |

## Storybook

Every component has a `.stories.tsx` file for isolated development and visual QA.

```bash
# Start Storybook
npm run storybook
# → http://localhost:6006

# Build static Storybook (output in storybook-static/, gitignored)
npm run build-storybook
```

## How Content Works

### Strapi 5 (CMS)

All visible page content will come from Strapi via REST API. Strapi uses **Dynamic Zones** — each page is a list of section blocks, and each block maps to a React component from `src/ds/blocks/`.

```
Strapi Dynamic Zone → API response → Page → ds/blocks/ components
```

**Components must use typed props** — no hardcoded content. Content will come from Strapi:

```tsx
interface HeroProps {
  badge?: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  image: { src: string; alt: string }
}

export function Hero({ badge, title, description, ctaLabel, ctaHref, image }: HeroProps) {
  // render UI — no hardcoded text
}
```

### next-intl (i18n)

The site supports 7 locales. Content translations are handled by Strapi (per-locale API responses). Only layout micro-text (nav labels, button labels, footer text) uses next-intl JSON files in `messages/`.

Components don't need to worry about i18n — just render whatever string props they receive.

### Routing

- Pages live in `src/app/` — locale routing will be re-integrated later
- The i18n routing setup is backed up in `_backup/` for when we wire it back
- Dynamic pages will use `[slug]` segments

## Legacy Code

| Folder | Purpose |
|--------|---------|
| `src/components/_legacy/` | Old component library — reference only, do not use |
| `_backup/` | Old i18n routing files — will be re-integrated later |
| `docs/_legacy-design-system.md` | Old design system docs |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Start Storybook (component development)
npm run storybook
# → http://localhost:6006

# Start Strapi (separate terminal)
cd backend && npm run develop
# → http://localhost:1337/admin
```

## Blog Migration v8 (Multi-Agent Pipeline)

The 62 blog articles are migrated from Webflow to Next.js using an 8-node multi-agent pipeline (3 LLM + 5 deterministic) built on the Claude Agent SDK. Goal: 100% visual fidelity to the Figma template `303:1015` with zero hallucinations.

### Sources of truth

| Layer | Source |
|---|---|
| Content (text, blocks, order) | Webflow live HTML in Supabase `airsaas_pages_rebuild` |
| CMS toggles (FAQ hidden, newsletter, custom CTA) | Webflow API v2 (`WEBFLOW_API_TOKEN` in `.env.local`) |
| Design (variants, colors, layout) | Figma template `303:1015` |
| Acceptance rules | `docs/blog-design-rules.yaml` |

### Design rules workflow

`docs/blog-design-rules.yaml` is edited **by Claude only**, never directly by humans. When Marianela (or anyone) wants a new rule, they describe it **in chat** (free-form), and Claude translates it to YAML.

### Pipeline commands

```bash
npm run blog:registry          # Generate machine-readable DS Registry
npm run blog:audit-ds-gaps     # Pre-flight Figma vs DS audit
npm run blog:migrate           # Run pipeline on all 62 articles
npm run blog:migrate -- --slugs=metier-pmo,pi-planning  # Subset
```

Detailed plan in `tasks/todo.md`, full agent specs in `CLAUDE.md`.

## Documentation

| File | Content |
|------|---------|
| `docs/sections-catalog.md` | Full inventory of all pages and their sections |
| `docs/decisions.md` | Architectural decisions log |
| `docs/blog-design-rules.yaml` | Blog acceptance rules (Claude-maintained) |
| `docs/_legacy-design-system.md` | Old design system reference |
| `CLAUDE.md` | AI assistant project rules |
| `tasks/todo.md` | Current migration plan |
