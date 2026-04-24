import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BlogPostPage from "./BlogPostPage";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Quote } from "@/components/library-design/ui/Quote";
import { ListInline } from "@/components/library-design/ui/ListInline";
import { TableFrame } from "@/components/library-design/ui/TableFrame";
import { IllustrationFrame } from "@/components/library-design/ui/IllustrationFrame";

const meta = {
  title: "Pages/BlogPostPage",
  component: BlogPostPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BlogPostPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Shared mock content (French locale, PMO article) ─── */

const FR_AUTHOR = {
  name: "Bertran RUIZ",
  avatarSrc: "https://placehold.co/80x80/3c51e2/ffffff?text=BR",
  avatarAlt: "Portrait de Bertran RUIZ",
  categoryLabel: "La newsletter des DSI",
  categoryHref: "/blog/newsletter-dsi",
  publishedDate: "12/10/2021",
  publishedByLabel: "Publié par",
  inLabel: "dans",
  datePrefix: "Le",
};

const FR_TOC_ITEMS = [
  { label: "L'explosion du nombre de projets transverses", href: "#explosion" },
  { label: "L'échec du PMO contrôle", href: "#echec" },
  { label: "Le nouveau rôle du métier de PMO", href: "#nouveau-role" },
  { label: "Quelles différences entre chef de projet et PMO ?", href: "#chef-projet-vs-pmo" },
  { label: "Quel est le rôle du PMO vis-à-vis du Codir ?", href: "#pmo-codir" },
  { label: "Pourquoi mettre en place un PMO ?", href: "#pourquoi-pmo" },
  { label: "Comment mettre en place un PMO : les étapes clés", href: "#comment-mettre-en-place" },
  { label: "Le reporting PMO : comment le réussir", href: "#reporting-pmo" },
  { label: "FAQ : les questions fréquentes sur le PMO", href: "#faq-pmo" },
];

const FR_FAQ_ITEMS = [
  {
    question: "Quelle est la différence entre un PMO et un chef de projet ?",
    answer:
      "Le chef de projet pilote UN projet du cadrage au bilan. Le PMO orchestre l'ensemble du portefeuille : méthodes, gouvernance, reporting consolidé pour la direction.",
  },
  {
    question: "Combien de temps pour mettre en place un PMO ?",
    answer:
      "Comptez 3 à 6 mois pour un PMO opérationnel sur une organisation de taille moyenne (50-500 collaborateurs). L'important est d'itérer sur 2-3 templates clés plutôt que de viser l'exhaustivité dès le départ.",
  },
  {
    question: "Faut-il un PMO dans toutes les entreprises ?",
    answer:
      "Non. Un PMO se justifie dès que vous avez 10+ projets transverses simultanés ou que la direction manque de visibilité sur l'avancement global. En deçà, un simple comité de pilotage mensuel suffit souvent.",
  },
  {
    question: "PMO interne ou externalisé ?",
    answer:
      "Le PMO stratégique doit être interne — il incarne la culture projet de l'organisation. Un PMO externalisé peut aider au démarrage (méthodes, templates) mais ne remplace pas un ownership long-terme côté DSI / DG.",
  },
  {
    question: "Quels indicateurs suivre dans un reporting PMO ?",
    answer:
      "3 familles : avancement (jalons tenus, écarts budget/délai), capacité (charge vs disponibilité par équipe), et création de valeur (ROI projet, satisfaction sponsor). Moins de 10 indicateurs au total pour rester lisible.",
  },
];

const FR_RELATED = [
  { label: "Chef de projet vs PMO : rôles et différences clés", href: "/blog/chef-projet-vs-pmo" },
  { label: "Comment mettre en place un PMO en 30 jours", href: "/blog/pmo-30-jours" },
  { label: "Les 7 indicateurs clés d'un reporting PMO efficace", href: "/blog/indicateurs-pmo" },
  { label: "PMO vs bureau des projets : quelles différences ?", href: "/blog/pmo-vs-bureau-projets" },
  { label: "Le rôle du PMO vis-à-vis du Codir", href: "/blog/pmo-codir" },
  { label: "FAQ : les questions fréquentes sur le PMO", href: "/blog/faq-pmo" },
  { label: "Étude de cas : transformation d'un portefeuille de 40 projets", href: "/blog/cas-portefeuille-40-projets" },
];

const TRENDING_CARD = {
  thumbnailSrc: "https://placehold.co/600x400/3c51e2/ffffff?text=Article+PMO",
  thumbnailAlt: "Aperçu de l'article PMO",
  date: "Le 12/10/2021",
  title: "Mes 12 leçons de 2023 pour les DSI qui veulent changer de niveau de jeu",
  excerpt:
    "L'essentiel à savoir sur le Copil projet : missions, composition, erreurs fréquentes à éviter et clés de succès",
  href: "/blog/mes-12-lecons",
  authors: [
    {
      name: "Bertran RUIZ",
      avatarSrc: "https://placehold.co/80x80/3c51e2/ffffff?text=BR",
      avatarAlt: "Portrait de Bertran RUIZ",
    },
  ],
  categoryLabel: "La newsletter des DSI",
  categoryHref: "/blog/newsletter-dsi",
  publishedByLabel: "Publié par",
  inLabel: "dans",
};

const FR_FOOTER_COLUMNS = [
  {
    title: "Produit",
    links: [
      { label: "Revue de portefeuille", href: "/revue-portefeuille" },
      { label: "Capacitaire", href: "/capacitaire" },
      { label: "Reporting automatisé", href: "/reporting" },
      { label: "Priorisation", href: "/priorisation" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Pour le PMO", href: "/pmo" },
      { label: "Pour la DSI", href: "/dsi" },
      { label: "Pour la direction", href: "/direction" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Podcast", href: "/podcast" },
      { label: "Événements", href: "/evenements" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Carrières", href: "/carrieres" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/* ─── Rich-text article body (composed of DS primitives) ─── */

const FR_ARTICLE_BODY = (
  <>
    <Text size="md">
      Le PMO est devenu incontournable dans les organisations qui gèrent
      plusieurs projets en parallèle. Pourtant, c&apos;est un métier souvent
      mal compris&nbsp;: ni chef de projet, ni contrôleur, ni secrétaire de
      direction. Alors c&apos;est quoi, concrètement, un PMO&nbsp;? Ce guide
      te donne les clés pour comprendre ce rôle, son positionnement, et
      comment le mettre en place efficacement.
    </Text>

    <Heading level={2} gradient="primary" align="left">
      PMO&nbsp;: définition et signification
    </Heading>

    <Text size="md">
      <strong className="font-bold">PMO</strong> signifie{" "}
      <strong className="font-bold">Project Management Office</strong>, soit
      «&nbsp;Bureau de gestion de projets&nbsp;» en français. C&apos;est une
      fonction (ou une équipe) qui structure la gouvernance du portefeuille
      de projets d&apos;une organisation.
    </Text>

    <Quote align="left" authorAvatarAlt="">
      <strong className="font-bold not-italic">En une phrase&nbsp;:</strong>{" "}
      le PMO est la personne (ou l&apos;équipe) qui s&apos;assure que les
      bons projets sont lancés, avec les bonnes méthodes, et que la
      direction a une visibilité claire sur l&apos;avancement global.
    </Quote>

    <Text size="md">
      Le PMO intervient sur trois niveaux&nbsp;:
    </Text>

    <Heading level={3} gradient="primary" align="left">
      1 • La méthode
    </Heading>
    <Text size="md">
      Harmoniser les pratiques de gestion de projet entre les équipes. Tout
      le monde parle le même langage.
    </Text>

    <Heading level={3} gradient="primary" align="left">
      2 • La gouvernance
    </Heading>
    <Text size="md">
      Structurer les instances de décision (comités de pilotage, revues de
      portefeuille) pour que le Comex puisse arbitrer avec des données fiables.
    </Text>

    <Heading level={3} gradient="primary" align="left">
      3 • La montée en compétences
    </Heading>
    <Text size="md">
      Faire monter les équipes en compétences projet. Le PMO forme, outille
      et facilite — il n&apos;exécute pas à la place des équipes.
    </Text>

    <Heading level={2} gradient="primary" align="left">
      L&apos;explosion du nombre de projets transverses
    </Heading>

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
        href="/resources/template-pmo.pdf"
        className="text-primary hover:underline focus-visible:underline focus-visible:outline-none"
      >
        Télécharger le template complet (PDF)
      </a>
    </Text>

    <IllustrationFrame
      tone="warm"
      src="https://placehold.co/1125x731/FFEFC6/3c51e2?text=OK+so+we+have+our+decision"
      alt="Caricature d'une réunion de direction discutant d'un projet"
    />
  </>
);

/* ─── Default story — full composition matching Figma 303-1015 ─── */

export const Default: Story = {
  args: {
    title: "PMO (Project Management Office) : le guide complet pour comprendre et mettre en place ce rôle clé",
    topTagLabel: "Le Blog",
    author: FR_AUTHOR,
    heroImageSrc: "https://placehold.co/1150x450/e8ebfe/3c51e2?text=PMO+cover+illustration",
    heroImageAlt: "Illustration en-tête : cadrage d'un projet PMO",

    tableOfContents: {
      title: "SOMMAIRE",
      items: FR_TOC_ITEMS,
    },

    articleBody: FR_ARTICLE_BODY,

    faq: {
      title: "Questions",
      titleHighlight: "fréquentes",
      items: FR_FAQ_ITEMS,
    },

    cta: {
      titlePrefix: "Tu veux structurer ton ",
      titleHighlight: "PMO sans usine à gaz",
      titleSuffix: " ?",
      subtitle:
        "Découvre comment 120+ équipes pilotent leur portefeuille projet avec AirSaas en moins de 30 minutes par semaine.",
      ctaLabel: "Réserver une démo",
      ctaHref: "/demo",
    },

    relatedArticles: {
      title: "Pour aller plus loin",
      items: FR_RELATED,
    },

    trendingGrid: {
      title: "Découvrir plus d'articles",
      background: "alt",
      articles: [
        { ...TRENDING_CARD, href: "/blog/article-1" },
        { ...TRENDING_CARD, href: "/blog/article-2" },
        { ...TRENDING_CARD, href: "/blog/article-3" },
      ],
      viewAllHref: "/blog",
      viewAllLabel: "Voir tous les articles",
    },

    footerColumns: FR_FOOTER_COLUMNS,
    copyright:
      "Made with love in France | © 2025 AirSaas · Mentions légales · Confidentialité",
    copyrightIcon: <span aria-label="Français">🇫🇷</span>,
  },
};

/* ─── Minimal story — hero + body + footer only (no optional sections) ─── */

export const Minimal: Story = {
  args: {
    title: "Article court : les 3 clés d'un comité de pilotage réussi",
    author: FR_AUTHOR,
    heroImageSrc: "https://placehold.co/1150x450/e8ebfe/3c51e2?text=Cover+image",
    heroImageAlt: "Illustration de couverture",
    articleBody: (
      <>
        <Text size="md">
          Un comité de pilotage efficace se prépare en 15 minutes et se tient
          en 30 minutes. Voici comment.
        </Text>
        <Heading level={2} gradient="primary" align="left">
          1. Préparer un ordre du jour en 3 points
        </Heading>
        <Text size="md">
          Trois sujets maximum&nbsp;: avancement, décisions à prendre, risques
          à escalader. Tout le reste passe en asynchrone.
        </Text>
        <Heading level={2} gradient="primary" align="left">
          2. Imposer un timer
        </Heading>
        <Text size="md">
          10 minutes par sujet, pas plus. Si un débat déborde, on tranche sur
          le process (go / no-go / follow-up), pas sur le fond.
        </Text>
        <Heading level={2} gradient="primary" align="left">
          3. Décisions tracées en direct
        </Heading>
        <Text size="md">
          Chaque décision est actée dans un outil partagé avant la fin de la
          réunion. Zéro compte-rendu a posteriori.
        </Text>
      </>
    ),
    footerColumns: FR_FOOTER_COLUMNS,
    copyright:
      "Made with love in France | © 2025 AirSaas · Mentions légales · Confidentialité",
    copyrightIcon: <span aria-label="Français">🇫🇷</span>,
  },
};
