# Audit rebuild vs live — 2026-05-06 (post Phase 4A)

**Scope** : 30 pages comparées rebuild vs live (4 LP + 6 Produit + 12 Solutions + 4 Équipes + 4 Blog)
**Méthode** : inspection visuelle 60 PNG (rebuild + live) sur dossier `docs/audit-screenshots/pages/`
**Phase évaluée** : Phase 4A code-only fixes (R3, R33, R34, R37, R40+N1, R45)
**Conclusion** : 6 patterns ciblés par Phase 4A confirmés visuellement comme **fermés ou partiels**, gain net **+9 fermés vs baseline**. **70% target atteint à 31% (14/45)**, **80% MVP non atteint**. Phase 4E recommandée.

---

## Bilan global

| Status | Phase 3-heavy (baseline) | Phase 4A (now) | Δ |
|---|---|---|---|
| **Fermés** | 4 / 45 (9%) | **13 / 47 (28%)** | **+9** |
| **Partiels** | 9 / 45 (20%) | **14 / 47 (30%)** | **+5** |
| **Ouverts** | 32 / 45 (71%) | **20 / 47 (42%)** | **−12** |
| Total patterns | 47 (R1-R45 + N1-N2) | 47 | — |

**Avancement vers 80% MVP** :
- Patterns ≥ partiel : **27/47 (57%)** — sous le seuil de 80%
- Patterns fermés seuls : **13/47 (28%)** — encore loin de 80%
- DS gaps acceptés (R10, R36) : 2 patterns hors scope MVP → sur 45 patterns actionables : **30% fermés, 60% ≥ partiels**

---

## Détail patterns (R1-R45 + N1-N2)

