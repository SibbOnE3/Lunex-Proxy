"use strict";

async function registerSW() {
  if (!navigator.serviceWorker) {
    throw new Error("Your browser doesn't support service workers.");
  }

  // 💥 THE FIX: Registering the correct master worker, NOT the raw uv worker 💥
  await navigator.serviceWorker.register("/sw.js", {
    scope: __uv$config.prefix,
  });

  const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
  let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
  
  if (await connection.getTransport() !== "/epoxy/index.mjs") {
    await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
  }
}
