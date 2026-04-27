# QA combined report — regex + LLM

**Date** : 2026-04-27T14:26:49.509Z

**Total** : 88 pages — **52 PASS** / 10 WARN / 26 BLOCK

**Severity totals** :
- Regex : P0 = 0, P1 = 2
- LLM : P0 = 39, P1 = 309

## Stats by type

| Type | Total | PASS | WARN | BLOCK |
|---|---|---|---|---|
| lp | 4 | 3 | 1 | 0 |
| produit | 6 | 3 | 0 | 3 |
| solution | 12 | 2 | 5 | 5 |
| equipe | 4 | 1 | 0 | 3 |
| blog | 62 | 43 | 4 | 15 |

## P0 issues — must fix before ship

### `produit/automatiser-la-com-projet`

- **LLM** content @ "Vous n'entendrez bientôt plus ces phrases ..." section : The section title promises a list of recurring complaints/phrases users won't hear anymore, but the body contains zero such phrases — instead it repeats the sponsor onboarding description. The entire pain-point content block is missing.
- **LLM** content @ Feature sections ("Vous n'entendrez bientôt plus ces phrases" and split section) : The heading 'Ajoutez les sponsors sur vos projets' and its body copy appear verbatim twice back-to-back — once in the centered section and once in the left/right split section. This is clear content duplication suggesting the rest of the feature list was never rendered.

### `produit/capacity-planning`

- **LLM** content @ Section 'Mise en place rapide, simple à maintenir dans le temps' : The section body is visibly truncated: it reads 'nous avons pris le parti suivant :' and then immediately 'Voici comment nous le concrétisons.' with no actual content between the two sentences. The key value proposition (the parti pris) is missing entirely.
- **LLM** content @ Section 'Une vue simple et actionnable' : The paragraph ends with 'pour prendre les décisions :' followed by two non-breaking-space placeholder paragraphs (‍‍) and nothing else. The actual list of decisions is absent — the section is effectively empty.

### `produit/traduction-one-click-avec-deepl`

- **LLM** content @ Section 2 h2 / 'Le rapport flash désormais enmultilingue' : The H2 heading reads 'enmultilingue' (no space) — a word-break bug that renders as a single unrecognised word on screen. This is distinct from the Webflow source quirk allowance because it appears in a rendered heading, not inside a <strong> tag.

### `solution/flash-report`

- **LLM** content @ Section 'Plus qu'une solution de reporting flash' : The paragraph reads 'En du flash report automatisé, les autres fonctionnalités AirSaas…' — the sentence is grammatically broken and truncated mid-thought. The word 'En' is followed by nothing meaningful, making the copy unintelligible to users.

### `solution/gestion-portefeuille-projet`

- **LLM** content @ Section 'Avancez plus sereinement avec votre équipe' : This section contains only an H2 heading with no body content, features, cards, or supporting copy. It renders as a completely empty section visible to users, suggesting the content block failed to render.
- **LLM** content @ Section 'Rapide historique des outils de gestion de portefeuille de projets' : This H2 section heading has no body content beneath it — the historical context paragraph appears in a separate orphaned section that follows but has no heading association, breaking the narrative and leaving this section visually empty.

### `solution/management-de-portefeuille-projet`

- **LLM** content @ Feature section — 'Une planification stratégique simplifiée grâce à votre vue macro' : This section reuses the same image (Portfolio project timeline view.webp) as the 'La vue timeline' section further down. The macro/dashboard feature block should show a portfolio dashboard screenshot, not the timeline Gantt view — the wrong image is being displayed.

### `solution/portfolio-management`

- **LLM** content @ Section 'Un capacity planning par équipe simple et actionnable' : The section body is truncated mid-sentence: 'Grâce à cette vue vous avez les bases d'une discussion pragmatique pour prendre les décisions :' ends with a colon followed only by two Webflow zero-width-space paragraphs (‍). The promised list/content never appears, leaving users with an incomplete, broken section.

### `solution/outils-de-pilotage-projet`

