# Audit rebuild vs live — 5 LPs représentatives

**Date** : 2026-04-27
**Reviewer** : Marianela
**Branch auditée** : `lp-rebuild`
**Méthode** : comparaison section par section `docs/live-captures/{type}/{slug}.md` (ground truth Webflow capturé 2026-04-23) vs code rebuild `.tsx`

## Légende

| Symbol | Meaning |
|---|---|
| ❌ MISSING | section absente du rebuild |
| 🚨 PLACEHOLDER/FAKE | contenu inventé, non sourcé |
| 🎨 VISUAL CHROME | diff d'apparence (frame/weight/layout) |
| ⚠️ CONTENT MISMATCH | contenu présent mais divergent |
| 🟦 ADDED | rebuild a, live n'a pas |
| 📁 ASSET | chemin gitignored, à vérifier en prod Vercel |
| 📍 Réf. code | fichier:ligne |

---

## Récapitulatif global

| Métrique | Valeur |
|---|---|
| Sections manquantes | 14+ |
| Sections inventées (non en live) | 8 |
| Fakes/placeholders | 2 majeurs (testimonials Capacity + KPIs CODIR) |
| Images mismatch | 3 confirmés |
| CTAs inline manquantes | 7+ |
| Violations DS Strict | 3+ (`style={{}}` inline CtaFrame) |

### Top 5 actions prioritaires

1. **[P1]** Remplacer testimonials placeholders Capacity par Sébastien Louyot + Aurore Butrot (vrais témoins live) — finding `[3.8]`
2. **[P2]** Supprimer KPIs inventés "70%/1h/120j/4×" sur CODIR ou les sourcer — finding `[5.1]`
3. **[P3]** Ajouter `<TabsFrame>` hero-adjacent sur PPM + CapacityPlanning (4 LPs concernées) — findings `[1.1]` + `[3.1]`
4. **[P4]** Restaurer les 6+ sections éditoriales long-form sur GestionPortefeuille (utiliser `<ProseFrame variant="reading">`) — findings `[4.1]` à `[4.7]`
5. **[P5]** Corriger images mismatch — findings `[1.5]` (Roadmap COMEX) + `[3.10]` (Capacity ×2)

### Patterns DS à considérer

- `<ValuePropositionFrame variant="dark">` + `<FeatureCard>` light → revoir chrome pour cohérence (4 pages affectées)
- `<Hero layout>` default → centered (pas split par défaut sur Solutions)
- `<LogosBar>` default size → augmenter height ou exposer prop `size="lg"`
- **`<ComparisonTableFrame>` → ajouter cell `type="check"`** comme alternative à text content (extension DS livrée 2026-04-27)
- Footer `copyrightIcon` → enforcer emoji 🇫🇷 partout (1 page diverge)
- `<CtaHighlightFrame>` à utiliser pour single CTA (pas `CtaFrame + style={{}}`)

---

## Page 1 — LP PPM

**URL Live** : https://www.airsaas.io/fr/lp/ppm
**URL Rebuild** : https://website-airsaas-ap9e0qgzd-airsaas.vercel.app/fr/lp/ppm
**Fichier code** : `src/components/pages/PpmPage.tsx`
**Section count** : Live 14 | Rebuild 13 | Δ 3 sections manquantes

### `[1.1]` ❌ MISSING — TabsFrame hero-adjacent (6 ancres)

Live affiche 6 anchor tabs sous le Hero (Portfolio / Quarter plan / Capacitaire / Priorisation / Roadmap / Reporting → `#w-tabs-0-data-w-pane-0..5`). Rebuild n'a aucun composant Tabs autour du Hero. Le composant `<TabsFrame>` existe dans le DS mais n'est pas utilisé.

📍 `PpmPage.tsx:95` (Hero) — pas de TabsFrame après

### `[1.2]` ❌ MISSING — Section "Décisions pilotables"

Live a un FeatureFrame "Décisions pilotables" avec subtitle "Les décisions changent, se perdent dans les CR..." + 4 checklist items (Owner et échéance assignés / Suivi du statut / Impact visible / Historique complet). Section entièrement absente du rebuild.

📍 `PpmPage.tsx` — entre lignes 194 (Priorisation) et 196 (Portfolio consolidé), section à insérer

### `[1.3]` ❌ MISSING — Section "Connecté à votre écosystème"

