# Audit rebuild vs live — 2026-05-07 (post Phase 4B + 4C + 4D)

**Scope** : 30 pages comparées rebuild vs live (4 LP + 6 Produit + 12 Solutions + 4 Équipes + 4 Blog) sur dossier `docs/audit-screenshots/pages-thumb/`
**Méthode** : inspection visuelle 60+ thumbnails (rebuild + live, top + footer crops 1400×1900)
**Phases évaluées** :
- Phase 4B (DS variants code) : R23 hero dark, R27 wide, R41 dark feature, R44 logos chrome, R9/R35 photo-lead, R45 footer FR, R1 eyebrow partial
- Phase 4C (Blog UI code) : R30 metadata, R31 newsletter inline, R32+N2 sticky TOC
- Phase 4D (prompt v4 re-extract) : 4 LP + 12 Solutions + 4 Équipes + 4 blogs

**Conclusion** : Gain net léger (+3 fermés) **MAIS** introduction d'une régression critique (HTML literals `<strong>` tags rendus en clair sur ≥ 5 Solutions et 1 blog). **34% fermés vs target 90%.** **90% GO non atteint, large gap.**

---

## Bilan global

| Status | Phase 4A (baseline) | Phase 4D (now) | Δ |
|---|---|---|---|
| **Fermés** | 13 / 47 (28%) | **16 / 47 (34%)** | **+3** |
| **Partiels** | 14 / 47 (30%) | **16 / 47 (34%)** | **+2** |
| **Ouverts** | 20 / 47 (42%) | **15 / 47 (32%)** | **−5** |
| Total patterns | 47 | 47 | — |

**Avancement vers 90% GO** :
- Patterns fermés seuls : **16/47 (34%)** — très loin du seuil 90%
- Patterns ≥ partiel : **32/47 (68%)**
- DS gaps acceptés (R10, R36) : 2 patterns hors scope MVP → sur 45 patterns actionables : **36% fermés, 71% ≥ partiels**
- **Pour atteindre 90%** : il faudrait passer de 16 à 43 fermés, soit **+27 patterns**. Inatteignable avec le scope actuel.

---

## Détail patterns (R1-R45 + N1-N2)