- **LLM** structure @ Second section after hero — 'Valorisez le travail de votre équipe' : This section contains only an H2 heading with no body copy, image, list, or CTA. It is a stub/empty section that renders as a lone heading with large vertical padding, which looks broken to any visitor.
- **LLM** structure @ Section with bullet list — 'Respecter les objectifs de chaque équipe…' : This section renders a bullet list with no heading or introductory sentence to contextualise it. The first bullet also contains a missing space: 'Respecter lesobjectifs' (word boundary missing between 'les' and 'objectifs'). The orphaned list with no heading makes the content structure incomprehensible.

### `equipe/comite-direction`

- **LLM** structure @ Page URL: /fr/equipes/comite-direction — URL path vs. page content : The URL slug is '/equipes/comite-direction' (teams/executive committee) but the page is a product landing page for CODIR governance, not an 'équipe' (team/about) page. This creates a structural mismatch — the URL implies a company team/people page, but the content is a product solution page, which would confuse users and harm SEO.

### `equipe/it-et-operation`

- **LLM** functional @ Hero CTA button : The primary CTA 'Réservez une démo' links to '/fr/meetings-pages' which appears to be an internal page route, but the nav 'Demander une démo' button also links to the same '/fr/meetings-pages'. If this route is a stub or not yet built, the main conversion CTA is broken.

### `equipe/outil-pmo`

- **LLM** structure @ H1 — hero section : The H1 text reads 'L'outil PPMpour un PMO moderne' — there is a missing space between 'PPM' and 'pour', making it render as 'PPMpour' on the page.

### `blog/budgetiser-un-projet-sans-se-louper`

- **LLM** content @ Section 'Retour d'expérience du CIO d'Adeo' — aside callout : The callout box contains raw unfilled CMS template instructions verbatim: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This placeholder text is fully visible to end users and must be replaced with real content.

### `blog/cadrage-projet`

- **LLM** content @ Aside callout boxes (×2) — 'Cadrage : l'importance d'un autre rapport au temps' section : Two 'À retenir' callout boxes contain raw Webflow CMS placeholder text: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This is an unfilled template stub, visible to all users.

### `blog/comite-de-pilotage-definitions-et-incomprehensions`

- **LLM** content @ "À retenir" callout boxes (×3 occurrences in blog body) : All three 'À retenir' aside boxes display raw CMS template instructions verbatim: "Speaker avatar: insert the link to the speaker page between: href=\"https://LINK_SPEAKER_PAGE\"…". This is unfilled placeholder content visible to every reader and must be replaced with actual key takeaways before shipping.

### `blog/comment-decider-en-copil`

- **LLM** content @ Aside callout — first 'À retenir' block (under Lionel M. quote) : The quote attributed to Lionel M. is truncated mid-sentence: '…on fait' — the rest of the text is missing. A reader sees an incomplete thought inside a highlighted callout block, which looks like a critical content bug.
- **LLM** content @ Aside callout — 'À retenir' block (OCTO Tech section) : The OCTO Tech quote is truncated mid-sentence: '…mais nous' — the rest of the text is cut off. Same pattern as above; the callout component is not rendering or receiving the full content.

### `blog/gestion-de-portefeuille-projet-pme`

- **LLM** content @ Aside callout boxes 'À retenir' (multiple instances in article body) : All 'À retenir' callout boxes contain unformatted template placeholder text ('Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE"…') instead of actual editorial content. This stub content appears at least 3 times in the visible portion of the article and is fully user-visible.

### `blog/le-diagramme-de-gantt-comment-sen-servir`

- **LLM** layout @ CTA section – animated floating card : The CTA button wrapper has 'opacity-0 scale-[0.92]' with no JS-triggered class change visible in the static HTML, meaning the 'Réserver une démo' CTA button renders invisible (opacity-0) on page load. Users cannot see or click the primary conversion CTA.

### `blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0`

- **LLM** content @ Section 'La supply chain débute avec les fournisseurs' — À retenir callout : The pull-quote is visibly truncated mid-word: '…pour résoudre leurs pro'. The source content was not fully rendered into the callout component, leaving an incomplete sentence displayed to users.
- **LLM** content @ Section 'Le défi de construire sa propre chaîne de production' — À retenir callout : The pull-quote is truncated mid-word: '…car des bancs te'. Same rendering failure as the first callout; source quote was not fully populated.
- **LLM** content @ Section '30 ans pour optimiser la supply chain' — À retenir callout : The pull-quote ends abruptly: '…notamment grâce à l'arrivée de l'automatisation' with no closing punctuation or conclusion, indicating truncation of the source quote.

