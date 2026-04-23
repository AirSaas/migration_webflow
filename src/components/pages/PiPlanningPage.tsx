"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { ComparisonFrame } from "@/components/library-design/sections/ComparisonFrame";
import { ComparisonTableFrame } from "@/components/library-design/sections/ComparisonTableFrame";
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
  BoltLightningIcon,
} from "@/components/library-design/ui/icons/illustration-icons";
import {
  SITE_NAV_ITEMS,
  SITE_NAV_CTA,
  SITE_NAV_LOGIN,
  SITE_FOOTER_COLUMNS,
  SITE_FOOTER_COPYRIGHT,
} from "@/data/site-chrome";

const IMG = "/assets/pages/lp/pi-planning";

function Icon({ children }: { children: React.ReactNode }) {
  return <IconIllustration variant="dark" size="md">{children}</IconIllustration>;
}

const testimonials = [
  { quote: "AirSaas nous permet de piloter notre capacité à faire en transverse avec tous les métiers. Les arbitrages comex deviennent concrets et pragmatiques.", name: "Sébastien Louyot", role: "CIO, Altavia (3000 pers.)" },
];

const faqItems = [
  { question: "Ça remplace Jira ?", answer: "Non. Jira reste votre outil de delivery pour les équipes. AirSaas est la couche business au-dessus : reporting, roadmap, capacité, communication avec les métiers et le Comex." },
  { question: "Ça marche avec plusieurs ARTs ?", answer: "Oui. Vue consolidée multi-train. Chaque ART garde son autonomie, vous avez une vision globale pour le pilotage transverse." },
  { question: "Combien ça coûte ?", answer: "Prix accessible. Parlons-en lors d'une démo." },
  { question: "Mes données Jira sont sales, c'est un problème ?", answer: "Non. Vous importez vos features puis vous nettoyez et structurez dans AirSaas avant de finaliser. Pas besoin de faire le ménage dans Jira." },
  { question: "Combien de temps pour démarrer ?", answer: "1 PI pour être opérationnel. Pas 6 mois comme Jira Align. Accompagnement dédié par nos experts inclus." },
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

export default function PiPlanningPage() {
  return (
    <div className="w-full">
      <Hero
        navItems={SITE_NAV_ITEMS}
        navCtaLabel={SITE_NAV_CTA.label}
        navCtaHref={SITE_NAV_CTA.href}
        loginLabel={SITE_NAV_LOGIN.label}
        loginHref={SITE_NAV_LOGIN.href}
        topTag={{ label: "PI Planning", variant: "muted" }}
        title="Miro + Jira + PowerBI :"
        titleHighlight="ce n'est pas comme ça qu'un RTE embarque les métiers."
        subtitle="Synchronisez vos features Jira, nettoyez vos données, donnez une vue claire aux métiers et au Comex. Opérationnel en 1 PI, pas en 6 mois."
        primaryCta={{ label: "Réservez une démo", href: "/fr/meetings-pages" }}
        secondaryCta={{ label: "▶️ Découvrir l'outil PI Planning en vidéo", href: "/fr/video/pi-planning" }}
        imageSrc={`${IMG}/6481a14febfcd09672746347_outils-AirSaas-Jira2.png`}
        imageAlt="AirSaas + Jira integration"
      />

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="light"
          titleHighlight="+100 clients"
          title="nous font confiance"
        >
          <FeatureCard icon={<Icon><StopwatchIcon /></Icon>} title="0h" description="PowerBI à maintenir." className="flex-1" />
          <FeatureCard icon={<Icon><BoltLightningIcon /></Icon>} title="Native" description="Synchro Jira native." className="flex-1" />
          <FeatureCard icon={<Icon><CalendarDayIcon /></Icon>} title="1 PI" description="Pour être opérationnel." className="flex-1" />
          <FeatureCard icon={<Icon><BullseyeArrowIcon /></Icon>} title="-90%" description="De temps reporting." className="flex-1" />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ComparisonFrame
          title="Le quotidien du RTE aujourd'hui"
          subtitle="Vous vous reconnaissez ? On en parle tous les jours avec des RTE qui galèrent."
          items={[
            { value: 1, description: <>Le Program Board vit sur <strong>Miro pendant 2 jours</strong>. Après, c&apos;est le chaos.</> },
            { value: 2, description: <>Vous passez plus de temps à <strong>customiser Jira</strong> qu&apos;à piloter votre train.</> },
            { value: 3, description: <>Les reports Jira sont moches. Et <strong>la donnée n&apos;est pas clean</strong>, ça coûte cher d&apos;en faire des vrais.</> },
            { value: 4, description: <>Une feature pas finie en fin de PI ? Vous la décalez et <strong>perdez l&apos;historique</strong>.</> },
            { value: 5, description: <>Les <strong>métiers ne se connectent pas à Jira</strong>. Et vous le savez.</> },
            { value: 6, description: <>Vous êtes devenu <strong>expert Excel/PowerBI</strong> alors que votre job c&apos;est de faire livrer.</> },
          ]}
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          titleHighlight="AirSaas :"
          title="la couche business au-dessus de Jira"
          subtitle="On ne remplace pas Jira. On le rend compréhensible pour les humains normaux."
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Import Jira"
          titleHighlight="Import Jira"
          title="→ Nettoyage → Vue claire"
          subtitle="Vos données Jira sont sales ? Pas grave. Importez vos features, nettoyez et structurez dans AirSaas avant de finaliser. Vous gardez Jira pour les devs, vous avez enfin une vue propre pour les métiers."
          checklist={[
            "Import des features Jira",
            "Nettoyage des données dans AirSaas (pas dans Jira)",
            "Remontée des consommés et de la charge",
            "Synchro continue",
          ]}
          imageSrc={`${IMG}/6481a14febfcd09672746347_outils-AirSaas-Jira2.png`}
          imageAlt="AirSaas + Jira integration"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Sync Features"
          titleHighlight="Sync Features Jira"
          title="— Parlez initiatives, pas tickets"
          subtitle="Vos features Jira remontent dans AirSaas. Les tickets et stories en dessous ? On les enlève du radar. Le Comex voit des initiatives business, pas du bruit technique."
          checklist={[
            "Features Jira ↔ Features AirSaas (sync)",
            "Tickets/stories masqués (zéro bruit)",
            "Agrégation en initiatives lisibles",
            "Langage métier, pas langage dev",
          ]}
          imageSrc={`${IMG}/659ffa347659957234f8d0ea_Portfolio-projects-kanban-date-min.png`}
          imageAlt="Portfolio kanban"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Roadmap"
          titleHighlight="Roadmap partageable"
          title="aux sponsors"
          subtitle="Vos sponsors ne se connectent pas à Jira. Partagez une roadmap dynamique via un lien sécurisé. Lecture seule, expiration configurable."
          checklist={[
            "Lien sécurisé sans connexion requise",
            "Vue temps réel (pas un export figé)",
            "Les métiers voient enfin la roadmap",
            "Fini les slides à mettre à jour",
          ]}
          imageSrc={`${IMG}/69257da9e86301a387b7b761_quarter-plan-teams-EN.webp`}
          imageAlt="Quarter plan teams"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="Capacité"
          titleHighlight='"Peut-on prendre ce projet ?"'
          title="Enfin une réponse."
          subtitle="La vélocité ne répond pas à la question du métier. Visualisez la charge vs capacité de chaque équipe sur les prochains PI. Répondez avec des données, pas au feeling."
          checklist={[
            "Vue capacité par équipe et par PI",
            "Alerte surcharge automatique",
            "T-shirt sizing (S, M, L, XL)",
            "Scénarios d'arbitrage",
          ]}
          imageSrc={`${IMG}/66334ee7bcfcb0aa45802537_Capacity-screen.webp`}
          imageAlt="Capacity screen par PI"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          tag="Reporting"
          titleHighlight="Flash Report"
          title="en 1 clic"
          subtitle="Vous passiez 2 jours à construire des slides pour le Comex. Maintenant, vos données Jira génèrent un reporting business en 1 clic. Toujours à jour."
          checklist={[
            "Données Jira → Reporting Comex automatique",
            "Format présentation ou export",
            "Personnalisable par audience",
            "Historique des versions",
          ]}
          imageSrc={`${IMG}/65d742defe0bf46502743b11_Flash-report-export-modal.webp`}
          imageAlt="Flash Report"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          tag="IA"
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
          imageAlt="Scénarios IA"
          imageBgColor="var(--color-prevention-10)"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ComparisonTableFrame
          titleHighlight="Avant / Après"
          title="AirSaas"
          featuresLabel="Quotidien RTE"
          columns={[
            { label: "Avant" },
            { label: "Avec AirSaas", highlight: true },
          ]}
          rows={[
            {
              feature: "PI Planning",
              values: [
                "Miro pour le PI Planning",
                "Suivi PI dynamique et persistant",
              ],
            },
            {
              feature: "Dashboards",
              values: [
                "PowerBI pour les dashboards",
                "Flash Report en 1 clic",
              ],
            },
            {
              feature: "Capacité",
              values: [
                "Excel pour la capacité",
                "Vue capacitaire par équipe et par PI",
              ],
            },
            {
              feature: "Métiers",
              values: [
                "Jira pour les devs, rien pour les métiers",
                "Roadmap partageable aux sponsors",
              ],
            },
            {
              feature: "Reporting",
              values: [
                "3 semaines pour un reporting",
                "3 minutes pour un reporting",
              ],
            },
          ]}
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          variant="dark"
          titleHighlight="Pourquoi pas Jira Align,"
          title="PowerBI ou piplanning.io ?"
          subtitle="On ne vous jette pas la pierre. Vous avez essayé. Voici pourquoi ça coince."
          columns={3}
        >
          <FeatureCard icon={<Icon><StopwatchIcon /></Icon>} title="Jira Align" description="6 mois de déploiement. Prix délirant. Usine à gaz que seul le RTE utilise." className="flex-1" />
          <FeatureCard icon={<Icon><BoltLightningIcon /></Icon>} title="PowerBI + Jira" description="Maintenance infinie. Casse à chaque évolution. Compétences BI requises." className="flex-1" />
          <FeatureCard icon={<Icon><CalendarDayIcon /></Icon>} title="piplanning.io" description="Super pour l'event. Rien pour le suivi, rien pour le Comex." className="flex-1" />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" duration={700}>
        <TestimonialsFrame
          title="Ils ont arrêté"
          titleHighlight="le bricolage"
          testimonials={testimonials}
        />
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
          title="Arrêtez le bricolage. Embarquez les métiers."
          subtitle="Rejoignez les RTE et PMO qui ont transformé leur pilotage."
        >
          <CardCta
            title="Réserver une démo"
            description="30 min pour voir comment AirSaas simplifie votre pilotage de PI."
            ctaLabel="Choisir un créneau"
            ctaHref="/fr/meetings-pages"
            className="flex-1"
          />
          <CardCta
            title="Voir la vidéo"
            description="AirSaas pour les équipes SAFe, en action (5 min)."
            ctaLabel="Voir la vidéo"
            ctaHref="/fr/video/pi-planning"
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
