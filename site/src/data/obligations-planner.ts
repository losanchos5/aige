// obligations-planner.ts: the data behind /toolkit/obligations-planner. The
// planner reads the EU AI Act and GPAI Code of Practice rows of the obligation
// register (src/data/frameworks.ts) and adds only what a row cannot say by
// itself: which of the seven EU operator roles a row binds (its `dutyHolder`
// is free text), the role-specific condition where the Act narrows a duty to
// some holders of a role, and the four role duties the register does not hold
// as rows yet (Arts. 22, 23, 24 and 54). Every addition cites the consolidated
// text of Regulation (EU) 2024/1689 (EUR-Lex, 2026-07-27), read on 2026-09-24,
// or chapter 18, which cites the same text.
//
// Dates are never restated here: a row's dates are its own `appliesFrom` and
// `milestones`, and the four outside duties borrow them from the register rows
// of the same chapter of the Act (Art. 113(b) and (c)), so a date that moves in
// frameworks.ts moves in the planner.
//
// `plannerRows()` throws at build time when an EU AI Act or GPAI row has no
// entry in `plannerDuties`, or an entry names a row that does not exist, so a
// new register row cannot silently drop out of the planner.
import {
  obligations,
  type Obligation,
  type SystemClass,
} from './frameworks';

export type PlannerRoleId =
  | 'provider'
  | 'deployer'
  | 'importer'
  | 'distributor'
  | 'authorised-representative'
  | 'gpai-provider'
  | 'gpai-systemic';

export interface PlannerRole {
  id: PlannerRoleId;
  /** Two-letter code used in the shareable link fragment. Never reused. */
  code: string;
  label: string;
  /** Where the Act defines the role or places its duties. */
  ref: string;
  /** Who holds the role, in the Act's terms (Art. 3), shortened. */
  hint: string;
}

/** The seven roles, in the order of chapter 18's operator table. */
export const plannerRoles: readonly PlannerRole[] = [
  {
    id: 'provider',
    code: 'pr',
    label: 'Provider',
    ref: 'Art. 3(3)',
    hint: 'Develops an AI system, or has one developed, and places it on the market or puts it into service under its own name or trademark.',
  },
  {
    id: 'deployer',
    code: 'de',
    label: 'Deployer',
    ref: 'Art. 3(4)',
    hint: 'Uses an AI system under its authority, other than in a personal, non-professional activity.',
  },
  {
    id: 'importer',
    code: 'im',
    label: 'Importer',
    ref: 'Art. 3(6)',
    hint: 'Located or established in the Union; places on the market an AI system bearing the name or trademark of someone established outside it.',
  },
  {
    id: 'distributor',
    code: 'di',
    label: 'Distributor',
    ref: 'Art. 3(7)',
    hint: 'In the supply chain, other than the provider or the importer; makes an AI system available on the Union market.',
  },
  {
    id: 'authorised-representative',
    code: 'ar',
    label: 'Authorised representative',
    ref: 'Art. 3(5)',
    hint: 'Located or established in the Union, with a written mandate from a provider outside it to carry out its obligations on its behalf.',
  },
  {
    id: 'gpai-provider',
    code: 'gp',
    label: 'GPAI model provider',
    ref: 'Art. 53',
    hint: 'Provides a general-purpose AI model: the model itself, not a system built on it.',
  },
  {
    id: 'gpai-systemic',
    code: 'gs',
    label: 'Provider of a GPAI model with systemic risk',
    ref: 'Art. 55',
    hint: 'Provides a general-purpose AI model with systemic risk; the Art. 53 duties apply as well (Art. 55(1)).',
  },
];

export interface PlannerClass {
  id: SystemClass;
  /** Two-letter code used in the link fragment. Never reused. */
  code: string;
  label: string;
  hint: string;
}

/** The system classes the reader ticks. GPAI classes follow from the GPAI
 *  roles; the baseline classes (below) apply to every provider and deployer. */
