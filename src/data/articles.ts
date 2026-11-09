import type { GuideArticle } from "./types";

/**
 * Guide pages that explain one subject in depth, beside the stages. Each is
 * served at /guide/zulu/<id>. The text is approved by the cultural owner;
 * change it only with their sign-off.
 */
export const zuluArticles: GuideArticle[] = [
  {
    id: "when-the-count-is-different",
    title: "When the count is different",
    subtitle: "Virginity, children and inhlawulo",
    seo: {
      title: "When the count is different: virginity, children and inhlawulo",
      description:
        "How Zulu lobola changes when the bride has children by someone else or is not a virgin: ingquthu, inhlawulo, which cattle are owed and by whom, and how to talk about it.",
    },
    intro: [
      {
        kind: "p",
        en: "Many couples come to lobola with a history: a child from an earlier relationship, or a past the families need to speak about. The custom has always had a place for this. Knowing how it works means nobody needs to arrive at the table embarrassed or unprepared.",
      },
      {
        kind: "p",
        en: "First, the most important thing: **these customs are about which cattle are owed, and by whom. They are not a measure of the bride's worth.**",
      },
    ],
    sections: [
      {
        title: "The mother's cow (*ingquthu*)",
        blocks: [
          {
            kind: "p",
            en: "Ingquthu, also called *inkomo kamama*, honours the bride's mother for raising her daughter. Traditionally it is tied to the bride's purity.",
          },
          {
            kind: "ul",
            items: [
              "**If the bride is a virgin,** ingquthu is included in the lobola, and her mother receives it from the groom's family.",
              "**If she is not, and the groom was not the man responsible,** her mother does not receive ingquthu from the groom. That responsibility belongs to the man who was.",
            ],
          },
        ],
      },
      {
        title: "Inhlawulo",
        blocks: [
          {
            kind: "p",
            en: "*Inhlawulo* is a separate payment, made to the woman's family when a man makes her pregnant outside marriage. It is settled apart from lobola. When the groom is the father, it may be raised on the same day as the negotiations.",
          },
        ],
      },
      {
        title: "When the bride has children by someone else",
        blocks: [
          { kind: "p", en: "The number of cattle the groom's family pays goes down:" },
          {
            kind: "ul",
            items: ["one cow less for virginity, and", "one cow less for each child by another man."],
          },
          {
            kind: "p",
            en: "For example, a bride with three children by someone else means four fewer cattle from the groom's family. Those cattle are not lost to her family. They are owed by the men responsible, not by the groom.",
          },
        ],
      },
      {
        title: "Talking about it",
        blocks: [
          {
            kind: "ul",
            items: [
              "**Speak to your own family first.** The abakhongi need to know before they go, so nothing surprises them at the table.",
              "**Let the elders carry it.** These matters are discussed between the families' representatives, not by the couple.",
              "**Families differ.** Some handle this quietly and others more formally, and practice varies between areas. Ask your elders how your family does it.",
            ],
          },
          {
            kind: "ask",
            question: "How has our family handled this before, and who should speak about it on the day?",
          },
        ],
      },
    ],
  },
];
