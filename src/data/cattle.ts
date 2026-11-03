/**
 * The eleven named cattle of Zulu lobola, for the page at /guide/zulu/cattle.
 * The English meanings are the owner's translation of a TikTok post; names
 * and roles differ between areas, so change any wording here to match what
 * your elders say.
 */

export type CattleGroup = "original" | "added";

export interface NamedCattle {
  id: number;
  group: CattleGroup;
  name: string; // the isiZulu name
  english: string;
  forWhom: string;
  meaning: string;
  note?: string;
  // Paid in money, so its card shows a coin stack instead of a cow
  money?: boolean;
  // Coat colours for the drawing: the body, then two patches
  coat?: [string, string, string];
}

export const cattleGroups: Record<CattleGroup, { label: string; key: string; color: string }> = {
  original: {
    label: "Original six",
    key: "The original six, the cattle of the ancestors",
    color: "#A2431F",
  },
  added: {
    label: "Added later",
    key: "Added in colonial Natal under Shepstone",
    color: "#2A5C8F",
  },
};

export const cattle: NamedCattle[] = [
  {
    id: 1,
    group: "original",
    name: "Ingquthu",
    english: "The mother's cow",
    forWhom: "the bride's mother",
    coat: ["#FBF6EC", "#7A4B2A", "#231A14"],
    meaning:
      "Also called inkomo kamama. The groom thanks his mother-in-law for raising her daughter well. As a cow it should be the biggest of all; paid in cash, it is a large amount.",
    note: "It honours the bride’s purity. If another man was responsible, he owes it, not the groom.",
  },
  {
    id: 2,
    group: "original",
    name: "Inkomo kababa",
    english: "The father's cow",
    forWhom: "the bride's father",
    coat: ["#7A4B2A", "#FBF6EC", "#7A4B2A"],
    meaning: "A gift from the groom, thanking the bride’s father for raising her with a good hand.",
  },
  {
    id: 3,
    group: "original",
    name: "Umqholiso",
    english: "The cow that brings her in",
    forWhom: "the bride, entering her new home",
    coat: ["#231A14", "#FBF6EC", "#231A14"],
    meaning:
      "The bride points it out for slaughter and is anointed with its gall. She does not eat its meat. Once it is slaughtered, she places beads and money on it.",
  },
  {
    id: 4,
    group: "original",
    name: "Isikhumba",
    english: "The father-in-law's hide",
    forWhom: "the bride's father",
    coat: ["#B5683E", "#FBF6EC", "#B5683E"],
    meaning: "Given by the groom to his father-in-law, and called the father-in-law’s “skin”.",
    note: "Its exact purpose differs between families. Ask your elders.",
  },
  {
    id: 5,
    group: "original",
    name: "Isibhoma",
    english: "The cow for her isidwaba",
    forWhom: "the bride",
    coat: ["#FBF6EC", "#231A14", "#A2431F"],
    meaning:
      "The groom’s gift to the bride, for the isidwaba (leather skirt) she will wear in her new home. It often stays at the groom’s home until the day he has it made, a ceremony his in-laws are invited to.",
  },
  {
    id: 6,
    group: "original",
    name: "Ibheka",
    english: "The cow that looks after her",
    forWhom: "the bride and her in-laws",
    coat: ["#5A3E26", "#EDE3CF", "#5A3E26"],
    meaning:
      "Slaughtered by the bride at her new home to please her in-laws, often about a year after the wedding. It “looks after” her: she and her children get amasi from it.",
  },
  {
    id: 7,
    group: "added",
    name: "Imvulamlomo",
    english: "The mouth-opener",
    forWhom: "the bride's father",
    money: true,
    meaning: "Money, not a cow. It is paid so the bride’s father will open his mouth and speak with the abakhongi.",
    note: "Families agree the amount. There is no standard figure.",
  },
  {
    id: 8,
    group: "added",
    name: "Inhlabisathimba",
    english: "For the bridal party",
    forWhom: "the umthimba",
    coat: ["#231A14", "#7A4B2A", "#231A14"],
    meaning: "Slaughtered for the bridal party (umthimba) at the wedding.",
  },
  {
    id: 9,
    group: "added",
    name: "Isiwunkulu",
    english: "For the women",
    forWhom: "the women at the wedding",
    coat: ["#7A4B2A", "#231A14", "#EDE3CF"],
    meaning: "Slaughtered at the wedding, for the women.",
  },
  {
    id: 10,
    group: "added",
    name: "Isiqondo",
    english: "So she never goes hungry",
    forWhom: "the bride, from her own family",
    coat: ["#FBF6EC", "#B5683E", "#FBF6EC"],
    meaning: "Given to the bride by her own family, so she eats well and never goes hungry in her new home.",
    note: "Few families still give it.",
  },
  {
    id: 11,
    group: "added",
    name: "Umncamo",
    english: "The farewell",
    forWhom: "the girls she grew up with",
    coat: ["#B5683E", "#231A14", "#FBF6EC"],
    meaning: "Slaughtered by the bride at her own home to say goodbye to the girls she grew up with.",
    note: "Few families still slaughter it.",
  },
];

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correct: number; // index into options
  explain: string;
}

export const cattleQuiz: QuizQuestion[] = [
  {
    id: "a",
    prompt: "How many of the eleven cattle are the original cattle of the ancestors?",
    options: ["Four", "Six", "All eleven"],
    correct: 1,
    explain: "Six. The other five were added in colonial Natal under Shepstone.",
  },
  {
    id: "b",
    prompt: "What is imvulamlomo?",
    options: ["A cow for the mother", "Money that opens the talks", "A cow slaughtered at the wedding"],
    correct: 1,
    explain: "It is money, paid so the bride’s father will speak with the abakhongi.",
  },
  {
    id: "c",
    prompt: "Which cow does the bride slaughter about a year after the wedding?",
    options: ["Ibheka", "Umncamo", "Isibhoma"],
    correct: 0,
    explain: "Ibheka, the cow that looks after her, which pleases her in-laws and gives amasi.",
  },
];
