// chart-tip: instant tooltips for chart marks (openspec chart-tooltips).
// Loaded once per page by src/components/ChartTipScript.astro.
//
// Roots: elements with data-ctip. A mark: the closest ancestor of the target,
// inside a root, named by data-tip, aria-label, a <title> child or a title
// attribute (design D1, D4); containers (svg, lists, regions, non-focusable
// holders of marks) and anything under figcaption, details.chart-alt or
// [data-ctip-skip] never are. One aria-hidden div.ctip shows the name.
// While open, native tooltip sources from the mark up to its root step aside
// and come back on close and pagehide (D3). Pointer: follows the pointer on
// the mark, freezes once it leaves so it can be reached, closes 150 ms after
// leaving both. Keyboard: focus opens, blur and Escape close; a focused mark
// off screen keeps it open with the box hidden. Touch: a tap opens; the first
// tap on a link is held, the second follows it (D5).
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
  const TAP = 800; // longest ms from a touch pointerdown to its click

  let tip = null; // the div.ctip, made on first use
  let cur = null; // the open mark
  let lent = []; // what the open mark and its ancestors lent: { el, t, next, a, l }
  let parks = []; // the <defs> made to hold lent <title>s
  let anchored = false; // placed by the mark's box (focus, touch), not the pointer
  let px = 0;
  let py = 0;
  let timer = 0;
  let frame = 0;
  let down = null; // the last pointerdown, until a key is pressed
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
  // scroll region, a list (a legend, or the cells of a grid row), and any
  // element that is not focusable but holds named marks (a role="img" plot of
  // named squares): hovering the gaps between marks names nothing.
  const CONTAINER = /^(svg|ul|ol|dl|table)$/;
  const holdsMarks = (el) => {
    for (const n of el.querySelectorAll(NAMED)) if (n.localName !== 'title' || n.parentElement !== el) return true;
    return false;
  };
  const notMark = (el, root) =>
    el === root ||
    CONTAINER.test(el.localName) ||
    /^(region|list)$/.test(el.getAttribute('role')) ||
    (!el.matches(FOCUSABLE) && holdsMarks(el));

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

  // <title> children move into a <defs> of their svg (ids still resolve, so
  // aria-labelledby names hold; a title in defs is no element's tooltip), title
  // attributes into data-ctip-title. Whoever loses its name so gets aria-label.
  function lend(mark) {
    const root = mark.closest('[data-ctip]');
    for (let el = mark; el; el = el.parentElement) {
      const t = el instanceof SVGElement && ownTitle(el);
      const a = el.getAttribute('title');
      if (t || a !== null) {
        const e = { el, t, next: t && t.nextSibling, a, l: false };
        if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby') && (t || el.matches(FOCUSABLE))) {
          el.setAttribute('aria-label', (t ? t.textContent : a).trim());
          e.l = true;
        }
        if (t) {
          const svg = el.closest('svg');
          let d = svg.querySelector(':scope>defs.ctip-park');
          if (!d) {
            d = svg.appendChild(doc.createElementNS(svg.namespaceURI, 'defs'));
            d.setAttribute('class', 'ctip-park');
            parks.push(d);
          }
          d.appendChild(t);
        }
        if (a !== null) {
          el.setAttribute('data-ctip-title', a);
          el.removeAttribute('title');
        }
        lent.push(e);
      }
      if (el === root) break;
    }
  }

  function release() {
    if (!cur) return;
    for (const { el, t, next, a, l } of lent.reverse()) {
      if (t) el.insertBefore(t, next && next.parentNode === el ? next : null);
      if (a !== null) {
        el.setAttribute('title', a);
        el.removeAttribute('data-ctip-title');
      }
      if (l) el.removeAttribute('aria-label');
    }
    for (const d of parks) d.remove();
    lent = [];
    parks = [];
    cur.classList.remove('ctip-on');
    cur = null;
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
      lend(mark);
      if (!tip) {
        tip = doc.createElement('div');
        tip.className = 'ctip';
        tip.setAttribute('aria-hidden', 'true');
        doc.body.appendChild(tip);
      }
      tip.textContent = name;
    }
    place();
  }

  function place() {
    frame = 0;
    if (!cur) return;
    // The screen is the visual viewport (a phone page that overflows is wider).
    const de = doc.documentElement;
    const v = self.visualViewport || { offsetLeft: 0, offsetTop: 0, width: de.clientWidth, height: de.clientHeight };
    const x0 = v.offsetLeft;
    const y0 = v.offsetTop;
    const vw = v.width;
    const vh = v.height;
    let ax = px;
    let above = py - GAP;
    let below = py + GAP + 8;
    if (anchored) {
      const r = cur.getBoundingClientRect();
      // Off screen: hide the box, keep the mark open; a scroll brings it back.
      tip.hidden = r.bottom < y0 || r.top > y0 + vh || r.right < x0 || r.left > x0 + vw;
      if (tip.hidden) return;
      ax = r.left + r.width / 2;
      above = r.top - EDGE;
      below = r.bottom + EDGE;
    }
    tip.hidden = false;
    // Measure at the left edge, where the box has the whole width to wrap in.
    tip.style.maxWidth = `min(20rem, ${vw - 2 * EDGE}px)`;
    tip.style.left = '0px';
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    let y = above - h;
    if (y < y0 + EDGE) y = below;
    if (y + h > y0 + vh - EDGE) y = Math.max(y0 + EDGE, y0 + vh - EDGE - h);
    const x = Math.max(x0 + EDGE, Math.min(ax - w / 2, x0 + vw - EDGE - w));
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
    down = e;
  }, passive);

  on('pointerover', (e) => {
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

  // Follow the pointer only on the mark, so it can step onto the tooltip.
  on('pointermove', (e) => {
    if (!cur || anchored || e.pointerType === 'touch' || markOf(e.target) !== cur) return;
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
      keyboard = !down || down.pointerType !== 'touch';
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
    down = null;
    if (e.key !== 'Escape' || !cur) return;
    dismissed = cur;
    hide();
  });

  on('click', (e) => {
    const t = e.target;
    // Only a real tap: a touch pointerdown just before; never a keyboard or AT
    // click (detail 0). The click may land on another element than the
    // pointerdown (the browser adjusts touch points), so either may be the mark.
    if (!(e.detail > 0 && down && down.pointerType === 'touch' && e.timeStamp - down.timeStamp < TAP)) return;
    if (inTip(t)) return;
    let m = markOf(t);
    // The browser may move a tap on a mark that is not clickable onto a nearby
    // link (touch adjustment, events and target alike): the element really
    // under the finger tells which mark the reader tapped.
    const from = markOf(doc.elementFromPoint(down.clientX, down.clientY));
    if (from && from !== m) {
      e.preventDefault();
      m = from;
    }
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

  // Only a scroll that moves the mark counts (the page, or a box around it). A
  // pointer tooltip stays while the mark is under the pointer; an anchored one
  // shows again when its mark is back in view.
  const scrolled = (e) => {
    const t = e.target;
    if (!cur || (t !== doc && !(t.contains && t.contains(cur)))) return;
    if (!anchored) {
      const under = doc.elementFromPoint(px, py);
      if (!under || (!inTip(under) && markOf(under) !== cur)) return hide();
    }
    queue();
  };
  addEventListener('scroll', scrolled, passive);
  addEventListener('scrollend', scrolled, passive);
  addEventListener('resize', () => {
    if (cur) queue();
  }, { passive: true });
  addEventListener('pagehide', hide);
})();
