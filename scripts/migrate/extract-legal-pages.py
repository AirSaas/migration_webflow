#!/usr/bin/env python3
"""
extract-legal-pages.py — One-shot extractor for the 3 live legal pages.

Fetches /fr/legal/cookies, /fr/mentions-legales, /fr/plan-du-site from
airsaas.io live site, isolates the editorial content, strips Webflow CSS
classes, and emits clean HTML strings that can be embedded in Next.js
ProseFrame routes via dangerouslySetInnerHTML.

Output : src/data/legal-pages.ts

Usage : python3 scripts/migrate/extract-legal-pages.py
"""

import re
import urllib.request
from pathlib import Path
from html import unescape
from bs4 import BeautifulSoup, NavigableString, Tag

REPO_ROOT = Path(__file__).resolve().parents[2]
OUT = REPO_ROOT / "src" / "data" / "legal-pages.ts"

PAGES = [
    {
        "slug": "cookies",
        "url": "https://www.airsaas.io/fr/legal/cookies",
        "title": "Politique de cookies",
    },
    {
        "slug": "mentions-legales",
        "url": "https://www.airsaas.io/fr/mentions-legales",
        "title": "Mentions légales",
    },
    {
        "slug": "plan-du-site",
        "url": "https://www.airsaas.io/fr/plan-du-site",
        "title": "Plan du site",
    },
]

ZWSP_RE = re.compile(r"[​‌‍⁠﻿]")


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="replace")


def text_of(tag: Tag) -> str:
    s = tag.get_text(separator=" ")
    s = ZWSP_RE.sub("", s)
    s = re.sub(r"\s+", " ", s).strip()
    # Re-glue French apostrophes (L' outil → L'outil)
    s = re.sub(r"([’'ʼ])\s+(\w)", r"\1\2", s)
    return s


def inline_html(tag: Tag) -> str:
    """Serialize inline content with semantic tags only."""
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
                # Rewrite Webflow-relative absolute links to root paths.
                href = re.sub(r"^https?://(www\.)?airsaas\.io", "", href)
                parts.append(f'<a href="{href}">{inline_html(child)}</a>')
            elif n == "br":
                parts.append("<br/>")
            else:
                parts.append(inline_html(child))
    out = ZWSP_RE.sub("", "".join(parts))
    return re.sub(r"\s+", " ", out).strip()


def slugify(text: str) -> str:
    s = re.sub(r"[^\w\s-]", "", text.lower())
    s = re.sub(r"\s+", "-", s).strip("-")
    return s[:80] or "section"


def render_block(tag: Tag):
    """Convert a content block to a BlogArticleBlock-shaped dict."""
    n = tag.name
    if n in ("h1", "h2", "h3", "h4", "h5", "h6"):
        text = text_of(tag)
        if not text:
            return None
        level = int(n[1])
        return {
            "type": "heading",
            "level": level,
            "text": text,
            "id": slugify(text),
        }
    if n == "p":
        html = inline_html(tag)
        if not html:
            return None
        return {"type": "paragraph", "html": html}
    if n in ("ul", "ol"):
        items = []
        for li in tag.find_all("li", recursive=False):
            li_html = inline_html(li)
            if li_html:
                items.append(li_html)
        if not items:
            return None
        return {"type": "list", "ordered": n == "ol", "items": items}
    if n == "table":
        headers = []
        rows_data = []
        for i, tr in enumerate(tag.find_all("tr")):
            cells = [text_of(c) for c in tr.find_all(["th", "td"])]
            if i == 0 and tr.find("th"):
                headers = cells
            elif cells:
                rows_data.append(cells)
        if not (headers or rows_data):
            return None
        return {"type": "table", "headers": headers, "rows": rows_data}
    return None


SKIP_CLASS_TOKENS = (
    "navbar",
    "nav-link",
    "nav__",
    "footer",
    "btn",
    "button",
    "newsletter",
    "dropdown__",
    "w-nav",
    "w-dropdown",
    "logo_",
    "press__",
    "hero__pill",
    "hero__cta",
    "section--call",
)


def is_in_chrome(el: Tag) -> bool:
    """Element is part of nav/footer chrome, not the editorial body."""
    cur = el
    while cur is not None and isinstance(cur, Tag):
        cls = " ".join(cur.get("class") or []).lower()
        if any(t in cls for t in SKIP_CLASS_TOKENS):
            return True
        cur = cur.parent
    return False


