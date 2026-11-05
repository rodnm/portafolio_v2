// Scans the built site for personal data. Usage: scripts/node.sh scripts/scan-privacy.mjs [dir]
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { findLeaks } from "./privacy.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const dir = join(root, process.argv[2] ?? "dist");
// Bundled JS/CSS are library code (full of numeric constants); page content and data live in these:
const textTypes = new Set([".html", ".xml", ".txt", ".json", ".svg", ".webmanifest"]);
const forbiddenPaths = [/(^|\/)docs\//i, /\.(docx?|xlsx?)$/i];

async function* walk(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const full = join(path, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let problems = 0;
for await (const file of walk(dir)) {
  const rel = relative(dir, file);
  if (forbiddenPaths.some((re) => re.test(rel))) {
    console.error(`forbidden file: ${rel}`);
    problems++;
    continue;
  }
  if (!textTypes.has(extname(file))) continue;
  for (const leak of findLeaks(await readFile(file, "utf8"))) {
    console.error(`${rel}: ${leak.rule} → "${leak.match}"`);
    problems++;
  }
}

if (problems) {
  console.error(`\nPrivacy scan failed: ${problems} problem(s).`);
  process.exit(1);
}
console.log(`Privacy scan passed: ${relative(root, dir)}/`);