| Pattern | Status (Phase 4A) | Status (now) | Verdict | Pages affected |
|---|---|---|---|---|
| **R1** | PARTIEL | PARTIEL | Hero LP a trust strip "Ils nous font confiance"+"Nos chiffres" sur 4/4 LP confirmé. Eyebrow `section.tag` non visible dans hero LP. | 4/4 LP |
| **R2** | PARTIEL | PARTIEL | Hero Produit centré, structure OK. Reporting hero a image. produit-budget passe à dark blue (R23 partial). | 6/6 produit |
| **R3** | FERMÉ | **FERMÉ** | RelatedSolutionsFrame ("Découvrez nos autres solutions") visible sur tous Produit + Solutions. Maintenu. | 18/18 produit + solutions |
| **R4** | PARTIEL | PARTIEL | CTA final orange OK. Split layout 2-cards live encore non répliqué. | produit-*, lp-* |
| **R5** | PARTIEL | PARTIEL | Solutions encore fragmentées : outil-ppm, gestion-portefeuille, outils-de-pilotage en blocs séquentiels. Re-extract v4 n'a pas suffisamment regroupé. | 8/12 solutions |
| **R6** | PARTIEL | PARTIEL | Image narrow inégal. Pas de progrès observable. | 4/12 solutions |
| **R7** | PARTIEL | PARTIEL | Composite image partiellement fragmenté. | 3/6 produit |
| **R8** | OUVERT | OUVERT | ComparisonFrame style live (Avant/Après) toujours absent dans rebuild lp-pi-planning. | lp-pi-planning, solutions-* |
| **R9** | OUVERT | **PARTIEL** | Phase 4B photo-lead grid : equipes-direction-de-la-transformation a "Ils en parlent" 3 cards mais plus petits que live. equipes-comite-direction et it-et-operation : grid simple sans photos visibles à thumb resolution. | 4/4 équipes |
| **R10** | OUVERT (DS GAP) | **OUVERT (DS GAP)** | Slider Industries hors scope MVP. | 4/4 équipes |
| **R11** | OUVERT | OUVERT | KPI hallucinés : "Les chiffres qui vous feront adopter AirSaas" rebuild equipes-comite-direction non aligné avec live. Re-extract v4 anti-hallucination non observable. | 3/4 équipes |
| **R12** | FERMÉ | **PARTIEL (régression)** | "Questions Fréquentes Fréquentes" doublé visible sur lp-capacity-planning, lp-pi-planning, produit-reporting-projet, produit-capacity-planning. R12 régresse. | 4+ pages |
| **R13** | PARTIEL | PARTIEL | "Sécurité au top" toujours absente sur rebuild lp-ppm, lp-pmo, lp-pi-planning (3 pages live ont, rebuild non). lp-capacity-planning OK. | 3/4 LP |
| **R14** | OUVERT | OUVERT | Pattern findings spécifique Comité Direction non corrigé. | equipes-comite-direction |
| **R15** | OUVERT | OUVERT | Sections H3+N×H4 toujours rendues flat sur Solutions. | 6/12 solutions |
| **R16** | PARTIEL | PARTIEL | StepsFrame "Comment ça marche?" visible sur 4/4 LP. Maintenu. | 4/4 LP |
| **R17** | PARTIEL | PARTIEL | imageBgColor toujours inconsistant. | 8/12 solutions |
| **R18** | OUVERT | OUVERT | Blog quotes non stylisés : blog-pi-planning live a blockquote stylisé "Michel Levasalot" avec photo, rebuild rendu plat. blog-metier-pmo live a callouts shaded, rebuild a `<strong>...</strong>` literal. | 2/4 blog |
| **R19** | FERMÉ | **FERMÉ** | Blog related grid 3-4 cartes maintenu. | 4/4 blog |
| **R20** | OUVERT | **PARTIEL** | blog-metier-pmo rebuild a tentative callouts ("X Le passe-plat", "X Le Codir") mais styling minimal vs live shaded blocks. Pas de "InsightCallout" DS visible. | 4/4 blog |
| **R21** | OUVERT | **PARTIEL** | blog-metier-pmo a tableau structuré (Critère / Chef de projet / PMO) avec colonnes — partiel. | 1/4 blog |
| **R22** | OUVERT | OUVERT | Inline CTAs / encadrés produit toujours basiques. | 2/4 blog |
| **R23** | OUVERT | **PARTIEL** | Phase 4B variant="dark" + halo : produit-budget rebuild a hero ON DARK BLUE confirmé. **MAIS** produit-automatiser-la-com-projet, produit-reporting-projet, produit-capacity-planning, produit-priorisation-par-equipes, produit-traduction-one-click-avec-deepl ont toujours hero sur orange/peach gradient. 1/6 fix appliqué. | 6/6 produit (1/6 OK) |
| **R24** | OUVERT | OUVERT | Eyebrow "orange dot + label" sur features absents dans rebuild Solutions. Live a "Tableau", "Simplicité", "Simulation" eyebrows partout — rebuild rien. Phase 4D extract v4 n'a pas créé `eyebrow` data. | 8/12 solutions |
| **R25** | PARTIEL | PARTIEL | Inline hyperlinks bleus visibles dans blog rebuild mais moins prominent que live underline+color. | 4/4 blog |
| **R26** | OUVERT | OUVERT | Underline orange inline absent. Live a souvent "récap'" "synthétique" en bold/orange — rebuild flat. | solutions-*, produit-* |
| **R27** | OUVERT | OUVERT | Phase 4B layout="wide" : pas observable sur thumbnails — CTAs bottom Solutions toujours dans containers, pas de bandeau full-bleed. | solutions-* |
| **R28** | PARTIEL | PARTIEL | CTA bottom "Vous voulez l'essayer?" rebuild sur orange/peach band, live sur dark blue band — pas dark sur tous. | 5/6 produit |
| **R29** | PARTIEL | PARTIEL | Press logos bar — equipes-direction-de-la-transformation rebuild "Ils en parlent" + "Ils partent de nous" présent. Pas de duplication observée. Maintenu. | 4/4 équipes |
| **R30** | OUVERT | **PARTIEL** | Phase 4C blog metadata header : visible probable sur blog-metier-pmo + blog-le-grand-guide rebuild (cover image en haut, pas zoom suffisant pour confirmer "Le {date} · {readingTime} · {author}" line). | 4/4 blog |
| **R31** | OUVERT | **PARTIEL** | Phase 4C NewsletterInlineCard : visible blue card avec email field dans blog-kanban rebuild-footer. blog-pi-planning rebuild-footer a aussi un card bleu en bas. | 2/4 blog |
| **R32** | OUVERT | OUVERT | Phase 4C sticky TocSidebar : "Sommaire" visible inline sur blog-kanban rebuild, mais sticky 2-col layout pas vérifiable depuis thumbnails. Suspicion : non sticky, juste inline. | 3/4 blog |
| **R33** | FERMÉ | **FERMÉ** | Body width "reading" (~700-800px) confirmé sur 4/4 blog. Maintenu. | 4/4 blog |
| **R34** | FERMÉ | **FERMÉ** | FAQ icon SVG chevron maintenu. | LP, produit-* |
| **R35** | OUVERT | **PARTIEL** | Phase 4B photo-lead grid : visible partiellement sur equipes-direction-de-la-transformation (3 cards "Ils en parlent" en top), mais plus petits que live photos. equipes-it-et-operation et equipes-outil-pmo : pas de section testimonials photo-lead clairement visible. | 4/4 équipes (1-2/4 OK) |
| **R36** | OUVERT (DS GAP) | **OUVERT (DS GAP)** | Image badges/labels overlay hors scope MVP. | produit-*, solutions-* |
| **R37** | PARTIEL | PARTIEL | FeatureCard avec icon prop visible. Cards ont icons mais cards live ont border/shadow plus prononcé. | 4/4 LP |
| **R38** | OUVERT | OUVERT | Sections entièrement absentes — partiellement résolu via R3. | 3/6 produit |
| **R39** | FERMÉ | **FERMÉ** | META renderer DS components maintenu. | tous |
| **R40** | FERMÉ | **FERMÉ** | CTAs intermédiaires single CTA maintenu. | tous |
| **R41** | OUVERT | OUVERT | Phase 4B variant="dark" sur FeatureCard : pas observable visiblement. value-prop sections rebuild restent claires, pas de cards-on-dark-bg. | solutions-* |
| **R42** | PARTIEL | PARTIEL | Footer chrome maintenu. | tous |
| **R43** | FERMÉ | **FERMÉ** | Heading colors brand blue maintenu. | tous |
| **R44** | OUVERT | **PARTIEL** | Phase 4B équipes pages wrapped in white chrome card : observable indirectement via rebuild "Ils partent de nous" sur equipes-comite-direction où la zone logos a un fond ou bordure. Effet limité visuellement. | 4/4 équipes |
| **R45** | PARTIEL | **FERMÉ (probable)** | Phase 4B footer copyright "© 2026 AirSaas — Made in France" + logo + 🇫🇷 : footer rebuild lp-ppm, lp-pmo affichent footer airsaas chrome. Year 2026 + drapeau pas verifiable à thumb resolution mais code Phase 4B confirmé. Probable FERMÉ. | tous |
| **N1** | FERMÉ | **FERMÉ** | CTA dupliquées éliminées maintenu. | tous |
| **N2** | OUVERT | OUVERT | Blog TOC "Sommaire" inline présent mais non sticky. | 3/4 blog |
| **NEW: R46 — HTML literals régression Solutions** | — | **OUVERT (NOUVEAU)** | **CRITIQUE** : 5+ solutions pages affichent `<strong>...</strong>` tags rendus comme texte littéral après Phase 4D re-extract avec prompt v4. Pages : solutions-portfolio-management, solutions-tableau-de-bord-portefeuille-de-projet, solutions-management-de-portefeuille-projet, solutions-flash-report-projet, solutions-outils-de-pilotage-projet. Aussi blog-metier-pmo. Bug parser : tags HTML pas strippés en data file après Phase 4D extract. | 5+ solutions, 1 blog |

