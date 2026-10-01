// page-visuals-t3-book.spec.ts: data parity of the book and stack visuals of
// T3 (OpenSpec page-visuals-2, block E) against the registers they count:
// what fills each layer on /stack, stage x layer on /path, the book's spine
// on /bok (reading minutes), the figures atlas on /figures and the chapters of
// one figure on /figures/<id>. Expected values are computed here from the data
// modules (and, for minutes, from each chapter's Markdown with the reading-time
// rule the page applies), never read back from the component or the kit, so a
// visual that drops, adds or miscounts a record fails. Every link a visual
// draws must land on something that exists in the build. The /path progress
// rings (with and without JavaScript) are owned by path.spec.ts. Runs in
// `default` on a build.
import { test, expect, type Page } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { obligations } from '../src/data/frameworks';
import { patterns } from '../src/data/patterns';
import { controls } from '../src/data/controls';
import { allTools, layers } from '../src/data/stack';
import { nodes, stages } from '../src/data/path';
import { workflows } from '../src/data/role';
import { chapterParts, chaptersOrdered } from '../src/data/chapters';
import { figureKind, figures } from '../src/data/figures';
import { diagrams } from '../src/data/diagrams';
import { readingTime } from '../src/lib/reading';

const dist = (file: string) => readFileSync(join('dist', file), 'utf8');
/** Does the built page at `route` carry an element with this id? */
const hasId = (route: string, id: string) => {
  const file = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`;
  return existsSync(join('dist', file)) && new RegExp(`\\sid="${id}"`).test(dist(file));
};

/** The data table of the chart whose figcaption title is `title`. */
async function chartTable(page: Page, title: string): Promise<string[][]> {
  const figure = page.locator('figure.chart-fig', { has: page.locator('.chart-title', { hasText: title }) });
  await expect(figure).toHaveCount(1);
  return figure.locator('.chart-table tbody tr').evaluateAll((rows) =>
    rows.map((row) => [...row.querySelectorAll('th, td')].map((cell) => (cell.textContent ?? '').trim())),
  );
}

/** A LayerMatrix's cells, row by row: the printed count, the link, the name
 *  the chart tooltip shows (the link's aria-label, else the cell's data-tip)
 *  and the glyphs by kind. */
async function matrixCells(page: Page, sectionId: string) {
  return page.locator(`#${sectionId} .lmx-table tbody tr`).evaluateAll((rows) =>
    rows.map((row) =>
      [...row.querySelectorAll('td')].map((td) => ({
        n: Number(td.querySelector('.lmx-n')?.textContent),
        href: td.querySelector('a')?.getAttribute('href') ?? null,
        name: td.querySelector('a')?.getAttribute('aria-label') ?? td.querySelector('.lmx-cell')?.getAttribute('data-tip') ?? '',
        kinds: [...td.querySelectorAll('.lmx-m')].map((m) => m.getAttribute('data-kind')),
      })),
    ),
  );
}

const pad = (n: number) => String(n).padStart(2, '0');

