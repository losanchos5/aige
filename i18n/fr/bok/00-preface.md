---
lang: fr
source: bok/00-preface.md
sourceHash: "597a86da43989641cc3dbd772fc7bad71dee72e7408f4a33f88a9f7c6c54188f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 00. Préface

> Pourquoi ce livre existe, à qui il s'adresse et comment l'utiliser.

## Pourquoi cela existe

Il existe un manifeste pour l'ingénierie GRC. Il existe un manifeste pour l'agilité logicielle. Il
existe un catalogue de motifs pour l'IA responsable et un guide des douze facteurs pour les
applications cloud. Il n'existe rien qui vous dise comment *concevoir* la gouvernance des systèmes
d'IA : comment transformer une obligation du Règlement de l'IA ou un contrôle ISO 42001 en politique
en tant que code, une porte d'évaluation, un registre des agents et des preuves lisibles par machine
qu'un auditeur peut lire. Ce livre est la première tentative de le documenter.

Il existe parce que l'écart est désormais coûteux. La chose gouvernée (des modèles qui se
réentraînent, des prompts qui changent, des agents qui agissent de leur propre initiative) évolue
plus vite que n'importe quel document ne peut suivre. La gouvernance écrite sous forme de PDF et de
feuilles de calcul est obsolète avant d'être signée. La discipline qui comble l'écart est
l'ingénierie, appliquée à la gouvernance. Ce livre est son texte fondateur et sa référence de
travail.

## Qui l'a écrit et à partir de quoi

Le Body of Knowledge a été écrit par Jorge García Aibar, ingénieur en gouvernance de l'IA et en
confidentialité, s'appuyant sur deux ans et demi de conception et d'exploitation d'un cadre de
gouvernance de l'IA au sein d'une grande entreprise de télécommunications, situé entre les équipes
Juridique, Sécurité et Ingénierie, et couvrant les dimensions de gouvernance, sécurité, conformité,
métier et performance des modèles du risque lié à l'IA. La Thèse est la seule partie co-écrite du
projet, écrite par Jorge García Aibar et Aurélie Pols, qui travaille dans le domaine de l'IA
responsable, de la confidentialité et de la gouvernance des données. Rien dans ce livre ne divulgue
de détails internes d'un employeur ; lorsque la pratique est décrite, elle est générique (« dans une
grande entreprise de télécommunications »).

Il est construit à partir de trois éléments. D'abord, cette expérience opérationnelle : ce qui a
réellement tenu quand un modèle a changé un vendredi et qu'un agent a acquis un nouvel outil le
week-end. Deuxièmement, le précédent de l'**ingénierie GRC** : la communauté, le manifeste et le
corpus de pratiques qui, depuis environ 2024, ont transformé la gouvernance, le risque et la
conformité en un produit construit avec du code [1][2]. Troisièmement, le dossier public : le
Règlement de l'IA de l'UE et sa réforme Omnibus numérique, ISO/IEC 42001, le NIST AI RMF, les
travaux GenAI et Agentic de l'OWASP, la CSA, le Catalogue de motifs pour l'IA responsable du CSIRO,
et les cadres de sécurité propres des laboratoires de pointe. Chaque affirmation factuelle du livre
porte une citation sourcée et vérifiée.

## Qui devrait lire ceci

