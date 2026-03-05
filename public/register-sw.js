"use strict";

async function registerSW() {
  if (!navigator.serviceWorker) {
    throw new Error("Your browser doesn't support service workers.");
  }

  // Register the Service Worker
  await navigator.serviceWorker.register("/uv/sw.js", {
    scope: __uv$config.prefix,
  });

  // Establish the Wisp Transport using the official UV v3 method
  let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
  
  if (await BareMux.getConnectionTransport() !== "/epoxy/index.mjs") {
    await BareMux.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
  }
}
