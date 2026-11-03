import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jsonLdText, pageHead } from '../../seo';

// Find a head tag, making it if this page does not have one yet
const headTag = (selector: string, make: () => HTMLElement) => {
  let tag = document.head.querySelector<HTMLElement>(selector);
  if (!tag) {
    tag = make();
    document.head.appendChild(tag);
  }
  return tag;
};

const setMeta = (attr: 'name' | 'property', key: string, content?: string) => {
  const selector = `meta[${attr}="${key}"]`;
  if (content === undefined) {
    document.head.querySelector(selector)?.remove();
    return;
  }
  headTag(selector, () => {
    const meta = document.createElement('meta');
    meta.setAttribute(attr, key);
    return meta;
  }).setAttribute('content', content);
};

/**
 * Each page arrives with its own title, description and structured data
 * written in at build time. Moving to another page inside the site does not
 * fetch new HTML, so this brings the head along with it.
 */
const PageHead = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = pageHead(pathname);
    document.title = head.title;
    setMeta('name', 'description', head.description);
    setMeta('name', 'robots', head.noindex ? 'noindex' : undefined);
    setMeta('property', 'og:title', head.title);
    setMeta('property', 'og:description', head.description);
    setMeta('property', 'og:url', head.canonical);
    setMeta('name', 'twitter:title', head.title);
    setMeta('name', 'twitter:description', head.description);

    if (head.canonical) {
      headTag('link[rel="canonical"]', () => {
        const link = document.createElement('link');
        link.rel = 'canonical';
        return link;
      }).setAttribute('href', head.canonical);
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove();
    }

    document.head.querySelectorAll('script[data-page]').forEach((script) => script.remove());
    for (const data of head.jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.page = '';
      script.textContent = jsonLdText(data);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
};

export default PageHead;
