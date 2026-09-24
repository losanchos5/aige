// diagrams.spec.ts: acceptance checks for the eight interactive archify diagrams.
// Each diagram is rendered at build to an inline <figure class="diagram"> (via
// rehype-diagrams in the BoK chapters and <Diagram> on the standalone pages) and
// to a full-page viewer at /diagrams/<id>.html. public/diagram.js wires the
// hover/focus highlight, the aria-live note panel and keyboard pinning.
//
// Coverage: presence of every figure at every placement, the standalone viewer,
// the strict-CSP promise (no inline JS), unique element ids on the page that
// carries three figures, the highlight/pin/escape interaction (incl. reduced
// motion), the in-chapter insertion point, and an axe sweep of two diagram
// pages. Runs in the `default` project against dist/ served by preview.
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// id -> curated title shown in the figure caption (src/data/diagrams.ts).
const TITLES: Record<string, string> = {
  'eval-gate-ci': 'Eval Gate in CI',
  'incident-kill-switch': 'Incident Pipeline and Kill Switch',
  'agent-identity-registry': 'Agent Registry and Scoped Identity',
  'role-workflows': 'How the AI governance engineer works',
  'maturity-levels': 'The five maturity levels',
  'obligation-to-evidence': 'From obligation to evidence',
  'aige-in-the-org': 'Where AI governance engineering sits',
  'reference-toolchain': 'Reference toolchain by stack layer',
};

const IDS = Object.keys(TITLES);

// Every place a figure is embedded: the three patterns in /bok/patterns, the
// role sequence in the chapter and on /role, the maturity lifecycle, and the two
// dataflow/architecture figures that appear both in a chapter and on a resource
// or marketing page.
const PLACEMENTS: ReadonlyArray<{ id: string; route: string }> = [
  { id: 'eval-gate-ci', route: '/bok/patterns' },
  { id: 'incident-kill-switch', route: '/bok/patterns' },
  { id: 'agent-identity-registry', route: '/bok/patterns' },
  { id: 'role-workflows', route: '/bok/the-role' },
  { id: 'role-workflows', route: '/role' },
  { id: 'maturity-levels', route: '/bok/maturity-model' },
  { id: 'obligation-to-evidence', route: '/bok/regulatory-map' },
  { id: 'obligation-to-evidence', route: '/resources/frameworks' },
  { id: 'aige-in-the-org', route: '/bok/definition' },
  { id: 'aige-in-the-org', route: '/thesis' },
  { id: 'reference-toolchain', route: '/resources/tools' },
];

// ---- 1. Presence -----------------------------------------------------------
test.describe('presence', () => {
  for (const { id, route } of PLACEMENTS) {
    test(`${id} renders on ${route}`, async ({ page }) => {
      await page.goto(route);

      const figure = page.locator(`figure.diagram[data-diagram="${id}"]`);
      await expect(figure).toHaveCount(1);

      // The inline SVG carries the diagram id and a <title> (its accessible name).
      const svg = figure.locator(`svg[data-diagram="${id}"]`);
      await expect(svg).toHaveCount(1);
      expect(await svg.locator('title').count()).toBeGreaterThan(0);

      // The caption names the diagram.
      await expect(figure.locator('figcaption')).toContainText(TITLES[id]);

      // The "open" link points at the standalone viewer, in a new, safe tab.
      const open = figure.locator('a.diagram-open');
      await expect(open).toHaveAttribute('href', `/diagrams/${id}`);
      await expect(open).toHaveAttribute('target', '_blank');
      await expect(open).toHaveAttribute('rel', /noopener/);
    });
  }
});

// ---- 2. Standalone viewer --------------------------------------------------
test.describe('standalone viewer', () => {
  for (const id of IDS) {
    test(`/diagrams/${id}.html serves the interactive viewer`, async ({ request }) => {
      const res = await request.get(`/diagrams/${id}.html`);
      expect(res.status()).toBe(200);
      expect(await res.text()).toContain('role="toolbar"');
    });
  }
});

// ---- 3. CSP: no inline JS --------------------------------------------------
// script-src 'self' forbids inline JS. Every <script> must be external (src=) or
// a data block (type contains "json"); anything else is an executable inline
// script and a CSP violation.
test.describe('CSP: no inline script', () => {
  for (const route of ['/bok/patterns', '/role']) {
    test(`${route} has no inline JS`, async ({ page }) => {
      await page.goto(route);
      const offenders = await page.$$eval('script', (scripts) =>
        scripts
          .filter((s) => {
            const src = s.getAttribute('src');
            const type = (s.getAttribute('type') || '').toLowerCase();
            return !src && !type.includes('json');
          })
          .map((s) => `${s.getAttribute('type') || '(no type)'}: ${(s.textContent || '').slice(0, 60)}`),
      );
      expect(offenders, `inline scripts: ${offenders.join(' | ')}`).toEqual([]);
    });
  }
});

