// tool-incident-clock.ts: the data behind /toolkit/incident-clock. Everything
// here restates chapter 17 (bok/17-incidents.md): the severity scale ("A
// severity scale mapped to the clocks"), the four terms ("Incident, hazard,
// issue and serious incident"), the deployer duties ("Deployer duties: inform
// the provider, suspend use") and the rows of the clock table ("The overlapping
// clocks", as of 2026-09-24) for the regimes the tool computes: EU AI Act
// Art. 73, Art. 26(5) and Art. 55(1)(c) with the GPAI Code of Practice, GDPR
// Arts. 33 and 34, NIS2 Art. 23 and DORA Art. 19 with RTS 2025/301. The tool
// never asserts more than the chapter: where the chapter hedges, the text here
// hedges too, and the regimes the chapter lists without the tool computing them
// (CRA, SB 53, RAISE) are only pointed to.
//
// The client (public/toolkit/incident-clock.js) reads `incidentClockData()` from
// the page's JSON island; tests/toolkit-builders-b.spec.ts checks the day and
// hour counts against the chapter's table.

export const incidentClockAsOf = '2026-09-24';
export const incidentChapter = '/bok/incidents';

/** Headings of chapter 17 the tool links to (rehype-slug ids). */
export const incidentAnchors = {
  terms: 'incident-hazard-issue-and-serious-incident',
  severity: 'a-severity-scale-mapped-to-the-clocks',
  lifecycle: 'the-response-lifecycle',
  freeze: 'freeze-before-you-fix',
  deployer: 'deployer-duties-inform-the-provider-suspend-use',
  clocks: 'the-overlapping-clocks',
  reading: 'reading-the-table',
  oneRecord: 'one-record-many-reports',
  record: 'the-incident-record',
} as const;

export type SeverityId = 'SEV-1' | 'SEV-2' | 'SEV-3' | 'SEV-4' | 'ISSUE';

export interface SeverityLevel {
  id: SeverityId;
  name: string;
  /** The event class of the chapter's terms table. */
  eventClass: string;
  /** Harm test, as the chapter's scale states it. */
  harmTest: string;
  /** Default response, as the chapter's scale states it. */
  response: string;
  /** OECD severity value the incident-record schema carries (`severity`). */
  oecd: 'serious_incident' | 'incident' | 'hazard' | 'other';
}

/** The chapter's illustrative scale, most severe first. */
export const severityScale: readonly SeverityLevel[] = [
  {
    id: 'SEV-1',
    name: 'Critical',
    eventClass: 'Serious incident candidate (Art. 3(49))',
    harmTest:
      'Death; serious harm to health; serious and irreversible disruption of critical infrastructure; widespread infringement',
    response: 'Incident commander within 15 minutes; contain first; legal and DPO on the bridge',
    oecd: 'serious_incident',
  },
  {
    id: 'SEV-2',
    name: 'Major',
    eventClass: 'Serious incident candidate (Art. 3(49)) or a reportable breach',
    harmTest:
      'Infringement of fundamental-rights obligations; serious harm to property or environment; high-risk personal data breach; serious cybersecurity breach of a model',
    response: 'Same working day; reportability assessed per regime within hours',
    oecd: 'serious_incident',
  },
  {
    id: 'SEV-3',
    name: 'Moderate',
    eventClass: 'AI incident',
    harmTest: 'Realised harm that is limited, recoverable and below the serious thresholds',
    response: 'Contain same day; after-action review within five working days',
    oecd: 'incident',
  },
  {
    id: 'SEV-4',
    name: 'Near miss',
    eventClass: 'Near miss / AI hazard',
    harmTest: 'No harm; a plausible path to harm was interrupted',
    response: 'Weekly review; regression eval added',
    oecd: 'hazard',
  },
  {
    id: 'ISSUE',
    name: 'Issue',
    eventClass: 'Issue (no event)',
    harmTest: 'Defect or control weakness with no event',
    response: 'Issue log with owner and due date',
    oecd: 'other',
  },
];

/** Which day count of each regime a fact falls under. */
export type Art73Class = 'two-day' | 'death' | 'other';
export type GpaiClass = 'critical-infrastructure' | 'cyber' | 'death' | 'other';
export type HarmTypeValue =
  | 'physical'
  | 'psychological'
  | 'reputational'
  | 'economic_property'
  | 'environmental'
  | 'public_interest_critical_infrastructure'
  | 'human_or_fundamental_rights'
  | 'other';

