/*
 * Served as /sw.js on the old addresses (lobola.dimba.co.za, and
 * www.lobolahub.co.za, which was briefly the main address). A phone that
 * saved the site there keeps opening its saved copy; when it checks for a
 * new version it gets this worker instead. This worker clears the saved
 * copy, removes itself, and sends every open tab to the same page on
 * lobolahub.co.za. See the rewrites in vercel.json. Keep it until at least
 * May 2027 so returning readers are moved across.
 */
const NEW_ORIGIN = 'https://lobolahub.co.za';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Take over the open tabs, so they can be sent on afterwards
      await self.clients.claim();

      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));

      await self.registration.unregister();

      const tabs = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      await Promise.all(
        tabs.map((tab) => {
          const url = new URL(tab.url);
          return tab.navigate(NEW_ORIGIN + url.pathname + url.search + url.hash).catch(() => {});
        }),
      );
    })(),
  );
});
