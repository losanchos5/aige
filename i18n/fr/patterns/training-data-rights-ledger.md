---
lang: fr
source: bok/patterns/training-data-rights-ledger.md
sourceHash: "9b631239e9232bef3b67a7cf72410a930581d03bdd7d48f616d6851aea3fd522"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: training-data-rights-ledger
title: Training-Data Rights Ledger
layer: 2
order: 20
summary: "Un registre par source du droit de former : canal d'acquisition, licence, vérification de retrait et utilisations autorisées, joint à la lignée afin que chaque modèle connaisse ses sources."
---

# Motif : Training-Data Rights Ledger

**Résumé :** Conservez une ligne de registre par source d'entraînement (pas par ensemble de données
fusionné) qui enregistre comment les données ont été acquises, sous quelle licence ou base
juridique, si les réserves de droits ont été vérifiées et comment, et quels usages sont autorisés ;
puis joignez le registre à la lignée afin que chaque version de modèle énumère les lignes sur
lesquelles elle a été entraînée. Le registre répond à « avions-nous le droit d'utiliser ceci ? » par
source, et « quels modèles sont affectés ? » lorsqu'une licence, un retrait ou une ordonnance change
la réponse.

## Objectifs
Faites du droit de former un fait enregistré et interrogeable avant l'entraînement, et gardez-le
vrai après, afin qu'un retrait, une demande d'effacement ou une ordonnance judiciaire puisse être
satisfait pour les modèles affectés uniquement, et prouvé.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, responsables de l'acquisition et des licences de données,
intendants des données, conseil juridique et confidentialité, équipe de plateforme ML.

## Parties prenantes affectées
Titulaires de droits et éditeurs, personnes concernées, fournisseurs de modèles et déployeurs en
aval, Bureau de l'IA et autres autorités, tribunaux et régulateurs.

## Principes pertinents
Instrumentez la construction pour produire sa propre preuve ; construisez le contrôle au point le
plus précoce où il peut bloquer ; commencez par un mode de défaillance ou un préjudice nommé.

## Contexte
Un fournisseur qui entraîne ou affine des modèles sur un mélange de données internes, de corpus sous
licence, d'ensembles de données ouverts, de contenu web exploré et de données utilisateur, assemblés
par différentes équipes à différents moments. Les droits s'attachent par source et parfois par
enregistrement, mais l'entraînement consomme des corpus fusionnés.

## Problème
Les questions juridiques sont décidées par source ; les preuves sont généralement conservées, le cas
échéant, par projet.

- **Forces.** Pour le contenu rendu publiquement disponible en ligne, l'exception de l'UE pour
  l'exploration de textes et de données ne s'applique que lorsque le titulaire des droits n'a pas
  réservé ses droits « de manière appropriée, par exemple par des moyens lisibles par machine »
  (Directive DSM `Art. 4(3)`) [1], et un tribunal de Hambourg a jugé en décembre 2025 qu'une réserve
  écrite en termes de conditions d'utilisation en langage naturel ne répondait pas à cette norme,
  avec un appel ultérieur autorisé [2]. Un fournisseur de modèle à usage général doit conserver une
  politique de droits d'auteur qui identifie et respecte ces réserves et doit publier un résumé
  suffisamment détaillé du contenu d'entraînement (`Art. 53(1)(c)` et `(d)`) [3]. La façon dont les
  données ont été acquises importe autant que sa licence : dans *Bartz v. Anthropic*, le tribunal a
  séparé les livres légalement achetés et numérisés des téléchargements piratés [4]. Les données
  personnelles apportent la limitation de finalité et le test de compatibilité pour un traitement
  ultérieur (RGPD `Art. 5(1)(b)`, `Art. 6(4)`) [5].
- **Mode de défaillance.** Personne ne peut dire quelles sources ont entraîné quelle version de
  modèle, ou selon quels termes. Une seule source sans licence ou obtenue illégalement contamine
  chaque modèle entraîné sur elle, et les recours peuvent atteindre le modèle lui-même :
  l'ordonnance de la FTC contre Everalbum exigeait la suppression de « tous les modèles ou
  algorithmes développés en tout ou en partie en utilisant » les données utilisées illégalement [6].
  Sans lignée par source, la seule réponse sûre est de tout supprimer.

