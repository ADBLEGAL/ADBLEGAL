(function () {
  var STORAGE_KEY = "adb-lang";

  function applyLanguage(lang) {
    document.querySelectorAll("[data-en]").forEach(function (el) {
      if (el.dataset.nl === undefined) {
        el.dataset.nl = el.textContent;
      }
      el.textContent = lang === "en" ? el.dataset.en : el.dataset.nl;
    });

    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable, language just won't persist */
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var saved = "nl";
    try {
      saved = localStorage.getItem(STORAGE_KEY) || "nl";
    } catch (e) {
      /* localStorage unavailable, default to nl */
    }

    applyLanguage(saved);

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLanguage(btn.dataset.lang);
      });
    });
  });
})();
