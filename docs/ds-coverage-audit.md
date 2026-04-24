# DS Coverage Audit — 26 Pages (LP / Solution / Produit / Équipes)

**Date :** 2026-04-23
**Périmètre :** 4 Landing Pages + 12 Solutions + 6 Produits + 4 Équipes = **26 pages**
**Source :** fetch live de `https://www.airsaas.io/fr/*` + extraction `webflow_pages` Supabase
**Référence DS :** `docs/ds-components-reference.md` (47 composants : 33 primitives + 21 section frames)
**Hypothèse de travail :** le texte est strictement identique à Webflow ; seul le design change. On ne doit donc pas inventer de contenu — uniquement mapper les sections existantes aux composants DS.

---

## TL;DR

| Template | Pages | Couverture DS | Verdict |
|---|---|---|---|
| **Landing Pages** (`/lp/*`) | 4 | 🟠 **~80 %** — 2 gaps structurels | Publiable après ajout de `StepsFrame` + `RelatedSolutionsFrame` |
| **Solution** (`/solution/*`) | 12 | 🟢 **~95 %** — 1 gap mineur (grand grid clients) | Publiable ; extension recommandée |
| **Produit** (`/produit/*`) | 6 | 🟠 **~85 %** — 1 gap (cross-sell bas de page) | Publiable après ajout de `RelatedSolutionsFrame` |
| **Équipes** (`/equipes/*`) | 4 | 🟠 **~80 %** — 1 gap (grand grid clients) | Publiable après extension `TestimonialsFrame` |

**En bref :** la DS couvre **l'immense majorité** des sections, mais 3 composants manquent pour rendre fidèlement les 26 pages :

1. 🔴 **`StepsFrame`** — 3 à 5 étapes séquentielles numérotées (4 LP)
2. 🔴 **`RelatedSolutionsFrame`** — 4 cartes "solutions associées" image + titre + lien (11 pages)
3. 🟠 **Grand grid de clients** — 8 à 9 `<ClientCard>` avec carrousel (extension de `TestimonialsFrame` ou nouveau `ClientsFrame`)

Aucun gap ne touche la charte visuelle du DS — ce sont des patterns **manquants**, pas **incompatibles**.

---

## 1. Méthodologie

### Données collectées

1. **Supabase `webflow_pages`** : contenu HTML + text_content pour les 18 pages Solution + Produit (4 Équipes et 4 LP absentes).
2. **WebFetch** live sur airsaas.io pour les 26 pages (complète les trous + valide les structures).
3. **Extraction section-par-section** via vocabulaire contrôlé (`hero-dual-cta`, `pain-points-list`, `feature-side-by-side`, etc.).

### Vocabulaire d'analyse

28 types de sections identifiés à travers les 26 pages. Chaque type est mappé à un (ou plusieurs) composants `library-design/` :

