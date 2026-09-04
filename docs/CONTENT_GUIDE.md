# Content guide

How to write for Lobola Hub. This is the most important document in the
repository — the code can be rewritten, but content that misrepresents someone's
family cannot be taken back once people have read it.

If you only remember two things, remember these:

> **English is the face, isiZulu is the heart.**
>
> **This is a learning place, not an authority.**

---

## 1. The language principle

English carries the meaning so anyone can enter. isiZulu carries the soul so
nothing sacred is flattened.

In practice:

- **Lead in English.** Narration, descriptions and beats are written so a reader
  with no isiZulu can follow the journey.
- **Keep untranslatable terms in isiZulu, inline, and gloss them.** Write
  *abakhongi* and explain who they are; do not reduce them to "the negotiating
  party" and lose the word. A term that has no real English equivalent stays in
  isiZulu.
- **Show spoken words in full isiZulu with English underneath.** Izithakazelo,
  the greeting called at the gate, what an uncle says when the gate opens — these
  live in the `voice` field, isiZulu prominent, English gloss beneath. Never
  paraphrase a spoken line into English only.
- **Never leave isiZulu without a gloss.** Every isiZulu string a reader sees
  should have English within reach. (Some existing content predates this rule and
  is isiZulu-only — adding the English is a welcome contribution.)
- **Do not machine-translate into isiZulu.** English to isiZulu via a translation
  tool produces text that reads wrong to a Zulu speaker and is worse than no
  isiZulu at all. If you do not speak it, contribute the English and mark the
  isiZulu as needed.

## 2. The humble framing rule

Every stage description should be readable as *"commonly, this is how it goes —
and families and regions differ."*

Write this:

> It is common to be kept waiting at the gate for a long time; a child may be
> sent to sit before it, and the negotiators offer a small gift to open the way.

Not this:

> The family keeps the negotiators waiting at the gate. A child is sent to block
> the gate and the negotiators must pay before it opens.

The difference is a claim about what is generally done versus a rule about what
is done. Useful hedges: *commonly*, *often*, *in many families*, *it is common
that*, *some families*. Use the `variesNote` field on a scene for the explicit
note where a stage varies a lot.

## 3. What must never be published

- **A named family's or a named community's practice.** Not "the Mkhize family
  does it this way", not "in KwaNongoma they require...". Regional and family
  specificity is explicitly out of scope
  (see [ROADMAP.md](ROADMAP.md), Phase 4) — it cannot be verified, it invites
  "that is not how we do it", and it exposes private family practice.
- **Anything presented as the correct or required way.** The site does not rule
  on what a family must do, and it never replaces elders.
- **Specific amounts of cattle or money as a standard.** Explain that the number
  is agreed between families and varies; do not publish a going rate.
- **Content you do not hold the rights to.** No pasting from books, other sites,
  academic papers or recordings. Written in your own words from your own
  knowledge, or from an elder you actually asked.
- **Anything an elder shared with you in confidence**, unless they know it is
  going on a public website and are comfortable with that.

## 4. Where content lives

| What | File |
| --- | --- |
| Zulu stages, scenes, phrases, roles | [`src/data/zulu.ts`](../src/data/zulu.ts) |
| The shape all content must fit | [`src/data/types.ts`](../src/data/types.ts) |
| FAQ questions and answers | [`src/pages/FAQPage.tsx`](../src/pages/FAQPage.tsx) |
| How a scene is rendered | [`src/components/UI/SceneView.tsx`](../src/components/UI/SceneView.tsx) |

## 5. Worked example: upgrading a stage into a scene

A stage starts life as text — a `description` and a list of `details`:

```ts
{
  id: "sending_of_the_letter",
  title: "Sending of the Letter",
  description: "...",
  details: ["...", "..."],
}
```

Adding an optional `scene` turns it into a story. The guide renders the scene
when present and falls back to the details list when it is absent, so stages can
be upgraded one at a time.

