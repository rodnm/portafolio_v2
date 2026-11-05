# Portafolio v2

Objetivo: portafolio personal bilingüe (ES/EN), móvil primero, publicado en GitHub Pages (`/portafolio_v2/`, luego en la raíz).
Rama: `claude/quirky-bell-teb25b` · Entrega: commits por unidad de trabajo (~400 líneas) con sus tests · Tests: Vitest + Playwright (+ axe, Lighthouse).
Engram: `odd/portfolio-v2/tasks` · Toolchain: pnpm 10.28.0 + Node 26.13.0 LTS con `--permission`.

## Specs

- **S1** «el website debe ser visible tanto en escritorio como web movil, debe poder renderizar bien en ambos ya que muchas veces se usa el celular para revisar paginas web.»
- **S2** «la pagina web debe poder verse tanto en ingles como español.»
- **S3** «debe haber un espacio para proyecto, un espacio para certificaciones, diplomas, cosas que estoy estudiando si deseo añadir, un apartado para papers que escriba (todavia no tengo), etc.»
- **S4** «debe ser bien genial y creativo, con mucho detalle»
- **S5** Acerca de mí (texto del usuario, se publica completo):
  > Soy Rodrigo Andrés Norabuena Mascaraqui economista de la Pontificia Universidad Católica del Perú y me interesa desarrollar una carrera en análisis cuantitativo aplicado: utilizar datos y métodos estadísticos y econométricos para entender problemas económicos y sociales, generar evidencia y apoyar decisiones.
  >
  > En mi experiencia profesional he trabajado en el diseño de bases de datos, automatización de procesos y desarrollo de dashboards para transformar información institucional en indicadores útiles para la gestión de la investigación. Diseñé una arquitectura de bases de datos relacionales, implementé un pipeline ETL en Python que redujo un proceso de actualización de 3 días a 5 minutos y desarrollé herramientas de visualización para la dirección de investigación.
  >
  > Estas experiencias me han permitido desarrollar una base técnica sólida en Python, SQL, R, Stata, Power BI y machine learning, pero también han reforzado algo que considero central en mi desarrollo profesional: no me interesa solamente preparar o procesar información, sino entender la pregunta que queremos responder, elegir un método adecuado, analizar los resultados y comunicar conclusiones que sean útiles.
  >
  > Actualmente continúo fortaleciendo estas capacidades mediante proyectos independientes y formación en ciencia de datos, econometría e inferencia causal. Me interesa especialmente explorar oportunidades en investigación aplicada, consultoría económica, evaluación de impacto, política pública, regulación, riesgos y analítica, siempre desde una perspectiva cuantitativa.
- **S6** «revisa todos mis proyectos de github: https://github.com/rodnm?tab=repositories»
- **S7** Dirección visual elegida: «Editorial + HUD (Recomendado)», a partir de los diseños propios «Portfolio Odyssey».
- **S8** «para el css es mejor reescribir en Tailwind para tener una escritura estandarizada. mucho ojo en eso.» · «TypeScript podria teenr framework pero quisera que me recomiendes cual elegir.» → recomendación aceptada en el plan: Svelte 5.
- **S9** «no uses npm. mejor usa pnpm. si necesitas usar node.js usa la version 26 lts con --permission»
- **S10** «por ahora sera portafolio_v2, el actual que esta en rodnm.github.io debe pasar a ser portafolio_v1. portafolio_v2 lo va a reemplazar»
- **S11** Privacidad: «Los originales pasan a un repo privado que tú creas. El sitio usa solo miniaturas WebP de la página 1, sin DNI. Te preparo los comandos para purgar el historial de git (force-push a main), y los ejecutas o apruebas tú. quiero que tu lo hagas». Guía PDF, «Lo que nunca debe llegar a su sitio»: claves de API y `.env`; datos personales de otras personas; la voz o la cara de alguien sin su permiso.
- **S12** Las coordenadas de la tira HUD del CAP. 01 son un valor fijo acordado con el usuario. Su origen no se documenta en el repositorio.
- **S13** «puedes basarte en informacion de mi cv para completar informacion sobre mi.»
- **S14** «lo más reciente que hice fue haber participado de IBM QUANTUM | QISKIT FALL FEST 2026»
- **S15** «sobre CAP. 06 Estudiando ahora: Diplomatura Q-LAB 2026–27, y GCI World 2026, con un punto pulsante.»
- **S16** «CAP. 07 Papers: «Working papers: n =  (por ahora)», con el artículo de informalidad laboral como pipeline (pregunta → datos → estimación → borrador). El esquema ya admite BibTeX y PDF. di que es clasificado el paper jaja»
- **S17** OEFA 2025: «bueno es finalista porque asi lo llamaron en su momento pero despues entregaron el certificado que decia participacion para todos por igual. solo a los ganadores les dieron una certificacion especial de ganador.»
- **S18** «egrese en 2024 diciembre, pero mi bachiller me lo entregaron en abril de 2025»
- **S19** Kung Fu: «si tengo las medallas, pero no entregan diplomas ni certificados esas competencias»
- **S20** Metodología: skills ODD y HDD, y «tambien quiero que uses las herramientas de https://github.com/Gentleman-Programming/gentle-ai»
- **S21** Rúbrica de la guía PDF: «Sitio vivo en usuario.github.io · Inicio: foto, bio en dos líneas, links y CV en PDF · Tres proyectos con imagen, pregunta, resultado y links · Un video, un paper o una demo embebidos · Se ve bien en el celular y no tiene links rotos»

## Tasks

