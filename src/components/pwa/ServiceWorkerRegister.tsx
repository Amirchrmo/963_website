'use client';

import { useEffect } from 'react';

/**
 * Registers the service worker (`/sw.js`) once the window has loaded.
 * Runs only in production (non-localhost) to avoid caching stale assets
 * during development. On update, it silently activates the new SW so the
 * next reload is fresh.
 *
 * In development / localhost we *unregister* any existing service workers.
 * Stale production SWs left behind on localhost can intercept navigation
 * and internal browser requests (e.g. DevTools' `/.well-known/...` JSON),
 * which is the cause of the 10-second stalls seen on route changes.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    const isDev =
      process.env.NODE_ENV !== 'production' ||
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1';

    if (isDev) {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => {
          for (const reg of regs) {
            // eslint-disable-next-line no-console
            console.info('Unregistering stale service worker:', reg.scope);
            void reg.unregister();
          }
        })
        .catch(() => {
          /* ignore */
        });
      return;
    }

    const register = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          // Listen for new versions.
          reg.addEventListener('updatefound', () => {
            const installing = reg.installing;
            if (!installing) return;
            installing.addEventListener('statechange', () => {
              if (
                installing.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                // A new SW has finished installing and an old one is active.
                // Activate immediately so the next navigation is fresh.
                installing.postMessage?.({ type: 'SKIP_WAITING' });
              }
            });
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn('SW registration failed:', err);
        });
    };

    if (document.readyState === 'complete') {
      register();
    } else {
      window.addEventListener('load', register, { once: true });
      return () => window.removeEventListener('load', register);
    }
  }, []);

  return null;
}
