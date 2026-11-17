// Root to tip service worker: precache the app shell so it works offline.
// Bump VERSION whenever any cached file changes, so clients pick up the update.
const VERSION = "r2t-v1";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "fonts/fonts.css",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
  "fonts/atkinson-hyperlegible-076f8fd3.woff2",
  "fonts/atkinson-hyperlegible-135b6111.woff2",
  "fonts/atkinson-hyperlegible-18535fbd.woff2",
  "fonts/atkinson-hyperlegible-2cb978b7.woff2",
  "fonts/atkinson-hyperlegible-386222c8.woff2",
  "fonts/atkinson-hyperlegible-a0b5f6f0.woff2",
  "fonts/bricolage-grotesque-40c2cb34.woff2",
  "fonts/bricolage-grotesque-fdb6b064.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // Pages: network first (fresh content), fall back to cache offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put("index.html", copy)); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }
  // Everything else: cache first.
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
});
