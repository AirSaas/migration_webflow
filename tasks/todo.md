# Blog Migration v8 — Multi-Agent Pipeline for 100% Nickel

## Context

Marianela a audité le blog rebuild (v6/v7) et identifié 9 défauts de fidélité Figma (résumés dans `.context/attachments/AUDIT BLOG REBUILD vs FIGMA 2.docx`). La pipeline actuelle (`parse-blog-llm` → `audit-structural` → `scan-data` → `qa-page`) attrape les bugs d'extraction mais **rate les bugs visuels et de variants DS** — cause racine : le renderer hardcode les variants au lieu de les recevoir explicitement dans la data.

On reconstruit la pipeline en **multi-agent (Claude Agent SDK)** avec validations croisées pour atteindre 100% nickel sans halluciner sur chaque article. Migration **one-shot** des 62 articles. Après cette phase, le système sera adapté pour Strapi.

## Goal

Migration des 62 articles de blog vers une représentation **V3** qui porte explicitement les choix de rendu (variants, layout, toggles, custom CTA), validée à 100% contre les règles Figma 303:1015 + audit Marianela, avec **zéro régression P0/P1** et **escalation propre** des cas non-fixables.

## Architecture résumée

**8 nœuds chaînés** (3 LLM, 5 déterministes) :

```
[1. Content Extractor]   (Sonnet, Webflow HTML Supabase)
[2. CMS Toggles Reader]  (Webflow API, déterministe)
[3. Content Validator]   (déterministe + structural hints)
[4. Design Mapper]       (Sonnet + blog-design-rules.yaml + DS Registry)
[5. DS Conformance Validator] (déterministe + Zod + ds-audit)
[6. Renderer]            (déterministe, écrit V3 + render Next.js)
[7. Visual Auditor]      (Opus vision + Playwright + checklist YAML)
[8. Decision Router]     (déterministe : PASS / retry (max 5) / escalate)
```

Per-article loop, séquentiel (1 article à la fois), **5 retries max**, **cost cap $100**, escalation report sinon.

---

## Phase 0 — Setup foundation (~2h)

- [ ] **0.1** Sauvegarder le Webflow API token dans `.env.local` sous `WEBFLOW_API_TOKEN=...`
- [ ] **0.2** Documenter le workflow dans `CLAUDE.md` :
  - Section "Blog rules edit workflow" : règles design = chat user/Marianela → Claude édite `docs/blog-design-rules.yaml`
  - Section "Blog migration v8" : pipeline multi-agent, où trouver quoi
- [ ] **0.3** Documenter même chose dans `README.md` (section publique)
- [ ] **0.4** Créer `scripts/migrate/generate-ds-registry.ts` :
  - Parse `docs/ds-components-reference.md` (existant)
  - Sort `docs/raw/ds-registry.json` machine-readable :
    ```json
    { "Quote": { "variants": ["pull", "card"], "props": { "align": ["left","center"], "author": "string?" } } }
    ```
- [ ] **0.5** Créer `src/types/blog-v3.ts` avec Zod schemas :
  - `BlogArticleV3` (slug, meta, blocks, layout, toggles, customCta)
  - `BlockV3` (chaque type avec ses variants explicites — quote/heading/figure/table/etc.)
  - `RenderingSpec` (alias for BlogArticleV3 used dans la pipeline)
- [ ] **0.6** Créer `docs/blog-design-rules.yaml` V0 — 15-20 règles initiales extraites de :
  - Figma 303:1015 (sections, variants observés)
  - Audit Marianela (les 9 points)
  - Examples de règles :
    ```yaml
    - id: quote-variant-card
      description: "Every quote renders as <Quote variant='card'>"
      severity: P0
      check: { type: dom, selector: 'figure[data-block="quote"]', assert: { hasClass: bg-white } }
      autofix: { target: spec.blocks, where: 'type=quote', set: { variant: card } }
    
    - id: h3-source-gradient-primary
      severity: P0
      ...
    ```
