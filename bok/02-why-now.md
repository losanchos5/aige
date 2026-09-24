# 02. Why now

> AI governance engineering is forming now because the thing being governed changed shape, the market
> began hiring for engineering skills before the profession named itself, and the law began asking for
> engineered evidence, all between April 2025 and August 2026.

Disciplines do not appear on a schedule. They appear when an old way of working visibly stops holding
and enough people, in enough places, start building the replacement at once. That is happening to AI
governance now. The Thesis states five fundamental problems with legacy AI governance; this chapter
takes each in turn, attaches the evidence, and then lays out the market, regulatory and technical
signals that together explain the timing. The claim is narrow and falsifiable: not that governance
suddenly matters, but that the *engineering* of governance has become the constraint, and that the
data now says so. Dated statements are current as of 2026-09-24.

## The five problems, with the evidence

### 1. Governance written for systems that no longer exist

Legacy governance describes an AI system as it was on the day it was reviewed, while models retrain,
prompts change and agents gain tools by the day; the artefact is stale before it is signed. The
structural tell is *where the function sits*. In IAPP's 2025 AI Governance Profession Report, the AI
governance function is lodged mostly with privacy (22%), legal and compliance (22%) and IT (17%), and
with only 5% in security [1], far from the pipeline where the system changes. A function in the review
layer, not the build layer, cannot keep its description of production true, because nothing wires it to
the deploy.

### 2. Point-in-time review of a continuously changing thing

Annual assessments and committee sign-offs assume a system that holds still long enough to be judged.
Frontier models and autonomous agents do not. Gartner expects more than 40% of agentic AI projects to
be cancelled by the end of 2027, naming inadequate risk controls among the causes [2], and predicts
that by 2029 more than half of successful attacks on AI agents will exploit access-control weaknesses
and prompt injection [3]. Both are runtime failure modes (the system misbehaving between reviews),
and a once-a-year assessment is structurally blind to them. This is not the same work as model risk
management in the SR 11-7 tradition, which validates a model at points in time; the object here never
stops moving.

### 3. Governance as a gate at the end, not a property of the build

Governance still tends to arrive after the model is trained, as a checkpoint to clear before launch,
and nothing it produces is wired back into how the system is built. A policy that can only recommend
cannot stop a bad release; an eval wired into an `eval gate` that can fail the build can: the
difference between a control that describes risk and one that prevents it.

### 4. Framework theatre

Mapping to NIST AI RMF or ISO/IEC 42001 becomes the end state instead of the starting point, and a
green mapping matrix is mistaken for a working control. Yet as of 2026-09-24 no harmonised standard is
cited in the EU's Official Journal, so there is no Article 40 presumption of conformity for the AI
Act [4]. Even EN ISO/IEC 42001, the AI management-system standard, is not the Article 17 quality
management system the Act requires and confers no presumption of conformity on its own [5]. Coverage
is not assurance. A crosswalk proves you have read the framework; it does not prove the control it
points to actually fires.

### 5. No runtime data path

The registry does not know what is running. One vendor's comparison of the AI governance platform
category, published by a competitor in it, finds that most of the category "manages the program
(inventories, assessments, framework mappings, evidence workflows) without any runtime data path" [6].
Treat that as a claim to test, not a settled fact; where it holds, the three questions that define the
discipline (what AI is running, what is it allowed to do, what evidence proves it) go unanswered,
because nothing is connected to production. Meanwhile a security vendor's 2026 survey reports that
roughly one in eight AI breaches involved agentic systems [7]: exactly the layer the paper registry
cannot see. A control with no telemetry is a claim, not a control.

## The evidence

### The profession is understaffed, and it knows it

The clearest signal that the work has outgrown its current form is that almost nobody thinks they have
enough people to do it. In IAPP's 2025 report, of 671 respondents only 10 (1.5%) said they will not
need additional AI governance staff in the next 12 months [1]. Some 77% of organisations report
working on AI governance, rising to roughly nine in ten among those already using AI [1]. Demand is
near-universal; capacity is not. When a function is wanted everywhere, under-resourced, and lodged
outside the build layer, the gap is not closed by hiring more reviewers. It is closed by turning the
governance into a system that scales, which is an engineering problem.

