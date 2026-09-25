# 09. Glossary

> The canonical definitions for the book: every term defined once, alphabetically, and
> cross-referenced to the chapter that treats it in full.

Terms are listed alphabetically under letter headings, and each definition is at most 60 words.
Where a term has a canonical spelling in the style guide (§8), that spelling is used here and
everywhere in the book. A term taken from a law, a standard or a paper carries a `[n]` citation to
its source; a term the book coins carries none, and its chapter is its source. Legal definitions are
paraphrased, and the cited text governs. "Contrast with" names the terms it is most often confused
with, "See" links the section that develops it, and the parenthesis lists the chapters that treat
it. Every term also has its own page, linked from its name, with its sources, the chapters that use
it and a ready-made citation.

## Commonly confused pairs

Ten pairs are confused often enough in reviews to be worth fixing in a team's vocabulary. Each
term's page carries the same comparison.

| Pair | The difference | Why it matters for controls |
|---|---|---|
| [Transparency](/glossary/transparency) and [explainability](/glossary/explainability) | What happened, from records of what ran, against how one decision was made | Two artefacts: registry, cards and logs for the first; an explanation method with a fidelity test for the second |
| [Data provenance](/glossary/data-provenance) and [data lineage](/glossary/data-lineage) | Where the data came from and on what terms, against the path it took through your own pipelines | Perfect lineage over unknown provenance is still ungoverned; erasure and disgorgement need both |
| [Data drift](/glossary/data-drift) and [concept drift](/glossary/concept-drift) | The inputs change, against the relationship between inputs and the right answer changing | The first shows in input monitors before labels arrive; the second only in outcomes on fresh labels |
| [AI incident](/glossary/ai-incident) and [issue (versus incident)](/glossary/issue-versus-incident) | Harm has happened, against a defect or deviation that has not produced a harmful event | Incidents start reporting clocks and CAPA; issues go to a tracked backlog with an owner and a due date |
| [Provider](/glossary/provider) and [deployer](/glossary/deployer) | Develops the system and places it on the market under its own name, against uses it under its own authority | Different duties and different evidence; a substantial modification can turn a deployer into the provider |
| [Human-in-the-loop (HITL)](/glossary/human-in-the-loop-hitl) and [human-on-the-loop (HOTL)](/glossary/human-on-the-loop-hotl) | A person approves each consequential decision, against a person monitors and can stop the system | HITL is evidenced by approval logs and override rates; HOTL by alerting and a tested stop path |
| [Risk appetite](/glossary/risk-appetite) and [risk tolerance](/glossary/risk-tolerance) | How much risk the organisation will take on overall, against the residual band one system may carry | Appetite is a board statement compiled to data; tolerance is the threshold a deploy gate reads |
| [Model card](/glossary/model-card) and [system card](/glossary/system-card) | One model's documentation, against the deployed system's: models, prompts, retrieval, tools, guardrails and oversight | Deployers and authorities need the system view; a model card alone misses the controls around the model |
| [Prompt injection](/glossary/prompt-injection) and [jailbreak](/glossary/jailbreak) | Any input that alters behaviour in unintended ways, direct or hidden in processed content, against inputs aimed at dropping the safety rules | Jailbreak evals test refusals; injection also needs least-privilege tools and isolation of untrusted content |
| [Pseudonymisation](/glossary/pseudonymisation) and [anonymous data](/glossary/anonymous-data) | Re-attributable with separately kept information, so still personal data, against not relating to an identifiable person at all | Pseudonymised data keeps every GDPR duty; an anonymity claim needs a dated assessment |

## A