Live affiche un bloc dédié aux intégrations (Jira, Asana, Monday, Teams, Slack, API) avec icônes/logos. Aucun équivalent dans le rebuild.

📍 `PpmPage.tsx` — devrait apparaître avant la FaqFrame

### `[1.4]` ❌ MISSING — Section "Comment ça marche ?" (4 étapes)

Live a une section "Comment ça marche" avec 4 étapes numérotées (Import → Configuration → Onboarding → Go Live). Pattern parfait pour `<StepsFrame>` qui existe dans le DS mais n'est pas utilisé sur cette page.

📍 `PpmPage.tsx` — section absente

### `[1.5]` ⚠️ CONTENT MISMATCH — Image "Roadmap COMEX" wrong

Section Roadmap COMEX utilise l'image `65d35c96ec9fbf11d78e4b44_Portfolio-decisions--show-projects-title-.webp` dont le nom indique "Portfolio decisions" (page de décisions). Live affiche `..._Roadmap-page-fr.webp`. → mauvais asset assigné à cette section.

📍 `PpmPage.tsx:172` (imageSrc)

### `[1.6]` 🎨 VISUAL CHROME — "Pourquoi les équipes adoptent" cards

`ValuePropositionFrame variant="dark"` avec `FeatureCard` claires sur fond sombre (primary-70). Dissonance visuelle. Live affiche un bloc dark mais les cards y sont stylées différemment.

📍 `PpmPage.tsx:255-264`

### `[1.7]` 🎨 VISUAL CHROME — LogosBar logos trop petits

5 logos passés avec width 70-130 px et height 40 px. Live affiche les logos plus larges/présents. Le composant LogosBar n'expose pas de prop "size" → soit augmenter les valeurs width/height, soit demander une variante DS.

📍 `PpmPage.tsx:111-113` (logos array)

### `[1.8]` 🎨 VISUAL CHROME — Icônes sécurité (3/4 différentes)

Bloc Sécurité (4 cards) utilise BullseyeArrow / CalendarDay / CircleCheck / LockKeyhole. Live affiche iso-logo, location-dot, vial-circle-check, lock-keyhole. Seul LockKeyhole match.

📍 `PpmPage.tsx:274-286`

### `[1.9]` ⚠️ CONTENT MISMATCH — Emoji ⚠️ manquant titre Comparison

Live a "⚠️ Vous vous reconnaissez ?" comme titre du ComparisonFrame. Rebuild a "Vous vous reconnaissez ?" sans emoji.

📍 `PpmPage.tsx:128-139`

### `[1.10]` 📁 ASSET — Hero image à vérifier prod

`imageSrc=Flash-report-export-modal.webp`. Path sous `/assets/pages/lp/ppm/` qui est gitignored localement. Vercel runs `download-assets.mjs` au build. À vérifier visuellement en prod.

📍 `PpmPage.tsx:107`

---

## Page 2 — Solution Experts de la Transfo

**URL Live** : https://www.airsaas.io/fr/solution/airsaas-et-les-experts-de-la-transfo
**URL Rebuild** : https://website-airsaas-ap9e0qgzd-airsaas.vercel.app/fr/solution/airsaas-et-les-experts-de-la-transfo
**Fichier code** : `src/components/pages/SolutionAirsaasExpertsTransfoPage.tsx`
**Section count** : Live 9 | Rebuild 9 | Δ 0 (3 CTAs inline manquantes)

### `[2.1]` ❌ MISSING — CTA "🗓️ Infos et réservations" Bootcamp

Live ligne 69 a un CTA "🗓️ Infos et réservations" → `/fr/bootcamp-airsaas-expert-10-18-juin-2025` dans la section Bootcamp. Absente du FeatureFrame Bootcamp rebuild.

📍 `SolutionAirsaasExpertsTransfoPage.tsx:144-153`

### `[2.2]` ❌ MISSING — CTA "Je book une démo" (Tooling)

Live ligne 75 a un CTA "Je book une démo" → meetings.hubspot.com dans la section AirSaas dans le tooling. Absente.

📍 `SolutionAirsaasExpertsTransfoPage.tsx:164-173`

### `[2.3]` ❌ MISSING — CTA "En savoir plus" (Communauté LPDT)

