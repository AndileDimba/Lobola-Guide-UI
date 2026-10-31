import { useState } from 'react';
import type { ReactNode } from 'react';
import { suggestionEmailHref } from '../data/feedback';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'basics' | 'process' | 'costs' | 'modern' | 'family';
}

const faqs: FAQ[] = [
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

const categoryLabels: Record<string, string> = {
  basics: 'Basics',
  process: 'The Process',
  costs: 'Costs & Money',
  modern: 'Modern Situations',
  family: 'Family Dynamics'
};

// Answers are written as plain text: blank lines split paragraphs, and lines
// starting with "• " become a list
const renderAnswer = (answer: string) =>
  answer.split('\n\n').flatMap((block, b) => {
    const parts: ReactNode[] = [];
    let bullets: string[] = [];
    const flush = () => {
      if (bullets.length === 0) return;
      parts.push(
        <ul key={`${b}-${parts.length}`} className="list-disc space-y-1.5 pl-[22px]">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
      bullets = [];
    };
    for (const line of block.split('\n')) {
      if (line.startsWith('• ')) {
        bullets.push(line.slice(2));
      } else {
        flush();
        parts.push(<p key={`${b}-${parts.length}`}>{line}</p>);
      }
    }
    flush();
    return parts;
  });

const eyebrow = 'text-[13px] font-medium uppercase leading-snug tracking-[0.16em]';

const FAQPage = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = selectedCategory
    ? faqs.filter(faq => faq.category === selectedCategory)
    : faqs;

  const categories = Array.from(new Set(faqs.map(f => f.category)));
  const topics: { id: string | null; label: string }[] = [
    { id: null, label: 'All questions' },
    ...categories.map((cat) => ({ id: cat, label: categoryLabels[cat] })),
  ];

  return (
    <div className="flex-1 bg-paper font-reading text-lg leading-[1.65] text-ink lg:text-xl lg:leading-[1.7]">
      <div className="mx-auto max-w-[1120px] px-5 pb-12 pt-9 lg:px-8 lg:pb-20 lg:pt-14">
        <header className="lg:ml-[312px] lg:max-w-[660px]">
          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.01em] lg:text-[4rem]">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-[1.3125rem] leading-[1.55] lg:mt-5 lg:text-2xl">
            Answers to the most common questions about lobola, from traditions to modern adaptations.
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-start lg:gap-[72px]">
          {/* Topics: a wrapping row on a phone, a list beside the questions on a wide screen */}
          <nav aria-label="Topics" className="lg:sticky lg:top-24 lg:w-60 lg:flex-shrink-0">
            <p className={`mb-2 lg:mb-4 ${eyebrow} text-ink-soft`}>Topics</p>
            <ul className="flex flex-wrap gap-x-6 lg:flex-col lg:gap-0">
              {topics.map((topic) => {
                const isSelected = selectedCategory === topic.id;
                return (
                  <li key={topic.label}>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(topic.id)}
                      aria-pressed={isSelected}
                      className={`min-h-11 py-2 text-left text-[17px] decoration-1 underline-offset-[6px] hover:underline lg:text-lg ${
                        isSelected ? 'font-medium text-ink underline decoration-2' : 'text-ink-soft hover:text-ink'
                      }`}
                    >
                      {topic.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <main className="min-w-0 max-w-[660px] flex-1">
            <ul className="border-b border-t-2 border-b-rule border-t-ink-deep">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                return (
                  <li key={faq.id} className={index > 0 ? 'border-t border-rule' : ''}>
                    <h2>
                      <button
                        type="button"
                        onClick={() => toggleFAQ(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`answer-${faq.id}`}
                        className="group flex w-full items-start gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:py-6"
                      >
                        <span className="flex-1">
                          <span className={`block ${eyebrow} text-ink-soft`}>
                            {categoryLabels[faq.category]}
                          </span>
                          <span className="mt-1.5 block font-display text-[1.375rem] font-semibold leading-snug decoration-1 underline-offset-4 group-hover:underline lg:text-2xl">
                            {faq.question}
                          </span>
                        </span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          aria-hidden="true"
                          className="mt-7 flex-shrink-0 text-ink-soft"
                        >
                          <path d="M5 12h14" />
                          {!isOpen && <path d="M12 5v14" />}
                        </svg>
                      </button>
                    </h2>
                    {isOpen && (
                      <div id={`answer-${faq.id}`} className="animate-fade-in space-y-4 pb-7">
                        {renderAnswer(faq.answer)}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <section aria-labelledby="suggest-title" className="mt-12 lg:mt-16">
              <h2 id="suggest-title" className="font-display text-[1.625rem] font-semibold leading-tight lg:text-[1.875rem]">
                Have a question we haven't answered?
              </h2>
              <p className="mt-2.5 lg:mt-3">
                We're building this resource with community input. Your question could help others.
              </p>
              <a
                href={suggestionEmailHref('Question for the FAQ', 'My question:')}
                className="mt-6 inline-flex min-h-[52px] items-center justify-center border-2 border-ink-deep px-7 text-lg font-medium transition-colors hover:bg-ink-deep hover:text-paper"
              >
                Suggest a question
              </a>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
