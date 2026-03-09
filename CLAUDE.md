# CLAUDE.md — Migration AirSaaS : Webflow → Next.js 15 + Strapi 5

## Projet

Migration du site airsaas.io de Webflow vers Next.js 15 (App Router) + Strapi 5.
Spec complète : `.context/attachments/SPEC_Migration_v4.0_FINAL.md`

- **Méthode** : itérative, page par page, composant par composant
- **Objectif** : site pixel-close du site actuel airsaas.io
- **Stack** : Next.js 15, Tailwind, Strapi 5, next-intl (7 locales)
- **Webflow Site ID** : `609552290d93fd43ba0f0849`

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