| ID | Specs | Ruta | Estado | Commit / evidencia |
|---|---|---|---|---|
| T0.1 Respaldo de los 75 originales en el repo privado | S11 | usuario (instrucciones entregadas) | bloqueado: Claude sin acceso a `rodnm/portafolio-docs` | — |
| T0.3 `main` limpio + force-push | S11 | usuario o inline | bloqueado por T0.1 | raíz limpia local `f3abae7` |
| T1.1 Documento ODD | S20 | inline | hecho | este archivo |
| T1.2 H3 gentle-ai | S20 | inline | hecho | ver L4 |
| T1.3 H5 Node 26 `--permission` | S9 | inline | hecho | ver L6 |
| T1.4 Scaffold Astro + Tailwind + Svelte | S1, S2, S8 | inline | hecho | ROJO: preview respondía 404 en `/portafolio_v2/` → VERDE: 4/4 e2e (mobile + desktop), 2/2 unit |
| T1.5 CI + despliegue | S10, S21 | inline | hecho (sin ejecutar: push bloqueado) | `ci.yml`, `deploy.yml` |
| T2 Sistema de diseño + layout + i18n | S1, S2, S4, S7, S8 | inline | pendiente | — |
| T3 Contenido núcleo + CV | S5, S13, S18 | inline | pendiente | — |
| T4 Proyectos | S3, S6, S21 | inline | pendiente | — |
| T5 Credenciales, estudios, papers, eventos | S3, S11, S14–S17, S19 | inline | pendiente | — |
| T6 Detalles creativos + rendimiento | S4, S12 | inline | pendiente | — |
| T7 QA + judgment-day + publicación | S10, S21 | inline + 2 jueces | pendiente | — |

## Log

- **L1** (pedido original) «vamos a elaborar un plan para crear un portafolio. Este es mi portafolio anterior: https://rodnm.github.io/ y https://github.com/rodnm/rodnm.github.io te paso un documento pdf con instrucciones que nos sirve de guia y portafolios que podemos usar de referencia […] el website debe ser visible tanto en escritorio como web movil, debe poder renderizar bien en ambos ya que muchas veces se usa el celular para revisar paginas web. la pagina web debe poder verse tanto en ingles como español. debe haber un espacio para proyecto, un espacio para certificaciones, diplomas, cosas que estoy estudiando si deseo añadir, un apartado para papers que escriba (todavia no tengo), etc. debe ser bien genial y creativo, con mucho detalle […] he subido al repo mis certificaciones diplomas, etc. quiero que empleemos estas skills: [odd, hdd]»
- **L2** Exploración: 34 repos propios inventariados; v1 analizada (Astro 5 + React 19, OG rota, `hreflang` mal armado, contenido invisible sin JS); 75 documentos catalogados. **Hallazgo de privacidad:** el DNI aparece en el nombre y en la página 2 del diploma y en la página 2 de NETCRAM, el código de alumno PUCP en 3 constancias, y el PDF del equipo de Kung Fu tiene datos de otros 25 estudiantes. El repo es público.
- **L3** Decisiones: no se publican el teléfono ni las referencias del CV; OEFA 2025 figura como «Finalista», con nota de que la constancia es de participación (S17); egreso dic 2024 y grado de bachiller 2025 (S18); commits sin atribución de IA.
- **L4** H3 (gentle-ai) — **Confirmada, con un ajuste.** `install.sh --method binary` falló con HTTP 403 de la API de GitHub (bloqueada por el proxy). Se refinó una vez: `go install github.com/gentleman-programming/gentle-ai/v4/cmd/gentle-ai@latest` (v4.3.1, con descarga automática del toolchain) y `go install github.com/Gentleman-Programming/engram/v3/cmd/engram@v3.6.0`. Después: `GENTLE_AI_ENGRAM_BIN=… gentle-ai install --agent claude-code --scope workspace --component skills,engram,context7 --skill branch-pr,work-unit-commits,judgment-day,cognitive-doc-design --persona custom` → «Verification checks: 16 passed, 0 failed». `gentle-ai doctor`: 7 pasan, 1 falla (`gga`, que no se pidió); Engram MCP responde. Telemetría desactivada.
- **L5** F0 bloqueada: `add_repo rodnm/portafolio-docs` → «you don't have access». Tras la reconexión de GitHub, el push a `portafolio_v2` también falla con 403. Se entregaron al usuario las instrucciones para hacer el respaldo y la limpieza él mismo. El trabajo sigue en local sobre una raíz limpia (`f3abae7`, sin `docs/`); los originales se leen desde el objeto `origin/main` local.
- **L6** H5 (Node 26 `--permission`) — **Confirmada.** Node 26.13.0 se descargó de nodejs.org con su sha256 verificado (`pnpm env` no gestiona Node con este pnpm). `scripts/node.sh` corre astro, vitest, playwright y prettier con `--permission` y estas lecturas: el repo, `/tmp`, el CA del proxy y los navegadores de Playwright, más dos sondas de WSL que usa Vite (`/proc/sys/fs/binfmt_misc/WSLInterop`, `/run/WSL`). Escrituras: solo los directorios de caché y salida del proyecto, siempre con barra final. Sin ella, un directorio que la herramienta borra y recrea (`node_modules/.vite-temp`) se toma como archivo y el worker de Vitest falla. Astro 7 manda el preview a segundo plano cuando detecta un agente, así que Playwright lo lanza con `--ignore-lock`. Límite conocido: `--allow-child-process`, `--allow-worker` y `--allow-addons` son necesarios (esbuild, Chromium, sharp) y los procesos hijos no quedan restringidos por el modelo. Resultado: `pnpm check` 0 errores · `pnpm test` 2/2 · `pnpm build` 2 páginas · `pnpm test:e2e` 4/4 · `pnpm format:check` OK.
