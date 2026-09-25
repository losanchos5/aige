---
id: training-data-rights-ledger
title: Training-Data Rights Ledger
layer: 2
order: 20
summary: "A per-source ledger of the right to train: acquisition channel, licence, opt-out check and permitted uses, joined to lineage so each model knows its sources."
---

# Pattern: Training-Data Rights Ledger

**Summary:** Keep one ledger row per training source (not per merged dataset) that records how the
data was acquired, on what licence or legal basis, whether rights reservations were checked and how,
and which uses are permitted; then join the ledger to lineage so every model version lists the rows
it was trained on. The ledger answers "did we have the right to use this?" per source, and "which
models are affected?" when a licence, an opt-out or an order changes the answer.

## Objectives
Make the right to train a recorded, queryable fact before training, and keep it true afterwards, so
that a withdrawal, an erasure request or a court order can be met for the affected models only, and
proven.

## Target users
AI governance engineer, data acquisition and licensing leads, data stewards, legal and privacy
counsel, ML platform team.

## Impacted stakeholders
Rightholders and publishers, data subjects, model providers and downstream deployers, the AI Office
and other authorities, courts and regulators.

## Relevant principles
Instrument the build to produce its own proof; build the control at the earliest point it can block;
start from a named failure mode or harm.

## Context
A provider that trains or fine-tunes models on a mix of internal data, licensed corpora, open
datasets, crawled web content and user data, assembled by different teams at different times. Rights
attach per source and sometimes per record, but training consumes merged corpora.

## Problem
The legal questions are decided per source; the evidence is usually kept, if at all, per project.

- **Forces.** For content made publicly available online, the EU text-and-data-mining exception
  holds only where the rightholder has not reserved its rights "in an appropriate manner, such as
  machine-readable means" (DSM Directive `Art. 4(3)`) [1], and a Hamburg court held in December 2025
  that a reservation written in natural-language terms of use did not meet that bar, with a further
  appeal allowed [2]. A general-purpose model provider must keep a copyright policy that identifies
  and complies with such reservations and must publish a sufficiently detailed summary of the
  training content (`Art. 53(1)(c)` and `(d)`) [3]. How data was acquired matters as well as its
  licence: in *Bartz v. Anthropic* the court separated lawfully purchased and scanned books from
  pirated downloads [4]. Personal data brings purpose limitation and the compatibility test for
  further processing (GDPR `Art. 5(1)(b)`, `Art. 6(4)`) [5].
- **Failure mode.** Nobody can say which sources trained which model version, or on what terms. A
  single unlicensed or unlawfully obtained source contaminates every model trained on it, and remedies
  can reach the model itself: the FTC's Everalbum order required the deletion of "any models or
  algorithms developed in whole or in part using" the unlawfully used data [6]. Without per-source
  lineage, the only safe response is to delete everything.

## Solution
Make the ledger the admission ticket for every training source, and make lineage point back to it.

1. **One row per source.** Record the source id and version, the acquisition channel (licensed
   delivery, API, crawl, user upload, internal system), the licensor, the licence reference and its
   terms for training, commercial use and distribution of derived models, the legal basis where the
   data is personal, and the permitted uses. For crawled content, record the crawler identity, the
   window and the rights-reservation check: the method (for example `robots.txt` and page metadata
   read at fetch time), the result and the date. The EU AI Act's data-governance duties for high-risk
   systems name the same facts: "data collection processes and the origin of data" and, for personal
   data, "the original purpose of the data collection" (`Art. 10(2)(b)`) [3].
2. **Gate on the row.** The corpus build and the
   [Dataset Admission Gate](/patterns/dataset-admission-gate) fail when a source has no ledger row,
   when its terms do not permit the declared use, or when its reservation check is missing or stale.
3. **Join the ledger to lineage.** Each training run records the ledger rows (id and version) it
   read, and the [AIBOM](/patterns/aibom) lists the datasets by version. Backward lineage answers
   "what trained this model?"; forward lineage answers "which models used this source?", which is the
   question a withdrawal or an order asks.
4. **Generate the disclosures.** Build the GPAI training-content summary on the Commission's template
   (mandatory under `Art. 53(1)(d)`, applicable from 2 Aug 2025, with models already on the market
   by 2 Aug 2027) [7] and California's AB 2013 documentation (operative since 1 Jan 2026, including
   sources, personal information and the use of synthetic data) [8] as queries over the ledger, not as
   documents written from memory.
5. **Handle change as an event.** A licence expiry or withdrawal, a new reservation, an erasure
   request or an order marks the affected rows; forward lineage lists the affected models; and the
   remediation (retrain without the source, retire the model, or a documented decision to rely on
   another basis) is recorded against the same rows with a date and an approver.

