import fg from "fast-glob";
import { mkdir, stat, writeFile } from "fs/promises";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, "..", "public", "images", "projekte");
const OUT_DIR = path.resolve(__dirname, "..", "public", "webp", "projekte");
const SIZES = [480, 800, 1200];

async function ensureDir(p) { try { await mkdir(p, { recursive: true }); } catch {} }
async function exists(p) { try { await stat(p); return true; } catch { return false; } }

async function run() {
  const entries = await fg(["**/*.{jpg,jpeg,png}"], { cwd: SRC_DIR });
  if (entries.length === 0) {
    console.log("[generate-webp] Нет исходников в /public/images/projekte");
    return;
  }

  for (const rel of entries) {
    const abs = path.join(SRC_DIR, rel);
    const base = path.basename(rel).replace(/\.(jpe?g|png)$/i, "");
    for (const w of SIZES) {
      const outDir = path.join(OUT_DIR, String(w));
      await ensureDir(outDir);
      const outFile = path.join(outDir, `${base}.webp`);
      if (await exists(outFile)) continue;
      try {
        const buf = await sharp(abs).rotate().resize({ width: w }).webp({ quality: w <= 480 ? 60 : 72 }).toBuffer();
        await writeFile(outFile, buf);
        console.log(`[generate-webp] + ${path.relative(OUT_DIR, outFile)}`);
      } catch (e) {
        console.warn(`[generate-webp] Ошибка на ${rel}@${w}:`, e.message);
      }
    }
  }
  console.log("[generate-webp] Готово ✅");
}
run().catch((e) => { console.error(e); process.exit(1); });
