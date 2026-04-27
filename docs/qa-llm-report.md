# QA report — LLM (qa-llm.mjs)

**Date** : 2026-04-27T13:36:28.881Z
**Model** : claude-sonnet-4-6

**Total** : 88 pages — **3 PASS** / 44 WARN / 40 BLOCK / 1 ERR

**Severity totals** : P0 = 66, P1 = 329, P2 = 244

## P0 issues — must fix before ship

### `lp/ppm`

- **layout @ Hero section — right column image** : The hero right column renders a small SVG icon (`icon-portfolio-color.svg`) as the full-width hero visual instead of a product screenshot. This is almost certainly a wrong asset: a tiny vector icon stretched to fill a 60% hero column will look broken and unprofessional to any visitor.

### `lp/capacity-planning`

- **content @ Hero section — product screenshot** : The hero image uses a generic portfolio icon SVG (icon-portfolio-color.svg) instead of an actual capacity planning product screenshot. A decorative icon filling the large right-hand hero panel looks like a broken or placeholder asset to any visitor.

### `produit/automatiser-la-com-projet`

- **structure @ Section 'Vous n'entendrez bientôt plus ces phrases ...'** : The section with H2 'Vous n'entendrez bientôt plus ces phrases ...' is completely empty — no quotes, no pain-point cards, no body content at all. The section heading promises a list of phrases but nothing follows it.
- **content @ Feature split section (image + text)** : The H3 heading 'Ajoutez les sponsors sur vos projets' and its paragraph body are duplicated verbatim from the preceding standalone section. The feature split-section appears to be a copy-paste of the same content block rather than distinct feature content.

### `produit/capacity-planning`

- **content @ Section 'Mise en place rapide, simple à maintenir dans le temps'** : The body copy is truncated mid-thought: 'Voici comment nous le concrétisons.' appears alone after an introductory sentence, with no actual content following. The promised approach/list is entirely missing — this is a stub section shipped to production.
- **content @ Section 'Une vue simple et actionnable'** : The paragraph body ends with the colon 'pour prendre les décisions :' followed by two zero-width space placeholders (‍‍) and nothing else. The decision list content is missing entirely.

### `produit/traduction-one-click-avec-deepl`

- **content @ H2 section — second section after hero** : The H2 reads 'Le rapport flash désormais enmultilingue sur AirSaas' — identical to the H1 (duplicate heading) AND contains a missing space between 'en' and 'multilingue'. This is a visible typo and a content duplicate on the same page.

### `solution/flash-report`

- **content @ Section 'Plus qu'une solution de reporting flash' — paragraph** : The body text reads 'En du flash report automatisé, les autres fonctionnalités AirSaas vous font changer…' — the sentence is clearly truncated/broken mid-phrase ('En du' makes no grammatical sense). A word or clause is missing before 'du flash report'.
- **content @ Hero section — product screenshot image** : The hero image src points to 'arrow_down.svg' (a small decorative arrow icon from Webflow assets) instead of a product screenshot or dashboard visual. The alt text says 'pourquoi AirSaas', confirming this is a wrong/placeholder asset that will render as a tiny icon filling the hero image container.

### `solution/gestion-portefeuille-projet`

- **content @ Hero section — product screenshot** : The hero image src points to 'arrow_down.svg' from the Webflow CDN (cdn.prod.website-files.com), which renders an SVG arrow icon instead of a product screenshot. This is clearly a placeholder/wrong asset that would show a tiny arrow icon where the product UI is expected.
- **structure @ Section after 'Avancez plus sereinement avec votre équipe' (H2)** : The section containing the H2 'Avancez plus sereinement avec votre équipe' is completely empty — it has a heading but no body copy, no feature cards, no illustration, nothing. This is a stub section that will appear as a floating headline with no content below it.

### `solution/outil-ppm`

- **content @ Hero section — hero image** : The hero image src points to 'arrow_down.svg' (a Webflow CDN asset showing a simple down-arrow icon) instead of a product screenshot or meaningful illustration. The alt text 'pourquoi AirSaas' further confirms this is a placeholder left over from a Webflow asset reference, making the hero visually broken and unprofessional.

### `solution/outils-de-pilotage-projet`

- **content @ Hero section — product screenshot** : The hero image src points to 'arrow_down.svg' (a Webflow CDN SVG icon), not a product screenshot. The hero visual is a small arrow icon rendered full-width, which will look broken and unprofessional to any visitor.
- **structure @ H1 — hero heading** : The H1 reads 'Une nouvelle manière de voir les outils de pilotage projet - AirSaas', which includes the brand suffix '- AirSaas' verbatim. This is a page-title/meta artifact that should never appear as visible body copy; it looks like a raw CMS title leaking into the UI.

### `solution/portfolio-management`

- **content @ Hero section — product screenshot** : The hero image src is 'arrow_down.svg' (a small arrow icon from Webflow CDN), not a product screenshot. The main visual of the hero is broken/wrong, showing only a tiny SVG icon instead of the platform UI.
- **content @ Section 'Un capacity planning par équipe simple et actionnable'** : The section body copy ends mid-sentence with 'pour prendre les décisions :' followed by two empty paragraph stubs (‍ zero-width joiner characters). The content is visibly truncated — the bulleted list or follow-up content is missing entirely.

### `solution/tableau-de-bord-dsi`

- **content @ Hero section — hero image** : The hero image src points to an unrelated SVG asset ('arrow_down.svg') instead of a dashboard screenshot. A decorative arrow icon is being rendered as the main product illustration, which will look completely broken to any visitor.
- **content @ Section 'Embarquez par une bonne communication'** : The body content block for this section is completely empty — the inner div renders no text whatsoever. The heading exists but has zero supporting copy, making it a visible stub section on the live page.

### `solution/tableau-de-bord-gestion-de-projet`

- **content @ Hero section — hero image** : The hero image renders an SVG from Webflow CDN with alt text 'pourquoi AirSaas' — this is clearly a generic arrow/decoration asset, not a product screenshot illustrating a project management dashboard. It conveys no product value and looks like a placeholder left in by mistake.

### `equipe/comite-direction`