The AI RMF asks for policies on third-party risks, "including risks of infringement of a
third-party's intellectual property or other rights" (GOVERN 6.1), and for mapping the legal risks of
components, "including the use of third-party data or software" (MAP 4.1) [9].

Illustrative ledger row for a crawled source:

```json
{
  "source_id": "src-crawl-techdocs-2026q2",
  "version": "2026-06-30",
  "acquisition_channel": "crawl",
  "crawl": { "user_agent": "corp-trainbot/2.1", "window": "2026-04-01/2026-06-30" },
  "legal_basis": { "copyright": "DSM Directive Art. 4 (commercial TDM exception)",
                   "personal_data": "GDPR Art. 6(1)(f); assessment LIA-2026-019" },
  "reservation_check": { "method": "robots.txt and page metadata at fetch time",
                         "result": "412 domains excluded", "checked_at": "2026-06-30" },
  "licence": { "ref": null, "training": "exception_relied_on", "derived_model_distribution": "permitted" },
  "permitted_uses": ["pre-training of the doc-lm model family"],
  "trained_models": ["doc-lm@1.4.0"],
  "owner": "data-acquisition-lead",
  "reviewed": "2026-09-15"
}
```

> **Example (illustrative)** A publisher's retrieval assistant was built on a corpus three teams had
> assembled. The ledger was added after the fact, one row per source: two sources had no licence on
> record and one had been crawled from a site whose `robots.txt` disallowed the crawler. The corpus
> build now fails on a source without a row, the two unlicensed sources were removed and the index
> rebuilt, and the rebuild is recorded against the same registry id. When a licensor later withdrew
> one archive, forward lineage named the two fine-tuned models that had read it.

## Consequences
The right to train becomes evidence that exists before training, disclosures are generated rather
than drafted, and a change in rights hits only the models that used the source. The costs: a row per
source is real work for large crawls, so the crawl pipeline must write rows itself; reservation
checks are only as good as the method recorded; and the ledger records the organisation's position,
it does not settle open legal questions.

## Related patterns
[Dataset Admission Gate](/patterns/dataset-admission-gate); [AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Maps to:** EU AI Act Art. 10(2)(b), Art. 53(1)(c)–(d) · Directive (EU) 2019/790 Art. 4(3) · GDPR
Art. 5(1)(b), Art. 6(4) · ISO/IEC 42001 A.7.3, A.7.5 · NIST AI RMF (Govern 6.1; Map 4.1) · Layer 02
Inventory & Transparency.

Function and subcategory labels follow the NIST AI RMF [9]; ISO/IEC 42001 Annex A ids follow a
published crosswalk, not the standard's text [10]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] Directive (EU) 2019/790 on copyright in the Digital Single Market, Art. 4 (text and data mining exception; 4(3) reservation of rights by machine-readable means for content made publicly available online). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[2] "Machine-readable opt-outs and AI training: Hamburg Court clarifies copyright exceptions" (Kneschke v. LAION, OLG Hamburg 5 U 104/24, 10 Dec 2025; natural-language reservations in terms of use insufficient; further appeal to the BGH allowed). Norton Rose Fulbright, Inside Tech Law. 2025-12. https://www.insidetechlaw.com/blog/2025/12/machine-readable-opt-outs-and-ai-training-hamburg-court-clarifies-copyright-exceptions (verified: secondary)
[3] Regulation (EU) 2024/1689 (AI Act): Art. 10(2)(b) data collection processes, origin of data and original purpose of collection; Art. 53(1)(c) copyright policy identifying reservations under Art. 4(3) of Directive (EU) 2019/790; Art. 53(1)(d) public summary of training content on the AI Office template (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] Bartz v. Anthropic PBC, No. 4:24-cv-05417 (N.D. Cal.): Order on Fair Use (Alsup, J., 23 Jun 2025, ECF 231) and Order Granting Final Approval of Class Action Settlement (Martínez-Olguín, J., 20 Jul 2026, ECF 680). CourtListener (court docket). 2026-07-20. https://www.courtlistener.com/docket/69058235/bartz-v-anthropic-pbc/ (verified: primary)
[5] Regulation (EU) 2016/679 (GDPR): Art. 5(1)(b) purpose limitation; Art. 6(4) compatibility of further processing. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[6] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed using users' biometric information, to be deleted within 90 days with a sworn statement). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[7] Template for general-purpose AI model providers to summarise their training content (template mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027; sources incl. scraped, user and synthetic data). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[8] AB 2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28; operative 2026-01-01; developers post training-data documentation incl. sources, personal information, copyright status and use of synthetic data). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 6.1 third-party risks incl. infringement of intellectual property or other rights; MAP 4.1 legal risks of components incl. third-party data or software). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.7.3 acquisition of data, B.7.5 data provenance; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
