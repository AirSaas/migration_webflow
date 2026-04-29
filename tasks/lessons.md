# Lessons Learned

## 2026-03-09 — CSS fidelity skipped during component development

**Mistake**: Built sections from design-system.md tokens without verifying actual CSS against Webflow source. Result: wrong font sizes, weights, gaps, paddings across multiple components. User had to flag it.

**Rule**: For EVERY section component:
1. Extract exact Webflow CSS via `style_tool > get_styles(query='ClassName')` BEFORE coding
2. After coding, take Playwright screenshot of Webflow original at 1440px and compare
3. Never mark a step complete without a visual QA pass

**Pattern to watch**: "Close enough" typography/spacing is never close enough. Always verify `font-size`, `font-weight`, `line-height`, `padding`, `gap`, `max-width` against source.

## 2026-03-09 — Vercel SSG fails with JSX in data files

**Mistake**: Used `generateStaticParams` + SSG for pages whose data files contain JSX (React.ReactNode). Worked locally but 500'd on Vercel.

**Rule**: Any page whose data contains JSX must use `export const dynamic = "force-dynamic"`. Test on Vercel, not just local build.

## 2026-04-16 — Hero H1 silently empty due to wrong prop names

**Mistake**: Used `title`, `badge`, `ctaLabel`, `navLinks` props on Hero component — none of which exist. The real props are `headline`, `headlineGradient`, `topTag`, `primaryCta`, `navItems`. React silently ignores unknown props, so the Hero rendered with an empty H1 and no CTA button. I didn't catch it because I jumped to checking section headings further down the page instead of verifying the Hero first.

**Rule**: 
1. **Always read the component interface (props/types) before instantiating a DS component** — never guess prop names from memory or from a different component.
2. **The Hero H1 is the most important element on any landing page.** After rendering, ALWAYS verify the H1 is visible and non-empty in the screenshot before moving on.
3. **Heroes are never rich text.** They follow a strict pattern: tag/badge + short headline (dark + gradient parts) + subtitle + CTA button. If source content looks like a long SEO title, split it into `headline` + `headlineGradient`.

**Pattern to watch**: Empty H1 in Hero = wrong prop names passed silently. Storybook's "No Preview" H1 can mask the real empty H1.

## 2026-04-16 — ValuePropositionFrame: always match columns prop to actual children count

**Mistake**: Passed 3 FeatureCards to ValuePropositionFrame without setting `columns={3}`. The default is `columns={4}`, so the grid had 4 columns with only 3 cards — leaving 25% of the width empty. Cards looked narrow and didn't fill the available space.

**Rule**:
1. **Always count the children** and pass the matching `columns` prop: 2 children → `columns={3}` or custom, 3 children → `columns={3}`, 4 children → `columns={4}` (default).
2. **Cards in a grid section should always fill the full width.** If they don't, the grid column count is wrong.
3. This applies to any grid-based section component, not just ValuePropositionFrame — always verify the grid visually at desktop width after composing the page.

## 2026-04-16 — FeatureFrame alternation: always maintain right-left-right rhythm

**Mistake**: When composing landing pages with consecutive FeatureFrames, I didn't always enforce the alternating pattern `imagePosition="right"` → `"left"` → `"right"` → `"left"`. Sections that break this rhythm feel visually monotonous.

**Rule**:
1. **Consecutive FeatureFrames must always alternate** `imagePosition`: right → left → right → left (or vice versa). No two consecutive FeatureFrames should have the same side.
2. When inserting a non-FeatureFrame section (CTA, ValueProposition, stacked) between two FeatureFrames, track the last image position used and resume the alternation after the break.
3. Verify the alternation visually at desktop width — a zigzag pattern confirms correct alternation.

## 2026-04-16 — Identify correct section type from source reference screenshots

**Mistake**: Used `ValuePropositionFrame` with 3 FeatureCards for the "newsletter sponsor" section, but the source clearly showed a FeatureFrame layout (large image left + text descriptions right). Misidentified the section type.

**Rule**:
1. **Image + text side by side = FeatureFrame.** Use `richContent` for editorial text with multiple sub-features.
2. **Grid of equal cards (no hero image) = ValuePropositionFrame.** Cards are the primary content.
3. Before coding a section, ask: "Is there a dominant image/screenshot paired with text, or are there N equal cards?" That determines FeatureFrame vs ValuePropositionFrame.

---

# 2026-04-28-29 — Phase 6.5 + Phase 7 lessons (audit + parser + utility pages)

