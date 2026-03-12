"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { fraunces } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "quiet";
type FeatureTone = "ivory" | "blue" | "ink";

type ComparisonRow = {
  left: string;
  right: string;
};

type Story = {
  name: string;
  role: string;
  company?: string;
  sector: string;
  employees: string;
  initials: string;
  href: string;
};

type Testimonial = {
  name: string;
  role: string;
  initials: string;
  text: string;
  href: string;
};

type Benefit = {
  icon: string;
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const SECTIONS = [
  "Button",
  "HeroAnimated",
  "LogoBar",
  "Stats",
  "SectionHeading",
  "FeatureRow",
  "CtaBanner",
  "ComparisonGrid",
  "QuoteCards",
  "TestimonialCards",
  "CustomerStories",
  "FeatureNumberedList",
  "HeroSplit",
  "FaqAccordion",
  "ComparisonTable",
  "HeroTabbed",
  "LpStats",
  "PainPoints",
  "FeatureChecklist",
  "BenefitsGrid",
  "TrustBadges",
  "HowItWorks",
  "LpFinalCta",
];

const logos = [
  { src: "/assets/images/Kiabi_logo.png", alt: "Kiabi" },
  { src: "/assets/images/Spendesk_logo.png", alt: "Spendesk" },
  { src: "/assets/images/valrhona-logo.png", alt: "Valrhona" },
  { src: "/assets/images/Intuis_logo.png", alt: "Intuis" },
  { src: "/assets/images/Cargoone_logo.png", alt: "Cargo.one" },
  { src: "/assets/images/Mytraffic_logo.png", alt: "MyTraffic" },
];

const heroAnimatedTabs = [
  {
    label: "Portfolio",
    image: "/assets/images/Portfolio%20project%20priority.webp",
    caption: "Décidez quoi accélérer, quoi geler et quoi arbitrer.",
  },
  {
    label: "Quarter plan",
    image: "/assets/images/Quarter%20plan.webp",
    caption: "Cadrez le trimestre avec la même vision côté métier et delivery.",
  },
  {
    label: "Capacitaire",
    image: "/assets/images/Capacity%20screen.webp",
    caption: "Revenez à une réalité de charge lisible et partagée.",
  },
  {
    label: "Roadmap",
    image: "/assets/images/Roadmap%20page%20fr.webp",
    caption: "Faites exister la roadmap comme un objet de gouvernance.",
  },
];

const heroTabbedTabs = [
  {
    label: "Comité",
    image: "/assets/images/Flash%20report%20ppt.webp",
    caption: "Une matière lisible pour préparer les arbitrages sans retraitement.",
  },
  {
    label: "Direction",
    image: "/assets/images/Copil%20-%20%20Bilan-min.png",
    caption: "Des signaux simples, partagés et actionnables pour la direction.",
  },
  {
    label: "Opérations",
    image: "/assets/images/Portfolio%20project%20timeline%20view.webp",
    caption: "Une vue d'orchestration pour piloter le réel, pas un reporting mort.",
  },
];

const featureRows = [
  {
    badge: "PORTEFEUILLE",
    heading: "Visualisez l'avancement de tous vos projets",
    description:
      "Suivez les arbitrages, les risques et les dérives sans retomber dans un cockpit trop technique. La lecture doit sembler immédiate, presque institutionnelle.",
    image: "/assets/images/Portfolio%20project%20timeline%20view.webp",
    imageAlt: "Vue timeline du portefeuille projet",
    points: [
      "Une hiérarchie visuelle plus claire pour les statuts.",
      "Des encadrements plus premium que purement fonctionnels.",
      "Une mise en scène produit plus digne d'un support de direction.",
    ],
    tone: "ivory" as const,
  },
  {
    badge: "ROADMAP",
    heading: "Partagez simplement les roadmaps à toute l'organisation",
    description:
      "La roadmap devient une pièce de langage stratégique. Moins de décor SaaS, plus de tenue, plus d'espace, plus de crédibilité dans la manière de présenter la progression.",
    image: "/assets/images/Roadmap%20page%20fr.webp",
    imageAlt: "Roadmap page",
    points: [
      "Grandes marges et rythme éditorial.",
      "Accent bleu présent, sans dominer toute la section.",
      "Asymétrie discrète pour sortir du split trop standard.",
    ],
    reversed: true,
    tone: "blue" as const,
  },
  {
    badge: "CAPACITAIRE",
    heading: "Un capacity planning par équipe simple et actionnable",
    description:
      "Le message visuel doit évoquer la maîtrise et non la surcharge. On remplace l'effet 'dashboard dans une boîte' par une surface pilotée, cadrée et plus sophistiquée.",
    image: "/assets/images/Capacity%20screen.webp",
    imageAlt: "Écran capacitaire par équipe",
    points: [
      "Bloc texte plus dense et structuré.",
      "Frame produit plus élégante et plus statutaire.",
      "Contrastes plus nets entre signal faible et signal fort.",
    ],
    tone: "ink" as const,
  },
  {
    badge: "PRIORISATION",
    heading: "Priorisez avec votre comité de direction",
    description:
      "L'objectif est de faire ressentir le sérieux d'un outil de décision. Pas une grille de comparaison marketing, mais un support lisible pour arbitrer.",
    image: "/assets/images/Portfolio%20project%20priority.webp",
    imageAlt: "Priorisation options",
    points: [
      "Cadrage plus ‘boardroom’.",
      "Typo plus hiérarchisée sur le texte d'accompagnement.",
      "Micro-détails premium sur les séparateurs, badges et boutons.",
    ],
    reversed: true,
    tone: "ivory" as const,
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    left: "Reporting manuel et langage trop technique pour la direction",
    right: "Vue priorisée, lisible et exploitable pour arbitrer vite",
  },
  {
    left: "Roadmaps qui changent de format selon les équipes",
    right: "Narration unifiée du portefeuille et des décisions",
  },
  {
    left: "Une impression d'outil opérationnel, pas de plateforme stratégique",
    right: "Une présence visuelle plus statutaire et plus rassurante",
  },
];

const quoteCards = [
  {
    quote: "Hub de pilotage donnant le bon niveau de visibilité",
    logo: "/assets/images/logo-alliancy-monotone.png",
    logoAlt: "Alliancy",
  },
  {
    quote: "Une nouvelle manière d'embarquer les équipes",
    logo: "/assets/images/LePoint-monotone.png",
    logoAlt: "Le Point",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Thomas S.",
    role: "DSI",
    initials: "TS",
    text: "On est enfin sortis des slides bricolées. La gouvernance tient mieux, parce que l'outil porte davantage le discours.",
    href: "#",
  },
  {
    name: "Marie-Odile L.",
    role: "CDIO",
    initials: "ML",
    text: "Le produit paraît plus mature. C'est la même promesse métier, mais avec une présence bien plus forte face à la direction.",
    href: "#",
  },
  {
    name: "Clément R.",
    role: "ICT Manager",
    initials: "CR",
    text: "Le rendu donne plus confiance. On sent une plateforme de pilotage, pas juste un logiciel de suivi.",
    href: "#",
  },
];

const stories: Story[] = [
  {
    name: "Laurent Citton",
    role: "DSI Groupe",
    company: "Groupe Picoty",
    sector: "Énergie",
    employees: "1300",
    initials: "LC",
    href: "#",
  },
  {
    name: "Émilie Lecart",
    role: "CIO Office",
    company: "Accor",
    sector: "Hôtellerie",
    employees: "40000",
    initials: "EL",
    href: "#",
  },
  {
    name: "Sébastien Louyot",
    role: "Group CIO",
    company: "Altavia",
    sector: "Marketing",
    employees: "2800",
    initials: "SL",
    href: "#",
  },
];

const newsletterFeatures = [
  {
    title: "Tendance des projets vitaux",
    description: "Un résumé priorisé de ce qui appelle une décision et de ce qui peut attendre.",
  },
  {
    title: "Tendance de leurs projets à eux",
    description: "Chaque dirigeant retrouve ses sujets sans avoir à relire un tableau de bord entier.",
  },
  {
    title: "Projets en retard d'actualisation",
    description: "Les zones d'ombre remontent avec plus de clarté et moins de bruit.",
  },
];

const reportingFeatures = [
  {
    title: "Export en un clic",
    description: "Préparez une matière exploitable par le COMEX sans reconstruction manuelle.",
  },
  {
    title: "Données temps réel",
    description: "La donnée reste vivante tout en étant présentée de façon plus institutionnelle.",
  },
  {
    title: "Personnalisable",
    description: "Le support s'adapte au rituel sans perdre la cohérence visuelle.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Qu'est-ce qui change dans cette direction ?",
    answer:
      "Le fond produit reste le même. Le changement porte sur la perception : plus de statut, plus de clarté, moins de réflexes SaaS standardisés.",
  },
  {
    question: "Le bleu reste-t-il central ?",
    answer:
      "Oui, mais utilisé comme signature et comme tension visuelle, pas comme couche uniforme sur tout le site.",
  },
  {
    question: "Peut-on garder les mêmes composants ?",
    answer:
      "Oui, l'idée est bien de rester dans une logique de système paramétrable. On fait évoluer la grammaire visuelle et non le principe de réutilisation.",
  },
];

const comparisonTableRows = [
  {
    feature: "Narration portefeuille",
    description: "Présenter la décision plutôt qu'empiler de l'information",
    airsaas: "Forte",
    competitor: "Standard",
  },
  {
    feature: "Présence visuelle",
    description: "Une impression de plateforme stratégique",
    airsaas: "Signature",
    competitor: "Attendue",
  },
  {
    feature: "Lisibilité comité",
    description: "Des vues orientées arbitrage",
    airsaas: "Native",
    competitor: "Partielle",
  },
];

const painPoints = [
  "Votre portefeuille projets vit encore dans un Excel à 47 colonnes que personne n'a envie d'ouvrir.",
  "Le COMEX reçoit des supports trop techniques, trop détaillés, trop peu lisibles.",
  "On empile les projets alors que certaines équipes sont déjà saturées.",
  "La roadmap existe, mais elle ne tient pas vraiment son rôle d'alignement.",
];

const checklistItems = [
  "Vue consolidée du portefeuille",
  "Indicateurs temps réel exposés avec plus de calme",
  "Alertes automatiques sans saturation visuelle",
  "Narration plus claire pour les rituels de pilotage",
];

const benefits: Benefit[] = [
  {
    icon: "/assets/icons/icon-bolt-lightning.svg",
    title: "Simplicité",
    description: "Une page paraît plus premium quand elle enlève du bruit au lieu d'en rajouter.",
  },
  {
    icon: "/assets/icons/icon-chart-column.svg",
    title: "Visibilité",
    description: "La hiérarchie visuelle soutient mieux les signaux faibles et les décisions fortes.",
  },
  {
    icon: "/assets/icons/icon-handshake.svg",
    title: "Alignement",
    description: "Le produit parle mieux aux équipes opérationnelles comme aux instances de direction.",
  },
  {
    icon: "/assets/icons/icon-bullseye-arrow.svg",
    title: "Impact",
    description: "La marque gagne en statut sans trahir la promesse métier existante.",
  },
];

const trustBadges = [
  { title: "ISO 27001", description: "Un repère présenté comme une preuve, pas comme une pastille." },
  { title: "Hébergé en France", description: "Une information mise en scène avec retenue." },
  { title: "Pentest", description: "Une preuve de sérieux, intégrée dans un langage plus éditorial." },
  { title: "SSO / SAML", description: "Une feature de confiance, exprimée sobrement." },
];

const howItWorks = [
  {
    step: "01",
    title: "Démo personnalisée",
    description: "Comprendre les arbitrages, les rituels et les angles morts du portefeuille actuel.",
  },
  {
    step: "02",
    title: "Configuration",
    description: "Installer un cadre de pilotage clair, lisible et aligné à votre réalité d'organisation.",
  },
  {
    step: "03",
    title: "Déploiement",
    description: "Rendre la gouvernance tangible dès les premiers comités et les premières roadmaps.",
  },
];

export function DesignSystemV2({ locale }: { locale: string }) {
  const [activeHeroTab, setActiveHeroTab] = useState(0);
  const [activeTabbedHero, setActiveTabbedHero] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroTab((index) => (index + 1) % heroAnimatedTabs.length);
    }, 3600);

    return () => clearInterval(timer);
  }, []);

  const demoHref = `/${locale}/meetings-pages`;

  return (
    <div className="bg-[#f3f0e8] text-[#0f172a]">
      <div className="relative overflow-hidden border-b border-[#d8d2c4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(58,81,226,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(16,35,81,0.10),_transparent_36%)]" />
        <Container className="relative py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div className="max-w-[760px]">
              <span className="inline-flex items-center gap-3 rounded-full border border-[#cbd4ff] bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3152e0]">
                Design System V2
                <span className="h-1.5 w-1.5 rounded-full bg-[#3152e0]" />
                Synthèse validée
              </span>
              <h1
                className={cn(
                  "mt-6 max-w-[12ch] text-[3rem] leading-[0.96] tracking-[-0.045em] text-[#11192f] md:text-[5.25rem]",
                  fraunces.className,
                )}
              >
                Une V2 plus soignée, plus cadrée, plus crédible.
              </h1>
              <p className="mt-6 max-w-[640px] text-[1.05rem] leading-8 text-[#42506b] md:text-[1.14rem]">
                Cette page repart du design system actuel, conserve les mêmes familles de
                sections, et intègre les éléments validés : titres plus forts, typo plus
                signée, boutons plus vivants, cadres feature plus propres et images mieux
                alignées.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <ChallengeButton href="#HeroAnimated">Explorer la V2</ChallengeButton>
                <ChallengeButton href={demoHref} variant="secondary">
                  Réservez une démo
                </ChallengeButton>
              </div>
            </div>

            <FadeIn>
              <div className="rounded-[30px] border border-[#d9d4c8] bg-[#fbfaf7] p-7 shadow-[0_24px_70px_rgba(17,25,47,0.10)]">
                <div className="grid gap-5 text-sm text-[#46526b]">
                  <div className="border-b border-[#e4dfd5] pb-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3152e0]">
                      Principes
                    </p>
                    <p className="mt-3 leading-7">
                      Partir du design system existant, le raffiner, et en faire une
                      version nettement plus soignée sans basculer dans quelque chose de
                      trop radical.
                    </p>
                  </div>
                  <ValueStrip
                    label="Rupture"
                    value="Raffinée, pas extrême"
                    tone="blue"
                  />
                  <ValueStrip
                    label="Constante"
                    value="Bleu conservé"
                    tone="light"
                  />
                  <ValueStrip
                    label="Objectif"
                    value="Plus léchée et mieux cadrée"
                    tone="dark"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>

      <div className="border-b border-[#d8d2c4] bg-[#f7f4ee]">
        <Container className="py-7">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#66718a]">
            Same section families, different posture
          </p>
          <div className="flex flex-wrap gap-2.5">
            {SECTIONS.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="rounded-full border border-[#d8d2c4] bg-white px-3 py-1.5 text-sm text-[#28344f] transition-colors hover:border-[#3152e0] hover:text-[#3152e0]"
              >
                {section}
              </a>
            ))}
          </div>
        </Container>
      </div>

      <SectionMarker name="Button" />
      <ButtonShowcase demoHref={demoHref} />

      <SectionMarker name="HeroAnimated" />
      <HeroAnimatedShowcase
        activeIndex={activeHeroTab}
        onSelect={setActiveHeroTab}
        demoHref={demoHref}
      />

      <SectionMarker name="LogoBar" />
      <LogoBarShowcase />

      <SectionMarker name="Stats" />
      <StatsShowcase />

      <SectionMarker name="SectionHeading" />
      <SectionHeadingShowcase demoHref={demoHref} />

      <SectionMarker name="FeatureRow" />
      <div className="py-6 md:py-10">
        {featureRows.map((feature) => (
          <FeaturePanel key={feature.heading} {...feature} demoHref={demoHref} />
        ))}
      </div>

      <SectionMarker name="CtaBanner" />
      <CtaBannerShowcase demoHref={demoHref} />

      <SectionMarker name="ComparisonGrid" />
      <ComparisonGridShowcase rows={comparisonRows} />

      <SectionMarker name="QuoteCards" />
      <QuoteCardsShowcase />

      <SectionMarker name="TestimonialCards" />
      <TestimonialCardsShowcase items={testimonials} />

      <SectionMarker name="CustomerStories" />
      <CustomerStoriesShowcase stories={stories} />

      <SectionMarker name="FeatureNumberedList" />
      <FeatureNumberedListShowcase demoHref={demoHref} />

      <SectionMarker name="HeroSplit" />
      <HeroSplitShowcase demoHref={demoHref} />

      <SectionMarker name="FaqAccordion" />
      <FaqShowcase items={faqItems} />

      <SectionMarker name="ComparisonTable" />
      <ComparisonTableShowcase />

      <SectionMarker name="HeroTabbed" />
      <HeroTabbedShowcase
        activeIndex={activeTabbedHero}
        onSelect={setActiveTabbedHero}
        demoHref={demoHref}
      />

      <SectionMarker name="LpStats" />
      <LpStatsShowcase />

      <SectionMarker name="PainPoints" />
      <PainPointsShowcase />

      <SectionMarker name="FeatureChecklist" />
      <FeatureChecklistShowcase demoHref={demoHref} />

      <SectionMarker name="BenefitsGrid" />
      <BenefitsGridShowcase items={benefits} />

      <SectionMarker name="TrustBadges" />
      <TrustBadgesShowcase />

      <SectionMarker name="HowItWorks" />
      <HowItWorksShowcase />

      <SectionMarker name="LpFinalCta" />
      <FinalCtaShowcase demoHref={demoHref} />
    </div>
  );
}

