---
id: sanctioned-ai-gateway
title: Sanctioned AI Gateway
layer: 4
secondaryLayer: 2
order: 28
summary: "Approved AI tools behind single sign-on and one gateway that applies data-class rules, logs use and checks a current acceptable-use attestation."
---

# Pattern: Sanctioned AI Gateway

**Summary:** Put the organisation's approved AI tools and model APIs behind single sign-on and one
gateway that applies the acceptable-use policy as code: data-class rules on what may be sent,
redaction or blocking where the class requires it, a decision event per call, and access conditional
on a current acceptable-use attestation. The gateway is the sanctioned path, and it is built to be
the easiest one; discovery finds what goes around it.

## Objectives
Let staff use AI tools productively while keeping regulated, confidential and secret data out of
tools that are not approved for it, and turn the acceptable-use policy from a handbook page into a
control that decides and leaves evidence.

## Target users
AI governance engineer, security engineer, platform team, procurement.

## Impacted stakeholders
Employees and contractors, customers whose data staff handle, works councils or employee
representatives, the DPO, AI tool suppliers.

## Relevant principles
Make the governed path the easiest path; build the control at the earliest point it can block;
register and bound every actor before it acts.

## Context
Staff adopt AI tools faster than procurement can approve them. In a 2024 vendor survey of 31,000
knowledge workers in 31 countries, 78% of AI users said they bring their own AI tools to work [1].
The organisation already has an acceptable-use policy that lists approved tools and prohibited inputs
by data class (see [acceptable use of AI by staff](/bok/governance-program#acceptable-use-of-ai-by-staff)),
and the EU AI Act, as amended by the Digital Omnibus, asks providers and deployers to take measures to
support the AI literacy of the staff who use AI on their behalf [2]. The failure mode is known: the
case file on [source code pasted into a public chatbot](/cases/chatbot-code-leak-reported) (reported)
is the everyday version, and sensitive information disclosure is a named risk class for LLM
applications [3].

## Problem
A policy that lives in a handbook has no teeth: it is read once, attested once and never evaluated
at the moment someone pastes a customer file into a public tool. Blocking every public tool pushes
use onto personal devices, where nothing is seen. Discovery alone finds the leak after it happened.

### Forces
- **Convenience against control.** Every extra step on the approved path sends people back to the
  unapproved one.
- **Inspection against privacy.** Logging staff prompts is itself processing of employees' personal
  data, so the gateway keeps what the control needs, for as long as it needs it [4].
- **Latency against redaction.** Content classification and redaction add time to every call.
- **Supplier terms against drift.** An approved tool is only safe on the terms it was approved under,
  such as no training on customer inputs, and those terms change.

## Solution
Make one gateway the sanctioned route to AI, and make it the fastest route.

1. **An approved-tool catalogue as a [Policy Card](/patterns/policy-card).** Each entry names the tool,
   the contract terms it was approved on, the data classes and use cases it is allowed for, and its
   review date. The [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate)
   feeds it.
2. **One route in.** Model APIs are reached through an AI gateway or LLM proxy, and browser-based tools
   through single sign-on and a secure web gateway or browser policy (illustrative categories, not a
   product list). Personal accounts on approved tools are replaced by enterprise tenancies.
3. **Data-class rules at the gateway.** A content classifier tags each request by data class and the
   card decides: allow, allow with redaction, or block with a reason and a route to the right tool.
   The matrix of data class against tool comes from the acceptable-use policy.
4. **Access on attestation.** The identity provider grants the gateway role only while a current
   acceptable-use attestation and its training module are on record (the
   [training record schema](/resources/templates#schema-training-record)).
5. **A decision event per call.** The gateway writes a signed evidence record (decision, data class,
   tool, redactions, a hash of the input rather than the input) to the assurance store, in the shape of
   the [evidence record schema](/resources/templates#schema-evidence-record).
6. **Discovery as the feedback loop.** [Shadow-AI Discovery](/patterns/shadow-ai-discovery) reads
   identity, network and expense data for tools outside the gateway; each find becomes an intake
   request (register, tier, approve or replace) before it becomes a sanction.

Illustrative gateway decision event, as an evidence record:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/evidence-record.v1.json",
  "control_id": "gateway.data-class.confidential.v4",
  "subject": "genai-gateway@2026.09.2",
  "decision": "allow",
  "obligation": "ISO/IEC 42001 A.9.2",
  "failure_mode": "customer data sent to a tool not approved for it",
  "input_hash": "sha256:4be1c07e9d52",
  "actor": "user:pseudo-8841",
  "timestamp": "2026-09-18T09:12:44Z",
  "signature": "ed25519:MEUCIQDx3k",
  "extensions": {
    "tool": "drafting-assistant@enterprise",
    "data_class": "confidential",
    "action": "allowed_with_redaction",
    "redactions": 2,
    "attestation": "tr-2026-0877"
  }
}
```

> **Example (illustrative)** A legal team starts using a public drafting assistant for contract
> summaries. Discovery flags the traffic; rather than block the domain, the governance program signs an
> enterprise agreement with no training on customer data, adds the tool to the catalogue for
> confidential data with redaction of personal identifiers, and routes it through the gateway. Usage
> moves to the sanctioned route within weeks because it is now the easiest one.

## Consequences
Acceptable use becomes enforceable and measurable: the organisation can show what was sent where,
under which rule, and how much use happens outside the gateway. The cost is the gateway itself,
classifier tuning (false blocks erode trust fast), catalogue upkeep as supplier terms change, and the
privacy work to log proportionately. The gateway covers the tools it fronts; local models and
personal devices stay a discovery problem.

## Related patterns
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Policy Card](/patterns/policy-card);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Maps to:** EU AI Act Art. 4 · GDPR Art. 5(1)(c) · ISO/IEC 42001 A.2, A.9.2, A.10.3 · NIST AI RMF
GOVERN 2.2, GOVERN 6.1, MANAGE 3.1 · OWASP LLM02:2026 · Layer 04 Runtime Controls & Observability /
Layer 02 Inventory & Transparency.

Threat ids follow the OWASP Top 10 for LLM Applications 2026 [3], control ids ISO/IEC 42001 Annex A
[5] and subcategory ids the NIST AI RMF [6]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] "AI at Work Is Here. Now Comes the Hard Part" (2024 Work Trend Index; 31,000 people in 31 countries; 78% of AI users bring their own AI tools to work). Microsoft and LinkedIn. 2024-05-08. https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Art. 4 replaced: providers and deployers take measures to support the development of AI literacy); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] OWASP Top 10 for LLM Applications 2026 (LLM02 Sensitive Information Disclosure; ids used in the Maps to line). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[4] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 5(1)(c) data minimisation). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.2 policies related to AI; A.9.2 processes for responsible use of AI systems; A.10.3 suppliers). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[6] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 2.2 personnel and partners receive AI risk management training; GOVERN 6.1 policies for third-party AI risks; MANAGE 3.1 third-party risks regularly monitored). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
