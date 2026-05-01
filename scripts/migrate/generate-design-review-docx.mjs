#!/usr/bin/env node
/**
 * generate-design-review-docx.mjs — Build a side-by-side review document
 * for the designer to compare rebuild vs live for 5 LPs + 10 blogs.
 *
 * Output : docs/design-review.docx
 *
 * Layout per page :
 *   - Page heading (slug)
 *   - Table : 2 cols (URL Rebuild | URL Live) — clickable links
 *   - "Findings" section : empty bullet template the designer fills in
 *   - Page break before next page
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  ExternalHyperlink,
  TextRun,
  PageBreak,
  BorderStyle,
} from "docx";
import { REPO_ROOT } from "./llm-parse-shared.mjs";

const REBUILD_BASE = "https://website-airsaas-bizjx7gye-airsaas.vercel.app";
const LIVE_BASE = "https://www.airsaas.io";

const LANDINGS = [
  { type: "lp", slug: "ppm", title: "LP — PPM" },
  { type: "lp", slug: "capacity-planning", title: "LP — Capacity Planning" },
  {
    type: "solution",
    slug: "airsaas-et-les-experts-de-la-transfo",
    title: "Solution — Experts de la Transfo",
  },
  {
    type: "solution",
    slug: "gestion-portefeuille-projet",
    title: "Solution — Gestion Portefeuille Projet",
  },
  { type: "equipe", slug: "comite-direction", title: "Équipe — Comité de Direction" },
];

const BLOGS = [
  { slug: "pi-planning", title: "Blog — PI Planning" },
  { slug: "kanban-gestion-de-projet", title: "Blog — Kanban gestion de projet" },
  { slug: "comite-pilotage-projet", title: "Blog — Comité pilotage projet" },
  { slug: "metier-pmo", title: "Blog — Métier PMO" },
  { slug: "capacity-planning-definition", title: "Blog — Capacity Planning définition" },
  { slug: "macro-planning", title: "Blog — Macro planning" },
  { slug: "comment-mettre-en-place-un-pmo", title: "Blog — Comment mettre en place un PMO" },
  { slug: "kpi-gestion-de-projet", title: "Blog — KPI gestion de projet" },
  { slug: "le-grand-guide-de-la-conduite-de-projet", title: "Blog — Grand guide conduite de projet" },
  { slug: "fiche-projet-exemple-et-methodologie", title: "Blog — Fiche projet exemple" },
];

function rebuildPath({ type, slug }) {
  if (type === "lp") return `/fr/lp/${slug}`;
  if (type === "produit") return `/fr/produit/${slug}`;
  if (type === "solution") return `/fr/solutions/${slug}`;
  if (type === "equipe") return `/fr/equipes/${slug}`;
  return `/fr/blog/${slug}`;
}

function livePath({ type, slug }) {
  if (type === "lp") return `/fr/lp/${slug}`;
  if (type === "produit") return `/fr/produit/${slug}`;
  if (type === "solution") return `/fr/solution/${slug}`;
  if (type === "equipe") return `/fr/equipes/${slug}`;
  return `/fr/gestion-de-projet/${slug}`;
}

function urlCell(label, url) {
  return new TableCell({
    width: { size: 50, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: label, bold: true, size: 22 }),
        ],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new ExternalHyperlink({
            link: url,
            children: [
              new TextRun({
                text: url,
                style: "Hyperlink",
                size: 18,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function findingsBlock() {
  const emptyBullet = (n) =>
    new Paragraph({
      bullet: { level: 0 },
      children: [
        new TextRun({ text: `Finding ${n} : ` }),
      ],
      spacing: { after: 80 },
    });
  return [
    new Paragraph({
      children: [
        new TextRun({ text: "Findings", bold: true, size: 22 }),
      ],
      spacing: { before: 240, after: 120 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text:
            "Pour chaque diff visuelle, classe entre [DS] (le composant DS doit changer) ou [INTÉGRATION] (on a mal câblé le DS). Si tout est OK, écris « OK » dans le 1er bullet.",
          italics: true,
          size: 18,
          color: "555555",
        }),
      ],
      spacing: { after: 120 },
    }),
    emptyBullet(1),
    emptyBullet(2),
    emptyBullet(3),
    emptyBullet(4),
    emptyBullet(5),
  ];
}

function pageSection(entry, isLast) {
  const item = entry.type ? entry : { ...entry, type: "blog" };
  const rebuildUrl = `${REBUILD_BASE}${rebuildPath(item)}`;
  const liveUrl = `${LIVE_BASE}${livePath(item)}`;

  const blocks = [
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: entry.title, bold: true, size: 28 })],
      spacing: { before: 240, after: 120 },
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
        left: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
        right: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
        insideHorizontal: {
          style: BorderStyle.SINGLE,
          size: 4,
          color: "DDDDDD",
        },
        insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
      },
      rows: [
        new TableRow({
          children: [
            urlCell("🔵 Rebuild Next.js", rebuildUrl),
            urlCell("🟢 Live Webflow", liveUrl),
          ],
        }),
      ],
    }),
    ...findingsBlock(),
  ];

  if (!isLast) {
    blocks.push(
      new Paragraph({
        children: [new PageBreak()],
      }),
    );
  }
  return blocks;
}

const allEntries = [
  ...LANDINGS,
  ...BLOGS.map((b) => ({ ...b, type: "blog" })),
];

const docChildren = [
  new Paragraph({
    heading: HeadingLevel.TITLE,
    children: [
      new TextRun({ text: "AirSaas — Design Review", bold: true, size: 40 }),
    ],
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: `Rebuild Next.js vs Live Webflow — ${allEntries.length} pages (${LANDINGS.length} LPs + ${BLOGS.length} blogs)`,
        italics: true,
        size: 22,
        color: "666666",
      }),
    ],
    spacing: { after: 240 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "Comment utiliser ce document",
        bold: true,
        size: 24,
      }),
    ],
    spacing: { before: 240, after: 120 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text:
          "Pour chaque page, ouvre les deux URL côte-à-côte (Rebuild + Live) et note les différences visuelles dans le bloc « Findings ». Pour chaque finding, indique :",
      }),
    ],
    spacing: { after: 120 },
  }),
  new Paragraph({
    bullet: { level: 0 },
    children: [
      new TextRun({ text: "[DS] ", bold: true }),
      new TextRun({
        text:
          "→ règle / composant Design System à modifier (couleurs, espacement, variants, props, layout des frames…)",
      }),
    ],
  }),
  new Paragraph({
    bullet: { level: 0 },
    children: [
      new TextRun({ text: "[INTÉGRATION] ", bold: true }),
      new TextRun({
        text:
          "→ bug côté nous (mauvais variant DS, mauvaise donnée passée, structure incomplète…)",
      }),
    ],
  }),
  new Paragraph({
    children: [
      new TextRun({
        text:
          "Si la page est OK telle quelle, écris « OK » dans le 1er bullet et passe à la suivante.",
        italics: true,
      }),
    ],
    spacing: { before: 120, after: 240 },
  }),
  new Paragraph({
    children: [new PageBreak()],
  }),
];

allEntries.forEach((entry, i) => {
  const isLast = i === allEntries.length - 1;
  docChildren.push(...pageSection(entry, isLast));
});

const doc = new Document({
  creator: "AirSaas",
  title: "Design Review — Rebuild vs Live",
  description: "Document de review designer pour le rebuild Webflow → Next.js",
  styles: {
    paragraphStyles: [
      {
        id: "Hyperlink",
        name: "Hyperlink",
        run: { color: "0000EE", underline: { type: "single" } },
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 1000,
            bottom: 1000,
            left: 1000,
            right: 1000,
          },
        },
      },
      children: docChildren,
    },
  ],
});

const out = join(REPO_ROOT, "docs/design-review.docx");
const buf = await Packer.toBuffer(doc);
writeFileSync(out, buf);
console.log(`[generate-design-review-docx] wrote ${out}`);
console.log(`  - ${LANDINGS.length} landings + ${BLOGS.length} blogs = ${allEntries.length} pages`);
console.log(`  - rebuild base : ${REBUILD_BASE}`);
console.log(`  - live base    : ${LIVE_BASE}`);
