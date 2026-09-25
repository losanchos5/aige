---
lang: fr
source: bok/07-maturity-model.md
sourceHash: "541c28ee31cef3e3713b5b858d53c65c0157543b0cc3a6b894e8d1e6f9893a7e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 07. Modèle de maturité (cinq niveaux)

> Une échelle du papier à la production (Documenté, Inventorié, Testé, Appliqué, Continu), où chaque
> niveau est prouvé par ce que les systèmes en cours d'exécution peuvent montrer, non par ce qu'un
> document prétend.

## Pourquoi un modèle de maturité, et comment lire celui-ci

Les modèles de maturité échouent quand ils mesurent la paperasse. Celui-ci mesure les systèmes. Un
niveau n'est pas une note que vous vous attribuez ; c'est un état que vous pouvez démontrer en
interrogeant le registre, en exécutant la gate et en lisant le magasin de preuves. L'échelle va de
la gouvernance qui n'existe que sur papier à la gouvernance qui s'exécute continuellement hors du
chemin de données à l'exécution.

Les cinq niveaux répondent aux trois questions avec une confiance croissante. **Documenté** et
**Inventorié** répondent à *quelle IA s'exécute*, d'abord sur papier, puis à partir d'un inventaire
en direct. **Testé** et **Appliqué** répondent à *ce qu'il est autorisé à faire*, d'abord en
mesurant, puis en bloquant. **Continu** répond à *quelle preuve le prouve*, continuellement, à
partir de la télémétrie. Chaque niveau est évalué sur les cinq couches du stack (chapitre 04) ; vous
êtes à un niveau seulement quand chaque couche l'a atteint, car une chaîne n'est aussi solide que
son maillon le plus faible.

## Les cinq niveaux

