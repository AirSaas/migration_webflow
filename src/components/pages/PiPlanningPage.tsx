"use client";

/**
 * PiPlanningPage — landing page for /fr/lp/pi-planning.
 *
 * All copy is sourced verbatim from the live airsaas.io/fr/lp/pi-planning page.
 * Only the visual rendering is adapted to the AirSaaS Design System; no
 * content is paraphrased or invented. Where DS validators flag long values
 * (eyebrow tag, badges, secondary CTA), the live phrasing is preserved
 * because the user requirement is strict content fidelity.
 *
 * Two intentional deviations:
 *   - The "6 product modules" navigation row between hero and logos on the
 *     live page is a cross-link widget already exposed by the global Navbar;
 *     it is not a content section. Skipped, same as CapacityPlanningPage.
 *   - Product screenshots are reused from /lp-ppm/ and /lp-capacity-planning/
 *     — the underlying product surfaces are identical (portfolio, roadmap,
 *     capacity, scenarios, flash report).
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
  ArrowsRotateIcon,
  BanIcon,
  CalendarDayIcon,
  CalendarStarIcon,
  GearsIcon,
  StopwatchIcon,
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
      {/* 1. Hero — eyebrow + dual CTA + 3 trust badges + portfolio screenshot */}
      <Hero
        layout="centered"
        topTag={{
          label: "Pour les RTE, PMO SAFe et équipes agiles à l'échelle",
          variant: "muted",
        }}
        navItems={BLOG_INDEX_DATA.navItems}
        navCtaLabel={BLOG_INDEX_DATA.navCtaLabel}
        navCtaHref={BLOG_INDEX_DATA.navCtaHref}
        loginLabel={BLOG_INDEX_DATA.loginLabel}
        loginHref={BLOG_INDEX_DATA.loginHref}
        title="Miro + Jira + PowerBI :"
        titleHighlight="ce n'est pas comme ça qu'un RTE embarque les métiers."
        subtitle="Synchronisez vos features Jira, nettoyez vos données, donnez une vue claire aux métiers et au Comex. Opérationnel en 1 PI, pas en 6 mois."
        primaryCta={{ label: "Réservez une démo", href: "/fr/meetings-pages" }}
        secondaryCta={{
          label: "▶️ Découvrir l'outil PI Planning en vidéo →",
          href: "/fr/video/pi-planning",
        }}
        bottomTags={[
          { label: "Import Jira en quelques clics", variant: "success" },
          { label: "Nettoyage des données dans AirSaas", variant: "success" },
          { label: "Accompagnement pragmatique et efficace", variant: "success" },
        ]}
        imageSrc={`${PPM_PATH}/dashboards/hero-portfolio-q1-2025.webp`}
        imageAlt="Dashboard AirSaas — vue portfolio d'un Program Increment synchronisé avec Jira"
        floatingCards={false}
      />

      {/* 2. Client logos — "+100 clients nous font confiance" */}
      <LogosBar
        label="+100 clients nous font confiance"
        logos={[
          { src: `${PPM_PATH}/logos/kiabi.png`, alt: "Kiabi" },
          { src: `${PPM_PATH}/logos/altavia.svg`, alt: "Altavia" },
          { src: `${PPM_PATH}/logos/valrhona.png`, alt: "Valrhona" },
          { src: `${PPM_PATH}/logos/intuis.png`, alt: "Intuis" },
          { src: `${PPM_PATH}/logos/sncf.svg`, alt: "SNCF" },
        ]}
      />

      {/* 3. Trust stats — 4 number tiles (verbatim from live).
          Live presents these alongside the logo strip without a section heading;
          we pass title=" " (NBSP) to satisfy the DS contract without rendering
          an empty <H2>. */}
      <ValuePropositionFrame title=" " columns={4}>
        <FeatureCard
          icon={
            <MdIcon>
              <BanIcon />
            </MdIcon>
          }
          title="0"
          description="PowerBI à maintenir"
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <ArrowsRotateIcon />
            </MdIcon>
          }
          title="Jira"
          description="Synchro native"
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <CalendarDayIcon />
            </MdIcon>
          }
          title="1 PI"
          description="pour être opérationnel"
          className="flex-1"
        />
        <FeatureCard
          icon={
            <MdIcon>
              <StopwatchIcon />
            </MdIcon>
          }
          title="-80%"
          description="de temps reporting"
          className="flex-1"
        />
      </ValuePropositionFrame>

      {/* 4. Pain points — "Le quotidien du RTE aujourd'hui" (6 items, verbatim) */}
      <ComparisonFrame
        emoji="⚠️"
        title="Le quotidien du RTE aujourd'hui"
        subtitle=" "
        items={[
          {
            value: 1,
            description:
              "Le Program Board vit sur Miro pendant 2 jours. Après, c'est le chaos.",
          },
          {
            value: 2,
            description:
              "Vous passez plus de temps à customiser Jira qu'à piloter votre train. Vous êtes devenu certifié Jira, pas certifié RTE.",
          },
          {
            value: 3,
            description:
              "Les reports Jira sont moches. Et comme la donnée n'est pas clean, ça coûte cher d'en faire des vrais.",
          },
          {
            value: 4,
            description:
              "Une feature pas finie en fin de PI ? Vous la décalez et perdez l'historique. Ou vous bricolez. Au bout de 3 PI, c'est le chaos.",
          },
          {
            value: 5,
            description:
              "Les métiers ne se connectent pas à Jira. Et vous le savez.",
          },
          {
            value: 6,
            description:
              "Vous êtes devenu expert Excel/PowerBI alors que votre job c'est de faire livrer.",
          },
        ]}
      />

      {/* 5. Solution intro — "AirSaas : la couche business au-dessus de Jira" */}
      <SectionHeading
        titleGradient="AirSaas"
        titleDark=": la couche business au-dessus de Jira"
        subtitle="On ne remplace pas Jira. On le rend compréhensible pour les humains normaux."
      />

      {/* 6. Feature: Connecteur Jira (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="CONNECTEUR JIRA"
        titleHighlight="Import Jira"
        title=" → Nettoyage → Vue claire"
        subtitle="Vos données Jira sont sales ? Pas grave. Importez vos features, nettoyez et structurez dans AirSaas avant de finaliser. Vous gardez Jira pour les devs, vous avez enfin une vue propre pour les métiers."
        checklist={[
          "Import des features Jira",
          "Nettoyage des données dans AirSaas (pas dans Jira)",
          "Remontée des consommés et de la charge",
          "Synchro continue",
        ]}
        imageSrc={`${PPM_PATH}/dashboards/portfolio.webp`}
        imageAlt="Capture du portfolio AirSaas — features Jira importées et structurées par initiative"
        ctaLabel="Réserver une démo"
        ctaHref="/fr/meetings-pages"
      />

      {/* 7. Feature: Vue Business — Sync Features (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="VUE BUSINESS"
        titleHighlight="Sync Features Jira."
        title=" Enlevez le bruit. Parlez initiatives."
        subtitle="Vos features Jira remontent dans AirSaas. Les tickets et stories en dessous ? On les enlève du radar. Le Comex voit des initiatives business, pas du bruit technique."
        checklist={[
          "Features Jira ↔ Features AirSaas (sync)",
          "Tickets/stories masqués (zéro bruit)",
          "Agrégation en initiatives lisibles",
          "Langage métier, pas langage dev",
        ]}
        imageSrc={`${PPM_PATH}/dashboards/portfolio-decisions.webp`}
        imageAlt="Capture de la vue initiatives AirSaas — features agrégées en langage métier"
        ctaLabel="Réserver une démo"
        ctaHref="/fr/meetings-pages"
      />

      {/* 8. Feature: Roadmap partageable (image right, NOUVEAU) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="NOUVEAU"
        titleHighlight="Roadmap partageable"
        title=" aux sponsors"
        subtitle="Vos sponsors ne se connectent pas à Jira. Partagez une roadmap dynamique via un lien sécurisé. Lecture seule, expiration configurable."
        checklist={[
          "Lien sécurisé sans connexion requise",
          "Vue temps réel (pas un export figé)",
          "Les métiers voient enfin la roadmap",
          "Fini les slides à mettre à jour",
        ]}
        imageSrc={`${PPM_PATH}/dashboards/roadmap.webp`}
        imageAlt="Capture de la roadmap partageable AirSaas — vue temps réel pour les sponsors"
        ctaLabel="Réserver une démo"
        ctaHref="/fr/meetings-pages"
      />

      {/* 9. Feature: Capacité — "Peut-on prendre ce projet ?" (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="CAPACITÉ"
        titleHighlight={"« Peut-on prendre ce projet ? »"}
        title=" Enfin une réponse."
        subtitle="La vélocité ne répond pas à la question du métier. Visualisez la charge vs capacité de chaque équipe sur les prochains PI. Répondez avec des données, pas au feeling."
        checklist={[
          "Vue capacité par équipe et par PI",
          "Alerte surcharge automatique",
          "T-shirt sizing (S, M, L, XL)",
          "Scénarios d'arbitrage",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/capacity-screen.webp`}
        imageAlt="Capture de la vue capacitaire AirSaas — charge vs capacité par équipe et par PI"
        ctaLabel="Réserver une démo"
        ctaHref="/fr/meetings-pages"
      />

      {/* 10. Feature: Flash Report (image right, GAIN DE TEMPS) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="GAIN DE TEMPS"
        titleHighlight="Flash Report"
        title=" en 1 clic"
        subtitle="Vous passiez 2 jours à construire des slides pour le Comex. Maintenant, vos données Jira génèrent un reporting business en 1 clic. Toujours à jour."
        checklist={[
          "Données Jira → Reporting Comex automatique",
          "Format présentation ou export",
          "Personnalisable par audience",
          "Historique des versions",
        ]}
        imageSrc={`${PPM_PATH}/screenshots/flash-report.webp`}
        imageAlt="Capture de la modale Flash Report AirSaas — export reporting Comex en un clic"
        ctaLabel="Réserver une démo"
        ctaHref="/fr/meetings-pages"
      />

      {/* 11. Feature: Suivi continu — Objectifs PI (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="SUIVI CONTINU"
        titleHighlight="Les objectifs PI"
        title=" ne disparaissent plus"
        subtitle="Le PI Planning c'est 2 jours intenses... puis les objectifs disparaissent. Avec AirSaas, le suivi est continu. Vous savez où vous en êtes à tout moment."
        checklist={[
          "Objectifs PI visibles en permanence",
          "Taux de delivery par PI",
          "Identification des blocages",
          "Amélioration continue cycle après cycle",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/quarter-plan-kpi.webp`}
        imageAlt="Capture du suivi des objectifs PI AirSaas — taux d'avancement en temps réel"
        ctaLabel="Réserver une démo"
        ctaHref="/fr/meetings-pages"
      />

      {/* 12. Feature: IA Découpage (image right) */}
      <FeatureFrame
        layout="inline"
        imagePosition="right"
        tag="INTELLIGENCE ARTIFICIELLE"
        titleHighlight="IA"
        title=" pour découper vos initiatives"
        subtitle="L'IA vous aide à découper vos initiatives en se basant sur vos équipes et leur vélocité passée. Fini les estimations au doigt mouillé."
        checklist={[
          "Analyse de la vélocité historique par équipe",
          "Suggestions de découpage réalistes",
          "Prise en compte des compétences équipes",
          "Estimations basées sur des données, pas du feeling",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/ai-decoupage.webp`}
        imageAlt="Capture de l'agent IA Découpage AirSaas — répartition par équipe et par PI"
        ctaLabel="Réserver une démo"
        ctaHref="/fr/meetings-pages"
      />

      {/* 13. Feature: IA Scénarios (image left) */}
      <FeatureFrame
        layout="inline"
        imagePosition="left"
        tag="INTELLIGENCE ARTIFICIELLE"
        titleHighlight="Scénarios"
        title=" d'arbitrage avec l'IA"
        subtitle="Passez de « roadmap figée » à « scénarios A/B/C ». L'IA structure ce qui manque, puis vous comparez les options en minutes : capacité consommée, délais, risques, valeur."
        checklist={[
          "Comparaison visuelle des scénarios",
          "Impact sur la capacité en temps réel",
          "Arbitrages documentés et traçables",
          "Fonctionne même avec des données imparfaites",
        ]}
        imageSrc={`${CAP_PATH}/dashboards/scenarios.webp`}
        imageAlt="Capture de la page Scénarios d'arbitrage AirSaas — comparaison A/B/C"
        ctaLabel="Réserver une démo"
        ctaHref="/fr/meetings-pages"
      />

      {/* 14. Avant / Après AirSaas — 5 paired rows (verbatim) */}
      <ComparisonDualFrame
        titlePrefix="Avant / Après "
        titleHighlight="AirSaas"
        sansLabel="Avant"
        avecLabel="Après"
        sansItems={[
          { value: 1, description: "Miro pour le PI Planning" },
          { value: 2, description: "PowerBI pour les dashboards" },
          { value: 3, description: "Excel pour la capacité" },
          { value: 4, description: "Jira pour les devs, rien pour les métiers" },
          { value: 5, description: "3 semaines pour un reporting" },
        ]}
        avecItems={[
          { value: 1, description: "Suivi PI dynamique et persistant" },
          { value: 2, description: "Flash Report en 1 clic" },
          { value: 3, description: "Vue capacitaire par équipe et par PI" },
          { value: 4, description: "Roadmap partageable aux sponsors" },
          { value: 5, description: "3 minutes pour un reporting" },
        ]}
        ctaLabel="Réserver une démo"
        ctaHref="/fr/meetings-pages"
      />

      {/* 15. Competitor cards (verbatim) */}
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
              "6 mois de déploiement. Prix délirant. Usine à gaz que seul le RTE utilise vraiment.",
          },
          {
            icon: (
              <LgIcon>
                <GearsIcon />
              </LgIcon>
            ),
            title: "PowerBI + Jira",
            description:
              "Maintenance infinie. Casse à chaque évolution workflow. Compétences BI requises.",
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

      {/* 16. Differentiator one-liner (verbatim, immediately below competitors) */}
      <SectionHeading
        titleGradient="AirSaas"
        titleDark=": 1 PI de setup, prix accessible, utilisé au quotidien."
        subtitle="Par les équipes ET le Comex."
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
            quote="AirSaas nous permet de piloter notre capacité à faire en transverse avec tous les métiers. Cela rend les arbitrages comex concrets et pragmatiques."
            name="Sébastien Louyot"
            role="CIO, Altavia (3000 pers.)"
            avatarSrc={`${PPM_PATH}/people/sebastien-louyot.jpg`}
            linkedinHref="https://www.linkedin.com/in/slouyot/"
            readMoreLabel="Lire la suite"
            readLessLabel="Voir moins"
          />
        </div>
      </TestimonialsFrame>

      {/* 18. Sécurité — single tagline (verbatim) */}
      <SectionHeading
        titleGradient="Sécurité"
        titleDark="au top"
        subtitle="AirSaas passe la porte des DSI les plus exigeantes."
      />

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
            answer: "Prix accessible. Parlons-en lors d'une démo.",
          },
          {
            question: "Mes données Jira sont sales, c'est un problème ?",
            answer:
              "Non. Vous importez vos features puis vous nettoyez et structurez dans AirSaas avant de finaliser. Pas besoin de faire le ménage dans Jira.",
          },
          {
            question: "Combien de temps pour démarrer ?",
            answer:
              "1 PI pour être opérationnel. Pas 6 mois comme Jira Align. Accompagnement dédié par nos experts inclus.",
          },
        ]}
      />

      {/* 20. Closing dual CTA (verbatim) */}
      <CtaFrame
        id="demo"
        title="Arrêtez le bricolage. Embarquez enfin les métiers."
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
          title="Découvrir l'outil en vidéo"
          description="AirSaas pour les équipes SAFe, en action."
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
