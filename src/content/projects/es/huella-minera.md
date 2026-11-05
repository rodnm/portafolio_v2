---
title: La huella de la minería en el Perú, 2013–2025
question: ¿Dónde apareció la minería visible desde el satélite y cuánto creció por distrito entre 2013 y 2025?
result:
  value: "727 → 1,985 km²"
  label: superficie minera visible, ×2.7 en doce años
metrics:
  - { value: "63 %", label: del aumento ocurre en Madre de Dios }
  - { value: "−2.95 pp", label: "pobreza en distritos mineros (IC 95 %: −5.27 a −0.62)" }
  - { value: "7.06 pp", label: error medio del modelo de áreas pequeñas (línea base 8.40) }
stack: [Python, MapBiomas, NASA Black Marble, Fay-Herriot, Efectos fijos, Stata, Streamlit]
cover: ../../../assets/generated/projects/huella-minera.png
coverAlt: Atlas interactivo con el mapa del Perú y la superficie minera visible por distrito en 2025.
year: 2026
order: 1
context: Proyecto final · Python Intermedio, PUCP
categories: [econometria, geoespacial, politica]
links:
  - { kind: repo, url: "https://github.com/rodnm/huella-minera-peru" }
  - { kind: demo, url: "https://claude.ai/artifact/TLWHpf4ZSXAAhyBEZTmKh7" }
  - { kind: video, url: "https://lnkd.in/p/edJbsVDx" }
  - {
      kind: report,
      url: "https://github.com/rodnm/huella-minera-peru/blob/HEAD/docs/metodologia_y_hallazgos.md",
    }
---

## Datos y método

Promedié la clasificación de MapBiomas (30 m) sobre una grilla de 500 m y la contrasté con Amazon Mining Watch. Crucé esa huella con las luces nocturnas de NASA Black Marble y con los mapas de pobreza del INEI.

Para la pobreza distrital estimé un modelo de áreas pequeñas **Fay-Herriot** a partir de la ENAHO (Prasad-Rao y REML). Después corrí una regresión con **efectos fijos por departamento** y errores agrupados, con un grupo **placebo**: minas que abren después de 2018. Repliqué la estimación en Stata.

## Resultados

- La superficie minera visible pasó de 727 a 1,985 km²: se multiplicó por 2.7.
- Madre de Dios explica el 63 % del aumento, y 10 distritos explican el 73 %.
- Los distritos mineros tienen 2.95 puntos menos de pobreza (IC 95 %: −5.27 a −0.62).
- El modelo de áreas pequeñas reduce el error medio a 7.06 pp, frente a 8.40 pp de la línea base.

## Límites

Abrir una mina se asocia con −0.71 pp de pobreza, pero el intervalo (−4.72 a +3.30) incluye el cero. El placebo da −2.68 pp. Por eso **no afirmo un efecto causal**: la diferencia parece venir de dónde se instalan las minas, no de lo que provocan.
