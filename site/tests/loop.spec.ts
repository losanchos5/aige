import { test, expect, type Page } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

// The home governance loop (GovernanceLoop.astro + public/loop.js) and the
// home's section backgrounds. The loop replaced an archify figure whose hover
// note, drawn over the diagram, covered the step under the pointer and made it
// flicker; the first block below is the regression test for that.

const ORDER = ['obligation', 'policy', 'inventory', 'eval', 'runtime', 'evidence', 'auditor'];

async function openLoop(page: Page, width: number, reducedMotion: 'reduce' | 'no-preference' = 'reduce') {
  await page.setViewportSize({ width, height: 900 });
  await page.emulateMedia({ reducedMotion });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const loop = page.locator('.loop-sec figure[data-loop]');
  // Centre it, clear of the sticky header (instantly: the site scrolls smoothly).
  await loop.evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  return loop;
}

type Box = { x: number; y: number; width: number; height: number };
const inside = (a: Box, b: Box, slack = 0.5) =>
  a.x >= b.x - slack &&
  a.y >= b.y - slack &&
  a.x + a.width <= b.x + b.width + slack &&
  a.y + a.height <= b.y + b.height + slack;
const overlaps = (a: Box, b: Box) =>
  a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;

test.describe('governance loop: content', () => {
  test('seven steps in loop order, each with an icon, and seven labelled edges', async ({ page }) => {
    const loop = await openLoop(page, 1440);
    const steps = loop.locator('.loop-step');
    await expect(steps).toHaveCount(7);
    expect(await steps.evaluateAll((els) => els.map((el) => el.getAttribute('data-step')))).toEqual(
      ORDER,
    );
    await expect(loop.locator('.loop-node .loop-icon svg')).toHaveCount(7);
    await expect(loop.locator('.loop-lane')).toHaveCount(4);
    await expect(loop.locator('.loop-pill')).toHaveText([
      'compiles to',
      'scopes',
      'checks',
      'gates',
      'emits',
      'attests',
      'closes the loop',
    ]);
  });

  test('each step button is described by its note', async ({ page }) => {
    const loop = await openLoop(page, 1440);
    const inventory = loop.locator('.loop-node[data-step="inventory"]');
    await expect(inventory).toHaveAccessibleDescription(/registry of what is actually running/);
  });
});

