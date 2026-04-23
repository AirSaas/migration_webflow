"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { LogosBar } from "@/components/library-design/ui/LogosBar";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { ComparisonFrame } from "@/components/library-design/sections/ComparisonFrame";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { TestimonialsFrame } from "@/components/library-design/sections/TestimonialsFrame";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { RelatedSolutionsFrame } from "@/components/library-design/sections/RelatedSolutionsFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";
import {
  CalendarDayIcon,
  BullseyeArrowIcon,
  StopwatchIcon,
  SuitcaseIcon,
  BoltLightningIcon,
  CommentsIcon,
  LockKeyholeIcon,
  CircleCheckIcon,
} from "@/components/library-design/ui/icons/illustration-icons";
import {
  SITE_NAV_ITEMS,
  SITE_NAV_CTA,
  SITE_NAV_LOGIN,
  SITE_FOOTER_COLUMNS,
  SITE_FOOTER_COPYRIGHT,
} from "@/data/site-chrome";

const IMG = "/assets/pages/lp/capacity-planning";

function Icon({ children }: { children: React.ReactNode }) {
  return <IconIllustration variant="dark" size="md">{children}</IconIllustration>;
}

const logos = [
  { src: `${IMG}/69720368e03462cd41c11729_a13d225b215af0e53a7964065967944e_Kiabi_logo.png`, alt: "Kiabi", width: 96, height: 40 },
  { src: `${IMG}/69720391f503687fd8cffdc5_edadc55b8b1d54df28c931f40a90bac8_valrhona-logo.png`, alt: "Valrhona", width: 130, height: 40 },
  { src: `${IMG}/697203a185b8a45b56d55be8_d38155b4ecfc2a9ceb9cf0eca287f8f3_Intuis_logo.png`, alt: "Intuis", width: 70, height: 40 },
  { src: `${IMG}/6972037fc6ee2292e44d081d_fe57fb680f0c33b81f076642544a654b_altavia-logo1.svg`, alt: "Altavia", width: 110, height: 40 },
  { src: `${IMG}/697203ae54a8c4604da51b0f_62cd70262a9f94a8e2b542662ffaaee4_SNCF_logo.svg`, alt: "SNCF", width: 80, height: 40 },
];

const faqItems = [
  { question: "Est-ce que ça suffit pour un vrai capacitaire ?", answer: "Oui, pour savoir ce qu'il est possible de faire au niveau macro. C'est ce qu'il manque au top management pour prioriser. Pour le micro-planning, gardez vos outils opérationnels." },
  { question: "Comment gérer des compétences différentes dans une équipe ?", answer: "AirSaas vous permet de définir des profils de compétences par équipe et de visualiser la disponibilité par compétence. L'IA adapte automatiquement le découpage selon les compétences de chaque équipe." },
  { question: "Combien de temps pour être opérationnel ?", answer: "En moyenne 4 semaines. Notre équipe vous accompagne dans la configuration initiale, l'import de vos données et la formation de vos équipes." },
  { question: "AirSaas remplace-t-il nos outils existants ?", answer: "Non, AirSaas se positionne au-dessus de vos outils opérationnels (Jira, Monday, Asana...). Il agrège les données pour fournir une vue macro au management." },
];

const testimonials = [
  { quote: "Depuis qu'on utilise AirSaas, nos comités de pilotage sont enfin productifs. On a une vue claire sur tous nos projets stratégiques.", name: "Sophie Lefèvre", role: "DSI @Kiabi" },
  { quote: "AirSaas s'adapte à nos processus, pas l'inverse. Mise en place rapide et adoption immédiate par les équipes.", name: "Marc Durand", role: "DG @Valrhona" },
  { quote: "AirSaas est le rouage qui fait tourner notre gouvernance de projets. Visibilité totale pour le COMEX.", name: "Claire Martin", role: "PMO @Decathlon" },
];

const relatedSolutions = [
  {
    imageSrc: `${IMG}/66422d1e8363fb3be7ec829c_Presentation-cadrage-slide.webp`,
    imageAlt: "Reporting projet",
    title: "Découvrez enfin le plaisir du reporting projet",
    description: "Le reporting essentiel pour créer de l'adhésion et éviter les dérapages.",
    href: "/fr/produit/reporting-projet",
  },
  {
    imageSrc: `${IMG}/6646284da53aa7e6aca6d77b_Control-tower-email-FR--screen-.webp`,
    imageAlt: "Email bilan de santé",
    title: "Email « bilan de santé » : automatisez la com projet",
    description: "50% du succès c'est bien communiquer. Le bon niveau d'info, automatiquement.",
    href: "/fr/produit/automatiser-la-com-projet",
  },
  {
    imageSrc: `${IMG}/6633a76d5f19bfbf5c45d7d4_langue_profile.webp`,
    imageAlt: "Traduction DeepL",
    title: "Le rapport flash désormais en multilingue",
    description: "Présenter ses projets dans les organisations multilingues, enfin simple.",
    href: "/fr/produit/traduction-one-click-avec-deepl",
  },
  {
    imageSrc: `${IMG}/663d07b7eeea99ee02f71c97_Prioritization-per-team-ppt.webp`,
    imageAlt: "Priorisation par équipe",
    title: "Priorisation par équipes",
    description: "Chaque responsable priorise ses projets. Fini les Top 1 à 5 projets.",
    href: "/fr/produit/priorisation-par-equipes",
  },
];