### The market is hiring for the engineering

The labour market is already hiring for this shift, and it is doing so in the vocabulary of
engineering. An analysis of 1,997 United States AI-governance postings, updated in August 2026,
found the most common skill demanded was observability platforms, in 41% of postings, followed by
Python (28%) and NIST frameworks (27%) [8]. These are build-and-run skills, not review skills. At
the frontier, Anthropic advertised in 2026 an Engineering Manager for GRC tasked with building an
"AI-forward GRC engineering function", translating "policies into policy-as-code", and deploying
agentic workflows that use Claude "to serve as a virtual GRC analyst" [9]. The postings describe the
substance of AI governance engineering; they have not yet agreed on its name.

### Registry versus runtime

The tooling market tells the same story from the supply side, with one caveat worth stating first.
Gartner published its first Magic Quadrant for AI Governance Platforms in June 2026, as the vendors
named in it reported [10]. Gartner's own framing of the category asks for more than a register: its
February 2026 analysis says these platforms should enable "automated policy enforcement at runtime" and
continuous monitoring, and it expects AI governance spending to reach USD 492 million in 2026 and pass
USD 1 billion by 2030 [11]. What the category is asked to do and what it ships are different questions.
The vendor comparison cited above, which scores the thirteen vendors in the Magic Quadrant, finds most
of them manage the program "without any runtime data path" [6], and the account one Leader gives of
its own placement centres visibility into AI use cases and a roadmap of asset inventory, lineage and
use-case onboarding [10]. The question to ask any platform is therefore concrete: was this policy
decision made on a live call, and where is the record? The distance between the analyst's definition
and that answer is the space the discipline occupies.

### The standards gap

The framework-theatre problem has a hard deadline attached to it. As of 2026-09-24, zero harmonised
standards are cited in the Official Journal, so Article 40's presumption of conformity is not yet
available to anyone [4]. EN 18286, the quality-management standard aimed at Article 17, was published
in July 2026, the first JTC 21 standard written for the AI Act to reach publication, but it is not yet
cited in the Official Journal, so it carries no presumption of conformity [4][12]. The Article 9
risk-management, Article 12 logging and Article 15 cybersecurity standards were reported to be still
at the Enquiry stage in mid-2026, targeting the end of 2026 [13]. EN ISO/IEC 42001:2026, the European
adoption of the AI management-system standard, is not the Article 17 QMS and does not by itself
evidence conformity [5]. The practical consequence for a governance function: for the period covered
by this edition, there is no standard you can certify against to buy a legal presumption. You have to
build the controls and the evidence yourself and be ready to defend them on their merits.

### The regulatory wave: the Omnibus and GPAI enforcement

The law moved twice in the summer of 2026, in opposite directions, and both moves point at
engineering. First, the Digital Omnibus, Regulation (EU) 2026/1744, entered into force on 27 July
2026, six days before the 2 August high-risk deadline, and reset the clock: Annex III high-risk
obligations moved from 2 August 2026 to 2 December 2027, and Annex I embedded high-risk from 2 August
2027 to 2 August 2028 [14][19]. The extra time is real, but it is not relief from the engineering; it
is more runway to do it. Second, and unmoved by the Omnibus, GPAI enforcement went live on 2 August
2026: the AI Office can now demand documentation, evaluate models and require measures, and the
Commission can fine providers of general-purpose models up to 3% of global annual turnover or EUR 15
million, whichever is higher, under Article 101 [15]. On 29 August 2026 Commission Executive
Vice-President Henna Virkkunen announced that the AI Office had formally sent its first requests for
information to a number of GPAI providers, covering model security, independent external evaluations
and the monitoring of models once they are on the market [16]. What the enforceable obligations ask
for (model evaluations, adversarial testing, incident reporting, weight security) is an engineering
programme, not a policy binder.

