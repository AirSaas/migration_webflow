import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { ProseFrame } from "@/components/library-design/sections/ProseFrame";
import { Footer } from "@/components/library-design/sections/Footer";
import { renderBlogBlocks } from "@/components/blog/renderBlogBlocks";
import { BLOG_INDEX_DATA } from "@/data/blog";
import type { LegalPage as LegalPageData } from "@/data/legal-pages";

/**
 * LegalPage — minimal template for static legal / utility pages
 * (cookies, mentions-legales, plan-du-site).
 *
 * Top heading + ProseFrame body using `renderBlogBlocks` so the rich-text
 * uses canonical DS primitives (Heading / Text / ListInline / TableFrame)
 * instead of raw HTML tags.
 *
 * Source content is extracted by `scripts/migrate/extract-legal-pages.py`
 * from the live airsaas.io HTML.
 */

interface LegalPageProps {
  page: LegalPageData;
  /** Optional intro line below the H1. */
  subtitle?: string;
}

export default function LegalPage({ page, subtitle }: LegalPageProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <section className="flex flex-col items-center gap-[1.5rem] px-[1.5rem] pt-[5rem] pb-[2rem] md:px-[3rem] md:pt-[6rem] lg:px-[10rem] lg:pt-[7rem]">
        <div className="flex flex-col items-center gap-[1rem] text-center max-w-[60rem]">
          <Heading level={1} align="center">
            {page.title}
          </Heading>
          {subtitle ? (
            <Text size="md" align="center" maxWidth="50rem">
              {subtitle}
            </Text>
          ) : null}
        </div>
      </section>

      <ProseFrame variant="light" maxWidth="reading">
        {renderBlogBlocks(page.blocks)}
      </ProseFrame>

      <Footer
        columns={BLOG_INDEX_DATA.footerColumns}
        copyright={BLOG_INDEX_DATA.copyright}
      />
    </main>
  );
}
