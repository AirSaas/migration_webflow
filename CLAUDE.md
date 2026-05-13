# CLAUDE.md — Migration AirSaaS : Webflow → Next.js 15 + Strapi 5

## Projet

Migration du site airsaas.io de Webflow vers Next.js 15 (App Router) + Strapi 5.
Spec complète : `.context/attachments/SPEC_Migration_v4.0_FINAL.md`

- **Méthode** : itérative, page par page, composant par composant
- **Objectif** : site pixel-close du site actuel airsaas.io
- **Stack** : Next.js 15, Tailwind, Strapi 5, next-intl (7 locales)
- **Webflow Site ID** : `609552290d93fd43ba0f0849`

## Blog v8 — Multi-agent migration pipeline

Migration des 62 articles de blog via pipeline **Claude Agent SDK** à 8 nœuds (3 LLM + 5 déterministes) pour atteindre 100% nickel sans halluciner. Plan détaillé : `tasks/todo.md`.

### Source de vérité
- **Contenu** (texte, blocs, ordre) : Webflow live HTML scrappé dans Supabase `airsaas_pages_rebuild`
- **Toggles CMS** (FAQ hidden, newsletter, custom CTA per article) : Webflow API v2 (`WEBFLOW_API_TOKEN` dans `.env.local`)
- **Design** (variants DS, couleurs, layout) : Figma template `303:1015` (générique pour les 62 articles)
- **Acceptance** : `docs/blog-design-rules.yaml` (édité par Claude depuis les instructions chat user/Marianela)

### Blog rules edit workflow

**RÈGLE** : `docs/blog-design-rules.yaml` est **édité par Claude uniquement**, jamais directement par Marianela.

Flow :
1. User/Marianela décrit une nouvelle règle ou un ajustement **en chat** (libre, FR/ES/EN)
2. Claude **traduit en YAML** et édite `docs/blog-design-rules.yaml`
3. Claude résume le diff au user pour validation orale
4. Si valide → Claude re-run la pipeline sur l'article impacté

Exemple :
- Marianela en chat : "Le sommaire doit être une carte centrée avec puces circles bleues, pas une sidebar"
- Claude édite : ajoute règle `id: toc-centered-card` avec assertions DOM + autofix `layout: centeredToc`

### Pipeline 8-agents (résumé)
```
1. Content Extractor (Sonnet) — Webflow HTML → blocs Zod stricts
2. CMS Toggles Reader — Webflow API → showFaq/showNewsletter/showCta
3. Content Validator — déterministe, regex hints cross-check
4. Design Mapper (Sonnet) — blocs + rules YAML + DS Registry → RenderingSpec V3
5. DS Conformance Validator — déterministe, Zod + ds-audit → STOP si gap
6. Renderer — écrit V3 data + render Next.js
7. Visual Auditor (Opus vision) — screenshot vs Figma vs checklist YAML
8. Decision Router — PASS / retry (max 5) / escalate
```

### Commandes
```
npm run blog:registry          # Génère docs/raw/ds-registry.json
npm run blog:audit-ds-gaps     # Pré-flight Figma vs DS
npm run blog:migrate           # Migration 62 articles
npm run blog:migrate -- --slugs=metier-pmo,pi-planning  # Subset
```

### Budgets
- Cost cap : `LLM_COST_CAP_USD=100` (hard stop)
- Retries : 5 max par article avant escalation
- Sequential : 1 article à la fois (pas de parallélisme)

