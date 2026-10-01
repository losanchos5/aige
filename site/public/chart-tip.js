// chart-tip: instant tooltips for chart marks (openspec chart-tooltips).
// Loaded once per page by src/components/ChartTipScript.astro.
//
// Roots are the elements with data-ctip (Chart.astro's figure, the HTML chart
// grids, the AIGP heat map). A mark is the closest ancestor of the event
// target, inside a root, that has a name: data-tip, aria-label, a direct
// <title> child (SVG) or a title attribute, in that order. Containers (the
// <svg>, whose <title> is the chart's; role="region" scroll wrappers; lists,
// such as an HTML legend) are never marks, and nothing under figcaption,
// details.chart-alt or [data-ctip-skip] is.
//
// One div.ctip in <body>, aria-hidden: its text is the mark's accessible name,
// which assistive technology already reads from the mark (design D1). While it
// is open the mark's <title> leaves the DOM and its title attribute moves to
// data-ctip-title, so the browser shows no native tooltip on top; a focusable
// mark without aria-label gets one with the same name meanwhile. Everything is
// restored on close and on pagehide (D3).
//
// Mouse and pen: hover opens, the tooltip follows the pointer, and leaving the
// mark for the tooltip keeps it open (150 ms grace). Keyboard: focus opens it
// beside the mark, blur closes it, Escape closes it without moving focus.
// Touch: only click opens, so a drag that scrolls never does. The first tap on
// a linked mark shows its name without following the link (preventDefault,
// never stopPropagation, so other islands still hear the click); the second
// tap follows it. Buttons and [data-cw-open] cells keep their click and show
// the tooltip too. A tap between marks opens the nearest one within 12 px; a
// tap elsewhere closes.
(() => {
  if (window.__ctip) return;
  window.__ctip = true;

  const doc = document;
  const SKIP = 'figcaption,details.chart-alt,[data-ctip-skip]';
  const NAMED = '[data-tip],[aria-label],title,[title]';
  const FOCUSABLE = 'a[href],button,input,select,textarea,summary,[tabindex]';
  const OWN_CLICK = 'button,[role="button"],[data-cw-open]';
  const GRACE = 150;
  const GAP = 12;
  const EDGE = 8;

  let tip = null; // the div.ctip, made on first use
  let cur = null; // the open mark
  let saved = null; // what the open mark lent: { t, next, a, l }
  let anchored = false; // placed by the mark's box (focus, touch), not the pointer
  let px = 0;
  let py = 0;
  let timer = 0;
  let frame = 0;
  let lastType = '';
  let dismissed = null; // closed with Escape, until pointer or focus leaves it

  const ownTitle = (el) => {
    for (const c of el.children) if (c.localName === 'title') return c;
    return null;
  };

  function nameOf(el) {
    const t = ownTitle(el);
    return (el.getAttribute('data-tip') || el.getAttribute('aria-label') || (t && t.textContent) || el.getAttribute('title') || '').trim();
  }

  // Containers are never marks, even when labelled: the root, an <svg>, a
  // scroll region, a list (a legend, or the cells of a grid row).
  const CONTAINER = /^(svg|ul|ol|dl|table)$/;
  const notMark = (el, root) => el === root || CONTAINER.test(el.localName) || /^(region|list)$/.test(el.getAttribute('role'));

  function markOf(target) {
    if (!target || !target.closest) return null;
    const root = target.closest('[data-ctip]');
    if (!root || target.closest(SKIP)) return null;
    for (let el = target; el && el !== root; el = el.parentElement) {
      if (el === cur) return el;
      if (!notMark(el, root) && nameOf(el)) return el;
    }
    return null;
  }

  // The named mark of `root` whose box comes within GAP px of (x, y).
  function nearest(root, x, y) {
    let best = null;
    let bd = GAP + 0.01;
    for (const n of root.querySelectorAll(NAMED)) {
      const el = n.localName === 'title' ? n.parentElement : n;
      if (!el || notMark(el, root) || el.closest(SKIP) || !nameOf(el)) continue;
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) continue;
      const d = Math.hypot(Math.max(r.left - x, 0, x - r.right), Math.max(r.top - y, 0, y - r.bottom));
      if (d < bd) {
        bd = d;
        best = el;
      }
    }
    return best;
  }

  function release() {
    if (!cur) return;
    const s = saved;
    if (s.t) cur.insertBefore(s.t, s.next && s.next.parentNode === cur ? s.next : null);
    if (s.a !== null) {
      cur.setAttribute('title', s.a);
      cur.removeAttribute('data-ctip-title');
    }
    if (s.l) cur.removeAttribute('aria-label');
    cur.classList.remove('ctip-on');
    cur = null;
    saved = null;
  }

  function hide() {
    clearTimeout(timer);
    release();
    if (tip) tip.hidden = true;
  }

  function show(mark, byBox) {
    clearTimeout(timer);
    anchored = byBox;
    if (mark !== cur) {
      const name = nameOf(mark);
      release();
      cur = mark;
      const t = ownTitle(mark);
      saved = { t, next: t && t.nextSibling, a: mark.getAttribute('title'), l: false };
      if (t) t.remove();
      if (saved.a !== null) {
        mark.setAttribute('data-ctip-title', saved.a);
        mark.removeAttribute('title');
      }
      if (!mark.hasAttribute('aria-label') && mark.matches(FOCUSABLE)) {
        mark.setAttribute('aria-label', name);
        saved.l = true;
      }
      if (!tip) {
        tip = doc.createElement('div');
        tip.className = 'ctip';
        tip.setAttribute('aria-hidden', 'true');
        doc.body.appendChild(tip);
      }
      tip.textContent = name;
    }
    tip.hidden = false;
    place();
  }

  function place() {
    frame = 0;
    if (!cur) return;
    const vw = doc.documentElement.clientWidth;
    const vh = doc.documentElement.clientHeight;
    let ax = px;
    let above = py - GAP;
    let below = py + GAP + 8;
    if (anchored) {
      const r = cur.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) return hide();
      ax = r.left + r.width / 2;
      above = r.top - EDGE;
      below = r.bottom + EDGE;
    }
    // Measure at the left edge, where the box has the whole width to wrap in.
    tip.style.left = '0px';
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    let y = above - h;
    if (y < EDGE) y = below;
    if (y + h > vh - EDGE) y = Math.max(EDGE, vh - EDGE - h);
    const x = Math.max(EDGE, Math.min(ax - w / 2, vw - EDGE - w));
    tip.style.left = `${Math.round(x)}px`;
    tip.style.top = `${Math.round(y)}px`;
  }

  const queue = () => {
    if (!frame) frame = requestAnimationFrame(place);
  };
  const inTip = (el) => !!(tip && el && tip.contains(el));
  const on = (type, fn, opts) => doc.addEventListener(type, fn, opts);
  const passive = { capture: true, passive: true };

  on('pointerdown', (e) => {
    lastType = e.pointerType;
  }, passive);

  on('pointerover', (e) => {
    lastType = e.pointerType;
    if (e.pointerType === 'touch') return;
    if (inTip(e.target)) return clearTimeout(timer);
    const m = markOf(e.target);
    if (m && m !== dismissed) {
      px = e.clientX;
      py = e.clientY;
      show(m, false);
    }
  }, passive);

  on('pointerout', (e) => {
    if (e.pointerType === 'touch') return;
    const to = e.relatedTarget;
    if (dismissed && !(to && dismissed.contains(to))) dismissed = null;
    if (!cur || anchored || inTip(to) || markOf(to) === cur) return;
    clearTimeout(timer);
    timer = setTimeout(hide, GRACE);
  }, passive);

  on('pointermove', (e) => {
    if (!cur || anchored || e.pointerType === 'touch' || inTip(e.target)) return;
    px = e.clientX;
    py = e.clientY;
    queue();
  }, passive);

  on('focusin', (e) => {
    const t = e.target;
    let keyboard;
    try {
      keyboard = t.matches(':focus-visible');
    } catch (err) {
      keyboard = lastType !== 'touch';
    }
    const m = keyboard && markOf(t);
    if (m && m !== dismissed) show(m, true);
  });

  on('focusout', (e) => {
    const m = markOf(e.target);
    if (m && m === dismissed) dismissed = null;
    if (cur && anchored && m === cur) hide();
  });

  on('keydown', (e) => {
    if (e.key !== 'Escape' || !cur) return;
    dismissed = cur;
    hide();
  });

  on('click', (e) => {
    if (lastType !== 'touch') return;
    const t = e.target;
    if (inTip(t)) return;
    let m = markOf(t);
    const hit = !!m;
    if (!m) {
      const root = t.closest && !t.closest(SKIP) && t.closest('[data-ctip]');
      m = root ? nearest(root, e.clientX, e.clientY) : null;
    }
    if (!m) return hide();
    // First tap on a link that only navigates: show the name, keep the page.
    const link = t.closest('a[href]');
    if (hit && m !== cur && link && link.getAttribute('href') && !t.closest(OWN_CLICK)) e.preventDefault();
    show(m, true);
    m.classList.add('ctip-on');
  }, true);

  // Only a scroll that moves the mark counts (the page, or a box around it);
  // another box scrolling on its own (a table of contents) leaves it be. A
  // tooltip that follows the pointer stays while the mark is still under it.
  addEventListener('scroll', (e) => {
    const t = e.target;
    if (!cur || (t !== doc && !(t.contains && t.contains(cur)))) return;
    if (!anchored) {
      const under = doc.elementFromPoint(px, py);
      if (!under || (!inTip(under) && markOf(under) !== cur)) return hide();
    }
    queue();
  }, passive);
  addEventListener('resize', () => {
    if (cur) queue();
  }, { passive: true });
  addEventListener('pagehide', hide);
})();
