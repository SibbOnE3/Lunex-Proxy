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
    console.log("🟢 1. Booting the Stealth Router...");
    await registerSW();
    console.log("🟢 2. Router Booted Successfully.");
  } catch (err) {
    loadingRing.style.display = "none";
    if (error) error.style.display = "block";
    if (errorCode) errorCode.textContent = err.toString();
    console.error("🔴 Crash during boot:", err);
    return;
  }

  const url = search(address.value, searchEngine.value);
  const destination = __uv$config.prefix + __uv$config.encodeUrl(url);
  
  console.log("🟢 3. Tunneling traffic to:", destination);
  location.href = destination;
});
