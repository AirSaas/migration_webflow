import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Quote } from "./Quote";

const meta = {
  title: "UI/Quote",
  component: Quote,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Quote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "La nuance et la précision sont plus simples à exprimer dans son langage maternel.",
  },
};

export const WithAuthor: Story = {
  args: {
    children: "Approximativement juste plutôt que précisément faux.",
    author: "Principe guide AirSaas",
  },
};

export const WithAuthorAvatar: Story = {
  args: {
    children:
      "AirSaas nous a permis d'aligner nos comités autour d'une vision claire du portefeuille.",
    author: (
      <>
        <strong>Sophie Lefèvre</strong> — DSI @Kiabi
      </>
    ),
    authorAvatar: "https://placehold.co/80x80/3c51e2/ffffff?text=SL",
    authorAvatarAlt: "Sophie Lefèvre",
  },
};

export const LeftAligned: Story = {
  args: {
    align: "left",
    children: (
      <>
        Le bon pilotage s&apos;appuie sur des <strong>cadrages précis</strong>
        , des remontées de risques contextualisées et des soumissions
        d&apos;arbitrages éclairés.
      </>
    ),
  },
};

export const WithoutIcon: Story = {
  args: {
    hideIcon: true,
    children:
      "Une citation sobre, sans icône décorative, pour les contextes où l'on souhaite un rendu minimaliste.",
  },
};
