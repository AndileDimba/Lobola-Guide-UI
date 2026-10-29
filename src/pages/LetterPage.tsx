import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { track } from '@vercel/analytics/react';
import { zuluData } from '../data/zulu';
import {
  buildLetter,
  cleanCount,
  emptyLetterFields,
  letterToText,
  MAX_PEOPLE,
  NB_HYPHEN,
  type LetterFields,
  type LetterLanguage,
} from '../data/letter';
import BeadBand from '../components/UI/BeadBand';

// The letter stays on this device: it is kept in the browser and never sent
const STORAGE_KEY = 'lobola-hub:letter';

interface Saved {
  fields: LetterFields;
  lang: LetterLanguage;
}

const loadSaved = (): Saved => {
  const fallback: Saved = { fields: emptyLetterFields, lang: 'en' };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const saved = JSON.parse(raw) as Partial<Saved>;
    const fields = { ...emptyLetterFields };
    for (const key of Object.keys(fields) as (keyof LetterFields)[]) {
      const value = saved.fields?.[key];
      if (typeof value === 'string') fields[key] = value;
    }
    return { fields, lang: saved.lang === 'zu' ? 'zu' : 'en' };
  } catch {
    return fallback;
  }
};

type Field = {
  key: keyof LetterFields;
  label: string;
  type?: 'text' | 'number' | 'tel';
  placeholder?: string;
  autoComplete?: string;
  // Fields that share a row on a wide form, and how much of it they take
  width?: string;
};

const sections: { legend: string; rows: Field[][] }[] = [
  {
    legend: 'Your family',
    rows: [
      [{ key: 'groomSurname', label: 'Family surname (isibongo)', autoComplete: 'family-name' }],
      [{ key: 'clan', label: 'Clan names (izithakazelo)', placeholder: 'Optional' }],
      [{ key: 'groom', label: "Groom's name" }],
    ],
  },
  {
    legend: 'Her family',
    rows: [
      [{ key: 'brideSurname', label: 'Family surname' }],
      [{ key: 'bride', label: "Bride's name" }],
    ],
  },
  {
    legend: 'The visit',
    rows: [
      [{ key: 'count', label: 'People coming', type: 'number', width: 'flex-[0_1_180px]' }],
      [{ key: 'sender', label: 'Who signs it', autoComplete: 'name' }],
      [
        { key: 'contact', label: 'Contact person', width: 'flex-[1_1_160px]' },
        { key: 'phone', label: 'Their phone', type: 'tel', autoComplete: 'tel', width: 'flex-[1_1_160px]' },
      ],
    ],
  },
];

const focusRing =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#2A5C8F]';
const secondaryButton = `inline-flex h-[52px] items-center gap-2.5 rounded-md border-[1.5px] border-ink-deep px-6 text-lg text-ink-deep transition-colors hover:bg-ink-deep hover:text-paper-light ${focusRing}`;

// Shows "u-Sipho" with a plain hyphen kept on one line, since not every font
// draws the non-breaking hyphen the letter carries
const keepPrefixes = (paragraph: string) =>
  paragraph.split(/(\S*\u2011\S*)/).map((part, i) =>
    part.includes(NB_HYPHEN) ? (
      <span key={i} className="whitespace-nowrap">
        {part.split(NB_HYPHEN).join('-')}
      </span>
    ) : (
      part
    )
  );

