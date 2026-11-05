---
title: Three skills that clean the ENAHO 2024 survey
question: Can an agent clean Peru's ENAHO household survey and replicate the official INEI poverty rate?
result:
  value: "27.58%"
  label: estimated monetary poverty, against the official 27.6%
metrics:
  - { value: "5.50%", label: extreme poverty }
  - { value: "24.81% · 39.30%", label: urban and rural poverty }
  - { value: "0.1 pt", label: maximum tolerance before the run stops }
stack: [Python, ENAHO, Survey weights, Claude Code skills, GeoPandas]
cover: ../../../assets/generated/projects/enaho-pobreza.png
coverAlt: Map of Peru with monetary poverty by department in 2024.
year: 2026
order: 6
context: Q-LAB PUCP Diploma · session 16
categories: [econometria, politica, ia]
links:
  - { kind: repo, url: "https://github.com/rodnm/enaho-skills" }
  - { kind: report, url: "https://github.com/rodnm/enaho-skills/blob/HEAD/evaluacion.md" }
---

## Data and method

I wrote three Claude Code skills that clean the ENAHO 2024 microdata, compute poverty with the survey expansion factors, and produce charts and a department map.

I documented a conflict between `factor07 × mieperho` and `facpob07` and resolved it. A validation step stops the run if any figure is more than 0.1 points away from the official one.

## Results

- National poverty: 27.58%, against the 27.6% published by INEI.
- Extreme poverty: 5.50%.
- Urban poverty: 24.81%. Rural poverty: 39.30%.
