# DS gaps — patterns visuels en attente d'extension

Ces patterns ont été identifiés dans l'audit Marisella 2026-05-05 (R1-R45) ou sont apparus en cours de Phase 4. Ils ne sont pas implémentés dans le DS Storybook actuel — ils attendent soit :
- Extension DS Marisella + dev (process `docs/ds-rules.md` Extension)
- Apparition dans une landing Figma future (auquel cas extension à faire à ce moment)

## En attente

| ID | Pattern | Source visuelle | Impact | Priorité |
|---|---|---|---|---|
| **R10** | Slider Industries (carousel horizontal de logos / images d'industries) | Pages équipes (équipes-direction-de-la-transformation, équipes-it-et-operation, équipes-comite-direction, équipes-outil-pmo) | 4/4 équipes — section visible mais omise rebuild | Moyenne — DS gap vrai (composant slider absent) |
| **R36** | Image badges / labels overlay sur illustration ("BOOTCAMP de 3 jours", "AIRSAAS TIMING", etc.) | Pages produit + solutions (sur les illustrations hero ou feature) | Variable selon page | Basse — décoration éditoriale |
| **R23-bis** | Halo concentrique blanc dynamique sur Hero variant=dark | Produit (déjà partiellement supporté via `EllipseBackground` dans `Hero.tsx`) | 6/6 produit | Couvert par Hero variant=dark, vérifier rendu pixel par Marisella |
| **R31-bis** | Newsletter signup form fonctionnel (handler HubSpot / Mailchimp / Strapi) | Blog | 62 articles | Marquée non-functional v0 dans `NewsletterInlineCard.tsx` — à brancher Phase 5 CMS |

## Process d'extension

Quand un nouveau pattern apparaît dans une landing Figma de Marisella :
1. Vérifier qu'aucun composant DS existant ne couvre le besoin (`docs/ds-components-reference.md`)
2. Si non couvert → propose extension à Marisella + dev (signature props, contract `@purpose/@useWhen/@dontUse/@limits/@forbidden`)
3. Implémenter dans `src/components/library-design/...` avec story Storybook
4. Régénérer la référence : `python3 scripts/generate-ds-reference.py`
5. Utiliser dans la page bespoke

Voir `docs/ds-rules.md` "Extension process".

## Patterns adressés (référence)

Phase 4 a livré les composants suivants dans le DS pour adresser des audits Marisella :
- `Hero.variant="dark"` (R23) + `EllipseBackground` halo
- `CtaFrame.layout="wide"` (R27)
- `FeatureCard.variant="dark"` (R41)
- `LogosBar` chrome wrapper (R44)
- `customer-testimonials` photo-lead grid for équipes (R9, R35)
- `FaqFrame` SVG chevron (R34)
- `NewsletterInlineCard` (R31, UI-only v0)
- `BlogPostPage` 2-col layout sticky `TocSidebar` (R32, N2)
- `BlogHero.author.readingTime` metadata header (R30)

Tous ces composants sont disponibles dans Storybook et utilisables pour les landings Figma-first à venir.