**Niveau 1 : Documenté.** La gouvernance existe sous forme d'artefacts qu'un humain maintient : un
PDF de politique, un inventaire de feuille de calcul, un registre des risques, un examen qui se
produit avant le lancement. Les règles sont écrites et quelqu'un est responsable, mais rien ne
s'exécute. Preuves typiques : documents de politique, une feuille de calcul remplie, procès-verbaux
de réunion. Défaillance typique qui vous ramène en arrière : le document a été édité pour la
dernière fois il y a un trimestre et ne correspond plus à la production ; l'artefact est obsolète
avant d'être signé. Le chapitre 13 montre à quoi ressemble le registre des risques à chaque niveau
([pratique des risques par niveau de maturité](/bok/risk-management#risk-practice-by-maturity-level)).

**Niveau 2 : Inventorié.** Il y a un véritable inventaire de modèles et un
**[registre d'agents](/patterns/agent-registry)**, et il est alimenté par un chemin de données à
l'exécution plutôt que saisi à la main : un déploiement enregistre un système avec un propriétaire,
une portée et un statut. Vous pouvez répondre à *quelle IA s'exécute* n'importe quel jour. Preuves
typiques : un registre avec un propriétaire et une classe pour chaque système ; un travail de
découverte réconciliant le registre par rapport à la production. Défaillance typique :
[IA fantôme](/patterns/shadow-ai-discovery). Un système ou un agent atteint la production sans
s'enregistrer, donc l'inventaire n'est complet que pour les honnêtes.

**Niveau 3 : Testé.** Les systèmes sont évalués par rapport à des tests définis (évaluations de
capacité, de sécurité et adversariales) et les résultats sont enregistrés comme preuves. Les
défaillances sont visibles, mais une évaluation défaillante ne bloque pas encore rien. Vous savez
quels systèmes sont insuffisants ; vous n'avez pas encore fait en sorte que l'insuffisance ait des
conséquences. Preuves typiques : suites d'évaluation versionnées ; résultats d'évaluation stockés et
horodatés ; résultats du red team. Défaillance typique : l'évaluation est exécutée une fois avant le
lancement, collée dans une diapositive, et jamais réexécutée quand le modèle ou ses prompts
changent.

**Niveau 4 : Appliqué.** Les tests mordent. [Politique en tant que code](/patterns/policy-card) et
**[eval gates](/patterns/eval-gate-in-ci)** s'exécutent en CI/CD et à l'admission, et un contrôle
défaillant bloque la fusion ou le déploiement. L'identité précède l'autonomie : un agent sans
propriétaire, portée ou **[kill switch](/patterns/kill-switch-circuit-breaker)** se voit refuser une
[identité de charge de travail](/bok/governing-agents#identity-and-short-lived-credentials). La
gouvernance est maintenant une propriété de la construction, non un point de contrôle après. Mais
une gate de blocage n'est aussi bonne que le test derrière elle, donc le Niveau 4 a une deuxième
condition qui est facile à sauter : la *qualité* de la suite d'évaluation elle-même est évaluée, pas
seulement son existence et ses dents. Une gate qui bloque sur une suite triviale ou obsolète est le
Niveau 4 à la lettre et du théâtre de framework en fait : une construction verte qui ne prouve rien.
Donc la revendication d'application exige que la couverture soit mesurée, les cas adversariaux
soient maintenus contre les menaces actuelles, et les seuils tracent les modes de défaillance nommés
plutôt que les nombres ronds (voir chapitre 01, « les limites de la eval gate »). Preuves typiques :
journaux de pipeline montrant les versions bloquées avec des raisons ; refus de contrôle d'admission
; le registre agissant comme une gate de déploiement ; une métrique de couverture ou de qualité
adversariale suivie pour les suites qui gâtent. Défaillance typique : des gates fragiles que les
ingénieurs contournent ; une gate maintenue par la gouvernance seule que l'ingénierie ne possède pas
; ou une gate dont la suite est triviale ou non maintenue, donc le bloc est réel mais l'assurance ne
l'est pas.

**Niveau 5 : Continu.** L'assurance est produite continuellement à partir du chemin de données à
l'exécution. Les décisions de guardrail, la médiation des appels d'outils, la dérive et le
comportement des agents s'écoulent dans l'observabilité ;
**[assurance continue](/patterns/continuous-assurance-telemetry)** transforme le comportement en
production en un signal de contrôle en direct ; les preuves sont émises sous forme d'artefacts
[lisibles par machine](/patterns/machine-readable-evidence-oscal) (`OSCAL`, journaux signés) à
mesure que le pipeline et l'exécution fonctionnent. L'audit est une requête. Sur la comparaison d'un
fournisseur de la catégorie de plateforme de gouvernance de l'IA, la plupart ne atteint pas cet état
final, car elle « gère le programme … sans aucun chemin de données à l'exécution » [1]. Preuves
typiques : un magasin d'assurance en direct ; télémétrie d'évaluation et de guardrail en continu ;
un audit répondu en exécutant une requête. Défaillance typique : la télémétrie qui est collectée
mais jamais câblée à une décision ; l'observabilité sans application se désagrège au Niveau 3
habillé en Niveau 5.

## Critères observables, par couche et niveau

Lisez chaque ligne comme une couche mûrissant de gauche à droite. Vous êtes à un niveau seulement
quand chaque ligne a atteint sa colonne.

| Couche | 1 Documenté | 2 Inventorié | 3 Testé | 4 Appliqué | 5 Continu |
|---|---|---|---|---|---|
| **1 Govern-as-Code** | Politiques écrites en prose | Politiques indexées, mappées aux systèmes | Les vérifications de politique s'exécutent et rapportent, sans blocage | [Politique en tant que code](/patterns/policy-card) bloque la fusion/déploiement | [Les verdicts de politique](/patterns/continuous-assurance-telemetry) s'écoulent vers l'assurance, versionnés |
| **2 Inventory & Transparency** | Inventaire de feuille de calcul | Registre alimenté par le déploiement ; propriétaire + portée par système | Registre réconcilié par rapport à la production | [Le registre gâte le déploiement](/patterns/agent-registry) ; pas d'entrée, pas d'identité | Registre en direct hors [découverte à l'exécution](/patterns/shadow-ai-discovery) ; dérive auto-signalée |
| **3 Evals & Red Teaming as Evidence** | Évaluations décrites dans un plan | Les suites d'évaluation existent et sont versionnées | Les évaluations s'exécutent, les résultats sont stockés, sans blocage | [Eval gate](/patterns/eval-gate-in-ci) échoue la construction sur régression ; couverture de suite et qualité adversariale évaluées | Les évaluations s'exécutent continuellement ; les résultats sont des preuves en direct |
| **4 Runtime Controls & Observability** | Guardrails nommés dans une conception | Guardrails déployés, non mesurés | Les décisions de guardrail sont enregistrées | [Kill switch](/patterns/kill-switch-circuit-breaker) testé ; appels d'outils médiatisés et appliqués | Les signaux d'exécution conduisent les décisions de contrôle en temps réel |
| **5 Assurance & Continuous Compliance** | Preuves rassemblées à la main pour l'audit | Preuves modélisées par contrôle | Preuves structurées produites par exécution | Preuves requises pour franchir la porte | [Preuves lisibles par machine](/patterns/machine-readable-evidence-oscal) émises en continu ; audit = requête |

**La maturité partielle est l'état normal.** Presque aucune fonction réelle ne se situe à un seul
niveau propre sur les cinq couches ; le tableau habituel est une ligne irrégulière : inventaire au
niveau 4, évaluations au niveau 2, assurance au niveau 3. Ce n'est pas un échec du modèle, c'est le
point de le lire par couche. Le niveau global unique est la couche la plus faible, et c'est un
*plancher* pour la planification, non un jugement sur l'ensemble de la fonction. Deux lectures en
découlent : rapportez le profil par couche, pas seulement le plancher, car il montre où se trouve
l'effet de levier ; et attendez-vous à ce que le profil reste irrégulier, car les couches mûrissent
à la vitesse du travail qu'elles contrôlent, non en synchronisation. Une fonction qui est au niveau
4 sur l'identité et au niveau 2 sur les évaluations fait mieux que ce que le « niveau 2 » global
suggère, et son prochain mouvement est évident à partir du profil.

## Métriques par niveau

Chaque niveau a des métriques que vous pouvez lire sur les systèmes. Suivez la tendance, pas le
nombre unique.

- **Niveau 1 → 2 :** pourcentage de systèmes d'IA et d'agents dans le registre avec un propriétaire
  nommé et une classe ; écart de réconciliation registre-production (systèmes en production mais non
  enregistrés).
- **Niveau 2 → 3 :** pourcentage de systèmes enregistrés avec une suite d'évaluation versionnée ;
  pourcentage avec un résultat d'évaluation enregistré et horodaté dans la dernière version.
- **Niveau 3 → 4 :** pourcentage de versions passant par une **porte d'évaluation** (par rapport à
  la contourner) ; pourcentage d'agents avec un kill switch testé et une identité délimitée, non
  partagée ; nombre de versions bloquées avec une raison enregistrée.
- **Niveau 4 → 5 :** temps moyen de détection d'une action d'agent non autorisée (un agent faisant
  quelque chose en dehors de sa portée déclarée, territoire OWASP Agentic ASI03/ASI10 [2]) ;
  **fraîcheur des preuves** (âge de l'artefact de preuve le plus récent par contrôle) ; pourcentage
  de contrôles dont le statut peut être répondu par une requête en direct plutôt qu'une extraction
  manuelle.

La métrique inter-niveaux la plus révélatrice est la fraîcheur des preuves. Au niveau 1, la preuve
la plus fraîche a un trimestre ; au niveau 5, elle a l'âge de la dernière exécution du pipeline. Si
vos preuves vieillissent en mois, vous n'êtes pas encore continu, quoi que le tableau de bord dise.
Ce sont des métriques d'ingénierie ; l'ensemble au niveau du conseil qui les rapporte vers le haut
se trouve au chapitre 12
([KPIs et KRIs pour la direction et le conseil](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board)).

## Liste de contrôle d'auto-évaluation

Répondez à chacune avec le système, non l'intention. Un « non » vous plafonne au niveau inférieur.

- **Documenté :** Chaque système d'IA est-il couvert par une politique écrite avec un propriétaire
  nommé ? Y a-t-il un registre des risques qu'une personne maintient ?
- **Inventorié :** Le registre reçoit-il une entrée automatiquement au déploiement, avec
  propriétaire, portée et statut ? Pouvez-vous lister chaque modèle et agent en cours d'exécution
  aujourd'hui, à partir du système de référence, en moins d'une minute ?
- **Testé :** Chaque système enregistré a-t-il une suite d'évaluation versionnée ? Les résultats
  sont-ils stockés avec des horodatages ? Exécutez-vous des évaluations d'équipe rouge contre vos
  agents ?
- **Appliqué :** Une évaluation échouée ou une vérification de politique bloque-t-elle réellement
  une version ? Un agent sans propriétaire, portée et kill switch est-il empêché d'atteindre la
  production ? Pouvez-vous montrer une version qui a été bloquée, avec la raison enregistrée ?
- **Continu :** La télémétrie d'exécution est-elle connectée aux décisions de contrôle, pas
  seulement aux tableaux de bord ? Les preuves sont-elles émises en tant qu'artefacts lisibles par
  machine en continu ? Une question d'audit serait-elle répondue par une requête plutôt qu'un sprint
  de collecte ?

Si vous pouvez dire oui à un niveau entier et à chaque couche qu'il contient, vous êtes à ce niveau.
Le premier « non » est votre prochain travail, et le plus petit pas vers le niveau suivant est
presque toujours de fermer la couche la plus faible, non d'ajouter un sixième contrôle au plus fort.
Exécutez la liste de contrôle comme un outil :
l'[auto-vérification de maturité](/toolkit/maturity-self-check) dessine votre profil par couche,
nomme le plancher et le prochain mouvement, et l'exporte.

## Comment cela se rapporte à la certification et à d'autres évaluations

Ce modèle de maturité n'est pas une certification et n'en confère pas une. Il se rapporte à trois
schémas externes ; la relation est une de soutien et de chevauchement, non d'équivalence.

**Certification ISO/IEC 42001.** ISO/IEC 42001 certifie qu'un système de gestion de l'IA (AIMS)
existe et est exploité, une preuve de niveau 1-2 de *processus* : que la gouvernance est documentée,
possédée et examinée. Elle dit peu sur le fait qu'une **porte d'évaluation** bloque une construction
ou si les preuves sont lisibles par machine, les propriétés de niveau 4-5. Et ce n'est pas une norme
harmonisée : le certificat ne confère aucune présomption de conformité avec le règlement de l'IA de
l'UE, car aucune n'est encore citée au Journal officiel [3]. Atteindre le niveau 5 soutient un audit
42001 en produisant des preuves en continu ; il ne remplace pas le certificat, et le certificat ne
prouve pas que vous avez dépassé le niveau 2. Quel que soit le schéma, exécutez
[un programme d'audit](/bok/governing-deployment#an-audit-programme-not-an-audit), non un audit
unique (chapitre 15).

**Évaluation de maturité OWASP (AIMA).** Le projet GenAI Security d'OWASP publie une évaluation de
maturité de l'IA rapportée à la v1.0 (août 2025) [4]. Elle est complémentaire : où AIMA évalue
l'*ampleur* d'un programme de sécurité de l'IA, ce modèle évalue la *profondeur* du chemin de
données d'exécution. Utilisez AIMA pour trouver des lacunes de couverture ; utilisez cette échelle
pour trouver si les contrôles couverts tirent réellement.

**CSA STAR pour l'IA.** STAR pour l'IA de CSA est un programme de certification construit sur la
matrice de contrôle de l'IA (AICM), avec un niveau d'auto-évaluation, un niveau automatisé «
Valid-AI-ted » et un niveau 2 combinant la certification ISO/IEC 42001 par un tiers avec
l'évaluation validée [1][5]. Son niveau 2 s'aligne avec la fin *Appliqué* de cette échelle, mais,
comme 42001, il atteste un programme plutôt que de mesurer la fraîcheur des preuves d'exécution, la
propriété d'assurance continue (niveau 5) rend bon marché à produire et difficile à contrefaire. Les
certificats de personnes (AIGP, ISO/IEC 42001 Lead Implementer et Lead Auditor, AAISM, AAIA) sont
une autre chose : voir la [page des certifications](/for/certifications).

> **En pratique**
> Une fonction dans un grand opérateur télécom s'est auto-évaluée honnêtement et a atterri au niveau
> 2 pour l'inventaire mais au niveau 1 pour les évaluations : le registre était en direct du
> pipeline de déploiement, mais les évaluations étaient toujours exécutées à la main avant le
> lancement et collées dans des diapositives. La chaîne n'était aussi forte que sa couche la plus
> faible, donc la fonction était au niveau 1 dans l'ensemble. Le plus petit pas n'était pas une
> nouvelle cartographie de cadre ; c'était versioner une suite d'évaluation et stocker ses résultats
> horodatés, déplaçant la couche d'évaluation au niveau 3, avant de la connecter à une porte. La
> fraîcheur des preuves est passée d'un trimestre à un cycle de version en deux sprints.

**Correspondances :** Art. 9 du règlement de l'IA de l'UE (gestion des risques), art. 17 (système de
gestion de la qualité), art. 72 (acompanhamento pós-comercialização) · ISO/IEC 42001 (AIMS) et
ISO/IEC 42005 (évaluation d'impact) · NIST AI RMF (Govern, Measure, Manage) · OWASP Top 10 pour les
applications Agentic 2026 · CSA AICM / STAR pour l'IA. Les cartographies sont illustratives, non une
revendication de conformité.

## Ce que vous pouvez faire cette semaine

1. **Évaluez chaque couche, non la fonction.** Répondez à la liste de contrôle d'auto-évaluation par
   couche, à partir des systèmes plutôt que de l'intention, et prenez le niveau le plus bas comme
   votre niveau global.
2. **Mesurez la fraîcheur des preuves.** Pour chaque contrôle, enregistrez l'âge de son artefact de
   preuve le plus récent. Le plus ancien est où le prochain sprint commence.
3. **Réconciliez le registre une fois.** Comparez ce que le registre liste avec ce qui s'exécute en
   production, et comptez les systèmes et agents qui ne se sont jamais enregistrés.
4. **Relevez la couche la plus faible d'un niveau.** Livrez le plus petit pas là (une suite
   d'évaluation versionnée avec résultats stockés, ou un registre qui contrôle un déploiement) avant
   d'ajouter un contrôle à la couche la plus forte.
5. **Trouvez une version bloquée.** Montrez une version qu'une évaluation échouée ou une
   vérification de politique a arrêtée, avec la raison enregistrée. S'il n'y en a pas, vous n'êtes
   pas encore à Appliqué, quoi que le tableau de bord dise.

## Sources

[1] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[2] Top 10 for Agentic Applications 2026 (ASI03 Agent Identity & Privilege Abuse; ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] ISO/IEC 42001 certification is not yet a presumption of conformity with the EU AI Act (no harmonised standard cited in the OJ). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[4] OWASP AI Maturity Assessment (AIMA), reported at v1.0 (Aug 2025); Secure Governance initiative. OWASP GenAI Security Project. 2025. https://genai.owasp.org/initiatives/ (verified: reported)
[5] STAR for AI (three certification levels; Level 2 = third-party ISO/IEC 42001 + Valid-AI-ted; built on the AI Controls Matrix). Cloud Security Alliance. 2026. https://cloudsecurityalliance.org/star/ai (verified: primary)
