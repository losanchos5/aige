import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createGitHub } from '../lib/github.mjs';
import { LABEL, marker } from '../lib/issue.mjs';

function fakeApi(routes) {
  const calls = [];
  const fetchImpl = async (url, init) => {
    const path = url.replace('https://api.github.com', '');
    const key = `${init.method} ${path}`;
    calls.push({ key, body: init.body ? JSON.parse(init.body) : null, auth: init.headers.Authorization });
    const handler = routes[key];
    if (!handler) return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
    const [status, data] = typeof handler === 'function' ? handler() : handler;
    return new Response(JSON.stringify(data), { status });
  };
  return { fetchImpl, calls };
}

const repo = 'losanchos5/aige';

test('refuses to start without a token or with a malformed repository', () => {
  assert.throws(() => createGitHub({ token: '', repo }), /GITHUB_TOKEN/);
  assert.throws(() => createGitHub({ token: 't', repo: 'nope' }), /GITHUB_REPOSITORY/);
});

test('creates the label once when it is missing', async () => {
  const api = fakeApi({ [`POST /repos/${repo}/labels`]: [201, { name: LABEL.name }] });
  const gh = createGitHub({ token: 't', repo, fetchImpl: api.fetchImpl });
  await gh.ensureLabel();
  await gh.ensureLabel();
  assert.deepEqual(api.calls.map((c) => c.key), [`GET /repos/${repo}/labels/regulatory-change`, `POST /repos/${repo}/labels`]);
  assert.deepEqual(api.calls[1].body, LABEL);
  assert.equal(api.calls[0].auth, 'Bearer t');
});

test('finds the open issue by marker, skipping pull requests, across pages', async () => {
  const page1 = Array.from({ length: 100 }, (_, i) => ({ number: i + 1, body: 'other', html_url: `u${i}` }));
  page1[5] = { number: 6, body: marker('eu-ai-act-oj'), pull_request: {}, html_url: 'pr' };
  const page2 = [{ number: 150, body: `${marker('eu-ai-act-oj')}\nbody`, html_url: 'https://github.com/x/150' }];
  const base = `GET /repos/${repo}/issues?state=open&labels=regulatory-change&per_page=100`;
  const api = fakeApi({ [`${base}&page=1`]: [200, page1], [`${base}&page=2`]: [200, page2] });
  const gh = createGitHub({ token: 't', repo, fetchImpl: api.fetchImpl });
  assert.deepEqual(await gh.findOpenIssue('eu-ai-act-oj'), { number: 150, url: 'https://github.com/x/150' });
  assert.equal(await gh.findOpenIssue('eu-ai-omnibus'), null); // a short page ends the listing
});

test('opens issues with the label and adds comments', async () => {
  const api = fakeApi({
    [`POST /repos/${repo}/issues`]: [201, { number: 7, html_url: 'https://github.com/x/7' }],
    [`POST /repos/${repo}/issues/7/comments`]: [201, { html_url: 'https://github.com/x/7#c' }],
  });
  const gh = createGitHub({ token: 't', repo, fetchImpl: api.fetchImpl });
  assert.deepEqual(await gh.createIssue({ title: 'T', body: 'B' }), { number: 7, url: 'https://github.com/x/7' });
  assert.deepEqual(api.calls[0].body, { title: 'T', body: 'B', labels: ['regulatory-change'] });
  await gh.addComment(7, 'C');
  assert.deepEqual(api.calls[1].body, { body: 'C' });
});

test('API failures surface with the status', async () => {
  const api = fakeApi({ [`POST /repos/${repo}/issues`]: [403, { message: 'Resource not accessible by integration' }] });
  const gh = createGitHub({ token: 't', repo, fetchImpl: api.fetchImpl });
  await assert.rejects(gh.createIssue({ title: 'T', body: 'B' }), (err) => err.status === 403 && /not accessible/.test(err.message));
});
