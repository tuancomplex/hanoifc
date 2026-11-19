/* =========================================================
   fanzone.js: fanzone.html
   - 10-question quiz with instant feedback and a best score
   - player poll (votes stored on this device)
   - score predictor form (saved on this device)
   ========================================================= */
(function () {
  "use strict";
  var store = window.AT.store;

  /* ================= Quiz ================= */
  var QUESTIONS = [
    { q: "In which year was the club founded?", a: "2006", o: ["2004", "2006", "2008", "2010"], why: "T&T Hà Nội was set up on 18 June 2006." },
    { q: "What was the club called when it started?", a: "T&T Hà Nội", o: ["T&T Hà Nội", "Hà Nội ACB", "Thể Công", "Hà Nội Capital"], why: "It became Hà Nội T&T in 2010 and Hà Nội FC in 2016." },
    { q: "How many V.League titles has Hà Nội FC won?", a: "6", o: ["4", "5", "6", "7"], why: "2010, 2013, 2016, 2018, 2019 and 2022." },
    { q: "Which stadium is the club’s home ground?", a: "Hàng Đẫy", o: ["Mỹ Đình", "Hàng Đẫy", "Lạch Tray", "Thiên Trường"], why: "Hà Nội FC have played at Hàng Đẫy since 2009." },
    { q: "Who was appointed head coach on 4 October 2025?", a: "Harry Kewell", o: ["Harry Kewell", "Park Hang-seo", "Kim Sang-sik", "Chu Đình Nghiêm"], why: "The former Leeds United and Liverpool winger." },
    { q: "Which Hà Nội FC player won the 2020 Vietnamese Golden Ball?", a: "Nguyễn Văn Quyết", o: ["Nguyễn Quang Hải", "Đỗ Hùng Dũng", "Nguyễn Văn Quyết", "Đoàn Văn Hậu"], why: "The captain won it in 2020. Quang Hải (2018) and Hùng Dũng (2019) won the two before." },
    { q: "What is the club’s biggest ever win?", a: "10–0 v Nagaworld", o: ["7–0 v Hải Phòng", "10–0 v Nagaworld", "8–1 v Đà Nẵng", "9–2 v Bình Dương"], why: "It came in the 2019 AFC Cup." },
    { q: "Who scored the 90+1′ winner against Ninh Bình on 30 October 2026?", a: "Aymeric Faurand-Tournaire", o: ["Nguyễn Văn Quyết", "Andrew Jung", "Aymeric Faurand-Tournaire", "Nguyễn Hai Long"], why: "A 2–1 comeback win at Hàng Đẫy." },
    { q: "In which year did the current Hàng Đẫy stadium open?", a: "1958", o: ["1934", "1958", "1975", "2003"], why: "It reopened on 24 August 1958 after a rebuild. Football was first played on the site in 1934." },
    { q: "Who did Hà Nội FC beat 2–1 in the October 2026 capital derby?", a: "Công an Hà Nội", o: ["Thể Công–Viettel", "Công an Hà Nội", "Hải Phòng", "Nam Định"], why: "It was Công an Hà Nội’s first defeat of the season." }
  ];
  var MESSAGES = [
    "A tough afternoon. Read the History page and try again.",
    "A tough afternoon. Read the History page and try again.",
    "A tough afternoon. Read the History page and try again.",
    "Some good moments. The History page has every answer.",
    "Some good moments. The History page has every answer.",
    "Half-time draw. Another go should do it.",
    "A solid result. You clearly follow the club.",
    "A solid result. You clearly follow the club.",
    "Excellent. That is a title-winning performance.",
    "Excellent. That is a title-winning performance.",
    "Perfect ten. Áo tím through and through."
  ];
  var BEST_KEY = "aotim-quiz-best";
  var order = [], idx = 0, score = 0;
  var el = function (id) { return document.getElementById(id); };
  var qText = el("q-text"), qOpts = el("q-options"), qFb = el("q-feedback"), qNext = el("q-next");
  var qLabel = el("q-label"), qScore = el("q-score"), qBest = el("q-best"), qBar = el("q-progress"), qWrap = el("q-progress-wrap");

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function showBest() { var b = store.get(BEST_KEY, null); qBest.textContent = b === null ? "–" : b + "/10"; }

  function render() {
    var item = QUESTIONS[order[idx]];
    qLabel.textContent = "Question " + (idx + 1) + " of " + QUESTIONS.length;
    qText.textContent = item.q;
    qOpts.innerHTML = "";
    shuffle(item.o).forEach(function (opt, n) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "quiz-opt"; b.id = "q-opt-" + n; b.textContent = opt;
      b.addEventListener("click", function () { answer(opt, b); });
      qOpts.appendChild(b);
    });
    qFb.hidden = true; qNext.hidden = true;
    var pct = (idx / QUESTIONS.length) * 100;
    qBar.style.width = pct + "%"; qWrap.setAttribute("aria-valuenow", idx);
  }
  function answer(opt, btn) {
    var item = QUESTIONS[order[idx]], ok = opt === item.a;
    qOpts.querySelectorAll("button").forEach(function (b) {
      b.disabled = true;
      if (b.textContent === item.a) b.classList.add("right");
    });
    if (!ok) btn.classList.add("wrong");
    if (ok) score++;
    qScore.textContent = score;
    qFb.className = "alert mt-3 mb-0 " + (ok ? "alert-success" : "alert-danger");
    qFb.innerHTML = "<strong>" + (ok ? "Goal! " : "Saved. ") + "</strong>";
    qFb.appendChild(document.createTextNode((ok ? "" : "The answer is " + item.a + ". ") + item.why));
    qFb.hidden = false;
    qNext.innerHTML = idx < QUESTIONS.length - 1 ? 'Next question <i class="bi bi-arrow-right"></i>' : 'See my score <i class="bi bi-flag"></i>';
    qNext.hidden = false;
    qNext.focus();
    qBar.style.width = ((idx + 1) / QUESTIONS.length) * 100 + "%";
    qWrap.setAttribute("aria-valuenow", idx + 1);
  }
  function finish() {
    el("q-play").hidden = true; el("q-end").hidden = false;
    el("q-final").textContent = score;
    el("q-message").textContent = MESSAGES[score];
    qLabel.textContent = "Quiz complete";
    var best = store.get(BEST_KEY, null);
    if (best === null || score > best) { store.set(BEST_KEY, score); if (best !== null) window.AT.toast("New best score: " + score + "/10.", "Quiz", "bi-trophy-fill"); }
    showBest();
  }
  function start() {
    order = shuffle(QUESTIONS.map(function (_, i) { return i; }));
    idx = 0; score = 0; qScore.textContent = "0";
    el("q-play").hidden = false; el("q-end").hidden = true;
    render();
  }
  qNext.addEventListener("click", function () { if (idx < QUESTIONS.length - 1) { idx++; render(); } else { finish(); } });
  el("q-restart").addEventListener("click", start);
  showBest();
  start();

  /* ================= Poll ================= */
  var PLAYERS = ["Nguyễn Văn Quyết", "Nguyễn Hai Long", "Phạm Xuân Mạnh", "Aymeric Faurand-Tournaire", "Đỗ Hùng Dũng"];
  var POLL_KEY = "aotim-poll";
  var poll = store.get(POLL_KEY, { counts: [0, 0, 0, 0, 0], mine: null });
  var pollBox = el("poll-options"), pollTotal = el("poll-total");
  pollBox.innerHTML = PLAYERS.map(function (p, i) {
    return '<button type="button" class="poll-opt" data-i="' + i + '" aria-pressed="false"><span class="bar"></span><i class="bi bi-person-circle"></i><span>' + p + '</span><span class="pct"></span></button>';
  }).join("");
  function paintPoll() {
    var total = poll.counts.reduce(function (a, b) { return a + b; }, 0);
    pollBox.querySelectorAll(".poll-opt").forEach(function (b) {
      var i = +b.getAttribute("data-i"), pct = total ? Math.round(poll.counts[i] / total * 100) : 0;
      b.querySelector(".bar").style.width = pct + "%";
      b.querySelector(".pct").textContent = total ? pct + "% · " + poll.counts[i] : "";
      b.setAttribute("aria-pressed", String(poll.mine === i));
      b.setAttribute("aria-label", PLAYERS[i] + (total ? ", " + poll.counts[i] + " votes, " + pct + " percent" : ""));
    });
    pollTotal.textContent = total ? total + (total === 1 ? " vote" : " votes") + " on this device. Tap again to add another." : "No votes yet on this device.";
  }
  pollBox.addEventListener("click", function (e) {
    var b = e.target.closest(".poll-opt"); if (!b) return;
    var i = +b.getAttribute("data-i");
    poll.counts[i]++; poll.mine = i;
    store.set(POLL_KEY, poll);
    paintPoll();
    window.AT.toast("Vote counted for " + PLAYERS[i] + ". On a live site it would also be sent to the server and shared with other fans.", "Poll", "bi-check2-circle");
  });
  el("poll-reset").addEventListener("click", function () {
    poll = { counts: [0, 0, 0, 0, 0], mine: null };
    store.set(POLL_KEY, poll);
    paintPoll();
    window.AT.toast("Your votes on this device have been cleared.", "Poll");
  });
  paintPoll();

  /* ================= Score predictor ================= */
  var PRED_KEY = "aotim-prediction";
  var form = el("predict"), home = el("p-home"), away = el("p-away"), scorer = el("p-scorer");
  var err = el("p-error"), saved = el("p-saved");
  function showSaved(p) {
    saved.hidden = false;
    saved.innerHTML = '<i class="bi bi-bookmark-check-fill text-success me-1"></i><strong>Your prediction:</strong> ';
    saved.appendChild(document.createTextNode("Đồng Nai City " + p.h + "–" + p.a + " Hà Nội FC" + (p.s ? ", first scorer " + p.s : "") + "."));
  }
  var prev = store.get(PRED_KEY, null);
  if (prev) { home.value = prev.h; away.value = prev.a; scorer.value = prev.s; showSaved(prev); }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = home.checkValidity() && away.checkValidity() && home.value !== "" && away.value !== "" &&
             Number.isInteger(+home.value) && Number.isInteger(+away.value);
    home.classList.toggle("is-invalid", !ok); away.classList.toggle("is-invalid", !ok);
    err.hidden = ok;
    if (!ok) { (home.value === "" || !home.checkValidity() ? home : away).focus(); return; }
    var p = { h: +home.value, a: +away.value, s: scorer.value };
    store.set(PRED_KEY, p);
    showSaved(p);
    window.AT.toast("Prediction saved on this device. On a live site it would enter you into the fans’ prediction league.", "Predictor", "bi-bookmark-check-fill");
  });
})();
