import { readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import type { Plugin } from 'vite'
import { SITE_HOST, SITE_URL } from '../src/site'

// Where the service worker keeps working: the site itself, and local testing
const KEEP_HOSTS = [SITE_HOST, 'localhost', '127.0.0.1']

/**
 * The service worker's first lines. On any other host (lobola.dimba.co.za,
 * or www.lobolahub.co.za, briefly the main address) it skips Workbox, which
 * would load its files from that host and be redirected, and instead clears
 * the saved copy, removes itself and sends open tabs to the same page on
 * SITE_URL. Keep this until at least May 2027 so returning readers are
 * moved across.
 */
const guard = (workbox: string) => `if (!${JSON.stringify(KEEP_HOSTS)}.includes(self.location.hostname)) {
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
      // Take over the open tabs, so they can be sent on afterwards
      await self.clients.claim();
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
      await self.registration.unregister();
      const tabs = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      await Promise.all(tabs.map((tab) => {
        const url = new URL(tab.url);
        return tab.navigate(${JSON.stringify(SITE_URL)} + url.pathname + url.search + url.hash).catch(() => {});
      }));
    })());
  });
} else {
${workbox}
}
`

/**
 * Wraps the service worker that vite-plugin-pwa writes, so it retires itself
 * on every host but the site's own. Runs after VitePWA has written sw.js.
 */
export const retireOtherHosts = (): Plugin => {
  let outDir = ''
  let ssr = false

  return {
    name: 'lobola-retire-other-hosts',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
      ssr = !!config.build.ssr
    },
    closeBundle: {
      order: 'post',
      sequential: true,
      async handler() {
        if (ssr) return
        const file = join(outDir, 'sw.js')
        const workbox = await readFile(file, 'utf8')
        if (!workbox.includes('self.define')) {
          throw new Error('dist/sw.js does not look like the Workbox service worker')
        }
        await writeFile(file, guard(workbox))
      },
    },
  }
}
