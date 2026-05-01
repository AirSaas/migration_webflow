#!/usr/bin/env python3
"""
Parse 63 blog articles from Supabase Webflow dump → typed TSX data file.

Usage: python3 scripts/migrate/parse-blog-articles.py

Input:  Fetches from Supabase REST API (webflow_pages type='blog')
Output: src/data/blog-articles.ts   — typed BlogArticle[] array
        docs/raw/blog-articles-content.json — raw parsed blocks (for debug)

Outliers handling:
  - portfolio-management     → skip=True (not a blog, 2.76MB, no standard body)
  - plan-de-communication-projet → fallback mode (text + images, skip SVG infographic)
  - duplicates (triplet + pair) → build all (canonical decision is content-side)
"""

import json
import re
import sys
import urllib.request
from pathlib import Path
from html import unescape
from bs4 import BeautifulSoup, NavigableString, Tag

# ─── Config ──────────────────────────────────────────────────────────────────

SUPABASE_URL = "https://ydudpmtbnvpxxenbnvab.supabase.co"
SUPABASE_ANON_KEY = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
    "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkdWRwbXRibnZweHhlbmJudmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3ODgzMDEsImV4cCI6MjA4NTM2NDMwMX0."
    "62_iMmq47ZUCLraNvMjW5qhT_hH6pfSfxBZH0y8mMfQ"
)

REPO_ROOT = Path(__file__).resolve().parents[2]
OUT_JSON = REPO_ROOT / "docs" / "raw" / "blog-articles-content.json"
OUT_TS = REPO_ROOT / "src" / "data" / "blog-articles.ts"

OUTLIER_SKIP = {"portfolio-management"}
OUTLIER_FALLBACK = {"plan-de-communication-projet"}

# Pattern used in the Webflow markup to locate the article body.
BODY_SELECTORS = [
    "div.container__article__integrations__text",
    "div.blog-post-body",
    "div.rich-text",
    "div.post-body",
]

# ─── Fetch ──────────────────────────────────────────────────────────────────


