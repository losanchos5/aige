// Minimal GitHub REST client for the four calls the monitor makes: make sure
// the label exists, find the open issue for a source, open an issue, comment.
// Authenticated with the workflow's GITHUB_TOKEN (issues: write).

import { LABEL, marker } from './issue.mjs';

export class GitHubError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export function createGitHub({
  token,
  repo,
  apiUrl = 'https://api.github.com',
  fetchImpl = globalThis.fetch,
  userAgent = 'aige-reg-monitor',
} = {}) {
  if (!token) throw new Error('GITHUB_TOKEN is not set');
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo ?? '')) throw new Error(`GITHUB_REPOSITORY is not "owner/name": ${repo}`);

  async function call(method, path, body) {
    const res = await fetchImpl(`${apiUrl}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': userAgent,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(30000),
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    return { status: res.status, data };
  }

  function fail(what, r) {
    return new GitHubError(`${what} failed: HTTP ${r.status} ${r.data?.message ?? ''}`.trim(), r.status);
  }

  let labelReady = false;

  return {
    async ensureLabel() {
      if (labelReady) return;
      const got = await call('GET', `/repos/${repo}/labels/${encodeURIComponent(LABEL.name)}`);
      if (got.status === 200) {
        labelReady = true;
        return;
      }
      if (got.status !== 404) throw fail('Reading the label', got);
      const made = await call('POST', `/repos/${repo}/labels`, LABEL);
      // 422: created by a concurrent run in the meantime.
      if (made.status !== 201 && made.status !== 422) throw fail('Creating the label', made);
      labelReady = true;
    },

    // The open issue (not pull request) labelled LABEL whose body carries the
    // source's marker, or null.
    async findOpenIssue(sourceId) {
      const needle = marker(sourceId);
      for (let page = 1; page <= 10; page++) {
        const r = await call('GET', `/repos/${repo}/issues?state=open&labels=${encodeURIComponent(LABEL.name)}&per_page=100&page=${page}`);
        if (r.status !== 200) throw fail('Listing issues', r);
        const found = r.data.find((i) => !i.pull_request && typeof i.body === 'string' && i.body.includes(needle));
        if (found) return { number: found.number, url: found.html_url };
        if (r.data.length < 100) return null;
      }
      return null;
    },

    async createIssue({ title, body }) {
      const r = await call('POST', `/repos/${repo}/issues`, { title, body, labels: [LABEL.name] });
      if (r.status !== 201) throw fail('Opening the issue', r);
      return { number: r.data.number, url: r.data.html_url };
    },

    async addComment(number, body) {
      const r = await call('POST', `/repos/${repo}/issues/${number}/comments`, { body });
      if (r.status !== 201) throw fail('Commenting on the issue', r);
      return { url: r.data.html_url };
    },
  };
}
