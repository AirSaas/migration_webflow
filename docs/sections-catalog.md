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
