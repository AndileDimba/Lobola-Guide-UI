# Architecture

Orientation for someone landing in this repository for the first time. Read
[ROADMAP.md](ROADMAP.md) for direction and
[CONTENT_GUIDE.md](CONTENT_GUIDE.md) for how to write content;
this document covers how the code fits together.

## Stack

React 19 + TypeScript, Vite, Tailwind CSS 3, React Router 7, deployed on Vercel.
Every page is written out as its own HTML file at build time (see "Search
engines and link previews"), and `vercel.json` turns on `cleanUrls`, so `/faq`
is served from `faq.html`. Any other address gets `404.html` with a 404 status.
Three runtime dependencies — react, react-dom, react-router-dom. Keep it that
way unless there is a strong reason.

## The one idea that shapes everything

**Components are nation-agnostic; the culture lives in data.**

A `StageChapter` knows nothing about Zulu practice. It receives a `Step` and a
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
├── main.tsx                    Browser entry: takes over the prebuilt page (or draws it in dev)
├── entry-server.tsx            Build-time entry: draws one page to HTML
├── site.ts                     The site's address (SITE_URL): the one place the domain is written
├── seo.ts                      Each page's title, description, canonical address, JSON-LD
├── App.tsx                     Routes + shared layout (Header, Footer, ScrollToTop)
├── index.css                   Tailwind entry + a little global CSS
├── pages/
│   ├── LandingPage.tsx         The hub: what lobola is / is not, nation grid, FAQ teaser
│   ├── ZuluGuidePage.tsx       The Zulu journey: picks the stage from the URL
│   ├── CattlePage.tsx          The eleven cattle: cards that turn, filter, quiz
│   ├── FAQPage.tsx             FAQ content + category filtering
│   └── NotFoundPage.tsx
├── components/
│   ├── Layout/                 Header, Navigation (responsive), Footer, ScrollToTop,
│   │                           PageHead (keeps the head current), UpdatePrompt
│   ├── UI/
│   │   ├── StageChapter.tsx    A stage as a chapter: titles, lede, scene slot, Previous/Next
│   │   ├── SceneFigure.tsx     The scene slot: media, or a placeholder of the same size
│   │   ├── SceneView.tsx       A stage as a story: roles, voice, beats, the varies note
│   │   ├── Journey.tsx         The journey line (wide screens) and progress bar (phones)
│   │   └── BeadBand.tsx        The thin beadwork band, coloured by theme.beads
│   └── Icons/
└── data/
    ├── types.ts                The content contract — read this first
    ├── zulu.ts                 All Zulu content (theme + stages + scenes)
    ├── cattle.ts               The eleven named cattle and the quiz on their page
    └── faq.ts                  FAQ questions and answers
scripts/
└── prerender.ts                Vite plugin: writes every page, 404.html and sitemap.xml
```

Routes (in `App.tsx`): `/` landing, `/guide/zulu` the guide (first stage),
`/guide/zulu/cattle` the eleven cattle,
`/guide/zulu/:stageId` one stage by its `id`, `/letter` the letter builder,
`/faq`, `*` not found.

## The content model

Defined in [`src/data/types.ts`](../src/data/types.ts). Roughly:

```
NationData
├── id, nationName
├── theme: Theme            Tailwind class strings — the nation's "skin"
└── steps: Step[]
     ├── id, title, zuluTitle?, summary?, description
     ├── seo?               Title and description for search results and link previews
     ├── details: Bilingual[]  What happens: en, with the isiZulu beneath
     ├── media?             A picture for the scene slot before the stage has a scene
     ├── tool?              A link to a page that helps do this stage (to, label, description)
     ├── passages?          Short titled passages after what happens (title, Bilingual paragraphs)
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

## Presentation: chapter and scene

The guide reads like a printed book: one left-aligned column, the journey line
beside it on wide screens, and Previous and Next links at the foot of each
stage. `StageChapter` is the frame: the English title with the isiZulu name
beneath, then the lede (the scene's narration, or the English `summary`)
followed by the isiZulu `description`. Every stage has a scene slot
(`SceneFigure`), showing the media or a placeholder of the same size, so the
page keeps its shape as stages are upgraded. When the step carries a `scene`,
`SceneView` renders the rest of the story: who is present, what is said, then
the beats. Without one, the `details` list stands in.

On a phone the scene slot moves above the lede, and the journey folds into a
progress bar with an "All stages" list.

Anything about *how a story looks* belongs in `SceneView`. Anything about *what
the story is* belongs in `zulu.ts`.

## State

There is no state library and none is needed yet.

- The current stage lives in the URL, so a stage can be shared and the back
  button walks the journey.
- The letter builder keeps its form in `localStorage` (key
  `lobola-hub:letter`), so a half-finished letter is still there next time.
  Nothing typed into it is sent anywhere. Its wording lives in
  `src/data/letter.ts`; the page prints only the letter.
- No backend and no API. Everything ships as static assets.
- The site is a PWA. `vite-plugin-pwa` builds a service worker that saves
  every page, picture and icon on the first visit, so the site and the
  letter builder work offline (each page is its own file, found by adding
  `.html` to the address; any other address shows the not-found page), and an installed copy opens like an app (the
  manifest is `public/site.webmanifest`). A new deploy does not take over by
  itself: `UpdatePrompt` offers "A new version of Lobola Hub is ready" and
  reloads when the reader taps Refresh.
- Readers who saved the site on an old address (`lobola.dimba.co.za`, or
  `www.lobolahub.co.za`, briefly the main address) are moved across by
  `vercel.json`: on those hosts every path redirects (308) to the same path
  on `lobolahub.co.za`, except `/sw.js`. The service worker checks its own
  host first (`scripts/retire-other-hosts.ts` wraps the generated `sw.js`):
  anywhere but `lobolahub.co.za` and `localhost` it skips Workbox, clears
  the saved copy, unregisters itself and sends open tabs to the new address. Both hosts must be plain domains on the project in
  Vercel, not Vercel redirects, for this to run. Keep it until at least
  May 2027.
- Vercel Web Analytics counts page views (no cookies). The letter builder also
  sends a `Letter shared` event with only the method (`whatsapp`, `print`,
  `copy`) and the language; custom events are counted on Vercel Pro only.

## Search engines and link previews

Search engines and link previewers often do not run scripts, so each page is
drawn at build time with its own head:

- `npm run build` first builds `src/entry-server.tsx` into `dist-ssr/`, then
  builds the site. The `prerender` plugin in `scripts/prerender.ts` runs once
  the site is written: for every address in `PAGE_PATHS` (in `src/seo.ts`) it
  draws the page with `renderToString` and writes it to `dist/` (`/` is
  `index.html`, `/faq` is `faq.html`, a stage is `guide/zulu/<id>.html`). It
  also writes `404.html` and `sitemap.xml`, then deletes `dist-ssr/`. The
  service worker is made after this, so it keeps every page.
- `index.html` holds `<!--page-head-->` where each page's title, description,
  canonical address, link-preview tags and JSON-LD go. `pageHead` in
  `src/seo.ts` decides them: `Article` and `BreadcrumbList` on stages,
  `FAQPage` on the FAQ, `noindex` on the not-found page.
- In the browser, `main.tsx` hydrates the drawn page, and `PageHead` updates
  the head when the reader moves to another page inside the site.
- The build also writes `robots.txt`, pointing to the sitemap. Every
  address, there and in the head, comes from `SITE_URL` in `src/site.ts`. A new page needs adding to
  `PAGE_PATHS`; a new stage is picked up from the data, with its words in
  the stage's `seo` field.
- Code that runs while a page is drawn must not touch `window`,
  `localStorage` or `document`. Read them in an effect or an event handler,
  as the letter builder does with its saved answers, or the page drawn at
  build time will not match the one in the browser.

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
npm run build     # tsc -b, the build-time entry, then the site with every page drawn
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
