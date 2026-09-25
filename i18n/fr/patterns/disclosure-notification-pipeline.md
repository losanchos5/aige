---
lang: fr
source: bok/patterns/disclosure-notification-pipeline.md
sourceHash: "75d5ce887866ae0d4a4feb2e51693f55cd836ceeb2c2162e40ccf2c1d8501291"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: disclosure-notification-pipeline
title: "Disclosure & Notification Pipeline"
layer: 5
secondaryLayer: 2
order: 32
summary: "Divulgations et notifications générées à partir du registre, à partir de modèles versionnés par audience et horloge, avec chaque notification envoyée enregistrée comme preuve."
---

# Motif : Disclosure & Notification Pipeline

**Résumé :** Générez chaque déclaration tournée vers l'extérieur concernant un système d'IA à partir
d'une source unique de vérité, le registre : les divulgations proactives (un avis d'interaction avec
l'IA, des étiquettes de contenu, la page de transparence et la fiche de système en langage clair,
les avis aux travailleurs et aux personnes faisant l'objet de décisions) et les notifications
réactives (au fournisseur, aux autorités, aux personnes affectées, aux clients et au public) qu'un
déclencheur démarre sur une horloge. Les modèles sont versionnés comme du code, les approbations
sont enregistrées, et chaque notification envoyée est un enregistrement de preuve avec son audience,
la version du modèle et l'horodatage.

## Objectifs
Assurez-vous que les personnes et les organismes qui doivent être informés d'un système d'IA
reçoivent le bon message, à temps, d'une seule voix, et puissent prouver ce qui a été dit à qui et
quand.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, responsable des communications, juridique et conformité, DPO,
ingénieur produit.

## Parties prenantes affectées
Utilisateurs, travailleurs et leurs représentants, personnes affectées, clients professionnels et
partenaires, fournisseurs et déployeurs tout au long de la chaîne, autorités de surveillance et de
surveillance du marché, le public et les médias.

## Principes pertinents
Instrumentalisez la construction pour produire sa propre preuve ; rendez le chemin gouverné le plus
facile ; donnez des dents à chaque contrôle.

## Contexte
Les obligations de transparence s'attachent désormais à des surfaces et des horloges spécifiques. En
vertu du Règlement de l'IA de l'UE, les fournisseurs doivent concevoir des systèmes qui
interagissent avec les personnes de sorte qu'elles sachent qu'il s'agit d'un système d'IA, et
doivent marquer les résultats synthétiques ; les déployeurs doivent informer les personnes exposées
à la reconnaissance des émotions ou à la catégorisation biométrique et divulguer les
ultrasuplantations ; et l'information doit atteindre les personnes au plus tard à la première
interaction ou exposition (`Art. 50(1)`–`(5)`) [1]. L'article 50 s'applique depuis le 2 août 2026,
et les systèmes génératifs déjà sur le marché avant cette date ont jusqu'au 2 décembre 2026 pour
marquer les résultats [2]. Les déployeurs à haut risque doivent également informer les travailleurs
avant l'utilisation sur le lieu de travail, informer les personnes faisant l'objet de décisions de
l'Annexe III, et informer le fournisseur et les autorités lorsqu'un système présente un risque
(`Art. 26(5)`, `(7)`, `(11)`) [1]. Le RGPD ajoute la notification de violation à l'autorité dans les
72 heures si possible et aux personnes affectées sans délai indu lorsque le risque pour elles est
élevé [3]. En dehors de l'UE, la Loi fondamentale sur l'IA de la Corée a exigé un avis préalable de
l'IA générative et à haut impact et des étiquettes sur les résultats générés depuis le 22 janvier
2026 [4] ; la Loi sur la transparence de l'IA de Californie, en vigueur depuis le 2 août 2026,
demande aux grands fournisseurs d'IA générative des divulgations manifestes latentes et optionnelles
[5] ; et l'Utah exige une réponse claire lorsqu'un consommateur demande s'il parle à une IA [6].
L'établissement de plans de communication externes fait partie de la gouvernance du déploiement et
de l'utilisation dans le Corps de connaissances AIGP de l'IAPP (compétence IV.C) [7].

## Problème
Les divulgations sont écrites une fois, à la main, par surface, et s'écartent de ce qui s'exécute :
la page de transparence décrit le modèle de l'année dernière, l'avis du widget de chat a disparu
lors d'une refonte, et personne ne peut dire quels travailleurs ont été informés avant que le
système ne soit mis en ligne. Les avis réactifs sont rédigés sous pression lorsque l'horloge
s'exécute déjà, par quiconque est disponible, sans enregistrement de ce qui a été envoyé. Le devoir
de chaque juridiction est géré par une équipe différente avec un modèle différent.

### Enjeux
- **Une voix contre de nombreuses audiences.** Un régulateur, un client et la presse ont besoin de
  contenu différent à partir des mêmes faits.
- **Vitesse contre précision.** Les horloges s'exécutent à partir de la sensibilisation, tandis que
  les faits arrivent tard ; une déclaration de maintien ne doit dire que ce qui est connu.
- **Cohérence contre localisation.** Les obligations et les langues diffèrent selon la juridiction,
  mais les faits ne doivent pas.
- **Proactif contre réactif.** Les obligations de divulgation sont continues ; les obligations de
  notification se déclenchent sur des événements.

## Solution
Traitez la divulgation comme un pipeline du registre à chaque audience, avec preuve à la fin.

1. **Une source unique de vérité.** L'entrée du registre contient les faits sur lesquels les
   divulgations s'appuient : objectif, fournisseur, version du modèle, juridictions, si le système
   interagit avec les personnes, génère du contenu, prend des décisions concernant les personnes ou
   est utilisé au travail. La page de transparence et la fiche de système en langage clair sont
   générées à partir de celle-ci à chaque version, de sorte qu'elles ne peuvent pas s'écarter de ce
   qui s'exécute.
