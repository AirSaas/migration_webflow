# Design System — AirSaaS

> Extrait de Webflow MCP (variable_tool + style_tool) le 2026-03-09

## Fonts

| Usage | Font | Poids |
|-------|------|-------|
| Heading | Raleway | 500–800 |
| Body | Raleway | 300–400 |
| Button | Raleway | 300–500 |
| App (screenshots) | Product Sans | 400–700 |

**Font principale** : Raleway pour tout le site marketing. Product Sans uniquement dans les captures d'écran de l'app AirSaaS.

## Typography Scale

### Body

| Style | Font | Size | Line-height | Weight | Color |
|-------|------|------|-------------|--------|-------|
| body (défaut) | Raleway | 17px | 23px | 300 | #041230 (Midnight Blue) |
| p (article) | Raleway | 1.2rem | 1.7rem | — | #404249 (Text blog) |
| p (solution) | — | 1.1rem | 1.5rem | — | — |
| p (small) | — | 0.8rem | 1.2rem | — | — |
| li | — | 19px | 29px | — | — |
| blockquote | Raleway | 1.3rem | 2rem | 300 | #13397a (Medium Blue) |

### Headings

| Style | Size | Line-height | Weight | Notes |
|-------|------|-------------|--------|-------|
| H1 (hero principal) | 4rem | 4.5rem | 700 | Page d'accueil, animé |
| H1 (second page) | 3.2rem | 3.5rem | 700 | center |
| H1 (landing) | 2.8rem | 3rem | 700 | left |
| H1 (blog) | 3.5rem | 4.1rem | 700 | center |
| H2 (principal) | 2.5rem | 3rem | 600–800 | — |
| H2 (section) | 2.2rem | 3.1rem | 800 | left |
| H2 (color) | 2rem | 2.5rem | — | Primary color |
| H3 | 1.5rem | 2rem | 500–700 | — |
| H4 | 1.5rem | 2rem | 600 | — |
| H5 | 16px | 19px | 400 | — |
| H6 | 15px | 18px | 500 | — |

## Couleurs

### Brand

| Nom | Hex | Variable Webflow | Usage |
|-----|-----|-----------------|-------|
| Primary | `#3a51e2` | `variable-14717b6c` | CTA, liens, accents |
| Primary 70 | `#6b7be9` | `variable-11346cdc` | Headings secondaires |
| Primary 60 | `#8a97ee` | `variable-765816a6` | Accents légers |
| Primary 20 | `#d1d5f5` | `variable-c6e6936c` | Backgrounds légers |
| Primary 10 | `hsla(232, 92%, 95%, 1)` | `variable-e01fa25f` | Fond très léger |
| Primary 5 | `#f3f3fc` | `variable-7320dec4` | Fond subtil |
| Primary 2 | `#f8f9ff` | `variable-4687a7b0` | Fond quasi-blanc |

### Texte

| Nom | Hex | Usage |
|-----|-----|-------|
| Midnight Blue | `#041230` | Texte principal (body, headings) |
| Text blog | `#404249` | Texte articles |
| Dim Grey | `#63606e` | Texte secondaire |
| Dim Grey-2 | `#403e49` | Texte paragraphe |
| Grey | `#797588` | Texte muted |

### Couleurs fonctionnelles

| Nom | Hex | Usage |
|-----|-----|-------|
| Royal Blue | `#475ce9` | Liens, highlights |
| Orange | `#e58d05` | Alertes, highlights hero animé |
| Crimson | `#f11444` | Destructive |
| Deep Sky Blue | `#2db5e6` | Accent secondaire |
| Lime Green | `#5ec045` | Succès |
| Medium Orchid | `#b75dda` | Accent tertiaire |
| Dark Turquoise | `#0fd6de` | Accent charts |

### Backgrounds

| Nom | Hex | Usage |
|-----|-----|-------|
| White | `#ffffff` | Fond principal |
| White Smoke | `#f7f7f8` | Fond alterné |
| White light | `#fafafc` | Fond très léger |
| Lavender | `#f2f4ff` | Fond primary teinté |
| Seashell | `#fef6ef` | Fond chaud (orange) |
| Secondary 10 | `#e5e7ea` | Bordures, séparateurs |
| Prevention 20 | `#fff6d8` | Warning background |

### Dark mode (Apps collection)

| Nom | Hex |
|-----|-----|
| Background Dark | `#030303` |
| Foreground Dark | `#f8f8f8` |
| Primary Dark | `#5574ff` |
| Card Dark | `#141414` |
| Border Dark | `#e5e7ea1a` |

## Buttons

| Style | Padding | Font-size | BG | Color |
|-------|---------|-----------|----|----- |
| Button (primary) | — / 25px | 1.1rem | `#041230` (Midnight Blue) | white |
| Button navbar | 11px / 15px | 0.9rem | `#041230` | white |
| Button secondary | — / 20px | 1.1rem | white | Primary |
| Button tertiary | — / 25px | 1.1rem | Orange (#e58d05) | white |
| Button call | 10px / 25px | 1.2rem | `#041230` | white |
| Button call secondary | 10px / 25px | 1.2rem | white | Primary |

## Spacings / Sizing

| Token | Value |
|-------|-------|
| Border radius | 10px |

## Breakpoints

| Nom | Largeur |
|-----|---------|
| Mobile | 375px |
| Tablet | 768px |
| Desktop | 1440px |

## Swatch Reference

| Swatch ID | Nom | Hex |
|-----------|-----|-----|
| `@swatch_14717b6c` | Primary | `#3a51e2` |
| `@swatch_3ebae0bb` | Royal Blue | `#475ce9` |
| `@swatch_b5d2b1a4` | Midnight Blue | `#041230` |
| `@swatch_e8b335ce` | Text blog | `#404249` |
| `@swatch_3e62afa4` | Dim Grey p | `#403e49` |
| `@swatch_c0fc88cb` | Orange | `#e58d05` |
| `@swatch_0deb10a2` | Medium Blue | `#13397a` |
| `@swatch_640b5317` | Dim Grey-2 | `#403e49` |
| `@swatch_3691b239` | Black | `black` |
| `@swatch_53e205e3` | White Smoke | `#f7f7f8` |
