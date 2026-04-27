# QA report — LLM (qa-llm.mjs)

**Date** : 2026-04-27T13:59:59.287Z
**Model** : claude-sonnet-4-6

**Total** : 88 pages — **1 PASS** / 47 WARN / 40 BLOCK / 0 ERR

**Severity totals** : P0 = 55, P1 = 348, P2 = 265

## P0 issues — must fix before ship

### `lp/pi-planning`

- **content @ AirSaas pitch section — paragraph below H2** : A <p> element is nested inside another <p> element ('On ne remplace pas Jira. On le rend compréhensible pour les humains normaux.<br/>'), which is invalid HTML. Browsers will silently break it, potentially causing the closing </p> of the inner paragraph to prematurely close the outer one and render stray tags visibly in some browsers.

### `lp/capacity-planning`

- **structure @ Trusted logos section / 'Ils nous font confiance'** : This section uses an H3 as its heading but there is no H2 between the H1 hero and this section. The heading hierarchy jumps directly from H1 to H3, breaking semantic structure and harming SEO/accessibility.
- **content @ FAQ accordion — all items** : The Font Awesome icon span for every FAQ button renders as an empty box (no glyph visible in HTML) because the Font Awesome 6 Duotone font is not loaded in the rebuild. Users see a blank square next to each question.

### `lp/ppm`

- **structure @ Trusted logos section / 'Ils nous font confiance'** : This section uses an H3 as its first heading, but the page's H1 is inside the hero above it. The 'Ils nous font confiance' band and all subsequent feature sections also use H3, meaning there is no H2 between the H1 and any of these headings — the heading hierarchy skips H2 entirely for the main content sections, which breaks document outline and SEO for a landing page.

### `produit/automatiser-la-com-projet`

- **structure @ "Vous n'entendrez bientôt plus ces phrases" section** : The section titled 'Vous n'entendrez bientôt plus ces phrases ...' contains no content — no pain-point phrases are listed. The section is completely empty after the heading, making it a broken stub visible to users.
- **content @ Feature section with H3 heading** : The H3 heading 'Ajoutez les sponsors sur vos projets' appears three times: once as a standalone div before its section, once as the section heading inside the split-layout block, and the body copy is identical in both the centered text section and the split-layout section — wholesale content duplication visible on the page.

### `produit/traduction-one-click-avec-deepl`

- **content @ Second H2 section (after hero)** : The H2 heading 'Le rapport flash désormais enmultilingue sur AirSaas' is missing a space between 'en' and 'multilingue' ('enmultilingue'). This is a visible typo in a prominent gradient heading.

### `solution/flash-report`

- **content @ Section 'Plus qu'une solution de reporting flash'** : The paragraph body reads 'En du flash report automatisé, les autres fonctionnalités AirSaas…' — the sentence is clearly truncated/broken mid-phrase ('En du' is grammatically invalid and the subject noun is missing). This is visible broken copy on a public section.

### `solution/flash-report-projet`

- **structure @ "Ils parlent de nous" section** : This section uses an H3 as its first heading after the H1, skipping H2 entirely. The heading hierarchy jumps from H1 → H3, which is invalid document structure and harmful for SEO on a solution page.

### `solution/outil-ppm`

- **content @ Section after 'Quand est-ce que les logiciels ppm ont commencé à apparaître ?'** : A standalone section renders only the stub text 'Problématique ciblée à la date de création' with no accompanying table, image, or chart. This appears to be a placeholder for a comparison table/visual that was not migrated, leaving a broken content block visible to users.
- **content @ Section after 'Un changement de paradigme : du contrôle des process, à un besoin d'impliquer les collaborateurs'** : A standalone section ends with '…grâce à ces pyramides de Maslow :' but no pyramid images or diagrams follow — the referenced visuals are missing entirely, making the sentence a dangling reference.

### `solution/outils-de-pilotage-projet`

- **content @ Second section (bullet list after 'Les différentes typologies')** : A bullet list ('Respecter lesobjectifs de chaque équipe', etc.) appears as a standalone section with no heading, no introductory context, and a missing space in 'lesobjectifs'. This content block is orphaned — it has no parent h2/h3 to explain what it's listing, making it incomprehensible to users.

### `solution/tableau-de-bord-dsi`

- **content @ "Embarquez par une bonne communication" feature section** : The body content of this split section is completely empty — the rich-text div renders no text whatsoever. A heading with zero supporting copy ships as a stub/broken section.

### `solution/portfolio-management`

- **content @ Section 'Un capacity planning par équipe simple et actionnable'** : The body copy ends with a truncated sentence ('pour prendre les décisions :') followed by two empty paragraphs (‍ zero-width joiner placeholders). The promised list of decision criteria is completely missing, leaving users with broken, incomplete content.

### `solution/tableau-de-bord-gestion-de-projet`

- **content @ Hero subtitle / paragraph** : The hero paragraph contains a visible Webflow zero-width joiner artifact (‍) mid-sentence ('le grand guide de la conduite de projet.‍Mesurer ses performances…'), causing a line break or invisible character that splits the sentence unexpectedly for users.
- **structure @ Page body — multiple plain <section> blocks** : Seven consecutive sections between the hero and the feature image rows render as raw paragraph/list content with no heading (no H2/H3), no section title, and no visual container differentiation. These sections are structurally invisible to users scanning the page and produce a wall of undifferentiated centered body text with no hierarchy.

### `equipe/comite-direction`

