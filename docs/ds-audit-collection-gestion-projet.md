# DS Audit — Collection Webflow "Gestion de projets" (63 articles)

**Date** : 2026-04-24
**Scope** : 63 articles blog FR, collection Webflow `609552290d93fd13100f0992`
**Source data** : `webflow_pages` (Supabase `ydudpmtbnvpxxenbnvab`, Postgres 17.6)

---

## Context

Audit du DS actuel vs contenu réel de la collection blog "Gestion de projets" pour **identifier précisément les composants manquants** avant le rebuild (Next.js + Strapi). Objectif : zéro gap à la découverte pendant le rebuild, chemin clair P1 → P3.

Méthode en 2 temps :
1. **Audit agrégé** (counts SQL globaux sur les 63 articles) → pattern inventory + coverage
2. **Per-article sweep** (63/63 articles scannés un par un) → zéro surprise cachée dans un article atypique

---

## Stats globales (collection)

| Métrique | Valeur |
|----------|--------|
| Articles | **63** (type='blog' dans `webflow_pages`) |
| Langue | 100% FR (zéro EN dans la collection) |
| Slugs uniques | 63/63 |
| HTML avg | 77 KB |
| HTML min | 19 KB (`le-diagramme-de-gantt-comment-sen-servir`) |
| HTML max | 2 761 KB (`portfolio-management` — **outlier non-blog**) |
| HTML median | ~30 KB |
| H2 total | 357 (avg 5.7/article) |
| H3 total | 666 (avg 10.6/article) |
| Figures | 362 (avg 5.8/article, 55/63 articles contiennent au moins 1 figure) |
| Blockquotes | 132 (24/63 articles) |
| TOC Finsweet `fs-toc-element` | 62/63 (98%) |
| iframes / scripts inline | **0 / 0** — collection clean |

---

## Schéma CMS Webflow

Collection ID `609552290d93fd13100f0992` — champs principaux :

| Champ Webflow | Type | Usage |
|---------------|------|-------|
| `slug` | PlainText | URL path |
| `name` | PlainText | Titre article |
| `post-summary` | RichText | Meta description / résumé |
| `main-image` | Image | Hero image |
| `post-body` | RichText | Corps article (HTML inline) |
| `category` | Reference → `blog-categories` | Catégorie "Gestion de projets" |
| `author` | Reference → `authors` | Auteur |
| `published-date` | DateTime | Date publi |
| `read-time` | Number | Lecture (min) |
| `featured` | Boolean | Mise en avant homepage |
| `slug-dossier-multilingue` | PlainText | Legacy mapping FR↔EN (inutilisé désormais) |

→ À mapper vers **`article` Strapi** (ou étendre `blog-post` existant avec `category`).

---

## Anatomie article (9 zones)

1. **Hero** — image + H1 + breadcrumb + meta (date, auteur, read-time)
2. **TOC sidebar sticky** (Finsweet TOC → `fs-toc-element`)
3. **Corps article** (rich text dynamique, blocks mixés)
4. **Blockquote / citation** inline (style speaker / citation-blog)
5. **Figures avec caption**
6. **CTAs inline** (lead magnet HubSpot, boutons custom)
7. **Callout "À retenir"** (box avec liste icons)
8. **Bloc "Pour aller plus loin"** (grid 2 cols de liens vers autres guides)
9. **Footer article** — 3 articles liés (BlogRelatedFrame)

---

## Coverage DS actuelle (55 composants)

| Zone | Couvert par | Status |
|------|-------------|--------|
| Hero | ~ `PageHeader` (pas assez riche pour article) | ❌ Gap |
| Meta (date, auteur, read-time) | — | ❌ Gap |
| TOC sticky | — | ❌ Gap |
| Corps rich text | — | ❌❌ **Gap critique** |
| Blockquote | — | ❌ Gap (2 variants : speaker + citation-blog) |
| Figure + caption | `Image` (primitive, pas de figcaption) | ❌ Gap |
| CTA inline | `Button` primitive (OK) | ✅ OK |
| Callout "À retenir" | — | ❌ Gap (découvert au sweep) |
| "Pour aller plus loin" | `RelatedSolutionsFrame` (variant possible) | ❌ Gap (variant optionnel) |
| 3 articles liés | — | ❌ Gap (variant de RelatedSolutionsFrame) |