const LetterPage = () => {
  const [{ fields, lang }, setSaved] = useState<Saved>(loadSaved);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const { theme } = zuluData;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ fields, lang }));
    } catch {
      // Private browsing or full storage: the letter still works, it just
      // will not be here next time
    }
  }, [fields, lang]);

  useEffect(() => {
    if (copyStatus === 'idle') return;
    const timer = setTimeout(() => setCopyStatus('idle'), 2500);
    return () => clearTimeout(timer);
  }, [copyStatus]);

  const setField = (key: keyof LetterFields, value: string) =>
    setSaved((saved) => ({
      ...saved,
      fields: { ...saved.fields, [key]: key === 'count' ? cleanCount(value) : value },
    }));
  const setLang = (next: LetterLanguage) => setSaved((saved) => ({ ...saved, lang: next }));

  const letter = buildLetter(fields, lang);
  const text = letterToText(letter);

  // Only how the letter left the page and its language are counted, never
  // anything typed into it. Counted on Vercel Pro; ignored on the free plan.
  const trackShare = (method: 'whatsapp' | 'print' | 'copy') =>
    track('Letter shared', { method, language: lang });

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('copied');
      trackShare('copy');
    } catch {
      setCopyStatus('failed');
    }
  };

  // The small strip of beads at the head of the letter, in the guide's colours
  const beads = theme.beads ?? [];
  const strip = beads.length > 3 ? [beads[1], beads[0], beads[3], beads[0], beads[1], beads[0]] : [];

  const languages: { id: LetterLanguage; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'zu', label: 'isiZulu' },
  ];

  return (
    <div className="flex-1 bg-paper font-reading text-lg leading-[1.6] text-ink print:bg-white">
      <div className="print:hidden">
        <BeadBand colors={theme.beads} />
      </div>

      <div className="mx-auto max-w-[1120px] px-5 pb-14 pt-9 lg:px-8 lg:pb-16 lg:pt-12 print:p-0">
        <header className="print:hidden">
          <Link
            to="/guide/zulu"
            className={`text-[13px] font-medium uppercase leading-snug tracking-[0.16em] underline-offset-4 hover:underline ${theme.accent}`}
          >
            Stage one &middot; Sending of the Letter
          </Link>
          <h1 className="mt-3 font-display text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.01em] lg:text-[3.25rem]">
            Write the letter to her family
          </h1>
          <p className="mb-8 mt-4 max-w-[640px] text-[1.3125rem] leading-[1.55] lg:mb-10">
            Answer a few questions and we will word the letter for you, in English or isiZulu. Nothing you type leaves your phone.
          </p>
        </header>

        <div className="flex flex-wrap items-start gap-x-14 gap-y-10">
          <form
            aria-label="Letter details"
            onSubmit={(e) => e.preventDefault()}
            className="flex min-w-0 flex-[1_1_340px] flex-col gap-7 print:hidden"
          >
            {sections.map((section) => (
              <fieldset key={section.legend} className="flex flex-col gap-3.5">
                <legend className="pb-1.5 font-display text-[22px] font-semibold">{section.legend}</legend>
                {section.rows.map((row) => (
                  <div key={row[0].key} className="flex flex-wrap gap-3.5">
                    {row.map((field) => (
                      <label
                        key={field.key}
                        className={`flex flex-col gap-1 text-base font-medium ${field.width ?? 'flex-1 basis-full'}`}
                      >
                        {field.label}
                        <input
                          type={field.type ?? 'text'}
                          min={field.type === 'number' ? 1 : undefined}
                          max={field.type === 'number' ? MAX_PEOPLE : undefined}
                          inputMode={field.type === 'number' ? 'numeric' : undefined}
                          value={fields[field.key]}
                          placeholder={field.placeholder}
                          autoComplete={field.autoComplete ?? 'off'}
                          onChange={(e) => setField(field.key, e.target.value)}
                          className={`h-12 w-full rounded-md border-[1.5px] border-ink-faint bg-paper-light px-3.5 text-lg font-normal text-ink placeholder:text-ink-faint ${focusRing}`}
                        />
                      </label>
                    ))}
                  </div>
                ))}
              </fieldset>
            ))}
          </form>

          <section aria-label="Your letter" className="min-w-0 flex-[1.4_1_520px]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
              <div role="group" aria-label="Letter language" className="inline-flex rounded-full border-[1.5px] border-ink-deep p-[3px]">
                {languages.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={lang === id}
                    onClick={() => setLang(id)}
                    className={`h-11 rounded-full px-5 text-[17px] ${focusRing} ${
                      lang === id ? 'bg-ink-deep text-paper-light' : 'text-ink-deep'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-[15px] italic text-ink-soft">The letter updates as you type</p>
            </div>

            <article
              lang={lang}
              className="rounded border border-rule bg-paper-light px-6 pb-9 pt-9 shadow-[0_1px_0_#CDBA9C,0_18px_40px_-24px_rgba(43,30,22,0.35)] sm:px-[52px] sm:pb-11 sm:pt-12 print:rounded-none print:border-0 print:bg-white print:p-[20mm] print:shadow-none"
            >
              {strip.length > 0 && (
                <svg width="72" height="8" aria-hidden="true" className="mb-7 block print:mb-9">
                  {strip.map((color, i) => (
                    <polygon key={i} points={`${i * 12},8 ${i * 12 + 6},0 ${i * 12 + 12},8`} fill={color} />
                  ))}
                </svg>
              )}
              <p className="mb-[22px] font-display text-2xl font-medium leading-[1.3]">{letter.greeting}</p>
              {letter.body.map((paragraph, i) => (
                <p key={i} className="mb-4 text-[19px] leading-[1.65]">
                  {keepPrefixes(paragraph)}
                </p>
              ))}
              <p className="mb-1 mt-7 text-[19px] italic">{letter.closing}</p>
              <p className="font-display text-[22px] font-medium">{letter.signName}</p>
              <p className="text-[17px] text-ink-soft">{letter.signLine}</p>
              {/* On paper only, at the foot of the page */}
              <p className="hidden text-[11pt] text-ink-faint print:fixed print:bottom-[12mm] print:left-[20mm] print:block">
                Written with Lobola Hub &middot; lobola.dimba.co.za
              </p>
            </article>

            <div className="mt-6 flex flex-wrap gap-3 print:hidden">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(text)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackShare('whatsapp')}
                className={`inline-flex h-[52px] items-center gap-2.5 rounded-md bg-clay px-6 text-lg font-medium text-paper-light transition-colors hover:bg-clay-dark ${focusRing}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z" />
                </svg>
                Send on WhatsApp
              </a>
              <button type="button" onClick={() => {
                  trackShare('print');
                  window.print();
                }} className={secondaryButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9V3h12v6" />
                  <rect x="4" y="9" width="16" height="8" rx="1" />
                  <path d="M7 14h10v7H7z" />
                </svg>
                Print or save as PDF
              </button>
              <button type="button" onClick={copyText} className={secondaryButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="8" y="8" width="12" height="12" rx="2" />
                  <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
                </svg>
                {copyStatus === 'copied' ? 'Copied' : 'Copy text'}
              </button>
            </div>
            <p role="status" className="mt-2 min-h-[1.5em] text-base text-ink-soft print:hidden">
              {copyStatus === 'copied' && 'The letter is copied. Paste it wherever you need it.'}
              {copyStatus === 'failed' && 'Copying did not work on this device. Select the letter and copy it instead.'}
            </p>

            <p className="mt-4 border-t border-rule pt-[18px] text-base leading-[1.55] text-ink-soft print:hidden">
              Before you send it, ask an elder in your family to read it. Families word this letter in their own way, and some prefer it handwritten and delivered in person.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LetterPage;