The next flips are dated in the Omnibus itself [19]. On 2 December 2026 the new Article 5 bans on
AI-generated non-consensual intimate imagery and child sexual abuse material apply, and providers of
generative systems placed on the market before 2 August 2026 must meet the Article 50(2) marking duty.
Annex III high-risk obligations follow on 2 December 2027 and Annex I on 2 August 2028; high-risk
systems intended for public authorities that were already on the market must comply by 2 August 2030.
Chapter 08 maps each date to the artefact that answers it.

The same pull shows up outside the EU. California's SB 53, the Transparency in Frontier Artificial
Intelligence Act, signed on 29 September 2025 and in force since 1 January 2026, binds large frontier
developers (models trained with more than 10^26 operations; annual revenue above USD 500 million) to
publish a frontier AI framework and to report critical safety incidents to the state's Office of
Emergency Services within 15 days, with civil penalties of up to USD 1 million per violation recovered
by the Attorney General [17][18]. Its scope is narrow, but what it asks for, a published framework and
an incident pipeline that runs on a clock, is again an engineering deliverable.

### The agent shift

The last signal is the object of governance itself. Agents that browse, execute code, call APIs and
act under delegated authority are now the hardest and newest thing to govern, and the evidence that
legacy controls cannot see them is mounting. Gartner's forecast that by 2029 more than half of
successful attacks on AI agents will exploit access-control weaknesses and prompt injection [3] names
identity and injection (runtime concerns) as the dominant attack surface. The identity problem is
concrete: on 5 February 2026 NIST's National Cybersecurity Center of Excellence published a concept
paper on how identification, authentication and authorisation apply so that agents are "known,
trusted, and properly governed", asking how agent actions can be logged in a tamper-proof way and bound
back to a human for non-repudiation [20]. An agent run on a generic, shared service account fails that
test by construction: its actions cannot be traced or revoked precisely. OWASP's Top 10 for Agentic
Applications 2026 catalogues the failure modes that follow, from agent goal hijack (ASI01) through tool
misuse (ASI02) and agent identity and privilege abuse (ASI03) to rogue agents (ASI10) [21]. And the
2026 vendor survey cited above reports roughly one in eight AI breaches involving agentic systems [7].
The threat model has moved to the layer the paper registry cannot reach.

## What changes when governance is engineered

The five problems share one root: governance that describes rather than runs. Engineering the
governance changes the artefact, and changing the artefact changes what the function can promise. When
the registry is fed by the deployment pipeline, "what AI is running?" is a live query, not a quarterly
guess, and the staleness of problem 1 stops existing. When an `eval gate` fails the build on a dropped
injection-resistance threshold and a policy compiled to code blocks an out-of-region deployment, the
point-in-time review of problem 2 and the end-of-line gate of problem 3 give way to controls that fire
where the system changes. When guardrail decisions, eval results and policy verdicts stream into an
assurance store as machine-readable records, the framework theatre of problem 4 is answered by a
measure that is a named failure mode's falling rate, not a count of green cells. And when identity
precedes autonomy and telemetry becomes a live control signal, the runtime data path of problem 5 is
the spine rather than an afterthought, so the three questions become answerable on any given Tuesday,
from live systems.

None of this is a claim that engineered governance guarantees compliance; no artefact does, and no
standard yet confers a presumption. The claim is narrower and more useful: measured against realised
risk reduction and audit-ready evidence, a governance function that runs beats one that is written,
and the market, the regulator and the threat model have all, between April 2025 and August 2026,
started asking for the version that runs. That is why now.

> **In practice**
> Inside a large telco, the shift from "documented" to "engineered" was visible in a single quarter's
> incident drill. The paper version answered "which agents can reach the payments API?" with a
> spreadsheet that was a week stale and missing two services stood up since the last review. After the
> registry was wired to the deploy pipeline and every agent was issued a scoped identity, the same
> question was a query that returned owners, scopes and last-seen timestamps in seconds, and a
> misbehaving agent could be revoked without breaking the others. The evidence for the drill was not
> assembled afterwards; it was already in the assurance store.

