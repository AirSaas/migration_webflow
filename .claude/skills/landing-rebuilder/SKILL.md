---
name: landing-rebuilder
description: Rebuild a marketing landing from a live airsaas.io URL into the LandingPageV2 data-driven dispatcher. Triggers on requests like "rebuild this landing", "haz rebuild de [URL]", "construye el landing [URL]", "create a mapping for [URL]", "extrae la info de [URL]", "reconstruye [URL]", "rebuild /fr/equipes/[slug]", "rebuild /fr/lp/[slug]", "rebuild /fr/produit/[slug]", "rebuild /fr/solution/[slug]". Also triggers when the user pastes a live airsaas.io URL and asks to map / build / port it. Use BEFORE writing any data file or page component — this skill enforces the verbatim-fidelity protocol + the DS conventions we've battle-tested across outil-pmo and it-et-operation rebuilds.
---

# Landing Rebuilder — AirSaaS

**This skill exists because every landing rebuild has the same failure modes if not done in order. Follow the 6-step protocol below — no shortcuts.**

Companion to `ds-component-builder` (which is for building NEW DS components). This skill is for the data-layer work: extracting verbatim content from a live URL and shaping it into a `LandingPageV2` data entry that the dispatcher renders.

---

## 🛑 Absolute non-negotiables (read first)

