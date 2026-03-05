"use strict";

async function registerSW() {
  if (!navigator.serviceWorker) {
    throw new Error("Your browser doesn't support service workers.");
  }

  // Register the Service Worker
  await navigator.serviceWorker.register("/uv/sw.js", {
    scope: __uv$config.prefix,
  });

  // 💥 THE FIX: Properly initialize the BareMux connection before checking transport 💥
  const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
  let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
  
  if (await connection.getTransport() !== "/epoxy/index.mjs") {
    await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
  }
}
