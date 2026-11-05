# Portafolio v2 — guía para agentes

Seguimiento de la feature: `odd/tasks/portfolio-v2.md` (Specs, Tasks, Log). Léelo antes de cambiar código.

## Toolchain
- **pnpm** (`packageManager` en `package.json`). Nunca npm ni npx.
- **Node.js 26 LTS** con el modelo de permisos: todo script del proyecto corre vía `scripts/node.sh`, que agrega `--permission` y una lista acotada de rutas. Si una herramienta pide una ruta nueva, agrégala ahí con su motivo; nunca uses comodines globales.
- `pnpm-workspace.yaml` fija `minimumReleaseAge` (7 días) para las dependencias.

## Comandos
- `pnpm dev` · `pnpm build` · `pnpm check` · `pnpm test` · `pnpm test:e2e` · `pnpm format:check`

## Tailwind (CSS-first)
- Todos los tokens viven en `@theme` de `src/styles/global.css`. No uses valores arbitrarios cuando exista un token; si falta uno, agrégalo a `@theme`.
- Sin `@apply` (salvo estilos base de prosa). Las combinaciones repetidas se vuelven componentes.
- Mobile-first: estilos base para 360 px; los breakpoints solo agrandan.
- El orden de clases lo fija `prettier-plugin-tailwindcss`.

## Contenido y privacidad
- Bilingüe: cada texto visible existe en ES y EN.
- Nunca publicar: teléfono, referencias del CV, DNI, código de alumno, datos de terceros. `scripts/scan-privacy.mjs` lo verifica sobre `dist/`.
- Los documentos originales no van en este repo; solo miniaturas públicas.

## Commits
- Conventional Commits, unidades de ~400 líneas con sus tests y docs, sin atribución de IA.