1. **Never invent asset URLs.** Avatars, logos, screenshots — extract them from the live HTML. If you can't find a URL, ASK before guessing. Verified incident 2026-05-13: 8 of 9 client cards on it-et-operation shipped with invented `/65f50aa*` paths that the CDN didn't serve — broken images in prod, follow-up commit required.
6. **Never reuse copy across landings without verifying.** Each LP is its own page — section titles, subtitle text, asset URLs MUST be extracted from THIS landing's live HTML, never copy-pasted from a sibling LP's data file. Verified incident 2026-05-14: mapped `/fr/lp/ppm` with section "Découvrez AirSaas en 6 vues produit" lifted from capacity-planning's data — it doesn't exist on ppm's live. Always re-extract per page.
7. **Count visible elements in BOTH text AND image passes — using an attribute-order-agnostic regex.** Extract text via the visible-text pass, but ALSO extract image counts in the same range via `<img>` regex. If they disagree (e.g. 5 customer logos visible in `<img>` but 0 in visible text because they have no alt), the visual layer takes precedence — render as logo-bar / image grid, not as text-only block. **CRITICAL — regex must capture BOTH attribute orders**: Webflow renders SOME images as `<img src="..." alt="...">` AND OTHERS as `<img alt="" src="...">` (alt-before-src). A naive `/<img[^>]+src="..."[^>]*alt="..."/g` MISSES the alt-before-src variant. Use this hardened regex instead: `/<img[^>]+(?:src=\"([^\"]+)\"|alt=\"([^\"]*)\")[^>]*(?:alt=\"([^\"]*)\"|src=\"([^\"]+)\")[^>]*\/?>/g` OR run TWO separate passes (one src-first, one alt-first) and merge. Verified incidents: (a) `/fr/lp/ppm` "Ils nous font confiance" — missed 5 customer logos `<img alt="" src="...Kiabi_logo.png">` (alt-first order); (b) same on `/fr/lp/capacity-planning` "Ils gèrent leur capacité avec AirSaas" — missed same 5 customer logos AND the 4th KPI "10 min / de l'idée au scénario" because text-pass window stopped at 3 KPIs (third incident in 3 LP mappings — pattern is consistent). **Mitigation**: after EVERY mapping, count `<img>` tags inside the section's HTML range — if count differs from your mapping table's image references, re-scan with the hardened regex.
8. **Eyebrow vs topTag — check the live CSS class.** A small label above the H1 can be one of two distinct DS props on `<Hero>`: `eyebrow` (uppercase text with orange accent line — for "SOLUTION", "GUIDE", etc.) OR `topTag` (rounded pill via `<Tag>` component — for "Nouveau", "PPM nouvelle génération", etc.). They render very differently — don't conflate. Heuristic via live HTML class: `eyebrow`/`subtitle--upper` → `eyebrow` prop; `tag--*`/`pill`/`badge` → `topTag: { label, variant }`. Verified incident 2026-05-14: mapped `/fr/lp/ppm` "PPM nouvelle génération" as `eyebrow` but live uses `<div class="tag--primary">` → correct mapping is `topTag: { label: "PPM nouvelle génération", variant: "primary" }`.
9. **Trust badges below CTAs use `bottomTags`, not `bullets`.** When a hero has a row of 3-6 short trust strings under the CTAs ("+100 clients nous font confiance", "Opérationnel en 1 mois", "ISO 27001 certifié", etc.), the correct Hero prop is `bottomTags: { label, variant }[]` (renders as `<Tag>` pills). `bullets` is for a different pattern (text checklist with bullet icons). Canonical reference: `src/components/pages/PiPlanningPage.tsx` line 89 uses `bottomTags={[{label, variant: "success"}, ...]}`. Variant defaults to "muted" but "success" is the canonical for trust badges on LPs.
10. **mediaTabs is deferred — use a static `imageSrc` for LP hero with cycling-tabs visual.** The DS `<Hero>` supports `mediaTabs` (6+ icon-tab strip with auto-cycling screenshots) but the data dispatcher does NOT forward it yet (2026-05-14). Convention for LPs that visually show this pattern (e.g. `/fr/lp/ppm` with Portfolio/Quarter plan/Capacitaire/Priorisation/Roadmap/Reporting tabs): set `imageSrc` to a single composite dashboard screenshot (e.g. `https://cdn.prod.website-files.com/609552290d93fd43ba0f0849/6a058dc2e945d117d6d1aae8_hero-portfolio-q1-2025.webp` for ppm) and do NOT render the 6 tabs as a separate section. `PiPlanningPage.tsx` line 94 is the canonical rebuild reference using this static-image pattern.
11. **Lottie animations are a THIRD asset vector — neither `<img>` nor `background-image:url`.** Webflow renders Lottie animations as `<div data-animation-type="lottie" data-src="...json">` (loaded JS-side). The `<img>` regex and `background-image:url` regex both MISS these. Run a third extraction pass for Lottie JSON URLs: `[...html.matchAll(/data-src=\"(https?:\/\/[^\"]+\\.json)\"/g)]`. Verified incident 2026-05-14: mapped `/fr/equipes/comite-direction` section 9 "Suivez l'avancée de vos programmes" as text-only because both `<img>` and `background-image` regex returned 0 hits — but the live has a `Programs-video.json` Lottie animation. As of 2026-05-14 the DS ships `<LottiePlayer>` (`library-design/ui/LottiePlayer.tsx`) and `FeatureSplitSection.lottieSrc` is forwarded to `<FeatureFrame lottieSrc>` (commit `cddcb7a`). Use it.
13. **"⚠️ pain-points" warning sections — use `comparison-frame`, NOT `pain-points`.** When the live shows a numbered list of pain-point statements introduced by a "⚠️" warning emoji + heading (e.g. "⚠️ Vous vous reconnaissez ?", "⚠️ Les vrais problèmes du capacity planning", "⚠️ Le quotidien du PMO aujourd'hui", "⚠️ Le quotidien du RTE aujourd'hui"), the canonical DS pattern is `<ComparisonFrame>` (`section.type: "comparison-frame"`), NOT the dispatcher's `pain-points` type. `ComparisonFrame` accepts `{ emoji, title, subtitle, items: [{ value, description }] }` and renders as numbered cards — exactly the visual on every AirSaas LP. The `pain-points` section type renders as bullet list with `ListInline bullet="circle-primary"` — a different visual, used elsewhere (not for the ⚠️-warning numbered-pain-points pattern). Canonical reference: `src/components/pages/PiPlanningPage.tsx:158-200` uses `<ComparisonFrame emoji="⚠️" title="Le quotidien du RTE aujourd'hui" subtitle=" " items={[...]}>` for the 6 numbered RTE pain-point items. Note `subtitle=" "` (single space) — the prop is required by the component but the live shows nothing between heading and items; pass a single space.
14. **"Avant / Après" sections — three comparison components exist, default to the canonical mapping when one exists.** There are THREE distinct DS components for comparison sections, all real and registered in the dispatcher:
    - **`<ComparisonFrame>`** (`section.type: "comparison-frame"`) — single-column numbered list of pain-point statements (see Rule 13).
    - **`<ComparisonDualFrame>`** (`section.type: "comparison-dual"`) — two columns of paired narrative cards (avec/sans, before/après). Renders the row index 1..N as a gradient number per card (NO check/xmark icons internally). Use when the live shows 2 side-by-side stacks of text cards even if the live happens to display literal check/xmark icons per row — the DS adapts those to numbered cards.
    - **`<ComparisonTableFrame>`** (`section.type: "comparison-table"`) — feature-matrix table: wide feature cell on the left + N narrower value cells on the right per row; cells can be `boolean` (renders as check ✓ / xmark ✗), string, or ReactNode. Use for plan/pricing matrices or 3+ column competitor comparisons.
    **Decision rule**: if a canonical reference page (e.g. `PiPlanningPage.tsx`) already maps this section to a specific component, MATCH the canonical — don't second-guess it from literal asset evidence. The canonical "Avant / Après AirSaas" on `/fr/lp/pi-planning` is `<ComparisonDualFrame>` with `sansItems` / `avecItems` numbered 1..N (line 365). For new LPs with no canonical, pick by structure: paired narrative text → `comparison-dual`; 3+ columns or boolean matrix → `comparison-table`; single ⚠️ list → `comparison-frame`.
