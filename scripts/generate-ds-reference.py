#!/usr/bin/env python3
"""Extract JSDoc contracts from every DS component + generate a reference doc."""
import re
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parent.parent
UI_DIR = ROOT / "src/components/library-design/ui"
SECTIONS_DIR = ROOT / "src/components/library-design/sections"


def extract_contract(file):  # type: (Path) -> dict
    """Return {purpose, useWhen, dontUse, limits, forbidden, figma} or None."""
    text = file.read_text()
    # Find ANY /** ... */ block that contains @purpose (not necessarily the first)
    body = None
    for m in re.finditer(r"/\*\*\s*\n(?P<body>(?:\s*\*.*\n)*?)\s*\*/", text):
        if "@purpose" in m.group("body"):
            body = m.group("body")
            break
    if body is None:
        return None
    # Normalize: strip leading ` * ` from each line
    lines = [re.sub(r"^\s*\*\s?", "", ln).rstrip() for ln in body.splitlines()]

    result = {
        "component": None,
        "purpose": None,
        "useWhen": None,
        "dontUse": None,
        "limits": [],
        "forbidden": [],
        "figma": None,
    }

    # First non-empty line before @purpose is usually the component name
    for ln in lines:
        if ln.strip() and "@" not in ln:
            result["component"] = ln.strip()
            break

    section = None
    accum: list[str] = []

    def flush():
        nonlocal accum
        if not accum:
            return
        text = " ".join(accum).strip()
        if section in ("purpose", "useWhen", "dontUse", "figma"):
            result[section] = text
        accum = []

    for ln in lines:
        stripped = ln.strip()
        # Detect section
        m = re.match(r"@(\w+)\s*(.*)", stripped)
        if m:
            flush()
            new_section = m.group(1)
            rest = m.group(2).strip()
            if new_section in ("purpose", "useWhen", "dontUse"):
                section = new_section
                accum = [rest] if rest else []
            elif new_section == "limits":
                section = "limits"
                accum = []
            elif new_section == "forbidden":
                section = "forbidden"
                accum = []
            elif new_section == "figma":
                section = "figma"
                accum = [rest] if rest else []
            else:
                section = None
            continue
        # Detect list items in limits/forbidden
        if section in ("limits", "forbidden"):
            m = re.match(r"-\s+(.+)", stripped)
            if m:
                result[section].append(m.group(1).strip())
            elif stripped and result[section]:
                # continuation of previous item
                result[section][-1] += " " + stripped
        elif section in ("purpose", "useWhen", "dontUse"):
            if stripped:
                accum.append(stripped)
            else:
                flush()
    flush()
    return result


def normalize(c: dict) -> dict:
    """Clean up fields for rendering."""
    for k in ("purpose", "useWhen", "dontUse"):
        if c.get(k):
            c[k] = re.sub(r"\s+", " ", c[k]).strip()
    return c


def render_component(file: Path, c: dict) -> str:
    """Return a markdown section for one component."""
    rel = file.relative_to(ROOT)
    parts = [f"### `<{c['component']}>`", "", f"📄 [`{rel}`]({rel})"]
    if c.get("figma"):
        parts.append(f"🎨 Figma `{c['figma']}`")
    parts.append("")
    if c.get("purpose"):
        parts.append(f"**Purpose** — {c['purpose']}")
    if c.get("useWhen"):
        parts.append(f"**Use when** — {c['useWhen']}")
    if c.get("dontUse"):
        parts.append(f"**Don't use** — {c['dontUse']}")
    if c.get("limits"):
        parts.append("")
        parts.append("**Limits:**")
        for item in c["limits"]:
            parts.append(f"- {item}")
    if c.get("forbidden"):
        parts.append("")
        parts.append("**Forbidden:**")
        for item in c["forbidden"]:
            parts.append(f"- {item}")
    parts.append("")
    return "\n".join(parts)


