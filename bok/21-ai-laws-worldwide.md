---
seoTitle: "AI laws around the world: Korea, US, Japan, China, UK"
---
# 21. AI-specific laws around the world

> Outside the EU, AI-specific law ranges from Korea's horizontal Basic Act to US state statutes,
> public-sector directives and voluntary frameworks; this chapter dates each regime and names the
> artefact that evidences each duty.

## How to read this chapter

This chapter is a field guide to the AI-specific rules that sit beside the EU AI Act. It is written
for the engineer who has to make one set of controls answer several regimes at once, not for the
lawyer who has to opine on any one of them. Chapter 18 treats the
[EU AI Act](/bok/eu-ai-act#how-to-read-this-chapter) in depth; chapter 19 covers privacy and data
protection, including [the regimes beyond the EU](/bok/privacy-and-ai#beyond-the-eu-uk-us-brazil-and-china);
chapter 20 covers the [other law that already applies to AI](/bok/existing-law#how-to-read-this-chapter);
chapter 22 covers [principles, soft law and standards](/bok/principles-and-standards#the-instruments-at-a-glance),
including the international treaties. Chapter 08 remains the [reverse index](/bok/regulatory-map#other-jurisdictions) that
turns each obligation into an artefact and a layer.

Every entry below follows the same template: **status**, **dates**, **scope**, **key duties**,
**enforcement** and the **artefacts that evidence compliance**. Every status is stamped **as of
2026-09-24**. Where a rule was still moving on that date, or a fact could not be confirmed against
a primary source, the copy says so and carries a `(verify)` tag. Translations of Korean, Japanese,
Chinese, Italian, Spanish and Portuguese terms are ours unless a source gives an official one.

The status vocabulary has four values, the same four the site's jurisdiction dataset uses:

- **Binding, horizontal.** A statute in force that applies across sectors (Korea, Italy, Japan's
  promotion act).
- **Binding, targeted.** Binding rules limited to a use, a sector, a class of developer or the
  public sector (the US states, the US federal agencies, China's departmental rules, Canada's
  directive).
- **Voluntary.** Frameworks, guidance and principles with no penalty attached (Singapore, the
  United Kingdom's AI-specific approach, India, Australia).
- **Bill.** Not law yet (Brazil, Spain's national AI bill).

The engineering reading is the one chapter 06 calls
[regulatory translation](/bok/the-role#regulatory-translation): most of these regimes ask for the same small set of artefacts (an inventory, a classification
decision, a notice, a label, a risk assessment, an incident report, a record kept for a fixed
period). What differs is the trigger, the wording of the notice, the clock on the report, the
recipient and the enforcer. Build the control once in the stack and parameterise it per
jurisdiction; the [Framework Crosswalk](/patterns/framework-crosswalk) pattern is the
place where those parameters live. None of this is legal advice, and the mappings are illustrative,
not a claim of conformity.

## The landscape at a glance

| Jurisdiction | Main instrument | Status (as of 2026-09-24) | Kind | Who enforces |
|---|---|---|---|---|
| South Korea | AI Basic Act and Enforcement Decree | In force since 2026-01-22; fines subject to a guidance period of at least one year [1][2][3] | Binding, horizontal | Ministry of Science and ICT (MSIT) |
| United States (federal) | EO 14179, EO 14365, OMB M-25-21, M-25-22 and M-26-04 | In force for federal agencies; no federal statute for private actors [5][6][8][10] | Binding, targeted | OMB and agencies; DOJ task force against state laws |
| United States (states) | Colorado SB 26-189, Texas HB 149, California SB 53, SB 942, AB 2013, SB 243 and CPPA rules, New York RAISE and GBL Art. 47, Utah, Illinois, NYC LL 144 | Mixed: several in force, Colorado from 2027-01-01, RAISE from 2027-01-01 [15][18][19][26] | Binding, targeted | State attorneys general and agencies |
| Japan | AI Promotion Act (Act No. 53 of 2025) | Fully in force since 2025-09-01 [31][32] | Binding, horizontal (promotional; no penalties) | Cabinet AI Strategy Headquarters |
| China | CAC departmental rules, most recently the anthropomorphic interaction measures | In force; newest from 2026-07-15 [35] | Binding, targeted | Cyberspace Administration of China (CAC) |
| Brazil | PL 2338/2023 | Bill: passed the Senate 2024-12-10; awaiting report in the Chamber [36][37] | Bill | Not yet designated in law |
| Canada | Directive on Automated Decision-Making | In force for federal institutions; AIDA lapsed [38][39] | Binding, targeted | Treasury Board of Canada Secretariat |
| India | India AI Governance Guidelines | Published 2025-11-05; no AI act [40] | Voluntary | MeitY (guidance only) |
| United Kingdom | Principles applied by existing regulators; ATRS; AI Cyber Security Code of Practice | Non-statutory for AI as such [41][43][44] | Voluntary | Existing sector regulators (for example the ICO, FCA and MHRA) |
| Italy | Law 132/2025 | In force since 2025-10-10 [46] | Binding, horizontal | AgID and ACN, plus financial supervisors |
| Spain | Bill for the good use and governance of AI; AESIA; sandbox | Bill not adopted; sandbox and guides live [47][48][49] | Bill | AESIA and sector authorities (as proposed) |
| Singapore | Model AI Governance Frameworks (incl. agentic), AI Verify | Voluntary [50][51][53] | Voluntary | IMDA (guidance) |
| Australia | National AI Plan; Guidance for AI Adoption | Existing law applies; no AI act [54] | Voluntary | Existing regulators; AI Safety Institute advises |

The same regimes are drawn as [a tile map by jurisdiction](/figures/jurisdiction-tiles).

## South Korea: the AI Basic Act

South Korea has a horizontal AI statute in force that carries operator duties and fines. Its
formal name is the Basic Act on the Development of Artificial Intelligence and the Establishment
of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법), Act No. 20676 [1].
Most of the Act is industrial policy (a national AI strategy committee, training data, AI clusters,
industry support); the
duties that matter to the engineer sit in Chapter 4, Articles 31 to 36, and in the enforcement
provisions of Articles 40 and 43 [1].

### Status and dates

The Act was promulgated on 21 Jan 2025 and entered into force on 22 Jan 2026; the part of the
high-impact definition that covers digital medical devices started on 24 Jan 2026 [1]. An amending
Act, No. 21311 of 20 Jan 2026, revised Article 2 and other provisions before entry into force. A
second group of its changes took effect on 21 Jul 2026: a second sentence in Article 35(1) requires
the impact assessment to reflect the characteristics of AI-vulnerable groups, and Article 16(3) and
(4) tell public bodies to consider designated AI products first when they buy, and exempt the
officials who buy or use them from liability to their body for any resulting loss, save intent or
gross negligence [1].
The Enforcement Decree, Presidential Decree No. 36053, was promulgated on 21 Jan 2026 and took
effect on 22 Jan 2026 [2]. MSIT, the competent ministry, announced a guidance period of at least one
year during which fact-finding investigations and administrative fines are suspended except in very
exceptional cases, such as loss of life or human-rights violations [3]. The grace period is on the
fines, not on the duties: the obligations have applied since 22 Jan 2026. A decree amendment in
force from 21 Jul 2026, Presidential Decree No. 36506, defined the AI-vulnerable groups (among them
people with disabilities, people aged 65 or over, people eligible for job-seeker benefits and women
with career breaks), set up the ministry's confirmation of AI products for public procurement, and
amended Decree Article 28(1) so that the impact assessment's identification of affected people
reflects those groups [2][4]. The other operator duties described below are unchanged.

### Scope and duty holders

The Act reaches conduct abroad that affects the Korean market or Korean users (Article 4(1)), and
excludes AI developed and used solely for defence or national security, as specified by decree
(Article 4(2); Decree Article 2) [1][2]. The duty holder is the **AI business operator**, which the
Act splits into two roles: the operator that develops and provides AI, and the operator that uses
AI provided by another to offer its own product or service (Article 2(7)) [1]. The split is close to
the EU's provider and deployer, but not identical: both roles carry the transparency and
high-impact duties, and the decree lets a using operator rely on the developer's risk-management,
explanation and user-protection measures unless it materially changes the system's purpose or use
(Decree Article 27(3)) [2].

### High-impact AI and how it is confirmed

**High-impact AI** is an AI system that may significantly affect, or pose a risk to, human life,
physical safety or fundamental rights, and that is used in one of the areas the Act lists (Article
2(4)) [1]:

- energy supply; the production of drinking water; the provision of health care; the development
  and use of medical devices and digital medical devices; the safe management of nuclear materials
  and facilities;
- the analysis and use of biometric information for criminal investigation or arrest;
- judgements or evaluations that significantly affect individual rights and obligations, **such
  as hiring and loan screening**;
- the main operation of transport means, facilities and systems;
- decisions by state bodies, local governments and public institutions that affect citizens, such
  as eligibility checks and the collection of charges for public services;
- student evaluation in early childhood, primary and secondary education;
- any further area designated by presidential decree.

The operator must review in advance whether its system is high-impact, and may ask MSIT to confirm
(Article 33(1)) [1]. The decree turns the request into a file: an overview of the product or
service, an overview of the training data, material showing how the system is used and what it
produces, and any other supporting document. MSIT weighs the area, the impact, severity and
frequency of the risk, the operator's own prior review and, where consulted, an expert committee,
and replies within 30 days, extendable once by 30 days. An operator that disagrees can ask for
re-confirmation within 10 days, and MSIT must answer within a further 30 days after consulting the
expert committee (Decree Article 25) [2].

For the engineer this is an intake artefact: a **classification decision record** per system,
holding the Article 2(4) area, the risk rationale, the training-data overview and, when requested,
MSIT's reply. It is the same record chapter 06 builds at
[intake and classification](/bok/the-role#intake-and-classification), with one more field.

### Transparency: prior notice and labelling

Article 31 carries three duties [1]:

1. **Prior notice.** An operator that provides a product or service using high-impact or generative
   AI must tell users in advance that it runs on that AI.
2. **Output labelling.** An operator that provides generative AI, or a product or service using it,
   must indicate that outputs were generated by generative AI.
3. **Realistic synthetic content.** Where a system produces sound, images or video that are hard to
   distinguish from reality, the operator must notify or label them so users can clearly recognise
   them as AI-generated; for artistic or creative works, the notice may be given in a way that does
   not hinder exhibition or enjoyment.

The decree sets the mechanics (Decree Article 23) [2]. Prior notice can sit in the product itself, in
the contract, manual or terms of use, on the user's screen or device, or be posted at the place of
supply. Labels can be human-perceivable or machine-readable; where they are machine-readable only,
the operator must also tell the user at least once, by text or voice, that the output was generated
by generative AI. Notices and labels for realistic synthetic content must be easy to perceive and
must take account of the main users' age and physical or social conditions. Three exemptions apply: where AI use is obvious from the product name,
screen or output; where the system is used only for the operator's internal business; and cases
MSIT designates by public notice.

### Duties for high-impact AI

An operator that provides high-impact AI must implement six measures (Article 34(1)) [1]: a risk
management plan; an explanation plan covering, within technical feasibility, the final result, the
main criteria used to reach it and an overview of the training data; a user-protection plan; human
management and supervision; documents showing the measures taken; and any further measure the
national AI committee resolves. The decree adds three operational rules (Decree Article 27) [2]:

- the operator posts the main content of the risk management, explanation and user-protection plans,
  and the name and contact details of the person who oversees the system, at its offices or on its
  website, with trade secrets excepted;
- the operator keeps the documentary evidence of the measures for **five years**, electronically or
  otherwise;
- a using operator may ask the developing operator for the information it needs, and the developer
  must endeavour to cooperate; measures taken under other laws count where the decree's annex says
  so.

**Impact assessment** is a best-effort duty: operators "shall endeavour" to assess the effect on
fundamental rights before providing high-impact AI, and public bodies must give priority to products
that were assessed (Article 35) [1]. The decree fixes the content: the individuals and groups likely
to be affected, reflecting the characteristics of AI-vulnerable groups (Act Articles 3(5) and 35(1),
in force from 21 Jul 2026); the fundamental rights at stake; the social and economic effects; the patterns of
use; the quantitative or qualitative indicators and method used; the prevention, mitigation and
recovery measures; and an improvement plan where needed. The operator may run the assessment
itself or through a third party (Decree Article 28) [2].

### Safety duties for high-compute systems

Article 32 applies to systems whose cumulative training compute exceeds a threshold set by decree
[1]. The decree requires all three of: cumulative training compute of at least **10^26
floating-point operations**; construction and operation with the most advanced AI technology of the
day; and a risk profile that may broadly and seriously affect life, safety and fundamental rights
(Decree Article 24) [2]. Operators of such systems must identify, assess and mitigate risks across
the lifecycle, build a risk-management system that monitors and responds to AI safety incidents,
and submit the results to MSIT [1]. The compute figure is the same 10^26 that the US frontier
laws use (see [frontier-developer laws](/bok/regulatory-map#frontier-developer-laws) in
chapter 08), but the conjunctive test makes the Korean class narrower on paper.

### Domestic representative

An operator with no address or business establishment in Korea must designate a **domestic
representative** in writing and report it to MSIT if it meets any decree threshold (Article 36;
Decree Article 29) [1][2]: prior-year total revenue of KRW 1 trillion or more; prior-year revenue
from AI services of KRW 10 billion or more; an average of 1 million or more daily users in Korea
over the three months before the end of the prior year; or a past fine for ignoring a corrective
order. The representative submits the Article 32 safety results, files high-impact confirmation
requests and supports the Article 34 measures, including checking that the documents are current
and accurate; its breaches are attributed to the operator [1].

### Enforcement and the grace period

MSIT may demand documents and investigate, including on-site, when it finds or is told of a
suspected breach of the labelling, safety or high-impact duties, and may order the breach stopped or
corrected (Article 40) [1]. Administrative fines of up to **KRW 30 million** apply to three failures
only: not giving the Article 31(1) prior notice, not designating a domestic representative, and not
obeying a stop or corrective order (Article 43) [1]. A labelling failure is therefore not fined
directly; it becomes finable when the operator ignores the corrective order that follows. During the
guidance period described above, fact-finding and fines are held back except in exceptional cases
[3].

| Duty (article) | Who is bound | Engineering artefact that evidences it | Layer |
|---|---|---|---|
| High-impact self-review and optional confirmation (Art. 33; Decree Art. 25) | All AI business operators | Classification decision record per system: Art. 2(4) area, risk rationale, training-data overview, MSIT reply | 1 · 2 |
| Prior notice (Art. 31(1); Decree Art. 23(1)) | Operators of products using high-impact or generative AI | Notice component in UI, terms and contracts; notice inventory per user surface | 2 · 4 |
| Output labels and realistic-content notice (Art. 31(2)–(3); Decree Art. 23(2)–(3)) | Operators of generative AI | Provenance pipeline: visible label or machine-readable mark, plus at least one text or voice notice | 3 · 4 |
| Safety duties above 10^26 FLOP (Art. 32; Decree Art. 24) | Operators of qualifying systems | Lifecycle risk register; safety-incident monitoring; results report to MSIT | 3 · 4 · 5 |
| High-impact measures (Art. 34; Decree Art. 27) | Operators of high-impact AI | Risk management, explanation and user-protection plans; named human overseer; published summary; five-year evidence store | 1 · 2 · 4 · 5 |
| Impact assessment, best effort (Art. 35; Decree Art. 28) | Operators of high-impact AI | Fundamental-rights impact assessment carrying the seven decree elements | 1 · 5 |
| Domestic representative (Art. 36; Decree Art. 29) | Foreign operators above a threshold | Designation filed with MSIT; evidence-access runbook for the representative | 5 |

> **In practice (illustrative)**
> A foreign provider of a hiring-assessment API crossed the 1-million-daily-user threshold through
> Korean customers of its customers. The governance team did three things. It added a
> `jurisdiction.kr` block to each system's registry entry holding the Article 2(4) area ("hiring"),
> the self-review verdict and a link to the decree-shaped impact assessment. It extended the
> evidence store's retention policy to five years for every artefact tagged `kr-art34`. And it gave
> the domestic representative read access to a filtered evidence view, so the representative could
> answer MSIT from current documents instead of emailing the product team. Nothing new was built in
> the model; the work was in the registry, the retention policy and the access path.

## United States: the federal layer

The United States has no federal AI statute that binds private actors. The federal layer is a set of
executive orders and Office of Management and Budget (OMB) memoranda that bind federal agencies,
and, through procurement, the vendors that sell to them. Since December 2025 it has also included a
deliberate push against state AI laws.

### Executive orders

- **EO 14179** (23 Jan 2025), *Removing Barriers to American Leadership in Artificial
  Intelligence*, ordered a review of every action taken under the revoked EO 14110, so that those
  inconsistent with the new policy could be suspended, revised or rescinded, and ordered an AI
  action plan within 180 days [5].
- **EO 14319** (23 Jul 2025), *Preventing Woke AI in the Federal Government*, set two "Unbiased AI
  Principles" (truth-seeking and ideological neutrality) for large language models the government
  buys [8].
- **EO 14365** (11 Dec 2025), *Ensuring a National Policy Framework for Artificial Intelligence*,
  targets state AI laws; it is treated in its own subsection below [10].

### OMB memoranda for federal agencies

**M-25-21** (3 Apr 2025), *Accelerating Federal Use of AI through Innovation, Governance, and
Public Trust*, rescinded and replaced M-24-10 [6]. It defines **high-impact AI** as AI whose output
serves as a principal basis for decisions or actions with a legal, material, binding or significant
effect on civil rights, civil liberties or privacy, on access to education, housing, insurance,
credit, employment and other programmes, on access to critical government services, or on human
health and safety, among others [6]. Some use-case categories are presumed high-impact; an agency
official who concludes otherwise must document the decision to the Chief AI Officer. Agencies had
365 days from issuance to document the minimum practices for high-impact AI: pre-deployment testing;
an AI impact assessment; ongoing monitoring for performance and adverse impacts; adequate training
of operators; human oversight, intervention and accountability, with a fail-safe where practicable;
consistent remedies or appeals for affected individuals; and consultation of end users and the
public [6]. **M-25-22**, issued the same day, covers acquisition [7].

**M-26-04** (11 Dec 2025) implements EO 14319 [8]. Agencies had until 11 Mar 2026 to update their
procurement policies, and every solicitation for a large language model must request, as a minimum,
the vendor's acceptable use policy; model, system or data cards; end-user resources; and a mechanism
for end-user feedback on outputs that breach the principles [8]. The requirements also reach models
embedded in other software the agency buys [8].

### America's AI Action Plan

The plan, published in July 2025, has three pillars: accelerate innovation, build American AI
infrastructure, and lead in international AI diplomacy and security [9]. Two of its actions matter
here. It asks agencies with discretionary AI funding to consider a state's AI regulatory climate
when making funding decisions, and the Federal Communications Commission to evaluate whether state AI
rules interfere with its mandate; and it directs NIST to revise the AI Risk Management Framework to
remove references to misinformation, diversity, equity and inclusion, and climate change [9].

### The federal push against state AI laws

EO 14365 sets the machinery [10]. The Attorney General was to establish an **AI Litigation Task
Force** within 30 days to challenge state AI laws that conflict with federal policy; the Secretary of
Commerce was to publish, within 90 days, an evaluation of "onerous" state AI laws, including those
that require models to alter truthful outputs; states with such laws become ineligible for some
broadband (BEAD) funds and may see other discretionary grants conditioned; the FCC is to consider a
federal reporting and disclosure standard that would preempt conflicting state rules; the Federal
Trade Commission (FTC) is to issue a policy statement on how its deception authority applies to
state laws that require altered outputs; and the President's advisers are to prepare legislation for
a uniform federal framework. The order's legislative recommendation must not propose preempting
state laws on child safety, on AI compute and data-centre infrastructure other than permitting, or on
state procurement and use of AI [10].

What happened next, as of 2026-09-24:

- The Attorney General announced the task force on 9 Jan 2026, as reported by practitioners [12].
- The White House published non-binding legislative recommendations on 20 Mar 2026, asking Congress
  to preempt state AI laws that impose undue burdens while not preempting generally applicable state
  laws that protect children, prevent fraud and protect consumers [11].
- The FTC sought comment on 1 Jul 2026 on a proposed policy statement: that deliberately distorting
  an AI system's outputs for undisclosed ideological purposes may be deceptive under Section 5 of the
  FTC Act. The statement discusses Colorado's AI Act and suggests it may be impliedly preempted where
  it coerces changes to outputs; comments closed on 31 Jul 2026 [13].
- In the House, a bipartisan discussion draft released in June 2026 would allow federal preemption of
  state AI regulation for three years; it was a draft for stakeholder feedback, not a filed bill [14].
  Whether it has since been introduced should be checked (verify).
- The Commerce evaluation was due within 90 days of the order [10]; whether it has been published,
  and which laws it names, should be checked (verify).
- In the courts, xAI sued on 9 Apr 2026 to block Colorado's original AI Act, SB 24-205, and the US
  Department of Justice intervened with a companion complaint on 24 Apr 2026, arguing that the Act
  violates the Equal Protection Clause [16][17]. On 27 Apr 2026 a federal magistrate judge entered a
  stipulated order under which the Colorado Attorney General would not enforce SB 24-205 until 14
  days after a ruling on xAI's motion for a preliminary injunction; SB 26-189 then replaced the Act
  [16].

For the engineer the practical rule is simple: a state duty binds until it is repealed, replaced or
enjoined. Keep each state's controls as a separate, versioned policy module keyed to the
jurisdiction, so that a court order or a repeal is a configuration change and not a rebuild.

| Federal instrument | Applies to | What it asks for | Artefact the agency or vendor keeps | Layer |
|---|---|---|---|---|
| OMB M-25-21 [6] | Federal agencies (Intelligence Community elements encouraged, not required) | High-impact determination; seven minimum practices; Chief AI Officer; use-case inventory | Use-case inventory entry; pre-deployment test report; AI impact assessment; monitoring plan; appeal path | 2 · 3 · 4 · 5 |
| OMB M-26-04 [8] | Agencies buying large language models, and their vendors | Unbiased AI Principles as contract terms; minimum transparency package | Acceptable use policy; model, system or data cards; end-user resources; feedback channel | 2 · 5 |
| EO 14365 and the FTC proposal [10][13] | States; developers subject to state laws | No duty yet on private actors; litigation and preemption risk | Jurisdiction-keyed policy modules; record of which output controls each state law requires | 1 |

## United States: state laws that bind private organisations

Chapter 08 maps the two frontier laws, Texas and Colorado at the level of the
[US federal and state laws](/bok/regulatory-map#us-federal-and-state-laws) table. This section
adds the laws that reach ordinary developers and deployers, and gives each one its scope, dates,
duties and enforcement.

| Law | Status (as of 2026-09-24) | Scope | Key duties | Enforcement | Evidence artefact | Layer |
|---|---|---|---|---|---|---|
| Colorado SB 26-189 (Automated Decision-Making Technology) | Signed 2026-05-14; effective 2027-01-01; repeals and re-enacts SB 24-205 [15][16] | Developers and deployers of ADMT in consequential decisions (employment, housing, lending, insurance, benefits) | Developer documentation to deployers (intended uses, training-data categories, known limits, instructions) and notice of material updates; deployer notice of ADMT use; plain-language explanation within 30 days of an adverse outcome; consumer correction, human review and reconsideration; records kept three years or more | Attorney General under the Consumer Protection Act; 60-day cure notice before 2030; no new private right of action [15] | ADMT inventory; developer documentation pack; notice and adverse-outcome explanation templates; human-review queue; three-year record store | 2 · 4 · 5 |
| Texas TRAIGA (HB 149) | In force 2026-01-01 [18] | Persons doing business in Texas; developers, deployers, government | Intent-based prohibitions (behaviour manipulation, government social scoring, unlawful discrimination, certain sexual content); disclosure by government agencies and in health care services; 36-month sandbox; local AI rules preempted | Attorney General only; no private right of action; 60-day cure; USD 10,000–12,000 per curable, 80,000–200,000 per uncurable violation, 2,000–40,000 per day continuing [18] | Prohibited-use policy-as-code; disclosure controls; a model card that answers the Attorney General's eight investigative questions | 1 · 2 · 4 |
| California SB 53 (Transparency in Frontier AI Act) | Chaptered 2025-09-29; in force 2026-01-01 [19][20] | Frontier developers (models trained above 10^26 operations); large frontier developers (revenue above USD 500M) | Published frontier AI framework; transparency report before deploying a new or substantially modified frontier model; critical safety incidents reported within 15 days, 24 hours if death or serious injury is imminent; whistleblower channel | Attorney General; civil penalty up to USD 1M per violation [19] | Published framework; pre-deployment transparency report; incident pipeline with the two clocks; anonymous reporting channel | 3 · 4 · 5 |
| California AI Transparency Act (SB 942 as amended by AB 853) | Operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01 [21] | Covered providers of public generative AI systems; large online platforms; hosting platforms; capture-device makers | Free detection tool; optional visible (manifest) disclosure; embedded (latent) disclosure in image, video and audio; platforms detect and surface provenance and must not strip it | Civil penalty of USD 5,000 per violation, each day a separate violation, in actions by the Attorney General, a city attorney or a county counsel (Bus. & Prof. Code s. 22757.4) [21] | Provenance pipeline writing latent metadata; public detection endpoint; platform-side provenance display | 3 · 4 |
| California AB 2013 (training-data transparency) | Documentation due on or before 2026-01-01 and on each new release or substantial modification [22] | Developers of generative AI systems released since 2022-01-01 for use in California | Public summary of training datasets: sources, purpose, size, data types, IP status, licensing, personal information, cleaning, collection period, first use, synthetic data | Exemptions: security and integrity, aircraft operation, federal national-security uses [22] | Data card per dataset, published at release; training-data rights ledger | 2 |
| California CPPA regulations (ADMT, risk assessments, cybersecurity audits) | Approved 2025-09-23; effective 2026-01-01; ADMT duties from 2027-01-01; risk-assessment attestations due 2028-04-01 [23] | Businesses subject to the CCPA using ADMT for significant decisions | ADMT duties for significant decisions (detail in chapter 19); risk assessments; cybersecurity audits | California Privacy Protection Agency [23] | ADMT register; pre-use notice; opt-out routing; risk-assessment record | 2 · 4 · 5 |
| California SB 243 (companion chatbots) | Chaptered 2025-10-13; annual reports from 2027-07-01 [24] | Operators of companion chatbots | Disclose AI where a reasonable person could be misled; for known minors, disclose AI and remind at least every three hours, and prevent sexually explicit content; suicide and self-harm protocol with crisis referral | Private right of action: at least USD 1,000 per violation [24] | Companion-mode policy; reminder timer; crisis-referral classifier and log; annual report | 1 · 4 · 5 |
| New York RAISE Act | Signed 2025-12-19; effective 2027-01-01 after the 2026 chapter amendment [25][26] | Frontier developers (models trained above 10^26 operations) for incident reports; large frontier developers (revenue above USD 500M) for the published protocol, after the chapter amendment [26] | Published safety protocol; safety incidents disclosed within 72 hours; DFS oversight office | Attorney General [25] | Published protocol; 72-hour incident pipeline | 4 · 5 |
| New York GBL Article 47 (AI companion models) | In force [27] (verify commencement date) | Operators of AI companions | Protocol to detect suicidal ideation and self-harm and refer to crisis services; notice that the user is not talking to a human at the start and at least every three hours | Attorney General; civil penalties up to USD 15,000 per day [27] | Crisis-referral classifier and log; notice timer | 4 · 5 |
| Utah AI Policy Act (SB 149 as amended by SB 226 and SB 332) | Amendments effective 2025-05-07; Act repeals on 2027-07-01 [28] | Suppliers using generative AI in consumer transactions; regulated occupations | Disclose AI when a person clearly asks; prominent disclosure in "high-risk" interactions (sensitive data or personalised advice) by regulated professionals, verbally at the start or in writing before; safe harbour for clear disclosure at the outset | Division of Consumer Protection [28] | Disclosure component with interaction-risk flag; conversation log showing the disclosure | 4 |
| Illinois HB 3773 (Human Rights Act amendment) | Effective 2026-01-01; implementing rules in draft, as reported [29] | Employers using AI in recruitment, hiring, promotion, discipline and other terms of employment | No use of AI with a discriminatory effect on protected classes; no ZIP codes as a proxy; notice to employees and applicants | Illinois Department of Human Rights and the Human Rights Act's remedies [29] | AI-in-HR inventory; adverse-impact eval per protected class; notice record | 2 · 3 · 4 |
| NYC Local Law 144 (automated employment decision tools) | Enforced since 2023-07-05 [30] | Employers and employment agencies using AEDTs for New York City roles | Bias audit within one year before use; public summary of results; notices to candidates and employees | Department of Consumer and Worker Protection; complaints channel [30] | Independent bias-audit report; published summary; notice record | 3 · 5 |

### Consequential decisions: one hiring tool, four regimes

Colorado, the California ADMT rules, Illinois and New York City all reach automated hiring, but each
asks for a different artefact: Colorado an explanation within 30 days of an adverse outcome and a
human-review path [15]; California, from 2027, the CPPA's ADMT duties [23]; Illinois a notice and
an absence of discriminatory effect [29]; New York City an independent bias audit, published, less
than a year old [30]. Korea lists hiring as a high-impact area too [1]. A single eval suite that
measures selection rates per protected class, run in CI and on production samples, produces the
evidence every one of them needs; the notices and review paths differ only in wording and timing.

> **Example (illustrative)**
> A vendor's CV-ranking model is deployed by employers in Denver, Chicago, New York City and Seoul.
> The [Eval Gate in CI](/patterns/eval-gate-in-ci) runs an adverse-impact suite on every
> release and blocks one that moves any group's selection-rate ratio below the configured floor.
> The same results feed the NYC bias-audit auditor's data request, the Illinois discriminatory-effect
> file and the Korean impact assessment's "indicators and method" section. The registry entry
> carries four notice templates and one human-review queue; the [adverse-outcome explanation](/patterns/explanation-artefact) is
> generated from the model's top reason codes and logged with the decision, so Colorado's 30-day
> clock is met by the same pipeline that answers a US credit adverse-action notice.

### Provenance, training data and frontier developers

California splits content transparency across two statutes: AB 2013 makes developers publish a
summary of their training data [22], and the AI Transparency Act makes large providers embed
provenance in the media their systems produce and give the public a way to check it [21]. Both are
evidence problems before they are legal ones: a data card per dataset and a provenance pipeline that
writes metadata at generation time are the artefacts, and both belong in layers 2 and 3 of the
[stack](/bok/the-stack#layer-02-inventory--transparency). For frontier developers, SB 53 and RAISE
converge on a published safety framework and a short incident clock [19][25]; chapter 08 carries the
[frontier-developer rows](/bok/regulatory-map#frontier-developer-laws).

### Chatbots and companions

Utah, California and New York regulate the conversational interface itself, not the model behind it
[24][27][28]. Utah asks for disclosure on a clear request and prominent disclosure in regulated,
high-risk interactions [28]; California and New York add periodic reminders and a crisis-referral
protocol for companion products, with California's reminders tied to known minors [24][27]. China's
anthropomorphic interaction measures, below, cover the same ground with a two-hour reminder [35].
These are [Runtime Guardrail](/patterns/runtime-guardrail) problems: a session timer, a
classifier that detects self-harm signals and routes to a referral, and a log that proves both fired.

## Japan: the AI Promotion Act

Japan's Act on the Promotion of Research, Development and Utilisation of AI-Related Technologies
(人工知能関連技術の研究開発及び活用の推進に関する法律), Act No. 53 of 2025, was promulgated on 4 Jun 2025
and fully in force from 1 Sep 2025, when the provisions setting up the AI Strategy Headquarters took
effect [31][32]. It is a framework and promotion law with no penalties [31]. Its duty on business is
one sentence: operators that use AI-related technology in their business must endeavour to use it
actively and must **cooperate** with the measures of national and local government (Article 7) [31].
The state issues guidelines consistent with international norms to ensure appropriate research,
development and use (Article 13), and collects information on, and analyses, cases where improper
purposes or inappropriate methods infringed people's rights, then gives guidance, advice and
information to operators (Article 16) [31].

The instruments that give the Act content are soft. The AI Strategy Headquarters adopted guidelines
on ensuring the appropriateness of AI research, development and use on 19 Dec 2025 [34]. The
Cabinet adopted the first AI Basic Plan on 23 Dec 2025 and a revised plan on 14 Jul 2026 [33]. The
engineering reading: no filing and no fine, but a government that investigates rights-infringing
cases and names operators in guidance. An operator that keeps an incident record and a model card
current can answer an Article 16 inquiry without a scramble.

## China: what chapter 08 does not already cover

Chapter 08 maps China's [binding and voluntary tiers](/bok/regulatory-map#china), from the
algorithmic-recommendation provisions to the TC260 framework 3.0. One rule it does not map is the
**Interim Measures for the Administration of Anthropomorphic Interaction Services**
(人工智能拟人化互动服务管理暂行办法), issued by the CAC with four other bodies and in force from 15 Jul
2026 [35]. They apply to AI services offered to the public in China that simulate human personality,
thinking and communication style to provide **sustained emotional interaction**, such as companionship
or emotional support; customer service, question answering, work assistants, education and research
tools without sustained emotional interaction are out of scope (Article 2) [35]. The duties:

- no virtual family members or virtual intimate partners for minors; guardian consent for users under
  14; a minors' mode with reality reminders and time limits; reasonable steps to identify minors
  (Article 14) [35];
- labelling of AI-generated content under the national labelling rules and a clear signal that the
  user is interacting with AI; a pop-up reminder when over-reliance or addiction appears; a reminder
  after every **two hours** of continuous use (Article 18) [35];
- an easy exit: when the user asks to leave, the service must stop and must not keep the user engaged
  (Article 19) [35];
- a **security assessment**, reported to the provincial cyberspace office, when the service launches
  or adds such features, when new technology changes it significantly, when it reaches 1 million
  registered or 100,000 monthly active users, or when national security or public-interest risks
  arise (Article 22) [35];
- algorithm filing under the recommendation provisions, with annual checks by the CAC (Article 26)
  [35].

The artefacts are the same ones the US companion laws call for, plus a threshold monitor on user
counts that triggers the assessment, and the filing record that chapter 08 already maps.

## Brazil: PL 2338/2023 (bill)

Brazil's AI bill, PL 2338/2023, was introduced in the Senate on 3 May 2023, approved by the Senate
plenary on 10 Dec 2024 and sent to the Chamber of Deputies, which received it on 17 Mar 2025 [36][37].
The Chamber created a special committee on 4 Apr 2025 because the bill was referred to more than four
standing committees; as of the last procedural entry, on 2 Sep 2026, the bill was under a priority
regime and awaiting the rapporteur's report, with a growing number of related bills attached [37].
It is a bill, not a law. The Senate text, whose stated object is the development, promotion and
ethical and responsible use of AI centred on the human person [37], follows a risk-based model with
a list of high-risk uses and prohibited uses (verify the current text before relying on any
article). The engineering advice for a bill is the same everywhere: map it in the crosswalk as
`status: bill`, attach no controls to it yet, and watch the committee.

## Canada: after AIDA, the Directive on Automated Decision-Making

The Artificial Intelligence and Data Act (AIDA), part of Bill C-27, died on the Order Paper when
the first session of the 44th Parliament ended on 6 Jan 2025 [38]. Canada therefore has no federal
AI statute for the private sector. What binds is the Treasury Board **Directive on Automated
Decision-Making**, which applies to federal institutions' automated decision systems [39]. It took
effect on 1 Apr 2019; the current version (modified 24 Jun 2025) gave systems in place before that
date until 24 Jun 2026 to meet the new requirements, and the directive is reviewed every two years
[39]. Its core:

- an **Algorithmic Impact Assessment** (AIA) completed and published on the Open Government Portal
  before production, and updated when functionality or scope changes;
- requirements scaled by the AIA's **impact level** (I to IV), set out in Appendix C;
- notice before decisions through every service channel, in plain language, and a meaningful
  explanation after decisions;
- quality assurance, including peer review by qualified experts with the review or a summary
  published before production, and a Gender-based Analysis Plus;
- recourse options to challenge the decision, and published reporting on effectiveness and fairness
  [39].

The AIA is the most mature public example of an impact assessment that is also a published,
versioned artefact; it is a direct model for [FRIA-as-Code](/patterns/fria-as-code).

## India: governance guidelines, no AI act

India has no AI-specific statute. MeitY published the **India AI Governance Guidelines** on
5 Nov 2025, under the IndiaAI Mission [40]. They comprise seven guiding principles ("sutras"),
recommendations across six pillars, an action plan on short, medium and long-term timelines, and
practical guidance for industry, developers and regulators [40]. The Secretary of MeitY described
the policy as using existing legislation wherever possible [40]. Obligations therefore come from
existing law, notably information-technology and data-protection law, which chapter 19 covers; any
AI-specific amendment to the IT Rules, for example on labelling synthetic content, should be checked
for its current status before it is mapped (verify).

## United Kingdom: principles, regulators and public-sector records

The UK has no horizontal AI statute. Its approach, confirmed in the government's February 2024
response to the AI regulation white paper, is five cross-sector principles (safety, security and
robustness; appropriate transparency and explainability; fairness; accountability and governance;
contestability and redress) applied by existing regulators within their remits [41]. Whether a
frontier-AI bill has been introduced since should be checked before relying on this paragraph
(verify). The rest of the UK picture is concrete:

- the **AI Security Institute** (renamed from the AI Safety Institute in February 2025) evaluates
  frontier models [42];
- the **Algorithmic Transparency Recording Standard** (ATRS) is mandatory for all government
  departments and for arm's-length bodies that deliver public or frontline services or interact
  directly with the public; records are published in a central repository [43];
- the **AI Cyber Security Code of Practice** (31 Jan 2025) sets baseline security principles for AI
  systems, with an implementation guide [44] (chapter 08 separately maps the ETSI baseline for
  securing AI, EN 304 223);
- for significant, solely automated decisions, the Data (Use and Access) Act 2025 replaced UK GDPR
  Article 22 with Articles 22A to 22D, in force since 5 Feb 2026 (see
  [chapter 08](/bok/regulatory-map#united-kingdom)) [45].

An ATRS record is an inventory entry written for the public. A registry that already holds purpose,
owner, data, human oversight and risk fields can generate most of it.

## Italy: Law 132/2025

Italy has a national AI law of general scope that sits beside the EU AI Act. Law No. 132 of
23 Sep 2025, *Provisions and delegations to the Government on artificial intelligence*, was published
in the Gazzetta Ufficiale on 25 Sep 2025 and entered into force on 10 Oct 2025 [46]. It must be read
and applied consistently with the EU AI Act (Article 1(2)) [46]. The provisions an engineer will
meet:

- **Minors.** Access to AI technologies by children under 14, and the related processing of personal
  data, requires the consent of the holder of parental responsibility (Article 4(4)) [46].
- **Work.** The employer must inform workers when AI is used, in the cases and manner of the existing
  transparency rules for automated systems (Article 11(2)) [46].
- **Professions.** In the intellectual professions AI may be used only for instrumental and support
  activities, and the professional must tell the client which AI systems are used (Article 13) [46].
- **Authorities.** AgID (the digital agency) handles innovation and the notification and monitoring
  of conformity-assessment bodies; ACN (the cybersecurity agency) supervises AI systems, including
  inspections and sanctions; the Bank of Italy, CONSOB and IVASS remain market-surveillance
  authorities for their sectors (Article 20) [46].
- **Criminal law.** A new offence of unlawful dissemination of AI-generated or altered images, video
  or voices that cause unjust harm, punishable by one to five years' imprisonment (Article 26,
  inserting Article 612-quater into the Criminal Code) [46].

The law also delegates further rule-making to the Government; the consolidated text on Normattiva
showed a last update of 26 Jun 2026 [46].

## Spain: AESIA, the sandbox and a bill

Spain has an operational AI supervisor, a live sandbox and a national AI bill that is not law.

- **The bill.** The Council of Ministers approved, at first reading on 11 Mar 2025, the draft bill
  for the good use and governance of AI (Anteproyecto de Ley para el buen uso y la gobernanza de la
  Inteligencia Artificial), with urgent processing; it had to return to the Council of Ministers as a
  bill and then go to the Cortes Generales [47]. As proposed, it sets the sanctions regime for the EU
  AI Act within the Act's ranges, treats a failure to label deepfakes as a serious infringement,
  adds a power to withdraw a system provisionally from the Spanish market after a serious incident,
  and allocates supervision: the data-protection agency for prohibited biometric and
  border-management systems and for high-risk migration and asylum systems of the State security
  forces, the judiciary's council for justice, the central electoral board for democratic processes,
  the Bank of Spain, the insurance directorate and CNMV for their sectors, and AESIA for the rest
  [47]. It had
  not been adopted as of 2026-09-24; check its parliamentary stage before citing it (verify).
- **The sandbox.** Royal Decree 817/2023 set up a controlled testing environment for compliance with
  the (then proposed) AI Act [48]; the first call sought up to 12 high-risk systems for a one-year
  test [47].
- **The guides.** AESIA publishes 16 guides produced in the sandbox pilot: two introductory guides,
  13 technical guides (conformity assessment, quality management, risk management, human oversight,
  data governance, transparency, accuracy, robustness, cybersecurity, logging, post-market
  monitoring, incident management, technical documentation) and a checklist manual. They are
  non-binding and predate the AI Omnibus, Regulation (EU) 2026/1744, in force since 27 Jul 2026
  [68]. As of 2026-09-24 AESIA's page still says they will be updated once the Omnibus is approved,
  so check each guide against the amended Act [49].

The guides are the most practical public template set for the EU high-risk requirements; chapter 18
maps the articles they implement.

## Singapore: model frameworks and AI Verify

Singapore regulates AI through voluntary frameworks and a testing toolkit, maintained by IMDA and
the AI Verify Foundation.

- The **Model AI Governance Framework for Generative AI** (May 2024) sets governance dimensions
  including testing, transparency, incident reporting, security and content provenance [52].
- The **Model AI Governance Framework for Agentic AI** was launched at Davos on 22 Jan 2026 [50]; the
  current version 1.5 was published on 20 May 2026 and updated on 5 Jun 2026 [51]. It has four
  dimensions: assess and bound the risks upfront (suitable use cases; limits and permissions by
  design); make humans meaningfully accountable (allocation of responsibility; meaningful oversight);
  implement technical controls and processes (in design, before deployment, and continuously in
  deployment); and enable end-user responsibility [51].
- **AI Verify** is a testing framework that assesses an AI system against 11 internationally
  recognised governance principles, with a generative-AI extension and technical testing tools [53].

The agentic framework's first two dimensions are what this book calls the
[Agent Registry](/patterns/agent-registry) and
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
its third is the [Eval Gate in CI](/patterns/eval-gate-in-ci) plus runtime monitoring.
Chapter 23 on [governing agents](/bok/governing-agents#frameworks-written-for-agents) goes further.

## Australia: existing law and voluntary guidance

Australia has no AI act. The government's **National AI Plan**, published in December 2025, states
that Australia has strong existing, largely technology-neutral legal frameworks that can apply to AI,
and that the government will monitor and respond as challenges arise [54]. It establishes an **AI
Safety Institute** to monitor, test and share information on emerging capabilities and risks and to
advise existing regulators, and builds adoption tools on the six essential practices of the
**Guidance for AI Adoption** [54]. For the engineer, obligations come from privacy, consumer,
discrimination and sector law; the six practices are a reasonable checklist for a governance
programme, not a compliance duty.

## Comparing the regimes

The comparison below uses the questions a governance function asks of any AI-specific law. It covers
regimes whose text this edition verified; the EU AI Act is the reference point and lives in
chapter 18, which also maps [the same roles across regimes](/bok/eu-ai-act#the-same-roles-across-regimes)
that the Roles column compresses. One international treaty sits beside these regimes: the
[Council of Europe Framework Convention](/bok/principles-and-standards#council-of-europe-framework-convention-cets-no-225)
is treated in chapter 22, with its ratification status.

| Regime | Classification trigger | Core duties | Notice and human oversight | Frontier or general-purpose models | Enforcement | Roles |
|---|---|---|---|---|---|---|
| Korea AI Basic Act [1][2] | Listed high-impact areas plus significant risk; generative AI | Risk management, explanation, user protection, documents kept five years; impact assessment (best effort) | Prior notice; output labels; named human overseer | Safety duties above 10^26 FLOP and state of the art | MSIT; fines up to KRW 30M for three failures; grace period | Developing and using operators; domestic representative |
| Colorado SB 26-189 [15] | ADMT in consequential decisions | Developer documentation; records three years | Notice; explanation within 30 days; human review and reconsideration | None | Attorney General; cure period; no private action | Developer and deployer |
| Texas TRAIGA [18] | Prohibited intents; government and health-care use | Avoid prohibited uses; answer investigative demands | Disclosure by government and in health care | None | Attorney General; tiered civil penalties; cure period | Developer, deployer, government |
| California SB 53 and SB 942 [19][21] | Compute and revenue (frontier); user base (provenance) | Frontier framework; transparency report; provenance and detection | Latent and manifest disclosures | Frontier developers above 10^26 operations | Attorney General; up to USD 1M per violation (SB 53) | Frontier developer; covered provider; platform |
| China, anthropomorphic measures [35] | Sustained emotional interaction services | Security assessment; algorithm filing; minors' mode | AI signal; two-hour reminder; easy exit | None specific | CAC and provincial offices | Service provider; app stores |
| Japan AI Promotion Act [31] | None (all AI-related technology) | Cooperation with government measures | None in the Act | None | No penalties; guidance after investigation | Research institutions; using operators |
| Italy Law 132/2025 [46] | Sector provisions on top of the EU AI Act | Worker information; professional disclosure; parental consent under 14 | Information to workers and clients | Through the EU AI Act | AgID and ACN; criminal offence for harmful deepfakes | Employer; professional; provider |

## Sector rules that already reach AI

AI-specific law is only half the picture. Sector regimes written before, or beside, the AI laws
already bind many AI systems, usually because the AI sits inside a product, a financial model, an ICT
system or a platform they regulate. Chapter 20 covers general law (intellectual property,
non-discrimination, consumer protection, product liability); the table below is the sector layer.

| Regime | AI trigger | Duty | Engineering artefact | Layer |
|---|---|---|---|---|
| DORA, Reg. (EU) 2022/2554 (applies from 2025-01-17) [55] | A financial entity's ICT systems or ICT third-party services include AI | ICT risk management, including ICT third-party risk, and reporting of major ICT-related incidents | AI systems in the ICT asset inventory; AI vendors in the third-party register; incident pipeline using the DORA classification | 2 · 4 · 5 |
| NIS2, Dir. (EU) 2022/2555 (transposition due 2024-10-17) [56] | An essential or important entity's network and information systems include AI | Cybersecurity risk management; early warning within 24 hours, notification within 72 hours, final report within one month | AI assets in the security scope; incident pipeline with the NIS2 clock | 4 · 5 |
| Cyber Resilience Act, Reg. (EU) 2024/2847 (reporting from 2026-09-11; main duties from 2027-12-11) [57][58] | A product with digital elements that includes AI components | Security by design and vulnerability handling; report actively exploited vulnerabilities and severe incidents: 24 hours, 72 hours, final report | SBOM and AIBOM; vulnerability-handling process; reporting runbook for the single reporting platform | 2 · 4 · 5 |
| Data Act, Reg. (EU) 2023/2854 (applies from 2025-09-12) [59] | Connected products and related services whose data trains or feeds AI; AI delivered as a data-processing service | Data access and sharing for users; switching between data-processing services | Data-access interface and sharing log in the data card; exit and switching plan for the AI platform | 2 · 5 |
| EU MDR and IVDR, with MDCG 2025-6 on their interplay with the AI Act (June 2025) [60] | Medical-device software that uses AI | Device conformity assessment; where the AI is also high-risk under the AI Act, both regimes apply and the MDCG FAQ explains how they fit together | Technical documentation built once to serve both regimes; clinical or performance evaluation; post-market surveillance plan | 3 · 5 |
| FDA draft guidance on AI-enabled device software functions (January 2025; still draft on the FDA page) [61] | AI-enabled device software in a US marketing submission | Recommended documentation across the total product lifecycle to support the safety and effectiveness review | Model description; data management and validation report; labelling; post-market performance monitoring | 3 · 5 |
| US model risk management: SR 26-2 (2026-04-17), superseding SR 11-7 [62] | Models, including AI and ML, used by banking organisations; most relevant above USD 30B in assets | Risk-based model risk management tailored to the model risk profile | Model inventory entry; validation report; eval results as validation evidence; performance monitoring | 2 · 3 · 5 |
| PRA SS1/23 (effective 2024-05-17; revised version effective 2026-04-23) [63] | Models used by UK banks, building societies and PRA-designated investment firms with internal-model approval for regulatory capital | Five principles for a strategic approach to model risk, starting with model identification and model risk classification | Model inventory with tiering; validation record; model-risk mitigants log | 2 · 3 · 5 |
| ECOA and Regulation B; FCRA adverse-action notices [64] | A credit decision made or supported by a complex algorithm | Specific principal reasons for adverse action under 12 CFR 1002.9; the CFPB's Circular 2022-03 saying complexity is no excuse was withdrawn on 12 May 2025, and the Regulation B duty stands [71]. FCRA notices apply where a consumer report is used (verify scope per product) | Reason-code generator logged with each decision; notice template; eval that reasons are faithful to the model | 3 · 4 · 5 |
| Platform Work Directive, Dir. (EU) 2024/2831 (transposition by 2 Dec 2026, Art. 29(1)) [65][70] | Digital labour platforms using automated monitoring or decision-making | Transparency of automated systems; monitoring by qualified staff; a right to contest automated decisions | Algorithmic-management register; worker-facing information; human-review queue with decision log; DPIA | 2 · 4 · 5 |
| Minors and online safety: DSA Art. 28 guidelines (2025-07-14); UK Online Safety Act children's duties; companion-chatbot laws [66][67][24][27][35] | Services likely to be used by children, including AI chat and companions | Proportionate protection measures; children's risk assessment; reminders and crisis referral | Age-assurance signal; minors' mode configuration; children's risk assessment; reminder and referral logs | 1 · 4 · 5 |

Two of these rows changed recently enough to trip a team that last looked in 2025. The US banking
agencies replaced SR 11-7, the reference text of "model risk management" for fifteen years, with SR
26-2 on 17 Apr 2026 [62]; references to "SR 11-7" in model-governance policies should now point to
the revised guidance. And the Cyber Resilience Act's reporting duties started on 11 Sep 2026 [57].

### Incident clocks across regimes

One AI incident can start several clocks at once. The [Incident Pipeline](/patterns/incident-pipeline)
pattern should hold each clock as data, keyed to the regime and the trigger, so that one triage
decision fans out to every report that is due. Chapter 17 treats [incident response](/bok/incidents#the-overlapping-clocks)
in full.

| Regime | Trigger | Clock | Recipient |
|---|---|---|---|
| NIS2 [56] | Significant incident | 24 h early warning; 72 h notification; final report within one month | CSIRT or competent authority |
| Cyber Resilience Act [58] | Actively exploited vulnerability or severe incident | 24 h early warning; 72 h notification; final report 14 days after a fix (vulnerabilities) or one month (incidents) | Single reporting platform |
| DORA [55] | Major ICT-related incident | Initial notification within 4 h of classifying the incident as major and no later than 24 h from awareness; intermediate report within 72 h of the initial notification; final report within one month of the latest intermediate report (Delegated Regulation (EU) 2025/301, Art. 5) [69] | Competent financial authority |
| California SB 53 [19] | Critical safety incident | 15 days; 24 h if death or serious injury is imminent | Office of Emergency Services; appropriate authority for the 24-hour case |
| New York RAISE [25][26] | Critical safety incident | 72 h; 24 h if death or serious physical injury is imminent | Oversight office within the Department of Financial Services; law enforcement or public safety agency for the 24-hour case |
| Korea AI Basic Act [1] | Safety duties for high-compute systems | No fixed clock; results of the safety measures submitted to MSIT | MSIT |
| EU AI Act Art. 73 | Serious incident (high-risk) | See the [clock table in chapter 08](/bok/regulatory-map#eu-ai-act-post-omnibus) | Market-surveillance authority |

> **In practice (illustrative)**
> A payments company ran a fraud-scoring model inside a platform that was an ICT service under DORA,
> an important entity under NIS2 and, through its point-of-sale devices, a CRA product. When a
> prompt-injection path in its support agent exposed card data, the incident pipeline opened one
> ticket and three regulator-facing reports from the same timeline, each with its own clock and
> template. What made it work was not the model: it was a registry that already tagged the agent
> with all three regimes, and an evidence store that let each report cite the same signed logs.

## What you can do this week

1. **Add a jurisdiction block to every registry entry.** List where each system is offered, and for
   each place record the status value (binding-horizontal, binding-targeted, voluntary, bill), the
   classification verdict and the notice template in force. Start with Korea's high-impact test and
   Colorado's consequential-decision test; they cover most hiring and lending systems.
2. **Check the Korean domestic-representative thresholds.** Pull last year's revenue from AI services
   and the three-month daily-user average for Korea; if either crosses the decree line, designate a
   representative and give it a read-only evidence view before the guidance period ends.
3. **Turn incident clocks into data.** Put NIS2, CRA, DORA, SB 53, RAISE and AI Act Article 73 clocks
   in one table keyed by trigger, and make the incident pipeline read it. Test it with a tabletop
   incident that hits two regimes.
4. **Replace "SR 11-7" in your model-governance policy.** Point it at SR 26-2 and re-tier your model
   inventory against the revised, risk-based guidance.
5. **Make the model card answer the Texas questions.** Purpose, training-data types, input and output
   categories, performance metrics, known limits and post-deployment monitoring: the eight items the
   Texas Attorney General may demand are a good minimum for any model card.

**Maps to:** Korea AI Basic Act Arts. 2, 4, 31–36, 40, 43 and Enforcement Decree Arts. 23–29 · OMB
M-25-21 §4 and M-26-04 · EO 14365 · Colorado SB 26-189 · Texas HB 149 · California SB 53, SB 942 and
AB 853, AB 2013, SB 243 and the CPPA ADMT regulations · New York RAISE and GBL Art. 47 · Utah AI Policy
Act · Illinois HB 3773 · NYC Local Law 144 · Japan Act No. 53 of 2025 · CAC anthropomorphic
interaction measures · Canada Directive on Automated Decision-Making · Italy Law 132/2025 · Singapore
Model AI Governance Frameworks and AI Verify · DORA · NIS2 · Cyber Resilience Act · Data Act · MDR
and IVDR · SR 26-2 · PRA SS1/23 · Regulation B · Platform Work Directive · DSA Art. 28 · all five
stack layers ([Govern-as-Code](/bok/the-stack#layer-01-govern-as-code) to
[Assurance & Continuous Compliance](/bok/the-stack#layer-05-assurance--continuous-compliance)).
Mappings are illustrative, not a claim of conformity.

## Sources

[1] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법; Act No. 20676, promulgated 2025-01-21, in force 2026-01-22; as amended by Act No. 21311 of 2026-01-20, in force 2026-01-22 and, for Arts. 3(5), 16(3)-(5), 17-2, 18, 22-3 and the second sentence of 35(1), 2026-07-21; Arts. 2(4) high-impact areas, 2(7) operators, 4 scope, 31 transparency, 32 safety, 33 confirmation, 34 high-impact duties, 35 impact assessment, 36 domestic representative, 40 fact-finding, 43 fines up to KRW 30M; version in force 2026-07-21). Korean Law Information Center (MOLEG). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791&efYd=20260721 (verified: primary)
[2] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, promulgated 2026-01-21, in force 2026-01-22; as amended by Presidential Decree No. 36506 of 2026-07-20, in force 2026-07-21, and No. 36580, in force 2026-08-20; Art. 1-2 AI-vulnerable groups, Art. 15(4) confirmation of AI products for public procurement, Art. 23 notice and labelling methods, Art. 24 10^26 FLOP and two further criteria, Art. 25 confirmation procedure and 30-day reply, Art. 27 publication and five-year retention, Art. 28 impact-assessment content, Art. 29 domestic-representative thresholds; version in force 2026-08-20). Korean Law Information Center (MOLEG). 2026-08-18. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=288781&efYd=20260820 (verified: primary)
[3] "AI Basic Act Update: Enforcement and Key Implications" (MSIT guidance period of at least one year for fact-finding and fines; exceptions for loss of life or human-rights violations; AI Basic Act help desk). Shin & Kim. 2026-02-11. https://www.shinkim.com/eng/media/newsletter/3117 (verified: secondary)
[4] "AI기본법 시행령 7월 시행, 공공조달 AI 확인 제도 핵심 정리" (decree amendment in force 2026-07-21: public-procurement AI confirmation system, liability exemption for adopting officials, AI-vulnerable groups widened to job seekers and women with career breaks, support measures). Korea Data Economy News (한국데이터경제신문). 2026-07-20. https://www.dataeconomy.co.kr/news/articleView.html?idxno=41346 (verified: secondary)
[5] Executive Order 14179, Removing Barriers to American Leadership in Artificial Intelligence (signed 2025-01-23; review of actions taken under the revoked EO 14110; AI action plan within 180 days). Federal Register, Vol. 90, No. 20 (via GovInfo). 2025-01-31. https://www.govinfo.gov/content/pkg/FR-2025-01-31/html/2025-02172.htm (verified: primary)
[6] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (rescinds M-24-10; high-impact AI definition; minimum practices §4(b); 365 days to document). Office of Management and Budget. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[7] "White House Releases New Policies on Federal Agency AI Use and Procurement" (M-25-21 and M-25-22, Driving Efficient Acquisition of Artificial Intelligence in Government). The White House. 2025-04-07. https://www.whitehouse.gov/releases/2025/04/white-house-releases-new-policies-on-federal-agency-ai-use-and-procurement/ (verified: primary)
[8] OMB Memorandum M-26-04, Increasing Public Trust in Artificial Intelligence Through Unbiased AI Principles (implements EO 14319 of 2025-07-23; policies updated by 2026-03-11; minimum LLM transparency: acceptable use policy, model/system/data cards, end-user resources, feedback mechanism). Office of Management and Budget. 2025-12-11. https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf (verified: primary)
[9] Winning the Race: America's AI Action Plan (three pillars; funding and state AI regulatory climate; FCC evaluation; NIST AI RMF revision). The White House. 2025-07. https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf (verified: primary)
[10] Executive Order 14365, Ensuring a National Policy Framework for Artificial Intelligence (signed 2025-12-11; §3 AI Litigation Task Force in 30 days; §4 Commerce evaluation in 90 days; §5 BEAD and grant conditions; §6 FCC; §7 FTC policy statement; §8 legislative recommendation and carve-outs). Federal Register, Vol. 90, No. 239 (via GovInfo). 2025-12-16. https://www.govinfo.gov/content/pkg/FR-2025-12-16/html/2025-23092.htm (verified: primary)
[11] National Policy Framework for Artificial Intelligence: Legislative Recommendations (non-binding; preempt unduly burdensome state AI laws; keep generally applicable child-protection, anti-fraud and consumer laws). The White House. 2026-03-20. https://www.whitehouse.gov/wp-content/uploads/2026/03/03.20.26-National-Policy-Framework-for-Artificial-Intelligence-Legislative-Recommendations.pdf (verified: primary)
[12] "Navigating the Emerging Federal-State AI Showdown: DOJ Establishes AI Litigation Task Force" (task force announced by the Attorney General on 2026-01-09). BakerHostetler. 2026-01-20. https://www.bakerlaw.com/insights/navigating-the-emerging-federal-state-ai-showdown-doj-establishes-ai-litigation-task-force/ (verified: secondary)
[13] "FTC Seeks Public Comment on Policy Statement Addressing AI Accuracy" (proposed Section 5 policy statement; Colorado AI Act discussed as possibly impliedly preempted; comments to 2026-07-31). Federal Trade Commission. 2026-07-01. https://www.ftc.gov/news-events/news/press-releases/2026/07/ftc-seeks-public-comment-policy-statement-addressing-ai-accuracy (verified: primary)
[14] "Lawmakers propose AI framework that would preempt state laws for 3 years" (Obernolte and Trahan discussion draft, Great American Artificial Intelligence Act of 2026). Nextgov/FCW. 2026-06-04. https://www.nextgov.com/artificial-intelligence/2026/06/lawmakers-propose-ai-framework-would-preempt-state-laws-3-years/413975/ (verified: secondary)
[15] SB26-189, Automated Decision-Making Technology (repeals and re-enacts SB 24-205; signed 2026-05-14; effective 2027-01-01; developer documentation, deployer notice, 30-day explanation, human review, three-year records; Attorney General enforcement with 60-day cure). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[16] "Colorado AI law in flux: comprehensive replacement bill signed after federal court blocks predecessor's enforcement" (SB 24-205 delayed to 2026-06-30, then replaced by SB 26-189; xAI suit filed 2026-04-09; DOJ companion complaint 2026-04-24; stipulated order of 2026-04-27 pausing enforcement). McDermott Will & Emery. 2026-05-27. https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/ (verified: secondary)
[17] "DOJ Intervenes in Lawsuit Challenging Colorado's 'Algorithmic Discrimination' Law" (developer suit filed 2026-04-09 in the District of Colorado; DOJ complaint on Equal Protection grounds). Barnes & Thornburg. 2026-05-01. https://btlaw.com/en/insights/alerts/2026/doj-intervenes-in-lawsuit-challenging-colorados-algorithmic-discrimination-law (verified: secondary)
[18] Texas Responsible Artificial Intelligence Governance Act (HB 149, enrolled; effective 2026-01-01; §552.051 disclosure, §§552.052–552.057 prohibitions, §552.101 no private right of action, §552.103 civil investigative demand items, §552.104 60-day cure, §552.105 penalties, 36-month sandbox). Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[19] SB-53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; chaptered 2025-09-29, Chapter 138; 10^26 operations; USD 500M revenue; frontier AI framework; transparency report; incident reports to OES in 15 days or 24 hours; up to USD 1M per violation; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1)). California Legislative Information. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53 (verified: primary)
[20] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; transparency reports by all frontier developers). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[21] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01; s. 22757.4 civil penalty USD 5,000 per violation, each day a discrete violation). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[22] AB-2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28, Chapter 817; documentation on or before 2026-01-01 for systems released since 2022-01-01; exemptions). California Legislative Information. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[23] "California Finalizes Regulations to Strengthen Consumers' Privacy" (ADMT, risk-assessment and cybersecurity-audit regulations approved 2025-09-23; effective 2026-01-01; ADMT from 2027-01-01; attestations from 2028-04-01). California Privacy Protection Agency. 2025-09-23. https://cppa.ca.gov/announcements/2025/20250923.html (verified: primary)
[24] SB-243, Companion chatbots (chaptered 2025-10-13, Chapter 677; AI disclosure; three-hour reminders for known minors; self-harm protocol; reports from 2027-07-01; private right of action, at least USD 1,000 per violation). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243 (verified: primary)
[25] NY State Senate Bill 2025-S6953B (RAISE Act as signed 2025-12-19: frontier models above 10^26 operations costing over USD 100M; safety protocols; 72-hour incident disclosure; thresholds and the reporting recipient superseded by the chapter amendment signed 2026-03-27, which uses 10^26 operations, USD 500M revenue for large frontier developers and a DFS office, see [26]). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[26] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment S8828 signed 2026-03-27; SB 53's thresholds: frontier model above 10^26 operations, large frontier developer above USD 500M annual revenue; all frontier developers report critical safety incidents within 72 hours to a new DFS office, or within 24 hours to law enforcement or public safety agencies on imminent risk). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[27] New York General Business Law Article 47, Artificial Intelligence Companion Models (§1701 self-harm protocol; §1702 notice at start and every three hours; §1703 Attorney General, up to USD 15,000 per day). New York State Senate. 2026. https://www.nysenate.gov/legislation/laws/GBS/A47 (verified: primary)
[28] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (disclosure on clear request; high-risk AI interaction; regulated occupations; safe harbour; effective 2025-05-07; AI Policy Act repeal date 2027-07-01). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[29] "Illinois Adopts New AI-in-Employment Regulations: What Employers Need to Know for 2026" (HB 3773 effective 2026-01-01; notice duty; IDHR draft rules; Human Rights Act remedies). Hinshaw & Culbertson. 2026. https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026 (verified: secondary)
[30] Automated Employment Decision Tools (Local Law 144 of 2021; bias audit within one year; public summary; notices; enforcement from 2023-07-05). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[31] Act on the Promotion of Research, Development and Utilisation of AI-Related Technologies (人工知能関連技術の研究開発及び活用の推進に関する法律; Act No. 53 of 2025, promulgated 2025-06-04; Arts. 7, 13, 16, 18; no penalties). e-Gov Law Search (Digital Agency). 2025-06-04. https://laws.e-gov.go.jp/law/507AC0000000053 (verified: primary)
[32] AI Act page (promulgated and partly in force 2025-06-04; fully in force 2025-09-01). Cabinet Office of Japan. 2025. https://www8.cao.go.jp/cstp/ai/ai_act/ai_act.html (verified: primary)
[33] AI Basic Plan (Cabinet decisions of 2025-12-23 and 2026-07-14). Cabinet Office of Japan. 2026-07-14. https://www8.cao.go.jp/cstp/ai/ai_plan/ai_plan.html (verified: primary)
[34] Guidelines on ensuring the appropriateness of research, development and use of AI-related technologies (AI Strategy Headquarters decision of 2025-12-19). Cabinet Office of Japan. 2025-12-19. https://www8.cao.go.jp/cstp/ai/ai_guideline/ai_guideline.html (verified: primary)
[35] Interim Measures for the Administration of Anthropomorphic Interaction Services (人工智能拟人化互动服务管理暂行办法; CAC, NDRC, MIIT, MPS and SAMR; Art. 2 scope; Art. 14 minors; Art. 18 labelling and two-hour reminder; Art. 19 exit; Art. 22 security assessment incl. 1M registered or 100k monthly active users; Art. 26 filing; in force 2026-07-15). Cyberspace Administration of China. 2026-04-10. https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm (verified: primary)
[36] PL 2338/2023, Marco Legal da Inteligência Artificial (introduced 2023-05-03; approved by the Senate plenary 2024-12-10; sent to the Chamber of Deputies). Federal Senate of Brazil. 2025-03-17. https://www25.senado.leg.br/web/atividade/materias/-/materia/157233 (verified: primary)
[37] PL 2338/2023 in the Chamber of Deputies (received 2025-03-17; special committee created 2025-04-04; priority regime; awaiting report as of the 2026-09-02 entry). Câmara dos Deputados. 2026-09-02. https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262 (verified: primary)
[38] C-27 (44-1), Digital Charter Implementation Act, 2022 (enacting the Artificial Intelligence and Data Act; session ended 2025-01-06). LEGISinfo, Parliament of Canada. 2025. https://www.parl.ca/legisinfo/en/bill/44-1/c-27 (verified: primary)
[39] Directive on Automated Decision-Making (effective 2019-04-01; modified 2025-06-24; existing systems to comply by 2026-06-24; AIA, Appendix C impact levels, notice, explanation, peer review, GBA Plus, recourse, reporting). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[40] "MeitY Unveils India AI Governance Guidelines under IndiaAI Mission" (seven sutras, six pillars, action plan; existing legislation wherever possible). Press Information Bureau, Government of India. 2025-11-05. https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186639 (verified: primary)
[41] A pro-innovation approach to AI regulation: government response (CP 1019; five cross-sector principles applied by existing regulators). Department for Science, Innovation and Technology. 2024-02-06. https://www.gov.uk/government/consultations/ai-regulation-a-pro-innovation-approach-policy-proposals/outcome/a-pro-innovation-approach-to-ai-regulation-government-response (verified: primary)
[42] "AI Security Institute" (written statement announcing the rename of the AI Safety Institute). UK Parliament. 2025-02-24. https://questions-statements.parliament.uk/written-statements/detail/2025-02-24/hlws454 (verified: primary)
[43] Algorithmic Transparency Recording Standard Hub (mandatory for government departments and for arm's-length bodies delivering public or frontline services). Government Digital Service. 2025-05-08. https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub (verified: primary)
[44] AI Cyber Security Code of Practice (code and implementation guide). Department for Science, Innovation and Technology. 2025-01-31. https://www.gov.uk/government/publications/ai-cyber-security-code-of-practice (verified: primary)
[45] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; in force 2026-02-05). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[46] Legge 23 settembre 2025, n. 132, Disposizioni e deleghe al Governo in materia di intelligenza artificiale (GU Serie Generale n. 223 of 2025-09-25; in force 2025-10-10; Arts. 1(2), 4(4), 11(2), 13, 20, 26; consolidated text last updated 2026-06-26). Gazzetta Ufficiale / Normattiva. 2025-09-25. https://www.gazzettaufficiale.it/eli/id/2025/09/25/25G00143/sg (verified: primary)
[47] Referencia del Consejo de Ministros, 11 March 2025 (Anteproyecto de Ley para el buen uso y la gobernanza de la Inteligencia Artificial, first reading, urgent processing; sanctions, deepfake labelling, provisional withdrawal, authorities; sandbox call for up to 12 systems). La Moncloa. 2025-03-11. https://www.lamoncloa.gob.es/consejodeministros/referencias/paginas/2025/20250311-referencia-rueda-de-prensa-ministros.aspx (verified: primary)
[48] Real Decreto 817/2023, de 8 de noviembre, entorno controlado de pruebas (AI regulatory sandbox). Boletín Oficial del Estado. 2023-11-09. https://www.boe.es/eli/es/rd/2023/11/08/817 (verified: primary)
[49] Guías (16 guides from the Spanish AI regulatory sandbox pilot; non-binding; the page still says they will be updated once the digital Omnibus is approved, as of 2026-09-24). AESIA. 2026. https://aesia.digital.gob.es/es/guias (verified: primary)
[50] "Singapore Launches New Model AI Governance Framework for Agentic AI" (launched at Davos). IMDA. 2026-01-22. https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai (verified: primary)
[51] Model AI Governance Framework for Agentic AI, version 1.5 (published 2026-05-20, updated 2026-06-05; four dimensions). IMDA. 2026-06-05. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[52] Model AI Governance Framework for Generative AI (voluntary). IMDA / AI Verify Foundation. 2024-05. https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf (verified: primary)
[53] AI Verify Testing Framework (11 internationally recognised AI governance principles; generative-AI update). AI Verify Foundation. 2026. https://aiverifyfoundation.sg/what-is-ai-verify/ (verified: primary)
[54] National AI Plan, "Keep Australians safe" (existing technology-neutral frameworks; AI Safety Institute; six essential practices of the Guidance for AI Adoption; published December 2025; opened via the Internet Archive). Department of Industry, Science and Resources. 2025-12. https://www.industry.gov.au/publications/national-ai-plan/keep-australians-safe (verified: primary)
[55] Digital Operational Resilience Act (DORA) (entered into force 2023-01-16; applies from 2025-01-17; ICT and ICT third-party risk; reporting of major ICT-related incidents). European Securities and Markets Authority. 2025. https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora (verified: primary)
[56] NIS2 Directive: questions and answers (transposition by 2024-10-17; early warning 24 hours, notification 72 hours, final report within one month). European Commission. 2024. https://digital-strategy.ec.europa.eu/en/faqs/directive-measures-high-common-level-cybersecurity-across-union-nis2-directive-faqs (verified: primary)
[57] Cyber Resilience Act (in force 2024-12-10; reporting obligations from 2026-09-11; main obligations from 2027-12-11; guidance of 2026-07-27). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act (verified: primary)
[58] Cyber Resilience Act: reporting obligations (24-hour early warning, 72-hour notification, final report 14 days after a corrective measure or one month for severe incidents; single reporting platform). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/cra-reporting (verified: primary)
[59] Data Act (in force 2024-01-11; applies from 2025-09-12; access to data from connected products; switching between cloud providers). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/policies/data-act (verified: primary)
[60] MDCG 2025-6, FAQ on interplay between the MDR and IVDR and the Artificial Intelligence Act (how the device regulations and the AI Act apply together; listed on the Commission's MDCG guidance page). Medical Device Coordination Group (European Commission). 2025-06. https://health.ec.europa.eu/document/download/b78a17d7-e3cd-4943-851d-e02a2f22bbb4_en?filename=mdcg_2025-6_en.pdf (verified: primary)
[61] Artificial Intelligence-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations (draft guidance; docket FDA-2024-D-4488). US Food and Drug Administration. 2025-01-07. https://www.fda.gov/regulatory-information/search-fda-guidance-documents/artificial-intelligence-enabled-device-software-functions-lifecycle-management-and-marketing (verified: primary)
[62] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; most relevant above USD 30B in total assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[63] SS1/23, Model risk management principles for banks (published 2023-05-17; effective 2024-05-17; revised version effective 2026-04-23; scope: banks, building societies and PRA-designated investment firms with internal-model approval; five principles). Prudential Regulation Authority (Bank of England). 2026-04. https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss (verified: primary)
[64] Consumer Financial Protection Circular 2022-03, Adverse action notification requirements in connection with credit decisions based on complex algorithms (ECOA and Regulation B; withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14, although the page shows no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[65] "Platform workers: Council adopts new rules to improve their working conditions" (algorithmic management transparency; monitoring by qualified staff; right to contest; two years to transpose). Council of the European Union. 2024-10-14. https://www.consilium.europa.eu/en/press/press-releases/2024/10/14/platform-workers-council-adopts-new-rules-to-improve-their-working-conditions/ (verified: primary)
[66] "Commission publishes guidelines on the protection of minors" (DSA Art. 28 guidelines). European Commission. 2025-07-14. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-protection-minors (verified: primary)
[67] Online Safety Act: explainer (children's risk assessments due 2025-07-24; child-safety regime in effect from summer 2025). Department for Science, Innovation and Technology. 2025-04-24. https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer (verified: primary)
[68] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 27 Jul 2026; Annex III high-risk obligations from 2 Dec 2027). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[69] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits for major ICT-related incident reports under DORA (Art. 5: initial notification within 4 hours of classification and 24 hours of awareness; intermediate within 72 hours; final within one month). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[70] Directive (EU) 2024/2831 on improving working conditions in platform work (Art. 29(1): transposition by 2 Dec 2026). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng (verified: primary)
[71] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
