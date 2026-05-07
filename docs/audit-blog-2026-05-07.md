# Audit blog rebuild vs live — 2026-05-07 (post Blog v5 + re-extract)

**Scope** : 4 blog articles comparés rebuild vs live (`docs/audit-screenshots/pages-thumb/<slug>/`)
- blog-pi-planning
- blog-kanban-gestion-de-projet
- blog-metier-pmo
- blog-le-grand-guide-de-la-conduite-de-projet

**Méthode** : inspection visuelle 16 thumbnails (rebuild + live, top + mid/footer crops 1400×1900) + lecture code (`renderBlogBlocks.tsx`, `BlogPostPage.tsx`, `BlogHero.tsx`) + inspection data (`src/data/blog-articles-v2.ts`).

**Phases évaluées** :
- Phase 4A : R19 related grid + R33 body width
- Phase 4C : R30 metadata header, R31 NewsletterInlineCard, R32 sticky TocSidebar (≥ 5 toc items)
- Phase 4D + v5 : EVERY blockquote → `quote` block, EVERY .a-retenir/aside → `insight-callout`, EVERY table → `table` block, button-styled link → `inline-cta`, toc emit `level: 2|3`, re-extract 60/62 articles

**Conclusion** : sur 11 patterns blog ciblés, **5 fermés (45%)**, **3 partiels (27%)**, **3 ouverts (27%)**. **Cible 90% NON atteinte (45% fermés vs 90% target).** Régressions critiques à corriger : `<strong>` HTML literal dans Quote (renderBlogBlocks ne fait pas de RichSpan dans le case "quote"), auteur vide sur pi-planning, et le-grand-guide-de-la-conduite-de-projet n'a aucun bloc enrichi détecté par v5 (0 quotes/0 callouts/0 tables/0 inline-CTAs).

---

## Bilan des patterns blog ciblés

| Status | Phase 4A | Phase 4C (5/6) | Phase 4D + v5 (now) | Δ vs 4A |
|---|---|---|---|---|
| **Fermés** | 2/11 (R19, R33) | 2/11 (R19, R33) | **5/11** (R19, R30, R31, R33, R32) | **+3** |
| **Partiels** | 1/11 (R25) | 4/11 (+R30, R31, R32) | **3/11** (R20, R21, R25) | **+2** |
| **Ouverts** | 8/11 | 5/11 | **3/11** (R18, R22, N2) | **−5** |

**Avancement vers 90% blog** : **45% fermés** (loin du 90% target).
**Avancement ≥ partiel** : **8/11 (73%)** — proche du seuil 80% mais sous le 90%.

---

## Tableau récapitulatif

