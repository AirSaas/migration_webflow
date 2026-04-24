# Templates guide — how to compose pages from the DS

This doc lays out how to build **any page type** (landing, blog article, blog
index, case study, guide, doc, resource, event…) by composing DS primitives
and section frames. Everything is content-agnostic: copy flows in via props,
never hardcoded inside components.

> **Rule #5 of the DS** — every user-facing string comes from props.
> Component defaults, if any, are English fallbacks (`"Published by"`,
> `"Previous slide"`) — never French, never brand-specific. Production
> pages wire these to `next-intl` / Strapi.

---

## Page-type → section recipe

Below, `✓` = section/primitive commonly used; `opt` = optional; blank = not
typical for that page type.

| Section | Landing | Blog article | Blog index | Case study | Guide / Docs | Event |
|---------|---------|--------------|------------|------------|--------------|-------|
| `Navbar` (inside hero) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `Hero` | ✓ | | ✓ | ✓ | ✓ | ✓ |
| `BlogHero` | | ✓ | | | | |
| `LogosBar` | ✓ | | opt | opt | | |
| `ValuePropositionFrame` | ✓ | | | | | opt |
| `FeatureFrame` (incl. `richContent`) | ✓ | | | ✓ | ✓ | |
| `FeatureSectionStacked` | ✓ | | | ✓ | opt | |
| `IconRowFrame` | ✓ | | | | | opt |
| `PillarFrame` | ✓ | | | ✓ | | |
| `ComparisonFrame` / `ComparisonDualFrame` / `ComparisonTableFrame` | ✓ | opt | | ✓ | | |
| `HighlightFrame` | ✓ | | | ✓ | | |
| `SliderFrame` | ✓ | | | | | opt |
| `TestimonialsFrame` | ✓ | | | ✓ | | |
| `TableOfContentsFrame` | | ✓ | | opt | ✓ | |
| `BlogArticleBody` (rich-text) | | ✓ | | ✓ | ✓ | ✓ |
| `FaqFrame` | ✓ | opt | | opt | ✓ | opt |
| `CtaHighlightFrame` | ✓ | opt | ✓ | ✓ | opt | opt |
| `CtaFrame` (2-card) | opt | | | | | |
| `RelatedArticlesFrame` | | ✓ | opt | opt | ✓ | |
| `BlogCollectionFrame` | opt | opt | ✓ | opt | | |
| `Footer` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Key insight** — there's no "blog-only" section. `BlogHero` is any
article-style hero; `BlogArticleBody` is any rich-text page body (case
study, guide, event recap); `BlogCard` / `BlogCollectionFrame` list any
tagged content (articles, whitepapers, case studies, events). The `Blog`
prefix is a naming convention tied to the Figma source, not a content-type
lock.

---

## Content flexibility contract — all text comes from props

Session-created and session-touched components expose **every** user-facing
string as a prop:

| Component | Content props | Notes |
|-----------|---------------|-------|
| `BlogHero` | `topTagLabel?`, `title`, `author.*`, `imageAlt`, nav labels | `topTagLabel` omitted → no eyebrow pill |
| `BlogAuthorTag` | `name`, `avatarAlt?`, `categoryLabel?`, `publishedDate?`, `publishedByLabel?`, `inLabel?`, `datePrefix?` | Labels default to EN fallback (`"Published by"` / `"in"` / `"On"`); caller overrides per locale |
| `TableOfContentsFrame` | `title`, `items[].label`, `items[].href` | All locale-driven |
| `BlogArticleBody` | `children` (composed of DS primitives) | Rich-text composition — text comes from child elements, all of which take props themselves |
| `TableFrame` | `columns[]`, `rows[][]` | Rich cells accept `ReactNode` (bold, links, etc.) |
| `RelatedArticlesFrame` | `title`, `items[].label`, `items[].href`, optional `items[].target` | Icon is a generic external-link SVG, not brand-specific |
| `BlogCard` | `title`, `excerpt`, `date`, `authors[]` (1-4, multi-author byline), `authorsAndLabel?`, `authorsMoreLabel?`, `categoryLabel?`, `publishedByLabel?`, `inLabel?`, `thumbnailAlt` | Labels default to EN fallback; avatars stack (max 3), overflow collapses to "Name + N autres" |
| `BlogCollectionFrame` | `title`, `titleHighlight?`, `subtitle?`, `collectionAuthor?` (single author for whole collection), `background` ("light"\|"alt"), `items[]` (1-9 BlogCard props), `viewAllHref`, `viewAllLabel?` | Alternating light/alt backgrounds for visual rhythm between frames; `collectionAuthor` renders a minimal `<BlogAuthorTag>` under the H2 |
| `BlogIndexPage` | Hero (eyebrow, title, titleHighlight, subtitle), `collections[]` (auto-alternates bg), optional `cta`, `footerColumns` | 100% locale-driven; composes Hero + N BlogCollectionFrame + CtaHighlightFrame + Footer |
| `BlogPostPage` | grouped props per section, all optional sections | `articleBody: ReactNode` — composed from DS primitives |
| `FaqFrame` | `title?`, `titleHighlight?`, `items[].question`, `items[].answer` | Heading omitted when both title props are undefined |
| `CtaHighlightFrame` | `titlePrefix`, `titleHighlight`, `titleSuffix?`, `subtitle`, `ctaLabel`, `ctaHref?` | 3-part gradient heading driven by props |
| `CtaFrame` | `title`, `subtitle`, `children` (CardCta nodes) | |
| `Footer` | `columns`, `copyright?`, `copyrightIcon?` | No hardcoded copyright |
| `IllustrationFrame` | `src`, `alt`, optional `shape` / `tone` | `tone="warm"` for blog body, `"neutral"` for heroes |
| `ListInline` | `children`, optional `bullet` | `bullet="circle-primary"` for blog body, `"check-green"` (default) for feature lists |
| `FloatingCard` | optional `children`, `icon`, `decorative` | `decorative={true}` (default) → a11y-hidden + pointer-events-none; `false` → real content |