Live ligne 81 a un CTA "En savoir plus" → `/fr/lesprodelatransfo` dans la section communauté. Absente.

📍 `SolutionAirsaasExpertsTransfoPage.tsx:175-184`

### `[2.4]` ⚠️ CONTENT MISMATCH — Image Bootcamp = logo SVG

FeatureFrame Bootcamp utilise `Bootcamp-logo-diapo.svg` (logo only). Live affiche 6 photos réelles de masterclass.

📍 `SolutionAirsaasExpertsTransfoPage.tsx:144-153`

### `[2.5]` ⚠️ CONTENT MISMATCH — Image LPDT = logotype

FeatureFrame "You never walk alone" affiche `logotype-LPDT_white-horizontal.svg` (logo). Live affiche une photo communauté.

📍 `SolutionAirsaasExpertsTransfoPage.tsx:175-184`

### `[2.6]` 🟦 ADDED — CtaFrame final "Prêt à surdélivrer"

Live se termine sur la communauté + slider, pas sur un CTA card. Le rebuild ajoute un CtaFrame final inexistant en live.

📍 `SolutionAirsaasExpertsTransfoPage.tsx:195-209`

### `[2.7]` ⚠️ DS STRICT VIOLATION — `style={{}}` inline CtaFrame

Single CardCta forcé en 70% width via `style={{ gridColumn: "1 / -1", width: "70%", margin: "0 auto" }}`. Viole DS Strict ("no `style={{}}` pour valeurs tokenisées"). Pour un single CTA → utiliser `<CtaHighlightFrame>`.

📍 `SolutionAirsaasExpertsTransfoPage.tsx` — ~ligne 200+

### `[2.8]` 🎨 VISUAL CHROME — Hero layout="split" inappropriée

Hero `layout="split"` avec illustration occupe la moitié. Pour cette page sans focus produit visuel, `layout="centered"` serait plus approprié (overuse split sur 10/12 Solutions).

📍 `SolutionAirsaasExpertsTransfoPage.tsx` — Hero

---

## Page 3 — LP Capacity Planning

**URL Live** : https://www.airsaas.io/fr/lp/capacity-planning
**URL Rebuild** : https://website-airsaas-ap9e0qgzd-airsaas.vercel.app/fr/lp/capacity-planning
**Fichier code** : `src/components/pages/CapacityPlanningPage.tsx`
**Section count** : Live 14 | Rebuild 11 | Δ 5 sections manquantes

### `[3.1]` ❌ MISSING — TabsFrame hero-adjacent (6 ancres)

Mêmes 6 ancres que PPM. Absente du rebuild.

📍 `CapacityPlanningPage.tsx:96` (Hero) — pas de TabsFrame

### `[3.2]` ❌ MISSING — Section "T-shirt sizing : S, M, L, XL"

4 checklist items (Estimation rapide / Conversion en jours / Saisie directe / Pas de micro-management). Absente du rebuild.

📍 `CapacityPlanningPage.tsx` — section absente

### `[3.3]` ❌ MISSING — Section "Testez des scénarios" (drag & drop)

4 checklist items. Absente du rebuild.

📍 `CapacityPlanningPage.tsx` — section absente

### `[3.4]` ❌ MISSING — Section "KPI : Taux d'avancement Quarter Plan"

4 checklist items. Absente du rebuild.

📍 `CapacityPlanningPage.tsx` — section absente

### `[3.5]` ❌ MISSING — Section "Par équipe, pas par personne"

4 checklist items. Absente du rebuild.

📍 `CapacityPlanningPage.tsx` — section absente

### `[3.6]` ❌ MISSING — Section "Opérationnel en 1 mois" (4 étapes)

4 étapes numérotées Équipes / Projets / Scénarios / Décision. Pattern `<StepsFrame>` non utilisé.

📍 `CapacityPlanningPage.tsx` — section absente

### `[3.7]` ⚠️ CONTENT MISMATCH — Section "Voir capacité future" remplacée

Live a "Voir la capacité future des équipes" (4 checklist : Capacité par équipe / Projection 1-3 trimestres / etc.). Rebuild remplace par "Quarter plan teams" qui n'existe pas en live.

📍 `CapacityPlanningPage.tsx:215-231`

### `[3.8]` 🚨 PLACEHOLDER / FAKE — Testimonials inventés

