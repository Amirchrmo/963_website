/* eslint-disable no-restricted-globals */
/**
 * 963 Running Club — Service Worker
 *
 * Strategy:
 *  - Precache the app shell + critical icons at install.
 *  - Navigation (HTML) requests: network-first (falls back to cached shell
 *    so the app boots offline).
 *  - Static assets (JS/CSS/fonts/images): stale-while-revalidate for instant
 *    loads and background freshness.
 *  - Bypass everything that isn't a GET or that comes from another origin
 *    (analytics, etc.) so we never break cross-origin requests.
 */

const VERSION = 'v1.0.0';
const PRECACHE = `963-precache-${VERSION}`;
const RUNTIME = `963-runtime-${VERSION}`;
const APP_SHELL = '/';

const PRECACHE_URLS = [
  '/',
  '/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/maskable-512x512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![PRECACHE, RUNTIME].includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Allow the page to ask the new SW to activate immediately.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle same-origin GET requests.
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never intercept internal browser/dev-tool requests; let the browser handle
  // them directly. Intercepting these can cause multi-second stalls before a 404.
  if (url.pathname.startsWith('/.well-known/')) return;

  // --- Navigation (HTML) requests: network-first ---
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || (await caches.match(APP_SHELL)) || Response.error();
        })
    );
    return;
  }

  // --- Static assets: stale-while-revalidate ---
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          // Only cache valid same-origin responses.
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(RUNTIME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
