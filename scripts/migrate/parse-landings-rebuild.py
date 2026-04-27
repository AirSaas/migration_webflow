#!/usr/bin/env python3
"""
Parse landings (lp/produit/solution/equipe) from airsaas_pages_rebuild
into typed LandingPage[] data files.

Usage: python3 scripts/migrate/parse-landings-rebuild.py

Reads:  Supabase airsaas_pages_rebuild WHERE type IN ('lp','produit','solution','equipe')
Writes: src/data/landings-v2/{lp,produit,solutions,equipes}.ts
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
OUT_DIR = REPO_ROOT / "src" / "data" / "landings-v2"

# ─── Fetch ───────────────────────────────────────────────────────────────────


def fetch_pages(page_type: str) -> list:
    url = (
        f"{SUPABASE_URL}/rest/v1/airsaas_pages_rebuild"
        f"?type=eq.{page_type}&scrape_status=eq.ok&order=slug.asc"
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


# ─── Helpers ─────────────────────────────────────────────────────────────────


def clean_text(s: str) -> str:
    return re.sub(r"\s+", " ", unescape(s or "")).strip()


def inline_html(tag: Tag) -> str:
    """Serialize inline content with <strong>, <em>, <a>, <br>, <strong> preserved."""
    parts = []
    for child in tag.children:
        if isinstance(child, NavigableString):
            parts.append(unescape(str(child)))
        elif isinstance(child, Tag):
            name = child.name
            if name in ("strong", "b"):
                parts.append(f"<strong>{inline_html(child)}</strong>")
            elif name in ("em", "i"):
                parts.append(f"<em>{inline_html(child)}</em>")
            elif name == "a":
                href = child.get("href", "#")
                parts.append(f'<a href="{href}">{inline_html(child)}</a>')
            elif name == "br":
                parts.append("<br/>")
            else:
                parts.append(inline_html(child))
    return re.sub(r"\s+", " ", "".join(parts)).strip()


def normalize_src(src):
    if not src:
        return None
    if src.startswith("//"):
        return "https:" + src
    return src


def has_class(tag: Tag, cls_substring: str) -> bool:
    if not tag or not tag.attrs:
        return False
    classes = tag.get("class") or []
    classes_str = " ".join(classes) if isinstance(classes, list) else classes
    return cls_substring in classes_str


def first_img(scope: Tag):
    img = scope.find("img") if scope else None
    if not img:
        return (None, None)
    return (normalize_src(img.get("src")), img.get("alt") or "")


# ─── Section extractors ──────────────────────────────────────────────────────


def extract_meta(soup: BeautifulSoup):
    title_tag = soup.find("title")
    title = clean_text(title_tag.get_text()) if title_tag else ""
    meta_desc = soup.find("meta", attrs={"name": "description"})
    description = (meta_desc.get("content") or "") if meta_desc else ""
    og = soup.find("meta", attrs={"property": "og:image"})
    og_image = og.get("content") if og else None
    return {
        "title": clean_text(title),
        "description": clean_text(description),
        "ogImage": normalize_src(og_image),
    }


def extract_hero(soup: BeautifulSoup):
    hero = soup.select_one("section.hero, div.hero, section.hero__home, div.hero__home")
    if not hero:
        return None
    h1 = hero.find("h1")
    # Use the full clean text as title — splitting strong/em is fragile
    # Use plain get_text (no separator). separator=" " introduced regressions
    # like "L'outil" → "L' outil" when <em>/<strong> wrap fragments mid-word.
    # Accept that some Webflow source HTML has concat artifacts (rare).
    raw_title = h1.get_text() if h1 else ""
    # Strip " - AirSaas" / "| AirSaas" suffixes that come from CMS <title> tags
    # leaking into H1.
    raw_title = re.sub(r"\s*[-|]\s*AirSaas\s*$", "", raw_title, flags=re.IGNORECASE)
    title_full = clean_text(raw_title)

    # subtitle: plain text only (Hero renders as Text without dangerouslySetInnerHTML,
    # so any <br/>/<strong> would be displayed as literal text).
    subtitle_tag = hero.find("p")
    subtitle = clean_text(subtitle_tag.get_text()) if subtitle_tag else ""

    # CTAs
    primary, secondary = None, None
    for btn in hero.find_all("a", class_=lambda c: c and ("button" in str(c) or "w-button" in str(c))):
        label = clean_text(btn.get_text())
        href = btn.get("href", "#")
        if not label:
            continue
        if primary is None:
            primary = {"label": label, "href": href}
        elif secondary is None:
            secondary = {"label": label, "href": href}

    # Hero image: skip generic decorative SVGs / icons. Only keep real
    # product mockups / hero illustrations.
    img_src, img_alt = None, ""
    DECORATIVE_PATTERNS = [
        "check-circle", "ellipse", "decoration", "arrow", "arrow_down",
        "/icon-", "/icon_", "_icon.", "icon-portfolio", "icon-feature",
        "/svg/", "_logo.", "-logo.", "logo_", "ovh.svg", "iso27001",
        "scaleway",
    ]
    for img in hero.find_all("img"):
        src = normalize_src(img.get("src"))
        if not src:
            continue
        src_lower = src.lower()
        # Skip decorative SVGs (icons, arrows, logos, badges)
        if any(p in src_lower for p in DECORATIVE_PATTERNS):
            continue
        # Skip standalone .svg unless its filename suggests a real illustration
        if src_lower.endswith(".svg") and not any(
            keyword in src_lower
            for keyword in ["mockup", "screen", "dashboard", "illustration", "hero"]
        ):
            continue
        img_src, img_alt = src, img.get("alt") or ""
        break

    return {
        "type": "hero",
        "title": title_full,
        "subtitle": subtitle or None,
        "primaryCta": primary,
        "secondaryCta": secondary,
        "imageSrc": img_src,
        "imageAlt": img_alt,
    }


def extract_feature_splits(soup: BeautifulSoup):
    """Extract `.container__features__section` blocks (split text + image)."""
    out = []
    for section in soup.select("div.container__features__section"):
        is_left = "left" in (section.get("class") or [])
        text_block = section.select_one("div.container__features__text")
        img_block = section.select_one("div.container__features__img")
        if not text_block:
            continue
        h = text_block.find(["h2", "h3"])
        if not h:
            continue
        # Use FULL title — splitting on <strong> produced fragmented/reversed titles
        title_full = clean_text(h.get_text())
        # Body paragraphs + bullets — bullets become H3 sub-features in render,
        # so verifier picks them up.
        body_parts = []
        bullets = []
        seen_p = set()
        for child in text_block.find_all(recursive=False):
            if child is h:
                continue
            if child.name == "p":
                html = inline_html(child)
                if html and html not in seen_p:
                    body_parts.append(html)
                    seen_p.add(html)
            elif child.name in ("ul", "ol"):
                for li in child.find_all("li", recursive=False):
                    bullet_html = inline_html(li)
                    if bullet_html:
                        bullets.append(bullet_html)
        body = " ".join(body_parts)
        img_src, img_alt = first_img(img_block) if img_block else (None, "")
        out.append(
            {
                "type": "feature-split",
                "reversed": is_left,
                "title": title_full,
                "body": body,
                "bullets": bullets if bullets else None,
                "imageSrc": img_src,
                "imageAlt": img_alt or "",
            }
        )
    return out


def extract_intros(soup: BeautifulSoup, taken_sections: set):
    """`.section__feature` text-only sections — emits one section per heading
    found inside. Each H2 → "intro" section. H3 / H4 found AFTER an H2 inside
    the same block become standalone "sub-heading" sections so they show up
    in the rendered DOM as <Heading level=3> (verifier picks them up)."""
    out = []
    for sect in soup.select("section.section__feature, div.section__feature"):
        if id(sect) in taken_sections:
            continue
        if sect.find(class_="wrapper__faq") or sect.find_parent(class_="wrapper__faq"):
            continue
        # Walk children in DOM order, splitting into intro blocks per heading
        title_text = None
        current_body_parts = []
        sub_headings = []
        emitted = False
        for el in sect.find_all(["h2", "h3", "h4", "p", "ul", "ol"], recursive=True):
            # Skip if nested in FAQ
            if el.find_parent(class_="wrapper__faq"):
                continue
            tag = el.name
            text = clean_text(el.get_text())
            if not text:
                continue
            if tag == "h2":
                # Flush previous block as intro
                if title_text is not None or current_body_parts:
                    body = "".join(current_body_parts)
                    if "fréquente" not in (title_text or "").lower():
                        out.append({
                            "type": "intro",
                            "title": title_text,
                            "body": body or None,
                        })
                        emitted = True
                title_text = text
                current_body_parts = []
            elif tag in ("h3", "h4"):
                # Flush current text first, then add a sub-heading section
                if title_text is not None or current_body_parts:
                    body = "".join(current_body_parts)
                    if "fréquente" not in (title_text or "").lower():
                        out.append({
                            "type": "intro",
                            "title": title_text,
                            "body": body or None,
                        })
                        emitted = True
                    title_text = None
                    current_body_parts = []
                sub_headings.append(text)
                out.append({
                    "type": "intro",
                    "title": text,
                    "body": None,
                    "headingLevel": 3,
                })
                emitted = True
            elif tag == "p":
                html = inline_html(el)
                if html:
                    current_body_parts.append(f"<p>{html}</p>")
            elif tag in ("ul", "ol"):
                items_html = []
                for li in el.find_all("li", recursive=False):
                    li_html = inline_html(li)
                    if li_html:
                        items_html.append(f"<li>{li_html}</li>")
                if items_html:
                    current_body_parts.append(
                        f"<{tag}>{''.join(items_html)}</{tag}>"
                    )
        # Flush final block
        if title_text is not None or current_body_parts:
            body = "".join(current_body_parts)
            if "fréquente" not in (title_text or "").lower():
                # Skip emitting intro with just a title and no body (looks like
                # a stub/orphan heading on the page). Sub-headings (level=3)
                # are exempt — they're intentionally compact.
                if title_text and not body and "level" not in (title_text or ""):
                    pass
                else:
                    out.append({
                        "type": "intro",
                        "title": title_text,
                        "body": body or None,
                    })
                    emitted = True
        # Filter out truly empty intros from `out` (defensive — mostly already done above)
        if emitted:
            taken_sections.add(id(sect))
    # Final sweep: drop intros where both title and body are missing/empty
    return [o for o in out if (o.get("title") or o.get("body"))]


def extract_faq(soup: BeautifulSoup):
    """FAQ accordion block."""
    items = []
    for wrapper in soup.select("div.wrapper__faq"):
        question_tag = wrapper.find(class_="faq__h3") or wrapper.find(["h3", "h4"])
        answer_tag = wrapper.find(class_="faq__content")
        if question_tag and answer_tag:
            q = clean_text(question_tag.get_text())
            # FaqFrame renders answers as plain text (<p>{answer}</p>) so we
            # strip HTML and join paragraphs with double newline → readable.
            answer_paragraphs = []
            for p in answer_tag.find_all("p"):
                t = clean_text(p.get_text())
                if t:
                    answer_paragraphs.append(t)
            if not answer_paragraphs:
                answer_paragraphs.append(clean_text(answer_tag.get_text()))
            a = " ".join(answer_paragraphs)
            if q and a:
                items.append({"question": q, "answer": a})
    if not items:
        return None
    return {"type": "faq", "title": "Questions", "titleHighlight": "fréquentes", "items": items}


def extract_testimonials(soup: BeautifulSoup):
    """LinkedIn-style testimonials cards."""
    items = []
    for card in soup.select(
        "div.block__testimonial__home, div.testimonial-card-link, a.testimonial__link"
    ):
        text_tag = card.find(class_="block__data__testimonial") or card.find("p")
        text = clean_text(text_tag.get_text()) if text_tag else ""
        author_tag = card.find(class_="author__testimonial__home")
        name = ""
        role = ""
        if author_tag:
            sub = author_tag.find_all(["h4", "h5", "p", "div"], limit=2)
            if sub:
                name = clean_text(sub[0].get_text())
                if len(sub) > 1:
                    role = clean_text(sub[1].get_text())
        avatar_src, _ = first_img(card)
        # Extract href: card itself is <a> (testimonial__link) OR find inner <a>
        href = None
        if card.name == "a":
            href = card.get("href")
        else:
            inner_a = card.find("a", href=True)
            if inner_a:
                href = inner_a.get("href")
        if text and name:
            items.append(
                {
                    "text": text,
                    "name": name,
                    "role": role or None,
                    "avatarSrc": avatar_src,
                    "href": href,
                }
            )
    if len(items) < 1:
        return None
    return {"type": "testimonials", "title": "Témoignages", "testimonials": items[:6]}


def extract_logos(soup: BeautifulSoup):
    """Customer logo bar."""
    logos = []
    for img in soup.select("img.logo_customer"):
        src = normalize_src(img.get("src"))
        alt = img.get("alt") or ""
        if src:
            logos.append({"src": src, "alt": alt})
    seen = set()
    unique_logos = []
    for l in logos:
        if l["src"] not in seen:
            seen.add(l["src"])
            unique_logos.append(l)
    if len(unique_logos) < 3:
        return None
    return {
        "type": "logo-bar",
        "title": "Ils nous font confiance",
        "variant": "client",
        "logos": unique_logos[:12],
    }


def extract_press_logos(soup: BeautifulSoup):
    logos = []
    for img in soup.select("img.press__logo"):
        src = normalize_src(img.get("src"))
        alt = img.get("alt") or ""
        if src:
            logos.append({"src": src, "alt": alt})
    if len(logos) < 2:
        return None
    return {
        "type": "logo-bar",
        "title": "Ils parlent de nous",
        "variant": "press",
        "logos": logos[:8],
    }


def extract_cta_section(soup: BeautifulSoup):
    """Section with .section--call class — closing CTA."""
    section = soup.select_one("section.section--call, div.section--call")
    if not section:
        return None
    h = section.find(["h2", "h3"])
    p = section.find("p")
    btn = section.find("a", class_=lambda c: c and "button" in str(c))
    title = clean_text(h.get_text()) if h else "Prêt à passer à l'action ?"
    subtitle = inline_html(p) if p else None
    label = clean_text(btn.get_text()) if btn else "Réserver une démo"
    href = btn.get("href") if btn else "/fr/meetings-pages"
    return {
        "type": "cta",
        "title": title,
        "subtitle": subtitle,
        "ctaLabel": label,
        "ctaHref": href,
    }


# ─── Page builder ─────────────────────────────────────────────────────────────


def parse_page(row: dict, page_type: str) -> dict:
    slug = row["slug"]
    html = row.get("html_rendered") or ""
    soup = BeautifulSoup(html, "lxml")

    meta = extract_meta(soup)
    sections: list = []

    hero = extract_hero(soup)
    if hero:
        sections.append(hero)

    # Logos (after hero, before features typically)
    logos = extract_logos(soup)
    if logos:
        sections.append(logos)

    press = extract_press_logos(soup)
    if press:
        sections.append(press)

    # Mixed: intros + feature splits in DOM order
    taken = set()
    intros = extract_intros(soup, taken)
    splits = extract_feature_splits(soup)
    sections.extend(intros)
    sections.extend(splits)

    testimonials = extract_testimonials(soup)
    if testimonials:
        sections.append(testimonials)

    cta = extract_cta_section(soup)
    if cta:
        sections.append(cta)

    faq = extract_faq(soup)
    if faq:
        sections.append(faq)

    return {"slug": slug, "type": page_type, "meta": meta, "sections": sections}


# ─── TS emitter ──────────────────────────────────────────────────────────────


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
        parts = []
        for k, val in v.items():
            if val is None:
                continue
            parts.append(f'"{k}": {ts_value(val)}')
        return "{ " + ", ".join(parts) + " }"
    return "null"


def emit_ts_file(pages: list, type_label: str) -> str:
    body = ts_value(pages)
    return f"""// AUTO-GENERATED — do not edit by hand