`TestimonialsFrame` contient :
- "Sophie Lefèvre @Kiabi"
- "Marc Durand @Valrhona"
- "Claire Martin @Decathlon"

Tous **INVENTÉS**. Live référence Sébastien Louyot (CIO Altavia) + Aurore Butrot (DSI Groupe Intuis). **Violation directe règle "no hardcoded user-facing copy"**.

📍 `CapacityPlanningPage.tsx:254-260`

### `[3.9]` ⚠️ CONTENT MISMATCH — 5ème step "Scénario en 10 min" manquant

`ValuePropositionFrame` "10 minutes" affiche 4 cards. Live a 5 cards (Idée floue / Brief / Découpage / Estimation / Scénario en 10 min).

📍 `CapacityPlanningPage.tsx:189-201`

### `[3.10]` 🚨 IMAGES MISMATCH — Agent IA Découpage + Capacitaire swap

- Section "Agent IA Découpage" affiche `Page-Scenarios-FR.webp` au lieu de `697746f56686d9257b4bca36_AI-Agent-team.webp` (live)
- Section "Vue capacitaire par équipe" affiche `Quarter-plan.webp` au lieu de `Capacity-screen.webp` (live)
- → 2 images swappées entre sections

📍 `CapacityPlanningPage.tsx:183` (Agent IA Découpage imageSrc), `CapacityPlanningPage.tsx:216` (Vue capacitaire imageSrc)

### `[3.11]` 🎨 VISUAL CHROME — ValuePropositionFrame variant="dark"

2 sections utilisent `variant="dark"` ("10 minutes" + "Notre parti pris") avec `FeatureCard` claires → même chrome dissonance que PPM.

📍 `CapacityPlanningPage.tsx:189-201`, `CapacityPlanningPage.tsx:240-252`

### `[3.12]` ⚠️ CTA "Arrêtez de lancer des projets sans capacité"

Structure `CtaFrame` + 2 `CardCta` correcte. Mais subtitle raccourci vs live (manque "AirSaas libère le PMO..."). À vérifier visuellement les 2 cards.

📍 `CapacityPlanningPage.tsx:291-310`

---

## Page 4 — Solution Gestion Portefeuille Projet

**URL Live** : https://www.airsaas.io/fr/solution/gestion-portefeuille-projet
**URL Rebuild** : https://website-airsaas-ap9e0qgzd-airsaas.vercel.app/fr/solution/gestion-portefeuille-projet
**Fichier code** : `src/components/pages/SolutionGestionPortefeuilleProjetPage.tsx`
**Section count** : Live 13 | Rebuild 9 | Δ 6+ sections éditoriales manquantes

> ⚠️ **Cette page est éditoriale long-form (SEO) dans le live. Le rebuild a remplacé le long-form par un template marketing standard.**

### `[4.1]` ❌ MISSING — Intro éditoriale "L'outil préféré des DSI"

Live a un paragraphe d'intro + 3 sub-paragraphes :
- "Le portefeuille de projet le plus simple au monde"
- "Donnez à votre organe de gouvernance"
- "Le portefeuille ne doit pas vous contraindre"

Remplacé par `<ValuePropositionFrame>` (3 cards courtes) dans rebuild.

📍 `SolutionGestionPortefeuilleProjetPage.tsx` — ~ligne 70-80

### `[4.2]` ❌ MISSING — Section "Avancez plus sereinement avec votre équipe" + 4 sous-sections

Section H3 "Avancez plus sereinement" avec 4 sous-sections :
- `[4.2.a]` "Diminuez la frustration entre les métiers et l'IT"
- `[4.2.b]` "Vers un meilleur cadrage des projets"
- `[4.2.c]` "Des équipes plus engagées autour d'un objectif clair"
- `[4.2.d]` "Communiquez sur les avancées"

Aucune trace dans le rebuild.

🎨 **Note** : pour ces sections la live utilise des graphics plus petits + plus de texte. DS expose `<FeatureFrame imageSize="compact">` ou `"narrow"` — devrait être utilisé ici.

📍 `SolutionGestionPortefeuilleProjetPage.tsx` — section absente

### `[4.3]` ❌ MISSING — Section "Une distinction à faire" (2 colonnes)

Bloc éditorial avec 2 colonnes bullet lists (Gestion projet vs Gestion portefeuille). Absent.

