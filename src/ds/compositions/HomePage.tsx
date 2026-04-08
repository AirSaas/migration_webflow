"use client";

import { Hero } from "@/ds/blocks/Hero";
import { LogosBar } from "@/ds/primitives/LogosBar";
import { ValuePropositionFrame } from "@/ds/blocks/ValuePropositionFrame";
import { FeatureFrame } from "@/ds/blocks/FeatureFrame";
import { FeatureSectionStacked } from "@/ds/blocks/FeatureSectionStacked";
import { CtaFrame } from "@/ds/blocks/CtaFrame";
import { Footer } from "@/ds/blocks/Footer";
import { FeatureCard } from "@/ds/primitives/FeatureCard";
import { CardCta } from "@/ds/primitives/CardCta";
import { IconIllustration } from "@/ds/primitives/IconIllustration";
import { SectionHeading } from "@/ds/primitives/SectionHeading";
import { TestimonialCompanyCard } from "@/ds/primitives/TestimonialCompanyCard";
import { TestimonialCard } from "@/ds/primitives/TestimonialCard";
import { Slider } from "@/ds/primitives/Slider";
import { Button } from "@/ds/primitives/Button";
import { GradientBackground } from "@/ds/primitives/GradientBackground";
import { FloatingCard } from "@/ds/primitives/FloatingCard";
import { Float } from "@/ds/primitives/Float";
import { AnimateOnScroll } from "@/ds/primitives/AnimateOnScroll";
import {
  CalendarDayIcon,
  BullseyeArrowIcon,
  StopwatchIcon,
  SuitcaseIcon,
} from "@/ds/primitives/icons/illustration-icons";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="md">
      {children}
    </IconIllustration>
  );
}

/* ─── Data ─── */

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
    links: [
      { label: "AirSaas, le Quarter Plan et l'effectuation" },
      { label: "Alternative à Sciforma" },
      { label: "Alternative à Planview Portfolio" },
    ],
  },
];

const companyTestimonials = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque",
    logoSrc: "https://placehold.co/169x65/ffffff/061333?text=Logo+1",
    logoAlt: "Client 1",
  },
  {
    quote:
      "Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.",
    logoSrc: "https://placehold.co/111x51/ffffff/061333?text=Logo+2",
    logoAlt: "Client 2",
  },
  {
    quote:
      "Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus..",
    logoSrc: "https://placehold.co/188x44/ffffff/061333?text=Logo+3",
    logoAlt: "Client 3",
  },
];

const testimonials = [
  {
    quote:
      "Depuis qu'on utilise AirSaas, nos comités de pilotage sont enfin productifs. On a une vue claire sur tous nos projets stratégiques.",
    name: "Sophie Lefèvre",
    role: "DSI @Kiabi",
    linkedinHref: "#",
  },
  {
    quote:
      "Depuis qu'on utilise AirSaas, nos comités de pilotage sont enfin productifs. On a une vue claire sur tous nos projets stratégiques.",
    name: "Sophie Lefèvre",
    role: "DSI @Kiabi",
    linkedinHref: "#",
  },
  {
    quote:
      "Depuis qu'on utilise AirSaas, nos comités de pilotage sont enfin productifs. On a une vue claire sur tous nos projets stratégiques.",
    name: "Sophie Lefèvre",
    role: "DSI @Kiabi",
    linkedinHref: "#",
  },
];

const comparisonItemsSans = [
  {
    value: 1,
    description: (
      <>
        Vous avez un Excel à <strong>1200 colonnes</strong> que vous seul
        comprenez
      </>
    ),
  },
  {
    value: 2,
    description: (
      <>
        Vos prévisions sont <strong>précisément fausses</strong> plutôt
        qu&apos;approximativement justes
      </>
    ),
  },
  {
    value: 3,
    description: (
      <>
        De l&apos;idée floue à un projet positionné, ça prend{" "}
        <strong>des mois.</strong> Réunions, allers-retours, estimations au
        doigt mouillé...
      </>
    ),
  },
];

