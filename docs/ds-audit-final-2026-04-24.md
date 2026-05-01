# DS Audit Final — 2026-04-24

> **Bilan consolidé** · Landings (26 pages) + Collection blog « gestion de projet » (63 articles)
> Baseline : `main` après merge PR #39 (`feat(ds): blog index page + BlogCollectionFrame + multi-author BlogCard`)

---

## Verdict

### 🟢 REBUILD-READY

| Scope | Verdict | Conditions |
|-------|---------|-----------|
| **26 landings** (4 LP + 6 Produit + 4 Équipes + 12 Solution) | **GO** | 0 P1/P2 bloquant. 1 relaxation contract triviale (TestimonialsFrame min 2→1). |
| **Template blog + 63 articles** | **GO avec conditions** | Recommandé avant rebuild : ajouter **HubspotCtaEmbed** (P2, 8 articles avec lead-magnet). Peut démarrer sans, rattraper ensuite. |

### Gaps restants (5 ouverts + 1 partiel)

| Priorité | Gap | Scope | Impact bloquant ? | Complexité |
|---------|-----|-------|-------------------|-----------|
| 🟡 P2 | `TestimonialsFrame.min 2→1` | Landings (~3 pages) | Non — contract relax | XS (1 ligne) |
| 🟡 P2 | `HubspotCtaEmbed` | Blog (8 articles) | Non — workaround iframe direct | S |
| 🟢 P3 | `RelatedResources` (« Pour aller plus loin ») | Blog (4 articles explicit + 16 via texte) | Non — inline acceptable | S |
| 🟢 P4 | `PressAndTestimonialsFrame` | Landings (14 pages) | Non — composition inline viable | M |
| 🟢 P4 | `ClientSectorsFrame` | Équipes (3 pages) | Non — grid inline | M |
| 🟢 P4 | `IndustryStatsFrame` | Solution (1 page) | Non — grid inline | M |

**Total gaps restants : 6** — aucun ne bloque le rebuild. 85 % des 30 gaps identifiés dans les audits précédents ont été fermés.

---

## 1 · Contexte

Ce document consolide 3 audits antérieurs + cross-check avec le DS actuel pour livrer **un verdict unique** sur la capacité du Design System à supporter le rebuild complet du site.

### Audits sources

| Doc | Date | Scope | Statut |
|-----|------|-------|--------|
| `ds-coverage-audit.md` | 2026-04-23 | 26 pages (live WebFetch) | 🟤 Legacy — superseded |
| `ds-audit-26-pages.md` | 2026-04-24 | 26 pages (captures JSON + visuel) | ✅ Référence landings |
| `ds-audit-collection-gestion-projet.md` | 2026-04-24 | 63 articles blog (per-article sweep SQL) | ✅ Référence blog |

### Événements DS depuis

- **PR #42** — Docs audit 26 pages merged
- **PR #39** — Blog pipeline : BlogCollectionFrame, multi-author BlogCard, + **19 commits DS** (TabsFrame, ProseFrame, TocSidebar, BlogRelatedFrame, InlineCta, InsightCallout, StepsFrame, RelatedSolutionsFrame, ClientsFrame, Quote variant="pull", Hero `floatingCards`, id prop sur 17 frames, extensions IllustrationFrame + Quote, etc.)

### Baseline DS actuelle

- **64 composants** total (`docs/ds-components-reference.md`)
  - 36 UI primitives
  - 28 Section frames
- **0 contract manquant**

---

## 2 · Scope A — 26 landings

### Coverage par type de page

| Type | Pages | Status coverage DS | Gaps résiduels |
|------|-------|-------------------|----------------|
| **LP** (Landing Page) | 4 | ✅ Complet | — |
| **Produit** | 6 | ✅ Complet | — |
| **Équipes** | 4 | 🟡 Quasi-complet | `PressAndTestimonialsFrame` (P4), `ClientSectorsFrame` (P4, 3/4 pages) |
| **Solution** | 12 | 🟡 Quasi-complet | `IndustryStatsFrame` (P4, 1 page), `PressAndTestimonialsFrame` (P4, 10/12 pages) |

### Composants DS utilisés

Inventaire des section frames déployés pour couvrir les 26 pages :