export interface IncidentFact {
  id: string;
  /** Checkbox label: one reading of what happened. */
  label: string;
  severity: SeverityId;
  /** Art. 3(49) letter when the fact is one of the four serious-incident outcomes. */
  art349?: 'a' | 'b' | 'c' | 'd';
  /** Art. 73 day-count class when the fact can trigger Art. 73. */
  art73?: Art73Class;
  /** GPAI Code of Practice day-count class when the fact can trigger Art. 55(1)(c). */
  gpai?: GpaiClass;
  /** GDPR: a personal data breach (Art. 33), and a high-risk one (Art. 34). */
  gdpr?: 'breach' | 'high-risk-breach';
  /** Harm types for the incident-record skeleton (OECD vocabulary). */
  harmTypes: readonly HarmTypeValue[];
}

/** What happened: one checkbox per reading; the tool classifies up. */
export const incidentFacts: readonly IncidentFact[] = [
  {
    id: 'death',
    label: 'A person died',
    severity: 'SEV-1',
    art349: 'a',
    art73: 'death',
    gpai: 'death',
    harmTypes: ['physical'],
  },
  {
    id: 'health',
    label: "Serious harm to a person's health",
    severity: 'SEV-1',
    art349: 'a',
    art73: 'other',
    gpai: 'other',
    harmTypes: ['physical'],
  },
  {
    id: 'critical-infrastructure',
    label: 'Serious and irreversible disruption of the management or operation of critical infrastructure',
    severity: 'SEV-1',
    art349: 'b',
    art73: 'two-day',
    gpai: 'critical-infrastructure',
    harmTypes: ['public_interest_critical_infrastructure'],
  },
  {
    id: 'widespread',
    label:
      'Widespread infringement (Art. 3(61)): acts contrary to Union law that harm the collective interests of individuals across several Member States',
    severity: 'SEV-1',
    art73: 'two-day',
    gpai: 'other',
    harmTypes: ['human_or_fundamental_rights'],
  },
  {
    id: 'fundamental-rights',
    label: 'Infringement of obligations under Union law intended to protect fundamental rights',
    severity: 'SEV-2',
    art349: 'c',
    art73: 'other',
    gpai: 'other',
    harmTypes: ['human_or_fundamental_rights'],
  },
  {
    id: 'property',
    label: 'Serious harm to property',
    severity: 'SEV-2',
    art349: 'd',
    art73: 'other',
    gpai: 'other',
    harmTypes: ['economic_property'],
  },
  {
    id: 'environment',
    label: 'Serious harm to the environment',
    severity: 'SEV-2',
    art349: 'd',
    art73: 'other',
    gpai: 'other',
    harmTypes: ['environmental'],
  },
  {
    id: 'high-risk-breach',
    label: 'Personal data breach likely to result in a high risk to the people concerned',
    severity: 'SEV-2',
    gdpr: 'high-risk-breach',
    harmTypes: ['human_or_fundamental_rights'],
  },
  {
    id: 'model-cyber',
    label: 'Serious cybersecurity breach of a model, such as exfiltration of model weights',
    severity: 'SEV-2',
    gpai: 'cyber',
    harmTypes: ['other'],
  },
  {
    id: 'breach',
    label: 'Personal data breach (unless it is unlikely to result in a risk to people)',
    severity: 'SEV-3',
    gdpr: 'breach',
    harmTypes: ['human_or_fundamental_rights'],
  },
  {
    id: 'limited',
    label: 'Realised harm that is limited, recoverable and below the serious thresholds',
    severity: 'SEV-3',
    harmTypes: ['other'],
  },
  {
    id: 'near-miss',
    label: 'No harm: a control, or luck, interrupted a plausible path to harm',
    severity: 'SEV-4',
    harmTypes: ['other'],
  },
  {
    id: 'issue',
    label: 'No event: a defect, deviation or control weakness (an eval regressed, a drift alert)',
    severity: 'ISSUE',
    harmTypes: ['other'],
  },
];

/** Determinations each regime leaves to the organisation; the tool records them. */
export const incidentDeterminations = [
  {
    id: 'causal-link',
    label:
      'A causal link between the AI system and the event is established, or reasonably likely (EU AI Act Art. 73)',
  },
  {
    id: 'risk-79',
    label:
      'A deployer has reason to consider that using the system as instructed presents a risk within the meaning of Art. 79(1)',
  },
  { id: 'nis2-significant', label: 'Determined to be a significant incident under NIS2 Art. 23' },
  { id: 'dora-major', label: 'Classified as a major ICT-related incident under DORA' },
] as const;

export interface IncidentRole {
  id: string;
  label: string;
  hint?: string;
}

