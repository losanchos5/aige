/* Glossary hover cards: on hover/focus of an in-chapter `.term` link, show a
   small tooltip with the term's definition and a link into the glossary. The
   term data is fetched once, lazily, from /glossary.json. CSP-safe: external
   file, no inline handlers. Only enhances wide viewports (>=840px); on narrow
   screens the term link simply navigates. */
(function () {
  'use strict';

  var terms = document.querySelectorAll('a.term');
  if (!terms.length) return;

  var wide = window.matchMedia('(min-width: 840px)');
  var data = null; // slug -> entry, once loaded
  var loading = null;
  var card = null;
  var termEl = null; // the .tc-term node
  var defEl = null;
  var linkEl = null;
  var activeTerm = null;
  var hideTimer = null;
  var lastPointerType = 'mouse';

  function load() {
    if (data) return Promise.resolve(data);
    if (loading) return loading;
    loading = fetch('/glossary.json')
      .then(function (r) {
        return r.json();
      })
      .then(function (list) {
        data = {};
        (Array.isArray(list) ? list : []).forEach(function (e) {
          data[e.slug] = e;
        });
        return data;
      })
      .catch(function () {
        data = {};
        return data;
      });
    return loading;
  }

  function build() {
    if (card) return;
    card = document.createElement('div');
    card.className = 'term-card';
    card.id = 'term-card';
    card.setAttribute('role', 'tooltip');

    termEl = document.createElement('p');
    termEl.className = 'tc-term';
    defEl = document.createElement('p');
    defEl.className = 'tc-def';
    linkEl = document.createElement('a');
    linkEl.className = 'tc-link';
    linkEl.textContent = 'Open in glossary →';

    card.appendChild(termEl);
    card.appendChild(defEl);
    card.appendChild(linkEl);
    document.body.appendChild(card);

    card.addEventListener('mouseenter', function () {
      clearTimeout(hideTimer);
    });
    card.addEventListener('mouseleave', scheduleHide);
  }

  function position(anchor) {
    var r = anchor.getBoundingClientRect();
    var cw = card.offsetWidth;
    var ch = card.offsetHeight;
    var gap = 8;

    var top = window.scrollY + r.bottom + gap;
    // Flip above when there is no room below but room above.
    if (r.bottom + gap + ch > window.innerHeight && r.top - gap - ch > 0) {
      top = window.scrollY + r.top - gap - ch;
    }

    var left = window.scrollX + r.left;
    var docW = document.documentElement.clientWidth;
    var maxLeft = window.scrollX + docW - cw - gap;
    if (left > maxLeft) left = maxLeft;
    if (left < window.scrollX + gap) left = window.scrollX + gap;

    card.style.top = top + 'px';
    card.style.left = left + 'px';
  }

  function show(anchor) {
    if (!wide.matches) return;
    var slug = anchor.getAttribute('data-term');
    if (!slug) return;
    load().then(function (map) {
      var entry = map[slug];
      if (!entry) return;
      build();
      termEl.textContent = entry.term;
      defEl.textContent = entry.definition;
      linkEl.setAttribute('href', entry.url);
      clearTimeout(hideTimer);
      activeTerm = anchor;
      anchor.setAttribute('aria-describedby', 'term-card');
      position(anchor);
      card.classList.add('is-open');
    });
  }

  function hide() {
    clearTimeout(hideTimer);
    if (card) card.classList.remove('is-open');
    if (activeTerm) activeTerm.removeAttribute('aria-describedby');
    activeTerm = null;
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, 120);
  }

  window.addEventListener(
    'pointerdown',
    function (e) {
      lastPointerType = e.pointerType || 'mouse';
    },
    true,
  );

  Array.prototype.forEach.call(terms, function (anchor) {
    anchor.addEventListener('mouseenter', function () {
      if (lastPointerType !== 'touch') show(anchor);
    });
    anchor.addEventListener('mouseleave', scheduleHide);
    anchor.addEventListener('focus', function () {
      show(anchor);
    });
    anchor.addEventListener('blur', hide);
    anchor.addEventListener('click', function (e) {
      // Wide + touch: first tap opens the card, second navigates via the link.
      if (wide.matches && lastPointerType === 'touch') {
        if (activeTerm === anchor && card && card.classList.contains('is-open')) {
          hide();
        } else {
          e.preventDefault();
          show(anchor);
        }
      }
      // Mouse on desktop: let the click navigate to the glossary entry.
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hide();
  });

  // A tap elsewhere dismisses an open card.
  document.addEventListener('click', function (e) {
    if (!activeTerm) return;
    var t = e.target;
    if (t === activeTerm || (card && card.contains(t))) return;
    hide();
  });
})();
