---
title: Índice de Vulnerabilidad Hídrica de Lima Metropolitana
question: ¿Qué distritos de Lima Metropolitana son más vulnerables en el acceso al agua, y el patrón es aleatorio?
result:
  value: "I de Moran = 0.266"
  label: "autocorrelación espacial significativa (p = 0.002)"
metrics:
  - { value: "43", label: distritos de Lima Metropolitana }
  - { value: "> 0.95", label: correlación de Spearman entre esquemas de ponderación }
stack: [Python, PostGIS, GeoPandas, QGIS, esda / libpysal, OSMnx, Docker]
cover: ../../../assets/generated/projects/agua-lima.png
coverAlt: Mapa de Lima Metropolitana con el índice de vulnerabilidad hídrica por distrito y los clústeres LISA.
year: 2026
order: 5
context: Proyecto independiente
categories: [geoespacial, econometria, politica]
links:
  - { kind: repo, url: "https://github.com/rodnm/lima-water-access" }
---

## Datos y método

Construí un índice para los 43 distritos con microdatos del Censo 2017 del INEI y datos geográficos de GADM y OpenStreetMap, procesados en PostGIS dentro de Docker. Los mapas se generan por script en QGIS.

## Resultados

- El riesgo se concentra en un corredor continuo del norte y el este, encabezado por San Juan de Lurigancho, Villa María del Triunfo y Puente Piedra.
- Miraflores, San Isidro y San Borja forman un clúster de cobertura casi universal.
- El I de Moran (0.266, p = 0.002) y los clústeres LISA confirman que el patrón no es aleatorio, lo que permite señalar zonas prioritarias de intervención.

## Robustez

El ranking se mantiene estable bajo distintos esquemas de ponderación: la correlación de Spearman entre ellos supera 0.95.