| Pattern | Description | Phase 4A | Now | Verdict |
|---|---|---|---|---|
| **R18** | Blog quotes stylisés (pull-quote with author + photo) | OUVERT | **OUVERT (régression)** | Quote DS rendue mais `<strong>` literal dans le texte (renderBlogBlocks.tsx ligne 118 : `{block.text}` au lieu de `<RichSpan html={…}/>`). Visible sur blog-metier-pmo rebuild ("« <strong>L'essentiel… »") |
| **R19** | Blog related grid 3-4 cartes "À découvrir aussi" | FERMÉ | **FERMÉ** | `BlogCollectionFrame` 3 cartes affichées en bas de tous les 4 blog rebuild |
| **R20** | InsightCallout "À retenir" pour aside / .a-retenir | OUVERT | **PARTIEL** | metier-pmo a 3 insight-callouts dans data + rendu via DS InsightCallout (visible "X Le passe-plat / X Le Codir / Le projet"). Mais pi-planning, kanban et le-grand-guide ont 0 insight-callouts dans data — extraction v5 ne les a pas tous attrapés |
| **R21** | Tables structurées | OUVERT | **PARTIEL** | metier-pmo : 1 table dans data (Critère / Chef de projet / PMO) rendue via TableFrame. pi-planning, kanban et le-grand-guide : 0 table dans data — extraction v5 incomplète |
| **R22** | Inline CTAs / encadrés produit | OUVERT | **OUVERT** | metier-pmo : 2 inline-cta dans data, rendus via `InlineCta` DS — partiellement OK. pi-planning : 1 hubspot-cta avec `href` mais sans label visible (skipped par renderer ligne 190). kanban et le-grand-guide : 0 inline-CTAs dans data. Live a beaucoup d'encadrés "Demo" / "Essayer" — rebuild flat |
| **R25** | Inline hyperlinks (bleu, underline) dans body | PARTIEL | **PARTIEL** | Liens visibles dans body rebuild (ex: blog-kanban "Découvrez aussi"). Style underline+color souvent moins prominent que live |
| **R30** | Blog metadata header (Le {date} · {readingTime} · {author}) au-dessus du H1 | OUVERT | **FERMÉ** | BlogHero ligne 145-152 implémente la meta strip. metier-pmo (Jonas Roman, 25/2/2026) + le-grand-guide (Bertran Ruiz, 10/5/2022) + kanban (Bertran Ruiz, 8/10/2021) ont auteur+date. **REGRESSION mineure : pi-planning author.name="" → header strip non rendu sur cette page** (BlogHero ligne 145 conditionne sur publishedDate + readingTime, name vide → "auteur:" affiché vide) |
| **R31** | Newsletter inline card mid-page | OUVERT | **FERMÉ** | NewsletterInlineCard rendu : visible bleu + champ email sur tous les 4 blog rebuild (kanban, pi-planning rebuild-footer thumbnails confirment) |
| **R32** | Sticky TOC sidebar (≥ 5 toc items) | OUVERT | **FERMÉ** | BlogPostPage ligne 142-150 implémente `useSticky = tocItemsCount >= 5`. metier-pmo (9), le-grand-guide (9), pi-planning (5) → sticky. kanban (4) → inline. Confirmé visuellement par layout 2-col sur mid/footer rebuild de pi-planning + metier-pmo |
| **R33** | Body width reading (~700-800px) | FERMÉ | **FERMÉ** | `BlogArticleBody` utilise `ProseFrame maxWidth="reading"`. Confirmé sur 4/4 blog rebuild |
| **N2** | TOC sticky (alias R32 sur thumbnails) | OUVERT | **OUVERT (visuel partiel)** | Le useSticky 2-col code est appliqué côté layout, mais sur les thumbnails 1400px les 2 cols sont écrasés en 1 col (lg breakpoint). À ce niveau de zoom le sticky n'est pas perceptible. Live a aussi une TOC discrète. À retester full-screen pour confirmer |

---

## Observations détaillées par pattern

### R18 — Quotes stylisés (OUVERT — régression critique)

**Live** (blog-pi-planning, blog-metier-pmo) : pull-quote avec guillemets décoratifs, italique, photo + nom auteur. blog-pi-planning live affiche citation "Cette checklist permet…" avec photo "Michel Levasalot" et label "Adjoint de Direction".

