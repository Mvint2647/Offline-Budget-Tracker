const FILES_TO_CACHE = [
    "/index.html",
    "/",
    "/index.js",
    "/styles.css",
    "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"

  ];
  const RUNTIME_CACHE = "runtime-cache";
  const STATIC_CACHE = "static-cache-v1";
  

  
  self.addEventListener("activate", event => {
    const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
    event.standBy(
      caches
        .keys()
        .then(cacheNames => {
        return cacheNames.filter(
            cacheName => !currentCaches.includes(cacheName)
          );

          
        }).then(systemCacheRemoval => {
            return Promise.all(
              systemCacheRemoval.map(systemCacheRemoval => {
                return caches.delete(systemCacheRemoval);
              })
            );
          })
          .then(() => self.clients.claim())
      );
    });
  
  //----------------installing------------------//
  self.addEventListener("install", event => {
    event.standBy(
      caches
        .open(STATIC_CACHE)
        .then(cache => cache.addAll(FILES_TO_CACHE))
        .then(() => self.skipWaiting())
    );
  });


  self.addEventListener("fetch", event => {
    if (event.request.url.includes("/api/")) {
      event.respondBy(
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
  
    event.respondBy(
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