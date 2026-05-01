# QA combined report — regex + LLM

**Date** : 2026-04-28T12:17:13.219Z

**Total** : 88 pages — **54 PASS** / 10 WARN / 24 BLOCK

**Severity totals** :
- Regex : P0 = 0, P1 = 2
- LLM : P0 = 44, P1 = 313

## Stats by type

| Type | Total | PASS | WARN | BLOCK |
|---|---|---|---|---|
| lp | 4 | 3 | 1 | 0 |
| produit | 6 | 4 | 0 | 2 |
| solution | 12 | 2 | 3 | 7 |
| equipe | 4 | 2 | 0 | 2 |
| blog | 62 | 43 | 6 | 13 |

## P0 issues — must fix before ship

### `produit/automatiser-la-com-projet`

- **LLM** content @ Page body / main content sections : The page body contains only two sections: the hero and a single feature block ('Ajoutez les sponsors sur vos projets'), then jumps directly to the footer. The live page has multiple feature sections explaining the health-check email product. The rebuild is missing the vast majority of page content, making this page essentially a stub.

### `produit/capacity-planning`

- **LLM** content @ Section 'Mise en place rapide, simple à maintenir dans le temps' : The section body is truncated mid-thought: it announces 'nous avons pris le parti suivant :' but the actual parti/approach is never stated, then jumps to 'Voici comment nous le concrétisons.' with no preceding content. The core message is missing — this reads as a stub with placeholder copy.

### `solution/flash-report`

- **LLM** content @ Section 'Plus qu'une solution de reporting flash : une solution de gouvernance projet complète' : The paragraph body reads 'En du flash report automatisé…' — this is clearly truncated/broken copy. The sentence is missing a word after 'En' (likely 'dehors du' or 'plus du'), making the sentence grammatically broken and nonsensical to readers.

### `solution/management-de-portefeuille-projet`

- **LLM** content @ Section 'Les 5 règles d'or d'un bon management de portefeuille projet' : The heading promises '5 règles d'or' but the section body contains only a single intro paragraph — the five rules themselves are entirely missing. This is a stub/incomplete section visible to all users.

### `solution/outil-ppm`

- **LLM** structure @ Hero section / page top : The hero section contains no image, screenshot, or visual illustration of the product — the section renders as pure text with a single CTA button and large empty white space below, making the page feel broken and incomplete compared to a typical solution landing page.

### `solution/portfolio-management`

- **LLM** content @ Section 'Un capacity planning par équipe simple et actionnable' : The section body ends with a dangling colon ('pour prendre les décisions :') indicating a list or bullet points should follow, but no content renders. The capacity planning feature content (charts, list items, or cards) is entirely missing.
- **LLM** content @ Section '5 bonnes pratiques de portfolio management' : The heading promises five best practices but none are rendered — only an intro paragraph appears. The five practice cards or items are completely absent, leaving an empty stub section.
- **LLM** content @ Section 'Laissez nos clients vous parler d'AirSaas' : The testimonials section renders only an intro paragraph with zero testimonial cards, quotes, or customer attributions. This is a user-visible empty section on a solution page.
- **LLM** content @ Section 'Grâce à sa marketplace AirSaas s'intègre nativement à vos outils du quotidien' : The integrations section shows only an intro paragraph — no integration logos, cards, or grid are rendered. The actual integration showcase content is missing entirely.

### `solution/tableau-de-bord-portefeuille-de-projet`

- **LLM** content @ Section 'Une vue macro au service de votre planification stratégique' : The 'vue macro' feature block uses the same image as the 'vue timeline' block (Portfolio%20project%20timeline%20view.webp). The macro/strategic planning section should show a portfolio overview screenshot, not a timeline view — wrong image mapped to wrong feature.

### `solution/tableau-de-bord-gestion-de-projet`

- **LLM** structure @ Hero section / page-level : The page has an H1 but the bulk of the content sections (7 consecutive plain-text sections before the feature bento rows) have NO headings at all — they are raw `<p>` blocks styled as body copy with no H2/H3 to anchor them. Readers and search engines cannot parse the content hierarchy; these sections appear as one undifferentiated wall of text.

### `equipe/comite-direction`

