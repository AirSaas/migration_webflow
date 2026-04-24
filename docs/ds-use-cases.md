# DS — use case index

Picking the right component when you know the **intent**, not the name.

This doc is hand-curated (unlike [`ds-components-reference.md`](ds-components-reference.md) which is auto-generated from JSDoc). Update when a new pattern emerges.

**Legend**: `🔴 required props` · `🟡 optional` · `🆕 recently added` · `⏸️ deferred`.

---

## 🎯 Quick index by intent

### Landing / marketing page anatomy

| Intent | Use |
|---|---|
| Full-width page header with H1 + illustration | `<Hero>` |
| Hero-adjacent tabs jumping to sections below | `<TabsFrame>` 🆕 (uses `id` on target sections) |
| 4-metric trust strip under the Hero | `<ValuePropositionFrame columns={4}>` + `<FeatureCard>` |
| "Vous reconnaissez ?" 3-8 pain bullets | `<ComparisonFrame>` (solo, sans only) |
| "Before / after" paired 3-8 rows | `<ComparisonDualFrame>` |
| Feature with image + description | `<FeatureFrame>` (inline / stacked layout) |
| Grid of 2-6 equal benefits | `<ValuePropositionFrame>` + `<FeatureCard>` |
| 2-6 methodology pillars / principles | `<PillarFrame>` |
| 3-5 numbered sequential steps | `<StepsFrame>` 🆕 |
| Carousel of 2-8 screenshots | `<SliderFrame>` (light / dark variant) |
| Icon row (3-8 security badges / integrations / logos) | `<IconRowFrame>` |
| Zigzag alternating highlights (editorial) | `<HighlightFrame>` |
| Competitor comparison table | `<ComparisonTableFrame>` |
| FAQ (2-12 expandable items) | `<FaqFrame>` |
| Mid-page CTA with single primary ask | `<CtaHighlightFrame>` |
| Closing CTA with 2 parallel cards (demo + guide) | `<CtaFrame>` + 2× `<CardCta>` |
| 3 "Nos solutions" cross-sell cards | `<RelatedSolutionsFrame>` 🆕 |
| Logos strip "Ils utilisent AirSaas" | `<LogosBar>` |
| Press/company endorsements (small cards) | `<TestimonialsFrame>` + `<TestimonialCompanyCard>` |
| 2-6 LinkedIn testimonials | `<TestimonialsFrame>` + `<TestimonialCard>` |
| 6-9 client cards (dense grid) | `<ClientsFrame>` 🆕 + `<ClientCard>` |

### Blog article anatomy

| Intent | Use |
|---|---|
| Article header with "Le Blog" tag + H1 + author + illustration | `<BlogHero>` |
| Author attribution (date, name, role, category) | `<BlogAuthorTag>` |
| Long-form rich-text body wrapper (blog) | `<BlogArticleBody>` (alias for `<ProseFrame maxWidth="wide">`) |
| Long-form rich-text body wrapper (non-blog / Solution) | `<ProseFrame>` 🆕 |
| Sticky left-column TOC for articles ≥ 5 h2s | `<TocSidebar>` 🆕 |
| Inline centered TOC pills for shorter articles (3-4 h2s) | `<TableOfContentsFrame>` |
| Inline editorial pull-quote (no chrome) | `<Quote variant="pull">` 🆕 |
| Framed citation card (with icon + border) | `<Quote variant="card">` (default) |
| Image with caption (semantic `<figure>` + `<figcaption>`) | `<IllustrationFrame caption="...">` 🆕 |
| Image only (no caption) | `<IllustrationFrame>` (current behavior) |
| Mid-article lead-magnet CTA | `<InlineCta>` 🆕 |
| "À retenir" key-takeaway box with bullets | `<InsightCallout>` 🆕 |
| Inline HubSpot CTA lead magnet | ⏸️ **pending** — render inline `<div id="hs-cta-wrapper-${id}">` (see `legacy-migration.md`) |
| Grid of 3 related BlogCards at article footer | `<BlogRelatedFrame>` 🆕 |
| "Pour aller plus loin" outbound text links | `<RelatedArticlesFrame>` |
| Blog index page (hero + featured + card grid) | `<BlogCollectionFrame>` + `<BlogCard>` |
| FAQ at bottom of article | `<FaqFrame>` |
| Closing CTA at bottom of article | `<CtaHighlightFrame>` |