test.describe('governance loop: hover is stable (no flicker)', () => {
  for (const width of [1440, 1024]) {
    test(`at ${width} the pointer resting on any step keeps it active`, async ({ page }) => {
      const loop = await openLoop(page, width, 'no-preference');
      for (const id of ORDER) {
        const node = loop.locator(`.loop-node[data-step="${id}"]`);
        const box = (await node.boundingBox())!;
        const cx = box.x + box.width / 2;
        const cy = box.y + box.height / 2;
        await page.mouse.move(cx, cy, { steps: 4 });
        await page.waitForTimeout(600);
        for (let i = 0; i < 10; i++) {
          const state = await page.evaluate(
            ({ x, y }) => {
              const fig = document.querySelector('[data-loop]') as HTMLElement;
              const hit = document.elementFromPoint(x, y)?.closest('.loop-node') as HTMLElement | null;
              const shown = fig.querySelector('.loop-detail-panel.is-shown') as HTMLElement | null;
              return {
                active: fig.dataset.active ?? null,
                hit: hit?.dataset.step ?? null,
                shown: shown?.dataset.for ?? null,
              };
            },
            { x: cx, y: cy },
          );
          expect(state, `${id}, sample ${i}`).toEqual({ active: id, hit: id, shown: id });
          await page.waitForTimeout(50);
        }
      }
    });
  }

  test('leaving the canvas restores the idle detail', async ({ page }) => {
    const loop = await openLoop(page, 1440);
    await loop.locator('.loop-node[data-step="inventory"]').hover();
    await expect(loop).toHaveAttribute('data-active', 'inventory');
    await page.mouse.move(5, 5);
    await expect(loop).not.toHaveAttribute('data-active', /.*/);
    await expect(loop.locator('.loop-detail-panel.is-shown')).toHaveAttribute('data-for', '');
  });

  test('a click pins a step past the pointer leaving; Escape releases it', async ({ page }) => {
    const loop = await openLoop(page, 1440);
    await loop.locator('.loop-node[data-step="eval"]').click();
    await page.mouse.move(5, 5);
    await page.waitForTimeout(300);
    await expect(loop).toHaveAttribute('data-active', 'eval');
    await expect(loop.locator('.loop-node[data-step="eval"]')).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(loop).not.toHaveAttribute('data-active', /.*/);
    await expect(loop.locator('.loop-node[data-step="eval"]')).toHaveAttribute('aria-expanded', 'false');
  });

  test('a press outside the figure releases a pin; hover alone expands nothing', async ({ page }) => {
    const loop = await openLoop(page, 1440);
    await loop.locator('.loop-node[data-step="runtime"]').hover();
    await expect(loop.locator('.loop-node[data-step="runtime"]')).toHaveAttribute('aria-expanded', 'false');
    await loop.locator('.loop-node[data-step="runtime"]').click();
    await expect(loop.locator('.loop-step[data-step="runtime"]')).toHaveClass(/is-pinned/);
    await page.mouse.click(8, 450);
    await expect(loop).not.toHaveAttribute('data-active', /.*/);
    await expect(loop.locator('.loop-step.is-pinned')).toHaveCount(0);
  });

  test('keyboard focus shows a step and Tab walks the loop in order', async ({ page }) => {
    const loop = await openLoop(page, 1440);
    await loop.locator('.loop-node[data-step="obligation"]').focus();
    await expect(loop).toHaveAttribute('data-active', 'obligation');
    await page.keyboard.press('Tab');
    await expect(loop).toHaveAttribute('data-active', 'policy');
    await expect(loop.locator('.loop-detail-panel.is-shown')).toHaveAttribute('data-for', 'policy');
    await page.keyboard.press('Escape');
    await expect(loop).not.toHaveAttribute('data-active', /.*/);
  });

  test('the lit edges and labels are the ones that touch the active step', async ({ page }) => {
    const loop = await openLoop(page, 1440);
    await loop.locator('.loop-node[data-step="evidence"]').hover();
    await expect(loop.locator('.loop-pill.is-lit')).toHaveText(['emits', 'attests', 'closes the loop']);
    await expect(loop.locator('.loop-edge.is-lit')).toHaveCount(3);
  });
});