export const incidentRoles: readonly IncidentRole[] = [
  { id: 'provider', label: 'Provider of the AI system' },
  { id: 'deployer', label: 'Deployer of the AI system' },
  {
    id: 'gpai-provider',
    label: 'Provider of a general-purpose AI model with systemic risk involved in the event',
  },
  { id: 'controller', label: 'Controller of the personal data involved' },
  { id: 'processor', label: 'Processor of the personal data involved (for another controller)' },
  { id: 'nis2', label: 'Essential or important entity under NIS2' },
  { id: 'dora', label: 'Financial entity under DORA' },
];

export interface SystemTier {
  id: string;
  label: string;
  /** Date from which the high-risk regime applies after the Digital Omnibus
   *  postponed Chapter III, Sections 1 to 3 (Art. 113(c)): Art. 26(5) with it,
   *  and Art. 73 (Chapter IX, not itself postponed) in practice, since it reaches
   *  a system only once Art. 6 classifies it as high-risk (chapter 17, "Dates
   *  are moving"). */
  appliesFrom?: string;
}

export const systemTiers: readonly SystemTier[] = [
  { id: 'annex-iii', label: 'High-risk: an Annex III use case', appliesFrom: '2027-12-02' },
  {
    id: 'annex-i',
    label: 'High-risk: a product or safety component under Annex I',
    appliesFrom: '2028-08-02',
  },
  { id: 'not-high-risk', label: 'Not high-risk (limited or minimal risk under the AI Act)' },
  { id: 'not-assessed', label: 'Not classified yet' },
];

/** Extra facts about the system that change who reports or to whom. */
export const incidentConditions = [
  {
    id: 'provider-unreachable',
    label: 'We are the deployer and cannot reach the provider',
  },
  {
    id: 'equivalent-reporting',
    label:
      'The provider is already under equivalent Union reporting obligations for this Annex III system, or the system is AI in a medical device',
  },
  {
    id: 'ai-office',
    label:
      "The system falls under the AI Office's exclusive competence (Art. 75(1a), for example a system built on the provider's own GPAI model)",
  },
] as const;

/** Day and hour counts, exactly as the chapter's clock table states them. */
export const clockNumbers = {
  art73Days: { 'two-day': 2, death: 10, other: 15 },
  gpaiDays: { 'critical-infrastructure': 2, cyber: 5, death: 10, other: 15 },
  gpaiIntermediateWeeks: 4,
  gpaiFinalDaysAfterResolution: 60,
  gdprHours: 72,
  nis2EarlyWarningHours: 24,
  nis2NotificationHours: 72,
  nis2FinalMonths: 1,
  doraAfterClassificationHours: 4,
  doraAfterAwarenessHours: 24,
  doraIntermediateHours: 72,
  doraFinalMonths: 1,
} as const;

export type RegimeId =
  | 'ai_act_art73'
  | 'ai_act_art26_5'
  | 'ai_act_art55'
  | 'gdpr_art33'
  | 'gdpr_art34'
  | 'nis2_art23'
  | 'dora_art19';

export interface RegimeDef {
  id: RegimeId;
  /** Short label as the result table prints it. */
  label: string;
  /** Who reports, as the chapter's table says. */
  who: string;
  /** The trigger, as the chapter's table says. */
  trigger: string;
  /** First report, as the chapter's table says. */
  first: string;
  /** Follow-up and final, as the chapter's table says. */
  followUp: string;
  /** To whom, as the chapter's table says. */
  to: string;
  /** The incident-record schema's regime enum value for this clock. */
  recordRegime:
    | 'eu_ai_act_art_73'
    | 'eu_ai_act_art_55'
    | 'gdpr_personal_data_breach'
    | 'sector_regulator'
    | 'other';
  /** Number of the source in the page's list. */
  source: number;
  /** Further sources in the page's list that the row also rests on. */
  extraSources?: readonly number[];
}

