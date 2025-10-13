/*
* Greedy Navigation (keep title visible on mobile; put other links in button)
*/

var $nav    = $('#site-nav');
var $btn    = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $hlinks = $('#site-nav .hidden-links');

var breaks = [];
var MOBILE_MAX = 768;

// Move everything EXCEPT the first <li> (title) into hidden on mobile
function forceMobileMenuKeepTitle() {
  var $nonTitle = $vlinks.children().not(':first-child'); // keep first li (title) visible
  if ($nonTitle.length) {
    // move in original order: take the second, third, ... items and append to hidden
    $nonTitle.appendTo($hlinks);
  }
  $btn.removeClass('hidden');   // ensure the toggle shows
  $hlinks.addClass('hidden');   // keep dropdown closed until tapped
  $btn.attr('count', $hlinks.children().length);
}

// Restore: move all items (except title) back to visible on desktop
function forceDesktopMenuRestore() {
  while ($hlinks.children().length) {
    $hlinks.children().first().appendTo($vlinks);
  }
  $hlinks.addClass('hidden');
  breaks = [];
  // If nothing hidden, hide the button again (GreedyNav default)
  $btn.addClass('hidden').attr('count', 0);
}

function updateNav() {
  // 🚩 Mobile rule: keep first li (title) in visible; move others to hidden
  if (window.innerWidth <= MOBILE_MAX) {
    forceMobileMenuKeepTitle();
    return;
  }

  // 🖥️ Desktop: original greedy behavior
  var availableSpace = $btn.hasClass('hidden')
    ? $nav.width()
    : $nav.width() - $btn.width() - 30;

  if ($vlinks.width() > availableSpace) {
    breaks.push($vlinks.width());
    $vlinks.children().last().prependTo($hlinks);
    if ($btn.hasClass('hidden')) $btn.removeClass('hidden');
  } else {
    if (breaks.length && availableSpace > breaks[breaks.length - 1]) {
      $hlinks.children().first().appendTo($vlinks);
      breaks.pop();
    }
    if (breaks.length < 1 && $hlinks.children().length === 0) {
      $btn.addClass('hidden');
      $hlinks.addClass('hidden');
    }
  }

  $btn.attr('count', breaks.length);
  if ($vlinks.width() > availableSpace) updateNav();
}

// Toggle dropdown
$btn.on('click', function () {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
});

// Handle resize
$(window).on('resize', function () {
  if (window.innerWidth <= MOBILE_MAX) {
    forceMobileMenuKeepTitle();
  } else {
    forceDesktopMenuRestore();
    updateNav(); // let greedy algo fine-tune
  }
});

// Initial layout
updateNav();
