/* =========================================================
   main.js: shared behaviour for every page
   - toast messages (used for demo-only features)
   - [data-demo] buttons explain what they would do
   - back-to-top button
   - safe localStorage helper
   - scroll reveal animation
   ========================================================= */
(function () {
  "use strict";
  var AT = (window.AT = window.AT || {});
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  AT.reduceMotion = reduceMotion;

  /* ---------- Toasts ---------- */
  function toastArea() {
    var area = document.getElementById("toast-area");
    if (!area) {
      area = document.createElement("div");
      area.id = "toast-area";
      area.className = "toast-container position-fixed bottom-0 end-0 p-3";
      area.setAttribute("aria-live", "polite");
      document.body.appendChild(area);
    }
    return area;
  }
  AT.toast = function (message, title, icon) {
    var el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.innerHTML =
      '<div class="toast-header"><i class="bi me-2 text-primary"></i><strong class="me-auto"></strong>' +
      '<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div>' +
      '<div class="toast-body"></div>';
    el.querySelector(".bi").classList.add(icon || "bi-info-circle-fill");
    el.querySelector("strong").textContent = title || "Áo Tím";
    el.querySelector(".toast-body").textContent = message;
    toastArea().appendChild(el);
    el.addEventListener("hidden.bs.toast", function () { el.remove(); });
    bootstrap.Toast.getOrCreateInstance(el, { delay: 7000 }).show();
  };

  /* ---------- Demo-only buttons ----------
     Any element with data-demo="..." shows that message instead of doing nothing. */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-demo]");
    if (!btn) return;
    e.preventDefault();
    AT.toast(btn.getAttribute("data-demo"), "Demo feature", "bi-lightbulb-fill");
  });

  /* ---------- localStorage, wrapped so a blocked storage never breaks the page ---------- */
  AT.store = {
    get: function (key, fallback) {
      try {
        var v = localStorage.getItem(key);
        return v === null ? fallback : JSON.parse(v);
      } catch (err) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; }
      catch (err) { return false; }
    }
  };

  /* ---------- Back to top ---------- */
  var topBtn = document.getElementById("to-top");
  if (topBtn) {
    window.addEventListener("scroll", function () {
      topBtn.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Scroll reveal ---------- */
  if ("IntersectionObserver" in window && !reduceMotion) {
    document.documentElement.classList.add("js-reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  }
})();
