// csa-aicm.ts: the control ids of the Cloud Security Alliance AI Controls Matrix (AICM)
// v1.1 and the 18 domains they sit in. Ids and domain names only: the control titles and
// text are not copied because the matrix page states no licence.
//
// PROVENANCE. Read on 2026-11-28 from the public page
// https://cloudsecurityalliance.org/artifacts/aicmv1-1-implementation-guidelines-for-model-providers-mp
// (AICM v1.1 implementation guidelines for model providers). The page lists every control id
// ("CODE-NN") under its domain heading ("CODE: Name"); 247 ids in 18 domains, matching the
// 247 control objectives the v1.1 artifact page
// (https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1) states. Each row carries
// `verified` because the id was read on that page. AICM changes between versions; rebuild this
// list from the page, with a new date, before mapping to a newer version.
export type AicmDomainCode = 'A&A' | 'AIS' | 'BCR' | 'CCC' | 'CEK' | 'DCS' | 'DSP' | 'GRC' | 'HRS' | 'I&S' | 'IAM' | 'IPY' | 'LOG' | 'MDS' | 'SEF' | 'STA' | 'TVM' | 'UEM';

export interface AicmControl {
  /** "IAM-07": domain code, hyphen, two digits. */
  id: string;
  domain: AicmDomainCode;
  domainName: string;
  /** The public page the id was read on. */
  url: string;
  /** YYYY-MM-DD the id was read on that page. */
  verified: string;
}

/** The page the rows were read from, and when. */
export const AICM_V11_AS_OF = {
  url: 'https://cloudsecurityalliance.org/artifacts/aicmv1-1-implementation-guidelines-for-model-providers-mp',
  read: '2026-11-28',
} as const;

export const aicmV11Domains: Readonly<Record<AicmDomainCode, string>> = {
  'A&A': 'Audit & Assurance',
  'AIS': 'Application & Interface Security',
  'BCR': 'Business Continuity Management and Operational Resilience',
  'CCC': 'Change Control and Configuration Management',
  'CEK': 'Cryptography, Encryption & Key Management',
  'DCS': 'Datacenter Security',
  'DSP': 'Data Security and Privacy Lifecycle Management',
  'GRC': 'Governance, Risk and Compliance',
  'HRS': 'Human Resources',
  'I&S': 'Infrastructure Security',
  'IAM': 'Identity & Access Management',
  'IPY': 'Interoperability & Portability',
  'LOG': 'Logging and Monitoring',
  'MDS': 'Model Security',
  'SEF': 'Security Incident Management, E-Discovery, & Cloud Forensics',
  'STA': 'Supply Chain Management, Transparency, and Accountability',
  'TVM': 'Threat & Vulnerability Management',
  'UEM': 'Universal Endpoint Management',
};

const rows: [AicmDomainCode, number][] = [
  ['A&A', 6],
  ['AIS', 15],
  ['BCR', 11],
  ['CCC', 9],
  ['CEK', 21],
  ['DCS', 18],
  ['DSP', 24],
  ['GRC', 15],
  ['HRS', 15],
  ['I&S', 9],
  ['IAM', 18],
  ['IPY', 4],
  ['LOG', 16],
  ['MDS', 13],
  ['SEF', 10],
  ['STA', 16],
  ['TVM', 13],
  ['UEM', 14],
];

/** Ids run CODE-01 to CODE-NN in each domain (checked against the page when written). */
export const aicmV11Controls: readonly AicmControl[] = rows.flatMap(([domain, n]) =>
  Array.from({ length: n }, (_, i) => ({
    id: `${domain}-${String(i + 1).padStart(2, '0')}`,
    domain,
    domainName: aicmV11Domains[domain],
    url: AICM_V11_AS_OF.url,
    verified: AICM_V11_AS_OF.read,
  })),
);

export const aicmV11ControlById = (id: string): AicmControl | undefined => aicmV11Controls.find((c) => c.id === id);
