# Legacy → DS migration map

**Status**: in progress. The LP route `/[locale]/(lp)/lp/[slug]/page.tsx` still imports from `src/components/_legacy/sections/`. This doc maps every legacy section to its DS equivalent so the next agent can migrate LP pages without guessing.

**Goal**: kill `src/components/_legacy/sections/` once every LP + Produit + Équipes + Solution page has been rebuilt with DS components.

---

## Migration table

| Legacy component | DS equivalent | Notes |
|---|---|---|
| `_legacy/sections/HeroTabbed.tsx` | `<Hero>` + `<TabsFrame>` | Two components: Hero for the eyebrow + H1 + illustration, TabsFrame for the 3–6 anchor tabs right after. The tabs are scroll-spy-aware via IntersectionObserver. Section targets need `id` props (now supported). |
| `_legacy/sections/HeroSplit.tsx` | `<Hero>` | Hero already handles split layout via `variant` / `imageSrc` props. |
| `_legacy/sections/HeroAnimated.tsx` | `<Hero>` | Same Hero, pass `variant="tabbed"` or similar. Animation via `<AnimateOnScroll>`. |
| `_legacy/sections/HowItWorks.tsx` | `<StepsFrame>` | 3–5 numbered sequential steps with chevron connectors. Replaces legacy sequential lists. |
| `_legacy/sections/PainPoints.tsx` | `<ComparisonFrame>` | "Sans" / negative-context list, 3–8 items. Use the solo (sans-only) usage pattern. |
| `_legacy/sections/BenefitsGrid.tsx` | `<ValuePropositionFrame>` OR `<PillarFrame>` | ValuePropositionFrame for icon-first feature cards, PillarFrame for 2–6 methodology pillars. |
| `_legacy/sections/FeatureRow.tsx` | `<FeatureFrame>` | `imagePosition="left"` / `"right"`, `layout="inline"`. |
| `_legacy/sections/FeatureChecklist.tsx` | `<FeatureFrame>` + `<CheckList>` | Pass checklist items via the richContent slot or a dedicated checklist prop. |
| `_legacy/sections/FeatureNumberedList.tsx` | `<FeatureFrame>` + numbered `<ListInline>` | Feature frame with numbered rich content. |
| `_legacy/sections/Stats.tsx` / `LpStats.tsx` | `<ValuePropositionFrame columns=4>` + `<FeatureCard>` | Stats row = 4-column grid of FeatureCards with metric + label. |
| `_legacy/sections/TrustBadges.tsx` | `<ValuePropositionFrame>` or `<IconRowFrame>` | ValuePropositionFrame for richer trust cards (ISO / France / SOC2 / SSO), IconRowFrame for a compact horizontal logo strip. |
| `_legacy/sections/LogoBar.tsx` | `<LogosBar>` | Naming normalized (`LogoBar` → `LogosBar`). Same purpose. |
| `_legacy/sections/TestimonialCards.tsx` | `<TestimonialsFrame>` + `<TestimonialCard>` | Frame provides grid + heading; cards handle quote + pill with name/role/avatar + optional `readMore` truncation. |
| `_legacy/sections/CustomerStories.tsx` | `<ClientsFrame>` + `<ClientCard>` | For dense 6–9 client grids (PmoToolPage-style). Use TestimonialsFrame for 2–6 quote cards instead. |
| `_legacy/sections/QuoteCards.tsx` | `<Quote variant="card">` (default) or `<Quote variant="pull">` | Card for framed testimonial quote; pull for chrome-less editorial style. |
| `_legacy/sections/ComparisonGrid.tsx` | `<ComparisonDualFrame>` | Avec/sans paired rows with numbered emoji. |
| `_legacy/sections/ComparisonTable.tsx` | `<ComparisonTableFrame>` | 3-competitor feature comparison table. |
| `_legacy/sections/FaqAccordion.tsx` | `<FaqFrame>` | Already accordion; 2–12 items per frame. |
| `_legacy/sections/LpFinalCta.tsx` | `<CtaHighlightFrame>` (single CTA) or `<CtaFrame>` + `<CardCta>` (dual) | CtaHighlightFrame for the single primary ask; CtaFrame + 2× CardCta when the page offers two parallel options (demo + guide). |
| `_legacy/sections/CtaBanner.tsx` | `<CtaHighlightFrame>` | Full-width closing ask. |
| `_legacy/sections/SectionHeading.tsx` | `<SectionHeading>` (`library-design/ui/SectionHeading`) | Same name but the DS one lives under `library-design/`. Check import path. |

