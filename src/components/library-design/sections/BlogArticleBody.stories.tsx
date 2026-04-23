import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogArticleBody } from "./BlogArticleBody";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Quote } from "@/components/library-design/ui/Quote";
import { ListInline } from "@/components/library-design/ui/ListInline";
import { TableFrame } from "@/components/library-design/ui/TableFrame";
import { IllustrationFrame } from "@/components/library-design/ui/IllustrationFrame";

const meta = {
  title: "Sections/Blog/BlogArticleBody",
  component: BlogArticleBody,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BlogArticleBody>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default — reproduces the Figma blog body (303-1146) end-to-end: intro
 * paragraph, H2 section title, bold-inline paragraph, Quote, subsection
 * H3 headings, bullet list, comparison TableFrame, warm-tone
 * IllustrationFrame.
 *
 * Every primitive comes from the DS — no hardcoded colors / fonts /
 * typography. Copy is passed inline for the story; in production, it
 * will be sourced from Strapi via next-intl.
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <Text size="md">
          Le PMO est devenu incontournable dans les organisations qui gèrent
          plusieurs projets en parallèle. Pourtant, c&apos;est un métier
          souvent mal compris&nbsp;: ni chef de projet, ni contrôleur, ni
          secrétaire de direction. Alors c&apos;est quoi, concrètement, un
          PMO&nbsp;? Ce guide te donne les clés pour comprendre ce rôle,
          son positionnement, et comment le mettre en place efficacement.
        </Text>

        <Heading level={2} gradient="primary" align="left">
          PMO&nbsp;: définition et signification
        </Heading>

        <Text size="md">
          <strong className="font-bold">PMO</strong> signifie{" "}
          <strong className="font-bold">Project Management Office</strong>,
          soit «&nbsp;Bureau de gestion de projets&nbsp;» en français.
          C&apos;est une fonction (ou une équipe) qui structure la
          gouvernance du portefeuille de projets d&apos;une organisation.
        </Text>

        <Quote align="left" authorAvatarAlt="">
          <strong className="font-bold not-italic">En une phrase&nbsp;:</strong>{" "}
          le PMO est la personne (ou l&apos;équipe) qui s&apos;assure que les
          bons projets sont lancés, avec les bonnes méthodes, et que la
          direction a une visibilité claire sur l&apos;avancement global.
        </Quote>

        <Text size="md">
          Contrairement à ce que le terme «&nbsp;bureau&nbsp;» suggère, le
          PMO n&apos;est pas un lieu physique. C&apos;est une fonction
          rattachée à la direction — DSI, direction de la transformation,
          ou direction générale — qui orchestre la gestion de projets à
          l&apos;échelle de l&apos;entreprise.
        </Text>

        <Heading level={3} gradient="primary" align="left">
          1 • La méthode
        </Heading>
        <Text size="md">
          Harmoniser les pratiques de gestion de projet entre les équipes.
          Tout le monde parle le même langage.
        </Text>

        <Heading level={3} gradient="primary" align="left">
          2 • La gouvernance
        </Heading>
        <Text size="md">
          Structurer les instances de décision (comités de pilotage, revues
          de portefeuille) pour que le Comex puisse arbitrer avec des
          données fiables.
        </Text>

        <Heading level={3} gradient="primary" align="left">
          3 • La méthode
        </Heading>
        <Text size="md">
          Faire monter les équipes en compétences projet. Le PMO forme,
          outille et facilite — il n&apos;exécute pas à la place des équipes.
        </Text>

        <Heading level={2} gradient="primary" align="left">
          L&apos;explosion du nombre de projets transverses
        </Heading>
        <Text size="md">
          L&apos;accélération de l&apos;innovation a créé une prolifération
          de projets transverses et de transformation digitale.
        </Text>

        <Quote
          align="left"
          author={<strong>Bertran Ruiz, CEO AirSaas</strong>}
          authorAvatarAlt=""
        >
          &ldquo;90&nbsp;% des projets sont transverses. La transformation,
          structurellement nécessaire à l&apos;avenir de l&apos;entreprise,
          déstabilise l&apos;organisation à court terme.&rdquo;
        </Quote>

        <Heading level={3} gradient="primary" align="left">
          Bénéfices attendus
        </Heading>
        <div className="flex flex-col gap-[0.625rem]">
          <ListInline bullet="circle-primary">
            Développement continu des capacités
          </ListInline>
          <ListInline bullet="circle-primary">
            Brief structuré selon vos templates
          </ListInline>
          <ListInline bullet="circle-primary">
            Demandes comparables entre elles
          </ListInline>
          <ListInline bullet="circle-primary">
            Dites non plus tôt, lancez moins de projets... mais mieux
          </ListInline>
        </div>

        <Heading level={3} gradient="primary" align="left">
          Chef de projet vs PMO&nbsp;: les différences clés
        </Heading>
        <TableFrame
          firstColumnBold
          columns={["Critère", "Chef de projet", "PMO"]}
          rows={[
            [
              "Compétences clés",
              "Technique, gestion d'équipe, rigueur",
              "Méthodes, reporting portefeuille, gouvernance",
            ],
            [
              "Périmètre",
              "1 projet (du cadrage au bilan)",
              "N projets (vue transverse)",
            ],
            [
              "Rattachement",
              "Direction métier ou DSI",
              "Direction générale, DSI, transformation",
            ],
            [
              "Autorité",
              "Hiérarchique ou fonctionnelle",
              "Fonctionnelle — influence sans hiérarchie",
            ],
            [
              "Livrables",
              "Produit / solution livrée",
              "Vision consolidée du portefeuille",
            ],
          ]}
        />

        <Text size="md">
          <a
            href="#"
            className="text-primary hover:underline focus-visible:underline focus-visible:outline-none"
          >
            Télécharger le template complet (PDF)
          </a>
        </Text>

        <IllustrationFrame
          tone="warm"
          src="https://placehold.co/1125x731/e2e8f0/64748b?text=Boardroom+illustration"
          alt="Caricature d'une réunion de direction discutant d'un projet"
        />
      </>
    ),
  },
};

/**
 * Short — minimal composition: intro paragraph + H2 + paragraph + Quote.
 */
export const Short: Story = {
  args: {
    children: (
      <>
        <Text size="md">
          Un court article de blog pour illustrer le rythme vertical du
          wrapper. L&apos;intro pose le sujet, l&apos;H2 introduit le
          premier concept.
        </Text>
        <Heading level={2} gradient="primary" align="left">
          Premier concept clé
        </Heading>
        <Text size="md">
          Le corps du premier point. Le wrapper applique un espacement
          cohérent entre chaque primitive, sans qu&apos;aucun enfant
          n&apos;ait besoin d&apos;ajouter de margin manuel.
        </Text>
        <Quote align="left" authorAvatarAlt="">
          Une citation courte pour ponctuer le propos.
        </Quote>
      </>
    ),
  },
};
