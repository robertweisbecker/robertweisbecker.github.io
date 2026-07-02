import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const diagnosticsPath = join(process.cwd(), ".next/diagnostics/route-bundle-stats.json");

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

function walkCssFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walkCssFiles(fullPath, files);
    } else if (entry.endsWith(".css")) {
      files.push(fullPath);
    }
  }
  return files;
}

function inspectConicGradientCss() {
  const cssDir = join(process.cwd(), ".next/static");
  let cssFiles = [];
  try {
    cssFiles = walkCssFiles(cssDir);
  } catch {
    console.log("Conic gradient CSS: no .next/static output found");
    return;
  }

  let foundPercent = false;
  let foundZero = false;

  for (const file of cssFiles) {
    const content = readFileSync(file, "utf8");
    if (content.includes("--tw-gradient-from-position")) {
      if (content.includes("initial-value:0%") || content.includes("initial-value: 0%")) {
        foundPercent = true;
      }
      if (content.includes("initial-value:0;") || content.includes("initial-value: 0;")) {
        foundZero = true;
      }
    }
  }

  if (foundPercent) {
    console.log("Conic gradient CSS: emits initial-value:0%");
  } else if (foundZero) {
    console.log("Conic gradient CSS: WARNING — found initial-value:0 (webpack/cssnano bug)");
  } else {
    console.log("Conic gradient CSS: no --tw-gradient-from-position declarations found");
  }
}

const stats = readJson(diagnosticsPath);

if (!stats) {
  console.error(`Missing ${diagnosticsPath}. Run npm run build first.`);
  process.exit(1);
}

const routes = Array.isArray(stats.routes) ? stats.routes : Array.isArray(stats) ? stats : stats.routeStats ?? [];

console.log(`Route count: ${routes.length}`);

const sorted = [...routes].sort((a, b) => {
  const aSize = a.firstLoadUncompressedJsBytes ?? a.firstLoadJS ?? a.size ?? 0;
  const bSize = b.firstLoadUncompressedJsBytes ?? b.firstLoadJS ?? b.size ?? 0;
  return bSize - aSize;
});

console.log("\nTop first-load JS routes:");
for (const route of sorted.slice(0, 15)) {
  const path = route.route ?? route.page ?? route.pathname ?? "(unknown)";
  const size = route.firstLoadUncompressedJsBytes ?? route.firstLoadJS ?? route.size ?? 0;
  const kb = typeof size === "number" ? `${(size / 1024).toFixed(1)} kB` : size;
  console.log(`  ${path}: ${kb}`);
}

console.log("");
inspectConicGradientCss();
