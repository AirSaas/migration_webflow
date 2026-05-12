"use client";

/**
 * PiPlanningPage — landing page for /fr/lp/pi-planning.
 *
 * Composition follows the live airsaas.io/fr/lp/pi-planning page
 * (sections, copy and CTAs sourced directly from the live source). The
 * page is built only from DS sections — no hardcoded color / font /
 * spacing / typography. Same blueprint as CapacityPlanningPage / PpmPage.
 *
 * Three deviations from the live page are intentional:
 *
 *   - The "6 product modules" row that sits between the hero and the
 *     client logos on the live page is a navigation widget (it cross-
 *     links to /produit/portfolio, /produit/quarter-plan, etc.) rather
 *     than a content section. We skip it; the global Navbar already
 *     exposes the same links. Same rationale as CapacityPlanningPage.
 *
 *   - Product screenshots are reused from the existing /lp-ppm/ and
 *     /lp-capacity-planning/ asset directories — the underlying product
 *     surfaces are identical (portfolio, roadmap, capacity, scenarios,
 *     flash report) so cloning new files would be duplication.
 *
 *   - The differentiator one-liner that closes the competitor PillarFrame
 *     on the live page ("AirSaas : 1 PI de setup, prix accessible…") is
 *     rendered as a SectionHeading immediately below the PillarFrame so
 *     the contrast lands without inventing a one-off card variant.
 */

import { Hero } from "@/components/library-design/sections/Hero";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { ComparisonFrame } from "@/components/library-design/sections/ComparisonFrame";
import { ComparisonDualFrame } from "@/components/library-design/sections/ComparisonDualFrame";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { PillarFrame } from "@/components/library-design/sections/PillarFrame";
import { TestimonialsFrame } from "@/components/library-design/sections/TestimonialsFrame";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { SectionHeading } from "@/components/library-design/ui/SectionHeading";
import { LogosBar } from "@/components/library-design/ui/LogosBar";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { TestimonialCard } from "@/components/library-design/ui/TestimonialCard";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import {
  BullseyeArrowIcon,
  LockKeyholeIcon,
  IndustryIcon,
  ClipboardCheckIcon,
  GearsIcon,
  StopwatchIcon,
  CalendarStarIcon,
  CalendarDayIcon,
  ArrowsRotateIcon,
} from "@/components/library-design/ui/icons/illustration-icons";
import { BLOG_INDEX_DATA } from "@/data/blog";

function LgIcon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="lg">
      {children}
    </IconIllustration>
  );
}

function MdIcon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="md">
      {children}
    </IconIllustration>
  );
}

const PPM_PATH = "/assets/images/lp-ppm";
const CAP_PATH = "/assets/images/lp-capacity-planning";

