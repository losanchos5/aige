// Lighthouse CI config. Serves the built site with `astro preview` (which knows
// this project's `format: 'file'` routing over ./dist) and audits the key pages,
// one of each kind of v0.5.0 destination included. Run with `npm run lhci`. The `url` list below is also read by
// tests/seo-basics.spec.ts, which asserts the SEO category's checks in a
// blocking Playwright suite (the CI lhci step is continue-on-error).
//
// Gates: performance >= 0.95, accessibility = 1, best-practices = 1, seo = 1.
// Desktop preset, so the performance gate reflects the target reading context
// rather than a throttled-mobile worst case.
// PW_PORT, as in playwright.config.ts, lets a parallel worktree audit its own
// preview server instead of whatever holds the default port 4321.
const PORT = Number(process.env.PW_PORT) || 4321;

module.exports = {
  ci: {
    collect: {
      startServerCommand: `npm run preview -- --port ${PORT}`,
      startServerReadyPattern: 'localhost',
      startServerReadyTimeout: 60000,
      numberOfRuns: 1,
      url: [
        '/',
        '/thesis',
        '/bok/the-stack',
        '/role',
        '/stack',
        '/path',
        '/map',
        '/bok/glossary',
        '/resources/crosswalk',
        '/obligations',
        '/patterns',
        '/figures',
        '/toolkit',
        '/agents',
        '/for',
        '/for/engineers',
        '/frontier',
        '/controls/evaluation-environment',
      ].map((path) => `http://localhost:${PORT}${path}`),
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci',
    },
  },
};
