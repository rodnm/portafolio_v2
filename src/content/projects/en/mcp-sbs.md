---
title: An MCP server with official SBS figures
question: Can a language model answer with official figures from Peru's banking regulator (SBS) and cite the source spreadsheet?
result:
  value: "10 / 10"
  label: correct answers with the MCP server
metrics:
  - { value: "0 / 10", label: correct answers from memory alone }
  - { value: "2 / 10", label: correct answers with web search }
stack: [Python, MCP, Pytest, Excel, LLM evaluation]
cover: ../../../assets/generated/projects/mcp-sbs.png
coverAlt: Bar chart of Claude Haiku's correct answers to 10 SBS questions, by information source.
year: 2026
order: 4
context: Independent project
categories: [riesgo, ia, datos]
links:
  - { kind: repo, url: "https://github.com/rodnm/mcp-sbs-peru" }
  - { kind: report, url: "https://github.com/rodnm/mcp-sbs-peru/blob/HEAD/informe.md" }
---

## Data and method

I wrote a Python MCP server that reads the SBS Excel bulletins: delinquency and solvency of banks and microfinance institutions, pension-fund (AFP) fees and returns, and insurer rankings. Every answer cites its source file and sheet.

It is tested with Pytest, both offline and against the live files. I also built an evaluation harness (`evaluar.py`) with 10 banking, pension and insurance questions.

## Results

Claude Haiku got 0 of 10 right from memory, 2 of 10 with web search and **10 of 10** with the MCP server.

## Why it matters

When a regulatory figure has to be exact, connecting the model to the official source matters more than the model's size.
