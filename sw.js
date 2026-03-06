/**
 * ISONOMIA Service Worker
 * Enables offline functionality and caching
 * @version 1.0.0
 */

const CACHE_NAME = 'isonomia-v1.0.0';
const STATIC_CACHE = 'isonomia-static-v1';
const DYNAMIC_CACHE = 'isonomia-dynamic-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index_psychological_judo.html',
  '/anime.umd.min.js',
  '/manifest.json',
  '/AGENTS.md',
  // Icons
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/favicon-32x32.png',
  '/icons/favicon-16x16.png',
  '/icons/apple-touch-icon.png'
];

// External resources with CORS
const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500&display=swap',
  'https://unpkg.com/three@0.160.0/build/three.min.js'
];

// ==================================================================
// INSTALL EVENT
// ==================================================================
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[SW] Cache failed:', err);
      })
  );
});

// ==================================================================
// ACTIVATE EVENT
// ==================================================================
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => {
              return name.startsWith('isonomia-') && 
                     name !== STATIC_CACHE && 
                     name !== DYNAMIC_CACHE;
            })
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activated');
        return self.clients.claim();
      })
  );
});

// ==================================================================
// FETCH EVENT
// ==================================================================
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Strategy: Cache First for static assets
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Strategy: Stale While Revalidate for API calls
  if (isAPI(request)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
  
  // Strategy: Network First for HTML pages
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Default: Network with cache fallback
  event.respondWith(networkWithCacheFallback(request));
});

// ==================================================================
// CACHING STRATEGIES
// ==================================================================

/**
 * Cache First Strategy
 * Used for: JS, CSS, Icons, Fonts
 */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    // Return offline fallback if available
    return caches.match('/offline.html');
  }
}

/**
 * Network First Strategy
 * Used for: HTML pages
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, using cache');
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    // Fallback to index
    return caches.match('/index_psychological_judo.html');
  }
}

/**
 * Stale While Revalidate Strategy
 * Used for: API calls
 */
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request)
    .then(response => {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  
  return cached || fetchPromise;
}

/**
 * Network with Cache Fallback
 * Default strategy
 */
async function networkWithCacheFallback(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// ==================================================================
// HELPERS
// ==================================================================

function isStaticAsset(url) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.svg', '.woff', '.woff2'];
  return staticExtensions.some(ext => url.pathname.endsWith(ext));
}

function isAPI(request) {
  return request.url.includes('/api/') || request.url.includes('unpkg.com');
}

// ==================================================================
// BACKGROUND SYNC (Optional)
// ==================================================================
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Implement background sync logic here
  console.log('[SW] Background sync executed');
}

// ==================================================================
// PUSH NOTIFICATIONS (Optional)
// ==================================================================
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: data.url,
    actions: [
      {
        action: 'open',
        title: 'Öffnen'
      },
      {
        action: 'close',
        title: 'Schließen'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});

// ==================================================================
// MESSAGE HANDLING (Communication with main thread)
// ==================================================================
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(names => {
        return Promise.all(names.map(name => caches.delete(name)));
      })
    );
  }
});

console.log('[SW] Service Worker loaded');