These cover the multi-day session that took broken-links from 2010 to 37, shipped 11 utility pages, and merged everything to `main` via PR #44.

## Workflow canonique pour rebuild une page (à suivre dans cet ordre)

> **Source unique de vérité** : `airsaas_pages_rebuild` Supabase (HTML scrappé via Cloudflare Browser Rendering). Ne pas re-scraper sauf besoin (le scrape coûte du temps Cloudflare).

### 1. Identifier le type de page

| Forme | Template | Data file | Parser |
|---|---|---|---|
| Landing produit/solution/equipe/lp | `LandingPageV2` | `src/data/landings-v2/{type}.ts` | `parse-landings-rebuild.py` |
| Article blog | `BlogPostPage` | `src/data/blog-articles-v2.ts` | `parse-blog-articles-rebuild.py` |
| Page legal/utilitaire courte | `LegalPage` | `src/data/legal-pages.ts` | `extract-legal-pages.py` |
| Stub marketing (CTA → live) | `MarketingStubPage` | `src/data/marketing-stubs.ts` | hardcoded |

### 2. Re-parser depuis Supabase (jamais à la main)

```bash
python3 scripts/migrate/parse-landings-rebuild.py    # 26 landings
python3 scripts/migrate/parse-blog-articles-rebuild.py  # 62 blogs
python3 scripts/migrate/extract-legal-pages.py        # 3 legal pages
```

Le parser regex Python est le **canonical**. Il a 4 fixes de pattern durables (cf. lesson plus bas).

### 3. Vérifier le rendu

```bash
npm run dev  # localhost:3000
# puis curl chaque route et check 200
```

### 4. QA gate obligatoire AVANT de déclarer done

Pas un seul niveau, mais **3 niveaux** :

```bash
node scripts/qa-page.mjs        # regex/DOM — cible 0 P0
node scripts/qa-llm.mjs         # Sonnet 4.6 sémantique — cible ≤5 P0
node scripts/qa-merge.mjs       # combined report
```

Pour un audit complet pré-handoff (~1h, ~$2 LLM) :

```bash
node scripts/verify-rebuild.mjs    # text coverage live vs rebuild
node scripts/qa-visual-diff.mjs    # pixelmatch live vs rebuild
node scripts/qa-lighthouse.mjs     # perf/a11y/SEO 88 pages
node scripts/qa-links.mjs          # broken links HEAD checks
node scripts/qa-go-no-go.mjs       # consolidator 6 dimensions
```

### 5. Build Vercel local AVANT de merger

```bash
npm run build  # catch TS errors that don't surface in dev
```

(Cf. lesson Vercel TS error plus bas.)

---

## 2026-04-28 — Pivot vers parser LLM : trade-off négatif si pas mesuré

**Mistake** : Tenté de remplacer le parser bs4/regex Python par un parser LLM (Sonnet 4.6 + tool_use) parce que le regex avait 7 patterns de bugs. Coût : $20, 90 min wall-clock, 5 scripts. Résultat : a fixé les bugs structurels (sections vides, callouts placeholder, drop-caps, concat) MAIS a introduit 19 nouveaux P0 regex (HTML literals leaked as text, double-encoded entities, missing hero images). Net delta = négatif. Reverted.

**Rule** :
1. **Avant tout pivot d'infrastructure**, faire un smoke test sur 2 pages pour mesurer le trade-off réel. NE PAS lancer le batch complet ($$$ + temps) avant validation.
2. **Ne pas confondre "le LLM détecte le bug" et "le LLM peut le réparer"**. Détection sémantique ≠ extraction structurée. Sonnet voit les sections vides mais peut introduire d'autres erreurs.
3. **Le parser regex est canonical** parce qu'il est déterministe, $0/run, fast. Garder l'expérimentation LLM comme reference (`scripts/migrate/parse-*-llm.mjs` shelved) mais ne pas l'utiliser comme default.
4. **Trade-off à toujours évaluer** : robustesse aux variations source ↔ déterminisme + coût. Pour des migrations one-shot de 88 pages, le déterminisme gagne.

**Pattern à watch** : "Le parser actuel a N bugs, on devrait passer LLM". Réponse : fixer les N patterns dans le parser regex (1-2 jours) avant tout pivot. Cf. les 4 patterns durables ci-dessous.

## 2026-04-28 — 4 patterns parser durables (à toujours implémenter dès le début)

