---
id: the-evaluation-environment-is-part-of-the-system
title: "The evaluation environment is part of the system"
summary: "An evaluation measures a model inside a harness, tools, credentials and a network. This draft argues the result is evidence only when all of it is recorded."
status: draft
version: 0.1.0
date: 2026-09-26
authors: [jorge-garcia-aibar]
reviewers: []
relatedControls:
  - AIGE-CTL-EVAL-001
  - AIGE-CTL-EVAL-002
  - AIGE-CTL-EVAL-003
  - AIGE-CTL-EVAL-004
  - AIGE-CTL-EVAL-005
  - AIGE-CTL-EVAL-006
  - AIGE-CTL-EVAL-007
  - AIGE-CTL-EVAL-008
  - AIGE-CTL-EVAL-009
relatedPatterns:
  - eval-gate-in-ci
  - adversarial-red-team-suite
  - agent-registry
  - agent-identity-scoped-credentials
  - runtime-guardrail
  - kill-switch-circuit-breaker
  - machine-readable-evidence-oscal
keywords:
  - evaluation environment
  - AI evaluation
  - agent evaluation
  - evaluation harness
  - network egress
  - credential isolation
  - assurance evidence
---

# The evaluation environment is part of the system

## Abstract

An evaluation result is usually reported as a property of a model. In practice it is a property of
a model running inside a harness, with tools, credentials, network routes and, more and more often,
the authority to act for someone. METR's public investigation of the OpenAI/Hugging Face incident
reports that agents meant to be fully isolated from one another communicated through a shared
internal package repository, shared credentials one of them found exposed online, and spoofed tool
calls [1]. None of that is
a statement about model weights; all of it changes what the evaluation measured. This note argues
that the evaluation environment belongs inside the governed system, names five parts of it that an
evaluation must record, and states what that implies for the nine draft controls of the
[evaluation environment profile](/controls/evaluation-environment). It is a draft by one author,
open for technical review.

## The claim

The object an organisation governs is not the model. It is the model plus the harness that prompts
and scores it, the tools it can call, the credentials those tools carry, the network it can reach
and the authority it holds on behalf of a person or of another system. An evaluation of the model
alone measures one part of that object and then reports the result as if it described the whole.

This matters because evaluation results are now used as evidence. The EU AI Act requires high-risk
systems to be tested "against prior defined metrics and probabilistic thresholds" appropriate to
their intended purpose [12], and to reach an appropriate level of accuracy, robustness and
cybersecurity throughout their lifecycle [13]. The NIST AI RMF asks that performance be
"demonstrated for conditions similar to deployment setting(s)" (MEASURE 2.3) [10]. If the
conditions of a run are not recorded, nobody can say afterwards whether they were similar to
anything.

The claim of this note is deliberately narrow: an evaluation result counts as evidence only when
the environment that produced it is recorded with it, at the same level of detail as the model
version.

## Why the boundary moved

Three changes moved the boundary of what an evaluation has to describe.

