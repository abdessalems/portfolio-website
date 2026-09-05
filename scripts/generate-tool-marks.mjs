/**
 * Draw the marks for skills that have no brand behind them.
 *
 *   node scripts/generate-tool-marks.mjs
 *
 * BPMN, UML and SQL are notations and languages, not products, so no icon set
 * carries a logo for them - and they are the most analyst-identifying things
 * in the strip. They are drawn here in the site's own teal, in the same line
 * style as the competency artwork, so they sit beside the real brand marks
 * without pretending to be one.
 *
 * Bolder and simpler than the competency drawings: these render at 44px, where
 * a thin line disappears.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "../public/images/tools");
const TEAL = "#2dd4bf";
const SIZE = 128;

fs.mkdirSync(OUT, { recursive: true });

const stroke = `stroke="${TEAL}" fill="none" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"`;
const soft = `fill="${TEAL}" fill-opacity="0.16"`;

const MARKS = {
  /* A start event, a task and a gateway: the three shapes that say BPMN. */
  bpmn: `
    <circle cx="14" cy="50" r="9" ${soft}/><circle cx="14" cy="50" r="9" ${stroke}/>
    <path d="M23 50 L34 50" ${stroke}/>
    <rect x="34" y="36" width="30" height="28" rx="5" ${soft}/>
    <rect x="34" y="36" width="30" height="28" rx="5" ${stroke}/>
    <path d="M64 50 L74 50" ${stroke}/>
    <path d="M88 32 L106 50 L88 68 L70 50 Z" ${soft}/>
    <path d="M88 32 L106 50 L88 68 L70 50 Z" ${stroke}/>`,

  /* Two classes and the association between them: UML at a glance. */
  uml: `
    <rect x="10" y="22" width="42" height="34" rx="4" ${soft}/>
    <rect x="10" y="22" width="42" height="34" rx="4" ${stroke}/>
    <path d="M10 34 L52 34" ${stroke}/>
    <rect x="66" y="60" width="42" height="34" rx="4" ${soft}/>
    <rect x="66" y="60" width="42" height="34" rx="4" ${stroke}/>
    <path d="M66 72 L108 72" ${stroke}/>
    <path d="M52 46 L66 46 L66 60" ${stroke}/>`,

  /* A table with a key line: the shape of a query result. */
  sql: `
    <rect x="16" y="20" width="86" height="78" rx="7" ${soft}/>
    <rect x="16" y="20" width="86" height="78" rx="7" ${stroke}/>
    <path d="M16 42 L102 42" ${stroke}/>
    <path d="M46 42 L46 98" ${stroke}/>
    <path d="M28 60 L36 60 M56 60 L90 60" ${stroke}/>
    <path d="M28 78 L36 78 M56 78 L80 78" ${stroke}/>`,
};

let total = 0;
for (const [name, body] of Object.entries(MARKS)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 118 118">${body}</svg>`;
  const file = path.join(OUT, `${name}.svg`);
  fs.writeFileSync(file, svg, "utf8");
  const png = path.join(OUT, `${name}.png`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(png);
  total += fs.statSync(png).size;
  console.log(`  ${name.padEnd(6)} ${(fs.statSync(png).size / 1024).toFixed(1)} KB`);
}
console.log(`  ${Object.keys(MARKS).length} marks, ${(total / 1024).toFixed(0)} KB`);
