// controls-crosswalk.ts: the open control profiles read from the framework
// side. `buildControlsCrosswalk(controls)` turns the `mappings` of the control
// registry (src/data/controls) into one table per framework: each row is a
// clause or id of that framework, with the controls that map to it. The page
// (/controls/crosswalk), its Markdown twin (/controls/crosswalk.md) and the
// `crosswalk` key of the controls dataset (/api/v1/controls.json, lib/api.ts)
// all read this one function, so they cannot drift.
//
// Nothing here is hand-kept: a framework appears only when some control maps
// to it, and the profiles, frameworks and counts come from the registry. The
// fixed part is the order and the naming of the frameworks:
//
//   1. the obligation register (AIGE-OBL-*), one framework per instrument of
//      src/data/frameworks.ts, in that module's order (the EU AI Act first);
//   2. ISO/IEC 42001:2023 Annex A;  3. NIST AI RMF 1.0;
//   4. OWASP Top 10 for LLM Applications, then for Agentic Applications;
//   5. MITRE ATLAS techniques (the threat bridge rows, plus any "other"
//      mapping named exactly "MITRE ATLAS");  6. CSA AICM;
//   7. NIST SP 800-53 (from `other`), one row per control family (AC, AU...)
//      listing the specific controls cited;  8. AIUC-1;
//   9. every remaining `other` framework, by name.
//
// Rows sort naturally (A.6.2.4 before A.10.3), NIST AI RMF rows in the order of
// NIST AI 100-1. Paths of this site's own pages (obligation rows) stay
// site-relative here; the API makes them absolute.
//
// Illustrative, not a claim of conformity: a mapping is this project's reading
// of a framework's public text.
import {
  controls as registryControls,
  profiles,
  controlById,
  controlPath,
  profilePath,
  type Control,
} from '../data/controls';
import { frameworks, obligationById, obligationPath } from '../data/frameworks';
import { iso42001Controls, taxonomies, threatById, aicmDomains, type ThreatTaxonomyId } from '../data/threats';
import { nistAiRmfSubcategoryById, nistAiRmfSubcategoryIndex, NIST_AI_RMF_SOURCE } from '../data/nist-ai-rmf';
import { aiuc1ById, AIUC1_INDEX } from '../data/aiuc1';
import { site } from '../data/site';

/** Site path of the crosswalk page. */
export const CONTROLS_CROSSWALK_PATH = '/controls/crosswalk';

/** The page's <title> and H1; the page repeats it as a literal (lib/llms-routes.ts reads it there). */
export const CROSSWALK_TITLE = 'AI governance controls crosswalk';

/** The page's meta description (110 to 158 characters); the page repeats it as a literal. */
export const CROSSWALK_DESCRIPTION =
  'Open AI governance controls read from the framework side: each EU AI Act obligation, ISO/IEC 42001 clause, NIST AI RMF or OWASP id, with its controls.';

/** What travels with every copy of the crosswalk. */
export const CROSSWALK_DISCLAIMER =
  'Each mapping is illustrative, not a claim of conformity: it is this project\'s reading of the framework\'s public text.';

/** The note the AIUC-1 framework carries, on the page, in the twin and in the JSON. */
export const AIUC1_NOTE =
  'This site is not affiliated with AIUC and holds no AIUC certificate; ids read on AIUC-1\'s public pages. Each mapping is this project\'s reading of the requirement text, not AIUC\'s.';

// The source pages the framework headings link to. ISO/IEC 42001 is the page
// /controls already links; SP 800-53 is the Rev. 5 publication page the
// evaluation environment profile cites.
const ISO_42001_URL = 'https://www.iso.org/standard/81230.html';
const SP_800_53_URL = 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final';
const SP_800_53 = /^NIST SP 800-53\b/;
const ATLAS = 'MITRE ATLAS';

export interface CrosswalkRow {
  /** The clause or id as the framework prints it (for NIST SP 800-53, the family). */
  ref: string;
  /** Its name or text. */
  name: string;
  /** The public page of the clause or id (site-relative for this site's own pages), or null. */
  url: string | null;
  /** A note on this row, or null. */
  note: string | null;
  /** Ids of the controls that map to it, in registry order. */
  controls: string[];
}

export interface CrosswalkFramework {
  /** Stable id, also the page anchor (e.g. "iso42001", "obligations-eu-ai-act"). */
  id: string;
  name: string;
  /** The framework's public source, or null. */
  url: string | null;
  note: string | null;
  rows: CrosswalkRow[];
}

export interface ControlsCrosswalk {
  frameworks: CrosswalkFramework[];
}

