# QA checklist — page rebuild

**Reference document**. Listed checkpoints are run by `scripts/qa-page.mjs` (regex/DOM)
+ `scripts/qa-llm.mjs` (semantic, Sonnet) before any URL is shared with the user.

> **Rule absolute** : 0 P0 obligatoire avant handoff.
> Si un nouveau pattern de bug est trouvé par le user, il faut **ajouter le check ici**
> ET dans `qa-page.mjs` ou `qa-llm.mjs` pour ne plus le rater.

---

## Severity scale

| Severity | Meaning |
|---|---|
| **P0** | Bloquant — user-visible bug, ship interdit |
| **P1** | Visible bug — devrait être fixé avant ship |
| **P2** | Polish — à corriger mais pas bloquant |
| **P3** | Nice-to-have — backlog |

---

## P0 — Bloquants

### Content rendering
1. **htmlLiteralInText** — Pas de `<br/>` / `<strong>` / `<em>` / `<a href` rendus comme **texte literal** dans le DOM (regex sur text content, pas sur HTML)
2. **htmlEntitiesUnescaped** — Pas d'entités HTML brutes (`&amp;`, `&nbsp;`, `&#x27;`, `&lt;`) visibles
3. **placeholderTitle** — Pas de title fallback "AirSaas" dans Hero ou H1
4. **placeholderImage** — Pas de `placehold.co` quand un vrai asset existe en source
5. **httpStatus** — Pas de page renvoyant 4xx/5xx
6. **emptyHeadingSection** — Pas de section avec heading mais body vide (sauf intentionnel — sub-headings courts OK)
7. **duplicateH1** — 1 seul `<h1>` par page

### Functional
8. **emptyHrefs** — Pas de `<a>` avec `href=""` ni `href="#"` dans body content
9. **missingTestimonialHref** — Tous les testimonial cards ont href s'il existe en source
10. **missingLogoHref** — Logos cliquables ont href s'il existe en source
11. **noOnclickWithoutHandler** — Pas de bouton avec onClick={undefined}
12. **internal404** — Liens internes (commencent par `/fr/`) pas en 404 (au moins shape OK)

---

## P1 — Visuels critiques

### Typography
13. **bodyHeadingSize** — Heading H2 dans body article ≤ 40px (downshift levels en blog)
14. **headingHierarchy** — Heading sizes cohérents avec leur niveau hiérarchique
15. **truncatedWords** — Pas de mots tronqués à cause d'overflow caché
16. **lineHeightOk** — Pas de chevauchement vertical entre lignes

### Layout
17. **noHorizontalOverflow** — Pas d'overflow horizontal (375px / 768px / 1440px)
18. **heroPresent** — Hero présent en première section
19. **footerPresent** — Footer présent en dernière section
20. **navbarPresent** — Navbar présent en haut avec ≥ 2 items
21. **featureAlternation** — Sections image alternent imagePosition (right/left/right…)

### Images
22. **imagesHaveAlt** — Toutes les `<img>` ont un `alt` (vide accepté pour décoratives marquées)
23. **imageAspectRatio** — Pas d'image avec aspect ratio cassé (height=0 ou trop petit)
24. **noConsecutiveDuplicateImages** — Pas de même image répétée 5+ fois
25. **blogHeroFromMeta** — Hero blog utilise `meta.heroImage` si dispo (pas placeholder)

### Author / Meta
26. **realAuthor** — Blog : auteur ≠ "AirSaas" placeholder si vrai author existe
27. **dateFormatted** — Blog : date publication formatée en FR
28. **htmlTitleSet** — `<title>` HTML défini par page
29. **metaDescriptionSet** — `<meta description>` défini

---

## P2 — Structure / cohérence

### Sections
30. **minSectionCount** — Nombre de sections ≥ 3 (sauf cas exceptionnel)
31. **headingsCoverage** — Headings live present in rebuild (≥ 80% blog, ≥ 50% landings)
32. **paragraphsDelta** — Paragraphs count delta < 50% vs live
33. **testimonialsCountMatch** — Featured testimonials count match live ±30%
34. **logosCountMatch** — Logos count match live ±20%

### Heading hierarchy
35. **noOrphanH3** — Pas de H3 directement sous H1 sans H2 entre (sauf top H2 implicite)
36. **noOrphanH4** — Pas de H4 directement sous H2 sans H3
37. **headingTextNonEmpty** — Headings text non vide ni trop court (< 3 chars)

### Navbar / Footer
38. **navbarMatch** — Navbar items match `BLOG_INDEX_DATA.navItems`
39. **navCtaPresent** — CTA navbar présent
40. **loginLinkPresent** — Login link présent
41. **footerColumnsMatch** — Footer columns match `BLOG_INDEX_DATA.footerColumns`
42. **copyrightPresent** — Copyright affiché

### Content semantic (LLM-only)
43. **sectionPurposeFit** — Chaque section CTA/Feature/Testimonial paraît cohérent avec son purpose
44. **copyToneOk** — Copy ne paraît pas tronquée mid-phrase ou mal traduite
45. **noUnexpectedDuplicates** — Pas de testimonial/CTA répété de façon louche
46. **brandConsistency** — Pas de mention concurrent / typo brand AirSaas

---

## P3 — Polish

47. **noConsoleErrors** — Pas de console errors en navigation
48. **noReactWarnings** — Pas de warnings React (dev mode)
49. **lcpUnder3s** — LCP < 3s
50. **clsUnderPoint1** — CLS < 0.1
51. **noWebflowLeftoverClasses** — Pas de classe `.font--*` brute (Webflow leftover)
52. **noInlineHexColor** — Pas de `style={{ ... }}` avec hex hardcodés

---

## Checks LLM-only (sémantique, qa-llm.mjs)

Le LLM (Sonnet) reçoit le HTML rendu de la page + URL live + screenshot optionnel,
et est demandé de flagger ce qui "sent pas bon" :

- Sections vides qui paraissent abandonnées
- CTA labels qui ne matchent pas le sujet de la section
- Copy awkward, mal traduite, hors contexte
- Layout valide HTML mais visuellement bizarre
- Mise en page qui paraît bizarre même si techniquement OK
- Duplications subtiles
- Brand inconsistency (mention concurrent par erreur)

Output JSON par page :
```json
[
  { "severity": "P0|P1|P2", "type": "content|typography|layout|functional|brand", "location": "section title or selector", "description": "..." }
]
```

---

## Process avant handoff au user

1. `node scripts/qa-page.mjs` → 0 P0, P1 médiane ≤ 3
2. `node scripts/qa-llm.mjs` → 0 LLM_P0, LLM_P1 médiane ≤ 2
3. `node scripts/qa-merge.mjs` → `docs/qa-combined-report.md`
4. Visual sample si > 5 pages modifiées
5. Si 0 P0 et ≥ 85% pages status `pass` → handoff OK
6. Sinon : itérer fixes, recommencer

---

## Procédure si nouveau bug détecté par user

Quand le user signale un bug que regex+LLM n'ont pas détecté :

1. Ajouter le check à `qa-page.mjs` (regex) si automatisable
2. Sinon, enrichir le prompt `qa-llm.mjs` (cas sémantique)
3. Ajouter le pattern à cette checklist
4. Re-run la suite pour valider que ça catch maintenant
5. Le pattern devient permanent (régression test)
