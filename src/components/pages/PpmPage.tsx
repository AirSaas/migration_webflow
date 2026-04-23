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

const IMG = "/assets/pages/lp/ppm";

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

const testimonials = [
  { quote: "AirSaas nous permet de piloter notre capacité à faire en transverse avec tous les métiers. Cela rend les arbitrages comex concrets et pragmatiques.", name: "Sébastien Louyot", role: "CIO, Altavia (3000 pers.)" },
  { quote: "Avec AirSaas nous avons pu ritualiser nos réunions de revue projet en supprimant les PowerPoints. Toute la DSI est alignée et informée au quotidien.", name: "Clément Royer", role: "DSI, Chiesi France" },
];

const faqItems = [
  { question: "AirSaas remplace-t-il Jira ou Asana ?", answer: "Non. AirSaas se positionne au-dessus de vos outils opérationnels. Vos équipes gardent Jira/Asana pour l'exécution, AirSaas sert au pilotage stratégique du portefeuille." },
  { question: "L'IA fonctionne-t-elle avec des données incomplètes ?", answer: "Oui. L'IA structure ce qui manque et vous permet de comparer des scénarios même avec une donnée imparfaite. Mieux vaut arbitrer avec des infos partielles que ne pas arbitrer du tout." },
  { question: "Nos données sont-elles sécurisées ?", answer: "Oui. AirSaas est certifié ISO 27001, hébergé en France chez Scaleway. Nous mettons à disposition les résultats de pentest pour vos revues SSI." },
  { question: "Combien de temps pour être opérationnel ?", answer: "1 mois pour le setup initial et la prise en main. Comptez 3 mois pour un Quarter Plan complet et bien ancré dans les rituels de l'organisation." },
  { question: "Quel est le prix ?", answer: "Prix accessible. Tarification sur mesure selon la taille de votre organisation. Parlons-en lors d'une démo." },
];

const relatedSolutions = [
  {
    imageSrc: `${IMG}/66334ee7bcfcb0aa45802537_Capacity-screen.webp`,
    imageAlt: "Vue capacitaire",
    title: "Capacity planning : pouvons-nous faire ces projets ?",
    description: "La vue capacitaire pour savoir ce qu'il est possible de faire, trimestre par trimestre.",
    href: "/fr/produit/capacity-planning",
  },
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
];