export default function CapacityPlanningPage() {
  return (
    <div className="w-full">
      <Hero
        navItems={SITE_NAV_ITEMS}
        navCtaLabel={SITE_NAV_CTA.label}
        navCtaHref={SITE_NAV_CTA.href}
        loginLabel={SITE_NAV_LOGIN.label}
        loginHref={SITE_NAV_LOGIN.href}
        topTag={{ label: "Capacity Planning simplifié", variant: "muted" }}
        title="Vos équipes sont surchargées ? C'est normal :"
        titleHighlight="personne ne sait ce qu'elles peuvent vraiment faire."
        subtitle='AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire "non" avec des données, pas au feeling.'
        bottomTags={[
          { label: "Opérationnel en 1 mois", variant: "success" },
          { label: "Accompagnement premium inclus", variant: "success" },
        ]}
        primaryCta={{ label: "Réservez une démo", href: "/fr/meetings-pages" }}
        secondaryCta={{ label: "Découvrir l'outil PPM en vidéo (5 min)", href: "/fr/video/ppm" }}
        imageSrc={`${IMG}/66334ee7bcfcb0aa45802537_Capacity-screen.webp`}
        imageAlt="AirSaas Capacity Planning screenshot"
      />

      <AnimateOnScroll animation="fade" duration={500}>
        <LogosBar label="Ils gèrent leur capacité avec AirSaas" logos={logos} />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="light"
          tag="Capacity Planning & Gouvernance de portefeuille"
          titleHighlight="Les chiffres"
          title="qui vous feront adopter AirSaas"
          subtitle="Un déploiement simple et accompagné, pas un projet IT de 6 mois."
        >
          <FeatureCard icon={<Icon><CalendarDayIcon /></Icon>} title="1 mois" description="Pour être opérationnel. Pas un projet IT de 6 mois." className="flex-1" />
          <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="100%" description="Des projets lancés avec capacité validée." className="flex-1" />
          <FeatureCard icon={<Icon><StopwatchIcon /></Icon>} title="+60%" description="Des projets on time & on budget." className="flex-1" />
          <FeatureCard icon={<Icon><SuitcaseIcon /></Icon>} title="10min" description="De l'idée au scénario capacitaire." className="flex-1" />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ComparisonFrame
          title="Les vrais problèmes du capacity planning"
          subtitle="Ce que vous vivez au quotidien, on le connaît par cœur."
          items={[
            { value: 1, description: <>Les outils existants sont <strong>trop complexes</strong> → personne ne les maintient</> },
            { value: 2, description: <>Vous avez un Excel à <strong>1200 colonnes</strong> que vous seul comprenez</> },
            { value: 3, description: <>Impossible de répondre à : <strong>&quot;Peut-on prendre ce projet ?&quot;</strong></> },
            { value: 4, description: <>Vos prévisions sont <strong>précisément fausses</strong> plutôt qu&apos;approximativement justes</> },
            { value: 5, description: <>Le PMO devrait gérer la capacité. Mais il est <strong>saturé par le quotidien</strong> pour s&apos;en occuper.</> },
            { value: 6, description: <>De l&apos;idée floue à un projet positionné, ça prend <strong>des mois.</strong> Réunions, allers-retours, estimations au doigt mouillé...</> },
          ]}
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Intelligence Artificielle"
          titleHighlight="Agent IA"
          title="Brief projet"
          subtitle='Quand une demande arrive floue ("on veut un truc"), l&apos;agent IA mène l&apos;entretien, collecte les informations critiques et transforme chaque demande en brief clair et comparable.'
          checklist={[
            "Entretien guidé par l'IA",
            "Brief structuré selon vos templates",
            "Demandes comparables entre elles",
            "Dites non plus tôt, lancez moins de projets... mais mieux",
          ]}
          ctaLabel="Découvrir"
          imageSrc={`${IMG}/66422d1e8363fb3be7ec829c_Presentation-cadrage-slide.webp`}
          imageAlt="Brief projet — AirSaas"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Intelligence Artificielle"
          titleHighlight="Agent IA"
          title="Découpage projet"
          subtitle="L'IA découpe automatiquement vos projets par quarter et par équipe. Elle connaît vos équipes : ce qu'elles savent faire, ce qu'elles ne font pas, leur vélocité passée."
          checklist={[
            "Découpage par quarter et par équipe",
            "Adapté aux compétences de chaque équipe",
            "Basé sur la vélocité historique",
            "Suggestions réalistes, pas théoriques",
          ]}
          ctaLabel="En savoir plus"
          imageSrc={`${IMG}/67973435cf37dd18cddcdffa_Page-Scenarios-FR.webp`}
          imageAlt="Découpage projet — Page scénarios"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="dark"
          titleHighlight="De l'idée au scénario :"
          title="10 minutes"
          subtitle="Avant, ça prenait des mois. Maintenant, les 3 agents IA font le travail."
        >
          <FeatureCard icon={<Icon><CalendarDayIcon /></Icon>} title="Idée floue" description="Une demande arrive, même vague." className="flex-1" />
          <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="Brief" description="L'IA structure la demande en brief clair." className="flex-1" />
          <FeatureCard icon={<Icon><StopwatchIcon /></Icon>} title="Découpage" description="Découpage automatique par quarter et équipe." className="flex-1" />
          <FeatureCard icon={<Icon><SuitcaseIcon /></Icon>} title="Estimation" description="Scénario capacitaire en 10 minutes." className="flex-1" />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Clarté immédiate"
          titleHighlight="Vue capacitaire"
          title="par équipe"
          subtitle="En un clin d'œil, voyez si vos équipes sont dans les clous ou dans les choux. La base d'une discussion pragmatique pour arbitrer."
          checklist={[
            "Vue par équipe et par trimestre",
            "Alerte surcharge automatique",
            "Drill-down par projet",
            "Comparaison capacité vs charge",
          ]}
          imageSrc={`${IMG}/679732feebaf4e31dec2cc8d_Quarter-plan.webp`}
          imageAlt="Vue Quarter Plan AirSaas"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Quarter plan"
          titleHighlight="Le plan trimestriel"
          title="qui aligne toutes les équipes"
          subtitle="Visualisez le quarter plan par équipe. Chaque équipe voit ce qu'elle s'engage à livrer ce trimestre. Fini la roadmap théorique qui ne tient pas face à la réalité."
          checklist={[
            "Vue partagée par équipe",
            "Alignement transverse",
            "Suivi continu trimestre après trimestre",
            "Décisions rapides en cas de dérive",
          ]}
          imageSrc={`${IMG}/6797327b7c4e3b3096a6aa91_quarter-plan-teams.webp`}
          imageAlt="Quarter plan par équipes"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="dark"
          titleHighlight="Notre parti pris"
          title="sur le capacitaire"
          subtitle='"Approximativement juste plutôt que précisément faux"'
          columns={3}
        >
          <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="Macro, pas micro" description="Capacitaire au trimestre, par équipe. Pas à la tâche et à la personne." className="flex-1" />
          <FeatureCard icon={<Icon><BoltLightningIcon /></Icon>} title="Maintenable" description="Parce qu'un capacitaire trop précis finit toujours à la poubelle." className="flex-1" />
          <FeatureCard icon={<Icon><CommentsIcon /></Icon>} title="Actionnable" description='Répondez enfin à "peut-on prendre ce projet ?" avec des données.' className="flex-1" />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <TestimonialsFrame
          title="Ils ont simplifié leur"
          titleHighlight="capacity planning"
          testimonials={testimonials}
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="light"
          tag="AirSaas passe la porte des DSI les plus exigeantes."
          titleHighlight="Sécurité"
          title="au top"
        >
          <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="ISO 27001" description="Certifié" className="flex-1" />
          <FeatureCard icon={<Icon><CalendarDayIcon /></Icon>} title="Hébergé en France" description="Infrastructure souveraine." className="flex-1" />
          <FeatureCard icon={<Icon><CircleCheckIcon /></Icon>} title="Pentest" description="Résultats sur demande" className="flex-1" />
          <FeatureCard icon={<Icon><LockKeyholeIcon /></Icon>} title="SSO / SAML" description="Intégration AD" className="flex-1" />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={600}>
        <FaqFrame title="Questions" titleHighlight="fréquentes" items={faqItems} />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <RelatedSolutionsFrame
          tag="Nos solutions"
          titleHighlight="Allez plus loin"
          title="avec les autres fonctionnalités AirSaas"
          columns={4}
          solutions={relatedSolutions}
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Arrêtez de lancer des projets sans capacité"
          subtitle="Découvrez comment AirSaas simplifie votre capacity planning."
        >
          <CardCta
            title="Réserver une démo"
            description='Enfin un outil pour dire "non" avec des données.'
            ctaLabel="Réservez une démo"
            ctaHref="/fr/meetings-pages"
            className="flex-1"
          />
          <CardCta
            title="Découvrir le guide"
            description="Le capacity planning sans prise de tête."
            ctaLabel="Télécharger le guide"
            ctaHref="/fr/meetings-pages"
            className="flex-1"
          />
        </CtaFrame>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={600}>
        <Footer
          columns={SITE_FOOTER_COLUMNS}
          copyright={SITE_FOOTER_COPYRIGHT}
          copyrightIcon={<span aria-label="Français">🇫🇷</span>}
        />
      </AnimateOnScroll>
    </div>
  );
}
