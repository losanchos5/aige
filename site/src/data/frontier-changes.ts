// frontier-changes.ts: the version history of the three frontier safety
// frameworks the frontier crosswalk maps (Anthropic RSP, OpenAI Preparedness
// Framework, Google DeepMind FSF), and the material changes between consecutive
// versions. Built to be kept by hand: the build fails (frontierChangeProblems)
// when a version, quote, date or hash is incoherent.
//
// Editorial rules, enforced where a rule can be checked:
//  - The data describes published documents. It never scores, ranks or judges a
//    change and says nothing about what a lab does in practice (summaries are
//    scanned for evaluative words).
//  - Version labels and dates are as the document prints them.
//  - The lab documents themselves are not stored: only URL, retrieval date,
//    SHA-256 and verbatim quotes of at most 25 words.
//  - A transition not yet compared is listed as not covered, with no changes.
//
// `source`, `thirdParty` and `[n]` numbers are 1-based positions in
// `frontierChangeSources`, as in frontier-crosswalk.ts.

import { frontierDocs, dimensions } from './frontier-crosswalk';
import type { Source } from '../lib/sources';

/** Date of the last pass over every version, hash and recorded change. */
export const FRONTIER_CHANGES_AS_OF = '2026-11-17';

/** Schema version of frontier-framework-changes.json / .csv. */
export const frontierChangesSchemaVersion = 1;

/** Page route, shared by the page, the exports and the wiring. */
export const FRONTIER_CHANGES_PATH = '/resources/frontier-framework-changes';

export interface FrontierFile {
  /** SHA-256 of the bytes downloaded from `url` on `retrieved`. */
  sha256: string;
  /** Official URL while the lab serves it. */
  url?: string;
  /** Archived copy. */
  archiveUrl?: string;
  /** Download or capture date (YYYY-MM-DD). */
  retrieved: string;
  verified: 'primary' | 'secondary';
  /** Source number [n] in `frontierChangeSources`. */
  source: number;
  note?: string;
}

export interface FrontierVersion {
  /** Framework id, as in `frontierDocs`. */
  framework: string;
  /** Version as the document prints it, e.g. "Version 3.4". */
  version: string;
  /** Short form used in ids: "3.4", "beta", "2". */
  short: string;
  date: string;
  /** What `date` is: the "effective" date or the "published" / "last updated" one. */
  dateKind: 'effective' | 'published';
  /** One entry per file; empty when the document was not recovered. */
  files: FrontierFile[];
  note?: string;
}

export type ChangeNotes = 'itemised' | 'narrative' | 'redline' | 'none' | 'not-assessed';

export interface FrontierTransition {
  /** `<framework>-<from>-<to>`, e.g. anthropic-rsp-3.3-3.4. */
  id: string;
  framework: string;
  /** `short` of the earlier version. */
  from: string;
  /** `short` of the later version. */
  to: string;
  /** Whether its material changes are recorded in `frontierChanges`. */
  covered: boolean;
  /** Day the changes were recorded (YYYY-MM-DD); required when covered. */
  recorded?: string;
  /** Form of the lab's own account of the changes; not-assessed only when not covered. */
  changeNotes: ChangeNotes;
  changeNotesUrl?: string;
  /** Source numbers of third-party analyses of this transition. */
  thirdParty?: number[];
}

export type ChangeKind = 'added' | 'removed' | 'modified' | 'relocated';
// Same codes as the "Silent Revision" codebook: listed = ANN, partly-listed =
// ANN-P, not-listed = SIL, no-changelog = NCL.
export type Disclosure = 'listed' | 'partly-listed' | 'not-listed' | 'no-changelog';

export interface FrontierQuote {
  /** Verbatim, at most 25 words. */
  quote: string;
  /** Source page; PDF URLs end in #page=N. */
  url: string;
}

