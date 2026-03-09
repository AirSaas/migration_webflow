# i18n Mapping — AirSaaS

## Locales

| Code | Langue | Priorité |
|------|--------|----------|
| fr | Français | Primaire (défaut) |
| en | English | P1 |
| es | Español | P2 |
| de | Deutsch | P2 |
| pt | Português | P2 |
| it | Italiano | P2 |

## Matrice content-types × langue

| # | Content-type Strapi | FR | EN | Strapi i18n |
|---|---------------------|----|----|-------------|
| 1 | article | FR-only | Non | Blog FR uniquement |
| 2 | podcast-episode | FR-only | Non | Contenu audio FR |
| 3 | speaker | FR-only | Non | Data only |
| 4 | newsletter-cio | FR-only | Non | |
| 5 | newsletter-ceo | FR-only | Non | |
| 6 | product-update | FR-only | Non | |
| 7 | customer-story | Traduit | Oui | Cas clients traduits |
| 8 | testimonial-quote | Traduit | Oui | Citations traduites |
| 9 | integration | Traduit | Oui | Audience internationale |
| 10 | integration-category | Traduit | Oui | |
| 11 | quote | Traduit | Oui | Bibliothèque réutilisable |
| 12 | author | Traduit | Oui | Bio traduite |
| 13 | legal-page | Traduit | Oui | Obligatoire |
| 14 | event | Traduit | Oui | CEO Dinners + Bootcamps |

**Résumé** : 8 traduits EN, 6 FR-only.

## Slugs EN cassés à fixer

| Page FR | Slug EN actuel (cassé) | Slug EN cible |
|---------|----------------------|---------------|
| `/produit/budget` | `project-management-prioritization-copy-2` | `budget-tracking` |
| `/livre-blanc-quarter-plan` | `pmo-tool-copy-2` | `whitepaper-quarter-plan` |
| `/microsoft-teams-airsaas` | `strategic-plan-copy` | `microsoft-teams-airsaas` |
| `/guide/cahier-des-charges-logiciel-ppm` | `project-management-prioritization-copy` | `ppm-software-requirements` |
| `/video/pi-planning` | `ppm-copy-4` | `pi-planning` |
| `/video/pmo` | `ppm-copy-3` | `pmo` |
| `/video/ppm` | `ppm-copy` | `ppm` |
| `/livre-blanc/capacity-planning` | `ppm-copy-2` | `capacity-planning` |
| `/lp/pi-planning` | `capacity-planning-copy` | `pi-planning` |

## Règles i18n

- Contenu lié à `article` ou `podcast-episode` = **FR-only** (masqué dans les autres langues)
- Contenu lié à `customer-story`, `testimonial-quote`, `integration` = **traduit 7 langues**
- Sections statiques (hero, features, CTA) = **traduit 7 langues** via Strapi Dynamic Zone
- Navbar + Footer = **next-intl** (fichiers JSON, pas Strapi)
- Pas de `if locale === 'en'` dans le code — Strapi gère les blocs par locale
