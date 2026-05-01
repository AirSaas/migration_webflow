# LLM (Opus) vs current data — diff report

**Date** : 2026-04-29T12:52:14.770Z

Pages où l'extraction Opus a plus de sections / types de sections que le parser regex actuel = candidats pour promote.

| Page | Current sections | LLM sections | Δ sections | Current types | LLM types | Δ types | Outcome |
|---|---|---|---|---|---|---|---|
| blog/cadrage-projet | 0 | 0 | +0 | 0 () | 0 () | +0 | EQUAL |
| blog/metier-pmo | 0 | 0 | +0 | 0 () | 0 () | +0 | EQUAL |
| equipe/comite-direction | 9 | 15 | +6 | 4 (hero, logo-bar, intro, feature-split) | 9 (hero, press-quotes, testimonials, intro, stats, feature-split…) | +5 | LLM-RICHER |
| equipe/direction-de-la-transformation | 7 | 13 | +6 | 4 (hero, logo-bar, intro, feature-split) | 8 (hero, press-quotes, testimonials, intro, stats, feature-split…) | +4 | LLM-RICHER |
| equipe/it-et-operation | 10 | 18 | +8 | 4 (hero, logo-bar, intro, feature-split) | 10 (hero, press-quotes, testimonials, intro, stats, feature-split…) | +6 | LLM-RICHER |
| equipe/outil-pmo | 13 | 19 | +6 | 4 (hero, logo-bar, intro, feature-split) | 9 (hero, press-quotes, testimonials, stats, intro, feature-split…) | +5 | LLM-RICHER |
| lp/pi-planning | 12 | 19 | +7 | 5 (hero, logo-bar, intro, feature-split…) | 12 (hero, logo-bar, stats, pain-points, intro, feature-split…) | +7 | LLM-RICHER |
| lp/pmo | 12 | 20 | +8 | 4 (hero, logo-bar, feature-split, faq) | 11 (hero, logo-bar, stats, pain-points, feature-split, icon-row…) | +7 | LLM-RICHER |
| lp/ppm | 10 | 18 | +8 | 4 (hero, logo-bar, feature-split, faq) | 11 (hero, logo-bar, stats, pain-points, feature-split, icon-row…) | +7 | LLM-RICHER |
| produit/automatiser-la-com-projet | 2 | 5 | +3 | 2 (hero, feature-split) | 4 (hero, pain-points, feature-split, cta) | +2 | LLM-RICHER |
| produit/budget | 9 | 12 | +3 | 4 (hero, intro, feature-split, faq) | 5 (hero, intro, feature-split, cta, faq) | +1 | LLM-RICHER |
| produit/capacity-planning | 9 | 10 | +1 | 4 (hero, intro, feature-split, faq) | 5 (hero, intro, feature-split, cta, faq) | +1 | LLM-RICHER |
| produit/priorisation-par-equipes | 6 | 7 | +1 | 4 (hero, intro, feature-split, faq) | 5 (hero, intro, feature-split, cta, faq) | +1 | LLM-RICHER |
| produit/reporting-projet | 7 | 8 | +1 | 4 (hero, intro, feature-split, faq) | 5 (hero, intro, feature-split, cta, faq) | +1 | LLM-RICHER |
| produit/traduction-one-click-avec-deepl | 5 | 9 | +4 | 3 (hero, intro, feature-split) | 4 (hero, intro, feature-split, cta) | +1 | LLM-RICHER |
| solution/airsaas-et-les-experts-de-la-transfo | 5 | 8 | +3 | 3 (hero, logo-bar, feature-split) | 6 (hero, intro, press-quotes, testimonials, feature-split, cta) | +3 | LLM-RICHER |
| solution/flash-report | 15 | 17 | +2 | 5 (hero, logo-bar, intro, feature-split…) | 8 (hero, intro, icon-row, feature-split, cta, steps…) | +3 | LLM-RICHER |
| solution/flash-report-projet | 18 | 24 | +6 | 5 (hero, logo-bar, intro, feature-split…) | 6 (hero, intro, feature-split, cta, press-quotes, testimonials) | +1 | LLM-RICHER |
| solution/gestion-portefeuille-projet | 40 | 33 | -7 | 5 (hero, logo-bar, intro, feature-split…) | 7 (hero, press-quotes, testimonials, intro, icon-row, feature-split…) | +2 | LLM-RICHER |
| solution/management-de-portefeuille-projet | 20 | 26 | +6 | 5 (hero, logo-bar, intro, feature-split…) | 6 (hero, intro, feature-split, cta, press-quotes, testimonials) | +1 | LLM-RICHER |
| solution/outil-ppm | 31 | 26 | -5 | 4 (hero, intro, feature-split, cta) | 4 (hero, intro, feature-split, cta) | +0 | REGRESSION |
| solution/outils-de-pilotage-projet | 37 | 28 | -9 | 4 (hero, intro, feature-split, cta) | 5 (hero, intro, stats, feature-split, cta) | +1 | LLM-RICHER |
| solution/portfolio-management | 17 | 22 | +5 | 4 (hero, logo-bar, intro, feature-split) | 10 (hero, press-quotes, testimonials, stats, intro, feature-split…) | +6 | LLM-RICHER |
| solution/revue-de-portefeuille | 17 | 22 | +5 | 5 (hero, logo-bar, intro, feature-split…) | 7 (hero, intro, icon-row, feature-split, cta, press-quotes…) | +2 | LLM-RICHER |
| solution/tableau-de-bord-dsi | 26 | 21 | -5 | 4 (hero, intro, feature-split, cta) | 4 (hero, intro, feature-split, cta) | +0 | REGRESSION |
| solution/tableau-de-bord-gestion-de-projet | 17 | 18 | +1 | 4 (hero, intro, feature-split, cta) | 4 (hero, intro, feature-split, cta) | +0 | LLM-RICHER |
| solution/tableau-de-bord-portefeuille-de-projet | 19 | 25 | +6 | 5 (hero, logo-bar, intro, feature-split…) | 6 (hero, intro, feature-split, cta, press-quotes, testimonials) | +1 | LLM-RICHER |

## Summary

- LLM-RICHER (more sections OR more types) : **23**
- EQUAL : 2
- REGRESSION (LLM has less) : 2
