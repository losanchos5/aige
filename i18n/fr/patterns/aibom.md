---
lang: fr
source: bok/patterns/aibom.md
sourceHash: "6e929d4beb125a7562e751991ab3082ab4a2d2a41c33715bf06e279fb4a112d5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: aibom
title: AIBOM
layer: 2
order: 5
summary: "Une nomenclature de matériaux d'IA émise à la construction, enregistrant les modèles, les jeux de données, les poids et leur provenance dans un format standard à côté de l'entrée de registre."
---

# Motif : AIBOM

**Résumé :** Générez une nomenclature de matériaux d'IA à la construction pour chaque système d'IA,
enregistrant les modèles, les jeux de données, les poids et leur provenance dans un format standard,
et stockez-la avec l'entrée de registre. L'AIBOM est ce que les couches de transparence et
d'évaluation lisent pour savoir quoi documenter et quoi tester.

## Objectifs
Rendez la composition et la provenance d'un système d'IA lisibles par machine, de sorte que le
risque de la chaîne d'approvisionnement et les obligations de transparence puissent être répondus à
partir d'un artefact, non reconstruits.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur ML, ingénieur en sécurité.

## Parties prenantes affectées
Propriétaires de modèles, déployeurs en aval, auditeurs, approvisionnement.

## Principes pertinents
Instrumentez la construction pour produire sa propre preuve ; partez d'un mode de défaillance ou
d'un préjudice nommé.

## Contexte
Systèmes d'IA assemblés à partir de modèles de base, d'ajustements fins, de jeux de données tiers et
de bibliothèques, où la SBOM classique capture les dépendances logicielles mais pas les modèles ou
les données.

## Problème
Sans nomenclature des matériaux pour les modèles et les données, une organisation ne peut pas
répondre à la question de savoir quelle version de modèle, de quelle provenance, entraînée sur
quelles données, se trouve dans un système donné, donc elle ne peut pas évaluer le risque de la
chaîne d'approvisionnement ni produire de documentation de transparence à la demande.

## Solution
Émettez un AIBOM à la construction dans un format standard, CycloneDX ML-BOM ou le profil IA SPDX
3.0, par exemple avec le générateur AIBOM OWASP [1] (illustratif), couvrant les modèles, les jeux de
données, les poids et leur provenance et licences. Attachez-le à l'entrée du registre et
régénérez-le à chaque construction afin qu'il ne s'écarte jamais du système déployé.

> **Exemple (illustratif)** L'AIBOM d'un assistant augmenté par récupération énumère le modèle de
> base, le modèle d'intégration, l'instantané du corpus et leurs licences ; quand une licence de
> corpus change, la différence apparaît dans l'AIBOM de la construction suivante.

## Conséquences
Les questions de chaîne d'approvisionnement et de provenance deviennent des requêtes ; les documents
de transparence peuvent être générés à partir de l'AIBOM. Le coût est l'intégration de la chaîne
d'outils et le maintien de la précision des métadonnées de provenance.

## Motifs connexes
[Agent Registry](/patterns/agent-registry);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal).

**Correspondances :** Règlement de l'IA Art. 11, Art. 53 (documentation GPAI) · ISO/IEC 42001 · NIST
AI RMF (Map) · CSA AICM · Couche 02 Inventory & Transparency.

Les étiquettes de fonction suivent le NIST AI RMF [2]. Les mappages sont illustratifs, pas une
affirmation de conformité.

## Sources

[1] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