/** One mapping of one control, normalised to its framework row. */
interface Entry {
  framework: string;
  ref: string;
  name: string;
  url: string | null;
  note: string | null;
  /** The id exactly as the control maps it (AC-3 inside the AC row). */
  detail: string;
  control: string;
  /** The framework as an "other" mapping names it, for those frameworks. */
  source?: string;
}

interface FrameworkMeta {
  id: string;
  name: string;
  url: string | null;
  note: string | null;
  /** Row order; natural order of `ref` when absent. */
  rank?: (ref: string) => number;
}

const natural = (a: string, b: string): number => a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' });

const kebab = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const OBLIGATIONS_PREFIX = 'obligations-';

/** True for the frameworks built from the obligation register (one per instrument). */
export function isObligationFramework(fw: Pick<CrosswalkFramework, 'id'>): boolean {
  return fw.id.startsWith(OBLIGATIONS_PREFIX);
}

const taxonomyOf = (id: ThreatTaxonomyId) => taxonomies.find((t) => t.id === id);

/** Every mapping of the live controls, one entry per (framework, row, control, id). */
function collectEntries(rows: readonly Control[]): Entry[] {
  const out: Entry[] = [];
  const push = (e: Entry) => out.push(e);
  for (const c of rows) {
    if (c.status === 'retired') continue;
    const m = c.mappings;
    for (const id of m.obligations) {
      const o = obligationById(id);
      push({
        framework: `${OBLIGATIONS_PREFIX}${o?.frameworkId ?? 'unknown'}`,
        ref: id,
        name: o?.obligation ?? id,
        url: o ? obligationPath(o) : null,
        note: null,
        detail: id,
        control: c.id,
      });
    }
    for (const id of m.iso42001) {
      push({ framework: 'iso42001', ref: id, name: iso42001Controls[id] ?? id, url: null, note: null, detail: id, control: c.id });
    }
    for (const id of m.nistAiRmf) {
      push({
        framework: 'nist-ai-rmf',
        ref: id,
        name: nistAiRmfSubcategoryById(id)?.text ?? id,
        url: null,
        note: null,
        detail: id,
        control: c.id,
      });
    }
    for (const id of [...m.owasp, ...(m.atlas ?? [])]) {
      const t = threatById(id);
      if (!t) continue;
      push({ framework: t.taxonomy, ref: t.externalId, name: t.name, url: t.url, note: null, detail: t.externalId, control: c.id });
    }
    for (const id of m.csaAicm ?? []) {
      const domain = (aicmDomains as Readonly<Record<string, string>>)[id.split('-')[0]];
      push({
        framework: 'csa-aicm',
        ref: id,
        name: domain ? `${domain} domain` : id,
        url: null,
        note: null,
        detail: id,
        control: c.id,
      });
    }
    for (const id of m.aiuc1 ?? []) {
      const r = aiuc1ById(id);
      push({
        framework: 'aiuc1',
        ref: id,
        name: r?.title ?? id,
        url: r?.url ?? null,
        note: r?.verified ? `Read on its public AIUC-1 page on ${r.verified}; not affiliated with AIUC.` : 'Not affiliated with AIUC.',
        detail: id,
        control: c.id,
      });
    }
    for (const o of m.other ?? []) {
      if (SP_800_53.test(o.framework)) {
        const family = o.ref.split('-')[0];
        const name = o.note ? `${o.ref} ${o.note}` : o.ref;
        push({ framework: 'nist-sp-800-53', ref: family, name, url: null, note: null, detail: o.ref, control: c.id, source: o.framework });
      } else if (o.framework === ATLAS) {
        push({ framework: 'mitre-atlas', ref: o.ref, name: o.note ?? o.ref, url: null, note: null, detail: o.ref, control: c.id });
      } else {
        push({
          framework: `other-${kebab(o.framework)}`,
          ref: o.ref,
          name: o.note ?? o.ref,
          url: null,
          note: null,
          detail: o.ref,
          control: c.id,
          source: o.framework,
        });
      }
    }
  }
  return out;
}

