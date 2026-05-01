# QA audit — extraction Opus vs live (section-by-section)

**Date** : 2026-04-30T09:04:36.274Z
**Pages auditées** : 26
**Coût** : $11.722

## Bilan global

### Verdict pages
- **FAITHFUL** : 18
- **MOSTLY_FAITHFUL** : 7
- **PARTIAL** : 1
- **BROKEN** : 0

### Verdict sections (sur 469 sections extraites)
- **OK** : 435 (92.8%)
- **INCOMPLETE** : 7 (1.5%)
- **TRUNCATED** : 1 (0.2%)
- **MISSING_ON_LIVE** : 2 (0.4%)
- **WRONG_FIELDS** : 6 (1.3%)
- **WRONG_IMAGE** : 18 (3.8%)
- **Sections manquantes** (présentes sur live, absentes du extract) : 16 cumul

## Détail par page

| Page | Verdict | OK | Incomplete | Trunc | Halluc | Missing live | Wrong fields | Wrong img | Missing extract |
|---|---|---|---|---|---|---|---|---|---|
| produit/automatiser-la-com-projet | FAITHFUL | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| produit/budget | FAITHFUL | 12 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| produit/capacity-planning | FAITHFUL | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| equipe/comite-direction | MOSTLY_FAITHFUL | 14 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
| equipe/direction-de-la-transformation | FAITHFUL | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| equipe/outil-pmo | FAITHFUL | 19 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| solution/flash-report-projet | FAITHFUL | 24 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| solution/flash-report | FAITHFUL | 17 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| equipe/it-et-operation | FAITHFUL | 18 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| lp/capacity-planning | FAITHFUL | 19 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| lp/pmo | MOSTLY_FAITHFUL | 20 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| lp/ppm | FAITHFUL | 18 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| solution/outils-de-pilotage-projet | FAITHFUL | 28 | 0 | 0 | 0 | 0 | 0 | 0 | 2 |
| lp/pi-planning | MOSTLY_FAITHFUL | 16 | 3 | 0 | 0 | 0 | 0 | 0 | 4 |
| solution/portfolio-management | MOSTLY_FAITHFUL | 20 | 1 | 0 | 0 | 0 | 0 | 1 | 4 |
| produit/priorisation-par-equipes | FAITHFUL | 7 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| produit/reporting-projet | FAITHFUL | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| solution/revue-de-portefeuille | FAITHFUL | 22 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| solution/airsaas-et-les-experts-de-la-transfo | FAITHFUL | 7 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| solution/gestion-portefeuille-projet | PARTIAL | 29 | 0 | 1 | 0 | 0 | 0 | 1 | 5 |
| solution/management-de-portefeuille-projet | FAITHFUL | 26 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| solution/outil-ppm | MOSTLY_FAITHFUL | 23 | 1 | 0 | 0 | 0 | 0 | 3 | 0 |
| solution/tableau-de-bord-dsi | MOSTLY_FAITHFUL | 13 | 0 | 0 | 0 | 2 | 3 | 9 | 0 |
| solution/tableau-de-bord-gestion-de-projet | MOSTLY_FAITHFUL | 15 | 0 | 0 | 0 | 0 | 2 | 1 | 0 |
| solution/tableau-de-bord-portefeuille-de-projet | FAITHFUL | 22 | 0 | 0 | 0 | 0 | 0 | 3 | 0 |
| produit/traduction-one-click-avec-deepl | FAITHFUL | 9 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## Top issues par page

### equipe/comite-direction — MOSTLY_FAITHFUL
*Extraction is highly faithful to the live page. All 15 sections are present in correct order with accurate content, images, CTAs and stats. Only nuance: the customer-testimonials block stuffs company/sector/employee meta into the `text` field since live cards have no quote — a defensible adaptation but slightly off canonical testimonial schema. Feature-split #9 (programs) drops the live Lottie video, and the integrations feature-split takes only the first slide of a 2-slide carousel, both acceptable.*

- [WRONG_FIELDS] section[13] type=customer-testimonials "Laissez nos clients..." — The 'text' field stores the company+sector+employee count meta (not a testimonial quote). Live has no quote text — only company/sector/employees per card. Mapping company meta into 'text' is a reasonable adaptation but not a true testimonial quote.

### lp/capacity-planning — FAITHFUL
*Extraction is highly faithful to the live page. All 20 sections from the live HTML are present in the JSON in the correct order with correct content, images, CTAs, and bullets. Minor weakness: the 'Notre parti pris' icon-row collapses the three card titles (Macro, pas micro / Maintenable / Actionnable) and their descriptions into single label strings rather than preserving structured title+description fields. Otherwise, hero highlight, pain points, all feature-splits with correct image alternation, stats, testimonials with LinkedIn URLs, trust badges, FAQ items, and final dual-CTA all match live.*

