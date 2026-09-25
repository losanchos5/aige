// obligations-plan-schema.ts: the JSON Schema (draft 2020-12) of the plan the
// obligations and deadlines planner exports, served at
// /toolkit/obligations-plan.v1.schema.json. It is built from the open-data API
// (src/lib/api.ts), so the plan's envelope and its obligation records can never
// drift from /api/v1/obligations.json: each obligation is the register record
// exactly as the API publishes it, plus a closed `plan` object. The subset of
// keywords is the one tests/helpers/json-schema-lite.ts validates.
import { site } from '../data/site';
import { appliesStatusLabels, systemClassLabels } from '../data/frameworks';
import { plannerRoles } from '../data/obligations-planner';
import {
  datasetByName,
  datasetSchema,
  obligationSchema,
  JSON_SCHEMA_DIALECT,
  type JsonSchema,
} from './api';

export const PLAN_SCHEMA_URL = `${site.url}/toolkit/obligations-plan.v1.schema.json`;
export const PLAN_KIND = 'aige.obligations-plan';

const str = (description: string): JsonSchema => ({ type: 'string', description });
const date = (description: string): JsonSchema => ({ type: 'string', format: 'date', description });
const arr = (items: JsonSchema, description: string): JsonSchema => ({ type: 'array', items, description });
const obj = (properties: Record<string, JsonSchema>, description: string): JsonSchema => ({
  type: 'object',
  description,
  additionalProperties: false,
  required: Object.keys(properties),
  properties,
});

const ROLE = { type: 'string', enum: plannerRoles.map((r) => r.id), description: 'EU AI Act operator role.' };
const CLASS = {
  type: 'string',
  enum: Object.keys(systemClassLabels),
  description: 'EU AI Act system class.',
};
const STATUS_ON_DATE = {
  type: 'string',
  enum: ['applies', 'later', ...Object.keys(appliesStatusLabels)],
  description:
    'Where the duty stands on the reference date: applies, later, or the register status for a duty without a date (voluntary, pending).',
};
const DATED = obj(
  {
    date: date('Date of the event.'),
    kind: { type: 'string', enum: ['start', 'step'], description: 'The start of the duty, or a later step.' },
    note: str('What happens on that date.'),
  },
  'A dated event in the plan.',
);

const planEntry = obj(
  {
    roles: arr(ROLE, 'The picked roles the row binds.'),
    systemClasses: arr(CLASS, 'The carried classes the row matched on.'),
    startsOn: { type: ['string', 'null'], format: 'date', description: 'The date the duty starts for these classes; null without a date.' },
    statusOnReferenceDate: STATUS_ON_DATE,
    daysFromReferenceDate: { type: ['integer', 'null'], description: 'Days from the reference date to the start (negative once it applies); null without a date.' },
    dates: arr(DATED, 'The start and the later steps that concern the matched classes, in date order.'),
    notes: arr(str('A condition the Act sets for this role.'), 'Role-specific conditions.'),
  },
  'How the row binds the answers.',
);

/** The schema of the exported plan. */
export function planSchema(): JsonSchema {
  const dataset = datasetByName('obligations');
  if (!dataset) throw new Error('obligations-plan-schema: the obligations dataset is missing');
  const { obligations: _rows, ...envelope } = (datasetSchema(dataset) as { properties: Record<string, JsonSchema> })
    .properties;
  const record = obligationSchema as { properties: Record<string, JsonSchema>; required: string[] };
  const obligation: JsonSchema = {
    ...obligationSchema,
    description: 'One register row, exactly as /api/v1/obligations.json publishes it, plus the plan.',
    required: [...record.required, 'plan'],
    properties: { ...record.properties, plan: planEntry },
  };
  const properties: Record<string, JsonSchema> = {
    ...envelope,
    kind: { type: 'string', const: PLAN_KIND, description: 'What this file is.' },
    toolNotice: str('The fixed notice of the toolkit.'),
    readingAid: str('The reading-aid notice every classifying widget carries.'),
    generatedOn: date('The day the file was made, in the maker\'s time zone.'),
    referenceDate: date('The date the statuses are read on.'),
    registerAsOf: date('The latest review date of the register rows the planner reads.'),
    inputs: obj(
      {
        roles: arr(ROLE, 'The roles picked.'),
        systemClasses: arr(CLASS, 'The classes ticked (the baseline and GPAI classes are implied).'),
      },
      'The answers.',
    ),
    obligations: arr(obligation, 'The register rows that bind the answers, in date order.'),
    outsideRegister: arr(
      obj(
        {
          id: str('Local id of the duty.'),
          article: str('Article label.'),
          title: str('Article title.'),
          duty: str('What the duty asks for, shortened from the Act.'),
          artefact: str('The record it leaves behind.'),
          condition: { type: ['string', 'null'], description: 'A condition on the role, where one applies.' },
          url: { type: 'string', format: 'uri', description: 'The article in the consolidated text on EUR-Lex.' },
          roles: arr(ROLE, 'The picked roles the duty binds.'),
          systemClasses: arr(CLASS, 'The carried classes it matched on.'),
          startsOn: date('The date it starts for these classes.'),
          statusOnReferenceDate: STATUS_ON_DATE,
          daysFromReferenceDate: { type: 'integer', description: 'Days from the reference date to the start.' },
          dates: arr(DATED, 'Start and later dates.'),
        },
        'A role duty the register does not hold as a row yet.',
      ),
      'Role duties outside the register (Arts. 22, 23, 24, 54).',
    ),
    dates: arr(
      obj(
        {
          date: date('The date.'),
          starts: arr(str('Obligation id, or the article of a duty outside the register.'), 'What starts to apply.'),
          laterSteps: arr(
            obj({ id: str('Obligation id.'), note: str('The step.') }, 'A later step of a row.'),
            'Later steps on that date.',
          ),
        },
        'One date of the plan: one event in the calendar export.',
      ),
      'The dates of the plan, in order.',
    ),
  };
  return {
    $schema: JSON_SCHEMA_DIALECT,
    $id: PLAN_SCHEMA_URL,
    title: 'Obligations plan (AI Governance Engineer toolkit, schema version 1)',
    description:
      'The plan the obligations and deadlines planner exports: the EU AI Act and GPAI rows of the obligation register that bind the picked roles and classes, with their dates and status on a reference date, in the open-data envelope. Indicative, not legal advice and not a conformity claim. Mappings are illustrative, not a claim of conformity.',
    type: 'object',
    additionalProperties: false,
    required: Object.keys(properties),
    properties,
  };
}
