---
lang: fr
source: bok/patterns/use-case-intake-risk-tiering.md
sourceHash: "350f07d369530791c00bd8f00f0e4131487f6317a6073ddfc68d8c3c121dac53"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: use-case-intake-risk-tiering
title: "Use-Case Intake & Risk Tiering"
layer: 1
secondaryLayer: 2
order: 18
summary: "Un chemin d'admission pour chaque cas d'usage de l'IA : un enregistrement de cas d'usage structuré, un niveau calculé à partir de son profil de risque, et les portes que ce niveau active."
---

# Motif : Use-Case Intake & Risk Tiering

**Résumé :** Acheminez chaque cas d'usage d'IA proposé, construit ou acheté, par une admission
unique qui rédige un enregistrement de cas d'usage structuré, le contrôle par rapport aux pratiques
interdites et à l'échelle de risque du règlement de l'IA, et calcule un niveau de risque interne à
partir des champs de profil déclarés. Le niveau, et non une réunion, décide quelles évaluations,
évaluations et approbations le système doit franchir avant son déploiement, et l'enregistrement
devient l'entrée de registre que chaque porte ultérieure lit.

## Objectifs
Faites de la première décision concernant un système d'IA une décision enregistrée et reproductible
: à quoi il sert, à quoi il ne doit pas servir, quel est son risque et, à partir de là, quelle
gouvernance il reçoit. Consacrez l'effort d'examen où se trouve le risque et laissez les cas d'usage
à faible risque passer rapidement sur un chemin balisé.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, propriétaire de produit, équipe de plateforme, examinateurs
juridiques et chargés de la protection des données.

## Parties prenantes affectées
Personnes affectées par les résultats du système, responsables du déploiement et opérateurs, comité
de gouvernance de l'IA, auditeurs, autorités de surveillance du marché.

## Principes pertinents
Construisez le contrôle au point le plus précoce où il peut bloquer ; rendez le chemin gouverné le
plus facile ; enregistrez et limitez chaque acteur avant qu'il n'agisse.

## Contexte
Une organisation où de nombreuses équipes proposent des fonctionnalités d'IA, et la plupart d'entre
elles achètent ou appellent des modèles plutôt que de les entraîner. Les demandes arrivent par
e-mail, dans des diapositives et dans des tickets d'approvisionnement, et chacune est examinée avec
les questions que l'examinateur se souvient. Le règlement de l'IA mesure la plupart des obligations
par rapport à la **destination**, qu'il définit comme incluant le contexte et les conditions
d'utilisation énoncés dans la notice d'utilisation, « les matériels et déclarations promotionnels ou
commerciaux » et la documentation technique (`Art. 3(12)`) [1]. Le NIST AI RMF demande que les
destinations et les paramètres soient « compris et documentés » (MAP 1.1) et que les tolérances de
risque soient « déterminées et documentées » (MAP 1.5) [2].

## Problème
Sans une admission unique, la gouvernance commence trop tard et s'adapte mal.

- **Forces.** Les examinateurs veulent que chaque cas d'usage soit évalué en profondeur ; les
  équipes veulent une réponse en quelques jours. La classification dépend de faits que seule
  l'équipe connaît : la destination, les personnes affectées, si le système profile les personnes.
  Un niveau négocié lors d'une réunion dérive avec celui qui y assiste. Un niveau qui n'est pas
  lisible par machine ne peut pas activer une porte.
- **Mode de défaillance.** Un cas d'usage à haut risque passe inaperçu en tant que « juste un pilote
  » tandis que les demandes à faible risque s'accumulent derrière lui. Personne ne peut montrer
  quels systèmes ont été classés, par qui, sur quels faits, ou pourquoi un système de l'Annexe III a
  été traité comme n'étant pas à haut risque.

## Solution
Construisez l'admission comme un chemin formulaire-plus-code qui aboutit à un enregistrement et un
niveau, pas en minutes.