function SectionMarker({ name }: { name: string }) {
  return (
    <div id={name} className="border-y border-[#d8d2c4] bg-[#f9f6ef]">
      <Container className="py-3">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-[#d8d2c4]" />
          <code className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#3152e0]">
            {name}
          </code>
          <span className="h-px flex-1 bg-[#d8d2c4]" />
        </div>
      </Container>
    </div>
  );
}

function ChallengeButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[#3152e0] text-white shadow-[6px_6px_0_rgba(49,82,224,0.16)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-[#2846cb]",
    secondary:
      "border border-[#d0d7f8] bg-white text-[#15213f] shadow-[6px_6px_0_rgba(49,82,224,0.08)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:border-[#3152e0] hover:text-[#3152e0]",
    ghost:
      "border border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/15",
    quiet:
      "border border-[#c8cedb] bg-[#f2efe7] text-[#17213b] shadow-[6px_6px_0_rgba(17,25,47,0.08)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:border-[#3152e0]",
  };

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-[16px] px-6 py-3 text-sm font-semibold transition-all duration-200",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

function ValueStrip({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "blue" | "light" | "dark";
}) {
  const tones = {
    blue: "border-[#d5ddff] bg-[#eef2ff] text-[#23346f]",
    light: "border-[#e4dfd5] bg-[#f8f4ec] text-[#24314d]",
    dark: "border-[#213053] bg-[#0f1930] text-white",
  };

  return (
    <div className={cn("rounded-[22px] border px-4 py-4", tones[tone])}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.26em] opacity-70">
        {label}
      </p>
      <p className="mt-1 text-base font-semibold">{value}</p>
    </div>
  );
}

