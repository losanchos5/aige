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
  /** Source number [n] of the page the label comes from, when the document itself prints none. */
  labelSource?: number;
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
  /** Source numbers of the lab's own change-note pages for this transition, beyond the document itself. */
  noteSources?: number[];
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
 * the lab documents the version files point to, in version order, [18] and [19]
 * the lab pages that carry change notes or a version label.
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
  {
    title: 'Responsible Scaling Policy (landing page and version history)',
    gloss: 'lists each version with a dated change summary and links the redlines; last updated 2026-08-14; the only place that gives Version 2.0 its number',
    publisher: 'Anthropic',
    date: '2026-08-14',
    url: 'https://www.anthropic.com/responsible-scaling-policy',
    verified: 'primary',
  },
  {
    title: 'Strengthening our Frontier Safety Framework',
    gloss: 'blog post with a section on Version 3.1; updated April 17, 2026',
    publisher: 'Google DeepMind',
    date: '2026-04-17',
    url: 'https://deepmind.google/blog/strengthening-our-frontier-safety-framework/',
    verified: 'primary',
  },
];

// Source numbers used by the data below.
const PAPER = 1;
const CORPUS = 2;
const ANTHROPIC_PAGE = 18;
const GDM_BLOG = 19;

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
      {
        sha256: '22b37ecf913ea432e4c48a050a1b7fade32e155c96d7b6a9f85c2977501902f3',
        archiveUrl: 'https://web.archive.org/web/20241101012028id_/https://assets.anthropic.com/m/24a47b00f10301cd/original/Anthropic-Responsible-Scaling-Policy-2024-10-15.pdf',
        retrieved: '2024-11-01',
        verified: 'secondary',
        source: CORPUS,
        note: 'Corpus entry v2.0-reupload-20241101 (manifest.csv line 4), a Wayback Machine capture of 2024-11-01 under the same version label. The corpus (silent_variants.csv) records one difference from v2.0: a hyperlink to the v1.0 PDF added to the changelog entry, not material.',
      },
    ],
    labelSource: ANTHROPIC_PAGE,
    note: 'The cover prints no version number, only "Effective October 15, 2024"; its Changelog calls it "RSP-2024". The label 2.0 comes from the lab\'s version list on the landing page.',
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
      {
        sha256: 'c239fc31d4acabba7b35437dba103fcae4c4d4b8ae25b43bdff28b63f5c40ac5',
        archiveUrl: 'https://web.archive.org/web/20250401013032id_/https://www-cdn.anthropic.com/080b003762c270d033dc2ea1153b9df665078da1.pdf',
        retrieved: '2025-04-01',
        verified: 'secondary',
        source: CORPUS,
        note: 'Corpus entry v2.1 (manifest.csv line 5), a Wayback Machine capture of 2025-04-01 under the same version label. The corpus (silent_variants.csv) records one difference from v2.1-reupload-20250402, the entry for the file above: the table-of-contents line "Changelog 17" is present here and absent there, not material.',
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
      {
        sha256: '432de80c72d039f2e93c70c481af916616676a31b867b7113f1874e5763ccac3',
        archiveUrl: 'https://web.archive.org/web/20250415191354id_/https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf',
        retrieved: '2025-04-15',
        verified: 'secondary',
        source: CORPUS,
        note: 'Corpus entry v2 (manifest.csv line 20), the first Wayback Machine capture, 2025-04-15, under the same printed label; not downloaded by us. The corpus (silent_variants.csv lines 4 and 5) records differences from the later file as editorial only: "e.g." for "e.g.," in seven places, an en dash for a hyphen, and a duplicated "Value alignment" sentence in Appendix C; Appendix A unchanged, not material.',
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
    note: 'The PDF prints "Version 1.0" on page 1 and no date; the lab dates it May 17, 2024 in section 5.3 of Version 3.1 (page 17) and of Version 3.0 (page 16).',
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
      {
        sha256: 'f82534b5f9c26a700340706d8ebac7b34bbb492354465d24226bf94eb7ddd16c',
        archiveUrl: 'https://web.archive.org/web/20250205011727id_/https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0.pdf',
        retrieved: '2025-02-05',
        verified: 'secondary',
        source: CORPUS,
        note: 'Corpus entry v2.0 (manifest.csv line 24), a Wayback Machine capture of 2025-02-05 under the same version label.',
      },
      {
        sha256: '5d66eec33b473462d5d536674b2ef2f3ee2492ff71a2721dc2cf9fad4f4d2a84',
        archiveUrl: 'https://web.archive.org/web/20250213011843id_/https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0%20(1).pdf',
        retrieved: '2025-02-13',
        verified: 'secondary',
        source: CORPUS,
        note: 'Corpus entry v2.0-reupload-20250213 (manifest.csv line 25), a Wayback Machine capture of 2025-02-13 under the same version label. The corpus (silent_variants.csv line 6) records the acknowledgements change "Zimmerman" to "Zimmermann", not material.',
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
  trans('anthropic-rsp', '3.0', '3.1', {
    covered: true,
    recorded: '2026-11-17',
    changeNotes: 'redline',
    changeNotesUrl: 'https://assets.claude.com/64cb0ac5eb0f8030187131f490827323e3d53308.pdf',
    noteSources: [ANTHROPIC_PAGE],
  }),
  trans('anthropic-rsp', '3.1', '3.2', {
    covered: true,
    recorded: '2026-11-17',
    changeNotes: 'redline',
    changeNotesUrl: 'https://assets.claude.com/7c534a9e7a82d4411dd568d85ffbcd14ac243a62.pdf',
    noteSources: [ANTHROPIC_PAGE],
  }),
  trans('anthropic-rsp', '3.2', '3.3', {
    covered: true,
    recorded: '2026-11-17',
    changeNotes: 'redline',
    changeNotesUrl: 'https://assets.claude.com/dd0ec579bee2cd144069c478ede3e35ea080ad02.pdf',
    noteSources: [ANTHROPIC_PAGE],
  }),
  trans('anthropic-rsp', '3.3', '3.4', {
    covered: true,
    recorded: '2026-11-17',
    changeNotes: 'redline',
    changeNotesUrl: 'https://assets.claude.com/fbfdce5e4e825a3e089085205a842a9ae8ffac99.pdf',
    noteSources: [ANTHROPIC_PAGE],
  }),
  trans('openai-preparedness', 'beta', '2', {
    covered: true,
    recorded: '2026-11-17',
    changeNotes: 'itemised',
    changeNotesUrl: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=15',
    noteSources: [13],
  }),
  trans('deepmind-fsf', '1.0', '2.0'),
  trans('deepmind-fsf', '2.0', '3.0'),
  trans('deepmind-fsf', '3.0', '3.1', {
    covered: true,
    recorded: '2026-11-17',
    changeNotes: 'itemised',
    changeNotesUrl: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=17',
    noteSources: [GDM_BLOG],
  }),
];

/** The recorded changes of the covered transitions, in document order within each. */
export const frontierChanges: FrontierChange[] = [
  {
    id: 'anthropic-rsp-3.0-3.1-01',
    transition: 'anthropic-rsp-3.0-3.1',
    kind: 'modified',
    section: '1. Our Recommendations for Industry-Wide Safety',
    summary: 'The Automated R&D threshold was operationalized as the point where a model could compress two years of 2018 to 2024 AI progress into a single year. It is now met if either (1) models could fully substitute for the entire set of Research Scientists and Research Engineers at competitive costs (within a factor of 5), or (2) there is "dramatic acceleration", defined as observing or expecting double the rate of progress compared with the rate expected without significant AI contributions to AI R&D, where this doubling is plausibly attributable to the automation of research and/or engineering.',
    before: {
      quote: 'at the point where we determine that a model could compress two years of 2018 – 2024 AI progress into a single year',
      url: 'https://anthropic.com/responsible-scaling-policy/rsp-v3-0#page=8',
    },
    after: {
      quote: 'if we determine that either (1) our models would be able to fully substitute for our entire set of Research Scientists and Research Engineers',
      url: 'https://assets.claude.com/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf#page=8',
    },
    dimensions: ['thresholds'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.0-3.1-02',
    transition: 'anthropic-rsp-3.0-3.1',
    kind: 'modified',
    section: '3.6. External Review',
    summary: 'A "highly capable" model was one that could fully automate, or dramatically accelerate, the work of large, top-tier research teams in domains such as energy, robotics, weapons development or AI itself, with evaluations for now focused on compressing two years of 2018 to 2024 AI progress into one. It is now a model that crosses the threshold for automated AI R&D described in Section 1.',
    before: {
      quote: 'A model is “highly capable” if we conclude it could fully automate, or dramatically accelerate, the work of large, top-tier research teams',
      url: 'https://anthropic.com/responsible-scaling-policy/rsp-v3-0#page=13',
    },
    after: {
      quote: 'A model is “highly capable” if we conclude that it crosses the threshold for automated AI R&D described in Section 1.',
      url: 'https://assets.claude.com/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf#page=14',
    },
    dimensions: ['thresholds', 'external-review', 'go-no-go'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.0-3.1-03',
    transition: 'anthropic-rsp-3.0-3.1',
    kind: 'modified',
    section: '3.1. Scope and Timing',
    summary: "A Risk Report covered internally deployed models that could pose significant risks above and beyond those posed by the company's public models. It now covers those that could pose significant risks beyond those posed by models covered by a prior Risk Report.",
    before: {
      quote: 'above and beyond those posed by our public models',
      url: 'https://anthropic.com/responsible-scaling-policy/rsp-v3-0#page=10',
    },
    after: {
      quote: 'beyond those posed by models that are covered by a prior Risk Report',
      url: 'https://assets.claude.com/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf#page=11',
    },
    dimensions: ['scope', 'transparency'],
    disclosure: 'not-listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.0-3.1-04',
    transition: 'anthropic-rsp-3.0-3.1',
    kind: 'modified',
    section: '3.4. Procedures',
    summary: 'Separate internal reviewers were to provide comprehensive feedback on the Risk Report. The text now says Anthropic will solicit comprehensive internal feedback and may also use that feedback to revise the report itself.',
    before: {
      quote: 'Separate internal reviewers will provide comprehensive feedback on the report',
      url: 'https://anthropic.com/responsible-scaling-policy/rsp-v3-0#page=12',
    },
    after: {
      quote: 'We may also use this feedback to improve or refine the report itself.',
      url: 'https://assets.claude.com/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf#page=13',
    },
    dimensions: ['reporting', 'transparency'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.0-3.1-05',
    transition: 'anthropic-rsp-3.0-3.1',
    kind: 'added',
    section: 'Appendix A: Commitments Related to Competitors',
    summary: 'The competitor-related commitments had no statement about action outside their triggers. The new text says the commitments do not preclude cautionary action, such as refraining from training or deploying models, and that Anthropic would strongly consider pausing development or deployment even in cases not covered.',
    after: {
      quote: 'the commitments below do not preclude us from taking cautionary action, such as refraining from training or deploying models, in other circumstances',
      url: 'https://assets.claude.com/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf#page=16',
    },
    dimensions: ['go-no-go'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.1-3.2-01',
    transition: 'anthropic-rsp-3.1-3.2',
    kind: 'added',
    section: '3.6. External Review',
    summary: "The external review section had no provision for the Long Term Benefit Trust (LTBT) to ask for a review. The new sentence says that, upon the LTBT's request, Anthropic will conduct a public or private external review of a Risk Report or sections of it, under the procedures in the section.",
    after: {
      quote: 'In addition, upon the LTBT’s request, we will conduct a public or private external review of our Risk Report or sections thereof',
      url: 'https://assets.claude.com/28c6241900d90410628a8a2003a5572faae4365a.pdf#page=14',
    },
    dimensions: ['external-review', 'governance'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.1-3.2-02',
    transition: 'anthropic-rsp-3.1-3.2',
    kind: 'modified',
    section: '3.6.1. Selecting external reviewers',
    summary: 'External reviewers were selected in consultation with the Board and the LTBT. They are now selected by consulting the Board and obtaining the approval of the LTBT.',
    before: {
      quote: 'In consultation with the Board and LTBT, we will select external reviewers',
      url: 'https://assets.claude.com/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf#page=14',
    },
    after: {
      quote: 'In selecting external reviewers, we will consult with the Board and obtain the approval of the LTBT.',
      url: 'https://assets.claude.com/28c6241900d90410628a8a2003a5572faae4365a.pdf#page=15',
    },
    dimensions: ['external-review', 'governance'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.1-3.2-03',
    transition: 'anthropic-rsp-3.1-3.2',
    kind: 'added',
    section: '4. Governance',
    summary: 'The governance commitments had no standing briefing for the LTBT. A new item says Anthropic will regularly brief the LTBT on plans and developments related to Risk Reports, including model training, capability evals, mitigations and risk analyses.',
    after: {
      quote: 'We will regularly brief the LTBT on plans and developments related to our Risk Reports',
      url: 'https://assets.claude.com/28c6241900d90410628a8a2003a5572faae4365a.pdf#page=16',
    },
    dimensions: ['governance', 'reporting'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.2-3.3-01',
    transition: 'anthropic-rsp-3.2-3.3',
    kind: 'modified',
    section: '1. Our Recommendations for Industry-Wide Safety',
    summary: 'The threshold was AI systems able to significantly help threat actors (for example, moderately resourced expert-backed teams) create/obtain and deploy chemical and/or biological weapons with potential for catastrophic damages far beyond past catastrophes such as COVID-19. It is now AI systems that can functionally substitute for the scarce human expertise that is the primary barrier, so that a well-resourced team could accomplish end-to-end agent design and deployment that would otherwise require recruiting one of a small number (footnote: hundreds) of world-leading specialists, with footnotes setting the harm as events with consequences at least comparable to those of COVID-19 and the baseline as access only to the best AI models as of 2023.',
    before: {
      quote: 'AI systems with the ability to significantly help threat actors (for example, moderately resourced expert-backed teams) create/obtain and deploy chemical and/or biological weapons',
      url: 'https://assets.claude.com/28c6241900d90410628a8a2003a5572faae4365a.pdf#page=7',
    },
    after: {
      quote: 'AI systems that can functionally substitute for the scarce human expertise that is currently the primary barrier to novel development of chemical and biological weapons',
      url: 'https://assets.claude.com/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf#page=7',
    },
    dimensions: ['thresholds'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.2-3.3-02',
    transition: 'anthropic-rsp-3.2-3.3',
    kind: 'modified',
    section: '3.1. Scope and Timing',
    summary: 'A Risk Report covered internally deployed models that could pose significant risks beyond those of models in a prior Risk Report, where a footnote tied the risks to the capability thresholds in Section 1. It now covers internally deployed models that could pose risks related to high-stakes misalignment or automated R&D that significantly exceed those posed by models covered by a prior Risk Report.',
    before: {
      quote: 'It will also cover internally deployed models when we determine that these models could pose significant risks',
      url: 'https://assets.claude.com/28c6241900d90410628a8a2003a5572faae4365a.pdf#page=11',
    },
    after: {
      quote: 'internally deployed models that we determine (1) could pose risks related to high-stakes misalignment or automated R&D that (2) significantly exceed those posed by models',
      url: 'https://assets.claude.com/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf#page=11',
    },
    dimensions: ['scope', 'transparency'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.2-3.3-03',
    transition: 'anthropic-rsp-3.2-3.3',
    kind: 'modified',
    section: '3.1. Scope and Timing',
    summary: "The off-cycle trigger for a newly deployed public model was being significantly more capable than any model covered in the most recent Risk Report, and the output was a discussion in a System Card or elsewhere. It is now being significantly more capable than all models for which risks related to chemical/biological weapons, high-stakes misalignment or automated R&D have been publicly analyzed in any public artifact, and the output is an analysis of the model's relevant risks.",
    before: {
      quote: 'When we publicly deploy a model that we determine is significantly more capable than any of the models covered in the most recent Risk Report',
      url: 'https://assets.claude.com/28c6241900d90410628a8a2003a5572faae4365a.pdf#page=11',
    },
    after: {
      quote: '(1) significantly more capable than (2) all models for which we have publicly analyzed risks related to chemical/biological weapons production, high-stakes misalignment, or automated R&D',
      url: 'https://assets.claude.com/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf#page=11',
    },
    dimensions: ['triggers', 'transparency'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.2-3.3-04',
    transition: 'anthropic-rsp-3.2-3.3',
    kind: 'modified',
    section: '3.1. Scope and Timing',
    summary: 'The off-cycle trigger for an internally deployed model was determining that the model is in-scope. It is now determining that the model could pose risks related to high-stakes misalignment or automated R&D that significantly exceed those of all models for which such risks have been publicly analyzed. The 30-day period is unchanged.',
    before: {
      quote: 'of determining that we have an internally deployed model that is in-scope (per the description above)',
      url: 'https://assets.claude.com/28c6241900d90410628a8a2003a5572faae4365a.pdf#page=11',
    },
    after: {
      quote: 'of determining that we have an internally deployed model that (1) could pose risks related to high-stakes misalignment or automated R&D that (2) significantly exceed',
      url: 'https://assets.claude.com/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf#page=11',
    },
    dimensions: ['triggers', 'transparency'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.3-3.4-01',
    transition: 'anthropic-rsp-3.3-3.4',
    kind: 'modified',
    section: '1. Our Recommendations for Industry-Wide Safety',
    summary: 'The Automated R&D threshold counted "dramatic acceleration" when progress was double the rate expected without significant AI contribution to AI R&D. It now compares progress with both that expected rate and the fastest rate of extended progress observed (a footnote defines extended as at least three model generations). The trend clause also changed from "could lead" to "seems likely to lead" to even greater acceleration.',
    before: {
      quote: 'compared to the rate we’d expect in the absence of significant AI contributions to AI R&D',
      url: 'https://assets.claude.com/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf#page=9',
    },
    after: {
      quote: 'compared to both the rate we’d expect and the fastest rate of extended progress',
      url: 'https://assets.claude.com/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=9',
    },
    dimensions: ['thresholds'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.3-3.4-02',
    transition: 'anthropic-rsp-3.3-3.4',
    kind: 'modified',
    section: '3.1. Scope and Timing',
    summary: "A Risk Report covered all publicly deployed models at the time of its publication, plus internally deployed models meeting the stated criteria. It now covers the risks of Anthropic's models and actions as of a coverage date no more than 30 days before publication, including internally deployed models as of that date that Anthropic has determined by publication to meet the criteria; a new footnote says a report may include more recent information but does not guarantee its completeness.",
    before: {
      quote: 'A Risk Report will cover all publicly deployed models at the time of its publication.',
      url: 'https://assets.claude.com/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf#page=11',
    },
    after: {
      quote: 'as of a given coverage date, which will be no more than 30 days prior to the publication of the report',
      url: 'https://assets.claude.com/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=11',
    },
    dimensions: ['transparency'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.3-3.4-03',
    transition: 'anthropic-rsp-3.3-3.4',
    kind: 'modified',
    section: '3.3. Contents',
    summary: 'For each in-scope model a Risk Report was to document the mitigations Anthropic is implementing across security, deployment safeguards and alignment. It now documents the mitigations Anthropic has implemented as of the coverage date.',
    before: {
      quote: 'For each in-scope model, the mitigations we are implementing across security, deployment safeguards, and alignment domains, along with discussion of their effectiveness.',
      url: 'https://assets.claude.com/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf#page=12',
    },
    after: {
      quote: 'For each in-scope model, the mitigations we have implemented as of the coverage date across security, deployment safeguards, and alignment domains',
      url: 'https://assets.claude.com/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=12',
    },
    dimensions: ['transparency'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.3-3.4-04',
    transition: 'anthropic-rsp-3.3-3.4',
    kind: 'added',
    section: '3.5. Publication and Redactions',
    summary: 'No sentence required Anthropic to disclose redactions made in the public version of a Risk Report. The new text says it will disclose the existence of each redaction and aim to give a brief justification, which will often be very high-level.',
    after: {
      quote: 'We will disclose the existence of each redaction made in the public version of the report and aim to give a brief justification',
      url: 'https://assets.claude.com/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=14',
    },
    dimensions: ['transparency'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.3-3.4-05',
    transition: 'anthropic-rsp-3.3-3.4',
    kind: 'added',
    section: '3.6.2. Timing and access',
    summary: 'The text on external review did not address dividing the review among reviewers. The new sentence requires every section of the Risk Report to go to at least one external reviewer and allows the review to be split among reviewers by subject expertise.',
    after: {
      quote: 'All sections of the Risk Report will be shared with at least one external reviewer, but we may choose to split the review process',
      url: 'https://assets.claude.com/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=15',
    },
    dimensions: ['external-review'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'anthropic-rsp-3.3-3.4-06',
    transition: 'anthropic-rsp-3.3-3.4',
    kind: 'modified',
    section: '4. Governance',
    summary: 'Final unredacted Risk Reports were shared with Anthropic regular-clearance staff. They are now shared with a large number of employees (at least 200), and minimally-redacted reports go to all regular-clearance staff.',
    before: {
      quote: 'We will share final, unredacted Risk Reports with Anthropic’s regular-clearance staff.',
      url: 'https://assets.claude.com/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf#page=16',
    },
    after: {
      quote: 'We will share final, unredacted Risk Reports with a large number of Anthropic employees (at least 200).',
      url: 'https://assets.claude.com/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf#page=16',
    },
    dimensions: ['transparency', 'reporting'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-01',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '1 Introduction',
    summary: 'The Beta text listed five key elements: tracking risk levels via evaluations in a Scorecard, seeking unknown unknowns, safety baselines, a Preparedness team and a Safety Advisory Group. Version 2 describes four steps (decide where to focus, measure capabilities, safeguard against severe harm, build trust) and says a holistic risk assessment decides which capability categories are tracked or researched.',
    before: {
      quote: 'requires proactive, science-based determinations of when and how it is safe to proceed with development and deployment.',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=2',
    },
    after: {
      quote: 'we use a holistic risk assessment to decide which frontier capability categories to track or research further',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=4',
    },
    dimensions: ['scope', 'thresholds'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-02',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '2.2 Tracked Categories',
    summary: 'The Beta text gave each tracked risk category a four-level scale (Low, Medium, High, Critical). Version 2 defines only High and Critical capability thresholds, with High meaning capabilities that significantly increase existing risk vectors for severe harm and Critical meaning a meaningful risk of a qualitatively new threat vector with no ready precedent.',
    before: {
      quote: 'Each of the Tracked Risk Categories comes with a gradation scale.',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=5',
    },
    after: {
      quote: 'High capability thresholds mean capabilities that significantly increase existing risk vectors for severe harm.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=5',
    },
    dimensions: ['thresholds'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-03',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '4.2 Safeguard sufficiency',
    summary: 'The Beta text allowed deployment only for models with a post-mitigation score of medium or below. Version 2 requires that covered systems reaching High capability have safeguards that sufficiently minimize the associated risk of severe harm before deployment.',
    before: {
      quote: 'Only models with a post-mitigation score of "medium" or below can be deployed.',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=21',
    },
    after: {
      quote: 'Covered systems that reach High capability must have safeguards that sufficiently minimize the associated risk of severe harm before they are deployed.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=12',
    },
    dimensions: ['go-no-go', 'deployment-safeguards', 'thresholds'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-04',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '4.2 Safeguard sufficiency',
    summary: 'The Beta text allowed further development only of models with a post-mitigation score of "high" or below. Version 2 states that systems reaching Critical capability also require safeguards that sufficiently minimize the associated risks during development, and Table 1 says "Until we have specified safeguards and security controls that would meet a Critical standard, halt further development".',
    before: {
      quote: 'Only models with a post-mitigation score of "high" or below can be developed further.',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=21',
    },
    after: {
      quote: 'Systems that reach Critical capability also require safeguards that sufficiently minimize associated risks during development.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=12',
    },
    dimensions: ['go-no-go', 'thresholds'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-05',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: 'Appendix C.3 Security controls',
    summary: 'The Beta text committed to harden security against exfiltration once pre-mitigation risk reached, or was forecasted to reach, "high". Version 2 Table 1 requires security controls meeting a High standard (Appendix C.3) for High capability, and Appendix C.3, in an appendix titled "Illustrative safeguards, controls, and efficacy assessments", lists practices it says it will require for High capability models.',
    before: {
      quote: 'we will ensure that our security is hardened in a way that is designed to prevent our mitigations and controls from being circumvented via exfiltration',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=20',
    },
    after: {
      quote: 'We will require the following practices for High capability models:',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=21',
    },
    dimensions: ['security'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-06',
    transition: 'openai-preparedness-beta-2',
    kind: 'added',
    section: '2.1 Holistic risk assessment and categorization',
    summary: 'Version 2 sets five criteria (plausible, measurable, severe, net new, instantaneous or irremediable) that a capability risk must meet to be a Tracked Category. The Beta text had no such criteria and named its four categories directly.',
    after: {
      quote: 'Plausible: It must be possible to identify a causal pathway for a severe harm in the capability area, enabled by frontier AI.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=5',
    },
    dimensions: ['scope'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-07',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '1 Introduction (footnote 1)',
    summary: 'The Beta text defined catastrophic risk as risk that could result in hundreds of billions of dollars in economic damage or the severe harm or death of many individuals, including existential risk. Version 2 defines severe harm as the death or grave injury of thousands of people or hundreds of billions of dollars of economic damage.',
    before: {
      quote: 'in hundreds of billions of dollars in economic damage or lead to the severe harm or death of many individuals',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=2',
    },
    after: {
      quote: 'we mean the death or grave injury of thousands of people or hundreds of billions of dollars of economic damage',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=2',
    },
    dimensions: ['scope', 'thresholds'],
    disclosure: 'not-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-08',
    transition: 'openai-preparedness-beta-2',
    kind: 'relocated',
    section: '2.3 Research Categories (Persuasion)',
    summary: "The Beta text tracked Persuasion as one of four risk categories with four levels. Version 2 states that Persuasion risks do not fit the framework's criteria and are handled through the Model Spec, usage policy prohibitions and misuse investigations.",
    before: {
      quote: 'Persuasion is focused on risks related to convincing people to change their beliefs (or act on) both static and interactive model-generated content.',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=10',
    },
    after: {
      quote: 'Persuasion category risks do not fit the criteria for inclusion.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=9',
    },
    movedTo: 'Outside the Preparedness Framework: Model Spec, usage policies and misuse investigations (Appendix A item 4, page 15)',
    dimensions: ['scope'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-09',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '2.3 Research Categories (Nuclear and Radiological)',
    summary: 'The Beta text covered chemical, biological, radiological and nuclear threats in one tracked category (CBRN). Version 2 tracks Biological and Chemical, and places Nuclear and Radiological in the Research Categories.',
    before: {
      quote: 'CBRN is focused on risks related to model-assisted creation of chemical, biological, radiological, and/or nuclear threats.',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=9',
    },
    after: {
      quote: 'Nuclear and Radiological capabilities are now a Research Category.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=9',
    },
    dimensions: ['scope', 'thresholds'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-10',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '2.2 Tracked Categories (AI Self-improvement)',
    summary: 'The Beta text had one Model autonomy category (autonomous replication, adaptation and AI R&D). Version 2 splits it: AI Self-improvement becomes a Tracked Category, and Long-range Autonomy and Autonomous Replication and Adaptation become Research Categories.',
    before: {
      quote: 'Model autonomy enables actors to run scaled misuse that can adapt to environmental changes and evade attempts to mitigate or shut down operations.',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=11',
    },
    after: {
      quote: 'are distinct aspects of what we formerly termed Model Autonomy.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=8',
    },
    dimensions: ['scope', 'thresholds'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-11',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '2.2 Tracked Categories (Table 1, Biological and Chemical)',
    summary: 'The Beta CBRN High level covered a model that enables an expert to develop a novel threat vector, or that gives assistance that enables anyone with basic training in a relevant field to create a CBRN threat. Version 2 sets the Biological and Chemical High threshold as meaningful counterfactual assistance, relative to 2021 baseline tools, that enables novice actors to create known biological or chemical threats.',
    before: {
      quote: 'model provides meaningfully improved assistance that enables anyone with basic training in a relevant field',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=9',
    },
    after: {
      quote: 'The model can provide meaningful counterfactual assistance (relative to unlimited access to baseline of tools available in 2021)',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=6',
    },
    dimensions: ['thresholds'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-12',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '2.2 Tracked Categories (Table 1, Cybersecurity)',
    summary: 'The Beta Cybersecurity levels set High as developing proofs-of-concept for high-value exploits against hardened targets without human intervention, and Critical as zero-day exploits of all severity levels across all software projects. Version 2 sets High as removing existing bottlenecks to scaling cyber operations, and Critical as zero-day exploits of all severity levels in many hardened real-world critical systems.',
    before: {
      quote: 'Tool-augmented model can identify and develop functional zero-day exploits of all severity levels, across all software projects, without human intervention',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=8',
    },
    after: {
      quote: 'A tool-augmented model can identify and develop functional zero-day exploits of all severity levels in many hardened real-world critical systems without human intervention',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=7',
    },
    dimensions: ['thresholds'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-13',
    transition: 'openai-preparedness-beta-2',
    kind: 'added',
    section: '2.3 Research Categories',
    summary: 'Version 2 introduces Research Categories (Long-range Autonomy, Sandbagging, Autonomous Replication and Adaptation, Undermining Safeguards, Nuclear and Radiological) with commitments to develop threat models and capability measurement, and a potential response for each.',
    after: {
      quote: 'We call these Research Categories, and in these areas we will take the following steps, both internally and in collaboration with external experts:',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=7',
    },
    dimensions: ['scope'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-14',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '3.1 Evaluation approach',
    summary: 'The Beta text ran evaluations on base models and on fine-tuned versions without mitigations. Version 2 describes elicitation by the highest-capability settings, a model variant with negligible safety refusals and the best available scaffolds, and defines Scalable Evaluations and Deep Dives.',
    before: {
      quote: 'but also on fine-tuned versions designed for the particular misuse vector without any mitigations in place',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=13',
    },
    after: {
      quote: 'Scalable Evaluations: automated evaluations designed to measure proxies that approximate whether a capability threshold has been crossed.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=9',
    },
    dimensions: ['methods'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-15',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '3.2 Testing scope',
    summary: 'The Beta text committed to running evaluations continually, before, during and after training, including whenever there is a more than 2x effective compute increase or a major algorithmic breakthrough. Version 2 applies the framework to new or updated deployments with a plausible chance of reaching a capability threshold not addressed by an existing Safeguards Report, and selects a development checkpoint to be covered when its forecasts and threat models justify it.',
    before: {
      quote: 'This would include whenever there is a >2x effective compute increase or major algorithmic breakthrough.',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=13',
    },
    after: {
      quote: 'applies to any new or updated deployment that has a plausible chance of reaching a capability threshold',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=10',
    },
    dimensions: ['triggers', 'scope'],
    disclosure: 'not-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-16',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '4.1 Safeguard selection',
    summary: 'The Beta text described mitigations as containment and deployment measures. Version 2 gives each capability threshold a class of risk-specific safeguard guidelines (Table 1) and separate safeguard types for malicious users and a misaligned model.',
    before: {
      quote: 'Our mitigation strategy will involve both containment measures, which help reduce risks related to possession of a frontier model',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=14',
    },
    after: {
      quote: 'Each capability threshold has a corresponding class of risk-specific safeguard guidelines under the Preparedness Framework.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=11',
    },
    dimensions: ['deployment-safeguards', 'security'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-17',
    transition: 'openai-preparedness-beta-2',
    kind: 'added',
    section: '3.3 Capability threshold determinations',
    summary: 'Version 2 requires results of Scalable Evaluations for every covered model to be compiled into a Capabilities Report submitted to the SAG, which decides next steps. The Beta text had the Scorecard and monthly Preparedness team reports instead (see separate entries).',
    after: {
      quote: 'compiled into a Capabilities Report that is submitted to the SAG.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=10',
    },
    dimensions: ['methods', 'governance'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-18',
    transition: 'openai-preparedness-beta-2',
    kind: 'added',
    section: '4.2 Safeguard sufficiency',
    summary: 'Version 2 requires the planned safeguards to be compiled into a Safeguards Report covering the ways severe harm can be realized, safeguard efficacy, residual risk and limitations, which the SAG assesses.',
    after: {
      quote: 'We compile the information on the planned safeguards needed to minimize the risk of severe harm into a Safeguards Report.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=11',
    },
    dimensions: ['deployment-safeguards', 'governance'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-19',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '4.1 Safeguard selection',
    summary: 'The Beta text ran the same evaluations on models after mitigations to verify post-mitigation risk. Version 2 identifies, for each safeguard, a method to measure its efficacy and an efficacy threshold.',
    before: {
      quote: 'we will also run evaluations on models after they have safety mitigations in place',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=14',
    },
    after: {
      quote: 'For each identified safeguard, we identify methods to measure their efficacy and an efficacy threshold.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=11',
    },
    dimensions: ['deployment-safeguards', 'methods'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-20',
    transition: 'openai-preparedness-beta-2',
    kind: 'removed',
    section: 'Accountability (Safety drills)',
    summary: 'The Beta text had the SAG call for safety drills at a recommended minimum yearly basis. Version 2 has no corresponding commitment.',
    before: {
      quote: 'the SAG will call for safety drills at a recommended minimum yearly basis',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=25',
    },
    dimensions: ['governance', 'reporting'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-21',
    transition: 'openai-preparedness-beta-2',
    kind: 'added',
    section: '4.3 Marginal risk',
    summary: "Version 2 states that if another developer releases a High or Critical capability system without comparable safeguards, OpenAI could adjust its required safeguards only if three conditions hold (no meaningful increase in overall risk, public acknowledgment, and safeguards kept more protective than the other developer's). The Beta text had no such provision.",
    after: {
      quote: 'we could adjust accordingly the level of safeguards that we require in that capability area, but only if:',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=13',
    },
    dimensions: ['go-no-go', 'deployment-safeguards', 'transparency'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-22',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: 'B Decision-making practices (Safety Advisory Group)',
    summary: 'The Beta text had the SAG provide perspectives on evidence of catastrophic risk and recommend actions. Version 2 also assigns it oversight of the design, implementation and adherence to the framework, assessment of capability levels and post-safeguard residual risk for each deployment, and recommendations on next steps.',
    before: {
      quote: 'provides a diversity of perspectives to evaluate the strength of evidence related to catastrophic risk and recommend appropriate actions',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=22',
    },
    after: {
      quote: 'Overseeing the effective design, implementation, and adherence to the Preparedness Framework in partnership with the safety organization leader',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=16',
    },
    dimensions: ['governance'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-23',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: 'B Decision-making practices (SAG Membership)',
    summary: 'The Beta text had the Leadership appoint SAG members in consultation with the Board of Directors. Version 2 says members and the Chair are appointed by OpenAI Leadership, without the consultation clause.',
    before: {
      quote: 'This will be done in consultation with the BoD, as is common for important roles in general.',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=22',
    },
    after: {
      quote: 'The members of the SAG and the SAG Chair are appointed by the OpenAI Leadership.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=16',
    },
    dimensions: ['governance'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-24',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: 'B Decision-making practices (OpenAI Leadership)',
    summary: 'The Beta text made Leadership the default decision-maker on all decisions. Version 2 lists Leadership responsibilities as all final decisions including accepting residual risks and deployment go/no-go decisions, and resourcing implementation of the framework.',
    before: {
      quote: 'serves as the default decision-maker on all decisions',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=23',
    },
    after: {
      quote: 'Making all final decisions, including accepting any residual risks and making deployment go/no-go decisions, informed by SAG’s recommendations.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=16',
    },
    dimensions: ['governance', 'go-no-go'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-25',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: 'B Decision-making practices (Board oversight)',
    summary: 'The Beta text gave the Board of Directors visibility into processes and the ability to review decisions and require reports, and said it would receive appropriate documentation without needing to proactively ask. Version 2 gives that visibility and review ability to the Safety and Security Committee of the Board and has no clause on documentation sent without being asked.',
    before: {
      quote: 'The BoD may review certain decisions taken and will receive appropriate documentation (i.e., without needing to proactively ask)',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=23',
    },
    after: {
      quote: 'The Safety and Security Committee (SSC) of the OpenAI Board of Directors (Board) will be given visibility into processes',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=16',
    },
    dimensions: ['governance', 'reporting'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-26',
    transition: 'openai-preparedness-beta-2',
    kind: 'removed',
    section: 'Operations (Preparedness team monthly report)',
    summary: 'The Beta text had the Preparedness team provide a monthly report to the SAG, Leadership and Board. Version 2 names no Preparedness team and no monthly report; evaluation results go into a Capabilities Report for covered deployments.',
    before: {
      quote: 'providing a monthly report (sent to the SAG, Leadership and BoD) synthesizing the above with any potential protective actions',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=23',
    },
    dimensions: ['reporting', 'governance'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-27',
    transition: 'openai-preparedness-beta-2',
    kind: 'removed',
    section: 'Scorecard',
    summary: 'The Beta text kept a Scorecard tracking pre-mitigation and post-mitigation risk for each tracked category. Version 2 contains no Scorecard.',
    before: {
      quote: 'we will maintain a dynamic (i.e., frequently updated) Scorecard that is designed to track our current pre-mitigation model risk',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=13',
    },
    dimensions: ['thresholds', 'transparency'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-28',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '2.1 Holistic risk assessment and categorization',
    summary: 'The Beta text committed to continually run a process to identify and analyze currently unknown categories of catastrophic risk as they emerge. Version 2 decides which capabilities to track through a holistic risk assessment and says it reviews and updates the Tracked Categories periodically or when it learns significant new information.',
    before: {
      quote: 'We will continually run a process for identification and analysis (as well as tracking) of currently unknown categories of catastrophic risk as they emerge',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=2',
    },
    after: {
      quote: 'We review and update Tracked Categories periodically or when we learn significant new information.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=5',
    },
    dimensions: ['scope'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-29',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '4 Safeguarding against severe harm',
    summary: 'The Beta text committed to forecasting, an internal "preparedness roadmap" and ongoing monitoring of misuse to get lead time on mitigations. Version 2 commits to start work on safeguards when a covered system appears likely to cross a capability threshold, uses forecasts to select development checkpoints and to treat models forecasted to reach Critical, and has no preparedness roadmap.',
    before: {
      quote: 'we will be investing in efforts that help create an internal “preparedness roadmap”',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=14',
    },
    after: {
      quote: 'If a covered system appears likely to cross a capability threshold, we will start to work on safeguards',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=11',
    },
    dimensions: ['triggers'],
    disclosure: 'not-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-30',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '5.2 Transparency and external participation',
    summary: 'The Beta text had Scorecard evaluations audited by qualified, independent third parties at a cadence set by the SAG. Version 2 says OpenAI will work with third parties to evaluate models independently when it deems a deployment warrants it and testing is available and feasible, and adds third-party stress testing of safeguards and independent expert opinions to the SAG.',
    before: {
      quote: 'Scorecard evaluations (and corresponding mitigations) will be audited by qualified, independent third-parties',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=25',
    },
    after: {
      quote: 'when available and feasible, OpenAI will work with third-parties to independently evaluate models.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=14',
    },
    dimensions: ['external-review'],
    disclosure: 'not-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-31',
    transition: 'openai-preparedness-beta-2',
    kind: 'added',
    section: '5.1 Internal governance',
    summary: 'Version 2 adds a noncompliance commitment: any employee can raise concerns via the Raising Concerns Policy, and OpenAI will track and investigate potential noncompliance and take corrective action where substantiated. The Beta text had no such provision.',
    after: {
      quote: 'Any employee can raise concerns about potential violations of this policy, or about its implementation, via our Raising Concerns Policy.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=13',
    },
    dimensions: ['reporting'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-32',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: '5.1 Internal governance (Internal Transparency)',
    summary: 'The Beta text said the Preparedness Framework, reports and decisions would be documented and visible to the Board and within OpenAI, with redactions as needed. Version 2 commits to document reports made to the SAG and the SAG decision and reasoning, and says employees may request and receive a summary of testing results and the SAG recommendation.',
    before: {
      quote: 'The Preparedness Framework, reports and decisions will be documented and visible to the BoD and within OpenAI',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=24',
    },
    after: {
      quote: 'Employees may also request and receive a summary of the testing results and SAG recommendation on capability levels and safeguards',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=13',
    },
    dimensions: ['reporting', 'governance'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-33',
    transition: 'openai-preparedness-beta-2',
    kind: 'added',
    section: '5.2 Transparency and external participation',
    summary: 'Version 2 commits to release information about framework results for major deployments, including scope of testing, capability evaluations and reasoning for the deployment decision, which may be redacted or summarized. The Beta text had no public disclosure commitment of this kind.',
    after: {
      quote: 'We will release information about our Preparedness Framework results in order to facilitate public awareness of the state of frontier AI capabilities for major deployments.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=13',
    },
    dimensions: ['transparency'],
    disclosure: 'not-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-34',
    transition: 'openai-preparedness-beta-2',
    kind: 'modified',
    section: 'B Decision-making practices (Updates to the Preparedness Framework)',
    summary: 'The Beta text had the Preparedness team or any team include a case for a change in its report, processed by the SAG. Version 2 has the SAG review proposed changes and adds a review and possible update at least once a year.',
    before: {
      quote: 'it will include a case for this change in its report.',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=23',
    },
    after: {
      quote: 'We will review and potentially update the Preparedness Framework for continued sufficiency at least once a year.',
      url: 'https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf#page=16',
    },
    dimensions: ['change', 'governance'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'openai-preparedness-beta-2-35',
    transition: 'openai-preparedness-beta-2',
    kind: 'removed',
    section: 'Accountability (External access)',
    summary: 'The Beta text committed to continue to enable external research and government access for model releases to increase the depth of red-teaming and testing. Version 2 has no corresponding sentence; Section 5.2 covers third-party evaluation and safeguard stress testing when OpenAI deems a deployment warrants it.',
    before: {
      quote: 'We will also continue to enable external research and government access for model releases to increase the depth of red-teaming',
      url: 'https://cdn.openai.com/openai-preparedness-framework-beta.pdf#page=25',
    },
    dimensions: ['external-review'],
    disclosure: 'not-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-01',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'added',
    section: '1.2 Critical Capability Levels and Tracked Capability Levels',
    summary: 'Version 3.0 sets out one kind of capability threshold, the Critical Capability Level (CCL). Version 3.1 adds a second kind, Tracked Capability Levels (TCLs), for risks that may manifest at a lower capability threshold than CCLs, for CBRN and for ML R&D and misalignment.',
    after: {
      quote: 'This update to the Framework introduces "Tracked Capability Levels (TCLs)."',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=4',
    },
    dimensions: ['thresholds', 'scope'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-02',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'added',
    section: '2.2.1 Chemical, Biological, Radiological or Nuclear',
    summary: 'Version 3.1 defines a CBRN Tracked Capability Level, set at material risk of CBRN attacks that could result in significant but not severe harm. Version 3.0 defines no CBRN threshold below the CBRN CCL.',
    after: {
      quote: 'resulting in material risk of CBRN attacks that could result in significant but not severe harm.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=11',
    },
    dimensions: ['thresholds', 'scope'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-03',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '1.3.5 Risk Acceptance Determination',
    summary: 'Version 3.0 lists the conditions under which a model that reaches a misuse CCL is deemed to pose an acceptable level of risk, introduced with "if, for example:". Version 3.1 applies them to a misuse T/CCL, speaks of an acceptable level of residual risk, and introduces them with "if:". The ML R&D CCL conditions change from "if, for example:" to "if:" in the same way.',
    before: {
      quote: 'indicates a misuse CCL has been reached will be deemed to pose an acceptable level of risk for further development or deployment, if, for example:',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=6',
    },
    after: {
      quote: 'indicates a misuse T/CCL has been reached will be deemed to pose an acceptable level of residual risk for further development or deployment, if:',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=7',
    },
    dimensions: ['go-no-go', 'deployment-safeguards'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-04',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '1.3.5 Risk Acceptance Determination',
    summary: 'Version 3.0 states that no explicit risk acceptance criteria are associated with the exploratory misalignment CCLs. Version 3.1 states acceptance conditions for the ML R&D and misalignment TCL: deployment mitigations have brought the residual risk of significant harm to an acceptable level, or the model is assessed as very unlikely to possess the propensities required for material risk of significant harm (required only for external and high-risk internal deployment); and the level of security applied is assessed as adequate.',
    before: {
      quote: 'we do not associate them with explicit risk acceptance criteria.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=7',
    },
    after: {
      quote: 'we assess that the model is very unlikely to possess the propensities that would be required for material risk',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=8',
    },
    dimensions: ['go-no-go', 'thresholds', 'security'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-05',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '3.2.1 Stealth and Situational Awareness Tracked Capability Level',
    summary: 'Version 3.0 describes, as illustrative, an automated monitor of chain-of-thought that "may be applied" in high-stakes internal deployments for Instrumental Reasoning Level 1. Version 3.1 recasts the level as the Stealth and Situational Awareness TCL, with periodic residual risk assessments, and states that additional safeguards, such as chain-of-thought monitoring, "will be applied" if residual risk from internal deployment is found unacceptable without them.',
    before: {
      quote: "monitoring system to detect illicit use of instrumental reasoning capabilities in a model's chain-of-thought may be applied in high-stakes internal deployments",
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=15',
    },
    after: {
      quote: '(such as chain-of-thought monitoring on high-risk deployments), these will be applied.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=14',
    },
    dimensions: ['thresholds', 'deployment-safeguards', 'methods'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-06',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'removed',
    section: 'Section 4: Misalignment (Exploratory Approach), Table 4.a',
    summary: 'Version 3.0 lists a second illustrative level, Instrumental Reasoning Level 2, defined as a model whose stealth and situational awareness leave the risk undetectable even with its outputs monitored, with mitigation shown as future work. Version 3.1 has no counterpart to this level or to the future-work row; its section 3.2 sets the Stealth and Situational Awareness TCL as a baseline and ML R&D CCLs as higher capability levels at which misalignment, misuse and structural risks are heightened.',
    before: {
      quote: 'even when relevant model outputs (including, e.g. scratchpads) are being monitored, we cannot detect or rule out the risk',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=15',
    },
    dimensions: ['thresholds'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-07',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: 'Overview and 1.2 (ML R&D and Misalignment risk domain)',
    summary: 'Version 3.0 treats ML R&D and misalignment as separate sets of CCLs, and describes misalignment scenarios as general-purpose AI agents that become difficult to control. Version 3.1 combines them into one ML R&D and Misalignment risk domain and describes scenarios where model misalignment may create the risk of significant or severe harm and where ML R&D capabilities may heighten misalignment, misuse and structural risks.',
    before: {
      quote: 'we address specific scenarios where general-purpose AI agents are potentially misaligned and can become difficult to control',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=2',
    },
    after: {
      quote: 'we address specific scenarios where model misalignment may create the risk of significant or severe harm',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=2',
    },
    dimensions: ['scope'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-08',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '1.3.2 Inherent Risk Assessment',
    summary: 'Version 3.0 says that for subsequent versions of a model it conducts a further risk assessment if the model has meaningful new capabilities or a material increase in performance, until the model is retired or a more capable model is deployed. Version 3.1 says that for external deployment of subsequent versions it determines whether a further critical capability assessment is required if (1) there are meaningful new capabilities or material increases in performance and (2) it believes such increase could materially undermine the justification for why the risks are acceptable.',
    before: {
      quote: 'if the model has meaningful new capabilities or a material increase in performance, until the model is retired or we deploy a more capable model',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=5',
    },
    after: {
      quote: '(2) we believe such material capability increase could materially undermine the justification for why the risks stemming from the model are acceptable.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=5',
    },
    dimensions: ['triggers'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-09',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'added',
    section: '1.3.2 Inherent Risk Assessment (footnote 4)',
    summary: 'Version 3.1 adds that a critical capability assessment may not be conducted for low-risk external deployments, such as to a small number of trusted testers, if the appropriate governance function finds the residual risk acceptable. Version 3.0 has no such exception.',
    after: {
      quote: 'A critical capability assessment may not be conducted for low-risk external deployments (e.g. to a small number of trusted testers)',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=5',
    },
    dimensions: ['triggers', 'go-no-go', 'governance'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-10',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '1.3.2 Inherent Risk Assessment',
    summary: 'Version 3.0 says model capability evaluations may be triggered, for example, upon the completion of a pre-training or post-training run. Version 3.1 says the lab conducts material capability change assessments on various checkpoints upon the completion of a post-training run, does not mention pre-training runs, and adds that these assessments may also be applied to models not on the frontier.',
    before: {
      quote: 'may be triggered, for example, upon the completion of a pre-training or post-training run, on various candidates of a model version',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=5',
    },
    after: {
      quote: 'we conduct material capability change assessments on various checkpoints upon the completion of a post-training run',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=5',
    },
    dimensions: ['triggers', 'methods'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-11',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '1.3.2 Inherent Risk Assessment (alert thresholds)',
    summary: 'Version 3.0 defines alert thresholds for its early warning evaluations, and says that for ML R&D the alert threshold may be defined from information about the progress of the lab rather than evaluation scores. Version 3.1 defines alert thresholds for CCLs, which may draw on evaluation results, expert assessments and other sources of information, and its ML R&D note no longer mentions alert thresholds.',
    before: {
      quote: 'our alert threshold may be defined based on these sources of information, rather than on evaluation scores.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=6',
    },
    after: {
      quote: 'For CCLs, we define "alert thresholds," which may draw on evaluation results, expert assessments, and other sources of information',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=5',
    },
    dimensions: ['thresholds', 'triggers'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-12',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '1.3.3 Risk Mitigation (response plans)',
    summary: 'Version 3.0 says that where capabilities remain quite distant from a CCL, a response plan may involve additional capability assessment processes. Version 3.1 says that where risks remain acceptable and capabilities distant from a CCL, the response plan may include updating the alert threshold to keep the safety buffer appropriate.',
    before: {
      quote: 'Where model capabilities remain quite distant from a CCL, a response plan may involve the adoption of additional capability assessment processes',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=6',
    },
    after: {
      quote: 'the response plan may include updating the alert threshold to ensure the safety buffer remains appropriate.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=6',
    },
    dimensions: ['triggers', 'thresholds'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-13',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'added',
    section: '1.3.2 Inherent Risk Assessment (post-market monitoring and incidents)',
    summary: 'Version 3.1 adds a statement that the lab strives to learn from post-market monitoring, including detection, mitigation, response and reporting of incidents in its frontier safety risk domains. Version 3.0 mentions post-market monitoring but does not refer to incidents in this section.',
    after: {
      quote: 'we strive to learn from our post-market monitoring mechanisms, including as part of our detection, mitigation, response and/or reporting of incidents',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=6',
    },
    dimensions: ['reporting', 'methods'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-14',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'added',
    section: '1.3.3 Risk Mitigation',
    summary: 'Version 3.1 adds that specific security and deployment mitigations may be determined when a T/CCL is reached, informed by the threat landscape at that time, because mitigations beyond the current frontier cannot always be anticipated. Version 3.0 does not say this.',
    after: {
      quote: 'the specific mitigations we implement may be determined when a T/CCL is reached, informed by the threat landscape at that time',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=6',
    },
    dimensions: ['deployment-safeguards', 'security'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-15',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '2.1.2 Deployment Mitigations (pre-deployment review)',
    summary: 'Version 3.0 conditions external deployment on the governance function finding the safety case adequate for each CCL reached. Version 3.1 conditions it on the governance function finding the residual risk acceptable, with a safety case included where a CCL has been reached, and applies the process to TCLs as well.',
    before: {
      quote: 'only after the appropriate governance function determines the safety case regarding each CCL the model has reached to be adequate',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=9',
    },
    after: {
      quote: 'only after the appropriate governance function determines the residual risk to be acceptable (including a safety case where a CCL has been reached)',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=10',
    },
    dimensions: ['go-no-go', 'governance', 'deployment-safeguards'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-16',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '2.1.2 Deployment Mitigations (residual risk assessment factors)',
    summary: 'Version 3.0 lists as the first factor of the assessment how much the risk has been reduced by mitigations, for example whether tests imply the risk is brought substantially lower than that of a model reaching the CCL without mitigations. Version 3.1 lists the effectiveness of the mitigations, for example whether tests imply that threat actors are unlikely to be able to circumvent safeguards.',
    before: {
      quote: 'the risk has been brought substantially lower than that posed by a model reaching the CCL without mitigations',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=8',
    },
    after: {
      quote: 'imply that threat actors are unlikely to be able to circumvent safeguards',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=10',
    },
    dimensions: ['deployment-safeguards', 'methods'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-17',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '2.1.1 Security Mitigations',
    summary: 'Version 3.0 describes security mitigations as protecting against exfiltration of model weights. Version 3.1 describes them as protecting against exfiltration or unauthorized modification of model weights.',
    before: {
      quote: 'Security mitigations against exfiltration risk, such as identity and access management practices and hardening interface-access to unreleased model parameters',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=8',
    },
    after: {
      quote: 'Security mitigations against exfiltration or unauthorized modification risk, such as identity and access management practices and hardening interface-access to unreleased model parameters',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=9',
    },
    dimensions: ['security'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-18',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'added',
    section: '2.1.1 Security Mitigations (Security Level 2+)',
    summary: 'Version 3.1 defines "Security Level 2+" as RAND Security Level 2 plus additional measures against insider threats and well-resourced non-state external actors, with example measures. Version 3.0 has no such level.',
    after: {
      quote: 'with additional security measures designed to address risks from insider threats and well-resourced non-state external actors',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=9',
    },
    dimensions: ['security'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-19',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '2.2 Misuse Capability Levels (recommended security levels)',
    summary: 'Version 3.0 recommends Security level 2 for the CBRN, cyber and harmful manipulation CCLs. Version 3.1 recommends Security level 2+ for each, and the CBRN rationale adds unauthorized modification to exfiltration and leak of weights.',
    before: {
      quote: 'Security level 2 Models able to greatly assist cyber attack might be of interest to well-resourced state actors.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=10',
    },
    after: {
      quote: 'Security level 2+ Models able to greatly assist cyber attack might be of interest to well-resourced state actors.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=12',
    },
    dimensions: ['security'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-20',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'added',
    section: '2.1.1 Security Mitigations (SAIF)',
    summary: "Version 3.1 states that the lab implements security mitigations using Google's Secure AI Framework (SAIF) and common security infrastructure, and describes SAIF. Version 3.0 does not mention SAIF.",
    after: {
      quote: "Using Google's Secure AI Framework (SAIF) and Google's common security infrastructure, we implement state-of-the-art security mitigations.",
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=9',
    },
    dimensions: ['security'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-21',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'added',
    section: '2.1.2 Deployment Mitigations (insider misuse)',
    summary: 'Version 3.1 states that the lab currently assesses insider-misuse risks from the misuse T/CCLs as addressed by baseline controls, so additional mitigations beyond them are not required at this stage. Version 3.0 has no such statement.',
    after: {
      quote: 'the risks of insider misuse posed by the misuse T/CCLs identified below are effectively addressed by our baseline controls',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=11',
    },
    dimensions: ['deployment-safeguards', 'security', 'scope'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-22',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '1.3.5 Risk Acceptance Determination (internal deployment scope for ML R&D CCLs)',
    summary: 'Version 3.0 requires the ML R&D deployment-mitigation condition for external and large scale internal deployment. Version 3.1 requires it for external and high-risk internal deployment, a term defined in the new Glossary as internal use with potential to enable severe threat scenarios.',
    before: {
      quote: 'This is required only for external deployment and large scale internal deployment, not further development.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=7',
    },
    after: {
      quote: 'This is required only for external deployment and high-risk internal deployment, not further development.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=7',
    },
    dimensions: ['go-no-go', 'scope', 'deployment-safeguards'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-23',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '3.2.2 ML R&D Critical Capability Levels (footnotes 12 and 13)',
    summary: 'Version 3.0 says Security level 3 for ML R&D acceleration level 1 may include mitigations aligned with SL 2, and Security level 4 mitigations aligned with SL 2 and 3. Version 3.1 says SL 2+ in both places.',
    before: {
      quote: 'This level may include mitigations aligned with SL 2, plus additional mitigations designed to prevent unilateral access, harden infrastructure, and prevent data exfiltration.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=13',
    },
    after: {
      quote: 'This level may include mitigations aligned with SL 2+, plus additional mitigations designed to prevent unilateral access, harden infrastructure, and prevent data exfiltration.',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=15',
    },
    dimensions: ['security'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-24',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'added',
    section: '4.1 Governance structure',
    summary: 'Version 3.1 adds a section stating that an internal governance structure with defined responsibilities and legal, compliance and safety reviews with escalation procedures is in place. Version 3.0 refers to "the appropriate governance function" without a section describing it.',
    after: {
      quote: 'We have in place a well-established and comprehensive internal governance structure designed to ensure the robust implementation of the processes outlined',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=16',
    },
    dimensions: ['governance'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-25',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'added',
    section: 'Glossary',
    summary: 'Version 3.1 adds a Glossary defining terms used in the Framework, including Frontier AI Models, TCLs, alert thresholds, material capability change assessments, external and internal deployments, and safety cases. Version 3.0 has no glossary.',
    after: {
      quote: 'Frontier AI Models or Models: are trained on a large data set, display significant generality',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=18',
    },
    dimensions: ['scope', 'thresholds'],
    disclosure: 'listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-26',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'added',
    section: 'Glossary (Frontier AI Models)',
    summary: 'Version 3.1 defines Frontier AI Models, including that their agentic and reasoning-based general capabilities near or exceed those of other Google models, and treats checkpoints and versions as the same model if their base capabilities stem primarily from the same foundational training run. Version 3.0 does not define frontier AI models.',
    after: {
      quote: "Frontier AI models' agentic and reasoning-based general capabilities near or exceed those of other Google models.",
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=18',
    },
    dimensions: ['scope'],
    disclosure: 'partly-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-27',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '5.1 Updates',
    summary: 'Version 3.0 says the Framework "will be updated at least once a year". Version 3.1 says it "will be reviewed at least once a year".',
    before: {
      quote: 'The Frontier Safety Framework will be updated at least once a year',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=16',
    },
    after: {
      quote: 'The Frontier Safety Framework will be reviewed at least once a year',
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=17',
    },
    dimensions: ['change'],
    disclosure: 'not-listed',
    verified: 'primary',
  },
  {
    id: 'deepmind-fsf-3.0-3.1-28',
    transition: 'deepmind-fsf-3.0-3.1',
    kind: 'modified',
    section: '5.1 Updates',
    summary: 'In Version 3.0 the periodic process assesses the Framework for "the management of systemic risk". In Version 3.1 it assesses the Framework for "the management of significant and severe risk".',
    before: {
      quote: "an assessment of the Framework's appropriateness for the management of systemic risk",
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf#page=16',
    },
    after: {
      quote: "an assessment of the Framework's appropriateness for the management of significant and severe risk",
      url: 'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf#page=17',
    },
    dimensions: ['change'],
    disclosure: 'not-listed',
    verified: 'primary',
  },
];

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
    if (v.labelSource !== undefined) checkSource(v.labelSource, `${at} label`);
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
    for (const s of t.noteSources ?? []) checkSource(s, at);
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
      labelSource: v.labelSource ?? null,
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
      noteSources: t.noteSources ?? [],
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
