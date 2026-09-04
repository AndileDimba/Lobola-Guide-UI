## What this changes

<!-- One or two sentences. What does the reader of the site get out of this? -->

## Why

<!-- The reasoning, or the roadmap phase / issue this serves. -->

Related issue: <!-- e.g. Fixes #12, or "none" -->

## Type of change

- [ ] Code (component, styling, tooling, performance, accessibility)
- [ ] Content (isiZulu wording, stage meaning, glossary, FAQ)
- [ ] Documentation
- [ ] Fix

## For content changes

<!-- Delete this section if your PR touches no content. -->

**Where does this knowledge come from?**
<!-- Your own family's experience, an elder you asked, a published source you can
     name. Please do not paste from books or other sites. -->

**Anything you are unsure about?**
<!-- Say so plainly here rather than smoothing it over in the content. -->

- [ ] English carries the meaning on its own
- [ ] Every isiZulu string has an English gloss nearby
- [ ] The isiZulu was written by someone who speaks it (not machine-translated)
- [ ] Framed as *commonly / often*, never as a rule
- [ ] No named family, community or village; no published going rate
- [ ] Follows [docs/CONTENT_GUIDE.md](../docs/CONTENT_GUIDE.md)

## Checks

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Checked at a phone width (around 360px) as well as desktop
- [ ] No hardcoded colours where a `theme` value exists
- [ ] Any new content field is optional in `src/data/types.ts`

## Screenshots

<!-- For anything visual, before and after at both phone and desktop width. -->
