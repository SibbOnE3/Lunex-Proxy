"use strict";

async function registerSW() {
  if (!navigator.serviceWorker) {
    throw new Error("Your browser doesn't support service workers.");
  }

  // 💥 THE FIX: Pointing back to the correct path that actually exists 💥
  await navigator.serviceWorker.register("/uv/sw.js", {
    scope: __uv$config.prefix,
  });

  // Open the multiplex port and establish the tunnel
  const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
  let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
  
  if (await connection.getTransport() !== "/epoxy/index.mjs") {
    await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
  }
}
