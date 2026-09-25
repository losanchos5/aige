---
lang: fr
source: bok/patterns/dataset-admission-gate.md
sourceHash: "2e990980e7b5e71079ebe1f603a788526c6583e366dfbe7ac2ee5cf6fc972584"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: dataset-admission-gate
title: Dataset Admission Gate
layer: 1
secondaryLayer: 2
order: 21
summary: "Une porte policy-as-code qui permet à un job d'entraînement, d'évaluation ou de récupération de lire uniquement les ensembles de données disposant d'un dossier d'admission complet et signé pour cet usage."
---

# Motif : Dataset Admission Gate

**Résumé :** Placez une porte devant chaque job qui lit des données pour entraîner, affiner,
valider, tester, évaluer ou construire un index de récupération : le job ne peut lire une version
d'ensemble de données que si un dossier d'admission existe pour elle, énumère le cas d'usage du job
parmi ses usages autorisés, et montre que les vérifications de droits, qualité, représentativité,
biais et intégrité ont réussi ou ont été levées par quelqu'un habilité à les lever. La vérification
est policy-as-code dans le pipeline, donc un champ manquant fait échouer l'exécution au lieu d'un
rappel dans un wiki.

## Objectifs
Décidez si les données peuvent être utilisées et si elles conviennent à l'objectif avant qu'un
modèle n'en apprenne, car un problème de qualité peut être corrigé plus tard et un problème de
droits ou d'empoisonnement souvent non.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, propriétaires et intendants de données, équipe de plateforme ML,
conseil en confidentialité, ingénieur de sécurité.

## Parties prenantes affectées
Personnes concernées et titulaires de droits, personnes affectées par les résultats du modèle (en
particulier les groupes sous-représentés dans les données), propriétaires de modèles, auditeurs et
organismes notifiés.

## Principes pertinents
Construisez le contrôle au point le plus précoce où il peut bloquer ; donnez à chaque contrôle du
poids ; instrumentez la construction pour produire sa propre preuve.

## Contexte
Les plateformes de données qui permettent à n'importe quelle équipe de lire n'importe quelle table
qu'elle peut atteindre, les magasins de fonctionnalités partagés entre les modèles et les jobs
d'entraînement lancés à partir de carnets. Pour les systèmes à haut risque, le Règlement de l'IA
transforme la gouvernance des données en exigences : les ensembles d'entraînement, de validation et
de test doivent être soumis à des pratiques qui couvrent, entre autres, leur origine, leur
préparation, l'« examen en vue de possibles biais » et les « mesures appropriées pour détecter,
prévenir et atténuer les biais possibles » (`Art. 10(2)(f)` et `(g)`), et doivent être « pertinents,
suffisamment représentatifs et, dans la mesure du possible, exempts d'erreurs et complets au regard
de la destination » (`Art. 10(3)`) [1]. Après l'Omnibus numérique, la base étroite pour le
traitement de catégories particulières de données à caractère personnel afin de détecter et corriger
les biais se trouve dans un nouveau `Art. 4a` [2].

## Problème
Les données entrent dans les modèles par le chemin de moindre résistance, et les raisons pour
lesquelles elles ne devraient pas le faire sont découvertes après l'entraînement.

- **Forces.** Les data scientists ont besoin de données rapidement et itèrent souvent. La personne
  qui souhaite qu'un ensemble de données soit utilisé ne doit pas être la seule à décider qu'il peut
  l'être. Les vérifications de droits, qualité et biais relèvent de propriétaires différents. Le
  traitement illégal au stade du développement peut affecter la légalité de l'utilisation ultérieure
  du modèle : le CEPD l'a dit dans son Avis 28/2024 [3]. Les données d'entraînement constituent
  également une surface d'attaque : ATLAS catalogue l'empoisonnement des données d'entraînement
  (`AML.T0020`) [4] et OWASP énumère l'empoisonnement des données et du modèle comme `LLM05:2026`
  [5].
- **Mode de défaillance.** Un modèle s'entraîne sur des données en dehors de sa portée de
  consentement, sur un échantillon qui manque la population qu'il servira, sur des étiquettes que
  personne n'a auditées ou sur un instantané que quelqu'un a altéré. Le problème apparaît en
  production ou lors d'un audit, et la correction est un réentraînement sur des données qui auraient
  dû être refusées en premier lieu.

## Solution
Donnez à chaque version d'ensemble de données un dossier d'admission, et faites en sorte que chaque
job de lecture de données en présente un.