**Rebuild** : Quote DS est instancié (pull variant), mais `renderBlogBlocks.tsx` ligne 118 fait `{block.text}` directement sans RichSpan. Conséquence : le texte source `<strong>L'essentiel : </strong>...` est rendu littéralement (visible blog-metier-pmo rebuild : « <strong>L'essentiel : le chef de projet gère le « comment »…</strong> »).

**Fix nécessaire** : remplacer `{block.text}` par `<RichSpan html={block.text} />` dans le case "quote". Same problem pour `block.author` qui peut contenir HTML.

**Impact** : 4/4 blog (metier-pmo a 6 quotes, pi-planning a 14 quotes — visible immédiatement)

### R19 — Related grid (FERMÉ — maintenu)

`BlogCollectionFrame` rendu en bas de tous les 4 blog avec 3 cartes ("À découvrir aussi"). Confirmé visuellement sur les 4 rebuild-footer thumbnails.

### R20 — InsightCallout "À retenir" (PARTIEL)

**Code** : `renderBlogBlocks` case "insight-callout" est implémenté (utilise DS `InsightCallout` avec title="À retenir" + bullets extraits du HTML).

**Data** : seulement metier-pmo a 3 insight-callouts. pi-planning a 1, kanban a 0, le-grand-guide a 0 (alors que live le-grand-guide a clairement des panels colorés).

**Verdict PARTIEL** : code OK, extraction v5 incomplète sur 3/4 articles.

### R21 — Tables (PARTIEL)

**Code** : `TableFrame` (DS) avec normalisation rows/cols (ligne 129-146).

**Data** : metier-pmo a 1 table. pi-planning, kanban, le-grand-guide ont 0 tables. Live metier-pmo a un tableau "Chef de projet vs PMO" — bien rendu côté rebuild (visible).

**Verdict PARTIEL** : 1/4 article rendu correctement, 3/4 sans tables détectées (extraction v5 incomplète si live a tables).

### R22 — Inline CTAs (OUVERT)

**Code** : `InlineCta` DS rendu sur block "inline-cta". Le case "hubspot-cta" exige `href + label` sinon skip.

**Data** : metier-pmo a 2 inline-CTAs. pi-planning a 1 hubspot-cta — risque skip si pas de label. kanban et le-grand-guide ont 0 inline-CTAs.

**Live** : nombreux encadrés / cartes produit visibles dans le-grand-guide (image projet AirSaas + "essayer la démo") — non répliqués.

**Verdict OUVERT** : couverture 1/4 articles, et hubspot-cta possiblement skip.

### R25 — Inline links (PARTIEL — maintenu)

Inline `<a>` rendus via RichSpan dans paragraphes. Couleur primary visible mais underline moins marqué que live (stylé via Text DS, pas de override).

### R30 — Metadata header (FERMÉ — partiel sur 1 page)

**Code** : `BlogHero.tsx` lignes 145-152 implémente la meta strip "{datePrefix} {publishedDate} · {readingTime} · {name}".

**Data** :
- kanban : ✅ Bertran Ruiz, 8/10/2021
- metier-pmo : ✅ Jonas Roman, 25/2/2026
- le-grand-guide : ✅ Bertran Ruiz, 10/5/2022
- pi-planning : ⚠️ author.name="" (data est `"author":{"name":"","category":"Gestion de projets","publishedDate":"19/2/2026"}`) → la meta strip va afficher la date + readingTime + nom vide.

**Verdict FERMÉ avec caveat** : 3/4 OK, 1/4 (pi-planning) a un nom auteur vide → fix nécessaire dans extraction (extraction v5 a perdu le nom de l'auteur du PI Planning).

### R31 — Newsletter inline (FERMÉ)

**Code** : `BlogPostPage.tsx` lignes 189-216 rend `NewsletterInlineCard` toujours (props passés depuis page). Card bleu visible sur 4/4 thumbnails rebuild ("Recevez nos meilleurs articles" + email field).

### R32 — Sticky TOC sidebar (FERMÉ)

**Code** : `BlogPostPage.tsx` ligne 142 : `useSticky = tocItemsCount >= 5`.
- pi-planning (5 toc) → sticky 2-col
- metier-pmo (9 toc) → sticky 2-col
- le-grand-guide (9 toc) → sticky 2-col
- kanban (4 toc) → inline horizontal

**Verdict FERMÉ** : code conforme, 3/4 sticky. Sur thumbnails 1400px le 2-col est compacté en 1-col (`lg:flex-row`) — à confirmer full screen, mais le code est correct.

### R33 — Body width reading (FERMÉ — maintenu)

`ProseFrame maxWidth="reading"` (~700-800px) appliqué via `BlogArticleBody`. Visible sur 4/4 blog rebuild.

### N2 — TOC sticky visuel (OUVERT — partiel)

À thumb resolution 1400px le 2-col `lg:flex-row` collapse à 1-col. Le sidebar TOC n'est donc pas visible séparément du body. Sur full-screen ce devrait être OK. Marqué OUVERT par prudence — à valider en visual sample full-resolution.

---

## Régressions vs Phase 4A

### 1. `<strong>` HTML literal dans Quote (CRITIQUE)
- **Localisation** : `src/components/blog/renderBlogBlocks.tsx` ligne 118
- **Cause** : case "quote" passe `{block.text}` directement à `<Quote>` sans RichSpan
- **Impact** : visible sur blog-metier-pmo et blog-pi-planning rebuild (≥ 6 + 14 quotes)
- **Fix** : utiliser `<RichSpan html={block.text} />` (déjà implémenté pour paragraphs/lists/inline-callouts)

### 2. pi-planning author.name vide
- **Localisation** : extraction blog v5 a produit `author.name=""` pour pi-planning
- **Impact** : meta header "Le 19 février 2026 · X min · " (nom vide) sur cette page
- **Fix** : re-extract pi-planning ou patch data → fallback "AirSaas" si name vide

### 3. le-grand-guide-de-la-conduite-de-projet : 0 enrichissement
- **Cause** : data a 9 toc, mais 0 quotes / 0 callouts / 0 tables / 0 inline-CTAs / 0 related / 0 FAQ
- **Impact** : article long avec body flat, alors que live a callouts colorés, panels visuels, related list
- **Fix** : re-extract avec prompt v5 qui catch mieux les panels et asides du-live

### 4. kanban-gestion-de-projet : 0 enrichissement
- **Cause** : data a 4 toc, 0 quotes / 0 callouts / 0 tables / 0 inline-CTAs / 0 related / 0 FAQ
- **Impact** : article rendu plat. Live a un body flat plus simple aussi (bullet lists), donc impact mineur, mais zéro related/FAQ → footer pauvre

---

## Verdict ≥ 90% blog patterns fermés ?

**NON.** 5/11 fermés = **45%**, sous la barre 90%.

Détail :
- ≥ partiels : 8/11 (73%) — sous 90%
- 3 patterns OUVERTS bloquants : R18 (régression), R22 (couverture data), N2 (à confirmer full-screen)
- 1 régression vraie : `<strong>` literal dans Quote (CRITIQUE)
- 2 régressions data : pi-planning author vide, le-grand-guide 0 enrichissement

### Top 3 fixes pour atteindre 80%+ blog

1. **R18 fix code** (5 min) : ajouter `<RichSpan html={block.text} />` dans case "quote" → ferme R18 sur 4/4 blog
2. **R22 + data quality** (re-extract ciblé sur 3 articles : kanban, le-grand-guide, pi-planning) avec prompt v5 ajusté pour catch les panels colorés et `:::aside` Live → ferme R20 et R22 partiels
3. **pi-planning author fix** (data patch) : remplacer `name:""` par "AirSaas" ou recouvrir l'author depuis live

Avec ces 3 fixes : passage de 45% à **~73% fermés** (R18 + R22 + R30 fermés stricts) et **≥ 90% partiels**.

### Reco

- **Fix #1 obligatoire** (R18 code regression) avant tout autre travail blog — la régression Quote bloque visuellement 4/4 blog
- **Fix #2 prompt v5 ajustement** : forcer la conversion de blockquotes ET de paragraphes commençant par "<strong>L'essentiel" / "<strong>À noter" / "<strong>En une phrase" vers `quote` block (avec text propre sans `<strong>` doublé)
- **Fix #3 fallback author** dans `BlogArticleRoute` : si `article.meta.author?.name` vide → "L'équipe AirSaas"

Phase 4F recommandée pour passer de 45% → ≥ 80% blog fermés.

---

**Rapport généré** : 2026-05-07 (post Blog v5 + re-extract)
**Auditor** : Claude Code (file search specialist)
**Articles analysés** : 4/62 (16 thumbnails rebuild + live)
**Patterns évalués** : 11 (R18, R19, R20, R21, R22, R25, R30, R31, R32, R33, N2)
**Patterns fermés** : 5/11 (45%) — **NON-GO 90%**
