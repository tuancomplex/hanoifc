/* =========================================================
   media.js: media.html
   - video chapter buttons
   - custom audio player (two tracks, seek, volume, mute, loop)
   - canvas tactics-board animation (play, pause, replay, scrub, speed)
   ========================================================= */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  /* ================= Video chapters ================= */
  var video = $("reel");
  var chapters = Array.prototype.slice.call(document.querySelectorAll("#chapters [data-t]"));
  chapters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      video.currentTime = parseFloat(btn.getAttribute("data-t"));
      var p = video.play();
      if (p && p.catch) p.catch(function () { window.AT.toast("Press the play button on the video to start it.", "Video"); });
    });
  });
  function markChapter() {
    var t = video.currentTime, current = chapters[0];
    chapters.forEach(function (b) { if (t >= parseFloat(b.getAttribute("data-t")) - 0.05) current = b; });
    chapters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === current)); });
  }
  video.addEventListener("timeupdate", markChapter);
  video.addEventListener("seeked", markChapter);
  video.addEventListener("error", function () { window.AT.toast("The video file could not be loaded. Check that the media folder is next to media.html.", "Video"); }, true);
  markChapter();

  /* ================= Audio player ================= */
  var audio = $("audio");
  var ext = audio.canPlayType("audio/mpeg") ? ".mp3" : ".ogg";
  var tracks = Array.prototype.slice.call(document.querySelectorAll("#tracklist .track"));
  var playBtn = $("a-play"), seek = $("a-seek"), cur = $("a-cur"), dur = $("a-dur");
  var vol = $("a-vol"), mute = $("a-mute"), loop = $("a-loop"), eq = $("eq");
  function fmt(s) { if (!isFinite(s)) return "0:00"; s = Math.floor(s); return Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60); }
  function load(i, autoplay) {
    tracks.forEach(function (t, k) { t.setAttribute("aria-current", String(k === i)); });
    audio.src = tracks[i].getAttribute("data-src") + ext;
    audio.load();
    if (autoplay) play();
  }
  function play() {
    var p = audio.play();
    if (p && p.catch) p.catch(function () { window.AT.toast("The browser blocked playback. Press play again.", "Audio"); });
  }
  function paintPlay() {
    var on = !audio.paused;
    playBtn.innerHTML = '<i class="bi ' + (on ? "bi-pause-fill" : "bi-play-fill") + '"></i>';
    playBtn.setAttribute("aria-label", on ? "Pause" : "Play");
    eq.classList.toggle("playing", on);
  }
  tracks.forEach(function (t, i) { t.addEventListener("click", function () { load(i, true); }); });
  playBtn.addEventListener("click", function () { if (audio.paused) play(); else audio.pause(); });
  audio.addEventListener("play", paintPlay);
  audio.addEventListener("pause", paintPlay);
  audio.addEventListener("ended", paintPlay);
  audio.addEventListener("loadedmetadata", function () { dur.textContent = fmt(audio.duration); seek.value = 0; cur.textContent = "0:00"; });
  audio.addEventListener("timeupdate", function () {
    cur.textContent = fmt(audio.currentTime);
    if (audio.duration) seek.value = (audio.currentTime / audio.duration) * 100;
  });
  audio.addEventListener("error", function () { window.AT.toast("The audio file could not be loaded. Check that the media folder is next to media.html.", "Audio"); });
  seek.addEventListener("input", function () { if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration; });
  vol.addEventListener("input", function () { audio.volume = +vol.value; if (audio.muted && +vol.value > 0) mute.click(); });
  mute.addEventListener("click", function () {
    audio.muted = !audio.muted;
    mute.setAttribute("aria-pressed", String(audio.muted));
    mute.setAttribute("aria-label", audio.muted ? "Unmute" : "Mute");
    mute.innerHTML = '<i class="bi ' + (audio.muted ? "bi-volume-mute" : "bi-volume-up") + '"></i>';
  });
  loop.addEventListener("click", function () {
    audio.loop = !audio.loop;
    loop.setAttribute("aria-pressed", String(audio.loop));
    loop.innerHTML = '<i class="bi bi-repeat me-1"></i>Loop ' + (audio.loop ? "on" : "off");
  });
  audio.volume = +vol.value;
  // Pause the other media when one starts
  video.addEventListener("play", function () { if (!audio.paused) audio.pause(); });
  audio.addEventListener("play", function () { if (!video.paused) video.pause(); });
  load(0, false);

  /* ================= Tactics board animation ================= */
  var cv = $("board"), x = cv.getContext("2d"), W = cv.width, H = cv.height, END = 8;
  var GOLD = "#f2b705", DEEP = "#22093a", LINE = "rgba(217,199,242,.55)";
  var US = [ // [shirt number, keyframes [time, x, y]]
    [1, [[0, 70, 300], [8, 92, 300]]],
    [2, [[0, 230, 520], [8, 330, 500]]],
    [3, [[0, 200, 370], [8, 262, 360]]],
    [4, [[0, 200, 230], [8, 262, 240]]],
    [5, [[0, 230, 90], [8, 330, 110]]],
    [6, [[0, 330, 420], [1.6, 360, 400], [3, 380, 380], [8, 420, 360]]],
    [8, [[0, 420, 300], [2.4, 480, 300], [4, 560, 280], [8, 620, 300]]],
    [10, [[0, 520, 380], [4, 640, 380], [6, 780, 400], [8, 800, 410]]],
    [7, [[0, 560, 160], [3.4, 720, 120], [4.8, 820, 150], [8, 840, 160]]],
    [11, [[0, 560, 480], [5, 760, 470], [8, 800, 450]]],
    [9, [[0, 620, 300], [5, 800, 335], [5.6, 852, 334], [6.2, 880, 320], [8, 900, 312]]]
  ];
  var THEM = [
    [[0, 900, 300], [6, 905, 300], [6.4, 892, 245], [8, 892, 245]],
    [[0, 760, 180], [4.8, 790, 165], [8, 800, 170]],
    [[0, 760, 280], [8, 805, 300]],
    [[0, 760, 380], [8, 800, 362]],
    [[0, 760, 480], [8, 780, 460]],
    [[0, 640, 220], [8, 700, 230]],
    [[0, 640, 330], [8, 700, 330]],
    [[0, 640, 440], [8, 690, 430]],
    [[0, 480, 220], [8, 540, 230]],
    [[0, 470, 400], [1.6, 400, 410], [8, 430, 410]]
  ];
  var BALL = [[0, 345, 415], [1.6, 372, 396], [2.4, 475, 300], [3.4, 716, 126], [4.8, 816, 156], [5.6, 849, 330], [6.2, 936, 300], [8, 940, 300]];
  var STEPS = [[0, "1. Win the ball back in midfield."], [1.6, "2. Quick pass forward, then switch the play to the wing."], [3.4, "3. The winger drives at the full-back and crosses."], [5.6, "4. The striker attacks the near post. Goal!"]];

  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function at(keys, t) {
    if (t <= keys[0][0]) return [keys[0][1], keys[0][2]];
    for (var i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        var a = keys[i - 1], b = keys[i], p = ease((t - a[0]) / (b[0] - a[0]));
        return [a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p];
      }
    }
    var l = keys[keys.length - 1]; return [l[1], l[2]];
  }
  function pitch() {
    x.fillStyle = "#2b0f47"; x.fillRect(0, 0, W, H);
    for (var i = 0; i < 12; i++) { x.fillStyle = i % 2 ? "rgba(255,255,255,.025)" : "rgba(0,0,0,0)"; x.fillRect(30 + i * 75, 30, 75, 540); }
    x.strokeStyle = LINE; x.lineWidth = 3;
    x.strokeRect(30, 30, 900, 540);
    x.beginPath(); x.moveTo(480, 30); x.lineTo(480, 570); x.stroke();
    x.beginPath(); x.arc(480, 300, 70, 0, Math.PI * 2); x.stroke();
    x.strokeRect(30, 160, 130, 280); x.strokeRect(800, 160, 130, 280);
    x.strokeRect(30, 240, 45, 120); x.strokeRect(885, 240, 45, 120);
    x.fillStyle = "rgba(255,255,255,.85)"; x.fillRect(930, 262, 10, 76); x.fillRect(20, 262, 10, 76);
  }
  function dot(px, py, fill, ring, label) {
    x.beginPath(); x.arc(px, py, 17, 0, Math.PI * 2); x.fillStyle = fill; x.fill();
    x.lineWidth = 4; x.strokeStyle = ring; x.stroke();
    if (label) { x.fillStyle = DEEP; x.font = "800 17px 'Saira Extra Condensed', Impact, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(label, px, py + 1); }
  }
  function draw(t) {
    pitch();
    // ball path so far
    x.setLineDash([10, 9]); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = 3; x.beginPath();
    for (var s = 0; s <= t; s += 0.05) { var b = at(BALL, s); if (s === 0) x.moveTo(b[0], b[1]); else x.lineTo(b[0], b[1]); }
    x.stroke(); x.setLineDash([]);
    THEM.forEach(function (k) { var p = at(k, t); dot(p[0], p[1], "#ffffff", "#c22f3d"); });
    US.forEach(function (u) { var p = at(u[1], t); dot(p[0], p[1], GOLD, DEEP, String(u[0])); });
    var b2 = at(BALL, t);
    x.beginPath(); x.arc(b2[0] + 3, b2[1] + 4, 8, 0, Math.PI * 2); x.fillStyle = "rgba(0,0,0,.35)"; x.fill();
    x.beginPath(); x.arc(b2[0], b2[1], 8, 0, Math.PI * 2); x.fillStyle = "#fff"; x.fill(); x.lineWidth = 2; x.strokeStyle = DEEP; x.stroke();
    if (t > 6.25) {
      var g = Math.min(1, (t - 6.25) / 0.4);
      x.save(); x.globalAlpha = g; x.fillStyle = GOLD; x.font = "900 " + (90 + 30 * g) + "px 'Saira Extra Condensed', Impact, sans-serif";
      x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("GOAL!", 480, 300); x.restore();
    }
    var step = STEPS[0][1];
    STEPS.forEach(function (st) { if (t >= st[0]) step = st[1]; });
    stepEl.textContent = t === 0 && !playing ? "Press Play to start the move." : step;
  }

  var stepEl = $("b-step"), playB = $("b-play"), replayB = $("b-replay"), scrub = $("b-scrub"), speed = $("b-speed");
  var t = 0, playing = false, last = 0;
  function paintBtn() {
    playB.innerHTML = playing ? '<i class="bi bi-pause-fill me-1"></i>Pause' : '<i class="bi bi-play-fill me-1"></i>' + (t >= END ? "Play again" : "Play");
  }
  function frame(now) {
    if (!playing) return;
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    t = Math.min(END, t + dt * parseFloat(speed.value));
    scrub.value = t; draw(t);
    if (t >= END) { playing = false; paintBtn(); return; }
    requestAnimationFrame(frame);
  }
  function startPlay() {
    if (t >= END) t = 0;
    playing = true; last = performance.now(); paintBtn();
    requestAnimationFrame(frame);
  }
  playB.addEventListener("click", function () { if (playing) { playing = false; paintBtn(); draw(t); } else startPlay(); });
  replayB.addEventListener("click", function () { t = 0; startPlay(); });
  scrub.addEventListener("input", function () { playing = false; t = parseFloat(scrub.value); paintBtn(); draw(t); });
  draw(0);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { draw(t); });
})();