export const plannerClasses: readonly PlannerClass[] = [
  {
    id: 'high-risk-annex-iii',
    code: 'h3',
    label: 'High-risk through use (Annex III)',
    hint: 'Its intended purpose falls in one of the eight Annex III areas (for example employment, credit scoring, education, essential services) and the Art. 6(3) filter does not take it out.',
  },
  {
    id: 'high-risk-annex-i',
    code: 'h1',
    label: 'High-risk through products (Annex I)',
    hint: 'A safety component of a product, or itself a product, under the Annex I legislation that needs a third-party conformity assessment (Art. 6(1)).',
  },
  {
    id: 'transparency-art50',
    code: 'tr',
    label: 'Transparency case (Art. 50)',
    hint: 'Interacts directly with people, generates synthetic content, recognises emotions or categorises people biometrically, or produces deep fakes or AI text published to inform the public.',
  },
];

/** Classes every AI system carries, whatever the reader ticks: AI literacy
 *  (Art. 4) and the prohibited-practice screen (Art. 5). */
export const BASELINE_CLASSES: readonly SystemClass[] = ['all-ai-systems', 'prohibited'];

/** Classes a GPAI role implies: the role is defined by the model it provides. */
export const ROLE_CLASSES: Readonly<Partial<Record<PlannerRoleId, readonly SystemClass[]>>> = {
  'gpai-provider': ['gpai'],
  'gpai-systemic': ['gpai', 'gpai-systemic'],
};

/** The instruments v1 of the planner covers. */
export const PLANNER_FRAMEWORKS: readonly string[] = ['eu-ai-act', 'gpai-code-of-practice'];

export interface RowDuty {
  /** The roles the row binds. */
  roles: readonly PlannerRoleId[];
  /** Classes for rows that carry no `systemClass` (the GPAI Code of Practice). */
  classes?: readonly SystemClass[];
  /** A role-specific condition, where the Act narrows the duty for that role. */
  notes?: Readonly<Partial<Record<PlannerRoleId, string>>>;
}

const P: readonly PlannerRoleId[] = ['provider'];
const PD: readonly PlannerRoleId[] = ['provider', 'deployer'];
const GPAI: readonly PlannerRoleId[] = ['gpai-provider', 'gpai-systemic'];

const ART25_NOTE =
  'Only if you put your name or trademark on a high-risk system already on the market, make a substantial modification that keeps it high-risk, or change its intended purpose so it becomes high-risk: you then become its provider, with the Art. 16 duties (Art. 25(1)).';

/**
 * Role mapping per register row. The row's `dutyHolder` is the source; where
 * it reads "Provider + value-chain actors" or names a narrower holder, the
 * condition from the Act is in `notes` (chapter 18 and the consolidated text).
 */
export const plannerDuties: Readonly<Record<string, RowDuty>> = {
  'AIGE-OBL-EUAIA-ART4': { roles: PD },
  'AIGE-OBL-EUAIA-ART4A': { roles: P },
  'AIGE-OBL-EUAIA-ART5': { roles: PD },
  'AIGE-OBL-EUAIA-ART6': { roles: P },
  'AIGE-OBL-EUAIA-ART9': { roles: P },
  'AIGE-OBL-EUAIA-ART10': { roles: P },
  'AIGE-OBL-EUAIA-ART11': { roles: P },
  'AIGE-OBL-EUAIA-ART12': { roles: P },
  'AIGE-OBL-EUAIA-ART13': { roles: P },
  'AIGE-OBL-EUAIA-ART14': { roles: P },
  'AIGE-OBL-EUAIA-ART15': { roles: P },
  'AIGE-OBL-EUAIA-ART17': { roles: P },
  'AIGE-OBL-EUAIA-ART25': {
    roles: ['provider', 'deployer', 'importer', 'distributor'],
    notes: {
      provider:
        'As the initial provider, cooperate with anyone who becomes the provider (Art. 25(2)) and fix the information and access your suppliers owe you in a written agreement (Art. 25(4)).',
      deployer: ART25_NOTE,
      importer: ART25_NOTE,
      distributor: ART25_NOTE,
    },
  },
  'AIGE-OBL-EUAIA-ART26': { roles: ['deployer'] },
  'AIGE-OBL-EUAIA-ART27': {
    roles: ['deployer'],
    notes: {
      deployer:
        'Only deployers that are bodies governed by public law or private entities providing public services, and deployers of Annex III point 5(b) and 5(c) systems (credit scoring, life and health insurance pricing); not Annex III point 2 (Art. 27(1)).',
    },
  },
  'AIGE-OBL-EUAIA-ART43': { roles: P },
  'AIGE-OBL-EUAIA-ART47': { roles: P },
  'AIGE-OBL-EUAIA-ART49-71': {
    roles: ['provider', 'deployer', 'authorised-representative'],
    notes: {
      deployer:
        'Only deployers that are public authorities, Union institutions, bodies, offices or agencies, or persons acting on their behalf (Art. 49(3)).',
      'authorised-representative':
        'Where applicable, the authorised representative registers instead of the provider (Art. 49(1) and 49(2)).',
    },
  },
  'AIGE-OBL-EUAIA-ART50': {
    roles: PD,
    notes: {
      provider:
        'Art. 50(1) and 50(2): tell people they are interacting with an AI system, and mark synthetic output in a machine-readable, detectable way.',
      deployer:
        'Art. 50(3) and 50(4): inform people exposed to emotion recognition or biometric categorisation, and disclose deep fakes and AI text published to inform the public.',
    },
  },
  'AIGE-OBL-EUAIA-ART53': { roles: GPAI },
  'AIGE-OBL-EUAIA-ART55': { roles: ['gpai-systemic'] },
  'AIGE-OBL-EUAIA-ART60': {
    roles: P,
    notes: {
      provider:
        'Only if you test a high-risk system in real-world conditions outside an AI regulatory sandbox (Art. 60(1)).',
    },
  },
  'AIGE-OBL-EUAIA-ART72': { roles: P },
  'AIGE-OBL-EUAIA-ART73': { roles: P },
  'AIGE-OBL-GPAICOP-SAFETY': { roles: ['gpai-systemic'], classes: ['gpai-systemic'] },
  'AIGE-OBL-GPAICOP-TRANSPARENCY': { roles: GPAI, classes: ['gpai'] },
  'AIGE-OBL-GPAICOP-COPYRIGHT': { roles: GPAI, classes: ['gpai'] },
};