### Text primitives (inside any body content)

| Intent | Use |
|---|---|
| h1–h4 heading | `<Heading level={1 \| 2 \| 3 \| 4}>` (never raw `<h1-h6>`) |
| Inline gradient text fragment | `<GradientText gradient="primary \| dark-to-primary \| orange \| green">` |
| Body paragraph | `<Text size="sm \| md \| lg">` (never raw `<p>` with typo classes) |
| Section intro heading + subtitle combined | `<SectionHeading>` |
| Inline bulleted list with icon | `<ListInline>` |
| Data/metric display | `<FeatureCard>` (metric + label variant) |
| Coloured tag / badge | `<Tag variant={1..12 \| "muted"}>` |

### Layout / chrome

| Intent | Use |
|---|---|
| Full site navbar with dropdowns (HomePage, Produit, Équipes, Solution) | `<Navbar>` |
| Minimal LP navbar (logo + single CTA) | `<LpNavbar>` from `library-design/layout/` |
| Full site footer with multi-column menu | `<Footer>` |
| Minimal LP footer | `<LpFooter>` from `library-design/layout/` |
| Cookie banner | `<CookieBanner>` |

### Interactive controls

| Intent | Use |
|---|---|
| Primary CTA button | `<Button variant="primary" size="md">` |
| Secondary / outline CTA | `<Button variant="tertiary">` |
| Minimal ghost CTA | `<Button variant="ghost">` |
| Link-styled CTA (no button chrome) | `<Button variant="ghost" size="xs">` or inline `<a>` with `text-primary` |
| Icon-only close / control | *(use native `<button>` with aria-label — no DS primitive yet)* |

### States (rare, SSG site)

| Intent | Use |
|---|---|
| Loading skeleton for async content | `<Skeleton>` |
| "No results" / empty state | `<EmptyState>` |
| Error fallback for client component | `<ErrorBoundary>` |

---

## 🧭 Picking order — when 2+ components could fit

Some intents can be covered by multiple frames. Use these tie-breakers:

### "Grid of N cards with icons + title + description" → 2-6 items?
- 2-4 cards → **`<ValuePropositionFrame>`** + `<FeatureCard>` (standard feature grid)
- 2-6 pillars / methodology → **`<PillarFrame>`** (uppercase short labels, example notes)
- 3-6 sequential steps → **`<StepsFrame>`** (numbered + connector)
- 6+ items → **`<IconRowFrame>`** (compact horizontal strip)

### "Grid of N cards with images" → blog or marketing?
- 3 blog articles with thumbnail + excerpt + author → **`<BlogRelatedFrame>`**
- 3 solutions/products with thumbnail + link → **`<RelatedSolutionsFrame>`**
- Full blog index (N cards, paginated) → **`<BlogCollectionFrame>`**

### "Testimonial section" → what format?
- 1 testimonial → inline `<TestimonialCard>` (no wrapper needed)
- 2-6 quote cards with avatar + role → **`<TestimonialsFrame>`** + `<TestimonialCard>`
- Press mentions with company logo → **`<TestimonialsFrame>`** + `<TestimonialCompanyCard>` (optional `href`)
- 6-9 dense client cards (no quotes) → **`<ClientsFrame>`** + `<ClientCard>`
- Just company logos (no text) → **`<LogosBar>`**

### "CTA" → how prominent?
- Inline inside article body → **`<InlineCta>`**
- Mid-page full-width, single ask → **`<CtaHighlightFrame>`**
- Mid-page dual cards (demo + guide) → **`<CtaFrame>`** + 2× `<CardCta>`
- Just a button in prose → raw `<Button>` inline

### "Quote / citation" → testimonial or editorial?
- Testimonial with name + role + avatar → **`<Quote variant="card">`** (default)
- Editorial pull-quote inside article body → **`<Quote variant="pull">`**
- Full testimonial section → **`<TestimonialsFrame>`**

