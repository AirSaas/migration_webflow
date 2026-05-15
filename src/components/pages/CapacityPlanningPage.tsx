"use client";

/**
 * CapacityPlanningPage — landing page for /fr/lp/capacity-planning.
 *
 * Composition follows the live airsaas.io/fr/lp/capacity-planning page
 * (sections, copy and CTAs sourced directly from the live source). The
 * page is built only from DS sections — no hardcoded color / font /
 * spacing / typography. Same blueprint as PpmPage.
 *
 * Two deviations from the live page are intentional:
 *
 *   - The "6 product modules" row that sits between the hero and the
 *     client logos on the live page is a navigation widget (it cross-
 *     links to /produit/portfolio, /produit/quarter-plan, etc.) rather
 *     than a content section. The DS does not provide a section
 *     component for that pattern (IconRowFrame is for integrations and
 *     LogosBar is for brand logos) — promoting one would require a new
 *     DS contract for a single-use anchor. We skip it; the global Navbar
 *     already exposes the same links.
 *
 *   - Client-logos section uses <LogosBar> (DS standard for company-
 *     logo strips). The same pattern is documented and used in PpmPage.
 *
 * Assets live under public/assets/images/lp-capacity-planning/, with
 * shared client logos + the Sébastien Louyot photo reused from /lp-ppm/.
 */

