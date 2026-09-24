// Lighthouse CI config. Serves the built site with `astro preview` (which knows
// this project's `format: 'file'` routing over ./dist) and audits the key pages,
// one of each kind of v0.5.0 destination included. Run with `npm run lhci`. The `url` list below is also read by
// tests/seo-basics.spec.ts, which asserts the SEO category's checks in a
// blocking Playwright suite (the CI lhci step is continue-on-error).
//
// Gates: performance >= 0.95, accessibility = 1, best-practices = 1, seo = 1.
// Desktop preset, so the performance gate reflects the target reading context
// rather than a throttled-mobile worst case.
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'localhost',
      startServerReadyTimeout: 60000,
      numberOfRuns: 1,
      url: [
        'http://localhost:4321/',
        'http://localhost:4321/thesis',
        'http://localhost:4321/bok/the-stack',
        'http://localhost:4321/role',
        'http://localhost:4321/stack',
        'http://localhost:4321/path',
        'http://localhost:4321/map',
        'http://localhost:4321/bok/glossary',
        'http://localhost:4321/resources/crosswalk',
        'http://localhost:4321/obligations',
        'http://localhost:4321/patterns',
        'http://localhost:4321/figures',
        'http://localhost:4321/toolkit',
        'http://localhost:4321/agents',
      ],
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
