---
lang: fr
source: bok/10-reading-list.md
sourceHash: "4a49b156ff700e2877fb34618240a82581dbb1f121375b5415dff77b871b93f5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 10. Bibliographie

> Les sources qui ont formé la discipline, curées et annotées, chacune avec une URL vérifiée et une
> note d'une ligne sur son importance.

Ceci est une bibliographie de travail, non un canon. Les entrées sont groupées par thème et annotées
en une ligne. Les URL sont données en ligne avec une balise de vérification (`primary`, `secondary`,
`reported`) pour que le chapitre soit auto-documenté; chaque URL est soit tirée du résumé de
recherche du livre, soit vérifiée pour cette édition. Les outils sont nommés comme exemples de
catégorie, illustratifs et non des recommandations.

Chaque entrée porte également deux balises : le **public** qu'elle sert au mieux (`engineering`,
`governance`, `legal`, `leadership`, `research`) et la **juridiction** à laquelle elle s'adresse
(`global` quand elle n'est pas liée à un ordre juridique). Les balises sont une aide à la lecture,
non un classement. La même liste, filtrable par les deux balises, se trouve sur la page des
ressources du site. Aucun guide d'étude commercial pour une certification n'est listé.

## Textes fondamentaux (la forme et la méthode)

- **GRC Engineering Manifesto** : la déclaration fondatrice de la discipline mère; le modèle
  structurel et philosophique de ce livre. `https://grc.engineering/` (vérifié : primaire) (public :
  gouvernance, ingénierie; juridiction : global)
- **« What is GRC Engineering » (Ayoub Fandi)** : la définition la plus claire de la méthode mère et
  la source du test « un tableau de bord vert sur un contrôle cassé est du théâtre ».
  `https://grcengineer.com/what-is-grc-engineering/` (vérifié : primaire) (public : gouvernance,
  ingénierie; juridiction : global)
- **The Agile Manifesto** : la forme numérotée valeurs-et-principes et le modèle de signataires que
  ce livre emprunte. `https://agilemanifesto.org/` (vérifié : primaire) (public : ingénierie,
  leadership; juridiction : global)
- **The Twelve-Factor App** : le modèle pour un corps de pratique numéroté, orienté praticiens, avec
  un encadrement « qui devrait lire ceci ». `https://12factor.net/` (vérifié : primaire) (public :
  ingénierie; juridiction : global)
- **CSIRO Responsible AI Pattern Catalogue** : le modèle de motif (chapitre 05) et la preuve que la
  pratique d'IA responsable peut être écrite comme des motifs réutilisables.
  `https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/` (vérifié :
  primaire) (public : ingénierie, recherche; juridiction : global)
- **privacypatterns.org** : le précédent pour traduire un principe juridique (protection de la vie
  privée dès la conception) en motifs d'ingénierie sous CC BY. `https://privacypatterns.org/`
  (vérifié : primaire) (public : ingénierie, juridique; juridiction : global)

## Réglementation et normes

- **Règlement de l'IA de l'UE, texte consolidé (EUR-Lex)** : Règlement (UE) 2024/1689 tel que
  modifié par l'Omnibus numérique (Règlement (UE) 2026/1744), consolidé le 27 juillet 2026; la
  source d'obligation primaire pour le chapitre 08.
  `https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng` (vérifié : primaire) (public :
  juridique, gouvernance, ingénierie; juridiction : UE)
- **Omnibus numérique sur l'IA, Règlement (UE) 2026/1744 (EUR-Lex)** : l'acte modificateur tel que
  publié au Journal officiel le 24 juillet 2026, avec les nouvelles dates et les nouveaux articles
  4a et 75a-75d. `https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng` (vérifié : primaire) (public :
  juridique, gouvernance; juridiction : UE)
- **AI Act Explorer (Future of Life Institute)** : une lecture navigable, article par article, de
  l'Acte et des changements de l'Omnibus; commentaire et navigation, non le texte juridique.
  `https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/` (vérifié : secondaire)
  (public : juridique, gouvernance, ingénierie; juridiction : UE)
- **GPAI Code of Practice** : le code volontaire de la Commission pour l'IA à usage général, y
  compris le chapitre sécurité et sûreté dont les signataires s'engagent à des évaluations de
  modèle. `https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai` (vérifié :
  primaire) (public : juridique, ingénierie; juridiction : UE)
- **Normalisation du Règlement de l'IA (Commission européenne)** : la page d'état propre de la
  Commission pour les normes harmonisées qui accorderaient une présomption de conformité; en date du
  2026-09-24, aucune n'est citée au JO.
  `https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation` (vérifié : primaire)
  (public : gouvernance, juridique; juridiction : UE)
- **« ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity »** :
  la relation clé entre la norme AIMS (et 42005/42006) et le Règlement.
  `https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/`
  (vérifié : secondaire) (public : gouvernance, juridique; juridiction : UE)
- **JTC 21 harmonised-standards tracker** : un suivi maintenu par un fournisseur de l'étape que
  chaque livrable JTC 21 a atteinte; utile pour les dates, à lire par rapport à la page de la
  Commission ci-dessus. `https://kla.digital/blog/jtc-21-standards-tracker` (vérifié : secondaire)
  (public : gouvernance; juridiction : UE)
- **NIST AI Risk Management Framework 1.0** : les fonctions Govern/Map/Measure/Manage utilisées
  comme cible de mappage tout au long. `https://www.nist.gov/itl/ai-risk-management-framework`
  (vérifié : primaire) (public : gouvernance, ingénierie; juridiction : US)
- **NIST NCCoE, « Software and AI Agent Identity and Authorization » (concept paper)** : la
  référence émergente pour l'identité non humaine, la condition préalable de la gouvernance d'agent.
  `https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents`
  (vérifié : primaire) (public : ingénierie; juridiction : US)
- **NIST CAISI AI Agent Standards Initiative** : l'effort pour rendre l'interopérabilité et la
  sécurité des agents standard, non par fournisseur.
  `https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure`
  (vérifié : primaire) (public : ingénierie, gouvernance; juridiction : US)
- **OWASP GenAI Security Project** : le siège du Top 10 pour les applications LLM, du Top 10 pour
  les applications Agentic, du projet AIBOM et de l'AI Maturity Assessment.
  `https://genai.owasp.org/` (vérifié : primaire) (public : ingénierie; juridiction : global)
- **CSA AI Controls Matrix and STAR for AI** : le cadre de contrôle et le programme d'assurance
  mappés à ISO 42001 et NIST AI RMF (chapitres 07-08). `https://cloudsecurityalliance.org/star/ai`
  (vérifié : primaire) (public : gouvernance, ingénierie; juridiction : global)
- **MITRE ATLAS** : la base de connaissances des tactiques et techniques adversariales pour l'IA, y
  compris les techniques d'agent, sur laquelle les modèles de menace s'appuient.
  `https://atlas.mitre.org/` (vérifié : primaire) (public : ingénierie; juridiction : global)
- **NSA CSI, « MCP: Security Design Considerations »** : les conseils gouvernementaux sur la
  sécurisation du Model Context Protocol qui connecte les agents aux outils.
  `https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4496698/`
  (vérifié : primaire) (public : ingénierie; juridiction : US)
- **« California's SB 53: the first frontier-AI law explained » (FPF)** : la lecture la plus claire
  du SB 53 de Californie (TFAIA), la première loi américaine sur la transparence de l'IA frontière.
  `https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/` (vérifié :
  secondaire) (public : juridique, gouvernance; juridiction : US)
- **New York RAISE Act (Governor's signing announcement)** : la loi de sécurité de l'IA frontière de
  New York (S6953B), signée le 19 décembre 2025 et effective le 1er janvier 2027 après un amendement
  du chapitre en mars 2026, avec un bureau de surveillance au Département des services financiers.
  `https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models`
  (vérifié : primaire) (public : juridique, gouvernance; juridiction : US)
- **NIST AI 800-1, « Managing Misuse Risk for Dual-Use Foundation Models » (second public draft)** :
  les conseils volontaires du NIST/CAISI américain sur l'identification, la mesure et l'atténuation
  du risque d'abus sur le cycle de vie du modèle; toujours un brouillon.
  `https://www.nist.gov/news-events/news/2025/01/updated-guidelines-managing-misuse-risk-dual-use-foundation-models`
  (vérifié : primaire) (public : ingénierie, gouvernance; juridiction : US)
- **NIST ARIA (Assessing Risks and Impacts of AI)** : l'environnement d'évaluation du NIST qui teste
  les risques et impacts du modèle par le test de modèle, le red teaming et le test sur le terrain;
  une référence pour la couche 03. `https://ai-challenges.nist.gov/aria` (vérifié : primaire)
  (public : ingénierie, recherche; juridiction : US)
- **UK AI Security Institute** : l'institut gouvernemental britannique qui évalue les risques d'IA
  avancée et publie le cadre d'évaluation Inspect que ce livre utilise comme référence de couche 03.
  `https://www.aisi.gov.uk/` (vérifié : primaire) (public : ingénierie, recherche; juridiction : UK)
- **US Center for AI Standards and Innovation (CAISI)** : le centre du NIST pour les normes, les
  tests et la sécurité de l'IA, anciennement l'Institut américain de sécurité de l'IA; le point de
  contact du gouvernement américain pour l'industrie. `https://www.nist.gov/caisi` (vérifié :
  primaire) (public : gouvernance, recherche; juridiction : US)
- **Cadre de gouvernance de la sécurité de l'IA 3.0 (TC260, sous la direction de la CAC)** : cadre
  volontaire chinois, PDF bilingue ; l'Appendice 2 est le cadre de gestion des risques de l'IA
  agentique (identité, points de contrôle humains, garde-fous, mémoire, décommissionnement).
  `https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf` (vérifié :
  primaire) (audience : gouvernance, ingénierie ; juridiction : Chine)
- **Mesures provisoires pour l'administration des services d'IA générative** : règle contraignante
  chinoise pour l'IA générative offerte au public au sein de la RPC, en vigueur 2023-08-15 ; texte
  officiel chinois. `https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm` (vérifié : primaire)
  (audience : juridique ; juridiction : Chine)
- **Dispositions sur l'administration de la synthèse profonde dans les services d'information sur Internet**
  : obligations d'étiquetage, de données d'entraînement et de consentement pour la synthèse
  profonde, en vigueur 2023-01-10 ; texte officiel chinois.
  `https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm` (vérifié : primaire) (audience :
  juridique ; juridiction : Chine)
- **Dispositions sur l'administration de la recommandation algorithmique dans les services d'information sur Internet**
  : dépôt d'algorithme, évaluation de la sécurité et droit de refus de l'utilisateur, en vigueur
  2022-03-01 ; texte officiel chinois. `https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm`
  (vérifié : primaire) (audience : juridique ; juridiction : Chine)
- **Mesures d'étiquetage du contenu synthétique généré par l'IA** : étiquettes explicites et
  implicites, en vigueur 2025-09-01 aux côtés de la norme obligatoire GB 45438-2025 ; texte officiel
  chinois. `https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm` (vérifié : primaire) (audience
  : juridique, ingénierie ; juridiction : Chine)
- **Loi fondamentale sur l'IA de la Corée du Sud** : loi-cadre en vigueur 2026-01-22, avec des
  obligations renforcées pour l'IA à fort impact ; le chapitre source 08 la cite déjà.
  `https://www.trade.gov/market-intelligence/south-korea-ai-basic-act` (vérifié : secondaire)
  (audience : juridique, gouvernance ; juridiction : Corée du Sud)
- **Cadre de gouvernance des modèles d'IA pour l'IA générative (IMDA / AI Verify Foundation)** :
  cadre volontaire de Singapour (mai 2024) : essais, transparence, signalement des incidents,
  sécurité et provenance du contenu.
  `https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf`
  (vérifié : primaire) (audience : gouvernance, ingénierie ; juridiction : Singapour)

## Principes et cadres internationaux

- **Recommandation du Conseil de l'OCDE sur l'intelligence artificielle (OCDE/LEGAL/0449)** : les
  Principes de l'IA tels que révisés en 2024, et la source de la définition du système d'IA et du
  cycle de vie que le Règlement de l'IA et la Convention du Conseil de l'Europe suivent.
  `https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449` (vérifié : primaire) (audience
  : gouvernance, leadership, juridique ; juridiction : global)
- **Mémorandum explicatif sur la définition mise à jour de l'OCDE d'un système d'IA** : pourquoi la
  définition de 2023 a changé et comment l'autonomie et l'adaptabilité sont envisagées.
  `https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html`
  (vérifié : primaire) (audience : gouvernance, juridique ; juridiction : global)
- **HUDERIA : évaluation des risques et de l'impact des systèmes d'IA (Conseil de l'Europe)** : la
  méthodologie d'impact sur les droits de l'homme et son modèle de contexte, à réconcilier avec une
  FRIA existante.
  `https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems`
  (vérifié : primaire) (audience : gouvernance, juridique ; juridiction : global)
- **Vers un cadre commun de signalement des incidents d'IA (OCDE, 2025)** : les 29 critères auxquels
  un enregistrement d'incident peut être aligné dans les juridictions ; la base des noms de champs
  d'enregistrement d'incident dans la bibliothèque de modèles.
  `https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf`
  (vérifié : primaire) (audience : gouvernance, ingénierie ; juridiction : global)
- **« Définir les incidents d'IA et les termes connexes » (OCDE.AI)** : le vocabulaire partagé
  d'incident d'IA, d'aléa d'IA et de leurs variantes graves.
  `https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards` (vérifié : primaire) (audience :
  gouvernance, juridique ; juridiction : global)

## Orientations, codes et droit adjacent de l'UE

- **Orientations de la Commission sur la définition d'un système d'IA** : le test opérationnel de
  l'UE pour la portée : les sept éléments, le seuil d'autonomie bas et les familles de logiciels
  exclues.
  `https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application`
  (vérifié : primaire) (audience : juridique, gouvernance, ingénierie ; juridiction : UE)
- **Orientations de la Commission sur la portée des obligations pour les fournisseurs de modèles d'IA à usage général**
  : les critères de calcul pour les modèles GPAI, quand l'ajustement fin ou la modification d'un
  modèle vous en rend le fournisseur, et le test de monétisation open-source.
  `https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act`
  (vérifié : primaire) (audience : juridique, ingénierie ; juridiction : UE)
- **Projet d'orientations de la Commission sur la classification des systèmes d'IA à haut risque** :
  exemples pratiques pour l'art. 6 et le filtre art. 6(3) ; toujours un projet au 2026-09-24.
  `https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems`
  (vérifié : primaire) (audience : juridique, gouvernance ; juridiction : UE)
- **Littératie en matière d'IA : Questions et réponses (Commission européenne)** : la propre lecture
  de la Commission de l'article 4 après l'Omnibus : aucun certificat requis, registres internes, et
  qui compte comme « autres personnes ».
  `https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers` (vérifié : primaire)
  (audience : gouvernance, leadership ; juridiction : UE)
- **Code de pratique sur la transparence du contenu généré par l'IA** : la voie volontaire vers les
  obligations d'étiquetage et de marquage de l'art. 50.
  `https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content` (vérifié :
  primaire) (audience : ingénierie, juridique ; juridiction : UE)
- **Modèle de signalement d'incident grave GPAI (Commission européenne, 4 nov 2025)** : les champs
  qu'un rapport d'incident grave GPAI porte, y compris l'analyse des causes profondes et les modèles
  de quasi-accidents.
  `https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai`
  (vérifié : primaire) (audience : gouvernance, ingénierie ; juridiction : UE)
- **Clauses contractuelles types de l'UE mises à jour pour l'IA (MCC-AI)** : le texte de contrat de
  référence pour l'achat d'IA, en version à haut risque et version légère, avec un commentaire ;
  utilisable au-delà des marchés publics.
  `https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses`
  (vérifié : primaire) (audience : juridique, gouvernance ; juridiction : UE)
- **Avis 28/2024 du CEPD sur certains aspects de la protection des données relatifs au traitement des données à caractère personnel dans le contexte des modèles d'IA**
  : la référence des autorités de protection des données de l'UE sur l'anonymat du modèle, l'intérêt
  légitime pour l'IA et ce que l'entraînement illégal signifie pour les responsables de
  l'implantation.
  `https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en`
  (vérifié : primaire) (audience : juridique, gouvernance ; juridiction : UE)
- **Lignes directrices 05/2021 du CEPD sur l'interaction entre l'article 3 et le chapitre V du RGPD**
  : les trois critères qui décident si un appel d'inférence à distance ou un accès d'assistance est
  un transfert international.
  `https://www.edpb.europa.eu/system/files/documents/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf`
  (vérifié : primaire) (audience : juridique ; juridiction : UE)
- **CNIL, « Assurer et faciliter l'exercice des droits des personnes concernées » (fiche pratique IA)**
  : le texte de régulateur le plus pratique sur les droits contre les modèles entraînés :
  réentraînement, filtres de sortie et leurs limites.
  `https://www.cnil.fr/en/ensuring-and-facilitating-exercise-data-subjects-rights` (vérifié :
  primaire) (audience : juridique, ingénierie ; juridiction : UE, France)
- **CNIL, « S'appuyer sur la base légale de l'intérêt légitime pour développer un système d'IA »** :
  un test d'équilibre étape par étape et les garanties supplémentaires pour l'entraînement de l'IA.
  `https://www.cnil.fr/en/relying-legal-basis-legitimate-interests-develop-ai-system` (vérifié :
  primaire) (audience : juridique ; juridiction : UE, France)
- **Orientations de l'AEPD sur l'IA agentique du point de vue de la protection des données (communiqué de presse)**
  : l'analyse d'un régulateur sur les agents : autonomie, mémoire, menaces et mesures du responsable
  du traitement ; en espagnol.
  `https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/la-agencia-publica-unas-orientaciones-sobre-inteligencia`
  (vérifié : primaire) (audience : juridique, ingénierie ; juridiction : UE, Espagne)
- **Autorité de protection des données de Hambourg, « Document de discussion : les grands modèles de langage et les données à caractère personnel »**
  : le point de vue selon lequel les LLM ne stockent pas de données à caractère personnel ; à lire à
  côté de l'avis du CEPD.
  `https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf`
  (vérifié : primaire) (audience : juridique ; juridiction : UE, Allemagne)
- **Guides AESIA du bac à sable réglementaire espagnol** : seize guides non contraignants avec des
  listes de contrôle pour les exigences de haut risque de l'UE, produits dans un bac à sable
  réglementaire ; en espagnol. `https://aesia.digital.gob.es/es/guias` (vérifié : primaire)
  (audience : gouvernance, ingénierie ; juridiction : UE, Espagne)
- **Directive (UE) 2024/2853 relative à la responsabilité décorrente des produits défectueux** : le
  texte qui rend les logiciels des produits, établit les obligations de divulgation et les
  présomptions, et lie la responsabilité aux mises à jour.
  `https://eur-lex.europa.eu/eli/dir/2024/2853/oj` (vérifié : primaire) (audience : juridique,
  leadership ; juridiction : UE)

## Orientations gouvernementales et de régulateur au-delà de l'UE

- **NIST AI 600-1, Profil d'intelligence artificielle générative** : douze risques que l'IA
  générative crée ou aggrave, avec des actions suggérées alignées sur les sous-catégories AI RMF,
  utilisables comme noms de suite d'évaluation. `https://doi.org/10.6028/NIST.AI.600-1` (vérifié :
  primaire) (audience : gouvernance, ingénierie ; juridiction : US)
- **Carnet de jeu NIST AI RMF** : actions suggérées et questions de documentation par sous-catégorie
  ; les questions de documentation constituent de bons critères d'acceptation pour les contrôles.
  `https://airc.nist.gov/airmf-resources/playbook/govern/` (vérifié : primaire) (audience :
  gouvernance, ingénierie ; juridiction : US)
- **Carnet de jeu NIST AI RMF : MANAGE** : surveillance post-déploiement, risque tiers et
  déactivation, sous-catégorie par sous-catégorie.
  `https://airc.nist.gov/airmf-resources/playbook/manage/` (vérifié : primaire) (audience :
  gouvernance, ingénierie ; juridiction : US)
- **Correspondance : AI RMF (1.0) et ISO/IEC FDIS 23894 (NIST, 2023)** : une carte de deux pages des
  quatre fonctions AI RMF aux clauses ISO/IEC 23894 ; le moyen le plus rapide de voir qu'elles
  décrivent un processus.
  `https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf`
  (vérifié : primaire) (audience : gouvernance ; juridiction : US)
- **NIST SP 1270, « Vers une norme pour identifier et gérer les biais dans l'intelligence artificielle »**
  : la carte la plus courte et faisant autorité d'où vient le biais de l'IA (systémique,
  statistique, humain). `https://doi.org/10.6028/NIST.SP.1270` (vérifié : primaire) (audience :
  ingénierie, gouvernance ; juridiction : US)
- **NIST IR 8312, « Quatre principes de l'intelligence artificielle explicable »** : quatre
  principes, y compris la précision de l'explication et les limites des connaissances, qui se
  traduisent en critères d'évaluation pour les explications. `https://doi.org/10.6028/NIST.IR.8312`
  (vérifié : primaire) (audience : ingénierie, recherche ; juridiction : US)
- **NIST AI 100-2 E2025, « Apprentissage automatique contradictoire : une taxonomie et une terminologie des attaques et des atténuations »**
  : le vocabulaire partagé des attaques sur l'IA prédictive et générative que les plans de test
  d'équipe rouge et les modèles de menace peuvent citer.
  `https://doi.org/10.6028/NIST.AI.100-2e2025` (vérifié : primaire) (audience : ingénierie,
  recherche ; juridiction : US)
- **NIST SP 800-61 Rév. 3, « Recommandations et considérations relatives à la réponse aux incidents pour la gestion des risques de cybersécurité »**
  : réponse aux incidents refondue autour des fonctions CSF 2.0 ; la base que le cycle de vie
  spécifique à l'IA adapte. `https://csrc.nist.gov/pubs/sp/800/61/r3/final` (vérifié : primaire)
  (audience : ingénierie, gouvernance ; juridiction : US)
- **NIST SP 800-226, « Lignes directrices pour l'évaluation des garanties de confidentialité différentielle »**
  : comment évaluer une affirmation de confidentialité différentielle et les aléas qui la brisent
  dans la pratique. `https://csrc.nist.gov/pubs/sp/800/226/final` (vérifié : primaire) (audience :
  ingénierie, juridique ; juridiction : US)
- **Mémorandum OMB M-25-21** : la définition fédérale américaine de l'IA à fort impact, ses
  pratiques minimales et un modèle public pour les fonctions d'un directeur de l'IA et d'un conseil
  de gouvernance de l'IA.
  `https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf`
  (vérifié : primaire) (audience : gouvernance, leadership ; juridiction : US)
- **SR 26-2, Orientations révisées sur la gestion des risques de modèle (Réserve fédérale, OCC, FDIC)**
  : remplace SR 11-7 ; défi efficace et validation, adaptés au profil de risque, avec l'IA
  générative et agentique explicitement exclues du champ d'application.
  `https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm` (vérifié : primaire)
  (audience : gouvernance, juridique ; juridiction : US)
- **Circulaire CFPB 2022-03 : action préjudiciable et algorithmes complexes** : pourquoi la
  complexité du modèle n'excuse pas des raisons d'action préjudiciable inexactes ; retirée par la
  CFPB le 12 mai 2025, tandis que le devoir de Regulation B qu'elle interprétait subsiste.
  `https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/`
  (vérifié : source primaire) (audience : juridique, ingénierie ; juridiction : États-Unis)
- **Bulletin modèle NAIC : Utilisation des systèmes d'intelligence artificielle par les assureurs**
  : un modèle rédigé par un régulateur pour un programme de gouvernance de l'IA dans une industrie
  réglementée, incluant l'IA tierce.
  `https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Adopted_0.pdf`
  (vérifié : source primaire) (audience : gouvernance, juridique ; juridiction : États-Unis)
- **Droit d'auteur et intelligence artificielle (Bureau américain du droit d'auteur)** : la position
  du Bureau sur l'auteur des résultats de l'IA et sur l'entraînement, avec les directives
  d'enregistrement. `https://copyright.gov/ai/` (vérifié : source primaire) (audience : juridique ;
  juridiction : États-Unis)