/** The register rows the planner reads, in register order, each checked
 *  against `plannerDuties` (throws at build time on a gap in either direction). */
export function plannerRows(): Obligation[] {
  const rows = obligations.filter((row) => PLANNER_FRAMEWORKS.includes(row.frameworkId));
  for (const row of rows) {
    const duty = plannerDuties[row.id];
    if (!duty) throw new Error(`obligations-planner: register row ${row.id} has no role mapping`);
    if ((row.systemClass ?? duty.classes ?? []).length === 0) {
      throw new Error(`obligations-planner: ${row.id} has no system class to match on`);
    }
  }
  for (const id of Object.keys(plannerDuties)) {
    if (!rows.some((row) => row.id === id)) {
      throw new Error(`obligations-planner: mapping names ${id}, which is not an EU AI Act or GPAI row`);
    }
  }
  return rows;
}

/** One dated step of a row, with the classes it concerns and, when it is the
 *  date the row starts for some classes only, those classes. */
export interface PlannerStep {
  date: string;
  /** Classes the step concerns; empty when it concerns all of the row's. */
  classes: SystemClass[];
  note: string;
  /** Classes for which this date is the start (the Annex I route). */
  startFor: SystemClass[];
}

export interface RowTimeline {
  /** The classes the row matches on. */
  classes: SystemClass[];
  /** Start date per class (absent for rows without a date). */
  starts: Partial<Record<SystemClass, string>>;
  steps: PlannerStep[];
}

/**
 * The dates of a row, per class. `appliesFrom` is the start for every class
 * of the row, except where a milestone concerns a strict subset of the row's
 * classes: that milestone is the start for those classes (chapter 08 stamps
 * the Annex I date that way on the high-risk rows). A milestone that concerns
 * every class of the row (the new Art. 5 bans) stays a later step.
 */
export function rowTimeline(row: Obligation): RowTimeline {
  const duty = plannerDuties[row.id];
  const classes = [...(row.systemClass ?? duty?.classes ?? [])];
  const starts: Partial<Record<SystemClass, string>> = {};
  if (row.appliesFrom) for (const c of classes) starts[c] = row.appliesFrom;
  const steps: PlannerStep[] = (row.milestones ?? []).map((m) => {
    const concerns = [...(m.systemClass ?? [])];
    const strictSubset =
      concerns.length > 0 &&
      concerns.every((c) => classes.includes(c)) &&
      classes.some((c) => !concerns.includes(c));
    if (strictSubset) for (const c of concerns) starts[c] = m.date;
    return { date: m.date, classes: concerns, note: m.note, startFor: strictSubset ? concerns : [] };
  });
  return { classes, starts, steps };
}

