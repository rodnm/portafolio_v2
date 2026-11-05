---
title: Mining's footprint in Peru, 2013–2025
question: Where did satellite-visible mining appear in Peru, and how much did it grow by district between 2013 and 2025?
result:
  value: "727 → 1,985 km²"
  label: visible mining area, ×2.7 in twelve years
metrics:
  - { value: "63%", label: of the increase happens in Madre de Dios }
  - { value: "−2.95 pp", label: "poverty in mining districts (95% CI: −5.27 to −0.62)" }
  - { value: "7.06 pp", label: mean error of the small-area model (baseline 8.40) }
stack: [Python, MapBiomas, NASA Black Marble, Fay-Herriot, Fixed effects, Stata, Streamlit]
cover: ../../../assets/generated/projects/huella-minera.png
coverAlt: Interactive atlas with a map of Peru and the visible mining area by district in 2025.
year: 2026
order: 1
context: Final project · Intermediate Python, PUCP
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

## Data and method

I averaged MapBiomas land-cover classes (30 m) onto a 500 m grid and checked them against Amazon Mining Watch. I then crossed that footprint with NASA Black Marble night lights and INEI poverty maps.

For district poverty I estimated a **Fay-Herriot** small-area model from the ENAHO household survey (Prasad-Rao and REML). Then I ran a regression with **department fixed effects** and clustered errors, using a **placebo** group of mines that open after 2018. I replicated the estimate in Stata.

## Results

- Visible mining area grew from 727 to 1,985 km², a 2.7-fold increase.
- Madre de Dios accounts for 63% of the increase, and 10 districts for 73%.
- Mining districts have 2.95 points less poverty (95% CI: −5.27 to −0.62).
- The small-area model lowers the mean error to 7.06 pp, against 8.40 pp for the baseline.

## Limits

Opening a mine is associated with −0.71 pp of poverty, but the interval (−4.72 to +3.30) includes zero. The placebo gives −2.68 pp. So **I don't claim a causal effect**: the gap seems to come from where mines settle, not from what they cause.
