/*
 Image conversion script: converts JPG/PNG under public/ to WebP and AVIF using sharp.
 Usage: `npm run convert-images` after installing `sharp`.
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function convertFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
  const fullPath = path.join(PUBLIC_DIR, file);
  const base = fullPath.replace(ext, '');
  try {
    await sharp(fullPath).toFile(base + '.webp');
    await sharp(fullPath).toFile(base + '.avif');
    console.log('Converted', file);
  } catch (err) {
    console.error('Failed to convert', file, err.message);
  }
}

function walk(dir, prefix = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  items.forEach((it) => {
    if (it.isDirectory()) {
      walk(path.join(dir, it.name), path.join(prefix, it.name));
    } else {
      const rel = path.join(prefix, it.name);
      convertFile(rel);
    }
  });
}

walk(PUBLIC_DIR);
