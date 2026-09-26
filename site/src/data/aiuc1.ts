// aiuc1.ts: the public index of AIUC-1 requirements, the only ids the open
// control profiles may map to (src/data/controls, mappings.aiuc1; checked by
// controlProblems()).
//
// PROVENANCE. Every row was read on 2026-09-26 from the public index
// https://standard.aiuc-1.com/llms.txt: id, title and the page of the
// requirement (the `.md` suffix of the index link dropped, which gives the
// public HTML page). A row carries `verified` when its own public page was
// also opened on that date and showed the same id and title; that is the case
// for every id a profile maps to. The index marks E007 and E014 "[Retired]":
// they are kept here with `retired: true` so they are never mapped, and the
// validator rejects them. AIUC-1 changes over time; rebuild this list from the
// index, with a new date, before mapping a new id.
//
// AIUC-1 is a standard of the Artificial Intelligence Underwriting Company.
// This site has no affiliation with AIUC; a mapping here is this site's
// reading, not an AIUC-1 certificate, audit or endorsement.
export type Aiuc1Domain = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface Aiuc1Requirement {
  /** "B006": domain letter and three digits. */
  id: string;
  /** The title as the public index prints it (without the "[Retired]" tag). */
  title: string;
  domain: Aiuc1Domain;
  /** The requirement's public page. */
  url: string;
  /** The index marks it retired: never mapped. */
  retired?: true;
  /** YYYY-MM-DD the requirement's own page was opened and matched. */
  verified?: string;
}

/** The public index the rows were read from, and when. */
export const AIUC1_INDEX = {
  url: 'https://standard.aiuc-1.com/llms.txt',
  read: '2026-09-26',
} as const;

/** The six domains, as the public index names them. */
export const aiuc1Domains: Readonly<Record<Aiuc1Domain, string>> = {
  A: 'Data & Privacy',
  B: 'Security',
  C: 'Safety',
  D: 'Reliability',
  E: 'Accountability',
  F: 'Society',
};

