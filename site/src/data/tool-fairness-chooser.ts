// tool-fairness-chooser.ts: the data behind /toolkit/fairness-metric-chooser.
// A decision tree over the questions chapter 16 (bok/16-fairness-explainability.md)
// says decide the metric: the harm type (allocation, quality of service,
// stereotyping), whether a trustworthy ground-truth label exists, which error
// costs more, and the legal frame. Every metric family, secondary check,
// warning and legal note restates a section of the chapter and links to it;
// the tree is the tool's reading of the chapter's table "Choosing a fairness
// metric by use case", which the chapter itself calls a starting point, not a
// rule. Nothing here is legal advice.

export const fairnessChapter = '/bok/fairness-and-explainability';

/** Headings of chapter 16 the tool links to (rehype-slug ids). */
export const fairnessAnchors = {
  sources: 'where-bias-enters-the-lifecycle',
  protected: 'protected-characteristics-proxies-and-the-data-you-need-to-test',
  doctrines: 'disparate-treatment-and-disparate-impact',
  fourFifths: 'the-four-fifths-rule-and-the-adverse-impact-ratio',
  metrics: 'group-fairness-metrics',
  counterfactual: 'individual-and-counterfactual-fairness',
  impossibility: 'the-impossibility-results',
  intersectional: 'intersectional-and-subgroup-testing',
  choosing: 'choosing-a-fairness-metric-by-use-case',
  mitigation: 'mitigation-before-during-and-after-training',
  monitoring: 'monitoring-fairness-in-production',
} as const;

export type FairnessAnchor = keyof typeof fairnessAnchors;

export interface ChoiceOption {
  id: string;
  label: string;
  hint?: string;
}

export interface TreeQuestion {
  id: 'harm' | 'truth' | 'error' | 'frame' | 'attribute';
  legend: string;
  hint: string;
  anchor: FairnessAnchor;
  options: readonly ChoiceOption[];
  /** Only asked for allocation harms. */
  allocationOnly?: boolean;
}

export const treeQuestions: readonly TreeQuestion[] = [
  {
    id: 'harm',
    legend: 'What does the system do to people?',
    hint: 'The metric follows the harm, and the harm follows the use case.',
    anchor: 'choosing',
    options: [
      {
        id: 'allocation',
        label: 'It extends or withholds an opportunity, a resource or information',
        hint: 'Allocation harm: hiring, credit, benefits, triage.',
      },
      {
        id: 'quality',
        label: 'It works less well for some people, even when nothing is withheld',
        hint: 'Quality-of-service harm: speech, vision, document search.',
      },
      {
        id: 'generative',
        label: 'It generates text, images or answers that people read or act on',
        hint: 'Quality of service and stereotyping: a generative assistant.',
      },
    ],
  },
  {
    id: 'truth',
    legend: 'Is there a trustworthy ground-truth label?',
    hint: 'Error-rate metrics compare predictions with the true outcome. A label that stands in for the real target passes every accuracy test and still carries measurement bias.',
    anchor: 'sources',
    options: [
      { id: 'labels', label: 'Yes: the true outcome is recorded and measures what the decision is about' },
      {
        id: 'proxy',
        label: 'There is a label, but it may stand in for the real target',
        hint: 'For example health-care cost recorded in place of health need.',
      },
      { id: 'none', label: 'No reliable label yet: outcomes arrive late, or never' },
    ],
  },
  {
    id: 'error',
    legend: 'Which error costs more?',
    hint: "Take it from the use-case record's error appetite, not from which metric the model passes.",
    anchor: 'choosing',
    allocationOnly: true,
    options: [
      { id: 'miss', label: 'Missing a qualified or eligible person (a false negative)' },
      {
        id: 'wrongful',
        label: 'Wrongly selecting, flagging, cutting or reclaiming (a false positive)',
        hint: 'Often punitive: reclaiming a benefit, a fraud flag.',
      },
      { id: 'both', label: 'Both errors are costly' },
      {
        id: 'action',
        label: 'A positive decision triggers an action whose value depends on being right',
        hint: 'For example a fraud referral.',
      },
      {
        id: 'score',
        label: 'The score is consumed as a probability',
        hint: 'For example credit pricing or a clinical risk score.',
      },
    ],
  },
  {
    id: 'frame',
    legend: 'Which legal frame governs the decision?',
    hint: 'The law decides which disparity is unlawful; the engineer builds the measurement so Legal has something true to decide on.',
    anchor: 'doctrines',
    options: [
      { id: 'us-employment', label: 'US employment selection (Title VII, Uniform Guidelines, NYC Local Law 144)' },
      { id: 'credit', label: 'Credit approval or pricing (ECOA and Regulation B, FCRA; AI Act Annex III point 5(b))' },
      { id: 'benefits', label: 'Public benefits eligibility or recovery (equality law; GDPR Art. 22; AI Act Annex III point 5(a))' },
      { id: 'eu-high-risk', label: 'Another EU AI Act high-risk use, for example employment in the EU (Annex III point 4)' },
      { id: 'clinical', label: 'Clinical triage or another health use (medical-device and equality law)' },
      { id: 'general', label: 'Accessibility, equality or consumer law, with no sector-specific rule' },
      { id: 'unsure', label: 'Not sure yet' },
    ],
  },
  {
    id: 'attribute',
    legend: 'Can you use the protected attribute at evaluation time?',
    hint: 'Both proxy tests and every group metric need it; that is the privacy tension every fairness programme meets.',
    anchor: 'protected',
    options: [
      { id: 'available', label: 'Yes, lawfully, for evaluation' },
      {
        id: 'restricted',
        label: 'Only under conditions: it is special-category personal data',
        hint: 'In the EU, Art. 4a of the AI Act sets the conditions for bias detection and correction.',
      },
      { id: 'unavailable', label: 'No' },
    ],
  },
];

