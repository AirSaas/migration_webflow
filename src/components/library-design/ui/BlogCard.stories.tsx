import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogCard } from "./BlogCard";

const meta = {
  title: "UI/BlogCard",
  component: BlogCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  thumbnailSrc:
    "https://placehold.co/600x400/3c51e2/ffffff?text=Mes+12+le%C3%A7ons+de+2023",
  thumbnailAlt: "Aperçu de l'article : illustration abstraite avec fenêtre projet",
  date: "Le 12/10/2021",
  title: "Mes 12 leçons de 2023 pour les DSI qui veulent changer de niveau de jeu",
  excerpt:
    "L'essentiel à savoir sur le Copil projet : missions, composition, erreurs fréquentes à éviter et clés de succès",
  href: "/blog/mes-12-lecons-dsi-2023",
  authorName: "Bertran RUIZ",
  authorAvatarSrc:
    "https://placehold.co/80x80/3c51e2/ffffff?text=BR",
  authorAvatarAlt: "Portrait de Bertran RUIZ",
  categoryLabel: "La newsletter des DSI",
  categoryHref: "/blog/newsletter-dsi",
};

/**
 * Default — single card as seen in the Figma (312-2107).
 * Constrained width simulates the 3-col grid layout.
 */
export const Default: Story = {
  args: baseArgs,
  decorators: [
    (Story) => (
      <div className="max-w-[21rem] bg-primary-2 p-[2.5rem] rounded-[1.5625rem]">
        <Story />
      </div>
    ),
  ],
};

/**
 * Without category — minimal byline (just "Publié par [Name]").
 */
export const NoCategory: Story = {
  args: {
    ...baseArgs,
    categoryLabel: undefined,
    categoryHref: undefined,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[21rem] bg-primary-2 p-[2.5rem] rounded-[1.5625rem]">
        <Story />
      </div>
    ),
  ],
};

/**
 * Without avatar — byline renders the text lines without the avatar image.
 */
export const NoAvatar: Story = {
  args: {
    ...baseArgs,
    authorAvatarSrc: undefined,
    authorAvatarAlt: undefined,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[21rem] bg-primary-2 p-[2.5rem] rounded-[1.5625rem]">
        <Story />
      </div>
    ),
  ],
};

/**
 * Long title / excerpt — verifies clean wrapping at the upper limits.
 */
export const LongContent: Story = {
  args: {
    ...baseArgs,
    title:
      "Comment transformer votre PMO en véritable levier stratégique pour la direction générale — les 7 étapes clés en 2026",
    excerpt:
      "Un plan actionnable en 7 étapes pour faire évoluer un PMO de simple fonction de contrôle à un partenaire stratégique de la direction, avec des métriques concrètes et des exemples terrain issus de notre portefeuille de 120 transformations.",
  },
  decorators: [
    (Story) => (
      <div className="max-w-[21rem] bg-primary-2 p-[2.5rem] rounded-[1.5625rem]">
        <Story />
      </div>
    ),
  ],
};

/**
 * Trio — three cards side-by-side to preview the grid composition.
 */
export const Trio: Story = {
  render: () => (
    <div className="bg-primary-2 p-[2.5rem] rounded-[1.5625rem]">
      <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <BlogCard key={i} {...baseArgs} />
        ))}
      </div>
    </div>
  ),
};
