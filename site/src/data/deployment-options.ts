// deployment-options.ts: the model-type and deployment-option matrix from
// chapter 15 (bok/15-governing-deployment.md, "Model types and deployment
// options"). The chapter renders the same content as Markdown tables; this
// module keeps it typed for later tools (a matrix figure, a "deployer or
// provider?" check, the learning path).
//
// Three dimensions describe one deployment: what kind of model it is
// (`model-type`, grouped into four contrasts), where it runs (`hosting`) and how
// it is adapted (`adaptation`). Each option names its dominant failure modes,
// the controls it adds per stack layer (1 Govern-as-Code … 5 Assurance &
// Continuous Compliance), the evidence you can produce yourself versus the
// evidence you must collect from a supplier, what it does to your role under the
// EU AI Act, and a cost note. `matrix` crosses five model types with six
// options and names the one control each cell adds on top of its row and
// column. Content is illustrative, not a claim of conformity.
import type { StackLayer } from './frameworks';

export type OptionDimension = 'model-type' | 'hosting' | 'adaptation';

/** The four model-type contrasts the chapter compares. */
export type ModelContrast =
  | 'classic-vs-generative'
  | 'proprietary-vs-open-weight'
  | 'small-vs-large'
  | 'language-vs-multimodal';

export interface LayerControl {
  /** Stack layer the control lives in. */
  layer: StackLayer;
  /** The control, as a short imperative. */
  control: string;
}

export interface DeploymentOption {
  /** Stable id, used by `matrix` and by the chapter's tables. */
  id: string;
  dimension: OptionDimension;
  /** Only for model types: the contrast pair the option belongs to. */
  contrast?: ModelContrast;
  /** Short name as the chapter's table prints it. */
  label: string;
  /** The failures this option makes more likely. */
  failureModes: string;
  /** Controls the option adds, by layer. */
  controls: readonly LayerControl[];
  /** Evidence the deployer can produce itself. */
  evidenceProduce: string;
  /** Evidence the deployer must collect from a supplier or upstream provider. */
  evidenceCollect: string;
  /** What the option does to the deployer's role and duties. */
  roleNote: string;
  /** Cost, compute and energy note. */
  costNote: string;
}

export interface MatrixCell {
  /** Row: an id from `matrixRows`. */
  row: string;
  /** Column: an id from `matrixColumns`. */
  column: string;
  /** The control the combination adds, in a few words. */
  control: string;
}

/** Where chapter 15 renders this data. */
export const chapterAnchor = '/bok/governing-deployment#model-types-and-deployment-options';

export const disclaimer =
  'Illustrative, not a claim of conformity: the controls a real deployment needs follow from its risk tier, its obligations and its failure modes.';