📍 `SolutionGestionPortefeuilleProjetPage.tsx` — section absente

### `[4.4]` ❌ MISSING — Section "Rapide historique des outils PPM"

Section éditoriale historique avec sous-sections "À quand remonte..." / "Première problématique...". Absente.

📍 `SolutionGestionPortefeuilleProjetPage.tsx` — section absente

### `[4.5]` ❌ MISSING — Section "Visions différentes du pilotage"

Section éditoriale "Exemple des DSI" + 3 sous-sections (mission technique → business / Essor digital / contrôle → collaboration). Absente.

📍 `SolutionGestionPortefeuilleProjetPage.tsx` — section absente

### `[4.6]` ❌ MISSING — Section "Visions opposées" (5 sub)

5 sous-sections (Outils all-in-one VS intégrés / Espace collaboratif / UX / Méthodes de travail / Interface vecteur de changement). Absente.

📍 `SolutionGestionPortefeuilleProjetPage.tsx` — section absente

### `[4.7]` ❌ MISSING — Section "Où se situe AirSaas dans le spectre"

3 sous-sections (PPM intuitif intégré / UX forte / Méthodologie collaborative). Absente.

📍 `SolutionGestionPortefeuilleProjetPage.tsx` — section absente

### `[4.8]` ⚠️ ORDER ISSUE — TestimonialsFrame mal placée

Live affiche "Ils parlent de nous" en 2e position (juste après le Hero). Rebuild la place à la FIN de la page.

📍 `SolutionGestionPortefeuilleProjetPage.tsx:220-246`

### `[4.9]` 🟦 ADDED — Sections non présentes en live

Le rebuild ajoute :
- `ValuePropositionFrame` "Simple, collaboratif, orienté valeur" (3 cards)
- `ComparisonTableFrame` "AirSaas vs PPM traditionnel"
- `FeatureFrame` stacked "Marketplace intégrations"
- 2× `CtaFrame` intermédiaire/final

Aucune n'est dans le live. À justifier ou supprimer pour pixel-fidelity.

📍 `SolutionGestionPortefeuilleProjetPage.tsx:130-218`

### `[4.10]` ⚠️ DS STRICT VIOLATION — `style={{}}` inline ×2

2× `CtaFrame` avec single `CardCta` forcé via `style={{ gridColumn: "1 / -1", width: "70%" }}` inline. Pour single CTA → utiliser `<CtaHighlightFrame>`.

📍 `SolutionGestionPortefeuilleProjetPage.tsx:130-144` (CTA intermédiaire), `SolutionGestionPortefeuilleProjetPage.tsx:204-218` (CTA final)

### `[4.11]` ⚠️ INTERNAL LINKING — Liens hyperlien manquants

Live a ~4 liens hyperlien internes dans les subtitles ("problèmes les plus fréquents en gestion de portefeuille", "reporting", "outil PPM", "tableau de bord portefeuille"). Tous absents → internal linking SEO cassé.

📍 `SolutionGestionPortefeuilleProjetPage.tsx:60+` (Hero subtitle)

### `[4.12]` 🎨 VISUAL CHROME — Hero layout="split" inappropriée

Page éditoriale long-form devrait avoir Hero centered + image plus discrète. Split occupe trop de visibilité.

📍 `SolutionGestionPortefeuilleProjetPage.tsx` — Hero

---

## Page 5 — Équipes Comité de Direction

**URL Live** : https://www.airsaas.io/fr/equipes/comite-direction
**URL Rebuild** : https://website-airsaas-ap9e0qgzd-airsaas.vercel.app/fr/equipes/comite-direction
**Fichier code** : `src/components/pages/EquipeComiteDirectionPage.tsx`
**Section count** : Live 11 | Rebuild 11 | Δ 0 (mais 2 manquent + contenu inventé)

### `[5.1]` 🚨 PLACEHOLDER — KPIs "70% / 1h / 120j / 4×" inventés

`ValuePropositionFrame` "Les chiffres" affiche des valeurs numériques **INVENTÉES** :
- "70%"
- "1h"
- "120j"
- "4×"

Live affiche ces 4 cards **SANS valeurs numériques explicites** (juste icônes + descriptions). Les chiffres rebuild sont fabriqués sans source. À supprimer ou à sourcer.

📍 `EquipeComiteDirectionPage.tsx:113-145`

