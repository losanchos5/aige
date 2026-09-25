---
lang: fr
source: bok/patterns/downstream-use-register.md
sourceHash: "f84d166dd4281cb06775468258a2e6c681be6b23130230ce233dc30679fcb3c7"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: downstream-use-register
title: Downstream Use Register
layer: 2
secondaryLayer: 1
order: 31
summary: "Utilisations prévues et interdites en tant que Policy Card, chaque consommateur des résultats d'un système enregistré par rapport à son entrée de registre, et la provenance estampillée sur les résultats."
---

# Motif : Downstream Use Register

**Résumé :** Enregistrez, par rapport à l'entrée de registre de chaque système, ce que ses résultats
peuvent et ne peuvent pas être utilisés pour et qui les consomme réellement : d'autres systèmes, des
équipes, des partenaires et des modèles entraînés sur eux. Les utilisations prévues et interdites
sont écrites en tant que Policy Card ; chaque consommateur est enregistré avec son utilisation, son
approbation et la re-test qui l'a autorisé ; les résultats portent la provenance et les mises en
garde afin qu'un consommateur sache ce qu'il utilise ; et l'utilisation hors objectif est surveillée
à l'exécution. L'utilisation secondaire, la dérive de fonction et les dommages en aval deviennent
visibles, et un changement ou une retraite peut atteindre tous ceux qu'il affecte.

## Objectifs
Prévoyez et limitez les utilisations pour lesquelles un système n'a pas été approuvé, rendez chaque
consommateur en aval de ses résultats connu et responsable, et donnez aux processus de changement,
d'incident et de retraite une liste de qui informer.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, propriétaire du système, équipe de plateforme de données,
responsable produit.

## Parties prenantes affectées
Personnes affectées par les décisions en aval, équipes consommatrices et partenaires, déployeurs du
système d'un fournisseur, auditeurs et autorités de surveillance du marché.

## Principes pertinents
Enregistrez et limitez chaque acteur avant qu'il n'agisse ; commencez par un mode de défaillance ou
un préjudice nommé ; rendez le chemin gouverné le plus facile.

## Contexte
Les systèmes sont utilisés pour plus que ce pour quoi ils ont été approuvés. Le Règlement de l'IA de
l'UE nomme le concept : l'utilisation indebue razonablement prévisible est l'utilisation non
conforme à la finalité prévue qui peut résulter d'un comportement humain ou d'une interaction avec
d'autres systèmes raisonnablement prévisibles (`Art. 3(13)`), les fournisseurs doivent évaluer les
risques en vertu de celui-ci (`Art. 9(2)(b)`), et un déployeur qui change la finalité prévue d'un
système de sorte qu'il devienne à haut risque assume les obligations du fournisseur
(`Art. 25(1)(c)`) [1]. Les fournisseurs de systèmes génératifs doivent marquer les résultats
synthétiques d'une manière lisible par machine (`Art. 50(2)`) [1], ce qui est une provenance qu'un
consommateur peut lire. Les résultats qui alimentent d'autres composants sont également une surface
d'attaque : la gestion incorrecte des résultats, où les résultats du modèle passent en aval sans
validation, est une classe de risque nommée [2], et dans les systèmes d'agents, l'erreur d'un agent
peut se propager à travers d'autres [3]. La gouvernance du déploiement et de l'utilisation inclut
désormais la prévision et la réduction des préjudices secondaires et en aval ; le Corps de
connaissances AIGP de l'IAPP le répertorie sous la compétence IV.C [4].

## Problème
Un registre enregistre les systèmes, non ce que leurs résultats deviennent. Un score de risque
approuvé pour prioriser l'examen manuel devient, un an plus tard, un refus automatique dans le
pipeline d'une autre équipe ; les résultats d'un modèle de synthèse sont récoltés comme données
d'entraînement ; un partenaire reçoit les résultats en vertu d'un contrat que personne ne relie au
registre. Aucun de ces consommateurs n'a été évalué, aucun n'est informé quand le modèle change, et
le runbook de retrait ne peut pas les trouver. Là où les résultats façonnent les données que la
version suivante apprend, la boucle de rétroaction est invisible aussi.

### Enjeux
- **Réutilisation contre finalité.** Réutiliser un bon modèle est bon marché et utile ; chaque
  réutilisation peut aussi être une nouvelle finalité non évaluée.
- **Ouverture contre contrôle.** Les résultats publiés via une API ou une plateforme de données sont
  faciles à consommer et difficiles à tracer.
- **Réserves contre utilisabilité.** Apposer la provenance et les limites sur chaque résultat ajoute
  du poids que les consommateurs peuvent retirer.
- **Prévision contre certitude.** L'abus doit être imaginé avant qu'il ne se produise, sans données
  pour prouver la prévision.

## Solution
Donnez à l'utilisation en aval un registre, et faites de l'enregistrement le seul moyen d'obtenir
les résultats.

1. **Utilisations comme [Policy Card](/patterns/policy-card).** Les utilisations prévues du système
   et son espace négatif (utilisations interdites, populations et contextes pour lesquels il n'a pas
   été validé) sont des règles sur une carte stockée avec l'entrée du registre du
   [Agent Registry](/patterns/agent-registry), non un paragraphe dans une fiche de modèle.
