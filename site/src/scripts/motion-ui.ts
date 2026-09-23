// motion-ui: the single animation entry point for the site's scripts.
//
// Bundled by Astro (imported from Base.astro), so it ships as an external
// same-origin module under /_astro/ and the CSP `script-src 'self'` holds.
// `motion/mini` only exports the WAAPI `animate`; `inView`, `stagger` and the
// `spring` generator come from `motion` (tree-shaken, sideEffects: false).
//
// `run(fn, final)` is the shared reduced-motion guard: under
// `prefers-reduced-motion: reduce` it skips the animation and applies the
// explicit final state synchronously. The legacy public/*.js scripts are not
// bundled, so the API is also exposed on `window.aigeMotion`, announced by an
// `aige:motion-ready` event on `document`.

import { animate } from 'motion/mini';
import { inView, stagger, spring } from 'motion';

export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const run = (fn: () => void, final?: () => void) => (reduce ? final?.() : fn());

const api = { animate, inView, stagger, spring, run, reduce };

declare global {
  interface Window {
    aigeMotion?: typeof api;
  }
}

window.aigeMotion = api;
document.dispatchEvent(new CustomEvent('aige:motion-ready'));

// Theme toggle: public/ui.js announces each flip with `theme:changed`. The CSS
// has already revealed the incoming icon (sun for dark, moon for light); it
// springs in with rotate + scale, transform only. Reduced motion: it simply
// stays at rest.
document.addEventListener('theme:changed', (event) => {
  const theme = (event as CustomEvent<{ theme?: string }>).detail?.theme;
  const icon = document.querySelector<SVGElement>(
    `[data-theme-toggle] .i-${theme === 'dark' ? 'sun' : 'moon'}`,
  );
  if (!icon) return;
  run(
    () => {
      animate(
        icon,
        { transform: ['rotate(-90deg) scale(0.6)', 'rotate(0deg) scale(1)'] },
        { type: spring, stiffness: 400, damping: 22 },
      );
    },
    () => icon.style.removeProperty('transform'),
  );
});
