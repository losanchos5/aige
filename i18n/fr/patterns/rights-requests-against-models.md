---
lang: fr
source: bok/patterns/rights-requests-against-models.md
sourceHash: "c0fce81a2c4fab7c428580e9c3ace2207604d6cba85f6b01897785da414b2a7b"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: rights-requests-against-models
title: Rights Requests Against Models
layer: 2
secondaryLayer: 5
order: 27
summary: "Acheminez chaque demande de personne concernée vers chaque endroit où les données de la personne se trouvent, des systèmes sources aux poids du modèle, et fermez-la avec un enregistrement d'exécution."
---

# Motif : Rights Requests Against Models

**Résumé :** Acheminez chaque demande de personne concernée (accès, rectification, effacement,
opposition) vers chaque endroit où les données de la personne se trouvent dans un système d'IA :
systèmes sources, snapshots d'entraînement et d'ajustement fin, index de récupération, journaux de
prompt et de sortie, ensembles d'évaluation et, si le modèle n'est pas anonyme, les poids. Chaque
emplacement a une réponse pré-convenue sur une échelle allant de la suppression immédiate au
réentraînement programmé, et la demande se ferme avec un enregistrement d'exécution qui indique ce
qui a été fait où et quand le reste du délai se ferme.

## Objectifs
Respectez les droits des personnes concernées dans le délai imparti sur l'ensemble du patrimoine de
données d'IA, pas seulement la base de données, et soyez en mesure de montrer par demande quels
emplacements ont été atteints, ce qui a été fait dans chacun et quelles versions de modèle portent
toujours les données de la personne jusqu'au prochain réentraînement.

## Utilisateurs cibles
DPO, ingénieur en gouvernance de l'IA, équipe de plateforme de données, ingénieur ML.

## Parties prenantes affectées
Personnes concernées, responsables du traitement et sous-traitants dans la chaîne
d'approvisionnement de l'IA, autorités de contrôle, propriétaires de modèles.

## Principes pertinents
Enregistrez et limitez chaque acteur avant qu'il n'agisse ; instrumentez la construction pour
produire sa propre preuve ; construisez le contrôle au point le plus précoce où il peut bloquer.

## Contexte
Le RGPD donne aux personnes des droits d'accès, de rectification, d'effacement et d'opposition, et
le responsable du traitement doit agir sur une demande dans un délai d'un mois, extensible de deux
mois supplémentaires pour les demandes complexes [1]. Dans un système d'IA, les données de la
personne ne se trouvent plus dans une seule table. Le caractère anonyme d'un modèle entraîné est
évalué au cas par cas : l'avis du CEPD sur les modèles d'IA énonce quand un modèle entraîné sur des
données personnelles peut être considéré comme anonyme et quelles preuves le responsable du
traitement doit fournir, et un modèle qui échoue au test est dans le champ d'application des droits
[2]. Les lignes directrices de la CNIL ajoutent qu'un responsable du traitement qui ne peut pas
identifier une personne dans un ensemble d'entraînement peut le dire, que la personne peut fournir
des informations qui rendent l'identification possible, que le réentraînement répond à une demande
où les données sont toujours conservées, et que les filtres de sortie sont acceptables si le
réentraînement est disproportionné, s'il est démontré qu'ils sont efficaces [3]. L'autorité de
protection des données de Hambourg part d'ailleurs, en considérant que le stockage d'un grand modèle
de langage n'est pas un traitement et que les droits s'attachent aux entrées et sorties du système
[4]. Un responsable de l'implantation doit travailler selon l'une ou l'autre interprétation.

## Problème
L'outillage de demande construit pour les bases de données s'arrête au CRM. Le dossier de la même
personne se trouve également dans un snapshot d'ajustement fin, un index de récupération, trois mois
de journaux de prompts et un ensemble d'évaluation, et un modèle ajusté sur ce snapshot peut le
reproduire. Sans une carte de la personne vers ces emplacements, un effacement se ferme à temps et
reste incomplet ; sans un enregistrement par emplacement, personne ne peut dire pourquoi la
suppression de sortie a été choisie plutôt que le réentraînement, ou quand le réentraînement qui
ferme le délai sera livré.

### Enjeux
- **Complétude par rapport au coût.** Supprimer une ligne est bon marché ; réentraîner un grand
  modèle pour une demande ne l'est pas, donc la réponse aux poids est généralement échelonnée.
- **Délai par rapport au lot.** L'horloge d'un mois favorise les mesures partielles rapides
  maintenant et les mesures complètes selon un calendrier.
- **Rétention par rapport à l'effacement.** Les responsables de l'implantation à haut risque
  conservent les journaux générés automatiquement pendant au moins six mois sauf si une autre loi en
  dispose autrement [5], tandis que la limitation du stockage pousse dans l'autre sens.
- **Vérifiabilité.** Les méthodes d'oubli approximatif sont difficiles à vérifier, donc une
  affirmation selon laquelle l'influence d'un enregistrement a disparu nécessite un test, pas une
  assertion.

## Solution
Traitez la demande comme un travail de fan-out sur une carte de données, et le modèle comme un
emplacement de plus.

1. **Une carte de données indexée par personne.** Construisez la carte à partir de la traçabilité
   que vous conservez déjà : les fiches de données, les enregistrements d'admission de dataset et
   l'[AIBOM](/patterns/aibom) indiquent quels snapshots ont alimenté quelle version de modèle, et le
   registre indique quels index et journaux chaque système écrit. Conservez une clé de personne
   pseudonyme pour qu'une demande puisse être appariée sans copier les identités dans la carte.
