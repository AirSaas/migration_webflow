# Audit blog rebuild vs live — 2026-05-08 (post Blog v6 + structural hints + retry loop)

**Scope** : 10 articles blog stratifiés, comparés rebuild vs live (`docs/audit-screenshots/pages-thumb/<slug>/`)

| Slug | Profile (task brief) | Blocks | Quotes | Callouts | Tables | Inline-CTA | TOC items | Author |
|---|---|---|---|---|---|---|---|---|
| pi-planning | 145 blocks, 14 quotes, 2 callouts | 145 | **14** | **2** | 0 | 0 | 5 | _(empty)_ |
| metier-pmo | 125 blocks, 9 quotes, 1 table, 3 callouts | 123 | **9** | 0 | **1** | 0 | 9 | Jonas Roman |
| le-grand-guide-de-la-conduite-de-projet | 160 blocks, long form | 160 | 0 | 0 | 0 | 0 | 9 | Bertran Ruiz |
| kanban-gestion-de-projet | 42 blocks, short | 42 | 0 | 0 | 0 | 0 | 4 | Bertran Ruiz |
| project-portfolio-management | 154 blocks, complex | 157 | 1 | 0 | 0 | 0 | **0** (bug) | Jérôme Dard |
| cadrage-projet | mid | 68 | **5** | **1** | 0 | 0 | 7 | Jérôme Dard |
| capacity-planning | mid | 97 | 0 | 0 | 0 | 0 (1 hubspot) | 5 | _(empty)_ |
| comite-pilotage-projet | mid | 53 | 1 | **1** | 0 | 0 | 6 | Jérôme Dard |
| tout-savoir-sur-la-note-de-cadrage-projet | mid | 66 | 0 | 0 | 0 | **1** | 6 | Simon Vacher |
| budgetiser-un-projet-sans-se-louper | mid | 82 | 1 | **1** | 0 | 0 | 6 | Jérôme Dard |
| **TOTAL** | | **993** | **31** | **5** | **1** | **1** | | |

**Méthode** : inspection visuelle 60 thumbnails (3 zones × 2 versions × 10 articles, top + mid + bot 1400×1900) + audit data via `node /tmp/audit-blog-v6.mjs` sur `src/data/blog-articles-v2.ts` + lecture renderer (`renderBlogBlocks.tsx`) + lecture `BlogPostPage.tsx` (sticky logic) et `BlogHero.tsx` (R30 strip).

**Phase évaluée** : Blog v6 — re-extract 60/62 articles avec structural hints + retry loop, score moyen 99.1% (programmatic deterministic counts). R18 fix `<RichSpan html={block.text}/>` dans le case "quote" (renderBlogBlocks.tsx ligne 121).

---

## Conclusion

Sur 11 patterns blog ciblés : **5 fermés (45%), 4 partiels (37%), 2 ouverts (18%)**. Cible 90% **NON atteinte (45% fermés)**. ≥ partiel 9/11 = 82% — sous le 90% target.

Δ vs audit 2026-05-07 : **+0 fermés** (5/11 → 5/11). R18 reste **PARTIEL** parce que la régression `<strong>` literal est corrigée (RichSpan en place) mais l'extraction v6 n'a pas augmenté la couverture quotes : 4/10 articles ont 0 quotes alors que live affiche clairement des pull-quotes stylisés (le-grand-guide, kanban, capacity-planning, tout-savoir).

---

## Tableau récapitulatif