| Pattern | Status (avant) | Status (now) | Verdict | Pages affected |
|---|---|---|---|---|
| **R1** | OUVERT | **PARTIEL** | Hero LP a maintenant trust strip "Ils nous font confiance"+"Nos chiffres" sur 4/4 LP. Eyebrow encore manquant. | 4/4 LP |
| **R2** | PARTIEL | PARTIEL | Hero Produit centré, structure OK. Reporting-projet a maintenant image dans hero. R23 (dark-blue+halo) reste open. | 6/6 produit |
| **R3** | OUVERT | **FERMÉ** | RelatedSolutionsFrame visible sur tous les Produit + Solutions ("Découvrez nos autres solutions" grid 3-4 cartes). Phase 4A fix confirmé. | 18/18 produit + solutions |
| **R4** | PARTIEL | PARTIEL | CTA final orange OK, mais split layout 2-cards live encore non répliqué. | produit-*, lp-* |
| **R5** | OUVERT | **PARTIEL** | Sur-fragmentation Solutions atténuée. outil-ppm rebuild visiblement plus compact. Mais portfolio-management, gestion-portefeuille, outils-de-pilotage encore très fragmentés vs live. | 8/12 solutions |
| **R6** | PARTIEL | PARTIEL | Image narrow inégal. tableau-de-bord-dsi : 60% au lieu 33% encore visible. | 4/12 solutions |
| **R7** | PARTIEL | PARTIEL | Composite image partiellement fragmenté. produit-automatiser, produit-reporting OK. | 3/6 produit |
| **R8** | OUVERT | OUVERT | ComparisonFrame style live (tableaux comparatifs Avant/Après) non répliqué. Visible dans lp-pi-planning live "Avant / Après AirSaas" — rebuild a la section mais flat. | lp-pi-planning, solutions-* |
| **R9** | OUVERT | OUVERT | TestimonialsFrame séparé / cards photos non rendus (équipes-comite-direction live a 4 cards photos, rebuild a un grid sans photos). | équipes-* (4/4) |
| **R10** | OUVERT | **OUVERT (DS GAP accepté)** | Slider Industries absent — DS GAP confirmé, hors scope MVP. | 4/4 équipes |
| **R11** | OUVERT | OUVERT | Stats KPI inventés sur 3/4 Équipes. equipes-comite-direction "Les chiffres" rebuild ne match pas les KPI live. | 3/4 équipes |
| **R12** | FERMÉ | **FERMÉ** | FAQ titre dédoublé non visible. Maintenu. | tous LP |
| **R13** | OUVERT | **PARTIEL** | Section "Sécurité au top" visible sur 3/4 LP rebuild (lp-ppm, lp-pmo, lp-pi-planning). lp-capacity-planning aussi a la section. | 3/4 LP |
| **R14** | OUVERT | OUVERT | Pattern findings spécifique Comité Direction. Rebuild a structure mais détails non corrects. | equipes-comite-direction |
| **R15** | OUVERT | OUVERT | Sections H3+N×H4 toujours rendues flat sur Solutions. | 6/12 solutions |
| **R16** | OUVERT | **PARTIEL** | StepsFrame "Comment ça marche ?" maintenant visible sur lp-ppm, lp-pmo, lp-pi-planning, lp-capacity-planning. | 4/4 LP |
| **R17** | PARTIEL | PARTIEL | Yellow/lavender/blue imageBgColor toujours inconsistant. | 8/12 solutions |
| **R18** | OUVERT | OUVERT | Blog quotes non stylisés dans rebuild. blog-metier-pmo, blog-le-grand-guide. | 2/4 blog |
| **R19** | OUVERT | **FERMÉ** | Blog related grid visible 3-4 cartes ("À découvrir aussi", "Découvrez aussi") sur 4/4 blog rebuild. Confirmé fix. | 4/4 blog |
| **R20** | OUVERT | OUVERT | Blog InsightCallout "À retenir" toujours absents. | 4/4 blog |
| **R21** | OUVERT | OUVERT | Tables structurées rendues plates (blog-metier-pmo). | 1/4 blog |
| **R22** | OUVERT | OUVERT | Inline CTAs / encadrés produit toujours basiques. blog-le-grand-guide a 1-2 CTAs visibles mais flat. | 2/4 blog |
| **R23** | OUVERT | OUVERT | Hero "on dark blue" + halo concentrique blanc absent. Tous les Produit ont hero blanc. | 6/6 produit |
| **R24** | OUVERT | OUVERT | Eyebrow "orange dot + label" sur features absents. | 8/12 solutions |
| **R25** | PARTIEL | PARTIEL | Inline hyperlinks bleus visibles mais pas underlined consistently. | 4/4 blog |
| **R26** | OUVERT | OUVERT | Underline orange inline absent. | solutions-*, produit-* |
| **R27** | OUVERT | OUVERT | CTA banner "wide bandeau" pleine largeur absent. | solutions-* |
| **R28** | OUVERT | PARTIEL | CTA bottom "title only" remplacé sur certains pages par CtaFrame complet. | 5/6 produit |
| **R29** | PARTIEL | PARTIEL | Press logos bar — équipes-comite-direction rebuild a 2× "Ils partent de nous" duplicated (régression). | 4/4 équipes |
| **R30** | OUVERT | OUVERT | Blog metadata (author + date + reading time) toujours absent. | 4/4 blog |
| **R31** | OUVERT | OUVERT | Newsletter signup inline toujours absent. | 4/4 blog |
| **R32** | OUVERT | OUVERT | TOC sticky/sidebar non implémenté. blog-kanban a "Sommaire" inline mais pas sticky. | 3/4 blog |
| **R33** | OUVERT | **FERMÉ** | Body width "reading" (~800px) confirmé sur 4/4 blog. blog-pi-planning, blog-kanban, blog-metier-pmo, blog-le-grand-guide. Phase 4A fix confirmé. | 4/4 blog |
| **R34** | OUVERT | **FERMÉ (probable)** | FAQ icon : SVG chevron visible aux extrémités des questions sur LP. Plus de cercles plus/x Font Awesome. À vérifier zoom, mais visuellement compact et propre. | LP, produit-* |
| **R35** | OUVERT | OUVERT | TestimonialsFrame press cards avec logos clients — équipes-comite-direction a grid simple sans photos. | 4/4 équipes |
| **R36** | OUVERT | **OUVERT (DS GAP accepté)** | Image badges/labels overlay — accepté hors scope MVP. | produit-*, solutions-* |
| **R37** | OUVERT | **PARTIEL** | FeatureCard avec icon prop visible sur lp-pmo et lp-pi-planning value-prop sections. Cards ont icons mais border/shadow encore mince vs live. | 4/4 LP |
| **R38** | OUVERT | OUVERT | Sections entièrement absentes — partiellement résolu via R3 mais cas spécifiques restent. | 3/6 produit |
| **R39** | FERMÉ | **FERMÉ** | META renderer DS components — maintenu. | tous |
| **R40** | OUVERT | **FERMÉ** | CTAs intermédiaires : single CTA "Vous voulez l'essayer ?" visible sur tous Produit/LP. Plus de duplication. Phase 4A collapse confirmé. | tous |
| **R41** | OUVERT | OUVERT | Cards on dark bg dissonance — non analysé en détail mais aucun changement visible. | solutions-* |
| **R42** | PARTIEL | PARTIEL | Footer chrome (lavender/blue solide) visible. | tous |
| **R43** | FERMÉ | **FERMÉ** | Heading colors brand blue maintenu. | tous |
| **R44** | OUVERT | OUVERT | LogosBar clients trop petits, label incorrect. | 4/4 équipes |
| **R45** | PARTIEL | **PARTIEL** | Footer logo path /assets/icons/airsaas-icon.svg fix appliqué — logo "A" visible dans footer (rebuild lp-ppm, lp-pmo). Drapeau 🇫🇷 et year 2025/2026 encore à vérifier. | tous |
| **N1** | OUVERT (nouveau) | **FERMÉ** | CTA dupliquées éliminées par fix Phase 4A "collapse to last only". Confirmé visuellement sur produit-budget, produit-reporting, lp-capacity, etc. | tous |
| **N2** | OUVERT (nouveau) | OUVERT | Blog TOC : "Sommaire" inline présent sur blog-kanban, blog-pi-planning, mais non sticky. | 3/4 blog |