→ **10 composants à créer** (au minimum) pour rebuild complet de la collection.

---

## Gaps priorisés

### P1 — CRITIQUES (bloquent tout rebuild) · 6 composants · 50/63 articles (79%)

1. **`ArticleBodyFrame`** — Renderer Dynamic Zone pour les blocks d'un article (texte, figures, blockquotes, listes, H2/H3, tables). Composant central. **Débloque 63 articles + 5 Solution long-form** = 68 pages.
2. **`ArticleHeroFrame`** — Hero blog (image + H1 + breadcrumb)
3. **`ArticleMetaFrame`** — Ligne meta (date + auteur + read-time)
4. **`TocSidebar`** — TOC sticky Finsweet-style, scroll-margin-top: 9rem pour éviter le clip navbar
5. **`BlogRelatedFrame`** — Grid 3 articles liés en footer
6. **`BlockquoteFrame`** — Blockquote stylée (2 variants : speaker + plain citation)

### P2 — IMPORTANTS · 5 composants · +10 articles (95% coverage)

7. **`RichTextFigure`** — Figure + figcaption + alignement (inline, pleine largeur)
8. **`InlineCta`** — CTA inline (paragraphe + bouton Action) — pattern standard
9. **`PullQuote`** — Quote visuelle (différente du blockquote, format editorial)
10. **`InsightCallout`** — 🆕 Box "À retenir / key takeaway" (12 articles · 19%)
11. **`HubspotCtaEmbed`** — 🆕 Wrapper lead-magnet HubSpot (8 articles · 13% · critique conversion)

### P3 — NICE TO HAVE · 3 composants · +2 articles (98% coverage)

12. **`RelatedResources`** — Bloc "Pour aller plus loin" optionnel (4 mégaguides + 12 autres avec simple heading)
13. **`FaqAccordionFrame`** — 🆕 FAQ expand/collapse (4 articles)
14. **`ComparisonTableBlock`** — 🆕 Table `airsaas-table` "sans/avec" (4 articles)

### P4 — HORS DS

- **`portfolio-management`** (2.76 MB, non-blog template) → page Next.js dédiée OU exclu de la migration CMS

---

## Proposition Strapi schéma

