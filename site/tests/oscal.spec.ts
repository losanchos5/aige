// oscal.spec.ts: the OSCAL files carry exactly the controls the open data API
// carries (checked on the built files, like api.spec.ts: pure Node reads of
// dist, no browser). Schema validity is the build gate's job
// (scripts/oscal-check.mjs), so it is not repeated here.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

type Json = Record<string, any>;

const readJson = (...parts: string[]): Json => JSON.parse(readFileSync(join('dist', ...parts), 'utf8'));
const sorted = (ids: string[]) => [...ids].sort();

test('the OSCAL catalog and profiles carry exactly the controls of /api/v1/controls.json', () => {
  const api = readJson('api', 'v1', 'controls.json');
  const apiControls: { id: string; profile: string }[] = api.controls;
  const apiProfiles: { slug: string }[] = api.profiles;
  // Two empty lists would compare equal: make sure there is something to compare.
  expect(apiProfiles.length).toBeGreaterThan(0);
  expect(apiControls.length).toBeGreaterThan(0);

  const catalog = readJson('oscal', 'catalog.json').catalog;
  const catalogIds = catalog.groups.flatMap((g: Json) => g.controls.map((c: Json) => c.id));
  expect(sorted(catalogIds)).toEqual(sorted(apiControls.map((c) => c.id)));

  for (const { slug } of apiProfiles) {
    const profile = readJson('oscal', 'profiles', `${slug}.json`).profile;
    expect(sorted(profile.imports[0]['include-controls'][0]['with-ids']), slug).toEqual(
      sorted(apiControls.filter((c) => c.profile === slug).map((c) => c.id)),
    );
  }
});

test('each OSCAL control carries the family, secondary families and actors of its API record', () => {
  const api = readJson('api', 'v1', 'controls.json');
  const byId = new Map<string, Json>(api.controls.map((c: Json) => [c.id, c]));
  const catalog = readJson('oscal', 'catalog.json').catalog;
  const values = (control: Json, name: string): string[] =>
    (control.props ?? []).filter((p: Json) => p.name === name).map((p: Json) => p.value);
  const controls = catalog.groups.flatMap((g: Json) => g.controls);
  expect(controls.length).toBeGreaterThan(0);
  for (const control of controls) {
    const record = byId.get(control.id)!;
    expect(values(control, 'family'), control.id).toEqual([record.family]);
    expect(values(control, 'secondary-family'), control.id).toEqual(record.secondaryFamilies);
    expect(values(control, 'applies-to'), control.id).toEqual(record.appliesTo);
  }
  // The values are ids of the published family list, not free text.
  const familyIds = new Set<string>(api.families.map((f: Json) => f.id));
  for (const control of controls) expect(familyIds.has(values(control, 'family')[0]), control.id).toBe(true);
});