export interface MetricFamily {
  id: string;
  name: string;
  /** What it equalises / when it holds, as the chapter states it. */
  holds: string;
  /** When it fits, as the chapter states it. */
  fits: string;
  /** What to watch for, as the chapter states it. */
  watch: string;
  anchor: FairnessAnchor;
  /** Glossary term, when the glossary carries one. */
  term?: string;
}

export const metricFamilies: readonly MetricFamily[] = [
  {
    id: 'demographic-parity',
    name: 'Demographic parity and the adverse-impact ratio',
    holds: 'Selection rates are equal across groups; the adverse-impact ratio (AIR) is its ratio form.',
    fits: 'The opportunity should be shared regardless of measured outcome; it needs no outcome label.',
    watch: 'Ignores different base rates, and can be met by selecting unqualified members of a group. The four-fifths rule is a trigger for investigation, not a pass mark.',
    anchor: 'metrics',
    term: 'Adverse-impact ratio (AIR)',
  },
  {
    id: 'equal-opportunity',
    name: 'Equal opportunity',
    holds: 'True-positive rates are equal across groups.',
    fits: 'Missing a qualified person is the main harm (hiring, admissions, access to care).',
    watch: 'Leaves false positives unconstrained.',
    anchor: 'metrics',
  },
  {
    id: 'equalised-odds',
    name: 'Equalised odds',
    holds: 'True-positive and false-positive rates are both equal across groups.',
    fits: 'Both errors are costly.',
    watch: 'Harder to satisfy; may cost accuracy for all groups.',
    anchor: 'metrics',
    term: 'Equalised odds',
  },
  {
    id: 'fpr-parity',
    name: 'False-positive-rate parity',
    holds: 'False-positive rates are equal across groups.',
    fits: 'Wrongly cutting or reclaiming, the costliest error in benefits eligibility and recovery.',
    watch: 'Leaves missed eligible people unconstrained; pair it with appeal outcomes by group.',
    anchor: 'choosing',
  },
  {
    id: 'predictive-parity',
    name: 'Predictive parity',
    holds: 'Precision, the share of positive decisions that are right, is equal across groups.',
    fits: 'A positive decision triggers action whose value depends on being right (fraud referral).',
    watch: 'Incompatible with equal error rates when base rates differ.',
    anchor: 'metrics',
  },
  {
    id: 'calibration',
    name: 'Calibration within groups',
    holds: 'Among people scored s, a fraction s are positive, in every group.',
    fits: 'Scores are consumed as probabilities (credit pricing, clinical risk).',
    watch: 'A calibrated score can still produce very different error rates.',
    anchor: 'metrics',
    term: 'Calibration within groups',
  },
  {
    id: 'worst-group-error',
    name: 'Worst-group error rate',
    holds: 'The error rate of the worst-served group, reported beside the average.',
    fits: 'Quality-of-service harms: the system fails for a group of users (speech, vision, document search).',
    watch: 'Needs a labelled evaluation set drawn from the people actually served.',
    anchor: 'choosing',
  },
  {
    id: 'counterfactual-flip',
    name: 'Counterfactual flip rate',
    holds: 'Change only the protected attribute or its textual markers, hold everything else fixed, and measure how often the decision or the generated text changes.',
    fits: 'The most practical fairness eval for LLM-based systems: group labels for outputs rarely exist, while paired prompts are easy to generate.',
    watch: 'An approximation of counterfactual fairness, which needs a causal model to compute exactly.',
    anchor: 'counterfactual',
    term: 'Counterfactual fairness',
  },
  {
    id: 'quality-floor',
    name: 'Per-group quality floor',
    holds: 'Output quality stays above a set floor for every group.',
    fits: 'Degraded or demeaning output for a group is the costliest error of a generative assistant.',
    watch: 'Set the floor, and the rating method, before the results are seen.',
    anchor: 'choosing',
  },
];