```ts
{
  id: "sending_of_the_letter",
  title: "Sending of the Letter",
  zuluTitle: "Incwadi",              // the isiZulu name of the stage
  description: "...",
  details: ["...", "..."],           // keep these — they are the fallback
  scene: {
    // English narration — the doorway into the scene. Present tense, told as
    // something you are watching happen. Hedged, not prescriptive.
    narration:
      "Before anyone travels, a letter goes from the groom's home to the " +
      "bride's. It does not ask for a bride; it asks for a day — permission " +
      "for the family to come and ask for kinship. Commonly it is carried by " +
      "women of the family rather than posted, and the answer, when it comes, " +
      "sets the date everything else is built around.",

    // The isiZulu voice of this moment: what is actually said, in full,
    // with an English gloss beneath and a note on when it is spoken.
    voice: {
      zu: "Sicela usuku lokuza kucela isihlobo esihle.",
      en: "We ask for a day to come and ask for a good kinship.",
      note: "The request the letter carries.",
    },

    // Who is present. `term` stays in isiZulu; `gloss` explains the role.
    roles: [
      { term: "Intombi", gloss: "The young woman who carries the letter" },
      { term: "Umnumzane", gloss: "The head of the groom's home, who sends it" },
    ],

    // The sequence of what unfolds. English required, isiZulu where it helps.
    beats: [
      {
        en: "The groom's family write the letter and choose who will carry it.",
        zu: "Umndeni wakubo kwensizwa ubhala incwadi bese ukhetha ozoyihambisa.",
      },
      {
        en: "It is delivered to the bride's home and left with her family.",
        zu: "Incwadi ifika kubo kwentombi ishiywe nomndeni wakhe.",
      },
      {
        en: "Her family reply with a day, and that day becomes the visit.",
        zu: "Umndeni wakhe uphendula ngosuku, lolo suku lube usuku lokuvakasha.",
      },
    ],

    // Media slot. Leave `src` empty until real media exists — `alt` doubles as
    // the placeholder text shown on the page, so write it as a description of
    // the scene we intend to show.
    media: {
      kind: "illustration",
      alt: "Women of the groom's family carrying the letter to the bride's home",
    },

    // The humble note, where a stage varies notably between families.
    variesNote:
      "Some families send the letter by hand, others make the request in " +
      "person or by phone first. The form matters less than the asking.",
  },
}
```

Notes on writing each part:

- **`narration`** — three to six sentences. The doorway into the scene. Present
  tense. Hedged. This is where the story feel comes from, so write it as
  something being watched, not as instructions being given.
- **`voice`** — only for words that are genuinely spoken. If you are not certain
  of the exact isiZulu, leave `voice` out rather than inventing a line.
- **`roles`** — the isiZulu term as it is really used, plus a plain-English
  gloss. These become glossary terms later, so keep the term clean.
- **`beats`** — the sequence, one step per beat. English required; isiZulu where
  the isiZulu adds something.
- **`media`** — reserve the slot even with no file. The `alt` text renders as the
  placeholder, so it should read as a description of the image we want.
- **`variesNote`** — use it wherever practice differs meaningfully. It is the
  humility of the project made visible.

Keep `description` and `details` in place when you add a scene. They are the
fallback and they still carry the isiZulu summary.

## 6. Checklist before opening a content PR

- [ ] English carries the meaning on its own
- [ ] Every isiZulu string has an English gloss nearby
- [ ] isiZulu is written by someone who speaks it, not machine-translated
- [ ] Framed as *commonly / often*, never as a rule
- [ ] No named family, community or village; no published going rate
- [ ] Written in your own words, from knowledge you actually hold
- [ ] The PR description says where the knowledge comes from, and flags anything
      you are unsure of
- [ ] `npm run build` passes (content is typed TypeScript, so it can break the
      build)

Thank you for treating it carefully.
