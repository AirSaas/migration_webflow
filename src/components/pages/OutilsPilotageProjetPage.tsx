"use client";

import { Hero } from "@/components/library-design/sections/Hero";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";
import {
  BullseyeArrowIcon,
  BoltLightningIcon,
  StopwatchIcon,
  ClipboardCheckIcon,
  FilePenIcon,
  GearsIcon,
  CommentsIcon,
  FlagCheckeredIcon,
  AtomIcon,
} from "@/components/library-design/ui/icons/illustration-icons";

/* ---------- Helpers ---------- */

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <IconIllustration variant="dark" size="md">
      {children}
    </IconIllustration>
  );
}

/* ---------- Navbar links ---------- */

const navItems = [
  { label: "Solutions", href: "#" },
  { label: "Produit", href: "#" },
  { label: "Ressources", href: "#" },
  { label: "Témoignages", href: "#" },
  { label: "Intégrations", href: "#" },
  { label: "Nouveautés", href: "#" },
  { label: "Le Quarter Plan", href: "#" },
  { label: "Intégration teams", href: "#" },
];

/* ---------- Footer ---------- */

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
      { label: "Newsletter des DSI" },
      { label: "Newsletter des Pro. de la Transfo." },
      { label: "Les Pro. de la Transfo." },
      { label: "Le blog d'AirSaas" },
      { label: "Podcast CIO Révolution" },
      { label: "La conduite de projet" },
      { label: "Portfolio project Management" },
      { label: "Le comité de pilotage" },
      { label: "Etre PMO en 2023" },
      { label: "Témoignages clients" },
      { label: "Évènements" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Management de portefeuille projet" },
      { label: "Moteur de recherche startup" },
      { label: "Flash report automatisé" },
      { label: "Flash report projet" },
      { label: "Outil PPM" },
      { label: "Outil de pilotage projet" },
      { label: "Outil de gestion de portefeuille projet" },
      { label: "Plan stratégique" },
      { label: "Portfolio management" },
      { label: "Revue de portefeuille" },
      { label: "Tableau de bord portefeuille de projet" },
      { label: "Tableau de bord DSI" },
      { label: "Tableau de bord de gestion de projet" },
    ],
  },
  {
    title: "Le Quarter Plan & les cadres méthodologiques",
    links: [
      {
        label:
          "AirSaas, le Quarter Plan et l'effectuation : piloter l'incertitude",
      },
    ],
    sections: [
      {
        title: "Alternative à",
        links: [{ label: "Sciforma" }, { label: "Planview Portfolio" }],
      },
    ],
  },
];

/* ================================================================
   OutilsPilotageProjetPage
   Source: https://www.airsaas.io/fr/solution/outils-de-pilotage-projet
   ================================================================ */

