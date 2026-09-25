---
lang: fr
source: bok/patterns/ai-threat-model.md
sourceHash: "c6e202cafb0a952d2c1905a3058a54e99ecf670f49c955b26240308a2cc50482"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: ai-threat-model
title: AI Threat Model
layer: 1
secondaryLayer: 3
order: 19
summary: "Un modèle de menace versionnée par système d'IA : STRIDE étendu avec des attaques spécifiques à l'IA, où chaque menace se résout en une atténuation et le test qui le prouve."
---

# Motif : AI Threat Model

**Résumé :** Modélisez les menaces pour chaque système d'IA lors de l'examen de conception en tant
que fichier de données versionnée, non une diapositive : décomposez ses flux de données, énumérez
les menaces par élément avec une liste de contrôle classique telle que STRIDE étendu avec les
attaques spécifiques à l'IA que MITRE ATLAS, NIST AI 100-2 et les listes OWASP cataloguent, et
exigez que chaque menace au-dessus de la tolérance se résolve en une atténuation et en le test qui
prouve que l'atténuation fonctionne. Le modèle de menace décide ce que la suite de red-team, les
guardrails et les contrôles de la chaîne d'approvisionnement couvrent, et il est rouvert chaque fois
que le système ou le catalogue des menaces change.

## Objectifs
Transformez « qu'est-ce qui peut mal tourner ? » en une chaîne traçable de menace, atténuation et
test, de sorte que les contrôles de sécurité d'un système d'IA sont choisis à partir de sa
conception plutôt que par habitude, et un auditeur peut voir que chaque classe d'attaque connue a
été considérée et soit traitée, soit acceptée par un propriétaire nommé.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur en sécurité, ingénieur ML, équipe plateforme.

## Parties prenantes affectées
Utilisateurs et personnes affectées par les résultats du système, personnes concernées dont les
données l'ont entraîné ou l'alimentent, propriétaires de modèles, fonction CISO, auditeurs et
autorités de surveillance du marché.

## Principes pertinents
Commencez par un mode de défaillance ou un préjudice nommé ; construisez le contrôle au point le
plus précoce où il peut bloquer ; donnez des dents à chaque contrôle.

