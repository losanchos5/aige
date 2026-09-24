# 23. Governing AI agents

> An AI agent is governed when every action traces back to a registered identity, a scope someone
> approved, a checkpoint that fired where the stakes required one and a tested way to stop it.

Chapter 05 carries four agent patterns: the [Agent Registry](/bok/patterns#pattern-agent-registry),
[Agent Identity & Scoped Credentials](/bok/patterns#pattern-agent-identity--scoped-credentials), the
[Kill Switch / Circuit Breaker](/bok/patterns#pattern-kill-switch--circuit-breaker) and the
[Human-in-the-loop Gate](/bok/patterns#pattern-human-in-the-loop-gate). [Layer 04 of the
stack](/bok/the-stack#layer-04-runtime-controls--observability) says what runtime control must
prove, and the [regulatory map](/bok/regulatory-map#china) lines up the agent controls of three
frameworks side by side. None says in one place what makes an agent different to govern, how the
controls form one control plane, or where each control meets the law. This chapter does.

One contrast first. **AI security engineering**, the sibling discipline, asks how an attacker can
make an agent cause harm, and it owns the threat model. AI governance engineering asks a wider
question: under whose authority did the agent act, within what bound, with what evidence, and who
could have stopped it. The two share most controls. They differ on what counts as done: for security
a blocked attack is done; for governance it is done when the block, the authority behind the action
and the approval are on the record.

The OWASP agentic list states the first principle, **least agency**: its advice is "to avoid
unnecessary autonomy", because agentic behaviour deployed where it is not needed "expands the attack
surface without adding value" [1]. The cheapest agent control is the agent you did not build: a
fixed workflow with one model call is easier to govern than a planner that picks its own tools.

## What makes an agent a governance object

An agent is an AI system that pursues a goal by choosing and taking actions: it plans, calls tools,
reads and writes memory and may hand work to other agents. Chapter 11 places it among [the kinds of
AI](/bok/ai-defined#agentic-systems) a registry must tell apart. Four properties matter for
governance, and each breaks an assumption that model governance relies on.

| Property | What changes | Governance question | First control |
|---|---|---|---|
| **Delegated authority** | The agent acts on someone's behalf, with their permissions or its own | Whose authority was used, and was it narrower than theirs? | Workload identity; delegation record |
| **Tools** | Output becomes an effect in a system of record, not text a person reads | Which actions can it take, on which resources? | Tool allow-list; scoped credentials |
| **Memory** | State persists across sessions, users and tasks | What does it remember, for how long, and who can write to it? | Memory scopes; retention; write provenance |
| **Autonomy** | Steps happen with no person between them | Where must a person decide, and can they stop it? | Checkpoints; kill switch |

The evidence model changes with them. A model is evaluated on its outputs; an agent must also be
evaluated on its **trajectory**, the sequence of plans, tool calls and memory operations that led to
an effect. An eval that scores the final answer and ignores the path will pass an agent that reached
the right result through a tool it should never have held.

### Autonomy is a design decision

Autonomy is a setting the deployer chooses, not a property of the model. As Feng, McDonald and Zhang
put it, "An agent's level of autonomy can be treated as a deliberate design decision, separate from
its capability and operational environment" [2]. They define five levels by the role the user plays:
operator, collaborator, consultant, approver and observer. Singapore's agentic framework describes
four levels of human involvement, from "agent proposes, human operates" to "agent operates, human
observes", and cites the same work [3]. The Cloud Security Alliance's Agentic Trust Framework names
four tiers, from Intern (read-only) to Principal (autonomous within bounds), and makes promotion
earned: "sustained accuracy, a clean incident record, a passed security audit, and explicit
governance sign-off" [4].

The EU AI Act asks for the same proportionality: oversight measures for a high-risk system must be
commensurate with its risks, its level of autonomy and its context of use (`Art. 14(3)`) [5]. The
table aligns the three scales and gives each level a minimum control set. The alignment and the
control sets are this book's reading, not the authors'.

| User's role [2] | Nearest IMDA level [3] | Nearest ATF tier [4] | What the person does | Minimum controls |
|---|---|---|---|---|
| **Operator** | Agent proposes, human operates | Intern | Takes every action | Registry entry; own identity; read-only tools; traces |
| **Collaborator** | Agent and human collaborate | Junior | Approves significant steps | The above, plus a tool allow-list and a checkpoint before every write |
| **Consultant** | Between the two | Junior to Senior | Sets goals, gives feedback | The above, plus a runtime guardrail on every tool call and execution budgets |
| **Approver** | Agent operates, human approves | Senior | Approves critical or irreversible steps | The above, plus an approval log, a per-agent circuit breaker and a drilled kill switch |
| **Observer** | Agent operates, human observes | Principal | Audits after the fact | The above, plus trajectory anomaly detection and independent trajectory evals; reversible, bounded actions only |

Record the level as a registry field and treat raising it as a change that needs the same review as
a new deployment. A promotion is a decision with evidence behind it, not a flag someone flipped.

## The agent registry

The [Agent Registry](/bok/patterns#pattern-agent-registry) pattern makes registration a precondition
of production: owner, scope and expiry, written by the pipeline. An agent's entry has to carry more.
Singapore's framework asks that agent identities be "catalogued and centrally managed", issued from
and tracked by a central system "to prevent agent sprawl" [3]; TC260's agentic appendix asks for a
unique identity per agent and permissions set by decision mode [6].

| Field | Why it is there | Evidence it enables |
|---|---|---|
| **Identity** (for example a SPIFFE ID) | Attribution | Every log line joins to one entry |
| **Owner** (team and accountable person) | Accountability | An escalation route that exists |
| **Purpose** | Scope test; legal classification | Detection of use outside purpose |
| **Autonomy level** | Proportionate controls | Promotion history |
| **Tools and scopes** | The enforced allow-list | Guardrail configuration diffs |
| **Data classes and memory stores** | Privacy and retention | DPIA and records-of-processing links |
| **Delegation rights** | Bounds between agents | Delegation policy |
| **Versions** (model, prompts, policy bundle) | Change control | Replay of the exact configuration in an incident |
| **Checkpoints** | Oversight design | Approval log |
| **Stop handles** (breaker, revocation path, last drill) | Kill switch | Drill record |
| **Expiry** | No agent outlives its review | Automatic deactivation |
| **Regulatory role and class** | Obligations | Obligation map |

> **Example (illustrative)** A registry entry for a refunds agent, written by the deploy pipeline.
> The versions block is what makes an incident replayable; the stop block is what makes the kill
> switch more than a claim.

```yaml
# agent-registry entry (illustrative)
id: refunds-agent
identity: spiffe://corp.example/agents/refunds-agent
owner: { team: support-platform, accountable: head-of-support-operations }
purpose: Draft and execute refunds for orders under the published returns policy
autonomy_level: approver
tools:
  - { name: orders.read, scopes: [orders:read] }
  - { name: refunds.create, scopes: [refunds:write], checkpoint: "amount_eur > 200" }
delegation: { may_call: [fraud-check-agent], may_be_called_by: [support-orchestrator] }
memory: { session: true, long_term: none }
versions: { model: vendor-model@2026-08-15, system_prompt: "sha256:9f2c...e41", policy_bundle: v14 }
budgets: { tool_calls_per_task: 25, spend_eur_per_day: 5000 }
stop: { breaker: cb-refunds-01, revoke: identity, last_drill: 2026-09-10 }
ai_act: { role: deployer, class: not-high-risk }
expiry: 2026-12-17
```

A registry is only as good as what it misses. The [Shadow-AI
Discovery](/bok/patterns#pattern-shadow-ai-discovery) pattern reconciles it against what runs: SaaS
connectors, coding agents on laptops and local MCP servers, which run with the same privileges as
the client that launched them [7]. An agent found by discovery is either registered within a
deadline or switched off.

> **In practice (illustrative)**
> In a large telco, the first discovery sweep found more agents on developer laptops than in the
> production registry: coding assistants with local MCP servers holding personal access tokens, some
> with write access to shared repositories. The fix was not a ban. A paved path issued each
> developer's agent a short-lived, repository-scoped credential from the production identity system,
> and the sweep became a weekly reconciliation with an owner for every finding.

## Identity and short-lived credentials

### Channel authentication is not agent identity

Chapters 04 and 05 draw the key line. **Channel authentication** secures one hop, such as a client
talking to an MCP server. **Agent workload identity** is the attributable identity the agent carries
across every hop, under which its actions are logged and its access revoked. Singapore's framework
lists what that identity must be: unique and "cryptographically verifiable"; "accounted for", tied
to a supervising agent, a human user or an organisational department; differentiated "according to
the capacity in which it acts", independently or on behalf of a named user; and catalogued centrally
[3]. NIST's NCCoE asks how each agent can be "known, trusted, and properly governed" [8].

### Short-lived, attested credentials

SPIFFE defines "short lived cryptographic identity documents", called SVIDs, delivered through a
Workload API that also rotates them; an SVID is either an X.509 certificate or a JWT, and SPIRE is
the reference implementation [9]. The governance value is in the lifetime: a credential that expires
in minutes need not be hunted down after an incident, only not reissued. A static API key in an
agent's configuration is the opposite, and attackers know where to look: MITRE ATLAS catalogues
"Credentials from AI Agent Configuration" (`AML.T0083`) [10]. TC260 asks that credentials be revoked
at the end of the task [6]. Singapore asks that authorisations be "time- or session-bound,
non-transferable", least privilege by default and never greater than what the authorising human may
do [3].

### Delegation without impersonation

When an agent acts for a user, two identities are in play, and the log must keep both. OAuth 2.0
Token Exchange (RFC 8693) separates **impersonation**, where the actor becomes indistinguishable
from the subject, from **delegation**, where both stay identifiable. Its `act` claim "provides a
means within a JWT to express that delegation has occurred and identify the acting party", and
nested `act` claims record the earlier actors in the chain [11]. The rule for agents follows:
exchange the user's token for a delegated one that names the agent, with a narrower scope and a
short expiry; never hand the agent the user's own token.

> **Example (illustrative)** The claims of a delegated access token. The user is the subject; the
> refunds agent is the current actor; the orchestrator that delegated the task to it is nested
> inside. The audience is one API and the scope one operation.

```json
{
  "sub": "user:4711",
  "aud": "https://refunds.api.example",
  "scope": "refunds:write",
  "exp": 1790330400,
  "act": {
    "sub": "spiffe://corp.example/agents/refunds-agent",
    "act": { "sub": "spiffe://corp.example/agents/support-orchestrator" }
  }
}
```

### MCP authorization as of 2026-07-28

The Model Context Protocol specification dated 2026-07-28 is the current version as of 2026-09-24.
Authorisation is optional in MCP; where an HTTP transport uses it, the MCP server acts as an OAuth
2.1 resource server [12]. The requirements that matter for governance:

| Requirement (spec 2026-07-28) | What it prevents | Evidence to keep |
|---|---|---|
| Servers MUST implement OAuth 2.0 Protected Resource Metadata (RFC 9728), and clients MUST use it to find the authorisation server [12] | Clients guessing where tokens come from | Discovery configuration in the tool manifest |
| Clients and authorisation servers SHOULD support Client ID Metadata Documents; Dynamic Client Registration is deprecated [12][13] | Anonymous, unmanaged client registrations | Allowed client domains as policy |
| Clients MUST send the `resource` parameter (RFC 8707) with the server's canonical URI [12] | Tokens that work at any server | Token requests naming the resource |
| Servers MUST validate that a token was issued for them and "MUST NOT accept or transit any other tokens" [12] | Token passthrough and the confused deputy | Audience-check failures raised as alerts |
| Clients MUST validate the `iss` parameter (RFC 9207) before redeeming a code, and client credentials are bound to the issuer that minted them [12][13] | Authorisation-server mix-up | The recorded issuer per flow |
| Servers SHOULD challenge with the scopes an operation needs, and clients step up for more [12] | Omnibus scopes granted up front | Elevation events with correlation IDs [7] |

The accompanying security guidance is blunter: token passthrough "is explicitly forbidden", and the
scope mistakes it lists include "Publishing all possible scopes" and "Using wildcard or omnibus
scopes" [7]. The 2026-07-28 release also set a deprecation policy with a twelve-month minimum window
[13], so the MCP version each server speaks is a registry field. And the Client ID Metadata Document
specification is still an IETF Internet-Draft (revision 02, 6 Jul 2026) [14].

None of this identifies the agent. MCP secures the hop between one client and one server. Which
agent sits behind the client, and for whom, is the workload identity's job.

## Tool and MCP server permissions

### The tool allow-list

A tool is a capability, and the allow-list is where capabilities are granted. OWASP's advice under
`ASI02` is to "Define per-tool least-privilege profiles (scopes, maximum rate, and egress
allowlists)" and to express them "as IAM or authorization policy stanzas attached to each tool,
rather than relying on ad-hoc conventions" [1]. TC260 asks for deny by default [6]. An allow-list
entry has more than a name:

| Property | Rule | Example |
|---|---|---|
| **Tool identity** | Server, tool name and a hash of the tool definition, pinned | `refunds.create` on `payments-mcp`, definition `sha256:…` |
| **Operation class** | Read, write, delete, send, execute or pay; the class drives checkpoints | `refunds.create` is pay |
| **Resource scope** | The narrowest resource set the task needs | Orders of the customer in the current case |
| **Rate and volume** | Calls per task and per hour | 25 per task |
| **Egress** | Destinations the tool may reach | Internal payments API only |
| **Data classes** | What may flow in and out | No special-category data to external tools |
| **Checkpoint** | When a person must approve | Amount above 200 EUR |

No tool is harmless by name. OWASP's list describes a coding agent whose auto-approved ping tool was
triggered repeatedly to exfiltrate data through DNS queries [1]; ATLAS catalogues "Exfiltration via
AI Agent Tool Invocation" (`AML.T0086`) and "Data Destruction via AI Agent Tool Invocation"
(`AML.T0101`) [10]. Rate and egress bounds therefore apply to every tool, including the ones nobody
worries about.

> **Example (illustrative)** The allow-list as a deny-by-default policy the tool gateway evaluates
> on every call, reading the registry as data. The rate check is omitted for brevity.

```rego
package agents.tools

default allow := false

allow if {
  entry := data.registry[input.agent_id]
  some tool in entry.tools
  tool.name == input.tool.name
  tool.definition_hash == input.tool.definition_hash
  input.tool.scope in tool.scopes
}

needs_approval if {
  input.tool.operation in {"delete", "send", "pay", "execute"}
}
```

### Admitting an MCP server

An MCP server is a supplier. OWASP separates two cases: a tool whose interface is manipulated at
runtime (tool poisoning, under `ASI02`) and a tool that is malicious or compromised at the source
(`ASI04`) [1]. ATLAS added "AI Agent Tool Poisoning" (`AML.T0110`) for malicious content or
behaviour introduced into a tool's model-visible definition or its implementation [10]. A tool
description is an instruction the model reads, so a changed description is a changed instruction.
Admit a server through a gate:

1. **Provenance.** Publisher, source repository and a signed release, recorded in the
   [AIBOM](/bok/patterns#pattern-aibom) of every agent that uses it.
2. **Definition pinning.** Hash tool names, descriptions and schemas at admission; alert on change.
3. **Authorisation conformance.** MCP version, protected-resource metadata, audience validation, no
   token passthrough.
4. **Sandboxing for local servers.** The MCP guidance requires that a client show the exact command,
   without truncation, and get explicit approval before a one-click local server install, and
   recommends running such servers sandboxed with minimal privileges [7].
5. **Testing.** Poisoned descriptors and injected tool outputs, before any allow-list.
6. **An owner and a review date**, like any other supplier.

The [Vendor / Model Due-Diligence Gate](/bok/patterns#pattern-vendor--model-due-diligence-gate)
covers the commercial side: who answers when the server misbehaves, and what notice you get before
it changes.

## Human checkpoints and approval design

### Where to put a checkpoint

The [Human-in-the-loop Gate](/bok/patterns#pattern-human-in-the-loop-gate) pattern says to gate by
consequence. Two sources make "consequence" concrete. The Partnership on AI grades agent risk on
three factors: **stakes** (the severity of potential consequences), **reversibility** (whether a
failure can be undone) and **affordances** (unconstrained tool selection and persistent memory
introduce more complex failure modes than constrained designs) [15]. Singapore's framework lists
four kinds of checkpoint: high-stakes actions and decisions, irreversible actions, outlier or
atypical behaviour, and user-defined boundaries [3].

| Checkpoint class | Trigger (examples) | Who approves | Evidence |
|---|---|---|---|
| **High stakes** | A final decision about a person; an edit to a sensitive record | A named role with the authority to refuse | Approval record with the context shown |
| **Irreversible** | A payment, a deletion, an external message, a publication | The action's business owner | Approval bound to the exact parameters |
| **Outlier** | Access outside the usual scope; a plan twice the usual length | The on-call owner | Anomaly event and decision |
| **User-defined** | A purchase above the user's own limit | The user | Consent record |
| **Scope elevation** | A step-up request for a new scope | The agent's owner | Elevation event |

### What a good approval looks like

The AI Act describes the overseer the design must serve. For a high-risk system they must be able to
recognise "the possible tendency of automatically relying or over-relying on the output", to
"disregard, override or reverse the output", and to "interrupt the system through a 'stop' button or
a similar procedure" (`Art. 14(4)(b), (d), (e)`) [5]. The deployer must assign oversight to people
"who have the necessary competence, training and authority, as well as the necessary support" (`Art.
26(2)`) [5]. Singapore adds two practical points: keep approval requests "contextual and digestible"
while making the risk clear, and "Enforce human approval through system-level controls where
possible, vs prompt-layer guardrails, which may be bypassed or 'forgotten'" [3].

The threat to design against is `ASI09`, **human-agent trust exploitation**: people over-relying on
an agent's confident rationale and "approving actions without independent validation", which an
attacker steering the agent can exploit [1]. ATLAS has a technique for the persuasion itself, "LLM
Trusted Output Components Manipulation" (`AML.T0067`) [10]. The rules that follow:

1. **The gate lives outside the model.** The tool gateway holds the call until approval arrives; the
   prompt does not decide whether to ask.
2. **Show the call, not the story.** The approver sees the tool, the parameters and the target as
   the gateway will execute them, then the agent's reason, the risk and what happens on rejection.
3. **Bind the approval.** An approval is single-use and bound to a hash of the parameters; a changed
   amount needs a new approval.
4. **Time out closed.** No answer means no action.
5. **Measure the oversight.** Approval rate, time to decide and override rate, as [designing human
   oversight](/bok/the-stack#designing-human-oversight-article-14) describes.

> **Anti-pattern** A checkpoint that fires 200 times a day on a person with other work. It becomes a
> rubber stamp within a week, and the approval log then launders the decisions it was meant to
> examine.

> **In practice (illustrative)**
> A payments team found its reviewers approving almost every agent refund request within seconds.
> Two changes fixed it: only irreversible, high-value refunds now reach a person, which cut the
> volume by an order of magnitude, and the approval screen shows the raw tool call first, with the
> agent's explanation below it. Overrides rose from almost none to a rate worth investigating, and
> two of the first exposed a prompt-injection path through customer notes.

## Runtime guardrails for tool calls

A runtime guardrail for an agent sits at one point: between the decision to call a tool and the
call. The CSA's Autonomous Action Runtime Management (AARM) specification defines "the capabilities
an agent security system must provide to govern what an AI agent is allowed to do at runtime",
starting with pre-execution interception bound to identity and policy evaluation before the action
runs [16]. OWASP's Agent Control Standard is a wire specification for the same point: it lets a
separate guardian agent "inspect what an AI agent is about to do and permit, deny, or modify that
action before it happens, over an authenticated channel, with an audit trail" [17].

The reference guardian in the ACS repository starts with a failure posture of "proceed", overridable
to deny [17]. That default is a governance decision disguised as a setting: when the guardian is
down, fail-open lets every call through unchecked and fail-closed stops the business. Decide per
operation class and record it in the agent's [Policy Card](/bok/patterns#pattern-policy-card): fail
closed for pay, delete, send and execute; fail open, with an alert, only for reads.

| Check | Runs | On failure |
|---|---|---|
| Identity matches a live registry entry | Every call | Deny |
| Tool on the allow-list; definition hash matches | Every call | Deny |
| Parameters within policy (resource in scope, amount limits) | Every call | Deny, or route to a checkpoint |
| Instruction provenance: did the request originate in untrusted content? | Before write-class calls | Route to a checkpoint |
| Output and egress filter (secrets, personal data, destinations) | After the call, before the result returns | Redact or block |
| Execution budgets (steps, calls, tokens, spend, time) | Continuously | Trip the breaker |
| Code runs only in a sandbox | Execute-class tools | Deny (`ASI05`) |

### Execution limits

Budgets are the guardrail that catches what no rule anticipated. The 2026 OWASP LLM list names
"agentic architectures and tool-use protocols (such as MCP) that amplify a single request into
cascading downstream operations" as an aggravating factor and recommends "hard spending caps,
agent-level circuit breakers, and continuous cost-attribution monitoring" (`LLM06:2026`) [18]. ATLAS
added "Agentic Resource Consumption" (`AML.T0034.002`) for attackers who coerce an agent into
expensive tool calls [10], and TC260 asks for step, frequency and duration limits [6]. Put the
budgets in the registry entry, enforce them at the gateway and make exhaustion trip the breaker
rather than raise a ticket. The [Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail) pattern
covers the mechanics; a **guardian agent**, as chapter 04 notes, is one way to build the enforcement
point and needs its own identity, scope and kill switch.

## Kill switch and per-agent circuit breakers

Autonomy is granted only where it can be withdrawn. The NIST AI RMF asks for mechanisms to
"supersede, disengage, or deactivate" systems whose outcomes are inconsistent with intended use
(MANAGE 2.4) [19]; the AI Act asks for a stop procedure (`Art. 14(4)(e)`) [5]; the CSA's framework
puts the goal plainly: "You can stop one agent without stopping the business" [4]. The [Kill Switch
/ Circuit Breaker](/bok/patterns#pattern-kill-switch--circuit-breaker) pattern gives the mechanism.
In operation, a stop has levels:

| Stop level | Mechanism | Blast radius | Target time (illustrative) | Evidence |
|---|---|---|---|---|
| **Pause a task** | Hold at the next checkpoint, or cancel the task | One task | Seconds | Task state change |
| **Narrow the scope** | Remove one tool or scope from the allow-list | One capability of one agent | Under a minute | Policy diff |
| **Trip the breaker** | The gateway rejects every call from the agent | One agent | Seconds | Breaker event |
| **Revoke the identity** | Stop issuing credentials; revoke refresh tokens | One agent, everywhere | Bounded by credential lifetime | Revocation record |
| **Stop a class** | Breakers on every agent sharing a model, tool or prompt version | A fleet segment | Minutes | Fleet event |
| **Degrade** | Switch to advice-only or back to pilot | Behaviour, not availability | Minutes | Mode change |

The last row uses the [graduated degradation](/bok/governing-deployment#graduated-degradation) modes
of chapter 15: "advice-only" (the agent drafts, a person acts) keeps the service while removing the
autonomy. Triggers are defined in advance: a manual pull, a budget or unauthorised-call threshold,
an anomaly, an upstream notice (the model vendor reports an incident) or a legal instruction.

A stop that has not been drilled is a claim. Drill it on a schedule, measure time to stop, and check
that the stop held: no tool calls after the breaker tripped, no credentials issued after revocation.
Chapter 17 makes the same point for [rogue behaviour](/bok/incidents#ai-specific-failure-modes):
revoke, then verify that the revocation took effect. Decommissioning is the planned version: TC260
lists complete shutdown, data backup and environment cleanup [6]; add deleting memory under its
retention rule and removing the agent from other agents' delegation lists.

### Stopping across hops

You cannot stop someone else's agent. A2A's cancel operation says so: "The server will attempt to
cancel the task, but success is not guaranteed" [20]. What you control is your own boundary: stop
your agents from calling the remote one, and revoke what you issued to it. Short-lived delegated
tokens make that revocation bounded by their lifetime; long-lived ones make it a hope.

> **In practice (illustrative)**
> A kill-switch drill on a document-processing agent measured four seconds from the pull to the
> breaker rejecting calls, which looked like a pass. The follow-up check found long-running tasks
> still writing to storage twenty minutes later, on a refresh token issued before the pull. Agent
> refresh tokens were removed, access tokens cut to five minutes, and the drill now asserts zero
> writes after the pull, not only a fast breaker.

## Memory and context governance

Memory turns one bad input into a lasting one. The 2026 OWASP LLM list calls this **memory
persistence**: "an injection that writes to long-term memory, a RAG corpus, a vector store, or a
hosted memory service taints every subsequent session that reads from that store" [18]. OWASP's
agentic list has it as `ASI06` Memory & Context Poisoning [1]; ATLAS has "AI Agent Context
Poisoning" (`AML.T0080`), with sub-techniques for memory and for the chat thread [10].

| Memory | What it holds | Main risk | Control | Retention |
|---|---|---|---|---|
| **Context window** | Instructions, retrieved text, tool outputs | Injection through tool output | Provenance tags; untrusted segments marked | One request |
| **Conversation thread** | One session | Thread poisoning (`AML.T0080.001`) | Per-session isolation | The session |
| **Long-term memory** | Facts and preferences across sessions | Memory poisoning (`AML.T0080.000`); personal data kept too long | Write gate; per-user namespace; time to live; erasure path | Policy-defined, per class |
| **Retrieval corpus** | Documents | Poisoned or stale sources (`AML.T0099`) | Source admission; entitlement check at retrieval | Per corpus version |
| **Shared memory** | State passed between agents | Cross-agent contamination | Per-task isolation; attributed writes | The task |
| **Agent configuration** | Prompts, tool settings | Tampering (`AML.T0081`); stored credentials (`AML.T0083`) | Change control; no secrets | Versioned |

Five rules make memory governable. **Writes are events** that carry their source, so a poisoned
entry traces back to what produced it. **Untrusted content cannot write to long-term memory**
without a gate. **Memory is isolated** per user and per task, as TC260 asks, with retention windows
and no credentials in memory [6]. **Retention is code**: a memory store holding personal data is
subject to the GDPR's minimisation and storage-limitation principles (`Art. 5(1)(c), (e)`) and to
the right to erasure (`Art. 17`) [21]; see [data subject rights against trained
models](/bok/privacy-and-ai#data-subject-rights-against-trained-models). **Memory can be rolled
back** to a known-good snapshot instead of being wiped.

For high-risk systems that continue to learn after deployment, the AI Act asks that they be
developed to reduce "the risk of possibly biased outputs influencing input for future operations"
(`Art. 15(4)`) [5]. A memory that shapes later behaviour is such a feedback path in all but name,
and reading `Art. 15(4)` as covering it is the prudent course until guidance says otherwise.

## Multi-agent systems and delegation chains

The Agent2Agent protocol (A2A) is an open protocol for communication between agents, first developed
by Google and donated to the Linux Foundation. Version 1.0.0 was released on 12 Mar 2026 and 1.0.1
on 28 May 2026 [20]; on 27 Aug 2026 A2A was accepted as a Growth Stage project of the Agentic AI
Foundation, directed by the Linux Foundation, alongside MCP [22]. Its security model gives you
building blocks. An agent publishes an **Agent Card** at `/.well-known/agent-card.json` describing
its identity, skills, endpoint and authentication requirements; the card may be signed with JWS over
a canonical JSON form; the card declares the authentication schemes the agent accepts (API keys,
HTTP authentication, OAuth 2.0, OpenID Connect or mutual TLS); and the server "MUST authenticate
every incoming request" [20]. Authorisation after that is, in the specification's words,
"implementation-specific" [20].

What A2A does not give you is accountability. An agent that needs more authority mid-task moves the
task to `TASK_STATE_AUTH_REQUIRED`, and a client that is itself an agent can pass the request up,
"forming a chain of Tasks" [20]. But the specification states that it "does not define the scope,
representation, validity, or revocation semantics of the authorization decision or credential
obtained" [20]. The protocol moves tasks; the rules about who may authorise what, across how many
hops, are yours to write.

The threats are named: `ASI07` Insecure Inter-Agent Communication, `ASI08` Cascading Failures and
`ASI10` Rogue Agents [1], and ATLAS added "Autonomous AI Agent Communication" (`AML.T0118`) at the
end of August 2026 [10]. The GPAI Code of Practice lists "colluding" with other AI systems and
"mis-coordination or conflict" with them among the model propensities that are sources of systemic
risk [23].

### Accountability across hops

| Property | Rule | Evidence |
|---|---|---|
| **Originating principal** | Every task carries the person or system that started it | Root of the delegation record |
| **Actor per hop** | Each agent authenticates as itself; delegation, never impersonation | Nested `act` claims [11] |
| **Scope** | Narrows or stays equal at each hop; never widens | Token-exchange log |
| **Purpose** | The task's purpose travels with it and is checked at each hop | Purpose field on every call |
| **Depth and fan-out** | Maximum hops and maximum parallel sub-tasks | Breaker event on breach |
| **Trace** | One trace context from the first hop to the last | Trace ID on every span |
| **Peers** | Only registered agents with verified, signed cards | Peer allow-list |
| **Third parties** | A contract names who answers for a remote agent | Clause reference in the registry |

Two standards efforts address the hard part, carrying identity and authorisation context through a
call chain. The OAuth working group's Transaction Tokens draft (revision 11, 30 Jul 2026, awaiting
its write-up) is designed "to maintain and propagate user identity, workload identity and
authorization context throughout the Call Chain within a trusted domain" [24]; the IETF's WIMSE
working group (Workload Identity in Multi System Environments) covers workload identity across
systems [25]. Both are unfinished as of 2026-09-24. Until they settle, the table above is the
contract, enforced at each gateway you control. For third-party agents, the clauses in [contracts
and licences](/resources/contracts) are the other half.

## Prompts as configuration under change control

An agent's behaviour is set by its model, its system prompt, its tool descriptions and its policy
bundle. Change any one and the behaviour changes, with no code change at all. So treat each as
configuration under change control, like infrastructure code:

1. **Version and own it.** Prompts live in the repository, with a named owner and two reviewers.
2. **Hash it everywhere.** The registry records the hash, and so does every trace: the OpenTelemetry
   conventions carry `gen_ai.agent.version` for exactly this [26].
3. **Gate it.** Every change runs the regression suite (task success, injection resistance,
   trajectory checks) in the [Eval Gate in CI](/bok/patterns#pattern-eval-gate-in-ci); a failure
   blocks the change.
4. **Roll it out and back.** Canary the change, as in [progressive
   delivery](/bok/governing-deployment#progressive-delivery-as-a-control), and keep the previous
   hash ready to restore.
5. **Ask whether the purpose changed.** A prompt that changes what the system is for can be a
   [substantial modification](/bok/governing-development#substantial-modification) and, under
   [Article 25](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider), can make the
   deployer the provider.

A system prompt is configuration, not a secret and not a control. The 2026 OWASP list renamed system
prompt leakage to **Hidden Context Exposure** (`LLM08:2026`) and advises that "Practitioners should
design under the assumption that hidden context is discoverable": no credentials in it, and no
reliance on it "as a security boundary for authorization, privilege separation, policy enforcement,
or content filtering" [18]. ATLAS lists both "Extract LLM System Prompt" (`AML.T0056`) and "Modify
AI Agent Configuration" (`AML.T0081`) [10]. Anything that must hold goes in the gateway.

> **Example (illustrative)** A prompt manifest that the pipeline refuses to deploy unless the eval
> run it names has passed.

```yaml
# prompt manifest (illustrative)
agent: refunds-agent
artefact: system_prompt
version: 2026-09-22.1
sha256: "9f2c...e41"
owner: support-platform
reviewers: [product-owner, ai-governance-engineer]
eval_run: evals/refunds-agent/2026-09-22-1842   # must be green
rollout: { strategy: canary, share: 5%, hold_hours: 48 }
rollback_to: 2026-09-10.3
changes_intended_purpose: false
```

> **Anti-pattern** Editing the production system prompt in a vendor console to fix a complaint. The
> behaviour changes, the registry and the traces still name the old version, and the next incident
> replays a configuration that never ran.

## Agent incidents and telemetry

### An agent incident taxonomy

The Partnership on AI defines the capability agents need most: "Real-time failure detection is the
use of automated monitoring systems that track agent behavior as it unfolds, flag anomalies, and
either halt execution or escalate to human oversight" [15]. The taxonomy below extends the
[AI-specific failure modes](/bok/incidents#ai-specific-failure-modes) of chapter 17 for agents; the
severity scale and the reporting clocks are the ones [chapter 17 sets
out](/bok/incidents#a-severity-scale-mapped-to-the-clocks).

| Class | What it looks like | Detection signal | First containment | IDs |
|---|---|---|---|---|
| **Goal hijack** | Instructions in a document redirect the task | Tool calls unrelated to the task's purpose | Pause the task; quarantine the source | `ASI01`; `AML.T0051.001` |
| **Tool misuse** | A permitted tool used to harmful effect | Parameters outside the registry profile | Narrow the scope; trip the breaker | `ASI02`; `AML.T0053` |
| **Privilege abuse** | The agent uses authority beyond its task | Audience or scope failures | Revoke the identity | `ASI03`; `AML.T0098` |
| **Supply-chain compromise** | A tool definition changes after admission | Definition-hash mismatch | Remove the server from allow-lists | `ASI04`; `AML.T0110` |
| **Unexpected code execution** | Generated code runs outside the sandbox | Sandbox violation | Kill the process; revoke | `ASI05`; `AML.T0112.000` |
| **Memory poisoning** | An injected "fact" persists across sessions | Memory writes from untrusted sources | Freeze and roll back the store | `ASI06`; `AML.T0080` |
| **Inter-agent spoofing** | An unregistered agent answers as a peer | Unknown identity; unsigned card | Block the peer | `ASI07`; `AML.T0118` |
| **Cascade** | One agent's error amplifies through others | Correlated failures | Break the chain at the shared component | `ASI08` |
| **Trust exploitation** | A misleading summary wins an approval | Mismatch between summary and call | Show raw calls; review past approvals | `ASI09`; `AML.T0067` |
| **Runaway or rogue** | Activity out of scope, after expiry or past budget | Calls after expiry; spend spike | Revoke; verify the stop held | `ASI10`; `AML.T0034.002` |
| **Exfiltration through a tool** | Data encoded into a legitimate write | Egress to an unknown destination | Block egress; trip the breaker | `ASI02`; `AML.T0086` |

### Telemetry with the OpenTelemetry GenAI conventions

The OpenTelemetry generative-AI semantic conventions now live in their own repository and are in
**Development** status, so names can still change [26]. They define operations for `create_agent`,
`invoke_agent`, `invoke_workflow`, `plan`, `execute_tool` and memory operations such as
`search_memory` and `update_memory`. A tool span is named `execute_tool {gen_ai.tool.name}`;
`gen_ai.tool.name` is required, `gen_ai.tool.call.id` recommended, and the call's arguments and
result are opt-in. Agent spans carry `gen_ai.agent.id`, `gen_ai.agent.name` and
`gen_ai.agent.version`, and a separate convention covers MCP (`mcp.method.name`, `mcp.session.id`)
[26].

Governance needs fields the conventions do not define yet (registry ID, workload identity, policy
verdict, approval ID, delegation chain): add them in your own namespace and map them later. Turning
on argument and result capture may capture personal data, so it needs its own retention and access
rules. And the logs are evidence: high-risk systems must record events over their lifetime (`Art.
12`), and deployers must keep the logs under their control for at least six months (`Art. 26(6)`)
[5]. The [incident record](/bok/incidents#the-incident-record) of chapter 17 is where the trace ends
up.

## Threats mapped to controls

The two OWASP lists divide the ground. The 2026 LLM list, published on 3 Aug 2026, says it "owns the
risk when the model is a component inside your application"; once the model "becomes an actor, with
tools it can call, memory it carries between sessions, and consequences it sets in motion
downstream, the risk moves to the OWASP Agentic Top 10", and Excessive Agency climbed to third
(`LLM03:2026`) [18]. The table maps each agentic threat to related LLM entries, example ATLAS
techniques from the 2026-09 data release [10], a control and the pattern that implements it.

| Agentic threat [1] | Related LLM 2026 [18] | Example ATLAS techniques | Control | Pattern | Layer |
|---|---|---|---|---|---|
| `ASI01` Agent Goal Hijack | `LLM01` Prompt Injection | `AML.T0051` LLM Prompt Injection | Instruction provenance; checkpoints before writes; trajectory evals | [Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail) | 03 · 04 |
| `ASI02` Tool Misuse and Exploitation | `LLM03` Excessive Agency; `LLM06` Unbounded Consumption | `AML.T0053` AI Agent Tool Invocation; `AML.T0086` | Tool allow-list; per-tool rate, egress and budgets | [Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail) | 04 |
| `ASI03` Identity and Privilege Abuse | `LLM03` Excessive Agency | `AML.T0083`; `AML.T0098` AI Agent Tool Credential Harvesting | Workload identity; short-lived delegated tokens; audience checks | [Agent Identity & Scoped Credentials](/bok/patterns#pattern-agent-identity--scoped-credentials) | 04 |
| `ASI04` Agentic Supply Chain Vulnerabilities | `LLM04` Supply Chain | `AML.T0110` AI Agent Tool Poisoning | Server admission; definition pinning | [AIBOM](/bok/patterns#pattern-aibom) | 02 |
| `ASI05` Unexpected Code Execution (RCE) | `LLM10` Improper Output Handling | `AML.T0112.000` Local AI Agent | Sandboxed execution; deny by default | [Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail) | 04 |
| `ASI06` Memory & Context Poisoning | `LLM05` Data and Model Poisoning; `LLM09` Vector and Embedding Weaknesses | `AML.T0080` AI Agent Context Poisoning | Memory write gate; namespaces; rollback | [Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail) | 03 · 04 |
| `ASI07` Insecure Inter-Agent Communication | None | `AML.T0118` Autonomous AI Agent Communication | Mutual authentication; signed Agent Cards; peer allow-list | [Agent Identity & Scoped Credentials](/bok/patterns#pattern-agent-identity--scoped-credentials) | 04 |
| `ASI08` Cascading Failures | `LLM06` Unbounded Consumption | `AML.T0034.002` Agentic Resource Consumption | Depth and fan-out limits; per-agent breakers | [Kill Switch / Circuit Breaker](/bok/patterns#pattern-kill-switch--circuit-breaker) | 04 |
| `ASI09` Human-Agent Trust Exploitation | `LLM07` Misinformation | `AML.T0067` LLM Trusted Output Components Manipulation | Raw-call approvals; oversight metrics | [Human-in-the-loop Gate](/bok/patterns#pattern-human-in-the-loop-gate) | 04 · 05 |
| `ASI10` Rogue Agents | `LLM03` Excessive Agency | `AML.T0103` Deploy AI Agent | Registry with expiry; discovery; drilled kill switch | [Agent Registry](/bok/patterns#pattern-agent-registry); [Shadow-AI Discovery](/bok/patterns#pattern-shadow-ai-discovery) | 02 · 04 |

`LLM02:2026` Sensitive Information Disclosure lands in the egress filter and `LLM08:2026` Hidden
Context Exposure in the treatment of prompts. Use the ATLAS IDs to tag test cases in the
[Adversarial Red-Team Suite](/bok/patterns#pattern-adversarial-red-team-suite), so a finding traces
from technique to control to the eval that now guards it. Mappings are illustrative, not a claim of
conformity.

## Frameworks written for agents

Five bodies have published agent-specific guidance, and chapter 08 already sets three of them side
by side in its [agent-control table](/bok/regulatory-map#china). Their status as of 2026-09-24:

| Framework | Status | What it adds |
|---|---|---|
| **NIST AI Agent Standards Initiative** (CAISI) | Launched 17 Feb 2026; three pillars: industry-led standards, open protocols, research on agent security and identity [27] | An RFI on AI agent security and the NCCoE concept paper on agent identity and authorisation [27][8] |
| **CSA Agentic Trust Framework** and **AARM** | ATF v1, published in February 2026 under CC BY 4.0 [4]; AARM from a CSA working group [16]; both named in the CSA's April 2026 agentic control plane programme [28] | Zero trust for agents with earned autonomy tiers (ATF); runtime interception requirements (AARM) |
| **IMDA Model AI Governance Framework for Agentic AI** | Launched 22 Jan 2026 [29]; version 1.5 published 20 May 2026 [3] | Four dimensions: bound risks up front, make humans accountable, technical controls, end-user responsibility |
| **TC260 AI Safety Governance Framework 3.0, Appendix 2** | Voluntary; published 14 Sep 2026 [6] | Identity by decision mode, tamper-proof approval logs, memory isolation, decommissioning |
| **OWASP Agent Control Standard** | Donated to the OWASP GenAI Security Project, announced 1 Sep 2026; repository at version 0.1.2 [17] | A wire contract between an agent host and a guardian |

The regulatory map also lists a proposed AICM Agentic Control Supplement from the CSA. This chapter
could not match it to a CSA primary document as of 2026-09-24, so treat it as unconfirmed (verify).

Side by side, they converge on one short list: a unique identity per agent, least privilege that
expires, checkpoints on irreversible actions, interception before execution, a stop that works on
one agent, isolated memory and complete logs. Singapore adds end-user responsibility, the CSA earned
autonomy, TC260 decommissioning. None confers conformity; they are sources of controls and
vocabulary.

## EU AI Act hooks for agents

The AI Act does not define "agent". An agent is an AI system, classified by its intended purpose
like any other: an agent that screens job applicants is high-risk through Annex III whatever its
architecture, and a scheduling assistant is not. Chapter 18 has the [high-risk
requirements](/bok/eu-ai-act#high-risk-requirements-articles-8-to-15) and the [deployer
duties](/bok/eu-ai-act#deployer-duties-article-26) in full. The provisions below are where agent
controls produce the evidence.

| Provision | What it asks | Agent artefact | Duty holder |
|---|---|---|---|
| `Art. 12` | Automatic recording of events over the lifetime, to identify risk, support post-market monitoring and monitor operation [5] | Traces with identity, tool calls, verdicts and approvals | Provider |
| `Art. 14(3)`–`(4)` | Oversight commensurate with the level of autonomy; awareness of automation bias; override; stop [5] | Autonomy level; checkpoints; raw-call approvals; kill switch | Provider designs; deployer operates |
| `Art. 15(4)` | Resilience; reduce feedback loops in systems that keep learning [5] | Memory write gate; memory evals; rollback | Provider |
| `Art. 15(5)` | Resilience against attempts to alter use, outputs or performance, including poisoning and adversarial inputs [5] | Guardrails; server admission; red team tagged with ATLAS IDs | Provider |
| `Art. 25` | A deployer that substantially modifies a high-risk system, or changes a system's intended purpose so that it becomes high-risk, becomes its provider [5] | Change review of prompts and tools with a purpose check | Deployer |
| `Art. 26(1)`–`(2)`, `(5)`–`(6)` | Use per instructions; competent overseers with authority; monitor and suspend; keep logs at least six months [5] | Approver roster; breaker; log retention | Deployer |
| `Art. 50(1)` | People are told they are interacting with an AI system unless that is obvious; applies from 2 Aug 2026 [5] | Disclosure in the messages, calls and chats an agent sends | Provider |
| `Arts. 53`, `55` | Documentation for downstream providers; systemic-risk assessment for the largest models [5] | The provider's documentation as due-diligence input; agentic evals in the vendor file | GPAI provider |

The GPAI Code of Practice makes the agentic link explicit for providers of models with systemic
risk. Its sources of systemic risk include "capabilities to operate autonomously" and "capabilities
to use tools, including 'computer use'", and among the affordances "access to tools (including other
AI models/systems)" and the "level of human oversight (e.g. degree of model autonomy)"; its
specified systemic risks include **loss of control**, defined as "Risks from humans losing the
ability to reliably direct, modify, or shut down a model" [23]. A deployer should ask how the
provider evaluated autonomy and tool use at the [due-diligence
gate](/bok/patterns#pattern-vendor--model-due-diligence-gate); chapter 18 covers [the GPAI
duties](/bok/eu-ai-act#general-purpose-ai-models). The Code is a voluntary tool. Mappings are
illustrative, not a claim of conformity.

## What you can do this week

1. **Find your agents.** Run a discovery sweep that includes coding agents and local MCP server
   configurations, and register what you find with an owner, an autonomy level and an expiry.
2. **Retire one static key.** Move one agent to a short-lived workload identity, and confirm that
   the MCP servers it calls reject tokens issued for another audience.
3. **Write one allow-list as policy.** Deny by default, with definition hashes, operation classes
   and a checkpoint on every pay, delete, send and execute call.
4. **Drill the stop.** Trip the breaker on one agent, measure the time to stop, and confirm that no
   call or write happened afterwards.
5. **Version the system prompt.** Put it in the repository behind an eval gate and record its hash
   in the registry and in every trace.

**Maps to:** EU AI Act Art. 12, 14(3)–(4), 15(4)–(5), 25, 26(1)–(2), 26(5)–(6), 50(1), 53, 55 · GPAI
Code of Practice, Safety and Security (Appendix 1.3, 1.4) · ISO/IEC 42001 (Annex A.6, A.9) · NIST AI
RMF (Manage 2.4) · NIST AI Agent Standards Initiative · OWASP Agentic ASI01–ASI10 · OWASP LLM01,
LLM03, LLM06, LLM08:2026 · MITRE ATLAS · IMDA Model AI Governance Framework for Agentic AI · TC260
Framework 3.0 Appendix 2 · Layer 02 Inventory & Transparency · Layer 04 Runtime Controls &
Observability · Layer 05 Assurance & Continuous Compliance. Mappings are illustrative, not a claim
of conformity.

## Sources

[1] OWASP Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation, per-tool least-privilege profiles, auto-approved ping tool used for DNS exfiltration; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; "Least-Agency"). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] "Levels of Autonomy for AI Agents" (K. J. Kevin Feng, David W. McDonald, Amy X. Zhang; arXiv 2506.12469; five levels by user role: operator, collaborator, consultant, approver, observer; autonomy as a design decision separate from capability). Knight First Amendment Institute at Columbia University / arXiv. 2025-06-14 (v2 2025-07-28). https://arxiv.org/abs/2506.12469 (verified: primary)
[3] Model AI Governance Framework for Agentic AI, version 1.5 (published 2026-05-20; four levels of human involvement; agent identity unique, cryptographically verifiable, accounted for, differentiated by capacity, catalogued and centrally managed; authorisations scoped, time- or session-bound, non-transferable, bounded by the authorising human; significant checkpoints for high-stakes, irreversible, outlier and user-defined actions; approvals contextual and digestible; human approval enforced through system-level controls). IMDA. 2026-05-20. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[4] Agentic Trust Framework, v1 (zero-trust governance for AI agents; five elements: identity, behaviour, data governance, segmentation, incident response; autonomy tiers Intern, Junior, Senior, Principal; promotion criteria; CC BY 4.0; released February 2026). CSAI Foundation / Cloud Security Alliance. 2026-02. https://agentictrustframework.ai/ (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act) of 13 June 2024: Art. 12 record-keeping; Art. 14(3)–(4) human oversight commensurate with risks, level of autonomy and context of use, automation bias, override, "stop" button; Art. 15(4)–(5) robustness, feedback loops, cybersecurity; Art. 25 responsibilities along the value chain; Art. 26(1)–(2), (5)–(6) deployer obligations; Art. 50(1) transparency for systems interacting with natural persons; Arts. 53 and 55 GPAI providers; Art. 113 application dates. Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[6] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), Appendix 2 agentic AI risk management (II.2 unique identity and permissions by decision mode, credentials revoked at task end; II.3 human control checkpoints, tamper-proof approval logs, deny by default; II.5 execution limits, memory retention and isolation, no credentials in memory; II.7 decommissioning). TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[7] Model Context Protocol, Security Best Practices, version 2026-07-28 (confused deputy; token passthrough "explicitly forbidden"; SSRF; state handle hijacking; local MCP server compromise, consent and sandboxing; scope minimisation and common mistakes). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices (verified: primary)
[8] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"; non-repudiation, tamper-proof logging). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[9] SPIFFE overview (Secure Production Identity Framework for Everyone; SPIFFE ID; short-lived SVIDs as X.509 or JWT delivered and rotated through the Workload API; SPIRE reference implementation). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-about/overview/ (verified: primary)
[10] MITRE ATLAS data, release v2026.09 (agent techniques incl. AML.T0034.002 Agentic Resource Consumption, AML.T0051 LLM Prompt Injection, AML.T0053 AI Agent Tool Invocation, AML.T0056 Extract LLM System Prompt, AML.T0067 LLM Trusted Output Components Manipulation, AML.T0080 AI Agent Context Poisoning (.000 Memory, .001 Thread), AML.T0081 Modify AI Agent Configuration, AML.T0083 Credentials from AI Agent Configuration, AML.T0086 Exfiltration via AI Agent Tool Invocation, AML.T0098 AI Agent Tool Credential Harvesting, AML.T0099 AI Agent Tool Data Poisoning, AML.T0101 Data Destruction via AI Agent Tool Invocation, AML.T0103 Deploy AI Agent, AML.T0110 AI Agent Tool Poisoning, AML.T0112.000 Local AI Agent, AML.T0118 Autonomous AI Agent Communication). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[11] RFC 8693, OAuth 2.0 Token Exchange (M. Jones, A. Nadalin, B. Campbell, J. Bradley, C. Mortimore; impersonation versus delegation semantics; "act" actor claim and nested actors; "may_act" claim). IETF. 2020-01. https://www.rfc-editor.org/rfc/rfc8693.html (verified: primary)
[12] Model Context Protocol specification, version 2026-07-28, Authorization (optional; OAuth 2.1 resource server; RFC 9728 Protected Resource Metadata; Client ID Metadata Documents SHOULD, Dynamic Client Registration deprecated; RFC 8707 resource parameter; audience validation; no other tokens accepted or transited; RFC 9207 issuer validation; scope challenges and step-up). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization (verified: primary)
[13] "Authorization changes in the 2026-07-28 specification" (RFC 9207 issuer validation; DCR "formally deprecated in favor of CIMD"; client credentials bound to the issuer that minted them; formal deprecation policy with a twelve-month minimum window). Model Context Protocol blog. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[14] draft-ietf-oauth-client-id-metadata-document-02, OAuth Client ID Metadata Document (Internet-Draft, OAuth working group; a URL used as client_id that points to the client metadata). IETF. 2026-07-06. https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/ (verified: primary)
[15] Prioritizing Real-Time Failure Detection in AI Agents (lead author Madhulika Srikumar; stakes, reversibility and affordances; definition of real-time failure detection). Partnership on AI. 2025-09-11. https://partnershiponai.org/resource/prioritizing-real-time-failure-detection-in-ai-agents/ (verified: primary)
[16] Autonomous Action Runtime Management (AARM) specification (system category specification for agentic runtime security; pre-execution interception with identity binding; policy evaluation before execution; core requirements R1–R6; CSA working group). Cloud Security Alliance. 2026. https://aarm.dev/ (verified: primary)
[17] Agent Control Standard (ACS) (wire specification letting a guardian agent permit, deny or modify an agent's action before it happens, over an authenticated channel, with an audit trail; reference guardian failure posture "proceed" unless overridden; repository github.com/GenAI-Security-Project/agent-control-standard at version 0.1.2; donated to the OWASP GenAI Security Project, announced 1 Sep 2026). OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/resource/agent-control-standard-acs/ (verified: primary)
[18] OWASP GenAI LLM Top 10 2026 (published 3 Aug 2026; LLM01 Prompt Injection incl. memory persistence; LLM02 Sensitive Information Disclosure; LLM03 Excessive Agency; LLM04 Supply Chain; LLM05 Data and Model Poisoning; LLM06 Unbounded Consumption; LLM07 Misinformation; LLM08 Hidden Context Exposure, formerly System Prompt Leakage; LLM09 Vector and Embedding Weaknesses; LLM10 Improper Output Handling; boundary with the Agentic Top 10 stated in the preface; final text in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[19] AI Risk Management Framework 1.0, NIST AI 100-1 (MANAGE 2.4: mechanisms to supersede, disengage or deactivate AI systems inconsistent with intended use). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[20] Agent2Agent (A2A) Protocol Specification, v1.0 (releases v1.0.0 on 2026-03-12 and v1.0.1 on 2026-05-28 in github.com/a2aproject/A2A; Agent Card at /.well-known/agent-card.json, optional JWS signature over JCS-canonicalised JSON; security schemes; servers MUST authenticate every incoming request; authorisation implementation-specific; in-task authorisation via TASK_STATE_AUTH_REQUIRED and its unspecified scope and revocation semantics; Cancel Task not guaranteed). A2A Project (Linux Foundation). 2026-05-28. https://a2a-protocol.org/latest/specification/ (verified: primary)
[21] Regulation (EU) 2016/679 (GDPR) of 27 April 2016: Art. 5(1)(c) data minimisation and 5(1)(e) storage limitation; Art. 17 right to erasure. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[22] "A New Chapter for A2A: Joining the Agentic AI Foundation" (A2A accepted as a Growth Stage project of the Linux Foundation-directed Agentic AI Foundation, alongside MCP, goose and AGENTS.md). A2A Project. 2026-08-27. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/ (verified: primary)
[23] General-Purpose AI Code of Practice, Safety and Security chapter, Appendix 1.3 sources of systemic risk (capabilities to operate autonomously and to use tools; propensities incl. colluding and mis-coordination with other AI systems; affordances incl. access to tools and level of human oversight) and Appendix 1.4 specified systemic risks (incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[24] draft-ietf-oauth-transaction-tokens-11, Transaction Tokens (Internet-Draft, OAuth working group; WG state "Waiting for Write-Up"; propagation of user identity, workload identity and authorisation context through a call chain within a trust domain). IETF. 2026-07-30. https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/ (verified: primary)
[25] Workload Identity in Multi System Environments (WIMSE) working group, charter. IETF. 2026. https://datatracker.ietf.org/wg/wimse/about/ (verified: primary)
[26] OpenTelemetry semantic conventions for generative AI (status Development; agent spans create_agent, invoke_agent, invoke_workflow, plan; execute_tool span and gen_ai.tool.* attributes, arguments and results opt-in; memory operations; gen_ai.agent.id, .name, .version; MCP conventions mcp.method.name, mcp.session.id). OpenTelemetry. 2026. https://github.com/open-telemetry/semantic-conventions-genai/tree/main/docs/gen-ai (verified: primary)
[27] "Announcing the AI Agent Standards Initiative for Interoperable and Secure Innovation" (CAISI with ITL; three pillars; RFI on AI agent security; AI agent identity and authorization concept paper; listening sessions). NIST. 2026-02-17. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure (verified: primary)
[28] "Securing the Agentic Control Plane: Key Progress at the CSAI Foundation" (Agentic Trust Framework; Autonomous Action Runtime Management framework; Catastrophic Risk Annex; STAR for AI). Cloud Security Alliance. 2026-04-29. https://cloudsecurityalliance.org/blog/2026/04/29/securing-the-agentic-control-plane-key-progress-at-the-csai-foundation (verified: primary)
[29] "Singapore Launches New Model AI Governance Framework for Agentic AI" (launched at Davos). IMDA. 2026-01-22. https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai (verified: primary)
