import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "@/ds/blocks/Hero";
import { LogosBar } from "@/ds/primitives/LogosBar";
import { ValuePropositionFrame } from "@/ds/blocks/ValuePropositionFrame";
import { ComparisonFrame } from "@/ds/blocks/ComparisonFrame";
import { FeatureFrame } from "@/ds/blocks/FeatureFrame";
import { TestimonialsFrame } from "@/ds/blocks/TestimonialsFrame";
import { FaqFrame } from "@/ds/blocks/FaqFrame";
import { CtaFrame } from "@/ds/blocks/CtaFrame";
import { Footer } from "@/ds/blocks/Footer";
import { FeatureCard } from "@/ds/primitives/FeatureCard";
import { CardCta } from "@/ds/primitives/CardCta";
import { IconIllustration } from "@/ds/primitives/IconIllustration";
import { AnimateOnScroll } from "@/ds/primitives/AnimateOnScroll";
import {
  CalendarDayIcon,
  BullseyeArrowIcon,
  StopwatchIcon,
  SuitcaseIcon,
  BoltLightningIcon,
  CommentsIcon,
  LockKeyholeIcon,
  CircleCheckIcon,
} from "@/ds/primitives/icons/illustration-icons";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="md">
      {children}
    </IconIllustration>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const navItems = [
  { label: "Solutions", hasDropdown: true },
  { label: "Produit", hasDropdown: true },
  { label: "Ressources", hasDropdown: true },
  { label: "Témoignages", href: "#" },
  { label: "Intégrations", href: "#" },
  { label: "Nouveautés", href: "#" },
  { label: "Le Quarter Plan", href: "#" },
  { label: "Intégration teams", href: "#" },
];

const logos = [
  { src: "/assets/logos/kiabi.png", alt: "Kiabi", width: 96, height: 40 },
  { src: "/assets/logos/valrhona.png", alt: "Valrhona", width: 130, height: 40 },
  { src: "/assets/logos/intuis.png", alt: "Intuis", width: 70, height: 40 },
  { src: "/assets/logos/altavia.svg", alt: "Altavia", width: 110, height: 40 },
  { src: "/assets/logos/sncf.svg", alt: "SNCF", width: 80, height: 40 },
];

