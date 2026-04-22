import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "UI/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Aucun résultat trouvé",
    description: "Essayez avec d'autres mots-clés ou ajustez vos filtres.",
  },
};

export const WithIcon: Story = {
  args: {
    icon: "🔍",
    title: "Aucun résultat",
    description: "Votre recherche n'a retourné aucun article. Essayez avec un autre mot-clé.",
  },
};

export const WithCta: Story = {
  args: {
    icon: "📭",
    title: "Pas encore de témoignages",
    description: "Soyez le premier à partager votre expérience avec AirSaas.",
    ctaLabel: "Partager mon expérience",
    ctaHref: "/fr/bookademo",
  },
};
