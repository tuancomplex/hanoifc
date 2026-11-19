/* =========================================================
   gallery.js: gallery.html (filterable gallery)
   - builds the grid from the PICS list
   - category filter + caption search
   - favourites saved on this device (localStorage)
   - lightbox with previous/next and arrow keys
   ========================================================= */
(function () {
  "use strict";
  // Real photos. "by", "lic" and "src" give the credit each licence asks for.
  var PICS = [
    { f: "hang-day-stadium.jpg", t: "Hàng Đẫy Stadium", c: "stadium", d: "The pitch and blue stands of Hàng Đẫy, the club’s home since 2009.", by: "Jspeed1310", lic: "Public domain", src: "https://commons.wikimedia.org/wiki/File:S%C3%A2n_v%E1%BA%ADn_%C4%91%E1%BB%99ng_H%C3%A0ng_%C4%90%E1%BA%ABy.jpg", site: "Wikimedia Commons" },
    { f: "hang-day-stand.jpg", t: "Under the main stand", c: "stadium", d: "Broadcast vans parked on the street beneath the main stand at Hàng Đẫy.", by: "Jspeed1310", lic: "Public domain", src: "https://commons.wikimedia.org/wiki/File:S%C3%A2n_v%E1%BA%ADn_%C4%91%E1%BB%99ng_H%C3%A0ng_%C4%90%E1%BA%ABy_2.jpg", site: "Wikimedia Commons" },
    { f: "floodlights.jpg", t: "Floodlights", c: "stadium", d: "Floodlights blazing at night. This photo was taken at Aberystwyth Town in Wales.", by: "John Lucas", lic: "CC BY-SA 2.0", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/", src: "https://commons.wikimedia.org/wiki/File:Floodlights_of_Aberystwyth_Town_F.C._-_geograph.org.uk_-_5155582.jpg", site: "Wikimedia Commons" },
    { f: "pitch-night.jpg", t: "A pitch under lights", c: "stadium", d: "A floodlit ground seen from the air at night. This photo shows Salford City’s stadium in England.", by: "Emessem T", lic: "CC BY-SA 4.0", licUrl: "https://creativecommons.org/licenses/by-sa/4.0/", src: "https://commons.wikimedia.org/wiki/File:The_Peninsula_Stadium_at_night_-_Salford_City_-_Aug_24.jpg", site: "Wikimedia Commons" },
    { f: "tt-hanoi-2009.jpg", t: "T&T Hà Nội in 2009", c: "matchday", d: "The club, then called T&T Hà Nội, playing away at Khánh Hòa in its first V.League season.", by: "Vinhtantran", lic: "CC BY-SA 3.0", licUrl: "https://creativecommons.org/licenses/by-sa/3.0/", src: "https://commons.wikimedia.org/wiki/File:V-League_2009,_K.Khanh_Hoa_vs._T%26T_Ha_Noi.JPG", site: "Wikimedia Commons" },
    { f: "shot-at-goal.jpg", t: "A shot at goal", c: "matchday", d: "A player lines up a shot during a match.", by: "Pfc. Christopher Johns, US Marine Corps", lic: "Public domain", src: "https://commons.wikimedia.org/wiki/File:Goal,_lunch_time_soccer_showdown_120227-M-OB827-096.jpg", site: "Wikimedia Commons" },
    { f: "tactics-board.jpg", t: "Tactics board", c: "matchday", d: "A coach holds a tactics board beside the pitch. You can play an animated tactics board on the Media page.", by: "Nguyen Thu Hoai", lic: "Unsplash Licence", licUrl: "https://unsplash.com/license", src: "https://unsplash.com/photos/man-in-blue-crew-neck-t-shirt-standing-on-track-field-during-daytime-v0H-vn0BixI", site: "Unsplash" },
    { f: "fans-stand.jpg", t: "A stand in red", c: "fans", d: "Vietnam supporters fill a stand at the Vietnam v Japan match, 2019 AFC Asian Cup.", by: "Amir Ostovari", lic: "CC BY 4.0", licUrl: "https://creativecommons.org/licenses/by/4.0/", src: "https://commons.wikimedia.org/wiki/File:Vietnam_vs._Japan_AFC_Asian_Cup_2019_9.jpg", site: "Wikimedia Commons" },
    { f: "fans-flags.jpg", t: "Flags by the Opera House", c: "fans", d: "Fans with Vietnamese flags gather by the Hà Nội Opera House to celebrate.", by: "Mig Gilbert", lic: "CC BY-SA 2.0", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/", src: "https://commons.wikimedia.org/wiki/File:Footie_crowd_in_Vietnam_(26673165038).jpg", site: "Wikimedia Commons" },
    { f: "supporters-drums.jpg", t: "The drummers", c: "fans", d: "Supporters keep the beat with drums. Hear the Hàng Đẫy drum track on the Media page.", by: "Mathias Reding", lic: "Unsplash Licence", licUrl: "https://unsplash.com/license", src: "https://unsplash.com/photos/a-group-of-men-in-yellow-raincoats-playing-drums-0imG0EsI9Tc", site: "Unsplash" },
    { f: "tifo.jpg", t: "A giant tifo", c: "fans", d: "A supporters’ group in Spain covers a whole end of the stadium with a tifo before kick-off.", by: "P4K1T0", lic: "CC0", licUrl: "https://creativecommons.org/publicdomain/zero/1.0/", src: "https://commons.wikimedia.org/wiki/File:Tifo_de_Fondo_Norte_1995_(20251208_181003).jpg", site: "Wikimedia Commons" },
    { f: "goalkeeper-purple.jpg", t: "A save in purple", c: "kits", d: "A goalkeeper in a purple kit dives for the ball. Not a Hà Nội FC kit.", by: "Matheus Protzen", lic: "Unsplash Licence", licUrl: "https://unsplash.com/license", src: "https://unsplash.com/photos/a-soccer-goalkeeper-in-purple-dives-to-save-the-ball-9tmNa-Dsm8c", site: "Unsplash" },
    { f: "shirt-number-10.jpg", t: "The No. 10 shirt", c: "kits", d: "A player in a white No. 10 shirt. Not a Hà Nội FC kit: at the club, captain Nguyễn Văn Quyết wears No. 10.", by: "Neogeolegend", lic: "CC BY-SA 3.0", licUrl: "https://creativecommons.org/licenses/by-sa/3.0/", src: "https://commons.wikimedia.org/wiki/File:Number_10_Jersey.JPG", site: "Wikimedia Commons" },
    { f: "trophy-cabinet.jpg", t: "Trophy cabinet", c: "trophies", d: "A lit cabinet of trophies, not the club’s own. Hà Nội FC have won 6 V.League titles, 3 National Cups and 5 Super Cups.", by: "breizhography", lic: "Unsplash Licence", licUrl: "https://unsplash.com/license", src: "https://unsplash.com/photos/collection-of-trophies-displayed-on-shelves-with-lighting-X7XmBss_KSM", site: "Unsplash" }
  ];
  var CAT_NAMES = { stadium: "Stadium", matchday: "Matchday", fans: "Fans", kits: "Kits", trophies: "Trophies" };
  var FAV_KEY = "aotim-favourites";

  var grid = document.getElementById("g-grid");
  var status = document.getElementById("g-status");
  var empty = document.getElementById("g-empty");
  var search = document.getElementById("g-search");
  var favCount = document.getElementById("fav-count");
  var filters = document.querySelectorAll("#g-filters .chip-btn");
  var favs = window.AT.store.get(FAV_KEY, []);
  var currentCat = "all";
  var visible = [];  // indexes of pictures currently shown
  var lbIndex = 0;

  /* ---------- Build the grid ---------- */
  grid.innerHTML = PICS.map(function (p, i) {
    return '<div class="col g-item reveal" data-i="' + i + '">' +
      '<div class="g-card">' +
        '<button type="button" class="g-open" data-i="' + i + '" aria-label="Open ' + p.t + ' full size">' +
          '<img src="img/' + p.f + '" alt="' + p.t + '" loading="lazy">' +
        '</button>' +
        '<div class="g-body"><div><h3>' + p.t + '</h3><small>' + CAT_NAMES[p.c] + ' · Photo: ' + p.by + '</small></div>' +
          '<button type="button" class="fav-btn" data-i="' + i + '" aria-pressed="false" aria-label="Add ' + p.t + ' to favourites"><i class="bi bi-heart"></i></button>' +
        '</div>' +
      '</div></div>';
  }).join("");
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".g-item"));

  /* ---------- Favourites ---------- */
  function isFav(i) { return favs.indexOf(PICS[i].f) > -1; }
  function paintFavs() {
    grid.querySelectorAll(".fav-btn").forEach(function (b) {
      var i = +b.getAttribute("data-i"), on = isFav(i);
      b.setAttribute("aria-pressed", String(on));
      b.innerHTML = '<i class="bi ' + (on ? "bi-heart-fill" : "bi-heart") + '"></i>';
      b.setAttribute("aria-label", (on ? "Remove " : "Add ") + PICS[i].t + (on ? " from" : " to") + " favourites");
    });
    favCount.textContent = "(" + favs.length + ")";
  }
  function toggleFav(i) {
    var f = PICS[i].f, k = favs.indexOf(f);
    if (k > -1) favs.splice(k, 1); else favs.push(f);
    var saved = window.AT.store.set(FAV_KEY, favs);
    paintFavs();
    if (!saved) window.AT.toast("Your browser is blocking storage, so favourites will be forgotten when you leave this page.", "Favourites");
    if (currentCat === "fav") apply();
  }

  /* ---------- Filter + search ---------- */
  function apply() {
    var q = search.value.trim().toLowerCase();
    visible = [];
    cards.forEach(function (card) {
      var i = +card.getAttribute("data-i"), p = PICS[i];
      var catOk = currentCat === "all" || (currentCat === "fav" ? isFav(i) : p.c === currentCat);
      var textOk = !q || (p.t + " " + p.d + " " + CAT_NAMES[p.c]).toLowerCase().indexOf(q) > -1;
      card.hidden = !(catOk && textOk);
      if (!card.hidden) { visible.push(i); card.classList.add("in"); }
    });
    status.textContent = "Showing " + visible.length + " of " + PICS.length + " photos" + (currentCat === "fav" && favs.length === 0 ? ". Tap a heart to add a favourite." : "");
    empty.hidden = visible.length > 0;
  }
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentCat = btn.getAttribute("data-cat");
      filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      apply();
    });
  });
  search.addEventListener("input", apply);
  document.getElementById("g-reset").addEventListener("click", function () {
    search.value = "";
    filters[0].click();
  });

  /* ---------- Lightbox ---------- */
  var modalEl = document.getElementById("lightbox");
  var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  var lbImg = document.getElementById("lb-img"), lbTitle = document.getElementById("lb-title");
  var lbDesc = document.getElementById("lb-desc"), lbCounter = document.getElementById("lb-counter");
  var lbFav = document.getElementById("lb-fav");
  var lbCredit = document.getElementById("lb-credit");
  function credit(p) {
    lbCredit.innerHTML = "";
    lbCredit.appendChild(document.createTextNode("Photo: " + p.by + " · "));
    if (p.licUrl) {
      var l = document.createElement("a"); l.href = p.licUrl; l.target = "_blank"; l.rel = "noopener"; l.className = "link-light"; l.textContent = p.lic;
      lbCredit.appendChild(l);
    } else { lbCredit.appendChild(document.createTextNode(p.lic)); }
    lbCredit.appendChild(document.createTextNode(" · cropped · "));
    var a = document.createElement("a"); a.href = p.src; a.target = "_blank"; a.rel = "noopener"; a.className = "link-light"; a.textContent = p.site;
    lbCredit.appendChild(a);
  }
  function show(i) {
    lbIndex = i;
    var p = PICS[i], pos = visible.indexOf(i);
    lbImg.src = "img/" + p.f;
    lbImg.alt = p.t;
    lbTitle.textContent = p.t;
    lbDesc.textContent = p.d;
    credit(p);
    lbCounter.textContent = pos > -1 ? (pos + 1) + " / " + visible.length : "";
    var on = isFav(i);
    lbFav.setAttribute("aria-pressed", String(on));
    lbFav.innerHTML = '<i class="bi ' + (on ? "bi-heart-fill text-danger" : "bi-heart") + ' me-1"></i>' + (on ? "Favourited" : "Favourite");
  }
  function step(dir) {
    var pos = visible.indexOf(lbIndex);
    if (pos < 0 || visible.length === 0) return;
    show(visible[(pos + dir + visible.length) % visible.length]);
  }
  grid.addEventListener("click", function (e) {
    var open = e.target.closest(".g-open");
    var fav = e.target.closest(".fav-btn");
    if (open) { show(+open.getAttribute("data-i")); modal.show(); }
    if (fav) {
      toggleFav(+fav.getAttribute("data-i"));
      fav.classList.remove("pop"); void fav.offsetWidth; fav.classList.add("pop");
    }
  });
  document.getElementById("lb-prev").addEventListener("click", function () { step(-1); });
  document.getElementById("lb-next").addEventListener("click", function () { step(1); });
  lbFav.addEventListener("click", function () { toggleFav(lbIndex); show(lbIndex); });
  modalEl.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  paintFavs();
  apply();
})();