/** The frameworks in the fixed order, with their names; only those with entries are kept later. */
function frameworkMetas(entries: readonly Entry[]): FrameworkMeta[] {
  const metas: FrameworkMeta[] = [];
  for (const fw of frameworks) {
    metas.push({
      id: `${OBLIGATIONS_PREFIX}${fw.id}`,
      name: fw.name,
      url: fw.url ?? null,
      note: `Rows of this site's obligation register (AIGE-OBL-*) for ${fw.short}; each links to its register page.`,
    });
  }
  metas.push({ id: 'iso42001', name: 'ISO/IEC 42001:2023 Annex A', url: ISO_42001_URL, note: 'Annex A reference controls, by their short titles.' });
  const nistOrder = new Map(nistAiRmfSubcategoryIndex.map((s, i) => [s.id, i]));
  metas.push({
    id: 'nist-ai-rmf',
    name: 'NIST AI Risk Management Framework (AI RMF 1.0)',
    url: NIST_AI_RMF_SOURCE.url,
    note: 'Subcategories, with their text as NIST AI 100-1 prints it.',
    rank: (ref) => nistOrder.get(ref) ?? Number.MAX_SAFE_INTEGER,
  });
  for (const id of ['owasp-llm', 'owasp-asi', 'mitre-atlas'] as const) {
    const t = taxonomyOf(id);
    metas.push({ id, name: t?.name ?? id, url: t?.url ?? null, note: t ? `Version ${t.version}; ids as the catalogue prints them.` : null });
  }
  const csa = frameworks.find((fw) => fw.id === 'csa-aicm');
  metas.push({ id: 'csa-aicm', name: csa?.name ?? 'CSA AI Controls Matrix', url: csa?.url ?? null, note: null });
  const sourcesOf = (framework: string) =>
    [...new Set(entries.filter((e) => e.framework === framework && e.source).map((e) => e.source as string))];
  const spNames = sourcesOf('nist-sp-800-53');
  metas.push({
    id: 'nist-sp-800-53',
    name: spNames.length > 0 ? spNames.join(', ') : 'NIST SP 800-53',
    url: SP_800_53_URL,
    note: 'One row per control family; each row names the specific controls cited from it.',
  });
  metas.push({ id: 'aiuc1', name: 'AIUC-1', url: new URL(AIUC1_INDEX.url).origin, note: AIUC1_NOTE });
  const others = new Map<string, string>();
  for (const e of entries) {
    if (e.framework.startsWith('other-') && e.source) others.set(e.framework, e.source);
  }
  for (const [id, name] of [...others].sort((a, b) => natural(a[1], b[1]))) {
    metas.push({ id, name, url: null, note: 'Named in the controls\' other mappings; this site keeps no index of it.' });
  }
  return metas;
}

/** Group the entries of one framework into its rows. */
function rowsOf(meta: FrameworkMeta, entries: readonly Entry[], order: ReadonlyMap<string, number>): CrosswalkRow[] {
  const byRef = new Map<string, { row: CrosswalkRow; details: Map<string, string> }>();
  for (const e of entries) {
    if (e.framework !== meta.id) continue;
    let slot = byRef.get(e.ref);
    if (!slot) {
      slot = { row: { ref: e.ref, name: e.name, url: e.url, note: e.note, controls: [] }, details: new Map() };
      byRef.set(e.ref, slot);
    }
    if (!slot.row.controls.includes(e.control)) slot.row.controls.push(e.control);
    if (!slot.details.has(e.detail)) slot.details.set(e.detail, e.name);
  }
  const rows = [...byRef.values()].map(({ row, details }) => {
    // A family row of SP 800-53 lists every specific control cited from it.
    const name =
      meta.id === 'nist-sp-800-53'
        ? [...details.keys()].sort(natural).map((d) => details.get(d) ?? d).join('; ')
        : row.name;
    const controls = [...row.controls].sort((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0));
    return { ...row, name, controls };
  });
  const rank = meta.rank;
  return rows.sort((a, b) => (rank ? rank(a.ref) - rank(b.ref) || natural(a.ref, b.ref) : natural(a.ref, b.ref)));
}

/**
 * The crosswalk of a set of controls (the registry by default): one framework
 * per framework some control maps to, in the fixed order above, each with its
 * rows sorted. Pure: the same controls give the same result.
 */
export function buildControlsCrosswalk(rows: readonly Control[] = registryControls): ControlsCrosswalk {
  const entries = collectEntries(rows);
  const order = new Map(rows.map((c, i) => [c.id, i]));
  const out = frameworkMetas(entries)
    .map((meta) => ({ id: meta.id, name: meta.name, url: meta.url, note: meta.note, rows: rowsOf(meta, entries, order) }))
    .filter((fw) => fw.rows.length > 0);
  return { frameworks: out };
}

/** Number of (framework row, control) pairs in a crosswalk. */
export function crosswalkPairs(crosswalk: ControlsCrosswalk): number {
  return crosswalk.frameworks.reduce((n, fw) => n + fw.rows.reduce((m, r) => m + r.controls.length, 0), 0);
}

/** Every pair of a crosswalk as `<framework id>|<row ref>|<control id>`, sorted. */
export function crosswalkPairKeys(crosswalk: ControlsCrosswalk): string[] {
  return crosswalk.frameworks
    .flatMap((fw) => fw.rows.flatMap((r) => r.controls.map((id) => `${fw.id}|${r.ref}|${id}`)))
    .sort();
}