| Catégorie | Composants |
|-----------|-----------|
| **Héros & CTAs** | `Hero` (avec `floatingCards` opt-out), `CtaFrame`, `CtaHighlightFrame` |
| **Contenu structuré** | `FeatureFrame`, `FeatureSectionStacked`, `ValuePropositionFrame` (columns 2-6), `PillarFrame`, `HighlightFrame`, `IconRowFrame` |
| **Narratif** | `StepsFrame`, `ProseFrame`, `TabsFrame` (hero-adjacent), `TableOfContentsFrame`, `TocSidebar` (sticky) |
| **Comparatif** | `ComparisonFrame`, `ComparisonDualFrame`, `ComparisonTableFrame` |
| **Social proof** | `TestimonialsFrame`, `ClientsFrame`, `LogosBar`, `TestimonialCompanyCard` (href) |
| **FAQ** | `FaqFrame` (accordion) |
| **Carousel** | `SliderFrame` (light + dark, 3-8 slides) |
| **Cross-link** | `RelatedSolutionsFrame`, `RelatedArticlesFrame` |
| **Layout** | `Navbar`, `Footer` |

### Gaps fermés depuis les audits précédents

- ✅ `TabsFrame` (P1)
- ✅ `StepsFrame` — couvre `ProcessStepsFrame` (P1)
- ✅ `RelatedSolutionsFrame` (P1)
- ✅ `ProseFrame` + `BlogArticleBody` — couvrent `ArticleBodyFrame` (P1, shared avec blog)
- ✅ `ValuePropositionFrame.cols` → 2-6 (P2)
- ✅ `IconRowFrame.min` → 3 (P2)
- ✅ `ComparisonFrame.min` → 3 (P2)
- ✅ `FaqFrame.min` → 2 (P2)
- ✅ `TestimonialCard.truncateAt` → 400 + read-more (P2)
- ✅ `SliderFrame.variant="dark"` + cap 5→8 (P3)
- ✅ `TestimonialCompanyCard.href` optional (P3)
- ✅ `CardCta.mediaThumbnail` (P3)
- ✅ `id` prop sur 17 section frames — débloque TabsFrame scroll-spy + TocSidebar (P3)

### Gaps ouverts landings

| Gap | Priorité | Scope | Décision |
|-----|----------|-------|---------|
| `TestimonialsFrame.min 2→1` | P2 | 3 pages (LP + Équipes + Solution) | Relaxer contract — 1 ligne |
| `PressAndTestimonialsFrame` | P4 | 14 pages (LogosBar + 3 TestimonialCard) | **Composition inline** lors du rebuild. Si pattern confirmé DRY après rebuild, extraire en composant. |
| `ClientSectorsFrame` | P4 | 3 Équipes (10-12 cards navigable) | **Inline grid** en attendant. Si réutilisé, extraire. |
| `IndustryStatsFrame` | P4 | 1 Solution (12+ stats) | **Inline grid** suffisant pour 1 page. |

---

## 3 · Scope B — Collection blog « gestion de projet »

### Stats globales

