// controls-flows.ts: the data side of the wave-3 control visuals (OpenSpec
// page-visuals-2, block A), read from the control registry (src/data/controls)
// and its crosswalk (lib/controls-crosswalk.ts); nothing here adds a fact.
//
//   /controls            evidenceFlow: the evidence climbs the stack, a flow
//                        from each control's home layer to the layer of every
//                        artefact it leaves (one link unit = one artefact)
//   /controls/crosswalk  profileFlow: the five profiles to the frameworks
//                        (one unit = one clause-and-control pair, a "mapping"
//                        on the page), the eight largest frameworks drawn and
//                        the rest grouped as "Other (N)"
//                        crosswalkIndex: framework x profile mapping counts
//                        for the heat index (HTML, see ControlsCrosswalkIndex)
//                        topClauses: the clauses with the most controls
//
// A failure response still to be specified (isResponseToSpecify) belongs to a
// control, not to an artefact or a mapping: the flows count artefacts and
// pairs, so they carry no "to be specified" state (the mosaic and the lanes on
// /controls draw it).
import { controlById, controls, type Control } from '../../data/controls';
import { layers } from '../../data/stack';
import {
  buildControlsCrosswalk,
  crosswalkProfiles,
  isObligationFramework,
  type CrosswalkFramework,
  type CrosswalkRow,
} from '../controls-crosswalk';
import type { SankeyInput, Tone } from '../charts';
import { fitName, shortenToFit } from './labels';

const SOURCE = 'Open control profiles (data/controls)';

/** One link of a flow before it becomes chart input. */
interface Link {
  from: string;
  to: string;
  value: number;
}

// ---- /controls: the evidence climbs the stack ------------------------------

/** The flow input for /controls#evidence: home layer to evidence layer. */
export function evidenceFlow(rows: readonly Control[] = controls): Omit<SankeyInput, 'id' | 'title' | 'desc' | 'asOf'> {
  const counts = new Map<string, number>();
  for (const c of rows) {
    for (const e of c.evidence) {
      const key = `c${c.layer}|e${e.layer}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  const links: Link[] = [...counts].map(([key, value]) => {
    const [from, to] = key.split('|');
    return { from, to, value };
  });
  const used = new Set(links.flatMap((l) => [l.from, l.to]));
  const label = (n: number, name: string) => `L${n} ${fitName(name, 250)}`;
  // Both columns hold the same five layers, so each name says its side in
  // the words of the table headings below ("Control home layer 5: ...",
  // "Evidence layer 5: ...") and a ribbon never reads "Layer 5 to Layer 5".
  const nodes = [
    ...layers.map((l) => ({
      id: `c${l.n}`,
      column: 'control',
      label: label(l.n, l.name),
      name: `Control home layer ${l.n}: ${l.name}`,
      tone: l.n as Tone,
      href: `#layer-${l.n}`,
    })),
    ...layers.map((l) => ({ id: `e${l.n}`, column: 'evidence', label: label(l.n, l.name), name: `Evidence layer ${l.n}: ${l.name}`, tone: l.n as Tone })),
  ].filter((n) => used.has(n.id));
  return {
    columns: [
      { key: 'control', label: "Control's home layer" },
      { key: 'evidence', label: 'Layer that keeps its evidence' },
    ],
    nodes,
    links,
    unit: 'artefacts',
    unitOne: 'artefact',
    order: 'input',
    fromHeader: "Control's home layer",
    toHeader: 'Evidence layer',
    valueHeader: 'Evidence artefacts',
    source: SOURCE,
  };
}

// ---- /controls/crosswalk ----------------------------------------------------

/** Frameworks drawn by name in the profile flow; the rest become "Other (N)". */
export const FLOW_FRAMEWORKS = 8;
/** Clauses in the most-covered lollipop. */
export const TOP_CLAUSES = 15;

/** Short names where the framework's own name does not fit a flow node or is
 *  shared by two frameworks (OWASP's two lists, the register's and the threat
 *  catalogue's). Anything else is drawn by fitName. */
const SHORT: Readonly<Record<string, string>> = {
  'obligations-owasp-agentic-top-10': 'OWASP Agentic Top 10',
  'obligations-owasp-llm-top-10': 'OWASP LLM Top 10',
  iso42001: 'ISO 42001 Annex A',
  'nist-ai-rmf': 'NIST AI RMF 1.0',
  'owasp-asi': 'OWASP Agentic Top 10',
  'owasp-llm': 'OWASP LLM Top 10',
  'other-imda-mgf-for-agentic-ai-v1-5': 'IMDA agentic MGF v1.5',
};

/** A framework's short name, without the register mark. */
const shortBase = (fw: Pick<CrosswalkFramework, 'id' | 'name'>, maxPx = 150): string => SHORT[fw.id] ?? fitName(fw.name, maxPx);

/** A framework's drawn name: obligation register rows carry "(register)". */
export function frameworkShort(fw: Pick<CrosswalkFramework, 'id' | 'name'>, maxPx = 150): string {
  const base = shortBase(fw, maxPx);
  return isObligationFramework(fw) ? `${base} (register)` : base;
}