def fetch_articles():
    """Fetch all 63 blog rows from Supabase REST API."""
    # PostgREST uses offset/limit; fetch in batches of 10 to avoid huge responses.
    articles = []
    for offset in range(0, 70, 10):
        url = (
            f"{SUPABASE_URL}/rest/v1/webflow_pages"
            f"?type=eq.blog&order=slug.asc&limit=10&offset={offset}"
            f"&select=slug,full_url,html_content,text_content,meta_title,"
            f"meta_description,published_date,language,main_image_url"
        )
        req = urllib.request.Request(
            url,
            headers={
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
                "Accept": "application/json",
            },
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            batch = json.loads(resp.read().decode("utf-8"))
        if not batch:
            break
        articles.extend(batch)
        print(f"  fetched {len(articles)} articles so far…", file=sys.stderr)
    print(f"[fetch] total = {len(articles)}", file=sys.stderr)
    return articles


# ─── Helpers ─────────────────────────────────────────────────────────────────


def clean_text(s: str) -> str:
    """Collapse whitespace, strip."""
    return re.sub(r"\s+", " ", unescape(s or "")).strip()


def slugify_id(text: str) -> str:
    text = re.sub(r"[^\w\s-]", "", text.lower())
    text = re.sub(r"\s+", "-", text).strip("-")
    return text[:80] or "section"


def find_body(soup: BeautifulSoup) -> Tag | None:
    for sel in BODY_SELECTORS:
        el = soup.select_one(sel)
        if el:
            return el
    # fallback: largest <div> with h2 inside
    candidates = [d for d in soup.find_all("div") if d.find("h2")]
    if candidates:
        return max(candidates, key=lambda d: len(d.get_text()))
    return None


def is_inline_cta(a: Tag) -> bool:
    classes = a.get("class") or []
    return any("button" in c or "cta" in c for c in classes)


def get_inline_html(tag: Tag) -> str:
    """Serialize inline content of a tag with <strong>, <em>, <a> preserved."""
    parts = []
    for child in tag.children:
        if isinstance(child, NavigableString):
            parts.append(unescape(str(child)))
        elif isinstance(child, Tag):
            name = child.name
            if name in ("strong", "b"):
                parts.append(f"<strong>{get_inline_html(child)}</strong>")
            elif name in ("em", "i"):
                parts.append(f"<em>{get_inline_html(child)}</em>")
            elif name == "a":
                href = child.get("href", "#")
                target = child.get("target")
                parts.append(
                    f'<a href="{href}"'
                    + (f' target="{target}"' if target else "")
                    + f">{get_inline_html(child)}</a>"
                )
            elif name == "br":
                parts.append("<br />")
            else:
                parts.append(get_inline_html(child))
    return "".join(parts).strip()


def normalize_src(src: str) -> str:
    if not src:
        return ""
    if src.startswith("//"):
        return "https:" + src
    return src


# ─── Block parsing ───────────────────────────────────────────────────────────


def parse_heading(el: Tag) -> dict:
    level = int(el.name[1])  # h2 → 2
    text = clean_text(el.get_text())
    anchor_id = el.get("id") or slugify_id(text)
    return {"type": "heading", "level": level, "text": text, "id": anchor_id}


def parse_paragraph(el: Tag) -> dict | None:
    html = get_inline_html(el)
    if not html:
        return None
    return {"type": "paragraph", "html": html}


def parse_list(el: Tag) -> dict | None:
    items = []
    for li in el.find_all("li", recursive=False):
        html = get_inline_html(li)
        if html:
            items.append(html)
    if not items:
        return None
    return {"type": "list", "ordered": el.name == "ol", "items": items}


def parse_figure(el: Tag) -> dict | None:
    img = el.find("img")
    if not img:
        return None
    caption_el = el.find("figcaption")
    caption = clean_text(caption_el.get_text()) if caption_el else None
    return {
        "type": "figure",
        "src": normalize_src(img.get("src", "")),
        "alt": img.get("alt", "") or "",
        "caption": caption,
    }


def parse_quote(el: Tag) -> dict | None:
    # Extract text + optional author
    author_el = el.find(class_=re.compile(r"(author|cite|attrib)", re.I))
    author = clean_text(author_el.get_text()) if author_el else None
    if author_el:
        author_el.extract()
    text = clean_text(el.get_text())
    if not text:
        return None
    avatar_img = el.find("img")
    return {
        "type": "quote",
        "text": text,
        "author": author,
        "authorAvatar": normalize_src(avatar_img.get("src", "")) if avatar_img else None,
    }


def parse_table(el: Tag) -> dict | None:
    rows = el.find_all("tr")
    if not rows:
        return None
    headers = []
    body_rows = []
    for i, tr in enumerate(rows):
        cells = tr.find_all(["th", "td"])
        texts = [clean_text(c.get_text()) for c in cells]
        if i == 0 and tr.find("th"):
            headers = texts
        else:
            if texts:
                body_rows.append(texts)
    if not body_rows and not headers:
        return None
    return {"type": "table", "headers": headers, "rows": body_rows}


def parse_hubspot_cta(el: Tag) -> dict | None:
    """Detect HubSpot CTA embed. Fallback: use <a> inside as link label+href."""
    classes = " ".join(el.get("class") or [])
    if "hs-cta-embed" in classes or "hbspt-cta" in classes:
        link = el.find("a")
        label = clean_text(link.get_text()) if link else "Télécharger"
        href = link.get("href") if link else "#"
        return {"type": "hubspot-cta", "label": label, "href": href}
    return None


def parse_insight_callout(el: Tag) -> dict | None:
    """Detect 'à retenir / podcast1' or similar callout blocks."""
    classes = " ".join(el.get("class") or [])
    if re.search(r"(retenir|podcast|callout|insight|highlight)", classes, re.I):
        html = get_inline_html(el)
        if html:
            return {"type": "insight-callout", "html": html}
    return None


def parse_inline_cta(el: Tag) -> dict | None:
    """Standalone CTA link styled as button."""
    if el.name != "a":
        return None
    if not is_inline_cta(el):
        return None
    label = clean_text(el.get_text())
    href = el.get("href", "#")
    if not label or len(label) > 80:
        return None
    return {"type": "inline-cta", "label": label, "href": href}


# ─── Main block-level dispatcher ─────────────────────────────────────────────


def parse_block(el: Tag) -> dict | None:
    name = el.name
    # HubSpot CTAs and insight callouts need priority before generic <div>
    if name == "div":
        hubspot = parse_hubspot_cta(el)
        if hubspot:
            return hubspot
        callout = parse_insight_callout(el)
        if callout:
            return callout
        # Treat as container — return None and we'll recurse
        return None
    if name in ("h1", "h2", "h3", "h4", "h5", "h6"):
        return parse_heading(el)
    if name == "p":
        return parse_paragraph(el)
    if name in ("ul", "ol"):
        return parse_list(el)
    if name == "figure":
        return parse_figure(el)
    if name == "img":
        return {
            "type": "figure",
            "src": normalize_src(el.get("src", "")),
            "alt": el.get("alt", "") or "",
            "caption": None,
        }
    if name == "blockquote":
        return parse_quote(el)
    if name == "table":
        return parse_table(el)
    if name == "a":
        return parse_inline_cta(el)
    return None


def walk_body(root: Tag, out: list) -> None:
    """Recursive walk collecting block-level elements."""
    for child in root.children:
        if not isinstance(child, Tag):
            continue
        block = parse_block(child)
        if block:
            out.append(block)
        elif child.name in ("div", "section", "article"):
            walk_body(child, out)


# ─── Article processor ──────────────────────────────────────────────────────


def extract_article(row: dict) -> dict:
    slug = row["slug"]
    html = row.get("html_content") or ""
    soup = BeautifulSoup(html, "lxml")

    # Skip outlier
    if slug in OUTLIER_SKIP:
        return {
            "slug": slug,
            "skip": True,
            "reason": "non-blog pillar page (2.76MB, no body marker)",
            "meta": {
                "title": row.get("meta_title") or slug,
                "description": row.get("meta_description") or "",
                "publishedDate": row.get("published_date"),
                "heroImage": row.get("main_image_url"),
                "fullUrl": row.get("full_url"),
            },
            "blocks": [],
        }

    body = find_body(soup)
    blocks = []
    if body is not None:
        walk_body(body, blocks)

    # FAQ detection (simple): look for accordion/faq sections
    faq_root = soup.select_one(
        ".faq, .accordion, .questions-frequentes, "
        "section[id*='faq'], section[id*='question']"
    )
    faq_items = []
    if faq_root:
        for q in faq_root.select("h3, h4, .question, details > summary"):
            answer = q.find_next(["p", "div"])
            question_text = clean_text(q.get_text())
            answer_text = clean_text(answer.get_text()) if answer else ""
            if question_text and answer_text:
                faq_items.append({"question": question_text, "answer": answer_text})

    # "Pour aller plus loin" detection
    related = []
    pa_el = soup.find(
        lambda t: isinstance(t, Tag)
        and t.name in ("h2", "h3")
        and "pour aller plus loin" in t.get_text(strip=True).lower()
    )
    if pa_el:
        nxt = pa_el.find_next("ul")
        if nxt:
            for a in nxt.find_all("a"):
                related.append({
                    "label": clean_text(a.get_text()),
                    "href": a.get("href", "#"),
                })

    # Fallback for infographic outlier
    if slug in OUTLIER_FALLBACK:
        # Strip svg-heavy blocks; keep only paragraph + figure with real src
        blocks = [
            b for b in blocks
            if b["type"] in ("heading", "paragraph", "list", "figure", "quote")
        ]

    return {
        "slug": slug,
        "skip": False,
        "meta": {
            "title": row.get("meta_title") or slug,
            "description": row.get("meta_description") or "",
            "publishedDate": row.get("published_date"),
            "heroImage": normalize_src(row.get("main_image_url") or ""),
            "fullUrl": row.get("full_url"),
        },
        "blocks": blocks,
        "faq": faq_items,
        "related": related,
    }


# ─── TSX generation ──────────────────────────────────────────────────────────


def ts_escape(s: str | None) -> str:
    if s is None:
        return "null"
    return (
        '"'
        + s.replace("\\", "\\\\").replace("`", "\\`").replace('"', '\\"').replace("\n", "\\n")
        + '"'
    )


def emit_ts_value(v):
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, str):
        return ts_escape(v)
    if isinstance(v, list):
        return "[" + ", ".join(emit_ts_value(x) for x in v) + "]"
    if isinstance(v, dict):
        parts = []
        for k, val in v.items():
            # Safe TS key: use quoted string to allow kebab-case/reserved words
            parts.append(f'"{k}": {emit_ts_value(val)}')
        return "{ " + ", ".join(parts) + " }"
    return "null"


