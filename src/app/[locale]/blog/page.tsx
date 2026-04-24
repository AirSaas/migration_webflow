import BlogIndexPage from "@/components/pages/BlogIndexPage";
import { BLOG_INDEX_DATA } from "@/data/blog";

/**
 * `/[locale]/blog` — Blog index.
 *
 * Step 0/1: renders `<BlogIndexPage>` with hardcoded mock data from
 * `src/data/blog.tsx`. At Step 5 this route will stream collections,
 * articles, podcasts and releases from Strapi via REST.
 */
export default function Page() {
  return <BlogIndexPage {...BLOG_INDEX_DATA} />;
}
