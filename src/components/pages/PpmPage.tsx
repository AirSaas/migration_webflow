"use client";

/**
 * PpmPage — landing page for /fr/lp/ppm.
 *
 * Composition follows the structure document ("Estructura LP PPM") provided
 * by marketing. Section order, copy and CTAs are sourced from that doc; the
 * live airsaas.io/fr/lp/ppm page is the visual reference for images and
 * trust signals. Two deviations from the doc are intentional and documented
 * here (both forced by DS component contracts — see docs/decisions.md):
 *
 *   - Section 2 (client logos) uses <LogosBar> instead of <ClientsFrame>.
 *     ClientsFrame is for 6–9 rich client cards (avatar + name + role); for
 *     plain company-logo strips its own @dontUse points to LogosBar.
 *
 *   - Section 4 (pain points) uses <ComparisonFrame> (numbered 1–4 cards)
 *     instead of <FeatureSectionStacked>. FeatureSectionStacked's
 *     @forbidden rejects image-less use; the pain-points section is text-only.
 *     ComparisonFrame is what the LpExamplePage blueprint also uses here.
 *
 * Assets live under public/assets/images/lp-ppm/.
 */

import { Hero } from "@/components/library-design/sections/Hero";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { ComparisonFrame } from "@/components/library-design/sections/ComparisonFrame";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { PillarFrame } from "@/components/library-design/sections/PillarFrame";
import { TestimonialsFrame } from "@/components/library-design/sections/TestimonialsFrame";
import { IconRowFrame } from "@/components/library-design/sections/IconRowFrame";
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
  ArrowsRotateIcon,
  CommentsIcon,
  LockKeyholeIcon,
  IndustryIcon,
  BullseyeArrowIcon,
  GearsIcon,
  DollyIcon,
  CirclePlusIcon,
  FlagCheckeredIcon,
  StopwatchIcon,
  FilePenIcon,
  CalendarDayIcon,
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

function IntegrationIcon({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-[3rem] w-auto object-contain md:h-[3.5rem]"
      loading="lazy"
    />
  );
}

const PPM_PAGE_PATH = "/assets/images/lp-ppm";

