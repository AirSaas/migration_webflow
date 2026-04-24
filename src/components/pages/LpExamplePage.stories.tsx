import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LpExamplePage from "./LpExamplePage";

const meta = {
  title: "Pages/LpExamplePage (blueprint)",
  component: LpExamplePage,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof LpExamplePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Canonical landing-page composition — clone this when building a new LP.
 *
 * Shows all the frames the 4 LPs (ppm / pmo / capacity-planning /
 * pi-planning) need, in the recommended order, with placeholder content.
 * The `id` prop on sections demonstrates how TabsFrame scroll-spy hooks
 * into the layout (click a tab → smooth-scroll to the target section).
 *
 * **Not a real route** — this page is mounted only inside Storybook for
 * reference. When cloning, rename `LpExamplePage` → `LpPpmPage` (or
 * whichever), swap placeholder content, keep the import paths.
 *
 * See `docs/ds-use-cases.md` for the one-line picking rules and
 * `docs/legacy-migration.md` for the legacy → DS mapping table.
 */
export const Default: Story = {};
