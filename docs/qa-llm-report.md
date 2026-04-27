# QA report — LLM (qa-llm.mjs)

**Date** : 2026-04-27T14:25:54.763Z
**Model** : claude-sonnet-4-6

**Total** : 88 pages — **5 PASS** / 57 WARN / 26 BLOCK / 0 ERR

**Severity totals** : P0 = 39, P1 = 309, P2 = 264

## P0 issues — must fix before ship

### `produit/automatiser-la-com-projet`

- **content @ "Vous n'entendrez bientôt plus ces phrases ..." section** : The section title promises a list of recurring complaints/phrases users won't hear anymore, but the body contains zero such phrases — instead it repeats the sponsor onboarding description. The entire pain-point content block is missing.
- **content @ Feature sections ("Vous n'entendrez bientôt plus ces phrases" and split section)** : The heading 'Ajoutez les sponsors sur vos projets' and its body copy appear verbatim twice back-to-back — once in the centered section and once in the left/right split section. This is clear content duplication suggesting the rest of the feature list was never rendered.

### `produit/capacity-planning`

- **content @ Section 'Mise en place rapide, simple à maintenir dans le temps'** : The section body is visibly truncated: it reads 'nous avons pris le parti suivant :' and then immediately 'Voici comment nous le concrétisons.' with no actual content between the two sentences. The key value proposition (the parti pris) is missing entirely.
- **content @ Section 'Une vue simple et actionnable'** : The paragraph ends with 'pour prendre les décisions :' followed by two non-breaking-space placeholder paragraphs (‍‍) and nothing else. The actual list of decisions is absent — the section is effectively empty.

### `produit/traduction-one-click-avec-deepl`

- **content @ Section 2 h2 / 'Le rapport flash désormais enmultilingue'** : The H2 heading reads 'enmultilingue' (no space) — a word-break bug that renders as a single unrecognised word on screen. This is distinct from the Webflow source quirk allowance because it appears in a rendered heading, not inside a <strong> tag.

### `solution/flash-report`

- **content @ Section 'Plus qu'une solution de reporting flash'** : The paragraph reads 'En du flash report automatisé, les autres fonctionnalités AirSaas…' — the sentence is grammatically broken and truncated mid-thought. The word 'En' is followed by nothing meaningful, making the copy unintelligible to users.

### `solution/gestion-portefeuille-projet`

- **content @ Section 'Avancez plus sereinement avec votre équipe'** : This section contains only an H2 heading with no body content, features, cards, or supporting copy. It renders as a completely empty section visible to users, suggesting the content block failed to render.
- **content @ Section 'Rapide historique des outils de gestion de portefeuille de projets'** : This H2 section heading has no body content beneath it — the historical context paragraph appears in a separate orphaned section that follows but has no heading association, breaking the narrative and leaving this section visually empty.

### `solution/management-de-portefeuille-projet`

- **content @ Feature section — 'Une planification stratégique simplifiée grâce à votre vue macro'** : This section reuses the same image (Portfolio project timeline view.webp) as the 'La vue timeline' section further down. The macro/dashboard feature block should show a portfolio dashboard screenshot, not the timeline Gantt view — the wrong image is being displayed.

### `solution/outils-de-pilotage-projet`

- **structure @ Second section after hero — 'Valorisez le travail de votre équipe'** : This section contains only an H2 heading with no body copy, image, list, or CTA. It is a stub/empty section that renders as a lone heading with large vertical padding, which looks broken to any visitor.
- **structure @ Section with bullet list — 'Respecter les objectifs de chaque équipe…'** : This section renders a bullet list with no heading or introductory sentence to contextualise it. The first bullet also contains a missing space: 'Respecter lesobjectifs' (word boundary missing between 'les' and 'objectifs'). The orphaned list with no heading makes the content structure incomprehensible.

### `solution/portfolio-management`

- **content @ Section 'Un capacity planning par équipe simple et actionnable'** : The section body is truncated mid-sentence: 'Grâce à cette vue vous avez les bases d'une discussion pragmatique pour prendre les décisions :' ends with a colon followed only by two Webflow zero-width-space paragraphs (‍). The promised list/content never appears, leaving users with an incomplete, broken section.

### `equipe/comite-direction`

- **structure @ Page URL: /fr/equipes/comite-direction — URL path vs. page content** : The URL slug is '/equipes/comite-direction' (teams/executive committee) but the page is a product landing page for CODIR governance, not an 'équipe' (team/about) page. This creates a structural mismatch — the URL implies a company team/people page, but the content is a product solution page, which would confuse users and harm SEO.

### `equipe/it-et-operation`

- **functional @ Hero CTA button** : The primary CTA 'Réservez une démo' links to '/fr/meetings-pages' which appears to be an internal page route, but the nav 'Demander une démo' button also links to the same '/fr/meetings-pages'. If this route is a stub or not yet built, the main conversion CTA is broken.

### `equipe/outil-pmo`

- **structure @ H1 — hero section** : The H1 text reads 'L'outil PPMpour un PMO moderne' — there is a missing space between 'PPM' and 'pour', making it render as 'PPMpour' on the page.

### `blog/budgetiser-un-projet-sans-se-louper`

- **content @ Section 'Retour d'expérience du CIO d'Adeo' — aside callout** : The callout box contains raw unfilled CMS template instructions verbatim: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This placeholder text is fully visible to end users and must be replaced with real content.

### `blog/cadrage-projet`

- **content @ Aside callout boxes (×2) — 'Cadrage : l'importance d'un autre rapport au temps' section** : Two 'À retenir' callout boxes contain raw Webflow CMS placeholder text: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This is an unfilled template stub, visible to all users.

### `blog/comite-de-pilotage-definitions-et-incomprehensions`

- **content @ "À retenir" callout boxes (×3 occurrences in blog body)** : All three 'À retenir' aside boxes display raw CMS template instructions verbatim: "Speaker avatar: insert the link to the speaker page between: href=\"https://LINK_SPEAKER_PAGE\"…". This is unfilled placeholder content visible to every reader and must be replaced with actual key takeaways before shipping.

### `blog/comment-decider-en-copil`

- **content @ Aside callout — first 'À retenir' block (under Lionel M. quote)** : The quote attributed to Lionel M. is truncated mid-sentence: '…on fait' — the rest of the text is missing. A reader sees an incomplete thought inside a highlighted callout block, which looks like a critical content bug.
- **content @ Aside callout — 'À retenir' block (OCTO Tech section)** : The OCTO Tech quote is truncated mid-sentence: '…mais nous' — the rest of the text is cut off. Same pattern as above; the callout component is not rendering or receiving the full content.

### `blog/gestion-de-portefeuille-projet-pme`

- **content @ Aside callout boxes 'À retenir' (multiple instances in article body)** : All 'À retenir' callout boxes contain unformatted template placeholder text ('Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE"…') instead of actual editorial content. This stub content appears at least 3 times in the visible portion of the article and is fully user-visible.

### `blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0`

- **content @ Section 'La supply chain débute avec les fournisseurs' — À retenir callout** : The pull-quote is visibly truncated mid-word: '…pour résoudre leurs pro'. The source content was not fully rendered into the callout component, leaving an incomplete sentence displayed to users.
- **content @ Section 'Le défi de construire sa propre chaîne de production' — À retenir callout** : The pull-quote is truncated mid-word: '…car des bancs te'. Same rendering failure as the first callout; source quote was not fully populated.
- **content @ Section '30 ans pour optimiser la supply chain' — À retenir callout** : The pull-quote ends abruptly: '…notamment grâce à l'arrivée de l'automatisation' with no closing punctuation or conclusion, indicating truncation of the source quote.

### `blog/le-diagramme-de-gantt-comment-sen-servir`

- **layout @ CTA section – animated floating card** : The CTA button wrapper has 'opacity-0 scale-[0.92]' with no JS-triggered class change visible in the static HTML, meaning the 'Réserver une démo' CTA button renders invisible (opacity-0) on page load. Users cannot see or click the primary conversion CTA.

### `blog/management-de-portefeuille-de-projet`

- **content @ Blog hero — author avatar/name mismatch** : The author avatar image URL contains 'Avatar%20Je%CC%81ro%CC%82me' (i.e., Jérôme) but the displayed name is 'Jonas Roman'. The image and the name do not match the same person, which is a factual error visible to every reader.

### `blog/pi-planning`

- **content @ First 'À retenir' callout block (before H3 'Qu'est-ce qu'un PI Planning ?')** : The expert quote is visibly truncated mid-sentence: '…ils apportent aussi leurs bonnes pratiques' — the sentence has no ending punctuation and the quote body is cut off. This is user-visible incomplete content at the very top of the article body.
- **content @ Second 'À retenir' callout block (after PI Planning definition paragraph)** : Expert quote is truncated mid-word: '…c'est que les gens qui y participent sont ceux qui y mett' — sentence cuts off before completion, clearly broken copy visible to readers.

### `blog/pi-safe`

- **content @ First 'À retenir' aside (after benefits list)** : The callout text is visibly truncated mid-sentence: '…on se focalise sur pourquoi on fait ce pr' — the sentence ends abruptly, indicating a rendering/data-truncation bug in the aside component.
- **content @ Second 'À retenir' aside (after strategic vision section)** : Text is again truncated mid-sentence: '…Il peut s'agir d'une nouvelle réglementation à suivre, de projet' — the aside content is cut off and never finishes, a repeated pattern suggesting the aside component is not rendering full CMS content.
- **content @ Third 'À retenir' aside (after blocages section)** : Text truncated mid-sentence: '…et une estimation "' — sentence ends with an unclosed quotation mark. The aside rendering pipeline is systematically cutting content short across all callout boxes.

### `blog/pilotage-de-projet`

- **content @ Aside 'À retenir' blocks (multiple occurrences)** : All three 'À retenir' callout boxes contain raw Webflow CMS placeholder instructions: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This is unfinished template content visible to end users.

### `blog/portefeuille-projet`

- **content @ Blog hero — author badge** : The author avatar image (filename 'Avatar Jérôme') is mismatched with the displayed name 'Jonas Roman'. Either the image belongs to Jérôme (the real author) or 'Jonas Roman' is a placeholder name; a human reader sees the wrong person's photo next to the wrong name.

### `blog/pourquoi-vos-18-millions`

