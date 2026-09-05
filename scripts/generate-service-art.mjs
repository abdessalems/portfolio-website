/**
 * Draw the Core Competencies backgrounds.
 *
 *   node scripts/generate-service-art.mjs
 *
 * The cards used to carry stock illustrations with their own titles printed
 * into them, which argued with the heading above them and drew a programmer on
 * the section meant to show an analyst.
 *
 * These are drawn here instead: line art in the site's own teal, on a
 * transparent ground, one motif per competency. Transparency is the point -
 * the card text is white in the dark theme and near-black in the light one, so
 * a picture with a background of its own can only be legible under one of
 * them. Line art composites over whichever surface is underneath.
 *
 * Nothing is written in words: a background that spells something is a
 * background that can contradict the title, and cannot be translated.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "../public/images/competency");
const TEAL = "#2dd4bf";
const SIZE = 640;

fs.mkdirSync(OUT, { recursive: true });

/*
 * Shared drawing vocabulary, so the nine read as one set.
 *
 * userSpaceOnUse matters: the default is objectBoundingBox, and a horizontal
 * or vertical line has a bounding box of zero height or width, which makes the
 * gradient degenerate and the stroke paint nothing at all. Every connector in
 * the first draft was invisible for exactly that reason.
 */
const defs = `
  <defs>
    <linearGradient id="fade" gradientUnits="userSpaceOnUse" x1="80" y1="40" x2="560" y2="460">
      <stop offset="0%" stop-color="${TEAL}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${TEAL}" stop-opacity="0.35"/>
    </linearGradient>
  </defs>`;

const stroke = `stroke="url(#fade)" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"`;
const soft = `fill="${TEAL}" fill-opacity="0.13"`;

/** node/box helper */
const box = (x, y, w, h, r = 8) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${soft}/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${stroke}/>`;

const line = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" ${stroke}/>`;

const circle = (cx, cy, r) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" ${soft}/><circle cx="${cx}" cy="${cy}" r="${r}" ${stroke}/>`;

const tick = (x, y, s = 1) =>
  `<path d="M${x} ${y} l${9 * s} ${9 * s} l${17 * s} ${-19 * s}" ${stroke}/>`;