## Contexte
Un examen de conception pour un système qui s'entraîne ou affine sur des données externes, récupère
des documents, appelle des outils ou sert un modèle via une API. Les équipes de sécurité modélisent
déjà les menaces pour les logiciels, souvent avec STRIDE (usurpation d'identité, falsification,
répudiation, divulgation d'informations, déni de service, élévation de privilège) dans le cadre d'un
cycle de vie de développement sécurisé [1]. L'IA ajoute une surface d'attaque que ces six mots ne
nomment pas : données d'entraînement, composants pré-entraînés, prompts, corpus de récupération et
l'API d'inférence elle-même. Les conseils de Microsoft pour les systèmes d'IA et d'apprentissage
automatique énoncent clairement le changement de portée : « Les magasins de données d'entraînement
et les systèmes qui les hébergent font partie de votre portée de modélisation des menaces » [2].

## Problème
Les menaces qui importent le plus pour un système d'IA sont celles qu'un examen générique ne pose
pas.

- **Forces.** La sécurité veut de la profondeur, le produit veut de la vitesse. Les catalogues
  d'attaques IA sont volumineux et évoluent : la version 2026.09 des données MITRE ATLAS a été
  expédiée le 15 sep 2026 [3]. Un modèle de menace écrit en tant que document est obsolète au
  prochain changement. Les red teams testent ce à quoi elles pensent, ce qui n'est pas toujours ce
  que la conception expose.
- **Mode de défaillance.** La suite de red-team et les guardrails sont choisis par habitude. Les
  menaces spécifiques au système (un corpus empoisonné, des poids falsifiés, l'extraction via l'API,
  un outil accordé plus de portée que la tâche n'en a besoin) n'ont pas de propriétaire et pas de
  test. Après un incident, personne ne peut montrer que la menace a jamais été considérée.

## Solution
Gardez le modèle de menace à côté du dossier de conception, en tant que données, et faites échouer
l'examen de conception quand il est incomplet.

1. **Portée à partir de la conception.** Décomposez les flux de données (sources de données,
   pipeline d'entraînement, artefact de modèle et registre, corpus de récupération, prompts, outils,
   API d'inférence, consommateurs en aval) et marquez les limites de confiance. Les magasins de
   données d'entraînement et le registre de modèles sont dans la portée [2].
2. **Posez les quatre questions.** Le Threat Modeling Manifesto encadre le travail comme « Sur quoi
   travaillons-nous ? », « Qu'est-ce qui peut mal tourner ? », « Qu'allons-nous faire à ce sujet ? »
   et « Avons-nous fait un travail suffisamment bon ? » [4]. Le premier est le diagramme de flux de
   données ; les deux suivants sont les lignes ci-dessous ; le dernier est la porte.
3. **Énumérez par élément, puis étendez.** Parcourez chaque élément avec STRIDE [1], puis ajoutez
   les classes spécifiques à l'IA : les attaques d'évasion, d'empoisonnement, de confidentialité et
   d'abus de NIST AI 100-2 E2025 [5], les techniques de MITRE ATLAS [3], et le OWASP Top 10 for LLM
   Applications 2026 [6] et for Agentic Applications 2026 [7] pour les systèmes génératifs et
   agentiques. Le tableau est une liste de contrôle de départ, pas une liste complète.

   | Catégorie STRIDE | Lecture spécifique à l'IA | Identifiants du catalogue (exemples) |
   |---|---|---|
   | Usurpation d'identité | Une origine de modèle ou de jeu de données contrefaite ; un agent ou serveur d'outils usurpé | `AML.T0010.003`; `ASI03`, `ASI04` |
   | Falsification | Données d'entraînement empoisonnées ; un modèle manipulé ; instructions injectées via du contenu récupéré | `AML.T0020`, `AML.T0018`, `AML.T0051.001`; `LLM05:2026`, `LLM01:2026` |
   | Répudiation | Une action d'agent sans identité attribuable ; une décision sans enregistrement | `ASI03` |
   | Divulgation d'informations | Inférence d'appartenance, inversion de modèle ou extraction de modèle via l'API d'inférence | `AML.T0024.000`, `AML.T0024.001`, `AML.T0024.002` |
   | Déni de service | Consommation illimitée de tokens, de calcul ou d'appels d'outils | `LLM06:2026` |
   | Élévation de privilège | Agentivité excessive ou mauvaise utilisation d'outils ; un fichier de modèle qui exécute du code au chargement | `LLM03:2026`, `ASI02`; `AML.T0011.000` |

4. **Évaluez et décidez.** Évaluez chaque menace sur les échelles de probabilité et de gravité de
   l'organisation et décidez : atténuer, éviter, transférer ou accepter. Une menace acceptée devient
   une entrée de registre des risques avec un accepteur nommé ; une menace atténuée nomme ses
   contrôles.
5. **Fermez la boucle avec un test.** Chaque menace atténuée porte l'identifiant du test qui prouve
   l'atténuation : un cas de red-team, une évaluation, une vérification de pipeline (une signature
   ou vérification de hachage), un test de guardrail. L'examen de conception est une porte : il
   échoue tant que toute menace au-dessus de la tolérance n'a pas d'atténuation ou pas de test.
6. **Rouvrez sur déclencheurs.** Un nouvel outil, source de données, modèle ou exposition, un
   incident ou un quasi-accident, ou une technique pertinente nouvelle dans les catalogues rouvre le
   modèle. Parce que le fichier est versionné, la réouverture est un diff avec un relecteur.

Pour les systèmes à haut risque en vertu du Règlement de l'IA de l'UE, le résultat est également une
preuve de `Art. 15(5)` : résilience contre les tentatives de tiers non autorisés d'exploiter les
vulnérabilités, avec des solutions techniques qui incluent, le cas échéant, des mesures contre
l'empoisonnement des données, l'empoisonnement du modèle via « des composants pré-entraînés utilisés
dans l'entraînement », les exemples adversariels, les attaques de confidentialité et les défauts de
modèle [8]. Les fournisseurs de modèles à usage général présentant un risque systémique doivent
assurer « un niveau adéquat de protection de la cybersécurité » pour le modèle et son infrastructure
physique (`Art. 55(1)(d)`) [8]. L'AI RMF demande que la sécurité et la résilience soient « évaluées
et documentées » (MEASURE 2.7) [9].

Entrée de menace illustrative, une ligne du fichier de données du modèle :

```json
{
  "threat_id": "TM-support-rag-07",
  "system": "support-rag@2026-09-20",
  "element": "retrieval corpus ingestion",
  "stride": "tampering",
  "ai_class": "indirect prompt injection through retrieved documents",
  "catalogue": ["AML.T0051.001", "LLM01:2026"],
  "likelihood": "likely",
  "severity": "major",
  "decision": "mitigate",
  "mitigations": ["source allow-list at ingestion", "input guardrail on retrieved chunks",
                  "read-only tool scope for the answering step"],
  "tests": ["redteam.planted-instructions.v3", "canary-docs.never-retrieved.v1"],
  "owner": "team-support-platform",
  "reviewed": "2026-09-22"
}
```

> **Exemple (illustratif)** L'examen de conception initial d'un assistant d'assistance a énuméré
> l'injection de prompt et s'est arrêté là. La marche du diagramme de flux de données élément par
> élément a ajouté trois lignes : les documents d'un wiki partenaire sont entrés dans le corpus sans
> révision, les poids du modèle ont été extraits d'un hub public par tag plutôt que par digest, et
> l'outil de ticket pouvait fermer n'importe quel ticket, pas seulement celui du demandeur. Chaque
> ligne a obtenu un contrôle et un test : une liste d'autorisation d'ingestion avec des cas
> d'instructions plantées, l'épinglage de digest avec une vérification de pipeline, et un outil
> limité avec un test de refus. La porte d'examen de conception échoue maintenant sur toute ligne de
> menace dont la liste `tests` est vide.

## Conséquences
La suite de red-team, les guardrails et les vérifications de la chaîne d'approvisionnement remontent
à des menaces nommées, et le dossier de sécurité pour une version est une requête sur le fichier.
Les coûts : la modélisation des menaces prend du temps qualifié ; les catalogues changent
mensuellement, donc quelqu'un possède l'examen delta ; et un modèle de menace n'est aussi bon que le
diagramme de flux de données, qui dérive à moins que le dossier de conception ne soit tenu à jour.

## Motifs connexes
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Model Artefact Integrity](/patterns/model-artefact-integrity);
[Dataset Admission Gate](/patterns/dataset-admission-gate);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering).