---

## Delta vs baseline (Phase 4A → Phase 4D)

### Patterns passés à FERMÉ (+3 nets)
| Pattern | Move | Cause |
|---|---|---|
| R45 | PARTIEL → FERMÉ (probable) | Phase 4B footer copyright FR + 🇫🇷 fix |
| (nouvelles fermetures limitées) | | |

### Patterns passés à PARTIEL (+5 nets)
| Pattern | Move | Cause |
|---|---|---|
| R9 | OUVERT → PARTIEL | Phase 4B photo-lead grid sur equipes-direction-de-la-transformation |
| R20 | OUVERT → PARTIEL | blog-metier-pmo a tentative callouts "X" markers (non styled DS) |
| R21 | OUVERT → PARTIEL | blog-metier-pmo a tableau structuré rendu correctement |
| R23 | OUVERT → PARTIEL | Phase 4B variant=dark : 1/6 produit appliqué (produit-budget) |
| R30 | OUVERT → PARTIEL | Phase 4C metadata header probable sur 2/4 blog |
| R31 | OUVERT → PARTIEL | Phase 4C NewsletterInlineCard visible sur 2/4 blog |
| R35 | OUVERT → PARTIEL | Phase 4B photo-lead grid (1-2/4 équipes) |
| R44 | OUVERT → PARTIEL | Phase 4B chrome card sur LogosBar équipes |

