# QA report — LLM (qa-llm.mjs)

**Date** : 2026-04-28T12:17:04.410Z
**Model** : claude-sonnet-4-6

**Total** : 88 pages — **3 PASS** / 61 WARN / 24 BLOCK / 0 ERR

**Severity totals** : P0 = 44, P1 = 313, P2 = 269

## P0 issues — must fix before ship

### `produit/automatiser-la-com-projet`

- **content @ Page body / main content sections** : The page body contains only two sections: the hero and a single feature block ('Ajoutez les sponsors sur vos projets'), then jumps directly to the footer. The live page has multiple feature sections explaining the health-check email product. The rebuild is missing the vast majority of page content, making this page essentially a stub.

### `produit/capacity-planning`

- **content @ Section 'Mise en place rapide, simple à maintenir dans le temps'** : The section body is truncated mid-thought: it announces 'nous avons pris le parti suivant :' but the actual parti/approach is never stated, then jumps to 'Voici comment nous le concrétisons.' with no preceding content. The core message is missing — this reads as a stub with placeholder copy.

### `solution/flash-report`

- **content @ Section 'Plus qu'une solution de reporting flash : une solution de gouvernance projet complète'** : The paragraph body reads 'En du flash report automatisé…' — this is clearly truncated/broken copy. The sentence is missing a word after 'En' (likely 'dehors du' or 'plus du'), making the sentence grammatically broken and nonsensical to readers.

### `solution/management-de-portefeuille-projet`

- **content @ Section 'Les 5 règles d'or d'un bon management de portefeuille projet'** : The heading promises '5 règles d'or' but the section body contains only a single intro paragraph — the five rules themselves are entirely missing. This is a stub/incomplete section visible to all users.

### `solution/outil-ppm`

- **structure @ Hero section / page top** : The hero section contains no image, screenshot, or visual illustration of the product — the section renders as pure text with a single CTA button and large empty white space below, making the page feel broken and incomplete compared to a typical solution landing page.

### `solution/portfolio-management`

- **content @ Section 'Un capacity planning par équipe simple et actionnable'** : The section body ends with a dangling colon ('pour prendre les décisions :') indicating a list or bullet points should follow, but no content renders. The capacity planning feature content (charts, list items, or cards) is entirely missing.
- **content @ Section '5 bonnes pratiques de portfolio management'** : The heading promises five best practices but none are rendered — only an intro paragraph appears. The five practice cards or items are completely absent, leaving an empty stub section.
- **content @ Section 'Laissez nos clients vous parler d'AirSaas'** : The testimonials section renders only an intro paragraph with zero testimonial cards, quotes, or customer attributions. This is a user-visible empty section on a solution page.
- **content @ Section 'Grâce à sa marketplace AirSaas s'intègre nativement à vos outils du quotidien'** : The integrations section shows only an intro paragraph — no integration logos, cards, or grid are rendered. The actual integration showcase content is missing entirely.

### `solution/tableau-de-bord-dsi`

- **content @ Section 'Embarquez par une bonne communication'** : The body content of this feature section is completely empty — the rich-text div renders nothing inside it. Users see a heading with an image but zero explanatory copy, making the section meaningless.

### `solution/tableau-de-bord-gestion-de-projet`

- **structure @ Hero section / page-level** : The page has an H1 but the bulk of the content sections (7 consecutive plain-text sections before the feature bento rows) have NO headings at all — they are raw `<p>` blocks styled as body copy with no H2/H3 to anchor them. Readers and search engines cannot parse the content hierarchy; these sections appear as one undifferentiated wall of text.

### `equipe/comite-direction`

- **content @ Integrations section ("Vos équipes vont adorer nos intégrations natives")** : The integrations section contains only a heading and a short descriptive paragraph — there are no integration logos, cards, or visuals. The section is functionally empty/stub and offers no actual content to the user.
- **content @ Testimonials section ("Laissez nos clients vous parler d'AirSaas")** : The testimonials section contains only a heading and an introductory paragraph — no actual testimonial cards, quotes, videos, or customer names are rendered. The section body is completely missing.
- **content @ "Suivez l'avancée de vos programmes" section** : This section has a heading and a single paragraph of text but no accompanying image or visual — every comparable feature section on the page pairs text with a product screenshot. This section appears truncated/incomplete.

### `solution/tableau-de-bord-portefeuille-de-projet`

- **content @ Section 'Une vue macro au service de votre planification stratégique'** : The 'vue macro' feature block uses the same image as the 'vue timeline' block (Portfolio%20project%20timeline%20view.webp). The macro/strategic planning section should show a portfolio overview screenshot, not a timeline view — wrong image mapped to wrong feature.

### `equipe/outil-pmo`

- **content @ Section: 'Laissez nos clients vous parler d'AirSaas'** : Testimonials section renders only a heading and an intro paragraph — zero testimonial cards are present. The entire social proof content is missing, making this a visible empty stub.
- **content @ Section: 'Grâce à sa marketplace AirSaas s'intègre nativement à vos outils du quotidien'** : Integration section renders only a heading and a paragraph — no integration logos or cards are displayed below it. The marketplace/integrations content block is completely absent.
- **content @ Section: 'Un capacity planning par équipe simple et actionnable'** : Section body copy ends mid-sentence with a colon ('pour prendre les décisions :') and no continuation — the bullet list or supporting visual that should follow is entirely missing.

### `blog/cadrage-projet`

- **content @ First 'À retenir' aside — section 'Cadrage : l'importance d'un autre rapport au temps'** : The quote inside the aside is visibly truncated mid-sentence: '…sur la questio' — the text cuts off abruptly and the rest of the content is missing, leaving an incomplete and confusing callout for readers.
- **content @ Second 'À retenir' aside — section 'Cadrage : l'importance d'un autre rapport au temps'** : The second blockquote is also truncated mid-word: '…il n'y a pas de valeur derrière ! Et s' — the sentence is unfinished, which is a user-visible content defect that must be fixed before ship.

### `blog/comite-de-pilotage-definitions-et-incomprehensions`

- **content @ Callout aside – 'À retenir' (jalons section)** : The bullet point text is visibly truncated mid-sentence: '…plutôt qu'un immense problème très comp' — the quote/advice is cut off and the full content is missing. This is a content rendering bug, not a source truncation.
- **content @ Callout aside – 'À retenir' (chef de projet section)** : The bullet point text is again truncated mid-sentence: '…un regard critique. Tout doit être dans l'explici' — the callout content is incomplete and will confuse readers.
- **content @ Callout aside – 'À retenir' (key user section)** : The bullet point text is truncated mid-sentence: '…le relais des bonnes pratiques transmises par la DSI : u' — same truncation pattern, indicating a systematic rendering bug in the callout component for long quote strings.

### `blog/comment-decider-en-copil`

- **content @ First 'À retenir' aside (Lionel M. quote)** : The quote from Lionel M. is truncated mid-sentence: '…tu sors parfois de Copil en te disant : on fait' — the sentence ends abruptly with no conclusion, leaving a broken, incomplete quote visible to the user.
- **content @ Second 'À retenir' aside (OCTO Tech quote)** : The OCTO Tech testimonial is truncated mid-sentence: '…Le premier est le relevé de décisions. Cela peut paraître anecdotique, mais nous' — the content is cut off, making the aside appear broken and unprofessional.

### `blog/gestion-de-portefeuille-projet-pme`

- **content @ First 'À retenir' aside (under 'Gestion de portefeuille de projets : définition et usages')** : The callout text ends abruptly mid-sentence: '…Pour réussir à ' with no continuation. The content is visibly truncated and will confuse readers.
- **content @ Third 'À retenir' aside (under benefits section)** : The callout text is cut off mid-word: '…pour des projets qui ont un impac' — clearly a truncated string, not a complete sentence.

### `blog/gestion-portefeuille-projets-vs-gestion-de-projet`

