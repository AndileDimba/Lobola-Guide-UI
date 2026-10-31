import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
        // Every route is the same page, so any address opens offline
        navigateFallback: '/index.html',
        // Vercel's own paths, such as analytics, are not pages
        navigateFallbackDenylist: [/^\/_vercel\//],
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
  ],
})
