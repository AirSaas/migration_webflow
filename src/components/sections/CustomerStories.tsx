import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Story = {
  name: string;
  role: string;
  company?: string;
  sector: string;
  employees: string;
  initials: string;
  href: string;
};

type CustomerStoriesProps = {
  heading: React.ReactNode;
  description?: string;
  stories: Story[];
  moreLink?: { text: string; href: string };
};

export function CustomerStories({
  heading,
  description,
  stories,
  moreLink,
}: CustomerStoriesProps) {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-[2.5rem] font-semibold leading-[3rem]">
            {heading}
          </h2>
          {description && (
            <p className="mt-4 text-[17px] leading-[23px] text-text-secondary">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.name}
              href={story.href}
              className="group flex flex-col rounded-[10px] border border-border bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-20 text-sm font-semibold text-primary">
                  {story.initials}
                </div>
                <div>
                  <p className="font-semibold">{story.name}</p>
                  <p className="text-sm text-text-muted">{story.role}</p>
                </div>
              </div>

              {story.company && (
                <p className="mb-3 text-sm font-semibold">{story.company}</p>
              )}

              <div className="mt-auto flex flex-col gap-2 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary">Secteur</span>
                  <span>{story.sector}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary">
                    Nombre d&apos;employés
                  </span>
                  <span>{story.employees}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {moreLink && (
          <div className="mt-8 text-center">
            <Button href={moreLink.href}>{moreLink.text}</Button>
          </div>
        )}
      </Container>
    </section>
  );
}
