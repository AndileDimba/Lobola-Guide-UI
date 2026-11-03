/** The questions on the FAQ page, also given to search engines as FAQPage data */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'basics' | 'process' | 'costs' | 'modern' | 'family';
}

export const faqs: FAQ[] = [
  {
    id: 'money-or-cows',
    question: 'Should lobola be paid in money or cows?',
    answer: `Traditionally, lobola was paid in cattle — cows are a symbol of wealth, prosperity, and respect in many African cultures. However, in modern times, many families accept the cash equivalent.

The choice depends entirely on the bride's family. Some families:
• Still prefer actual cattle, especially in rural areas
• Accept cash equivalent (often calculated per head of cattle)
• Accept a combination of both

During negotiations, the groom's family should ask what the bride's family prefers. Never assume — this is part of the respectful discussion process.`,
    category: 'basics'
  },
  {
    id: 'groom-presence',
    question: "Should the groom go to the bride's family for negotiations?",
    answer: `In most Zulu traditions, the groom does NOT directly participate in the negotiations. Instead, the uncles (abakhongi) represent the groom's family.

Here's how it typically works:
• The groom's uncles travel to the bride's family
• The groom may accompany them but stays in the background
• All formal communication goes through the uncles
• The groom may be called to be identified/confirmed, but doesn't speak during negotiations

This approach shows respect and proper protocol. The groom speaking directly could be seen as disrespectful in some contexts.`,
    category: 'process'
  },
  {
    id: 'celebratory-parties',
    question: 'Are celebratory parties afterwards important?',
    answer: `Yes, celebrations are an integral part of the lobola process — not just an afterthought. Different celebrations mark different stages:

• After successful negotiations: Small celebration acknowledging the agreement
• Umembeso: A formal celebration where the bride's family receives gifts
• Umbondo: The bride brings gifts to the groom's family
• Umabo/Umshado: The main wedding celebration

These celebrations:
• Allow both families to bond
• Give the community opportunity to witness the union
• Honor the ancestors and traditions
• Create lasting memories for both families

Skipping celebrations may be seen as cutting corners, though the scale can vary based on family preferences and resources.`,
    category: 'process'
  },
  {
    id: 'how-much',
    question: 'How much is lobola typically?',
    answer: `Lobola amounts vary significantly based on the family, region, and circumstances. There is no fixed price.

Factors that influence the amount:
• The bride's level of education
• Whether she has children from a previous relationship
• The family's standing and expectations
• Regional traditions (some areas have higher/lower norms)
• The groom's financial situation

Important notes:
• Negotiation is expected — the first amount is rarely the final amount
• It's meant to be a stretch, but not impossible to pay
• Some families allow installment payments
• The focus should be on the relationship, not the money

Never discuss exact amounts publicly — this is a private family matter.`,
    category: 'costs'
  },
  {
    id: 'father-deceased',
    question: 'What if my father is no longer alive?',
    answer: `If the groom's or bride's father has passed, the eldest uncle (malume) or another senior male figure typically takes on this role.

For the groom's family:
• The eldest uncle leads the negotiation team
• He speaks on behalf of the family lineage

For the bride's family:
• The eldest uncle receives the negotiations
• He consults with the family on decisions

In some cases, if no male elder is available, a respected older family member (even female) may take on certain responsibilities, though this varies by family and region.

The key is to identify who the family recognizes as the appropriate authority figure.`,
    category: 'family'
  },
  {
    id: 'living-abroad',
    question: 'I live abroad — how does this work?',
    answer: `Many South Africans in the diaspora still complete lobola negotiations. Here are common approaches:

• Video calls: Some families now allow virtual participation for overseas family members
• Representative: A trusted uncle in South Africa can represent the overseas groom
• Return trip: Many grooms travel home specifically for lobola negotiations
• Multiple trips: Some spread the process over several visits (negotiations, payments, ceremonies)

Key considerations:
• Communicate your situation early to the bride's family
• Show genuine effort despite the distance
• Be flexible with timing (time zones, work schedules)
• Consider that some ceremonies MUST be done in person

The most important thing is to show respect and willingness — families generally appreciate the effort of navigating this from abroad.`,
    category: 'modern'
  }
];

export const categoryLabels: Record<string, string> = {
  basics: 'Basics',
  process: 'The Process',
  costs: 'Costs & Money',
  modern: 'Modern Situations',
  family: 'Family Dynamics'
};
