import { Link } from 'react-router-dom';
import { zuluData } from '../data/zulu';
import type { GuideArticle } from '../data/types';
import BeadBand from '../components/UI/BeadBand';
import Suggestions from '../components/UI/Suggestions';
import { Blocks, PassageSection } from '../components/UI/Blocks';

const eyebrow = 'text-[13px] font-medium uppercase leading-snug tracking-[0.16em]';

/**
 * A guide page that explains one subject in depth, laid out like a stage
 * chapter: the same column, type and bead bands, without the journey.
 */
const GuideArticlePage = ({ article }: { article: GuideArticle }) => {
  const { theme } = zuluData;

  return (
    <div className="flex flex-1 flex-col bg-paper font-reading text-lg leading-[1.65] text-ink lg:text-xl lg:leading-[1.7]">
      <BeadBand colors={theme.beads} />

      <div className="mx-auto w-full max-w-[1120px] flex-1 px-5 pb-10 pt-9 lg:px-8 lg:pt-14">
        {/* The same reading column as a stage, where the journey would sit beside it */}
        <article className="min-w-0 max-w-[660px] lg:ml-[312px]">
          <p className={`mb-3 lg:mb-3.5 ${eyebrow} ${theme.accent}`}>Zulu guide</p>
          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.01em] lg:text-[4rem]">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="mt-2.5 font-display text-2xl leading-[1.3] text-ink-soft lg:mt-3.5 lg:text-[1.75rem]">
              {article.subtitle}
            </p>
          )}

          <div className="mt-7 lg:mt-8">
            <Blocks blocks={article.intro} lede />
          </div>

          {article.sections.map((section) => (
            <PassageSection key={section.title} passage={section} />
          ))}

          <nav aria-label="More in the guide" className="mt-11 lg:mt-16">
            <Link
              to="/guide/zulu/cattle"
              className="group block border-t-2 border-ink-deep pb-[22px] pt-[18px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:pb-7 lg:pt-5"
            >
              <span className={`flex items-center gap-2 text-ink-soft ${eyebrow}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5" />
                  <path d="M11 6l-6 6 6 6" />
                </svg>
                Back to
              </span>
              <span className="mt-1.5 block font-display text-2xl font-semibold leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 lg:mt-2 lg:text-[1.625rem]">
                The eleven cattle
              </span>
            </Link>
          </nav>

          <Suggestions subject={article.title} />
        </article>
      </div>

      <BeadBand colors={theme.beads} />
    </div>
  );
};

export default GuideArticlePage;
