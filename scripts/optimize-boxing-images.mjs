/**
 * Prepare the boxing photographs for the web.
 *
 *   node scripts/optimize-boxing-images.mjs
 *
 * Three things the gallery needs and did not have.
 *
 * Real dimensions. Every photo was cropped to the same 4:3 tile, so a portrait
 * shot of a fighter lost its subject. Writing width and height into the data
 * lets the gallery lay each photo out at its own shape, and lets the browser
 * reserve the right box before the file arrives, which is what stops the page
 * jumping while it loads.
 *
 * Smaller files. 5.7 MB of full-size JPEGs for a page most people open on a
 * phone. Each photo is emitted twice as WebP - 640px wide for the grid and
 * 1600px for the lightbox - so the grid downloads thumbnails rather than
 * originals, and the original is never fetched at all unless a browser cannot
 * read WebP.
 *
 * The originals are left untouched on disk and stay as the <picture> fallback.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "public/images/boxe");
const OUT = path.join(ROOT, "public/images/boxe/w");
const DATA = path.join(ROOT, "src/data/BoxingPageData.json");

const WIDTHS = { thumb: 640, full: 1600 };

fs.mkdirSync(OUT, { recursive: true });

const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const photos = data.gallery.photos;

let bytesBefore = 0;
let bytesAfter = 0;
const updated = [];

for (const photo of photos) {
  // One filename carries a space, written %20 in the data: decode before
  // touching the disk or the file simply is not found.
  const file = path.join(ROOT, "public", decodeURIComponent(photo.src));
  if (!fs.existsSync(file)) {
    console.log(`  ! missing, kept as-is: ${photo.src}`);
    updated.push(photo);
    continue;
  }

  const base = path.basename(photo.src, path.extname(photo.src));
  const image = sharp(file);
  const { width, height } = await image.metadata();
  bytesBefore += fs.statSync(file).size;

  const out = { ...photo, w: width, h: height };

  for (const [label, target] of Object.entries(WIDTHS)) {
    const destination = path.join(OUT, `${base}-${target}.webp`);
    // Never upscale: a photo narrower than the target keeps its own width.
    await sharp(file)
      .resize({ width: Math.min(target, width), withoutEnlargement: true })
      .webp({ quality: label === "thumb" ? 72 : 82 })
      .toFile(destination);
    bytesAfter += fs.statSync(destination).size;
    out[label] = `/images/boxe/w/${base}-${target}.webp`;
  }

  updated.push(out);
}

data.gallery.photos = updated;
fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n", "utf8");

const mb = (n) => (n / 1024 / 1024).toFixed(2) + " MB";
console.log(`  photos processed: ${updated.length}`);
console.log(`  originals:        ${mb(bytesBefore)}`);
console.log(`  webp (both sizes):${mb(bytesAfter)}`);
console.log(
  `  what the grid now downloads: ${mb(
    updated.reduce((sum, p) => (p.thumb ? sum + fs.statSync(path.join(ROOT, "public", p.thumb)).size : sum), 0),
  )}`,
);
