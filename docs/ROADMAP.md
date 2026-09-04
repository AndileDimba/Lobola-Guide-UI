# Lobola Hub — Vision & Roadmap

> A living document. We edit this together as the direction takes shape.
> Last shaped: 2026-07-18

---

## The vision (in the founder's words)

A free, widely-adopted reference point for anyone wanting to understand lobola/ilobolo.
Start with **Zulu** (the founder is Zulu), present the **common practices** first, and
**later differentiate by region** — because small villages carry their own known variations.

The experience should not read like documentation. It should let you *see* the journey:

- Women delivering the letter (incwadi) to their family
- The family celebrating
- Uncles (abakhongi) being chosen and sent out
- The travel, and the **praises (izithakazelo)** called outside the bride's home
- Being escorted inside
- The negotiations unfolding

The version in the founder's mind is **a story you can watch**, not a manual you read.

---

## Guiding principles

1. **English is the face, isiZulu is the heart.**
   English carries the meaning so anyone can enter; isiZulu carries the soul so nothing
   sacred is flattened. Lead in English, keep untranslatable terms in isiZulu inline
   (with glossary/tooltip), and show praises/phrases in full isiZulu with English beneath.

2. **Depth before breadth.** One nation (Zulu) done with soul beats four done as stubs.
   Other nations wait until the Zulu experience is something people *share*.

3. **Story over procedure.** Every stage is a scene, not a checklist. Media, roles, and
   narrative framing come first-class, not as afterthoughts.

4. **Respectful and humble.** This informs; it never replaces elders and family. Practices
   vary by family and region — the site says so, visibly.

5. **Free and adoptable.** Fast, shareable, works on a cheap phone. The thing that moves
   people is the thing that spreads.

6. **A learning place, not an authority.** The posture is *"Want to learn about lobola?
   You came to the right place."* The site teaches the **general shape** of the journey —
   stages, roles, terms, meaning — as education. It does **not** publish any specific
   family's or community's private practice as fact (that invites "you used our content /
   that's not how we do it" criticism and can't be verified). Everything is offered humbly
   as *"commonly, this is how it goes; families and regions differ."*

---

## Where the project is today (2026-07-18)

Working MVP, deployed on Vercel. Solid data-driven architecture.

- **Landing / Lobola Hub** — hero, "What is / is NOT / why it matters", quick facts,
  "Explore by Nation" grid (Zulu live; Xhosa, Sotho, Tswana "Coming Soon"), FAQ teaser.
- **Zulu guide** — 7 detailed stages in isiZulu, progress bar + localStorage tracking,
  expand/collapse step cards. Content is accurate but **text-only and procedural**.
- **FAQ** — 6 substantial answers, category filtering.
- **Stack** — React 19, TypeScript, Tailwind 3, React Router 7, Vite, Vercel.

### The honest gap
The emotional, visual journey the founder pictured is **not yet on the site**. The guide
is currently textual. Reaching the vision is mostly (a) extending the data model to carry
media + roles + translations, and (b) changing presentation from doc-like to scene-like.

---

## Roadmap

> Phases are ordered by impact toward the vision, not by difficulty. We refine as we go.

### Phase 1 — Turn the Zulu guide into a story (visual + bilingual)
Focus: **visual/story feel + Zulu depth** (the two chosen priorities).

- [ ] Extend the `Step` data model to carry:
  - [ ] English narrative + isiZulu original (bilingual per stage)
  - [ ] `roles` involved in the stage (e.g. umkhongi omkhulu, unobhala, the intombi)
  - [ ] `izithakazelo` / spoken phrases shown in full isiZulu + English gloss
  - [ ] `media` slots (image / illustration / video / caption) — optional per stage
  - [ ] glossary term references
- [ ] Redesign the stage presentation from "card + checklist" to "scene":
      hero image/illustration, English narration, isiZulu voice, the people involved.
- [ ] Keep progress tracking, but make it feel like moving through a journey.

### Phase 2 — Glossary & the language layer
- [ ] Searchable glossary of terms (ilobolo, umembeso, umbondo, izithakazelo, abakhongi…)
- [ ] Inline term tooltips throughout the guide and FAQ
- [ ] Consistent bilingual pattern component (English face / isiZulu heart)

### Phase 3 — Media pipeline
- [ ] Decide sourcing: original photography/illustration vs. licensed vs. community-submitted
- [ ] Illustration style for scenes we can't photograph (keeps it respectful + consistent)
- [ ] Lazy-loaded, phone-friendly media; captions in both languages

### Phase 4 — Regional differentiation (long-term, only if it stays trustworthy)

> Reframed 2026-07-18: the site is a **learning place, not an authority**. We are NOT
> chasing verified per-family/per-village truth. Regional variation, if it ever ships,
> must be community-driven and clearly marked as "some families/areas," never presented
> as fact about a named community without consent.

- [ ] (Maybe) opt-in, community-contributed variation notes, moderated
- [ ] Keep the humble "commonly… but families and regions differ" framing everywhere

### Phase 5 — Broaden to other nations
- [ ] Only once Zulu is something people share. Xhosa likely next.
- [ ] Reuse the same data model + scene components.

### Cross-cutting / later
- [ ] "Suggest a question / correction" that actually submits (currently an alert)
- [ ] Accessibility pass (contrast, keyboard, screen readers)
- [ ] SEO + shareable social cards (adoption depends on this)
- [ ] Analytics (privacy-respecting) to see what people actually read

---

## Open questions we still need to answer
- Media: what can we realistically source first — real photos, or commissioned illustrations?
- Regional variations: how do we verify them so the site stays trustworthy?
- Contribution/moderation: who vets community submissions?
- Name: "Lobola Hub" vs "Lobola Guide" vs something else.

---

## Decisions log
- 2026-07-18 — Priorities set: **visual/story feel** + **Zulu depth** first.
- 2026-07-18 — Language principle: **English is the face, isiZulu is the heart.**
- 2026-07-18 — **Depth before breadth**: no new nations until Zulu is share-worthy.
- 2026-07-18 — **Learning place, not authority**: teach the general shape humbly; do not
  publish specific families'/communities' private practices as fact. Regional truth is
  explicitly out of scope for now.