- **Les responsables de la gouvernance de l'IA** qui veulent arrêter de livrer des documents et
  commencer à livrer des contrôles. Le chapitre 12 met en place
  [le programme de gouvernance](/bok/governance-program#the-organisation-as-an-object-of-governance)
  qui donne à chaque contrôle un propriétaire.
- **Les ingénieurs en sécurité et les ingénieurs en sécurité de l'IA** qui étendent leurs modèles de
  menace aux modèles et aux agents. Commencez par
  [la couche 04 de la stack](/bok/the-stack#layer-04-runtime-controls--observability) et
  [la gouvernance des agents d'IA](/bok/governing-agents#what-makes-an-agent-a-governance-object).
- **Les ingénieurs en confidentialité et les DPO** qui veulent que FRIA et DPIA vivent en tant que
  code, pas en tant que PDF ponctuels. Le chapitre 19 applique
  [la loi sur la protection des données à l'IA](/bok/privacy-and-ai#principles-applied-to-ai), et le
  chapitre 18 couvre [la FRIA](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27).
- **Les ingénieurs MLOps et les ingénieurs de plateforme** à qui on demande de faire de la
  gouvernance une propriété du pipeline. Les chapitres 14 et 15 exécutent
  [la construction comme une chaîne de portes](/bok/governing-development#the-build-as-a-chain-of-gates)
  et
  [le cycle de vie du déploiement](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance).
- **Les responsables des risques et les CISO** qui possèdent la vue d'ensemble de l'entreprise sur
  le risque lié à l'IA. Le chapitre 13 compile
  [l'appétit pour le risque et la tolérance en portes](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates),
  et le chapitre 17 exécute
  [le cycle de vie de la réponse aux incidents](/bok/incidents#the-response-lifecycle).
- **Les cadres dirigeants et les membres du conseil** qui ont besoin de savoir si la gouvernance
  fonctionne. Le chapitre 12 nomme
  [les KPI et KRI qui remontent au conseil](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board).
- **Les avocats et les professionnels de la conformité qui veulent construire**, pour voir
  l'obligation transformée en un contrôle exécutable et une preuve lisible, et pour aider à la
  spécifier. La dernière partie lit
  [le Règlement de l'IA de l'UE](/bok/eu-ai-act#how-to-read-this-chapter),
  [la loi qui s'applique déjà](/bok/existing-law#how-to-read-this-chapter) et
  [les lois sur l'IA dans le monde](/bok/ai-laws-worldwide#the-landscape-at-a-glance) comme des
  artefacts à construire.
- **Les équipes du secteur public**, pour lesquelles plusieurs juridictions publient déjà des
  instruments dédiés. Le chapitre 21 couvre
  [les dossiers du secteur public du Royaume-Uni](/bok/ai-laws-worldwide#united-kingdom-principles-regulators-and-public-sector-records)
  et
  [la Directive du Canada sur la prise de décision automatisée](/bok/ai-laws-worldwide#canada-after-aida-the-directive-on-automated-decision-making).
- **Les petites organisations et les start-ups**, qui ont les mêmes obligations avec moins de
  personnes. Le chapitre 04 construit
  [la stack minimale viable pour une équipe d'une personne](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one).

Vous n'avez pas besoin d'écrire du code de production pour utiliser ce livre, mais vous devriez être
à l'aise près d'un pipeline. La discipline est une capacité que quiconque proche de la construction
peut développer, quel que soit le titre : un ingénieur en gouvernance de l'IA est défini par les
flux de travail qu'il possède, pas par le nom du rôle.

Le site web ajoute [une page d'accueil par audience](/for) ([ingénieurs](/for/engineers),
[CISO et responsables des risques](/for/ciso-risk), [conseil juridique et DPO](/for/legal-dpo),
[cadres dirigeants et conseils](/for/executives-board), [secteur public](/for/public-sector) et
[PME](/for/smes)) qui place les chapitres, motifs, modèles et outils dans l'ordre dont ce travail a
besoin.

## Comment utiliser ce livre

Le Body of Knowledge compte 24 chapitres en cinq parties. Lisez la première partie dans l'ordre :
elle établit le vocabulaire que chaque autre chapitre utilise. Après cela, lisez par partie, ou
suivez la question devant vous.

1. **[La discipline](/bok#part-discipline)** (chapitres 00–07) : la définition, pourquoi la
   discipline se forme maintenant, ses valeurs et principes, la stack à cinq couches, le catalogue
   de motifs, le rôle et le modèle de maturité.
2. **[Référence](/bok#part-reference)** (08–10) : la carte réglementaire qui transforme chaque
   obligation en un artefact et une couche, le glossaire et la liste de lecture. La plupart des
   chapitres pointent vers ceux-ci.
3. **[Fondations](/bok#part-foundations)** (11–13) : ce qui compte comme un système d'IA, le
   programme de gouvernance qui donne à chaque contrôle un propriétaire, et la boucle de risque qui
   dit à chaque contrôle à quel point il doit mordre.
4. **[Le cycle de vie](/bok#part-lifecycle)** (14–17 et 23) : développement, déploiement, équité et
   explicabilité, incidents et agents, chaque étape laissant un enregistrement qu'une porte lit.
5. **[Loi et normes](/bok#part-law)** (18–22) : le Règlement de l'IA de l'UE, la protection des
   données, l'autre loi qui s'applique déjà, les lois sur l'IA dans le monde, et les principes et
   normes.

La plupart des chapitres s'ouvrent avec un résumé « En un coup d'œil » et une liste de termes clés,
chacun lié à sa page de glossaire, et se terminent par « Ce que vous pouvez faire cette semaine ».
Les chapitres se lient les uns aux autres par section, de sorte qu'un sujet peut être suivi à
travers les parties. Sur le site web, les motifs, modèles, registre des obligations et boîte à
outils portent le même matériel sous une forme que vous pouvez copier dans un pipeline.

## Ce que ce n'est pas

Ce n'est pas une liste de contrôle de conformité, et ce n'est pas un avis juridique. Il ne vous dit
pas si votre système est conforme ; il vous dit comment construire les contrôles et les preuves qui
permettent à quelqu'un de qualifié de faire cet appel. Ce n'est pas un agenda de recherche en
sécurité de l'IA, un manuel MLOps, ou un guide d'achat de fournisseur ; les outils ne sont nommés
que comme des exemples illustratifs d'une catégorie, jamais comme des approbations. Et ce n'est pas
terminé. La version 0.5.0 est un brouillon public avec des lacunes délibérées ouvertes aux
contributions.

## Comment citer

> García Aibar, J. *AI Governance Engineering: The Body of Knowledge*, v0.5.0. 2026.
> https://aigovernanceengineer.com/bok. Sous licence CC BY 4.0.

Pour la Thèse, citez les deux co-auteurs :

> García Aibar, J., & Pols, A. *The AI Governance Engineering Thesis*, v0.5.0. 2026.
> https://aigovernanceengineer.com/thesis. Sous licence CC BY 4.0.

Citez un chapitre spécifique par son numéro et son titre (par exemple, « chapitre 01, La définition
»). Le foyer canonique de la Thèse est https://aigovernanceengineer.com/thesis et du Body of
Knowledge https://aigovernanceengineer.com/bok. Chaque chapitre porte sa propre liste de sources
numérotées ; le tableau consolidé se trouve dans `sources/SOURCES.md`.

## Versioning

Ceci est **v0.5.0**, un brouillon public. Le versioning est sémantique dans l'esprit : les versions
de correctif corrigent les faits et les fautes de frappe, les versions mineures ajoutent des
chapitres ou des motifs, et une 1.0 marquera le point où les chapitres de base (00–10) sont complets
et examinés. Chaque changement est enregistré dans `bok/CHANGELOG.md`. Parce que le paysage
réglementaire et des normes évolue (la réforme Omnibus numérique, les normes harmonisées en vertu de
JTC 21, les versions OWASP et CSA), les chapitres portent une date « actuel au » et devraient être
révisés.

## Comment contribuer

Ce livre accueille les contributions créditées. Pour contribuer :

1. Lisez `STYLEGUIDE.md` et suivez exactement le modèle de chapitre ou de motif.
2. Sourcez chaque affirmation factuelle. Utilisez le format de citation `[n]`}, balisez chaque
   source `primary`, `secondary` ou `reported`, et ajoutez la ligne à `sources/SOURCES.md`} sous la
   section de votre chapitre.
3. Ouvrez une demande de tirage. Pour signer la Thèse, ajoutez votre nom à `bok/CONTRIBUTORS.md`}.

Les règles existent pour que de nombreuses mains produisent un seul livre cohérent. Tout le reste
(les arguments, les motifs, les mappages) est ouvert pour que vous l'amélioriez.

**Correspondances :** cette préface ne fait aucune affirmation normative ; les normes qu'elle nomme
sont traitées en détail dans les chapitres 04, 05, 08, 18 et 22.

## Sources

[1] GRC Engineering Manifesto. grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