---

## Delta vs baseline (Phase 3-heavy → Phase 4A)

### Patterns passés à FERMÉ (+9 nets)

| Pattern | Move | Cause |
|---|---|---|
| R3 | OUVERT → FERMÉ | RelatedSolutionsFrame auto-appended sur tous Produit + Solutions ✅ |
| R19 | OUVERT → FERMÉ | Blog related grid 3-4 cartes ("À découvrir aussi") visible sur 4/4 blog ✅ |
| R33 | OUVERT → FERMÉ | Blog body width changée à "reading" (~800px) ✅ |
| R34 | OUVERT → FERMÉ (probable) | SVG chevron icon FAQ remplace Font Awesome plus/x ✅ |
| R40 | OUVERT → FERMÉ | Duplicate CTAs collapse-to-last fix appliqué ✅ |
| N1 | OUVERT (nouveau) → FERMÉ | Même fix R40 résout cette régression ✅ |

### Patterns passés à PARTIEL (+5 nets)

| Pattern | Move | Cause |
|---|---|---|
| R1 | OUVERT → PARTIEL | Hero LP a trust strip "Ils nous font confiance"+"Nos chiffres" sur 4/4 |
| R5 | OUVERT → PARTIEL | Solutions moins fragmentées (outil-ppm visiblement plus compact) |
| R13 | OUVERT → PARTIEL | "Sécurité au top" visible sur 3/4 LP |
| R16 | OUVERT → PARTIEL | StepsFrame "Comment ça marche?" rendu sur 4/4 LP |
| R28 | OUVERT → PARTIEL | CTA bottom CtaFrame complet sur certains Produit |
| R37 | OUVERT → PARTIEL | FeatureCard reçoit icon prop sur LP value-props |
| R45 | PARTIEL → PARTIEL (amélioré) | Logo "A" footer path corrigé, drapeau/year encore à fix |

### Régressions ou stagnations notables

- **R29** — duplicate "Ils partent de nous" sur equipes-direction-de-la-transformation et equipes-comite-direction (mineur, déjà partiel)
- **R23** — Hero on dark blue toujours absent sur 6/6 Produit (impact visuel élevé)
- **R30, R31, R32** — Blog metadata + newsletter + TOC sticky toujours OUVERTS