export default function PpmPage() {
  return (
    <div className="w-full">
      <Hero
        navItems={SITE_NAV_ITEMS}
        navCtaLabel={SITE_NAV_CTA.label}
        navCtaHref={SITE_NAV_CTA.href}
        loginLabel={SITE_NAV_LOGIN.label}
        loginHref={SITE_NAV_LOGIN.href}
        topTag={{ label: "Outil PPM", variant: "muted" }}
        title="Un PPM avec une UX au top ?"
        titleHighlight="Ça existe."
        subtitle="Brief projet assisté par IA, flash report en 1 clic, roadmap partageable, vue macro consolidée. L'outil PPM que votre équipe va vraiment adopter."
        primaryCta={{ label: "Réservez une démo", href: "/fr/meetings-pages" }}
        secondaryCta={{ label: "▶️ Découvrir l'outil PPM en vidéo (5 min)", href: "/fr/video/ppm" }}
        imageSrc={`${IMG}/65d742defe0bf46502743b11_Flash-report-export-modal.webp`}
        imageAlt="Flash report export modal AirSaas"
      />

      <AnimateOnScroll animation="fade" duration={500}>
        <LogosBar label="Ils nous font confiance" logos={logos} />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="light"
          titleHighlight="Les chiffres"
          title="qui vous feront adopter AirSaas"
        >
          <FeatureCard icon={<Icon><StopwatchIcon /></Icon>} title="-80%" description="De réunions projet après 4 mois d'utilisation." className="flex-1" />
          <FeatureCard icon={<Icon><BoltLightningIcon /></Icon>} title="1 clic" description="Reporting en 1 clic — fini les 2 jours de PowerPoint." className="flex-1" />
          <FeatureCard icon={<Icon><CalendarDayIcon /></Icon>} title="1 mois" description="Pour être opérationnel. Accompagnement inclus." className="flex-1" />
          <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="+60%" description="Des projets on time & on budget." className="flex-1" />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ComparisonFrame
          title="Vous vous reconnaissez ?"
          subtitle="Les vrais problèmes du PPM aujourd'hui."
          items={[
            { value: 1, description: <>Votre portefeuille projets vit dans un <strong>Excel à 1200 colonnes</strong> que vous seul comprenez</> },
            { value: 2, description: <>Vous passez <strong>2 jours à produire des PowerPoints</strong> qui sont obsolètes le lendemain</> },
            { value: 3, description: <>Le Comex vous demande une roadmap, vous avez <strong>une liste de 47 projets</strong> sans priorité claire</> },
            { value: 4, description: <>Des projets se rajoutent alors que <strong>certaines équipes sont à 200%</strong>. Mais personne ne le voit.</> },
          ]}
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Reporting"
          titleHighlight="Flash Report"
          title="en 1 clic"
          subtitle="Fini les 2 jours de PowerPoint. En un clic, générez un rapport complet, à jour, aux couleurs de votre entreprise. Partagez-le par email ou via un lien sécurisé."
          checklist={[
            "Export PDF, PPT ou lien web",
            "Personnalisable aux couleurs de l'entreprise",
            "Données toujours à jour",
            "Envoi automatique programmable",
          ]}
          imageSrc={`${IMG}/65d742defe0bf46502743b11_Flash-report-export-modal.webp`}
          imageAlt="Flash Report export modal"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Roadmap"
          titleHighlight="Roadmap COMEX"
          title="partageable en un clic"
          subtitle="Partagez une roadmap dynamique avec le Comex via un lien sécurisé, sans qu'ils aient besoin de se connecter. Lecture seule, expiration configurable, droits personnalisés."
          checklist={[
            "Export PDF, PPT ou lien web",
            "Droits de lecture configurables",
            "Expiration automatique",
            "Roadmap et Flash Report = même source de vérité",
          ]}
          imageSrc={`${IMG}/65d35c96ec9fbf11d78e4b44_Portfolio-decisions--show-projects-title-.webp`}
          imageAlt="Roadmap partageable AirSaas"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Priorisation"
          titleHighlight="Priorisation"
          title="explicite #1, #2, #3"
          subtitle='Chaque équipe doit pouvoir dire ce qui est #1, #2, #3 — pas un "top 10". Et dès que l&apos;ordre change, tout le monde le voit. Fini les "projets zombies".'
          checklist={[
            "Liste unique par équipe",
            "Changements visibles (qui, quoi, pourquoi)",
            "Vue d'arbitrage inter-directions",
            "Historique des décisions",
          ]}
          imageSrc={`${IMG}/663d07b7eeea99ee02f71c97_Prioritization-per-team-ppt.webp`}
          imageAlt="Priorisation par équipe"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Portfolio"
          titleHighlight="Portfolio consolidé"
          title="multi-vues"
          subtitle="Tableau de bord, Kanban, Timeline, Liste filtrable... Visualisez votre portefeuille comme vous le souhaitez. Filtrez par météo, équipe, priorité, objectif."
          checklist={[
            "Vue Liste, Kanban, Timeline, Dashboard",
            "Filtres personnalisables",
            "Drill-down par direction / équipe",
            "Export en 1 clic",
          ]}
          imageSrc={`${IMG}/65d707b3e6ce3f9970b2d505_Portfolio-project-list-view.webp`}
          imageAlt="Portfolio project list view"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Capacité"
          titleHighlight="Capacité"
          title="par quarter et par équipe"
          subtitle="Visualisez en un clin d'œil la charge vs capacité de chaque équipe, trimestre par trimestre. Enfin un moyen simple de savoir si vous pouvez prendre ce nouveau projet."
          checklist={[
            "Vue capacité par équipe et par trimestre",
            "Alerte surcharge automatique",
            "T-shirt sizing (S, M, L, XL)",
            "Arbitrer avant de créer de la friction",
          ]}
          imageSrc={`${IMG}/66334ee7bcfcb0aa45802537_Capacity-screen.webp`}
          imageAlt="Capacity screen"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Intelligence Artificielle"
          titleHighlight="Scénarios d'arbitrage"
          title="avec l'IA"
          subtitle='Passez de "roadmap figée" à "scénarios A/B/C". L&apos;IA structure ce qui manque, puis vous comparez les options en minutes : capacité consommée, délais, risques, valeur.'
          checklist={[
            "Comparaison visuelle des scénarios",
            "Impact sur la capacité en temps réel",
            "Arbitrages documentés et traçables",
            "Fonctionne même avec des données imparfaites",
          ]}
          imageSrc={`${IMG}/67973435cf37dd18cddcdffa_Page-Scenarios-FR.webp`}
          imageAlt="Scénarios d'arbitrage IA"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="dark"
          titleHighlight="Pourquoi les équipes"
          title="adoptent AirSaas"
          subtitle="Un PPM n'a de valeur que s'il est utilisé. Voici ce qui fait la différence."
          columns={3}
        >
          <FeatureCard icon={<Icon><BoltLightningIcon /></Icon>} title="Prise en main immédiate" description="Interface intuitive. Vos équipes l'utilisent dès le premier jour." className="flex-1" />
          <FeatureCard icon={<Icon><SuitcaseIcon /></Icon>} title="Connecté à vos outils" description="Jira, Asana, Monday, Teams, Slack... Pas de double saisie." className="flex-1" />
          <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="UX pensée pour tous" description="Du chef de projet au Comex, chacun trouve l'info dont il a besoin." className="flex-1" />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <TestimonialsFrame
          title="Ils parlent"
          titleHighlight="de nous"
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
          <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="ISO 27001" description="Certifié." className="flex-1" />
          <FeatureCard icon={<Icon><CalendarDayIcon /></Icon>} title="Hébergé en France" description="Scaleway." className="flex-1" />
          <FeatureCard icon={<Icon><CircleCheckIcon /></Icon>} title="Pentest" description="Résultats sur demande." className="flex-1" />
          <FeatureCard icon={<Icon><LockKeyholeIcon /></Icon>} title="SSO / SAML" description="Intégration AD." className="flex-1" />
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
          title="De contremaître à coach d'organisation"
          subtitle="AirSaas libère le PMO des tâches administratives pour qu'il puisse enfin se concentrer sur la stratégie."
        >
          <CardCta
            title="Réserver une démo"
            description="30 min avec un expert pour voir AirSaas en action sur vos cas d'usage."
            ctaLabel="Choisir un créneau"
            ctaHref="/fr/meetings-pages"
            className="flex-1"
          />
          <CardCta
            title="Découvrir l'outil PPM en vidéo"
            description="5 minutes pour comprendre comment AirSaas révolutionne l'organisation projet."
            ctaLabel="Voir la vidéo"
            ctaHref="/fr/video/ppm"
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
