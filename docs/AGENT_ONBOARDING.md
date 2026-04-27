# Agent onboarding — AirSaas DS

> **You're a new agent touching UI in this repo. Read this first.** 10-minute
> read. Everything after saves you hours of reverse-engineering.

---

## 1. The 4 docs you must read before writing code

1. **[`docs/ds-rules.md`](ds-rules.md)** — strict-mode rules (non-negotiable)
2. **[`docs/ds-use-cases.md`](ds-use-cases.md)** — pick components by intent ("I need a 3-card cross-sell" → component)
3. **[`docs/ds-components-reference.md`](ds-components-reference.md)** — auto-generated contracts (@limits, @forbidden, @useWhen, @dontUse) for all 64 components
4. **[`docs/legacy-migration.md`](legacy-migration.md)** — legacy → DS mapping for `_legacy/sections/` (22 files still active on `/lp/[slug]`)

For anything extra (architectural decisions, past trade-offs): [`docs/decisions.md`](decisions.md) and [`CLAUDE.md`](../CLAUDE.md).

---

## 2. The 5 non-negotiable rules (enforced by pre-commit hook)

1. **No hex / rgb / rgba in TSX** — only `var(--color-*)` tokens from `src/app/globals.css`
2. **No fonts except Product Sans** — never import `next/font/google`
3. **No raw `<h1-h6>` / `<p>` with typo classes** — use `<Heading>` / `<Text>` / `<GradientText>` / `<SectionHeading>`
4. **No arbitrary Tailwind color/text values** — banned: `bg-[#abc]`, `text-[Npx]`, `leading-[X]`, `tracking-[X]`. Allowed: spacing like `px-[1.5rem]`
5. **No hardcoded user-facing copy inside components** — all strings come from props (English fallbacks OK for aria-labels; French / brand copy always via i18n or CMS)

**Violations block commit**. Fix the rule, never `git commit --no-verify`.

---

## 3. Current state (as of 2026-04-24)

| Metric | Value |
|---|---|
| UI primitives | **36** |
| Section frames | **28** |
| Layout components | **2** (LpNavbar, LpFooter) |
| Blueprint pages in Storybook | 10 (see `src/components/pages/`) |
| Missing contracts | **0** |
| Branch | `ds-site-marianela` — 19 commits ahead of `main` |
| Playwright coverage | 12 DS components + HomePage/BlogIndex snapshots (25/25 green) |
| Overall DS score | **9/10** (production-grade, ready for handoff) |

**Breadth is enough** to rebuild the 26 marketing pages + 63 blog articles without new components, except for `HubspotCtaEmbed` (deferred — see §6).

---

## 4. Decision flow when you need new UI

```
What do I need to render?
│
├─ Intent covered by existing DS component?
│     → Use it. Check @useWhen / @dontUse / @limits first.
│
├─ Close but needs a new variant / prop?
│     → Extension. Invoke the ds-component-builder skill.
│     → Gate 1: ask user "new variant vs new component vs refactor?"
│     → Propose the API, wait for approval, then implement.
│
├─ Pattern used in ≥2 places across pages?
│     → Promote to src/components/library-design/sections/ or ui/
│     → Full Gate 3–7: JSDoc contract + validators + story + Playwright.
│
└─ One-off arrangement for a single page?
    → Keep inline in the page file. Don't promote to DS.
```

**Every UI task** goes through the `ds-component-builder` skill. It enforces Gate 1–7 (ask → check existing → JSDoc contract → validators → story → Playwright → verify). Never write UI code without invoking it.

---

## 5. Common pitfalls (real issues from the last session)

### 5.1 TabsFrame / TocSidebar need `id` on target sections
Every section frame that TabsFrame/TocSidebar scroll-spies to needs an `id` prop. 17 frames accept it (added 2026-04-24). Pattern:

```tsx
<TabsFrame tabs={[{label: "Gains", href: "#gains"}, ...]} />
<ValuePropositionFrame id="gains" ... />    // ← scroll target
<PillarFrame id="approche" ... />
<FaqFrame id="faq" ... />
```

See **`TabsFrame / WithScrollTargets`** story in Storybook for the canonical pattern.

### 5.2 Heading gradient order is bipolar
Some frames render primary-gradient FIRST (`PillarFrame`, `StepsFrame`, `RelatedSolutionsFrame`, `TabsFrame`, `TestimonialsFrame`, `BlogRelatedFrame`, `ValuePropositionFrame`, `HighlightFrame`, `IconRowFrame`, `SliderFrame`), others LAST (`ClientsFrame`).

**Check each frame's `@purpose` JSDoc** before composing the heading. Don't assume.

### 5.3 Padding consistency — ✅ resolved
All 17 content section frames now use `lg:px-[10rem]` consistently. Harmonized in commit `b5a3596` (`ValuePropositionFrame` + `TestimonialsFrame` brought from `lg:px-[5rem]` to `lg:px-[10rem]`, HomePage Playwright snapshot regenerated). If you see a frame drifting, flag it.