export default function PpmPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* 1. Hero — eyebrow + dual CTA + 3 trust badges + dashboard Q1 image.
           Note: Hero only renders `eyebrow` in layout="split"; for the centered
           layout we surface the same "OUTIL PPM" label via `topTag`. */}
      <Hero
        layout="centered"
        topTag={{ label: "OUTIL PPM", variant: "muted" }}
        navItems={BLOG_INDEX_DATA.navItems}
        navCtaLabel={BLOG_INDEX_DATA.navCtaLabel}
        navCtaHref={BLOG_INDEX_DATA.navCtaHref}
        loginLabel={BLOG_INDEX_DATA.loginLabel}
        loginHref={BLOG_INDEX_DATA.loginHref}
        title="Un PPM avec une UX au top ?"
        titleHighlight="Ça existe."
        subtitle="Brief projet assisté par IA, flash report en 1 clic, roadmap partageable, vue macro consolidée. L'outil PPM que votre équipe va vraiment adopter."
        primaryCta={{ label: "Réservez une démo", href: "#demo" }}
        secondaryCta={{
          label: "Découvrir en vidéo (5 min)",
          href: "#video",
        }}
        bottomTags={[
          { label: "Approuvé par +100 clients", variant: "muted" },
          { label: "Opérationnel en 1 mois", variant: "success" },
          { label: "Accompagnement premium inclus", variant: "muted" },
        ]}
        imageSrc={`${PPM_PAGE_PATH}/dashboards/hero-portfolio-q1-2025.webp`}
        imageAlt="Dashboard AirSaas — vue portfolio Q1 2025 avec les onglets Strategy, Quarter Plan, Prioritization, Roadmap, Automatisation"
        floatingCards={false}
      />

      {/* 2. Client logos — Kiabi, Altavia, Valrhona, Intuis, SNCF
          (LogosBar "Custom label" sub-variant from AllVariants story:
          bordered + grayscale + md + leading label.) */}
      <LogosBar
        label="Ils nous font confiance"
        logos={[
          { src: `${PPM_PAGE_PATH}/logos/kiabi.png`, alt: "Kiabi" },
          { src: `${PPM_PAGE_PATH}/logos/altavia.svg`, alt: "Altavia" },
          { src: `${PPM_PAGE_PATH}/logos/valrhona.png`, alt: "Valrhona" },
          { src: `${PPM_PAGE_PATH}/logos/intuis.png`, alt: "Intuis" },
          { src: `${PPM_PAGE_PATH}/logos/sncf.svg`, alt: "SNCF" },
        ]}
      />

      {/* 3. Results / metrics — 4 FeatureCard stats in ValuePropositionFrame */}
      <ValuePropositionFrame
        tag="LES RÉSULTATS"
        titleHighlight="4 chiffres"
        title="qui changent avec AirSaas"
        subtitle="Les gains moyens observés sur nos clients PMO après 6 mois d'adoption."
        columns={4}
      >
        <FeatureCard
          icon={
            <MdIcon>
              <StopwatchIcon />
            </MdIcon>
          }
          title="-80%"
          description="De réunions projet inutiles."
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <FilePenIcon />
            </MdIcon>
          }
          title="0 PPT"
          description="Reporting généré en 1 clic, à jour, partageable."
          className="flex-1"
        />
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
          title="+60%"
          description="Des projets livrés on time & on budget."
          className="flex-1"
        />
      </ValuePropositionFrame>

      {/* 4. Pain points — "Vous vous reconnaissez ?"
          (Deviation: doc said FeatureSectionStacked; using ComparisonFrame
          per FSS @forbidden — no image available for this section.) */}
      <ComparisonFrame
        emoji="⚠️"
        title="Vous vous reconnaissez ?"
        subtitle="Les 4 symptômes que 9 PMO sur 10 nous décrivent en première réunion."
        items={[
          {
            value: 1,
            description:
              "Votre portefeuille projets vit dans un Excel à 1200 colonnes que vous seul comprenez.",
          },
          {
            value: 2,
            description:
              "Vous passez 2 jours à produire des PowerPoints qui sont obsolètes le lendemain.",
          },
          {
            value: 3,
            description:
              "Le Comex vous demande une roadmap, vous avez une liste de 47 projets sans priorité claire.",
          },
          {
            value: 4,
            description:
              "Des projets se rajoutent alors que certaines équipes sont à 200 %. Mais personne ne le voit.",
          },
        ]}
      />

      {/* 5. Flash Report — image right */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="GAIN DE TEMPS IMMÉDIAT"
        titleHighlight="Flash Report"
        title="en 1 clic"
        subtitle="Fini les 2 jours de PowerPoint. En un clic, générez un rapport complet, à jour, aux couleurs de votre entreprise. Partagez-le par email ou via un lien sécurisé."
        checklist={[
          "Export PDF, PPT ou lien web",
          "Personnalisable aux couleurs de l'entreprise",
          "Données toujours à jour",
          "Envoi automatique programmable",
        ]}
        imageSrc={`${PPM_PAGE_PATH}/screenshots/flash-report.webp`}
        imageAlt="Capture d'écran de la modale d'export Flash Report d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 6. Roadmap COMEX — image left, tag NOUVEAU */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="NOUVEAU"
        titleHighlight="Roadmap COMEX"
        title="partageable en un clic"
        subtitle="Partagez une roadmap dynamique avec le Comex via un lien sécurisé, sans qu'ils aient besoin de se connecter. Lecture seule, expiration configurable, droits personnalisés."
        checklist={[
          "Export PDF, PPT ou lien web",
          "Droits de lecture configurables",
          "Expiration automatique",
          "Roadmap et Flash Report = même source de vérité",
        ]}
        imageSrc={`${PPM_PAGE_PATH}/dashboards/roadmap.webp`}
        imageAlt="Capture de la page Roadmap d'AirSaas montrant le partage Comex"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 7. Priorisation #1 #2 #3 — image right */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="CLARTÉ ABSOLUE"
        titleHighlight="Priorisation"
        title="explicite #1, #2, #3"
        subtitle="Chaque équipe doit pouvoir dire ce qui est #1, #2, #3 — pas un « top 10 ». Et dès que l'ordre change, tout le monde le voit. Fini les « projets zombies »."
        checklist={[
          "Liste unique par équipe",
          "Changements visibles (qui, quoi, pourquoi)",
          "Vue d'arbitrage inter-directions",
          "Historique des décisions",
        ]}
        imageSrc={`${PPM_PAGE_PATH}/dashboards/priorisation.webp`}
        imageAlt="Capture de la vue Priorisation par équipe d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 8. Décisions pilotables — image left, tag NOUVEAU */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="NOUVEAU"
        titleHighlight="Décisions"
        title="pilotables"
        subtitle="Les décisions changent, se perdent dans les CR, et chacun en garde une version différente. AirSaas transforme les décisions en objets pilotables avec owner, échéance et impact sur la roadmap."
        checklist={[
          "Owner et échéance assignés",
          "Suivi du statut en temps réel",
          "Impact visible sur la roadmap",
          "Historique complet",
        ]}
        imageSrc={`${PPM_PAGE_PATH}/dashboards/portfolio-decisions.webp`}
        imageAlt="Capture de la vue Décisions pilotables d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 9. Portfolio consolidé multi-vues — image right */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="VUE MACRO"
        titleHighlight="Portfolio"
        title="consolidé multi-vues"
        subtitle="Tableau de bord, Kanban, Timeline, Liste filtrable… Visualisez votre portefeuille comme vous le souhaitez. Filtrez par météo, équipe, priorité, objectif."
        checklist={[
          "Vue Liste, Kanban, Timeline, Dashboard",
          "Filtres personnalisables",
          "Drill-down par direction / équipe",
          "Export en 1 clic",
        ]}
        imageSrc={`${PPM_PAGE_PATH}/dashboards/portfolio.webp`}
        imageAlt="Capture de la vue Portfolio multi-vues d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 10. Capacité par quarter — image left */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="QUARTER PLAN"
        titleHighlight="Capacité"
        title="par quarter et par équipe"
        subtitle="Visualisez en un clin d'œil la charge vs capacité de chaque équipe, trimestre par trimestre. Enfin un moyen simple de savoir si vous pouvez prendre ce nouveau projet."
        checklist={[
          "Vue capacité par équipe et par trimestre",
          "Alerte surcharge automatique",
          "T-shirt sizing (S, M, L, XL)",
          "Arbitrer avant de créer de la friction",
        ]}
        imageSrc={`${PPM_PAGE_PATH}/dashboards/capacity.webp`}
        imageAlt="Capture de la vue Capacité par quarter d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 11. Scénarios IA — image right */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="INTELLIGENCE ARTIFICIELLE"
        titleHighlight="Scénarios"
        title="d'arbitrage avec l'IA"
        subtitle="Passez de « roadmap figée » à « scénarios A/B/C ». L'IA structure ce qui manque, puis vous comparez les options en minutes : capacité consommée, délais, risques, valeur."
        checklist={[
          "Comparaison visuelle des scénarios",
          "Impact sur la capacité en temps réel",
          "Arbitrages documentés et traçables",
          "Fonctionne même avec des données imparfaites",
        ]}
        imageSrc={`${PPM_PAGE_PATH}/dashboards/scenarios.webp`}
        imageAlt="Capture de la page Scénarios d'arbitrage IA d'AirSaas"
        ctaLabel="Réservez une démo"
        ctaHref="#demo"
      />

      {/* 12. Why teams adopt — 3 pillars */}
      <PillarFrame
        title="adoptent AirSaas"
        titleHighlight="Pourquoi les équipes"
        subtitle="Un PPM n'a de valeur que s'il est utilisé. Voici ce qui fait la différence."
        columns={3}
        pillars={[
          {
            icon: (
              <LgIcon>
                <BoltLightningIcon />
              </LgIcon>
            ),
            title: "Prise en main immédiate",
            description:
              "Interface intuitive. Vos équipes l'utilisent dès le premier jour.",
          },
          {
            icon: (
              <LgIcon>
                <ArrowsRotateIcon />
              </LgIcon>
            ),
            title: "Connecté à vos outils",
            description:
              "Jira, Asana, Monday, Teams, Slack… Pas de double saisie.",
          },
          {
            icon: (
              <LgIcon>
                <CommentsIcon />
              </LgIcon>
            ),
            title: "UX pensée pour tous",
            description:
              "Du chef de projet au Comex, chacun trouve l'info dont il a besoin.",
          },
        ]}
      />

      {/* 13. Testimonials — 2 cards with photo + LinkedIn */}
      <TestimonialsFrame
        title="Ils parlent"
        titleHighlight="de nous"
        readMoreLabel="Lire la suite"
        readLessLabel="Voir moins"
      >
        <div className="grid w-full grid-cols-1 items-stretch gap-[1rem] md:grid-cols-2">
          <TestimonialCard
            quote="AirSaas nous permet de piloter notre capacité à faire en transverse avec tous les métiers. Cela rend les arbitrages Comex concrets et pragmatiques."
            name="Sébastien Louyot"
            role="CIO, Altavia (3000 pers.)"
            avatarSrc={`${PPM_PAGE_PATH}/people/sebastien-louyot.jpg`}
            linkedinHref="https://www.linkedin.com/in/sebastien-louyot/"
            readMoreLabel="Lire la suite"
            readLessLabel="Voir moins"
          />
          <TestimonialCard
            quote="Avec AirSaas nous avons pu ritualiser nos réunions de revue projet en supprimant les PowerPoints. Toute la DSI est alignée et informée au quotidien."
            name="Clément Royer"
            role="DSI, Chiesi France"
            avatarSrc={`${PPM_PAGE_PATH}/people/clement-royer.jpeg`}
            linkedinHref="https://www.linkedin.com/in/clement-royer/"
            readMoreLabel="Lire la suite"
            readLessLabel="Voir moins"
          />
        </div>
      </TestimonialsFrame>

      {/* 14. Security — 4 trust badges as ValuePropositionFrame + FeatureCard */}
      <ValuePropositionFrame
        titleHighlight="Sécurité"
        title="au top"
        subtitle="AirSaas passe la porte des DSI les plus exigeantes."
        columns={4}
      >
        <FeatureCard
          icon={
            <MdIcon>
              <LockKeyholeIcon />
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
              <GearsIcon />
            </MdIcon>
          }
          title="SSO / SAML"
          description="Intégration Active Directory"
          className="flex-1"
        />
      </ValuePropositionFrame>

      {/* 15. Integrations — 6 brand icons */}
      <IconRowFrame
        titleHighlight="Connecté"
        title="à votre écosystème"
        subtitle="AirSaas s'intègre à vos outils pour éviter la double saisie."
        items={[
          {
            icon: (
              <IntegrationIcon
                src={`${PPM_PAGE_PATH}/integrations/jira.svg`}
                alt="Jira"
              />
            ),
            label: "Jira",
          },
          {
            icon: (
              <IntegrationIcon
                src={`${PPM_PAGE_PATH}/integrations/teams.svg`}
                alt="Microsoft Teams"
              />
            ),
            label: "Teams",
          },
          {
            icon: (
              <IntegrationIcon
                src={`${PPM_PAGE_PATH}/integrations/asana.svg`}
                alt="Asana"
              />
            ),
            label: "Asana",
          },
          {
            icon: (
              <IntegrationIcon
                src={`${PPM_PAGE_PATH}/integrations/slack.svg`}
                alt="Slack"
              />
            ),
            label: "Slack",
          },
          {
            icon: (
              <IntegrationIcon
                src={`${PPM_PAGE_PATH}/integrations/monday.svg`}
                alt="Monday.com"
              />
            ),
            label: "Monday",
          },
          {
            icon: (
              <IntegrationIcon
                src={`${PPM_PAGE_PATH}/integrations/code.svg`}
                alt="API"
              />
            ),
            label: "API",
          },
        ]}
      />

      {/* 16. How it works — 4 deployment steps */}
      <StepsFrame
        title="ça marche ?"
        titleHighlight="Comment"
        subtitle="Un déploiement en douceur, sans big bang."
        steps={[
          {
            icon: (
              <LgIcon>
                <DollyIcon />
              </LgIcon>
            ),
            title: "Import",
            description: "Importez votre Excel ou connectez Jira / Asana.",
          },
          {
            icon: (
              <LgIcon>
                <GearsIcon />
              </LgIcon>
            ),
            title: "Configuration",
            description: "Paramétrez vos équipes et workflows.",
          },
          {
            icon: (
              <LgIcon>
                <CirclePlusIcon />
              </LgIcon>
            ),
            title: "Onboarding",
            description: "Accompagnement dédié par nos experts.",
          },
          {
            icon: (
              <LgIcon>
                <FlagCheckeredIcon />
              </LgIcon>
            ),
            title: "Go Live",
            description: "Premier Quarter Plan en production.",
          },
        ]}
      />

      {/* 17. FAQ */}
      <FaqFrame
        id="faq"
        title="Questions"
        titleHighlight="fréquentes"
        items={[
          {
            question: "AirSaas remplace-t-il Jira ou Asana ?",
            answer:
              "Non. AirSaas se positionne au-dessus de vos outils opérationnels. Vos équipes gardent Jira / Asana pour l'exécution, AirSaas sert au pilotage stratégique du portefeuille.",
          },
          {
            question:
              "L'IA fonctionne-t-elle avec des données incomplètes ?",
            answer:
              "Oui. L'IA structure ce qui manque et vous permet de comparer des scénarios même avec une donnée imparfaite. Mieux vaut arbitrer avec des infos partielles que ne pas arbitrer du tout.",
          },
          {
            question: "Nos données sont-elles sécurisées ?",
            answer:
              "Oui. AirSaas est certifié ISO 27001, hébergé en France chez Scaleway. Nous mettons à disposition les résultats de pentest pour vos revues SSI.",
          },
          {
            question: "Combien de temps pour être opérationnel ?",
            answer:
              "1 mois pour le setup initial et la prise en main. Comptez 3 mois pour un Quarter Plan complet et bien ancré dans les rituels de l'organisation.",
          },
          {
            question: "Quel est le prix ?",
            answer:
              "Tarification sur mesure selon la taille de votre organisation. Parlons-en lors d'une démo.",
          },
        ]}
      />

      {/* 18. Closing dual CTA */}
      <CtaFrame
        id="demo"
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
          title="Découvrir en vidéo (5 min)"
          description="Voyez comment AirSaas révolutionne l'organisation projet en 5 minutes."
          ctaLabel="Voir la vidéo"
          ctaHref="/fr/video/ppm"
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
