const CACHE_NAME = 'starlink-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './icono.png',
    './manifest.json'
];

// Instalar y guardar los archivos en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

// Interceptar peticiones
self.addEventListener('fetch', event => {
    // Si la petición es hacia la API del Dólar, NUNCA usar caché, siempre intentar buscar en internet
    if (event.request.url.includes('dolarapi')) {
        return; 
    }

    // Para el resto de la app (HTML, iconos), responder con el caché si no hay internet
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});
