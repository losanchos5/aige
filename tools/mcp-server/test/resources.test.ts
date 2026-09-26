// resources.test.ts: the datasets as MCP resources, and the bundled
// templates catalogue against the site tree it was generated from.

import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { after, before, describe, it } from 'node:test';

import type { Client } from '@modelcontextprotocol/client';

import { findTemplate, templates } from '../src/catalogue.js';
import { CANONICAL_API, DATASETS } from '../src/data.js';
import { connect, PACKAGE_ROOT, readFixture, startApp, startFixtureServer, type FixtureServer, type RunningApp } from './helpers.js';

let fixtures: FixtureServer;
let running: RunningApp;
let client: Client;

before(async () => {
  fixtures = await startFixtureServer();
  running = await startApp(fixtures);
  client = await connect(running.url);
});

after(async () => {
  await client.close();
  await running.close();
  await fixtures.close();
});

describe('resources', () => {
  it('lists the catalogue, every dataset and the full text', async () => {
    const { resources } = await client.listResources();
    const uris = resources.map((r) => r.uri);
    assert.ok(uris.includes(`${CANONICAL_API}/index.json`));
    for (const d of DATASETS) assert.ok(uris.includes(`${CANONICAL_API}/${d.name}.json`), d.name);
    assert.ok(uris.includes('https://aigovernanceengineer.com/llms-full.txt'));
    for (const r of resources) assert.match(r.description ?? '', /not legal advice/);
  });

  it('keeps the dataset list in step with index.json', () => {
    const index = JSON.parse(readFixture('api/v1/index.json')) as { datasets: { name: string; title: string }[] };
    assert.deepEqual(
      index.datasets.map((d) => ({ name: d.name, title: d.title })),
      DATASETS.map((d) => ({ name: d.name, title: d.title })),
    );
  });

  it('reads a dataset under its canonical URI', async () => {
    const uri = `${CANONICAL_API}/obligations.json`;
    const result = await client.readResource({ uri });
    const content = result.contents[0] as { uri: string; mimeType?: string; text?: string };
    assert.equal(content.uri, uri);
    assert.equal(content.mimeType, 'application/json');
    const doc = JSON.parse(content.text ?? '{}') as { obligations: unknown[]; notice: string };
    assert.ok(doc.obligations.length > 50);
    assert.match(doc.notice, /not a claim of conformity/);
  });

  it('reads one obligation through the template and rejects a malformed id', async () => {
    const result = await client.readResource({ uri: `${CANONICAL_API}/obligations/aige-obl-euaia-art9.json` });
    const content = result.contents[0] as { text?: string };
    assert.equal((JSON.parse(content.text ?? '{}') as { obligation: { id: string } }).obligation.id, 'AIGE-OBL-EUAIA-ART9');
    await assert.rejects(client.readResource({ uri: `${CANONICAL_API}/obligations/..%2F..%2Fsecret.json` }));
  });

  it('lists the obligation and control templates', async () => {
    const { resourceTemplates } = await client.listResourceTemplates();
    assert.ok(resourceTemplates.some((t) => t.uriTemplate === `${CANONICAL_API}/obligations/{id}.json`));
    assert.ok(resourceTemplates.some((t) => t.uriTemplate === `${CANONICAL_API}/controls/{id}.json`));
  });

  it('reads one control through the template and rejects a malformed id', async () => {
    const result = await client.readResource({ uri: `${CANONICAL_API}/controls/aige-ctl-eval-002.json` });
    const content = result.contents[0] as { text?: string; mimeType?: string };
    assert.equal(content.mimeType, 'application/json');
    const doc = JSON.parse(content.text ?? '{}') as { control: { id: string }; notice: string };
    assert.equal(doc.control.id, 'AIGE-CTL-EVAL-002');
    assert.match(doc.notice, /not a claim of conformity/);
    await assert.rejects(client.readResource({ uri: `${CANONICAL_API}/controls/..%2F..%2Fsecret.json` }));
  });

  it('reads the controls dataset under its canonical URI', async () => {
    const result = await client.readResource({ uri: `${CANONICAL_API}/controls.json` });
    const doc = JSON.parse((result.contents[0] as { text?: string }).text ?? '{}') as { controls: unknown[]; profiles: unknown[] };
    assert.ok(doc.controls.length > 0);
    assert.ok(doc.profiles.length > 0);
  });
});

describe('templates catalogue', () => {
  it('finds entries by name, file, URL and title', () => {
    assert.equal(findTemplate('policy-card')?.name, 'policy-card');
    assert.equal(findTemplate('policy-card.v1.json')?.name, 'policy-card');
    assert.equal(findTemplate('https://aigovernanceengineer.com/schemas/examples/incident-record.example.json')?.name, 'incident-record');
    assert.equal(findTemplate('/templates/raci.csv')?.name, 'raci');
    assert.equal(findTemplate('AI incident record')?.name, 'incident-record');
    assert.equal(findTemplate('Go/no-go decision')?.name, 'go-no-go');
    assert.equal(findTemplate('nothing-like-it'), undefined);
  });

  const site = resolve(PACKAGE_ROOT, '..', '..', 'site', 'public');
  it('covers every schema and template of the site tree (run `npm run catalogue` when this fails)', { skip: !existsSync(site) }, () => {
    const names = new Set(templates().map((t) => t.name));
    const paths = new Set(templates().flatMap((t) => t.files.map((f) => f.path)));
    for (const file of readdirSync(join(site, 'schemas')).filter((f) => f.endsWith('.v1.json'))) {
      assert.ok(names.has(file.replace(/\.v1\.json$/, '')), `schema ${file} is in the catalogue`);
    }
    // Files only: a subfolder (policy-cards/ holds the Policy Card builder's
    // generated samples) is not a template of the kit.
    const templateFiles = readdirSync(join(site, 'templates'), { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);
    for (const file of templateFiles) {
      assert.ok(paths.has(`/templates/${file}`), `template ${file} is in the catalogue`);
    }
    for (const entry of templates()) {
      for (const f of entry.files) assert.ok(existsSync(join(site, f.path)), `${f.path} exists`);
      if (entry.kind === 'schema') {
        const schema = JSON.parse(readFileSync(join(site, 'schemas', `${entry.name}.v1.json`), 'utf8')) as { title: string };
        assert.equal(entry.title, schema.title);
      }
    }
  });
});
