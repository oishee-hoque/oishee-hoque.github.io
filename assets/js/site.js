/* Progressive enhancement only: the site works fully without this file. */
(function () {
  "use strict";

  // Publication filters. Each .filters group filters the .pub entries that
  // follow it inside the same parent, so the home page and the publications
  // page can each have their own set.
  document.querySelectorAll(".filters").forEach(function (group) {
    // The scope is the nearest ancestor that actually contains publication
    // entries (the home page section, or <main> on the publications page).
    var scope = group.parentElement;
    while (scope && !scope.querySelector(".pub[data-tags]")) scope = scope.parentElement;
    if (!scope) return;
    var filters = group.querySelectorAll(".filter[data-filter]");
    var pubs = scope.querySelectorAll(".pub[data-tags]");
    var years = scope.querySelectorAll(".year");
    var empty = scope.querySelector(".filters__empty");
    if (!filters.length || !pubs.length) return;

    var apply = function (key, pushState) {
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
      if (pushState && history.replaceState && years.length) {
        history.replaceState(null, "", key === "all" ? location.pathname : location.pathname + "?show=" + key);
      }
    };

    filters.forEach(function (f) {
      f.addEventListener("click", function () { apply(f.getAttribute("data-filter"), true); });
    });

    if (years.length) {
      var initial = new URLSearchParams(location.search).get("show");
      if (initial && group.querySelector('.filter[data-filter="' + initial + '"]')) apply(initial, false);
    }
  });
})();
