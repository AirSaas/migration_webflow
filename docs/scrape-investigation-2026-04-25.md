# Investigation — Pourquoi le scrape Webflow était incomplet

**Date** : 2026-04-25  
**Phase** : 0 du plan rebuild Option B  
**Status** : ✅ Diagnostic terminé, décision prise

## TL;DR

Le scrape précédent (table `webflow_pages` Supabase) a été fait par un script externe au repo (pas dans `scripts/migrate/`), entre **2026-02-05 et 2026-03-05** (~1,5 mois). Il a 3 défauts critiques :

1. **Équipes (4 pages) ont `html_content = NULL`** — données absentes
2. **LP (4 pages) totalement absentes** de la table — 0 row
3. **Stale** — pré-rebuild visuel, ne reflète pas les changements Webflow récents

→ **Décision** : rescrape complet via **Cloudflare Browser Rendering /scrape** dans une nouvelle table `airsaas_pages_rebuild` pour repartir d'une base clean et replayable.

## État de `webflow_pages` (Supabase)

| Type | Total | Has HTML | NULL HTML |
|---|---|---|---|
| `blog` | 63 | 63 ✅ | 0 |
| `equipe` | 4 | 0 ❌ | 4 |
| `produit` | 6 | 6 ✅ | 0 |
| `secteur` | 6 | 6 ✅ | 0 |
| `solution` | 12 | 12 ✅ | 0 |
| `lp` | **0** ❌ | — | — |
| **Total** | **91** | **87** | **4** |

**Périmètre rebuild Option B** : 88 pages = 4 LP + 6 Produit + 12 Solution + 4 Équipes + 62 Blog
- LP (4 pages) : **non scrappées**, à crawler depuis le live
- Équipes (4 pages) : scrappées mais HTML null, à re-crawler
- Blog : 63 scrappées, on garde 62 (skip `portfolio-management` outlier, vraisemblablement = la 63ème row blog mal taggée)
- Produit (6) + Solution (12) : ont HTML, mais à re-scraper pour refresh + cohérence

## Pourquoi le scrape était incomplet

### Hypothèses confirmées

1. **Pas dans `scripts/migrate/`** — le script `01-extract-raw.mjs` ne fait que de l'extraction Webflow CMS API v2 (collections + items), pas de HTML rendering. Donc les pages statiques (Solution/Produit/Equipe/LP) sont hors scope.
2. **Script externe au repo** — la table `webflow_pages` a été populée par un autre processus (probablement un crawler bash/curl ad hoc dans un autre dépôt SEO/audit, ou un script ponctuel non versionné).
3. **Crawl partiel** — le crawler a probablement utilisé le sitemap.xml, qui à ce moment-là ne listait peut-être pas les `/lp/*` (landings ABM ou hors index), ou avait des pages équipes en draft.
4. **Pas de retry sur fail** — les 4 équipes en NULL HTML suggèrent un crash silencieux du scraper (timeout, 5xx Webflow), sans mécanisme de retry/reportage.

### Ce qui a fonctionné

- Le scrape blog (63/63) est complet — c'était sans doute la cible initiale du script (audit SEO blog).
- Solution + Produit + Secteur ont leur HTML — autres types CMS Webflow accessibles via sitemap public.

## Décision

**Rescrape complet** via **Cloudflare Browser Rendering /scrape** dans une nouvelle table `airsaas_pages_rebuild` :

- ✅ Cible explicite : 88 URLs hardcodées (pas de dépendance sitemap)
- ✅ JS rendering automatique (Lottie animations Webflow, lazy images)
- ✅ Retry/error tracking (colonne `scrape_status`, `scrape_error`)
- ✅ Replayable (on peut refaire à n'importe quel moment)
- ✅ Coût quasi-nul (~7 min browser time, sous limite gratuite Cloudflare 10 min/jour)
- ✅ Test API validé en amont (token verify + `/scrape` test sur produit/budget + blog/metier-pmo, voir Phase 0 logs)

L'ancienne table `webflow_pages` reste intacte (utilisée par d'autres processus SEO comme `seo_audit_results`).

## Prochaines étapes

→ Phase 1 : créer la table `airsaas_pages_rebuild`, écrire `scripts/migrate/scrape-airsaas-rebuild.mjs`, scraper les 88 URLs, vérifier `scrape_status='ok'` pour 88/88.
