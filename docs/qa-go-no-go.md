# QA Go / No-Go report

**Date** : 2026-04-28T12:18:16.291Z

## Verdict global : 🛑 NO-GO

| Critère | Statut |
|---|---|
| 0 P0 toutes catégories | ❌ |
| ≥ 90% pages PASS (≥ 80/88) | ❌ |
| A11y médiane ≥ 90 | ✅ |
| SEO médiane ≥ 95 | ✅ |
| 0 broken link P0 | ✅ |

## Pages — 88 total
- ✅ PASS : 0
- ⚠️ WARN : 64
- 🛑 BLOCK : 24

### Par type

| Type | Total | PASS | WARN | BLOCK |
|---|---|---|---|---|
| lp | 4 | 0 | 4 | 0 |
| produit | 6 | 0 | 4 | 2 |
| solution | 12 | 0 | 5 | 7 |
| equipe | 4 | 0 | 2 | 2 |
| blog | 62 | 0 | 49 | 13 |

## Aggregate metrics

| Source | Median | Coverage |
|---|---|---|
| Lighthouse perf | 99 | 88/88 |
| Lighthouse a11y | 97 | 88/88 |
| Lighthouse SEO | 100 | 88/88 |
| Visual diff % | 14.7% | 88 captures |

## Pages BLOCK — 24
- **produit/automatiser-la-com-projet** — llm P0=1, visual1440=41%
- **produit/capacity-planning** — llm P0=1, visual1440=28%
- **solution/flash-report** — llm P0=1
- **solution/management-de-portefeuille-projet** — llm P0=1
- **solution/outil-ppm** — llm P0=1
- **solution/portfolio-management** — llm P0=4
- **solution/tableau-de-bord-dsi** — llm P0=1
- **solution/tableau-de-bord-gestion-de-projet** — llm P0=1
- **solution/tableau-de-bord-portefeuille-de-projet** — llm P0=1
- **equipe/comite-direction** — llm P0=3
- **equipe/outil-pmo** — llm P0=3
- **blog/cadrage-projet** — llm P0=2
- **blog/comite-de-pilotage-definitions-et-incomprehensions** — llm P0=3
- **blog/comment-decider-en-copil** — llm P0=2
- **blog/gestion-de-portefeuille-projet-pme** — llm P0=2
- **blog/gestion-portefeuille-projets-vs-gestion-de-projet** — llm P0=1
- **blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0** — llm P0=1
- **blog/management-de-portefeuille-de-projet** — llm P0=1
- **blog/pi-planning** — llm P0=2
- **blog/pi-safe** — llm P0=3
- **blog/pilotage-de-projet** — llm P0=3
- **blog/pourquoi-vos-18-millions** — llm P0=3
- **blog/program-increment-planning** — llm P0=2
- **blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets** — llm P0=1

## Pages WARN — 64
- lp/ppm — 
- lp/pmo — 
- lp/capacity-planning — 
- lp/pi-planning — 
- produit/budget — visual1440=28%
- produit/priorisation-par-equipes — visual1440=37%
- produit/reporting-projet — visual1440=36%
- produit/traduction-one-click-avec-deepl — visual1440=34%
- solution/airsaas-et-les-experts-de-la-transfo — visual1440=38%
- solution/flash-report-projet — 
- solution/gestion-portefeuille-projet — 
- solution/outils-de-pilotage-projet — 
- solution/revue-de-portefeuille — 
- equipe/direction-de-la-transformation — 
- equipe/it-et-operation — 
- blog/10-pratiques-pour-developper-la-relation-de-confiance-dg-cio — 
- blog/analyse-des-risques-projet — 
- blog/appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management — 
- blog/budget-previsionnel-projet — 
- blog/budgetiser-un-projet-sans-se-louper — 
- blog/capacity-planning — 
- blog/capacity-planning-definition — 
- blog/chef-de-projet-pmo — 
- blog/chef-de-projet-transverse — 
- blog/comite-pilotage-projet — 
- blog/comment-animer-un-bilan-projet-efficace — 
- blog/comment-animer-un-comite-de-pilotage — visual1440=27%
- blog/comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022 — 
- blog/comment-elaborer-un-reporting-efficace — 
- blog/comment-faire-un-bon-point-davancement-projet — 
- … +34 more

## Source data
- qaPage → `docs/raw/qa-page.json` ✅
- qaLlm → `docs/raw/qa-llm.json` ✅
- textCov → `docs/raw/rebuild-verification.json` ✅
- visual → `docs/raw/visual-diff.json` ✅
- lighthouse → `docs/raw/lighthouse.json` ✅
- links → `docs/raw/broken-links.json` ✅
- ds → `docs/raw/ds-audit.json` ✅