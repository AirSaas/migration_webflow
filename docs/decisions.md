# Decisions Log — AirSaaS Migration

| # | Décision | Raison |
|---|----------|--------|
| 1 | Startups (1529), Eti-pmes (17), Startup Categories (8) supprimés | Feature marketplace abandonnée |
| 2 | Jobs (24) + Categories jobs (13) supprimés | Recrutement plus actif sur le site |
| 3 | Tribune CEO FR (5) + EN (1) supprimés | Pas assez de contenu, pas maintenu |
| 4 | Thomas's articles (1) supprimé | Trop récent, pas assez de contenu |
| 5 | Thomas's newsletters (3) supprimé | Décision de ne pas maintenir |
| 6 | Sujets (4) supprimé | Feature communauté morte |
| 7 | Podcasts Categories (2) supprimé | Tagger les épisodes directement |
| 8 | Testimonials → `customer-story` (cas clients riches) | Schéma riche avec body, company, logo, video, sector |
| 9 | Témoignages → `testimonial-quote` (citations courtes) | Schéma léger : citation, photo, poste, placement |
| 10 | 3 newsletters = 3 content-types séparés | Produits éditoriaux distincts, landing inscriptions dédiées |
| 11 | Quotes = Option C (bibliothèque + Dynamic Zone) | Maximum de flexibilité : réutilisation dans articles |
| 12 | Speakers = data only, pas de pages frontend | 111 pages n'apportent pas de valeur |
| 13 | CEO Dinners = hub + pages individuelles par édition | Preuve sociale, événements premium |
| 14 | Bootcamps = hub seul avec timeline | Track record sans pages individuelles |
| 15 | Workshops = supprimés + 301 home | Pas assez de contenu de valeur |
| 16 | Homepage EN : podcast masqué | Contenu audio FR-only |
| 17 | Homepage EN : blog/articles masqué | Contenu FR-only pour l'instant |
| 18 | i18n sections : chaque section décide | Podcast et blog masqués EN. Testimonials traduits |
| 19 | Blog + podcasts = FR-only | Traduction ultérieure |
| 20 | Integrations + legal = à traduire EN | Pertinent pour audience internationale |
| 21 | 9 slugs EN cassés identifiés | Contrainte Webflow "copy" — à fixer |
| 22 | customer-story + testimonial-quote traduits EN | Preuve sociale internationale |
| 23 | 8 content-types traduits, 6 FR-only | Matrice explicite |
| 24 | 7 locales : fr, en, es, de, pt, it | FR primaire, EN P1, reste P2 |
| 25 | i18n natif Strapi (approche 1) | "Fill in from another locale" pour sync |
| 26 | Homepage = Single Type Strapi + Dynamic Zone i18n | Admin contrôle blocs par locale |
| 27 | Tout le contenu de page dans Strapi | Source unique. next-intl = labels UI |
| 28 | Pages statiques = Single Types ou Collection Type `page` | Admin modifie tout dans un endroit |
| 29 | Pas de Strapi MCP | REST API directement |
| 30 | Composants Dynamic Zone = output des Steps | Découverts par screenshot |
| 31 | `/blog-2` → `/blog`, `/blog-3/*` → `/blog/*` | Nettoyer slugs hérités |
| 32 | `integration-category` = Collection Type avec pages | Garder comme Webflow |
| 33 | Pages `/secteur/*` → 301 `/` | Legacy marketplace |
| 34 | Pages `/video/*` → garder | Contenu actif (jan 2026) |
| 35 | Navbar + Footer dans next-intl | Structure fixe, exception assumée |
| 36 | Audit navbar + footer au Step 0 | Screenshots × 3 breakpoints |
| 37 | Télécharger tous les assets au Step 0 | CDN Webflow sera coupé |
| 38 | Strapi Cloud + Vercel | Hébergement production |
| 39 | Monorepo (Next.js + Strapi schemas) | Tout dans le même repo |
| 40 | HubSpot formulaires + Meetings (pas Calendly) | Intégration unique HubSpot |
| 41 | GTM + Axeptio au Step 9 | Analytics et cookies en dernier |
| 42 | Hero variant = `dark` si fond couleur de marque sur Webflow | `light` par défaut, `dark` quand le hero du Webflow a un fond primary/azul/gradient sombre (ex: `/produit/priorisation-par-equipes`) |
| 43 | Hero layout = `centered` par défaut, `split` si texte + image côte à côte | `centered` pour pages marketing produit/solution (texte centré + illustration dessous). `split` pour pages techniques/profondes (integrations, docs, comparatifs) |
| 44 | **Dark mode : out-of-scope v1** | Site marketing B2B light-mode only (même pattern que Notion/Linear/Figma pour leur site marketing). À réévaluer si (a) l'app produit passe en dark et une parité marketing est demandée, (b) signal client explicite, (c) A/B test de conversion le justifie. Coût estimé : 1-2j (duplication palette + `@media prefers-color-scheme` + re-baseline Playwright). |
| 45 | **Alt text obligatoire (TypeScript)** | Tous les props `alt` / `imageAlt` / `avatarAlt` / `logoAlt` / `authorAvatarAlt` sont `string` (non optionnels). Les images purement décoratives passent `alt=""` explicitement. Force le dev à prendre une décision a11y à chaque usage. |
| 46 | **`<Skeleton>` / `<EmptyState>` / `<ErrorBoundary>` disponibles mais rarement utilisés** | Le site est 100% SSG — la plupart des pages n'ont pas de state loading/empty/error visible. Composants fournis pour les zones client-side futures (recherche blog, forms async, widgets tiers). Règle : ne pas les importer par réflexe, seulement quand un vrai state existe. |
| 47 | **Composants blog = préfixe `Blog*` dans l'arbo existante, pas de sous-dossier** | `BlogHero` → `sections/BlogHero.tsx`, `BlogAuthorTag` → `ui/BlogAuthorTag.tsx`. Simplicité d'arborescence + identification claire par le nom. Futurs composants blog : même convention (`BlogCard`, `BlogPostMeta`, etc.). |
| 48 | **Pill autor blog : `--color-success-text` (`#2D8A4E`) + texte blanc** | Figma utilise `#10B981` (emerald Tailwind) qui n'existe pas dans notre palette. `--color-success` (`#03E26B`) est trop clair pour texte blanc (contraste AA insuffisant). `--color-success-text` donne un vert forêt DS-compliant avec contraste AAA. Pas de token `accent-emerald` ajouté — Figma réalignera si besoin. |
| 49 | **Playwright visual test pour BlogHero différé** | Le test visual demande une route live (`page.goto("/fr/blog/...")`). BlogHero vit seulement dans Storybook jusqu'au Step 5 (templates CMS blog). Test à ajouter quand la route `/fr/blog/[slug]/page.tsx` sera montée. |
| 50 | **`/fr/blog` monté avec mock data (`src/data/blog.tsx`)** | La route live permet de voir la page hors Storybook + passer un Playwright visual test (`tests/visual/blog-index.spec.ts`, 6 baselines : hero, 3 collections, CTA, footer). Au Step 5 le `BLOG_INDEX_DATA` hardcoded sera remplacé par un fetch Strapi. |
| 51 | **`<LottiePlayer>` DS component + `FeatureFrame.lottieSrc` prop (2026-05-14)** | Le live `airsaas.io` rend des animations Bodymovin via `<div data-animation-type="lottie" data-src="*.json">` (ex. `Programs-video.json` sur `/fr/equipes/comite-direction` section "Suivez l'avancée de vos programmes"). Le `<img>` et `background-image:url` regex les manquent. Extension : `npm i lottie-react` + nouveau composant DS `library-design/ui/LottiePlayer.tsx` (client-only, fetch JSON au mount, fallback "Animation unavailable") + extension de `FeatureFrame` avec une prop `lottieSrc` mutuellement exclusive avec `imageSrc` (Lottie wins si les deux sont set) + extension de `FeatureSplitSection` type avec `lottieSrc?: string` forwardé par le dispatcher. Pattern réutilisable pour toutes les landings futures avec Lotties Webflow. |

## Hero — Décision rapide (décembre 2025)

Au moment de migrer une page Webflow, regarder le hero et appliquer :

**1. `variant`**
- Fond blanc/clair → `light` (default)
- Fond couleur de marque (primary, azul, gradient sombre) → `dark`

**2. `layout`**
- Texte centré en haut, illustration dessous → `centered` (default)
- Texte à gauche, illustration à droite → `split`

**Combinaisons typiques**
| variant | layout | Usage |
|---|---|---|
| `light` + `centered` | Default | Pages produit/solution standard |
| `dark` + `centered` | Hero de marque fort | Priorisation, CTAs impactantes |
| `light` + `split` | Feature technique | Docs, intégrations |
| `dark` + `split` | Produit premium | Landing insignia |
