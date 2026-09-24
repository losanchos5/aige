# 20. Other law that already applies to AI

> Copyright, anti-discrimination, consumer-protection and product-liability law already bind AI
> systems; this chapter maps each duty to its evidence artefact and stack layer.

The AI Act is the newest layer of law over AI systems, not the only one. Four older bodies of law
reached AI first and are enforced against it today: intellectual property, non-discrimination,
consumer protection and product liability. A US regulator put the premise in one line when it
launched a sweep against deceptive AI claims: "there is no AI exemption from the laws on the books"
[1]. None of these laws was written for models, but each asks a question an AI system must answer
with evidence: did we have the right to use this input, does the system disadvantage a protected
group, is what we say about it true, and was it defective when it left our control.

For each body of law the chapter gives the doctrine in plain terms, a dated EU / US / UK comparison,
and the artefact, stack layer (chapter 04) and pattern (chapter 05) that evidence compliance. It
closes with deepfakes and one hiring model run through five bodies of law at once.

It is not legal advice. **AI compliance and legal** functions interpret these obligations; the
engineer turns the interpretation into a control and a record, and depends on counsel to confirm the
reading (see [the disambiguation cluster](/bok/definition#the-disambiguation-cluster) and
[regulatory translation](/bok/the-role#regulatory-translation)). Data-protection law has its own
chapter ([19](/bok/privacy-and-ai)), the AI Act has chapter [18](/bok/eu-ai-act), and AI-specific
statutes around the world are in chapter [21](/bok/ai-laws-worldwide), with the
[sector rules that already reach AI](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai). Every status in this chapter
is stamped as of 2026-09-24; court cases and transposition deadlines move, so re-check before you
rely on a row.

## How to read this chapter

Each body of law asks one question of an AI system. The table names the artefact that answers it and
its layer in [the stack](/bok/the-stack): **1 Govern-as-Code · 2 Inventory & Transparency · 3 Evals
& Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous
Compliance**.

| Body of law | The question it asks of an AI system | Primary evidence artefact | Layer |
|---|---|---|---|
| Intellectual property | Did we have the right to use each input, and does any output copy protected expression? | Training-data rights ledger; memorisation eval; output-filter log | 2 · 3 · 4 |
| Non-discrimination | Does the system put a protected group at a disadvantage it cannot justify? | Per-group impact eval; search log for less discriminatory alternatives; reason-code fidelity test | 3 · 5 |
| Consumer protection | Is what we claim about the system, or do through its interface, misleading or unfair? | Claims register linked to eval runs; interface and disclosure review record | 1 · 3 · 5 |
| Product liability | Was the system defective when it left our control, and did we warn about its limits? | FMEA; AIBOM with hashes; eval history; change log; instructions for use | 2 · 3 · 5 |
| Synthetic media | Is generated media marked, disclosed and removable on request? | Provenance marking at generation; takedown pipeline with a clock | 4 · 5 |

Three cautions run through the chapter.

- **Jurisdiction decides the answer.** The same training run can be lawful in one country and
  infringing in another, so the artefacts record *where* data was copied, a model trained and a
  system placed on the market.
- **The evidence you keep is evidence you can be ordered to produce.** Under the EU's new product
  liability regime a court can order a defendant to disclose relevant evidence, and failure to do so
  triggers a presumption that the product was defective [2]. A defence file that is incomplete or
  inaccurate works against you. Keep it complete, versioned and honest.
- **Mappings are illustrative, not a claim of conformity.** An artefact supports and evidences an
  obligation; whether the obligation is met is a legal judgement.

## Intellectual property

Intellectual property touches an AI system at four points: the works copied to train it, its
outputs, the confidential information it is fed, and the inventions it helps make. At each point the
engineer records what happened, where, and under which right.

### Copyright and training data

Copying a work into a training corpus is, on its face, a reproduction. The legal question is whether
an exception (the EU, UK and Japanese route) or a defence (the US route) covers it.

**European Union.** The Digital Single Market (DSM) Directive creates two text-and-data-mining (TDM)
exceptions. Article 3 lets research organisations and cultural heritage institutions mine works for
scientific research. Article 4 is the general exception: anyone may copy lawfully accessible works
for TDM and keep the copies as long as needed, unless the rightholder has expressly reserved that
use "in an appropriate manner, such as machine-readable means in the case of content made publicly
available online" [3]. The AI Act turns that opt-out into a provider duty: Article 53(1)(c) requires
every general-purpose AI (GPAI) model provider to put in place a copyright policy that identifies
and complies with Article 4(3) reservations, and Article 53(1)(d) requires a public summary of the
training content on the AI Office template [4]. The Commission published that template on 24 Jul
2025 [5]. The open-source exemption in Article 53(2) lifts only the documentation duties in points
(a) and (b), so open-weight models still owe the copyright policy and the summary [4]. The GPAI Code
of Practice turns the policy into five measures: a written policy, lawful access (no paywall
circumvention, no persistently infringing sites), crawlers that follow `robots.txt`, safeguards
against infringing outputs, and a complaints contact [6].

The courts are filling in the detail. In *Kneschke v LAION* the Hanseatic Higher Regional Court held
on 10 Dec 2025 that building the LAION-5B dataset fell within the German TDM exceptions, and that a
reservation written in natural language in website terms was not machine-readable; it allowed a
further appeal to the Federal Court of Justice [7]. In *GEMA v OpenAI* the Munich Regional Court
held on 11 Nov 2025 that song lyrics memorised in a model's parameters are reproductions, that the
TDM exception covers preparatory copies but not the long-term incorporation of works into the model,
and that outputs reproducing the lyrics were the provider's responsibility [8]; check whether an
appeal is pending before relying on it (verify). The Court of Justice heard its first generative-AI
copyright case, *Like Company v Google* (C-250/25), on 10 Mar 2026, on whether training is a
reproduction, whether Article 4 covers it and whether chatbot answers reproducing press content are
a communication to the public. An Advocate General opinion was scheduled for 3 Sep 2026; the
judgment is pending as of 2026-09-24 [9] (verify the opinion).

**United States.** There is no TDM exception. Training is judged under fair use, which weighs four
factors: the purpose and character of the use (including whether it is transformative), the nature
of the work, the amount used, and the effect on the market for the work [10]. The cases so far turn
on their facts; they are tabled below.

**United Kingdom.** The UK's TDM exception covers copies made for computational analysis "for the
sole purpose of research for a non-commercial purpose" [11]. The government's statutory report of 18
Mar 2026 did not take forward the opt-out exception it had consulted on; it proposes to gather
further evidence and to develop input transparency through best practice rather than statute [12]
[13]. In *Getty Images v Stability AI* the High Court's November 2025 judgment dismissed the
secondary-infringement claim over a model trained abroad, on the basis that the model weights were
not an "infringing copy"; permission to appeal on that point was granted, and the appeal is pending
[14].

**Japan.** Article 30-4 of the Copyright Act permits exploitation of a work where the purpose is not
to enjoy its expression, such as AI training, unless it would "unreasonably prejudice the interests
of the copyright owner". The Japan Copyright Office's non-binding *General Understanding* (May 2024)
puts training that aims to output the training works' expression (deliberate overfitting, imitative
fine-tuning, retrieval-augmented generation that outputs the source) outside Article 30-4, and
copying a database sold for analysis while circumventing measures such as `robots.txt` within the
proviso [15].

| Question (as of 2026-09-24) | EU | United States | United Kingdom | Japan |
|---|---|---|---|---|
| Is commercial training on lawfully accessed works permitted without a licence? | Yes, under DSM Art. 4, unless reserved [3] | Only if fair use, decided case by case [10] | No general exception; s. 29A is non-commercial research only [11] | Yes, for non-enjoyment purposes, subject to the proviso [15] |
| How does a rightholder opt out? | Express reservation, machine-readable for online content [3] | No statutory opt-out | Not applicable; opt-out exception not adopted [12] | No opt-out; technical measures matter to the proviso [15] |
| Provider duty to publish training information? | Yes for GPAI providers: Art. 53(1)(d) summary [4] | No federal duty | No statutory duty [13] | No |

### US training cases, dated

Each ruling turned on its own record; none is a rule for every model.

| Case | Court | What was decided | Status (as of 2026-09-24) |
|---|---|---|---|
| *Thomson Reuters v. ROSS Intelligence* | D. Del.; 3d Cir. No. 25-2153 | Copying headnotes to build a competing, non-generative legal search tool was not fair use (11 Feb 2025) [16] | Interlocutory appeal argued 11 Jun 2026; decision pending [17] |
| *Bartz v. Anthropic* | N.D. Cal. | Training on lawfully acquired books was fair use; keeping a central library of pirated copies was not (23 Jun 2025) [18] | Class settlement of USD 1.5 billion finally approved 20 Jul 2026; release limited to past conduct, output claims preserved [18] [19] |
| *Kadrey v. Meta* | N.D. Cal. | Partial summary judgment for Meta on fair use for training, on the record the plaintiffs built (25 Jun 2025) [20] | Ruling confined to those plaintiffs and that record [20] |
| *New York Times v. Microsoft and OpenAI* | S.D.N.Y. | Claims over training on and reproducing news articles | Pending at summary judgment; the US Department of Justice filed in support of the defendants in Sep 2026 [21] |
| *Andersen v. Stability AI* | N.D. Cal. | Visual artists' claims over image-model training and distribution | Pending; jury trial reset to 20 Sep 2027 [22] |
| *Disney Enterprises v. Midjourney* | C.D. Cal. | Studios' claims over training and character outputs (filed 11 Jun 2025) | Pending [23] |

Three engineering lessons follow from these cases and the EU ones.

- **How you acquired the data matters.** *Bartz* separated lawful purchase-and-scan from pirated
  downloads [18], so the rights ledger records the acquisition channel, not only the licence.
- **Memorisation is the output-side exposure.** *GEMA* turned on lyrics the model could reproduce
  [8]; a memorisation eval finds that exposure before a claimant does.
- **Opt-outs are read by machines at crawl time.** *LAION* and the Code both rest on
  machine-readable signals [7] [6]; the crawler's policy is code and its decisions are logs.

### Outputs: memorisation and ownership

**Infringing outputs.** Language models can return rare training sequences verbatim on targeted
queries, and larger models are more exposed [24]. The controls sit in two layers: an eval that
probes for regurgitation before release (layer 03) and an output filter that blocks near-verbatim
reproduction of protected corpora or licensed code in production (layer 04), the safeguards the Code
of Practice asks for [6].

**Who owns an output.** In the United States copyright requires a human author. The D.C. Circuit
held so on 18 Mar 2025 in *Thaler v. Perlmutter* [25], and the Supreme Court declined to review the
case on 2 Mar 2026 [26]. The US Copyright Office's copyrightability report (29 Jan 2025) treats
prompts alone as insufficient for authorship, while human expressive contributions, selection and
arrangement, and modification of AI output can be protected; its March 2023 registration guidance
requires applicants to disclose AI-generated material [27]. Its report on training (Part 3) is still
a pre-publication version [27]. The UK is the outlier: for a computer-generated work the author is
"the person by whom the arrangements necessary for the creation of the work are undertaken" [11].

For the engineer, ownership is a provenance problem: protecting an asset a model helped make needs a
record of the human contribution (prompts, selection, edits, who and when), which also supports the
disclosure a registration asks for.

### Database rights and trade secrets

**Database right.** The EU gives the maker of a database a sui generis right against extraction or
re-utilisation of all or a substantial part of its contents, where the maker invested substantially
in obtaining, verifying or presenting them [28]. Scraping a database for training is extraction; DSM
Article 4 covers it on the same conditions as copyright, including the reservation [3].

**Trade secrets and leakage through prompts.** A trade secret is protected only while its holder
takes "reasonable steps" (EU) or "reasonable measures" (US) to keep it secret [29] [30]. Two AI
paths put that condition at risk: staff pasting code, prices or customer data into a third-party
model whose terms allow retention or training, and fine-tuning on confidential material that
extraction attacks can later recover [24]. A record showing no control at all is a poor start in
either case. The artefacts are ordinary and cheap: a data-loss-prevention rule in front of every
external model endpoint (layer 04, [Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail)); a
vendor record of retention and no-training terms, checked at the [Vendor / Model Due-Diligence
Gate](/bok/patterns#pattern-vendor--model-due-diligence-gate); and a data-classification tag on
every fine-tuning set, so a secret never enters a training pipeline without a decision on record.

### Patents and AI inventorship

The DABUS applications, in which an AI system was named as sole inventor, failed everywhere they
were tested. The US Federal Circuit held on 5 Aug 2022 that an inventor must be a natural person
[31]; the UK Supreme Court reached the same result on 20 Dec 2023 [32]; and the EPO's Legal Board of
Appeal held on 21 Dec 2021 that "a machine is not an inventor" under the EPC [33]. For AI-assisted
inventions, the USPTO rescinded its February 2024 guidance on 28 Nov 2025 and replaced it: AI is
treated like any other tool, and the ordinary conception test applies to the humans involved [34].

The artefact is an invention record that captures human conception (who framed the problem and
recognised the solution) alongside the AI tools and inputs used.

### Model licences and vendor indemnities

**Open weights are not the same as open source.** Many open-weight models ship under licences with
use restrictions. The Llama 3.1 licence, for example, incorporates an acceptable use policy and
requires a separate licence from Meta for licensees whose products exceeded 700 million monthly
active users on the release date [35]. The Open Source Initiative's definition, by contrast,
requires the preferred form for modification: data information, code and parameters [36]. The AI
Act's open-source relief is narrower still and never covers the copyright duties [4].

The control is a licence field on every model and dataset in the
[AIBOM](/bok/patterns#pattern-aibom), plus a policy that blocks a deployment whose use case breaches
the licence's use policy or commercial threshold (layer 01). A licence read once at procurement and
never again is not a control.

**Indemnities are conditional, and the conditions are runtime controls.** Microsoft's Copilot
Copyright Commitment (7 Sep 2023), for example, is conditioned on the customer using the built-in
guardrails and content filters and not attempting to generate infringing material [37]. Switching
the filters off to cut false positives may switch off the indemnity. Record scope and conditions at
the due-diligence gate, and keep configuration snapshots and filter logs that show the conditions
held when an output was produced.

### Artefacts that evidence IP compliance

| Artefact | What it records | Layer | Pattern |
|---|---|---|---|
| Training-data rights ledger | Per dataset: source, acquisition channel, licence, TDM reservation check (result, method, date), place of copying | 2 | Training-Data Rights Ledger (proposed); [AIBOM](/bok/patterns#pattern-aibom) |
| Crawler policy-as-code | Honouring `robots.txt` and other machine-readable reservations; no paywall circumvention; blocklist of infringing sites | 1 | [Policy Card](/bok/patterns#pattern-policy-card) |
| Memorisation and regurgitation eval | Extraction probes and verbatim-overlap thresholds per model version | 3 | [Eval Gate in CI](/bok/patterns#pattern-eval-gate-in-ci) |
| Output filter log | Blocked near-verbatim outputs; licence matches on generated code | 4 | [Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail) |
| Copyright policy and training summary | Versioned Art. 53(1)(c) policy and Art. 53(1)(d) summary for GPAI providers | 5 | [Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal) |
| Licence and indemnity register | Model and dataset licences, use policies, indemnity scope and conditions | 2 · 5 | [Vendor / Model Due-Diligence Gate](/bok/patterns#pattern-vendor--model-due-diligence-gate) |
| Prompt DLP rule | Secrets and source code blocked or redacted before external calls | 4 | [Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail) |

> **In practice (illustrative)**
> A retrieval assistant for a publisher's sales team was built on a corpus assembled by three
> different teams. The rights ledger was added after the fact: one row per source, with its
> acquisition channel and licence. Two sources had no licence on record and one had been scraped
> from a site whose `robots.txt` disallowed the crawler's user agent. The corpus build now fails
> when a source lacks a ledger row, the crawler's allow/deny decisions are logged per URL, and the
> two unlicensed sources were removed and the index rebuilt, with the rebuild recorded against the
> same registry id.

## Non-discrimination

Anti-discrimination law does not ask whether a model is fair in the abstract. It asks whether a
decision in a regulated domain treated a protected group worse, and whether the practice that caused
it can be justified. The engineering work is to measure the effect in the law's terms and keep the
justification with the measurement.

### Disparate treatment, disparate impact and proxies

**Two theories.** *Disparate treatment* is treating someone differently because of a protected
trait. *Disparate impact* is a neutral practice that falls harder on a protected group. Under Title
VII, a claimant proves impact by showing that a particular practice causes it; the employer must
then show the practice is "job related for the position in question and consistent with business
necessity"; and the claimant can still win by showing an alternative employment practice with less
impact that the employer refuses to adopt [38]. EU law draws the same line between direct and
indirect discrimination: an apparently neutral criterion that puts a group "at a particular
disadvantage" is unlawful "unless that provision, criterion or practice is objectively justified by
a legitimate aim and the means of achieving that aim are appropriate and necessary" [39] [40].

**Enforcement posture is not the statute.** In the United States, Executive Order 14281 of 23 Apr
2025 directs federal agencies to deprioritise enforcement of statutes and regulations to the extent
they include disparate-impact liability [41], and HUD has proposed removing its Fair Housing Act
disparate-impact regulations, with a supplemental proposal whose comment period runs to 9 Oct 2026
[42]. Title VII's disparate-impact text is unchanged [38], private suits continue (see *Mobley*
below) and EU and state law are unaffected, so the impact test stays.

**Proxies.** Removing the protected attribute does not remove the effect: postcode, name, school or
career gaps can carry the same information. Blindness also makes testing harder, because you cannot
measure a disparity across groups you have not recorded; to test, you must process the attribute.
After the Digital Omnibus, the AI Act's new Article 4a gives providers of high-risk systems a basis
to process special-category data for bias detection, with pseudonymisation and deletion once the
bias is corrected [43]. Chapter [16](/bok/fairness-and-explainability#group-fairness-metrics) covers the metrics
themselves; this section covers what the law will read them against.

### Employment

**United States.** Title VII applies to AI screening as to any other selection procedure [38], and
vendors are not safely outside federal age-discrimination law: in *Mobley v. Workday* the court
conditionally certified a nationwide age-discrimination collective against the vendor of an
applicant-screening system on 16 May 2025 [44]. New York City's Local Law 144 is the most concrete
AI-specific rule: an employer may not use an automated employment decision tool unless it has had a
bias audit within the past year, the audit summary is published, and candidates are notified 10
business days before use; enforcement began on 5 Jul 2023 [45]. The audit, by an independent third
party, reports selection rates and impact ratios by sex, by race and ethnicity and by their
intersection [46]. Illinois amended its Human Rights Act to reach discriminatory employer use of AI,
reported as effective from 1 Jan 2026 (verify).

**European Union.** The Race Equality and Employment Framework directives prohibit direct and
indirect discrimination in access to employment, working conditions and dismissal [39] [40]. The AI
Act lists recruitment, selection, promotion, termination, task allocation and performance monitoring
as high-risk (Annex III, point 4) [47], with the high-risk duties for Annex III systems deferred by
the Omnibus to 2 Dec 2027 [48]. The Platform Work Directive (EU) 2024/2831, to be transposed by 2
Dec 2026, goes further for digital labour platforms: no automated processing of a worker's emotional
state or private conversations, and no inferring of protected characteristics (Art. 7); written
information on automated systems and their main parameters (Art. 9); an impact evaluation, including
on equal treatment, at least every two years, and a human decision for any account suspension or
termination (Art. 10); and a right to an explanation and review, with rectification within two weeks
(Art. 11) [49].

### Credit and lending

**United States.** When a creditor takes adverse action, Regulation B requires a statement of the
specific reasons, or a notice of the right to receive them [50]. The CFPB's Circular 2022-03 states
that creditors using complex algorithms, including AI or machine learning, must still provide the
specific principal reasons; complexity is no excuse [51]. Where the decision rests on a consumer
report, the FCRA adds its own adverse-action duties [52]. The engineering consequence is precise:
the reasons in the notice must be the reasons the model used, so a reason code produced by an
attribution method is tested for fidelity against each model version (chapter 16 on
[adverse-action notices](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes)).

**European Union.** The second Consumer Credit Directive (EU) 2023/2225 requires a creditworthiness
assessment on relevant, accurate information, without special-category data or social networks as a
source (Art. 18(3)). Where the assessment is automated, the consumer can obtain human intervention:
an explanation of the assessment and its logic, a chance to state their view, and a review (Art.
18(8)). Member States had to adopt the rules by 20 Nov 2025 and apply them from 20 Nov 2026 [53]
(verify national transposition and any change to the application date). Creditworthiness scoring is
also high-risk under the AI Act (Annex III, point 5(b)), with fraud detection excluded [47]; the
data-protection rules on automated decisions are in chapter [19](/bok/privacy-and-ai#automated-decision-making).

### Housing, insurance and public services

**Housing.** The Fair Housing Act reaches ad-delivery algorithms: in a 2022 settlement with the US
Department of Justice, Meta agreed to drop its "Special Ad Audience" tool and build a system to
reduce variance in housing-ad delivery across groups [54]. In the EU, the Race Equality Directive
covers access to goods and services available to the public, including housing [39].

**Insurance.** Colorado's SB21-169 (signed 6 Jul 2021) bars insurers from unfairly discriminating
through external consumer data, algorithms and predictive models, and requires a risk-management
framework, assessment and monitoring, and attestation by a chief risk officer, under rules the
commissioner adopts line of insurance by line [55] (verify the lines covered and effective dates of
the implementing rules as of 2026-09-24). The NAIC's model bulletin of 4 Dec 2023 expects insurers
to maintain a written programme for the responsible use of AI systems, including oversight of
third-party AI systems and data [56]. In the EU, the Court of Justice held in *Test-Achats* that the
derogation allowing sex-based differences in insurance premiums was invalid with effect from 21 Dec
2012 [57], and the AI Act lists risk assessment and pricing in life and health insurance as
high-risk (Annex III, point 5(c)) [47].

**Public services.** Eligibility decisions for public assistance are high-risk under the AI Act
(Annex III, point 5(a)) [47]. In the UK *Bridges* case the Court of Appeal found that the police
force had "never sought to satisfy themselves, either directly or by way of independent
verification, that the software program in this case does not have an unacceptable bias on grounds
of race or sex", a breach of the public sector equality duty [58]. The missing artefact was a bias
test the deployer owned.

### Fairness measures the law recognises

The law picks no single fairness metric, but several of its tests are quantitative. Each maps to an
eval and a record.

| Legal test | What it asks | Eval (layer 03) | Evidence record (layer 05) |
|---|---|---|---|
| Four-fifths rule (US selection procedures) | A selection rate below 80% of the highest group's is generally evidence of adverse impact; smaller gaps can still count [59] | Adverse-impact ratio per group, with sample sizes and a significance test | Signed eval result per model version, in the model card |
| Title VII disparate impact | Impact caused by a practice; business necessity; less discriminatory alternative [38] | Impact metrics; job-relatedness validation; search across candidate models | Log of alternatives considered and why each was rejected |
| NYC Local Law 144 | Impact ratios by sex, race and ethnicity, and intersectional categories, by an independent auditor [46] | The same calculation on historical or test data | Published audit summary with its date; candidate notice record |
| EU indirect discrimination | Particular disadvantage; objective justification; appropriate and necessary means [39] | Group-disparity metrics plus a necessity analysis | Justification section in the [FRIA](/bok/patterns#pattern-fria-as-code) or DPIA |
| Adverse action (ECOA, FCRA) | Specific principal reasons for the decision [50] [51] | Reason-code fidelity test against the model | Reason-code eval result and the notice template version |
| CCD2 Art. 18(8) | Explanation, human intervention and review [53] | Explanation artefact per model version | Review log with outcome and reviewer |

The four-fifths rule is a rule of thumb for enforcement agencies, not a safe harbour [59]. Treat an
impact ratio above 0.8 as a pass of one check, not as proof of lawfulness. Chapter 16 computes and
reports it with counts and intervals
([disparate impact and the four-fifths rule](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio)).

> **In practice (illustrative)**
> A recruitment team deployed a vendor ranking model in New York and two EU countries. The vendor's
> bias audit was a year old and computed on another customer's data. The team re-ran the impact
> ratios on its own applicant flow monthly, as a pipeline eval with a 0.8 floor that paged the
> owner. In month three one intersectional category fell to 0.71; the cause was a new "years of
> continuous experience" feature that penalised career gaps. The feature was removed, the search log
> recorded the alternatives tested, and a refreshed audit summary was published before the next
> round.

## Consumer protection

Consumer-protection law reaches AI through three doors, with no AI-specific statute: what you claim
about the system, how its interface treats people, and what it does with their data. What a
chatbot tells a customer binds the business that deployed it:
[Moffatt v. Air Canada](/cases/moffatt-v-air-canada) is the case written up as a post-mortem.

### Unfair and deceptive practices in the United States

Section 5 of the FTC Act prohibits unfair or deceptive acts or practices. A practice is unfair only
if it causes or is likely to cause "substantial injury to consumers which is not reasonably
avoidable by consumers themselves and not outweighed by countervailing benefits" [60]. Deception, in
the FTC's 1983 policy statement, is a representation, omission or practice that is likely to mislead
a consumer acting reasonably and is material [61]. An AI performance claim with no evidence behind
it is deceptive in exactly this sense [62].

- **Unsubstantiated performance claims.** Workado claimed its AI-content detector was 98% accurate;
  testing put accuracy on general-purpose content at 53%, because the model was trained on academic
  text. The order requires competent and reliable evidence for such claims [62]. The September 2024
  sweep, Operation AI Comply, targeted a "robot lawyer" service among others [1].
- **Deploying without reasonable safeguards.** Rite Aid is banned for five years from using facial
  recognition for security or surveillance, after the FTC alleged it deployed the technology without
  reasonable procedures to prevent harm to consumers [63].
- **Algorithmic disgorgement.** When a company trains on data it obtained unlawfully, the remedy can
  reach the model. The Everalbum order defines "Affected Work Product" as "any models or algorithms
  developed in whole or in part using" the biometric data, and requires its deletion within 90 days
  with a sworn statement [64].
- **AI washing.** In March 2024 the SEC settled with two investment advisers over false claims about
  their use of AI, for USD 400,000 in combined penalties [65].
- **Fake reviews and bots.** The FTC's rule on consumer reviews (16 CFR Part 465) bans fake reviews,
  including AI-generated reviews attributed to people who do not exist, with civil penalties [66].
  California makes it unlawful to use a bot to mislead a person about its artificial identity in
  order to sell something or influence a vote, unless the bot is disclosed clearly and conspicuously
  [67].

Enforcement priorities change with administrations; the statute and the orders above do not. A claim
needs evidence when it is made, and a model trained on tainted data can be ordered destroyed.

### The EU: UCPD, DSA and the AI Act

The Unfair Commercial Practices Directive prohibits practices that are contrary to professional
diligence and materially distort, or are likely to distort, the average consumer's economic
behaviour, judged from a vulnerable group's perspective where it is targeted [68]. Since the 2019
amendments, its blacklist includes stating that reviews come from real users without reasonable
steps to check, and submitting or commissioning false reviews [69]. The Digital Services Act adds
platform-specific rules: online platforms may not design interfaces that deceive or manipulate users
or impair their free and informed decisions (Art. 25); platforms must explain the main parameters of
their recommender systems (Art. 27); and very large platforms' risk mitigation includes prominent
marking of generated or manipulated media that appreciably resembles real persons or events (Art.
35(1)(k)) [70]. The AI Act prohibits AI systems that use manipulative or deceptive techniques, or
exploit vulnerabilities, to distort behaviour in ways that cause significant harm (Art. 5(1)(a)–(b))
[71], and requires that people be told when they are interacting with an AI system unless it is
obvious (Art. 50(1)) [72].

### The United Kingdom: DMCC Act

Under the Digital Markets, Competition and Consumers Act 2024, the general prohibition of unfair
commercial practices has applied since 6 Apr 2025 (s. 225), and the practices always deemed unfair
include fake consumer reviews and reviews that conceal an incentive (Sch. 20, para. 13) [73].

| Practice (as of 2026-09-24) | United States | European Union | United Kingdom | Evidence artefact | Layer |
|---|---|---|---|---|---|
| Unsubstantiated accuracy or fairness claim | FTC Act s. 5; Workado order [62] | UCPD general clause [68] | DMCC s. 225 [73] | Claims register linked to eval runs | 3 · 5 |
| AI-generated fake reviews | 16 CFR Part 465 [66] | UCPD Annex I, 23b–23c [69] | DMCC Sch. 20, para. 13 [73] | Policy blocking review generation; provenance log | 1 · 4 |
| Undisclosed bot | Cal. BPC s. 17941 [67] | AI Act Art. 50(1) [72] | No bot-specific rule; s. 225 may apply [73] | Disclosure control and a test that it renders | 4 |
| Manipulative interface or output | FTC Act s. 5 unfairness [60] | DSA Art. 25 [70]; AI Act Art. 5(1)(a)–(b) [71] | s. 225 [73] | Interface review; red-team eval for manipulation | 3 · 5 |
| Model built on unlawfully obtained data | Deletion of "Affected Work Product" [64] | Data-protection remedies (chapter 19) | Data-protection remedies (chapter 19) | Lineage from dataset to every model trained on it | 2 |

### Claims substantiation and algorithmic disgorgement

**A claims register.** Every public statement about accuracy, fairness, autonomy or "AI-powered"
capability is a row: the claim, where it appears, the eval run that supports it, the data it was
measured on, and the date. Workado failed on the last two columns: the measurement did not match the
population the claim described [62]. A model release reruns the eval and re-validates every claim
that cites it; a stale or failing claim is pulled from the copy. This is proposed here as a new
pattern, the **Claims Substantiation Gate**: an [eval gate](/bok/patterns#pattern-eval-gate-in-ci)
pointed at marketing copy.

**Deletion-ready lineage.** An order to delete "models or algorithms developed in whole or in part
using" some data [64] can only be complied with, and proven, if you know which models touched the
data. That is an [AIBOM](/bok/patterns#pattern-aibom) with dataset lineage down to the version, plus
the training-data rights ledger. Without it, the only safe response to a disgorgement order is to
delete everything.

## Product liability

Product liability asks whether a product was defective and whether the defect caused the harm. For
AI the new questions are whether software is a product, who controls it after it ships, and what a
defect is in something that learns and updates.

### The EU Product Liability Directive

The revised Product Liability Directive, (EU) 2024/2853, was adopted on 23 Oct 2024 and published on
18 Nov 2024. Member States must transpose it by 9 Dec 2026, and it applies to products placed on the
market or put into service after that date [2]. Its main moves for AI:

- **Software is a product** (Art. 4(1)); the recitals name AI among the reasons for the revision,
  and free and open-source software supplied outside a commercial activity is excluded (Art. 2(2))
  [2].
- **Defect is judged with learning and updates in view.** The factors include "the effect on the
  product of any ability to continue to learn or acquire new features after it is placed on the
  market", relevant safety requirements including cybersecurity, and the moment the product left the
  manufacturer's control (Art. 7(2)) [2]. Control continues while the manufacturer can supply
  software updates (Art. 4(5)) [2].
- **Updates reopen the file.** The defence that a defect arose after placing on the market does not
  apply where, within the manufacturer's control, the defect is due to software or its updates, a
  missing safety update, or a substantial modification (Art. 11(2)) [2]. Whoever substantially
  modifies a product outside the manufacturer's control becomes its manufacturer (Art. 8(2)) [2].
- **Disclosure and presumptions.** A court can order the defendant to disclose relevant evidence,
  with protection for trade secrets (Art. 9). Defect is presumed if the defendant fails to disclose,
  if the product breaches mandatory safety requirements, or if damage came from an obvious
  malfunction; and a court must presume defect or causation where the claimant faces excessive
  difficulty, notably from technical or scientific complexity, and shows that either is likely
  (Art. 10) [2].
- **Damage and time.** Compensable damage covers death, personal injury including medically
  recognised psychological harm, property damage and the destruction or corruption of data not used
  for professional purposes (Art. 6). Claims expire 10 years after placing on the market, restarting
  from a substantial modification, or 25 years for latent personal injury (Art. 17) [2].

The parallel AI Liability Directive proposal, which would have eased fault-based claims, was
withdrawn: announced in the Commission's 2025 work programme, published in the Official Journal on 6
Oct 2025 [74]. Fault-based AI claims stay with national tort law.

### United States tort theories

US product liability recognises three kinds of defect: manufacturing defects in some units, design
defects inherent in the design, and marketing defects, which cover improper instructions and
failures to warn of latent dangers; courts test design defects by consumer expectations, by weighing
risk against utility, or both [75]. Whether software, and a chatbot in particular, is a "product" is
contested and decided case by case. In *Garcia v. Character Technologies*, a wrongful-death suit
over a companion-chatbot app pleaded as product liability, the court granted in part and denied in
part the motions to dismiss on 21 May 2025, and the case was resolved and dismissed without
prejudice on 7 Jan 2026 [76]; check reports that product-liability theories survived against the
order itself (verify).

### The UK product liability review

The Law Commission is reviewing the Consumer Protection Act 1987 regime, expressly including digital
products and AI; terms of reference were published on 8 Dec 2025 and a consultation is planned for
the second half of 2026 [77].

### Defect types mapped to AI failure modes

Each legal category maps onto engineering failure modes and an artefact that shows whether they
happened.

| Defect type | What it means for an AI system | Evidence that answers it | Layer |
|---|---|---|---|
| Manufacturing | The deployed system departs from its own design: wrong model version, corrupted weights, misconfigured guardrail, broken data pipeline | AIBOM with hashes; signed deployment record; configuration drift alerts | 2 · 4 · 5 |
| Design | The design itself is unsafe for a foreseeable use, and a safer alternative was reasonably available: untested operating conditions, no guardrail, no human oversight where needed | FMEA; eval coverage matrix; red-team results; design review with alternatives considered | 1 · 3 |
| Warning (marketing) | Known limits and out-of-scope uses were not disclosed | [Model card](/bok/patterns#pattern-model-card-as-control-evidence); instructions for use; in-product notices, all versioned | 2 · 5 |
| Update (EU Art. 11(2)) | An update introduced the defect, or a safety update that was needed was not shipped | Change log; regression evals per release; patch decision records | 3 · 4 · 5 |

### Duty to warn after updates

A model update is a new release. Under the EU regime the manufacturer answers for defects that
updates cause, or that a missing safety update leaves in place, while the system is within its
control [2]; US failure-to-warn theories reach the same point [75]. So warnings travel with
versions: the model card and instructions for use regenerate on every release, release notes list
known limitations and changed behaviour, and field monitoring feeds the [Incident
Pipeline](/bok/patterns#pattern-incident-pipeline), so a new hazard produces a decision (patch,
warn, withdraw) with an owner and a date (chapter [17](/bok/incidents#the-response-lifecycle)).

### The defence file

A defence file per product release holds:

- a **failure mode and effects analysis** in the form the IEC 60812 standard describes, with AI
  failure modes (distribution shift, prompt injection, hallucinated facts, unsafe tool use) as rows
  [78];
- the **AIBOM** for the release, with model, dataset and dependency hashes;
- the **eval history**: every gate result for this and prior versions, including failures and the
  fixes that followed;
- **signed runtime logs** for the decisions in question, retained for the claim period;
- the **warnings as shipped**: model card, instructions for use and in-product notices at that
  version.

The file cuts both ways: a claimant can obtain disclosure, and a gap can itself raise a presumption
of defect [2]. Keep it complete and retrievable for at least the 10-year expiry period [2]; as
[machine-readable evidence](/bok/patterns#pattern-machine-readable-evidence-oscal), disclosure
becomes a query rather than a project.

## Deepfakes and synthetic media

Synthetic media sits across consumer protection, privacy and criminal law. Three regimes set the
floor.

- **European Union.** Providers of generative systems must mark outputs in a machine-readable,
  detectable way (AI Act Art. 50(2)), and deployers must disclose deepfakes, with lighter rules for
  evidently artistic, satirical or fictional work (Art. 50(4)) [72]. Article 50 has applied since 2
  Aug 2026, with a marking grace period for existing generative systems until 2 Dec 2026 [79]. The
  Digital Omnibus also added a prohibition aimed at AI generation of non-consensual intimate imagery
  and child sexual abuse material, applying from 2 Dec 2026 [43]. Very large platforms must mark
  generated or manipulated media prominently as part of their DSA risk mitigation [70].
- **United States.** The TAKE IT DOWN Act (Public Law 119-12, 19 May 2025) makes it a federal crime
  to knowingly publish non-consensual intimate images, including "digital forgeries", and requires
  covered platforms to run a notice-and-removal process (within one year of enactment) that removes
  reported content within 48 hours, enforced by the FTC [80]. State deepfake and likeness laws vary
  (verify the states relevant to each deployment).
- **United Kingdom.** Sharing an intimate photograph or film that "shows, or appears to show"
  another person without consent has been an offence since 31 Jan 2024 [81], and the Data (Use and
  Access) Act 2025 added an offence of creating a purported intimate image of an adult [82].

The artefacts are provenance marking at the point of generation (for example content credentials or
watermarks, layer 04), a detection eval for the marking's survival through common transformations
(layer 03), and a takedown path with a 48-hour clock, an owner and a log (layer 05, built on the
[Incident Pipeline](/bok/patterns#pattern-incident-pipeline)).

## One hiring model through five bodies of law

A single system usually answers to several of these bodies of law at once, so its artefacts should
share one registry id.

> **Example (illustrative)**
> An employer in New York and the EU deploys a vendor's model that ranks applicants for interviews.
> One registry entry answers five legal questions.

| Body of law | The question for this system | Artefact, keyed to the registry id | Layer |
|---|---|---|---|
| AI Act (chapter [18](/bok/eu-ai-act#deployer-duties-article-26)) | Annex III point 4 high-risk: are the deployer duties met, and has the provider supplied its evidence? [47] | Registry entry with role (deployer); provider's documentation collected at the due-diligence gate; human oversight design | 2 · 5 |
| Data protection (chapter [19](/bok/privacy-and-ai#automated-decision-making)) | Is the processing lawful and are automated decisions safeguarded? | DPIA; candidate notice; review path | 1 · 5 |
| Non-discrimination | Is there adverse impact, is the practice justified, and were alternatives searched? [38] [45] [39] | Monthly impact-ratio eval; published audit summary; search log | 3 · 5 |
| Consumer protection | Is the vendor's "bias-free" claim, repeated in our candidate materials, substantiated? [62] | Claims register row citing our own eval run, not the vendor's brochure | 3 · 5 |
| Product liability | Is the directive the route for a rejected candidate? | Usually not: its damage heads (injury, property, data) do not include discrimination [2], so the exposure runs through equality law and contract | 5 |

The last row is the useful surprise: for a hiring model the law that bites is equality and data
protection, not product liability; for a medical triage assistant the balance reverses. Writing this
table per system, before building controls, decides where the evidence budget goes.

## What you can do this week

1. **Add four fields to every dataset's data card**: source, acquisition channel, licence, and the
   result and date of the TDM reservation check. Fail the pipeline when any is empty.
2. **Search your public copy** (website, sales decks, model cards) for numeric or absolute claims
   such as "99% accurate", "unbiased" or "fully autonomous". Link each to an eval run id, or remove
   it.
3. **Compute adverse-impact ratios per group** for every selection, eligibility or pricing model you
   run, with sample sizes, and store them in the model card for the current version.
4. **Put a data-loss-prevention rule in front of every external model endpoint** for secrets and
   source code, and record which vendors have no-training and retention terms.
5. **Open a defence file for your next AI release**: AIBOM with hashes, eval history, an FMEA, the
   instructions for use and the release notes, with a retention period of at least 10 years.

**Maps to:** EU AI Act Art. 4a, 5, 50, 53(1)(c)–(d), Annex III points 4–5 · DSM Directive Arts. 3–4
· PLD (EU) 2024/2853 · Platform Work Directive (EU) 2024/2831 · CCD2 Art. 18 · UCPD · DSA Arts. 25,
27, 35 · FTC Act s. 5 · Title VII s. 703(k) · 29 CFR 1607.4(D) · Regulation B · NYC LL144 · TAKE IT
DOWN Act · DMCC Act 2024 · all five stack layers (chapter 04). Mappings are illustrative, not a
claim of conformity.

## Sources

[1] "FTC Announces Crackdown on Deceptive AI Claims and Schemes" (Operation AI Comply; "there is no AI exemption from the laws on the books"; DoNotPay "robot lawyer" proposed order). Federal Trade Commission. 2024-09-25. https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes (verified: primary)
[2] Directive (EU) 2024/2853 on liability for defective products (Art. 2 scope and FOSS exclusion; Art. 4 software as a product and manufacturer's control; Art. 6 damage; Art. 7 defectiveness incl. ability to continue to learn; Art. 8(2) substantial modification; Art. 9 disclosure; Art. 10 presumptions; Art. 11(2) updates; Art. 17 expiry; Art. 22 transposition by 9 Dec 2026; OJ L 18 Nov 2024). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj (verified: primary)
[3] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market, Arts. 3 and 4 (TDM for scientific research; general TDM exception subject to a reservation "in an appropriate manner, such as machine-readable means"). Official Journal of the EU. 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj (verified: primary)
[4] EU AI Act Art. 53 (GPAI providers: 53(1)(c) copyright policy honouring Art. 4(3) DSM reservations; 53(1)(d) public summary of training content; 53(2) open-source relief limited to points (a) and (b), not for systemic-risk models). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/53/ (verified: primary)
[5] "Commission presents template for General-Purpose AI model providers to summarise the data used to train their model" (template for the Art. 53(1)(d) public summary). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/news/commission-presents-template-general-purpose-ai-model-providers-summarise-data-used-train-their (verified: primary)
[6] GPAI Code of Practice, Copyright chapter (Measures 1.1 to 1.5: copyright policy; lawful access without circumventing effective technological measures and excluding persistently infringing sites; robots.txt compliance; safeguards against infringing outputs; point of contact and complaints). Code of Practice text as published 10 Jul 2025. 2025-07-10. https://code-of-practice.ai/?section=copyright (verified: secondary)
[7] "Machine-readable opt-outs and AI training: Hamburg Court clarifies copyright exceptions" (Kneschke v. LAION, OLG Hamburg 5 U 104/24, 10 Dec 2025; natural-language reservations in terms of use insufficient; further appeal to the BGH allowed). Norton Rose Fulbright, Inside Tech Law. 2025-12. https://www.insidetechlaw.com/blog/2025/12/machine-readable-opt-outs-and-ai-training-hamburg-court-clarifies-copyright-exceptions (verified: secondary)
[8] "German court rules in favour of music rights management organisation against OpenAI" (GEMA v. OpenAI, Munich Regional Court I, 11 Nov 2025; memorisation in model parameters as reproduction; TDM exception limited to preparatory copies; decision open to appeal). European Commission, European IP Helpdesk. 2025-11-14. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/german-court-rules-favour-music-rights-management-organisation-against-openai-nyt-vs-openai-dispute-2025-11-14_en (verified: secondary)
[9] "CJEU Grand Chamber rules on music sampling and pastiche; first CJEU hearing on generative AI and copyright: Like Company v Google" (C-250/25; hearing 10 Mar 2026; questions on reproduction in training, DSM Art. 4 and chatbot outputs; Advocate General opinion scheduled for 3 Sep 2026). European Commission, European IP Helpdesk. 2026-04-24. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/cjeu-grand-chamber-rules-music-sampling-and-pastiche-first-cjeu-hearing-generative-ai-and-copyright-2026-04-24_en (verified: secondary)
[10] 17 U.S.C. § 107, Limitations on exclusive rights: fair use (the four factors). Legal Information Institute, Cornell Law School. current. https://www.law.cornell.edu/uscode/text/17/107 (verified: primary)
[11] Copyright, Designs and Patents Act 1988, s. 29A (copies for text and data analysis for non-commercial research) and s. 9(3) (author of a computer-generated work). legislation.gov.uk. current. https://www.legislation.gov.uk/ukpga/1988/48/section/29A (verified: primary)
[12] Report and Impact Assessment on Copyright and Artificial Intelligence (published under ss. 135 and 136 of the Data (Use and Access) Act 2025). UK Government, GOV.UK. 2026-03-18. https://www.gov.uk/government/publications/report-and-impact-assessment-on-copyright-and-artificial-intelligence (verified: primary)
[13] "Copyright and artificial intelligence: analysing the UK government's March 2026 reports" (opt-out TDM exception previously favoured not taken forward; further evidence to be gathered; input transparency through best practice rather than statute). VWV. 2026-03. https://www.vwv.co.uk/insights/articles/copyright-and-artificial-intelligence-analysing-the-uk-governments-march-2026-reports (verified: secondary)
[14] "High Court grants permission to appeal in Getty Images v Stability AI" (secondary infringement and the meaning of "infringing copy" for an AI model; Stability refused permission on the trade mark findings). Wiggin LLP. 2026-01. https://www.wiggin.co.uk/insight/high-court-grants-permission-to-appeal-in-getty-images-v-stability-ai/ (verified: secondary)
[15] "General Understanding on AI and Copyright in Japan": Overview (Art. 30-4 non-enjoyment purpose and its proviso; fine-tuning and RAG that output training expression fall outside Art. 30-4; database works and robots.txt; not legally binding). Japan Copyright Office, Agency for Cultural Affairs. 2024-05. https://www.bunka.go.jp/english/policy/copyright/pdf/94055801_01.pdf (verified: primary)
[16] Thomson Reuters Enterprise Centre GmbH v. ROSS Intelligence Inc., No. 1:20-cv-00613 (D. Del.), Memorandum Opinion (Bibas, J.). CourtListener (court docket). 2025-02-11. https://www.courtlistener.com/docket/17131648/thomson-reuters-enterprise-centre-gmbh-v-ross-intelligence-inc/ (verified: primary)
[17] "Third Circuit Hears Oral Argument in Ross v. Reuters AI Training Copyright Case" (No. 25-2153; argued 11 Jun 2026; first federal appeal on fair use in AI training). Baker Botts. 2026-07. https://www.bakerbotts.com/thought-leadership/publications/2026/july/third-circuit-hears-oral-argument (verified: secondary)
[18] Bartz v. Anthropic PBC, No. 4:24-cv-05417 (N.D. Cal.): Order on Fair Use (Alsup, J., 23 Jun 2025, ECF 231) and Order Granting Final Approval of Class Action Settlement (Martínez-Olguín, J., 20 Jul 2026, ECF 680). CourtListener (court docket). 2026-07-20. https://www.courtlistener.com/docket/69058235/bartz-v-anthropic-pbc/ (verified: primary)
[19] "Court Grants Final Approval of $1.5 Billion Anthropic Copyright Settlement" (release limited to past acquisition and copying through 25 Aug 2025; output claims preserved). The Authors Guild. 2026-07. https://authorsguild.org/news/court-grants-final-approval-anthropic-copyright-settlement/ (verified: secondary)
[20] Kadrey v. Meta Platforms, Inc., No. 3:23-cv-03417 (N.D. Cal.), Order denying the plaintiffs' motion and granting Meta's cross-motion for partial summary judgment (Chhabria, J., ECF 598). CourtListener (court docket). 2025-06-25. https://www.courtlistener.com/docket/67569326/kadrey-v-meta-platforms-inc/ (verified: primary)
[21] "DOJ urges judge to rule for OpenAI, Microsoft in N.Y. Times lawsuit" (summary-judgment stage; first US government position on AI-training copyright litigation). The Washington Post. 2026-09-02. https://www.washingtonpost.com/technology/2026/09/02/doj-urges-judge-rule-openai-microsoft-ny-times-lawsuit/ (verified: secondary)
[22] Andersen v. Stability AI Ltd., No. 3:23-cv-00201 (N.D. Cal.), Order regarding case schedule (Orrick, J., ECF 597; jury trial reset to 20 Sep 2027). CourtListener (court docket). 2026-06-15. https://www.courtlistener.com/docket/66732129/andersen-v-stability-ai-ltd/ (verified: primary)
[23] Disney Enterprises Inc. v. Midjourney Inc., No. 2:25-cv-05275 (C.D. Cal.), complaint (ECF 1). CourtListener (court docket). 2025-06-11. https://www.courtlistener.com/docket/70513159/disney-enterprises-inc-v-midjourney-inc/ (verified: primary)
[24] Extracting Training Data from Large Language Models (Carlini et al.; verbatim training sequences recovered from GPT-2; larger models more vulnerable; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[25] Thaler v. Perlmutter, No. 23-5233 (human authorship required for copyright registration). US Court of Appeals for the D.C. Circuit. 2025-03-18. https://media.cadc.uscourts.gov/opinions/docs/2025/03/23-5233.pdf (verified: primary)
[26] "Supreme Court Denies Cert in AI Authorship Case" (Thaler v. Perlmutter; certiorari denied 2 Mar 2026). Mayer Brown. 2026-03. https://www.mayerbrown.com/en/insights/publications/2026/03/supreme-court-denies-review-in-ai-authorship-case (verified: secondary)
[27] Copyright and Artificial Intelligence (Part 2, Copyrightability, 29 Jan 2025; Part 3, Generative AI Training, pre-publication version 9 May 2025; registration guidance for works containing AI-generated material, 16 Mar 2023). U.S. Copyright Office. 2025. https://copyright.gov/ai/ (verified: primary)
[28] Directive 96/9/EC on the legal protection of databases, Art. 7 (sui generis right against extraction and re-utilisation of a substantial part). Official Journal of the EU. 1996-03-11. https://eur-lex.europa.eu/eli/dir/1996/9/oj (verified: primary)
[29] Directive (EU) 2016/943 on the protection of undisclosed know-how and business information (trade secrets), Art. 2(1) ("reasonable steps under the circumstances" to keep information secret). Official Journal of the EU. 2016-06-08. https://eur-lex.europa.eu/eli/dir/2016/943/oj (verified: primary)
[30] 18 U.S.C. § 1839(3) (trade secret: the owner "has taken reasonable measures to keep such information secret"). Legal Information Institute, Cornell Law School. current. https://www.law.cornell.edu/uscode/text/18/1839 (verified: primary)
[31] Thaler v. Vidal, No. 2021-2347 (inventors under the Patent Act must be natural persons). US Court of Appeals for the Federal Circuit. 2022-08-05. https://cafc.uscourts.gov/opinions-orders/21-2347.OPINION.8-5-2022_1988142.pdf (verified: primary)
[32] Thaler v Comptroller-General of Patents, Designs and Trade Marks [2023] UKSC 49 (DABUS cannot be an inventor under the Patents Act 1977). UK Supreme Court. 2023-12-20. https://www.supremecourt.uk/cases/uksc-2021-0201 (verified: primary)
[33] J 8/20 (DABUS; "A machine is not an inventor within the meaning of the EPC"). EPO Legal Board of Appeal. 2021-12-21. https://www.epo.org/en/boards-of-appeal/decisions/j200008eu1 (verified: primary)
[34] Revised Inventorship Guidance for AI-Assisted Inventions, 90 FR 54636 (rescinds the 13 Feb 2024 guidance; AI as a tool; ordinary conception standard). USPTO, Federal Register. 2025-11-28. https://www.federalregister.gov/documents/2025/11/28/2025-21457/revised-inventorship-guidance-for-ai-assisted-inventions (verified: primary)
[35] Llama 3.1 Community License Agreement (Acceptable Use Policy incorporated; separate licence required above 700 million monthly active users on the release date). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[36] The Open Source AI Definition 1.0 (use, study, modify, share; preferred form for modification: data information, code and parameters). Open Source Initiative. 2024-10. https://opensource.org/ai/open-source-ai-definition (verified: primary)
[37] "Microsoft announces new Copilot Copyright Commitment for customers" (defence and payment of adverse judgments; conditional on using built-in guardrails and content filters and not attempting to generate infringing material). Microsoft On the Issues. 2023-09-07. https://blogs.microsoft.com/on-the-issues/2023/09/07/copilot-copyright-commitment-ai-legal-concerns/ (verified: primary)
[38] 42 U.S.C. § 2000e-2(k) (Title VII s. 703(k): burden of proof in disparate-impact cases; business necessity; alternative employment practice). Legal Information Institute, Cornell Law School. current. https://www.law.cornell.edu/uscode/text/42/2000e-2 (verified: primary)
[39] Council Directive 2000/43/EC implementing the principle of equal treatment irrespective of racial or ethnic origin, Art. 2(2)(b) (indirect discrimination; objective justification) and Art. 3(1)(h) (goods and services, including housing). Official Journal of the EU. 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj (verified: primary)
[40] Council Directive 2000/78/EC establishing a general framework for equal treatment in employment and occupation. Official Journal of the EU. 2000-11-27. https://eur-lex.europa.eu/eli/dir/2000/78/oj (verified: primary)
[41] Executive Order 14281, Restoring Equality of Opportunity and Meritocracy (s. 4: agencies to deprioritise enforcement of disparate-impact liability; FR Doc. 2025-07378). The White House, via GovInfo (Federal Register). 2025-04-23. https://www.govinfo.gov/content/pkg/FR-2025-04-28/html/2025-07378.htm (verified: primary)
[42] HUD's Implementation of the Fair Housing Act's Disparate Impact Standard: proposed rule (FR Doc. 2026-00590, 14 Jan 2026) and supplemental proposed rule (FR Doc. 2026-16228; comments due 9 Oct 2026). US Department of Housing and Urban Development, Federal Register. 2026-08-10. https://www.federalregister.gov/documents/2026/08/10/2026-16228/huds-implementation-of-the-fair-housing-acts-disparate-impact-standard-amendments-to-huds-title-vi (verified: primary)
[43] Consolidated changes after the Digital Omnibus (Art. 4a special-category data for bias detection in high-risk systems; Art. 5 prohibition on NCII and CSAM generation from 2 Dec 2026). AI Act Explorer (Future of Life Institute). 2026. https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ (verified: secondary)
[44] Mobley v. Workday, Inc., No. 3:23-cv-00770 (N.D. Cal.), Order granting preliminary collective certification (Lin, J., ECF 128). CourtListener (court docket). 2025-05-16. https://www.courtlistener.com/docket/66831340/mobley-v-workday-inc/ (verified: primary)
[45] Automated Employment Decision Tools (Local Law 144 of 2021 and 6 RCNY 5-300: bias audit within one year before use, published summary, notice 10 business days before use; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[46] Automated Employment Decision Tools: Frequently Asked Questions (bias audit by an independent third party; selection rates and impact ratios by sex, race/ethnicity and intersectional categories). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[47] EU AI Act Annex III, points 4 (employment, workers management) and 5 (public assistance eligibility; creditworthiness, fraud detection excepted; risk assessment and pricing in life and health insurance). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/annex/3/ (verified: primary)
[48] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 27 Jul 2026; Annex III high-risk obligations from 2 Dec 2027). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[49] Directive (EU) 2024/2831 on improving working conditions in platform work, Arts. 7 (limits on processing), 9 (transparency), 10 (human oversight), 11 (human review) and 29 (transposition by 2 Dec 2026). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj (verified: primary)
[50] 12 CFR § 1002.9 (Regulation B notifications: statement of specific reasons for adverse action). Legal Information Institute, Cornell Law School. current. https://www.law.cornell.edu/cfr/text/12/1002.9 (verified: primary)
[51] Circular 2022-03: Adverse action notification requirements in connection with credit decisions based on complex algorithms. Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[52] 15 U.S.C. § 1681m(a) (FCRA duties of users taking adverse action on the basis of consumer reports). Legal Information Institute, Cornell Law School. current. https://www.law.cornell.edu/uscode/text/15/1681m (verified: primary)
[53] Directive (EU) 2023/2225 on credit agreements for consumers, Art. 18 (creditworthiness assessment; 18(3) no special-category data, social networks not an external source; 18(8) human intervention and explanation) and Art. 48 (adopt by 20 Nov 2025, apply from 20 Nov 2026). Official Journal of the EU. 2023-10-18. https://eur-lex.europa.eu/eli/dir/2023/2225/oj (verified: primary)
[54] "Justice Department Secures Groundbreaking Settlement Agreement with Meta Platforms, Formerly Known as Facebook, to Resolve Allegations of Discriminatory Advertising" (Fair Housing Act; Special Ad Audience discontinued; Variance Reduction System for housing ads). US Department of Justice. 2022-06-21. https://www.justice.gov/opa/pr/justice-department-secures-groundbreaking-settlement-agreement-meta-platforms-formerly-known (verified: primary)
[55] SB21-169, Restrict Insurers' Use of External Consumer Data (signed 6 Jul 2021; risk-management framework, assessment and monitoring, chief risk officer attestation; rules by insurance practice). Colorado General Assembly. 2021-07-06. https://leg.colorado.gov/bills/sb21-169 (verified: primary)
[56] NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers (written AIS Program; third-party AI systems and data; adopted 4 Dec 2023). National Association of Insurance Commissioners. 2023-12-04. https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Adopted_0.pdf (verified: primary)
[57] Case C-236/09, Association Belge des Consommateurs Test-Achats (Art. 5(2) of Directive 2004/113/EC invalid with effect from 21 Dec 2012). Court of Justice of the EU. 2011-03-01. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62009CJ0236 (verified: primary)
[58] R (Bridges) v Chief Constable of South Wales Police [2020] EWCA Civ 1058 (public sector equality duty; no verification that facial recognition software lacked unacceptable race or sex bias). Court of Appeal (Civil Division), Courts and Tribunals Judiciary. 2020-08-11. https://www.judiciary.uk/wp-content/uploads/2020/08/R-Bridges-v-CC-South-Wales-ors-Judgment.pdf (verified: primary)
[59] 29 CFR § 1607.4(D), Uniform Guidelines on Employee Selection Procedures (adverse impact and the "four-fifths rule"). Legal Information Institute, Cornell Law School. current. https://www.law.cornell.edu/cfr/text/29/1607.4 (verified: primary)
[60] 15 U.S.C. § 45(n) (FTC Act s. 5: standard for unfairness). Legal Information Institute, Cornell Law School. current. https://www.law.cornell.edu/uscode/text/15/45 (verified: primary)
[61] FTC Policy Statement on Deception (representation, omission or practice likely to mislead a consumer acting reasonably; materiality). Federal Trade Commission. 1983-10-14. https://www.ftc.gov/legal-library/browse/ftc-policy-statement-deception (verified: primary)
[62] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy; 53% on general-purpose content; competent and reliable evidence required). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[63] FTC v. Rite Aid Corporation, No. 2:23-cv-5023 (E.D. Pa.) (five-year ban on facial recognition for security or surveillance; stipulated order approved 8 Mar 2024). Federal Trade Commission, case page. 2024-03-08. https://www.ftc.gov/legal-library/browse/cases-proceedings/2023190-rite-aid-corporation-ftc-v (verified: primary)
[64] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed using users' biometric information, to be deleted within 90 days with a sworn statement). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[65] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions; USD 400,000 combined penalties). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[66] "Federal Trade Commission Announces Final Rule Banning Fake Reviews and Testimonials" (16 CFR Part 465; covers AI-generated fake reviews; civil penalties for knowing violations). Federal Trade Commission. 2024-08-14. https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials (verified: primary)
[67] California Business and Professions Code ss. 17940 to 17943 (bot disclosure: unlawful to use a bot to mislead about its artificial identity to incentivise a sale or influence a vote, unless clearly and conspicuously disclosed; in force 1 Jul 2019). California Legislative Information. 2019. https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=BPC&division=7.&title=&part=3.&chapter=6.&article= (verified: primary)
[68] Directive 2005/29/EC (Unfair Commercial Practices Directive), Art. 5 (general prohibition; professional diligence; average and vulnerable consumer). Official Journal of the EU. 2005-05-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj (verified: primary)
[69] Directive (EU) 2019/2161 (better enforcement and modernisation of EU consumer protection rules), adding UCPD Annex I points 23b and 23c (consumer reviews). Official Journal of the EU. 2019-11-27. https://eur-lex.europa.eu/eli/dir/2019/2161/oj (verified: primary)
[70] Regulation (EU) 2022/2065 (Digital Services Act), Arts. 25 (online interface design and organisation), 27 (recommender system transparency) and 35(1)(k) (prominent marking of generated or manipulated media). Official Journal of the EU. 2022-10-19. https://eur-lex.europa.eu/eli/reg/2022/2065/oj (verified: primary)
[71] EU AI Act Art. 5(1)(a) and (b) (manipulative or deceptive techniques; exploitation of vulnerabilities). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/5/ (verified: primary)
[72] EU AI Act Art. 50 (disclosure of AI interaction; machine-readable marking of synthetic content; deployer disclosure of deep fakes). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/50/ (verified: primary)
[73] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 Apr 2025) and Sch. 20, para. 13 (fake and concealed-incentive consumer reviews). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[74] AI Liability Directive, Legislative Train Schedule (withdrawal announced in the Commission 2025 work programme; withdrawal published OJ C/2025/5423, 6 Oct 2025). European Parliament. 2026-08. https://www.europarl.europa.eu/legislative-train/theme-a-europe-fit-for-the-digital-age/file-ai-liability-directive (verified: secondary)
[75] "Products liability" (design, manufacturing and marketing defects, including failure to warn; consumer-expectation and risk-utility tests). Legal Information Institute, Wex. current. https://www.law.cornell.edu/wex/products_liability (verified: secondary)
[76] Garcia v. Character Technologies, Inc., No. 6:24-cv-01903 (M.D. Fla.): order granting in part and denying in part motions to dismiss (ECF 115, 21 May 2025); notice of resolution and order dismissing without prejudice (ECF 242 and 244, 7 Jan 2026). CourtListener (court docket). 2026-01-07. https://www.courtlistener.com/docket/69300919/garcia-v-character-technologies-inc/ (verified: primary)
[77] Product liability (review of the regime, including digital products and AI; terms of reference 8 Dec 2025; consultation planned for the second half of 2026). Law Commission of England and Wales. 2025-12. https://lawcom.gov.uk/project/product-liability/ (verified: primary)
[78] IEC 60812:2018, Failure modes and effects analysis (FMEA and FMECA), edition 3.0. International Electrotechnical Commission. 2018-08-10. https://webstore.iec.ch/en/publication/26359 (verified: primary)
[79] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026; marking grace for existing generative systems to 2 Dec 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[80] TAKE IT DOWN Act, Public Law 119-12 (S. 146) (knowing publication of intimate images incl. digital forgeries; notice-and-removal process within one year of enactment; removal within 48 hours; FTC enforcement). US Government Publishing Office, GovInfo. 2025-05-19. https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm (verified: primary)
[81] Sexual Offences Act 2003, s. 66B (sharing or threatening to share a photograph or film which "shows, or appears to show" another person in an intimate state; in force 31 Jan 2024). legislation.gov.uk. 2024-01-31. https://www.legislation.gov.uk/ukpga/2003/42/section/66B (verified: primary)
[82] Data (Use and Access) Act 2025, s. 138 (inserts Sexual Offences Act 2003 s. 66E, creating a purported intimate image of an adult). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/138 (verified: primary)
