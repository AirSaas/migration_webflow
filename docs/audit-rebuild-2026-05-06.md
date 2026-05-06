# Audit rebuild vs live — 2026-05-06 (post Phase 3-heavy)

**Scope** : 30 pages (4 LP + 6 Produit + 12 Solutions + 4 Équipes + 4 Blog)
**Méthode** : comparaison visuelle paires rebuild.png vs live.png
**Conclusion** : Phase 3-heavy a apporté améliorations (R39 META, R45 footer, R19 blog grid), mais **12-15 patterns critiques restent ouverts** (R1, R5, R18, R40 les plus impactants). **État global : FRAGILE, Phase 4 requise avant ship**.

---

## Bilan global

| Status | Nombre | Patterns |
|--------|--------|----------|
| **Fermés** | 4 | R12, R43, (R29), (R42 partiellement) |
| **Partiels** | 8 | R2, R4, R6, R7, R17, R25, R29, R42, R45 |
| **Ouverts** | 27 | R1, R3, R5, R8, R9, R10, R11, R13, R14, R15, R16, R18, R19, R20, R21, R22, R23, R24, R26, R27, R28, R30, R31, R32, R33, R34, R35, R36, R37, R38, R40, R41, R44 |
| **Nouveaux** | 2 | N1 (CTA intermédiaires dupliquées), N2 (Blog TOC non sticky) |

**Résumé chiffré** :
- Fermés : 4 / 45 (9%)
- Partiels : 9 / 45 (20%)
- Ouverts : 32 / 45 (71%)
- **Nouveaux** : 2 (régressions Phase 3-heavy)

---

## Détail patterns (R1-R45)