- [INCOMPLETE] section[14] type=icon-row "Notre parti pris" — Live has 3 cards each with separate title (Macro/Maintenable/Actionnable) and description. Extraction merges them into a single label string per item, losing structured title/description split.

### lp/pmo — MOSTLY_FAITHFUL
*Extraction is mostly faithful. The hero, stats, pain-points, all 8 feature-splits, testimonials, trust-badges, logo bars, steps, FAQ and final CTA all match live content accurately. Two minor issues: (1) the first icon-row's title 'Découvrez AirSaas en action' and subtitle appear fabricated — live has no such heading, just a tabbed Lottie showcase with the 6 module icons; (2) the Kanban des décisions section has a small bullet substitution where live had a duplicated bullet. No sections from live are missing from the extraction.*

- [INCOMPLETE] section[1] type=icon-row "Découvrez AirSaas en action" — Live has 6 tabs (Portfolio, Quarter plan, Capacitaire, Priorisation, Roadmap, Reporting) with Lottie animations as a tabbed showcase. The icon-row labels match but live has no 'Découvrez AirSaas en action' / 'Une suite complète...' heading - this title/subtitle appears fabricated.

### lp/ppm — FAITHFUL
*Extraction is highly faithful to live page. All 18 sections present on live are reproduced with correct content, canonical fields and proper image assignments. Only minor gap: the hero on live includes a Lottie-animated tabs widget showcasing 6 product views, which is not represented as an imageSrc in the extracted hero (acceptable since it's an interactive Lottie animation, not a static product mockup). All feature-split images point to real product webp mockups, not icons. Testimonial fields (name/role/company/avatar/linkedin) are canonically assigned. Stats use value+label canonically.*

- [MISSING_FROM_EXTRACT] Hero tabs widget showing 6 product tabs (Portfolio, Quarter plan, Capacitaire, Priorisation, Roadmap, Reporting) with Lottie animations - this is part of the hero visual on live but extracted hero has no imageSrc/visual representation (suggested: hero-tabs or hero with imageSrc)

### solution/outils-de-pilotage-projet — FAITHFUL
*Extraction is faithful and complete in textual content. Hero, stats, intros, feature-splits and CTAs all match the live HTML, with sensible consolidations of multi-block sections (lists carried into the relevant feature-split, conclusions merged into the preceding section). Minor stat label was shortened ('3x moins cher' vs '3x moins cher que les outils du marché'). The Maslow pyramid visual block and a couple of decorative subsection images aren't represented as their own image blocks, but the underlying text content has been captured. No hallucinations, no truncations, no wrong field assignments, no obviously wrong product images.*

- [MISSING_FROM_EXTRACT] Maslow pyramid visual block ('Pour matérialiser un idéal type de ces deux visions...') with two SVG images side by side (suggested: feature-split or image block)
- [MISSING_FROM_EXTRACT] Image/graphic illustrating 'Depuis combien de temps...' (outil10.svg) and 'Quel a été le premier besoin' (outil11.svg with caption) — text captured but accompanying images not represented as feature-split (suggested: feature-split images)

### lp/pi-planning — MOSTLY_FAITHFUL
*Extraction is largely faithful: all main feature-split sections, stats, pain-points, comparison rows, FAQ, testimonial and trust badge are correctly captured with canonical fields. Main gaps: (1) hero is missing the eyebrow tag and the interactive product-tabs/Lottie showcase below the headline; (2) comparison table missing its subtitle; (3) the final CTA section is reduced to a single CTA when live shows two parallel CTA cards with their own descriptions.*

- [INCOMPLETE] section[0] type=hero — Missing eyebrow tag 'Pour les RTE, PMO SAFe et équipes agiles à l'échelle' and the interactive tabs/Lottie product showcase.
- [INCOMPLETE] section[13] type=comparison-table — Missing subtitle 'Le quotidien du RTE transformé.'
- [INCOMPLETE] section[18] type=cta — Live has two CTA cards each with own heading + description (Réserver une démo / Découvrir vidéo). Extraction collapses to single CTA + videoHref, losing the second card's heading and description text.
- [MISSING_FROM_EXTRACT] Hero tag/eyebrow above title: 'Pour les RTE, PMO SAFe et équipes agiles à l'échelle' (suggested: hero.eyebrow)
- [MISSING_FROM_EXTRACT] Hero interactive tabs showcasing 6 product views (Portfolio, Quarter plan, Capacitaire, Priorisation, Roadmap, Reporting) with Lottie animations (suggested: tabs / product-showcase)
- [MISSING_FROM_EXTRACT] Comparison table subtitle 'Le quotidien du RTE transformé.' (suggested: section.subtitle)
- [MISSING_FROM_EXTRACT] CTA section has two cards (Réserver une démo + Découvrir la vidéo) with descriptions, not just two links (suggested: cta-dual-card)

### solution/portfolio-management — MOSTLY_FAITHFUL
*Extraction is highly faithful to the live page. All major sections (hero, press quotes, testimonials, stats, intro, feature-splits, steps, CTA, comparison table, customer testimonials) are present, in correct order, with accurate copy. Minor gaps: hero Lottie video not represented, newsletter section's email mockups missing, marketplace slider reduced to one image, and customer testimonial cards lose sector/employee structured metadata (folded into role string with case-study titles substituted as 'text'). One feature-split uses an SVG illustration (portfolio4.svg) which is faithful to live but not a product mockup.*

- [WRONG_IMAGE] section[17] type=feature-split "Transparence au coeur du portfolio" — imageSrc is portfolio4.svg — this is the live image but it's an SVG illustration, not a product mockup. Faithful to live, so could be OK; flagging per rubric.
- [INCOMPLETE] section[19] type=feature-split "Marketplace AirSaas intégrations" — Live has a slider with 2 images (Automation-integrations + Graphic Integrations); extraction kept only one image. Minor.
- [MISSING_FROM_EXTRACT] Hero Lottie video animation (Video-PMO.json) — not represented as image/video in hero (suggested: hero media)
- [MISSING_FROM_EXTRACT] Newsletter sponsor section's 3 email mockup images (Control tower email FR-1/2/3) (suggested: image gallery within steps)
- [MISSING_FROM_EXTRACT] Customer testimonials cards' Sector + Number of employees metadata (only embedded into 'role' string) (suggested: structured testimonial metadata)
- [MISSING_FROM_EXTRACT] Customer-testimonials intro paragraph: 'Qui de mieux pour vous parler de la plateforme que ceux qui l'utilisent au quotidien...' (suggested: section subtitle)

### solution/gestion-portefeuille-projet — PARTIAL
*Extraction is generally faithful and well-structured for the first ~30 sections (hero, press, testimonials, intros, feature-splits, CTAs all properly typed and content accurate). However the JSON file is TRUNCATED — the last feature-split (Jira integration) ends mid-token at "feature-sp..." and the remainder of the page is missing: Microsoft Teams integration block, "UX forte" feature, "méthodologie collaborative" intro, the final highlighted summary paragraph, and the final "Découvrez comment AirSaas peut vous aider" CTA. The captured content itself is faithful but the file appears cut off, leaving 5+ live sections unrepresented.*

- [WRONG_IMAGE] section[8] type=feature-split "Observez la consommation" — imageSrc is outil3.svg which on live is the actual illustration for this section, so this is faithful. Actually OK.
- [TRUNCATED] section[30] type=feature-split "Un outil PPM intuitif - Jira" — Extracted JSON file is cut off mid-section; output ends with 'feature-sp...'
- [MISSING_FROM_EXTRACT] Microsoft Teams integration feature-split (with outil18b.svg image) (suggested: feature-split)
- [MISSING_FROM_EXTRACT] Un outil PPM avec une UX forte (Feed search solution image) (suggested: feature-split)
- [MISSING_FROM_EXTRACT] Un outil PPM portant une méthodologie collaborative pour impliquer les métiers (suggested: intro)
- [MISSING_FROM_EXTRACT] Highlight paragraph: 'AirSaas est donc solution PPM légère...' (suggested: intro)

### solution/outil-ppm — MOSTLY_FAITHFUL
*Extraction is faithful and well-structured. All major sections present in the correct order. Minor issues: (1) Maslow pyramids feature-split shows only one of two SVGs; (2) Jira and Teams sections use SVG icons rather than product mockups (faithful to live, but icons not mockups); (3) Some intro subSections in the historical/visions parts collapse what live presents as multiple feature blocks with side images — content preserved but accompanying SVGs dropped. No hallucinations detected.*

- [INCOMPLETE] section[11] type=feature-split "Augmentez l'engagement des équipes" — Live has an SVG image (dashboard.svg) for this section; extraction omitted imageSrc. Acceptable if generic icons skipped.
- [WRONG_IMAGE] section[20] type=feature-split "Deux visions de DSI - pyramides Maslow" — Live has TWO Maslow pyramid SVGs side by side (outil14a.svg + outil14b.svg); extraction shows only one. This is a known SVG diagram, not a product mockup.
- [WRONG_IMAGE] section[22] type=feature-split "Un outil PPM intuitif - Jira" — imageSrc is an SVG icon (outil18a.svg), not a real product mockup. Faithful to live but flagged per rule.
- [WRONG_IMAGE] section[23] type=feature-split "Microsoft Teams" — imageSrc is an SVG icon (outil18b.svg). Faithful to live but flagged.

### solution/tableau-de-bord-dsi — MOSTLY_FAITHFUL
*Extraction is largely faithful to live. All major sections are present in the right order. The hero, intros and CTAs are correctly typed. Several feature-split sections lack an h3 on live (Vue Kanban, Vue timeline, Suivre la valeur générée par la DSI) but the extraction synthesized titles from alt/context which slightly diverges from strict fidelity. Many imageSrc values point to decorative SVG icons (1.svg, 2.svg, 5.svg, 7.svg, outil4.svg, dashboard.svg) - these match the live page exactly so they are faithful reproductions, though the design system would prefer real product mockups. Two intro headings (L'importance des indicateurs / Comment construire) appear without body on live and are correctly reproduced as such. Body merges across adjacent live sections (heading section + padding--0px continuation) are sensibly performed. No hallucinated sections detected; no live sections missing from extract.*

- [WRONG_FIELDS] section[4] type=feature-split "Vue Kanban" — On live, this section has no h3 heading - the title 'Vue Kanban' was taken from the alt text. Live only shows the paragraph body. Minor fidelity issue.
- [WRONG_FIELDS] section[5] type=feature-split "Vue timeline" — Same issue: live has no h3 here, just a paragraph. Title 'Vue timeline' came from alt text.
- [WRONG_IMAGE] section[6] type=feature-split "Embarquez par une bonne communication" — imageSrc is an SVG icon (5.svg) - faithful to live which uses the same SVG, so this is acceptable reproduction.
- [WRONG_IMAGE] section[9] type=feature-split "Suivi de l'indicateur d'adhésion" — Image is dashboard.svg icon - faithful to live.
- [WRONG_FIELDS] section[11] type=feature-split "Suivre la valeur générée par la DSI" — On live, this feature-split has NO h3 heading - the section displays only body text + image. Title was synthesized.
- [WRONG_IMAGE] section[13] type=feature-split "Des données consolidées" — 1.svg icon - faithful to live.

### solution/tableau-de-bord-gestion-de-projet — MOSTLY_FAITHFUL
*Extraction is largely faithful to the live page. All major sections are present, content is mostly complete, and structure is well-preserved. Minor issues: some feature-split sections use SVG icons as imageSrc (mirroring live), one intro section title was paraphrased/added, and the "Vue Kanban" feature-split has a title not present on live (live has no h3 for Kanban or Timeline sections). The conclusion intro reuses content from earlier instead of pure conclusion content but this matches live faithfully.*

- [WRONG_FIELDS] section[5] type=feature-split "Vue Kanban" — Live has NO h3/title for this section — only a paragraph. Extraction added 'Vue Kanban' as title (likely from img alt). Minor hallucinated title.
- [WRONG_FIELDS] section[6] type=feature-split "Vue timeline" — Live has no heading for timeline section either — only a paragraph. The follow-up paragraphs (filtrer/scenarios) are technically a separate section on live but merged here, which is acceptable. Title 'Vue timeline' added by extractor.
- [WRONG_IMAGE] section[10] type=feature-split "Sondez vos collaborateurs" — imageSrc is a dashboard.svg icon, not a product mockup — but this matches what's on live, so it's faithful reproduction. Acceptable per faithfulness rule.

### solution/tableau-de-bord-portefeuille-de-projet — FAITHFUL
*Extraction is faithful to the live page. All 25 sections are present and content/images match. The three SVG icons in the "clés de succès" feature-splits are flagged as WRONG_IMAGE per criteria, but they faithfully reproduce what's on live (live also uses these SVG icons, not product mockups). No sections from live are missing in the extract.*

- [WRONG_IMAGE] section[19] type=feature-split "Indicateurs de performance" — imageSrc is an SVG icon (outil10.svg) but it matches what's on live, so this is faithful reproduction
- [WRONG_IMAGE] section[20] type=feature-split "KPI selon besoins" — SVG icon (outil11.svg) - matches live
- [WRONG_IMAGE] section[21] type=feature-split "Co-construire avec métiers" — SVG icon (outil12.svg) - matches live
