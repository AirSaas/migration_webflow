# DS Audit — 26 Landing Pages

**Date:** 2026-04-24
**Branch:** `audit-26-pages` (from `main` post PR #41)
**Source DS:** PR #37 (palette Figma + strict mode) + PR #38 (blog pipeline)
**Source content:** `docs/live-captures/{category}/*.md` (Playwright captures, 2026-04-23)

## Context

Les 26 pages précédemment buildées (PR #40) ont été supprimées (PR #41). Objectif du présent audit : mapper, pour chaque page, les sections live → composants DS disponibles et identifier les gaps avant rebuild.

## Résultat global

| Catégorie | Pages | ✅ Fully | ⚠️ Partial | ❌ Blocked |
|-----------|-------|---------|-----------|-----------|
| LP        | 4     | 0       | 4         | 0         |
| Produit   | 6     | 0       | 6         | 0         |
| Équipes   | 4     | 1       | 3         | 0         |
| Solution  | 12    | 3       | 9         | 0         |
| **Total** | **26** | **4**   | **22**    | **0**     |

Aucune page n'est bloquée au sens absolu, mais **22/26** nécessitent une résolution de gap avant rebuild propre.

---

## Gaps cross-catégorie — priorisés

### 🔴 P1 — New DS components to build before rebuild

| Gap | Composant à créer | Pages touchées | Impact |
|-----|-------------------|----------------|--------|
| 1 | **`<TabsFrame>`** (hero-adjacent tabs → 6 anchors) | 4/4 LP | Bloque toutes les LP (pattern hero+tabs universel) |
| 2 | **`<ProcessStepsFrame>`** (3–5 numbered sequential steps) | 3/4 LP | `<PillarFrame>` interdit le sequential par contract |
| 3 | **`<RelatedSolutionsFrame>`** (3–4 cross-link cards w/ image+titre+desc+CTA) | 4 LP + 6 Produit (= 10) | Bloc "Nos solutions…" en fin de page, récurrent |
| 4 | **`<ArticleBodyFrame>`** OU `<FeatureFrame>` variant `prose-long` | 5 Solution | Long-form SEO (pyramides Maslow, prose dense) |

### 🟠 P2 — Contract limit adjustments (1-line changes)

| Gap | Contract actuel | Cible | Pages touchées |
|-----|-----------------|-------|----------------|
| 5 | `TestimonialsFrame` min = 3 | min = 1 ou 2 | ~8 (LP 3, Équipes 4, Solution 1) |
| 6 | `ValuePropositionFrame` cols = 3 ou 4 | cols = 2–6 | Solution 3 (`flash-report-projet` 2 items, `outil-ppm` 6 items) |
| 7 | `IconRowFrame` min = 4 | min = 3 | Solution 3 (`revue-de-portefeuille`, `gestion-portefeuille-projet`, `flash-report`) |
| 8 | `ComparisonFrame` min = 4 | min = 3 | Produit 1 (`reporting-projet`) |
| 9 | `FaqFrame` min = 3 | min = 2 | Produit 1 (`budget`) |
| 10 | `TestimonialCard.quote` max = 220 | max = 400 + "read more" | Équipes 4 (Marie-Odile ~800 chars) |

### 🟡 P3 — Contract enrichments

| Gap | Composant | Action | Pages |
|-----|-----------|--------|-------|
| 11 | `SliderFrame` | Add `variant: "dark"` | Solution 1 (`airsaas-experts-transfo` section LPDT) |
| 12 | `TestimonialCompanyCard` | Add optional `href` (wrap entire card) | Équipes 4/4 (press mentions cliquables) |
| 13 | `CardCta` | Add optional `mediaThumbnail` (video/replay) | Équipes 1 (`outil-pmo` replay link) |

### 🟢 P4 — Composed / new specialized components (optional, for DRY)

| Gap | Composant | Pages | Note |
|-----|-----------|-------|------|
| 14 | **`<PressAndTestimonialsFrame>`** (LogosBar + 3 TestimonialCard LinkedIn avatar+role+quote) | Solution 10/12 + Équipes 4/4 (= 14) | Candidat #1 à la composition — énorme duplication |
| 15 | **`<ClientSectorsFrame>`** OU `SliderFrame` variant `cards` | Équipes 3/4 | 10–12 cards industry icon+number+label navigable |
| 16 | `<IndustryStatsFrame>` OU `IconRowFrame` variant `multi-row+big-number` | Solution 1 (`portfolio-management`) | Grille 12+ items icône+label+chiffre |

### ⚪ P5 — Can remain inline (single-use, low priority)

- **Newsletter email preview** (3 screenshots empilés) — Équipes `outil-pmo` + Solution `portfolio-management`
- **Podcast episode list** — Équipes `it-et-operation`
- **Competitor narrative cards** — LP `pi-planning` ("Pourquoi pas Jira Align…")

---

### LP (4 pages)

#### `/lp/capacity-planning`
- Hero → `<Hero>` ✅
- Tabs nav (6 anchors) → **GAP P1-#1 TabsFrame**
- Trust strip 4 metrics → `<ValuePropositionFrame>` + `<FeatureCard>` ✅
- Problems 6 items → `<ComparisonFrame>` variant `sans` ✅
- 8 feature blocks (Agent IA Brief/Découpage, Vue capacitaire, T-shirt sizing, Scénarios, KPI, etc.) → 8× `<FeatureFrame>` ✅
- "De l'idée au scénario" 5 numbered cards → **GAP P1-#2 ProcessStepsFrame**
- "Notre parti pris" 3 cards → `<PillarFrame>` ✅
- Testimonials 2 persons → **GAP P2-#5 min=2**
- Security 4 items → `<ValuePropositionFrame>` ✅
- "Opérationnel 1 mois" 4 steps → **GAP P1-#2 ProcessStepsFrame**
- FAQ 4 items → `<FaqFrame>` ✅
- "Nos solutions" 4 cards → **GAP P1-#3 RelatedSolutionsFrame**
- Final CTA 2 cards → `<CtaFrame>` + `<CardCta>` ✅

**Verdict:** ⚠️ partial — 4 gaps P1/P2.

#### `/lp/pi-planning`
- Hero → `<Hero>` ✅
- Tabs nav → **GAP P1-#1**
- Trust 4 metrics → `<ValuePropositionFrame>` ✅
- "Quotidien RTE" 6 pains → `<ComparisonFrame>` ✅
- 8 features (Import Jira, Sync, Roadmap, Capacity, Flash, Objectifs PI, IA découpage, Scénarios) → 8× `<FeatureFrame>` ✅
- "Avant / Après" 5 paired rows → `<ComparisonDualFrame>` ✅
- "Pourquoi pas Jira Align/PowerBI/piplanning.io" 4 narrative cards → `<ValuePropositionFrame>` ou `<PillarFrame>` (fit moyen — gap P5)
- Testimonial 1 person → **GAP P2-#5 min=1**
- FAQ 5 items → `<FaqFrame>` ✅
- Security 4 items → `<ValuePropositionFrame>` ✅
- "Nos solutions" → **GAP P1-#3**
- Final CTA → `<CtaFrame>` ✅

**Verdict:** ⚠️ partial — 3 gaps P1/P2.

#### `/lp/pmo`
- Hero → `<Hero>` ✅
- Tabs nav → **GAP P1-#1**
- Trust 4 metrics → `<ValuePropositionFrame>` ✅
- "Quotidien PMO" 4 pains → `<ComparisonFrame>` ✅
- 10 features (Agent IA qualif, Bilan santé, Flash Report, Kanban décisions, Cadrage, KPI, Planif trim, Capacité, Portfolio) → 10× `<FeatureFrame>` ✅
- "Contremaître → Coach" 3 pillars → `<PillarFrame>` ✅
- Testimonials 2 → **GAP P2-#5**
- Security 4 items → `<ValuePropositionFrame>` ✅
- Ecosystème 6 logos → `<IconRowFrame>` ✅
- "Comment ça marche" 4 steps → **GAP P1-#2**
- FAQ 4 → `<FaqFrame>` ✅
- "Nos solutions" → **GAP P1-#3**
- Final CTA → `<CtaFrame>` ✅

**Verdict:** ⚠️ partial — 4 gaps P1/P2.

#### `/lp/ppm`
- Hero → `<Hero>` ✅
- Tabs nav → **GAP P1-#1**
- Trust 4 metrics → `<ValuePropositionFrame>` ✅
- "Vous vous reconnaissez" 4 pains → `<ComparisonFrame>` ✅
- 7 features (Flash, Roadmap Comex, Priorisation, Décisions, Portfolio, Capacité, Scénarios IA) → 7× `<FeatureFrame>` ✅
- "Pourquoi équipes adoptent" 3 pillars → `<PillarFrame>` ✅
- Testimonials 2 → **GAP P2-#5**
- Security 4 items → `<ValuePropositionFrame>` ✅
- Ecosystème 6 logos → `<IconRowFrame>` ✅
- "Comment ça marche" 4 steps → **GAP P1-#2**
- FAQ 5 → `<FaqFrame>` ✅
- "Nos solutions" → **GAP P1-#3**
- Final CTA → `<CtaFrame>` ✅

**Verdict:** ⚠️ partial — 4 gaps P1/P2.

---

### Produit (6 pages)

#### `/produit/automatiser-la-com-projet`
- Hero split + illustration → `<Hero>` ✅
- "Vous n'entendrez plus ces phrases" → `<ComparisonFrame>` sans OU `<ListEmphasized>` ✅
- "Ajoutez sponsors" + screenshot → `<FeatureFrame>` side-by-side ✅
- "Récap synthétique" 3 sub-features → `<PillarFrame>` OU `<ValuePropositionFrame>` ✅
- Répétition 3 sub-features (probable doublon) → idem ✅
- CTA "Vous voulez l'essayer" → `<CtaHighlightFrame>` ✅
- "Nos solutions" 4 cross-links → **GAP P1-#3**

**Verdict:** ⚠️ partial — 1 gap P1.

#### `/produit/budget`
- Hero → `<Hero>` ✅
- "Suivi facile" + sub-feature "Cadrage simplifié" → `<FeatureFrame>` ✅
- "Rituels puissants" + 5 questions → `<FeatureFrame>` + richContent ✅
- 5× feature blocks (Vues, Coût humain, Indicateurs, Dépenses, Personnalisation) → 5× `<FeatureFrame>` ✅
- "Budget thème central" + 4 items → `<FeatureFrame>` + `<CheckList>` ✅
- CTA → `<CtaHighlightFrame>` ✅
- FAQ 2 items → **GAP P2-#9**
- "Nos solutions" → **GAP P1-#3**

**Verdict:** ⚠️ partial — 2 gaps.

#### `/produit/capacity-planning`
- Hero → `<Hero>` ✅
- 3 bullets questions → `<FeatureFrame>` richContent OU `<ListEmphasized>` ✅
- Intro "Voici comment" → `<SectionHeading>` ✅
- "Scénarios" intro → `<FeatureFrame>` stacked ✅
- 4× feature blocks → 4× `<FeatureFrame>` ✅
- "Vue actionnable" → `<FeatureFrame>` ✅
- CTA → `<CtaHighlightFrame>` ✅
- FAQ 5 → `<FaqFrame>` ✅
- "Nos solutions" → **GAP P1-#3**

**Verdict:** ⚠️ partial — 1 gap P1.

#### `/produit/priorisation-par-equipes`
- Hero → `<Hero>` ✅
- Intro → `<SectionHeading>` ✅
- 3× feature blocks → 3× `<FeatureFrame>` ✅
- CTA → `<CtaHighlightFrame>` ✅
- FAQ 3 → `<FaqFrame>` ✅
- "Nos solutions" → **GAP P1-#3**

**Verdict:** ⚠️ partial — 1 gap P1.

#### `/produit/reporting-projet`
- Hero → `<Hero>` ✅
- "Prenons de la hauteur" 3 raisons → **GAP P2-#8 ComparisonFrame min=3** OU `<HighlightFrame>` ✅
- 3× feature blocks → 3× `<FeatureFrame>` ✅
- "Plus besoin d'aller à la pêche" → `<FeatureFrame>` ✅
- CTA → `<CtaHighlightFrame>` ✅
- FAQ 3 → `<FaqFrame>` ✅
- "Nos solutions" → **GAP P1-#3**

**Verdict:** ⚠️ partial — 2 gaps.

#### `/produit/traduction-one-click-avec-deepl`
- Hero → `<Hero>` ✅
- "Rapport flash multilingue" 4 bullets → `<FeatureFrame>` + `<CheckList>` ✅
- Intro "Chefs vont adorer" → `<SectionHeading>` ✅
- 4× feature blocks → 4× `<FeatureFrame>` ✅
- "En bref" → `<FeatureFrame>` stacked ✅
- CTA → `<CtaHighlightFrame>` ✅
- "Nos solutions" → **GAP P1-#3**

**Verdict:** ⚠️ partial — 1 gap P1.

---

### Équipes (4 pages)

#### `/equipes/comite-direction`
- Hero + screenshot Portfolio → `<Hero>` ✅
- Press 4 quotes (Alliancy, JDN, Le Point, LMI) → **GAP P3-#12** (href) → `<TestimonialsFrame>` + `<TestimonialCompanyCard>`
- 3 testimonials → `<TestimonialsFrame>` + `<TestimonialCard>` (⚠️ **GAP P2-#10** Marie-Odile ~800 chars)
- Mission statement → `<FeatureFrame>` stacked ✅
- "Les chiffres" 4 stats → `<ValuePropositionFrame>` + `<FeatureCard>` ✅
- 5 feature blocks (Animez CoPil, Roadmap macro, Uniformisez, Bonne info, Programmes) → 5× `<FeatureFrame>` ✅
- "7 raisons" avec/sans → `<ComparisonDualFrame>` ✅
- Closing CTA → `<CtaHighlightFrame>` ✅
- Integrations → `<FeatureFrame>` OU `<IconRowFrame>` ✅
- Client sectors 10 industries → **GAP P4-#15 ClientSectorsFrame**
- "Laissez nos clients" → `<CtaFrame>` + `<CardCta>` ✅

**Verdict:** ⚠️ partial — 3 gaps.

#### `/equipes/direction-de-la-transformation`
- Hero → `<Hero>` ✅
- Press → `<TestimonialsFrame>` (press-card gap)
- 3 testimonials → `<TestimonialsFrame>` + `<TestimonialCard>` ✅
- Narrative "Direction au centre" → `<FeatureFrame>` stacked ✅
- "Pourquoi adopter" 4 stats → `<ValuePropositionFrame>` ✅
- 4 feature blocks → 4× `<FeatureFrame>` ✅
- "DROP/ADD/KEEP/IMPROVE" 4 pillars → `<PillarFrame>` ✅ **(fit parfait par contract)**
- avec/sans 4 pairs → `<ComparisonDualFrame>` ✅
- Closing CTA → `<CtaHighlightFrame>` ✅
- Integrations → `<FeatureFrame>` ✅

**Verdict:** ✅ **fully covered** (modulo press-card href gap partagé).

#### `/equipes/it-et-operation`
- Hero → `<Hero>` ✅
- Press → `<TestimonialsFrame>` (press-card gap)
- 3 testimonials → `<TestimonialsFrame>` ✅
- Narrative "Vraiment au centre" → `<FeatureFrame>` stacked ✅
- "Les chiffres" 4 stats → `<ValuePropositionFrame>` ✅
- 5 feature blocks → 5× `<FeatureFrame>` ✅
- Mid-CTA "Gagnez temps contrôle" → `<CtaFrame>` (pas CtaHighlight pour éviter 2× sur page) ✅
- avec/sans 7 pairs → `<ComparisonDualFrame>` ✅
- Marketplace → `<FeatureFrame>` ✅
- "Injectez méthodologie" 3 podcast episodes → **GAP P5 podcast**
- Client sectors → **GAP P4-#15**
- "Laissez clients" → `<CtaFrame>` + `<CardCta>` ✅

**Verdict:** ⚠️ partial — 2 gaps.

#### `/equipes/outil-pmo`
- Hero → `<Hero>` ✅
- Press → `<TestimonialsFrame>` (press-card gap)
- 3 testimonials → `<TestimonialsFrame>` ✅
- "Les chiffres" 3 stats → `<ValuePropositionFrame>` cols=3 ✅
- Narrative + "Partagez roadmaps" → `<FeatureFrame>` stacked + `<FeatureFrame>` ✅
- "Capacity planning par équipe" → `<FeatureSectionStacked>` ✅
- "Chaque dir définit prios" + "Diffusez cadrage" → 2× `<FeatureFrame>` ✅
- Newsletter sponsor 3 sub-blocks × 2 → **GAP P5 newsletter anatomy**
- 4 feature blocks (Reporting, Fluidifiez, Impliquez CP, Animez CoPil) → 4× `<FeatureFrame>` ✅
- Mid-CTA → `<CtaHighlightFrame>` ou `<CtaFrame>` ✅
- Marketplace → `<FeatureFrame>` ✅
- avec/sans 7 pairs → `<ComparisonDualFrame>` ✅
- "Laissez clients" → `<CtaFrame>` + `<CardCta>` ✅
- "Replay" video thumbnail → **GAP P3-#13 CardCta mediaThumbnail**
- Client sectors → **GAP P4-#15**

**Verdict:** ⚠️ partial — 4 gaps.

---

### Solution (12 pages)

Légende : `[G]` = collection "gestion projet".

#### 1. `airsaas-et-les-experts-de-la-transfo`
- Hero split light → `<Hero>` ✅
- Intro "Engagez-vous" → `<FeatureFrame>` stacked ✅
- Press → `<LogosBar>` + `<TestimonialCompanyCard>` × 4 ✅
- 6 témoignages LinkedIn → `<TestimonialsFrame>` (⚠️ contract actuel 3–6 → OK) ✅
- Bootcamp Slider 6 images → `<SliderFrame>` ✅
- "AirSaas tooling" → `<FeatureFrame>` ✅
- LPDT communauté Slider fond sombre → **GAP P3-#11 SliderFrame dark**
- Closing CTA → `<CtaHighlightFrame>` ✅

**Verdict:** ⚠️ partial — 1 gap P3.

#### 2. `flash-report`
- Hero → `<Hero>` ✅
- Intro → `<FeatureFrame>` stacked ✅
- Stats 3 → `<ValuePropositionFrame>` ✅
- "Données consolidées" → `<FeatureFrame>` ✅
- "Rapports décision" → `<FeatureFrame>` ✅
- "Structure perso" → `<FeatureFrame>` ✅
- Mid-CTA → `<CtaHighlightFrame>` ✅
- "Plus qu'un reporting" 4 features → `<ValuePropositionFrame>` ✅
- "3 bonnes pratiques" → `<HighlightFrame>` ✅
- Press + 3 testimonials → **P4-#14 PressAndTestimonialsFrame candidate**
- Closing → `<CtaHighlightFrame>` ✅

**Verdict:** ✅ fully covered.

#### 3. `flash-report-projet`
- Hero → `<Hero>` ✅
- Intro longue → `<FeatureFrame>` richContent ✅
- "Consolidez" 2 features → 2× `<FeatureFrame>` ✅
- "Personnalisez" 2 features → 2× `<FeatureFrame>` ✅
- Mid-CTA → `<CtaHighlightFrame>` ✅
- "Fluidifiez Copil" 2 features → **GAP P2-#6 ValuePropositionFrame cols=2**
- "Plus qu'une solution" 4 features → `<ValuePropositionFrame>` ✅
- "3 règles d'or" → `<HighlightFrame>` ✅
- Press + testimonials → P4-#14
- Closing → `<CtaHighlightFrame>` ✅

**Verdict:** ⚠️ partial — 1 gap P2.

#### 4. `gestion-portefeuille-projet` `[G]`
- Hero → `<Hero>` ✅
- Press + testimonials → P4-#14
- 3 bénéfices icônes → **GAP P2-#7 IconRowFrame min=3** OU `<ValuePropositionFrame>` ✅
- 4× feature blocks (Copil, Reporting, Ressources, Consommation) → 4× `<FeatureFrame>` ✅
- Mid-CTA → `<CtaHighlightFrame>` ✅
- "Avancez sereinement" 4 features → `<ValuePropositionFrame>` ✅
- Long-form "PM vs PPM", historique, visions DSI, Maslow → **GAP P1-#4 ArticleBodyFrame**
- Closing → `<CtaHighlightFrame>` ✅

**Verdict:** ⚠️ partial — 2 gaps P1/P2.

#### 5. `management-de-portefeuille-projet` `[G]`
- Hero → `<Hero>` ✅
- Intro → `<FeatureFrame>` stacked ✅
- 2 features macro → 2× `<FeatureFrame>` ✅
- 3 vues (liste/Kanban/timeline) → `<ValuePropositionFrame>` OU `<PillarFrame>` ✅
- Mid-CTA → `<CtaHighlightFrame>` ✅
- "Automatisez flash" 2 features → 2× `<FeatureFrame>` ✅
- "Collaborez" 3 features → `<ValuePropositionFrame>` ✅
- Mid-CTA ✅
- "5 règles d'or" → `<HighlightFrame>` ✅
- Press + testimonials → P4-#14
- Closing → `<CtaHighlightFrame>` ✅

**Verdict:** ✅ fully covered.

#### 6. `outil-ppm`
- Hero → `<Hero>` ✅
- Intro def → `<FeatureFrame>` stacked ✅
- 6 features grid → **GAP P2-#6 ValuePropositionFrame cols=6** OU split 3+3 OU `<PillarFrame>` (2–6)
- Mid-CTA ✅
- 4 features métiers → `<ValuePropositionFrame>` ✅
- Mid-CTA ✅
- Long-form PM vs PPM + Maslow → **GAP P1-#4**
- 3 features "Où se situe" → `<ValuePropositionFrame>` ✅
- Closing → `<CtaHighlightFrame>` ✅

**Verdict:** ⚠️ partial — 2 gaps.

#### 7. `outils-de-pilotage-projet`
- Hero → `<Hero>` ✅
- Intro 4 paragraphes → `<FeatureFrame>` stacked ✅
- 4 features (Cadrage, Valeur, Reporter, Hauteur) → `<ValuePropositionFrame>` ✅
- Mid-CTA ✅
- "Valorisez équipe" 3 features → `<ValuePropositionFrame>` ✅
- Mid-CTA ✅
- Long-form typologies + Maslow → **GAP P1-#4**
- "Quel type" 2–3 features → `<FeatureFrame>` × 2 OU `<ValuePropositionFrame>` ✅
- Closing → `<CtaHighlightFrame>` ✅

**Verdict:** ⚠️ partial — 1 gap P1.

#### 8. `portfolio-management` `[G]`
- Hero → `<Hero>` ✅
- Press + 3 testimonials → P4-#14
- 3 metrics "Les chiffres" → `<ValuePropositionFrame>` ✅
- "Plateforme gouvernance" 4 features → `<ValuePropositionFrame>` ✅
- "Capacity par équipe" → `<FeatureSectionStacked>` ✅
- Newsletter sponsor 3 blocks × 2 + preview → **GAP P5 newsletter anatomy**
- "Reporting + Fluidifiez" 2 features → 2× `<FeatureFrame>` ✅
- "5 bonnes pratiques" → `<HighlightFrame>` ✅
- Mid-CTA ✅
- Marketplace → `<FeatureFrame>` ✅
- avec/sans 7 pairs → `<ComparisonDualFrame>` ✅
- "Laissez clients parler" → `<CtaFrame>` ou mini testimonials ✅
- Industries 12 icônes+chiffres → **GAP P4-#16 IndustryStatsFrame**
- Closing → `<CtaHighlightFrame>` ✅

**Verdict:** ⚠️ partial — 2 gaps.

#### 9. `revue-de-portefeuille` `[G]`
- Hero → `<Hero>` ✅
- Intro + 3 bénéfices icônes → **GAP P2-#7 IconRowFrame min=3** OU `<ValuePropositionFrame>` ✅
- 4× feature blocks → 4× `<FeatureFrame>` ✅
- Mid-CTA ✅
- "Fluidifiez gouvernance" 3 features → `<ValuePropositionFrame>` ✅
- Mid-CTA ✅
- "6 clés" → `<HighlightFrame>` ✅
- Press + testimonials → P4-#14
- Closing → `<CtaHighlightFrame>` ✅

**Verdict:** ✅ fully covered (modulo P2-#7 optional).

#### 10. `tableau-de-bord-dsi`
- Hero → `<Hero>` ✅
- Intro → `<FeatureFrame>` stacked ✅
- "Pilotage valeur" + 3 domaines → `<FeatureFrame>` checklist ✅
- 3 vues → `<ValuePropositionFrame>` OU `<SliderFrame>` ✅
- "Embarquez" → `<FeatureFrame>` ✅
- Mid-CTA ✅
- 3 features (Flash/Adhésion/Profit) → `<ValuePropositionFrame>` ✅
- 3 sub-features (Données/Indicateurs/Collaboratif) → `<ValuePropositionFrame>` ✅
- Mid-CTA ✅
- Long-form éditorial (4+ sections prose) → **GAP P1-#4 majeur**
- Closing → `<CtaHighlightFrame>` ✅

**Verdict:** ⚠️ partial — 1 gap P1 majeur.

#### 11. `tableau-de-bord-gestion-de-projet` `[G]`
- Hero → `<Hero>` ✅
- Intro explicative → `<FeatureFrame>` stacked ✅
- "Piloter valeur" + 3 domaines → `<FeatureFrame>` checklist ✅
- 3 vues → `<ValuePropositionFrame>` ✅
- "Impliquer parties prenantes" → `<FeatureFrame>` ✅
- Mid-CTA ✅
- "Flash + Adhésion" → 2× `<FeatureFrame>` ✅
- "Pourquoi crucial DSI" + "Comment choisir indicateurs" prose longue → **GAP P1-#4**
- "Conclusion / règles" → `<FeatureFrame>` checklist ✅
- Closing → `<CtaHighlightFrame>` ✅

**Verdict:** ⚠️ partial — 1 gap P1.

#### 12. `tableau-de-bord-portefeuille-de-projet` `[G]`
- Hero → `<Hero>` ✅
- Intro → `<FeatureFrame>` stacked ✅
- 2 features macro → 2× `<FeatureFrame>` ✅
- 3 vues → `<ValuePropositionFrame>` OU `<PillarFrame>` ✅
- Mid-CTA ✅
- 2 features reporting → 2× `<FeatureFrame>` ✅
- "Collaborez" 3 features → `<ValuePropositionFrame>` ✅
- Mid-CTA ✅
- "4 règles d'or" → `<HighlightFrame>` ✅
- Press + testimonials → P4-#14
- Closing → `<CtaHighlightFrame>` ✅

**Verdict:** ✅ fully covered.

---

## Recommendation — séquence de rebuild

### Étape A — DS Extensions (ordre de priorité)

1. **P1-#1 `TabsFrame`** (4 LP bloquées) — tabs hero-adjacent, 3–6 anchors
2. **P1-#2 `ProcessStepsFrame`** (3 LP) — 3–5 numbered sequential steps + connector
3. **P1-#3 `RelatedSolutionsFrame`** (10 pages) — 3–4 cards image+titre+desc+CTA
4. **P1-#4 `ArticleBodyFrame`** (5 Solution) — long-form prose marketing non-blog

### Étape B — Contract tweaks (parallélisable avec A)

5. P2-#5 `TestimonialsFrame.min = 1` (ou `2`)
6. P2-#6 `ValuePropositionFrame.cols = 2–6`
7. P2-#7 `IconRowFrame.min = 3`
8. P2-#8 `ComparisonFrame.min = 3`
9. P2-#9 `FaqFrame.min = 2`
10. P2-#10 `TestimonialCard.quote = 400` (+ read-more)

### Étape C — Enrichissements mineurs

11. P3-#11 `SliderFrame.variant = "dark"`
12. P3-#12 `TestimonialCompanyCard.href` (optional)
13. P3-#13 `CardCta.mediaThumbnail` (optional)

### Étape D — Composed components (optionnel mais ROI élevé)

14. P4-#14 **`PressAndTestimonialsFrame`** — réduit 14 pages dupliquées en 1 slot CMS
15. P4-#15 `ClientSectorsFrame` — 3 pages Équipes
16. P4-#16 `IndustryStatsFrame` — 1 page Solution

### Étape E — Rebuild 26 pages

Une fois A+B validés (C+D optionnels selon le budget), les 26 pages peuvent être rebuildées sans contournement DS strict.

---

## Artefacts conservés

- `docs/live-captures/{category}/*.md` — source content Playwright (intacte)
- `docs/pages-rebuild-tracker.md` — tracker de la session précédente
- `docs/session-summary-2026-04-23.md` — summary PR #40
- `docs/ds-components-reference.md` — inventaire DS (à jour post #37/#38)
- `docs/ds-rules.md` — 5 golden rules

## Notes

- Aucune page n'est **blocked** au sens absolu : toutes les gaps ont un workaround (inline component, alternative DS, split section).
- La collection **gestion projet** `[G]` (6 pages) partage majoritairement les mêmes gaps : long-form éditorial (GAP P1-#4) + press+testimonials block (P4-#14). Résoudre ces 2 gaps libère la quasi-totalité de la collection.
- Les 4 LP pages partagent un gabarit très proche → résoudre GAP P1-#1/#2/#3 + P2-#5 débloque toutes les 4 en même temps.