export interface FrontierChange {
  /** `<transition>-NN`. */
  id: string;
  transition: string;
  kind: ChangeKind;
  section: string;
  /** One or two sentences: what the text said before and what it says after. */
  summary: string;
  /** Required for modified, removed and relocated. */
  before?: FrontierQuote;
  /** Required for added and modified. */
  after?: FrontierQuote;
  /** Where a relocated text went. */
  movedTo?: string;
  /** Ids of the frontier crosswalk dimensions affected. */
  dimensions: string[];
  disclosure: Disclosure;
  verified: 'primary' | 'secondary';
}

/** The three frameworks the history covers (ids of `frontierDocs`). */
export const frontierChangeFrameworks = ['anthropic-rsp', 'openai-preparedness', 'deepmind-fsf'] as const;

const RETRIEVED = '2026-11-17';

/**
 * Numbered sources. [1] and [2] are the third-party paper and corpus, [3]-[17]
 * the lab documents the version files point to, in version order.
 */
export const frontierChangeSources: readonly Source[] = [
  {
    title: 'Silent Revision: Measuring Undisclosed Change in Safety Frameworks of Frontier AI Developers (v2)',
    gloss: 'Louis Yiven Zhu, arXiv:2609.08789, CC BY 4.0; compares consecutive versions of these frameworks',
    publisher: 'arXiv',
    date: '2026-11-02',
    url: 'https://arxiv.org/abs/2609.08789',
    verified: 'secondary',
  },
  {
    title: 'Frontier safety framework corpus, data DOI 10.5281/zenodo.22670700',
    gloss: 'versioned, hash-pinned corpus of the framework versions and their change accounts; code MIT, data CC BY 4.0; repository github.com/louisyzhu/frontier-safety-framework-corpus',
    publisher: 'Louis Yiven Zhu',
    date: '2026-11-02',
    url: 'https://doi.org/10.5281/zenodo.22670700',
    verified: 'secondary',
  },
  {
    title: 'Responsible Scaling Policy, Version 1.0',
    gloss: 'effective 2023-09-19',
    publisher: 'Anthropic',
    date: '2023-09-19',
    url: 'https://assets.claude.com/1adf000c8f675958c2ee23805d91aaade1cd4613.pdf',
    verified: 'primary',
  },
  {
    title: 'Responsible Scaling Policy, Version 2.0',
    gloss: 'effective 2024-10-15',
    publisher: 'Anthropic',
    date: '2024-10-15',
    url: 'https://assets.claude.com/616dee633636e5bd309cb73aed8622e80fe47839.pdf',
    verified: 'primary',
  },
  {
    title: 'Responsible Scaling Policy, Version 2.1',
    gloss: 'effective 2025-03-31',
    publisher: 'Anthropic',
    date: '2025-03-31',
    url: 'https://assets.claude.com/17310f6d70ae5627f55313ed067afc1a762a4068.pdf',
    verified: 'primary',
  },
  {
    title: 'Responsible Scaling Policy, Version 2.2',
    gloss: 'effective 2025-05-14',
    publisher: 'Anthropic',
    date: '2025-05-14',
    url: 'https://assets.claude.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf',
    verified: 'primary',
  },
  {
    title: 'Responsible Scaling Policy, Version 3.0',
    gloss: 'effective 2026-02-24',
    publisher: 'Anthropic',
    date: '2026-02-24',
    url: 'https://anthropic.com/responsible-scaling-policy/rsp-v3-0',
    verified: 'primary',
  },
  {
    title: 'Responsible Scaling Policy, Version 3.1',
    gloss: 'effective 2026-04-02',
    publisher: 'Anthropic',
    date: '2026-04-02',
    url: 'https://assets.claude.com/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf',
    verified: 'primary',
  },
  {
    title: 'Responsible Scaling Policy, Version 3.2',
    gloss: 'effective 2026-04-29',
    publisher: 'Anthropic',
    date: '2026-04-29',
    url: 'https://assets.claude.com/28c6241900d90410628a8a2003a5572faae4365a.pdf',
    verified: 'primary',
  },
  {
    title: 'Responsible Scaling Policy, Version 3.3',
    gloss: 'effective 2026-05-26',
    publisher: 'Anthropic',
    date: '2026-05-26',
    url: 'https://assets.claude.com/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf',
    verified: 'primary',
  },
  {
    title: 'Responsible Scaling Policy, Version 3.4',
    gloss: 'effective 2026-07-08; same file name as the crosswalk source, as linked from the landing page today',
    publisher: 'Anthropic',
    date: '2026-07-08',
    url: 'https://assets.claude.com/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf',
    verified: 'primary',
  },
  {
    title: 'Preparedness Framework (Beta)',
    gloss: 'December 18, 2023',
    publisher: 'OpenAI',
    date: '2023-12-18',
    url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf',
    verified: 'primary',
  },
  {
    title: 'Preparedness Framework, Version 2',
    gloss: 'last updated 15th April, 2025; change log in Appendix A',
    publisher: 'OpenAI',
    date: '2025-04-15',
    url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf',
    verified: 'primary',
  },
  {
    title: 'Frontier Safety Framework, Version 1.0',
    gloss: 'first version of the framework',
    publisher: 'Google DeepMind',
    date: '2024-05-17',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/introducing-the-frontier-safety-framework/fsf-technical-report.pdf',
    verified: 'primary',
  },
  {
    title: 'Frontier Safety Framework, Version 2.0',
    gloss: '4th February 2025',
    publisher: 'Google DeepMind',
    date: '2025-02-04',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0.pdf',
    verified: 'primary',
  },
  {
    title: 'Frontier Safety Framework, Version 3.0',
    gloss: 'published September 22, 2025',
    publisher: 'Google DeepMind',
    date: '2025-09-22',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf',
    verified: 'primary',
  },
  {
    title: 'Frontier Safety Framework, Version 3.1',
    gloss: 'published April 17, 2026; Section 5.3 lists past updates and changes',
    publisher: 'Google DeepMind',
    date: '2026-04-17',
    url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf',
    verified: 'primary',
  },
];

