/**
 * The letter the young man's family sends to ask for a day to visit
 * (stage one of the Zulu guide). The isiZulu wording is still to be read by
 * a fluent speaker or an elder; never change it by machine translation.
 */

export type LetterLanguage = "en" | "zu";

export interface LetterFields {
  groomSurname: string;
  clan: string;
  groom: string;
  brideSurname: string;
  bride: string;
  date: string; // ISO yyyy-mm-dd, as a date input gives it
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
  date: "",
  count: "",
  sender: "",
  contact: "",
  phone: "",
};

const EN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const EN_DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];
const ZU_MONTHS = [
  "uMasingana", "uNhlolanja", "uNdasa", "uMbasa", "uNhlaba", "uNhlangulana",
  "uNtulikazi", "uNcwaba", "uMandulo", "uMfumfu", "uLwezi", "uZibandlela",
];
const ZU_DAYS = [
  "ngeSonto", "ngoMsombuluko", "ngoLwesibili", "ngoLwesithathu",
  "ngoLwesine", "ngoLwesihlanu", "ngoMgqibelo",
];

export const formatLetterDate = (iso: string, lang: LetterLanguage) => {
  // Midday, so the date cannot slip a day in any time zone
  const d = new Date(iso + "T12:00:00");
  if (isNaN(d.getTime())) return lang === "zu" ? "[usuku]" : "[date]";
  if (lang === "zu") {
    return `${ZU_DAYS[d.getDay()]}, mhla ziyi-${d.getDate()} ${ZU_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }
  return `${EN_DAYS[d.getDay()]}, ${d.getDate()} ${EN_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
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
  const n = orPlaceholder(f.count, "[number]");
  const s = orPlaceholder(f.sender, "[name]");
  const c = orPlaceholder(f.contact, "[contact]");
  const ph = orPlaceholder(f.phone, "[phone]");
  const clan = f.clan.trim();
  const date = formatLetterDate(f.date, lang);

  if (lang === "zu") {
    return {
      greeting: `Sanibonani bakwa${bs},`,
      body: [
        `Thina bakwa${gs}${clan ? ` (${clan})` : ""} sibhala le ncwadi ukuze sazise umndeni wakwa${bs} ukuthi indodana yethu, u-${g}, ifisa ukushada nendodakazi yenu, u-${b}.`,
        "Uma nivuma, sicela ukuza ekhaya lenu ukuzocela isandla sakhe nokuqala izingxoxo zamalobolo.",
        `Singathanda ukuza ${date}. Sizoba ngabantu abayi-${n}.`,
        "Sicela niphendule le ncwadi, nisazise ukuthi lolu suku luyanilungela yini, noma niphakamise olunye usuku.",
        `Ningaxhumana no-${c} kule nombolo: ${ph}.`,
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
      `We would like to come on ${date}. We will be a group of ${n} people.`,
      "Please reply to let us know whether this date suits you, or suggest another day.",
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
  ].join("\n");
