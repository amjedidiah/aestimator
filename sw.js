const filesToCache = [
  "https://amjedidiah.github.io/aestimator",
  "https://amjedidiah.github.io/aestimator/js/vendor/jquery-3.4.1.min.js",
  "https://amjedidiah.github.io/aestimator/js/vendor/modernizr-3.8.0.min.js",
  "https://amjedidiah.github.io/aestimator/js/main.js",
  "https://amjedidiah.github.io/aestimator/js/plugins.js",
  "https://amjedidiah.github.io/aestimator/css/master.css",
  "https://amjedidiah.github.io/aestimator/css/normalize.min.css",
];

const staticCacheName = "pages-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .then((response) => {
        // TODO 5 - Respond with custom 404 page
        return caches.open(staticCacheName).then((cache) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
      .catch((error) => {
        // TODO 6 - Respond with custom offline page
      })
  );
});
