# QA report — LLM (qa-llm.mjs)

**Date** : 2026-05-12T13:08:54.171Z
**Model** : claude-sonnet-4-6

**Total** : 1 pages — **0 PASS** / 1 WARN / 0 BLOCK / 0 ERR

**Severity totals** : P0 = 0, P1 = 4, P2 = 4

## P1 issues by page

### `lp/ppm`
- **layout** @ Stats section — all 4 metric cards (icon area) : Each stat card contains a Font Awesome Duotone icon span that renders as a blank/empty block because the font-family 'Font Awesome 6 Duotone' is likely not loaded on the rebuild, leaving a 6rem-tall empty space above every metric. Users see floating coloured ellipses under nothing.
- **layout** @ Feature bullet lists — Flash Report, Roadmap COMEX, Priorisation sections : Each bullet item uses a Font Awesome Pro icon rendered via a bare <span> with font-family 'Font Awesome 6 Pro'. If the font is not loaded, every bullet shows no icon at all, leaving visually broken 'dangling' text lines with no leading symbol.
- **content** @ Roadmap COMEX section — bullet list : The first bullet reads 'Export PDF, PPT ou lien web', which is a verbatim copy from the Flash Report section above and does not match the Roadmap COMEX feature context (roadmap sharing, not export formats). This looks like a copy-paste error.
- **functional** @ Nav — 'Demander une démo' button (desktop nav header) : The desktop nav CTA 'Demander une démo' links to /fr/meetings-pages, while the hero primary CTA 'Réservez une démo' also links to /fr/meetings-pages. This is consistent, but the nav button label 'Demander une démo' differs in verb from the hero 'Réservez une démo' on the same page, creating a minor inconsistency — however more critically, on a conversion LP the nav CTA should ideally not compete with the hero CTA. Not blocking but worth flagging.

## All pages

| Slug | Type | Status | P0 | P1 | P2 | Note |
|---|---|---|---|---|---|---|
| `ppm` | lp | WARN | 0 | 4 | 4 |  |
