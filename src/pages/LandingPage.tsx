import { Link } from 'react-router-dom';
import type { Theme } from '../data/types';
import { zuluData } from '../data/zulu';
import BeadBand from '../components/UI/BeadBand';

// Educational content about Lobola
const educationalSections = [
  {
    title: "What is lobola?",
    paragraphs: [
      `Lobola (also spelled lobolo, or known as "bride price" in English, though this translation is controversial) is a traditional Southern African custom where the groom's family pays the bride's family in cattle, money, or other agreed-upon valuables. However, it is much more than a transaction.`,
      "At its heart, lobola is about building a relationship between two families. It is a process of formal introductions, negotiations, and ceremonies that bind two households together. It shows respect, gratitude, and commitment, acknowledging the bride's family for raising her and demonstrating the groom's ability to take care of a family.",
    ],
  },
  {
    title: "What lobola is not",
    paragraphs: [
      `Lobola is not "buying a wife." This is a common misconception, especially from outside African cultures. The bride does not become property, and the payment does not give the groom ownership over her.`,
    ],
    list: {
      intro: "Instead, lobola serves as:",
      items: [
        "A token of appreciation to the bride's family",
        "A demonstration of the groom's seriousness and capability",
        "A bond that unites two families, not just two individuals",
        "A process that allows both families to meet, discuss, and establish mutual respect",
      ],
    },
  },
  {
    title: "Why does lobola still matter today?",
    paragraphs: [
      "In modern South Africa, lobola remains deeply important to many families, even in urban settings. It connects younger generations to their heritage, involves extended family in life decisions, and creates meaningful moments of cultural celebration.",
      "Many couples who have civil or religious weddings also complete lobola negotiations as a separate cultural ceremony. For many, a marriage feels incomplete without it, not because of the payment, but because of the family involvement and traditional blessings it brings.",
    ],
  },
];

// Quick facts
const quickFacts = [
  {
    title: "Family bond",
    description: "Lobola connects two families, not just two individuals. It creates a lasting relationship between households."
  },
  {
    title: "Cows or cash",
    description: "Traditionally paid in cattle, today many families accept the cash equivalent. The choice depends on the families involved."
  },
  {
    title: "Family-led process",
    description: "The groom rarely speaks during negotiations. Uncles and elders represent both families throughout."
  },
  {
    title: "Regional variations",
    description: "Practices differ between nations (Zulu, Xhosa, Sotho) and even between regions within the same culture."
  }
];

// A nation with a guide carries its theme, so its row wears its own beadwork
const nations: {
  id: string;
  name: string;
  ownName: string;
  description: string;
  theme?: Theme;
}[] = [
  {
    id: "zulu",
    name: "Zulu",
    ownName: "AmaZulu",
    description: "The largest ethnic group in South Africa, known for their rich warrior traditions and detailed lobola ceremonies.",
    theme: zuluData.theme,
  },
  {
    id: "xhosa",
    name: "Xhosa",
    ownName: "AmaXhosa",
    description: "Known for distinctive customs, including elaborate umembeso celebrations.",
  },
  {
    id: "sotho",
    name: "Sotho",
    ownName: "Basotho",
    description: "With connections to Lesotho, Sotho lobola traditions include unique gift exchanges and ceremonies.",
  },
  {
    id: "tswana",
    name: "Tswana",
    ownName: "Batswana",
    description: "Sharing practices with Botswana, Tswana traditions emphasize cattle and family negotiations.",
  }
];

const eyebrow = "text-[13px] font-medium uppercase leading-snug tracking-[0.16em]";
const sectionTitle = "font-display text-[2rem] font-semibold leading-[1.15] lg:text-[2.5rem]";
const container = "mx-auto max-w-[1120px] px-5 lg:px-8";

const Arrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const LandingPage = () => {
  const zulu = zuluData.theme;

  return (
    <div className="flex-1 bg-paper font-reading text-lg leading-[1.65] text-ink lg:text-xl lg:leading-[1.7]">
      {/* Opening: on a phone the picture sits between the title and the lede */}
      <section
        aria-labelledby="hero-title"
        className={`${container} grid pb-12 pt-9 lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:pb-20 lg:pt-[72px]`}
      >
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className={`mb-3 lg:mb-4 ${eyebrow} text-clay`}>
            A guide to South African marriage traditions
          </p>
          <h1
            id="hero-title"
            className="font-display text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.01em] lg:text-[4rem]"
          >
            Understand lobola before you begin
          </h1>
        </div>

        <figure className="-mx-5 mt-6 sm:mx-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center">
          <img
            src="/scenes/umcelo-fire.svg"
            alt="Two families sit facing each other around a small fire, between two huts at dusk."
            width={680}
            height={300}
            className="block h-auto w-full"
          />
          <figcaption className="mx-5 mt-2 text-[15px] italic leading-normal text-ink-soft sm:mx-0 lg:mt-2.5 lg:text-base">
            From the Zulu guide, stage three. The two families meet at the fire.
          </figcaption>
        </figure>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <p className="mt-6 text-[1.3125rem] leading-[1.55] lg:mt-7 lg:text-2xl">
            Lobola is more than a tradition. It is a journey that connects families across generations. Learn the process, understand the meaning, and approach your journey with confidence.
          </p>
          <div className="mt-7 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3 lg:mt-9">
            <Link
              to="/guide/zulu"
              className={`inline-flex min-h-[52px] items-center justify-center gap-2.5 px-7 text-lg font-medium transition-colors ${zulu.button}`}
            >
              Start the Zulu guide
              <Arrow />
            </Link>
            <Link
              to="/faq"
              className="py-3 text-center text-lg underline decoration-1 underline-offset-[6px] hover:decoration-2"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="basics-title" className="border-t border-rule">
        <div className={`${container} pb-12 pt-11 lg:pb-[72px] lg:pt-16`}>
          <h2 id="basics-title" className={sectionTitle}>
            Understanding the basics
          </h2>
          <p className="mt-2.5 max-w-[660px] text-ink-soft lg:mt-3">
            Before you begin the journey, a few things to know about lobola.
          </p>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:mt-11 lg:grid-cols-4 lg:gap-10">
            {quickFacts.map((fact) => (
              <div key={fact.title} className="border-t-2 border-ink-deep pt-4 lg:pt-5">
                <h3 className="mb-1.5 font-display text-[1.375rem] font-semibold leading-tight lg:mb-2 lg:text-2xl">
                  {fact.title}
                </h3>
                <p className="text-[17px] leading-relaxed lg:text-lg">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="know-title" className="border-t border-rule">
        <div className={`${container} flex flex-col gap-5 pb-12 pt-11 lg:flex-row lg:gap-[72px] lg:pb-[72px] lg:pt-16`}>
          <p id="know-title" className={`w-60 flex-shrink-0 ${eyebrow} text-ink-soft`}>
            What you need to know
          </p>
          <div className="min-w-0 max-w-[660px] flex-1">
            {educationalSections.map((section, index) => (
              <article key={section.title} className={index > 0 ? 'mt-10 lg:mt-[52px]' : ''}>
                <h2 className="mb-2.5 font-display text-[1.75rem] font-semibold leading-tight lg:mb-3 lg:text-[2.125rem]">
                  <span className="text-clay">{index + 1}.</span> {section.title}
                </h2>
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i} className={i > 0 ? 'mt-4 lg:mt-5' : ''}>
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <>
                    <p className="mt-4 lg:mt-5">{section.list.intro}</p>
                    <ul className="mt-2.5 list-disc space-y-1.5 pl-[22px] lg:mt-3">
                      {section.list.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="nations-title" className="border-t border-rule">
        <div className={`${container} pb-12 pt-11 lg:pb-[72px] lg:pt-16`}>
          <h2 id="nations-title" className={sectionTitle}>
            Explore by nation
          </h2>
          <p className="mt-2.5 max-w-[660px] text-ink-soft lg:mt-3">
            Each South African nation has its own lobola traditions. Start with the nation that matches your heritage.
          </p>

          <ul className="mt-7 border-b border-t-2 border-b-rule border-t-ink-deep lg:mt-10">
            {nations.map((nation, index) => {
              const body = (
                <div className="flex flex-col gap-2.5 pb-[22px] pt-[18px] lg:flex-row lg:items-baseline lg:gap-10 lg:pb-7 lg:pt-6">
                  <div className="flex items-baseline justify-between gap-3 lg:block lg:w-[280px] lg:flex-shrink-0">
                    <div>
                      <span className="block font-display text-[1.625rem] font-semibold leading-tight lg:text-[1.875rem]">
                        {nation.name}
                      </span>
                      <span className="block text-[17px] italic text-ink-soft lg:text-lg">
                        {nation.ownName}
                      </span>
                    </div>
                    {!nation.theme && (
                      <span className={`${eyebrow} text-xs text-ink-soft lg:hidden`}>Coming later</span>
                    )}
                  </div>
                  <p className="flex-1 text-[17px] leading-relaxed decoration-1 underline-offset-4 group-hover:underline lg:text-lg">{nation.description}</p>
                  {nation.theme ? (
                    <span className={`inline-flex items-center gap-2 text-[17px] font-medium lg:text-lg ${nation.theme.accent}`}>
                      Read the guide
                      <Arrow />
                    </span>
                  ) : (
                    <span className={`hidden ${eyebrow} text-ink-soft lg:inline`}>Coming later</span>
                  )}
                </div>
              );

              return (
                <li key={nation.id} className={index > 0 ? 'border-t border-rule' : ''}>
                  {nation.theme ? (
                    <Link
                      to={`/guide/${nation.id}`}
                      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      <BeadBand colors={nation.theme.beads} />
                      {body}
                    </Link>
                  ) : (
                    <div className="text-ink-soft">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="border-t border-rule">
        <div className={`${container} flex flex-col gap-6 pb-[52px] pt-11 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pb-20 lg:pt-16`}>
          <div className="max-w-[660px]">
            <h2 id="faq-title" className={sectionTitle}>
              Have questions?
            </h2>
            <p className="mt-2.5 lg:mt-3">
              We've answered the most common questions about lobola, from costs to customs to what happens when things don't go as planned.
            </p>
          </div>
          <Link
            to="/faq"
            className="inline-flex min-h-[52px] flex-shrink-0 items-center justify-center gap-2.5 border-2 border-ink-deep px-7 text-lg font-medium transition-colors hover:bg-ink-deep hover:text-paper"
          >
            Read the FAQ
            <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
