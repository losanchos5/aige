// Preloaded with `node --import` by tests/profile-release.spec.ts: it replaces
// the global fetch of scripts/profile-release.mjs. Every call is appended to
// the file named by FETCH_LOG (URL, method and whether it carried the bearer
// token). With FETCH_MODE=fake it answers like the Zenodo deposit API; in any
// other mode a call is a test failure: it throws, so the script exits non-zero.
import { appendFileSync } from 'node:fs';

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

globalThis.fetch = async (input, init = {}) => {
  const url = String(input);
  const method = init.method ?? 'GET';
  const auth = init.headers?.Authorization ?? null;
  appendFileSync(
    process.env.FETCH_LOG,
    `${JSON.stringify({ url, method, bearer: auth === `Bearer ${process.env.ZENODO_TOKEN}` })}\n`,
  );
  if (process.env.FETCH_MODE !== 'fake') throw new Error('network request made in a test');

  const { origin, pathname } = new URL(url);
  const html = `${origin}/deposit/4242`;
  const reserved = { prereserve_doi: { doi: '10.5072/zenodo.4242' } };
  if (method === 'POST' && pathname === '/api/deposit/depositions') {
    return json(201, { id: 4242, links: { bucket: `${origin}/api/files/bucket-4242`, html }, metadata: reserved });
  }
  if (method === 'PUT' && pathname.startsWith('/api/files/bucket-4242/')) return json(201, { key: pathname });
  if (method === 'PUT' && pathname === '/api/deposit/depositions/4242') {
    return json(200, { id: 4242, links: { html }, metadata: { ...JSON.parse(init.body).metadata, ...reserved } });
  }
  if (method === 'POST' && pathname === '/api/deposit/depositions/4242/actions/publish') {
    return json(202, { id: 4242, doi: '10.5072/zenodo.4242', conceptdoi: '10.5072/zenodo.4241', links: { record_html: `${origin}/records/4242` } });
  }
  return json(404, { message: 'not found' });
};
