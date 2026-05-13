# Sections Catalog — AirSaaS

> Enrichi à chaque step. Chaque section = un composant React.

## Layout

### Navbar

**Screenshots** : `screenshots/layout/navbar-desktop-1440.png`, `navbar-tablet-768.png`, `navbar-mobile-375.png`

**Desktop (1440px)** — barre horizontale pleine largeur, fond blanc, sticky top :

| Élément | Détail |
|---------|--------|
| Logo | AirSaaS "A" bleu (lien vers `/fr`) — à gauche |
| Nav links (avec chevron) | Solutions ▾, Produit ▾, Ressources ▾ — dropdowns (hover) |
| Nav links (directs) | Témoignages → `/temoignages`, Intégrations → `/les-integrations`, Nouveautés → `/les-nouveautes-produit`, Le Quarter plan → `/quarter-plan`, Intégration teams → `/microsoft-teams-airsaas` |
| Sélecteur langue | Drapeau + "Français" ▾ — à droite |
| CTA Login | Bouton outline → `https://app.airsaas.io/fr/login` |
| CTA principal | "Demander une démo" — bouton rempli bleu primary → `/meetings-pages` |

**Tablet/Mobile (768px / 375px)** — navbar simplifiée :
- Logo à gauche
- Sélecteur langue au centre
- Hamburger menu (☰) à droite — ouvre probablement un drawer/overlay avec tous les liens

**Comportement scroll** : la navbar reste sticky en haut. Pas de changement transparent → solid observé (fond blanc dès le départ).

**Note** : les dropdowns Solutions/Produit/Ressources ne montrent pas de mega-menu panel visible — ils semblent ne pas avoir de sous-menus visuels actuellement sur le live site. À vérifier si c'est un bug ou si les dropdowns sont désactivés.

### Footer

**Screenshots** : `screenshots/layout/footer-desktop-1440.png`, `footer-mobile-375.png`

