import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

// While the site is open, look for a new version this often
const CHECK_EVERY_MS = 60 * 60 * 1000;

/**
 * The site is kept on the phone, so a new version waits until the reader
 * says so. This bar offers it, and says once when the site first works
 * offline.
 */
const UpdatePrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      if (!registration) return;
      setInterval(() => {
        if (navigator.onLine) registration.update();
      }, CHECK_EVERY_MS);
    },
  });

  // The offline note is news, not a question: it goes away on its own
  useEffect(() => {
    if (!offlineReady) return;
    const timer = setTimeout(() => setOfflineReady(false), 6000);
    return () => clearTimeout(timer);
  }, [offlineReady, setOfflineReady]);

  if (!needRefresh && !offlineReady) return null;

  const close = () => {
    setNeedRefresh(false);
    setOfflineReady(false);
  };

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 font-reading print:hidden"
    >
      <div className="mx-auto flex max-w-[640px] flex-wrap items-center gap-x-5 gap-y-3 rounded-md bg-ink-deep px-5 py-4 text-[17px] text-paper-light shadow-lg">
        <p className="flex-1 basis-[220px]">
          {needRefresh
            ? 'A new version of Lobola Hub is ready.'
            : 'Lobola Hub now works without a connection.'}
        </p>
        <div className="flex gap-3">
          {needRefresh && (
            <button
              type="button"
              onClick={() => updateServiceWorker()}
              className="min-h-11 rounded-md bg-clay px-5 font-medium transition-colors hover:bg-clay-dark"
            >
              Refresh
            </button>
          )}
          <button
            type="button"
            onClick={close}
            className="min-h-11 rounded-md border-[1.5px] border-paper-light/60 px-5 transition-colors hover:bg-paper-light hover:text-ink-deep"
          >
            {needRefresh ? 'Later' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePrompt;