### "Comparison" → what shape?
- "Sans" pain points (3-8 items, solo, red/orange) → **`<ComparisonFrame>`**
- "Avec / Sans" paired (3-8 pairs, orange + primary gradient) → **`<ComparisonDualFrame>`**
- 3-competitor feature matrix → **`<ComparisonTableFrame>`**

### "Table of contents" → sticky or inline?
- Article ≥ 5 h2 sections → **`<TocSidebar>`** (sticky left column, desktop-only)
- Article 3-4 h2 sections → **`<TableOfContentsFrame>`** (inline centered pills)

### "Long-form prose" → blog or marketing?
- Blog article body → **`<BlogArticleBody>`** (alias — `<ProseFrame maxWidth="wide">`)
- Solution long-form (Maslow, PM vs PPM, editorial) → **`<ProseFrame maxWidth="reading">`**

---

## 🏗️ Canonical LP page composition

When rebuilding an LP (`/lp/ppm`, `/lp/pmo`, `/lp/capacity-planning`, `/lp/pi-planning`), follow this order:

```tsx
<LpNavbar ctaLabel="..." logoAlt="..." />                 // minimal, library-design/layout/
<Hero ... />                                              // H1 + illustration + dual CTA + trust badges
<TabsFrame tabs={[{label, href: "#capacity"}, ...]} />    // anchors to sections below
<ValuePropositionFrame columns={4} id="capacity">         // trust strip, 4 metrics
  <FeatureCard ... /> × 4
</ValuePropositionFrame>
<ComparisonFrame id="pains" ... />                        // pain points, solo sans
<FeatureFrame id="feature-1" ... />                       // ×N features, alternating imagePosition
<PillarFrame id="approach" ... />                         // 3 pillars "why adopt"
<TestimonialsFrame>                                       // 2-6 LinkedIn-style testimonials
  <TestimonialCard ... /> × N
</TestimonialsFrame>
<IconRowFrame id="security" ... />                        // 4 security badges
<IconRowFrame ... />                                      // 6 ecosystem logos (may be absent on some LPs)
<StepsFrame id="deploy" ... />                            // 4 deployment steps
<FaqFrame id="faq" ... />                                 // 4-5 FAQ items
<RelatedSolutionsFrame ... />                             // 3 cross-sell solution cards
<CtaFrame>                                                // closing dual CTA
  <CardCta ... /> × 2
</CtaFrame>
<LpFooter copyrightText="..." madeWithText="..." logoAlt="..." />   // minimal, library-design/layout/
```

**Canonical reference**: [LpExamplePage.stories.tsx](../src/components/pages/LpExamplePage.stories.tsx) — clone as starting point.

---

## 🏗️ Canonical blog article composition

```tsx
<Navbar />
<BlogHero topTagLabel="Le Blog" title={...} author={...} heroImageSrc={...} />

<div className="mx-auto flex max-w-[91rem] gap-[3rem] px-[1.5rem] py-[3rem]">
  <TocSidebar title="Sommaire" items={tocItems} />
  <div className="flex-1">
    <BlogArticleBody>
      <Heading level={2} id="intro">...</Heading>        {/* id for TOC scroll-spy */}
      <Text>...</Text>
      <InsightCallout title="À retenir" items={[...]} />
      <Heading level={2} id="pourquoi">...</Heading>
      <Quote variant="pull">...</Quote>
      <IllustrationFrame tone="warm" caption="..." />
      <InlineCta text="..." ctaLabel="..." ctaHref="..." />
      <Heading level={2} id="methode">...</Heading>
      ...
    </BlogArticleBody>
  </div>
</div>

<FaqFrame title="Questions fréquentes" items={[...]} />
<CtaHighlightFrame titlePrefix="..." titleHighlight="..." subtitle="..." ctaLabel="..." />
<BlogRelatedFrame title="Pour aller plus loin" articles={[...]} />
<Footer />
```

---

## 🧾 What this doc is NOT

- Not a contract reference — see [ds-components-reference.md](ds-components-reference.md) for `@limits / @forbidden / @useWhen / @dontUse`.
- Not a style guide — see [ds-rules.md](ds-rules.md) for strict-mode rules.
- Not exhaustive — edge-case components (NavbarDropdown, FloatingCard, IconIllustration, etc.) exist but aren't indexed here. Use the reference for those.
