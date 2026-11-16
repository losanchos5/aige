// Block V2 review shots of the /stack diagram (both colour schemes),
// written to tests/__screenshots__/V2b/. Behaviour is asserted in v2.spec.ts.
import { test } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join('tests', '__screenshots__', 'V2b');

test.describe('V2 review shots', () => {
  test.beforeAll(() => mkdirSync(DIR, { recursive: true }));

  const schemes = ['light', 'dark'] as const;

  for (const scheme of schemes) {
    test(`stack diagram 1440 ${scheme} (default + layer 03)`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto('/stack');
      await page.waitForLoadState('networkidle');

      const flow = page.locator('[data-flow]');
      await flow.scrollIntoViewIfNeeded();
      await flow.screenshot({ path: join(DIR, `stack-diagram-1440-${scheme}.png`) });

      await page.locator('.flow-svg [data-layer="3"]').click();
      await page.locator('.flow-panel[data-panel="3"]').waitFor();
      await flow.screenshot({ path: join(DIR, `stack-diagram-1440-${scheme}-l3.png`) });
    });
  }

  test('stack diagram 390 light', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/stack');
    await page.waitForLoadState('networkidle');
    const flow = page.locator('[data-flow]');
    await flow.scrollIntoViewIfNeeded();
    await flow.screenshot({ path: join(DIR, 'stack-diagram-390-light.png') });
  });
});