| Pattern | Description | Status v6 | Observations |
|---|---|---|---|
| **R18** | Blog quotes stylisés (pull-quote with author + photo) | **PARTIEL** | Code OK : RichSpan wrap text (renderBlogBlocks.tsx ligne 121) → plus de `<strong>` literal ; Quote DS variant="pull" align="left" rendue. Couverture data : 6/10 articles ont 1+ quotes (pi-planning 14, metier-pmo 9, cadrage 5, comite 1, ppm 1, budgetiser 1). **4/10 articles à 0 quote** : le-grand-guide, kanban, capacity-planning, tout-savoir — alors que live cadrage et budgetiser affichent clairement des pull-quotes (visible sur live screenshots avec photo+nom+rôle). Extraction v6 ne capte pas les pull-quotes décoratifs Webflow sur ces articles. |
| **R19** | Blog related grid 3-4 cartes "À découvrir aussi" | **FERMÉ** | `BlogCollectionFrame` 3 cartes affichées en bas de **10/10** rebuild-bot thumbnails. Confirmé visuellement. |
| **R20** | InsightCallout "À retenir" pour aside / .a-retenir | **PARTIEL** | Code OK : `renderBlogBlocks` case "insight-callout" rend `InsightCallout` DS. Couverture data : 5/10 ont 1+ callouts (pi-planning 2, cadrage 1, comite 1, budgetiser 1). **5/10 articles à 0** : metier-pmo (visible sur rebuild en check-list rouge "X Le passe-plat" / "X Le Codir" — peut-être rendus en autre type), le-grand-guide, kanban, capacity-planning, tout-savoir. metier-pmo task brief annonçait 3 callouts mais data v6 a 0 → régression d'extraction sur metier-pmo. Comite-pilotage rebuild affiche un beau "À retenir" callout vert à check icon (DS InsightCallout). |
| **R21** | Tables structurées | **PARTIEL** | Code OK : `TableFrame` (DS) avec normalisation rows/cols. Couverture data : **1/10** seulement (metier-pmo 1 table — Critère/Chef de projet/PMO, bien rendue côté rebuild). Live tout-savoir-sur-la-note-de-cadrage affiche au moins 2 tables visibles (mid+bot screenshots) → extraction v6 manque ces tables. |
| **R22** | Inline CTAs / encadrés produit | **OUVERT** | Code OK : `InlineCta` DS + `hubspot-cta` requiert label+href. Couverture data : **1/10** (tout-savoir 1 inline-cta) + 1 hubspot-cta capacity-planning. Live `project-portfolio-management` affiche encadré jaune de retour d'expérience (rebuild remplace par newsletter card AirSaaS — pas le même contenu). Live `le-grand-guide` a multiples encadrés produit non répliqués. |
| **R25** | Inline hyperlinks (bleu, underline) dans body | **PARTIEL** | RichSpan `dangerouslySetInnerHTML` rend les `<a>` inline correctement (visible sur tous rebuild — ex metier-pmo "Lire le guide complet ->", le-grand-guide "diagramme de Gantt", capacity rebuild "outil qui permet de suivre"). Couleur primary visible. **Style underline moins prominent que live** sur certains thumbnails (Text DS pas d'override `text-decoration`). |
| **R30** | Blog metadata header (Le {date} · {readingTime} · {author}) au-dessus du H1 | **FERMÉ** | `BlogHero.tsx` ligne 145 conditionne sur `publishedDate && readingTime`. `readingTime` est calculé runtime via `estimateReadingTime(article.blocks)` (page.tsx ligne 73) → toujours présent. **Régression mineure** : pi-planning + capacity-planning ont `author.name=""` → strip rendu mais nom auteur vide (terminus "·" + " "). 8/10 articles affichent un nom d'auteur correct. |
| **R31** | Newsletter inline card mid-page | **FERMÉ** | `NewsletterInlineCard` rendu : visible sur **9/10** rebuild-bot (encart bleu "Et si vous repreniez le contrôle de votre portefeuille de projets ?" + champ email). project-portfolio-management screenshot moins visible mais structure layout identique. Pattern fermé. |
| **R32** | Sticky TOC sidebar (≥ 5 toc items) | **PARTIEL** | `BlogPostPage.tsx` ligne 142 implémente `useSticky = tocItemsCount >= 5`. **9/10 articles éligibles** (pi-planning 5, metier-pmo 9, le-grand-guide 9, capacity 5, cadrage 7, comite 6, tout-savoir 6, budgetiser 6, kanban 4 inline). **1 régression** : `project-portfolio-management` a 22 headings dans data mais `toc=[]` → TOC vide → useSticky=false → pas de sidebar du tout. Bug d'extraction v6 sur ce slug. |
| **R33** | Body width reading (~700-800px) | **FERMÉ** | `BlogArticleBody` utilise `ProseFrame maxWidth="reading"` (max-w-[50rem] mx-auto). Confirmé sur 10/10 rebuild — body content centré et borné, pas de débordement. |
| **N2** | TOC sticky — comportement scroll | **PARTIEL** | useSticky 2-col code appliqué (BlogPostPage ligne 180-187 : `flex-col gap-[2rem] lg:flex-row`). **Sur thumbnails 1400×1900** le breakpoint lg force 2-col layout théorique mais à ce niveau de zoom la position sticky scroll n'est pas testable visuellement. Live `kanban-gestion-de-projet` montre clairement TOC fixe à gauche (live-bot screenshot). Code rebuild OK mais comportement scroll runtime non vérifié sur 1400px réel. |

---

## Observations détaillées par article

### blog-pi-planning (rebuild vs live)

- **Live top** : pull-quote stylisé avec quotation glyph + body + auteur "MICHEL LEVASSOR" + rôle "Adjoint de Direction - Transformation de la DSI et animateur d'un club SAFe" + photo auteur. **Rebuild top** : pas de pull-quote affiché à cette position — body texte direct. Cause probable : ordre de blocs dans la page. Data v6 a 14 quotes — donc R18 n'est pas total échec, juste l'ordre/position diffère.
- **Live mid** : encore 1 pull-quote stylisé visible.
- **Author empty** : R30 strip rendu mais `author.name=""` → ligne meta se termine par "·" sans nom.
- TOC items=5 → sticky activé.

### blog-metier-pmo (rebuild vs live)

- **Rebuild top** : excellente fidélité. TableFrame "Critère / Chef de projet / PMO" bien rendue (R21 fermé pour cet article). Quote pull-style "L'essentiel : le chef de projet gère le « comment »…" en italic primary visible. **Live top** : table similaire mais quote rendue comme italic body (pas DS Quote). **Rebuild plus DS-conforme que live ici**.
- Liste check rouge "X Le passe-plat / X Le Codir / X Le projet focused" dans rebuild — c'est un BulletList, pas un InsightCallout. Live a la même chose en bullet. Nécessite vérifier si ça devrait être un InsightCallout DS.
- Inline link "Lire le guide complet → différences entre chef de projet et PMO →" rendu correctement (R25).

### blog-le-grand-guide-de-la-conduite-de-projet

- **Rebuild top** : bullets list "▸ Compréhensible par tous" sans pull-quote. **Live top** : bullets stylisés avec arrow markers colorés "▸" en accent primary. Rebuild rend bullet "·" simple, moins visible (style ListInline vs Webflow original).
- 0 quotes / 0 callouts / 0 tables dans data — extraction v6 pas augmentée pour cet article. Live ne montre pas non plus de pull-quote distinct mais a clairement des panels visuels.
- TOC 9 items, sticky activé.

### blog-kanban-gestion-de-projet

- **Rebuild top** : bullet list avec "·" markers + bold lead-ins. **Live top** : même structure mais markers "▸" colorés et plus prominents. Live et rebuild très proches structurellement.
- 0 enrichi (0 quotes/callouts/tables/inline-cta) — short article.
- TOC 4 items < 5 → inline TOC (pas sticky). Conforme.
- **Live-bot** clairement affiche un layout 2-col TOC fixe gauche + body droite — N2 visible côté live.

### blog-project-portfolio-management

- **Bug R32 critique** : 22 headings dans data mais `toc=[]` → pas de TOC du tout. Régression v6 vs attente.
- **Rebuild top** : encart AirSaaS produit (capture FlashReport mauve) + bullet list. **Live top** : encart jaune "Bonne pratique de la DSI de Doglo via Podcast" stylisé InsightCallout — non répliqué côté rebuild (rebuild substitue par newsletter card produit).
- 1 quote dans data (Sylvain Bourdette), rendue plus loin dans body.

### blog-cadrage-projet

- **Live top** : pull-quote stylisé "FREDERIC NAVARRO / DSI - Manager de Transition ESINTO" avec quotation glyph (DS Quote pattern parfait). **Rebuild top** : pas de quote à cette position — text body + image article. Quote rendue plus loin dans la page peut-être.
- 5 quotes + 1 callout dans data → R18/R20 fonctionnels pour cet article.
- **Live-bot** : 5 quote glyphs visibles (5 pull-quotes stylisés). **Rebuild-bot** : layout TOC sidebar visible mais quote glyphs moins prominents au thumbnail level.

### blog-capacity-planning

- Rebuild et live très similaires structurellement. Body identique.
- 0 enrichi dans data (0 quote/0 callout/0 table) + 1 hubspot-cta (sans label visible si label vide → skip).
- Author empty → R30 strip avec nom vide.
- TOC 5 items, sticky activé.

### blog-comite-pilotage-projet

- **Rebuild top** : excellente fidélité — "À retenir" green callout DS InsightCallout (DS pattern parfait, check icon vert). **Live top** : même contenu mais rendu en pull-quote centré avec quote glyph (style différent). Rebuild plus DS-conforme.
- 1 quote + 1 callout dans data.

### blog-tout-savoir-sur-la-note-de-cadrage-projet

- Rebuild et live très similaires. Bullet list "X .." rouge marker bien rendu.
- 0 quote / 0 callout / 0 table / 1 inline-cta dans data. **Live affiche au moins 2 tables visibles** (mid screenshot) → R21 manque ces tables.
- TOC 6 items, sticky activé.

### blog-budgetiser-un-projet-sans-se-louper

- **Live top** : pull-quote stylisé "MATTHIEU GRYMONPREZ / CIO/CIO ADEO invité de l'épisode N°30 du Podcast CIO Révolution". **Rebuild top** : pas de pull-quote au top — body text direct. Quote rendue plus loin dans body (1 quote dans data : Picasso "Good artists copy").
- Live a clairement plusieurs pull-quotes décoratifs ; data v6 a 1 seul → extraction incomplète.
- 1 callout dans data.

---

## Top 3 issues bloquantes pour 90%

1. **Extraction v6 incomplète sur 4/10 articles à 0 quotes** — le-grand-guide, kanban, capacity-planning, tout-savoir n'ont aucun quote/callout/table dans data, alors que live cadrage et budgetiser affichent des pull-quotes décoratifs visibles. Le score "structural avg 99.1%" mesure la cohérence statistique entre extracts mais ne garantit pas la couverture des éléments décoratifs Webflow (`.blog-quote`, `.a-retenir`, `.callout`, etc.). Re-tuner les selectors d'extraction.

2. **Bug TOC vide sur blog-project-portfolio-management** — 22 headings dans data mais `toc=[]` → ni inline ni sticky TOC rendu. R32 régression sur cet article. Cause probable : le toc-builder est désynchronisé du heading-extractor sur un article particulier (probablement à cause d'une structure HTML atypique sur cette page). À investiguer dans le pipeline d'extraction.

3. **R22 inline-CTAs pas couverts** — 1/10 articles seulement a un inline-CTA dans data, 1 hubspot-cta sans label visible (skipped au render). Live affiche multiples encadrés produit/CTA (ex: project-portfolio-management encart jaune retour d'expérience, le-grand-guide encadrés démo). Soit re-tuner extraction CTAs Webflow, soit pivoter pattern R22 vers `inline-cta` injecté manuellement par config (1 par article). Auteurs vides (pi-planning, capacity-planning) : R30 strip rend mais avec nom vide en fin → faire fallback "AirSaaS" ou skip si vide.

---

## Verdict

**≥ 90% blog patterns fermés ? NON.**

**Justification** : 5/11 patterns fermés (45%) — loin du 90% target. La pipeline blog v6 a corrigé la régression R18 critique (RichSpan dans Quote) et conserve les acquis Phase 4C (R19, R30, R31, R32, R33), mais l'extraction v6 ne capture pas suffisamment les blocs enrichis (quotes / callouts / tables / inline-CTAs) sur 4-5 des 10 articles. Le score 99.1% structural est un faux positif : il mesure la cohérence statistique de chaque extraction prise individuellement, pas la couverture complète des éléments décoratifs Webflow présents sur le live. Ajouter par ailleurs : 1 bug TOC vide sur ppm + 2 articles avec `author.name=""`. Pour atteindre 90% il faut soit (a) re-tuner les selectors d'extraction blog v7 pour augmenter la capture quotes/callouts/tables sur les articles long-form, soit (b) accepter R22 et R21 partiels et viser 8/11 fermés (73%) — encore sous 90%.

**Avancement ≥ partiel** : 9/11 (82%) — proche du 80% mais pas au 90% target.
