ÁO TÍM: UNOFFICIAL HÀ NỘI FC FAN SITE
=====================================

HOW TO OPEN
-----------
Double-click HomePage.html. The whole site runs from this folder with no
internet connection and no server. Keep every file and folder together:
all paths are relative (css/, js/, fonts/, img/, media/).
No part of the site needs the internet.


PAGES (1 home page + 4 secondary pages, each a different type)
--------------------------------------------------------------
HomePage.html   Landing page
                - live countdown to the next match
                - scrolling results ticker (CSS animation, pauses on hover)
                - honours counters that count up when scrolled into view
                - results table with All / Wins / Defeats filter
                - Bootstrap carousel of highlights
                - "Join the fan club" form in a pop-up, with validation

history.html    Interactive timeline (2006 to 2026, plus the stadium's history)
                - filter by Trophies / Club milestones / Stadium
                - jump to any year from a drop-down
                - "Read more" on every entry, plus Expand all / Collapse all
                - reading progress bar and scroll-in animation

gallery.html    Filterable photo gallery (14 real photos)
                - category filter and live caption search
                - lightbox with Previous / Next buttons and arrow keys
                - favourites (heart button), remembered on this device

fanzone.html    Quiz, poll and form
                - 10-question quiz with instant feedback, score and best score
                - player-of-the-season poll with result bars
                - score predictor form with validation, saved on this device

media.html      Multimedia page
                - season reel video (WebM + MP4) with "jump to match" chapters
                - custom audio player: 2 tracks, seek, volume, mute, loop,
                  animated equaliser
                - canvas animation of a counter-attack: play, pause, replay,
                  scrub and speed control


MULTIMEDIA
----------
Images     img/  14 real photos (see PHOTO CREDITS) + 1 video poster (JPG)
Video      media/season-reel.webm, media/season-reel.mp4 (28 s, with sound)
Audio      media/hang-day-drums.mp3/.ogg (40 s), media/kickoff-ambience.mp3/.ogg (30 s)
Animation  CSS (ticker, shimmer, reveal, equaliser, heart pop) and
           canvas/JavaScript (tactics board, counters, countdown)


DEMO-ONLY FEATURES (each shows a message saying what it would do)
-----------------------------------------------------------------
- "Remind me before kick-off": would send a reminder one hour before the match.
- Fan club form: checked in the browser; would add you to the fan club
  mailing list. Nothing is sent or saved.
- Poll and score predictor: saved on this device only; would be sent to a
  server and combined with other fans' entries.
No button on the site does nothing.


AI USE (as required: which text and media are AI-generated)
-----------------------------------------------------------
- All page text: written by Claude (Anthropic's AI) from the sources below.
- The video poster (img/season-reel-poster.jpg): AI-generated, a frame of
  the season reel. Every other image is a real photo (see PHOTO CREDITS).
- Season reel video: AI-generated, animated and rendered by Claude with code.
- Both audio tracks: AI-generated, synthesised by Claude with code.
  No recordings or samples.
- Animations: coded by Claude.
- HTML, CSS and JavaScript: written with Claude.


PHOTO CREDITS
-------------
All photos were cropped to 3:2 and resized to 1350 x 900 pixels for this site.
Licences: Public domain and CC0 need no credit but are listed anyway. CC BY and
CC BY-SA photos are credited as their licences require; the cropped CC BY-SA
versions are shared under the same licence. Unsplash photos are free to use
under the Unsplash Licence (https://unsplash.com/license).

img/hang-day-stadium.jpg
  Sân vận động Hàng Đẫy.jpg by Jspeed1310, Public domain, Wikimedia Commons
  https://commons.wikimedia.org/wiki/File:S%C3%A2n_v%E1%BA%ADn_%C4%91%E1%BB%99ng_H%C3%A0ng_%C4%90%E1%BA%ABy.jpg
img/hang-day-stand.jpg
  Sân vận động Hàng Đẫy 2.jpg by Jspeed1310, Public domain, Wikimedia Commons
  https://commons.wikimedia.org/wiki/File:S%C3%A2n_v%E1%BA%ADn_%C4%91%E1%BB%99ng_H%C3%A0ng_%C4%90%E1%BA%ABy_2.jpg
img/floodlights.jpg
  Floodlights of Aberystwyth Town F.C. - geograph.org.uk - 5155582.jpg by John Lucas, CC BY-SA 2.0, Wikimedia Commons
  https://commons.wikimedia.org/wiki/File:Floodlights_of_Aberystwyth_Town_F.C._-_geograph.org.uk_-_5155582.jpg
img/pitch-night.jpg
  The Peninsula Stadium at night - Salford City - Aug 24.jpg by Emessem T, CC BY-SA 4.0, Wikimedia Commons
  https://commons.wikimedia.org/wiki/File:The_Peninsula_Stadium_at_night_-_Salford_City_-_Aug_24.jpg
img/tt-hanoi-2009.jpg
  V-League 2009, K.Khanh Hoa vs. T&T Ha Noi.JPG by Vinhtantran, CC BY-SA 3.0, Wikimedia Commons
  https://commons.wikimedia.org/wiki/File:V-League_2009,_K.Khanh_Hoa_vs._T%26T_Ha_Noi.JPG
img/shot-at-goal.jpg
  Goal, lunch time soccer showdown 120227-M-OB827-096.jpg by Pfc. Christopher Johns, US Marine Corps, Public domain, Wikimedia Commons
  https://commons.wikimedia.org/wiki/File:Goal,_lunch_time_soccer_showdown_120227-M-OB827-096.jpg
img/tactics-board.jpg
  man standing on a track field holding a tactics board by Nguyen Thu Hoai, Unsplash Licence, Unsplash
  https://unsplash.com/photos/man-in-blue-crew-neck-t-shirt-standing-on-track-field-during-daytime-v0H-vn0BixI
img/fans-stand.jpg
  Vietnam vs. Japan AFC Asian Cup 2019 9.jpg by Amir Ostovari, CC BY 4.0, Wikimedia Commons
  https://commons.wikimedia.org/wiki/File:Vietnam_vs._Japan_AFC_Asian_Cup_2019_9.jpg
img/fans-flags.jpg
  Footie crowd in Vietnam (26673165038).jpg by Mig Gilbert from Brighton, CC BY-SA 2.0, Wikimedia Commons
  https://commons.wikimedia.org/wiki/File:Footie_crowd_in_Vietnam_(26673165038).jpg
img/supporters-drums.jpg
  a group of men in yellow raincoats playing drums by Mathias Reding, Unsplash Licence, Unsplash
  https://unsplash.com/photos/a-group-of-men-in-yellow-raincoats-playing-drums-0imG0EsI9Tc
img/tifo.jpg
  Tifo de Fondo Norte 1995 (20251208 181003).jpg by P4K1T0, CC0, Wikimedia Commons
  https://commons.wikimedia.org/wiki/File:Tifo_de_Fondo_Norte_1995_(20251208_181003).jpg
img/goalkeeper-purple.jpg
  A soccer goalkeeper in purple dives to save the ball by Matheus Protzen, Unsplash Licence, Unsplash
  https://unsplash.com/photos/a-soccer-goalkeeper-in-purple-dives-to-save-the-ball-9tmNa-Dsm8c
img/shirt-number-10.jpg
  Number 10 Jersey.JPG by Neogeolegend, CC BY-SA 3.0, Wikimedia Commons
  https://commons.wikimedia.org/wiki/File:Number_10_Jersey.JPG
img/trophy-cabinet.jpg
  Collection of trophies displayed on shelves with lighting by breizhography, Unsplash Licence, Unsplash
  https://unsplash.com/photos/collection-of-trophies-displayed-on-shelves-with-lighting-X7XmBss_KSM


LIBRARIES AND FONTS (all stored locally)
----------------------------------------
- Bootstrap 5.3.3 (css/bootstrap.min.css, js/bootstrap.bundle.min.js), MIT licence
- Bootstrap Icons 1.11.3 (css/bootstrap-icons.min.css, css/fonts/), MIT licence
- Be Vietnam Pro and Saira Extra Condensed (fonts/), SIL Open Font License,
  from Fontsource


SOURCES FOR THE FACTS (checked 8 November 2026)
-----------------------------------------------
- Wikipedia: Hanoi FC; 2025–26 V.League 1; 2026–27 V.League 1; Hàng Đẫy Stadium
- Tuổi Trẻ, Tiền Phong, VietnamPlus, VOV, VOH and Nhân Dân match reports


TESTING
-------
Done before delivery, opening HomePage.html from the file system (file://):
- Chromium 153 and Google Chrome for Testing 153, on Linux
- every page reached from the menu; every button, filter, form, modal,
  the quiz, poll, predictor, video chapters, audio player and canvas
  animation clicked through; no console errors; all images, video and
  audio loaded
- desktop (1280 px) and phone (390 px) widths, including the phone menu

Still to do (needs a different machine):
- Copy the folder to another computer and open HomePage.html there.
- Test in a second browser engine, for example Firefox or Safari, as well as
  Chrome or Edge. (Safari plays the MP4 video and MP3 audio; Firefox and
  Chrome play WebM/OGG or MP4/MP3.)
Checklist for each browser:
  [ ] Menu links open all 5 pages        [ ] Countdown ticks
  [ ] Results filter works               [ ] Join form shows errors, then a message
  [ ] Timeline filter, jump, expand      [ ] Gallery filter, search, lightbox, hearts
  [ ] Quiz to the end, Play again        [ ] Poll and predictor save
  [ ] Video plays, chapters jump         [ ] Both audio tracks play
  [ ] Tactics board plays and scrubs     [ ] Back-to-top button works


DISCLAIMER
----------
Áo Tím is an unofficial fan site. It is not affiliated with Hà Nội FC,
T&T Group or the V.League. No club logos or player photos are used.