function ButtonShowcase({ demoHref }: { demoHref: string }) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="grid gap-8 rounded-[34px] border border-[#ddd7cb] bg-white p-8 shadow-[0_24px_70px_rgba(17,25,47,0.08)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div>
              <Eyebrow>Commandes</Eyebrow>
              <DisplayTitle className="mt-4 max-w-[10ch] text-[#11192f]">
                Un bouton plus net, plus assumé, moins générique.
              </DisplayTitle>
              <p className="mt-5 max-w-[46ch] text-[1rem] leading-7 text-[#4a5670]">
                Le traitement devient plus premium par la découpe, la tension, les
                contrastes et l’économie des effets. Le bleu reste la signature sans
                réinstaller une impression de template.
              </p>
            </div>

            <div className="grid gap-5 rounded-[28px] bg-[#f5f2ea] p-6">
              <div className="flex flex-wrap gap-4">
                <ChallengeButton href={demoHref}>Réservez une démo</ChallengeButton>
                <ChallengeButton href={demoHref} variant="secondary">
                  Voir la plateforme
                </ChallengeButton>
                <ChallengeButton href={demoHref} variant="quiet">
                  Télécharger le deck
                </ChallengeButton>
              </div>
              <div className="rounded-[24px] border border-[#dcd4c5] bg-[#0f1930] p-6">
                <div className="flex flex-wrap gap-4">
                  <ChallengeButton href={demoHref} variant="ghost">
                    Explorer le portefeuille
                  </ChallengeButton>
                  <ChallengeButton href={demoHref} variant="secondary">
                    Demander une démo
                  </ChallengeButton>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function HeroAnimatedShowcase({
  activeIndex,
  onSelect,
  demoHref,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  demoHref: string;
}) {
  const activeTab = heroAnimatedTabs[activeIndex];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <FadeIn>
          <div className="overflow-hidden rounded-[38px] border border-[#d4d9ee] bg-[linear-gradient(135deg,#101b34_0%,#182752_55%,#2c4bd5_100%)] text-white shadow-[0_40px_90px_rgba(17,25,47,0.18)]">
            <div className="grid gap-10 px-8 py-10 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-12">
              <div className="flex flex-col justify-between">
                <div>
                  <Eyebrow className="border-white/20 bg-white/10 text-white">
                    Hero éditorial
                  </Eyebrow>
                  <h2
                    className={cn(
                      "mt-5 max-w-[10ch] text-[3rem] leading-[0.94] tracking-[-0.05em] md:text-[4.8rem]",
                      fraunces.className,
                    )}
                  >
                    Le PPM qui tient sa place au comité.
                  </h2>
                  <p className="mt-5 max-w-[38ch] text-[1.02rem] leading-8 text-white/80">
                    Même promesse métier, mais une présence plus affirmée : moins
                    d’interface démonstrative, plus de plateforme de gouvernance.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <ChallengeButton href={demoHref}>Réservez une démo</ChallengeButton>
                    <ChallengeButton href="#HeroTabbed" variant="ghost">
                      Voir une autre hero
                    </ChallengeButton>
                  </div>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {[
                    ["Vision", "Portefeuille lisible"],
                    ["Capacité", "Charge cadrée"],
                    ["Décision", "Comité mieux servi"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[22px] border border-white/14 bg-white/10 p-4 backdrop-blur-sm"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                        {label}
                      </p>
                      <p className="mt-2 text-base font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  {heroAnimatedTabs.map((tab, index) => (
                    <button
                      key={tab.label}
                      onClick={() => onSelect(index)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-colors",
                        activeIndex === index
                          ? "border-white bg-white text-[#15213f]"
                          : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10",
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="overflow-hidden rounded-[28px] border border-white/12 bg-[#f7f8fc] p-4 text-[#11192f]">
                  <div className="mb-4 flex items-center justify-between rounded-[18px] border border-[#e5e8f4] bg-white px-4 py-3">
                    <p className="text-sm font-semibold text-[#15213f]">{activeTab.label}</p>
                    <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#3152e0]">
                      Active view
                    </span>
                  </div>

                  <ProductFrame
                    image={activeTab.image}
                    imageAlt={`Vue ${activeTab.label}`}
                    tone="light"
                    priority
                  />

                  <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                    <p className="max-w-[46ch] text-sm leading-7 text-[#51607d]">
                      {activeTab.caption}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8390ab]">
                      Direction boardroom
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function LogoBarShowcase() {
  return (
    <section className="bg-[#fbfaf7] py-14">
      <Container>
        <FadeIn>
          <div className="rounded-[30px] border border-[#ddd7cb] bg-white px-8 py-10 shadow-[0_16px_45px_rgba(17,25,47,0.06)]">
            <div className="grid gap-8 md:grid-cols-[0.6fr_1.4fr] md:items-center">
              <div>
                <Eyebrow>Preuve sociale</Eyebrow>
                <p className="mt-4 max-w-[24ch] text-[1.05rem] leading-7 text-[#46526b]">
                  Une frise plus éditoriale, moins “logo soup”, plus institutionnelle.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-3">
                {logos.map((logo) => (
                  <div
                    key={logo.alt}
                    className="flex h-16 items-center justify-center border-b border-[#ebe5da] pb-2 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={150}
                      height={56}
                      className="h-auto max-h-9 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function StatsShowcase() {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <div className="overflow-hidden rounded-[34px] border border-[#162441] bg-[#0f1930] text-white">
            <div className="grid gap-0 md:grid-cols-3">
              {[
                ["80%", "Réduction des réunions projet redondantes"],
                ["100%", "Visibilité portefeuille pour la direction"],
                ["30K€", "Économies annuelles liées au pilotage"],
              ].map(([value, description], index) => (
                <div
                  key={value}
                  className={cn(
                    "px-8 py-10 md:px-10 md:py-12",
                    index < 2 && "border-b border-white/10 md:border-b-0 md:border-r",
                  )}
                >
                  <p
                    className={cn(
                      "text-[3.2rem] leading-none tracking-[-0.05em] text-[#9eb0ff] md:text-[4.2rem]",
                      fraunces.className,
                    )}
                  >
                    {value}
                  </p>
                  <p className="mt-4 max-w-[20ch] text-[0.96rem] leading-7 text-white/70">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function SectionHeadingShowcase({ demoHref }: { demoHref: string }) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="rounded-[34px] border border-[#ddd7cb] bg-[#fbfaf7] px-8 py-12 text-center md:px-12">
            <Eyebrow className="mx-auto">Section heading</Eyebrow>
            <DisplayTitle className="mx-auto mt-5 max-w-[11ch] text-[#11192f]">
              Une plateforme complète pour piloter vos projets.
            </DisplayTitle>
            <p className="mx-auto mt-5 max-w-[58ch] text-[1.02rem] leading-8 text-[#4a5670]">
              Ici, l’élégance ne vient pas d’un effet spectaculaire, mais d’une
              hiérarchie plus sûre, d’un rythme plus généreux et d’une écriture visuelle
              qui évoque davantage la stratégie que l’outil.
            </p>
            <div className="mt-8">
              <ChallengeButton href={demoHref}>Réservez une démo</ChallengeButton>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function FeaturePanel({
  badge,
  heading,
  description,
  image,
  imageAlt,
  points,
  reversed,
  tone,
  demoHref,
}: {
  badge: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  points: string[];
  reversed?: boolean;
  tone: FeatureTone;
  demoHref: string;
}) {
  const toneClasses: Record<
    FeatureTone,
    {
      shell: string;
      body: string;
      accent: string;
      button: ButtonVariant;
      panel: string;
      innerBorder: string;
      innerSurface: string;
    }
  > = {
    ivory: {
      shell: "border-[#ddd7cb] bg-[#fbfaf7] text-[#10182f]",
      body: "text-[#4b5770]",
      accent: "bg-[#eef2ff] text-[#3152e0]",
      button: "secondary",
      panel: "border-[#e6e0d6] bg-white",
      innerBorder: "border-[#e6e0d6]",
      innerSurface: "bg-white/70",
    },
    blue: {
      shell: "border-[#d4dcff] bg-[#ebefff] text-[#10182f]",
      body: "text-[#42506d]",
      accent: "bg-white text-[#3152e0]",
      button: "primary",
      panel: "border-[#d7dff8] bg-[#f9fbff]",
      innerBorder: "border-[#d7dff8]",
      innerSurface: "bg-white/70",
    },
    ink: {
      shell: "border-[#162441] bg-[#0f1930] text-white",
      body: "text-white/70",
      accent: "bg-white/12 text-white",
      button: "ghost",
      panel: "border-white/10 bg-white/5",
      innerBorder: "border-white/10",
      innerSurface: "bg-white/5",
    },
  };

  const styles = toneClasses[tone];

  return (
    <section className="py-6 md:py-8">
      <Container>
        <FadeIn>
          <div
            className={cn(
              "grid gap-10 rounded-[34px] border p-8 shadow-[0_28px_70px_rgba(17,25,47,0.06)] md:grid-cols-[0.9fr_1.1fr] md:p-10",
              styles.shell,
            )}
          >
            <div className={cn("flex flex-col justify-center", reversed && "md:order-2")}>
              <span
                className={cn(
                  "inline-flex w-fit items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em]",
                  styles.accent,
                )}
              >
                {badge}
              </span>
              <DisplayTitle className="mt-5 max-w-[11ch]">{heading}</DisplayTitle>
              <p className={cn("mt-5 max-w-[48ch] text-[1rem] leading-8", styles.body)}>
                {description}
              </p>

              <div className="mt-7 space-y-3">
                {points.map((point) => (
                  <div key={point} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#3152e0]" />
                    <p className={cn("text-sm leading-7", styles.body)}>{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <ChallengeButton href={demoHref} variant={styles.button}>
                  Réservez une démo
                </ChallengeButton>
              </div>
            </div>

            <div className={cn(reversed && "md:order-1")}>
              <div className={cn("rounded-[28px] border p-4", styles.panel)}>
                <div
                  className={cn(
                    "mb-4 flex items-center justify-between rounded-[18px] border px-4 py-3 text-sm",
                    styles.innerBorder,
                    styles.innerSurface,
                  )}
                >
                  <span className="font-semibold">{badge}</span>
                  <span className="text-xs uppercase tracking-[0.22em] opacity-60">
                    premium system
                  </span>
                </div>
                <ProductFrame image={image} imageAlt={imageAlt} tone={tone === "ink" ? "dark" : "light"} />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function CtaBannerShowcase({ demoHref }: { demoHref: string }) {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[38px] border border-[#d7deff] bg-[#3152e0] px-8 py-10 text-white md:px-12 md:py-12">
            <div className="absolute inset-y-0 right-0 hidden w-[34%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.22),_transparent_65%)] md:block" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <Eyebrow className="border-white/15 bg-white/10 text-white">CTA banner</Eyebrow>
                <DisplayTitle className="mt-5 max-w-[10ch] text-white">
                  Prêt à transformer votre pilotage ?
                </DisplayTitle>
                <p className="mt-5 max-w-[54ch] text-[1.02rem] leading-8 text-white/80">
                  Ici, le call-to-action devient plus désirable et plus maîtrisé. On garde
                  l’énergie commerciale, mais on retire le côté “banner SaaS attendu”.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <ChallengeButton href={demoHref} variant="secondary">
                  Réservez une démo
                </ChallengeButton>
                <ChallengeButton href="#ComparisonGrid" variant="ghost">
                  Voir l’avant / après
                </ChallengeButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function ComparisonGridShowcase({ rows }: { rows: ComparisonRow[] }) {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[30px] border border-[#e2d8d0] bg-[#f8f4ef] p-7 md:p-8">
              <Eyebrow>Sans solution</Eyebrow>
              <DisplayTitle className="mt-4 max-w-[8ch] text-[#11192f]">
                Le pilotage semble plus lourd qu’il n’est utile.
              </DisplayTitle>
              <div className="mt-8 space-y-4">
                {rows.map((row) => (
                  <div
                    key={row.left}
                    className="rounded-[20px] border border-[#e6ddd4] bg-white px-5 py-4"
                  >
                    <p className="text-sm leading-7 text-[#625c63]">{row.left}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-[#d5ddff] bg-[#eef2ff] p-7 md:p-8">
              <Eyebrow className="border-[#d0d9ff] bg-white text-[#3152e0]">
                Avec solution
              </Eyebrow>
              <DisplayTitle className="mt-4 max-w-[9ch] text-[#11192f]">
                Le même produit, mais une perception plus stratégique.
              </DisplayTitle>
              <div className="mt-8 space-y-4">
                {rows.map((row) => (
                  <div
                    key={row.right}
                    className="rounded-[20px] border border-[#dbe2ff] bg-white px-5 py-4"
                  >
                    <p className="text-sm leading-7 text-[#36415e]">{row.right}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function QuoteCardsShowcase() {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <div className="grid gap-6 md:grid-cols-2">
            {quoteCards.map((item, index) => (
              <div
                key={item.quote}
                className={cn(
                  "rounded-[28px] border p-6 shadow-[0_18px_50px_rgba(17,25,47,0.06)]",
                  index === 0
                    ? "border-[#ddd7cb] bg-white text-[#11192f]"
                    : "border-[#162441] bg-[#0f1930] text-white",
                )}
              >
                <p
                  className={cn(
                    "text-[2.25rem] leading-none tracking-[-0.06em]",
                    fraunces.className,
                    index === 0 ? "text-[#3152e0]" : "text-[#9eb0ff]",
                  )}
                >
                  “
                </p>
                <p className="mt-2 max-w-[24ch] text-[1.1rem] leading-8">
                  {item.quote}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-current/10 pt-4">
                  <Image
                    src={item.logo}
                    alt={item.logoAlt}
                    width={130}
                    height={40}
                    className="h-auto max-h-8 w-auto object-contain opacity-75 grayscale"
                  />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-55">
                    Presse
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function TestimonialCardsShowcase({ items }: { items: Testimonial[] }) {
  return (
    <section className="bg-[#fbfaf7] py-16">
      <Container>
        <FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group rounded-[28px] border border-[#ddd7cb] bg-white p-7 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#eef2ff] text-sm font-semibold text-[#3152e0]">
                    {item.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-[#11192f]">{item.name}</p>
                    <p className="text-sm text-[#69758f]">{item.role}</p>
                  </div>
                </div>
                <p className="mt-6 text-[0.98rem] leading-7 text-[#46526b]">
                  {item.text}
                </p>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8b95ab] transition-colors group-hover:text-[#3152e0]">
                  Lire le retour
                </p>
              </Link>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function CustomerStoriesShowcase({ stories }: { stories: Story[] }) {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Stories</Eyebrow>
              <DisplayTitle className="mt-4 max-w-[10ch] text-[#11192f]">
                Laissez nos clients vous parler.
              </DisplayTitle>
            </div>
            <Link
              href="#LpFinalCta"
              className="hidden text-sm font-semibold text-[#3152e0] md:inline-block"
            >
              Voir la suite
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {stories.map((story) => (
              <article
                key={story.name}
                className="rounded-[30px] border border-[#ddd7cb] bg-white p-7 shadow-[0_18px_45px_rgba(17,25,47,0.04)]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full bg-[#0f1930] text-sm font-semibold text-white",
                      fraunces.className,
                    )}
                  >
                    {story.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-[#11192f]">{story.name}</p>
                    <p className="text-sm text-[#6b7690]">{story.role}</p>
                  </div>
                </div>

                <div className="mt-7 grid gap-4 text-sm text-[#46526b]">
                  <StoryMetric label="Entreprise" value={story.company ?? "Entreprise"} />
                  <StoryMetric label="Secteur" value={story.sector} />
                  <StoryMetric label="Effectif" value={`${story.employees} collaborateurs`} />
                </div>

                <Link
                  href={story.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#3152e0]"
                >
                  Voir le témoignage
                  <Image
                    src="/assets/icons/arrow-up-right2.svg"
                    alt=""
                    width={14}
                    height={14}
                  />
                </Link>
              </article>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function StoryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-[#ebe5da] bg-[#faf8f3] px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a94aa]">
        {label}
      </p>
      <p className="mt-1 font-medium text-[#1c2742]">{value}</p>
    </div>
  );
}

function FeatureNumberedListShowcase({ demoHref }: { demoHref: string }) {
  return (
    <div className="space-y-8 py-16">
      <NumberedFeaturePanel
        badge="NEWSLETTER"
        heading="Une newsletter sponsor que votre direction va vraiment lire"
        image="/assets/images/Copil%20-%20%20Bilan-min.png"
        imageAlt="Bilan de santé newsletter"
        features={newsletterFeatures}
        demoHref={demoHref}
      />
      <NumberedFeaturePanel
        badge="REPORTING"
        heading="Un reporting automatique pensé comme un support exécutif"
        image="/assets/images/Flash%20report%20ppt.webp"
        imageAlt="Flash report PowerPoint"
        features={reportingFeatures}
        demoHref={demoHref}
        reversed
        tone="blue"
      />
    </div>
  );
}

function NumberedFeaturePanel({
  badge,
  heading,
  image,
  imageAlt,
  features,
  demoHref,
  reversed = false,
  tone = "ivory",
}: {
  badge: string;
  heading: string;
  image: string;
  imageAlt: string;
  features: { title: string; description: string }[];
  demoHref: string;
  reversed?: boolean;
  tone?: "ivory" | "blue";
}) {
  return (
    <section>
      <Container>
        <FadeIn>
          <div
            className={cn(
              "grid gap-10 rounded-[34px] border p-8 md:grid-cols-[0.92fr_1.08fr] md:p-10",
              tone === "blue"
                ? "border-[#d5ddff] bg-[#eef2ff]"
                : "border-[#ddd7cb] bg-white",
            )}
          >
            <div className={cn("space-y-5", reversed && "md:order-2")}>
              <Eyebrow>{badge}</Eyebrow>
              <DisplayTitle className="max-w-[11ch] text-[#11192f]">{heading}</DisplayTitle>
              <div className="mt-6 space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="grid gap-4 rounded-[22px] border border-[#e8e1d6] bg-[#faf8f3] p-5 md:grid-cols-[auto_1fr]"
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full bg-[#3152e0] text-sm font-semibold text-white",
                        fraunces.className,
                      )}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#11192f]">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-[#48536b]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <ChallengeButton href={demoHref} className="mt-2">
                Réservez une démo
              </ChallengeButton>
            </div>

            <div className={cn(reversed && "md:order-1")}>
              <ProductFrame image={image} imageAlt={imageAlt} tone="light" />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function HeroSplitShowcase({ demoHref }: { demoHref: string }) {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <div className="grid gap-10 overflow-hidden rounded-[38px] border border-[#d6dcf5] bg-white shadow-[0_24px_60px_rgba(17,25,47,0.08)] md:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-[#e5e8f2] bg-[#eff3ff] p-5 md:border-b-0 md:border-r">
              <ProductFrame
                image="/assets/images/Presentation%20cadrage%20screen.webp"
                imageAlt="Écran cadrage projet AirSaaS"
                tone="light"
              />
            </div>
            <div className="px-8 py-10 md:px-10 md:py-12">
              <Eyebrow>Hero split</Eyebrow>
              <DisplayTitle className="mt-5 max-w-[10ch] text-[#11192f]">
                Pilotez votre portefeuille de projets avec plus d’autorité visuelle.
              </DisplayTitle>
              <p className="mt-5 max-w-[42ch] text-[1rem] leading-8 text-[#46526b]">
                Ici, la hero split sert à montrer qu’on peut rester démonstratif tout en
                gagnant en élégance. L’image respire, le texte est plus tendu, la
                composition porte mieux la promesse.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ChallengeButton href={demoHref}>Réservez une démo</ChallengeButton>
                <ChallengeButton href="#FeatureChecklist" variant="secondary">
                  Voir les bénéfices
                </ChallengeButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function FaqShowcase({ items }: { items: FaqItem[] }) {
  return (
    <section className="bg-[#fbfaf7] py-16">
      <Container>
        <FadeIn>
          <div className="grid gap-8 md:grid-cols-[0.72fr_1.28fr]">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <DisplayTitle className="mt-4 max-w-[8ch] text-[#11192f]">
                Questions fréquentes.
              </DisplayTitle>
              <p className="mt-4 max-w-[34ch] text-[1rem] leading-8 text-[#4a5670]">
                Même logique d’accordéon, mais avec une présence plus apaisée et plus
                premium.
              </p>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-[24px] border border-[#ddd7cb] bg-white px-6 py-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-[#11192f]">
                    {item.question}
                    <span className="text-[#3152e0]">+</span>
                  </summary>
                  <p className="mt-4 max-w-[64ch] text-sm leading-7 text-[#50607a]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function ComparisonTableShowcase() {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <div className="overflow-hidden rounded-[32px] border border-[#ddd7cb] bg-white">
            <div className="border-b border-[#ebe5da] px-8 py-8">
              <Eyebrow>Comparison table</Eyebrow>
              <DisplayTitle className="mt-4 max-w-[10ch] text-[#11192f]">
                AirSaaS vs un rendu plus standard.
              </DisplayTitle>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse">
                <thead>
                  <tr className="border-b border-[#ebe5da] bg-[#faf8f3] text-left text-sm text-[#6c7590]">
                    <th className="px-8 py-4 font-medium">Critère</th>
                    <th className="px-8 py-4 font-medium">Description</th>
                    <th className="px-8 py-4 font-medium">AirSaaS</th>
                    <th className="px-8 py-4 font-medium">Standard</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTableRows.map((row, index) => (
                    <tr
                      key={row.feature}
                      className={cn(index < comparisonTableRows.length - 1 && "border-b border-[#ebe5da]")}
                    >
                      <td className="px-8 py-5 font-semibold text-[#11192f]">{row.feature}</td>
                      <td className="px-8 py-5 text-sm leading-7 text-[#50607a]">
                        {row.description}
                      </td>
                      <td className="px-8 py-5">
                        <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-sm font-semibold text-[#3152e0]">
                          {row.airsaas}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="rounded-full bg-[#f3efe8] px-3 py-1 text-sm font-semibold text-[#6e7486]">
                          {row.competitor}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function HeroTabbedShowcase({
  activeIndex,
  onSelect,
  demoHref,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  demoHref: string;
}) {
  const activeTab = heroTabbedTabs[activeIndex];

  return (
    <section className="py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="overflow-hidden rounded-[38px] border border-[#162441] bg-[#0f1930] text-white">
            <div className="grid gap-10 px-8 py-10 md:grid-cols-[0.78fr_1.22fr] md:px-10 md:py-12">
              <div>
                <Eyebrow className="border-white/15 bg-white/10 text-white">Hero tabbed</Eyebrow>
                <DisplayTitle className="mt-5 max-w-[9ch] text-white">
                  Le PPM moderne pour les DSI.
                </DisplayTitle>
                <p className="mt-5 max-w-[36ch] text-[1rem] leading-8 text-white/70">
                  Une deuxième hero pour exprimer une autre famille de composant, plus
                  structurée, plus modulaire et tout aussi statutaire.
                </p>

                <div className="mt-8 space-y-3">
                  {heroTabbedTabs.map((tab, index) => (
                    <button
                      key={tab.label}
                      onClick={() => onSelect(index)}
                      className={cn(
                        "w-full rounded-[20px] border px-5 py-4 text-left transition-colors",
                        activeIndex === index
                          ? "border-[#8fa2ff] bg-white/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10",
                      )}
                    >
                      <p className="text-sm font-semibold">{tab.label}</p>
                      <p className="mt-1 text-sm leading-6 text-white/60">{tab.caption}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <ChallengeButton href={demoHref}>Réservez une démo</ChallengeButton>
                  <ChallengeButton href="#Stats" variant="ghost">
                    Voir les chiffres
                  </ChallengeButton>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/10 p-4">
                <div className="mb-4 flex items-center justify-between rounded-[18px] border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">{activeTab.label}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                      View selected
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                </div>
                <ProductFrame
                  image={activeTab.image}
                  imageAlt={`Vue ${activeTab.label}`}
                  tone="dark"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function LpStatsShowcase() {
  return (
    <section className="bg-[#fbfaf7] py-16">
      <Container>
        <FadeIn>
          <div className="rounded-[32px] border border-[#ddd7cb] bg-white p-8 md:p-10">
            <div className="mb-8">
              <Eyebrow>LP stats</Eyebrow>
              <DisplayTitle className="mt-4 max-w-[8ch] text-[#11192f]">
                Résultats concrets.
              </DisplayTitle>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                ["30%", "de projets livrés en plus"],
                ["2x", "plus rapide pour arbitrer"],
                ["100%", "de visibilité portefeuille"],
              ].map(([value, label]) => (
                <div
                  key={value}
                  className="rounded-[24px] border border-[#e8e2d8] bg-[#faf8f3] px-6 py-7"
                >
                  <p
                    className={cn(
                      "text-[3rem] leading-none tracking-[-0.05em] text-[#11192f]",
                      fraunces.className,
                    )}
                  >
                    {value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#51607d]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function PainPointsShowcase() {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <div className="rounded-[36px] border border-[#162441] bg-[#0f1930] px-8 py-10 text-white md:px-10 md:py-12">
            <div className="mb-8 md:max-w-[46rem]">
              <Eyebrow className="border-white/15 bg-white/10 text-white">Vos défis</Eyebrow>
              <DisplayTitle className="mt-4 max-w-[8ch] text-white">
                Vous vous reconnaissez ?
              </DisplayTitle>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {painPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/10 bg-white/5 px-6 py-6"
                >
                  <p className="text-[1rem] leading-8 text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function FeatureChecklistShowcase({ demoHref }: { demoHref: string }) {
  return (
    <section className="bg-[#fbfaf7] py-16">
      <Container>
        <FadeIn>
          <div className="grid gap-8 rounded-[34px] border border-[#ddd7cb] bg-white p-8 md:grid-cols-[0.88fr_1.12fr] md:p-10">
            <div>
              <Eyebrow>Checklist</Eyebrow>
              <DisplayTitle className="mt-4 max-w-[10ch] text-[#11192f]">
                Centralisez tous vos projets avec une lecture plus fluide.
              </DisplayTitle>
              <p className="mt-5 max-w-[42ch] text-[1rem] leading-8 text-[#4b5770]">
                Une famille de section qui reste très utile sur les landing pages, mais que
                l’on peut rendre beaucoup plus désirable sans la surcharger.
              </p>
              <div className="mt-7 space-y-4">
                {checklistItems.map((item) => (
                  <div key={item} className="flex gap-4 rounded-[20px] bg-[#faf8f3] px-4 py-4">
                    <Image
                      src="/assets/icons/check-circle.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="mt-1"
                    />
                    <p className="text-sm leading-7 text-[#46526b]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <ChallengeButton href={demoHref}>Réservez une démo</ChallengeButton>
              </div>
            </div>

            <ProductFrame
              image="/assets/images/Automation%20-%20integrations.webp"
              imageAlt="Intégrations et automatisations AirSaaS"
              tone="light"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function BenefitsGridShowcase({ items }: { items: Benefit[] }) {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <div className="mb-10 text-center">
            <Eyebrow className="mx-auto">Benefits</Eyebrow>
            <DisplayTitle className="mx-auto mt-4 max-w-[10ch] text-[#11192f]">
              Pourquoi nous choisir ?
            </DisplayTitle>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#ddd7cb] bg-white p-7 shadow-[0_16px_45px_rgba(17,25,47,0.04)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#eef2ff]">
                  <Image src={item.icon} alt="" width={28} height={28} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#11192f]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4f5b76]">{item.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function TrustBadgesShowcase() {
  return (
    <section className="bg-[#fbfaf7] py-16">
      <Container>
        <FadeIn>
          <div className="rounded-[34px] border border-[#ddd7cb] bg-white p-8 md:p-10">
            <div className="mb-8">
              <Eyebrow>Trust badges</Eyebrow>
              <DisplayTitle className="mt-4 max-w-[8ch] text-[#11192f]">
                La confiance, sans bruit.
              </DisplayTitle>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge.title}
                  className="rounded-[22px] border border-[#e8e2d8] bg-[#faf8f3] px-5 py-5"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3152e0]">
                    {badge.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#4d5a75]">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function HowItWorksShowcase() {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="rounded-[30px] border border-[#ddd7cb] bg-white p-7"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8b95ab]">
                  Étape {item.step}
                </p>
                <h3
                  className={cn(
                    "mt-4 text-[2.25rem] leading-none tracking-[-0.04em] text-[#11192f]",
                    fraunces.className,
                  )}
                >
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#4d5a75]">{item.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function FinalCtaShowcase({ demoHref }: { demoHref: string }) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="overflow-hidden rounded-[40px] border border-[#d7deff] bg-[#3152e0] px-8 py-12 text-white shadow-[0_28px_70px_rgba(49,82,224,0.22)] md:px-12 md:py-14">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <Eyebrow className="border-white/15 bg-white/10 text-white">Final CTA</Eyebrow>
                <DisplayTitle className="mt-5 max-w-[10ch] text-white">
                  Prêt à piloter différemment ?
                </DisplayTitle>
                <p className="mt-5 max-w-[54ch] text-[1.02rem] leading-8 text-white/80">
                  Cette page montre qu’on peut rester système, garder les mêmes usages, et
                  pourtant changer radicalement la perception de la marque.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <ChallengeButton href={demoHref} variant="secondary">
                  Réservez une démo
                </ChallengeButton>
                <ChallengeButton href="#Button" variant="ghost">
                  Revoir les composants
                </ChallengeButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function ProductFrame({
  image,
  imageAlt,
  tone = "light",
  priority = false,
}: {
  image: string;
  imageAlt: string;
  tone?: "light" | "dark";
  priority?: boolean;
}) {
  const shell = tone === "dark"
    ? "border-white/10 bg-white/5"
    : "border-[#e6e0d6] bg-[#faf8f3]";
  const frame = tone === "dark"
    ? "border-white/10 bg-[#18264b]"
    : "border-[#e6e0d6] bg-[#eef2fb]";

  return (
    <div className={cn("rounded-[28px] border p-4", shell)}>
      <div className={cn("relative overflow-hidden rounded-[22px] border", frame)}>
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            className="object-contain object-top p-3"
          />
        </div>
      </div>
    </div>
  );
}

function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border border-[#d7ddf4] bg-[#eef2ff] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3152e0]",
        className,
      )}
    >
      {children}
    </span>
  );
}

function DisplayTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-[2.5rem] leading-[0.94] tracking-[-0.05em] md:text-[4.3rem]",
        fraunces.className,
        className,
      )}
    >
      {children}
    </h2>
  );
}
