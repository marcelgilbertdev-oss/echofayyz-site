// ECHOFAYYZ site — three small jobs, no libraries.
(function () {
  // 1) Release state: before the release date the buttons say "Pre-save", from the date on they say "Listen".
  var hero = document.querySelector('[data-release]');
  if (hero) {
    var out = new Date() >= new Date(hero.getAttribute('data-release') + 'T00:00:00');
    document.querySelectorAll('.js-release-btn, .js-release-eyebrow, .js-release-tag').forEach(function (el) {
      el.textContent = el.getAttribute(out ? 'data-out' : 'data-pre').replace(/&mdash;/g, '\u2014');
    });
  }
  // 2) Music filter chips (All / Worship / EDM).
  var chips = document.querySelectorAll('.chip');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { var on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', on); });
      document.querySelectorAll('#releases .release, .soon-card').forEach(function (card) {
        card.classList.toggle('is-hidden', f !== 'all' && card.getAttribute('data-genre') !== f);
      });
    });
  });
  // 3) Videos: show the thumbnail; load the YouTube player only when someone presses play (keeps the page fast).
  document.querySelectorAll('.yt').forEach(function (btn) {
    var img = btn.querySelector('img');
    if (img && img.getAttribute('data-fallback')) {
      img.addEventListener('load', function () { if (img.naturalWidth < 200) img.src = img.getAttribute('data-fallback'); });
      img.addEventListener('error', function () { img.src = img.getAttribute('data-fallback'); });
    }
    btn.addEventListener('click', function () {
      var box = document.createElement('div');
      box.className = btn.className;               // keeps the .yt / .yt-big size and frame
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + btn.getAttribute('data-id') + '?autoplay=1&rel=0';
      f.title = btn.getAttribute('data-title') || 'YouTube video';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      box.appendChild(f);
      btn.replaceWith(box);
    });
  });
})();