- **ICO, Guidance on AI and data protection** : la position du Royaume-Uni sur la licéité, les
  déductions, l'équité et les droits individuels dans l'IA ; en révision après la Data (Use and
  Access) Act à partir du 2026-09-24.
  `https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/`
  (vérifié : source primaire) (audience : juridique, gouvernance ; juridiction : Royaume-Uni)
- **ICO et The Alan Turing Institute, « Explaining decisions made with AI »** : six types
  d'explication et une méthode tâche par tâche pour expliquer les décisions de l'IA aux personnes
  concernées ; en révision à partir du 2026-09-24.
  `https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/explaining-decisions-made-with-artificial-intelligence/`
  (vérifié : source primaire) (audience : ingénierie, juridique ; juridiction : Royaume-Uni)
- **General Understanding on AI and Copyright in Japan (Office japonais du droit d'auteur)** : une
  brève interprétation officielle de l'article 30-4 qui montre où s'arrête l'exception
  d'entraînement japonaise. `https://www.bunka.go.jp/english/policy/copyright/pdf/94055801_01.pdf`
  (vérifié : source primaire) (audience : juridique ; juridiction : Japon)
- **Directive sur la prise de décision automatisée (Secrétariat du Conseil du Trésor du Canada)** :
  un régime d'évaluation d'impact mature et publié avec des exigences graduées selon le niveau
  d'impact. `https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592` (vérifié : source primaire)
  (audience : gouvernance, juridique ; juridiction : Canada)
- **Model AI Governance Framework for Agentic AI, v1.5 (IMDA)** : un cadre gouvernemental pour les
  agents organisé selon quatre dimensions pratiques, de la limitation du risque à la responsabilité
  de l'utilisateur final.
  `https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf`
  (vérifié : source primaire) (audience : gouvernance, ingénierie ; juridiction : Singapour)
- **Korea AI Basic Act et décret d'application (Centre d'information juridique coréen)** : le texte
  principal de la loi horizontale sur l'IA non-UE avec le plus de devoirs pour les opérateurs ; le
  décret porte les seuils ; en coréen. `https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543` (vérifié
  : source primaire) (audience : juridique ; juridiction : Corée du Sud)