2. **Une matrice de devoir par système.** Un ensemble de règles mappe les faits du registre aux
   obligations : divulgation d'interaction, marquage et étiquetage du contenu, information des
   travailleurs, avis de décision (voir
   [Decision Notice & Contest Path](/patterns/decision-notice-contest-path)), avis locaux par
   juridiction. Chaque obligation nomme une surface, un modèle et un test que l'avis rend là.
3. **Modèles en tant que code.** Les modèles par audience et langue vivent dans le contrôle de
   version avec un propriétaire et une règle d'approbation ; un changement de modèle est une
   différence examinée. Les déclarations de maintien existent en squelette avant tout incident.
4. **Déclencheurs avec horloges.** Un incident, une violation, un changement matériel, une
   dépréciation ou une retraite émet un déclencheur ; le pipeline sélectionne les audiences à partir
   de la matrice et du [Downstream Use Register](/patterns/downstream-use-register), démarre chaque
   horloge et rédige chaque avis. Les incidents arrivent du
   [Incident Pipeline](/patterns/incident-pipeline).
5. **Preuve par avis.** Chaque avis envoyé écrit un enregistrement : audience, déclencheur, version
   du modèle, approbateur, canal, horodatage. L'enregistrement de la décision de déploiement pointe
   sur les proactifs (ses obligations `workers_informed` et `affected_persons_informed`, dans le
   [schéma d'enregistrement de la décision de déploiement](/resources/templates#schema-deployment-decision-record)),
   et le bloc de rapport de l'enregistrement d'incident pointe sur les réactifs.

Manifeste de divulgation illustratif généré à partir du registre, avec un avis envoyé :

```json
{
  "subject": "csa-01@2026-09-18",
  "generated_at": "2026-09-18T07:00:00Z",
  "proactive": [
    { "duty": "EU AI Act Art. 50(1)", "surface": "chat widget", "template": "ai-disclosure.es-en.v3", "test": "e2e:disclosure-renders" },
    { "duty": "Korea AI Basic Act Art. 31(1)", "surface": "terms of service (KR)", "template": "kr-prior-notice.ko.v1", "test": "e2e:kr-terms-notice" },
    { "duty": "transparency page", "surface": "/ai/csa-01", "template": "system-card.v2", "test": "build:card-matches-registry" }
  ],
  "reactive": [
    { "trigger": "serious_incident", "audience": "provider", "clock": "immediately", "template": "si-notice.v2" },
    { "trigger": "personal_data_breach", "audience": "supervisory_authority", "clock": "72h where feasible", "template": "breach-art33.v4" },
    { "trigger": "material_change", "audience": "business_customers", "clock": "30 days before, per contract", "template": "change-notice.v2" }
  ],
  "sent": [
    {
      "notice_id": "ntc-2026-0091",
      "trigger": "material_change",
      "audience": "business_customers",
      "template": "change-notice.v2",
      "approved_by": "communications-owner",
      "sent_at": "2026-09-01T10:00:00Z"
    }
  ]
}
```

> **Exemple (illustratif)** Un assistant d'assistance passe à un nouveau modèle de fournisseur. La
> version régénère la fiche de système et la page de transparence à partir du registre, le pipeline
> envoie l'avis de changement contractuel aux clients professionnels 30 jours à l'avance à partir du
> modèle approuvé, et une vérification en CI échoue la construction lorsqu'un widget de chat repensé
> ne rend plus l'avis d'interaction avec l'IA.

## Conséquences
Ce que l'organisation dit sur son IA correspond à ce qui s'exécute, les avis sortent à temps à
partir de modèles approuvés, et chacun est prouvable. Le coût est la matrice de devoir à maintenir à
mesure que les lois changent, la propriété des modèles entre juridique, communications et produit,
et les tests de rendu sur chaque surface. Le pipeline produit l'avis ; que l'avis soit compris
nécessite toujours des tests avec ses lecteurs.

## Motifs connexes
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[Incident Pipeline](/patterns/incident-pipeline);
[Downstream Use Register](/patterns/downstream-use-register);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Correspondances :** Règlement de l'IA Art. 26(5), Art. 26(7), Art. 26(11), Art. 50 · RGPD Art. 33,
Art. 34 · Loi fondamentale sur l'IA de la Corée Art. 31 · ISO/IEC 42001 A.8.2, A.8.3, A.8.4, A.8.5 ·
NIST AI RMF MANAGE 4.3, GOVERN 4.2, GOVERN 5.1 · Layer 05 Assurance & Continuous Compliance / Layer
02 Inventory & Transparency.

Les identifiants de contrôle suivent l'Annexe A d'ISO/IEC 42001 [8] et les identifiants de
sous-catégorie le NIST AI RMF [9]. Les mappages sont illustratifs, non une affirmation de
conformité.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(5), (7) and (11) deployer information duties; Art. 50(1)–(5) transparency obligations). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Art. 111(4): Art. 50(2) marking for generative systems placed on the market before 2 Aug 2026 from 2 Dec 2026); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 33 notification to the supervisory authority within 72 hours where feasible; Art. 34 communication to the data subject). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[4] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Act No. 20676, in force 2026-01-22; Art. 31 prior notice, output labelling and realistic synthetic content). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[5] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[6] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (disclosure on clear request; high-risk AI interaction; effective 2025-05-07). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[7] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: establish external communication plans; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[8] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.8.3 external reporting; A.8.4 communication of incidents; A.8.5 information for interested parties). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 4.2 impacts documented and communicated more broadly; GOVERN 5.1 feedback from those external to the team; MANAGE 4.3 incidents and errors communicated to relevant AI actors, including affected communities). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
