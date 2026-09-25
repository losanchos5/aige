# ai-policy.rego: executable skeleton of ai-policy.yaml (every rule whose `rego` key is not null).
# Each message starts with the YAML rule id, so a verdict traces back to the clause that produced it.
# Rego v1 syntax (OPA 1.x); `import rego.v1` keeps it loadable on late 0.x releases too.
# A skeleton to adapt and test (for example with `opa test`), not a finished control.
# Illustrative, not a claim of conformity, and not legal advice.
# Part of https://aigovernanceengineer.com/resources/templates
# This work is licensed under CC BY 4.0. Attribution: Jorge García Aibar.
#
# Input shapes (the records are the JSON Schemas in /schemas/):
#   deploy:     {"action": "deploy", "now": "2026-10-02",
#                "system": <ai-system-register-entry or agent-register-entry>,
#                "evidence": {"use_case_record": <use-case-record>,
#                             "impact_assessments": [<impact-assessment>],
#                             "test_plan": <test-plan>, "eval_results": [<eval-result>],
#                             "go_no_go": <go-no-go>}}
#   train:      {"action": "train", "datasets": ["loan-apps-2019-2025@2026-04-30"],
#                "evidence": {"dataset_admissions": [<dataset-admission-record>]}}
#   tool_call:  {"action": "tool_call", "agent": <agent-register-entry>,
#                "call": {"tool": "refunds-api", "operation": "create_refund",
#                         "amount": 45, "currency": "EUR"},
#                "spent_in_period": 90}
#   oversee:    {"action": "override", "now": "2026-10-02", "system": {"id": "credit-afford-03"},
#                "actor": {"role": "credit-analyst", "training_records": [<training-record>]}}
#   genai:      {"action": "genai_request", "tool": "public-chat-x", "data_class": "internal",
#                "approved_tools": {"enterprise-assistant": ["public", "internal", "confidential"]}}
#   procure:    {"action": "procure", "now": "2026-10-02",
#                "evidence": {"vendor_due_diligence": <vendor-due-diligence-response>}}

package aige.policy

import rego.v1

policy_version := "ai-policy@1.0.0"

subject := sprintf("%s@%s", [input.system.id, input.system.version])

# ---- Decision and verdict ---------------------------------------------------------------------

decision := "deny" if {
	count(deny) > 0
} else := "require_approval" if {
	count(require_approval) > 0
} else := "allow"

allow if decision == "allow"

# The verdict every evaluation emits, in the shape published in chapter 05 and in
# policy-card.v1.json#/$defs/verdict. Sign it where it is written to the evidence store.
verdict := {
	"rule_id": policy_version,
	"decision": decision,
	"input_hash": sprintf("sha256:%s", [crypto.sha256(json.marshal(input))]),
	"timestamp": time.format(time.now_ns()),
}

# ---- rules/register-before-production -----------------------------------------------------------

deny contains "register-before-production: no register entry for this system" if {
	input.action == "deploy"
	not input.system.id
}

deny contains msg if {
	input.action == "deploy"
	some field in ["owner", "scope", "expiry"]
	not input.system[field]
	msg := sprintf("register-before-production: register entry %s has no %s", [input.system.id, field])
}

deny contains msg if {
	input.action == "deploy"
	input.system.expiry < input.now
	msg := sprintf("register-before-production: register entry %s expired on %s", [input.system.id, input.system.expiry])
}

# ---- rules/classify-at-intake -------------------------------------------------------------------

deny contains msg if {
	input.action == "deploy"
	not intake_approved
	msg := sprintf("classify-at-intake: no approved use-case record for %s", [input.system.id])
}

intake_approved if input.evidence.use_case_record.decision.outcome in {"approved", "approved_with_conditions"}

# ---- rules/impact-assessment-before-use ---------------------------------------------------------

required_assessments contains kind if {
	some kind in input.evidence.use_case_record.assessments_required
	kind in {"aiia", "dpia", "fria"}
}

deny contains msg if {
	input.action == "deploy"
	some kind in required_assessments
	not assessment_approved(kind)
	msg := sprintf("impact-assessment-before-use: %s not approved for %s", [kind, subject])
}