// Source numbers used by the data below.
const PAPER = 1;
const CORPUS = 2;

/** The versions, oldest first within each framework. */
export const frontierVersions: readonly FrontierVersion[] = [
  {
    framework: 'anthropic-rsp',
    version: 'Version 1.0',
    short: '1.0',
    date: '2023-09-19',
    dateKind: 'effective',
    files: [
      {
        sha256: '14785337769bee567dd488d346f9cf6e36fed7792da9656a0a8b55b2f6d21c43',
        url: 'https://assets.claude.com/1adf000c8f675958c2ee23805d91aaade1cd4613.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 3,
      },
    ],
  },
  {
    framework: 'anthropic-rsp',
    version: 'Version 2.0',
    short: '2.0',
    date: '2024-10-15',
    dateKind: 'effective',
    files: [
      {
        sha256: 'cc522e2770c6fec6c2808ce5abd8b757a8d7fe2078d029879295df8443185f7f',
        url: 'https://assets.claude.com/616dee633636e5bd309cb73aed8622e80fe47839.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 4,
      },
    ],
    note: 'The PDF prints "Effective October 15, 2024" and no version number; the label is the one on the landing page and in the later changelogs.',
  },
  {
    framework: 'anthropic-rsp',
    version: 'Version 2.1',
    short: '2.1',
    date: '2025-03-31',
    dateKind: 'effective',
    files: [
      {
        sha256: 'f0ac67ca61b1726cbcd159e6d2f595ce4f26de2ee29c594ba488f53f780d4ee7',
        url: 'https://assets.claude.com/17310f6d70ae5627f55313ed067afc1a762a4068.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 5,
      },
    ],
  },
  {
    framework: 'anthropic-rsp',
    version: 'Version 2.2',
    short: '2.2',
    date: '2025-05-14',
    dateKind: 'effective',
    files: [
      {
        sha256: '4807f3970c76968a75a6dffa55d8ffe547014522b63c67e261cd02f7b6fc1e39',
        url: 'https://assets.claude.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 6,
      },
    ],
  },
  {
    framework: 'anthropic-rsp',
    version: 'Version 3.0',
    short: '3.0',
    date: '2026-02-24',
    dateKind: 'effective',
    files: [
      {
        sha256: 'a71bfa08a7fa4b750b2b408b4b9c8681ad50c6b53271c314f591c59c84c38064',
        url: 'https://anthropic.com/responsible-scaling-policy/rsp-v3-0',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 7,
        note: 'The URL serves the PDF.',
      },
    ],
  },
  {
    framework: 'anthropic-rsp',
    version: 'Version 3.1',
    short: '3.1',
    date: '2026-04-02',
    dateKind: 'effective',
    files: [
      {
        sha256: '5aa73a3b3155ef856e429711c8d156e18d9b5ce1e28c2e0a74019a2c3c764d7b',
        url: 'https://assets.claude.com/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 8,
      },
    ],
  },
  {
    framework: 'anthropic-rsp',
    version: 'Version 3.2',
    short: '3.2',
    date: '2026-04-29',
    dateKind: 'effective',
    files: [
      {
        sha256: '5410e3d986cf6917e9105c3d3a661ccc91bfbcb8672bca18b7752ca394e3f2a1',
        url: 'https://assets.claude.com/28c6241900d90410628a8a2003a5572faae4365a.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 9,
      },
    ],
  },
  {
    framework: 'anthropic-rsp',
    version: 'Version 3.3',
    short: '3.3',
    date: '2026-05-26',
    dateKind: 'effective',
    files: [
      {
        sha256: 'b7e7cc1e72e9371949415522ae3c9e61103cc739c5df64579af32dd941624f42',
        url: 'https://assets.claude.com/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 10,
      },
    ],
  },
  {
    framework: 'anthropic-rsp',
    version: 'Version 3.4',
    short: '3.4',
    date: '2026-07-08',
    dateKind: 'effective',
    files: [
      {
        sha256: '6247b9e4001fd342827526fabc476c9d4dd6b2041ac00055f0ccda26f4d0b07d',
        url: 'https://assets.claude.com/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 11,
      },
    ],
  },
  {
    framework: 'openai-preparedness',
    version: 'Beta',
    short: 'beta',
    date: '2023-12-18',
    dateKind: 'published',
    files: [
      {
        sha256: 'c84e3a59c7dab251e45434e0b0d3e8abadcea7293f995cf92d32269e7d290398',
        url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 12,
      },
    ],
    note: 'The PDF is titled "Preparedness Framework (Beta)" and is dated December 18, 2023.',
  },
  {
    framework: 'openai-preparedness',
    version: 'Version 2',
    short: '2',
    date: '2025-04-15',
    dateKind: 'published',
    files: [
      {
        sha256: 'fae6e4cc6f7212a010bb9348fc0cde1fe711b9cad426c6a99db97740ee52729b',
        url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 13,
        note: 'The corpus records this file as identical to a re-upload of June 2025 under the same version label (entry v2-reupload-20250611).',
      },
    ],
    note: 'The PDF prints "Version 2. Last updated: 15th April, 2025".',
  },
  {
    framework: 'deepmind-fsf',
    version: 'Version 1.0',
    short: '1.0',
    date: '2024-05-17',
    dateKind: 'published',
    files: [
      {
        sha256: '3c073cd5c7a0dd03a07d0cc826fd9d5c76801f57441ac37ef6b2163e9261543d',
        url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/introducing-the-frontier-safety-framework/fsf-technical-report.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 14,
      },
    ],
    note: 'The PDF prints "Version 1.0" and no date; the date is that of the announcement.',
  },
  {
    framework: 'deepmind-fsf',
    version: 'Version 2.0',
    short: '2.0',
    date: '2025-02-04',
    dateKind: 'published',
    files: [
      {
        sha256: '14a48e4ef052fba75b651ea23845c2e9557f5c638e2767656decc6410861aae3',
        url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 15,
        note: 'The corpus records this file as its variant of 2025-03-28 (v2.0-reupload-20250328), which adds an "Updates and changes" page.',
      },
    ],
    note: 'The PDF prints "Version 2.0, 4th February 2025".',
  },
  {
    framework: 'deepmind-fsf',
    version: 'Version 3.0',
    short: '3.0',
    date: '2025-09-22',
    dateKind: 'published',
    files: [
      {
        sha256: '87ebf40b747b98468226b2198442b45ff54854975f6e9882d9ece2d009082fe5',
        url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 16,
        note: "Google's pages do not link this URL; it follows the pattern of the Version 3.1 file name, and the file states Version 3.0, published September 22, 2025.",
      },
    ],
  },
  {
    framework: 'deepmind-fsf',
    version: 'Version 3.1',
    short: '3.1',
    date: '2026-04-17',
    dateKind: 'published',
    files: [
      {
        sha256: 'ad10d2d240e0d557ecad406dbccedcbb4a70295f8ba8eec46bfe01803cb9c301',
        url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf',
        retrieved: RETRIEVED,
        verified: 'primary',
        source: 17,
      },
    ],
  },
];

