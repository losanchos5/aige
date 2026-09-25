// modern.test.ts: a client pinned to the 2026-07-28 revision (no initialize
// handshake, per-request metadata mirrored into Mcp-Method / Mcp-Name headers).

import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';

import type { Client } from '@modelcontextprotocol/client';

import { CANONICAL_API } from '../src/data.js';
import { TOOL_NAMES } from '../src/tools/index.js';
import { connect, readFixture, startApp, startFixtureServer, textOf, type FixtureServer, type RunningApp } from './helpers.js';

let fixtures: FixtureServer;
let running: RunningApp;
let client: Client;

before(async () => {
  fixtures = await startFixtureServer();
  running = await startApp(fixtures);
  client = await connect(running.url, 'modern');
});

after(async () => {
  await client.close();
  await running.close();
  await fixtures.close();
});

describe('2026-07-28 clients', () => {
  it('list the tools and call them', async () => {
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map((t) => t.name).sort(), [...TOOL_NAMES].sort());
    const result = await client.callTool({ name: 'map_clause', arguments: { framework: 'EU AI Act', ref: 'Art. 14' } });
    assert.notEqual(result.isError, true);
    assert.match(textOf(result), /Human oversight/i);
    const structured = result.structuredContent as { matches: unknown[]; source: string };
    assert.ok(structured.matches.length >= 1);
  });

  it('read a resource', async () => {
    const result = await client.readResource({ uri: `${CANONICAL_API}/patterns.json` });
    const content = result.contents[0] as { text?: string };
    const published = (JSON.parse(readFixture('api/v1/patterns.json')) as { patterns: unknown[] }).patterns.length;
    assert.equal((JSON.parse(content.text ?? '{}') as { patterns: unknown[] }).patterns.length, published);
  });

  it('are logged by MCP method and tool name, from the mirrored headers', () => {
    const lines = running.logs.map((line) => JSON.parse(line) as Record<string, unknown>);
    const call = lines.find((l) => l.msg === 'request' && l.mcpMethod === 'tools/call');
    assert.ok(call, 'a tools/call request line');
    assert.equal(call.mcpName, 'map_clause');
    assert.equal(call.protocol, '2026-07-28');
  });
});
