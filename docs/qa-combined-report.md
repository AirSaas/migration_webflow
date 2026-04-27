# QA combined report — regex + LLM

**Date** : 2026-04-27T14:00:30.724Z

**Total** : 88 pages — **30 PASS** / 18 WARN / 40 BLOCK

**Severity totals** :
- Regex : P0 = 0, P1 = 2
- LLM : P0 = 55, P1 = 348

## Stats by type

| Type | Total | PASS | WARN | BLOCK |
|---|---|---|---|---|
| lp | 4 | 0 | 1 | 3 |
| produit | 6 | 3 | 1 | 2 |
| solution | 12 | 1 | 4 | 7 |
| equipe | 4 | 0 | 0 | 4 |
| blog | 62 | 26 | 12 | 24 |

## P0 issues — must fix before ship

### `lp/ppm`

- **LLM** structure @ Trusted logos section / 'Ils nous font confiance' : This section uses an H3 as its first heading, but the page's H1 is inside the hero above it. The 'Ils nous font confiance' band and all subsequent feature sections also use H3, meaning there is no H2 between the H1 and any of these headings — the heading hierarchy skips H2 entirely for the main content sections, which breaks document outline and SEO for a landing page.

### `lp/pi-planning`

- **LLM** content @ AirSaas pitch section — paragraph below H2 : A <p> element is nested inside another <p> element ('On ne remplace pas Jira. On le rend compréhensible pour les humains normaux.<br/>'), which is invalid HTML. Browsers will silently break it, potentially causing the closing </p> of the inner paragraph to prematurely close the outer one and render stray tags visibly in some browsers.

### `lp/capacity-planning`

- **LLM** structure @ Trusted logos section / 'Ils nous font confiance' : This section uses an H3 as its heading but there is no H2 between the H1 hero and this section. The heading hierarchy jumps directly from H1 to H3, breaking semantic structure and harming SEO/accessibility.
- **LLM** content @ FAQ accordion — all items : The Font Awesome icon span for every FAQ button renders as an empty box (no glyph visible in HTML) because the Font Awesome 6 Duotone font is not loaded in the rebuild. Users see a blank square next to each question.

### `produit/automatiser-la-com-projet`

- **LLM** structure @ "Vous n'entendrez bientôt plus ces phrases" section : The section titled 'Vous n'entendrez bientôt plus ces phrases ...' contains no content — no pain-point phrases are listed. The section is completely empty after the heading, making it a broken stub visible to users.
- **LLM** content @ Feature section with H3 heading : The H3 heading 'Ajoutez les sponsors sur vos projets' appears three times: once as a standalone div before its section, once as the section heading inside the split-layout block, and the body copy is identical in both the centered text section and the split-layout section — wholesale content duplication visible on the page.

### `produit/traduction-one-click-avec-deepl`

- **LLM** content @ Second H2 section (after hero) : The H2 heading 'Le rapport flash désormais enmultilingue sur AirSaas' is missing a space between 'en' and 'multilingue' ('enmultilingue'). This is a visible typo in a prominent gradient heading.

### `solution/flash-report`

- **LLM** content @ Section 'Plus qu'une solution de reporting flash' : The paragraph body reads 'En du flash report automatisé, les autres fonctionnalités AirSaas…' — the sentence is clearly truncated/broken mid-phrase ('En du' is grammatically invalid and the subject noun is missing). This is visible broken copy on a public section.

### `solution/flash-report-projet`

- **LLM** structure @ "Ils parlent de nous" section : This section uses an H3 as its first heading after the H1, skipping H2 entirely. The heading hierarchy jumps from H1 → H3, which is invalid document structure and harmful for SEO on a solution page.

### `solution/portfolio-management`

- **LLM** content @ Section 'Un capacity planning par équipe simple et actionnable' : The body copy ends with a truncated sentence ('pour prendre les décisions :') followed by two empty paragraphs (‍ zero-width joiner placeholders). The promised list of decision criteria is completely missing, leaving users with broken, incomplete content.

### `solution/outil-ppm`

