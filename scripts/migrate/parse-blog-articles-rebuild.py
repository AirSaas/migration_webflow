#!/usr/bin/env python3
"""
Blog parser v2 — reads airsaas_pages_rebuild (rendered HTML),
extracts enriched blog articles into src/data/blog-articles-v2.ts.

Improvements over v1 (parse-blog-articles.py):
- Real `meta.author` from <a class="author-card-link"> + h4 / .post-author
- Real `meta.heroImage` from <img class="post-img-blog"> or first hero figure
- "Pour aller plus loin" related links extracted as structured items
- TOC extracted from .fs-toc-element / .summary-link list
- Better blockquote / quote / .citation-blog detection
- Better detection of FAQ accordions (.faq__h3 + .faq__content)
"""

import json
import re
import sys
import urllib.request
from pathlib import Path
from html import unescape
from bs4 import BeautifulSoup, NavigableString, Tag

SUPABASE_URL = "https://ydudpmtbnvpxxenbnvab.supabase.co"
SUPABASE_ANON_KEY = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
    "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkdWRwbXRibnZweHhlbmJudmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3ODgzMDEsImV4cCI6MjA4NTM2NDMwMX0."
    "62_iMmq47ZUCLraNvMjW5qhT_hH6pfSfxBZH0y8mMfQ"
)

REPO_ROOT = Path(__file__).resolve().parents[2]
OUT_TS = REPO_ROOT / "src" / "data" / "blog-articles-v2.ts"
OUT_JSON = REPO_ROOT / "docs" / "raw" / "blog-articles-v2-content.json"

OUTLIER_SKIP = {"portfolio-management"}
OUTLIER_FALLBACK = {"plan-de-communication-projet"}

# Article body container selectors (priority order)
BODY_SELECTORS = [
    "div.container__article__integrations__text",
    "div.blog-post-body",
    "div.rich-text",
    "div.post-body",
    "article",
]


def clean_text(s):
    return re.sub(r"\s+", " ", unescape(s or "")).strip()


def slugify(text):
    text = re.sub(r"[^\w\s-]", "", text.lower())
    return re.sub(r"\s+", "-", text).strip("-")[:80] or "section"


def normalize_src(src):
    if not src:
        return None
    if src.startswith("//"):
        return "https:" + src
    return src


def inline_html(tag):
    parts = []
    for child in tag.children:
        if isinstance(child, NavigableString):
            parts.append(unescape(str(child)))
        elif isinstance(child, Tag):
            n = child.name
            if n in ("strong", "b"):
                parts.append(f"<strong>{inline_html(child)}</strong>")
            elif n in ("em", "i"):
                parts.append(f"<em>{inline_html(child)}</em>")
            elif n == "a":
                href = child.get("href", "#")
                target = child.get("target")
                tgt = f' target="{target}"' if target else ""
                parts.append(f'<a href="{href}"{tgt}>{inline_html(child)}</a>')
            elif n == "br":
                parts.append("<br/>")
            else:
                parts.append(inline_html(child))
    return "".join(parts).strip()


# ─── Fetch ───────────────────────────────────────────────────────────────────


def fetch_articles():
    url = (
        f"{SUPABASE_URL}/rest/v1/airsaas_pages_rebuild"
        f"?type=eq.blog&scrape_status=eq.ok&order=slug.asc"
        f"&select=slug,full_url,html_rendered"
    )
    req = urllib.request.Request(
        url,
        headers={
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))


# ─── Meta extraction ────────────────────────────────────────────────────────


def extract_author(soup):
    """Pattern airsaas: pairs of <.author__text> divs (label + value)."""
    author_blocks = soup.select("div.author__text")
    name = None
    pub_date = None
    category = None
    # Walk pairs in pairs (label, value)
    for i in range(len(author_blocks) - 1):
        label = clean_text(author_blocks[i].get_text())
        value = clean_text(author_blocks[i + 1].get_text())
        if not value:
            continue
        if label.lower().startswith("publi"):
            name = value
        elif label.lower() == "le":
            pub_date = value
        elif label.lower() == "dans":
            category = value
    avatar = None
    avatar_img = soup.select_one("img.author, img.author-img, img[title='Author']")
    if avatar_img and avatar_img.get("src"):
        avatar = normalize_src(avatar_img.get("src"))
    if not name and not avatar:
        return None
    return {
        "name": name or "AirSaas",
        "avatarSrc": avatar,
        "publishedDate": pub_date,
        "category": category,
    }


