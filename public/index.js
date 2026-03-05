const form = document.getElementById('uv-form');
const address = document.getElementById('uv-address');
const searchEngine = document.getElementById('uv-search-engine');
const error = document.getElementById('uv-error');
const errorCode = document.getElementById('uv-error-code');
const loadingRing = document.getElementById('loading');

// Initialize the secure tunnel connection
const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    loadingRing.style.display = 'block';
    error.style.display = 'none';
    errorCode.textContent = '';

    try {
        await registerSW();
    } catch (err) {
        loadingRing.style.display = 'none';
        error.style.display = 'block';
        error.textContent = 'Failed to register Service Worker.';
        errorCode.textContent = err.toString();
        throw err;
    }

    const url = search(address.value, searchEngine.value);
    let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
    
    try {
        if (await connection.getTransport() !== "/epoxy/index.mjs") {
            await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
        }
    } catch (err) {
        loadingRing.style.display = 'none';
        error.style.display = 'block';
        error.textContent = 'Failed to connect to the secure tunnel.';
        errorCode.textContent = err.toString();
        throw err;
    }

    // Launch the site
    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
