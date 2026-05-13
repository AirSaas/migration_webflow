import { SUPABASE } from "../config.js";

/**
 * Fetch the Webflow-rendered HTML for a given blog slug from Supabase.
 * Same Cloudflare-Browser-Rendering scraped corpus we used in v6/v7.
 */
export async function fetchWebflowHtml(slug: string): Promise<string> {
  const url =
    `${SUPABASE.url}/rest/v1/${SUPABASE.table}` +
    `?type=eq.blog&slug=eq.${encodeURIComponent(slug)}&scrape_status=eq.ok` +
    `&select=html_rendered,full_url`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE.anonKey,
      Authorization: `Bearer ${SUPABASE.anonKey}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  const rows = (await res.json()) as Array<{ html_rendered: string; full_url: string }>;
  if (rows.length === 0) throw new Error(`No Webflow source HTML for slug=${slug}`);
  return rows[0].html_rendered;
}

export async function listAllBlogSlugs(): Promise<string[]> {
  const url =
    `${SUPABASE.url}/rest/v1/${SUPABASE.table}` +
    `?type=eq.blog&scrape_status=eq.ok&order=slug.asc&select=slug`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE.anonKey,
      Authorization: `Bearer ${SUPABASE.anonKey}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`Supabase list ${res.status}`);
  const rows = (await res.json()) as Array<{ slug: string }>;
  return rows.map((r) => r.slug);
}

export async function fetchWebflowLiveUrl(slug: string): Promise<string | null> {
  const url =
    `${SUPABASE.url}/rest/v1/${SUPABASE.table}` +
    `?type=eq.blog&slug=eq.${encodeURIComponent(slug)}&select=full_url`;
  const res = await fetch(url, {
    headers: { apikey: SUPABASE.anonKey, Authorization: `Bearer ${SUPABASE.anonKey}`, Accept: "application/json" },
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as Array<{ full_url: string }>;
  return rows[0]?.full_url ?? null;
}
