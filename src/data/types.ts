export interface Theme {
  primary: string;
  headerBg: string;
  accent: string;
  border: string;
  ring: string;
  button: string;
  iconColor: string;
  // Raw hex for the beadwork band, ground colour first, then the bead colours
  // repeated along it. Hex rather than classes because they feed SVG fills.
  beads?: string[];
}

/**
 * A pair of English (the face — carries meaning) and isiZulu (the heart —
 * present when the isiZulu carries weight). English is always shown; isiZulu
 * is optional per pair.
 */
export interface Bilingual {
  en: string;
  zu?: string;
}

/**
 * A spoken line worth showing in full — izithakazelo, the greeting at the gate.
 * The isiZulu is shown prominently, with the English gloss underneath.
 */
export interface Phrase {
  zu: string;
  en: string;
  note?: string; // optional context, e.g. "called at the gate at dawn"
}

/** A person present in the scene. `term` is a glossary term (tappable later). */
export interface Role {
  term: string;
  gloss: string;
}

export interface Media {
  kind: "image" | "illustration" | "video";
  src?: string; // empty for now — slot reserved
  alt: string;
  caption?: Bilingual;
}

/**
 * The optional "scene" layer that turns a stage from a checklist into a story.
 * When present, the guide renders the narrative; when absent, it falls back to
 * the classic details list. Stages can be upgraded to scenes one at a time.
 */
export interface Scene {
  narration: string; // English narration — the doorway into the scene
  voice?: Phrase; // the isiZulu voice of this moment, shown in full + gloss
  roles?: Role[]; // who is present
  beats?: Bilingual[]; // the sequence of what unfolds
  media?: Media;
  variesNote?: string; // the humble "commonly… families and regions differ" line
}

/** A link from a stage to a page that helps the reader do that stage */
export interface StageTool {
  to: string;
  label: string;
  description: string;
}

export interface Step {
  id: string;
  title: string;
  zuluTitle?: string; // optional isiZulu name of the stage
  summary?: string; // English summary, shown before the isiZulu description
  description: string;
  details: string[];
  media?: Media; // a picture for the scene slot before the stage has a scene
  tool?: StageTool; // something the reader can do at this stage, such as write the letter
  scene?: Scene; // optional narrative layer; renders as a story when present
}

export interface NationData {
  id: string;
  nationName: string;
  theme: Theme;
  steps: Step[];
}
