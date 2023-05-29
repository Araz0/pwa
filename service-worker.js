// Cache Strategy - Cache necessary files
const CACHE_NAME = 'social-media-analyzer-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

self.addEventListener('install', function(event) {
  // Perform installation and caching
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Serve cached files if available, otherwise fetch from the network
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Messaging - Communication between Service Worker and windows/tabs
self.addEventListener('message', function(event) {
    if (event.data === 'ping') {
      event.source.postMessage('pong');
    }
});
  