// Regenerate: python3 scripts/migrate/parse-landings-rebuild.py
// Source: airsaas_pages_rebuild WHERE type='{type_label}' (Supabase)

import type {{ LandingPage }} from "@/types/landing";

export const PAGES: LandingPage[] = {body} as const;

export const PAGES_BY_SLUG: Record<string, LandingPage> =
  Object.fromEntries(PAGES.map((p) => [p.slug, p]));
"""


# ─── Main ─────────────────────────────────────────────────────────────────────


TYPE_FILE_NAMES = {
    "lp": "lp.ts",
    "produit": "produit.ts",
    "solution": "solutions.ts",
    "equipe": "equipes.ts",
}


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for type_label in ("lp", "produit", "solution", "equipe"):
        rows = fetch_pages(type_label)
        print(f"[fetch] {type_label}: {len(rows)} rows", file=sys.stderr)
        parsed = []
        for row in rows:
            try:
                p = parse_page(row, type_label)
                parsed.append(p)
                print(
                    f"  {p['slug']}: {len(p['sections'])} sections",
                    file=sys.stderr,
                )
            except Exception as e:  # noqa: BLE001
                print(f"  ERROR {row.get('slug')}: {e}", file=sys.stderr)
        out_path = OUT_DIR / TYPE_FILE_NAMES[type_label]
        out_path.write_text(emit_ts_file(parsed, type_label), encoding="utf-8")
        size_kb = out_path.stat().st_size // 1024
        print(f"[write] {out_path.name} ({size_kb} KB)", file=sys.stderr)


if __name__ == "__main__":
    main()