// ---- 4. Unique ids ---------------------------------------------------------
// The three SVGs on /bok/patterns each prefix their internal ids with <id>-, so
// the document must have no duplicate ids at all.
test('no duplicate element ids on /bok/patterns (three figures)', async ({ page }) => {
  await page.goto('/bok/patterns');
  const dupes = await page.evaluate(() => {
    const seen = new Set<string>();
    const dup = new Set<string>();
    for (const el of Array.from(document.querySelectorAll('[id]'))) {
      const id = (el as HTMLElement).id;
      if (seen.has(id)) dup.add(id);
      else seen.add(id);
    }
    return Array.from(dup);
  });
  expect(dupes, `duplicate ids: ${dupes.join(', ')}`).toEqual([]);
});

// ---- 5. Interaction --------------------------------------------------------
// Exercise the eval-gate-ci figure on /bok/patterns: hover lights a connected
// edge and marks the figure active; keyboard focus + Enter pins a node and fills
// the note panel; Escape releases the pin.
async function exerciseEvalGate(page: Page): Promise<void> {
  const figure = page.locator('figure.diagram[data-diagram="eval-gate-ci"]');
  await expect(figure).toBeVisible();
  // public/diagram.js tags each enhanced figure; wait for it before interacting.
  await expect(figure).toHaveClass(/diagram-js/);

  const node = figure.locator('[data-node-id="change"]');

  // Hover: at least one edge lights up and the figure becomes active.
  await node.hover();
  await expect(figure).toHaveClass(/has-active/);
  await expect(figure.locator('[data-edge-id].is-lit').first()).toBeAttached();

  // Keyboard: focus the node and press Enter to pin it; the note panel appears.
  await node.focus();
  await page.keyboard.press('Enter');
  await expect(node).toHaveAttribute('aria-pressed', 'true');
  const note = figure.locator('.diagram-note');
  await expect(note).toBeVisible();
  expect((await note.innerText()).trim().length).toBeGreaterThan(0);

  // Escape releases the pin.
  await page.keyboard.press('Escape');
  await expect(node).toHaveAttribute('aria-pressed', 'false');
}

test.describe('interaction (eval-gate-ci on /bok/patterns)', () => {
  test('hover lights an edge, Enter pins, Escape releases', async ({ page }) => {
    await page.goto('/bok/patterns');
    await exerciseEvalGate(page);
  });

  test('still interactive with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/bok/patterns');
    await exerciseEvalGate(page);
  });
});

// ---- 6. In-chapter placement ----------------------------------------------
// The eval-gate-ci figure opens its pattern ('head' placement): its nearest
// preceding heading is the H2 "Pattern: Eval Gate in CI" and the next heading
// is that pattern's first H3, "Objectives".
test('eval-gate-ci opens its pattern, under the H2 and above the first H3', async ({ page }) => {
  await page.goto('/bok/patterns');
  const rel = await page.evaluate(() => {
    const fig = document.querySelector('figure.diagram[data-diagram="eval-gate-ci"]');
    if (!fig) return { prev: null as string | null, next: null as string | null, nextTag: null as string | null };
    const heads = Array.from(document.querySelectorAll('article h2, article h3'));
    let prev: Element | null = null;
    let next: Element | null = null;
    for (const h of heads) {
      const pos = fig.compareDocumentPosition(h);
      if (pos & Node.DOCUMENT_POSITION_PRECEDING) prev = h;
      else if (pos & Node.DOCUMENT_POSITION_FOLLOWING && !next) next = h;
    }
    const txt = (el: Element | null) => (el ? (el.textContent || '').replace(/\s+/g, ' ').trim() : null);
    return { prev: txt(prev), next: txt(next), nextTag: next ? next.tagName.toLowerCase() : null };
  });
  expect(rel.prev).toBe('Pattern: Eval Gate in CI');
  expect(rel.next).toBe('Objectives');
  expect(rel.nextTag).toBe('h3');
});

// ---- 6b. Lead figures open the chapter -------------------------------------
// A 'lead' placement inserts the figure before the chapter's first H2, so it is
// the opening figure after the intro.
const LEAD: ReadonlyArray<{ route: string; id: string }> = [
  { route: '/bok/the-role', id: 'role-workflows' },
  { route: '/bok/maturity-model', id: 'maturity-levels' },
  { route: '/bok/regulatory-map', id: 'obligation-to-evidence' },
  { route: '/bok/definition', id: 'aige-in-the-org' },
];
test.describe('lead placement', () => {
  for (const { route, id } of LEAD) {
    test(`${id} precedes the first h2 on ${route}`, async ({ page }) => {
      await page.goto(route);
      const ok = await page.evaluate((diagId) => {
        const article = document.querySelector('article.prose');
        if (!article) return false;
        const fig = article.querySelector(`figure.diagram[data-diagram="${diagId}"]`);
        const firstH2 = article.querySelector('h2');
        if (!fig || !firstH2) return false;
        const pos = fig.compareDocumentPosition(firstH2);
        return Boolean(pos & Node.DOCUMENT_POSITION_FOLLOWING);
      }, id);
      expect(ok, `${id} should sit before the first h2 on ${route}`).toBe(true);
    });
  }
});

