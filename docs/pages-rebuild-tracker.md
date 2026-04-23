# Pages Rebuild Tracker — 26 pages (FR)

> **Document persistant de session** — mis à jour à chaque action.
> Si la session plante, reprendre en lisant ce fichier + `tasks` (TaskList).

**Start :** 2026-04-23
**Scope :** 4 LP + 12 Solution + 6 Produit + 4 Équipes = **26 pages**
**Langue :** FR only
**Branche :** `ds-site-marianela` (à créer `lp-rebuild` pour Vercel preview)
**Décisions amont :** voir `docs/ds-coverage-audit.md`

---

## Contexte / décisions utilisateur

1. Toutes les 26 pages à refaire avec DS strict (pas de composants custom hors `library-design/`)
2. **3 extensions DS** à créer : `StepsFrame`, `RelatedSolutionsFrame`, `ClientsFrame` + fix `SliderFrame` limit 5→8
3. Texte : **JSON FR hardcodé** à côté de chaque page (pas de Strapi pour ce batch)
4. Images : téléchargées depuis Webflow CDN → `public/assets/pages/{slug}/`
5. Ordre de build : **Produit → LP → Équipes → Solution** (simple → complexe)
6. Verification : **Playwright** text diff + screenshots côte-à-côte (local vs airsaas.io live)
7. Preview : **local dev + Vercel preview** (les deux)
8. Pas de Figma search (spec directement depuis observation Webflow)

---

## Phases & statut

| Phase | Titre | Statut | Commits | Notes |
|---|---|---|---|---|
| 0.1 | Create `StepsFrame` | ✅ done | 04117ad | 3-5 steps, dashed connector lg, light/dark |
| 0.2 | Create `RelatedSolutionsFrame` | ✅ done | 04117ad | 3-5 cards image+title+desc+link, cols 3/4/5 |
| 0.3 | Create `ClientsFrame` | ✅ done | 04117ad | 6-12 ClientCards, cols 3/4 |
| 0.4 | Fix `SliderFrame` @limits 5→8 | ✅ done | 04117ad | JSDoc + assertArrayBounds updated |
| 0.5 | Regen `ds-components-reference.md` | ✅ done | 04117ad | Fixed hardcoded path in script, ran `python3 scripts/generate-ds-reference.py` → 34 UI + 24 sections, 0 missing contracts |
| 1 | Capture live content 26 pages | ✅ done | (à commit) | 26 pages captured. Output: `docs/live-captures/{type}/{slug}.{json,md,png}`. Script : `scripts/capture-live-pages.mjs` |
| 2 | Download images 26 pages | ✅ done | (à commit) | 213 images uniques. Output: `public/assets/pages/{type}/{slug}/`. Script : `scripts/download-page-images.mjs` |
| 3.A | Build 6 Produit + verif | ✅ done | (à commit) | 6/6 pages built, DS audit clean, HTTP 200, tsc clean (hors pré-existant) |
| 3.B | Build 4 LP + verif | ⏳ pending | — | — |
| 3.C | Build 4 Équipes + verif | ⏳ pending | — | — |
| 3.D | Build 12 Solution + verif | ⏳ pending | — | — |
| 4 | Preview local + Vercel | ⏳ pending | — | — |
| 5 | Summary global | ⏳ pending | — | — |

Légende : ⏳ pending · 🔄 in progress · ✅ done · ⚠️ blocked · ❌ failed

---

## État par page (26)

### Produit (6)
| Slug | Capture | Images | Build | Verif | Notes |
|---|---|---|---|---|---|
| `capacity-planning` | ✅ | ✅ | ⏳ | ⏳ | — |
| `priorisation-par-equipes` | ✅ | ✅ | ⏳ | ⏳ | — |
| `reporting-projet` | ✅ | ✅ | ⏳ | ⏳ | — |
| `automatiser-la-com-projet` | ✅ | ✅ | ⏳ | ⏳ | — |
| `budget` | ✅ | ✅ | ⏳ | ⏳ | — |
| `traduction-one-click-avec-deepl` | ✅ | ✅ | ⏳ | ⏳ | — |

### Landing Pages (4)
| Slug | Capture | Images | Build | Verif | Notes |
|---|---|---|---|---|---|
| `ppm` | ✅ | ✅ | ⏳ | ⏳ | — |
| `pmo` | ✅ | ✅ | ⏳ | ⏳ | — |
| `capacity-planning` | ✅ | ✅ | ⏳ | ⏳ | 2× how-it-works |
| `pi-planning` | ✅ | ✅ | ⏳ | ⏳ | + comparisons |

### Équipes (4)
| Slug | Capture | Images | Build | Verif | Notes |
|---|---|---|---|---|---|
| `outil-pmo` | ✅ | ✅ | ⏳ | ⏳ | + highlight-zigzag |
| `direction-de-la-transformation` | ✅ | ✅ | ⏳ | ⏳ | DAKI pattern |
| `comite-direction` | ✅ | ✅ | ⏳ | ⏳ | — |
| `it-et-operation` | ✅ | ✅ | ⏳ | ⏳ | + 4 podcasts |