**Desktop** — fond bleu primary (#3a51e2), texte blanc, 4 colonnes :

| Colonne | Liens |
|---------|-------|
| **Entreprise** | Pourquoi AirSaas ?, Cookies, Conditions d'utilisation, Mentions légales, Charte de confidentialité, Kit média, API AirSaas, Plan du site |
| **Ressources** | Les Pro. de la Transfo., Le blog d'AirSaas, La conduite de projet, Portfolio project Management, Témoignages clients |
| **Solutions** | Management de portefeuille projet, Flash report automatisé, Flash report projet, Outil PPM, Outil de pilotage projet, Outil de gestion de portefeuille projet, Plan stratégique, Portfolio management, Revue de portefeuille, Tableau de bord portefeuille de projet, Tableau de bord DSI, Tableau de bord de gestion de projet |
| **Alternative à** | Sciforma, Planview Portfolio |

**Barre inférieure** : Logo AirSaaS blanc + "Made with love in France" + drapeau FR

**Mobile** : colonnes empilées verticalement, centrées. Titres de section en blanc bold. Même contenu que desktop.

**Pas de réseaux sociaux** visibles dans le footer.

## Homepage

> Complété au Step 1. Chaque section = un composant React dans `src/components/sections/`.

| # | Composant | Fichier | Heading | Props/Notes |
|---|-----------|---------|---------|-------------|
| S01 | `HeroTabs` | `HeroTabs.tsx` | "La solution de [rotating] pour aligner le top management" | Client component, 6 tabs (Portfolio, Quarter plan, Capacitaire, Priorisation, Roadmap, Reporting), mot animé toutes les 3s |
| S02 | `PressLogos` | `PressLogos.tsx` | "Ils parlent de nous" | 4 cards (Alliancy, JDN, Le Point, LMI) avec citations + logos |
| S03 | `LinkedInTestimonials` | `LinkedInTestimonials.tsx` | — | 3 cards LinkedIn (Sagnimorte, Lhomme, Royer), fond `bg-alt` |
| S04 | `Stats` | `Stats.tsx` | "Les chiffres qui vous feront adopter AirSaas" | 3 stats (80%, 100%, 30K€) |
| S05 | `PlatformIntro` | `PlatformIntro.tsx` | "Une plateforme de gouvernance projet à la hauteur de vos ambitions" | Texte centré, pas d'image |
| S06 | `FeatureSection` | `FeatureSection.tsx` | "Partagez simplement les roadmaps à toute l'organisation" | Réutilisable : heading + description + image, `reversed`, `bgColor` |
| S07 | `FeatureSection` | — | "Un capacity planning par équipe simple et actionnable" | bgColor=lavender, blockquotes |
| S08 | `FeatureSection` | — | "Chaque directeur définit ses prios" | Layout normal |
| S09 | `FeatureSection` | — | "Diffusez un cadrage projet standardisé" | reversed, bgColor=alt |
| S10 | `FeatureNewsletter` | `FeatureNewsletter.tsx` | "Une newsletter sponsor que votre direction va adorer" | Image gauche + 3 features droite (Tendance, Projets, Retard) |
| S11 | `FeatureSection` | — | "Votre reporting projet en un clic" | Layout normal |
| S12 | `FeatureSection` | — | "Fluidifiez votre prise de décisions importantes et urgentes" | reversed, bgColor=alt |
| S13 | `CtaMidpage` | `CtaMidpage.tsx` | "Et si vous repreniez le contrôle de votre portefeuille de projets ?" | CTA "Réservez une démo" |
| S14 | `IntegrationsCarousel` | `IntegrationsCarousel.tsx` | "Grâce à sa marketplace AirSaas s'intègre nativement..." | Texte gauche + image droite |
| S15 | `SansAvecComparison` | `SansAvecComparison.tsx` | "Nos clients ne peuvent plus imaginer leurs vies sans AirSaas" | 7 lignes Sans/Avec + CTA |
| S16 | `CustomerStories` | `CustomerStories.tsx` | "Laissez nos clients vous parler d'AirSaas" | 9 cartes (3×3 grid), lien /temoignages |

### Composants UI réutilisables

| Composant | Fichier | Usage |
|-----------|---------|-------|
| `Container` | `ui/Container.tsx` | Max-width 1200px + padding |
| `Button` | `ui/Button.tsx` | Variants: primary, secondary, tertiary, outline. Sizes: sm, default, lg |

### Layout

| Composant | Fichier | Usage |
|-----------|---------|-------|
| `Navbar` | `layout/Navbar.tsx` | Sticky, logo + 3 dropdowns + 5 links + langue + Login + CTA demo. Mobile hamburger |
| `Footer` | `layout/Footer.tsx` | Fond bleu #3a51e2, 4 colonnes, bottom bar avec logo + "Made with love in France" |

## Solution Pages

> Complété au Step 2. Template commun `SolutionPage` avec 12 pages `/solution/[slug]`.

### Template commun

Toutes les pages solution partagent ce template :
1. **SolutionHero** — badge "SOLUTION" (optionnel) + H1 + description + CTA + hero image
2. **SectionHeading** — H2 intro + paragraphe (centré)
3. **FeatureSection** (réutilisé) — alternant image/texte gauche-droite
4. **SolutionCtaMidpage** — CTA générique avec heading/description/button props
5. **PressLogos + LinkedInTestimonials** (optionnel) — réutilisés de la homepage

### Composants spécifiques

| Composant | Fichier | Usage |
|-----------|---------|-------|
| `SolutionHero` | `sections/SolutionHero.tsx` | Hero avec badge orange, H1, description, CTA, image. Fond gradient bleu |
| `SectionHeading` | `sections/SectionHeading.tsx` | H2 + description centré, séparateur de groupes de features |
| `SolutionCtaMidpage` | `sections/SolutionCtaMidpage.tsx` | CTA mid-page générique avec props (heading, description, buttonText) |

### Pages (12)

| # | Slug | Titre | Sections | Press |
|---|------|-------|----------|-------|
| 1 | `management-de-portefeuille-projet` | Management de portefeuille projet : l'outil des DSI et PMO | 15 sections (hero + intro + 3 groupes features + 2 CTAs) | Oui |
| 2 | `flash-report-projet` | L'outil de flash report projet automatisé favori des PMO et DSI | 12 sections | Oui |
| 3 | `flash-report` | Flash report automatisé pour vos projets | 5 sections | Oui |
| 4 | `revue-de-portefeuille` | Revue de portefeuille projet | 4 sections | Oui |
| 5 | `portfolio-management` | Portfolio management | 4 sections | Oui |
| 6 | `tableau-de-bord-portefeuille-de-projet` | Tableau de bord portefeuille de projet | 4 sections | Oui |
| 7 | `tableau-de-bord-dsi` | Tableau de bord DSI | 4 sections | Non |
| 8 | `tableau-de-bord-gestion-de-projet` | Tableau de bord gestion de projet | 4 sections | Non |
| 9 | `gestion-portefeuille-projet` | Gestion de portefeuille projet | 4 sections | Non |
| 10 | `outils-de-pilotage-projet` | Outils de pilotage projet | 4 sections | Non |
| 11 | `outil-ppm` | Outil PPM nouvelle génération | 8 sections (pas de badge "SOLUTION") | Non |
| 12 | `airsaas-et-les-experts-de-la-transfo` | AirSaas et les experts de la transformation | 4 sections | Oui |

### Route

`src/app/[locale]/solution/[slug]/page.tsx` — SSG avec `generateStaticParams` pour les 12 slugs. Données hardcodées dans `src/data/solutions.tsx` (sera remplacé par Strapi Collection Type `page` au Step 5).

## Produit Pages

> Complété au Step 3. Template `ProduitPage` avec 6 pages `/produit/[slug]`.

### Template

Structure : Hero + Intro + Features alternées + CTA + FAQ Accordion + Press/Témoignages

Identique au template Solution mais ajoute le pattern FAQ en bas de page.

### Composants spécifiques

| Composant | Fichier | Usage |
|-----------|---------|-------|
| `FaqAccordion` | `sections/FaqAccordion.tsx` | Client component, accordion expandable avec +/− |

### Pages (6)

| # | Slug | Titre |
|---|------|-------|
| 1 | `capacity-planning` | Capacity Planning |
| 2 | `priorisation-par-equipes` | Priorisation par équipes |
| 3 | `reporting-projet` | Reporting projet |
| 4 | `automatiser-la-com-projet` | Automatiser la com' projet |
| 5 | `budget` | Budget |
| 6 | `traduction-one-click-avec-deepl` | Traduction DeepL |

### Route

`src/app/[locale]/produit/[slug]/page.tsx` — SSG. Données dans `src/data/produit.tsx`.

## Équipes Pages

> Complété au Step 3. Template `EquipesPage` avec 4 pages `/equipes/[slug]`.

### Template

Structure : Hero (sans badge) + Intro + Stats optionnel + Features alternées + CTA + Press/Témoignages

Variante du template Homepage — réutilise SolutionHero, FeatureSection, stats inline.

### Pages (4)

| # | Slug | Titre |
|---|------|-------|
| 1 | `outil-pmo` | PMO |
| 2 | `direction-de-la-transformation` | Direction de la Transformation |
| 3 | `comite-direction` | Comité Direction |
| 4 | `it-et-operation` | IT & Opérations |

### Route

`src/app/[locale]/equipes/[slug]/page.tsx` — SSG. Données dans `src/data/equipes.tsx`.

## Compare Pages

> Complété au Step 3. Template `ComparePage` avec 3 pages `/compare/[slug]`.

### Template

Structure : Hero + Intro + ComparisonTable + Features + CTA + FAQ + Press/Témoignages

### Composants spécifiques

| Composant | Fichier | Usage |
|-----------|---------|-------|
| `ComparisonTable` | `sections/ComparisonTable.tsx` | Grille de comparaison AirSaas vs concurrent avec ✓/✗ |

### Pages (3)

| # | Slug | Titre |
|---|------|-------|
| 1 | `alternative-triskell-ppm` | Alternative Triskell PPM |
| 2 | `alternative-planview-portfolio` | Alternative Planview |
| 3 | `alternative-sciforma` | Alternative Sciforma |

### Route

`src/app/[locale]/compare/[slug]/page.tsx` — SSG. Données dans `src/data/compare.tsx`.

## Landing Pages

> Complété au Step 4. Template `LpPage` avec 4 pages `/lp/[slug]`.

### Architecture

LP pages use a separate route group `(lp)` with their own minimal layout (LpNavbar + LpFooter) distinct from the main site layout. The locale layout was refactored to support route groups: `(main)` for regular pages, `(lp)` for landing pages.

### Template

Structure : LpHero (badge + H1 + dual CTAs + trust badges + tab panel) → LpStats (4 metrics) → PainPoints (numbered pain points) → LpFeatureCards (badge + H3 + desc + 4 bullets + image, alternating) → WhyAdoptGrid (3 cards) → SecurityBadges → HowItWorks (optional, 4 numbered steps) → FAQ → LpFinalCta (2 columns: démo + vidéo)

### Composants spécifiques

| Composant | Fichier | Usage |
|-----------|---------|-------|
| `LpNavbar` | `layout/LpNavbar.tsx` | Minimal navbar: logo + CTA "Réserver une démo" |
| `LpFooter` | `layout/LpFooter.tsx` | Minimal footer: copyright + logo + Made in France |
| `LpHero` | `sections/LpHero.tsx` | Client component, hero with tabs, trust badges, dual CTAs |
| `LpStats` | `sections/LpStats.tsx` | 4-column stats row with heading |
| `PainPoints` | `sections/PainPoints.tsx` | Numbered pain point cards on alt background |
| `LpFeatureCard` | `sections/LpFeatureCard.tsx` | Feature card with badge, bullets, image (richer than FeatureSection) |
| `WhyAdoptGrid` | `sections/WhyAdoptGrid.tsx` | 3-column card grid for "why" section |
| `SecurityBadges` | `sections/SecurityBadges.tsx` | 4 security trust signals (ISO, France, Pentest, SSO) |
| `HowItWorks` | `sections/HowItWorks.tsx` | 4 numbered deployment steps |
| `LpFinalCta` | `sections/LpFinalCta.tsx` | Dual CTA: demo booking + video link |

### Pages (4)

| # | Slug | Titre |
|---|------|-------|
| 1 | `ppm` | Outil PPM nouvelle génération |
| 2 | `pmo` | L'outil des PMO modernes |
| 3 | `capacity-planning` | Capacity Planning simplifié |
| 4 | `pi-planning` | PI Planning : la vue business qui manque à Jira |

### Route

`src/app/[locale]/(lp)/lp/[slug]/page.tsx` — SSG. Données dans `src/data/lp.tsx`. Layout séparé via route group `(lp)`.

## Blog

> En construction. Composants blog préfixés `Blog*` dans l'arbo DS existante (pas de sous-dossier — voir decision #47).

### Composants DS

| Composant | Fichier | Usage |
|-----------|---------|-------|
| `BlogHero` | `library-design/sections/BlogHero.tsx` | Hero d'article : navbar + tag "Le Blog" + H1 + `<BlogAuthorTag>` + illustration frame open-bottom. Un par article. Figma node-id `303-1016`. |
| `BlogAuthorTag` | `library-design/ui/BlogAuthorTag.tsx` | Bloc attribution auteur : label "Publié par" + pill vert (avatar + nom, `--color-success-text`) + "dans [catégorie]" + date. Réutilisable dans `BlogHero`, futurs `BlogCard`, bylines. Figma node-id `303-1655`. |
| `TableOfContentsFrame` | `library-design/sections/TableOfContentsFrame.tsx` | Sommaire d'article : titre primary-gradient (locale-driven — `title="Sommaire"` / `"Contents"` / etc.) + carte blanche avec bordure primary-40 + liste d'ancres `{label, href}[]` stylées primary. 3–15 items. Figma node-id `303-1104`. |
| `BlogArticleBody` | `library-design/sections/BlogArticleBody.tsx` | Wrapper rich-text pour le corps d'article : bg white, padding responsive lg:px-[14.375rem] py-[6.25rem], max-w 91.25rem, gap vertical 3.125rem. Accepte `children` composés de DS primitives (`<Heading>`, `<Text>`, `<Quote>`, `<ListInline bullet="circle-primary">`, `<TableFrame>`, `<IllustrationFrame tone="warm">`). Step 5 CMS : ajoutera une prop `blocks` pour `@strapi/blocks-react-renderer`. Figma node-id `303-1146`. |
| `TableFrame` | `library-design/ui/TableFrame.tsx` | Tableau de comparaison responsive : header primary + blanc, cellules primary-2 avec séparateur primary-20. 2–6 colonnes, 1–20 lignes. Prop `firstColumnBold` pour libellés de ligne. Scroll-x sur mobile. Utilisé dans `BlogArticleBody`, extensible pour pricing / compare pages. Figma node-id `309-1899`. |
| `RelatedArticlesFrame` | `library-design/sections/RelatedArticlesFrame.tsx` | Bloc "Pour aller plus loin" en bas d'article : titre primary-gradient (locale-driven) + carte blanche primary-40 + liste de liens outbound avec icône SVG external-link en primary-60. 3–10 items. Supporte `target="_blank"` par item (ajoute `rel="noopener noreferrer"` auto). Coexiste avec `TableOfContentsFrame` sur la même page. Figma node-id `309-1986`. |
| `BlogCard` | `library-design/ui/BlogCard.tsx` | Card de preview d'article : thumbnail (alt obligatoire) + date + titre (H4, lien principal) + excerpt + byline compact **multi-author** (1-4 auteurs, avatars empilés max 3, "Name1 & Name2" ou "Name1 + N autres"). bg white, border secondary-10, rounded 20px. Props locale-driven (`publishedByLabel`, `inLabel`, `authorsAndLabel`, `authorsMoreLabel`). Utilisé dans `BlogCollectionFrame`. Figma node-id `312-2107`. |
| `BlogCollectionFrame` | `library-design/sections/BlogCollectionFrame.tsx` | Section pleine-largeur : H2 + subtitle + optionnel `collectionAuthor` (<BlogAuthorTag> minimal, ex. "Animé par Jonas Roman") + grid 3-col de `BlogCard` (1-9) + CTA "Voir plus". Prop `background="light"\|"alt"` pour alternance visuelle entre frames successifs. Utilisé dans `BlogIndexPage` (3 frames alternants) et `BlogPostPage` (trending/more articles). Remplace l'ancien `BlogIndexGrid`. |
| `BlogIndexPage` | `pages/BlogIndexPage.tsx` | Page home `/blog` : Hero text-only (eyebrow "LE BLOG" + H1 "PRO. de la" / "TRANSFO." gradient + subtitle) + N `BlogCollectionFrame` alternants (articles / podcast / nouveautés) + `CtaHighlightFrame` optionnel + `Footer`. Props 100% locale-driven. |

### Template article (prévu — Step 5 CMS)

Structure envisagée : `BlogHero` → `TableOfContentsFrame` (sommaire) → `BlogArticleBody` (rich-text : `<Heading>`, `<Text>`, `<Quote>`, `<ListInline bullet="circle-primary">`, `<TableFrame>`, `<IllustrationFrame tone="warm">`) → `BlogAuthorCard` (bio étendue) → `RelatedArticlesFrame` (pour aller plus loin) → `CtaHighlightFrame` → `Footer`.

### Route (prévu — Step 5)

`src/app/[locale]/blog/[slug]/page.tsx` — SSG depuis Strapi. Playwright visual test à ajouter à ce moment-là.

---

## 🧭 LandingPageV2 — section types (data-driven dispatcher)

Les landings `lp` / `produit` / `solution` / `equipe` sont rendues par [`src/components/pages/LandingPageV2.tsx`](../src/components/pages/LandingPageV2.tsx), un dispatcher qui mappe `section.type` (string) → composant DS. Les données vivent dans `src/data/landings-v2/{lp,produit,solutions,equipes}.ts` typées via [`src/types/landing.ts`](../src/types/landing.ts).

**Avant de coder une nouvelle landing** : trouve le `section.type` qui matche le pattern visuel du live et passe-lui les props. Si rien ne matche, propose un nouveau type via "Extension process" de `ds-rules.md` (ne hardcode pas une section ad hoc inline).

### Reference complète des 30 types

| `type` | DS component | Use case |
|---|---|---|
| `hero` | `<Hero>` (centered / split) | Top de page. Convention par catégorie : voir `workflow_section_patterns` (Équipes = centered, LP/Produit = centered, Solution = split light). |
| `intro` | `<Heading>` + `<Text>` raw, optional subSections | Titre + paragraphe centré, sans image. Pour gradient title split, préfère `section-heading`. |
| `feature-split` | `<FeatureFrame layout="inline">` | Workhorse : 1 image + texte côté-à-côté. Supporte `body` HTML, `bullets`, `subSections` (rendu en `→ h5 + p` dans le prose richContent pour le pattern CompositeImageWithArrowedText). |
| `pain-points` | `<Heading>` + `<ListInline bullet="circle-primary">` | "Vous vous reconnaissez ?" — emoji + heading + bullets. |
| `stats` | `<ValuePropositionFrame>` + `<FeatureCard>` × N | KPIs row. Chaque item accepte `iconName?` (mappé via `iconNode`), `value`, `label`. Forward `titleHighlight` (gradient primary leadin). |
| `logo-bar` | section inline avec `<img>` × N | Strip de logos clients/presse/partenaires. |
| `press-quotes` | section inline avec quote cards | Citations presse (logo + texte), 3-col grid. |
| `testimonials` | `<TestimonialsFrame>` + `<TestimonialCard>` × N | Témoignages LinkedIn — quote + name + role + avatar (+ linkedinHref). 1-6 items, grid adaptatif. Pour mélanger press + LinkedIn, utiliser `mixed-testimonials`. |
| `customer-testimonials` | TestimonialCards en 3-col grid | Layout générique. Pour grilles denses (6-9 cards avec sector/size/role + lien témoignage), préférer `clients`. |
| `comparison-table` | `<ComparisonTableFrame>` | Tables feature-matrix (lignes = features, colonnes = plans/produits). **Ne PAS utiliser** pour avec/sans paired — utiliser `comparison-dual`. |
| `steps` | `<StepsFrame>` (icône par défaut) | Étapes numérotées avec descriptions. |
| `faq` | `<FaqFrame>` | Accordion Q/R. |
| `cta` | `<CtaHighlightFrame>` (single CTA centré, fond gradient) | Closing CTA. Pour 2 CardCta side-by-side, utiliser un layout custom (le DS `<CtaFrame>` exige 2 children). |
| `icon-row` | section inline icon+label × N | Trust badges intégrations, sécurité. |
| `trust-badges` | row de `<Tag variant="muted">` | Badges courts sous hero (RGPD, ISO, etc.). |
| `related` | grid de cards article-style | Cross-sell : titre + description + thumbnail + lien. 6 max. |
| `tabs-frame` | `<TabsFrame>` | Tab anchors row sticky (jumps vers ancres in-page). |
| `cta-highlight` | `<CtaHighlightFrame>` (tri-part gradient) | Closing CTA pleine-largeur avec titlePrefix + titleHighlight + titleSuffix + carte blanche + 1 CTA. |
| `comparison-frame` | `<ComparisonFrame>` | Single-column numbered list (avec OU sans). Pour avec/sans paired side-by-side, utiliser `comparison-dual`. |
| `pillar-frame` | `<PillarFrame>` | Grid non-séquentielle de principes (icon + title + description + example). |
| `highlight-frame` | `<HighlightFrame>` | Zigzag stacked highlights avec big gradient values. |
| `feature-stacked` | `<FeatureSectionStacked>` | Title gradient + 3-6 bullets + screenshot en bleed BELOW. **Forbidden sans image** (`@forbidden` du contract). |
| `value-proposition` | `<ValuePropositionFrame>` + `<FeatureCard>` × N | Grid flexible (2-6 cols) de FeatureCards avec optional iconName. |
| `steps-rich` | `<StepsFrame>` avec numéros + icônes explicites | Variante de `steps` avec numbering + iconName par étape. |
| `raw` | (renders null) | Fallback pour blocs non reconnus. |

### 🆕 Section types ajoutés au step Équipes (2026-05-13)

Ces 5 types ont été introduits pour rebuild `/fr/equipes/outil-pmo`. Ils sont **réutilisables** pour toutes les landings futures — pas seulement Équipes.

#### `section-heading`

Standalone H2 + subtitle centré, **sans image**. Pour les sections intro narratives où `feature-stacked` est interdit (pas d'image) et `intro` ne suffit pas (gradient split souhaité).

```ts
{
  type: "section-heading",
  titleGradient: "Une plateforme de gouvernance projet", // primary gradient (max ~50)
  titleDark: "à la hauteur de vos ambitions",            // dark portion (max ~60, optional)
  subtitle: "Notre mission ? Vous permettre…",           // optional (max ~260)
}
```

Le dispatcher applique un override `lg:!px-[10rem]` au DS `<SectionHeading>` pour matcher les autres section frames (au lieu du `lg:px-[14.375rem]` interne du composant qui crushe la largeur).

#### `mixed-testimonials`

`<TestimonialsFrame>` avec 2 rows mixtes : 1 row de press cards (`<TestimonialCompanyCard>` quote + logo) + 1 row de personal cards (`<TestimonialCard>` avatar + name + role + linkedinHref). Pattern canonique = story `MixedPressAndPersonal` de TestimonialsFrame.

```ts
{
  type: "mixed-testimonials",
  title: "Ils parlent de",                  // dark-to-primary gradient
  titleHighlight: "nous",                   // primary gradient (optional)
  press: [{ quote, logoSrc, logoAlt }, …],  // 0-N press cards
  personal: [{ quote, name, role?, avatarSrc?, linkedinHref? }, …], // 0-N LinkedIn cards
  readMoreLabel?: "Lire la suite",
  readLessLabel?: "Voir moins",
}
```

**Grid adaptatif** par row : `lg:grid-cols-{min(N, 4)}` — N=1 → 1col, N=2 → 2cols, N=3 → 3cols, N≥4 → 4cols.

#### `slider`

`<SliderFrame>` : title (gradient + dark) + subtitle + carrousel d'images 2-8. Pour marketplace integrations, multi-screen flows, gallery bootcamp.

```ts
{
  type: "slider",
  variant?: "light" | "dark",
  titleHighlight: "Grâce à sa marketplace AirSaas",          // primary gradient (max 40)
  titleRest: "s'intègre nativement à vos outils du quotidien", // dark portion (max 70)
  subtitle: "Centralisez toutes vos informations cruciales…",  // max 280
  slides: [{ imageSrc, imageAlt? }, …],  // 2-8 slides
}
```

#### `comparison-dual`

`<ComparisonDualFrame>` : grid avec/sans paired numbered cards avec pill labels colorés. **C'est le composant correct** pour avec/sans narratif — pas `comparison-table` (contract `@forbidden`).

```ts
{
  type: "comparison-dual",
  titlePrefix: "Nos clients ne peuvent plus imaginer…",  // dark-to-primary (max 70)
  titleHighlight: "AirSaas",                              // primary gradient (max 30)
  sansLabel?: "Sans AirSaas",   // pill label gauche (max 20, default "Sans")
  avecLabel?: "Avec AirSaas",   // pill label droit (max 20, default "Avec")
  sansItems: [{ value, description }, …],  // 3-10 items
  avecItems: [{ value, description }, …],  // 3-10 items, idéalement appariés
  ctaLabel?: "Réservez une démo",
  ctaHref?: "/fr/meetings-pages",
}
```

#### `clients`

`<ClientsFrame>` : grid dense de `<ClientCard>` (avatar + name + jobTitle + companyName + infoRows) avec optional collection CTA. **Limit 6-9 cards** — pour overflow (live ≥10 cards), montrer 6-9 + `collectionCtaLabel` pointant vers la page collection complète.

```ts
{
  type: "clients",
  variant?: "light" | "tinted",
  title: "Laissez nos clients vous parler d'",  // dark-to-primary (max 80)
  titleHighlight: "AirSaas",                      // primary gradient (max 40, optional)
  subtitle?: "Qui de mieux pour vous parler…",   // max 260
  clients: [{
    avatarSrc, avatarAlt?, name, jobTitle, companyName,
    infoRows?: [{ iconName?, label, value }, …]  // 0-5 rows (Secteur, Nombre d'employés, etc.)
  }, …],  // 6-9 cards
  collectionCtaLabel?: "Consultez les témoignages de nos clients",
  collectionCtaHref?: "/fr/temoignages",
}
```

Les icônes des `infoRows` sont résolues via `bareIcon(iconName)` (helper du dispatcher) — pas via `iconNode` (qui retournerait un IconIllustration trop gros pour la cellule 14×14px d'une infoRow).

### Conventions transversales

#### Hero layout — vérifier le live D'ABORD, puis passer `layout` explicitement

**Règle** : toujours regarder le live (screenshot ou DOM) pour déterminer si l'image est À CÔTÉ du texte (`split`) ou EN DESSOUS (`centered`). Le dispatcher auto-pick `split` quand `imageSrc` est set, mais c'est peu fiable selon les pages — passer `layout` explicitement une fois vérifié.

Hypothèses de départ par catégorie (à utiliser comme défaut à VÉRIFIER, pas comme règle absolue) :

| Catégorie | Layout typique | À vérifier parce que |
|---|---|---|
| Solution | habituellement `split` light | Certaines pages solution utilisent centered |
| Produit | habituellement `centered` (dark) | Certaines pages produit utilisent split |
| Équipes | habituellement `centered` light | Vérifié sur outil-pmo + it-et-operation, mais une future page équipes pourrait différer |
| LP | habituellement `centered` avec eyebrow + 2 CTAs + trust badges | Variantes LP existantes avec mockup en split |

Si la vérif visuelle montre l'image À CÔTÉ du texte → `layout: "split"` (peu importe la catégorie). Si EN DESSOUS → `layout: "centered"`. Le passer explicitement dans tous les cas pour éviter que le dispatcher auto-pick incorrectement.

#### Gradient split dans les titres (FeatureFrame / SectionHeading / etc.)

Le live a souvent un portion bleue (primary gradient) dans chaque heading. Pour matcher :

- **Blue en début** : `titleHighlight: "Une newsletter sponsor"` + `title: "que votre direction va adorer"` (default, `titleHighlightAtEnd: false`)
- **Blue en fin** : `titleHighlight: "à toute l'organisation"` + `title: "Partagez simplement les roadmaps"` + `titleHighlightAtEnd: true`
- **Blue au milieu** : le DS FeatureFrame / SectionHeading / ClientsFrame ne supporte PAS le 3-part split. Compromis : étendre le bleu vers le côté le plus proche (suivre la convention HomePage qui fait pareil — ex. block 17 ClientsFrame `title: "Laissez nos clients vous parler d'"` + `titleHighlight: "AirSaas"`).

#### CompositeImageWithArrowedText (newsletter sponsor pattern)

Pour les sections où le live a 3 screenshots + flèches pointant à des labels texte, le pattern canonique est :
1. **Asset composite** : fusionner les 3 images en 1 seule (les flèches sont bakées dans l'image, pas en DOM). Pour outil-pmo on a déjà `public/assets/screenshots/newsletter-sponsor-composite.png`.
2. **Data** : `type: "feature-split"` avec `subSections: [{title, body}, …]` pour les 3 labels arrowed.
3. **Rendu** : le dispatcher rend les subSections en raw `<h5>` + `<p>` dans le prose `richContent` de FeatureFrame (le prose wrapper applique `[&_h5]:text-[1.0625rem] font-bold` automatiquement). Pas de `<Heading level={4}>` qui serait 2-3x trop gros.

#### ClientsFrame overflow (>9 cards sur le live)

Le DS cap à 6-9 (`@limits`). Quand le live a 10+ : rendre 6-9 cards représentatives + `collectionCtaLabel="Consultez les témoignages de nos clients"` + `collectionCtaHref="/fr/temoignages"`. **Ne pas** étendre le contract, ne pas utiliser un slider, ne pas swap pour TestimonialsFrame.

#### Stats / KPI icons

Le live affiche un icon par KPI (`percent_icon`, `timer_icon`, etc.). Le DS ne fournit pas de "%" literal — utiliser le match sémantique le plus proche dans `illustration-icons.tsx` :
- Réduction temps/meetings → `stopwatch` ou `calendar-day`
- Objectif clair / précision → `bullseye-arrow`
- Économies € → `stopwatch` (temps = argent)
- Adoption / utilisateurs → `comments` / `suitcase`