---

## DS component coverage matrix (post-Fase A–C)

| Pattern | Primary DS component | Variants | Status |
|---|---|---|---|
| Hero | `<Hero>` | split / centered / dual-CTA | ✅ stable |
| Hero-adjacent anchor tabs | `<TabsFrame>` | light / dark / sticky | ✅ new |
| Sequential numbered steps | `<StepsFrame>` | light / dark | ✅ new |
| Methodology pillars | `<PillarFrame>` | light / dark / columns 2-3 | ✅ stable |
| Feature + illustration | `<FeatureFrame>` | inline / stacked / prose-long (richContent) | ✅ stable |
| Feature cards grid | `<ValuePropositionFrame>` | columns 2–6 | ✅ relaxed |
| Trust / security icon row | `<IconRowFrame>` | 3–8 items | ✅ relaxed |
| "Sans" pain points | `<ComparisonFrame>` | solo | ✅ relaxed |
| Avec/sans paired comparison | `<ComparisonDualFrame>` | — | ✅ stable |
| 3-competitor feature table | `<ComparisonTableFrame>` | — | ✅ stable |
| Zigzag highlight editorial | `<HighlightFrame>` | — | ✅ stable |
| Carousel / slider | `<SliderFrame>` | light / dark · 2–8 slides | ✅ relaxed |
| Dense client grid (6–9) | `<ClientsFrame>` + `<ClientCard>` | light / tinted + collection CTA | ✅ new |
| Quote testimonials (2–6) | `<TestimonialsFrame>` + `<TestimonialCard>` | quote 400 + read-more | ✅ relaxed |
| Press / company card | `<TestimonialsFrame>` + `<TestimonialCompanyCard>` | optional href | ✅ relaxed |
| Editorial pull-quote | `<Quote variant="pull">` | card / pull | ✅ extended |
| Key-takeaway box | `<InsightCallout>` | primary / success / warning | ✅ new |
| Inline CTA in body | `<InlineCta>` | — | ✅ new |
| Figure + caption (blog/prose) | `<IllustrationFrame>` + caption | warm tone + figcaption | ✅ extended |
| Long-form prose body | `<ProseFrame>` / `<BlogArticleBody>` | reading / wide + light / tinted | ✅ new |
| Sticky article TOC | `<TocSidebar>` | h2-only / h2+h3 | ✅ new |
| Related articles footer (3 blog cards) | `<BlogRelatedFrame>` | light / tinted + collection CTA | ✅ new |
| Related solutions footer (3 image cards) | `<RelatedSolutionsFrame>` | light / tinted + collection CTA | ✅ new |
| Outbound "Pour aller plus loin" text links | `<RelatedArticlesFrame>` | 3–10 links | ✅ stable |
| Mid-page closing CTA | `<CtaHighlightFrame>` | — | ✅ stable |
| Dual CTA cards | `<CtaFrame>` + `<CardCta>` | ctaThumbnail | ✅ extended |
| FAQ accordion | `<FaqFrame>` | 2–12 items | ✅ relaxed |
| Logos strip | `<LogosBar>` | — | ✅ stable |
| Footer | `<Footer>` | — | ✅ stable |

---

## Scroll-spy ids (new infra, Fase D-#1 commit)

Every section frame now accepts an optional `id?: string` prop that renders as `<section id={id}>`. This is the anchor target for `<TabsFrame>` scroll-spy and `<TocSidebar>` scroll-spy.

**Usage pattern for LP migration**:

```tsx
<Hero .../>
<TabsFrame tabs={[
  { label: "Capacity planning", href: "#capacity" },
  { label: "Scénarios", href: "#scenarios" },
  { label: "Sécurité", href: "#securite" },
]} />

<FeatureFrame id="capacity" ... />       {/* TabsFrame scroll target */}
<FeatureFrame id="scenarios" ... />
<IconRowFrame id="securite" ... />
```

Frames that accept `id`:
- `<FeatureFrame>`, `<FeatureSectionStacked>`, `<PillarFrame>`, `<ValuePropositionFrame>`, `<HighlightFrame>`, `<StepsFrame>`, `<IconRowFrame>`, `<ComparisonFrame>`, `<ComparisonDualFrame>`, `<ComparisonTableFrame>`, `<TestimonialsFrame>`, `<ClientsFrame>`, `<RelatedSolutionsFrame>`, `<FaqFrame>`, `<SliderFrame>`, `<CtaFrame>`, `<CtaHighlightFrame>`.