**Content-type `article`** (étendre `blog-post` existant · PR #38) :

```
article
├── title (string, required)
├── slug (uid, required, unique)
├── hero_image (media, required)
├── excerpt (text, max 240)
├── published_at (datetime)
├── read_time_min (int)
├── featured (boolean, default false)
├── category (relation → blog-category, single)
├── author (relation → author, single)
├── body (dynamiczone)
│   ├── block.rich-text
│   ├── block.figure (image + caption + alignement)
│   ├── block.blockquote (text + cite + speaker?)
│   ├── block.inline-cta (label + button href)
│   ├── block.insight-callout (title + list items)
│   ├── block.hubspot-cta (ctaId)
│   ├── block.faq-accordion (items[])
│   ├── block.comparison-table (columns[] + rows[])
│   ├── block.pull-quote (text + author)
│   └── block.html-raw (escape hatch pour outliers)
├── related_articles (relation → article, multiple, max 3)
└── seo (component: meta_title, meta_description, og_image)
```

---

## Rendering Blocks → DS components

| Strapi block | DS Component | Props clés |
|--------------|--------------|------------|
| `block.rich-text` | `ArticleBodyFrame` (routing) | markdown/html |
| `block.figure` | `RichTextFigure` | src, alt, caption, align |
| `block.blockquote` | `BlockquoteFrame` | text, cite, variant |
| `block.inline-cta` | `InlineCta` | label, href, variant |
| `block.insight-callout` | `InsightCallout` | title, items[] |
| `block.hubspot-cta` | `HubspotCtaEmbed` | ctaId |
| `block.faq-accordion` | `FaqAccordionFrame` | items[{q,a}] |
| `block.comparison-table` | `ComparisonTableBlock` | cols[], rows[] |
| `block.pull-quote` | `PullQuote` | text, author |

---

## Séquence rebuild (5 étapes)

- **Étape A** — Ship P1 × 6 composants DS (`ArticleBodyFrame` + 5 autres) → rebuild 50 articles standards
- **Étape B** — Migration Strapi content-type + seed 3 articles tests
- **Étape C** — Script migration HTML → Blocks (parse post-body Webflow, emit Dynamic Zone Strapi)
- **Étape D** — Ship P2 × 5 composants → +10 articles (95%)
- **Étape E** — Ship P3 × 3 composants + handle outlier `portfolio-management` → 100%

---

## Relation avec audit précédent (26 pages)

| Gap 26-pages audit | Gap collection blog | Consolidation |
|--------------------|---------------------|---------------|
| P1-#4 `ArticleBodyFrame` (5 Solution long-form) | P1-#1 `ArticleBodyFrame` (63 articles) | **Même composant** — prioriser, scope unique |
| P1-#3 `RelatedSolutionsFrame` (10 pages) | P1-#5 `BlogRelatedFrame` (63 articles) | **2 variants d'un même pattern grid** |
| — | P1-#2/#3 `ArticleHeroFrame` + `ArticleMetaFrame` | Nouveau (blog-specific) |
| — | P1-#4 `TocSidebar` | Nouveau (blog + long-form solution) |
| P2-#10 `TestimonialCard.quote` max 400 | P2-#6 `SpeakerQuoteBlock` | **Composants distincts** |

→ **`ArticleBodyFrame` = composant #1 à construire** (débloque 5 Solution + 63 articles = 68 pages).

---

## Artefacts

- **Data scraping** : `webflow_pages` table Supabase (63 rows `type=blog`)
- **Webflow CMS schema** : `data_cms_tool > get_collection_details`
- **Patterns HTML** : 4 requêtes SQL `regexp_count` / `~` sur `html_content`

## Open questions

1. Collections blog multiples : les "plusieurs Blogs" mentionnés partagent-ils le même template ?
2. Content-type Strapi : créer `article` ou étendre `blog-post` (PR #38) avec `category` → recommandation = **étendre**
3. Quotes mutualisées : conserver (recommandé) ou inline ?
4. URL i18n : `slug-dossier-multilingue` à ignorer ou préserver pour rétro-compat ?

---

## Verdict

- ❌ **Collection actuellement non rebuild-able** — bloquée par `ArticleBodyFrame` + composants blog-specific
- ✅ **Chemin clair** : ~6 composants P1 + 4-5 content-types Strapi + 1 script de migration HTML → Blocks
- 🔗 **ROI élevé** : `ArticleBodyFrame` débloque 68 pages (63 articles + 5 Solution long-form)

---

## Per-article sweep (63/63)

### Méthode

Audit agrégé initial jugé insuffisant → passage **article-par-article** pour garantir zéro pattern oublié. Méthodo : 4 requêtes SQL `regexp_count` / `~` sur `webflow_pages.html_content` pour inventorier par slug (a) counts structurels, (b) présence de patterns / classes Webflow, (c) union des classes CSS vues ≥1×, (d) union des tags HTML utilisés. Zéro fetch de HTML en contexte — uniquement compteurs retournés par la base.

### Tableau 63 articles

Colonnes : `len` chars, `h2/h3/h4`, `fig` figures, `bq` blockquotes, `tbl` tables, `ul/ol`, `st` inline styles, `btn` `.button*`.
Flags : **T** TOC · **P** class `pour-aller-plus-loin` · **F** FAQ accordion · **A** callout "À retenir" · **C** `airsaas-table` compare · **H** HubSpot CTA · **Q** citation blockquote · **K** `call-cod` CTA.

| # | slug | len | h2 | h3 | h4 | fig | bq | tbl | ul | ol | st | btn | T | P | F | A | C | H | Q | K |
|---:|------|----:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | 10-pratiques-pour-developper-la-relation-de-confiance-dg-cio | 24k | 2 | 10 | 0 | 12 | 0 | 0 | 9 | 0 | 10 | 1 | ✓ |   |   | ✓ |   |   |   |   |
| 2 | analyse-des-risques-projet | 32k | 5 | 9 | 1 | 9 | 0 | 0 | 22 | 0 | 18 | 1 | ✓ |   |   |   |   |   |   |   |
| 3 | appel-doffres-et-evaluation-dune-solution-ppm | 29k | 3 | 6 | 0 | 3 | 0 | 0 | 1 | 1 | 11 | 1 | ✓ |   |   |   |   |   |   |   |
| 4 | budget-previsionnel-projet | 20k | 3 | 9 | 0 | 0 | 0 | 0 | 1 | 0 | 11 | 1 | ✓ |   |   |   |   |   |   |   |
| 5 | budgetiser-un-projet-sans-se-louper | 33k | 6 | 12 | 0 | 3 | 2 | 0 | 3 | 0 | 15 | 1 | ✓ |   |   |   |   |   | ✓ |   |
| 6 | cadrage-projet | 30k | 7 | 7 | 2 | 4 | 5 | 0 | 7 | 1 | 18 | 1 | ✓ |   |   | ✓ |   |   | ✓ |   |
| 7 | capacity-planning | 36k | 5 | 14 | 0 | 3 | 0 | 0 | 6 | 0 | 17 | 1 | ✓ |   |   |   |   | ✓ |   |   |
| 8 | capacity-planning-definition | 28k | 4 | 11 | 0 | 2 | 0 | 0 | 6 | 0 | 14 | 1 | ✓ |   |   |   |   | ✓ |   |   |
| 9 | chef-de-projet-pmo | 23k | 6 | 1 | 0 | 0 | 0 | 0 | 3 | 0 | 14 | 1 | ✓ |   |   |   |   |   |   |   |
| 10 | chef-de-projet-transverse | 28k | 3 | 11 | 9 | 5 | 0 | 0 | 4 | 2 | 13 | 1 | ✓ |   |   |   |   |   |   |   |
| 11 | comite-de-pilotage-definitions-et-incomprehensions | 27k | 1 | 5 | 5 | 5 | 5 | 0 | 6 | 0 | 12 | 1 | ✓ |   |   |   |   |   | ✓ |   |
| 12 | comite-pilotage-projet | 28k | 6 | 1 | 0 | 4 | 1 | 0 | 3 | 0 | 16 | 1 | ✓ |   |   |   |   |   | ✓ |   |
| 13 | comment-animer-un-bilan-projet-efficace | 35k | 8 | 10 | 5 | 7 | 0 | 0 | 6 | 1 | 22 | 1 | ✓ |   |   |   |   |   |   |   |
| 14 | comment-animer-un-comite-de-pilotage | 44k | 8 | 19 | 6 | 20 | 0 | 0 | 4 | 0 | 16 | 1 | ✓ |   |   |   |   |   |   |   |
| 15 | comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022 | 40k | 3 | 7 | 3 | 7 | 3 | 0 | 10 | 2 | 14 | 1 | ✓ |   |   | ✓ |   |   | ✓ |   |
| 16 | comment-decider-en-copil | 38k | 4 | 9 | 0 | 7 | 7 | 0 | 6 | 1 | 18 | 1 | ✓ |   |   |   |   |   | ✓ |   |
| 17 | comment-elaborer-un-reporting-efficace | 28k | 8 | 12 | 0 | 6 | 0 | 0 | 1 | 0 | 22 | 1 | ✓ |   |   |   |   |   |   |   |
| 18 | comment-faire-un-bon-point-davancement-projet | 32k | 3 | 16 | 3 | 6 | 2 | 0 | 4 | 0 | 17 | 1 | ✓ |   |   | ✓ |   |   | ✓ |   |
| 19 | comment-gerer-lagressivite-dans-les-comites-de-pilotage | 28k | 3 | 8 | 0 | 6 | 0 | 0 | 1 | 1 | 11 | 1 | ✓ |   |   |   |   |   |   |   |
| 20 | comment-mettre-en-place-un-comite-de-pilotage | 31k | 6 | 9 | 0 | 10 | 0 | 0 | 5 | 0 | 14 | 1 | ✓ |   |   |   |   |   |   |   |
| 21 | comment-mettre-en-place-un-pmo | 31k | 8 | 4 | 0 | 8 | 0 | 0 | 2 | 6 | 16 | 1 | ✓ |   |   |   |   |   |   |   |
| 22 | comment-mettre-une-bonne-meteo-projet | 24k | 4 | 9 | 10 | 10 | 0 | 0 | 2 | 1 | 14 | 1 | ✓ |   |   |   |   |   |   |   |
| 23 | comment-reussir-un-projet-transverse | 28k | 3 | 8 | 11 | 9 | 0 | 0 | 3 | 0 | 11 | 1 | ✓ |   |   |   |   |   |   |   |
| 24 | copil-projet-ou-comite-de-pilotage-projet-les-bases | 45k | 14 | 21 | 0 | 2 | 0 | 0 | 4 | 0 | 23 | 1 | ✓ |   |   |   |   |   |   |   |
| 25 | demarche-de-projet | 27k | 7 | 7 | 5 | 4 | 0 | 0 | 6 | 2 | 16 | 1 | ✓ |   |   | ✓ |   |   |   |   |
| 26 | fiche-projet-exemple-et-methodologie | 27k | 4 | 14 | 1 | 8 | 0 | 0 | 5 | 0 | 20 | 4 | ✓ |   |   |   |   |   |   | ✓ |
| 27 | gestion-de-portefeuille-projet-pme | 36k | 5 | 5 | 10 | 2 | 6 | 0 | 5 | 1 | 19 | 1 | ✓ |   |   |   |   |   | ✓ |   |
| 28 | **gestion-portefeuille-projets-vs-gestion-de-projet** ⚠ | 66k | 10 | 47 | 0 | 6 | 8 | **4** | 10 | 3 | 34 | 1 | ✓ | ✓ | ✓ |   | ✓ |   |   |   |
| 29 | jalon-projet | 23k | 6 | 3 | 0 | 5 | 0 | 0 | 11 | 0 | 17 | 1 | ✓ |   |   |   |   |   |   |   |
| 30 | kanban-gestion-de-projet | 22k | 4 | 2 | 0 | 3 | 0 | 0 | 4 | 0 | 15 | 1 | ✓ |   |   |   |   |   |   |   |
| 31 | kpi-gestion-de-projet | 24k | 5 | 6 | 0 | 3 | 0 | 0 | 17 | 0 | 16 | 1 | ✓ |   |   |   |   |   |   |   |
| 32 | la-revolution-numerique-industrie-4-0 | 39k | 8 | 0 | 0 | 0 | 8 | 0 | 5 | 0 | 16 | 1 | ✓ |   |   |   |   |   | ✓ |   |
| 33 | la-revue-de-projet | 26k | 8 | 9 | 0 | 5 | 0 | 0 | 16 | 0 | 21 | 1 | ✓ |   |   |   |   |   |   |   |
| 34 | le-diagramme-de-gantt-comment-sen-servir | 20k | 4 | 5 | 0 | 1 | 0 | 0 | 7 | 0 | 12 | 1 | ✓ |   |   |   |   |   |   |   |
| 35 | le-grand-guide-de-la-conduite-de-projet | 51k | 9 | 14 | 0 | 11 | 0 | 0 | 8 | 1 | 21 | 1 | ✓ |   |   |   |   |   |   |   |
| 36 | le-guide-du-mode-projet | 33k | 6 | 16 | 0 | 6 | 0 | 0 | 7 | 0 | 20 | 1 | ✓ |   |   |   |   |   |   |   |
| 37 | le-modele-de-presentation-pour-votre-comite-de-pilotage | 20k | 3 | 7 | 0 | 3 | 0 | 0 | 7 | 0 | 14 | 2 | ✓ |   |   |   |   |   |   | ✓ |
| 38 | le-portefeuille-projets-pour-faire-grandir-les-collaborateurs | 29k | 5 | 0 | 0 | 5 | 0 | 0 | 1 | 7 | 13 | 1 | ✓ |   |   |   |   |   |   |   |
| 39 | le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes | 31k | 4 | 7 | 0 | 5 | 1 | 0 | 4 | 1 | 17 | 1 | ✓ |   |   | ✓ |   |   | ✓ |   |
| 40 | lean-portfolio-management | 35k | 4 | 9 | 0 | 15 | 4 | 0 | 2 | 1 | 14 | 1 | ✓ |   |   | ✓ |   |   | ✓ |   |
| 41 | les-10-erreurs-portefeuille-projet | 34k | 11 | 0 | 0 | 9 | 0 | 0 | 2 | 0 | 19 | 1 | ✓ |   |   |   |   |   |   |   |
| 42 | macro-planning | 29k | 8 | 5 | 0 | 1 | 0 | 0 | 8 | 3 | 16 | 1 | ✓ |   |   | ✓ |   |   |   |   |
| 43 | **management-de-portefeuille-de-projet** ⚠ (clone #28) | 66k | 10 | 47 | 0 | 6 | 8 | **4** | 10 | 3 | 34 | 1 | ✓ | ✓ | ✓ |   | ✓ |   |   |   |
| 44 | **metier-pmo** ★ (most-featured) | 41k | 10 | 35 | 10 | 0 | 9 | **1** | 4 | 1 | 30 | 3 | ✓ | ✓ | ✓ |   | ✓ |   |   | ✓ |
| 45 | **pi-planning** ⚠ | 60k | 5 | 17 | 3 | 0 | 14 | 0 | 9 | 0 | 29 | 1 | ✓ |   |   | ✓ |   | ✓ | ✓ |   |
| 46 | pi-safe | 32k | 2 | 10 | 0 | 0 | 7 | 0 | 6 | 0 | 19 | 1 | ✓ |   |   |   |   | ✓ | ✓ |   |
| 47 | pilotage-de-projet | 31k | 3 | 12 | 0 | 5 | 3 | 0 | 4 | 0 | 18 | 1 | ✓ |   |   |   |   |   | ✓ |   |
| 48 | plan-capacitaire | 32k | 3 | 7 | 5 | 3 | 0 | 0 | 10 | 0 | 13 | 1 | ✓ |   |   |   |   | ✓ |   |   |
| 49 | **plan-de-communication-projet** ⚠ | 75k | 4 | 9 | 7 | 9 | 2 | 0 | 3 | 3 | **77** | 1 | ✓ |   |   | ✓ |   |   | ✓ |   |
| 50 | planification-de-la-capacite | 26k | 3 | 10 | 0 | 1 | 0 | 0 | 5 | 0 | 13 | 1 | ✓ |   |   |   |   | ✓ |   |   |
| 51 | planification-de-la-demande-capacity-planning | 22k | 5 | 2 | 0 | 4 | 0 | 0 | 1 | 0 | 15 | 1 | ✓ |   |   |   |   | ✓ |   |   |
| 52 | **portefeuille-projet** ⚠ (clone #28) | 66k | 10 | 47 | 0 | 6 | 8 | **4** | 10 | 3 | 34 | 1 | ✓ | ✓ | ✓ |   | ✓ |   |   |   |
| 53 | **portfolio-management** ⚠⚠ (non-blog) | 2761k | 9 | 11 | 6 | 0 | 3 | 0 | 0 | 0 | **191** | 5 |   |   |   |   |   |   |   |   |
| 54 | pourquoi-mettre-en-place-un-pmo | 32k | 9 | 0 | 0 | 8 | 0 | 0 | 3 | 0 | 17 | 1 | ✓ |   |   |   |   |   |   |   |
| 55 | pourquoi-vos-18-millions | 27k | 7 | 0 | 0 | 2 | 10 | 0 | 6 | 0 | 17 | 1 | ✓ |   |   |   |   |   | ✓ |   |
| 56 | preparer-comite-de-pilotage-d-un-projet | 31k | 2 | 12 | 4 | 11 | 0 | 0 | 3 | 0 | 10 | 1 | ✓ |   |   |   |   |   |   |   |
| 57 | **program-increment-planning** ⚠ (clone #45) | 60k | 5 | 17 | 3 | 0 | 14 | 0 | 9 | 0 | 29 | 1 | ✓ |   |   | ✓ |   | ✓ | ✓ |   |
| 58 | project-portfolio-management | 55k | 10 | 6 | 6 | 21 | 1 | 0 | 18 | 2 | 31 | 1 | ✓ |   |   |   |   |   | ✓ |   |
| 59 | reporting-pmo | 28k | 5 | 6 | 9 | 8 | 0 | 0 | 3 | 2 | 13 | 1 | ✓ |   |   |   |   |   |   |   |
| 60 | retour-sur-agile-en-seine-2023 | 35k | 6 | 17 | 1 | 19 | 0 | 0 | 6 | 0 | 16 | 1 | ✓ |   |   |   |   |   |   |   |
| 61 | role-du-pmo | 29k | 7 | 7 | 0 | 6 | 0 | 0 | 1 | 1 | 18 | 1 | ✓ |   |   |   |   |   |   |   |
| 62 | tout-savoir-sur-la-note-de-cadrage-projet | 31k | 6 | 4 | 5 | 7 | 0 | 0 | 5 | 0 | 21 | 4 | ✓ |   |   |   |   |   |   | ✓ |
| 63 | trois-innovations-gestion-portefeuille-projets | 32k | 2 | 6 | 3 | 6 | 1 | 0 | 4 | 0 | 14 | 1 | ✓ |   |   | ✓ |   |   | ✓ |   |

### Totaux flags (sur 63)

| Flag | Pattern | Articles | % | Impact DS |
|------|---------|---------:|---:|-----------|
| **T** | TOC `fs-toc-element` | 62 | 98% | `TocSidebar` (P1-#4) |
| **P** | class `pour-aller-plus-loin` | 4 | 6% | `RelatedResources` optionnel |
| **F** | FAQ accordion | 4 | 6% | **🆕 `FaqAccordionFrame`** |
| **A** | Callout "À retenir" | 12 | 19% | **🆕 `InsightCallout`** |
| **C** | `airsaas-table` compare | 4 | 6% | **🆕 `ComparisonTableBlock`** |
| **H** | HubSpot CTA embed | 8 | 13% | **🆕 `HubspotCtaEmbed`** |
| **Q** | Citation blockquote | 19 | 30% | Variants `BlockquoteFrame` (pas de nouveau gap) |
| **K** | CTA `call-cod` / `button-call` | 4 | 6% | Variant `Button` (OK) |

### Correction — "Pour aller plus loin"

Audit agrégé initial : 15/63 (24%). Per-article :
- **4/63** via class `pour-aller-plus-loin` (block structuré H2 + grid 2 cols)
- **16/63** via texte brut dans `text_content` (simple heading + `<ul>`)

→ 2 patterns distincts. Le DS doit gérer les deux (1 composant `RelatedResources` optionnel suffit).

### Classes atypiques (≤5 articles)

| Classe / token | Articles | Occ. | Interprétation |
|----------------|---------:|----:|----------------|
| `faq-item`, `faq-q`, `faq-a`, `faq-accordion` | 4 | 27 | 🆕 FAQ block |
| `airsaas-table`, `airsaas-compare` | 4 | 13 | 🆕 Comparison table |
| `a-retenir-podcast1`, `list-aretenir`, `list-item-aretenir` | 4 | 4 | 🆕 Callout "À retenir" |
| `hs-cta-embed-188471577013` | 5 | 5 | 🆕 HubSpot CTA #1 |
| `hs-cta-embed-188471576967` | 3 | 4 | 🆕 HubSpot CTA #2 |
| `blockquote2`, `citation-blog`, `citation-blog2` | 3-5 | 14-8 | → `BlockquoteFrame` |
| `call-cod`, `div-call-cod`, `button-call` | 1-4 | 1-8 | → `Button` |
| `w-richtext-align-floatleft` | 3 | 4 | Webflow float → grid |
| `wf-inter-n*`, `wf-montserrat-*` | 2 | 28 | Artefacts font loader — strip |
| `bullet__numbers`, `w-slider*`, `ytp-*` | 1 | 9-50 | Outlier `portfolio-management` |

### Tags HTML atypiques

| Tag | Articles | Occ. | Note |
|-----|---------:|----:|------|
| `table`, `tr`, `td`, `th`, `thead`, `tbody` | 4 | 13-132 | Compare tables |
| `span` | 5 | 44 | Rares en body |
| `b` | 2 | 10 | → `<strong>` à la migration |
| `svg`, `g`, `path`, `clippath`, `defs`, `mask` | 2 | 10-214 | Infographies inline (2 outliers) |
| `h5` | 1 | 1 | Max heading depth réel = H4 |
| `video`, `button`, `input`, `label`, `main` | 1 | 1-32 | Outliers |
| `iframe` | 0 | 0 | ✅ Zéro embed tiers |
| `script` | 0 | 0 | ✅ Zéro JS inline |

### Articles outliers

1. **`portfolio-management`** (2.76 MB, non-blog) — landing page stockée en tant qu'article CMS. Page Next.js dédiée OU exclusion migration.
2. **`plan-de-communication-projet`** (75 KB, 77 inline styles, 35 SVG) — infographie inline. Traiter comme image exportée.
3. **Triplets clones** : `gestion-portefeuille-projets-vs-gestion-de-projet` ≡ `management-de-portefeuille-de-projet` ≡ `portefeuille-projet` (66 k identiques). Canonical + 2 redirections 301.
4. **Paire clone** : `pi-planning` ≡ `program-increment-planning` (60 k identiques). Canonical FR + redirection.
5. **`metier-pmo`** — feature-complete (FAQ + compare + "Pour aller plus loin" + CTA). Candidat idéal pour QA blocks DS.

### Gap delta vs audit agrégé

| Priorité | Composant | Articles | Description |
|----------|-----------|---------:|-------------|
| **P2 — HIGH** | `InsightCallout` | 12 | Box "À retenir" avec liste icons |
| **P2 — MEDIUM** | `HubspotCtaEmbed` | 8 | Wrapper lead-magnet iframe HubSpot |
| **P3 — LOW** | `FaqAccordionFrame` | 4 | FAQ expand/collapse end-of-article |
| **P3 — LOW** | `ComparisonTableBlock` | 4 | Table 3-4 cols "sans/avec" |

**Verdict sweep** : 4 nouveaux gaps mineurs en couverture, significatifs en valeur (19% + 13% + 6% + 6%). **Pas de showstopper** — la liste P1 reste inchangée, 50/63 articles (79%) rebuild-able dès `ArticleBodyFrame` shipped.

### Action list updated

- **P1** (unchanged) : 6 composants → 50/63 articles (79%)
- **P2** (+1 new) : +5 composants (incl. `InsightCallout`, `HubspotCtaEmbed`) → 60/63 articles (95%)
- **P3** (+2 new) : +3 composants (incl. `FaqAccordionFrame`, `ComparisonTableBlock`) → 62/63 articles (98%)
- **Outlier hors DS** : `portfolio-management` → page Next.js dédiée OU exclue

**Go/No-go** : ✅ **GO P1 dès ArticleBodyFrame shipped**. 13 articles P2/P3 en graceful degradation (`html_raw` escape hatch Strapi).