### Escalations
- DS gap → `docs/blog-migration/<slug>/needs-ds-extension.md` (stop sur l'article, pipeline continue)
- 5 retries atteints → `docs/blog-migration/<slug>/needs-review.md` (screenshots diff + propositions)

---

## Page rebuild QA — process obligatoire

**RÈGLE ABSOLUE** : NE JAMAIS soumettre une URL/preview au user sans avoir validé les **3 niveaux de QA** ci-dessous. Le verifier `verify-rebuild.mjs` (text coverage) **ne suffit PAS**.

### Process en 4 étapes (bloquant avant handoff)

1. **Regex/DOM check** : `node scripts/qa-page.mjs`
   - Doit retourner **0 P0** sur toutes les pages
   - P1 médiane ≤ 3 par page
2. **LLM check** : `node scripts/qa-llm.mjs`
   - Envoie chaque page à Claude Sonnet pour détection sémantique
   - Doit retourner **0 LLM_P0**
   - LLM_P1 médiane ≤ 2
3. **Visual sample** : `node scripts/visual-sample-v2.mjs` (si > 5 pages modifiées)
   - 10 paires screenshots live + rebuild dans `docs/visual-comparison/`
4. **Combined check** : `docs/qa-combined-report.md` — ≥ 85% pages status `pass`

### Patterns connus à check systématiquement

Liste exhaustive dans [`docs/qa-checklist.md`](./docs/qa-checklist.md). Patterns critiques :

- **HTML literal dans le rendu** (`<br/>`, `<strong>`, entités HTML) → strip dans le parser AVANT data file
- **Hrefs vides/placeholders** (`href=""`, `href="#"`) sur CTAs et cards → fallback vers route réelle
- **Heading sizes inadaptés au contexte** : H2 marketing (32-72px) trop gros en body article → downshift level=3 (24-40px)
- **Hero title fallback "AirSaas"** placeholder → toujours utiliser le vrai titre source
- **Images placehold.co** quand un vrai asset existe → fallback layout sans image plutôt que placeholder
- **Sections vides** (heading sans body) → skip ou enrichir
- **Duplicate content** (testimonial/logo répété) → dedup via Set
- **Author placeholder** ("AirSaas") au lieu du vrai → extraire `.author__photo` + `.author__text` pairs
- **Selector exact-match en CSS** : `.author` ne match PAS `.author__photo` (utiliser `.author__photo` direct)
- **DS Heading max level=4** : downshift les H5/H6 source vers H4

### Procédure si nouveau bug détecté par user

Quand le user signale un bug que regex+LLM n'ont pas détecté :

1. Ajouter le check à `qa-page.mjs` (regex) si automatisable
2. Sinon enrichir le prompt `qa-llm.mjs` (cas sémantique)
3. Ajouter le pattern à `docs/qa-checklist.md`
4. Re-run la suite pour valider que ça catch maintenant
5. Le pattern devient permanent (régression test)

### Coût LLM check

Sonnet 4.6 sur 88 pages ≈ ~$4-5 par run complet. Avec prompt caching (cache_control sur le system prompt), ça descend à ~$2 sur les runs suivants.

---

## DS Strict Mode

**AVANT** de modifier ou créer un composant / une page : **LIRE [docs/ds-rules.md](docs/ds-rules.md)** (5 golden rules, decision tree, forbidden patterns, extension process) + **[docs/ds-components-reference.md](docs/ds-components-reference.md)** (inventaire complet des 47 composants DS avec leurs règles `@purpose/@useWhen/@dontUse/@limits/@forbidden`). Regénérer la référence après toute modification de contract via `python3 scripts/generate-ds-reference.py`.

Règles absolues :
- **Product Sans only** — pas d'autre font family, pas de Google Fonts
- **Zéro hex / rgba hardcoded** — tous les couleurs passent par les tokens (palette alignée Figma)
- **Zéro Tailwind palette par défaut** — pas de `bg-gray-*`, `text-slate-*`, etc.
- **Zéro arbitrary Tailwind value** — pas de `bg-[#...]`, `text-[14px]`, etc.
- **Zéro `<h1-h6>` / `<p>` typo brut** — toujours `<Heading>` / `<Text>` / `<SectionHeading>`
- **Zéro cercle concentrique décoratif** — ni dans les images (cropper avec `scripts/crop-illustrations.py`), ni en DOM
- **Pas de style={{}} pour des valeurs tokenisées** — spacing, colors, shadows, radius, typo → classes Tailwind ou CSS vars uniquement

Si le DS ne couvre pas un besoin : **suivre le "Extension process" de docs/ds-rules.md** (propose → approve → implement in DS with contract + story). Ne jamais contourner.

## Règles projet

- Toujours lire `docs/design-system.md` et `docs/sections-catalog.md` AVANT de coder un composant.
- Quand tu crées un nouveau composant section → mettre à jour `docs/sections-catalog.md` immédiatement.
- Quand tu prends une décision → noter dans `docs/decisions.md`.
- Screenshot Playwright par section = spec visuelle du composant. On reproduit le rendu visuel, pas la structure DOM Webflow.
- Tout contenu visible sur une page → fetch Strapi (Dynamic Zone ou Collection Type).
- Micro-textes du layout (boutons, labels, navigation) → next-intl (fichiers JSON).
- Navbar + Footer → next-intl (pas Strapi). Exception assumée.
- Pas de `if locale === 'en'` dans le code — les blocs Dynamic Zone sont rendus dynamiquement par locale.
- Pas de Strapi MCP — Claude Code gère via REST API Strapi directement.
- 8 content-types traduits EN, 6 FR-only. Toujours consulter la matrice i18n de la spec avant chaque page.

## Architecture

```
airsaas-next/
├── docs/                  ← Design system, sections catalog, decisions, schemas
├── scripts/               ← Playwright screenshots, asset download, content migration
├── src/
│   ├── app/               ← Routes Next.js 15 (App Router)
│   ├── components/
│   │   ├── layout/        ← Navbar, Footer, CookieBanner
│   │   ├── sections/      ← Sections réutilisables
│   │   ├── ui/            ← Boutons, badges, cards
│   │   └── cms/           ← Composants liés au contenu Strapi
│   ├── lib/
│   │   ├── strapi.ts      ← Client Strapi (fetch, types)
│   │   ├── fonts.ts       ← Config next/font
│   │   └── metadata.ts    ← Helpers SEO
│   └── styles/globals.css ← Tailwind + custom CSS
├── public/assets/         ← Images/illustrations depuis Webflow
├── strapi/content-types/  ← Schémas Strapi (JSON)
└── messages/              ← Fichiers i18n next-intl (fr.json, en.json, etc.)
```

## Steps d'exécution

0. Bootstrap + design system + fonts + audit navbar/footer + download assets
1. Homepage (screenshots → sections → composants → assemblage)
2. Pages Solution (12 pages, template commun)
3. Pages Produit (6) + Équipes (4) + Compare (3)
4. Landing pages /lp (4)
5. Templates CMS + Strapi (14 content-types) + migration contenu
6. Pages événementielles (CEO Dinner + Bootcamp)
7. Pages utilitaires
8. Redirections 301 (~1 730 URLs)
9. SEO, i18n, finitions

## Webflow MCP — référence rapide

```
Pages :     data_pages_tool > list_pages(site_id=SITE_ID, limit=100, offset=0)
Collections : data_cms_tool > get_collection_details(collection_id=ID)
Items :     data_cms_tool > list_collection_items(collection_id=ID, request={ limit: 100, offset: 0 })
Composants : data_components_tool > list_components(site_id=SITE_ID)
Assets :    asset_tool > get_all_assets_and_folders(query='all')
Variables : variable_tool > get_variable_collections(query='all')
Styles :    style_tool > get_styles(query='all')
```

Si le MCP échoue : attendre 2s, retenter (max 3x), noter l'erreur dans `docs/decisions.md`.

---

## Bonnes pratiques de travail

### Planning

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions).
- If something goes sideways, STOP and re-plan immediately — don't keep pushing.
- Use plan mode for verification steps, not just building.
- Write detailed specs upfront to reduce ambiguity.