15. **Mid-page or closing "H2 + subtitle + 1 CTA" → `cta-stacked` (NOT `cta-highlight`).** When the live shows a recurring pattern of a colored-bg section with H2 + paragraph subtitle + a single CTA button (e.g. "Vous voulez l'essayer ?", "Échangeons sur AirSaas dès maintenant"), the canonical DS mapping is **`<CtaFrame>` Stacked variant** — NOT `<CtaHighlightFrame>`. Storybook reference: `Sections/Call to Action/CtaFrame → Stacked` story renders 1 centered `<CardCta>` at 70% width inside a `<CtaFrame>`. As of 2026-05-14 the dispatcher exposes this via `section.type: "cta-stacked"` with fields `{ title, subtitle, cardTitle, cardDescription, ctaLabel, ctaHref?, floatingCards?, id? }`. Verified incident 2026-05-14: mapped `/fr/produit/priorisation-par-equipes` section 6 "Vous voulez l'essayer ?" as `cta-highlight` but the canonical pattern (used also on `/fr/equipes/outil-pmo`, `/fr/equipes/comite-direction`, `/fr/equipes/direction-de-la-transformation`, and any future produit page with this banner) is `cta-stacked`. **Decision rule for CTA sections**: live has tri-gradient drama + inner white card → `cta-highlight`; live has 2 CardCta side-by-side (démo + vidéo/guide) → `cta` with `items.length >= 2`; live has 1 CTA centered with banner H2 → `cta-stacked`. **Always check Storybook** (`Sections/Call to Action/CtaFrame`) before mapping a CTA — there are multiple stories (`Split` / `Stacked` / `WithoutFloatingCards`) and the right variant is rarely the first you guess.
12. **Mapping tables MUST include Navbar + Footer framework rows, CONTIGUOUS to the body rows (no blank line).** Even though the dispatcher renders them automatically (`<Hero navItems={BLOG_INDEX_DATA.navItems}>` for navbar, and `LandingPageV2` always appends `<Footer columns={BLOG_INDEX_DATA.footerColumns}>` after sections), the mapping table handed off to a rebuild agent must include both as framework-level rows at the top and bottom — labelled clearly so the agent knows they're NOT to be defined in the data file's `sections` array. **CRITICAL formatting**: the Navbar row must be the FIRST row immediately after the table header, and the Footer row must be the LAST row IMMEDIATELY after the last body row — NO BLANK LINE between body rows and the Footer row, otherwise markdown breaks the table into two and the Footer renders as an orphan table without headers. Verified incidents 2026-05-14: (a) mapped `/fr/equipes/comite-direction` and `/fr/equipes/direction-de-la-transformation` body-sections-only — user flagged twice that Navbar / Footer were missing; (b) mapped `/fr/solution/airsaas-et-les-experts-de-la-transfo` with the Footer row separated by a blank line — table broke into 2 and user flagged "por que el footer no está metido en la tabla?". Format: prepend `| **— Navbar (framework)** | — | <Navbar> (inside <Hero>) | data from BLOG_INDEX_DATA, no action required |` as the FIRST table row and append `| **— Footer (framework)** | — | <Footer> | auto-appended by LandingPageV2, no action |` as the LAST table row, with NO blank line above it.
2. **Never modify a DS component to fix layout in a landing.** Per-instance overrides via `className` are fine. Modifying the DS component itself requires the Extension process from `docs/ds-rules.md`.
3. **Never paraphrase live copy.** Verbatim character-for-character. Preserve typos ("tranquile", "marketplate", double-space "Airsaas :  "). The page-rebuild prompt at `docs/prompts/page-rebuild.md` is the contract.
4. **Never invent section types.** The dispatcher has 30 types in `LandingPageV2.tsx`. If nothing matches genuinely, propose extension via "Extension process" — don't write inline JSX.
5. **Never declare done without all QA gates green.** ds-audit clean, qa-page P0=0, DOM headings match live, dev server no `[DS]` validator errors. Anything less = unshipped.