### `blog/pi-safe`

- **LLM** content @ First 'À retenir' aside (after benefits list) : The callout text is visibly truncated mid-sentence: '…on se focalise sur pourquoi on fait ce pr' — the sentence ends abruptly, indicating a rendering/data-truncation bug in the aside component.
- **LLM** content @ Second 'À retenir' aside (after strategic vision section) : Text is again truncated mid-sentence: '…Il peut s'agir d'une nouvelle réglementation à suivre, de projet' — the aside content is cut off and never finishes, a repeated pattern suggesting the aside component is not rendering full CMS content.
- **LLM** content @ Third 'À retenir' aside (after blocages section) : Text truncated mid-sentence: '…et une estimation "' — sentence ends with an unclosed quotation mark. The aside rendering pipeline is systematically cutting content short across all callout boxes.

### `blog/pilotage-de-projet`

- **LLM** content @ Aside 'À retenir' blocks (multiple occurrences) : All three 'À retenir' callout boxes contain raw Webflow CMS placeholder instructions: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This is unfinished template content visible to end users.

### `blog/management-de-portefeuille-de-projet`

- **LLM** content @ Blog hero — author avatar/name mismatch : The author avatar image URL contains 'Avatar%20Je%CC%81ro%CC%82me' (i.e., Jérôme) but the displayed name is 'Jonas Roman'. The image and the name do not match the same person, which is a factual error visible to every reader.

### `blog/pi-planning`

- **LLM** content @ First 'À retenir' callout block (before H3 'Qu'est-ce qu'un PI Planning ?') : The expert quote is visibly truncated mid-sentence: '…ils apportent aussi leurs bonnes pratiques' — the sentence has no ending punctuation and the quote body is cut off. This is user-visible incomplete content at the very top of the article body.
- **LLM** content @ Second 'À retenir' callout block (after PI Planning definition paragraph) : Expert quote is truncated mid-word: '…c'est que les gens qui y participent sont ceux qui y mett' — sentence cuts off before completion, clearly broken copy visible to readers.

### `blog/pourquoi-vos-18-millions`

