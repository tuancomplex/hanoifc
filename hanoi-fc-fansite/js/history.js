/* =========================================================
   history.js: history.html (interactive timeline)
   - filter by category
   - alternate left/right after filtering
   - jump to a year
   - expand / collapse all entries
   - reading progress bar
   ========================================================= */
(function () {
  "use strict";
  var items = Array.prototype.slice.call(document.querySelectorAll(".tl-item"));
  var chips = document.querySelectorAll("[data-cat].chip-btn");
  var jump = document.getElementById("jump");
  var toggleAll = document.getElementById("toggle-all");
  var empty = document.getElementById("tl-empty");

  /* Counts on the filter chips */
  document.querySelectorAll("[data-count-for]").forEach(function (span) {
    var cat = span.getAttribute("data-count-for");
    var n = cat === "all" ? items.length : items.filter(function (i) { return i.getAttribute("data-cat") === cat; }).length;
    span.textContent = "(" + n + ")";
  });

  /* Put visible items on alternating sides */
  function layout() {
    var k = 0;
    items.forEach(function (it) {
      if (it.hidden) return;
      it.classList.toggle("side-r", k % 2 === 1);
      k++;
    });
    empty.hidden = k > 0;
  }

  /* Fill the year picker with the visible years */
  function fillJump() {
    jump.length = 1;
    items.forEach(function (it) {
      if (it.hidden) return;
      var opt = document.createElement("option");
      opt.value = it.id;
      opt.textContent = it.querySelector(".tl-year").textContent + " · " + it.querySelector("h3").firstChild.textContent.trim();
      jump.appendChild(opt);
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var cat = chip.getAttribute("data-cat");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      items.forEach(function (it) {
        it.hidden = !(cat === "all" || it.getAttribute("data-cat") === cat);
        // filtered items should show straight away, without waiting for the scroll reveal
        it.querySelector(".tl-card").classList.add("in");
      });
      layout();
      fillJump();
    });
  });

  jump.addEventListener("change", function () {
    var target = document.getElementById(jump.value);
    if (!target) return;
    target.scrollIntoView({ behavior: window.AT.reduceMotion ? "auto" : "smooth", block: "center" });
    target.querySelector(".tl-card").classList.add("in");
    target.classList.remove("flash");
    void target.offsetWidth;
    target.classList.add("flash");
  });

  /* Expand / collapse every "Read more" panel */
  toggleAll.addEventListener("click", function () {
    var expand = toggleAll.getAttribute("aria-pressed") !== "true";
    document.querySelectorAll(".timeline .collapse").forEach(function (el) {
      var c = bootstrap.Collapse.getOrCreateInstance(el, { toggle: false });
      if (expand) c.show(); else c.hide();
    });
    toggleAll.setAttribute("aria-pressed", String(expand));
    toggleAll.innerHTML = expand
      ? '<i class="bi bi-arrows-collapse me-1"></i>Collapse all'
      : '<i class="bi bi-arrows-expand me-1"></i>Expand all';
  });

  /* "Read more" buttons swap to "Show less" when open */
  document.querySelectorAll(".timeline .collapse").forEach(function (el) {
    var btn = document.querySelector('[data-bs-target="#' + el.id + '"]');
    el.addEventListener("shown.bs.collapse", function () { btn.textContent = "Show less"; });
    el.addEventListener("hidden.bs.collapse", function () { btn.textContent = "Read more"; });
  });

  /* Reading progress */
  var bar = document.getElementById("read-bar");
  function progress() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", progress, { passive: true });
  window.addEventListener("resize", progress);

  layout();
  fillJump();
  progress();
})();
