import { Link } from 'react-router-dom';

// Educational content about Lobola
const educationalSections = [
  {
    title: "What is Lobola?",
    content: `Lobola (also spelled lobolo or known as "bride price" in English, though this translation is controversial) is a traditional Southern African custom where the groom's family pays the bride's family in cattle, money, or other agreed-upon valuables. However, it is much more than a transaction.

At its heart, lobola is about building a relationship between two families. It is a process of formal introductions, negotiations, and ceremonies that bind two households together. It shows respect, gratitude, and commitment — acknowledging the bride's family for raising her, and demonstrating the groom's ability to take care of a family.`
  },
  {
    title: "What Lobola is NOT",
    content: `Lobola is not "buying a wife." This is a common misconception, especially from outside African cultures. The bride does not become property, and the payment does not give the groom ownership over her.

Instead, lobola serves as:
• A token of appreciation to the bride's family
• A demonstration of the groom's seriousness and capability
• A bond that unites two families, not just two individuals
• A process that allows both families to meet, discuss, and establish mutual respect`
  },
  {
    title: "Why Does Lobola Still Matter Today?",
    content: `In modern South Africa, lobola remains deeply important to many families, even in urban settings. It connects younger generations to their heritage, involves extended family in life decisions, and creates meaningful moments of cultural celebration.

Many couples who have civil or religious weddings also complete lobola negotiations as a separate cultural ceremony. For many, a marriage feels incomplete without it — not because of the payment, but because of the family involvement and traditional blessings it brings.`
  }
];

// Quick facts cards
const quickFacts = [
  {
    icon: "🤝",
    title: "Family Bond",
    description: "Lobola connects two families, not just two individuals. It creates a lasting relationship between households."
  },
  {
    icon: "🐄",
    title: "Cows or Cash",
    description: "Traditionally paid in cattle, today many families accept the cash equivalent. The choice depends on the families involved."
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family-Led Process",
    description: "The groom rarely speaks during negotiations. Uncles and elders represent both families throughout."
  },
  {
    icon: "📍",
    title: "Regional Variations",
    description: "Practices differ between nations (Zulu, Xhosa, Sotho) and even between regions within the same culture."
  }
];

// Nations available (for future expansion)
const nations = [
  {
    id: "zulu",
    name: "Zulu (AmaZulu)",
    description: "The largest ethnic group in South Africa, known for their rich warrior traditions and detailed lobola ceremonies.",
    available: true,
    theme: {
      gradient: "from-yellow-500 to-amber-600",
      bg: "bg-yellow-50"
    }
  },
  {
    id: "xhosa",
    name: "Xhosa (AmaXhosa)",
    description: "Known for distinctive customs including ukuthwala and elaborate umembeso celebrations.",
    available: false,
    theme: {
      gradient: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50"
    }
  },
  {
    id: "sotho",
    name: "Sotho (Basotho)",
    description: "With connections to Lesotho, Sotho lobola traditions include unique gift exchanges and ceremonies.",
    available: false,
    theme: {
      gradient: "from-orange-500 to-red-600",
      bg: "bg-orange-50"
    }
  },
  {
    id: "tswana",
    name: "Tswana (Batswana)",
    description: "Sharing practices with Botswana, Tswana traditions emphasize cattle and family negotiations.",
    available: false,
    theme: {
      gradient: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50"
    }
  }
];

const LandingPage = () => {
  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23fff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-amber-300 mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              Your Guide to South African Marriage Traditions
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Understand <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Lobola</span>
              <br />Before You Begin
            </h1>
            
            <p className="text-lg md:text-xl text-stone-300 mb-8 leading-relaxed">
              Lobola is more than a tradition — it's a journey that connects families across generations. 
              Learn the process, understand the meaning, and approach your journey with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/guide/zulu"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <span>Start with Zulu Lobola</span>
                <span className="text-2xl">→</span>
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                <span>Read the FAQ</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#fafaf9"/>
          </svg>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">
              Understanding the Basics
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Before diving into the process, here are some key things to know about lobola.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickFacts.map((fact, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-stone-100"
              >
                <div className="text-4xl mb-4">{fact.icon}</div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{fact.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">
              Deep Dive: What You Need to Know
            </h2>
          </div>
          
          <div className="space-y-12">
            {educationalSections.map((section, index) => (
              <article key={index} className="prose prose-stone max-w-none">
                <h3 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </span>
                  {section.title}
                </h3>
                <div className="pl-13 text-stone-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Nations Section */}
      <section className="py-16 md:py-24 bg-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">
              Explore by Nation
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Each South African nation has its own unique lobola traditions. Start with the nation that matches your heritage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {nations.map((nation) => (
              <div
                key={nation.id}
                className={`relative rounded-2xl overflow-hidden ${nation.available ? 'cursor-pointer group' : 'opacity-70'}`}
              >
                <div className={`p-8 ${nation.theme.bg} border-2 ${nation.available ? 'border-transparent group-hover:border-stone-300' : 'border-transparent'} rounded-2xl transition-all`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${nation.theme.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-black text-2xl">{nation.name.charAt(0)}</span>
                    </div>
                    {!nation.available && (
                      <span className="text-xs font-bold uppercase tracking-widest text-stone-500 bg-stone-200 px-3 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                    {nation.available && (
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                        Available
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{nation.name}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">{nation.description}</p>
                  
                  {nation.available ? (
                    <Link
                      to={`/guide/${nation.id}`}
                      className={`inline-flex items-center gap-2 bg-gradient-to-r ${nation.theme.gradient} text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all`}
                    >
                      Explore {nation.name.split(' ')[0]} Guide
                      <span>→</span>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 bg-stone-200 text-stone-500 px-6 py-3 rounded-xl font-bold text-sm cursor-not-allowed">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Teaser Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Have Questions?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            We've answered the most common questions about lobola — from costs to customs to what happens when things don't go as planned.
          </p>
          <Link
            to="/faq"
            className="inline-flex items-center justify-center gap-3 bg-white text-amber-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <span>Read the FAQ</span>
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