/** Mappings (clause and control pairs) of one framework from one profile. */
export function frameworkPairs(fw: CrosswalkFramework, profile: string): number {
  return fw.rows.reduce((n, r) => n + r.controls.filter((id) => controlById(id)?.profile === profile).length, 0);
}

/** The framework x profile counts, in crosswalk order (obligation register first). */
export function crosswalkIndex() {
  const crosswalk = buildControlsCrosswalk();
  const profiles = crosswalkProfiles();
  return {
    profiles,
    rows: crosswalk.frameworks.map((fw) => ({
      fw,
      obligation: isObligationFramework(fw),
      values: profiles.map((p) => frameworkPairs(fw, p.slug)),
    })),
  };
}

/** The flow input for the profile flow on /controls/crosswalk. */
export function profileFlow(): Omit<SankeyInput, 'id' | 'title' | 'desc' | 'asOf'> {
  const { profiles, rows } = crosswalkIndex();
  const total = (values: number[]) => values.reduce((a, b) => a + b, 0);
  // Largest first; ties keep crosswalk order (Array.prototype.sort is stable).
  const ranked = rows.map((r, i) => ({ ...r, i, total: total(r.values) })).sort((a, b) => b.total - a.total || a.i - b.i);
  const shown = ranked.slice(0, FLOW_FRAMEWORKS);
  const rest = ranked.slice(FLOW_FRAMEWORKS);
  const labels = new Set<string>();
  const nodes: SankeyInput['nodes'] = profiles.map((p) => ({
    id: `p-${p.slug}`,
    column: 'profile',
    label: p.shortTitle,
    href: `#by-profile-${p.slug}`,
  }));
  const links: Link[] = [];
  for (const r of shown) {
    const label = frameworkShort(r.fw);
    if (labels.has(label)) throw new Error(`controls-flows: two frameworks draw as "${label}"; add a short name`);
    labels.add(label);
    // Two frameworks may share a name (OWASP's agentic list is both a register
    // instrument and a threat catalogue): the register's carries its group.
    const name = r.obligation ? `${r.fw.name} (obligation register)` : r.fw.name;
    nodes.push({ id: `f-${r.fw.id}`, column: 'framework', label, name, href: `#${r.fw.id}` });
    profiles.forEach((p, c) => {
      if (r.values[c] > 0) links.push({ from: `p-${p.slug}`, to: `f-${r.fw.id}`, value: r.values[c] });
    });
  }
  if (rest.length > 0) {
    nodes.push({ id: 'f-other', column: 'framework', label: `Other (${rest.length})`, name: `Other frameworks (${rest.length})`, href: '#frameworks' });
    profiles.forEach((p, c) => {
      const value = rest.reduce((n, r) => n + r.values[c], 0);
      if (value > 0) links.push({ from: `p-${p.slug}`, to: 'f-other', value });
    });
  }
  return {
    columns: [
      { key: 'profile', label: 'Profile' },
      { key: 'framework', label: 'Framework' },
    ],
    nodes,
    links,
    unit: 'mappings',
    unitOne: 'mapping',
    fromHeader: 'Profile',
    toHeader: 'Framework',
    valueHeader: 'Mappings',
    source: SOURCE,
  };
}

/** The in-page anchor of a clause row: `<framework id>--<ref slug>`. */
export function clauseAnchor(fw: Pick<CrosswalkFramework, 'id'>, row: Pick<CrosswalkRow, 'ref'>): string {
  const slug = row.ref
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${fw.id}--${slug}`;
}

/** The clauses with the most controls, largest first, ties in crosswalk order. */
export function topClauses(n = TOP_CLAUSES) {
  const crosswalk = buildControlsCrosswalk();
  return crosswalk.frameworks
    .flatMap((fw) => fw.rows.map((row) => ({ fw, row, controls: row.controls.length })))
    .map((c, i) => ({ ...c, i }))
    .sort((a, b) => b.controls - a.controls || a.i - b.i)
    .slice(0, n);
}

/** A clause's full name: a register row's own title when it opens with its
 *  instrument ("EU AI Act Art. 14 human oversight"), else the instrument's
 *  short name and the title ("NIST AI RMF: MANAGE"); any other clause is the
 *  framework's short name, the clause id and its name ("ISO 42001 Annex A
 *  A.6.2.6: AI system verification and validation"). The chart's mark and
 *  row link are named with it. */
export function clauseName(fw: CrosswalkFramework, row: CrosswalkRow): string {
  const base = shortBase(fw);
  const first = (s: string) => s.split(/\s+/)[0];
  if (!isObligationFramework(fw)) return `${base} ${row.ref}: ${row.name}`;
  return first(row.name) === first(base) ? row.name : `${base}: ${row.name}`;
}

/** A clause's drawn label: its full name (clauseName) cut to at most two
 *  lines of `maxPx`. */
export function clauseLabel(fw: CrosswalkFramework, row: CrosswalkRow, maxPx: number): string {
  return shortenToFit(clauseName(fw, row), maxPx, 13, 2);
}
