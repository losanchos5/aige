// Lighthouse CI config. Serves the built site with `astro preview` (which knows
// this project's `format: 'file'` routing over ./dist) and audits the six key
// pages. Run with `npm run lhci`.
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
        'http://localhost:4321/resources/glossary',
        'http://localhost:4321/resources/crosswalk',
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