import { Hero } from "@/components/library-design/sections/Hero";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { ComparisonFrame } from "@/components/library-design/sections/ComparisonFrame";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { PillarFrame } from "@/components/library-design/sections/PillarFrame";
import { TestimonialsFrame } from "@/components/library-design/sections/TestimonialsFrame";
import { StepsFrame } from "@/components/library-design/sections/StepsFrame";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { LogosBar } from "@/components/library-design/ui/LogosBar";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { TestimonialCard } from "@/components/library-design/ui/TestimonialCard";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import {
  BoltLightningIcon,
  BullseyeArrowIcon,
  CommentsIcon,
  LockKeyholeIcon,
  IndustryIcon,
  ClipboardCheckIcon,
  GearsIcon,
  DollyIcon,
  CirclePlusIcon,
  FlagCheckeredIcon,
  StopwatchIcon,
  CalendarDayIcon,
  FilePenIcon,
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

const CAP_PATH = "/assets/images/lp-capacity-planning";
const PPM_PATH = "/assets/images/lp-ppm";

export default function CapacityPlanningPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* 1. Hero — eyebrow + dual CTA + 2 trust badges + capacity dashboard image */}
      <Hero
        layout="centered"
        topTag={{ label: "Capacity Planning simplifié", variant: "muted" }}
        navItems={BLOG_INDEX_DATA.navItems}
        navCtaLabel={BLOG_INDEX_DATA.navCtaLabel}
        navCtaHref={BLOG_INDEX_DATA.navCtaHref}
        loginLabel={BLOG_INDEX_DATA.loginLabel}
        loginHref={BLOG_INDEX_DATA.loginHref}
        title="Vos équipes sont surchargées ? C'est normal :"
        titleHighlight="personne ne sait ce qu'elles peuvent vraiment faire."
        subtitle="AirSaas vous donne une vue capacitaire claire et actionnable. Enfin un outil pour dire « non » avec des données, pas au feeling."
        primaryCta={{ label: "Réservez une démo", href: "#demo" }}
        secondaryCta={{
          label: "📘 Découvrir le guide Capacity Planning",
          href: "/fr/livre-blanc/capacity-planning",
        }}
        bottomTags={[
          { label: "Opérationnel en 1 mois", variant: "success" },
          { label: "Accompagnement premium inclus", variant: "muted" },
        ]}
        imageSrc={`${CAP_PATH}/dashboards/capacity-screen.webp`}
        imageAlt="Dashboard AirSaas — vue capacitaire d'une équipe avec charge vs capacité par quarter"
        floatingCards={false}
      />

      {/* 2. Client logos — Kiabi, Altavia, Valrhona, Intuis, SNCF
          (Logos reused from /lp-ppm/logos/.) */}
      <LogosBar
        label="Ils gèrent leur capacité avec AirSaas"
        logos={[
          { src: `${PPM_PATH}/logos/kiabi.png`, alt: "Kiabi" },
          { src: `${PPM_PATH}/logos/altavia.svg`, alt: "Altavia" },
          { src: `${PPM_PATH}/logos/valrhona.png`, alt: "Valrhona" },
          { src: `${PPM_PATH}/logos/intuis.png`, alt: "Intuis" },
          { src: `${PPM_PATH}/logos/sncf.svg`, alt: "SNCF" },
        ]}
      />

      {/* 3. Results / metrics — 4 FeatureCard stats */}
      <ValuePropositionFrame
        tag="LES RÉSULTATS"
        titleHighlight="4 chiffres"
        title="qui changent avec AirSaas"
        subtitle="Les gains moyens observés sur nos clients après 6 mois d'adoption d'AirSaas pour le capacity planning."
        columns={4}
      >
        <FeatureCard
          icon={
            <MdIcon>
              <CalendarDayIcon />
            </MdIcon>
          }
          title="1 mois"
          description="Pour être opérationnel sur votre premier Quarter Plan."
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <BullseyeArrowIcon />
            </MdIcon>
          }
          title="100%"
          description="Des projets lancés avec une capacité validée."
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <FilePenIcon />
            </MdIcon>
          }
          title="+60%"
          description="Des projets livrés on time & on budget."
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <StopwatchIcon />
            </MdIcon>
          }
          title="10 min"
          description="De l'idée au scénario d'arbitrage capacitaire."
          className="flex-1"
        />
      </ValuePropositionFrame>

      {/* 4. Pain points — "Les vrais problèmes du capacity planning" (6 items) */}
      <ComparisonFrame
        emoji="⚠️"
        title="Les vrais problèmes du capacity planning"
        subtitle="Les 6 symptômes que 9 PMO sur 10 nous décrivent en première réunion."
        items={[
          {
            value: 1,
            description:
              "Les outils de capacity planning existants sont trop complexes : personne ne les maintient au-delà du premier trimestre.",
          },
          {
            value: 2,
            description:
              "Votre capacitaire vit dans un Excel à 1200 colonnes que vous seul comprenez.",
          },
          {
            value: 3,
            description:
              "Impossible de répondre simplement à « peut-on prendre ce projet ? » sans 2 jours de revue.",
          },
          {
            value: 4,
            description:
              "Vous produisez des prévisions précisément fausses au lieu d'estimations approximativement correctes.",
          },
          {
            value: 5,
            description:
              "Le PMO est saturé par le quotidien, sans bande passante pour piloter la capacité.",
          },
          {
            value: 6,
            description:
              "Passer d'une idée floue à un projet structuré prend des mois : réunions, itérations, estimations au doigt mouillé.",
          },
        ]}
      />

      {/* 5. AI Agent — Brief projet (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="INTELLIGENCE ARTIFICIELLE"
        titleHighlight="Agent IA"
        title="Brief projet"
        subtitle="Quand une demande arrive floue (« on veut un truc »), l'agent IA mène l'entretien, collecte les informations critiques et transforme chaque demande en brief clair et comparable."
        checklist={[
          "Entretien guidé par l'IA",
          "Brief structuré selon vos templates",
          "Demandes comparables entre elles",
          "Dites non plus tôt, lancez moins de projets… mais mieux",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/ai-brief.webp`}
        imageAlt="Capture de l'Agent IA Brief projet d'AirSaas — conversation guidée"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 6. AI Agent — Découpage projet (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="INTELLIGENCE ARTIFICIELLE"
        titleHighlight="Agent IA"
        title="Découpage projet"
        subtitle="L'IA découpe automatiquement vos projets par quarter et par équipe. Elle connaît vos équipes : ce qu'elles savent faire, ce qu'elles ne font pas, leur vélocité passée."
        checklist={[
          "Découpage par quarter et par équipe",
          "Adapté aux compétences de chaque équipe",
          "Basé sur la vélocité historique",
          "Suggestions réalistes, pas théoriques",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/ai-decoupage.webp`}
        imageAlt="Capture de l'Agent IA Découpage projet d'AirSaas — répartition par équipe et trimestre"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 7. "De l'idée au scénario : 10 minutes" — 4-step process */}
      <StepsFrame
        title="au scénario : 10 minutes 🚀"
        titleHighlight="De l'idée"
        subtitle="Avant, cela prenait des mois. Aujourd'hui, les agents IA d'AirSaas font le travail. Clarté immédiate, scénario partageable."
        steps={[
          {
            icon: (
              <LgIcon>
                <CirclePlusIcon />
              </LgIcon>
            ),
            title: "Idée floue",
            description: "Une demande arrive, vague, incomplète, urgente.",
          },
          {
            icon: (
              <LgIcon>
                <FilePenIcon />
              </LgIcon>
            ),
            title: "Brief",
            description: "L'agent IA mène l'entretien et structure la demande.",
          },
          {
            icon: (
              <LgIcon>
                <GearsIcon />
              </LgIcon>
            ),
            title: "Découpage",
            description: "L'IA découpe par quarter et par équipe en fonction de la vélocité.",
          },
          {
            icon: (
              <LgIcon>
                <FlagCheckeredIcon />
              </LgIcon>
            ),
            title: "Estimation",
            description: "T-shirt sizing par livrable, scénario prêt à arbitrer.",
          },
        ]}
      />

      {/* 8. Vue capacitaire par équipe (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="VUE D'ENSEMBLE"
        titleHighlight="Vue capacitaire"
        title="par équipe"
        subtitle="En un clin d'œil, voyez si vos équipes sont dans les clous ou dans les choux. La base d'une discussion pragmatique pour arbitrer."
        checklist={[
          "Vue par équipe et par trimestre",
          "Alerte surcharge automatique",
          "Drill-down par projet",
          "Comparaison capacité vs charge",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/quarter-plan-teams.webp`}
        imageAlt="Capture de la vue Quarter Plan par équipe d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 9. Capacité future des équipes (image left, NOUVEAU) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="NOUVEAU"
        titleHighlight="Voir la capacité"
        title="future des équipes"
        subtitle="Combien de jours vos équipes peuvent-elles vraiment consacrer aux projets le trimestre prochain ? Tant que vous ne le savez pas, vous décidez à l'aveugle."
        checklist={[
          "Capacité par équipe et globale",
          "Projection sur 1, 2 ou 3 trimestres",
          "Portefeuille au-dessus ou en dessous de la capacité",
          "Arbitrer, décaler ou arrêter avant de créer de la friction",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/capacity-screen.webp`}
        imageAlt="Capture de la projection capacitaire future d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 10. T-shirt sizing (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="ESTIMATION"
        titleHighlight="T-shirt sizing"
        title=": S, M, L, XL"
        subtitle="Pas de micro-estimations en demi-journée qui seront fausses dès demain. On estime par livrable, pas par tâche. Approximativement juste plutôt que précisément faux."
        checklist={[
          "Estimation rapide et réaliste",
          "Conversion en jours configurable",
          "Ou saisie directe si vous préférez",
          "Pas de micro-management",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/t-shirt-sizing.webp`}
        imageAlt="Capture de la modale T-shirt sizing d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 11. Simulation de scénarios (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="SIMULATION"
        titleHighlight="Testez des scénarios"
        title="avant de décider"
        subtitle="Que se passe-t-il si on décale ce projet ? Si on en ajoute un autre ? Visualisez l'impact en temps réel. Glissez-déposez les projets dans la timeline."
        checklist={[
          "Drag & drop des projets",
          "Impact temps réel sur la charge",
          "Comparaison scénarios A/B/C",
          "Export PDF des scénarios",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/scenarios.webp`}
        imageAlt="Capture de la page Scénarios d'arbitrage d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 12. KPI Quarter Plan (image right, NOUVEAU) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="NOUVEAU"
        titleHighlight="KPI"
        title=": Taux d'avancement du Quarter Plan"
        subtitle="L'écart entre ce qu'on s'est engagé à livrer et ce qu'on a vraiment livré à la fin du trimestre. Sans ce KPI, impossible d'améliorer cycle après cycle."
        checklist={[
          "10 %, 50 % ou 100 % de l'engagement ?",
          "Ce qui a bloqué, identifié",
          "Amélioration du delivery rate",
          "KPI objectif pour le Comex",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/quarter-plan-kpi.webp`}
        imageAlt="Capture du KPI Taux d'avancement Quarter Plan d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 13. Par équipe, pas par personne (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="GRANULARITÉ"
        titleHighlight="Par équipe,"
        title="pas par personne"
        subtitle="Arrêtez les plannings individuels. Raisonnez à l'échelle de l'équipe. Découpez par compétences homogènes : Data, Sécurité, Frontend…"
        checklist={[
          "Équipe = groupe de compétences",
          "Capacité déclarée par équipe",
          "Pas de planning individuel à maintenir",
          "Focus sur le build, pas le micro",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/prioritization-per-team.webp`}
        imageAlt="Capture de la vue Priorisation par équipe d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 14. Notre parti pris — 3 pillars */}
      <PillarFrame
        title="parti pris"
        titleHighlight="Notre"
        subtitle="Approximativement juste plutôt que précisément faux."
        columns={3}
        pillars={[
          {
            icon: (
              <LgIcon>
                <BullseyeArrowIcon />
              </LgIcon>
            ),
            title: "Macro, pas micro",
            description:
              "Capacitaire au trimestre, par équipe. Pas à la tâche et à la personne.",
          },
          {
            icon: (
              <LgIcon>
                <BoltLightningIcon />
              </LgIcon>
            ),
            title: "Maintenable",
            description:
              "Parce qu'un capacitaire trop précis finit toujours à la poubelle.",
          },
          {
            icon: (
              <LgIcon>
                <CommentsIcon />
              </LgIcon>
            ),
            title: "Actionnable",
            description:
              "Répondez enfin à « peut-on prendre ce projet ? » avec des données.",
          },
        ]}
      />

      {/* 15. Testimonials — 2 cards with photo + LinkedIn */}
      <TestimonialsFrame
        title="Ils ont simplifié"
        titleHighlight="leur capacity planning"
        readMoreLabel="Lire la suite"
        readLessLabel="Voir moins"
      >
        <div className="grid w-full grid-cols-1 items-stretch gap-[1rem] md:grid-cols-2">
          <TestimonialCard
            quote="AirSaas nous permet de piloter notre capacité à faire en transverse avec tous les métiers. Cela rend les arbitrages Comex concrets et pragmatiques."
            name="Sébastien Louyot"
            role="CIO, Altavia (3000 pers.)"
            avatarSrc={`${PPM_PATH}/people/sebastien-louyot.jpg`}
            linkedinHref="https://www.linkedin.com/in/slouyot/"
            readMoreLabel="Lire la suite"
            readLessLabel="Voir moins"
          />
          <TestimonialCard
            quote="Enfin on peut répondre clairement à « peut-on prendre ce projet ? » sans passer 2 heures sur Excel."
            name="Aurore Butrot"
            role="DSI, Groupe Intuis"
            avatarSrc={`${CAP_PATH}/people/aurore-butrot.jpeg`}
            linkedinHref="https://www.linkedin.com/in/aurore-butrot/"
            readMoreLabel="Lire la suite"
            readLessLabel="Voir moins"
          />
        </div>
      </TestimonialsFrame>

      {/* 16. Security — 4 trust badges */}
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

      {/* 17. Opérationnel en 1 mois — 4-step deployment */}
      <StepsFrame
        title="en 1 mois"
        titleHighlight="Opérationnel"
        subtitle="Un déploiement simple et accompagné, pas un projet IT de 6 mois."
        steps={[
          {
            icon: (
              <LgIcon>
                <DollyIcon />
              </LgIcon>
            ),
            title: "Équipes",
            description: "Définir vos équipes et déclarer leur capacité.",
          },
          {
            icon: (
              <LgIcon>
                <GearsIcon />
              </LgIcon>
            ),
            title: "Projets",
            description: "Importer vos projets et estimer en T-shirt sizing.",
          },
          {
            icon: (
              <LgIcon>
                <CirclePlusIcon />
              </LgIcon>
            ),
            title: "Scénarios",
            description: "Tester différentes priorisations et arbitrages.",
          },
          {
            icon: (
              <LgIcon>
                <FlagCheckeredIcon />
              </LgIcon>
            ),
            title: "Décision",
            description: "Arbitrer avec des données, pas au feeling.",
          },
        ]}
      />

      {/* 18. FAQ */}
      <FaqFrame
        id="faq"
        title="Questions"
        titleHighlight="fréquentes"
        items={[
          {
            question:
              "Comment gérer des compétences différentes dans une équipe ?",
            answer:
              "Découpez vos équipes en regroupant les personnes aux compétences homogènes : « Data », « Sécurité », « Frontend »… Chaque équipe a sa propre capacité.",
          },
          {
            question:
              "Quelle temporalité choisir : trimestre, mois, PI ?",
            answer:
              "Le trimestre fonctionne bien car il s'aligne sur les cycles business. Mais vous pouvez configurer la durée qui vous convient : semestre ou PI.",
          },
          {
            question: "Combien de temps pour un Quarter Plan complet ?",
            answer:
              "1 mois pour le setup initial et la prise en main. Comptez 3 mois pour un Quarter Plan complet et bien ancré dans les rituels de l'organisation.",
          },
          {
            question:
              "Est-ce que ça suffit pour un vrai capacitaire ?",
            answer:
              "Oui, pour savoir ce qu'il est possible de faire au niveau macro. C'est ce qu'il manque au top management pour prioriser. Pour le micro-planning, gardez vos outils opérationnels.",
          },
        ]}
      />

      {/* 19. Closing dual CTA */}
      <CtaFrame
        id="demo"
        title="Arrêtez de lancer des projets sans capacité"
        subtitle="AirSaas libère le PMO des tâches administratives pour qu'il puisse enfin se concentrer sur la stratégie."
      >
        <CardCta
          title="Réserver une démo"
          description="30 min pour voir comment AirSaas peut transformer votre pilotage capacitaire."
          ctaLabel="Choisir un créneau"
          ctaHref="/fr/meetings-pages"
          className="flex-1"
        />
        <CardCta
          title="Découvrir le guide Capacity Planning"
          description="Quarter Plan & gestion capacitaire : la méthode complète."
          ctaLabel="Télécharger le Book"
          ctaHref="/fr/livre-blanc/capacity-planning"
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