/** Secondary checks named in the chapter's use-case table and sections. */
export const secondaryChecks: Readonly<Record<string, { name: string; anchor: FairnessAnchor }>> = {
  'intersectional-air': { name: 'Intersectional AIR', anchor: 'intersectional' },
  'proxy-scan': { name: 'Proxy scan: predict the protected attribute; attribute and ablate', anchor: 'protected' },
  'error-rate-gaps': { name: 'Error-rate gaps by group', anchor: 'metrics' },
  'reason-codes': { name: 'Reason-code consistency', anchor: 'choosing' },
  'appeal-outcomes': { name: 'Appeal outcomes by group', anchor: 'choosing' },
  'label-validity': { name: 'Label-validity review (cost versus need)', anchor: 'sources' },
  'intersectional-error': { name: 'Intersectional error', anchor: 'intersectional' },
  'stereotype-probes': { name: 'Stereotype probes', anchor: 'choosing' },
  'refusal-gaps': { name: 'Refusal-rate gaps', anchor: 'choosing' },
  'selection-rates-monitor': {
    name: 'Selection-rate monitoring in production (needs no outcome label)',
    anchor: 'monitoring',
  },
};

/** The chapter's use-case table rows, by id, for "nearest row". */
export const useCaseRows = [
  {
    id: 'cv',
    useCase: 'CV screening, promotion',
    harm: 'Allocation',
    costliest: 'Rejecting a qualified candidate',
    primary: 'Selection-rate AIR; equal opportunity',
    secondary: 'Intersectional AIR; proxy scan',
    legal: 'Title VII, Uniform Guidelines, NYC LL144; AI Act Annex III point 4',
  },
  {
    id: 'credit',
    useCase: 'Credit approval and pricing',
    harm: 'Allocation',
    costliest: 'Both: wrongful denial and unaffordable credit',
    primary: 'Calibration within groups; approval-rate AIR',
    secondary: 'Error-rate gaps; reason-code consistency',
    legal: 'ECOA and Regulation B, FCRA; AI Act Annex III point 5(b)',
  },
  {
    id: 'benefits',
    useCase: 'Benefits eligibility and recovery',
    harm: 'Allocation (punitive when reclaiming)',
    costliest: 'Wrongly cutting or reclaiming a benefit',
    primary: 'False-positive-rate parity',
    secondary: 'Predictive parity; appeal outcomes by group',
    legal: 'Equality law; GDPR Art. 22; AI Act Annex III point 5(a)',
  },
  {
    id: 'clinical',
    useCase: 'Clinical triage',
    harm: 'Allocation (need-based)',
    costliest: 'Missing a person in need',
    primary: 'Equal opportunity; calibration',
    secondary: 'Label-validity review (cost versus need)',
    legal: 'Medical-device and equality law',
  },
  {
    id: 'quality',
    useCase: 'Speech, vision, document search',
    harm: 'Quality of service',
    costliest: 'Failing for a group of users',
    primary: 'Worst-group error rate',
    secondary: 'Intersectional error',
    legal: 'Accessibility and equality law',
  },
  {
    id: 'generative',
    useCase: 'Generative assistant',
    harm: 'Quality of service; stereotyping',
    costliest: 'Degraded or demeaning output for a group',
    primary: 'Counterfactual flip rate; per-group quality floor',
    secondary: 'Stereotype probes; refusal-rate gaps',
    legal: 'Equality and consumer law',
  },
] as const;

