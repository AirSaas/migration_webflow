# Migration run — comite-pilotage-projet


## Attempt 0

· [content-extractor] cleaned HTML: 31KB
· [content-extractor] extracted 52 blocks (in=11064 out=6498)
⚠ [cms-toggles-reader] Webflow API failed: Webflow listCollections 401: {"message":"Request not authorized","code":"not_authorized","externalReference":null,"details":[]}. Falling back to defaults.
⚠ [cms-toggles-reader] No Webflow CMS item for slug=comite-pilotage-projet. Using defaults.
· [cms-toggles-reader] toggles : faq=true newsletter=true cta=true customCta=null
· [content-validator] hints q=1 t=0 c=0 cta=0 h=6 ; extract q=1 t=0 c=0 cta=0 h=7 → PASS

## Attempt 1

· [design-mapper] spec : 52 blocks, layout=centeredToc (in=15969 out=8071)
· [ds-conformance-validator] PASS — 52 blocks conform
· [renderer] wrote spec → /Users/bertranruiz/conductor/workspaces/migration-webflow-stratpi/belo-horizonte/docs/blog-migration/_staging/comite-pilotage-projet.json ; v3 data file now has 2 articles
· [renderer] screenshot ok http://localhost:3000/fr/blog/v3/comite-pilotage-projet → 4 tile(s) (page h=13510px, viewport=4000px)
· [visual-auditor] verdicts : 18 pass, 2 fail (2 blocking)
⚠ [decision-router] RETRY (attempt 2/5) — 2 blocking issue(s)
· [state] looping — attempt 2 starting

## Attempt 2

· [design-mapper] spec : 52 blocks, layout=centeredToc (in=16261 out=8387)
· [ds-conformance-validator] PASS — 52 blocks conform
· [renderer] wrote spec → /Users/bertranruiz/conductor/workspaces/migration-webflow-stratpi/belo-horizonte/docs/blog-migration/_staging/comite-pilotage-projet.json ; v3 data file now has 2 articles
· [renderer] screenshot ok http://localhost:3000/fr/blog/v3/comite-pilotage-projet → 4 tile(s) (page h=13510px, viewport=4000px)
· [visual-auditor] verdicts : 8 pass, 0 fail (0 blocking)
· [decision-router] PASS at attempt 2