export default function PiPlanningPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* 1. Hero — eyebrow tag + dual CTA + 3 trust badges + portfolio dashboard image */}
      <Hero
        layout="centered"
        topTag={{ label: "PI Planning simplifié", variant: "muted" }}
        navItems={BLOG_INDEX_DATA.navItems}
        navCtaLabel={BLOG_INDEX_DATA.navCtaLabel}
        navCtaHref={BLOG_INDEX_DATA.navCtaHref}
        loginLabel={BLOG_INDEX_DATA.loginLabel}
        loginHref={BLOG_INDEX_DATA.loginHref}
        title="Miro + Jira + PowerBI :"
        titleHighlight="ce n'est pas comme ça qu'un RTE embarque les métiers."
        subtitle="Synchronisez vos features Jira, nettoyez vos données, donnez une vue claire aux métiers et au Comex. Opérationnel en 1 PI, pas en 6 mois."
        primaryCta={{ label: "Réserver une démo", href: "#demo" }}
        secondaryCta={{
          label: "🎥 Découvrir l'outil en vidéo",
          href: "/fr/video/pi-planning",
        }}
        bottomTags={[
          { label: "Import Jira en 1 clic", variant: "success" },
          { label: "Nettoyage data dans AirSaas", variant: "muted" },
          { label: "Accompagnement pragmatique", variant: "muted" },
        ]}
        imageSrc={`${PPM_PATH}/dashboards/hero-portfolio-q1-2025.webp`}
        imageAlt="Dashboard AirSaas — vue portfolio d'un Program Increment synchronisé avec Jira"
        floatingCards={false}
      />

      {/* 2. Client logos — Kiabi, Altavia, Valrhona, Intuis, SNCF */}
      <LogosBar
        label="+100 clients embarquent leurs métiers avec AirSaas"
        logos={[
          { src: `${PPM_PATH}/logos/kiabi.png`, alt: "Kiabi" },
          { src: `${PPM_PATH}/logos/altavia.svg`, alt: "Altavia" },
          { src: `${PPM_PATH}/logos/valrhona.png`, alt: "Valrhona" },
          { src: `${PPM_PATH}/logos/intuis.png`, alt: "Intuis" },
          { src: `${PPM_PATH}/logos/sncf.svg`, alt: "SNCF" },
        ]}
      />

      {/* 3. Key metrics — 4 FeatureCard stats */}
      <ValuePropositionFrame
        tag="LES RÉSULTATS"
        titleHighlight="4 chiffres"
        title="qui changent avec AirSaas"
        subtitle="Les gains moyens observés chez les RTE et PMO qui adoptent AirSaas pour piloter leurs Program Increments."
        columns={4}
      >
        <FeatureCard
          icon={
            <MdIcon>
              <CalendarDayIcon />
            </MdIcon>
          }
          title="1 PI"
          description="Pour être opérationnel sur votre premier Program Increment."
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <ArrowsRotateIcon />
            </MdIcon>
          }
          title="Synchro Jira"
          description="Native, sans connecteur tiers ni script à maintenir."
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <BullseyeArrowIcon />
            </MdIcon>
          }
          title="0 PowerBI"
          description="Plus aucun dashboard BI à maintenir pour le Comex."
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <StopwatchIcon />
            </MdIcon>
          }
          title="-80%"
          description="De temps passé à construire des reportings PI."
          className="flex-1"
        />
      </ValuePropositionFrame>

      {/* 4. Pain points — "Le quotidien du RTE aujourd'hui" (6 items) */}
      <ComparisonFrame
        emoji="⚠️"
        title="Le quotidien du RTE aujourd'hui"
        subtitle="Les 6 symptômes que 9 RTE sur 10 nous décrivent en première réunion."
        items={[
          {
            value: 1,
            description:
              "Le Program Board vit sur Miro pendant 2 jours. Après, c'est le chaos : plus personne ne le met à jour.",
          },
          {
            value: 2,
            description:
              "Vous passez plus de temps à customiser Jira qu'à piloter votre train de delivery.",
          },
          {
            value: 3,
            description:
              "Les reports Jira sont moches et incompréhensibles pour les métiers et le Comex.",
          },
          {
            value: 4,
            description:
              "Une feature pas finie en fin de PI ? Vous la décalez et perdez tout l'historique de pilotage.",
          },
          {
            value: 5,
            description:
              "Les métiers ne se connectent pas à Jira. Vous traduisez à la main lors de chaque revue.",
          },
          {
            value: 6,
            description:
              "Vous êtes devenu expert Excel et PowerBI alors que votre job c'est de faire livrer.",
          },
        ]}
      />

      {/* 5. Solution intro — "AirSaas : la couche business au-dessus de Jira" */}
      <SectionHeading
        titleGradient="AirSaas"
        titleDark=": la couche business au-dessus de Jira"
        subtitle="On ne remplace pas Jira. On le rend compréhensible pour les humains normaux — métiers, sponsors, Comex."
      />

      {/* 6. Feature: Import Jira → Nettoyage → Vue claire (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="CONNECTEUR JIRA"
        titleHighlight="Import Jira"
        title=" → nettoyage → vue claire"
        subtitle="Vos données Jira sont sales ? Pas grave. Importez vos features, nettoyez et structurez dans AirSaas — sans toucher au Jira de vos équipes."
        checklist={[
          "Import des features Jira en quelques clics",
          "Nettoyage et structuration dans AirSaas",
          "Remontée des consommés et de la charge",
          "Synchronisation continue Jira ↔ AirSaas",
        ]}
        imageSrc={`${PPM_PATH}/dashboards/portfolio.webp`}
        imageAlt="Capture du portfolio AirSaas — features Jira importées et structurées par initiative"
        ctaLabel="Réserver une démo"
        ctaHref="#demo"
      />

      {/* 7. Feature: Sync Features — vue métier (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="VUE MÉTIER"
        titleHighlight="Sync features Jira."
        title=" Enlevez le bruit. Parlez initiatives."
        subtitle="Vos features Jira remontent dans AirSaas. Les tickets et stories en dessous ? On les enlève du radar pour que sponsors et Comex parlent enfin le même langage que vous."
        checklist={[
          "Features Jira ↔ Features AirSaas en sync",
          "Tickets et stories masqués : zéro bruit",
          "Agrégation en initiatives lisibles",
          "Langage métier, pas langage dev",
        ]}
        imageSrc={`${PPM_PATH}/dashboards/portfolio-decisions.webp`}
        imageAlt="Capture de la vue initiatives AirSaas — features agrégées en langage métier"
        ctaLabel="Réserver une démo"
        ctaHref="#demo"
      />

      {/* 8. Feature: Roadmap partageable (image right, NOUVEAU) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="NOUVEAU"
        titleHighlight="Roadmap"
        title=" partageable aux sponsors"
        subtitle="Vos sponsors ne se connectent pas à Jira. Partagez une roadmap dynamique via un lien sécurisé. Plus de slides à mettre à jour."
        checklist={[
          "Lien sécurisé, sans connexion requise",
          "Vue temps réel, pas un export figé",
          "Les métiers voient enfin la roadmap",
          "Fini les decks PowerPoint à maintenir",
        ]}
        imageSrc={`${PPM_PATH}/dashboards/roadmap.webp`}
        imageAlt="Capture de la roadmap partageable AirSaas — vue temps réel pour les sponsors"
        ctaLabel="Réserver une démo"
        ctaHref="#demo"
      />

      {/* 9. Feature: Capacité par équipe (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="CAPACITÉ"
        titleHighlight="« Peut-on prendre ce projet ? »"
        title=" Enfin une réponse."
        subtitle="La vélocité ne répond pas à la question du métier. Visualisez la charge vs capacité de chaque équipe et arbitrez avec des données, pas au feeling."
        checklist={[
          "Vue capacité par équipe et par PI",
          "Alerte surcharge automatique",
          "T-shirt sizing (S, M, L, XL)",
          "Scénarios d'arbitrage en temps réel",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/capacity-screen.webp`}
        imageAlt="Capture de la vue capacitaire AirSaas — charge vs capacité par équipe et par PI"
        ctaLabel="Réserver une démo"
        ctaHref="#demo"
      />

      {/* 10. Feature: Flash Report (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="GAIN DE TEMPS"
        titleHighlight="Flash Report"
        title=" en 1 clic"
        subtitle="Vous passiez 2 jours à construire des slides pour le Comex. Maintenant, vous générez un reporting prêt à présenter en quelques secondes."
        checklist={[
          "Données Jira → reporting Comex automatique",
          "Format présentation ou export PDF",
          "Personnalisable par audience",
          "Historique des versions conservé",
        ]}
        imageSrc={`${PPM_PATH}/screenshots/flash-report.webp`}
        imageAlt="Capture de la modale Flash Report AirSaas — export reporting Comex en un clic"
        ctaLabel="Réserver une démo"
        ctaHref="#demo"
      />

      {/* 11. Feature: Objectifs PI (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="SUIVI CONTINU"
        titleHighlight="Les objectifs PI"
        title=" ne disparaissent plus"
        subtitle="Le PI Planning, c'est 2 jours intenses… puis les objectifs disparaissent dans Jira. AirSaas garde le cap visible tout au long du PI."
        checklist={[
          "Objectifs PI visibles en permanence",
          "Taux de delivery par PI",
          "Identification des blocages en temps réel",
          "Amélioration continue cycle après cycle",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/quarter-plan-kpi.webp`}
        imageAlt="Capture du suivi des objectifs PI AirSaas — taux d'avancement en temps réel"
        ctaLabel="Réserver une démo"
        ctaHref="#demo"
      />

      {/* 12. Feature: IA Découpage (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="INTELLIGENCE ARTIFICIELLE"
        titleHighlight="IA"
        title=" pour découper vos initiatives"
        subtitle="L'IA vous aide à découper vos initiatives en s'appuyant sur vos équipes et leur vélocité passée. Estimations basées sur des données, pas du feeling."
        checklist={[
          "Analyse de la vélocité historique par équipe",
          "Suggestions de découpage réalistes",
          "Prise en compte des compétences équipes",
          "Estimations data-driven, pas au doigt mouillé",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/ai-decoupage.webp`}
        imageAlt="Capture de l'agent IA Découpage AirSaas — répartition par équipe et par PI"
        ctaLabel="Réserver une démo"
        ctaHref="#demo"
      />

      {/* 13. Feature: Scénarios IA (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="INTELLIGENCE ARTIFICIELLE"
        titleHighlight="Scénarios"
        title=" d'arbitrage avec l'IA"
        subtitle="Passez de « roadmap figée » à « scénarios A/B/C ». Comparez visuellement et arbitrez avec impact en temps réel sur la capacité."
        checklist={[
          "Comparaison visuelle des scénarios",
          "Impact sur la capacité en temps réel",
          "Arbitrages documentés et traçables",
          "Fonctionne même avec des données imparfaites",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/scenarios.webp`}
        imageAlt="Capture de la page Scénarios d'arbitrage AirSaas — comparaison A/B/C"
        ctaLabel="Réserver une démo"
        ctaHref="#demo"
      />

      {/* 14. Avant / Après AirSaas — 5 paired rows */}
      <ComparisonDualFrame
        titlePrefix="Avant / Après "
        titleHighlight="AirSaas"
        sansLabel="Avant"
        avecLabel="Après"
        sansItems={[
          { value: 1, description: "Miro pour le PI Planning, oublié dès J+3." },
          { value: 2, description: "PowerBI pour les dashboards Comex, maintenance infinie." },
          { value: 3, description: "Excel pour la capacité, lourd et figé." },
          { value: 4, description: "Jira pour les devs, rien pour les métiers." },
          { value: 5, description: "3 semaines pour un reporting Comex présentable." },
        ]}
        avecItems={[
          { value: 1, description: "Suivi PI dynamique et persistant, tout au long du cycle." },
          { value: 2, description: "Flash Report en 1 clic, prêt à présenter au Comex." },
          { value: 3, description: "Vue capacitaire par équipe et par PI, actualisée." },
          { value: 4, description: "Roadmap partageable aux sponsors, sans login Jira." },
          { value: 5, description: "3 minutes pour un reporting Comex présentable." },
        ]}
        ctaLabel="Réserver une démo"
        ctaHref="#demo"
      />

      {/* 15. Pourquoi pas Jira Align, PowerBI ou piplanning.io — 3 PillarFrame */}
      <PillarFrame
        title="Jira Align, PowerBI ou piplanning.io ?"
        titleHighlight="Pourquoi pas"
        subtitle="On ne vous jette pas la pierre. Vous avez essayé. Voici pourquoi ça coince."
        columns={3}
        pillars={[
          {
            icon: (
              <LgIcon>
                <StopwatchIcon />
              </LgIcon>
            ),
            title: "Jira Align",
            description:
              "6 mois de déploiement, prix délirant, usine à gaz que seul le RTE utilise vraiment.",
          },
          {
            icon: (
              <LgIcon>
                <GearsIcon />
              </LgIcon>
            ),
            title: "PowerBI + Jira",
            description:
              "Maintenance infinie, casse à chaque évolution de workflow, compétences BI requises.",
          },
          {
            icon: (
              <LgIcon>
                <CalendarStarIcon />
              </LgIcon>
            ),
            title: "piplanning.io",
            description:
              "Super pour l'event PI Planning. Et après ? Rien pour le suivi, rien pour le Comex.",
          },
        ]}
      />

      {/* 16. AirSaas differentiator — closing tagline below the competitor PillarFrame */}
      <SectionHeading
        titleGradient="AirSaas"
        titleDark=": 1 PI de setup, prix accessible, utilisé au quotidien."
        subtitle="Côté équipes ET côté Comex. Pas une usine à gaz, pas un outil-événement, pas un dashboard BI à maintenir."
      />

      {/* 17. Testimonial — Sébastien Louyot (photo + LinkedIn reused from /lp-ppm/) */}
      <TestimonialsFrame
        title="Ils ont arrêté"
        titleHighlight="le bricolage"
        readMoreLabel="Lire la suite"
        readLessLabel="Voir moins"
      >
        <div className="grid w-full grid-cols-1 items-stretch gap-[1rem]">
          <TestimonialCard
            quote="AirSaas nous permet de piloter notre capacité à faire en transverse avec tous les métiers. Cela rend les arbitrages Comex concrets et pragmatiques."
            name="Sébastien Louyot"
            role="CIO, Altavia (3000 pers.)"
            avatarSrc={`${PPM_PATH}/people/sebastien-louyot.jpg`}
            linkedinHref="https://www.linkedin.com/in/slouyot/"
            readMoreLabel="Lire la suite"
            readLessLabel="Voir moins"
          />
        </div>
      </TestimonialsFrame>

      {/* 18. Sécurité — 4 trust badges */}
      <ValuePropositionFrame
        titleHighlight="Sécurité"
        title="au top"
        subtitle="AirSaas passe la porte des DSI les plus exigeantes."
        columns={4}
      >
        <FeatureCard
          icon={
            <MdIcon>
              <ClipboardCheckIcon />
            </MdIcon>
          }
          title="ISO 27001"
          description="Certifié"
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <IndustryIcon />
            </MdIcon>
          }
          title="Hébergé en France"
          description="Scaleway"
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <BullseyeArrowIcon />
            </MdIcon>
          }
          title="Pentest"
          description="Résultats sur demande"
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <LockKeyholeIcon />
            </MdIcon>
          }
          title="SSO / SAML"
          description="Intégration AD"
          className="flex-1"
        />
      </ValuePropositionFrame>

      {/* 19. FAQ */}
      <FaqFrame
        id="faq"
        title="Questions"
        titleHighlight="fréquentes"
        items={[
          {
            question: "Ça remplace Jira ?",
            answer:
              "Non. Jira reste votre outil de delivery pour les équipes. AirSaas est la couche business au-dessus : reporting, roadmap, capacité, communication avec les métiers et le Comex.",
          },
          {
            question: "Ça marche avec plusieurs ARTs ?",
            answer:
              "Oui. Vue consolidée multi-train. Chaque ART garde son autonomie, vous avez une vision globale pour le pilotage transverse.",
          },
          {
            question: "Combien ça coûte ?",
            answer:
              "Prix accessible — sans commune mesure avec Jira Align. Parlons-en lors d'une démo, on calibre selon votre contexte.",
          },
          {
            question: "Mes données Jira sont sales, c'est un problème ?",
            answer:
              "Non. Vous importez vos features puis vous nettoyez et structurez dans AirSaas avant de finaliser. Pas besoin de faire le ménage dans Jira au préalable.",
          },
          {
            question: "Combien de temps pour démarrer ?",
            answer:
              "1 PI pour être opérationnel. Pas 6 mois comme Jira Align. Accompagnement dédié par nos experts inclus dans le setup.",
          },
        ]}
      />

      {/* 20. Closing dual CTA */}
      <CtaFrame
        id="demo"
        title="Arrêtez le bricolage. Embarquez enfin les métiers."
        subtitle="Rejoignez les RTE et PMO qui ont transformé leur pilotage de PI."
      >
        <CardCta
          title="Réserver une démo"
          description="30 min pour voir comment AirSaas simplifie votre pilotage de PI."
          ctaLabel="Choisir un créneau"
          ctaHref="/fr/meetings-pages"
          className="flex-1"
        />
        <CardCta
          title="Découvrir l'outil en vidéo"
          description="5 min — AirSaas pour les équipes SAFe, en action."
          ctaLabel="Voir la vidéo"
          ctaHref="/fr/video/pi-planning"
          ctaVariant="tertiary"
          className="flex-1"
        />
      </CtaFrame>

      {/* Footer */}
      <Footer
        columns={BLOG_INDEX_DATA.footerColumns}
        copyright={BLOG_INDEX_DATA.copyright}
      />
    </main>
  );
}
