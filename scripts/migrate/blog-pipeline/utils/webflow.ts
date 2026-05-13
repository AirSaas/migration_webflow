import { WEBFLOW } from "../config.js";

/**
 * Minimal Webflow API v2 client. Used by agent [2. CMS Toggles Reader] to
 * read per-article booleans (showFaq / showNewsletter / showCta) and any
 * `custom_cta_*` fields that override the default closing CTA.
 *
 * Auth : Bearer token from .env.local. Read-only access — never mutates.
 *
 * Rate limit : Webflow API v2 is 60 req/min. The pipeline runs sequentially
 * so we don't bump against it for the 62-article migration.
 */

const API_BASE = "https://api.webflow.com/v2";

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${WEBFLOW.apiToken}`,
    Accept: "application/json",
    "accept-version": "2.0.0",
  };
}

export interface WebflowCollection {
  id: string;
  displayName: string;
  slug: string;
  fields?: Array<{ id: string; slug: string; displayName: string; type: string }>;
}

export interface WebflowItem {
  id: string;
  fieldData: Record<string, unknown> & { slug?: string; name?: string };
  isDraft?: boolean;
  isArchived?: boolean;
}

let collectionsCache: WebflowCollection[] | null = null;

export async function listCollections(): Promise<WebflowCollection[]> {
  if (collectionsCache) return collectionsCache;
  const res = await fetch(`${API_BASE}/sites/${WEBFLOW.siteId}/collections`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Webflow listCollections ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { collections: WebflowCollection[] };
  collectionsCache = json.collections;
  return json.collections;
}

/**
 * Find the Webflow blog Articles collection. Webflow renames things; we
 * match by slug pattern. Returns the cached collection ID.
 */
export async function getBlogCollectionId(): Promise<string> {
  if (WEBFLOW.blogCollectionId) return WEBFLOW.blogCollectionId;
  const all = await listCollections();
  // Try common naming patterns (FR + EN).
  const candidates = all.filter((c) =>
    /article|blog|post/i.test(c.slug) || /article|blog|post/i.test(c.displayName),
  );
  if (candidates.length === 0) {
    throw new Error(
      `No blog/article collection found in Webflow site. Collections: ${all.map((c) => `${c.slug}=${c.displayName}`).join(", ")}`,
    );
  }
  // Prefer the one that contains the most items — likely the actual blog.
  // For our needs the first matching candidate is usually correct.
  return candidates[0].id;
}

export async function listCollectionItems(collectionId: string): Promise<WebflowItem[]> {
  // Webflow paginates at 100 items / page. Loop until empty.
  const all: WebflowItem[] = [];
  let offset = 0;
  while (true) {
    const res = await fetch(
      `${API_BASE}/collections/${collectionId}/items?limit=100&offset=${offset}`,
      { headers: authHeaders() },
    );
    if (!res.ok) throw new Error(`Webflow listItems ${res.status}: ${await res.text()}`);
    const json = (await res.json()) as { items: WebflowItem[]; pagination?: { total?: number } };
    all.push(...json.items);
    if (json.items.length < 100) break;
    offset += 100;
    if (offset >= 1000) break; // safety stop — 62 articles don't go past
  }
  return all;
}

/**
 * Look up one Webflow CMS item by its rendered slug.
 *
 * The slug we use in Next.js (`metier-pmo`, `pi-planning`, etc.) maps
 * directly to the Webflow item's `fieldData.slug`. Returns null if no
 * match — the agent caller decides whether to fall back to defaults.
 */
let itemsCache: WebflowItem[] | null = null;
export async function getBlogItemBySlug(slug: string): Promise<WebflowItem | null> {
  if (!itemsCache) {
    const cid = await getBlogCollectionId();
    itemsCache = await listCollectionItems(cid);
  }
  return itemsCache.find((i) => i.fieldData?.slug === slug) ?? null;
}
