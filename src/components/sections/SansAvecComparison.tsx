import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const ROWS = [
  {
    sans: "Des projets cadrés sur PowerPoint ou Excel, sans collaboration et sans homogénéité",
    avec: "Un cadrage projet collaboratif et uniformisé, guidé par des bonnes pratiques en la matière",
  },
  {
    sans: "Un reporting projet / CoPil à la main, qui vous prend un temps significatif",
    avec: "Un reporting décisionnel généré automatiquement aux couleurs de votre entreprise",
  },
  {
    sans: "Trop de micro-information dispersée entre vos différents outils de gestion de tâches et de ticketing",
    avec: "Un focus sur les décisions et les points d'attentions de vos projets, grâce à une gouvernance structurée",
  },
  {
    sans: "Une difficulté pour les chefs de projet à comprendre les décisions prises et à prendre",
    avec: "Une véritable transparence de vos projets pour toutes les parties prenantes de votre entreprise",
  },
  {
    sans: "Un pilotage à la tâche complexe",
    avec: "Un pilotage agile par les jalons de vos projets",
  },
  {
    sans: "Une culture projet hétérogène, voire inexistante",
    avec: "Une culture projet standardisée, qui pousse tous les collaborateurs vers l'excellence",
  },
  {
    sans: "Du micro-management pour gérer vos différents collaborateurs",
    avec: "Une responsabilisation de chacun, grâce à une vision simplifiée et collaborative de l'avancement des projets",
  },
];

export function SansAvecComparison() {
  return (
    <section className="py-20">
      <Container>
        <h2 className="text-center text-[2.5rem] font-semibold leading-[3rem]">
          Nos clients ne peuvent plus imaginer leurs vies sans{" "}
          <strong className="font-extrabold text-primary">AirSaas</strong>
        </h2>

        <div className="mt-12 overflow-hidden rounded-[10px] border border-border">
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-border bg-bg-alt">
            <div className="p-4 text-center font-semibold">
              <strong className="font-bold">Sans</strong> AirSaas
            </div>
            <div className="p-4 text-center font-semibold">
              <strong className="font-bold">Avec</strong> AirSaas
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-2 border-b border-border last:border-b-0"
            >
              <div className="flex items-start gap-3 border-r border-border p-5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson/10 text-xs font-bold text-crimson">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-[22px] text-foreground">
                  {row.sans}
                </p>
              </div>
              <div className="flex items-start gap-3 p-5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10 text-xs font-bold text-green">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-[22px] text-foreground">
                  {row.avec}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button href="/fr/meetings-pages">Réservez une démo</Button>
        </div>
      </Container>
    </section>
  );
}
