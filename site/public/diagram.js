/* Diagram interaction, loaded same-origin so CSP script-src 'self' holds (no
   inline JS). Progressive enhancement: without this file every node and edge is
   static and legible. Here, hovering or focusing a node ([data-node-id]) lights
   its connected edges and neighbour nodes, dims the rest, and fills the note
   panel; clicking or pressing Enter/Space pins that selection (aria-pressed),
   and a second activation, Escape, or a click outside clears it. Edges draw on
   once when the figure scrolls into view, unless the user prefers reduced
   motion. Works for every archify diagram type (the semantic hooks are shared). */
(function () {
  'use strict';

  if (window.__diagramInit) return;
  window.__diagramInit = true;

  var figures = Array.prototype.slice.call(document.querySelectorAll('figure.diagram'));
  if (!figures.length) return;

  function reduceMotion() {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  }

  var controllers = [];

  function setup(figure) {
    var nodes = Array.prototype.slice.call(figure.querySelectorAll('[data-node-id]'));
    var edges = Array.prototype.slice.call(figure.querySelectorAll('[data-edge-id]'));
    if (!nodes.length) return;

    var notePanel = figure.querySelector('.diagram-note');

    // Per-node notes payload { id: { label, sublabel?, note? } }.
    var notes = {};
    try {
      var payload = figure.querySelector('[data-diagram-notes]');
      if (payload) notes = JSON.parse(payload.textContent || '{}');
    } catch (e) {
      notes = {};
    }

    // Adjacency from the edge endpoints.
    function edgeFrom(edge) {
      return edge.getAttribute('data-edge-from');
    }
    function edgeTo(edge) {
      return edge.getAttribute('data-edge-to');
    }

    var pinnedId = null;

    function ensureNoteStructure() {
      if (!notePanel || notePanel._built) return;
      var label = document.createElement('span');
      label.className = 'dn-label';
      var sub = document.createElement('span');
      sub.className = 'dn-sub';
      var note = document.createElement('span');
      note.className = 'dn-note';
      notePanel.appendChild(label);
      notePanel.appendChild(sub);
      notePanel.appendChild(note);
      notePanel._label = label;
      notePanel._sub = sub;
      notePanel._note = note;
      notePanel._built = true;
    }

    function showNote(id) {
      if (!notePanel) return;
      ensureNoteStructure();
      var data = notes[id] || {};
      var sub = data.sublabel || '';
      var note = data.note && data.note !== sub ? data.note : '';
      notePanel._label.textContent = data.label || id;
      notePanel._sub.textContent = sub;
      notePanel._sub.hidden = !sub;
      notePanel._note.textContent = note;
      notePanel._note.hidden = !note;
      notePanel.hidden = false;
    }

    function hideNote() {
      if (!notePanel) return;
      notePanel.hidden = true;
      if (notePanel._built) {
        notePanel._label.textContent = '';
        notePanel._sub.textContent = '';
        notePanel._note.textContent = '';
      }
    }

    function highlight(id) {
      var lit = {};
      lit[id] = true;
      edges.forEach(function (edge) {
        var from = edgeFrom(edge);
        var to = edgeTo(edge);
        var related = from === id || to === id;
        edge.classList.toggle('is-lit', related);
        edge.classList.toggle('is-dim', !related);
        if (related) {
          if (from) lit[from] = true;
          if (to) lit[to] = true;
        }
      });
      nodes.forEach(function (node) {
        var on = lit[node.getAttribute('data-node-id')] === true;
        node.classList.toggle('is-lit', on);
        node.classList.toggle('is-dim', !on);
      });
      figure.classList.add('has-active');
    }

    function clearHighlight() {
      nodes.forEach(function (node) {
        node.classList.remove('is-lit', 'is-dim');
      });
      edges.forEach(function (edge) {
        edge.classList.remove('is-lit', 'is-dim');
      });
      figure.classList.remove('has-active');
    }

    function setPressed(id) {
      nodes.forEach(function (node) {
        var on = id !== null && node.getAttribute('data-node-id') === id;
        node.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    function restore() {
      if (pinnedId !== null) {
        highlight(pinnedId);
        showNote(pinnedId);
      } else {
        clearHighlight();
        hideNote();
      }
    }

    function unpin() {
      if (pinnedId === null) return;
      pinnedId = null;
      setPressed(null);
      clearHighlight();
      hideNote();
    }

    function togglePin(id) {
      if (pinnedId === id) {
        unpin();
        return;
      }
      pinnedId = id;
      setPressed(id);
      highlight(id);
      showNote(id);
    }

    nodes.forEach(function (node) {
      var id = node.getAttribute('data-node-id');

      node.addEventListener('mouseenter', function () {
        highlight(id);
        showNote(id);
      });
      node.addEventListener('mouseleave', restore);
      node.addEventListener('focus', function () {
        highlight(id);
        showNote(id);
      });
      node.addEventListener('blur', restore);
      node.addEventListener('click', function () {
        togglePin(id);
      });
      node.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
          event.preventDefault();
          togglePin(id);
        }
      });
    });

    figure.classList.add('diagram-js');

    controllers.push({ figure: figure, unpin: unpin });

    // ---- Enlarge dialog -----------------------------------------------------
    // In the 72ch prose column the SVG shrinks to ~0.5 and its node text turns
    // illegible; the dialog shows it near full-screen at natural width. We MOVE
    // (not clone) .diagram-canvas and .diagram-note into the dialog so their
    // listeners and pinned state survive. The dialog is a descendant of the
    // figure, so the node listeners keep firing while it is open.
    var dialog = figure.querySelector('.diagram-dialog');
    var enlargeBtn = figure.querySelector('.diagram-enlarge');
    var canvas = figure.querySelector('.diagram-canvas');
    if (dialog && enlargeBtn && canvas) {
      enlargeBtn.hidden = false;

      var titleEl = figure.querySelector('.diagram-fig-title');
      var titleText = titleEl ? titleEl.textContent || '' : '';

      var canvasHome = null;
      var noteHome = null;
      var bar = null;

      var openDialog = function () {
        // Toolbar: the diagram title and a Close button.
        bar = document.createElement('div');
        bar.className = 'diagram-dialog-bar';
        var barTitle = document.createElement('span');
        barTitle.className = 'diagram-dialog-title';
        barTitle.textContent = titleText;
        var closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'diagram-dialog-close';
        closeBtn.textContent = 'Close';
        closeBtn.addEventListener('click', function () {
          dialog.close();
        });
        bar.appendChild(barTitle);
        bar.appendChild(closeBtn);

        // Placeholders mark where the canvas and note return to on close.
        canvasHome = document.createComment('diagram-canvas');
        canvas.parentNode.insertBefore(canvasHome, canvas);
        dialog.appendChild(bar);
        dialog.appendChild(canvas);
        if (notePanel) {
          noteHome = document.createComment('diagram-note');
          notePanel.parentNode.insertBefore(noteHome, notePanel);
          dialog.appendChild(notePanel);
        }

        dialog.showModal();
        closeBtn.focus();
      };

      // Any close path (Close button, the dialog's native Escape, or a backdrop
      // click) restores the moved nodes and focus, then empties the dialog. The
      // document-level Escape handler still clears the pinned selection — it does
      // not preventDefault, so the dialog closes normally.
      dialog.addEventListener('close', function () {
        if (canvasHome && canvasHome.parentNode) {
          canvasHome.parentNode.replaceChild(canvas, canvasHome);
        }
        canvasHome = null;
        if (noteHome && noteHome.parentNode) {
          noteHome.parentNode.replaceChild(notePanel, noteHome);
        }
        noteHome = null;
        if (bar) {
          bar.remove();
          bar = null;
        }
        enlargeBtn.focus();
      });

      // A click on the dialog element itself is a backdrop click; close it.
      dialog.addEventListener('click', function (event) {
        if (event.target === dialog) dialog.close();
      });

      enlargeBtn.addEventListener('click', openDialog);
    }

    // Draw-on: reveal the edges once when the figure enters the viewport.
    if (!reduceMotion() && 'IntersectionObserver' in window && edges.length) {
      var drawn = false;
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting || drawn) return;
            drawn = true;
            io.disconnect();
            edges.forEach(function (edge, i) {
              if (typeof edge.getTotalLength !== 'function') return;
              var len = edge.getTotalLength();
              if (!len) return;
              edge.style.strokeDasharray = len;
              edge.style.strokeDashoffset = len;
              // Force reflow so the transition runs from the offset start.
              void edge.getBoundingClientRect();
              edge.style.transition =
                'stroke-dashoffset 650ms var(--ease) ' + Math.min(i * 40, 400) + 'ms';
              edge.style.strokeDashoffset = '0';
              var cleanup = function () {
                edge.style.transition = '';
                edge.style.strokeDasharray = '';
                edge.style.strokeDashoffset = '';
                edge.removeEventListener('transitionend', cleanup);
              };
              edge.addEventListener('transitionend', cleanup);
            });
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
      );
      io.observe(figure);
    }
  }

  figures.forEach(setup);

  if (!controllers.length) return;

  // Escape clears every pinned figure; a click outside any node does the same.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      controllers.forEach(function (c) {
        c.unpin();
      });
    }
  });

  document.addEventListener('click', function (event) {
    var target = event.target;
    var inNode = target && target.closest && target.closest('[data-node-id]');
    if (inNode) return;
    controllers.forEach(function (c) {
      c.unpin();
    });
  });
})();
