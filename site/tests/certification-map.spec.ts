// certification-map.spec.ts: the credential map on /for/certifications (OpenSpec
// change certification-map). certificationProblems(), which the page build runs,
// owns the data rules, and check:links owns "every box's #cert-<id> exists";
// a11y.spec.ts sweeps axe on every built route in both themes. This spec covers
// what only a browser shows: where a box's link lands, and the phone layout.
import { test, expect } from '@playwright/test';
import { certifications } from '../src/data/certifications';

const PAGE = '/for/certifications';

test.describe('certification map', () => {
  test('a box lands on its facts row below the sticky header, marks it and links back to the map', async ({ page }) => {
    // Reduced motion turns off the site's smooth scroll, so the jump is instant.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const cert = certifications.find((c) => c.scope === 'core')!;
    await page.goto(PAGE);
    await page.locator(`a.cm-node[href="#cert-${cert.id}"]`).first().click();

    const row = page.locator(`tr[id="cert-${cert.id}"]`);
    await expect(page.locator('tr:target')).toHaveAttribute('id', `cert-${cert.id}`);
    const header = (await page.locator('.site-header').boundingBox())!;
    const viewportHeight = page.viewportSize()!.height;
    await expect
      .poll(async () => {
        const box = await row.boundingBox();
        return box !== null && box.y >= header.y + header.height && box.y < viewportHeight;
      })
      .toBe(true);
    await expect(row).toContainText(cert.name);

    const back = row.locator('a.cm-back');
    await expect(back).toBeVisible();
    await back.click();
    await expect(page).toHaveURL(/#certification-map$/);
  });

  test('at 390 px the page does not scroll sideways', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PAGE);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
  });
});
