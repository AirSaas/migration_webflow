import Image from "next/image";
import { Container } from "@/components/ui/Container";

const FEATURES = [
  {
    title: "Tendance des projets vitaux",
    description:
      "Un récapitulatif de la santé des projets vitaux de votre organisation pour leur permettre de \"sentir\" la tendance du moment.",
  },
  {
    title: "Tendance de leurs projets à eux",
    description:
      "Un aperçu de leurs projets, ceux en amélioration et ceux en dégradation qui nécessitent leur attention. En un clic, ils peuvent accéder à la fiche projet.",
  },
  {
    title: "Projets en retard d'actualisation",
    description:
      "Un rappel des projets qui méritent d'être mis à jour. Si cette section est vide, vous êtes tranquilles !",
  },
];

export function FeatureNewsletter() {
  return (
    <section className="bg-bg-alt py-20">
      <Container>
        <h3 className="text-center text-[1.5rem] font-medium leading-[2rem]">
          Une <strong className="font-bold">newsletter sponsor</strong> que
          votre direction va adorer
        </h3>

        <div className="mt-12 flex flex-col items-start gap-12 md:flex-row">
          {/* Newsletter preview screenshots */}
          <div className="relative flex-1">
            <div className="relative w-full overflow-hidden rounded-[10px] border border-border bg-white shadow-lg">
              <Image
                src="/assets/images/Copil -  Bilan-min.png"
                alt="Bilan de santé newsletter"
                width={600}
                height={500}
                className="h-auto w-full"
              />
            </div>
          </div>

          {/* Feature list */}
          <div className="flex flex-1 flex-col gap-8">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  &rarr;
                </div>
                <div>
                  <h4 className="text-[1rem] font-semibold">
                    {feature.title}
                  </h4>
                  <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