def generate_tsx(articles: list) -> str:
    body = emit_ts_value(articles)
    return f"""// AUTO-GENERATED — do not edit by hand
// Source: webflow_pages type='blog' (Supabase ydudpmtbnvpxxenbnvab)
// Regenerate: python3 scripts/migrate/parse-blog-articles.py

import type {{ BlogArticle }} from "@/types/blog";

export const BLOG_ARTICLES: BlogArticle[] = {body} as const;

export const BLOG_ARTICLES_BY_SLUG: Record<string, BlogArticle> =
  Object.fromEntries(BLOG_ARTICLES.map((a) => [a.slug, a]));

export const ACTIVE_BLOG_ARTICLES: BlogArticle[] = BLOG_ARTICLES.filter(
  (a) => !a.skip,
);
"""


# ─── Main ─────────────────────────────────────────────────────────────────────


def main():
    articles_raw = fetch_articles()
    print(f"[parse] processing {len(articles_raw)} articles…", file=sys.stderr)

    parsed = []
    for row in articles_raw:
        try:
            article = extract_article(row)
            parsed.append(article)
            block_count = len(article["blocks"])
            flag = " (SKIP)" if article["skip"] else ""
            print(f"  {article['slug']}: {block_count} blocks{flag}", file=sys.stderr)
        except Exception as e:  # noqa: BLE001
            print(f"  ERROR on {row.get('slug')}: {e}", file=sys.stderr)
            parsed.append({
                "slug": row.get("slug", "unknown"),
                "skip": True,
                "reason": f"parse error: {e}",
                "meta": {"title": row.get("meta_title") or "", "description": ""},
                "blocks": [],
            })

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(parsed, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[write] {OUT_JSON} ({OUT_JSON.stat().st_size // 1024} KB)", file=sys.stderr)

    ts_content = generate_tsx(parsed)
    OUT_TS.parent.mkdir(parents=True, exist_ok=True)
    OUT_TS.write_text(ts_content, encoding="utf-8")
    print(f"[write] {OUT_TS} ({OUT_TS.stat().st_size // 1024} KB)", file=sys.stderr)

    # Summary
    active = sum(1 for a in parsed if not a["skip"])
    skipped = sum(1 for a in parsed if a["skip"])
    total_blocks = sum(len(a["blocks"]) for a in parsed)
    print(f"[done] active={active}, skipped={skipped}, total_blocks={total_blocks}", file=sys.stderr)


if __name__ == "__main__":
    main()