### Solution (12)
| Slug | Sous-type | Capture | Images | Build | Verif | Notes |
|---|---|---|---|---|---|---|
| `management-de-portefeuille-projet` | A | ✅ | ✅ | ⏳ | ⏳ | — |
| `flash-report-projet` | A | ✅ | ✅ | ⏳ | ⏳ | — |
| `flash-report` | A | ✅ | ✅ | ⏳ | ⏳ | — |
| `revue-de-portefeuille` | A | ✅ | ✅ | ⏳ | ⏳ | — |
| `tableau-de-bord-portefeuille-de-projet` | A | ✅ | ✅ | ⏳ | ⏳ | — |
| `portfolio-management` | B | ✅ | ✅ | ⏳ | ⏳ | ClientsFrame 9 |
| `tableau-de-bord-dsi` | C | ✅ | ✅ | ⏳ | ⏳ | long-form |
| `tableau-de-bord-gestion-de-projet` | C | ✅ | ✅ | ⏳ | ⏳ | 5 cards top |
| `gestion-portefeuille-projet` | B | ✅ | ✅ | ⏳ | ⏳ | ClientsFrame + CompareTable |
| `outils-de-pilotage-projet` | B | ✅ | ✅ | ⏳ | ⏳ | long-form |
| `outil-ppm` | B | ✅ | ✅ | ⏳ | ⏳ | 5 cards top |
| `airsaas-et-les-experts-de-la-transfo` | outlier | ✅ | ✅ | ⏳ | ⏳ | 2× Slider 6 imgs |

---

## Journal de session

### 2026-04-23 — Session setup
- Audit réalisé (`docs/ds-coverage-audit.md`, 3 gaps identifiés)
- User valide : 3 gaps DS (pas 2), toutes les 26 pages, FR only, JSON hardcodé, page par page
- Tasks créées (Phase 0.1 → 5)
- Tracker MD créé (ce fichier)

### 2026-04-23 — Phase 1 DONE — Capture live content
- Script `scripts/capture-live-pages.mjs` écrit → chromium Playwright + JSON/MD/PNG par page
- **26/26 captures terminées** ✅
- Output : `docs/live-captures/{type}/{slug}.{json,md,png}`

**Finding important** : 7 Page components DS existent déjà dans `src/components/pages/` (HomePage + 6 pages) :
- `CapacityPlanningPage.tsx` → topTag "Capacity Planning simplifié" → match `/lp/capacity-planning` (PAS `/produit/capacity-planning` !)
- `PmoToolPage.tsx` → "Outil PPM pour PMO moderne" → match `/lp/pmo`
- `OutilsPilotageProjetPage.tsx` → "Outils de pilotage projet" → match `/solution/outils-de-pilotage-projet`
- `PriorisationEquipesPage.tsx` → "Priorisation par équipes" → match `/produit/priorisation-par-equipes`
- `RevuePortefeuillePage.tsx` → "Revue de portefeuille" → match `/solution/revue-de-portefeuille`
- `TraductionOneClickPage.tsx` → "Traduction one-click avec DeepL" → match `/produit/traduction-one-click-avec-deepl`
- **Aucun n'est wired à une route.** Ce sont juste des templates/stories.
- Reste donc 20 pages à build from scratch + 6 pages à valider/updater & wire up.

### 2026-04-23 — Phase 2 DONE — Download images
- Script `scripts/download-page-images.mjs` écrit
- **213 images uniques** téléchargées (26/26 pages, 0 failed)
- Output : `public/assets/pages/{type}/{slug}/`
- Sizes : produit 3.6M, lp 4.9M, equipes 3.5M, solution 12M (total ~24MB)
- Chaque `docs/live-captures/{type}/{slug}.json` contient maintenant `localPath` pour chaque image

### 2026-04-23 — Phase 0 Done (DS extensions) — commit `04117ad`
- `StepsFrame` créé + story : 3-5 steps numérotés + connector dashed lg + dark variant
- `RelatedSolutionsFrame` créé + story : 3-5 cards image+H4+desc+link, cols 3/4/5
- `ClientsFrame` créé + story : 6-12 ClientCards, cols 3/4
- `SliderFrame` @limits 5→8 (fix soft)
- `scripts/generate-ds-reference.py` fixed (hardcoded path → relative)
- `docs/ds-components-reference.md` regen : 34 UI + 24 sections, 0 missing
- `node scripts/ds-audit.mjs` → ✅ clean
- 5 DS violations fixed (inline fontSize + arbitrary leading) → refactor vers `<Heading>` / `<Text>` primitives dans StepsFrame + RelatedSolutionsFrame
- Husky pre-commit hook ✅ passé

---

## Comment reprendre si la session plante

1. **Lire ce fichier** (`docs/pages-rebuild-tracker.md`) intégralement
2. Lire `docs/ds-coverage-audit.md` (contexte + specs gaps)
3. Lire `docs/ds-rules.md` (process extension DS strict)
4. `TaskList` pour voir où on en est
5. Dernier commit dans la branche `lp-rebuild` → reprendre après
6. Pour chaque page "en cours" dans le tableau ci-dessus → regarder `src/app/{type}/{slug}/page.tsx` et `content.fr.json`
7. Reprendre la phase en cours

## Commandes clés

```bash
# Dev local
pnpm dev  # localhost:3000

# Regen DS reference
python3 scripts/generate-ds-reference.py

# Playwright tests (quand scripts existeront)
node scripts/capture-pages-content.ts
node scripts/verify-page.ts {slug}
```

## Références projet

- `docs/ds-rules.md` — règles DS strictes
- `docs/ds-components-reference.md` — inventaire DS (47 composants)
- `docs/ds-coverage-audit.md` — audit coverage 26 pages
- `docs/pages-inventory.md` — liste toutes pages du site
- `docs/sections-catalog.md` — sections existantes
- `docs/decisions.md` — décisions projet
- `src/components/library-design/` — DS strict (SEULS composants autorisés pour ces 26 pages)
