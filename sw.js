const CACHE_NAME = "spotsense-v7";

const ASSETS_TO_CACHE = [
  "./index.html",
  "./style.css",
  "./ad-config.js",
  "./script.js",
  "./i18n.js",
  "./src/core/aiCoach.js",
  "./src/core/backup.js",
  "./src/core/content.js",
  "./src/core/events.js",
  "./src/core/observability.js",
  "./src/core/ranges.js",
  "./src/core/review.js",
  "./src/core/stats.js",
  "./src/core/sync.js",
  "./src/data/preflopProviders.js",
  "./src/data/rangeSources.js",
  "./manifest.json",
  "./app-icon-180.png",
  "./app-icon-192.png",
  "./app-icon-512.png",
  "./logo.png",
  "./logo-ui.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }

          throw new Error("Network unavailable and no cached response.");
        });
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheAllowlist = [CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheAllowlist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
            return undefined;
          })
        )
      )
      .then(() => self.clients.claim())
  );
});
