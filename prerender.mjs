import Prerenderer from "@prerenderer/prerenderer";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prerenderer = new Prerenderer({
  staticDir: path.resolve(__dirname, "dist"),
  renderer: new PuppeteerRenderer({
    renderAfterTime: 3000,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  }),
  server: {
    port: 3033,
    host: "localhost",
  },
});

try {
  await prerenderer.initialize();
  console.log("⚙️  Server started at http://localhost:3033");
  console.log("⚙️  Rendering routes...");

  const routes = await prerenderer.renderRoutes(["/", "/coming-soon"]);

  for (const route of routes) {
    const outputDir = path.join(__dirname, "dist", route.route);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, "index.html"), route.html.trim());
    console.log(`✓ Prerendered: ${route.route}`);
  }

  console.log("✅ Prerender complete");
} catch (err) {
  console.error("❌ Prerender error:", err.message);
} finally {
  await prerenderer.destroy();
  process.exit(0);
}
