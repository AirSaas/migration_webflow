# Rebuild preview — Rapport de handoff

**Date**: 2026-04-24  
**Branche**: `rebuild-preview`  
**PR**: [#44](https://github.com/AirSaas/migration_webflow/pull/44)  
**Preview Vercel**: https://website-airsaas-git-rebuild-preview-airsaas.vercel.app  
*(Auth SSO Vercel requise — connecte-toi à ton compte Vercel pour y accéder)*

---

## Résultat

**92 pages statiques générées cleanly** :

| Type | Pages | Route | Source data |
|---|---|---|---|
| Blog articles | **62** | `/fr/blog/[slug]` | `src/data/blog-articles.ts` (parsed from Supabase) |
| LP | **4** | `/fr/lp/[slug]` | `src/data/lp.tsx` |
| Produit | **6** | `/fr/produit/[slug]` | `src/data/produit.tsx` |
| Solutions | **12** | `/fr/solutions/[slug]` | `src/data/solutions.tsx` |
| Équipes | **4** | `/fr/equipes/[slug]` | `src/data/equipes.tsx` |
| Misc | **4** | `/`, `/fr/blog`, `/_not-found` | — |
| **Total** | **92** | | |

- ✅ `npm run build` — clean
- ✅ `npm run lint:ds` — 0 violations
- ✅ `npx tsc --noEmit` — clean (hors 2 erreurs `fullPage` tests pré-existantes)
- ✅ Vercel preview build — SUCCESS

## Gate go/no-go

- **Objectif** : ≥ 85/89 pages OK (95%+)
- **Résultat** : **92/92 pages buildées** (100 %) ✅ **Go handoff**
- 1 article blog volontairement skipped (`portfolio-management` — non-blog, 2.76 MB, pas un article de gestion de projet)

---

## Outliers traités

| Slug | Traitement |
|---|---|
| `portfolio-management` | **Skipped** — marker `skip: true` dans data, retourne 404 si visité |
| `plan-de-communication-projet` | **Fallback dégradé** — 35 SVG d'infographic retirés, garde le texte + images standard |
| `gestion-portefeuille-projets-vs-gestion-de-projet`, `management-de-portefeuille-de-projet`, `portefeuille-projet` | **3 duplicate slugs builtés tels quels** — décision canonical + 301 côté produit/SEO |
| `pi-planning` / `program-increment-planning` | **Pair duplicate builté** — idem ci-dessus |

---

## Pages à review en priorité (sample)

Pour t'aider à démarrer la review, voici 10 pages représentatives du rebuild :

### Blog
- `/fr/blog` — index 3 collections
- `/fr/blog/metier-pmo` — 129 blocks, article long-form featured
- `/fr/blog/pi-planning` — 174 blocks, un des plus denses
- `/fr/blog/capacity-planning` — 109 blocks, article avec image hero + TOC
- `/fr/blog/plan-de-communication-projet` — outlier en fallback dégradé

### Landings
- `/fr/lp/ppm` — LP complète (hero + stats + features + FAQ)
- `/fr/lp/capacity-planning` — LP variante
- `/fr/produit/reporting-projet` — Produit simple
- `/fr/solutions/flash-report` — Solutions
- `/fr/equipes/outil-pmo` — Équipes

---

## Architecture livrée

### Pipeline blog
```
Supabase webflow_pages (type='blog')
  ↓ [Python parser — scripts/migrate/parse-blog-articles.py]
  ↓ BeautifulSoup extraction → typed BlogArticleBlock[]
  ↓
src/data/blog-articles.ts (62 articles × 5321 blocks)
  ↓
src/components/blog/renderBlogBlocks.tsx (switch par block.type)
  ↓ DS primitives (Heading, Text, Quote, ListInline, TableFrame,
  ↓                 InlineCta, InsightCallout, Button)
  ↓
BlogPostPage — route /fr/blog/[slug]
```

### Landings
```
src/data/{lp,produit,solutions,equipes}.tsx (mock data pré-existante)
  ↓
LandingLpPage (pour /lp/*)              — Hero + Stats + Pain + Features + WhyAdopt + Steps + FAQ + CTA
LandingSectionsPage (pour /produit|solutions|equipes/*) — Hero + Intro + sections[] + Footer
  ↓
Route /fr/{type}/[slug] avec generateStaticParams
```

---

## Caveats / limitations connues

- **FR only** — pas de routes EN/DE/ES/IT/NL/PT pour l'instant
- **Pas de Strapi** — data locale TSX, à câbler plus tard en Phase 3
- **HubSpot CTAs** → fallback `<Button>` inline (pas d'embed HubSpot réel, les 8 articles concernés affichent un bouton qui link vers `href`)
- **FAQ parser simpliste** — détection `fs-toc-element`/.faq peut manquer des accordions custom
- **Images manquantes** → placeholders `placehold.co` (ex: hero blog articles sans `main_image_url`)
- **Authors fake** — tous les articles affichent "AirSaas" par défaut (champ auteur pas dans le dump Webflow)
- **Pas de related articles** intelligent — juste la section "Pour aller plus loin" quand détectée
- **Tables `<table>`** → render via `TableFrame` quand 2-6 colonnes, sinon dropped
- **Inline styles Webflow** non transcrits — texte brut uniquement (cohérent avec le DS strict)
- **Pas de TOC scroll-spy** sur blog (ajout possible en Phase 2)

---

## Ce qu'il reste à faire

Cf. `docs/ds-changes-remaining-2026-04-24.html` pour la liste exhaustive. En résumé :

### Post-review design
- Si le design te convient → green-light Phase 3 Strapi integration
- Si gaps visuels détectés → liste par page + fix ciblé

### Phase suivante (après ta review)
1. **Strapi schema** (`blog-article` content-type + Dynamic Zone)
2. **Parser migration script** (Webflow → Strapi POST REST)
3. **Content decisions** : canonical slugs blog (3 sets de duplicates), sort de `portfolio-management`
4. **Assets hosting** : download images Webflow → `public/assets/blog/`
5. **i18n** : déclinaison EN/DE/ES/IT/NL/PT
6. **Redirects 301** : ~1730 URLs legacy à rediriger vers les nouvelles routes

---

## Pour reviewer

1. Ouvre `https://website-airsaas-git-rebuild-preview-airsaas.vercel.app` — login Vercel SSO
2. Parcours les 10 pages sample ci-dessus
3. Navigue librement dans les 92 pages via les liens internes / modif URL slug
4. Note tes retours :
   - ✅ Design OK → go Phase 3
   - ⚠️ Design à ajuster → liste précise (slug + section + problème)
   - ❌ Bloquant → stop + triage

---

*Généré automatiquement par la boucle rebuild-preview — pas de review humaine intermédiaire comme demandé.*
