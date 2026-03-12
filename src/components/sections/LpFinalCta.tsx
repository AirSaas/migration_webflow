import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

type LpFinalCtaProps = {
  heading: string;
  description?: string;
  demoTitle?: string;
  demoDescription?: string;
  demoHref?: string;
  demoText?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoHref?: string;
  videoText?: string;
};

export function LpFinalCta({
  heading,
  description,
  demoTitle = "Réserver une démo",
  demoDescription = "30 min avec un expert pour voir AirSaas en action sur vos cas d'usage.",
  demoHref = "/fr/meetings-pages",
  demoText = "Choisir un créneau \u2192",
  videoTitle,
  videoDescription,
  videoHref,
  videoText = "Voir la vidéo \u2192",
}: LpFinalCtaProps) {
  return (
    <section className="bg-bg-alt py-20">
      <Container>
        <FadeIn>
        <div className="mb-10 text-center">
          <h2 className="text-[2.25rem] font-semibold leading-[2.75rem]">
            {heading}
          </h2>
          {description && (
            <p className="mt-4 text-[17px] text-text-secondary">
              {description}
            </p>
          )}
        </div>
        <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <h3 className="text-lg font-semibold">{demoTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {demoDescription}
            </p>
            <Link
              href={demoHref}
              className="mt-5 inline-block font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              {demoText}
            </Link>
          </div>
          {videoHref && videoTitle && (
            <div className="rounded-xl bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="text-lg font-semibold">{videoTitle}</h3>
              {videoDescription && (
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {videoDescription}
                </p>
              )}
              <Link
                href={videoHref}
                className="mt-5 inline-block font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                {videoText}
              </Link>
            </div>
          )}
        </div>
        </FadeIn>
      </Container>
    </section>
  );
}
