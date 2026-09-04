/**
 * Download a poster frame for every boxing video and serve it ourselves.
 *
 *   node scripts/fetch-video-posters.mjs
 *
 * Three of the eight videos have no maxresdefault frame, and YouTube does not
 * fail that request - it answers with a grey "no thumbnail" placeholder, which
 * loads perfectly well, so an onError fallback in the browser never fires and
 * three cards sat there grey. Choosing the right frame is decided here, once,
 * by measuring what actually comes back: the placeholder is 120x90, so
 * anything that small means "try the next size down".
 *
 * Hosting the result ourselves also means the page makes no request to Google
 * until a visitor presses play.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/images/boxe/video");
const DATA = path.join(ROOT, "src/data/BoxingPageData.json");

/** Best first. hqdefault always exists for a real video. */
const VARIANTS = ["maxresdefault", "sddefault", "hqdefault"];

fs.mkdirSync(OUT, { recursive: true });

const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
let total = 0;

for (const item of data.videos.items) {
  let chosen = null;

  for (const variant of VARIANTS) {
    const response = await fetch(`https://i.ytimg.com/vi/${item.youtubeId}/${variant}.jpg`);
    if (!response.ok) continue;

    const buffer = Buffer.from(await response.arrayBuffer());
    const { width, height } = await sharp(buffer).metadata();

    // The grey placeholder YouTube returns instead of a real frame.
    if (width <= 120) continue;

    chosen = { variant, buffer, width, height };
    break;
  }

  if (!chosen) {
    console.log(`  ! no usable frame for ${item.youtubeId} (${item.title})`);
    continue;
  }

  const file = path.join(OUT, `${item.youtubeId}.webp`);
  await sharp(chosen.buffer).webp({ quality: 82 }).toFile(file);
  item.poster = `/images/boxe/video/${item.youtubeId}.webp`;
  total += fs.statSync(file).size;

  console.log(
    `  ${item.youtubeId}  ${chosen.variant.padEnd(14)} ${chosen.width}x${chosen.height}  ${item.title}`,
  );
}

fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`  posters: ${(total / 1024).toFixed(0)} KB in total, served from this domain`);