## Cadres de sécurité de pointe (engagements propres aux laboratoires)

- **Anthropic Responsible Scaling Policy** : le cadre de sécurité de pointe d'Anthropic avec des
  seuils de capacité et des mesures de protection requises ; la page indique la version 3.4,
  effective le 8 juillet 2026. `https://www.anthropic.com/responsible-scaling-policy` (vérifié :
  source primaire) (audience : gouvernance, recherche ; juridiction : mondiale)
- **OpenAI Preparedness Framework** : le cadre d'OpenAI pour suivre et se préparer aux capacités de
  pointe qui pourraient causer des dommages graves ; le document indique la version 2, mise à jour
  le 15 avril 2025.
  `https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf`
  (vérifié : source primaire) (audience : gouvernance, recherche ; juridiction : mondiale)
- **Google DeepMind Frontier Safety Framework** : le cadre de DeepMind avec des niveaux de capacité
  critiques et des mesures d'atténuation ; la page indique la version 3.1, mise à jour le 17
  avril 2026. `https://deepmind.google/discover/blog/strengthening-our-frontier-safety-framework/`
  (vérifié : source primaire) (audience : gouvernance, recherche ; juridiction : mondiale)

## Articles (preuves lisibles par machine et gouvernance des agents)

- **« Making AI Compliance Evidence Machine-Readable » (arXiv 2604.13767)** : étend `OSCAL` pour
  l'IA et soutient que les cadres spécifient *quoi* assurer mais pas de *comment* exécutable.
  `https://arxiv.org/html/2604.13767v1` (vérifié : source primaire) (audience : ingénierie,
  recherche ; juridiction : mondiale)
