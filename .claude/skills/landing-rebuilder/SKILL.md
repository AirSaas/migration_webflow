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