| Type section page | Composant DS | Statut |
|---|---|---|
| `navbar` | `<Navbar>` | ✅ |
| `hero` (single CTA) | `<Hero>` | ✅ |
| `hero-dual-cta` + trust badges | `<Hero>` (primaryCta + secondaryCta + bottomTags) | ✅ |
| `hero` avec tabs/rotating | `<Hero>` standard (pas de tabs) | ⚠️ exception HomePage (HeroTabs hors DS) |
| `logos-bar` (5 logos clients) | `<LogosBar>` | ✅ |
| `press-logos-cards` (4 cartes presse) | `<TestimonialsFrame>` + `<TestimonialCompanyCard>` | ✅ |
| `linkedin-testimonials` (3-6 profils) | `<TestimonialsFrame>` + `<TestimonialCard>` | ✅ |
| `testimonial-grid` (8-9 clients, carrousel) | `<TestimonialsFrame>` ❌ (max 6) | 🔴 **GAP** |
| `stats-row` (4 métriques) | `<ValuePropositionFrame>` + `<FeatureCard>` (columns=4) | ✅ |
| `pain-points-list` (N numérotés) | `<ComparisonFrame>` (usage solo) | ✅ (usage documenté) |
| `feature-side-by-side` | `<FeatureFrame>` (layout inline) | ✅ |
| `feature-stacked` | `<FeatureSectionStacked>` / `<FeatureFrame layout="stacked">` | ✅ |
| `value-proposition-grid` (3-4) | `<ValuePropositionFrame>` | ✅ |
| `pillar-grid` (3-6 règles/principes) | `<PillarFrame>` | ✅ |
| `comparison-avec-sans` (pairé) | `<ComparisonDualFrame>` | ✅ |
| `comparison-avec-sans` (1 colonne) | `<ComparisonFrame>` | ✅ |
| `comparison-dual` (3 concurrents) | `<ComparisonTableFrame>` | ✅ |
| `faq-accordion` | `<FaqFrame>` | ✅ |
| `how-it-works-steps` (4 étapes séquentielles) | *(aucun — `HighlightFrame` exclut explicitement les "sequential steps")* | 🔴 **GAP** |
| `security-badges` (4 badges ISO/France/Pentest/SSO) | `<IconRowFrame>` (fit visuel) | ✅ (à confirmer visuellement) |
| `integrations-carousel` (diagrammes) | `<Slider>` / `<SliderFrame>` | ✅ |
| `integrations-carousel` (logos) | `<IconRowFrame>` | ✅ |
| `cta-midpage` (single CTA) | `<CtaHighlightFrame>` | ✅ |
| `cta-dual-cards` (démo + vidéo/guide) | `<CtaFrame>` + 2× `<CardCta>` | ✅ |
| `cta-highlight-single` | `<CtaHighlightFrame>` | ✅ |
| `icon-row` (6 modules produit) | `<IconRowFrame>` | ✅ |
| `feature-cards-grid` (4 related-solutions) | *(aucun composant — image-first cross-sell cards)* | 🔴 **GAP** |
| `slider` (6 images bootcamp) | `<Slider>` (OK) / `<SliderFrame>` (max 5 ⚠️) | ⚠️ limite à relaxer |
| `highlight-zigzag` (replay vidéo) | `<HighlightFrame>` | ✅ |
| `footer` | `<Footer>` | ✅ |

---

## 2. Coverage par Template

### 2.1 Landing Pages — 4 pages

| # | URL | Couverture |
|---|---|---|
| 1 | `/lp/ppm` | 🟠 gaps : `StepsFrame`, `RelatedSolutionsFrame` |
| 2 | `/lp/pmo` | 🟠 gaps : `StepsFrame`, `RelatedSolutionsFrame` |
| 3 | `/lp/capacity-planning` | 🟠 gaps : `StepsFrame` (×2 sur la page), `RelatedSolutionsFrame` |
| 4 | `/lp/pi-planning` | 🟠 gaps : `StepsFrame`, `RelatedSolutionsFrame` |

**Squelette LP (quasi identique 4/4)** :

```
<Navbar>                                    ✅
<Hero primaryCta secondaryCta bottomTags>   ✅
<LogosBar>                                  ✅
<IconRowFrame>  (modules produit, 3/4 LP)   ✅
<ValuePropositionFrame columns=4 + FeatureCard>  (stats-row)  ✅
<ComparisonFrame>  (pain-points solo)       ✅
<FeatureFrame> × 7-9                        ✅
<ValuePropositionFrame columns=3>  (why adopt) ✅
<TestimonialsFrame + TestimonialCard>       ✅
<IconRowFrame>  (security badges)           ✅ (à valider Figma)
<Slider> / <SliderFrame>  (integrations)    ✅
<StepsFrame>  ❌                            🔴 GAP (4 étapes numérotées)
<FaqFrame>                                  ✅
<RelatedSolutionsFrame>  ❌                 🔴 GAP (4 cards image + lien)
<CtaFrame + 2× CardCta>                     ✅
<Footer>                                    ✅
```

