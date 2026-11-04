import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { prerender } from './scripts/prerender'
import { retireOtherHosts } from './scripts/retire-other-hosts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Each page is written out already drawn, for search engines and link
    // previews. Must come before VitePWA, which then keeps every page.
    prerender(),
    // A service worker that keeps the whole site on the phone, so the guide,
    // its pictures and the letter builder open with no signal. New versions
    // wait for the reader to accept them (see UpdatePrompt).
    VitePWA({
      registerType: 'prompt',
      // The manifest is public/site.webmanifest, already linked in index.html
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}'],
        // The link-preview image is for other sites, never shown here
        globIgnores: ['og-image.png'],
        // Each page is kept as its own file (faq.html for /faq), and the
        // service worker finds it by adding .html. Any other address shows
        // the not-found page, offline too.
        navigateFallback: '/404.html',
        // No page uses query parameters, so /faq?anything is still faq.html
        // (by default only utm_ and fbclid are ignored)
        ignoreURLParametersMatching: [/.*/],
        // Vercel's own paths, such as analytics, are not pages, and neither
        // are files such as sitemap.xml and robots.txt
        navigateFallbackDenylist: [/^\/_vercel\//, /\.[a-z0-9]+$/i],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
    // On the old addresses the service worker clears itself and moves the
    // reader to lobolahub.co.za. Must come after VitePWA, which writes sw.js.
    retireOtherHosts(),
  ],
})