2. **Prévision avant le lancement.** Exécutez une prémort (« dans un an, cela a causé du tort :
   comment ? »), des cas d'abus écrits à côté des user stories, et une carte d'impact des parties
   prenantes qui inclut les personnes qui ne touchent jamais l'interface. Chaque mauvaise
   utilisation plausible devient une règle d'utilisation interdite ou un moniteur.
3. **Consommateurs comme entrées.** Chaque consommateur (un système, une équipe, un partenaire, un
   pipeline d'entraînement) est enregistré auprès du système producteur avec sa finalité, son
   approbation, le re-test qui a autorisé les résultats pour ce nouveau contexte et le contrat qui
   lie une partie externe. L'accès à l'API de résultat ou à la table est accordé par consommateur
   enregistré, donc un consommateur non enregistré n'a pas d'identifiant.
4. **Provenance sur les résultats.** Les résultats portent le système producteur et la version,
   l'utilisation prévue et une réserve, comme métadonnées qu'un consommateur peut lire (pour le
   contenu génératif, le marquage que le règlement sur l'IA exige des fournisseurs).
5. **Utilisation hors finalité comme signal.** Classifiez le trafic et les demandes des
   consommateurs par rapport à l'espace négatif et alertez sur ce qui en sort ; surveillez les
   résultats qui reviennent comme données d'entraînement (boucles de rétroaction).
6. **Propagation au changement.** Un changement de modèle, un incident ou un retrait lit le registre
   et notifie chaque consommateur via le
   [Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline).

Entrée illustrative du registre d'utilisation en aval :

```json
{
  "subject": "risk-score-02@4.1",
  "policy_card": "uses.risk-score-02.v3",
  "intended_uses": ["prioritise claims for manual review"],
  "prohibited_uses": ["automatic decline of a claim", "pricing", "use on commercial policies"],
  "consumers": [
    {
      "consumer": "claims-triage-service",
      "type": "system",
      "use": "queue ordering for human review",
      "approved_at": "2026-03-02",
      "retest": "eval:rs2-claims-triage-v3",
      "credential": "svc-claims-triage"
    },
    {
      "consumer": "reinsurance-partner-a",
      "type": "partner",
      "use": "aggregate statistics only, no row-level scores",
      "approved_at": "2026-05-11",
      "contract": "dpa-2026-017 schedule 3"
    }
  ],
  "output_stamp": ["producer", "version", "intended_use", "caveat"],
  "feedback_loop_check": "scores excluded from the training labels of risk-score-03",
  "reviewed_at": "2026-09-10"
}
```

> **Exemple (illustratif)** Une équipe de fraude demande des scores de risque au niveau des lignes
> pour refuser automatiquement les réclamations. La demande arrive comme une enregistrement de
> consommateur, rencontre une règle d'utilisation interdite sur la carte et va au comité comme une
> nouvelle finalité, où elle est refusée ; l'équipe reçoit un flux de priorité d'examen à la place.
> Quand le modèle est réentraîné, les deux consommateurs enregistrés reçoivent l'avis de changement
> et réexécutent leurs tests d'acceptation.

## Conséquences
L'utilisation secondaire est décidée plutôt que découverte, les consommateurs sont connus quand le
modèle change ou se retire, et les boucles de rétroaction sont vérifiées à dessein. Le coût est le
registre lui-même, le contrôle d'accès par consommateur sur les résultats, le re-test pour les
nouveaux contextes et la friction de refuser une réutilisation utile. L'enregistrement lie bien les
consommateurs internes ; les externes dépendent des termes du contrat et des droits d'audit.

## Motifs connexes
[Policy Card](/patterns/policy-card);
[Agent Registry](/patterns/agent-registry);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Correspondances :** Règlement de l'IA art. 3(13), art. 9(2)(b), art. 25(1)(c), art. 50(2) ·
ISO/IEC 42001 A.8.2, A.9.4, A.10.4 · NIST AI RMF MAP 1.1, MAP 3.3, MANAGE 1.4 · OWASP LLM10:2026,
OWASP Agentic ASI08 · Couche 02 Inventory & Transparency / Couche 01 Govern-as-Code.

Les identifiants de menace suivent le OWASP Top 10 for LLM Applications 2026 [2] et le OWASP Top 10
for Agentic Applications 2026 [3], les identifiants de contrôle ISO/IEC 42001 Annex A [5] et les
identifiants de sous-catégorie le NIST AI RMF [6]. Les mappages sont illustratifs, non une
affirmation de conformité.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 3(13) reasonably foreseeable misuse; Art. 9(2)(b) risks under reasonably foreseeable misuse; Art. 25(1)(c) changed intended purpose; Art. 50(2) machine-readable marking of synthetic outputs). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] OWASP Top 10 for LLM Applications 2026 (LLM10 Improper Output Handling). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI08 Cascading Failures). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: forecast and reduce risks of secondary or unintended uses and downstream harms; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.9.4 intended use of the AI system; A.10.4 customers). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[6] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 1.1 intended purposes and prospective settings documented; MAP 3.3 targeted application scope specified; MANAGE 1.4 negative residual risks to downstream acquirers and end users documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