def main():
    out = [
        "# DS Components — Rules Reference",
        "",
        "**Auto-generated from JSDoc contracts in source files.** Regenerate via `python3 scripts/generate-ds-reference.py` (or similar — this was generated once).",
        "",
        "This is the authoritative index of **what each component does, when to use it, when NOT to, and what breaks it**. Read the entry for any component before you modify it or create a similar one.",
        "",
        "Components are grouped into:",
        "- **Primitives (`ui/`)** — atoms and small composables (buttons, cards, badges, typography, icons, utilities)",
        "- **Section Frames (`sections/`)** — full-width page sections (Hero, CtaFrame, FeatureFrame, etc.)",
        "",
        "Every entry shows its `@purpose` / `@useWhen` / `@dontUse` / `@limits` / `@forbidden` straight from the source — those are the enforceable rules.",
        "",
        "---",
        "",
        "## Decision: where does my new component live?",
        "",
        "1. **Does an existing component fit?** Look at the table below first.",
        "2. **Can an existing component accept a new prop or variant?** Extend it. Cheapest path.",
        "3. **Is the pattern repeated ≥2 times across pages?** Promote to `library-design/`. Otherwise keep inline in the page file.",
        "4. **Is it a small atom (card, badge, pill)?** → `ui/`",
        "   **Is it a full-width section (Hero-style, CtaFrame-style)?** → `sections/`",
        "",
        "---",
        "",
    ]

    # Quick index
    ui_files = sorted([f for f in UI_DIR.glob("*.tsx") if not f.name.endswith(".stories.tsx")])
    section_files = sorted([f for f in SECTIONS_DIR.glob("*.tsx") if not f.name.endswith(".stories.tsx")])

    ui_contracts: dict = {}
    section_contracts: dict = {}

    for f in ui_files:
        c = extract_contract(f)
        if c:
            normalize(c)
            ui_contracts[c["component"] or f.stem] = (f, c)

    for f in section_files:
        c = extract_contract(f)
        if c:
            normalize(c)
            section_contracts[c["component"] or f.stem] = (f, c)

    out.append("## 📇 Index — all DS components at a glance")
    out.append("")
    out.append("### Primitives (`ui/`)")
    out.append("")
    out.append("| Component | Purpose (1-line) |")
    out.append("|---|---|")
    for name in sorted(ui_contracts.keys()):
        _, c = ui_contracts[name]
        summary = c.get("purpose", "") or ""
        if len(summary) > 120:
            summary = summary[:117] + "…"
        out.append(f"| `<{name}>` | {summary} |")
    out.append("")

    out.append("### Section Frames (`sections/`)")
    out.append("")
    out.append("| Component | Purpose (1-line) |")
    out.append("|---|---|")
    for name in sorted(section_contracts.keys()):
        _, c = section_contracts[name]
        summary = c.get("purpose", "") or ""
        if len(summary) > 120:
            summary = summary[:117] + "…"
        out.append(f"| `<{name}>` | {summary} |")
    out.append("")

    out.append("---")
    out.append("")
    out.append("## 🧱 Primitives — full rules")
    out.append("")
    for name in sorted(ui_contracts.keys()):
        f, c = ui_contracts[name]
        out.append(render_component(f, c))
        out.append("---")
        out.append("")

    out.append("")
    out.append("## 🧩 Section Frames — full rules")
    out.append("")
    for name in sorted(section_contracts.keys()):
        f, c = section_contracts[name]
        out.append(render_component(f, c))
        out.append("---")
        out.append("")

    out.append("")
    out.append("## ⚠️ Components without @purpose contract")
    out.append("")
    missing_ui = [f.name for f in ui_files if not extract_contract(f)]
    missing_sections = [f.name for f in section_files if not extract_contract(f)]
    if missing_ui or missing_sections:
        for f in missing_ui + missing_sections:
            out.append(f"- `{f}`")
        out.append("")
        out.append("→ Add a JSDoc contract following the canonical format before modifying these.")
    else:
        out.append("None — all components have contracts.")

    out.append("")

    output_file = ROOT / "docs/ds-components-reference.md"
    output_file.write_text("\n".join(out))
    print(f"✅ Wrote {output_file} ({len(out)} lines)")
    print(f"   UI primitives: {len(ui_contracts)}")
    print(f"   Section frames: {len(section_contracts)}")
    print(f"   Missing contracts: {len(missing_ui) + len(missing_sections)}")


if __name__ == "__main__":
    main()
