const form = document.getElementById('uv-form');
const address = document.getElementById('uv-address');
const searchEngine = document.getElementById('uv-search-engine');
const error = document.getElementById('uv-error');
const errorCode = document.getElementById('uv-error-code');
const loadingRing = document.getElementById('loading');

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    // Show the Lunex loading ring and hide any old errors
    loadingRing.style.display = 'inline-block';
    error.style.display = 'none';
    errorCode.textContent = '';

    try {
        await registerSW();
    } catch (err) {
        // If the engine fails to boot, show the error cleanly
        loadingRing.style.display = 'none';
        error.style.display = 'block';
        error.textContent = 'Failed to boot the Lunex Stealth Engine.';
        errorCode.textContent = err.toString();
        throw err;
    }

    const url = search(address.value, searchEngine.value);
    
    // Route the traffic through the engine
    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
