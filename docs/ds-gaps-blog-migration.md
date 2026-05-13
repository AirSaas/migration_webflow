# DS gaps for blog migration v8

Generated : 2026-05-13T08:31:54.152Z

**Active gaps : 0**  (new components: 0, missing variants: 0, active DS bugs: 0)
Resolved bugs : 1 ; deferred (Phase 5) : 1

Sources :
- `docs/raw/figma-dumps/blog-template-303-1015.tsx` (Figma → React dump)
- `docs/raw/ds-registry.json` (DS catalog)
- `docs/blog-design-rules.yaml` (acceptance rules V0)
- `.context/attachments/AUDIT BLOG REBUILD vs FIGMA 2.docx` (Marianela's audit)

Re-run this audit after each round of DS extensions: `node scripts/migrate/audit-ds-gaps.mjs`. Goal : 0 gaps before pipeline starts.

## 1. NEW components to create

_None_
## 2. NEW variants / props on existing components

_None_
## 3. DS bugs

### Active

_None_
### Resolved (kept for history)

- ✅ **TableFrame text-white drop (tailwind-merge) — FIXED** — DONE 2026-05-13 — cn() now uses extendTailwindMerge({extend:{classGroups:{font-size:[{text:['paragraph','small','h1-h4']}]}}}). Verified: rendered <th> now keeps text-white. Marked as bug-fixed in pre-flight.

### Deferred to later phases

- ⏭ **renderBlogBlocks hardcodes variant='pull' and gradient='none' (PHASE-5)** (Phase 5) — Phase 5 task — passive renderer reads variant/gradient from spec. Not a pre-flight blocker.

## Next steps

✅ All gaps closed. Phase 2 (build the pipeline) can start.
