# Audit Rebuild — Catalogue visuel

**Date** : 2026-05-05
**Méthode** : captures réelles rebuild (localhost:3000) vs live (airsaas.io) + DS canonical (Storybook).
**Résultat** : 26 pages auditées, 52 captures comparées, 23 DS references prêtes.

## Comment l'utiliser

- **Captures rebuild + live** : `docs/audit-screenshots/pages/<type>-<slug>/rebuild.png` et `live.png`. Les ouvrir côte à côte (Finder → Cmd+A → Espace) ou les drag-drop dans Google Docs.
- **DS canonical** : `docs/audit-screenshots/<NN>-<name>.png`. Chaque PNG montre le sidebar Storybook avec le path complet du composant à rechercher.

---

# PARTIE 1 — Patterns récurrents (1 correction = N pages résolues)

Ces patterns affectent au moins 3 pages chacun. Les corriger en premier libère le maximum de findings.

---

## [R1] 🚨 Hero LP cassé sur 4/4 LP — image + eyebrow + trust badges absents

🔴 **Captures rebuild** :
- `docs/audit-screenshots/pages/lp-ppm/rebuild.png`
- `docs/audit-screenshots/pages/lp-pmo/rebuild.png`
- `docs/audit-screenshots/pages/lp-capacity-planning/rebuild.png`
- `docs/audit-screenshots/pages/lp-pi-planning/rebuild.png`

🌐 **Captures live** :
- `docs/audit-screenshots/pages/lp-ppm/live.png` (et idem pmo/capacity/pi-planning)

**Ce qui manque sur les 4 LP** :
- L'eyebrow ("PPM nouvelle génération", "Outil PMO", etc.) au-dessus du H1
- Les 3-5 trust badges sous les CTAs (avec checks verts)
- **Le screenshot produit dominant** (le dashboard AirSaas, les tabs Portfolio/Quarter plan/etc. sont bakées DEDANS, pas un composant séparé)

🟢 **DS** : `docs/audit-screenshots/01-hero-five-trust-badges.png`
**Storybook** : `Sections / Hero / Five Trust Badges`

⚠️ **Correction** : ne pas ajouter de `<TabsFrame>` séparé sous le hero — les tabs sont dans le screenshot. Juste passer `eyebrow`, `bottomTags` et `imageSrc` au Hero dans le data.

---

## [R2] 🚨 Hero Produit layout incorrect sur 6/6 Produit

🔴 **Captures rebuild** : 6/6 Produit (folder `pages/produit-<slug>/rebuild.png`)
🌐 **Captures live** : 6/6 Produit

**Ce qui change** :
- Rebuild = aligné gauche avec image à droite
- Live = centré full-width + halo bleu décoratif + image en dessous (pas à côté)

🟢 **DS** : `docs/audit-screenshots/01-hero-five-trust-badges.png` (le Hero supporte les 2 layouts via `layout` prop)
**Storybook** : `Sections / Hero / Five Trust Badges` (variant `centered` ou `split`)

**Cas particuliers** :
- `produit/reporting-projet` → `imageSrc` complètement absent (rebuild centered sans image)
- `produit/budget` → `titleHighlight` = `title` (tout le titre highlighted, pas de contraste)

---

## [R3] ❌ Section "Nos solutions..." (related grid) absente sur 6/6 Produit + 12/12 Solutions

🔴 **Captures rebuild** : tous les 18 (Produit + Solutions)
🌐 **Captures live** : section présente en bas de page, grid de 3-4 cartes

🟢 **DS** : `docs/audit-screenshots/13-relatedsolutionsframe-default.png`
**Storybook** : `Sections / CTA Sections / RelatedSolutionsFrame / Default Three Solutions`

⚠️ **Action data** : ajouter `type: "related"` à la fin de chaque page dans `produit.ts` + `solutions.ts`. Le renderer doit le mapper au composant.

---

## [R4] 🚨 CTA final "input/search" au lieu de bouton/CtaFrame sur 6/6 Produit + 3/4 LP

🔴 **Captures rebuild** : Produit (6/6) + LP PMO/Capacity/PI Planning
🌐 **Captures live** : bouton "Je veux une démo" centré OU 2 cards CtaFrame Split

**Différence** :
- Rebuild affiche un input/search style avec champ texte + bouton (probable `CtaHighlightFrame` mal rendu OU embed HubSpot mal mappé)
- Live = simple bouton centré OU 2 cards côte à côte

🟢 **DS** : `docs/audit-screenshots/21-cta-frame-split.png`
**Storybook** : `Sections / Call to Action / CtaFrame / Split`

---

## [R5] 🚨 Sur-fragmentation massive sur Solutions (Δ moyen +5 sections)

🔴 **Captures rebuild** : 12/12 Solutions
🌐 **Captures live** : 12/12 Solutions

**Δ par page** :
- `outil-ppm` : Live 8 / Rebuild 31 → Δ +23 (CRITIQUE)
- `portfolio-management` : Live 8 / Rebuild 14 → Δ +6
- `flash-report-projet` : Live 8 / Rebuild 13 → Δ +5
- `revue-de-portefeuille` : Live 9 / Rebuild 14 → Δ +5
- `tableau-de-bord-portefeuille-de-projet` : Live 8 / Rebuild 13 → Δ +5
- `flash-report` : Live 9 / Rebuild 14 → Δ +5
- `outils-de-pilotage-projet` : Live 8 / Rebuild 13 → Δ +5
- `management-de-portefeuille-projet` : Live 9 / Rebuild 13 → Δ +4
- `tableau-de-bord-dsi` : Live 8 / Rebuild 12 → Δ +4
- `tableau-de-bord-gestion-de-projet` : Live 8 / Rebuild 12 → Δ +4
- `airsaas-et-experts-de-la-transfo` : Live 6 / Rebuild 8 → Δ +2

**Cause** : le parser convertit chaque H4 du live en feature-split standalone. Live groupe H3 + N×H4 dans un seul bloc (cards ou sub-features).

🟢 **DS** : `docs/audit-screenshots/12-valuepropositionframe-default.png` ou `08-featureframe-rich-editorial-illustration.png`
**Storybook** : `Sections / Value Proposition Sections / ValuePropositionFrame / Cards / Default`

⚠️ **Action** : modifier `scripts/migrate/parse-landings-llm.mjs` pour grouper.

---

## [R6] 🎨 Illustrations schématiques rendues à 60% au lieu de 33% (narrow)

🔴 **Captures rebuild** : 6+ Solutions
🌐 **Captures live** : illustration prend ~33% de la largeur, texte 67%

**Pages** :
- `tableau-de-bord-dsi` (sub-sections "Choisissez bien vos indicateurs", "Construisez")
- `tableau-de-bord-portefeuille-de-projet` (idem)
- `revue-de-portefeuille` (sub-sections "6 clés")
- `outil-ppm` (sub-sections éditoriales)
- `outils-de-pilotage-projet` (sub-sections schématiques)
- `flash-report-projet` (sub-features ergonomiques)

🟢 **DS** : `docs/audit-screenshots/08-featureframe-rich-editorial-illustration.png`
**Storybook** : `Sections / Features Sections / FeatureFrame / Rich Text / Editorial Illustration`

**Règle** : `imageSrc` SVG/illustration → `imageSize="narrow"` (33%). `imageSrc` screenshot produit → `imageSize="default"` (60%).

---

## [R7] 🚨 Composite-image + multi-arrow text → split en blocs séparés

🔴 **Captures rebuild** : multiple
🌐 **Captures live** : 1 image fusionnée + 3 H5 avec flèches → décrivant chaque partie

**Pages** :
- `produit/automatiser-la-com-projet` "Un récap' complet et synthétique" (sub-sections H5 perdues)
- `solutions/portfolio-management` "Une newsletter sponsor"
- `solutions/flash-report` 3 H4 sub-features
- `solutions/flash-report-projet` 3 règles d'or
- `produit/reporting-projet` "Plus besoin d'aller à la pêche"

🟢 **DS** : `docs/audit-screenshots/09-featureframe-rich-composite-arrowed.png`
**Storybook** : `Sections / Features Sections / FeatureFrame / Rich Text / Composite Image With Arrowed Text`

**Pattern** : 1 `<FeatureFrame>` + `richContent` avec 3×(`<h5>→ Title</h5>` + `<p>desc</p>`) + 1 imageSrc fusionnée (`*-composite.png`).

---

## [R8] ⚠️ ComparisonTableFrame utilisé au lieu de ComparisonFrame narratif

🔴 **Captures rebuild** : Équipes 4/4 + ~4 Solutions
🌐 **Captures live** : narratif numéroté Avec/sans avec icônes ❌ ✅

