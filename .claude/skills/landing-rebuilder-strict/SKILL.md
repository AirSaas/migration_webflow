# Landing Rebuilder Strict — AirSaaS

**Prompt court à charger au début de tout rebuild agent.** 30 ordres précis dérivés de 23 mappings de landings AirSaas. Companion court du skill `landing-rebuilder` (qui contient la méthodologie complète + les 17 rules détaillées).

Charge ce skill quand : un sous-agent reçoit un mapping handoff-ready d'une landing et doit l'implémenter dans `src/data/landings-v2/*.ts` + vérifier le rendu.

---

## RÈGLES ABSOLUES — NE PAS DÉROGER

### Verbatim & contenu
1. **Reproduis le texte caractère par caractère** — copy live de `/tmp/<slug>.html`. Préserve typos ("Kaban", "tranquile", "marketplate"), doubles espaces, em-dashes, majuscules/minuscules. Ne reformule jamais, même si le copy semble incohérent avec le contexte (ex : "flash report" sur un landing gestion de projet).
2. **N'invente JAMAIS de copy** — si un titre/body manque du mapping, demande, ne complète pas.
3. **N'invente JAMAIS d'URL d'asset** — vérifie chaque `imageSrc` / `lottieSrc` / `avatarSrc` avec `curl -sI` (attends `HTTP/2 200`). Si pas trouvé, demande.
4. **Ne copie jamais copy/assets d'une autre landing** — chaque rebuild ré-extrait son propre `/tmp/<slug>.html`.
5. **Préserve les hyperlinks inline** dans richContent (ex : `/fr/solution/*`, `/fr/gestion-de-projet/*`). N'oublie aucun `<a>` du live.

### Hero
6. **`layout` toujours explicite** — ne te fie pas à l'auto-pick du dispatcher. Vérifie sur le live : image à CÔTÉ du texte = `split`, en DESSOUS = `centered`.
7. **Default solution/equipes/lp post-flash-report** = `variant:"light"` + `layout:"centered"` sauf indication contraire dans le mapping.
8. **`heading__pill` `<em>` ornament droppé** — extrais le texte verbatim mais ne render PAS l'ornement (pas dans le DS).
9. **Lottie via `lottieSrc` prop** (extension commit `cddcb7a`), mutuellement exclusif avec `imageSrc`. Si les 2 sont dans le mapping, Lottie wins.
10. **CTA defaults** : `"Réservez une démo"` → `/fr/meetings-pages` quand le mapping ne précise pas.

### Alternation FeatureFrame (STRICT)
11. **Right → Left → Right** par racha consécutive. **Restart au `right`** après chaque `section-heading` / `cta-stacked` / `quote-callout` / `value-proposition` / `feature-stacked` / `pillar-frame` / `clients`.
12. **Ignore la classe `left` du Webflow** — la règle d'alternation prime.

### Dispatcher mapping (correspondances strictes)
13. **`small_pic` dans le live** → `imageSize:"narrow"` (Rule 17 du skill `landing-rebuilder`).
14. **CTA banner mid-page** (H + sous-titre + 1 CTA centrée) → `cta-stacked`, jamais `cta-highlight`.
15. **`<p class="p--highlight">` brand callout** → `quote-callout` avec `highlight` prefix gradient.
16. **`block-quote--columns` ou `<li>` bullets sans image** → `feature-stacked`.
17. **3-views pattern** (Vue liste / Vue Kanban / Vue timeline) → 1 `section-heading` intro + 3 `feature-split` (titres synthétisés autorisés). Paragraphe de clôture fusionné dans la dernière `feature-split`.
18. **Sections text-heavy avec body + bullets + paragraphe clôture** → splitter selon mapping ; ne jamais tout cramer dans un seul feature-split.

### Title gradient
19. **Blue au début** → `titleHighlight` prefix (default).
20. **Blue à la fin** → `titleHighlight` + `titleHighlightAtEnd:true`.
21. **Blue au milieu** → compromise : étendre vers le côté le plus logique. Documente le compromise en commentaire.

### Data file
22. **Jamais hand-edit le `.ts`** — utilise un script Node.js dans `/tmp/rewrite-<slug>.mjs` qui parse, mute, JSON.stringify, write back. Template : `/tmp/rewrite-outil-pmo.mjs`.
23. **Footer auto-appended** par `LandingPageV2` — ne l'ajoute jamais à `sections[]`.
24. **Navbar inside `<Hero>`** via `navItems={BLOG_INDEX_DATA.navItems}` — pas dans sections.

### QA gates obligatoires (bloquant)
25. `node scripts/ds-audit.mjs` → ✅ clean.
26. `node scripts/qa-page.mjs --slug=<slug>` → P0=0.
27. DOM headings du dev server fetch (`curl http://localhost:3000/<route>`) MATCH les headings du live `/tmp/<slug>.html` (tolérance h3→h4 pour DS Heading max=4).
28. Dev server console : **seulement** warnings `[DS]` intentionnels pour verbatim long copy. Tout autre erreur = bloquant.
29. **Ne MODIFIE JAMAIS un composant DS** pour faire passer un layout — utilise `className` per-instance ou trigger l'Extension process documenté dans `docs/ds-rules.md`.

### Avant de déclarer done
30. Commit pattern : `feat(<category>/<slug>): rebuild landing using corrected DS mapping`. Push. Wait Vercel preview `success`. Reporte l'URL au user.

---

**Si un signal du live n'est pas couvert ci-dessus** → STOP, pose la question. Ne devine pas, ne hardcode pas.

## Companion docs

- `.claude/skills/landing-rebuilder/SKILL.md` — méthodologie complète + 17 rules avec incidents documentés
- `docs/ds-rules.md` — golden rules DS + decision tree + Extension process
- `docs/ds-components-reference.md` — 47 contracts DS (`@purpose / @useWhen / @dontUse / @limits / @forbidden`)
- `docs/sections-catalog.md` — 30 section types `LandingPageV2`
- `docs/prompts/page-rebuild.md` — contrat verbatim-fidelity
- `src/components/pages/LandingPageV2.tsx` — dispatcher canonique
- `src/types/landing.ts` — discriminated union des section types