- **« Audit-as-code » (Frontiers in AI)** : un score de préparation auditée avec des portes
  proceed/remediate/block ; résultat d'audit comme artefact de construction.
  `https://pubmed.ncbi.nlm.nih.gov/41837238/` (vérifié : source primaire) (audience : ingénierie,
  recherche ; juridiction : mondiale)
- **Policy Cards (arXiv 2510.24383)** : artefacts de gouvernance d'exécution lisibles par machine en
  schéma JSON pour les agents. `https://arxiv.org/abs/2510.24383` (vérifié : source primaire)
  (audience : ingénierie, recherche ; juridiction : mondiale)
- **TAIP (arXiv 2603.03340)** : traite les résultats NIST TEVV comme des objets d'assurance de l'IA.
  `https://arxiv.org/abs/2603.03340` (vérifié : source primaire) (audience : ingénierie, recherche ;
  juridiction : mondiale)
- **AI Trust OS (arXiv 2604.04749)** : un cadre de système d'exploitation pour la confiance et
  l'assurance continues de l'IA. `https://arxiv.org/abs/2604.04749` (vérifié : source primaire)
  (audience : ingénierie, recherche ; juridiction : mondiale)
- **AAGATE (arXiv 2510.25863)** : une conception de plateforme de gouvernance des agents alignée sur
  NIST AI RMF. `https://arxiv.org/abs/2510.25863` (vérifié : source primaire) (audience :
  ingénierie, recherche ; juridiction : mondiale)
