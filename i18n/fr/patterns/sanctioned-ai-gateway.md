---
lang: fr
source: bok/patterns/sanctioned-ai-gateway.md
sourceHash: "88e9d0d9330fb56a063e5432a1a541f0b365831e5eb900ce73567c56aa2083c9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: sanctioned-ai-gateway
title: Sanctioned AI Gateway
layer: 4
secondaryLayer: 2
order: 28
summary: "Outils d'IA approuvés derrière une authentification unique et une passerelle qui applique les règles de classe de données, enregistre l'utilisation et vérifie une attestation d'utilisation acceptable actuelle."
---

# Motif : Sanctioned AI Gateway

**Résumé :** Placez les outils d'IA approuvés de l'organisation et les API de modèles derrière une
authentification unique et une passerelle qui applique la politique d'utilisation acceptable en tant
que code : règles de classe de données sur ce qui peut être envoyé, rédaction ou blocage où la
classe l'exige, un événement de décision par appel, et l'accès conditionné à une attestation
d'utilisation acceptable actuelle. La passerelle est le chemin autorisé, et elle est construite pour
être le plus facile ; la découverte trouve ce qui la contourne.

## Objectifs
Permettez au personnel d'utiliser les outils d'IA de manière productive tout en gardant les données
réglementées, confidentielles et secrètes hors des outils qui ne sont pas approuvés pour cela, et
transformez la politique d'utilisation acceptable d'une page de manuel en un contrôle qui décide et
laisse une trace.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur en sécurité, équipe de plateforme, approvisionnement.

## Parties prenantes affectées
Employés et prestataires, clients dont le personnel traite les données, comités d'entreprise ou
représentants des salariés, le DPO, fournisseurs d'outils d'IA.

## Principes pertinents
Rendez le chemin gouverné le plus facile ; construisez le contrôle au point le plus précoce où il
peut bloquer ; enregistrez et limitez chaque acteur avant qu'il n'agisse.

