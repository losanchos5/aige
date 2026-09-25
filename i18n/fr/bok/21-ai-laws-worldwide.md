---
lang: fr
source: bok/21-ai-laws-worldwide.md
sourceHash: "191fdd18bca59f606083a61658b834845a9e9def3e8488c400b329303f5e4f2a"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 21. Leyes específicas de IA en todo el mundo

> Fuera de la UE, la ley específica de IA va desde la Basic Act horizontal de Corea hasta estatutos
> estatales estadounidenses, directivas del sector público y marcos voluntarios; este capítulo data
> cada régimen y nombra el artefacto que evidencia cada deber.

## Comment lire ce chapitre

Este capítulo es una guía de campo para las reglas específicas de IA que se sientan junto al
Reglamento de IA de la UE. Está escrito para el ingeniero que tiene que hacer que un conjunto de
controles responda a varios regímenes a la vez, no para el abogado que tiene que opinar sobre
cualquiera de ellos. El capítulo 18 trata el
[Reglamento de IA de la UE](/bok/eu-ai-act#how-to-read-this-chapter) en profundidad; el capítulo 19
cubre privacidad y protección de datos, incluyendo
[los regímenes más allá de la UE](/bok/privacy-and-ai#beyond-the-eu-uk-us-brazil-and-china); el
capítulo 20 cubre
[la otra ley que ya se aplica a la IA](/bok/existing-law#how-to-read-this-chapter); el capítulo 22
cubre
[principios, soft law y estándares](/bok/principles-and-standards#the-instruments-at-a-glance),
incluyendo los tratados internacionales. El capítulo 08 sigue siendo el
[índice inverso](/bok/regulatory-map#other-jurisdictions) que convierte cada obligación en un
artefacto y una capa.

Cada entrada a continuación sigue la misma plantilla: **estado**, **fechas**, **alcance**,
**deberes clave**, **aplicación** y los **artefactos que evidencian el cumplimiento**. Cada estado
está marcado **a partir del 2026-09-24**. Donde una regla aún se estaba moviendo en esa fecha, o un
hecho no pudo ser confirmado contra una fuente primaria, la copia lo dice y lleva una etiqueta
`(verify)`. Las traducciones de términos coreanos, japoneses, chinos, italianos, españoles y
portugueses son nuestras a menos que una fuente dé una oficial.

El vocabulario de estado tiene cuatro valores, los mismos cuatro que usa el conjunto de datos de
jurisdicción del sitio:

- **Vinculante, horizontal.** Un estatuto en vigor que se aplica en todos los sectores (Corea,
  Italia, la ley de promoción de Japón).
- **Vinculante, dirigido.** Reglas vinculantes limitadas a un uso, un sector, una clase de
  desarrollador o el sector público (los estados estadounidenses, las agencias federales
  estadounidenses, las reglas departamentales de China, la directiva de Canadá).
- **Volontaire.** Cadres, orientations et principes sans sanction attachée (Singapour, l'approche
  spécifique au Royaume-Uni, Inde, Australie).
- **Projet de loi.** Pas encore une loi (Brésil, projet de loi national sur l'IA en Espagne).

La lecture technique est celle que le chapitre 06 appelle
[traduction réglementaire](/bok/the-role#regulatory-translation) : la plupart de ces régimes
demandent le même petit ensemble d'artefacts (un inventaire, une décision de classification, un
avis, un label, une évaluation des risques, un rapport d'incident, un registre conservé pendant une
période fixe). Ce qui diffère, c'est le déclencheur, la formulation de l'avis, le délai du rapport,
le destinataire et l'autorité chargée de l'application. Construisez le contrôle une fois dans la
stack et paramétralisez-le par juridiction ; le pattern
[Framework Crosswalk](/patterns/framework-crosswalk) est l'endroit où ces paramètres résident. Ceci
n'est pas un avis juridique, et les correspondances sont illustratives, non une affirmation de
conformité.

## Le paysage en un coup d'œil

| Juridiction | Instrument principal | Estado (a partir de 2026-09-24) | Type | Qui applique |
|---|---|---|---|---|
| Corée du Sud | Loi fondamentale sur l'IA et décret d'application | En vigueur depuis 2026-01-22 ; les amendes sont soumises à une période de guidance d'au moins un an [1][2][3] | Contraignant, horizontal | Ministère des Sciences et des TIC (MSIT) |
| États-Unis (fédéral) | EO 14179, EO 14365, OMB M-25-21, M-25-22 et M-26-04 | En vigueur pour les agences fédérales ; pas de loi fédérale pour les acteurs privés [5][6][8][10] | Contraignant, ciblé | OMB et agences ; task force du DOJ contre les lois des États |
| États-Unis (États) | Colorado SB 26-189, Texas HB 149, Californie SB 53, SB 942, AB 2013, SB 243 et règles CPPA, New York RAISE et GBL Art. 47, Utah, Illinois, NYC LL 144 | Mixte : plusieurs en vigueur, Colorado à partir du 2027-01-01, RAISE à partir du 2027-01-01 [15][18][19][26] | Contraignant, ciblé | Procureurs généraux des États et agences |
| Japon | Loi sur la promotion de l'IA (Loi n° 53 de 2025) | Entièrement en vigueur depuis 2025-09-01 [31][32] | Contraignant, horizontal (promotionnel ; pas de sanctions) | Siège stratégique de l'IA du Cabinet |
| China | Règles départementales de la CAC, plus récemment les mesures d'interaction anthropomorphe | En vigueur ; la plus récente du 2026-07-15 [35] | Contraignant, ciblé | Administration du cyberespace de Chine (CAC) |
| Brésil | PL 2338/2023 | Projet de loi : adopté par le Sénat le 2024-12-10 ; en attente de rapport à la Chambre [36][37] | Projet de loi | Pas encore désigné par la loi |
| Canada | Directive sur la prise de décision automatisée | En vigueur pour les institutions fédérales ; AIDA a expiré [38][39] | Contraignant, ciblé | Secrétariat du Conseil du Trésor du Canada |
| Inde | Lignes directrices sur la gouvernance de l'IA en Inde | Publiées le 2025-11-05 ; pas de loi sur l'IA [40] | Volontaire | MeitY (orientation uniquement) |
| Reino Unido | Principes appliqués par les régulateurs existants ; ATRS ; Code de pratique de cybersécurité de l'IA | Non statutaire pour l'IA en tant que telle [41][43][44] | Volontaire | Régulateurs sectoriels existants (par exemple l'ICO, la FCA et la MHRA) |
| Italie | Loi 132/2025 | En vigueur depuis 2025-10-10 [46] | Contraignant, horizontal | AgID et ACN, plus les superviseurs financiers |
| Espagne | Projet de loi pour le bon usage et la gouvernance de l'IA ; AESIA ; bac à sable | Projet de loi non adopté ; bac à sable et guides en vigueur [47][48][49] | Projet de loi | AESIA et autorités sectorielles (selon la proposition) |
| Singapour | Cadres de gouvernance de l'IA (y compris agentique), AI Verify | Volontaire [50][51][53] | Volontaire | IMDA (orientation) |
| Australie | Plan national pour l'IA ; Orientation pour l'adoption de l'IA | La loi existante s'applique ; pas de loi sur l'IA [54] | Volontaire | Régulateurs existants ; l'Institut de sécurité de l'IA conseille |

Les mêmes régimes sont représentés sous forme de
[carte de tuiles par juridiction](/figures/jurisdiction-tiles).

## Corée du Sud : la loi fondamentale sur l'IA

La Corée du Sud dispose d'une loi horizontale sur l'IA en vigueur qui impose des obligations aux
opérateurs et prévoit des amendes. Son nom officiel est la Loi fondamentale sur le développement de
l'intelligence artificielle et l'établissement d'une base de confiance (인공지능 발전과 신뢰 기반 조성 등에 관한
기본법), Loi n° 20676 [1]. La majeure partie de la loi concerne la politique industrielle (un comité
national de stratégie en matière d'IA, données de formation, clusters d'IA, soutien à l'industrie) ;
les obligations qui importent à l'ingénieur se trouvent au chapitre 4, articles 31 à 36, et dans les
dispositions d'application des articles 40 et 43 [1].

### Statut et dates

La loi a été promulguée le 21 janvier 2025 et est entrée en vigueur le 22 janvier 2026 ; la partie
de la définition du haut impact qui couvre les dispositifs médicaux numériques a commencé le 24
janvier 2026 [1]. Une loi modificatrice, n° 21311 du 20 janvier 2026, a révisé l'article 2 et
d'autres dispositions avant l'entrée en vigueur. Un deuxième groupe de ses modifications a pris
effet le 21 juillet 2026 : une deuxième phrase de l'article 35(1) exige que l'évaluation d'impact
reflète les caractéristiques des groupes vulnérables à l'IA, et les articles 16(3) et (4) demandent
aux organismes publics de considérer en priorité les produits d'IA désignés lorsqu'ils achètent, et
exemptent les agents qui les achètent ou les utilisent de la responsabilité envers leur organisme
pour toute perte en résultant, sauf intention ou négligence grave [1]. Le décret d'application,
décret présidentiel n° 36053, a été promulgué le 21 janvier 2026 et a pris effet le 22 janvier 2026
[2]. Le MSIT, le ministère compétent, a annoncé une période de guidance d'au moins un an pendant
laquelle les enquêtes factuelles et les amendes administratives sont suspendues sauf dans des cas
très exceptionnels, tels que la perte de vie ou les violations des droits de l'homme [3]. La période
de grâce s'applique aux amendes, non aux obligations : les obligations ont été applicables depuis le
22 janvier 2026. Un amendement au décret en vigueur à partir du 21 juillet 2026, décret présidentiel
n° 36506, a défini les groupes vulnérables à l'IA (parmi eux les personnes handicapées, les
personnes âgées de 65 ans ou plus, les personnes admissibles aux allocations de demandeur d'emploi
et les femmes ayant des interruptions de carrière), a mis en place la confirmation par le ministère
des produits d'IA pour les marchés publics, et a modifié l'article 28(1) du décret afin que
l'identification des personnes affectées par l'évaluation d'impact reflète ces groupes [2][4]. Les
autres obligations des opérateurs décrites ci-dessous restent inchangées.

### Champ d'application et titulaires d'obligations

La loi s'étend à la conduite à l'étranger qui affecte le marché coréen ou les utilisateurs coréens
(article 4(1)), et exclut l'IA développée et utilisée uniquement à des fins de défense ou de
sécurité nationale, tel que spécifié par décret (article 4(2) ; article 2 du décret) [1][2]. Le
titulaire de l'obligation est l'**opérateur d'affaires en IA**, que la loi divise en deux rôles :
l'opérateur qui développe et fournit l'IA, et l'opérateur qui utilise l'IA fournie par un autre pour
offrir son propre produit ou service (article 2(7)) [1]. La division est proche du fournisseur et du
déployeur de l'UE, mais pas identique : les deux rôles portent les obligations de transparence et de
haut impact, et le décret permet à un opérateur utilisateur de s'appuyer sur les mesures de gestion
des risques, d'explication et de protection des utilisateurs du développeur à moins qu'il ne modifie
matériellement l'objectif ou l'utilisation du système (article 27(3) du décret) [2].

### L'IA de haut impact et comment elle est confirmée

**L'IA de haut impact** est un système d'IA qui peut affecter de manière significative, ou poser un
risque pour, la vie humaine, la sécurité physique ou les droits fondamentaux, et qui est utilisé
dans l'un des domaines que la loi énumère (article 2(4)) [1] :

- l'approvisionnement en énergie ; la production d'eau potable ; la fourniture de soins de santé ;
  le développement et l'utilisation de dispositifs médicaux et de dispositifs médicaux numériques ;
  la gestion sûre des matières et installations nucléaires ;
- l'analyse et l'utilisation d'informations biométriques pour l'enquête criminelle ou l'arrestation
  ;
- les jugements ou évaluations qui affectent de manière significative les droits et obligations
  individuels, **tels que le recrutement et l'examen des demandes de prêt** ;
- l'exploitation principale des moyens, installations et systèmes de transport ;
- les décisions des organismes d'État, des gouvernements locaux et des institutions publiques qui
  affectent les citoyens, telles que les vérifications d'admissibilité et la perception des frais
  pour les services publics ;
- l'évaluation des étudiants dans l'éducation préscolaire, primaire et secondaire ;
- tout autre domaine désigné par décret présidentiel.

L'opérateur doit examiner à l'avance si son système est de haut impact, et peut demander au MSIT de
confirmer (article 33(1)) [1]. Le décret transforme la demande en dossier : un aperçu du produit ou
du service, un aperçu des données de formation, du matériel montrant comment le système est utilisé
et ce qu'il produit, et tout autre document justificatif. Le MSIT évalue le domaine, l'impact, la
gravité et la fréquence du risque, l'examen préalable de l'opérateur lui-même et, le cas échéant, un
comité d'experts, et répond dans les 30 jours, extensible une fois de 30 jours. Un opérateur qui
n'est pas d'accord peut demander une reconfirmation dans les 10 jours, et le MSIT doit répondre dans
les 30 jours suivants après consultation du comité d'experts (article 25 du décret) [2].

Pour l'ingénieur, c'est un artefact d'admission : un
**enregistrement de décision de classification** par système, contenant le domaine de l'article
2(4), la justification du risque, l'aperçu des données de formation et, le cas échéant, la réponse
du MSIT. C'est le même enregistrement que le chapitre 06 construit à
[admission et classification](/bok/the-role#intake-and-classification), avec un champ
supplémentaire.

### Transparence : avis préalable et étiquetage

L'article 31 porte trois obligations [1] :

1. **Avis préalable.** Un opérateur qui fournit un produit ou un service utilisant l'IA de haut
   impact ou générative doit informer les utilisateurs à l'avance qu'il fonctionne sur cette IA.
2. **Étiquetage des résultats.** Un opérateur qui fournit l'IA générative, ou un produit ou un
   service l'utilisant, doit indiquer que les résultats ont été générés par l'IA générative.
3. **Contenu synthétique réaliste.** Lorsqu'un système produit du son, des images ou des vidéos
   difficiles à distinguer de la réalité, l'opérateur doit les notifier ou les étiqueter afin que
   les utilisateurs puissent clairement les reconnaître comme générés par l'IA ; pour les œuvres
   artistiques ou créatives, l'avis peut être donné d'une manière qui n'entrave pas l'exposition ou
   la jouissance.

Le décret définit la mécanique (article 23 du décret) [2]. L'avis préalable peut figurer dans le
produit lui-même, dans le contrat, le manuel ou les conditions d'utilisation, sur l'écran ou
l'appareil de l'utilisateur, ou être affiché au lieu de fourniture. Les étiquettes peuvent être
perceptibles par l'homme ou lisibles par machine ; lorsqu'elles ne sont lisibles par machine que,
l'opérateur doit également informer l'utilisateur au moins une fois, par texte ou voix, que le
résultat a été généré par l'IA générative. Les avis et étiquettes pour le contenu synthétique
réaliste doivent être faciles à percevoir et doivent tenir compte de l'âge et des conditions
physiques ou sociales des principaux utilisateurs. Trois exemptions s'appliquent : lorsque
l'utilisation de l'IA est évidente d'après le nom, l'écran ou le résultat du produit ; lorsque le
système est utilisé uniquement pour l'activité commerciale interne de l'opérateur ; et les cas que
le MSIT désigne par avis public.

### Obligations pour l'IA de haut impact

Un opérateur qui fournit l'IA de haut impact doit mettre en œuvre six mesures (article 34(1)) [1] :
un plan de gestion des risques ; un plan d'explication couvrant, dans la limite de la faisabilité
technique, le résultat final, les principaux critères utilisés pour l'atteindre et un aperçu des
données de formation ; un plan de protection des utilisateurs ; la gestion et la supervision
humaines ; des documents montrant les mesures prises ; et toute autre mesure que le comité national
de l'IA résout. Le décret ajoute trois règles opérationnelles (article 27 du décret) [2] :

- l'opérateur affiche le contenu principal de la gestion des risques, des plans d'explication et de
  protection des utilisateurs, ainsi que le nom et les coordonnées de la personne qui supervise le
  système, dans ses locaux ou sur son site web, à l'exception des secrets commerciaux ;
- l'opérateur conserve les preuves documentaires des mesures pendant **cinq ans**, sous forme
  électronique ou autre ;
- un opérateur utilisateur peut demander à l'opérateur développeur les informations dont il a
  besoin, et le développeur doit s'efforcer de coopérer ; les mesures prises en vertu d'autres lois
  comptent lorsque l'annexe du décret le prévoit.

**L'analyse d'impact** est une obligation de meilleur effort : les opérateurs « s'efforceront »
d'évaluer l'effet sur les droits fondamentaux avant de fournir une IA à fort impact, et les
organismes publics doivent donner la priorité aux produits qui ont été évalués (article 35) [1]. Le
décret fixe le contenu : les personnes et groupes susceptibles d'être affectés, reflétant les
caractéristiques des groupes vulnérables à l'IA (articles 3(5) et 35(1) de la loi, en vigueur à
partir du 21 juillet 2026) ; les droits fondamentaux en jeu ; les effets sociaux et économiques ;
les modes d'utilisation ; les indicateurs quantitatifs ou qualitatifs et la méthode utilisée ; les
mesures de prévention, d'atténuation et de récupération ; et un plan d'amélioration si nécessaire.
L'opérateur peut mener l'évaluation lui-même ou par l'intermédiaire d'un tiers (article 28 du
décret) [2].

### Obligations de sécurité pour les systèmes à calcul élevé

L'article 32 s'applique aux systèmes dont le calcul cumulatif d'entraînement dépasse un seuil fixé
par décret [1]. Le décret exige les trois éléments suivants : un calcul cumulatif d'entraînement
d'au moins **10^26 opérations en virgule flottante** ; une construction et une exploitation avec la
technologie d'IA la plus avancée du jour ; et un profil de risque susceptible d'affecter largement
et gravement la vie, la sécurité et les droits fondamentaux (article 24 du décret) [2]. Les
opérateurs de tels systèmes doivent identifier, évaluer et atténuer les risques tout au long du
cycle de vie, construire un système de gestion des risques qui surveille et répond aux incidents de
sécurité de l'IA, et soumettre les résultats à MSIT [1]. Le chiffre de calcul est le même 10^26 que
les lois américaines de pointe utilisent (voir
[frontier-developer laws](/bok/regulatory-map#frontier-developer-laws) au chapitre 08), mais le test
conjonctif rend la classe coréenne plus étroite sur le papier.

### Représentant national

Un opérateur sans adresse ni établissement commercial en Corée doit désigner un
**représentant national** par écrit et le signaler à MSIT s'il dépasse un seuil du décret (article
36 ; article 29 du décret) [1][2] : chiffre d'affaires total de l'année précédente de 1 trillion KRW
ou plus ; chiffre d'affaires de l'année précédente provenant des services d'IA de 10 milliards KRW
ou plus ; une moyenne de 1 million d'utilisateurs quotidiens ou plus en Corée au cours des trois
mois précédant la fin de l'année précédente ; ou une amende antérieure pour non-respect d'une
ordonnance de correction. Le représentant soumet les résultats de sécurité de l'article 32, dépose
les demandes de confirmation à fort impact et soutient les mesures de l'article 34, notamment en
vérifiant que les documents sont à jour et exacts ; ses manquements sont attribués à l'opérateur
[1].

### Application et période de grâce

MSIT peut demander des documents et enquêter, y compris sur place, lorsqu'il découvre ou est informé
d'une violation présumée des obligations d'étiquetage, de sécurité ou à fort impact, et peut
ordonner l'arrêt ou la correction de la violation (article 40) [1]. Des amendes administratives
jusqu'à **30 millions KRW** s'appliquent à trois défaillances seulement : ne pas donner l'avis
préalable de l'article 31(1), ne pas désigner de représentant national, et ne pas obéir à un ordre
d'arrêt ou de correction (article 43) [1]. Une défaillance d'étiquetage n'est donc pas directement
sanctionnée ; elle devient sanctionnable lorsque l'opérateur ignore l'ordonnance de correction qui
suit. Pendant la période d'orientation décrite ci-dessus, les constatations de faits et les amendes
sont suspendues sauf en cas exceptionnel [3].

| Obligation (article) | Qui est lié | Artefact d'ingénierie qui l'atteste | Couche |
|---|---|---|---|
| Auto-examen à fort impact et confirmation facultative (art. 33 ; art. 25 du décret) | Tous les opérateurs commerciaux d'IA | Registro de decisión de clasificación por sistema: área Art. 2(4), razón de riesgo, descripción general de datos de entrenamiento, respuesta de MSIT | 1 · 2 |
| Avis préalable (art. 31(1) ; art. 23(1) du décret) | Opérateurs de produits utilisant une IA à fort impact ou générative | Componente de notificación en UI, términos y contratos; inventario de notificaciones por superficie de usuario | 2 · 4 |
| Étiquettes de sortie et avis de contenu réaliste (art. 31(2)–(3) ; art. 23(2)–(3) du décret) | Opérateurs d'IA générative | Pipeline de provenance : étiquette visible ou marque lisible par machine, plus au moins un avis textuel ou vocal | 3 · 4 |
| Obligations de sécurité au-dessus de 10^26 FLOP (art. 32 ; art. 24 du décret) | Opérateurs de systèmes qualifiants | Registro de riesgos del ciclo de vida; monitoreo de incidentes de seguridad; informe de resultados a MSIT | 3 · 4 · 5 |
| Mesures à fort impact (art. 34 ; art. 27 du décret) | Operadores de IA de alto impacto | Planes de gestión de riesgos, explicación y protección del usuario; supervisor humano nombrado; resumen publicado; almacén de evidencia de cinco años | 1 · 2 · 4 · 5 |
| Analyse d'impact, meilleur effort (art. 35 ; art. 28 du décret) | Operadores de IA de alto impacto | Analyse d'impact sur les droits fondamentaux comportant les sept éléments du décret | 1 · 5 |
| Représentant national (art. 36 ; art. 29 du décret) | Opérateurs étrangers au-dessus d'un seuil | Designación presentada ante MSIT; manual de acceso a evidencia para el representante | 5 |

> **En pratique (illustratif)**
> Un fournisseur étranger d'une API d'évaluation d'embauche a dépassé le seuil d'un million
> d'utilisateurs quotidiens par le biais de clients coréens de ses clients. L'équipe de gouvernance
> a fait trois choses. Elle a ajouté un bloc `jurisdiction.kr` à chaque entrée de registre du
> système contenant la zone de l'article 2(4) (« embauche »), le verdict d'auto-examen et un lien
> vers l'analyse d'impact en forme de décret. Elle a étendu la politique de rétention du magasin de
> preuves à cinq ans pour chaque artefact étiqueté `kr-art34`. Et elle a donné au représentant
> national un accès en lecture à une vue de preuves filtrée, afin que le représentant puisse
> répondre à MSIT à partir de documents actuels au lieu d'envoyer un e-mail à l'équipe produit. Rien
> de nouveau n'a été construit dans le modèle ; le travail s'est fait dans le registre, la politique
> de rétention et le chemin d'accès.

## États-Unis : la couche fédérale

Les États-Unis n'ont pas de loi fédérale sur l'IA qui s'applique aux acteurs privés. La couche
fédérale est un ensemble de décrets exécutifs et de mémorandums du Bureau de la gestion et du budget
(OMB) qui s'appliquent aux agences fédérales, et, par le biais des marchés publics, aux fournisseurs
qui leur vendent. Depuis décembre 2025, elle comprend également une poussée délibérée contre les
lois étatiques sur l'IA.

### Décrets exécutifs

- **EO 14179** (23 janvier 2025), *Removing Barriers to American Leadership in Artificial
  Intelligence*, a ordonné un examen de chaque action entreprise en vertu de l'EO 14110 révoquée,
  afin que celles incompatibles avec la nouvelle politique puissent être suspendues, révisées ou
  abrogées, et a ordonné un plan d'action sur l'IA dans les 180 jours [5].
- **EO 14319** (23 juillet 2025), *Preventing Woke AI in the Federal Government*, a établi deux «
  Principes d'IA impartiale » (recherche de la vérité et neutralité idéologique) pour les grands
  modèles de langage que le gouvernement achète [8].
- **EO 14365** (11 décembre 2025), *Ensuring a National Policy Framework for Artificial
  Intelligence*, cible les lois étatiques sur l'IA ; elle est traitée dans sa propre sous-section
  ci-dessous [10].

### Mémorandums de l'OMB pour les agences fédérales

**M-25-21** (3 avril 2025), *Accelerating Federal Use of AI through Innovation, Governance, and
Public Trust*, a abrogé et remplacé M-24-10 [6]. Elle définit **l'IA à fort impact** comme une IA
dont la sortie sert de base principale aux décisions ou actions ayant un effet juridique, matériel,
contraignant ou significatif sur les droits civils, les libertés civiles ou la vie privée, sur
l'accès à l'éducation, au logement, à l'assurance, au crédit, à l'emploi et à d'autres programmes,
sur l'accès aux services gouvernementaux critiques, ou sur la santé et la sécurité humaines, entre
autres [6]. Certaines catégories de cas d'usage sont présumées à fort impact ; un agent fédéral qui
conclut autrement doit documenter la décision auprès du responsable de l'IA. Les agences avaient 365
jours à compter de la publication pour documenter les pratiques minimales pour l'IA à fort impact :
test avant le déploiement ; une analyse d'impact de l'IA ; une surveillance continue des
performances et des impacts négatifs ; une formation adéquate des opérateurs ; une supervision
humaine, une intervention et une responsabilité, avec un mécanisme de secours si possible ; des
recours ou appels cohérents pour les personnes affectées ; et une consultation des utilisateurs
finaux et du public [6]. **M-25-22**, publié le même jour, couvre l'acquisition [7].

**M-26-04** (11 décembre 2025) met en œuvre EO 14319 [8]. Les agences avaient jusqu'au 11 mars 2026
pour mettre à jour leurs politiques d'approvisionnement, et chaque appel d'offres pour un grand
modèle de langage doit demander, au minimum, la politique d'utilisation acceptable du fournisseur ;
les fiches de modèle, système ou données ; les ressources pour les utilisateurs finaux ; et un
mécanisme de retour des utilisateurs finaux sur les résultats qui violent les principes [8]. Les
exigences s'étendent également aux modèles intégrés dans d'autres logiciels que l'agence achète [8].

### Plan d'action américain sur l'IA

Le plan, publié en juillet 2025, repose sur trois piliers : accélérer l'innovation, construire
l'infrastructure d'IA américaine, et diriger la diplomatie et la sécurité de l'IA au niveau
international [9]. Deux de ses actions importent ici. Il demande aux agences disposant d'un
financement discrétionnaire pour l'IA de tenir compte du climat réglementaire de l'IA d'un État lors
de la prise de décisions de financement, et à la Commission fédérale des communications d'évaluer si
les règles étatiques sur l'IA interfèrent avec son mandat ; et il ordonne à NIST de réviser le cadre
de gestion des risques de l'IA pour supprimer les références à la désinformation, à la diversité, à
l'équité et à l'inclusion, et au changement climatique [9].

### La poussée fédérale contre les lois étatiques sur l'IA

EO 14365 établit le mécanisme [10]. Le procureur général devait établir une
**AI Litigation Task Force** dans les 30 jours pour contester les lois étatiques sur l'IA qui
entrent en conflit avec la politique fédérale ; le secrétaire au Commerce devait publier, dans les
90 jours, une évaluation des lois étatiques sur l'IA « onéreuses », y compris celles qui exigent que
les modèles modifient les résultats véridiques ; les États ayant de telles lois deviennent
inéligibles à certains fonds haut débit (BEAD) et peuvent voir d'autres subventions discrétionnaires
conditionnées ; la FCC doit envisager une norme fédérale de signalement et de divulgation qui
préempterait les règles étatiques conflictuelles ; la Commission fédérale du commerce (FTC) doit
émettre une déclaration de politique sur la façon dont son autorité en matière de tromperie
s'applique aux lois étatiques qui exigent des résultats modifiés ; et les conseillers du Président
doivent préparer une législation pour un cadre fédéral uniforme. La recommandation législative de
l'ordonnance ne doit pas proposer de préempter les lois étatiques sur la sécurité des enfants, sur
le calcul et l'infrastructure des centres de données d'IA autres que les permis, ou sur
l'approvisionnement et l'utilisation de l'IA par l'État [10].

Ce qui s'est passé ensuite, au 2026-09-24 :

- Le procureur général a annoncé la task force le 9 janvier 2026, selon les rapports des praticiens
  [12].
- La Maison-Blanche a publié des recommandations législatives non contraignantes le 20 mars 2026,
  demandant au Congrès de préempter les lois étatiques sur l'IA qui imposent des charges indues tout
  en ne préemptant pas les lois étatiques généralement applicables qui protègent les enfants,
  préviennent la fraude et protègent les consommateurs [11].
- La FTC a demandé des commentaires le 1er juillet 2026 sur une proposition de déclaration de
  politique : le fait de déformer délibérément les résultats d'un système d'IA à des fins
  idéologiques non divulguées peut être trompeur en vertu de la section 5 de la loi FTC. La
  déclaration traite de la loi sur l'IA du Colorado et suggère qu'elle peut être implicitement
  préemptée lorsqu'elle force des modifications des résultats ; les commentaires ont été fermés le
  31 juillet 2026 [13].
- À la Chambre, un projet de discussion bipartite publié en juin 2026 permettrait la préemption
  fédérale de la réglementation de l'IA des États pendant trois ans ; c'était un projet pour les
  commentaires des parties prenantes, pas un projet de loi déposé [14]. Il convient de vérifier s'il
  a depuis été présenté (à vérifier).
- L'évaluation du Commerce devait être effectuée dans les 90 jours suivant l'ordre [10] ; il
  convient de vérifier si elle a été publiée et quelles lois elle désigne (à vérifier).
- Devant les tribunaux, xAI a poursuivi le 9 avril 2026 pour bloquer la loi originale du Colorado
  sur l'IA, SB 24-205, et le ministère américain de la Justice a présenté une plainte connexe le 24
  avril 2026, arguant que la loi viole la clause de protection égale [16][17]. Le 27 avril 2026, un
  juge fédéral des magistrats a rendu une ordonnance convenue en vertu de laquelle le procureur
  général du Colorado n'appliquerait pas SB 24-205 jusqu'à 14 jours après une décision sur la
  demande de xAI en injonction préliminaire ; SB 26-189 a ensuite remplacé la loi [16].

Pour l'ingénieur, la règle pratique est simple : un devoir d'État s'impose jusqu'à ce qu'il soit
abrogé, remplacé ou suspendu. Conservez les contrôles de chaque État comme un module de politique
distinct et versionnné, indexé par la juridiction, de sorte qu'une ordonnance judiciaire ou une
abrogation soit un changement de configuration et non une reconstruction.

| Instrument fédéral | S'applique à | Ce qu'il demande | Artefact que l'agence ou le fournisseur conserve | Couche |
|---|---|---|---|---|
| OMB M-25-21 [6] | Agences fédérales (les éléments de la communauté du renseignement sont encouragés, non obligatoires) | Détermination d'impact élevé ; sept pratiques minimales ; directeur de l'IA ; inventaire des cas d'usage | Entrée d'inventaire des cas d'utilisation ; rapport de test avant le déploiement ; évaluation de l'impact de l'IA ; plan de surveillance ; chemin d'appel | 2 · 3 · 4 · 5 |
| OMB M-26-04 [8] | Agences achetant de grands modèles de langage et leurs fournisseurs | Principes d'IA impartiale comme conditions contractuelles ; package de transparence minimum | Politique d'utilisation acceptable ; fiches de modèle, de système ou de données ; ressources pour les utilisateurs finaux ; canal de rétroaction | 2 · 5 |
| EO 14365 et la proposition de la FTC [10][13] | États ; développeurs soumis aux lois des États | Aucun devoir encore envers les acteurs privés ; risque de litige et de préemption | Modules de politique indexés par juridiction ; enregistrement des contrôles de résultats que chaque loi d'État exige | 1 |

## États-Unis : lois des États qui lient les organisations privées

Le chapitre 08 mappe les deux lois de la frontière, Texas et Colorado au niveau du tableau
[lois fédérales et des États américains](/bok/regulatory-map#us-federal-and-state-laws). Cette
section ajoute les lois qui atteignent les développeurs et les responsables du déploiement
ordinaires, et donne à chacune sa portée, ses dates, ses devoirs et son application.

| Loi | Estado (a partir de 2026-09-24) | Portée | Devoirs clés | Application | Artefact de preuve | Couche |
|---|---|---|---|---|---|---|
| Colorado SB 26-189 (Automated Decision-Making Technology) | Signé 2026-05-14 ; effectif 2027-01-01 ; abroge et réenacte SB 24-205 [15][16] | Développeurs et responsables du déploiement d'ADMT dans les décisions conséquentes (emploi, logement, prêt, assurance, prestations) | Documentation du développeur pour les responsables du déploiement (utilisations prévues, catégories de données d'entraînement, limites connues, instructions) et avis des mises à jour matérielles ; avis du responsable du déploiement de l'utilisation d'ADMT ; explication en langage clair dans les 30 jours suivant un résultat défavorable ; correction du consommateur, examen humain et reconsidération ; registres conservés trois ans ou plus | Procureur général en vertu de la loi sur la protection des consommateurs ; avis de correction de 60 jours avant 2030 ; aucun nouveau droit d'action privée [15] | Inventaire d'ADMT ; pack de documentation du développeur ; modèles de notification et d'explication des résultats défavorables ; file d'attente d'examen humain ; magasin de registres de trois ans | 2 · 4 · 5 |
| Texas TRAIGA (HB 149) | En vigueur 2026-01-01 [18] | Personnes exerçant une activité au Texas ; développeurs, responsables du déploiement, gouvernement | Interdictions basées sur l'intention (manipulation du comportement, notation sociale gouvernementale, discrimination illégale, certains contenus sexuels) ; divulgation par les agences gouvernementales et dans les services de santé ; bac à sable de 36 mois ; règles d'IA locales préemptées | Procureur général uniquement ; aucun droit d'action privée ; correction de 60 jours ; USD 10 000–12 000 par violation réparable, 80 000–200 000 par violation non réparable, 2 000–40 000 par jour continu [18] | Politique de politique-en-tant-que-code d'utilisation interdite ; contrôles de divulgation ; une fiche de modèle qui répond aux huit questions d'enquête du procureur général | 1 · 2 · 4 |
| California SB 53 (Transparency in Frontier AI Act) | Chapitré 2025-09-29 ; en vigueur 2026-01-01 [19][20] | Développeurs de frontière (modèles entraînés au-dessus de 10^26 opérations) ; grands développeurs de frontière (chiffre d'affaires supérieur à USD 500M) | Cadre d'IA de frontière publié ; rapport de transparence avant le déploiement d'un modèle de frontière nouveau ou substantiellement modifié ; incidents de sécurité critiques signalés dans les 15 jours, 24 heures si la mort ou une blessure grave est imminente ; canal de dénonciation | Procureur général ; pénalité civile jusqu'à USD 1M par violation [19] | Cadre publié ; rapport de transparence pré-déploiement ; pipeline d'incidents avec les deux horloges ; canal de signalement anonyme | 3 · 4 · 5 |
| California AI Transparency Act (SB 942 tel que modifié par AB 853) | Opérationnel 2026-08-02 ; devoirs des plates-formes 2027-01-01 ; appareils de capture 2028-01-01 [21] | Fournisseurs couverts de systèmes d'IA générative publics ; grandes plates-formes en ligne ; plates-formes d'hébergement ; fabricants d'appareils de capture | Outil de détection gratuit ; divulgation visible (manifeste) optionnelle ; divulgation intégrée (latente) dans l'image, la vidéo et l'audio ; les plates-formes détectent et exposent la provenance et ne doivent pas la supprimer | Pénalité civile de USD 5 000 par violation, chaque jour une violation distincte, dans les actions du procureur général, d'un procureur municipal ou d'un procureur du comté (Bus. & Prof. Code s. 22757.4) [21] | Pipeline de provenance écrivant des métadonnées latentes ; point de terminaison de détection public ; affichage de la provenance côté plateforme | 3 · 4 |
| California AB 2013 (transparence des données d'entraînement) | Documentation due le ou avant 2026-01-01 et à chaque nouvelle version ou modification substantielle [22] | Développeurs de systèmes d'IA générative publiés depuis 2022-01-01 pour utilisation en Californie | Résumé public des ensembles de données d'entraînement : sources, objectif, taille, types de données, statut de la propriété intellectuelle, licences, informations personnelles, nettoyage, période de collecte, première utilisation, données synthétiques | Exemptions : sécurité et intégrité, exploitation d'aéronefs, utilisations fédérales de sécurité nationale [22] | Fiche de données par ensemble de données, publiée à la sortie ; registre des droits des données d'entraînement | 2 |
| Réglementations CPPA de Californie (ADMT, évaluations des risques, audits de cybersécurité) | Approuvé 2025-09-23 ; effectif 2026-01-01 ; devoirs ADMT à partir de 2027-01-01 ; attestations d'évaluation des risques dues 2028-04-01 [23] | Entreprises soumises à la CCPA utilisant ADMT pour des décisions importantes | Devoirs ADMT pour les décisions importantes (détail au chapitre 19) ; évaluations des risques ; audits de cybersécurité | California Privacy Protection Agency [23] | Registre ADMT ; avis pré-utilisation ; routage de désinscription ; enregistrement d'évaluation des risques | 2 · 4 · 5 |
| California SB 243 (chatbots compagnons) | Chapitré 2025-10-13 ; rapports annuels à partir de 2027-07-01 [24] | Opérateurs de chatbots compagnons | Divulguer l'IA lorsqu'une personne raisonnable pourrait être trompée ; pour les mineurs connus, divulguer l'IA et rappeler au moins toutes les trois heures, et prévenir les contenus sexuellement explicites ; protocole de suicide et d'automutilation avec orientation vers les services d'urgence | Droit d'action privée : au moins USD 1 000 par violation [24] | Politique de mode compagnon ; minuteur de rappel ; classificateur de renvoi en cas de crise et journal ; rapport annuel | 1 · 4 · 5 |
| New York RAISE Act | Signé 2025-12-19 ; effectif 2027-01-01 après l'amendement du chapitre 2026 [25][26] | Développeurs de frontière (modèles entraînés au-dessus de 10^26 opérations) pour les rapports d'incidents ; grands développeurs de frontière (chiffre d'affaires supérieur à USD 500M) pour le protocole publié, après l'amendement du chapitre [26] | Protocole de sécurité publié ; incidents de sécurité divulgués dans les 72 heures ; bureau de surveillance DFS | Procureur général [25] | Protocole publié ; pipeline d'incidents de 72 heures | 4 · 5 |
| New York GBL Article 47 (modèles de compagnons d'IA) | En vigueur [27] (vérifier la date de commencement) | Opérateurs de compagnons IA | Protocole pour détecter l'idéation suicidaire et l'automutilation et orienter vers les services d'urgence ; avis que l'utilisateur ne parle pas à un humain au début et au moins toutes les trois heures | Procureur général ; pénalités civiles jusqu'à USD 15 000 par jour [27] | Classificateur de renvoi en cas de crise et journal ; minuteur de notification | 4 · 5 |
| Utah AI Policy Act (SB 149 tel que modifié par SB 226 et SB 332) | Amendements effectifs 2025-05-07 ; la loi abroge le 2027-07-01 [28] | Fournisseurs utilisant l'IA générative dans les transactions avec les consommateurs ; professions réglementées | Divulguer l'IA lorsqu'une personne le demande clairement ; divulgation importante dans les interactions « à haut risque » (données sensibles ou conseils personnalisés) par les professionnels réglementés, verbalement au début ou par écrit avant ; refuge sûr pour une divulgation claire au départ | Division de la protection des consommateurs [28] | Composant de divulgation avec drapeau de risque d'interaction ; journal de conversation montrant la divulgation | 4 |
| Illinois HB 3773 (amendement à la loi sur les droits de l'homme) | Effectif 2026-01-01 ; règles de mise en œuvre en projet, selon les rapports [29] | Employeurs utilisant l'IA dans le recrutement, l'embauche, la promotion, la discipline et autres conditions d'emploi | Aucune utilisation d'IA ayant un effet discriminatoire sur les classes protégées ; aucun code postal comme proxy ; avis aux employés et aux candidats | Département des droits de l'homme de l'Illinois et les recours de la loi sur les droits de l'homme [29] | Inventaire d'IA dans les RH ; évaluation de l'impact défavorable par classe protégée ; enregistrement de notification | 2 · 3 · 4 |
| NYC Local Law 144 (outils de décision automatisés en matière d'emploi) | Appliquée depuis 2023-07-05 [30] | Employeurs et agences d'emploi utilisant des AEDT pour les rôles de New York City | Audit de biais dans un an avant utilisation ; résumé public des résultats ; avis aux candidats et aux employés | Département de la protection des consommateurs et des travailleurs ; canal de plaintes [30] | Rapport d'audit de biais indépendant ; résumé publié ; enregistrement des avis | 3 · 5 |

### Décisions conséquentes : un outil d'embauche, quatre régimes

Le Colorado, les règles ADMT de Californie, l'Illinois et New York City atteignent tous l'embauche
automatisée, mais chacun demande un artefact différent : le Colorado une explication dans les 30
jours suivant un résultat défavorable et un chemin d'examen humain [15] ; la Californie, à partir de
2027, les devoirs ADMT de la CPPA [23] ; l'Illinois un avis et l'absence d'effet discriminatoire
[29] ; New York City un audit de biais indépendant, publié, de moins d'un an [30]. La Corée énumère
également l'embauche comme un domaine d'impact élevé [1]. Une seule suite d'évaluation qui mesure
les taux de sélection par classe protégée, exécutée en CI et sur des échantillons de production,
produit la preuve dont chacun d'eux a besoin ; les avis et les chemins d'examen ne diffèrent que
dans la formulation et le calendrier.

> **Exemple (illustratif)**
> Un modèle de classement de CV d'un fournisseur est déployé par des employeurs à Denver, Chicago,
> New York City et Séoul. La [Eval Gate in CI](/patterns/eval-gate-in-ci) exécute une suite d'impact
> défavorable sur chaque version et bloque celle qui fait tomber le ratio de taux de sélection de
> tout groupe en dessous du plancher configuré. Les mêmes résultats alimentent la demande de données
> de l'auditeur d'audit de biais de New York, le fichier d'effet discriminatoire de l'Illinois et la
> section « indicateurs et méthode » de l'évaluation d'impact coréenne. L'entrée du registre porte
> quatre modèles d'avis et une file d'attente d'examen humain ;
> l'[explication du résultat défavorable](/patterns/explanation-artefact) est générée à partir des
> codes de raison principaux du modèle et enregistrée avec la décision, de sorte que l'horloge de 30
> jours du Colorado est respectée par le même pipeline qui répond à un avis d'action défavorable de
> crédit américain.

### Provenance, données d'entraînement et développeurs de frontière

La Californie divise la transparence du contenu entre deux statuts : AB 2013 oblige les développeurs
à publier un résumé de leurs données d'entraînement [22], et la AI Transparency Act oblige les
grands fournisseurs à intégrer la provenance dans les médias que leurs systèmes produisent et à
donner au public un moyen de la vérifier [21]. Les deux sont d'abord des problèmes de preuves avant
d'être des problèmes juridiques : une fiche de données par ensemble de données et un pipeline de
provenance qui écrit les métadonnées au moment de la génération sont les artefacts, et tous deux
appartiennent aux couches 2 et 3 du [stack](/bok/the-stack#layer-02-inventory--transparency). Pour
les développeurs de frontier, SB 53 et RAISE convergent sur un framework de sécurité publié et une
horloge d'incident courte [19][25] ; le chapitre 08 porte les
[lignes des développeurs de frontier](/bok/regulatory-map#frontier-developer-laws).

### Chatbots et compagnons

L'Utah, la Californie et New York réglementent l'interface conversationnelle elle-même, non le
modèle qui la sous-tend [24][27][28]. L'Utah demande une divulgation sur demande claire et une
divulgation bien visible dans les interactions réglementées, à haut risque [28] ; la Californie et
New York ajoutent des rappels périodiques et un protocole d'orientation en cas de crise pour les
produits compagnons, les rappels de la Californie étant liés aux mineurs connus [24][27]. Les
mesures d'interaction anthropomorphe de la Chine, ci-dessous, couvrent le même terrain avec un
rappel de deux heures [35]. Ce sont des problèmes de
[Runtime Guardrail](/patterns/runtime-guardrail) : un minuteur de session, un classificateur qui
détecte les signaux d'automutilation et les achemine vers une orientation, et un journal qui prouve
que les deux se sont déclenchés.

## Japon : la Loi sur la promotion de l'IA

La Loi japonaise sur la promotion de la recherche, du développement et de l'utilisation des
technologies liées à l'IA (人工知能関連技術の研究開発及び活用の推進に関する法律), Loi n° 53 de 2025, a été promulguée le 4
juin 2025 et est pleinement en vigueur depuis le 1er septembre 2025, date à laquelle les
dispositions mettant en place le Quartier général de la stratégie de l'IA ont pris effet [31][32].
C'est une loi-cadre et de promotion sans pénalités [31]. Son devoir envers les entreprises est une
phrase : les opérateurs qui utilisent la technologie liée à l'IA dans leurs activités doivent
s'efforcer de l'utiliser activement et doivent **coopérer** avec les mesures du gouvernement
national et local (Article 7) [31]. L'État émet des lignes directrices conformes aux normes
internationales pour assurer la recherche, le développement et l'utilisation appropriés (Article
13), et collecte des informations sur, et analyse, les cas où des objectifs impropres ou des
méthodes inappropriées ont violé les droits des personnes, puis donne des conseils, des avis et des
informations aux opérateurs (Article 16) [31].

Les instruments qui donnent du contenu à la Loi sont souples. Le Quartier général de la stratégie de
l'IA a adopté des lignes directrices sur l'assurance de l'adéquation de la recherche, du
développement et de l'utilisation de l'IA le 19 décembre 2025 [34]. Le Cabinet a adopté le premier
Plan de base de l'IA le 23 décembre 2025 et un plan révisé le 14 juillet 2026 [33]. La lecture
d'ingénierie : pas de dépôt et pas d'amende, mais un gouvernement qui enquête sur les cas de
violation des droits et nomme les opérateurs dans les conseils. Un opérateur qui maintient à jour un
registre d'incidents et une fiche de modèle peut répondre à une demande en vertu de l'Article 16
sans précipitation.

## Chine : ce que le chapitre 08 ne couvre pas déjà

Le chapitre 08 cartographie les [niveaux contraignants et volontaires](/bok/regulatory-map#china) de
la Chine, des dispositions relatives aux recommandations algorithmiques au framework 3.0 de TC260.
Une règle qu'il ne cartographie pas est les
**Mesures provisoires pour l'administration des services d'interaction anthropomorphe**
(人工智能拟人化互动服务管理暂行办法), émises par la CAC avec quatre autres organismes et en vigueur depuis le 15
juillet 2026 [35]. Elles s'appliquent aux services d'IA offerts au public en Chine qui simulent la
personnalité, la pensée et le style de communication humains pour fournir une
**interaction émotionnelle soutenue**, comme l'accompagnement ou le soutien émotionnel ; le service
à la clientèle, la réponse aux questions, les assistants de travail, l'éducation et les outils de
recherche sans interaction émotionnelle soutenue sont hors de portée (Article 2) [35]. Les devoirs :

- pas de membres de famille virtuelle ou de partenaires intimes virtuels pour les mineurs ;
  consentement du tuteur pour les utilisateurs de moins de 14 ans ; un mode pour mineurs avec
  rappels de réalité et limites de temps ; mesures raisonnables pour identifier les mineurs
  (Article 14) [35] ;
- étiquetage du contenu généré par l'IA selon les règles d'étiquetage nationales et un signal clair
  que l'utilisateur interagit avec l'IA ; une fenêtre contextuelle de rappel lorsque la dépendance
  excessive ou l'addiction apparaît ; un rappel après chaque **deux heures** d'utilisation continue
  (Article 18) [35] ;
- une sortie facile : lorsque l'utilisateur demande à partir, le service doit s'arrêter et ne doit
  pas garder l'utilisateur engagé (Article 19) [35] ;
- une **évaluation de la sécurité**, signalée au bureau du cyberespace provincial, lorsque le
  service est lancé ou ajoute de telles fonctionnalités, lorsque la nouvelle technologie le change
  considérablement, lorsqu'il atteint 1 million d'utilisateurs enregistrés ou 100 000 utilisateurs
  actifs mensuels, ou lorsque des risques de sécurité nationale ou d'intérêt public surgissent
  (Article 22) [35] ;
- dépôt d'algorithme selon les dispositions relatives aux recommandations, avec des vérifications
  annuelles par la CAC (Article 26) [35].

Les artefacts sont les mêmes que ceux que les lois américaines sur les compagnons demandent, plus un
moniteur de seuil sur les comptes d'utilisateurs qui déclenche l'évaluation, et le registre de dépôt
que le chapitre 08 cartographie déjà.

## Brésil : PL 2338/2023 (projet de loi)

Le projet de loi sur l'IA du Brésil, PL 2338/2023, a été présenté au Sénat le 3 mai 2023, approuvé
par le plénum du Sénat le 10 décembre 2024 et envoyé à la Chambre des députés, qui l'a reçu le 17
mars 2025 [36][37]. La Chambre a créé une commission spéciale le 4 avril 2025 parce que le projet de
loi a été renvoyé à plus de quatre commissions permanentes ; selon la dernière entrée procédurale,
le 2 septembre 2026, le projet de loi était sous un régime prioritaire et en attente du rapport du
rapporteur, avec un nombre croissant de projets de loi connexes attachés [37]. C'est un projet de
loi, pas une loi. Le texte du Sénat, dont l'objet déclaré est le développement, la promotion et
l'utilisation éthique et responsable de l'IA centrée sur la personne humaine [37], suit un modèle
fondé sur les risques avec une liste d'utilisations à haut risque et d'utilisations interdites
(vérifiez le texte actuel avant de vous fier à un article). Le conseil d'ingénierie pour un projet
de loi est le même partout : cartographiez-le dans la crosswalk comme `status: bill`, n'attachez pas
encore de contrôles à celui-ci, et regardez la commission.

## Canada : après AIDA, la Directive sur la prise de décisions automatisée

La Loi sur l'intelligence artificielle et les données (AIDA), partie du projet de loi C-27, est
morte au Feuilleton lorsque la première session de la 44e législature s'est terminée le 6 janvier
2025 [38]. Le Canada n'a donc pas de statut fédéral sur l'IA pour le secteur privé. Ce qui s'impose
est la **Directive du Conseil du Trésor sur la prise de décisions automatisée**, qui s'applique aux
systèmes de prise de décisions automatisée des institutions fédérales [39]. Elle a pris effet le 1er
avril 2019 ; la version actuelle (modifiée le 24 juin 2025) a donné aux systèmes en place avant
cette date jusqu'au 24 juin 2026 pour respecter les nouvelles exigences, et la directive est
examinée tous les deux ans [39]. Son cœur :

- une **Évaluation de l'impact algorithmique** (EIA) complétée et publiée sur le Portail du
  gouvernement ouvert avant la production, et mise à jour lorsque la fonctionnalité ou la portée
  change ;
- des exigences échelonnées selon le **niveau d'impact** de l'EIA (I à IV), énoncées à l'Appendice C
  ;
- un avis avant les décisions par tous les canaux de service, en langage clair, et une explication
  significative après les décisions ;
- l'assurance de la qualité, y compris l'examen par les pairs par des experts qualifiés avec
  l'examen ou un résumé publié avant la production, et une Analyse comparative entre les sexes Plus
  ;
- des options de recours pour contester la décision, et des rapports publiés sur l'efficacité et
  l'équité [39].

L'EIA est l'exemple public le plus mature d'une évaluation d'impact qui est aussi un artefact
publié, versionnée ; c'est un modèle direct pour [FRIA-as-Code](/patterns/fria-as-code).

## Inde : lignes directrices de gouvernance, pas de loi sur l'IA

L'Inde n'a pas de statut spécifique à l'IA. MeitY a publié les
**Lignes directrices de gouvernance de l'IA en Inde** le 5 novembre 2025, dans le cadre de la
Mission IndiaAI [40]. Elles comprennent sept principes directeurs (« sutras »), des recommandations
dans six piliers, un plan d'action sur des calendriers à court, moyen et long terme, et des conseils
pratiques pour l'industrie, les développeurs et les régulateurs [40]. Le Secrétaire de MeitY a
décrit la politique comme utilisant la législation existante autant que possible [40]. Les
obligations proviennent donc de la loi existante, notamment la loi sur les technologies de
l'information et la protection des données, que le chapitre 19 couvre ; tout amendement spécifique à
l'IA aux Règles informatiques, par exemple sur l'étiquetage du contenu synthétique, doit être
vérifié pour son statut actuel avant d'être cartographié (vérifiez).

## Royaume-Uni : principes, régulateurs et registres du secteur public

Le Royaume-Uni n'a pas de statut horizontal sur l'IA. Son approche, confirmée dans la réponse du
gouvernement de février 2024 au livre blanc sur la réglementation de l'IA, est cinq principes
intersectoriels (sécurité, robustesse ; transparence et explicabilité appropriées ; équité ;
responsabilité et gouvernance ; contestabilité et recours) appliqués par les régulateurs existants
dans leurs domaines de compétence [41]. Il convient de vérifier si un projet de loi sur l'IA de
frontier a été présenté depuis avant de se fier à ce paragraphe (vérifiez). Le reste du tableau
britannique est concret :

- l'**Institut de sécurité de l'IA** (renommé de l'Institut de sécurité de l'IA en février 2025)
  évalue les modèles de frontier [42] ;
- la **Norme d'enregistrement de la transparence algorithmique** (NETA) est obligatoire pour tous
  les ministères gouvernementaux et pour les organismes à distance qui fournissent des services
  publics ou de première ligne ou interagissent directement avec le public ; les registres sont
  publiés dans un référentiel central [43] ;
- le **Code de pratique de cybersécurité de l'IA** (31 janvier 2025) établit les principes de
  sécurité de base pour les systèmes d'IA, avec un guide de mise en œuvre [44] (le chapitre 08
  cartographie séparément la ligne de base ETSI pour sécuriser l'IA, EN 304 223) ;
- pour les décisions entièrement automatisées significatives, la Loi sur les données (utilisation et
  accès) 2025 a remplacé l'Article 22 du RGPD du Royaume-Uni par les Articles 22A à 22D, en vigueur
  depuis le 5 février 2026 (voir [chapitre 08](/bok/regulatory-map#united-kingdom)) [45].

Un registre NETA est une entrée d'inventaire écrite pour le public. Un registre qui contient déjà
les champs de finalité, de propriétaire, de données, de supervision humaine et de risque peut en
générer la plupart.

## Italie : Loi 132/2025

L'Italie a une loi nationale sur l'IA de portée générale qui s'ajoute à la Loi sur l'IA de l'UE. La
Loi n° 132 du 23 septembre 2025, *Dispositions et délégations au Gouvernement sur l'intelligence
artificielle*, a été publiée dans la Gazzetta Ufficiale le 25 septembre 2025 et est entrée en
vigueur le 10 octobre 2025 [46]. Elle doit être lue et appliquée de manière cohérente avec la Loi
sur l'IA de l'UE (Article 1(2)) [46]. Les dispositions qu'un ingénieur rencontrera :

- **Mineurs.** L'accès aux technologies d'IA par les enfants de moins de 14 ans, et le traitement
  connexe des données à caractère personnel, nécessite le consentement du titulaire de l'autorité
  parentale (Article 4(4)) [46].
- **Travail.** L'employeur doit informer les travailleurs lorsque l'IA est utilisée, dans les cas et
  selon les modalités des règles de transparence existantes pour les systèmes automatisés (article
  11(2)) [46].
- **Professions.** Dans les professions intellectuelles, l'IA ne peut être utilisée que pour des
  activités instrumentales et de soutien, et le professionnel doit informer le client des systèmes
  d'IA utilisés (article 13) [46].
- **Autorités.** AgID (l'agence numérique) gère l'innovation et la notification et la surveillance
  des organismes d'évaluation de la conformité ; l'ACN (l'agence de cybersécurité) supervise les
  systèmes d'IA, y compris les inspections et les sanctions ; la Banque d'Italie, la CONSOB et
  l'IVASS restent des autorités de surveillance du marché pour leurs secteurs (article 20) [46].
- **Droit pénal.** Une nouvelle infraction de diffusion illégale d'images, de vidéos ou de voix
  générées ou altérées par l'IA qui causent un préjudice injuste, punissable d'un à cinq ans
  d'emprisonnement (article 26, insérant l'article 612-quater dans le Code pénal) [46].

La loi délègue également l'élaboration de règles supplémentaires au Gouvernement ; le texte
consolidé sur Normattiva a montré une dernière mise à jour du 26 juin 2026 [46].

## Espagne : AESIA, le bac à sable et un projet de loi

L'Espagne dispose d'un superviseur de l'IA opérationnel, d'un bac à sable en direct et d'un projet
de loi national sur l'IA qui n'est pas une loi.

- **Le projet de loi.** Le Conseil des ministres a approuvé, en première lecture le 11 mars 2025, le
  projet de loi pour le bon usage et la gouvernance de l'IA (Anteproyecto de Ley para el buen uso y
  la gobernanza de la Inteligencia Artificial), avec traitement d'urgence ; il devait revenir au
  Conseil des ministres en tant que projet de loi, puis aller aux Cortes Generales [47]. Tel que
  proposé, il fixe le régime des sanctions pour le règlement de l'IA de l'UE dans les fourchettes du
  règlement, traite l'absence d'étiquetage des hypertrucages comme une infraction grave, ajoute un
  pouvoir de retirer provisoirement un système du marché espagnol après un incident grave, et
  répartit la supervision : l'agence de protection des données pour les systèmes biométriques et de
  gestion des frontières interdits et pour les systèmes de migration et d'asile à haut risque des
  forces de sécurité de l'État, le conseil de la magistrature pour la justice, la junte électorale
  centrale pour les processus démocratiques, la Banque d'Espagne, la direction des assurances et la
  CNMV pour leurs secteurs, et AESIA pour le reste [47]. Il n'avait pas été adopté au 2026-09-24 ;
  vérifiez son stade parlementaire avant de le citer (vérifier).
- **Le bac à sable.** Le décret royal 817/2023 a mis en place un environnement de test contrôlé pour
  la conformité avec le (alors proposé) règlement de l'IA [48] ; le premier appel a recherché
  jusqu'à 12 systèmes à haut risque pour un test d'un an [47].
- **Les guides.** AESIA publie 16 guides produits dans le projet pilote du bac à sable : deux guides
  d'introduction, 13 guides techniques (évaluation de la conformité, gestion de la qualité, gestion
  des risques, contrôle humain, gouvernance des données, transparence, exactitude, robustesse,
  cybersécurité, journalisation, surveillance après commercialisation, gestion des incidents,
  documentation technique) et un manuel de liste de contrôle. Ils ne sont pas contraignants et
  antérieurs au Omnibus de l'IA, Règlement (UE) 2026/1744, en vigueur depuis le 27 juillet 2026
  [68]. Au 2026-09-24, la page d'AESIA indique toujours qu'ils seront mis à jour une fois l'Omnibus
  approuvé, donc vérifiez chaque guide par rapport au règlement modifié [49].

Les guides constituent l'ensemble de modèles publics les plus pratiques pour les exigences de haut
risque de l'UE ; le chapitre 18 mappe les articles qu'ils mettent en œuvre.

## Singapour : cadres de modèles et AI Verify

Singapour réglemente l'IA par le biais de cadres volontaires et d'une boîte à outils de test,
maintenue par l'IMDA et la Fondation AI Verify.

- Le **Model AI Governance Framework for Generative AI** (mai 2024) établit des dimensions de
  gouvernance incluant les tests, la transparence, la notification des incidents, la sécurité et la
  provenance du contenu [52].
- Le **Model AI Governance Framework for Agentic AI** a été lancé à Davos le 22 janvier 2026 [50] ;
  la version actuelle 1.5 a été publiée le 20 mai 2026 et mise à jour le 5 juin 2026 [51]. Il a
  quatre dimensions : évaluer et délimiter les risques à l'avance (cas d'usage appropriés ; limites
  et permissions par conception) ; rendre les humains véritablement responsables (allocation des
  responsabilités ; contrôle significatif) ; mettre en œuvre des contrôles techniques et des
  processus (en conception, avant le déploiement, et continuellement en déploiement) ; et permettre
  la responsabilité de l'utilisateur final [51].
- **AI Verify** est un cadre de test qui évalue un système d'IA par rapport à 11 principes de
  gouvernance reconnus internationalement, avec une extension pour l'IA générative et des outils de
  test techniques [53].

Les deux premières dimensions du cadre des agents sont ce que ce livre appelle le
[registre des agents](/patterns/agent-registry) et
[identité non humaine et identifiants limités](/patterns/agent-identity-scoped-credentials) ; la
troisième est l'[évaluation dans l'IC](/patterns/eval-gate-in-ci) plus la surveillance à
l'exécution. Le chapitre 23 sur la
[gouvernance des agents](/bok/governing-agents#frameworks-written-for-agents) va plus loin.

## Australie : droit existant et orientation volontaire

L'Australie n'a pas de loi sur l'IA. Le **Plan national d'IA** du gouvernement, publié en décembre
2025, affirme que l'Australie dispose de cadres juridiques solides, largement neutres sur le plan
technologique, qui peuvent s'appliquer à l'IA, et que le gouvernement surveillera et réagira à
mesure que des défis émergent [54]. Il établit un **Institut de sécurité de l'IA** pour surveiller,
tester et partager les informations sur les capacités et les risques émergents et pour conseiller
les régulateurs existants, et construit des outils d'adoption sur les six pratiques essentielles de
l'**Orientation pour l'adoption de l'IA** [54]. Pour l'ingénieur, les obligations proviennent du
droit de la vie privée, du droit des consommateurs, du droit de la non-discrimination et du droit
sectoriel ; les six pratiques constituent une liste de contrôle raisonnable pour un programme de
gouvernance, non une obligation de conformité.

## Comparaison des régimes

La comparaison ci-dessous utilise les questions qu'une fonction de gouvernance pose à toute loi
spécifique à l'IA. Elle couvre les régimes dont ce texte a vérifié le texte ; le règlement de l'IA
de l'UE est le point de référence et se trouve au chapitre 18, qui mappe également
[les mêmes rôles dans les régimes](/bok/eu-ai-act#the-same-roles-across-regimes) que la colonne
Rôles compresse. Un traité international se tient à côté de ces régimes : la
[Convention-cadre du Conseil de l'Europe](/bok/principles-and-standards#council-of-europe-framework-convention-cets-no-225)
est traitée au chapitre 22, avec son statut de ratification.

| Régime | Déclencheur de classification | Obligations principales | Notification et contrôle humain | Modèles de frontière ou à usage général | Application | Rôles |
|---|---|---|---|---|---|---|
| Loi fondamentale coréenne sur l'IA [1][2] | Domaines à haut impact énumérés plus risque significatif ; IA générative | Gestion des risques, explication, protection des utilisateurs, documents conservés cinq ans ; évaluation d'impact (meilleur effort) | Notification préalable ; étiquettes de sortie ; superviseur humain nommé | Devoirs de sécurité au-dessus de 10^26 FLOP et état de l'art | MSIT ; amendes jusqu'à KRW 30M pour trois défaillances ; période de grâce | Opérateurs développant et utilisant ; représentant national |
| Colorado SB 26-189 [15] | ADMT dans les décisions conséquentes | Documentation du développeur ; registres trois ans | Notification ; explication dans les 30 jours ; examen humain et reconsidération | Aucun | Procureur général ; période de correction ; pas d'action privée | Développeur et déployeur |
| Texas TRAIGA [18] | Intentions interdites ; utilisation gouvernementale et de soins de santé | Éviter les utilisations interdites ; répondre aux demandes d'enquête | Divulgation par le gouvernement et dans les soins de santé | Aucun | Procureur général ; pénalités civiles échelonnées ; période de correction | Développeur, déployeur, gouvernement |
| Californie SB 53 et SB 942 [19][21] | Calcul et revenu (frontière) ; base d'utilisateurs (provenance) | Cadre de frontière ; rapport de transparence ; provenance et détection | Divulgations latentes et manifestes | Développeurs de frontière au-dessus de 10^26 opérations | Procureur général ; jusqu'à USD 1M par violation (SB 53) | Développeur de frontière ; fournisseur couvert ; plateforme |
| Chine, mesures anthropomorphes [35] | Services d'interaction émotionnelle soutenue | Évaluation de la sécurité ; dépôt d'algorithme ; mode mineurs | Signal d'IA ; rappel de deux heures ; sortie facile | Aucun spécifique | CAC et bureaux provinciaux | Fournisseur de services ; magasins d'applications |
| Loi japonaise sur la promotion de l'IA [31] | Aucun (toute technologie liée à l'IA) | Coopération avec les mesures gouvernementales | Aucun dans la loi | Aucun | Pas de pénalités ; orientation après enquête | Institutions de recherche ; opérateurs utilisant |
| Loi italienne 132/2025 [46] | Dispositions sectorielles en plus du règlement de l'IA de l'UE | Information des travailleurs ; divulgation professionnelle ; consentement parental moins de 14 ans | Information aux travailleurs et aux clients | Par le biais du règlement de l'IA de l'UE | AgID et ACN ; infraction pénale pour hypertrucages nuisibles | Employeur ; professionnel ; fournisseur |

## Règles sectorielles qui atteignent déjà l'IA

La loi spécifique à l'IA n'est que la moitié de l'histoire. Les régimes sectoriels rédigés avant, ou
à côté des lois sur l'IA, lient déjà de nombreux systèmes d'IA, généralement parce que l'IA se
trouve à l'intérieur d'un produit, d'un modèle financier, d'un système TIC ou d'une plateforme
qu'ils réglementent. Le chapitre 20 couvre le droit général (propriété intellectuelle,
non-discrimination, protection des consommateurs, responsabilité des produits) ; le tableau
ci-dessous est la couche sectorielle.

| Régime | Déclencheur d'IA | Devoir | Artefact d'ingénierie | Couche |
|---|---|---|---|---|
| DORA, Rég. (UE) 2022/2554 (s'applique à partir du 2025-01-17) [55] | Les systèmes TIC d'une entité financière ou les services TIC de tiers incluent l'IA | Gestion des risques TIC, y compris le risque des tiers TIC, et notification des incidents majeurs liés aux TIC | Systèmes d'IA dans l'inventaire des actifs TIC ; fournisseurs d'IA dans le registre des tiers ; pipeline d'incidents utilisant la classification DORA | 2 · 4 · 5 |
| NIS2, Dir. (UE) 2022/2555 (transposition due 2024-10-17) [56] | Les systèmes de réseau et d'information d'une entité essentielle ou importante incluent l'IA | Gestion des risques de cybersécurité ; alerte précoce dans les 24 heures, notification dans les 72 heures, rapport final dans un mois | Actifs d'IA dans le périmètre de sécurité ; pipeline d'incidents avec l'horloge NIS2 | 4 · 5 |
| Règlement sur la cyberrésilience, Rég. (UE) 2024/2847 (rapports à partir du 2026-09-11 ; devoirs principaux à partir du 2027-12-11) [57][58] | Un produit avec des éléments numériques qui inclut des composants d'IA | Sécurité par conception et gestion des vulnérabilités ; signaler les vulnérabilités activement exploitées et les incidents graves : 24 heures, 72 heures, rapport final | SBOM et AIBOM ; processus de gestion des vulnérabilités ; runbook de rapports pour la plateforme de rapports unique | 2 · 4 · 5 |
| Règlement sur les données, Rég. (UE) 2023/2854 (s'applique à partir du 2025-09-12) [59] | Produits connectés et services connexes dont les données entraînent ou alimentent l'IA ; IA livrée en tant que service de traitement des données | Accès aux données et partage pour les utilisateurs ; passage entre les services de traitement des données | Interface d'accès aux données et journal de partage dans la fiche de données ; plan de sortie et de passage pour la plateforme d'IA | 2 · 5 |
| RDM et IVDR de l'UE, avec MDCG 2025-6 sur leur interaction avec le règlement de l'IA (juin 2025) [60] | Logiciel de dispositif médical qui utilise l'IA | Évaluation de la conformité du dispositif ; lorsque l'IA est également à haut risque selon le règlement de l'IA, les deux régimes s'appliquent et la FAQ du MDCG explique comment ils s'articulent | Documentation technique construite une fois pour servir les deux régimes ; évaluation clinique ou de performance ; plan de surveillance après commercialisation | 3 · 5 |
| Projet de guide de la FDA sur les fonctions logicielles de dispositifs activées par l'IA (janvier 2025 ; toujours en projet sur la page de la FDA) [61] | Logiciel de dispositif activé par l'IA dans une demande de commercialisation américaine | Documentation recommandée sur l'ensemble du cycle de vie du produit pour soutenir l'examen de la sécurité et de l'efficacité | Description du modèle ; rapport de gestion et de validation des données ; étiquetage ; acompagnement des performances après commercialisation | 3 · 5 |
| Gestion des risques liés aux modèles aux États-Unis : SR 26-2 (2026-04-17), remplaçant SR 11-7 [62] | Modèles, y compris l'IA et le ML, utilisés par les organisations bancaires ; les plus pertinents au-dessus de 30 milliards USD d'actifs | Gestion des risques liés aux modèles basée sur les risques, adaptée au profil de risque du modèle | Entrée d'inventaire des modèles ; rapport de validation ; résultats des évaluations comme preuves de validation ; acompagnement des performances | 2 · 3 · 5 |
| PRA SS1/23 (en vigueur 2024-05-17 ; version révisée en vigueur 2026-04-23) [63] | Modèles utilisés par les banques britanniques, les sociétés de crédit immobilier et les entreprises d'investissement désignées par la PRA disposant d'une approbation de modèle interne pour le capital réglementaire | Cinq principes pour une approche stratégique du risque lié aux modèles, commençant par l'identification des modèles et la classification des risques liés aux modèles | Inventaire des modèles avec hiérarchisation ; dossier de validation ; journal des mesures d'atténuation des risques liés aux modèles | 2 · 3 · 5 |
| ECOA et Regulation B ; avis de mesures contraires de la FCRA [64] | Une décision de crédit prise ou soutenue par un algorithme complexe | Motifs principaux spécifiques de mesure contraire en vertu de 12 CFR 1002.9 ; la Circulaire 2022-03 du CFPB affirmant que la complexité n'est pas une excuse a été retirée le 12 mai 2025, et l'obligation de Regulation B subsiste [71]. Les avis de la FCRA s'appliquent lorsqu'un rapport de consommateur est utilisé (vérifier la portée par produit) | Générateur de codes de raison enregistré avec chaque décision ; modèle d'avis ; évaluation que les raisons sont fidèles au modèle | 3 · 4 · 5 |
| Directive sur le travail de plateforme, Dir. (UE) 2024/2831 (transposition avant le 2 déc 2026, art. 29(1)) [65][70] | Plateformes de travail numérique utilisant la surveillance ou la prise de décision automatisées | Transparence des systèmes automatisés ; acompagnement par du personnel qualifié ; droit de contester les décisions automatisées | Registre de gestion algorithmique ; informations destinées aux travailleurs ; file d'attente d'examen humain avec journal des décisions ; AIPD | 2 · 4 · 5 |
| Mineurs et sécurité en ligne : lignes directrices de l'art. 28 du DSA (2025-07-14) ; devoirs relatifs aux enfants de la UK Online Safety Act ; lois sur les chatbots compagnons [66][67][24][27][35] | Services susceptibles d'être utilisés par des enfants, y compris les chats et compagnons IA | Mesures de protection proportionnées ; évaluation des risques pour les enfants ; rappels et orientation en cas de crise | Signal d'assurance de l'âge ; configuration du mode mineurs ; évaluation des risques pour les enfants ; journaux des rappels et des orientations | 1 · 4 · 5 |

Deux de ces lignes ont changé récemment assez pour piéger une équipe qui a regardé pour la dernière
fois en 2025. Les agences bancaires américaines ont remplacé SR 11-7, le texte de référence de la «
gestion des risques liés aux modèles » pendant quinze ans, par SR 26-2 le 17 avr 2026 [62] ; les
références à « SR 11-7 » dans les politiques de gouvernance des modèles doivent maintenant pointer
vers les lignes directrices révisées. Et les obligations de signalement de la Cyber Resilience Act
ont commencé le 11 sep 2026 [57].

### Horloges d'incident entre régimes

Un incident d'IA peut démarrer plusieurs horloges à la fois. Le modèle
[Incident Pipeline](/patterns/incident-pipeline) doit tenir chaque horloge comme donnée, indexée par
le régime et le déclencheur, de sorte qu'une décision de triage se propage à chaque rapport qui est
dû. Le chapitre 17 traite la [réponse aux incidents](/bok/incidents#the-overlapping-clocks) en
détail.

| Régime | Déclencheur | Horloge | Destinataire |
|---|---|---|---|
| NIS2 [56] | Incident important | Avertissement préalable de 24 h ; notification de 72 h ; rapport final dans un mois | CSIRT ou autorité compétente |
| Cyber Resilience Act [58] | Vulnérabilité activement exploitée ou incident grave | Avertissement préalable de 24 h ; notification de 72 h ; rapport final 14 jours après un correctif (vulnérabilités) ou un mois (incidents) | Plateforme de signalement unique |
| DORA [55] | Incident majeur lié aux TIC | Notification initiale dans les 4 h suivant la classification de l'incident comme majeur et au plus tard 24 h après la prise de connaissance ; rapport intermédiaire dans les 72 h suivant la notification initiale ; rapport final dans un mois suivant le dernier rapport intermédiaire (Règlement délégué (UE) 2025/301, art. 5) [69] | Autorité financière compétente |
| California SB 53 [19] | Incident critique de sécurité | 15 jours ; 24 h si la mort ou une blessure grave est imminente | Office of Emergency Services ; autorité appropriée pour le cas de 24 heures |
| New York RAISE [25][26] | Incident critique de sécurité | 72 h ; 24 h si la mort ou une blessure physique grave est imminente | Bureau de surveillance au sein du Department of Financial Services ; agence d'application de la loi ou de sécurité publique pour le cas de 24 heures |
| Korea AI Basic Act [1] | Obligations de sécurité pour les systèmes à calcul élevé | Pas d'horloge fixe ; résultats des mesures de sécurité soumis au MSIT | MSIT |
| Reglamento de IA Art. 73 | Incident grave (haut risque) | Voir le [tableau des horloges au chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus) | Autorité de surveillance du marché |

> **En pratique (illustratif)**
> Une société de paiements a exécuté un modèle de notation des fraudes à l'intérieur d'une
> plateforme qui était un service TIC en vertu de DORA, une entité importante en vertu de NIS2 et,
> par ses terminaux de point de vente, un produit CRA. Lorsqu'un chemin d'injection de prompts dans
> son agent d'assistance a exposé les données de carte, le pipeline d'incidents a ouvert un ticket
> et trois rapports destinés aux régulateurs à partir de la même chronologie, chacun avec sa propre
> horloge et son propre modèle. Ce qui a fait fonctionner n'était pas le modèle : c'était un
> registre qui avait déjà marqué l'agent avec les trois régimes, et un magasin de preuves qui
> permettait à chaque rapport de citer les mêmes journaux signés.

## Ce que vous pouvez faire cette semaine

1. **Ajoutez un bloc de juridiction à chaque entrée de registre.** Listez où chaque système est
   proposé, et pour chaque endroit enregistrez la valeur d'état (binding-horizontal,
   binding-targeted, voluntary, bill), le verdict de classification et le modèle d'avis en vigueur.
   Commencez par le test d'impact élevé de la Corée et le test de décision conséquente du Colorado ;
   ils couvrent la plupart des systèmes d'embauche et de prêt.
2. **Vérifiez les seuils du représentant national coréen.** Tirez les revenus de l'année dernière
   des services d'IA et la moyenne quotidienne des utilisateurs sur trois mois pour la Corée ; si
   l'un ou l'autre franchit la ligne du décret, désignez un représentant et donnez-lui une vue de
   preuves en lecture seule avant la fin de la période de guidance.
3. **Transformez les horloges d'incident en données.** Mettez les horloges NIS2, CRA, DORA, SB 53,
   RAISE et AI Act Article 73 dans un tableau indexé par déclencheur, et faites lire le pipeline
   d'incidents. Testez-le avec un incident de table ronde qui frappe deux régimes.
4. **Remplacez « SR 11-7 » dans votre politique de gouvernance des modèles.** Pointez-la vers SR
   26-2 et re-hiérarchisez votre inventaire de modèles par rapport aux lignes directrices révisées
   basées sur les risques.
5. **Faites répondre la fiche de modèle aux questions du Texas.** Objectif, types de données
   d'entraînement, catégories d'entrée et de sortie, métriques de performance, limites connues et
   acompagnement après déploiement : les huit éléments que le procureur général du Texas peut
   demander sont un bon minimum pour toute fiche de modèle.

**Correspondances :** Korea AI Basic Act Arts. 2, 4, 31–36, 40, 43 et Enforcement Decree Arts. 23–29
· OMB M-25-21 §4 et M-26-04 · EO 14365 · Colorado SB 26-189 · Texas HB 149 · California SB 53, SB
942 et AB 853, AB 2013, SB 243 et les règlements CPPA ADMT · New York RAISE et GBL Art. 47 · Utah AI
Policy Act · Illinois HB 3773 · NYC Local Law 144 · Japan Act No. 53 of 2025 · CAC anthropomorphic
interaction measures · Canada Directive on Automated Decision-Making · Italy Law 132/2025 ·
Singapore Model AI Governance Frameworks et AI Verify · DORA · NIS2 · Cyber Resilience Act · Data
Act · MDR et IVDR · SR 26-2 · PRA SS1/23 · Regulation B · Platform Work Directive · DSA Art. 28 ·
les cinq couches du stack ([Gouvernance en tant que code](/bok/the-stack#layer-01-govern-as-code) à
[Assurance & Continuous Compliance](/bok/the-stack#layer-05-assurance--continuous-compliance)). Les
mappages sont illustratifs, non une affirmation de conformité.

## Sources

[1] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법; Act No. 20676, promulgated 2025-01-21, in force 2026-01-22; as amended by Act No. 21311 of 2026-01-20, in force 2026-01-22 and, for Arts. 3(5), 16(3)-(5), 17-2, 18, 22-3 and the second sentence of 35(1), 2026-07-21; Arts. 2(4) high-impact areas, 2(7) operators, 4 scope, 31 transparency, 32 safety, 33 confirmation, 34 high-impact duties, 35 impact assessment, 36 domestic representative, 40 fact-finding, 43 fines up to KRW 30M; version in force 2026-07-21). Korean Law Information Center (MOLEG). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791&efYd=20260721 (verified: primary)
[2] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, promulgated 2026-01-21, in force 2026-01-22; as amended by Presidential Decree No. 36506 of 2026-07-20, in force 2026-07-21, and No. 36580, in force 2026-08-20; Art. 1-2 AI-vulnerable groups, Art. 15(4) confirmation of AI products for public procurement, Art. 23 notice and labelling methods, Art. 24 10^26 FLOP and two further criteria, Art. 25 confirmation procedure and 30-day reply, Art. 27 publication and five-year retention, Art. 28 impact-assessment content, Art. 29 domestic-representative thresholds; version in force 2026-08-20). Korean Law Information Center (MOLEG). 2026-08-18. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=288781&efYd=20260820 (verified: primary)
[3] "AI Basic Act Update: Enforcement and Key Implications" (MSIT guidance period of at least one year for fact-finding and fines; exceptions for loss of life or human-rights violations; AI Basic Act help desk). Shin & Kim. 2026-02-11. https://www.shinkim.com/eng/media/newsletter/3117 (verified: secondary)
[4] "AI기본법 시행령 7월 시행, 공공조달 AI 확인 제도 핵심 정리" (decree amendment in force 2026-07-21: public-procurement AI confirmation system, liability exemption for adopting officials, AI-vulnerable groups widened to job seekers and women with career breaks, support measures). Korea Data Economy News (한국데이터경제신문). 2026-07-20. https://www.dataeconomy.co.kr/news/articleView.html?idxno=41346 (verified: secondary)
[5] Executive Order 14179, Removing Barriers to American Leadership in Artificial Intelligence (signed 2025-01-23; review of actions taken under the revoked EO 14110; AI action plan within 180 days). Federal Register, Vol. 90, No. 20 (via GovInfo). 2025-01-31. https://www.govinfo.gov/content/pkg/FR-2025-01-31/html/2025-02172.htm (verified: primary)
[6] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (rescinds M-24-10; high-impact AI definition; minimum practices §4(b); 365 days to document). Office of Management and Budget. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[7] "White House Releases New Policies on Federal Agency AI Use and Procurement" (M-25-21 and M-25-22, Driving Efficient Acquisition of Artificial Intelligence in Government). The White House. 2025-04-07. https://www.whitehouse.gov/releases/2025/04/white-house-releases-new-policies-on-federal-agency-ai-use-and-procurement/ (verified: primary)
[8] OMB Memorandum M-26-04, Increasing Public Trust in Artificial Intelligence Through Unbiased AI Principles (implements EO 14319 of 2025-07-23; policies updated by 2026-03-11; minimum LLM transparency: acceptable use policy, model/system/data cards, end-user resources, feedback mechanism). Office of Management and Budget. 2025-12-11. https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf (verified: primary)
[9] Winning the Race: America's AI Action Plan (three pillars; funding and state AI regulatory climate; FCC evaluation; NIST AI RMF revision). The White House. 2025-07. https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf (verified: primary)
[10] Executive Order 14365, Ensuring a National Policy Framework for Artificial Intelligence (signed 2025-12-11; §3 AI Litigation Task Force in 30 days; §4 Commerce evaluation in 90 days; §5 BEAD and grant conditions; §6 FCC; §7 FTC policy statement; §8 legislative recommendation and carve-outs). Federal Register, Vol. 90, No. 239 (via GovInfo). 2025-12-16. https://www.govinfo.gov/content/pkg/FR-2025-12-16/html/2025-23092.htm (verified: primary)
[11] National Policy Framework for Artificial Intelligence: Legislative Recommendations (non-binding; preempt unduly burdensome state AI laws; keep generally applicable child-protection, anti-fraud and consumer laws). The White House. 2026-03-20. https://www.whitehouse.gov/wp-content/uploads/2026/03/03.20.26-National-Policy-Framework-for-Artificial-Intelligence-Legislative-Recommendations.pdf (verified: primary)
[12] "Navigating the Emerging Federal-State AI Showdown: DOJ Establishes AI Litigation Task Force" (task force announced by the Attorney General on 2026-01-09). BakerHostetler. 2026-01-20. https://www.bakerlaw.com/insights/navigating-the-emerging-federal-state-ai-showdown-doj-establishes-ai-litigation-task-force/ (verified: secondary)
[13] "FTC Seeks Public Comment on Policy Statement Addressing AI Accuracy" (proposed Section 5 policy statement; Colorado AI Act discussed as possibly impliedly preempted; comments to 2026-07-31). Federal Trade Commission. 2026-07-01. https://www.ftc.gov/news-events/news/press-releases/2026/07/ftc-seeks-public-comment-policy-statement-addressing-ai-accuracy (verified: primary)
[14] "Lawmakers propose AI framework that would preempt state laws for 3 years" (Obernolte and Trahan discussion draft, Great American Artificial Intelligence Act of 2026). Nextgov/FCW. 2026-06-04. https://www.nextgov.com/artificial-intelligence/2026/06/lawmakers-propose-ai-framework-would-preempt-state-laws-3-years/413975/ (verified: secondary)
[15] SB26-189, Automated Decision-Making Technology (repeals and re-enacts SB 24-205; signed 2026-05-14; effective 2027-01-01; developer documentation, deployer notice, 30-day explanation, human review, three-year records; Attorney General enforcement with 60-day cure). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[16] "Colorado AI law in flux: comprehensive replacement bill signed after federal court blocks predecessor's enforcement" (SB 24-205 delayed to 2026-06-30, then replaced by SB 26-189; xAI suit filed 2026-04-09; DOJ companion complaint 2026-04-24; stipulated order of 2026-04-27 pausing enforcement). McDermott Will & Emery. 2026-05-27. https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/ (verified: secondary)
[17] "DOJ Intervenes in Lawsuit Challenging Colorado's 'Algorithmic Discrimination' Law" (developer suit filed 2026-04-09 in the District of Colorado; DOJ complaint on Equal Protection grounds). Barnes & Thornburg. 2026-05-01. https://btlaw.com/en/insights/alerts/2026/doj-intervenes-in-lawsuit-challenging-colorados-algorithmic-discrimination-law (verified: secondary)
[18] Texas Responsible Artificial Intelligence Governance Act (HB 149, enrolled; effective 2026-01-01; §552.051 disclosure, §§552.052–552.057 prohibitions, §552.101 no private right of action, §552.103 civil investigative demand items, §552.104 60-day cure, §552.105 penalties, 36-month sandbox). Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[19] SB-53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; chaptered 2025-09-29, Chapter 138; 10^26 operations; USD 500M revenue; frontier AI framework; transparency report; incident reports to OES in 15 days or 24 hours; up to USD 1M per violation; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1)). California Legislative Information. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53 (verified: primary)
[20] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; transparency reports by all frontier developers). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[21] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01; s. 22757.4 civil penalty USD 5,000 per violation, each day a discrete violation). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[22] AB-2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28, Chapter 817; documentation on or before 2026-01-01 for systems released since 2022-01-01; exemptions). California Legislative Information. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[23] "California Finalizes Regulations to Strengthen Consumers' Privacy" (ADMT, risk-assessment and cybersecurity-audit regulations approved 2025-09-23; effective 2026-01-01; ADMT from 2027-01-01; attestations from 2028-04-01). California Privacy Protection Agency. 2025-09-23. https://cppa.ca.gov/announcements/2025/20250923.html (verified: primary)
[24] SB-243, Companion chatbots (chaptered 2025-10-13, Chapter 677; AI disclosure; three-hour reminders for known minors; self-harm protocol; reports from 2027-07-01; private right of action, at least USD 1,000 per violation). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243 (verified: primary)
[25] NY State Senate Bill 2025-S6953B (RAISE Act as signed 2025-12-19: frontier models above 10^26 operations costing over USD 100M; safety protocols; 72-hour incident disclosure; thresholds and the reporting recipient superseded by the chapter amendment signed 2026-03-27, which uses 10^26 operations, USD 500M revenue for large frontier developers and a DFS office, see [26]). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[26] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment S8828 signed 2026-03-27; SB 53's thresholds: frontier model above 10^26 operations, large frontier developer above USD 500M annual revenue; all frontier developers report critical safety incidents within 72 hours to a new DFS office, or within 24 hours to law enforcement or public safety agencies on imminent risk). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[27] New York General Business Law Article 47, Artificial Intelligence Companion Models (§1701 self-harm protocol; §1702 notice at start and every three hours; §1703 Attorney General, up to USD 15,000 per day). New York State Senate. 2026. https://www.nysenate.gov/legislation/laws/GBS/A47 (verified: primary)
[28] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (disclosure on clear request; high-risk AI interaction; regulated occupations; safe harbour; effective 2025-05-07; AI Policy Act repeal date 2027-07-01). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[29] "Illinois Adopts New AI-in-Employment Regulations: What Employers Need to Know for 2026" (HB 3773 effective 2026-01-01; notice duty; IDHR draft rules; Human Rights Act remedies). Hinshaw & Culbertson. 2026. https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026 (verified: secondary)
[30] Automated Employment Decision Tools (Local Law 144 of 2021; bias audit within one year; public summary; notices; enforcement from 2023-07-05). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[31] Act on the Promotion of Research, Development and Utilisation of AI-Related Technologies (人工知能関連技術の研究開発及び活用の推進に関する法律; Act No. 53 of 2025, promulgated 2025-06-04; Arts. 7, 13, 16, 18; no penalties). e-Gov Law Search (Digital Agency). 2025-06-04. https://laws.e-gov.go.jp/law/507AC0000000053 (verified: primary)
[32] AI Act page (promulgated and partly in force 2025-06-04; fully in force 2025-09-01). Cabinet Office of Japan. 2025. https://www8.cao.go.jp/cstp/ai/ai_act/ai_act.html (verified: primary)
[33] AI Basic Plan (Cabinet decisions of 2025-12-23 and 2026-07-14). Cabinet Office of Japan. 2026-07-14. https://www8.cao.go.jp/cstp/ai/ai_plan/ai_plan.html (verified: primary)
[34] Guidelines on ensuring the appropriateness of research, development and use of AI-related technologies (AI Strategy Headquarters decision of 2025-12-19). Cabinet Office of Japan. 2025-12-19. https://www8.cao.go.jp/cstp/ai/ai_guideline/ai_guideline.html (verified: primary)
[35] Interim Measures for the Administration of Anthropomorphic Interaction Services (人工智能拟人化互动服务管理暂行办法; CAC, NDRC, MIIT, MPS and SAMR; Art. 2 scope; Art. 14 minors; Art. 18 labelling and two-hour reminder; Art. 19 exit; Art. 22 security assessment incl. 1M registered or 100k monthly active users; Art. 26 filing; in force 2026-07-15). Cyberspace Administration of China. 2026-04-10. https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm (verified: primary)
[36] PL 2338/2023, Marco Legal da Inteligência Artificial (introduced 2023-05-03; approved by the Senate plenary 2024-12-10; sent to the Chamber of Deputies). Federal Senate of Brazil. 2025-03-17. https://www25.senado.leg.br/web/atividade/materias/-/materia/157233 (verified: primary)
[37] PL 2338/2023 in the Chamber of Deputies (received 2025-03-17; special committee created 2025-04-04; priority regime; awaiting report as of the 2026-09-02 entry). Câmara dos Deputados. 2026-09-02. https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262 (verified: primary)
[38] C-27 (44-1), Digital Charter Implementation Act, 2022 (enacting the Artificial Intelligence and Data Act; session ended 2025-01-06). LEGISinfo, Parliament of Canada. 2025. https://www.parl.ca/legisinfo/en/bill/44-1/c-27 (verified: primary)
[39] Directive on Automated Decision-Making (effective 2019-04-01; modified 2025-06-24; existing systems to comply by 2026-06-24; AIA, Appendix C impact levels, notice, explanation, peer review, GBA Plus, recourse, reporting). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[40] "MeitY Unveils India AI Governance Guidelines under IndiaAI Mission" (seven sutras, six pillars, action plan; existing legislation wherever possible). Press Information Bureau, Government of India. 2025-11-05. https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186639 (verified: primary)
[41] A pro-innovation approach to AI regulation: government response (CP 1019; five cross-sector principles applied by existing regulators). Department for Science, Innovation and Technology. 2024-02-06. https://www.gov.uk/government/consultations/ai-regulation-a-pro-innovation-approach-policy-proposals/outcome/a-pro-innovation-approach-to-ai-regulation-government-response (verified: primary)
[42] "AI Security Institute" (written statement announcing the rename of the AI Safety Institute). UK Parliament. 2025-02-24. https://questions-statements.parliament.uk/written-statements/detail/2025-02-24/hlws454 (verified: primary)
[43] Algorithmic Transparency Recording Standard Hub (mandatory for government departments and for arm's-length bodies delivering public or frontline services). Government Digital Service. 2025-05-08. https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub (verified: primary)
[44] AI Cyber Security Code of Practice (code and implementation guide). Department for Science, Innovation and Technology. 2025-01-31. https://www.gov.uk/government/publications/ai-cyber-security-code-of-practice (verified: primary)
[45] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; in force 2026-02-05). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[46] Legge 23 settembre 2025, n. 132, Disposizioni e deleghe al Governo in materia di intelligenza artificiale (GU Serie Generale n. 223 of 2025-09-25; in force 2025-10-10; Arts. 1(2), 4(4), 11(2), 13, 20, 26; consolidated text last updated 2026-06-26). Gazzetta Ufficiale / Normattiva. 2025-09-25. https://www.gazzettaufficiale.it/eli/id/2025/09/25/25G00143/sg (verified: primary)
[47] Referencia del Consejo de Ministros, 11 March 2025 (Anteproyecto de Ley para el buen uso y la gobernanza de la Inteligencia Artificial, first reading, urgent processing; sanctions, deepfake labelling, provisional withdrawal, authorities; sandbox call for up to 12 systems). La Moncloa. 2025-03-11. https://www.lamoncloa.gob.es/consejodeministros/referencias/paginas/2025/20250311-referencia-rueda-de-prensa-ministros.aspx (verified: primary)
[48] Real Decreto 817/2023, de 8 de noviembre, entorno controlado de pruebas (AI regulatory sandbox). Boletín Oficial del Estado. 2023-11-09. https://www.boe.es/eli/es/rd/2023/11/08/817 (verified: primary)
[49] Guías (16 guides from the Spanish AI regulatory sandbox pilot; non-binding; the page still says they will be updated once the digital Omnibus is approved, as of 2026-09-24). AESIA. 2026. https://aesia.digital.gob.es/es/guias (verified: primary)
[50] "Singapore Launches New Model AI Governance Framework for Agentic AI" (launched at Davos). IMDA. 2026-01-22. https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai (verified: primary)
[51] Model AI Governance Framework for Agentic AI, version 1.5 (published 2026-05-20, updated 2026-06-05; four dimensions). IMDA. 2026-06-05. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[52] Model AI Governance Framework for Generative AI (voluntary). IMDA / AI Verify Foundation. 2024-05. https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf (verified: primary)
[53] AI Verify Testing Framework (11 internationally recognised AI governance principles; generative-AI update). AI Verify Foundation. 2026. https://aiverifyfoundation.sg/what-is-ai-verify/ (verified: primary)
[54] National AI Plan, "Keep Australians safe" (existing technology-neutral frameworks; AI Safety Institute; six essential practices of the Guidance for AI Adoption; published December 2025; opened via the Internet Archive). Department of Industry, Science and Resources. 2025-12. https://www.industry.gov.au/publications/national-ai-plan/keep-australians-safe (verified: primary)
[55] Digital Operational Resilience Act (DORA) (entered into force 2023-01-16; applies from 2025-01-17; ICT and ICT third-party risk; reporting of major ICT-related incidents). European Securities and Markets Authority. 2025. https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora (verified: primary)
[56] NIS2 Directive: questions and answers (transposition by 2024-10-17; early warning 24 hours, notification 72 hours, final report within one month). European Commission. 2024. https://digital-strategy.ec.europa.eu/en/faqs/directive-measures-high-common-level-cybersecurity-across-union-nis2-directive-faqs (verified: primary)
[57] Cyber Resilience Act (in force 2024-12-10; reporting obligations from 2026-09-11; main obligations from 2027-12-11; guidance of 2026-07-27). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act (verified: primary)
[58] Cyber Resilience Act: reporting obligations (24-hour early warning, 72-hour notification, final report 14 days after a corrective measure or one month for severe incidents; single reporting platform). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/cra-reporting (verified: primary)
[59] Data Act (in force 2024-01-11; applies from 2025-09-12; access to data from connected products; switching between cloud providers). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/policies/data-act (verified: primary)
[60] MDCG 2025-6, FAQ on interplay between the MDR and IVDR and the Artificial Intelligence Act (how the device regulations and the AI Act apply together; listed on the Commission's MDCG guidance page). Medical Device Coordination Group (European Commission). 2025-06. https://health.ec.europa.eu/document/download/b78a17d7-e3cd-4943-851d-e02a2f22bbb4_en?filename=mdcg_2025-6_en.pdf (verified: primary)
[61] Artificial Intelligence-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations (draft guidance; docket FDA-2024-D-4488). US Food and Drug Administration. 2025-01-07. https://www.fda.gov/regulatory-information/search-fda-guidance-documents/artificial-intelligence-enabled-device-software-functions-lifecycle-management-and-marketing (verified: primary)
[62] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; most relevant above USD 30B in total assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[63] SS1/23, Model risk management principles for banks (published 2023-05-17; effective 2024-05-17; revised version effective 2026-04-23; scope: banks, building societies and PRA-designated investment firms with internal-model approval; five principles). Prudential Regulation Authority (Bank of England). 2026-04. https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss (verified: primary)
[64] Consumer Financial Protection Circular 2022-03, Adverse action notification requirements in connection with credit decisions based on complex algorithms (ECOA and Regulation B; withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14, although the page shows no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[65] "Platform workers: Council adopts new rules to improve their working conditions" (algorithmic management transparency; monitoring by qualified staff; right to contest; two years to transpose). Council of the European Union. 2024-10-14. https://www.consilium.europa.eu/en/press/press-releases/2024/10/14/platform-workers-council-adopts-new-rules-to-improve-their-working-conditions/ (verified: primary)
[66] "Commission publishes guidelines on the protection of minors" (DSA Art. 28 guidelines). European Commission. 2025-07-14. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-protection-minors (verified: primary)
[67] Online Safety Act: explainer (children's risk assessments due 2025-07-24; child-safety regime in effect from summer 2025). Department for Science, Innovation and Technology. 2025-04-24. https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer (verified: primary)
[68] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 27 Jul 2026; Annex III high-risk obligations from 2 Dec 2027). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[69] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits for major ICT-related incident reports under DORA (Art. 5: initial notification within 4 hours of classification and 24 hours of awareness; intermediate within 72 hours; final within one month). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[70] Directive (EU) 2024/2831 on improving working conditions in platform work (Art. 29(1): transposition by 2 Dec 2026). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng (verified: primary)
[71] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