### 5.4 BlogRelatedFrame vs RelatedArticlesFrame (not duplicates)
- `<BlogRelatedFrame>` — 3 cards with thumbnail + excerpt + author byline (image-first grid)
- `<RelatedArticlesFrame>` — 3–10 text-only outbound links with external icon (list style)

Both go at the end of a blog article. Pick based on content type.

### 5.5 TocSidebar vs TableOfContentsFrame (not duplicates)
- `<TocSidebar>` — left-column sticky sidebar, desktop-only, IntersectionObserver scroll-spy. For articles ≥ 5 h2 sections.
- `<TableOfContentsFrame>` — centered inline card at the top, horizontal pills. For shorter articles (3-4 h2s).

### 5.6 `BlogPostPage` template still uses old TOC + Related
Yet to be updated to use `TocSidebar` + `BlogRelatedFrame`. When you touch the blog post template, swap them. Pending because it has visual impact that should be validated with Figma/user first.

### 5.7 i18n bipolar — blog uses `next-intl`, marketing hardcodes French
`BlogIndexPage` + `BlogPostPage` use `useTranslations()`. `HomePage`, `PmoToolPage`, `CapacityPlanningPage`, etc. hardcode French inline.

**When building a new marketing page**: pick one convention consistent with the page's neighbors. If no neighbors, use inline French for now — the migration to next-intl is hors-DS work.

### 5.8 `_legacy/sections/` still active on `/lp/[slug]`
22 legacy sections drive the current LP route. See [`docs/legacy-migration.md`](legacy-migration.md) for the 1:1 mapping. LP rebuild order:
1. `/lp/ppm` (canonical reference → clone [`LpExamplePage.tsx`](../src/components/pages/LpExamplePage.tsx))
2. `/lp/pmo` (adds ecosystem logos)
3. `/lp/capacity-planning` (adds `StepsFrame × 2`)
4. `/lp/pi-planning` (adds `ComparisonDualFrame` + `ComparisonTableFrame`)

After all 4 are migrated, delete `_legacy/sections/` in a cleanup commit.

---

## 6. What's deferred — don't duplicate work

| Item | Why deferred | What to do when you hit it |
|---|---|---|
| `HubspotCtaEmbed` | ✅ **Approved for build (backlog)** — was previously deferred but proposal accepted (see §11 A2). 8 blog articles use the pattern, ≥2 threshold cleared. Build before Phase 1 blog rebuild to avoid inline tech debt. | New `library-design/ui/HubspotCtaEmbed.tsx`: props `portalId`, `ctaId`, optional `fallbackHref` + `fallbackLabel`. Singleton script loader (`window.__hsctaLoaderInjected` flag, NOT one script per CTA). `<Skeleton>` loading state. Fallback `<Button variant="primary">` if JS blocked. `@useWhen` scoped to `BlogArticleBody` only. Tests cover 3 paths: success / script-blocked / no-JS. |
| Strapi content-type `article` | Schema not defined. Blocks content migration but not DS rebuild. | Propose schema + generate TypeScript types before wiring pages. |
| `src/components/cms/ArticleBodyRenderer` | Blocks → DS components glue. Only needed when Strapi is wired. | Map block types (`rich-text`, `figure`, `blockquote`, etc.) to DS components (Heading, Text, IllustrationFrame, Quote, etc.). |
| ~~Playwright snapshots for 11 new components~~ | ✅ **Resolved (commit `b5a3596`)** | `tests/visual/ds-components-storybook.spec.ts` covers the 11 components + `LpExamplePage` blueprint. 12 baselines committed. Run `npm run test:visual` (Storybook auto-started by playwright.config webServer). |
| ~~`B3` padding harmonize (`lg:px-[5rem]` → `10rem`)~~ | ✅ **Resolved (commit `b5a3596`)** | All 17 content section frames now use `lg:px-[10rem]`. |
| `BlogPostPage` template swap (TOC + Related) | Visual regression on blog routes. | Validate with user/Figma first, then swap to `TocSidebar` + `BlogRelatedFrame`. |

---

## 7. Verification before every commit

Run in order — **all must pass**:

```bash
node scripts/ds-audit.mjs        # DS strict-mode audit (blocks on hex, raw headings, Google fonts)
npm run lint                      # ESLint + DS strict rules (blocks on inline fontSize, arbitrary Tailwind)
npx tsc --noEmit                  # TypeScript check (ignore pre-existing errors in pages/ that aren't yours)
python3 scripts/generate-ds-reference.py   # Regenerate docs/ds-components-reference.md after any JSDoc change
```

