# Contributing to Lobola Hub

Thank you for being here. This project explains the lobola/ilobolo journey as a
free, respectful learning place — starting with the Zulu journey, told as a story
you can watch rather than a manual you read.

Two kinds of help are welcome, and they work differently:

|  | What it is | Review |
| --- | --- | --- |
| **Code** | Components, accessibility, performance, SEO, tests, tooling | Normal PR review |
| **Content** | isiZulu wording, izithakazelo, stage meaning, glossary, FAQ | Always signed off by the cultural owner ([@AndileDimba](https://github.com/AndileDimba)) |

Content is not gate-kept to be difficult. It is gate-kept because getting a
family's or a language's meaning wrong in public does real harm, and because this
project promises to teach humbly rather than to rule. If you are contributing
content, read **[docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)** first — it is
short, and it is the part that matters most.

- [Quick start](#quick-start)
- [Where to start](#where-to-start)
- [How we work](#how-we-work)
- [Code conventions](#code-conventions)
- [Adding or editing content](#adding-or-editing-content)
- [Before you open a PR](#before-you-open-a-pr)
- [Licensing your contribution](#licensing-your-contribution)

## Quick start

Prerequisites: **Node 20+** (the version in [.nvmrc](.nvmrc); CI runs 20) and npm.

```bash
git clone https://github.com/AndileDimba/Lobola-Guide-UI.git
cd Lobola-Guide-UI
npm install
npm run dev          # http://localhost:5173
```

Other scripts:

```bash
npm run lint         # ESLint — must pass, CI runs it
npm run build        # tsc -b + vite build — must pass, CI runs it
npm run preview      # serve the production build locally
```

If `npm run lint` and `npm run build` both pass locally, CI will almost certainly
pass too. There is no test suite yet — adding one is a genuinely useful
contribution (see below).

## Where to start

Read **[docs/ROADMAP.md](docs/ROADMAP.md)** first. It is the source of truth for
direction, and it explains *why* the project is shaped the way it is. Then read
**[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** for how the code is laid out.

Good places for a first contribution — all real gaps, not busywork:

**Code**

- Accessibility pass: colour contrast, keyboard navigation, focus states, screen
  reader labels (Roadmap: Cross-cutting)
- SEO and social share cards — adoption depends on this (Roadmap: Cross-cutting)
- Make the "Suggest a question / correction" action actually submit instead of
  calling `alert()` (Roadmap: Cross-cutting)
- Set up a test runner (Vitest + React Testing Library) and test one component
- A reusable bilingual text component, so the English/isiZulu pattern is not
  re-implemented per page (Roadmap: Phase 2)
- Glossary term tooltips (Roadmap: Phase 2)

**Content**

- Upgrade a stage in `src/data/zulu.ts` from `details` to a full `scene`
  (see [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md))
- Glossary entries for terms already used on the site
- English glosses for isiZulu text that currently has none
- FAQ answers for questions people actually ask

**Design and media**

- An illustration style for scenes that cannot be photographed respectfully
  (Roadmap: Phase 3)

If an idea is bigger than an afternoon, **open an issue before building it** so
we can agree on the shape first. Nobody enjoys having a large PR turned down on
direction.

## How we work

`main` stays deployable — it is what Vercel serves. All work happens on a branch
and lands through a pull request.

```bash
git switch -c feature/glossary-tooltips
# ... work ...
git push -u origin feature/glossary-tooltips
```

Branch naming, following what is already in the history:

- `feature/<short-name>` — new capability
- `fix/<short-name>` — bug fix
- `content/<stage-or-topic>` — content additions or corrections
- `docs/<short-name>` — documentation only

Commit messages: present tense, describing what the change does — for example
`Add glossary tooltips to guide stages`. Reference an issue when there is one
(`Fixes #12`). Small, readable commits beat one large squashed dump.

Every PR runs [CI](.github/workflows/workflow.yml) (lint + build) and needs one
approving review. Content changes additionally need the cultural owner's
approval, which [CODEOWNERS](.github/CODEOWNERS) requests automatically.

## Code conventions

The architecture has one central idea: **UI components are nation-agnostic; the
culture lives in data.** Keep it that way.

- **No nation-specific components.** There is no `components/zulu/StepCard.tsx`
  and there should never be. Components receive `NationData`, `Step`, `Scene` and
  `Theme` and render whatever they are given, so adding Xhosa later is a data
  file, not a component fork.
- **Types first.** Content shape is defined in
  [src/data/types.ts](src/data/types.ts). If content needs a new field, add it to
  the type (optional, so existing stages keep compiling), then use it.
- **Optional, progressive fields.** `scene`, `voice`, `media` and friends are all
  optional on purpose: a stage can be upgraded to a full scene on its own,
  without touching the other six. Preserve that — never make a content field
  required.
- **Theme classes, not hardcoded colours.** Use the `theme` object
  (`theme.accent`, `theme.border`, `theme.button`) rather than writing
  `text-yellow-600` inside a component, so a future nation can re-skin without a
  rewrite.
- **TypeScript, no `any`.** Type-only imports use `import type { ... }`, matching
  the existing files.
- **Tailwind for styling**, utility classes in the markup. No new CSS files
  unless there is a real reason.
- **Phone first.** Much of the audience is on a cheap phone on mobile data. Check
  your work at 360px wide, lazy-load media, and do not add heavy dependencies
  casually — the runtime dependency list is three packages, and that is a
  feature.
- **Comments explain why, not what.** Match the density already in the codebase.

## Adding or editing content

Read [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) — it covers the language
principle (English is the face, isiZulu is the heart), the humble framing rule,
what must never be published, and a worked example of adding a scene.

The short version:

1. Content lives in `src/data/zulu.ts`, typed by `src/data/types.ts`.
2. English carries the meaning; isiZulu carries the soul. Never leave isiZulu
   without an English gloss, and never flatten a term that has no real English
   equivalent — keep it in isiZulu and gloss it.
3. Write "commonly, this is how it goes; families and regions differ." Never
   present one family's or one village's practice as the way it is done, and
   never name a real family or community.
4. Say where your knowledge comes from in the PR description — your own family's
   experience, an elder you asked, a published source. If you are uncertain about
   something, say so in the PR rather than smoothing it over.

Corrections are welcome, including to content the maintainer wrote. If something
on the site is wrong, open a
[content correction issue](../../issues/new?template=content_correction.yml) and
say what you know.

## Before you open a PR

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Checked at a phone width (around 360px) as well as desktop
- [ ] No hardcoded colours where a `theme` value exists
- [ ] New content fields are optional in `types.ts`
- [ ] Content changes follow [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) and
      state their source
- [ ] The PR description explains the *why*, and links its issue if there is one

## Licensing your contribution

Code contributions are licensed under [MIT](LICENSE). Content contributions are
licensed under [CC BY-SA 4.0](LICENSE-CONTENT.md). By opening a pull request you
agree to license your contribution on those terms, and confirm it is yours to
give.

## Conduct

By taking part you agree to the [Code of Conduct](CODE_OF_CONDUCT.md). In short:
this project touches people's families and heritage — discuss it the way you
would in someone's home.
