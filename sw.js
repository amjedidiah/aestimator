const filesToCache = [
  "https://amjedidiah.github.io/aestimator/",
  "https://amjedidiah.github.io/aestimator/js/vendor/jquery-3.4.1.min.js",
  "https://amjedidiah.github.io/aestimator/js/vendor/modernizr-3.8.0.min.js",
  "https://amjedidiah.github.io/aestimator/js/main.js",
  "https://amjedidiah.github.io/aestimator/js/plugins.js",
  "https://amjedidiah.github.io/aestimator/css/master.css",
  "https://amjedidiah.github.io/aestimator/css/normalize.min.css",
];

const staticCacheName = "pages-cache-v1";

self.addEventListener("install", (event) => {
  console.log("Attempting to install service worker and cache static assets");
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});