Frames that are navigators themselves (no `id`): `<TabsFrame>`, `<TocSidebar>`, `<TableOfContentsFrame>`.

Body wrappers (no `id` — content goes via children with their own ids): `<BlogArticleBody>`, `<ProseFrame>`, `<Hero>`, `<Footer>`, `<BlogHero>`, `<BlogCollectionFrame>`, `<BlogRelatedFrame>`, `<RelatedArticlesFrame>`.

---

## LP rebuild order (recommended)

Once the next agent starts migrating LPs from legacy → DS, rebuild in this order:

1. **`/lp/ppm`** — 7 features, canonical LP shape. Becomes the reference template.
2. **`/lp/pmo`** — adds ecosystem logos + deploy steps.
3. **`/lp/capacity-planning`** — adds 2× StepsFrame usage (idea → scenario + deployment).
4. **`/lp/pi-planning`** — adds `<ComparisonDualFrame>` + `<ComparisonTableFrame>` (competitors).

After the 4 LPs are migrated, delete `src/components/_legacy/sections/` in a single cleanup commit. Update `src/app/[locale]/(lp)/lp/[slug]/page.tsx` import paths first.

---

## Ambiguity callouts for the next agent

### 1. `BlogRelatedFrame` vs `RelatedArticlesFrame`
Both exist, both go at the end of a blog article. They are NOT duplicates:
- `<BlogRelatedFrame>` — 3 `<BlogCard>` with thumbnail + excerpt + author byline (image-first grid)
- `<RelatedArticlesFrame>` — 3–10 text-only outbound links with an external-link icon (list style)

**Rule of thumb**: use `BlogRelatedFrame` for editorial "Pour aller plus loin" with visuals; `RelatedArticlesFrame` for sidebar-style outbound references (whitepapers, external research, cross-platform links).

### 2. `TocSidebar` vs `TableOfContentsFrame`
- `<TocSidebar>` — left-column sticky sidebar, desktop-only, IntersectionObserver scroll-spy. Used on long-form articles (blog ≥ 5 h2 sections, Solution long-form).
- `<TableOfContentsFrame>` — centered inline card at the top of the article, horizontal pills. Used on shorter articles where a sidebar would feel heavy.

**Rule of thumb**: `TocSidebar` for articles ≥ 5 h2 sections and long-form Solution pages. `TableOfContentsFrame` for 3–4 h2 articles.

### 3. Heading gradient ordering
Some frames render primary gradient FIRST, others LAST. Each frame documents its convention in `@purpose`. Quick reference:

- **highlight-first** (primary → dark): `PillarFrame`, `StepsFrame`, `RelatedSolutionsFrame`, `TabsFrame`, `TestimonialsFrame`, `BlogRelatedFrame`, `ValuePropositionFrame`, `HighlightFrame`, `IconRowFrame`, `SliderFrame`
- **highlight-last** (dark → primary): `ClientsFrame`

The inconsistency is intentional — each frame picks the ordering that fits its canonical heading pattern on airsaas.io live. When in doubt, check the JSDoc `@purpose` or a Storybook story.

### 4. `HubspotCtaEmbed` — deferred
8 blog articles embed HubSpot CTAs. No DS component exists yet. When migrating one of those articles, render inline:

```tsx
<div
  id={`hs-cta-wrapper-${ctaId}`}
  data-hubspot-cta-id={ctaId}
  className="my-[1.5rem]"
/>
```

And load the HubSpot loader script in the page `<head>` (`https://js.hscta.net/cta/current.js`). Promote to a DS component if ≥2 articles use it.

---

## See also

- [ds-rules.md](ds-rules.md) — strict mode rules (tokens, forbidden patterns, extension process)
- [ds-components-reference.md](ds-components-reference.md) — every component contract regenerated from JSDoc
- [sections-catalog.md](sections-catalog.md) — canonical section patterns catalogued
- [decisions.md](decisions.md) — past architectural decisions
- `.context/attachments/ds-audit-26-pages.html` — 26-pages audit (LP/Produit/Équipes/Solution)
- `.context/attachments/ds-audit-collection-gestion-projet.html` — blog collection audit (63 articles)