**Mistake** : Le premier parser ne handle pas ces patterns Webflow → 27 BLOCK pages détectés en QA. Patches successifs sur 5 commits avant que ce soit clean.

**Rule** : Ces 4 patterns DOIVENT être dans tout nouveau parser dès le départ :

1. **ZWSP / zero-width chars** — Webflow scatter `​‌‍⁠﻿` (U+200B-FEFF) dans les paragraphes. Toujours strip via `re.sub(r"[​‌‍⁠﻿]", "", text)` avant de checker si vide.

2. **Drop-cap pattern** — `<em class="heading__pill">L'o</em>util` est UNE seule lettre stylisée, PAS un word boundary. `get_text(separator=" ")` casse `L'outil` en `L'o util`. Détection :
   ```python
   def is_decorative(child):
       cls = " ".join(child.get("class") or []).lower()
       return any(d in cls for d in ("heading__pill", "drop-cap", "dropcap", "first-letter"))
   ```
   Skip le séparateur si decorative.

3. **Callouts CMS placeholder** — Le HTML rendu contient parfois `Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE"`. Strip avec :
   ```python
   re.sub(r"Speaker avatar:.*?end Speaker avatar:\s*", "", html, flags=re.IGNORECASE | re.DOTALL)
   ```
   Drop le callout entier si rien ne reste après.

4. **Concat bugs `<strong>` adjacent** — `<strong>PPM</strong>pour` rend `PPMpour` avec `get_text()`. Use `get_text(separator=" ")` MAIS post-process pour réparer les apostrophes françaises : `re.sub(r"([’'ʼ])\s+(\w)", r"\1\2", text)` (sinon `L'outil` → `L' outil`).

**Pattern à watch** : `enmultilingue`, `PPMpour`, `A joutez`, `É crivez`, `L' outil`. Tous = même cause.

## 2026-04-28 — Auto-cleanup de trous de contenu source ne marche pas

**Mistake** : Tenté un script `cleanup-block-pages.mjs` qui drop agressivement les paragraphes finissant `:` + paragraphes vides + body < 30 chars. Net : -1 BLOCK / -1 P0 mais introduit régressions sur pi-planning (2→5 P0) et program-increment-planning (3→5). Reverted.

**Rule** :
1. **Si le LLM détecte un P0 sémantique récurrent post-parser**, c'est probablement un trou de contenu côté SOURCE Webflow, pas un bug parser.
2. **Pas de fix automatique pour du contenu manquant** — l'auto-drop fait perdre du legitimate content. Les seules options : (a) manual edit du data file, (b) re-scrape (peut-être que les éditeurs ont corrigé live), (c) accept the gap.
3. **Avant de coder un cleanup**, catégoriser les P0 par type via un grep sémantique. Si > 50% sont "truncated" / "empty-section" et viennent du source → c'est manuel, pas auto.

**Pattern à watch** : trader 1 P0 contre 2 régressions = cleanup trop agressif.

## 2026-04-28 — Multi-dimension QA OBLIGATOIRE avant "done"

**Mistake** : Tendance à déclarer "done" quand `qa-page` passe (regex). Mais qa-page seul rate les bugs sémantiques (sections vides, callouts placeholder, copy tronquée).

**Rule** : Pour shipper une page, les **6 dimensions doivent passer** (cf. workflow ci-dessus) :
1. **Regex/DOM** (qa-page) — pattern matching automatique
2. **Sémantique** (qa-llm Sonnet) — sections vides, copy quality
3. **Text coverage** (verify-rebuild) — % du texte live présent dans rebuild
4. **Visual** (qa-visual-diff) — pixel diff vs live
5. **Perf/A11y/SEO** (qa-lighthouse) — Core Web Vitals
6. **Broken links** (qa-links) — 0 P0 CTA cassé

Toléré WARN, INTERDIT BLOCK (P0).

**Pattern à watch** : "regex passe = done". Faux. Cf. session : 0 P0 regex pendant des heures avec 39 P0 LLM cachés.

## 2026-04-28 — Redirects 301 = ROI le plus élevé pour broken-links

**Mistake** : Au début j'ai cherché à rebuild les pages manquantes pour fixer les broken links. Trop coûteux pour le ROI. Le sweet spot : redirects 301.

