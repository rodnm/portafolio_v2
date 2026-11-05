// portafolio_v1 used to live at this origin's root and registered a service worker here
// (scope "/") that precached its pages. Browsers that still run it fetch this script on
// their next update check: it deletes that worker's caches, unregisters itself and
// reloads open tabs, so returning visitors get this site from the network.
// This site never registers a service worker of its own.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Workbox suffixes its cache names with the registration scope, so caches of
      // portafolio_v1 under /portafolio_v1/ are left alone.
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.endsWith(self.registration.scope))
          .map((key) => caches.delete(key)),
      );
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: "window" });
      await Promise.all(windows.map((client) => client.navigate(client.url)));
    })(),
  );
});