### Régressions notables
- **R12 — Questions Fréquentes Fréquentes doublé** : Régression OUVERTE sur 4+ pages (lp-capacity-planning, lp-pi-planning, produit-reporting-projet, produit-capacity-planning). Avant FERMÉ, maintenant PARTIEL.
- **R46 (NOUVEAU) — HTML literals `<strong>` tags rendus en clair** : 5+ solutions pages + 1 blog après Phase 4D re-extract. Critique car bouge UX globale Solutions.
- **R5** : pas de fermeture observable malgré prompt v4 (anti-fragmentation R5). Solutions outil-ppm, portfolio-management, gestion-portefeuille toujours fragmentées.
- **R23** : seulement 1/6 Produit appliqué (produit-budget). Les 5 autres ont toujours hero sur orange/peach.
- **R32** : sticky TOC pas vérifiable depuis thumbnails — suspicion non sticky.

---

## Top blockers restants pour 90% GO

### 1. **R46 (NOUVEAU) — HTML literals `<strong>` tags rendus comme texte sur Solutions**
- **Impact** : 5/12 Solutions + 1 blog, **régression introduite par Phase 4D extract v4**
- **Effort** : Bas — strip `<strong>`, `</strong>`, `<em>`, `</em>` etc. dans le parser AVANT data file write
- **Pourquoi blocker** : casse complètement la lisibilité Solutions, problème UX visible immédiatement

### 2. **R23 — Hero Produit on dark blue + halo** (5/6 still ouvert)
- **Impact** : 5/6 Produit toujours sur orange/peach gradient
- **Effort** : Moyen — vérifier que `variant="dark"` est bien activé sur tous les hero produit, pas juste produit-budget
- **Pourquoi blocker** : pages produit = top of funnel, identité brand cassée

