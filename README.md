# LLM Genealogy

**Interactive visualization of Large Language Model (LLM) architectural evolution (2017-2025).**

Current live version: [https://abditimer.github.io/llm-genealogy/](https://abditimer.github.io/llm-genealogy/)

<!-- ![LLM Genealogy Screenshot](public/screenshot.png) -->

## Overview

This project provides a filterable, sortable reference for researchers and developers to compare the architectural choices of major LLMs. It tracks the evolution of:
- **Normalization**: LayerNorm vs RMSNorm
- **Positional Embeddings**: Sine, RoPE, ALiBi, etc.
- **Activations**: ReLU, GeLU, SwiGLU, etc.

## Features

- **Timeline View**: Models from 2017 (Transformer) to 2025 (Gemma 3).
- **Faceted Filtering**: Filter by year, normalization type, activation function, and more.
- **Deep Dive**: Interactive tooltips explaining technical concepts (e.g., "What is RoPE?").
- **Paper Links**: Direct access to arXiv papers for each model.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + ShadCN UI
- **Data**: TanStack Table
- **Deployment**: GitHub Pages

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