### Subagents

- Use subagents liberally to keep main context window clean.
- Offload research, exploration, and parallel analysis to subagents.
- For complex problems, throw more compute at it via subagents.
- One task per subagent for focused execution.

### Self-Improvement

- After ANY correction from the user: update `tasks/lessons.md` with the pattern.
- Write rules for yourself that prevent the same mistake.
- Ruthlessly iterate on these lessons until mistake rate drops.
- Review `tasks/lessons.md` at session start for relevant project context.

### Verification

- Never mark a task complete without proving it works.
- Diff behavior between main and your changes when relevant.
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness.

### Playwright Visual QA

- When testing the design system page with Playwright, **always visually inspect screenshots** — don't just check that images load (naturalWidth > 0).
- Verify: image proportions correct, no overflow, no cropping, image fits its container, section height is reasonable.
- Wait for lazy-loaded images: scroll to section first, then `wait_for(time=3)`, then screenshot.
- Take element-level screenshots (not just viewport) and examine the result image before declaring success.

### Elegance

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution."
- Skip this for simple, obvious fixes — don't over-engineer.

### Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding.
- Point at logs, errors, failing tests — then resolve them.
- Zero context switching required from the user.

### Task Management

1. **Plan**: Write plan to `tasks/todo.md` with checkable items.
2. **Verify plan**: Check in before starting implementation.
3. **Track progress**: Mark items complete as you go.
4. **Explain changes**: High-level summary at each step.
5. **Document results**: Add review section to `tasks/todo.md`.
6. **Capture lessons**: Update `tasks/lessons.md` after corrections.

### Core Principles

- **Simplicity first**: Make every change as simple as possible. Minimal code impact.
- **No laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal impact**: Changes should only touch what's necessary. Avoid introducing bugs.