**Particularité `/lp/pi-planning`** : ajoute `<ComparisonDualFrame>` (avec/sans) et `<ComparisonTableFrame>` (3 concurrents Jira Align / PowerBI / piplanning.io) — **les deux sont déjà couverts**.

**Note layout** : les LP tournent sous route group `(lp)` avec `LpNavbar` + `LpFooter` minimaux (`components/layout/`, hors DS). Ces deux layouts ne sont **pas** dans `library-design/` mais c'est un choix architectural assumé (navbar/footer minimaux spécifiques LP).

---

### 2.2 Solution — 12 pages

| # | URL | Sous-type | Couverture |
|---|---|---|---|
| 1 | `/solution/management-de-portefeuille-projet` | A (marketing) | ✅ 100% |
| 2 | `/solution/flash-report-projet` | A | ✅ 100% |
| 3 | `/solution/flash-report` | A | ✅ 100% |
| 4 | `/solution/revue-de-portefeuille` | A | ✅ 100% (PillarFrame à 6 items ✓) |
| 5 | `/solution/tableau-de-bord-portefeuille-de-projet` | A | ✅ 100% |
| 6 | `/solution/portfolio-management` | B (Équipes-like) | 🟠 gap grand grid clients |
| 7 | `/solution/tableau-de-bord-dsi` | C (long-form) | ✅ 100% |
| 8 | `/solution/tableau-de-bord-gestion-de-projet` | C | 🟠 gap `RelatedSolutionsFrame` (5 cards en haut) |
| 9 | `/solution/gestion-portefeuille-projet` | B | 🟠 gap grand grid clients + ComparisonTable |
| 10 | `/solution/outils-de-pilotage-projet` | B | ✅ 100% |
| 11 | `/solution/outil-ppm` | B | 🟠 gap `RelatedSolutionsFrame` (5 cards) |
| 12 | `/solution/airsaas-et-les-experts-de-la-transfo` | outlier | ⚠️ `Slider` ×2 — dépasse SliderFrame limite 5 (6 images) |

**3 sous-templates identifiés** :