export const regimes: readonly RegimeDef[] = [
  {
    id: 'ai_act_art73',
    label: 'EU AI Act Art. 73',
    who: 'Provider of a high-risk system; the deployer if the provider cannot be reached',
    trigger: 'Serious incident (Art. 3(49))',
    first:
      'Immediately on a causal link or its reasonable likelihood; no later than 2 days (widespread infringement or critical infrastructure), 10 days (death) or 15 days (other) from awareness; an incomplete initial report is allowed',
    followUp:
      'Investigation, risk assessment and corrective action; no altering the system before informing authorities',
    to: 'Market-surveillance authority where it occurred; the AI Office for systems under its competence',
    recordRegime: 'eu_ai_act_art_73',
    source: 2,
  },
  {
    id: 'ai_act_art26_5',
    label: 'EU AI Act Art. 26(5)',
    who: 'Deployer of a high-risk system',
    trigger: 'Serious incident; or reason to consider the system presents a risk',
    first:
      'Serious incident: immediately, provider first; risk: without undue delay, plus suspension',
    followUp: "Cooperation with the provider's investigation",
    to: 'Provider, then importer or distributor, and the market-surveillance authority',
    recordRegime: 'eu_ai_act_art_73',
    source: 2,
  },
  {
    id: 'ai_act_art55',
    label: 'EU AI Act Art. 55(1)(c) with Code of Practice Commitment 9',
    who: 'Provider of a GPAI model with systemic risk',
    trigger: 'Serious incident involving the model',
    first:
      'Without undue delay; under the Code: 2 days (critical infrastructure), 5 days (serious cybersecurity breach), 10 days (death), 15 days (health, rights, property, environment)',
    followUp:
      'Intermediate report at least every four weeks while unresolved; final report within 60 days of resolution',
    to: 'AI Office and, as applicable, national authorities',
    recordRegime: 'eu_ai_act_art_55',
    source: 3,
  },
  {
    id: 'gdpr_art33',
    label: 'GDPR Art. 33',
    who: 'Controller (the processor notifies the controller without undue delay)',
    trigger: 'Personal data breach, unless unlikely to result in a risk',
    first:
      'Without undue delay and, where feasible, within 72 hours of awareness; reasons required if later',
    followUp: 'Information may be provided in phases; every breach documented',
    to: 'Supervisory authority',
    recordRegime: 'gdpr_personal_data_breach',
    source: 4,
  },
  {
    id: 'gdpr_art34',
    label: 'GDPR Art. 34',
    who: 'Controller',
    trigger: 'Breach likely to result in a high risk',
    first: 'Without undue delay',
    followUp: 'None set',
    to: 'Affected data subjects',
    recordRegime: 'gdpr_personal_data_breach',
    source: 4,
  },
  {
    id: 'nis2_art23',
    label: 'NIS2 Art. 23',
    who: 'Essential and important entities',
    trigger: 'Significant incident',
    first: 'Early warning within 24 hours; incident notification within 72 hours',
    followUp: 'Intermediate report on request; final report within one month of the notification',
    to: 'CSIRT or competent authority',
    recordRegime: 'other',
    source: 5,
  },
  {
    id: 'dora_art19',
    label: 'DORA Art. 19 with RTS 2025/301',
    who: 'Financial entities',
    trigger: 'Major ICT-related incident',
    first:
      'Within 4 hours of classification as major, and no later than 24 hours from awareness; if classified as major only after those 24 hours, within 4 hours of that classification',
    followUp:
      'Intermediate within 72 hours of the initial notification; final within one month of the latest intermediate report',
    to: 'Financial competent authority',
    recordRegime: 'sector_regulator',
    // DORA Art. 19 sets the duty; the time limits are RTS 2025/301 Art. 5.
    source: 7,
    extraSources: [6],
  },
];

/** Regimes the chapter's table lists that this tool does not compute. */
export const regimesNotComputed = [
  'Cyber Resilience Act Art. 14',
  'California SB 53',
  'New York RAISE Act',
  'OECD common reporting framework (voluntary, no clock)',
] as const;

/** The fixed hedge on the clocks, shown on the page and in every export. */
export const clockCaveat =
  "Verify every clock with counsel or the competent authority before relying on it. The tool adds the chapter's hours, days or months to the awareness time and shows the earliest reading; it does not apply rules for counting periods, weekends or public holidays, and it does not decide whether an event is reportable.";

/** Everything the client needs, as data (no markup). */
export function incidentClockData(siteUrl: string, notice: string, license: string) {
  return {
    version: 1,
    asOf: incidentClockAsOf,
    notice,
    caveat: clockCaveat,
    page: `${siteUrl}/toolkit/incident-clock`,
    chapter: `${siteUrl}${incidentChapter}`,
    anchors: incidentAnchors,
    license,
    schema: `${siteUrl}/schemas/incident-record.v1.json`,
    severity: severityScale,
    facts: incidentFacts,
    determinations: incidentDeterminations,
    roles: incidentRoles,
    tiers: systemTiers,
    conditions: incidentConditions,
    numbers: clockNumbers,
    regimes,
    notComputed: regimesNotComputed,
  };
}
