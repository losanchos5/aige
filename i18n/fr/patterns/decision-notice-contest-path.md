---
lang: fr
source: bok/patterns/decision-notice-contest-path.md
sourceHash: "0c90b68790ca1efb894ab8be4670c23c1957277b6e7b9e71472e60313bff602b"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: decision-notice-contest-path
title: "Decision Notice & Contest Path"
layer: 4
secondaryLayer: 5
order: 26
summary: "Un avis au moment d'une décision automatisée, lié à son enregistrement de décision, et un chemin de contestation vers un examinateur ayant le pouvoir de modifier le résultat."
---

# Motif : Decision Notice & Contest Path

**Résumé :** Quand un système d'IA prend ou façonne une décision concernant une personne, envoyez un
avis au moment de la décision, généré à partir de l'enregistrement de décision, qui dit qu'un
système a été impliqué, donne les raisons principales et dit comment contester ; et exécutez un
chemin de contestation vers un examinateur ayant l'autorité et les informations pour modifier le
résultat. L'avis, la contestation et le résultat de l'examen sont tous des enregistrements, de sorte
que le droit de contester est prouvé décision par décision au lieu d'être affirmé dans une
politique.

## Objectifs
Rendez chaque décision automatisée conséquente explicable à et contestable par la personne qu'elle
affecte, et laissez un enregistrement montrant que l'avis a été envoyé, que la contestation a été
entendue et que le résultat a tenu ou changé pour une raison indiquée.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur produit, délégué à la protection des données, le
propriétaire des opérations de la décision (crédit, sinistres, embauche).

## Parties prenantes affectées
Candidats, clients, employés et autres personnes affectées ; examinateurs humains ; autorités de
surveillance et de surveillance du marché ; auditeurs.

## Principes pertinents
Commencez par un mode de défaillance ou un préjudice nommé ; instrumentez la construction pour
produire sa propre preuve ; donnez à chaque contrôle des dents.

## Contexte
Un système déployé décide, ou façonne une décision, concernant une personne : crédit, assurance, un
emploi, l'accès à un service. Plusieurs régimes attachent des obligations à ce même moment. En vertu
de l'article 22 du RGPD, une décision uniquement automatisée ayant des effets juridiques ou
similairement importants n'est autorisée que sur une base étroite, et ensuite avec au moins le droit
d'obtenir une intervention humaine, d'exprimer un point de vue et de contester la décision ; les
articles 13(2)(f) et 15(1)(h) ajoutent des informations significatives sur la logique impliquée [1].
La Cour de justice a jugé qu'un score de crédit est lui-même une telle décision quand les prêteurs
lui donnent un rôle déterminant [2]. Au Royaume-Uni, les articles 22A à 22D, en vigueur depuis le 5
février 2026, exigent des informations sur la décision, la possibilité de faire des observations,
une intervention humaine et un moyen de contester [3].

En vertu du Règlement de l'IA de l'UE, les responsables de la mise en œuvre de systèmes à haut
risque de l'annexe III qui prennent ou aident à des décisions concernant des personnes doivent les
informer que le système est utilisé (`Art. 26(11)`), et une personne affectée peut obtenir une
explication claire et significative du rôle du système et des éléments principaux de la décision
(`Art. 86`), un droit qui s'applique uniquement quand le droit de l'Union ne le prévoit pas déjà
[4]. À partir du 2024-09-24, les exigences de l'annexe III s'appliquent à partir du 2 décembre 2027
[5]. `Art. 86` lui-même s'applique depuis le 2 août 2026 (`Art. 113`) [4], mais il s'attache aux
décisions basées sur les systèmes à haut risque de l'annexe III, donc selon la lecture de ce site,
il n'a du travail à faire qu'à partir du 2 décembre 2027. Un créancier américain qui prend une
mesure défavorable doit notifier le demandeur dans les 30 jours suivant une demande complétée, avec
les raisons principales spécifiques [6]. Le CFPB a déclaré en 2022 qu'un algorithme complexe
n'excuse pas des raisons vagues [7], mais a retiré cette circulaire le 12 mai 2025 ; l'obligation du
Règlement B elle-même est inchangée [6][12]. Le Colorado ajoute, à partir du 1er janvier 2027, un
avis d'utilisation, une explication en langage clair d'un résultat défavorable et un examen humain
pour les décisions automatisées dans les domaines conséquents [8].

## Problème
Chaque régime tend à être répondu sur le sien : un modèle de lettre détenu par les opérations, une
boîte de réception d'appel détenue par le service client, une page d'explication détenue par le
service juridique. Aucun d'eux n'est lié à l'enregistrement de décision, donc personne ne peut
montrer quel avis une personne donnée a reçu, quelles raisons il a données, si ces raisons étaient
les facteurs que le modèle a réellement utilisés, ou ce que l'examinateur a fait avec la
contestation. Un chemin de contestation qui se termine à un examinateur qui confirme presque chaque
résultat en quelques secondes n'est pas une implication humaine significative ; c'est une file
d'attente.

### Enjeux
- **Fidélité contre lisibilité.** Les raisons doivent être les facteurs que le modèle a réellement
  utilisés, mais assez courtes et claires pour qu'une personne puisse agir dessus.
- **Horloges contre capacité.** Les avis fonctionnent selon des délais (30 jours en vertu du
  Règlement B), et un vrai examen coûte du temps du personnel qui s'adapte au taux de contestation.
