#!/usr/bin/env node
// policy-card-samples: write the committed samples of the Policy Card builder
// (/toolkit/policy-card) to public/templates/policy-cards/<template id>/, one
// folder per rule template, with the same generator the page runs
// (public/toolkit/policy-card-core.js) and each template's default values.
// tests/policy-card.spec.ts fails if the committed files drift from what the
// generator produces, so run this after changing the templates or the generator:
//
//   node --experimental-strip-types scripts/policy-card-samples.mjs          # from site/
//   node --experimental-strip-types scripts/policy-card-samples.mjs --out <dir>
//
// Every card is validated against public/schemas/policy-card.v1.json before it
// is written; the script exits 1 on any failure. The Rego and Cedar samples are
// meant to pass `opa check --strict`, `opa test` and `cedar run-tests` (see the
// README it writes).
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { policyCardTemplates } from '../src/data/policy-card.ts';
import { obligations, appliesStatusLabels } from '../src/data/frameworks.ts';
import { patterns } from '../src/data/patterns.ts';
import schema from '../public/schemas/policy-card.v1.json' with { type: 'json' };
import {
  defaultValues,
  checkValues,
  buildArtefacts,
  validateSchema,
} from '../public/toolkit/policy-card-core.js';

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outFlag = process.argv.indexOf('--out');
const OUT =
  outFlag > -1 ? resolve(process.argv[outFlag + 1]) : join(SITE, 'public', 'templates', 'policy-cards');

// Fixed so the samples are reproducible; the page uses the reader's own date.
export const SAMPLE_DATE = '2026-10-01';

export function sampleContext() {
  return {
    obligations: Object.fromEntries(
      obligations.map((row) => [
        row.id,
        { obligation: row.obligation, status: appliesStatusLabels[row.appliesStatus] },
      ]),
    ),
  };
}

const ids = obligations.map((row) => row.id);
const failures = [];
const written = [];

if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });

for (const template of policyCardTemplates) {
  const raw = defaultValues(template, { today: SAMPLE_DATE });
  const { ok, errors, values } = checkValues(template, raw, { obligationIds: ids });
  if (!ok) {
    failures.push(`${template.id}: defaults do not pass the form checks: ${errors.map((e) => e.message).join('; ')}`);
    continue;
  }
  const pattern = patterns.find((entry) => entry.slug === template.pattern);
  const ctx = { ...sampleContext(), patternTitle: pattern?.title };
  const { card, files } = buildArtefacts(template, values, ctx);
  const problems = validateSchema(schema, card);
  if (problems.length) {
    failures.push(`${template.id}: card does not validate: ${problems.join('; ')}`);
    continue;
  }
  const dir = join(OUT, template.id);
  mkdirSync(dir, { recursive: true });
  for (const file of files) {
    writeFileSync(join(dir, file.name), file.text, 'utf8');
    written.push(`${template.id}/${file.name}`);
  }
}

const readme = `# Policy Card builder: samples

> Illustrative, review before use. Indicative, not legal advice and not a conformity claim.

One folder per rule template of the Policy Card builder
(https://aigovernanceengineer.com/toolkit/policy-card), generated with each template's default
values and an effective date of ${SAMPLE_DATE} by \`site/scripts/policy-card-samples.mjs\`, the same
code the page runs. Each folder holds:

- \`<card>.policy-card.md\`: the Policy Card for people;
- \`<card>.policy-card.yaml\` and \`.json\`: the same card for machines, valid against
  https://aigovernanceengineer.com/schemas/policy-card.v1.json;
- \`<card>.rego\` and \`<card>_test.rego\`: the OPA/Rego module (Rego v1 syntax) and its unit tests;
- \`<card>.cedar\` and \`<card>.cedartests.json\`: the Cedar stub and its tests;
- \`<card>.input.json\`: a compliant example input;
- \`policy-card-<card>.yml\`: the CI hook, a GitHub Actions workflow.

The generated files name their own paths (\`policies/...\` and \`.github/workflows/...\`); move them
there in your repository. Verification: run \`opa check --strict\` and \`opa test\` on the Rego
files and \`cedar run-tests\` on the Cedar files. On 2026-09-24 every sample here passed them with
OPA 1.21.0 and cedar-policy-cli 4.13.0.

Templates: ${policyCardTemplates.map((t) => `\`${t.id}\``).join(', ')}.

Part of the AI Governance Engineer toolkit: https://aigovernanceengineer.com/toolkit

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give
> appropriate credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
`;

if (failures.length) {
  console.error(`policy-card-samples: ${failures.length} failure(s)`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}
writeFileSync(join(OUT, 'README.md'), readme, 'utf8');
console.log(`policy-card-samples: wrote ${written.length + 1} files to ${OUT}`);