- **LLM** content @ Integrations section ("Vos équipes vont adorer nos intégrations natives") : The integrations section contains only a heading and a short descriptive paragraph — there are no integration logos, cards, or visuals. The section is functionally empty/stub and offers no actual content to the user.
- **LLM** content @ Testimonials section ("Laissez nos clients vous parler d'AirSaas") : The testimonials section contains only a heading and an introductory paragraph — no actual testimonial cards, quotes, videos, or customer names are rendered. The section body is completely missing.
- **LLM** content @ "Suivez l'avancée de vos programmes" section : This section has a heading and a single paragraph of text but no accompanying image or visual — every comparable feature section on the page pairs text with a product screenshot. This section appears truncated/incomplete.

### `solution/tableau-de-bord-dsi`

- **LLM** content @ Section 'Embarquez par une bonne communication' : The body content of this feature section is completely empty — the rich-text div renders nothing inside it. Users see a heading with an image but zero explanatory copy, making the section meaningless.

### `equipe/outil-pmo`

- **LLM** content @ Section: 'Laissez nos clients vous parler d'AirSaas' : Testimonials section renders only a heading and an intro paragraph — zero testimonial cards are present. The entire social proof content is missing, making this a visible empty stub.
- **LLM** content @ Section: 'Grâce à sa marketplace AirSaas s'intègre nativement à vos outils du quotidien' : Integration section renders only a heading and a paragraph — no integration logos or cards are displayed below it. The marketplace/integrations content block is completely absent.
- **LLM** content @ Section: 'Un capacity planning par équipe simple et actionnable' : Section body copy ends mid-sentence with a colon ('pour prendre les décisions :') and no continuation — the bullet list or supporting visual that should follow is entirely missing.

### `blog/cadrage-projet`

- **LLM** content @ First 'À retenir' aside — section 'Cadrage : l'importance d'un autre rapport au temps' : The quote inside the aside is visibly truncated mid-sentence: '…sur la questio' — the text cuts off abruptly and the rest of the content is missing, leaving an incomplete and confusing callout for readers.
- **LLM** content @ Second 'À retenir' aside — section 'Cadrage : l'importance d'un autre rapport au temps' : The second blockquote is also truncated mid-word: '…il n'y a pas de valeur derrière ! Et s' — the sentence is unfinished, which is a user-visible content defect that must be fixed before ship.

### `blog/comite-de-pilotage-definitions-et-incomprehensions`

- **LLM** content @ Callout aside – 'À retenir' (jalons section) : The bullet point text is visibly truncated mid-sentence: '…plutôt qu'un immense problème très comp' — the quote/advice is cut off and the full content is missing. This is a content rendering bug, not a source truncation.
- **LLM** content @ Callout aside – 'À retenir' (chef de projet section) : The bullet point text is again truncated mid-sentence: '…un regard critique. Tout doit être dans l'explici' — the callout content is incomplete and will confuse readers.
- **LLM** content @ Callout aside – 'À retenir' (key user section) : The bullet point text is truncated mid-sentence: '…le relais des bonnes pratiques transmises par la DSI : u' — same truncation pattern, indicating a systematic rendering bug in the callout component for long quote strings.

### `blog/comment-decider-en-copil`

- **LLM** content @ First 'À retenir' aside (Lionel M. quote) : The quote from Lionel M. is truncated mid-sentence: '…tu sors parfois de Copil en te disant : on fait' — the sentence ends abruptly with no conclusion, leaving a broken, incomplete quote visible to the user.
- **LLM** content @ Second 'À retenir' aside (OCTO Tech quote) : The OCTO Tech testimonial is truncated mid-sentence: '…Le premier est le relevé de décisions. Cela peut paraître anecdotique, mais nous' — the content is cut off, making the aside appear broken and unprofessional.

### `blog/gestion-de-portefeuille-projet-pme`

- **LLM** content @ First 'À retenir' aside (under 'Gestion de portefeuille de projets : définition et usages') : The callout text ends abruptly mid-sentence: '…Pour réussir à ' with no continuation. The content is visibly truncated and will confuse readers.
- **LLM** content @ Third 'À retenir' aside (under benefits section) : The callout text is cut off mid-word: '…pour des projets qui ont un impac' — clearly a truncated string, not a complete sentence.

### `blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0`

- **LLM** content @ À retenir callout boxes (all sections) : Every 'À retenir' quote is visibly truncated mid-sentence (e.g., '…pour résoudre leurs pro', '…grâce à l'arrivée de l'automatisation', '…car des bancs te'). The quote text is cut off and displayed incomplete to the user, making the callout meaningless and looking broken.