export const aiuc1Requirements: readonly Aiuc1Requirement[] = [
  { id: 'A001', title: 'Establish input data policy', domain: 'A', url: 'https://standard.aiuc-1.com/data-and-privacy/establish-data-use-policy' },
  { id: 'A002', title: 'Establish output data policy', domain: 'A', url: 'https://standard.aiuc-1.com/data-and-privacy/define-output-rights' },
  { id: 'A003', title: 'Limit AI agent data access', domain: 'A', url: 'https://standard.aiuc-1.com/data-and-privacy/implement-contextual-data-safeguards' },
  { id: 'A004', title: 'Protect IP & trade secrets', domain: 'A', url: 'https://standard.aiuc-1.com/data-and-privacy/protect-ip-trade-secrets' },
  { id: 'A005', title: 'Prevent cross-customer data exposure', domain: 'A', url: 'https://standard.aiuc-1.com/data-and-privacy/prevent-cross-customer-data-exposure' },
  { id: 'A006', title: 'Prevent PII leakage', domain: 'A', url: 'https://standard.aiuc-1.com/data-and-privacy/prevent-pii-leakage', verified: '2026-09-26' },
  { id: 'A007', title: 'Prevent IP violations', domain: 'A', url: 'https://standard.aiuc-1.com/data-and-privacy/prevent-ip-violations' },
  { id: 'A008', title: 'Prevent leakage of credentials and secrets', domain: 'A', url: 'https://standard.aiuc-1.com/data-and-privacy/prevent-secrets-leakage', verified: '2026-09-26' },
  { id: 'B001', title: 'Third-party testing of adversarial robustness', domain: 'B', url: 'https://standard.aiuc-1.com/security/test-adversarial-robustness' },
  { id: 'B002', title: 'Detect adversarial input', domain: 'B', url: 'https://standard.aiuc-1.com/security/detect-adversarial-input' },
  { id: 'B003', title: 'Manage public release of technical details', domain: 'B', url: 'https://standard.aiuc-1.com/security/limit-technical-over-disclosure' },
  { id: 'B004', title: 'Prevent AI endpoint scraping', domain: 'B', url: 'https://standard.aiuc-1.com/security/prevent-ai-endpoint-scraping' },
  { id: 'B005', title: 'Implement real-time input filtering', domain: 'B', url: 'https://standard.aiuc-1.com/security/implement-real-time-input-filtering' },
  { id: 'B006', title: 'Prevent unauthorized AI agent actions', domain: 'B', url: 'https://standard.aiuc-1.com/security/enforce-contextual-access-controls', verified: '2026-09-26' },
  { id: 'B007', title: 'Enforce user access privileges to AI systems', domain: 'B', url: 'https://standard.aiuc-1.com/security/enforce-ai-access-privileges' },
  { id: 'B008', title: 'Protect AI system deployment environment', domain: 'B', url: 'https://standard.aiuc-1.com/security/protect-model-deployment-environment' },
  { id: 'B009', title: 'Limit output over-exposure', domain: 'B', url: 'https://standard.aiuc-1.com/security/limit-output-over-exposure' },
  { id: 'B010', title: 'Promote secure patterns in generated code', domain: 'B', url: 'https://standard.aiuc-1.com/security/promote-secure-code-patterns' },
  { id: 'C001', title: 'Define AI risk taxonomy', domain: 'C', url: 'https://standard.aiuc-1.com/safety/define-ai-risk-taxonomy' },
  { id: 'C002', title: 'Conduct pre-deployment testing', domain: 'C', url: 'https://standard.aiuc-1.com/safety/conduct-pre-deployment-testing', verified: '2026-09-26' },
  { id: 'C003', title: 'Prevent harmful outputs', domain: 'C', url: 'https://standard.aiuc-1.com/safety/prevent-harmful-outputs' },
  { id: 'C004', title: 'Prevent out-of-scope outputs', domain: 'C', url: 'https://standard.aiuc-1.com/safety/prevent-out-of-scope-outputs' },
  { id: 'C005', title: 'Prevent agent-specific high risk outputs', domain: 'C', url: 'https://standard.aiuc-1.com/safety/prevent-other-high-risk-outputs' },
  { id: 'C006', title: 'Prevent output vulnerabilities', domain: 'C', url: 'https://standard.aiuc-1.com/safety/prevent-output-vulnerabilities' },
  { id: 'C007', title: 'Flag high risk outputs for human review', domain: 'C', url: 'https://standard.aiuc-1.com/safety/flag-high-risk-recommendations' },
  { id: 'C008', title: 'Monitor AI risk categories', domain: 'C', url: 'https://standard.aiuc-1.com/safety/monitor-ai-risk-categories' },
  { id: 'C009', title: 'Enable real-time feedback and intervention', domain: 'C', url: 'https://standard.aiuc-1.com/safety/collect-real-time-feedback' },
  { id: 'C010', title: 'Third-party testing for harmful outputs', domain: 'C', url: 'https://standard.aiuc-1.com/safety/3rd-party-testing-for-harmful-outputs' },
  { id: 'C011', title: 'Third-party testing for out-of-scope outputs', domain: 'C', url: 'https://standard.aiuc-1.com/safety/3rd-party-testing-for-out-of-scope-outputs' },
  { id: 'C012', title: 'Third-party testing for customer-defined risk', domain: 'C', url: 'https://standard.aiuc-1.com/safety/3rd-party-testing-for-other-risk' },
  { id: 'D001', title: 'Prevent hallucinated outputs', domain: 'D', url: 'https://standard.aiuc-1.com/reliability/prevent-hallucinated-outputs' },
  { id: 'D002', title: 'Third-party testing for hallucinations', domain: 'D', url: 'https://standard.aiuc-1.com/reliability/3rd-party-testing-for-hallucinations' },
  { id: 'D003', title: 'Restrict unsafe tool calls', domain: 'D', url: 'https://standard.aiuc-1.com/reliability/restrict-unsafe-tool-calls', verified: '2026-09-26' },
  { id: 'D004', title: 'Third-party testing of tool calls', domain: 'D', url: 'https://standard.aiuc-1.com/reliability/3rd-party-testing-of-tool-calls' },
  { id: 'E001', title: 'AI failure plan for security breaches', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/ai-failure-plan-for-security-breaches' },
  { id: 'E002', title: 'AI failure plan for harmful outputs', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/ai-failure-plan-for-harmful-outputs' },
  { id: 'E003', title: 'AI failure plan for hallucinations', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/ai-failure-plan-for-hallucinations' },
  { id: 'E004', title: 'Assign accountability', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/assign-accountability', verified: '2026-09-26' },
  { id: 'E005', title: 'Document data storage security', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/assess-cloud-vs-on-prem-processing' },
  { id: 'E006', title: 'Conduct vendor due diligence', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/conduct-vendor-due-diligence' },
  { id: 'E007', title: 'Document system change approvals', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/document-system-change-approvals', retired: true },
  { id: 'E008', title: 'Review internal processes', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/review-internal-processes', verified: '2026-09-26' },
  { id: 'E009', title: 'Monitor third-party access', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/monitor-3rd-party-access' },
  { id: 'E010', title: 'Establish AI acceptable use policy', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/establish-ai-acceptable-use-policy' },
  { id: 'E011', title: 'Record processing locations', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/record-processing-locations' },
  { id: 'E012', title: 'Document regulatory compliance', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/document-regulatory-compliance' },
  { id: 'E013', title: 'Implement quality management system', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/implement-quality-management-system' },
  { id: 'E014', title: 'Share transparency reports', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/share-transparency-reports', retired: true },
  { id: 'E015', title: 'Log AI system activity', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/log-model-activity', verified: '2026-09-26' },
  { id: 'E016', title: 'Implement AI disclosure mechanisms', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/implement-ai-disclosure-mechanisms', verified: '2026-09-26' },
  { id: 'E017', title: 'Document system transparency policy', domain: 'E', url: 'https://standard.aiuc-1.com/accountability/document-system-transparency-policy' },
  { id: 'F001', title: 'Prevent AI cyber misuse', domain: 'F', url: 'https://standard.aiuc-1.com/society/prevent-ai-cyber-misuse' },
  { id: 'F002', title: 'Prevent catastrophic misuse', domain: 'F', url: 'https://standard.aiuc-1.com/society/prevent-catastrophic-misuse' },
];

/** The requirement with this id, retired or not, if the index lists it. */
export function aiuc1ById(id: string): Aiuc1Requirement | undefined {
  return aiuc1Requirements.find((r) => r.id === id);
}