- **« Toward Trustworthy AI Development: Mechanisms for Supporting Verifiable Claims » (Brundage et al., 2020)**
  : mécanismes institutionnels, logiciels et matériels qui transforment l'affirmation d'un
  développeur en quelque chose qu'un tiers peut vérifier ; l'argument en faveur de la preuve plutôt
  que de l'assertion. `https://arxiv.org/abs/2004.07213` (vérifié : source primaire) (audience :
  gouvernance, recherche ; juridiction : mondiale)
- **« Practices for Governing Agentic AI Systems » (Shavit et al., OpenAI, 2023)** : une définition
  des systèmes d'agents, les parties dans leur cycle de vie et les pratiques de base telles que la
  limitation de l'espace d'action, la lisibilité de l'activité et la capacité à interrompre.
  `https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf` (vérifié : source
  primaire) (audience : ingénierie, gouvernance ; juridiction : mondiale)
- **« Visibility into AI Agents » (Chan et al., 2024)** : identifiants d'agents, surveillance en
  temps réel et journalisation des activités comme les trois mesures qui rendent les agents déployés
  visibles. `https://arxiv.org/abs/2401.13138` (vérifié : source primaire) (audience : ingénierie,
  gouvernance ; juridiction : mondiale)

## Articles canoniques : documentation, audit et responsabilité

- **« Datasheets for Datasets » (Gebru et al.)** : l'origine de la documentation structurée des
  ensembles de données ; la moitié lisible par l'homme d'un enregistrement d'admission d'ensemble de
  données. `https://arxiv.org/abs/1803.09010` (vérifié : source primaire) (audience : ingénierie,
  recherche ; juridiction : mondiale)
- **« Model Cards for Model Reporting » (Mitchell et al., 2018)** : utilisation prévue et évaluation
  entre groupes et conditions, rapportées à côté du modèle ; le modèle derrière chaque fiche de
  modèle depuis. `https://arxiv.org/abs/1810.03993` (vérifié : source primaire) (audience :
  ingénierie, gouvernance ; juridiction : mondiale)
- **« Closing the AI Accountability Gap: Defining an End-to-End Framework for Internal Algorithmic Auditing » (Raji et al., 2020)**
  : un audit interne mené parallèlement au développement, étape par étape, avec un artefact
  documenté à chaque étape. `https://arxiv.org/abs/2001.00973` (vérifié : source primaire) (audience
  : gouvernance, ingénierie ; juridiction : mondiale)
- **« Actionable Auditing » (Raji et Buolamwini, 2019)** : ce qui s'est passé après avoir nommé
  publiquement les lacunes de performance des systèmes commerciaux ; preuve que les audits externes
  font bouger les fournisseurs. `https://doi.org/10.1145/3306618.3314244` (vérifié : source
  primaire) (audience : gouvernance, recherche ; juridiction : mondiale)
- **« Auditing large language models: a three-layered approach » (Mökander et al., 2023)** : audits
  de gouvernance, de modèle et d'application comme trois couches complémentaires.
  `https://arxiv.org/abs/2302.08500` (vérifié : source primaire) (audience : gouvernance, recherche
  ; juridiction : mondiale)
- **« The Gradient of Generative AI Release » (Irene Solaiman, 2023)** : un vocabulaire pour les
  décisions de publication, du complètement fermé au complètement ouvert.
  `https://arxiv.org/abs/2302.04844` (vérifié : source primaire) (audience : gouvernance, leadership
  ; juridiction : mondiale)
- **« How the machine 'thinks': Understanding opacity in machine learning algorithms » (Burrell, 2016)**
  : trois sources d'opacité, chacune nécessitant une correction différente.
  `https://doi.org/10.1177/2053951715622512` (vérifié : source primaire) (audience : gouvernance,
  recherche ; juridiction : mondiale)
- **« Fairness and Abstraction in Sociotechnical Systems » (Selbst et al., 2019)** : cinq pièges
  dans lesquels tombe une intervention technique d'équité lorsqu'elle abstrait le contexte social.
  `https://doi.org/10.1145/3287560.3287598` (vérifié : source primaire) (audience : ingénierie,
  recherche ; juridiction : mondiale)
- **« On the Dangers of Stochastic Parrots » (Bender, Gebru et al., 2021)** : les coûts et risques
  des modèles de langage toujours plus grands, des données d'entraînement non documentées au coût
  environnemental. `https://doi.org/10.1145/3442188.3445922` (vérifié : source primaire) (audience :
  recherche, leadership ; juridiction : mondiale)
- **« Ethical and social risks of harm from Language Models » (Weidinger et al., 2021)** : une
  taxonomie structurée des dommages des modèles de langage, une liste de départ prête pour un
  registre des risques. `https://arxiv.org/abs/2112.04359` (vérifié : source primaire) (audience :
  gouvernance, recherche ; juridiction : mondiale)
- **« Concrete Problems in AI Safety » (Amodei et al., 2016)** : cinq modes de défaillance pratiques
  (effets secondaires, piratage de récompense, surveillance, exploration sûre, décalage
  distributionnel) énoncés comme des problèmes d'ingénierie. `https://arxiv.org/abs/1606.06565`
  (vérifié : source primaire) (audience : ingénierie, recherche ; juridiction : mondiale)

## Articles canoniques : mesure, équité et évaluation

- **« Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification » (Buolamwini et Gebru, 2018)**
  : l'audit qui a rendu l'évaluation désagrégée et intersectionnelle la norme.
  `https://proceedings.mlr.press/v81/buolamwini18a.html` (vérifié : source primaire) (audience :
  ingénierie, recherche ; juridiction : mondiale)
- **« Dissecting racial bias in an algorithm used to manage the health of populations » (Obermeyer et al., Science, 2019)**
  : l'échec canonique du label proxy : un modèle exact sur le coût et biaisé sur le besoin ; la
  raison pour laquelle une fiche de modèle doit énoncer la construction.
  `https://doi.org/10.1126/science.aax2342` (vérifié : source primaire) (audience : ingénierie,
  gouvernance ; juridiction : États-Unis)
- **« Racial disparities in automated speech recognition » (Koenecke et al., PNAS, 2020)** :
  pourquoi une moyenne cache un service pire pour un groupe ; l'argument en faveur des évaluations
  désagrégées. `https://doi.org/10.1073/pnas.1915768117` (vérifié : source primaire) (audience :
  ingénierie, recherche ; juridiction : États-Unis)
- **« Inherent Trade-Offs in the Fair Determination of Risk Scores » (Kleinberg, Mullainathan et Raghavan)**
  : le résultat d'impossibilité qui fait du choix de la métrique d'équité une décision de
  gouvernance plutôt qu'une décision technique. `https://arxiv.org/abs/1609.05807` (vérifié : source
  primaire) (audience : gouvernance, recherche ; juridiction : mondiale)
- **« Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead » (Rudin)**
  : le cas pour les modèles interprétables par conception dans les décisions à enjeux élevés.
  `https://arxiv.org/abs/1811.10154` (vérifié : source primaire) (audience : ingénierie, gouvernance
  ; juridiction : mondiale)
