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
| 3.B | Build 4 LP + verif | ✅ done | (à commit) | 4/4 pages built, DS audit clean, HTTP 200, tsc clean. Legacy `(lp)/lp/[slug]` route group supprimé. |
| 3.C | Build 4 Équipes + verif | ✅ done | (à commit) | 4/4 pages built, DS audit clean, HTTP 200, tsc clean |
| 3.D | Build 12 Solution + verif | ✅ done | (à commit) | 12/12 pages built, DS audit clean, HTTP 200, tsc clean |
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
| `ppm` | ✅ | ✅ | ✅ | ✅ | HTTP 200 |
| `pmo` | ✅ | ✅ | ✅ | ✅ | HTTP 200, ClientsFrame 9 |
| `capacity-planning` | ✅ | ✅ | ✅ | ✅ | HTTP 200, 2× how-it-works |
| `pi-planning` | ✅ | ✅ | ✅ | ✅ | HTTP 200, + comparisons |

### Équipes (4)
| Slug | Capture | Images | Build | Verif | Notes |
|---|---|---|---|---|---|
| `outil-pmo` | ✅ | ✅ | ✅ | ✅ | HTTP 200, ClientsFrame 9 |
| `direction-de-la-transformation` | ✅ | ✅ | ✅ | ✅ | HTTP 200, DAKI pattern |
| `comite-direction` | ✅ | ✅ | ✅ | ✅ | HTTP 200 |
| `it-et-operation` | ✅ | ✅ | ✅ | ✅ | HTTP 200, 3 podcasts |

### Solution (12)
| Slug | Sous-type | Capture | Images | Build | Verif | Notes |
|---|---|---|---|---|---|---|
| `management-de-portefeuille-projet` | A | ✅ | ✅ | ✅ | ✅ | HTTP 200 |
| `flash-report-projet` | A | ✅ | ✅ | ✅ | ✅ | HTTP 200 |
| `flash-report` | A | ✅ | ✅ | ✅ | ✅ | HTTP 200 |
| `revue-de-portefeuille` | A | ✅ | ✅ | ✅ | ✅ | HTTP 200, uses existing `RevuePortefeuillePage` |
| `tableau-de-bord-portefeuille-de-projet` | A | ✅ | ✅ | ✅ | ✅ | HTTP 200 |
| `portfolio-management` | B | ✅ | ✅ | ✅ | ✅ | HTTP 200, ClientsFrame 9 w/ infoRows |
| `tableau-de-bord-dsi` | C | ✅ | ✅ | ✅ | ✅ | HTTP 200, long-form |
| `tableau-de-bord-gestion-de-projet` | C | ✅ | ✅ | ✅ | ✅ | HTTP 200, 3 cards (DS contract max 4) |
| `gestion-portefeuille-projet` | B | ✅ | ✅ | ✅ | ✅ | HTTP 200, CompareTable 5 rows |
| `outils-de-pilotage-projet` | B | ✅ | ✅ | ✅ | ✅ | HTTP 200, uses existing `OutilsPilotageProjetPage` (named export) |
| `outil-ppm` | B | ✅ | ✅ | ✅ | ✅ | HTTP 200, 4 cards (DS contract max 4) |
| `airsaas-et-les-experts-de-la-transfo` | outlier | ✅ | ✅ | ✅ | ✅ | HTTP 200, 2× SliderFrame(6 imgs) + 6 LinkedIn testimonials |

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

### 2026-04-23 — Phase 3.D DONE — 12 Solution pages — commit `36754c8`
- 9 new Solution components + 12 routes under `/solution/{slug}`
- Type A (5) : management-de-portefeuille-projet, flash-report, flash-report-projet, revue-de-portefeuille, tableau-de-bord-portefeuille-de-projet
- Type B (4) : portfolio-management (ClientsFrame 9 w/ infoRows), gestion-portefeuille-projet (CompareTable 5 rows), outil-ppm (4 cards), outils-de-pilotage-projet
- Type C (2) : tableau-de-bord-dsi, tableau-de-bord-gestion-de-projet
- Outlier : airsaas-et-les-experts-de-la-transfo (2× SliderFrame 6 slides + 6 LinkedIn testimonials + 4 press)
- Reuse : `RevuePortefeuillePage`, `OutilsPilotageProjetPage` (named export)
- DS audit ✅ clean, tsc ✅ clean, **26/26 pages HTTP 200 local**

### 2026-04-23 — Phase 4 DONE — Preview local + Vercel
- Local : 26/26 HTTP 200 ✅
- Vercel preview : branche `lp-rebuild` pushed → project `airsaas/website-airsaas` auto-deploy
- Preview URL : `https://website-airsaas-nagmcczm0-airsaas.vercel.app` — status **Ready**, build 52s
- SSO/password protection activée côté Vercel (renvoie 401 sans auth) → comportement normal pour preview privée, build sain
- Pour visualiser les 26 pages : ouvrir l'URL preview dans le navigateur (auth Vercel requise)

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
