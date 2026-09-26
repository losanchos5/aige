// orp-journeys.spec.ts: the four acceptance journeys of the open reference
// project (OpenSpec change open-reference-project), walked on the built site.
// Each step opens a page, asserts the link the reader would take is there and
// that its target answers 200 (and, for a fragment, that the anchor exists on
// the target), then moves on. External targets (the GitHub issue forms, the
// DOI resolver) are checked by their URL, never fetched.
//
//   a. frontier evaluator: /frontier -> the evaluation environment profile ->
//      #aige-ctl-eval-002 -> one of its patterns -> a case it answers ->
//      /cases -> /contribute ->
//      the control review form;
//   b. engineer: /stack -> /controls#layer-4 -> a layer-4 control -> its JSON
//      -> the controls dataset in /api/v1 -> /mcp;
//   c. researcher: /about -> the citation and DOI -> /research -> the note ->
//      the research review form;
//   d. practitioner: the BoK, frameworks, obligations, crosswalk, maturity
//      model, path, role and toolkit stay one click from the home page's
//      header or footer (within the two clicks the plan allows).
import { test, expect, type Page, type APIRequestContext } from '@playwright/test';
import { site } from '../src/data/site';
import { researchPath, writtenThemes } from '../src/data/research';

const ISSUE_FORM = `${site.github}/issues/new?template=`;

/** The link's target as a site path (pathname + hash). */
function pathOf(page: Page, href: string): string {
  const url = new URL(href, page.url());
  return url.pathname + url.hash;
}

/** A 200 for an internal path (the fragment is dropped for the request). */
async function expectOk(request: APIRequestContext, path: string): Promise<void> {
  const res = await request.get(path.split('#')[0]);
  expect(res.status(), `${path} answers 200`).toBe(200);
}

/**
 * Asserts `selector` matches a link on the open page, that its target answers
 * 200, and returns the target path. `scope` names the step in failures.
 */
async function step(
  page: Page,
  request: APIRequestContext,
  selector: string,
  scope: string,
): Promise<string> {
  const link = page.locator(selector).first();
  await expect(link, `${scope}: ${selector}`).toBeAttached();
  const href = await link.getAttribute('href');
  expect(href, `${scope}: href`).toBeTruthy();
  const path = pathOf(page, href!);
  await expectOk(request, path);
  return path;
}

test.describe('journey a: frontier evaluator', () => {
  test('/frontier to the control review form, through a control, a pattern and /cases', async ({
    page,
    request,
  }) => {
    await page.goto('/frontier');
    const profile = await step(
      page,
      request,
      'main a[href="/controls/evaluation-environment"]',
      '/frontier',
    );
    expect(profile).toBe('/controls/evaluation-environment');

    await page.goto(profile);
    const control = page.locator('#aige-ctl-eval-002');
    await expect(control).toBeVisible();
    // A pattern the control is built with, from the control's own record.
    const record = page.locator('section.ctl', { has: control });
    const pattern = await step(
      page,
      request,
      `section.ctl:has(#aige-ctl-eval-002) a[href^="/patterns/"]`,
      'EVAL-002',
    );
    expect(await record.locator(`a[href="${pattern}"]`).count()).toBeGreaterThan(0);

    // The pattern names the public incidents it answers; a case page leads
    // back to the case index.
    await page.goto(pattern);
    const incident = await step(page, request, 'main a[href^="/cases/"]', pattern);
    await page.goto(incident);
    const cases = await step(page, request, 'main a[href="/cases"]', incident);

    await page.goto(cases);
    const contribute = await step(page, request, 'main a[href="/contribute"]', '/cases');
    expect(contribute).toBe('/contribute');

    await page.goto(contribute);
    const form = page.locator(`main a[href^="${ISSUE_FORM}control-review.yml"]`).first();
    await expect(form).toBeAttached();
    expect(await form.getAttribute('href')).toContain('template=control-review.yml');
  });
});

test.describe('journey b: engineer', () => {
  test('/stack to /mcp, through a layer-4 control and its JSON', async ({ page, request }) => {
    await page.goto('/stack');
    const layer = await step(page, request, 'main a[href="/controls#layer-4"]', '/stack');
    expect(layer).toBe('/controls#layer-4');

    await page.goto(layer);
    await expect(page.locator('#layer-4')).toBeAttached();
    // A control whose home layer is 4, listed under that heading.
    const control = await step(
      page,
      request,
      '.cp-layer:has(#layer-4) a[href^="/controls/"]',
      '/controls#layer-4',
    );
    const [profilePath, anchor] = control.split('#');
    expect(anchor, 'the control link carries its anchor').toBeTruthy();

    await page.goto(control);
    await expect(page.locator(`#${anchor}`)).toBeAttached();
    const json = await step(
      page,
      request,
      `section.ctl:has(#${anchor}) a[href^="/api/v1/controls/"][href$=".json"]`,
      `${profilePath}#${anchor}`,
    );
    const record = await (await request.get(json)).json();
    expect(JSON.stringify(record).toLowerCase()).toContain(`"${anchor}"`);

    // The dataset every control sits in, and the MCP server that serves it.
    await page.goto('/controls');
    const dataset = await step(page, request, 'main a[href^="/api/v1/"]', '/controls');
    expect(dataset).toMatch(/^\/api\/v1\/.+\.json$/);
    const mcp = await step(page, request, 'main a[href="/mcp"]', '/controls');
    await page.goto(mcp);
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('journey c: researcher', () => {
  const note = researchPath(writtenThemes()[0]);

  test('/about to the research review form, through the citation, /research and the note', async ({
    page,
    request,
  }) => {
    await page.goto('/about');
    // The citation and the DOI: the resolver link names the DOI, never fetched.
    const doi = page.locator(`main a[href^="https://doi.org/"]`);
    expect(await doi.count()).toBeGreaterThan(0);
    const dois = await doi.evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    expect(dois.some((h) => h!.includes(site.doi) || h!.includes(site.conceptDoi))).toBe(true);
    await expect(page.locator('main').getByText(/cite/i).first()).toBeAttached();

    const research = await step(page, request, 'main a[href="/research"]', '/about');

    await page.goto(research);
    const target = await step(page, request, `main a[href="${note}"]`, '/research');
    expect(target).toBe(note);

    await page.goto(target);
    const form = page.locator(`main a[href^="${ISSUE_FORM}research-review.yml"]`).first();
    await expect(form).toBeAttached();
    expect(await form.getAttribute('href')).toContain('template=research-review.yml');
  });
});

test.describe('journey d: practitioner', () => {
  const DESTINATIONS = [
    '/bok',
    '/resources/frameworks',
    '/obligations',
    '/resources/crosswalk',
    '/bok/maturity-model',
    '/path',
    '/role',
    '/toolkit',
  ];

  test('the practitioner tools stay one click from the home header or footer', async ({
    page,
    request,
  }) => {
    await page.goto('/');
    for (const href of DESTINATIONS) {
      const link = page.locator(`header a[href="${href}"], footer a[href="${href}"]`);
      expect(await link.count(), `${href} linked from the home header or footer`).toBeGreaterThan(
        0,
      );
      await expectOk(request, href);
    }
  });
});