---

## Minimal blog article example

```tsx
import BlogPostPage from "@/components/pages/BlogPostPage";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Quote } from "@/components/library-design/ui/Quote";
import { useTranslations } from "next-intl";

export default async function Page({ params }: { params: { slug: string } }) {
  const t = useTranslations("blog");
  const post = await fetchBlogPost(params.slug); // Strapi

  return (
    <BlogPostPage
      navItems={navItems}
      topTagLabel={t("eyebrow")}             // "Le Blog"
      title={post.title}
      author={{
        name: post.author.name,
        avatarSrc: post.author.avatar,
        avatarAlt: post.author.avatarAlt,
        categoryLabel: post.category.name,
        categoryHref: `/blog/category/${post.category.slug}`,
        publishedDate: post.formattedDate,
        publishedByLabel: t("publishedBy"),   // "Publié par"
        inLabel: t("in"),                      // "dans"
        datePrefix: t("on"),                   // "Le"
      }}
      heroImageSrc={post.cover.src}
      heroImageAlt={post.cover.alt}
      tableOfContents={{
        title: t("toc"),                       // "SOMMAIRE"
        items: post.toc,
      }}
      articleBody={
        <>
          <Text size="md">{post.intro}</Text>
          {/* or render from Strapi blocks via BlocksRenderer */}
        </>
      }
      faq={post.faq && {
        title: t("faq.title"),                 // "Questions"
        titleHighlight: t("faq.titleHighlight"), // "fréquentes"
        items: post.faq,
      }}
      cta={{
        titlePrefix: t("cta.prefix"),
        titleHighlight: t("cta.highlight"),
        subtitle: t("cta.subtitle"),
        ctaLabel: t("cta.button"),
        ctaHref: "/demo",
      }}
      relatedArticles={post.related && {
        title: t("related"),                   // "Pour aller plus loin"
        items: post.related,
      }}
      trendingGrid={trending && {
        articles: trending,
        ctaLabel: t("viewAll"),                 // "Voir tous les articles →"
        ctaHref: "/blog",
      }}
      footerColumns={footer.columns}
      copyright={t("copyright")}
      copyrightIcon={<span aria-label={t("flagAlt")}>🇫🇷</span>}
    />
  );
}
```

**Every visible string is sourced from `t(...)` (next-intl) or `post.*`
(Strapi).** No hardcoded copy anywhere in the page file.

---

## Extending a template — when to reach for new components

Before adding a new component, work through `docs/ds-rules.md` decision tree:

1. Can an existing DS section render this? → use it.
2. Can an existing section handle it with a new prop / variant? → extend it.
3. Can it be composed from 2–3 DS primitives inline in the page? → keep inline.
4. Is the pattern used on ≥2 pages? → promote to `library-design/sections/`
   with full contract + validators + story + Playwright.

See `.claude/skills/ds-component-builder/SKILL.md` for the 7-gate workflow
every new / modified component goes through.
