# Lessons Learned

## 2026-03-09 — CSS fidelity skipped during component development

**Mistake**: Built sections from design-system.md tokens without verifying actual CSS against Webflow source. Result: wrong font sizes, weights, gaps, paddings across multiple components. User had to flag it.

**Rule**: For EVERY section component:
1. Extract exact Webflow CSS via `style_tool > get_styles(query='ClassName')` BEFORE coding
2. After coding, take Playwright screenshot of Webflow original at 1440px and compare
3. Never mark a step complete without a visual QA pass

**Pattern to watch**: "Close enough" typography/spacing is never close enough. Always verify `font-size`, `font-weight`, `line-height`, `padding`, `gap`, `max-width` against source.

## 2026-03-09 — Vercel SSG fails with JSX in data files

**Mistake**: Used `generateStaticParams` + SSG for pages whose data files contain JSX (React.ReactNode). Worked locally but 500'd on Vercel.

**Rule**: Any page whose data contains JSX must use `export const dynamic = "force-dynamic"`. Test on Vercel, not just local build.

## 2026-04-16 — Hero H1 silently empty due to wrong prop names

**Mistake**: Used `title`, `badge`, `ctaLabel`, `navLinks` props on Hero component — none of which exist. The real props are `headline`, `headlineGradient`, `topTag`, `primaryCta`, `navItems`. React silently ignores unknown props, so the Hero rendered with an empty H1 and no CTA button. I didn't catch it because I jumped to checking section headings further down the page instead of verifying the Hero first.

**Rule**: 
1. **Always read the component interface (props/types) before instantiating a DS component** — never guess prop names from memory or from a different component.
2. **The Hero H1 is the most important element on any landing page.** After rendering, ALWAYS verify the H1 is visible and non-empty in the screenshot before moving on.
3. **Heroes are never rich text.** They follow a strict pattern: tag/badge + short headline (dark + gradient parts) + subtitle + CTA button. If source content looks like a long SEO title, split it into `headline` + `headlineGradient`.

**Pattern to watch**: Empty H1 in Hero = wrong prop names passed silently. Storybook's "No Preview" H1 can mask the real empty H1.

## 2026-04-16 — ValuePropositionFrame: always match columns prop to actual children count

**Mistake**: Passed 3 FeatureCards to ValuePropositionFrame without setting `columns={3}`. The default is `columns={4}`, so the grid had 4 columns with only 3 cards — leaving 25% of the width empty. Cards looked narrow and didn't fill the available space.

**Rule**:
1. **Always count the children** and pass the matching `columns` prop: 2 children → `columns={3}` or custom, 3 children → `columns={3}`, 4 children → `columns={4}` (default).
2. **Cards in a grid section should always fill the full width.** If they don't, the grid column count is wrong.
3. This applies to any grid-based section component, not just ValuePropositionFrame — always verify the grid visually at desktop width after composing the page.

## 2026-04-16 — FeatureFrame alternation: always maintain right-left-right rhythm

**Mistake**: When composing landing pages with consecutive FeatureFrames, I didn't always enforce the alternating pattern `imagePosition="right"` → `"left"` → `"right"` → `"left"`. Sections that break this rhythm feel visually monotonous.

**Rule**:
1. **Consecutive FeatureFrames must always alternate** `imagePosition`: right → left → right → left (or vice versa). No two consecutive FeatureFrames should have the same side.
2. When inserting a non-FeatureFrame section (CTA, ValueProposition, stacked) between two FeatureFrames, track the last image position used and resume the alternation after the break.
3. Verify the alternation visually at desktop width — a zigzag pattern confirms correct alternation.

## 2026-04-16 — Identify correct section type from source reference screenshots

**Mistake**: Used `ValuePropositionFrame` with 3 FeatureCards for the "newsletter sponsor" section, but the source clearly showed a FeatureFrame layout (large image left + text descriptions right). Misidentified the section type.

**Rule**:
1. **Image + text side by side = FeatureFrame.** Use `richContent` for editorial text with multiple sub-features.
2. **Grid of equal cards (no hero image) = ValuePropositionFrame.** Cards are the primary content.
3. Before coding a section, ask: "Is there a dominant image/screenshot paired with text, or are there N equal cards?" That determines FeatureFrame vs ValuePropositionFrame.
