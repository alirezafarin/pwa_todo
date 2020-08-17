const STATIC_CACHE = 'static-v11';
const DYNAMIC_CACHE = 'dynamic-v14';

let assets = [
  '/',
  '/index.html',
  '/fallback.html',
  '/styles/mainStyles.css',
  '/node_modules/persian-date/dist/persian-date.js',
  '/js/animation.js',
  '/js/app.js',
  '/js/dataBase.js',
  '/js/setTime.js',
  '/js/ui.js',
  '/js/calendar.js',
  'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
  'https://use.fontawesome.com/releases/v5.0.13/webfonts/fa-regular-400.woff'
];

const cleanUpCache = (cacheName, maxSize) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if( keys.length > maxSize ) {
        console.log('Deleting Caches');
        cache.delete(keys[0]).then(cleanUpCache(cacheName, maxSize));
      }
    })
  })
}

//install Event
self.addEventListener('install', function(e) {
  console.log('ServiceWorker Installed Successfully ...', e);
  e.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      cache.addAll(assets);
    })
  );
});


//activate Event 
self.addEventListener('activate', function(e) {
  console.log('ServiceWorker activated ...', e);
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if( key !== STATIC_CACHE && key !== DYNAMIC_CACHE ) {
          caches.delete(key);
        }
      }));
    })
  )
});


//fetch Event
self.addEventListener('fetch', function(e) {
  //don't cache anything from firebase firestore
  if( e.request.url.indexOf('firestore.googleapis.com') === -1 ){
    e.respondWith(
      caches.match(e.request).then((response) => {
        if( response ) {
          return response;
        }
        else {
          return fetch(e.request)
          .then((res) => {
            //dynamic catching
            return caches.open(DYNAMIC_CACHE).then((cache) => {
              cleanUpCache(DYNAMIC_CACHE, 10);
              cache.put(e.request.url, res.clone());
              return res;
            });
          })
        }
      }).catch(() => {
        if( e.request.url.indexOf('.html') > -1 ) {
          return caches.match('/fallback.html');
        }
      })
    );
  }
})

// self.addEventListener('notificationclick', (e) => {
//   let notification = e.notification;
//   let action = e.action;
//   if( action === 'confirm' ) {
//     console.log('Confirm');
//     notification.close();
//   }
//   else {
//     notification.close();
//   }
// });

// self.addEventListener('notificationclose', (e) => {
//   console.log('CLOSED', e);
// })