- **63 articles** `type='blog'`, collection « gestion de projet »
- **77 KB HTML moyen** (min 19 KB, max 2.76 MB — outlier `portfolio-management` non-blog)
- **FR-only** (pas d'i18n)
- **62/63** match marker body standard (1 exception = outlier)

### Composants DS pour le template blog

| Besoin | Composant |
|--------|-----------|
| Hero article (image + H1 + breadcrumb + meta auteur + date) | `BlogHero` + `BlogAuthorTag` |
| Index collection (grid 3-col + CTA) | `BlogCollectionFrame` + `BlogCard` (multi-author) |
| Body prose (Dynamic Zone renderer) | `BlogArticleBody` (alias `ProseFrame maxWidth="wide"`) |
| Figure + figcaption | `IllustrationFrame` (tone="warm" + caption) |
| TOC sticky Finsweet-style | `TocSidebar` (sticky, scroll-spy) |
| Blockquote éditorial | `Quote` (variant="card" et "pull") |
| Inline CTA (tinted + button) | `InlineCta` |
| À retenir / key takeaway | `InsightCallout` (2-6 bullets + icons) |
| Related articles footer (3 articles) | `BlogRelatedFrame` |

### Gaps fermés depuis les audits précédents

- ✅ `ArticleBodyFrame` → `BlogArticleBody` (P1) — débloque 63 articles + 5 Solution long-form
- ✅ `ArticleHeroFrame` → `BlogHero` (P1)
- ✅ `ArticleMetaFrame` → `BlogAuthorTag` (P1, intégré à BlogHero + réutilisable)
- ✅ `TocSidebar` sticky (P1)
- ✅ `BlogRelatedFrame` — 3 articles grid (P1)
- ✅ `BlockquoteFrame` → `Quote` variant="card" (P1)
- ✅ `RichTextFigure` → `IllustrationFrame` tone="warm" + caption + figcaption (P2)
- ✅ `InlineCta` (P2)
- ✅ `PullQuote` → `Quote` variant="pull" (P2)
- ✅ `InsightCallout` (P2)
- ✅ `ComparisonTableBlock` → `ComparisonTableFrame` (P3)
- ✅ `FaqAccordionFrame` → `FaqFrame` (déjà accordion ; pas de composant séparé nécessaire) (P3)

### Gaps ouverts blog

| Gap | Priorité | Scope | Décision |
|-----|----------|-------|---------|
| `HubspotCtaEmbed` | P2 | 8 articles avec lead-magnet (`hs-cta-embed-*`) | **Recommandé avant rebuild.** Sinon workaround = iframe HubSpot inline temporaire. |
| `RelatedResources` (« Pour aller plus loin ») | P3 | 4 articles avec `pour-aller-plus-loin` class + 16 articles avec heading texte | **Inline list-of-links acceptable.** Extraire en composant si fréquence confirmée. |

### Articles outliers

Identifiés dans le per-article sweep :

| Article | Problème | Action |
|---------|----------|--------|
| `portfolio-management` (row #53) | 2.76 MB, pas de marker body standard, `wdyn_ct=29` | **Hors périmètre blog.** Exclure du rebuild OU convertir en page Next.js dédiée. |
| `plan-de-communication-projet` (row #44) | 77 inline styles, 35 SVG icons (infographic) | **Rebuild manuel** — infographic à traduire en composants DS ou image optimisée. |
| 3 sets de duplicate slugs | `gestion-portefeuille-projets-vs-gestion-de-projet` ≡ `management-de-portefeuille-de-projet` ≡ `portefeuille-projet` ; `pi-planning` ≡ `program-increment-planning` ; `metier-pmo` est un duplicate | **Canonical + 301 redirects.** Voir §4 Content Actions. |

---

## 4 · Gap list consolidée priorisée

### P1 — Bloquants rebuild

**🎉 Aucun.** Tous les gaps P1 identifiés ont été fermés par PR #39.

### P2 — Quick wins avant rebuild

| # | Gap | Scope | Effort | ROI |
|---|-----|-------|--------|-----|
| 1 | `TestimonialsFrame.min 2→1` | 3 pages | XS (1 ligne) | Haut |
| 2 | `HubspotCtaEmbed` | 8 blog articles (conversion) | S (~60 lignes) | Haut (critique conversion) |

### P3 — Nice-to-have

| # | Gap | Scope | Effort | Décision |
|---|-----|-------|--------|---------|
| 3 | `RelatedResources` bloc | 4 blog articles explicit + 16 via heading | S | Différer → rebuild inline d'abord |

### P4 — Optional (composition inline suffit)

| # | Gap | Scope | Décision |
|---|-----|-------|---------|
| 4 | `PressAndTestimonialsFrame` | 14 landings | Composition inline ; extraire après rebuild si DRY confirmé |
| 5 | `ClientSectorsFrame` | 3 Équipes | Grid inline |
| 6 | `IndustryStatsFrame` | 1 Solution | Grid inline |

### P5 — Inline patterns (non-DS)

Les patterns suivants sont intentionnellement hors DS (single-use) :
- Newsletter email preview (1 Équipes + 1 Solution)
- Podcast episode list (1 Équipes)
- Competitor narrative cards (1 LP)

---

## 5 · Content actions (non-DS)

Actions produit/contenu à traiter en parallèle du rebuild :

| # | Action | Scope | Propriétaire |
|---|--------|-------|--------------|
| 1 | **Canonical slugs blog** — choisir le slug de référence, les 2 autres en 301 | 3 sets de duplicates identifiés | Produit/SEO |
| 2 | **Exclusion `portfolio-management`** du rebuild blog OU conversion page Next.js | 1 article | Produit |
| 3 | **Rebuild manuel `plan-de-communication-projet`** — infographic SVG → composants DS ou image | 1 article | Dev |
| 4 | **Migration lead-magnet HubSpot** — valider que les 8 CTA HubSpot fonctionnent toujours (ou remplacement Strapi/Zapier) | 8 articles | Marketing |
| 5 | **Strapi content-type `blog-article`** avec Dynamic Zone (body blocks) | Toute la collection | Dev — voir schéma §6 |

---

## 6 · Séquence recommandée pour le rebuild

### Phase 0 · Quick wins DS (1-2h)
1. Relaxer `TestimonialsFrame.min` 2→1 (1 ligne + test)
2. (Optionnel) Créer `HubspotCtaEmbed` (S effort — débloque 8 articles)

### Phase 1 · Template blog + rebuild 63 articles (J+1 à J+3)
1. Définir schéma Strapi `blog-article` + Dynamic Zone
2. Builder route `/[locale]/blog/[slug]` utilisant `BlogHero` + `BlogArticleBody` + `TocSidebar` + `BlogRelatedFrame`
3. Migration contenu (63 articles) — parser HTML Webflow → blocks Dynamic Zone
4. Traiter outliers (canonical, exclusions, infographic)
5. QA Playwright + visual regression

### Phase 2 · Rebuild 26 landings (J+3 à J+8)
1. Builder templates par type (LP, Produit, Équipes, Solution)
2. Composer via DS existant (0 nouveau composant requis)
3. Gérer inline les 3 patterns P4 (Press, ClientSectors, IndustryStats)
4. QA Playwright + visual regression

### Phase 3 · Consolidation post-rebuild (J+8 à J+10)
1. Audit inline patterns vs DS — si ≥2 occurrences DRY confirmée, extraire en composant
2. Remonter d'éventuels gaps non anticipés
3. Finaliser redirect 301 des slugs duplicates

---

## 7 · Annexes

### A · Historique des audits (évolution gap count)

| Audit | Date | Gaps P1 | Gaps P2 | Gaps P3 | Gaps P4 | Total |
|-------|------|--------|--------|--------|--------|-------|
| `ds-coverage-audit.md` | 2026-04-23 | 5 | ~8 | ~2 | ~3 | ~18 |
| `ds-audit-26-pages.md` | 2026-04-24 | 4 | 7 | 2 | 3 | **16 landings** |
| `ds-audit-collection-gestion-projet.md` | 2026-04-24 | 6 | 5 | 3 | 0 | **14 blog** |
| **CE DOCUMENT** | 2026-04-24 | 0 | 2 | 1 | 3 | **6 total** |

### B · Méthode

- **Cross-check DS** : pour chaque gap listé, vérification dans `src/components/library-design/` (existence fichier) + lecture contract (`@purpose` / `@limits`) pour validité couverture.
- **Source landings** : `docs/live-captures/*/*.json` (26 pages, 2026-04-23) + `ds-audit-26-pages.md`.
- **Source blog** : SQL Supabase `webflow_pages` (63 rows `type='blog'`) + per-article sweep dans `ds-audit-collection-gestion-projet.md`.
- **Baseline DS** : `main@HEAD` après merge PR #39 (2026-04-24). Référence regenerated via `python3 scripts/generate-ds-reference.py`.

### C · Risques résiduels

| Risque | Probabilité | Mitigation |
|--------|-------------|-----------|
| Gap non anticipé découvert pendant rebuild | Moyenne | QA Playwright + review post-rebuild (§Phase 3) |
| Migration HubSpot CTA cassée (JS non-loaded) | Haute | HubspotCtaEmbed avant rebuild OU test manuel 8 articles |
| Duplicate slugs causent SEO canonical confusion | Haute | Redirects 301 en même temps que rebuild |
| Infographic `plan-de-communication-projet` illisible en mobile | Moyenne | Rebuild manuel avec version responsive |

### D · Ce qui reste à décider avant Phase 1

1. **Strapi schéma blog-article** — valider avec l'équipe produit (proposition dans `ds-audit-collection-gestion-projet.md`)
2. **Canonical slugs** — 3 sets à trancher
3. **Article `portfolio-management`** — inclure en page dédiée ou exclure ?
4. **HubspotCtaEmbed** — construire avant Phase 1 (recommandé) ou workaround iframe pour les 8 articles ?

### E · Références

- Design System rules : `docs/ds-rules.md`
- Contracts complets : `docs/ds-components-reference.md`
- Sections catalog : `docs/sections-catalog.md`
- Spec migration : `.context/attachments/SPEC_Migration_v4.0_FINAL.md`
- Audits sources :
  - `docs/ds-audit-26-pages.md`
  - `docs/ds-audit-collection-gestion-projet.md`
  - `docs/ds-coverage-audit.md` (legacy)

---

*Fin du document — audit final rebuild-ready, 2026-04-24.*
