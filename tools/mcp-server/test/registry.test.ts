// registry.test.ts: server.json (the MCP Registry entry) against the server and the site's card.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { it } from 'node:test';

import { SERVER_VERSION } from '../src/server.js';
import { PACKAGE_ROOT } from './helpers.js';

const entry = JSON.parse(readFileSync(join(PACKAGE_ROOT, 'server.json'), 'utf8'));
const card = JSON.parse(readFileSync(resolve(PACKAGE_ROOT, '..', '..', 'site', 'public', '.well-known', 'mcp.json'), 'utf8'));

it('server.json follows the server: version, registry description limit, remote URL', () => {
  assert.equal(entry.version, SERVER_VERSION);
  assert.ok(entry.description.length <= 100, `description is ${entry.description.length} characters`);
  assert.deepEqual(entry.remotes, [{ type: 'streamable-http', url: card.remotes[0].url }]);
});