const ART = {
  // Decomposition: one need branching into what it becomes.
  "functional-analysis": `
    ${box(250, 60, 150, 64)}
    ${line(325, 124, 325, 170)} ${line(150, 170, 500, 170)}
    ${line(150, 170, 150, 210)} ${line(325, 170, 325, 210)} ${line(500, 170, 500, 210)}
    ${box(85, 210, 130, 58)} ${box(260, 210, 130, 58)} ${box(435, 210, 130, 58)}
    ${line(150, 268, 150, 320)} ${line(500, 268, 500, 320)}
    ${box(85, 320, 130, 58)} ${box(435, 320, 130, 58)}`,

  // A requirement, its criteria, and the boxes that get ticked.
  "requirements-engineering": `
    ${box(120, 70, 400, 76, 10)}
    ${line(160, 108, 300, 108)}
    ${box(120, 176, 400, 60, 10)} ${tick(150, 202)}
    ${line(200, 206, 420, 206)}
    ${box(120, 266, 400, 60, 10)} ${tick(150, 292)}
    ${line(200, 296, 380, 296)}
    ${box(120, 356, 400, 60, 10)} ${tick(150, 382)}
    ${line(200, 386, 440, 386)}`,

  // A process: start, decision, two paths, end.
  "process-api-modelling": `
    ${circle(110, 240, 34)}
    ${line(144, 240, 205, 240)}
    ${box(205, 205, 120, 70)}
    ${line(325, 240, 380, 240)}
    <path d="M440 190 L490 240 L440 290 L390 240 Z" ${soft}/>
    <path d="M440 190 L490 240 L440 290 L390 240 Z" ${stroke}/>
    ${line(440, 190, 440, 120)} ${line(440, 120, 540, 120)}
    ${line(440, 290, 440, 370)} ${line(440, 370, 540, 370)}
    ${box(540, 90, 60, 60)} ${box(540, 340, 60, 60)}`,

  // People around a table: the workshop.
  "stakeholder-management": `
    ${circle(320, 240, 96)}
    ${circle(320, 90, 30)} ${circle(320, 390, 30)}
    ${circle(170, 165, 30)} ${circle(470, 165, 30)}
    ${circle(170, 315, 30)} ${circle(470, 315, 30)}
    ${line(320, 120, 320, 144)} ${line(320, 336, 320, 360)}
    ${line(196, 180, 240, 200)} ${line(444, 180, 400, 200)}
    ${line(196, 300, 240, 280)} ${line(444, 300, 400, 280)}`,

  // Test cases, passing.
  "functional-testing": `
    ${box(150, 60, 340, 400, 14)}
    ${line(150, 130, 490, 130)}
    ${tick(190, 176)} ${line(250, 180, 440, 180)}
    ${tick(190, 246)} ${line(250, 250, 410, 250)}
    ${tick(190, 316)} ${line(250, 320, 440, 320)}
    ${tick(190, 386)} ${line(250, 390, 380, 390)}`,

  // The stack: interface, service, data.
  "full-stack-development": `
    ${box(140, 80, 360, 90, 12)}
    ${line(180, 125, 260, 125)}
    ${box(140, 200, 360, 90, 12)}
    ${line(180, 245, 300, 245)}
    ${box(140, 320, 360, 90, 12)}
    ${line(180, 365, 240, 365)}
    ${line(200, 170, 200, 200)} ${line(440, 170, 440, 200)}
    ${line(200, 290, 200, 320)} ${line(440, 290, 440, 320)}`,

  // A system taken apart into its components.
  "technical-analysis": `
    ${box(230, 70, 180, 80, 10)}
    ${line(320, 150, 320, 190)}
    ${line(120, 190, 520, 190)}
    ${line(120, 190, 120, 230)} ${line(240, 190, 240, 230)}
    ${line(400, 190, 400, 230)} ${line(520, 190, 520, 230)}
    ${box(70, 230, 100, 70)} ${box(190, 230, 100, 70)}
    ${box(350, 230, 100, 70)} ${box(470, 230, 100, 70)}
    ${line(120, 300, 120, 350)} ${line(400, 300, 400, 350)}
    ${circle(120, 385, 34)} ${circle(400, 385, 34)}`,

  // Two systems exchanging: request out, event back.
  "integration-analysis": `
    ${box(60, 190, 150, 110, 12)}
    ${box(430, 190, 150, 110, 12)}
    <path d="M215 220 L425 220" ${stroke}/>
    <path d="M410 208 L425 220 L410 232" ${stroke}/>
    <path d="M425 275 L215 275" ${stroke}/>
    <path d="M230 263 L215 275 L230 287" ${stroke}/>
    ${circle(320, 110, 40)}
    ${line(320, 150, 320, 190)}
    ${line(135, 300, 135, 360)} ${line(505, 300, 505, 360)}
    ${box(85, 360, 100, 60)} ${box(455, 360, 100, 60)}`,

  // Tables and the keys between them.
  "data-modelling": `
    ${box(90, 90, 190, 150, 10)}
    ${line(90, 130, 280, 130)} ${line(120, 165, 240, 165)} ${line(120, 200, 250, 200)}
    ${box(370, 90, 190, 150, 10)}
    ${line(370, 130, 560, 130)} ${line(400, 165, 520, 165)} ${line(400, 200, 530, 200)}
    ${line(280, 165, 370, 165)}
    ${box(230, 310, 190, 150, 10)}
    ${line(230, 350, 420, 350)} ${line(260, 385, 380, 385)} ${line(260, 420, 390, 420)}
    ${line(185, 240, 300, 310)} ${line(465, 240, 350, 310)}`,
};

let total = 0;
for (const [name, body] of Object.entries(ART)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 640 500">${defs}${body}</svg>`;
  const file = path.join(OUT, `${name}.png`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file);
  const size = fs.statSync(file).size;
  total += size;
  console.log(`  ${name.padEnd(28)} ${(size / 1024).toFixed(1)} KB`);
}

console.log(`  ${Object.keys(ART).length} backgrounds, ${(total / 1024).toFixed(0)} KB in total`);
