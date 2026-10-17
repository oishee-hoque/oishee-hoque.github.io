/* Progressive enhancement only: the site works fully without this file. */
(function () {
  "use strict";

  // Collapse the news list to the first N entries, with a toggle.
  var news = document.querySelector(".news[data-collapse]");
  var toggle = document.querySelector(".news__toggle");
  if (news && toggle) {
    var limit = parseInt(news.getAttribute("data-collapse"), 10) || 6;
    var items = news.querySelectorAll(".news__item");
    if (items.length > limit) {
      news.classList.add("is-collapsed");
      toggle.hidden = false;
      toggle.setAttribute("aria-expanded", "false");
      toggle.addEventListener("click", function () {
        var collapsed = news.classList.toggle("is-collapsed");
        toggle.textContent = collapsed ? toggle.getAttribute("data-more") : toggle.getAttribute("data-less");
        toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
        if (collapsed) news.scrollIntoView({ block: "start" });
      });
    }
  }

  // Publication filters.
  var filters = document.querySelectorAll(".filter[data-filter]");
  if (filters.length) {
    var pubs = document.querySelectorAll(".pub[data-tags]");
    var years = document.querySelectorAll(".year");
    var empty = document.querySelector(".filters__empty");

    var apply = function (key) {
      var shown = 0;
      pubs.forEach(function (p) {
        var tags = (p.getAttribute("data-tags") || "").split(/\s+/);
        var hit = key === "all" || tags.indexOf(key) !== -1;
        p.classList.toggle("is-hidden", !hit);
        if (hit) shown++;
      });
      years.forEach(function (y) {
        var visible = y.querySelector(".pub:not(.is-hidden)");
        y.classList.toggle("is-hidden", !visible);
      });
      if (empty) empty.hidden = shown > 0;
      filters.forEach(function (f) {
        var active = f.getAttribute("data-filter") === key;
        f.classList.toggle("is-active", active);
        f.setAttribute("aria-pressed", active ? "true" : "false");
      });
      if (history.replaceState) {
        history.replaceState(null, "", key === "all" ? location.pathname : location.pathname + "?show=" + key);
      }
    };

    filters.forEach(function (f) {
      f.addEventListener("click", function () { apply(f.getAttribute("data-filter")); });
    });

    var initial = new URLSearchParams(location.search).get("show");
    if (initial && document.querySelector('.filter[data-filter="' + initial + '"]')) apply(initial);
  }
})();