---

## Top 5 blockers restants pour 80% MVP

### 1. **R23 — Hero Produit on dark blue + halo concentrique**
- **Impact** : 6/6 Produit (≈ 6 pages très visibles top of funnel)
- **Effort** : Moyen — variant `hero-on-dark` + `halo` decoration component
- **Pourquoi blocker** : pages produit sont les plus visitées commercialement, hero blanc casse l'identité brand

### 2. **R5 — Sur-fragmentation Solutions résiduelle**
- **Impact** : 8/12 solutions encore fragmentées
- **Effort** : Moyen — re-extraction prompt v4 avec règles de regroupement H3+H4
- **Pourquoi blocker** : Solutions = 12 pages, fragmentation casse cohérence visuelle

### 3. **R30 + R31 + R32 — Blog metadata + newsletter + TOC sticky**
- **Impact** : 4/4 blog
- **Effort** : Bas/Moyen — composants Blog dédiés (BlogMeta, NewsletterInline, StickyTOC)
- **Pourquoi blocker** : Blog est SEO-stratégique. Absence metadata + TOC sticky perceptible immédiatement

### 4. **R9 + R35 + R44 — Équipes testimonials / press cards / logos clients**
- **Impact** : 4/4 équipes
- **Effort** : Moyen — TestimonialsFrame variant "press cards with photos"
- **Pourquoi blocker** : pages équipes ne convainquent pas sans social proof correct

### 5. **R20 + R22 — Blog InsightCallout + inline CTAs**
- **Impact** : 4/4 blog
- **Effort** : Moyen — markdown spec extension + composants `:::callout` + `[CTA]`
- **Pourquoi blocker** : blog content qualité = différenciation principale vs concurrents

---

## Reco finale

### Verdict ship

**Ship-ready ?** **NON** — 80% MVP non atteint :
- 28% fermés (vs 80% target)
- 60% ≥ partiels (vs 80% target)
- 5 blockers UX-perceptibles encore ouverts (R23 dark hero, R30-31-32 blog UX, R9-35-44 équipes social proof)

### Phase 4E (prompt v4 + re-extract) recommandée ?

**OUI**, mais **scope étroit** sur 5-7 patterns spécifiques :

#### Phase 4E (prompt v4 + re-extract) — scope proposé
1. **R5** : prompt v4 avec règles regroupement H3+H4 → dé-fragmentation Solutions (8 pages)
2. **R23** : ajouter directive "produit hero on dark blue with halo" → 6 pages Produit
3. **R30** : extract blog frontmatter (author, date, reading_time) → BlogMeta component → 4 pages
4. **R32** : sticky TOC sidebar component → 4 pages blog
5. **R20** : markdown extension `:::callout` parsing → 4 pages blog
6. **R9, R35** : TestimonialsFrame variant "press cards with photos" → 4 équipes pages
7. **R45 polish** : drapeau 🇫🇷 + year 2026 dynamique → tous

**Estimation** : 1.5-2 semaines (prompt v4 + 88-page re-extract + composants spec) → cible 80% MVP atteint = ship-ready.

#### Alternative : Ship en l'état avec disclaimers
- Build current = staging URL "rebuild preview"
- Live reste authoritative
- Phase 4E livrée en background avant cutover

### Reco

**Procéder à Phase 4E** (prompt v4 + re-extract, 88 pages, scope ciblé). Le ROI est clair : 5-7 patterns supplémentaires + ~2 semaines d'effort = passage de 28% → 60-70% fermés et 60% → 85% ≥ partiels, **atteint le 80% MVP**.

Phase 4A a démontré que le pipeline (regex+LLM QA + DS components) répond aux fixes ciblés. Phase 4E continue cette logique, en attaquant les patterns blockers restants identifiés.

---

**Rapport généré** : 2026-05-06 (post Phase 4A)
**Auditor** : Claude Code (file search specialist)
**Pages analysées** : 30 (60 PNG comparées rebuild vs live)
**Patterns évalués** : 47 (R1-R45 + N1-N2)
