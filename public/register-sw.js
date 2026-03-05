"use strict";

async function registerSW() {
    if (!navigator.serviceWorker) {
        throw new Error("Your browser doesn't support service workers.");
    }

    // 1. Boot the Service Worker
    await navigator.serviceWorker.register("/uv/sw.js", { scope: __uv$config.prefix });

    // 2. 💥 THE FIX FOR THE YELLOW ERROR: Open the multiplex port 💥
    const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
    
    // 3. Establish the secure Wisp tunnel
    let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
    await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
}