**Pages** :
- `equipes/comite-direction` "7 raisons pour lesquelles les directions générales adorent AirSaas"
- `equipes/direction-de-la-transformation` "Améliorer en continu"
- `equipes/it-et-operation` "Gagnez du temps"
- `equipes/outil-pmo` "Et si vous repreniez le contrôle"
- + ~4 Solutions

🟢 **DS** : `docs/audit-screenshots/06-comparisonframe-default.png`
**Storybook** : `Sections / Comparison Sections / ComparisonFrame / Default`

**Règle** : narratif numéroté Avec/Sans = `<ComparisonFrame>`. Feature matrix multi-colonnes = `<ComparisonTableFrame>`. Pour comparer : capture `07-comparisontableframe-default.png`.

---

## [R9] 🚨 TestimonialsFrame séparé en 2 blocs au lieu de press + LinkedIn fusionnés

🔴 **Captures rebuild** : Équipes 4/4 + 3+ Solutions
🌐 **Captures live** : 1 seul bloc avec press logos + testimonials LinkedIn entrelacés

**Pages** :
- `equipes/comite-direction`, `direction-de-la-transformation`, `it-et-operation`, `outil-pmo`
- `solutions/airsaas-et-experts-de-la-transfo`
- `solutions/flash-report-projet`
- `solutions/management-de-portefeuille-projet`
- `solutions/tableau-de-bord-portefeuille-de-projet`

🟢 **DS** : `docs/audit-screenshots/05-testimonialsframe-mixed-press-personal.png`
**Storybook** : `Sections / TestimonialsFrame / Mixed Press And Personal`

---

## [R10] ❌ Slider Industries (10 secteurs) absent sur 4/4 Équipes — DS GAP

🔴 **Captures rebuild** : Équipes 4/4
🌐 **Captures live** : bande bleue avec slider 10 secteurs (Énergie, Hôtellerie, Communication, Conseil, Santé-Pharma, Industrie, Événementiel, Assurance, Santé, Editeur logiciel) + icônes idea/briefcase + chiffres

🟢 **DS** : ❌ **PAS DE DS REFERENCE** — composant `<IndustriesSlider>` n'existe pas dans le DS.

⚠️ **Action** : décider si on construit un composant DS dédié OU si on réutilise un composant existant (`<Slider>` UI primitive ?). Voir l'équipe DS.

---

## [R11] 🚨 Stats KPIs inventés sur 3/4 Équipes (régression de [5.1] non corrigé)

🔴 **Captures rebuild** :
- `equipes/comite-direction` : "56% / 3min / 50 / 4×" (inventés)
- `equipes/direction-de-la-transformation` : "3min / 100% / 1 jour / Merci" (inventés, "Merci" est un label de testimonial)
- `equipes/it-et-operation` : "56% / 3min / 1 jour / 0€" (inventés)

🌐 **Captures live** : pas de section avec valeurs numériques explicites — juste icônes + descriptions

🟢 **DS** : N/A (problème de **data**, pas de composant). Le composant `<ValuePropositionFrame>` est correct, ce sont les chiffres passés qui sont fabriqués.

⚠️ **Action data** : SUPPRIMER la section stats OU sourcer les vraies valeurs. L'audit du 2026-04-27 avait déjà flaggé ce problème — les chiffres ont juste changé (70%/1h/120j/4× → 56%/3min/...) mais restent inventés.

---

## [R12] 🚨 FAQ titre dédoublé "Questions Fréquentes Fréquentes" sur 3/4 LP

🔴 **Captures rebuild** : LP PMO, Capacity, PI Planning (PPM OK ?)
🌐 **Captures live** : "Questions Fréquentes" (1 fois)

**Cause** : bug props `eyebrow` et `label` dans `<SectionHeading>` qui rendent les 2 — probable mauvais binding dans le renderer ou data dupliqué.

🟢 **DS** : N/A (bug renderer) — vérifier `src/components/library-design/ui/SectionHeading.tsx` et le renderer du case `faq`.

---

## [R13] ❌ Section "Sécurité au top" (4 trust cards) absente sur 3/4 LP