- **« The Mythos of Model Interpretability » (Lipton, 2016)** : pourquoi « interprétable » désigne
  plusieurs propriétés différentes, et laquelle une exigence devrait demander.
  `https://arxiv.org/abs/1606.03490` (vérifié : source primaire) (audience : ingénierie, recherche ;
  juridiction : mondiale)
- **« On Calibration of Modern Neural Networks » (Guo et al., 2017)** : pourquoi un score de modèle
  n'est pas une probabilité tant que l'étalonnage n'est pas mesuré.
  `https://arxiv.org/abs/1706.04599` (vérifié : primaire) (audience : ingénierie, recherche ;
  juridiction : mondiale)
- **« A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification » (Angelopoulos and Bates)**
  : une méthode pratique et sans hypothèse de distribution pour transformer les scores en ensembles
  avec une garantie de couverture. `https://arxiv.org/abs/2107.07511` (vérifié : primaire) (audience
  : ingénierie, recherche ; juridiction : mondiale)
- **« What's Wrong with Risk Matrices? » (L. A. Cox Jr., Risk Analysis, 2008)** : la critique
  standard des matrices probabilité-par-gravité et pourquoi une trajectoire catastrophique est
  nécessaire. `https://doi.org/10.1111/j.1539-6924.2008.01030.x` (vérifié : primaire) (audience :
  gouvernance, recherche ; juridiction : mondiale)
- **« Adding Error Bars to Evals » (Evan Miller, 2024)** : les évaluations traitées comme des
  expériences : erreurs types, comparaison de modèles et planification de la taille d'échantillon
  pour les eval gates. `https://arxiv.org/abs/2411.00640` (vérifié : primaire) (audience :
  ingénierie, recherche ; juridiction : mondiale)
- **« Holistic Evaluation of Language Models » (Liang et al., 2022)** : de nombreuses métriques sur
  de nombreux scénarios, rapportées ensemble, au lieu d'un seul nombre de classement.
  `https://arxiv.org/abs/2211.09110` (vérifié : primaire) (audience : ingénierie, recherche ;
  juridiction : mondiale)
- **« Model evaluation for extreme risks » (Shevlane et al., 2023)** : les évaluations de capacités
  dangereuses et d'alignement comme entrées aux décisions d'entraînement, de déploiement et de
  sécurité. `https://arxiv.org/abs/2305.15324` (vérifié : primaire) (audience : gouvernance,
  recherche ; juridiction : mondiale)
- **« Red Teaming Language Models with Language Models » (Perez et al., 2022)** : red teaming
  automatisé, un modèle générant des cas de test pour un autre. `https://arxiv.org/abs/2202.03286`
  (vérifié : primaire) (audience : ingénierie, recherche ; juridiction : mondiale)
- **« Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection » (Greshake et al., 2023)**
  : l'article qui a nommé l'injection de prompts indirecte, la menace centrale pour les agents qui
  lisent du contenu non fiable. `https://arxiv.org/abs/2302.12173` (vérifié : primaire) (audience :
  ingénierie, recherche ; juridiction : mondiale)
- **« Extracting Training Data from Large Language Models » (Carlini et al.)** : la démonstration
  canonique que les modèles de langage régurgitent les données d'entraînement, et pourquoi les
  évaluations d'extraction doivent figurer dans la gate. `https://arxiv.org/abs/2012.07805` (vérifié
  : primaire) (audience : ingénierie, juridique ; juridiction : mondiale)
- **« Power Hungry Processing: Watts Driving the Cost of AI Deployment? » (Luccioni, Jernite, Strubell)**
  : mesure l'écart énergétique d'inférence entre les modèles génératifs à usage général et les
  modèles spécifiques à une tâche. `https://arxiv.org/abs/2311.16863` (vérifié : primaire) (audience
  : ingénierie, leadership ; juridiction : mondiale)
- **« The Leaderboard Illusion » (Singh et al., 2025)** : pourquoi un classement public ne peut pas
  décider d'un choix de modèle. `https://arxiv.org/abs/2504.20879` (vérifié : primaire) (audience :
  ingénierie, leadership ; juridiction : mondiale)
- **« Hidden Technical Debt in Machine Learning Systems » (Sculley et al., NeurIPS 2015)** :
  pourquoi le modèle est la petite boîte dans un système ML en production, et où la dette s'accumule
  autour de lui.
  `https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html`
  (vérifié : primaire) (audience : ingénierie ; juridiction : mondiale)

## Rapports (le marché et la profession)

- **IAPP AI Governance Profession Report 2025 (with Credo AI)** : où la fonction se situe et comment
  elle est dotée en personnel ; le recensement de base de la profession.
  `https://iapp.org/resources/article/ai-governance-profession-report/` (vérifié : primaire)
  (audience : leadership, gouvernance ; juridiction : mondiale)
- **IAPP Salary & Jobs Report 2025-26** : les fourchettes de salaires qui ancrent le chapitre 06, y
  compris la prime de gouvernance technique de l'IA.
  `https://iapp.org/resources/article/salary-survey-summary/` (vérifié : primaire) (audience :
  leadership, gouvernance ; juridiction : mondiale)
- **IAPP AI Governance Vendor Report 2026** : les quatre catégories de fournisseurs et l'affirmation
  que la gouvernance de l'IA « n'est pas une fonction, discipline ou technologie unique ».
  `https://iapp.org/resources/article/ai-governance-vendor-report` (vérifié : primaire) (audience :
  gouvernance, leadership ; juridiction : mondiale)
- **State of GRC 2026** : l'enquête auprès des praticiens derrière la réalité que « le tableur est
  toujours l'outil GRC n°1 » contre laquelle la discipline réagit. `https://grcengineer.com/report/`
  (vérifié : primaire) (audience : gouvernance ; juridiction : mondiale)
- **« Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms » (Gartner)** :
  le propre cadrage de l'analyste de la catégorie de plateforme, y compris l'application de
  politiques à l'exécution, et sa prévision de dépenses.
  `https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms`
  (vérifié : primaire) (audience : leadership ; juridiction : mondiale)
- **Gartner Magic Quadrant for AI Governance Platforms, June 2026 (via IBM)** : le compte rendu d'un
  fournisseur nommé du premier MQ pour la catégorie ; le rapport lui-même est sous licence, lisez
  ceci comme un résumé du fournisseur.
  `https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms`
  (vérifié : secondaire) (audience : leadership ; juridiction : mondiale)
- **HiddenLayer 2026 AI Threat Landscape Report** : l'enquête d'un fournisseur de sécurité et la
  source de la conclusion « une violation sur huit était agentique » ; lisez-la comme une enquête de
  fournisseur. `https://www.hiddenlayer.com/report-and-guide/threatreport2026` (vérifié : primaire)
  (audience : ingénierie, leadership ; juridiction : mondiale)
- **International AI Safety Report 2026** : la deuxième édition (3 février 2026) de l'évaluation
  scientifique des capacités, risques et gestion des risques de l'IA à usage général, présidée par
  Yoshua Bengio et soutenue par plus de 30 pays et organisations internationales.
  `https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026` (vérifié
  : primaire) (audience : leadership, recherche, gouvernance ; juridiction : mondiale)