- **content @ Integrations section (h2: 'Vos équipes vont adorer nos intégrations natives')** : The integrations section contains only a heading and a paragraph — no integration logos, cards, or any visual content is rendered. The section body is entirely empty/stub, making it a broken experience for users.
- **content @ Testimonials section (h2: 'Laissez nos clients vous parler d'AirSaas')** : The testimonials section contains only a heading and an intro paragraph — no actual testimonial cards, quotes, or client content is rendered. The section is empty/stub and should not ship.

### `equipe/it-et-operation`

- **content @ Section — 'Laissez nos clients vous parler d'AirSaas'** : The testimonials section has only a heading and intro paragraph — no actual testimonial cards or quotes are rendered. A user visiting this page sees a blank testimonials section, which looks broken and undermines social proof.

### `equipe/outil-pmo`

- **content @ H1 hero section** : The H1 reads 'L'outil PPMpour un PMO moderne' — there is a missing space between 'PPM' and 'pour', making it appear as 'PPMpour'. This is a visible typo in the most prominent heading on the page.

### `blog/budgetiser-un-projet-sans-se-louper`

- **content @ Retour d'expérience du CIO d'Adeo — aside callout** : The callout box contains un-replaced Webflow template instructions verbatim: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of background-image…'. This raw placeholder text is fully visible to end users.
- **functional @ Blog body intro paragraph — 'conduite de projet' link** : Internal link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet', missing the '/fr/blog/' prefix required by the rebuild's routing. This will result in a 404.

### `blog/cadrage-projet`

- **content @ aside 'À retenir' callout boxes (×2) — section 'Cadrage : l'importance d'un autre rapport au temps'** : Both 'À retenir' callout boxes contain raw template placeholder text: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image"…'. This is unpublishable lorem-stub copy visible to all users.
- **content @ Blog hero — publication date** : The article is dated 'Le 1 février 2026', a future date. This is almost certainly a data entry error (should be 2022 or 2023 based on article content referencing April 2022 publications).

### `blog/capacity-planning-definition`

- **content @ CTA button inside 'Aligner capacité et demande' section** : The CTA button is labelled 'Télécharger' (Download) but links to '/fr/meetings-pages' (a demo/meeting booking page). The label does not match the destination or the surrounding context about capacity planning alignment — this will confuse and mislead users.

### `blog/comite-de-pilotage-definitions-et-incomprehensions`

- **content @ "À retenir" callout boxes (3 occurrences)** : All three 'À retenir' aside boxes contain raw Webflow/CMS placeholder instructions ('Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e') instead of actual content. These are unformatted template instructions visible to end users.

### `blog/comite-pilotage-projet`

- **content @ Astuce 5 — aside callout 'À retenir'** : The quote inside the callout is truncated mid-sentence: "Le temps qu'on prend à s'aligner ce n'est pas du temps perdu..." — the sentence is cut off with no closing quotation mark and no attribution, leaving an incomplete, broken citation visible to readers.

### `blog/comment-animer-un-comite-de-pilotage`

- **content @ Sommaire – last list item** : The last sommaire entry has a blank/invisible label (a zero-width joiner '‍' rendered as text) and links to '#section', a non-descriptive stub anchor. This is a broken table-of-contents entry visible to all users.

### `blog/comment-decider-en-copil`

- **content @ First 'À retenir' callout (after Lionel M. quote)** : The quote inside the callout is visibly truncated mid-sentence: 'tu sors parfois de Copil en te disant : on fait' — the sentence ends abruptly with no conclusion, which will confuse readers.
- **content @ Second 'À retenir' callout (OCTO Tech section)** : The OCTO Tech quote is cut off mid-sentence: 'Le premier est le relevé de décisions. Cela peut paraître anecdotique, mais nous' — clearly truncated, the rest of the content is missing.

### `blog/comment-faire-un-bon-point-davancement-projet`

- **content @ Blog hero — publication date** : The article is dated 'Le 1 février 2026', which is a future date (over a year ahead). This will appear as a blatant error to any reader and undermines credibility.

### `blog/comment-reussir-un-projet-transverse`

- **content @ Author avatar / hero metadata** : The author avatar image URL points to a Webflow CDN asset (cdn.prod.website-files.com) showing a photo whose alt text says 'Jérôme Dard' but the image filename is 'BR-min.jpg' — 'BR' does not match 'Jérôme Dard', strongly suggesting the wrong person's photo is displayed for the author credit.

### `blog/gestion-de-portefeuille-projet-pme`

- **content @ Blog body — multiple 'À retenir' aside callouts** : At least three 'À retenir' callout boxes contain raw developer placeholder text ('Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE"…') instead of actual editorial content. This is directly visible to users and appears repeatedly throughout the article.
- **content @ Blog hero — publication date** : The article shows 'Le 1 février 2026' as its publication date, which is a future date. This is almost certainly a data error and will undermine credibility with every reader.

### `blog/gestion-portefeuille-projets-vs-gestion-de-projet`

- **content @ Hero — author badge** : The author avatar image URL contains 'Avatar%20Je%CC%81ro%CC%82me.png' (a photo of Jérôme) but the displayed name and alt text both read 'Jonas Roman'. This is a wrong person/photo mismatch visible to every reader.

### `blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0`

- **content @ À retenir callout – section 'La supply chain débute avec les fournisseurs'** : The pull-quote is visibly truncated mid-word: '…pour résoudre leurs pro'. The source quote was never fully rendered, making the callout look broken to any reader.
- **content @ À retenir callout – section 'Le défi de construire sa propre chaîne de production'** : Pull-quote cut off mid-word: '…car des bancs te'. Same truncation bug as above — the callout content is incomplete and user-visible.
- **content @ À retenir callout – section '30 ans pour optimiser la supply chain'** : Pull-quote truncated mid-sentence: '…notamment grâce à l'arrivée de l'automatisation' with no closing punctuation or completion. Readers will notice the sentence doesn't finish.

### `blog/le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation`

- **content @ Blog hero — publication date** : The article shows 'Le 1 février 2026' as its publication date, which is a future date (the article exists on the live site today). This is almost certainly a data-mapping or placeholder bug that will look wrong to every reader.

### `blog/les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet`

- **content @ Blog post meta — publication date** : The article is dated 'Le 1 février 2026', which is a future date (the article exists on the live site today). This is clearly a data/mapping bug that will confuse readers and harm SEO credibility.

### `blog/management-de-portefeuille-de-projet`

- **content @ Hero / Author byline** : The author avatar image filename is 'Avatar Jérôme' (from CDN URL) but the displayed name is 'Jonas Roman'. The image and the credited author do not match — a different person's photo is shown.

### `blog/pi-safe`

- **content @ First 'À retenir' callout box (after 'Les avantages d'un bon PI Planning')** : The callout text is visibly truncated mid-sentence: '…on se focalise sur pourquoi on fait ce pr' — the sentence ends abruptly, indicating missing content that will be visible to users.
- **content @ Second 'À retenir' callout box (after 'Avoir une vision claire des priorités stratégiques')** : The callout text is truncated mid-sentence: '…une nouvelle réglementation à suivre, de projet' — clearly cut off, missing the rest of the content.
- **content @ Third 'À retenir' callout box (after 'Anticiper les blocages potentiels')** : The callout text is truncated mid-sentence: '…un portefeuille de projets, pré-trié avec une macro-priorisation, et une estimation "' — sentence ends abruptly with an open quotation mark.

### `blog/pi-planning`

- **content @ First 'À retenir' callout box (before H3 'Qu'est-ce qu'un PI Planning ?')** : The expert quote is visibly truncated mid-sentence: '…ils apportent aussi leurs bonnes pratiques' ends abruptly with no closing punctuation or context. This reads as broken/incomplete content to any visitor.
- **content @ Second 'À retenir' callout box (after PI Planning definition paragraph)** : Expert quote is cut off mid-sentence: '…c'est que les gens qui y participent sont ceux qui y mett' — the word 'mettent' and the rest of the sentence are missing, making the callout visibly broken.
- **content @ Third 'À retenir' callout box (under 'PI Planning et framework SAFe')** : Quote is truncated: '…Les valeurs temporelles comme le trimestre sont très a' — sentence cut off mid-word, clearly a rendering/truncation bug that ships broken copy to users.
- **content @ Fourth 'À retenir' callout box (second under 'PI Planning et framework SAFe')** : Quote cut off: '…dans un contexte de gestion de portefeuille de projets, il peut' — sentence ends mid-thought with no conclusion, visibly broken for all readers.
- **content @ Fifth 'À retenir' callout box (under 'Quels sont les bénéfices d'un PI Planning ?')** : Quote truncated: '…Grâce à un PI Planning, on voit tout passer : les capacités comme le budget à attribuer' — ends abruptly, same systemic truncation bug affecting all expert callout quotes on the page.

### `blog/pilotage-de-projet`

- **content @ "À retenir" aside blocks (multiple occurrences)** : Three separate 'À retenir' call-out boxes contain raw Webflow template placeholder text: "Speaker avatar: insert the link to the speaker page between: href=\"https://LINK_SPEAKER_PAGE\" Speaker avatar: change url of 'background-image' to the url of the image in linkedIn e". This is leftover CMS stub copy visible to all users.

### `blog/planification-de-la-capacite`

- **content @ Blog article metadata — publication date** : The publication date reads 'Le 1 février 2026', which is a future date. This is almost certainly a data entry error (likely 2024 or 2025) and will appear as misinformation to readers.

### `blog/portefeuille-projet`

- **content @ Hero section — author byline** : The author avatar image URL contains 'Avatar%20Jérôme.png' but the displayed name is 'Jonas Roman'. The wrong person's photo is shown, which is a factual error visible to all readers.

### `blog/pourquoi-vos-18-millions`

- **content @ First 'À retenir' callout block** : The bullet point text is truncated mid-sentence: '…Sauf qu'on fait 500 millions de C' — the sentence is cut off and the content is incomplete/broken for users.
- **content @ Third 'À retenir' callout block (section on gouvernance projet)** : Quote attribution is truncated mid-word: '…Chief' — the job title and company context of the quoted person is missing, making the testimonial appear broken.
- **content @ Last visible 'À retenir' callout block (section on asynchronisme décisionnel)** : The quote body is cut off mid-sentence: 'Nous partageons la même stratégie, mais no…' — the HTML is truncated here but this callout's content appears incomplete on the rendered page.

### `blog/preparer-comite-de-pilotage-d-un-projet`

- **content @ Blog hero — publication date** : The article shows 'Le 1 février 2026' as the publication date, which is a future date (over a year ahead). This is almost certainly a data/formatting bug — likely the year field defaulted to 2026 instead of 2022 (the original article date visible in asset URLs like '62c2a70c…').

### `blog/program-increment-planning`

- **content @ First 'À retenir' callout block (intro section)** : The first expert quote callout is visibly truncated mid-sentence: 'Ils apportent aussi leurs bonnes pratiques' ends abruptly with no closing punctuation or complete thought. This is user-visible broken content in the article intro.
- **content @ Second 'À retenir' callout (after PI Planning definition)** : Quote text is cut off mid-word: '…c'est que les gens qui y participent sont ceux qui y mett' — the sentence is visibly truncated, likely a data truncation bug in the CMS/rebuild pipeline.
- **content @ Fourth 'À retenir' callout (after SAFe trimestre paragraph)** : Expert quote ends abruptly: '…dans un contexte de gestion de portefeuille de projets, il peut' — sentence is cut off mid-clause, making the callout meaningless and unprofessional.
- **content @ Third 'À retenir' callout (after SAFe duration paragraph)** : Quote is truncated: '…Les valeurs temporelles comme le trimestre sont très a' — ends mid-word. Multiple callouts across the page share this same truncation pattern, indicating a systemic content-length cap bug.
- **content @ Fifth 'À retenir' callout (budget section)** : Quote ends mid-sentence: '…on voit tout passer : les capacités comme le budget à attribuer' — truncated before completing the expert's point.

### `blog/retour-sur-agile-en-seine-2023`

- **content @ Blog post meta / date** : The publication date shows 'Le 1 février 2026', which is a future date (the event was Agile en Seine 2023). This is clearly a data error that will confuse readers and damage credibility.

### `blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets`

- **content @ Aside / callout block 'À retenir'** : The 'À retenir' callout box contains raw Webflow template placeholder text: "Speaker avatar: insert the link to the speaker page between: href='https://LINK_SPEAKER_PAGE' Speaker avatar: change url of 'background-image' to the url of the image in linkedIn e". This is an unprocessed stub that is fully visible to users.

## P1 issues by page

### `lp/pmo`
- **content** @ Hero section – product image : The hero image src points to an SVG icon ('icon-portfolio-color.svg') rather than a real product screenshot. A small decorative icon rendered full-width as the hero visual will look broken and unprofessional to any visitor.
- **content** @ FAQ accordion – icon spans : The Font Awesome icon spans inside every FAQ button are empty (no icon character/unicode inside the <span>), so no icon is rendered next to the question text. This is visible to the user as a blank gap.
- **content** @ Section 'Vision globale du portefeuille' – feature image : The screenshot used ('Portfolio projects kanban status en.png') has 'en' in the filename suggesting it is the English-language version of the UI, inconsistent with a French-language landing page. Users will see English UI labels in the product preview.
- **content** @ Hero H1 vs 'Vision globale du portefeuille' body copy : The body copy in the 'Vision globale du portefeuille' feature section repeats the H1 headline verbatim ('80 projets côté DSI. 80 côté Marketing. 80 côté Finance.'). This creates an obvious copy-paste duplicate that reads awkwardly to a visitor scrolling the page.

### `lp/ppm`
- **structure** @ Trust band / social-proof section : The section heading uses an H3 ('Ils nous font confiance') while the FAQ below uses an H2 ('Questions fréquentes'). This inverts the heading hierarchy — a trust-band intro label should not outrank a major FAQ section heading.
- **functional** @ FAQ accordion — icon spans : Every FAQ accordion toggle contains a Font Awesome Duotone icon span that renders as an empty box because the Font Awesome 6 Duotone font is not loaded (no character/unicode assigned in the span's text content). Users see a blank ~2.3rem square placeholder before each question.
- **content** @ Hero H1 : The H1 copy mentions 'Brief projet assisté par IA' in the sub-paragraph but no corresponding feature section exists for AI brief generation — the feature sections cover Flash Report, Roadmap, Prioritisation, Decisions, Portfolio, Capacity, and Scenarios. The hero promise is partially orphaned, which may confuse visitors looking for that feature.
- **functional** @ Nav CTA — 'Demander une démo' button : The nav 'Demander une démo' button links to `/fr/meetings-pages` while the hero primary CTA 'Réservez une démo' also links to `/fr/meetings-pages` — consistent, but the secondary hero CTA `▶️ Découvrir l'outil PPM en vidéo (5 min)` links to `/fr/video/ppm`, which is a likely stub or unbuilt page that should be verified before ship.

### `lp/capacity-planning`
- **structure** @ Feature sections — heading hierarchy : The two AI agent feature sections ('Agent IA Brief projet', 'Agent IA Découpage projet') appear before any section establishing what the product is or what capacity planning means. The page jumps straight from a trust bar into detailed feature detail, skipping a logical intro/value-prop section that bridges the hero and features.
- **content** @ FAQ accordion — Font Awesome icon spans : Every FAQ accordion toggle renders an empty icon span (Font Awesome Duotone) that displays nothing — the icon font is not loaded. Each accordion button shows a blank gap where a +/− or chevron icon should be, making the interactive element look broken and unpolished.
- **layout** @ Feature sections — alternating layout (all bg-white) : All eight alternating feature sections share bg-white with no horizontal rule, divider, or background color variation between them. On desktop the continuous white blocks with near-identical structure will visually blur together with no visual rest, making it impossible to distinguish where one feature ends and the next begins.
- **functional** @ Nav CTA — 'Demander une démo' button : The nav CTA 'Demander une démo' links to /fr/meetings-pages while the hero primary CTA 'Réservez une démo' also links to /fr/meetings-pages — consistent, but the second hero CTA '📘 Découvrir le guide Capacity Planning' links to /fr/livre-blanc/capacity-planning. This secondary CTA destination should be verified as a live, published page rather than a stub before ship.

### `produit/automatiser-la-com-projet`
- **structure** @ H3 'Ajoutez les sponsors sur vos projets' (standalone section) : There is a standalone H3 section followed immediately by a standalone paragraph section, both containing identical content ('Ajoutez les sponsors sur vos projets'), before a third section also repeating the same heading. This creates a redundant triple-repetition with broken section hierarchy.
- **content** @ Overall page body : The page body is severely truncated — the live page contains multiple feature sections (email preview, frequency settings, project health statuses, etc.) that are entirely absent. Only one feature block renders, making the page look like an unfinished stub.
- **structure** @ Standalone paragraph section after H3 : A bare <p> wraps an inner <p> tag (invalid nesting: <p><span><p>…</p></span></p>), which browsers will silently break. The content also sits in its own full-padded section instead of being co-located with its heading, causing a visual gap.

### `produit/budget`
- **content** @ FAQ section — accordion icon : The Font Awesome icon span for each FAQ accordion button renders as an empty character (the icon font is not loaded or the unicode glyph is missing), leaving a blank space before each question label. Users see an empty box/square instead of a chevron or toggle icon.
- **content** @ Section 'Prenez en compte le coût humain des projets' : The body copy reads 'Sur AirSaas renseigner les TJM des équipes et découvrez le coût humain de vos projets.' — the sentence is grammatically broken (missing punctuation/conjunction between 'Sur AirSaas' and the imperative verb 'renseigner'), making it feel like truncated or malformed copy.
- **content** @ Section 'Des indicateurs pour piloter sereinement' : The copy contains 'budgets project' (English word 'project' used instead of French 'projets'), which reads as an unintentional typo rather than an accepted brand anglicism.
- **functional** @ Hero CTA button + Nav CTA button : Both the hero CTA ('Je veux une démo') and the nav CTA ('Demander une démo') link to '/fr/meetings-pages', which appears to be an internal routing path rather than a proper demo booking URL. This should resolve to a valid page or external booking link.

### `produit/priorisation-par-equipes`
- **content** @ Feature section 3 — 'Organisez la roadmap de façon éclairée' : Body copy contains a typo: 'porfolios' should be 'portfolios'. Visible spelling error in product copy.
- **content** @ Feature section 1 — 'Chaque équipe définie ses prios' : Heading uses 'définie' (indicative form) instead of the correct 'définit' — grammatical error visible to French speakers in a prominent H3.
- **functional** @ FAQ section — accordion icons : All three FAQ accordion buttons render empty icon spans (Font Awesome Duotone characters are missing/blank), leaving a ~37px empty space to the left of each question. The icon font is either not loaded or the Unicode characters were not inserted.
- **content** @ FAQ answer — 'Si on repriorise en cours de route' : The answer ends abruptly mid-idea: 'Vous pouvez reprioriser en expliquant à tout le monde les raisons' — no period, no conclusion. Reads as truncated copy.
- **structure** @ Intro / subtitle section — 'La manière la plus simple d'y voir clair' : The paragraph content is wrapped as <span><p>…</p></span> inside an outer <p>, creating invalid nested block-level element inside inline — browsers will break this into unexpected DOM nodes, potentially causing visible layout/whitespace issues.

### `produit/capacity-planning`
- **structure** @ Sections between 'Les Scénarios' H2 and 'Une vue simple et actionnable' H2 : Content is split across multiple separate <section> elements per H3/paragraph pair, with H3 headings ('Trouvez le scénario qui fonctionne', 'Sur l'échelle de temps…') each in their own isolated section and their corresponding body paragraphs in separate sections. This breaks the visual and semantic grouping — the H3 and its content are not co-located, likely causing layout gaps or lost hierarchy on screen.
- **content** @ Section 'Les Scénarios' body paragraph : The section body ends abruptly after a single introductory question ('Comment montrer dynamiquement et visuellement cette réalité au top management ?') with no answer or content. It reads like a prompt without a response, suggesting copy was not migrated.
- **layout** @ Hero section — product screenshot image : The hero image alt text is 'Capacity Marketing' which is a generic/internal label rather than a meaningful description. Additionally, the image source is a Webflow CDN URL (cdn.prod.website-files.com), indicating the asset was not migrated to the new infrastructure — a broken image risk if the source CDN is decommissioned.
- **content** @ Section 'Une réponse à toutes vos questions' — paragraph wrapper : A <ul> list is nested directly inside a <p> element (invalid HTML: block element inside inline element), and a second <p> is also nested inside the outer <p>. This will cause browser rendering unpredictability and broken visual layout — the list bullet formatting and paragraph spacing will likely collapse or render incorrectly.

### `produit/reporting-projet`
- **content** @ FAQ section — accordion icon spans : All three FAQ accordion toggle buttons contain an empty <span> that is supposed to render a Font Awesome 6 Duotone icon, but no character/unicode codepoint is present between the tags. The icons will render as blank space on any browser that has the font loaded, and as nothing at all otherwise, making the accordion visually broken.
- **content** @ "Prenons de la hauteur" section — body copy : The text contains a double apostrophe typo: "niveau de d'abstraction" should be "niveau d'abstraction" (extra 'de'). This is a visible copy error in a prominent above-the-fold section.
- **structure** @ Hero section — product feature image : The hero section contains an H1 and a CTA but no product screenshot or illustration, unlike typical product pages. The min-h-screen hero is essentially empty below the paragraph and CTA, leaving a large visual void before the next section.
- **content** @ FAQ section — second FAQ answer : The answer reads "un niveau de sécurité au top" — the article "un" should be "un niveau" which is correct but the preceding phrase has a typo: "avec une niveau" (should be "avec un niveau"). Gender agreement error is visible to French readers.

### `solution/airsaas-et-les-experts-de-la-transfo`
- **content** @ Hero section - paragraph : The hero paragraph runs two sentences together without a space or line break: '…mettre l'impact chez vos client au coeur de votre stratégie.Êtes-vous prêt…' — missing space/separator between sentences makes the copy look broken and unprofessional.
- **brand** @ Section 'AirSaas dans le tooling des missions' - body copy : 'Airsaas vous fournit sa solution PPM' uses incorrect casing 'Airsaas' instead of the brand name 'AirSaas' (capital S missing).
- **content** @ Section 'AirSaas dans le tooling des missions' - body copy : The phrase 'grâce mode multi-workspace' is missing the preposition 'au' — should read 'grâce au mode multi-workspace'. This is a grammatical error visible to French readers.
- **functional** @ Section 'You never walk alone' - missing CTA : The copy ends with a clear call-to-action question ('Partenaires, cette communauté de 200+ experts vous intéresse ?') but there is no button or link to act on it. Every other feature section implies action; this one dead-ends.
- **content** @ Hero section - body copy : 'mettre l'impact chez vos client au coeur' — 'client' should be plural 'clients' (grammatical agreement error visible in the hero, highest-visibility area of the page).

### `produit/traduction-one-click-avec-deepl`
- **content** @ Section with H3 'Animer une réunion…' (appears twice) : The H3 heading 'Animer une réunion, aligner les parties prenantes, on parle le même language !' and its paragraph body appear twice verbatim — once as a standalone H3 section and again as a combined heading+paragraph section just before the footer. This is a clear duplicate block.
- **structure** @ H3 sections mid-page (content sections after hero) : The page breaks content into alternating disconnected sections — an H3 in one section, then the corresponding paragraph text in a separate section with no heading. This creates an illogical heading hierarchy and visually orphaned paragraphs with no semantic container.
- **content** @ H3 'Animer une réunion…' — typo in body : The heading uses 'language' (English spelling) instead of the correct French 'langage'. This is a language error visible to French-speaking users.
- **layout** @ Second section — paragraph containing a UL : A `<ul>` list is nested inside a `<p>` tag, which is invalid HTML. The bullet list of use-cases (aligner, rappeler, donner du contexte, engager) will render incorrectly in most browsers as the browser must fix the invalid nesting.

### `solution/flash-report`
- **structure** @ Section 'Les bonnes pratiques de flash report' — heading and body : This entire section has only a heading and a single short paragraph with no feature cards, list items, or the three 'good practice' tips the heading promises. The section appears to be an empty stub — content was not migrated.
- **structure** @ Section 'Plus qu'une solution de reporting flash' — heading and body : Same issue: the section has only a heading and one broken paragraph but no feature cards, grid, or sub-sections showing the broader governance solution. It is a stub with no substantive content beneath the broken copy.
- **content** @ Feature section 'Une vision Kanban qui simplifie votre gouvernance' : The section heading promises a Kanban view, but the paired screenshot image (Portfolio project filter open) shows a filter panel on a portfolio list — not a Kanban board. Heading and image are mismatched, likely a wrong asset.
- **functional** @ Nav CTA — 'Demander une démo' button (desktop nav) : The nav 'Demander une démo' button links to '/fr/meetings-pages' while the hero primary CTA 'Réservez une démo' also links to '/fr/meetings-pages'. The nav link destination looks correct but the URL slug 'meetings-pages' is English and inconsistent with a French-locale site — worth verifying it resolves and is not a 404.

### `solution/flash-report-projet`
- **content** @ Section 'Des intégrations natives pour éviter le report de données manuel' : The body copy is duplicated within the same paragraph: the integrations list (Jira, ClickUp, Asana, Monday, Microsoft Teams, Zendesk) is repeated almost verbatim in two consecutive sentences, creating obvious redundancy visible to any reader.
- **structure** @ Section heading 'Ils parlent de nous' : The 'Ils parlent de nous' press-logo strip uses an H3 instead of a semantically appropriate H2 or a non-heading label. It appears at the top of the page immediately after the hero, skipping H2, which breaks heading hierarchy.
- **content** @ Section 'Plus qu'une solution de reporting flash : un outil PPM projet moderne et simplissime' : This section contains only a heading and a single short intro sentence — no feature cards, no imagery, no supporting content. It reads as an empty stub section that was never populated.
- **content** @ Section '3 règles d'or pour utiliser votre flash report projet à bon escient' : This section promises '3 règles d'or' but contains only a heading and a one-line teaser with no actual rules listed — the rules content is entirely missing, making the section a visible stub.
- **content** @ Section 'Une structure fixe hyper-lisible' — feature image placement : This section uses lg:pl-[10rem] lg:pr-0 (text-left / image-right layout) but the preceding 'Des intégrations natives' section uses the same layout direction, placing two consecutive sections with the same left-text right-image orientation — the alternating layout pattern expected by the design is broken for these two consecutive sections.

### `solution/management-de-portefeuille-projet`
- **content** @ Section 'Les 5 règles d'or d'un bon management de portefeuille projet' : The section promises 5 golden rules but only renders a short intro paragraph with no actual rules listed. The body content appears truncated — users see a teaser with zero actionable content.
- **structure** @ Section 'Ils parlent de nous' (press logos bar) : This section uses an H3 as its first and only heading, skipping H2 entirely in the page hierarchy (H1 in hero → H3 here → H2 later). This breaks logical heading order and is semantically incorrect.
- **content** @ Feature section 'La vue liste' : Image alt text is just 'List' (English, generic) instead of a descriptive French label matching the section. This is inconsistent with all other feature sections which have meaningful French alt text.
- **content** @ Feature section 'La vue timeline' (image) : The timeline section reuses the exact same image as the hero feature section 'Une planification stratégique simplifiée' (Portfolio project timeline view.webp). Two distinct sections share identical screenshots, making them visually indistinguishable.
- **content** @ Section 'La vue liste' layout direction : Both 'La vue liste' and 'La vue timeline' use the same left-text / right-image layout (lg:pl-[10rem] lg:pr-0), creating three consecutive same-direction sections in a row (liste → timeline → reporting). The alternating left/right rhythm that every other section follows is broken here.

### `solution/gestion-portefeuille-projet`
- **structure** @ Page-wide content structure : The page body is fragmented into ~25 individual <section> elements, each containing only one or two paragraphs of plain text with no visual treatment, images, or feature components. What should be a structured solution page reads as a wall of separated text blocks — the content has been split at Webflow rich-text boundaries rather than assembled into proper semantic sections.
- **content** @ Section 'Rapide historique des outils de gestion de portefeuille de projets' : The H2 heading introduces a history section, but the immediately following section (a standalone paragraph block) references Sciforma, Ganttic, and Planview mid-story — the beginning of the history narrative is entirely missing. The content appears truncated before the introduction paragraph.
- **content** @ Section 'Pour opposer ces deux styles de DSI…' (pyramid of Maslow reference) : The paragraph ends with 'on pourrait les représenter par des pyramides de Maslow :' followed by nothing — no image, no diagram, no list. The colon implies visual content that was never inserted, leaving a dangling sentence.
- **content** @ Last visible section — truncated mid-tag : The HTML ends with '<strong>AirSaas</str' — the final section is truncated mid-element. Even accounting for the 30KB truncation note, this section will render broken markup in the browser if the server response is also cut off.

### `solution/outil-ppm`
- **structure** @ Section after 'Quand est-ce que les logiciels ppm ont commencé à apparaître ?' : A standalone paragraph section contains only 'Problématique ciblée à la date de création' with no surrounding context, table, or image. This is clearly a stub caption for a missing comparison table or chart that was not migrated from the live page.
- **structure** @ Page-level heading hierarchy : The page renders multiple isolated H3 sections each followed by a body-text section, all separated as sibling <section> elements rather than being grouped under their parent H2. This fragments the logical document outline and makes the page read as a flat list of disconnected headings rather than a coherent hierarchy.
- **content** @ Section 'Enfin l'outil PPM que toutes les Directions attendaient' : This H2 section contains only a heading with zero supporting content, no body copy, no image, and no CTA. It functions as a section title with no body, which looks like an empty stub to a human reviewer.
- **functional** @ Body copy links — 'rapport flash' and 'vision d'ensemble des projets' : Internal links within paragraph text point to the old live domain (airsaas.io/fr/solution/…) instead of relative paths on the rebuild. These will route users away from the rebuild environment and break navigation context.
- **content** @ H1 — Hero section : The H1 reads 'AirSaas : un outil PPM nouvelle génération - Logiciel ppm', which includes a raw SEO keyword suffix ('- Logiciel ppm') that is visible to users. This reads as unpolished keyword stuffing rather than a proper marketing headline and would surprise any human reviewer.

### `solution/outils-de-pilotage-projet`
- **content** @ Section 'Valorisez le travail de votre équipe' : This section contains only an H2 heading and nothing else — no body copy, no supporting visual, no CTA. It is a stub section that renders as an isolated floating headline with no content beneath it.
- **content** @ Bullet list section (objectives list) : First bullet reads 'Respecter lesobjectifs de chaque équipe' — the word 'les' is fused with 'objectifs' (missing space). This is a visible typo in a prominent bulleted list.
- **structure** @ Body content — heading hierarchy : Multiple consecutive sections contain only a <p> tag with body text but no heading, while H2s and H3s appear in separate standalone sections disconnected from their related paragraphs. The content is fragmented across dozens of isolated <section> elements, breaking logical document structure and making the page look like a wall of unrelated text blocks.
- **content** @ Section 'La naissance récente des outils de pilotage de projet' : This H2 section has no body content directly associated with it — the text about Planview, Sciforma, and Ganttic appears in a separate sibling section with no heading, severing the semantic connection between heading and content.

### `solution/portfolio-management`
- **content** @ Sections 'Une plateforme de gouvernance…', 'Un capacity planning…', '5 bonnes pratiques…', 'Grâce à sa marketplace…', 'Laissez nos clients vous parler…' : Five consecutive H2 sections contain only introductory text with no supporting visuals, cards, lists or feature blocks beneath them. They appear to be header+intro wrappers whose actual content components (feature cards, testimonial carousel, integration logos, best-practice list) were never rendered, leaving large empty white sections.
- **content** @ Section 'Ritualisez vos reportings' (image) : The image used ('Flash report ppt.webp') is the exact same asset already used in the earlier 'Votre reporting projet en un clic' section. Two distinct feature sections share an identical screenshot, making them visually indistinguishable.
- **structure** @ Press logos section — heading tag : The 'Ils parlent de nous' press/media strip uses an H3 as its first heading after the H1, skipping H2 entirely. While a minor logos strip may not need a heading at all, using H3 here breaks the heading hierarchy (H1 → H3 with no H2 in between).
- **functional** @ Nav CTA — 'Demander une démo' button : The nav CTA 'Demander une démo' links to '/fr/meetings-pages', while the hero CTA 'Réservez une démo' also links to '/fr/meetings-pages'. This is acceptable, but the nav link label says 'Demander' and hero says 'Réservez' — more critically, '/fr/meetings-pages' is a non-standard slug that may 404 if the page is not rebuilt yet; should be verified.

### `solution/revue-de-portefeuille`
- **structure** @ Section '6 clés pour rendre vos revues de portefeuille de projet plus efficaces' : This section introduces '6 clés' but the page renders 9 feature/content sections below it (7 product feature alternating sections + 2 best-practice sections), not 6. The count in the heading doesn't match the actual content, which will confuse users.
- **content** @ Section '6 clés…' — intro paragraph : A <p> tag is nested directly inside a <span> inside a <p> (i.e., `<p><span><p>…</p></span></p>`), which is invalid HTML. Browsers will break the outer paragraph, likely causing the intro text to render incorrectly or get split visually.
- **structure** @ 'Ils parlent de nous' section (press logos) : This section uses an H3 as its first heading, but no H2 precedes it on the page after the H1. The heading hierarchy jumps from H1 directly to H3, breaking document outline and SEO structure.
- **content** @ Sections 'Prioriser les sujets à aborder' and 'Inviter les bonnes personnes à votre revue de portefeuille' and 'Envoyer votre reporting en amont' : These three sections are best-practice advisory copy (tips 1, 2, 3…) with no AirSaas product screenshot or differentiator, yet they follow the same alternating image+text layout template as product feature sections. The last visible section 'Envoyer votre reporting en amont' is truncated mid-sentence in the HTML, suggesting at least partial content is missing.

### `solution/tableau-de-bord-dsi`
- **content** @ Section 'Le pilotage par la valeur' (h3 standalone section) : This h3 section has no body content — it renders as a heading-only block with no paragraph, list, or visual. It appears disconnected and orphaned from the rich text section that follows it, likely a mapping error splitting heading from its body.
- **content** @ Section 'La vue Kaban est plutôt dédiée…' : This paragraph section has no heading and no associated image/feature block — it floats as an orphaned paragraph about 'vue Kanban' (also misspelled as 'Kaban') with no visual context or heading anchor. The misspelling 'Kaban' instead of 'Kanban' is also a content error.
- **structure** @ Section 'L'importance des indicateurs choisis…' (h2) : This H2 section has no body content at all — the heading is immediately followed by a separate section containing the body paragraphs, breaking the semantic pairing. The heading section renders as a standalone empty section visually.
- **structure** @ Section 'Comment construire des indicateurs…' (h2) : Same structural pattern as above — H2 heading is in its own isolated section with no body content, and the corresponding content appears in a subsequent section. Multiple heading-only sections create an illogical visual and semantic hierarchy throughout the page.
- **content** @ Section 'Penser les indicateurs de tableau de bord…' (h3 standalone) : Another heading-only section (h3) with no body — the body paragraph appears in the next section. This repeated pattern of detached headings suggests the CMS-to-component mapping is splitting heading+body pairs into separate sections incorrectly.

### `solution/tableau-de-bord-gestion-de-projet`
- **structure** @ Standalone H2 sections — 'Comment choisir les indicateurs…' and 'En conclusion, voici les deux règles…' : These H2 headings each occupy their own full <section> with massive vertical padding (up to 6.25rem top and bottom) and zero accompanying content. They render as visually isolated floating headings with large blank whitespace above and below, breaking the reading flow and looking broken on screen.
- **content** @ Section 'Tableau de bord de gestion de projets : pourquoi est-ce crucial…' (feature row) : The body copy for this prominently-headed section is truncated to a single short paragraph ending mid-thought with '‍' (a zero-width joiner used as a spacer). The section promises an explanation of why dashboards are crucial for a DSI but delivers no answer, leaving the content visibly incomplete.
- **content** @ Section 'Quelques principes à respecter pour une gestion de portefeuille optimale' (feature row) : The body copy ends with 'Il est important de respecter certaines règles de forme lors de l'élaboration des indicateurs, afin de s'assurer qu'ils soient pertinents :' — a colon implying a list that never appears. The section is truncated and the promised bullet list is missing entirely.
- **layout** @ Body text sections (multiple plain <section> blocks) : Multiple consecutive sections contain only centered body-weight paragraph text with no heading, no visual hierarchy break, and identical padding. At least 5 of these appear back-to-back, making the page look like an unstyled wall of text with no scannable structure — likely a Webflow rich-text dump that was never broken into proper components.
- **functional** @ Hero section — H1 paragraph copy : The H1 subparagraph references 'le grand guide de la conduite de projet' as a hyperlink-implied resource ('nous avons conçu le grand guide…') but the text contains no actual anchor tag, and the Webflow zero-width joiner character '‍' appears immediately after, suggesting a broken inline link or truncated content.

### `equipe/comite-direction`
- **content** @ Section trailing (h3: 'Suivez l'avancée de vos programmes') : This section contains only a heading and one short paragraph with no supporting visual, feature grid, or CTA. It appears truncated — the live page likely includes a programme dashboard image or feature list that is missing here.
- **structure** @ Integrations section then Testimonials section : Two consecutive sections both use H2 headings and have no body content rendered, creating two nearly identical empty blocks back-to-back. This is visually broken and structurally illogical regardless of individual section issues.
- **functional** @ Hero CTA button / nav CTA button : Both the hero CTA ('Réservez une démo') and the nav CTA ('Demander une démo') link to '/fr/meetings-pages', which is an unusual slug that may be a stub or untranslated route — the live site likely uses a dedicated demo booking page.

### `solution/tableau-de-bord-portefeuille-de-projet`
- **structure** @ "Ils parlent de nous" section (media logos) : This section uses an H3 as its first heading on the page after the H1, skipping H2 entirely. While minor in isolation, the 'Ils parlent de nous' section heading is styled as H3 when it should be H2 to maintain a logical heading hierarchy beneath the H1.
- **content** @ "La vue liste" feature section — image alt text : The image for 'La vue liste' has alt text 'List' (English, generic) instead of a meaningful French description like 'Vue liste du portefeuille de projets'. This is inconsistent with other sections and unhelpful for accessibility/SEO.
- **content** @ "La vue Kanban" feature section — image alt text and image mismatch : The image used for 'La vue Kanban' has alt text 'Kanban' but its src filename is 'Portfolio%20header%20menu.webp', suggesting this is a header menu screenshot rather than an actual Kanban view — a likely wrong image assignment.
- **content** @ "Une vue macro" and "La vue timeline" sections — duplicate image : Both the 'Une vue macro au service de votre planification stratégique' section and 'La vue timeline' section use the exact same image (Portfolio%20project%20timeline%20view.webp). The macro view section should show a different screenshot.
- **content** @ "Les clés de succès pour concevoir votre tableau de bord" section : This H2 section contains only a short introductory paragraph and no actual feature cards, list, or substantive content illustrating the 'clés de succès'. It reads as a stub section header with body copy but no supporting content beneath it, leaving the section visually empty.

### `equipe/it-et-operation`
- **content** @ Section heading — 'La marketplate AirSaas' : The heading reads 'La marketplate AirSaas' which is a typo/portmanteau of 'marketplace' — should be 'La marketplace AirSaas'. Visible brand-level typo in a section heading.
- **structure** @ Sections — 'La plateforme qui fluidifie…' and 'La marketplate AirSaas…' and 'Laissez nos clients vous parler…' : Three consecutive sections contain only an H2 heading and a single paragraph with no supporting content (no feature cards, screenshots, testimonials, or any visual element). They appear to be stub/empty sections where the actual content block (cards, grid, carousel) was never rendered.
- **content** @ Section — 'La plateforme qui fluidifie votre gouvernance projet' : This section has only a heading and one short paragraph. The live page shows feature cards/icons here. The feature grid content is missing entirely from the rebuild.

### `equipe/outil-pmo`
- **content** @ Section 'Un capacity planning par équipe simple et actionnable' : The paragraph body ends with 'pour prendre les décisions :' followed by two empty paragraphs (‍‍ zero-width joiners). The content is visibly truncated mid-sentence — the list or continuation that should follow the colon is missing entirely.
- **content** @ Section 'Animez clairement et simplement vos CoPil' (last feature row) : This section reuses the exact same screenshot image ('Portfolio decisions (show projects title).webp') as the earlier 'Fluidifiez votre prise de décisions importantes et urgentes' section. Two different feature sections share an identical image, which looks like a copy-paste error.
- **structure** @ Multiple sections between hero and feature rows : There are four back-to-back H2 sections ('Une plateforme de gouvernance...', 'Un capacity planning...', 'Grâce à sa marketplace...', 'Laissez nos clients vous parler...') that each contain only a subtitle paragraph with no supporting visuals, cards, testimonials, or feature content beneath them. They appear as stub/placeholder sections — especially 'Laissez nos clients vous parler d'AirSaas' which introduces testimonials but renders no testimonial cards.
- **functional** @ Nav CTA — 'Demander une démo' button : The nav 'Demander une démo' button links to '/fr/meetings-pages' while the hero CTA 'Réservez une démo' also links to '/fr/meetings-pages'. The nav link label says 'Demander une démo' but goes to what appears to be a meetings/pages route — this should be verified as intentional and not a broken or misrouted link.

### `blog/10-pratiques-pour-developper-la-relation-de-confiance-dg-cio`
- **content** @ Blog hero — publication date : The publication date shown is 'Le 1/2/2026', which is a future date (February 2026). This is almost certainly a placeholder or parsing error — the live article dates from 2023.
- **content** @ Blog hero — H1 : The H1 reads '10 tips pour la relation DG/CIO' while the article title on the live site is '10 pratiques pour développer la relation de confiance DG/CIO'. The rebuild title is truncated and loses the key promise ('développer la relation de confiance'), which affects SEO and reader expectation.
- **structure** @ Blog body — heading hierarchy : The two top-level section headings ('Transparence en continu…' and 'Optimiser le run de ses RDV…') are rendered as H3, but there is no H2 between the H1 and these headings. This creates an illogical hierarchy (H1 → H3 → H4) that is both semantically broken and poor for SEO.
- **content** @ Blog body — figcaption under workshop photo : The figcaption text runs two sentences together without a space: '…créer des communs autour de la transfo.Travailler les relations…' — the period is immediately followed by the next sentence with no space, making it look truncated or broken.

### `blog/analyse-des-risques-projet`
- **content** @ Blog hero – publication date : The article shows a publication date of '1/2/2026', which is a future date and almost certainly a data/formatting error. The live article predates 2026 by several years.
- **content** @ Blog body – first paragraph / intro : The opening sentence is incomplete: 'Quelle est la dernière fois que vous avez vous dit à votre CODIR…' contains a doubled 'vous' ('avez vous dit') and the sentence ends abruptly with an exclamation mark without a closing quotation mark, making the copy look truncated or malformed.
- **content** @ Blog body – internal link in intro paragraph : The link to 'conduite de projet' uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the '/fr/' locale prefix, which will 404 in the rebuilt Next.js routing structure.
- **content** @ Blog body – internal link in budget paragraph : The link to 'budgets' uses an absolute URL 'https://www.airsaas.io/gestion-de-projet/budgetiser-un-projet-sans-se-louper' (hardcoded production domain, no locale prefix), which bypasses the rebuild environment and will break locale routing.
- **content** @ Blog body – Étape 1 paragraph : 'L'identification des risques et leur traitchef ement' contains a visible typo/corruption ('traitchef ement' instead of 'traitement'), suggesting a copy-paste or CMS migration corruption that will be user-visible.

### `blog/appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management`
- **content** @ Blog post publication date : The publication date reads 'Le 1/2/2026', which is a future date (February 1st or January 2nd 2026 depending on interpretation). This appears to be a placeholder or data mapping error — the live article is clearly older content.
- **content** @ Idée reçue n°4 — paragraph starting 'Ensuite, qu'on définit le troisième workshop' : The paragraph beginning 'Ensuite, qu'on définit le troisième workshop, c'est qu'on va définir un manifeste projet organisationnel…' ends abruptly mid-sentence with 'Déjà,' — the sentence is truncated and left incomplete, which will be visible to readers.
- **content** @ Blog body — competitor mention in Idée reçue n°3 : The body copy explicitly names competitor tools 'JIRA Asana ou Wrike' in a neutral/positive context ('Si la gestion de projet sous JIRA Asana ou Wrike fonctionne…laissez la fonctionner'). While present in the original article, this should be reviewed for brand appropriateness in the rebuild context.
- **structure** @ Blog body content section — top-level headings : The main blog content section uses H3 as the first heading ('L'essentiel en quelques mots…') without a wrapping H2, while the Sommaire section above uses H2. The content hierarchy jumps from H2 (Sommaire) directly to H3 for section titles, skipping a logical H2 level for the body content — this is an inconsistency in the page's heading structure rather than an intentional blog body downshift.

### `blog/budget-previsionnel-projet`
- **content** @ Blog hero — author byline : The author avatar image URL points to 'SV-min.jpg' (initials suggesting a different person, e.g. Sébastien V.) but the displayed name is 'Jérôme Dard'. The image and name are mismatched, which will mislead readers about authorship.
- **content** @ Blog hero — publication date : The publication date is shown as 'Le 1/2/2026', which is a future date. This is almost certainly a placeholder or data-mapping error rather than an intentional future publication date.
- **functional** @ CTA section — 'Réserver une démo' button : The CTA button wrapper div has 'opacity-0 scale-[0.92]' applied with no visible JS-trigger class present in the static HTML, meaning the button renders invisible on load. If the animation observer never fires (e.g. SSR/no-JS), the primary CTA is invisible to users.
- **content** @ Blog body — intro paragraph, internal link : The internal link to the 'conduite de projet' guide uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the '/fr/' locale prefix, which will 404 in the Next.js locale-prefixed routing structure.
- **structure** @ Sommaire — table of contents anchors : The sommaire links use French-accented anchor IDs (e.g. '#quest-ce-quun-budget-prévisionnel') but the corresponding H3 headings in the article body have no matching 'id' attributes at all, so clicking a sommaire link will not scroll to the correct section.

### `blog/budgetiser-un-projet-sans-se-louper`
- **content** @ Hero — publication date : The publication date displays 'Le 1/2/2026', a future date. The article appears to be from 2022 based on CDN asset URLs. This is likely a placeholder or data mapping error.
- **content** @ Découpez le budget — 'Limites des estimations' paragraph : The agile coach is identified only as 'Frédéric' with no surname ('coach agile Frédéric' — sentence ends there). The full name appears truncated, leaving a credibility-damaging stub attribution.
- **functional** @ Blog body — 'budget prévisionnel' link : The link uses an absolute URL pointing to the live domain 'https://www.airsaas.io/fr/gestion-de-projet/tout-savoir-sur-le-budget-previsionnel-projet' instead of a relative internal path, and the path uses the old routing scheme without '/blog/', likely resulting in a 404 on the rebuild.

### `blog/cadrage-projet`
- **functional** @ Intro paragraph — link to 'conduite de projet' : The internal link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet', missing the '/fr/' locale prefix required by the Next.js i18n routing, causing a 404 for all French visitors.
- **content** @ Section 'Cadrage : l'importance d'un autre rapport au temps' — two 'À retenir' boxes : Two identical 'À retenir' callout components appear back-to-back in the same section (flanking the second illustration), both with the same placeholder text. Even if real content were present, this duplication looks like a structural error.

### `blog/capacity-planning`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data entry error and will appear nonsensical to readers visiting before that date.
- **brand** @ Blog body — intro paragraph : The brand is written as 'Airsaas' (lowercase 's') twice in the body copy ('chez Airsaas, on sait…' and 'Chez Airsaas, nous recommandons…') instead of the correct 'AirSaaS' capitalisation used in the brand identity.
- **content** @ Sommaire nav — list item count vs. section title : The Sommaire lists only 5 entries but the section heading for benefits reads 'Les 7 bénéfices' while the bullet list in the body only contains 6 items — the seventh benefit is missing, making the numbered claim inaccurate.
- **functional** @ Blog body — internal link (plan capacitaire) : The link to 'notre article sur les 7 étapes pour créer votre plan capacitaire' uses 'http://' (not 'https://') for an airsaas.io URL, which will trigger a mixed-content warning or redirect failure in production.

### `blog/chef-de-projet-pmo`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data/mapping bug where the publish date was set incorrectly, and will look wrong to every reader.
- **content** @ Blog hero — author avatar : The author display name is 'Jérôme Dard' but the avatar image alt text also says 'Jérôme Dard' while the image URL contains 'BR-min.jpg', suggesting the photo and the name may be mismatched (likely a different person's photo is shown).
- **structure** @ Blog body — heading hierarchy : The first content heading is an H3 ('Qui est le PMO ?') directly under the H1, skipping H2 entirely. The TOC section uses an H2 ('Sommaire') but the article body jumps straight to H3, creating an illogical heading hierarchy that harms SEO and accessibility.
- **content** @ Blog body — 'Quels softs skills' section, last list item : The last bullet point in the soft skills list is visibly truncated mid-word ('nécess…') due to the HTML truncation, indicating the content was cut off and the full text is missing from the rendered page.

### `blog/capacity-planning-definition`
- **content** @ Blog post date — hero section : The publication date reads 'Le 1 février 2026', which is a future date. This is almost certainly a data entry error (should likely be 2024 or 2025) and will appear wrong to any reader.
- **structure** @ Blog body — heading hierarchy : The blog article uses H3 as the top-level section headings (e.g. 'Capacity Planning : définition et concepts clés') directly under the H1, skipping H2. H2 is only used for 'Sommaire'. This creates an illogical document outline and is not an intentional blog-body downshift — the sections are major content chapters, not sub-sections of Sommaire.
- **brand** @ Blog body — multiple inline mentions : The brand is referred to as 'Airsaas' (lowercase 's') in body copy (e.g. 'si vous avez déjà mis Airsaas en place', 'sauf si vous avez déjà mis Airsaas en place') while the official brand name is 'AirSaas' with a capital S. Inconsistent casing appears at least twice in the article body.
- **content** @ Blog body — 'Aligner capacité et demande' paragraph : The sentence 'aligner la capacité et la demande en fonction des objectifs stratégiques de votre organisation.' is missing a space before 'de' — it reads '…stratégiquesde votre organisation.' This is a typographic glitch that will be visible to readers.

### `blog/chef-de-projet-transverse`
- **content** @ Blog hero – publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data entry error (likely meant to be 2022 or 2023) and will appear incorrect to readers.
- **content** @ Blog hero – author avatar : The author is displayed as 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', which appears to be a different person's photo (likely another author). This is a mismatched author photo.
- **content** @ Blog body intro paragraph : The opening paragraph contains a missing space before 'transverses': '…rendre efficace le pilotage de projets</strong>transverses…' — the bold closing tag and the next word are concatenated with no space, which renders as 'projetstransverses' visually.
- **functional** @ Blog body intro paragraph – internal link : The link to 'conduite de projet' uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the locale prefix '/fr/', which will result in a 404 in the rebuilt Next.js app.

### `blog/comite-de-pilotage-definitions-et-incomprehensions`
- **content** @ Article publication date metadata : The publish date reads 'Le 1 février 2026' — a date in the future (2026). The live article is from 2022; this appears to be a data mapping error producing an incorrect future date.
- **content** @ Blog body — internal link (series reference) : The link to the series article uses a relative path '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' missing the '/fr/' locale prefix, which will result in a 404 for French-locale users.
- **content** @ Blog body — introduction paragraph : The intro states 'on va démystifier 5 notions simples : celle de sponsor, de Copil, de jalons, de chef de projet, de key user et de reporting' — that is actually 6 items listed, not 5. The notion of 'sponsor' is also never developed as a dedicated section in the body, creating a false promise to the reader.
- **functional** @ Blog body — external links using absolute airsaas.io domain : Internal cross-links (e.g. to /fr/gestion-de-projet/jalon-projet, /fr/gestion-de-projet/analyse-des-risques-projet, etc.) use the full absolute URL 'https://www.airsaas.io/fr/...' rather than relative paths, which will point to the live site instead of the rebuild environment during QA and may cause issues in staging/production domain changes.

### `blog/comite-pilotage-projet`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is likely a data entry error (should probably be 2022 given the article's content and image URLs from that era), and will appear absurd to readers.
- **functional** @ Blog body — internal link 'Comité de pilotage ou Copil : Les bases' : The href points to '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' (a Webflow-era path with no locale prefix), which will 404 in the Next.js rebuild. It should resolve to '/fr/blog/...' or the equivalent new route.
- **content** @ Astuce 4 — image alt text : The GIF illustration has alt text 'Illustration photo d'un des membres de l'équipe AirSaas' but the image is clearly a generic celebratory reaction GIF, not a photo of an AirSaas team member. This is misleading and also poor for accessibility.
- **structure** @ Blog body — heading hierarchy : The article starts directly with H3 headings ('Astuce 1', 'Astuce 2', etc.) without any H2 wrapping section. The TOC section above uses an H2 for 'Sommaire', so the body content skips a level, creating an illogical heading hierarchy (H1 → H3 for body sections).

### `blog/comment-animer-un-comite-de-pilotage`
- **content** @ Blog body – internal link 'Comment bien préparer un comité de pilotage ?' : The link to the related article 'Comment bien préparer un comité de pilotage ?' points to bare '#' (dead anchor), not to the actual article URL. Users clicking it go nowhere.
- **content** @ Blog body – internal link 'Comité de pilotage ou Copil : Les bases' : The href is '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' (no locale prefix), which will 404 in the new Next.js routing that requires '/fr/blog/…'. Broken cross-link for all French users.
- **content** @ Hero – publication date : The article is dated 'Le 1 février 2026', a date in the future. The live article was published in 2022. This is almost certainly a data mapping error producing a nonsensical future date.
- **structure** @ Blog body – opening paragraph : The first rendered paragraph is an empty <span>‍</span> (zero-width joiner only), producing a blank paragraph before the intro text. This is a stray Webflow Rich Text artefact that creates unwanted whitespace and looks broken.

### `blog/comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022`
- **content** @ Blog hero – publication date : The article is dated 'Le 1 février 2026', which is a future date. The live article was published in 2022; this appears to be a data-mapping bug producing an impossible/wrong date visible to every reader.
- **structure** @ Table of contents – anchor href : The TOC link '#ppm-pragmatique-en-2022-à-retenir' uses accented characters and spaces in the fragment identifier. This is likely to fail in most browsers as anchor IDs with raw accented characters/special characters are unreliable; the corresponding heading anchor must match exactly or navigation will silently break.
- **content** @ Blog hero – category label : The breadcrumb reads 'dans Gestion de projet' but the pill badge above the H1 says 'Le Blog' — the category link points to '/fr/blog/articles' which is a generic listing, not the 'Gestion de projet' category. The live site routes to '/fr/gestion-de-projet/…'; the category taxonomy appears lost in the rebuild.

### `blog/comment-decider-en-copil`
- **content** @ Blog article body — paragraph duplication : The paragraph beginning 'Et les clients internes, sponsors, membres du comité de pilotage...' appears verbatim twice in a row, which is an obvious copy-paste duplication error visible to any reader.
- **content** @ Publication date (hero section) : The article date reads 'Le 1 février 2026' — a future date (the article is a pre-2022 piece). This looks like a data mapping error and will appear wrong to any reader in the present.
- **functional** @ Blog body — internal link 'Comité de pilotage ou Copil : Les bases' : The link href is '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' (no locale prefix), which will 404 in the rebuilt Next.js app where the correct path should include '/fr/'.
- **functional** @ Blog body — internal link 'comités de pilotage projet' : The link href is 'https://www.airsaas.io/fr/gestion-de-projet/comite-de-pilotage-definitions-et-incomprehensions' — an absolute link pointing to the live production domain rather than a relative path in the rebuild, causing cross-environment navigation issues.

### `blog/comment-elaborer-un-reporting-efficace`
- **content** @ Blog article body — intro paragraph 4 : The download CTA copy reads 'Et en plus en cadeau vous pouvez télécharger (100% éditable sous format power point) notre modèle de reporting projet ici.' — the link text is just 'reporting projet ici.' with no space before the link, making it read as 'de reporting projet ici.' which is grammatically awkward and the link label is too generic/non-descriptive.
- **content** @ Blog hero — publication date : The date shown is 'Le 1 février 2026', which is a future date. This is almost certainly a data/mapping error — the live article was published in 2022.
- **content** @ Blog article body — internal link in intro paragraph 2 : The internal link to 'conduite de projet' uses a relative path without locale prefix: '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet'. All other internal links on the page correctly use '/fr/...' — this link will 404 in the rebuilt site.
- **brand** @ Author avatar — blog hero : The author name shown is 'Jérôme Dard' but the avatar image URL contains 'SV-min.jpg' (suggesting a different person's photo, likely Sébastien V.). The photo and name appear mismatched, which is a credibility issue.

### `blog/comment-faire-un-bon-point-davancement-projet`
- **functional** @ Blog body — internal link (conduite de projet) : The link to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' uses a root-relative path without the '/fr/' locale prefix, which will 404 in the French locale rebuild.
- **structure** @ Blog body — heading hierarchy ('Établissez de bons objectifs' / 'On ne réussit que par rapport aux objectifs fixés') : Two consecutive H4 headings appear with no body copy between them — 'Établissez de bons objectifs' is immediately followed by 'On ne réussit que par rapport aux objectifs fixés' at the same H4 level. This looks like a split heading that should be merged, or the second H4 is a sub-point that lost its parent H3, breaking the outline logic.
- **content** @ Blog body — paragraph about AirSaas (Copil section) : The brand name is rendered as 'Airsaas' (lowercase 's') in the body copy ('Avec Airsaas, on a créé…'), inconsistent with the correct casing 'AirSaas' used elsewhere on the page.
- **content** @ Blog body — truncated at end of article : The HTML is cut off mid-sentence ('style="font-si…') inside the article body. It is unclear whether the full article content (including the 'À retenir' section listed in the table of contents) is actually rendered; the truncation may leave the page missing its final sections in production.

### `blog/comment-gerer-lagressivite-dans-les-comites-de-pilotage`
- **content** @ Blog body — '7 conseils' section intro paragraph : The body text references '10 astuces' ('Nous verrons ci-dessous dans les 10 astuces comment réagir') but the article heading and table of contents promise '7 conseils'. This numerical contradiction will confuse readers and looks like a copy-paste error from an earlier draft.
- **content** @ Blog intro — internal link (fourth paragraph) : The link to the 'Comité de pilotage ou Copil : Les bases' dossier uses a relative path starting with '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' (no locale prefix '/fr/'), which will 404 or redirect incorrectly in the rebuilt Next.js app that requires '/fr/' prefixes.
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', a future date. The live article was published in 2022. This looks like a data mapping error in the rebuild — a date far in the future will erode trust and look like a bug to any reader.
- **brand** @ Second figure image — alt text : The alt text for the tension-in-copil image reads 'agressivité dans les copil' and the image filename contains 'airsaaas' (triple 'a'). While the filename is from the CDN, the alt text is undersized/generic and the brand name typo in the asset path ('airsaaas') is visible in the rendered HTML, which could surface in social shares or screen readers.

### `blog/comment-mettre-en-place-un-comite-de-pilotage`
- **content** @ Blog hero — publication date : The article shows 'Le 1 février 2026' as the publication date, which is a future date. This is almost certainly a data error (likely 2022 or 2023 based on the Webflow CDN image URLs), and will appear bizarre to readers.
- **functional** @ Blog body — internal link 'Comité de pilotage ou Copil : Les bases' : The link href is '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' — a relative path without the '/fr/blog' prefix used by the rebuild. This will result in a 404 on the new site.
- **functional** @ Blog body — internal link 'comité de pilotage projet' : The href points to 'https://www.airsaas.io/fr/gestion-de-projet/comite-de-pilotage-definitions-et-incomprehensions' — an absolute URL to the old live site domain rather than a relative path on the rebuild, breaking internal navigation and potentially sending users off-site unexpectedly.
- **functional** @ Blog body — link 'découvrez comment gérer l'agressivité dans les comités de pilotage' : This link also points to an absolute 'https://www.airsaas.io/fr/gestion-de-projet/...' URL on the old domain instead of a relative rebuild path, same cross-domain leak issue.
- **structure** @ Blog body — heading hierarchy : The blog article content begins directly with H3 elements ('Pourquoi faire un Copil ?', etc.) without any H2 wrapping or introduction, creating an illogical heading hierarchy beneath the page H1. The Sommaire section uses an H2 titled 'Sommaire' but the actual article content sections are all H3, making the document outline jump from H1 → H3.

### `blog/comment-mettre-en-place-un-pmo`
- **content** @ Blog hero — publication date : The article shows 'Le 1 février 2026' as its publication date, which is a future date (the original live article is from 2023). This looks like a placeholder or data-mapping error that will confuse readers and hurt SEO credibility.
- **functional** @ Blog body — internal links pointing to live domain : Multiple in-body links (e.g. href='https://www.airsaas.io/fr/gestion-de-projet/metier-pmo', href='https://www.airsaas.io/fr/gestion-de-projet/pourquoi-mettre-en-place-un-pmo') point to absolute live-site URLs instead of relative rebuild paths, meaning clicks will leave the rebuilt site entirely.
- **content** @ Blog body — ordered list item 1 (ROI criteria) : The first list item ends with a double period ('…futurs investissements..'). This is a copy error that appears verbatim in the rebuild and should be corrected before ship.
- **content** @ Blog body — ordered list item 3 (PMO prerequisites) : The third prerequisite bullet reads 'On donne (vraiment) au PMO**les capacités…' — there is a missing space between 'PMO' and 'les capacités', making the sentence read incorrectly. This is a formatting/copy defect visible to readers.

### `blog/comment-mettre-une-bonne-meteo-projet`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date and is almost certainly a data error. This will appear wrong to any reader and undermines credibility.
- **functional** @ Blog body — internal link (conduite de projet) : The link to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' uses a relative path without the '/fr/' locale prefix, which will result in a 404 in the Next.js locale-aware routing setup.
- **content** @ Blog body — opening paragraph : The article body opens mid-thought with 'Oui ! Cette approche est à la fois...' with no preceding context or introductory sentence. The H1 asks a question but the body immediately answers it as if a preceding paragraph is missing, suggesting truncated or missing intro content.

### `blog/copil-projet-ou-comite-de-pilotage-projet-les-bases`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data error (likely 2022 or 2023 given the Webflow CDN asset timestamps), and will confuse readers and harm SEO credibility.
- **content** @ Blog body intro — first paragraph : The phrase 'C'est lui qui fait le lien' contains an empty <strong></strong> tag between 'le' and 'lien', producing an invisible stray bold tag that may render a spurious space or zero-width artifact mid-sentence. Same pattern recurs several times in the body (e.g. 'instance<strong></strong>décisionnelle', 'arbitrer seul<strong></strong>et').
- **brand** @ Blog hero — author avatar : The author is labelled 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', strongly suggesting the photo is of a different person (likely someone with initials 'BR'). This is a content/brand mismatch that is visible to users.

### `blog/comment-reussir-un-projet-transverse`
- **content** @ Hero metadata — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data mapping error (wrong year or field), and will look like a mistake to any reader visiting in 2024–2025.
- **functional** @ Blog body — internal link (conduite de projet) : The in-body link to 'conduite de projet' uses a relative href of '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing the '/fr/' locale prefix), which will 404 on the rebuilt site that uses '/fr/...' routes.
- **content** @ Blog body — truncated content (phase de test paragraph) : The HTML is visibly truncated mid-sentence: '…pendant la phase de tes' — the word 'test' and everything after it is cut off, meaning readers will see incomplete content at the bottom of the visible article body.
- **structure** @ Blog body — heading hierarchy : The third top-level sommaire section 'Les éléments clés d'exécution pour réussir vos projets transverses' is correctly an H3, but its child sub-sections '1 : Rationaliser' and '2 : Dérisquer' are H4 while 'À chaque problématique sa solution pragmatique', 'Prioriser les fonctionnalités clés…', etc. are also H4 at the same level — meaning the numbered structural steps (1, 2…) share a heading level with their own sub-items, collapsing two logical hierarchy levels into one.

### `blog/demarche-de-projet`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data-entry error (should likely be 2022 or 2023 based on the content era) and will confuse readers and hurt SEO credibility.
- **functional** @ Blog body — internal link 'conduite de projet' : The link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (no locale prefix), while all other internal links use the full 'https://www.airsaas.io/gestion-de-projet/…' absolute URL pointing to the live site. Both patterns are inconsistent with the rebuild's '/fr/…' routing convention, risking broken or cross-domain links.
- **functional** @ Blog body — multiple internal links : Several in-body links (e.g. airsaas.io/gestion-de-projet/…, airsaas.io/gestion-de-projet/budgetiser-un-projet…, etc.) are hardcoded absolute URLs pointing to the production site rather than relative '/fr/blog/…' paths in the rebuild. This means clicks navigate away from the rebuild entirely.

### `blog/fiche-projet-exemple-et-methodologie`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data-mapping error (wrong year) and will look broken to any reader checking when the article was published.
- **content** @ Blog body — first paragraph internal link : The link to 'conduite de projet' uses a relative path without the locale prefix: '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet'. On the rebuild's /fr/blog/ route this will 404; it should be '/fr/gestion-de-projet/…' or the correct blog slug.
- **content** @ Blog body — author avatar : The author display name is 'Jérôme Dard' but the avatar image alt text is 'Jérôme Dard' while the image URL points to a file named 'BR-min.jpg', strongly suggesting the photo shown is not Jérôme Dard (likely a different person). This is a credibility/trust issue visible to all readers.
- **content** @ Blog body — 'Se poser les bonnes questions' paragraph : The sentence reads 'De quelles informations a-t-on besoin que votre fiche soit utile…' — the subordinating conjunction is missing ('pour que'), making this grammatically broken French that reads as truncated mid-construction.

### `blog/gestion-de-portefeuille-projet-pme`
- **content** @ Blog body — INSEE stat paragraph : The hyperlink labelled 'D'après l'INSEE' points to oberlo.fr, not to an INSEE source. Misattributing a statistic to the official French statistics institute while linking to a third-party blog is factually misleading.
- **content** @ Blog body — intro paragraph 2 : The copy contains 'Power^Point' (with a caret) instead of 'PowerPoint' — a visible typo in a prominent introductory paragraph.
- **content** @ Blog body — body copy throughout : Multiple empty <strong></strong> tag pairs are scattered inline (e.g. around 'cœur du tissu économique', 'couverture fonctionnelle', 'valeur ajoutée'), producing unexpected whitespace gaps between words that visually break sentence flow.

### `blog/kanban-gestion-de-projet`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026', which is a future date. This will appear as an error to readers and erodes credibility — likely a data entry mistake (2026 instead of 2022 or 2023).
- **content** @ Blog body — 'Les avantages du Kanban physique' paragraph : The text reads 'certaines équipes (notamment des développes de développeurs informatiques)' — 'développes' is a garbled word, likely a truncation artifact from 'des équipes' or 'des groupes'. This is a visible typo in the article body.
- **content** @ Blog hero — author avatar : The author is labelled 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', which on the live site corresponds to a different person (Brice R.). The name and photo appear mismatched.
- **functional** @ Table of contents — anchor links : The sommaire links use French-character anchors (e.g. '#quest-ce-que-cest-que-la-méthode-kanban') but the corresponding H3 elements in the body do not appear to carry matching id attributes in the rendered HTML, meaning the in-page navigation will silently fail.

### `blog/jalon-projet`
- **content** @ Sommaire nav – second list item : The second sommaire entry has a blank label (only a zero-width joiner '‍') and links to '#section', a non-descriptive placeholder anchor. It will appear as an empty bullet in the table of contents.
- **content** @ Blog body – empty H3 between 'Qu'est-ce que qu'un jalon projet?' section and the milestone image : There is an H3 element whose visible text is only '‍' (a zero-width joiner), rendering as a blank heading in the page flow and creating a confusing gap in the heading hierarchy.
- **content** @ Hero – article date : The publication date reads 'Le 1 février 2026', which is a future date (more than a year ahead). This is almost certainly a data entry error and will look wrong to readers.
- **content** @ Blog body – 'degré de confiance' paragraph : The sentence reads 'est l'ne des nouveautés' — 'l'ne' is a clear typo for 'l'une', a user-visible spelling error in the article body.
- **content** @ Figure – 'Comment faire les jalons' image alt text : The image alt text is truncated: 'Dessin de ' — the subject of the drawing is missing, leaving an incomplete and meaningless alt attribute.

### `blog/gestion-portefeuille-projets-vs-gestion-de-projet`
- **structure** @ Blog article URL routing : The live page lives at /fr/gestion-de-projet/gestion-portefeuille-projets-vs-gestion-de-projet but the rebuild serves it at /fr/blog/gestion-portefeuille-projets-vs-gestion-de-projet. This is a structural path change that breaks existing backlinks and SEO equity, not a DS-level change.
- **content** @ Hero — publication date : The article shows 'Le 17 septembre 2025' which is a future date for an article that already exists on the live site. This looks like an incorrect or placeholder date that will surprise readers.
- **content** @ Body — list intro paragraph before bullet list : The text 'Ce que la gestion de portefeuille de projets permet' is wrapped in a <p> tag but serves as a section title for the following bullet list. It will render at paragraph size with no visual weight, making the list appear to have no heading.
- **structure** @ Article body — heading hierarchy : The page jumps from <h1> in the hero directly to <h2> for 'Sommaire' then uses <h3> for all main body sections. The Sommaire and the body sections are at the same conceptual level, making the hierarchy illogical and harming SEO and accessibility.

### `blog/kpi-gestion-de-projet`
- **content** @ Blog hero — publication date : The article shows 'Le 1 février 2026' which is a future date (2026). This is almost certainly a data entry error and will look wrong to any reader checking the date today.
- **content** @ Blog hero — author avatar : The author is labelled 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', strongly suggesting the photo displayed is not Jérôme Dard but a different person (likely a 'BR' initials match). Wrong photo next to an author name is a credibility issue.
- **structure** @ Table of contents — sommaire anchor : The sommaire entry reads 'Quels sont les KPI les plus utilisés ? ‍Les KPI de coûts' — the zero-width non-joiner character (‍) from a Webflow rich-text field is visible as a broken character sequence in the anchor text. This will render as a visual artifact in the ToC.
- **content** @ Blog body — internal link href : The link to 'le suivi de votre projet' points to 'https://www.airsaas.io/fr/gestion-de-projet/le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes' — an absolute URL to the live production domain rather than a relative internal path. On the rebuild this will bypass the new routing and leave the user on the old site.

### `blog/la-revue-de-projet`
- **content** @ Blog post metadata — publication date : The article shows 'Le 1 février 2026' as publication date, which is a future date (2026). This is almost certainly a data error and will look wrong to readers.
- **content** @ Author avatar — hero section : The author is displayed as 'Jérôme Dard' but the avatar image URL contains 'SV-min.jpg' (likely initials of a different person). The photo does not match the named author.
- **content** @ Blog body — second paragraph under intro : The sentence 'En plus de l'objectif officiel, cette est un outil de management de projet…' is grammatically broken — 'cette est' is not valid French; a noun is missing after 'cette' (e.g. 'cette réunion est').
- **functional** @ Blog body — internal link in second paragraph : The link to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' is a relative URL missing the locale prefix '/fr/', which will result in a 404 on the rebuild.
- **structure** @ Table of contents — duplicate heading : The sommaire contains two entries that are nearly identical: 'À quoi sert une revue de projet ? Qu'est-ce qu'une revue de projet ?' and then separately 'À quoi sert une revue de projet ?'. This duplication signals either a copy-paste error in the TOC or a duplicate H3 in the article body.

### `blog/le-diagramme-de-gantt-comment-sen-servir`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This looks like a placeholder or data-mapping error that will confuse readers and hurt SEO credibility.
- **content** @ Blog body — internal link (conduite de projet) : The link to the 'conduite de projet' guide uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the '/fr/' locale prefix, which will likely result in a 404 in the Next.js rebuild.
- **content** @ Blog body — last paragraph (jalon projet link) : The closing link to 'le jalon projet' also uses a locale-less relative path '/gestion-de-projet/les-jalons-projet-une-technique…', missing the '/fr/' prefix and likely broken.
- **functional** @ CTA section — demo button : The 'Réserver une démo' button is wrapped in a div with 'opacity-0 scale-[0.92]' and no JS-driven animation class appears to be applied at render time, meaning the CTA button is invisible on page load for users without JS or if the animation observer fails.

### `blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0`
- **content** @ Blog hero – publication date : 'Le 1 février 2026' is a future date. This is almost certainly a data mapping error (wrong year); a future-dated article on a live blog looks like a bug or placeholder.
- **content** @ Body paragraph – section 'La supply chain débute avec les fournisseurs' : Grammatical error visible to French readers: 'Découvrons quelles techniques Olivier Fiquet qu'il a mise en œuvre' — doubled subject pronoun ('Fiquet qu'il') is a clear copy corruption, likely a merge artefact.
- **functional** @ Body links – podcast references (e.g. /podcast-cio-revolution/...) : Internal links point to /podcast-cio-revolution/ path which does not match the rebuild's URL structure (/fr/blog/). These are likely dead links in the new build and should be remapped or removed.

### `blog/le-grand-guide-de-la-conduite-de-projet`
- **content** @ Blog hero — publication date : The article shows 'Le 1 février 2026' as the publication date, which is a future date (over a year ahead). This is almost certainly a data/mapping error and will appear wrong to readers.
- **functional** @ Blog body — internal article links (href attributes) : Internal links in the body content point to relative paths like '/gestion-de-projet/comment-mettre-une-demarche-de-projet-dans-mon-entreprise' and '/gestion-de-projet/tout-savoir-sur-la-note-de-cadrage-projet' — missing the '/fr/' locale prefix and the '/blog/' segment used by the rebuild. These will 404 in the new routing structure.
- **content** @ Blog body — H4 'Tout savoir sur la note de cadrage projet' link : The anchor text reads 'Tout savoir sur la note de cadrage projet.' but the href points to '/gestion-de-projet/la-revue-de-projet' — a completely different article (project review vs. project scoping note). This is a mismatched link that sends users to the wrong content.
- **brand** @ Blog hero — author avatar : The author is labelled 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', suggesting this is the wrong person's photo (likely another author). Author name and photo are mismatched.

### `blog/le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation`
- **functional** @ Blog body — internal link 'Portfolio project management le top 10…' : The href is '/gestion-de-projet/portfolio-project-management-le-top-10-des-bonnes-pratiques' (no locale prefix), which will 404 in the new Next.js routing where all French pages live under '/fr/…'. Needs '/fr/blog/…' or the correct routed path.
- **content** @ Blog body — 'reccomande' typo : The word 'reccomande' (double-c) is a visible spelling error in the French body copy ('on vous reccomande de jetter un clic'). 'Jetter' is also misspelled (should be 'jeter'), making two typos in one sentence that undermine brand credibility.
- **structure** @ Blog body — heading hierarchy : The article body jumps directly from H1 (page title) to H3 for all section headings ('Cinq niveaux de maturité…', 'Les arguments contre…', etc.), skipping H2 entirely. This breaks document outline semantics and harms SEO/accessibility.

### `blog/le-guide-du-mode-projet`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This will appear as an error to any reader and signals a placeholder or data-mapping bug in the date field.
- **content** @ Blog hero — author avatar : The author is displayed as 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', strongly suggesting the photo belongs to a different person (likely 'BR' initials). The name and photo are mismatched.
- **functional** @ Blog body — internal link on 'chef de projet' : The link on 'chef de projet' points to 'https://www.airsaas.io/gestion-de-projet/comment-etre-un-bon-chef-de-projet-transverse' (the old Webflow absolute URL without the /fr/ locale prefix). This will 404 or redirect incorrectly in the rebuilt site.
- **content** @ Blog body — paragraph introducing three characteristics : The sentence reads 'peut être décrit par<strong></strong>trois caractéristiques principales' — there is an empty <strong> tag rendering as a visual gap/space between 'par' and 'trois', suggesting a bold word was deleted and left an empty wrapper, resulting in awkward broken formatting.

### `blog/le-modele-de-presentation-pour-votre-comite-de-pilotage`
- **content** @ Blog hero — publication date : The article shows 'Le 1 février 2026' as the publication date, which is a future date. This is almost certainly a data error (likely 2022 or 2023 based on the original article vintage), and will look wrong to any reader.
- **content** @ Blog body — author avatar : The author avatar image URL points to 'BR-min.jpg' (initials suggest a different person) but the displayed name is 'Jérôme Dard'. The image and name appear mismatched, which would confuse readers.
- **content** @ Blog body — table of contents vs article content : The table of contents has only 3 entries (Qu'est-ce qu'un comité de pilotage, Le déroulement, Nos conseils) but the article contains an H4 subsection 'Soyez l'ambassadeur de votre projet !' that has no corresponding anchor ID, and the sommaire anchor '#le-déroulement-dun-comité-de-pilotage-projet' uses French diacritics in the href which may not match the actual section id, potentially breaking in-page navigation.
- **content** @ Blog body — typo in body copy : 'mennent' should be 'mènent' ('les valeurs essentielles qui mennent au succès'). This is a visible spelling error in the main article body.
- **functional** @ CTA section — demo button : The CTA button 'Réserver une démo' is wrapped in a div with class 'opacity-0 scale-[0.92]' and no JavaScript scroll-trigger appears to be firing (the element is rendered invisible by default). If the animation script fails, the primary CTA is invisible to users.

### `blog/le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes`
- **content** @ Blog hero — publication date : The publication date reads 'Le 1 février 2026', which is a future date (over a year ahead). This is almost certainly a data entry error or a placeholder that was never corrected and will look wrong to readers.
- **functional** @ Blog body — internal link 'grand guide de la conduite de projet' : The internal link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing the '/fr/' locale prefix), which will 404 in the new Next.js routing structure where all French pages live under '/fr/'.
- **content** @ Blog body — paragraph introducing the 5 leviers : The sentence 'Découvrez icinotre sélection.' is missing a space between 'ici' and 'notre', producing 'icinotre' — a visible typo in body copy.
- **content** @ Blog body — first intro paragraph : The opening sentence renders as 'Pas de<strong></strong>bonne exécution<strong></strong>de stratégie…' — two empty bold tags create broken spacing/formatting: the intended emphasis ('bonne exécution') is lost and may render with odd whitespace.

### `blog/macro-planning`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data/CMS error and will look like a mistake to any reader visiting before that date.
- **content** @ Blog hero — author avatar : The author is labelled 'Jérôme Dard' but the avatar image URL contains 'SV-min.jpg' (initials suggesting a different person, e.g. 'Stéphane V.'). The name and photo appear mismatched.
- **content** @ Blog body — intro paragraph, first link : The link to 'conduite de projet' uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing '/fr/' prefix and domain context), which will result in a 404 in the rebuilt Next.js app.
- **content** @ Blog body — 'Comment créer un macro planning' section, step 3 : Step 3 contains a typo: 'si elles existents' — 'existents' is not a valid French word; it should be 'existent'. This is a visible spelling error in published editorial content.
- **content** @ Blog body — 'Les outils-clés' bullet list : Competitors 'Trello' and 'Asana' are named explicitly as recommended tools in the macro planning section of an AirSaas blog post, without any mention of AirSaas as an alternative. This directly undermines the brand's conversion purpose for this content.
- **content** @ Blog body — 'Macro planning et micro planning' section, final sentence : 'La macro planning et le micro planning du projet dont donc deux outils…' — 'dont' should be 'sont' (conjugation error), and 'La macro planning' uses incorrect gendered article ('Le macro planning' is used correctly elsewhere). This is a grammatical error visible to all French readers.

### `blog/les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet`
- **content** @ Blog body — section 5 heading : The H3 for section '5 -' is truncated mid-sentence in the rendered HTML (ends after '5 - ' with only a newline and a truncation comment). Even accounting for the HTML truncation, the anchor in the table of contents reads '5 - Ne pas découper les projets "obèses" en projets digestes' but the heading content in the body appears missing/empty at render time.
- **functional** @ Blog body — internal link in intro paragraph : The link to '/gestion-de-projet/portfolio-project-management-le-top-10-des-bonnes-pratiques' uses a relative path without the '/fr/' locale prefix, which will 404 on the localised Next.js route structure used throughout the rest of the page.
- **structure** @ Sommaire (table of contents) — anchor #6 : The anchor href for item 6 ends with 'jira, monday, asana' but the rendered H3 heading text has a stray opening quote mark ('trop gros"') with no matching closing quote, making the heading copy look malformed to readers.

### `blog/lean-portfolio-management`
- **content** @ Aside / À retenir callout — SAFe quote : The DSI quote is truncated mid-sentence: 'Tu peux organiser en SAFE un département... mais toute l'entreprise sur du vertical,' — it ends abruptly with a comma, leaving the thought incomplete and confusing for readers.
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date relative to any plausible publish date, suggesting a data entry error or a year copy-paste bug.
- **functional** @ Blog body — internal link 'The machine that changed the world' : The anchor linking to the book reference uses href='#', a dead placeholder link, which will confuse users who click it expecting a real external reference or resource.
- **structure** @ Blog body — heading hierarchy : The blog article body starts directly with H3 elements ('Les 3 problèmes…', 'L'approche Lean agile', etc.) with no H2 wrapping them. The page H1 is in the hero, but the body content skips H2 entirely, breaking the logical heading hierarchy and harming accessibility/SEO.

### `blog/management-de-portefeuille-de-projet`
- **content** @ Hero / Publication date : The publication date 'Le 17 septembre 2025' is in the future, which will appear erroneous or fabricated to readers on any date before that.
- **content** @ Blog body — 'Ce que la gestion de portefeuille de projets permet' : The phrase 'Ce que la gestion de portefeuille de projets permet' is wrapped in a plain <p> tag rather than a heading or bold label. It reads as an orphaned section title that lost its semantic markup, creating a confusing paragraph with no real sentence content.
- **layout** @ Capacity table — first column header : The first <th> in the capacity comparison table is completely empty (no label), leaving a blank primary-colored header cell that looks like a rendering bug and provides no context for the row labels in that column.
- **typography** @ All data tables — thead <th> elements : Table headers use class 'text-paragraph' which resolves to a dark foreground color, while the cell background is 'bg-primary' (dark lavender). This likely produces very low-contrast or invisible text in the table headers.

### `blog/pi-safe`
- **functional** @ CTA button after 'Les avantages d'un bon PI Planning' list : The button is labelled 'Télécharger' (Download) but links to /fr/meetings-pages — the label doesn't match the destination (a demo/meetings page), and there is no downloadable asset implied by the surrounding content.
- **content** @ Blog post date, hero section : The publication date is 'Le 1 février 2026', which is a future date. This is likely a data entry error and will look wrong to users reading the article today.
- **structure** @ Blog body content section : The article body jumps directly from the intro paragraphs to an H3 ('Qu'appelle-t-on PI SAFe ?') with no H2 level in the hierarchy. The page H1 exists in the hero, but the body content uses H3/H4 only, skipping H2, creating an illogical heading hierarchy.

### `blog/metier-pmo`
- **content** @ Blockquote — L'explosion du nombre de projets transverses : The blockquote attributing the quote to 'Bertran Ruiz, CEO AirSaas' contains a likely misspelling of the CEO's first name: the correct spelling is 'Bertrand Ruiz' (with a 'd'). This appears twice in the article and would look unprofessional to anyone who knows the brand.
- **structure** @ Blog body — 'La posture' and 'Ses méthodologies' and 'Les outils et ressources clés' and 'Gestion de projet' : Several H4 headings appear back-to-back with no intervening content ('La posture' immediately followed by 'Leadership', 'Ses méthodologies' immediately followed by 'Optimiser le best effort', 'Les outils et ressources clés' immediately followed by 'Gestion de projet'). These look like section titles whose own paragraph body was lost, resulting in empty stub sub-sections that will confuse readers.
- **content** @ Blog body — 'Gestion de portefeuille' paragraph : The paragraph under 'Gestion de portefeuille' is visibly truncated mid-sentence: '…L'automatisation alimente les outils projet individuels vers des' — the sentence ends without a completing phrase. This is a broken content cut-off that is user-visible.

### `blog/pi-planning`
- **functional** @ Internal link in body — 'nos 8 essentiels pour réussir votre PI SAFe' : The link points to /fr/gestion-de-projet/pi-safe but the rebuild uses a /fr/blog/ URL structure; this internal link likely 404s in the rebuild environment and needs to be updated to match the new routing.
- **structure** @ Blog body heading hierarchy : The blog article body uses H3 as the first content-level heading directly under H1, then H4 as sub-sections — H2 is skipped entirely in the article body (only used for 'Sommaire'). This creates an illogical hierarchy (H1 → H3 → H4) that is not a deliberate downshift pattern.

### `blog/pilotage-de-projet`
- **content** @ Article body — internal link : The link to 'conduite de projet' uses a relative path without the /fr/ locale prefix: href="/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet". This will 404 on the rebuild which uses /fr/ prefixed routes.
- **content** @ Article body — PPM section links : Two links inside the PPM paragraph point to absolute airsaas.io URLs without the /fr/ prefix (e.g. href="https://www.airsaas.io/gestion-de-projet/tout-savoir-sur-la-note-de-cadrage-projet") which are likely dead redirects and break the rebuild's internal routing strategy.
- **content** @ Hero — publication date : The article is dated "Le 1 février 2026" which is a future date. This is almost certainly a data entry error (should be 2022 or 2023 based on content context) and will look wrong to readers.
- **content** @ Article body — editor note paragraph : A meta editorial aside reading "(Note du rédacteur : Je vous propose de relire la phrase ci-dessus une seconde fois ! :-)" is rendered as standard body copy visible to end users. This is internal editorial scaffolding that should not appear in the published article.

### `blog/plan-capacitaire`
- **content** @ Hero section – publication date : The article is dated 'Le 1 février 2026', which is a future date. This will appear wrong to any reader and undermines credibility; it is almost certainly a data entry or migration error.
- **functional** @ Blog body – internal link anchor : The link 'Pour creuser la définition du plan capacitaire' points to 'https://www.airsaas.io/fr/gestion-de-projet/capacity-planning-definition' (absolute URL to the live site) rather than the relative rebuilt route. This will silently redirect readers out of the rebuild environment and may break in production if the URL structure changes.
- **structure** @ Blog body – heading hierarchy : The sub-section 'Comment aider les équipes à calculer le temps de run et de build ?' is marked as H4, but it sits at the same logical level as the numbered step headings (Étape 2, Étape 3…), which are also H4. This creates a flat, ambiguous hierarchy where a tip sub-section appears equal in rank to a major step.
- **content** @ Blog body – truncated content : The HTML is cut off mid-sentence inside a <stron> tag (unclosed <strong>) at the end of the visible markup. If this truncation reflects the actual rendered page and not just the review snippet, the article body is incomplete and ends abruptly, which is a blocking content issue.

### `blog/plan-de-communication-projet`
- **content** @ Blog hero — publication date : The article is dated '1 février 2026', which is a future date. This will look incorrect to any reader and signals a data/migration error in the date field.
- **functional** @ Blog body — internal link (conduite de projet) : The link to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' uses a relative path without the '/fr/' locale prefix, which will 404 in the new Next.js routing structure.
- **functional** @ Blog body — internal link (note de cadrage) : The link 'https://www.airsaas.io/gestion-de-projet/tout-savoir-sur-la-note-de-cadrage-projet' is an absolute URL pointing to the live production domain (without locale prefix), bypassing the rebuild and likely 404ing on the production path.
- **content** @ Blog body — paragraph ('Sui dit quoi') : Typo 'Sui dit quoi' should be 'Qui dit quoi' — this is a visible spelling error in a key methodological explanation that would undermine credibility.

### `blog/planification-de-la-capacite`
- **content** @ Inline CTA button after 'Créer un momentum pour encourager la collaboration inter-équipes' : The CTA button reads 'Télécharger' but links to '/fr/meetings-pages' (a demo/meetings page). The label doesn't match the destination or the surrounding context about collaborative planning methods — it looks like a placeholder label was never updated.
- **content** @ Blog article body — bullet list under 'Une brève définition de la planification de la capacité' : The list of resource types is truncated: only 'Les ressources financières' and 'Les ressources humaines' appear, but the original article includes at least a third type (material/physical resources). The paragraph that follows ('C'est souvent ce dernier point…') refers to 'ce dernier point' which implies at least three items — with only two items the reference is still technically valid but the content feels incomplete/cut.
- **functional** @ Blog article body — internal link 'notre article précédent' : The link to 'http://www.airsaas.io/fr/gestion-de-projet/plan-capacitaire' uses an absolute URL pointing to the live domain with http (not https) and an old URL structure (/gestion-de-projet/). In the rebuild, this should reference the equivalent rebuilt blog URL and use https to avoid mixed-content warnings.

### `blog/planification-de-la-demande-capacity-planning`
- **content** @ CTA button after culture-capacity-planning image : The button label is 'Télécharger' (download) but it links to '/fr/meetings-pages' (demo booking page). The label does not match the destination — users expecting a downloadable asset will be confused.
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data entry error and will appear incorrect to any reader.
- **functional** @ CTA section — 'Réserver une démo' button : The CTA button wrapper has class 'opacity-0 scale-[0.92]' with no visible trigger to animate it in (no JS intersection observer or active class applied in the static HTML). The button will render invisible on load for users with JS disabled or if the animation script fails.
- **functional** @ Blog body — internal link to Capacity Planning article : The link to the Capacity Planning article points to 'https://www.airsaas.io/fr/gestion-de-projet/capacity-planning-definition' (absolute live domain), not a relative rebuild URL. In the rebuilt environment this will send users off-site to production, bypassing the rebuild entirely.

### `blog/portefeuille-projet`
- **content** @ Hero section — publication date : The article is dated 'Le 17 septembre 2025', a future date that appears to be a placeholder or scheduling error; it will read as incorrect to any user visiting before that date.
- **structure** @ Blog body — first content section : The text 'Ce que la gestion de portefeuille de projets permet' is rendered as a plain <p> tag immediately before a bullet list, but functions semantically as a section sub-heading; it reads as truncated orphan copy rather than structured content.
- **functional** @ Page URL / routing : The rebuild serves this article at /fr/blog/portefeuille-projet while the live canonical URL is /fr/gestion-de-projet/portefeuille-projet; internal links and SEO canonicals pointing to the live path will 404 or mis-route on the rebuild.

### `blog/pourquoi-vos-18-millions`
- **content** @ Article publication date : 'Le 1 février 2026' is a future date relative to any plausible publish date in 2024–2025; this is likely a data entry error and will appear incorrect to readers.
- **structure** @ Blog body — first section heading : The first content section after the hero uses an H3 ('Pourquoi vos 18 millions…') rather than an H2, meaning the document outline jumps from H1 (page title) directly to H3 with no H2 intermediary — illogical heading hierarchy for a long-form article.
- **content** @ H1 hero title vs URL slug : The H1 reads 'Pourquoi vos millions de transformation s'évaporent : le vrai pouvoir est dans le tempo' while the URL slug and image alt reference '18 millions' specifically. The H1 has lost the '18' which is central to the article's hook and SEO relevance.

### `blog/preparer-comite-de-pilotage-d-un-projet`
- **functional** @ Blog body — internal link (first paragraph) : The link to the series article uses a relative path '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' (no locale prefix '/fr/'), which will 404 on the rebuilt Next.js site. All other internal links in the body use absolute airsaas.io URLs or correct relative paths.
- **structure** @ Blog body — heading hierarchy : The article body jumps directly from H1 (page title in hero) to H3 for the first major section heading ('Identifier et déterminer les objectifs…'), skipping H2 entirely. H4s are then used as sub-headings under H3, which is correct, but the missing H2 level breaks document outline and SEO heading hierarchy.
- **content** @ Blog body — H4 'Planifier le Copil longtemps à l'avance' : This H4 heading is immediately followed by an image block and then the next H4 ('S'assurer de la présence de toutes les parties prenantes') with no body copy between them. The section appears to be missing its paragraph content — the heading introduces a topic but provides zero explanatory text.

### `blog/program-increment-planning`
- **functional** @ Internal link in body — 'nos 8 essentiels pour réussir votre PI SAFe' : The href points to '/fr/gestion-de-projet/pi-safe' which is a live-site URL path. In the rebuild the blog is served under '/fr/blog/', so this internal link likely results in a 404 in the rebuild environment.
- **structure** @ Blog article heading hierarchy : The table of contents section uses an H2 ('Sommaire') followed immediately by the article body starting with H3 sections. There is no H2 wrapping the main article content, creating an illogical hierarchy where H3s are direct children of the page without a parent H2 between the ToC and the body.

### `blog/project-portfolio-management`
- **functional** @ Blog body — internal link after section 2 : The link to the related article uses a relative path '/gestion-de-projet/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets' which is missing the '/fr/' locale prefix, making it a broken/wrong-locale URL in the French rebuild.
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This appears to be a placeholder or data mapping error — the live article was published in 2023.
- **content** @ Blog body — section 1 intro paragraph : The paragraph reads 'Le programme ERP, SI Finance, ERP ne fera jamais rêver !' — 'ERP' is repeated twice in the same sentence, which reads as a copy-paste error or truncated edit.

### `blog/reporting-pmo`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This is almost certainly a data-entry error (should likely be 2024 or earlier) and will look wrong to any reader.
- **content** @ Question 5 — Paracelse attribution : Paracelse is described as a 'médecin et alchimiste Russe' but Paracelsus was Swiss-German, not Russian. This is a factual error visible to any informed reader.
- **structure** @ Blog body — heading hierarchy : The article's first content heading is an H3 ('Qu'est-ce qu'un reporting projet…') with no H2 parent inside the article body. The Sommaire section uses an H2 for 'Sommaire', but the body content jumps directly to H3, creating a broken heading hierarchy for screen readers and SEO.
- **content** @ Section 'Quatre exemples de vues' — intro paragraph : 'L'importance du design n'est plus à démonter' — 'démonter' (to dismantle) should be 'démontrer' (to demonstrate). This is a French typo that will look unprofessional.
- **content** @ Section 'Quatre exemples de vues' — intro paragraph : 'pour faciliter la collecter' is grammatically incorrect French; 'collecter' is a verb used as a noun. Should be 'la collecte'.

### `blog/retour-sur-agile-en-seine-2023`
- **content** @ Blog body intro paragraph : Missing space before 'pour' in 'Agile en Seine</a>pour l'organisation' — the anchor tag closes without a trailing space, causing the words to run together visually: '…Seine]pour l'organisation'.
- **content** @ Blog body — RATP section : A paragraph contains only a zero-width non-joiner character ('‍') rendered as visible whitespace/empty paragraph. This is a Webflow CMS artefact that should be removed — it creates an unexplained blank gap in the article flow.
- **content** @ Blog body — PMU section (after first PMU image) : Same zero-width non-joiner ('‍') artefact paragraph appears again directly after the PMU hero image, producing another unexplained blank line gap in the article.
- **content** @ Blog body — PMU section, quote paragraph : Unclosed quotation: '" En rapprochant les gens ....on va voir que naturellement tous les problèmes vont se simplifier....quand il y a par exemple des problèmes de dépendances ça marche mieux parce que les gens se parlent !' — the opening quote mark has no closing quote mark, making the citation visually broken.
- **content** @ Blog body — PMU section, recruitment paragraph : Typo 'd'ête' should be 'd'être' ('au delà d'ête un bon développeur'). This is a spelling error in a user-facing article that undermines brand professionalism.

### `blog/role-du-pmo`
- **content** @ Hero – publication date : The article is dated 'Le 1 février 2026', which is a future date (over a year ahead). This will appear as a credibility/data error to any reader and suggests a copy-paste or formatting bug in the date field.
- **functional** @ Blog body – internal link 'reporting' : The link to reporting points to 'https://www.airsaas.io/fr/gestion-de-projet/reporting-pmo' using an absolute production URL with full domain instead of a relative path, meaning it bypasses the rebuild environment and could break staging/preview link-consistency checks and hreflang routing.
- **functional** @ Blog body – internal link 'chefs de projet' : Same issue: the anchor linking to 'chef-de-projet-pmo' uses the absolute production URL 'https://www.airsaas.io/…' instead of a relative path, inconsistent with all other internal links on the page.

### `blog/tout-savoir-sur-la-note-de-cadrage-projet`
- **content** @ Blog hero — publication date : The article is dated 'Le 1 février 2026', which is a future date. This will appear as an error to readers and harm credibility; it is almost certainly a data entry mistake (should likely be 2022 or 2024).
- **brand** @ Blog body — internal link (conduite de projet) : The link to 'conduite de projet' points to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (no locale prefix), while the rest of the site uses '/fr/...' paths. This will likely result in a 404 or redirect loop.
- **content** @ Blog body — 'Description du projet et des livrables inclus' paragraph : The word 'quantité' is duplicated back-to-back ('la quantité, la quantité') in the same sentence, which reads as a copy-paste error and is confusing to the reader.
- **functional** @ Blog body — external links (budget, analyse des risques, macro-planning) : Several internal links are hardcoded with the full domain 'https://www.airsaas.io/gestion-de-projet/...' (no locale prefix /fr/) instead of relative '/fr/...' paths, risking 404s or bypassing the locale routing of the rebuild.

### `blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets`
- **content** @ Blog hero — publication date : The article is dated "Le 1 février 2026", which is a future date. The original article was published in 2022; this appears to be a data-mapping or CMS error producing an implausible date.
- **content** @ Intro paragraph — Gartner quote : The text reads "l'institut d'études</strong>Gartner" with no space between the closing tag and "Gartner", causing the rendered sentence to read "l'institut d'étudesGartner" — a word-boundary bug visible to readers.
- **content** @ Figcaption under KISS image : The figcaption reads "L'un des meilleurs conseils produigué :-)" — 'produigué' is not a French word (likely a typo for 'prodigué'). This is a visible spelling error in published content.
- **structure** @ Blog body — heading hierarchy : The article body opens directly with an H3 ("PPM : trois innovations qui font la différence") then uses H4 sub-sections, but there is no H2 anywhere in the article body. This skips a heading level, creating an illogical hierarchy (H1 in hero → H3 body) that harms both accessibility and SEO.
- **brand** @ Figcaption under hub image : The figcaption writes "Airsaas" (lowercase 's') instead of the correct brand name "AirSaas". Brand name capitalisation must be consistent across all published content.

## All pages

| Slug | Type | Status | P0 | P1 | P2 | Note |
|---|---|---|---|---|---|---|
| `pi-planning` | blog | BLOCK | 5 | 2 | 1 |  |
| `program-increment-planning` | blog | BLOCK | 5 | 2 | 1 |  |
| `la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0` | blog | BLOCK | 3 | 3 | 2 |  |
| `pi-safe` | blog | BLOCK | 3 | 3 | 1 |  |
| `pourquoi-vos-18-millions` | blog | BLOCK | 3 | 3 | 2 |  |
| `tableau-de-bord-dsi` | solution | BLOCK | 2 | 5 | 1 |  |
| `capacity-planning` | produit | BLOCK | 2 | 4 | 2 |  |
| `flash-report` | solution | BLOCK | 2 | 4 | 2 |  |
| `gestion-portefeuille-projet` | solution | BLOCK | 2 | 4 | 2 |  |
| `outils-de-pilotage-projet` | solution | BLOCK | 2 | 4 | 2 |  |
| `portfolio-management` | solution | BLOCK | 2 | 4 | 2 |  |
| `comment-decider-en-copil` | blog | BLOCK | 2 | 4 | 2 |  |
| `automatiser-la-com-projet` | produit | BLOCK | 2 | 3 | 2 |  |
| `comite-direction` | equipe | BLOCK | 2 | 3 | 2 |  |
| `budgetiser-un-projet-sans-se-louper` | blog | BLOCK | 2 | 3 | 1 |  |
| `gestion-de-portefeuille-projet-pme` | blog | BLOCK | 2 | 3 | 1 |  |
| `cadrage-projet` | blog | BLOCK | 2 | 2 | 1 |  |
| `outil-ppm` | solution | BLOCK | 1 | 5 | 2 |  |
| `tableau-de-bord-gestion-de-projet` | solution | BLOCK | 1 | 5 | 2 |  |
| `retour-sur-agile-en-seine-2023` | blog | BLOCK | 1 | 5 | 2 |  |
| `trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets` | blog | BLOCK | 1 | 5 | 2 |  |
| `ppm` | lp | BLOCK | 1 | 4 | 3 |  |
| `capacity-planning` | lp | BLOCK | 1 | 4 | 3 |  |
| `traduction-one-click-avec-deepl` | produit | BLOCK | 1 | 4 | 3 |  |
| `outil-pmo` | equipe | BLOCK | 1 | 4 | 3 |  |
| `capacity-planning-definition` | blog | BLOCK | 1 | 4 | 3 |  |
| `comite-de-pilotage-definitions-et-incomprehensions` | blog | BLOCK | 1 | 4 | 3 |  |
| `comite-pilotage-projet` | blog | BLOCK | 1 | 4 | 3 |  |
| `comment-animer-un-comite-de-pilotage` | blog | BLOCK | 1 | 4 | 3 |  |
| `comment-faire-un-bon-point-davancement-projet` | blog | BLOCK | 1 | 4 | 3 |  |
| `comment-reussir-un-projet-transverse` | blog | BLOCK | 1 | 4 | 3 |  |
| `gestion-portefeuille-projets-vs-gestion-de-projet` | blog | BLOCK | 1 | 4 | 1 |  |
| `management-de-portefeuille-de-projet` | blog | BLOCK | 1 | 4 | 0 |  |
| `pilotage-de-projet` | blog | BLOCK | 1 | 4 | 3 |  |
| `it-et-operation` | equipe | BLOCK | 1 | 3 | 3 |  |
| `le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation` | blog | BLOCK | 1 | 3 | 3 |  |
| `les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet` | blog | BLOCK | 1 | 3 | 3 |  |
| `planification-de-la-capacite` | blog | BLOCK | 1 | 3 | 4 |  |
| `portefeuille-projet` | blog | BLOCK | 1 | 3 | 1 |  |
| `preparer-comite-de-pilotage-d-un-projet` | blog | BLOCK | 1 | 3 | 3 |  |
| `macro-planning` | blog | WARN | 0 | 6 | 2 |  |
| `priorisation-par-equipes` | produit | WARN | 0 | 5 | 3 |  |
| `airsaas-et-les-experts-de-la-transfo` | solution | WARN | 0 | 5 | 3 |  |
| `flash-report-projet` | solution | WARN | 0 | 5 | 3 |  |
| `management-de-portefeuille-projet` | solution | WARN | 0 | 5 | 3 |  |
| `tableau-de-bord-portefeuille-de-projet` | solution | WARN | 0 | 5 | 3 |  |
| `analyse-des-risques-projet` | blog | WARN | 0 | 5 | 3 |  |
| `budget-previsionnel-projet` | blog | WARN | 0 | 5 | 3 |  |
| `comment-mettre-en-place-un-comite-de-pilotage` | blog | WARN | 0 | 5 | 3 |  |
| `jalon-projet` | blog | WARN | 0 | 5 | 3 |  |
| `la-revue-de-projet` | blog | WARN | 0 | 5 | 3 |  |
| `le-modele-de-presentation-pour-votre-comite-de-pilotage` | blog | WARN | 0 | 5 | 3 |  |
| `reporting-pmo` | blog | WARN | 0 | 5 | 3 |  |
| `pmo` | lp | WARN | 0 | 4 | 3 |  |
| `budget` | produit | WARN | 0 | 4 | 4 |  |
| `reporting-projet` | produit | WARN | 0 | 4 | 4 |  |
| `revue-de-portefeuille` | solution | WARN | 0 | 4 | 4 |  |
| `10-pratiques-pour-developper-la-relation-de-confiance-dg-cio` | blog | WARN | 0 | 4 | 4 |  |
| `appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management` | blog | WARN | 0 | 4 | 4 |  |
| `capacity-planning` | blog | WARN | 0 | 4 | 4 |  |
| `chef-de-projet-pmo` | blog | WARN | 0 | 4 | 3 |  |
| `chef-de-projet-transverse` | blog | WARN | 0 | 4 | 3 |  |
| `comment-elaborer-un-reporting-efficace` | blog | WARN | 0 | 4 | 4 |  |
| `comment-gerer-lagressivite-dans-les-comites-de-pilotage` | blog | WARN | 0 | 4 | 4 |  |
| `comment-mettre-en-place-un-pmo` | blog | WARN | 0 | 4 | 4 |  |
| `fiche-projet-exemple-et-methodologie` | blog | WARN | 0 | 4 | 4 |  |
| `kanban-gestion-de-projet` | blog | WARN | 0 | 4 | 3 |  |
| `kpi-gestion-de-projet` | blog | WARN | 0 | 4 | 4 |  |
| `le-diagramme-de-gantt-comment-sen-servir` | blog | WARN | 0 | 4 | 4 |  |
| `le-grand-guide-de-la-conduite-de-projet` | blog | WARN | 0 | 4 | 3 |  |
| `le-guide-du-mode-projet` | blog | WARN | 0 | 4 | 4 |  |
| `le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes` | blog | WARN | 0 | 4 | 4 |  |
| `lean-portfolio-management` | blog | WARN | 0 | 4 | 4 |  |
| `plan-capacitaire` | blog | WARN | 0 | 4 | 3 |  |
| `plan-de-communication-projet` | blog | WARN | 0 | 4 | 4 |  |
| `planification-de-la-demande-capacity-planning` | blog | WARN | 0 | 4 | 3 |  |
| `tout-savoir-sur-la-note-de-cadrage-projet` | blog | WARN | 0 | 4 | 3 |  |
| `comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022` | blog | WARN | 0 | 3 | 4 |  |
| `comment-mettre-une-bonne-meteo-projet` | blog | WARN | 0 | 3 | 4 |  |
| `copil-projet-ou-comite-de-pilotage-projet-les-bases` | blog | WARN | 0 | 3 | 4 |  |
| `demarche-de-projet` | blog | WARN | 0 | 3 | 5 |  |
| `metier-pmo` | blog | WARN | 0 | 3 | 5 |  |
| `project-portfolio-management` | blog | WARN | 0 | 3 | 5 |  |
| `role-du-pmo` | blog | WARN | 0 | 3 | 5 |  |
| `pi-planning` | lp | PASS | 0 | 0 | 0 | parse: invalid JSON: Expected ',' or '}' after property value in JSON at position 870 (line 18 column 39) |
| `direction-de-la-transformation` | equipe | PASS | 0 | 0 | 0 | parse: invalid JSON: Expected ',' or '}' after property value in JSON at position 712 (line 13 column 42) |
| `comment-animer-un-bilan-projet-efficace` | blog | PASS | 0 | 0 | 0 | parse: invalid JSON: Expected ',' or '}' after property value in JSON at position 2127 (line 37 column 50) |
| `pourquoi-mettre-en-place-un-pmo` | blog | ERR | — | — | — | LLM fail: fetch failed |
