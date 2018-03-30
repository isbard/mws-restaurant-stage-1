//Install the service worker and cache the static assets 
//that the site needs
self.addEventListener('install', event => {
    console.log('installing');
    event.waitUntil(
        caches.open('static-assets').then(cache => {
            return cache.addAll([
                '../css/styles.css',
                '../js/main.js',
                '../js/restaurant_info.js',
                '../js/dbhelper.js',
                '../data/restaurants.json',
                '../index.html',
                '../restaurant.html'
            ]);
        })
    )
});

self.addEventListener('activate', event =>{
    console.log('activating');
});

//When a fetch occurs check the cache, run the fetch from the
//network if it's not found in the cache
self.addEventListener('fetch', event =>{
    event.respondWith(
        caches.match(event.request).then(response => {
            console.log('looking in the cache');
            return response || fetch(event.request);
        }).catch( () =>{
            //return new Response('Oh Dear')
        })
    );
});