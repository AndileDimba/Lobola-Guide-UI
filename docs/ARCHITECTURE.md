# Architecture

Orientation for someone landing in this repository for the first time. Read
[ROADMAP.md](ROADMAP.md) for direction and
[CONTENT_GUIDE.md](CONTENT_GUIDE.md) for how to write content;
this document covers how the code fits together.

## Stack

React 19 + TypeScript, Vite, Tailwind CSS 3, React Router 7, deployed on Vercel
(`vercel.json` rewrites all routes to `index.html` for client-side routing).
Three runtime dependencies — react, react-dom, react-router-dom. Keep it that
way unless there is a strong reason.

## The one idea that shapes everything

**Components are nation-agnostic; the culture lives in data.**

A `StepCard` knows nothing about Zulu practice. It receives a `Step` and a
`Theme` and renders what it is given. That is why there is no
`components/zulu/...` directory and why adding Xhosa later should be a new data
file plus a nation entry, not a fork of the components.

```
src/data/zulu.ts  ──(NationData)──▶  pages/ZuluGuidePage  ──▶  UI components
     content                            composition            presentation
```

If you find yourself writing `if (nation === "zulu")` inside a component,
something belongs in data instead.

## Layout

```text
src/
├── main.tsx                    React entry point
├── App.tsx                     Routes + shared layout (Header, Footer, ScrollToTop)
├── index.css / App.css         Tailwind entry + a little global CSS
├── pages/
│   ├── LandingPage.tsx         The hub: what lobola is / is not, nation grid, FAQ teaser
│   ├── ZuluGuidePage.tsx       The Zulu journey: stages, progress, localStorage
│   ├── FAQPage.tsx             FAQ content + category filtering
│   └── NotFoundPage.tsx
├── components/
│   ├── Layout/                 Header, Navigation (responsive), Footer, ScrollToTop
│   ├── UI/
│   │   ├── StepCard.tsx        A stage: expand/collapse, completion, renders SceneView
│   │   └── SceneView.tsx       A stage as a story: media, narration, voice, roles, beats
│   └── Icons/
└── data/
    ├── types.ts                The content contract — read this first
    └── zulu.ts                 All Zulu content (theme + stages + scenes)
```

Routes (in `App.tsx`): `/` landing, `/guide/zulu` the guide, `/faq`, `*` not
found.

## The content model

Defined in [`src/data/types.ts`](../src/data/types.ts). Roughly:

```
NationData
├── id, nationName
├── theme: Theme            Tailwind class strings — the nation's "skin"
└── steps: Step[]
     ├── id, title, zuluTitle?, description, details[]
     └── scene?             The optional story layer
          ├── narration     English narration (required within a scene)
          ├── voice?        Phrase: isiZulu spoken line + English gloss + note
          ├── roles?        Role[]: isiZulu term + English gloss
          ├── beats?        Bilingual[]: en (+ optional zu) per beat
          ├── media?        kind, src?, alt, caption? — src may be empty
          └── variesNote?   The humble "families and regions differ" line
```

Two properties of this model are deliberate and worth protecting:

1. **`scene` is optional, and so is nearly everything inside it.** A stage
   renders as a scene when it has one and falls back to its `details` list when
   it does not, so the seven Zulu stages can be upgraded to full scenes one at a
   time rather than in one enormous PR. New content fields should always be
   added as optional.

2. **`theme` is class strings, not colour values.** A component writing
   `text-yellow-600` directly cannot be re-skinned; one using `theme.accent`
   can. `iconColor` is the one raw hex value, because it feeds SVG props rather
   than a class attribute.

## Presentation: card versus scene

`StepCard` is the frame — number, title, expand/collapse, the completion
control. When the step carries a `scene`, the card hands off to `SceneView`,
which renders the story: media (or a captioned placeholder while `src` is
empty), the English narration, the isiZulu voice in full with its gloss, who is
present, then the beats.

Anything about *how a story looks* belongs in `SceneView`. Anything about *what
the story is* belongs in `zulu.ts`.

## State

There is no state library and none is needed yet.

- The active stage and completion set live in `ZuluGuidePage` component state.
- Completion is persisted to `localStorage`, so progress survives a refresh
  until the reset control clears it.
- No backend, no API, no analytics. Everything ships as static assets.

## Styling

Tailwind utility classes in the markup; `tailwind.config.js` scans
`./index.html` and `./src/**/*.{js,ts,jsx,tsx}`. Phone first — a large part of
the audience is on a cheap phone on mobile data, so check work at around 360px
wide, lazy-load media, and be sceptical of new dependencies.

If your editor flags `Unknown at rule @tailwind`, install the Tailwind CSS
IntelliSense extension.

## Build and CI

```bash
npm run dev       # Vite dev server, http://localhost:5173
npm run lint      # ESLint (flat config in eslint.config.js)
npm run build     # tsc -b && vite build
npm run preview   # serve the production build
```

[`.github/workflows/workflow.yml`](../.github/workflows/workflow.yml) runs lint
and build on every pull request and every push to `main`, on Node 20. Because
content is typed TypeScript, a malformed content edit fails the build — that is
intentional.

## Adding a new nation, when the time comes

Not yet — the roadmap holds new nations until the Zulu experience is something
people share (depth before breadth). When it happens, the shape is:

1. A new `src/data/<nation>.ts` exporting a `NationData` with its own theme.
2. A route, and the nation's card on the landing page switched from "Coming
   Soon" to live.
3. No new components. If a component change is genuinely needed, it should be a
   new generic capability in `types.ts` plus `SceneView`, not a nation branch.