**Rule** :
1. **Avant de rebuild une page manquante**, vérifier si un redirect 301 vers une page existante suffit. Pour les patterns systémiques (singular/plural, vieux paths Webflow, slugs renommés) → redirect, pas rebuild.
2. **Order matters dans `next.config.ts`** : règles spécifiques AVANT les catch-all (ex: `/fr/solution/rapport-flash` → `/fr/solutions/flash-report-projet` AVANT `/fr/solution/:slug` → `/fr/solutions/:slug`).
3. **Mesurer après** : `node scripts/qa-links.mjs` montre le delta exact. Cf session : 6 redirects = -547 P1 broken (-27%).

**Pattern à watch** : 88 pages référencent la même URL morte → redirect, pas 88 fixes.

## 2026-04-28 — Stub pages valid intermediate state

**Mistake** : Ne pas oser shipper une page incomplète. Tentation de tout rebuild avant de ship.

**Rule** :
1. **Une stub page propre = pages utilisables + 0 broken link** (vs 1 page parfaite + N broken links restants). Trade-off largement positif.
2. Pattern stub : `Hero (H1 + intro)` + `bullets` (3-4 lignes contextuelles) + `CTA externe → live URL` + `Footer`. Voir `MarketingStubPage.tsx`.
3. Stub doit utiliser DS primitives (Heading / Text / Footer) — JAMAIS de `<a>` button avec onClick (Server Component constraint, cf. lesson Button).

**Pattern à watch** : pages "Coming soon" sans contenu = mauvais. Stub avec H1 + intro + CTA + Footer = OK.

## 2026-04-28 — Test Vercel build localement avant merge PR

**Mistake** : Mergé une PR qui a TS-error-failed sur Vercel. Cause : `<Text tone="muted">` mais `tone` n'existe pas dans `TextProps`. Pas catché en dev (Next dev = lazy compile, le pattern n'a pas été touché localement avant push).

**Rule** :
1. **Avant `gh pr merge`** : `npm run build` en local pour catch les TS errors statiques.
2. Pour les ajouts de pages ou de composants, build prod = unique source de vérité.
3. Si Vercel preview fail dans une PR : `npx vercel inspect <dpl> --logs` pour voir le log avant tout merge.
4. **`tone` prop n'existe pas sur `<Text>`** — color overrides via `className="text-text-muted"`. Mémoriser ça pour les nouvelles pages.

**Pattern à watch** : "ça marche en dev, ship". Faux. Next dev compile lazy, le build prod compile tout.

## 2026-04-28 — Defensive renderer pour anomalies données

**Mistake** : `LandingPageV2` plantait 500 quand les data files avaient un `testimonial` sans `name` (LLM mis-classifié des pain-points en testimonials). `TestimonialCard` faisait `name.split(" ")` → undefined.crash.

**Rule** :
1. **Tous les renderers doivent filter les entrées invalides avant slice/map** :
   ```tsx
   const validTestimonials = (section.testimonials || []).filter(
     (t) => t?.text?.length > 0 && t?.name?.length > 0
   );
   if (validTestimonials.length === 0) return null;
   ```
2. **Section sans contenu utilisable = `return null`**. Ne pas afficher un container vide.
3. Pareil pour FAQ, Logos, Stats, etc. — chaque section a son `if (!items?.length) return null`.

**Pattern à watch** : crashes 500 sur certaines pages = data shape différent du type TS strict.

## 2026-04-28 — HTML pré-cleaning : strip SVG en premier

**Mistake** : Quand j'ai testé l'extraction LLM, mon clean-HTML donnait 100KB max mais ne stripait pas les `<svg>`. Résultat : 16 MILLIONS de chars de Webflow SVG inline → tout le content body après le 100KB cap était truncated → LLM ne voyait QUE le head + nav.

**Rule** :
1. **Strip `<svg>...</svg>` en TOUT premier** dans tout pipeline qui processe du Webflow HTML :
   ```python
   body = re.sub(r"<svg[\s\S]*?</svg>", "<svg/>", body, flags=re.IGNORECASE)
   ```
2. Webflow SVG = decorative icons. Garder leur structure DOM (`<svg/>` placeholder) pour préserver la position dans le flow, mais strip le content.
3. Aussi strip `<nav>` et `<footer>` (chrome répété) avant tout LLM/regex extract — gain massif sur le token budget.

**Pattern à watch** : 16 MB → 59 KB après strip-svg. Si le HTML brut > 1 MB, c'est qu'il y a du SVG inline.

## 2026-04-28 — Anthropic tool_use + oneOf = piège

**Mistake** : Construit un JSON Schema pour landing page avec `oneOf` sur 17 variants de section (TS discriminated union). Anthropic tool_use a retourné UNE seule section (hero) et stop. Output truncated.

