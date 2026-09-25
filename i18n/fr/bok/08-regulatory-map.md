---
lang: fr
source: bok/08-regulatory-map.md
sourceHash: "2d5c814e952facf7e41ebe981ae7a6527a4503f20516c8d52387badff54b53e5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 08. Carte réglementaire (obligation → artefact → couche)

> Ce chapitre est l'index inverse de chaque ligne « Maps to » du livre : pour chaque obligation, il
> nomme l'artefact d'ingénierie qui la satisfait ou la soutient et la couche de stack où l'artefact
> réside.

Chaque autre chapitre mappe *en avant* : une capacité, puis les obligations qu'elle touche. Ce
chapitre mappe *en arrière* : une obligation, puis l'artefact et la couche qui y répondent. L'unité
de la carte est une ligne : une obligation, l'artefact d'ingénierie qui produit la preuve pour elle,
et l'une des cinq couches de stack (chapitre 04) :
**1 Gouvernance en tant que code · 2 Inventaire & Transparence · 3 Évaluations & Red Teaming comme preuves · 4 Contrôles d'exécution & Observabilité · 5 Assurance & Conformité continue**.
La carte est une cartographie croisée pour trouver l'artefact qui répond à une question, non un
certificat que l'artefact vous rend conforme. Elle indexe d'abord les instruments spécifiques à
l'IA, puis la protection des données, la cybersécurité, la responsabilité, le droit des
consommateurs et le droit sectoriel qu'un système d'IA rencontre le premier jour, de sorte que
chaque ligne du [registre des obligations](/obligations) se résout à une table de ce chapitre. Le
chapitre 19 enseigne les lignes de protection des données dans sa
[carte obligation à artefact](/bok/privacy-and-ai#obligation-to-artefact-map), et le chapitre 20
l'[autre droit qui s'applique déjà à l'IA](/bok/existing-law) (droit d'auteur, anti-discrimination,
protection des consommateurs et responsabilité du fait des produits).

## Comment lire cette carte

Lisez chaque ligne comme une phrase : *cette obligation est répondue par cet artefact, qui réside
dans cette couche*. Trois mises en garde s'appliquent partout.

