import { useState } from 'react';
import { Link } from 'react-router-dom';
import { zuluData } from '../data/zulu';
import { cattle, cattleGroups, cattleQuiz } from '../data/cattle';
import type { CattleGroup, NamedCattle } from '../data/cattle';
import BeadBand from '../components/UI/BeadBand';

const NB_SPACE = ' ';
const eyebrow = 'text-[13px] font-medium uppercase leading-snug tracking-[0.16em]';
const sectionTitle = 'font-display text-[1.875rem] font-semibold leading-tight lg:text-[2.125rem]';

type Filter = 'all' | CattleGroup;
const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All eleven' },
  { id: 'original', label: 'Original six' },
  { id: 'added', label: 'Added five' },
];

// The next stage in the guide is where the cattle are seen
const NEXT_STAGE_ID = 'ukubonwa_kwezinkomo';

/** A Nguni cow in the cattle's own coat colours */
const Cow = ({ coat: [body, patch, patch2] }: { coat: [string, string, string] }) => (
  <svg width="150" height="110" viewBox="-42 -82 100 84" aria-hidden="true" className="h-auto w-[96px] min-[600px]:w-[150px]">
    <rect x="-42" y="-2" width="100" height="4" fill="#7A4B2A" />
    <path d="M-28 -44 Q-36 -36 -33 -22" stroke={body} strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="-23" y="-28" width="6" height="28" fill="#3A2619" />
    <rect x="-14" y="-28" width="6" height="28" fill="#3A2619" />
    <rect x="12" y="-28" width="6" height="28" fill="#3A2619" />
    <rect x="20" y="-28" width="6" height="28" fill="#3A2619" />
    <rect x="-29" y="-54" width="58" height="30" rx="13" fill={body} />
    <ellipse cx="17" cy="-54" rx="10" ry="5" fill={body} />
    <ellipse cx="-12" cy="-44" rx="9" ry="7" fill={patch} />
    <ellipse cx="8" cy="-36" rx="7" ry="5" fill={patch2} />
    <path d="M22 -50 L40 -54 L48 -42 L43 -36 L24 -38Z" fill={body} />
    <path d="M37 -53 Q28 -66 36 -74" stroke="#EDE3CF" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M41 -53 Q52 -64 46 -76" stroke="#EDE3CF" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

/** Coins and a note, for imvulamlomo, which is paid in money */
const Coins = () => (
  <svg width="120" height="96" viewBox="0 0 120 96" aria-hidden="true" className="h-auto w-[78px] min-[600px]:w-[120px]">
    <rect x="0" y="84" width="120" height="12" fill="#7A4B2A" />
    <ellipse cx="44" cy="80" rx="22" ry="7" fill="#B98A1B" />
    <rect x="22" y="68" width="44" height="12" fill="#D9A420" />
    <ellipse cx="44" cy="68" rx="22" ry="7" fill="#E8C24A" />
    <rect x="22" y="56" width="44" height="12" fill="#D9A420" />
    <ellipse cx="44" cy="56" rx="22" ry="7" fill="#E8C24A" />
    <ellipse cx="80" cy="80" rx="20" ry="6.5" fill="#B98A1B" />
    <rect x="60" y="72" width="40" height="8" fill="#D9A420" />
    <ellipse cx="80" cy="72" rx="20" ry="6.5" fill="#E8C24A" />
    <rect x="64" y="34" width="42" height="26" rx="2" fill="#2F6B4F" transform="rotate(-12 85 47)" />
    <circle cx="85" cy="47" r="7" fill="none" stroke="#FBF6EC" strokeWidth="2" transform="rotate(-12 85 47)" />
  </svg>
);

interface CardProps {
  cow: NamedCattle;
  open: boolean;
  onToggle: () => void;
}

/**
 * One of the eleven, as a card that turns. Both sides are always in the page,
 * the other one hidden, so search engines read every meaning and a screen
 * reader hears the side that is showing.
 */
const CattleCard = ({ cow, open, onToggle }: CardProps) => {
  const group = cattleGroups[cow.group];
  const color = { color: group.color };
  // A class, not the hidden attribute, which `flex` would override
  const face = (showing: boolean) =>
    `${showing ? 'flex' : 'hidden'} w-full flex-grow flex-col px-3 pb-3.5 pt-3 min-[600px]:px-5 min-[600px]:pb-5 min-[600px]:pt-[18px] motion-safe:animate-fade-in`;

  return (
    <button
      type="button"
      aria-pressed={open}
      onClick={onToggle}
      className={`flex flex-col min-[600px]:min-h-[330px] overflow-hidden rounded-md border border-rule text-left text-ink shadow-[0_14px_30px_-22px_rgba(43,30,22,0.45)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#2A5C8F] ${
        open ? 'bg-paper-light' : 'bg-[#F7EFE2] hover:bg-paper-light'
      }`}
    >
      <span className="block h-1.5 w-full" style={{ background: group.color }} aria-hidden="true" />

      <span className={face(!open)}>
        <span className="flex items-baseline justify-between">
          <span className="font-display text-2xl font-semibold leading-none min-[600px]:text-[30px]" style={color}>
            {cow.id}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-ink-soft min-[600px]:text-xs min-[600px]:tracking-[0.12em]">{group.label}</span>
        </span>
        <span className="mb-2.5 mt-1.5 flex h-[84px] items-end justify-center rounded bg-[#EBD5A8] min-[600px]:mb-3.5 min-[600px]:h-[130px]">
          {cow.money || !cow.coat ? <Coins /> : <Cow coat={cow.coat} />}
        </span>
        <span className="font-display text-[17px] font-semibold leading-tight min-[600px]:text-[22px]">{cow.english}</span>
        <span lang="zu" className="mt-0.5 font-display text-[15px] italic leading-snug text-ink-soft min-[600px]:text-[19px]">
          {cow.name}
        </span>
      </span>

      <span className={`${face(open)} gap-2.5`}>
        <span className="flex items-baseline justify-between">
          <span lang="zu" className="font-display text-lg font-medium italic leading-tight min-[600px]:text-2xl">
            {cow.name}
          </span>
          <span className="font-display text-base font-semibold min-[600px]:text-xl" style={color}>
            {cow.id}
          </span>
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] min-[600px]:text-[13px] min-[600px]:tracking-[0.12em]" style={color}>
          For {cow.forWhom}
        </span>
        <span className="text-[15px] leading-normal min-[600px]:text-[17px] min-[600px]:leading-[1.55]">{cow.meaning}</span>
        {cow.note && (
          <span className="border-t border-rule pt-2.5 text-sm italic leading-normal text-ink-soft min-[600px]:text-[15px]">
            {cow.note}
          </span>
        )}
        <span className="mt-auto text-[13px] text-ink-soft min-[600px]:text-sm" aria-hidden="true">
          Tap to turn back
        </span>
      </span>
    </button>
  );
};

