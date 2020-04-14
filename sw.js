const filesToCache = [
  "https://amjedidiah.github.io/aestimator",
  "https://amjedidiah.github.io/aestimator/js/vendor/jquery-3.4.1.min.js",
  "https://amjedidiah.github.io/aestimator/js/vendor/modernizr-3.8.0.min.js",
  "https://amjedidiah.github.io/aestimator/js/main.js",
  "https://amjedidiah.github.io/aestimator/js/plugins.js",
  "https://amjedidiah.github.io/aestimator/css/master.css",
  "https://amjedidiah.github.io/aestimator/css/normalize.min.css",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
];
const vNum = Math.floor(Math.random() * 1000000000000) + 1;
const staticCacheName = `aestimator-cache-v${vNum}`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Activating new service worker...");

  const cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