- **content @ Blog hero — author badge** : The author avatar image URL contains 'Avatar%20Je%CC%81ro%CC%82me.png' (Jérôme's photo) but the displayed name is 'Jonas Roman'. Either the author name or the image is wrong — this is a factual mismatch visible to every reader.

### `blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0`

- **content @ À retenir callout boxes (all sections)** : Every 'À retenir' quote is visibly truncated mid-sentence (e.g., '…pour résoudre leurs pro', '…grâce à l'arrivée de l'automatisation', '…car des bancs te'). The quote text is cut off and displayed incomplete to the user, making the callout meaningless and looking broken.

### `blog/management-de-portefeuille-de-projet`

- **content @ Blog hero — author byline** : The author avatar image URL contains 'Avatar%20Je%CC%81ro%CC%82me.png' (Jérôme's photo) but the displayed name is 'Jonas Roman'. A real person's photo is shown under the wrong name, which is a factual error visible to all readers.

### `blog/pi-planning`

- **content @ First 'À retenir' callout box (immediately after intro paragraphs)** : The first expert quote callout is truncated mid-sentence: 'ils apportent aussi leurs bonnes pratiques' ends abruptly with no closing thought. This appears to be a CMS content rendering bug where the expert quote body is cut off and never completed.
- **content @ Second 'À retenir' callout (after PI Planning definition paragraph)** : Expert quote is truncated mid-sentence: 'c'est que les gens qui y participent sont ceux qui y mett' — the sentence is visibly cut off. Multiple callout boxes throughout the article share this same truncation pattern, indicating a systemic CMS field length or render bug.

### `blog/pi-safe`

- **content @ Aside callout — 'À retenir' (first occurrence, after benefits list)** : The callout text is visibly truncated mid-sentence: '…on se focalise sur pourquoi on fait ce pr' — the sentence is cut off and no closing content is rendered. This is a rendering/data truncation bug visible to users.
- **content @ Aside callout — 'À retenir' (second occurrence, after 'Avoir une vision claire')** : The callout text is truncated mid-sentence: '…Il peut s'agir d'une nouvelle réglementation à suivre, de projet' — content is cut off, leaving an incomplete thought visible to users.
- **content @ Aside callout — 'À retenir' (third occurrence, after 'Anticiper les blocages potentiels')** : The callout text is truncated mid-sentence: '…et une estimation "' — the sentence ends abruptly with an open quotation mark, clearly broken content.

### `blog/pilotage-de-projet`

- **content @ À retenir aside — first callout block (MOA-AMOA-MOE section)** : The testimonial/quote inside the callout box is visibly truncated mid-sentence: '…Nous avons mis en place des fo'. The content is cut off abruptly, leaving an incomplete and unpublishable fragment visible to users.
- **content @ À retenir aside — second callout block (chef de projet héros solitaire section)** : The quote inside this callout is also truncated mid-sentence: '…Tout doit être dans l'explic'. A second incomplete quote renders this block broken for readers.
- **content @ À retenir aside — third callout block (méthodes hybrides section)** : Third consecutive truncated callout: '…c'est pas le but de dire "on fait de l'agile pour de l''. The pattern of truncation across all three aside/callout blocks indicates a systematic CMS rendering bug cutting off quoted testimonials.

### `blog/pourquoi-vos-18-millions`

- **content @ À retenir callout — first section** : The first 'À retenir' callout text is truncated mid-sentence: '…Sauf qu'on fait 500 millions de C' — the sentence is cut off and the rest of the content is missing, leaving a broken quote visible to users.
- **content @ À retenir callout — 'L'illusion du pilotage stratégique' section** : The second 'À retenir' callout is also truncated mid-sentence: '…Trois semaines dans une organisation de 2 100 personnes. Chief' — the speaker's title and organisation are cut off, making the quote incomplete and unprofessional.
- **content @ À retenir callout — 'Le mal invisible des COMEX' section (and likely further callouts)** : The HTML truncation note shows the pattern continues ('Nous partageons la même stratégie, mais no…'), strongly indicating multiple additional callout quotes are also cut mid-sentence throughout the article body.

### `blog/program-increment-planning`

- **content @ First 'À retenir' callout (before H3 'Qu'est-ce qu'un PI Planning ?')** : The first expert quote callout is visibly truncated mid-sentence: 'Ils apportent aussi leurs bonnes pratiques' — the sentence ends abruptly with no closing punctuation or continuation. This appears before any section anchor, making it the first substantive callout a reader encounters.
- **content @ Second 'À retenir' callout (after first H3 definition paragraph)** : Expert quote is truncated mid-sentence: 'c'est que les gens qui y participent sont ceux qui y mett' — the word 'mettent' (or similar) is cut off. The CMS excerpt is rendering incomplete text rather than the full quote.

### `blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets`

- **content @ Aside / callout block 'À retenir'** : The single bullet point inside the 'À retenir' aside is visibly truncated mid-sentence: 'Quand on bascule dans le digital, on doit forcément faire attention au parcours utilisateur. L'ergonomie est beaucoup plus importante que dans un système SAP. On va s'intéresser en' — the text ends abruptly with no conclusion, which is user-visible and reads as a broken page.

## P1 issues by page

### `lp/pmo`
- **content** @ FAQ accordion — icon spans : All FAQ question buttons contain an empty <span> intended to render a Font Awesome Duotone icon, but the icon character/glyph is missing — the span renders as a blank gap (≈2.3rem wide) next to every question. Users see an unexplained empty box rather than the intended icon.
- **content** @ Feature section — 'Vision globale du portefeuille' screenshot : The product screenshot used (Portfolio projects kanban status 'en.png') is the English-language UI version, while the entire page is in French. All other feature screenshots appear to use French UI. This creates a visible language inconsistency in a prominent product image.
- **functional** @ Nav CTA — 'Demander une démo' button : The nav bar's 'Demander une démo' button links to '/fr/meetings-pages', which is a plain slug that looks like a routing stub rather than the expected booking/calendar page. The hero CTA 'Réservez une démo' also links there — if this slug is broken or wrong, both primary CTAs are dead.

### `lp/capacity-planning`
- **functional** @ FAQ section — accordion icon spans : The Font Awesome icon spans inside each FAQ accordion button render as empty (no visible icon/glyph). The font-family 'Font Awesome 6 Duotone' is being set via inline style but no icon unicode content is placed inside the span, leaving a blank space where expand/collapse indicators should be.
- **structure** @ Feature sections (Agent IA Brief projet, Agent IA Découpage projet, etc.) : All eight alternating feature sections use H3 headings with no H2 parent grouping them. The page jumps from H1 (hero) directly to the trust-logo H2, then into H3 feature sections with no H2 introducing the feature group, creating a broken heading hierarchy.
- **content** @ Hero section — secondary CTA button : The secondary CTA 'Découvrir le guide Capacity Planning' links to '/fr/livre-blanc/capacity-planning' which is a different page/resource, but it sits visually peer-level with the primary demo CTA and uses an orange-bright color not part of the stated lavender/primary palette, making it look like a brand outlier rather than an intentional secondary action.

### `lp/ppm`
- **structure** @ Feature sections (Flash Report, Roadmap, etc.) : All feature sections use <h3> headings, but the preceding 'Ils nous font confiance' section uses <h2>. There is no <h2> introducing the feature block, so the heading hierarchy jumps from <h1> directly into a trust-logo <h2> and then unexplained <h3>s with no parent <h2> contextualising the feature group — illogical outline for screen readers and SEO.
- **functional** @ Hero — secondary CTA button : The secondary CTA '▶️ Découvrir l'outil PPM en vidéo (5 min)' links to '/fr/video/ppm'. This is a dedicated video page that may not exist in the rebuild (no evidence in the HTML of that route), which would produce a 404 for a prominent hero CTA.
- **content** @ FAQ accordion — all icon spans : Every FAQ toggle button contains an empty <span> intended to render a Font Awesome Duotone icon (font-family set inline), but no icon character/glyph is present — the span is completely empty. Users will see a blank ~37px-wide gap instead of an icon, making the accordion look broken.
- **functional** @ Nav — 'Demander une démo' button : The nav CTA 'Demander une démo' links to '/fr/meetings-pages' while the hero CTA 'Réservez une démo' also links to '/fr/meetings-pages'. Consistent destination is fine, but the nav label says 'Demander' while every other CTA on the page says 'Réservez' — inconsistent verb creates confusion. More critically, this is a landing page (lp/ppm) and the nav retains full site navigation including competitor-adjacent dropdowns, which is atypical for a conversion-focused LP and may distract visitors.

### `lp/pi-planning`
- **content** @ FAQ — 'Combien ça coûte ?' accordion answer : The answer to the pricing question is 'Prix accessible. Parlons-en lors d'une démo.' — this is a non-answer that dodges the question entirely. For a landing page aimed at converting RTEs/Comex stakeholders, this reads as evasive and undermines trust; at minimum it should reference a pricing page or ballpark.
- **content** @ Feature section — 'Les objectifs PI ne disparaissent plus' image : The image used (Capacity screen.webp — alt='Capacity') does not illustrate PI objective tracking; it appears to be a capacity planning screenshot reused from a different section, making the visual mismatched with the copy about continuous PI goal follow-up.
- **structure** @ Section 'AirSaas : la couche business au-dessus de Jira' : This section contains only a heading and a single short paragraph with no supporting visuals, feature list, or CTA — it renders as an orphan stub between the logo strip and the feature alternating sections, breaking the visual flow and looking unfinished.
- **content** @ Section 'AirSaas : la couche business au-dessus de Jira' — body paragraph : The paragraph is wrapped in a `<span><p>…</p></span>` structure, which is invalid HTML (block inside inline), and the line break renders a trailing empty line. This is a structural content rendering bug, not a preserved source quirk.
- **functional** @ FAQ accordion — icon spans : Each accordion toggle contains a Font Awesome Duotone icon `<span>` that renders empty (no Unicode character content visible in the HTML), so the icon glyphs are missing from all accordion buttons, leaving blank whitespace where open/close indicators should be.

### `produit/automatiser-la-com-projet`
- **structure** @ Hero section / H1 : The H1 reads 'Email "bilan de santé" : Automatisez la communication projet' — this uses an H1 for the page title, but the only subsequent content section uses an H3 ('Ajoutez les sponsors sur vos projets'). With so few sections, the heading hierarchy is technically valid but the H3 appears as a top-level feature heading with no H2 parent, creating a skipped level in the outline.
- **functional** @ Hero CTA button : The primary CTA 'Je veux une démo' links to '/fr/meetings-pages' — this is the same destination used by both the nav 'Demander une démo' button and the hero CTA, which is acceptable, but the label mismatch ('Je veux une démo' vs 'Demander une démo') across the same page is inconsistent and may confuse users. More critically, if the meetings-pages route is the correct demo page it should be verified as live; given the product page context, a more specific CTA label tied to the feature ('Essayer l'email bilan de santé') would be expected.

### `produit/budget`
- **content** @ FAQ section — accordion icon spans : The Font Awesome icon spans inside each FAQ accordion button render empty (no glyph visible) because the font is referenced by name ('Font Awesome 6 Duotone') but almost certainly not loaded in the rebuild, leaving a blank ~2.3rem space before every question label.
- **content** @ Section 'Prenez en compte le coût humain des projets' — body copy : The sentence 'Sur AirSaas renseigner les TJM des équipes et découvrez le coût humain de vos projets.' is missing a comma or connector after 'AirSaas' and the imperative 'renseigner' should be 'renseignez', making the sentence grammatically broken and confusing to French readers.
- **content** @ Section 'Des indicateurs pour piloter sereinement' — body copy : Copy reads 'Suivre les budgets project, c'est bien' — 'project' is English and should be 'projets'. This is a typo/copy error carried into the rebuild, not an acceptable brand anglicism.

### `produit/priorisation-par-equipes`
- **content** @ Feature section — 'Chaque équipe définie ses prios' : The heading contains a grammar error: 'définie' should be 'définit' (third-person singular present indicative of 'définir'). This is a visible conjugation mistake in a prominent H3.
- **content** @ Feature section — 'Organisez la roadmap de façon éclairée' : 'porfolios' is a typo — should be 'portfolios'. This appears in body copy visible to all users.
- **structure** @ FAQ section — accordion icon spans : All three FAQ accordion buttons have an empty icon <span> using Font Awesome Duotone but render no visible glyph character — the icon content is missing entirely, leaving a blank placeholder before each question.
- **content** @ FAQ answer — 'Si on repriorise en cours de route' : The answer appears truncated: 'Vous pouvez reprioriser en expliquant à tout le monde les raisons' ends abruptly with no period or follow-up, suggesting the sentence was cut off mid-thought.

### `produit/capacity-planning`
- **structure** @ Section 'Les Scénarios' → sub-section 'Sur l'échelle de temps…' : The time-scale sub-section ('Sur l'échelle de temps qui fait sens…') is rendered as a standalone <section> completely detached from the 'Les Scénarios' parent section, breaking the logical grouping. A user scanning the page sees an orphaned H3 block with no parent H2 context.
- **content** @ Section 'Une vue simple et actionnable' : The section ends with 'pour prendre les décisions :' (colon implies a list follows) but no list or continuation content is rendered — the section is effectively empty after the intro sentence, making it a visible dead end.
- **layout** @ Section 'Une réponse à toutes vos questions' — paragraph wrapping a list : A <ul> is nested inside a <p> tag, which is invalid HTML and will cause browser-dependent rendering bugs (the <p> closes before the <ul> in most parsers), potentially breaking the visual layout of the bullet list.
- **structure** @ Section 'Les Scénarios' — H3 with no visual image or supporting media : The 'Trouvez le scénario qui fonctionne' sub-section contains only a heading and a short paragraph with no screenshot or illustration, while every other feature sub-section (livrables, temps) has an accompanying image. This creates an asymmetric, visually incomplete layout.

### `produit/reporting-projet`
- **content** @ FAQ section — accordion icons : All three FAQ accordion buttons contain an empty <span> that is supposed to render a Font Awesome Duotone icon, but no glyph content is present, so a blank space appears instead of the expected icon. This leaves the accordion UI visually broken.
- **content** @ Section 'Prenons de la hauteur' — body paragraph : The list item reads 'Pas le bon niveau de d'abstraction' — there is a straight apostrophe immediately after 'd'' creating a double-apostrophe sequence ('de d'abstraction'), likely a copy paste error. Should be 'niveau d'abstraction'.
- **layout** @ Hero section : The hero section has min-h-screen but contains no product screenshot or illustration — only a headline, a paragraph and a single CTA button. The section will render as a near-empty full-viewport block with a large white void below the CTA, creating a visually broken first impression compared to every other product page.

### `produit/traduction-one-click-avec-deepl`
- **content** @ Hero section — H1 : The H1 reads 'Le rapport flash désormais en multilingue sur AirSaas' but the page slug is 'traduction-one-click-avec-deepl'. The H1 never mentions DeepL or 'one-click translation', which is the core product feature this page is supposed to sell — a visitor landing here expects to read about DeepL integration.
- **content** @ Section 'Animer une réunion…' — H3 : The heading contains a spelling error: 'language' should be 'langage' in French. 'Language' is the English word and is incorrect here.
- **structure** @ Page overall — heading hierarchy : After the H1, the 'Vos chefs de projets et PO vont adorer' section uses H2, but all subsequent feature sections use H3 with no H2 parent. The third and fourth content sections jump straight to H3 without any H2 wrapper, breaking the heading hierarchy and harming SEO/accessibility.
- **content** @ Section 'Vos chefs de projets et PO vont adorer' — body paragraph : The paragraph ends with 'vous n'aidez pas vos équipes' — the sentence is abruptly cut off mid-thought with no conclusion. It reads as truncated copy that was never completed.

### `solution/airsaas-et-les-experts-de-la-transfo`
- **brand** @ Section 'AirSaas dans le tooling des missions' — body paragraph : The brand name is inconsistently spelled as 'Airsaas' (lowercase 's') in the sentence 'Airsaas vous fournit sa solution PPM…', while the correct brand spelling is 'AirSaas' throughout the rest of the page.
- **content** @ Section 'AirSaas dans le tooling des missions' — body paragraph : The sentence ends with 'grâce mode multi-workspace' — the word 'au' is missing, making it grammatically broken ('grâce au mode multi-workspace'). This reads as truncated or malformed copy.
- **functional** @ Hero section — 'Demander une démo' CTA button : The primary CTA button links to '/fr/meetings-pages' which is a non-standard slug and likely a Webflow artifact or a broken route; the live site uses a proper meeting/demo booking page. This could be a dead link.
- **structure** @ Sections 'Se former entre experts', 'AirSaas dans le tooling des missions', 'You never walk alone' : None of the three main content sections contain any CTA button or link directing the user to act (demo, contact, community join, etc.), leaving the page without a conversion path below the hero.

### `solution/flash-report`
- **content** @ Section 'Plus qu'une solution de reporting flash' and 'Les bonnes pratiques de flash report' : Both intro sections contain only a single short paragraph with no feature cards, list items, or visual content — they appear to be header-only stub sections with placeholder copy and no actual content body, suggesting CMS-linked content failed to render.
- **structure** @ Section 'Les bonnes pratiques de flash report qui mènent vos projets plus loin, plus vite' : This section promises 'trois conseils' (three tips) in its paragraph but renders no tips, cards, or list items whatsoever — the promised content is entirely missing, leaving users with an empty section after the intro sentence.
- **content** @ Feature section 'Une vision Kanban qui simplifie votre gouvernance' : The image used (Portfolio project filter open) does not match a Kanban view — the alt text and heading reference Kanban but the screenshot appears to be a portfolio filter UI, creating a misleading mismatch between heading and visual.

### `solution/flash-report-projet`
- **content** @ Section 'Plus qu'une solution de reporting flash : un outil PPM projet moderne et simplissime' : This section contains only a heading and a single introductory paragraph with no feature cards, list items, or visual content beneath it. It appears to be a stub — the actual feature grid or content block is missing entirely.
- **content** @ Section '3 règles d'or pour utiliser votre flash report projet à bon escient' : This section contains only a heading and one teaser paragraph but no actual rules/content — the three golden rules themselves are absent. The section promises enumerated advice that never appears.
- **content** @ Feature section 'Des intégrations natives pour éviter le report de données manuel' : The body text lists the same integrations (Jira, ClickUp, Asana, Monday, Microsoft Teams, Zendesk) twice in back-to-back paragraphs with nearly identical wording, making it look like a copy-paste duplication error visible to users.
- **content** @ Feature section 'Vos fiches de cadrage de projet collaboratives' (truncated) : The HTML is truncated mid-sentence ('faites monter les c…'), indicating content is cut off. If this reflects the rendered output, users will see an incomplete sentence at the end of a visible section.
- **structure** @ Section 'Plus qu'une solution de reporting flash' and '3 règles d'or' : Two consecutive H2 sections appear with no real body content between them — just minimal stub paragraphs — creating a disjointed heading-only block that visually looks broken and reads like an unfinished page.

### `solution/gestion-portefeuille-projet`
- **structure** @ Content sections (multiple consecutive white sections) : The article-style body content is fragmented into a large number of separate <section> elements (each with full vertical padding) instead of a single continuous content block. This creates enormous visual gaps between paragraphs that belong together, making the page look broken with excessive whitespace.
- **content** @ Section: 'Pour opposer ces deux styles de DSI…' : The paragraph ends with '…on pourrait les représenter par des pyramides de Maslow :' but the referenced pyramid-of-Maslow diagrams/images are completely absent — the section contains only this dangling sentence, leaving the user with a truncated thought and no visual.
- **brand** @ Section: '<strong>AirSaas</strong>est donc solution PPM légère…' : Missing space between '</strong>' and 'est' renders as 'AirSaasest' in the visible output. This is a brand name defacement that is visible to users, not just a source artifact.
- **content** @ Section: 'Une distinction à faire…' : The introductory section ends with 'Mais alors quelle est la différence entre ces deux typologies de logiciels ?' and never answers the question — the answer section that follows does not contain a clear comparative breakdown, leaving the promised distinction unexplained.
- **content** @ Section featuring Jira integration (h3: 'Un outil PPM intuitif et intégré…') : The Jira integration block starts with a bold '<strong>Jira</strong>' heading inside a paragraph tag rather than a proper heading element, and the subsequent Microsoft Teams block is in a completely separate <section> with no parent heading, making the integration list appear visually disconnected and structurally incoherent.

### `solution/management-de-portefeuille-projet`
- **content** @ Feature section 'Une planification stratégique simplifiée' : The screenshot used (Portfolio project timeline view.webp) is the same image as the 'La vue timeline' section further down the page. The macro dashboard view should have its own distinct screenshot, not the Gantt/timeline image.
- **layout** @ Feature sections 'Des intégrations natives' and 'La vue liste' : Both consecutive sections use the same layout direction (text-left, image-right with lg:pl-[10rem] lg:pr-0), breaking the alternating left/right rhythm established by the rest of the page. 'La vue liste' should be mirrored.
- **content** @ Section 'Collaborez pour mieux transformer votre entreprise' : This section contains only a short intro paragraph with no supporting image, feature list, or CTA. It appears to be an orphaned text block without its intended visual content, making it look like a broken/stub section.
- **structure** @ Sections 'Collaborez' and 'Les 5 règles d'or' — rich-text body : Both sections render a <p> element nested directly inside another <p> (via <span><p>…</p></span>), which is invalid HTML. Browsers will auto-correct this, likely collapsing spacing or splitting content unexpectedly.

### `solution/outil-ppm`
- **content** @ Section 'Un changement de paradigme' / pyramides de Maslow : The text explicitly references 'ces pyramides de Maslow' but no image of any Maslow pyramid is rendered anywhere in the page — the visual asset that the copy points to is missing, leaving a dangling reference that confuses the reader.
- **content** @ Section 'Quand est-ce que les logiciels ppm ont commencé à apparaître?' / table reference : The section preceding 'Quel besoin est apparu en premier' contains only the orphaned label 'Problématique ciblée à la date de création' rendered as a standalone paragraph — this appears to be a caption or table header for a missing comparison table/chart that was not included in the rebuild.
- **layout** @ Content body — all body sections : The entire article body is rendered as a long sequence of separate <section> elements each with full vertical padding (py-[6.25rem] on desktop), causing enormous whitespace gaps between every paragraph. What should be a continuous article reads as isolated disconnected blocks with excessive spacing.
- **brand** @ Section 'AirSaas est donc solution PPM légère' : The sentence reads 'AirSaas est donc solution PPM légère' — the article 'une' is missing, making it grammatically incorrect French ('AirSaas est donc une solution PPM légère'). This looks like a source content issue that has been faithfully preserved but is a visible language error.
- **content** @ Section 'Augmentez l'engagement des équipes' (first content section after hero) : This section about team engagement sondages appears immediately after the hero with no transition, feature overview, or product screenshot — the page jumps straight into a mid-article paragraph without any section that establishes what AirSaas actually does as a PPM, creating a disjointed narrative flow.

### `solution/outils-de-pilotage-projet`
- **content** @ Section after 'Les différentes typologies d'outils de pilotage de projet' H2 : The bullet-list section ('Respecter lesobjectifs de chaque équipe…') appears as a standalone `<section>` with no heading and no introductory sentence, making it contextually orphaned. The item 'Respecter lesobjectifs' also contains a missing space between 'les' and 'objectifs'.
- **content** @ Section mentioning 'Planview', 'Sciforma', 'Ganttic' : Competitor product names (Planview, Sciforma, Ganttic) are called out positively in body copy without any framing from AirSaas's perspective, which reads as free competitor advertising and is likely a leftover from a generic blog draft that was never repositioned for this solution page.
- **structure** @ Body content sections (multiple consecutive <section> tags with only <p> wrappers) : The page's long-form body is fragmented into ~15+ individual `<section>` elements each containing a single paragraph or list, with no visual or semantic grouping. Several consecutive sections share identical padding/layout classes and no headings, making the heading hierarchy (H1 → many orphan paragraphs → H2 → orphan paragraphs → H3) illogical and the page structure broken for both SEO and accessibility.
- **content** @ Section 'Pour matérialiser un idéal type… pyramides de Maslow' : The section references 'ces pyramides de Maslow' (plural, with 'ces' implying they are visible) but no image of the pyramids is rendered in the rebuild — the visual reference is broken and the sentence ends abruptly with a colon and no content following it.
- **content** @ Section under H3 'Un outil de pilotage projet souple et intégrable facilement' : The Jira integration description starts with a bold heading 'Jira' followed by a stray period before the first sentence ('En intégrant Jira.à AirSaas'), indicating a typographic error (period inserted inside the URL/text that was not cleaned up from the CMS source).

### `solution/portfolio-management`
- **content** @ Sections 'Votre reporting projet en un clic' and 'Ritualisez vos reportings' : Both feature sections use the exact same screenshot image (Flash report ppt.webp). Two distinct features sharing an identical illustration strongly suggests the wrong image was assigned to one of them.
- **content** @ Section 'Une plateforme de gouvernance projet à la hauteur de vos ambitions' : This section contains only a heading and a single paragraph with no supporting image, feature grid, or visual — unlike every comparable feature section on the page which pairs text with a screenshot. Appears to be an incomplete section.
- **structure** @ Section 'Marketez avec impact vos programmes de transformation' : This standalone text section uses an H3 heading without a parent H2 context, breaking the heading hierarchy after a series of H2-anchored sections. It also has no CTA or visual, making it structurally inconsistent with surrounding content blocks.

### `solution/revue-de-portefeuille`
- **content** @ Section '6 clés pour rendre vos revues de portefeuille de projet plus efficaces' : This section promises '6 clés' (6 keys) with a heading, but the body content is a single introductory paragraph with no list or enumeration of the 6 keys visible. The section appears stub-like — the 6 items are instead scattered as separate feature sections below without any numbering or connection back to this '6 clés' framing, making the heading misleading and the section feel incomplete.
- **structure** @ Section '6 clés' body — paragraph wrapping : The section body renders a <p> tag nested directly inside another <p> tag (`<p><span><p>Préparation…`), which is invalid HTML. Browsers will silently break this, likely causing the inner paragraph to render outside its container and producing a visible layout gap between the heading and the content below.
- **content** @ Feature sections — content/section mismatch (8th section onward) : Sections like 'Prioriser les sujets à aborder', 'Inviter les bonnes personnes à votre revue de portefeuille', and 'Envoyer votre reporting en amont' read as best-practice editorial advice (not product feature descriptions), yet they are rendered in the same product-feature alternating-layout as genuine product sections above. These appear to be blog-content repurposed as product feature sections, which looks inconsistent and confuses the page's purpose.

### `solution/tableau-de-bord-dsi`
- **structure** @ Section 'Le pilotage par la valeur' (second section) : This section contains only an H3 heading with no body copy, no image, and no supporting content. It appears as an orphaned title floating on a white background, likely a stub that was never populated.
- **structure** @ Body-copy sections between H2 headings : Several consecutive body-copy sections (paragraphs about indicator history, budget traps, indicator construction principles) have no heading at all, causing a flat wall of text with no navigational hierarchy below the H2 level. The heading hierarchy jumps from H2 directly into bare paragraphs with no H3 to introduce each topic.
- **content** @ Section 'Suivi de l'indicateur d'adhésion' — body copy : The body copy is visibly truncated mid-sentence in the HTML ('Nous mettons à di…'). The reader will see an incomplete sentence, which breaks trust and readability.
- **layout** @ Hero section — paragraph copy : The hero paragraph text runs without a space between two sentences ('etc.).La mesure'). This produces a word-boundary error visible to readers on screen.

### `solution/tableau-de-bord-gestion-de-projet`
- **content** @ Hero paragraph (intro copy) : The hero subtitle abruptly splices two distinct ideas mid-paragraph: '…Pour vous aider, nous avons conçu le grand guide de la conduite de projet.Mesurer ses performances…' — there is no line-break or transition between the guide promotion sentence and the next thought, making the paragraph read as two unrelated fragments run together.
- **structure** @ Feature section — 'Quelques principes à respecter…' : The H3 heading says 'Quelques principes à respecter pour une gestion de portefeuille optimale' but its body copy only contains a single introductory sentence ('Il est important de respecter certaines règles…') — the actual bulleted rules appear in a completely separate preceding plain-text section with no heading. The content and its heading are decoupled, which confuses the user.
- **layout** @ Feature section — 'AirSaas propose 3 vues…' : The heading promises '3 vues' but only one view is described in the body copy ('Un suivi de l'avancée de chacun de vos projets…'). The other two views are never presented, leaving the section visually and semantically incomplete.
- **content** @ Unnamed plain-text sections (2nd and 3rd body sections) : Several consecutive sections contain body copy that lacks any section heading or visual separator, making it impossible for a user scanning the page to understand what topic each block addresses. These are effectively orphan paragraphs with no label.

### `equipe/comite-direction`
- **structure** @ "Suivez l'avancée de vos programmes" section : This section uses an H3 tag while it sits at the same structural level as other feature sections that also use H3 — but unlike them, it is styled with the gradient heading treatment normally reserved for H2 section titles, creating an inconsistent visual and semantic hierarchy.
- **content** @ Hero section — H1 : The URL is /fr/equipes/comite-direction (targeting C-suite / executive committee), yet the hero H1 reads "La plateforme de gouvernance projet pour que votre CODIR prenne 4X plus rapidement les bonnes décisions" — the "4X" claim appears without any supporting citation or context anywhere on the page, which may undermine credibility for this audience.
- **functional** @ Hero CTA button : The hero section contains only one CTA button ("Réservez une démo") with no secondary CTA (e.g. free trial or product tour link), whereas comparable solution pages typically offer a secondary action. This is a conversion gap for this high-intent audience page.

### `solution/tableau-de-bord-portefeuille-de-projet`
- **content** @ Section 'La vue Kanban' : The Kanban section displays an image with filename 'Portfolio%20header%20menu.webp' (alt='Kanban'), which is a header/navigation menu screenshot, not a Kanban board view. This is the wrong image for this feature section.
- **structure** @ Section 'Collaborez pour mieux transformer' : A <p> element is nested directly inside another <p> element (wrapped in a <span>), which is invalid HTML. Browsers will auto-correct this by splitting elements, potentially breaking the intended layout or losing content.
- **layout** @ Sections 'La vue liste' and 'La vue timeline' : Two consecutive feature sections both use the same layout direction (text left, image right with lg:pl-[10rem] lg:pr-0), breaking the intended alternating left/right rhythm. The alternating pattern skips — liste and timeline appear on the same side back-to-back.
- **layout** @ Hero section : The hero contains H1, subtitle, and a single CTA button but no product screenshot or visual. The section is declared min-h-screen but renders as a near-empty hero with a large blank area below the CTA, which looks broken even if the gradient background is present.

### `equipe/direction-de-la-transformation`
- **structure** @ DAKI section ('Améliorer en continu votre manière de faire des projets') : The DAKI acronym is presented as D-A-K-I (Drop, Add, Keep, Improve) but the correct DAKI order is Drop, Add, Keep, Improve — however the standard acronym spells D-A-K-I which matches. The real issue is that this section uses H3 headings (DROP, ADD, KEEP, IMPROVE) inside what appears to be a full-page section that already sits under the page H1 with no H2 wrapper — the section heading 'Améliorer en continu…' is an H2, which is correct, but the four DAKI items are rendered at H3 size with gradient treatment making them look like major section headings rather than list items, creating a visually confusing hierarchy that reads like four separate top-level features.
- **structure** @ Section 'Uniformisez le reporting projet' : This section uses an H3 heading while all surrounding feature sections ('Animez clairement', 'Pilotez les projets', 'Faites gagner 1 jour') also use H3. However the 'Uniformisez' section is a standalone text-only section with no image and no H2 parent — it floats between two image-paired H3 sections as if it were a sub-heading or intro, but it is styled identically, making the heading hierarchy and content grouping ambiguous and visually broken.
- **content** @ Section 'Ils parlent de nous' : The section heading 'Ils parlent de nous' (They talk about us) describes press/media coverage, but the section only contains media logo images with no accompanying quotes, article titles, or links. This is a stub press-mention section with no actionable content — a human reviewer would expect at least a quote or a link to validate the claim.
- **content** @ Section 'Pilotez les projets de manière macro' : The body copy is a single very short sentence: 'Priorisez en continu et soyez agile grâce votre roadmap collaborative.' The French is grammatically incorrect — it should be 'grâce à votre roadmap collaborative' (missing 'à'). This is a user-visible grammatical error in the main content.

### `equipe/it-et-operation`
- **content** @ Section 'Ils parlent de nous' : The heading 'Ils parlent de nous' (They talk about us) is used for a press/media logos section, but this label implies customer testimonials. The correct label should be something like 'Ils écrivent sur nous' or 'Ils en parlent dans la presse'. This is a semantic mismatch that could mislead visitors.
- **content** @ Section 'La marketplate AirSaas' : The heading contains a typo: 'marketplate' instead of 'marketplace'. This is a visible brand/typo error in a prominent H2.
- **structure** @ Section 'La plateforme qui fluidifie votre gouvernance projet' and 'La marketplate AirSaas' : Both sections have an H2 heading and a subtitle paragraph but contain no body content, cards, integrations list, or visual elements below the paragraph — they appear as stub/empty sections with only a title and one sentence, likely missing their actual content (integration logos, feature grid, etc.).
- **content** @ Section 'Laissez nos clients vous parler d'AirSaas' : This testimonials section has an H2 heading and a teaser sentence ('Nos clients adorent gérer leurs projets...') but contains zero testimonial cards, quotes, or carousels — the actual testimonial content is entirely missing.

### `blog/10-pratiques-pour-developper-la-relation-de-confiance-dg-cio`
- **content** @ Blog hero – publication date : The article displays 'Le 1 février 2026', which is a future date (more than a year ahead at time of likely review). While future dates alone are not flagged per instructions, this specific date appears to be a data-mapping or CMS migration bug producing an obviously wrong year (the workshop described occurred in June 2023), which would confuse readers.
- **content** @ Blog body – paragraph before H4 '4 : Faire preuve d'empathie' : The paragraph 'La Direction Générale a aussi sa complexité aurait affirmé Lapalisse !' is missing a space before 'Comprendre' – the two sentences run together without a space after the exclamation mark ('Lapalisse !Comprendre'), making the text appear broken or truncated mid-sentence.
- **structure** @ Blog body – heading hierarchy : The two main section headings ('Transparence en continu…' and 'Optimiser le run…') use H3, while their sub-items use H4. There is no H2 in the article body between the H1 page title and the first H3, creating a skipped heading level (H1 → H3) that breaks document outline and accessibility.

### `equipe/outil-pmo`
- **content** @ Section: 'Animez clairement et simplement vos CoPil' : The image used (Portfolio decisions, 65d35c96ec9fbf11d78e4b44) is an exact duplicate of the image already used in the preceding section 'Fluidifiez votre prise de décisions importantes et urgentes'. A different, correct screenshot should be shown here.
- **structure** @ Sections: governance, capacity planning, marketplace, testimonials : Four consecutive sections use H2 as standalone heading-only blocks with only a short intro paragraph and no sub-content — this creates an awkward wall of H2 headings with no visual content between them, appearing broken even though HTML is valid.

### `blog/analyse-des-risques-projet`
- **content** @ Blog article body — Étape 1 paragraph : The word 'traitchef ement' appears in the body copy ('L'identification des risques et leur traitchef ement doit se faire…'). This is a corrupted word — likely 'traitement' with a stray 'chef' inserted — and is visibly broken to any reader.
- **content** @ Hero / article metadata — publication date : The article displays 'Le 1 février 2026' as its publication date. This is over a year in the future relative to any plausible review date, which is unusual for a blog post and may indicate a CMS date-mapping bug (e.g. day/year fields swapped — the live article was likely published 1 February 2022, matching surrounding article dates).
- **structure** @ Blog article body — heading hierarchy : The article body opens directly with an H3 ('Pourquoi est-ce important en gestion de projet ?') as the first structural heading under the H1 page title. There is no H2 wrapping the article body content, so the heading hierarchy jumps from H1 → H3, which is semantically broken and bad for screen readers and SEO.
- **content** @ Blog article body — internal link in intro paragraph : The link to the 'conduite de projet' guide uses a relative URL '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (no locale prefix), while the page is under '/fr/'. This will 404 or redirect incorrectly for French-locale users.
- **content** @ Blog article body — internal link 'budgets' : The anchor linking 'budgets' points to 'https://www.airsaas.io/gestion-de-projet/budgetiser-un-projet-sans-se-louper' — an absolute URL to the production domain without a locale prefix ('/fr/'). In the rebuild this should be a locale-prefixed relative link; the absolute non-locale URL will break localisation routing.

### `blog/appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management`
- **content** @ Blog body — Idée reçue n°4, fourth paragraph : The paragraph beginning 'Ensuite, qu'on définit le troisième workshop…' is grammatically broken and appears truncated mid-thought ('Déjà,' ends the paragraph with no conclusion). This reads as raw notes rather than finished copy.
- **content** @ Blog body — Idée reçue n°4, quote about community : The paragraph 'Un atelier avec vous, nous et avec des membres sélectionnés au sein la communauté Pro de la Transfo d'AirSaas…' contains 'probméatiques' — an obvious typo for 'problématiques' that should have been caught.
- **content** @ Blog body — L'essentiel en quelques mots, second paragraph : The text contains 'l'limplication du top management' — a double-article typo ('l'l') that is user-visible and looks unprofessional in the body copy.
- **structure** @ Blog body content sections : The article introduction promises 'neuf étapes d'un appel d'offres' but the visible HTML only contains the 'Sept idées reçues' section and a 'Conclusions' anchor in the table of contents — the nine-steps section appears to be entirely missing from the rebuild.
- **structure** @ Blog body — first content heading : The first body section 'L'essentiel en quelques mots…' uses an H3, but this is the top-level section of the article body (below the H1 hero title). It should be H2 to maintain a correct heading hierarchy; H3 implies a sub-section of an H2 that doesn't exist.

### `blog/budgetiser-un-projet-sans-se-louper`
- **content** @ Retour d'expérience du CIO d'Adeo — callout aside : The 'À retenir' blockquote is truncated mid-sentence: 'Au niveau budget, l'idée, c'est de fonctionner sur enveloppe fixe. Et moi, je cape l'investissement général, d'Adeo dans le digital, par rapport à la croissance de l'entreprise. On' — the quote cuts off abruptly after 'On' with no continuation, leaving an incomplete sentence visible to users.
- **content** @ Blog body — internal link : The link to 'conduite de projet' points to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (relative, no locale prefix), which will resolve incorrectly under the /fr/ path structure used by the rebuild. It should be '/fr/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' or the canonical blog equivalent.
- **content** @ Blog body — agile coach reference : The text reads 'le spécialiste français et coach agile Frédéric' — the full name is truncated (surname missing). This appears to be a CMS rendering issue where only the first name was pulled, leaving an incomplete attribution that looks like a bug to readers.

### `blog/budget-previsionnel-projet`
- **content** @ Blog hero — author avatar : The author photo URL points to an image tagged 'SV-min.jpg' (likely 'Sébastien V') but the displayed name is 'Jérôme Dard'. The image and name appear mismatched, which would look wrong to any reader who recognises either person.
- **content** @ Blog hero — publication date : The publication date is displayed as 'Le 1 février 2026', which is a future date that will look erroneous to users visiting before that date. If this is a live article it should carry its real publish date.
- **functional** @ CTA section — demo button animation : The CTA button wrapper has classes 'opacity-0 scale-[0.92]' with no visible trigger to animate it in (no IntersectionObserver hook rendered in the HTML). The button will appear invisible to users with JavaScript disabled or if the animation script fails to fire.
- **content** @ Blog body — intro paragraph : The internal link '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' is missing the locale prefix '/fr/', so it will 404 or redirect incorrectly in the rebuilt Next.js app where all French routes require '/fr/'.
- **structure** @ CTA floating card — icon : The floating decoration card's icon element renders an empty <span> with a Font Awesome Duotone font-family reference but no icon unicode character, resulting in a blank glyph placeholder visible on screen.

### `blog/capacity-planning`
- **content** @ Blog hero — author byline / publication date : The publication date displays 'Le 1 février 2026', which is a future date likely caused by a CMS data entry error or a field mapping bug in the rebuild. This will appear incorrect to any reader visiting before February 2026 and may undermine credibility.
- **brand** @ Blog body — intro paragraph : The brand name is written 'Airsaas' (lowercase 's') in two consecutive paragraphs ('chez Airsaas, on sait…' and 'Chez Airsaas, nous recommandons…') instead of the correct casing 'AirSaas'. This is an inconsistency visible to readers.
- **content** @ Blog body — section 'La différence entre Capacity Planning et planification de la demande', inline link : The paragraph ending 'maximiser l'efficacité opérationnelle de l'entreprise' is missing a space before 'de l'entreprise' (runs 'opérationnellede'), resulting in a visible word-fusion in rendered text.
- **content** @ Blog body — section 'La différence…', podcast link : The anchor text reads 'nous parlons du Flash Design avec Isabelle Perussy' but the linked podcast episode is about 'les défis techniques et humains de la transition d'IDTGV à la DSI de Oui.Go' with Isabelle André-Perussi. The description 'Flash Design' does not match the episode topic and the author name is misspelled ('Perussy' vs 'André-Perussi'), misleading the reader.

### `blog/chef-de-projet-pmo`
- **content** @ Blog hero – author avatar : The author is labelled 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', which appears to be a different person's photo (likely a Webflow CMS mismatch). The image and the displayed name do not match.
- **structure** @ Blog body – heading hierarchy : The article body opens directly with H3 tags ('Qui est le PMO ?', 'Quelles différences…', etc.) without an H2 wrapper section. The page H1 is in the hero, but the body content skips H2 entirely and uses H3 as top-level section headings, creating an illogical heading hierarchy (H1 → H3).
- **content** @ Blog body – truncated content : The HTML is visibly truncated mid-sentence in the last bullet of the 'Quels softs skills' section ('Le courage : nécess…'). If this truncation is present in the rendered page and not just the review snippet, the article content is cut off and incomplete for users.

### `blog/capacity-planning-definition`
- **functional** @ CTA button after 'Aligner capacité et demande' section : The CTA button inside the article body is labelled 'Télécharger' but links to '/fr/meetings-pages' (a demo-request page). The label 'Télécharger' implies a downloadable resource, which is misleading and confusing for the user.
- **content** @ Article body — 'Aligner capacité et demande', paragraph starting 'À cette étape, vous arrivez' : The sentence '…aligner la capacité et la demande en fonction des objectifs stratégiques</strong>de votre organisation' is missing a space before 'de' — the closing </strong> tag and the following word are concatenated, producing a run-on rendering issue visible in the rendered text.
- **content** @ Article body — 'Prévoir la demande future' section : The internal link points to 'https://www.airsaas.io/fr/gestion-de-projet/planification-de-la-demande-capacity-planning' (absolute live URL with old path), whereas all other internal links in the article also mix http/https and airsaas.io absolute URLs; one PI Planning link uses 'http://' (non-secure). These absolute live URLs inside the rebuilt page will break cross-environment navigation and bypass the rebuild's routing.
- **content** @ Article body (truncated at end) : The HTML is truncated mid-sentence: '…Avec la variation de la demande, et les ressources disponibles qui fluctuent, votre capacitaire va nécessairement évoluer au cours du temps. D'où l'intérêt de le suivre et de l'ajuster de manière continue.</span></p><p … <span>Une fois votre Capacity Planning établi, il ne s'agit pas de le laisser tel quel. Avec la variation de la demande, et les ressources disponibles qui fluctuent, votre capacitaire va nécessairement évoluer au cours du temps. D'où l'intérêt de le suivre et de l'ajuster de manière continue.</span></p><p class="text-foreground leading-[1.4] font-light" style="font-size:var(--text-paragraph)"><span>…' — The final section 'Quels outils pour faire votre Capacity Planning ?' listed in the Sommaire is entirely missing from the rendered output, meaning the anchor link in the table of contents leads to a non-existent section.
- **structure** @ Sommaire section : The table of contents lists four sections including 'Quels outils pour faire votre Capacity Planning ?' but this section does not appear in the page body (confirmed by truncation and absence of the matching H3/anchor). The anchor link '#quels-outils-pour-faire-votre-capacity-planning' will result in a dead in-page link.

### `blog/cadrage-projet`
- **functional** @ Intro paragraph — link to 'conduite de projet' : The anchor href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' — missing the '/fr/' locale prefix and likely the '/blog/' path segment, so it will resolve to a 404 in the rebuilt routing structure.
- **structure** @ Sommaire nav — anchor '#à-retenir' : The sommaire lists 'À retenir' as the final section implying a conclusive summary, but two separate 'À retenir' asides appear mid-article rather than a dedicated closing section. The anchor likely targets neither correctly, breaking in-page navigation.

### `blog/chef-de-projet-transverse`
- **content** @ Blog article body — intro paragraph : The internal link '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' is a relative path missing the '/fr' locale prefix, which will result in a 404 on the rebuilt Next.js site. All internal links in the body copy should be prefixed with '/fr'.
- **content** @ Author attribution — hero section : The author avatar image shows a photo tagged 'Jérôme Dard' but the CDN filename is 'BR-min.jpg', suggesting the image may belong to a different person (initials BR ≠ JD). This is a likely wrong photo for the named author.
- **content** @ Blog body — intro paragraph : Missing space before '<strong>' in 'rendre efficace le pilotage de projets</strong>transverses' causes 'projets' and 'transverses' to render run-together ('projetstransverses') in the visible output. This is a user-visible rendering bug.
- **content** @ HTML — truncated at end of page : The HTML is truncated mid-sentence ('…p-[1.5rem] md:p-[2.5rem]" style="font-size:var(-') indicating the rebuild is either cutting off the body content or the fetch/render pipeline is incomplete. The end of the article, any closing CTA section, and the footer are missing entirely.

### `blog/comite-pilotage-projet`
- **content** @ Astuce 5 — aside callout : The quote inside the 'À retenir' callout is truncated: it ends with '…Le temps qu'on prend à s'aligner ce n'est pas du temps perdu...' and has no closing quotation mark or concluding sentence. The attribution (speaker/source) is also missing entirely.
- **functional** @ Blog body — internal link in intro paragraph : The link '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' is a relative path that does not include the '/fr/' locale prefix, which will produce a 404 or incorrect redirect in the rebuilt Next.js site.
- **content** @ Astuce 3 — body paragraph : The word 'parperboard' is a misspelling of 'paperboard' (or 'paperflip'). This appears in the rebuilt content and would be visible to readers.

### `blog/comite-de-pilotage-definitions-et-incomprehensions`
- **content** @ Article intro paragraph – '5 notions simples' : The text says 'on va démystifier 5 notions simples' but then lists six items: sponsor, Copil, jalons, chef de projet, key user, et reporting. The count is incorrect and will undermine credibility.
- **content** @ Internal link – series reference paragraph : The link to the series article uses a relative path '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' (missing the '/fr/' locale prefix), which will 404 in the rebuilt Next.js routing structure.
- **structure** @ Blog body – heading hierarchy : The article body jumps directly from H1 (hero) to H3 ('Copil : 5 expressions clés') with no H2 in between, then uses H4 for all subsections. The H3 is used as the top-level section heading inside the body, which is an illogical hierarchy (H1 → H3 → H4, skipping H2).

### `blog/comment-animer-un-bilan-projet-efficace`
- **content** @ Sommaire — last TOC entry : The last table-of-contents entry reads '5 formats-types de bilan deprojet' — 'deprojet' is missing a space (should be 'de projet'). This is a rebuild rendering bug, not a source artifact, as it appears in a generated anchor link label.
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026', which is a future date. While the instructions note future dates are not automatically a bug, this specific date (2026) is implausible for a published article visible on the live site today and likely signals a CMS date mapping error in the rebuild.

### `blog/comment-animer-un-comite-de-pilotage`
- **functional** @ Blog body — internal link to copil preparation article : The link 'Comment bien préparer un comité de pilotage ?' points to '#' (dead anchor) instead of a real URL. Users clicking this in-article CTA will go nowhere.
- **functional** @ Blog body — intro paragraph internal link : The link 'Comité de pilotage ou Copil : Les bases' uses a relative path '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' without the '/fr/blog/' prefix, which will 404 in the rebuilt URL structure.
- **content** @ Hero — publication date : The article displays 'Le 1 février 2026', which is a future date relative to any plausible current review period. This is likely a data-mapping error (wrong field used) rather than an intentional display date.

### `blog/comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026', which is a future date relative to any plausible review of a 2022-titled post. While future display dates are not flagged as fabricated, a date four years after the article's subject year (2022) strongly suggests a CMS field was incorrectly populated (likely a default or wrong year), which will confuse readers.
- **structure** @ Blog body — heading hierarchy : The article jumps directly from H1 (hero title) to H3 ('PPM : la fin du domaine réservé') with no H2 between them in the body content. The Sommaire section uses an H2 ('Sommaire') but the body section uses H3 as top-level headings, creating a broken outline that skips H2 entirely in the main article content.

### `blog/comment-elaborer-un-reporting-efficace`
- **functional** @ Blog body — internal link 'conduite de projet' : The link to 'conduite de projet' uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' missing the '/fr/' locale prefix, which will 404 in the rebuild's routing structure.
- **content** @ Author avatar — hero section : The author display name is 'Jérôme Dard' but the avatar image alt text is 'Jérôme Dard' while the image URL points to a file named 'SV-min.jpg' — the initials 'SV' do not match 'Jérôme Dard', suggesting the wrong author photo is being used.
- **content** @ Table of contents — anchor link 'Différents acteurs, différentes demandes' : The TOC anchor href is '#différents-acteurs-différentes-demandes' using accented characters, which will not match a standard slug-generated ID (which would be '#differents-acteurs-differentes-demandes' without accents), causing the in-page jump link to silently fail.
- **content** @ Blog body — intro paragraph, 'cadeau' sentence : The sentence 'Et en plus en cadeau vous pouvez télécharger…notre modèle de<a href=…>reporting projet ici.</a>' is missing a space between 'modèle de' and the opening anchor tag, rendering as 'modèle dereporting projet ici' — broken French copy.

### `blog/comment-decider-en-copil`
- **content** @ Body section — repeated paragraph : The paragraph 'Et les clients internes, sponsors, membres du comité de pilotage et ou comité de direction, etc. doivent pouvoir prendre des décisions dans les temps impartis pour ne pas retarder l'exécution et la conduite de projet.' appears twice in a row verbatim, which is a clear duplication bug.
- **functional** @ Body — internal link 'Comité de pilotage ou Copil : Les bases' : The href is a relative path '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' (no locale prefix '/fr/'), which will likely 404 in the rebuilt Next.js app whose routes are under '/fr/blog/…'.
- **content** @ Sommaire — anchor link item 2 : The anchor href '#accès-aux-données-et-définition-de-lautorité-projet-deux-prérequis-pour-mieux-dé' is visibly truncated (ends with 'mieux-dé'), suggesting the slug was cut off and will not resolve to the correct heading anchor on the page.
- **content** @ Hero — publication date : The article displays 'Le 1 février 2026', which is a future date relative to the article's apparent creation period (2022 content, Webflow CDN assets dated ~2022). This is likely a data mapping error assigning the wrong date field rather than the original publish date.

### `blog/comment-faire-un-bon-point-davancement-projet`
- **content** @ Blog body — internal link to conduite de projet : The link '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' is a relative path missing the locale prefix '/fr/', which will 404 on the rebuild. All other internal links in the body correctly use absolute URLs with the domain or '/fr/' prefix.
- **structure** @ Blog body — '12 pratiques' section: 'Établissez de bons objectifs' / 'On ne réussit que par rapport aux objectifs fixés' : Two consecutive H4 headings appear with no body paragraph between them — 'Établissez de bons objectifs' is immediately followed by 'On ne réussit que par rapport aux objectifs fixés' — making it look like a duplicate or a broken split of one heading. One of them should either be removed or serve as a subheading with content.
- **content** @ Blog body — paragraph referencing 'Airsaas' (lowercase a) : The paragraph 'Avec Airsaas, on a créé une plateforme…' uses 'Airsaas' with a lowercase 's', inconsistent with the brand name 'AirSaas'. This is a brand capitalisation error visible to readers.

### `blog/comment-gerer-lagressivite-dans-les-comites-de-pilotage`
- **content** @ Blog body — '7 conseils' section intro paragraph : The table of contents and section heading both promise '7 conseils', but an in-body paragraph earlier (passive-agressif block) refers to '10 astuces' ('Nous verrons ci-dessous dans les 10 astuces comment réagir'). This number mismatch creates a factual inconsistency visible to readers.
- **content** @ Blog body intro — internal link : The link 'Comité de pilotage ou Copil : Les bases' uses a relative path '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' without the '/fr/' locale prefix, which will 404 in the rebuilt Next.js routing. All other internal links in the page correctly include '/fr/'.
- **content** @ Blog body — 'Travaillez sur le climat' H4 section : Immediately after the H4 heading there is a paragraph containing only a zero-width joiner character '‍' (rendered as an empty line). This is a leftover Webflow rich-text artifact that renders as a blank visible paragraph, creating an unexplained gap between the heading and its content image.
- **brand** @ Second figure alt text — image of tension in meeting : The alt text reads 'copil-tension-airsaaas.jpeg' (three 'a' characters in 'airsaaas'), exposing a brand typo in a user-visible attribute. This originates from the source filename but is surfaced in the rebuild's alt text.

### `blog/comment-mettre-en-place-un-pmo`
- **content** @ Hero / article metadata — publication date : The article displays 'Le 1 février 2026', which is more than a year in the future from any plausible current date. Unlike a slight offset, a full year-plus future date is likely a data-entry error in the CMS (year digit wrong) and will confuse readers.
- **functional** @ Blog body — internal links (e.g. 'PMO', 'portefeuille projet', 'Pourquoi mettre en place un PMO') : Inline hyperlinks in the article body point to the old Webflow URL pattern (airsaas.io/fr/gestion-de-projet/…) instead of the rebuilt /fr/blog/… routes, meaning clicks leave the rebuilt site and land on the live Webflow instance — broken navigation in the new environment.
- **content** @ Blog body — ordered list item 1 (ROI criterion) : The first list item ends with a double full-stop ('…futurs investissements..') which is a copy error from the source that is clearly visible to readers and should be corrected.
- **content** @ Blog body — prerequisite list item 3 ('On donne (vraiment) au PMO') : A missing space before 'les capacités' produces a run-on: '…au PMOles capacités…'. The bold tag closes immediately before 'les' with no space, making the sentence unreadable at a glance.

### `blog/comment-mettre-une-bonne-meteo-projet`
- **functional** @ Blog body — internal link in intro paragraph : The link to 'conduite de projet' uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing '/fr/' locale prefix), which will 404 in the rebuilt Next.js app that uses '/fr/...' routing.
- **content** @ Blog body — h4 '☀️ Soleil : Le projet progresse comme prévu..' : The heading ends with a double period ('prévu..') — appears to be a truncation or copy artifact rather than intentional ellipsis, and looks unprofessional as a heading.
- **content** @ Blog body — paragraph under 'levier de performance insoupçonné' : Missing space before the exclamation mark in '…dysfonctionnements</strong>de votre système. !' — the word 'de' runs directly into the closing bold tag with no space, creating a garbled sentence break that is user-visible.
- **content** @ Blog body — paragraph under 'Synthétiser l'état d'avancement d'un projet' : Missing space between 'données</strong>et' — 'simplifier la lecture des données</strong>et de rendre compte' collapses two words together visually (reads 'donnéeset').

### `blog/comment-reussir-un-projet-transverse`
- **content** @ Hero / article metadata : The author avatar image (URL contains 'BR-min.jpg') shows a photo that does not match 'Jérôme Dard' — 'BR' likely refers to a different person (possibly Baptiste Reydellet or similar). Wrong author photo displayed next to the name.
- **functional** @ Blog body — internal link (conduite de projet) : The internal link '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' is missing the '/fr/' locale prefix, which will result in a 404 in the rebuilt Next.js app where all routes are under '/fr/'.
- **structure** @ Blog body — heading hierarchy : The section '1 : Rationaliser' is marked as an H4, immediately followed by 'À chaque problématique sa solution pragmatique' also as an H4. '1 : Rationaliser' acts as a sub-section title introducing several H4 children — it should be an H3 to maintain a correct and logical heading hierarchy.
- **content** @ Blog body — image wrapper (Un bon alignement…) : The screenshot image for 'Un bon alignement avec la stratégie d'entreprise' is wrapped in a plain div, not a figure/figcaption, unlike every other image block on the page. It therefore renders without a caption or the consistent rounded card treatment, causing a visual inconsistency.

### `blog/copil-projet-ou-comite-de-pilotage-projet-les-bases`
- **content** @ Blog article body — first paragraph : The first paragraph contains a broken bold tag: 'C'est lui qui fait le<strong></strong>lien' — the empty <strong> tags produce no visible bold text and create a missing space/word gap between 'fait le' and 'lien', which reads awkwardly and may render as 'fait lelien' depending on the browser.
- **brand** @ Blog hero — author avatar : The author display name is 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg' (likely another person's photo — initials 'BR'). This is a mismatched author photo and would mislead readers about who wrote the article.
- **content** @ Blog article body — multiple inline paragraphs : Multiple empty <strong></strong> tags scattered throughout the body (e.g., 'une instance<strong></strong>décisionnelle', 'Pour améliorer le suivi d'un projet<strong></strong>sur le plan') produce invisible zero-width artifacts that break word spacing and can cause words to run together visually.

### `blog/demarche-de-projet`
- **functional** @ Blog body — internal link in opening paragraph : The first paragraph links to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' — a relative path missing the '/fr' locale prefix. This will 404 in the French locale rebuild.
- **functional** @ Blog body — multiple internal airsaas.io links : Several body links point to absolute 'https://www.airsaas.io/gestion-de-projet/...' URLs (note-de-cadrage, bilan-projet, pilotage-de-projet, jalons, etc.) without the '/fr' locale segment, which will route visitors to the live site instead of the rebuild and break locale consistency.
- **content** @ Blog body — ordered list item 3 : Item 3 reads 'Je "caste" la premières équipe projet' — 'premières' is feminine plural while 'équipe' is singular; should be 'première équipe projet'. Additionally 'caste' is an awkward false anglicism (casting → cast) that reads as unfinished copy.
- **content** @ Blog body — paragraph after 'Standardiser plusieurs démarches' : The paragraph contains a typo: 'A partir ce ce simple découpage' — 'ce ce' is a double word; should be 'de ce'. Also 'dont'' is a malformed contraction of 'don'ts', rendering as broken punctuation.

### `blog/fiche-projet-exemple-et-methodologie`
- **content** @ Blog article body — first paragraph internal link : The internal link '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' is a relative path missing the '/fr' locale prefix, which will result in a 404 on the rebuilt Next.js site structured under /fr/.
- **content** @ Blog article body — 'Qui rédige les fiches de projet?' section : The sentence reads 'une fiche projet rédigé sur Word à l'inconvénient de ne pas pouvoir être mise à jour' — 'à' should be 'a' (verb avoir). This is a grammatical error visible to French readers, not a source-preservation case.
- **content** @ Blog article body — 'Se poser les bonnes questions' paragraph : The sentence is syntactically broken: 'De quelles informations a-t-on besoin que votre fiche soit utile et permette d'interagir…' — the subordinating conjunction is missing ('pour que'), making the sentence ungrammatical and confusing.
- **content** @ Hero / article meta — author avatar : The author name displayed is 'Jérôme Dard' but the avatar image URL references 'BR-min.jpg' (initials 'BR'), strongly suggesting the photo does not match the named author — a credibility/trust issue for readers.

### `blog/gestion-de-portefeuille-projet-pme`
- **content** @ Second 'À retenir' aside (quote attributed to Pierre Raschi) : The quote from Pierre Raschi ends without a closing punctuation mark or proper citation markup; 'Pierre Raschi' appears as raw inline text at the end of the paragraph body, making it ambiguous whether it is part of the quote or the attribution.
- **functional** @ Ordered list item — 'Bilan projet' link : The href points to 'https://www.airsaas.io/gestion-de-projet/comment-animer-un-bilan-projet-efficace' without the '/fr/' locale segment, unlike all other internal links on the page which correctly include '/fr/'. This will likely 404 or show the wrong locale.
- **content** @ Intro paragraph — 'présentation Power^Point' : The text reads 'Power^Point' with a literal caret character, which is a formatting artifact. It should read 'PowerPoint'.

### `blog/gestion-portefeuille-projets-vs-gestion-de-projet`
- **structure** @ URL slug vs. article content : The page slug is 'gestion-portefeuille-projets-vs-gestion-de-projet' (implying a comparison article), but the H1 and entire content is a comprehensive guide titled 'Management de portefeuille de projet : définition, méthodes et outils'. The slug does not match the content, causing SEO and navigation confusion.
- **structure** @ Blog body — first section heading : Heading hierarchy jumps from H1 (hero title) directly to H3 for all main section headings (e.g. 'Qu'est-ce que la gestion de portefeuille de projets ?'), skipping H2 entirely. Top-level article sections should use H2, not H3.

### `blog/jalon-projet`
- **content** @ Blog article body — 'Degré de confiance' paragraph : The paragraph reads 'Le degré de confiance dans le jalon d'un projet est l'ne des nouveautés…' — 'l'ne' is a clear typographic error for 'l'une', making the sentence nonsensical.
- **content** @ Hero — author avatar : The author pill shows 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg' (initials suggesting a different person), implying the photo and the name are mismatched.
- **structure** @ Blog body — 'Comment faire les jalons de son projet?' section : The H3 heading 'Comment faire les jalons de son projet ?' is immediately followed by a figure with no introductory paragraph — the section has no body text before jumping to the image and then to the next H3 'Trouver le bon nombre de jalons', making this heading a stub with no content of its own.
- **content** @ Figure alt text — 'plante-de-jalons-projet-airsaas.png' : The alt attribute reads 'Dessin de ' with no further text — it is visibly truncated and provides no meaningful description for screen readers or SEO.

### `blog/kpi-gestion-de-projet`
- **content** @ Blog hero — publication date : The article shows 'Le 1 février 2026', which is more than a year in the future relative to any plausible review date. Unlike minor date drift, a date this far ahead reads as a data-entry error (year typo: 2026 instead of 2022 or 2023) and will confuse readers who see it as a live publication date.
- **content** @ Author avatar — hero section : The author name displayed is 'Jérôme Dard' but the avatar image alt text also says 'Jérôme Dard' while the image URL contains the slug 'BR-min.jpg', suggesting the photo may belong to a different person (likely 'BR' initials). The wrong avatar paired with the author name is a credibility issue.
- **structure** @ Table of contents — Sommaire : The sommaire lists only 5 entries but the article visibly contains additional H3 sections (e.g. 'Comment utiliser des KPI…' sub-sections, KPI de délais, KPI de qualité). Several article sections are missing from the table of contents, making it an incomplete navigation aid.
- **functional** @ Précautions section — external link : The link 'suivi de votre projet' points to the full live domain 'https://www.airsaas.io/fr/gestion-de-projet/le-suivi-de-projet…' (absolute external URL) instead of the rebuilt internal path. In the rebuild this will route users away to the live site, breaking the internal navigation model.

### `blog/kanban-gestion-de-projet`
- **content** @ Blog body — 'Les avantages du Kanban physique' paragraph : The text reads 'Certaines équipes (notamment des dévelopes de développeurs informatiques)' — 'dévelopes' is a nonsensical word, clearly a corruption of 'équipes' or 'teams', making the sentence grammatically broken and embarrassing on a published article.
- **content** @ Hero / author metadata : The author avatar image URL points to a Webflow CDN asset (cdn.prod.website-files.com) labelled 'Jérôme Dard' but the filename is 'BR-min.jpg', suggesting the image is not actually of Jérôme Dard and may display the wrong person's photo.
- **functional** @ Table of contents — anchor links : The sommaire links use French-accented anchor hrefs (e.g. '#quest-ce-que-cest-que-la-méthode-kanban', '#le-kanban-comme-support-de-communication-intermédiaire') but the corresponding H3 headings in the body do not carry matching id attributes in the rendered HTML, meaning the in-page navigation is broken.
- **content** @ Blog body — last visible paragraph (truncated) : The article body is truncated mid-sentence ('c'est un bon support pour débattre. <br/></spa') and the closing tag is malformed ('</spa' instead of '</span>'). Even if this is a render truncation, it indicates the article content may not be fully rendered to the user.

### `blog/la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0`
- **functional** @ Sommaire navigation anchors : Several table-of-contents anchor hrefs are truncated (e.g., '#la-maintenance-connectée-pour-prévenir-les-pannes-machines-dans-les-lignes-de-pr', '#lenjeu-cybersécurité-dans-lindustrie-40-comment-rebondir-après-avoir-subi-une-at'), which will likely not match the full heading IDs in the article body, causing broken in-page scroll navigation.
- **functional** @ Body paragraph links (multiple sections) : Several in-body links point to old Webflow podcast URLs (e.g., 'https://www.airsaas.io/podcast-cio-revolution/…') which are likely dead paths on the current site. These should either be updated to valid URLs or removed.
- **content** @ Section 2 body — 'de manière automatiser' : The phrase 'la DSI envoie de manière automatiser des prévisions' contains a grammatical error; 'automatiser' should be 'automatisée' (past participle agreeing with the adverbial phrase).

### `blog/la-revue-de-projet`
- **content** @ Blog article body — first paragraph under 'À quoi sert une revue de projet ?' : The sentence 'En plus de l'objectif officiel, cette est un outil de management de projet...' contains an obvious grammatical error: 'cette est' should be 'celle-ci est' or 'cette réunion est'. A missing noun makes the sentence incomplete and unprofessional.
- **structure** @ Table of contents / Sommaire : The sommaire lists 'À quoi sert une revue de projet ? Qu'est-ce qu'une revue de projet ?' and then separately 'À quoi sert une revue de projet ?' as two distinct entries pointing to different anchors. These duplicate-titled entries will confuse readers — the second entry appears to be a section that was already answered in the first, suggesting a structural duplication error in the TOC.
- **functional** @ Blog article body — internal link in second paragraph : The link to 'conduite de projet' uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without locale prefix '/fr/', while other internal links (e.g. jalons) correctly use the full absolute airsaas.io URL. This will result in a broken link in the rebuild (404 or wrong locale).
- **brand** @ Author avatar — hero section : The author is labeled 'Jérôme Dard' but the avatar image URL contains 'SV-min.jpg' (suggesting initials 'SV', a different person). The photo and the name do not match, which is a credibility issue visible to any reader who notices the mismatch.

### `blog/le-diagramme-de-gantt-comment-sen-servir`
- **content** @ Blog hero — author avatar : The author avatar image URL points to a Webflow CDN asset (61e0385c210a2b1948e800a6_BR-min.jpg) but the author name shown is 'Jérôme Dard' — the initials 'BR' in the filename suggest the image belongs to a different person (likely Bruno or another author), so the wrong photo is displayed next to the author credit.
- **functional** @ Blog body — internal link (conduite de projet) : The link to the 'conduite de projet' article uses a relative path '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' without the '/fr/' locale prefix, which will result in a 404 on the rebuilt Next.js site.
- **functional** @ Blog body — internal link (jalon projet, last paragraph) : The closing paragraph links to '/gestion-de-projet/les-jalons-projet-une-technique-pour-sequencer-vos-projets-intelligemment' without a locale prefix, while other internal links correctly use '/fr/…', resulting in a broken link.
- **functional** @ CTA section — demo button (scroll animation) : The CTA button container has 'opacity-0 scale-[0.92]' classes with a transition but no scroll-triggered JS appears to flip it to visible, meaning the primary CTA button may be permanently invisible to users with motion-reduction disabled or if the intersection observer is not wired up.

### `blog/le-guide-du-mode-projet`
- **functional** @ Blog body — internal link in bullet list : The link to 'comment-etre-un-bon-chef-de-projet-transverse' uses an absolute URL pointing to 'https://www.airsaas.io/gestion-de-projet/...' (without the '/fr/' locale prefix and without the '/blog/' path segment), which will 404 in the rebuild environment and is inconsistent with the site's URL structure.
- **content** @ Blog hero — author avatar : The author is labelled 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', suggesting the photo belongs to a different person (likely the original Webflow CMS author). The avatar and the display name are mismatched.
- **functional** @ External link — chef de projet bullet : One bullet item links to 'https://www.reussirsesprojets.com/qualites-chef-de-projet/' (a third-party competitor-adjacent site) with no rel='noopener noreferrer' or nofollow attribute, which is both a security concern and an unintended SEO signal for a product page.

### `blog/le-grand-guide-de-la-conduite-de-projet`
- **content** @ Blog body — 'Tout savoir sur la note de cadrage projet' subsection : The anchor text 'Tout savoir sur la note de cadrage projet' links to '/gestion-de-projet/la-revue-de-projet' — the href points to the 'revue de projet' article, not the 'note de cadrage' article. This is a mismatched internal link that sends users to the wrong destination.
- **content** @ Blog body — inline links throughout article body : All internal article links use relative paths without locale prefix (e.g. '/gestion-de-projet/comment-mettre-une-demarche-de-projet-dans-mon-entreprise') instead of the rebuilt '/fr/blog/…' URL structure. These will 404 or redirect incorrectly in the Next.js rebuild.
- **structure** @ Blog hero — publication date display : The publication date is displayed as 'Le 1 février 2026', which is a future date far beyond any reasonable review window, strongly suggesting a CMS data mapping error (wrong field or epoch parsing bug) rather than an intentional future date.

### `blog/le-modele-de-presentation-pour-votre-comite-de-pilotage`
- **content** @ Blog article body – introductory paragraph : Typo: 'mennent' should be 'mènent' ('Un bon chef de projet sait que l'anticipation et la préparation sont des valeurs essentielles qui mennent au succès'). This is a visible spelling error in the published article body.
- **content** @ Blog article author avatar : The author is named 'Jérôme Dard' but the avatar image URL contains 'BR-min.jpg', suggesting the photo shown is not Jérôme Dard but a different person (likely 'BR' initials). Wrong author photo displayed.
- **structure** @ Blog article body – Table of Contents vs article sections : The Table of Contents lists three anchored sections (Qu'est-ce qu'un comité de pilotage, Le déroulement, Nos conseils), but the article's H3 headings lack matching id attributes (e.g. id='quest-ce-quun-comité-de-pilotage'). The TOC anchor links will silently fail to scroll to the correct section.
- **layout** @ CTA section – animated floating badge (bottom-right) : The floating decorative badge in the CTA section contains an empty icon span (Font Awesome glyph with no content rendered) and two skeleton-bar divs with no text — this appears as a broken/empty card visible on desktop (xl breakpoint), looking like a render bug rather than intentional decoration.

### `blog/le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation`
- **content** @ Blog hero — internal link in body text : The link to '/gestion-de-projet/portfolio-project-management-le-top-10-des-bonnes-pratiques' is a relative path missing the '/fr/blog' prefix, which will produce a 404 in the rebuild's routing structure.
- **content** @ Blog body — 'Résistance au changement' argument FOR section : The text references 'le Blog Pro de la Transfo - article Pilotage de projet ce qui a changé en 2023' as a clickable resource but no link is present; the parenthetical reads like a truncated or broken cross-reference left as plain text.
- **structure** @ Blog body — heading hierarchy : All body section headings are H3 but the article has no H2 between the page H1 and these H3s (the Sommaire heading is decorative/nav, not structural). This creates an illogical heading hierarchy (H1 → H3) that harms accessibility and SEO.

### `blog/le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes`
- **content** @ Internal link — 'grand guide de la conduite de projet' : The link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing '/fr/' locale prefix), which will 404 in the rebuilt site that uses locale-prefixed routes.
- **content** @ Blog body — intro paragraph : The phrase 'Découvrez icinotre sélection' is missing a space between 'ici' and 'notre', producing garbled inline text visible to readers.
- **content** @ Blog body — first paragraph : 'Pas de<strong></strong>bonne exécution<strong></strong>de stratégie' contains empty <strong> tags that break up the sentence visually — 'Pas de bonne exécution de stratégie' appears with odd spacing/no formatting, losing the intended emphasis.

### `blog/lean-portfolio-management`
- **content** @ À retenir aside block (SAFe DSI quote) : The quoted DSI testimony ends abruptly mid-sentence: '…mais toute l'entreprise sur du vertical,' — the sentence is cut off with no conclusion, suggesting the quote was truncated during rebuild.
- **content** @ Book reference link — 'The machine that changed the world' : The hyperlink on 'The machine that changed the world' points to a bare '#' anchor (dead link), which is non-functional and looks unfinished to users.
- **content** @ Blog article intro paragraphs — 'Disclaimer' paragraph : The sentence reads 'Ici nous avons ici l'objectif de traiter…' — 'ici' is duplicated ('ici nous avons ici'), which is an obvious copy error visible to readers.

### `blog/les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet`
- **content** @ Blog hero – publication date : The article displays 'Le 1 février 2026', which is a future date relative to any plausible review window in 2024–2025 and will appear incorrect/fabricated to readers. This is a data mapping error, not an intentional display choice.
- **content** @ Internal link in article body – 'guide des 10 bonnes pratiques' : The anchor href points to '/gestion-de-projet/portfolio-project-management-le-top-10-des-bonnes-pratiques' (missing the '/fr/' locale prefix), which will 404 or redirect incorrectly in the French locale of the rebuilt site.
- **structure** @ Blog article body – H3 section heading #5 : Section heading 5 is truncated in the rendered HTML ('5 - \n<!-- TRUNCATED -->'), indicating the body content may be cut off mid-article. If the truncation is only in the review snippet it could be benign, but the visible whitespace/newline after '5 -' suggests a rendering gap between the heading number and its label text.
- **functional** @ Table of contents – anchor links : TOC anchor hrefs use the full French heading text as fragment IDs (e.g. '#10---communiquer-sur-tous…'), but the H3 headings in the article body do not have explicit id attributes set to those slugs. The in-page jump links will silently fail to scroll to the correct section.

### `blog/macro-planning`
- **content** @ Blog article intro paragraph — internal link : The link to 'conduite de projet' points to '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (relative, no locale prefix), which will 404 in the rebuilt /fr/ routing. The 'note de cadrage' link similarly points to 'airsaas.io/gestion-de-projet/...' without the /fr/ prefix, mixing absolute and relative paths inconsistently.
- **content** @ Blog article intro paragraph — 'rapport flash' link : The link to the rapport flash page uses '/fr/solution/rapport-flash' while the surrounding text and internal links use inconsistent path conventions; more critically the anchor text is missing a leading space ('votre<a href=…>rapport flash</a>'), causing 'votrerrapport flash' to render as one word visually.
- **structure** @ Blog body — heading hierarchy : The article body uses H3 as its top-level section headings (e.g. 'Qu'est-ce qu'un macro planning ?') directly under the page H1, skipping H2 entirely for body sections. While the ToC section uses an H2 ('Sommaire'), the article content section has no H2, creating a broken heading hierarchy that harms SEO and accessibility.
- **content** @ Hero — author avatar image : The author avatar src is 'SV-min.jpg' (initials 'SV') but the displayed author name is 'Jérôme Dard' — the image does not match the credited author, suggesting a copy-paste error from another article's author metadata.
- **layout** @ Blog body — bullet/ordered lists : Each list item is wrapped in its own separate <ul> or <ol> element instead of being grouped into a single list. This renders identically spaced dots but breaks semantic list grouping, making screen readers announce multiple separate one-item lists rather than a single list.

### `blog/management-de-portefeuille-de-projet`
- **content** @ Blog hero — author byline : 'Jonas Roman' does not match any known AirSaas team member and is likely a placeholder or mis-mapped CMS value. Combined with the mismatched avatar, the author attribution is entirely incorrect.
- **structure** @ Blog body — 'Ce que la gestion de portefeuille de projets permet' paragraph : This introductory label ('Ce que la gestion de portefeuille de projets permet') is rendered as a plain <p> element without punctuation or heading markup, making it appear as an orphaned sentence fragment rather than a section intro or subheading.
- **content** @ Capacity table — first <th> header cell : The first column header cell in the 'Gestion des ressources vs Planification de la capacité' table is completely empty, leaving the row dimension unlabeled and the table semantically broken for assistive technologies and visual scanning.

### `blog/metier-pmo`
- **structure** @ Blog article body — heading hierarchy : The article body uses H3 as the top-level section headings (e.g., 'PMO : définition et signification') and H4 for sub-sections, but H2 is used only for 'Sommaire'. This creates an illogical hierarchy where H2 is a navigation widget and H3 carries the semantic weight of main content sections — screen readers and SEO crawlers will misread the document outline.
- **content** @ Blockquote — 'L'explosion du nombre de projets transverses' : The blockquote attributing '90% des projets sont transverses…' runs the quote text and the attribution ('Bertran Ruiz, CEO AirSaas') together without any separator or line break, making the attribution visually and semantically indistinguishable from the quote body.
- **content** @ Blockquote — 'L'échec du PMO contrôle' section : Same issue: the second Bertran Ruiz blockquote ('La plupart des participants…') merges the attribution directly into the quote text without punctuation or a visual break, making it appear as if 'Bertran Ruiz, CEO AirSaas' is part of the quoted speech.
- **structure** @ 'La posture' sub-section — two consecutive H4 headings : 'La posture' and 'Leadership' are rendered as consecutive H4 elements with no body copy between them, making 'La posture' look like an empty stub heading with no content of its own.
- **structure** @ 'Ses méthodologies' and 'Les outils et ressources clés' and 'Gestion de projet' — consecutive H4 headings : Multiple consecutive H4 headings appear without intervening body copy ('Ses méthodologies' → 'Optimiser le best effort'; 'Les outils et ressources clés' → 'Gestion de projet'), creating empty stub sections that look broken visually and structurally.

### `blog/pi-planning`
- **content** @ Third 'À retenir' callout (under 'PI Planning et framework SAFe') : Expert quote ends mid-sentence: 'Les valeurs temporelles comme le trimestre sont très a' — truncated. Same issue repeats in the fourth callout ('il peut') and fifth callout ('comme le budget à attribuer'), confirming that expert quote content is being systematically cut off across all callout blocks.
- **structure** @ Blog body section — heading hierarchy : The article body jumps from H1 (article title) directly to H3 for the first body section heading ('Qu'est-ce qu'un PI Planning ?'), skipping H2 entirely. H2 is used only for 'Sommaire' in the table-of-contents section. This breaks logical heading hierarchy for assistive technologies and SEO.
- **functional** @ Sommaire anchor links : The table-of-contents link '#à-quoi-ressemble-un-pi-planning-réussi-avec-des-bénéfices-concrets' and '#dès-sa-préparation-faites-de-votre-pi-planning-un-atout-pour-transformer' contain accented characters in the href fragment, which may fail to resolve in some browsers. IDs with accented characters are non-standard and unreliable as anchor targets.
- **content** @ Internal link in body copy — '/fr/gestion-de-projet/pi-safe' : The article links to '/fr/gestion-de-projet/pi-safe' but the rebuild is under the '/fr/blog/' path structure. If the blog slug convention has changed, this internal link likely 404s in the rebuild and should point to '/fr/blog/pi-safe' or the equivalent rebuilt URL.

### `blog/pi-safe`
- **functional** @ CTA button after 'Les avantages d'un bon PI Planning' section : The button is labelled 'Télécharger' (Download) but links to '/fr/meetings-pages', a demo/meetings page. The label does not match the destination and likely belonged to a downloadable resource (template, guide); this will confuse and mislead users.
- **content** @ Article publication date — hero section : The publication date displayed is '1 février 2026', which is over a year in the future relative to any reasonable review date. While future dates are noted as acceptable in some cases, this specific date appears to be a CMS data error (likely should be 2024 or 2025) and would appear obviously wrong to readers.
- **structure** @ Blog body — heading hierarchy : The article body starts directly with H3 and H4 headings with no H2 level; the page H1 is in the hero, then the next heading in the body is H3 ('Qu'appelle-t-on PI SAFe ?'). Skipping H2 entirely breaks heading hierarchy for accessibility and SEO.

### `blog/pilotage-de-projet`
- **functional** @ Body copy — internal link to 'conduite de projet' : The link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing locale prefix '/fr/'), which will result in a 404 or redirect failure in the rebuilt Next.js app that expects locale-prefixed routes.
- **functional** @ Body copy — internal link to 'cadrages' and 'suivi des projets' : Both links use absolute URLs pointing to 'https://www.airsaas.io/gestion-de-projet/…' (without '/fr/' locale prefix), which will route users away from the rebuild to the live site and bypass the rebuilt pages.
- **content** @ Hero — publication date : The article displays 'Le 1 février 2026' as its publication date. While future dates are not flagged as fabricated per policy, this date is over a year in the future from any plausible review window and is likely a CMS data entry error that will look wrong to every reader who notices it.

### `blog/plan-de-communication-projet`
- **content** @ Blog hero — publication date : The article shows 'Le 1 février 2026' as its publication date, which is more than a year in the future relative to any reasonable review date, and unlike a typical back-dated or lightly future-dated article this falls well outside a plausible CMS scheduling window. This will look like a data-mapping error (wrong field bound) to any reader.
- **content** @ Blog body — intro paragraph : The paragraph reads '…les meilleures stratégies de communication, les pratiques, et les erreurs courantes**en** la matière' — there is a missing space before 'en' (the <strong> closing tag leaves no space before 'en la matière'), producing a run-together word 'courantesen' in the rendered text.
- **content** @ Blog body — section 'Qui ?' (CQQCOQP matrix) : The paragraph reads 'Un. cercle/comité de communication peut être créé.' — there is a stray full-stop followed by a space after 'Un', producing 'Un. cercle' which is a broken sentence and looks like a mid-edit artifact rather than intentional source content.
- **structure** @ Blog body — heading hierarchy (CQQCOQP section) : The section opens with an H4 ('La matrice CQQCOQP : pour construire des plans de communication…') immediately followed by another H4 ('Qui ?') with no intervening H3. The CQQCOQP matrix heading should be an H3 (its sibling sections 'Pourquoi communiquer…' and 'Par où on commence…' are H3s), making the hierarchy inconsistent and visually confusing.

### `blog/plan-capacitaire`
- **content** @ Hero / article metadata — publication date : The article displays 'Le 1 février 2026' as its publication date, which is a future date relative to any current review cycle. While the prompt says future dates are not automatically a bug, a date more than a year ahead is most likely a data-entry error in the CMS (year typed as 2026 instead of 2024 or 2025) and will look wrong to any reader.
- **structure** @ Blog body — heading hierarchy (H3 / H4 used inside main content) : The page has an H1 in the hero, then jumps directly to H3 ('Qu'est-ce qu'un plan capacitaire ?') and H4 sub-heads in the body, skipping H2 entirely for the article body sections. The Sommaire section itself uses an H2 ('Sommaire'), but the actual article content never uses H2, creating an illogical and accessibility-failing heading hierarchy.
- **content** @ Blog body — bullet list items (missing spaces before text) : Several bullet items are missing a space between the closing bold tag and the surrounding text, e.g. 'Optimiser les ressources à disposition</strong>pour mieux planifier' and 'inventaire des ressources disponibles</strong>dans votre entreprise'. These render as run-together words visible to readers.
- **content** @ Blog body — H4 'Comment aider les équipes à calculer le temps de run et de build ?' : This sub-section header is styled as an H4 but its content is a methodology tip sitting between two Étape H4 headings (Étape 2 and Étape 3). It is not labelled as a step and breaks the numbered-step pattern, making the flow confusing — it reads as if it could be an Étape 2b or a callout block rather than a peer heading to the numbered steps.

### `blog/planification-de-la-demande-capacity-planning`
- **functional** @ Blog body — inline CTA button after culture-capacity-planning image : The CTA button is labelled 'Télécharger' (Download) but links to '/fr/meetings-pages' (the demo booking page). The label does not match the destination at all, which will confuse and mislead users.
- **content** @ Blog body — link to internal capacity planning product page : The anchor text reads 'Demandez une démo Airsaas' but the href points to 'https://www.airsaas.io/fr/produit/capacity-planning' (the product feature page), not the demo booking page. The label and destination are mismatched.
- **content** @ Blog body — 'Des objectifs différents' subsection : The phrase 'la planification de la demande vise à anticiper les besoins' is immediately followed by 'des' with no space before the word ('besoinsdes'). This is a missing space that produces a malformed word, visible to readers.

### `blog/planification-de-la-capacite`
- **functional** @ Inline CTA button mid-article (after 'Jouez collectif') : The CTA button is labelled 'Télécharger' but links to '/fr/meetings-pages' (a demo/meetings page). The label does not match the destination or the surrounding content context about collaboration planning, making it misleading and likely to erode trust.
- **content** @ Body content – bullet list on resource types : The list of resource types managed in capacity planning contains only two items ('Les ressources financières' and 'Les ressources humaines') but the following sentence refers to 'ce dernier point' implying at least a third category (e.g. material/technical resources) is missing — the list appears truncated from the source.
- **content** @ Body – 'Adopter un outil adapté' section : The section body is truncated mid-sentence ('nous avons') in the rendered HTML. The product pitch and any closing CTA for AirSaas are cut off, leaving an incomplete paragraph visible to the reader.
- **content** @ Body – 'Ne vous y détrompez pas' paragraph : 'Ne vous y détrompez pas' is a grammatical error in French; the correct idiom is 'Ne vous y trompez pas'. This is a content/copy bug that appears directly in the rebuild output and is user-visible.

### `blog/portefeuille-projet`
- **content** @ Blog hero — author badge : The author avatar image URL loads a photo labelled 'Avatar Jérôme' (from the CDN filename 'Avatar Jérôme.png') but the displayed name is 'Jonas Roman'. The image and the name do not match the same person, which is a visible credibility issue.
- **structure** @ Blog body — first content section heading : The first body section ('Qu'est-ce que la gestion de portefeuille de projets ?') is rendered as an <h3> rather than an <h2>. The page has an H1 (article title) and then jumps directly to H3, skipping H2 entirely, breaking the heading hierarchy and harming accessibility/SEO.
- **content** @ Blog body — 'Ce que la gestion de portefeuille de projets permet' paragraph : The sentence 'Ce que la gestion de portefeuille de projets permet' is rendered as a plain <p> tag instead of a heading or labeled list title. It reads like a truncated or unstyled heading sitting awkwardly before the bullet list, giving the impression the content was cut off mid-structure.

### `blog/pourquoi-mettre-en-place-un-pmo`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026', which is a future date far beyond any plausible authoring date for this evergreen PMO article. Unlike minor date discrepancies, this date is over a year ahead and will confuse readers who see it as an obvious error.
- **structure** @ Blog body — heading hierarchy : The article body jumps directly from H1 (page title) to H3 for all section headings (e.g., 'L'envolée des projets transverses', 'Projets silos et transformation'…) with no H2 intermediate level. The table of contents is in an H2, but the body sections skip H2 entirely, creating an illogical and broken heading hierarchy for screen readers and SEO.
- **functional** @ Blog body — internal link in body text : The link to the PMO métier article points to 'https://www.airsaas.io/fr/gestion-de-projet/metier-pmo' (the live domain with the old URL structure), not a relative rebuild path. This is a hardcoded absolute URL to the production site embedded inside the rebuilt page body, which will break navigation on the rebuild environment.

### `blog/preparer-comite-de-pilotage-d-un-projet`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026', which is a future date well beyond any plausible review window. This is likely a data-entry error (2026 instead of 2022) that will confuse readers and hurt credibility.
- **functional** @ Blog body — internal link (serie Copil) : The link to '/gestion-de-projet/copil-projet-ou-comite-de-pilotage-projet-les-bases' is a relative path missing the locale prefix '/fr/', which will 404 on the rebuilt site where all routes are under /fr/.
- **functional** @ Blog body — all absolute internal links : Several in-body links point to 'https://www.airsaas.io/fr/...' (e.g. comite-de-pilotage-definitions-et-incomprehensions, comment-decider-en-copil, chef-de-projet-transverse). These hardcode the live domain instead of using relative paths, so clicks from the rebuild environment will leave the rebuilt site entirely.

### `blog/pourquoi-vos-18-millions`
- **structure** @ Blog article body — all section headings : All article section headings use <h3> while the page's only <h1> is the article title and there is no <h2> bridging structure in the body. The TOC section uses an <h2> ('Sommaire') but the article content jumps directly to <h3> headings, creating a skipped heading level (h1 → h3) that breaks both accessibility and SEO heading hierarchy.
- **content** @ Hero — article title vs. URL slug : The page slug is 'pourquoi-vos-18-millions' and the original live URL references '18 millions', but the rendered H1 reads 'Pourquoi vos millions de transformation s'évaporent' (without '18'). The number '18' also appears in section anchor IDs and body copy but is absent from the H1, creating an inconsistency that may confuse readers arriving via the titled URL.
- **content** @ À retenir callout — 'L'illusion du pilotage stratégique' section (quote attribution) : The quote 'Je croyais avoir la main sur nos transformations…' is attributed to 'DG, groupe technologique, 1 400 salariés' — this looks like a pulled quote that should have a distinct visual treatment (blockquote / testimonial card) rather than being inside an 'À retenir' info-box, conflating editorial insight with a named executive quote.

### `blog/program-increment-planning`
- **content** @ Third 'À retenir' callout (H4 'PI Planning et framework SAFe') : Expert quote ends abruptly: 'Les valeurs temporelles comme le trimestre sont très a' — clearly truncated. Multiple callouts sharing this truncation pattern suggests the expert-quote component is systematically cutting off the content field at a character limit.
- **content** @ Fourth 'À retenir' callout (after quarterly rhythm paragraph) : Expert quote is cut mid-sentence: 'dans un contexte de gestion de portefeuille de projets, il peut' — same truncation bug. All five 'À retenir' callouts in the visible portion appear to suffer from this, indicating a systemic data-fetching or rendering issue with the expert quote field.
- **content** @ Fifth 'À retenir' callout (under H4 'Quels sont les bénéfices') : Expert quote ends abruptly: 'les capacités comme le budget à attribuer' — sentence is unfinished. Confirms the systemic truncation of all expert-quote callouts on the page; the rendered output is missing the full CMS content.
- **functional** @ Sommaire anchor links : The anchor '#à-quoi-ressemble-un-pi-planning-réussi-avec-des-bénéfices-concrets' and '#dès-sa-préparation-faites-de-votre-pi-planning-un-atout-pour-transformer' contain raw accented characters in href values; these should be percent-encoded (e.g. '%C3%A0') to ensure reliable cross-browser navigation without JS smoothScroll fallback.

### `blog/project-portfolio-management`
- **functional** @ Blog body — internal link after section 2 : The link to the related article uses a relative path without the '/fr/' locale prefix: href='/gestion-de-projet/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets'. This will 404 on the rebuilt site which uses /fr/ prefixed routes.
- **content** @ Hero — publication date : The article displays 'Le 1 février 2026', which is a future date relative to any reasonable review window. This looks like a CMS data error (year should likely be 2023 or 2024 given the article content and image URLs), and will appear as a fabricated or broken date to readers.
- **content** @ Blog body — section 1, paragraph about ERP : The sentence 'Le programme ERP, SI Finance, ERP ne fera jamais rêver !' repeats 'ERP' twice in the same short phrase ('Le programme ERP, SI Finance, ERP'), which reads as a copy/paste error in the source content that should be corrected (e.g. 'SI Finance, ERP').

### `blog/reporting-pmo`
- **content** @ Blog article body — Paracelse attribution : Paracelse (Paracelsus) is described as 'médecin et alchimiste Russe' — he was Swiss-German, not Russian. This is a factual error visible to readers.
- **content** @ Blog article body — 'démonter' typo : The phrase reads 'L'importance du design n'est plus à démonter' — the correct word is 'démontrer'. 'Démonter' means to dismantle, not to demonstrate.
- **structure** @ Blog article body — heading hierarchy : The article body starts directly with H3 headings (no H2 wrapping the main content sections), while the Sommaire section above uses an H2. The first content heading 'Qu'est-ce qu'un reporting projet…' is an H3, creating a broken hierarchy where H3 appears as the top-level heading in the article body.
- **content** @ Blog article body — 'vue chronologique' grammar : 'La vue chronologique vous offrent une grande flexibilité' uses a plural verb ('offrent') with a singular subject ('La vue chronologique'). Should be 'vous offre'.

### `blog/retour-sur-agile-en-seine-2023`
- **content** @ Hero / publication date : The article is dated 'Le 1 février 2026' which is over two years after the event (Agile en Seine 2023). This is almost certainly a data-mapping or CMS migration bug producing a wrong date, not an intentional future date — the live site shows a 2023/2024 date for this post.
- **content** @ Blog body — intro paragraph : Missing space before the LinkedIn link: 'l'équipe <a href=...>Agile en Seine</a>pour l'organisation' — 'Seine</a>pour' runs together without a space, making the sentence read incorrectly on screen.
- **structure** @ Blog body — heading hierarchy : The page uses H3 directly for top-level conference sections and H4 for sub-sections, but there is no H2 in the article body (only the 'Sommaire' section uses an H2). The article content skips H2 entirely, creating an illogical heading hierarchy (H1 → H3 → H4) that breaks accessibility and SEO.

### `blog/role-du-pmo`
- **structure** @ Blog body — section headings : The article body opens directly with H3 tags ('Les symptômes d'un PMO dysfonctionnel', etc.) without an H2 parent, creating an illogical heading hierarchy (H1 → H3 → H4). The Sommaire section uses H2 for 'Sommaire' but the article content never uses H2, leaving the body structurally orphaned under the H1.
- **content** @ Hero — publication date : The article shows 'Le 1 février 2026', which is a future date relative to any plausible review/ship date in 2024–2025, suggesting a CMS data entry error (year digit off by one). This will appear wrong to every reader who sees it.
- **functional** @ Blog body — internal link 'reporting' : The anchor linking to 'reporting' points to the absolute URL 'https://www.airsaas.io/fr/gestion-de-projet/reporting-pmo' (live domain) instead of a relative path, meaning it will always route users away from localhost/staging to production — a broken cross-environment link.
- **functional** @ Blog body — internal link 'chefs de projet' : The anchor for 'chefs de projet' also uses the absolute live-domain URL 'https://www.airsaas.io/fr/gestion-de-projet/chef-de-projet-pmo' rather than a relative path, same cross-environment routing issue as above.

### `blog/trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets`
- **content** @ Blog hero — publication date : The article displays 'Le 1 février 2026', which is more than a year in the future relative to the article's evident 2022 publish date (image URLs contain '6330…' Webflow CMS IDs consistent with late 2022). This looks like a date mapping bug in the rebuild rather than a legitimate future publish date.
- **structure** @ Blog body — heading hierarchy : The first section heading in the body is an H3 ('PPM : trois innovations qui font la différence') with no preceding H2, meaning the heading hierarchy jumps from H1 (hero title) directly to H3, then to H4 sub-headings. This is an illogical hierarchy beyond the accepted blog-body H3 downshift pattern.
- **content** @ Blog body — figure caption : The caption below the KISS-principle image reads 'L'un des meilleurs conseils produigué :-)' — 'produigué' is a clear typo (should be 'prodigué'). This is a user-visible spelling error in rendered body copy.

### `blog/tout-savoir-sur-la-note-de-cadrage-projet`
- **content** @ Blog article body — 'Description du projet et des livrables inclus' paragraph : The word 'quantité' is repeated twice in the same sentence ('la quantité, la quantité, la longueur…'), which reads as a copy-paste error in the source that should have been 'la qualité, la quantité' or similar. This is a visible editorial bug in the rendered page.
- **content** @ Blog hero — author avatar : The author is labelled 'Jérôme Dard' but the avatar image URL references 'SV-min.jpg', suggesting the photo belongs to a different person (likely the initials S.V.). Author name and photo are mismatched.
- **functional** @ Blog article body — internal link 'conduite de projet' : The link href is '/gestion-de-projet/le-grand-guide-de-la-conduite-de-projet' (missing the '/fr/' locale prefix used everywhere else on the page), which will likely 404 or redirect incorrectly in the rebuilt Next.js routing.
- **functional** @ Blog article body — internal link 'budget' : The budget link href is 'https://www.airsaas.io/gestion-de-projet/budgetiser-un-projet-sans-se-louper' — it points to the live production domain instead of a relative internal path, breaking locale consistency and bypassing the rebuild entirely.

## All pages

| Slug | Type | Status | P0 | P1 | P2 | Note |
|---|---|---|---|---|---|---|
| `portfolio-management` | solution | BLOCK | 4 | 3 | 1 |  |
| `comite-direction` | equipe | BLOCK | 3 | 3 | 2 |  |
| `comite-de-pilotage-definitions-et-incomprehensions` | blog | BLOCK | 3 | 3 | 2 |  |
| `pi-safe` | blog | BLOCK | 3 | 3 | 2 |  |
| `pilotage-de-projet` | blog | BLOCK | 3 | 3 | 2 |  |
| `pourquoi-vos-18-millions` | blog | BLOCK | 3 | 3 | 2 |  |
| `outil-pmo` | equipe | BLOCK | 3 | 2 | 1 |  |
| `comment-decider-en-copil` | blog | BLOCK | 2 | 4 | 2 |  |
| `pi-planning` | blog | BLOCK | 2 | 4 | 2 |  |
| `program-increment-planning` | blog | BLOCK | 2 | 4 | 2 |  |
| `gestion-de-portefeuille-projet-pme` | blog | BLOCK | 2 | 3 | 0 |  |
| `cadrage-projet` | blog | BLOCK | 2 | 2 | 1 |  |
| `outil-ppm` | solution | BLOCK | 1 | 5 | 2 |  |
| `capacity-planning` | produit | BLOCK | 1 | 4 | 2 |  |
| `management-de-portefeuille-projet` | solution | BLOCK | 1 | 4 | 1 |  |
| `tableau-de-bord-dsi` | solution | BLOCK | 1 | 4 | 3 |  |
| `tableau-de-bord-gestion-de-projet` | solution | BLOCK | 1 | 4 | 3 |  |
| `tableau-de-bord-portefeuille-de-projet` | solution | BLOCK | 1 | 4 | 1 |  |
| `flash-report` | solution | BLOCK | 1 | 3 | 2 |  |
| `la-revolution-numerique-au-sein-du-secteur-de-lindustrie-industrie-4-0` | blog | BLOCK | 1 | 3 | 1 |  |
| `management-de-portefeuille-de-projet` | blog | BLOCK | 1 | 3 | 1 |  |
| `trois-innovations-et-tendances-qui-bousculent-la-gestion-de-portefeuille-de-projets` | blog | BLOCK | 1 | 3 | 3 |  |
| `automatiser-la-com-projet` | produit | BLOCK | 1 | 2 | 2 |  |
| `gestion-portefeuille-projets-vs-gestion-de-projet` | blog | BLOCK | 1 | 2 | 1 |  |
| `pi-planning` | lp | WARN | 0 | 5 | 3 |  |
| `flash-report-projet` | solution | WARN | 0 | 5 | 3 |  |
| `gestion-portefeuille-projet` | solution | WARN | 0 | 5 | 3 |  |
| `outils-de-pilotage-projet` | solution | WARN | 0 | 5 | 3 |  |
| `analyse-des-risques-projet` | blog | WARN | 0 | 5 | 3 |  |
| `appel-doffres-et-evaluation-dune-solution-ppm-project-portfolio-management` | blog | WARN | 0 | 5 | 3 |  |
| `budget-previsionnel-projet` | blog | WARN | 0 | 5 | 3 |  |
| `capacity-planning-definition` | blog | WARN | 0 | 5 | 3 |  |
| `macro-planning` | blog | WARN | 0 | 5 | 3 |  |
| `metier-pmo` | blog | WARN | 0 | 5 | 3 |  |
| `ppm` | lp | WARN | 0 | 4 | 4 |  |
| `priorisation-par-equipes` | produit | WARN | 0 | 4 | 3 |  |
| `traduction-one-click-avec-deepl` | produit | WARN | 0 | 4 | 4 |  |
| `airsaas-et-les-experts-de-la-transfo` | solution | WARN | 0 | 4 | 3 |  |
| `direction-de-la-transformation` | equipe | WARN | 0 | 4 | 4 |  |
| `it-et-operation` | equipe | WARN | 0 | 4 | 3 |  |
| `capacity-planning` | blog | WARN | 0 | 4 | 4 |  |
| `chef-de-projet-transverse` | blog | WARN | 0 | 4 | 3 |  |
| `comment-elaborer-un-reporting-efficace` | blog | WARN | 0 | 4 | 4 |  |
| `comment-gerer-lagressivite-dans-les-comites-de-pilotage` | blog | WARN | 0 | 4 | 3 |  |
| `comment-mettre-en-place-un-pmo` | blog | WARN | 0 | 4 | 4 |  |
| `comment-mettre-une-bonne-meteo-projet` | blog | WARN | 0 | 4 | 4 |  |
| `comment-reussir-un-projet-transverse` | blog | WARN | 0 | 4 | 3 |  |
| `demarche-de-projet` | blog | WARN | 0 | 4 | 4 |  |
| `fiche-projet-exemple-et-methodologie` | blog | WARN | 0 | 4 | 4 |  |
| `jalon-projet` | blog | WARN | 0 | 4 | 4 |  |
| `kpi-gestion-de-projet` | blog | WARN | 0 | 4 | 4 |  |
| `kanban-gestion-de-projet` | blog | WARN | 0 | 4 | 4 |  |
| `la-revue-de-projet` | blog | WARN | 0 | 4 | 4 |  |
| `le-diagramme-de-gantt-comment-sen-servir` | blog | WARN | 0 | 4 | 3 |  |
| `le-modele-de-presentation-pour-votre-comite-de-pilotage` | blog | WARN | 0 | 4 | 4 |  |
| `les-10-erreurs-a-ne-pas-commettre-dans-la-mise-en-place-dun-portefeuille-projet` | blog | WARN | 0 | 4 | 4 |  |
| `plan-de-communication-projet` | blog | WARN | 0 | 4 | 4 |  |
| `plan-capacitaire` | blog | WARN | 0 | 4 | 4 |  |
| `planification-de-la-capacite` | blog | WARN | 0 | 4 | 3 |  |
| `reporting-pmo` | blog | WARN | 0 | 4 | 4 |  |
| `role-du-pmo` | blog | WARN | 0 | 4 | 4 |  |
| `tout-savoir-sur-la-note-de-cadrage-projet` | blog | WARN | 0 | 4 | 4 |  |
| `pmo` | lp | WARN | 0 | 3 | 3 |  |
| `capacity-planning` | lp | WARN | 0 | 3 | 4 |  |
| `budget` | produit | WARN | 0 | 3 | 4 |  |
| `reporting-projet` | produit | WARN | 0 | 3 | 4 |  |
| `revue-de-portefeuille` | solution | WARN | 0 | 3 | 4 |  |
| `10-pratiques-pour-developper-la-relation-de-confiance-dg-cio` | blog | WARN | 0 | 3 | 4 |  |
| `budgetiser-un-projet-sans-se-louper` | blog | WARN | 0 | 3 | 3 |  |
| `chef-de-projet-pmo` | blog | WARN | 0 | 3 | 4 |  |
| `comite-pilotage-projet` | blog | WARN | 0 | 3 | 3 |  |
| `comment-animer-un-comite-de-pilotage` | blog | WARN | 0 | 3 | 3 |  |
| `comment-faire-un-bon-point-davancement-projet` | blog | WARN | 0 | 3 | 4 |  |
| `copil-projet-ou-comite-de-pilotage-projet-les-bases` | blog | WARN | 0 | 3 | 2 |  |
| `le-guide-du-mode-projet` | blog | WARN | 0 | 3 | 4 |  |
| `le-grand-guide-de-la-conduite-de-projet` | blog | WARN | 0 | 3 | 5 |  |
| `le-portefeuille-projets-pour-faire-grandir-les-collaborateurs-et-lorganisation` | blog | WARN | 0 | 3 | 5 |  |
| `le-suivi-de-projet-pour-garder-aligne-les-parties-prenantes` | blog | WARN | 0 | 3 | 4 |  |
| `lean-portfolio-management` | blog | WARN | 0 | 3 | 5 |  |
| `planification-de-la-demande-capacity-planning` | blog | WARN | 0 | 3 | 3 |  |
| `portefeuille-projet` | blog | WARN | 0 | 3 | 2 |  |
| `pourquoi-mettre-en-place-un-pmo` | blog | WARN | 0 | 3 | 3 |  |
| `preparer-comite-de-pilotage-d-un-projet` | blog | WARN | 0 | 3 | 4 |  |
| `project-portfolio-management` | blog | WARN | 0 | 3 | 4 |  |
| `retour-sur-agile-en-seine-2023` | blog | WARN | 0 | 3 | 5 |  |
| `comment-animer-un-bilan-projet-efficace` | blog | PASS | 0 | 2 | 4 |  |
| `comment-avoir-une-gestion-de-portefeuille-projet-pragmatique-en-2022` | blog | PASS | 0 | 2 | 4 |  |
| `comment-mettre-en-place-un-comite-de-pilotage` | blog | PASS | 0 | 0 | 0 | parse: invalid JSON: Expected ',' or '}' after property value in JSON at position 1543 (line 25 column 170) |