const Quiz = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const score = cattleQuiz.filter((q) => answers[q.id] === q.correct).length;
  const done = cattleQuiz.every((q) => answers[q.id] !== undefined);

  return (
    <section aria-labelledby="quiz-title" className="mt-16 max-w-[760px] border-t-2 border-ink-deep pt-10 lg:mt-20">
      <p className={`mb-2 ${eyebrow} text-clay`}>Check what you learnt</p>
      <h2 id="quiz-title" className={`mb-7 ${sectionTitle}`}>
        Three quick questions
      </h2>
      {cattleQuiz.map((q, n) => {
        const answer = answers[q.id];
        const answered = answer !== undefined;
        const right = answer === q.correct;
        return (
          <fieldset key={q.id} className="mb-8">
            <legend className="pb-3 text-[21px] font-medium leading-snug">
              {n + 1}. {q.prompt}
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {q.options.map((option, i) => {
                const chosen = answer === i;
                const style =
                  answered && i === q.correct
                    ? 'border-[#2F6B4F] bg-[#2F6B4F] text-paper-light'
                    : chosen
                      ? 'border-clay bg-clay text-paper-light'
                      : 'border-ink-faint bg-paper-light text-ink-deep hover:border-ink-deep';
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={chosen}
                    onClick={() => setAnswers({ ...answers, [q.id]: i })}
                    className={`min-h-12 rounded-md border-[1.5px] px-5 py-2 text-left text-lg ${style}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <p role="status" className="mt-3 text-[17px] leading-normal">
              {answered && (
                <>
                  <span className={`font-semibold ${right ? 'text-[#2F6B4F]' : 'text-clay'}`}>
                    {right ? 'Right.' : 'Not quite.'}
                  </span>{' '}
                  {q.explain}
                </>
              )}
            </p>
          </fieldset>
        );
      })}
      <div aria-live="polite">
        {done && (
          <p className="rounded border border-rule bg-paper-light px-6 py-5 font-display text-[22px]">
            {score === cattleQuiz.length
              ? 'Three out of three. You know your cattle.'
              : `${score} out of 3. Turn the cards again and try once more.`}
          </p>
        )}
      </div>
    </section>
  );
};

const CattlePage = () => {
  const { theme, steps } = zuluData;
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const turned = Object.values(open).filter(Boolean).length;
  const shown = cattle.filter((cow) => filter === 'all' || cow.group === filter);
  const next = steps.find((step) => step.id === NEXT_STAGE_ID);

  return (
    <div className="flex-1 bg-paper font-reading text-lg leading-[1.65] text-ink lg:text-[19px]">
      <BeadBand colors={theme.beads} />

      <div className="mx-auto max-w-[1200px] px-5 pb-16 pt-9 lg:px-8 lg:pb-[72px] lg:pt-[52px]">
        <header className="max-w-[720px]">
          <p className={`mb-3 ${eyebrow} text-clay`}>Zulu guide &middot; The cattle</p>
          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.01em] lg:text-[3.75rem]">
            The eleven cattle, and what each one means
          </h1>
          <p lang="zu" className="mt-3 font-display text-[1.375rem] italic leading-[1.3] text-ink-soft lg:text-[26px]">
            Izinkomo eziyishumi nanye
          </p>
          <p className="mt-7 text-[1.3125rem] leading-[1.55] lg:text-[22px]">
            Zulu lobola is customarily eleven cattle. They are not eleven of the same thing: each has a name, a person it honours and a moment it belongs to. Six are the cattle of the ancestors. Five more were added in colonial Natal.
          </p>
        </header>

        <div className="mb-6 mt-12 flex flex-wrap items-center justify-between gap-4">
          {/* Three equal parts on a phone, so the pill never wraps */}
          <div role="group" aria-label="Show cattle" className="grid w-full grid-cols-3 rounded-full border-[1.5px] border-ink-deep p-[3px] sm:inline-flex sm:w-auto">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
                className={`h-11 whitespace-nowrap rounded-full px-2 text-base sm:px-5 sm:text-[17px] ${
                  filter === id ? 'bg-ink-deep text-paper-light' : 'text-ink-deep hover:underline'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-base italic text-ink-soft">
            Tap a cow to turn its card.{' '}
            <span aria-live="polite">{turned > 0 && `You have turned ${turned} of 11.`}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 min-[600px]:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] min-[600px]:gap-5">
          {shown.map((cow) => (
            <CattleCard
              key={cow.id}
              cow={cow}
              open={!!open[cow.id]}
              onToggle={() => setOpen({ ...open, [cow.id]: !open[cow.id] })}
            />
          ))}
        </div>

        <ul aria-label="Colour key" className="mt-7 flex flex-wrap gap-x-10 gap-y-3 text-base text-ink-soft">
          {Object.values(cattleGroups).map((group) => (
            <li key={group.label} className="inline-flex items-center gap-2.5">
              <span className="inline-block h-1.5 w-7" style={{ background: group.color }} aria-hidden="true" />
              {group.key}
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap items-start gap-14 lg:mt-20">
          <div className="min-w-0 max-w-[680px] flex-[1_1_520px]">
            <section aria-labelledby="story-title">
              <p className={`mb-2 ${eyebrow} text-clay`}>Did you know?</p>
              <h2 id="story-title" className={`mb-3.5 ${sectionTitle}`}>
                How six became eleven
              </h2>
              <p>
                Before colonial rule there was no fixed number. Families asked what they chose, and six named cattle carried the meaning of the marriage. In colonial Natal, Theophilus Shepstone (uSomtsewu) regulated lobola. Accounts differ on the details: some say he fixed ten cattle plus the mother’s beast, ingquthu, which makes the eleven families ask for today. Higher numbers applied to the daughters of chiefs and royalty.
              </p>
              <p className="mt-[18px]">
                The five he added are mostly cattle slaughtered at the wedding, plus imvulamlomo, which today is paid in money.
              </p>
            </section>

            <section aria-labelledby="gate-title" className="mt-12">
              <h2 id="gate-title" className={`mb-3.5 ${sectionTitle}`}>
                The six cows at the gate
              </h2>
              <p>
                Before anyone speaks of eleven, the negotiators arrive with six. Standing outside the gate of the bride's home, they call the family's praises and announce that they have come with six cows to ask for a hand in marriage. They never say which daughter. The six cows do not need to be there, alive or in money.
              </p>
              <p className="mt-[18px]">
                Once inside, they are asked to repeat what they said. Get the praises wrong and they pay a small fine. Then they are asked the colours of the six cows, and both families write them down. When the bride's family later comes to see the cattle, they ask to see cows of exactly those colours, or another small fine is due.
              </p>
              <p className="mt-[18px]">
                The six cows are a conversation starter: a way of opening the talks in the language of the ancestors.
              </p>
            </section>

            <section aria-labelledby="then-title" className="mt-12">
              <h2 id="then-title" className={`mb-3.5 ${sectionTitle}`}>
                Then and now
              </h2>
              <p>
                Some people argue the added five serve little purpose, and that the number eleven is now used to ask more of a groom's family than tradition ever did. Few families still give isiqondo or umncamo, even while asking for all eleven.
              </p>
              <p className="mt-[18px]">
                In some parts of KwaZulu-Natal, families now also ask for isicelo (umcelo) before cattle are discussed: a cash request that can reach R{NB_SPACE}30{NB_SPACE}000 or more. The father and mother may each ask for their own isicelo, usually with the father's larger, for example R{NB_SPACE}15{NB_SPACE}000 and R{NB_SPACE}10{NB_SPACE}000. It is not part of the original custom, but it has become the norm in some areas.
              </p>
              <p className="mt-[18px]">
                What changes the price has changed too. Traditionally, the number of cattle went down if the bride was no longer a virgin or had a child by another man. Today the count usually stays at eleven, but some families charge more when their daughter is educated, for example when she holds a degree. The difference shows up in the money: a larger isicelo, and a higher rand value per cow when the cattle are paid in cash. Traditionally one cow was valued highest and the rest less and less, but some families now price every cow high, and the cattle alone can come to more than R{NB_SPACE}100{NB_SPACE}000. Some see this as honouring what the family invested in her. Others argue lobola was never meant to price a woman’s education, and that it should fit what the groom can afford.
              </p>
              <p className="mt-[18px]">
                Others see eleven as the custom their parents and grandparents followed, and the fairest common ground between two families. Both views are honest. What matters is that both families understand what each cow means before they agree.
              </p>
            </section>

            <aside aria-labelledby="shortfall-title" className="mt-10 rounded border border-rule bg-paper-light px-6 py-6 lg:px-7">
              <h2 id="shortfall-title" className="mb-2 font-display text-[22px] font-semibold leading-snug">
                Fewer cattle is not a shortfall
              </h2>
              <p className="text-lg leading-relaxed">
                Some cattle depend on the bride's circumstances. Ingquthu and inhlawulo are owed by the man responsible, not the groom, and a family may agree fewer cattle when the bride has children by someone else. This is part of the custom, and nothing to be ashamed of.{' '}
                {/* TODO: point this at the full explanation page once it exists */}
                <Link to="/faq" className="text-clay underline decoration-1 underline-offset-4 hover:decoration-2">
                  Read the full explanation
                </Link>
              </p>
            </aside>
          </div>

          <aside aria-labelledby="elders-title" className="min-w-0 flex-[1_1_320px] rounded-md bg-ink-deep p-6 text-paper-light lg:p-7">
            <p className={`mb-2 ${eyebrow} text-[#E8C24A]`}>Ask your elders</p>
            <h2 id="elders-title" className="mb-4 font-display text-[1.75rem] font-semibold leading-tight">
              Take these home
            </h2>
            <ol className="flex list-decimal flex-col gap-3 pl-[22px] text-lg leading-relaxed">
              <li>Does our family ask for all eleven, or the original six?</li>
              <li>What does isikhumba mean in our family?</li>
              <li>When was the last ibheka slaughtered in our home, and for whom?</li>
            </ol>
          </aside>
        </div>

        <Quiz />

        {next && (
          <nav aria-label="Next" className="mt-16 max-w-[760px]">
            <Link
              to={`/guide/zulu/${next.id}`}
              rel="next"
              className="group block border-t-2 border-ink-deep pb-7 pt-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <span className={`flex items-center gap-2 text-ink-soft ${eyebrow}`}>
                Next, in the guide
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
              <span className="mt-2 block font-display text-[1.75rem] font-semibold leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                {next.title}
              </span>
              {next.zuluTitle && (
                <span lang="zu" className="block text-lg italic text-ink-soft">
                  {next.zuluTitle}
                </span>
              )}
            </Link>
          </nav>
        )}
      </div>

      <BeadBand colors={theme.beads} />
    </div>
  );
};

export default CattlePage;