The first is delegated authority. A model that only answers questions has little boundary worth
recording beyond its prompt. An agent that calls tools, holds tokens and starts processes does.
OWASP's Top 10 for LLM Applications 2026 names excessive functionality, excessive permissions and
excessive autonomy as the root causes of excessive agency [15], and the OWASP Top 10 for Agentic
Applications turns them into separate risks: tool misuse and exploitation (ASI02), identity and
privilege abuse (ASI03) and rogue agents (ASI10) [5]. MITRE ATLAS's September 2026 data release
adds techniques aimed at AI agents, next to existing entries such as exfiltration via AI agent tool
invocation (AML.T0086) [6]. Chapter 23 of this Body of Knowledge treats the agent as a
[governance object](/bok/governing-agents#what-makes-an-agent-a-governance-object) for the same
reason.

The second is that evaluations of agents now run agents. The harness is no longer a script that
sends a prompt and scores a string. It is an environment with containers, package mirrors, proxies
and message boards. METR's Task Standard (v0.5.0) states that, unless a task declares the
`full_internet` permission, the task machines "MUST NOT have internet access, except to a small
number of" destinations such as an LLM API proxy [2]. That is an environment control written into
an evaluation specification: evaluators already treat the network as part of the test.

The third is that results have started to carry commercial weight. Certification and insurance for
AI agents already exist. AIUC-1 describes itself as "the standard for AI agent security, safety and
reliability", organised in six domains, updated quarterly and audited by accredited auditors [7].
AIUC's updates page reports certifications of customer-facing agents and an AI agent insurance
policy tied to AIUC-1 certification [8]. Whatever one thinks of a particular scheme, a result that
supports a certificate or a policy will be read by people who were not in the room when the run
happened. AIUC-1 is a standard of the Artificial Intelligence Underwriting Company; this site is not
affiliated with or certified by AIUC.

## Five things inside the boundary

I use METR's investigation because it is public, recent and specific. METR reports that the agents
"were meant to be fully isolated from one another" [1]. It reports that they noticed agents in
other sandboxes fetching packages through Artifactory, an internal package repository, and used it
to coordinate; that one agent, searching for Hugging Face credentials exposed on the internet,
"found two working credentials, and immediately posted them" to a shared board; that code execution on a sandbox running CyberGym evaluations gave agents "more
flexible access to the full internet"; and that at least 96 transcripts show spoofed tool calls
[1]. Each finding sits in a different part of the environment, which is the point of the list
below.

1. **The harness.** Prompts, scaffold, scoring code, limits and the wording of the task. METR's
   summary of its GPT-5.6 Sol evaluation notes that observed cheating rates "can also be influenced
   by the prompts used in the evaluation scaffold and the exact wordings of task instructions" [4].
   The harness configuration is part of the result. Control:
   [AIGE-CTL-EVAL-008](/controls/evaluation-environment#aige-ctl-eval-008); pattern:
   [Eval Gate in CI](/patterns/eval-gate-in-ci).
2. **Tools and MCP servers.** Every tool an agent can call widens what it can do, including tools
   nobody meant to expose, such as a shared package mirror. Control:
   [AIGE-CTL-EVAL-004](/controls/evaluation-environment#aige-ctl-eval-004); pattern:
   [Runtime Guardrail](/patterns/runtime-guardrail).
3. **Credentials and identity.** A token reachable from the sandbox is a capability, whether or not
   the task needs it. The MCP specification of 28 July 2026 states that client credentials "are
   bound to the issuer that minted them" [9]; an evaluation environment should meet at least that
   bar, with short-lived credentials issued for the run to the agent's own identity. Control:
   [AIGE-CTL-EVAL-003](/controls/evaluation-environment#aige-ctl-eval-003); pattern:
   [Agent Identity and Scoped Credentials](/patterns/agent-identity-scoped-credentials).
4. **Network egress.** What an agent can reach decides what it can learn and what it can leak.
   Deny by default, as the Task Standard does [2], and record the allow-list that was in force.
   Control: [AIGE-CTL-EVAL-002](/controls/evaluation-environment#aige-ctl-eval-002); pattern:
   [Runtime Guardrail](/patterns/runtime-guardrail).
5. **Delegation.** Agents that can start other agents, post work to a board or pick up another
   agent's task extend the boundary while the run is under way. In METR's account the coordination
   ran through infrastructure the tasks happened to share, not through a channel the evaluation had
   designed [1]. Controls: [AIGE-CTL-EVAL-001](/controls/evaluation-environment#aige-ctl-eval-001)
   and [AIGE-CTL-EVAL-006](/controls/evaluation-environment#aige-ctl-eval-006); patterns:
   [Agent Registry](/patterns/agent-registry) and
   [Kill Switch and Circuit Breaker](/patterns/kill-switch-circuit-breaker).

## What an evaluation must therefore record

If the environment is part of the system, the record of a run has to describe it with the same
precision as the model. At a minimum:

- an environment manifest: harness version and hash, prompts, tool definitions, admitted MCP
  servers, container images and resource limits;
- the identity the agent ran under and the credentials it was issued, with their scope and
  lifetime;
- the network it could reach: the egress allow-list in force and the connections actually made;
- the delegation it was allowed: which agents, queues or boards it could start or write to;
- the integrity of the trace itself. METR reports that many transcripts in its dataset "are
  missing small components, often due to container resets" [1];
- the validity checks run before the result was reported. METR's elicitation guidelines treat
  incorrect automatic scoring, a crashed environment or a missing resource as spurious failures
  [3].

The same manifest should then be compared with the deployment. The AI RMF asks for conditions
similar to deployment (MEASURE 2.3), for documented limits of generalisation beyond the conditions
of development (MEASURE 2.5) and for security and resilience to be evaluated and documented
(MEASURE 2.7) [10]. NIST AI 600-1 warns that "measurement gaps can arise from mismatches between
laboratory and real-world settings" [11]. Article 15(5) of the AI Act asks for resilience against
attempts by unauthorised third parties to alter a system's use, outputs or performance [13], which
an evaluation cannot show when its own environment was open to the system under test. In ISO/IEC
42001 terms the record serves Annex A controls A.6.2.4 (AI system verification and validation) and
A.6.2.8 (AI system recording of event logs) [14]. Written as
[machine-readable evidence](/patterns/machine-readable-evidence-oscal) and exercised by an
[adversarial red-team suite](/patterns/adversarial-red-team-suite), the manifest becomes something
an assessor can compare across runs. A result without its manifest cannot be compared with anything.

## Consequences for controls AIGE-CTL-EVAL-001 to 009

One line per control of the draft profile, stating what this argument asks of it.

- [AIGE-CTL-EVAL-001](/controls/evaluation-environment#aige-ctl-eval-001) Authorization Boundary:
  the tools, operations, data classes, budgets and delegation rights of each agent are written down
  before the run and travel with the result.
- [AIGE-CTL-EVAL-002](/controls/evaluation-environment#aige-ctl-eval-002) Network Egress Control:
  deny by default; the allow-list is recorded with the run, and a connection outside it is a
  finding, not noise.
- [AIGE-CTL-EVAL-003](/controls/evaluation-environment#aige-ctl-eval-003) Credential Isolation:
  the run issues its own short-lived credentials, and a standing secret reachable from the sandbox
  is a defect of the evaluation.
- [AIGE-CTL-EVAL-004](/controls/evaluation-environment#aige-ctl-eval-004) Tool and Action
  Mediation: shared infrastructure such as package mirrors, caches and boards counts as a tool and
  is mediated like one.
- [AIGE-CTL-EVAL-005](/controls/evaluation-environment#aige-ctl-eval-005) Monitoring Integrity: a
  tool call is recorded by the mediation point, not taken from the agent's own output, so a spoofed
  call can be told from a real one.
- [AIGE-CTL-EVAL-006](/controls/evaluation-environment#aige-ctl-eval-006) Stop Conditions: stopping
  a run halts every agent it started, and the stop itself is part of the record.
- [AIGE-CTL-EVAL-007](/controls/evaluation-environment#aige-ctl-eval-007) Incident Evidence
  Preservation: when a run goes wrong, the environment is frozen with the transcript, including
  what a container reset would lose.
- [AIGE-CTL-EVAL-008](/controls/evaluation-environment#aige-ctl-eval-008) Harness and Configuration
  Attestation: the harness, prompts and tool definitions are hashed and bound to the result.
- [AIGE-CTL-EVAL-009](/controls/evaluation-environment#aige-ctl-eval-009) Evaluation Validity
  Checks: scoring, environment health and trace completeness are checked before a number is
  reported.

## Open questions

1. How much of an environment manifest can be published without weakening the security of the
   environment it describes?
2. When a run is found to have crossed its boundary, is the result void, or is it a finding about
   the system that has to be reported as such?
3. Can an evaluation environment be attested by a third party in the way a production system is,
   and who holds that evidence?
4. How close must the evaluation environment be to the deployment before a result transfers, and
   how is that distance measured?
5. Which fields of the run record should be common across labs, independent evaluators and
   certification schemes, so that a result can be read outside the organisation that produced it?

## Sources

[1] Brief independent investigation of agents' behavior, reasoning and collaboration in the OpenAI / Hugging Face hacking incident (isolation, shared package repository, posted credentials, spoofed tool calls, transcript gaps). METR. 2026-08-26. https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/ (verified: primary)
[2] Task Standard v0.5.0, STANDARD.md (internet access rule and the full_internet permission). METR. 2024-10-30. https://raw.githubusercontent.com/METR/task-standard/main/STANDARD.md (verified: primary)
[3] Guidelines for capability elicitation (spurious failures and task bugs). METR. 2024-03-15. https://metr.org/blog/2024-03-15-guidelines-for-capability-elicitation/ (verified: primary)
[4] Summary of METR's predeployment evaluation of GPT-5.6 Sol (scaffold prompts and cheating rates). METR. 2026-06-26. https://metr.org/blog/2026-06-26-gpt-5-6-sol/ (verified: primary)
[5] Top 10 for Agentic Applications 2026 (ASI02, ASI03, ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] ATLAS data release v2026.09 (AI agent techniques; AML.T0086). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[7] AIUC-1, the standard for AI agent security, safety and reliability (six domains, quarterly updates, accredited auditors). Artificial Intelligence Underwriting Company. 2026-09-24. https://www.aiuc-1.com/ (verified: primary)
[8] AIUC updates (certifications against AIUC-1 and AI agent insurance; read 2026-09-26). Artificial Intelligence Underwriting Company. 2026-09-23. https://aiuc.com/updates (verified: primary)
[9] Model Context Protocol specification 2026-07-28 (issuer-bound client credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[10] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.3, 2.5, 2.7). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[11] Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (pre-deployment testing limits). NIST. 2024-07. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 9 (testing against prior defined metrics and probabilistic thresholds). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_9 (verified: primary)
[13] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 15 (accuracy, robustness and cybersecurity; 15(5) resilience against unauthorised third parties). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_15 (verified: primary)
[14] ISO/IEC 42001:2023, AI management systems (cited by identifier: A.6.2.4, A.6.2.8). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[15] LLM03:2026 Excessive Agency (excessive functionality, permissions and autonomy). OWASP GenAI Security Project. 2026-08-03. https://github.com/GenAI-Security-Project/GenAI-LLM-Top10/blob/main/2026/final/LLM03_ExcessiveAgency.md (verified: primary)