test.describe('/stack: what fills each layer', () => {
  // The counting rule the caption states: a home layer where the record has
  // one, every layer named where it has none, the all-layer workflow in each,
  // cross-cutting path nodes in none.
  const tools = allTools();
  const expected = layers.map((layer) => [
    obligations.filter((o) => o.layerN.includes(layer.n)).length,
    patterns.filter((p) => p.layer === layer.n).length,
    controls.filter((c) => c.layer === layer.n).length,
    tools.filter((t) => t.layers.includes(layer.n)).length,
    nodes.filter((node) => node.layerN === layer.n).length,
    workflows.filter((w) => w.layerN === layer.n || w.layerN === 'all').length,
  ]);

  test('five layers x six registers, each count the data gives, named with its layer', async ({ page }) => {
    await page.goto('/stack');
    const cells = await matrixCells(page, 'what-fills-each-layer');
    expect(cells.map((row) => row.map((c) => c.n))).toEqual(expected);
    // A cell's name (its tooltip) is its count and its layer by number and name.
    cells.forEach((row, r) =>
      row.forEach((c, i) => {
        expect(c.name.startsWith(`${expected[r][i]} `), c.name).toBe(true);
        expect(c.name).toContain(`layer ${pad(layers[r].n)} ${layers[r].name}`);
      }),
    );
  });

  test('every count links to its layer in a list that exists, and path nodes and workflows do not link', async ({
    page,
  }) => {
    await page.goto('/stack');
    const cells = await matrixCells(page, 'what-fills-each-layer');
    const toolLayers = [...dist('resources/tools.html').matchAll(/<input[^>]*data-filter-key="layers"[^>]*>/g)]
      .map((m) => /value="(\d)"/.exec(m[0])?.[1])
      .filter(Boolean);
    const broken: string[] = [];
    cells.forEach((row, r) => {
      const n = layers[r].n;
      const [obl, pat, ctl, tool, path, wf] = row;
      if (obl.href !== `/resources/frameworks#ob-layer-${n}` || !hasId('/resources/frameworks', `ob-layer-${n}`)) broken.push(`obligations L${n}`);
      if (pat.href !== `/patterns#layer-${pad(n)}` || !hasId('/patterns', `layer-${pad(n)}`)) broken.push(`patterns L${n}`);
      if (ctl.href !== `/controls#layer-${n}` || !hasId('/controls', `layer-${n}`)) broken.push(`controls L${n}`);
      if (tool.href !== `/resources/tools?layers=${n}` || !toolLayers.includes(String(n))) broken.push(`tools L${n}`);
      if (path.href !== null || wf.href !== null) broken.push(`path/workflows L${n} link`);
    });
    expect(broken).toEqual([]);
  });
});

test.describe('/path: stage x layer', () => {
  const columns = [1, 2, 3, 4, 5, undefined] as const;

  test('each cell holds the nodes of its stage and layer, one glyph per node by kind, linked to the first', async ({
    page,
  }) => {
    await page.goto('/path');
    const cells = await matrixCells(page, 'stage-by-layer');
    expect(cells).toHaveLength(stages.length);
    stages.forEach((stage, r) => {
      columns.forEach((layer, c) => {
        const here = nodes.filter((node) => node.stage === stage.id && node.layerN === layer);
        const cell = cells[r][c];
        const at = `${stage.id} x ${layer ?? 'cross-cutting'}`;
        expect(cell.n, at).toBe(here.length);
        expect(cell.kinds, at).toEqual(here.map((node) => node.kind));
        expect(cell.href, at).toBe(here.length ? `/path#node-${here[0].id}` : null);
        // Its name (its tooltip) is its count, its stage and its layer by number and name.
        const where = layer ? `layer ${pad(layer)} ${layers.find((l) => l.n === layer)?.name}` : 'cross-cutting';
        expect(cell.name.startsWith(`${here.length} `), at).toBe(true);
        expect(cell.name, at).toContain(stage.title);
        expect(cell.name, at).toContain(where);
      });
    });
    // The grid accounts for every node exactly once.
    expect(cells.flat().reduce((sum, c) => sum + c.n, 0)).toBe(nodes.length);
    for (const node of nodes) expect(hasId('/path', `node-${node.id}`), node.id).toBe(true);
  });
});