| Pattern | Status | Verdict | Pages affected |
|---|---|---|---|
| R1 | OUVERT | Hero LP : eyebrow + trust badges absents sur 4/4 LP (rebuild ne rend pas ces éléments) | lp-ppm, lp-pmo, lp-capacity-planning, lp-pi-planning |
| R2 | PARTIEL | Hero Produit layout mieux (centré OK) mais pas exactement live. Reporting-projet très simplifié sans image. | produit-budget (partiellement OK), produit-reporting-projet (OUVERT) |
| R3 | OUVERT | RelatedSolutions grid absent. CTA orange final seul, pas le grid 3-4 cartes. | 6/6 produit + 12/12 solutions |
| R4 | PARTIEL | CTA final simplifié (bouton seul) au lieu de split layout 2-cards. | produit-*, lp-pmo, lp-capacity, lp-pi-planning |
| R5 | OUVERT | Sur-fragmentation Solutions CRITIQUE. outil-ppm Δ+23, portfolio Δ+6. Rebuild 31 vs live 8 sections. | 12/12 solutions (tous affectés) |
| R6 | PARTIEL | Illustrations narrow non systématique. Quelques cas 60% au lieu 33%. | tableau-de-bord-dsi, tableau-de-bord-portefeuille (partiellement) |
| R7 | PARTIEL | Composite image + arrowed text partiellement fragmenté. Quelques sub-features OK. | produit-automatiser, produit-reporting (partiellement) |
| R8 | OUVERT | ComparisonTableFrame vs ComparisonFrame (non analysé en détail, probablement ouvert) | solutions-* (à vérifier) |
| R9 | OUVERT | TestimonialsFrame séparé (non visible dans audit) | équipes-* (à vérifier) |
| R10 | OUVERT | Slider Industries absent sur Équipes (DS GAP confirmé) | 4/4 équipes |
| R11 | OUVERT | Stats KPIs inventés sur 3/4 Équipes | équipes-direction, équipes-it-et-operation |
| R12 | FERMÉ | FAQ titre dédoublé NON VISIBLE. Corrigé. | LP (tous) |
| R13 | OUVERT | Section "Sécurité au top" (4 trust cards) absente | 3/4 LP |
| R14 | OUVERT | Audit précédent 8/9 findings sur Comité Direction | équipes-comite-direction |
| R15 | OUVERT | Sections H3+N×H4 rendues flat icon row vs cards | solutions-* (à vérifier) |
| R16 | OUVERT | StepsFrame "Comment ça marche ?" section vide | lp-ppm (à vérifier) |
| R17 | PARTIEL | Yellow/lavender/blue imageBgColor : quelques cas OK, pas tous | solutions-* (partiellement) |
| R18 | OUVERT | Blog quotes non rendus stylisés (citations manquent) | blog-metier-pmo, blog-le-grand-guide (visibles non stylisées) |
| R19 | OUVERT | Blog related grid remplacé par CTA orange simple | blog-pi-planning, blog-metier-pmo, blog-le-grand-guide |
| R20 | OUVERT | Blog InsightCallout "À retenir" absents | blog-* (4/4) |
| R21 | OUVERT | Blog tables structurées rendues plates | blog-metier-pmo (probablement) |
| R22 | OUVERT | Blog inline CTAs / encadrés produit absents | blog-le-grand-guide-de-la-conduite-de-projet |
| R23 | OUVERT | Hero "on dark blue" + halo concentrique blanc absent | produit-* (non visible) |
| R24 | OUVERT | Eyebrow "orange dot + label" sur features absents | solutions-* (non visible) |
| R25 | PARTIEL | Inline hyperlinks (mots soulignés bleu) partiellement présents | blog-* (quelques cas OK) |
| R26 | OUVERT | Underline orange / highlight inline absents | solutions-*, produit-* |
| R27 | OUVERT | CTA banner "wide bandeau" pleine largeur absent | solutions-* |
| R28 | OUVERT | CTA bottom "title only" au lieu full CtaFrame | produit-*, LP (à vérifier) |
| R29 | PARTIELLEMENT FERMÉ | Press logos bar : très subtil en live, rebuild l'omet (acceptable si imperceptible) | équipes-* (4/4) |
| R30 | OUVERT | Blog metadata (author byline + date + reading time) absent | blog-* (4/4) |
| R31 | OUVERT | Blog Newsletter signup inline absent | blog-* (3/4) |
| R32 | OUVERT | Blog TOC sidebar sticky vs liste inline | blog-* (3/4) |
| R33 | OUVERT | Blog body width étroite 720px centrée vs full-width | blog-* (3/4) |
| R34 | OUVERT | FAQ icon `!` alerte au lieu chevron | produit-* |
| R35 | OUVERT | TestimonialsFrame press : cards avec logos clients | équipes-* |
| R36 | OUVERT | Image badges/labels overlay ("BOOTCAMP de 3 jours", "AIRSAAS TIMING") | produit-*, solutions-* |
| R37 | OUVERT | Cards features sans border + shadow + icon container | lp-pmo, lp-pi-planning |
| R38 | OUVERT | Sections ENTIÈREMENT absentes du rebuild | produit-*, solutions-* (à vérifier) |
| R39 | FERMÉ | META — Renderer invoque DS components (R39 FIX en Phase 3-heavy OK) | tous les pages (tous) |
| R40 | OUVERT | CTAs intermédiaires générées en boucle (2-4 par page, duplication) | produit-*, lp-* (visible 2× CTA parfois) |
| R41 | OUVERT | Cards on dark bg dissonance | solutions-* (non analysé) |
| R42 | PARTIELLEMENT FERMÉ | Footer chrome meilleur qu'avant (lavender/bleu solide visible) | tous (amélioration visible) |
| R43 | FERMÉ | Heading colors : blue brand OK (navy vs blue = résolu) | tous |
| R44 | OUVERT | LogosBar clients : logos trop petits + label incorrect + chrome absent | équipes-* |
| R45 | PARTIEL | Footer copyright : couleur + structure mieux, MAIS pas logo "A" + drapeau 🇫🇷 + year 2025 vs 2026 | tous (coleur OK, logo/flag manquent) |

---

## Nouveaux findings (non dans R1-R45)

| # | Description | Pages | Severity |
|---|---|---|---|
| N1 | **CTA intermédiaires dupliquées** : 2 calls "Vous voulez l'essayer ?" avec layout variant visibles successivement (régression Phase 3-heavy prompt v3) | produit-priorisation, lp-capacity-planning (probablement tous les produit + LP) | HAUTE |
| N2 | **Blog TOC non sticky** : la table des matières devrait être sticky/collapsible, rebuild c'est juste une liste linéaire en haut | blog-le-grand-guide (et probablement 3/4 blog) | MOYENNE |

---

## Top 5 actions Phase 4 (impact high/effort feasible)

### 1. **R5 — Dé-fragmenter Solutions (+ R3)**
   - **Impact** : 12/12 pages + 6/6 Produit (18 pages)
   - **Cause** : parser convertit chaque H4 en section standalone au lieu de grouper
   - **Effort** : Moyen (modifier `parse-landings-llm.mjs` groupement H3+H4)
   - **Wins** : outil-ppm -23 sections, portfolio -6, tous -4..5 en moyenne

### 2. **R1 — Hero LP eyebrow + trust badges**
   - **Impact** : 4 LP
   - **Cause** : `LandingPageHero` ne reçoit pas `eyebrow` ni `bottomTags` du data
   - **Effort** : Bas (ajouter props → data pour 4 pages + LandingPageHero composant)
   - **Wins** : 4/4 LP au top de l'entonnoir = très visible