/** The start date a class carries in a register row (throws if absent), so
 *  the outside duties borrow their dates from the register. */
function startOf(id: string, systemClass: SystemClass): string {
  const row = obligations.find((o) => o.id === id);
  const date = row ? rowTimeline(row).starts[systemClass] : undefined;
  if (!date) throw new Error(`obligations-planner: ${id} has no start date for ${systemClass}`);
  return date;
}

/** A role duty the register does not hold as a row yet. */
export interface OutsideDuty {
  id: string;
  roles: readonly PlannerRoleId[];
  /** Article label. */
  article: string;
  title: string;
  /** What the duty asks for, shortened from the Act. */
  duty: string;
  /** The record it leaves behind, in chapter 18's words. */
  artefact: string;
  /** Start date per class: the duty needs one of these classes. The key `*`
   *  means no class condition (the role alone carries the duty). */
  starts: Partial<Record<SystemClass | '*', string>>;
  /** A condition on the role, where one applies. */
  condition?: string;
  /** The article in the consolidated text. */
  url: string;
}

/** Consolidated text of Regulation (EU) 2024/1689 as amended by 2026/1744. */
export const AI_ACT_CONSOLIDATED = 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng';

/**
 * Arts. 22, 23 and 24 sit in Chapter III, Section 3, which applies from
 * 2 Dec 2027 for Annex III systems and 2 Aug 2028 for Annex I systems
 * (Art. 113(c)); Art. 54 sits in Chapter V, which applies from 2 Aug 2025
 * (Art. 113(b)). The dates are read from the Art. 9 and Art. 53 rows, which
 * sit in the same chapters.
 */
export function outsideDuties(): OutsideDuty[] {
  const highRisk = {
    'high-risk-annex-iii': startOf('AIGE-OBL-EUAIA-ART9', 'high-risk-annex-iii'),
    'high-risk-annex-i': startOf('AIGE-OBL-EUAIA-ART9', 'high-risk-annex-i'),
  };
  return [
    {
      id: 'art22',
      roles: ['authorised-representative'],
      article: 'Art. 22',
      title: 'Authorised representative of a high-risk system provider',
      duty: 'Perform the mandate: verify that the EU declaration of conformity and the technical documentation exist and that the conformity assessment was carried out; keep them and the provider contact details for 10 years; cooperate with the authorities; end the mandate if the provider acts contrary to its obligations.',
      artefact: 'Mandate; document copies',
      starts: highRisk,
      url: `${AI_ACT_CONSOLIDATED}#art_22`,
    },
    {
      id: 'art23',
      roles: ['importer'],
      article: 'Art. 23',
      title: 'Obligations of importers',
      duty: 'Before placing a high-risk system on the market, verify the conformity assessment, the technical documentation, the CE marking, the declaration and instructions, and the appointed authorised representative; hold back a system you consider non-conforming; keep copies for 10 years.',
      artefact: 'Import verification record',
      starts: highRisk,
      url: `${AI_ACT_CONSOLIDATED}#art_23`,
    },
    {
      id: 'art24',
      roles: ['distributor'],
      article: 'Art. 24',
      title: 'Obligations of distributors',
      duty: 'Before making a high-risk system available, verify the CE marking, the declaration of conformity and the instructions for use, and that the provider and importer met their marking duties; hold back a system you consider non-conforming.',
      artefact: 'Distribution check record',
      starts: highRisk,
      url: `${AI_ACT_CONSOLIDATED}#art_24`,
    },
    {
      id: 'art54',
      roles: ['authorised-representative'],
      article: 'Art. 54',
      title: 'Authorised representative of a GPAI model provider',
      duty: 'Perform the mandate: verify the Annex XI technical documentation and the Art. 53 (and, where applicable, Art. 55) duties; keep the documentation for 10 years at the disposal of the AI Office; cooperate with it; end the mandate if the provider acts contrary to its obligations.',
      artefact: 'Mandate; document copies',
      // The mandate, not a ticked class, says the model is a GPAI model.
      starts: { '*': startOf('AIGE-OBL-EUAIA-ART53', 'gpai') },
      condition:
        'When the mandate comes from a provider of a general-purpose AI model established outside the Union; free and open-source models that publish their parameters are exempt unless they present systemic risks (Art. 54(6)).',
      url: `${AI_ACT_CONSOLIDATED}#art_54`,
    },
  ];
}
