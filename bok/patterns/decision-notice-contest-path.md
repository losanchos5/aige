---
id: decision-notice-contest-path
title: "Decision Notice & Contest Path"
layer: 4
secondaryLayer: 5
order: 26
summary: "A notice at the point of an automated decision, keyed to its decision record, and a contest path to a reviewer with the power to change the outcome."
---

# Pattern: Decision Notice & Contest Path

**Summary:** When an AI system makes or shapes a decision about a person, send a notice at the point
of decision, generated from the decision record, that says a system was involved, gives the principal
reasons and says how to contest; and run a contest path to a reviewer with the authority and the
information to change the outcome. The notice, the contest and the review outcome are all records, so
the right to contest is evidenced decision by decision instead of asserted in a policy.

## Objectives
Make every consequential automated decision explainable to, and contestable by, the person it
affects, and leave a record showing that the notice went out, that the contest was heard and that
the outcome stood or changed for a stated reason.

## Target users
AI governance engineer, product engineer, DPO, the operations owner of the decision (credit, claims,
hiring).

## Impacted stakeholders
Applicants, customers, employees and other affected persons; human reviewers; supervisory and
market-surveillance authorities; auditors.

## Relevant principles
Start from a named failure mode or harm; instrument the build to produce its own proof; give every
control teeth.

## Context
A deployed system decides, or shapes a decision, about a person: credit, insurance, a job, access to a
service. Several regimes attach duties to that same moment. Under GDPR Article 22 a solely automated
decision with legal or similarly significant effects is allowed only on a narrow basis, and then with
at least the right to obtain human intervention, to express a point of view and to contest the
decision; Articles 13(2)(f) and 15(1)(h) add meaningful information about the logic involved [1]. The
Court of Justice has held that a credit score is itself such a decision when lenders give it a
determining role [2]. In the UK, Articles 22A to 22D, in force since 5 Feb 2026, require information
about the decision, the chance to make representations, human intervention and a way to contest [3].

Under the EU AI Act, deployers of Annex III high-risk systems that make or assist decisions about
people must tell them that the system is used (`Art. 26(11)`), and an affected person may obtain a
clear and meaningful explanation of the system's role and the main elements of the decision
(`Art. 86`), a right that applies only where Union law does not already provide it [4]. As of
2026-09-24 the Annex III requirements apply from 2 Dec 2027 [5]; on this site's reading, `Art. 86`
has work to do from the same date (verify). A US creditor that takes adverse action must notify the
applicant within 30 days of a completed application, with the specific principal reasons [6]. The
CFPB's Circular 2022-03 said that a complex algorithm does not excuse vague reasons, but the CFPB
withdrew it on 12 May 2025, so the duty now rests on the regulation itself [6] [7]. Colorado adds,
from 1 Jan 2027, a notice of use, a plain-language explanation of an adverse outcome and human
review for automated decisions in consequential areas [8].

## Problem
Each regime tends to be answered on its own: a letter template owned by operations, an appeal inbox
owned by customer service, an explanation page owned by legal. None of them is tied to the decision
record, so nobody can show which notice a given person received, which reasons it gave, whether those
reasons were the factors the model actually used, or what the reviewer did with the contest. A
contest path that ends at a reviewer who confirms almost every output in seconds is not meaningful
human involvement; it is a queue.

### Forces
- **Fidelity against readability.** The reasons must be the factors the model actually used, yet short
  and plain enough for a person to act on.
- **Clocks against capacity.** Notices run on deadlines (30 days under Regulation B), and a real
  review costs staff time that scales with the contest rate.
- **Disclosure against protection.** Meaningful information about the logic has to coexist with trade
  secrets and with not teaching people to game the model; the Court of Justice leaves that balance to
  the authority or court, not to the controller alone [9].
- **One decision, many regimes.** The same decline can fall under the GDPR, the AI Act, a sector law
  and a US state law at once, each with its own content, audience and clock.

## Solution
Build the notice and the contest as two services around one decision record.

1. **Decision record first.** At runtime, write one record per decision: system and model version,
   inputs by reference, outcome, reason codes, whether the decision was solely automated, the legal
   basis and the regimes that apply. The review side follows the
   [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).
2. **Notice from versioned templates.** A notice service reads the record and renders the notice from
   a template per regime and language: that a system was used, the principal reasons, what the person
   can do and by when. The template version and the send time are written back to the record. A
   reason-code fidelity eval, run as an [Eval Gate in CI](/patterns/eval-gate-in-ci), checks that the
   reasons a notice gives are the factors the model used.
