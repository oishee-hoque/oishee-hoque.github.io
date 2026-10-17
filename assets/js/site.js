/* Progressive enhancement only: the site works fully without this file. */
(function () {
  "use strict";

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