const trans = (
  framework: string,
  from: string,
  to: string,
  extra: Partial<FrontierTransition> = {},
): FrontierTransition => ({
  id: `${framework}-${from}-${to}`,
  framework,
  from,
  to,
  covered: false,
  changeNotes: 'not-assessed',
  thirdParty: [PAPER, CORPUS],
  ...extra,
});

/** One per pair of consecutive versions, oldest first within each framework. */
export const frontierTransitions: readonly FrontierTransition[] = [
  trans('anthropic-rsp', '1.0', '2.0'),
  trans('anthropic-rsp', '2.0', '2.1'),
  trans('anthropic-rsp', '2.1', '2.2'),
  trans('anthropic-rsp', '2.2', '3.0'),
  trans('anthropic-rsp', '3.0', '3.1'),
  trans('anthropic-rsp', '3.1', '3.2'),
  trans('anthropic-rsp', '3.2', '3.3'),
  trans('anthropic-rsp', '3.3', '3.4', {
    changeNotesUrl: 'https://assets.claude.com/fbfdce5e4e825a3e089085205a842a9ae8ffac99.pdf',
  }),
  trans('openai-preparedness', 'beta', '2'),
  trans('deepmind-fsf', '1.0', '2.0'),
  trans('deepmind-fsf', '2.0', '3.0'),
  trans('deepmind-fsf', '3.0', '3.1'),
];

