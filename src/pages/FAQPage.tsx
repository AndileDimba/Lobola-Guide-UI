import { useState } from 'react';
import { Link } from 'react-router-dom';

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

const categoryColors: Record<string, string> = {
  basics: 'bg-amber-100 text-amber-700',
  process: 'bg-blue-100 text-blue-700',
  costs: 'bg-emerald-100 text-emerald-700',
  modern: 'bg-purple-100 text-purple-700',
  family: 'bg-rose-100 text-rose-700'
};

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

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-white mb-6 transition-colors"
          >
            <span>←</span>
            <span>Back to Lobola Hub</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-stone-300 max-w-2xl mx-auto">
            Answers to the most common questions about lobola — from traditions to modern adaptations.
          </p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-stone-900 text-white'
                : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
            }`}
          >
            All Questions
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white'
                  : `${categoryColors[cat]} hover:opacity-80`
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <main className="max-w-4xl mx-auto px-6 pb-16">
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 flex items-start gap-4 text-left hover:bg-stone-50 transition-colors"
              >
                <span className={`mt-0.5 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[faq.category]}`}>
                  {categoryLabels[faq.category]}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-stone-900">{faq.question}</h3>
                </div>
                <span className={`text-2xl text-stone-400 transition-transform ${openId === faq.id ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              
              {openId === faq.id && (
                <div className="px-6 pb-6 pt-2">
                  <div className="pl-20 text-stone-700 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* More Questions CTA */}
        <div className="mt-12 text-center p-8 bg-amber-50 rounded-2xl border border-amber-100">
          <h3 className="text-xl font-bold text-stone-900 mb-2">
            Have a question we haven't answered?
          </h3>
          <p className="text-stone-600 mb-4">
            We're building this resource with community input. Your question could help others.
          </p>
          <button 
            className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-600 transition-colors"
            onClick={() => alert('Suggestion feature coming soon!')}
          >
            <span>Suggest a Question</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default FAQPage;