## Contexte
Le personnel adopte les outils d'IA plus vite que l'approvisionnement ne peut les approuver. Dans
une enquête de fournisseur de 2024 auprès de 31 000 travailleurs du savoir dans 31 pays, 78 % des
utilisateurs d'IA ont déclaré qu'ils apportent leurs propres outils d'IA au travail [1].
L'organisation a déjà une politique d'utilisation acceptable qui énumère les outils approuvés et les
entrées interdites par classe de données (voir
[utilisation acceptable de l'IA par le personnel](/bok/governance-program#acceptable-use-of-ai-by-staff)),
et le Reglamento de IA de la UE, tel que modifié par le Omnibus Digital, demande aux fournisseurs et
aux responsables du déploiement de prendre des mesures pour soutenir la maîtrise de l'IA du
personnel qui utilise l'IA en leur nom [2]. Le mode de défaillance est connu : le dossier sur
[code source collé dans un chatbot public](/cases/chatbot-code-leak-reported) (signalé) est la
version quotidienne, et la divulgation d'informations sensibles est une classe de risque nommée pour
les applications LLM [3].

## Problème
Une politique qui vit dans un manuel n'a pas de force : elle est lue une fois, attestée une fois et
jamais évaluée au moment où quelqu'un colle un dossier client dans un outil public. Bloquer chaque
outil public pousse l'utilisation sur des appareils personnels, où rien n'est vu. La découverte
seule trouve la fuite après qu'elle s'est produite.

### Enjeux
- **Commodité contre contrôle.** Chaque étape supplémentaire sur le chemin approuvé renvoie les gens
  au chemin non approuvé.
- **Inspection contre confidentialité.** Enregistrer les invites du personnel est en soi un
  traitement des données personnelles des employés, donc la passerelle garde ce dont le contrôle a
  besoin, aussi longtemps qu'il en a besoin [4].
- **Latence contre rédaction.** La classification du contenu et la rédaction ajoutent du temps à
  chaque appel.
- **Conditions du fournisseur contre dérive.** Un outil approuvé n'est sûr que selon les conditions
  selon lesquelles il a été approuvé, comme pas d'entraînement sur les entrées des clients, et ces
  conditions changent.

## Solution
Rendez une passerelle le chemin autorisé vers l'IA, et rendez-la le chemin le plus rapide.

1. **Un catalogue d'outils approuvés en tant que [Policy Card](/patterns/policy-card).** Chaque
   entrée nomme l'outil, les conditions contractuelles selon lesquelles il a été approuvé, les
   classes de données et les cas d'usage pour lesquels il est autorisé, et sa date d'examen. Le
   [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) l'alimente.
2. **Un chemin d'accès.** Les API de modèles sont atteintes via une passerelle d'IA ou un proxy LLM,
   et les outils basés sur navigateur via une authentification unique et une passerelle web
   sécurisée ou une politique de navigateur (catégories illustratives, non une liste de produits).
   Les comptes personnels sur les outils approuvés sont remplacés par des locataires d'entreprise.
3. **Règles de classe de données à la passerelle.** Un classificateur de contenu étiquette chaque
   demande par classe de données et la carte décide : autoriser, autoriser avec rédaction, ou
   bloquer avec une raison et un chemin vers l'outil approprié. La matrice de classe de données par
   rapport à l'outil provient de la politique d'utilisation acceptable.
4. **Accès sur attestation.** Le fournisseur d'identité accorde le rôle de passerelle uniquement
   tant qu'une attestation d'utilisation acceptable actuelle et son module de formation sont
   enregistrés (le
   [schéma d'enregistrement de formation](/resources/templates#schema-training-record)).
5. **Un événement de décision par appel.** La passerelle écrit un enregistrement de preuve signé
   (décision, classe de données, outil, rédactions, un hachage de l'entrée plutôt que l'entrée) dans
   le magasin d'assurance, selon la forme du
   [schéma d'enregistrement de preuve](/resources/templates#schema-evidence-record).
6. **Découverte comme boucle de rétroaction.** [Shadow-AI Discovery](/patterns/shadow-ai-discovery)
   lit les données d'identité, de réseau et de dépenses pour les outils en dehors de la passerelle ;
   chaque découverte devient une demande d'admission (enregistrer, classer, approuver ou remplacer)
   avant de devenir une sanction.

Événement de décision de passerelle illustratif, en tant qu'enregistrement de preuve :

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/evidence-record.v1.json",
  "control_id": "gateway.data-class.confidential.v4",
  "subject": "genai-gateway@2026.09.2",
  "decision": "allow",
  "obligation": "ISO/IEC 42001 A.9.2",
  "failure_mode": "customer data sent to a tool not approved for it",
  "input_hash": "sha256:4be1c07e9d52",
  "actor": "user:pseudo-8841",
  "timestamp": "2026-09-18T09:12:44Z",
  "signature": "ed25519:MEUCIQDx3k",
  "extensions": {
    "tool": "drafting-assistant@enterprise",
    "data_class": "confidential",
    "action": "allowed_with_redaction",
    "redactions": 2,
    "attestation": "tr-2026-0877"
  }
}
```

> **Exemple (illustratif)** Une équipe juridique commence à utiliser un assistant de rédaction
> public pour les résumés de contrats. La découverte signale le trafic ; plutôt que de bloquer le
> domaine, le programme de gouvernance signe un accord d'entreprise sans entraînement sur les
> données des clients, ajoute l'outil au catalogue pour les données confidentielles avec rédaction
> des identifiants personnels, et l'achemine via la passerelle. L'utilisation passe au chemin
> autorisé en quelques semaines car c'est maintenant le plus facile.

## Conséquences
L'utilisation acceptable devient applicable et mesurable : l'organisation peut montrer ce qui a été
envoyé où, selon quelle règle, et combien d'utilisation se produit en dehors de la passerelle. Le
coût est la passerelle elle-même, l'affinage du classificateur (les faux blocages érodent rapidement
la confiance), la maintenance du catalogue à mesure que les conditions du fournisseur changent, et
le travail de confidentialité pour enregistrer proportionnellement. La passerelle couvre les outils
qu'elle fronts ; les modèles locaux et les appareils personnels restent un problème de découverte.

## Motifs connexes
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Policy Card](/patterns/policy-card);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondances :** EU AI Act Art. 4 · RGPD Art. 5(1)(c) · ISO/IEC 42001 A.2, A.9.2, A.10.3 · NIST
AI RMF GOVERN 2.2, GOVERN 6.1, MANAGE 3.1 · OWASP LLM02:2026 · Layer 04 Runtime Controls &
Observability / Layer 02 Inventory & Transparency.

Les identifiants de menace suivent le OWASP Top 10 for LLM Applications 2026 [3], les identifiants
de contrôle ISO/IEC 42001 Annex A [5] et les identifiants de sous-catégorie le NIST AI RMF [6]. Les
correspondances sont illustratives, non une affirmation de conformité.

## Sources

[1] "AI at Work Is Here. Now Comes the Hard Part" (2024 Work Trend Index; 31,000 people in 31 countries; 78% of AI users bring their own AI tools to work). Microsoft and LinkedIn. 2024-05-08. https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Art. 4 replaced: providers and deployers take measures to support the development of AI literacy); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] OWASP Top 10 for LLM Applications 2026 (LLM02 Sensitive Information Disclosure; ids used in the Maps to line). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[4] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 5(1)(c) data minimisation). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.2 policies related to AI; A.9.2 processes for responsible use of AI systems; A.10.3 suppliers). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[6] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 2.2 personnel and partners receive AI risk management training; GOVERN 6.1 policies for third-party AI risks; MANAGE 3.1 third-party risks regularly monitored). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
