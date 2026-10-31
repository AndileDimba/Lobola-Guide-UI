/**
 * The letter the young man's family sends to ask for a visit (stage one of
 * the Zulu guide). It leaves the day for the bride's family to choose. The
 * isiZulu wording is still to be read by a fluent speaker or an elder; never
 * change it by machine translation.
 */

export type LetterLanguage = "en" | "zu";

export interface LetterFields {
  groomSurname: string;
  clan: string;
  groom: string;
  brideSurname: string;
  bride: string;
  count: string;
  sender: string;
  contact: string;
  phone: string;
}

export interface Letter {
  greeting: string;
  body: string[];
  closing: string;
  signName: string;
  signLine: string;
}

export const emptyLetterFields: LetterFields = {
  groomSurname: "",
  clan: "",
  groom: "",
  brideSurname: "",
  bride: "",
  count: "",
  sender: "",
  contact: "",
  phone: "",
};

// The number of people in isiZulu, written as a word with the digit beside
// it: "abane (4)"
const ZU_PEOPLE = [
  "omunye", "ababili", "abathathu", "abane", "abahlanu",
  "abayisithupha", "abayisikhombisa", "abayisishiyagalombili",
  "abayisishiyagalolunye", "abayishumi", "ishumi nanye", "ishumi nambili",
  "ishumi nantathu", "ishumi nane", "ishumi nanhlanu", "ishumi nesithupha",
  "ishumi nesikhombisa", "ishumi nesishiyagalombili",
  "ishumi nesishiyagalolunye", "amashumi amabili",
];

export const MAX_PEOPLE = ZU_PEOPLE.length;

// A no-break space keeps "abane" and "(4)", and "ishumi nanye", on one line
const NB_SPACE = "\u00A0";
// "u-" and "no-" belong to the name after them; a non-breaking hyphen keeps
// the pair together when a line wraps
export const NB_HYPHEN = "\u2011";

/** Keeps the count a whole number from 1 to MAX_PEOPLE, or empty */
export const cleanCount = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 2);
  if (!digits) return "";
  return String(Math.min(Math.max(Number(digits), 1), MAX_PEOPLE));
};

// A field left empty shows as a [placeholder], so the letter reads whole while
// it is being filled in
const orPlaceholder = (value: string, placeholder: string) =>
  value.trim() || placeholder;

export const buildLetter = (f: LetterFields, lang: LetterLanguage): Letter => {
  const gs = orPlaceholder(f.groomSurname, "[surname]");
  const bs = orPlaceholder(f.brideSurname, "[surname]");
  const g = orPlaceholder(f.groom, "[groom]");
  const b = orPlaceholder(f.bride, "[bride]");
  const count = Number(cleanCount(f.count));
  const s = orPlaceholder(f.sender, "[name]");
  const c = orPlaceholder(f.contact, "[contact]");
  // A phone number reads as one piece, so it never breaks across lines
  const ph = orPlaceholder(f.phone, "[phone]").replace(/ +/g, NB_SPACE);
  const clan = f.clan.trim();

  if (lang === "zu") {
    const people = count
      ? `${ZU_PEOPLE[count - 1].replace(/ /g, NB_SPACE)}${NB_SPACE}(${count})`
      : "[inani]";
    return {
      greeting: `Sanibonani Mndeni wakwa${bs},`,
      body: [
        `Thina Mndeni wakwa${gs}${clan ? ` (${clan})` : ""} sibhala le ncwadi ukuze sazise umndeni wakwa${bs} ukuthi indodana yethu, u${NB_HYPHEN}${g}, ifisa ukushada nendodakazi yenu, u${NB_HYPHEN}${b}.`,
        "Uma nivuma, sicela ukuza ekhaya lenu ukuzocela isandla sakhe nokuqala izingxoxo zamalobolo.",
        `Sizoba ngabantu ${people}. Sicela nisazise ukuthi yiluphi usuku olunilungele ukuthi size.`,
        `Ningaxhumana no${NB_HYPHEN}${c} kule nombolo: ${ph}.`,
      ],
      closing: "Ngenhlonipho,",
      signName: s,
      signLine: `Egameni lomndeni wakwa${gs}`,
    };
  }

  return {
    greeting: `To the ${bs} family,`,
    body: [
      `We, the ${gs} family${clan ? ` (${clan})` : ""}, write to let you know that our son, ${g}, wishes to marry your daughter, ${b}.`,
      "With your permission, we ask to visit your home to ask for her hand and to begin lobola negotiations.",
      `We will be a group of ${count || "[number]"} ${count === 1 ? "person" : "people"}. Please let us know which day suits you for us to visit.`,
      `You can reach ${c} on ${ph}.`,
    ],
    closing: "With respect,",
    signName: s,
    signLine: `On behalf of the ${gs} family`,
  };
};

/** The letter as plain text, for WhatsApp and the clipboard */
export const letterToText = (letter: Letter) =>
  [
    letter.greeting,
    "",
    ...letter.body.map((p) => p + "\n"),
    letter.closing,
    letter.signName,
    letter.signLine,
  ]
    .join("\n")
    // A plain hyphen in shared text, where a non-breaking one may not display
    .split(NB_HYPHEN)
    .join("-");