- **content @ First 'À retenir' callout box** : The bullet point copy is visibly truncated mid-sentence: '…Sauf qu'on fait 500 millions de C' — the sentence cuts off abruptly, leaving an incomplete and meaningless statement visible to users.
- **content @ Third 'À retenir' callout box (L'illusion du pilotage stratégique section)** : The quote is truncated mid-word: '…Trois semaines dans une organisation de 2 100 personnes. Chief' — the speaker's title/name is cut off, making the attribution incomplete and the callout look broken.
- **content @ Bottom of page HTML (truncated at 'Nous partageons la même stratégie, mais no')** : The page HTML is truncated mid-sentence in the last visible 'À retenir' callout, suggesting the render or SSR output is being cut off — remaining sections including the Quarter Plan and conclusion sections may be missing entirely from the rendered output.

### `blog/program-increment-planning`

- **content @ First 'À retenir' callout box (before H3 'Qu'est-ce qu'un PI Planning ?')** : The callout quote is visibly truncated mid-sentence: 'Ils apportent aussi leurs bonnes pratiques' ends without completing the thought. This appears to be a CMS rich-text rendering bug where the expert quote is cut off before its full content.
- **content @ Second 'À retenir' callout box (after PI Planning definition paragraph)** : Expert quote is cut off mid-sentence: '…c'est que les gens qui y participent sont ceux qui y mett' — the word 'mettent' and the rest of the quote are missing. This is a visible truncation bug in the rendered output.

### `blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets`

- **content @ Aside / callout block 'À retenir'** : The 'À retenir' callout contains raw Webflow CMS template placeholder text: 'Speaker avatar: insert the link to the speaker page between: href="https://LINK_SPEAKER_PAGE" Speaker avatar: change url of "background-image" to the url of the image in linkedIn e'. This is an unfilled stub that is fully visible to users.

## P1 issues by page

### `lp/pmo`
- **content** @ Vision globale du portefeuille — feature section image : The portfolio screenshot uses an English-language UI image (alt='Portfolio', filename contains 'en.png'). All other feature images are French UI screenshots. This creates a language inconsistency visible to French-speaking visitors.
- **functional** @ FAQ accordion — icon spans : All FAQ accordion toggle icons render as empty spans (Font Awesome Duotone icons with no character content). The icon glyphs are missing, leaving a blank space where the expand/collapse indicator should appear.
- **structure** @ Feature sections — heading hierarchy : All feature sections (Agent IA, Email Bilan de santé, Flash Report, etc.) use H3 headings directly under the H1, with no H2 grouping them. There is no section title introducing this feature list, so the heading hierarchy jumps from H1 to H3, which is both semantically incorrect and visually jarring — a visitor skimming headings gets no context for what these features relate to.

### `lp/capacity-planning`
- **functional** @ FAQ section — accordion icon spans : Each FAQ accordion button contains a Font Awesome icon <span> that renders as a blank/invisible character because Font Awesome 6 Duotone is not loaded (the span content is empty in the HTML). Every question row shows an empty square instead of an icon, making the UI look broken.
- **content** @ Feature sections — 'Agent IA Brief projet' and 'Agent IA Découpage projet' : Two consecutive feature sections are branded as AI agent features ('Agent IA Brief projet', 'Agent IA Découpage projet') while the rest of the page is specifically about capacity planning. These sections feel misplaced on a capacity-planning landing page and appear to be copy-pasted from a different product page without contextual adaptation.
- **structure** @ Feature sections — all H3 headings (8 sections) : There is no H2 grouping or section title introducing the feature alternating-layout sections. The page jumps directly from the trust-logo band into a series of H3-headed feature sections with no parent H2, breaking the logical heading hierarchy (H1 → H2 → H3) and leaving the feature block without a label for users or crawlers.
- **functional** @ Nav CTA — 'Demander une démo' button : The nav 'Demander une démo' button links to /fr/meetings-pages, and the hero primary CTA 'Réservez une démo' also links to /fr/meetings-pages. Both are correct individually, but the secondary hero CTA '📘 Découvrir le guide Capacity Planning' links to /fr/livre-blanc/capacity-planning — this destination should be verified to exist; if the livre-blanc page is not yet live, clicking it will produce a 404.

### `lp/ppm`
- **structure** @ Feature sections (Flash Report, Roadmap, etc.) : All feature sections use H3 headings directly after the H2 'Ils nous font confiance' trust bar, but there is no intermediate H2 grouping these feature sections together. The heading hierarchy jumps from page H1 → H2 (trust bar) → H3 (features) with no section-level H2 framing the feature showcase, making the document outline semantically broken and hard to navigate.
- **functional** @ FAQ accordion — icon spans : Each accordion button contains an empty <span> styled with Font Awesome Duotone, but no icon character or Unicode code point is provided inside it, so the icon slot renders as a blank ~2.3rem-wide invisible box. Users see a gap/empty space rather than the expand/collapse icon.
- **content** @ Hero section — secondary CTA button : The secondary CTA button uses a raw emoji '▶️' inline in the button label text. On some OS/browser combinations this renders as a colour emoji that clashes with the orange-bright button background, and the combined string '▶️ Découvrir l'outil PPM en vidéo (5 min)' is unusually long for a primary-area hero button and likely wraps or overflows on mid-range viewports.
- **content** @ Hero section — missing product screenshot / hero visual : The hero section has no product image or visual below the CTAs before the trust bar. Every feature section has an image, but the hero itself is text-only with a gradient background. For a PPM landing page this leaves the top half of the page visually empty and reduces immediate credibility — likely a missing component compared to the live page which shows a dashboard screenshot.

### `lp/pi-planning`
- **content** @ FAQ — 'Combien ça coûte ?' accordion : The answer 'Prix accessible. Parlons-en lors d'une démo.' is a non-answer that gives the user zero useful information. It reads as a placeholder that was never filled in, which erodes trust on a sales-focused landing page.
- **content** @ Section 'AirSaas : la couche business au-dessus de Jira' : This section renders as a standalone heading + one-line paragraph with no visual content, card, or image — it functions as an orphaned intro with no body. It looks like an incomplete or stub section rather than a finished page block.
- **structure** @ Feature section — 'Les objectifs PI ne disparaissent plus' : The image used (Capacity screen.webp) depicts a capacity planning screen, but the section heading and copy are about PI objective tracking. The image does not match the section's stated purpose, which is confusing and misleading.
- **functional** @ FAQ accordion — icon rendering : The icon spans inside each accordion button use Font Awesome 6 Duotone via a font-family style, but the character code is empty — no glyph is rendered. Every accordion question appears without its icon, leaving a visible blank space to the left of each question label.
- **content** @ Hero section — paragraph nested inside <p> : The subtitle paragraph contains a nested <p> tag inside a <span> inside another <p> ('On ne remplace pas Jira...' section). This is invalid HTML and causes the inner paragraph to break out of the outer one in browsers, producing unexpected spacing and rendering artifacts.

### `produit/automatiser-la-com-projet`
- **structure** @ "Vous n'entendrez bientôt plus ces phrases" section : The section contains only one feature sub-item ('Ajoutez les sponsors sur vos projets') where the live page shows multiple distinct features. The page is severely truncated and looks unfinished to any visitor.
- **content** @ "Vous n'entendrez bientôt plus ces phrases" section — paragraph : A <p> element is nested directly inside another <p> element (invalid HTML: `<p>...<span><p>Ajoutez les sponsors...</p></span></p>`), which browsers will silently break into unexpected DOM structure, potentially causing visible layout splits.
- **structure** @ Full page : There is no testimonial, social proof, or CTA section before the footer. The page jumps from two near-identical feature blocks directly to the footer, leaving the bottom of the page feeling abruptly cut off.

### `produit/priorisation-par-equipes`
- **content** @ Feature section — 'Chaque équipe définie ses prios' : The H3 heading contains a grammatical error: 'définie' should be 'définit' (third-person singular present indicative of 'définir'). This is a user-visible French grammar mistake.
- **content** @ Third feature section — 'Organisez la roadmap de façon éclairée' : The body copy contains a typo: 'porfolios' should be 'portfolios'. Visible spelling mistake in product copy.
- **structure** @ FAQ section — accordion icon spans : All three FAQ accordion buttons have an empty <span> intended to render a Font Awesome Duotone icon, but the span contains no icon character/code. The icon area will render as a blank space, making the FAQ buttons look visually broken.

### `produit/capacity-planning`
- **content** @ Section 'Les Scénarios' > subsection 'Trouvez le scénario qui fonctionne' : The rich-text body ends with two consecutive zero-width non-joiner placeholder paragraphs ('‍' twice), which will render as blank lines and look broken to a visitor. No actual supporting content follows the single introductory sentence.
- **structure** @ Section 'Sur l'échelle de temps…' : This subsection (an H3 with body copy) is placed in its own full-padding <section> element, completely disconnected from the parent 'Les Scénarios' H2 section. It appears as an orphaned section with no H2 ancestor, breaking the logical heading hierarchy for users and screen readers.
- **content** @ Hero image alt text : The hero screenshot has alt='Capacity Marketing', which is a generic internal label rather than a meaningful description of the capacity-planning view being shown. This is both an accessibility issue and a content quality issue.

### `produit/budget`
- **content** @ FAQ section — accordion icon spans : The Font Awesome icon spans inside each FAQ accordion button render as empty boxes (no visible icon character in the HTML output). The span content is blank, so users see an empty space where a visual indicator (e.g., chevron or plus) should appear.
- **structure** @ Feature sections — all H3 headings under H1 : The page jumps directly from H1 (hero) to a H2 (intro section) and then to H3 headings for all feature detail sections, with no H2 grouping those feature sections. This creates an illogical heading hierarchy (H1 → H2 → H3 with no intermediate H2 for the feature group).
- **content** @ Section 'Prenez en compte le coût humain des projets' : The body copy contains a typo: 'Suivre les budgets project' should be 'projets' (pluriel). Also 'fraicheur' is missing the accent (should be 'fraîcheur') — these are visible copy errors, not source faithfulness issues.
- **functional** @ Hero CTA button / Nav CTA button : Both the hero CTA 'Je veux une démo' and the nav 'Demander une démo' link to '/fr/meetings-pages', which appears to be an internal page slug rather than a demo booking flow. If this slug resolves to a 404 or wrong page in the rebuild, it is a blocking functional issue on every CTA on the page.

### `produit/reporting-projet`
- **content** @ FAQ section — second accordion item : The answer contains a grammar error: "avec une niveau de sécurité au top" — 'une' should be 'un' ("un niveau"). This is a user-visible typo in a prominent FAQ.
- **content** @ Section 'Prenons de la hauteur' — bullet list item 1 : The copy reads "Pas le bon niveau de d'abstraction" — there is a double apostrophe/article collision ('de d'abstraction'). Should be 'niveau d'abstraction'.
- **structure** @ Page — no image in hero section : The hero section contains only a heading, paragraph and CTA button but no product screenshot or visual. All three feature sections below include images. A missing hero visual is an obvious layout gap compared to standard product pages and the live site.

### `produit/traduction-one-click-avec-deepl`
- **content** @ Section with H3 'Animer une réunion…' (appears twice) : The H3 heading 'Animer une réunion, aligner les parties prenantes, on parle le même language !' and its paragraph body are duplicated verbatim: once as a standalone section (the fourth feature section) and again as a standalone 'callout' section just before the footer. Users see the same block repeated.
- **content** @ Section 2 body paragraph / 'Le rapport flash désormais…' : A <ul> list is nested directly inside a <p> tag, which is invalid HTML and will cause the paragraph to collapse mid-render in most browsers, potentially hiding the bullet list entirely.
- **structure** @ Page heading hierarchy : After the H1 in the hero, Section 2 and Section 3 both use H2 but then Sections 4–6 jump to H3 with no H2 parent — the heading hierarchy is broken (H1 → H2 → H2 → H3 without a containing H2 group), which hurts SEO and screen-reader navigation.
- **content** @ H3 'Animer une réunion… on parle le même language' : 'language' is the English spelling; the correct French word is 'langage'. This typo appears in both duplicate instances of the heading.
- **content** @ Section 3 body / 'Vos chefs de projets et PO vont adorer' : The section ends with the stub sentence 'Voici comment nous le concrétisons.' but there is no follow-up content, image, or feature list in this section — it reads as an incomplete or truncated section whose body was never filled in.

### `solution/airsaas-et-les-experts-de-la-transfo`
- **content** @ Second feature section — 'AirSaas dans le tooling des missions' : The paragraph ends with 'grâce mode multi-workspace' — the word 'au' is missing between 'grâce' and 'mode', making the sentence grammatically broken and unprofessional ('grâce au mode multi-workspace').
- **brand** @ Second feature section — 'AirSaas dans le tooling des missions' : Brand name is written 'Airsaas' (lowercase 's') mid-sentence instead of the correct 'AirSaas', which is a brand consistency error visible to readers.
- **functional** @ Hero section — H1 paragraph / body copy : The hero paragraph body text runs two sentences together without a space or line break between them: '…votre stratégie.Êtes-vous prêt…' — the period and next sentence are concatenated with no whitespace, making it look like a rendering bug.
- **structure** @ Page — heading hierarchy : The page has an H1 followed directly by H3s for all content sections, with no H2 used in the main content body (the 'Ils parlent de nous' press-logo band uses an H2, but the three feature sections skip H2 entirely). This breaks logical heading hierarchy and harms SEO and accessibility.
- **functional** @ Page — missing CTA buttons in feature sections : None of the three main feature sections ('Se former entre experts', 'AirSaas dans le tooling', 'You never walk alone') contain any CTA button or link, while the live page includes call-to-action links in each block. The 'Partenaires, cette communauté de 200+ experts vous intéresse ?' sentence at the end of the third section clearly implies a CTA that is absent.

### `solution/flash-report`
- **content** @ Section 'Les bonnes pratiques de flash report' (H2) : This section has only a heading and a single brief intro paragraph but no actual content — no best-practice items, cards, or list items are rendered. It appears to be a stub with body copy that ends with a <br/> and nothing else, leaving an empty section visible on the page.
- **content** @ Section 'Plus qu'une solution de reporting flash' (H2) : Same structural issue as the best-practices section: the section contains only a heading and a broken one-liner with no feature cards, list, or supporting content rendered below it. Users see an incomplete section.
- **structure** @ Hero section / H1 : The H1 text contains a zero-width joiner character (‍) between 'de' and 'flash': 'La solution de‍flash report'. This renders as no space between the two words in some environments, producing 'deflash report' visually.
- **content** @ Feature section 'Une vision Kanban qui simplifie votre gouvernance' : The section heading promises a Kanban view, but the body copy describes a dashboard for centralising decisions — no Kanban-specific content is mentioned. The screenshot (Portfolio project filter open) also appears unrelated to a Kanban board, creating a mismatch between heading and content.

### `solution/flash-report-projet`
- **content** @ Section 'Plus qu'une solution de reporting flash : un outil PPM projet moderne et simplissime' : This section contains only a heading and a single introductory paragraph with no feature cards, list, or visual content below it. It renders as a visually empty stub that introduces features never displayed, leaving users with an incomplete section.
- **content** @ Section '3 règles d'or pour utiliser votre flash report projet à bon escient' : This section announces '3 règles d'or' but contains only a short teaser paragraph and no actual rules, cards, or list items. The promised content is entirely missing, making this a broken stub section.
- **content** @ Feature section 'Des intégrations natives pour éviter le report de données manuel' : The body copy repeats the same information twice in consecutive paragraphs — both paragraphs list the same integrations (Jira, ClickUp, Asana, Monday, Microsoft Teams, Zendesk) in nearly identical wording, which reads as a copy-paste duplication error.
- **content** @ HTML body (truncated) — last visible section 'Vos fiches de cadrage de projet collaboratives' : The page HTML is visibly truncated mid-sentence ('Homogénéiser la culture projet de votre entreprise, et faites monter les c'). This means at least one section is cut off and any subsequent sections (testimonials, CTA, footer) may be missing or broken in the render.
- **layout** @ Feature sections using 'Une structure fixe hyper-lisible' and 'Votre reporting : l'allié pour vous aider dans vos décisions' : Both of these text-left sections use 'lg:pl-[10rem] lg:pr-0' layout but their image panels use 'background-color:var(--color-primary-5)' — identical styling to each other — whereas alternating sections are supposed to use 'var(--color-prevention-10)'. Two consecutive left-text sections with the same background color breaks the alternating visual rhythm.

### `solution/outil-ppm`
- **structure** @ H2 section — 'Enfin l'outil PPM que toutes les Directions attendaient' : This H2 section contains only the heading and no body content, image, or CTA — it renders as a visually isolated, empty-looking banner with no supporting text or visual element.
- **structure** @ Section with standalone paragraph 'Problématique ciblée à la date de création' : This short paragraph appears as a standalone section with no heading or image context — it looks like a table caption or label that was meant to accompany a table/chart (likely a comparison table of PPM tools) that is completely missing from the rebuild.
- **content** @ Section 'Un changement de paradigme…' — paragraph about Maslow pyramids : The text explicitly references 'ces pyramides de Maslow' but no images of the pyramids are rendered — the visual asset is missing, leaving a dangling reference that confuses readers.
- **layout** @ All feature/content sections (H3 sections) : Every H3 content section is a separate full-width section with identical large vertical padding (py-[6.25rem] on lg), resulting in enormous whitespace gaps between sections that would look extremely broken on desktop — these sections appear designed as a single scrollable article, not isolated padded blocks.
- **content** @ Hero section — H1 : The H1 reads 'AirSaas : un outil PPM nouvelle génération - Logiciel ppm' which appears to be an SEO title artifact with the suffix '- Logiciel ppm' visible as raw text on-page — this looks unpolished and likely was intended as meta title only, not displayed copy.
- **content** @ Section 'Gagnez du temps en reporting' — internal link : The link to the flash report points to the absolute live domain URL 'https://www.airsaas.io/fr/solution/flash-report-projet' instead of a relative internal path, breaking environment consistency and potentially routing users away from the rebuild.

### `solution/gestion-portefeuille-projet`
- **structure** @ Long-form body — multiple consecutive bare <section> blocks : The page body is fragmented into ~20 individual <section> elements each containing a single paragraph or heading, with no grouping logic. Alternating heading+body sections separated into sibling sections creates orphaned headings and disconnected paragraphs, breaking the reading flow and heading hierarchy (H2 headings have no directly associated content).
- **content** @ Section 'L'interface utilisateur comme vecteur…' body copy : Contains a typo/grammatical error: 'S'il le choix d'un nouvel outil' — 'S'il le' is incorrect French; should be 'Si le choix d'un nouvel outil'. This is user-visible garbled French in the body copy.
- **content** @ Section with standalone paragraph — 'AirSaas est donc solution PPM…' : Missing article: 'AirSaas est donc solution PPM' should read 'AirSaas est donc une solution PPM'. Additionally, the <strong>AirSaas</strong> tag runs directly into 'est' with no space between them, rendering as 'AirSaaset' in the DOM.
- **content** @ Section body — competitor tools mentioned by name : Competitor products Sciforma, Ganttic, and Planview are called out by name in a section that otherwise positions AirSaas as the recommended solution. There is no framing or competitive context — they appear in an orphaned paragraph without the surrounding content that presumably existed in the original page, making the mention look unfinished and potentially confusing.

### `solution/management-de-portefeuille-projet`
- **structure** @ Section — 'Collaborez pour mieux transformer votre entreprise' and 'Les 5 règles d'or d'un bon management de portefeuille projet' : Both H2 sections contain only a short introductory paragraph with no supporting content (no cards, no numbered list, no features). The '5 règles d'or' section in particular implies a structured list of five rules that is entirely missing from the rebuild.
- **layout** @ Feature section — 'La vue liste' and 'Des intégrations natives' : Both consecutive sections use the same text-left / image-right layout (lg:pl-[10rem] lg:pr-0), breaking the expected alternating left/right rhythm of the feature strip. The 'La vue liste' section should be a right-image layout mirroring the alternation.
- **content** @ Feature section image — 'La vue liste' : The image alt text is the bare word 'List' — a clear placeholder/stub alt text that should be a descriptive French string like 'Vue liste du portefeuille de projets'.
- **structure** @ Section intros — 'Collaborez…' and 'Les 5 règles d'or…' : The CMS-sourced content renders a <p> element nested directly inside another <p> element (via <span>), which is invalid HTML and will cause browser correction that may break text rendering or spacing in these sections.

### `solution/outils-de-pilotage-projet`
- **content** @ Section referencing 'pyramides de Maslow' : The body copy explicitly references 'ces pyramides de Maslow' (plural, implying two diagrams are present), but no images are rendered in this section — the visual assets are missing entirely, leaving a dangling textual reference with no supporting content.
- **layout** @ All long-form body content sections : Every prose/list section uses the solution-page section wrapper (large symmetric padding, items-center, text-center) which is appropriate for marketing panels, but all long-form editorial text (multi-paragraph arguments, bullet lists) is rendered centred with a max-width cap. This produces a visually awkward wall of centred paragraphs that is hard to read and looks unintentional for article-style content.
- **content** @ Section 'La naissance récente des outils de pilotage de projet' : The H2 heading promises content about the 'recent birth' of project management tools, but the immediately following section body discusses only competitor comparisons (Planview, Sciforma, Ganttic) and vision heterogeneity — the promised historical context is absent, making the heading misleading.
- **brand** @ Section 'Un outil de pilotage projet souple et intégrable facilement' — Jira paragraph : The copy reads 'En intégrant Jira.à AirSaas' — there is a stray full-stop immediately before 'à' ('Jira.à'), which is a typographic error that appears in a prominent product-feature description and reflects poorly on the brand.

### `solution/portfolio-management`
- **content** @ Section 'Votre reporting projet en un clic' and 'Ritualisez vos reportings' : Both feature sections use the exact same image (Flash report ppt.webp from 65d35ce9e34fd87ad7612c9d). This creates visible duplication that looks like a copy-paste error to any user scrolling through the page.
- **structure** @ Section '5 bonnes pratiques de portfolio management…' and 'Marketez avec impact vos programmes de transformation' : Both of these sections render as heading + short intro paragraph with no actual content below (no list of practices, no sub-sections, no cards). They function as orphaned intro blocks whose promised body content is missing, making the page feel broken.
- **structure** @ Section 'Marketez avec impact vos programmes de transformation' : This mid-page section uses an H3 instead of H2 for what is clearly a top-level section heading (it introduces a new major content grouping with '5 bonnes pratiques'), breaking the heading hierarchy where all other section titles are H2.
- **content** @ Section 'Laissez nos clients vous parler d'AirSaas' : The testimonial section header and intro paragraph are present but no actual testimonial cards, quotes, or client content appear in the HTML — the section body is completely empty, which will render as a heading floating above blank space.

### `solution/revue-de-portefeuille`
- **structure** @ Section '6 clés pour rendre vos revues de portefeuille de projet plus efficaces' : This section contains only an intro paragraph but no actual list of 6 keys/items — the H2 promises '6 clés' but the section body immediately ends without presenting them as a structured list or sub-headings. The feature sections that follow are product feature descriptions, not the '6 clés' promised, creating a misleading heading-to-content mismatch.
- **content** @ Section '6 clés…' — paragraph wrapper : A block-level <p> element is nested inside another <p> element (`<p><span><p>Préparation…`), which is invalid HTML and will cause the browser to break the outer paragraph, potentially rendering content outside its styled container.
- **content** @ Feature sections — heading/content mismatch : The page has 9 feature sections but the H2 states '6 clés'. The extra sections (integrations, priorisation, inviter les bonnes personnes, envoyer le reporting en amont, etc.) appear to be a mix of product feature sections and the '6 clés' best-practice sections merged together without clear structural separation, making the page logic confusing.

### `solution/tableau-de-bord-dsi`
- **content** @ Section 'Embarquez par une bonne communication' (alternating feature block) : The body text for the 'Embarquez par une bonne communication' feature block is completely empty — the inner div renders no paragraph or text content, leaving the section with only a heading and an image but no explanatory copy.
- **structure** @ Section 'Le pilotage par la valeur' (second section after hero) : This section contains only an H3 heading with no body text, image, or supporting content. It appears to be a stub section missing its content, making it a confusing dead-end for users.
- **structure** @ Section 'L'importance des indicateurs choisis…' (H2 section) : This H2 section contains only the heading and nothing else — no body text, no list, no image. The content that belongs under it appears to be rendered in a separate sibling section, breaking the logical heading-to-content association.
- **structure** @ Section 'Comment construire des indicateurs du tableau de bord pertinents?' (H2 section) : Same issue as above — this H2 section contains only the heading with no body content underneath it. The related list content is in a separate sibling section, severing the semantic relationship between heading and content.
- **content** @ Paragraph section after hero (Kanban typo) : The text reads 'La vue Kaban' instead of 'La vue Kanban' — the letter 'n' is missing, which is a visible typo on a product-focused page where Kanban is a key term.

### `solution/tableau-de-bord-gestion-de-projet`
- **content** @ Hero section — paragraph below H1 : The hero paragraph is extremely long (3+ sentences covering KPIs, performance calibration, and a reference to a 'grand guide de la conduite de projet') and reads like an SEO article body dump rather than a short, scannable hero subtitle. It is mismatched in purpose with the hero section and will visually overwhelm the CTA.
- **structure** @ Sections 2–4 (three consecutive plain-text sections after hero) : Three consecutive sections render as body-text-only paragraphs (no heading, no visual anchor) before the first H2 appears. These sections are structurally invisible to users scanning the page and break logical heading hierarchy — content that should sit under headings or be consolidated into one section appears as isolated floating text blocks.
- **structure** @ Section 'Quelques principes…' (feature card with image) : The H3 'Quelques principes à respecter pour une gestion de portefeuille optimale' has a body paragraph that ends abruptly with 'afin de s'assurer qu'ils soient pertinents :' followed by a colon and no list — the promised list of principles is missing from this card. The actual bullet list appears in an earlier standalone <section> disconnected from this card.
- **content** @ Section 'Tableau de bord de gestion de projets : pourquoi est-ce crucial…' (feature card) : The body of this card contains only one short sentence ending with '‍' (a zero-width joiner artifact), then stops. The content is clearly truncated — this section heading promises an explanation of why dashboards are crucial for a DSI, but no answer is provided in the card body.
- **structure** @ H2 'En conclusion, voici les deux règles principales…' : This H2 is a sentence that acts as a title for what follows, but the two rules (co-construire, penser au regard des caractéristiques) only appear much later inside a mixed paragraph section, not immediately under this heading. The heading and its content are separated by multiple unrelated sections, breaking logical structure.

### `equipe/direction-de-la-transformation`
- **typography** @ Hero section — H1 : The H1 text runs 'piloter' and 'leurs grands programmes' together without a space or line break: 'mieux piloterleurs grands programmes'. This is a visible word-fusion bug in the heading.
- **structure** @ Section 'Uniformisez le reporting projet' : This section uses an H3 as its primary section heading while it stands alone as a full section (not a subsection of another H2). The preceding feature sections ('Animez le comité…', 'Pilotez les projets…') use H3 correctly as sub-features, but this standalone section has no parent H2, breaking heading hierarchy and making it appear visually subordinate when it should be a peer.
- **content** @ Section 'Améliorer en continu votre manière de faire des projets' : The DAKI retrospective section (DROP / ADD / KEEP / IMPROVE) renders as bare acronym cards with one-line descriptions and no supporting image or illustration, making the section look unfinished compared to every other feature section which pairs text with a product screenshot.

### `solution/tableau-de-bord-portefeuille-de-projet`
- **content** @ Section 'Collaborez pour mieux transformer' and 'Les clés de succès...' : Both sections contain only a short introductory paragraph with no supporting visuals, feature cards, or list items — they render as isolated text blocks with no visual context. The sections look like stubs or partially-migrated content that lost their associated child components.
- **content** @ Feature section — 'La vue liste' image alt text : The image for 'La vue liste' has alt="List" — a generic English placeholder rather than a meaningful French description. This is both an accessibility failure and brand-consistency issue.
- **content** @ Feature section — 'La vue timeline' (second occurrence) : The timeline section reuses the exact same image URL as the hero feature section ('Portfolio project timeline view.webp' / 65ce3c00…). The timeline view section and the 'Vue macro / planification stratégique' section show the same screenshot, which looks like a copy-paste bug.
- **layout** @ Feature section — 'La vue liste' and 'La vue timeline' layout direction : Both 'La vue liste' and 'La vue timeline' sections use the same left-text / right-image layout (lg:pl-[10rem] lg:pr-0), creating three consecutive identically-oriented sections ('liste', 'timeline', 'flash report'). The alternating left/right rhythm breaks here — visually monotonous and likely a layout mapping error.

### `equipe/comite-direction`
- **content** @ Integrations section ("Vos équipes vont adorer nos intégrations natives") : The integrations section has a heading and a short paragraph but contains no actual integration logos, cards, or any visual content. The body copy ends abruptly and the section renders as essentially empty/stub content below the fold.
- **content** @ Testimonials section ("Laissez nos clients vous parler d'AirSaas") : The testimonials section has only a heading and intro paragraph with no testimonial cards, quotes, or customer names rendered. The section is a visible stub with no actual social proof content.
- **content** @ "Suivez l'avancée de vos programmes" section : This section contains only a heading and a short paragraph with no accompanying image or visual. Every other feature section on the page uses a text+image layout; this one is missing its image entirely, making it look broken.
- **structure** @ "Suivez l'avancée de vos programmes" section : This feature section uses an H3 while all preceding feature sections also use H3, but this section is styled as a standalone centered block (without the image/text split) making it visually inconsistent with the sibling feature sections and looking like a misplaced or incomplete component.

### `equipe/it-et-operation`
- **content** @ Section h2 'La marketplate AirSaas' : The heading contains a typo: 'marketplate' should be 'marketplace'. This is a visible brand/copy error on a public-facing section heading.
- **structure** @ Sections 'La plateforme qui fluidifie...' and 'La marketplate AirSaas...' and 'Laissez nos clients...' : Three consecutive H2 sections contain only a heading and a short paragraph — no cards, images, testimonials, or other supporting content. These appear to be stub/incomplete sections that are missing their primary content blocks (feature cards, integration logos, testimonial cards).
- **content** @ Section h2 'Laissez nos clients vous parler d'AirSaas' : The testimonials section contains only a heading and a subtitle paragraph; no actual testimonial cards or quotes are rendered. This is an empty stub section that should contain customer testimonials.

### `equipe/outil-pmo`
- **content** @ Section 'Un capacity planning par équipe simple et actionnable' : The section body ends with 'Grâce à cette vue vous avez les bases d'une discussion pragmatique pour prendre les décisions :' — the sentence is cut off mid-phrase with a colon and no follow-up list or content. The section appears incomplete/truncated.
- **content** @ Feature section — 'Animez clairement et simplement vos CoPil' (last feature section before footer) : This section reuses the exact same image ('Portfolio decisions — show projects title') as the earlier section 'Fluidifiez votre prise de décisions importantes et urgentes'. Two different feature sections display the identical screenshot, which looks like a copy-paste error.
- **content** @ Section 'Laissez nos clients vous parler d'AirSaas' : This section contains only a heading and a single intro paragraph but no actual testimonials, customer quotes, or customer-facing content beneath it — it reads as a stub section with a promise that is never fulfilled on the page.
- **structure** @ Sections 'Une plateforme de gouvernance projet…' and 'Un capacity planning…' and 'Grâce à sa marketplace…' and 'Laissez nos clients…' : Four consecutive sections each contain only a centred H2 heading and a paragraph of text with no images, cards, or supporting visuals. These appear to be text-only stub sections without their intended visual components (feature grids, screenshots, testimonial cards, etc.).

### `blog/10-pratiques-pour-developper-la-relation-de-confiance-dg-cio`
- **content** @ Hero / article metadata — publication date : The article displays 'Le 1 février 2026', which is a future date (over a year ahead). Unlike minor date variations, a date this far in the future would confuse readers and signal a data/CMS mapping error rather than a normal rebuild timing difference.
- **content** @ Blog body — figcaption under workshop photo : The figcaption text runs two sentences together without a space or punctuation break: '...créer des communs autour de la transfo.Travailler les relations avec les DG grâce au théâtre forum.' The missing space between the two sentences makes the caption look broken/truncated mid-phrase.
- **content** @ Blog body — Tip 4 paragraph : The sentence 'La Direction Générale a aussi sa complexité aurait affirmé Lapalisse !' is immediately followed by 'Comprendre là ou...' with no space between the exclamation mark and the next word, creating a run-on that looks like a rendering/truncation bug rather than intentional style.

### `blog/analyse-des-risques-projet`
- **content** @ Blog article body — Étape 1 paragraph : The text reads 'L'identification des risques et leur traitchef ement doit se faire…' — the word 'traitchef ement' is a garbled word with a spurious 'chef' insertion, likely a copy-paste corruption. It should read 'traitement'.
- **content** @ Blog article body — internal links : Several internal links use relative paths without the '/fr' locale prefix (e.g. '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' and '/gestion-de-projet/budgetiser-un-projet-sans-se-louper'). These will 404 in the rebuilt Next.js app which expects '/fr/…' paths.
- **content** @ Blog article body — figcaption under AirSaas screenshot : The figcaption reads 'Penser autrement sa mise en mise en œuvre de la gestion des risques' — 'mise en mise en œuvre' is a clear duplication ('mise en' appears twice). Should read 'Penser autrement la mise en œuvre de la gestion des risques'.
- **structure** @ Blog article body — heading hierarchy : The article body starts directly with an H3 ('Pourquoi est-ce important en gestion de projet ?') with no H2 parent wrapping the content sections. The page H1 is in the hero, so the first body heading should be H2, not H3, to maintain a correct document outline.
- **layout** @ Blog article body — risk type bullet lists : Each bullet item in the 'Type de risques projet SI classiques' list is wrapped in its own separate <ul> element instead of being <li> items inside a single <ul>. While visually similar, this produces invalid/fragmented HTML list semantics and will break screen-reader navigation and any list-based styling.

### `blog/appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management`
- **content** @ Blog article body — Idée reçue n°4 paragraph : A paragraph begins mid-thought and trails off without completing a sentence: 'Ensuite, qu'on définit le troisième workshop, c'est qu'on va définir un manifeste projet organisationnel. C'est quoi votre lexique commun ? Déjà, je suis certain que le mot projet, le mot programme, le mot jalon n'ont même pas des définitions communes au sein de l'organisation. Déjà,' — the text ends abruptly with a dangling 'Déjà,' indicating truncated/missing copy.
- **content** @ Blog article body — Idée reçue n°3 paragraph mentioning competitors : Competing tools JIRA, Asana, and Wrike are mentioned positively ('Si la gestion de projet sous JIRA Asana ou Wrike fonctionne…laissez la fonctionner') in the body of an AirSaas marketing article without any brand context or disclaimer, which could read as endorsing competitor products over AirSaas.
- **content** @ Sommaire (table of contents) section : The table of contents lists only 3 items ('L'essentiel en quelques mots…', 'Sept idées reçues…', 'Conclusions'), but the article body contains at least 5+ named subsections (7 idées reçues with individual H4 headings, plus the 9-step process mentioned in the intro). The ToC is severely incomplete relative to the actual content structure.
- **structure** @ Blog article body — first section heading : The first content section ('L'essentiel en quelques mots…') uses an H3 tag, but this is a top-level article section — it should be H2. The heading hierarchy jumps from the H2 'Sommaire' directly to H3 for the main content sections, which is semantically incorrect and misrepresents document structure.

### `blog/budget-previsionnel-projet`
- **content** @ Blog hero — author avatar : The author avatar image URL points to a photo tagged 'SV-min.jpg' (initials SV) but the displayed name is 'Jérôme Dard'. The image likely shows a different person, creating a mismatch between photo and name visible to users.
- **functional** @ CTA section — demo button : The CTA button ('Réserver une démo') is wrapped in a div with class 'opacity-0 scale-[0.92]' and no JS-driven animation appears to reveal it in the static HTML. If the scroll-reveal JS fails to fire, the button remains invisible, making the primary CTA on the page inaccessible.
- **content** @ Blog body — internal link : The link to 'conduite de projet' uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the '/fr/' locale prefix, which will 404 in the rebuilt Next.js app where all French routes require '/fr/'.
- **structure** @ Table of contents — sommaire : The sommaire lists only three entries ('Qu'est-ce qu'un budget prévisionnel', 'Pourquoi établir…', 'Comment préparer…') but the anchor IDs referenced (e.g. '#quest-ce-quun-budget-prévisionnel') contain accented characters which are non-standard for HTML fragment IDs and may fail to scroll to the correct heading in some browsers.

### `blog/budgetiser-un-projet-sans-se-louper`
- **content** @ Blog body — paragraph about 'No estimate', 'coach agile Frédéric' : The agile coach is identified only as 'Frédéric' with no surname. The copy appears truncated mid-attribution; the full name should be present for credibility and factual accuracy.
- **functional** @ Blog body — link to 'conduite de projet' article : The internal link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet', missing the '/fr/' locale prefix used by all other internal links on the page. This will result in a 404 for French-locale visitors.

### `blog/cadrage-projet`
- **functional** @ Blog body — internal link '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' : The href is missing the '/fr/' locale prefix (e.g. should be '/fr/gestion-de-projet/...'). This will likely result in a 404 for French-locale visitors.
- **content** @ Hero — publication date : The article displays 'Le 1 février 2026', which is a future date relative to any reasonable review period. This is likely a data-mapping bug pulling the wrong date field rather than the original publication date.
- **content** @ Aside callout — label 'À retenir' repeated twice with identical stub content : The same broken 'À retenir' aside block appears twice in close succession in the same section. Even if the placeholder text were real content, duplicate identical callout boxes would be a layout/content error.

### `blog/capacity-planning-definition`
- **functional** @ CTA button after 'Aligner capacité et demande' section : The inline CTA button is labelled 'Télécharger' (Download) but links to '/fr/meetings-pages' (a demo request page). The label does not match the destination or the surrounding content about capacity planning alignment.
- **content** @ Article hero — publication date : The article displays 'Le 1 février 2026', which is a future date relative to any plausible review period in 2024–2025. While future dates are not flagged as fabricated per instructions, a date over a year in the future strongly suggests a data entry error in the CMS that should be corrected.
- **content** @ Body paragraph — 'Aligner capacité et demande' : The phrase 'aligner la capacité et la demande en fonction des objectifs stratégiques</strong>de votre organisation' is missing a space before 'de', producing a run-on rendering ('stratégiquesde'). This is a content defect visible to readers.

### `blog/capacity-planning`
- **content** @ Blog hero — publication date : The article shows 'Le 1 février 2026' which is a future date more than a year ahead of any reasonable publish date. Unlike minor date display variance, this is a clearly erroneous CMS value that will confuse readers and hurt SEO credibility.
- **content** @ Body — 'planification de la demande' section, inline paragraph : The phrase 'maximiser l'efficacité opérationnelle</strong>de l'entreprise' is missing a space between the closing </strong> tag content and 'de l'entreprise', producing 'opérationnellede l'entreprise' in rendered text — a visible typographic break in a prominent paragraph.
- **content** @ Table of contents — sommaire list : The sommaire lists 5 entries but the article body visible in the HTML only surfaces 4 distinct H3 sections (Qu'est-ce que, Les 7 bénéfices, Les étapes, Les bonnes pratiques). The fifth entry 'Quels outils pour mettre en place votre Capacity Planning ?' may correspond to a section in the truncated portion, but if the section is absent the anchor link will be dead and the ToC item will scroll nowhere.
- **brand** @ Body — intro paragraph and podcast reference : Brand name is rendered inconsistently as 'Airsaas' (lowercase 's') in two body paragraphs ('chez Airsaas, on sait…' and 'Chez Airsaas, nous recommandons…'), while the official brand spelling used everywhere else on the site is 'AirSaas' (capital S).
- **content** @ Body — podcast link text : The anchor text reads 'où nous parlons du Flash Design avec Isabelle Perussy' but the linked episode is about 'les défis techniques et humains de la transition d'IDTGV à la DSI de OUI.GO' — the link text does not match the linked content at all, likely a copy-paste error from another article.

### `blog/chef-de-projet-transverse`
- **content** @ Blog hero — author avatar : The author avatar src points to an image named 'BR-min.jpg' but the displayed name is 'Jérôme Dard'. The initials 'BR' suggest this is a different person's photo, indicating a mismatched author image.
- **content** @ Blog body — intro paragraph : The phrase 'rendre efficace le pilotage de projets</strong>transverses' is missing a space between the closing </strong> tag content and 'transverses', causing 'projetsTransverses' to render as one run-together word visually.
- **functional** @ Blog body — intro paragraph internal link : The internal link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' — a bare path without the '/fr/' locale prefix, which will 404 or redirect incorrectly in the rebuilt Next.js app that uses '/fr/' routing.
- **structure** @ Table of contents — third entry : The third TOC entry links to '#les-compétences-clés-dun-bon-directeur-de-projet-transverse' and uses the title 'directeur de projet' while the article consistently uses 'chef de projet transverse'. The anchor ID may not match any heading in the article body, making the TOC link a dead in-page anchor.

### `blog/comite-pilotage-projet`
- **content** @ Astuce 5 – aside callout 'À retenir' : The quote inside the aside is cut off mid-sentence: "Le temps qu'on prend à s'aligner ce n'est pas du temps perdu..." — the closing quotation mark and the rest of the quote are missing, making it read as truncated/broken copy.
- **functional** @ Blog body – link to 'Comité de pilotage ou Copil : Les bases' : The internal link href is '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' (no locale prefix '/fr/'), which will 404 on the rebuilt Next.js site that uses /fr/ prefixed routes.

### `blog/comite-de-pilotage-definitions-et-incomprehensions`
- **content** @ Blog body intro paragraph — 'On va démystifier 5 notions simples' : The text promises 5 notions but names six (sponsor, Copil, jalons, chef de projet, key user, reporting), and the 'sponsor' section is never actually covered in the visible article body, suggesting either a counting error in the copy or a missing section.
- **functional** @ Blog body — internal link 'Comité de pilotage ou Copil : Les bases' : The href is "/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases" without a /fr/ locale prefix, which will produce a 404 on the rebuilt site's locale-prefixed routing.
- **content** @ Blog body — multiple paragraphs with empty <strong> tags : Several sentences contain empty <strong></strong> tags mid-word boundary (e.g. "surtout<strong></strong>saisir", "cela,<strong></strong>car"), causing words to run together without a space, producing malformed reading like "surtoutsaisir" in rendered output.

### `blog/comment-animer-un-bilan-projet-efficace`
- **content** @ Sommaire – TOC link '5 formats-types de bilan deprojet' : The table-of-contents entry reads '5 formats-types de bilan deprojet' — 'deprojet' is missing a space and should be 'de projet'. This is visible to users and looks like a typo in the nav.
- **content** @ Blog hero – publication date : The article displays 'Le 1 février 2026', which is a future date that will appear wrong to readers for an extended period. If this is a data-entry error (should be 2022 or 2024 based on the article era), it should be corrected before ship.
- **functional** @ Blog body – internal links (e.g. '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet') : Several internal links in the body use bare paths without the '/fr/' locale prefix (e.g. '/gestion-de-projet/…', '/gestion-de-projet/la-revue-de-projet'), which will 404 in the rebuilt Next.js routing that expects '/fr/…' paths.

### `blog/comment-animer-un-comite-de-pilotage`
- **content** @ Sommaire – last list item : The last table-of-contents entry has a blank/zero-width label ('‍' — a zero-width joiner) and its anchor href is the generic '#section', pointing nowhere meaningful. It will appear as an empty bullet link in the rendered TOC.
- **functional** @ Blog body – 'Comment bien préparer un comité de pilotage ?' internal link : The anchor linking to the related article 'Comment bien préparer un comité de pilotage ?' has href='#' — a dead placeholder link that leads nowhere instead of pointing to the actual article URL.
- **content** @ Blog body – opening paragraph block : The very first content paragraph contains only a lone zero-width joiner character ('‍') wrapped in a <span>, rendering as a blank line before the actual intro text. This is a stray Webflow artifact that should be stripped.
- **functional** @ Blog body – internal link to 'Comité de pilotage ou Copil : Les bases' : The href is a relative path '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' without the '/fr/blog' prefix, which will 404 in the new routing structure. It should resolve to '/fr/blog/copil-projet-ou-comite-de-pilotage-projet-les-bases' (or equivalent).

### `blog/comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026' which is a future date more than a year ahead of the article's 2022 subject matter. While future dates are noted as acceptable per guidelines, a date that places a 2022-focused article in 2026 is likely a data mapping error (year field corrupted) that will confuse readers.
- **content** @ Blog hero — author badge : The author pill uses a green success-text background color for what appears to be a decorative author badge — this color typically signals success/confirmation states in the DS, not author attribution, which will look semantically odd and potentially alarming to users.

### `blog/comment-faire-un-bon-point-davancement-projet`
- **structure** @ Blog body — 'Établissez de bons objectifs' / 'On ne réussit que par rapport aux objectifs fixés' : Two consecutive H4 headings appear back-to-back with no body content between them ('Établissez de bons objectifs' immediately followed by 'On ne réussit que par rapport aux objectifs fixés'). The first H4 looks like an orphaned/duplicate heading that was not merged with or separated from the second, making the structure confusing to readers.
- **content** @ Blog body — internal link 'conduite de projet' : The anchor href points to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (a relative path missing the '/fr/' locale prefix), which will 404 in the rebuilt Next.js app. Other internal links in the same article correctly use '/fr/' prefixes or absolute airsaas.io URLs.
- **content** @ Blog body — Kanban internal link : The Kanban link uses 'http://www.airsaas.io/…' (HTTP, non-www variant) rather than the canonical 'https://www.airsaas.io/…', which may trigger a mixed-content warning and an unnecessary redirect in production.

### `blog/comment-decider-en-copil`
- **content** @ Blog body — paragraph duplicated (clients internes / sponsors) : The paragraph beginning 'Et les clients internes, sponsors, membres du comité de pilotage…' appears verbatim twice in immediate succession, creating an obvious copy-paste duplication visible to any reader.
- **functional** @ Blog body — internal link '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' : The link to the related article uses a bare path without the '/fr/' locale prefix, which will 404 or redirect incorrectly in the rebuilt Next.js routing. All other internal links in the nav use '/fr/…'.
- **content** @ Hero section — publication date : The article displays 'Le 1 février 2026' — a future date relative to any reasonable current review window. This appears to be a malformed or incorrectly mapped date field from the CMS, not an intentional scheduling artifact, and will read as erroneous to users.

### `blog/comment-elaborer-un-reporting-efficace`
- **content** @ Hero / author metadata : The author avatar image (URL contains '61e038501c4256317123910b_SV-min.jpg', with 'SV' initials likely referring to a different person) does not match the displayed author name 'Jérôme Dard'. This mismatch between the photo and the credited author name is misleading to readers.
- **functional** @ Blog body — second introductory paragraph : The internal link to 'conduite de projet' points to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing '/fr/' locale prefix), which will result in a 404 or wrong-locale page in the rebuilt Next.js routing.
- **content** @ Blog body — introduction paragraph (gift CTA) : The sentence 'Et en plus en cadeau vous pouvez télécharger … notre modèle de<a href=…>reporting projet ici.</a>' is missing a space before the anchor text ('modèle de reporting' runs together as 'modèle dereporting'), making it appear broken mid-phrase on screen.

### `blog/comment-gerer-lagressivite-dans-les-comites-de-pilotage`
- **content** @ Blog body – '7 conseils' section intro paragraph : The body text refers to '10 astuces' ('Nous verrons ci-dessous dans les 10 astuces comment réagir') but the section heading and table of contents both say '7 conseils'. The number is inconsistent and will confuse readers.
- **content** @ Internal link – intro paragraph : The link to the 'Comité de pilotage ou Copil : Les bases' article uses a relative path without the locale prefix: href='/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases'. All other internal links use '/fr/…', so this link will 404 or redirect incorrectly.
- **brand** @ Image alt text – 'copil-tension' figure : The alt text on the tension image reads 'copil-tension-airsaaas.jpeg' (triple 'a' in airsaas visible in the filename), and more critically the image alt attribute itself says 'agressivité dans les copil' — a raw filename-derived phrase rather than a descriptive alt. Minor, but the filename exposes a brand typo 'airsaaas'.

### `blog/comment-mettre-en-place-un-pmo`
- **content** @ Hero / article metadata — publication date : The article displays 'Le 1 février 2026', which is a future date relative to any plausible review date in 2024–2025. Unlike typical date display variation, this appears to be a CMS data mapping error (year off by ~1–2 years) rather than an intentional future-publish date, and will confuse readers who see a future timestamp on a live page.
- **content** @ Blog body — ordered list item 1 (ROI criterion) : The first numbered criterion ends with a double period '…futurs investissements..' — a typographical error that was likely present in source but is user-visible and looks broken.
- **functional** @ Blog body — internal links (e.g. 'metier-pmo', 'pourquoi-mettre-en-place-un-pmo') : Several in-article links point to 'https://www.airsaas.io/fr/gestion-de-projet/…' (the old Webflow URL structure) rather than '/fr/blog/…' (the rebuild's routing). On the rebuild these will navigate users off the rebuild domain instead of staying within the app.

### `blog/comment-mettre-en-place-un-comite-de-pilotage`
- **functional** @ Blog body — internal link in 'Pourquoi faire un Copil?' section : The link to 'Comité de pilotage ou Copil : Les bases' uses a relative path without the '/fr' locale prefix ('/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases'), which will result in a 404 on the rebuilt site where all routes are under '/fr/blog/...'.
- **content** @ Blog body — 'Le rôle du sponsor dans le Copil' section : The sentence 'il est garant de l'intérêt de l'entreprise dans le projet et sera valoriser le bon état d'esprit' is grammatically broken — 'sera valoriser' is not valid French; it should be 'valorisera' or 'il cherchera à valoriser'. This reads as garbled copy, not an acceptable anglicism.
- **content** @ Hero section — publication date : The article displays 'Le 1 février 2026' as its publication date, which is a future date. While the instructions say not to flag future dates as fabricated, this specific article exists on the live site with a 2022 publication date (the hero image URL contains '62ea…' suggesting mid-2022); the displayed date 2026 appears to be a data mapping error rather than an intentional rebuild date.
- **content** @ Blog body image alt text — 'Qui d'autre peut participer' section : The guest/invité image has a mangled alt text: 'I mystère copilnvité' — this appears to be a corrupted merge of 'Invité mystère copil', exposing a content processing bug in the alt attribute.

### `blog/comment-mettre-une-bonne-meteo-projet`
- **functional** @ Blog body — internal link in first paragraph : The link to 'conduite de projet' uses a relative path without the locale prefix: href='/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet'. On the rebuilt site under /fr/blog/… this will resolve to a broken URL; it should be '/fr/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' or an absolute URL.
- **content** @ Hero — publication date : The article displays 'Le 1 février 2026', which is a future date relative to any plausible review of this content. This likely indicates the CMS date field was set incorrectly (e.g. 2022 mis-mapped to 2026) and will confuse readers.
- **content** @ Blog body — 'Synthétiser l'état d'avancement' paragraph : Missing space between 'données' and 'et': '…de simplifier la lecture des données**et** de rendre compte…'. The strong tag closes without a trailing space, causing the two words to merge visually ('donnéeset').
- **content** @ Blog body — 'levier de performance' section : Missing space before 'assez' and after 'visuel': '…outil de reporting visuel**assez**proche…' renders as 'visuelassez'. Same pattern: '…dysfonctionnements**de** votre système' renders as 'dysfonctionnementsde'.

### `blog/comment-reussir-un-projet-transverse`
- **content** @ Blog hero — author avatar : The author avatar image is 'Jérôme Dard' by name, but the image URL ends in 'BR-min.jpg', which is a different person's photo (likely another AirSaas team member). The name and photo do not match.
- **functional** @ Blog body — internal link (conduite de projet) : The link to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' is a relative URL missing the '/fr/' locale prefix, which will 404 in the rebuilt Next.js app where all French routes are under '/fr/'.
- **structure** @ Blog body — heading hierarchy : The section '1 : Rationaliser' and '2 : Dérisquer' are marked as H4, but they are top-level execution steps within an H3 section and should be H4 only if the sub-items beneath them (e.g. 'À chaque problématique sa solution pragmatique') are H5. Currently both the numbered step titles and their sub-sections share the same H4 level, flattening the hierarchy and making the structure semantically incorrect.

### `blog/copil-projet-ou-comite-de-pilotage-projet-les-bases`
- **content** @ Blog article body — first paragraph : An empty <strong></strong> tag produces a spurious space artefact in the sentence 'C'est lui qui fait le<strong></strong>lien entre le Codir…'. While the empty strong itself is a source quirk, the missing space between 'le' and 'lien' means the rendered sentence reads 'fait le lien' with no visible space gap (or collapses to 'felien' depending on renderer), making it look like a typo to readers.
- **brand** @ Blog hero — author avatar : The author is listed as 'Jérôme Dard' but the avatar image URL references 'BR-min.jpg' (initials 'BR'), which clearly belongs to a different person. The photo and the displayed author name do not match, which is a credibility issue visible to all readers.
- **structure** @ Blog article body — heading hierarchy : The article body starts directly with <h3> headings (e.g. 'Copil projet : une définition') without any preceding <h2>, skipping a level. The page H1 is in the hero; the next heading level in the article should be H2, not H3, to maintain a valid and accessible document outline.

### `blog/fiche-projet-exemple-et-methodologie`
- **content** @ Blog hero – author avatar : The author avatar image URL points to 'BR-min.jpg' but the displayed name is 'Jérôme Dard'. The initials 'BR' strongly suggest this is the wrong photo (likely belonging to a different author), meaning a real user would see a mismatched face-to-name pairing.
- **content** @ Blog body – internal link (first paragraph) : The link to 'conduite de projet' uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the '/fr/' locale prefix, which will 404 on the rebuild where all routes are under '/fr/'.
- **content** @ Blog body – figure caption under 'Voici un exemple de fiche de description projet' : The image alt text and caption read 'Modèle de rapport flash' but the section heading introduces it as an example of a project description sheet ('fiche de description projet'). The caption is mismatched and misleading for this context.

### `blog/demarche-de-projet`
- **functional** @ Blog body — internal link (conduite de projet) : The link to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' is a relative URL missing the '/fr' locale prefix, which will result in a 404 on the rebuilt Next.js site. Several other internal links in the body (airsaas.io/gestion-de-projet/…) use the old absolute Webflow domain without the '/fr' prefix.
- **content** @ Hero — publication date : The article displays 'Le 1 février 2026', which is a future date noticeably far from any plausible publication window and will appear erroneous to readers; this should be verified and corrected in the CMS data before shipping.
- **functional** @ Table of contents — anchor link #trois-raisons-pour-lesquelles-mettre-en-place-une-vraie-démarche-de-projet-dans- : The anchor href is truncated mid-phrase (ends with 'dans-' then nothing), so the table-of-contents link for the third section will not scroll to its target heading. The corresponding section heading ID likely does not match this broken fragment.
- **content** @ Blog body — paragraph near 'Standardiser plusieurs démarches' : The sentence reads 'A partir ce ce simple découpage' — 'ce ce' is a clear typo that should be 'de ce'. Also 'dont'' is a garbled attempt at 'don'ts', and 're définition' should be 'redéfinition'; combined these make a visibly broken sentence.
- **content** @ Blog body — truncated at end of article : The HTML is cut off mid-sentence ('…qu'on ne v') with a TRUNCATED comment, meaning the bottom of the page is missing content. The sections 'Gestion de projet de transformation', '7 erreurs', 'Points clés à retenir', and any closing CTA/footer are not rendered — a significant portion of the page is absent.

### `blog/gestion-portefeuille-projets-vs-gestion-de-projet`
- **content** @ Blog hero — author avatar : The author name displayed is 'Jonas Roman' but the avatar image URL references 'Avatar Jérôme' (a different person). This is a mismatched author name/photo combination that will mislead readers.
- **structure** @ Blog body — first content section heading : The first content section ('Qu'est-ce que la gestion de portefeuille de projets ?') uses an H3 tag instead of H2, creating a broken heading hierarchy: H1 in hero → H2 for 'Sommaire' → H3 for the first body section. The body sections should be H2 to maintain logical document structure.
- **content** @ Blog hero — 'Publié par' / author section : The publication date shown is 'Le 17 septembre 2025', which is a future date at time of this review. While future dates are not flagged as fabricated per guidelines, the combination with a mismatched avatar/name strongly suggests this article's metadata was not properly populated from the CMS.

### `blog/gestion-de-portefeuille-projet-pme`
- **content** @ Intro paragraph — 'présentation Power^Point' : The text reads 'Power^Point' which is a malformed rendering — a caret character appears in the middle of the brand name 'PowerPoint', likely a broken superscript tag from the source CMS.
- **content** @ Intro paragraph — 'D'après l'INSEE' link : The anchor text attributes the statistic to 'l'INSEE' but the href points to oberlo.fr, a third-party blog, not an INSEE source. This is a misleading attribution that could damage credibility.
- **functional** @ Sommaire nav — anchor '#la-démarche-portefeuille-projets-dans-les-pme-un-levier-dengagement-et-de-busine' : The TOC anchor ID appears truncated mid-word ('busine' instead of 'business' or similar), which will result in a broken in-page navigation link pointing to a non-existent heading anchor.

### `blog/jalon-projet`
- **content** @ Sommaire nav — second list item : The second entry in the table of contents has no visible label — it renders as a zero-width joiner character '‍' only. This is a stub/empty anchor that appears as a blank bullet in the TOC, confusing readers.
- **content** @ Blog body — empty H3 between 'Qu'est-ce que qu'un jalon projet?' section and the milestone image : There is a standalone H3 element containing only '‍' (a zero-width joiner). It renders as an invisible heading in the flow, creating unexpected whitespace and a broken heading hierarchy.
- **content** @ Hero — article author avatar : The author badge shows 'Jérôme Dard' but the image URL references a file named 'BR-min.jpg', strongly suggesting the photo is of a different person (a Webflow CMS mismatch). The displayed name does not match the actual photo.
- **content** @ Blog body — figure alt text 'Dessin de ' : The alt attribute for the 'planté de jalons' illustration is truncated: alt="Dessin de " — it ends mid-phrase with no subject, making the image inaccessible and indicating incomplete CMS content was faithfully reproduced without a fix.

### `blog/kanban-gestion-de-projet`
- **content** @ Blog body — 'Les avantages du Kanban physique' paragraph : The text reads 'notamment des dévelopes de développeurs informatiques' — 'dévelopes' is a garbled/incomplete word (likely meant 'équipes' or 'groupes'). This is a visible typo in the article body.
- **content** @ Article hero — author avatar : The author is listed as 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', suggesting the photo may belong to a different person (likely 'BR' initials). Author name and photo appear mismatched.
- **content** @ Blog body — article body (truncated) : The HTML is visibly truncated mid-sentence ('…c'est un bon support pour débattre. <br/></spa') — the final section 'Le Kanban comme support de communication intermédiaire' is cut off and the closing tags are incomplete, meaning the last section of the article is missing or not rendering.

### `blog/kpi-gestion-de-projet`
- **content** @ Blog post hero — publication date : The displayed publication date is 'Le 1 février 2026', which is more than a year in the future relative to any plausible review date. Unlike minor date variance, a date that far ahead looks like a CMS data-mapping error (year field off by one) and will confuse readers.
- **content** @ Author avatar — hero section : The author is labelled 'Jérôme Dard' but the avatar image URL ends in 'BR-min.jpg', which on the live site corresponds to a different team member (Baptiste Renaut). The name and photo appear mismatched, which is a credibility issue visible to any reader who knows the team.
- **structure** @ Table of contents — Sommaire section : The fourth TOC entry reads 'Quels sont les KPI les plus utilisés ? ‍Les KPI de coûts' — the zero-width joiner character (‍) and line-break text are bleeding into the anchor label, producing a garbled link text that will confuse users and likely break the anchor jump.
- **content** @ Blog body — internal link : The link 'le suivi de votre projet' points to the full airsaas.io absolute URL (https://www.airsaas.io/fr/gestion-de-projet/…) rather than a relative rebuild URL. In the rebuild environment this hardcoded absolute link bypasses the local app and sends users to production, which is inconsistent with every other internal link on the page.

### `blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0`
- **content** @ Section 'La supply chain débute avec les fournisseurs' — body paragraph 1 : Broken French syntax: 'Découvrons quelles techniques Olivier Fiquet qu'il a mise en œuvre' doubles the subject (name + 'qu'il'), producing a grammatically incoherent sentence visible to any French reader.
- **content** @ Section '30 ans pour optimiser la supply chain' — bullet list item 2 : Grammar error: 'la DSI envoie de manière automatiser des prévisions' — 'automatiser' (infinitive) should be 'automatisée' (past participle adjective). Reads as a typo/error in published copy.
- **content** @ Section 'La supply chain débute avec les fournisseurs' — body paragraph 1 : Subject–verb agreement error: 'la tension au sein de la supply chain est monté d'un cran' — 'monté' should be 'montée' to agree with the feminine noun 'tension'.

### `blog/le-diagramme-de-gantt-comment-sen-servir`
- **content** @ Hero / article metadata – publication date : The article displays 'Le 1 février 2026' as its publication date, which is a future date that will look incorrect to readers for an extended period. This is likely a CMS data entry error (e.g. 2026 instead of 2022) and will erode trust.
- **brand** @ Blog body – author avatar : The author is labelled 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', suggesting the photo belongs to a different person (likely Benoit Roux or similar). The name and photo appear mismatched.
- **functional** @ Blog body – internal link 'conduite de projet' : The link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (no locale prefix '/fr/'), which will resolve to a 404 or incorrect route in the Next.js rebuild where all French pages live under '/fr/'.
- **functional** @ Blog body – last paragraph link 'le jalon projet' : The closing link href is '/gestion-de-projet/les-jalons-projet-une-technique-pour-sequencer-vos-projets-intelligemment' (no '/fr/' prefix), which will 404 in the rebuilt site.
- **functional** @ Blog body – Kanban link : The Kanban link uses 'http://www.airsaas.io/…' (HTTP, not HTTPS, and absolute external URL instead of relative internal path). This could trigger mixed-content warnings and breaks locale-prefixed routing.

### `blog/la-revue-de-projet`
- **content** @ Blog body — second paragraph of intro : The sentence 'En plus de l'objectif officiel, cette est un outil de management de projet idéal…' is grammatically broken — 'cette est' is not valid French; a noun is missing after 'cette' (e.g., 'cette réunion est').
- **structure** @ Table of contents / article H3 headings : The TOC contains two entries that are near-duplicates: 'À quoi sert une revue de projet ? Qu'est-ce qu'une revue de projet ?' and then a separate 'À quoi sert une revue de projet ?' — both link to different anchors, suggesting the content section was split into two H3s with effectively the same title, which is confusing and likely unintentional.
- **functional** @ Blog body — internal link in intro paragraph : The link to 'conduite de projet' uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the '/fr/' locale prefix, which will 404 in the rebuilt Next.js app.
- **content** @ Author avatar — hero section : The author avatar image URL points to a Webflow CDN asset (cdn.prod.website-files.com) with the alt text 'Jérôme Dard', but the image filename is 'SV-min.jpg', suggesting this is the wrong person's photo (likely another author's headshot mismapped to Jérôme Dard).

### `blog/le-grand-guide-de-la-conduite-de-projet`
- **content** @ Blog article body — 'Tout savoir sur la note de cadrage projet' H4 section : The anchor link for 'Tout savoir sur la note de cadrage projet' points to '/gestion-de-projet/la-revue-de-projet', which is the URL for a completely different article ('La revue de projet'). The link text and the href are mismatched, sending users to the wrong article.
- **content** @ Blog article body — internal links throughout : All inline article links use relative paths starting with '/gestion-de-projet/...' (e.g. '/gestion-de-projet/comment-mettre-une-demarche-de-projet-dans-mon-entreprise') rather than the rebuilt '/fr/blog/...' structure. These links will 404 in the rebuilt site.
- **content** @ Hero — publication date : The article displays 'Le 1 février 2026', which is a future date significantly beyond typical review windows and likely a data entry error in the CMS (probably meant 2022, matching surrounding content era).

### `blog/le-guide-du-mode-projet`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026', which is a future date more than a year ahead of the current period. While future dates are not automatically flagged, this specific value looks like a data-entry error or CMS mapping bug that would confuse readers and affect SEO freshness signals.
- **content** @ Blog hero — author avatar : The author is labelled 'Jérôme Dard' but the avatar image filename is 'BR-min.jpg', strongly suggesting the photo belongs to a different person ('BR' likely being another author's initials). The name and image are mismatched.
- **functional** @ Blog body — internal link to chef de projet : The link to 'https://www.airsaas.io/gestion-de-projet/comment-etre-un-bon-chef-de-projet-transverse' uses the old Webflow URL scheme (no /fr/ locale prefix, no /blog/ segment). In the rebuild it should point to the equivalent rebuilt route (e.g. /fr/blog/...) to avoid a 404 or redirect loop.
- **content** @ Blog body — paragraph introducing the three characteristics : The sentence reads 'Le fonctionnement en mode projet peut être décrit par<strong></strong>trois caractéristiques' — an empty <strong> tag produces a missing space before 'trois', so it renders as 'par trois' with no space. This is a visible typographic defect in the rendered page.

### `blog/le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation`
- **content** @ Blog hero — internal link in article body : The article body contains a relative link '/gestion-de-projet/portfolio-project-management-le-top-10-des-bonnes-pratiques' (without the '/fr/blog' prefix), which will 404 in the rebuild. The path should be '/fr/blog/gestion-de-projet/portfolio-project-management-le-top-10-des-bonnes-pratiques' or the equivalent rebuild URL.
- **content** @ Blog body — 'Résistance au changement' counter-argument (pro section) : The text contains a typo: 'on vous reccomande' (double 'c') and references 'le Blog Pro de la Transfo - article Pilotage de projet ce qui a changé en 2023' without any hyperlink, leaving a dangling cross-reference that reads as broken editorial copy.

### `blog/le-modele-de-presentation-pour-votre-comite-de-pilotage`
- **content** @ Blog hero — author avatar : The author photo URL points to a Webflow CDN image labelled 'BR-min.jpg' which appears to be a different person's photo (initials BR) displayed under the name 'Jérôme Dard'. The avatar does not match the credited author.
- **content** @ Blog body — intro paragraph : Typo in body copy: 'mennent' should be 'mènent' ('Un bon chef de projet sait que l'anticipation et la préparation sont des valeurs essentielles qui mennent au succès'). This is a visible spelling error in a prominent early paragraph.
- **structure** @ Table of contents / blog body — heading hierarchy : The article starts directly at H3 level ('Qu'est-ce qu'un comité de pilotage ?') with no H2 wrapping sections, making the ToC anchor to an H3. The ToC is rendered as an H2-level 'Sommaire' but its entries map to H3s — the hierarchy is inconsistent and will confuse screen readers and SEO crawlers.
- **content** @ Table of contents : The ToC lists only 3 entries but the article contains several H4 sub-sections (e.g. 'Soyez l'ambassadeur de votre projet !'). More critically the article body contains no section matching the slug '#le-déroulement-dun-comité-de-pilotage-projet' — the anchor ID on the H3 uses a different auto-generated slug format, meaning the ToC link is likely broken.

### `blog/le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes`
- **content** @ Internal link in body — 'grand guide de la conduite de projet' : The internal link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing the '/fr/' locale prefix), which will 404 in the rebuilt Next.js app. All other internal links in the page correctly use '/fr/…'.
- **content** @ Intro paragraph — '5 leviers' section lead-in : The sentence reads 'Découvrez icinotre sélection' — 'ici' and 'notre' are concatenated with no space, making it visibly broken copy ('icinotre').
- **content** @ First body paragraph — opening sentence : The opening reads 'Pas de<strong></strong>bonne exécution<strong></strong>de stratégie…' — two empty <strong> tags surround nothing, producing 'Pas de bonne exécution de stratégie' with invisible but semantically broken bold spans. The intended bold words appear to have been lost, leaving the emphasis missing entirely.

### `blog/lean-portfolio-management`
- **content** @ Callout aside / quote block — SAFe DSI quote : The quoted DSI testimony ends abruptly mid-sentence: '…Tu peux organiser en SAFE un département... mais toute l'entreprise sur du vertical,' — the sentence is clearly truncated with no closing clause or attribution, leaving the reader hanging.
- **content** @ Blog body — intro paragraph, first sentence : There is an empty <strong></strong> tag creating a missing space between 'priorisation' and 'et': renders as 'priorisationet' visually, breaking the sentence readability.
- **content** @ Book link — 'The machine that changed the world' : The hyperlink for the book reference points to '#' (a dead anchor), not the actual book or an external resource; this is a non-functional link presented as a meaningful reference.

### `blog/les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026' as its publication date, which is a clearly future date far beyond any reasonable review window for this article (originally published in 2022/2023). This is likely a CMS mapping error producing a wrong date rather than a valid future-dated post.
- **functional** @ Blog body — internal link (guide des 10 bonnes pratiques) : The link '/gestion-de-projet/portfolio-project-management-le-top-10-des-bonnes-pratiques' uses a relative path without the '/fr/' locale prefix, which will 404 or redirect incorrectly in the Next.js i18n routing setup.
- **structure** @ Blog body — heading hierarchy : The article body uses H3 tags for all 10 numbered section headings, but the 'Sommaire' section above is an H2, and there are no H2s used as structural parents within the article body itself. While the blog body heading downshift is noted as intentional, here H3s are used as top-level section headings immediately under the H1 with no intervening H2, creating a logical gap in document outline (H1 → H3 with no H2 in article body).

### `blog/macro-planning`
- **content** @ Blog article body — internal link : The first paragraph links to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (relative, no locale prefix) and '/fr/solution/rapport-flash', while other internal links use absolute 'https://www.airsaas.io/gestion-de-projet/…' — inconsistent and potentially broken routing in the rebuilt Next.js app where locale-prefixed paths are required.
- **content** @ Blog article body — competitor mention : The article explicitly recommends 'Trello ou Asana' as project management tools in the 'outils-clés' section, with no counter-mention of AirSaas. For a product blog, surfacing direct competitors without positioning AirSaas is a brand issue that should be reviewed.
- **content** @ Blog article body — typo in body copy : In the 'Etablir des dépendances' list item: 'si elles existents' contains a grammatical error (spurious 't' — should be 'existent'). This is a content bug visible to readers.
- **content** @ Blog article body — missing space in strong/link concat : In the ordered list step 1: '…phases principales**qui constitueront…**' — there is no space between the bold segment 'principales' and 'qui', making the sentence run together visibly on screen: 'phases principalesqui constitueront'.

### `blog/management-de-portefeuille-de-projet`
- **structure** @ Blog body — first content section heading : The first content section ('Qu'est-ce que la gestion de portefeuille de projets ?') uses an <h3> tag instead of <h2>, breaking the heading hierarchy directly after the <h2> Sommaire. Blog body sections should start at <h2> (or at minimum be consistent with the table-of-contents anchors which imply top-level sections).
- **content** @ Blog hero — publication date : The publication date shown is '17 septembre 2025', which is in the future relative to any plausible current review date. While future dates are flagged as acceptable for display, here the article contains fully written, detailed content — an obviously backdated or mis-set CMS date that could undermine reader trust and SEO freshness signals.
- **content** @ Section 'Ce que la gestion de portefeuille de projets permet' — paragraph before bullet list : The paragraph 'Ce que la gestion de portefeuille de projets permet' is rendered as a plain <p> tag rather than a heading or visually distinct label. It reads like an orphaned heading copy that lost its formatting, appearing as floating plain text before the bullet list.

### `blog/pi-planning`
- **content** @ Third 'À retenir' callout (after SAFe/PI duration paragraph) : Expert quote truncated mid-sentence: '…Les valeurs temporelles comme le trimestre sont très a' — text ends abruptly, suggesting the CMS rich-text-to-HTML render is consistently clipping quote content.
- **content** @ Fourth 'À retenir' callout (after quarterly rhythm paragraph) : Expert quote truncated mid-sentence: '…dans un contexte de gestion de portefeuille de projets, il peut' — same pattern of clipped callout content repeated throughout the article.
- **content** @ Fifth 'À retenir' callout (after PI Planning budget paragraph) : Expert quote truncated mid-sentence: '…on voit tout passer : les capacités comme le budget à attribuer' — all 'À retenir' expert-quote callouts in the article are being cut off, indicating a systemic rendering bug in the callout component's text truncation.
- **functional** @ Internal blog link — 'nos 8 essentiels pour réussir votre PI SAFe' : The link points to '/fr/gestion-de-projet/pi-safe' which is the live Webflow URL path, but the rebuild uses '/fr/blog/' as its base path. This internal cross-link likely 404s in the rebuild environment.

### `blog/metier-pmo`
- **content** @ Blockquote — 'L'explosion du nombre de projets transverses' : The blockquote attribution reads 'Bertran Ruiz, CEO AirSaas' — the correct spelling of the CEO's name is 'Bertrand Ruiz' (with a 'd'). This is a visible misspelling of a named executive.
- **structure** @ Blog body — 'Le nouveau rôle du métier de PMO' section : Two consecutive H4 headings appear with no intervening content: 'La posture' is immediately followed by 'Leadership' without any paragraph between them. 'La posture' is effectively an empty heading, which looks broken and confuses the reading hierarchy.
- **structure** @ Blog body — 'Les outils et ressources clés' section : The H4 'Les outils et ressources clés' is immediately followed by another H4 'Gestion de projet' with no introductory content, and 'Ses méthodologies' has the same pattern with 'Optimiser le best effort'. These empty parent headings create a confusing hierarchy where subheadings orphan their parent.
- **content** @ Blog body — end of visible content (TRUNCATED) : The HTML is truncated mid-sentence: '…L'automatisation alimente les outils projet individuels vers des'. It is impossible to verify whether subsequent sections (reporting PMO, FAQ, CTA) are present and complete — a critical content completeness risk.

### `blog/pi-safe`
- **functional** @ CTA button after PI Planning definition section : A primary button labelled 'Télécharger' (Download) links to '/fr/meetings-pages' — a demo-request page. The label does not match the destination and is contextually confusing mid-article; there is no download resource on that target page.
- **structure** @ Blog article body — heading hierarchy : The article opens directly with H3 ('Qu'appelle-t-on PI SAFe ?') as the first structural heading inside the body, with no H2. The page H1 is in the hero; the body should use H2 for top-level sections and H3 for sub-sections, not skip a level.

### `blog/pilotage-de-projet`
- **content** @ Blog body – internal link to conduite de projet : The link to the 'conduite de projet' guide uses a root-relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the '/fr/' locale prefix, which will result in a 404 or incorrect route for French visitors.
- **content** @ Blog body – internal links to airsaas.io articles : Several internal links use absolute URLs pointing to 'https://www.airsaas.io/gestion-de-projet/...' (without locale) rather than relative '/fr/...' paths, risking broken links and locale mismatch.
- **content** @ Blog body – empty <strong> tags : Multiple <strong></strong> empty inline elements appear throughout the body copy (e.g., after 'créé' in the intro and after 'individuel et collectif'), rendering as invisible content gaps that suggest missing bolded text was lost during migration.
- **content** @ Blog body – paragraph with zero-width space : A standalone paragraph containing only a '‍' (zero-width joiner) renders as a blank paragraph, indicating a Webflow CMS artefact that should be stripped rather than rendered.
- **content** @ Blog body – editorial aside '(Note du rédacteur)' : The parenthetical '(Note du rédacteur : Je vous propose de relire la phrase ci-dessus une seconde fois ! :-)' is rendered as a plain paragraph with no visual distinction, which looks like an editorial note accidentally left in production copy.

### `blog/planification-de-la-capacite`
- **functional** @ Inline CTA button inside body content (after 'Jouez collectif' paragraph) : The CTA button is labelled 'Télécharger' but links to '/fr/meetings-pages' (a demo/meetings page). The label does not match the destination — there is nothing to download there, and the button purpose is unclear in this editorial context.
- **content** @ Blog list under 'Une brève définition de la planification de la capacité' : The bulleted list of resource types contains only two items ('Les ressources financières' and 'Les ressources humaines') but the source article also lists material/technological resources. The list appears truncated, cutting meaningful content.
- **content** @ Body content — 'Adopter un outil adapté' section : The HTML is truncated mid-sentence ('nous avons') — the article body is cut off and the remainder of the page content (likely including the 8th best practice and the conclusion) is missing from the render.
- **content** @ Bullet point — 'Être prêt à accueillir une variation de la demande' : Missing space between the bold text and the following word: 'accueillir une variation de la demande' is followed immediately by 'sur une période donnée' without a separating space, creating a run-on rendering glitch.

### `blog/plan-de-communication-projet`
- **content** @ Blog hero – publication date : The article displays 'Le 1 février 2026', a date well in the future relative to the current period. Unlike the system-prompt exemption (which covers dates that are merely past/future at review time), this specific date is implausible for a live article and is likely a CMS field mapping error (e.g., a mis-mapped or default future timestamp).
- **functional** @ Blog body – internal link 'conduite de projet' : The anchor href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (no locale prefix), whereas all other internal links use '/fr/…'. This will likely 404 or redirect incorrectly in the locale-aware Next.js routing.
- **functional** @ Blog body – internal link 'cadrage' and 'plan de communication projet' : Two more internal links point to 'https://www.airsaas.io/gestion-de-projet/…' (absolute live domain, no locale) instead of relative '/fr/…' paths. In the rebuild environment these will bypass the local server entirely and may break in production locale routing.
- **content** @ Blog body – paragraph 'Sui dit quoi' : The copy reads 'Sui dit quoi, à qui…' — 'Sui' is a clear typo for 'Qui'. This is a visible spelling error in a prominent explanatory sentence.

### `blog/plan-capacitaire`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026', which is several months in the future relative to any plausible review date in 2025. While future dates alone are not flagged per guidelines, this particular date combined with the fact that the live URL already exists suggests the CMS date field was set incorrectly (likely meant 2025). Worth verifying against the source CMS entry before shipping.
- **content** @ Body content — list item spacing (missing space before <strong>) : Several bullet-point list items are missing a space between the preceding word and the opening <strong> tag, producing run-together text such as 'inventaire des ressources disponibles</strong>dans votre entreprise' and 'd'un groupe de quelques expertshayant'. This creates readability-breaking merged words visible to users.
- **structure** @ Blog body — heading hierarchy : The article jumps from H1 (hero) directly to H3 ('Qu'est-ce qu'un plan capacitaire ?') and then uses H4 for sub-sections, skipping H2 entirely in the body. The TOC section uses an H2 ('Sommaire') but the content itself has no H2, which breaks logical document outline and can harm SEO/accessibility.
- **functional** @ Internal link in body — 'notre article sur le sujet' : The anchor points to 'https://www.airsaas.io/fr/gestion-de-projet/capacity-planning-definition' (absolute production URL with a different path structure). In the rebuild environment this is a hard-coded external link rather than an internal relative path, meaning it bypasses the rebuild's routing and sends users away from localhost/staging.

### `blog/planification-de-la-demande-capacity-planning`
- **functional** @ Blog body — inline CTA button after capacity planning image : The CTA button is labelled 'Télécharger' (download) but links to '/fr/meetings-pages' (demo booking page). The label does not match the destination, misleading users who expect a downloadable resource.
- **functional** @ Blog body — internal link to Airsaas capacity planning product page : The link 'découvrir la solution Airsaas et ses fonctionnalités de capacitaire macro' points to 'https://www.airsaas.io/fr/produit/capacity-planning' (absolute live URL) instead of a relative internal path, and the final CTA 'Demandez une démo Airsaas' also uses an absolute live domain rather than the rebuilt site's relative URL, breaking consistency and potentially bypassing the rebuild in staging.
- **functional** @ CTA section — animated floating card (bottom-right decoration) : The decorative floating card renders an empty Font Awesome icon glyph as a blank space because the Font Awesome Duotone font is not loaded; the icon area is visually blank, making the floating widget look broken to users.
- **functional** @ CTA section — 'Réserver une démo' button : The button is wrapped in a div with 'opacity-0 scale-[0.92]' and no JS-triggered class swap visible in the static HTML, meaning the primary CTA may remain invisible to users if the animation entrance script fails or is not present.

### `blog/pourquoi-mettre-en-place-un-pmo`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026', which is a future date far beyond any plausible review window. This is likely a data-mapping bug assigning the wrong date field (e.g., a scheduled or updated date instead of the published date), and will appear wrong to readers.
- **structure** @ Blog body — heading hierarchy : The article content jumps directly from H1 (article title) to H3 for all section headings with no H2 intermediate level. While the blog body intentionally uses smaller headings, the ToC section uses an H2 ('Sommaire') and the body sections should be H2 to maintain logical document outline; using H3 creates a broken heading hierarchy for screen readers and SEO.
- **functional** @ Blog body — internal link to /fr/gestion-de-projet/metier-pmo : The anchor inside the body text links to 'https://www.airsaas.io/fr/gestion-de-projet/metier-pmo' (absolute production URL) rather than a relative path. This hardcoded external URL will bypass the rebuild's routing and send users to the live site, breaking navigation context and analytics.

### `blog/portefeuille-projet`
- **brand** @ Blog hero — author badge : 'Jonas Roman' appears to be a fabricated placeholder name — the image URL explicitly contains 'Jérôme', which is the likely real author. This is a credibility issue visible to every reader of the article.
- **typography** @ Blog body — table headers (both comparison tables) : Table <th> elements use 'bg-primary' background but carry 'text-paragraph' which is a font-size token, not a color token — no explicit text color class is present. On a purple/lavender background this likely renders dark text on a dark background, making column headers illegible.

### `blog/pourquoi-vos-18-millions`
- **structure** @ Blog body section headings : All major article section headings (e.g., 'Pourquoi vos 18 millions…', 'L'illusion du pilotage stratégique', etc.) are rendered as <h3> despite being the top-level content sections under the <h1> — they should be <h2> for correct semantic hierarchy (H1 → H2 → H3).
- **content** @ Second 'À retenir' callout box (L'illusion du pilotage stratégique section) : The quoted testimonial ends with 'DG, groupe technologique, 1 400 salariés' run directly into the quote text with no punctuation or visual separator, making it unclear where the quote ends and the attribution begins — it reads as one unbroken sentence.
- **content** @ Fourth 'À retenir' callout box (CRM/finance/data section) : The testimonial ends abruptly with 'COO, ETI de service' — the attribution is incomplete (no company name or context) and follows no quotation mark or closing punctuation, making the sourcing look truncated.

### `blog/preparer-comite-de-pilotage-d-un-projet`
- **content** @ Blog article internal link — first paragraph : The link to the series article uses a relative path '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' (missing the '/fr/' locale prefix), which will result in a 404 on the rebuilt Next.js site that uses locale-prefixed routing.
- **content** @ Hero — publication date : The article displays 'Le 1 février 2026' as a future publication date. While future dates are noted as acceptable, this specific date (over a year ahead) is likely a data-mapping bug pulling the wrong field rather than an intentional date.
- **content** @ Blog body — 'Planifier le Copil longtemps à l'avance' subsection : The H4 heading 'Planifier le Copil longtemps à l'avance' is immediately followed only by an image block and then jumps straight to the next H4 ('S'assurer de la présence…'), with no body copy under it. The section appears truncated — its explanatory paragraph is missing.

### `blog/project-portfolio-management`
- **functional** @ Blog body — internal link in section 2 : The 'Pour aller plus loin' link in section 2 points to '/gestion-de-projet/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets' — it is missing the '/fr/blog' prefix used by the rebuild, which will produce a 404.
- **content** @ Hero — publication date : The article displays 'Le 1 février 2026', which is a future date relative to any plausible review window. This is an incorrect CMS date value that will confuse readers into thinking the article has not yet been published.
- **content** @ Blog body — section 1, paragraph about ERP program names : 'Le programme ERP, SI Finance, ERP ne fera jamais rêver !' repeats 'ERP' twice in the same sentence (ERP … SI Finance, ERP), suggesting a copy/paste error in the source that the rebuild faithfully carries and which reads as a typo to users.

### `blog/program-increment-planning`
- **content** @ Third 'À retenir' callout box (under 'PI Planning et framework SAFe') : Expert quote is truncated: 'Les valeurs temporelles comme le trimestre sont très a' cuts off before completing the sentence. Pattern of truncated callout quotes repeats across the article.
- **content** @ Fourth 'À retenir' callout box (after quarterly rhythm paragraph) : Expert quote is truncated: '…dans un contexte de gestion de portefeuille de projets, il peut' ends abruptly. Same truncation pattern — likely a character-limit bug in the callout component's CMS field rendering.
- **content** @ Fifth 'À retenir' callout box (under 'Quels sont les bénéfices d'un PI Planning ?') : Expert quote is truncated: '…on voit tout passer : les capacités comme le budget à attribuer' ends without completing the thought. All 'À retenir' callout blocks throughout the article share this consistent truncation bug.
- **structure** @ Blog article body — heading hierarchy : The article body jumps directly from H1 (hero) to H3 section headings, then H4 sub-headings, with no H2 used inside the article body. The 'Sommaire' section uses an H2 but the article content sections use H3 as top-level, creating a skipped H2 level in the document outline that harms accessibility and SEO.

### `blog/reporting-pmo`
- **content** @ Blog hero — publication date : The article shows 'Le 1 février 2026', which is a future date more than a year ahead of any plausible review cycle. This is likely a data-entry error in the CMS (should be 2024 or earlier based on the content) and will confuse readers.
- **content** @ Body — Question 5 / Paracelse attribution : Paracelse (Paracelsus) is described as a 'médecin et alchimiste Russe' — he was Swiss-German, not Russian. This is a factual error in the body copy that will undermine credibility.
- **structure** @ Blog body — heading hierarchy : The article body starts directly with an H3 ('Qu'est-ce qu'un reporting projet…') without any H2 wrapper. The blog section structure jumps H1 → H3, skipping H2 entirely in the content area, which is an illogical heading hierarchy (not covered by the intentional blog-body H3 downshift exception, since the sommaire section already uses H2 for 'Sommaire').
- **content** @ Body — 9 critères-clés section (truncated) : The HTML is truncated mid-section inside '9 critères-clés pour un reporting PMO efficace' — the ordered list content is cut off with 'flex items-start' mid-attribute. It is impossible to verify whether this section renders completely; if the truncation reflects actual missing content in the render, this is a blocking content gap.

### `blog/tout-savoir-sur-la-note-de-cadrage-projet`
- **content** @ Blog body — 'Description du projet et des livrables inclus' paragraph : The word 'quantité' appears twice in immediate succession ('la quantité, la quantité, la longueur…'), which is clearly a copy-paste error that makes the sentence nonsensical. One instance should be replaced with a different dimension (e.g., 'qualité' or 'format').
- **functional** @ Blog body — intro paragraph, link to 'conduite de projet' : The internal link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing the '/fr/' locale prefix), while all other internal links correctly use '/fr/…'. This will result in a 404 for French-locale users.
- **functional** @ Blog body — 'À quoi sert une note de cadrage?' section, budget link : The budget link href is 'https://www.airsaas.io/gestion-de-projet/budgetiser-un-projet-sans-se-louper' (absolute URL missing '/fr/' locale). It will route outside the rebuild and lands on a non-localised path, inconsistent with all other absolute links on the page.

### `blog/role-du-pmo`
- **structure** @ Blog body — section headings : The blog body uses H3 as the top-level section headings (e.g., 'Les symptômes d'un PMO dysfonctionnel') and H4 for subsections, yet the page already has an H1 and an H2 ('Sommaire'). This is intentional only for the sommaire H2; the body section headings should start at H2 (not H3) to maintain a logical hierarchy — H1 → H2 (body sections) → H3 (subsections). As rendered, the body starts at H3 creating a gap after H2='Sommaire'.
- **functional** @ Blog body — internal links : Links to '/fr/gestion-de-projet/metier-pmo', '/fr/gestion-de-projet/pourquoi-mettre-en-place-un-pmo', and the reporting-pmo page still point to the original live-site URL path (/fr/gestion-de-projet/…) rather than the rebuilt blog path (/fr/blog/…), and one link ('https://www.airsaas.io/fr/gestion-de-projet/reporting-pmo') is a hardcoded absolute URL to the live domain inside the rebuild, which will redirect users away from localhost.
- **content** @ Blog hero — publication date : The displayed publication date is 'Le 1 février 2026', which is a future date significantly ahead of the article's original publish date. While the system prompt says not to flag future dates as fabricated, this specific value looks like a data-mapping error (year 2026 instead of 2023) that would be user-visible and misleading.

### `blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets`
- **content** @ Blog hero – publication date : The article displays 'Le 1 février 2026' as its publication date, which is over a year in the future relative to the current period. This is likely a data mapping or CMS field error (e.g. using an 'updated' or wrong date field) and will appear incorrect to readers.
- **structure** @ Blog body – heading hierarchy : The article body jumps directly from H1 (hero title) to H3 ('PPM : trois innovations qui font la différence') without an intervening H2, then uses H4 for all sub-sections. This breaks the semantic heading hierarchy and harms accessibility/SEO.
- **content** @ Blog body – figure caption (KISS image) : The caption reads 'L'un des meilleurs conseils produigué :-)' — 'produigué' is a misspelling of 'prodigué'. This typo is visible in the published article.
- **content** @ Blog body – figure caption (ROBOTS image) : The caption reads 'Accélération digitale / Transformation et changement sont le quotidient des organisations' — 'quotidient' is a misspelling of 'quotidien'. This is a visible typo in the published article.

## All pages

| Slug | Type | Status | P0 | P1 | P2 | Note |
|---|---|---|---|---|---|---|
| `la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0` | blog | BLOCK | 3 | 3 | 2 |  |
| `pourquoi-vos-18-millions` | blog | BLOCK | 3 | 3 | 2 |  |
| `pi-safe` | blog | BLOCK | 3 | 2 | 2 |  |
| `gestion-portefeuille-projet` | solution | BLOCK | 2 | 4 | 2 |  |
| `outils-de-pilotage-projet` | solution | BLOCK | 2 | 4 | 2 |  |
| `pi-planning` | blog | BLOCK | 2 | 4 | 2 |  |
| `program-increment-planning` | blog | BLOCK | 2 | 4 | 2 |  |
| `automatiser-la-com-projet` | produit | BLOCK | 2 | 3 | 2 |  |
| `capacity-planning` | produit | BLOCK | 2 | 3 | 2 |  |
| `comment-decider-en-copil` | blog | BLOCK | 2 | 3 | 3 |  |
| `traduction-one-click-avec-deepl` | produit | BLOCK | 1 | 5 | 2 |  |
| `le-diagramme-de-gantt-comment-sen-servir` | blog | BLOCK | 1 | 5 | 2 |  |
| `pilotage-de-projet` | blog | BLOCK | 1 | 5 | 2 |  |
| `flash-report` | solution | BLOCK | 1 | 4 | 3 |  |
| `management-de-portefeuille-projet` | solution | BLOCK | 1 | 4 | 1 |  |
| `portfolio-management` | solution | BLOCK | 1 | 4 | 3 |  |
| `comite-direction` | equipe | BLOCK | 1 | 4 | 3 |  |
| `outil-pmo` | equipe | BLOCK | 1 | 4 | 3 |  |
| `trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets` | blog | BLOCK | 1 | 4 | 3 |  |
| `it-et-operation` | equipe | BLOCK | 1 | 3 | 2 |  |
| `cadrage-projet` | blog | BLOCK | 1 | 3 | 2 |  |
| `comite-de-pilotage-definitions-et-incomprehensions` | blog | BLOCK | 1 | 3 | 0 |  |
| `gestion-de-portefeuille-projet-pme` | blog | BLOCK | 1 | 3 | 1 |  |
| `management-de-portefeuille-de-projet` | blog | BLOCK | 1 | 3 | 2 |  |
| `budgetiser-un-projet-sans-se-louper` | blog | BLOCK | 1 | 2 | 1 |  |
| `portefeuille-projet` | blog | BLOCK | 1 | 2 | 1 |  |
| `outil-ppm` | solution | WARN | 0 | 6 | 2 |  |
| `pi-planning` | lp | WARN | 0 | 5 | 3 |  |
| `airsaas-et-les-experts-de-la-transfo` | solution | WARN | 0 | 5 | 2 |  |
| `flash-report-projet` | solution | WARN | 0 | 5 | 3 |  |
| `tableau-de-bord-dsi` | solution | WARN | 0 | 5 | 3 |  |
| `tableau-de-bord-gestion-de-projet` | solution | WARN | 0 | 5 | 3 |  |
| `analyse-des-risques-projet` | blog | WARN | 0 | 5 | 3 |  |
| `capacity-planning` | blog | WARN | 0 | 5 | 3 |  |
| `demarche-de-projet` | blog | WARN | 0 | 5 | 3 |  |
| `capacity-planning` | lp | WARN | 0 | 4 | 3 |  |
| `ppm` | lp | WARN | 0 | 4 | 3 |  |
| `budget` | produit | WARN | 0 | 4 | 4 |  |
| `tableau-de-bord-portefeuille-de-projet` | solution | WARN | 0 | 4 | 4 |  |
| `appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management` | blog | WARN | 0 | 4 | 4 |  |
| `budget-previsionnel-projet` | blog | WARN | 0 | 4 | 3 |  |
| `chef-de-projet-transverse` | blog | WARN | 0 | 4 | 4 |  |
| `comment-animer-un-comite-de-pilotage` | blog | WARN | 0 | 4 | 3 |  |
| `comment-mettre-en-place-un-comite-de-pilotage` | blog | WARN | 0 | 4 | 4 |  |
| `comment-mettre-une-bonne-meteo-projet` | blog | WARN | 0 | 4 | 4 |  |
| `jalon-projet` | blog | WARN | 0 | 4 | 4 |  |
| `kpi-gestion-de-projet` | blog | WARN | 0 | 4 | 3 |  |
| `la-revue-de-projet` | blog | WARN | 0 | 4 | 4 |  |
| `le-guide-du-mode-projet` | blog | WARN | 0 | 4 | 3 |  |
| `le-modele-de-presentation-pour-votre-comite-de-pilotage` | blog | WARN | 0 | 4 | 4 |  |
| `macro-planning` | blog | WARN | 0 | 4 | 4 |  |
| `metier-pmo` | blog | WARN | 0 | 4 | 4 |  |
| `planification-de-la-capacite` | blog | WARN | 0 | 4 | 3 |  |
| `plan-de-communication-projet` | blog | WARN | 0 | 4 | 4 |  |
| `plan-capacitaire` | blog | WARN | 0 | 4 | 4 |  |
| `planification-de-la-demande-capacity-planning` | blog | WARN | 0 | 4 | 4 |  |
| `reporting-pmo` | blog | WARN | 0 | 4 | 4 |  |
| `pmo` | lp | WARN | 0 | 3 | 3 |  |
| `priorisation-par-equipes` | produit | WARN | 0 | 3 | 3 |  |
| `reporting-projet` | produit | WARN | 0 | 3 | 4 |  |
| `revue-de-portefeuille` | solution | WARN | 0 | 3 | 5 |  |
| `direction-de-la-transformation` | equipe | WARN | 0 | 3 | 3 |  |
| `10-pratiques-pour-developper-la-relation-de-confiance-dg-cio` | blog | WARN | 0 | 3 | 4 |  |
| `capacity-planning-definition` | blog | WARN | 0 | 3 | 4 |  |
| `comment-animer-un-bilan-projet-efficace` | blog | WARN | 0 | 3 | 3 |  |
| `comment-faire-un-bon-point-davancement-projet` | blog | WARN | 0 | 3 | 3 |  |
| `comment-elaborer-un-reporting-efficace` | blog | WARN | 0 | 3 | 4 |  |
| `comment-gerer-lagressivite-dans-les-comites-de-pilotage` | blog | WARN | 0 | 3 | 4 |  |
| `comment-mettre-en-place-un-pmo` | blog | WARN | 0 | 3 | 4 |  |
| `comment-reussir-un-projet-transverse` | blog | WARN | 0 | 3 | 4 |  |
| `copil-projet-ou-comite-de-pilotage-projet-les-bases` | blog | WARN | 0 | 3 | 3 |  |
| `fiche-projet-exemple-et-methodologie` | blog | WARN | 0 | 3 | 5 |  |
| `gestion-portefeuille-projets-vs-gestion-de-projet` | blog | WARN | 0 | 3 | 3 |  |
| `kanban-gestion-de-projet` | blog | WARN | 0 | 3 | 3 |  |
| `le-grand-guide-de-la-conduite-de-projet` | blog | WARN | 0 | 3 | 4 |  |
| `le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes` | blog | WARN | 0 | 3 | 4 |  |
| `lean-portfolio-management` | blog | WARN | 0 | 3 | 3 |  |
| `les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet` | blog | WARN | 0 | 3 | 4 |  |
| `pourquoi-mettre-en-place-un-pmo` | blog | WARN | 0 | 3 | 3 |  |
| `preparer-comite-de-pilotage-d-un-projet` | blog | WARN | 0 | 3 | 3 |  |
| `project-portfolio-management` | blog | WARN | 0 | 3 | 3 |  |
| `tout-savoir-sur-la-note-de-cadrage-projet` | blog | WARN | 0 | 3 | 4 |  |
| `role-du-pmo` | blog | WARN | 0 | 3 | 5 |  |
| `comite-pilotage-projet` | blog | PASS | 0 | 2 | 3 |  |
| `comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022` | blog | PASS | 0 | 2 | 4 |  |
| `le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation` | blog | PASS | 0 | 2 | 4 |  |
| `chef-de-projet-pmo` | blog | PASS | 0 | 0 | 0 | parse: invalid JSON: Expected ',' or '}' after property value in JSON at position 1891 (line 31 column 87) |
| `retour-sur-agile-en-seine-2023` | blog | PASS | 0 | 0 | 0 | parse: invalid JSON: Expected ',' or '}' after property value in JSON at position 3006 (line 49 column 35) |