## Solution
Faites du registre le billet d'admission pour chaque source d'entraînement, et faites pointer la
lignée vers lui.

1. **Une ligne par source.** Enregistrez l'id et la version de la source, le canal d'acquisition
   (livraison sous licence, API, exploration, téléchargement utilisateur, système interne), le
   concédant, la référence de licence et ses termes pour l'entraînement, l'utilisation commerciale
   et la distribution de modèles dérivés, la base juridique lorsque les données sont personnelles,
   et les utilisations autorisées. Pour le contenu exploré, enregistrez l'identité de l'explorateur,
   la fenêtre et la vérification de réserve de droits : la méthode (par exemple `robots.txt` et
   métadonnées de page lues au moment de la récupération), le résultat et la date. Les obligations
   de gouvernance des données de la Reglamento de IA de la UE pour les systèmes à haut risque
   nomment les mêmes faits : « les processus de collecte de données et l'origine des données » et,
   pour les données personnelles, « l'objectif initial de la collecte de données » (`Art. 10(2)(b)`)
   [3].
2. **Porte sur la ligne.** La construction du corpus et la
   [Dataset Admission Gate](/patterns/dataset-admission-gate) échouent lorsqu'une source n'a pas de
   ligne de registre, lorsque ses termes ne permettent pas l'utilisation déclarée, ou lorsque sa
   vérification de réserve est manquante ou obsolète.
3. **Joignez le registre à la lignée.** Chaque exécution d'entraînement enregistre les lignes de
   registre (id et version) qu'elle a lues, et l'[AIBOM](/patterns/aibom) énumère les ensembles de
   données par version. La lignée rétroactive répond à « qu'a entraîné ce modèle ? » ; la lignée
   prospective répond à « quels modèles ont utilisé cette source ? », ce qui est la question qu'un
   retrait ou une ordonnance pose.
