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

> À remplir au Step 1 — sections identifiées depuis le snapshot complet :

| # | Section (provisoire) | Heading |
|---|---------------------|---------|
| S01 | Hero + Tabs produit | "La solution de [portfolio/quarter plan/...] pour aligner le top management" |
| S02 | Press/Média logos | "Ils parlent de nous" (Alliancy, JDN, Le Point, LMI) |
| S03 | LinkedIn testimonials | 3 citations LinkedIn (Sagnimorte, Lhomme, Royer) |
| S04 | Stats/Chiffres | "Les chiffres qui vous feront adopter AirSaas" (80%, 100%, 30K€) |
| S05 | Platform intro | "Une plateforme de gouvernance projet à la hauteur de vos ambitions" |
| S06 | Feature: Roadmaps | "Partagez simplement les roadmaps à toute l'organisation" |
| S07 | Feature: Capacity | "Un capacity planning par équipe simple et actionnable" |
| S08 | Feature: Priorisation | "Chaque directeur définit ses prios" |
| S09 | Feature: Cadrage | "Diffusez un cadrage projet standardisé" |
| S10 | Feature: Newsletter sponsor | "Une newsletter sponsor que votre direction va adorer" |
| S11 | Feature: Reporting | "Votre reporting projet en un clic" |
| S12 | Feature: Décisions | "Fluidifiez votre prise de décisions importantes et urgentes" |
| S13 | CTA mid-page | "Et si vous repreniez le contrôle de votre portefeuille de projets ?" |
| S14 | Intégrations carousel | "Grâce à sa marketplace AirSaas s'intègre nativement..." |
| S15 | Sans/Avec comparaison | "Nos clients ne peuvent plus imaginer leurs vies sans AirSaas" (7 lignes) |
| S16 | Customer stories cards | "Laissez nos clients vous parler d'AirSaas" (9 cartes) |

## Solution Pages

<!-- À remplir au Step 2 -->

## Produit Pages

<!-- À remplir au Step 3 -->

## Équipes Pages

<!-- À remplir au Step 3 -->

## Compare Pages

<!-- À remplir au Step 3 -->

## Landing Pages

<!-- À remplir au Step 4 -->
