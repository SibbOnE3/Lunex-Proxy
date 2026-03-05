"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const loading = document.getElementById("loading");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  loading.style.display = "block";

  try {
    await registerSW();
  } catch (err) {
    alert("Engine Registration Failed: " + err.message);
    loading.style.display = "none";
    throw err;
  }

  const url = search(address.value, "https://www.google.com/search?q=%s");
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