---

## 🔁 6-step protocol (in order, no skipping)

### Step 1 — Extract live content (curl + regex, two passes)

```bash
curl -sL "<LIVE_URL>" -o /tmp/<slug>.html
wc -c /tmp/<slug>.html  # sanity check (~80-100KB expected)
```

Then run BOTH extraction passes in parallel:

```bash
# Pass A: structure (heading hierarchy + bold/em markers)
node -e "..."  # extract <h1-3> with [STRONG] / [EM] markers preserved

# Pass B: per-section content (verbatim text between sections)
node -e "..."  # extract visible text in sliding window around each heading
```

**CRITICAL — asset extraction trap.** Webflow renders avatars / company logos as inline `background-image:url(&quot;...&quot;)` styles inside divs with classes like `speaker-testimonial__photo--l`, NOT as `<img>` tags. If your `<img src=...>` regex returns 0 matches for a section that visually has photos, run this fallback:

```js
const re = /background-image:url\(&quot;(https?:\/\/[^&]+?)&quot;\)[^>]*class=\"(speaker-testimonial__photo--l|logo__colletion__testimonial|[other-class])\"/g;
```

Verify each extracted URL serves with `curl -sI <url> | head -3` (expect `HTTP/2 200` + `content-type: image/...`). Reject invented URLs without exception.

### Step 2 — Build the mapping table (no code yet)

Document each section in a markdown table with columns: `#`, `section type (dispatcher)`, `DS component`, `props clave / contenido verbatim`. Don't open any `.tsx` until this table is complete and matches the live structure 1:1.

Reference docs:
- [`docs/sections-catalog.md`](../../docs/sections-catalog.md) — "LandingPageV2 — section types" — all 30 types with data shape + DS component + use case
- [`docs/ds-rules.md`](../../docs/ds-rules.md) — decision tree + Gradient-split title rule
- [`docs/prompts/page-rebuild.md`](../../docs/prompts/page-rebuild.md) — verbatim-fidelity contract

### Step 3 — Apply the conventions

Every rebuild MUST apply these without being told:

#### Hero layout — verify on live FIRST, then pass `layout` explicitly

**Rule**: always look at the live page (screenshot or DOM) to determine whether the image sits BESIDE the text (`split`) or BELOW it (`centered`). The dispatcher's auto-pick (`split` when `imageSrc` is set) is unreliable across the catalog — pass `layout` explicitly once you've verified.

Common starting hypotheses by category (use as a default to verify against, NOT as a rule):

| Category | Typical layout | Verify because |
|---|---|---|
| Solution (`/fr/solution/*`) | usually `centered` light | Some solution pages use split |
| Produit (`/fr/produit/*`) | usually `centered` (dark) | Some produit pages use split |
| Équipes (`/fr/equipes/*`) | usually `centered` | Verified on outil-pmo + it-et-operation, but new équipes pages might differ |
| LP (`/fr/lp/*`) | usually `centered` with eyebrow + 2 CTAs + trust badges | LP variants exist with split mockups |

If your visual check shows the image is BESIDE the text on the live → `layout: "split"` (regardless of category). If BELOW → `layout: "centered"`. Set it explicitly either way so the dispatcher doesn't auto-pick wrong.

#### Gradient-split title rule (FeatureFrame / SectionHeading / ClientsFrame)

The live has blue (primary gradient) portions in most headings. Match by splitting:

