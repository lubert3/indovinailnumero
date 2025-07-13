const CACHE_NAME = "scatola-nera-v1";
const URLS_TO_CACHE = [
    "index.html",
    "manifest.json",
    "service-worker.js",
    "icons/icon-192.png",
    "icons/icon-512.png"
];

// Installa il Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Attiva il Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            )
        )
    );
});

// Gestione delle richieste fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});