**A2A (Agent2Agent protocol).** An open protocol for agents to hand tasks to one another, at version
1.0 since March 2026 [129] and a Growth Stage project of the Linux Foundation-directed Agentic AI
Foundation since August 2026 [130]. Servers must authenticate every request, but authorisation, and
the scope and revocation of authority granted mid-task, are left to the implementer [129]. Contrast
with [MCP](/glossary/mcp). See [ch. 23, Multi-agent systems and delegation
chains](/bok/governing-agents#multi-agent-systems-and-delegation-chains). (ch. 23)

**Abstention band.** A range of scores in which a system does not act on its own but routes the case
to a human reviewer. Its width is set by risk tier; the band size and the reviewers' override rate
are monitored as signals. Conformal prediction gives one way to size it [20]. See [ch. 11, Certainty
required by risk tier](/bok/ai-defined#certainty-required-by-risk-tier). (ch. 11)

**Acceptable-use policy (AUP).** The staff-facing rules for using AI tools: which tools are
approved, which data classes may go where, duties to review and disclose outputs, logging,
attestation before access and consequences. It is enforced through a sanctioned gateway and
discovery, not the handbook alone. See [ch. 12, Acceptable use of AI by
staff](/bok/governance-program#acceptable-use-of-ai-by-staff); [ch. 05, Pattern: Sanctioned AI
Gateway](/patterns/sanctioned-ai-gateway). (ch. 05, 12)

**Adaptiveness.** The ability of an AI system to change its behaviour while in use, through learning
after deployment; optional under the EU AI Act definition [21]. For governance it is one change
trigger among several: most behaviour change in practice comes from vendor updates, drift, prompt
edits or corpus refreshes. See [ch. 11, From definition element to registry
field](/bok/ai-defined#from-definition-element-to-registry-field). (ch. 11)

**ADMT (California).** Automated decisionmaking technology under the California CCPA regulations:
technology that processes personal information and uses computation to replace, or substantially
replace, human decision-making. Using it for significant decisions triggers pre-use notice, opt-out
or appeal, access and risk-assessment duties [22]. Contrast with [Automated decision-making
(ADM)](/glossary/automated-decision-making-adm). See [ch. 19, United
States](/bok/privacy-and-ai#united-states). (ch. 19)

**Adverse action notice.** The notice a US creditor must give when it denies or worsens credit,
stating the specific principal reasons [23]. The reasons must be accurate even when the decision
comes from a complex model, so reason codes need a fidelity test. Contrast with [Decision
notice](/glossary/decision-notice). See [ch. 20, Credit and
lending](/bok/existing-law#credit-and-lending). (ch. 16, 20)

**Adverse-impact ratio (AIR).** The selection rate of a group divided by the selection rate of the
most-selected group. Under the US Uniform Guidelines a ratio below four-fifths is generally treated
as evidence of adverse impact [24]; engineering practice reads it as a trigger for investigation,
reported with counts and a confidence interval. See [ch. 16, The four-fifths rule and the
adverse-impact
ratio](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio). (ch. 16)

**AESIA.** Spain's Agencia Española de Supervisión de Inteligencia Artificial, a state agency based
in A Coruña whose statute was approved by Royal Decree 729/2023, created to act as Spain's national
supervisory authority for the AI Act [1]. See [ch. 21, Spain: AESIA, the sandbox and a
bill](/bok/ai-laws-worldwide#spain-aesia-the-sandbox-and-a-bill). (ch. 08, 21)

**Agent (agentic AI).** An AI system that acts (browses, executes code, calls APIs, moves data or
delegates to other agents) under delegated authority, rather than only producing text. Agents are
the hardest object to govern because their behaviour is emergent and their actions have external
effects. See [ch. 23, What makes an agent a governance
object](/bok/governing-agents#what-makes-an-agent-a-governance-object); [ch. 11, Agentic
systems](/bok/ai-defined#agentic-systems). (ch. 01, 11, 23)

**Agent Card.** The JSON document an A2A agent publishes, usually at `/.well-known/agent-card.json`,
describing its identity, skills, service endpoint and the authentication schemes it accepts. It can
be signed with JWS over a canonicalised form, so a client can check that the card is untampered and
comes from the claimed provider [129]. A peer allow-list admits only registered agents with verified
cards. See [ch. 23, Multi-agent systems and delegation
chains](/bok/governing-agents#multi-agent-systems-and-delegation-chains). (ch. 23)

**Agent registry.** The runtime-aware inventory of every non-human actor (model, service and agent),
each with an owner, a declared scope, a status and a kill switch, fed by a runtime data path rather
than typed by hand. It is the artefact that answers "what AI is running?". See [ch. 23, The agent
registry](/bok/governing-agents#the-agent-registry); [ch. 05, Pattern: Agent
Registry](/bok/patterns#pattern-agent-registry). (ch. 04, 05, 06, 23)

**AI Act (EU).** Regulation (EU) 2024/1689, the EU's horizontal, risk-tiered law for AI, amended by
the Digital Omnibus [2]. It classifies systems by risk (prohibited, high-risk, limited, minimal) and
imposes obligations accordingly. See [ch. 18, The Act and the
Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (ch. 08, 18)

**AI business operator (Korea).** Under the Korean AI Basic Act, a legal person, organisation,
individual or state body doing AI business, split into development business operators, who develop
and provide AI, and utilisation business operators, who offer products or services built on it [25].
See [ch. 18, The same roles across regimes](/bok/eu-ai-act#the-same-roles-across-regimes). (ch. 18, 21)

**AI governance committee.** The cross-functional body that takes the decisions a gate cannot:
accepting residual risk above a product owner's authority, granting exceptions, weighing value
trade-offs and approving the policy set. It decides; the pipeline's gates enforce its decisions and
record the evidence. US federal agencies run such boards by mandate [26]. See [ch. 12, The committee
decides, the gates enforce](/bok/governance-program#the-committee-decides-the-gates-enforce). (ch. 12)

**AI governance engineer.** The person who holds the capability of AI governance engineering and is
accountable for the three questions in production; a capability and a role, not necessarily a job
title. See [ch. 06, Capability first, title second](/bok/the-role#capability-first-title-second).
(ch. 06)

**AI governance engineering.** The application of engineering practice (systems thinking, product
thinking and code) to the governance of AI systems; measured by realised risk reduction and
audit-ready evidence. Contrast with [Trustworthy AI](/glossary/trustworthy-ai). See [ch. 01, The
definition](/bok/definition#the-definition). (ch. 01)

**AI harm.** A negative consequence of building or using an AI system for a person, a group, an
organisation, society or the environment. The book names each harm by the level it lands on, its
mechanism, a testable failure mode and the control that catches it, mapped to the MIT AI Risk
Repository taxonomy [27]. See [Harms atlas](/resources/harms). (ch. 03)

**AI hazard.** In the OECD's definition, an event or series of events where the development, use or
malfunction of an AI system could plausibly lead to an AI incident [28]. A hazard is harm that has
not happened yet; a near miss is a hazard a control interrupted. Contrast with [AI
incident](/glossary/ai-incident). See [ch. 17, Incident, hazard, issue and serious
incident](/bok/incidents#incident-hazard-issue-and-serious-incident). (ch. 17)

**AI incident.** In the OECD's definition, an event or series of events where the development, use
or malfunction of one or more AI systems directly or indirectly leads to harm to health, critical
infrastructure, human or fundamental rights, property, communities or the environment [28]. Contrast
with [Issue (versus incident)](/glossary/issue-versus-incident), [AI hazard](/glossary/ai-hazard)
and [Serious incident](/glossary/serious-incident). See [ch. 17, Incident, hazard, issue and serious
incident](/bok/incidents#incident-hazard-issue-and-serious-incident). (ch. 17)

**AI literacy.** Under the EU AI Act, the skills, knowledge and understanding that let providers,
deployers and affected persons use AI in an informed way and grasp its opportunities, risks and
possible harm. Article 4, as amended in 2026, requires providers and deployers to take measures to
support it, without guaranteeing any individual level [2]. See [ch. 18, AI literacy and
bias-detection data](/bok/eu-ai-act#ai-literacy-and-bias-detection-data); [ch. 12, AI literacy as
code](/bok/governance-program#ai-literacy-as-code). (ch. 12, 18)

**AI Office.** The European Commission body that supervises general-purpose AI and coordinates AI
Act enforcement, with investigation powers and the ability to levy penalties on GPAI providers [2].
See [ch. 18, Who supervises what](/bok/eu-ai-act#who-supervises-what). (ch. 08, 18)

**AI regulatory sandbox.** Under the EU AI Act, a controlled framework set up by a competent
authority in which providers develop, train, test and validate innovative AI systems for a limited
time under a sandbox plan, possibly with real-world testing. Each Member State must have one
operational by 2 Aug 2027 [2]. Contrast with [Testing in real-world
conditions](/glossary/testing-in-real-world-conditions). See [ch. 18, Sandboxes and real-world
testing](/bok/eu-ai-act#sandboxes-and-real-world-testing). (ch. 18, 21)

**AI RMF functions.** The four core functions of the NIST AI Risk Management Framework (**Govern,
Map, Measure, Manage**), used throughout the book as a mapping target for controls [3]. See [ch. 22,
The Core: 19 categories](/bok/principles-and-standards#the-core-19-categories). (ch. 08, 22)

**AI RMF Playbook.** NIST's online companion to the AI RMF. For each subcategory it gives an About
note, suggested actions, transparency and documentation questions and references [29]. It is
voluntary material to tailor, not a checklist; its documentation questions work well as acceptance
criteria. See [ch. 22, How a Playbook entry is
structured](/bok/principles-and-standards#how-a-playbook-entry-is-structured). (ch. 22)

**AI RMF profile.** An application of the AI RMF Core to a context. NIST describes use-case
profiles, temporal profiles (a current and a target profile whose gap guides the work) and
cross-sectoral profiles such as NIST AI 600-1 for generative AI [30]. See [ch. 22, Profiles and the
Generative AI Profile](/bok/principles-and-standards#profiles-and-the-generative-ai-profile). (ch. 22)

**AI system.** For governance, the object the AI definition brings into scope. Under the EU AI Act,
a machine-based system designed to operate with some autonomy, possibly adaptive after deployment,
that infers from its input how to generate outputs that can influence physical or virtual
environments [2][21]. Inference separates it from rule-based software. See [ch. 11, Four
definitions, compared](/bok/ai-defined#four-definitions-compared); [ch. 18, What counts as an AI
system](/bok/eu-ai-act#what-counts-as-an-ai-system). (ch. 11, 18)

**AI system impact assessment.** An assessment of how an AI system and its foreseeable applications
may affect individuals, groups and society, performed across the lifecycle and updated as needed;
ISO/IEC 42005:2025 gives the guidance [17]. Contrast with [FRIA](/glossary/fria). See [ch. 14,
Impact assessments compared](/bok/governing-development#impact-assessments-compared). (ch. 14)

**AI system lifecycle (OECD).** The OECD's iterative phases of an AI system: plan and design;
collect and process data; build or adapt models; test, evaluate, verify and validate; deploy;
operate and monitor; retire or decommission [31]. Retirement can happen at any point during
operation. See [ch. 22, The OECD AI system definition and
lifecycle](/bok/principles-and-standards#the-oecd-ai-system-definition-and-lifecycle). (ch. 22)

**AI washing.** Overstating or inventing the use or capability of AI in marketing or investor
communications. US regulators treat it as deception; the SEC settled charges against two investment
advisers over such claims in March 2024 [32]. See [ch. 20, Unfair and deceptive practices in the
United States](/bok/existing-law#unfair-and-deceptive-practices-in-the-united-states); [ch. 05,
Pattern: Claims Substantiation Gate](/patterns/claims-substantiation-gate). (ch. 05, 20)

**AIBOM.** AI bill of materials: the machine-readable inventory of an AI system's components
(models, datasets, dependencies) in formats such as CycloneDX ML-BOM or the SPDX 3.0 AI profile. See
[ch. 05, Pattern: AIBOM](/bok/patterns#pattern-aibom). (ch. 04, 05)

**AICM.** The CSA AI Controls Matrix, a control framework (v1.1, 247 control objectives across 18
domains) that maps to ISO 42001, ISO 27001 and NIST AI RMF and underpins STAR for AI [4]. See [ch.
08, CSA AICM and STAR for AI](/bok/regulatory-map#csa-aicm-and-star-for-ai). (ch. 08)

**AIMA.** The OWASP AI Maturity Assessment, reported at v1.0 (Aug 2025), which scores the breadth of
an AI security and governance programme across domains [5]. See [ch. 07, How this relates to
certification and other
assessments](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments). (ch. 07)

**AIMS.** An AI management system: the governance structure, roles, controls and
continual-improvement loop that ISO/IEC 42001 certifies. An AIMS is not the AI Act's Article 17
quality management system. Contrast with [QMS (Art. 17)](/glossary/qms-art-17). See [ch. 22, The
management-system trio](/bok/principles-and-standards#the-management-system-trio). (ch. 07, 08, 22)

**Algorithmic disgorgement.** A remedy that orders deletion of models or algorithms developed with
unlawfully obtained data, not only the data itself [33]. Complying, and proving it, requires lineage
from each dataset to every model trained on it. See [ch. 20, Claims substantiation and algorithmic
disgorgement](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement); [ch. 05,
Pattern: Training-Data Rights Ledger](/patterns/training-data-rights-ledger). (ch. 05, 20)

**Algorithmic Impact Assessment (AIA).** The assessment Canada's Directive on Automated
Decision-Making requires before a federal automated decision system goes into production. It sets an
impact level from I to IV that scales the required safeguards, is published on the Open Government
Portal and is updated when the system changes [34]. See [ch. 21, Canada: after AIDA, the Directive
on Automated
Decision-Making](/bok/ai-laws-worldwide#canada-after-aida-the-directive-on-automated-decision-making);
[ch. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared). (ch.
14, 21)

**Algorithmic management.** The use of automated monitoring and decision systems to direct, evaluate
or sanction workers. The EU Platform Work Directive limits the data such systems may process and
requires transparency, human oversight and a right to human review [35]. See [ch. 20,
Employment](/bok/existing-law#employment). (ch. 20)

**Algorithmic Transparency Recording Standard (ATRS).** The UK's standard template for public-sector
bodies to publish how and why they use algorithmic tools; mandatory for government departments and
for arm's-length bodies that deliver public or frontline services [36]. See [ch. 21, United Kingdom:
principles, regulators and public-sector
records](/bok/ai-laws-worldwide#united-kingdom-principles-regulators-and-public-sector-records).
(ch. 21)

**ALTAI.** The Assessment List for Trustworthy AI, published by the EU High-Level Expert Group on AI
in July 2020: a self-assessment checklist that turns the seven requirements of the 2019 Ethics
Guidelines into questions [37]. Useful as a source of candidate controls; answered once, it is only
an attestation. See [ch. 22, EU HLEG guidelines and
ALTAI](/bok/principles-and-standards#eu-hleg-guidelines-and-altai). (ch. 11, 22)

**Annex I (EU AI Act).** The AI Act annex listing the Union harmonisation legislation under which AI
is embedded in regulated products (machinery, medical devices, toys and the like); obligations for
these high-risk embedded systems phase in from 2 August 2028 under the Digital Omnibus timeline [2].
Contrast with [Annex III](/glossary/annex-iii). See [ch. 18, High-risk through products (Annex
I)](/bok/eu-ai-act#high-risk-through-products-annex-i). (ch. 08, 18)

**Annex III.** The AI Act annex listing high-risk use cases (biometrics, critical infrastructure,
education, employment, essential services, law enforcement, migration, justice); obligations for
these phase in under the Digital Omnibus timeline [2]. Contrast with [Annex I (EU AI
Act)](/glossary/annex-i-eu-ai-act). See [ch. 18, High-risk through use (Annex
III)](/bok/eu-ai-act#high-risk-through-use-annex-iii). (ch. 08, 18)

**Anonymous data.** Information that does not relate to an identifiable person, judged against all
the means reasonably likely to be used by anyone to identify them [38]. It falls outside the GDPR,
but the claim decays as auxiliary data and re-identification techniques improve, so it needs a dated
assessment. Contrast with [Pseudonymisation](/glossary/pseudonymisation). See [ch. 19, Anonymisation
versus pseudonymisation](/bok/privacy-and-ai#anonymisation-versus-pseudonymisation). (ch. 19)

**Article 6(3) filter.** The derogation under which an Annex III system is not high-risk when it
poses no significant risk of harm and meets one of four conditions (narrow procedural task,
improving completed human work, detecting patterns, preparatory task). Profiling of natural persons
always defeats it; the provider documents and registers the assessment [2]. Contrast with [Profiling
override](/glossary/profiling-override). See [ch. 18, The Annex III filter and the profiling
override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override); [Toolkit: EU AI Act role
and risk-class triage](/toolkit/ai-act-triage). (ch. 18)

**ASI01–ASI10.** The ten risks of the OWASP Top 10 for Agentic Applications 2026 [6]: ASI01 Agent
Goal Hijack, ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse, ASI04 Agentic
Supply Chain Vulnerabilities, ASI05 Unexpected Code Execution (RCE), ASI06 Memory & Context
Poisoning, ASI07 Insecure Inter-Agent Communication, ASI08 Cascading Failures, ASI09 Human-Agent
Trust Exploitation and ASI10 Rogue Agents. See [ch. 23, Threats mapped to
controls](/bok/governing-agents#threats-mapped-to-controls); [ch. 08, OWASP GenAI Security
Project](/bok/regulatory-map#owasp-genai-security-project). (ch. 05, 08, 23)

**ATLAS.** MITRE's Adversarial Threat Landscape for Artificial-Intelligence Systems, a knowledge
base of adversary tactics and techniques against AI, including agent-specific techniques [7]. See
[ch. 15, Threat modelling the deployed
system](/bok/governing-deployment#threat-modelling-the-deployed-system); [ch. 23, Threats mapped to
controls](/bok/governing-agents#threats-mapped-to-controls). (ch. 05, 10, 15, 23)

**Audit-ready evidence.** Evidence emitted as a by-product of the build in a form an auditor can
read directly (machine-readable, signed, timestamped), so the audit is a query, not a collection
project. See [ch. 01, Three clarifiers](/bok/definition#three-clarifiers). (ch. 01, 04)

**Authorised representative.** Under the EU AI Act, a person established in the Union with a written
mandate from a non-EU provider of a high-risk AI system or general-purpose AI model to carry out
that provider's obligations on its behalf, including keeping documentation available to authorities
[2]. See [ch. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (ch. 18)

**Automated decision-making (ADM).** A decision about a person taken by automated means. GDPR
Article 22 restricts decisions based solely on automated processing with legal or similarly
significant effects [38]; after the SCHUFA judgment, a score that lenders treat as determining is
itself such a decision [39]. See [ch. 19, GDPR Article 22 after
SCHUFA](/bok/privacy-and-ai#gdpr-article-22-after-schufa). (ch. 16, 19)

**Automation bias.** The tendency of a person to over-rely on an automated system's output. EU AI
Act Article 14 asks that people overseeing high-risk systems stay aware of it [2]; the human gate
logs approver, time to decide and override rate so that degrading oversight is visible. See [ch. 11,
Certainty required by risk tier](/bok/ai-defined#certainty-required-by-risk-tier); [ch. 04,
Designing human oversight (Article 14)](/bok/the-stack#designing-human-oversight-article-14); [ch.
23, What a good approval looks like](/bok/governing-agents#what-a-good-approval-looks-like). (ch.
04, 11, 23)

**Autonomy.** In the EU AI Act and OECD texts, some degree of independence of action from human
involvement, which almost every AI system has. ISO/IEC 22989 uses the word for a much stronger
property, a system that can change its own goal or domain of use, and calls the ordinary case
automation [40]. Contrast with [Autonomy level](/glossary/autonomy-level). See [ch. 11, ISO/IEC
22989](/bok/ai-defined#isoiec-22989). (ch. 11, 23)

**Autonomy level.** How far an agent acts without a person between its steps, set by the deployer as
a design decision rather than taken as a property of the model; one research scale names five levels
by the user's role, from operator to observer [122]. It is a registry field tied to a minimum
control set, and raising it is a reviewed change. Contrast with [Autonomy](/glossary/autonomy). See
[ch. 23, Autonomy is a design decision](/bok/governing-agents#autonomy-is-a-design-decision). (ch.
15, 17, 23)

## B

**Bias.** A systematic error that favours or disadvantages some people or outcomes. NIST sorts AI
bias into three categories: systemic, statistical and computational, and human [41]. Bias can enter
at any lifecycle stage, so it is tested per stage rather than once. Contrast with
[Fairness](/glossary/fairness). See [ch. 16, Where bias enters the
lifecycle](/bok/fairness-and-explainability#where-bias-enters-the-lifecycle). (ch. 16)

**Bias audit (NYC Local Law 144).** An independent audit, required within the year before an
employer uses an automated employment decision tool in New York City, that reports selection or
scoring rates and impact ratios by sex, race and ethnicity and their intersections; its summary must
be published [42]. See [ch. 20, Employment](/bok/existing-law#employment); [ch. 14, Impact
assessments compared](/bok/governing-development#impact-assessments-compared). (ch. 14, 20)

**Biometric data.** Personal data from the technical processing of physical, physiological or
behavioural traits that allows or confirms a person's unique identification, such as facial images
or fingerprints [38]. Identification, verification and categorisation are treated differently across
the GDPR, the AI Act and other laws. See [ch. 19, Biometrics](/bok/privacy-and-ai#biometrics). (ch. 19)

**Blameless post-mortem.** An incident review that identifies contributing causes without indicting
any individual or team, on the premise that people acted reasonably on what they knew and that
systems and processes are what can be fixed [43]. Its triggers are set in advance. See [ch. 17,
Techniques](/bok/incidents#techniques). (ch. 17)

**Blue-green deployment.** Two identical production environments with traffic switched between them,
so a release can be rolled back by switching back [44]. It gives an AI system a tested, instant path
to the previous version. Contrast with [Canary release](/glossary/canary-release). See [ch. 15,
Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[ch. 05, Pattern: Staged Rollout with Rollback
Criteria](/patterns/staged-rollout-rollback-criteria). (ch. 05, 15)

**Build provenance (SLSA).** A verifiable record, in the SLSA format, of what built an artefact, by
what process and from which top-level inputs. Its build levels run from L1, provenance exists,
through L2, signed by a hosted build platform, to L3, hardened builds whose provenance is very hard
to forge [136]. For a model, inputs include the base model's digest and dataset admission records.
Contrast with [Model signing](/glossary/model-signing). See [ch. 05, Pattern: Model Artefact
Integrity](/patterns/model-artefact-integrity). (ch. 05)

## C

**CAC (Cyberspace Administration of China).** China's internet regulator (国家互联网信息办公室), lead issuer
of the binding AI rules (algorithmic recommendation, deep synthesis, generative AI services and
AI-content labelling) and the body under whose guidance TC260 publishes the AI Safety Governance
Framework [18]. See [ch. 21, China: what chapter 08 does not already
cover](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover). (ch. 08, 21)

**Calibration.** The property that a model's confidence matches its accuracy: of the cases scored 0.9,
about nine in ten are right. Modern neural networks are often poorly calibrated [45], so calibration
is measured in the eval gate per version and subgroup before any threshold is trusted. Contrast with
[Calibration within groups](/glossary/calibration-within-groups). See [ch. 11, Calibration before
thresholds](/bok/ai-defined#calibration-before-thresholds). (ch. 11)

**Calibration within groups.** The fairness property that, in every group, the people given a score
s turn out positive at rate s, so a score means the same thing for everyone. It generally conflicts
with equal error rates when base rates differ [46]. Contrast with
[Calibration](/glossary/calibration) and [Equalised odds](/glossary/equalised-odds). See [ch. 16,
The impossibility results](/bok/fairness-and-explainability#the-impossibility-results). (ch. 16)

**Canary release.** A partial, time-limited deployment of a change to a small share of production
traffic, evaluated against a control group before the rollout continues [47]. For AI systems the
evaluation compares live quality, safety and fairness metrics with pre-registered rollback criteria.
Contrast with [Shadow deployment](/glossary/shadow-deployment) and [Blue-green
deployment](/glossary/blue-green-deployment). See [ch. 15, Progressive delivery as a
control](/bok/governing-deployment#progressive-delivery-as-a-control); [ch. 05, Pattern: Staged
Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria). (ch. 05, 14, 15, 23)

**CAPA.** Corrective and preventive action, the output of an incident review. The corrective action
fixes this instance; the preventive action stops the class of failure recurring across the fleet,
typically as a regression eval, a policy change and a risk-register update, verified before the
incident closes [48]. See [ch. 17, CAPA: from incident to risk register and eval
suite](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite). (ch. 17)

**Catastrophic forgetting.** The tendency of neural networks to lose earlier competence when trained
on new tasks [49]. It is a reason every retraining is a change event that re-runs the full eval
suite, not only the tests for the new capability. See [ch. 11, Eight characteristics that break
classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance). (ch. 11)

**Catastrophic-severity override.** The rule that any scenario rated at the top severity level is
Critical whatever its likelihood, cannot be accepted by the delivery team, and must be eliminated,
reduced in severity or accepted explicitly by the governing body for a fixed period. NIST asks that
such risks can be ceased safely [30]. See [ch. 13, The catastrophic-severity
override](/bok/risk-management#the-catastrophic-severity-override). (ch. 13)

**CE marking.** The mark showing a high-risk AI system's conformity with the EU AI Act, affixed
visibly, legibly and indelibly, or digitally for systems provided digitally, with the notified
body's number where one was involved [2]. Contrast with [EU declaration of
conformity](/glossary/eu-declaration-of-conformity). See [ch. 18, Conformity assessment,
declaration, marking and
registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration); [ch. 14,
EU AI Act conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order). (ch. 14, 18)

**Cedar.** An open-source policy language for fine-grained authorization, used as a policy-as-code
engine for runtime access decisions; a schema-typed, analysable alternative to `OPA/Rego`. Contrast
with [OPA/Rego](/glossary/opa-rego). See [ch. 06, Policy-as-code and
gates](/bok/the-role#policy-as-code-and-gates). (ch. 04, 05, 06)

**CEN-CENELEC JTC 21.** The joint technical committee of the European standardisation organisations
CEN and CENELEC that drafts the AI Act harmonised standards, including EN 18286 on quality
management and the drafts on risk management, trustworthiness and cybersecurity [50]. See [ch. 22,
The JTC 21 programme](/bok/principles-and-standards#the-jtc-21-programme). (ch. 22)

**CIMD.** Client ID Metadata Document: the mechanism by which an OAuth client identifies itself with
a URL, used as its client ID, that points to its metadata document. The MCP specification of
2026-07-28 has clients and authorisation servers support it and deprecates Dynamic Client
Registration [8]; the IETF specification is still an Internet-Draft (revision 02, 6 Jul 2026) as of
2026-09-24 [132]. See [ch. 23, MCP authorization as of
2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28); [ch. 04, Layer 04: Runtime
Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability). (ch. 04, 05, 23)

**Claims register.** The record of every public statement about an AI system's accuracy, fairness,
safety or capability: the exact wording, where it appears, and the eval run, measured value,
interval and population behind it. Copy carrying a claim whose evidence is missing, stale or failing
is not published; the FTC requires competent and reliable evidence for such claims when they are
made [139]. See [ch. 20, Claims substantiation and algorithmic
disgorgement](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement); [ch. 05,
Pattern: Claims Substantiation Gate](/patterns/claims-substantiation-gate). (ch. 05, 20)

**Classification decision record.** A versioned registry record of why a system sits on a given rung
of the AI Act risk ladder: the Annex III point, any Article 6(3) condition relied on, an explicit
profiling flag, the reviewer and the date [2]. It is re-evaluated whenever the intended purpose
changes. Contrast with [Profiling override](/glossary/profiling-override). See [ch. 18, The Annex
III filter and the profiling
override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override); [Toolkit: EU AI Act role
and risk-class triage](/toolkit/ai-act-triage). (ch. 18)

**Common specifications.** Technical specifications the Commission may adopt by implementing act
under AI Act Article 41 when a standardisation request is not accepted, the standards are late or
they insufficiently address fundamental-rights concerns; conforming with them also gives a
presumption of conformity [2]. Contrast with [Harmonised standard](/glossary/harmonised-standard).
See [ch. 22, How presumption of conformity
works](/bok/principles-and-standards#how-presumption-of-conformity-works). (ch. 22)

**Concept drift.** A change in the relationship between a system's inputs and the correct output, so
the same input should now get a different answer [51]. Unlike data drift, it shows only in outcomes:
in production it appears in performance on fresh labels and in change-point tests on the error rate.
Contrast with [Data drift](/glossary/data-drift). See [ch. 11, Contrast
pairs](/bok/ai-defined#contrast-pairs); [ch. 15, Drift: what moves and how to see
it](/bok/governing-deployment#drift-what-moves-and-how-to-see-it). (ch. 11, 15)

**Conformal prediction.** A distribution-free method that turns a trained model's output into a set
of candidate answers that contains the right one with a chosen probability [20]. A large set signals
uncertainty that a governance rule can route on. See [ch. 11, Calibration before
thresholds](/bok/ai-defined#calibration-before-thresholds). (ch. 11)

**Conformity assessment.** The procedure by which a provider shows a high-risk AI system meets the
EU AI Act before placing it on the market: internal control for most Annex III systems, a notified
body for some biometric systems, and the sectoral procedure for Annex I products [2]. It precedes
the declaration, CE marking and registration. See [ch. 18, Conformity assessment, declaration,
marking and
registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration); [ch. 14,
EU AI Act conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order). (ch. 14, 18)

**Content provenance (C2PA).** Signed, tamper-evident information about where a piece of content
came from and how it was edited, bound to the asset. The C2PA specification packages it as a
manifest of assertions, a claim and a claim signature [52]; NIST treats provenance tracking as one
approach to synthetic-content transparency [53]. Contrast with
[Watermarking](/glossary/watermarking) and [Data provenance](/glossary/data-provenance). See [ch.
20, Deepfakes and synthetic media](/bok/existing-law#deepfakes-and-synthetic-media). (ch. 18, 20)

**Contest path.** The route by which a person affected by an automated decision reaches a reviewer
who did not take the original decision, sees the inputs, the reasons and the person's
representations, and can change the outcome, with the result written back to the decision record. It
is how the right to contest in GDPR Article 22(3) is honoured in practice [38]. Contrast with
[Contestability](/glossary/contestability). See [ch. 19, GDPR Article 22 after
SCHUFA](/bok/privacy-and-ai#gdpr-article-22-after-schufa); [ch. 05, Pattern: Decision Notice &
Contest Path](/patterns/decision-notice-contest-path). (ch. 05, 19, 22)

**Contestability.** The ability of a person affected by an AI-supported decision to challenge it and
obtain a response that can change it. GDPR Article 22(3) gives a right to contest solely automated
decisions [38], and the OECD principles ask that people adversely affected can challenge an output
[31]. Contrast with [Recourse](/glossary/recourse) and [Contest path](/glossary/contest-path). See
[ch. 16, The legal hooks for
explanations](/bok/fairness-and-explainability#the-legal-hooks-for-explanations); [ch. 05, Pattern:
Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (ch. 05, 12, 16)

**Continuous assurance.** Assurance produced continuously from telemetry rather than at a point in
time; the control's status is a live query, not an annual sign-off. It is Level 5 of the maturity
model. See [ch. 05, Pattern: Continuous Assurance
Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry). (ch. 04, 05, 07)

**Contributing factor.** A property of a system or its context (autonomy, exposure, reversibility,
vulnerable groups, data sensitivity, opacity) that moves the likelihood or severity of a risk
without creating it [30]. It is captured as registry fields at intake so a policy can compute the
tier. Contrast with [Risk source](/glossary/risk-source). See [ch. 13, Contributing factors and the
use-case risk profile](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile).
(ch. 13)

**Controller and processor.** Under the GDPR the controller decides the purposes and means of
processing and carries most duties; the processor acts on its documented instructions [38]. An AI
vendor serving your inference is usually a processor, but becomes a controller for any use of your
data it decides on, such as training. Contrast with [Sub-processor](/glossary/sub-processor). See
[ch. 19, Controller, processor or joint
controller](/bok/privacy-and-ai#controller-processor-or-joint-controller). (ch. 19)

**Counterfactual explanation.** An explanation that states the smallest change to the input that
would have changed the outcome, restricted to features the person can actually change [54]. It is
the natural basis for recourse. Contrast with [Counterfactual
fairness](/glossary/counterfactual-fairness). See [ch. 16, Counterfactual
explanations](/bok/fairness-and-explainability#counterfactual-explanations). (ch. 16)

**Counterfactual fairness.** The requirement that a decision about an individual be the same in a
counterfactual world where the individual belonged to a different group, defined through a causal
model [55]; approximated in practice by counterfactual flip tests. Contrast with [Counterfactual
explanation](/glossary/counterfactual-explanation) and [Counterfactual flip
test](/glossary/counterfactual-flip-test). See [ch. 16, Individual and counterfactual
fairness](/bok/fairness-and-explainability#individual-and-counterfactual-fairness). (ch. 16)

**Counterfactual flip test.** A test that changes only a protected attribute in an input, or swaps
identity terms in otherwise identical prompts, and measures how often the outcome or the answer
quality changes. It is the practical approximation of counterfactual fairness [55] and runs in the
fairness eval suite. Contrast with [Counterfactual fairness](/glossary/counterfactual-fairness). See
[ch. 16, Individual and counterfactual
fairness](/bok/fairness-and-explainability#individual-and-counterfactual-fairness); [ch. 05,
Pattern: Fairness Eval Suite](/patterns/fairness-eval-suite). (ch. 05, 16)

## D

**Data card.** Structured, versioned documentation of a dataset (provenance, lawful basis, rights,
composition and known limitations) maintained as code alongside the system. Contrast with [Datasheet
for datasets](/glossary/datasheet-for-datasets). See [ch. 04, Data governance across the
stack](/bok/the-stack#data-governance-across-the-stack). (ch. 04)

**Data drift.** A change in the distribution of the inputs a system sees in production relative to
the data it was validated on, such as a new customer segment or a changed upstream form [51]. It
shows in the inputs before any label arrives, so it is monitored directly. Contrast with [Concept
drift](/glossary/concept-drift). See [ch. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (ch.
11, 15)

**Data lineage.** The record of how data moved and changed through an organisation's pipelines.
Backward lineage shows what fed a model; forward lineage shows which models used a dataset, which
erasure requests and licence withdrawals need. OpenLineage is an open standard for emitting it [56].
Contrast with [Data provenance](/glossary/data-provenance). See [ch. 14, Provenance versus
lineage](/bok/governing-development#provenance-versus-lineage). (ch. 14)

**Data minimisation.** The GDPR principle that personal data must be adequate, relevant and limited
to what the purpose needs [38]. For AI it is argued feature by feature, applied to training
snapshots, retrieval indexes, logs and eval sets, and evidenced by feature justifications and filter
logs. See [ch. 19, Minimisation, privacy by design and
PETs](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets). (ch. 19)

**Data provenance.** Information about the entities, activities and people involved in producing
data, used to judge its quality and trustworthiness [57]. In practice: where a dataset originally
came from and on what terms (source, licence, lawful basis). Perfect lineage over unknown provenance
is still ungoverned. Contrast with [Data lineage](/glossary/data-lineage). See [ch. 14, Provenance
versus lineage](/bok/governing-development#provenance-versus-lineage); [ch. 12, Updating the
policies you already have](/bok/governance-program#updating-the-policies-you-already-have). (ch. 12, 14)

**Dataset admission gate.** A pipeline control that lets a training job read only datasets whose
admission record is complete and signed by the data owner: lawful basis or licence, reservation
checks, quality results, provenance, permitted uses and retention. It evidences the data-governance
practices of AI Act Article 10 [2]. See [ch. 14, Owners, stewards and the admission
gate](/bok/governing-development#owners-stewards-and-the-admission-gate); [ch. 05, Pattern: Dataset
Admission Gate](/patterns/dataset-admission-gate). (ch. 05, 14)

**Datasheet for datasets.** Documentation that accompanies a dataset with its motivation,
composition, collection process, preprocessing, uses, distribution and maintenance, as proposed by
Gebru and colleagues [58]; the human-readable companion to the dataset admission record and the data
card. Contrast with [Data card](/glossary/data-card). See [ch. 14, Model cards, system cards and
datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets). (ch. 14)

**Decision notice.** The notice a person receives at the point of an automated or AI-assisted
decision, rendered from a versioned template and the decision record: that a system was used, the
principal reasons and what the person can do by when. Content follows each regime, such as notice of
use under AI Act Article 26(11) or reasons under US Regulation B [2][23]. Contrast with [Adverse
action notice](/glossary/adverse-action-notice). See [ch. 18, Deployer duties (Article
26)](/bok/eu-ai-act#deployer-duties-article-26); [ch. 05, Pattern: Decision Notice & Contest
Path](/patterns/decision-notice-contest-path). (ch. 05, 08, 18)

**Decision threshold.** The score above or below which an AI output triggers an action. It is where
risk appetite becomes behaviour, so it is governed as a policy with an owner, version and effective
date, tested in the eval gate and logged with every decision; the AI Act asks for declared accuracy
metrics [2]. See [ch. 11, A score is not a decision](/bok/ai-defined#a-score-is-not-a-decision).
(ch. 11)

**Decommissioning.** The planned retirement of an AI system: dependency analysis, fallback and
transition, sunset notices, a final evidence snapshot, archive or disposal of weights and data,
revocation of every identity, and a registry entry marked retired rather than deleted. NIST asks
that systems be phased out safely [29]. See [ch. 15, Retirement and
decommissioning](/bok/governing-deployment#retirement-and-decommissioning); [ch. 05, Pattern:
Deactivation, Localisation & Retirement
Runbook](/patterns/deactivation-localisation-retirement-runbook). (ch. 05, 15)

**Deepfake.** Under the EU AI Act, a deep fake is AI-generated or manipulated image, audio or video
content that resembles existing persons, objects, places, entities or events and would falsely
appear to a person to be authentic; deployers must disclose it, with lighter duties for evident art
or satire [2]. Contrast with [Content provenance (C2PA)](/glossary/content-provenance-c2pa). See
[ch. 20, Deepfakes and synthetic media](/bok/existing-law#deepfakes-and-synthetic-media); [ch. 18,
Transparency cases (Article 50)](/bok/eu-ai-act#transparency-cases-article-50). (ch. 18, 20)

**Delegation (OAuth token exchange).** In RFC 8693, the mode in which one party acts for another
while both stay identifiable: the token names the subject and, in its act claim, the current actor,
with nested act claims for earlier actors [123]. Under impersonation the actor becomes
indistinguishable from the subject. An agent should hold a delegated, narrower token, never the
user's own. Contrast with [Delegation chain](/glossary/delegation-chain) and [Token
passthrough](/glossary/token-passthrough). See [ch. 23, Delegation without
impersonation](/bok/governing-agents#delegation-without-impersonation). (ch. 23)

**Delegation chain.** The sequence of agents a task passes through from the person or system that
started it. It is governed so that each hop authenticates as itself, scope narrows or stays equal
but never widens, the purpose travels with the task, depth and fan-out are bounded, and one trace
spans every hop. Contrast with [Delegation (OAuth token
exchange)](/glossary/delegation-oauth-token-exchange). See [ch. 23, Accountability across
hops](/bok/governing-agents#accountability-across-hops). (ch. 23)

**Demographic parity.** A group fairness criterion that holds when the rate of positive decisions is
equal across groups; the adverse-impact ratio is its ratio form. It ignores differences in base
rates [59]. Contrast with [Equalised odds](/glossary/equalised-odds). See [ch. 16, Group fairness
metrics](/bok/fairness-and-explainability#group-fairness-metrics). (ch. 16)

**Deployer.** Under the EU AI Act, whoever uses an AI system under its own authority, other than in
a purely personal, non-professional activity [2]. For high-risk systems it follows the instructions
for use, staffs oversight, monitors, keeps logs, informs affected people and, in listed cases,
performs the FRIA. The label names a task, not a kind of organisation. Contrast with
[Provider](/glossary/provider). See [ch. 18, The EU operator
roles](/bok/eu-ai-act#the-eu-operator-roles); [ch. 18, Deployer duties (Article 26)](/bok/eu-ai-act#deployer-duties-article-26).
(ch. 15, 18)

**Deployment Decision Record (DDR).** The artefact that records the decision to deploy an AI system:
objective, the people it acts on, negative space, risk tier and obligations, per-group performance
floors, retirement conditions, owner and approver. It is committed with the system's code; its
floors become eval-gate thresholds. See [ch. 15, The Deployment Decision
Record](/bok/governing-deployment#the-deployment-decision-record). (ch. 15)

**Design defect.** In product liability, a defect inherent in the design of every unit, judged by
consumer expectations or by weighing risk against utility [60]. For AI: untested operating
conditions, a missing guardrail or missing oversight where a safer alternative was reasonably
available. Contrast with [Manufacturing defect](/glossary/manufacturing-defect). See [ch. 20, Defect
types mapped to AI failure modes](/bok/existing-law#defect-types-mapped-to-ai-failure-modes). (ch. 20)

**Differential privacy.** A mathematical guarantee that bounds how much any single person's record
can change the output of an analysis or a trained model, tuned by a privacy budget. Its strength
depends on the budget and on implementation choices that NIST calls privacy hazards [61]. See [ch.
19, Privacy-enhancing technologies and their honest
limits](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits). (ch. 19)

**Digital Omnibus.** The 2026 reform package amending the EU AI Act (in force 27 Jul 2026), which
adjusted the high-risk timeline, added AI Office investigation powers and reworked several articles
[2]. See [ch. 18, The Act and the Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (ch. 08, 18)

**Disparate impact.** A facially neutral practice that falls harder on a protected group. Under US
Title VII the employer must show the practice is job related and consistent with business necessity,
and loses if it refuses a less discriminatory alternative [62]. The EU counterpart is indirect
discrimination. Contrast with [Disparate treatment](/glossary/disparate-treatment) and [Indirect
discrimination](/glossary/indirect-discrimination). See [ch. 16, Disparate treatment and disparate
impact](/bok/fairness-and-explainability#disparate-treatment-and-disparate-impact); [ch. 20,
Disparate treatment, disparate impact and
proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies). (ch. 16, 20)

**Disparate treatment.** Treating a person less favourably because of a protected characteristic
such as race, sex or age, including through a feature or rule that deliberately stands in for it
[62]. The EU counterpart is direct discrimination [63]. Contrast with [Disparate
impact](/glossary/disparate-impact). See [ch. 16, Disparate treatment and disparate
impact](/bok/fairness-and-explainability#disparate-treatment-and-disparate-impact); [ch. 20,
Disparate treatment, disparate impact and
proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies). (ch. 16, 20)

**Distributor.** Under the EU AI Act, a person in the supply chain, other than the provider or the
importer, who makes an AI system available on the Union market. It checks the marking and documents
and holds back high-risk systems it believes do not conform [2]. Contrast with
[Importer](/glossary/importer). See [ch. 18, The EU operator
roles](/bok/eu-ai-act#the-eu-operator-roles). (ch. 18)

**Domestic representative (Korea).** A person with an address or office in Korea whom a foreign AI
business operator above thresholds set by decree must designate in writing. It submits safety
results, files high-impact confirmation requests and supports the high-impact measures [25][64]. See
[ch. 21, Domestic representative](/bok/ai-laws-worldwide#domestic-representative). (ch. 21)

**Downstream modifier (GPAI).** An actor that fine-tunes or otherwise modifies a general-purpose AI
model that someone else placed on the market. The Commission treats it as the provider of the
modified model only when the modification uses more than one third of the original training compute,
and limits its documentation, copyright-policy and training-summary duties to the modification; if
the original model has systemic risk, the modified model is presumed to have it too, with the
systemic-risk duties [65][76]. Contrast with [Downstream
provider](/glossary/downstream-provider). See [ch. 15, When a deployer becomes a
provider](/bok/governing-deployment#when-a-deployer-becomes-a-provider); [ch. 18, When a fine-tuner
becomes a GPAI provider](/bok/eu-ai-act#when-a-fine-tuner-becomes-a-gpai-provider). (ch. 15, 18)

**Downstream provider.** Under the EU AI Act, the provider of an AI system that integrates an AI
model, its own or one supplied by another entity. It relies on the model information that
general-purpose AI model providers must hand downstream [2]. Contrast with [Downstream modifier
(GPAI)](/glossary/downstream-modifier-gpai). See [ch. 18, The EU operator
roles](/bok/eu-ai-act#the-eu-operator-roles). (ch. 18)

**Downstream use register.** The record of every consumer of an AI system's outputs (a system, team,
partner or training pipeline), each with its approved use, the re-test that cleared the outputs for
that context and any contract, held against the producing system's registry entry. Access is granted
per registered consumer, and a model change or retirement is notified to all of them. See [ch. 15,
Secondary use and downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm);
[ch. 05, Pattern: Downstream Use Register](/patterns/downstream-use-register). (ch. 05, 15)

**DPIA.** Data Protection Impact Assessment: the GDPR Article 35 assessment of processing likely to
result in high risk to individuals [38], maintained in this discipline as a versioned artefact, not
a one-off document. Contrast with [FRIA](/glossary/fria). See [ch. 19, The DPIA for AI
systems](/bok/privacy-and-ai#the-dpia-for-ai-systems). (ch. 04, 05, 19)

**Drift.** The gradual divergence of a model's inputs, outputs or performance from its validated
baseline over time; a runtime signal that a control or eval must catch. The two kinds to tell apart
are data drift, in the inputs, and concept drift, in the input-to-answer relationship. Contrast with
[Data drift](/glossary/data-drift) and [Concept drift](/glossary/concept-drift). See [ch. 15, Drift:
what moves and how to see it](/bok/governing-deployment#drift-what-moves-and-how-to-see-it); [ch.
05, Pattern: Drift & Fairness Monitor](/patterns/drift-fairness-monitor); [ch. 17, AI-specific
failure modes](/bok/incidents#ai-specific-failure-modes). (ch. 04, 05, 11, 15, 16, 17)

**Dual use.** The capacity of the same AI capability to serve harmful ends as well as legitimate
ones, for example a toxicity model inverted to propose toxic molecules [66]. It is answered with
misuse threat models, red-team cases for harmful uses of legitimate capability and runtime
detection. See [ch. 11, Eight characteristics that break classic IT
governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance). (ch. 11)

**Duty holder.** Who an obligation legally binds (under the EU AI Act, the provider, the deployer or
both), as distinct from who enforces it; chapter 08 carries a duty-holder column so an engineer can
tell which artefacts their organisation is responsible for producing. See [ch. 18, Who you are in
the value chain](/bok/eu-ai-act#who-you-are-in-the-value-chain). (ch. 08, 18)

## E

**Effective challenge.** Critical analysis of a model by objective experts with the expertise,
independence and organisational standing to force change. The term comes from US model-risk
guidance, now SR 26-2 [67], and is borrowed for independent validation of AI systems. See [ch. 14,
Independent validation and model risk
management](/bok/governing-development#independent-validation-and-model-risk-management). (ch. 14)

**EN 18286.** The European standard for the AI Act's Article 17 quality management system, published
by CEN-CENELEC in July 2026 (the first JTC 21 AI Act standard to reach publication), but not yet
cited in the Official Journal as of 2026-09-24, so it confers no presumption of conformity [10]. See
[ch. 22, The JTC 21 programme](/bok/principles-and-standards#the-jtc-21-programme). (ch. 08, 22)

**Equalised odds.** A group fairness criterion that holds when true-positive and false-positive
rates are both equal across groups; equal opportunity is the weaker version that equalises only
true-positive rates [68]. Contrast with [Demographic parity](/glossary/demographic-parity). See [ch.
16, Group fairness metrics](/bok/fairness-and-explainability#group-fairness-metrics). (ch. 16)

**EU declaration of conformity.** The provider's signed statement, following AI Act Annex V, that a
high-risk AI system meets the Act's requirements; drawn up after the conformity assessment and kept
for 10 years [2]. Contrast with [CE marking](/glossary/ce-marking). See [ch. 18, Conformity
assessment, declaration, marking and
registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration). (ch. 18)

**Eval gate.** A pipeline stage that fails the build when an eval fails; the mechanism that turns an
evaluation into an enforced control rather than a report. See [ch. 05, Pattern: Eval Gate in
CI](/bok/patterns#pattern-eval-gate-in-ci). (ch. 04, 05)

**Evals.** Automated tests of a model's or agent's behaviour (capability, safety and adversarial),
run as controls, not as one-off research. See [ch. 04, Layer 03: Evals & Red Teaming as
Evidence](/bok/the-stack#layer-03-evals--red-teaming-as-evidence). (ch. 04)

**Evals as evidence.** The principle that the eval run *is* the assurance evidence: a failing eval
blocks the build and its structured result is stored as proof the control fired. See [ch. 03, 2.
Evals fail builds; reviews only
recommend](/bok/values-and-principles#2-evals-fail-builds-reviews-only-recommend). (ch. 03, 04)

**Evidence record.** The signed, structured record a control writes each time it decides: which
control, about which system version, what it decided, against which metric, threshold and
obligation, on which input, when and by whom. One shape for every control lets an audit run as a
query over one store [69]. See [ch. 05, Pattern: Continuous Assurance
Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry); [Templates and
schemas](/resources/templates). (ch. 05)

**Exception register.** A version-controlled list of approved exceptions, each tied to one rule and
one system, with justification, compensating controls, approver and expiry. The policy engine reads
it, so a release can pass under a live exception, the verdict says so, and the rule fails again once
the exception expires. Contrast with [Risk register](/glossary/risk-register). See [ch. 12, Risk
acceptance and exceptions](/bok/governance-program#risk-acceptance-and-exceptions). (ch. 12)

**Explainability.** In NIST's framing, a representation of the mechanisms behind a system's
operation: how a decision was made [30]. In practice a per-decision explanation such as feature
attributions, reason codes or a counterfactual. Contrast with [Transparency](/glossary/transparency)
and [Interpretability](/glossary/interpretability). See [ch. 16, Transparency, interpretability and
explainability](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[ch. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (ch. 11, 16)

**Explanation record.** The evidence artefact for one explained decision: model version, explanation
method and version, baseline, reason codes, counterfactual, template, audience and delivery, written
at decision time so the explanation can be reproduced when a person invokes a right to explanation
[2]. See [ch. 16, Explanation artefacts as evidence
records](/bok/fairness-and-explainability#explanation-artefacts-as-evidence-records); [ch. 05,
Pattern: Explanation Artefact](/patterns/explanation-artefact). (ch. 05, 16)

## F

**Failure posture.** What a guardrail, guardian agent or tool gateway does when it cannot reach a
decision: fail open lets the call through, fail closed blocks it. The reference guardian of the
OWASP Agent Control Standard starts at proceed unless set to deny [127]. The posture is a governance
decision, set per operation class and recorded in the agent's Policy Card. See [ch. 23, Runtime
guardrails for tool calls](/bok/governing-agents#runtime-guardrails-for-tool-calls). (ch. 23)

**Failure to warn.** In product liability, a defect in instructions or warnings about non-obvious
dangers [60]. For AI: undisclosed limitations or out-of-scope uses, which is why model cards and
instructions for use are versioned with each release. See [ch. 20, Duty to warn after
updates](/bok/existing-law#duty-to-warn-after-updates). (ch. 20)

**Fair use.** The US copyright defence that weighs four factors: purpose and transformativeness,
nature of the work, amount used and market effect [70]. Courts apply it to AI training case by case;
results so far turn on how the data was acquired and on each record. Contrast with [TDM
exception](/glossary/tdm-exception). See [ch. 20, US training cases,
dated](/bok/existing-law#us-training-cases-dated). (ch. 20)

**Fairness.** The property that a system's outcomes and errors do not unjustifiably disadvantage
people or groups. NIST lists "fair, with harmful bias managed" among its trustworthy characteristics
[30]; in practice fairness is a chosen, recorded metric (group, individual or counterfactual) with a
threshold, not a general claim. Contrast with [Bias](/glossary/bias). See [ch. 16, Choosing a
fairness metric by use
case](/bok/fairness-and-explainability#choosing-a-fairness-metric-by-use-case). (ch. 16)

**Fairness gerrymandering.** The failure in which a model satisfies a fairness constraint on each
predefined group but violates it on subgroups defined by combinations of attributes [71]; the reason
intersectional testing is needed. See [ch. 16, Intersectional and subgroup
testing](/bok/fairness-and-explainability#intersectional-and-subgroup-testing). (ch. 16)

**Fairness policy.** The per-system record, fixed before results are seen, of what fairness means
for that system: the protected attributes in each jurisdiction and where their values come from, the
chosen metric and why, the threshold, the minimum cell size, the multiple-comparison correction and
the approver. The fairness eval suite is judged against it. Contrast with
[Fairness](/glossary/fairness). See [ch. 16, Fairness and explainability in the
stack](/bok/fairness-and-explainability#fairness-and-explainability-in-the-stack); [ch. 05, Pattern:
Fairness Eval Suite](/patterns/fairness-eval-suite). (ch. 05, 16)

**Federated learning.** Training a model across devices or sites where the data lives, sharing model
updates instead of raw records [72]. It limits data movement but does not by itself hide personal
data, because shared updates can leak training examples. See [ch. 19, Privacy-enhancing technologies
and their honest
limits](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits). (ch. 19)

**Fine-tuning.** Further training of an existing model on new data to adapt it to a task or domain.
It changes the model, so it is a change event with its own evals; for general-purpose AI models, the
Commission treats a modifier as a provider only above one third of the original training compute
[65]. See [ch. 15, How it is adapted](/bok/governing-deployment#how-it-is-adapted); [ch. 18, When a
fine-tuner becomes a GPAI provider](/bok/eu-ai-act#when-a-fine-tuner-becomes-a-gpai-provider). (ch.
15, 18)

**Foundation model.** A model trained on broad data at scale and adaptable to a wide range of
downstream tasks [73]. Its defects are inherited by every system built on it, so organisations that
call or adapt one collect the provider's evidence and manage the pinned version as a change.
Contrast with [GPAI](/glossary/gpai) and [Frontier model](/glossary/frontier-model). See [ch. 11,
Foundation models and GPAI](/bok/ai-defined#foundation-models-and-gpai). (ch. 11)

**Four-fifths rule.** The US Uniform Guidelines rule of thumb that a group selection rate below 80%
of the highest group's rate will generally be regarded as evidence of adverse impact, qualified by
statistical and practical significance [24]. It is not a safe harbour: smaller gaps can still count.
See [ch. 16, The four-fifths rule and the adverse-impact
ratio](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio); [ch. 20,
Fairness measures the law recognises](/bok/existing-law#fairness-measures-the-law-recognises). (ch.
16, 20)

**Framework Convention on AI (CETS No. 225).** The Council of Europe's treaty on AI and human
rights, democracy and the rule of law, opened for signature in September 2024. It binds its Parties,
which decide how to reach private actors, and asks for risk and impact management and remedies [74].
See [ch. 22, Council of Europe Framework Convention (CETS No. 225)](/bok/principles-and-standards#council-of-europe-framework-convention-cets-no-225).
(ch. 22)

**Framework crosswalk.** A mapping of one framework's controls onto another's; useful as an index,
but a crosswalk proves you read the framework, not that the mapped control fires. See [ch. 05,
Pattern: Framework Crosswalk](/bok/patterns#pattern-framework-crosswalk). (ch. 05, 08)

**FRIA.** Fundamental Rights Impact Assessment: the AI Act Article 27 assessment of a high-risk
system's impact on rights [2], maintained here as a versioned, reviewable artefact. Contrast with
[DPIA](/glossary/dpia) and [AI system impact assessment](/glossary/ai-system-impact-assessment). See
[ch. 18, Fundamental rights impact assessment (Article 27)](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27);
[ch. 05, Pattern: FRIA-as-Code](/bok/patterns#pattern-fria-as-code). (ch. 04, 05, 18)

**Frontier model.** A general-purpose model at or near the capability frontier. Laws draw the line
by training compute: California's SB 53, for example, covers models trained with more than 10^26
operations [14]. Frontier-developer laws ask for a published safety framework and incident reporting
[12]. Contrast with [Foundation model](/glossary/foundation-model). See [ch. 21, Provenance,
training data and frontier
developers](/bok/ai-laws-worldwide#provenance-training-data-and-frontier-developers); [ch. 08,
Frontier-developer laws](/bok/regulatory-map#frontier-developer-laws). (ch. 08, 21)

**Fulfilment record.** The per-request record of how a data-subject request was honoured wherever
the person's data sits, from source systems, snapshots, retrieval indexes, logs and eval sets to
model weights: the action in each, the model versions affected, any scheduled retrain and whether
the GDPR deadline of one month, extendable by two, was met [38]. See [ch. 19, Recording how a
request was honoured](/bok/privacy-and-ai#recording-how-a-request-was-honoured); [ch. 05, Pattern:
Rights Requests Against Models](/patterns/rights-requests-against-models). (ch. 05, 08, 19)

**Function creep.** The gradual reuse of personal data or an AI system for purposes nobody approved,
usually by configuration rather than a new release. For personal data it breaches purpose limitation
unless a compatibility assessment or new basis covers the new use [38]; negative space in the
deployment record makes it detectable. See [ch. 19, Purpose limitation and function
creep](/bok/privacy-and-ai#purpose-limitation-and-function-creep); [ch. 15, Secondary use and
downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm); [ch. 05, Pattern:
Downstream Use Register](/patterns/downstream-use-register). (ch. 05, 14, 15, 19)

## G

**Generative AI.** AI that outputs new content (text, images, audio, video, code) rather than an
estimate about something that exists. Its distinctive risks include confabulation, information
integrity, intellectual property and abusive synthetic content [75]; its evidence is groundedness,
refusal and red-team evals and content marking. Contrast with [Predictive
AI](/glossary/predictive-ai). See [ch. 11, Predictive versus
generative](/bok/ai-defined#predictive-versus-generative). (ch. 11)

**Go/no-go decision.** The signed release decision for one system version, taken by named reviewer
roles against a checklist whose items each link the record that answers them. NIST frames it as the
determination whether development or deployment should proceed [30]; the pipeline deploys only on a
go. See [ch. 14, The go/no-go gate](/bok/governing-development#the-gono-go-gate). (ch. 14)

**Governance-as-code.** Governance rules expressed as executable code that evaluates pull requests,
deployments and runtime calls and returns a decision; the umbrella term of which policy-as-code is
the CI/CD subset. Contrast with [Policy-as-code](/glossary/policy-as-code). See [ch. 04, Layer 01:
Govern-as-Code](/bok/the-stack#layer-01-govern-as-code). (ch. 03, 04)

**GPAI.** General-purpose AI model: under the AI Act, a model that shows significant generality, can
competently perform a wide range of distinct tasks and can be integrated into many downstream
systems [2]. The Commission's indicative criterion is training compute above 10^23 FLOP [76]. The AI
Office enforces GPAI duties from 2 Aug 2026. Contrast with [Foundation
model](/glossary/foundation-model). See [ch. 18, General-purpose AI
models](/bok/eu-ai-act#general-purpose-ai-models); [ch. 11, Foundation models and
GPAI](/bok/ai-defined#foundation-models-and-gpai). (ch. 08, 11, 18)

**GPAI Code of Practice.** The voluntary instrument (published 10 July 2025) that general-purpose-AI
providers use to demonstrate compliance with their AI Act obligations until harmonised standards
exist; three chapters: Transparency, Copyright, and Safety and Security (the last for systemic-risk
models) [16]. See [ch. 08, GPAI Code of Practice](/bok/regulatory-map#gpai-code-of-practice); [ch.
18, The Code of Practice and enforcement](/bok/eu-ai-act#the-code-of-practice-and-enforcement). (ch.
08, 18)

**Graduated degradation.** Pre-built, tested operating modes short of switching an AI system off:
advice-only, raised confidence thresholds, grounded-only answers, disabling for one group, language
or region, and a return to the pilot cohort. Each is an operational toggle with a named trigger
[77]. Contrast with [Kill switch](/glossary/kill-switch). See [ch. 15, Graduated
degradation](/bok/governing-deployment#graduated-degradation); [ch. 05, Pattern: Deactivation,
Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook). (ch. 05,
15, 23)

**Guardian agent.** An AI agent whose job is to supervise, check or constrain other agents at
runtime; Gartner predicts guardian-agent technologies will account for at least 10 to 15% of agentic
AI markets by 2030 [9]. Contrast with [Guardrail](/glossary/guardrail). See [ch. 04, Layer 04:
Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability); [ch. 23,
Runtime guardrails for tool calls](/bok/governing-agents#runtime-guardrails-for-tool-calls). (ch.
04, 23)

**Guardrail.** A runtime control that inspects or mediates a model's or agent's inputs, outputs or
tool calls and blocks, rewrites or escalates what breaks a policy, logging each decision as
evidence. Guardrails are deterministic code or classifiers in the call path, unlike a guardian
agent, which is itself an AI system. Contrast with [Guardian agent](/glossary/guardian-agent). See
[ch. 05, Pattern: Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail); [ch. 23, Runtime
guardrails for tool calls](/bok/governing-agents#runtime-guardrails-for-tool-calls). (ch. 04,
05, 23)

## H

**Hallucination.** Generative output that is stated confidently but is false or unsupported by its
sources; NIST's generative AI profile calls it confabulation and lists it among the risks generative
AI creates or worsens [75]. Groundedness and citation checks are the usual evidence against it.
Contrast with [Regurgitation](/glossary/regurgitation). See [ch. 17, AI-specific failure
modes](/bok/incidents#ai-specific-failure-modes); [ch. 11, Predictive versus
generative](/bok/ai-defined#predictive-versus-generative). (ch. 11, 17)

**Harmonised standard.** A European standard adopted on a Commission standardisation request. Under
the AI Act, conformity with one whose reference is published in the Official Journal gives a
presumption of conformity with the requirements it covers; publication by CEN-CENELEC alone does not
[2]. As of 2026-09-24, none is yet cited [10]. Contrast with [Common
specifications](/glossary/common-specifications) and [Harmonized Structure
(ISO)](/glossary/harmonized-structure-iso). See [ch. 22, How presumption of conformity
works](/bok/principles-and-standards#how-presumption-of-conformity-works). (ch. 08, 22)

**Harmonized Structure (ISO).** The common clause layout and core text shared by ISO
management-system standards such as ISO/IEC 42001, 27001 and 27701 and ISO 9001, which lets one
integrated management system meet several of them [78]. Not to be confused with an EU harmonised
standard. Contrast with [Harmonised standard](/glossary/harmonised-standard). See [ch. 22,
Integrating with 27001, 27701 and
9001](/bok/principles-and-standards#integrating-with-27001-27701-and-9001). (ch. 22)

**Hidden Context Exposure.** LLM08:2026 in the OWASP LLM Top 10, which replaced System Prompt
Leakage: extracting, inferring or reconstructing the hidden context a model sees, such as system
prompts, developer instructions, retrieved policy text and tool schemas [128]. The advice is to
assume hidden context is discoverable, keep credentials out of it and never rely on it as a security
boundary. Contrast with [Prompt injection](/glossary/prompt-injection). See [ch. 23, Prompts as
configuration under change
control](/bok/governing-agents#prompts-as-configuration-under-change-control). (ch. 23)

**High-impact AI (Korea).** Under Korea's AI Basic Act, an AI system that may significantly affect
life, physical safety or fundamental rights and is used in a listed area such as health care, hiring
and loan screening, biometric analysis, transport or public-service decisions. It triggers
risk-management, explanation, human-oversight and record-keeping duties [25]. Contrast with
[High-risk AI system](/glossary/high-risk-ai-system). See [ch. 21, High-impact AI and how it is
confirmed](/bok/ai-laws-worldwide#high-impact-ai-and-how-it-is-confirmed). (ch. 21)

**High-risk AI system.** Under the EU AI Act, an AI system that is a safety component of, or itself,
a product under Annex I legislation needing third-party conformity assessment, or that is used in an
Annex III area, unless the Article 6(3) filter applies. It carries the Articles 8 to 15 requirements
and provider and deployer duties [2]. Contrast with [Prohibited
practice](/glossary/prohibited-practice), [High-impact AI (Korea)](/glossary/high-impact-ai-korea)
and [Risk tier](/glossary/risk-tier). See [ch. 18, The risk ladder](/bok/eu-ai-act#the-risk-ladder).
(ch. 18)

**Hiroshima Code of Conduct.** The G7's voluntary International Code of Conduct for Organizations
Developing Advanced AI Systems (October 2023): 11 actions covering lifecycle risk evaluation,
post-deployment monitoring, public reporting, incident sharing, governance policies, security,
provenance and data protection [79]. See [ch. 22, G7 Hiroshima
Process](/bok/principles-and-standards#g7-hiroshima-process). (ch. 22)

**Holding statement.** A short public statement prepared in skeleton before any incident: what
happened as far as it is known, what has been done to contain it, what affected people should do,
and when the next update will come. It never speculates about cause. See [ch. 15, External
communications](/bok/governing-deployment#external-communications); [ch. 05, Pattern: Disclosure &
Notification Pipeline](/patterns/disclosure-notification-pipeline). (ch. 05, 15)

**HUDERIA.** The Council of Europe's non-binding methodology for assessing the risks and impacts of
AI systems on human rights, democracy and the rule of law [80]. Parties to the Framework Convention
may use or adapt it. See [ch. 22, What the Convention asks for, and what it changes in the
stack](/bok/principles-and-standards#what-the-convention-asks-for-and-what-it-changes-in-the-stack).
(ch. 22)

**Human oversight.** The measures that let natural persons understand, monitor and, when needed,
override or stop a high-risk AI system, required by AI Act Article 14, including awareness of
automation bias and a way to halt the system safely [2]. Engineered as gates, review tooling and
override drills that leave records. See [ch. 04, Designing human oversight (Article
14)](/bok/the-stack#designing-human-oversight-article-14); [ch. 23, What a good approval looks
like](/bok/governing-agents#what-a-good-approval-looks-like). (ch. 04, 11, 23)

**Human-in-command (HIC).** The oversight mode, named by the EU High-Level Expert Group, in which
people oversee the overall activity of an AI system and decide when and whether to use it in a given
situation [81]. Contrast with [Human-on-the-loop (HOTL)](/glossary/human-on-the-loop-hotl). See [ch.
11, From definition element to registry
field](/bok/ai-defined#from-definition-element-to-registry-field). (ch. 11)

**Human-in-the-loop (HITL).** The oversight mode in which a person can intervene in every decision
cycle of an AI system [81]; in engineering terms, a gate that holds each consequential action until
a named approver decides, logging approver, time to decide and override. Contrast with
[Human-on-the-loop (HOTL)](/glossary/human-on-the-loop-hotl). See [ch. 05, Pattern:
Human-in-the-loop Gate](/bok/patterns#pattern-human-in-the-loop-gate); [ch. 11, From definition
element to registry field](/bok/ai-defined#from-definition-element-to-registry-field); [ch. 23,
Human checkpoints and approval design](/bok/governing-agents#human-checkpoints-and-approval-design).
(ch. 05, 11, 23)

**Human-on-the-loop (HOTL).** The oversight mode in which a person can intervene in the design cycle
and monitors the system's operation, rather than approving each decision [81]. The system acts;
people watch the signals and can stop it, so the stop path and the alerting are what must be tested.
Contrast with [Human-in-the-loop (HITL)](/glossary/human-in-the-loop-hitl) and [Human-in-command
(HIC)](/glossary/human-in-command-hic). See [ch. 11, From definition element to registry
field](/bok/ai-defined#from-definition-element-to-registry-field). (ch. 11)

## I

**Implicit deny.** The authorisation rule that a request no policy explicitly permits is refused.
Cedar denies by default and lets any matching forbid override every permit [141]; an agent's tool
allow-list works the same way, so an unlisted tool is blocked without a rule of its own. See [ch.
23, The tool allow-list](/bok/governing-agents#the-tool-allow-list); [Toolkit: Policy Card
builder](/toolkit/policy-card#pc-engines). (ch. 08, 23)

**Importer.** Under the EU AI Act, a person established in the Union who places on the market an AI
system bearing the name or trademark of a provider established outside the Union. It must verify the
provider's conformity work before placing a high-risk system on the market [2]. Contrast with
[Distributor](/glossary/distributor). See [ch. 18, The EU operator
roles](/bok/eu-ai-act#the-eu-operator-roles). (ch. 18)

**Indirect discrimination.** The EU counterpart of disparate impact: an apparently neutral criterion
that puts a protected group at a particular disadvantage, unlawful unless objectively justified by a
legitimate aim pursued by appropriate and necessary means [63]. Contrast with [Disparate
impact](/glossary/disparate-impact). See [ch. 20, Disparate treatment, disparate impact and
proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies). (ch. 20)

**Inference (AI Act sense).** The capability to derive outputs from input by learning from data or
reasoning over encoded knowledge, rather than by executing rules people wrote. The Commission treats
it as the indispensable condition that separates an AI system from conventional software [21]. See
[ch. 11, EU AI Act Article 3(1) and the Commission
guidelines](/bok/ai-defined#eu-ai-act-article-31-and-the-commission-guidelines). (ch. 11)

**Inferred sensitive data.** Sensitive information a system derives from ordinary inputs (health
from purchases, beliefs from behaviour) or carries through a proxy feature. Washington's My Health
My Data Act covers health data derived by algorithms or machine learning [82]; proxy tests and
inference policies make it checkable. Contrast with [Special category
data](/glossary/special-category-data). See [ch. 19, Inferred and proxy sensitive
data](/bok/privacy-and-ai#inferred-and-proxy-sensitive-data). (ch. 19)

**Inherent risk.** The likelihood and severity rating of a risk scenario before any control is
counted. The gap between inherent and residual risk is the value claimed for the controls, and must
be backed by their evidence [30]. Contrast with [Residual risk](/glossary/residual-risk). See [ch.
13, Inherent risk, residual risk and who accepts
it](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it). (ch. 13)

**Instructions for use.** The information a provider of a high-risk AI system must give deployers:
intended purpose, declared accuracy and robustness, known risks, how to read the output, human
oversight measures, maintenance and logging [2]. Best generated from the registry entry and test
report, so the numbers match the evidence. See [ch. 14, The technical
file](/bok/governing-development#the-technical-file). (ch. 14, 18)

**Intended purpose.** The use for which the provider intends an AI system, including its specific
context and conditions of use [2]. Most high-risk duties are measured against it, so it is a field
of the use-case record that classification, tests and instructions for use read. A model moved to a
new purpose is, for risk, a new system. Contrast with [Reasonably foreseeable
misuse](/glossary/reasonably-foreseeable-misuse). See [ch. 14, The use-case
record](/bok/governing-development#the-use-case-record); [ch. 11, From definition element to
registry field](/bok/ai-defined#from-definition-element-to-registry-field). (ch. 11, 14)

**Internal reporting channel.** A confidential route for staff and contractors to raise concerns
about AI systems outside the chain of command, with statutory clocks encoded (under the EU
Whistleblower Directive, acknowledgment within seven days and feedback within three months) and
protection against retaliation [83]. See [ch. 12, A channel for raising
concerns](/bok/governance-program#a-channel-for-raising-concerns). (ch. 12)

**Interpretability.** In NIST's framing, the meaning of a system's output in the context of its
purpose: why a decision was made and what it means to the user [30]. An inherently interpretable
model, such as a scorecard or a shallow tree, is its own explanation. Contrast with
[Explainability](/glossary/explainability). See [ch. 16, Transparency, interpretability and
explainability](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[ch. 16, Interpretable by design or explained after the
fact](/bok/fairness-and-explainability#interpretable-by-design-or-explained-after-the-fact). (ch. 16)

**ISO/IEC 22989.** The ISO/IEC standard (2022) that establishes AI concepts and terminology for use
by other standards and by diverse stakeholders [40]. Naming registry fields after its vocabulary
reduces translation when auditing against the SC 42 family. See [ch. 22, Foundations and
vocabulary](/bok/principles-and-standards#foundations-and-vocabulary). (ch. 11, 22)

**ISO/IEC 42001.** The ISO/IEC standard (2023) that specifies requirements for an AI management
system, certifiable by accredited bodies [48]. As of 2026-09-24 it is not a harmonised standard
under the AI Act, so certification gives no presumption of conformity [10]. See [ch. 22, The
management-system trio](/bok/principles-and-standards#the-management-system-trio); [ch. 08, ISO/IEC
42001, 42005 and 42006](/bok/regulatory-map#isoiec-42001-42005-and-42006). (ch. 07, 08, 22)

**ISO/IEC 42005.** ISO/IEC 42005:2025, the AI system impact-assessment standard (a companion to the
AI Act's Article 27 FRIA and to ISO/IEC 42001 Annex A.5), giving a structured method for assessing
an AI system's impacts on people and society [17]. See [ch. 08, ISO/IEC 42001, 42005 and
42006](/bok/regulatory-map#isoiec-42001-42005-and-42006); [ch. 14, Impact assessments
compared](/bok/governing-development#impact-assessments-compared). (ch. 08, 14)

**Issue (versus incident).** A defect, deviation or control weakness that has not produced a harmful
event, such as an eval regression in staging or a drift alert. It is tracked to closure with an
owner and a due date and starts no legal clock; most issues are nonconformities in management-system
terms [48]. Contrast with [AI incident](/glossary/ai-incident). See [ch. 17, Incident, hazard, issue
and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident). (ch. 17)

## J

**Jailbreak.** A prompt crafted to make a model disregard its safety instructions entirely. OWASP
treats jailbreaking as a form of prompt injection [84]; it is tested with red-team suites in the
eval gate and contained at runtime by guardrails that do not depend on the model's own refusals.
Contrast with [Prompt injection](/glossary/prompt-injection). See [ch. 14, The test-type
matrix](/bok/governing-development#the-test-type-matrix). (ch. 14, 17)

**JSON Schema.** A vocabulary for describing the structure of JSON documents so a validator can
check them: which fields exist, which are required, their types and allowed values [85]. The
templates library publishes one draft 2020-12 schema per governance record, so a record either
validates or fails the build. See [ch. 05, Pattern: Machine-Readable Evidence
(OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal); [Templates and
schemas](/resources/templates). (ch. 05)

**Justification memo.** The intake record for an AI use case: the problem, the non-AI alternative,
the measurable benefit, who bears errors and how they contest them, reversibility and kill criteria.
It answers "should AI be used at all" before a system reaches a gate, the go/no-go determination
NIST places early [30]. See [ch. 12, Strategy, value and whether to use AI at
all](/bok/governance-program#strategy-value-and-whether-to-use-ai-at-all). (ch. 12)

## K

**Key risk indicator (KRI).** A metric that shows whether a risk is moving towards the edge of
appetite (unregistered AI found, open exceptions by age, override rates), as distinct from a key
performance indicator, which shows whether the programme is doing its job. See [ch. 12, KPIs and
KRIs for leadership and the
board](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board). (ch. 12)

**Kill switch.** A tested mechanism to stop an agent or system from acting; a precondition of
granting autonomy, registered against the agent's identity. Contrast with [Graduated
degradation](/glossary/graduated-degradation). See [ch. 05, Pattern: Kill Switch / Circuit
Breaker](/bok/patterns#pattern-kill-switch--circuit-breaker); [ch. 23, Kill switch and per-agent
circuit breakers](/bok/governing-agents#kill-switch-and-per-agent-circuit-breakers). (ch. 03,
05, 23)

## L

**Large language model (LLM).** A foundation model for language, usually served from a data centre
behind an API. Because calls pass through a gateway, runtime controls (tracing, filtering, stopping)
can sit centrally [86]. Contrast with [Small language model
(SLM)](/glossary/small-language-model-slm). See [ch. 11, LLMs and
SLMs](/bok/ai-defined#llms-and-slms). (ch. 11)

**Latent disclosure.** Under California's AI Transparency Act, provenance information embedded in
AI-generated image, video or audio so that it persists and can be read by a detection tool, as
opposed to a visible label shown to the user [87]. Contrast with
[Watermarking](/glossary/watermarking). See [ch. 21, Provenance, training data and frontier
developers](/bok/ai-laws-worldwide#provenance-training-data-and-frontier-developers). (ch. 21)

**Lawful basis.** One of the six grounds in GDPR Article 6 that make processing of personal data
lawful: consent, contract, legal obligation, vital interests, public task and legitimate interests
[38]. For AI, each processing moment (training, retrieval, inference, logging) needs its own basis,
recorded per dataset and stage. See [ch. 19, Lawful basis for training versus
inference](/bok/privacy-and-ai#lawful-basis-for-training-versus-inference). (ch. 19)

**Least agency.** The principle, in the OWASP agentic list, of giving an agent no more autonomy than
its task needs: agentic behaviour deployed where it is not needed widens the attack surface without
adding value [6]. The cheapest agent control is the agent not built, such as a fixed workflow with
one model call in place of a planner. Contrast with [Autonomy level](/glossary/autonomy-level). See
[ch. 23, Governing AI agents](/bok/governing-agents). (ch. 23)

**Legitimate-interest assessment (LIA).** The documented three-step test for relying on legitimate
interests: a lawful, precise and present interest; processing necessary for it; and a balance not
overridden by people's rights and reasonable expectations [88]. Kept as a versioned artefact that
points each mitigation at the control implementing it. See [ch. 19, Legitimate interests and the
three-step test](/bok/privacy-and-ai#legitimate-interests-and-the-three-step-test). (ch. 19)

**LIME.** Local Interpretable Model-agnostic Explanations: explains one prediction by fitting a
simple interpretable model to the black box's behaviour on perturbed samples around the input [89];
vulnerable to off-manifold manipulation. Contrast with [SHAP](/glossary/shap). See [ch. 16, Feature
attribution: SHAP, LIME and integrated
gradients](/bok/fairness-and-explainability#feature-attribution-shap-lime-and-integrated-gradients).
(ch. 16)

**Localisation (by jurisdiction).** Controlling where an AI system runs and which features it offers
in each jurisdiction, with per-jurisdiction rule sets as code, regional instances where residency
requires them and feature flags by region, so one market can be switched off without touching the
others. A system launches in a jurisdiction only once its duties there are shown to be met. See [ch.
15, Localisation by jurisdiction](/bok/governing-deployment#localisation-by-jurisdiction); [ch. 05,
Pattern: Deactivation, Localisation & Retirement
Runbook](/patterns/deactivation-localisation-retirement-runbook). (ch. 05, 12, 15)

**Loss of control.** One of the systemic risks the GPAI Code of Practice specifies: risks from
humans losing the ability to reliably direct, modify or shut down a model, which may emerge from
misalignment, self-replication, deception, resistance to goal modification or power-seeking [95].
Signatories assess it for models with systemic risk; a deployer of agents asks how autonomy and tool
use were evaluated. See [ch. 23, EU AI Act hooks for
agents](/bok/governing-agents#eu-ai-act-hooks-for-agents); [ch. 08, GPAI Code of
Practice](/bok/regulatory-map#gpai-code-of-practice). (ch. 08, 23)

## M

**Machine learning.** The branch of AI in which a system improves at a task by learning patterns
from data rather than by following rules people wrote. ISO/IEC 22989 groups its approaches into
supervised, unsupervised, semi-supervised and reinforcement learning [40]. See [ch. 11, By learning
paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Machine unlearning.** Techniques that remove a training record's influence from a model without
full retraining. Exact methods retrain an affected shard [90]; approximate methods adjust weights
and are hard to verify, so an unlearning claim is tested with membership-inference or extraction
evals. Contrast with [Output suppression](/glossary/output-suppression). See [ch. 19, Suppression,
retraining and unlearning](/bok/privacy-and-ai#suppression-retraining-and-unlearning); [ch. 05,
Pattern: Rights Requests Against Models](/patterns/rights-requests-against-models). (ch. 05, 19)

**Machine-readable evidence.** Evidence a machine can query, diff and aggregate (`OSCAL` artefacts,
structured eval results, signed logs), as opposed to screenshots and exported spreadsheets. See [ch.
05, Pattern: Machine-Readable Evidence
(OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal). (ch. 03, 04, 05)

**Major ICT-related incident (DORA).** Under the EU Digital Operational Resilience Act, an
ICT-related incident at a financial entity that meets the classification criteria for a major
incident. It is reported within 4 hours of classification and no later than 24 hours from awareness
(within 4 hours of a classification made after those 24 hours), then in intermediate and final
reports [91]. See [ch. 17, The overlapping
clocks](/bok/incidents#the-overlapping-clocks). (ch. 17)

**Manufacturing defect.** In product liability, a departure of a unit from its own design [60]. For
AI: the wrong model version, corrupted weights, a misconfigured guardrail or a broken data pipeline
in the deployed system. Contrast with [Design defect](/glossary/design-defect). See [ch. 20, Defect
types mapped to AI failure modes](/bok/existing-law#defect-types-mapped-to-ai-failure-modes). (ch. 20)

**Market surveillance authority.** The national authority designated to enforce the AI Act for
products placed on its market, with powers to investigate, demand documentation and require
corrective action. See [ch. 18, Who supervises what](/bok/eu-ai-act#who-supervises-what). (ch. 08, 18)

**Maturity floor.** The single overall maturity level of an AI governance function: the level of its
weakest stack layer. It is a floor for planning, not a verdict on the whole function. The per-layer
profile shows where the leverage is, and the next move is the next criterion in the weakest layer.
See [ch. 07, Observable criteria by layer and
level](/bok/maturity-model#observable-criteria-by-layer-and-level); [Toolkit: Maturity
self-check](/toolkit/maturity-self-check). (ch. 07)

**MCP.** Model Context Protocol: an open protocol for connecting AI applications to tools and data
sources; its 2026 specification adds OAuth 2.1 resource-server patterns and issuer-bound credentials
for agent authorisation [8]. It secures the hop between one client and one server; which agent sits
behind the client is for a workload identity to say. Contrast with [A2A (Agent2Agent
protocol)](/glossary/a2a-agent2agent-protocol). See [ch. 23, MCP authorization as of
2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28); [ch. 04, Layer 04: Runtime
Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability). (ch. 04, 05, 23)

**Membership inference.** An attack that determines whether a specific person's record was in a
model's training set from the model's behaviour [92]. The EDPB counts resistance to it among the
evidence for claiming a model is anonymous. Contrast with [Model
inversion](/glossary/model-inversion). See [ch. 19, AI-specific privacy
breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (ch. 19)

**Memory poisoning.** An injection that writes to an agent's long-term memory, a retrieval corpus, a
vector store or a hosted memory service, and so taints every later session that reads from that
store [128]. OWASP's agentic list has it as ASI06 Memory & Context Poisoning [6] and MITRE ATLAS as
AI Agent Context Poisoning (AML.T0080) [126]. Contrast with [Prompt
injection](/glossary/prompt-injection). See [ch. 23, Memory and context
governance](/bok/governing-agents#memory-and-context-governance). (ch. 23)

**Mitigation hierarchy.** The order in which risk treatments are tried: eliminate, substitute,
engineer, administrative, then accept and monitor. Borrowed from the occupational-safety hierarchy
of controls [93] and mirrored in AI Act Article 9(5) [2]; higher rungs first, with the reason
recorded when they are infeasible. See [ch. 13, Treating risk: the mitigation
hierarchy](/bok/risk-management#treating-risk-the-mitigation-hierarchy). (ch. 13)

**Model anonymity.** The EDPB's test for when a trained model falls outside the GDPR: both direct
extraction of training subjects' data and obtaining it through queries must be insignificant, given
all means reasonably likely to be used [88]. Evidenced by design records and attack evals. See [ch.
19, The EDPB anonymity test](/bok/privacy-and-ai#the-edpb-anonymity-test). (ch. 19)

**Model card.** Structured, versioned documentation of a model (provenance, intended use,
capabilities, evaluations and known failure modes) maintained as code. Contrast with [System
card](/glossary/system-card) and [Data card](/glossary/data-card). See [ch. 14, Model cards, system
cards and datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets); [ch. 05,
Pattern: Model Card as Control Evidence](/bok/patterns#pattern-model-card-as-control-evidence). (ch.
04, 05, 14)

**Model inversion.** An attack that reconstructs features of training subjects, such as a face, from
a model's outputs and confidence scores [94]. It can turn a deployed model into a channel for
disclosing personal data. Contrast with [Membership inference](/glossary/membership-inference). See
[ch. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (ch. 19)

**Model risk management.** The banking-supervision practice of validating models for conceptual
soundness, monitoring and outcomes analysis under effective challenge. SR 11-7 set the US tradition
until SR 26-2 superseded it on 17 Apr 2026 [67], and SR 26-2 leaves generative and agentic AI models
out of its scope [121]. A neighbour of this discipline, extended here to runtime behaviour and
agents. Contrast with [Risk management](/glossary/risk-management). See [ch. 14, Independent
validation and model risk
management](/bok/governing-development#independent-validation-and-model-risk-management); [ch. 21,
Sector rules that already reach AI](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai); [ch.
01, The disambiguation cluster](/bok/definition#the-disambiguation-cluster). (ch. 01, 02, 13,
14, 21)

**Model signing.** Signing a model's files at build: a manifest lists every file with its
cryptographic digest and a detached signature covers the manifest, so any changed file fails
verification. The OpenSSF Model Signing specification uses the Sigstore bundle format and supports
keyless signing, private PKI, self-signed certificates or bare keys [135]. Serving verifies the
signature before it loads a model. Contrast with [Build provenance
(SLSA)](/glossary/build-provenance-slsa). See [ch. 14, Reproducibility and linked
versioning](/bok/governing-development#reproducibility-and-linked-versioning); [ch. 05, Pattern:
Model Artefact Integrity](/patterns/model-artefact-integrity). (ch. 05, 14, 15)

**Multimodal model.** A model that takes or produces more than one modality (text, image, audio,
video). Each modality is a new channel for personal data, injected instructions and synthetic
content that may need marking [2], so guardrails and evals are needed per modality. See [ch. 11,
Multimodal models](/bok/ai-defined#multimodal-models). (ch. 11)

## N

**Near miss.** A hazard that a control, or luck, interrupted before harm occurred: the guardrail
blocked the exfiltration, the reviewer caught the invented dosage. Near-miss data is evidence; the
GPAI Code of Practice asks providers to report connected near-miss patterns with serious incidents
[95]. Contrast with [AI hazard](/glossary/ai-hazard). See [ch. 17, Incident, hazard, issue and
serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident). (ch. 17)

**Negative space.** The uses an AI system is explicitly not for, written into its Deployment
Decision Record. It sits inside the provider's intended purpose and makes function creep detectable,
because an unapproved use has somewhere to be recorded as out of scope. See [ch. 15, Start from the
use case, not the model](/bok/governing-deployment#start-from-the-use-case-not-the-model). (ch. 15)

**Neural data.** Information generated by measuring the activity of a person's central or peripheral
nervous system. California treats it as sensitive personal information [96], which switches on
consent and assessment duties for AI systems that read wearables or brain-computer interfaces. See
[ch. 19, Consumer-health and neural data](/bok/privacy-and-ai#consumer-health-and-neural-data). (ch. 19)

**NHI.** Non-human identity: the identity of an agent, service account or machine actor. Every NHI
gets a registry entry, an owner and a scope before it is allowed to act. Contrast with [Workload
identity](/glossary/workload-identity). See [ch. 05, Pattern: Agent Identity & Scoped
Credentials](/bok/patterns#pattern-agent-identity--scoped-credentials); [ch. 23, Identity and
short-lived credentials](/bok/governing-agents#identity-and-short-lived-credentials). (ch. 04,
05, 23)

**NIST AI RMF.** The NIST Artificial Intelligence Risk Management Framework 1.0 (NIST AI 100-1,
January 2023): voluntary guidance organised as a Core of four functions (Govern, Map, Measure,
Manage) with categories and subcategories, plus profiles and a companion Playbook [3][30]. See [ch.
22, NIST AI RMF 1.0 in depth](/bok/principles-and-standards#nist-ai-rmf-10-in-depth); [ch. 08, NIST
AI RMF](/bok/regulatory-map#nist-ai-rmf). (ch. 08, 22)

**Notified body.** A conformity assessment body designated under the EU AI Act to carry out
third-party conformity assessment of high-risk AI systems. Under the notified-body procedure it
assesses a provider's quality management system and technical documentation, with access to
training, validation and testing data [2]. See [ch. 18, Conformity assessment, declaration, marking
and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration); [ch.
14, EU AI Act conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order). (ch.
14, 18)

## O

**OECD AI Principles.** The five values-based principles (inclusive growth and well-being; human
rights, fairness and privacy; transparency and explainability; robustness, security and safety;
accountability) and five policy recommendations of the OECD Recommendation on AI, adopted in 2019
and revised in 2024 [31]. A commitment by adhering governments, not a binding rule for companies.
See [ch. 22, OECD AI Principles](/bok/principles-and-standards#oecd-ai-principles). (ch. 11, 22)

**OECD Framework for the Classification of AI Systems.** An OECD tool (2022) for characterising an
AI system from a policy perspective along five dimensions: People & Planet, Economic Context, Data &
Input, AI Model, and Task & Output [97]. In engineering practice its dimensions become groups of
registry fields that route controls. See [ch. 22, The Framework for the Classification of AI
Systems](/bok/principles-and-standards#the-framework-for-the-classification-of-ai-systems). (ch. 22)

**OPA/Rego.** The Open Policy Agent and its Rego policy language, a general-purpose policy-as-code
engine that evaluates governance rules in CI/CD and at runtime admission; the canonical example of
executable policy-as-code. Contrast with [Cedar](/glossary/cedar). See [ch. 06, Policy-as-code and
gates](/bok/the-role#policy-as-code-and-gates). (ch. 04, 05, 06)

**Opacity.** The inability of a person to follow how a system reached an output. It has three
sources (secrecy, technical illiteracy, and the nature and scale of machine learning) [98], each
with a different fix: disclosure, literacy, and explanation methods plus behavioural evals. Contrast
with [Explainability](/glossary/explainability). See [ch. 11, Eight characteristics that break
classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance); [ch.
11, Contrast pairs](/bok/ai-defined#contrast-pairs). (ch. 11)

**Open-weight model.** A model whose trained weights are published for download under a licence that
may be permissive, copyleft, use-restricted or custom [99]. Open weights are not open source; the
deployer produces almost all the evidence (hashes, scans, evals, red team) and must honour the
licence and any acceptable-use policy. Contrast with [Responsible-AI licence
(OpenRAIL)](/glossary/responsible-ai-licence-openrail). See [ch. 15, Open-weight
licences](/bok/governing-deployment#open-weight-licences); [ch. 18, Open-source carve-outs and their
limits](/bok/eu-ai-act#open-source-carve-outs-and-their-limits). (ch. 15, 18)

**Operator (EU AI Act).** The umbrella term for the actors the AI Act binds: provider, product
manufacturer, deployer, authorised representative, importer and distributor [2]. The same
organisation can be several operators for different systems, or for the same one. See [ch. 18, The
EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (ch. 18)

**OSCAL.** The Open Security Controls Assessment Language, a NIST machine-readable format for
controls, assessments and evidence, used here as the format for audit-ready evidence [3]. See [ch.
05, Pattern: Machine-Readable Evidence
(OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal). (ch. 04, 05, 10)

**Output suppression.** A filter around a model that stops it producing a person's data: the fast
first answer to an erasure or objection request when the data sits in the weights and retraining is
disproportionate. The CNIL accepts filters shown to be effective and robust and prefers general
rules to a list of names [140]. The data stays in the model. Contrast with [Machine
unlearning](/glossary/machine-unlearning). See [ch. 19, Suppression, retraining and
unlearning](/bok/privacy-and-ai#suppression-retraining-and-unlearning); [ch. 05, Pattern: Rights
Requests Against Models](/patterns/rights-requests-against-models). (ch. 05, 19)

## P

**Paved path.** A supported, low-friction default route (a template, library or pipeline) that makes
the governed way the easiest way to ship, so engineers adopt governance without asking permission.
See [ch. 03, Make the governed path the easiest
path](/bok/values-and-principles#make-the-governed-path-the-easiest-path). (ch. 03, 06)

**Personal data breach.** A breach of security leading to the accidental or unlawful destruction,
loss, alteration or unauthorised disclosure of, or access to, personal data, notified to the
authority within 72 hours unless unlikely to result in a risk [38]. AI adds regurgitation, inversion
and prompt-injection exfiltration as routes. See [ch. 19, AI-specific privacy
breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (ch. 19)

**PIPIA.** China's personal information protection impact assessment under PIPL Articles 55 and 56,
required in advance for sensitive data, automated decision-making, entrusted processing and
cross-border provision, with the report kept for at least three years [100]. Contrast with
[DPIA](/glossary/dpia). See [ch. 19, Brazil and China](/bok/privacy-and-ai#brazil-and-china). (ch. 19)

**Placing on the market.** Under the EU AI Act, the first making available of an AI system or
general-purpose AI model on the Union market; later supplies in the course of a commercial activity
are making available [2]. For a high-risk system, the conformity assessment and the technical
documentation come before it, or before putting into service. Contrast with [Putting into
service](/glossary/putting-into-service). See [ch. 18, The EU operator
roles](/bok/eu-ai-act#the-eu-operator-roles); [Toolkit: EU AI Act role and risk-class
triage](/toolkit/ai-act-triage). (ch. 08, 14, 15, 18, 20)

**Policy Card.** A JSON-schema, machine-readable governance artefact that declares an agent's
allowed and forbidden behaviours for runtime enforcement [11]. See [ch. 05, Pattern: Policy
Card](/bok/patterns#pattern-policy-card). (ch. 04, 05, 10, 23)

**Policy verdict.** The structured record a policy engine emits each time it evaluates a rule: allow
or deny, the versioned rule id, a hash of the input and a timestamp, signed and written to the
evidence store. A release or tool call without a verdict is an audit finding, and one that passed
under an exception names it in its verdict. See [ch. 04, Layer 01:
Govern-as-Code](/bok/the-stack#layer-01-govern-as-code); [Toolkit: Policy Card
builder](/toolkit/policy-card). (ch. 04, 05, 12, 23)

**Policy-as-code.** Governance policy expressed in an executable policy language (`OPA/Rego`, Cedar)
that evaluates in CI/CD and at admission; the narrower, pipeline subset of governance-as-code.
Contrast with [Governance-as-code](/glossary/governance-as-code). See [ch. 06, Policy-as-code and
gates](/bok/the-role#policy-as-code-and-gates). (ch. 04, 05, 06)

**Post-market monitoring.** The AI Act Article 72 duty to actively monitor a high-risk system's
performance and risks after deployment, throughout its lifetime [2]. See [ch. 18, Post-market
monitoring and serious incidents (Articles 72 and 73)](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73).
(ch. 08, 18)

**Pre-determined changes.** Changes to a high-risk system that continues to learn, planned by the
provider at the initial conformity assessment and described in the technical documentation; they are
not substantial modifications [2]. Engineered as a change envelope written in code. Contrast with
[Substantial modification](/glossary/substantial-modification). See [ch. 14, Substantial
modification](/bok/governing-development#substantial-modification). (ch. 14)

**Predictive AI.** AI that outputs an estimate about something that exists: a score, class or
forecast [21]. Its harms are mostly allocation harms, and its evidence is accuracy, calibration and
error rates by subgroup, with a decision threshold someone owns. Also called discriminative AI.
Contrast with [Generative AI](/glossary/generative-ai). See [ch. 11, Predictive versus
generative](/bok/ai-defined#predictive-versus-generative). (ch. 11)

**Presumption of conformity.** The legal effect under AI Act Article 40: a high-risk system or GPAI
model that conforms with OJ-cited harmonised standards is presumed to meet the requirements those
standards cover, and no others [2]. Unavailable until a standard is cited, which as of 2026-09-24
none is [10]. See [ch. 22, How presumption of conformity
works](/bok/principles-and-standards#how-presumption-of-conformity-works). (ch. 08, 22)

**Privacy by design and by default.** The GDPR Article 25 duty to build data protection principles
into processing through technical and organisational measures, and to process by default only the
personal data each purpose needs [38]. In an AI stack it shows up as filters, retention rules and
access limits enforced as code. See [ch. 19, Minimisation, privacy by design and
PETs](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets). (ch. 19)

**Privacy-enhancing technology (PET).** A technique that reduces what an attacker, vendor or insider
can learn from personal data, such as differential privacy, federated learning, synthetic data,
masking or trusted execution [61]. None makes a system compliant alone; each has a known failure
mode and is evidenced by a test. See [ch. 19, Privacy-enhancing technologies and their honest
limits](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits). (ch. 19)

**Product Liability Directive (PLD).** Directive (EU) 2024/2853, which treats software, including
AI, as a product; judges defect with learning and updates in view; lets courts order disclosure and
presume defect; and applies to products placed on the market after 9 Dec 2026 [101]. See [ch. 20,
The EU Product Liability Directive](/bok/existing-law#the-eu-product-liability-directive). (ch. 20)

**Profiling override.** The rule in the third subparagraph of AI Act Article 6(3) that an Annex III
system which performs profiling of natural persons is always high-risk, whichever filter condition
it meets [2]. A classification decision record therefore carries an explicit profiling flag, so a
filter claim the override defeats is visible. Contrast with [Article 6(3)
filter](/glossary/article-6-3-filter). See [ch. 18, The Annex III filter and the profiling
override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override); [Toolkit: EU AI Act role
and risk-class triage](/toolkit/ai-act-triage). (ch. 08, 18)

**Progressive delivery.** Releasing a change to a small, growing share of real traffic in stages
(shadow, pilot, canary, general availability), each with rollback criteria registered before it
starts and a tested path back to the previous version, so evidence about live behaviour arrives
before full exposure. For AI systems it covers model, prompt, corpus and vendor-version changes
alike. See [ch. 15, Progressive delivery as a
control](/bok/governing-deployment#progressive-delivery-as-a-control); [ch. 05, Pattern: Staged
Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria). (ch. 05, 14, 15, 23)

**Prohibited practice.** An AI practice banned outright by AI Act Article 5, such as manipulative
techniques that cause significant harm, social scoring, untargeted scraping of facial images,
emotion recognition at work or school, and most real-time remote biometric identification in public
for law enforcement [2]. No risk acceptance can cover one. Contrast with [High-risk AI
system](/glossary/high-risk-ai-system). See [ch. 18, Prohibited practices (Article 5)](/bok/eu-ai-act#prohibited-practices-article-5).
(ch. 18)

**Prompt injection.** An input that alters a model's behaviour or output in ways its designers did
not intend. It is direct when the user supplies it and indirect when it arrives inside content the
model processes, such as a web page, file or tool result [84]. Contained by guardrails,
least-privilege tools and evals. Contrast with [Jailbreak](/glossary/jailbreak) and [Hidden Context
Exposure](/glossary/hidden-context-exposure). See [ch. 04, Layer 04: Runtime Controls &
Observability](/bok/the-stack#layer-04-runtime-controls--observability). (ch. 01, 04, 17, 23)

**Proportionate governance.** Running the same risk loop at an intensity set by organisation size,
sector, maturity and risk tolerance, above a floor of controls that never tailors away. The AI Act
itself scales documentation and quality-management duties for smaller firms [2]. It lowers the cost
of governance, not the protection owed. See [ch. 13, Proportionate governance: tailoring the
loop](/bok/risk-management#proportionate-governance-tailoring-the-loop). (ch. 13)

**Provider.** Under the EU AI Act, whoever develops an AI system or general-purpose AI model, or has
one developed, and places it on the market or puts it into service under its own name or trademark,
whether for payment or free [2]. It carries the design, documentation, conformity and monitoring
duties for high-risk systems. Contrast with [Deployer](/glossary/deployer). See [ch. 18, The EU
operator roles](/bok/eu-ai-act#the-eu-operator-roles). (ch. 15, 18)

**Proxy label.** A training target that stands in for the construct a decision is meant to capture,
such as health-care cost standing in for health need [102]. When the proxy is shaped by unequal
treatment, a model can be accurate on the proxy and biased on the construct. Contrast with [Proxy
variable](/glossary/proxy-variable). See [Case: a health risk score with a proxy
label](/cases/health-risk-score-proxy). (ch. 16)

**Proxy scan.** A test that trains a model to predict a protected attribute from a system's
features; features that predict it strongly are flagged as proxies to justify or remove, and the
result is recorded in the data card. It finds proxy variables before an outcome metric shows their
effect. See [ch. 16, Fairness and explainability in the
stack](/bok/fairness-and-explainability#fairness-and-explainability-in-the-stack); [ch. 05, Pattern:
Fairness Eval Suite](/patterns/fairness-eval-suite). (ch. 05, 16)

**Proxy variable.** A feature that carries the information of a protected characteristic, such as
postcode for ethnicity, so that a model can discriminate without using the attribute itself. Proxy
tests look for features that predict the protected attribute [102]. Contrast with [Proxy
label](/glossary/proxy-label). See [ch. 16, Protected characteristics, proxies and the data you need
to
test](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test).
(ch. 16, 20)

**Pseudonymisation.** Processing personal data so it can no longer be attributed to a person without
additional information kept separately and protected [38]. Pseudonymised data stays personal data
for whoever can re-attribute it; it is a security measure, not anonymisation. Contrast with
[Anonymous data](/glossary/anonymous-data). See [ch. 19, Anonymisation versus
pseudonymisation](/bok/privacy-and-ai#anonymisation-versus-pseudonymisation). (ch. 19)

**Purpose limitation.** The GDPR principle that personal data collected for a specified purpose may
not be further processed in an incompatible way; Article 6(4) sets the compatibility test [38].
Enforced in AI pipelines by purpose tags on datasets and a policy that denies runs whose declared
purpose does not match. See [ch. 19, Purpose limitation and function
creep](/bok/privacy-and-ai#purpose-limitation-and-function-creep). (ch. 19)

**Putting into service.** Under the EU AI Act, the supply of an AI system for first use directly to
the deployer, or for the provider's own use, in the Union for its intended purpose [2]. Own use
counts: an organisation that builds a system and runs it itself is its provider and its deployer,
with no sale involved. Contrast with [Placing on the market](/glossary/placing-on-the-market). See
[ch. 18, Roles name tasks, not organisations](/bok/eu-ai-act#roles-name-tasks-not-organisations);
[Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (ch. 15, 18)

## Q

**QMS (Art. 17).** The quality management system that AI Act Article 17 requires of high-risk
providers; distinct from an ISO/IEC 42001 AIMS, which certifies a management system but is not
harmonised [2][10]. Contrast with [AIMS](/glossary/aims). See [ch. 18, Article 16 and the quality
management system (Article 17)](/bok/eu-ai-act#article-16-and-the-quality-management-system-article-17).
(ch. 08, 18)

## R

**RAISE Act.** New York's Responsible AI Safety and Education Act, a frontier-AI safety law binding
large frontier developers to publish a safety framework and every frontier developer to report
critical safety incidents; signed 19 December 2025 and taking effect 1 January 2027 after a March
2026 chapter amendment that placed oversight in an office within the Department of Financial
Services (DFS) [12][15]. See [ch. 08,
Frontier-developer laws](/bok/regulatory-map#frontier-developer-laws). (ch. 08, 21)

**Realised risk reduction.** The measured drop in a named failure mode's rate or blast radius in
production; one of the two tests of the discipline, against framework coverage. See [ch. 03, 7.
Success is measured in realised risk reduction, not framework
coverage](/bok/values-and-principles#7-success-is-measured-in-realised-risk-reduction-not-framework-coverage).
(ch. 01, 03)

**Reason code.** A stable, human-readable statement of a principal factor behind an adverse
decision, mapped from the factors the model actually scored and versioned with the model; required
in substance by US adverse-action rules [23]. See [ch. 16, Credit: adverse-action notices and reason
codes](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes); [ch. 05,
Pattern: Decision Notice & Contest Path](/patterns/decision-notice-contest-path); [ch. 05, Pattern:
Explanation Artefact](/patterns/explanation-artefact). (ch. 05, 16, 20)

**Reasonably foreseeable misuse.** Use of an AI system not in accordance with its intended purpose
that may result from reasonably foreseeable human behaviour or interaction with other systems,
including other AI systems [2]. Distinct from an attack; kept in a misuse register that feeds tests,
runtime policy and the instructions for use. Contrast with [Intended
purpose](/glossary/intended-purpose). See [ch. 14, Reasonably foreseeable
misuse](/bok/governing-development#reasonably-foreseeable-misuse); [ch. 15, Secondary use and
downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm). (ch. 14, 15)

**Records of processing activities (ROPA).** The GDPR Article 30 record of each processing activity:
purposes, categories of data and people, recipients, transfers, retention and security [38]. For AI
it is best generated per processing moment from the registry and data cards, so it does not go
stale. See [ch. 19, Records of processing](/bok/privacy-and-ai#records-of-processing). (ch. 19)

**Recourse.** The ability of a person to obtain a different decision by changing inputs they can
actually act on, such as income rather than age [103]. Counterfactual explanations restricted to
actionable features are its usual engineering form; a system can offer contestation and still leave
no recourse. Contrast with [Contestability](/glossary/contestability). See [ch. 16, Counterfactual
explanations](/bok/fairness-and-explainability#counterfactual-explanations). (ch. 16, 21)

**Red teaming.** Structured adversarial testing of a model or agent to elicit failures (jailbreaks,
injection, tool misuse) before an attacker does; treated here as an evidence-producing control. See
[ch. 05, Pattern: Adversarial Red-Team Suite](/bok/patterns#pattern-adversarial-red-team-suite).
(ch. 04, 05, 15)

**Regurgitation.** A model reproducing memorised training data verbatim, including personal data,
whether prompted deliberately (training-data extraction) or not [104]. Detected by output checks and
canaries, and tested by extraction evals. Contrast with [Hallucination](/glossary/hallucination).
See [ch. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (ch.
19, 20)

**Reinforcement learning.** Learning to maximise a reward signal through trial and feedback [40].
Its characteristic failure is reward hacking, so the reward is recorded as the system's objective
and evals look for unintended strategies. See [ch. 11, By learning
paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Reinforcement learning from human feedback (RLHF).** A way to align a pre-trained model:
supervised fine-tuning on human demonstrations, then reinforcement learning against a reward model
trained on human rankings of outputs [105]. The raters' instructions and the reward model become
governed artefacts, because they shape what the model refuses and prefers. Contrast with
[Fine-tuning](/glossary/fine-tuning). See [ch. 11, By learning
paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Reporting clock.** A statutory deadline for an incident notification, defined by its trigger
(awareness, classification, causal link or determination), recipient, content and follow-ups, as in
AI Act Article 73 [2]. One event can start several clocks, so each is held as its own timer on a
single incident record. See [ch. 17, The overlapping clocks](/bok/incidents#the-overlapping-clocks).
(ch. 17)

**Residual risk.** What is left of a risk once treatment is applied [30]. The EU AI Act requires
residual risk per hazard and overall to be judged acceptable for high-risk systems [2]. A residual
rating credits only controls whose evidence is current. Contrast with [Inherent
risk](/glossary/inherent-risk) and [Risk tolerance](/glossary/risk-tolerance). See [ch. 13, Inherent
risk, residual risk and who accepts
it](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it). (ch. 13)

**Responsible-AI licence (OpenRAIL).** A licence that grants open, royalty-free access to an AI
artefact while attaching prohibited uses that every redistribution and derivative must carry forward
[106]. The restrictions travel with the model, so a deployer's own terms of use must repeat them.
Contrast with [Open-weight model](/glossary/open-weight-model). See [ch. 15, Open-weight
licences](/bok/governing-deployment#open-weight-licences). (ch. 15)

**Responsible-AI principle set.** A published set of normative targets for AI, such as the OECD AI
Principles [31], the UNESCO Recommendation, the HLEG requirements or the G7 Hiroshima principles.
Not the house "principle", which is a rule of method; a principle set counts as applied only when an
artefact evidences it. Contrast with [Trustworthy AI](/glossary/trustworthy-ai). See [ch. 11,
Responsible-AI principle sets,
engineered](/bok/ai-defined#responsible-ai-principle-sets-engineered). (ch. 11)

**Retrieval-augmented generation (RAG).** A system that combines a model's learned memory with a
retrievable store of documents at answer time [107]. The corpus becomes behaviour, so it is governed
like a model: versioned, carded, tied to the eval that tested it, with an entitlement check on what
each user may retrieve. See [ch. 11, RAG systems](/bok/ai-defined#rag-systems). (ch. 11, 16)

**Reward hacking.** A system finding an unintended way to maximise its reward or objective without
doing what its designers meant [108]. Answered by recording the objective and testing for unintended
strategies, not only for the intended task. See [ch. 11, By learning
paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Right to explanation (AI Act Art. 86).** The right of a person affected by a deployer's decision
based on an Annex III high-risk system's output, with legal or similarly significant adverse
effects, to clear and meaningful explanations of the system's role and the main elements of the
decision, where Union law does not already provide it [2]. Contrast with
[Explainability](/glossary/explainability). See [ch. 18, Explanation and notice to affected
people](/bok/eu-ai-act#explanation-and-notice-to-affected-people). (ch. 16, 18, 19)

**Rights reservation (TDM opt-out).** A rightholder's express reservation of text and data mining
under Article 4(3) of the DSM Directive, which takes the content out of the general mining
exception; for content made publicly available online it must be made in an appropriate manner, such
as machine-readable means [115]. General-purpose AI model providers must identify and comply with
such reservations [2]. Contrast with [TDM exception](/glossary/tdm-exception). See [ch. 20,
Artefacts that evidence IP compliance](/bok/existing-law#artefacts-that-evidence-ip-compliance);
[ch. 05, Pattern: Training-Data Rights Ledger](/patterns/training-data-rights-ledger). (ch. 05, 08,
12, 20)

**Risk acceptance.** A named, signed and expiring decision by someone with the authority a residual
band requires, that a risk may remain for a bounded period under named compensating controls and a
monitoring signal that voids it [30]. Authority rises with the rating; a prohibited use cannot be
accepted by anyone. Contrast with [Exception register](/glossary/exception-register). See [ch. 13,
Who may accept](/bok/risk-management#who-may-accept); [ch. 12, Risk acceptance and
exceptions](/bok/governance-program#risk-acceptance-and-exceptions). (ch. 12, 13)

**Risk appetite.** How much risk, and of which kinds, an organisation is prepared to take on in
pursuit of its objectives [109]. In this book it is compiled from an approved statement into a
versioned data file that gates read, rather than left in a board paper. Contrast with [Risk
tolerance](/glossary/risk-tolerance). See [ch. 13, Risk appetite and tolerance, compiled into
gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates). (ch. 13)

**Risk management.** The organised practice of steering an organisation's decisions with its risks
in view [109]: identify, assess, treat and monitor, in a loop. For high-risk systems the AI Act
requires a documented risk management system across the lifecycle [2]. Contrast with [Model risk
management](/glossary/model-risk-management). See [ch. 13, The loop: identify, assess, treat,
monitor](/bok/risk-management#the-loop-identify-assess-treat-monitor). (ch. 13)

**Risk matrix.** A grid that turns a likelihood rating and a severity rating, each on defined
scales, into a band that triggers a treatment, a gate and a review cadence. Useful for consistency,
not precision [110]; keep the numbers behind each cell. See [ch. 13, Assessing risk: the
likelihood-by-severity
matrix](/bok/risk-management#assessing-risk-the-likelihood-by-severity-matrix). (ch. 13)

**Risk register.** The evidence record of the risk loop: one versioned file per risk, keyed to a
registry id, with ratings, treatment, controls that resolve to evidence, owner, acceptance, review
cadence and links to evals, incidents and obligations. Deploy gates read it; it evidences an Article
9 risk management system [2]. Contrast with [Exception register](/glossary/exception-register). See
[ch. 13, The risk register as an evidence
record](/bok/risk-management#the-risk-register-as-an-evidence-record). (ch. 13)

**Risk source.** Anything that can give rise to risk alone or in combination, such as a dataset, a
tool grant, an adversary or a user group [111]. Internal sources sit inside the organisation's
control; external ones arise outside it and are mostly engineered against and monitored. Contrast
with [Contributing factor](/glossary/contributing-factor). See [ch. 13, Internal and external risk
sources](/bok/risk-management#internal-and-external-risk-sources). (ch. 13)

**Risk tier.** An organisation's own rating of an AI use case, computed at intake by a versioned
policy from declared profile fields such as autonomy, decision impact, exposure, reversibility,
vulnerable groups, data class and third parties. The tier selects the assessments, evals,
thresholds, approvers and review cadence a system must pass; it sits beside the legal
classification, not in place of it. Contrast with [High-risk AI
system](/glossary/high-risk-ai-system). See [ch. 13, Contributing factors and the use-case risk
profile](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile); [ch. 05, Pattern:
Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering). (ch. 05, 06, 12, 13)

**Risk tolerance.** The readiness to bear a given risk in order to achieve objectives [30].
Engineered as the highest residual band a system tier may carry before a deploy gate requires a
signed acceptance. Contrast with [Risk appetite](/glossary/risk-appetite). See [ch. 13, Risk
appetite and tolerance, compiled into
gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates). (ch. 13)

**Rollback criteria.** The conditions, written into the rollout plan before a release stage starts,
under which the pipeline returns to the previous version automatically: a floor breached against the
control group, a disagreement or override rate above a threshold, a severity-1 event. A criterion
set after the metric moved is a negotiation, not a control. Contrast with [Kill
switch](/glossary/kill-switch). See [ch. 15, Progressive delivery as a
control](/bok/governing-deployment#progressive-delivery-as-a-control); [ch. 05, Pattern: Staged
Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria). (ch. 05, 15)

**Root-cause analysis (RCA).** The review that answers why an incident happened and why the controls
did not stop it, using techniques such as five whys, fault tree analysis [112] and blameless
post-mortems, and codes each confirmed cause against a taxonomy that names the control that should
have caught it. See [ch. 17, Root-cause analysis](/bok/incidents#root-cause-analysis). (ch. 17)

**Runtime data path.** The live connection between production and the governance function
(discovery, telemetry and enforcement), without which a registry or dashboard describes the program
but cannot see what is running [13]. See [ch. 02, 5. No runtime data
path](/bok/why-now#5-no-runtime-data-path). (ch. 02, 04, 07)

## S

**Safetensors.** A file format for storing a model's tensors safely, as opposed to Python pickle
[137], whose loading can run arbitrary code and which the Python documentation calls not secure
[138]. Storing weights as safetensors, and scanning any remaining pickle files for code-executing
imports before they reach a registry, closes a common supply-chain route into serving. See [ch. 14,
Reproducibility and linked
versioning](/bok/governing-development#reproducibility-and-linked-versioning); [ch. 05, Pattern:
Model Artefact Integrity](/patterns/model-artefact-integrity). (ch. 05, 14)

**Safety component.** Under the AI Act as amended in 2026, a component of a product or AI system
whose intended purpose is to prevent or mitigate risks to the health and safety of persons or
property, or whose failure endangers them. AI used solely for convenience, efficiency or quality
control is excluded unless its failure would endanger safety [2]. See [ch. 18, High-risk through
products (Annex I)](/bok/eu-ai-act#high-risk-through-products-annex-i). (ch. 18)

**Sanctioned AI gateway.** The single approved route by which staff reach AI tools and model APIs:
approved tools behind single sign-on and a gateway that classifies each request by data class,
allows, redacts or blocks it under the acceptable-use policy, checks for a current attestation and
logs a decision per call. It works by being the easiest route. Contrast with [Shadow
AI](/glossary/shadow-ai). See [ch. 12, Acceptable use of AI by
staff](/bok/governance-program#acceptable-use-of-ai-by-staff); [ch. 05, Pattern: Sanctioned AI
Gateway](/patterns/sanctioned-ai-gateway). (ch. 05, 12)

**SB 53.** California's frontier-AI transparency law (TFAIA), in force 1 Jan 2026, covering frontier
developers training models above 10^26 FLOP: all of them publish transparency reports and report
critical safety incidents, and large frontier developers also publish a safety framework [14]. See
[ch. 08, Frontier-developer laws](/bok/regulatory-map#frontier-developer-laws). (ch. 08, 21)

**Self-supervised learning.** Learning by predicting parts of the input itself, such as the next
token, over large corpora; the AI Act's definition of a general-purpose model names self-supervision
at scale [2]. Corpus provenance, rights and memorisation are hard to trace, which is why the AIBOM
records dataset provenance. See [ch. 11, By learning
paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Serious incident.** Under AI Act Article 3(49), an incident or malfunction of an AI system that
directly or indirectly leads to (a) a death or serious harm to health, (b) serious and irreversible
disruption of critical infrastructure, (c) infringement of Union-law obligations protecting
fundamental rights, or (d) serious harm to property or the environment, triggering Article 73
reporting [2]. Contrast with [AI incident](/glossary/ai-incident). See [ch. 17, Incident, hazard,
issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident); [ch. 18,
Post-market monitoring and serious incidents (Articles 72 and 73)](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73).
(ch. 04, 08, 17, 18)

**Shadow AI.** An AI system, model or agent running without registration, including staff use of
unapproved AI tools; the failure mode that makes an inventory complete only for the honest. It is
found by discovery and answered with a sanctioned route, not a ban. Contrast with [Sanctioned AI
gateway](/glossary/sanctioned-ai-gateway). See [ch. 05, Pattern: Shadow-AI
Discovery](/bok/patterns#pattern-shadow-ai-discovery); [ch. 12, Acceptable use of AI by
staff](/bok/governance-program#acceptable-use-of-ai-by-staff). (ch. 05, 07, 12)

**Shadow deployment.** A release stage in which a new model or system receives live inputs but its
outputs are not used, so its behaviour on real traffic can be compared with the incumbent or with
human decisions before any exposure. The disagreement log is its evidence. Contrast with [Canary
release](/glossary/canary-release). See [ch. 15, Progressive delivery as a
control](/bok/governing-deployment#progressive-delivery-as-a-control); [ch. 05, Pattern: Staged
Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria). (ch. 05, 14, 15)

**SHAP.** SHapley Additive exPlanations: a feature-attribution method that assigns each input
feature a share of a particular prediction, based on Shapley values [113]; its explanations depend
on the chosen baseline or background data. Contrast with [LIME](/glossary/lime). See [ch. 16,
Feature attribution: SHAP, LIME and integrated
gradients](/bok/fairness-and-explainability#feature-attribution-shap-lime-and-integrated-gradients).
(ch. 16)

**Small language model (SLM).** A language model small enough to run close to the user, for example
on a phone [86]. Its controls must ship with it: guardrails on the device, a version inventory
across the fleet and a kill switch delivered as a remote flag or app update. Contrast with [Large
language model (LLM)](/glossary/large-language-model-llm). See [ch. 11, LLMs and
SLMs](/bok/ai-defined#llms-and-slms). (ch. 11)

**Small mid-cap enterprise (SMC).** An enterprise that has outgrown the SME definition but falls
within the EU small mid-cap definition. The Digital Omnibus extends some SME relief under the AI Act
to SMCs, such as simplified technical documentation and a proportionate quality management system
[2]. See [ch. 18, The Act and the Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (ch. 18)

**Special category data.** The GDPR Article 9 categories whose processing is prohibited unless a
condition applies: data revealing racial or ethnic origin, political opinions, beliefs or union
membership, and genetic, biometric (for identification), health, sex-life and sexual-orientation
data [38]. AI can create it by inference. Contrast with [Inferred sensitive
data](/glossary/inferred-sensitive-data). See [ch. 19, Special categories, inferred data and
biometrics](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics). (ch. 19)

**Stakeholder mapping.** Naming who is affected by or holds a view on an AI system (users, affected
non-users, deployers, providers, internal functions, regulators, the governing body) and how each
view enters the risk loop, with the consultation logged. A FRIA names the affected groups too [2].
See [ch. 13, Stakeholder mapping](/bok/risk-management#stakeholder-mapping). (ch. 13)

**STAR for AI.** CSA's security assurance and certification programme for AI, built on the AICM,
with a self-assessment tier, an automated "Valid-AI-ted" tier and a Level 2 combining ISO/IEC 42001
with the validated assessment [4]. See [ch. 08, CSA AICM and STAR for
AI](/bok/regulatory-map#csa-aicm-and-star-for-ai). (ch. 07, 08)

**STRIDE.** A threat-classification checklist from Microsoft's Security Development Lifecycle:
spoofing, tampering, repudiation, information disclosure, denial of service and elevation of
privilege [133]. For an AI system it is walked per element of the data-flow diagram and then
extended with AI-specific catalogues such as MITRE ATLAS and the OWASP lists. Contrast with
[ATLAS](/glossary/atlas). See [ch. 15, Threat modelling the deployed
system](/bok/governing-deployment#threat-modelling-the-deployed-system); [ch. 05, Pattern: AI Threat
Model](/patterns/ai-threat-model). (ch. 05, 06, 15)

**Sub-processor.** A processor that another processor engages to carry out processing for a
controller, such as the model host behind an AI vendor. Under GDPR Article 28 it needs the
controller's prior written authorisation, specific or general with notice of changes and a chance to
object, and the same data protection obligations flow down to it by contract [38]. Contrast with
[Controller and processor](/glossary/controller-and-processor). See [ch. 19, AI vendor DPAs and
no-training clauses](/bok/privacy-and-ai#ai-vendor-dpas-and-no-training-clauses); [ch. 15, Vendor
contracts and licence terms](/bok/governing-deployment#vendor-contracts-and-licence-terms). (ch. 08,
12, 15, 19)

**Substantial modification.** Under the EU AI Act, a change after placing on the market that the
initial conformity assessment did not foresee and that affects compliance or changes the intended
purpose [2]. It triggers a new conformity assessment and can turn a deployer or distributor into the
provider; pre-determined changes are exempt. Contrast with [Pre-determined
changes](/glossary/pre-determined-changes). See [ch. 18, Article 25: when someone else becomes the
provider](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider); [ch. 14, Substantial
modification](/bok/governing-development#substantial-modification); [ch. 15, When a deployer becomes
a provider](/bok/governing-deployment#when-a-deployer-becomes-a-provider). (ch. 14, 15, 18)

**Supervised learning.** Learning from labelled examples [40]. Labels encode past human decisions
with their errors and bias, so the data card records label provenance and the eval gate tests error
rates by subgroup. Contrast with [Unsupervised learning](/glossary/unsupervised-learning). See [ch.
11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**SVID.** SPIFFE Verifiable Identity Document: a short-lived cryptographic identity document, either
an X.509 certificate or a JWT, that proves a workload's SPIFFE ID and is issued and rotated through
the SPIFFE Workload API, which SPIRE implements [124]. A credential that expires in minutes need not
be hunted down after an incident, only not reissued. Contrast with [Workload
identity](/glossary/workload-identity). See [ch. 23, Short-lived, attested
credentials](/bok/governing-agents#short-lived-attested-credentials). (ch. 23)

**Synthetic data.** Data generated by a model or simulation rather than collected from people or
events, used to augment training sets, test edge cases or reduce exposure of personal data. It
inherits the biases of its generator and can leak the records it was fitted on, so it is tested like
any other dataset. See [ch. 14, Synthetic data, augmentation and privacy-enhancing
technologies](/bok/governing-development#synthetic-data-augmentation-and-privacy-enhancing-technologies).
(ch. 14, 19)

**System card.** Documentation of a deployed AI system as a whole (models, prompts, retrieval,
tools, guardrails and oversight), where a model card documents one model [114]. Its audience is
deployers, authorities and the public; its evidence is the registry entry, the guardrail
configuration and red-team results. Contrast with [Model card](/glossary/model-card). See [ch. 14,
Model cards, system cards and
datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets). (ch. 14, 15)

**Systemic risk.** Under the AI Act, the risk posed by the most capable general-purpose AI models,
triggering extra evaluation, adversarial-testing and incident-reporting duties on their providers
[2]. See [ch. 18, Systemic risk: threshold, notification,
designation](/bok/eu-ai-act#systemic-risk-threshold-notification-designation). (ch. 08, 18)

## T

**Tabletop exercise.** A scheduled, scored rehearsal of an incident playbook against a named failure
mode, producing the same records a real incident would (record, clocks, draft reports, containment
events) tagged as a drill. The playbook is the claim; the drill result is the evidence. See [ch. 17,
Playbooks, RACI and drills](/bok/incidents#playbooks-raci-and-drills). (ch. 17)

**TC260.** The National Technical Committee 260 on Cybersecurity of the Standardization
Administration of China (全国网络安全标准化技术委员会), which drafts China's cybersecurity and AI national
standards (GB and GB/T) and publishes the voluntary AI Safety Governance Framework (1.0 in 2024, 2.0
in 2025, 3.0 on 14 September 2026) [19]. See [ch. 21, China: what chapter 08 does not already
cover](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover). (ch. 08, 21)

**TDM exception.** The EU copyright exception for text and data mining (DSM Directive Articles 3
and 4) that lets anyone copy lawfully accessible works for mining, including AI training, unless the
rightholder has reserved that use; for content made publicly available online the reservation must
be made in an appropriate manner, such as machine-readable means [115]. Contrast with [Fair
use](/glossary/fair-use) and [Rights reservation (TDM
opt-out)](/glossary/rights-reservation-tdm-opt-out). See [ch. 20, Copyright and training
data](/bok/existing-law#copyright-and-training-data). (ch. 20)

**Technical documentation (Annex IV).** The provider's technical file for a high-risk AI system,
drawn up before placing on the market and kept up to date under Article 11: description, development
process, data, testing, oversight, risk management, standards, declaration and post-market
monitoring plan [2]. Most items can be generated from pipeline records. See [ch. 14, Annex IV,
element by element](/bok/governing-development#annex-iv-element-by-element). (ch. 14)

**Test-set contamination.** The presence of evaluation items in a model's training data, which
inflates its scores; it can be demonstrated even for black-box language models [116]. Mitigated with
private held-out sets, rotated items and dated test items. See [ch. 14, Statistical validity of
evals](/bok/governing-development#statistical-validity-of-evals). (ch. 14)

**Testing in real-world conditions.** Under the EU AI Act, temporary testing of an AI system for its
intended purpose outside a laboratory, under a plan approved by the market surveillance authority,
with registration, informed consent of subjects, effective oversight and reversible outputs, for a
limited period [2]. Contrast with [AI regulatory sandbox](/glossary/ai-regulatory-sandbox). See [ch.
18, Sandboxes and real-world testing](/bok/eu-ai-act#sandboxes-and-real-world-testing). (ch. 18)

**Threat model (AI).** A versioned record of what can go wrong with an AI system and what is done
about it: data flows and trust boundaries, threats per element from STRIDE and AI-specific
catalogues, a decision on each, and the test that proves each mitigation. It answers the four
threat-modelling questions, ending with whether the job was done well enough [134]. Contrast with
[Red teaming](/glossary/red-teaming). See [ch. 15, Threat modelling the deployed
system](/bok/governing-deployment#threat-modelling-the-deployed-system); [ch. 05, Pattern: AI Threat
Model](/patterns/ai-threat-model). (ch. 05, 14, 15, 23)

**Three Lines Model.** The Institute of Internal Auditors' 2020 update of the "three lines of
defense": the governing body oversees; management holds first-line roles (delivering products and
services) and second-line roles (risk expertise, support and challenge); internal audit gives
independent third-line assurance [117]. See [ch. 12, The three lines, applied to
AI](/bok/governance-program#the-three-lines-applied-to-ai). (ch. 12)

**Token passthrough.** The anti-pattern in which a server accepts a token that was not issued to it
and forwards it, unmodified, to a downstream API, which may then trust it as if the server had
validated it. The MCP specification forbids it: a server must not accept any token not explicitly
issued for it, and so checks each token's audience [125]. Contrast with [Delegation (OAuth token
exchange)](/glossary/delegation-oauth-token-exchange). See [ch. 23, MCP authorization as of
2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28). (ch. 23)

**Tool allow-list.** The deny-by-default list of tools an agent may call, each entry pinned by a
hash of the tool's definition and bounded by resource scope, operation class, rate, egress
destinations, data classes and a checkpoint rule, evaluated by the tool gateway on every call. OWASP
asks for such per-tool least-privilege profiles [6]. See [ch. 23, The tool
allow-list](/bok/governing-agents#the-tool-allow-list). (ch. 23)

**Tool poisoning.** Tampering with a tool an agent uses, through its model-visible definition
(description, schema, metadata) or its behaviour, so the agent acts on false premises. OWASP files
manipulation of a legitimate tool's interface under ASI02 and a tool compromised at the source under
ASI04 [6]; MITRE ATLAS lists AI Agent Tool Poisoning (AML.T0110) [126]. Contrast with [Prompt
injection](/glossary/prompt-injection). See [ch. 23, Admitting an MCP
server](/bok/governing-agents#admitting-an-mcp-server). (ch. 23)

**Training-content summary.** The public summary of the content used to train a general-purpose AI
model, required by AI Act Article 53(1)(d) on a mandatory Commission template covering data sources,
including the most-scraped domains, and data processing [118]. See [ch. 14, The GPAI provider
side](/bok/governing-development#the-gpai-provider-side). (ch. 14)

**Training, validation and testing data.** The three data sets the AI Act defines for high-risk
systems: training data fits the model, validation data tunes it and guards against overfitting, and
testing data gives an independent check before release [2]. Keeping them separate, and proving it,
is what stops test-set contamination. Contrast with [Test-set
contamination](/glossary/test-set-contamination). See [ch. 14, Data for training and
testing](/bok/governing-development#data-for-training-and-testing). (ch. 14)

**Trajectory (agent).** The sequence of plans, tool calls and memory operations that led an agent to
an effect. Agents are evaluated on their trajectories as well as their final outputs, because a
right result reached through a tool the agent should never have held is still a failure. See [ch.
23, What makes an agent a governance
object](/bok/governing-agents#what-makes-an-agent-a-governance-object). (ch. 14, 23)

**Transaction token (Txn-Token).** A short-lived, signed token, specified in an IETF OAuth working
group draft, that carries user identity, workload identity and authorisation context through a call
chain within one trusted domain, so downstream services can decide on protected context [131]. Still
a draft (revision 11, 30 Jul 2026) as of 2026-09-24. Contrast with [Delegation (OAuth token
exchange)](/glossary/delegation-oauth-token-exchange). See [ch. 23, Accountability across
hops](/bok/governing-agents#accountability-across-hops). (ch. 23)

**Transfer impact assessment (TIA).** The data exporter's assessment of whether the law of a third
country lets the importer honour the transfer tool, such as standard contractual clauses, and which
supplementary measures are needed [119]. Remote inference endpoints and vendor telemetry outside the
EEA can trigger it. See [ch. 19, Transfers, remote inference and
TIAs](/bok/privacy-and-ai#transfers-remote-inference-and-tias). (ch. 19)

**Transparency.** In NIST's framing, how far information about an AI system and its outputs reaches
the people who interact with it: what happened [30]. Evidenced by records of what ran (registry,
model and system cards, logs) and by the disclosures the law requires. Contrast with
[Explainability](/glossary/explainability) and [Interpretability](/glossary/interpretability). See
[ch. 16, Transparency, interpretability and
explainability](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[ch. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (ch. 11, 16)

**Trustworthy AI.** A banner used by other people's frameworks, notably the EU High-Level Expert
Group [81] and NIST, whose seven trustworthy characteristics make it concrete [30]. This book cites
it rather than adopting it: the discipline is measured by realised risk reduction and evidence, not
by the label. Contrast with [AI governance engineering](/glossary/ai-governance-engineering) and
[Responsible-AI principle set](/glossary/responsible-ai-principle-set). See [ch. 22, EU HLEG
guidelines and ALTAI](/bok/principles-and-standards#eu-hleg-guidelines-and-altai). (ch. 01, 22)

**Trustworthy characteristics (NIST).** The seven characteristics of trustworthy AI in the NIST AI
RMF: valid and reliable; safe; secure and resilient; accountable and transparent; explainable and
interpretable; privacy-enhanced; fair with harmful bias managed [30]. Valid and reliable is the
base; accountable and transparent spans the others. See [ch. 22, The seven trustworthy
characteristics](/bok/principles-and-standards#the-seven-trustworthy-characteristics). (ch. 22)

## U

**UDAP.** Unfair or deceptive acts or practices, prohibited by section 5 of the FTC Act and by state
laws [120]. Deception is a material representation likely to mislead; unfairness is substantial,
unavoidable injury not outweighed by benefits. Unsubstantiated AI performance claims fall under it.
See [ch. 20, Unfair and deceptive practices in the United
States](/bok/existing-law#unfair-and-deceptive-practices-in-the-united-states). (ch. 20)

**Unsupervised learning.** Learning structure (clusters, anomalies) from data without labels [40].
With no ground truth to test against, controls rely on stability tests and human review of the
segments before they are used in decisions. Contrast with [Supervised
learning](/glossary/supervised-learning). See [ch. 11, By learning
paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Use-case record.** The intake record for a proposed AI use: business context, intended purpose and
the uses ruled out, affected persons, decision authority, success metrics and error appetite, stored
as fields on the registry entry so classification, thresholds, tests and impact assessments read the
same facts [30]. See [ch. 14, The use-case record](/bok/governing-development#the-use-case-record);
[ch. 06, Intake and classification](/bok/the-role#intake-and-classification); [ch. 05, Pattern:
Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering). (ch. 05, 06, 14)

## V

**Version pinning.** Fixing, in the registry entry, the exact versions of the model, prompts,
retrieval corpus and guardrails a deployed system uses, so what ran is known and any unpinned
change, including a vendor's model update, is detected and treated as a release. See [ch. 15,
Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[ch. 05, Pattern: Staged Rollout with Rollback
Criteria](/patterns/staged-rollout-rollback-criteria). (ch. 05, 15)

## W

**Watermarking.** Embedding a signal in generated content (image, audio, video or text) that a
detector can later read to identify it as AI-generated. The AI Act asks providers of generative
systems for machine-readable, detectable marking [2]; NIST reviews watermarking alongside provenance
tracking and detection [53]. Marks can degrade under ordinary transformations, so their survival is
tested. Contrast with [Content provenance (C2PA)](/glossary/content-provenance-c2pa) and [Latent
disclosure](/glossary/latent-disclosure). See [ch. 18, Transparency cases (Article 50)](/bok/eu-ai-act#transparency-cases-article-50).
(ch. 18, 20)

**Widespread infringement.** Under AI Act Article 3(61), an act or omission contrary to Union law
protecting individuals' interests that harms, or is likely to harm, the collective interests of
individuals across several Member States. It shortens the Article 73 serious-incident deadline to
two days [2]. Contrast with [Serious incident](/glossary/serious-incident). See [ch. 17, Incident,
hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident). (ch. 17)

**Workload identity.** The attributable identity a workload such as an agent carries across every
hop, under which its actions are logged and its access is revoked, typically a short-lived, attested
credential such as an SVID [124]. It differs from channel authentication, which secures a single
hop, such as a client talking to an MCP server. Contrast with [NHI](/glossary/nhi) and
[SVID](/glossary/svid). See [ch. 23, Channel authentication is not agent
identity](/bok/governing-agents#channel-authentication-is-not-agent-identity); [ch. 04, Layer 04:
Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability). (ch. 03,
04, 05, 23)

## Sources

[1] Real Decreto 729/2023, de 22 de agosto, por el que se aprueba el Estatuto de la Agencia Española de Supervisión de Inteligencia Artificial (Royal Decree approving the AESIA statute; seat in A Coruña; BOE no. 210, 2 Sep 2023). Boletín Oficial del Estado. 2023-09-02. https://www.boe.es/eli/es/rd/2023/08/22/729 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text as amended by Regulation (EU) 2026/1744 (Digital Omnibus on AI, in force 27 Jul 2026; definitions in Art. 3, incl. 3(1), 3(3) to 3(14), 3(14b), 3(20), 3(22), 3(23), 3(29) to 3(32), 3(49), 3(55) to 3(57), 3(60), 3(61), 3(63), 3(68); Arts. 4, 5, 6 (incl. 6(3) third subparagraph, profiling), 9, 10, 11, 13, 14, 15, 17, 22 to 27 (incl. 26(11)), 40, 41, 43, 47, 48, 50, 53 (incl. 53(1)(c)), 55, 57, 60, 72, 73, 86; Annexes I, III, IV). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[3] NIST AI Risk Management Framework 1.0 (Govern, Map, Measure, Manage); OSCAL. NIST. 2023. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[4] AI Controls Matrix v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/star/ai (verified: primary)
[5] OWASP AI Maturity Assessment (AIMA), reported at v1.0 (Aug 2025). OWASP GenAI Security Project. 2025. https://genai.owasp.org/initiatives/ (verified: reported)
[6] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; Least-Agency; per-tool least-privilege profiles; tool poisoning of a legitimate tool's interface under ASI02, a tool compromised at the source under ASI04). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[7] MITRE ATLAS (adversarial threat knowledge base for AI). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[8] Model Context Protocol specification 2026-07-28 (OAuth 2.1 resource servers; Client ID Metadata Documents; issuer-bound credentials). Anthropic / MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[9] "Gartner Predicts that Guardian Agents will Capture 10-15% of the Agentic AI Market by 2030" (at least 10 to 15% of agentic AI markets by 2030). Gartner. 2025-06-11. https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030 (verified: primary)
[10] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no presumption of conformity from any standard, ISO/IEC 42001 included; page last updated 2026-08-03; none found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[11] Policy Cards: machine-readable runtime governance artefacts for agents. arXiv 2510.24383. 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[12] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; oversight office within the Department of Financial Services). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[13] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[14] California SB 53 / TFAIA (models above 10^26 FLOP; transparency reports and incident reports by all frontier developers; frameworks by large frontier developers). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[15] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment signed 27 Mar 2026; effective 1 Jan 2027; framework for large frontier developers, critical safety incident reports for every frontier developer; DFS oversight office). Wiley. 2026. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[16] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; three chapters: Transparency, Copyright, Safety and Security). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[17] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[18] 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance). Cyberspace Administration of China. 2026-09-14. https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm (verified: primary)
[19] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF. TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[20] A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification (prediction sets with user-specified coverage; arXiv 2107.07511). Angelopoulos and Bates. 2021-07-15. https://arxiv.org/abs/2107.07511 (verified: primary)
[21] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (C(2025) 5053 final; non-binding; seven elements of Art. 3(1), inference as the indispensable condition; exclusions). European Commission. 2025-02-06. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[22] CCPA regulations on automated decisionmaking technology, risk assessments and cybersecurity audits (approved 22 Sep 2025; effective 1 Jan 2026; ADMT definition § 7001(e); opt-out and appeal § 7221). California Privacy Protection Agency. 2025-09-22. https://cppa.ca.gov/regulations/ccpa_updates.html (verified: primary)
[23] 12 CFR 1002.9 (Regulation B, notifications) (1002.9(b)(2) statement of specific principal reasons for adverse action; Supplement I commentary; text as of 2026-09-01). eCFR. 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[24] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978) (adverse impact and the "four-fifths rule", with statistical-significance and small-numbers caveats; text as of 2026-09-01). eCFR. 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[25] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Korea AI Basic Act) (Act No. 20676, in force 2026-01-22; Art. 2 as amended 2026-01-20; Arts. 2(4) high-impact areas, 2(7) AI business operators, 33 confirmation, 34 high-impact duties, 36 domestic representative). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[26] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (agency AI Governance Boards chaired at Deputy Secretary level with IT, cybersecurity, data, budget, legal, privacy, civil rights and civil liberties representation). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[27] The AI Risk Repository: a meta-review, database, and taxonomy of risks from artificial intelligence (Domain Taxonomy of 7 domains and 24 subdomains; CC BY 4.0). Slattery, Saeri, Grundy et al., Patterns (Cell Press). 2026. https://doi.org/10.1016/j.patter.2026.101517 (verified: primary)
[28] "Name it to tame it: defining AI incidents and hazards" (summary of the OECD paper "Defining AI incidents and related terms", doi 10.1787/d1a8d965-en). OECD.AI. 2024-05-17. https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards (verified: primary)
[29] NIST AI RMF Playbook, GOVERN (per subcategory: About, Suggested Actions, Transparency and Documentation, References; GOVERN 1.7 decommissioning and phasing out safely). NIST Trustworthy and Responsible AI Resource Center. 2026. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[30] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (risk tolerance and residual risk; seven trustworthy characteristics; transparency answers "what happened", explainability "how", interpretability "why"; MAP 1.1 intended purposes; MANAGE 1.1 go/no-go determination; profiles). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[31] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; AI-system definition revised 8 Nov 2023; revised 3 May 2024; five principles and five recommendations; 1.3 enables people adversely affected to challenge an output; definitions of AI system, lifecycle and AI actors). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[32] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[33] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed with users' biometric information, to be deleted). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[34] Directive on Automated Decision-Making (algorithmic impact assessment completed and published before production; Appendix B and C impact levels; recourse; modified 2025-06-24). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[35] Directive (EU) 2024/2831 on improving working conditions in platform work (Arts. 7 limits on processing, 9 transparency, 10 human oversight, 11 human review; transposition by 2 Dec 2026). Official Journal of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj (verified: primary)
[36] Algorithmic Transparency Recording Standard Hub (mandatory for government departments and for arm's-length bodies delivering public or frontline services). Government Digital Service. 2025-05-08. https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub (verified: primary)
[37] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list presented 17 Jul 2020 after a pilot; document and web tool). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[38] Regulation (EU) 2016/679 (General Data Protection Regulation) (Arts. 4(1), 4(5), 4(7), 4(8), 4(12), 4(14), 5, 6, 9, 12(3), 22, 25, 28(2) and 28(4), 30, 33, 35; Recital 26). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[39] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[40] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (referenced by identifier only; autonomy and heteronomy; clause 5.11 machine learning approaches: supervised, unsupervised, semi-supervised, reinforcement). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: secondary)
[41] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories of AI bias: systemic, statistical and computational, and human). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[42] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021; bias audit by an independent auditor within the past year; selection rates and impact ratios by sex, race/ethnicity and intersectional categories; public summary; notice before use). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[43] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[44] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[45] On Calibration of Modern Neural Networks (modern networks poorly calibrated; ICML 2017; arXiv 1706.04599). Guo, Pleiss, Sun and Weinberger. 2017-06-14. https://arxiv.org/abs/1706.04599 (verified: primary)
[46] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (Kleinberg, Mullainathan and Raghavan; three fairness conditions cannot hold together except in special cases; arXiv 1609.05807). arXiv. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[47] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[48] ISO/IEC 42001:2023, AI management systems (referenced by identifier only; requirements for an AI management system; clause 10.2 nonconformity and corrective action). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[49] Overcoming catastrophic forgetting in neural networks (networks lose earlier competence when trained on new tasks; arXiv 1612.00796). Kirkpatrick et al.. 2016-12-02. https://arxiv.org/abs/1612.00796 (verified: primary)
[50] Working groups and projects of CEN-CENELEC JTC 21 (WG 2 operational aspects, WG 3 engineering aspects, WG 4 foundational and societal aspects, WG 5 cybersecurity). JTC 21 website. 2026. https://jtc21.eu/working-groups/ (verified: secondary)
[51] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation; arXiv 2004.05785). Lu et al.. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[52] Content Credentials: C2PA Technical Specification, version 2.2 (a manifest of assertions, a claim and a claim signature bound to an asset). Coalition for Content Provenance and Authenticity (C2PA). 2025-05. https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html (verified: primary)
[53] NIST AI 100-4, Reducing Risks Posed by Synthetic Content: An Overview of Technical Approaches to Digital Content Transparency (provenance data tracking, watermarking, metadata recording and synthetic-content detection). NIST. 2024-11-20. https://doi.org/10.6028/NIST.AI.100-4 (verified: primary)
[54] "Counterfactual Explanations without Opening the Black Box: Automated Decisions and the GDPR" (Wachter, Mittelstadt and Russell; Harvard Journal of Law & Technology, 2018; arXiv 1711.00399). arXiv. 2017-11-01. https://arxiv.org/abs/1711.00399 (verified: primary)
[55] "Counterfactual Fairness" (Kusner, Loftus, Russell and Silva; arXiv 1703.06856). arXiv. 2017-03-20. https://arxiv.org/abs/1703.06856 (verified: primary)
[56] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[57] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about the entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[58] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[59] "Fairness Through Awareness" (Dwork, Hardt, Pitassi, Reingold and Zemel; individual fairness; limits of statistical parity; arXiv 1104.3913). arXiv. 2011-04-20. https://arxiv.org/abs/1104.3913 (verified: primary)
[60] "Products liability" (design, manufacturing and marketing defects, incl. failure to warn; consumer-expectation and risk-utility tests). Legal Information Institute, Wex. 2026. https://www.law.cornell.edu/wex/products_liability (verified: secondary)
[61] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[62] 42 U.S.C. § 2000e-2 (Title VII: unlawful employment practices; 2000e-2(k) burden of proof in disparate-impact cases, business necessity and less discriminatory alternatives). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/42/2000e-2 (verified: secondary)
[63] Council Directive 2000/43/EC (Racial Equality Directive) (Art. 2(2)(a) direct and 2(2)(b) indirect discrimination, with objective justification). Official Journal of the EU (EUR-Lex). 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj/eng (verified: primary)
[64] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, in force 2026-01-22; Art. 29 domestic-representative thresholds). Korean Law Information Center (MOLEG). 2026-01-21. https://www.law.go.kr/LSW/lsInfoP.do?efYd=20260122&lsiSeq=282879 (verified: primary)
[65] Guidelines on obligations for general-purpose AI providers, FAQ (a modifier becomes a provider only when the modification uses more than one third of the original model's training compute; obligations limited to the modification). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers (verified: primary)
[66] "Dual use of artificial-intelligence-powered drug discovery" (an inverted toxicity model proposed about 40,000 candidate toxic molecules in under six hours; Nature Machine Intelligence). Urbina, Lentzos, Invernizzi and Ekins (PubMed Central). 2022-03-07. https://pmc.ncbi.nlm.nih.gov/articles/PMC9544280/ (verified: primary)
[67] SR 26-2, Revised Guidance on Model Risk Management (issued 17 Apr 2026 by the Federal Reserve, OCC and FDIC; supersedes and replaces SR 11-7 of 4 Apr 2011 and SR 21-8; effective challenge). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[68] "Equality of Opportunity in Supervised Learning" (Hardt, Price and Srebro; equalised odds and equal opportunity; arXiv 1610.02413). arXiv. 2016-10-07. https://arxiv.org/abs/1610.02413 (verified: primary)
[69] Evidence-record schema v1 (evidence-record.v1.json) (AI Governance Engineer templates and schemas library). aigovernanceengineer.com. 2026-09-24. https://aigovernanceengineer.com/schemas/evidence-record.v1.json (verified: primary)
[70] 17 U.S.C. § 107, Limitations on exclusive rights: fair use (the four factors). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/17/107 (verified: secondary)
[71] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (Kearns, Neel, Roth and Wu; arXiv 1711.05144). arXiv. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[72] "Communication-Efficient Learning of Deep Networks from Decentralized Data" (McMahan et al.; federated learning; arXiv 1602.05629). arXiv. 2016-02-17. https://arxiv.org/abs/1602.05629 (verified: primary)
[73] On the Opportunities and Risks of Foundation Models ("trained on broad data at scale"; defects inherited downstream; arXiv 2108.07258). Bommasani et al. (Stanford CRFM). 2021-08-16. https://arxiv.org/abs/2108.07258 (verified: primary)
[74] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225) (Art. 3 scope and private-actor declaration; Arts. 14 and 15 remedies and safeguards; Art. 16 risk and impact management). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[75] Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (twelve risks unique to or exacerbated by generative AI; confabulation defined). NIST. 2024-07. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[76] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models (content approved 18 July 2025 by C(2025) 5045 final; formal text C(2025) 7719 final of 19 Nov 2025; paras. 65 to 68 on modifiers; non-binding; indicative criterion of training compute above 10^23 FLOP with the ability to generate language, images or video). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[77] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[78] Management system standards (Harmonized Structure; Annex SL common text; integrated management systems). ISO. 2026. https://www.iso.org/management-system-standards.html (verified: primary)
[79] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems (11 actions; voluntary; builds on the OECD AI Principles). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[80] HUDERIA: risk and impact assessment of AI systems (HUDERIA Methodology approved 26 Feb 2025; non-binding). Council of Europe. 2026. https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems (verified: primary)
[81] Ethics Guidelines for Trustworthy AI (four ethical principles; seven requirements; human-in-the-loop, human-on-the-loop and human-in-command oversight). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[82] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data includes data derived or extrapolated from non-health information, incl. by algorithms or machine learning). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[83] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (Art. 8 internal channels for private entities with 50 or more workers; Art. 9 acknowledgment within seven days and feedback within three months; Art. 19 no retaliation). Publications Office of the EU (EUR-Lex). 2019-10-23. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[84] LLM01:2025 Prompt Injection (OWASP Top 10 for LLM Applications 2025; direct and indirect injection; jailbreaking as a form of prompt injection that makes the model disregard its safety protocols). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (verified: primary)
[85] JSON Schema Draft 2020-12. JSON Schema. 2022-06-16. https://json-schema.org/draft/2020-12 (verified: primary)
[86] Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone (3.8-billion-parameter model deployable on a phone; arXiv 2404.14219). Abdin et al. (Microsoft). 2024-04-22. https://arxiv.org/abs/2404.14219 (verified: primary)
[87] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13; operative 2026-08-02; latent disclosures in generated content). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[88] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (three-step legitimate-interest test; anonymity test and evidence). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[89] "'Why Should I Trust You?': Explaining the Predictions of Any Classifier" (Ribeiro, Singh and Guestrin; LIME; arXiv 1602.04938). arXiv. 2016-02-16. https://arxiv.org/abs/1602.04938 (verified: primary)
[90] "Machine Unlearning" (Bourtoule et al.; SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[91] Commission Delegated Regulation (EU) 2025/301 (Art. 5, time limits for major ICT-related incident reports under DORA; Art. 5(2) late classification). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[92] "Membership Inference Attacks against Machine Learning Models" (Shokri et al.; arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[93] Hierarchy of Controls (elimination, substitution, engineering controls, administrative controls, PPE). CDC / NIOSH. 2024-04-10. https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html (verified: primary)
[94] "Model Inversion Attacks that Exploit Confidence Information and Basic Countermeasures" (Fredrikson, Jha and Ristenpart; CCS 2015). ACM. 2015-10-12. https://doi.org/10.1145/2810103.2813677 (verified: primary)
[95] General-Purpose AI Code of Practice, Safety and Security chapter (Commitment 9, serious incident reporting, Measure 9.2; Appendix 1.4 specified systemic risks, incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[96] SB 1223, Consumer privacy: sensitive personal information: neural data (neural data added to sensitive personal information under the CCPA; Chapter 887, Statutes of 2024). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1223 (verified: primary)
[97] OECD Framework for the Classification of AI Systems (OECD Digital Economy Papers No. 323; People & Planet, Economic Context, Data & Input, AI Model, Task & Output). OECD. 2022-02-22. https://doi.org/10.1787/cb6d9eca-en (verified: primary)
[98] "How the machine thinks: Understanding opacity in machine learning algorithms" (three forms of opacity; Big Data & Society 3(1)). SAGE (Jenna Burrell). 2016-01-06. https://doi.org/10.1177/2053951715622512 (verified: primary)
[99] Llama 3.1 Community License Agreement (an example of an open-weight licence with an incorporated acceptable-use policy and attribution terms). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[100] Personal Information Protection Law of the People's Republic of China (Arts. 55 and 56 personal information protection impact assessment, records kept three years; official English translation). National People's Congress. 2021-08-20. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[101] Directive (EU) 2024/2853 on liability for defective products (software as a product; defectiveness incl. the ability to continue to learn; substantial modification; transposition by 9 Dec 2026). Official Journal of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj (verified: primary)
[102] "Dissecting racial bias in an algorithm used to manage the health of populations" (Obermeyer, Powers, Vogeli and Mullainathan; Science 366(6464):447-453; cost as a proxy for need). Science. 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[103] "Actionable Recourse in Linear Classification" (Ustun, Spangher and Liu; recourse as the ability to change a model's decision by altering actionable inputs; arXiv 1809.06514). arXiv. 2018-09-18. https://arxiv.org/abs/1809.06514 (verified: primary)
[104] "Extracting Training Data from Large Language Models" (Carlini et al.; verbatim training sequences extracted, incl. personal data; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[105] "Training language models to follow instructions with human feedback" (Ouyang et al.; supervised fine-tuning on demonstrations, then reinforcement learning from human feedback on ranked outputs; arXiv 2203.02155). arXiv. 2022-03-04. https://arxiv.org/abs/2203.02155 (verified: primary)
[106] "OpenRAIL: Towards open and responsible AI licensing frameworks" (use-based restrictions that redistributions and derivatives must carry). Hugging Face. 2022-08-31. https://huggingface.co/blog/open_rail (verified: primary)
[107] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (parametric and non-parametric memory; arXiv 2005.11401). Lewis et al.. 2020-05-22. https://arxiv.org/abs/2005.11401 (verified: primary)
[108] Concrete Problems in AI Safety (reward hacking among five practical problems; arXiv 1606.06565). Amodei et al.. 2016-06-21. https://arxiv.org/abs/1606.06565 (verified: primary)
[109] ISO 31073:2022, Risk management: Vocabulary (replaced ISO Guide 73:2009, withdrawn; referenced by identifier only). ISO/TC 262. 2022-02. https://www.iso.org/standard/79637.html (verified: primary)
[110] What's Wrong with Risk Matrices? (L. A. Cox Jr.; Risk Analysis 28(2) 497-512). Wiley. 2008-04. https://doi.org/10.1111/j.1539-6924.2008.01030.x (verified: primary)
[111] Crosswalk: AI RMF (1.0) and ISO/IEC FDIS 23894 (function-to-clause mapping, incl. risk sources). NIST. 2023-01-26. https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf (verified: primary)
[112] IEC 61025:2006, Fault tree analysis (FTA) (edition 2.0). IEC. 2006-12-13. https://webstore.iec.ch/en/publication/4311 (verified: primary)
[113] "A Unified Approach to Interpreting Model Predictions" (Lundberg and Lee; SHAP; arXiv 1705.07874). arXiv. 2017-05-22. https://arxiv.org/abs/1705.07874 (verified: primary)
[114] "System Cards, a new resource for understanding how AI systems work" (documents a whole system of models, AI and non-AI components, where a model card documents one model). Meta AI. 2022-02-23. https://ai.meta.com/blog/system-cards-a-new-resource-for-understanding-how-ai-systems-work/ (verified: primary)
[115] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Arts. 3 and 4: text and data mining for research and a general exception subject to a machine-readable reservation). Official Journal of the EU (EUR-Lex). 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj (verified: primary)
[116] Proving Test Set Contamination in Black Box Language Models (Oren et al.; arXiv 2310.17623). arXiv. 2023-10-26. https://arxiv.org/abs/2310.17623 (verified: primary)
[117] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[118] Template for general-purpose AI model providers to summarise their training content (mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[119] Recommendations 01/2020 on measures that supplement transfer tools to ensure compliance with the EU level of protection of personal data (version 2.0). European Data Protection Board. 2021-06-18. https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en (verified: primary)
[120] 15 U.S.C. § 45 (FTC Act section 5) (unfair or deceptive acts or practices; 45(n) standard for unfairness). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/15/45 (verified: secondary)
[121] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"; the principles apply to traditional statistical and quantitative models and non-generative, non-agentic AI models). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
[122] "Levels of Autonomy for AI Agents" (K. J. Kevin Feng, David W. McDonald, Amy X. Zhang; arXiv 2506.12469; autonomy as a deliberate design decision separate from capability and operational environment; five levels by user role: operator, collaborator, consultant, approver, observer). arXiv. 2025-06-14 (v2 2025-07-28). https://arxiv.org/abs/2506.12469 (verified: primary)
[123] RFC 8693, OAuth 2.0 Token Exchange (impersonation versus delegation semantics; the act (actor) claim; nested act claims record prior actors). IETF. 2020-01. https://www.rfc-editor.org/rfc/rfc8693.html (verified: primary)
[124] SPIFFE overview (short-lived cryptographic identity documents called SVIDs, as X.509 certificates or JWTs; the Workload API issues and rotates them; SPIRE implementation). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-about/overview/ (verified: primary)
[125] Model Context Protocol, Security Best Practices, version 2026-07-28 (token passthrough defined and explicitly forbidden; servers MUST NOT accept any tokens not explicitly issued for them; audience validation). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices (verified: primary)
[126] MITRE ATLAS data, release v2026.09 (AML.T0080 AI Agent Context Poisoning, .000 Memory; AML.T0110 AI Agent Tool Poisoning). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[127] Agent Control Standard (ACS) repository (a wire specification that lets a separate guardian agent permit, deny or modify an agent's action before it happens; the reference guardian's failure posture defaults to proceed, overridable to deny; donated to the OWASP GenAI Security Project, announced 1 Sep 2026). OWASP GenAI Security Project (GitHub). 2026-09-01. https://github.com/GenAI-Security-Project/agent-control-standard (verified: primary)
[128] OWASP GenAI LLM Top 10 2026 (published 3 Aug 2026; LLM01:2026 Prompt Injection, incl. memory persistence; LLM08:2026 Hidden Context Exposure, which replaced System Prompt Leakage: assume hidden context is discoverable, no credentials in it, not a security boundary; final text in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[129] Agent2Agent (A2A) Protocol Specification, v1.0 (v1.0.0 released 2026-03-12 and v1.0.1 on 2026-05-28 in github.com/a2aproject/A2A; Agent Card at /.well-known/agent-card.json, signed with JWS over JCS-canonicalised JSON; servers authenticate every request; authorisation implementation-specific; scope and revocation of in-task authorisation not defined). A2A Project (Linux Foundation). 2026-05-28. https://a2a-protocol.org/latest/specification/ (verified: primary)
[130] "A New Chapter for A2A: Joining the Agentic AI Foundation" (A2A accepted as a Growth Stage project of the Linux Foundation-directed Agentic AI Foundation, alongside MCP). A2A Project. 2026-08-27. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/ (verified: primary)
[131] draft-ietf-oauth-transaction-tokens-11, Transaction Tokens (Internet-Draft, OAuth working group, revision 11 of 30 Jul 2026, WG state "Waiting for Write-Up"; short-lived signed tokens that propagate user identity, workload identity and authorisation context through a call chain within a trusted domain). IETF. 2026-07-30. https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/ (verified: primary)
[132] draft-ietf-oauth-client-id-metadata-document-02, OAuth Client ID Metadata Document (Internet-Draft, OAuth working group, revision 02 of 6 Jul 2026; a URL used as client_id that refers to the client's metadata document). IETF. 2026-07-06. https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/ (verified: primary)
[133] Threats: Microsoft Threat Modeling Tool (the STRIDE model: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege; the tool is a core element of the Security Development Lifecycle). Microsoft Learn. 2017-08-17. https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats (verified: primary)
[134] Threat Modeling Manifesto (threat modelling as analysing representations of a system to highlight concerns about security and privacy characteristics; four key questions). Threat Modeling Manifesto working group. n.d. (accessed 2026-09-25). https://www.threatmodelingmanifesto.org/ (verified: primary)
[135] "An Introduction to the OpenSSF Model Signing (OMS) Specification" (detached signature over a manifest of file hashes; Sigstore bundle format; PKI-agnostic: private PKI, self-signed certificates, bare keys, keyless Sigstore). OpenSSF. 2025-06-25. https://openssf.org/blog/2025/06/25/an-introduction-to-the-openssf-model-signing-oms-specification/ (verified: primary)
[136] SLSA specification v1.2, Build track basics (provenance: what built the artefact, by what process and from which top-level inputs; Build L1 provenance exists, L2 hosted build platform, L3 hardened builds). OpenSSF SLSA project. n.d. (accessed 2026-09-25). https://slsa.dev/spec/v1.2/build-track-basics (verified: primary)
[137] Safetensors ("a new simple format for storing tensors safely (as opposed to pickle)"). Hugging Face documentation. n.d. (accessed 2026-09-25). https://huggingface.co/docs/safetensors/index (verified: primary)
[138] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[139] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy, 53% on general-purpose content; competent and reliable evidence required at the time a claim is made). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[140] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; retraining; output filters accepted if shown sufficiently effective and robust, based on general rules rather than lists of people). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[141] Authorization (Cedar Policy Language Reference Guide) (no request is allowed unless a permit policy grants it, so the default decision is Deny; any satisfied forbid overrides every permit). Cedar. n.d. (accessed 2026-09-25). https://docs.cedarpolicy.com/auth/authorization.html (verified: primary)
