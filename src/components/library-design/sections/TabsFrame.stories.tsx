import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TabsFrame } from "./TabsFrame";
import { ValuePropositionFrame } from "./ValuePropositionFrame";
import { PillarFrame } from "./PillarFrame";
import { FaqFrame } from "./FaqFrame";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import {
  BullseyeArrowIcon,
  StopwatchIcon,
  GearsIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

const meta = {
  title: "Sections/Navigation Sections/TabsFrame",
  component: TabsFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TabsFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

const lpTabs = [
  { label: "Capacity planning", href: "#capacity" },
  { label: "Scénarios", href: "#scenarios" },
  { label: "Priorisation", href: "#priorisation" },
  { label: "Reporting", href: "#reporting" },
  { label: "Sécurité", href: "#securite" },
  { label: "FAQ", href: "#faq" },
];

/**
 * Canonical LP usage — 6 hero-adjacent tabs linking to page sections.
 * Mirrors the pattern on /lp/capacity-planning, /lp/pmo, /lp/ppm, /lp/pi-planning.
 */
export const LpSixTabs: Story = {
  args: {
    tabs: lpTabs,
    ariaLabel: "Sections de la page",
  },
};

/**
 * Minimum bound — 3 tabs. Verifies layout stays balanced with a small count.
 */
export const ThreeTabs: Story = {
  args: {
    tabs: lpTabs.slice(0, 3),
    ariaLabel: "Sections de la page",
  },
};

/**
 * Dark variant — primary-70 background. Use when the Hero below is already
 * light and we want a visual break at the tabs bar.
 */
export const Dark: Story = {
  args: {
    variant: "dark",
    tabs: lpTabs,
    ariaLabel: "Sections de la page",
  },
};

/**
 * Sticky mode — the bar pins to the top of the viewport when scrolled past.
 * Use sparingly — some LPs don't want the persistent top nav.
 */
export const Sticky: Story = {
  args: {
    tabs: lpTabs,
    sticky: true,
    ariaLabel: "Sections de la page",
  },
};

/**
 * Scroll-spy end-to-end demo — TabsFrame + 3 real section frames with
 * matching `id` props. Click a tab: smooth-scroll to the target. Scroll
 * manually: the active tab auto-updates via IntersectionObserver.
 *
 * This story is the canonical reference for how TabsFrame integrates with
 * the rest of the DS on a landing page. Every section frame that should
 * be a tab target needs an `id` prop (added 2026-04-24 to 17 frames).
 */
export const WithScrollTargets: Story = {
  render: () => (
    <div className="flex flex-col">
      <TabsFrame
        sticky
        ariaLabel="Page sections"
        tabs={[
          { label: "Gains", href: "#gains-demo" },
          { label: "Approche", href: "#approche-demo" },
          { label: "FAQ", href: "#faq-demo" },
        ]}
      />

      <ValuePropositionFrame
        id="gains-demo"
        tag="LES RÉSULTATS"
        titleHighlight="3 indicateurs"
        title="qui changent avec AirSaas"
        subtitle="Tab 1 anchors here. Scroll down to trigger tab changes."
        columns={3}
      >
        <FeatureCard
          icon={
            <IconIllustration variant="dark" size="md">
              <StopwatchIcon />
            </IconIllustration>
          }
          title="−40%"
          description="Temps de consolidation"
        />
        <FeatureCard
          icon={
            <IconIllustration variant="dark" size="md">
              <BullseyeArrowIcon />
            </IconIllustration>
          }
          title="×2"
          description="Taux de participation"
        />
        <FeatureCard
          icon={
            <IconIllustration variant="dark" size="md">
              <GearsIcon />
            </IconIllustration>
          }
          title="−3×"
          description="Délai de décision"
        />
      </ValuePropositionFrame>

      <PillarFrame
        id="approche-demo"
        tag="POURQUOI AIRSAAS"
        titleHighlight="3 raisons"
        title="d'adopter notre approche"
        subtitle="Tab 2 anchors here. Watch the active tab update as you scroll."
        columns={3}
        pillars={[
          {
            icon: (
              <IconIllustration variant="dark" size="lg">
                <BullseyeArrowIcon />
              </IconIllustration>
            ),
            title: "Focus",
            description: "Un seul outil pour tous les projets stratégiques.",
          },
          {
            icon: (
              <IconIllustration variant="dark" size="lg">
                <StopwatchIcon />
              </IconIllustration>
            ),
            title: "Rythme",
            description: "Des rituels prévisibles et actionnables.",
          },
          {
            icon: (
              <IconIllustration variant="dark" size="lg">
                <GearsIcon />
              </IconIllustration>
            ),
            title: "Autonomie",
            description: "Les chefs de projet remontent sans PMO.",
          },
        ]}
      />

      <FaqFrame
        id="faq-demo"
        title="Les questions"
        titleHighlight="fréquentes"
        items={[
          {
            question: "Combien de temps prend le déploiement ?",
            answer: "Entre 3 et 6 semaines. Tab 3 anchors here.",
          },
          {
            question: "AirSaas s'intègre à nos outils ?",
            answer:
              "Oui — Jira, Asana, Monday, ServiceNow, PowerBI, Tableau.",
          },
        ]}
      />
    </div>
  ),
};
