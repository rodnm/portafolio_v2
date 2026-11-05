---
title: Tres skills que limpian la ENAHO 2024
question: ¿Puede un agente limpiar la ENAHO y replicar la pobreza oficial del INEI?
result:
  value: "27.58 %"
  label: pobreza monetaria estimada, frente al 27.6 % oficial
metrics:
  - { value: "5.50 %", label: pobreza extrema }
  - { value: "24.81 % · 39.30 %", label: pobreza urbana y rural }
  - { value: "0.1 pt", label: tolerancia máxima antes de detener la ejecución }
stack: [Python, ENAHO, Factores de expansión, Claude Code skills, GeoPandas]
cover: ../../../assets/generated/projects/enaho-pobreza.png
coverAlt: Mapa del Perú con la pobreza monetaria por departamento en 2024.
year: 2026
order: 6
context: Diplomatura Q-LAB PUCP · sesión 16
categories: [econometria, politica, ia]
links:
  - { kind: repo, url: "https://github.com/rodnm/enaho-skills" }
  - { kind: report, url: "https://github.com/rodnm/enaho-skills/blob/HEAD/evaluacion.md" }
---

## Datos y método

Escribí tres skills de Claude Code que limpian los microdatos de la ENAHO 2024, calculan la pobreza con los factores de expansión y producen gráficos y un mapa departamental.

Documenté un conflicto entre `factor07 × mieperho` y `facpob07` y lo resolví. Una validación detiene la ejecución si alguna cifra se aleja más de 0.1 puntos de la oficial.

## Resultados

- Pobreza nacional: 27.58 %, frente al 27.6 % que publica el INEI.
- Pobreza extrema: 5.50 %.
- Pobreza urbana: 24.81 %. Pobreza rural: 39.30 %.
