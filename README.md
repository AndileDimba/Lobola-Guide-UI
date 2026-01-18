# Lobolo Guide (MVP — Zulu Nation)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A TypeScript + React + Tailwind web app that guides users through the **Zulu (AmaZulu) lobolo process** in a clear, step-by-step journey.

This repository is intentionally built as an **MVP** with:

- **One consistent layout**
- **Zulu-only content**
- A foundation that is easy to expand later to other South African nations (multi-nation content + different skins/themes)

## Table of Contents

- [Why this exists](#why-this-exists)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Key Architecture Decisions](#key-architecture-decisions)
- [Getting Started](#getting-started)
- [Tailwind Notes](#tailwind-notes)
- [Branching / Workflow](#branching--workflow)
- [Roadmap](#roadmap-planned)
- [Naming](#naming)
- [Disclaimer](#disclaimer)
- [Contributing](#contributing)
- [License](#license)

## Why this exists

The lobolo process has multiple stages, roles, and expectations that can be difficult to understand—especially for people going through it for the first time. This app aims to present the process from start to end in a way that is structured, respectful, and easy to navigate.

## Features

- **Step-by-Step Guide**: Data-driven journey through Zulu lobolo steps
- **Interactive Cards**: Expand/collapse step cards for detailed information
- **Theming Support**: Zulu theme with consistent layout
- **Scalable Architecture**: Easy to add support for other South African nations
- **TypeScript-First**: Type-safe development with shared interfaces

## Tech Stack

- **React** (Vite)
- **TypeScript**
- **Tailwind CSS** (v3.x)

## Folder Structure

```text
src/
├── assets/                 # Static assets (future: patterns, images, icons)
├── components/             # Reusable UI components (nation-agnostic)
│   ├── Layout/             # Page-level layout components (Header/Footer later)
│   └── UI/                 # Smaller reusable pieces (StepCard, selectors later)
├── data/                   # Nation content + theme definitions
│   ├── types.ts            # TypeScript types/interfaces for content & theme
│   └── zulu.ts             # Zulu nation data (theme + steps)
├── App.tsx                 # App composition + state for active step
└── main.tsx                # React entry point
```

## Key Architecture Decisions

### 1) Data-driven UI (no duplicated components per nation)

UI components like StepCard do not contain nation-specific logic. They render whatever is passed in via NationData.

This prevents duplication like:

- components/zulu/StepCard.tsx
- components/xhosa/StepCard.tsx

Instead, we keep:

- Reusable components in src/components/
- Nation-specific content + theme in src/data/

### 2) Theming ("skin") changes without layout changes

For the MVP, the layout remains consistent across nations, but the "feel" can change using a theme object:

- colors
- icons (future)
- patterns / backgrounds (future)

### 3) TypeScript-first

All nation data follows shared interfaces (NationData, Step, Theme) so adding new content later is safe and predictable.

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install & Run

```bash
npm install
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

## Tailwind Notes

Tailwind must have the correct content configuration in tailwind.config.js:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

If your editor shows Unknown at rule @tailwind, install the Tailwind CSS IntelliSense extension.

## Branching / Workflow

To keep main stable, development work should happen on feature branches:

Examples:

- feature/progress-tracking
- feature/nation-selector
- feature/glossary

Suggested workflow:

1. Create branch from main
2. Implement feature
3. Open PR back into main

## Roadmap (Planned)

- [ ] Multi-nation support (Zulu first, then others)
- [ ] Nation selector + theme switching
- [ ] Progress tracking (localStorage first)
- [ ] Glossary of terms (searchable)
- [ ] Document templates (e.g. letter / incwadi starter)
- [ ] Patterns/backgrounds per nation

## Naming

Working name: Lobolo Guide. The name can change later without changing the architecture.

## Disclaimer

This app is an informational guide and does not replace guidance from elders/family. Practices may vary between families and regions.

## Contributing

For now, this is a personal project. Contributions may be enabled later once the MVP is stable.

## License

TBD