**Correspondances :** Règlement de l'IA Art. 15(5), Art. 55(1)(d) · ISO/IEC 42001 A.6.2.2, A.6.2.4 ·
NIST AI RMF (Map 5.1; Measure 2.7) · OWASP LLM01:2026, LLM05:2026 · OWASP Agentic ASI02/ASI03/ASI04
· MITRE ATLAS · Couche 01 Gouvernance en tant que code / Couche 03 Évaluations et Red Teaming comme
Preuves.

Les identifiants de menace suivent le OWASP Top 10 for LLM Applications 2026 [6] et for Agentic
Applications 2026 [7] et MITRE ATLAS [3] ; les étiquettes de fonction et de sous-catégorie suivent
le NIST AI RMF [9] ; les identifiants ISO/IEC 42001 Annex A suivent un crosswalk publié, non le
texte de la norme [10]. Les mappages sont illustratifs, non une affirmation de conformité.

## Sources

[1] Threats: Microsoft Threat Modeling Tool (STRIDE model: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege; a core element of the Security Development Lifecycle). Microsoft Learn. 2017-08-17. https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats (verified: primary)
[2] Threat Modeling AI/ML Systems and Dependencies (A. Marshall, J. Parikh, E. Kiciman, R. Shankar Siva Kumar; supplements SDL threat modelling; "Training Data stores and the systems that host them are part of your Threat Modeling scope"). Microsoft Learn. 2019-11 (page dated 2025-03-12). https://learn.microsoft.com/en-us/security/engineering/threat-modeling-aiml (verified: primary)
[3] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0010.003 AI Supply Chain Compromise: Model; AML.T0011.000 User Execution: Unsafe AI Artifacts; AML.T0018 Manipulate AI Model; AML.T0020 Training Data Poisoning; AML.T0024.000 Infer Training Data Membership, .001 Invert AI Model, .002 Extract AI Model; AML.T0051.001 LLM Prompt Injection: Indirect). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[4] Threat Modeling Manifesto (definition: "analyzing representations of a system to highlight concerns about security and privacy characteristics"; four key questions). Threat Modeling Manifesto working group. n.d. (accessed 2026-09-24). https://www.threatmodelingmanifesto.org/ (verified: primary)
[5] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (attack classes incl. evasion, poisoning, privacy compromises and misuse enablement). NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[6] OWASP Top 10 for LLM Applications 2026 (LLM01:2026 Prompt Injection, LLM03 Excessive Agency, LLM04 Supply Chain, LLM05 Data and Model Poisoning, LLM06 Unbounded Consumption). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[7] Top 10 for Agentic Applications 2026 (ASI01 to ASI10; ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse, ASI04 Agentic Supply Chain Vulnerabilities). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act): Art. 15(5) resilience against exploitation of vulnerabilities (data poisoning, model poisoning through pre-trained components, adversarial examples or model evasion, confidentiality attacks, model flaws); Art. 55(1)(d) cybersecurity protection for GPAI models with systemic risk (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 5.1 likelihood and magnitude of each identified impact; MEASURE 2.7 security and resilience "evaluated and documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.6.2.2 AI system requirements and specification, B.6.2.4 AI system verification and validation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
