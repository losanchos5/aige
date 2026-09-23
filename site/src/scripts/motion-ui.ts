// motion-ui: the single animation entry point for the site's scripts.
//
// Bundled by Astro (imported from Base.astro), so it ships as an external
// same-origin module under /_astro/ and the CSP `script-src 'self'` holds.
// `motion/mini` only exports the WAAPI `animate`; `inView`, `stagger` and the
// `spring` generator come from `motion` (tree-shaken, sideEffects: false).
//
// `run(fn, final)` is the shared reduced-motion guard: under
// `prefers-reduced-motion: reduce` it skips the animation and applies the
// explicit final state synchronously. It reads the media query on every call,
// so a preference flipped after load is honoured; the exported `reduce` is the
// value at load, kept for consumers that arm once. The legacy public/*.js
// scripts are not bundled, so the API is also exposed on `window.aigeMotion`,
// announced by an `aige:motion-ready` event on `document`.

import { animate } from 'motion/mini';
import { inView, stagger, spring } from 'motion';

const RM = '(prefers-reduced-motion: reduce)';

export const reduce = matchMedia(RM).matches;

export const run = (fn: () => void, final?: () => void) =>
  matchMedia(RM).matches ? final?.() : fn();

// The site's entrance curve (the --ease token, as a cubic-bezier array).
const EASE = [0.2, 0.7, 0.2, 1] as const;

type Styled = HTMLElement | SVGElement;

// Drawer entrance shared by public/path.js and public/crosswalk.js: the panel
// springs in from its off-canvas position (`opts.from`, default
// translateX(100%)), then its items follow with a short translateY stagger.
// Transform only, never opacity. Under reduced motion (or if an animation
// throws) the final state is set synchronously. Resolves once both settle, with
// the inline transforms motion commits removed so the CSS owns the rest state.
export const openPanel = (
  panel: Styled,
  items: ArrayLike<Styled> = [],
  opts: { from?: string } = {},
): Promise<void> =>
  new Promise((resolve) => {
    const els = [panel, ...Array.from(items)];
    const end = () => {
      els.forEach((el) => el.style.removeProperty('transform'));
      resolve();
    };
    run(() => {
      try {
        const anims = [
          animate(
            panel,
            { transform: [opts.from ?? 'translateX(100%)', 'none'] },
            { type: spring, stiffness: 320, damping: 30 },
          ),
        ];
        if (els.length > 1) {
          anims.push(
            animate(
              els.slice(1),
              { transform: ['translateY(10px)', 'none'] },
              { duration: 0.32, ease: EASE, delay: stagger(0.04, { startDelay: 0.12 }) },
            ),
          );
        }
        Promise.all(anims).then(end, end);
      } catch {
        end();
      }
    }, end);
  });

const api = { animate, inView, stagger, spring, run, reduce, openPanel };

declare global {
  interface Window {
    aigeMotion?: typeof api;
  }
}

window.aigeMotion = api;
document.dispatchEvent(new CustomEvent('aige:motion-ready'));

// Theme toggle: public/ui.js announces each flip with `theme:changed`. The CSS
// has already revealed the incoming icon (sun for dark, moon for light); it
// springs in with rotate + scale, transform only, and drops the inline
// transform motion commits once it settles. Reduced motion: it simply stays at
// rest.
document.addEventListener('theme:changed', (event) => {
  const theme = (event as CustomEvent<{ theme?: string }>).detail?.theme;
  const icon = document.querySelector<SVGElement>(
    `[data-theme-toggle] .i-${theme === 'dark' ? 'sun' : 'moon'}`,
  );
  if (!icon) return;
  const settle = () => icon.style.removeProperty('transform');
  run(() => {
    animate(
      icon,
      { transform: ['rotate(-90deg) scale(0.6)', 'rotate(0deg) scale(1)'] },
      { type: spring, stiffness: 400, damping: 22 },
    ).then(settle, settle);
  }, settle);
});
