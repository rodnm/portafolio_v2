// Downloads the figures used as project covers from each project's own repository.
// Usage: scripts/node.sh scripts/fetch-project-images.mjs
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const maxWidth = 1240;

const raw = (repo, path) => `https://raw.githubusercontent.com/rodnm/${repo}/HEAD/${path}`;
const images = {
  "huella-minera": raw("huella-minera-peru", "docs/capturas/atlas_peru.png"),
  "riesgo-crediticio": raw("credit-risk-project", "reports/figures/06_roc_curves.png"),
  "incendios-2026": raw("mapa-incendios-peru-2026", "docs/img/historia-portada.jpg"),
  "mcp-sbs": raw("mcp-sbs-peru", "grafico.png"),
  "agua-lima": raw("lima-water-access", "outputs/map_static.png"),
  "enaho-pobreza": raw("enaho-skills", "mapas/pobreza_departamento.png"),
};

const out = new URL("../src/assets/generated/projects/", import.meta.url);
await mkdir(out, { recursive: true });

const signatures = { png: [0x89, 0x50, 0x4e, 0x47], jpg: [0xff, 0xd8, 0xff] };
for (const [slug, url] of Object.entries(images)) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status} for ${url}`);
  const bytes = new Uint8Array(await res.arrayBuffer());
  const ext = Object.entries(signatures).find(([, sig]) =>
    sig.every((b, i) => bytes[i] === b),
  )?.[0];
  if (!ext) throw new Error(`${slug}: not a PNG or JPEG (${url})`);
  // Keep the repository light: astro:assets derives every responsive size from this copy.
  const image = sharp(bytes);
  const { width = 0 } = await image.metadata();
  const data = width > maxWidth ? await image.resize({ width: maxWidth }).toBuffer() : bytes;
  await writeFile(new URL(`${slug}.${ext}`, out), data);
  console.log(`${slug}.${ext}  ${(data.length / 1024).toFixed(0)} KB`);
}
