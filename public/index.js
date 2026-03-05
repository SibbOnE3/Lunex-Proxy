"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");
const loadingRing = document.getElementById("loading");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  loadingRing.style.display = "block";
  if (error) error.style.display = "none";
  if (errorCode) errorCode.textContent = "";

  try {
    await registerSW();
    
    // 💥 CRITICAL FIX: Do not load the site until the Service Worker is fully ready 💥
    await navigator.serviceWorker.ready;
    
  } catch (err) {
    loadingRing.style.display = "none";
    if (error) error.style.display = "block";
    if (errorCode) errorCode.textContent = err.toString();
    return;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
