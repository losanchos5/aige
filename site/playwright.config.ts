import { defineConfig } from '@playwright/test';

const PORT = 4321;
const baseURL = `http://localhost:${PORT}`;

// Pure-visual screenshot specs and the axe a11y sweep are heavy and produce no
// pass/fail assertions of their own, so they live in their own projects and are
// kept out of the `default` project that `npm test` runs.
const VISUAL = /screenshots\.spec\.ts/;
const A11Y = /a11y\.spec\.ts/;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'default',
      use: { browserName: 'chromium' },
      testIgnore: [VISUAL, A11Y],
    },
    {
      name: 'visual',
      use: { browserName: 'chromium' },
      testMatch: VISUAL,
    },
    {
      name: 'a11y',
      use: { browserName: 'chromium' },
      testMatch: A11Y,
    },
  ],
  webServer: {
    command: 'npm run preview',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
