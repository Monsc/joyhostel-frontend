const lang = navigator.language.startsWith("zh") ? "zh" : "en";
window.__lang = lang;
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".text, .nav-link").forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
    const ph = el.getAttribute(`data-${lang}-placeholder`);
    if (ph) el.placeholder = ph;
  });
});