const comparisonItemsAvec = [
  {
    value: 1,
    description: (
      <>
        Les outils existants sont <strong>trop complexes</strong> → personne ne
        les maintient
      </>
    ),
  },
  {
    value: 2,
    description: (
      <>
        Impossible de répondre à :{" "}
        <strong>&ldquo;Peut-on prendre ce projet ?&rdquo;</strong>
      </>
    ),
  },
  {
    value: 3,
    description: (
      <>
        Le PMO devrait gérer la capacité. Mais il est{" "}
        <strong>saturé par le quotidien</strong> pour s&apos;en occuper.
      </>
    ),
  },
];

const sliderSlides = [
  {
    imageSrc:
      "https://placehold.co/1380x900/e8ebfe/3C51E2?text=Marketplace+Jira",
    imageAlt: "Intégration Jira",
  },
  {
    imageSrc:
      "https://placehold.co/1380x900/e8ebfe/6b7be9?text=Marketplace+Monday",
    imageAlt: "Intégration Monday",
  },
  {
    imageSrc:
      "https://placehold.co/1380x900/e8ebfe/ff922b?text=Marketplace+Teams",
    imageAlt: "Intégration Teams",
  },
];

/* ─── Inline Section: Newsletter ─── */

function NewsletterSection() {
  return (
    <section
      className="flex flex-col gap-[2rem] bg-white lg:flex-row lg:items-center lg:gap-[3.125rem]"
      style={{
        paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingRight: "0",
        paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
        paddingBottom: "clamp(3rem, 5.2vw, 6.25rem)",
      }}
    >
      {/* Text content */}
      <div className="flex flex-1 flex-col gap-[1.25rem] items-start min-w-0">
        <h2
          className="font-black leading-tight"
          style={{ fontSize: "var(--text-h2)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
            }}
          >
            Une newsletter sponsor
          </span>
          <br />
          <span className="text-foreground">
            que votre direction va adorer
          </span>
        </h2>

        {/* Subtitle + paragraph blocks */}
        <div className="flex flex-col gap-[1.25rem] w-full">
          <div className="flex flex-col gap-[0.3125rem]">
            <p
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.25rem, 1.8vw, 2.125rem)", lineHeight: "1.4" }}
            >
              Tendance des projets vitaux
            </p>
            <p
              className="font-light text-foreground"
              style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
            >
              Un récapitulatif de la santé des projets vitaux de votre
              organisation pour leur permettre de &ldquo;sentir&rdquo; la
              tendance du moment.
            </p>
          </div>

          <div className="flex flex-col gap-[0.3125rem]">
            <p
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.25rem, 1.8vw, 2.125rem)", lineHeight: "1.4" }}
            >
              Tendance de leurs projets à eux
            </p>
            <p
              className="font-light text-foreground"
              style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
            >
              Un aperçu de leurs projets, ceux en amélioration et ceux en
              dégradation qui nécessitent leur attention. En un clic, ils peuvent
              accéder à la fiche projet.
            </p>
          </div>

          <div className="flex flex-col gap-[0.3125rem]">
            <p
              className="font-bold text-foreground"
              style={{ fontSize: "clamp(1.25rem, 1.8vw, 2.125rem)", lineHeight: "1.4" }}
            >
              Projets en retard d&apos;actualisation
            </p>
            <p
              className="font-light text-foreground"
              style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
            >
              Un rappel des projets qui méritent d&apos;être mis à jour. Si
              cette section est vide, vous êtes tranquilles !
            </p>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div
        className="shrink-0 overflow-hidden lg:w-[67.5rem] lg:max-w-[60%]"
        style={{
          backgroundColor: "var(--color-primary-5, #f3f3fc)",
          borderRadius: "2.1875rem",
          padding: "2.5rem 0 2.5rem 2.5rem",
        }}
      >
        <img
          src="https://placehold.co/1125x974/e8eafc/3a51e2?text=Newsletter+Sponsor"
          alt="Newsletter sponsor pour la direction"
          className="w-full h-auto rounded-[0.625rem] object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
}

/* ─── Inline Section: CTA with gradient ─── */

function CtaGradientSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <GradientBackground
        variant="cta"
        className="absolute inset-0 w-full"
      />
      <div
        className="relative z-10 flex flex-col items-center gap-[1.25rem] text-center overflow-clip"
        style={{
          paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
          paddingBottom: "clamp(3rem, 5.2vw, 6.25rem)",
        }}
      >
        <h2
          className="font-black leading-tight max-w-[78.125rem]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(41deg, #061333 20%, #3C51E2 124%)",
              WebkitBackgroundClip: "text",
            }}
          >
            Et si vous repreniez l
          </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
            }}
          >
            e contrôle de votre portefeuille
          </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(41deg, #061333 20%, #3C51E2 124%)",
              WebkitBackgroundClip: "text",
            }}
          >
            {" "}
            de projets ?
          </span>
        </h2>

        {/* White card wrapping subtitle + CTA */}
        <div
          className="flex flex-col items-center gap-[1.25rem] bg-white"
          style={{
            borderRadius: "1.5625rem",
            padding: "clamp(1.5rem, 2.5vw, 2.5rem) clamp(2rem, 5vw, 5rem)",
            maxWidth: "53rem",
            width: "100%",
            boxShadow: "0px 4px 50px 0px rgba(0,0,0,0.07)",
          }}
        >
          <p
            className="font-light text-foreground text-center"
            style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
          >
            Adoptez dès maintenant une solution de gestion de gouvernance
            moderne, qui fait gagner vos projets en temps et en efficacité.
          </p>

          <Button variant="primary" size="md" href="#">
            Réservez une démo
          </Button>
        </div>
      </div>

      {/* Floating cards */}
      <Float
        variant={3}
        duration={3.5}
        delay={0}
        className="absolute z-20 left-[2%] top-[17rem] hidden xl:block"
      >
        <FloatingCard />
      </Float>
      <Float
        variant={1}
        duration={4}
        delay={1.5}
        className="absolute z-20 right-[2%] top-[6rem] hidden xl:block"
      >
        <FloatingCard />
      </Float>
    </section>
  );
}

/* ─── Inline Section: Marketplace + Slider ─── */

function MarketplaceSliderSection() {
  return (
    <section
      className="flex flex-col items-center w-full"
      style={{
        gap: "3.125rem",
        paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
      }}
    >
      {/* Heading */}
      <div className="flex flex-col items-center gap-[1.25rem] text-center w-full">
        <h2
          className="font-black leading-tight"
          style={{ fontSize: "var(--text-h2)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
            }}
          >
            Grâce à sa marketplace AirSaas
          </span>
          <span className="text-foreground">
            {" "}
            s&apos;intègre nativement à vos outils du quotidien
          </span>
        </h2>

        <p
          className="font-light text-foreground text-center max-w-[91rem]"
          style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.56" }}
        >
          Centralisez toutes vos informations cruciales (tickets, jalons…)
          depuis vos outils de gestion de tâches sur AirSaas, et diffusez-les
          via vos canaux de communication interne. Tout le monde est au
          diapason, et vous gouvernez de manière optimale.
        </p>
      </div>

      {/* Slider */}
      <Slider slides={sliderSlides} />
    </section>
  );
}

/* ─── Inline Section: Comparison (dual column) ─── */

function ComparisonDualSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <GradientBackground
        variant="comparison"
        className="absolute inset-0 w-full"
      />
      <div
        className="relative z-10 flex flex-col items-center gap-[3.125rem] overflow-clip"
        style={{
          paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
          paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
          paddingBottom: "clamp(3rem, 5.2vw, 6.25rem)",
        }}
      >
        {/* Title */}
        <h2
          className="font-bold leading-tight text-center max-w-[78.125rem]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(41deg, #061333 20%, #3C51E2 124%)",
              WebkitBackgroundClip: "text",
            }}
          >
            Nos clients ne peuvent plus imaginer leurs vies sans{" "}
          </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
            }}
          >
            AirSaas
          </span>
        </h2>

        {/* Dual column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[0.875rem] gap-y-[0.9375rem] w-full">
          {/* Column headers */}
          <div
            className="flex items-center gap-[0.5rem] px-[1.875rem] py-[0.125rem] rounded-[1.5625rem] self-start w-fit"
            style={{ backgroundColor: "#FFF6D8", color: "#8A6D00" }}
          >
            <span className="font-normal" style={{ fontSize: "1.6875rem" }}>
              Sans AirSaas
            </span>
          </div>
          <div
            className="flex items-center gap-[0.5rem] px-[1.875rem] py-[0.125rem] rounded-[1.5625rem] self-start w-fit"
            style={{
              backgroundColor: "var(--color-primary-5, #F3F3FC)",
              color: "var(--color-primary, #3C51E2)",
            }}
          >
            <span className="font-normal" style={{ fontSize: "1.6875rem" }}>
              Avec AirSaas
            </span>
          </div>

          {/* Items */}
          {comparisonItemsSans.map((item, i) => (
            <div
              key={`sans-${i}`}
              className="flex gap-[1.4375rem] items-start bg-white rounded-[1.5625rem]"
              style={{
                border: "1px solid #FCD977",
                padding: "1.6875rem 1.375rem 1.6875rem 1.8125rem",
                minHeight: "9.1875rem",
              }}
            >
              <span
                className="font-bold shrink-0 bg-clip-text text-transparent"
                style={{
                  fontSize: "4.8125rem",
                  lineHeight: "normal",
                  backgroundImage:
                    "linear-gradient(to right, #FFBE80, #FF922B 28%)",
                  WebkitBackgroundClip: "text",
                }}
              >
                {item.value}
              </span>
              <p
                className="font-light text-foreground flex-1"
                style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
              >
                {item.description}
              </p>
            </div>
          ))}

          {comparisonItemsAvec.map((item, i) => (
            <div
              key={`avec-${i}`}
              className="flex gap-[1.4375rem] items-start bg-white rounded-[1.5625rem]"
              style={{
                border: "1px solid #FCD977",
                padding: "1.6875rem 1.375rem 1.6875rem 1.8125rem",
                minHeight: "9.1875rem",
                gridColumn: 2,
                gridRow: i + 2,
              }}
            >
              <span
                className="font-bold shrink-0 bg-clip-text text-transparent"
                style={{
                  fontSize: "4.8125rem",
                  lineHeight: "normal",
                  backgroundImage: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                }}
              >
                {item.value}
              </span>
              <p
                className="font-light text-foreground flex-1"
                style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <Button variant="primary" size="md" href="#">
          Réservez une démo
        </Button>
      </div>
    </section>
  );
}

/* ─── Inline Section: Testimonials "Ils parlent de nous" ─── */

function TestimonialsFullSection() {
  return (
    <section
      className="flex flex-col items-center w-full"
      style={{
        backgroundColor: "var(--color-primary-2, #F8F9FF)",
        gap: "3.125rem",
        paddingLeft: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingRight: "clamp(1.25rem, 12vw, 14.375rem)",
        paddingTop: "clamp(3rem, 5.2vw, 6.25rem)",
        paddingBottom: "clamp(3rem, 5.2vw, 6.25rem)",
      }}
    >
      {/* Title */}
      <h2
        className="font-black leading-tight text-center"
        style={{ fontSize: "var(--text-h2)" }}
      >
        <span className="text-foreground">Ils parlent de </span>
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
          }}
        >
          nous
        </span>
      </h2>

      {/* Row 1: TestimonialCompanyCards */}
      <div className="grid grid-cols-1 gap-[1.5625rem] items-stretch w-full md:grid-cols-2 lg:grid-cols-3">
        {companyTestimonials.map((t, i) => (
          <TestimonialCompanyCard
            key={i}
            quote={t.quote}
            logoSrc={t.logoSrc}
            logoAlt={t.logoAlt}
            className="flex-1 !w-auto"
          />
        ))}
      </div>

      {/* Row 2: TestimonialCards */}
      <div className="grid grid-cols-1 gap-[1.5625rem] items-stretch w-full md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <TestimonialCard
            key={i}
            quote={t.quote}
            name={t.name}
            role={t.role}
            linkedinHref={t.linkedinHref}
            className="flex-1"
          />
        ))}
      </div>
    </section>
  );
}