2. **Une demande, plusieurs gestionnaires.** Le routeur ouvre un ticket et le distribue à un
   gestionnaire par emplacement, chacun avec une réponse pré-convenue : supprimer des systèmes
   sources et snapshots ; supprimer ou réindexer les chunks de récupération immédiatement ;
   supprimer ou pseudonymiser les journaux dans la règle de rétention ; remplacer les
   enregistrements d'évaluation par des enregistrements synthétiques ; signaler chaque version de
   modèle entraînée sur un snapshot affecté.
3. **Une échelle pour les poids.** Suppression de sortie d'abord, comme un filtre construit sur des
   règles générales plutôt qu'une liste de noms, testé comme n'importe quel contrôle. Ensuite
   réentraînement sans les données, selon un calendrier qui regroupe les demandes. Oubli machine
   uniquement comme une affirmation à tester : les méthodes exactes telles que l'entraînement
   fragmenté limitent ce qui doit être réentraîné [6], et un test d'inférence d'appartenance sur les
   enregistrements supprimés vérifie le résultat [7].
4. **Portail la prochaine version.** Le portail de version vérifie que les effacements en attente
   sont appliqués à l'ensemble d'entraînement de la version candidate, de sorte qu'un réentraînement
   ne peut pas réintroduire silencieusement les données.
5. **Un enregistrement d'exécution par demande.** Le flux de travail l'écrit, pas le DPO : chaque
   emplacement, l'action entreprise, les versions de modèle affectées, le réentraînement programmé
   et si le délai a été respecté.

Enregistrement d'exécution illustratif pour une demande d'effacement contre `csa-01` :

```json
{
  "request_id": "dsr-2026-0412",
  "right": "erasure",
  "subject_key": "hash:7c1e09b4",
  "received_at": "2026-09-02",
  "due_by": "2026-10-02",
  "locations": [
    { "store": "crm", "action": "deleted" },
    { "store": "rag_index:csa-kb@2026-09", "action": "deleted_and_reindexed" },
    { "store": "fine_tune_set:csa-ft-07", "action": "deleted" },
    { "store": "logs:csa-01", "action": "deleted" },
    { "store": "eval_set:csa-regression-v9", "action": "replaced_with_synthetic" },
    { "store": "weights:csa-01@2026-08-30", "action": "output_suppression", "rule": "dsr-0412" }
  ],
  "models_flagged": ["csa-01@2026-08-30"],
  "retrain_scheduled": "csa-01@2026-10-15",
  "closed_at": "2026-09-30",
  "within_deadline": true
}
```

> **Exemple (illustratif)** Un client demande à l'opérateur d'un assistant d'assistance d'effacer
> ses données. Le routeur trouve la personne dans le CRM, un index de récupération, un snapshot
> d'ajustement fin et 90 jours de journaux. Quatre gestionnaires suppriment dans un jour ; les poids
> reçoivent un filtre de sortie, testé par rapport aux propres enregistrements du client, et le
> prochain réentraînement programmé supprime le snapshot. L'enregistrement d'exécution va au dossier
> du client et au magasin d'assurance.

## Conséquences
Les demandes se ferment à temps avec des preuves par emplacement, et le délai entre la suppression
et le réentraînement est visible et daté plutôt que caché. Le coût est une traçabilité suffisamment
bonne pour construire la carte de données, des gestionnaires pour chaque magasin, et une capacité de
réentraînement. Les filtres de suppression fuient sous les invites adversariales, donc ce sont une
mesure provisoire avec une date d'expiration, pas la réponse.

## Motifs connexes
[AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondances :** RGPD Art. 12(3), Arts. 15–17, Art. 21 · EU AI Act Art. 26(6) · ISO/IEC 42001
A.7 · NIST AI RMF MEASURE 2.10, GOVERN 1.1 · OWASP LLM02:2026 · Layer 02 Inventory & Transparency /
Layer 05 Assurance & Continuous Compliance.

Les ids de menace suivent le Top 10 OWASP pour les applications LLM 2026 [8], les ids de contrôle
ISO/IEC 42001 Annex A [9] et les ids de sous-catégorie le NIST AI RMF [10]. Les mappages sont
illustratifs, pas une affirmation de conformité.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 12(3) one month, extendable by two further months; Arts. 15, 16, 17, 21). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity test at para 43; elements and documentation for the controller's evidence at paras 49–58). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[3] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; identification in training sets; retraining; output filters based on general rules; one month plus two). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[4] Discussion Paper: Large Language Models and Personal Data (storing an LLM is not processing; rights attach to system inputs and outputs). Hamburg Commissioner for Data Protection and Freedom of Information. 2024-07-15. https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf (verified: primary)
[5] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(6) deployers keep automatically generated logs for at least six months, unless Union or national law provides otherwise). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[6] Bourtoule et al., "Machine Unlearning" (SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[7] Shokri et al., "Membership Inference Attacks against Machine Learning Models" (arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[8] OWASP Top 10 for LLM Applications 2026 (LLM02 Sensitive Information Disclosure). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[9] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.7 data for AI systems). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[10] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.1 legal and regulatory requirements understood, managed and documented; MEASURE 2.10 privacy risk examined and documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
