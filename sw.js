var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
  "/aestimator",
  "/aestimator/js/vendor/jquery-3.4.1.min.js",
  "/aestimator/js/vendor/modernizr-3.8.0.min.js",
  "/aestimator/js/main.js",
  "/aestimator/js/plugins.js",
  "/aestimator/css/master.css",
  "/aestimator/css/normalize.min.css",
];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});
