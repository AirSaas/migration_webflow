import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProseFrame } from "./ProseFrame";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";

const meta = {
  title: "Sections/Editorial Sections/ProseFrame",
  component: ProseFrame,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ProseFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

const MaslowSample = () => (
  <>
    <Heading level={2} gradient="none" align="left">
      <GradientText gradient="dark-to-primary">
        La pyramide de Maslow appliquée
      </GradientText>{" "}
      <GradientText gradient="primary">au pilotage de projet</GradientText>
    </Heading>

    <Text size="md" align="left">
      Avant de vous lancer dans la refonte de votre outil PPM, il est essentiel
      de comprendre quels besoins fondamentaux vos utilisateurs cherchent à
      satisfaire. Nous reprenons ici la pyramide de Maslow, bien connue en
      psychologie, pour la transposer au monde des chefs de projet, PMO et DSI.
    </Text>

    <Heading level={3} gradient="none" align="left">
      1. Les besoins physiologiques — voir ce qui se passe
    </Heading>

    <Text size="md" align="left">
      Le premier étage, c&apos;est la visibilité minimale sur l&apos;état des
      projets. Sans un tableau de bord qui agrège au moins les indicateurs
      basiques (délai, budget, charge), impossible de piloter quoi que ce
      soit. C&apos;est la base — avant même de parler d&apos;optimisation, vous
      devez pouvoir dire, à un instant donné, &laquo; où en est mon
      portefeuille&nbsp;&raquo;.
    </Text>

    <Heading level={3} gradient="none" align="left">
      2. Le besoin de sécurité — anticiper les risques
    </Heading>

    <Text size="md" align="left">
      Une fois la visibilité acquise, le besoin suivant est d&apos;anticiper.
      Les risques majeurs, les dépendances critiques, les ressources
      surchargées — tout cela doit être identifiable avant que le projet ne
      décroche. Les organisations matures investissent ici dans des rituels
      (flash reports, comités de priorisation) qui transforment la donnée brute
      en signal actionnable.
    </Text>

    <Heading level={3} gradient="none" align="left">
      3. Le besoin d&apos;appartenance — aligner les équipes
    </Heading>

    <Text size="md" align="left">
      À ce stade, les équipes partagent un langage commun sur l&apos;état du
      portefeuille et les priorités. La gouvernance projet devient un outil
      d&apos;alignement, pas un exercice de reporting descendant. Chaque chef de
      projet comprend comment sa contribution s&apos;inscrit dans la stratégie,
      et chaque sponsor comprend ce qu&apos;il peut (et ne peut pas) attendre de
      ses équipes.
    </Text>
  </>
);

/**
 * Default usage — reading column (50rem) on a white background. Ideal for
 * long-form editorial marketing content on Solution pages ("PM vs PPM",
 * Maslow pyramid, tableau-de-bord-dsi deep dive).
 */
export const ReadingLight: Story = {
  args: {
    children: <MaslowSample />,
  },
};

/**
 * Tinted variant — pale lavender background (primary-2). Use when the
 * preceding section is white and we want a visual rhythm break before the
 * long-form prose.
 */
export const ReadingTinted: Story = {
  args: {
    variant: "tinted",
    children: <MaslowSample />,
  },
};

/**
 * Wide column (91.25rem) — the shape used by <BlogArticleBody> for blog
 * articles. Here directly via <ProseFrame maxWidth="wide"> for callers
 * that want the wider column without the blog-specific naming.
 */
export const WideLight: Story = {
  args: {
    maxWidth: "wide",
    children: <MaslowSample />,
  },
};
