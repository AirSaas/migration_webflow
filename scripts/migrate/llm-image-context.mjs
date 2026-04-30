/**
 * llm-image-context.mjs — Build an image-context map from cleaned HTML so
 * Opus can match each <img> to the closest preceding heading. This kills
 * the "wrong image picked from a pool" bug that swapped Roadmap COMEX
 * with Portfolio decisions, etc.
 *
 * Output : an array of { imageUrl, alt, sectionTitle, contextHint }
 * injected into the user prompt next to the HTML.
 *
 * Heuristic : walk the DOM linearly, track the latest <h1>/<h2>/<h3>
 * encountered, then on each <img> emit the latest heading + 200 chars of
 * preceding text as contextHint.
 */

const HEADING_RE = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
const IMG_RE = /<img\b[^>]*?src="([^"]+)"[^>]*?(?:alt="([^"]*)")?[^>]*>/gi;
const STRIP_TAGS_RE = /<[^>]+>/g;
const ZWSP_RE = /[​‌‍⁠﻿]/g;

function plainText(html) {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(STRIP_TAGS_RE, "")
    .replace(ZWSP_RE, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Returns an ordered list of { type, offset, value } tokens for headings
 * and images, so we can find the latest heading before each image.
 */
function tokenize(html) {
  const tokens = [];
  let m;
  HEADING_RE.lastIndex = 0;
  while ((m = HEADING_RE.exec(html)) !== null) {
    const text = plainText(m[2]);
    if (text.length > 0 && text.length < 200) {
      tokens.push({
        type: "h",
        level: parseInt(m[1], 10),
        offset: m.index,
        text,
      });
    }
  }
  IMG_RE.lastIndex = 0;
  while ((m = IMG_RE.exec(html)) !== null) {
    tokens.push({
      type: "img",
      offset: m.index,
      src: m[1],
      alt: m[2] || "",
    });
  }
  tokens.sort((a, b) => a.offset - b.offset);
  return tokens;
}

const SKIP_IMAGE_PATTERNS = [
  /\/svg\//i,
  /icon[-_]?\d*\.svg/i,
  /\bcheck-circle\b/i,
  /\bellipse\b/i,
  /\bdecoration\b/i,
  /\barrow\b/i,
  /\blogo\b/i,
  /\bbadge\b/i,
  /iso27001/i,
  /scaleway/i,
  /\bovh\b/i,
  /placehold\.co/i,
];

function shouldSkipImage(src) {
  return SKIP_IMAGE_PATTERNS.some((re) => re.test(src));
}

export function buildImageContext(html) {
  const tokens = tokenize(html);
  const items = [];
  let lastHeading = null;
  for (const t of tokens) {
    if (t.type === "h") {
      if (t.level <= 4) lastHeading = t.text;
      continue;
    }
    if (t.type === "img") {
      if (shouldSkipImage(t.src)) continue;
      // Skip duplicates (same src already added)
      if (items.some((it) => it.imageUrl === t.src)) continue;
      // Pull 200 chars of plain text before this image, after the last heading
      const startOffset = Math.max(0, t.offset - 800);
      const before = plainText(html.slice(startOffset, t.offset));
      const contextHint = before.slice(-200);
      items.push({
        imageUrl: t.src,
        alt: t.alt,
        sectionTitle: lastHeading || "",
        contextHint,
      });
    }
  }
  return items;
}

/**
 * Format the image-context map for injection into the user prompt.
 */
export function formatImageContextForPrompt(images) {
  if (!images.length) return "";
  const lines = images.map((img, i) => {
    const url = img.imageUrl.length > 110 ? img.imageUrl.slice(-110) : img.imageUrl;
    const sect = img.sectionTitle ? ` [section: "${img.sectionTitle}"]` : "";
    return `${i + 1}. ${url}${sect} — alt: "${img.alt || "—"}"`;
  });
  return `IMAGE-CONTEXT MAP (utilise ces associations pour le mapping section ↔ imageSrc) :
${lines.join("\n")}

→ Quand tu choisis un imageSrc pour une section, prends celle dont le \`sectionTitle\` ci-dessus correspond au titre de ta section. Ne pioche pas une image dont le sectionTitle ne matche aucune section.`;
}
