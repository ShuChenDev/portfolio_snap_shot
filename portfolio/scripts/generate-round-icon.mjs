import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public/images/selfie1.jpg");
const size = 512;
const circle = Buffer.from(
  `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`,
);

async function makeRoundIcon(out) {
  await sharp(src)
    .resize(size, size, { fit: "cover", position: "top" })
    .composite([{ input: circle, blend: "dest-in" }])
    .png()
    .toFile(path.join(root, out));
}

await makeRoundIcon("app/icon.png");
await makeRoundIcon("app/apple-icon.png");
await makeRoundIcon("public/images/favicon.png");