assessment_approved(kind) if {
	some a in input.evidence.impact_assessments
	assessment_kind(a.type) == kind
	a.outcome in {"proceed", "proceed_with_mitigations"}
}

assessment_kind("dpia_addendum") := "dpia"

assessment_kind(t) := t if t != "dpia_addendum"

# ---- rules/data-admission -----------------------------------------------------------------------

deny contains msg if {
	input.action == "train"
	some dataset in input.datasets
	not admitted(dataset)
	msg := sprintf("data-admission: %s has no admit decision", [dataset])
}

admitted(dataset) if {
	some record in input.evidence.dataset_admissions
	record.subject == dataset
	record.decision in {"admit", "admit_with_conditions"}
}

# ---- rules/eval-gate ----------------------------------------------------------------------------

blocking_suites contains suite.suite_id if {
	some suite in input.evidence.test_plan.suites
	suite.blocking == true
}

deny contains msg if {
	input.action == "deploy"
	some suite_id in blocking_suites
	not passed(suite_id)
	msg := sprintf("eval-gate: blocking suite %s has no passing result for %s", [suite_id, subject])
}

passed(suite_id) if {
	some result in input.evidence.eval_results
	result.suite_id == suite_id
	result.model_version == subject
	result.result == "pass"
}

# ---- rules/go-no-go -----------------------------------------------------------------------------

high_tier if input.system.risk_classification.internal_tier in {"high", "critical"}

high_tier if input.system.risk_classification.eu_ai_act_category in {"high_risk_annex_i", "high_risk_annex_iii"}

deny contains msg if {
	input.action == "deploy"
	high_tier
	not go_decision
	msg := sprintf("go-no-go: no signed go decision for %s", [subject])
}

go_decision if {
	input.evidence.go_no_go.subject == subject
	input.evidence.go_no_go.decision in {"go", "go_with_conditions"}
}

# ---- rules/agents-bounded-spend -----------------------------------------------------------------

deny contains msg if {
	input.action == "tool_call"
	input.agent.status != "active"
	msg := sprintf("agents-bounded-spend: agent %s is %s", [input.agent.id, input.agent.status])
}

deny contains msg if {
	input.action == "tool_call"
	not tool_registered
	msg := sprintf("agents-bounded-spend: %s may not call %s.%s", [input.agent.id, input.call.tool, input.call.operation])
}

tool_registered if {
	some tool in input.agent.tools
	tool.name == input.call.tool
	input.call.operation in tool.operations
}

require_approval contains msg if {
	input.action == "tool_call"
	limit := input.agent.spend_limit
	input.call.currency == limit.currency
	input.spent_in_period + input.call.amount > limit.amount
	msg := sprintf("agents-bounded-spend: %v %s would exceed the %s limit of %v", [input.call.amount, input.call.currency, limit.period, limit.amount])
}

# ---- rules/oversight-competence -----------------------------------------------------------------

deny contains msg if {
	input.action in {"approve", "override", "stop"}
	not trained_for_system
	msg := sprintf("oversight-competence: %s has no current training record for %s", [input.actor.role, input.system.id])
}

trained_for_system if {
	some record in input.actor.training_records
	record.valid_until >= input.now
	some grant in record.grants
	contains(grant, input.system.id)
}

# ---- rules/sanctioned-genai-tools ---------------------------------------------------------------

deny contains msg if {
	input.action == "genai_request"
	not input.approved_tools[input.tool]
	msg := sprintf("sanctioned-genai-tools: %s is not an approved tool", [input.tool])
}

deny contains msg if {
	input.action == "genai_request"
	classes := input.approved_tools[input.tool]
	not input.data_class in classes
	msg := sprintf("sanctioned-genai-tools: %s is not approved for %s data", [input.tool, input.data_class])
}

# ---- rules/vendor-due-diligence -----------------------------------------------------------------

deny contains "vendor-due-diligence: no approved, in-date due-diligence response" if {
	input.action == "procure"
	not vendor_approved
}

vendor_approved if {
	assessment := input.evidence.vendor_due_diligence.assessment
	assessment.decision in {"approve", "approve_with_conditions"}
	assessment.reassess_by >= input.now
}
