---
lang: fr
source: bok/patterns/adversarial-red-team-suite.md
sourceHash: "c4d084fd1712d0e8721e2a1ba027323a2a5cdcd94936434061e34b761a4d8b51"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: adversarial-red-team-suite
title: Adversarial Red-Team Suite
layer: 3
order: 3
summary: "Une suite adversariale versionnée construite à partir d'une taxonomie des menaces, exécutée en CI ou selon un calendrier, dont les résultats sont triés, enregistrés et réutilisés comme tests."
---

# Motif : Adversarial Red-Team Suite

**Résumé :** Maintenez une suite de tests adversariaux versionnée, construite à partir d'une
taxonomie des menaces et exécutée en CI ou selon un calendrier, dont les résultats sont triés en
correctifs ou risques acceptés, enregistrés comme preuves et réutilisés dans la suite. Lorsqu'une
Eval Gate prouve qu'un seuil tient toujours, la suite de red-team est l'adversaire permanent qui
continue de trouver les entrées que le seuil n'a jamais anticipées.

## Objectifs
Transformez les tests adversariaux d'un exercice ponctuel en un contrôle maintenu et versionné qui
découvre les modes de défaillance avant qu'un attaquant ne le fasse et laisse un enregistrement trié
et auditable de chaque résultat.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur en sécurité, ingénieur ML, responsable de red-team.

## Parties prenantes affectées
Propriétaires de modèles, utilisateurs exposés au système, responsables des incidents, auditeurs,
régulateurs.

## Principes pertinents
Partez d'un mode de défaillance ou d'un préjudice nommé ; donnez des dents à chaque contrôle.

## Contexte
Un modèle ou un agent dont l'exposition augmente à mesure qu'il acquiert des outils, des invites et
de la portée, dans une organisation qui exécute déjà une Eval Gate pour la régression et souhaite un
adversaire permanent plutôt qu'un seul test de pénétration pré-lancement.

## Problème
Un red-team ponctuel est obsolète dès que le système change, et ses résultats, une diapositive de
jailbreaks, ne laissent aucune trace qu'ils ont été corrigés ou acceptés. Sans une suite versionnée
et un enregistrement de triage, la même attaque est redécouverte chaque trimestre et personne ne
peut prouver quels résultats ont été fermés.

## Solution
Construisez la suite à partir d'une taxonomie des menaces plutôt que de l'intuition : tirez les
techniques des tactiques et techniques adversariales pour les systèmes d'IA de MITRE ATLAS [1] et
des classes d'attaque agentic dans le Top 10 OWASP pour les applications agentic [2], de sorte que
chaque test trace une technique nommée. Versionnez la suite aux côtés du modèle et exécutez-la en CI
ou selon un calendrier par rapport à la version enregistrée. Acheminez chaque résultat par le triage
(corriger ou accepter avec une justification enregistrée et un propriétaire) et classez le résultat
comme un enregistrement de preuves structuré par rapport à l'entrée du registre. Réutilisez chaque
résultat confirmé dans la suite comme test de régression, de sorte qu'une attaque fermée reste
fermée. La suite complète l'Eval Gate : la gate applique un seuil à chaque version, la suite est
l'adversaire qui génère le suivant.

> **Exemple (illustratif)** Une suite de red-team pour un assistant de service client exécute un
> ensemble versionné de cas d'injection de prompt et d'abus d'outils tirés d'ATLAS et des classes
> agentic OWASP ; un nouveau résultat d'exfiltration d'outils est trié, corrigé et ajouté à la
> suite, de sorte que la version suivante doit le réussir.

### Du modèle de menace au plan de test

Une suite construite à partir d'une taxonomie a toujours besoin d'une raison pour chaque cas. Cette
raison est le modèle de menace du système tel que déployé, et l'étape qui transforme l'un en l'autre
est écrite, de sorte qu'un examinateur peut voir pourquoi la suite contient ce qu'elle contient et
ce qu'elle laisse de côté.

1. **Décomposez le système.** Tracez les flux de données tels qu'ils s'exécutent : utilisateurs,
   application, récupération, modèle, outils et leurs identifiants, mémoire et chaque consommateur
   en aval des résultats. Marquez chaque limite de confiance et marquez les composants que vous
   possédez et ceux qu'un fournisseur exécute.
