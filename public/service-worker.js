const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/index.js",
  "styles.css",
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"
];

const STATIC_CACHE = "static-cache-v1";
const RUNTIME_CACHE = "runtime-cache";

self.addEventListener("install", event => {
  event.waitUntil(
      caches
          .open(STATIC_CACHE)
          .then(cache => cache.addAll(FILES_TO_CACHE))
          .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
  event.waitUntil(
      caches
          .keys()
          .then(cacheNames => {
              return cacheNames.filter(
                  cacheName => !currentCaches.includes(cacheName)
              );
          })
          .then(cachesToDelete => {
              return Promise.all(
                  cachesToDelete.map(cacheToDelete => {
                      return caches.delete(cacheToDelete);
                  })
              );
          })
          .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.url.includes("/api/")) {
      event.respondWith(
          caches.open(RUNTIME_CACHE).then(cache => {
              return fetch(event.request)
                  .then(response => {
                      cache.put(event.request, response.clone());
                      return response;
                  })
                  .catch(() => caches.match(event.request));
          })
      );
      return;
  }

  event.respondWith(
      caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
              return cachedResponse;
          }
          return caches.open(RUNTIME_CACHE).then(cache => {
              return fetch(event.request).then(response => {
                  return cache.put(event.request, response.clone()).then(() => {
                      return response;
                  });
              });
          });
      })
  );
});