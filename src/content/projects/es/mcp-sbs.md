---
title: Un servidor MCP con las cifras oficiales de la SBS
question: ¿Puede un modelo de lenguaje responder con cifras oficiales de la SBS y citar el Excel de donde salen?
result:
  value: "10 / 10"
  label: respuestas correctas con el servidor MCP
metrics:
  - { value: "0 / 10", label: respuestas correctas solo con memoria }
  - { value: "2 / 10", label: respuestas correctas con búsqueda web }
stack: [Python, MCP, Pytest, Excel, Evaluación de LLMs]
cover: ../../../assets/generated/projects/mcp-sbs.png
coverAlt: Gráfico de barras con los aciertos de Claude Haiku en 10 preguntas sobre la SBS, según la fuente de información.
year: 2026
order: 4
context: Proyecto independiente
categories: [riesgo, ia, datos]
links:
  - { kind: repo, url: "https://github.com/rodnm/mcp-sbs-peru" }
  - { kind: report, url: "https://github.com/rodnm/mcp-sbs-peru/blob/HEAD/informe.md" }
---

## Datos y método

Escribí un servidor MCP en Python que lee los boletines en Excel de la SBS: morosidad y solvencia de bancos y microfinancieras, comisiones y rentabilidad de las AFP, y rankings de aseguradoras. Cada respuesta cita la hoja y el archivo de origen.

Lo probé con Pytest, tanto offline como contra los archivos en vivo. También armé un arnés de evaluación (`evaluar.py`) con 10 preguntas de banca, AFP y seguros.

## Resultados

Claude Haiku acertó 0 de 10 de memoria, 2 de 10 con búsqueda web y **10 de 10** con el servidor MCP.

## Por qué importa

Cuando el dato regulatorio tiene que ser exacto, conectar el modelo a la fuente oficial importa más que el tamaño del modelo.
