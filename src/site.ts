/**
 * The site's own address. Canonical URLs, link previews, structured data,
 * the sitemap, robots.txt and the printed letter all take it from here, so a
 * new domain is a change to this one line.
 */
export const SITE_URL = 'https://lobolahub.co.za';

/** The logo search engines show for the site */
export const SITE_LOGO = `${SITE_URL}/icon-512.png`;

/**
 * Other places that speak for Lobola Hub, such as the LinkedIn launch post.
 * Given to search engines as the organisation's sameAs.
 */
export const SAME_AS: string[] = [];

/** The address as people write it, without https:// */
export const SITE_HOST = new URL(SITE_URL).host;