1. **Rédigez le dossier d'admission.** Par version d'ensemble de données et par pipeline autorisé,
   réutilisez le
   [schéma de dossier d'admission d'ensemble de données](/resources/templates#schema-dataset-admission-record)
   publié (`dataset-admission-record.v1`) : le sujet, le pipeline (entraînement, affinage,
   validation, test, évaluation ou index de récupération), le système cible, la fiche de données
   liée, la décision (admettre, admettre avec conditions, rejeter), les vérifications avec
   l'obligation que chacune impose, le hachage de contenu de l'instantané admis, l'acteur et une
   signature.
2. **Vérifiez d'abord les droits.** La base légale et la compatibilité des objectifs pour les
   données à caractère personnel, la licence et la vérification de réserve de droits proviennent du
   [Training-Data Rights Ledger](/patterns/training-data-rights-ledger) ; une source sans ligne de
   registre échoue l'admission.
3. **Vérifiez l'adéquation à l'objectif.** Les mesures de qualité (exactitude des étiquettes,
   complétude, cohérence, actualité) sur le vocabulaire de la série ISO/IEC 5259 [6] ; la quantité
   par classe et par groupe par rapport aux tailles de cellule minimales du plan de test ; la
   représentativité par rapport à la population de déploiement énoncée dans le dossier de cas
   d'usage ; un examen de proxy et de biais avec le résultat enregistré ; et, où les données de
   catégories particulières sont utilisées pour la détection de biais, les conditions `Art. 4a` [2].
4. **Vérifiez l'intégrité.** Admettez un instantané adressé par contenu et signé ; re-vérifiez le
   hachage quand le job le lit ; exécutez des vérifications d'anomalies sur les données nouvelles ou
   ajoutées. ATLAS énumère « Sanitize Training Data » (`AML.M0007`) et « Maintain AI Dataset
   Provenance » (`AML.M0025`) parmi ses atténuations [4]. Enregistrez la provenance en termes W3C
   PROV (entités, activités et agents) [7] et émettez des événements de lignage (ensembles de
   données, jobs et exécutions) afin que chaque exécution d'entraînement nomme les dossiers
   d'admission qu'elle a lus [8].
5. **Séparez les responsabilités.** Le propriétaire des données est responsable et signe ;
   l'intendant des données exploite les vérifications ; un petit comité d'examen règle les
   admissions contestées. La liste de contrôle minimale vit en tant que code, donc ajouter une
   vérification est une modification examinée.
6. **Appliquez au moment de la lecture.** Le job présente son id de cas d'usage et son système cible
   ; la politique refuse la lecture à moins que le dossier n'admette ce pipeline pour cet usage. Une
   feuille de données lisible accompagne le dossier, couvrant la motivation, la composition, la
   collecte, le prétraitement, les usages, la distribution et la maintenance [9].
7. **Re-admettez en cas de changement.** Une nouvelle version, une nouvelle source, une dérive de
   qualité, un changement de licence, une demande d'effacement ou un nouveau cas d'usage rouvre
   l'admission.

Le NIST AI RMF demande que les considérations relatives à la collecte et à la sélection des données
(disponibilité, représentativité, adéquation) soient « identifiées et documentées » (MAP 2.3) et que
les risques juridiques des données tierces soient cartographiés (MAP 4.1) [10].

Dossier d'admission illustratif, valide par rapport à `dataset-admission-record.v1` :

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/dataset-admission-record.v1.json",
  "control_id": "data.admission.v2",
  "subject": "claims-2019-2025@v4",
  "pipeline": "training",
  "target_system": "fraud-triage@3.0.0",
  "dataset_card": "https://evidence.example.org/cards/claims-2019-2025/v4",
  "decision": "admit_with_conditions",
  "checks": [
    { "check_id": "ledger.rows_present", "requirement": "Training-data rights ledger", "result": "pass" },
    { "check_id": "lawful_basis.compatible", "requirement": "GDPR Art. 6(4)", "result": "pass",
      "detail": "compatibility assessment CA-2026-014" },
    { "check_id": "use_case.permitted", "requirement": "uc-fraud-triage-03", "result": "pass" },
    { "check_id": "quality.label_agreement", "requirement": "EU AI Act Art. 10(3)", "result": "pass",
      "detail": "0.91 inter-annotator agreement" },
    { "check_id": "representativeness.region", "requirement": "EU AI Act Art. 10(3)", "result": "waived",
      "detail": "islands region below minimum cell; waiver W-2026-007 signed by data owner" },
    { "check_id": "bias.examination", "requirement": "EU AI Act Art. 10(2)(f)-(g)", "result": "pass" },
    { "check_id": "integrity.snapshot_hash", "result": "pass" }
  ],
  "conditions": ["collect islands-region claims before the next retrain", "report the islands cell as insufficient data"],
  "input_hash": "sha256:3b7e9c2a41f08d6e5c1b2a9f7e3d4c5b6a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d",
  "actor": "ci-data-gate",
  "timestamp": "2026-09-20T10:12:00Z",
  "signature": "ed25519:Hk3v8QpZ2sL7dT4rW9xY1aB6cE0fG5jM"
}
```

> **Exemple (illustratif)** Une équipe de triage des fraudes a pointé un job d'entraînement vers
> l'entrepôt complet des sinistres. La porte l'a refusé : l'entrepôt n'avait pas de dossier
> d'admission pour l'entraînement, et deux de ses sources n'avaient pas de ligne de registre.
> L'équipe a admis un instantané plus étroit à la place, avec une vérification de représentativité
> levée par écrit et une condition de collecter des données pour la région manquante avant le
> prochain réentraînement. La levée et la condition apparaissent maintenant dans la fiche de modèle,
> et le prochain réentraînement ne peut pas commencer tant que la condition n'est pas fermée.

## Conséquences
Aucun modèle n'apprend de données qui n'ont jamais été admises pour son usage ; les vérifications de
droits, qualité et biais laissent des preuves avant l'entraînement plutôt que des explications après
; et la lignée directe peut trouver chaque modèle qu'un mauvais ensemble de données a atteint. Les
coûts : la porte ralentit le travail exploratoire à moins qu'un pipeline sandbox avec sa propre
admission plus légère n'existe ; les levées ont besoin d'un propriétaire et d'une expiration ou
elles deviennent la norme ; et les vérifications ne sont aussi bonnes que les seuils derrière elles.

## Motifs connexes
[Training-Data Rights Ledger](/patterns/training-data-rights-ledger);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering);
[Fairness Eval Suite](/patterns/fairness-eval-suite); [AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card); [AI Threat Model](/patterns/ai-threat-model).

**Correspondances :** Règlement de l'IA Art. 10(2)–(4), Art. 4a · RGPD Art. 5(1)(b), Art. 6(4) ·
ISO/IEC 42001 A.7.2, A.7.4, A.7.5, A.7.6 · NIST AI RMF (Map 2.3, 4.1) · OWASP LLM05:2026 · Layer 01
Govern-as-Code / Layer 02 Inventory & Transparency.

Les identifiants de menace suivent le OWASP Top 10 for LLM Applications 2026 [5] et MITRE ATLAS [4]
; les étiquettes de fonction et de sous-catégorie suivent le NIST AI RMF [10] ; les ids ISO/IEC
42001 Annex A suivent une correspondance publiée, non le texte de la norme [11]. Les correspondances
sont illustratives, non une déclaration de conformité.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 10 (data and data governance: 10(2)(f) examination in view of possible biases, 10(2)(g) measures to detect, prevent and mitigate them; 10(3) relevant, sufficiently representative, free of errors and complete; 10(4) setting of use) (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on processing special categories of personal data for bias detection and correction, replacing Art. 10(5)); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity of models; legitimate interest; consequences of unlawful processing in development). European Data Protection Board. 2024-12. https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en (verified: primary)
[4] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0020 Training Data Poisoning; mitigations AML.M0007 Sanitize Training Data and AML.M0025 Maintain AI Dataset Provenance). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[5] OWASP Top 10 for LLM Applications 2026 (LLM05:2026 Data and Model Poisoning). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[6] ISO/IEC 5259 series, Data quality for analytics and machine learning (ML): Part 1 overview, terminology and examples (2024); Part 2 data quality measures (2024); Part 3 data quality management requirements and guidelines (2024); Part 4 data quality process framework (2024); Part 5 data quality governance framework (2025). ISO/IEC. 2024–2025. https://www.iso.org/standard/81088.html (verified: primary)
[7] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[8] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs, with facets). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[9] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[10] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 2.3 data collection and selection considerations "identified and documented"; MAP 4.1 legal risks of components incl. third-party data). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[11] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.7.2 data for development and enhancement, B.7.4 quality of data, B.7.5 data provenance, B.7.6 data preparation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
