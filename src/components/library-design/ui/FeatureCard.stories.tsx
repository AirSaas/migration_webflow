import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeatureCard } from "./FeatureCard";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import {
  CalendarDayIcon,
  BullseyeArrowIcon,
  SuitcaseIcon,
  StopwatchIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="md">
      {children}
    </IconIllustration>
  );
}

const meta = {
  title: "UI/FeatureCard",
  component: FeatureCard,
  parameters: { layout: "centered" },
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    description: { control: "text" },
    icon: { control: false },
  },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: (
      <FeatureIcon>
        <CalendarDayIcon />
      </FeatureIcon>
    ),
    title: "4 semaines",
    subtitle: "de déploiement",
    description:
      "Un setup guidé, pas un projet IT de 6 mois. Votre équipe est opérationnelle en un mois.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-medium text-text-muted">4-column grid</span>
      <div className="grid grid-cols-4 gap-[1.5625rem] max-w-[91rem]">
        <FeatureCard
          icon={
            <FeatureIcon>
              <CalendarDayIcon />
            </FeatureIcon>
          }
          title="4 semaines"
          subtitle="de déploiement"
          description="Un setup guidé, pas un projet IT de 6 mois."
        />
        <FeatureCard
          icon={
            <FeatureIcon>
              <BullseyeArrowIcon />
            </FeatureIcon>
          }
          title="+200"
          subtitle="entreprises"
          description="Nous accompagnent dans leur transformation."
        />
        <FeatureCard
          icon={
            <FeatureIcon>
              <StopwatchIcon />
            </FeatureIcon>
          }
          title="97%"
          subtitle="de satisfaction"
          description="Nos clients recommandent AirSaas à leurs pairs."
        />
        <FeatureCard
          icon={
            <FeatureIcon>
              <SuitcaseIcon />
            </FeatureIcon>
          }
          title="0"
          subtitle="formation requise"
          description="Interface intuitive, prise en main immédiate."
        />
      </div>
    </div>
  ),
};