/** Notes the result may show, each restating the chapter at `anchor`. */
export const fairnessNotes: Readonly<Record<string, { title: string; text: string; anchor: FairnessAnchor }>> = {
  'label-first': {
    title: 'Review the label before any error-rate metric',
    text: 'A label that stands in for the real target is measurement bias: the model can be accurate on the label and biased on the thing that matters, and no fairness metric computed against that label will catch it. Review whether the label measures the construct the decision is about, and record the review before training.',
    anchor: 'sources',
  },
  'no-labels': {
    title: 'Without labels, start with what needs none',
    text: 'Selection rates by group and the counterfactual flip test need no outcome label. Add calibration and error rates by group once outcomes arrive, with the label delay stated.',
    anchor: 'monitoring',
  },
  impossibility: {
    title: 'The metrics conflict when base rates differ',
    text: 'When the prevalence of the outcome differs across groups, predictive parity and equal error rates cannot hold together, and calibration within groups cannot hold together with balance for the positive and the negative class except in highly constrained special cases. The choice is a governance decision with an owner, taken before the results are seen.',
    anchor: 'impossibility',
  },
  'four-fifths': {
    title: 'The four-fifths rule is a trigger, not a pass mark',
    text: "Under the US Uniform Guidelines, a selection rate below four-fifths of the highest group's rate will generally be regarded by federal enforcement agencies as evidence of adverse impact; smaller differences can still constitute adverse impact when they are significant in statistical and practical terms, and larger ones may not when they rest on small numbers. Record the rates, the counts, the ratio and a confidence interval.",
    anchor: 'fourFifths',
  },
  'us-employment': {
    title: 'US employment: audits and cut-offs',
    text: 'New York City\'s Local Law 144 requires an independent bias audit within the past year with selection or scoring rates and impact ratios by sex, race or ethnicity and intersectional categories, and a published summary; it requires no specific action on the results, so attach an internal threshold and an owner. Title VII forbids adjusting scores or using different cut-off scores by protected group, so a group-specific threshold can itself be unlawful. US federal enforcement turned away from disparate impact in 2026; private plaintiffs and many state laws still support such claims (as of 2026-09-24, see the chapter).',
    anchor: 'fourFifths',
  },
  credit: {
    title: 'Credit: calibration and approval rates together',
    text: 'The chapter pairs calibration within groups with the approval-rate AIR for credit, and checks error-rate gaps and the consistency of reason codes.',
    anchor: 'choosing',
  },
  benefits: {
    title: 'Benefits: wrongful cuts are the costliest error',
    text: 'For eligibility and recovery the chapter puts false-positive-rate parity first, with predictive parity and appeal outcomes by group as checks.',
    anchor: 'choosing',
  },
  eu: {
    title: 'EU: indirect discrimination and Art. 10',
    text: 'An apparently neutral criterion that disadvantages a group is unlawful unless objectively justified by a legitimate aim pursued by appropriate and necessary means: for an engineer, show why the feature is needed and that no less discriminatory alternative performs acceptably, as an eval. For high-risk systems, Art. 10(2)(f) and (g) require data to be examined for biases and measures to detect, prevent and mitigate them. A mitigation that uses the protected attribute at decision time risks direct discrimination.',
    anchor: 'doctrines',
  },
  clinical: {
    title: 'Clinical: need, not cost',
    text: 'Equal opportunity and calibration, with a label-validity review first: the canonical measurement-bias case predicted health-care cost as a stand-in for health need.',
    anchor: 'sources',
  },
  unsure: {
    title: 'Settle the legal frame with Legal',
    text: 'The legal frame decides which disparity is unlawful and which fix is allowed. Record the frame per jurisdiction in the policy, as data, before choosing thresholds.',
    anchor: 'doctrines',
  },
  'attribute-restricted': {
    title: 'Special-category data: the Art. 4a conditions',
    text: 'In the EU, Art. 4a lets providers of high-risk systems exceptionally process special categories of personal data strictly for bias detection and correction, on conditions that read like a control specification: other data would not work, re-use limits and pseudonymisation, strict access, no transmission to other parties, deletion once the bias is corrected, and records of why it was necessary. The GDPR still applies.',
    anchor: 'protected',
  },
  'attribute-unavailable': {
    title: 'No attribute: the fallbacks',
    text: 'Voluntary self-identification with a clear purpose statement, testing on consented panels, and inferred attributes; the last carry their own error and legal risk and need the same review as any other use of the data. Removing the attribute from the features does not remove the bias: proxies carry it.',
    anchor: 'protected',
  },
  'small-groups': {
    title: 'Small groups and intersections',
    text: 'Set a minimum cell size (below it, report "insufficient data" and never count it as a pass), put confidence intervals on every rate and ratio and gate on the interval, state a multiple-comparison correction, and search for the worst slice.',
    anchor: 'intersectional',
  },
  'report-both': {
    title: 'Report differences and ratios, with denominators',
    text: 'A small absolute gap at a low base rate can be a large ratio, and the reverse; a rate on 30 people is an anecdote, and the eval should say so.',
    anchor: 'metrics',
  },
  'record-first': {
    title: 'Write the choice down before the eval runs',
    text: 'Record the chosen metric, the reason, the threshold and the approver in a versioned Policy Card that the eval reads, reviewed by someone who represents the affected people, and revisit it when the use case changes. Picking the metric after seeing which one the model passes is metric shopping.',
    anchor: 'choosing',
  },
  'eval-set': {
    title: 'Build the evaluation set from the people served',
    text: 'Evaluation bias: when the test set does not look like the people served, the metric says nothing about them. Draw the evaluation set from the deployment population and slice every metric by group.',
    anchor: 'sources',
  },
  'mitigation-order': {
    title: 'If a disparity is found',
    text: 'Prefer the earliest fix that works: better data beats a clever constraint, and a constraint beats a threshold patch. Re-run the whole suite, accuracy per group included, and record the mitigation as a change with an owner.',
    anchor: 'mitigation',
  },
};

/** Everything the client needs. */
export function fairnessChooserData(
  siteUrl: string,
  notice: string,
  license: string,
  anchorTitles: Record<FairnessAnchor, string>,
) {
  return {
    version: 1,
    notice,
    license,
    page: `${siteUrl}/toolkit/fairness-metric-chooser`,
    chapter: `${siteUrl}${fairnessChapter}`,
    chapterPath: fairnessChapter,
    anchors: fairnessAnchors,
    anchorTitles,
    questions: treeQuestions,
    families: metricFamilies,
    secondary: secondaryChecks,
    rows: useCaseRows,
    notes: fairnessNotes,
  };
}
