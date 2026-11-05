---
title: Who does the fire reach? Wildfires in Peru, 2026
question: How many people and buildings are within 1, 2, 5 and 10 km of an active fire, and in which districts?
result:
  value: "206,740"
  label: people within 5 km of an active fire (October 21 cut-off)
metrics:
  - { value: "123,580", label: VIIRS hotspots in the season }
  - { value: "118,358", label: buildings within 5 km }
  - { value: "×161", label: change in the figure between a 1 km and a 10 km radius }
stack: [Python, GeoPandas, DuckDB, GeoParquet, BallTree, deck.gl, GitHub Actions]
cover: ../../../assets/generated/projects/incendios-2026.jpg
coverAlt: Story cover with a map of Peru and the hotspots of the 2026 wildfire season.
year: 2026
order: 3
context: Independent project
categories: [geoespacial, riesgo, datos, politica]
links:
  - { kind: repo, url: "https://github.com/rodnm/mapa-incendios-peru-2026" }
  - { kind: demo, url: "https://rodnm.github.io/mapa-incendios-peru-2026/" }
  - { kind: story, url: "https://claude.ai/artifact/L7bWfwPE94wdHdTsXhLNcy" }
---

## Data and method

I combined VIIRS hotspots (FIRMS), WorldPop population and Google Open Buildings, read through DuckDB and GeoParquet. Hotspots were clustered into fires with BallTree, urban and fixed sources were filtered out, and exposure was measured with equal-area buffers.

A **live monitor** rebuilds itself every 3 hours with GitHub Actions and runs quality checks before publishing.

## Results

- The season added up to 123,580 hotspots, with 122 active vegetation fires at the cut-off.
- 206,740 people and 118,358 buildings are within 5 km of an active fire.
- Nauta alone holds 14% of the exposed population.

## Limits

The chosen radius changes the figure 161-fold between 1 km and 10 km, so I report all four radii. Being close to a fire does not mean the damage is confirmed.