test.describe('/bok: the book spine', () => {
  // The page's rule: reading time of the chapter's Markdown body (frontmatter
  // off), from src/lib/reading.ts.
  const body = (id: string) =>
    readFileSync(join('..', 'bok', `${id}.md`), 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

  test('one bar per chapter, in part order, each the chapter card minutes', async ({ page }) => {
    await page.goto('/bok');
    const rows = await chartTable(page, 'The book at a glance');
    const expected = chapterParts.flatMap((part) =>
      chaptersOrdered
        .filter((c) => c.part === part.id)
        .map((c) => [part.title, `${pad(c.order)} ${c.shortTitle}`, String(readingTime(body(c.id)))]),
    );
    expect(rows).toEqual(expected);
  });

  test('every bar links to its chapter', async ({ page }) => {
    await page.goto('/bok');
    const hrefs = await page
      .locator('figure.bok-spine .chart-w svg a')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href')));
    expect(hrefs).toEqual(
      chapterParts.flatMap((part) => chaptersOrdered.filter((c) => c.part === part.id).map((c) => `/bok/${c.slug}`)),
    );
  });
});

test.describe('/figures: the atlas', () => {
  const built = figures.filter((f) => existsSync(join('src', 'figures', `${f.id}.svg`)));
  const first = (placements: readonly { chapter: string }[]) => placements[0]?.chapter;

  test('each chapter counts its figures by kind and its diagrams, filed as the gallery files them', async ({
    page,
  }) => {
    await page.goto('/figures');
    const rows = await chartTable(page, 'Where the book is illustrated');
    const expected = chapterParts.flatMap((part) =>
      chaptersOrdered
        .filter((c) => c.part === part.id)
        .map((c) => {
          const figs = built.filter((f) => first(f.placements) === c.slug);
          const kinds = (['infographic', 'data-viz', 'poster'] as const).map(
            (k) => figs.filter((f) => figureKind(f) === k).length,
          );
          const diags = diagrams.filter((d) => first(d.placements) === c.slug).length;
          return [part.title, `${pad(c.order)} ${c.shortTitle}`, ...[...kinds, diags, figs.length + diags].map(String)];
        }),
    );
    expect(rows).toEqual(expected);
  });

  test('a chapter with any visual links to its group in the gallery, and the group exists', async ({ page }) => {
    await page.goto('/figures');
    const hrefs = await page
      .locator('figure.fg-atlas .chart-w svg a')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? ''));
    const illustrated = chaptersOrdered.filter(
      (c) => built.some((f) => first(f.placements) === c.slug) || diagrams.some((d) => first(d.placements) === c.slug),
    );
    expect(hrefs.sort()).toEqual(illustrated.map((c) => `#fg-ch-${c.slug}`).sort());
    for (const href of hrefs) await expect(page.locator(href), href).toHaveCount(1);
  });
});

test.describe('/figures/<id>: its chapters on the spine', () => {
  // A figure placed in two chapters, and one no chapter places.
  const twoPlaces = figures.find((f) => f.placements.length > 1)!;
  const unplaced = figures.find((f) => !f.placements.length && existsSync(join('src', 'figures', `${f.id}.svg`)))!;

  test('the chapters that place the figure are the highlighted ones, linked', async ({ page }) => {
    await page.goto(`/figures/${twoPlaces.id}`);
    const rows = await chartTable(page, 'Its chapters in the book');
    expect(rows).toHaveLength(chaptersOrdered.length);
    const placed = new Set(twoPlaces.placements.map((p) => p.chapter));
    const highlighted = rows.filter((row) => row[row.length - 1] === 'Yes').map((row) => row[1]);
    expect(highlighted).toEqual(
      chapterParts.flatMap((part) =>
        chaptersOrdered.filter((c) => c.part === part.id && placed.has(c.slug)).map((c) => `${pad(c.order)} ${c.shortTitle}`),
      ),
    );
    const hrefs = await page.locator('figure.fg-spine svg a').evaluateAll((links) => links.map((a) => a.getAttribute('href')));
    expect(hrefs.sort()).toEqual([...placed].map((slug) => `/bok/${slug}#figure-${twoPlaces.id}`).sort());
    for (const slug of placed) expect(hasId(`/bok/${slug}`, `figure-${twoPlaces.id}`), slug).toBe(true);
  });

  test('a figure no chapter places draws no spine', async ({ page }) => {
    await page.goto(`/figures/${unplaced.id}`);
    await expect(page.locator('figure.fg-spine')).toHaveCount(0);
  });
});