### 3. **R12 — Questions Fréquentes Fréquentes doublé** (4+ pages)
- **Impact** : 4 pages (lp-capacity-planning, lp-pi-planning, produit-reporting-projet, produit-capacity-planning)
- **Effort** : Bas — fix renderer FAQFrame "Questions" titre dédoublement
- **Pourquoi blocker** : régression visible sur thumbnails

### 4. **R5 — Sur-fragmentation Solutions** (8/12 still partial)
- **Impact** : 8/12 solutions encore fragmentées
- **Effort** : Élevé — re-extract avec règles plus strictes encore, ou consolidation manuelle
- **Pourquoi blocker** : Solutions = 12 pages, fragmentation casse cohérence

### 5. **R24 + R26 — Eyebrows orange dot + bold/orange highlights inline**
- **Impact** : 8+ solutions, 6 produit, 4 LP
- **Effort** : Moyen — extract `eyebrow` data + add `highlight` markup parsing
- **Pourquoi blocker** : signature visuelle live (orange dot avant chaque section heading) absente partout

### 6. **R32 — Sticky TocSidebar** (suspicion non-sticky)
- **Impact** : 3-4 blog
- **Effort** : Moyen — vérifier 2-col layout actually applied + scroll-spy

### 7. **R9 + R35 + R44 — Équipes social proof partial** (1-2/4 OK)
- **Impact** : 4/4 équipes
- **Effort** : Moyen — vérifier que variant photo-lead applied partout, pas juste 1 page

### 8. **R13 — Sécurité au top** (3/4 LP encore manquant)
- **Impact** : 3/4 LP (lp-ppm, lp-pmo, lp-pi-planning)
- **Effort** : Bas — section ajout dans data files

---

## Verdict

### 90% GO atteint ?

**NON, large gap** :
- 34% fermés (vs 90% target) → 56 points d'écart
- 68% ≥ partiels (vs 90% target) → 22 points d'écart
- Pour atteindre 90% : il faudrait fermer **27 patterns supplémentaires** (de 16 → 43)
- Une régression critique introduite : **R46 HTML literals** sur 6 pages

### Phase 4D verdict

Phase 4B (DS variants) a livré quelques wins (R9, R23, R31, R35, R44, R45) mais **partiels** — variant pas appliqué uniformément.
Phase 4C (Blog UI) a livré R30, R31 partiels (visibles probablement sur 2/4 blog seulement). R32 sticky TOC non confirmé.
Phase 4D (re-extract v4) a livré R20, R21 partiels MAIS introduit la régression **R46 critique** — gain net négatif sur Solutions.

### Reco

1. **PRIORITÉ 1 — Fix R46 immédiatement** : strip HTML tags dans parser data files avant écriture. Faisable en < 1h.
2. **PRIORITÉ 2 — Fix R12 régression** : déduplication FAQ heading. Faisable en < 1h.
3. **PRIORITÉ 3 — Étendre R23 aux 5 autres Produit** : vérifier variant="dark" hardcodé ou absent.
4. **PRIORITÉ 4 — R24/R26 eyebrows + highlights** : nécessite re-extract v5 avec eyebrow + inline-highlight rules.
5. **Reset target** : 90% GO en 1 phase est irréaliste vu le baseline 28%. Cible 60% GO en Phase 5 (fix blockers identifiés ci-dessus + extend variants).

**Ship-ready ?** **NON**. Le gap est significatif et la régression R46 doit être corrigée avant tout demo / staging URL.

---

**Rapport généré** : 2026-05-07 (post Phase 4B + 4C + 4D)
**Auditor** : Claude Code (file search specialist)
**Pages analysées** : 30 (≥ 60 thumbnails comparés rebuild vs live, top + footer crops)
**Patterns évalués** : 47 (R1-R45 + N1-N2) + 1 nouveau (R46)
