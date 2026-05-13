# Migration run — metier-pmo


## Attempt 0

· [content-extractor] cleaned HTML: 44KB
· [content-extractor] extracted 112 blocks (in=15494 out=10715)
⚠ [cms-toggles-reader] Webflow API failed: Webflow listCollections 401: {"message":"Request not authorized","code":"not_authorized","externalReference":null,"details":[]}. Falling back to defaults.
⚠ [cms-toggles-reader] No Webflow CMS item for slug=metier-pmo. Using defaults.
· [cms-toggles-reader] toggles : faq=true newsletter=true cta=true customCta=null
· [content-validator] hints q=9 t=1 c=0 cta=0 h=38 ; extract q=3 t=1 c=6 cta=1 h=42 → FAIL (1)
⚠ [state] content validation reported 1 issue(s) — forwarding to Designer as feedback

## Attempt 1

· [design-mapper] spec : 112 blocks, layout=centeredToc (in=21484 out=12900)
· [ds-conformance-validator] PASS — 112 blocks conform
· [renderer] wrote spec → /Users/bertranruiz/conductor/workspaces/migration-webflow-stratpi/belo-horizonte/docs/blog-migration/_staging/metier-pmo.json ; v3 data file now has 3 articles
· [renderer] screenshot ok http://localhost:3000/fr/blog/v3/metier-pmo → 5 tile(s) (page h=19032px, viewport=4000px)
· [visual-auditor] verdicts : 16 pass, 3 fail (3 blocking)
⚠ [decision-router] RETRY (attempt 2/5) — 3 blocking issue(s)
· [state] looping — attempt 2 starting

## Attempt 2

· [design-mapper] spec : 112 blocks, layout=centeredToc (in=21864 out=12998)
· [ds-conformance-validator] PASS — 112 blocks conform
· [renderer] wrote spec → /Users/bertranruiz/conductor/workspaces/migration-webflow-stratpi/belo-horizonte/docs/blog-migration/_staging/metier-pmo.json ; v3 data file now has 3 articles
· [renderer] screenshot ok http://localhost:3000/fr/blog/v3/metier-pmo → 5 tile(s) (page h=19032px, viewport=4000px)
· [visual-auditor] verdicts : 17 pass, 2 fail (2 blocking)
⚠ [decision-router] RETRY (attempt 3/5) — 2 blocking issue(s)
· [state] looping — attempt 3 starting

## Attempt 3

· [design-mapper] spec : 112 blocks, layout=centeredToc (in=21593 out=12968)
· [ds-conformance-validator] PASS — 112 blocks conform
· [renderer] wrote spec → /Users/bertranruiz/conductor/workspaces/migration-webflow-stratpi/belo-horizonte/docs/blog-migration/_staging/metier-pmo.json ; v3 data file now has 3 articles
· [renderer] screenshot ok http://localhost:3000/fr/blog/v3/metier-pmo → 5 tile(s) (page h=19032px, viewport=4000px)
· [visual-auditor] verdicts : 18 pass, 0 fail (0 blocking)
· [decision-router] PASS at attempt 3
