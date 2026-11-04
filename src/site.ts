/**
 * The site's own address. Canonical URLs, link previews, structured data,
 * the sitemap, robots.txt and the printed letter all take it from here, so a
 * new domain is a change to this one line.
 */
export const SITE_URL = 'https://lobolahub.co.za';

/** The address as people write it, without https:// */
export const SITE_HOST = new URL(SITE_URL).host;
