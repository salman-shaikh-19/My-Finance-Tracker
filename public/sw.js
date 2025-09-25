console.log("SW script loaded");
// Install event
self.addEventListener("install", () => {
  self.skipWaiting(); // activate immediately
});

// Activate event
self.addEventListener("activate", () => {
  self.clients.claim(); // take control of all clients
});