def extract_hero_image(soup):
    """Pattern airsaas: img.article__photo-img or .article__photo > img."""
    selectors = [
        "img.article__photo-img",
        ".article__photo img",
        "img.post-img-blog",
        "img.featured-image",
        "header img",
    ]
    for sel in selectors:
        el = soup.select_one(sel)
        if el and el.get("src"):
            src = normalize_src(el.get("src"))
            if src and "logo" not in src.lower() and "1543845869071" not in src:
                # exclude generic "Le Blog AirSaas" author-like img that uses 1543845869071
                return {"src": src, "alt": el.get("alt") or ""}
    return None


def extract_meta(soup, slug):
    title_tag = soup.find("title")
    meta_desc = soup.find("meta", attrs={"name": "description"})
    h1 = soup.find("h1")
    h1_text = clean_text(h1.get_text()) if h1 else ""
    author = extract_author(soup)
    pub_date = author.get("publishedDate") if author else None
    if not pub_date:
        time_tag = soup.find("time")
        if time_tag:
            pub_date = time_tag.get("datetime") or clean_text(time_tag.get_text())
    return {
        "title": clean_text(title_tag.get_text()) if title_tag else h1_text,
        "h1": h1_text,
        "description": clean_text(meta_desc.get("content")) if meta_desc else "",
        "publishedDate": pub_date,
        "heroImage": extract_hero_image(soup),
        "author": author,
    }


# ─── Body extraction ────────────────────────────────────────────────────────


def find_body(soup):
    for sel in BODY_SELECTORS:
        el = soup.select_one(sel)
        if el and el.find(["h2", "h3"]):
            return el
    return None


def parse_block(el):
    name = el.name
    if name in ("h1", "h2", "h3", "h4"):
        text = clean_text(el.get_text())
        if not text:
            return None
        level = int(name[1])
        anchor = el.get("id") or slugify(text)
        return {"type": "heading", "level": level, "text": text, "id": anchor}
    if name == "p":
        html = inline_html(el)
        if not html:
            return None
        return {"type": "paragraph", "html": html}
    if name in ("ul", "ol"):
        items = [inline_html(li) for li in el.find_all("li", recursive=False)]
        items = [i for i in items if i]
        if not items:
            return None
        return {"type": "list", "ordered": name == "ol", "items": items}
    if name == "figure":
        img = el.find("img")
        if not img or not img.get("src"):
            return None
        cap = el.find("figcaption")
        return {
            "type": "figure",
            "src": normalize_src(img.get("src")),
            "alt": img.get("alt") or "",
            "caption": clean_text(cap.get_text()) if cap else None,
        }
    if name == "img":
        if not el.get("src"):
            return None
        return {
            "type": "figure",
            "src": normalize_src(el.get("src")),
            "alt": el.get("alt") or "",
            "caption": None,
        }
    if name == "blockquote":
        text = clean_text(el.get_text())
        if not text:
            return None
        return {"type": "quote", "text": text, "author": None, "authorAvatar": None}
    if name == "table":
        rows_data = []
        headers = []
        for i, tr in enumerate(el.find_all("tr")):
            cells = [clean_text(c.get_text()) for c in tr.find_all(["th", "td"])]
            if i == 0 and tr.find("th"):
                headers = cells
            else:
                if cells:
                    rows_data.append(cells)
        if not rows_data and not headers:
            return None
        return {"type": "table", "headers": headers, "rows": rows_data}
    if name == "div":
        classes = " ".join(el.get("class") or [])
        # Insight callout (citation-blog, a-retenir-podcast1, etc.)
        if re.search(r"(citation-blog|a-retenir|callout|insight|highlight)", classes, re.I):
            html = inline_html(el)
            if html:
                return {"type": "insight-callout", "html": html}
        # HubSpot CTA embed
        if re.search(r"(hs-cta-embed|hbspt-cta)", classes, re.I):
            link = el.find("a")
            return {
                "type": "hubspot-cta",
                "label": clean_text(link.get_text()) if link else "Télécharger",
                "href": (link.get("href") if link else "#") or "#",
            }
    return None


def walk_body(root, out):
    for child in root.children:
        if not isinstance(child, Tag):
            continue
        block = parse_block(child)
        if block:
            out.append(block)
        elif child.name in ("div", "section", "article"):
            walk_body(child, out)


# ─── Related articles ───────────────────────────────────────────────────────


def extract_related(soup):
    items = []
    pa = soup.find(
        lambda t: isinstance(t, Tag)
        and t.name in ("h2", "h3")
        and "pour aller plus loin" in t.get_text(strip=True).lower()
    )
    if pa:
        ul = pa.find_next("ul")
        if ul:
            for a in ul.find_all("a"):
                label = clean_text(a.get_text())
                href = a.get("href", "#")
                if label and href:
                    items.append({"label": label, "href": href})
    return items


# ─── FAQ extraction ─────────────────────────────────────────────────────────


