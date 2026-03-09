# Plan de redirections 301

> Total : ~1 730 URLs redirigées
> Implémentées dans `next.config.ts`

## Collections supprimées → `/`

| Pattern | Items |
|---------|-------|
| `/startups/:slug` | 1 529 |
| `/jobs/:path*` | 24 |
| `/eti-pme/:slug` | 17 |
| `/categories-jobs/:slug` | 13 |
| `/startup-category/:slug` | 8 |
| `/tribune-ceo/:slug` | 5 |
| `/sujets/:slug` | 4 |
| `/thomass-newsletters/:slug` | 3 |
| `/podcasts-categories/:slug` | 2 |
| `/tribune-ceo-en/:slug` | 1 |
| `/post/:slug` | 1 |
| `/quotes/:slug` | 33 |

## Collections sans pages frontend → hub

| Pattern | Items | Redirect |
|---------|-------|----------|
| `/podcasts-speakers/:slug` | 111 | → `/blog/cio-revolution` |

## Blog URL cleanup

| URL actuelle | URL cible |
|-------------|-----------|
| `/blog-2` | `/blog` |
| `/blog-3/les-articles` | `/blog/articles` |
| `/blog-3/cio-revolution` | `/blog/cio-revolution` |
| `/blog-3/good-morning-cio` | `/blog/good-morning-cio` |

## Pages statiques supprimées → `/`

`/scouting-on-demand`, `/innovation-veille-technologique`, `/transformation-digitale-solutions`, `/nextwebinar`, `/nextwebinar-ok`, `/dsi-form`, `/transfo-quotes`, `/strategic`, `/workshop-manifeste-gouvernance`, `/workshop-manifeste-gouvernance-ok`, `/workshop-manifeste-gouvernance-copy2`, `/workshops`, `/startup`, `/jobs`, `/secteur/*` (6 pages)

## Pages événementielles → hubs

| URL | Redirect |
|-----|----------|
| `/ceo-diner-landing` | → `/ceo-dinner` |
| `/ceo-dinner/ceo-diner-landing-1st` | → `/ceo-dinner/edition-1` |
| `/ceo-dinner/ceo-diner-landing-2nd` | → `/ceo-dinner/edition-2` |
| `/ceo-dinner/ceo-diner-landing-3rd` | → `/ceo-dinner/edition-3` |
| `/bootcamp-airsaas-expert` | → `/bootcamp` |
| `/bootcamp-airsaas-expert-*` | → `/bootcamp` |
