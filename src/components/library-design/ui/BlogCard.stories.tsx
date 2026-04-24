import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogCard } from "./BlogCard";

const meta = {
  title: "UI/BlogCard",
  component: BlogCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const SINGLE_AUTHOR = {
  name: "Bertran RUIZ",
  avatarSrc: "https://placehold.co/80x80/3c51e2/ffffff?text=BR",
  avatarAlt: "Portrait de Bertran RUIZ",
};

const baseArgs = {
  thumbnailSrc:
    "https://placehold.co/600x400/3c51e2/ffffff?text=Mes+12+le%C3%A7ons+de+2023",
  thumbnailAlt: "Aperçu de l'article : illustration abstraite avec fenêtre projet",
  date: "Le 12/10/2021",
  title: "Mes 12 leçons de 2023 pour les DSI qui veulent changer de niveau de jeu",
  excerpt:
    "L'essentiel à savoir sur le Copil projet : missions, composition, erreurs fréquentes à éviter et clés de succès",
  href: "/blog/mes-12-lecons-dsi-2023",
  authors: [SINGLE_AUTHOR],
  categoryLabel: "La newsletter des DSI",
  categoryHref: "/blog/newsletter-dsi",
  publishedByLabel: "Publié par",
  inLabel: "dans",
};

const decorator = (Story: () => React.ReactNode) => (
  <div className="max-w-[21rem] bg-primary-2 p-[2.5rem] rounded-[1.5625rem]">
    <Story />
  </div>
);

/** Default — single-author card. */
export const Default: Story = {
  args: baseArgs,
  decorators: [decorator],
};

/** Two authors — renders "Name1 & Name2" with two stacked avatars. */
export const TwoAuthors: Story = {
  args: {
    ...baseArgs,
    authors: [
      SINGLE_AUTHOR,
      {
        name: "Marie Curie",
        avatarSrc: "https://placehold.co/80x80/2d8a4e/ffffff?text=MC",
        avatarAlt: "Portrait de Marie Curie",
      },
    ],
    authorsAndLabel: "&",
  },
  decorators: [decorator],
};

/** Three authors — renders "Name1 + 2 autres" with three stacked avatars. */
export const ThreeAuthors: Story = {
  args: {
    ...baseArgs,
    authors: [
      SINGLE_AUTHOR,
      {
        name: "Marie Curie",
        avatarSrc: "https://placehold.co/80x80/2d8a4e/ffffff?text=MC",
        avatarAlt: "Portrait de Marie Curie",
      },
      {
        name: "Alan Turing",
        avatarSrc: "https://placehold.co/80x80/ff922b/ffffff?text=AT",
        avatarAlt: "Portrait d'Alan Turing",
      },
    ],
  },
  decorators: [decorator],
};

/** Four authors — avatars capped at 3, label reads "Name + 3 autres". */
export const FourAuthors: Story = {
  args: {
    ...baseArgs,
    authors: [
      SINGLE_AUTHOR,
      { name: "Marie Curie" },
      { name: "Alan Turing" },
      { name: "Ada Lovelace" },
    ],
  },
  decorators: [decorator],
};

/** Without category — minimal byline (just "Publié par [Name]"). */
export const NoCategory: Story = {
  args: {
    ...baseArgs,
    categoryLabel: undefined,
    categoryHref: undefined,
  },
  decorators: [decorator],
};

/** Without avatar — byline renders text-only. */
export const NoAvatar: Story = {
  args: {
    ...baseArgs,
    authors: [{ name: "Bertran RUIZ" }],
  },
  decorators: [decorator],
};

/** Long title / excerpt — verifies clean wrapping at the upper limits. */
export const LongContent: Story = {
  args: {
    ...baseArgs,
    title:
      "Comment transformer votre PMO en véritable levier stratégique pour la direction générale — les 7 étapes clés en 2026",
    excerpt:
      "Un plan actionnable en 7 étapes pour faire évoluer un PMO de simple fonction de contrôle à un partenaire stratégique de la direction, avec des métriques concrètes et des exemples terrain issus de notre portefeuille de 120 transformations.",
  },
  decorators: [decorator],
};

/** English locale — labels all overridden via props. */
export const EnglishLocale: Story = {
  args: {
    ...baseArgs,
    publishedByLabel: "Published by",
    inLabel: "in",
    authorsMoreLabel: "others",
    authorsAndLabel: "and",
    categoryLabel: "The CIO Newsletter",
    authors: [
      { name: "Bertran RUIZ", avatarSrc: SINGLE_AUTHOR.avatarSrc, avatarAlt: SINGLE_AUTHOR.avatarAlt },
      { name: "Jane Doe" },
    ],
  },
  decorators: [decorator],
};

/** Trio — three cards side-by-side to preview the grid composition. */
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