test.describe('governance loop: layout', () => {
  for (const width of [1440, 1024, 834]) {
    test(`at ${width} every step sits inside its lane and no label overlaps`, async ({ page }) => {
      const loop = await openLoop(page, width);
      await expect(loop.locator('.loop-wires')).toBeVisible();
      const geo = await loop.evaluate((fig) => {
        const box = (el: Element) => {
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height };
        };
        return {
          lanes: [...fig.querySelectorAll('.loop-lane')].map(box),
          steps: [...fig.querySelectorAll('.loop-step')].map((el) => ({
            id: el.getAttribute('data-step'),
            lane: Number(el.getAttribute('data-lane')),
            box: box(el),
          })),
          pills: [...fig.querySelectorAll('.loop-pill')].map((el) => ({
            text: el.textContent?.trim(),
            box: box(el),
          })),
        };
      });
      for (const step of geo.steps) {
        expect(inside(step.box, geo.lanes[step.lane]), `${step.id} in lane ${step.lane}`).toBe(true);
      }
      for (const [i, pill] of geo.pills.entries()) {
        for (const step of geo.steps) {
          expect(overlaps(pill.box, step.box), `${pill.text} over ${step.id}`).toBe(false);
        }
        for (const other of geo.pills.slice(i + 1)) {
          expect(overlaps(pill.box, other.box), `${pill.text} over ${other.text}`).toBe(false);
        }
      }
    });
  }

  test('at the narrowest canvas every step name fits on one line in its box', async ({ page }) => {
    const loop = await openLoop(page, 800);
    await expect(loop.locator('.loop-wires')).toBeVisible();
    const fit = await loop.locator('.loop-node').evaluateAll((els) =>
      els.map((el) => {
        const label = el.querySelector('.loop-label') as HTMLElement;
        const lh = parseFloat(getComputedStyle(label).lineHeight);
        return {
          step: el.getAttribute('data-step'),
          overflow: el.scrollHeight - el.clientHeight,
          lines: Math.round(label.getBoundingClientRect().height / lh),
        };
      }),
    );
    // 1px of slack: the decorative ring overhangs the box by 1px and the box
    // height is fractional.
    for (const f of fit) {
      expect(f.lines, f.step ?? '').toBe(1);
      expect(f.overflow, f.step ?? '').toBeLessThanOrEqual(1);
    }
  });

  for (const width of [390, 320]) {
    test(`at ${width} the loop is a vertical list with no horizontal scroll`, async ({ page }) => {
      const loop = await openLoop(page, width);
      await expect(loop.locator('.loop-wires')).toBeHidden();
      await expect(loop.locator('.loop-pills')).toBeHidden();
      await expect(loop.locator('.loop-verb').first()).toBeVisible();
      await expect(loop.locator('.loop-return')).toBeVisible();
      const tops = await loop
        .locator('.loop-node')
        .evaluateAll((els) => els.map((el) => el.getBoundingClientRect()).map((r) => [r.top, r.bottom]));
      for (let i = 1; i < tops.length; i++) expect(tops[i][0]).toBeGreaterThan(tops[i - 1][1]);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }


  test('the example run values are not drawn at rest', async ({ page }) => {
    const loop = await openLoop(page, 1440);
    for (const sample of await loop.locator('.loop-sample').all()) await expect(sample).toBeHidden();
  });
});

test.describe('governance loop: touch', () => {
  test.use({ hasTouch: true });

  test('on a phone a tap opens the step note in line, a second tap closes it', async ({ page }) => {
    const loop = await openLoop(page, 390);
    const node = loop.locator('.loop-node[data-step="runtime"]');
    const note = loop.locator('#loop-note-runtime');
    await expect(note).toBeHidden();
    await node.scrollIntoViewIfNeeded();
    await node.tap();
    await expect(note).toBeVisible();
    await expect(note).toContainText('guardrails on');
    await page.waitForTimeout(300);
    await expect(note).toBeVisible();
    await node.tap();
    await expect(note).toBeHidden();
  });

  test('on a phone a tap on a step below an open one opens it, not the one above', async ({
    page,
  }) => {
    const loop = await openLoop(page, 390);
    const runtime = loop.locator('.loop-node[data-step="runtime"]');
    const auditor = loop.locator('.loop-node[data-step="auditor"]');
    await runtime.scrollIntoViewIfNeeded();
    await runtime.tap();
    await expect(loop.locator('#loop-note-runtime')).toBeVisible();
    await auditor.scrollIntoViewIfNeeded();
    await auditor.tap();
    await page.waitForTimeout(300);
    await expect(loop.locator('#loop-note-auditor')).toBeVisible();
    await expect(loop.locator('#loop-note-runtime')).toBeHidden();
  });

  test('on a phone, touching a step without a tap does not open it', async ({ page }) => {
    const loop = await openLoop(page, 390);
    const node = loop.locator('.loop-node[data-step="eval"]');
    await node.scrollIntoViewIfNeeded();
    await node.dispatchEvent('pointerenter', { pointerType: 'touch' });
    await node.dispatchEvent('focus');
    await expect(loop).not.toHaveAttribute('data-active', /.*/);
    await expect(loop.locator('#loop-note-eval')).toBeHidden();
  });
});

test.describe('governance loop: motion', () => {
  test('nothing animates under reduced motion', async ({ page }) => {
    const loop = await openLoop(page, 1440, 'reduce');
    await page.waitForTimeout(500);
    const running = await loop.evaluate((fig) => fig.getAnimations({ subtree: true }).length);
    expect(running).toBe(0);
    await expect(loop.locator('.loop-beam').first()).toBeHidden();
  });

  test('with motion a beam walks the loop once, in under five seconds', async ({ page }) => {
    const loop = await openLoop(page, 1440, 'no-preference');
    await expect(loop).toHaveAttribute('data-play', '');
    const timing = await loop.evaluate((fig) =>
      fig.getAnimations({ subtree: true }).map((a) => {
        const t = a.effect!.getComputedTiming();
        return { iterations: t.iterations, end: Number(t.endTime) };
      }),
    );
    // Seven beams and seven rings.
    expect(timing).toHaveLength(14);
    for (const t of timing) {
      expect(t.iterations).toBe(1);
      expect(t.end).toBeLessThanOrEqual(5000);
    }
    // Then everything rests: no animation is still running.
    await expect
      .poll(
        () =>
          loop.evaluate(
            (fig) => fig.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').length,
          ),
        { timeout: 8000 },
      )
      .toBe(0);
  });

  test('the lap pauses while a step is active', async ({ page }) => {
    const loop = await openLoop(page, 1440, 'no-preference');
    await loop.locator('.loop-node[data-step="policy"]').hover();
    const states = await loop.evaluate((fig) =>
      [...fig.querySelectorAll('.loop-beam')].flatMap((el) => el.getAnimations().map((a) => a.playState)),
    );
    expect(states.length).toBeGreaterThan(0);
    expect(states.every((s) => s === 'paused')).toBe(true);
  });
});

test.describe('home section backgrounds', () => {
  test('no body section sits on the bare ground and neighbours differ', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.goto('/');
    const sections = await page.locator('main section.sec').evaluateAll((els) =>
      els.map((el) => {
        const mesh = el.querySelector(':scope > .bg-mesh');
        const variant = mesh
          ? mesh.classList.contains('bg-mesh--b')
            ? 'b'
            : mesh.classList.contains('bg-mesh--c')
              ? 'c'
              : 'a'
          : null;
        return {
          title: el.querySelector('.sec-title')?.textContent?.trim() ?? '',
          tone: [...el.classList].find((c) => c.startsWith('sec--'))?.slice(5),
          variant,
          opacity: mesh ? Number(getComputedStyle(mesh).opacity) : null,
        };
      }),
    );
    const find = (start: string) => sections.find((s) => s.title.startsWith(start))!;
    expect(find('The discipline, defined')).toMatchObject({ tone: 'mesh', variant: 'b', opacity: 0.5 });
    expect(find('Three questions')).toMatchObject({ tone: 'mesh', variant: 'c', opacity: 0.5 });
    expect(find('A build order')).toMatchObject({ tone: 'tint', variant: 'a', opacity: 0.35 });
    expect(find('Eight values')).toMatchObject({ tone: 'mesh', variant: 'b', opacity: 0.45 });
    expect(find('The role is')).toMatchObject({ tone: 'mesh', variant: 'a', opacity: 0.6 });
    expect(find('Eleven chapters')).toMatchObject({ tone: 'mesh', variant: 'c', opacity: 0.45 });
    expect(find('Curated resources')).toMatchObject({ tone: 'tint', variant: 'b', opacity: 0.35 });
    // Only the dark verdict band has neither a tint nor a mesh.
    expect(sections.filter((s) => s.tone === 'plain')).toHaveLength(0);
    for (let i = 1; i < sections.length; i++) {
      const [a, b] = [sections[i - 1], sections[i]];
      if (a.variant && b.variant) expect(a.variant, `${a.title} / ${b.title}`).not.toBe(b.variant);
    }
  });

  test('only the role mesh drifts', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    const drifting = await page.locator('main section.sec > .bg-mesh').evaluateAll((els) =>
      els
        .filter((el) => getComputedStyle(el, '::before').animationName !== 'none')
        .map((el) => el.parentElement?.querySelector('.sec-title')?.textContent?.trim()),
    );
    expect(drifting).toEqual(['The role is a capability first, a job title second.']);
  });
});

// Design-review shots of the loop section, written to tests/__screenshots__/L/.
// Skipped in the default run; capture them with:
//   LOOP_SHOTS=1 npx playwright test --project=default tests/loop.spec.ts -g "review shot"
const DIR = join('tests', '__screenshots__', 'L');
const shot = process.env.LOOP_SHOTS ? test : test.skip;

test.describe('loop review shots', () => {
  test.beforeAll(() => mkdirSync(DIR, { recursive: true }));

  for (const scheme of ['light', 'dark'] as const) {
    for (const width of [1440, 834, 390]) {
      shot(`review shot loop ${width} ${scheme}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        const loop = await openLoop(page, width);
        await loop.locator('.loop-node[data-step="inventory"]').hover();
        await page.locator('.loop-sec').screenshot({ path: join(DIR, `loop-${width}-${scheme}.png`) });
      });
    }
  }
});
