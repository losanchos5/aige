// obligation-aliases.ts: the names readers type for an instrument in the
// "Look up an article" box (/obligations, /resources/crosswalk). The lookup
// index (src/pages/obligations/lookup.json.ts) adds, for every instrument, its
// id with dashes as spaces and its `short` name; this list only carries what
// those two miss: acronyms, bare standard numbers and the Spanish, French and
// German names. Generic words ("act", "code", "law") never appear alone, so an
// alias cannot swallow a clause. Keys must be framework ids known to
// frameworks.ts or the crosswalk (checked by tests/obligation-lookup.spec.ts).

export const instrumentAliases: Readonly<Record<string, readonly string[]>> = {
  'eu-ai-act': [
    'ai act',
    'aia',
    'eu aia',
    'euaia',
    'eu ai regulation',
    'regulation 2024/1689',
    '2024/1689',
    'reglamento ia',
    'reglamento de ia',
    'rgia',
    'ley de ia',
    'ki verordnung',
  ],
  'gpai-code-of-practice': ['gpai code of practice', 'gpai cop', 'code of practice'],
  gdpr: ['rgpd', 'dsgvo', 'gdpr eu', '2016/679'],
  'eu-nis2': ['nis 2'],
  'iso-42001': ['42001', 'iso iec 42001'],
  'iso-42005': ['42005', 'iso iec 42005'],
  'iso-42006': ['42006', 'iso iec 42006'],
  'iso-23894': ['23894', 'iso iec 23894'],
  'iso-22989': ['22989', 'iso iec 22989'],
  'nist-ai-rmf': ['nist', 'ai rmf', 'rmf', 'nist rmf', 'nist ai 100 1'],
  'nist-ai-600-1': ['600 1', 'nist 600 1', 'genai profile'],
  'nist-ai-800-1': ['800 1', 'nist 800 1'],
  'ca-sb-53': ['sb 53', 'tfaia'],
  'ny-raise-act': ['raise act'],
  'nyc-ll-144': ['ll 144', 'local law 144', 'aedt'],
  'co-ai-act': ['colorado ai act', 'sb 24 205', 'sb 26 189'],
  'tx-traiga': ['traiga'],
  'kr-ai-basic-act': ['korea', 'korea ai basic act', 'ai basic act'],
  'cn-pipl': ['pipl'],
  'cn-tc260-framework': ['tc260'],
  'br-lgpd': ['lgpd'],
  'canada-dadm': ['dadm'],
  'coe-cets-225': ['coe', 'council of europe', 'cets 225', 'framework convention'],
  'oecd-ai-principles': ['oecd'],
  'g7-hiroshima-coc': ['g7', 'hiroshima', 'hiroshima code'],
  'us-gao-ai-accountability': ['gao', 'gao 21 519sp'],
  'uk-atrs': ['atrs'],
  'sg-ai-verify': ['aiverify'],
  'sg-agentic-framework': ['imda agentic', 'agentic ai framework'],
  'pren-18228': ['18228'],
  'pren-18229-1': ['18229', '18229 1'],
  'en-18286': ['18286'],
};