export interface ProfileCrosswalkRow {
  control: Control;
  /** The frameworks this control maps to, in crosswalk order, with the ids as it maps them. */
  frameworks: { id: string; name: string; refs: string[] }[];
}

/**
 * The reverse view of one profile: each of its controls with its ids per
 * framework (for NIST SP 800-53 the specific controls, not the family).
 */
export function profileCrosswalk(slug: string, rows: readonly Control[] = registryControls): ProfileCrosswalkRow[] {
  const crosswalk = buildControlsCrosswalk(rows);
  const entries = collectEntries(rows.filter((c) => c.profile === slug));
  return rows
    .filter((c) => c.profile === slug && c.status !== 'retired')
    .map((control) => ({
      control,
      frameworks: crosswalk.frameworks
        .map((fw) => ({
          id: fw.id,
          name: fw.name,
          refs: [...new Set(entries.filter((e) => e.control === control.id && e.framework === fw.id).map((e) => e.detail))].sort(natural),
        }))
        .filter((fw) => fw.refs.length > 0),
    }));
}

/** The profiles that have at least one control, in registry order (for the reverse view). */
export function crosswalkProfiles(rows: readonly Control[] = registryControls) {
  return profiles.filter((p) => rows.some((c) => c.profile === p.slug));
}

// ---- The Markdown twin ------------------------------------------------------

const abs = (path: string): string => new URL(path, site.url).href;
const cell = (text: string): string => (text === '' ? ' ' : text.replace(/\|/g, '\|').replace(/\s+/g, ' '));
const controlLabel = (id: string): string => {
  const c = controlById(id);
  return c ? `[${c.id}](${abs(controlPath(c))}) ${c.title}` : id;
};

/** The body of /controls/crosswalk.md (everything under the H1). */
export function crosswalkMarkdown(rows: readonly Control[] = registryControls): string {
  const crosswalk = buildControlsCrosswalk(rows);
  const tables = crosswalk.frameworks.map((fw) => {
    const meta = [
      `- Anchor: ${abs(`${CONTROLS_CROSSWALK_PATH}#${fw.id}`)}`,
      ...(fw.url ? [`- Source: ${abs(fw.url)}`] : []),
      ...(fw.note ? [`- Note: ${fw.note}`] : []),
    ].join('\n');
    const table = [
      '| Clause or id | Name | Controls |',
      '| --- | --- | --- |',
      ...fw.rows.map((r) => {
        const ref = r.url ? `[${r.ref}](${abs(r.url)})` : r.ref;
        const name = r.note ? `${r.name} (${r.note})` : r.name;
        return `| ${[ref, name, r.controls.map(controlLabel).join('; ')].map(cell).join(' | ')} |`;
      }),
    ].join('\n');
    return [`## ${fw.name}`, meta, table].join('\n\n');
  });
  const reverse = crosswalkProfiles(rows).map((profile) => {
    const lines = profileCrosswalk(profile.slug, rows).map((row) => {
      const ids = row.frameworks.map((f) => `${f.name}: ${f.refs.join(', ')}`).join('; ');
      return `| ${[controlLabel(row.control.id), ids || 'None yet'].map(cell).join(' | ')} |`;
    });
    return [
      `### ${profile.title}`,
      `Profile page: ${abs(profilePath(profile))}`,
      ['| Control | Ids per framework |', '| --- | --- |', ...lines].join('\n'),
    ].join('\n\n');
  });
  return [
    `> ${CROSSWALK_DESCRIPTION}`,
    CROSSWALK_DISCLAIMER,
    `The open control profiles (${abs('/controls')}) map each control to the obligations, standards and threat catalogues it answers; this document turns those mappings around. It is generated from the control registry: ${crosswalkPairs(crosswalk)} mappings across ${crosswalk.frameworks.length} frameworks. A framework with no mapping has no table. NIST SP 800-53 rows are control families; each row names the specific controls cited.`,
    `AIUC-1: ${AIUC1_NOTE}`,
    ...tables,
    '## By profile',
    'Each control of a profile with the ids it maps to, framework by framework.',
    ...reverse,
    '## Machine-readable',
    [
      `- The crosswalk as JSON: the \`crosswalk\` key of ${abs('/api/v1/controls.json')} (schema: ${abs('/api/v1/schemas/controls.json')})`,
      `- Page: ${abs(CONTROLS_CROSSWALK_PATH)}`,
    ].join('\n'),
    '## Propose a mapping',
    `Propose or correct a mapping through the framework mapping form: ${site.github}/issues/new?template=framework-mapping.yml`,
  ].join('\n\n');
}
