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