- **content @ Integrations section (h2: 'Vos équipes vont adorer nos intégrations natives')** : The integrations section contains only a heading and a short paragraph with no actual integration logos, cards, or visuals. The section is completely empty of its primary content, making it a stub that would confuse users.
- **content @ Testimonials section (h2: 'Laissez nos clients vous parler d'AirSaas')** : The testimonials section contains only a heading and intro paragraph but no actual testimonial cards, quotes, or customer names. The section body is entirely missing its content.

### `equipe/direction-de-la-transformation`

- **structure @ DAKI section — DROP / ADD / KEEP / IMPROVE subsections** : The DAKI retrospective framework (DROP, ADD, KEEP, IMPROVE) is rendered as four completely separate full-padding sections with large vertical spacing between each, making them appear as unrelated disconnected blocks rather than a single coherent feature. Each subsection contains only a one-line stub sentence (e.g. 'Ce que vous souhaitez arrêter.') with no explanatory content, visual grouping, or context — this looks like a broken import of raw Webflow rich-text content rather than a designed feature breakdown.
- **content @ H2 section — 'Améliorer en continu votre manière de faire des projets'** : The section intro paragraph describes generating a DAKI retrospective report, but the four DAKI sub-blocks that follow contain only bare one-liner stub copy with no actual product description, screenshots, or value proposition. This content is clearly incomplete and would be immediately visible to any user.

### `equipe/it-et-operation`

- **content @ Section — 'Laissez nos clients vous parler d'AirSaas'** : The testimonials section contains only a heading and an intro line ('Nos clients adorent gérer leurs projets…') with zero actual testimonial cards or quotes. A user visiting this section sees no social proof content at all.

### `equipe/outil-pmo`

- **content @ Capacity planning section — "Un capacity planning par équipe simple et actionnable"** : The body copy ends mid-sentence with a colon ("pour prendre les décisions :") followed by two empty paragraph placeholders (zero-width joiner characters only). The promised list of decisions/actions is entirely missing, leaving a visibly broken stub section.

### `blog/cadrage-projet`

- **content @ Aside callout blocks (×2) — 'Cadrage : l'importance d'un autre rapport au temps' section** : Two 'À retenir' callout boxes contain raw placeholder developer instructions: "Speaker avatar: insert the link to the speaker page between: href=\"https://LINK_SPEAKER_PAGE\" Speaker avatar: change url of 'background-image' to the url of the image in linkedIn e". These are copy-paste template leftovers and are fully visible to end users.

### `blog/budgetiser-un-projet-sans-se-louper`

- **content @ Retour d'expérience du CIO d'Adeo — aside/callout box** : The 'À retenir' callout inside the Adeo CIO section contains raw placeholder/template instructions: "Speaker avatar: insert the link to the speaker page between: href='https://LINK_SPEAKER_PAGE' Speaker avatar: change url of 'background-image' to the url of the image in linkedIn e". This is an unfilled Webflow template stub visible to end users.

### `blog/capacity-planning-definition`

- **content @ CTA button within 'Aligner capacité et demande' section** : The CTA button is labelled 'Télécharger' but links to '/fr/meetings-pages' (a demo/meeting booking page). The label does not match the destination, which will confuse and mislead users — this is a clear functional/content mismatch.

### `blog/comite-de-pilotage-definitions-et-incomprehensions`

- **content @ "À retenir" aside boxes (×3)** : Three separate 'À retenir' info boxes contain raw Webflow/template placeholder text: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This unfilled template copy is fully user-visible and appears three times in the article body.

### `blog/comite-pilotage-projet`

- **content @ Astuce 5 — aside callout 'À retenir'** : The quote inside the callout is truncated mid-sentence: "Le temps qu'on prend à s'aligner ce n'est pas du temps perdu..." — it ends with an ellipsis and no closing quotation mark, indicating the content was cut off before completion.

### `blog/comment-decider-en-copil`

- **content @ First 'À retenir' callout block (Lionel M. quote)** : The quote is truncated mid-sentence: 'tu sors parfois de Copil en te disant : on fait' — the sentence ends abruptly with no conclusion, leaving a visible broken quote in the rendered page.
- **content @ Second 'À retenir' callout block (OCTO Tech quote)** : The OCTO Tech quote is also cut off mid-sentence: 'Le premier est le relevé de décisions. Cela peut paraître anecdotique, mais nous' — visibly truncated, no closing thought.

### `blog/comment-faire-un-bon-point-davancement-projet`

- **structure @ HTML root** : The page opens with '<div hidden=""></div>' before the '<html>' tag, meaning content appears outside the html element. This is invalid HTML and may cause browser rendering issues or confuse crawlers.

### `blog/comment-reussir-un-projet-transverse`

- **content @ Blog post meta — date field** : The publication date is shown as 'Le 1 février 2026', which is a future date (over a year ahead). This is almost certainly a data/formatting bug and will confuse readers and damage credibility.

### `blog/gestion-de-portefeuille-projet-pme`

- **content @ Callout / aside boxes (multiple occurrences throughout blog body)** : Every 'À retenir' callout box contains raw template placeholder text: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This stub content is repeated at least three times and is user-visible on the live page.

### `blog/gestion-portefeuille-projets-vs-gestion-de-projet`

- **content @ Blog hero — author chip** : The author avatar image URL contains 'Avatar%20Je%CC%81ro%CC%82me.png' (Jérôme) but the displayed name and alt text both read 'Jonas Roman'. Either the author name is incorrect or the wrong avatar is used — a clear content mismatch visible to all readers.

### `blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0`

- **content @ Multiple 'À retenir' callout boxes throughout blog body** : Every 'À retenir' blockquote is truncated mid-sentence (e.g., '…résoudre leurs pro', '…l'arrivée de l'automatisation', '…des bancs te'). The quotes are visibly cut off and never complete, making key takeaways unreadable.
- **content @ Blog hero — publication date** : The article shows 'Le 1 février 2026', a future date. This is almost certainly a data mapping error (wrong year) and will confuse readers and harm SEO credibility.

### `blog/le-grand-guide-de-la-conduite-de-projet`

- **content @ Blog hero — publication date** : The article shows 'Le 1 février 2026' as the publication date, which is a future date (over a year ahead). This is almost certainly a data/placeholder error that will confuse readers and damage credibility.

### `blog/le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation`

- **structure @ HTML document root** : The page opens with '<div hidden=""></div><html lang="fr">' — a hidden div appears before the <html> tag, indicating broken document structure. This is invalid HTML and could cause rendering and SEO issues.

### `blog/les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet`

- **content @ Blog post meta — publication date** : The publication date reads 'Le 1 février 2026', which is a future date (over a year ahead). This is almost certainly a data/mapping bug and will appear wrong to every visitor.

### `blog/management-de-portefeuille-de-projet`

- **content @ Blog hero — author byline** : The avatar image URL contains 'Avatar%20Je%CC%81ro%CC%82me' (Jérôme) but the displayed author name is 'Jonas Roman'. The wrong person's photo is shown, creating a visible identity mismatch on a published article.

### `blog/pi-safe`

- **content @ Aside callout — first 'À retenir' block (after advantages list)** : The callout text is visibly truncated mid-sentence: '…se focalise sur pourquoi on fait ce pr' — the sentence ends abruptly. This is user-visible broken copy on a published page.
- **content @ Aside callout — second 'À retenir' block (after 'Avoir une vision claire')** : Callout text is cut off mid-sentence: '…Il peut s'agir d'une nouvelle réglementation à suivre, de projet' — truncated before completing the thought.
- **content @ Aside callout — third 'À retenir' block (after 'Anticiper les blocages')** : Callout text is cut off mid-sentence: '…et une estimation "' — the sentence ends abruptly with an open quotation mark. Broken copy visible to all users.

### `blog/metier-pmo`

- **functional @ Sommaire — anchor links #le-reporting-pmo-comment-le-réussir and #faq-les-questions-fréquentes-sur-le-pmo** : The Sommaire lists two sections ('Le reporting PMO : comment le réussir' and 'FAQ : les questions fréquentes sur le PMO') that have no corresponding anchor IDs in the rendered HTML due to the content truncation, so clicking these links will silently fail.

### `blog/pilotage-de-projet`

- **content @ "À retenir" aside boxes (multiple occurrences)** : All three 'À retenir' callout boxes contain raw placeholder/template instructions ('Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image"...') instead of actual editorial content. This is a copy-paste stub from a CMS template that was never filled in, visible to all users.

### `blog/plan-de-communication-projet`

- **content @ Blog hero — publication date** : The article shows 'Le 1 février 2026' as the publication date, which is a future date (more than a year ahead). This is almost certainly a data/migration bug and will immediately undermine credibility with readers.

### `blog/portefeuille-projet`

- **content @ Hero — author badge** : The author avatar image URL loads a photo labeled 'Avatar Jérôme' (CDN filename contains 'Je%CC%81ro%CC%82me') but the displayed name is 'Jonas Roman'. The image and name are mismatched, showing the wrong person's photo next to the wrong name.

### `blog/pourquoi-vos-18-millions`

- **content @ First 'À retenir' callout box (section 1)** : The callout text is visibly truncated mid-sentence: '…le même tempo. Sauf qu'on fait 500 millions de C' — the sentence is cut off and the content is incomplete, which will be user-visible on the live page.
- **content @ Third 'À retenir' callout box (L'illusion du pilotage stratégique, second callout)** : The quote ends abruptly: '…il a fallu 3 semaines pour établir une liste fiable. Trois semaines dans une organisation de 2 100 personnes. Chief' — 'Chief' is truncated and the speaker's title/company is missing.

### `blog/preparer-comite-de-pilotage-d-un-projet`

- **content @ Blog hero — publication date** : The article shows 'Le 1 février 2026' as the publication date, which is a future date (2026). This is almost certainly a data mapping bug that will confuse readers and harm SEO credibility.

### `blog/program-increment-planning`

- **content @ First 'À retenir' callout block (before H3 'Qu'est-ce qu'un PI Planning ?')** : The quote text is visibly truncated mid-sentence: 'Ils apportent aussi leurs bonnes pratiques' ends abruptly without completing the thought. This is reader-facing and looks like a broken/stub import.
- **content @ Second 'À retenir' callout block (after H3 'Qu'est-ce qu'un PI Planning ?')** : Expert quote is cut off mid-sentence: '…c'est que les gens qui y participent sont ceux qui y mett' — the verb 'mettent' and the rest of the sentence are missing. Hard truncation visible to readers.
- **content @ Third 'À retenir' callout block (after 'PI Planning et framework SAFe')** : Quote ends mid-sentence: 'Les valeurs temporelles comme le trimestre sont très a' — the adjective and rest of sentence are truncated. Same pattern of broken quote rendering.
- **content @ Fourth 'À retenir' callout block (second one under 'PI Planning et framework SAFe')** : Expert quote truncated: '…dans un contexte de gestion de portefeuille de projets, il peut' — sentence incomplete. Multiple callout blocks share this same truncation bug, suggesting a systemic character-limit issue in the quote renderer.
- **content @ Fifth 'À retenir' callout block (under 'Quels sont les bénéfices d'un PI Planning ?')** : Quote cut off: '…Grâce à un PI Planning, on voit tout passer : les capacités comme le budget à attribuer' — ends abruptly. Blocking issue as every 'À retenir' block in the visible portion of the page is broken.

### `blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets`

- **content @ Aside / callout block 'À retenir'** : The 'À retenir' callout contains raw Webflow template placeholder text: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This is an unfilled stub shipped verbatim to the user.

## P1 issues by page

### `lp/pmo`
- **structure** @ Logos / social proof section : The social proof section uses an <h3> ('Ils nous font confiance') as the first heading after the H1 hero, with no H2 between them. This skips a heading level and breaks the document outline, which affects both accessibility and SEO.
- **content** @ Vision globale du portefeuille — feature section body : The body copy ('80 projets côté DSI. 80 côté Marketing. 80 côté Finance.') is a near-verbatim repeat of the H1 hero headline. This reads as a copy-paste placeholder rather than a distinct value statement for this feature.
- **content** @ Vision globale du portefeuille — screenshot image : The screenshot alt-text says 'Portfolio' but the image src filename contains 'en' (english) — 'Portfolio_projects_kanban_status_en.png' — suggesting an English-language UI screenshot is being displayed on the French landing page, which would look inconsistent to French visitors.
- **layout** @ FAQ accordion — icon column : The Font Awesome Duotone icon span is rendered as an empty box (no icon character in the HTML content), leaving a visible blank ~37px square before every FAQ question. The icon ligature/glyph is missing from the markup, resulting in a broken visual layout.
- **functional** @ Nav CTA — 'Demander une démo' button : The nav 'Demander une démo' button links to '/fr/meetings-pages', while the hero primary CTA 'Réservez une démo' also links to '/fr/meetings-pages'. These are consistent, but the nav label uses 'Demander' while the hero uses 'Réservez' — minor inconsistency aside, the real issue is that the secondary hero CTA '▶️ Découvrir l'outil PMO en vidéo (5 min)' links to '/fr/video/pmo', which should be verified as a real route and not a stub.

### `lp/pi-planning`
- **content** @ FAQ — 'Combien ça coûte ?' : The answer to the pricing question is 'Prix accessible. Parlons-en lors d'une démo.' — this is a non-answer that deflects rather than informs. On a landing page, this reads as evasive and may erode trust; at minimum it should give a pricing range or link to a pricing page.
- **structure** @ Social proof / logo strip section : The logo strip section uses an H3 ('Ils nous font confiance') where an H2 is semantically expected — the page jumps from H1 (hero) directly to H3, skipping H2 entirely in the document outline at this point, breaking heading hierarchy.
- **content** @ Feature section — 'Les objectifs PI ne disparaissent plus' : The image used for this section (alt='Capacity', src 'Capacity screen.webp') is a capacity-planning screenshot, not an objective-tracking view — the visual does not match the section's stated topic ('PI objectives tracking'), creating a content/visual mismatch.
- **content** @ Feature section — '"Peut-on prendre ce projet ?" Enfin une réponse.' : The image shown (alt='Capacity', src 'quarter plan teams EN.webp') has an English-language UI label ('EN' in filename), visible on a French-language landing page. If the screenshot contains English text it contradicts the page locale and looks like a placeholder.

### `lp/capacity-planning`
- **content** @ Feature sections — 'Agent IA Brief projet' and 'Agent IA Découpage projet' : Two consecutive feature sections are about AI agents for project briefs and project breakdown. These are AI-specific features, yet the page is a Capacity Planning landing page — no introductory heading or transition copy contextualises why AI agents appear here before the capacity-planning features, making the section order feel disjointed and off-purpose.
- **functional** @ Nav CTA — 'Demander une démo' button : The nav CTA links to '/fr/meetings-pages' while the hero primary CTA links to '/fr/meetings-pages' as well — consistent, but the secondary hero CTA links to '/fr/livre-blanc/capacity-planning'. This is fine, but the nav label 'Demander une démo' should be verified to resolve correctly; the path 'meetings-pages' (English slug in a French route) looks like a leftover stub that may 404.
- **structure** @ Feature sections (all 8 alternating sections) : All eight feature sections use H3 headings but there is no parent H2 grouping them. After the H1 hero, the page never uses an H2 until the FAQ section, leaving a long stretch of H3s with no heading hierarchy, which is problematic for screen readers and SEO.
- **content** @ Trusted logos section — all logo images : All five client logo <img> elements have empty alt attributes (alt=""). While decorative images can use empty alt, trust-logo sections conventionally name the company for accessibility and context; anonymous logos provide no fallback if images fail to load.

### `lp/ppm`
- **functional** @ FAQ accordion / icon spans : Each FAQ button contains a Font Awesome Duotone icon rendered via a CSS font-family span, but the span has no text content — it is visually empty. The icon will not render in any browser that does not have Font Awesome 6 Duotone loaded, leaving a blank 2.3rem-wide gap to the left of every question label.
- **content** @ Hero / CTA buttons : The primary CTA 'Réservez une démo' links to '/fr/meetings-pages' while the nav button also links to '/fr/meetings-pages' with the label 'Demander une démo'. Two buttons on the same hero use inconsistent labels for the same destination, which is acceptable, but the secondary CTA links to '/fr/video/ppm' — this URL pattern should be verified as it is not referenced anywhere else in the visible site structure and may be a dead link.
- **content** @ FAQ section / 'Quel est le prix ?' : The price answer 'Prix accessible. Tarification sur mesure selon la taille de votre organisation. Parlons-en lors d'une démo.' is vague to the point of being unhelpful — it contains no actual pricing information or a link to a pricing page. For a PPM landing page targeting enterprise buyers, this is likely to hurt conversion and may be stub/placeholder copy.
- **layout** @ Feature sections alternating layout : Odd-numbered feature sections use 'bg-white' with 'lg:pl-[10rem] lg:pr-0' and even-numbered use 'bg-white' with 'lg:pr-[10rem] lg:pl-0'. Both background colors resolve to white (the even sections use color-prevention-10 for the image container only). With no visual section separator between 6 consecutive white-background feature sections, the page will appear as a single undifferentiated wall of content on desktop — there is no alternating background or divider to visually separate the sections.

### `produit/automatiser-la-com-projet`
- **structure** @ Standalone H3 outside section — 'Ajoutez les sponsors sur vos projets' : An H3 is rendered inside a bare <div> between two <section> elements, outside any section container. This orphaned heading breaks the document outline and creates an unexplained heading fragment that appears disconnected from its content.
- **content** @ Page overall — product feature sections : The page for 'Automatiser la com projet' only renders a single feature block (sponsors/health-check email). The live page contains multiple feature sections. The rebuild appears to be severely truncated, with most product content missing.
- **layout** @ Centered paragraph section between the two 'Ajoutez les sponsors' blocks : A <p> element wraps an inner <p> element (block inside inline), which is invalid HTML and will cause rendering differences across browsers — the inner paragraph may break out of the outer one unexpectedly.
- **functional** @ Hero CTA button / Nav CTA button : Both the hero CTA ('Je veux une démo') and the nav CTA ('Demander une démo') link to '/fr/meetings-pages', which appears to be a generic meetings landing page rather than a product-specific demo request, inconsistent with the page context.

### `produit/budget`
- **content** @ FAQ section — accordion icon : The Font Awesome icon span inside each FAQ accordion button renders as an empty box — the Font Awesome 6 Duotone webfont is not loaded, leaving a blank ~2.3rem-wide space next to every question. Visually the layout looks broken with a mysterious gap.
- **content** @ Section 'Prenez en compte le coût humain des projets' : The body copy reads 'Sur AirSaas renseigner les TJM des équipes et découvrez le coût humain de vos projets.' — the verb 'renseigner' is an infinitive where a conjugated form ('renseignez') is needed, making the sentence grammatically incorrect and reading like a truncated instruction.
- **content** @ Section 'Des indicateurs pour piloter sereinement' : The copy says 'Suivre les budgets project' — 'project' is English (should be 'projets'). This is a leftover translation error, not an intentional anglicism.
- **functional** @ Nav CTA — 'Demander une démo' button : The primary nav CTA links to '/fr/meetings-pages' and the hero CTA 'Je veux une démo' also links to '/fr/meetings-pages'. This path looks like a leftover slug that should be a dedicated demo/booking page — on the live site the equivalent routes to a properly named page. Worth verifying the destination is intentional and not a stub.

### `produit/capacity-planning`
- **content** @ Section 'Mise en place rapide, simple à maintenir dans le temps' : The section body is truncated mid-argument: it states 'Voici comment nous le concrétisons.' but the actual concretisation content (the bullet points or feature breakdown that should follow) is missing. The section ends abruptly with no substantive content.
- **content** @ Section 'Une vue simple et actionnable' : The paragraph ends with a colon ('pour prendre les décisions :') followed only by two zero-width space paragraphs (‍‍). The list of decisions is missing — content is clearly truncated.
- **content** @ Section 'Les Scénarios' (standalone h2 section) : This section contains only an introductory question with no answer or content below it, then the h3 'Trouvez le scénario qui fonctionne' appears as a separate orphaned div outside any section. The content structure is broken — the h3 and its paragraph are disconnected from the parent h2 section.
- **structure** @ H3 'Trouvez le scénario qui fonctionne' and H3 'Sur l'échelle de temps…' : Both H3s are rendered as standalone <div> elements outside any <section>, sitting between sections as floating headings. This breaks document outline and looks visually disconnected from their associated content paragraphs.
- **content** @ Section between H3 'Trouvez le scénario qui fonctionne' and H3 'Sur l'échelle de temps…' : The paragraph 'Agencez les projets et visualisez l'impact…' is followed by two zero-width space paragraphs with no image or feature card. There should be a screenshot or visual here (as seen on the live page) but it is absent.

### `produit/priorisation-par-equipes`
- **content** @ Feature section — 'Chaque équipe définie ses prios' : Heading contains a grammar error: 'définie' should be 'définit' (conjugation of 'définir' at 3rd person singular present). This is a user-visible typo in a prominent H3.
- **content** @ Feature section — 'Organisez la roadmap de façon éclairée' : Body copy contains a typo: 'porfolios' should be 'portfolios'. Visible spelling error in product copy.
- **content** @ FAQ section — accordion icon spans : All three FAQ accordion toggle buttons have empty icon spans (Font Awesome Duotone) rendering no visible icon — the span content is blank. Users see a blank space where an expand/collapse icon should appear.
- **content** @ FAQ section — 'Si on repriorise en cours de route…' answer : The answer copy ends abruptly mid-thought: 'Vous pouvez reprioriser en expliquant à tout le monde les raisons' — the sentence is grammatically incomplete (no object after 'les raisons'). Appears truncated.

### `produit/reporting-projet`
- **content** @ FAQ section — accordion icon spans : All three FAQ accordion toggle icons render as empty boxes — the Font Awesome 6 Duotone icon characters are missing (the span content is empty). Users see a blank square instead of an expand/collapse icon, making the accordion feel broken visually.
- **content** @ Section 'Prenons de la hauteur' — paragraph copy : The copy contains a double apostrophe typo: "niveau de d'abstraction" should be "niveau d'abstraction" — the extra "de" makes the sentence grammatically incorrect and looks like a copy-paste error.
- **structure** @ Section 'Prenons de la hauteur' — paragraph HTML : The rich text field renders a <p> nested inside another <p> (a <span> wrapping block-level <p> and <ul> elements inside a <p>), which is invalid HTML. This will cause browsers to break the DOM unexpectedly and may cause the bullet list to render outside the styled container.

### `produit/traduction-one-click-avec-deepl`
- **content** @ Section 'Animer une réunion, aligner les parties prenantes...' (H3 + paragraph) : The H3 heading 'Animer une réunion, aligner les parties prenantes, on parle le même language !' and its paragraph body are duplicated verbatim in two separate sections — once as a standalone H3 div + section pair, and again later as a full section with h3 + paragraph. This is a copy/paste duplication of an entire content block.
- **content** @ Section 'Vos chefs de projets et PO vont adorer' : This section ends with 'Voici comment nous le concrétisons.' but the promised concrete content never follows — the next section jumps directly to H3 subheadings without delivering the expected list or explanation. The section feels truncated.
- **structure** @ Second H2 section body (paragraph containing ul) : A <ul> list is nested inside a <p> element, which is invalid HTML (block element inside inline container). This will cause layout/rendering issues across browsers and is semantically incorrect.
- **content** @ H3 heading 'Animer une réunion... on parle le même language !' : 'Language' is the English spelling; the correct French word is 'langage'. This is a language error in a heading that appears twice on the page.

### `solution/airsaas-et-les-experts-de-la-transfo`
- **content** @ Hero section — paragraph body : The hero paragraph runs two sentences together without a space or line break: '…au coeur de votre stratégie.Êtes-vous prêt…' — the period and capital letter are concatenated with no space, making it read as a single malformed sentence.
- **brand** @ Section 'AirSaas dans le tooling des missions' — body copy : 'Airsaas' is written with a lowercase 's' ('Airsaas vous fournit sa solution PPM') instead of the correct brand casing 'AirSaas'. This is a brand typo.
- **content** @ Section 'AirSaas dans le tooling des missions' — body copy : The sentence ends with '…grâce mode multi-workspace' — the word 'au' is missing ('grâce au mode multi-workspace'), making the sentence grammatically broken and unreadable.
- **functional** @ Section 'You never walk alone' — CTA / call to action : The section ends with the rhetorical question 'Partenaires, cette communauté de 200+ experts vous intéresse ?' but there is no CTA button or link — unlike every other section on the live page which has an action button. The section has a dead end with no conversion path.
- **layout** @ Section 'You never walk alone' — image panel : The LPDT logo (a white-on-transparent SVG) is rendered inside a lavender/primary-5 background container with object-cover applied as if it were a photo. The logo will be invisible or severely cropped — it should be displayed as a centered logo, not treated as a cover image.

### `solution/flash-report`
- **structure** @ Section 'Ils parlent de nous' (press logos band) : This section uses an H3 as its first heading, appearing before any H2 on the page after the H1. The heading hierarchy jumps from H1 directly to H3, which is both an accessibility issue and semantically incorrect.
- **content** @ Section 'Les bonnes pratiques de flash report…' : The section heading promises 'trois conseils' (three best-practice tips) but the body paragraph is only a one-sentence intro with no actual tips listed — the three items appear to be missing entirely, leaving the section as a stub.
- **content** @ Section 'Plus qu'une solution de reporting flash' (governance section) : This section has a heading and a broken intro paragraph but contains no feature cards, links, or supporting content — it is an empty/stub section with nothing below the copy, which would look like a broken layout to any visitor.
- **layout** @ Feature section 'Mettez en valeur le ressenti de vos équipes' : The image used ('metier-it.svg') is a generic IT/métier illustration with no relation to team sentiment or project feedback — it appears to be a wrong/placeholder image swapped in for this specific feature block.

### `solution/flash-report-projet`
- **content** @ "Plus qu'une solution de reporting flash" section : The section has an H2 heading and a single short paragraph acting as a lead-in, but no actual feature cards, list, or content body follows — the section renders as a stub with only the intro text and no substantive content beneath it.
- **content** @ "3 règles d'or pour utiliser votre flash report projet" section : The section heading promises '3 règles d'or' but the body contains only a one-sentence teaser paragraph with no rules listed — the actual rule cards or content blocks are entirely missing from this section.
- **content** @ "Des intégrations natives" feature section — body paragraph : The integrations paragraph is duplicated almost verbatim within the same text block: the list of tools (Jira, ClickUp, Asana, Monday, Microsoft Teams, Zendesk) and the marketplace pitch appear twice in immediate succession, making the copy look like a copy-paste error.
- **layout** @ "Une structure fixe hyper-lisible" and previous section — alternating layout : Two consecutive feature sections ('Des intégrations natives' and 'Une structure fixe hyper-lisible') both use the same lg:pl-[10rem] lg:pr-0 left-text / right-image layout instead of alternating sides, breaking the intended zigzag visual rhythm.
- **content** @ Hero section — CTA area : The hero CTA strip contains only one button ('Réservez une démo') with no secondary CTA (e.g. a free trial or tour link), whereas solution pages typically pair a primary and secondary action; a single CTA with no alternative may reduce conversion and looks visually unbalanced.

### `solution/management-de-portefeuille-projet`
- **content** @ Section 'Les 5 règles d'or d'un bon management de portefeuille projet' : This section announces '5 règles d'or' but contains only an intro paragraph with no actual list of five rules — no numbered items, no feature cards, no sub-sections follow. The section body is empty/stub and users see an unfulfilled promise.
- **content** @ Section 'Collaborez pour mieux transformer votre entreprise' : This section contains only a single short paragraph of intro copy with no supporting visual, feature grid, or additional content. It appears to be a stub section missing its body content (likely a feature illustration or bullet list that was not ported).
- **content** @ Feature section 'La vue liste' — img alt attribute : The screenshot image for 'La vue liste' has alt='List' — a raw English/placeholder alt text rather than a descriptive French string. This is both an accessibility failure and a brand inconsistency on a French-language page.
- **content** @ Feature section 'La vue Kanban' — img alt attribute : The screenshot image for 'La vue Kanban' has alt='Kanban' which is a bare label, not descriptive. Additionally the image source is 'Portfolio%20header%20menu.webp' which is a header-menu screenshot, not a Kanban view — the wrong image appears to be mapped to this section.
- **content** @ Feature section 'La vue timeline' (second occurrence) : The timeline section reuses the exact same image URL as the very first feature section ('Portfolio%20project%20timeline%20view.webp' for 'planification stratégique'). The timeline view image is duplicated across two distinct feature sections, which looks broken to users.

### `solution/outil-ppm`
- **structure** @ All feature/benefit sections (H3 headings + body paragraphs) : Every content section uses an H3 heading rendered outside its sibling section element (separate div), then a section with body text only. This produces an illogical heading hierarchy where H3s float as independent sibling divs with no associated sectioning content, harming both accessibility and SEO.
- **content** @ Hero section — paragraph text : The intro paragraph reads 'Souvent complexes et coûteux à implémenter, AirSaas propose un outil PPM nouvelle génération.' — the sentence is grammatically broken; the subject of the subordinate clause ('Souvent complexes et coûteux à implémenter') has no referent and doesn't agree with 'AirSaas'. Should read something like 'Les outils PPM traditionnels sont souvent complexes… AirSaas propose…'.
- **content** @ Section 'Gagnez du temps en reporting' — internal link : The link inside the rich-text block points to the absolute live-site URL 'https://www.airsaas.io/fr/solution/flash-report-projet' rather than a relative path. On the rebuild this will send users to the live site instead of the rebuilt page, breaking internal navigation consistency.
- **content** @ Section 'Améliorez votre gestion des ressources' — internal link : The anchor inside the body text points to the absolute live URL 'https://www.airsaas.io/fr/gestion-de-projet/capacity-planning', again bypassing the rebuild environment. Same hardcoded-absolute-URL issue as the flash-report link.

### `solution/gestion-portefeuille-projet`
- **structure** @ Content body — multiple adjacent `<section>` blocks with no heading : Large portions of body text are split across many separate `<section>` elements containing only a `<p>` tag with no heading, creating an illogical document outline. Several of these sections appear to be orphaned fragments of a single rich-text block that was split incorrectly during migration (e.g., the 'pyramides de Maslow' sentence is an entire section on its own, ending mid-argument with no following visual).
- **content** @ Section: 'Pour opposer ces deux styles de DSI…' (Maslow pyramid section) : The paragraph ends with 'on pourrait les représenter par des pyramides de Maslow :' — a colon implying an image or diagram follows — but no image is rendered. The visual asset referenced in the live page is missing, leaving a dangling sentence.
- **content** @ Section near 'AirSaas est donc solution PPM…' : The sentence reads '<strong>AirSaas</strong>est donc solution PPM…' — the word 'une' is missing ('est donc **une** solution PPM') and there is no space between the closing </strong> tag and 'est', making it render as 'AirSaasest'. This is a copy bug visible to any reader.
- **content** @ Section body — competitor names (Sciforma, Ganttic, Planview) : Direct competitor product names are called out by name in the body copy in a neutral-to-positive context. This is carried over from the live page but is a brand risk on the rebuild; at minimum it should be flagged for editorial review before ship.
- **structure** @ 'Ils parlent de nous' section — heading level : The 'Ils parlent de nous' press logo bar uses an <h3> as its first heading on the page after the H1, skipping H2 entirely. This breaks heading hierarchy (H1 → H3) and is an accessibility/SEO issue.

### `solution/outils-de-pilotage-projet`
- **content** @ Section referencing 'Maslow pyramids' ('Pour matérialiser un idéal type…') : The paragraph references 'ces pyramides de Maslow' but no image or diagram is rendered — the visual it points to is missing. Users are told to look at something that doesn't exist on the page.
- **structure** @ Multiple body sections between H2 headings : Several consecutive <section> elements contain only a <p> of body copy with no heading at all, causing a broken heading hierarchy where H3 sub-sections appear as standalone <div> elements outside their parent <section>. The H3 divs and their related content sections are structurally disconnected.
- **content** @ Section 'Un outil de pilotage projet souple et intégrable facilement' — Jira paragraph : 'Jira.' appears as a bold heading-like label followed by a period then a line break, which looks like a formatting artefact from a rich-text migration. The period after 'Jira' and the trailing dot before the integration description look like a truncation or import error.
- **content** @ Sections describing ERP vs. specialised tools : A section discusses 'ces deux types d'outils' (ERP complet vs. outil spécialisé) but the preceding content that would have introduced this contrast appears to have been dropped during migration — the reader has no context for what the two types are when this paragraph appears.

### `solution/tableau-de-bord-dsi`
- **structure** @ "La vue Kaban" standalone section (after first content section) : This section is an orphaned paragraph with no heading and no visual context. It references a 'vue Kaban' (also misspelled — should be 'Kanban') but floats between sections with no structural relationship, making it read as truncated filler content.
- **content** @ "Kaban" spelling in orphaned paragraph section : The product view is referred to as 'vue Kaban' — a clear misspelling of 'Kanban'. This is a product-name error visible to all users and misrepresents the feature.
- **structure** @ Multiple body sections between H2 headings : Several consecutive <section> elements contain only a bare paragraph with no heading, causing a broken heading hierarchy: long stretches of the page have no H2/H3 anchor, making it impossible to scan the page structure and hurting both UX and SEO.
- **content** @ Hero paragraph — missing space between two sentences : The hero paragraph has 'etc.).La mesure' — two sentences concatenated without a space after the closing parenthesis/period, producing a visible typographic error in the most prominent text block on the page.
- **layout** @ "Embarquez par une bonne communication" split section — image : The image in this section uses a generic SVG asset (609552290d93fd66030f0e89_5.svg) that appears to be a leftover Webflow placeholder rather than a real product screenshot, making the section look unfinished alongside the empty body copy.

### `solution/portfolio-management`
- **content** @ Section 'Votre reporting projet en un clic' and 'Ritualisez vos reportings' : Both feature sections use the exact same screenshot image (Flash report ppt — 65d35ce9e34fd87ad7612c9d). A user scrolling through sees the identical visual twice for two different supposed features, which looks like a copy-paste error.
- **structure** @ Sections 'Une plateforme de gouvernance projet' and 'Un capacity planning' and '5 bonnes pratiques' and 'Grâce à sa marketplace' : Four consecutive H2 sections appear with heading + paragraph only — no accompanying visuals, cards, lists, or interactive elements. These sections render as walls of centered text with no supporting UI, looking like stub/placeholder sections with content that was never fully built out.
- **content** @ Section 'Diffusez un cadrage projet standardisé' and 'Commencez par un cadrage de projet optimal' : Both feature sections cover essentially the same topic (project scoping / fiches cadrage) with very similar copy, appearing only a few sections apart. This reads as duplicated content rather than two distinct features, which undermines the page's value proposition.
- **structure** @ Section 'Ils parlent de nous' : This section uses an H3 as its first heading on the page below the H1, which is correct, but the section label 'Ils parlent de nous' (press logos) uses an H3 with gradient styling that visually implies a major section heading — it would be more appropriate as a visually-styled label/caption, not a semantic heading that inflates the outline.
- **layout** @ Hero section : The hero section contains only an H1, a subtitle paragraph, and a single CTA button — no hero image, illustration, or product screenshot is present. The section has min-h-screen set, so it renders as a near-empty full-viewport white area, which will look broken to users above the fold.

### `solution/revue-de-portefeuille`
- **structure** @ Section intro '6 clés pour rendre vos revues de portefeuille' : The section heading announces '6 clés' but the page renders 9 feature/content sections below it (Données consolidées, Vues personnalisables, Reporting flash, Expérience utilisateur, Fiches de cadrage, Bilans de projets, Intégrations, Priorisation, Inviter les bonnes personnes + at least one truncated). The claimed count of 6 does not match the actual content count visible to the user.
- **content** @ Section intro '6 clés' — paragraph wrapper : The intro paragraph uses a nested <p> inside a <span> inside another <p> (`<p><span><p>…</p></span></p>`), which is invalid HTML and will cause the browser to break the DOM — the inner <p> closes the outer <p> prematurely, potentially rendering orphaned text or misaligned layout.
- **structure** @ Section heading — 'Ils parlent de nous' : The press-logos section uses an H3 ('Ils parlent de nous') with no H2 above it in the page flow after the H1, breaking heading hierarchy (H1 → H3 skip). This also misrepresents the section: 'Ils parlent de nous' is a press mention bar, not a testimonials section, yet its heading level implies it is a major content section.
- **functional** @ Feature section — 'Votre reporting flash automatisé' — internal links : Two anchor tags inside the body copy point to absolute airsaas.io URLs (`https://www.airsaas.io/fr/solution/flash-report-projet` and `https://www.airsaas.io/fr/gestion-de-projet/pilotage-de-projet`) instead of relative paths. On the rebuild domain these links will leave the rebuild environment and land on the live site, breaking user flow during QA and after launch if slug structure differs.

### `solution/tableau-de-bord-gestion-de-projet`
- **structure** @ Feature row — 'Quelques principes à respecter pour une gestion de portefeuille optimale' : The H3 heading introduces principles about indicators, but the actual bulleted list of those principles is rendered in a separate orphaned <section> higher up the page (the standalone bullet-list section), completely detached from this heading. The feature row's body copy only says 'Il est important de respecter certaines règles de forme…' with no list, making the section feel truncated.
- **content** @ Feature row — 'Tableau de bord de gestion de projets : pourquoi est-ce crucial…' : The body copy ends mid-thought with only one sentence and a trailing '‍' zero-width joiner, then stops. The section body is visibly incomplete — no supporting explanation follows the opening statement about DSI missions.
- **layout** @ Section between hero and feature rows (7 raw text sections) : All seven inline text sections share identical layout (centered, full-width paragraph, no heading, no visual break), making it impossible for a reader to distinguish where one topic ends and another begins. This is a content-structure collapse, not just a styling choice.
- **functional** @ Hero CTA button : The sole CTA in the hero is 'Réservez une démo' linking to '/fr/meetings-pages' — the URL slug 'meetings-pages' is English and appears to be an untranslated Webflow page slug, which may result in a broken or mislabeled destination in the French locale.

### `equipe/comite-direction`
- **structure** @ Page-level heading hierarchy : The 'Ils parlent de nous' media-logo bar uses an H3 and the feature sections use H3 headings, but the two major mid-page sections ('Vos équipes vont adorer…' and 'Laissez nos clients…') use H2. The 'Suivez l'avancée de vos programmes' closing section also uses H3 with no H2 parent, creating an inconsistent and illogical heading hierarchy below the H1.
- **content** @ Section 'Suivez l'avancée de vos programmes' : This section has a heading and a single short paragraph but no supporting visual (chart, screenshot, or graphic) unlike every other feature section on the page, leaving it visually incomplete and inconsistent with the alternating text+image pattern used throughout.
- **functional** @ Hero CTA button : The sole hero CTA 'Réservez une démo' links to '/fr/meetings-pages', which is the same destination as the nav bar 'Demander une démo' button — acceptable — but the hero section has only one CTA with no secondary option (e.g. product tour or login), which is weaker than the live page and may reduce conversion.

### `solution/tableau-de-bord-portefeuille-de-projet`
- **structure** @ "Ils parlent de nous" section : This section uses an H3 as its first heading after the H1, skipping H2 entirely. A press-logos band sitting between the hero and the first content section should not carry a structural heading higher than or equal to sibling H2 sections, and the heading hierarchy jumps from H1 → H3 which is semantically invalid.
- **content** @ "La vue liste" feature section : The image alt text is the generic English word "List" — this is a placeholder-quality alt attribute on a product screenshot that should describe the UI shown (e.g. "Vue liste du portefeuille de projets AirSaas").
- **content** @ "La vue Kanban" feature section — image : The image shown (alt="Kanban") is sourced from "Portfolio%20header%20menu.webp" — a header/menu screenshot — not an actual Kanban board view. The image does not match the section it illustrates, which will confuse visitors.
- **content** @ "Une vue macro au service de votre planification stratégique" and "La vue timeline" sections : Both sections use the exact same image file (65ce3c00c0a4886fc8e9f671_Portfolio%20project%20timeline%20view.webp). The "Vue macro" section showing a timeline screenshot when the section is about macro portfolio overview is a content mismatch; the same image appearing twice on the same page also looks like a production error.
- **structure** @ "Collaborez pour mieux transformer" and "Les clés de succès pour concevoir votre tableau de bord" sections : Both sections are standalone text-only blocks with an H2 heading and a paragraph but zero supporting visuals, cards, or CTAs. They appear as orphaned stub sections — the live site embeds these as intro paragraphs inside richer sections, not as isolated full-page sections.

### `equipe/direction-de-la-transformation`
- **typography** @ H1 — hero section : The H1 text reads 'L'outil des Directions de la transformation pour mieux piloterleurs grands programmes' — 'piloter' and 'leurs' are concatenated without a space, producing 'piloterleurs' which is a visible typo in the primary hero heading.
- **structure** @ DAKI sub-sections — DROP / ADD / KEEP / IMPROVE headings : Each DAKI item uses an H3 with gradient styling identical to top-level section headings, giving single acronyms like 'DROP' or 'ADD' the same visual weight as major section titles. These should be subordinate labels (H4 or styled differently), not H3s, to maintain logical heading hierarchy under the parent H2.
- **layout** @ DAKI sub-sections — full section padding : Each stub DAKI item (DROP, ADD, KEEP, IMPROVE) is wrapped in a full <section> with py-[3rem] md:py-[5rem] lg:py-[6.25rem] padding, creating enormous whitespace around one-sentence content blocks. The cumulative empty space will appear broken on all viewport sizes.
- **content** @ Section — 'Uniformisez le reporting projet' : This section heading introduces flash reporting but is immediately followed by a feature block whose heading is 'Faites gagner 1 jour par semaine à vos chefs de projet' and whose screenshot shows 'Portfolio share decision' — the section title and the content below do not match, suggesting a layout ordering error.

### `equipe/it-et-operation`
- **content** @ Section heading — 'La marketplate AirSaas' : The heading reads 'La marketplate AirSaas' which is a clear typo — should be 'La marketplace AirSaas'. This is a brand-visible spelling error on a section title.
- **structure** @ Sections — 'La plateforme qui fluidifie…' and 'La marketplate AirSaas…' and 'Laissez nos clients vous parler…' : Three consecutive sections contain only a heading and a short paragraph with no supporting content (no feature cards, no images, no testimonials, no integrations list). These appear to be stub/empty sections where the actual content block (cards, logos, carousel, etc.) was never rendered.
- **content** @ Section — 'La marketplate AirSaas : pour intégrer nativement…' : The integrations/marketplace section has no integration logos, cards, or visuals — only descriptive text. The live page shows integration partner logos/tiles; these are entirely absent from the rebuild.
- **functional** @ Hero CTA button — 'Réservez une démo' : The primary hero CTA links to '/fr/meetings-pages' rather than a dedicated booking or demo request page. The nav bar's 'Demander une démo' button also points to the same URL, but the hero CTA label says 'Réservez' implying a calendar/booking flow — verify the destination is correct and functional.

### `equipe/outil-pmo`
- **structure** @ H1 — hero section : The H1 reads "L'outil PPMpour un PMO moderne" — the word "PPM" and "pour" are concatenated with no space, which will render visibly as a typo in the browser.
- **content** @ Feature section — "Animez clairement et simplement vos CoPil" : This section reuses the exact same screenshot image (Portfolio decisions — show projects title) as the earlier "Fluidifiez votre prise de décisions" section. Two different feature narratives share the identical visual, making the page look copy-pasted and confusing the user.
- **content** @ Sections: "Une plateforme de gouvernance…", "Un capacity planning…", "Grâce à sa marketplace…", "Laissez nos clients vous parler d'AirSaas" : All four of these centred h2 sections contain only a heading + a single paragraph of body copy and no supporting visual, card grid, testimonial, or media. On the live site these sections contain feature grids or testimonial carousels; their content components appear completely absent in the rebuild, leaving four back-to-back text-only stub sections.
- **structure** @ "Ils parlent de nous" section : This press-logo bar uses an H3 as its title even though it sits immediately after the H1 hero with no H2 above it, breaking the heading hierarchy (H1 → H3 skips H2).

### `blog/analyse-des-risques-projet`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date (over a year ahead). This is almost certainly a data error that will confuse readers and hurt SEO credibility.
- **content** @ Blog body — Étape 1 paragraph : The word 'traitchef ement' appears mid-sentence ('L'identification des risques et leur traitchef ement doit se faire…'). This is a corrupted word — 'chef' was accidentally inserted into 'traitement', likely a copy-paste or migration artifact.
- **functional** @ Blog body — internal link (conduite de projet) : The link to the related article uses a root-relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the '/fr/' locale prefix, which will 404 in the new Next.js i18n routing.
- **functional** @ Blog body — internal link (budgetiser un projet) : The budget article link points to 'https://www.airsaas.io/gestion-de-projet/budgetiser-un-projet-sans-se-louper' — an absolute URL to the old live domain instead of a relative path in the rebuild, breaking locale consistency and sending users off-site.
- **structure** @ Blog body — heading hierarchy : The article body starts immediately with an H3 ('Pourquoi est-ce important…') as the first section heading — there is no H2 wrapping the blog content body. This skips a heading level directly from the page H1 to H3, which is a semantic/accessibility violation.

### `blog/10-pratiques-pour-developper-la-relation-de-confiance-dg-cio`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data/mapping error (likely 2023 or 2024 based on the workshop content), and will look wrong to any reader.
- **content** @ Blog hero — H1 title : The H1 reads '10 tips pour la relation DG/CIO' but the article slug and body consistently use 'DG/CIO' as 'DG/DSI' (Directeur des Systèmes d'Information). The live page title and body copy use 'DSI', not 'CIO' — mixing the French acronym DSI with the English acronym CIO in the headline looks inconsistent and may confuse the target French audience.
- **content** @ Blog body — figcaption under workshop photo : The figcaption text reads '12 pro. qui partagent durant une après-midi afin de créer des communs autour de la transfo.Travailler les relations avec les DG grâce au théâtre forum.' — there is a missing space between the two sentences (after 'transfo.'), making it look like a copy-paste/render error.

### `blog/appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management`
- **content** @ Blog post publication date : The article is dated 'Le 1 février 2026', which is a future date (more than a year ahead). This is almost certainly a data entry error and will confuse readers and damage credibility.
- **content** @ Idée reçue n°4 body paragraph : A paragraph reads 'Ensuite, qu'on définit le troisième workshop, c'est qu'on va définir un manifeste projet organisationnel…Déjà,' — the sentence ends abruptly mid-thought with a dangling 'Déjà,' suggesting truncated/unfinished copy that was not cleaned up from a draft.
- **content** @ Sommaire (table of contents) : The table of contents lists only 3 entries (L'essentiel, Sept idées reçues, Conclusions), but the article body contains at least 7 numbered 'idées reçues' subsections plus additional structural sections — the ToC is significantly incomplete and will mislead readers navigating the page.
- **content** @ Idée reçue n°3 body — competitor mentions : The paragraph explicitly names competitors 'JIRA, Asana ou Wrike' in a context that suggests they are acceptable alternatives to keep running alongside AirSaas. While contextually defensible, presenting competitor brand names prominently in AirSaas marketing copy is an unusual brand risk that should be reviewed before ship.
- **content** @ Idée reçue n°2 body paragraph : The sentence 'Si vous implémentez une solution sur un processus à maturité faible. En ce sens que les nouveaux usages attendus en gouvernance ne seront pas au rendez-vous si leurs prémisses sont déjà erronées.!' is grammatically broken — it is a sentence fragment starting with 'En ce sens que…' and ends with an exclamation mark after a period, indicating corrupted or truncated source copy.

### `blog/budget-previsionnel-projet`
- **content** @ Blog hero — author avatar : The author photo URL points to an image tagged 'SV-min.jpg' (initials SV) but the displayed name is 'Jérôme Dard' — the avatar and the name do not match, suggesting a wrong or recycled image asset.
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. Either the date is a placeholder or a data-mapping error; a future publication date will confuse readers and harm SEO credibility.
- **functional** @ CTA section — 'Réserver une démo' button : The CTA button wrapper has class 'opacity-0 scale-[0.92]' with no visible trigger to animate it in — it will render invisible on page load for users with JavaScript disabled or if the intersection observer never fires, making the primary conversion CTA invisible.
- **content** @ Blog body — internal link : The link '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' uses a relative path without the '/fr/' locale prefix, which will result in a 404 on the new Next.js routing structure (all other internal links correctly use '/fr/...').
- **functional** @ CTA floating card (bottom-right decoration) : The decorative floating card contains a Font Awesome icon rendered via a custom font-face span with no fallback character and no visible icon content in the HTML — the icon slot will be empty for any user who does not have the Font Awesome 6 Duotone web font loaded.

### `blog/cadrage-projet`
- **content** @ Article body — intro paragraph, internal link : The internal link to the 'conduite de projet' guide uses a bare relative path without the locale prefix: href="/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet". On the rebuild's /fr/ URL structure this will 404; it should be /fr/gestion-de-projet/... or the equivalent blog path.
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is in the future. The live article was published in 2022. This appears to be a default/fallback date that was never corrected and will look erroneous to readers.
- **content** @ 'À retenir' callout — duplicated twice : The same stub callout block (with identical placeholder text) appears twice within the same section ('Cadrage : l'importance d'un autre rapport au temps'). Even if the content were real, having two identically titled 'À retenir' boxes back-to-back with the same content is a clear duplication error.

### `blog/budgetiser-un-projet-sans-se-louper`
- **content** @ Article body — internal link : The link to 'conduite de projet' uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the '/fr/' locale prefix, which will result in a 404 on the rebuilt site structured under '/fr/blog/'.
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date (the article was originally published in 2022). This is almost certainly a data mapping error and will appear incorrect to readers.
- **content** @ Retour d'expérience du CIO d'Adeo — body paragraphs : The section mentions 'Mathieu nous explique' but never introduces who Mathieu is — the speaker bio/avatar block that should precede this paragraph is replaced by the placeholder stub (see P0 issue), leaving the reference to 'Mathieu' with no context for the reader.
- **content** @ Article body — 'coach agile Frédéric' mention : The paragraph attributes a quote to 'le spécialiste français et coach agile Frédéric' without providing a last name or any identifier. The original article presumably named the person fully; this appears to be a truncated/corrupted migration of the source content.

### `blog/capacity-planning`
- **content** @ Blog article body — intro paragraphs : Brand name is inconsistently cased: the article body uses 'Airsaas' (lowercase 's') multiple times (e.g. 'chez Airsaas, on sait…', 'Chez Airsaas, nous recommandons…') while the correct brand name is 'AirSaas' with a capital S.
- **content** @ Blog article body — section on planification de la demande : The anchor text reads 'Flash Design' but the linked podcast episode is about 'Flash Report' / DSI transition (Isabelle Perussy/André-Perussi). 'Flash Design' appears to be a copy error — it is not a concept introduced elsewhere in the article and does not match the link destination.
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026' as its publication date, which is a future date. This is almost certainly a data entry error and will look wrong to any reader visiting the page today.
- **content** @ Sommaire (table of contents) — bullet count vs article : The TOC lists exactly 5 items but the article promises '7 bénéfices' as a numbered section and the body content references at least 6 bullet points under benefits yet the TOC only lists one parent entry with no sub-items. More critically, only 6 bullet items are rendered under 'Les 7 bénéfices' (the list shows 6 <li> elements, not 7), contradicting the section heading.
- **structure** @ Blog article body — heading hierarchy : The article body opens directly with <h3> tags (e.g. 'Qu'est-ce que le Capacity Planning ?') without any intervening <h2>. The page H1 is the article title in the hero; the TOC section uses an <h2> for 'Sommaire'. The article body should use <h2> for top-level sections, not <h3>, creating a broken heading hierarchy (H1 → H3 skip).

### `blog/capacity-planning-definition`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. Either the date is a placeholder or a data-mapping error — either way it will look like an error to readers.
- **content** @ Blog body — 'Aligner capacité et demande' section : The sentence 'aligner la capacité et la demande en fonction des objectifs stratégiques de votre organisation.' is missing a space before 'de' (runs '...stratégiques</strong>de votre…'). Minor but visible typographical defect in rendered text.
- **structure** @ Blog body — heading hierarchy : The article body uses H3 for top-level section headings and H4 for sub-sections, but there is no H2 used in the body content (the Sommaire section uses an H2 for the word 'Sommaire' only). The document outline jumps from H1 (hero title) directly to H3 in the body, skipping H2, which is a structural/accessibility issue.
- **content** @ Blog body — 'Prévoir la demande future' paragraph : The copy reads 'sauf si vous avez déjà mis Airsaas en place' — the brand name is written 'Airsaas' (lowercase 's') rather than the correct brand casing 'AirSaas'. This occurs at least once in the body and is a brand consistency issue.

### `blog/chef-de-projet-pmo`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date (over a year ahead). This will appear erroneous to readers and harm credibility.
- **content** @ Blog hero — author avatar : The author is displayed as 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', suggesting the photo belongs to a different person (likely Bruno R.). The name and photo are mismatched.
- **structure** @ Blog body — heading hierarchy : The blog body opens with H3 tags as the first content headings (e.g. 'Qui est le PMO ?') directly under the H1 hero title, with no H2 between them (the 'Sommaire' H2 is in a separate section). Within the body, 'Quel est le rôle du PMO ?' is an H4 under an H3, which is correct, but the absence of any H2 in the article body itself creates a broken heading hierarchy for screen readers and SEO.
- **functional** @ Blog body — internal links : Several internal links point to 'https://www.airsaas.io/fr/gestion-de-projet/...' (the live domain) rather than relative paths on the rebuild. These will silently redirect users away from the rebuild environment and may break in production if slugs change.

### `blog/chef-de-projet-transverse`
- **content** @ Hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data/mapping error and will look wrong to any reader today.
- **content** @ Hero — author avatar : The author display name is 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', strongly suggesting the photo belongs to a different person (likely Benoit R.). Author name and photo are mismatched.
- **content** @ Blog body — first paragraph : The internal link href points to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (relative, no locale prefix), which will 404 in the Next.js rebuild where the correct path should be '/fr/…'. This is a broken internal link visible to users.
- **content** @ Blog body — first paragraph : Missing space before 'transverses' in '…pilotage de projets</strong>transverses…' — the closing bold tag is immediately followed by the next word with no space, producing 'projets transverses' rendered as 'projetsTransverses' visually.

### `blog/comite-de-pilotage-definitions-et-incomprehensions`
- **content** @ Article intro paragraph — '5 notions simples' : The copy states 'on va démystifier 5 notions simples' but then lists six items: sponsor, Copil, jalons, chef de projet, key user, et reporting. The count is inconsistent and will confuse readers.
- **content** @ Publication date metadata : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data error (likely should be 2022 based on the Webflow asset URLs), and will look wrong to any reader.
- **functional** @ Internal link — 'Comité de pilotage ou Copil : Les bases' : The link href is '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' — a relative path without the '/fr/' locale prefix. This will result in a 404 in the French locale of the rebuilt site.
- **content** @ Section on 'Sponsor' : The intro promises coverage of 'sponsor' as one of the five (or six) key terms, but no H4 section dedicated to 'Le sponsor' appears in the rendered HTML — the article jumps directly to jalons. The sponsor section appears to be missing entirely.

### `blog/comite-pilotage-projet`
- **content** @ Blog article body — internal link : The link to the companion article uses a bare relative path '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' without the '/fr/' locale prefix, which will 404 in the rebuilt Next.js locale-prefixed routing.
- **content** @ Hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data mapping error (likely 2022 or 2023 given the Webflow CDN image URLs), and will look wrong to any reader.
- **content** @ Astuce 3 — body paragraph : The word 'parperboard' is a misspelling of 'paperboard' (itself a Frenchism for 'flipchart'). The misspelling is present in the rebuild and is user-visible.

### `blog/comment-animer-un-comite-de-pilotage`
- **content** @ Sommaire — last table-of-contents item : The last sommaire entry has an empty/invisible label (a zero-width non-joiner '‍') and its anchor is the generic '#section', providing no meaningful navigation target and looking broken to users.
- **content** @ Blog body — internal link 'Comment bien préparer un comité de pilotage ?' : The link to 'Comment bien préparer un comité de pilotage ?' points to bare '#' (dead anchor), which means clicking it silently scrolls to the top instead of navigating to the referenced article.
- **content** @ Blog body — opening paragraph link to copil-basics article : The link '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' uses a path without the locale prefix '/fr/blog/', which will 404 on the rebuilt site whose blog lives under '/fr/blog/…'.
- **content** @ Hero — article publication date : The date reads 'Le 1 février 2026', which is a future date (2026). This is almost certainly a data/mapping error — the live article was published in 2022.

### `blog/comment-animer-un-bilan-projet-efficace`
- **content** @ Sommaire — table of contents link : The TOC entry reads '5 formats-types de bilan deprojet' — 'deprojet' is a missing space (should be 'de projet'). This typo is visible to users in the table of contents.
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data/migration error and will look wrong to any reader checking the date.
- **functional** @ Blog body — internal link (conduite de projet) : The link to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' is a relative URL missing the '/fr/' locale prefix, which will 404 in the Next.js rebuild where all French routes live under /fr/.
- **functional** @ Blog body — internal link (pilotage de projet) : The link 'https://www.airsaas.io/gestion-de-projet/le-pilotage-de-projet-en-2023' points to the live domain without the /fr/ locale segment, making it an absolute link to an likely-broken URL instead of the rebuilt internal route.

### `blog/comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022`
- **content** @ Hero section — publication date : The article is presented as a 2022 guide ('pragmatique en 2022') but the published date shown is 'Le 1 février 2026', which is in the future. This is either a wrong year (likely should be 2022 or 2023) or a placeholder date that was never corrected.
- **structure** @ Blog body — heading hierarchy : The article body jumps directly from H1 (hero) to H3 section headings ('PPM : la fin du domaine réservé'), skipping H2 entirely for the main content sections. H2 is used only for the 'Sommaire' decorative heading, leaving the body without a proper H2 level, which breaks document outline semantics.
- **content** @ Table of contents anchor — 'ppm-pragmatique-en-2022-à-retenir' : The third sommaire link targets '#ppm-pragmatique-en-2022-à-retenir' but the HTML is truncated and this anchor/section heading is not visible in the provided markup; if the corresponding ID is missing in the rendered page the link will silently fail to scroll.

### `blog/comment-decider-en-copil`
- **content** @ Blog body — duplicated paragraph : The paragraph beginning 'Et les clients internes, sponsors, membres du comité de pilotage…' appears twice in a row verbatim, which reads as a copy-paste error.
- **content** @ Hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data error (likely 2022 or 2023 based on the original live article), and will confuse readers.
- **functional** @ Blog body — internal link to Copil basics article : The link to the related article uses a relative path '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' without the '/fr/' locale prefix, which will result in a 404 in the rebuilt routing structure.
- **content** @ Sommaire — second TOC anchor : The anchor href '#accès-aux-données-et-définition-de-lautorité-projet-deux-prérequis-pour-mieux-dé' is truncated (ends with 'dé'), meaning the anchor link will not match the actual heading ID on the page and will silently fail to scroll.

### `blog/comment-faire-un-bon-point-davancement-projet`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date (over a year ahead). This will appear as an obvious error to any reader and undermines credibility.
- **functional** @ Blog body — internal link 'conduite de projet' : The link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (relative, no locale prefix), which will 404 in the new routing structure that uses '/fr/blog/...' or '/fr/gestion-de-projet/...'. Locale prefix is missing.
- **content** @ Blog body — 'Établissez de bons objectifs' section : Two consecutive H4 headings appear back-to-back with no paragraph between them: 'Établissez de bons objectifs' immediately followed by 'On ne réussit que par rapport aux objectifs fixés'. The first H4 has no body copy, making it look like a broken/duplicate heading rather than an intentional structure.
- **functional** @ Blog body — external links : Several internal AirSaas links use absolute URLs with 'http://' (not 'https://'), e.g. 'http://www.airsaas.io/fr/gestion-de-projet/kanban-gestion-de-projet'. These will trigger mixed-content warnings and may break on production HTTPS.

### `blog/comment-elaborer-un-reporting-efficace`
- **content** @ Hero / author metadata : The publication date is shown as 'Le 1 février 2026', which is a future date (over a year ahead). This is almost certainly a data mapping bug producing an incorrect year.
- **content** @ Author avatar / author pill : The author name displayed is 'Jérôme Dard' but the avatar image alt text is also 'Jérôme Dard' — however the image URL points to a file named 'SV-min.jpg', strongly suggesting the photo belongs to a different person (initials 'SV'). The avatar and name are mismatched.
- **functional** @ Blog body — internal link : The link to 'conduite de projet' uses a root-relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing the '/fr/' locale prefix), which will 404 on the rebuilt site where all routes are under '/fr/'.
- **content** @ Blog body — intro paragraph (cadeau/download CTA) : The sentence 'Et en plus en cadeau vous pouvez télécharger … notre modèle de reporting projet ici.' has no space between 'de' and the link text 'reporting projet ici', making it render as 'notre modèle dereporting projet ici.' — a missing space that looks like a rendering bug.

### `blog/comment-gerer-lagressivite-dans-les-comites-de-pilotage`
- **content** @ Blog body — '7 conseils' section, conseil 3 (passif agressif paragraph) : The text refers to '10 astuces' ('Nous verrons ci-dessous dans les 10 astuces comment réagir…') but the article heading and TOC promise only '7 conseils'. This internal inconsistency will confuse readers.
- **content** @ Article publish date metadata : The article displays 'Le 1 février 2026' as its publication date, which is a future date. This is almost certainly a data/formatting bug (likely 2022 or 2023 based on article content referencing a pandemic context).
- **functional** @ Blog body — intro paragraph, internal link : The link to 'Comité de pilotage ou Copil : Les bases' uses a relative path without the locale prefix (/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases) instead of /fr/blog/… — this will likely 404 in the rebuilt routing structure.
- **content** @ Blog body — conseil 6 'Travaillez sur le climat', opening paragraph : The paragraph under this H4 heading starts with a zero-width joiner character ('‍') rendered as a standalone paragraph, producing a visible empty line/stub before the actual image block. This looks like a Webflow migration artifact.

### `blog/comment-mettre-en-place-un-comite-de-pilotage`
- **content** @ Hero / article metadata — publication date : The article shows 'Le 1 février 2026' as the publication date, which is a future date. This is almost certainly a data entry error (should likely be 2022 given the Webflow CDN asset URLs) and will confuse readers.
- **functional** @ Blog body — internal link in first section : The link 'Comité de pilotage ou Copil : Les bases' points to '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' (missing the '/fr/' locale prefix and the '/blog/' path segment), which will result in a 404 on the rebuilt site.
- **content** @ Blog body — image alt text, guest copil image : The alt text for the guest/invité image reads 'I mystère copilnvité', which is a broken/garbled string (looks like a merge artifact of 'Invité mystère copil'). This is user-visible via screen readers and visible in broken image scenarios.
- **structure** @ Blog body — heading hierarchy : The article body starts directly with H3 headings (e.g. 'Pourquoi faire un Copil ?') without an intervening H2, creating an invalid heading hierarchy (H1 → H3). The table of contents section uses H2 for 'Sommaire', but the article content sections should also be H2 level, not H3.

### `blog/comment-mettre-une-bonne-meteo-projet`
- **content** @ Blog hero — date field : The publication date reads 'Le 1 février 2026', which is a future date (2026). This is almost certainly a data entry error and will appear erroneous to readers.
- **functional** @ Blog body — internal link (first paragraph) : The link to 'conduite de projet' uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the locale prefix '/fr/', which will result in a 404 on the rebuilt site.
- **content** @ Blog body — opening paragraph : The article body opens mid-argument with 'Oui ! Cette approche est à la fois...' with no preceding question or context, giving the strong impression that an introductory paragraph or section heading is missing before the body content begins.

### `blog/comment-mettre-en-place-un-pmo`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data entry error (should likely be 2023 or 2024 given the content) and will appear nonsensical to readers.
- **functional** @ Blog body — internal links : Multiple in-body links point to the live domain (https://www.airsaas.io/fr/gestion-de-projet/…) rather than relative paths, meaning they will break the user out of the rebuild environment and mix live/rebuild sessions unexpectedly.
- **content** @ Blog body — ordered list item 1 (ROI criterion) : The first list item ends with a double period ('..') before the closing span: '…des futurs investissements..'. This is a typographic error that will be visible to readers.
- **content** @ Blog body — prérequis list item 2 : The copy reads 'Le PMO est positionné comme un facilitateur versus un contrôleur qui "enm….e" tout le monde' — a half-censored vulgarism that appears verbatim in the published page. This is inappropriate for a professional B2B SaaS blog and likely a carry-over from a draft that was never cleaned up.

### `blog/comment-reussir-un-projet-transverse`
- **content** @ Author avatar — 'Jérôme Dard' badge : The author avatar image URL points to a Webflow CDN asset (cdn.prod.website-files.com) with a filename 'BR-min.jpg', which does not match the displayed author name 'Jérôme Dard'. 'BR' suggests this is the wrong photo (likely another author's headshot), creating a misleading author attribution.
- **functional** @ Blog body — internal link 'conduite de projet' : The internal link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing the '/fr/' locale prefix), which will result in a 404 on the rebuilt Next.js site that uses locale-prefixed routes.
- **functional** @ Blog body — internal link 'les bons KPIs à mettre en place' : The href is an absolute URL pointing to 'https://www.airsaas.io/fr/gestion-de-projet/kpi-gestion-de-projet' (the live production domain) rather than a relative path, meaning it will navigate users away from the rebuild environment and could break in production if paths change.
- **structure** @ Blog body — heading hierarchy around '1 : Rationaliser' and '2 : Dérisquer' : The numbered section headings '1 : Rationaliser' and '2 : Dérisquer' are rendered as H4, but they are clearly top-level structural dividers within the third H3 section. Their sub-headings are also H4, creating an ambiguous flat hierarchy where parent and child headings share the same level.

### `blog/copil-projet-ou-comite-de-pilotage-projet-les-bases`
- **content** @ Hero / article metadata — date field : The publication date reads 'Le 1 février 2026', which is a future date (2026). This is almost certainly a data-entry or mapping error and will look wrong to any reader today.
- **content** @ Blog body — first paragraph, inline strong tag : There is an empty <strong></strong> tag mid-sentence: '…C'est lui qui fait le<strong></strong>lien entre le Codir…'. This creates an invisible formatting artifact and suggests a broken rich-text mapping that may repeat elsewhere in the body.
- **brand** @ Hero / author badge : The author avatar image URL points to a Webflow CDN asset named 'BR-min.jpg' but the displayed name is 'Jérôme Dard'. The initials 'BR' do not match, suggesting the wrong photo is wired to this author — a visible credibility issue.

### `blog/demarche-de-projet`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data-entry error (likely 2022 or 2023) and will confuse readers.
- **functional** @ Blog body — internal link (conduite de projet) : The link to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' uses a relative path without the '/fr' locale prefix, which will produce a 404 in the Next.js rebuild.
- **functional** @ Blog body — multiple internal links (airsaas.io absolute URLs) : Several links point to absolute 'https://www.airsaas.io/gestion-de-projet/...' URLs (e.g. note-de-cadrage-projet, bilan-projet, chef-de-projet-transverse, budgetiser-un-projet) instead of locale-prefixed relative paths, bypassing the rebuild and breaking navigation consistency.
- **content** @ Blog body — 'Standardiser plusieurs démarches' paragraph : Contains a typo: 'A partir ce ce simple découpage' should be 'A partir de ce simple découpage'. Also 'dont'' should be 'don'ts' — these are copy errors that reached the rebuild unchanged and are user-visible.
- **structure** @ Blog body — heading hierarchy : The article body starts directly with H3 headings ('Rapide rappel des fondamentaux') beneath the H1 page title, with no H2 to bridge them. While blog body downshift is noted as intentional, here the Sommaire section itself renders its title as an H2 ('Sommaire'), making the subsequent H3s in the body semantically inconsistent — the first content section should be at least H2-level.

### `blog/fiche-projet-exemple-et-methodologie`
- **content** @ Blog hero / article metadata : The publication date shows 'Le 1 février 2026' which is in the future (over a year ahead). This is almost certainly a data mapping error and will look wrong to readers.
- **content** @ Blog body — first paragraph internal link : The internal link to the 'conduite de projet' article uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing the '/fr/' locale prefix), which will 404 in the Next.js rebuild.
- **content** @ Blog body — 'Qui rédige les fiches de projet?' section : 'une fiche projet rédigé sur Word à l'inconvénient' contains a grammatical error ('rédigé' should be 'rédigée', and 'à l'inconvénient' should be 'a l'inconvénient'). This was likely carried over from source but is a visible error to French readers — the accented 'à' makes the sentence read as a preposition instead of the verb 'avoir'.
- **content** @ Table of contents / Sommaire section : The sommaire lists only 4 anchor links but the article body visibly contains additional major H3 sections (e.g. 'Comment bien présenter votre projet ?' appears in the TOC but the truncated HTML suggests more H3s exist in the body). The TOC may be incomplete relative to the full article content.

### `blog/gestion-de-portefeuille-projet-pme`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data entry error (should likely be 2022 or 2023 based on article context), and will confuse readers.
- **content** @ Intro paragraph — 'Power^Point' : The body copy contains 'Power^Point' with a literal caret character, which appears to be a formatting artifact or encoding error. The correct term is 'PowerPoint'.
- **content** @ Intro paragraph — INSEE attribution : The link to INSEE statistics points to 'oberlo.fr/blog/petites-entreprises-en-france' but is labelled 'D'après l'INSEE'. Oberlo is not INSEE; this is a misleading attribution that could damage credibility.
- **content** @ Body paragraph — 'cœur du tissu économique Français' : The inline bold wrappers around 'cœur du tissu économique' are empty (`<strong></strong>`), so no text is actually bolded — the emphasis intended by the author is lost and the surrounding copy reads awkwardly.

### `blog/kanban-gestion-de-projet`
- **content** @ Blog hero — author publication date : The article publication date reads 'Le 1 février 2026', which is a future date (2026). This is almost certainly a data entry error and will look wrong to any reader visiting the page today.
- **content** @ Blog body — section 'Les avantages du Kanban physique' : The paragraph reads 'Certaines équipes (notamment des dévelopes de développeurs informatiques)' — 'développes' is a nonsense word, likely a mangled paste of 'des équipes de développeurs'. This is a typo/corruption visible in the published content.
- **content** @ Blog body — closing paragraph (truncated) : The HTML is truncated mid-sentence ('c'est un bon support pour débattre. <br/></spa') and the closing tag is malformed ('</spa' instead of '</span>'). If this truncation reflects the actual rendered page, the final section is incomplete and broken for readers.

### `blog/jalon-projet`
- **content** @ Sommaire nav – second list item : The second table-of-contents entry has an empty/invisible label (a zero-width joiner '‍' only) and its anchor href is '#section', which is a generic placeholder. This link is non-functional and the item appears blank to users.
- **content** @ Blog body – empty H3 between 'Qu'est-ce que qu'un jalon projet?' and the second figure : There is a rendered H3 element containing only '‍' (zero-width joiner), producing a visible blank heading in the article flow. This is a Webflow artifact that was not cleaned up during the rebuild.
- **content** @ Publication date – hero metadata : The article shows 'Le 1 février 2026' as the publication date, which is a future date. This is almost certainly a data error (likely should be 2022 or 2023 based on the content era).
- **content** @ Figure – 'Comment faire les jalons de son projet?' section, image alt attribute : The image alt text is 'Dessin de ' — the description is truncated mid-phrase, providing an incomplete and meaningless accessibility label.
- **content** @ Blog body – 'Le degré de confiance' paragraph : The sentence reads 'le degré de confiance dans le jalon d'un projet est l'ne des nouveautés' — 'l'ne' is a clear typo for 'l'une', a user-visible spelling error in the main article body.

### `blog/gestion-portefeuille-projets-vs-gestion-de-projet`
- **content** @ Blog hero — H1 vs URL slug : The article slug is 'gestion-portefeuille-projets-vs-gestion-de-projet' (implying a comparison article) but the H1 reads 'Management de portefeuille de projet : définition, méthodes et outils' (a guide/definition article). The slug and title describe different content intents, likely a stale slug from a renamed article.
- **typography** @ Tables — <th> elements : All <th> elements have class 'text-paragraph' which is a font-size utility token, not a color token. Table headers sit on a primary-colored background with no explicit white text color class applied, risking dark-on-dark text rendering.
- **content** @ Blog hero — publication date : 'Le 17 septembre 2025' appears to be a future date. If published now, this date will confuse readers and may be flagged by search engines as a future-dated article, potentially suppressing indexing.

### `blog/kpi-gestion-de-projet`
- **content** @ Blog hero – publication date : The article is dated 'Le 1 février 2026', which is a future date. This will appear incorrect to any reader and signals a data entry or migration error.
- **content** @ Blog hero – author avatar : The author is labelled 'Jérôme Dard' but the avatar image src points to a file named 'BR-min.jpg', strongly suggesting the photo belongs to a different person (likely Benoit R. or similar). The name and face do not match.
- **structure** @ Table of contents / Sommaire : The sommaire lists only 5 entries yet the article content (truncated) contains at least 4 H3 sub-sections plus H4 children (e.g. 'Des critères à respecter', 'Un code couleur', 'Des précautions à prendre'). The ToC is incomplete, leaving readers without navigation anchors for most of the article.
- **content** @ Body – internal link to 'suivi de projet' : The internal link for 'suivi de votre projet' points to the full live domain (https://www.airsaas.io/fr/gestion-de-projet/le-suivi-de-projet…) instead of a relative rebuild path, meaning it exits the rebuild environment and may not exist in the new URL structure.

### `blog/la-revue-de-projet`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data/migration error and will look wrong to every reader today.
- **content** @ Blog hero — author avatar : The author is named 'Jérôme Dard' but the avatar image URL contains 'SV-min.jpg' (initials suggesting a different person). The photo and the name do not match.
- **content** @ Table of contents — first entry vs. matching H3 : The first TOC entry reads 'À quoi sert une revue de projet ? Qu'est-ce qu'une revue de projet ?' and links to a combined anchor, but the body then has two separate H3s with these as distinct headings ('À quoi sert une revue de projet ? Qu'est-ce qu'une revue de projet ?' and then again 'À quoi sert une revue de projet ?'). The repeated/split heading creates a confusing duplicate in the TOC and will break anchor navigation.
- **content** @ Blog body — paragraph about 'cette est un outil' : The sentence 'cette est un outil de management de projet idéal…' is grammatically broken in French — 'cette' is a bare demonstrative with no noun. It should read 'cette réunion est un outil…' (or similar). This reads as truncated/migrated copy.
- **functional** @ Blog body — internal link : The link to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' is a relative URL missing the '/fr' locale prefix, which will result in a 404 on the rebuilt Next.js site.

### `blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0`
- **content** @ Section 1 body paragraph — 'Découvrons quelles techniques…' : The sentence reads 'Découvrons quelles techniques Olivier Fiquet qu'il a mise en œuvre' — a doubled subject construction that is grammatically broken French. Likely a copy-paste corruption.
- **content** @ Section 2 bullet list — 'Envoi de la commande aux fournisseurs' : The bullet reads 'la DSI envoie de manière automatiser des prévisions' — 'automatiser' should be 'automatisée'. This is a grammatical error visible to French-speaking users.
- **content** @ Blog hero — publication date display : French typography requires ordinal 'Le 1er février' not 'Le 1 février'. Missing the superscript 'er' looks unprofessional on a published editorial page.
- **functional** @ Blog body — inline links to /podcast-cio-revolution/ : Multiple body links point to 'https://www.airsaas.io/podcast-cio-revolution/…' which is a Webflow-era URL structure not present in the rebuild's routing. These are likely dead links in the new site.

### `blog/le-diagramme-de-gantt-comment-sen-servir`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data/migration bug (wrong year) that will look erroneous to any reader visiting the page today.
- **content** @ Blog body — internal link (conduite de projet) : The link to the 'conduite de projet' guide uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the '/fr/' locale prefix, which will 404 or redirect incorrectly in the new Next.js routing structure.
- **content** @ Blog body — internal link (jalon projet, last paragraph) : The closing paragraph links to '/gestion-de-projet/les-jalons-projet-une-technique-pour-sequencer-vos-projets-intelligemment' without the '/fr/' locale prefix, inconsistent with the corrected internal link in the same article body that does use the full airsaas.io domain.
- **functional** @ CTA section — 'Réserver une démo' button : The CTA button wrapper has 'opacity-0 scale-[0.92]' with no visible trigger to animate it in — if JavaScript-driven scroll animation fails or is not initialised, the button remains permanently invisible to the user.

### `blog/le-grand-guide-de-la-conduite-de-projet`
- **functional** @ Blog body — internal article links (href) : Multiple in-body links use relative paths without the /fr/ locale prefix (e.g. '/gestion-de-projet/comment-mettre-une-demarche-de-projet-dans-mon-entreprise', '/gestion-de-projet/la-revue-de-projet', etc.), which will 404 in the Next.js rebuild where routes live under /fr/. These should resolve to /fr/gestion-de-projet/… or /fr/blog/….
- **content** @ Blog body — 'Tout savoir sur la note de cadrage projet' subsection link : The anchor text reads 'Tout savoir sur la note de cadrage projet' but the href points to '/gestion-de-projet/la-revue-de-projet' (revue de projet), which is a completely different article. The link destination does not match the labelled content — likely a copy-paste error.
- **content** @ Sommaire — table of contents anchor IDs : TOC links use French-accented anchor IDs (e.g. '#comment-budgétiser-un-projet', '#comment-élaborer-un-reporting-projet-efficace'). The corresponding H3 elements in the body do not appear to carry matching id attributes in the rendered HTML, so these in-page links will silently fail to scroll to their targets.
- **brand** @ Blog body figure — alt text / figcaption : The first figure's alt text reads 'Pro de la Transfo avec AirSaas.io' — the brand domain suffix '.io' is appended directly to the brand name in visible-adjacent alt text, which is inconsistent with the brand name 'AirSaas' used elsewhere and looks like a leftover Webflow asset string.

### `blog/le-modele-de-presentation-pour-votre-comite-de-pilotage`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026' which is a future date (2026). This is almost certainly a data error or placeholder that will look wrong to readers and damage credibility.
- **brand** @ Blog hero — author avatar : The author is labelled 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', strongly suggesting the photo does not match the named author (likely a different person's headshot was left in).
- **content** @ Blog body — paragraph 3 : The word 'mennent' is a typo for 'mènent' ('Un bon chef de projet sait que l'anticipation et la préparation sont des valeurs essentielles qui mennent au succès…'). This is a visible spelling error in the article body.
- **structure** @ Table of contents / blog body : The table of contents lists three sections including 'Nos conseils pour réussir ses réunions de comité de pilotage', but the body content under that section is very thin (only 3 bullet points and a brief closing sub-section). The section feels truncated compared to what the heading promises, suggesting content may have been cut off.
- **functional** @ CTA section — 'Réserver une démo' button : The CTA button is wrapped in a div with 'opacity-0 scale-[0.92]' and no JS-triggered animation class visible in the static HTML, meaning the button will render invisible on load if the animation never fires (e.g. JS disabled or intersection observer fails).

### `blog/le-guide-du-mode-projet`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is likely a data-entry or migration error and will confuse readers and harm SEO credibility.
- **content** @ Blog hero — author avatar : The author is labelled 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', suggesting the photo may belong to a different person (possibly Baptiste Rochet or another team member). The name and photo appear mismatched.
- **functional** @ Blog body — internal link on 'chef de projet transverse' : The anchor href points to 'https://www.airsaas.io/gestion-de-projet/comment-etre-un-bon-chef-de-projet-transverse' (absolute URL, no locale prefix, old Webflow path). In the rebuilt site this will open the old live domain rather than the rebuild, and the path does not match the new /fr/blog/* routing convention.
- **functional** @ Blog body — external link on 'chef de projet' (reussirsesprojets.com) : A link to 'https://www.reussirsesprojets.com/qualites-chef-de-projet/' goes to a competitor/third-party site without rel='noopener noreferrer', and may be an unintentional outbound link that was editorially acceptable on Webflow but should be reviewed for the rebuild.

### `blog/le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026', which is a future date (over a year ahead). The live article was published in 2023; this appears to be a placeholder or data-mapping error.
- **functional** @ Blog body — internal link 'Portfolio project management le top 10 des bonnes pratiques' : The anchor href is '/gestion-de-projet/portfolio-project-management-le-top-10-des-bonnes-pratiques' — a Webflow-era URL path that does not exist in the rebuilt site (correct path should be under '/fr/blog/...'). This will result in a 404.
- **content** @ Blog body — 'Résistance au changement' argument (pro section) : The text contains a typo: 'on vous reccomande' (double 'c') and references 'cf le Blog Pro de la Transfo - article Pilotage de projet ce qui a changé en 2023' as plain text with no link, making it a dangling reference that reads like an incomplete editorial note left in the published copy.

### `blog/le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes`
- **content** @ Blog hero / publication date : The publication date reads 'Le 1 février 2026', which is a future date. This is almost certainly a data-mapping error (wrong year — should likely be 2022 or similar), and will look wrong to any reader.
- **content** @ Internal link in body copy — 'grand guide de la conduite de projet' : The href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing the '/fr/' locale prefix), which will result in a 404 or wrong-locale page in the rebuilt Next.js routing structure.
- **content** @ Body paragraph — '5 leviers' intro paragraph : The sentence reads '…on a listé 5 leviers d'action. Découvrez icinotre sélection.' — 'icinotre' is a run-together word with a missing space, producing visible garbled copy on the published page.
- **content** @ Body paragraph — first intro paragraph : The opening paragraph contains empty bold tags sandwiching words: 'Pas de<strong></strong>bonne exécution<strong></strong>de stratégie' — the empty <strong> elements indicate broken rich-text serialisation, stripping intended bold formatting and producing awkward spacing.

### `blog/macro-planning`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date (over a year ahead at time of writing). This will look like a data error to any reader and undermines editorial credibility.
- **content** @ Author avatar — hero section : The author is labelled 'Jérôme Dard' but the avatar image URL contains 'SV-min.jpg' (likely initials of a different person). The photo and name appear mismatched, which is a visible credibility issue.
- **content** @ Blog body — introductory paragraph, first internal link : The link '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' is a relative path missing the locale prefix '/fr/', which will produce a 404 in the rebuilt Next.js app whose routes are all under '/fr/'.
- **content** @ Blog body — ordered list 'Les différentes étapes', item 3 : Item 3 contains a typo: 'si elles existents' — 'existents' is not a French word (should be 'existent'). Published copy with a grammar error in a structured list is user-visible.
- **content** @ Blog body — tools list, bullet 4 : Competitor tools Trello and Asana are named explicitly in an AirSaas product blog without any contextual framing positioning AirSaas as the preferred alternative. This reads as free advertising for competitors and is likely unintentional.
- **structure** @ Blog body — all section headings : The table-of-contents anchors (e.g. '#quest-ce-quun-macro-planning') target IDs that do not appear on the corresponding H3 elements in the HTML. The headings carry no 'id' attributes, so all ToC links are broken/non-functional.

### `blog/lean-portfolio-management`
- **content** @ Quote aside block — SAFe DSI quote : The quote inside the 'À retenir' aside is truncated mid-sentence: '…mais toute l'entreprise sur du vertical,' ends with a comma and no conclusion. This reads as a copy-paste error that leaves the citation incomplete for users.
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date (over a year ahead). This is almost certainly a data entry error and will confuse readers and harm SEO credibility.
- **structure** @ Blog body — heading hierarchy : The blog body begins directly with H3 ('Les 3 problèmes liés à la gestion actuelle…') with no H2 parent in the article body. The page H1 exists in the hero, but the content section skips H2 and jumps to H3, breaking semantic outline for assistive technologies and SEO.
- **functional** @ Blog body — 'The Machine That Changed the World' book link : The anchor linking to 'The machine that changed the world' points to href='#' (a dead/stub link). This is a user-visible broken link that should resolve to the book reference or be removed.

### `blog/les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet`
- **functional** @ Blog body — internal link in intro paragraph : The link to the '10 bonnes pratiques' article uses a relative path without the locale prefix: '/gestion-de-projet/portfolio-project-management-le-top-10-des-bonnes-pratiques'. In the rebuilt Next.js app the correct path should be '/fr/gestion-de-projet/...' (or '/fr/blog/...'), so this link will likely 404.
- **content** @ Blog body — H3 #6 heading : The heading text contains a stray unmatched quote: '6 - Choisir un outil PPM trop gros", déconnecté…'. The opening quotation mark around 'trop gros' was not closed before the comma, producing broken punctuation visible in both the ToC and the article heading.
- **structure** @ Blog body — section #8 image : The image for error #8 (Excel/Bart Simpson) is wrapped in a plain <div> instead of a <figure> element, inconsistent with every other illustration on the page which uses <figure>+<figcaption>. This also means there is no caption/alt context rendered below this image, breaking the visual rhythm.
- **content** @ Blog body — article truncated (HTML comment '<!-- TRUNCATED -->') : The HTML is cut off mid-article after error #5's heading, meaning errors #5 through #1 and the Conclusion section (all listed in the ToC) have no rendered content. The ToC anchor links for those sections will be dead on the live page.

### `blog/management-de-portefeuille-de-projet`
- **content** @ Blog hero — publication date : The date 'Le 17 septembre 2025' is in the future relative to any reasonable review date, suggesting either a placeholder date or a mis-entered value that will look incorrect to readers browsing today.
- **structure** @ Blog body — 'Ce que la gestion de portefeuille de projets permet' : The text 'Ce que la gestion de portefeuille de projets permet' is rendered as a plain <p> tag instead of a heading, yet it introduces a bullet-list section. It reads as an orphaned intro line with no semantic structure, breaking the visual and document hierarchy.

### `blog/pi-safe`
- **functional** @ Inline CTA button after 'PI Planning peut être appliqué…' paragraph : The button is labelled 'Télécharger' but links to /fr/meetings-pages (a demo/meeting booking page), not a downloadable resource. The label and destination are mismatched and will mislead users.
- **content** @ Blog post date — hero meta : Publication date is 'Le 1 février 2026', which is in the future. This is either a placeholder or a data-mapping error — it will appear incorrect to any reader today.
- **structure** @ Blog body — heading hierarchy : The blog body opens directly with H3 ('Qu'appelle-t-on PI SAFe ?') without an H2 parent. The article has no H2 level at all; section titles jump from the H1 in the hero straight to H3, skipping a level and breaking semantic outline.

### `blog/metier-pmo`
- **content** @ Blockquote — L'explosion du nombre de projets transverses : The blockquote attributed to 'Bertran Ruiz, CEO AirSaas' has no closing quotation mark or line break between the quoted text and the attribution: the name runs directly onto the last word of the quote ('AirSaas'), making the attribution visually and semantically fused with the quote body.
- **content** @ Blockquote — L'échec du PMO contrôle : Same issue: the second Bertran Ruiz blockquote has the attribution ('Bertran Ruiz, CEO AirSaas') concatenated without separation onto the final word of the quote. Both blockquotes are missing a proper cite/attribution element or line break, making them look broken.
- **structure** @ Blog body — 'La posture' and 'Ses méthodologies' and 'Les outils et ressources clés' sub-sections : These are rendered as H4 elements with no body copy directly beneath them — they are immediately followed by another H4. They appear as empty header stubs (section titles with zero content before the next heading), which looks like truncated or missing content to a reader.
- **content** @ Blog body — truncated at 'L'automatisation alimente les outils projet individuels vers des' : The article body is visibly cut mid-sentence ('vers des' with no continuation). The sections 'Reporting PMO' and 'FAQ' listed in the Sommaire are not present in the rendered page, meaning large content blocks are missing and the table of contents links will 404/anchor-miss.

### `blog/pilotage-de-projet`
- **content** @ Blog post date, hero metadata : The publication date reads 'Le 1 février 2026' — a future date (over a year ahead). This is almost certainly a data entry error and will look wrong to readers.
- **functional** @ Blog body — internal link 'conduite de projet' : The link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing the '/fr/' locale prefix), which will 404 or redirect incorrectly in a Next.js i18n-routed build. Other body links to airsaas.io also use inconsistent absolute/relative patterns.
- **content** @ Blog body — empty <strong> tags in first paragraph : Multiple <strong></strong> empty elements appear mid-sentence (e.g., 'ont créé<strong></strong>un contexte'), producing invisible whitespace collapses or rendering artifacts where bolded text was presumably intended but missing.
- **functional** @ Sommaire anchor links : The table-of-contents anchor hrefs are truncated mid-word (e.g., '#partage-des-tâches-et-mythe-du-chef-de-projet-héros-solitaire-deux-croyances-à-r', '#pilotage-hybride-et-outils-ppm-des-ingrédients-clés-pour-réussir-le-pilotage-de-', '#7-étapes-pour-faire-progresser-la-culture-projet-dans-son-entreprise-sans-y-lais'). These will not match any heading IDs on the page, breaking in-page navigation.
- **content** @ Blog body paragraph — editor meta-comment exposed : The sentence '(Note du rédacteur : Je vous propose de relire la phrase ci-dessus une seconde fois ! :-))' is an internal editor note that was left in the published body copy, visible to end users.

### `blog/plan-capacitaire`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data-entry error (should likely be 2024 or 2025) and will confuse readers and harm credibility.
- **functional** @ Blog body — internal link to capacity-planning definition : The anchor 'Pour creuser la définition du plan capacitaire, rendez-vous sur notre article sur le sujet' links to airsaas.io/fr/gestion-de-projet/capacity-planning-definition (absolute URL pointing to the live site), not to the rebuilt /fr/blog/ equivalent. This will redirect users away from the rebuild and break in-app navigation.
- **structure** @ Blog body — heading hierarchy : The article uses H3 directly under H1 (skipping H2), then H4 sub-sections under H3. The Sommaire section uses an H2 ('Sommaire') in a separate component, making the document outline inconsistent: H1 → H3 → H4 with no H2 in the article body. This is not the intentional blog-body downshift pattern; H2 should anchor the major sections.

### `blog/plan-de-communication-projet`
- **functional** @ Blog body — internal link 'conduite de projet' : The internal link points to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (no locale prefix), which will likely 404 in the new Next.js routing structure where all pages live under '/fr/'. Same issue appears for the 'cadrage' link pointing to 'https://www.airsaas.io/gestion-de-projet/tout-savoir-sur-la-note-de-cadrage-projet' — these are absolute live-site URLs without '/fr/' prefix instead of relative rebuild paths.
- **content** @ Blog body — paragraph 'Qui ?' section : The text contains 'Un. cercle/comité de communication peut être créé.' — there is an erroneous period after 'Un' mid-sentence ('Un. cercle'), creating a broken sentence that reads as a copy/migration artifact.
- **structure** @ Blog body — heading hierarchy under 'Par où on commence ?' : The section opens with two consecutive H4 headings: 'La matrice CQQCOQP : pour construire des plans…' immediately followed by 'Qui ?' — the first H4 acts as a sub-section title but is never followed by body copy before the next H4, making the hierarchy illogical and the first H4 appear as an orphaned label.
- **content** @ Blog body — paragraph about 'rapport flash' bullet list : Bullet 3 reads 'permet conserver la mobilisation' — the word 'de' is missing ('permet de conserver'), making it grammatically broken French.

### `blog/planification-de-la-capacite`
- **content** @ Inline CTA button mid-article (after 'Jouez collectif' paragraph) : The CTA button reads 'Télécharger' but links to '/fr/meetings-pages', which is a demo/meetings page, not a download. The label does not match the destination and appears misplaced in the middle of a blog article with no surrounding context explaining what is being downloaded.
- **content** @ Article body — resource list under 'En planification de la capacité, on organise plusieurs types de ressources' : The bullet list of resource types only contains two items ('Les ressources financières' and 'Les ressources humaines') but is immediately followed by a sentence referencing 'ce dernier point' (human resources) as if it were the last in a longer list. The original article likely had a third item (e.g. technological/physical resources) that has been truncated, making the transition logically broken.
- **content** @ Hero metadata — publication date : The article displays 'Le 1 février 2026', which is a future date. This is almost certainly a placeholder or data error — no published blog article should show a date in the future.
- **structure** @ Blog article body — heading hierarchy : The top-level article sections (e.g. 'Planification de la capacité : de quoi parle-t-on ?', 'Pourquoi votre entreprise a besoin d'un Capacity Planning', '8 bonnes pratiques…') are rendered as H3 elements inside a section that already has an H2 ('Sommaire'). The page H1 is in the hero. These major content sections should be H2, not H3, to maintain a logical heading hierarchy (H1 → H2 → H3 for sub-sections).

### `blog/planification-de-la-demande-capacity-planning`
- **content** @ CTA button after culture-capacity-planning image : The button is labelled generically 'Télécharger' but links to '/fr/meetings-pages' (a demo booking page). 'Télécharger' implies a download, which does not match the destination — users will be confused or feel misled.
- **content** @ Publication date metadata : The article shows 'Le 1 février 2026' as the publication date, which is a future date (assuming current year is 2025). This is likely a data entry error and will look wrong to any reader.
- **functional** @ Internal link in body copy — capacity planning product page : The anchor 'découvrir la solution Airsaas et ses fonctionnalités de capacitaire macro' points to 'https://www.airsaas.io/fr/produit/capacity-planning' (absolute live URL) rather than a relative rebuild URL. In the rebuild this will navigate away from localhost to the live site, breaking the in-app experience during review and potentially in production if the domain differs.
- **functional** @ Internal link in body copy — plan capacitaire guide : The link 'notre guide en sept étapes pour concevoir votre plan capacitaire' uses 'http://www.airsaas.io/fr/gestion-de-projet/plan-capacitaire' — an absolute URL with http (not https) pointing to the live site, and using the old '/gestion-de-projet/' path which may not exist in the rebuild routing structure.
- **functional** @ Internal link in body copy — capacity planning definition article : The link 'notre article "Capacity Planning : définition et principes de base"' points to the absolute live URL 'https://www.airsaas.io/fr/gestion-de-projet/capacity-planning-definition' instead of a relative path within the rebuild. Cross-references between blog articles should use relative internal routes.

### `blog/portefeuille-projet`
- **structure** @ Blog body — first content section heading : The first content section ('Qu'est-ce que la gestion de portefeuille de projets ?') uses an <h3> tag, but there is no <h2> wrapping the blog body content. The page jumps from <h1> (article title) directly to <h3>, skipping the <h2> level entirely — this is a heading hierarchy violation, not the intentional blog-body downshift pattern.
- **content** @ Blog body — paragraph before bullet list : The paragraph 'Ce que la gestion de portefeuille de projets permet' reads like a section label or subheading but is rendered as a plain <p> element with no punctuation or colon, making it appear as truncated body copy rather than an intentional intro line.
- **functional** @ Nav CTA — 'Demander une démo' button : The primary CTA button links to '/fr/meetings-pages', which is an internal path that appears to be a staging/placeholder slug rather than a proper demo-booking page. The live site uses a dedicated scheduling URL.
- **content** @ Hero — publication date : The article is dated 'Le 17 septembre 2025', which is a future date relative to any reasonable current date context. This looks like a placeholder or scheduling error that will be immediately visible to readers.

### `blog/pourquoi-mettre-en-place-un-pmo`
- **content** @ Hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data/mapping error (wrong year, likely 2022 or 2023 based on the Webflow CDN image URLs) and will confuse readers and harm SEO credibility.
- **functional** @ Blog body — internal link to PMO article : The inline link to the PMO métier article points to 'https://www.airsaas.io/fr/gestion-de-projet/metier-pmo' (the live domain with the old URL structure) rather than a relative rebuild URL. This hardcoded absolute link to the live site will break the internal linking strategy in the rebuild.
- **structure** @ Blog body — heading hierarchy : The blog body content starts directly with H3 headings (e.g., 'L'envolée des projets transverses') with no H2 wrapping section. The page has an H1 in the hero and a 'Sommaire' H2, but all body content sections use H3 with no intervening H2, creating a gap in the heading hierarchy (H1 → H3) that is semantically incorrect and differs from the intentional blog-body downshift pattern described in the instructions.

### `blog/pourquoi-vos-18-millions`
- **content** @ Publication date metadata (hero section) : The article is dated 'Le 1 février 2026', which is a future date (the article references 'Septembre 2025' as a past event). This is likely a data entry error and will appear incorrect to readers.
- **structure** @ Blog body — first content section heading : The first substantive section uses an H3 ('Pourquoi vos 18 millions d'investissements…') rather than H2, while the page H1 is the article title. The Sommaire section uses H2 for 'Sommaire'. This means the article body sections rank below the table of contents heading, creating an illogical hierarchy where body sections (H3) are subordinate to the TOC (H2).
- **content** @ Callout box quote attribution — 'L'illusion du pilotage stratégique' first callout : The quote attribution reads 'DG, groupe technologique, 1 400 salariés' appended directly to the quote text inside a single paragraph with no visual separator or formatting — the speaker attribution is not distinguished from the quote body, making it look like part of the quote.

### `blog/preparer-comite-de-pilotage-d-un-projet`
- **functional** @ Blog body — internal link (series link) : The link to the series article uses a relative path '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' without the '/fr/blog/' prefix, which will result in a 404 in the new routing structure.
- **content** @ Blog body — H4 'Planifier le Copil longtemps à l'avance' : This H4 sub-section has an image immediately below it but zero body text before the next H4 ('S'assurer de la présence…'). The content for this section appears to have been dropped entirely, leaving a heading + image with no explanatory copy.
- **functional** @ Blog body — external links (airsaas.io absolute URLs) : Several body links use absolute URLs pointing to 'https://www.airsaas.io/fr/gestion-de-projet/…' (e.g. comite-de-pilotage-definitions, comment-decider-en-copil, chef-de-projet-transverse). In the rebuild these should be relative internal links; as absolute URLs they will bypass Next.js routing and may break in staging/preview environments or cause duplicate-domain penalties.
- **structure** @ Blog body — heading hierarchy : The article jumps directly from the intro paragraphs to H3 sections, but the top-level section heading ('Identifier et déterminer les objectifs…') is an H3 while its sub-points are H4s — there is no H2 anywhere in the article body. This breaks the document outline (H1 → H2 → H3) and harms SEO structure.

### `blog/project-portfolio-management`
- **functional** @ Blog body — internal link in section 2 : The link to 'Trois innovations et tendances qui bousculent la gestion de portefeuille de projets' uses a relative path '/gestion-de-projet/trois-innovations-et-tendances-...' missing the '/fr/' locale prefix, which will result in a 404 on the Next.js rebuild.
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date (over a year ahead). This is almost certainly a data error — the live article predates this by years — and will confuse readers.
- **content** @ Blog body — section 1 introduction paragraph : The paragraph reads 'Le programme ERP, SI Finance, ERP ne fera jamais rêver !' — 'ERP' is listed twice in the same short phrase, indicating a copy-paste error in the source content as rendered.

### `blog/program-increment-planning`
- **structure** @ Blog body heading hierarchy : The blog body uses H3 as the first-level section headings and H4 as sub-headings beneath them, but there is no H2 between the H1 title and these H3s (the Sommaire H2 is in a separate section). This creates a gap in the document outline (H1 → H3) that is semantically incorrect and will hurt SEO.
- **functional** @ Sommaire anchor links : The table-of-contents link '#à-quoi-ressemble-un-pi-planning-réussi-avec-des-bénéfices-concrets' and others contain raw accented characters in the fragment, which many browsers will fail to resolve correctly. Anchors with non-ASCII characters should be percent-encoded or slugified to ASCII.

### `blog/reporting-pmo`
- **content** @ Blog hero — publication date : The article shows a publication date of '1 février 2026', which is a future date and will appear wrong to every reader today. This is likely a data entry error (2026 instead of 2024 or 2025).
- **content** @ Body — Question 5 / Paracelse attribution : Paracelse (Paracelsus) is described as 'médecin et alchimiste Russe' — he was Swiss-German, not Russian. This is a factual error visible to any French reader familiar with the quote.
- **content** @ Body — 'Quatre exemples de vues' paragraph : The sentence reads 'L'importance du design n'est plus à démonter' — 'démonter' (to dismantle) should be 'démontrer' (to demonstrate). This is a clear French typo that changes the meaning.
- **structure** @ Blog body — heading hierarchy : The blog body opens directly with an H3 ('Qu'est-ce qu'un reporting projet…') without any H2 parent. The Sommaire section above uses an H2, so the article body headings start at H3, skipping the H2 level for the first major section, creating a broken heading hierarchy for screen readers and SEO.

### `blog/retour-sur-agile-en-seine-2023`
- **content** @ Blog hero — publication date : The article date reads 'Le 1 février 2026', which is a future date for a conference recap from 2023. This is almost certainly a data mapping bug that will confuse readers and harm credibility.
- **content** @ Blog body — opening paragraph : Missing space before 'pour' in 'Agile en Seine</a>pour l'organisation' — the link text runs directly into the following word without a space, making the sentence unreadable.
- **content** @ Blog body — 4 thématiques paragraph : 'SCALE :autour' and 'THINK :vers' are missing a space after the colon, making the bullet formatting look broken and unprofessional across multiple list items.

### `blog/role-du-pmo`
- **content** @ Hero — publication date : The article displays 'Le 1 février 2026' as its publication date, which is a future date (relative to any reasonable review period). This is almost certainly a data-entry or migration error and will look wrong to readers.
- **functional** @ Blog body — internal link to reporting-pmo : The inline link to '/fr/gestion-de-projet/reporting-pmo' uses the old Webflow path structure (gestion-de-projet prefix) rather than the rebuild's /fr/blog/ path, likely producing a 404 in the new routing.
- **functional** @ Blog body — internal links to chef-de-projet-pmo and metier-pmo : Multiple body links point to 'airsaas.io/fr/gestion-de-projet/…' (absolute external URLs or old path structure) instead of the rebuild's internal routes, meaning they exit the app or 404.
- **content** @ Blog body — truncated sentence near end of visible content : The article body is cut mid-sentence ('…pour trouver les situations de win-wi') due to the 30 KB HTML truncation boundary coinciding with actual rendered content; if the production build is also truncated here the article will appear broken to readers.

### `blog/tout-savoir-sur-la-note-de-cadrage-projet`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data entry error (likely 2022 or 2023) and will look wrong to any reader.
- **content** @ Blog body — 'Description du projet et des livrables inclus' paragraph : The word 'quantité' is repeated twice in the same sentence ('la quantité, la quantité, la longueur…'), which is clearly a copy-paste error that reads as broken French.
- **functional** @ Blog body intro — link to 'conduite de projet' : The internal link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing the '/fr/' locale prefix), which will 404 in the rebuilt Next.js app where all French routes require the '/fr/' prefix.
- **functional** @ Blog body — budget link : The link to the budget article uses an absolute URL 'https://www.airsaas.io/gestion-de-projet/budgetiser-un-projet-sans-se-louper' without the '/fr/' locale segment, pointing to the old live site path rather than the rebuilt app route.

### `blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets`
- **content** @ Blog hero – publication date : The article is dated 'Le 1 février 2026', which is in the future. This is almost certainly a data entry error (likely 2022 or 2023 given the article references events from 2020 and an image path from 2022).
- **brand** @ Figure caption – hub image : The figure caption reads 'Airsaas rassemble vos données projets' using 'Airsaas' (lowercase 's') instead of the brand-correct 'AirSaas'. The same casing error appears in the alt text of the same image.
- **content** @ Inline body text – first paragraph : A missing space before 'Gartner' in 'l'institut d'études</strong>Gartner' causes the two words to render concatenated ('étudesGartner'). This is a visible typographic defect in the opening paragraph.
- **structure** @ Blog body – heading hierarchy : The article body opens directly with an H3 ('PPM : trois innovations qui font la différence') with no H2 above it, then uses H4 sub-sections under it. The hierarchy skips H2 entirely, which is semantically incorrect and produces an illogical document outline.

## All pages

| Slug | Type | Status | P0 | P1 | P2 | Note |
|---|---|---|---|---|---|---|
| `program-increment-planning` | blog | BLOCK | 5 | 2 | 1 |  |
| `pi-safe` | blog | BLOCK | 3 | 3 | 2 |  |
| `capacity-planning` | lp | BLOCK | 2 | 4 | 2 |  |
| `automatiser-la-com-projet` | produit | BLOCK | 2 | 4 | 1 |  |
| `outil-ppm` | solution | BLOCK | 2 | 4 | 2 |  |
| `tableau-de-bord-gestion-de-projet` | solution | BLOCK | 2 | 4 | 2 |  |
| `direction-de-la-transformation` | equipe | BLOCK | 2 | 4 | 2 |  |
| `comment-decider-en-copil` | blog | BLOCK | 2 | 4 | 2 |  |
| `la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0` | blog | BLOCK | 2 | 4 | 2 |  |
| `comite-direction` | equipe | BLOCK | 2 | 3 | 2 |  |
| `pourquoi-vos-18-millions` | blog | BLOCK | 2 | 3 | 3 |  |
| `flash-report-projet` | solution | BLOCK | 1 | 5 | 2 |  |
| `tableau-de-bord-dsi` | solution | BLOCK | 1 | 5 | 2 |  |
| `portfolio-management` | solution | BLOCK | 1 | 5 | 2 |  |
| `pilotage-de-projet` | blog | BLOCK | 1 | 5 | 2 |  |
| `pi-planning` | lp | BLOCK | 1 | 4 | 3 |  |
| `ppm` | lp | BLOCK | 1 | 4 | 3 |  |
| `traduction-one-click-avec-deepl` | produit | BLOCK | 1 | 4 | 3 |  |
| `flash-report` | solution | BLOCK | 1 | 4 | 3 |  |
| `outils-de-pilotage-projet` | solution | BLOCK | 1 | 4 | 3 |  |
| `it-et-operation` | equipe | BLOCK | 1 | 4 | 3 |  |
| `outil-pmo` | equipe | BLOCK | 1 | 4 | 2 |  |
| `budgetiser-un-projet-sans-se-louper` | blog | BLOCK | 1 | 4 | 3 |  |
| `capacity-planning-definition` | blog | BLOCK | 1 | 4 | 3 |  |
| `comite-de-pilotage-definitions-et-incomprehensions` | blog | BLOCK | 1 | 4 | 3 |  |
| `comment-faire-un-bon-point-davancement-projet` | blog | BLOCK | 1 | 4 | 3 |  |
| `comment-reussir-un-projet-transverse` | blog | BLOCK | 1 | 4 | 2 |  |
| `gestion-de-portefeuille-projet-pme` | blog | BLOCK | 1 | 4 | 3 |  |
| `le-grand-guide-de-la-conduite-de-projet` | blog | BLOCK | 1 | 4 | 3 |  |
| `les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet` | blog | BLOCK | 1 | 4 | 3 |  |
| `metier-pmo` | blog | BLOCK | 1 | 4 | 3 |  |
| `plan-de-communication-projet` | blog | BLOCK | 1 | 4 | 3 |  |
| `portefeuille-projet` | blog | BLOCK | 1 | 4 | 2 |  |
| `preparer-comite-de-pilotage-d-un-projet` | blog | BLOCK | 1 | 4 | 3 |  |
| `trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets` | blog | BLOCK | 1 | 4 | 3 |  |
| `cadrage-projet` | blog | BLOCK | 1 | 3 | 3 |  |
| `comite-pilotage-projet` | blog | BLOCK | 1 | 3 | 4 |  |
| `gestion-portefeuille-projets-vs-gestion-de-projet` | blog | BLOCK | 1 | 3 | 2 |  |
| `le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation` | blog | BLOCK | 1 | 3 | 3 |  |
| `management-de-portefeuille-de-projet` | blog | BLOCK | 1 | 2 | 1 |  |
| `macro-planning` | blog | WARN | 0 | 6 | 2 |  |
| `pmo` | lp | WARN | 0 | 5 | 3 |  |
| `capacity-planning` | produit | WARN | 0 | 5 | 3 |  |
| `airsaas-et-les-experts-de-la-transfo` | solution | WARN | 0 | 5 | 3 |  |
| `management-de-portefeuille-projet` | solution | WARN | 0 | 5 | 3 |  |
| `gestion-portefeuille-projet` | solution | WARN | 0 | 5 | 3 |  |
| `tableau-de-bord-portefeuille-de-projet` | solution | WARN | 0 | 5 | 3 |  |
| `analyse-des-risques-projet` | blog | WARN | 0 | 5 | 3 |  |
| `appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management` | blog | WARN | 0 | 5 | 3 |  |
| `budget-previsionnel-projet` | blog | WARN | 0 | 5 | 3 |  |
| `capacity-planning` | blog | WARN | 0 | 5 | 3 |  |
| `demarche-de-projet` | blog | WARN | 0 | 5 | 3 |  |
| `jalon-projet` | blog | WARN | 0 | 5 | 3 |  |
| `la-revue-de-projet` | blog | WARN | 0 | 5 | 3 |  |
| `le-modele-de-presentation-pour-votre-comite-de-pilotage` | blog | WARN | 0 | 5 | 3 |  |
| `planification-de-la-demande-capacity-planning` | blog | WARN | 0 | 5 | 3 |  |
| `budget` | produit | WARN | 0 | 4 | 3 |  |
| `priorisation-par-equipes` | produit | WARN | 0 | 4 | 4 |  |
| `revue-de-portefeuille` | solution | WARN | 0 | 4 | 4 |  |
| `chef-de-projet-pmo` | blog | WARN | 0 | 4 | 3 |  |
| `chef-de-projet-transverse` | blog | WARN | 0 | 4 | 3 |  |
| `comment-animer-un-comite-de-pilotage` | blog | WARN | 0 | 4 | 3 |  |
| `comment-animer-un-bilan-projet-efficace` | blog | WARN | 0 | 4 | 4 |  |
| `comment-elaborer-un-reporting-efficace` | blog | WARN | 0 | 4 | 4 |  |
| `comment-gerer-lagressivite-dans-les-comites-de-pilotage` | blog | WARN | 0 | 4 | 3 |  |
| `comment-mettre-en-place-un-comite-de-pilotage` | blog | WARN | 0 | 4 | 4 |  |
| `comment-mettre-en-place-un-pmo` | blog | WARN | 0 | 4 | 4 |  |
| `fiche-projet-exemple-et-methodologie` | blog | WARN | 0 | 4 | 4 |  |
| `kpi-gestion-de-projet` | blog | WARN | 0 | 4 | 3 |  |
| `le-diagramme-de-gantt-comment-sen-servir` | blog | WARN | 0 | 4 | 4 |  |
| `le-guide-du-mode-projet` | blog | WARN | 0 | 4 | 4 |  |
| `le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes` | blog | WARN | 0 | 4 | 4 |  |
| `lean-portfolio-management` | blog | WARN | 0 | 4 | 4 |  |
| `planification-de-la-capacite` | blog | WARN | 0 | 4 | 4 |  |
| `reporting-pmo` | blog | WARN | 0 | 4 | 4 |  |
| `role-du-pmo` | blog | WARN | 0 | 4 | 4 |  |
| `tout-savoir-sur-la-note-de-cadrage-projet` | blog | WARN | 0 | 4 | 4 |  |
| `reporting-projet` | produit | WARN | 0 | 3 | 4 |  |
| `10-pratiques-pour-developper-la-relation-de-confiance-dg-cio` | blog | WARN | 0 | 3 | 5 |  |
| `comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022` | blog | WARN | 0 | 3 | 4 |  |
| `comment-mettre-une-bonne-meteo-projet` | blog | WARN | 0 | 3 | 4 |  |
| `copil-projet-ou-comite-de-pilotage-projet-les-bases` | blog | WARN | 0 | 3 | 3 |  |
| `kanban-gestion-de-projet` | blog | WARN | 0 | 3 | 4 |  |
| `plan-capacitaire` | blog | WARN | 0 | 3 | 5 |  |
| `pourquoi-mettre-en-place-un-pmo` | blog | WARN | 0 | 3 | 3 |  |
| `project-portfolio-management` | blog | WARN | 0 | 3 | 4 |  |
| `retour-sur-agile-en-seine-2023` | blog | WARN | 0 | 3 | 5 |  |
| `pi-planning` | blog | PASS | 0 | 0 | 0 | parse: invalid JSON: Expected ',' or '}' after property value in JSON at position 811 (line 13 column 99) |
