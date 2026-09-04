export interface Theme {
  primary: string;
  headerBg: string;
  accent: string;
  border: string;
  ring: string;
  button: string;
  iconColor: string;
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
  media?: {
    kind: "image" | "illustration" | "video";
    src?: string; // empty for now — slot reserved
    alt: string;
    caption?: Bilingual;
  };
  variesNote?: string; // the humble "commonly… families and regions differ" line
}

export interface Step {
  id: string;
  title: string;
  zuluTitle?: string; // optional isiZulu name of the stage
  description: string;
  details: string[];
  scene?: Scene; // optional narrative layer; renders as a story when present
}

export interface NationData {
  id: string;
  nationName: string;
  theme: Theme;
  steps: Step[];
}

export interface StepCardProps {
  step: Step;
  isActive: boolean;
  isCompleted?: boolean;
  theme: Theme;
  onComplete: () => void;
  onActivate?: () => void;
  index?: number;
}