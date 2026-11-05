---
title: ¿A quién alcanza el fuego? Incendios en el Perú, 2026
question: ¿Cuántas personas y edificaciones están a menos de 1, 2, 5 y 10 km de un incendio activo, y en qué distritos?
result:
  value: "206,740"
  label: personas a menos de 5 km de un incendio activo (corte del 21 de octubre)
metrics:
  - { value: "123,580", label: focos de calor VIIRS en la temporada }
  - { value: "118,358", label: edificaciones a menos de 5 km }
  - { value: "×161", label: cambia la cifra entre un radio de 1 km y uno de 10 km }
stack: [Python, GeoPandas, DuckDB, GeoParquet, BallTree, deck.gl, GitHub Actions]
cover: ../../../assets/generated/projects/incendios-2026.jpg
coverAlt: Portada del relato con el mapa del Perú y los focos de calor de la temporada de incendios 2026.
year: 2026
order: 3
context: Proyecto independiente
categories: [geoespacial, riesgo, datos, politica]
links:
  - { kind: repo, url: "https://github.com/rodnm/mapa-incendios-peru-2026" }
  - { kind: demo, url: "https://rodnm.github.io/mapa-incendios-peru-2026/" }
  - { kind: story, url: "https://claude.ai/artifact/L7bWfwPE94wdHdTsXhLNcy" }
---

## Datos y método

Uní los focos de calor VIIRS (FIRMS), la población de WorldPop y las edificaciones de Google Open Buildings, leídas con DuckDB y GeoParquet. Agrupé los focos en incendios con BallTree, filtré fuentes urbanas y fijas, y medí la exposición con buffers de área equivalente.

Un **monitor en vivo** se reconstruye solo cada 3 horas con GitHub Actions y aplica controles de calidad antes de publicar.

## Resultados

- La temporada sumó 123,580 focos de calor, con 122 incendios de vegetación activos al corte.
- 206,740 personas y 118,358 edificaciones están a menos de 5 km de un incendio activo.
- Nauta concentra el 14 % de la población expuesta.

## Límites

El radio elegido cambia la cifra 161 veces entre 1 km y 10 km, así que reporto los cuatro radios. Además, que un incendio esté cerca no significa que el daño esté confirmado.
