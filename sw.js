const CACHE_NAME = 'arabe-v3'; // Passez à v3, v4, etc., à chaque mise à jour
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Installation : on télécharge les fichiers dans le cache du téléphone
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activation : on nettoie les anciens caches si besoin
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch : priorité au cache pour une vitesse maximale (Offline First)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});