Then:
- Verify visually in Storybook (http://localhost:6007)
- For page-level changes: verify in Next dev (http://localhost:3000)
- Check the browser console — no `[DS]` warnings from runtime validators

The pre-commit hook runs `ds-audit.mjs` automatically. If it fails: **fix the rule, never bypass with `--no-verify`**.

---

## 8. Canonical composition templates

### LP (landing page — 4 routes: ppm / pmo / capacity-planning / pi-planning)
Clone [`src/components/pages/LpExamplePage.tsx`](../src/components/pages/LpExamplePage.tsx). It composes the 12 frames the 4 LPs need, in canonical order, with realistic placeholder content.

### Blog article
See [`docs/ds-use-cases.md`](ds-use-cases.md) "Canonical blog article composition" section for the TocSidebar + ProseFrame + editorial primitives layout.

### Existing reference pages in `src/components/pages/*.stories.tsx`
- `HomePage` — canonical HomePage with HeroTabs + 9 ClientsFrame + FeatureFrame × N
- `PmoToolPage` — Équipes page with ClientsFrame + TestimonialsFrame pattern
- `CapacityPlanningPage` / `OutilsPilotageProjetPage` / `PriorisationEquipesPage` / `RevuePortefeuillePage` / `TraductionOneClickPage` — Produit / Solution pages
- `BlogIndexPage` / `BlogPostPage` — blog templates (⚠️ BlogPostPage uses old TOC/Related, see §5.6)

---

## 9. Invoke the skill — always

When you're about to write **any** UI code — new page, new section, new variant, refactor — invoke the `ds-component-builder` skill first:

```
Skill: ds-component-builder
Args: <brief description of what you're building>
```

It enforces Gate 1 (ask before coding), Gate 2 (check existing), Gate 3 (JSDoc contract first), Gate 4 (runtime validators), Gate 5 (Storybook story), Gate 6 (Playwright snapshot), Gate 7 (pre-flight verification).

**Skipping the skill is the single biggest way to produce code that doesn't match the rest of the DS.** The skill is strict; it will ask you questions; answer them.

---

## 10. When in doubt

- **Visual reference**: open Storybook (`npm run storybook` → http://localhost:6007)
- **Live reference**: airsaas.io/fr — the site we're rebuilding
- **Contract reference**: [`docs/ds-components-reference.md`](ds-components-reference.md) (auto-generated, always current)
- **Tokens reference**: `src/app/globals.css` — all colors, shadows, radius, typography
- **Ask the user**: if a sub-decision could go two ways (variant vs new component, etc.), Gate 1 says **ask first, never silently pick**

---

## What success looks like

By the time you're done with a UI task:

- [ ] `node scripts/ds-audit.mjs` → `✅ clean`
- [ ] `npm run lint` → no new warnings
- [ ] `npx tsc --noEmit` → no new errors (pre-existing in `pages/` are not yours)
- [ ] New component has JSDoc contract with `@purpose / @useWhen / @dontUse / @limits / @forbidden`
- [ ] New component has runtime validators wired to `@limits`
- [ ] New component has at least Default + one edge-case Storybook story
- [ ] New component uses only DS primitives + tokens (no hex, no Google Fonts, no raw `<h1-h6>`)
- [ ] All user-facing strings are props (no hardcoded French / brand copy)
- [ ] `docs/ds-components-reference.md` regenerated
- [ ] Visual verified in Storybook at 1440×900 + mobile (375×812)
- [ ] Pre-commit hook passed

**If all 10 boxes are checked**, the code is DS-compliant and ready to merge. Welcome to the team.

---

## 11. Active proposals — review log

Living section. Append every proposal that needs a DS-level decision so the next agent has the reasoning trail (not just the final state).

### A1 — `TestimonialsFrame.min` 2 → 1 — ❌ rejected (2026-04-27)

**Proposed by**: external agent reviewing 26-pages audit residuals.
**Scope**: 3 pages with a single testimonial (1 LP + 1 Équipes + 1 Solution).
**Verdict**: **rejected**. Reasons:

1. Contradicts current `@dontUse`: the contract explicitly says "for a single hero testimonial — just render a `<TestimonialCard>` inline".
2. A "frame" is a grid wrapper. A grid of 1 cell is a fork (need a centered single-card layout) that adds branching logic + breaks the "frames render grids" mental model.
3. Solution exists already: pages with 1 testimonial compose inline:
   ```tsx
   <section className="...same padding shape as TestimonialsFrame...">
     <SectionHeading titleHighlight="..." title="..." />
     <TestimonialCard {...quote} className="max-w-[42rem] mx-auto" />
   </section>
   ```
4. If the inline pattern repeats ≥ 2 sites after rebuild → promote to a NEW dedicated `<SingleTestimonial>` ui-component, don't bend the frame.

**Action**: external agent updates the 3 page templates to use the inline pattern. Frame contract stays at min=2.

### A2 — `HubspotCtaEmbed` build — ✅ approved (2026-04-27)

**Proposed by**: external agent reviewing blog audit residuals.
**Scope**: 8 blog articles with HubSpot lead-magnet (whitepaper / demo book / etc.).
**Verdict**: **approved**, build BEFORE Phase 1 (blog rebuild). Effort S (~60 lines).

**Refinements added to original proposal**:
1. Singleton script loader — guard via `window.__hsctaLoaderInjected` flag so the script `js.hscta.net/cta/current.js` is injected once (not 8 times if 8 CTAs render on the same article — rare but possible).
2. Loading state — wrap container in `min-h-[3rem]` with `<Skeleton>` placeholder while script loads.
3. Tests cover 3 paths: success (script + CTA renders), failure (adblock / CSP — fallback Button shown with `fallbackHref`), no-JS (server-rendered fallback).

**Status**: see §6 row "HubspotCtaEmbed" — backlog item ready for build by next agent.
