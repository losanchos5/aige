# 09. Glossary

> The canonical definitions for the book: every term defined once, alphabetically, and
> cross-referenced to the chapter that treats it in full.

Terms are listed alphabetically. Each is one to three sentences. Where a term has a canonical spelling
in the style guide (§8), that spelling is used here and everywhere in the book. A parenthetical points
to the chapter that develops the term. Numbers and dates carry a `[n]` citation; plain definitions do
not.

**Agent (agentic AI).** An AI system that acts (browses, executes code, calls APIs, moves data or
delegates to other agents) under delegated authority, rather than only producing text. Agents are the
hardest object to govern because their behaviour is emergent and their actions have external effects.
(ch. 01)

**Agent registry.** The runtime-aware inventory of every non-human actor (model, service and agent),
each with an owner, a declared scope, a status and a kill switch, fed by a runtime data path rather
than typed by hand. It is the artefact that answers "what AI is running?". (ch. 04, 06)

**AESIA.** Spain's Agencia Española de Supervisión de la Inteligencia Artificial, based in A Coruña;
the first operational national AI supervisor in the EU, with sanctioning powers since 2025 [1]. (ch. 08)

**AI Act (EU).** Regulation (EU) 2024/1689, the EU's horizontal, risk-tiered law for AI, amended by the
Digital Omnibus [2]. It classifies systems by risk (prohibited, high-risk, limited, minimal) and
imposes obligations accordingly. (ch. 08)

**AI governance engineer.** The person who holds the capability of AI governance engineering and is
accountable for the three questions in production; a capability and a role, not necessarily a job
title. (ch. 06)

**AI governance engineering.** The application of engineering practice (systems thinking, product
thinking and code) to the governance of AI systems; measured by realised risk reduction and
audit-ready evidence. (ch. 01)

**AI Office.** The European Commission body that supervises general-purpose AI and coordinates AI Act
enforcement, with investigation powers and the ability to levy penalties on GPAI providers [2]. (ch. 08)

**AI RMF functions.** The four core functions of the NIST AI Risk Management Framework (**Govern,
Map, Measure, Manage**), used throughout the book as a mapping target for controls [3]. (ch. 08)

**AIBOM.** AI bill of materials: the machine-readable inventory of an AI system's components (models,
datasets, dependencies) in formats such as CycloneDX ML-BOM or the SPDX 3.0 AI profile. (ch. 04, 05)

**AICM.** The CSA AI Controls Matrix, a control framework (v1.1, 247 control objectives across 18
domains) that maps to ISO 42001, ISO 27001 and NIST AI RMF and underpins STAR for AI [4]. (ch. 08)

**AIMA.** The OWASP AI Maturity Assessment, reported at v1.0 (Aug 2025), which scores the breadth of an
AI security and governance programme across domains [5]. (ch. 07)

**AIMS.** An AI management system: the governance structure, roles, controls and continual-improvement
loop that ISO/IEC 42001 certifies. An AIMS is not the AI Act's Article 17 quality management system.
(ch. 07, 08)

**Annex I (EU AI Act).** The AI Act annex listing the Union harmonisation legislation under which AI is
embedded in regulated products (machinery, medical devices, toys and the like); obligations for these
high-risk embedded systems phase in from 2 August 2028 under the Digital Omnibus timeline [2]. (ch. 08)

**Annex III.** The AI Act annex listing high-risk use cases (biometrics, critical infrastructure,
employment, essential services, law enforcement, migration, justice); obligations for these phase in
under the Digital Omnibus timeline [2]. (ch. 08)

**ASI01–ASI10.** The ten risks of the OWASP Top 10 for Agentic Applications 2026 (from ASI01 Agent
Goal Hijack and ASI02 Tool Misuse through ASI03 Agent Identity & Privilege Abuse to ASI10 Rogue Agents),
the canonical threat list for agents [6]. (ch. 05)

**ATLAS.** MITRE's Adversarial Threat Landscape for Artificial-Intelligence Systems, a knowledge base
of adversary tactics and techniques against AI, including agent-specific techniques [7]. (ch. 05, 10)

