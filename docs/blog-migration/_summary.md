# Blog migration v8 — pilot re-run summary

Generated : 2026-05-13 (re-run after section-marker + L4 fixes)

## Results

| Slug | Status | Attempts | Cost (re-run) | Cost (1st pilot) |
|---|---|---|---|---|
| `kanban-gestion-de-projet` | ✅ pass | 2 | $2.00 | $2.89 |
| `comite-pilotage-projet` | ✅ pass | 1 | $1.26 | $2.56 |
| `metier-pmo` | ✅ pass | 4 | $6.71 (2nd) + $8.42 (1st escalated) | $5.16 |
| `pi-planning` | ✅ pass | 1 | $2.48 | $2.48 |
| `gestion-portefeuille-projets-vs-gestion-de-projet` | ✅ pass | 2 | $5.94 | $6.01 |

**Total re-run cost** : $26.80 (incl. metier-pmo's first escalated attempt)
**5/5 PASS** — no escalations remaining

## Post-run patches
- 3 level=4 headings on pi-planning upgraded to level=3 gradient=primary (file patch).
- Designer prompt + renderer post-process now prevent level=4 in body permanently.