- **Type A (5 pages)** : hero → feature-stacked (intro) → feature-side-by-side ×N → `<PillarFrame>` (N règles d'or) → `<TestimonialsFrame>` press + LinkedIn → footer. **100 % couvert**.
- **Type B (5 pages)** : hero → press-logos-cards → LinkedIn testimonials → stats-row → feature-side-by-side ×N → `<PillarFrame>` → `<ComparisonDualFrame>` avec/sans → `<ClientsFrame>` 9 cartes → footer. **Gap sur le grid 9 clients.**
- **Type C (2 pages)** : hero → feature-cards-grid (5 solutions) → icon-row → feature-side-by-side ×N → feature-stacked éducatifs (longs) → cta-midpage → footer. **Gap sur le `feature-cards-grid` à 5 solutions en haut de page** (même composant que `RelatedSolutionsFrame`).

---

### 2.3 Produit — 6 pages

| # | URL | Couverture |
|---|---|---|
| 1 | `/produit/capacity-planning` | 🟠 gap `RelatedSolutionsFrame` (4 cards en bas) |
| 2 | `/produit/priorisation-par-equipes` | 🟠 gap `RelatedSolutionsFrame` |
| 3 | `/produit/reporting-projet` | 🟠 gap `RelatedSolutionsFrame` |
| 4 | `/produit/automatiser-la-com-projet` | 🟠 gap `RelatedSolutionsFrame` |
| 5 | `/produit/budget` | 🟠 gap `RelatedSolutionsFrame` |
| 6 | `/produit/traduction-one-click-avec-deepl` | 🟠 gap `RelatedSolutionsFrame` |

**Squelette Produit (6/6 constant)** :

```
<Navbar>                                     ✅
<Hero>                                       ✅
<ComparisonFrame>  (pain-points, 2/6)        ✅
<FeatureFrame> × N (layout inline + stacked) ✅
<CtaHighlightFrame>  (cta-midpage)           ✅
<FaqFrame>  (4/6)                            ✅
<RelatedSolutionsFrame>  ❌                  🔴 GAP (4 cards)
<Footer>                                     ✅
```

Le seul gap constant sur Produit est la section de bas de page **"Découvrez d'autres fonctionnalités"** avec 4 cartes image + titre + lien.

---

### 2.4 Équipes — 4 pages

| # | URL | Couverture |
|---|---|---|
| 1 | `/equipes/outil-pmo` | 🟠 gap grand grid clients (8 cards) + `HighlightFrame` replay vidéo OK |
| 2 | `/equipes/direction-de-la-transformation` | ✅ (DAKI = `PillarFrame`) |
| 3 | `/equipes/comite-direction` | 🟠 gap grand grid clients (9 cards) |
| 4 | `/equipes/it-et-operation` | 🟠 gap grand grid clients (9 cards) + `RelatedSolutionsFrame` (4 podcasts) |

**Squelette Équipes (4/4 constant)** :

```
<Navbar>                                      ✅
<Hero>                                        ✅
<TestimonialsFrame + TestimonialCompanyCard>  (4 cards presse) ✅
<TestimonialsFrame + TestimonialCard>         (3-4 LinkedIn)   ✅
<ValuePropositionFrame columns=4 + FeatureCard>  (stats-row)   ✅
<FeatureFrame> × 4-8                          ✅
<CtaHighlightFrame>                           ✅
<ComparisonDualFrame>  OR  <PillarFrame DAKI> ✅
<Slider> / <SliderFrame>  (integrations)      ✅
<ClientsFrame>  OR  extended TestimonialsFrame (8-9 ClientCards) ❌  🔴 GAP
<Footer>                                      ✅
```

---

## 3. Gaps détaillés + spécifications proposées

### 🔴 Gap 1 — `StepsFrame` (aka `HowItWorksFrame`)

**Présent sur :** 4/4 LP (+ 1× sur `/lp/capacity-planning` qui l'utilise deux fois)
**Usage type :** "Lancez votre déploiement en 4 étapes" / "Comment ça marche"
**Visuel observé :** 4 cartes horizontales avec numéro + icône + titre + description courte, reliées par une flèche ou ligne

**Pourquoi `<HighlightFrame>` ne convient pas** :
> `@forbidden` — Do NOT use for sequential steps (use a numbered pattern instead)
> `@purpose` — Alternating-zigzag (gauche/droite)

HighlightFrame est vertical et zig-zag ; les "how it works" sont horizontaux et linéaires.

**Pourquoi `<PillarFrame>` ne convient pas** :
> `@forbidden` — Do NOT use for sequential steps (use a numbered pattern instead)

Même restriction explicite.

**Spec proposée** :

```tsx
<StepsFrame
  tag="DÉPLOIEMENT"
  titleHighlight="4 étapes"
  title="pour lancer votre PPM"
  subtitle="Nos équipes vous accompagnent pour que votre outil PPM soit opérationnel en moins d'un mois."
  steps={[
    { number: 1, icon: <FileIcon/>, title: "Kick-off", description: "..." },
    { number: 2, icon: <UsersIcon/>, title: "Import", description: "..." },
    { number: 3, icon: <CogIcon/>, title: "Configuration", description: "..." },
    { number: 4, icon: <RocketIcon/>, title: "Go live", description: "..." },
  ]}
/>
```

**Limites** : 3-5 étapes, step.title max 24 chars, step.description max 180 chars.

---

### 🔴 Gap 2 — `RelatedSolutionsFrame` (cross-sell en bas de page)

**Présent sur :** 4/4 LP + 6/6 Produit + 2/12 Solution (type C) = **12/26 pages** (le plus fréquent des gaps)
**Usage type :** "Découvrez toute la plateforme" / "Nos autres fonctionnalités"
**Visuel observé :** 4 cartes en grid responsive (1 col → 2 md → 4 lg) avec :
- image/screenshot en haut (paysage)
- titre H4
- description courte 1-2 lignes
- lien ("Voir plus →") ou flèche

**Pourquoi `<ValuePropositionFrame>` + `<FeatureCard>` ne convient pas** :
- `<FeatureCard>` est icon-first, pas image-first (`title: max 12 chars` — beaucoup trop court pour un titre de solution)
- Pas de thumbnail dans `<FeatureCard>`

**Pourquoi `<BlogIndexGrid>` + `<BlogCard>` ne convient pas** :
- `<BlogCard>` a des champs blog-spécifiques (publication date, byline, excerpt)
- Ratio thumbnail et typo différents de ce qu'on observe

**Spec proposée** :

```tsx
<RelatedSolutionsFrame
  tag="EXPLORER"
  titleHighlight="Découvrez"
  title="toute la plateforme AirSaas"
  solutions={[
    {
      imageSrc: "/.../priorisation.png",
      imageAlt: "Capture d'écran priorisation",
      title: "Priorisation par équipes",
      description: "Laissez chaque équipe prioriser ses projets.",
      href: "/produit/priorisation-par-equipes",
      linkLabel: "Voir plus",  // optionnel
    },
    // ... 3 more
  ]}
  columns={4}  // 3 | 4
/>
```

**Limites** : 3-5 cartes, title max 40 chars, description max 120 chars, imageAlt obligatoire.

---

### 🟠 Gap 3 — `<TestimonialsFrame>` limité à 6 items (besoin 8-9)

**Présent sur :** 3/4 Équipes + 2/12 Solution (type B) = **5/26 pages**
**Usage type :** "Ils nous font confiance" — 8 à 9 cartes clients en carrousel/grid
**Visuel observé :** grid de `<ClientCard>` (avatar + nom + rôle + company + metadata) 3 colonnes × 3 lignes OU carrousel horizontal

**Règle actuelle DS** :
> `<TestimonialsFrame>` `@limits` — testimonials: 3–6 items (renders in grid-cols-3 at lg)

**Deux options** :

**Option A — relaxer les limites de `<TestimonialsFrame>`** :
- Passer testimonials à 3-9
- Ajouter prop `columns?: 3 | 4` (défaut 3)
- Ajouter prop `layout?: "grid" | "carousel"` (défaut "grid", carousel pour >6)

**Option B — créer `<ClientsFrame>`** (plus propre) :
- Dédié aux grilles de `<ClientCard>` (différent visuellement des `TestimonialCard`)
- Accepts 6-12 children, grid 3× ou 4× colonnes
- Carrousel horizontal sur mobile + tablet
- Partage entête avec `<TestimonialsFrame>`

**Recommandation : Option B.** Les `<ClientCard>` ont une structure visuelle différente (section haut blanche + section bas tintée avec info rows) ; les regrouper dans un frame dédié évite de surcharger `<TestimonialsFrame>`.

---

### 🟡 Gap 4 — `<SliderFrame>` limité à 5 slides (besoin 6)

**Présent sur :** `/solution/airsaas-et-les-experts-de-la-transfo` (bootcamp 6 images + community 6 images)

**Règle actuelle** :
> `<SliderFrame>` `@limits` — slides: 2–5

**Fix simple** : relaxer à 2-8.

---

### 🟡 Observation — Hero LP (pas un gap)

**Hypothèse avant analyse :** le hero LP avec dual CTA + trust badges + tabs nécessiterait une variante.

**Après vérif code** (`library-design/sections/Hero.tsx`) :
- `primaryCta` + `secondaryCta` : ✅ supporté
- `bottomTags` (0-4, variant `muted`/`success`) : ✅ supporté pour les 3 check features / trust badges

**Conclusion :** `<Hero>` couvre les besoins LP. Pas de gap.

**Exception :** si le HomePage réutilise un pattern `HeroTabs` (6 modules tournants), ce composant reste hors DS (client component spécifique HomePage — déjà traité dans `sections-catalog.md` S01). Pas un blocker pour les 26 pages auditées.

---

## 4. Priorités (ordre d'implémentation recommandé)

| # | Composant | Pages affectées | Effort | Priorité |
|---|---|---|---|---|
| 1 | `<RelatedSolutionsFrame>` | 12/26 | M (1 section frame + 1 primitive card) | 🔴 P0 |
| 2 | `<StepsFrame>` | 4/26 (LP) | M (1 section frame) | 🔴 P0 (sans ça, les LP ne peuvent pas être migrées fidèles) |
| 3 | `<ClientsFrame>` OU extension `<TestimonialsFrame>` | 5/26 | S (wrapper + carrousel responsive) | 🟠 P1 |
| 4 | `<SliderFrame>` : relaxer limite à 8 | 1/26 | XS (modif contract `@limits`) | 🟢 P2 |

---

## 5. Zéro gap observé sur

| Pattern | Nb pages | Composant DS |
|---|---|---|
| Navbar principal | 26/26 | `<Navbar>` |
| Footer | 26/26 | `<Footer>` |
| Hero mono-CTA | 18/26 | `<Hero>` |
| Hero dual-CTA + trust badges | 4/26 | `<Hero>` (primaryCta + secondaryCta + bottomTags) |
| Feature side-by-side | 25/26 (multi-occurrences) | `<FeatureFrame>` |
| Feature stacked + image bleed | widespread | `<FeatureSectionStacked>` |
| Stats row (4 counters) | 9/26 | `<ValuePropositionFrame columns=4>` + `<FeatureCard>` |
| Value proposition grid (3-4 icon cards) | 8/26 | `<ValuePropositionFrame>` |
| Pillar grid (3-6 principes / DAKI / golden rules) | 10/26 | `<PillarFrame>` |
| Comparison avec/sans (2 colonnes) | 7/26 | `<ComparisonDualFrame>` |
| Comparison avec/sans solo | 7/26 | `<ComparisonFrame>` |
| Comparison 3 concurrents | 3/26 | `<ComparisonTableFrame>` |
| FAQ accordion | 8/26 | `<FaqFrame>` |
| Press-logos-cards (4 citations presse) | 10/26 | `<TestimonialsFrame>` + `<TestimonialCompanyCard>` |
| LinkedIn testimonials (3-6) | 10/26 | `<TestimonialsFrame>` + `<TestimonialCard>` |
| CTA mid-page (1 bouton) | 22/26 | `<CtaHighlightFrame>` |
| CTA dual cards (demo + vidéo/guide) | 4/26 | `<CtaFrame>` + 2× `<CardCta>` |
| Icon row (6 modules / badges sécu) | 5/26 | `<IconRowFrame>` |
| Client logos bar | 4/26 | `<LogosBar>` |
| Integrations carousel (diagrammes) | 9/26 | `<Slider>` / `<SliderFrame>` |
| Highlight zigzag (replay vidéo) | 1/26 | `<HighlightFrame>` |

---

## 6. Risques & réserves

1. **Rendu visuel des `security-badges`** : la DS propose `<IconRowFrame>` mais le style observé sur les LP (4 badges ISO/France/Pentest/SSO dans une barre tintée) pourrait nécessiter une variante stylistique à valider dans Figma avant implémentation.
2. **"Pain-points solo" via `<ComparisonFrame>`** : le composant est défini pour un usage pairé (sans + avec) mais supporte un usage solo (`items: 4–8` items, emoji). À documenter explicitement dans `docs/ds-rules.md` pour éviter la confusion.
3. **Sections hors DS (`LpNavbar`, `LpFooter`, `HeroTabs`)** : ces composants vivent dans `components/layout/` et `components/sections/` — ils ne sont **pas** soumis au strict DS mode car ils sont hors `library-design/`. C'est un choix explicite ; il faudra le documenter dans `docs/ds-rules.md` comme "DS scope limits" si ce n'est pas déjà le cas.
4. **Type-C Solution pages** (long-form éducatives) : très verbales et denses (17 à 25 feature-stacked blocks). Rendu fidèle OK avec `<FeatureFrame layout="stacked">` mais à tester visuellement pour s'assurer que le rythme vertical ne casse pas.

---

## 7. Recommandation

**Proposition d'étapes (ne code pas d'entrée de jeu)** :

1. **Valider Figma** : faire un Figma search pour récupérer les 3 composants manquants (`StepsFrame`, `RelatedSolutionsFrame`, `ClientsFrame`) — s'ils existent dans le Figma AirSaas, on a les specs exactes.
2. **Écrire les contracts JSDoc** dans `src/components/library-design/sections/*.tsx` (sans implémenter) — simple squelette pour validation.
3. **Valider avec toi** la priorité : LP-first (P0 StepsFrame + RelatedSolutionsFrame) ou Produit-first (P0 RelatedSolutionsFrame seul).
4. **Implémenter** strictement selon le process `docs/ds-rules.md` (propose → approve → implement with contract + story).
5. **Regénérer** `docs/ds-components-reference.md` après chaque ajout via `scripts/generate-ds-reference.py`.

---

## Annexe — Inventaire brut des 26 pages

*Source : WebFetch live du 2026-04-23 sur airsaas.io. Résumé compact — pour le détail section-par-section, se référer aux commits de cette investigation ou relancer la même analyse.*

| Type | Slug | Sections distinctes |
|---|---|---|
| LP | `ppm` | 16 sections |
| LP | `pmo` | 17 sections |
| LP | `capacity-planning` | 18 sections (2× how-it-works) |
| LP | `pi-planning` | 17 sections (+ comparisons) |
| Équipes | `outil-pmo` | 12 sections (+ highlight-zigzag) |
| Équipes | `direction-de-la-transformation` | 11 sections (+ pillar DAKI) |
| Équipes | `comite-direction` | 10 sections |
| Équipes | `it-et-operation` | 13 sections (+ related 4 podcasts) |
| Solution | `management-de-portefeuille-projet` | 11 sections |
| Solution | `flash-report-projet` | 10 sections |
| Solution | `flash-report` | 11 sections |
| Solution | `revue-de-portefeuille` | 14 sections |
| Solution | `portfolio-management` | 11 sections |
| Solution | `tableau-de-bord-portefeuille-de-projet` | 12 sections |
| Solution | `tableau-de-bord-dsi` | 12 sections |
| Solution | `tableau-de-bord-gestion-de-projet` | 13 sections (+ 5-card grid haut) |
| Solution | `gestion-portefeuille-projet` | 18 sections (long-form) |
| Solution | `outils-de-pilotage-projet` | 14 sections (long-form) |
| Solution | `outil-ppm` | 13 sections (+ 5-card grid haut) |
| Solution | `airsaas-et-les-experts-de-la-transfo` | 8 sections (+ 2× slider 6 images) |
| Produit | `capacity-planning` | 12 sections |
| Produit | `priorisation-par-equipes` | 8 sections |
| Produit | `reporting-projet` | 10 sections |
| Produit | `automatiser-la-com-projet` | 8 sections |
| Produit | `budget` | 13 sections |
| Produit | `traduction-one-click-avec-deepl` | 9 sections |

---

**Fin du rapport.** Aucun code n'a été modifié. Les 3 composants manquants sont des **extensions propres** de la DS, pas des remises en cause de la charte actuelle.
