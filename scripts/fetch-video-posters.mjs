/**
 * Build one poster frame per boxing video, all the same shape.
 *
 *   node scripts/fetch-video-posters.mjs
 *
 * Two problems this solves, both decided here rather than in the browser.
 *
 * Choosing the frame. Three of the eight videos have no maxresdefault, and
 * YouTube does not fail that request - it answers with a grey placeholder,
 * which loads perfectly well, so a fallback waiting on an error never runs.
 * The placeholder is 120x90, so anything that small means "try the next size
 * down".
 *
 * Making them match. Three of the videos are vertical, and YouTube pads them
 * into a 4:3 frame with black bars baked into the picture. Dropped into a 16:9
 * card those bars survive any amount of cropping, so the row read as broken.
 * Each poster is rebuilt at 16:9: the real picture is trimmed out of its
 * padding, then laid over a blurred, enlarged copy of itself. Every card ends
 * up the same shape with no bars anywhere - what YouTube and Instagram both do
 * with material that does not fit their frame.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/images/boxe/video");
const DATA = path.join(ROOT, "src/data/BoxingPageData.json");

/** Best first. hqdefault always exists for a real video. */
const VARIANTS = ["maxresdefault", "sddefault", "hqdefault"];

const CARD = { width: 1280, height: 720 };

/**
 * A dropped connection part-way through should not lose the whole run and
 * leave half the posters at their old size, which is what happened once.
 */
async function get(url, attempts = 4) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }
}

fs.mkdirSync(OUT, { recursive: true });

const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
let total = 0;

for (const item of data.videos.items) {
  let source = null;

  for (const variant of VARIANTS) {
    const response = await get(`https://i.ytimg.com/vi/${item.youtubeId}/${variant}.jpg`);
    if (!response.ok) continue;

    const buffer = Buffer.from(await response.arrayBuffer());
    const { width } = await sharp(buffer).metadata();
    if (width <= 120) continue; // the grey placeholder

    source = { variant, buffer };
    break;
  }

  if (!source) {
    console.log(`  ! no usable frame for ${item.youtubeId} (${item.title})`);
    continue;
  }

  // Strip whatever padding YouTube added, so we are working with the picture.
  let content = source.buffer;
  let meta = await sharp(content).metadata();
  try {
    const trimmed = await sharp(content).trim({ threshold: 16 }).toBuffer({ resolveWithObject: true });
    // Only accept a trim that actually found bars rather than eating the image.
    if (trimmed.info.width > 100 && trimmed.info.height > 100) {
      content = trimmed.data;
      meta = trimmed.info;
    }
  } catch {
    /* nothing to trim */
  }

  const portrait = meta.height > meta.width;

  // The blurred backdrop: the same picture, filling the card, well out of
  // focus so it reads as a wash rather than a second image.
  const backdrop = await sharp(content)
    .resize({ ...CARD, fit: "cover" })
    .blur(28)
    .modulate({ brightness: 0.55 })
    .toBuffer();

  // The picture itself, fitted inside the card without cropping.
  const foreground = await sharp(content)
    .resize({ ...CARD, fit: "inside", withoutEnlargement: false })
    .toBuffer();

  await sharp(backdrop)
    .composite([{ input: foreground, gravity: "center" }])
    .webp({ quality: 82 })
    .toFile(path.join(OUT, `${item.youtubeId}.webp`));

  item.poster = `/images/boxe/video/${item.youtubeId}.webp`;
  total += fs.statSync(path.join(OUT, `${item.youtubeId}.webp`)).size;

  console.log(
    `  ${item.youtubeId}  ${source.variant.padEnd(14)} content ${String(meta.width).padStart(4)}x${String(
      meta.height,
    ).padEnd(4)} ${portrait ? "portrait -> blurred fill" : "landscape"}   ${item.title}`,
  );
}

fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`  ${data.videos.items.length} posters, all 16:9, ${(total / 1024).toFixed(0)} KB in total`);
