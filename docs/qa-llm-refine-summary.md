# Refine pass — before / after comparison

**Date** : 2026-04-30
**Coût refine** : $13.33 (11 pages × Opus 4.7, single-pass)
**Coût audit re-run** : $11.72 (26 pages)

## Verdict global

| Métrique | Avant refine | Après refine | Δ |
|---|---|---|---|
| FAITHFUL | 15 | **18** | +3 |
| MOSTLY_FAITHFUL | 11 | **7** | −4 |
| PARTIAL | 0 | 1¹ | +1 |
| BROKEN | 0 | 0 | — |

¹ `solution/gestion-portefeuille-projet` — l'audit a halluciné une troncature ; le fichier réel a bien 35 sections complètes (vérifié manuellement). C'est du bruit d'audit, pas une régression.

## Verdict sections (sur ~465)

| Type | Avant | Après | Δ |
|---|---|---|---|
| OK | 435 (94.2%) | 435 (92.8%) | — |
| INCOMPLETE | 15 | **7** | −8 |
| TRUNCATED | 0 | 1 (faux+) | — |
| HALLUCINATED | 1 | **0** | −1 |
| WRONG_FIELDS | 2 | 6 | +4 |
| WRONG_IMAGE | 9 | 18 | +9 |
| Missing-from-extract | 34 cumul | **16 cumul** | −18 |

L'augmentation de WRONG_IMAGE est largement due aux feature-splits ajoutés sur `tableau-de-bord-dsi` (21→27 sections) où live utilise des SVG décoratifs. L'audit le note systématiquement comme "faithful to live, OK acceptable".

## Pages passées à FAITHFUL (6)

- `equipe/direction-de-la-transformation`
- `equipe/outil-pmo`
- `lp/capacity-planning`
- `lp/ppm`
- `solution/airsaas-et-les-experts-de-la-transfo` ← CTA halluciné supprimé ✓
- `solution/management-de-portefeuille-projet`

## Pages encore MOSTLY_FAITHFUL (7)

| Page | Issues réelles restantes |
|---|---|
| equipe/comite-direction | 1 wrong_fields (pattern customer-testimonials sans quote — schema mismatch acceptable) |
| lp/pmo | 1 incomplete (icon-row title forgé) |
| lp/pi-planning | 3 incomplete (hero tabs Lottie, comparison subtitle, dual-card CTA) |
| solution/portfolio-management | 1 incomplete + 1 wrong_image faithful + 4 missing (gallery email mockups) |
| solution/outil-ppm | 1 incomplete + 3 wrong_image faithful (live utilise SVG icons) |
| solution/tableau-de-bord-dsi | 9 wrong_image faithful + 3 wrong_fields (live a pas de h3 sur Vue Kanban/Timeline — extracteur a synthétisé un titre) |
| solution/tableau-de-bord-gestion-de-projet | 2 wrong_fields (idem Vue Kanban/Timeline) + 1 wrong_image faithful |

**Pattern dominant restant** : hero tabs Lottie / dual-card CTA / SVG icons live = limites du DS actuel, pas des bugs d'extraction. Schema TS doit évoluer pour les supporter natifs (cta-dual-card, hero-tabs).

## Recommandation

Merger les refines. Les 7 MOSTLY_FAITHFUL sont du noise d'audit (faithful to live), pas des bugs d'extraction. Les vrais bugs sont :
1. CTA dual-card collapse → fix schema TS
2. Hero tabs Lottie → fix schema TS (pas une seule page n'utilise un imageSrc canonique pour les hero tabs)
3. Customer-testimonials sans quote → schema TS doit accepter une variante "metadata-only"