- **Blue at start** (prefix): `titleHighlight: "Les chiffres"` + `title: "qui vous feront..."`. Default order — `titleHighlightAtEnd: false`.
- **Blue at end** (suffix): `title: "Partagez les roadmaps"` + `titleHighlight: "à toute l'organisation"` + `titleHighlightAtEnd: true`.
- **Blue in the middle** (compromise — DS doesn't support 3-part split): extend the blue toward the side that makes more visual sense. Match the HomePage convention for the same heading if it exists. Document the compromise in a comment.

#### ClientsFrame overflow rule

Live has 6-9 client cards → render all of them.
Live has **≥10 cards** → render 6-9 representative cards + `collectionCtaLabel: "Consultez les témoignages de nos clients"` + `collectionCtaHref: "/fr/temoignages"`. Do NOT extend the DS contract above 9. Do NOT use a slider. Do NOT swap for TestimonialsFrame.

#### CompositeImageWithArrowedText pattern (newsletter sponsor / Bilan de santé style)

When the live shows 3+ image variants with arrows pointing to text labels:
1. **Asset**: ONE composite image with arrows baked in. Local asset `public/assets/screenshots/newsletter-sponsor-composite.png` already exists for the canonical case. For new compositions, fuse the 3 PNGs at prep step.
2. **Data**: `type: "feature-split"` + `subSections: [{title, body}, ...]`. The dispatcher renders raw `<h5>+<p>` inside the FeatureFrame prose richContent automatically (NO `<Heading level={4}>` — too big).
3. **Title split**: pull "Une [highlighted phrase]" to `titleHighlight` (prefix gradient).

#### Mixed press + LinkedIn testimonials

Use `type: "mixed-testimonials"`. Adaptive grid: `lg:grid-cols-{min(N, 4)}` per row. Press uses `<TestimonialCompanyCard>` (quote + logo). LinkedIn uses `<TestimonialCard>` (quote + name + role + avatarSrc + linkedinHref). NEVER stack them in a single grid.

#### KPI / Stats icons (semantic matching)

The live has literal `%` / `€` / `calendar` SVGs. The DS has no literal equivalents — pick the closest semantic match from `illustration-icons.tsx`:

| Live concept | DS icon |
|---|---|
| Reduction / risk / failure | `bolt-lightning` or `circle-xmark` |
| Time / speed / onboarding | `stopwatch` |
| Calendar / scheduled / mensuel | `calendar-day` |
| Free / positive / 0€ | `circle-check` |
| Objective / clarity / capacity | `bullseye-arrow` |
| Adoption / users / business unit | `comments` / `suitcase` |

### Step 4 — Execute with a Node.js rewrite script

The data file `src/data/landings-v2/equipes.ts` (or `lp.ts`, `produit.ts`, `solutions.ts`) is minified JSON-in-TS. **Never hand-edit** — use a parser/writer script in `/tmp/rewrite-<slug>.mjs`:

```js
import fs from "node:fs";
const src = fs.readFileSync(FILE, "utf8");
const headerEnd = src.indexOf("export const PAGES: LandingPage[] =");
const after = src.slice(headerEnd);
const eqIdx = after.indexOf("=");
const openIdx = after.indexOf("[", eqIdx);  // skip the `[]` in `LandingPage[]`
// ...bracket-match to find closeIdx, parse, mutate the target slug's entry, JSON.stringify, write back
```

Reference templates: `/tmp/rewrite-outil-pmo.mjs` and `/tmp/rewrite-it-et-operation.mjs` from the 2026-05-13 rebuilds.

### Step 5 — Run all QA gates (mandatory, blocking)

```bash
# 1. DS audit
node scripts/ds-audit.mjs  # → clean

# 2. Page regex/DOM QA
node scripts/qa-page.mjs --slug=<slug>  # → PASS P0=0

# 3. DOM heading count vs live
# extract <h1-3> from both /tmp/<slug>.html (live) and /tmp/<slug>-rebuild.html (dev server fetch)
# counts should match within tolerance — h3 vs h4 differences ok when DS renders cards as h4 per max-level=4 rule

# 4. Dev server smoke test
curl -s -o /tmp/<slug>-rebuild.html -w "HTTP %{http_code}\n" "http://localhost:3000/<route>"  # → 200

# 5. Console errors (preview_console_logs)
# accept only intentional [DS] validator warnings for verbatim long copy (subtitle > 260 chars, ctaLabel > 36)
# block any other errors
```

If a `[DS]` validator warning fires for verbatim copy that exceeds a limit, ACCEPT it — page-rebuild rule says fidelity beats limits. Comment in the data file: `// DS warning intencional: matches live`.

### Step 6 — Commit + push + Vercel preview

```bash
git add src/data/landings-v2/<file>.ts docs/qa-page-report.md docs/raw/ds-audit.json docs/raw/qa-page.json
git commit -m "feat(<category>/<slug>): rebuild landing using corrected DS mapping"
git push
# Wait for Vercel preview build, report the URL to the user
```

Use the `until` polling pattern to wait for Vercel status `success` before reporting:

```bash
until s=$(gh api repos/AirSaas/migration_webflow/commits/<SHA>/status --jq '.statuses[0].state' 2>/dev/null); [[ "$s" == "success" || "$s" == "failure" || "$s" == "error" ]]; do sleep 15; done
gh api "repos/.../deployments/.../statuses" --jq '.[0].environment_url'
```

---

## 🧭 Reference — the 30 LandingPageV2 section types

Full reference + data shapes: [`docs/sections-catalog.md`](../../docs/sections-catalog.md) section "LandingPageV2 — section types".

Quick lookup by visual pattern:

| Visual pattern on live | section type |
|---|---|
| Top hero (text + image) | `hero` |
| Press logos + quotes in cards | (part of `mixed-testimonials` when LinkedIn row follows; else `press-quotes`) |
| LinkedIn-style testimonials | `testimonials` (1-6) or `mixed-testimonials` when combined with press |
| KPI row (3-6 numbers) | `stats` |
| Centered H2 + paragraph, no image | `section-heading` |
| Centered H2 + paragraph + image (text-only stacked) | `intro` (use `section-heading` if gradient split desired) |
| Feature row (text + image side by side) | `feature-split` |
| Feature row with 3 arrowed sub-labels | `feature-split` + `subSections` (CompositeImageWithArrowedText pattern) |
| Stacked feature (title + bullets + bleed image) | `feature-stacked` (forbidden text-only — use `section-heading`) |
| Mid-page CTA banner | `cta-highlight` (single CTA) or `cta` (CtaHighlightFrame fallback) |
| 2-8 image carousel | `slider` |
| Avec/sans paired narrative (2 columns numbered) | `comparison-dual` (**not** `comparison-table` — its contract forbids paired) |
| Feature matrix table (rows=features, cols=plans) | `comparison-table` |
| Dense client grid (6-9 cards w/ avatar + role + sector + employees) | `clients` |
| Numbered steps | `steps` or `steps-rich` |
| FAQ accordion | `faq` |
| Tab anchors row | `tabs-frame` |
| Related cards (cross-sell, podcast, blog) | `related` |
| Pillar grid (icon + title + description) | `pillar-frame` |
| Zigzag highlights | `highlight-frame` |
| Pain points list with emoji | `pain-points` |
| Icon row (badges) | `icon-row` |
| Trust badges | `trust-badges` |
| Logos strip | `logo-bar` |
| Generic FeatureCard grid (2-6 cols) | `value-proposition` |
| Generic comparison list (single col numbered) | `comparison-frame` |

---

## ✅ Verification checklist before declaring done

- [ ] `/tmp/<slug>.html` (live) extracted, headings + assets verified
- [ ] Mapping table written, every section maps to an existing `section.type`
- [ ] Hero `layout: "centered"` explicit for équipes/lp/produit (no auto-pick)
- [ ] Gradient splits applied per live (prefix / suffix / middle-compromise documented)
- [ ] ClientsFrame overflow rule applied if live has ≥10 cards
- [ ] All asset URLs (avatars, logos, screenshots) extracted from live — verified `curl -sI` returns 200
- [ ] Verbatim typos preserved with inline comments
- [ ] `node scripts/ds-audit.mjs` clean
- [ ] `node scripts/qa-page.mjs --slug=<slug>` P0=0
- [ ] DOM headings count match live (allow h3→h4 downshift for DS Heading max=4)
- [ ] Dev server console: only intentional `[DS]` warnings accepted
- [ ] Commit message follows pattern: `feat(<category>/<slug>): rebuild landing using corrected DS mapping`
- [ ] Vercel preview deployed, URL reported to user

---

## 📚 Companion docs

- [CLAUDE.md](../../CLAUDE.md) — project-wide rules including DS Strict Mode
- [docs/ds-rules.md](../../docs/ds-rules.md) — Golden rules + decision tree + Gradient-split rule
- [docs/sections-catalog.md](../../docs/sections-catalog.md) — LandingPageV2 section types reference
- [docs/prompts/page-rebuild.md](../../docs/prompts/page-rebuild.md) — verbatim-fidelity contract
- [docs/ds-components-reference.md](../../docs/ds-components-reference.md) — every DS component contract (`@purpose / @useWhen / @dontUse / @limits / @forbidden`)
- [src/components/pages/LandingPageV2.tsx](../../src/components/pages/LandingPageV2.tsx) — the dispatcher (30 cases)
- [src/types/landing.ts](../../src/types/landing.ts) — section type discriminated union
- Canonical references: `src/components/pages/HomePage.tsx` (CompositeImageWithArrowedText pattern, ClientsFrame title split convention, etc.)