**Rule** :
1. **Pour Anthropic tool_use, éviter `oneOf`** sur les array items. Use un schema permissive avec `type: { enum: [...] }` discriminator + post-hoc validation en JS.
2. **Schema permissive** : tous les fields possibles listés au top level, validation JS qui filter par `type`.
3. **Post-hoc Zod ou validateur custom** : valide après le call LLM, retry si invalide.

**Pattern à watch** : "Le LLM ne sort qu'1 entry" → schema trop strict, oneOf, ou required field bizarre.

## 2026-04-28 — Anthropic API peut renvoyer blocks comme STRING

**Mistake** : Pour les pages très longues (> 30KB cleaned HTML), le tool_use return parfois `blocks: "long string of XML/JSON-ish text"` au lieu d'un array. Mon validator checkait `array.length === 0` qui passait silencieusement (string a length aussi).

**Rule** :
1. **Toujours `Array.isArray(out.blocks)`** AVANT de checker length :
   ```js
   function isCorrupt(out) {
     if (!Array.isArray(out.blocks)) return true;
     if (out.blocks.length === 0) return true;
     if (out.blocks.length > 1000) return true; // probably string masquerading
     return false;
   }
   ```
2. **Auto-retry avec maxTokens=2x** si corrupt detected. Sonnet 4.6 truncate à `max_tokens` sans erreur explicite.
3. Pour pages > 30KB HTML : `maxTokens: 16000` minimum, `24000` pour safety.

**Pattern à watch** : `blocks.length === 21348` quand un article a normalement 70 blocks = string masquerading.

## 2026-04-28 — Anthropic prompt cache : minimum 1024 tokens

**Mistake** : `cache_control: { type: "ephemeral" }` sur le system prompt seul (~750 tokens). Cache silencieusement pas créé. `cacheR=0 cacheW=0` à chaque call → coût × 4-5.

**Rule** :
1. **Minimum 1024 tokens** sous le breakpoint sinon cache silently fails.
2. **Place le breakpoint APRÈS les tools** (pas sur system prompt seul) pour cumuler system + tool definition :
   ```js
   tools: [{ ..., cache_control: { type: "ephemeral" } }],
   ```
3. **Vérifier cacheW > 0** sur la première call. Si 0, augmenter le system prompt ou bundler les tools.

**Pattern à watch** : `cacheR=0 cacheW=0` après plusieurs calls = cache pas activé. Investiguer la taille du cached content.

## 2026-04-28 — Plan mode ≠ planning thinking

**Mistake** : Plan approuvé pour "pivot LLM parser", lancé l'exécution sans questionner. Plan était dans la mauvaise direction (quick fix vs proper fix). Plan approval ≠ plan correctness.

**Rule** :
1. **Plan mode = alignment user-side**, pas validation de l'approche technique.
2. **Pendant l'exécution**, si les résultats first-half divergent du plan, STOP + re-plan. Ne pas pousser jusqu'au bout.
3. **Mesurer le delta après chaque major step**. Cf. session : après le smoke test 2 pages LLM, j'aurais dû stopper quand cacheW=0 + 1-section-only.

**Pattern à watch** : "le plan est approuvé donc on go" + résultats décevants en cours → re-plan obligatoire.

---

## TL;DR — checklist rebuild une page nickel

- [ ] Re-parser depuis Supabase (parse-landings ou parse-blog) — le parser a les 4 fixes durables
- [ ] Strip `<svg>` + `<nav>` + `<footer>` AVANT toute extraction
- [ ] Word-boundary preservation pour headings (`get_text(separator=" ")` + apostrophe fix)
- [ ] Drop-cap detection pour `heading__pill`
- [ ] ZWSP strip everywhere
- [ ] Callout placeholder strip (`Speaker avatar:`)
- [ ] Defensive renderer (filter invalid entries before render)
- [ ] qa-page (regex) → 0 P0
- [ ] qa-llm (Sonnet) → ≤ 5 P0
- [ ] verify-rebuild (text coverage) → ≥ 92%
- [ ] qa-lighthouse → a11y ≥ 90, perf ≥ 75, SEO ≥ 95
- [ ] qa-links → 0 P0 CTA cassé
- [ ] qa-visual-diff → check les pages > 25% diff manuellement
- [ ] **`npm run build`** local AVANT merge (catch TS errors)
- [ ] Vercel preview build green AVANT `gh pr merge`