// ---- 6c. Desktop breakout / mobile parity ----------------------------------
// On desktop the figure breaks out of the 72ch reading column to fill the well
// without colliding with the on-this-page TOC rail; the thesis figure renders
// wide; and on a narrow phone the figure never exceeds the article width.
function rectsIntersect(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
): boolean {
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  );
}

test.describe('breakout', () => {
  test('the patterns figure is wider than the reading column and clears the TOC', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/bok/patterns');

    const figure = page.locator('figure.diagram').first();
    await expect(figure).toBeVisible();
    const figBox = await figure.boundingBox();

    // The figure breaks out past the 72ch reading column (article.prose).
    const proseBox = await page.locator('article.prose').boundingBox();
    expect(figBox!.width).toBeGreaterThan(proseBox!.width);

    // The figure must not overlap the on-this-page TOC rail.
    const toc = page.locator('.doc-toc');
    await expect(toc).toBeVisible();
    const tocBox = await toc.boundingBox();
    expect(rectsIntersect(figBox!, tocBox!), 'figure overlaps the TOC rail').toBe(false);
  });

  test('the thesis figure canvas renders wide', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/thesis');
    const canvas = page.locator(
      'figure.diagram[data-diagram="aige-in-the-org"] .diagram-canvas',
    );
    await expect(canvas).toBeVisible();
    const box = await canvas.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(1000);
  });

  test('on a narrow phone the figure is not wider than the article', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/bok/patterns');
    const figure = page.locator('figure.diagram').first();
    await expect(figure).toBeVisible();
    const figBox = await figure.boundingBox();
    const artBox = await page.locator('article.prose').boundingBox();
    expect(figBox!.width).toBeLessThanOrEqual(artBox!.width + 1);
  });
});

// ---- 7. Accessibility (axe) ------------------------------------------------
test.describe('accessibility', () => {
  for (const route of ['/bok/patterns', '/resources/tools']) {
    test(`${route} has no serious/critical axe violations`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      const detail = serious
        .map((v) => `${v.id} [${v.impact}] ${v.help}: ${v.nodes.length} node(s)`)
        .join('\n');
      expect(serious, `serious/critical a11y violations on ${route}:\n${detail}`).toEqual([]);
    });
  }
});

// ---- 8. Enlarge dialog -----------------------------------------------------
// In chapters the figure sits in a 72ch prose column where the SVG shrinks to
// ~0.5 and its node text is illegible. The Enlarge button (shown only when
// diagram.js runs) opens a near full-screen <dialog> and MOVES the canvas into
// it so it renders at natural width while keeping its listeners and pinned state.
test.describe('enlarge', () => {
  test('Enlarge opens the dialog, focuses Close, stays interactive, axe-clean', async ({
    page,
  }) => {
    await page.goto('/bok/patterns');
    const figure = page.locator('figure.diagram[data-diagram="eval-gate-ci"]');
    await expect(figure).toHaveClass(/diagram-js/);

    const enlarge = figure.locator('button.diagram-enlarge');
    await expect(enlarge).toBeVisible();
    await enlarge.click();

    // The dialog is open, holds the diagram's SVG, and focus is on Close.
    const dialog = figure.locator('dialog.diagram-dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('svg[data-diagram="eval-gate-ci"]')).toHaveCount(1);
    await expect(dialog.locator('button.diagram-dialog-close')).toBeFocused();

    // Node hover still lights a connected edge inside the dialog.
    await dialog.locator('[data-node-id="change"]').hover();
    await expect(dialog.locator('[data-edge-id].is-lit').first()).toBeAttached();

    // No serious/critical a11y regressions with the dialog open.
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    const detail = serious
      .map((v) => `${v.id} [${v.impact}] ${v.help}: ${v.nodes.length} node(s)`)
      .join('\n');
    expect(serious, `serious/critical a11y violations with dialog open:\n${detail}`).toEqual([]);
  });

  test('Escape closes the dialog, restores the diagram, returns focus to Enlarge', async ({
    page,
  }) => {
    await page.goto('/bok/patterns');
    const figure = page.locator('figure.diagram[data-diagram="eval-gate-ci"]');
    await expect(figure).toHaveClass(/diagram-js/);

    const enlarge = figure.locator('button.diagram-enlarge');
    await enlarge.click();

    const dialog = figure.locator('dialog.diagram-dialog');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();

    // The SVG is back inside figure .diagram-canvas and out of the dialog.
    await expect(figure.locator('.diagram-canvas > svg[data-diagram="eval-gate-ci"]')).toHaveCount(
      1,
    );
    await expect(dialog.locator('svg')).toHaveCount(0);

    // Focus returns to the Enlarge button.
    await expect(enlarge).toBeFocused();
  });
});