/** The recorded changes. Empty until a transition is compared and checked. */
export const frontierChanges: FrontierChange[] = [];

// ---------------------------------------------------------------------------
// Lookups. Newest first, the order the page shows.

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);

/** Versions of a framework, newest first. */
export function versionsFor(framework: string): FrontierVersion[] {
  return frontierVersions.filter((v) => v.framework === framework).sort(byDateDesc);
}

const versionDate = (framework: string, short: string) =>
  frontierVersions.find((v) => v.framework === framework && v.short === short)?.date ?? '';

/** Transitions of a framework, newest first (by the date of the later version). */
export function transitionsFor(framework: string): FrontierTransition[] {
  return frontierTransitions
    .filter((t) => t.framework === framework)
    .sort((a, b) => versionDate(b.framework, b.to).localeCompare(versionDate(a.framework, a.to)));
}

export function changesFor(transitionId: string): FrontierChange[] {
  return frontierChanges.filter((c) => c.transition === transitionId);
}

export function latestVersion(framework: string): FrontierVersion | undefined {
  return versionsFor(framework)[0];
}

/**
 * For each lab document of the crosswalk: the version it maps, the latest one
 * recorded here, and whether they are the same.
 */
export function crosswalkVersionStatus(): {
  framework: string;
  mapped: string;
  latest: string | undefined;
  isLatest: boolean;
}[] {
  return frontierDocs
    .filter((d) => (frontierChangeFrameworks as readonly string[]).includes(d.frameworkId))
    .map((d) => {
      const latest = latestVersion(d.frameworkId)?.version;
      return { framework: d.frameworkId, mapped: d.version, latest, isLatest: latest === d.version };
    });
}