export const options: readonly DeploymentOption[] = [
  // ---- Model type -----------------------------------------------------------
  {
    id: 'classic',
    dimension: 'model-type',
    contrast: 'classic-vs-generative',
    label: 'Classic predictive (classifier, scorer, forecaster)',
    failureModes:
      'Miscalibration; error gaps between groups; input and label drift; feedback loops where the score shapes the next training data.',
    controls: [
      { layer: 3, control: 'Per-group performance floors and a calibration eval on your own labelled data.' },
      { layer: 4, control: 'Drift monitor on inputs and outcomes (PSI, KS).' },
      { layer: 2, control: 'Model card that states the population the model was validated on.' },
    ],
    evidenceProduce: 'Holdout evals on your data; per-group metrics; drift reports.',
    evidenceCollect: 'Training-data description and validation report, if the model is bought.',
    roleNote:
      'Often used for Annex III decisions about people (credit, hiring), where the deployer duties of Art. 26 and the Art. 27 FRIA apply.',
    costNote: 'Cheap to run; the recurring cost is collecting ground-truth labels.',
  },
  {
    id: 'generative',
    dimension: 'model-type',
    contrast: 'classic-vs-generative',
    label: 'Generative (text, code, media)',
    failureModes:
      'Ungrounded or fabricated output; harmful or infringing content; prompt injection; leakage of personal or confidential data.',
    controls: [
      { layer: 3, control: 'Groundedness and red-team evals on your own prompts.' },
      { layer: 4, control: 'Input and output guardrails; disclosure and labelling of synthetic content (Art. 50).' },
      { layer: 2, control: 'Prompts and system prompts versioned as configuration in the registry entry.' },
    ],
    evidenceProduce: 'Groundedness and red-team results; guardrail decisions; prompt versions.',
    evidenceCollect: 'Provider model card and the GPAI documentation passed downstream.',
    roleNote: 'Art. 50 transparency applies to deployers of chatbots and synthetic content; the GPAI model duties stay upstream.',
    costNote: 'Per-token inference; energy per request far above a task-specific model.',
  },
  {
    id: 'proprietary',
    dimension: 'model-type',
    contrast: 'proprietary-vs-open-weight',
    label: 'Proprietary (API or licensed weights)',
    failureModes:
      'Silent version change; lock-in; opaque training data; terms or prices that change under you.',
    controls: [
      { layer: 1, control: 'Contract terms (no training on inputs, residency) enforced as policy.' },
      { layer: 2, control: 'Vendor model version pinned in the registry entry.' },
      { layer: 3, control: 'Boundary evals re-run on every vendor version change.' },
    ],
    evidenceProduce: 'Boundary evals; your own logs of the traffic you send and receive.',
    evidenceCollect: 'Model card, AIBOM if offered, change and deprecation notices, certifications.',
    roleNote: 'You are the deployer; provider duties stay with the vendor unless an Art. 25(1) trigger applies.',
    costNote: 'Price per call is the vendor\'s to change; exit cost grows with integration depth.',
  },
  {
    id: 'open-weight',
    dimension: 'model-type',
    contrast: 'proprietary-vs-open-weight',
    label: 'Open-weight',
    failureModes:
      'Licence or acceptable-use breach; tampered or malicious weight files; unpatched vulnerabilities that are now yours to patch.',
    controls: [
      { layer: 1, control: 'Licence and acceptable-use check as a policy gate.' },
      { layer: 2, control: 'AIBOM entry with source, licence and file hash.' },
      { layer: 3, control: 'Full eval and red-team suite of your own.' },
      { layer: 4, control: 'Your own guardrails: no vendor safety layer sits in front.' },
    ],
    evidenceProduce: 'Almost all of it: hashes, scans, evals, red-team results, runtime logs.',
    evidenceCollect: 'Upstream model card and licence; the provider\'s GPAI documentation where it exists.',
    roleNote:
      'Heavy modification can make you the provider of a modified GPAI model (Commission indicative criterion: more than one third of the original training compute).',
    costNote: 'No per-token fee; you pay for hardware, operations staff and patching.',
  },
  {
    id: 'small',
    dimension: 'model-type',
    contrast: 'small-vs-large',
    label: 'Small (task-sized, edge-capable)',
    failureModes: 'Capability ceiling; weaker refusal training; brittle outside its task.',
    controls: [
      { layer: 3, control: 'Task-specific eval that proves fitness for this task, not in general.' },
      { layer: 4, control: 'Route out-of-scope requests to a fallback or a human.' },
    ],
    evidenceProduce: 'Task evals; out-of-scope routing logs.',
    evidenceCollect: 'Base model card.',
    roleNote: 'Usually below GPAI thresholds as a standalone model; the system around it may still be high-risk.',
    costNote: 'Lower latency, cost and energy per request; fits on-device.',
  },
  {
    id: 'large',
    dimension: 'model-type',
    contrast: 'small-vs-large',
    label: 'Large (general-purpose, frontier)',
    failureModes: 'Broad capability surface; wide jailbreak surface; cost overruns; over-reliance by users.',
    controls: [
      { layer: 1, control: 'Scope the use case in policy: what the system may not be asked to do.' },
      { layer: 3, control: 'Broader red team across the capabilities you do not need.' },
      { layer: 4, control: 'Rate limits and spend caps per identity.' },
    ],
    evidenceProduce: 'Scope policy verdicts; red-team results; spend telemetry.',
    evidenceCollect: 'GPAI documentation; systemic-risk evaluations where the provider publishes them.',
    roleNote: 'The GPAI provider carries Art. 53 and, for systemic-risk models, Art. 55; you carry the system.',
    costNote: 'Highest energy and cost per request; variance is the budget risk.',
  },
  {
    id: 'language',
    dimension: 'model-type',
    contrast: 'language-vs-multimodal',
    label: 'Language-only',
    failureModes: 'Text harms; injection through documents and web content the model reads.',
    controls: [
      { layer: 3, control: 'Text red team including indirect injection.' },
      { layer: 4, control: 'Text guardrails on input and output.' },
    ],
    evidenceProduce: 'Red-team results; guardrail logs.',
    evidenceCollect: 'Provider model card.',
    roleNote: 'No additional role effect.',
    costNote: 'Baseline for generative cost.',
  },
  {
    id: 'multimodal',
    dimension: 'model-type',
    contrast: 'language-vs-multimodal',
    label: 'Multimodal (image, audio, video)',
    failureModes:
      'Synthetic media and impersonation; instructions hidden in images or audio; biometric and surveillance uses.',
    controls: [
      { layer: 1, control: 'Prohibited-practice checks (Art. 5) and a biometric-use policy.' },
      { layer: 3, control: 'Cross-modal red team.' },
      { layer: 4, control: 'Machine-readable marking of generated media (Art. 50).' },
    ],
    evidenceProduce: 'Cross-modal red-team results; marking logs.',
    evidenceCollect: 'Provider documentation on marking and on training-data consent.',
    roleNote: 'Biometric uses can move the system into a prohibited or Annex III category.',
    costNote: 'Media inference costs more energy per request than text.',
  },
  // ---- Hosting ---------------------------------------------------------------
  {
    id: 'cloud',
    dimension: 'hosting',
    label: 'Cloud (managed service or API)',
    failureModes: 'Data leaves your boundary; provider outage; inference routed to the wrong region.',
    controls: [
      { layer: 1, control: 'Residency and data-class policy as code.' },
      { layer: 4, control: 'Egress and region enforcement on the inference path.' },
      { layer: 5, control: 'Provider attestations and sub-processor list collected and dated.' },
    ],
    evidenceProduce: 'Residency verdicts; egress logs.',
    evidenceCollect: 'Certifications, sub-processor list, incident notices.',
    roleNote: 'The vendor is usually a processor for personal data and a provider for the model.',
    costNote: 'Operating expense; energy sits on the provider\'s meter and must be asked for.',
  },
  {
    id: 'on-prem',
    dimension: 'hosting',
    label: 'On-premise (your data centre or private cloud)',
    failureModes: 'You own patching, capacity and physical security; updates lag.',
    controls: [
      { layer: 4, control: 'Network segmentation and access control on the weights.' },
      { layer: 2, control: 'AIBOM with file hashes for every deployed artefact.' },
      { layer: 5, control: 'Your own tamper-evident logs.' },
    ],
    evidenceProduce: 'Full logs, access records, hashes.',
    evidenceCollect: 'Little beyond the upstream model card and licence.',
    roleNote: 'No change to role; more of the evidence is yours to produce.',
    costNote: 'Capital expense; energy is measurable on your own meter.',
  },
  {
    id: 'edge',
    dimension: 'hosting',
    label: 'Edge (device, vehicle, branch)',
    failureModes: 'Tampering; extraction of weights; stale versions in the field; no central log.',
    controls: [
      { layer: 2, control: 'Signed model artefacts and a registry of field versions.' },
      { layer: 4, control: 'Secure boot, device attestation, remote rollback and remote disable.' },
      { layer: 5, control: 'Sampled telemetry that reaches the evidence store.' },
    ],
    evidenceProduce: 'Signature checks; attestation results; field-version counts.',
    evidenceCollect: 'Hardware vendor attestation documentation.',
    roleNote: 'Embedded in a product, the system may fall under Annex I product rules.',
    costNote: 'Lowest marginal energy per request; update logistics cost.',
  },
  {
    id: 'hybrid',
    dimension: 'hosting',
    label: 'Hybrid (split by data class or load)',
    failureModes: 'Policy gaps at the boundary; sensitive data routed to the wrong tier; inconsistent versions.',
    controls: [
      { layer: 1, control: 'Routing policy by data class, evaluated on every request.' },
      { layer: 2, control: 'One registry entry spanning every tier and its versions.' },
    ],
    evidenceProduce: 'Routing verdicts per request.',
    evidenceCollect: 'As for each tier.',
    roleNote: 'As for each tier.',
    costNote: 'Two cost models to reconcile.',
  },
  // ---- Adaptation ------------------------------------------------------------
  {
    id: 'as-is',
    dimension: 'adaptation',
    label: 'As is (prompting only)',
    failureModes: 'Model not fitted to your task or population; the vendor changes it underneath you.',
    controls: [
      { layer: 3, control: 'Validation against your own thresholds before go-live.' },
      { layer: 4, control: 'Compensating guardrails for the gaps the validation found.' },
      { layer: 2, control: 'System prompt versioned with the registry entry.' },
    ],
    evidenceProduce: 'Validation results; prompt versions.',
    evidenceCollect: 'Provider instructions for use.',
    roleNote: 'Deployer, unless you rebrand it or change its intended purpose (Art. 25(1)(a), (c)).',
    costNote: 'Lowest adaptation cost.',
  },
  {
    id: 'fine-tune',
    dimension: 'adaptation',
    label: 'Fine-tune',
    failureModes: 'Safety training eroded; tuning data memorised; new biases.',
    controls: [
      { layer: 3, control: 'Treat the result as a new system: full eval and red team again.' },
      { layer: 2, control: 'Data card for the tuning set; AIBOM links base model and tuned weights.' },
      { layer: 1, control: 'Compute log checked against the GPAI modification criterion.' },
    ],
    evidenceProduce: 'Before-and-after evals; tuning data card; compute log.',
    evidenceCollect: 'Base model card and licence.',
    roleNote:
      'Can be a substantial modification of a high-risk system (Art. 25(1)(b)) or make you the provider of a modified GPAI model.',
    costNote: 'Training compute and energy, then re-validation on every base-model update.',
  },
  {
    id: 'rag',
    dimension: 'adaptation',
    label: 'Retrieval-augmented generation (RAG)',
    failureModes: 'Retrieval poisoning; stale or unlicensed corpus; answers that leak documents across users.',
    controls: [
      { layer: 4, control: 'Corpus access control that mirrors the source system\'s permissions.' },
      { layer: 3, control: 'Groundedness eval against a corpus snapshot.' },
      { layer: 2, control: 'Corpus provenance and licence recorded in the AIBOM.' },
    ],
    evidenceProduce: 'Groundedness results tied to a corpus snapshot; retrieval logs.',
    evidenceCollect: 'Licences for third-party content in the corpus.',
    roleNote: 'Usually leaves the role unchanged.',
    costNote: 'Indexing and storage; longer prompts raise inference cost.',
  },
  {
    id: 'compress',
    dimension: 'adaptation',
    label: 'Distillation, quantisation, LoRA adapters',
    failureModes: 'Silent quality or safety regression; shifted error rates between groups; adapter sprawl.',
    controls: [
      { layer: 3, control: 'Re-run the eval gate and red team on the compressed artefact.' },
      { layer: 2, control: 'Register every adapter and quantised build as its own version.' },
    ],
    evidenceProduce: 'Regression evals per build.',
    evidenceCollect: 'Base model card and licence (distillation may be restricted).',
    roleNote: 'Distilling or adapting a GPAI model is a modification: check it against the compute criterion (verify).',
    costNote: 'Cuts inference cost and energy; adds validation cost.',
  },
  {
    id: 'agentic',
    dimension: 'adaptation',
    label: 'Agentic wrapper (tools, actions)',
    failureModes: 'Tool misuse; goal hijack; privilege abuse; actions that cascade.',
    controls: [
      { layer: 4, control: 'Agent identity, scoped credentials, tool mediation and a tested kill switch.' },
      { layer: 2, control: 'Agent registry entry with owner, scope and expiry.' },
      { layer: 4, control: 'Human-in-the-loop gate on high-consequence actions.' },
    ],
    evidenceProduce: 'Traces with identity and tool calls; kill-switch test records.',
    evidenceCollect: 'Vendor agent documentation, if the agent is bought.',
    roleNote: 'Changes the risk more than the role: autonomy is the risk multiplier.',
    costNote: 'Many model calls per task; loops can run up cost.',
  },
];