def extract_sitemap(soup: BeautifulSoup):
    """plan-du-site has Webflow-specific `<div class="links_wrapper">` blocks
    holding `<h2>` + flat `<a>` siblings (no <ul>/<li>). Convert each wrapper
    into a heading block + list block with rewritten hrefs."""
    blocks = []
    for wrapper in soup.find_all("div", class_=lambda c: c and "links_wrapper" in " ".join(c if isinstance(c, list) else [c])):
        h2 = wrapper.find("h2")
        if not h2:
            continue
        title = text_of(h2)
        items = []
        for a in wrapper.find_all("a", recursive=False):
            label = text_of(a)
            href = a.get("href", "#")
            href = re.sub(r"^https?://(www\.)?airsaas\.io", "", href)
            href = re.sub(r"^/fr/solution/", "/fr/solutions/", href)
            href = re.sub(r"^/gestion-de-projet/", "/fr/blog/", href)
            href = re.sub(r"^/fr/gestion-de-projet/", "/fr/blog/", href)
            if label and href and href != "#":
                items.append(f'<a href="{href}">{label}</a>')
        if title:
            blocks.append({
                "type": "heading",
                "level": 2,
                "text": title,
                "id": slugify(title),
            })
        if items:
            blocks.append({"type": "list", "ordered": False, "items": items})
    return blocks


def extract_main_content(soup: BeautifulSoup):
    # Strip nav, footer, scripts, styles, svg early
    for sel in ["nav", "footer", "script", "style", "noscript", "svg"]:
        for el in soup.find_all(sel):
            el.decompose()
    body = soup.body
    if body is None:
        return []
    out = []
    seen = set()
    for el in body.find_all(["h1", "h2", "h3", "h4", "p", "ul", "ol", "table"]):
        if el.find_parent(["li", "th", "td"]):
            continue
        if is_in_chrome(el):
            continue
        key = id(el)
        if key in seen:
            continue
        seen.add(key)
        block = render_block(el)
        if block:
            out.append(block)
    return out


def emit_ts(pages_data):
    import json as _json

    lines = [
        "// AUTO-GENERATED — do not edit by hand",
        "// Regenerate: python3 scripts/migrate/extract-legal-pages.py",
        "// Source: airsaas.io live HTML (3 legal pages)",
        "",
        'import type { BlogArticleBlock } from "@/types/blog";',
        "",
        "export interface LegalPage {",
        "  slug: string;",
        "  title: string;",
        "  /** Body content as DS-renderable blocks (heading / paragraph / list / table). */",
        "  blocks: BlogArticleBlock[];",
        "  sourceUrl: string;",
        "}",
        "",
        "export const LEGAL_PAGES: LegalPage[] = [",
    ]
    for p in pages_data:
        lines.append("  {")
        lines.append(f'    slug: "{p["slug"]}",')
        lines.append(f'    title: {_json.dumps(p["title"], ensure_ascii=False)},')
        lines.append(f'    sourceUrl: "{p["url"]}",')
        lines.append(
            f"    blocks: {_json.dumps(p['blocks'], ensure_ascii=False)} as BlogArticleBlock[],"
        )
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append(
        "export const LEGAL_BY_SLUG: Record<string, LegalPage> = "
        "Object.fromEntries(LEGAL_PAGES.map((p) => [p.slug, p]));"
    )
    lines.append("")
    return "\n".join(lines)


def main():
    pages_data = []
    for p in PAGES:
        print(f"[fetch] {p['slug']}: {p['url']}")
        html = fetch(p["url"])
        soup = BeautifulSoup(html, "lxml")
        if p["slug"] == "plan-du-site":
            blocks = extract_sitemap(soup)
        else:
            blocks = extract_main_content(soup)
        # Strip the leading H1 from the body (rendered separately as page title)
        blocks = [b for b in blocks if not (b.get("type") == "heading" and b.get("level") == 1)]
        kinds = {}
        for b in blocks:
            kinds[b["type"]] = kinds.get(b["type"], 0) + 1
        print(f"  blocks: {len(blocks)} ({kinds})")
        pages_data.append({**p, "blocks": blocks})
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(emit_ts(pages_data), encoding="utf-8")
    print(f"[write] {OUT.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