- [ ] **0.7** **Envoyer V0 du YAML à Marianela** via user → review → ajustements en chat → Claude édite

## Phase 1 — Pre-flight DS gap audit (iterative, ~1-3h)

- [ ] **1.1** Créer `scripts/migrate/audit-ds-gaps.ts` :
  - Lit Figma 303:1015 via Figma MCP (`get_design_context`)
  - Liste tous les **component instances** + **variants** + **props** utilisés
  - Lit `docs/raw/ds-registry.json`
  - Diff : composants/variants Figma absents du DS
  - Sort `docs/ds-gaps-blog-migration.md` avec specs d'extension (composant cible, variant à ajouter, props nouvelles)
- [ ] **1.2** **Loop d'extension itératif** :
  - Run audit
  - Pour chaque gap : Claude propose extension DS (modif composant + story)
  - User review + merge
  - Re-run audit
  - Répète jusqu'à **0 gaps**
- [ ] **1.3** Liste prévisible des gaps détectés (anticipation) :
  - `TableOfContentsFrame` (composant centered card pour TOC)
  - `Heading.gradient="primary"` activable sur level=3
  - `Quote.variant="card"` (peut-être existe déjà — à vérifier)
  - `IllustrationFrame.widthMode="breakout"` (casse `max-w-50rem`)
  - `TableFrame` — fix `tailwind-merge` qui drop `text-white` (configurer `text-paragraph` comme font-size)

## Phase 2 — Build the pipeline (~1 jour)

- [ ] **2.1** Installer Claude Agent SDK : `npm install @anthropic-ai/claude-agent-sdk`
- [ ] **2.2** Structurer `scripts/migrate/blog-pipeline/` :
  ```
  scripts/migrate/blog-pipeline/
    index.ts              # CLI entry: npm run blog:migrate
    schemas.ts            # Zod schemas partagés
    config.ts             # Budgets, retries, paths
    acceptance-rules.ts   # Loader + runner des règles YAML
    state.ts              # Per-article state machine
    agents/
      content-extractor.ts
      cms-toggles-reader.ts
      content-validator.ts
      design-mapper.ts
      ds-conformance-validator.ts
      renderer.ts
      visual-auditor.ts
      decision-router.ts
  ```
- [ ] **2.3** Implémenter chaque agent (en détail) :
  - **content-extractor** : adapté de `parse-blog-llm.mjs`, Sonnet, Zod strict
  - **cms-toggles-reader** : fetch Webflow API v2 (`/sites/{site_id}/collections/{collection_id}/items/{item_id}`), extrait `show_faq`, `show_newsletter`, `show_cta`, `custom_cta`
  - **content-validator** : déterministe — bloc émis sans preuve dans HTML source → reject
  - **design-mapper** : Sonnet, reçoit (blocks, design-rules.yaml, ds-registry.json), produit RenderingSpec V3 avec variants explicites
  - **ds-conformance-validator** : déterministe — pour chaque bloc, valide via Zod (DS Registry) + assertions DS (maxLength, etc.). Si gap → STOP + report `docs/blog-migration/<slug>/needs-ds-extension.md`
  - **renderer** : déterministe — patch `src/data/blog-articles-v3.ts` (partiel pour cet article), trigger Next.js dev server reload, attend 2s, capture screenshot Playwright `/fr/blog/<slug>`
  - **visual-auditor** : Opus vision — pour chaque règle YAML :
    - règle `type=dom` → DOM check
    - règle `type=visual` → Opus vision sur crop du screenshot
    - sort `AuditVerdict { rules: [{id, status, severity, evidence, fix?}] }`
  - **decision-router** : déterministe — All PASS (P0=0, P1=0) → SUCCESS, commit data block. Some FAIL fixable → retry [4] avec feedback (max 5). 5 atteint → ESCALATION
