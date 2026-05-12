import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LandingPageV2 from "./LandingPageV2";
import { PAGES as LP_PAGES } from "@/data/landings-v2/lp";
import { PAGES as SOLUTIONS_PAGES } from "@/data/landings-v2/solutions";
import { PAGES as PRODUIT_PAGES } from "@/data/landings-v2/produit";
import { PAGES as EQUIPES_PAGES } from "@/data/landings-v2/equipes";

/**
 * Page-level composition stories — one per page family.
 *
 * **Why this file exists**: isolated component stories miss regressions that
 * only surface when multiple sections sit next to each other (FloatingCards
 * overlapping a CTA title, IconIllustration scaling in a feature grid,
 * heading sizes cascading from H1 → H6 across the page, gradient backgrounds
 * stacking, etc.). These page-level stories mount the **first real page of
 * each family** through `LandingPageV2` so any DS-level contract change
 * (typography, decorative chrome, spacing) is reviewable inline before
 * production preview.
 *
 * **Why real data, not fake content**: fake page mocks rot the moment the
 * data shape evolves. Mounting `PAGES[0]` from each family means these stories
 * stay in sync with the migrated content automatically.
 *
 * **How to QA**: load each story in Storybook → scroll the full page →
 * verify Figma fidelity end-to-end. Cross-reference with the live route
 * (e.g. `Lp_Pmo` ↔ `/fr/lp/pmo`).
 */
const meta = {
  title: "Pages/PageCompositions (DS QA)",
  component: LandingPageV2,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full-page assemblies per family. Use these to spot cross-component regressions that isolated stories can't catch.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LandingPageV2>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Landing Page family — `/fr/lp/pmo` (the audit's reference page). */
export const Lp_Pmo: Story = {
  args: { page: LP_PAGES.find((p) => p.slug === "pmo") ?? LP_PAGES[0] },
};

/** Landing Page family — `/fr/lp/capacity-planning`. */
export const Lp_CapacityPlanning: Story = {
  args: {
    page:
      LP_PAGES.find((p) => p.slug === "capacity-planning") ?? LP_PAGES[0],
  },
};

/** Solution family — `/fr/solutions/airsaas-et-les-experts-de-la-transfo`. */
export const Solution_ExpertsTransfo: Story = {
  args: { page: SOLUTIONS_PAGES[0] },
};

/** Produit family — `/fr/produit/automatiser-la-com-projet`. */
export const Produit_AutomatiserCom: Story = {
  args: { page: PRODUIT_PAGES[0] },
};

/** Équipes family — `/fr/equipes/comite-direction`. */
export const Equipes_ComiteDirection: Story = {
  args: { page: EQUIPES_PAGES[0] },
};