export const matrixRows: readonly { id: string; label: string }[] = [
  { id: 'classic', label: 'Classic predictive' },
  { id: 'gen-language', label: 'Generative, language' },
  { id: 'gen-multimodal', label: 'Generative, multimodal' },
  { id: 'proprietary', label: 'Proprietary (API)' },
  { id: 'open-weight', label: 'Open-weight' },
];

export const matrixColumns: readonly { id: string; label: string }[] = [
  { id: 'cloud', label: 'Cloud' },
  { id: 'on-prem', label: 'On-premise' },
  { id: 'edge', label: 'Edge' },
  { id: 'fine-tune', label: 'Fine-tune' },
  { id: 'rag', label: 'RAG' },
  { id: 'agentic', label: 'Agentic wrapper' },
];

export const matrix: readonly MatrixCell[] = [
  { row: 'classic', column: 'cloud', control: 'Residency check on features; input drift monitor' },
  { row: 'classic', column: 'on-prem', control: 'Own the retraining pipeline and its approval' },
  { row: 'classic', column: 'edge', control: 'Signed model; field-version telemetry; remote rollback' },
  { row: 'classic', column: 'fine-tune', control: 'Retrain is a release: re-run per-group floors' },
  { row: 'classic', column: 'rag', control: 'Not typical; govern feature-store lineage instead' },
  { row: 'classic', column: 'agentic', control: 'Score triggers an action: human gate on adverse outcomes' },
  { row: 'gen-language', column: 'cloud', control: 'No-training and retention terms; output guardrail' },
  { row: 'gen-language', column: 'on-prem', control: 'Own guardrails, patching and energy metering' },
  { row: 'gen-language', column: 'edge', control: 'Small model; offline guardrails; signed updates' },
  { row: 'gen-language', column: 'fine-tune', control: 'Full red team; safety-erosion eval' },
  { row: 'gen-language', column: 'rag', control: 'Groundedness eval; corpus permissions; poisoning checks' },
  { row: 'gen-language', column: 'agentic', control: 'Agent identity, tool mediation, kill switch' },
  { row: 'gen-multimodal', column: 'cloud', control: 'Provenance marks on output; biometric-use block' },
  { row: 'gen-multimodal', column: 'on-prem', control: 'Own content signing; media retention rules' },
  { row: 'gen-multimodal', column: 'edge', control: 'Camera and microphone notices; on-device minimisation' },
  { row: 'gen-multimodal', column: 'fine-tune', control: 'Likeness and consent checks on tuning media' },
  { row: 'gen-multimodal', column: 'rag', control: 'Cross-modal injection tests on retrieved media' },
  { row: 'gen-multimodal', column: 'agentic', control: 'Screen and voice actions behind a human gate' },
  { row: 'proprietary', column: 'cloud', control: 'Pin the version; boundary evals on every change' },
  { row: 'proprietary', column: 'on-prem', control: 'Vendor appliance: attest version and update path' },
  { row: 'proprietary', column: 'edge', control: 'Vendor SDK: licence limits; offline revocation' },
  { row: 'proprietary', column: 'fine-tune', control: 'Vendor tuning service: data terms; your own re-eval' },
  { row: 'proprietary', column: 'rag', control: 'Your corpus, their model: retention and no-training terms' },
  { row: 'proprietary', column: 'agentic', control: 'Grant scoped tools; the vendor agent gets its own identity' },
  { row: 'open-weight', column: 'cloud', control: 'Licence gate; hash-verified weights on rented compute' },
  { row: 'open-weight', column: 'on-prem', control: 'You own patching: AIBOM, file scans, red team' },
  { row: 'open-weight', column: 'edge', control: 'Weights are extractable: licence terms and threat model' },
  { row: 'open-weight', column: 'fine-tune', control: 'Compute log against the GPAI one-third criterion' },
  { row: 'open-weight', column: 'rag', control: 'Every layer of evidence is yours to produce' },
  { row: 'open-weight', column: 'agentic', control: 'Own guardrails end to end; no vendor safety layer' },
];

/** Options of one dimension, in declaration order. */
export function optionsOf(dimension: OptionDimension): readonly DeploymentOption[] {
  return options.filter((option) => option.dimension === dimension);
}

/** The control a matrix cell adds, or undefined when the cell is empty. */
export function cell(row: string, column: string): string | undefined {
  return matrix.find((c) => c.row === row && c.column === column)?.control;
}
