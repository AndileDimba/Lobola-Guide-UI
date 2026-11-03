import { zuluData } from './data/zulu';
import { faqs } from './data/faq';
import type { PageSeo } from './data/types';

/**
 * What each page tells search engines and link previews: its title,
 * description, the one address it should be known by, and structured data.
 * The build writes this into every page's HTML (see scripts/prerender.ts),
 * and PageHead keeps it up to date as the reader moves around the site.
 */

export const SITE_URL = 'https://lobola.dimba.co.za';
export const SITE_NAME = 'Lobola Hub';

const GUIDE_PATH = '/guide/zulu';
const CATTLE_PATH = `${GUIDE_PATH}/cattle`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface PageHead {
  title: string;
  description: string;
  // The address search engines should list; missing for the not-found page
  canonical?: string;
  noindex?: boolean;
  jsonLd: object[];
}

const pages: Record<string, PageSeo> = {
  '/': {
    title: `${SITE_NAME} | Zulu Lobola Guide in English and isiZulu`,
    description:
      'Every stage of Zulu lobola, from the first letter to the wedding day. In English and isiZulu.',
  },
  [GUIDE_PATH]: {
    title: 'Zulu Lobola Guide: Every Stage, Step by Step',
    description:
      'Follow Zulu lobola stage by stage: the letter, the abakhongi, umcelo, umembeso, seeing the cattle, umbondo and the wedding day.',
  },
  [CATTLE_PATH]: {
    title: 'How Many Cows for Zulu Lobola? The Eleven Cattle Explained',
    description:
      'Zulu lobola is customarily eleven cattle, each with a name and a meaning. Which six are the cattle of the ancestors, which five Shepstone added, and who each one honours.',
  },
  '/letter': {
    title: 'Write a Lobola Letter in English or isiZulu',
    description:
      "Answer a few questions and get the letter that asks the bride's family for a day to visit, worded in English or isiZulu. Print it, copy it or send it on WhatsApp.",
  },
  '/faq': {
    title: 'Lobola Questions and Answers',
    description:
      'Money or cows, how much lobola is, whether the groom goes to the negotiations, and what to do when a father has passed or you live abroad.',
  },
};

const notFound: PageSeo = {
  title: 'Page Not Found',
  description: 'This page is not here. The Zulu lobola guide, the letter builder and the FAQ are a click away.',
};

const stagePath = (id: string) => `${GUIDE_PATH}/${id}`;

/** Every page worth listing in the sitemap and drawing at build time */
export const PAGE_PATHS = [
  '/',
  GUIDE_PATH,
  ...zuluData.steps.map((step) => stagePath(step.id)),
  CATTLE_PATH,
  '/letter',
  '/faq',
];

const withSiteName = (title: string) =>
  title.startsWith(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

const publisher = { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` };

const article = (headline: string, description: string, url: string, images: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description,
  url,
  mainEntityOfPage: url,
  image: images,
  inLanguage: 'en',
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
  author: publisher,
  publisher,
});

const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    item: SITE_URL + crumb.path,
  })),
});

// Answers are plain text with "• " lists; search engines take them as they are
const faqPage = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

export const pageHead = (pathname: string): PageHead => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const home = { name: 'Home', path: '/' };
  const guide = { name: 'Zulu lobola guide', path: GUIDE_PATH };

  const page = pages[path];
  if (page) {
    const jsonLd: object[] = [];
    if (path === GUIDE_PATH) jsonLd.push(breadcrumbs([home, guide]));
    if (path === '/faq') jsonLd.push(faqPage(), breadcrumbs([home, { name: 'FAQ', path }]));
    if (path === '/letter') jsonLd.push(breadcrumbs([home, { name: 'Letter builder', path }]));
    if (path === CATTLE_PATH) {
      jsonLd.push(
        article(page.title, page.description, SITE_URL + path, [OG_IMAGE]),
        breadcrumbs([home, guide, { name: 'The eleven cattle', path }]),
      );
    }
    return { title: withSiteName(page.title), description: page.description, canonical: SITE_URL + path, jsonLd };
  }

  const step = zuluData.steps.find((s) => stagePath(s.id) === path);
  if (step) {
    const seo = step.seo ?? { title: step.title, description: step.summary ?? step.title };
    const url = SITE_URL + path;
    const name = step.zuluTitle ? `${step.zuluTitle} (${step.title})` : step.title;
    return {
      title: withSiteName(seo.title),
      description: seo.description,
      canonical: url,
      jsonLd: [
        article(seo.title, seo.description, url, step.media?.src ? [SITE_URL + step.media.src, OG_IMAGE] : [OG_IMAGE]),
        breadcrumbs([home, guide, { name, path }]),
      ],
    };
  }

  return { title: withSiteName(notFound.title), description: notFound.description, noindex: true, jsonLd: [] };
};

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// A "<" inside the data could close the script element early
export const jsonLdText = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c');

/** The page's own head tags, as HTML, for the build to write into each page */
export const headHtml = (head: PageHead) => {
  const title = escapeHtml(head.title);
  const description = escapeHtml(head.description);
  const lines = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    head.noindex ? '<meta name="robots" content="noindex" />' : '',
    head.canonical ? `<link rel="canonical" href="${head.canonical}" />` : '',
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    head.canonical ? `<meta property="og:url" content="${head.canonical}" />` : '',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    ...head.jsonLd.map((data) => `<script type="application/ld+json" data-page>${jsonLdText(data)}</script>`),
  ];
  return lines.filter(Boolean).join('\n    ');
};