2. **Énumérez les menaces par élément, par id.** Parcourez chaque élément par rapport aux catalogues
   spécifiques à l'IA : le Top 10 OWASP pour les applications LLM 2026 pour le modèle en tant que
   composant [3], le Top 10 OWASP pour les applications agentic pour les outils, la mémoire et la
   délégation [2], les techniques MITRE ATLAS pour le chemin de l'attaquant [1] et la taxonomie
   d'apprentissage automatique adversarial du NIST pour les attaques sur les modèles prédictifs et
   génératifs, telles que l'évasion, l'empoisonnement et les attaques de confidentialité [4]. Le
   profil de développement sécurisé du NIST pour l'IA générative demande exactement ceci : une
   modélisation des risques qui inclut les types de vulnérabilité et de menace spécifiques à l'IA
   (`PW.1.1`) [5]. Enregistrez chaque menace avec son id externe, de sorte que le modèle lit
   `LLM01:2026` ou `AML.T0051`, pas « risque d'injection ».
3. **Nommez le contrôle et le test qui le prouve.** Pour chaque menace dans le champ d'application,
   écrivez le contrôle censé l'arrêter et le test qui échouerait si le contrôle ne fonctionnait pas.
   Le test devient une entrée de suite dans le plan de test de la version, qui valide par rapport à
   [`test-plan.v1.json`](/schemas/test-plan.v1.json) : un id de suite versionné, la catégorie
   (`adversarial`, `security`, `privacy`), la métrique, un seuil fixé avant le test, le mode de
   défaillance qu'il protège et si une défaillance bloque la version.
4. **Marquez chaque cas avec ses ids de menace.** Un cas porte les ids des menaces qu'il exerce, et
   un résultat les hérite, de sorte qu'un résultat trace de la technique au contrôle à l'eval qui le
   protège maintenant, et un rapport de couverture peut lister les menaces dans le champ
   d'application qu'aucun cas n'exerce encore.
5. **Enregistrez ce qui est hors du champ d'application et pourquoi.** Une menace que le système ne
   peut pas affronter (pas d'outils, pas de mémoire, pas de données personnelles) est fermée avec
   une raison ; une menace que vous ne pouvez pas tester (les poids d'un fournisseur) est acheminée
   vers la [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) comme
   preuves attestées par le fournisseur. Réexécutez l'étape lorsque les flux de données changent :
   un nouvel outil, un nouveau corpus, un nouveau modèle.

Le [threat bridge](/resources/threats) contient le résultat des étapes 2 et 3 en tant que données
ouvertes : chaque ligne prend un id de menace externe aux modèles qui le contrôlent, un exemple
d'eval qui le teste et les obligations que la preuve aide à satisfaire.

```yaml
# one entry of the test plan's `suites`, derived from a threat (illustrative)
suite_id: indirect-injection.v4
category: adversarial
metric: attack success rate on planted instructions in retrieved documents
threshold: "<= 0.02"
direction: lower_is_better
failure_mode: >-
  agent follows instructions found in retrieved content
  (LLM01:2026, ASI01, AML.T0051.001, NISTAML.015)
blocking: true
```

## Conséquences
La couverture adversariale augmente au fil du temps au lieu de se réinitialiser à chaque lancement,
et l'enregistrement de triage montre ce qui a été trouvé, corrigé ou accepté. Le coût est la
maintenance de la taxonomie et de la suite, le calcul pour exécuter les cas adversariaux souvent, et
la discipline de trier chaque résultat plutôt que de le laisser s'évanouir. L'étape de modélisation
des menaces ajoute son propre entretien : le modèle devient obsolète le jour où un outil ou un
corpus est ajouté, il doit donc être réexécuté lors du changement, pas une fois par an.

## Motifs connexes
[Eval Gate in CI](/patterns/eval-gate-in-ci); [Runtime Guardrail](/patterns/runtime-guardrail);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Incident Pipeline](/patterns/incident-pipeline);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondances :** Reglamento de IA de la UE Art. 9, Art. 15, Art. 55 (GPAI) · ISO/IEC 42001 ·
NIST AI RMF (Measure) · OWASP Agentic ASI01/ASI02 · Layer 03 Evals & Red Teaming as Evidence.

Les IDs de menace suivent le Top 10 OWASP pour les applications agentic 2026 [2] et les étiquettes
de fonction le NIST AI RMF [6]. Les mappages sont illustratifs, non une déclaration de conformité.

## Sources

[1] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] OWASP GenAI LLM Top 10 2026 (LLM01 Prompt Injection to LLM10 Improper Output Handling; published 3 Aug 2026; canonical Markdown in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[4] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (predictive and generative AI attack classes with NISTAML identifiers). NIST. 2025-03-24. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[5] NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile (recommendation R1 on SSDF 1.1 task PW.1.1: include AI model-specific vulnerability and threat types in risk modelling). NIST. 2024-07. https://csrc.nist.gov/pubs/sp/800/218/a/final (verified: primary)
[6] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