1. **Capturez l'enregistrement du cas d'usage.** Un formulaire structuré court (destination,
   utilisations hors champ, utilisateurs et personnes affectées, autorité décisionnelle, métriques
   de succès, appétit d'erreur, sources de données, juridictions) rédige un stub de registre indexé
   par un identifiant. Réutilisez le
   [schéma d'enregistrement de cas d'usage](/resources/templates#schema-use-case-record) publié
   (`use-case-record.v1`) afin que le formulaire, le registre et les portes partagent une forme.
2. **Contrôlez avant de noter.** Exécutez d'abord le contrôle des pratiques interdites (`Art. 5`) :
   un résultat est bloqué à l'admission et jamais noté. Ensuite, placez le système sur l'échelle du
   règlement : un cas d'usage de l'Annexe III, avec le filtre `Art. 6(3)` et son remplacement (un
   système de l'Annexe III qui profile les personnes physiques est toujours à haut risque),
   obligations de transparence, ou un modèle à usage général. Un fournisseur qui s'appuie sur le
   filtre doit documenter son évaluation avant de mettre le système sur le marché et l'enregistrer
   (`Art. 6(4)`, `Art. 49(2)`) [1] ; l'enregistrement d'admission est cette documentation. L'Omnibus
   numérique a déplacé les obligations de haut risque de l'Annexe III au 2 décembre 2027 [3] : cela
   change quand les obligations s'appliquent, pas si la classification est enregistrée maintenant.
3. **Calculez le niveau interne.** Déclarez les champs de profil (autonomie, impact de la décision,
   exposition, réversibilité du pire résultat, groupes vulnérables, classe de données, dépendance
   tierce) et laissez une politique versionnée calculer le niveau. Le NIST AI RMF définit le niveau
   d'activité de gestion des risques par tolérance de risque (GOVERN 1.3) et demande la probabilité
   et l'ampleur de chaque impact identifié (MAP 5.1) [2]. La Directive du Canada sur la prise de
   décision automatisée applique la même idée dans l'administration publique, avec quatre niveaux
   d'impact définis en partie par la réversibilité et la durée [4]. Une équipe qui n'est pas
   d'accord avec son niveau change un facteur, avec preuve, dans un changement examiné ; le niveau
   suit.
4. **Liez le niveau aux portes.** Le niveau sélectionne les évaluations requises (AIPD, FRIA,
   diligence raisonnable du fournisseur), les catégories et seuils d'évaluation, les approbateurs et
   la cadence d'examen, afin que le pipeline lise ce qu'il doit appliquer. Le déploiement refuse
   tout système sans enregistrement d'admission (« pas de stub, pas de déploiement »), ce qui
   maintient l'inventaire complet par construction (GOVERN 1.6) [2].
5. **Rouvrez en cas de changement.** Une nouvelle destination, population, juridiction ou source de
   données, ou un consommateur qui déclare une utilisation sur la liste hors champ, réexécute
   l'admission et peut déplacer le niveau.

Enregistrement de cas d'usage illustratif à l'admission, valide par rapport à `use-case-record.v1`
(les champs de profil et la revendication de filtre se déplacent dans `extensions`) :

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/use-case-record.v1.json",
  "record_id": "uc-2026-042",
  "title": "Payslip field extraction for mortgage applications",
  "business_owner": "head-of-mortgage-operations",
  "intended_purpose": "Extract income fields from uploaded payslips into the application form for an underwriter to confirm; the affordability assessment is made elsewhere.",
  "out_of_scope_uses": ["affordability scoring", "automatic decline", "employment verification"],
  "users": ["mortgage underwriters"],
  "affected_persons": ["mortgage applicants"],
  "decision_authority": "human_decides",
  "ai_justification": {
    "alternatives_considered": ["manual keying", "template-based OCR"],
    "why_ai": "Payslip layouts vary too much for templates; every extracted field is confirmed by an underwriter."
  },
  "success_metrics": [
    { "metric": "field-level exact match on a frozen sample", "target": ">= 0.98", "direction": "higher_is_better" }
  ],
  "error_appetite": "A wrong income figure can distort an affordability decision; low-confidence fields are routed to manual keying.",
  "data_sources": [{ "name": "applicant payslips", "personal_data": true, "special_category": false }],
  "jurisdictions": ["ES", "PT"],
  "preliminary_classification": {
    "eu_ai_act_category": "minimal",
    "internal_tier": "medium",
    "rationale": "Preparatory task to an Annex III 5(b) assessment (Art. 6(3) filter claimed, no profiling); assessment documented and registered under Art. 6(4) and Art. 49(2)."
  },
  "assessments_required": ["dpia"],
  "decision": {
    "outcome": "approved_with_conditions",
    "conditions": ["Art. 49(2) registration before go-live", "monthly 2% sample checked against source payslips"],
    "decided_by": "ai-governance-review",
    "decided_at": "2026-09-22"
  },
  "register_entry": "mortgage-extract-01",
  "extensions": {
    "risk_profile": { "autonomy": "suggests", "decision_impact": "informs", "exposure": "customers",
                      "reversibility": "reversible", "vulnerable_groups": [], "data_class": "personal",
                      "third_party": ["ocr-vendor-02"] },
    "tier_rule": "tiering-policy.v3",
    "annex_iii_point": "5(b)",
    "art_6_3_condition": "preparatory_task",
    "profiling": false
  }
}
```

> **Exemple (illustratif)** Le formulaire d'admission d'une banque est assez court pour être terminé
> en une seule séance. Le contrôle des pratiques interdites et les questions de l'Annexe III
> s'exécutent d'abord ; la règle de niveau lit ensuite le profil. Un outil d'extraction de bulletin
> de paie atterrit dans le niveau moyen avec sa revendication de filtre `Art. 6(3)` enregistrée, il
> obtient donc un lien AIPD, une évaluation de précision d'extraction et une vérification mensuelle
> d'échantillon, pas un créneau de comité. Une deuxième demande, de classer les candidats par défaut
> prédit, déclenche le remplacement de profilage à la première question et est acheminée comme à
> haut risque avant que quiconque ne réserve une réunion.

## Conséquences
Chaque système a une destination, une classe et un niveau enregistrés avant de coûter du calcul ;
l'effort d'examen suit le risque ; l'inventaire est complet car le déploiement en dépend ; et chaque
classification est auditable jusqu'aux faits sur lesquels elle reposait. Les coûts : le formulaire
doit rester court ou les équipes le contournent ; la règle de niveau a besoin d'étalonnage et d'un
chemin d'appel ; et les faits auto-déclarés peuvent être erronés, donc l'admission a besoin de
vérifications ponctuelles par rapport à la découverte et l'approvisionnement.

## Motifs connexes
[Agent Registry](/patterns/agent-registry); [Policy Card](/patterns/policy-card);
[FRIA-as-Code](/patterns/fria-as-code);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery); [AI Threat Model](/patterns/ai-threat-model);
[Dataset Admission Gate](/patterns/dataset-admission-gate).

**Correspondances :** Règlement de l'IA Art. 3(12), Art. 5, Art. 6(3)–(4), Art. 49(2), Annexe III ·
ISO/IEC 42001 A.5.2, A.9.4 · NIST AI RMF (Govern 1.3, 1.6; Map 1.1, 1.5, 5.1) · Layer 01
Govern-as-Code / Layer 02 Inventory & Transparency.

Les étiquettes de fonction et de sous-catégorie suivent le NIST AI RMF [2] ; les identifiants
ISO/IEC 42001 Annexe A suivent un crosswalk publié, pas le texte de la norme [5]. Les mappages sont
illustratifs, pas une revendication de conformité.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 3(12) intended purpose (incl. "promotional or sales materials and statements"); Art. 5 prohibited practices; Art. 6(3) filter and profiling override, Art. 6(4) documented assessment before placing on the market; Art. 49(2) registration of systems concluded not high-risk under Art. 6(3); Annex III (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.3 level of risk-management activity by risk tolerance; GOVERN 1.6 inventory of AI systems; MAP 1.1 intended purposes and settings "understood and documented"; MAP 1.5 risk tolerances "determined and documented"; MAP 5.1 likelihood and magnitude of each identified impact). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[3] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689; OJ L, 24 July 2026; in force 27 Jul 2026; Annex III high-risk obligations moved to 2 Dec 2027. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[4] Directive on Automated Decision-Making (algorithmic impact assessment before production; Appendix B impact levels I to IV defined by reversibility and duration). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[5] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.5.2 AI system impact assessment process, B.9.4 intended use of the AI system; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