- **The 2026 AI Index Report (Stanford HAI)** : l'enregistrement annuel des données sur l'IA dans la
  recherche, les performances techniques, l'IA responsable, l'économie, la politique et l'opinion
  publique ; l'endroit où vérifier une tendance avant de la citer.
  `https://hai.stanford.edu/ai-index/2026-ai-index-report` (vérifié : primaire) (audience :
  leadership, recherche ; juridiction : mondiale)

## Dépôts d'incidents et de risques (le registre empirique)

- **AI Incident Database** : le catalogue du Responsible AI Collaborative des préjudices et
  quasi-préjudices causés par l'IA dans le monde réel ; un corpus de référence pour la modélisation
  des menaces et l'acompagnement pós-commercialisation. `https://incidentdatabase.ai/` (vérifié :
  primaire) (audience : gouvernance, ingénierie, recherche ; juridiction : mondiale)
- **AIAAIC Repository** : un registre indépendant et ouvert des incidents et controverses liés à
  l'IA, aux algorithmes et à l'automatisation dans tous les secteurs.
  `https://www.aiaaic.org/aiaaic-repository` (vérifié : primaire) (audience : gouvernance, recherche
  ; juridiction : mondiale)
- **OECD.AI Incidents & Hazards Monitor (AIM)** : le moniteur en direct de l'OCDE des incidents et
  dangers liés à l'IA tirés des médias mondiaux, conçu pour éclairer la politique.
  `https://oecd.ai/en/incidents` (vérifié : primaire) (audience : gouvernance, leadership ;
  juridiction : mondiale)
- **AI Vulnerability Database (AVID)** : la base de connaissances ouverte de l'AI Risk and
  Vulnerability Alliance des modes de défaillance des systèmes d'IA à usage général.
  `https://avidml.org/` (vérifié : primaire) (audience : ingénierie, recherche ; juridiction :
  mondiale)
- **MIT AI Risk Repository** : la base de données vivante du MIT FutureTech de plus de 1 700 risques
  liés à l'IA classés selon 65 cadres ; une taxonomie pour l'admission et les niveaux de risque.
  `https://airisk.mit.edu/` (vérifié : primaire) (audience : gouvernance, recherche ; juridiction :
  mondiale)
- **NJCM et al. v. The State of the Netherlands (SyRI), The Hague District Court, 5 Feb 2020** : un
  tribunal annulant un système de notation des risques parce qu'il n'était pas suffisamment
  transparent et vérifiable pour être pesé.
  `https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBDHA:2020:1878` (vérifié : primaire)
  (audience : juridique, gouvernance ; juridiction : UE, Pays-Bas)
- **« Xenophobic machines » (Amnesty International, 2021)** : le compte rendu public le plus complet
  de la façon dont un indicateur de nationalité est entré dans le système de risque des allocations
  de garde d'enfants néerlandais. `https://www.amnesty.org/en/documents/eur35/4686/2021/en/`
  (vérifié : primaire) (audience : gouvernance, juridique ; juridiction : UE, Pays-Bas)

## Pratique d'ingénierie et d'assurance

- **The IIA's Three Lines Model (2020)** : la division entre l'organe directeur, les première et
  deuxième lignes de la direction et l'audit interne indépendant, que tout programme de gouvernance
  de l'IA doit mapper, y compris qui accepte le risque résiduel.
  `https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/`
  (vérifié : primaire) (audience : gouvernance, leadership ; juridiction : mondiale)
- **« Postmortem Culture: Learning from Failure » (Google SRE book)** : le texte de référence pour
  les post-mortems sans culpabilité et pour fixer les déclencheurs de post-mortem à l'avance, que
  les examens d'incidents et de quasi-incidents d'IA devraient emprunter.
  `https://sre.google/sre-book/postmortem-culture/` (vérifié : primaire) (audience : ingénierie,
  gouvernance ; juridiction : mondiale)
- **« Canarying Releases » (The Site Reliability Workbook, Google)** : la base d'ingénierie pour la
  livraison progressive en tant que contrôle de gouvernance.
  `https://sre.google/workbook/canarying-releases/` (vérifié : primaire) (audience : ingénierie ;
  juridiction : mondiale)
- **Fairlearn user guide, « Fairness in machine learning »** : une introduction pratique aux
  préjudices d'allocation et de qualité de service et aux métriques de disparité, avec des exemples
  exécutables. `https://fairlearn.org/main/user_guide/fairness_in_machine_learning.html` (vérifié :
  primaire) (audience : ingénierie ; juridiction : mondiale)
- **« Responsible Sourcing of Data Enrichment Services » (Partnership on AI)** : des conseils
  pratiques sur les conditions des annotateurs (pilotes, instructions, rémunération, communication,
  assurance qualité), le côté travail de la gouvernance des données.
  `https://partnershiponai.org/paper/responsible-sourcing-considerations/` (vérifié : primaire)
  (audience : gouvernance, leadership ; juridiction : mondiale)
- **JSON Schema Draft 2020-12** : la spécification dans laquelle la bibliothèque de modèles est
  écrite ; tout validateur conforme vérifie les enregistrements.
  `https://json-schema.org/draft/2020-12` (vérifié : primaire) (audience : ingénierie ; juridiction
  : mondiale)

## Outils (catégories illustratives, pas des approbations)

- **Inspect AI (UK AI Security Institute)** : un cadre d'évaluation ouvert, l'exemple de référence
  pour les évaluations comme preuves et les eval gates.
  `https://github.com/UKGovernmentBEIS/inspect_ai` (vérifié : primaire) (audience : ingénierie ;
  juridiction : mondiale)
- **Awesome Responsible AI (AthenaCore)** : un index large et maintenu de ressources en matière d'IA
  responsable, digne de confiance et centrée sur l'humain couvrant chaque couche du stack.
  `https://github.com/AthenaCore/AwesomeResponsibleAI` (vérifié : primaire) (audience : ingénierie,
  gouvernance ; juridiction : mondiale)
- **Awesome Production Machine Learning (EthicalML)** : l'index de référence des bibliothèques open
  source pour déployer, surveiller, versionner et mettre à l'échelle le ML ; la carte des outils
  pour les couches 02 et 04. `https://github.com/EthicalML/awesome-production-machine-learning`
  (vérifié : primaire) (audience : ingénierie ; juridiction : mondiale)
- **awesome-opa (Open Policy Agent)** : l'index propre de l'écosystème OPA des outils de politique
  en tant que code et des intégrations pour la couche 01.
  `https://github.com/open-policy-agent/awesome-opa` (vérifié : primaire) (audience : ingénierie ;
  juridiction : mondiale)
- **Awesome OSCAL (OSCAL Club)** : un index curé des outils et ressources OSCAL pour la preuves
  lisibles par machine de la couche 05. `https://github.com/oscal-club/awesome-oscal` (vérifié :
  primaire) (audience : ingénierie, gouvernance ; juridiction : mondiale)
- **awesome-ml-security (Trail of Bits)** : un index curé des ressources de sécurité du machine
  learning alimentant le red teaming de la couche 03 et les contrôles d'exécution de la couche 04.
  `https://github.com/trailofbits/awesome-ml-security` (vérifié : primaire) (audience : ingénierie ;
  juridiction : mondiale)

## Livres

- **Fairness and Machine Learning: Limitations and Opportunities (Barocas, Hardt and Narayanan; MIT Press, 2023)**
  : le texte de référence sur ce que les critères d'équité peuvent et ne peuvent pas dire ; lisible
  en intégralité en ligne. `https://fairmlbook.org/` (vérifié : source primaire) (audience :
  ingénierie, recherche ; juridiction : mondiale)
