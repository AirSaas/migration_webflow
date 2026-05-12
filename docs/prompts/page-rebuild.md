# Page Rebuild — Webflow → Next.js + DS

> Operational prompt for rebuilding any page of airsaas.io (landing,
> solution, produit, lp, blog, etc.) from Webflow to Next.js + Strapi
> + the AirSaaS Design System.
>
> Complements `CLAUDE.md` and `docs/ds-rules.md` — adds strict
> content-fidelity guarantees on top of the DS Strict Mode rules.

---

Reconstruye la página `<LIVE_URL>` (locale `<fr|en|...>`, tipo
`<landing|solution|produit|lp|blog|...>`) lista para Vercel.

## Inputs
- URL del live: `<LIVE_URL>` (ej. https://www.airsaas.io/fr/lp/pi-planning)
- Locale: `<fr|en|...>`
- Tipo de página: `<landing|solution|produit|lp|blog|legal|...>`
- Referencias canónicas a imitar (mismo tipo de página):
  ej. `src/components/pages/CapacityPlanningPage.tsx`,
  `src/components/pages/PpmPage.tsx`, `src/components/pages/BlogPostPage.tsx`.
- Contratos del DS: `docs/ds-components-reference.md`, `docs/ds-rules.md`,
  `docs/sections-catalog.md`, `src/app/globals.css` (tokens).

## Principio central
El live es la **fuente estricta del contenido**. Toda copy, CTAs, y CANTIDAD
de elementos (cards, bullets, badges, icons, stats, párrafos, opciones FAQ,
items de tablas, logos) son **verbatim** del live. Solo el diseño visual se
adapta al DS. Cualquier divergencia de contenido debe estar documentada con
justificación explícita.

## Proceso obligatorio (en orden, no saltable)

### 1 — Extracción del live en DOS pasadas independientes
- **Pasada A — Estructura**: lista todas las secciones en orden + jerarquía
  de headings (H1/H2/H3) verbatim.
- **Pasada B — Por sección**: extrae verbatim (un prompt por bloque de
  secciones):
  - Eyebrow tag / topTag
  - Heading completo (incluye gradients, line breaks, mayúsculas exactas)
  - Subtitle / body paragraphs
  - TODOS los bullets / checklist items (en orden, con paréntesis,
    barras `/`, qualifiers, etc.)
  - CTA labels exactos (incluye emojis ▶️🎥📘, flechas →, puntuación,
    conjugación verbal: "Réservez" ≠ "Réserver")
  - Hrefs destino de cada CTA
  - Nombres semánticos de cada icon visible (hourglass, gear, calendar,
    bullseye-arrow, video, refresh, …)
  - Alt / descripción de cada imagen
  - Labels de logos en strips
  - Pairs Q/A de FAQ (verbatim)
- Si las dos pasadas difieren en cantidad de items en cualquier sección,
  re-fetcha hasta que el conteo sea estable.

### 2 — Tabla de auditoría ANTES de codear
Construye una tabla con una fila por **cada elemento atómico** del live
(heading, párrafo, bullet, CTA, badge, icon, image, FAQ Q/A). Columnas:
`live` (verbatim) · `rebuild propuesto` · `DS component` · `notas`.
**No abras ningún archivo `.tsx` hasta que esa tabla esté completa.**

### 3 — Inventario DS y mapping
- Lee `docs/ds-components-reference.md` completo.
- Para cada sección del live, identifica el DS component que la cubre.
- Si una sección no tiene patrón DS directo (ej. tagline suelta, stat row
  sin heading): compón con primitives existentes (`SectionHeading`,
  `Heading`, `Text`, `Tag`, `GradientText`, `ListInline`). **No inventes
  componentes nuevos.**
- Si descubres que un DS component referencia un token roto (no existe en
  `globals.css`), reporta y aplica fix usando el token existente más
  cercano. **No lo dejes pasar.**

### 4 — Reutilización de assets
- Antes de descargar un asset nuevo, busca en
  `public/assets/images/<otras-landings>/` el mismo screenshot del producto.
- Si el live muestra el mismo dashboard/portfolio/roadmap/capacity que
  otra landing ya construida, reutiliza el `.webp` existente.
- Si necesitas un asset nuevo: descarga via `scripts/download-assets.mjs`
  (o equivalente) y guárdalo en `public/assets/images/<page-slug>/`.
- Nunca `placehold.co` en producción.

### 5 — Construcción sección por sección
Para cada sección, en orden:
- Verifica fila correspondiente en la tabla de auditoría
- Pega la copy **carácter por carácter** desde el live (no reescribir,
  no parafrasear, no "limpiar" puntuación)
- Mismo número de cards/bullets/icons que el live
- CTAs con todos sus emojis y flechas

### 6 — Audit DOM-level después de codear
Antes de cualquier `git commit`:
- Extrae lista de headings del preview vs lista del live → **deben coincidir
  exactamente** (orden + texto).
- Per-section element count: cards (`article`), bullets (`ListInline` /
  `li`), badges (`Tag`), icons (`svg` dentro de cards) — deben coincidir
  con el live.
- Itera hasta 0 desviaciones.

## Reglas estrictas — verbatim

| Aspecto | Regla |
|---|---|
| Copy | Cada carácter del live aparece en rebuild. Cero parafraseo, cero "mejoras", cero limpieza de puntuación, cero cambios de mayúsculas ("Sync Features" ≠ "Sync features"), cero cambios de conjugación ("Réservez" ≠ "Réserver"). |
| Cantidad | Mismo número de cards, bullets, badges, stats, icons, párrafos, opciones FAQ, filas de tabla, logos. |
| CTAs | Incluye exactamente los emojis (▶️🎥📘) y flechas (→) del live. Mismo href que el live. |
| Icons | Si el live tiene icon en una card, la card del rebuild tiene icon. Mappea al icon DS más cercano semánticamente (`illustration-icons.tsx`). |
| Tag variants | Match el visual: si el live muestra check verde → `variant="success"`. Eyebrow lavanda → `variant="muted"`. Etc. |
| Headings | NO inventes H2/H3 que no estén en el live. Si en live es texto inline / eyebrow / tagline → renderiza como Text/Tag, NO como SectionHeading. |
| Subtitles | Solo incluye si el live los tiene. Si la sección DS requiere subtitle obligatorio pero el live no lo tiene → `" "` (espacio) + comentario explicando por qué. |
| Imágenes | `imageAlt` descriptivo no-vacío para cada `imageSrc`. Reutilizar assets de otras landings cuando aplique. |

## Conflictos fidelidad vs DS — siempre gana fidelidad
- Si la copy del live excede un `@limits` del DS (Tag/Button 30 chars,
  FeatureCard.title 12 chars, etc.): **acepta el warning dev** (no es
  blocking en prod) y comenta `// DS warning intencional: matches live`.
  **NO trunques contenido.**
- Si encuentras un token DS roto (referencia a `var(--color-X)` que no
  existe en `globals.css`): reporta, aplica fix usando el token existente
  más cercano, y documenta en `docs/decisions.md`.

## Reglas DS estándar (ver `docs/ds-rules.md`)
- No copies el look & feel del live (colores, fonts, espaciados, formas).
- No inventes componentes nuevos. Solo extensiones via "Extension process".
- No dupliques componentes existentes.
- Responsive obligatorio (mobile / tablet / desktop).
- Product Sans only. Solo weights 300/400/500/700/900.
- Cero hex/rgba hardcoded. Cero `bg-gray-*`. Cero `<h1-h6>` raw.

## Cross-page (aplicar siempre)
- **Navbar/Footer**: usa `BLOG_INDEX_DATA.navItems`, `navCtaLabel`,
  `loginLabel`, `footerColumns`, `copyright` desde `src/data/blog.tsx`.
  Mismo Navbar+Footer en todas las páginas del locale.
- **i18n**: el slug del path debe estar en `[locale]/...`. Si la página
  existe en EN + FR, crea ambas rutas. Consulta la matriz i18n del spec
  antes de codear.
- **SEO**: cada `page.tsx` exporta `metadata: Metadata` con `title` +
  `description` derivados verbatim del live (`<title>` + meta description
  source).
- **Redirects 301**: si el slug Webflow → Next difiere, añade entrada en
  el config de redirects del proyecto.

## Output obligatorio
1. **Tabla de auditoría completa** (live vs rebuild, marcas ✓/❌ por
   fidelidad).
2. **Secciones detectadas** en orden, con DS component usado.
3. **Componentes DS reutilizados** (lista completa) y **warnings DS
   aceptados** con justificación verbatim.
4. **Tokens DS rotos** encontrados (si aplica) + fix aplicado.
5. **Estructura de archivos** creados/modificados.
6. **Código completo** archivo por archivo.
7. **Assets reutilizados o nuevos** (paths absolutos desde `public/`).
8. **Metadata SEO** (title + description verbatim del live).
9. **Comandos** para local + gates de verificación + deploy.

## Gates antes de declarar terminado (TODOS deben pasar)
- `node scripts/ds-audit.mjs` → clean
- `node scripts/qa-page.mjs <slug>` → 0 P0, P1 ≤ 3
- `node scripts/qa-llm.mjs <slug>` → 0 LLM_P0, LLM_P1 ≤ 2
- `npx eslint <archivos nuevos>` → 0 errors, 0 warnings DS strict
- `npx tsc --noEmit` → 0 errors en archivos nuevos
- DOM headings list del preview === lista headings del live (orden + texto)
- Per-section DOM count: mismo número de cards, bullets, icons (svgs),
  badges que el live
- Visual check obligatorio con screenshot: hero + 1 sección
  `imagePosition="left"` + 1 sección con cards/icons
- Browser console del preview: 0 errores, 0 `[DS]` warnings nuevos no
  justificados
- Pre-commit hook DS audit pasa sin `--no-verify`

## Anti-patterns observados (NO hacer)
- ❌ Parafrasear copy "para que suene mejor"
- ❌ Dropear sub-elementos que no encajan limpiamente en el DS (ej. quitar
  un row de stats porque no hay heading para ellos)
- ❌ Inventar un eyebrow / subtitle / tagline que no está en live
- ❌ Cambiar "Réservez" → "Réserver" (o cualquier cambio de tiempo verbal)
- ❌ Quitar emojis / flechas / paréntesis "por estética"
- ❌ Quitar icons de cards porque "no encajan en el flow"
- ❌ Truncar texto que pasa el límite del DS — usar warning intencional
- ❌ Crear nuevos DS components sin Extension process
- ❌ Hardcodear hex `#fffbeb` cuando existe `--color-prevention-20`
- ❌ Usar `var(--color-X)` sin verificar primero que existe en globals.css
- ❌ Marcar la página como terminada sin pasar los gates DOM-level
