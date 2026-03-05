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
  error.style.display = "none";
  errorCode.textContent = "";

  try {
    await registerSW();
  } catch (err) {
    loadingRing.style.display = "none";
    error.style.display = "block";
    error.textContent = "Failed to register Service Worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
