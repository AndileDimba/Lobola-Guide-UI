# Lobola Hub

[![CI](https://github.com/AndileDimba/Lobola-Guide-UI/actions/workflows/workflow.yml/badge.svg)](https://github.com/AndileDimba/Lobola-Guide-UI/actions/workflows/workflow.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Code: MIT](https://img.shields.io/badge/code-MIT-blue)](LICENSE)
[![Content: CC BY-SA 4.0](https://img.shields.io/badge/content-CC%20BY--SA%204.0-lightgrey)](LICENSE-CONTENT.md)

A free, respectful place to learn about **lobola / ilobolo** — starting with the
Zulu (AmaZulu) journey, told as a story you can watch rather than a manual you
read.

The site teaches the general shape of the journey: the stages, the roles, the
words. It is **a learning place, not an authority** — practices differ between
families and regions, and it says so.

- **English is the face, isiZulu is the heart.** English carries the meaning so
  anyone can enter; isiZulu carries the soul so nothing sacred is flattened.
- **Depth before breadth.** One nation done with soul beats four done as stubs.
- **Phone first.** Fast and shareable on a cheap phone on mobile data.

## Table of Contents

- [Contributing](#contributing)
- [Documentation](#documentation)
- [What is here today](#what-is-here-today)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Architecture in one idea](#architecture-in-one-idea)
- [Branching and workflow](#branching-and-workflow)
- [Roadmap](#roadmap)
- [Disclaimer](#disclaimer)
- [License](#license)

## Contributing

Contributions are open and very welcome — both code and content.

```bash
git clone https://github.com/AndileDimba/Lobola-Guide-UI.git
cd Lobola-Guide-UI
npm install
npm run dev
```

Then read **[CONTRIBUTING.md](CONTRIBUTING.md)**. It covers setup, conventions,
where to start, and the one thing that is different about this project: **code
gets a normal review, content is always signed off by its cultural owner.** If
you are contributing content — isiZulu wording, izithakazelo, the meaning of a
stage — read **[docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)** first.

Corrections are welcome too, including to content already on the site. Open a
[content correction issue](../../issues/new?template=content_correction.yml) and
say what you know.

## Documentation

| Document | What it is for |
| --- | --- |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Setup, conventions, workflow, where to start |
| [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) | How to write content: the language principle, the humble framing rule, a worked example |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the code fits together and why |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Vision, guiding principles, phased roadmap, decisions log |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | How we treat each other, and the subject |

## What is here today

- **Landing / hub** — what lobola is and is not, why it matters, quick facts,
  "Explore by Nation" (Zulu live; Xhosa, Sotho, Tswana coming), FAQ teaser
- **Zulu guide** — seven stages with progress tracking saved to `localStorage`,
  expand/collapse cards, and an optional "scene" layer that renders a stage as a
  story: narration, the isiZulu voice, the people present, the beats
- **FAQ** — substantial answers with category filtering
- **Responsive navigation** with a hamburger menu on small screens

The honest gap: most stages are still text-only. Turning them into scenes is
[Phase 1](docs/ROADMAP.md) and the best place to help.

## Tech Stack

React 19, TypeScript, Tailwind CSS 3, React Router 7, Vite. Deployed on Vercel.
Three runtime dependencies, on purpose.

## Getting Started

### Prerequisites

- **Node.js 20+** (the version in [.nvmrc](.nvmrc); CI runs 20)
- npm

### Install and run

```bash
npm install
npm run dev          # http://localhost:5173
```

### Checks and build

```bash
npm run lint         # ESLint — CI runs this
npm run build        # tsc -b && vite build — CI runs this
npm run preview      # serve the production build
```

Tailwind scans `./index.html` and `./src/**/*.{js,ts,jsx,tsx}` (see
`tailwind.config.js`). If your editor flags `Unknown at rule @tailwind`, install
the Tailwind CSS IntelliSense extension.

## Folder Structure

```text
src/
├── main.tsx                # React entry point
├── App.tsx                 # Routes + shared layout
├── pages/                  # LandingPage, ZuluGuidePage, FAQPage, NotFoundPage
├── components/
│   ├── Layout/             # Header, Navigation, Footer, ScrollToTop
│   ├── UI/                 # StepCard (the frame), SceneView (the story)
│   └── Icons/
├── data/
│   ├── types.ts            # The content contract — read this first
│   └── zulu.ts             # All Zulu content (theme + stages + scenes)
└── index.css               # Tailwind entry
docs/                       # Roadmap, architecture, content guide
```

## Architecture in one idea

**Components are nation-agnostic; the culture lives in data.** A `StepCard`
knows nothing about Zulu practice — it receives a `Step` and a `Theme` and
renders what it is given. That is why there is no `components/zulu/StepCard.tsx`
and why adding Xhosa later should be a data file, not a component fork.

Content shape is defined once in [`src/data/types.ts`](src/data/types.ts), and
nearly every content field is optional — so a stage can be upgraded from a
checklist into a full scene on its own, without touching the other six.

Full detail, including the content model and how a scene renders, is in
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Branching and workflow

`main` stays deployable. Work happens on a branch and lands through a pull
request that passes lint and build.

- `feature/<short-name>`, `fix/<short-name>`, `content/<stage-or-topic>`,
  `docs/<short-name>`

Details in [CONTRIBUTING.md](CONTRIBUTING.md#how-we-work).

## Roadmap

Direction, principles and open questions live in
**[docs/ROADMAP.md](docs/ROADMAP.md)**. The short version:

1. **Phase 1** — turn the Zulu guide into a story: visual, bilingual, scene-based
2. **Phase 2** — glossary and the language layer (inline term tooltips)
3. **Phase 3** — media pipeline (illustration style, phone-friendly media)
4. **Phase 4** — regional variation, only if it can stay trustworthy
5. **Phase 5** — other nations, only once Zulu is share-worthy

Cross-cutting and unclaimed: accessibility, SEO and share cards, a real
"suggest a correction" submission, privacy-respecting analytics, tests.

## Disclaimer

This site is an informational guide. It does not replace the guidance of elders
and family, and it does not rule on what any family must do. Practices vary
between families and regions.

## License

- **Code** — [MIT](LICENSE)
- **Content** (the narratives, izithakazelo, glosses, glossary, FAQ, docs) —
  [CC BY-SA 4.0](LICENSE-CONTENT.md), so it stays free to translate and teach
  from, and stays open for the next person

Working name: Lobola Hub. The name can change without changing the architecture.