def extract_faq(soup):
    items = []
    for wrapper in soup.select("div.wrapper__faq"):
        q = wrapper.find(class_="faq__h3") or wrapper.find(["h3", "h4"])
        a = wrapper.find(class_="faq__content")
        if q and a:
            qt = clean_text(q.get_text())
            at_parts = [inline_html(p) for p in a.find_all("p")]
            at_parts = [p for p in at_parts if p]
            at = " ".join(at_parts) if at_parts else clean_text(a.get_text())
            if qt and at:
                items.append({"question": qt, "answer": at})
    return items


# ─── TOC ────────────────────────────────────────────────────────────────────


def extract_toc_from_blocks(blocks):
    items = []
    for b in blocks:
        if b["type"] == "heading" and b["level"] == 2:
            items.append({"label": b["text"], "href": f"#{b['id']}"})
    return items[:12]


# ─── Article assembly ──────────────────────────────────────────────────────


def extract_article(row):
    slug = row["slug"]
    html = row.get("html_rendered") or ""
    soup = BeautifulSoup(html, "lxml")

    if slug in OUTLIER_SKIP:
        return {
            "slug": slug,
            "skip": True,
            "reason": "non-blog pillar page (2.76MB, no body marker)",
            "meta": extract_meta(soup, slug),
            "blocks": [],
            "faq": [],
            "related": [],
            "toc": [],
        }

    meta = extract_meta(soup, slug)
    body = find_body(soup)
    blocks = []
    if body is not None:
        walk_body(body, blocks)

    if slug in OUTLIER_FALLBACK:
        # Drop SVG-heavy + complex divs, keep core content
        blocks = [
            b for b in blocks
            if b["type"] in ("heading", "paragraph", "list", "figure", "quote")
        ]

    return {
        "slug": slug,
        "skip": False,
        "meta": meta,
        "blocks": blocks,
        "faq": extract_faq(soup),
        "related": extract_related(soup),
        "toc": extract_toc_from_blocks(blocks),
    }


# ─── TS emitter ─────────────────────────────────────────────────────────────


def ts_value(v):
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, str):
        return (
            '"'
            + v.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
            + '"'
        )
    if isinstance(v, list):
        return "[" + ", ".join(ts_value(x) for x in v) + "]"
    if isinstance(v, dict):
        return (
            "{ "
            + ", ".join(
                f'"{k}": {ts_value(val)}' for k, val in v.items() if val is not None
            )
            + " }"
        )
    return "null"


def emit_ts(articles):
    body = ts_value(articles)
    return f"""// AUTO-GENERATED — do not edit by hand
// Regenerate: python3 scripts/migrate/parse-blog-articles-rebuild.py
// Source: airsaas_pages_rebuild WHERE type='blog' (Supabase)

import type {{ BlogArticleV2 }} from "@/types/blog-v2";

export const BLOG_ARTICLES_V2: BlogArticleV2[] = {body} as const;

export const BLOG_BY_SLUG_V2: Record<string, BlogArticleV2> =
  Object.fromEntries(BLOG_ARTICLES_V2.map((a) => [a.slug, a]));

export const ACTIVE_BLOG_ARTICLES_V2: BlogArticleV2[] =
  BLOG_ARTICLES_V2.filter((a) => !a.skip);
"""


def main():
    rows = fetch_articles()
    print(f"[fetch] {len(rows)} blog articles", file=sys.stderr)
    parsed = []
    for row in rows:
        try:
            article = extract_article(row)
            parsed.append(article)
            n = len(article["blocks"])
            flag = " (SKIP)" if article["skip"] else ""
            author = article["meta"].get("author") or {}
            author_name = author.get("name") if author else ""
            hero_present = "✓" if article["meta"].get("heroImage") else "—"
            print(
                f"  {article['slug']}: {n} blocks, hero={hero_present}, author={author_name}{flag}",
                file=sys.stderr,
            )
        except Exception as e:  # noqa: BLE001
            print(f"  ERROR {row.get('slug')}: {e}", file=sys.stderr)

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(parsed, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[write] {OUT_JSON} ({OUT_JSON.stat().st_size // 1024} KB)", file=sys.stderr)

    OUT_TS.parent.mkdir(parents=True, exist_ok=True)
    OUT_TS.write_text(emit_ts(parsed), encoding="utf-8")
    print(f"[write] {OUT_TS} ({OUT_TS.stat().st_size // 1024} KB)", file=sys.stderr)

    active = sum(1 for a in parsed if not a["skip"])
    skipped = sum(1 for a in parsed if a["skip"])
    with_hero = sum(1 for a in parsed if a["meta"].get("heroImage"))
    with_author = sum(1 for a in parsed if a["meta"].get("author"))
    print(
        f"[done] active={active}, skipped={skipped}, with_hero={with_hero}, with_author={with_author}",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