- [ ] **2.4** Implémenter le **state machine** : `runArticle(slug)` → boucle 1→8 avec retries, logging, cost tracking
- [ ] **2.5** Implémenter la **CLI** :
  ```
  npm run blog:audit-ds-gaps              # Phase 1 audit
  npm run blog:registry                   # Generate ds-registry.json
  npm run blog:migrate                    # Run all 62
  npm run blog:migrate -- --slugs=a,b,c   # Subset
  npm run blog:migrate -- --dry-run       # No file writes
  ```
- [ ] **2.6** Implémenter **logging structuré** par article :
  - `docs/blog-migration/<slug>/run-<timestamp>.log` (verbose)
  - `docs/blog-migration/<slug>/result.json` (machine-readable)
  - `docs/blog-migration/_summary.md` (toutes les articles, status + cost + retries)

## Phase 3 — Pilot 5 articles (~0.5 jour)

- [ ] **3.1** Lancer pipeline sur **5 articles test** :
  - `metier-pmo` (long, 9 quotes + 1 table, sticky-TOC, doublure du Figma 303:1015)
  - `pi-planning` (long sans auteur, test fallback AirSaas icon)
  - `kanban-gestion-de-projet` (court, 6 H2, pas de quote/table — cas minimal)
  - `gestion-portefeuille-projets-vs-gestion-de-projet` (4 tables + 3 alert-callouts)
  - `comite-pilotage-projet` (figure caption HTML + 1 quote + TOC moyen)
- [ ] **3.2** **Marianela review** : screenshots des 5 vs Figma vs Webflow live
- [ ] **3.3** Itérer :
  - Ajuster `blog-design-rules.yaml` (chat user → Claude)
  - Ajouter DS extensions découvertes
  - Re-run pipeline
  - Re-review
- [ ] **3.4** **Critère sortie phase 3** : 5/5 PASS avec Marianela ✓

## Phase 4 — Full rollout 57 articles (~1 nuit ou 1 journée)

- [ ] **4.1** Ranker les 57 restants par **complexité ascendante** (nombre de blocs + types de blocs uniques)
- [ ] **4.2** Lancer `npm run blog:migrate` (séquentiel, 1 article à la fois)
- [ ] **4.3** Surveillance temps réel :
  - Budget cumulé ($100 cap)
  - Articles PASS / ESCALATION
  - Erreurs API (rate limit Webflow, Opus throttling)
- [ ] **4.4** Pour chaque escalation → review humain, fix manuel ou ajustement YAML/DS, re-run pour cet article uniquement (`--slugs=...`)

## Phase 5 — Commit + deploy (~30 min)

- [ ] **5.1** Migrer `BlogPostPage.tsx` pour consommer **V3** (passive renderer, lit `block.variant` au lieu de hardcoder)
- [ ] **5.2** Migrer `src/app/[locale]/blog/[slug]/page.tsx` + `articles/page.tsx` pour utiliser `BLOG_ARTICLES_V3`
- [ ] **5.3** Implémenter `renderBlogBlocksV3.tsx` (remplace `renderBlogBlocks.tsx`)
- [ ] **5.4** Supprimer fichiers legacy :
  - `src/data/blog-articles-v2.ts`
  - `src/components/blog/renderBlogBlocks.tsx`
- [ ] **5.5** TS check + lint clean
- [ ] **5.6** **Un seul commit** sur `pivot-figma-blog-v5` (ou nouvelle branche `blog-v8` à décider)
- [ ] **5.7** Push → Vercel auto-deploy
- [ ] **5.8** **Final review Marianela** sur preview Vercel

---

## Files