- **Interpretable Machine Learning (Christoph Molnar)** : un guide pratique des modèles
  interprétables et des méthodes d'explication post-hoc, avec leurs limites ; lisible en intégralité
  en ligne. `https://christophm.github.io/interpretable-ml-book/` (vérifié : source primaire)
  (audience : ingénierie ; juridiction : mondiale)
- **Patterns, Predictions, and Actions (Hardt and Recht; Princeton University Press)** :
  l'apprentissage automatique de la prédiction à l'action, y compris les ensembles de données et les
  benchmarks sur lesquels le domaine s'appuie ; une préversion complète est en ligne.
  `https://mlstory.org/` (vérifié : source primaire) (audience : ingénierie, recherche ; juridiction
  : mondiale)
- **Introduction to AI Safety, Ethics and Society (Dan Hendrycks; Taylor & Francis, 2024)** : un
  manuel large sur les risques de l'IA, des défaillances de systèmes uniques à la gouvernance ;
  lisible en ligne. `https://www.aisafetybook.com/` (vérifié : source primaire) (audience :
  gouvernance, leadership, recherche ; juridiction : mondiale)
- **The Algorithmic Foundations of Differential Privacy (Dwork and Roth, 2014)** : la référence
  formelle derrière chaque affirmation de confidentialité différentielle qu'un fournisseur fait.
  `https://www.cis.upenn.edu/~aaroth/Papers/privacybook.pdf` (vérifié : source primaire) (audience :
  ingénierie, recherche ; juridiction : mondiale)
- **Site Reliability Engineering (Google)** : la discipline opérationnelle dont les contrôles
  d'exécution, la réponse aux incidents et les budgets d'erreur s'inspirent ; lisible en intégralité
  en ligne. `https://sre.google/sre-book/table-of-contents/` (vérifié : source primaire) (audience :
  ingénierie ; juridiction : mondiale)
- **Designing Machine Learning Systems (Chip Huyen; O'Reilly, 2022)** : le cycle de vie en
  production des systèmes ML, des données à la surveillance ; lié ici par le dépôt compagnon de
  l'auteur. `https://github.com/chiphuyen/dmls-book` (vérifié : source primaire) (audience :
  ingénierie ; juridiction : mondiale)
- **AI Engineering (Chip Huyen, 2025)** : la construction d'applications sur des modèles
  fondamentaux, avec un long traitement de l'évaluation ; lié ici par le dépôt compagnon de
  l'auteur. `https://github.com/chiphuyen/aie-book` (vérifié : source primaire) (audience :
  ingénierie ; juridiction : mondiale)
- **Responsible AI: Best Practices for Creating Trustworthy AI Systems (Lu, Zhu, Whittle and Xu; Addison-Wesley, 2023)**
  : le traitement en longueur de l'équipe CSIRO des motifs d'IA responsable et des mécanismes de
  gouvernance.
  `https://www.informit.com/store/responsible-ai-best-practices-for-creating-trustworthy-9780138073923`
  (vérifié : source primaire) (audience : ingénierie, gouvernance ; juridiction : mondiale)

## Cours

- **Elements of AI (University of Helsinki and MinnaLearn)** : des cours en ligne gratuits qui
  introduisent l'IA aux non-experts ; une façon de commencer le programme de maîtrise de l'IA que
  l'article 4 demande. `https://www.elementsofai.com/` (vérifié : source primaire) (audience :
  leadership, gouvernance ; juridiction : mondiale)
- **Practical Data Ethics (fast.ai)** : un cours d'abord enseigné au Data Institute de l'Université
  de San Francisco en 2020, sur la désinformation, les biais et l'équité, la confidentialité et la
  surveillance, et les métriques. `https://ethics.fast.ai/` (vérifié : source primaire) (audience :
  ingénierie, gouvernance ; juridiction : mondiale)
- **Made With ML (Goku Mohandas)** : un cours sur la conception, le développement, le déploiement et
  l'itération en production de ML, le pipeline dans lequel s'insèrent les portes de gouvernance.
  `https://madewithml.com/` (vérifié : source primaire) (audience : ingénierie ; juridiction :
  mondiale)
- **Frontier AI Governance (BlueDot Impact)** : un cours en cohorte sur la politique et la
  gouvernance de l'IA de pointe. `https://bluedot.org/courses/ai-governance` (vérifié : source
  primaire) (audience : gouvernance, leadership ; juridiction : mondiale)
- **AI Safety, Ethics and Society virtual course (Center for AI Safety)** : le cours qui suit le
  manuel Hendrycks ci-dessus. `https://www.aisafetybook.com/virtual-course` (vérifié : source
  primaire) (audience : gouvernance, recherche ; juridiction : mondiale)
- **Red Teaming LLM Applications (DeepLearning.AI, with Giskard)** : un court cours pratique sur la
  détection et la programmation des défaillances d'applications LLM.
  `https://www.deeplearning.ai/courses/red-teaming-llm-applications` (vérifié : source primaire)
  (audience : ingénierie ; juridiction : mondiale)
- **Secure AI/ML-Driven Software Development, LFEL1012 (Linux Foundation)** : un court cours à votre
  rythme sur la sécurité des logiciels construits avec et autour de l'IA.
  `https://training.linuxfoundation.org/express-learning/secure-ai-ml-driven-software-development-lfel1012/`
  (vérifié : source primaire) (audience : ingénierie ; juridiction : mondiale)
- **Machine Learning Crash Course: Fairness (Google for Developers)** : un court module sur les
  types de biais et sur l'identification, l'atténuation et l'évaluation des biais.
  `https://developers.google.com/machine-learning/crash-course/fairness` (vérifié : source primaire)
  (audience : ingénierie ; juridiction : mondiale)

## Communautés et infolettres

- **GRC Engineer (grcengineer.com)** : le hub de la communauté mère ; le cadrage
  analyste-vs-ingénieur et les définitions de rôles que ce livre adapte. `https://grcengineer.com/`
  (vérifié : source primaire) (audience : gouvernance, ingénierie ; juridiction : mondiale)
- **blog.grc.engineering, « GRC Engineering in 2026 » (Justin Pagano)** : la perspective prospective
  : les garde-fous politique-comme-code en CI/CD, les centres d'opérations de confiance, les
  extensions agentiques. `https://blog.grc.engineering/p/grc-engineering-in-2026` (vérifié : source
  primaire) (audience : gouvernance, ingénierie ; juridiction : mondiale)
- **IAPP (iapp.org)** : l'organisme professionnel dont les rapports, les certifications et les
  événements cartographient la profession de gouvernance de l'IA. `https://iapp.org/` (vérifié :
  source primaire) (audience : gouvernance, droit, leadership ; juridiction : mondiale)

**Correspondances :** ce chapitre ne formule aucune affirmation normative ; les normes et les cadres
qu'il énumère sont traités en détail dans les chapitres 04, 05, 07 et 08. Les correspondances
ailleurs dans le livre sont illustratives, non une affirmation de conformité.

## Sources

The reading list is its own source set: each entry above carries its URL and a verification tag
inline, and every URL is recorded as a row in this chapter's section of `sources/SOURCES.md`. Items
whose URL could not be drawn from the research digest or verified for this edition were left out.
The v0.5.0 additions were checked on 2026-09-24: each URL answered, arXiv entries were matched
against the arXiv API and DOIs against Crossref.
