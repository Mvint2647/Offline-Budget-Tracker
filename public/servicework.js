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

          