/* ─── Main Composition ─── */

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero */}
      <Hero
        navItems={navItems}
        navCtaLabel="Demander une démo"
        navCtaHref="#"
        loginLabel="Login"
        loginHref="#"
        headline="La solution de"
        headlineGradient="portfolio"
        headlineSuffix="pour aligner le top management"
        subtitle="Stop au gaspillage, à trop de projets en parallèle, trop de projets en retard, des équipes sous l'eau, un top management en tension. Votre croissance est liée à la réussite de vos projets."
        primaryCta={{ label: "Réservez une démo", href: "#" }}
        illustrationSrc="https://placehold.co/1457x857/e8eafc/3a51e2?text=Product+Screenshot"
        illustrationAlt="AirSaas product screenshot"
      />

      {/* 2. Logos bar — "Ils parlent de nous" */}
      <AnimateOnScroll animation="fade" duration={500}>
        <LogosBar logos={logos} />
      </AnimateOnScroll>

      {/* 3. Value Proposition — "Les chiffres qui vous feront adopter AirSaas" */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="light"
          titleHighlight="Les chiffres"
          title="qui vous feront adopter AirSaas"
          subtitle=""
          columns={3}
        >
          <FeatureCard
            icon={
              <Icon>
                <SuitcaseIcon />
              </Icon>
            }
            title="80%"
            description="C'est la réduction moyenne du nombre de réunions projets constatée après 4 mois d'utilisation d'AirSaas. Pourquoi faire un meeting quand l'information est claire, centralisée et accessible à tous ?"
            className="flex-1"
          />
          <FeatureCard
            icon={
              <Icon>
                <StopwatchIcon />
              </Icon>
            }
            title="100%"
            description="C'est le taux de réduction du nombre de projets lancés sans capacité à faire ou sans objectif clair."
            className="flex-1"
          />
          <FeatureCard
            icon={
              <Icon>
                <CalendarDayIcon />
              </Icon>
            }
            title="30K€"
            description="C'est le montant annuel moyen que vous dépensez en temps-homme pour faire du PowerPoint projet (si vous avez plus de 20 projets)."
            className="flex-1"
          />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* 4. Section Heading — "Une plateforme de gouvernance projet" */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <SectionHeading
          titleGradient="Une plateforme de gouvernance projet"
          titleDark="à la hauteur de vos ambitions"
          subtitle="Notre mission ? Vous permettre de devenir le pivot de la transformation de l'entreprise en structurant la gouvernance de tous les projets, grâce à une plateforme simple que le top management va adorer. La vôtre ? Faire passer votre entreprise à l'étape supérieure en gouvernance de projet !"
        />
      </AnimateOnScroll>

      {/* 5. Feature Section Stacked — Capacity planning */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureSectionStacked
          titleDarkPrefix="Un"
          titleGradient="capacity planning par équipe"
          titleDark="simple et actionnable"
          subtitle="Visualisez en un clin d'oeil si vous êtes dans les clous... ou dans les choux. Grâce à cette vue vous avez les bases d'une discussion pragmatique pour prendre les décisions :"
          listItems={[
            "Peut-on faire plus de projets ? Faut-il en enlever ?",
            "Quels sont les jalons qui nous plombent ? Peut-on les découper ?",
            "Doit-on recruter ou mettre l'équipe en tension ? Pendant combien de temps ?",
          ]}
          imageSrc="https://placehold.co/1380x900/e8eafc/3C51E2?text=Capacity+Planning"
          imageAlt="Vue capacity planning par équipe"
        />
      </AnimateOnScroll>

      {/* 6. Feature Frame right — Agent IA Brief projet */}
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
          imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Agent+IA+Brief"
        />
      </AnimateOnScroll>

      {/* 7. Feature Frame left — Agent IA Découpage projet */}
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

      {/* 8. Newsletter Section */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <NewsletterSection />
      </AnimateOnScroll>

      {/* 9. Feature Frame right — Agent IA Brief projet (variant) */}
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
          imageSrc="https://placehold.co/1125x696/e8eafc/3a51e2?text=Agent+IA+Scoring"
        />
      </AnimateOnScroll>

      {/* 10. Feature Frame left — Agent IA Découpage projet (variant) */}
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
          imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Découpage+Projet+2"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* 11. CTA Gradient — "Et si vous repreniez le contrôle..." */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaGradientSection />
      </AnimateOnScroll>

      {/* 12. Marketplace + Slider */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <MarketplaceSliderSection />
      </AnimateOnScroll>

      {/* 13. Comparison Dual — "Nos clients ne peuvent plus imaginer..." */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ComparisonDualSection />
      </AnimateOnScroll>

      {/* 14. Testimonials — "Ils parlent de nous" */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <TestimonialsFullSection />
      </AnimateOnScroll>

      {/* 15. Footer */}
      <AnimateOnScroll animation="fade-up" duration={600}>
        <Footer columns={footerColumns} />
      </AnimateOnScroll>
    </div>
  );
}