**Audit-ready evidence.** Evidence emitted as a by-product of the build in a form an auditor can read
directly (machine-readable, signed, timestamped), so the audit is a query, not a collection project.
(ch. 01, 04)

**CAC (Cyberspace Administration of China).** China's internet regulator (国家互联网信息办公室),
lead issuer of the binding AI rules (algorithmic recommendation, deep synthesis, generative AI
services and AI-content labelling) and the body under whose guidance TC260 publishes the AI Safety
Governance Framework [18]. (ch. 08)

**Cedar.** An open-source policy language for fine-grained authorization, used as a policy-as-code
engine for runtime access decisions; a schema-typed, analysable alternative to `OPA/Rego`. (ch. 04, 05)

**CIMD.** Client ID Metadata Document: the MCP mechanism (2026 spec) by which a client identifies
itself via a URL-addressable metadata document, replacing deprecated Dynamic Client Registration [8].
(ch. 05)

**Continuous assurance.** Assurance produced continuously from telemetry rather than at a point in
time; the control's status is a live query, not an annual sign-off. It is Level 5 of the maturity
model. (ch. 04, 07)

**Data card.** Structured, versioned documentation of a dataset (provenance, lawful basis, rights,
composition and known limitations) maintained as code alongside the system. (ch. 04)

**Digital Omnibus.** The 2026 reform package amending the EU AI Act (in force 27 Jul 2026), which
adjusted the high-risk timeline, added AI Office investigation powers and reworked several articles [2].
(ch. 08)

**DPIA.** Data Protection Impact Assessment: the GDPR Article 35 assessment of processing likely to
result in high risk to individuals, maintained in this discipline as a versioned artefact, not a
one-off document. (ch. 04, 05)

**Drift.** The gradual divergence of a model's inputs, outputs or performance from its validated
baseline over time; a runtime signal that a control or eval must catch. (ch. 04)

**Duty holder.** Who an obligation legally binds (under the EU AI Act, the provider, the deployer or
both), as distinct from who enforces it; chapter 08 carries a duty-holder column so an engineer can
tell which artefacts their organisation is responsible for producing. (ch. 08)

**EN 18286.** The European standard for the AI Act's Article 17 quality management system, published by
CEN-CENELEC in July 2026 (the first JTC 21 AI Act standard to reach publication), but not yet cited in
the Official Journal, so it confers no presumption of conformity [10]. (ch. 08)

**Eval gate.** A pipeline stage that fails the build when an eval fails; the mechanism that turns an
evaluation into an enforced control rather than a report. (ch. 04, 05)

**Evals.** Automated tests of a model's or agent's behaviour (capability, safety and adversarial),
run as controls, not as one-off research. (ch. 04)

**Evals as evidence.** The principle that the eval run *is* the assurance evidence: a failing eval
blocks the build and its structured result is stored as proof the control fired. (ch. 03, 04)

**Framework crosswalk.** A mapping of one framework's controls onto another's; useful as an index, but
a crosswalk proves you read the framework, not that the mapped control fires. (ch. 08)

**FRIA.** Fundamental Rights Impact Assessment: the AI Act Article 27 assessment of a high-risk
system's impact on rights, maintained here as a versioned, reviewable artefact. (ch. 04, 05)

**Governance-as-code.** Governance rules expressed as executable code that evaluates pull requests,
deployments and runtime calls and returns a decision; the umbrella term of which policy-as-code is the
CI/CD subset. (ch. 03, 04)

**GPAI.** General-purpose AI: models that can serve many tasks, governed by dedicated AI Act
obligations (transparency, copyright, and for systemic-risk models, evaluation and incident reporting)
enforced by the AI Office from 2 Aug 2026 [2]. (ch. 08)

**GPAI Code of Practice.** The voluntary instrument (published 10 July 2025) that general-purpose-AI
providers use to demonstrate compliance with their AI Act obligations until harmonised standards exist;
three chapters: Transparency, Copyright, and Safety and Security (the last for systemic-risk models)
[16]. (ch. 08)

**Guardian agent.** An AI agent whose job is to supervise, check or constrain other agents at runtime;
Gartner is reported to project guardian agents as a material share of the agentic market by 2030 [9]. (ch. 04, 05)