// ---------------------------------------------------------------------------
// Invariants

const wordCount = (s: string): number => s.trim().split(/\s+/).filter(Boolean).length;

// Evaluative words banned in summaries (whole words, case-insensitive).
const BANNED = [
  'weaken', 'weakened', 'weaker', 'strengthen', 'strengthened', 'stronger', 'water down', 'watered',
  'loophole', 'backtrack', 'backslide', 'walk back', 'improve', 'improved', 'worse', 'better',
  'dilute', 'diluted', 'gut', 'gutted', 'quietly', 'silently',
];
const BANNED_RE = new RegExp(`\\b(?:${BANNED.map((w) => w.replace(' ', '\\s+')).join('|')})\\b`, 'i');

const isDate = (d: string): boolean => {
  const t = new Date(`${d}T00:00:00Z`);
  return /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(t.getTime()) && t.toISOString().startsWith(d);
};

/**
 * Build-time invariants. The page throws when the list is not empty, so an
 * incoherent version, hash, date or change fails before it ships. Every message
 * names the offending id.
 */
export function frontierChangeProblems(): string[] {
  const problems: string[] = [];
  const n = frontierChangeSources.length;
  const dimIds = new Set(dimensions.map((d) => d.id));
  const fwSet = new Set<string>(frontierChangeFrameworks);
  const cited = new Set<number>();
  const checkSource = (n0: number, at: string) => {
    cited.add(n0);
    if (!Number.isInteger(n0) || n0 < 1 || n0 > n) problems.push(`${at}: source [${n0}] does not exist`);
  };
  const checkDate = (d: string, at: string) => {
    if (!isDate(d)) problems.push(`${at}: invalid date ${d}`);
    else if (d > FRONTIER_CHANGES_AS_OF) problems.push(`${at}: date ${d} is after the as-of date ${FRONTIER_CHANGES_AS_OF}`);
  };

  // Versions
  const vKeys = new Set<string>();
  for (const v of frontierVersions) {
    const at = `version ${v.framework} ${v.short}`;
    if (!fwSet.has(v.framework)) problems.push(`${at}: unknown framework`);
    if (vKeys.has(at)) problems.push(`${at}: duplicate version`);
    vKeys.add(at);
    if (!v.version.trim() || !v.short.trim()) problems.push(`${at}: empty label or short form`);
    checkDate(v.date, at);
    v.files.forEach((f, i) => {
      const fat = `${at} file ${i + 1}`;
      if (!/^[0-9a-f]{64}$/.test(f.sha256)) problems.push(`${fat}: sha256 is not 64 lowercase hex characters`);
      if (!f.url && !f.archiveUrl) problems.push(`${fat}: neither url nor archiveUrl`);
      for (const u of [f.url, f.archiveUrl]) if (u && !u.startsWith('https://')) problems.push(`${fat}: url not https`);
      checkDate(f.retrieved, fat);
      checkSource(f.source, fat);
    });
  }

  // Transitions: exactly one per pair of consecutive versions of each framework.
  const tIds = new Set<string>();
  for (const t of frontierTransitions) {
    const at = `transition ${t.id}`;
    if (tIds.has(t.id)) problems.push(`${at}: duplicate id`);
    tIds.add(t.id);
    if (t.id !== `${t.framework}-${t.from}-${t.to}`) problems.push(`${at}: id is not <framework>-<from>-<to>`);
    if (!vKeys.has(`version ${t.framework} ${t.from}`)) problems.push(`${at}: unknown version ${t.from}`);
    if (!vKeys.has(`version ${t.framework} ${t.to}`)) problems.push(`${at}: unknown version ${t.to}`);
    if (t.covered && !t.recorded) problems.push(`${at}: covered without a recorded date`);
    if (t.recorded) checkDate(t.recorded, `${at} recorded`);
    if (t.covered && t.changeNotes === 'not-assessed') problems.push(`${at}: covered but changeNotes is not-assessed`);
    if (!t.covered && t.changeNotes !== 'not-assessed') problems.push(`${at}: not covered but changeNotes is ${t.changeNotes}`);
    if (t.changeNotesUrl && !t.changeNotesUrl.startsWith('https://')) problems.push(`${at}: changeNotesUrl not https`);
    for (const s of t.thirdParty ?? []) checkSource(s, at);
  }
  for (const fw of fwSet) {
    const vs = versionsFor(fw).reverse();
    for (let i = 1; i < vs.length; i++) {
      const id = `${fw}-${vs[i - 1].short}-${vs[i].short}`;
      if (!tIds.has(id)) problems.push(`framework ${fw}: no transition ${id} between consecutive versions`);
    }
    const expected = Math.max(vs.length - 1, 0);
    const have = frontierTransitions.filter((t) => t.framework === fw).length;
    if (have !== expected) problems.push(`framework ${fw}: ${have} transitions for ${vs.length} versions, expected ${expected}`);
  }

  // Changes
  const cIds = new Set<string>();
  for (const c of frontierChanges) {
    const at = `change ${c.id}`;
    if (cIds.has(c.id)) problems.push(`${at}: duplicate id`);
    cIds.add(c.id);
    const t = frontierTransitions.find((x) => x.id === c.transition);
    if (!t) problems.push(`${at}: unknown transition ${c.transition}`);
    else {
      if (!t.covered) problems.push(`${at}: its transition ${t.id} is not covered`);
      if (!new RegExp(`^${t.id.replace(/\./g, '\\.')}-\\d{2}$`).test(c.id)) problems.push(`${at}: id is not <transition>-NN`);
    }
    if (c.dimensions.length === 0) problems.push(`${at}: no dimension`);
    for (const d of c.dimensions) if (!dimIds.has(d)) problems.push(`${at}: unknown dimension ${d}`);
    if (!c.section.trim()) problems.push(`${at}: empty section`);
    if (!c.summary.trim()) problems.push(`${at}: empty summary`);
    const banned = BANNED_RE.exec(c.summary);
    if (banned) problems.push(`${at}: summary uses the banned word "${banned[0]}"`);
    if ((c.kind === 'modified' || c.kind === 'removed' || c.kind === 'relocated') && !c.before) {
      problems.push(`${at}: ${c.kind} without a before quote`);
    }
    if ((c.kind === 'modified' || c.kind === 'added') && !c.after) problems.push(`${at}: ${c.kind} without an after quote`);
    if (c.kind === 'relocated' && !c.movedTo?.trim()) problems.push(`${at}: relocated without movedTo`);
    for (const [side, q] of [['before', c.before], ['after', c.after]] as const) {
      if (!q) continue;
      if (!q.quote.trim()) problems.push(`${at}: empty ${side} quote`);
      if (wordCount(q.quote) > 25) problems.push(`${at}: ${side} quote over 25 words`);
      if (!q.url.startsWith('https://')) problems.push(`${at}: ${side} url not https`);
      if (q.url.includes('.pdf') && !/#page=\d+$/.test(q.url)) problems.push(`${at}: ${side} PDF url without #page=`);
    }
  }

  // Consistency with the frontier crosswalk: the version it maps must be in the history.
  for (const d of frontierDocs) {
    if (fwSet.has(d.frameworkId) && !frontierVersions.some((v) => v.framework === d.frameworkId && v.version === d.version)) {
      problems.push(`crosswalk document ${d.frameworkId}: version "${d.version}" is not in the history`);
    }
  }
  for (const fw of fwSet) if (!frontierDocs.some((d) => d.frameworkId === fw)) problems.push(`framework ${fw}: no crosswalk document`);

  // Sources: all cited somewhere, all https.
  for (const [i, s] of frontierChangeSources.entries()) {
    if (!s.url.startsWith('https://')) problems.push(`source [${i + 1}] ${s.title}: url not https`);
  }
  for (let i = 1; i <= n; i++) if (!cited.has(i)) problems.push(`source [${i}] is never cited`);

  const blob = JSON.stringify({ frontierChangeSources, frontierVersions, frontierTransitions, frontierChanges });
  if (blob.includes(String.fromCharCode(0x2014))) problems.push('em dash in the frontier changes data');
  return problems;
}

// ---------------------------------------------------------------------------
// Exports

/** The notice every export carries, so the disclaimer cannot be stripped. */
export function frontierChangesNotice(bokVersion: string): string {
  return `Descriptive record of published frontier safety framework versions and of changes between them, from the AI Governance Engineer Body of Knowledge v${bokVersion}; not exhaustive, and not a claim about any lab's conduct or conformity with any rule; frontier framework changes schema ${frontierChangesSchemaVersion}, as of ${FRONTIER_CHANGES_AS_OF}`;
}

/** The data part of frontier-framework-changes.json (the page wraps it in the envelope). */
export function frontierChangesPayload() {
  return {
    versions: frontierVersions.map((v) => ({
      framework: v.framework,
      version: v.version,
      short: v.short,
      date: v.date,
      dateKind: v.dateKind,
      note: v.note ?? null,
      files: v.files.map((f) => ({
        sha256: f.sha256,
        url: f.url ?? null,
        archiveUrl: f.archiveUrl ?? null,
        retrieved: f.retrieved,
        verified: f.verified,
        source: f.source,
        note: f.note ?? null,
      })),
    })),
    transitions: frontierTransitions.map((t) => ({
      id: t.id,
      framework: t.framework,
      from: t.from,
      to: t.to,
      covered: t.covered,
      recorded: t.recorded ?? null,
      changeNotes: t.changeNotes,
      changeNotesUrl: t.changeNotesUrl ?? null,
      thirdParty: t.thirdParty ?? [],
    })),
    changes: frontierChanges.map((c) => ({
      id: c.id,
      transition: c.transition,
      kind: c.kind,
      section: c.section,
      summary: c.summary,
      before: c.before ?? null,
      after: c.after ?? null,
      movedTo: c.movedTo ?? null,
      dimensions: c.dimensions,
      disclosure: c.disclosure,
      verified: c.verified,
    })),
    sources: frontierChangeSources.map((s, i) => ({ n: i + 1, ...s })),
  };
}

/** One flat record per change: the rows of the CSV. */
export function frontierChangeExportRows() {
  const label = (framework: string, short: string) =>
    frontierVersions.find((v) => v.framework === framework && v.short === short)?.version ?? short;
  return frontierChanges.map((c) => {
    const t = frontierTransitions.find((x) => x.id === c.transition);
    const fw = t?.framework ?? '';
    return {
      id: c.id,
      framework: fw,
      frameworkName: frontierDocs.find((d) => d.frameworkId === fw)?.short ?? fw,
      transition: c.transition,
      from: t ? label(fw, t.from) : '',
      to: t ? label(fw, t.to) : '',
      kind: c.kind,
      section: c.section,
      summary: c.summary,
      beforeQuote: c.before?.quote ?? null,
      beforeUrl: c.before?.url ?? null,
      afterQuote: c.after?.quote ?? null,
      afterUrl: c.after?.url ?? null,
      movedTo: c.movedTo ?? null,
      dimensions: c.dimensions,
      disclosure: c.disclosure,
      verified: c.verified,
    };
  });
}