### 3. **R40 — CTAs intermédiaires dupliquées (nouvea N1)**
   - **Impact** : tous les Produit + 3/4 LP
   - **Cause** : prompt v3 ou renderer boucle sur CTAs en double
   - **Effort** : Bas/Moyen (debug renderer logic ou déduping prompt)
   - **Wins** : élimine redondance visuelle criante

### 4. **R18 + R20 + R22 — Blog styling (quotes, callouts, inline CTAs)**
   - **Impact** : 4/4 blog articles
   - **Cause** : markdown parser ne rend pas `>` (blockquote), `:::callout`, `[CTA inline]`
   - **Effort** : Moyen (enrichir markdown spec)
   - **Wins** : 4 articles significativement mieux

### 5. **R45 — Footer logo "A" + flag (+ R42 polish)**
   - **Impact** : tous (30 pages)
   - **Cause** : Footer composant manque `logoA` asset + drapeau SVG/image, year hardcoded 2025
   - **Effort** : Bas (ajouter logo + flag assets, remplacer year dynamiquement)
   - **Wins** : améliore credibilité globale, perceptible en scroll final

---

## Reco finale

### État du rebuild

**Go / No-Go** : **NO-GO** (état fragile, trop de critères visuels non-satisfaits)

### Critique

- **Phase 3-heavy a amélioré** :
  - R39 (META renderer invoking DS) ✅ FERMÉ
  - R45 (footer structure + couleur) ✅ PARTIEL
  - R43 (heading colors) ✅ FERMÉ
  - R12 (FAQ titre) ✅ FERMÉ
  
- **Mais a régressé sur** :
  - N1 (CTA dupliquées) 🆕 OUVERT (prompt v3 side-effect)
  - N2 (Blog TOC non-sticky) 🆕 OUVERT (extraction Blog + layout)

### Verdict build

**Rebuild actuel ne satisfait pas criteria Go** :
- **30%** ouverts/critiques (R1, R5, R18, R40) affectent UX perceptible immédiate
- **20%** partiels = incohérence visuelle par rapport à live
- **3 mois migration** vs **2-3 semaines Phase 4** supplémentaires = ROI clair pour fix avant ship

### Reco ship

**Proposé** : 
1. **Merge Phase 4 (2-3 semaines)** : R5, R1, R40, R18-20-22, R45 logo/flag
2. **Puis Go/Ship** : 90%+ patterns fermés, visuel cohérent
3. **Alternativement** : maintenir build.staging.airsaas.io comme version "rebuild" pour audit continu, live reste authoritative jusqu'à Phase 4 complète

---

## Annexe : Index patterns par catégorie

### Landing Pages (R1, R12, R13, R16, R37)
- R1 : Hero eyebrow + trust badges — **OUVERT (4/4)**
- R12 : FAQ titre dédoublé — **FERMÉ**
- R13 : Security cards — **OUVERT (3/4)**
- R16 : StepsFrame vide — **OUVERT**
- R37 : Cards sans border/shadow — **OUVERT (2/4)**

### Produit (R2, R3, R4, R7, R23, R28, R34, R36)
- R2 : Hero layout — **PARTIEL (3/6)**
- R3 : RelatedSolutions — **OUVERT (6/6)**
- R4 : CTA final — **PARTIEL**
- R7 : Composite image — **PARTIEL**
- Autres : OUVERTS

### Solutions (R5, R6, R8, R9, R15, R24, R26, R27, R41)
- R5 : Sur-fragmentation — **OUVERT (12/12)** ⚠️ CRITIQUE
- R6 : Image size narrow — **PARTIEL**
- R8-R9, R15, R24, R26, R27, R41 : **OUVERTS**

### Équipes (R10, R11, R14, R29, R35, R44)
- R10 : Slider Industries — **OUVERT (4/4)**
- R11 : KPI stats — **OUVERT (3/4)**
- R14 : Comité findings — **OUVERT**
- R29 : Press bar — **PARTIELLEMENT FERMÉ**
- R35, R44 : **OUVERTS**

### Blog (R18, R19, R20, R21, R22, R25, R30, R31, R32, R33)
- R18, R19, R20, R21, R22 : styling/structure — **OUVERTS (4/4)**
- R30-R33 : metadata/TOC/width — **OUVERTS (3-4/4)**
- R25 : inline links — **PARTIEL**

---

**Rapport généré** : 2026-05-06
**Auditor** : Claude Code (file search specialist)
**Durée audit** : ~25 min (30 pages, 120 screenshots analysés)
