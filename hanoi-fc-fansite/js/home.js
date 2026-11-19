/* =========================================================
   home.js: HomePage.html
   - countdown to the next match
   - animated honours counters
   - results filter (All / Wins / Defeats)
   - fan club form validation
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Countdown ---------- */
  var KICK_OFF = new Date("2026-11-21T18:00:00+07:00");
  var els = { d: document.getElementById("cd-d"), h: document.getElementById("cd-h"), m: document.getElementById("cd-m"), s: document.getElementById("cd-s") };
  var note = document.getElementById("cd-note");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    var diff = KICK_OFF.getTime() - Date.now();
    if (diff <= 0) {
      els.d.textContent = els.h.textContent = els.m.textContent = els.s.textContent = "00";
      note.textContent = "Kick-off time has passed. The result will be added to the table after the match.";
      clearInterval(timer);
      return;
    }
    var s = Math.floor(diff / 1000);
    els.d.textContent = Math.floor(s / 86400);
    els.h.textContent = pad(Math.floor((s % 86400) / 3600));
    els.m.textContent = pad(Math.floor((s % 3600) / 60));
    els.s.textContent = pad(s % 60);
  }
  var timer = setInterval(tick, 1000);
  tick();

  /* ---------- Count-up numbers ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function countUp(el) {
    var end = parseInt(el.getAttribute("data-count"), 10);
    var start = end > 1000 ? end - 60 : 0;
    var t0 = null, dur = 1200;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (end - start) * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && !window.AT.reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { io.observe(c); });
  }

  /* ---------- Results filter ---------- */
  var filterBtns = document.querySelectorAll("[data-filter]");
  var rows = document.querySelectorAll("#results-body tr");
  var countEl = document.getElementById("result-count");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter"), shown = 0;
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      rows.forEach(function (r) {
        var on = f === "all" || r.getAttribute("data-res") === f;
        r.hidden = !on;
        if (on) shown++;
      });
      countEl.textContent = "Showing " + shown + " of " + rows.length;
    });
  });

  /* ---------- Fan club form ---------- */
  var form = document.getElementById("joinForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      var firstBad = form.querySelector(":invalid");
      if (firstBad) firstBad.focus();
      return;
    }
    var name = form.elements.name.value.trim();
    var tier = form.querySelector("input[name=tier]:checked").value;
    bootstrap.Modal.getOrCreateInstance(document.getElementById("joinModal")).hide();
    window.AT.toast(
      "Thanks, " + name + "! This form is a demo. On a live site it would add you to the Áo Tím fan club as a " +
      (tier === "Matchday" ? "matchday member" : "newsletter member") + " and email you a welcome message. Nothing was sent or saved.",
      "Form checked", "bi-check-circle-fill"
    );
    form.reset();
    form.classList.remove("was-validated");
  });
})();