- **LLM** content @ Section after 'Quand est-ce que les logiciels ppm ont commencé à apparaître ?' : A standalone section renders only the stub text 'Problématique ciblée à la date de création' with no accompanying table, image, or chart. This appears to be a placeholder for a comparison table/visual that was not migrated, leaving a broken content block visible to users.
- **LLM** content @ Section after 'Un changement de paradigme : du contrôle des process, à un besoin d'impliquer les collaborateurs' : A standalone section ends with '…grâce à ces pyramides de Maslow :' but no pyramid images or diagrams follow — the referenced visuals are missing entirely, making the sentence a dangling reference.

### `solution/outils-de-pilotage-projet`

- **LLM** content @ Second section (bullet list after 'Les différentes typologies') : A bullet list ('Respecter lesobjectifs de chaque équipe', etc.) appears as a standalone section with no heading, no introductory context, and a missing space in 'lesobjectifs'. This content block is orphaned — it has no parent h2/h3 to explain what it's listing, making it incomprehensible to users.

### `equipe/comite-direction`

- **LLM** content @ Integrations section (h2: 'Vos équipes vont adorer nos intégrations natives') : The integrations section contains only a heading and a short paragraph with no actual integration logos, cards, or visuals. The section is completely empty of its primary content, making it a stub that would confuse users.
- **LLM** content @ Testimonials section (h2: 'Laissez nos clients vous parler d'AirSaas') : The testimonials section contains only a heading and intro paragraph but no actual testimonial cards, quotes, or customer names. The section body is entirely missing its content.

### `solution/tableau-de-bord-gestion-de-projet`

- **LLM** content @ Hero subtitle / paragraph : The hero paragraph contains a visible Webflow zero-width joiner artifact (‍) mid-sentence ('le grand guide de la conduite de projet.‍Mesurer ses performances…'), causing a line break or invisible character that splits the sentence unexpectedly for users.
- **LLM** structure @ Page body — multiple plain <section> blocks : Seven consecutive sections between the hero and the feature image rows render as raw paragraph/list content with no heading (no H2/H3), no section title, and no visual container differentiation. These sections are structurally invisible to users scanning the page and produce a wall of undifferentiated centered body text with no hierarchy.

### `equipe/direction-de-la-transformation`

- **LLM** structure @ DAKI section — DROP / ADD / KEEP / IMPROVE subsections : The DAKI retrospective framework (DROP, ADD, KEEP, IMPROVE) is rendered as four completely separate full-padding sections with large vertical spacing between each, making them appear as unrelated disconnected blocks rather than a single coherent feature. Each subsection contains only a one-line stub sentence (e.g. 'Ce que vous souhaitez arrêter.') with no explanatory content, visual grouping, or context — this looks like a broken import of raw Webflow rich-text content rather than a designed feature breakdown.
- **LLM** content @ H2 section — 'Améliorer en continu votre manière de faire des projets' : The section intro paragraph describes generating a DAKI retrospective report, but the four DAKI sub-blocks that follow contain only bare one-liner stub copy with no actual product description, screenshots, or value proposition. This content is clearly incomplete and would be immediately visible to any user.

### `solution/tableau-de-bord-dsi`

- **LLM** content @ "Embarquez par une bonne communication" feature section : The body content of this split section is completely empty — the rich-text div renders no text whatsoever. A heading with zero supporting copy ships as a stub/broken section.

### `equipe/it-et-operation`

- **LLM** content @ Section — 'Laissez nos clients vous parler d'AirSaas' : The testimonials section contains only a heading and an intro line ('Nos clients adorent gérer leurs projets…') with zero actual testimonial cards or quotes. A user visiting this section sees no social proof content at all.

### `equipe/outil-pmo`

- **LLM** content @ Capacity planning section — "Un capacity planning par équipe simple et actionnable" : The body copy ends mid-sentence with a colon ("pour prendre les décisions :") followed by two empty paragraph placeholders (zero-width joiner characters only). The promised list of decisions/actions is entirely missing, leaving a visibly broken stub section.

### `blog/budgetiser-un-projet-sans-se-louper`

- **LLM** content @ Retour d'expérience du CIO d'Adeo — aside/callout box : The 'À retenir' callout inside the Adeo CIO section contains raw placeholder/template instructions: "Speaker avatar: insert the link to the speaker page between: href='https://LINK_SPEAKER_PAGE' Speaker avatar: change url of 'background-image' to the url of the image in linkedIn e". This is an unfilled Webflow template stub visible to end users.

### `blog/cadrage-projet`

- **LLM** content @ Aside callout blocks (×2) — 'Cadrage : l'importance d'un autre rapport au temps' section : Two 'À retenir' callout boxes contain raw placeholder developer instructions: "Speaker avatar: insert the link to the speaker page between: href=\"https://LINK_SPEAKER_PAGE\" Speaker avatar: change url of 'background-image' to the url of the image in linkedIn e". These are copy-paste template leftovers and are fully visible to end users.

### `blog/capacity-planning-definition`

- **LLM** content @ CTA button within 'Aligner capacité et demande' section : The CTA button is labelled 'Télécharger' but links to '/fr/meetings-pages' (a demo/meeting booking page). The label does not match the destination, which will confuse and mislead users — this is a clear functional/content mismatch.

### `blog/comite-de-pilotage-definitions-et-incomprehensions`

- **LLM** content @ "À retenir" aside boxes (×3) : Three separate 'À retenir' info boxes contain raw Webflow/template placeholder text: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This unfilled template copy is fully user-visible and appears three times in the article body.

### `blog/comite-pilotage-projet`

- **LLM** content @ Astuce 5 — aside callout 'À retenir' : The quote inside the callout is truncated mid-sentence: "Le temps qu'on prend à s'aligner ce n'est pas du temps perdu..." — it ends with an ellipsis and no closing quotation mark, indicating the content was cut off before completion.

### `blog/comment-decider-en-copil`

- **LLM** content @ First 'À retenir' callout block (Lionel M. quote) : The quote is truncated mid-sentence: 'tu sors parfois de Copil en te disant : on fait' — the sentence ends abruptly with no conclusion, leaving a visible broken quote in the rendered page.
- **LLM** content @ Second 'À retenir' callout block (OCTO Tech quote) : The OCTO Tech quote is also cut off mid-sentence: 'Le premier est le relevé de décisions. Cela peut paraître anecdotique, mais nous' — visibly truncated, no closing thought.

### `blog/comment-faire-un-bon-point-davancement-projet`

- **LLM** structure @ HTML root : The page opens with '<div hidden=""></div>' before the '<html>' tag, meaning content appears outside the html element. This is invalid HTML and may cause browser rendering issues or confuse crawlers.

### `blog/comment-reussir-un-projet-transverse`

- **LLM** content @ Blog post meta — date field : The publication date is shown as 'Le 1 février 2026', which is a future date (over a year ahead). This is almost certainly a data/formatting bug and will confuse readers and damage credibility.

### `blog/gestion-de-portefeuille-projet-pme`

- **LLM** content @ Callout / aside boxes (multiple occurrences throughout blog body) : Every 'À retenir' callout box contains raw template placeholder text: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This stub content is repeated at least three times and is user-visible on the live page.

### `blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0`

- **LLM** content @ Multiple 'À retenir' callout boxes throughout blog body : Every 'À retenir' blockquote is truncated mid-sentence (e.g., '…résoudre leurs pro', '…l'arrivée de l'automatisation', '…des bancs te'). The quotes are visibly cut off and never complete, making key takeaways unreadable.
- **LLM** content @ Blog hero — publication date : The article shows 'Le 1 février 2026', a future date. This is almost certainly a data mapping error (wrong year) and will confuse readers and harm SEO credibility.

### `blog/gestion-portefeuille-projets-vs-gestion-de-projet`

- **LLM** content @ Blog hero — author chip : The author avatar image URL contains 'Avatar%20Je%CC%81ro%CC%82me.png' (Jérôme) but the displayed name and alt text both read 'Jonas Roman'. Either the author name is incorrect or the wrong avatar is used — a clear content mismatch visible to all readers.

### `blog/le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation`

- **LLM** structure @ HTML document root : The page opens with '<div hidden=""></div><html lang="fr">' — a hidden div appears before the <html> tag, indicating broken document structure. This is invalid HTML and could cause rendering and SEO issues.

### `blog/les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet`

- **LLM** content @ Blog post meta — publication date : The publication date reads 'Le 1 février 2026', which is a future date (over a year ahead). This is almost certainly a data/mapping bug and will appear wrong to every visitor.

### `blog/le-grand-guide-de-la-conduite-de-projet`

- **LLM** content @ Blog hero — publication date : The article shows 'Le 1 février 2026' as the publication date, which is a future date (over a year ahead). This is almost certainly a data/placeholder error that will confuse readers and damage credibility.

### `blog/metier-pmo`

- **LLM** functional @ Sommaire — anchor links #le-reporting-pmo-comment-le-réussir and #faq-les-questions-fréquentes-sur-le-pmo : The Sommaire lists two sections ('Le reporting PMO : comment le réussir' and 'FAQ : les questions fréquentes sur le PMO') that have no corresponding anchor IDs in the rendered HTML due to the content truncation, so clicking these links will silently fail.

### `blog/pi-safe`

- **LLM** content @ Aside callout — first 'À retenir' block (after advantages list) : The callout text is visibly truncated mid-sentence: '…se focalise sur pourquoi on fait ce pr' — the sentence ends abruptly. This is user-visible broken copy on a published page.
- **LLM** content @ Aside callout — second 'À retenir' block (after 'Avoir une vision claire') : Callout text is cut off mid-sentence: '…Il peut s'agir d'une nouvelle réglementation à suivre, de projet' — truncated before completing the thought.
- **LLM** content @ Aside callout — third 'À retenir' block (after 'Anticiper les blocages') : Callout text is cut off mid-sentence: '…et une estimation "' — the sentence ends abruptly with an open quotation mark. Broken copy visible to all users.

### `blog/pilotage-de-projet`

- **LLM** content @ "À retenir" aside boxes (multiple occurrences) : All three 'À retenir' callout boxes contain raw placeholder/template instructions ('Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image"...') instead of actual editorial content. This is a copy-paste stub from a CMS template that was never filled in, visible to all users.

### `blog/management-de-portefeuille-de-projet`

- **LLM** content @ Blog hero — author byline : The avatar image URL contains 'Avatar%20Je%CC%81ro%CC%82me' (Jérôme) but the displayed author name is 'Jonas Roman'. The wrong person's photo is shown, creating a visible identity mismatch on a published article.

### `blog/plan-de-communication-projet`

- **LLM** content @ Blog hero — publication date : The article shows 'Le 1 février 2026' as the publication date, which is a future date (more than a year ahead). This is almost certainly a data/migration bug and will immediately undermine credibility with readers.

### `blog/pourquoi-vos-18-millions`

- **LLM** content @ First 'À retenir' callout box (section 1) : The callout text is visibly truncated mid-sentence: '…le même tempo. Sauf qu'on fait 500 millions de C' — the sentence is cut off and the content is incomplete, which will be user-visible on the live page.
- **LLM** content @ Third 'À retenir' callout box (L'illusion du pilotage stratégique, second callout) : The quote ends abruptly: '…il a fallu 3 semaines pour établir une liste fiable. Trois semaines dans une organisation de 2 100 personnes. Chief' — 'Chief' is truncated and the speaker's title/company is missing.

### `blog/preparer-comite-de-pilotage-d-un-projet`

- **LLM** content @ Blog hero — publication date : The article shows 'Le 1 février 2026' as the publication date, which is a future date (2026). This is almost certainly a data mapping bug that will confuse readers and harm SEO credibility.

### `blog/portefeuille-projet`

- **LLM** content @ Hero — author badge : The author avatar image URL loads a photo labeled 'Avatar Jérôme' (CDN filename contains 'Je%CC%81ro%CC%82me') but the displayed name is 'Jonas Roman'. The image and name are mismatched, showing the wrong person's photo next to the wrong name.

### `blog/program-increment-planning`

- **LLM** content @ First 'À retenir' callout block (before H3 'Qu'est-ce qu'un PI Planning ?') : The quote text is visibly truncated mid-sentence: 'Ils apportent aussi leurs bonnes pratiques' ends abruptly without completing the thought. This is reader-facing and looks like a broken/stub import.
- **LLM** content @ Second 'À retenir' callout block (after H3 'Qu'est-ce qu'un PI Planning ?') : Expert quote is cut off mid-sentence: '…c'est que les gens qui y participent sont ceux qui y mett' — the verb 'mettent' and the rest of the sentence are missing. Hard truncation visible to readers.
- **LLM** content @ Third 'À retenir' callout block (after 'PI Planning et framework SAFe') : Quote ends mid-sentence: 'Les valeurs temporelles comme le trimestre sont très a' — the adjective and rest of sentence are truncated. Same pattern of broken quote rendering.
- **LLM** content @ Fourth 'À retenir' callout block (second one under 'PI Planning et framework SAFe') : Expert quote truncated: '…dans un contexte de gestion de portefeuille de projets, il peut' — sentence incomplete. Multiple callout blocks share this same truncation bug, suggesting a systemic character-limit issue in the quote renderer.
- **LLM** content @ Fifth 'À retenir' callout block (under 'Quels sont les bénéfices d'un PI Planning ?') : Quote cut off: '…Grâce à un PI Planning, on voit tout passer : les capacités comme le budget à attribuer' — ends abruptly. Blocking issue as every 'À retenir' block in the visible portion of the page is broken.

### `blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets`

- **LLM** content @ Aside / callout block 'À retenir' : The 'À retenir' callout contains raw Webflow template placeholder text: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This is an unfilled stub shipped verbatim to the user.


## All pages

| Slug | Type | Status | Regex P0 | Regex P1 | LLM P0 | LLM P1 |
|---|---|---|---|---|---|---|
| `ppm` | lp | BLOCK | 0 | 0 | 1 | 4 |
| `pi-planning` | lp | BLOCK | 0 | 0 | 1 | 4 |
| `capacity-planning` | lp | BLOCK | 0 | 0 | 2 | 4 |
| `automatiser-la-com-projet` | produit | BLOCK | 0 | 0 | 2 | 4 |
| `traduction-one-click-avec-deepl` | produit | BLOCK | 0 | 0 | 1 | 4 |
| `flash-report` | solution | BLOCK | 0 | 0 | 1 | 4 |
| `flash-report-projet` | solution | BLOCK | 0 | 0 | 1 | 5 |
| `portfolio-management` | solution | BLOCK | 0 | 0 | 1 | 5 |
| `outil-ppm` | solution | BLOCK | 0 | 0 | 2 | 4 |
| `outils-de-pilotage-projet` | solution | BLOCK | 0 | 0 | 1 | 4 |
| `comite-direction` | equipe | BLOCK | 0 | 0 | 2 | 3 |
| `tableau-de-bord-gestion-de-projet` | solution | BLOCK | 0 | 0 | 2 | 4 |
| `direction-de-la-transformation` | equipe | BLOCK | 0 | 0 | 2 | 4 |
| `tableau-de-bord-dsi` | solution | BLOCK | 0 | 0 | 1 | 5 |
| `it-et-operation` | equipe | BLOCK | 0 | 0 | 1 | 4 |
| `outil-pmo` | equipe | BLOCK | 0 | 0 | 1 | 4 |
| `budgetiser-un-projet-sans-se-louper` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `cadrage-projet` | blog | BLOCK | 0 | 0 | 1 | 3 |
| `capacity-planning-definition` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `comite-de-pilotage-definitions-et-incomprehensions` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `comite-pilotage-projet` | blog | BLOCK | 0 | 0 | 1 | 3 |
| `comment-decider-en-copil` | blog | BLOCK | 0 | 0 | 2 | 4 |
| `comment-faire-un-bon-point-davancement-projet` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `comment-reussir-un-projet-transverse` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `gestion-de-portefeuille-projet-pme` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0` | blog | BLOCK | 0 | 0 | 2 | 4 |
| `gestion-portefeuille-projets-vs-gestion-de-projet` | blog | BLOCK | 0 | 0 | 1 | 3 |
| `le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation` | blog | BLOCK | 0 | 0 | 1 | 3 |
| `les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `le-grand-guide-de-la-conduite-de-projet` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `metier-pmo` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `pi-safe` | blog | BLOCK | 0 | 0 | 3 | 3 |
| `pilotage-de-projet` | blog | BLOCK | 0 | 0 | 1 | 5 |
| `management-de-portefeuille-de-projet` | blog | BLOCK | 0 | 0 | 1 | 2 |
| `plan-de-communication-projet` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `pourquoi-vos-18-millions` | blog | BLOCK | 0 | 0 | 2 | 3 |
| `preparer-comite-de-pilotage-d-un-projet` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `portefeuille-projet` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `program-increment-planning` | blog | BLOCK | 0 | 0 | 5 | 2 |
| `trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets` | blog | BLOCK | 0 | 0 | 1 | 4 |
| `pmo` | lp | WARN | 0 | 0 | 0 | 5 |
| `capacity-planning` | produit | WARN | 0 | 0 | 0 | 5 |
| `airsaas-et-les-experts-de-la-transfo` | solution | WARN | 0 | 0 | 0 | 5 |
| `gestion-portefeuille-projet` | solution | WARN | 0 | 0 | 0 | 5 |
| `management-de-portefeuille-projet` | solution | WARN | 0 | 0 | 0 | 5 |
| `tableau-de-bord-portefeuille-de-projet` | solution | WARN | 0 | 0 | 0 | 5 |
| `budget-previsionnel-projet` | blog | WARN | 0 | 0 | 0 | 5 |
| `appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management` | blog | WARN | 0 | 0 | 0 | 5 |
| `analyse-des-risques-projet` | blog | WARN | 0 | 0 | 0 | 5 |
| `capacity-planning` | blog | WARN | 0 | 0 | 0 | 5 |
| `comment-animer-un-comite-de-pilotage` | blog | WARN | 0 | 1 | 0 | 4 |
| `demarche-de-projet` | blog | WARN | 0 | 0 | 0 | 5 |
| `jalon-projet` | blog | WARN | 0 | 0 | 0 | 5 |
| `la-revue-de-projet` | blog | WARN | 0 | 0 | 0 | 5 |
| `le-modele-de-presentation-pour-votre-comite-de-pilotage` | blog | WARN | 0 | 0 | 0 | 5 |
| `lean-portfolio-management` | blog | WARN | 0 | 1 | 0 | 4 |
| `macro-planning` | blog | WARN | 0 | 0 | 0 | 6 |
| `planification-de-la-demande-capacity-planning` | blog | WARN | 0 | 0 | 0 | 5 |
| `budget` | produit | PASS | 0 | 0 | 0 | 4 |
| `priorisation-par-equipes` | produit | PASS | 0 | 0 | 0 | 4 |
| `reporting-projet` | produit | PASS | 0 | 0 | 0 | 3 |
| `revue-de-portefeuille` | solution | PASS | 0 | 0 | 0 | 4 |
| `10-pratiques-pour-developper-la-relation-de-confiance-dg-cio` | blog | PASS | 0 | 0 | 0 | 3 |
| `chef-de-projet-pmo` | blog | PASS | 0 | 0 | 0 | 4 |
| `chef-de-projet-transverse` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-elaborer-un-reporting-efficace` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-animer-un-bilan-projet-efficace` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022` | blog | PASS | 0 | 0 | 0 | 3 |
| `comment-gerer-lagressivite-dans-les-comites-de-pilotage` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-mettre-en-place-un-comite-de-pilotage` | blog | PASS | 0 | 0 | 0 | 4 |
| `comment-mettre-une-bonne-meteo-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `comment-mettre-en-place-un-pmo` | blog | PASS | 0 | 0 | 0 | 4 |
| `fiche-projet-exemple-et-methodologie` | blog | PASS | 0 | 0 | 0 | 4 |
| `copil-projet-ou-comite-de-pilotage-projet-les-bases` | blog | PASS | 0 | 0 | 0 | 3 |
| `kanban-gestion-de-projet` | blog | PASS | 0 | 0 | 0 | 3 |
| `kpi-gestion-de-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `le-diagramme-de-gantt-comment-sen-servir` | blog | PASS | 0 | 0 | 0 | 4 |
| `le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes` | blog | PASS | 0 | 0 | 0 | 4 |
| `le-guide-du-mode-projet` | blog | PASS | 0 | 0 | 0 | 4 |
| `plan-capacitaire` | blog | PASS | 0 | 0 | 0 | 3 |
| `pi-planning` | blog | PASS | 0 | 0 | 0 | 0 |
| `planification-de-la-capacite` | blog | PASS | 0 | 0 | 0 | 4 |
| `pourquoi-mettre-en-place-un-pmo` | blog | PASS | 0 | 0 | 0 | 3 |
| `reporting-pmo` | blog | PASS | 0 | 0 | 0 | 4 |
| `role-du-pmo` | blog | PASS | 0 | 0 | 0 | 4 |
| `project-portfolio-management` | blog | PASS | 0 | 0 | 0 | 3 |
| `retour-sur-agile-en-seine-2023` | blog | PASS | 0 | 0 | 0 | 3 |
| `tout-savoir-sur-la-note-de-cadrage-projet` | blog | PASS | 0 | 0 | 0 | 4 |