🔴 **Captures rebuild** : LP PPM, Capacity, PI Planning (PMO l'a)
🌐 **Captures live** : 4 cards icônes (ISO 27001, Hébergé en France, Pentest, Intégration AD)

🟢 **DS** : `docs/audit-screenshots/12-valuepropositionframe-default.png` (4 cards) OU `19-iconrowframe-default.png` (si simple bandeau d'icônes)
**Storybook** : `Sections / Value Proposition Sections / ValuePropositionFrame / Cards / Default`

⚠️ **Action data** : ajouter la section dans `lp.ts` pour PPM, Capacity, PI Planning.

---

## [R14] 🚨 Audit précédent [5.1]–[5.9] : 8/9 findings persistants sur Comité Direction

🔴 **Captures rebuild** : `pages/equipes-comite-direction/rebuild.png`
🌐 **Captures live** : `pages/equipes-comite-direction/live.png`

**Status** :
| Finding | Status |
|---|---|
| `[5.1]` KPIs inventés | ⚠️ persistant (chiffres changés mais toujours fabriqués) |
| `[5.2]` "7 raisons" mais 5 lignes | ⚠️ persistant |
| `[5.3]` ComparisonTableFrame mauvais composant | ⚠️ persistant |
| `[5.4]` Slider Industries manquant | ⚠️ persistant |
| `[5.5]` CTA "Laissez nos clients vous parler" | ✅ corrigé |
| `[5.6]` Press item LMI 4ème colonne | ⚠️ persistant (3 col seulement) |
| `[5.7]` Footer FR au lieu de 🇫🇷 | ⚠️ persistant |
| `[5.8]` RelatedSolutionsFrame ajouté | ⚠️ persistant |
| `[5.9]` TestimonialsFrame split en 2 blocs | ⚠️ persistant |

⚠️ **Action critique** : **Avant toute régénération**, le rebuild agent doit lire `docs/audit-lp-rebuild-2026-04-27.md` (findings `[1.1]–[5.9]`).

---

## [R15] 🚨 Sections H3 + N×H4 rendues en flat icon row au lieu de cards

🔴 **Captures** :
- `docs/audit-screenshots/pages/lp-ppm/rebuild.png` — section **"Pourquoi les équipes adoptent AirSaas"**
- `docs/audit-screenshots/pages/lp-pmo/rebuild.png` — section **"De contremaître à coach d'organisation"** (3 piliers : Moins de reporting / Plus d'impact / Meilleur alignement)
- + autres LP/Solutions avec ce pattern

🌐 **Captures live** : 3 cards distinctes en row horizontale, chacune avec icône colorée + titre bold + body paragraphe séparés.

**Confirmé visuellement** : Rebuild affiche flat row de 3 petites icônes + texte concaténé sur 1 ligne, **pas de containers cards**, pas de hiérarchie titre/body.

🟢 **DS** : `docs/audit-screenshots/12-valuepropositionframe-default.png`
**Storybook** : `Sections / Value Proposition Sections / ValuePropositionFrame / Cards / Default`

OU pour 3-4 piliers horizontaux : `docs/audit-screenshots/18-pillarframe-daki.png`
**Storybook** : `Sections / Value Proposition Sections / ValuePropositionFrame / Pillars / DAKI`

⚠️ **Côté data** : changer `type: "icon-row"` → `type: "value-proposition"` ou `type: "pillars"` dans `lp.ts`. Aujourd'hui les items concatènent `title + " — " + body` en un seul `label`. Il faut séparer en `{ iconSrc, title, body }`.

---

## [R16] 🚨 StepsFrame "Comment ça marche ?" rebuild section vide (LP PPM, peut-être autres LP)

🔴 **Captures** : `docs/audit-screenshots/pages/lp-ppm/rebuild.png` (section "Comment ça marche ?")

**Confirmé visuellement** : Live affiche 4 cards numérotées (zigzag avec floating numbered badges, design 2026-05-04). Rebuild affiche le **header "Comment ça marche ?" mais la zone steps est vide/collapsed** — pas de cards, pas de numéros, pas d'illustrations.

🟢 **DS** : `docs/audit-screenshots/11-stepsframe-default.png`
**Storybook** : `Sections / Value Proposition Sections / StepsFrame / Lp Ppm Deployment`

⚠️ **Causes possibles** : (a) data manque les `steps[]`, (b) renderer ne mappe pas `type: "steps"`, (c) component error silencieux. À investiguer dans `LandingPageV2.tsx`.

---

## [R17] 🎨 Yellow/lavender/blue pale frame autour des screenshots manquant (`imageBgColor`)

🔴 **Captures** : 6/6 Produit + LP PPM + plusieurs Solutions
🌐 **Live** : screenshots wrappés dans un soft colored frame (lavender pale, blue pale, yellow pale = `#fffbeb`)

**Confirmé visuellement** : Live entoure les screenshots produit avec un fond pale rounded (lavender/blue/yellow). Rebuild affiche les screenshots **bare** — pas de frame, pas de padding coloré, image brute sur fond blanc.

🟢 **DS** : `docs/audit-screenshots/10-featureframe-rich-image-right.png`
**Storybook** : `Sections / Features Sections / FeatureFrame / Rich Text / Image Right`

→ Le `<FeatureFrame>` accepte une prop `imageBgColor` (string CSS color, e.g. `"#fffbeb"`, `"var(--color-primary-5)"`). Le rebuild n'extrait/ne passe pas cette prop depuis le data.

⚠️ **Action data** : extraire la couleur de fond de chaque section live (les valeurs typiques : `#fffbeb` yellow, `#e8eafc` lavender, `#e0f2fe` blue) et la passer en prop `imageBgColor` dans le data.

---

## [R18] 🚨 Blog — quotes/citations non rendus (3/4 articles avec quotes affectés)

🔴 **Captures** :
- `docs/audit-screenshots/pages/blog-pi-planning/rebuild.png` + `live.png` (4-5 quotes en live, 0 en rebuild)
- `docs/audit-screenshots/pages/blog-metier-pmo/rebuild.png` + `live.png` (2 quotes en live, 0 en rebuild)
- `docs/audit-screenshots/pages/blog-le-grand-guide-de-la-conduite-de-projet/rebuild.png` + `live.png` (3-4 quotes en live, 0 en rebuild)

**Confirmé visuellement** : Live affiche les quotes en blocs encadrés (italique, fond pale, centrés). Rebuild les rend en paragraphes plats — composant `<Quote>` jamais invoqué.

🟢 **DS** : `docs/audit-screenshots/16-quote-default.png`
**Storybook** : `UI / Quote / Default`

⚠️ **Cause** : extraction parser Webflow → blocks ne détecte pas `<div class="quote">` ou variantes blockquote. Le renderer (`renderBlogBlocks.tsx:107`) supporte parfaitement le composant `<Quote>` quand le bloc est extrait.

⚠️ **Action** : re-run le parser Webflow avec détection élargie blockquote (matcher `<div class="quote">`, `<aside>`, `<div class="pull-quote">`, etc.). Diff l'output contre `blog-articles-v2.ts`.

---

## [R19] ❌ Blog — related grid au final remplacé par CTA orange (4/4 articles audités)

🔴 **Captures** : 4/4 articles audités (`pi-planning`, `kanban-gestion-de-projet`, `metier-pmo`, `le-grand-guide-de-la-conduite-de-projet`)
🌐 **Live** : 4/4 affichent un grid de 2-4 cartes articles avec image + titre + tag à la fin

**Confirmé visuellement** : Rebuild remplace le grid par un CTA orange générique. Aucun grid d'articles related n'est rendu sur les 4 articles audités.

🟢 **DS** : `docs/audit-screenshots/14-blogrelatedframe-default.png`
**Storybook** : `Sections / Blog / BlogRelatedFrame / Default Three Articles`

OU si format full grid : `docs/audit-screenshots/22-blogcollectionframe-default.png`
**Storybook** : `Sections / BlogCollectionFrame / Default`

⚠️ **Cause** : `src/app/[locale]/blog/[slug]/page.tsx:101-131` ne passe pas `trendingGrid` à `<BlogPostPage>`. Le `<BlogCollectionFrame>` (déjà importé en ligne 9) n'est jamais rendu.

⚠️ **Action** : wire `trendingGrid` après line 99 — passer top N articles depuis `ACTIVE_BLOG_ARTICLES_V2` (excluding current slug) en `BlogCardProps[]`.

---

## [R20] 🚨 Blog — InsightCallout "À retenir" / "À noter" absents

🔴 **Captures** : `metier-pmo/rebuild.png` notamment
🌐 **Live** : encadrés bleutés "À retenir" / "À noter"
**Rebuild** : rendus en paragraphes plats

🟢 **DS** : `docs/audit-screenshots/17-insightcallout-default.png`
**Storybook** : `UI / InsightCallout / Default`

⚠️ **Action** : idem [R18] — parser Webflow doit détecter et mapper les blocs callout.

---

## [R21] 🚨 Blog — tables structurées rendues en listes/paragraphes (`metier-pmo`)

🔴 **Captures** : `blog-metier-pmo/rebuild.png` vs `live.png`
🌐 **Live** : tableau comparatif structuré
**Rebuild** : rendu en liste à puces ou paragraphe plat

🟢 **DS** : `<TableFrame>` ou primitive table rich-text — vérifier `src/components/library-design/ui/TableFrame.tsx`

---

## [R22] 🚨 Blog — inline CTAs / encadrés produit absents (`le-grand-guide-de-la-conduite-de-projet`)

🔴 **Captures** : `blog-le-grand-guide-de-la-conduite-de-projet/`
🌐 **Live** : encart bleu produit AirSaas au milieu de l'article
**Rebuild** : pas d'encadré équivalent

🟢 **DS** : `<InlineCta>` (shipped Phase B blog audit)
**Storybook** : `UI / InlineCta / Default`

---

## [R23] 🚨 Hero "on dark blue" + halo concentrique blanc derrière screenshot

🔴 **Captures** : 4-5/6 Produit + multiples Solutions tableau-de-bord
🌐 **Live** : fond bleu nuit avec halo blanc concentrique derrière le screenshot dashboard
**Rebuild** : fond blanc + dégradé orange/peach (mauvais variant)

**Pages affectées (vérifiées)** :
- `produit/automatiser-la-com-projet`, `budget`, `priorisation-par-equipes`, `traduction-deepl`
- `solutions/tableau-de-bord-dsi`, `tableau-de-bord-gestion-de-projet`, `tableau-de-bord-portefeuille-de-projet` (Hero "pavé orange massif")
- `solutions/flash-report` Hero gradient mauvais token (orange au lieu de lavender)

🟢 **DS** : `docs/audit-screenshots/01-hero-five-trust-badges.png`
**Storybook** : `Sections / Hero / Five Trust Badges`

⚠️ **Action** : variant Hero `onDarkBlue` avec `haloRing` decorative element. Vérifier si le DS Hero accepte un prop `variant` ou `haloRing` — sinon DS extension nécessaire.

---

## [R24] 🚨 Eyebrow "orange dot + label" sur features sections absent

🔴 **Captures** : 5/6 Produit + multiples Solutions
🌐 **Live** : chaque feature section a un eyebrow orange ("Un cadrage", "Des rituels", "Une autre langue", "Un suivi facile", "Plateforme multilingue", "Animer une réunion", etc.)
**Rebuild** : eyebrow absent sur toutes les features

🟢 **DS** : `docs/audit-screenshots/10-featureframe-rich-image-right.png`
**Storybook** : `Sections / Features Sections / FeatureFrame / Rich Text / Image Right`

⚠️ **Le `<FeatureFrame>` accepte une prop `eyebrow`** — le rebuild ne la passe pas dans le data.

---

## [R25] 🚨 Inline hyperlinks (mots soulignés bleu) absents dans subtitles + body

🔴 **Captures** : 4+ Solutions long-form + 4/4 Blog
🌐 **Live** :
- Solutions : 4-6 hyperlinks internes par page dans subtitles ("outil PPM", "flash report", "PMO", "gouvernance", "tableau de bord portefeuille", "DSI")
- Blog : 10+ liens contextuels dans le corps (`metier-pmo`, `le-grand-guide`, `pi-planning`, `kanban`)
**Rebuild** : ~3 liens par page max, la plupart en plain text

🟢 **DS** : N/A (typography RichText foundation)
**Storybook** : `Foundations / Typography / RichText`

⚠️ **Action data** : re-extraire les `<a href="...">` JSX depuis Webflow et les intégrer dans `subtitle` / body comme React nodes. Casse le maillage SEO interne.

---

## [R26] 🚨 Underline orange / highlight inline sur mots dans titres et subtitles

🔴 **Captures** : 4/4 LP + 3/4 Équipes + multiples Produit
🌐 **Live** : mots-clés dans titres ou subtitles sont **soulignés/highlightés orange** ("flexibilité", "leurs grands programmes", "multilingue à la maille utilisateur", "maternelle, on s'occupe du reste", "même langage")
**Rebuild** : tout le texte rendu plat sans emphasis colorée

🟢 **DS** : utiliser `<GradientText gradient="primary">` ou `<Text>` avec inline span colorée (token `--color-warning-50` orange)

⚠️ **Action** : extraire les `<u>` ou `<strong>` ou `<span class="highlight-orange">` du Webflow et les mapper en JSX richContent.

---

## [R27] 🚨 CTA banner "wide bandeau" pleine largeur (bleu nuit ou lavender) absent

🔴 **Captures** : multiples Produit + Solutions
🌐 **Live** : CTA intermédiaires/final rendus en **bandeau pleine largeur fond bleu nuit ou lavender** avec heading + 2 boutons
**Rebuild** : section centrée simple sur fond blanc/dégradé OU bouton isolé

**Pages affectées** :
- 4/4 Produit ("Vous voulez l'essayer" sur fond bleu nuit live)
- `solutions/flash-report` "Faites passer votre gouvernance projet"
- `solutions/tableau-de-bord-dsi` "En conclusion" wide banner bleu
- `solutions/tableau-de-bord-gestion-de-projet` "En conclusion"
- `solutions/tableau-de-bord-portefeuille-de-projet` "Automatisez votre reporting" + "En conclusion"
- `solutions/management-de-portefeuille-projet` "Réserver une démo"
- `solutions/revue-de-portefeuille` "Choisissez de gagner du temps"
- `solutions/outils-de-pilotage-projet` "Demander une démo"

🟢 **DS** : `docs/audit-screenshots/21-cta-frame-split.png`
**Storybook** : `Sections / Call to Action / CtaFrame / Split` (variant `onPrimary` / `onLavender`)

---

## [R28] 🚨 CTA bottom "title only" au lieu de full CtaFrame avec subtitle + 2 buttons

🔴 **Captures** : 4/4 LP + multiples Solutions/Équipes
🌐 **Live** : CTA bottom = title + subtitle + **2 boutons CTA** (réserver démo + autre)
**Rebuild** : title only, pas de subtitle, pas de boutons OU bouton solo

**Pages** : LP PPM/PMO/Capacity/PI Planning + Solutions outil-ppm + Équipes outil-pmo

🟢 **DS** : `docs/audit-screenshots/21-cta-frame-split.png`
**Storybook** : `Sections / Call to Action / CtaFrame / Split`

---

## [R29] 🚨 Press logos bar absent en haut de page Équipes (4/4)

🔴 **Captures** : 4/4 Équipes (`comite-direction`, `direction-de-la-transformation`, `it-et-operation`, `outil-pmo`)
🌐 **Live** : barre de 4-5 press logos (Les Échos, JDN, Alliancy, Le Point, LMI…) sous le hero
**Rebuild** : 0 logos visibles

🟢 **DS** : `docs/audit-screenshots/02-logosbar-variant-comparison.png` (variant top : bordered + grayscale presses)
**Storybook** : `UI / LogosBar / Variant Comparison`

---

## [R30] 🚨 Blog metadata (author byline + date + reading time) absent (4/4 articles)

🔴 **Captures** : 4/4 blog audités
🌐 **Live** : sous le hero, byline avec photo author + date + "X min de lecture"
**Rebuild** : aucun metadata visible

🟢 **DS** : `<BlogAuthorTag>` (existing)
**Storybook** : `UI / BlogAuthorTag`

⚠️ **Action** : wire dans `BlogPostPage.tsx` pour extraire et afficher author/date/reading time depuis Strapi/data.

---

## [R31] 🚨 Blog Newsletter signup inline absent (3/4 articles)

🔴 **Captures** : `pi-planning`, `kanban-gestion-de-projet`, `le-grand-guide-de-la-conduite-de-projet`
🌐 **Live** : encart newsletter inline ou en footer ("Recevez nos articles par email")
**Rebuild** : absent

🟢 **DS** : Newsletter signup component (à vérifier — possiblement DS GAP)

---

## [R32] 🚨 Blog TOC sidebar collapsible sticky vs liste inline plate (3/4 articles)

🔴 **Captures** : `pi-planning`, `kanban-gestion-de-projet`, `metier-pmo`
🌐 **Live** : sommaire en sidebar collapsible sticky à gauche
**Rebuild** : liste inline compacte en haut du contenu (TocSidebar mal utilisé)

🟢 **DS** : `<TocSidebar>` (shipped Phase A blog audit)
**Storybook** : `Sections / Blog / TocSidebar`

⚠️ Composant existe — c'est le rebuild qui l'utilise mal (mode inline au lieu de sticky sidebar).

---

## [R33] 🚨 Blog body width étroite ~720px centrée vs full-width (3/4 articles)

🔴 **Captures** : 3/4 blog
🌐 **Live** : column étroite centrée ~720px max, type article magazine
**Rebuild** : full-width — texte va end-to-end sur grand écran

🟢 **DS** : container `max-w-[720px]` ou `<ProseFrame>` avec width contrainte

---

## [R34] 🚨 FAQ icon `!` alerte au lieu de chevron (multiples Produit)

🔴 **Captures** : `produit/capacity-planning`, `reporting-projet` (probablement plus)
🌐 **Live** : chevron simple
**Rebuild** : icône `!` (style alerte) sur chaque item FAQ

🟢 **DS** : vérifier `<FaqAccordion>` ou `<FaqFrame>` styles
**Storybook** : `Sections / FaqFrame / Default`

---

## [R35] 🚨 TestimonialsFrame "press" : cards avec logos clients en header card

🔴 **Captures** : multiples Solutions (`airsaas-experts-transfo`, `management-de-portefeuille`)
🌐 **Live** : cards testimonials press avec **logo client (Saint-Gobain, JCC, Les Échos, JDN) en header de la card**
**Rebuild** : bullets avec dots colorés sans logos

🟢 **DS** : `<TestimonialCompanyCard>` (existing — `UI / TestimonialCompanyCard`)
Variant `press` à passer.

---

## [R36] 🚨 Image badges/labels overlay sur screenshots ("BOOTCAMP de 3 jours", "AIRSAAS TIMING")

🔴 **Captures** : `solutions/airsaas-et-experts-de-la-transfo`
🌐 **Live** : badges overlay sur les images (label coloré en absolute position)
**Rebuild** : images plates sans badges

🟢 **DS** : `<FeatureFrame>` avec prop `imageBadge` — possiblement DS extension

---

## [R37] 🚨 Cards features sans border + shadow + icon container (LP PMO + LP PI Planning)

🔴 **Captures** : LP PMO sections "Coûts à jour" / "Plannings croisées", LP PI Planning sections "Import Jira / Rollup"
🌐 **Live** : cards avec border subtil + shadow + icon dans container coloré
**Rebuild** : icônes flat sans containers, sans border, sans shadow

🟢 **DS** : `<FeatureCard>` avec variants chrome (à vérifier les props)
**Storybook** : `UI / FeatureCard`

---

## [R39] 🚨 META — Renderer `LandingPageV2` rend en JSX inline au lieu d'invoquer les composants DS (BLOQUANT)

🔴 **Captures** : LP 4/4 + Produit 6/6 + Solutions 12/12 + Équipes 4/4 (toutes les pages rendues via `LandingPageV2`)

📍 **Fichier** : `src/components/pages/LandingPageV2.tsx`

**Le bug** : 4 cases du renderer rendent du JSX inline avec raw `<img>`, flex divs, `<Tag muted>` au lieu d'invoquer les composants DS :

| Case | Ligne | Composant DS à invoquer |
|---|---|---|
| `case "logo-bar"` | 256-286 | `<LogosBar>` |
| `case "icon-row"` | 466-500 | `<IconRowFrame>` ou `<ValuePropositionFrame>` |
| `case "trust-badges"` | 502-515 | `<ValuePropositionFrame>` + `<FeatureCard>` |
| `case "cta"` | 454-464 | `<CtaFrame>` si items > 1, sinon `<CtaHighlightFrame>` |

**Impact CRITIQUE** : toutes les DS extensions livrées (LogosBar `variant="plain"` + `preserveColor` + `size`, TestimonialsFrame adaptive grid, Hero `bottomTags`, etc.) sont **inopérantes** parce que le composant n'est jamais appelé.

🟢 **DS** : tous les composants DS canonical (capture #02 LogosBar, #19 IconRowFrame, #21 CtaFrame, etc.) — voir aussi `docs/audit-screenshots/23-lpexamplepage-blueprint.png` qui montre une LP rendue en invoquant les composants DS correctement.
**Storybook référence** : `Pages / LpExamplePage (blueprint) / Default`

⚠️ **Action** : refactor `LandingPageV2.tsx` pour invoquer les composants DS dans chaque case. **Sans ce fix, les patterns R6, R23, R24, R29 et autres ne pourront pas être appliqués** parce que le composant DS n'est même pas appelé.

---

## [R40] 🚨 CTAs intermédiaires générés en boucle (2-4 par page)

🔴 **Captures** : LP 3/4 + Produit 6/6 + Solutions 11/12 + Équipes 2/4 (≥17 pages affectées)
🌐 **Live** : 1 seul CTA outro à la fin

**Pages avec 2-4 CTAs intermédiaires (compte vs live)** :
- `solutions/outils-de-pilotage-projet` : 4 ctas | live = 1
- `solutions/portfolio-management` : 4 ctas | live = 1
- `solutions/gestion-portefeuille-projet` : 4 ctas | live = 1
- `solutions/flash-report` : 2 ctas | live = 1
- `solutions/flash-report-projet` : 2 ctas | live = 1
- `solutions/revue-de-portefeuille` : 2 ctas | live = 1
- + Produit 6/6 (CTAs interstitielles "Vous voulez l'essayer" entre features)

🟢 **DS** : aucun (problème de **parser**, pas de composant)

⚠️ **Cause** : le parser `scripts/migrate/parse-landings-llm.mjs` insère un bloc `cta` après chaque section, créant des CTAs orphelins.

⚠️ **Action** : modifier le parser pour ignorer les CTAs orphelines mid-page ; ne conserver que :
- Le CTA outro final (1 par page)
- Les CTAs explicitement positionnées dans une section (e.g. inline dans un FeatureFrame Bootcamp/Tooling/LPDT)

Distinguer de R27 (CTA banner wide bandeau bleu/lavender = chrome variant du CTA quand il existe) et R28 (CTA bottom title-only sans subtitle/buttons = data incomplet).

---

## [R45] 🚨 Footer copyright row : pas de logo "A" + pas de drapeau 🇫🇷 + year mismatch (4/4 Équipes + LP PPM)

🔴 **Captures (zoom)** :
- `docs/audit-screenshots/zooms/footer-copyright-lp-ppm-rebuild.png` vs `live.png`
- `docs/audit-screenshots/zooms/footer-copyright-equipes-comite-direction-rebuild.png`
- `docs/audit-screenshots/zooms/footer-copyright-equipes-direction-de-la-transformation-rebuild.png`
- `docs/audit-screenshots/zooms/footer-copyright-equipes-it-et-operation-rebuild.png`
- `docs/audit-screenshots/zooms/footer-copyright-equipes-outil-pmo-rebuild.png`

**Confirmé par zoom subagent** :
- Live = `© 2025 AirSaas · Mentions légales · Confidentialité` + **logo "A" AirSaas** + **drapeau 🇫🇷 emoji**
- Rebuild = `© 2026 AirSaas · …` texte plat seul — **pas de logo A, pas de drapeau, year incorrect** (2026 au lieu de 2025)

Pattern identique sur les 4 Équipes auditées + LP PPM → probablement 30/30 pages affectées (Footer rendu globalement).

🟢 **DS** : `<LpFooter>` ou Footer DS — vérifier props `copyrightIcon` (devrait accepter logo + emoji)

⚠️ **Action** : passer logo `<AirsaasIcon />` + emoji 🇫🇷 + year `2025` au copyright row dans le Footer DS.

📌 **Correction par rapport à audit précédent [5.7]** : l'audit du 2026-04-27 disait "comite-direction utilise `<span>FR</span>` au lieu de 🇫🇷". En réalité, **aucune Équipe n'a de drapeau ni de logo** — c'est le Footer entier qui est sous-spécifié. Le `[5.7]` est donc plus large que pensé.

---

## [R44] 🚨 LogosBar clients : logos trop petits + label trop gros/mauvaise couleur + chrome top-curve absent

🔴 **Captures (zoom)** :
- `docs/audit-screenshots/zooms/logosbar-clients-lp-ppm-rebuild.png`
- `docs/audit-screenshots/zooms/logosbar-clients-lp-ppm-live.png`

**Confirmé par zoom subagent** :
- **Logos size** : rebuild = visiblement plus petits que live (KIABI / altavia / VALRHONA / intuis / SNCF)
- **Label "Ils nous font confiance"** :
  - Rebuild = couleur **navy `#1F2462`** + **trop gros / trop bold**
  - Live = couleur **blue brand `#5B70F5`** + **plus modéré**
- **Chrome top-curve** : live a une **forme courbe organique** en haut de la section (transition douce depuis section précédente). Rebuild = transition plate.

🟢 **DS** : `docs/audit-screenshots/03-logosbar-size-comparison.png` (LogosBar size)
**Storybook** : `UI / LogosBar / Size Comparison`

⚠️ **Action** :
- Passer `size="lg"` (LP heroes) au lieu de `"md"` (default) → logos plus grands
- Changer la couleur du label depuis navy vers `--color-primary-50` (blue brand) — token mismatch
- Ajouter chrome top-curve si DS expose un variant `withTopCurve` (sinon DS extension)

---

## [R43] 🚨 Heading colors mismatch transversal — navy au lieu de blue brand

🔴 **Captures (zoom)** : multiples
🌐 **Live** : titres de section utilisent **blue brand `#5B70F5`** (Airsaas blue)
**Rebuild** : titres rendus en **navy `#1F2462`** (couleur trop sombre)

**Confirmé sur zooms** :
- LogosBar clients label "Ils nous font confiance" → cf [R44]
- Integrations heading "Connecté à votre écosystème" → navy au lieu de blue brand
- Probablement présent sur de nombreux H2/H3 à travers le rebuild

🟢 **DS** : `<Heading>` ou `<SectionHeading>` — vérifier le token de couleur par défaut
**Storybook** : `UI / Heading / Default`

⚠️ **Action** : audit transversal des couleurs `text-text-default` / `text-primary-90` vs `text-primary-50` (blue brand) sur tous les headings. Probablement un mauvais token utilisé par défaut dans le DS ou dans le rendu.

---

## [R42] 🚨 Footer chrome COMPLETELY different (rebuild = blanc/violet clair, live = violet solide)

🔴 **Captures** : 4/4 Équipes + probablement toutes les pages (rendered via `LpFooter`)
🌐 **Live** : footer avec **fond violet/indigo solide** + texte blanc + headings stylés
**Rebuild** : footer avec **fond blanc / très-light-violet** + headings bleus + texte foncé

**Confirmé par subagent (zoom captures)** : "Rebuild footer: clean white/very-light-violet bg, blue section headings, dark text. Live footer: solid violet/indigo bg, white text. This is a substantive footer styling divergence."

🟢 **DS** : `<LpFooter>` ou Footer DS — vérifier les variants dans Storybook
**Storybook** : `Layout / LpFooter` ou `Layout / Footer`

⚠️ **Action** : changer le variant Footer pour utiliser le `darkPrimary` ou `solid` (background violet/indigo solide). Vérifier que le DS expose une variant correspondante.

📌 **Note connexe** : la **vérification du copyright icon FR vs 🇫🇷** sur 4/4 Équipes est en cours via re-capture zooms element-level (les 1ères captures avaient cropped au-dessus de la copyright row).

---

## [R41] 🎨 Cards on dark bg dissonance (`ValuePropositionFrame variant="dark"` + `FeatureCard` light)

🔴 **Captures** : 4+ pages avec sections sur fond sombre (primary-70) + cards claires
🌐 **Live** : soit fond clair + cards claires (cohérent), soit fond sombre + cards stylées dark (cohérent)
**Rebuild** : combine `ValuePropositionFrame variant="dark"` (fond primary-70) avec `<FeatureCard>` claires → **chrome dissonance**

**Pages affectées** :
- LP PPM "Pourquoi les équipes adoptent" (section `variant="dark"` avec cards light)
- LP Capacity "10 minutes" + "Notre parti pris"
- LP PMO sections similaires
- + ~2 Solutions

🟢 **DS** : décision pending — 3 options :
- (a) Ne pas utiliser `variant="dark"` quand `<FeatureCard>` light est utilisée → cf `docs/audit-screenshots/12-valuepropositionframe-default.png`
- (b) Ajouter une variante `<FeatureCard variant="on-dark">` (chrome assombri) → DS extension
- (c) Forbid combo via lint rule

⚠️ **Action immediate** : passer `variant="default"` (light bg) sur les pages auditées en attendant la décision DS.

---

## [R38] 🚨 Sections ENTIÈREMENT absentes du rebuild

🔴 **Captures** : multiples
🌐 **Live** : section présente, **rebuild = 0**

**Pages + sections** :
- `lp/capacity-planning` "Notre parti pris" (texte narratif)
- `lp/pi-planning` "Pourquoi pas Jira Align..." (comparison narrative)
- `lp/ppm` "Connecté à votre écosystème" (intégrations grid)
- `equipes/comite-direction` "Synchronisez les programmes"
- `equipes/it-et-operation` CTA "Injection de la méthodologie Airsaas"
- `equipes/it-et-operation` CTA inline "Consultez la méthodologie sans détour"
- `equipes/outil-pmo` CTA "Choisissez de gagner du temps et du contrôle"
- `solutions/outil-ppm` FAQ accordion bottom
- `solutions/management-de-portefeuille-projet` "Connectez des outils complémentaires" (logos integration)
- `solutions/portfolio-management` Logos integrations bar (Microsoft Teams, Slack)

🟢 **DS** : varies (depend on section type) — voir cross-refs aux Rxx applicables

---

# PARTIE 2 — Findings par page

Pour chaque page, captures réelles + findings spécifiques NON couverts par les patterns récurrents.

---

## LP PPM

🔴 `docs/audit-screenshots/pages/lp-ppm/rebuild.png`
🌐 `docs/audit-screenshots/pages/lp-ppm/live.png`

- Hero cassé → cf [R1]
- "Sécurité au top" absente → cf [R13]
- Tabs sous hero "Portfolio/Quarter plan/etc." sont DANS le screenshot Hero, PAS un composant séparé

---

## LP PMO

🔴 `docs/audit-screenshots/pages/lp-pmo/rebuild.png`
🌐 `docs/audit-screenshots/pages/lp-pmo/live.png`

- Hero cassé → cf [R1]
- **Section "De contremaître à coach d'organisation"** : 3 piliers (Moins de reporting / Plus d'impact / Meilleur alignement) rendus en flat icon row, devraient être ValuePropositionFrame Cards ou PillarFrame → cf [R15]
- FAQ titre dédoublé → cf [R12]
- CTA final flat (devrait être Split 2 cards) → cf [R4]
- Bullet dupliqué dans data Kanban "Owner et échéance assignés" 2× au lieu de "Suivi du statut en temps réel"
- Testimonials persona DSI au lieu de PMO (live = Sébastien Louyot + Alexandre F. PMO ; rebuild = Sébastien + Clément Royer DSI Chiesi)

---

## LP CAPACITY-PLANNING

🔴 `docs/audit-screenshots/pages/lp-capacity-planning/rebuild.png`
🌐 `docs/audit-screenshots/pages/lp-capacity-planning/live.png`

- Hero cassé → cf [R1]
- Section "Notre parti pris" (3 piliers) absente entre "Ils ont simplifié leur capacity" et "Sécurité au top"
  🟢 DS : `12-valuepropositionframe-default.png` ou `18-pillarframe-daki.png`
- "Sécurité au top" absente → cf [R13]
- FAQ titre dédoublé → cf [R12]
- CTA final flat → cf [R4]

---

## LP PI-PLANNING

🔴 `docs/audit-screenshots/pages/lp-pi-planning/rebuild.png`
🌐 `docs/audit-screenshots/pages/lp-pi-planning/live.png`

- Hero cassé → cf [R1]
- "Sécurité au top" absente → cf [R13]
- FAQ titre dédoublé → cf [R12]
- CTA final flat → cf [R4]

---

## PRODUIT — automatiser-la-com-projet

🔴 `docs/audit-screenshots/pages/produit-automatiser-la-com-projet/rebuild.png`
🌐 `docs/audit-screenshots/pages/produit-automatiser-la-com-projet/live.png`

- Hero layout incorrect → cf [R2]
- "Un récap' complet et synthétique" : composite image OK, **3 H5 avec flèches absentes** → cf [R7]
- "Nos solutions..." absente → cf [R3]
- CTA final input/search au lieu de bouton centré → cf [R4]

---

## PRODUIT — budget

🔴 `docs/audit-screenshots/pages/produit-budget/rebuild.png`
🌐 `docs/audit-screenshots/pages/produit-budget/live.png`

- Hero layout incorrect → cf [R2]
- **`titleHighlight` = `title`** : tout le titre highlighted, pas de contraste. Live a "Le suivi budgétaire" en noir + "de vos projets" en highlight
- "Nos solutions..." absente → cf [R3]
- CTA input/search → cf [R4]

---

## PRODUIT — capacity-planning

🔴 `docs/audit-screenshots/pages/produit-capacity-planning/rebuild.png`
🌐 `docs/audit-screenshots/pages/produit-capacity-planning/live.png`

- Hero layout incorrect → cf [R2]
- "Estimation des temps" : rebuild affiche un dropdown UI mock (Année/Trimestre/Semestre), live affiche illustration + texte feature standard
  🟢 DS : `10-featureframe-rich-image-right.png`
- "Trouvez le scénario qui fonctionne" : rendu différent du live (tableau manquant)
- "Nos solutions..." absente → cf [R3]
- CTA input/search → cf [R4]

---

## PRODUIT — priorisation-par-equipes

🔴 `docs/audit-screenshots/pages/produit-priorisation-par-equipes/rebuild.png`
🌐 `docs/audit-screenshots/pages/produit-priorisation-par-equipes/live.png`

- Hero layout incorrect → cf [R2]
- FeatureFrames empilés sans alternance zigzag (image-droite/image-gauche)
  🟢 DS : `10-featureframe-rich-image-right.png` (alterner `imagePosition="right"` puis `"left"`)
- "Nos solutions..." absente → cf [R3]
- CTA input/search → cf [R4]

---

## PRODUIT — reporting-projet

🔴 `docs/audit-screenshots/pages/produit-reporting-projet/rebuild.png`
🌐 `docs/audit-screenshots/pages/produit-reporting-projet/live.png`

- **Hero sans imageSrc** → tombé en `centered` au lieu de Hero avec gros dashboard reporting
  🟢 DS : `01-hero-five-trust-badges.png`
- "Plus besoin d'aller à la pêche" : rebuild en split, live en composite (image bandeau full-width avec text dessus) → cf [R7]
- "Nos solutions..." absente → cf [R3]
- CTA input/search → cf [R4]

---

## PRODUIT — traduction-one-click-avec-deepl

🔴 `docs/audit-screenshots/pages/produit-traduction-one-click-avec-deepl/rebuild.png`
🌐 `docs/audit-screenshots/pages/produit-traduction-one-click-avec-deepl/live.png`

- Hero layout incorrect → cf [R2]
- **3 sections cassées** :
  - "Vos chefs de projets et PO vont adorer" : placeholder/empty box gris
  - "Animer une réunion" : placeholder gris (probablement Lottie .json rendu en `<img>` cassé)
  - "Une autre langue vous changera la vie ?" : heading tronqué à "Une" + texte placeholder
  🟢 DS : `08-featureframe-rich-editorial-illustration.png` ou `10-featureframe-rich-image-right.png`
- "Nos solutions..." absente → cf [R3]
- CTA input/search → cf [R4]

---

## SOLUTION — airsaas-et-les-experts-de-la-transfo

🔴 `docs/audit-screenshots/pages/solutions-airsaas-et-les-experts-de-la-transfo/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-airsaas-et-les-experts-de-la-transfo/live.png`

- Testimonials dupliqués (2 blocs "Ils parlent" + "Ils témoignent") au lieu de 1 fusionné → cf [R9]
- 3 FeatureFrames (Bootcamp / Tooling / LPDT) manquent CTA inline distinct
  🟢 DS : `10-featureframe-rich-image-right.png` + bouton CTA dans richContent
- "AirSaas dans le tooling" : image schématique 3 cercles rendue à gauche en 50%, devrait être à droite avec CTA distinct
- RelatedSolutionsFrame absent → cf [R3]

---

## SOLUTION — flash-report

🔴 `docs/audit-screenshots/pages/solutions-flash-report/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-flash-report/live.png`

- Sur-fragmentation Δ +5 → cf [R5]
- "Toutes vos données" rebuild = multi-sections cards verticales, live = IconRowFrame compact
  🟢 DS : `19-iconrowframe-default.png`
- "Choisissez de gagner du temps" → headline isolé sur rebuild, devrait être titre de groupe ValuePropositionFrame
  🟢 DS : `12-valuepropositionframe-default.png`
- "Les bonnes pratiques" rebuild = 4 cards verticales, live = layout horizontal avec icônes
  🟢 DS : `19-iconrowframe-default.png`
- RelatedSolutionsFrame absent → cf [R3]

---

## SOLUTION — flash-report-projet

🔴 `docs/audit-screenshots/pages/solutions-flash-report-projet/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-flash-report-projet/live.png`

- Hero centered sans illustration produit → ajouter `imageSrc`
- Sur-fragmentation Δ +5 → cf [R5]
- Sub-sections "Ergonomique / Enrichi par IA / Intelligent" rebuild = cards séparées, live = groupées sous H2 "Personnalisez votre reporting"
  🟢 DS : `08-featureframe-rich-editorial-illustration.png` (imageSize=narrow)
- "Plus qu'une solution de reporting flash" rebuild = 6 cards image+texte, live = 4 sub-features sous H2 unique
  🟢 DS : `12-valuepropositionframe-default.png`
- Testimonials minimaliste → cf [R9]
- RelatedSolutionsFrame absent → cf [R3]

---

## SOLUTION — gestion-portefeuille-projet

🔴 `docs/audit-screenshots/pages/solutions-gestion-portefeuille-projet/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-gestion-portefeuille-projet/live.png`

- **Page éditoriale long-form transformée en template marketing**
- 6 blocs éditoriaux H2 + paragraphes longs absents :
  - "Distinction PM / PPM"
  - "Historique des outils PPM"
  - "Visions DSI"
  - "Visions opposées" (5 sub)
  - "Où se situe AirSaas dans le spectre"
  - Intro éditoriale "L'outil préféré des DSI"
  🟢 DS : `08-featureframe-rich-editorial-illustration.png` (imageSize=narrow + richContent paragraphes longs)
- "Visions DSI" / "Visions opposées" → utiliser ComparisonFrame narratif → cf [R8]
- RelatedSolutionsFrame absent → cf [R3]

---

## SOLUTION — management-de-portefeuille-projet

🔴 `docs/audit-screenshots/pages/solutions-management-de-portefeuille-projet/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-management-de-portefeuille-projet/live.png`

- Sur-fragmentation Δ +4 → cf [R5]
- "Collaborez entre toutes vos équipes" : rebuild image isolée, live = PillarFrame ou IconRowFrame + narratif
  🟢 DS : `18-pillarframe-daki.png`
- Sub-features "Et si vous repreniez le contrôle" : rebuild = cards plates, live = FeatureFrame narrow
  🟢 DS : `08-featureframe-rich-editorial-illustration.png`
- "Ils parlent de nous" minimaliste → cf [R9]
- RelatedSolutionsFrame absent → cf [R3]

---

## SOLUTION — outil-ppm

🔴 `docs/audit-screenshots/pages/solutions-outil-ppm/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-outil-ppm/live.png`

- **SUR-FRAGMENTATION CRITIQUE Δ +23** → cf [R5] (priorité #1)
- Hero centered sans image, devrait être Hero Split avec dashboard
  🟢 DS : `01-hero-five-trust-badges.png`
- ComparisonFrame Avec/Sans absent → cf [R8]
- PillarFrame DAKI ou 4 piliers manquant
  🟢 DS : `18-pillarframe-daki.png`
- RelatedSolutionsFrame absent → cf [R3]

---

## SOLUTION — outils-de-pilotage-projet

🔴 `docs/audit-screenshots/pages/solutions-outils-de-pilotage-projet/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-outils-de-pilotage-projet/live.png`

- Sur-fragmentation Δ +5 → cf [R5]
- Sub-sections schématiques rendues à 60% au lieu de narrow → cf [R6]
- ComparisonFrame Avec/Sans absent → cf [R8]
- RelatedSolutionsFrame absent → cf [R3]

---

## SOLUTION — portfolio-management

🔴 `docs/audit-screenshots/pages/solutions-portfolio-management/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-portfolio-management/live.png`

- Sur-fragmentation Δ +6 → cf [R5]
- "Une newsletter sponsor" composite image manque les 3 H5 fléchés → cf [R7]
- "Comment épater vos clients sponsors" : rebuild = grosse card centrée, live = FeatureFrame avec image
  🟢 DS : `10-featureframe-rich-image-right.png`
- TestimonialsFrame split → cf [R9]
- RelatedSolutionsFrame absent → cf [R3]

---

## SOLUTION — revue-de-portefeuille

🔴 `docs/audit-screenshots/pages/solutions-revue-de-portefeuille/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-revue-de-portefeuille/live.png`

- Sur-fragmentation Δ +5 → cf [R5]
- "Le tableau de bord" sub-features (Vue tactique, Vue planning…) : rebuild = 5 cards plates, live = grid avec icônes / IconRowFrame
  🟢 DS : `19-iconrowframe-default.png`
- "6 clés" sub-features : rendu en cards plates, devrait être FeatureFrame imageSize=narrow
  🟢 DS : `08-featureframe-rich-editorial-illustration.png`
- RelatedSolutionsFrame absent → cf [R3]

---

## SOLUTION — tableau-de-bord-dsi

🔴 `docs/audit-screenshots/pages/solutions-tableau-de-bord-dsi/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-tableau-de-bord-dsi/live.png`

- Hero centered sans image → ajouter `imageSrc`
- "Choisissez bien vos indicateurs" + "Construisez votre tableau de bord DSI" : illustrations 60% au lieu de narrow 33% → cf [R6]
- ComparisonFrame Avec/Sans absent → cf [R8]
- RelatedSolutionsFrame absent → cf [R3]

---

## SOLUTION — tableau-de-bord-gestion-de-projet

🔴 `docs/audit-screenshots/pages/solutions-tableau-de-bord-gestion-de-projet/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-tableau-de-bord-gestion-de-projet/live.png`

- "Pilotez par la data" sub-features : rebuild = cards verticales, live = layout horizontal IconRow
  🟢 DS : `19-iconrowframe-default.png`
- "Comment choisir les indicateurs" sub-features (illustrations) : rebuild = cards plates, devrait être FeatureFrame narrow → cf [R6]
- RelatedSolutionsFrame absent → cf [R3]

---

## SOLUTION — tableau-de-bord-portefeuille-de-projet

🔴 `docs/audit-screenshots/pages/solutions-tableau-de-bord-portefeuille-de-projet/rebuild.png`
🌐 `docs/audit-screenshots/pages/solutions-tableau-de-bord-portefeuille-de-projet/live.png`

- Sur-fragmentation Δ +5 → cf [R5]
- "Personnalisez vos vues" sub-features : rebuild = cards plates, live = layout horizontal IconRow
  🟢 DS : `19-iconrowframe-default.png`
- "Les clés de réussite" / "Construisez votre tableau de bord" : illustrations 60% au lieu de narrow 33% → cf [R6]
- TestimonialsFrame split → cf [R9]
- RelatedSolutionsFrame absent → cf [R3]

---

## ÉQUIPES — comite-direction

🔴 `docs/audit-screenshots/pages/equipes-comite-direction/rebuild.png`
🌐 `docs/audit-screenshots/pages/equipes-comite-direction/live.png`

- KPIs inventés → cf [R11] + [R14] (audit précédent [5.1])
- "7 raisons" ComparisonTableFrame mauvais composant → cf [R8] + [R14]
- Slider Industries absent → cf [R10]
- TestimonialsFrame split en 2 blocs → cf [R9] + [R14]
- Footer "FR" au lieu de 🇫🇷 (uniquement sur cette page) → 1-line fix
- RelatedSolutionsFrame ajouté (n'existe pas en live) → à supprimer

---

## ÉQUIPES — direction-de-la-transformation

🔴 `docs/audit-screenshots/pages/equipes-direction-de-la-transformation/rebuild.png`
🌐 `docs/audit-screenshots/pages/equipes-direction-de-la-transformation/live.png`

- Stats KPIs inventés (chiffres + label "Merci" mappé incorrectement) → cf [R11]
- ComparisonTableFrame "Améliorer en continu" mauvais composant → cf [R8]
- Slider Industries absent → cf [R10]
- TestimonialsFrame fusion press+LinkedIn manquante → cf [R9]
- CTA "Laissez nos clients vous parler" manquant en bas
- "Airsaas s'intègre à vos outils" : rendu différent du live

---

## ÉQUIPES — it-et-operation

🔴 `docs/audit-screenshots/pages/equipes-it-et-operation/rebuild.png`
🌐 `docs/audit-screenshots/pages/equipes-it-et-operation/live.png`

- KPIs inventés "56% / 3min / 50 / 4×" → cf [R11]
- ComparisonTableFrame "Gagnez du temps" mauvais composant → cf [R8]
- Slider Industries absent → cf [R10]
- TestimonialsFrame split → cf [R9]
- Section "La méthodologie aux mains des équipes" : titre différent du live
- "Le podcast CIO Révolution" : positionnement différent

---

## ÉQUIPES — outil-pmo

🔴 `docs/audit-screenshots/pages/equipes-outil-pmo/rebuild.png`
🌐 `docs/audit-screenshots/pages/equipes-outil-pmo/live.png`

- "Les chiffres qui vous feront adopter AirSaas" : section présente mais valeurs à valider/sourcer → cf [R11]
- ComparisonTableFrame "Et si vous repreniez le contrôle" mauvais composant → cf [R8]
- **"Le replay à ne pas manquer" Aurore Butrot × Asana** totalement absente (bloc visuel central avec photo + logo Asana + lien Vidyard)
  🟢 DS : `21-cta-frame-split.png` ou nouveau pattern Video CTA
- Slider Industries absent → cf [R10]
- TestimonialsFrame split → cf [R9]
- Hero ratio image légèrement différent du live

---

## BLOG — pi-planning

🔴 `docs/audit-screenshots/pages/blog-pi-planning/rebuild.png`
🌐 `docs/audit-screenshots/pages/blog-pi-planning/live.png`

- 4-5 quotes pas rendus → cf [R18]
- Related grid (3 cartes) remplacé par CTA orange → cf [R19]
- Hero/cover image manquante : live a une cover image après le hero foncé, rebuild n'en affiche pas
- TOC/sommaire compressé en rebuild vs aéré centré en live
  🟢 DS : Storybook `Sections / Blog / TocSidebar`

---

## BLOG — kanban-gestion-de-projet

🔴 `docs/audit-screenshots/pages/blog-kanban-gestion-de-projet/rebuild.png`
🌐 `docs/audit-screenshots/pages/blog-kanban-gestion-de-projet/live.png`

- Pas de quotes en live (cas OK)
- Related grid (4 cartes) remplacé par CTA orange → cf [R19]
- Hero rebuild = clair avec image inline droite ; live = hero foncé + cover image dessous
- Inline images / illustrations diffèrent (board Kanban présent en live, différent en rebuild)

---

## BLOG — metier-pmo

🔴 `docs/audit-screenshots/pages/blog-metier-pmo/rebuild.png`
🌐 `docs/audit-screenshots/pages/blog-metier-pmo/live.png`

- 2 quotes en live pas rendus en rebuild → cf [R18]
- 1-2 InsightCallout "À noter" en live, paragraphes plats en rebuild → cf [R20]
- Tableau comparatif rendu en liste/paragraphe → cf [R21]
- Related grid (2-3 cartes) remplacé par CTA orange → cf [R19]

---

## BLOG — le-grand-guide-de-la-conduite-de-projet

🔴 `docs/audit-screenshots/pages/blog-le-grand-guide-de-la-conduite-de-projet/rebuild.png`
🌐 `docs/audit-screenshots/pages/blog-le-grand-guide-de-la-conduite-de-projet/live.png`

- 3-4 quotes en live pas rendus en rebuild → cf [R18]
- Inline images / diagrammes (pyramide rouge, schémas) tronqués ou repositionnés en rebuild
- Encart bleu produit AirSaas inline absent en rebuild → cf [R22]
- Related grid (3 cartes avec image) remplacé par CTA orange → cf [R19]

---

# PARTIE 3 — Index des captures DS canonical

23 captures dans `docs/audit-screenshots/` :

| # | Pattern visuel | Storybook path |
|---|---|---|
| 01 | Hero — eyebrow + bottomTags + image | `Sections / Hero / Five Trust Badges` |
| 02 | LogosBar — bordered+gray vs plain+colored | `UI / LogosBar / Variant Comparison` |
| 03 | LogosBar — md vs lg | `UI / LogosBar / Size Comparison` |
| 04 | TestimonialsFrame — grid adaptatif (1/2/3 cols) | `Sections / TestimonialsFrame / Adaptive Grid` |
| 05 | TestimonialsFrame — press + LinkedIn fusionnés | `Sections / TestimonialsFrame / Mixed Press And Personal` |
| 06 | ComparisonFrame — Avec/sans narratif numéroté | `Sections / Comparison Sections / ComparisonFrame / Default` |
| 07 | ComparisonTableFrame — feature matrix | `Sections / Comparison Sections / ComparisonFrame / Table` |
| 08 | FeatureFrame — narrow 33% (illustration) | `Sections / Features Sections / FeatureFrame / Rich Text / Editorial Illustration` |
| 09 | FeatureFrame — 1 image composite + 3 flèches | `Sections / Features Sections / FeatureFrame / Rich Text / Composite Image With Arrowed Text` |
| 10 | FeatureFrame — default 60% (screenshot) | `Sections / Features Sections / FeatureFrame / Rich Text / Image Right` |
| 11 | StepsFrame — zigzag numbered | `Sections / Value Proposition Sections / StepsFrame / Lp Ppm Deployment` |
| 12 | ValuePropositionFrame — cards on light bg | `Sections / Value Proposition Sections / ValuePropositionFrame / Cards / Default` |
| 13 | RelatedSolutionsFrame — grid 3 solutions | `Sections / CTA Sections / RelatedSolutionsFrame / Default Three Solutions` |
| 14 | BlogRelatedFrame — 3 articles featured | `Sections / Blog / BlogRelatedFrame / Default Three Articles` |
| 15 | RelatedArticlesFrame — text-link list | `Sections / Blog / RelatedArticlesFrame / Default` |
| 16 | Quote — pull-quote bloc | `UI / Quote / Default` |
| 17 | InsightCallout — encadré insight | `UI / InsightCallout / Default` |
| 18 | PillarFrame DAKI — 4 piliers horizontaux | `Sections / Value Proposition Sections / ValuePropositionFrame / Pillars / DAKI` |
| 19 | IconRowFrame — bandeau icônes labels | `Sections / Value Proposition Sections / ValuePropositionFrame / Icons / Default` |
| 20 | TabsFrame — anchor tabs LP hero-adjacent | `Sections / Navigation Sections / TabsFrame / Lp Six Tabs` |
| 21 | CtaFrame Split — 2 cards CTA | `Sections / Call to Action / CtaFrame / Split` |
| 22 | BlogCollectionFrame — grid d'articles | `Sections / BlogCollectionFrame / Default` |
| 23 | LpExamplePage — blueprint LP entière (référence META renderer) | `Pages / LpExamplePage (blueprint) / Default` |

---

# Stats globales

- **Pages auditées visuellement** : 30 (LP 4 + Produit 6 + Solutions 12 + Équipes 4 + Blog 4) en 2 passes (audit initial + verification finale exhaustive)
- **Captures rebuild** : 30 (localhost:3000)
- **Captures live** : 30 (airsaas.io / Webflow)
- **DS canonical** : 23 (Storybook)
- **Patterns récurrents identifiés** : **45 (R1–R45)** — 22 du premier pass + 16 ajoutés en verification exhaustive + 7 ajoutés en cross-check + zooms element-level
- **Pages OK 100%** : 0/30
- **Captures supplémentaires** : 24 zooms element-level dans `docs/audit-screenshots/zooms/` pour vérifier LogosBar, integrations, footer
- **Top 10 actions critiques** :
  1. **R39** Fix renderer `LandingPageV2.tsx` (4 cases inline) — **DÉBLOQUE TOUTES LES DS EXTENSIONS**
  2. **R1** Fix Hero LP (4/4) — eyebrow + image + trust badges manquants
  3. **R42** Footer chrome — refactor variant (rebuild = white card → live = indigo solid)
  4. **R23** Hero "on dark blue + halo" — 4-5 Produit + 3 Solutions tableau-de-bord
  5. **R43** Heading colors brand mismatch (navy au lieu de blue) — transversal
  6. **R19** Wire `trendingGrid` blog `[slug]/page.tsx` — débloque 15 articles + tout `/gestion-de-projet/`
  7. **R24** Eyebrow "orange dot + label" sur features — 5+ Produit + Solutions
  8. **R25** Inline hyperlinks — 4+ Solutions long-form + 4/4 Blog (casse SEO interne)
  9. **R5** Fix sur-fragmentation parser sur Solutions (Δ +5 moyen, +23 sur outil-ppm)
  10. **R45** Footer copyright row — logo A + 🇫🇷 + year 2025 (probablement 30/30 pages)

# Références docs

- `docs/AGENT_ONBOARDING.md` (entry point + §11 patterns table review log)
- `docs/audit-lp-rebuild-2026-04-27.md` (audit précédent — 8/9 findings persistants Comité Direction)
- `docs/ds-components-reference.md` (47 composants DS + contracts)
- `docs/ds-rules.md` (5 golden rules)
- `docs/live-captures/{type}/{slug}.md` (ground truth Webflow)

# Scripts utiles

```bash
# Re-générer les 23 captures DS canonical
node scripts/capture-ds-canonical.mjs

# Re-capturer les 26 pages rebuild + live (nécessite npm run dev sur :3000)
node scripts/capture-rebuild-vs-live.mjs

# Capturer 1 page seule
node scripts/capture-rebuild-vs-live.mjs ppm
```
