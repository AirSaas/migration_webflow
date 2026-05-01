#!/usr/bin/env python3
"""
Extract hero + section images from Webflow landing pages.

Usage: python3 scripts/migrate/parse-landings.py

Fetches types 'produit', 'solution', 'equipe' from Supabase,
parses HTML to extract image URLs in order (hero first, then section images),
and writes `docs/raw/landings-images.json`:

  {
    "produit": {
      "budget": {
        "hero": "https://...",
        "sections": ["https://...", "https://..."]
      },
      ...
    },
    ...
  }
"""

import json
import sys
import urllib.request
from pathlib import Path
from bs4 import BeautifulSoup

SUPABASE_URL = "https://ydudpmtbnvpxxenbnvab.supabase.co"
SUPABASE_ANON_KEY = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
    "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkdWRwbXRibnZweHhlbmJudmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3ODgzMDEsImV4cCI6MjA4NTM2NDMwMX0."
    "62_iMmq47ZUCLraNvMjW5qhT_hH6pfSfxBZH0y8mMfQ"
)

REPO_ROOT = Path(__file__).resolve().parents[2]
OUT_JSON = REPO_ROOT / "docs" / "raw" / "landings-images.json"

TYPES = ["produit", "solution", "equipe"]


def fetch_landings(page_type):
    url = (
        f"{SUPABASE_URL}/rest/v1/webflow_pages"
        f"?type=eq.{page_type}&order=slug.asc"
        f"&select=slug,html_content,main_image_url,meta_title"
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
        return json.loads(resp.read().decode("utf-8"))


def normalize(url):
    if not url:
        return None
    if url.startswith("//"):
        return "https:" + url
    return url


def extract_images(html):
    """Extract hero + section images in visual order.

    Strategy:
      - Hero image: first <img> inside .hero__container-diapo or similar hero block
      - Section images: <img> in .container__features__img, .section feature blocks
    Returns { hero: str | None, sections: list[str] }
    """
    soup = BeautifulSoup(html or "", "lxml")

    # Hero: look for first big mockup image
    hero_image = None
    hero_selectors = [
        "div.hero-solution__container-screen img",
        "div.container__mockup__hero img",
        "div.hero__screen img",
        "section.hero img",
    ]
    for sel in hero_selectors:
        el = soup.select_one(sel)
        if el and el.get("src"):
            hero_image = normalize(el["src"])
            break

    # Section images
    section_imgs = []
    seen = set()
    section_selectors = [
        "div.container__features__img img",
        "div.features__img img",
        "section.section img",
    ]
    for sel in section_selectors:
        for el in soup.select(sel):
            src = el.get("src")
            if not src:
                continue
            src = normalize(src)
            if src in seen:
                continue
            # Skip the hero
            if src == hero_image:
                continue
            # Skip SVG icons / small decorative assets
            if "icon" in (src or "").lower() and src.endswith(".svg"):
                continue
            seen.add(src)
            section_imgs.append(src)

    return {"hero": hero_image, "sections": section_imgs}


def main():
    result = {}
    for t in TYPES:
        print(f"[fetch] type={t}", file=sys.stderr)
        rows = fetch_landings(t)
        result[t] = {}
        for row in rows:
            slug = row["slug"]
            html = row.get("html_content")
            if not html:
                result[t][slug] = {"hero": normalize(row.get("main_image_url")), "sections": []}
                print(f"  {slug}: NO HTML (main_image_url only)", file=sys.stderr)
                continue
            imgs = extract_images(html)
            # Fallback to main_image_url if no hero found
            if not imgs["hero"]:
                imgs["hero"] = normalize(row.get("main_image_url"))
            result[t][slug] = imgs
            print(
                f"  {slug}: hero={'✓' if imgs['hero'] else '✗'} sections={len(imgs['sections'])}",
                file=sys.stderr,
            )

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[write] {OUT_JSON} ({OUT_JSON.stat().st_size // 1024} KB)", file=sys.stderr)


if __name__ == "__main__":
    main()