**Harmonised standard.** A European standard cited in the Official Journal that, once cited, grants a
presumption of conformity with a specific AI Act requirement. As of the book's date, none is yet cited
[10]. (ch. 08)

**ISO/IEC 42005.** ISO/IEC 42005:2025, the AI system impact-assessment standard (a companion to the AI
Act's Article 27 FRIA and to ISO/IEC 42001 Annex A.5), giving a structured method for assessing an AI
system's impacts on people and society [17]. (ch. 08)

**Kill switch.** A tested mechanism to stop an agent or system from acting; a precondition of granting
autonomy, registered against the agent's identity. (ch. 03, 05)

**Machine-readable evidence.** Evidence a machine can query, diff and aggregate (`OSCAL` artefacts,
structured eval results, signed logs), as opposed to screenshots and exported spreadsheets. (ch. 03, 04)

**Market surveillance authority.** The national authority designated to enforce the AI Act for products
placed on its market, with powers to investigate, demand documentation and require corrective action.
(ch. 08)

**MCP.** Model Context Protocol: an open protocol for connecting AI applications to tools and data
sources; its 2026 specification adds OAuth 2.1 resource-server patterns and issuer-bound credentials
for agent authorisation [8]. (ch. 05)

**Model card.** Structured, versioned documentation of a model (provenance, intended use,
capabilities, evaluations and known failure modes) maintained as code. (ch. 04)

**Model risk management.** The SR 11-7-tradition practice of validating models for conceptual soundness
and back-testing them; a neighbour of this discipline, extended here to runtime behaviour and agents.
(ch. 01)

**NHI.** Non-human identity: the identity of an agent, service account or machine actor. Every NHI gets
a registry entry, an owner and a scope before it is allowed to act. (ch. 04, 05)

**OPA/Rego.** The Open Policy Agent and its Rego policy language, a general-purpose policy-as-code
engine that evaluates governance rules in CI/CD and at runtime admission; the canonical example of
executable policy-as-code. (ch. 04, 05)

**OSCAL.** The Open Security Controls Assessment Language, a NIST machine-readable format for controls,
assessments and evidence, used here as the format for audit-ready evidence [3]. (ch. 04, 10)

**Paved path.** A supported, low-friction default route (a template, library or pipeline) that makes
the governed way the easiest way to ship, so engineers adopt governance without asking permission.
(ch. 03, 06)

**Policy Card.** A JSON-schema, machine-readable governance artefact that declares an agent's allowed
and forbidden behaviours for runtime enforcement [11]. (ch. 04, 10)

**Policy-as-code.** Governance policy expressed in an executable policy language (`OPA/Rego`, Cedar)
that evaluates in CI/CD and at admission; the narrower, pipeline subset of governance-as-code. (ch. 04,
05)

**Post-market monitoring.** The AI Act Article 72 duty to actively monitor a high-risk system's
performance and risks after deployment, throughout its lifetime [2]. (ch. 08)

**Presumption of conformity.** The legal effect by which conforming to a cited harmonised standard is
taken as meeting the corresponding AI Act requirement; unavailable until a standard is OJ-cited [10].
(ch. 08)

**QMS (Art. 17).** The quality management system that AI Act Article 17 requires of high-risk
providers; distinct from an ISO/IEC 42001 AIMS, which certifies a management system but is not
harmonised [2][10]. (ch. 08)

**RAISE Act.** New York's Responsible AI Safety and Education Act, a frontier-AI safety law binding
large frontier developers to publish a safety framework and disclose incidents; signed 19 December 2025
and taking effect 1 January 2027 after a March 2026 chapter amendment that placed oversight in an office
within the Department of Financial Services (DFS) [12][15]. (ch. 08)

**Realised risk reduction.** The measured drop in a named failure mode's rate or blast radius in
production; one of the two tests of the discipline, against framework coverage. (ch. 01, 03)

**Red teaming.** Structured adversarial testing of a model or agent to elicit failures (jailbreaks,
injection, tool misuse) before an attacker does; treated here as an evidence-producing control. (ch.
04, 05)

**Runtime data path.** The live connection between production and the governance function (discovery,
telemetry and enforcement), without which a registry or dashboard describes the program but cannot see
what is running [13]. (ch. 04, 07)

**SB 53.** California's frontier-AI transparency law (TFAIA), in force 1 Jan 2026, covering large
frontier developers training models above 10^26 FLOP, with transparency and safety-framework
obligations [14]. (ch. 08)

**Serious incident.** Under the AI Act, an incident causing death, serious harm to health, fundamental
rights or property, or serious disruption of critical infrastructure, triggering Article 73 reporting
duties [2]. (ch. 04, 08)

**Shadow AI.** An AI system, model or agent running in production without registering; the failure
mode that makes an inventory complete only for the honest. (ch. 07)

**STAR for AI.** CSA's security assurance and certification programme for AI, built on the AICM, with a
self-assessment tier, an automated "Valid-AI-ted" tier and a Level 2 combining ISO/IEC 42001 with the
validated assessment [4]. (ch. 07, 08)

**Systemic risk.** Under the AI Act, the risk posed by the most capable general-purpose AI models,
triggering extra evaluation, adversarial-testing and incident-reporting duties on their providers [2].
(ch. 08)

**TC260.** The National Technical Committee 260 on Cybersecurity of the Standardization
Administration of China (全国网络安全标准化技术委员会), which drafts China's cybersecurity and AI
national standards (GB and GB/T) and publishes the voluntary AI Safety Governance Framework (1.0 in
2024, 2.0 in 2025, 3.0 on 14 September 2026) [19]. (ch. 08)

## Sources

[1] AESIA (first operational national AI supervisor; sanctioning powers 2025). Research digest / AESIA. 2026. https://www.aesia.gob.es/ (verified: secondary)
[2] EU AI Act + Digital Omnibus (Regulation (EU) 2026/1744, in force 27 Jul 2026; Arts. 17, 27, 50, 55, 72, 73; Annex III). AI Act Explorer. 2026. https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ (verified: primary)
[3] NIST AI Risk Management Framework 1.0 (Govern, Map, Measure, Manage); OSCAL. NIST. 2023. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[4] AI Controls Matrix v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/star/ai (verified: primary)
[5] OWASP AI Maturity Assessment (AIMA), reported at v1.0 (Aug 2025). OWASP GenAI Security Project. 2025. https://genai.owasp.org/initiatives/ (verified: reported)
[6] Top 10 for Agentic Applications 2026 (ASI01–ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[7] MITRE ATLAS (adversarial threat knowledge base for AI). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[8] Model Context Protocol specification 2026-07-28 (OAuth 2.1 resource servers; Client ID Metadata Documents; issuer-bound credentials). Anthropic / MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[9] Guardian agents reported as a material share (reported figure: 10-15%) of the agentic AI market by 2030: a separate Gartner guardian-agent prediction; the figure is not stated in the June 2025 project-cancellation release. Gartner (reported). 2025. https://www.gartner.com/en/newsroom (verified: reported)
[10] No harmonised standard cited in the OJ → no presumption of conformity; ISO/IEC 42001 not harmonised. JTC 21 standards tracker. 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[11] Policy Cards: machine-readable runtime governance artefacts for agents. arXiv 2510.24383. 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[12] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; oversight office within the Department of Financial Services). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[13] Runtime data path critique of the AI-governance platform category. Kosmoy. 2026. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[14] California SB 53 / TFAIA (in force 1 Jan 2026; models above 10^26 FLOP; large frontier developers). Future of Privacy Forum. 2026. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[15] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment signed 27 Mar 2026; effective 1 Jan 2027; DFS oversight office). Wiley. 2026. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[16] GPAI Code of Practice (published 10 Jul 2025; voluntary; three chapters: Transparency, Copyright, Safety and Security). AI Act Explorer / European Commission. 2025-07-10. https://artificialintelligenceact.eu/introduction-to-code-of-practice/ (verified: primary)
[17] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[18] 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance). Cyberspace Administration of China. 2026-09-14. https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm (verified: primary)
[19] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF. TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