export function OutilsPilotageProjetPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* ——— 1. HERO ——— */}
      <Hero
        navItems={navItems}
        navCtaLabel="Réservez une démo"
        navCtaHref="#"
        loginLabel="Login"
        loginHref="#"
        topTag={{ label: "Outils de pilotage projet", variant: "muted" }}
        headline="Une nouvelle manière de voir les"
        headlineGradient="outils de pilotage projet"
        subtitle="Parce que la gestion ne se résume pas à un Gantt, AirSaas propose un outil de pilotage de projet qui simplifie votre reporting, votre gouvernance et votre communication projet"
        primaryCta={{ label: "Réservez une démo", href: "#" }}
        illustrationSrc="https://placehold.co/1457x857/e8eafc/3a51e2?text=Dashboard+Pilotage"
        illustrationAlt="Dashboard pilotage projet AirSaas"
      />

      {/* ——— 2. VALUE PROPOSITION — 3 piliers ——— */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <ValuePropositionFrame
          columns={3}
          title="Nous proposons l'outil de pilotage de projet le plus simple au monde."
          subtitle="Les outils de pilotage de projet permettent de donner de la visibilité aux managers et de leur offrir la faculté de hiérarchiser efficacement les projets en fonction des retombées potentielles pour l'entreprise."
        >
          <FeatureCard
            icon={
              <Icon>
                <BoltLightningIcon />
              </Icon>
            }
            title="Ultra simple"
            description="AirSaas ne demande aucun setup : importez votre Excel et commencer à utiliser l'outil. Pas de formation nécessaire, l'outil est utilisable par votre équipe projet dès le premier jour."
          />
          <FeatureCard
            icon={
              <Icon>
                <StopwatchIcon />
              </Icon>
            }
            title="3x moins cher que les outils du marché"
            description="Le prix ne doit pas être un frein à votre productivité. Profitez d'une période d'essai gratuite et payez ensuite un abonnement en fonction du nombre d'utilisateurs."
          />
          <FeatureCard
            icon={
              <Icon>
                <BullseyeArrowIcon />
              </Icon>
            }
            title="A partir de 10 projets"
            description="AirSaas vous fait gagner en visibilité et rend vos équipes plus productives quelle que soit la taille de votre DSI. N'attendez pas d'être débordé pour vous équiper."
          />
        </ValuePropositionFrame>
      </AnimateOnScroll>

      {/* ——— 3. FEATURE — Cadrage de projets ——— */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Accompagnez"
          title="le cadrage des projets"
          description="Un bon projet est un projet bien préparé. Pourtant, 90% des fiches de cadrage sont incomplètes. Sur AirSaas, nous guidons vos collaborateurs dans le remplissage des informations essentielles à un bon cadrage. Les fiches de cadrage sont dynamiques et collaboratives. Vos équipes peuvent itérer ensemble jusqu'à que le projet soit validé."
          imageSrc="https://placehold.co/1125x731/e8eafc/3a51e2?text=Cadrage+Projet"
        />
      </AnimateOnScroll>

      {/* ——— 4. FEATURE — Pilotage par la valeur ——— */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Le pilotage"
          title="de projet par la valeur"
          description="Tous les projets ne se valent pas. En tant que partenaire business, vous devez proposer une méthode pour piloter les projets IT suivant des indicateurs-clés. AirSaas propose une vue filtrable avec toutes les informations consolidées pour prendre des décisions avisées."
          imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Pilotage+Valeur"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* ——— 5. FEATURE — Reporting automatisé ——— */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          titleHighlight="Reportez"
          title="en un clic"
          description="Vous êtes au centre des attentions et devez tenir au courant les responsables métiers et votre direction de l'avancée des projets. Pour cela, nous avons créé les rapports flash automatisés. En un clic, générez un rapport (.ppt, .pdf, url) avec les détails d'avancée des projets, les points d'attention et tous les indicateurs à jour."
          imageSrc="https://placehold.co/1125x731/e8eafc/3a51e2?text=Flash+Report"
        />
      </AnimateOnScroll>

      {/* ——— 6. FEATURE — Timeline / Macro-planning ——— */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          titleHighlight="Prenez"
          title="de la hauteur"
          description="Rien ne vous échappe grâce à la vue timeline. Prenez de la hauteur et profitez d'un panorama sur tous les projets en cours et leurs jalons associés. Déplacez les éléments grâce au cliquer-glisser et testez des nouveaux arrangements en fonction des disponibilités des parties prenantes et de l'urgence des projets."
          imageSrc="https://placehold.co/1125x731/fffbeb/e58d05?text=Timeline+Projets"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* ——— 7. MID CTA ——— */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Choisissez de gagner du temps et du contrôle"
          subtitle="Adoptez dès maintenant une solution efficace de flash report projet"
        >
          <div
            style={{ gridColumn: "1 / -1", width: "70%", margin: "0 auto" }}
          >
            <CardCta
              title="Réservez une démo"
              description="Découvrez comment AirSaas simplifie votre reporting, votre gouvernance et votre communication projet."
              ctaLabel="Réservez une démo"
              className="w-full"
            />
          </div>
        </CtaFrame>
      </AnimateOnScroll>

      {/* ——— 8. BUSINESS BENEFITS — Valorisez le travail ——— */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <section className="flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:px-[3rem] md:py-[4rem] lg:px-[5rem] lg:py-[6.25rem]">
          <Heading level={2} gradient="dark-to-primary" align="center">
            Valorisez le travail de votre équipe
          </Heading>
        </section>
      </AnimateOnScroll>

      {/* 8a. Diminuez la friction avec les métiers */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          imageSize="compact"
          title="Diminuez la friction avec les métiers"
          richContent={
            <p>
              Les principales frictions proviennent du manque de compréhension du
              jeu de contraintes de la DSI et de la prise en compte des attentes
              des métiers. Réunir les parties prenantes en comité de pilotage,
              autour d&apos;un dashboard affichant les indicateurs-clés, améliore la
              compréhension de ce qui peut être fait et dans quels délais. Un
              workflow de décision clair et partagé aide à la compréhension en
              apportant de la transparence. Et enfin, communiquer à intervalle
              régulier sur l&apos;avancée, les problèmes rencontrés et les succès
              d&apos;étapes aide à diminuer les frustrations et l&apos;impatience des
              personnes en demande. Moins de friction permet à votre équipe
              d&apos;avancer plus sereinement.
            </p>
          }
          imageSrc="https://placehold.co/600x400/e8eafc/3a51e2?text=Métier+IT"
        />
      </AnimateOnScroll>

      {/* 8b. Augmentez le taux de réussite */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          imageSize="compact"
          title="Augmentez le taux de réussite des projets IT"
          richContent={
            <p>
              Les principaux facteurs d&apos;échec d&apos;un projet sont le mauvais cadrage
              qui entraînent des dépassements de délais et de coûts, et le manque
              d&apos;adoption des utilisateurs finaux (clients internes ou externes).
              Pour cela, AirSaas fluidifie la collaboration entre l&apos;IT et les
              métiers. Les projets sont mieux préparés en amont. Vous restez agile
              tout au long du cycle de vie du projet pour maximiser l&apos;engagement
              des collaborateurs et l&apos;adoption du client final.
            </p>
          }
          imageSrc="https://placehold.co/600x400/fffbeb/e58d05?text=Réussite+Projet"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* 8c. Communiquez mieux en interne */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          imageSize="compact"
          title="Communiquez mieux en interne"
          richContent={
            <p>
              La mise en place d&apos;un plan de communication est bénéfique dans
              l&apos;ensemble des entreprises et augmente la performance des DSI.
              Destiné aux membres du Comex et aux responsables métiers, il a
              l&apos;avantage de diminuer la frustration, valoriser les équipes IT, et
              former l&apos;ensemble des responsables aux méthodes qui fonctionnent.
              Une bonne communication de suivi d&apos;avancée est d&apos;autant plus
              importante avec un fonctionnement à distance. Le rapport flash
              automatique est votre meilleur allié !
            </p>
          }
          imageSrc="https://placehold.co/600x400/e8eafc/3a51e2?text=Communication"
        />
      </AnimateOnScroll>

      {/* ——— 9. CTA (repeated) ——— */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Choisissez de gagner du temps et du contrôle"
          subtitle="Adoptez dès maintenant une solution efficace de flash report projet"
        >
          <div
            style={{ gridColumn: "1 / -1", width: "70%", margin: "0 auto" }}
          >
            <CardCta
              title="Réservez une démo"
              description="Adoptez dès maintenant une solution efficace de flash report projet."
              ctaLabel="Réservez une démo"
              className="w-full"
            />
          </div>
        </CtaFrame>
      </AnimateOnScroll>

      {/* ——— 10. TYPOLOGIES — Les différentes typologies ——— */}
      <AnimateOnScroll animation="fade-up" duration={800}>
        <FeatureFrame
          layout="stacked"
          title="Les différentes typologies d'outils de pilotage de projet"
          richContent={
            <>
              <p>
                Il existe différents types de pilotage de projet, qui ne servent
                pas les mêmes objectifs. Pourtant, il n&apos;est pas rare qu&apos;il y ait
                des confusions, notamment entre ceux qui permettent le pilotage
                d&apos;un projet, et ceux qui visent à simplifier la gestion d&apos;un
                portefeuille de projets.
              </p>
            </>
          }
        />
      </AnimateOnScroll>

      {/* 10a. Outils de pilotage d'un projet unique */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          imageSize="compact"
          title="Les outils de pilotage d'un projet unique : la gestion de projet"
          richContent={
            <>
              <p>
                Les outils de gestion de projet facilitent le pilotage des
                différents aspects d&apos;un seul et même projet. Ils permettent
                d&apos;accompagner le chef de projet ou le comité de pilotage sur un
                ensemble de tâches. Ils permettent de&nbsp;:
              </p>
              <ul>
                <li>Respecter les objectifs de chaque équipe</li>
                <li>S&apos;assurer de la tenue des délais d&apos;exécution de chacun</li>
                <li>
                  Assurer un suivi global de l&apos;avancée de toutes les équipes
                </li>
                <li>
                  Organiser la planification de toutes les étapes nécessaires au
                  projet via un tableau de bord
                </li>
                <li>
                  Engager les collaborateurs travaillant sur le projet grâce à un
                  espace collaboratif
                </li>
              </ul>
            </>
          }
          imageSrc="https://placehold.co/600x400/e8eafc/3a51e2?text=Projet+Unique"
        />
      </AnimateOnScroll>

      {/* 10b. Outils de pilotage de projets multiples */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          imageSize="compact"
          title="Les outils de pilotage de projets multiples : la gestion de portefeuilles de projets"
          richContent={
            <>
              <p>
                Ces outils vont permettre de faciliter la planification, non pas
                d&apos;un, mais de tous les projets d&apos;une entreprise. Les petites
                entreprises qui n&apos;ont que peu de projets n&apos;ont pas forcément besoin
                d&apos;outils permettant le pilotage de portefeuilles de projets. Mais
                à mesure qu&apos;elles grandissent, les projets se multiplient,
                jusqu&apos;à ce qu&apos;une gestion globale et organisée de l&apos;ensemble des
                projets prenne énormément de temps à chaque chef de projet ou au
                comité de pilotage&nbsp;: c&apos;est le signe qu&apos;il faut sûrement
                investir dans un tel outil.
              </p>
              <ul>
                <li>Hiérarchiser l&apos;importance de chaque projet</li>
                <li>
                  Donner une visibilité totale sur la conduite de l&apos;ensemble des
                  projets
                </li>
                <li>
                  Permettre au chef de projet ou au comité de pilotage de
                  connaître l&apos;avancée de chaque projet
                </li>
                <li>
                  Préciser les missions que doivent accomplir chaque responsable
                  de projet
                </li>
                <li>
                  Instaurer une méthodologie collaborative entre les équipes et
                  les services de l&apos;entreprise
                </li>
              </ul>
            </>
          }
          imageSrc="https://placehold.co/600x400/fffbeb/e58d05?text=Portefeuille+Projets"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* ——— 11. HISTORICAL — La naissance récente ——— */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          imageSize="compact"
          title="Depuis combien de temps les outils de pilotage de projet sont-ils utilisés ?"
          richContent={
            <p>
              On voit qu&apos;il existait déjà des outils de pilotage de projet sur le
              marché dès 1980, mais que de nouveaux outils semblables ont continué
              d&apos;être développés entre-temps. Un autre fait à relever&nbsp;: si,
              depuis quelques années, ces logiciels ont tendance à répondre aux
              besoins de gestion de projet unique mais aussi de portefeuilles
              projet, ça n&apos;a pas toujours été le cas. Certains d&apos;entre eux ont été
              initialement créés pour traiter seulement l&apos;une de ces deux
              problématiques.
            </p>
          }
          imageSrc="https://placehold.co/600x400/e8eafc/3a51e2?text=Timeline+Historique"
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          imageSize="compact"
          title="Quel a été le premier besoin à apparaître : le pilotage de projet unique ou la gestion de portefeuille de projets ?"
          richContent={
            <p>
              Comme on le constate sur le graphique, la plupart des outils de
              gestion de portefeuille de projets ont d&apos;abord été créés dans
              l&apos;optique de répondre au besoin de pilotage d&apos;un projet unique. Ce
              n&apos;est qu&apos;au fil des années que ces derniers ont été complétés pour
              permettre de mener plusieurs projets de front de manière optimale.
              Il faut tout de même relever que certains logiciels comme Planview
              avaient pris la décision de centrer leur solution sur la gestion des
              portefeuilles projets dès leur création, et que d&apos;autres outils
              comme Sciforma ou Ganttic répondaient d&apos;emblée aux deux
              problématiques. L&apos;écrasante majorité des outils de pilotage de
              projet traite aujourd&apos;hui ces deux problématiques dès leur
              création&nbsp;: il y a un besoin de simplifier la prise de décision
              entre les différents acteurs, que ce soit à l&apos;échelle d&apos;un projet
              unique, ou au niveau plus global du portefeuille de projets.
            </p>
          }
          imageSrc="https://placehold.co/600x400/fffbeb/e58d05?text=Évolution+Outils"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* ——— 12. VISIONS HÉTÉROGÈNES ——— */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          title="Des visions hétérogènes de la gestion de projet selon les DSI et le style de chef de projet"
          richContent={
            <p>
              Plusieurs raisons font que les logiciels de pilotage de projets
              peuvent proposer des fonctionnalités variées&nbsp;: la manière dont
              ils ont été développé à l&apos;origine a une influence, mais leurs
              fonctionnalités dépendent aussi de la vision de la gestion de
              projets qu&apos;ils promeuvent. Mais pourquoi plusieurs visions de la
              gestion de projet coexistent-elles dans les DSI&nbsp;?
            </p>
          }
        />
      </AnimateOnScroll>

      {/* 12a. D'une gestion axée sur la technique au focus business */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          imageSize="compact"
          title="D'une gestion de projets axée sur la technique au focus business"
          richContent={
            <p>
              Si la DSI a durant de nombreuses années été plutôt réservée à un
              rôle technique, elle est de plus en plus amenée à aider son
              entreprise à atteindre ses objectifs business. Elle ne doit plus se
              contenter de s&apos;assurer du bon fonctionnement du run, mais doit
              aussi se rapprocher des différents métiers de son organisation pour
              comprendre leurs difficultés et être en capacité de leur apporter
              des solutions adaptées. Les besoins des DSI en matière d&apos;outils de
              pilotage de projets ont donc beaucoup évolué.
            </p>
          }
          imageSrc="https://placehold.co/600x400/e8eafc/3a51e2?text=Manager"
        />
      </AnimateOnScroll>

      {/* 12b. La gestion de projets transformée par le digital */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          imageSize="compact"
          title="La gestion de projets dans les DSI transformée par l'avènement du digital"
          richContent={
            <p>
              Avec l&apos;essor du poids du digital pour les organisations, les DSI
              peuvent apporter de la valeur à leur entreprise de multiples
              manières. Par exemple, en automatisant des processus métiers, la DSI
              permet aux collaborateurs de son entreprise d&apos;optimiser leur temps
              de travail et ainsi d&apos;être plus compétitifs. Un autre aspect sur
              lequel la DSI peut accompagner son entreprise est l&apos;amélioration de
              son business model&nbsp;: le digital offre de nouvelles opportunités
              qui peuvent apporter énormément d&apos;un point de vue business.
              L&apos;importance qu&apos;a pris le digital ces dernières années a donc eu
              pour conséquence de changer la nature des missions que se voit
              confier la DSI. Et ces nouvelles missions ne se mènent pas de la
              même manière, ce qui amène la DSI à avoir de nouvelles attentes en
              matière d&apos;outil de pilotage de projet&nbsp;!
            </p>
          }
          imageSrc="https://placehold.co/600x400/fffbeb/e58d05?text=Intégrations"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* 12c. L'évolution du rôle de la DSI */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          imageSize="compact"
          title="L'évolution du rôle de la DSI : d'une fonction centrée sur le contrôle à une nécessité de collaborer avec les métiers"
          richContent={
            <>
              <p>
                Les deux évolutions que l&apos;on a décrites plus haut ont pour
                conséquence de transformer la manière dont la DSI doit collaborer
                avec les métiers de son entreprise. Si on prend l&apos;exemple d&apos;une
                DSI axée sur la technique, une de ses priorités va être de
                s&apos;assurer du bon fonctionnement du run afin qu&apos;aucun collaborateur
                n&apos;ait à souffrir de problèmes purement techniques.
              </p>
              <p>
                Mais si la DSI a pour ambition d&apos;apporter de la valeur à son
                entreprise d&apos;un point de vue business, elle doit se donner les
                moyens d&apos;échanger régulièrement avec les métiers afin de
                comprendre de quelle manière elle pourrait les aider à atteindre
                leurs objectifs business. Or, structurer une telle collaboration
                n&apos;est pas chose aisée, a fortiori lorsque les différents services
                ne sont pas habitués à travailler ensemble.
              </p>
            </>
          }
          imageSrc="https://placehold.co/600x400/e8eafc/3a51e2?text=Pyramide+Maslow"
        />
      </AnimateOnScroll>

      {/* ——— 13. CHOISIR SON OUTIL — En fonction de sa vision ——— */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          title="Choisir son outil en fonction de sa vision du pilotage de projet"
          richContent={
            <p>
              On a vu que les outils de pilotage de projet n&apos;offrent pas tous les
              mêmes fonctionnalités. La meilleure manière de trouver l&apos;outil
              idéal à acquérir est donc de s&apos;interroger sur sa vision du pilotage
              de projet&nbsp;: quels sont mes attentes et objectifs, et plus que
              ça, quelle est la place qui est attendue de la DSI dans mon
              entreprise&nbsp;?
            </p>
          }
        />
      </AnimateOnScroll>

      {/* 13a. Des outils diversifiés */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          imageSize="compact"
          title="Des outils de gestion de portefeuille projets diversifiés"
          richContent={
            <>
              <p>
                Tout d&apos;abord, il faut noter que les outils de pilotage de
                portefeuille projet peuvent présenter de nombreuses
                fonctionnalités différentes qui permettent notamment de&nbsp;:
              </p>
              <ul>
                <li>Gérer et attribuer les ressources disponibles</li>
                <li>Prioriser et hiérarchiser les projets</li>
                <li>Engager et responsabiliser le chef de projet</li>
                <li>Gérer les budgets engagés</li>
                <li>Gérer les risques</li>
                <li>Centraliser les informations clés</li>
                <li>Évaluer la rentabilité de chaque projet</li>
                <li>
                  Communiquer dans un espace collaboratif structuré
                </li>
              </ul>
              <p>
                Mais plus que de dresser une liste des fonctionnalités que peuvent
                comporter ces logiciels, il est intéressant de remarquer que des
                différences de styles entre outils plus structurantes existent.
              </p>
            </>
          }
          imageSrc="https://placehold.co/600x400/e8eafc/3a51e2?text=Classification+Outils"
        />
      </AnimateOnScroll>

      {/* 13b. All-in-one VS spécialisés */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          imageSize="compact"
          title="Les outils de gestion de projet : all-in-one VS spécialisés"
          richContent={
            <>
              <p>
                Tous les outils de pilotage projet n&apos;ambitionnent pas de répondre
                au même nombre de besoins. Alors que certains (comme les logiciels
                de type ERP) aspirent à répondre à l&apos;ensemble des besoins des
                DSI, d&apos;autres outils préfèrent se spécialiser sur une ou
                plusieurs des fonctionnalités classiquement proposées par les
                outils de gestion de portefeuille de projets.
              </p>
              <p>
                Un ERP complet permet de centraliser toutes les actions sur un
                même logiciel, mais présente l&apos;inconvénient d&apos;être complexe à
                faire évoluer. A l&apos;inverse, un outil spécialisé est plus rapide à
                implémenter, et permet de réduire le coût de change lorsque
                l&apos;entreprise évolue.
              </p>
            </>
          }
          imageSrc="https://placehold.co/600x400/fffbeb/e58d05?text=All-in-one+vs+Spécialisé"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* 13c. Espace collaboratif */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          imageSize="compact"
          title="Les outils proposant un espace de collaboration"
          richContent={
            <p>
              De nombreuses DSI restées axées principalement sur la technique se
              contentent de communiquer avec les métiers grâce aux canaux
              traditionnels qui sont utilisés dans leur entreprise. Cependant,
              lorsque la DSI souhaite instaurer une collaboration plus forte avec
              ses collaborateurs, et se mettre en capacité d&apos;échanger
              régulièrement et de manière structurée, elle aura tout intérêt à se
              doter d&apos;un outil de gestion de portefeuille de projet qui propose un
              espace d&apos;échange collaboratif. Ainsi, le reporting est simplifié,
              les informations ordonnées et l&apos;implication des métiers est
              facilitée.
            </p>
          }
          imageSrc="https://placehold.co/600x400/e8eafc/3a51e2?text=Feed+Collaboratif"
        />
      </AnimateOnScroll>

      {/* 13d. Centrés sur l'UX */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          imageSize="compact"
          title="Les outils de gestion de portefeuille projet centrés sur l'expérience utilisateur"
          richContent={
            <p>
              Certains outils de gestion de projet ont été développés avec
              l&apos;objectif de proposer une interface particulièrement intuitive à
              leurs utilisateurs. Ce genre d&apos;outil est idéal lorsque l&apos;on
              souhaite structurer une démarche collaborative entre la DSI et des
              profils moins techniques. En effet, inviter des métiers à travailler
              sur les mêmes logiciels que ceux utilisés par les équipes IT peut
              les décourager et nuire fortement à leur implication. Ainsi les
              outils ayant misé sur l&apos;UX simplifient la collaboration entre des
              profils business et des profils techniques en proposant une
              interface compréhensible rapidement par toutes les parties
              prenantes.
            </p>
          }
          imageSrc="https://placehold.co/600x400/fffbeb/e58d05?text=UX+Focus"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* 13e. Méthodologies intrinsèques */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          imageSize="compact"
          title="Prendre en compte les méthodologies intrinsèques de chaque outil"
          richContent={
            <p>
              Tout outil porte nécessairement une méthodologie plus ou moins
              poussée en lui. L&apos;adéquation entre la méthodologie portée par un
              outil et celle déjà en place dans l&apos;entreprise qui l&apos;utilise est un
              facteur clé du taux d&apos;adoption de ce logiciel par les
              collaborateurs. Il faut donc s&apos;interroger sur les pratiques mises en
              place dans votre DSI avant de choisir l&apos;outil de pilotage de projet
              le plus adapté aux process existants et ainsi, maximiser son
              influence sur vos collaborateurs.
            </p>
          }
          imageSrc="https://placehold.co/600x400/e8eafc/3a51e2?text=Méthodologie"
        />
      </AnimateOnScroll>

      {/* 13f. L'outil comme vecteur de changement */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          imageSize="compact"
          title="L'outil de gestion de projet comme vecteur de changement de culture d'une entreprise"
          richContent={
            <>
              <p>
                S&apos;il est préférable d&apos;adapter son choix d&apos;outil à la méthodologie
                déjà mise en place dans l&apos;entreprise, il faut tout de même
                remarquer que l&apos;on peut aussi se servir d&apos;un outil de gestion de
                pilotage projet comme d&apos;un levier pour impulser des changements
                dans les habitudes de travail existantes. En effet, la culture de
                l&apos;entreprise est le fruit de son environnement — un environnement
                dont font partie les logiciels que vous utilisez&nbsp;!
              </p>
              <p>
                En conclusion&nbsp;: l&apos;idéal est donc d&apos;orienter votre choix vers un
                outil portant une méthodologie proche de celle qui est déjà en
                place dans votre entreprise, ou au moins de celle que vous
                aimeriez installer.
              </p>
            </>
          }
          imageSrc="https://placehold.co/600x400/fffbeb/e58d05?text=Changement+Culture"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* ——— 14. AIRSAAS POSITIONING ——— */}
      <AnimateOnScroll animation="fade-up" duration={700}>
        <FeatureFrame
          layout="stacked"
          title="Quel type d'outil de pilotage de projet est AirSaas ?"
          richContent={
            <p>
              AirSaas est un PPM plutôt léger qui ne vise pas à être un logiciel
              tout-en-un, mais qui comporte la plupart des fonctionnalités-clés
              dont une DSI a besoin pour assurer l&apos;exécution de ses projets.
            </p>
          }
        />
      </AnimateOnScroll>

      {/* 14a. Intégrations — Jira & Teams */}
      <AnimateOnScroll animation="fade-right" duration={800}>
        <FeatureFrame
          imagePosition="right"
          imageSize="compact"
          title="Un outil de pilotage projet souple et intégrable facilement"
          richContent={
            <>
              <h4>Jira</h4>
              <p>
                En intégrant Jira à AirSaas, vous obtenez automatiquement les
                données d&apos;avancement des projets dans la plateforme. Cela vous
                permet d&apos;avoir une vue globale de l&apos;ensemble des projets et de
                leurs états d&apos;avancement sans efforts.
              </p>
              <h4>Microsoft Teams</h4>
              <p>
                AirSaas est intégré à Microsoft Teams. Automatiquement, les
                informations les plus importantes sur les projets en cours sont
                envoyées sur vos canaux de communication Teams dédiés. Avec cette
                intégration, vous pouvez partager simplement l&apos;avancée des
                projets avec l&apos;ensemble de l&apos;entreprise.
              </p>
            </>
          }
          imageSrc="https://placehold.co/600x400/e8eafc/3a51e2?text=Intégrations"
        />
      </AnimateOnScroll>

      {/* 14b. Méthodologie collaborative */}
      <AnimateOnScroll animation="fade-left" duration={800}>
        <FeatureFrame
          imagePosition="left"
          imageSize="compact"
          titleHighlight="Un outil de pilotage projet avec une méthodologie"
          title="pensée pour impliquer les métiers"
          richContent={
            <>
              <p>
                Notre pari&nbsp;: pour parvenir à impliquer les métiers, la DSI
                doit leur proposer un outil qu&apos;ils sauront prendre en main
                rapidement, sans friction. Nous pensons que ce n&apos;est pas en
                forçant les métiers à travailler sur des outils complexes que les
                entreprises parviendront à briser les logiques de silos et à
                structurer une collaboration étroite métiers/DSI.
              </p>
              <p>
                Nous avons poussé la logique collaborative jusqu&apos;au bout&nbsp;:
                AirSaas propose un moteur de recherche de solutions
                (externes/internes) accessibles aux responsables métiers.
                Lorsqu&apos;un métier a un besoin, il cherche déjà des solutions de son
                côté sans forcément prévenir la DSI qui peut même se retrouver
                face à du Shadow IT. Notre idée ici est de donner les outils à la
                DSI pour encadrer ces pratiques.
              </p>
              <p>
                <strong>AirSaas</strong> est un PPM léger, qui s&apos;intègre à
                l&apos;existant, et qui porte une méthodologie collaborative forte afin
                d&apos;impliquer les métiers.
              </p>
            </>
          }
          imageSrc="https://placehold.co/600x400/fffbeb/e58d05?text=Méthodologie+Collaborative"
          imageBgColor="#fffbeb"
        />
      </AnimateOnScroll>

      {/* ——— 15. FINAL CTA ——— */}
      <AnimateOnScroll animation="scale-up" duration={800}>
        <CtaFrame
          title="Découvrez comment AirSaas peut vous aider"
          subtitle="Adoptez dès maintenant une solution de gestion de gouvernance moderne pour votre portefeuille de projets."
        >
          <div
            style={{ gridColumn: "1 / -1", width: "70%", margin: "0 auto" }}
          >
            <CardCta
              title="Réservez une démo"
              description="Découvrez comment AirSaas peut simplifier votre pilotage de projet."
              ctaLabel="Réservez une démo"
              className="w-full"
            />
          </div>
        </CtaFrame>
      </AnimateOnScroll>

      {/* ——— 16. FOOTER ——— */}
      <AnimateOnScroll animation="fade-up" duration={600}>
        <Footer columns={footerColumns} />
      </AnimateOnScroll>
    </div>
  );
}