3. **A contest path with authority.** A contest opens a case linked to the decision id and routed to a
   reviewer who did not take the original decision, who sees the inputs, the reasons and the person's
   representations, and who can change the outcome. Time to decide and reversal rates are monitored by
   group: a reviewer who confirms nearly everything is a signal, not a safeguard.
4. **Close the loop.** The review outcome, its reason and any correction are written to the record.
   Contest and reversal rates feed the [Drift & Fairness Monitor](/patterns/drift-fairness-monitor), and
   a cluster of overturned decisions on one reason code opens an issue against the model.

Illustrative decision notice record, written by the notice service and completed by the contest path:

```json
{
  "decision_id": "cc4-2026-09-18-0192",
  "subject": "credit-check-04@3.2",
  "solely_automated": true,
  "regimes": ["GDPR Art. 22", "Regulation B 1002.9"],
  "outcome": "declined",
  "reason_codes": ["R07 payment arrears", "R12 short credit history"],
  "notice": {
    "template": "adverse-action.en.v5",
    "sent_at": "2026-09-18T10:02:11Z",
    "due_by": "2026-10-18"
  },
  "contest": {
    "opened_at": "2026-09-20T08:14:00Z",
    "reviewer_role": "credit-review-l2",
    "outcome": "overturned",
    "reason": "Arrears cleared; the applicant supplied the settlement statement.",
    "closed_at": "2026-09-23T15:40:00Z"
  }
}
```

> **Example (illustrative)** A telco's handset-financing check declines an applicant. The notice
> service sends the decline with two reason codes and a contest link within the hour. The applicant
> contests with a settlement statement, a second-line reviewer overturns the decline, and the
> overturn rate for reason code R07 enters the next threshold review of the model.

## Consequences
Each person's notice and contest can be produced on request, and the contest channel becomes a sensor
for model error and unfairness. The cost is a notice service with per-regime templates to keep
current, reviewer capacity with real authority, and a reason-code fidelity eval. Faithful but
unhelpful reasons still fail the person, so test the notices with the people who receive them.

## Related patterns
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Rights Requests Against Models](/patterns/rights-requests-against-models).

**Maps to:** EU AI Act Art. 26(11), Art. 86 · GDPR Art. 13(2)(f), Art. 15(1)(h), Art. 22 · UK GDPR
Arts. 22A–22D · ECOA / Regulation B 12 CFR 1002.9 · ISO/IEC 42001 A.8.2, A.9.2 · NIST AI RMF
MEASURE 3.3, MANAGE 4.1, MAP 3.5 · Layer 04 Runtime Controls & Observability / Layer 05 Assurance &
Continuous Compliance.

Control ids follow ISO/IEC 42001 Annex A [10] and subcategory ids the NIST AI RMF [11]. Mappings are
illustrative, not a claim of conformity.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 13(2)(f), 14(2)(g), 15(1)(h), 22). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[3] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[4] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(11) informing persons subject to Annex III decisions; Art. 86(1) and (3) right to explanation, subsidiary to other Union law). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Annex III high-risk requirements from 2 Dec 2027); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[6] 12 CFR 1002.9 (Regulation B, notifications: 1002.9(a)(1) action taken notified within 30 days of a completed application; 1002.9(b)(2) specific principal reasons). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[7] Consumer Financial Protection Circular 2022-03, Adverse action notification requirements in connection with credit decisions based on complex algorithms (ECOA and Regulation B; withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14, although the page shows no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[8] SB26-189, Automated Decision-Making Technology (repeals and re-enacts SB 24-205; signed 2026-05-14; effective 2027-01-01; deployer notice, 30-day explanation, human review, three-year records). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[9] Press release No 22/25: judgment in Case C-203/22, Dun & Bradstreet Austria (explanation of the procedure and principles actually applied; an algorithm alone is not an explanation; trade secrets balanced by the authority or court). Court of Justice of the EU. 2025-02-27. https://curia.europa.eu/site/upload/docs/application/pdf/2025-02/cp250022en.pdf (verified: primary)
[10] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.9.2 processes for responsible use of AI systems). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[11] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 3.5 human oversight processes; MEASURE 3.3 feedback and appeal processes for end users and impacted communities; MANAGE 4.1 post-deployment monitoring plans, including appeal and override). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