- **LLM** content @ First 'À retenir' callout box : The bullet point copy is visibly truncated mid-sentence: '…Sauf qu'on fait 500 millions de C' — the sentence cuts off abruptly, leaving an incomplete and meaningless statement visible to users.
- **LLM** content @ Third 'À retenir' callout box (L'illusion du pilotage stratégique section) : The quote is truncated mid-word: '…Trois semaines dans une organisation de 2 100 personnes. Chief' — the speaker's title/name is cut off, making the attribution incomplete and the callout look broken.
- **LLM** content @ Bottom of page HTML (truncated at 'Nous partageons la même stratégie, mais no') : The page HTML is truncated mid-sentence in the last visible 'À retenir' callout, suggesting the render or SSR output is being cut off — remaining sections including the Quarter Plan and conclusion sections may be missing entirely from the rendered output.

### `blog/portefeuille-projet`

- **LLM** content @ Blog hero — author badge : The author avatar image (filename 'Avatar Jérôme') is mismatched with the displayed name 'Jonas Roman'. Either the image belongs to Jérôme (the real author) or 'Jonas Roman' is a placeholder name; a human reader sees the wrong person's photo next to the wrong name.

### `blog/program-increment-planning`

- **LLM** content @ First 'À retenir' callout box (before H3 'Qu'est-ce qu'un PI Planning ?') : The callout quote is visibly truncated mid-sentence: 'Ils apportent aussi leurs bonnes pratiques' ends without completing the thought. This appears to be a CMS rich-text rendering bug where the expert quote is cut off before its full content.
- **LLM** content @ Second 'À retenir' callout box (after PI Planning definition paragraph) : Expert quote is cut off mid-sentence: '…c'est que les gens qui y participent sont ceux qui y mett' — the word 'mettent' and the rest of the quote are missing. This is a visible truncation bug in the rendered output.

### `blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets`

- **LLM** content @ Aside / callout block 'À retenir' : The 'À retenir' callout contains raw Webflow CMS template placeholder text: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This is an unfilled stub that is fully visible to users.


## All pages

| Slug | Type | Status | Regex P0 | Regex P1 | LLM P0 | LLM P1 |
|---|---|---|---|---|---|---|
| `automatiser-la-com-projet` | produit | BLOCK | 0 | 0 | 2 | 3 |
| `capacity-planning` | produit | BLOCK | 0 | 0 | 2 | 3 |
| `traduction-one-click-avec-deepl` | produit | BLOCK | 0 | 0 | 1 | 5 |
| `flash-report` | solution | BLOCK | 0 | 0 | 1 | 4 |
| `gestion-portefeuille-projet` | solution | BLOCK | 0 | 0 | 2 | 4 |
| `management-de-portefeuille-projet` | solution | BLOCK | 0 | 0 | 1 | 4 |
| `portfolio-management` | solution | BLOCK | 0 | 0 | 1 | 4 |
| `outils-de-pilotage-projet` | solution | BLOCK | 0 | 0 | 2 | 4 |
| `comite-direction` | equipe | BLOCK | 0 | 0 | 1 | 4 |
| `it-et-operation` | equipe | BLOCK | 0 | 0 | 1 | 3 |
| `outil-pmo` | equipe | BLOCK | 0 | 0 | 1 | 4 |
| `budgetiser-un-projet-sans-se-louper` | blog | BLOCK | 0 | 0 | 1 | 2 |
| `cadrage-projet` | blog | BLOCK | 0 | 0 | 1 | 3 |
| `comite-de-pilotage-definitions-et-incomprehensions` | blog | BLOCK | 0 | 0 | 1 | 3 |
| `comment-decider-en-copil` | blog | BLOCK | 0 | 0 | 2 | 3 |
| `gestion-de-portefeuille-projet-pme` | blog | BLOCK | 0 | 0 | 1 | 3 |
| `le-diagramme-de-gantt-comment-sen-servir` | blog | BLOCK | 0 | 0 | 1 | 5 |
| `la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0` | blog | BLOCK | 0 | 0 | 3 | 3 |
| `pi-safe` | blog | BLOCK | 0 | 0 | 3 | 2 |
| `pilotage-de-projet` | blog | BLOCK | 0 | 0 | 1 | 5 |
| `management-de-portefeuille-de-projet` | blog | BLOCK | 0 | 0 | 1 | 3 |
| `pi-planning` | blog | BLOCK | 0 | 0 | 2 | 4 |
| `pourquoi-vos-18-millions` | blog | BLOCK | 0 | 0 | 3 | 3 |
| `portefeuille-projet` | blog | BLOCK | 0 | 0 | 1 | 2 |
| `program-increment-planning` | blog | BLOCK | 0 | 0 | 2 | 4 |
| `trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `pi-planning` | lp | WARN | 0 | 0 | 0 | 5 |
| `airsaas-et-les-experts-de-la-transfo` | solution | WARN | 0 | 0 | 0 | 5 |
| `flash-report-projet` | solution | WARN | 0 | 0 | 0 | 5 |
| `outil-ppm` | solution | WARN | 0 | 0 | 0 | 6 |
| `tableau-de-bord-gestion-de-projet` | solution | WARN | 0 | 0 | 0 | 5 |
| `tableau-de-bord-dsi` | solution | WARN | 0 | 0 | 0 | 5 |
| `analyse-des-risques-projet` | blog | WARN | 0 | 0 | 0 | 5 |
| `capacity-planning` | blog | WARN | 0 | 0 | 0 | 5 |
| `comment-animer-un-comite-de-pilotage` | blog | WARN | 0 | 1 | 0 | 4 |
| `demarche-de-projet` | blog | WARN | 0 | 0 | 0 | 5 |
| `capacity-planning` | lp | PASS | 0 | 0 | 0 | 4 |
| `pmo` | lp | PASS | 0 | 0 | 0 | 3 |
| `ppm` | lp | PASS | 0 | 0 | 0 | 4 |
| `budget` | produit | PASS | 0 | 0 | 0 | 4 |
| `reporting-projet` | produit | PASS | 0 | 0 | 0 | 3 |
| `priorisation-par-equipes` | produit | PASS | 0 | 0 | 0 | 3 |
| `revue-de-portefeuille` | solution | PASS | 0 | 0 | 0 | 3 |
| `tableau-de-bord-portefeuille-de-projet` | solution | PASS | 0 | 0 | 0 | 4 |
| `direction-de-la-transformation` | equipe | PASS | 0 | 0 | 0 | 3 |
| `budget-previsionnel-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `10-pratiques-pour-developper-la-relation-de-confiance-dg-cio` | blog | PASS | 0 | 0 | 0 | 3 |
| `appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management` | blog | PASS | 0 | 0 | 0 | 4 |
| `chef-de-projet-pmo` | blog | PASS | 0 | 0 | 0 | 0 |
| `capacity-planning-definition` | blog | PASS | 0 | 0 | 0 | 3 |
| `comite-pilotage-projet` | blog | PASS | 0 | 0 | 0 | 2 |
| `chef-de-projet-transverse` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-elaborer-un-reporting-efficace` | blog | PASS | 0 | 0 | 0 | 3 |
| `comment-animer-un-bilan-projet-efficace` | blog | PASS | 0 | 0 | 0 | 3 |
| `comment-faire-un-bon-point-davancement-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022` | blog | PASS | 0 | 0 | 0 | 2 |
| `comment-gerer-lagressivite-dans-les-comites-de-pilotage` | blog | PASS | 0 | 0 | 0 | 3 |
| `comment-mettre-en-place-un-comite-de-pilotage` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-mettre-une-bonne-meteo-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-reussir-un-projet-transverse` | blog | PASS | 0 | 0 | 0 | 3 |
| `comment-mettre-en-place-un-pmo` | blog | PASS | 0 | 0 | 0 | 3 |
| `fiche-projet-exemple-et-methodologie` | blog | PASS | 0 | 0 | 0 | 3 |
| `copil-projet-ou-comite-de-pilotage-projet-les-bases` | blog | PASS | 0 | 0 | 0 | 3 |
| `jalon-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `kanban-gestion-de-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `kpi-gestion-de-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `la-revue-de-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `gestion-portefeuille-projets-vs-gestion-de-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `le-modele-de-presentation-pour-votre-comite-de-pilotage` | blog | PASS | 0 | 0 | 0 | 4 |
| `le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation` | blog | PASS | 0 | 0 | 0 | 2 |
| `le-guide-du-mode-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes` | blog | PASS | 0 | 0 | 0 | 3 |
| `le-grand-guide-de-la-conduite-de-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `lean-portfolio-management` | blog | PASS | 0 | 1 | 0 | 3 |
| `macro-planning` | blog | PASS | 0 | 0 | 0 | 4 |
| `metier-pmo` | blog | PASS | 0 | 0 | 0 | 4 |
| `plan-capacitaire` | blog | PASS | 0 | 0 | 0 | 4 |
| `planification-de-la-demande-capacity-planning` | blog | PASS | 0 | 0 | 0 | 4 |
| `planification-de-la-capacite` | blog | PASS | 0 | 0 | 0 | 4 |
| `plan-de-communication-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `pourquoi-mettre-en-place-un-pmo` | blog | PASS | 0 | 0 | 0 | 3 |
| `preparer-comite-de-pilotage-d-un-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `role-du-pmo` | blog | PASS | 0 | 0 | 0 | 3 |
| `reporting-pmo` | blog | PASS | 0 | 0 | 0 | 4 |
| `project-portfolio-management` | blog | PASS | 0 | 0 | 0 | 3 |
| `retour-sur-agile-en-seine-2023` | blog | PASS | 0 | 0 | 0 | 0 |
| `tout-savoir-sur-la-note-de-cadrage-projet` | blog | PASS | 0 | 0 | 0 | 3 |