**Maps to:** EU AI Act Art. 4/4a (literacy, bias-detection data), Art. 15 (robustness, cybersecurity),
Art. 17 (QMS), Art. 53/55 (GPAI), Art. 101 (GPAI fines) · ISO/IEC 42001 · NIST AI RMF (Govern, Map,
Measure, Manage) · OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI03, ASI10) · California SB 53 ·
five-layer stack, all layers. Mappings are illustrative, not a claim of conformity.

## Sources

[1] AI Governance Profession Report 2025 (with Credo AI; 671 respondents; only 1.5% will not need more staff; 77% working on AI governance; 5% of the function in Security; still the current edition on 2026-09-24). IAPP. 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[2] "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027". Gartner. 2025-06-25. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (verified: primary)
[3] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (by 2029, >50% of successful attacks on AI agents exploit access control and prompt injection). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[4] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[5] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[6] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[7] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[8] "The State of the AI Governance Job Market in 2026" (1,997 US postings; observability platforms 41%, Python 28%, NIST frameworks 27%; updated 2026-08-04). Axial Search. 2026-08-04. https://axialsearch.com/insights/ai-governance-jobs (verified: secondary)
[9] "Engineering Manager, GRC" (build an "AI-forward GRC engineering function"; "translate policies into policy-as-code"; Claude "as a virtual GRC analyst"; no longer accepting applications on 2026-09-24). Anthropic (via General Catalyst jobs). 2026. https://jobs.generalcatalyst.com/companies/anthropic/jobs/78167778-engineering-manager-grc (verified: primary)
[10] "IBM recognized as a Leader in the Gartner Magic Quadrant for AI Governance Platforms" (vendor announcement citing Gartner, Magic Quadrant for AI Governance Platforms, L. Kornutick et al., 17 June 2026, the first MQ for the category; visibility into AI use cases; roadmap: AI asset inventory and lineage, use-case onboarding). IBM. 2026-06-17. https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms (verified: secondary)
[11] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (platforms should enable "automated policy enforcement at runtime"; AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[12] "EN 18286 in the Spotlight: Supporting Compliance with the AI Act" (EN 18286:2026, Art. 17 QMS, published; the first standard in support of the AI Act). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[13] JTC 21 standards tracker (risk, logging and cybersecurity standards at Enquiry, end-2026 target; a vendor-maintained tracker, not a CEN-CENELEC publication). kla.digital. 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: reported)
[14] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[15] Commission enforcement powers over GPAI providers apply from 2 August 2026 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[16] Statement announcing the AI Office's first formal requests for information to GPAI providers (model security, independent external evaluations, post-market monitoring; recipients not named). Henna Virkkunen, Executive Vice-President of the European Commission (LinkedIn). 2026-08-29. https://www.linkedin.com/feed/update/urn:li:activity:7499411372032602112/ (verified: primary)
[17] SB 53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; approved by the Governor 29 Sep 2025; frontier model > 10^26 operations; large frontier developer > USD 500M revenue; frontier AI framework; critical safety incidents to the Office of Emergency Services within 15 days; civil penalty up to USD 1M per violation, Attorney General only). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (in force 1 Jan 2026). Future of Privacy Forum. 2026. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1: new Art. 5(1)(ba)–(bb) from 2 Dec 2026; new Art. 111(4) (Art. 50(2) marking for systems placed on the market before 2 Aug 2026, by 2 Dec 2026); Art. 111(2) (public-authority high-risk systems by 2 Aug 2030); Art. 113 (Annex III 2 Dec 2027; Annex I 2 Aug 2028). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[20] "Accelerating the Adoption of Software and Artificial Intelligence Agent Identity and Authorization" (concept paper; agents "known, trusted, and properly governed"; tamper-proof logging and non-repudiation). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[21] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack, ASI02 Tool Misuse, ASI03 Agent Identity & Privilege Abuse, … ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