- **Divulgation contre protection.** Les informations significatives sur la logique doivent
  coexister avec les secrets commerciaux et avec ne pas apprendre aux gens à jouer le modèle ; la
  Cour de justice laisse cet équilibre à l'autorité ou au tribunal, pas au responsable du traitement
  seul [9].
- **Une décision, plusieurs régimes.** Le même refus peut relever du RGPD, du Règlement de l'IA,
  d'une loi sectorielle et d'une loi d'un État américain à la fois, chacun avec son propre contenu,
  audience et horloge.

## Solution
Construisez l'avis et la contestation comme deux services autour d'un enregistrement de décision.

1. **Enregistrement de décision d'abord.** À l'exécution, écrivez un enregistrement par décision :
   système et version du modèle, entrées par référence, résultat, codes de raison, si la décision
   était uniquement automatisée, la base légale et les régimes qui s'appliquent. Le côté examen suit
   le [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).
2. **Avis à partir de modèles versionnés.** Un service d'avis lit l'enregistrement et rend l'avis à
   partir d'un modèle par régime et langue : qu'un système a été utilisé, les raisons principales,
   ce que la personne peut faire et par quand. La version du modèle et l'heure d'envoi sont écrites
   à nouveau dans l'enregistrement. Une évaluation de fidélité du code de raison, exécutée en tant
   que [Eval Gate in CI](/patterns/eval-gate-in-ci), vérifie que les raisons qu'un avis donne sont
   les facteurs que le modèle a utilisés.
3. **Un chemin de contestation avec autorité.** Une contestation ouvre un dossier lié à
   l'identifiant de décision et acheminé vers un examinateur qui n'a pas pris la décision initiale,
   qui voit les entrées, les raisons et les observations de la personne, et qui peut modifier le
   résultat. Le délai de décision et les taux d'annulation sont surveillés par groupe : un
   examinateur qui confirme presque tout est un signal, pas une sauvegarde.
4. **Fermez la boucle.** Le résultat de l'examen, sa raison et toute correction sont écrits dans
   l'enregistrement. Les taux de contestation et d'annulation alimentent le
   [Drift & Fairness Monitor](/patterns/drift-fairness-monitor), et un groupe de décisions annulées
   sur un code de raison ouvre un problème contre le modèle.

Enregistrement d'avis de décision illustratif, écrit par le service d'avis et complété par le chemin
de contestation :

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

> **Exemple (illustratif)** Un contrôle de financement de téléphones mobiles d'un opérateur télécom
> rejette un demandeur. Le service de notification envoie le rejet avec deux codes de raison et un
> lien de contestation dans l'heure. Le demandeur conteste avec un relevé de règlement, un
> examinateur de deuxième ligne annule le rejet, et le taux d'annulation pour le code de raison R07
> entre dans l'examen du seuil suivant du modèle.

## Conséquences
La notification et la contestation de chaque personne peuvent être produites sur demande, et le
canal de contestation devient un capteur pour l'erreur et l'inéquité du modèle. Le coût est un
service de notification avec des modèles par régime à tenir à jour, une capacité d'examinateurs avec
une véritable autorité, et une évaluation de fidélité des codes de raison. Des raisons fidèles mais
peu utiles échouent toujours la personne, testez donc les notifications avec les personnes qui les
reçoivent.

## Motifs connexes
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Rights Requests Against Models](/patterns/rights-requests-against-models).

**Correspondances :** Règlement de l'IA Art. 26(11), Art. 86 · RGPD Art. 13(2)(f), Art. 15(1)(h),
Art. 22 · UK GDPR Arts. 22A–22D · ECOA / Regulation B 12 CFR 1002.9 · ISO/IEC 42001 A.8.2, A.9.2 ·
NIST AI RMF MEASURE 3.3, MANAGE 4.1, MAP 3.5 · Layer 04 Runtime Controls & Observability / Layer 05
Assurance & Continuous Compliance.

Les identifiants de contrôle suivent l'Annexe A d'ISO/IEC 42001 [10] et les identifiants de
sous-catégorie le NIST AI RMF [11]. Les mappages sont illustratifs, non une affirmation de
conformité.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 13(2)(f), 14(2)(g), 15(1)(h), 22). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[3] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[4] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(11) informing persons subject to Annex III decisions; Art. 86(1) and (3) right to explanation, subsidiary to other Union law; Art. 113, general application from 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Annex III high-risk requirements from 2 Dec 2027); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[6] 12 CFR 1002.9 (Regulation B, notifications: 1002.9(a)(1) action taken notified within 30 days of a completed application; 1002.9(b)(2) specific principal reasons). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[7] Consumer Financial Protection Circular 2022-03, Adverse action notification requirements in connection with credit decisions based on complex algorithms (ECOA and Regulation B; withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14, although the page shows no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[8] SB26-189, Automated Decision-Making Technology (repeals and re-enacts SB 24-205; signed 2026-05-14; effective 2027-01-01; deployer notice, 30-day explanation, human review, three-year records). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[9] Press release No 22/25: judgment in Case C-203/22, Dun & Bradstreet Austria (explanation of the procedure and principles actually applied; an algorithm alone is not an explanation; trade secrets balanced by the authority or court). Court of Justice of the EU. 2025-02-27. https://curia.europa.eu/site/upload/docs/application/pdf/2025-02/cp250022en.pdf (verified: primary)
[10] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.9.2 processes for responsible use of AI systems). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[11] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 3.5 human oversight processes; MEASURE 3.3 feedback and appeal processes for end users and impacted communities; MANAGE 4.1 post-deployment monitoring plans, including appeal and override). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[12] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