const footerColumns = [
  {
    title: "Entreprise",
    links: [
      { label: "Pourquoi AirSaas ?" },
      { label: "Cookies" },
      { label: "Conditions d'utilisation" },
      { label: "Mentions légales" },
      { label: "Charte de confidentialité" },
      { label: "Kit média" },
      { label: "API AirSaas" },
      { label: "Plan du site" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Les Pro. de la Transfo." },
      { label: "Le blog d'AirSaas" },
      { label: "La conduite de projet" },
      { label: "Portfolio project Management" },
      { label: "Témoignages clients" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Management de portefeuille projet" },
      { label: "Flash report automatisé" },
      { label: "Outil PPM" },
      { label: "Outil de pilotage projet" },
      { label: "Plan stratégique" },
      { label: "Portfolio management" },
      { label: "Revue de portefeuille" },
      { label: "Tableau de bord DSI" },
    ],
  },
  {
    title: "Le Quarter Plan & les cadres méthodologiques",
    links: [{ label: "AirSaas, le Quarter Plan et l'effectuation" }],
    sections: [
      {
        title: "Alternative à",
        links: [{ label: "Sciforma" }, { label: "Planview Portfolio" }],
      },
    ],
  },
];

const faqItems = [
  {
    question: "Est-ce que ça suffit pour un vrai capacitaire ?",
    answer:
      "Oui, pour savoir ce qu'il est possible de faire au niveau macro. C'est ce qu'il manque au top management pour prioriser. Pour le micro-planning, gardez vos outils opérationnels.",
  },
  {
    question: "Comment gérer des compétences différentes dans une équipe ?",
    answer:
      "AirSaas vous permet de définir des profils de compétences par équipe et de visualiser la disponibilité par compétence. L'IA adapte automatiquement le découpage selon les compétences de chaque équipe.",
  },
  {
    question: "Combien de temps pour être opérationnel ?",
    answer:
      "En moyenne 4 semaines. Notre équipe vous accompagne dans la configuration initiale, l'import de vos données et la formation de vos équipes.",
  },
  {
    question: "AirSaas remplace-t-il nos outils existants ?",
    answer:
      "Non, AirSaas se positionne au-dessus de vos outils opérationnels (Jira, Monday, Asana...). Il agrège les données pour fournir une vue macro au management.",
  },
];

const testimonials = [
  {
    quote:
      "Depuis qu'on utilise AirSaas, nos comités de pilotage sont enfin productifs. On a une vue claire sur tous nos projets stratégiques.",
    name: "Sophie Lefèvre",
    role: "DSI @Kiabi",
  },
  {
    quote:
      "AirSaas s'adapte à nos processus, pas l'inverse. Mise en place rapide et adoption immédiate par les équipes.",
    name: "Marc Durand",
    role: "DG @Valrhona",
  },
  {
    quote:
      "AirSaas est le rouage qui fait tourner notre gouvernance de projets. Visibilité totale pour le COMEX.",
    name: "Claire Martin",
    role: "PMO @Decathlon",
  },
];

/* ------------------------------------------------------------------ */
/*  Composition                                                        */
/* ------------------------------------------------------------------ */

function CapacityPlanningPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <Hero
        navItems={navItems}
        navCtaLabel="Demander une démo"
        navCtaHref="#"
        loginLabel="Login"
        loginHref="#"
        topTag={{ label: "Capacity Planning simplifié", variant: "muted" }}
        headline="Vos équipes sont surchargées ? C'est normal :"
        headlineGradient="personne ne sait ce qu'elles peuvent vraiment faire."
        subtitle='AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.'
        bottomTags={[
          { label: "Opérationnel en 1 mois", variant: "success" },
          { label: "Accompagnement premium inclus", variant: "success" },
        ]}
        primaryCta={{ label: "Réservez une démo", href: "#" }}
        secondaryCta={{
          label: "Découvrir l'outil PPM en vidéo (5 min)",
          href: "#",
        }}
        illustrationSrc="https://placehold.co/1457x857/e8eafc/3a51e2?text=Capacity+Planning+Screenshot"
        illustrationAlt="AirSaas Capacity Planning screenshot"
      />

      {/* Logos bar */}
      <AnimateOnScroll animation="fade" duration={500}>
        <LogosBar logos={logos} />
      </AnimateOnScroll>

      {/* Value Proposition — Les chiffres */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="light"
          tag="Capacity Planning & Gouvernance de portefeuille"
          titleHighlight="Les chiffres"
          title="qui vous feront adopter AirSaas"
          subtitle="Un déploiement simple et accompagné, pas un projet IT de 6 mois."
        >
          <FeatureCard
            icon={<Icon><CalendarDayIcon /></Icon>}
            title="1 mois"
            description="Pour être opérationnel. Pas un projet IT de 6 mois."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><BullseyeArrowIcon /></Icon>}
            title="100%"
            description="Des projets lancés avec capacité validée."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><StopwatchIcon /></Icon>}
            title="+60%"
            description="Des projets on time & on budget."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><SuitcaseIcon /></Icon>}
            title="10min"
            description="De l'idée au scénario capacitaire."
            className="flex-1"
          />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* Comparison — Les vrais problèmes */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ComparisonFrame
          title="Les vrais problèmes du capacity planning"
          subtitle="Ce que vous vivez au quotidien, on le connaît par cœur."
          items={[
            {
              value: 1,
              description: (
                <>
                  Les outils existants sont <strong>trop complexes</strong> →
                  personne ne les maintient
                </>
              ),
            },
            {
              value: 2,
              description: (
                <>
                  Vous avez un Excel à <strong>1200 colonnes</strong> que vous
                  seul comprenez
                </>
              ),
            },
            {
              value: 3,
              description: (
                <>
                  Impossible de répondre à :{" "}
                  <strong>&quot;Peut-on prendre ce projet ?&quot;</strong>
                </>
              ),
            },
            {
              value: 4,
              description: (
                <>
                  Vos prévisions sont <strong>précisément fausses</strong>{" "}
                  plutôt qu&apos;approximativement justes
                </>
              ),
            },
            {
              value: 5,
              description: (
                <>
                  Le PMO devrait gérer la capacité. Mais il est{" "}
                  <strong>saturé par le quotidien</strong> pour s&apos;en
                  occuper.
                </>
              ),
            },
            {
              value: 6,
              description: (
                <>
                  De l&apos;idée floue à un projet positionné, ça prend{" "}
                  <strong>des mois.</strong> Réunions, allers-retours,
                  estimations au doigt mouillé...
                </>
              ),
            },
          ]}
        />
      </AnimateOnScroll>

      {/* Feature — Agent IA Brief projet */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Intelligence Artificielle"
          titleHighlight="Agent IA"
          title="Brief projet"
          description='Quand une demande arrive floue ("on veut un truc"), l&apos;agent IA mène l&apos;entretien, collecte les informations critiques et transforme chaque demande en brief clair et comparable.'
          checklist={[
            "Entretien guidé par l'IA",
            "Brief structuré selon vos templates",
            "Demandes comparables entre elles",
            "Dites non plus tôt, lancez moins de projets... mais mieux",
          ]}
          ctaLabel="Découvrir"
          imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Agent+IA+Brief"
        />
      </AnimateOnScroll>

      {/* Feature — Agent IA Découpage projet */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Intelligence Artificielle"
          titleHighlight="Agent IA"
          title="Découpage projet"
          description="L'IA découpe automatiquement vos projets par quarter et par équipe. Elle connaît vos équipes : ce qu'elles savent faire, ce qu'elles ne font pas, leur vélocité passée."
          checklist={[
            "Découpage par quarter et par équipe",
            "Adapté aux compétences de chaque équipe",
            "Basé sur la vélocité historique",
            "Suggestions réalistes, pas théoriques",
          ]}
          ctaLabel="En savoir plus"
          imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Agent+IA+Découpage"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* Value Proposition dark — De l'idée au scénario */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="dark"
          titleHighlight="De l'idée au scénario :"
          title="10 minutes"
          subtitle="Avant, ça prenait des mois. Maintenant, les 3 agents IA font le travail."
        >
          <FeatureCard
            icon={<Icon><CalendarDayIcon /></Icon>}
            title="Idée floue"
            description="Une demande arrive, même vague."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><BullseyeArrowIcon /></Icon>}
            title="Brief"
            description="L'IA structure la demande en brief clair."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><StopwatchIcon /></Icon>}
            title="Découpage"
            description="Découpage automatique par quarter et équipe."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><SuitcaseIcon /></Icon>}
            title="Estimation"
            description="Scénario capacitaire en 10 minutes."
            className="flex-1"
          />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* Feature — Vue capacitaire par équipe (1) */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Clarté immédiate"
          titleHighlight="Vue capacitaire"
          title="par équipe"
          description="En un clin d'œil, voyez si vos équipes sont dans les clous ou dans les choux. La base d'une discussion pragmatique pour arbitrer."
          checklist={[
            "Vue par équipe et par trimestre",
            "Alerte surcharge automatique",
            "Drill-down par projet",
            "Comparaison capacité vs charge",
          ]}
          imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Vue+Capacitaire"
        />
      </AnimateOnScroll>

      {/* Feature — Agent IA Découpage projet (2) */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Intelligence Artificielle"
          titleHighlight="Agent IA"
          title="Découpage projet"
          description="L'IA découpe automatiquement vos projets par quarter et par équipe. Elle connaît vos équipes : ce qu'elles savent faire, ce qu'elles ne font pas, leur vélocité passée."
          checklist={[
            "Découpage par quarter et par équipe",
            "Adapté aux compétences de chaque équipe",
            "Basé sur la vélocité historique",
            "Suggestions réalistes, pas théoriques",
          ]}
          imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Découpage+Projet"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* Feature — Vue capacitaire par équipe (3) */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Clarté immédiate"
          titleHighlight="Vue capacitaire"
          title="par équipe"
          description="En un clin d'œil, voyez si vos équipes sont dans les clous ou dans les choux. La base d'une discussion pragmatique pour arbitrer."
          checklist={[
            "Vue par équipe et par trimestre",
            "Alerte surcharge automatique",
            "Drill-down par projet",
            "Comparaison capacité vs charge",
          ]}
          imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Vue+Capacitaire"
        />
      </AnimateOnScroll>

      {/* Feature — Agent IA Découpage projet (4) */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Intelligence Artificielle"
          titleHighlight="Agent IA"
          title="Découpage projet"
          description="L'IA découpe automatiquement vos projets par quarter et par équipe. Elle connaît vos équipes : ce qu'elles savent faire, ce qu'elles ne font pas, leur vélocité passée."
          checklist={[
            "Découpage par quarter et par équipe",
            "Adapté aux compétences de chaque équipe",
            "Basé sur la vélocité historique",
            "Suggestions réalistes, pas théoriques",
          ]}
          imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Découpage+Projet"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* Feature — Vue capacitaire par équipe (5) */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Clarté immédiate"
          titleHighlight="Vue capacitaire"
          title="par équipe"
          description="En un clin d'œil, voyez si vos équipes sont dans les clous ou dans les choux. La base d'une discussion pragmatique pour arbitrer."
          checklist={[
            "Vue par équipe et par trimestre",
            "Alerte surcharge automatique",
            "Drill-down par projet",
            "Comparaison capacité vs charge",
          ]}
          imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Vue+Capacitaire"
        />
      </AnimateOnScroll>

      {/* Value Proposition — Notre parti pris */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="dark"
          titleHighlight="Notre parti pris"
          title=""
          subtitle='"Approximativement juste plutôt que précisément faux"'
        >
          <FeatureCard
            icon={<Icon><BullseyeArrowIcon /></Icon>}
            title="Macro, pas micro"
            description="Capacitaire au trimestre, par équipe. Pas à la tâche et à la personne."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><BoltLightningIcon /></Icon>}
            title="Maintenable"
            description="Parce qu'un capacitaire trop précis finit toujours à la poubelle."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><CommentsIcon /></Icon>}
            title="Actionnable"
            description='Répondez enfin à "peut-on prendre ce projet ?" avec des données.'
            className="flex-1"
          />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* Testimonials */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <TestimonialsFrame
          title="Ils ont simplifié leur"
          titleHighlight="capacity planning"
          testimonials={testimonials}
        />
      </AnimateOnScroll>

      {/* Value Proposition — Sécurité au top */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="light"
          tag="AirSaas passe la porte des DSI les plus exigeantes."
          titleHighlight="Sécurité"
          title="au top"
        >
          <FeatureCard
            icon={<Icon><BullseyeArrowIcon /></Icon>}
            title="ISO 27001"
            description="Certifié"
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><CalendarDayIcon /></Icon>}
            title="Hébergé en France"
            description="Infrastructure souveraine."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><CircleCheckIcon /></Icon>}
            title="Pentest"
            description="Résultats sur demande"
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><LockKeyholeIcon /></Icon>}
            title="SSO / SAML"
            description="Intégration AD"
            className="flex-1"
          />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* Value Proposition — Opérationnel en 1 mois */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="dark"
          title="Opérationnel en 1 mois"
          subtitle="Un déploiement simple et accompagné, pas un projet IT de 6 mois."
        >
          <FeatureCard
            icon={<Icon><CalendarDayIcon /></Icon>}
            title="Semaine 1"
            description="Configuration et import de vos données."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><BullseyeArrowIcon /></Icon>}
            title="Semaine 2"
            description="Paramétrage des équipes et compétences."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><StopwatchIcon /></Icon>}
            title="Semaine 3"
            description="Formation et premiers scénarios."
            className="flex-1"
          />
          <FeatureCard
            icon={<Icon><SuitcaseIcon /></Icon>}
            title="Semaine 4"
            description="Autonomie complète, premier COMEX."
            className="flex-1"
          />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* FAQ */}
      <AnimateOnScroll animation="fade-up" duration={600}>
        <FaqFrame items={faqItems} />
      </AnimateOnScroll>

      {/* CTA */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Arrêtez de lancer des projets sans capacité"
          subtitle="Découvrez comment AirSaas simplifie votre capacity planning."
        >
          <CardCta
            title="Réserver une démo"
            description='Enfin un outil pour dire "non" avec des données.'
            ctaLabel="Réservez une démo"
            className="flex-1"
          />
          <CardCta
            title="Découvrir le guide"
            description="Le capacity planning sans prise de tête."
            ctaLabel="Télécharger le guide"
            className="flex-1"
          />
        </CtaFrame>
      </AnimateOnScroll>

      {/* Footer */}
      <AnimateOnScroll animation="fade-up" duration={600}>
        <Footer columns={footerColumns} />
      </AnimateOnScroll>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Storybook meta                                                     */
/* ------------------------------------------------------------------ */

const meta = {
  title: "Compositions/CapacityPlanningPage",
  component: CapacityPlanningPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CapacityPlanningPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
