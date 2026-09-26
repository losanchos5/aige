// glossary-descriptions.ts: hand-written meta descriptions for the glossary
// term pages whose definition has no opening that can stand alone as a
// snippet (audit 2026-09-25 round 3: ONPAGE N3-2, CONTENT N-R3-1, N-R3-2,
// N-R3-6). Without one, src/pages/glossary/[slug].astro fell back to the stock
// "<term>: definition with sources ..." template, so the snippet no longer said
// what the term means.
//
// Each entry is "<term>: <one sentence>", 110-158 characters, summarising that
// term's own definition in bok/09-glossary.md: every qualifier of what it
// states kept ("unless", "only", "whichever"), no fact the definition does not
// carry. When a definition changes, re-read its line here. A slug that is not
// a glossary term fails the build (glossary/[slug].astro).

export const glossaryDescriptions: Readonly<Record<string, string>> = {
  'a2a-agent2agent-protocol':
    'A2A (Agent2Agent protocol): an open protocol for agents to hand tasks to one another, at version 1.0 since March 2026.',
  'acceptable-use-policy-aup':
    'Acceptable-use policy (AUP): the staff-facing rules for using AI tools, enforced through a sanctioned gateway and discovery, not the handbook alone.',
  aesia:
    "AESIA: the Agencia Española de Supervisión de Inteligencia Artificial, created to act as Spain's national supervisory authority for the AI Act.",
  'agent-card':
    'Agent Card: the JSON document an A2A agent publishes to describe its identity, skills, service endpoint and the authentication schemes it accepts.',
  'ai-business-operator-korea':
    "AI business operator (Korea): under Korea's AI Basic Act, a person or body doing AI business, either developing AI or building products or services on it.",
  'ai-governance':
    'AI governance: the set of rules, roles, controls and evidence that keeps AI systems within the limits an organisation or a state has chosen.',
  'ai-incident':
    'AI incident: for the OECD, an event where the development, use or malfunction of AI systems directly or indirectly leads to harm, such as to health or rights.',
  'ai-literacy':
    'AI literacy: under the EU AI Act, the skills, knowledge and understanding that let providers, deployers and affected persons use AI in an informed way.',
  'ai-office':
    'AI Office: the Commission body that supervises general-purpose AI and coordinates AI Act enforcement, able to investigate and to fine GPAI providers.',
  'ai-regulatory-sandbox':
    'AI regulatory sandbox: an EU AI Act framework, set up by a competent authority, in which providers develop and test innovative AI for a limited time.',
  'ai-system-impact-assessment':
    'AI system impact assessment: an AI impact assessment (AIIA), per ISO/IEC 42005, of how a system and its foreseeable uses may affect people and society.',
  'ai-system-lifecycle-oecd':
    'AI system lifecycle (OECD): the iterative phases of an AI system, from design and data through building, testing and deployment to operation and retirement.',
  'authorised-representative':
    'Authorised representative: an EU-established person mandated in writing to carry out the AI Act obligations of a non-EU provider of high-risk AI or GPAI.',
  'bias-audit-nyc-local-law-144':
    'Bias audit (NYC Local Law 144): the independent audit an NYC employer needs within the year before using an automated employment decision tool.',
  'blameless-post-mortem':
    'Blameless post-mortem: an incident review that finds contributing causes without indicting any individual or team; systems and processes are what get fixed.',
  'catastrophic-severity-override':
    'Catastrophic-severity override: the rule that any top-severity scenario is Critical whatever its likelihood and cannot be accepted by the delivery team.',
  'ce-marking':
    "CE marking: the mark of a high-risk AI system's conformity with the EU AI Act, affixed visibly, legibly and indelibly, or digitally for digital systems.",
  'claims-register':
    "Claims register: the record of every public claim about an AI system's accuracy, fairness, safety or capability, with the eval evidence behind each one.",
  'common-specifications':
    'Common specifications: specifications the Commission may adopt under AI Act Article 41 when harmonised standards are missing, late or fall short on rights.',
  'contest-path':
    'Contest path: how a person affected by an automated decision reaches a reviewer who did not take it and can change the outcome, honouring GDPR Art. 22(3).',
  'counterfactual-fairness':
    'Counterfactual fairness: the requirement that a decision about a person stay the same had they belonged to a different group, defined through a causal model.',
  'counterfactual-flip-test':
    'Counterfactual flip test: a test that changes only a protected attribute, or swaps identity terms in prompts, and measures how often the outcome changes.',
  'decision-notice':
    'Decision notice: the notice given with an automated or AI-assisted decision, saying a system was used, the main reasons and what the person can do by when.',
  decommissioning:
    'Decommissioning: the planned retirement of an AI system, down to revoking every identity and marking its registry entry retired rather than deleted.',
  deepfake:
    'Deepfake: in the EU AI Act, AI-made or manipulated image, audio or video resembling real persons, objects, places or events and falsely appearing authentic.',
  'disparate-treatment':
    'Disparate treatment: treating someone less favourably because of a protected characteristic, including via a feature or rule deliberately standing in for it.',
  dpia:
    'DPIA: the GDPR Article 35 Data Protection Impact Assessment of processing likely to result in high risk to individuals, kept as a versioned artefact.',
  'en-18286':
    'EN 18286: the AI Act Article 17 QMS standard, published July 2026 but not cited in the Official Journal as of 2026-09-24, so no presumption of conformity.',
  'equalised-odds':
    'Equalised odds: a group fairness criterion that holds when true-positive and false-positive rates are both equal across groups.',
  'evidence-record':
    'Evidence record: the signed, structured record a control writes each time it decides, in one shape for all controls, so an audit is a query over one store.',
  'explanation-record':
    'Explanation record: the artefact for one explained decision, written at decision time so the explanation can be reproduced under a right to explanation.',
  'fairness-policy':
    'Fairness policy: the per-system record, fixed before results are seen, of what fairness means for that system, including metric, threshold and approver.',
  'four-fifths-rule':
    "Four-fifths rule: the US rule of thumb that a selection rate under 80% of the top group's generally signals adverse impact, qualified by significance.",
  fria:
    "FRIA: the Fundamental Rights Impact Assessment under AI Act Article 27 of a high-risk system's impact on rights, kept as a versioned, reviewable artefact.",
  'fulfilment-record':
    'Fulfilment record: the per-request record of how a data-subject request was honoured wherever the data sits, and whether the GDPR deadline was met.',
  gpai:
    'GPAI: a general-purpose AI model, one of significant generality that can competently do a wide range of distinct tasks and be integrated into many systems.',
  'graduated-degradation':
    'Graduated degradation: pre-built, tested operating modes short of switching an AI system off, such as advice-only or grounded-only answers.',
  guardrail:
    "Guardrail: a runtime control on a model's or agent's inputs, outputs or tool calls that blocks, rewrites or escalates what breaks a policy.",
  'high-impact-ai-korea':
    "High-impact AI (Korea): under Korea's AI Basic Act, AI that may significantly affect life, physical safety or fundamental rights and is used in a listed area.",
  'high-risk-ai-system':
    'High-risk AI system: under the AI Act, AI in an Annex I product that needs third-party assessment, or AI used in an Annex III area, unless Art. 6(3) applies.',
  'holding-statement':
    'Holding statement: a short public statement drafted before any incident, saying what is known, what was done to contain it and when the next update comes.',
  'human-in-command-hic':
    "Human-in-command (HIC): the oversight mode in which people oversee an AI system's overall activity and decide when and whether to use it.",
  importer:
    'Importer: under the EU AI Act, an EU-established person placing on the market an AI system bearing the name or trademark of a non-EU provider.',
  'indirect-discrimination':
    'Indirect discrimination: an apparently neutral criterion that puts a protected group at a particular disadvantage, unlawful unless objectively justified.',
  'internal-reporting-channel':
    'Internal reporting channel: a confidential route for staff and contractors to raise AI concerns outside the chain of command, protected against retaliation.',
  'justification-memo':
    'Justification memo: the intake record for an AI use case that answers whether AI should be used at all, before a system reaches a gate.',
  'latent-disclosure':
    "Latent disclosure: under California's AI Transparency Act, provenance data embedded in AI-generated image, video or audio so a detection tool can read it.",
  'least-agency':
    'Least agency: the OWASP agentic principle of giving an agent no more autonomy than its task needs, since unneeded agency widens the attack surface.',
  lime:
    "LIME: Local Interpretable Model-agnostic Explanations, which explains one prediction by fitting a simple model to the black box's behaviour around the input.",
  'localisation-by-jurisdiction':
    'Localisation (by jurisdiction): controlling where an AI system runs and what it offers in each jurisdiction, so one market can be switched off alone.',
  'market-surveillance-authority':
    'Market surveillance authority: the national authority enforcing the AI Act for products placed on its market, able to investigate and order corrective action.',
  mcp:
    'MCP: the Model Context Protocol, an open protocol connecting AI applications to tools and data sources; it secures the hop between one client and one server.',
  'memory-poisoning':
    "Memory poisoning: an injection written into an agent's memory, retrieval corpus or vector store that taints every later session reading from that store.",
  'model-signing':
    "Model signing: signing a model's files at build, a detached signature covering a manifest of every file's digest, so any changed file fails verification.",
  oscal:
    "OSCAL: the Open Security Controls Assessment Language, NIST's machine-readable format for controls, assessments and evidence.",
  'output-suppression':
    "Output suppression: a filter that stops a model producing a person's data when retraining it out is disproportionate; the data stays in the weights.",
  'personal-data-breach':
    'Personal data breach: a security breach compromising personal data, notified to the authority within 72 hours unless it is unlikely to result in a risk.',
  pipia:
    "PIPIA: China's PIPL impact assessment, required in advance for sensitive data, automated decision-making, entrusted processing and cross-border provision.",
  'pre-determined-changes':
    'Pre-determined changes: changes to a learning high-risk system planned at the initial conformity assessment; they are not substantial modifications.',
  'presumption-of-conformity':
    'Presumption of conformity: under AI Act Art. 40, a system conforming with OJ-cited harmonised standards is presumed to meet what they cover, and no more.',
  'privacy-by-design-and-by-default':
    'Privacy by design and by default: the GDPR Art. 25 duty to build data protection into processing and to process by default only the data each purpose needs.',
  'product-liability-directive-pld':
    'Product Liability Directive (PLD): Directive (EU) 2024/2853, which treats software, including AI, as a product, for products marketed after 9 Dec 2026.',
  'profiling-override':
    'Profiling override: the AI Act Art. 6(3) rule that an Annex III system profiling natural persons is always high-risk, whichever filter condition it meets.',
  'prohibited-practice':
    'Prohibited practice: an AI practice banned outright by AI Act Article 5, such as social scoring; no risk acceptance can cover one.',
  provider:
    'Provider: whoever develops an AI system or GPAI model, or has one developed, and markets it or puts it into service under its own name or trademark.',
  'raise-act':
    "RAISE Act: New York's Responsible AI Safety and Education Act, a frontier-AI safety law signed 19 December 2025 and taking effect 1 January 2027.",
  'reason-code':
    'Reason code: a human-readable statement of a principal factor behind an adverse decision, mapped from what the model actually scored and versioned with it.',
  'reinforcement-learning-from-human-feedback-rlhf':
    'Reinforcement learning from human feedback (RLHF): a way to align a pre-trained model with human demonstrations and a reward model trained on human rankings.',
  'right-to-explanation-ai-act-art-86':
    "Right to explanation (AI Act Art. 86): the right to explanation of a high-risk system's role in a significantly adverse decision, where Union law gives none.",
  'risk-acceptance':
    'Risk acceptance: a signed, expiring decision by someone with the required authority that a risk may remain for a bounded period under compensating controls.',
  'risk-register':
    'Risk register: the evidence record of the risk loop, one versioned file per risk with ratings, treatment, controls, owner, acceptance and review cadence.',
  'risk-tier':
    "Risk tier: an organisation's own rating of an AI use case, computed at intake by a policy; it sits beside the legal classification, not in place of it.",
  'root-cause-analysis-rca':
    'Root-cause analysis (RCA): the review of why an incident happened and why the controls did not stop it, coding each confirmed cause against a taxonomy.',
  'runtime-data-path':
    'Runtime data path: the live connection between production and the governance function, without which a registry or dashboard cannot see what is running.',
  safetensors:
    "Safetensors: a file format for storing a model's tensors safely, unlike Python pickle, whose loading can run arbitrary code.",
  'safety-component':
    'Safety component: under the amended AI Act, a component meant to prevent or mitigate risks to health, safety or property, or whose failure endangers them.',
  'serious-incident':
    'Serious incident: under AI Act Art. 3(49), an AI incident or malfunction that directly or indirectly leads to death or another listed serious harm.',
  'shadow-ai':
    'Shadow AI: an AI system, model or agent running without registration, including staff use of unapproved AI tools, answered with a sanctioned route, not a ban.',
  'shadow-deployment':
    'Shadow deployment: a release stage where a new model gets live inputs but its outputs are not used, so its behaviour can be compared before any exposure.',
  shap:
    'SHAP: SHapley Additive exPlanations, a feature-attribution method that gives each input feature a share of a prediction, based on Shapley values.',
  'star-for-ai':
    "STAR for AI: CSA's security assurance and certification programme for AI, built on the AICM, with self-assessment, automated and Level 2 tiers.",
  'substantial-modification':
    'Substantial modification: an unforeseen post-market change that affects compliance or changes the intended purpose, triggering a new conformity assessment.',
  svid:
    "SVID: a SPIFFE Verifiable Identity Document, a short-lived X.509 certificate or JWT proving a workload's SPIFFE ID, issued via the SPIFFE Workload API.",
  'synthetic-data':
    "Synthetic data: data generated by a model or simulation rather than collected; it inherits its generator's biases and can leak the records it was fitted on.",
  'systemic-risk':
    'Systemic risk: the AI Act risk of the most capable general-purpose AI models, triggering extra evaluation, adversarial-testing and incident-reporting duties.',
  'tabletop-exercise':
    'Tabletop exercise: a scheduled, scored rehearsal of an incident playbook against a named failure mode, whose records are tagged as a drill.',
  'tdm-exception':
    'TDM exception: two EU text and data mining exceptions, one for research that no opt-out overrides and one for anyone, AI training included, unless opted out.',
  'testing-in-real-world-conditions':
    'Testing in real-world conditions: under the AI Act, temporary testing of an AI system outside a lab under a plan the market surveillance authority approved.',
  'token-passthrough':
    'Token passthrough: the anti-pattern of a server accepting a token not issued to it and forwarding it unmodified downstream; the MCP specification forbids it.',
  'tool-allow-list':
    'Tool allow-list: the deny-by-default list of tools an agent may call, each pinned by a hash of its definition and checked by the tool gateway on every call.',
  'training-content-summary':
    'Training-content summary: the public summary of the content used to train a GPAI model, required by AI Act Art. 53(1)(d) on a mandatory Commission template.',
  'transaction-token-txn-token':
    'Transaction token (Txn-Token): a short-lived, signed IETF draft token carrying identity and authorisation context through a call chain in one trusted domain.',
  'transfer-impact-assessment-tia':
    "Transfer impact assessment (TIA): the data exporter's assessment of whether a third country's law lets the importer honour the transfer tool.",
  'use-case-record':
    'Use-case record: the intake record for a proposed AI use, with its purpose, affected persons and error appetite stored as fields on the registry entry.',
  'version-pinning':
    'Version pinning: fixing the exact model, prompt, corpus and guardrail versions a system uses, so any unpinned change is detected and treated as a release.',
  'widespread-infringement':
    'Widespread infringement: under the AI Act, a breach of EU law protecting individuals that harms or may harm collective interests in several Member States.',
};
