/* Grouped navigation behaviour, loaded from a same-origin file so the CSP
   script-src 'self' holds (no inline JS). Two parts: the desktop disclosure
   panels (WAI-ARIA "disclosure navigation" pattern) and the mobile <dialog>
   drawer. No globals; every query is guarded. */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function onMedia(query, handler) {
    try {
      var mq = window.matchMedia(query);
      if (mq.addEventListener) mq.addEventListener('change', handler);
      else if (mq.addListener) mq.addListener(handler);
    } catch (e) {}
  }

  function initDesktop() {
    var navRoot = document.querySelector('.nav-desktop');
    if (!navRoot) return;

    var triggers = Array.prototype.slice.call(navRoot.querySelectorAll('[data-nav-trigger]'));
    if (!triggers.length) return;

    var topControls = Array.prototype.slice.call(
      navRoot.querySelectorAll('[data-nav-trigger], .nav-link')
    );

    function menuFor(trigger) {
      var id = trigger.getAttribute('aria-controls');
      return id ? document.getElementById(id) : null;
    }
    function isOpen(trigger) {
      return trigger.getAttribute('aria-expanded') === 'true';
    }
    function linksIn(menu) {
      return menu ? Array.prototype.slice.call(menu.querySelectorAll('a[href]')) : [];
    }
    function close(trigger) {
      var menu = menuFor(trigger);
      trigger.setAttribute('aria-expanded', 'false');
      if (menu) menu.hidden = true;
    }
    function closeAll(except) {
      triggers.forEach(function (t) {
        if (t !== except) close(t);
      });
    }
    function open(trigger) {
      closeAll(trigger);
      var menu = menuFor(trigger);
      if (!menu) return;
      trigger.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
    }
    function moveTop(fromEl, dir) {
      var idx = topControls.indexOf(fromEl);
      if (idx < 0) return;
      var next = topControls[(idx + dir + topControls.length) % topControls.length];
      if (next) next.focus();
    }

    triggers.forEach(function (trigger) {
      var menu = menuFor(trigger);

      trigger.addEventListener('click', function () {
        if (isOpen(trigger)) close(trigger);
        else open(trigger);
      });

      trigger.addEventListener('keydown', function (e) {
        var key = e.key;
        if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
          e.preventDefault();
          if (isOpen(trigger)) {
            close(trigger);
            return;
          }
          open(trigger);
          var links = linksIn(menu);
          if (links.length) links[0].focus();
        } else if (key === 'ArrowDown') {
          e.preventDefault();
          open(trigger);
          var down = linksIn(menu);
          if (down.length) down[0].focus();
        } else if (key === 'ArrowUp') {
          e.preventDefault();
          open(trigger);
          var up = linksIn(menu);
          if (up.length) up[up.length - 1].focus();
        } else if (key === 'Escape') {
          if (isOpen(trigger)) {
            e.preventDefault();
            close(trigger);
            trigger.focus();
          }
        } else if (key === 'ArrowLeft' || key === 'ArrowRight') {
          e.preventDefault();
          moveTop(trigger, key === 'ArrowRight' ? 1 : -1);
        }
      });
    });

    // Keyboard within an open panel.
    navRoot.addEventListener('keydown', function (e) {
      var link = e.target && e.target.closest ? e.target.closest('[data-nav-menu] a[href]') : null;
      if (!link) return;
      var menu = link.closest('[data-nav-menu]');
      var trigger = triggers.filter(function (t) {
        return menuFor(t) === menu;
      })[0];
      var links = linksIn(menu);
      var i = links.indexOf(link);
      var key = e.key;
      if (key === 'ArrowDown') {
        e.preventDefault();
        (links[i + 1] || links[0]).focus();
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        (links[i - 1] || links[links.length - 1]).focus();
      } else if (key === 'Home') {
        e.preventDefault();
        links[0].focus();
      } else if (key === 'End') {
        e.preventDefault();
        links[links.length - 1].focus();
      } else if (key === 'Escape') {
        e.preventDefault();
        if (trigger) {
          close(trigger);
          trigger.focus();
        }
      } else if (key === 'ArrowLeft' || key === 'ArrowRight') {
        e.preventDefault();
        if (trigger) moveTop(trigger, key === 'ArrowRight' ? 1 : -1);
      }
    });

    // Close on a pointer press outside the bar, or when focus leaves it.
    document.addEventListener('pointerdown', function (e) {
      if (!navRoot.contains(e.target)) closeAll(null);
    });
    navRoot.addEventListener('focusout', function (e) {
      var to = e.relatedTarget;
      if (!to || !navRoot.contains(to)) closeAll(null);
    });

    // Hover-intent, only on real pointer devices.
    var hoverCapable = false;
    try {
      hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    } catch (e) {}
    if (hoverCapable) {
      triggers.forEach(function (trigger) {
        var group = trigger.closest('.nav-group');
        if (!group) return;
        var openTimer = null;
        var closeTimer = null;
        group.addEventListener('pointerenter', function () {
          if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = null;
          }
          openTimer = setTimeout(function () {
            open(trigger);
          }, 80);
        });
        group.addEventListener('pointerleave', function () {
          if (openTimer) {
            clearTimeout(openTimer);
            openTimer = null;
          }
          closeTimer = setTimeout(function () {
            close(trigger);
          }, 200);
        });
        // A click or Escape while the hover-intent timer is pending must not
        // reopen the panel after the user has already decided.
        function cancelPendingOpen() {
          if (openTimer) {
            clearTimeout(openTimer);
            openTimer = null;
          }
        }
        trigger.addEventListener('click', cancelPendingOpen);
        group.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' || e.key === 'Esc') cancelPendingOpen();
        });
      });
    }

    // Crossing the desktop breakpoint closes every panel.
    onMedia('(min-width: 840px)', function () {
      closeAll(null);
    });
  }

  function initDrawer() {
    var drawer = document.getElementById('nav-drawer');
    if (!drawer) return;
    var openBtn = document.querySelector('[data-nav-open]');
    var html = document.documentElement;

    function openDrawer() {
      if (typeof drawer.showModal === 'function' && !drawer.open) drawer.showModal();
      else drawer.setAttribute('open', '');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
      html.classList.add('nav-locked');
    }
    function closeDrawer() {
      if (drawer.open && typeof drawer.close === 'function') drawer.close();
      else drawer.removeAttribute('open');
    }

    if (openBtn) openBtn.addEventListener('click', openDrawer);

    Array.prototype.forEach.call(drawer.querySelectorAll('[data-nav-close]'), function (btn) {
      btn.addEventListener('click', closeDrawer);
    });

    // The drawer's search row opens the global search dialog; close the drawer
    // first so two modal dialogs never stack.
    Array.prototype.forEach.call(drawer.querySelectorAll('[data-search-open]'), function (btn) {
      btn.addEventListener('click', closeDrawer);
    });

    // Backdrop click: a click that lands on the dialog element itself.
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer) closeDrawer();
    });

    // Escape fires 'cancel' then 'close'; the close handler does the cleanup
    // and returns focus to the burger.
    drawer.addEventListener('close', function () {
      if (openBtn) {
        openBtn.setAttribute('aria-expanded', 'false');
        openBtn.focus();
      }
      html.classList.remove('nav-locked');
    });

    // Growing past the desktop breakpoint closes the drawer.
    onMedia('(min-width: 840px)', function (ev) {
      if (ev.matches) closeDrawer();
    });
  }

  ready(function () {
    initDesktop();
    initDrawer();
  });
})();