- **Les cartographies sont illustratives, non une revendication de conformité.** Aucun artefact de
  ce livre ne garantit la conformité, et aucune norme citée ici ne confère une présomption de
  conformité (voir « Ce qui n'est PAS encore harmonisé »). Un artefact *soutient* et *prouve* une
  obligation ; le jugement juridique de conformité reste avec les avocats, les organismes notifiés
  et les autorités.
- **Les dates sont les dates post-Omnibus.** Chaque date du règlement de l'IA de l'UE ci-dessous
  reflète le Règlement (UE) 2026/1744, l'Omnibus numérique sur l'IA, du 8 juillet 2026 (JO L, 24
  juillet 2026), en vigueur 27 juillet 2026 [1][2][22]. Où l'Omnibus a déplacé une date, la date
  déplacée est indiquée ; où il ne l'a pas fait, la ligne le dit.
- **L'autorité compétente diffère selon le régime.** Pour l'IA à usage général (GPAI), le
  superviseur est le **Bureau de l'IA**, et les amendes GPAI sont des décisions formelles de la
  Commission en vertu de l'article 101 [3][4]. Pour les systèmes à haut risque, les superviseurs
  sont les **autorités nationales de surveillance du marché**, dont les pénalités relèvent de
  l'article 99 [4]. Les États membres choisissent les leurs ; l'Espagne, par exemple, a créé une
  agence dédiée, **AESIA** (Agencia Española de Supervisión de Inteligencia Artificial), dont le
  statut a été approuvé par le décret royal 729/2023 [52]. La carte indique l'autorité par ligne
  afin que le lecteur sache qui demande.

## Règlement sur l'IA de l'UE, post-Omnibus

Pour une présentation pédagogique du Règlement avant que cet index inversé le mappe (champ
d'application, l'échelle des risques, les rôles de la chaîne de valeur, les obligations du
déployeur, l'application et le calendrier complet post-Omnibus), voir [chapitre 18](/bok/eu-ai-act),
qui parcourt le Règlement de bout en bout.

Les obligations relatives aux systèmes à haut risque (articles 9–15, 17, 25, 26, 27, 49, 71, 72, 73)
s'appliquent aux systèmes de l'annexe III à partir du **2 décembre 2027** et aux systèmes intégrés
de l'annexe I à partir du **2 août 2028**, tous deux reportés par l'Omnibus du 2 août 2026 et du 2
août 2027 respectivement [1][2]. Le `Art. 113(c)` modifié reporte le chapitre III, sections 1 à 3 :
la classification, les exigences des articles 8 à 15 et les obligations des fournisseurs, déployeurs
et autres acteurs dans les articles 16 à 27 [22]. Les obligations relatives aux systèmes à haut
risque qui figurent ailleurs (évaluation de la conformité, la déclaration, le marquage CE et
l'enregistrement dans les articles 43 à 49 et 71, la surveillance après commercialisation et la
notification des incidents dans les articles 72, 73 et 75(1a), et le droit à l'explication dans
l'article 86) appartiennent à des chapitres qui s'appliquent formellement à partir du 2 août 2026,
mais ils n'ont de travail à faire qu'une fois qu'un système est classé à haut risque, de sorte que
la carte les date par la date de classification. C'est la lecture de cette carte ; confirmez-la avec
un conseil juridique (vérifiez) [22][63]. Les articles 26(11), 27, 49, 71 et 86 concernent
uniquement les systèmes de l'annexe III, de sorte que la date du 2 août 2028 ne les atteint pas. Les
obligations relatives aux modèles d'IA à usage général (articles 53, 55) s'appliquent depuis le 2
août 2025, les pouvoirs d'application de la Commission étant en vigueur depuis le 2 août 2026 [3] ;
les fournisseurs de modèles mis sur le marché avant le 2 août 2025 se conforment au 2 août 2027
(`Art. 111(3)`) [63]. La transparence (article 50) est entrée en vigueur le 2 août 2026 et n'a pas
été modifiée [5]. Les systèmes à haut risque des autorités publiques existants conservent leur date
initiale du 2 août 2030 [2].

La colonne **Titulaire de l'obligation** nomme celui à qui l'obligation s'impose, ce qui est un axe
différent de celui qui l'applique. Les obligations relatives à la conception et à la construction
des systèmes à haut risque (articles 9 à 15 et 17) incombent au **fournisseur** ; les articles 26 et
27 incombent au **déployeur** ; les articles 4, 5 et 50 lient **les deux** ; et les articles 53 et
55 lient le **fournisseur de modèles d'IA à usage général**. L'article 25 s'étend sur la chaîne de
valeur : il fixe les conditions selon lesquelles un distributeur, un importateur ou un déployeur
devient lui-même un **fournisseur** et hérite des obligations du fournisseur. Les articles 22 à 24
lient le **mandataire** d'un fournisseur non-UE, l'**importateur** et le **distributeur**, et
l'article 54 le mandataire d'un fournisseur non-UE de modèles d'IA à usage général. Cela importe
pour l'ingénieur car les artefacts que vous pouvez produire dépendent du rôle que votre organisation
joue : un déployeur ne peut pas rédiger la documentation technique du fournisseur, mais il doit
exécuter la surveillance de l'article 26 et l'analyse d'impact de l'article 27 ; et lorsque le
modèle est acheté, la plupart des preuves du côté du fournisseur deviennent quelque chose que vous
collectez plutôt que produisez (voir la Porte d'audit du fournisseur / modèle au chapitre 05).

L'**article 16** est le parapluie pour les obligations du fournisseur relatives aux systèmes à haut
risque. À l'exception du point (l), l'accessibilité, qui a sa propre ligne, il n'ajoute aucun
artefact propre ; il rassemble les obligations que les lignes ci-dessous détaillent article par
article : les exigences des articles 9 à 15 et 17, la conservation de la documentation et des
journaux (articles 18 et 19), l'action corrective (article 20), l'évaluation de la conformité
(article 43), la déclaration UE de conformité et le marquage CE (articles 47 et 48),
l'enregistrement (articles 49 et 71), la surveillance après commercialisation (article 72) et la
notification des incidents graves (article 73). Il se lit donc ici comme une référence croisée, pas
comme une ligne [22][63].

| Article | Obligation | Artefact d'ingénierie | Couche | Titulaire de l'obligation | S'applique (post-Omnibus) | Autorité |
|---|---|---|---|---|---|---|
| `Art. 3(1)` | Champ d'application : décider, système par système, s'il s'agit d'un système d'IA selon la définition de l'art. 3(1) avant que toute autre obligation soit évaluée | Enregistrement de la décision définitionnelle dans le registre : définition appliquée, éléments trouvés, famille exclue le cas échéant, raison, décideur, date | 2 | Fournisseur + déployeur (champ d'application) | 2025-02-02 (Chapitre I) [63] | Autorité nationale de surveillance du marché |
| `Art. 4` | Maîtrise de l'IA : prendre des mesures pour soutenir le développement de la maîtrise de l'IA parmi le personnel et les opérateurs | Programme de maîtrise en tant que code ; registres de formation basés sur les rôles ; portes d'intégration | 1 | Fournisseur + déployeur | 2025-02-02 ; reformulé 2026-07-27 (en vigueur) [6][22][63] | Obligation du fournisseur/déployeur ; autorité nationale de surveillance du marché |
| `Art. 4a` | Base légale pour traiter les données de catégories particulières pour la détection des biais dans les systèmes à haut risque, avec pseudonymisation et suppression une fois le biais corrigé | Contrôles de gouvernance des données ; pseudonymisation et rétention en tant que code ; fiche de données notant la base et la suppression | 2 | Fournisseur | 2026-07-27 (nouveau, en vigueur) [2] | Autorité nationale de surveillance du marché / autorités de protection des données |
| `Art. 5` | Pratiques interdites ; nouvelles interdictions concernant les images intimes non consenties générées par l'IA (NCII) et le matériel d'abus sexuel d'enfants | Liste de blocage de politique en tant que code ; guardrails d'entrée/sortie ; refus et détection des abus | 1 · 4 | Fournisseur + déployeur | 2026-12-02 (nouvelles interdictions) ; interdictions antérieures à partir de 2025-02-02 [2] | Autorité nationale de surveillance du marché |
| `Art. 6` | Règles de classification des systèmes d'IA à haut risque, y compris l'itinéraire de l'annexe III (autonome) et l'itinéraire de l'annexe I (composant de sécurité) | Classification des risques en tant que code ; enregistrement de la décision de classification à haut risque ; entrée du registre signalant le statut de l'annexe III | 1 · 2 | Fournisseur | 2027-12-02 (Annexe III) [1][22] | Autorité nationale de surveillance du marché |
| `Art. 6(3)–(4)` | Un fournisseur qui constate qu'un système de l'annexe III n'est pas à haut risque selon le filtre de l'art. 6(3) documente l'évaluation avant de le mettre sur le marché et l'enregistre selon l'art. 49(2) ; un système qui profile les personnes physiques est toujours à haut risque | Enregistrement de la décision de classification (point de l'annexe III, condition de l'art. 6(3), drapeau de profilage explicite) ; entrée d'enregistrement de l'art. 49(2) poussée depuis le registre | 1 · 2 | Fournisseur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 9` | Système de gestion des risques tout au long du cycle de vie des systèmes à haut risque | Registre des risques en tant que code ; modèles de menaces ; liaison aux résultats de l'analyse d'impact et des évaluations | 1 · 3 | Fournisseur | 2027-12-02 (Annexe III) [1] | Autorité nationale de surveillance du marché |
| `Art. 10` | Données et gouvernance des données ; ensembles de données représentatifs, pertinents et vérifiés | Fiches de données ; traçabilité ; tests de biais et de qualité en CI | 2 · 3 | Fournisseur | 2027-12-02 (Annexe III) [1] | Autorité nationale de surveillance du marché |
| `Art. 11` | Documentation technique (annexe IV) établie et tenue à jour | AIBOM (`CycloneDX ML-BOM`, `SPDX 3.0 AI`) ; documentation technique générée automatiquement ; fiches de modèle | 2 | Fournisseur | 2027-12-02 (Annexe III) [1] | Autorité nationale de surveillance du marché |
| `Art. 12` | Enregistrement : journalisation automatique des événements tout au long de la durée de vie du système | Journaux structurés et signés ; traces `OpenTelemetry` ; magasin d'événements inviolable | 4 | Fournisseur | 2027-12-02 (Annexe III) [1] | Autorité nationale de surveillance du marché |
| `Art. 13` | Transparence et fourniture d'informations aux déployeurs | Instructions d'utilisation en tant que code ; fiches de modèle et de données ; notes sur les capacités et les limitations | 2 | Fournisseur | 2027-12-02 (Annexe III) [1] | Autorité nationale de surveillance du marché |
| `Art. 14` | Contrôle humain intégré au système | Points de contrôle avec intervention humaine ; interrupteur d'arrêt ; chemins de remplacement et d'escalade | 4 | Fournisseur | 2027-12-02 (Annexe III) [1] | Autorité nationale de surveillance du marché |
| `Art. 15` | Précision, robustesse et cybersécurité | Porte d'évaluation ; suite d'équipes rouges adversariales ; contrôles de robustesse et de sécurité ; évaluations de régression | 3 · 4 | Fournisseur | 2027-12-02 (Annexe III) [1] | Autorité nationale de surveillance du marché |
| `Art. 15(4)` | Les systèmes qui continuent à apprendre après la mise sur le marché sont construits pour éliminer ou réduire le risque que des résultats biaisés alimentent les entrées futures (boucles de rétroaction), avec des mesures d'atténuation | Moniteur d'équité des boucles de rétroaction ; vérification des biais des données de réentraînement ; porte d'écriture de la mémoire de l'agent avec provenance et retour à un instantané connu et bon | 3 · 4 | Fournisseur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 16(l)` | Les fournisseurs s'assurent que le système d'IA à haut risque est conforme aux exigences d'accessibilité des directives (UE) 2016/2102 et (UE) 2019/882 | Résultats des tests d'accessibilité pour chaque avis, instruction et explication présentés aux personnes, exécutés dans le pipeline ; modèles d'explication accessibles | 2 · 3 | Fournisseur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 17` | Système de gestion de la qualité | QMS en tant que code ; politiques versionnées ; contrôles de pipeline et gestion des modifications | 1 · 5 | Fournisseur | 2027-12-02 (Annexe III) [1] | Autorité nationale de surveillance du marché |
| `Art. 17(1)(m)` | Le QMS comprend un cadre de responsabilité définissant les responsabilités de la direction et du personnel pour chaque aspect du QMS | RACI en tant que code compilé dans les champs du propriétaire du registre et les règles du propriétaire du code ; enregistrements des décisions du comité | 1 · 2 | Fournisseur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 18` | Tenir la documentation technique, la documentation du QMS, les modifications et décisions des organismes notifiés et la déclaration UE à la disposition des autorités nationales pendant 10 ans après la mise sur le marché | Rétention en tant que code pour le dossier technique, les registres du QMS, les décisions des organismes notifiés et la déclaration UE (10 ans) ; magasin de preuves en écriture unique | 2 · 5 | Fournisseur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 19` | Conserver les journaux générés automatiquement sous le contrôle du fournisseur pendant une période appropriée à la finalité prévue, au moins six mois sauf si la loi en dispose autrement | Politique de rétention des journaux en tant que code (au moins six mois, définie par la finalité prévue) ; magasin de journaux inviolable | 4 · 5 | Fournisseur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 20` | Un fournisseur ayant des raisons de considérer qu'un système d'IA à haut risque n'est pas conforme le met immédiatement en conformité, le retire, le désactive ou le rappelle et en informe les distributeurs et les déployeurs ; lorsque le système présente un risque, il enquête et informe l'autorité de surveillance du marché | Enregistrement CAPA ; runbook de retrait, désactivation ou rappel ; notification des distributeurs et des déployeurs | 1 · 5 | Fournisseur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 22` | Un fournisseur établi en dehors de l'Union nomme, par mandat écrit, un mandataire dans l'Union avant de mettre le système à disposition ; le mandataire conserve la déclaration, la documentation et le certificat pendant 10 ans | Mandat écrit ; copies de 10 ans de la déclaration, de la documentation technique et du certificat ; itinéraire de contact de l'autorité | 5 | Fournisseur non-UE + mandataire | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 23` | Avant de mettre un système d'IA à haut risque sur le marché, l'importateur vérifie l'évaluation de la conformité, la documentation de l'annexe IV, le marquage CE, la déclaration et les instructions et le mandataire, et conserve des copies pendant 10 ans | Enregistrement de vérification à l'importation par rapport à chaque vérification ; copies de documents de 10 ans | 2 · 5 | Importateur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 24` | Avant de mettre un système d'IA à haut risque à disposition, le distributeur vérifie le marquage CE, la déclaration et les instructions, et retient, retire ou rappelle un système qu'il considère comme non conforme | Enregistrement de vérification de distribution ; flux de travail de retenue, retrait ou rappel | 2 · 5 | Distributeur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 25` | Responsabilités le long de la chaîne de valeur de l'IA : quand un distributeur, un importateur ou un déployeur devient un fournisseur, et les informations qu'un fournisseur doit transmettre aux acteurs en aval | Porte d'audit de diligence raisonnable de la chaîne de valeur ; allocation des responsabilités du fournisseur/déployeur ; AIBOM et fiches de modèle/données collectées auprès des fournisseurs en amont | 2 · 5 | Fournisseur + acteurs de la chaîne de valeur | 2027-12-02 (Annexe III) [23] | Autorité nationale de surveillance du marché |
| `Art. 26` | Obligations du déployeur pour les systèmes à haut risque : utilisation selon les instructions d'utilisation (art. 26(1)) ; les lignes de paragraphe ci-dessous détaillent la supervision, les données d'entrée, la surveillance, les journaux et les avis | Registre de déploiement ; points de surveillance ; supervision assignée et rétention des journaux | 2 · 4 | Déployeur | 2027-12-02 (Annexe III) [1] | Autorité nationale de surveillance du marché |
| `Art. 26(2)` | Les déployeurs assignent la supervision humaine à des personnes physiques ayant les compétences, la formation et l'autorité nécessaires, et le soutien nécessaire | Assignation de la supervision dans le registre ; registres de formation basés sur les rôles avec expiration ; liste des approbateurs par classe de point de contrôle avec autorité de pause ou de refus | 1 · 4 | Déployeur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 26(4)` | Dans la mesure où le déployeur contrôle les données d'entrée, il s'assure que les données sont pertinentes et suffisamment représentatives pour la finalité prévue | Vérifications des données d'entrée par rapport à la population du registre de déploiement ; moniteurs de dérive sur les entrées | 2 · 3 | Déployeur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 26(5)` | Les déployeurs surveillent l'opération selon les instructions ; s'ils ont raison de considérer un risque, ils en informent le fournisseur ou le distributeur et l'autorité et suspendent l'utilisation ; un incident grave va d'abord au fournisseur, et l'art. 73 s'applique au déployeur si le fournisseur ne peut pas être contacté | Plan de surveillance avec propriétaires de signaux ; chemin de suspension testé (feature flag, commutateur de trafic) ; contact incident du fournisseur dans le registre ; avis de risque et d'incident grave pré-remplis | 2 · 4 · 5 | Déployeur | 2027-12-02 (Annex III) [63][57] | Autorité nationale de surveillance du marché |
| `Art. 26(6)` | Les déployeurs conservent les journaux sous leur contrôle pendant une période appropriée à la destination, au minimum six mois sauf si une autre loi en dispose autrement | Calendrier de rétention en tant que code ; magasin de journaux inviolable ; conservation légale pendant qu'un incident est ouvert | 4 · 5 | Déployeur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 26(7)` | Avant de mettre un système à haut risque en service sur le lieu de travail, les déployeurs qui sont des employeurs informent les représentants des travailleurs et les travailleurs concernés | Registre d'information des travailleurs daté avant la première utilisation et lié à l'entrée du registre ; déclencheur d'intake RH pour les systèmes du point 4 de l'Annex III | 2 | Déployeur (employeur) | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 26(11)` | Les déployeurs de systèmes de l'Annex III qui prennent ou assistent des décisions concernant des personnes physiques informent ces personnes qu'elles sont soumises au système | Avis d'utilisation de l'IA au point de décision ; modèles d'avis versionnés en tant que code ; journal de livraison des avis | 2 · 4 | Déployeur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 27` | Analyse d'impact sur les droits fondamentaux (FRIA) pour les déployeurs de systèmes de l'Annex III | FRIA en tant que code à partir d'un modèle ; référence croisée à une DPIA RGPD `Art. 35` | 1 · 2 | Déployeur | 2027-12-02 (Annex III) [7] | Autorité nationale de surveillance du marché |
| `Art. 43` | Évaluation de la conformité avant la mise sur le marché (contrôle interne, ou un organisme notifié pour la biométrie du point 1 de l'Annex III) | Flux de travail d'évaluation de la conformité ; dossier de preuves de contrôle interne ou d'organisme notifié ; traçabilité à la documentation de l'Annex IV | 1 · 5 | Fournisseur | 2027-12-02 (Annexe III) [1][22] | Autorité nationale de surveillance du marché |
| `Art. 43(4)` | Un système déjà évalué subit une nouvelle évaluation de la conformité en cas de modification substantielle ; les modifications prédéterminées dans la documentation technique d'un système qui continue à apprendre ne sont pas des modifications substantielles | Politique de classification des modifications à la fusion ; enveloppe de modification prédéterminée en tant que code ; déclencheur de réévaluation dans le registre | 1 · 5 | Fournisseur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 47` | Déclaration UE de conformité établie à l'issue de l'évaluation | Déclaration UE de conformité générée automatiquement à partir des preuves ; registre de marquage CE | 2 · 5 | Fournisseur | 2027-12-02 (Annexe III) [1][22] | Autorité nationale de surveillance du marché |
| `Art. 48` | Apposer le marquage CE de manière visible, lisible et indélébile (un marquage numérique pour les systèmes fournis numériquement), suivi du numéro de l'organisme notifié le cas échéant | Registre de marquage CE (physique ou numérique) généré avec la déclaration UE de conformité ; numéro d'organisme notifié le cas échéant | 2 · 5 | Fournisseur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 49` / `Art. 71` | Enregistrement des systèmes à haut risque dans la base de données UE | Registre d'agent/modèle avec une API qui alimente l'enregistrement ; propriétaire et statut par entrée | 2 | Fournisseur ; déployeur d'autorité publique | 2027-12-02 (Annexe III) [1] | MSA national ; Commission (base de données) |
| `Art. 50` | Transparence pour certains systèmes d'IA : divulgation de chatbot ; marquage et étiquetage du contenu synthétique | Étiquetage du contenu et marquage lisible par machine (par exemple de style C2PA) ; banneau de divulgation de chatbot | 4 · 2 | Fournisseur + déployeur | 2026-08-02 ; délai de grâce de marquage pour les systèmes existants jusqu'à 2026-12-02 [2][5] | Autorité nationale de surveillance du marché |
| `Art. 52` | Notifier la Commission sans délai, et dans les deux semaines, une fois qu'un modèle GPAI remplit la condition de l'art. 51(1)(a) ou qu'il devient connu qu'il la remplira | Registre de calcul par lignée de modèle avec une alerte de seuil de calcul prévu ; registre de notification déposé dans les deux semaines | 2 · 5 | Fournisseur GPAI | Obligations à partir du 2025-08-02 ; application à partir du 2026-08-02 [63][3] | Bureau de l'IA |
| `Art. 53` | Obligations des fournisseurs GPAI, y compris un résumé public du contenu d'entraînement sur un modèle du Bureau de l'IA | Fiches de modèle ; résumé du contenu d'entraînement ; AIBOM et provenance des données | 2 | Fournisseur GPAI | Obligations à partir du 2025-08-02 ; application à partir du 2026-08-02 [3] | Bureau de l'IA |
| `Art. 53(1)(c)` | Les fournisseurs GPAI mettent en place une politique de conformité avec le droit d'auteur de l'Union, y compris l'identification et le respect des réserves de droits en vertu de l'art. 4(3) de la directive (UE) 2019/790 | Politique de droit d'auteur versionnée ; journaux de décision des robots d'exploration ; registre des droits des données d'entraînement avec le résultat de la vérification de réserve | 1 · 2 · 5 | Fournisseur GPAI | Obligations à partir du 2025-08-02 ; application à partir du 2026-08-02 [63][73] | Bureau de l'IA |
| `Art. 54` | Un fournisseur GPAI établi en dehors de l'Union nomme, par mandat écrit, un mandataire avant de mettre le modèle sur le marché de l'Union ; le mandataire conserve la documentation de l'Annex XI pendant 10 ans | Mandat écrit ; copie de la documentation de l'Annex XI conservée 10 ans ; itinéraire de contact du Bureau de l'IA | 5 | Fournisseur GPAI non-UE + mandataire | Obligations à partir du 2025-08-02 ; application à partir du 2026-08-02 [63] | Bureau de l'IA |
| `Art. 55` | Modèles GPAI à risque systémique : évaluation du modèle y compris essais adversariaux ; évaluation des risques au niveau de l'Union ; signalement des incidents graves ; cybersécurité du modèle | Suite d'évaluation et de red-team ; pipeline d'incident sur le modèle de signalement d'incident grave de la Commission ; contrôles de sécurité pondérés ; modèle de menace | 3 · 4 · 5 | Fournisseur GPAI (risque systémique) | Obligations à partir du 2025-08-02 ; application à partir du 2026-08-02 [3][26] | Bureau de l'IA |
| `Art. 60` | Essais de systèmes d'IA à haut risque (Annex III) en conditions réelles en dehors des bacs à sable réglementaires de l'IA | Plan d'essai en conditions réelles ; `Art. 61` registres de consentement éclairé ; crochets de surveillance, de journalisation et d'incident des essais | 3 · 4 | Fournisseur / fournisseur prospectif | 2026-08-02 [22] | Autorité nationale de surveillance du marché |
| `Art. 72` | Surveillance après commercialisation pour les systèmes à haut risque | Télémétrie d'assurance continue ; plan de surveillance ; signaux de dérive et de performance | 5 | Fournisseur | 2027-12-02 (Annexe III) [1] | Autorité nationale de surveillance du marché |
| `Art. 73` | Signalement des incidents graves pour les systèmes à haut risque (délais dans le tableau d'horloge de signalement ci-dessous) | Pipeline de détection et de triage des incidents ; automatisation de l'horloge de signalement ; capture de preuves | 5 · 4 | Fournisseur | 2027-12-02 (Annexe III) [1] | Autorité nationale de surveillance du marché |
| `Art. 73(6)` | Après signalement d'un incident grave, le fournisseur enquête sans délai (évaluation des risques, action corrective) et ne modifie pas le système d'une manière qui pourrait affecter l'évaluation des causes avant d'informer les autorités | Étape de préservation des preuves : instantanés du modèle, du prompt, de la politique et de l'index de récupération ; traces scellées ; correctif livré sur une nouvelle version | 4 · 5 | Fournisseur | 2027-12-02 (Annexe III) [63] | Autorité nationale de surveillance du marché |
| `Art. 75(1a)` | Les fournisseurs de systèmes à haut risque relevant de la compétence exclusive du Bureau de l'IA (systèmes construits sur leur propre modèle GPAI, et systèmes dans les plateformes en ligne très grandes désignées ou les moteurs de recherche) signalent les incidents graves au Bureau de l'IA, l'art. 73(2) à (9) s'appliquant mutatis mutandis | Routage du pipeline d'incident par un drapeau de compétence du registre (MSA national ou Bureau de l'IA) | 2 · 5 | Fournisseur (systèmes relevant de la compétence du Bureau de l'IA) | 2027-12-02 (Annex III) ; nouveau par l'Omnibus (lecture, vérifier) [22] | Bureau de l'IA |
| `Art. 86` | Une personne soumise à une décision d'un déployeur basée sur un système de l'Annex III (sauf point 2) avec des effets négatifs juridiques ou similaires peut obtenir des explications claires et significatives du rôle du système et des éléments principaux de la décision, lorsque le droit de l'Union ne donne pas déjà le droit | Registre d'explication par décision (version du système et du modèle, codes de raison, rôle déterminant ou consultatif, décideur humain) ; flux de traitement des demandes et journal des réponses | 2 · 4 · 5 | Déployeur | 2027-12-02 (Annex III) ; le chapitre IX s'applique à partir du 2026-08-02 (lecture, vérifier) [63][22] | Autorité nationale de surveillance du marché |
| `Art. 87` | La directive (UE) 2019/1937 s'applique aux signalements des infractions à la loi sur l'IA et à la protection des personnes qui les font | Canal de signalement interne géré comme un système de dossiers avec les horloges de la directive codées ; identité du signataire scellée ; surveillance des représailles ; routage vers le pipeline d'incident | 1 · 5 | Entités juridiques avec des canaux de signalement interne en vertu de la directive (UE) 2019/1937 | 2026-08-02 [63][64] | Autorités désignées en vertu de la directive (UE) 2019/1937 |

Plusieurs lignes sont développées en détail ailleurs dans le livre :

- `Art. 4` : le programme de maîtrise en tant que code est
  [AI literacy as code](/bok/governance-program#ai-literacy-as-code) au chapitre 12, et les
  registres de formation basés sur les rôles ont un
  [modèle de curriculum de maîtrise](/resources/templates#kit-literacy-curriculum).
- `Art. 4a` et `Art. 10` : la base légale pour
  [les données de catégories spéciales pour la détection des biais](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics)
  est au chapitre 19 ; les données nécessaires pour tester les biais, et
  [où les biais entrent dans le cycle de vie](/bok/fairness-and-explainability#where-bias-enters-the-lifecycle),
  sont au chapitre 16
  ([caractéristiques protégées, proxies et les données dont vous avez besoin pour tester](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test)).
- `Art. 6` :
  [le filtre de l'article 6(3) et le remplacement du profilage](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override)
  sont expliqués au chapitre 18.
- `Art. 9` : le registre des risques en tant que code est
  [le registre des risques en tant qu'enregistrement de preuves](/bok/risk-management#the-risk-register-as-an-evidence-record)
  au chapitre 13 ; le même artefact répond à la ligne ISO/IEC 23894 ci-dessous.
- `Art. 11`, `Art. 43` et `Art. 47` :
  [Annex IV, élément par élément](/bok/governing-development#annex-iv-element-by-element) et
  [conformité, dans l'ordre](/bok/governing-development#eu-ai-act-conformity-in-order) sont au
  chapitre 14.
- `Art. 13` : les instructions d'utilisation en tant que code ont un
  [schéma JSON et un exemple rempli](/resources/templates#schema-instructions-for-use) ; ce qu'elles
  doivent dire aux déployeurs et aux personnes concernées est dans
  [la loi sur l'IA de l'UE, articles 13 et 86](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
  (chapitre 16).
- `Art. 25` :
  [quand un acteur de la chaîne de valeur devient un fournisseur](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider)
  est énoncé au chapitre 18.
- `Art. 26` : les
  [obligations du déployeur en opération](/bok/governing-deployment#operating-the-system) sont au
  chapitre 15.
- `Art. 27` : la référence croisée de la FRIA à une DPIA RGPD `Art. 35` est développée dans
  [la DPIA pour les systèmes d'IA](/bok/privacy-and-ai#the-dpia-for-ai-systems) (chapitre 19).
- `Art. 72` : le plan de surveillance a un
  [schéma de plan de surveillance après commercialisation](/resources/templates#schema-post-market-monitoring-plan).
- `Art. 3(1)` : le registre de décision définitionnel est construit champ par champ dans
  [de l'élément de définition au champ du registre](/bok/ai-defined#from-definition-element-to-registry-field)
  (chapitre 11).
- `Art. 15(4)` : les boucles de rétroaction sont surveillées dans
  [surveillance de l'équité en production](/bok/fairness-and-explainability#monitoring-fairness-in-production)
  (chapitre 16), et pour les agents dans
  [gouvernance de la mémoire et du contexte](/bok/governing-agents#memory-and-context-governance)
  (chapitre 23) ; `Art. 16(l)` a
  [explications accessibles](/bok/fairness-and-explainability#accessible-explanations).
- `Art. 17(1)(m)` : le cadre de responsabilité est
  [une RACI du cycle de vie](/bok/governance-program#a-lifecycle-raci) (chapitre 12) ; `Art. 43(4)`
  est [modification substantielle](/bok/governing-development#substantial-modification) au chapitre
  14 ; `Arts. 22` à `24` sont [les rôles d'opérateur de l'UE](/bok/eu-ai-act#the-eu-operator-roles)
  au chapitre 18.
- `Art. 26(2)` à `26(11)` : les paragraphes du déployeur parcourent le chapitre 15, de
  [vérification des données et des personnes](/bok/governing-deployment#check-the-data-and-the-people)
  à [rétention des registres](/bok/governing-deployment#records-retention) et
  [communications externes](/bok/governing-deployment#external-communications) ; le chapitre 17
  couvre
  [informer le fournisseur et suspendre l'utilisation](/bok/incidents#deployer-duties-inform-the-provider-suspend-use)
  (`Art. 26(5)`) et [geler avant de corriger](/bok/incidents#freeze-before-you-fix) (`Art. 73(6)`),
  et le chapitre 23
  [conception d'approbation pour les points de contrôle des agents](/bok/governing-agents#human-checkpoints-and-approval-design).
- `Art. 52` : le registre de calcul et la notification de deux semaines sont dans
  [risque systémique : seuil, notification, désignation](/bok/eu-ai-act#systemic-risk-threshold-notification-designation)
  (chapitre 18) ; `Art. 53(1)(c)` est
  [droit d'auteur et données d'entraînement](/bok/existing-law#copyright-and-training-data)
  (chapitre 20).
- `Art. 86` : le registre d'explication est spécifié dans
  [la loi sur l'IA de l'UE, articles 13 et 86](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
  (chapitre 16) et
  [explication et avis aux personnes concernées](/bok/eu-ai-act#explanation-and-notice-to-affected-people)
  (chapitre 18) ; `Art. 87` est satisfait par
  [un canal pour soulever des préoccupations](/bok/governance-program#a-channel-for-raising-concerns)
  (chapitre 12).

L'Omnibus a également modifié les lignes du tableau qui se compressent en une seule ligne [22]. Pour
`Art. 6`, un **composant de sécurité** doit désormais avoir pour objet de prévenir ou d'atténuer les
risques pour la santé et la sécurité, ou être un composant dont la défaillance les met en danger
(`Art. 3(14)`, `Art. 6(1a)` à `6(1c)`) ; ce rétrécissement s'applique à la route de l'annexe I à
partir du 2 août 2028, et aux machines passées de la section A à la section B de l'annexe I.
L'enregistrement du registre de l'annexe VIII, section B pour les systèmes qui s'appuient sur le
filtre `Art. 6(3)` a perdu le résumé des motifs et la liste des États membres. Pour `Art. 25`,
l'obligation de coopération du fournisseur initial désigne désormais la documentation suffisante
pour évaluer la conformité, les limitations connues et les modes de défaillance, et l'accès
technique ciblé pour les essais (`Art. 25(2)`) ; l'information et l'accès doivent être fixés dans un
accord écrit (`Art. 25(4)`), et les violations des deux paragraphes sont sanctionnées en vertu de
`Art. 99(4)(da)`.

L'horloge de l'article 73 fonctionne par classe d'incident. Le fournisseur notifie l'autorité de
surveillance du marché de l'État membre où l'incident s'est produit immédiatement dès qu'il établit
un lien de causalité entre le système et l'incident, ou la probabilité raisonnable d'un tel lien, et
en tout état de cause dans un délai limite qui court à partir du moment où le fournisseur ou, le cas
échéant, le déployeur **prend connaissance** de l'incident, et non à partir de l'établissement du
lien de causalité [57]. Un déployeur qui identifie un incident grave informe d'abord le fournisseur,
puis l'importateur ou le distributeur et l'autorité de surveillance du marché ; s'il ne peut pas
joindre le fournisseur, l'article 73 s'applique au déployeur mutatis mutandis (`Art. 26(5)`) [57] :

| Classe d'incident | Délai de notification | Qui notifie | Artefact |
|---|---|---|---|
| Incident grave (général) | Immédiatement en cas de lien de causalité ou de probabilité raisonnable de celui-ci ; au plus tard 15 jours après la prise de connaissance | Fournisseur → autorité de surveillance du marché nationale ; le déployeur s'il ne peut pas joindre le fournisseur (`Art. 26(5)`) | Pipeline de triage des incidents ; automatisation de l'horloge de notification |
| Infraction généralisée, ou perturbation grave et irréversible d'une infrastructure critique | Immédiatement ; au plus tard 2 jours après la prise de connaissance | Fournisseur → autorité de surveillance du marché nationale ; le déployeur s'il ne peut pas joindre le fournisseur (`Art. 26(5)`) | Même pipeline, voie de gravité escaladée |
| Décès d'une personne | Immédiatement en établissant ou en soupçonnant un lien de causalité ; au plus tard 10 jours après la prise de connaissance | Fournisseur → autorité de surveillance du marché nationale ; le déployeur s'il ne peut pas joindre le fournisseur (`Art. 26(5)`) | Même pipeline, voie prioritaire |

L'Omnibus a laissé ces délais inchangés. Pour les systèmes à haut risque relevant de la compétence
exclusive du Bureau de l'IA, son nouveau `Art. 75(1a)` envoie le rapport au Bureau de l'IA à la
place, avec `Art. 73(2)` à `(9)` s'appliquant mutatis mutandis, et le Bureau de l'IA le transmet à
l'autorité de surveillance du marché de l'État membre où le fournisseur est établi [22]. Un incident
démarre rarement une seule horloge : le chapitre 17 place l'horloge de l'article 73 à côté des
horloges du RGPD, de la SRI 2, de la DORA, de la CRA et de la GPAI dans
[les horloges qui se chevauchent](/bok/incidents#the-overlapping-clocks), et le
[schéma d'enregistrement des incidents](/resources/templates#schema-incident-record) contient les
horodatages dont chacune a besoin.

Deux dispositions transversales encadrent les sanctions. En vertu de **`Art. 101`**, la Commission
peut infliger une amende aux fournisseurs de GPAI jusqu'à 3 % du chiffre d'affaires annuel mondial
ou 15 millions d'EUR, le montant le plus élevé étant retenu [3][4]. En vertu du nouvel
**`Art. 75a`–`75d`** de l'Omnibus, le Bureau de l'IA acquiert des pouvoirs d'enquête, des
engagements contraignants et des décisions de non-conformité sur les systèmes de IA pour lesquels
l'article `Art. 75(1)` modifié le rend exclusivement compétent (systèmes construits sur un modèle
GPAI par le même fournisseur ou entreprise, et systèmes dans les très grandes plateformes en ligne
désignées ou les moteurs de recherche), et non sur les modèles GPAI en général. Les astreintes
peuvent atteindre jusqu'à 5 % du revenu quotidien moyen ou du chiffre d'affaires annuel mondial par
jour en cas de violation continue (`Art. 75c(5)`). L'Omnibus est entré en vigueur le 27 juillet
2026, et le chapitre IX, où se trouvent ces articles, s'applique à partir du 2 août 2026 en vertu de
`Art. 113` [8][22]. Les amendes administratives pour haut risque s'appliquent en vertu de `Art. 99`
(plafonds de 7 %, 3 % et 1 % du chiffre d'affaires selon la violation), imposées par les autorités
nationales [4]. Le chapitre 18 énonce [qui supervise quoi](/bok/eu-ai-act#who-supervises-what) et
[les pouvoirs directs du Bureau de l'IA](/bok/eu-ai-act#the-ai-offices-direct-powers-articles-75-and-75a-to-75d).

## Code de pratique GPAI

Le Code de pratique GPAI, publié le 10 juillet 2025, est l'instrument volontaire que les
fournisseurs utilisent pour démontrer la conformité aux obligations GPAI jusqu'à l'existence de
normes harmonisées. Il compte trois chapitres [9][10].

| Chapitre | Ce qu'il demande | Artefact d'ingénierie | Couche |
|---|---|---|---|
| Sécurité et sûreté (modèles à risque systémique uniquement) | Un cadre de sécurité et de sûreté ; évaluations de modèles incl. essais adversariels ; évaluation et atténuation des risques systémiques ; notification des incidents graves ; sécurité des modèles et de l'infrastructure | Suite d'évaluations et de red-teaming ; harnais d'essais adversariels ; pipeline d'incidents ; contrôles de sécurité des poids | 3 · 4 · 5 |
| Transparence | Documentation de modèle à jour pour le Bureau de l'IA et les déployeurs en aval | Fiches de modèle ; documentation de modèle structurée ; AIBOM | 2 |
| Droit d'auteur | Une politique de conformité au droit d'auteur de l'Union, incl. le respect des réserves de droits | Registres de provenance et de licence des données d'entraînement ; politique en tant que code pour le filtrage des sources | 1 · 2 |
| Sécurité et sûreté, engagement 9 (notification des incidents graves) | Notifier les incidents graves au Bureau de l'IA dans les 2, 5, 10 ou 15 jours selon la classe d'incident, avec des rapports intermédiaires au moins tous les quatre semaines tant que non résolu et un rapport final dans les 60 jours suivant la résolution ; conserver les registres au moins cinq ans [65] | Pipeline d'incidents sur les champs du modèle de la Commission ; horloges par classe ; politique de rétention de cinq ans ; canal de notification en aval | 4 · 5 |
| Sécurité et sûreté, annexe 1.3 et 1.4 (autonomie, utilisation d'outils, perte de contrôle) | Les sources de risque systémique à considérer incluent la capacité à fonctionner de manière autonome, les propensions telles que la collusion avec d'autres systèmes de IA, et les affordances telles que l'accès aux outils et aux systèmes physiques et le niveau de supervision humaine ; la perte de contrôle est un risque systémique spécifié [65] | Évaluations par le fournisseur de l'autonomie et de l'utilisation d'outils, demandées à la porte de diligence raisonnable du fournisseur et déposées avec l'entrée du registre des agents | 3 · 5 |

Le Code est volontaire ; le signer est une voie pour démontrer la conformité, pas une présomption
légale de conformité [9]. Le statut de signataire est dynamique et compté selon la liste officielle
de la Commission [10].

Pour la notification des incidents graves spécifiquement, la Commission a publié un modèle de
notification le 4 novembre 2025 pour les incidents graves impliquant des modèles GPAI présentant un
risque systémique. Il s'aligne sur l'obligation de notification de l'article 55 et sur l'engagement
9 du chapitre Sécurité et sûreté du Code, et est l'artefact concret que le pipeline d'incidents
émet, le même modèle nommé dans la ligne de l'article 55 ci-dessus [26]. Un
[enregistrement d'incident](/resources/templates#schema-incident-record) interne peut alimenter ce
modèle et le rapport de chaque autre régime. L'engagement 9 du chapitre Sécurité et sûreté fixe les
horloges (2, 5, 10 ou 15 jours selon la classe d'incident, rapports intermédiaires au moins tous les
quatre semaines, rapport final dans les 60 jours suivant la résolution) et une rétention d'au moins
cinq ans, et son annexe 1 énumère la capacité à fonctionner de manière autonome et l'accès aux
outils parmi les sources de risque systémique et la perte de contrôle parmi les risques spécifiés,
ce qui explique pourquoi les deux lignes ci-dessus importent pour quiconque déploie des agents sur
un modèle GPAI [65]. Le chapitre 17 place l'engagement 9 à côté des autres régimes dans
[les horloges qui se chevauchent](/bok/incidents#the-overlapping-clocks), et le chapitre 23 lit
l'annexe 1 pour les agents dans
[crochets du Reglamento de IA de la UE pour les agents](/bok/governing-agents#eu-ai-act-hooks-for-agents).

## Protection des données et autre droit de l'UE

Un système de IA mis sur le marché de l'UE respecte plus de loi que le Reglamento de IA dès le
premier jour. Les lignes ci-dessous indexent les obligations que les chapitres v0.5.0 enseignent :
le RGPD, les régimes de cybersécurité et de notification d'incidents, et la responsabilité, le droit
d'auteur, le droit de la consommation et le droit sectoriel qui s'appliquent déjà à l'IA. Ils
répondent à leurs propres superviseurs (autorités de protection des données, CSIRT et superviseurs
financiers, tribunaux et autorités de protection des consommateurs), et non aux autorités de
surveillance du marché du Reglamento de IA, et plusieurs s'appliquent par transposition nationale,
donc la colonne « S'applique » le dit. Les mappages sont illustratifs, pas une affirmation de
conformité.

### Le RGPD

Le RGPD s'applique depuis le 25 mai 2018 [66]. Le chapitre 19 parcourt chaque ligne ci-dessous, avec
le test d'anonymat du CEPD pour les modèles entraînés [67], dans
[droit de la protection des données et de la vie privée appliqué à l'IA](/bok/privacy-and-ai#obligation-to-artefact-map)
; le chapitre 16 construit les registres d'explication et de contestation de `Arts. 15(1)(h)` et
`22` dans
[protection des données : le RGPD et le régime du Royaume-Uni](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime).

| Article | Ce qu'il demande | Artefact d'ingénierie | Couche | Qui est lié | S'applique |
|---|---|---|---|---|---|
| `Art. 5(1)(b) and 6(4)` | Les données à caractère personnel sont collectées pour des finalités spécifiées, explicites et légitimes et ne sont pas traitées ultérieurement de manière incompatible ; l'art. 6(4) fixe le test de compatibilité pour la réutilisation, comme l'entraînement sur des données collectées pour une autre finalité [66] | Balises de finalité sur les ensembles de données ; politique de correspondance des finalités dans les pipelines d'entraînement et d'indexation ; registre d'évaluation de compatibilité | 1 · 2 | Responsable du traitement | 2018-05-25 |
| `Art. 6` | Une base légale pour chaque opération de traitement, évaluée séparément pour l'entraînement, l'ajustement fin, la récupération et l'inférence [66][67] | Registre de base par ensemble de données et étape ; évaluation d'intérêt légitime versionnée | 2 | Responsable du traitement | 2018-05-25 |
| `Art. 7` | Lorsque le consentement est la base, le responsable du traitement peut le démontrer, et retirer le consentement est aussi facile que de le donner [66] | Journal de consentement-finalité joint aux ensembles de données et aux versions de modèle ; retrait propagé aux pipelines | 2 · 5 | Responsable du traitement | 2018-05-25 |
| `Art. 9` | Le traitement de catégories particulières de données, incl. les données biométriques pour l'identification unique, est interdit sauf si une condition de l'art. 9(2) s'applique, qui atteint les données sensibles qu'un modèle déduit [66] | Test de proxy en CI ; politique d'inférence avec un classificateur de sortie à l'exécution ; registre de condition de l'art. 9(2) | 1 · 3 · 4 | Responsable du traitement | 2018-05-25 |
| `Arts. 13–14` | Informer les personnes concernées des finalités, des bases, des destinataires et de la rétention et, pour la prise de décision automatisée, donner des informations significatives sur la logique impliquée (art. 13(2)(f), 14(2)(g)) [66] | Avis généré à partir de l'entrée du registre ; fiche de modèle ; avis de prise de décision automatisée par système | 2 | Responsable du traitement | 2018-05-25 |
| `Art. 15(1)(h)` | Sur demande, confirmer la prise de décision automatisée et donner des informations significatives sur la logique impliquée et son importance et ses conséquences envisagées [66] | Explication générée par demande à partir du registre de décision ; avis de prise de décision automatisée au niveau du système | 4 · 5 | Responsable du traitement | 2018-05-25 |
| `Arts. 15–17 and 21` | Les demandes d'accès, de rectification, d'effacement et d'opposition atteignent chaque endroit où les données vivent : corpus, instantanés, index de récupération, journaux et, lorsqu'il contient des données à caractère personnel, le modèle [66] | Flux de travail de demande dans le corpus, les instantanés, l'index de récupération, les journaux et les poids ; registre d'exécution | 4 · 5 | Responsable du traitement | 2018-05-25 |
| `Art. 22` | Un droit de ne pas être soumis à une décision fondée uniquement sur un traitement automatisé ayant des effets juridiques ou de même nature, sauf sur contrat, loi ou consentement explicite ; alors intervention humaine, droit d'exprimer un avis et de contester (art. 22(3)) [66] | Enregistrement de décision avec codes de raison ; canal de contestation et journal d'examen humain ; résultats d'appel par groupe | 4 · 5 | Responsable du traitement | 2018-05-25 |
| `Art. 5(1)(c) and 25` | Données adéquates, pertinentes et limitées, avec des mesures techniques et organisationnelles intégrées à la conception et définies par défaut [66] | Enregistrement de justification des caractéristiques ; filtres PII et catégories spéciales ; rétention en tant que code | 1 · 3 | Responsable du traitement | 2018-05-25 |
| `Art. 5(2)` | Un responsable du traitement qui affirme qu'un modèle entraîné ne contient aucune donnée à caractère personnel doit pouvoir le démontrer ; le CEPD établit un test d'anonymat et les preuves qu'il attend [66][67] | Dossier de preuves d'anonymat ; évaluations d'inférence d'appartenance et d'extraction à la porte d'évaluation | 3 · 5 | Responsable du traitement (développeur de modèle) | 2018-05-25 |
| `Art. 28` | Utiliser uniquement des sous-traitants offrant des garanties suffisantes, en vertu d'un contrat qui fixe les instructions, les sous-traitants, la sécurité, l'assistance et la suppression [66] | Liste de contrôle des clauses de fournisseur d'IA à la porte d'audit (pas de formation, rétention, région, sous-traitants, avis de modification) | 2 · 5 | Responsable du traitement ; sous-traitant | 2018-05-25 |
| `Art. 30` | Les responsables du traitement et les sous-traitants conservent un enregistrement des activités de traitement relevant de leur responsabilité [66] | Enregistrements générés par moment de traitement à partir du registre et des fiches de données | 2 · 5 | Responsable du traitement ; sous-traitant | 2018-05-25 |
| `Arts. 33–34` | Notifier l'autorité de contrôle sans délai indu et, si possible, dans les 72 heures suivant la prise de connaissance ; informer les personnes concernées sans délai indu lorsque la violation est susceptible d'entraîner un risque élevé [66] | Branche de violation de données à caractère personnel du pipeline d'incidents avec son propre minuteur de 72 heures ; modèle d'avis aux personnes concernées | 4 · 5 | Responsable du traitement (le sous-traitant notifie le responsable du traitement) | 2018-05-25 |
| `Arts. 35–36` | Évaluer l'impact avant le traitement susceptible d'entraîner un risque élevé, et consulter l'autorité de contrôle lorsque le risque résiduel reste élevé [66] | Modèle d'AIPD avec des champs spécifiques à l'IA, référencés croisés par l'AFID ; décision enregistrée lorsqu'aucune AIPD n'est nécessaire | 1 · 2 | Responsable du traitement | 2018-05-25 |
| `Arts. 44–49` | Les transferts en dehors de l'EEE uniquement sur la base d'une décision d'adéquation, de garanties appropriées (telles que les clauses contractuelles types ou les règles contraignantes d'entreprise) ou d'une dérogation étroite ; l'envoi de données à caractère personnel à un modèle hébergé en dehors de l'EEE peut constituer un transfert [66] | Registre des transferts ; politique de résidence et de routage en tant que code ; évaluation d'impact des transferts | 1 · 4 · 5 | Responsable du traitement ; sous-traitant | 2018-05-25 |

### Droit de la cybersécurité et de la notification d'incidents

La directive NIS2 lie les entités essentielles et importantes par le droit national, que les États
membres appliquent à partir du 18 octobre 2024 [68] ; le DORA s'applique aux entités financières
depuis le 17 janvier 2025 [69], les délais d'incident étant fixés dans le règlement délégué (UE)
2025/301 [70] ; et l'obligation de notification de la loi sur la cyberrésilience s'applique à partir
du 11 septembre 2026, avant le reste de ce règlement le 11 décembre 2027 [71]. Un incident d'IA peut
déclencher plusieurs de ces minuteurs à la fois : le chapitre 17 les place côte à côte dans
[les minuteurs qui se chevauchent](/bok/incidents#the-overlapping-clocks), et le chapitre 15 couvre
[la continuité en cas d'défaillance du fournisseur](/bok/governing-deployment#when-the-provider-fails-continuity).

| Article | Ce qu'il demande | Artefact d'ingénierie | Couche | Qui est lié | S'applique |
|---|---|---|---|---|---|
| NIS2 `Art. 21(2)(c)–(d)` | Les mesures de gestion des risques incluent la continuité des activités (sauvegarde, reprise après sinistre, gestion de crise) et la sécurité de la chaîne d'approvisionnement avec les fournisseurs directs et les prestataires de services, ce qui couvre les services d'IA et de modèle [68] | Plan de continuité pour les dépendances d'IA avec des solutions de secours testées ; évaluations des fournisseurs pour les fournisseurs de modèles et de plates-formes | 4 · 5 | Entités essentielles et importantes | 2024-10-18, par le droit national |
| NIS2 `Art. 23` | Un avertissement précoce dans les 24 heures suivant la prise de connaissance d'un incident important, une notification d'incident dans les 72 heures et un rapport final dans un mois suivant la notification, y compris la cause première [68] | Minuteur par régime sur l'enregistrement d'incident ; détermination de l'importance avec un propriétaire ; codage des causes réutilisé dans le rapport final | 5 | Entités essentielles et importantes | 2024-10-18, par le droit national |
| DORA `Art. 19` | Signaler les incidents majeurs liés aux TIC : notification initiale dans les 4 heures suivant la classification en tant que majeure et au plus tard 24 heures après la prise de connaissance (dans les 4 heures d'une classification effectuée après ces 24 heures), rapport intermédiaire dans les 72 heures suivant la notification initiale, rapport final dans un mois suivant le dernier rapport intermédiaire [69][70] | Enregistrement de classification avec un horodatage ; minuteur par régime ; codage des causes cohérent pour l'agrégation des incidents récurrents | 5 | Entités financières | 2025-01-17 |
| DORA `Art. 28(3)`, `28(8)` | Tenir un registre des informations sur tous les arrangements contractuels pour les services TIC fournis par des tiers, et des stratégies de sortie pour les services TIC qui soutiennent les fonctions critiques ou importantes [69] | Entrées de registre pour les services d'IA et de modèle ; plan de sortie et enregistrement d'exercice de sortie | 2 · 5 | Entités financières | 2025-01-17 |
| CRA `Art. 14` | Notifier les vulnérabilités activement exploitées et les incidents graves via la plate-forme de notification unique : avertissement précoce dans les 24 heures, notification dans les 72 heures, rapport final 14 jours après la disponibilité d'un correctif (vulnérabilité) ou un mois après la notification (incident) [71] | Minuteurs de vulnérabilité et d'incident sur l'enregistrement d'incident ; soumission via la plate-forme de notification unique | 4 · 5 | Fabricants de produits contenant des éléments numériques | 2026-09-11 ; le reste à partir de 2027-12-11 |

### Responsabilité, droit d'auteur, droit de la consommation et droit sectoriel

La directive révisée sur la responsabilité du fait des produits traite les logiciels, y compris les
systèmes d'IA, comme un produit et s'applique aux produits mis sur le marché après le 9 décembre
2026 [72]. L'exception d'extraction de textes et de données de la directive DSM cède à une réserve
du titulaire de droits [73], qui est la règle `Art. 53(1)(c)` que le Reglamento de IA désigne. La
directive sur les services numériques, la directive sur les pratiques commerciales déloyales, la
directive sur le travail de plateforme et la directive révisée sur le crédit à la consommation
ajoutent des obligations pour les plates-formes, les commerçants, les plates-formes de travail
numérique et les créanciers [74][75][76][77]. Le chapitre 20 les enseigne :
[droit d'auteur et données d'entraînement](/bok/existing-law#copyright-and-training-data),
[la directive de l'UE sur la responsabilité du fait des produits](/bok/existing-law#the-eu-product-liability-directive),
[obligation d'avertir après les mises à jour](/bok/existing-law#duty-to-warn-after-updates),
[l'UE : UCPD, DSA et le Reglamento de IA](/bok/existing-law#the-eu-ucpd-dsa-and-the-ai-act),
[emploi](/bok/existing-law#employment) et [crédit et prêt](/bok/existing-law#credit-and-lending).

| Article | Ce qu'il demande | Artefact d'ingénierie | Couche | Qui est lié | S'applique |
|---|---|---|---|---|---|
| PLD `Art. 4(1)` | Le logiciel est un produit, de sorte que le fabricant d'un système d'IA est strictement responsable des dommages causés par un défaut d'un produit mis sur le marché ou mis en service après 2026-12-09 [72] | Examen de la responsabilité en cas de défaut à la conception ; recours contractuel ; risque résiduel dans le registre | 1 · 5 | Fabricants et autres opérateurs économiques | Produits mis sur le marché après 2026-12-09 |
| PLD `Arts. 9–10` | Un tribunal peut ordonner au défendeur de divulguer les preuves pertinentes à sa disposition ; le défaut de divulgation est l'une des conditions dans lesquelles le produit est présumé défectueux [72] | Dossier de défense par version : AIBOM avec hachages, historique d'évaluation, analyse des modes de défaillance, journaux signés, instructions d'utilisation, conservés pendant la période de responsabilité | 2 · 3 · 5 | Fabricants, y compris les fournisseurs de systèmes d'IA et les modificateurs substantiels | Produits mis sur le marché après 2026-12-09 |
| PLD `Art. 11(2)` | Le fabricant ne peut pas invoquer le défaut survenant après la mise sur le marché s'il est dû à un logiciel, y compris ses mises à jour ou améliorations, ou à des mises à jour de sécurité manquantes, qui restent sous son contrôle [72] | Journal des modifications ; évaluations de régression par version ; enregistrements de décision de correctif ; avertissements versionnés | 3 · 4 · 5 | Fabricants | Produits mis sur le marché après 2026-12-09 |
| Directive DSM `Art. 4(3)` | L'exception générale d'extraction de textes et de données s'applique uniquement lorsque les titulaires de droits n'ont pas expressément réservé l'utilisation d'une manière appropriée, comme par des moyens lisibles par machine pour le contenu rendu publiquement disponible en ligne [73] | Politique d'exploration en tant que code honorant les réserves ; registre des droits des données d'entraînement avec le résultat de la vérification de réserve, la méthode et la date | 1 · 2 | Quiconque exploite des œuvres, y compris les développeurs de modèles | Délai de transposition 2021-06-07 |
| DSA `Art. 25` | Les plates-formes en ligne ne conçoivent, n'organisent ou n'exploitent pas leurs interfaces d'une manière qui trompe ou manipule les utilisateurs ou entrave leurs décisions libres et éclairées [74] | Enregistrement d'examen de l'interface ; évaluation d'équipe rouge pour les résultats manipulateurs | 3 · 5 | Fournisseurs de plates-formes en ligne | 2024-02-17 |
| DSA `Art. 27` | Les plates-formes en ligne énoncent dans leurs conditions les paramètres principaux de leurs systèmes de recommandation et toute option que les utilisateurs ont pour les modifier [74] | Fiche de paramètres de recommandation générée à partir de la configuration de classement ; journal des options offertes aux utilisateurs | 2 · 4 | Fournisseurs de plates-formes en ligne | 2024-02-17 |
| UCPD `Arts. 5–7`, annexe I | Aucune pratique commerciale contraire à la diligence professionnelle, ou trompeuse, qui fausse les décisions du consommateur moyen, y compris les affirmations générées par l'IA et les réponses de chatbot ; affirmer que les avis sont authentiques sans vérifications raisonnables, et les faux avis, sont mis sur liste noire (points 23b et 23c de l'annexe I) [75] | Registre des affirmations lié aux résultats d'évaluation ; vérifications de la provenance des avis ; évaluations des réponses de chatbot sur les affirmations de produits | 1 · 3 · 4 | Commerçants traitant avec les consommateurs | 2007-12-12 ; points d'examen depuis la directive (UE) 2019/2161 |
| Directive sur le travail de plateforme `Arts. 7`, `9–11` | Limites sur les données à caractère personnel que les plates-formes peuvent traiter via des systèmes automatisés, transparence sur ces systèmes, supervision humaine avec une évaluation d'impact au moins tous les deux ans, et explication et examen humain des décisions [76] | Registre des systèmes automatisés avec leurs paramètres principaux ; liste de refus de catégories de données ; évaluation d'impact biennale ; explication et journal d'examen humain | 1 · 2 · 3 · 5 | Plates-formes de travail numérique | Transposition avant 2026-12-02 |
| CCD2 `Art. 18(8)` | Lorsque l'évaluation de la solvabilité implique un traitement automatisé, le consommateur peut demander une intervention humaine, une explication claire de l'évaluation et de sa logique, et un examen de la décision [77] | Artefact d'explication par version de modèle ; chemin et journal d'examen | 3 · 4 · 5 | Créanciers | 2026-11-20 |

## ISO/IEC 42001, 42005 et 42006

ISO/IEC 42001:2023 est la norme de système de gestion de l'IA (AIMS) ; son annexe A regroupe les
objectifs de contrôle en neuf domaines (`A.2`–`A.10`). C'est une norme de système de gestion, pas le
système de gestion de la qualité de l'article 17, et son adoption européenne (EN ISO/IEC 42001:2026)
ne confère aucune présomption de conformité [11][12].

| Domaine de l'annexe A | Accent | Artefact d'ingénierie | Couche |
|---|---|---|---|
| `A.2` Politiques relatives à l'IA | Ensemble de politiques d'IA et sa gouvernance | Bibliothèque de politique en tant que code ; référentiel de politique versionnée | 1 |
| `A.3` Organisation interne | Rôles, responsabilités, rapports | Modèle opérationnel ; RACI ; propriété dans le registre | 1 · 2 |
| `A.4` Ressources pour les systèmes d'IA | Données, outils, calcul, ressources humaines documentées | Inventaire des ressources ; AIBOM ; manifestes d'environnement | 2 |
| `A.5` Évaluation des impacts des systèmes d'IA | Processus d'évaluation d'impact | Évaluation d'impact en tant que code ; liaison AFID/AIPD (ISO/IEC 42005) | 1 · 3 |
| `A.6` Cycle de vie du système d'IA | Conception, développement et déploiement responsables | Contrôles de pipeline ; portes d'évaluation ; gestion des modifications | 1 · 3 · 4 |
| `A.7` Données pour les systèmes d'IA | Qualité des données, provenance, préparation | Fiches de données ; traçabilité ; tests de qualité des données | 2 · 3 |
| `A.8` Informations pour les parties intéressées | Transparence et rapports aux parties prenantes | Fiches de modèle/données ; divulgations lisibles par machine | 2 |
| `A.9` Utilisation des systèmes d'IA | Contrôles d'utilisation responsable et surveillance | Garde-fous d'exécution ; télémétrie d'utilisation | 4 |
| `A.10` Relations avec les tiers et les clients | Gestion des responsabilités des fournisseurs et des clients | AIBOM du fournisseur ; mappage de contrôle contractuel et technique | 2 · 5 |

ISO/IEC 42005:2025 fournit des orientations pour l'évaluation d'impact des systèmes d'IA et est le
compagnon naturel de l'article 27 (FRIA) et de l'annexe A.5 [13]. Le modèle opérationnel et la RACI
de la ligne `A.3` sont construits dans
[une RACI de cycle de vie](/bok/governance-program#a-lifecycle-raci) (chapitre 12), et le chapitre
22 place ces normes dans [la famille ISO/IEC](/bok/principles-and-standards#the-isoiec-family) dans
son ensemble.

Deux autres normes ISO/IEC accompagnent les AIMS. **ISO/IEC 42006:2025** fixe les exigences pour les
organismes qui auditent et certifient les systèmes de gestion de l'IA : s'appuyant sur ISO/IEC
17021-1, elle répond à la question « qui peut vous certifier de manière crédible selon 42001 », car
elle fixe la compétence et la cohérence qu'un organisme de certification doit démontrer.
**ISO/IEC 23894:2023** fournit des orientations sur la gestion des risques liés à l'IA, en adaptant
ISO 31000 à l'IA ; elle est le compagnon du processus de risque de l'article 9 et du NIST AI RMF
[27][28]. Le tableau porte également ISO/IEC 42005:2025, les orientations d'évaluation d'impact
[13], et **ISO/IEC 22989:2022**, la norme de concepts et terminologie dont les rôles des parties
prenantes en IA et le vocabulaire du cycle de vie qu'un registre peut réutiliser champ par champ
[78].

| Norme | Ce qu'elle est | Artefact d'ingénierie | Couche |
|---|---|---|---|
| `ISO/IEC 42006:2025` | Exigences pour les organismes auditant et certifiant les systèmes de gestion de l'IA (qui peut vous certifier de manière crédible selon 42001) | Périmètre de certification accrédité ; preuves de compétence de l'auditeur ; registre des certificats | 5 |
| `ISO/IEC 23894:2023` | Orientations sur la gestion des risques liés à l'IA (compagnon d'ISO 31000) | Registre des risques en tant que code ; taxonomie des risques liés à l'IA ; lien avec le Reglamento de IA de la UE `Art. 9` et le NIST AI RMF | 1 · 3 |
| `ISO/IEC 42005:2025` | Orientations pour évaluer les impacts d'un système d'IA sur les individus, les groupes et la société tout au long de son cycle de vie (compagnon de l'art. 27 et de l'annexe A.5) [13] | Évaluation d'impact en tant que code à partir d'un modèle ; références croisées FRIA et AIPD ; déclencheurs de réévaluation | 1 · 3 |
| `ISO/IEC 22989:2022` | Un vocabulaire partagé pour les concepts d'IA, le cycle de vie du système d'IA et les rôles des parties prenantes en IA [78] | Noms de champs du registre et vocabulaire des rôles alignés sur les termes de la norme ; références du glossaire | 2 |

**Correspondances :** ces contrôles sont réalisés par les couches 1, 2, 3 et 5 du stack ; le
contrôle d'évaluation d'impact (A.5 / ISO 42005) soutient le Reglamento de IA de la UE `Art. 27`.
Les mappages sont illustratifs, non une affirmation de conformité.

## NIST AI RMF

Le NIST AI Risk Management Framework 1.0 (janvier 2023 ; il n'y a pas de 2.0) organise le travail de
risque en quatre fonctions. Il est volontaire et d'origine américaine, et il s'aligne clairement sur
le stack à cinq couches [14]. Au 2026-09-24, la page du framework de NIST indique que AI RMF 1.0 «
est en cours de révision dans le cadre du White House AI Action Plan » ; aucun texte révisé n'avait
été publié, donc 1.0 reste la version à citer et à épingler dans les métadonnées de contrôle [59].
Le chapitre 22 couvre
[le NIST AI RMF en profondeur](/bok/principles-and-standards#nist-ai-rmf-10-in-depth) : les sept
caractéristiques de confiance, les 19 catégories du Core, le Playbook et les profils.

| Fonction | Ce qu'il demande | Artefact d'ingénierie | Couche |
|---|---|---|---|
| GOVERN | Une culture et une structure pour gérer le risque lié à l'IA | Politique en tant que code ; modèle opérationnel ; propriété du registre | 1 · 2 |
| MAP | Contexte et cadrage des risques pour chaque système d'IA | Modèles de menaces ; cartographie des cas d'usage et d'impact ; fiches de données/modèle | 2 · 3 |
| MEASURE | Analyser, comparer et surveiller les risques | Portes d'évaluation ; suite d'équipes rouges adversariales ; métriques par mode de défaillance | 3 |
| MANAGE | Prioriser, répondre et récupérer | Garde-fous d'exécution ; pipeline d'incidents ; assurance continue | 4 · 5 |

### Travaux NIST plus récents sur l'IA

Au-delà du RMF, trois efforts NIST plus récents concernent le stack. Deux sont encore en brouillon,
et le texte le dit. L'**AI Agent Standards Initiative**, lancée par le Center for AI Standards and
Innovation (CAISI) de NIST le 17 février 2026, cible des normes interopérables et sécurisées pour
les agents d'IA : identité, authentification, autorisation et sécurité des agents [29]. Le
**IR 8596 Cyber AI Profile** en brouillon (brouillon préliminaire initial, 16 décembre 2025 ;
commentaires fermés 30 janvier 2026, et toujours la version actuelle au 2026-09-24) est un profil du
Cybersecurity Framework (CSF 2.0) pour l'IA, organisé autour de Secure, Defend et Thwart [30]. Le
**AI 800-1** en brouillon (Managing Misuse Risk for Dual-Use Foundation Models ; deuxième brouillon
public, janvier 2025 ; aucune version finale publiée au 2026-09-24) est une orientation volontaire
pour identifier, mesurer et atténuer le risque d'utilisation abusive tout au long du cycle de vie de
l'IA [31]. Le **Generative AI Profile** plus ancien, NIST AI 600-1 (26 juillet 2024), est le
compagnon du RMF pour l'IA générative : 12 risques et actions suggérées codées aux quatre fonctions,
et le tableau le porte aussi [79].

| Élément NIST | Ce qu'elle est | Artefact d'ingénierie | Couche |
|---|---|---|---|
| AI Agent Standards Initiative (2026) | Initiative CAISI sur les agents d'IA interopérables et sécurisés : identité, authentification, sécurité des agents | Registre des agents ; contrôles d'identité non humaine ; authentification et autorisation des agents ; évaluations adversariales des agents | 3 · 4 |
| IR 8596 Cyber AI Profile (brouillon) | Profil CSF 2.0 pour l'IA (Secure / Defend / Thwart) | Contrôles de sécurité du système d'IA ; observabilité d'exécution ; détection des menaces mappée à CSF 2.0 | 3 · 4 |
| AI 800-1 (brouillon) | Managing Misuse Risk for Dual-Use Foundation Models (orientation volontaire) | Suite d'équipes rouges pour l'utilisation abusive ; évaluations de capacité et de capacité dangereuse ; framework de sécurité | 3 |
| AI 600-1 Generative AI Profile (2024) | Actions suggérées pour 12 risques que l'IA générative crée ou exacerbe, codées aux fonctions Govern, Map, Measure et Manage [79] | Suites d'évaluation d'IA générative nommées d'après les identifiants d'action du profil (par ex. confabulation, intégrité de l'information) ; une entrée de registre des risques par risque du profil | 1 · 3 |

## CSA AICM et STAR pour l'IA

La AI Controls Matrix (AICM) v1.1 de la Cloud Security Alliance, publiée le 22 juin 2026, définit
247 objectifs de contrôle sur 18 domaines, et le programme STAR for AI fournit le schéma d'assurance
autour de celui-ci, en trois niveaux : une auto-évaluation de niveau 1, une validation automatisée «
Valid-AI-ted » de niveau 1, et un niveau 2 qui ajoute la certification ISO/IEC 42001 [15][83].

| Artefact CSA | Ce qu'elle est | Artefact d'ingénierie | Couche |
|---|---|---|---|
| AICM v1.1 | 247 objectifs de contrôle sur 18 domaines, couvrant la gouvernance, les données, le modèle et l'exécution | Catalogue de contrôles mappé à la politique en tant que code et aux évaluations ; crosswalk vers ISO 42001 / NIST AI RMF | 1 · 3 · 5 |
| STAR pour l'IA | Programme d'assurance et de certification sur l'AICM : auto-évaluation de niveau 1, validation automatisée « Valid-AI-ted » de niveau 1 et niveau 2 (certification ISO/IEC 42001 plus l'évaluation validée) [83] | Soumission de preuves lisibles par machine ; télémétrie d'assurance continue | 5 |
| Contrôles des agents (AICM v1.1, ATF, AARM) | Contrôles AICM spécifiques aux agents (par ex. IAM-18 Agent Access Restriction, AIS-11 Agents Security Boundaries), avec l'Agentic Trust Framework v1 (niveaux d'autonomie gagnée) et la spécification d'interception d'exécution AARM [80][81][82] | Définitions de contrôle spécifiques aux agents ; politique en tant que code pour la portée et les outils des agents ; garde-fous d'exécution | 1 · 4 |
| Annexe sur les risques catastrophiques | Contrôles AICM améliorés pour les systèmes à haute autonomie avec potentiel de risque catastrophique | Contrôles améliorés pour les systèmes à haute autonomie ; contrôles de kill switch et de supervision ; preuves d'audit pilote | 4 · 5 |

Deux lignes de travail poussent l'AICM vers les agents et le risque de frontière. Pour les agents,
les contrôles se trouvent à l'intérieur de la matrice elle-même (par exemple IAM-18 Agent Access
Restriction et AIS-11 Agents Security Boundaries) [80], et le programme de plan de contrôle agentic
de la CSA ajoute deux spécifications publiées, l'**Agentic Trust Framework** (zéro confiance pour
les agents avec niveaux d'autonomie gagnée) et **AARM** (interception des actions des agents avant
leur exécution) [32][81][82]. Les éditions antérieures de cette carte listaient un « Agentic Control
Supplement » proposé à l'AICM ; il n'a pas pu être associé à un document primaire de la CSA au
2026-09-24, donc la ligne nomme maintenant ce qui est publié (vérifier). Pour le risque de
frontière, l'**Annexe sur les risques catastrophiques** ajoute un ensemble de contrôles améliorés
pour les systèmes à haute autonomie, destinés à être prouvés par des audits pilotes plutôt
qu'affirmés [33].

## Projet OWASP GenAI Security

Le GenAI Security Project d'OWASP fournit le vocabulaire de menaces sur lequel les contrôles sont
construits, plus deux formats (l'Agent Control Standard et un AIBOM) que le stack consomme
directement [16][17][54]. Le chapitre 23 mappe chaque entrée agentic à ses contrôles dans
[menaces mappées aux contrôles](/bok/governing-agents#threats-mapped-to-controls).

| Artefact OWASP | Ce qu'elle est | Artefact d'ingénierie | Couche |
|---|---|---|---|
| Top 10 pour les applications agentic 2026 | Catalogue de menaces des agents (ASI01 Agent Goal Hijack … ASI10 Rogue Agents) | Modèle de menace des agents ; évaluations adversariales ; garde-fous d'exécution ; kill switch | 3 · 4 |
| Top 10 pour les applications LLM 2026 | Catalogue de menaces LLM (incl. Excessive Agency au #3) | Contrôles d'injection de prompt et de gestion de sortie ; porte d'évaluation | 3 · 4 |
| Agent Control Standard (ACS) | Une norme pour exprimer les contrôles des agents | Définitions de contrôle lisibles par machine pour les agents | 1 · 4 |
| AIBOM | Format et générateur de nomenclature de matériel d'IA | AIBOM à la construction (`CycloneDX ML-BOM`, `SPDX 3.0 AI`) | 2 |

## Lois fédérales et étatiques américaines

Les États-Unis n'ont pas de loi fédérale horizontale sur l'IA ; les règles contraignantes
spécifiques à l'IA sont les lois des États, et elles diffèrent dans leur portée. Deux ne lient que
les développeurs de frontière, avec les devoirs les plus lourds sur les grands ; le reste atteint
les développeurs, déployeurs et opérateurs ordinaires, et la loi fédérale antérieure à l'IA (prêts
équitables, rapports de crédit, discrimination à l'emploi, la loi FTC) atteint déjà les décisions
d'IA. Les tableaux ci-dessous les portent tous en tant que lignes. Le chapitre 21 les enseigne :
[la couche fédérale](/bok/ai-laws-worldwide#united-states-the-federal-layer) (ordres exécutifs, les
mémorandums de l'OMB qui lient les agences et leurs fournisseurs, et la poussée fédérale contre les
lois d'IA des États) et les
[lois des États qui lient les organisations privées](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
chacune avec sa portée, ses dates, ses devoirs et son application.

### Lois pour les développeurs de frontière

Deux lois des États américains ne lient que les développeurs de frontière, avec les devoirs les plus
lourds sur les grands, pas les déployeurs généraux : une portée plus étroite que la hiérarchisation
des risques de la loi sur l'IA de l'UE. Elles demandent aux grands développeurs de frontière de
publier des frameworks de sécurité et à chaque développeur de frontière de signaler les incidents de
sécurité critiques à l'État [18][19][25]. La protection des lanceurs d'alerte de Californie est
respectée en pratique par
[un canal pour soulever des préoccupations](/bok/governance-program#a-channel-for-raising-concerns)
(chapitre 12).

| Loi | Portée | Obligation | Artefact d'ingénierie | Couche |
|---|---|---|---|---|
| California SB 53 (TFAIA), en vigueur 2026-01-01 | Développeurs de frontière (modèles entraînés au-dessus d'environ 10^26 FLOP) ; le devoir de framework lie les grands développeurs de frontière (revenu du développeur supérieur à 500 millions USD) | Publier un framework d'IA de frontière ; signaler les incidents de sécurité critiques au Bureau des services d'urgence dans les 15 jours ; protection des lanceurs d'alerte ; jusqu'à 1 million USD par violation, appliquée par l'AG [56] | Framework de sécurité publié ; signalement du pipeline d'incidents à l'État ; artefacts de transparence | 5 · 4 |
| Protections des lanceurs d'alerte de California SB 53 (Code du travail 1107–1107.2), en vigueur 2026-01-01 | Développeurs de frontière ; le processus anonyme lie les grands développeurs de frontière | Aucune règle, politique ou contrat n'empêche les salariés couverts de signaler les préoccupations relatives aux risques catastrophiques, et aucune représaille ; notification des droits ; les grands développeurs de modèles de frontière gèrent un processus interne anonyme avec des mises à jour mensuelles au signataire, partagées avec les officiers et administrateurs au moins trimestriellement [56] | Canal de signalement interne anonyme avec mises à jour de statut ; enregistrements d'accusé de réception ; résumé trimestriel aux officiers et administrateurs | 1 · 5 |
| New York RAISE Act (S6953B), signé 2025-12-19 | Les développeurs de modèles de frontière (modèles entraînés au-delà de 10^26 opérations) signalent les incidents dans les 72 heures ; le devoir du cadre s'impose aux grands développeurs de modèles de frontière (chiffre d'affaires annuel supérieur à 500 millions USD) ; les seuils de l'amendement du chapitre signé 2026-03-27 | Publier un cadre de sécurité et de sûreté pour l'IA de frontière ; divulguer les incidents de sécurité dans les 72 heures. Un amendement du chapitre signé 2026-03-27 fixe la date d'entrée en vigueur au 2027-01-01 et crée un bureau de surveillance au sein du Département des services financiers de New York (DFS) [19][24][25] | Cadre de sécurité et de sûreté pour l'IA de frontière publié ; pipeline de signalement et de divulgation des incidents dans les 72 heures au bureau de surveillance du DFS | 5 · 4 |

### Autres lois étatiques sur l'IA

Ces lois étatiques s'étendent au-delà des développeurs de modèles de frontière aux développeurs,
déployeurs et opérateurs ordinaires : Texas et Colorado ; les lois californiennes sur les données
d'entraînement, la provenance et les chatbots compagnons ; les règles complémentaires de New York ;
l'Illinois ; la Local Law 144 de New York City ; et l'Utah [55][84][85][86][88][89][90][91]. Le
chapitre 21 les énumère chacun avec son application dans son
[tableau des lois étatiques](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
et compare les règles d'embauche dans
[un outil d'embauche, quatre régimes](/bok/ai-laws-worldwide#consequential-decisions-one-hiring-tool-four-regimes).

| Loi | Portée | Obligation | Artefact d'ingénierie | Couche |
|---|---|---|---|---|
| Texas TRAIGA (HB 149), en vigueur 2026-01-01 | Développeurs et déployeurs exerçant des activités au Texas | Interdictions fondées sur l'intention de développer ou de déployer l'IA (manipulation comportementale, discrimination illégale) ; notation sociale interdite pour les entités gouvernementales ; divulgation de l'utilisation de l'IA par les agences gouvernementales et les prestataires de soins de santé ; un bac à sable réglementaire ; application par le procureur général ; les règles d'IA locales sont préemptées [35] | Politique d'utilisation interdite en tant que code ; contrôles de divulgation de l'utilisation de l'IA ; gestion des plaintes et des incidents | 1 · 4 |
| Colorado SB 26-189 (technologie de prise de décision automatisée), effective 2027-01-01, remplaçant SB 24-205 | Développeurs et déployeurs d'ADMT dans les décisions conséquentes | Documentation du développeur pour les déployeurs et notification des mises à jour matérielles ; notification du déployeur de l'utilisation d'ADMT ; une explication en langage clair dans les 30 jours suivant un résultat défavorable ; correction, examen humain et reconsidération ; les enregistrements sont conservés au moins trois ans. SB 26-189 (signé 2026-05-14) a abrogé et réédité SB 24-205, dont le devoir de diligence contre la discrimination algorithmique avait été reporté au 2026-06-30 et dont l'application avait été bloquée par un tribunal fédéral [36][55] | Inventaire d'ADMT ; pack de documentation du développeur ; modèles de notification et d'explication des résultats défavorables ; file d'attente d'examen humain ; magasin de registres de trois ans | 2 · 4 · 5 |
| California AB 2013 (transparence des données d'entraînement), due 2026-01-01 | Développeurs de systèmes d'IA générative publiés depuis 2022-01-01 | Les développeurs publient un résumé des ensembles de données utilisés pour entraîner un système d'IA générative mis à la disposition des Californiens (sources, taille, types de données, propriété intellectuelle et informations personnelles, données synthétiques) au plus tard le 2026-01-01 et à chaque modification substantielle [84] | Fiche de données par ensemble de données, publiée à la sortie ; registre des droits des données d'entraînement | 2 |
| California AI Transparency Act (SB 942 tel qu'amendé par AB 853), opérationnel 2026-08-02 | Fournisseurs couverts de systèmes d'IA générative publics ; grandes plateformes en ligne ; fabricants de dispositifs de capture | Les fournisseurs couverts offrent un outil gratuit de détection d'IA et intègrent des divulgations latentes, avec une divulgation de manifeste optionnelle, dans les images, vidéos et audio générés ; les grandes plateformes en ligne et les dispositifs de capture suivent ultérieurement [85] | Pipeline de provenance écrivant des métadonnées latentes ; point de terminaison de détection public ; affichage de la provenance côté plateforme | 3 · 4 |
| California SB 243 (chatbots compagnons), chapitré 2025-10-13 | Opérateurs de chatbots compagnons | Divulguer l'IA lorsqu'une personne raisonnable pourrait être induite en erreur ; pour les mineurs connus, rappeler au moins toutes les trois heures et empêcher le contenu sexuellement explicite ; exécuter un protocole de suicide et d'automutilation avec orientation vers les services de crise ; rapports annuels à partir de 2027-07-01 [86] | Politique de mode compagnon ; minuteur de rappel ; classificateur de renvoi en cas de crise et journal ; rapport annuel | 1 · 4 · 5 |
| New York GBL Article 47 (modèles de compagnons IA), en vigueur 2025-11-05 (vérifier) | Opérateurs de compagnons IA | Détecter l'idéation suicidaire et l'automutilation et orienter les utilisateurs vers les services de crise ; dire aux utilisateurs qu'ils ne parlent pas à un humain au début et au moins toutes les trois heures [88] | Classificateur de renvoi en cas de crise et journal ; minuteur de notification | 4 · 5 |
| Illinois HB 3773 (amendement à la Loi sur les droits de l'homme), effective 2026-01-01 | Employeurs | Les employeurs ne peuvent pas utiliser l'IA avec un effet discriminatoire sur les classes protégées dans le recrutement, l'embauche, la promotion, la discipline ou d'autres conditions d'emploi, ni utiliser les codes postaux comme proxy, et doivent notifier les salariés et les candidats [89][118] | Inventaire d'IA dans les RH ; évaluation de l'impact défavorable par classe protégée ; enregistrement de notification | 2 · 3 · 4 |
| NYC Local Law 144 (outils de prise de décision automatisée en matière d'emploi), appliquée depuis 2023-07-05 | Employeurs et agences d'emploi utilisant des AEDT pour les rôles de New York City | Un audit de biais indépendant dans l'année précédant l'utilisation, un résumé publié des résultats, et une notification aux candidats et aux salariés 10 jours ouvrables avant l'utilisation [90] | Évaluation du ratio d'impact par sexe, race/ethnicité et catégorie intersectionnelle ; résumé d'audit publié ; enregistrement de notification | 3 · 5 |
| Loi de l'Utah sur la divulgation de l'IA (SB 226), en vigueur 2025-05-07 | Fournisseurs utilisant l'IA générative dans les transactions avec les consommateurs ; professions réglementées | Divulguer l'IA générative lorsqu'une personne le demande clairement et sans ambiguïté ; les professions réglementées la divulguent de manière bien visible dans une interaction d'IA à haut risque ; une divulgation claire au départ constitue un refuge sûr [91] | Composant de divulgation avec un drapeau de risque d'interaction ; journal de conversation montrant la divulgation | 4 |

### Lois étatiques sur la confidentialité et les secteurs

Les statuts de confidentialité étatiques atteignent l'IA par le biais des refus de profilage, des
évaluations, du consentement et des droits d'examen, et une loi sectorielle atteint les modèles des
assureurs. Le chapitre 19 les compare dans [les États-Unis](/bok/privacy-and-ai#united-states) et le
chapitre 20 couvre
[le logement, l'assurance et les services publics](/bok/existing-law#housing-insurance-and-public-services).

| Loi | Portée | Obligation | Artefact d'ingénierie | Couche |
|---|---|---|---|---|
| Règlements CPPA de Californie (ADMT), devoirs à partir de 2027-01-01 | Entreprises soumises à la CCPA | Les entreprises utilisant ADMT pour les décisions importantes donnent un préavis d'utilisation, une option de refus ou un appel humain, et un accès aux informations sur l'ADMT [87] | Registre d'ADMT ; préavis d'utilisation ; flux de refus ou d'appel ; réponse d'accès à l'ADMT | 2 · 4 · 5 |
| Règlements CPPA de Californie (évaluations des risques), effective 2026-01-01 | Entreprises soumises à la CCPA | Une évaluation des risques avant le traitement qui présente un risque important, y compris l'utilisation d'ADMT pour les décisions importantes ; attestations et résumés soumis à l'Agence [87] | Évaluation des risques par activité déclenchante ; enregistrement de soumission | 5 |
| Virginia CDPA (§ 59.1-580), à partir de 2023-01-01 | Responsables du traitement | Les responsables du traitement documentent les évaluations de la protection des données pour la publicité ciblée, la vente, le profilage qui présente un risque raisonnablement prévisible, et les données sensibles, pour le traitement créé après 2023-01-01, et les donnent au procureur général sur demande [93] | Modèle d'évaluation par activité de traitement ; registre de profilage | 1 · 5 |
| Colorado Privacy Act (SB21-190), en vigueur 2023-07-01 | Responsables du traitement | Les consommateurs peuvent refuser le profilage en vue de décisions ayant des effets juridiques ou similaires, y compris par le biais d'un mécanisme de refus universel ; les responsables du traitement exécutent des évaluations de la protection des données pour le traitement qui présente un risque accru {[94] | Drapeau de refus honoré à l'inférence ; modèle d'évaluation ; drapeaux de classe de données d'admission | 1 · 2 · 4 · 5 |
| Minnesota CDPA (§ 325M.14), en vigueur 2025-07-31 | Responsables du traitement | Un consommateur peut contester le résultat du profilage, être informé de la raison, examiner les données personnelles utilisées, les corriger et faire réévaluer la décision {[95] | Flux de raison et d'examen avec réévaluation sur données corrigées | 4 · 5 |
| Illinois BIPA (740 ILCS 14), en vigueur 2008-10-03 | Entités privées | Consentement écrit éclairé avant de collecter les identifiants biométriques, un calendrier de rétention et de destruction, et un stockage sécurisé ; un droit d'action privée avec dommages-intérêts statutaires {[96][119] | Capture de consentement écrit ; calendrier de rétention en tant que code ; journal de destruction | 1 · 2 |
| Washington My Health My Data Act (RCW 19.373), à partir de 2024-03-31 | Entités réglementées | Consentement pour collecter et consentement séparé pour partager les données de santé des consommateurs, y compris les données dérivées ou extrapolées par des algorithmes ou l'apprentissage automatique, et une autorisation signée pour toute vente {[97] | Enregistrements de consentement séparés pour la collecte et le partage ; autorisation de vente signée ; drapeaux d'admission pour les données de santé dérivées | 1 · 2 |
| Colorado SB21-169 (assureurs), effective 2021-09-07 | Assureurs | Les assureurs ne peuvent pas discriminer injustement par le biais de données externes sur les consommateurs, d'algorithmes ou de modèles prédictifs ; ils maintiennent un cadre de gestion des risques, testent la discrimination injuste et déposent une attestation du responsable du risque principal selon les règles adoptées par ligne d'assurance {[92] | Inventaire des sources de données externes et des modèles ; test de disparité ; enregistrement d'attestation du responsable du risque principal | 2 · 3 · 5 |

### Droit fédéral qui atteint déjà l'IA

Les agences fédérales sont liées par les mémorandums de l'OMB [98][99]. Pour les organisations
privées, les règles fédérales qui atteignent l'IA sont des lois anciennes et neutres sur le plan
technologique : les avis d'action défavorable dans les prêts et les rapports de crédit, l'impact
disparate dans l'emploi, l'interdiction des pratiques trompeuses de la FTC Act, et le devoir de
suppression de la TAKE IT DOWN Act [100][101][102][103][104][105][106]. Le chapitre 21 couvre
[la couche fédérale](/bok/ai-laws-worldwide#united-states-the-federal-layer) ; le chapitre 16
construit les codes de raison des
[avis d'action défavorable en matière de crédit](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes)
et la
[règle des quatre cinquièmes](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio)
; le chapitre 20 couvre
[la substantiation des réclamations](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement)
et [les deepfakes et les médias synthétiques](/bok/existing-law#deepfakes-and-synthetic-media).

| Loi | Portée | Obligation | Artefact d'ingénierie | Couche |
|---|---|---|---|---|
| OMB M-25-21 (utilisation fédérale de l'IA), émis 2025-04-03 | Agences fédérales américaines (leurs fournisseurs d'IA par contrat) | Les agences fédérales appliquent les pratiques minimales à l'IA à fort impact : tests avant le déploiement, une évaluation de l'impact de l'IA, une surveillance continue, une formation des opérateurs, une supervision humaine avec un basculement de sécurité si possible, des recours ou des appels, et une consultation des utilisateurs finaux, documentés dans les 365 jours {[98] | Entrée d'inventaire des cas d'utilisation ; rapport de test avant le déploiement ; évaluation de l'impact de l'IA ; plan de surveillance ; chemin d'appel | 2 · 3 · 4 · 5 |
| OMB M-26-04 (approvisionnement en LLM), émis 2025-12-11 | Agences fédérales américaines et fournisseurs de LLM | Les appels d'offres pour les grands modèles de langage demandent, au minimum, la politique d'utilisation acceptable du fournisseur, les fiches de modèle, de système ou de données, les ressources pour les utilisateurs finaux et un mécanisme de rétroaction {[99] | Politique d'utilisation acceptable ; fiches de modèle, de système ou de données ; ressources pour les utilisateurs finaux ; canal de rétroaction | 2 · 5 |
| ECOA Regulation B (`12 CFR 1002.9`) | Créanciers | Un acreedor que toma una medida adversa proporciona una declaración de razones principales específicas, o el derecho a una dentro de 30 días; citar normas internas o una puntuación fallida es insuficiente, sea cual sea el modelo que tomó la decisión [100] | Servicio de código de razón versionado con el modelo; eval de fidelidad del código de razón; plantilla de notificación | 3 · 4 · 5 |
| FCRA (`15 U.S.C. 1681m(a)`) | Usuarios de informes de consumidor | Un usuario de un informe de consumidor que toma una medida adversa da aviso, divulga la puntuación de crédito numérica utilizada y sus factores clave, nombra la agencia de informes y declara el derecho a un informe gratuito y a disputar [101] | Registro de puntuación y factores clave por decisión adversa; plantilla de notificación | 4 |
| Título VII s. 703(k) y UGESP (`29 CFR 1607.4(D)`) | Employeurs | Un procedimiento de selección con impacto dispar es ilegal a menos que esté relacionado con el trabajo y sea consistente con la necesidad empresarial, y aún se puede requerir una alternativa menos discriminatoria; una tasa de selección inferior a cuatro quintos de la tasa del grupo más alto se considera generalmente evidencia de impacto adverso [102][103] | Eval de relación de impacto adverso por grupo con recuentos e intervalos de confianza; validación de relación con el trabajo; registro de búsqueda de alternativas | 3 · 5 |
| Ley FTC s. 5 (`15 U.S.C. 45`) | Empresas que hacen afirmaciones sobre IA | Los actos o prácticas engañosos son ilegales: las afirmaciones sobre la precisión, el rendimiento o la equidad de un sistema de IA necesitan evidencia competente y confiable antes de ser hechas [104][105] | Registro de afirmaciones vinculado a ejecuciones de eval actuales; puerta de sustanciación en copia de lanzamiento | 1 · 3 · 5 |
| Ley TAKE IT DOWN (Ley Pública 119-12), proceso vencido 2026-05-19 | Plataformas cubiertas | Las plataformas cubiertas ejecutan un proceso de notificación y eliminación y eliminan imágenes íntimas no consentidas reportadas, incl. falsificaciones generadas por IA, y copias idénticas conocidas dentro de 48 horas de una solicitud válida [106] | Tubería de eliminación con reloj de 48 horas, propietario y registro; coincidencia de copias idénticas | 4 · 5 |

## Otras jurisdicciones

La columna vertebral del mapa es el Reglamento de IA de la UE, pero una función de gobernanza que
funciona entre fronteras responde a más de un régimen. Estas filas están marcadas a partir de
2026-09-24; donde una regla aún se está moviendo, la copia lo dice.

| Jurisdicción / instrumento | Estado (a partir de 2026-09-24) | Ce qu'il demande | Artefact d'ingénierie | Couche |
|---|---|---|---|---|
| Corea del Sur: Ley Básica de IA | En vigor 2026-01-22 [34], con su Decreto de Ejecución [62]; el ministerio (MSIT) anunció un período de orientación de al menos un año en el que la búsqueda de hechos y las multas se retienen excepto en casos excepcionales, mientras se aplican los deberes [58]; detalle en [capítulo 21](/bok/ai-laws-worldwide#south-korea-the-ai-basic-act) | Deberes básicos para operadores de IA, deberes reforzados para IA de "alto impacto" en sectores sensibles, y etiquetado de contenido de IA | Registro de riesgos para IA de alto impacto; notificación de uso de IA; etiquetado de contenido de IA | 1 · 2 · 4 |
| Singapur: Marco de Gobernanza de IA de IMDA para IA Generativa | Voluntario; publicado mayo 2024 [39] | Dimensiones de gobernanza incl. pruebas, transparencia, informes de incidentes, seguridad y procedencia de contenido | Suite de eval; fichas de modelo; procedencia de contenido y marca de agua | 2 · 3 · 4 |
| ETSI EN 304 223 (Securing AI) | Publicado (V2.1.1, dic 2025) [40] | Requisitos de ciberseguridad de línea base en todo el ciclo de vida de IA (13 principios en cinco etapas) | Controles de seguridad del sistema de IA en todo el ciclo de vida; comprobaciones de cadena de suministro y AIBOM; endurecimiento en tiempo de ejecución | 4 |
| Singapur: Marco de Gobernanza de IA de IMDA para IA Agéntica (identidad y autorizaciones) | Voluntario; versión 1.5 publicada 2026-05-20 [107] | Cada agente tiene una identidad única y contabilizada, catalogada y gestionada centralmente; las autorizaciones tienen alcance, están limitadas en tiempo o sesión, no son transferibles y están limitadas por el humano autorizador | Registro de agentes con una identidad de carga de trabajo por agente; credenciales delegadas de corta duración nunca más amplias que el usuario | 2 · 4 |
| Singapur: Marco de Gobernanza de IA de IMDA para IA Agéntica (puntos de control humanos) | Voluntario; versión 1.5 publicada 2026-05-20 [107] | Puntos de control significativos para acciones de alto riesgo, irreversibles, atípicas y definidas por el usuario, con aprobaciones que son contextuales y digeribles y se aplican a través de controles a nivel de sistema | Clases de punto de control en la puerta de herramientas; registro de aprobación; métricas de supervisión | 4 · 5 |
| Canadá: Directiva sobre Toma de Decisiones Automatizada (instituciones federales) | En vigor desde 2019-04-01; modificado 2025-06-24 [108] | Completar, aprobar y publicar una evaluación de impacto algorítmico antes de la producción; aplicar los requisitos del Apéndice C para el nivel de impacto (notificación, explicación, revisión por pares, intervención humana); ofrecer recurso e informar sobre la efectividad | AIA publicado renderizado desde una base de hechos de impacto compartida; plantillas de notificación y explicación; registro de revisión por pares; ruta de recurso; disparadores de reevaluación como código | 1 · 2 · 5 |
| Brasil: LGPD `Art. 20` (revisión de decisiones automatizadas) | En vigor 2020-09-18 (verificar); sanciones desde 2021-08-01 [109] | Un titular de datos puede solicitar revisión de decisiones tomadas únicamente en procesamiento automatizado que afecten sus intereses, incl. elaboración de perfiles, y el responsable del tratamiento proporciona información clara sobre los criterios y procedimientos utilizados | Flujo de trabajo de revisión; declaración de criterios y procedimientos por sistema | 4 · 5 |

### Corea del Sur, artículo por artículo

Los deberes del operador de la Ley Básica de IA se encuentran en los Artículos 31 a 36, con la
mecánica en el Decreto de Ejecución [34][62]. Todos ellos se han aplicado desde el 22 de enero de
2026; lo que MSIT retiene durante su período de orientación de al menos un año es la búsqueda de
hechos y las multas, no los deberes [58]. El capítulo 21 recorre cada artículo en
[Corea del Sur: la Ley Básica de IA](/bok/ai-laws-worldwide#south-korea-the-ai-basic-act).

| Article | Qui est lié | Ce qu'il demande | Artefact d'ingénierie | Couche |
|---|---|---|---|---|
| `Art. 31(1)` | Operadores de negocios de IA | Informe a los usuarios con anticipación que un producto o servicio se ejecuta en IA de alto impacto o generativa, en el producto, los términos, la pantalla o el lugar de suministro (Decreto Art. 23(1)); un aviso faltante es sancionable (Art. 43) [34][62] | Componente de notificación en UI, términos y contratos; inventario de notificaciones por superficie de usuario | 2 · 4 |
| `Art. 31(2)–(3)` | Operadores que proporcionan IA generativa | Indicar que los resultados son generados por IA, y notificar o etiquetar sonido, imágenes o video sintético realista para que los usuarios puedan reconocerlos; una marca solo legible por máquina necesita al menos un aviso de texto o voz (Decreto Art. 23(2)–(3)) [34][62] | Tubería de procedencia: etiqueta visible o marca legible por máquina más al menos un aviso de texto o voz | 3 · 4 |
| `Art. 32` | Operadores de sistemas de cómputo calificados | Sistemas con al menos 10^26 FLOP de cómputo de entrenamiento acumulado, construidos con la tecnología más avanzada y que plantean riesgo amplio y grave (Decreto Art. 24), identificar, evaluar y mitigar riesgos en todo el ciclo de vida e informar los resultados a MSIT [34][62] | Registro de riesgos del ciclo de vida; monitoreo de incidentes de seguridad; informe de resultados a MSIT | 3 · 4 · 5 |
| `Art. 33` | Operadores de negocios de IA | Revisar con anticipación si un sistema es IA de alto impacto y opcionalmente pedir a MSIT que confirme; MSIT responde dentro de 30 días, extensible una vez (Decreto Art. 25) [34][62] | Registro de decisión de clasificación por sistema: área Art. 2(4), razón de riesgo, descripción general de datos de entrenamiento, respuesta de MSIT | 1 · 2 |
| `Art. 34` | Operadores de IA de alto impacto | Un plan de gestión de riesgos, un plan de explicación, un plan de protección del usuario, gestión y supervisión humana, y documentos que muestren las medidas; publicar el contenido principal y mantener la evidencia durante cinco años (Decreto Art. 27) [34][62] | Planes de gestión de riesgos, explicación y protección del usuario; supervisor humano nombrado; resumen publicado; almacén de evidencia de cinco años | 1 · 2 · 4 · 5 |
| `Art. 35` | Operadores de IA de alto impacto | Esforzarse por evaluar el efecto sobre los derechos fundamentales antes de proporcionar IA de alto impacto, cubriendo los siete elementos del Decreto Art. 28 [34][62] | Evaluación de impacto que lleva los siete elementos del decreto | 1 · 5 |
| `Art. 36` | Operadores de negocios de IA extranjeros por encima de un umbral | Un operador sin dirección o establecimiento en Corea que cumple un umbral de decreto (ingresos, ingresos de servicio de IA, usuarios diarios o una multa anterior; Decreto Art. 29) designa un representante doméstico por escrito e lo informa a MSIT [34][62] | Designación presentada ante MSIT; manual de acceso a evidencia para el representante | 5 |

### Reino Unido

El Reino Unido no tiene una ley de IA horizontal. Gobierna la IA a través de reguladores sectoriales
existentes (la ICO, la FCA, la MHRA y otros), coordinados centralmente, más el
**AI Security Institute** (renombrado del AI Safety Institute en febrero de 2025) para evaluación de
modelos fronterizos [38]. Para la toma de decisiones automatizada, la Ley de Datos (Uso y Acceso) de
2025 reemplazó el Artículo 22 del RGPD del Reino Unido con nuevos **Artículos 22A–22D** (en vigor 5
de febrero de 2026): un modelo de permiso más salvaguardas para decisiones significativas,
únicamente automatizadas, con condiciones más estrictas donde se utilizan datos de categorías
especiales. Las salvaguardas (una ruta de revisión humana significativa, un canal para hacer
representaciones y para impugnar, y un aviso de decisión) son el artefacto que el ingeniero
construye [37]. El capítulo 19 establece los Artículos 22A–22D junto al RGPD y los regímenes
estadounidenses en [los regímenes lado a lado](/bok/privacy-and-ai#the-regimes-side-by-side), y el
capítulo 16 convierte las salvaguardas en registros de explicación y contestación en
[protección de datos: el RGPD y el régimen del Reino Unido](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime).
La ley de consumidor del Reino Unido alcanza reseñas generadas por IA: la Ley de Mercados Digitales,
Competencia y Consumidores de 2024 prohíbe reseñas falsas y de incentivos ocultos desde el 6 de
abril de 2025 [111], enseñado en el capítulo 20 bajo
[el Reino Unido: Ley DMCC](/bok/existing-law#the-united-kingdom-dmcc-act).

| Jurisdicción / instrumento | Estado (a partir de 2026-09-24) | Ce qu'il demande | Artefact d'ingénierie | Couche |
|---|---|---|---|---|
| Reino Unido: Ley de Datos (Uso y Acceso) de 2025, Artículos 22A–22D del RGPD del Reino Unido | En vigor 2026-02-05 [37] | Un modelo de permiso más salvaguardas para decisiones significativas, únicamente automatizadas, con condiciones más estrictas donde se utilizan datos de categorías especiales | Salvaguardas ADM: ruta de revisión humana significativa, canal de contestación y representación, aviso de decisión | 4 · 2 |
| Reino Unido: Ley de Mercados Digitales, Competencia y Consumidores de 2024, s. 225 y Sch. 20 para. 13 | En vigor 2025-04-06 [111] | Las prácticas comerciales desleales están prohibidas, y el Anexo 20 prohíbe presentar o encargar reseñas de consumidor falsas y reseñas de incentivos ocultos, que alcanza reseñas generadas por IA | Política que bloquea la generación de reseñas; registro de procedencia de reseñas | 1 · 4 |

### China

La Chine gouverne l'IA en deux niveaux, et cette carte les tient séparés. Le niveau contraignant est
un ensemble de règles départementales émises par l'Administration du cyberespace de Chine (CAC) avec
des co-émetteurs, sur la recommandation algorithmique (2022), la synthèse profonde (2023), les
services d'IA générative (2023) et l'étiquetage du contenu synthétique généré par l'IA (2025) ;
plusieurs sont territoriales, et les Mesures provisoires pour les services d'IA générative
s'appliquent uniquement aux services offerts « au public au sein de la RPC » [43][44][45].
L'obligation d'étiquetage est soutenue par une norme nationale obligatoire, GB 45438-2025, qui porte
les champs de métadonnées que la mesure exige [46][47]. Le niveau volontaire est la norme
recommandée GB/T 45654-2025 [48] et le Cadre de gouvernance de la sécurité de l'IA TC260 [41][42].
La Loi sur la cybersécurité, modifiée par le Comité permanent de l'APN le 2025-10-28 et en vigueur
2026-01-01, ajoute un Article 20 programmatique sur l'IA qui ne crée pas en lui-même des obligations
pour les opérateurs [49] ; la règle contraignante la plus récente, les Mesures provisoires pour les
services d'interaction anthropomorphe (en vigueur 2026-07-15), est étroite dans sa portée (services
qui offrent une interaction émotionnelle soutenue) ; elle a une ligne ci-dessous et le chapitre 21
la détaille sous
[China: what chapter 08 does not already cover](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover)
[50]. Les informations personnelles sont régies par la Loi sur la protection des informations
personnelles, dont l'Article 24 sur la prise de décision automatisée a également une ligne [110]. Le
cadre 3.0 (14 septembre 2026) est un document technique TC260 publié sous la direction de la CAC et
décrit comme « une référence pour les développeurs, les fournisseurs et les utilisateurs » : il
établit une taxonomie des risques à trois blocs (inhérent, application et secondaire), classe le
risque qualitativement par scénario, niveau d'intelligence et échelle sans seuil de calcul ou de
paramètre, traite les modèles open-source comme un profil de risque distinct et nomme la sécurité de
la puissance informatique comme une catégorie de risque, et son Appendice 2 parcourt le cycle de vie
des agents de la conception au déclassement [42]. Le commentaire des praticiens a signalé les agents
et les systèmes physiquement interactifs comme le changement phare de la nouvelle version [51].

Les instruments ci-dessus se résolvent en lignes obligation-à-artefact de la même forme que les
autres juridictions :

| Jurisdicción / instrumento | Statut (au 2026-09-20) | Ce qu'il demande | Artefact d'ingénierie | Couche |
|---|---|---|---|---|
| Chine : Provisions on the Administration of Algorithmic Recommendation in Internet Information Services (CAC, MIIT, MPS and SAMR Order No. 9) | Contraignant ; en vigueur 2022-03-01 [43] | Dépôt d'algorithme pour les services ayant des attributs d'opinion publique ou une capacité de mobilisation sociale, évaluation de la sécurité, affichage du numéro de dépôt, et une option utilisateur pour désactiver la recommandation personnalisée | Inventaire des algorithmes avec enregistrement et numéro de dépôt ; ensemble de preuves d'évaluation de la sécurité ; contrôle de désactivation à l'exécution | 1 · 2 · 4 |
| Chine : Provisions on the Administration of Deep Synthesis in Internet Information Services (CAC, MIIT and MPS Order No. 12) | Contraignant ; en vigueur 2023-01-10 [44] | Étiquettes bien visibles où le contenu synthétique pourrait induire le public en erreur et marques techniques non supprimables ; gestion des données d'entraînement ; consentement séparé pour l'édition de visage et de voix ; dépôt et évaluation de la sécurité pour les fonctions de formation d'opinion | Pipeline de provenance du contenu (étiquette visible plus marque de métadonnées) ; enregistrement de gouvernance des données d'entraînement ; porte de consentement ; évaluation de la sécurité avant la mise en circulation | 2 · 3 · 4 |
| Chine : Interim Measures for the Administration of Generative AI Services (CAC and six other bodies, Order No. 15) | Contraignant ; en vigueur 2023-08-15 ; s'applique aux services offerts au public au sein de la RPC [45] | Données d'entraînement de source licite et modèles fondamentaux ; étiquetage du contenu selon les règles de synthèse profonde ; évaluation de la sécurité et dépôt d'algorithme pour les services de formation d'opinion ; arrêter, supprimer, réentraîner et signaler le contenu illégal | Enregistrement de la traçabilité des données et des licences ; porte d'évaluation sur le contenu généré ; pipeline d'incident avec une boucle de réentraînement ; enregistrement de dépôt | 2 · 3 · 4 · 5 |
| Chine : Measures for Labelling AI-Generated Synthetic Content, with mandatory standard GB 45438-2025 | Contraignant ; en vigueur 2025-09-01, la norme mise en œuvre le même jour [46][47] | Étiquettes explicites (texte, audio ou graphique) et étiquettes de métadonnées implicites portant le nom ou le code du fournisseur et un numéro de contenu ; les plateformes de distribution vérifient les métadonnées et signalent le contenu d'IA suspecté | Pipeline de provenance et de filigrane émettant les champs de métadonnées GB 45438 ; détection et signalisation côté plateforme | 3 · 4 |
| Chine : GB/T 45654-2025 Basic security requirements for generative AI services | Norme nationale recommandée (volontaire) ; mise en œuvre 2025-11-01 [48] | Source du corpus d'entraînement et criblage du contenu, exigences de sécurité du modèle et les méthodes d'évaluation qui sous-tendent l'évaluation de la sécurité | Enregistrement du criblage du corpus ; banques de questions d'évaluation ; rapport d'évaluation de la sécurité | 3 · 5 |
| Chine : TC260 AI Safety Governance Framework 3.0 | Volontaire ; publié 2026-09-14, s'appuyant sur 1.0 (2024) et 2.0 (2025) [41][42] | Une taxonomie des risques à trois blocs (inhérent, application, secondaire), des contre-mesures technologiques et de gouvernance et des directives basées sur les rôles ; les opérateurs conservent les journaux pendant au moins six mois et les auditent, surveillent le risque en temps réel, maintiennent une chaîne de responsabilité traçable et évaluent la résilience (§5.3) | Registre des risques indexé selon la taxonomie du cadre ; politique de rétention des journaux (six mois) avec audit ; surveillance des risques en temps réel ; évaluation de la résilience | 1 · 4 · 5 |
| Chine : Personal Information Protection Law, Arts. 24 and 55–56 | Contraignant ; en vigueur 2021-11-01 [110] | Les décisions automatisées restent transparentes et équitables, sans traitement différentiel déraisonnable dans les prix ou les conditions ; les poussées ciblées offrent une option non personnalisée ou un refus facile ; les individus peuvent demander une explication et refuser les décisions uniquement automatisées ayant un impact significatif ; une évaluation d'impact au préalable, conservée au moins trois ans | Service d'explication et itinéraire de décision manuelle ; option non personnalisée à l'exécution ; enregistrement d'évaluation d'impact conservé trois ans | 2 · 4 · 5 |
| Chine : Interim Measures for the Administration of Anthropomorphic Interaction Services (CAC, NDRC, MIIT, MPS and SAMR) | Contraignant ; en vigueur 2026-07-15 [50] | Un mode pour mineurs ; signaux d'IA et un rappel après deux heures d'utilisation continue ; une sortie facile ; une évaluation de la sécurité à 1 million d'utilisateurs enregistrés ou 100 000 utilisateurs actifs mensuels ; dépôt | Configuration du mode pour mineurs ; minuteur de rappel ; moniteur de seuil de nombre d'utilisateurs ; rapport d'évaluation de la sécurité ; enregistrement de dépôt | 1 · 2 · 4 · 5 |
| Chine : TC260 Framework 3.0, Appendix 2 (agentic AI risk management) | Volontaire ; publié 2026-09-14 [42] | Identité unique et permissions de moindre privilège par agent selon le mode de décision ; points de contrôle humains avec journaux d'approbation inviolables et refus par défaut ; vérification des outils et des compétences ; guardrails d'exécution (alerte, restriction, interception, suspension, arrêt) ; isolation de la mémoire sans identifiants en mémoire ; authentification mutuelle ; validation du bac à sable, red teaming et re-validation en cas de changement majeur ; déclassement contrôlé | Registre des agents avec identité et portée ; magasin de journaux d'approbation ; liste d'autorisation des outils avec vérifications d'intégrité ; guardrails d'exécution et kill switch ; politique de portée de la mémoire ; runbook de déclassement | 2 · 3 · 4 · 5 |

Les contrôles des agents de l'Appendice 2 s'alignent avec les deux références agentic que ce
chapitre porte déjà, le Top 10 OWASP pour les applications agentic [16] et l'Initiative de normes
pour les agents d'IA du NIST [29] :

| Contrôle des agents | TC260 Framework 3.0, Appendix 2 [42] | OWASP Top 10 for Agentic Applications 2026 [16] | NIST AI Agent Standards Initiative [29] | Couche |
|---|---|---|---|---|
| Identité et moindre privilège | II.2 : identité unique par agent, permissions selon le mode de décision, identifiants révoqués à la fin de la tâche | ASI03 Abus d'identité et de privilèges | Identité de l'agent, authentification, autorisation | 2 · 4 |
| Points de contrôle humains et journaux d'approbation | II.3 : contrôles échelonnés, points de contrôle humain, journaux d'approbation inviolables, refus par défaut | ASI09 Exploitation de la confiance humain-agent ; ASI01 Détournement d'objectif d'agent | Aucun | 4 · 5 |
| Outils, compétences et chaîne d'approvisionnement | II.4 : vérification des outils, sélection équitable des outils, détection des anomalies, gestion des compétences | ASI02 Mauvaise utilisation et exploitation d'outils ; ASI04 Vulnérabilités de la chaîne d'approvisionnement des agents | Sécurité des agents | 2 · 4 |
| Guardrails d'exécution et limites d'exécution | II.5(1)(2)(5)(6) : contrôle des entrées, guardrails, limites d'étapes/fréquence/durée, isolation du bac à sable | ASI01 Détournement d'objectif d'agent ; ASI05 Exécution de code inattendue (RCE) ; ASI08 Défaillances en cascade ; ASI10 Agents malveillants | Aucun | 4 |
| Mémoire | II.5(3) : fenêtres de rétention, isolation entre utilisateurs et tâches, pas d'identifiants en mémoire | ASI06 Memory & Context Poisoning | Aucun | 3 · 4 |
| Communication agent–modèle–outil | II.5(4) : authentification mutuelle, intégrité, résistance à la relecture | ASI07 Insecure Inter-Agent Communication | Authentification | 4 |
| Surveillance, audit, bac à sable, red teaming, réponse aux incidents | II.6 : blocage des anomalies, gestion des journaux, audit de sécurité, validation du bac à sable, red teaming, plans d'urgence, re-validation en cas de changement majeur | Transversal | Évaluations adversariales des agents | 3 · 5 |
| Déclassement | II.7 : arrêt complet, sauvegarde des données, nettoyage de l'environnement | ASI10 Rogue Agents (agents résiduels) | Aucun | 2 · 4 |

Le chapitre 23 compare ces sources de contrôle des agents avec celles de la CSA et de Singapour dans
[frameworks written for agents](/bok/governing-agents#frameworks-written-for-agents).

### Traité et droit international non contraignant

Trois instruments internationaux portent des obligations qu'un ingénieur peut prouver. La
Convention-cadre du Conseil de l'Europe (STCE n° 225) lie les Parties, non les entreprises, et n'est
pas encore en vigueur ; au sein de l'UE, elle est mise en œuvre par le Règlement de l'IA [112][113].
Les Principes de l'OCDE sur l'IA, révisés le 3 mai 2024, et le Code de conduite de Hiroshima du G7
du 30 octobre 2023 sont volontaires [114][115]. Le chapitre 22 les enseigne dans
[what the Convention asks for](/bok/principles-and-standards#what-the-convention-asks-for-and-what-it-changes-in-the-stack),
[the five principles and five recommendations](/bok/principles-and-standards#the-five-principles-and-five-recommendations)
et [the G7 Hiroshima Process](/bok/principles-and-standards#g7-hiroshima-process).

| Instrument et clause | Estado (a partir de 2026-09-24) | Ce qu'il demande | Artefact d'ingénierie | Couche |
|---|---|---|---|---|
| Convention du Conseil de l'Europe `Art. 14(2)(a)–(b)` | Non en vigueur (au 2026-09-24) [112][113] | Documenter les informations pertinentes sur les systèmes qui peuvent affecter significativement les droits humains, suffisamment pour que les personnes affectées puissent contester les décisions | Enregistrement des décisions par résultat conséquent ; itinéraire de contestation avec l'enregistrement joint | 2 · 5 |
| Convention du Conseil de l'Europe `Art. 15(2)` | Non en vigueur (au 2026-09-24) [112][113] | Notifier les personnes qu'elles interagissent avec un système d'IA, selon le cas | Divulgation d'interaction appliquée à l'exécution | 4 |
| Convention du Conseil de l'Europe `Art. 16(1)–(2)(a)–(f)` | Non en vigueur (au 2026-09-24) [112][113] | Gestion itérative, graduée du risque et de l'impact : contexte, gravité et probabilité, points de vue des parties prenantes, surveillance et documentation | Registre des risques en tant que code ; évaluation d'impact liée au registre ; surveillance par rapport à une ligne de base | 1 · 2 · 4 |
| Convention du Conseil de l'Europe `Art. 16(2)(g)` | Non en vigueur (au 2026-09-24) [112][113] | Tester les systèmes avant la première utilisation et lorsqu'ils sont significativement modifiés, selon le cas | Eval gate à la mise en service et en cas de modification substantielle | 3 |
| Principes de l'OCDE sur l'IA, principe 1.4(b) | Non contraignant ; révisé 2024-05-03 [114] | Les mécanismes permettent aux systèmes d'IA qui risquent de causer un préjudice indu d'être contournés, réparés et/ou mis hors service en toute sécurité | Kill switch testé ; registre de mise hors service dans le registre | 2 · 4 |
| Principes de l'OCDE sur l'IA, principe 1.5(b)–(c) | Non contraignant ; révisé 2024-05-03 [114] | Traçabilité des ensembles de données, des processus et des décisions, et gestion systématique des risques à chaque phase du cycle de vie | Magasin de preuves indexé par les identifiants du registre ; registre des risques en tant que code ; registres des fournisseurs | 1 · 5 |
| Code de conduite du G7 Hiroshima, action 1 | Volontaire ; convenu 2023-10-30 [115] | Identifier, évaluer et atténuer les risques tout au long du cycle de vie, y compris les tests avant le déploiement | Suite d'équipes adversaires de test en conditions réelles ; eval gate | 3 |
| Code de conduite du G7 Hiroshima, actions 2 et 4 | Volontaire ; convenu 2023-10-30 [115] | Identifier et atténuer les vulnérabilités, les incidents et les abus après le déploiement, et partager les informations et signaler les incidents de manière responsable | Surveillance à l'exécution ; pipeline d'incidents avec une branche de partage externe | 4 · 5 |
| Code de conduite du G7 Hiroshima, action 3 | Volontaire ; convenu 2023-10-30 [115][116] | Signaler publiquement les capacités, les limitations et les usages appropriés et inappropriés ; le cadre de signalement de l'OCDE a collecté de tels rapports depuis 2025 | Fiche de modèle publiée à partir du registre | 2 |
| Code de conduite du G7 Hiroshima, action 7 | Volontaire ; convenu 2023-10-30 [115] | Déployer des mécanismes d'authentification du contenu et de traçabilité d'origine où possible | Marquage de traçabilité d'origine à la sortie ; test de vérification | 4 |

Les mappages sont illustratifs, non une affirmation de conformité.

## Ce qui n'est PAS encore harmonisé

La carte a une lacune, et il est important de l'énoncer clairement plutôt que de la dissimuler.

- **Aucune norme harmonisée n'est citée au Journal officiel.** Au 2026-09-24, la présomption de
  conformité de l'article 40 n'est disponible pour personne, car aucune norme harmonisée n'a été
  citée au JO [20].
- **EN 18286 est publiée mais non citée.** La norme de système de gestion de la qualité de l'article
  17 EN 18286:2026 a été publiée en juillet 2026 (la première norme JTC 21 sur la loi relative à
  l'IA à atteindre la publication), mais elle n'est pas encore citée au Journal officiel, elle ne
  bénéficie donc d'aucune présomption de conformité [20][21].
- **Les autres projets JTC 21 sont à l'enquête ou avant.** Au 2026-09-24, selon un point
  d'information sur les normes paneuropéennes, les votes d'enquête sur la prEN 18228 (`Art. 9`,
  gestion des risques) et la prEN 18282 (`Art. 15`, cybersécurité) ont fermé le 30 juil 2026 et sur
  la prEN 18229-1 (`Art. 12`, enregistrement) le 20 août 2026 ; la prEN 18229-3 (`Art. 14`, contrôle
  humain) est entrée en enquête le 30 juil 2026 ; et les prEN 18229-4 et -5 (`Art. 15`, exactitude
  et robustesse) ont été approuvées comme nouveaux projets le 24 juin 2026 [60], conformément au
  suivi public qui les avait en enquête à la mi-2026 [53]. Le CEN et le CENELEC peuvent publier un
  produit prioritaire directement après un vote d'enquête positif et les cibler pour le Q4 2026 [61]
  ; la publication ne serait toujours pas une citation au JO. Le chapitre 22 suit chaque produit et
  le
  [statut des normes harmonisées JTC 21](/bok/principles-and-standards#harmonised-standards-under-the-ai-act),
  et explique
  [comment fonctionne la présomption de conformité](/bok/principles-and-standards#how-presumption-of-conformity-works).
- **ISO/IEC 42001 n'est pas le système de gestion de la qualité de l'article 17.** La certification
  à EN ISO/IEC 42001:2026 atteste un système de gestion de l'IA ; elle ne confère pas une
  présomption de conformité à la loi relative à l'IA, car ce n'est pas une norme harmonisée et son
  champ d'application diffère du système de gestion de la qualité de l'article 17 [11][12].
- **Le Code de pratique est volontaire.** Signer le Code GPAI est un moyen de démontrer la
  conformité aux obligations GPAI ; ce n'est pas une présomption légale de conformité [9].
- **Le cadre chinois ne fait pas référence croisée aux instruments occidentaux.** Le cadre de
  gouvernance de la sécurité de l'IA TC260 3.0 ne cite aucune ISO/IEC 42001, ISO/IEC 23894, NIST AI
  RMF ou loi relative à l'IA de l'UE (ses points de référence nommés sont l'Initiative mondiale de
  gouvernance de l'IA et les canaux centrés sur l'ONU), et il ne nomme pas non plus les règles
  contraignantes propres à la Chine [42]. Une correspondance entre les deux stacks est quelque chose
  que l'ingénieur construit ; aucun des documents des deux côtés ne la fournit.

Le registre porte les trois produits JTC 21 sur lesquels le livre s'appuie, avec leur statut au
2026-09-24 [20][21][60] :

| Produit | Ce qu'elle est | Estado (a partir de 2026-09-24) | Artefact d'ingénierie | Couche |
|---|---|---|---|---|
| EN 18286:2026 | Exigences de système de gestion de la qualité soutenant l'art. 17 ; publiée mais non citée au Journal officiel, elle ne bénéficie donc d'aucune présomption de conformité | Publiée juillet 2026 ; non citée au JO [21][20] | Les processus de système de gestion de la qualité s'exécutent comme des étapes de pipeline ; preuves de conception et de contrôle des modifications | 1 · 5 |
| prEN 18228 | Projet de norme harmonisée pour le système de gestion des risques de l'art. 9 | Projet ; vote d'enquête fermé 2026-07-30, selon le rapport [60] | Dossier de risques du fournisseur par système ; critères d'acceptabilité en tant que code ; surveillance des contrôles | 1 · 3 · 5 |
| prEN 18229-1 | Projet de norme harmonisée pour l'enregistrement de l'art. 12 | Projet ; vote d'enquête fermé 2026-08-20, selon le rapport [60] | Spécification de journalisation par système ; journaux d'événements structurés et signés mappés au projet | 4 |

La lecture pratique : pour la période que couvre cette édition, vous ne pouvez pas acheter une
présomption de conformité prête à l'emploi. Les lignes obligation-à-artefact ci-dessus montrent
comment une fonction de gouvernance atteste l'obligation sur ses propres mérites tandis que les
normes harmonisées sont encore en cours de rédaction.

> **En pratique (illustratif)**
> Une équipe de gouvernance a maintenu cette carte non pas comme une diapositive mais comme une
> correspondance lisible par machine : un fichier versionné reliant chaque identifiant d'obligation
> à l'artefact qui a produit sa preuve et à la couche dans laquelle elle résidait, émis comme
> définitions de composants `OSCAL`. Quand l'Omnibus a déplacé les dates de haut risque, le
> changement était une différence sur un champ par ligne affectée, et chaque ligne « Maps to » en
> aval s'est re-résolue à partir du même fichier. La question d'audit « montrez-moi ce qui répond à
> l'article 15 » est devenue une requête contre la correspondance, pas une chasse dans un wiki.

**Correspondances :** ce chapitre est l'index inverse de tout le livre ; chaque article de la loi
relative à l'IA de l'UE, le Code de pratique GPAI, le RGPD, la SRI 2, la DORA, la CRA, la Directive
sur la responsabilité du fait des produits, la DSM, les Pratiques commerciales déloyales, le Travail
de plateforme et les Directives sur le crédit à la consommation, la DSA, ISO/IEC 42001, 42005,
42006, 23894 et 22989, NIST AI RMF et les travaux plus récents du NIST sur l'IA, CSA AICM, OWASP
GenAI/Agentic, les produits JTC 21 du CEN-CENELEC, les lois fédérales et étatiques américaines, les
autres juridictions et les instruments de traité et de droit souple nommés ci-dessus se mappent sur
le stack à cinq couches (chapitre 04) et le catalogue de motifs (chapitre 05). Les mappages sont
illustratifs, non une affirmation de conformité.

## Ce que vous pouvez faire cette semaine

1. **Trouvez vos lignes.** Pour un système, énumérez les lignes de cette carte qui s'y appliquent,
   par rôle et classe de risque, avec la date à partir de laquelle chacune s'applique.
2. **Nommez un artefact par ligne.** À côté de chaque ligne, écrivez l'artefact qui l'atteste
   aujourd'hui, ou marquez la lacune.
3. **Mettez les dates dans le pipeline.** Stockez chaque date applicable en tant que données que vos
   vérifications de politique lisent, de sorte qu'une obligation qui commence à s'appliquer
   apparaisse comme une vérification échouée, pas une surprise.
4. **Attestez une obligation sur ses propres mérites.** Pour l'obligation pour laquelle vous vous
   attendiez le plus à ce qu'une norme harmonisée la couvre, notez comment vous l'attestez
   aujourd'hui sans présomption de conformité.
5. **Relisez en cas de modification.** Quand une date ou une ligne de cette carte change, réexécutez
   la première étape pour vos systèmes et enregistrez la différence.

## Sources

[1] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028; legacy public-authority → 2 Aug 2030). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1 amendments to Reg. (EU) 2024/1689: new Art. 4a (special-category data for bias detection, pseudonymisation, deletion once bias is corrected); new Art. 5(1)(ba)–(bb) NCII and CSAM bans from 2 Dec 2026; Art. 111(2) public-authority systems by 2 Aug 2030; new Art. 111(4) Art. 50(2) marking by 2 Dec 2026 for systems placed on the market before 2 Aug 2026; Art. 113 dates. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Commission enforcement powers over GPAI providers apply from 2 August 2026; obligations since 2 August 2025 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), Art. 101 (Commission fines for GPAI providers: up to 3% or EUR 15M) and Art. 99 (penalties by national authorities: 7% / 3% / 1% ceilings). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] "AI literacy, the Digital Omnibus and Article 4 of the AI Act" (Art. 4 reworded to "support the development of" AI literacy; the reworded text applies from 27 Jul 2026). Law & Technology. 2026. https://lawandtechnology.eu/en/ai-literacy-digital-omnibus-article-4-ai-act/ (verified: secondary)
[7] Regulation (EU) 2024/1689 (AI Act), Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[8] Regulation (EU) 2026/1744 (Digital Omnibus on AI), new Arts. 75a–75d of the AI Act: AI Office investigation powers, binding commitments, non-compliance decisions and periodic penalty payments up to 5% of average daily income or worldwide annual turnover per day (Art. 75c(5)). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[9] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; three chapters: Transparency, Copyright, Safety and Security). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[10] GPAI Code of Practice: contents and signatories (Safety & Security applies to systemic-risk models; official signatory list). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[11] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[12] CSA research note on EU AI Act, prEN 18286 and ISO/IEC 42001 (scope difference; EN ISO/IEC 42001:2026 not a harmonised standard). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
[13] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[14] AI Risk Management Framework 1.0 (functions: Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[15] AI Controls Matrix (AICM) v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[16] OWASP Top 10 for Agentic Applications for 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; names as in the document's contents, read 2026-09-24). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[17] 2026 Top 10 for LLM Applications (released 3 Aug 2026; Excessive Agency is LLM03:2026) and the Agent Control Standard (ACS), donated to the project. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum (Justine Gluck). 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; agreed chapter amendment; creates an oversight office within the Department of Financial Services; 72-hour incident reporting). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[20] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[21] "EN 18286 in the Spotlight: Supporting Compliance with the AI Act" (EN 18286:2026, Art. 17 QMS, published; the first standard in support of the AI Act). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[22] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026; amends Art. 3(14), 6(1a)–(1c), 25(2) and (4), 75(1), new 75(1a) (serious incidents of systems under the AI Office's competence reported to the AI Office), 99(4)(da), Annex I (machinery to Section B) and Annex VIII Section B (points 7 and 9 deleted); Art. 73 not amended; Art. 113(a) Chapters I and II apply from 2 Feb 2025; Art. 113(c) as replaced: Chapter III, Sections 1, 2 and 3, except Art. 6(5), apply from 2 Dec 2027 (Annex III) and 2 Aug 2028 (Annex I). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), Art. 25 (responsibilities along the AI value chain; conditions under which a value-chain actor becomes a provider; information flow to downstream actors). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[24] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; frontier model = trained with over 10^26 operations costing over USD 100M; safety protocols and 72-hour incident disclosure; Attorney General and Division of Homeland Security and Emergency Services; superseded in scope by the 2026 chapter amendment, which drops the cost test, adds a USD 500M revenue test and moves oversight to the DFS [25]). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[25] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment introduced 6 Jan 2026, passed 11 Mar 2026, signed 27 Mar 2026; effective 1 Jan 2027; SB 53's thresholds: frontier model above 10^26 operations, large frontier developer above USD 500M annual revenue; large frontier developers publish the framework, all frontier developers report critical safety incidents; DFS oversight office). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[26] "AI Act: Commission publishes a reporting template for serious incidents involving general-purpose AI models with systemic risk" (template for serious-incident reporting under Art. 55; aligned to Commitment 9 of the GPAI Code). European Commission. 2025-11-04. https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai (verified: primary)
[27] ISO/IEC 42006:2025, Requirements for bodies providing audit and certification of AI management systems (builds on ISO/IEC 17021-1; who may credibly certify to 42001). ISO/IEC. 2025. https://www.iso.org/standard/42006 (verified: secondary)
[28] ISO/IEC 23894:2023, Guidance on AI risk management (adapts ISO 31000 to AI). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: secondary)
[29] "Announcing the AI Agent Standards Initiative for Interoperable and Secure Innovation" (CAISI initiative; agent identity, authentication and security). NIST. 2026-02-17. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure (verified: primary)
[30] NIST IR 8596 (initial preliminary draft; comments closed 2026-01-30; no later version on CSRC on 2026-09-24): Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile); Secure / Defend / Thwart. NIST. 2025-12-16. https://csrc.nist.gov/pubs/ir/8596/iprd (verified: primary)
[31] NIST AI 800-1 (second public draft): Managing Misuse Risk for Dual-Use Foundation Models (voluntary; still in draft, no final version on NIST's publication server on 2026-09-24). NIST. 2025-01. https://www.nist.gov/news-events/news/2025/01/updated-guidelines-managing-misuse-risk-dual-use-foundation-models (verified: primary)
[32] "Securing the Agentic Control Plane: Key Progress at the CSAI Foundation" (names the Agentic Trust Framework, AARM, the Catastrophic Risk Annex and STAR for AI; no "Agentic Control Supplement" is named, checked 2026-09-24). Cloud Security Alliance. 2026-04-29. https://cloudsecurityalliance.org/blog/2026/04/29/securing-the-agentic-control-plane-key-progress-at-the-csai-foundation (verified: primary)
[33] AICM Catastrophic Risk Annex: enhanced AICM controls for high-autonomy systems with catastrophic-risk potential. Cloud Security Alliance. 2026-08-05. https://cloudsecurityalliance.org/csai-foundation/catastrophic-risk-annex (verified: primary)
[34] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법; Act No. 20676, promulgated 2025-01-21, in force 2026-01-22; high-impact AI duties in Arts. 31 to 36; fact-finding in Art. 40; fines in Art. 43). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[35] Texas Responsible Artificial Intelligence Governance Act (HB 149), enrolled text; effective 1 Jan 2026. Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[36] "Colorado AI law in flux: comprehensive replacement bill signed after federal court blocks predecessor's enforcement" (SB 24-205 delayed to 30 Jun 2026, then replaced by SB 26-189, effective 1 Jan 2027). McDermott Will & Emery. 2026. https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/ (verified: secondary)
[37] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[38] "AI Security Institute" (written statement announcing the rename of the AI Safety Institute). UK Parliament. 2025-02-24. https://questions-statements.parliament.uk/written-statements/detail/2025-02-24/hlws454 (verified: primary)
[39] Model AI Governance Framework for Generative AI (voluntary). IMDA / AI Verify Foundation. 2024-05. https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf (verified: primary)
[40] ETSI EN 304 223: Securing Artificial Intelligence (SAI); Baseline Cyber Security Requirements for AI Models and Systems (V2.1.1, Dec 2025; 13 principles across five lifecycle stages). ETSI. 2025-12. https://www.etsi.org/newsroom/press-releases/2627-etsi-releases-world-leading-standard-for-securing-ai/ (verified: primary)
[41] 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance; released 2026-09-14 at the 2026 National Cybersecurity Publicity Week). Cyberspace Administration of China. 2026-09-14. https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm (verified: primary)
[42] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF; English text printed pp. 49–130; §2.1.1(b) open-source models p. 55; §2.1.4(a) computing power p. 59; §5.3 operators' guidelines pp. 101–104; Appendix 2 agentic AI risk management pp. 113–126; no reference to ISO/IEC 42001, NIST AI RMF or the EU AI Act. TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[43] Provisions on the Administration of Algorithmic Recommendation in Internet Information Services (互联网信息服务算法推荐管理规定; CAC, MIIT, MPS and SAMR Order No. 9; promulgated 2021-12-31; in force 2022-03-01; Art. 17 opt-out, Art. 24 algorithm filing, Art. 27 security assessment). Cyberspace Administration of China. 2022-01-04. https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm (verified: primary)
[44] Provisions on the Administration of Deep Synthesis in Internet Information Services (互联网信息服务深度合成管理规定; CAC, MIIT and MPS Order No. 12; promulgated 2022-11-25; in force 2023-01-10; Arts. 14 training data and separate consent, 16–17 marks and labels, 19 filing, 15/20 security assessment). Cyberspace Administration of China. 2022-12-11. https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm (verified: primary)
[45] Interim Measures for the Administration of Generative AI Services (生成式人工智能服务管理暂行办法; CAC and six other bodies, Order No. 15; published 2023-07-13; in force 2023-08-15; Art. 2 scope: services to the public within the PRC; Art. 7 lawful-source data; Art. 12 labelling; Art. 14 stop-remove-retrain-report; Art. 17 security assessment and filing). Cyberspace Administration of China. 2023-07-13. https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm (verified: primary)
[46] Measures for Labelling AI-Generated Synthetic Content (人工智能生成合成内容标识办法; CAC, MIIT, MPS and NRTA; published 2025-03-14; in force 2025-09-01; explicit and implicit labels; platform verification duty). Cyberspace Administration of China. 2025-03-14. https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm (verified: primary)
[47] GB 45438-2025 Cybersecurity technology: Labeling method for content generated by artificial intelligence (网络安全技术 人工智能生成合成内容标识方法; mandatory national standard; issued 2025-02-28; implemented 2025-09-01). SAMR / SAC (drafted by TC260). 2025-02-28. https://std.samr.gov.cn/gb/search/gbDetailed?id=301E0388CB75788DE06397BE0A0AE1B4 (verified: primary)
[48] GB/T 45654-2025 Cybersecurity technology: Basic security requirements for generative artificial intelligence service (网络安全技术 生成式人工智能服务安全基本要求; recommended national standard; issued 2025-04-25; implemented 2025-11-01). SAMR / SAC (drafted by TC260). 2025-04-25. https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F67D3F376E0A0A0FF5317FB36B32A30A (verified: primary)
[49] Cybersecurity Law of the PRC as amended by the NPC Standing Committee decision of 2025-10-28 (in force 2026-01-01; new Article 20 on AI: state support for AI research, training-data and computing infrastructure, AI ethics norms, risk monitoring, assessment and safety supervision). Cyberspace Administration of China (consolidated text). 2025-12-29. https://www.cac.gov.cn/2025-12/29/c_1768735112911946.htm (verified: primary)
[50] Interim Measures for the Administration of Anthropomorphic Interaction Services (人工智能拟人化互动服务管理暂行办法; CAC, NDRC, MIIT, MPS and SAMR; published 2026-04-10; in force 2026-07-15). Cyberspace Administration of China. 2026-04-10. https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm (verified: primary)
[51] "China's TC260 released Version 3.0 of the AI Safety Governance Framework" (LinkedIn post; agents and physically interactive systems as the headline change). Barbara Li (Reed Smith). 2026-09. https://www.linkedin.com/posts/barbara-li-67532067_tc260-ai-governance-share-7505863215600308224-XIyo/ (verified: reported)
[52] Real Decreto 729/2023, de 22 de agosto, por el que se aprueba el Estatuto de la Agencia Española de Supervisión de Inteligencia Artificial (Royal Decree approving the AESIA statute; seat in A Coruña; BOE no. 210, 2 Sep 2023). Boletín Oficial del Estado. 2023-09-02. https://www.boe.es/eli/es/rd/2023/08/22/729 (verified: primary)
[53] JTC 21 standards tracker (risk, logging and cybersecurity standards at Enquiry, end-2026 target; a vendor-maintained tracker, not a CEN-CENELEC publication). kla.digital. 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: reported)
[54] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[55] SB26-189 Automated Decision-Making Technology (signed by the Governor 14 May 2026; Session Laws chapter 131). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[56] SB 53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; approved by the Governor 29 Sep 2025; frontier AI framework; critical safety incidents to the Office of Emergency Services within 15 days; civil penalty up to USD 1M per violation, Attorney General only). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[57] Regulation (EU) 2024/1689 (AI Act): Art. 26(5) (a deployer that identifies a serious incident informs the provider first, then the importer or distributor and the market-surveillance authority; Art. 73 applies mutatis mutandis if it cannot reach the provider) and Art. 73(1)–(4) (report immediately on a causal link or its reasonable likelihood, and no later than 15, 2 or 10 days after the provider or, where applicable, the deployer becomes aware). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[58] "AI Basic Act Update: Enforcement and Key Implications" (MSIT guidance period of at least one year for fact-finding and fines; exceptions for loss of life or human-rights violations). Shin & Kim. 2026-02-11. https://www.shinkim.com/eng/media/newsletter/3117 (verified: secondary)
[59] AI Risk Management Framework ("The AI RMF 1.0 is being revised as part of the White House AI Action Plan"; no revised version published as of 2026-09-24). NIST. 2026-09-24. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[60] Project stages for JTC 21 deliverables read on 2026-09-24 (prEN 18228 and prEN 18282 Enquiry votes closed 2026-07-30; prEN 18229-1 closed 2026-08-20; prEN 18229-3 at Enquiry from 2026-07-30; prEN 18229-4 and -5 new projects 2026-06-24). Genorma (pan-European standards information point with national standards bodies). 2026-09-24. https://genorma.com/en/standards/pren-18228 (verified: secondary)
[61] "Update on CEN and CENELEC's decision to accelerate the development of standards for artificial intelligence" (direct publication after a positive Enquiry vote; Q4 2026 target). CEN-CENELEC. 2025-10-23. https://www.cencenelec.eu/news-events/news/2025/brief-news/2025-10-23-ai-standardization/ (verified: primary)
[62] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, promulgated 2026-01-21, in force 2026-01-22). Korean Law Information Center (MOLEG). 2026-01-21. https://www.law.go.kr/LSW/lsInfoP.do?efYd=20260122&lsiSeq=282879 (verified: primary)
[63] Regulation (EU) 2024/1689 (AI Act), consolidated text of 27 July 2026 incorporating Regulation (EU) 2026/1744 (Art. 3(1) AI system; Art. 6(3)–(4) documented non-high-risk assessment and Art. 49(2) registration; Art. 15(3)–(4) declared accuracy metrics and feedback loops; Art. 16(l) accessibility; Art. 17(1)(m) accountability framework; Art. 18 documentation kept 10 years; Art. 19 logs kept at least six months; Art. 20 corrective actions; Arts. 22–24 authorised representatives, importers and distributors; Art. 26(1)–(11) deployer duties; Art. 43(4) new assessment on substantial modification; Art. 48 CE marking; Art. 52 notification within two weeks; Art. 53(1)(c) copyright policy; Art. 54 authorised representative of GPAI providers; Art. 73(6) investigation without altering the system; Art. 86 right to explanation; Art. 87 Directive (EU) 2019/1937 applies; Art. 111(3) GPAI models placed on the market before 2 August 2025 comply by 2 August 2027; Art. 113). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[64] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (internal reporting channels for private legal entities with 50 or more workers, Art. 8(3); acknowledgment within seven days and feedback within three months, Art. 9(1)). Publications Office of the EU (EUR-Lex). 2019-11-26. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[65] General-Purpose AI Code of Practice, Safety and Security chapter (Commitment 9, Measure 9.3: 2, 5, 10 and 15 days by incident class, intermediate reports at least every four weeks, final report within 60 days of resolution; Measure 9.4: records kept at least five years; Appendix 1.3 sources of systemic risk incl. the capability to operate autonomously, colluding with other AI systems, access to tools and the level of human oversight; Appendix 1.4 specified systemic risks incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[66] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 5(1)(b)–(c), 5(2), 6, 6(4), 7, 9, 13, 14, 15(1)(h), 16, 17, 21, 22, 25, 28, 30, 33–36, 44–49; applies from 25 May 2018, Art. 99(2)). Publications Office of the EU (EUR-Lex). 2016-05-04. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[67] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (legitimate-interest test; anonymity test and the evidence expected for a claim that a model is anonymous). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[68] Directive (EU) 2022/2555 (NIS2) (Art. 21(2)(c) business continuity and (d) supply-chain security; Art. 23(4) early warning within 24 hours, incident notification within 72 hours, final report within one month; Art. 41(1) measures applied from 18 October 2024). Publications Office of the EU (EUR-Lex). 2022-12-27. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng (verified: primary)
[69] Regulation (EU) 2022/2554 (DORA) (Art. 19 reporting of major ICT-related incidents; Art. 28(3) register of information; Art. 28(8) exit strategies; Art. 64 applies from 17 January 2025). Publications Office of the EU (EUR-Lex). 2022-12-27. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng (verified: primary)
[70] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits of major ICT-related incident reports (Art. 5(1): initial notification within four hours of classification and no later than 24 hours from awareness; Art. 5(2): within four hours of a classification made after those 24 hours; intermediate report within 72 hours of the initial notification; final report no later than one month after the latest intermediate report). Publications Office of the EU (EUR-Lex). 2025-02-20. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[71] Regulation (EU) 2024/2847 (Cyber Resilience Act) (Art. 14 reporting of actively exploited vulnerabilities and severe incidents: early warning within 24 hours, notification within 72 hours, final reports; Art. 71(2) applies from 11 December 2027, Art. 14 from 11 September 2026). Publications Office of the EU (EUR-Lex). 2024-11-20. https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng (verified: primary)
[72] Directive (EU) 2024/2853 on liability for defective products (Art. 2(1) products placed on the market or put into service after 9 December 2026; Art. 4(1) software is a product; Art. 9 disclosure of evidence; Art. 10 presumption of defectiveness; Art. 11(2) no exemption for defects due to software, its updates or the lack of safety updates within the manufacturer's control; Art. 22 transposition by 9 December 2026). Publications Office of the EU (EUR-Lex). 2024-11-18. https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng (verified: primary)
[73] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Art. 4(3) text-and-data-mining exception subject to an express reservation, by machine-readable means for content made publicly available online; Art. 29 transposition by 7 June 2021). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[74] Regulation (EU) 2022/2065 (Digital Services Act) (Art. 25 online interface design and organisation; Art. 27 recommender system transparency; applies from 17 February 2024). Publications Office of the EU (EUR-Lex). 2022-10-27. https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng (verified: primary)
[75] Directive 2005/29/EC (Unfair Commercial Practices Directive) (Art. 5 general prohibition; Arts. 6–7 misleading actions and omissions; Art. 19 measures applied by 12 December 2007), with Directive (EU) 2019/2161 adding Annex I points 23b and 23c on consumer reviews. Publications Office of the EU (EUR-Lex). 2005-06-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj/eng (verified: primary)
[76] Directive (EU) 2024/2831 on improving working conditions in platform work (Art. 7 limits on processing by automated systems; Art. 9 transparency; Art. 10 human oversight and an impact evaluation at least every two years; Art. 11 explanation and human review; Art. 29 transposition by 2 December 2026). Publications Office of the EU (EUR-Lex). 2024-11-11. https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng (verified: primary)
[77] Directive (EU) 2023/2225 on credit agreements for consumers (Art. 18(8) human intervention, explanation and review where the creditworthiness assessment involves automated processing; Art. 48 measures applied from 20 November 2026). Publications Office of the EU (EUR-Lex). 2023-10-30. https://eur-lex.europa.eu/eli/dir/2023/2225/oj/eng (verified: primary)
[78] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology (AI stakeholder roles; AI system life cycle). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[79] NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (12 risks; suggested actions coded GV, MP, MS and MG). NIST. 2024-07-26. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[80] AICM v1.1.1 and AI-CAIQ machine-readable bundle (JSON, YAML, OSCAL; control ids and titles incl. IAM-18 Agent Access Restriction and AIS-11 Agents Security Boundaries). Cloud Security Alliance. 2026-08-04. https://cloudsecurityalliance.org/artifacts/aicm-machine-readable-bundle-json-yaml-oscal (verified: primary)
[81] Agentic Trust Framework, v1 (zero-trust governance for AI agents; autonomy tiers and promotion criteria; CC BY 4.0). CSAI Foundation / Cloud Security Alliance. 2026-02. https://agentictrustframework.ai/ (verified: primary)
[82] Autonomous Action Runtime Management (AARM) specification (pre-execution interception with identity binding; policy evaluation before execution). Cloud Security Alliance. 2026. https://aarm.dev/ (verified: primary)
[83] STAR for AI (Level 1 self-assessment; Level 1 Valid-AI-ted automated validation; Level 2 with ISO/IEC 42001 certification plus the Valid-AI-ted assessment; read 2026-09-24). Cloud Security Alliance. 2026-09-24. https://cloudsecurityalliance.org/star/ai (verified: primary)
[84] AB-2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28, Chapter 817; documentation on or before 2026-01-01 for systems released since 2022-01-01). California Legislative Information. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[85] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[86] SB-243, Companion chatbots (chaptered 2025-10-13, Chapter 677; AI disclosure; reminders at least every three hours for known minors; suicide and self-harm protocol; annual reports to the Office of Suicide Prevention beginning 2027-07-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243 (verified: primary)
[87] "California Finalizes Regulations to Strengthen Consumers' Privacy" (regulations on ADMT, risk assessments and cybersecurity audits approved 2025-09-23; effective 2026-01-01; ADMT requirements from 2027-01-01; risk-assessment attestations and summaries due 2028-04-01). California Privacy Protection Agency. 2025-09-23. https://cppa.ca.gov/announcements/2025/20250923.html (verified: primary)
[88] New York General Business Law Article 47, Artificial Intelligence Companion Models (§§ 1700–1704; self-harm protocol; notice at the start and at least every three hours; Attorney General, up to USD 15,000 per day; most recent revision shown 2025-11-07). New York State Senate. 2025-11-07. https://www.nysenate.gov/legislation/laws/GBS/A47 (verified: primary)
[89] "Illinois Adopts New AI-in-Employment Regulations: What Employers Need to Know for 2026" (HB 3773 effective 2026-01-01; notice duty; ZIP codes as a proxy; IDHR draft rules). Hinshaw & Culbertson. 2026. https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026 (verified: secondary)
[90] Automated Employment Decision Tools (Local Law 144 of 2021; bias audit within one year; public summary; notices; enforcement from 2023-07-05). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[91] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (Utah Code 13-75, effective 2025-05-07: disclosure on a clear and unambiguous request; prominent disclosure in high-risk interactions by regulated occupations; safe harbour; Title 13, Chapter 72, Artificial Intelligence Policy Act, repealed 2027-07-01). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[92] SB21-169, Restrict Insurers' Use of External Consumer Data (signed 2021-07-06; effective 2021-09-07; risk-management framework, testing and chief-risk-officer attestation; rules per type of insurance, none effective before 2023-01-01). Colorado General Assembly. 2021-07-06. https://leg.colorado.gov/bills/sb21-169 (verified: primary)
[93] Code of Virginia § 59.1-580, Data protection assessments (targeted advertising, sale, profiling with a reasonably foreseeable risk, sensitive data; processing activities created after 2023-01-01; available to the Attorney General). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-580/ (verified: primary)
[94] SB21-190, Protect Personal Data Privacy (Colorado Privacy Act; opt-outs incl. profiling; data protection assessments; universal opt-out mechanism; effective 1 July 2023). Colorado General Assembly. 2021-07-07. https://leg.colorado.gov/bills/sb21-190 (verified: primary)
[95] Minnesota Statutes § 325M.14, Consumer personal data rights, subd. 1(g) (question the result of profiling, be informed of the reason, review and correct the data, have the decision re-evaluated; effective 31 July 2025). Office of the Revisor of Statutes, Minnesota. 2025. https://www.revisor.mn.gov/statutes/cite/325M.14 (verified: primary)
[96] "Biometric Information Privacy Act" (signed 3 October 2008; consent, timely destruction and secure storage of biometric identifiers; USD 1,000 or 5,000 per violation). Wikipedia. 2026-09-24. https://en.wikipedia.org/wiki/Biometric_Information_Privacy_Act (verified: reported)
[97] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data incl. data derived or extrapolated by algorithms or machine learning; consent, separate sharing consent, signed authorisation for sale; 31 March 2024, small businesses 30 June 2024). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[98] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (high-impact AI; minimum practices; 365 days to document). Office of Management and Budget. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[99] OMB Memorandum M-26-04, Increasing Public Trust in Artificial Intelligence Through Unbiased AI Principles (policies updated by 2026-03-11; minimum LLM transparency in solicitations). Office of Management and Budget. 2025-12-11. https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf (verified: primary)
[100] 12 CFR § 1002.9, Notifications (statement of specific reasons, or the right to one within 30 days; internal standards or a failed score are insufficient; source 76 FR 79445, 21 December 2011, as amended 20 March 2023). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/cfr/text/12/1002.9 (verified: secondary)
[101] 15 U.S.C. § 1681m, Requirements on users of consumer reports (adverse-action notice; numerical credit score and key factors added by Pub. L. 111-203, s. 1100F, effective on the designated transfer date, 21 July 2011 per 12 U.S.C. § 5582 note). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/15/1681m (verified: secondary)
[102] 42 U.S.C. § 2000e-2(k), Burden of proof in disparate impact cases (business necessity; alternative employment practice; added by the Civil Rights Act of 1991, 21 November 1991). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/42/2000e-2 (verified: secondary)
[103] 29 CFR § 1607.4(D), Uniform Guidelines on Employee Selection Procedures: adverse impact and the four-fifths rule (43 FR 38295, 25 August 1978). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/cfr/text/29/1607.4 (verified: secondary)
[104] 15 U.S.C. § 45(a)(1), Unfair methods of competition and unfair or deceptive acts or practices unlawful (deceptive-practices prong added by the Wheeler-Lea Act of 21 March 1938). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/15/45 (verified: secondary)
[105] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (competent and reliable evidence required for AI accuracy claims). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[106] TAKE IT DOWN Act, Public Law 119-12 (enacted 19 May 2025; s. 3: covered platforms establish a notice-and-removal process within one year of enactment and remove reported images, and known identical copies, within 48 hours; enforced by the FTC). US Government Publishing Office, GovInfo. 2025-05-19. https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm (verified: primary)
[107] Model AI Governance Framework for Agentic AI, version 1.5 (agent identity unique, accounted for and centrally managed; authorisations scoped, time- or session-bound, non-transferable and bounded by the authorising human; significant checkpoints for high-stakes, irreversible, outlier and user-defined actions; approvals enforced through system-level controls). IMDA. 2026-05-20. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[108] Directive on Automated Decision-Making (in effect 1 April 2019; systems procured before 24 June 2025 comply by 24 June 2026; 6.1 algorithmic impact assessment published before production; Appendix C requirements by impact level; notice, explanation, peer review, recourse, reporting). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[109] Lei Geral de Proteção de Dados Pessoais, Lei n. 13.709/2018, compiled text (Art. 20 review of decisions taken solely on automated processing; Art. 65 entry into force, incl. Arts. 52 to 54 from 1 August 2021). Presidência da República (Brazil). 2026-09-24. https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm (verified: primary)
[110] Personal Information Protection Law of the People's Republic of China, English translation for reference (Art. 24 automated decision-making; Arts. 55–56 personal information protection impact assessment kept at least three years; in force 1 November 2021). National People's Congress. 2021-12-29. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[111] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 April 2025) and Sch. 20, para. 13 (fake and concealed-incentive consumer reviews). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[112] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Arts. 14–15 remedies and safeguards; Art. 16 risk and impact management; Art. 30 entry into force). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[113] The Framework Convention on Artificial Intelligence (Parties: the European Union; not yet in force; read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[114] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (principles 1.4(b) override, repair or decommission safely and 1.5(b)–(c) traceability and systematic risk management; revised 3 May 2024). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[115] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems (11 actions; voluntary). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[116] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (reporting framework launched 7 February 2025; first reports by 15 April 2025). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[118] Public Act 103-0804, HB 3773 (amends the Illinois Human Rights Act, 775 ILCS 5/2-102(L): no AI with a discriminatory effect on protected classes, no ZIP codes as a proxy, notice of AI use; IDHR to adopt rules; approved 9 Aug 2024, effective 1 Jan 2026; text and bill status read from Web Archive captures of 2025-03-29 and 2025-06-17, as ilga.gov refused connections on 2026-09-25). Illinois General Assembly. 2024-08-09. https://www.ilga.gov/legislation/publicacts/fulltext.asp?Name=103-0804 (verified: primary)
[119] 740 ILCS 14, Biometric Information Privacy Act (Source: P.A. 95-994, eff. 10-3-08; s. 15 retention schedule, written release, secure storage; s. 20 right of action, USD 1,000 negligent or USD 5,000 intentional or reckless per violation; text read from the Web Archive capture of 2025-06-18, as ilga.gov refused connections on 2026-09-25). Illinois General Assembly. 2008-10-03. https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004&ChapterID=57 (verified: primary)
