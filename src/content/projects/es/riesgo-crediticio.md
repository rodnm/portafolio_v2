---
title: Modelo de riesgo crediticio sin fuga de datos
question: ¿Se puede anticipar qué cliente de tarjeta de crédito dejará de pagar el próximo mes, validando sin fuga de datos?
result:
  value: "AUC 0.774"
  label: en datos de prueba (Gini 0.548 · KS 0.421)
metrics:
  - { value: "30,000", label: "clientes, 22.12 % en incumplimiento" }
  - { value: "0.864 → 0.780", label: AUC de validación tras corregir la fuga de datos }
  - { value: "9", label: variables construidas del historial de pagos y uso de crédito }
stack: [Python, scikit-learn, imbalanced-learn, XGBoost, LightGBM, SHAP]
cover: ../../../assets/generated/projects/riesgo-crediticio.png
coverAlt: Curvas ROC en datos de prueba de cuatro modelos; Random Forest alcanza un AUC de 0.7738.
year: 2026
order: 2
context: Proyecto independiente
categories: [riesgo, ia]
links:
  - { kind: repo, url: "https://github.com/rodnm/credit-risk-project" }
  - {
      kind: report,
      url: "https://github-html-preview.dohyeon5626.com/?https://github.com/rodnm/credit-risk-project/blob/HEAD/reports/credit_risk_report.html",
    }
---

## Datos y método

Trabajé con la base UCI de 30,000 clientes de tarjetas de crédito. Construí 9 variables a partir del historial de pagos y de la utilización de crédito, y comparé regresión logística, Random Forest, XGBoost y LightGBM.

Todo el preprocesamiento vive **dentro de cada fold** de la validación cruzada estratificada: imputación, winsorización, escalado y balanceo con SMOTE. Elegí el umbral con el F1 fuera de muestra.

## Resultados

- Random Forest obtuvo un AUC de validación de 0.7798 ± 0.0065 y de 0.7738 en prueba.
- En métricas de scoring: Gini 0.5476, KS 0.4208 y F1 0.5366.
- Con SHAP, el historial de atrasos en los pagos resultó el principal determinante de las predicciones.

## Lo que corregí

Una primera versión daba un AUC de 0.8636 porque el balanceo se aplicaba antes de separar los folds. Al moverlo adentro, el AUC bajó a 0.7798, que es la cifra honesta.
