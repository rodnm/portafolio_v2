---
title: A leakage-free credit risk model
question: Can we predict which credit card client will default next month, with validation free of data leakage?
result:
  value: "AUC 0.774"
  label: on test data (Gini 0.548 · KS 0.421)
metrics:
  - { value: "30,000", label: "clients, 22.12% in default" }
  - { value: "0.864 → 0.780", label: validation AUC after fixing the data leakage }
  - { value: "9", label: features built from payment history and credit usage }
stack: [Python, scikit-learn, imbalanced-learn, XGBoost, LightGBM, SHAP]
cover: ../../../assets/generated/projects/riesgo-crediticio.png
coverAlt: Test-set ROC curves of four models; Random Forest reaches an AUC of 0.7738.
year: 2026
order: 2
context: Independent project
categories: [riesgo, ia]
links:
  - { kind: repo, url: "https://github.com/rodnm/credit-risk-project" }
  - {
      kind: report,
      url: "https://github.com/rodnm/credit-risk-project/blob/HEAD/reports/credit_risk_report.html",
    }
---

## Data and method

I used the UCI dataset of 30,000 credit card clients. I built 9 features from payment history and credit usage, and compared logistic regression, Random Forest, XGBoost and LightGBM.

All preprocessing happens **inside each fold** of a stratified cross-validation: imputation, winsorization, scaling and SMOTE balancing. The threshold was chosen with out-of-fold F1.

## Results

- Random Forest reached a validation AUC of 0.7798 ± 0.0065 and 0.7738 on test data.
- Scoring metrics: Gini 0.5476, KS 0.4208 and F1 0.5366.
- SHAP shows payment-delay history as the main driver of the predictions.

## What I fixed

A first version scored an AUC of 0.8636 because balancing ran before the folds were split. Moving it inside the folds brought the AUC down to 0.7798, the honest number.