### `[5.2]` 🚨 TITLE/CONTENT MISMATCH — "7 raisons" mais 5 rows

`ComparisonTableFrame` title = "7 raisons pour lesquelles les directions générales adorent AirSaas". Le tableau n'a que 5 rows. Soit corriger le titre en "5 raisons", soit ajouter 2 oppositions manquantes.

📍 `EquipeComiteDirectionPage.tsx:200-247`

### `[5.3]` 🎨 VISUAL CHROME — Pas de check icons dans colonne "Avec AirSaas"

`ComparisonTableFrame` colonne "Avec AirSaas" affiche des **STRINGS DESCRIPTIFS** ("Reporting décisionnel uniforme..."), **PAS de check icons**.

→ **Le DS doit supporter cell `type="check"` comme alternative au string.** Extension livrée 2026-04-27 (voir commit après ce doc).

📍 `EquipeComiteDirectionPage.tsx:208-247` (rows.values)

### `[5.4]` ❌ MISSING — Carrousel/Slider Industries (10 secteurs)

Live ligne 178-195 a un slider d'industries clients (10 secteurs avec icônes idea/briefcase et chiffres : Énergie, Hôtellerie, Communication, Conseil, Santé-Pharma, Industrie, Événementiel, Assurance, Santé Editeur logiciel, etc.). Bloc ABSENT du rebuild.

📍 `EquipeComiteDirectionPage.tsx` — section absente

### `[5.5]` ❌ MISSING — CTA "Laissez nos clients vous parler"

Live a un CTA "Laissez nos clients vous parler d'AirSaas" → `/fr/temoignages`. Absent du rebuild.

📍 `EquipeComiteDirectionPage.tsx` — CTA absent

### `[5.6]` ⚠️ CONTENT MISMATCH — 4ème press item "LMI" manquant

Live a 4 press items (Alliancy / JDN / Le Point / LMI). Rebuild a 3 dans `pressTestimonials`. → manque "Le Monde Informatique".

📍 `EquipeComiteDirectionPage.tsx` — pressTestimonials array

### `[5.7]` 🚨 INCOHÉRENCE INTER-PAGES — Footer flag "FR" vs 🇫🇷 emoji

Footer `copyrightIcon` = `<span aria-label="Français">FR</span>` (texte). Au lieu de l'emoji 🇫🇷 utilisé sur les 4 autres pages auditées. **INCOHÉRENCE visuelle**.

📍 `EquipeComiteDirectionPage.tsx` (Footer copyrightIcon)

### `[5.8]` 🟦 ADDED — RelatedSolutionsFrame non en live

Le rebuild ajoute "Allez plus loin" (4 cards solutions liées) qui n'existe pas dans la page live de comite-direction.

📍 `EquipeComiteDirectionPage.tsx:259-267`

### `[5.9]` ⚠️ ORDER ISSUE — TestimonialsFrame séparée en 2 blocs

Le rebuild crée 2 `TestimonialsFrame` distincts (press + linkedin). Live affiche tout dans un bloc unique fusionné.

📍 `EquipeComiteDirectionPage.tsx:89-103`

---

## Suite à donner

1. L'agent du rebuild `lp-rebuild` applique les fixes par ordre de priorité (Top 5 actions ci-dessus)
2. Pour le finding `[5.3]`, l'extension `<ComparisonTableFrame>` cell `type="check"` est livrée dans un commit séparé sur `ds-site-marianela`
3. Les patterns DS récurrents (ValuePropositionFrame variant=dark, Hero layout default, LogosBar size, CtaFrame inline-style) sont à discuter en revue DS pour décider entre fix per-callsite vs extension
4. Les 8+ sections éditoriales long-form de `gestion-portefeuille-projet` requièrent `<ProseFrame variant="reading">` — pattern déjà au DS, à adopter

## Références

- Source live : `docs/live-captures/{type}/{slug}.md` (capturé 2026-04-23)
- Code rebuild : branche `lp-rebuild`
- DS contracts : `docs/ds-components-reference.md`
- DS rules : `docs/ds-rules.md`
- DS use-cases : `docs/ds-use-cases.md`
- Onboarding agent suivant : `docs/AGENT_ONBOARDING.md`
- Audit final consolidé (avant rebuild) : `docs/ds-audit-final-2026-04-24.md`