### `blog/gestion-portefeuille-projets-vs-gestion-de-projet`

- **LLM** content @ Blog hero — author badge : The author avatar image URL contains 'Avatar%20Je%CC%81ro%CC%82me.png' (Jérôme's photo) but the displayed name is 'Jonas Roman'. Either the author name or the image is wrong — this is a factual mismatch visible to every reader.

### `blog/pi-safe`

- **LLM** content @ Aside callout — 'À retenir' (first occurrence, after benefits list) : The callout text is visibly truncated mid-sentence: '…on se focalise sur pourquoi on fait ce pr' — the sentence is cut off and no closing content is rendered. This is a rendering/data truncation bug visible to users.
- **LLM** content @ Aside callout — 'À retenir' (second occurrence, after 'Avoir une vision claire') : The callout text is truncated mid-sentence: '…Il peut s'agir d'une nouvelle réglementation à suivre, de projet' — content is cut off, leaving an incomplete thought visible to users.
- **LLM** content @ Aside callout — 'À retenir' (third occurrence, after 'Anticiper les blocages potentiels') : The callout text is truncated mid-sentence: '…et une estimation "' — the sentence ends abruptly with an open quotation mark, clearly broken content.

### `blog/pilotage-de-projet`

- **LLM** content @ À retenir aside — first callout block (MOA-AMOA-MOE section) : The testimonial/quote inside the callout box is visibly truncated mid-sentence: '…Nous avons mis en place des fo'. The content is cut off abruptly, leaving an incomplete and unpublishable fragment visible to users.
- **LLM** content @ À retenir aside — second callout block (chef de projet héros solitaire section) : The quote inside this callout is also truncated mid-sentence: '…Tout doit être dans l'explic'. A second incomplete quote renders this block broken for readers.
- **LLM** content @ À retenir aside — third callout block (méthodes hybrides section) : Third consecutive truncated callout: '…c'est pas le but de dire "on fait de l'agile pour de l''. The pattern of truncation across all three aside/callout blocks indicates a systematic CMS rendering bug cutting off quoted testimonials.

### `blog/management-de-portefeuille-de-projet`

- **LLM** content @ Blog hero — author byline : The author avatar image URL contains 'Avatar%20Je%CC%81ro%CC%82me.png' (Jérôme's photo) but the displayed name is 'Jonas Roman'. A real person's photo is shown under the wrong name, which is a factual error visible to all readers.

### `blog/pi-planning`

- **LLM** content @ First 'À retenir' callout box (immediately after intro paragraphs) : The first expert quote callout is truncated mid-sentence: 'ils apportent aussi leurs bonnes pratiques' ends abruptly with no closing thought. This appears to be a CMS content rendering bug where the expert quote body is cut off and never completed.
- **LLM** content @ Second 'À retenir' callout (after PI Planning definition paragraph) : Expert quote is truncated mid-sentence: 'c'est que les gens qui y participent sont ceux qui y mett' — the sentence is visibly cut off. Multiple callout boxes throughout the article share this same truncation pattern, indicating a systemic CMS field length or render bug.

### `blog/pourquoi-vos-18-millions`

- **LLM** content @ À retenir callout — first section : The first 'À retenir' callout text is truncated mid-sentence: '…Sauf qu'on fait 500 millions de C' — the sentence is cut off and the rest of the content is missing, leaving a broken quote visible to users.
- **LLM** content @ À retenir callout — 'L'illusion du pilotage stratégique' section : The second 'À retenir' callout is also truncated mid-sentence: '…Trois semaines dans une organisation de 2 100 personnes. Chief' — the speaker's title and organisation are cut off, making the quote incomplete and unprofessional.
- **LLM** content @ À retenir callout — 'Le mal invisible des COMEX' section (and likely further callouts) : The HTML truncation note shows the pattern continues ('Nous partageons la même stratégie, mais no…'), strongly indicating multiple additional callout quotes are also cut mid-sentence throughout the article body.

### `blog/program-increment-planning`

- **LLM** content @ First 'À retenir' callout (before H3 'Qu'est-ce qu'un PI Planning ?') : The first expert quote callout is visibly truncated mid-sentence: 'Ils apportent aussi leurs bonnes pratiques' — the sentence ends abruptly with no closing punctuation or continuation. This appears before any section anchor, making it the first substantive callout a reader encounters.
- **LLM** content @ Second 'À retenir' callout (after first H3 definition paragraph) : Expert quote is truncated mid-sentence: 'c'est que les gens qui y participent sont ceux qui y mett' — the word 'mettent' (or similar) is cut off. The CMS excerpt is rendering incomplete text rather than the full quote.

### `blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets`

- **LLM** content @ Aside / callout block 'À retenir' : The single bullet point inside the 'À retenir' aside is visibly truncated mid-sentence: 'Quand on bascule dans le digital, on doit forcément faire attention au parcours utilisateur. L'ergonomie est beaucoup plus importante que dans un système SAP. On va s'intéresser en' — the text ends abruptly with no conclusion, which is user-visible and reads as a broken page.


## All pages

| Slug | Type | Status | Regex P0 | Regex P1 | LLM P0 | LLM P1 |
|---|---|---|---|---|---|---|
| `automatiser-la-com-projet` | produit | BLOCK | 0 | 0 | 1 | 2 |
| `capacity-planning` | produit | BLOCK | 0 | 0 | 1 | 4 |
| `flash-report` | solution | BLOCK | 0 | 0 | 1 | 3 |
| `management-de-portefeuille-projet` | solution | BLOCK | 0 | 0 | 1 | 4 |
| `outil-ppm` | solution | BLOCK | 0 | 0 | 1 | 5 |
| `portfolio-management` | solution | BLOCK | 0 | 0 | 4 | 3 |
| `tableau-de-bord-portefeuille-de-projet` | solution | BLOCK | 0 | 0 | 1 | 4 |
| `tableau-de-bord-gestion-de-projet` | solution | BLOCK | 0 | 0 | 1 | 4 |
| `comite-direction` | equipe | BLOCK | 0 | 0 | 3 | 3 |
| `tableau-de-bord-dsi` | solution | BLOCK | 0 | 0 | 1 | 4 |
| `outil-pmo` | equipe | BLOCK | 0 | 0 | 3 | 2 |
| `cadrage-projet` | blog | BLOCK | 0 | 0 | 2 | 2 |
| `comite-de-pilotage-definitions-et-incomprehensions` | blog | BLOCK | 0 | 0 | 3 | 3 |
| `comment-decider-en-copil` | blog | BLOCK | 0 | 0 | 2 | 4 |
| `gestion-de-portefeuille-projet-pme` | blog | BLOCK | 0 | 0 | 2 | 3 |
| `la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0` | blog | BLOCK | 0 | 0 | 1 | 3 |
| `gestion-portefeuille-projets-vs-gestion-de-projet` | blog | BLOCK | 0 | 0 | 1 | 2 |
| `pi-safe` | blog | BLOCK | 0 | 0 | 3 | 3 |
| `pilotage-de-projet` | blog | BLOCK | 0 | 0 | 3 | 3 |
| `management-de-portefeuille-de-projet` | blog | BLOCK | 0 | 0 | 1 | 3 |
| `pi-planning` | blog | BLOCK | 0 | 0 | 2 | 4 |
| `pourquoi-vos-18-millions` | blog | BLOCK | 0 | 0 | 3 | 3 |
| `program-increment-planning` | blog | BLOCK | 0 | 0 | 2 | 4 |
| `trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets` | blog | BLOCK | 0 | 0 | 1 | 3 |
| `pi-planning` | lp | WARN | 0 | 0 | 0 | 5 |
| `flash-report-projet` | solution | WARN | 0 | 0 | 0 | 5 |
| `gestion-portefeuille-projet` | solution | WARN | 0 | 0 | 0 | 5 |
| `outils-de-pilotage-projet` | solution | WARN | 0 | 0 | 0 | 5 |
| `budget-previsionnel-projet` | blog | WARN | 0 | 0 | 0 | 5 |
| `appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management` | blog | WARN | 0 | 0 | 0 | 5 |
| `analyse-des-risques-projet` | blog | WARN | 0 | 0 | 0 | 5 |
| `capacity-planning-definition` | blog | WARN | 0 | 0 | 0 | 5 |
| `macro-planning` | blog | WARN | 0 | 0 | 0 | 5 |
| `metier-pmo` | blog | WARN | 0 | 0 | 0 | 5 |
| `pmo` | lp | PASS | 0 | 0 | 0 | 3 |
| `ppm` | lp | PASS | 0 | 0 | 0 | 4 |
| `capacity-planning` | lp | PASS | 0 | 0 | 0 | 3 |
| `budget` | produit | PASS | 0 | 0 | 0 | 3 |
| `priorisation-par-equipes` | produit | PASS | 0 | 0 | 0 | 4 |
| `airsaas-et-les-experts-de-la-transfo` | solution | PASS | 0 | 0 | 0 | 4 |
| `traduction-one-click-avec-deepl` | produit | PASS | 0 | 0 | 0 | 4 |
| `reporting-projet` | produit | PASS | 0 | 0 | 0 | 3 |
| `revue-de-portefeuille` | solution | PASS | 0 | 0 | 0 | 3 |
| `direction-de-la-transformation` | equipe | PASS | 0 | 0 | 0 | 4 |
| `it-et-operation` | equipe | PASS | 0 | 0 | 0 | 4 |
| `10-pratiques-pour-developper-la-relation-de-confiance-dg-cio` | blog | PASS | 0 | 0 | 0 | 3 |
| `budgetiser-un-projet-sans-se-louper` | blog | PASS | 0 | 0 | 0 | 3 |
| `chef-de-projet-pmo` | blog | PASS | 0 | 0 | 0 | 3 |
| `capacity-planning` | blog | PASS | 0 | 0 | 0 | 4 |
| `comite-pilotage-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `chef-de-projet-transverse` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-elaborer-un-reporting-efficace` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-animer-un-bilan-projet-efficace` | blog | PASS | 0 | 0 | 0 | 2 |
| `comment-animer-un-comite-de-pilotage` | blog | PASS | 0 | 1 | 0 | 3 |
| `comment-faire-un-bon-point-davancement-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022` | blog | PASS | 0 | 0 | 0 | 2 |
| `comment-gerer-lagressivite-dans-les-comites-de-pilotage` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-mettre-en-place-un-comite-de-pilotage` | blog | PASS | 0 | 0 | 0 | 0 |
| `comment-reussir-un-projet-transverse` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-mettre-une-bonne-meteo-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-mettre-en-place-un-pmo` | blog | PASS | 0 | 0 | 0 | 4 |
| `fiche-projet-exemple-et-methodologie` | blog | PASS | 0 | 0 | 0 | 4 |
| `demarche-de-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `jalon-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `copil-projet-ou-comite-de-pilotage-projet-les-bases` | blog | PASS | 0 | 0 | 0 | 3 |
| `kanban-gestion-de-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `kpi-gestion-de-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `la-revue-de-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `le-diagramme-de-gantt-comment-sen-servir` | blog | PASS | 0 | 0 | 0 | 4 |
| `le-modele-de-presentation-pour-votre-comite-de-pilotage` | blog | PASS | 0 | 0 | 0 | 4 |
| `le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation` | blog | PASS | 0 | 0 | 0 | 3 |
| `le-guide-du-mode-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes` | blog | PASS | 0 | 0 | 0 | 3 |
| `le-grand-guide-de-la-conduite-de-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `lean-portfolio-management` | blog | PASS | 0 | 1 | 0 | 3 |
| `plan-capacitaire` | blog | PASS | 0 | 0 | 0 | 4 |
| `planification-de-la-demande-capacity-planning` | blog | PASS | 0 | 0 | 0 | 3 |
| `planification-de-la-capacite` | blog | PASS | 0 | 0 | 0 | 4 |
| `plan-de-communication-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `pourquoi-mettre-en-place-un-pmo` | blog | PASS | 0 | 0 | 0 | 3 |
| `preparer-comite-de-pilotage-d-un-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `reporting-pmo` | blog | PASS | 0 | 0 | 0 | 4 |
| `portefeuille-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `role-du-pmo` | blog | PASS | 0 | 0 | 0 | 4 |
| `project-portfolio-management` | blog | PASS | 0 | 0 | 0 | 3 |
| `retour-sur-agile-en-seine-2023` | blog | PASS | 0 | 0 | 0 | 3 |
| `tout-savoir-sur-la-note-de-cadrage-projet` | blog | PASS | 0 | 0 | 0 | 4 |
