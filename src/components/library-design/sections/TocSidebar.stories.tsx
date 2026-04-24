import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TocSidebar, type TocItem } from "./TocSidebar";
import { ProseFrame } from "./ProseFrame";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";

const meta = {
  title: "Sections/Blog/TocSidebar",
  component: TocSidebar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TocSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const articleSections: TocItem[] = [
  { id: "intro", label: "Introduction", level: 2 },
  { id: "pourquoi", label: "Pourquoi cadrer un projet ?", level: 2 },
  { id: "methode", label: "La méthode en 7 étapes", level: 2 },
  { id: "sponsor", label: "Étape 1 — Nommer un sponsor", level: 3 },
  { id: "perimetre", label: "Étape 2 — Définir le périmètre", level: 3 },
  { id: "outils", label: "Les outils utiles", level: 2 },
  { id: "pieges", label: "Les pièges à éviter", level: 2 },
  { id: "conclusion", label: "Conclusion", level: 2 },
];

/**
 * Standalone TOC — showing the sidebar only. At `lg+` viewport it appears as
 * a narrow left column; below `lg` it is hidden entirely (article body takes
 * the full width on mobile / tablet).
 */
export const Standalone: Story = {
  args: {
    title: "Sommaire",
    items: articleSections,
    ariaLabel: "Sommaire de l'article",
  },
};

/**
 * With h3 sub-entries visible — use when the article is long enough that
 * h2 alone isn't granular enough. h3 entries indent under their parent h2.
 */
export const WithSubEntries: Story = {
  args: {
    title: "Sommaire",
    items: articleSections,
    showH3: true,
    ariaLabel: "Sommaire de l'article",
  },
};

/**
 * Integrated with a <ProseFrame> body — the canonical blog article layout:
 * TOC sidebar on the left, reading column on the right. This is the shape
 * the page-level layout will mount; the two components don't know about
 * each other — the page composes them in a 2-col grid.
 */
export const InArticleLayout: Story = {
  render: (args) => (
    <div className="w-full">
      <div className="mx-auto flex max-w-[91rem] gap-[3rem] px-[1.5rem] py-[3rem] md:px-[3rem] lg:px-[5rem]">
        <TocSidebar {...args} />
        <div className="flex-1">
          <ArticleBody />
        </div>
      </div>
    </div>
  ),
  args: {
    title: "Sommaire",
    items: articleSections,
    ariaLabel: "Sommaire de l'article",
  },
};

function ArticleBody() {
  return (
    <ProseFrame maxWidth="reading">
      <Heading level={1} gradient="none" align="left">
        <GradientText gradient="dark-to-primary">
          Cadrage projet : la méthode
        </GradientText>{" "}
        <GradientText gradient="primary">en 7 étapes</GradientText>
      </Heading>

      <section id="intro">
        <Heading level={2} gradient="none" align="left">
          Introduction
        </Heading>
        <Text size="md" align="left">
          Un cadrage solide évite 80 % des dérapages en production. Voici la
          checklist utilisée par 200+ PMO français pour structurer le lancement
          de leurs projets stratégiques.
        </Text>
      </section>

      <section id="pourquoi">
        <Heading level={2} gradient="none" align="left">
          Pourquoi cadrer un projet ?
        </Heading>
        <Text size="md" align="left">
          Sans cadrage, les équipes avancent dans le brouillard. Les attentes
          du sponsor ne sont pas alignées avec les livrables, le périmètre
          dérive en continu, et les ressources sont consommées sur des priorités
          qui changent au fil des comités. Un bon cadrage est la seule
          assurance qu&apos;on sait où on va.
        </Text>
      </section>

      <section id="methode">
        <Heading level={2} gradient="none" align="left">
          La méthode en 7 étapes
        </Heading>
        <Text size="md" align="left">
          Chaque étape capture une dimension du cadrage : rôles, périmètre,
          calendrier, budget, risques, gouvernance, et critères de succès.
          Suivez-les dans l&apos;ordre — chacune s&apos;appuie sur la
          précédente.
        </Text>

        <Heading level={3} gradient="none" align="left">
          Étape 1 — Nommer un sponsor
        </Heading>
        <Text size="md" align="left">
          Le sponsor est l&apos;interlocuteur qui tranche en cas de désaccord
          entre parties prenantes. Sans sponsor nommé, chaque décision
          structurante reste en suspens.
        </Text>

        <Heading level={3} gradient="none" align="left">
          Étape 2 — Définir le périmètre
        </Heading>
        <Text size="md" align="left">
          Écrivez explicitement ce qui EST et ce qui N&apos;EST PAS dans le
          scope. Ce deuxième point est aussi important que le premier.
        </Text>
      </section>

      <section id="outils">
        <Heading level={2} gradient="none" align="left">
          Les outils utiles
        </Heading>
        <Text size="md" align="left">
          Une plateforme PPM comme AirSaas consolide toutes ces informations
          dans un flash report automatique. Vous passez moins de temps sur la
          consolidation manuelle et plus de temps sur l&apos;arbitrage.
        </Text>
      </section>

      <section id="pieges">
        <Heading level={2} gradient="none" align="left">
          Les pièges à éviter
        </Heading>
        <Text size="md" align="left">
          Ne démarrez jamais un projet sans ligne de sponsor nommée. Ne laissez
          jamais le périmètre flou &laquo;&nbsp;on verra en cours de
          route&nbsp;&raquo; — il dérivera. Ne confondez jamais une réunion de
          cadrage avec un comité de pilotage.
        </Text>
      </section>

      <section id="conclusion">
        <Heading level={2} gradient="none" align="left">
          Conclusion
        </Heading>
        <Text size="md" align="left">
          Le cadrage est l&apos;investissement qui rend rentable toute la suite
          du projet. Consacrez-y deux semaines — vous en économiserez deux
          mois.
        </Text>
      </section>
    </ProseFrame>
  );
}