### New files (~25 nouveaux)
- `scripts/migrate/blog-pipeline/index.ts`
- `scripts/migrate/blog-pipeline/schemas.ts`
- `scripts/migrate/blog-pipeline/config.ts`
- `scripts/migrate/blog-pipeline/acceptance-rules.ts`
- `scripts/migrate/blog-pipeline/state.ts`
- `scripts/migrate/blog-pipeline/agents/*.ts` (8 agents)
- `scripts/migrate/audit-ds-gaps.ts`
- `scripts/migrate/generate-ds-registry.ts`
- `docs/blog-design-rules.yaml`
- `docs/raw/ds-registry.json`
- `docs/ds-gaps-blog-migration.md`
- `docs/blog-migration/<slug>/*.md` (62 dossiers)
- `docs/blog-migration/_summary.md`
- `src/types/blog-v3.ts`
- `src/components/blog/renderBlogBlocksV3.tsx`
- `src/data/blog-articles-v3.ts`

### Modified files
- `CLAUDE.md` — workflow YAML edit + pipeline v8
- `README.md` — same
- `src/components/pages/BlogPostPage.tsx` — consume V3
- `src/app/[locale]/blog/[slug]/page.tsx` + `articles/page.tsx`
- `package.json` — scripts CLI
- `.env.local` — Webflow token (gitignored)

### Deleted files (after V3 stable)
- `src/data/blog-articles-v2.ts`
- `src/data/blog-articles.ts` (older)
- `src/components/blog/renderBlogBlocks.tsx` (V2 renderer)

---

## Risk register

| Risque | Impact | Mitigation |
|---|---|---|
| YAML rules incomplete au démarrage | Articles fail audit silently | Marianela review V0 avant pilot ; itération phase 3 |
| Webflow API rate limit (60 req/min) | Pipeline stalls | Throttle + cache local |
| Opus latency (3-5 min/article) | 62 × 5 min = 5h | Acceptable, sequential = prédictible. Background job overnight |
| Vision model misjudge → false FAIL loop | Article stuck en retry | Max 5 retries → escalation. Manual escape via `--force-pass` flag |
| DS extensions cascadent | Lost time | Pre-flight audit absorbe (phase 1) |
| Webflow token leak | Security | .env.local (gitignored), rotation après migration |
| Hallucinations sémantiques | Bad content silently committed | Cross-validation agent 1 ↔ agent 3 (regex hints), Zod strict partout |
| Coût explose au-delà $100 | Budget impact | Cost cap automatique, alerts à $50/$75/$100 |

---

## Verification

| Phase | Verification |
|---|---|
| 0 | `node scripts/migrate/generate-ds-registry.ts` produit JSON valide ; `docs/blog-design-rules.yaml` V0 review par Marianela |
| 1 | `audit-ds-gaps.ts` reports 0 gaps |
| 2 | TS clean, `npm run blog:migrate -- --dry-run --slugs=metier-pmo` ne crash pas |
| 3 (pilot) | 5/5 articles PASS checklist YAML, Marianela ✓ sur screenshots |
| 4 (rollout) | 62/62 articles soit PASS soit `needs-review.md` ; cost ≤ $100 |
| 5 | Vercel preview tous les 62 articles rendus correctement, `qa-page.mjs` 0 P0/P1, Marianela final ✓ |

---

## Out of scope

- Storybook stories update (deferred to separate sprint)
- Landings refactor (Marianela en a fait l'audit séparé pour PMO ; même pattern réutilisable plus tard)
- Strapi integration (refactor source plugin quand on switche)
- Performance optimizations (Vercel build size, etc.)
- SEO meta improvements au-delà de ce qui est dans Webflow source

---

## Réviser ce plan ?

Ce plan capture toutes les décisions verrouillées en discussion (5 retries, DS extension = stop+report, Claude Agent SDK, 1 article à la fois, 1 commit final, dry-run 5 articles, cost cap $100, P0=0 P1=0 P2=warnings OK, Webflow token reçu, YAML édité par Claude depuis chat, V3 remplace V2, pré-flight DS audit).

**Avant que je commence l'implémentation, valide ce plan ou demande des ajustements.**
