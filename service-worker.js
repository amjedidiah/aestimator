// var CACHE_NAME = "my-site-cache-v2";
// var urlsToCache = ["./", "css", "js", "img"];

// self.addEventListener("install", function (event) {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

//! self.addEventListener("fetch", function (event) {
//!   event.respondWith(
//!     caches.match(event.request).then(function (response) {
//!       //! Cache hit - return response
//!       if (response) {
//!         return response;
//!       }

//!       return fetch(event.request).then(function (response) {
//!         //! Check if we received a valid response
//!         if (!response || response.status !== 200 || response.type !== "basic") {
//!           return response;
//!         }

//!         //! IMPORTANT: Clone the response. A response is a stream
//!         //! and because we want the browser to consume the response
//!         //! as well as the cache consuming the response, we need
//!         //! to clone it so we have two streams.
//!         var responseToCache = response.clone();

//!         caches.open(CACHE_NAME).then(function (cache) {
//!           cache.put(event.request, responseToCache);
//!         });

//!         return response;
//!       });
//!     })
//!   );
//! });

// self.addEventListener("activate", function (event) {
//   var cacheWhitelist = ["pages-cache-v2", "blog-posts-cache-v2"];

//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

var CACHE_VERSION = 1;
var CURRENT_CACHES = {
  prefetch: "prefetch-cache-v" + CACHE_VERSION,
  font: "font-cache-v" + CACHE_VERSION,
};

self.addEventListener("install", function (event) {
  var urlsToPrefetch = ["./", "css", "js", "img"];

  console.log(
    "Handling install event. Resources to pre-fetch:",
    urlsToPrefetch
  );

  event.waitUntil(
    caches
      .open(CURRENT_CACHES["prefetch"])
      .then(function (cache) {
        return cache
          .addAll(
            urlsToPrefetch.map(function (urlToPrefetch) {
              return new Request(urlToPrefetch, { mode: "no-cors" });
            })
          )
          .then(function () {
            console.log("All resources have been fetched and cached.");
          });
      })
      .catch(function (error) {
        console.error("Pre-fetching failed:", error);
      })
  );
});

self.addEventListener("activate", function (event) {
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
    return CURRENT_CACHES[key];
  });

  // Active worker won't be treated as activated until promise resolves successfully.
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (expectedCacheNames.indexOf(cacheName) == -1) {
            console.log("Deleting out of date cache:", cacheName);

            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log("Handling fetch event for", event.request.url);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CURRENT_CACHES["prefetch"]).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );

  // event.respondWith(
  //   // Opens Cache objects that start with 'font'.
  //   caches.open(CURRENT_CACHES["font"]).then(function (cache) {
  //     return cache
  //       .match(event.request)
  //       .then(function (response) {
  //         if (response) {
  //           console.log(" Found response in cache:", response);

  //           return response;
  //         }
  //       })
  //       .catch(function (error) {
  //         // Handles exceptions that arise from match() or fetch().
  //         console.error("  Error in fetch handler:", error);

  //         throw error;
  //       });
  //   })
  // );
});
