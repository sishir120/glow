const CACHE_NAME = 'glowup-hub-v1';

self.addEventListener('install', (event) => {
    // console.log('Service Worker: Installed');
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    // console.log('Service Worker: Activated');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Basic fetch handler needed for PWA installability
    // We can add caching strategies here later
    // For now, network first is safest to avoid stale content issues
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
