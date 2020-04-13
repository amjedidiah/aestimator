var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
  "/",
  "./js/vendor/jquery-3.4.1.min.js",
  "./js/vendor/modernizr-3.8.0.min.js",
  "./js/main.js",
  "./js/plugins.js",
  "./css/master.css",
  "./css/normalize.min.css",
];

self.addEventListener("install", (event) =>
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  )
);

self.addEventListener("fetch", (event) =>
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(event.request, responseToCache));

        return response;
      });
    })
  )
);

// self.addEventListener("activate", (event) => {
//   var cacheWhitelist = ["pages-cache-v1", "blog-posts-cache-v1"];

//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map( (cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       )
//     )
//   );
// });