4. **Générez les divulgations.** Construisez le résumé du contenu d'entraînement GPAI sur le modèle
   de la Commission (obligatoire en vertu de `Art. 53(1)(d)`, applicable à partir du 2 août 2025,
   avec des modèles déjà sur le marché d'ici le 2 août 2027) [7] et la documentation de la
   Californie AB 2013 (en vigueur depuis le 1er janvier 2026, y compris les sources, les
   informations personnelles et l'utilisation de données synthétiques) [8] en tant que requêtes sur
   le registre, pas en tant que documents écrits de mémoire.
5. **Gérez le changement en tant qu'événement.** Une expiration ou un retrait de licence, une
   nouvelle réserve, une demande d'effacement ou une ordonnance marque les lignes affectées ; la
   lignée prospective énumère les modèles affectés ; et la correction (réentraînement sans la
   source, retrait du modèle, ou une décision documentée de s'appuyer sur une autre base) est
   enregistrée par rapport aux mêmes lignes avec une date et un approbateur.

L'AI RMF demande des politiques sur les risques tiers, « y compris les risques de violation des
droits de propriété intellectuelle ou d'autres droits d'un tiers » (GOVERN 6.1), et pour la
cartographie des risques juridiques des composants, « y compris l'utilisation de données ou de
logiciels tiers » (MAP 4.1) [9].

Ligne de registre illustrative pour une source explorée :

```json
{
  "source_id": "src-crawl-techdocs-2026q2",
  "version": "2026-06-30",
  "acquisition_channel": "crawl",
  "crawl": { "user_agent": "corp-trainbot/2.1", "window": "2026-04-01/2026-06-30" },
  "legal_basis": { "copyright": "DSM Directive Art. 4 (commercial TDM exception)",
                   "personal_data": "GDPR Art. 6(1)(f); assessment LIA-2026-019" },
  "reservation_check": { "method": "robots.txt and page metadata at fetch time",
                         "result": "412 domains excluded", "checked_at": "2026-06-30" },
  "licence": { "ref": null, "training": "exception_relied_on", "derived_model_distribution": "permitted" },
  "permitted_uses": ["pre-training of the doc-lm model family"],
  "trained_models": ["doc-lm@1.4.0"],
  "owner": "data-acquisition-lead",
  "reviewed": "2026-09-15"
}
```

> **Exemple (illustratif)** Un assistant de récupération d'éditeur a été construit sur un corpus que
> trois équipes avaient assemblé. Le registre a été ajouté après coup, une ligne par source : deux
> sources n'avaient pas de licence enregistrée et une avait été explorée à partir d'un site dont
> `robots.txt` interdisait l'explorateur. La construction du corpus échoue désormais sur une source
> sans ligne, les deux sources sans licence ont été supprimées et l'index reconstruit, et la
> reconstruction est enregistrée par rapport au même identifiant de registre. Lorsqu'un concédant a
> retiré une archive, la traçabilité avant a nommé les deux modèles affinés qui l'avaient lue.

## Conséquences
Le droit de former devient une preuve qui existe avant l'entraînement, les divulgations sont
générées plutôt que rédigées, et un changement de droits n'affecte que les modèles qui ont utilisé
la source. Les coûts : une ligne par source est un travail réel pour les grands explorateurs, donc
le pipeline d'exploration doit écrire les lignes lui-même ; les vérifications de réserve ne sont
aussi bonnes que la méthode enregistrée ; et le registre enregistre la position de l'organisation,
il ne règle pas les questions juridiques ouvertes.

## Motifs connexes
[Dataset Admission Gate](/patterns/dataset-admission-gate); [AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondances :** Règlement de l'IA Art. 10(2)(b), Art. 53(1)(c)–(d) · Directive (UE) 2019/790
Art. 4(3) · RGPD Art. 5(1)(b), Art. 6(4) · ISO/IEC 42001 A.7.3, A.7.5 · NIST AI RMF (Govern 6.1; Map
4.1) · Layer 02 Inventory & Transparency.

Les étiquettes de fonction et de sous-catégorie suivent l'AI RMF de NIST [9] ; les ids de l'annexe A
d'ISO/IEC 42001 suivent un crosswalk publié, pas le texte de la norme [10]. Les mappages sont
illustratifs, pas une affirmation de conformité.

## Sources

[1] Directive (EU) 2019/790 on copyright in the Digital Single Market, Art. 4 (text and data mining exception; 4(3) reservation of rights by machine-readable means for content made publicly available online). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[2] "Machine-readable opt-outs and AI training: Hamburg Court clarifies copyright exceptions" (Kneschke v. LAION, OLG Hamburg 5 U 104/24, 10 Dec 2025; natural-language reservations in terms of use insufficient; further appeal to the BGH allowed). Norton Rose Fulbright, Inside Tech Law. 2025-12. https://www.insidetechlaw.com/blog/2025/12/machine-readable-opt-outs-and-ai-training-hamburg-court-clarifies-copyright-exceptions (verified: secondary)
[3] Regulation (EU) 2024/1689 (AI Act): Art. 10(2)(b) data collection processes, origin of data and original purpose of collection; Art. 53(1)(c) copyright policy identifying reservations under Art. 4(3) of Directive (EU) 2019/790; Art. 53(1)(d) public summary of training content on the AI Office template (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] Bartz v. Anthropic PBC, No. 4:24-cv-05417 (N.D. Cal.): Order on Fair Use (Alsup, J., 23 Jun 2025, ECF 231) and Order Granting Final Approval of Class Action Settlement (Martínez-Olguín, J., 20 Jul 2026, ECF 680). CourtListener (court docket). 2026-07-20. https://www.courtlistener.com/docket/69058235/bartz-v-anthropic-pbc/ (verified: primary)
[5] Regulation (EU) 2016/679 (GDPR): Art. 5(1)(b) purpose limitation; Art. 6(4) compatibility of further processing. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[6] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed using users' biometric information, to be deleted within 90 days with a sworn statement). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[7] Template for general-purpose AI model providers to summarise their training content (template mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027; sources incl. scraped, user and synthetic data). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[8] AB 2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28; operative 2026-01-01; developers post training-data documentation incl. sources, personal information, copyright status and use of synthetic data). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 6.1 third-party risks incl. infringement of intellectual property or other rights; MAP 4.1 legal risks of components incl. third-party data or software). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.7.3 acquisition of data, B.7.5 data provenance; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
