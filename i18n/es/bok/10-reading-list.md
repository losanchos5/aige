---
lang: es
source: bok/10-reading-list.md
sourceHash: "4a49b156ff700e2877fb34618240a82581dbb1f121375b5415dff77b871b93f5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 10. Lista de lectura

> Las fuentes que formaron la disciplina, curadas y anotadas, cada una con una URL verificada y una
> nota de una línea sobre por qué importa.

Esta es una bibliografía de trabajo, no un canon. Las entradas se agrupan por tema y se anotan en
una línea. Las URLs se dan en línea con una etiqueta de verificación (`primary`, `secondary`,
`reported`) para que el capítulo sea autodocumentado; cada URL se extrae del resumen de
investigación del libro o se verifica para esta edición. Las herramientas se nombran como ejemplos
de categoría, ilustrativos y no como respaldos.

Cada entrada también lleva dos etiquetas: la **audiencia** a la que sirve mejor (`engineering`,
`governance`, `legal`, `leadership`, `research`) y la **jurisdicción** a la que se refiere (`global`
cuando no está vinculada a un orden legal). Las etiquetas son una ayuda de lectura, no una
clasificación. La misma lista, filtrable por ambas etiquetas, está en la página de recursos del
sitio. No se incluye ninguna guía de estudio comercial para ninguna certificación.

## Textos fundamentales (la forma y el método)

- **GRC Engineering Manifesto**: la declaración fundacional de la disciplina madre; el modelo
  estructural y filosófico para este libro. `https://grc.engineering/` (verificado: primario)
  (audiencia: gobernanza, ingeniería; jurisdicción: global)
- **"What is GRC Engineering" (Ayoub Fandi)**: la definición más clara del método padre y la fuente
  de la prueba "un panel de control verde sobre un control roto es teatro".
  `https://grcengineer.com/what-is-grc-engineering/` (verificado: primario) (audiencia: gobernanza,
  ingeniería; jurisdicción: global)
- **The Agile Manifesto**: la forma de valores y principios numerados y el modelo de signatarios que
  este libro toma prestado. `https://agilemanifesto.org/` (verificado: primario) (audiencia:
  ingeniería, liderazgo; jurisdicción: global)
- **The Twelve-Factor App**: la plantilla para un cuerpo de práctica numerado y orientado al
  profesional con un marco "quién debería leer esto". `https://12factor.net/` (verificado: primario)
  (audiencia: ingeniería; jurisdicción: global)
- **CSIRO Responsible AI Pattern Catalogue**: la plantilla de patrón (capítulo 05) y prueba de que
  la práctica de IA responsable puede escribirse como patrones reutilizables.
  `https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/` (verificado:
  primario) (audiencia: ingeniería, investigación; jurisdicción: global)
- **privacypatterns.org**: el precedente para traducir un principio legal (privacidad por diseño) en
  patrones de ingeniería bajo CC BY. `https://privacypatterns.org/` (verificado: primario)
  (audiencia: ingeniería, legal; jurisdicción: global)

## Regulación y normas

- **Reglamento de IA de la UE, texto consolidado (EUR-Lex)**: Reglamento (UE) 2024/1689 modificado
  por el Omnibus Digital (Reglamento (UE) 2026/1744), consolidado el 27 de julio de 2026; la fuente
  de obligación primaria para el capítulo 08.
  `https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng` (verificado: primario) (audiencia:
  legal, gobernanza, ingeniería; jurisdicción: UE)
- **Omnibus Digital sobre IA, Reglamento (UE) 2026/1744 (EUR-Lex)**: el acto modificador publicado
  en el Diario Oficial el 24 de julio de 2026, con las nuevas fechas y los nuevos Artículos 4a y
  75a-75d. `https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng` (verificado: primario) (audiencia:
  legal, gobernanza; jurisdicción: UE)
- **AI Act Explorer (Future of Life Institute)**: una lectura navegable, artículo por artículo, del
  Reglamento y los cambios del Omnibus; comentario y navegación, no el texto legal.
  `https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/` (verificado: secundario)
  (audiencia: legal, gobernanza, ingeniería; jurisdicción: UE)
- **GPAI Code of Practice**: el código voluntario de la Comisión para IA de uso general, incluido el
  capítulo de seguridad cuyos signatarios se comprometen a evaluaciones de modelos.
  `https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai` (verificado: primario)
  (audiencia: legal, ingeniería; jurisdicción: UE)
- **Normalización del Reglamento de IA (Comisión Europea)**: la página de estado de la Comisión para
  las normas armonizadas que otorgarían una presunción de conformidad; a partir del 2026-09-24,
  ninguna está citada en el DO.
  `https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation` (verificado: primario)
  (audiencia: gobernanza, legal; jurisdicción: UE)
- **"ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity"**: la
  relación clave entre la norma AIMS (y 42005/42006) y el Reglamento.
  `https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/`
  (verificado: secundario) (audiencia: gobernanza, legal; jurisdicción: UE)
- **JTC 21 harmonised-standards tracker**: un rastreador mantenido por proveedores de la etapa que
  ha alcanzado cada entregable de JTC 21; útil para fechas, leído contra la página de la Comisión
  anterior. `https://kla.digital/blog/jtc-21-standards-tracker` (verificado: secundario) (audiencia:
  gobernanza; jurisdicción: UE)
- **NIST AI Risk Management Framework 1.0**: las funciones Govern/Map/Measure/Manage utilizadas como
  objetivo de mapeo en todo el documento. `https://www.nist.gov/itl/ai-risk-management-framework`
  (verificado: primario) (audiencia: gobernanza, ingeniería; jurisdicción: US)
- **NIST NCCoE, "Software and AI Agent Identity and Authorization" (concept paper)**: la referencia
  emergente para identidad no humana, la precondición de la gobernanza de agentes.
  `https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents`
  (verificado: primario) (audiencia: ingeniería; jurisdicción: US)
- **NIST CAISI AI Agent Standards Initiative**: el esfuerzo para hacer que la interoperabilidad y
  seguridad de agentes sea estándar, no por proveedor.
  `https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure`
  (verificado: primario) (audiencia: ingeniería, gobernanza; jurisdicción: US)
- **OWASP GenAI Security Project**: la sede del Top 10 para Aplicaciones LLM, el Top 10 para
  Aplicaciones Agénticas, el proyecto AIBOM y la Evaluación de Madurez de IA.
  `https://genai.owasp.org/` (verificado: primario) (audiencia: ingeniería; jurisdicción: global)
- **CSA AI Controls Matrix and STAR for AI**: el marco de control y programa de aseguramiento
  mapeados a ISO 42001 y NIST AI RMF (capítulos 07-08). `https://cloudsecurityalliance.org/star/ai`
  (verificado: primario) (audiencia: gobernanza, ingeniería; jurisdicción: global)
- **MITRE ATLAS**: la base de conocimiento de tácticas y técnicas adversariales para IA, incluidas
  técnicas de agentes, en la que se basan los modelos de amenaza. `https://atlas.mitre.org/`
  (verificado: primario) (audiencia: ingeniería; jurisdicción: global)
- **NSA CSI, "MCP: Security Design Considerations"**: orientación gubernamental sobre la seguridad
  del Protocolo de Contexto de Modelo que conecta agentes a herramientas.
  `https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4496698/`
  (verificado: primario) (audiencia: ingeniería; jurisdicción: US)
- **"California's SB 53: the first frontier-AI law explained" (FPF)**: la lectura más clara sobre SB
  53 de California (TFAIA), la primera ley de transparencia de IA fronteriza de EE.UU.
  `https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/` (verificado:
  secundario) (audiencia: legal, gobernanza; jurisdicción: US)
- **New York RAISE Act (Governor's signing announcement)**: la ley de seguridad de IA fronteriza de
  Nueva York (S6953B), firmada el 19 de diciembre de 2025 y efectiva el 1 de enero de 2027 después
  de una enmienda de capítulo en marzo de 2026, con una oficina de supervisión en el Departamento de
  Servicios Financieros.
  `https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models`
  (verificado: primario) (audiencia: legal, gobernanza; jurisdicción: US)
- **NIST AI 800-1, "Managing Misuse Risk for Dual-Use Foundation Models" (second public draft)**:
  orientación voluntaria de NIST/CAISI de EE.UU. sobre identificación, medición y mitigación del
  riesgo de uso indebido en todo el ciclo de vida del modelo; aún un borrador.
  `https://www.nist.gov/news-events/news/2025/01/updated-guidelines-managing-misuse-risk-dual-use-foundation-models`
  (verificado: primario) (audiencia: ingeniería, gobernanza; jurisdicción: US)
- **NIST ARIA (Assessing Risks and Impacts of AI)**: el entorno de evaluación de NIST que prueba
  riesgos e impactos del modelo a través de pruebas de modelo, red teaming y pruebas de campo; una
  referencia para la capa 03. `https://ai-challenges.nist.gov/aria` (verificado: primario)
  (audiencia: ingeniería, investigación; jurisdicción: US)
- **UK AI Security Institute**: el instituto del gobierno del Reino Unido que evalúa riesgos de IA
  avanzada y publica el marco de evaluación Inspect que este libro utiliza como referencia de la
  capa 03. `https://www.aisi.gov.uk/` (verificado: primario) (audiencia: ingeniería, investigación;
  jurisdicción: UK)
- **US Center for AI Standards and Innovation (CAISI)**: el centro de NIST para normas, pruebas y
  seguridad de IA, anteriormente el Instituto de Seguridad de IA de EE.UU.; el punto de contacto del
  gobierno de EE.UU. para la industria. `https://www.nist.gov/caisi` (verificado: primario)
  (audiencia: gobernanza, investigación; jurisdicción: US)
- **Marco de Gobernanza de Seguridad de IA 3.0 (TC260, bajo orientación de CAC)**: marco voluntario
  de China, PDF bilingüe; el Apéndice 2 es el marco de gestión de riesgos de IA agéntica (identidad,
  puntos de control humanos, guardrails, memoria, desmantelamiento).
  `https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf` (verificado:
  primario) (audiencia: gobernanza, ingeniería; jurisdicción: China)
- **Medidas Provisionales para la Administración de Servicios de IA Generativa**: norma vinculante
  de China para IA generativa ofrecida al público dentro de la RPC, en vigor desde 2023-08-15; texto
  oficial en chino. `https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm` (verificado:
  primario) (audiencia: legal; jurisdicción: China)
- **Disposiciones sobre la Administración de Síntesis Profunda en Servicios de Información de Internet**:
  deberes de etiquetado, datos de entrenamiento y consentimiento para síntesis profunda, en vigor
  desde 2023-01-10; texto oficial en chino.
  `https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm` (verificado: primario) (audiencia:
  legal; jurisdicción: China)
- **Disposiciones sobre la Administración de Recomendación Algorítmica en Servicios de Información de Internet**:
  registro de algoritmos, evaluación de seguridad y opción de exclusión del usuario, en vigor desde
  2022-03-01; texto oficial en chino. `https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm`
  (verificado: primario) (audiencia: legal; jurisdicción: China)
- **Medidas para el Etiquetado de Contenido Sintético Generado por IA**: etiquetas explícitas e
  implícitas, en vigor desde 2025-09-01 junto con la norma obligatoria GB 45438-2025; texto oficial
  en chino. `https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm` (verificado: primario)
  (audiencia: legal, ingeniería; jurisdicción: China)
- **Ley Básica de IA de Corea del Sur**: la Ley Marco en vigor desde 2026-01-22, con deberes
  reforzados para IA de alto impacto; el capítulo 08 de la fuente ya la cita.
  `https://www.trade.gov/market-intelligence/south-korea-ai-basic-act` (verificado: secundario)
  (audiencia: legal, gobernanza; jurisdicción: Corea del Sur)
- **Marco de Gobernanza de IA Modelo para IA Generativa (IMDA / Fundación AI Verify)**: marco
  voluntario de Singapur (mayo de 2024): pruebas, transparencia, notificación de incidentes,
  seguridad y procedencia del contenido.
  `https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf`
  (verificado: primario) (audiencia: gobernanza, ingeniería; jurisdicción: Singapur)

## Principios y marcos internacionales

- **Recomendación del Consejo de la OCDE sobre Inteligencia Artificial (OECD/LEGAL/0449)**: los
  Principios de IA revisados en 2024, y la fuente de la definición de sistema de IA y ciclo de vida
  que siguen el Reglamento de IA y la Convención del Consejo de Europa.
  `https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449` (verificado: primario)
  (audiencia: gobernanza, liderazgo, legal; jurisdicción: global)
- **Memorándum explicativo sobre la definición actualizada de sistema de IA de la OCDE**: por qué
  cambió la definición de 2023 y cómo se entienden la autonomía y la adaptabilidad.
  `https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html`
  (verificado: primario) (audiencia: gobernanza, legal; jurisdicción: global)
- **HUDERIA: evaluación de riesgos e impacto de sistemas de IA (Consejo de Europa)**: la metodología
  de impacto en derechos humanos y su modelo de contexto, para reconciliar con una FRIA existente.
  `https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems`
  (verificado: primario) (audiencia: gobernanza, legal; jurisdicción: global)
- **Hacia un marco común de notificación de incidentes de IA (OCDE, 2025)**: los 29 criterios con
  los que se puede alinear un registro de incidentes entre jurisdicciones; la base de los nombres de
  campos de registro de incidentes en la biblioteca de plantillas.
  `https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf`
  (verificado: primario) (audiencia: gobernanza, ingeniería; jurisdicción: global)
- **"Definición de incidentes de IA y términos relacionados" (OECD.AI)**: el vocabulario compartido
  de incidente de IA, peligro de IA y sus variantes graves.
  `https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards` (verificado: primario) (audiencia:
  gobernanza, legal; jurisdicción: global)

## Orientación de la UE, códigos y derecho adyacente

- **Directrices de la Comisión sobre la definición de un sistema de IA**: la prueba operativa de la
  UE para el ámbito de aplicación: los siete elementos, el bajo umbral de autonomía y las familias
  de software excluidas.
  `https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application`
  (verificado: primario) (audiencia: legal, gobernanza, ingeniería; jurisdicción: UE)
- **Directrices de la Comisión sobre el ámbito de las obligaciones de los proveedores de modelos de IA de uso general**:
  los criterios de cómputo para modelos GPAI, cuándo el ajuste fino o la modificación de un modelo
  te convierte en su proveedor, y la prueba de monetización de código abierto.
  `https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act`
  (verificado: primario) (audiencia: legal, ingeniería; jurisdicción: UE)
- **Proyecto de directrices de la Comisión sobre la clasificación de sistemas de IA de alto riesgo**:
  ejemplos prácticos para el Art. 6 y el filtro Art. 6(3); aún en forma de proyecto a partir de
  2026-09-24.
  `https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems`
  (verificado: primario) (audiencia: legal, gobernanza; jurisdicción: UE)
- **Alfabetización en IA: Preguntas y Respuestas (Comisión Europea)**: la propia lectura de la
  Comisión del Artículo 4 después del Omnibus: no se requiere certificado, registros internos, y
  quién cuenta como "otras personas".
  `https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers` (verificado:
  primario) (audiencia: gobernanza, liderazgo; jurisdicción: UE)
- **Código de Prácticas sobre Transparencia del Contenido Generado por IA**: la ruta voluntaria
  hacia los deberes de marcado y etiquetado del Art. 50.
  `https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content`
  (verificado: primario) (audiencia: ingeniería, legal; jurisdicción: UE)
- **Plantilla de notificación de incidentes graves de GPAI (Comisión Europea, 4 de noviembre de 2025)**:
  los campos que lleva un informe de incidente grave de GPAI, incluido análisis de causa raíz y
  patrones de casi-incidentes.
  `https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai`
  (verificado: primario) (audiencia: gobernanza, ingeniería; jurisdicción: UE)
- **Cláusulas contractuales modelo de la UE actualizadas (MCC-AI)**: el texto de contrato de
  referencia para comprar IA, en una versión de alto riesgo y una versión ligera, con comentario;
  utilizable más allá de la contratación pública.
  `https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses`
  (verificado: primario) (audiencia: legal, gobernanza; jurisdicción: UE)
- **Opinión 28/2024 del CEPD sobre ciertos aspectos de protección de datos relacionados con el tratamiento de datos personales en el contexto de modelos de IA**:
  la referencia de las autoridades europeas de protección de datos sobre anonimato de modelos,
  interés legítimo para IA y qué significa entrenamiento ilícito para responsables del despliegue.
  `https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en`
  (verificado: primario) (audiencia: legal, gobernanza; jurisdicción: UE)
- **Directrices 05/2021 del CEPD sobre la interacción entre el Artículo 3 y el Capítulo V del RGPD**:
  los tres criterios que deciden si una llamada de inferencia remota o un acceso de soporte es una
  transferencia internacional.
  `https://www.edpb.europa.eu/system/files/documents/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf`
  (verificado: primario) (audiencia: legal; jurisdicción: UE)
- **CNIL, "Garantizar y facilitar el ejercicio de los derechos de los interesados" (hoja de orientación sobre IA)**:
  el texto regulador más práctico sobre derechos contra modelos entrenados: reentrenamiento, filtros
  de salida y sus límites.
  `https://www.cnil.fr/en/ensuring-and-facilitating-exercise-data-subjects-rights` (verificado:
  primario) (audiencia: legal, ingeniería; jurisdicción: UE, Francia)
- **CNIL, "Basarse en la base legal de interés legítimo para desarrollar un sistema de IA"**: una
  prueba de equilibrio paso a paso y las salvaguardas adicionales para entrenamiento de IA.
  `https://www.cnil.fr/en/relying-legal-basis-legitimate-interests-develop-ai-system` (verificado:
  primario) (audiencia: legal; jurisdicción: UE, Francia)
- **Orientación de la AEPD sobre IA agéntica desde una perspectiva de protección de datos (comunicado de prensa)**:
  análisis de un regulador sobre agentes: autonomía, memoria, amenazas y medidas del responsable; en
  español.
  `https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/la-agencia-publica-unas-orientaciones-sobre-inteligencia`
  (verificado: primario) (audiencia: legal, ingeniería; jurisdicción: UE, España)
- **DPA de Hamburgo, "Documento de debate: Modelos de Lenguaje Grande y Datos Personales"**: la
  opinión de que los LLM no almacenan datos personales; léelo junto con la opinión del CEPD.
  `https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf`
  (verificado: primario) (audiencia: legal; jurisdicción: UE, Alemania)
- **Guías de AESIA del sandbox de IA español**: dieciséis guías no vinculantes con listas de
  verificación para los requisitos de alto riesgo de la UE, producidas en un sandbox regulador; en
  español. `https://aesia.digital.gob.es/es/guias` (verificado: primario) (audiencia: gobernanza,
  ingeniería; jurisdicción: UE, España)
- **Directiva (UE) 2024/2853 sobre responsabilidad por productos defectuosos**: el texto que
  convierte el software en un producto, establece deberes de divulgación y presunciones, y vincula
  la responsabilidad a las actualizaciones. `https://eur-lex.europa.eu/eli/dir/2024/2853/oj`
  (verificado: primario) (audiencia: legal, liderazgo; jurisdicción: UE)

## Orientación de gobiernos y reguladores más allá de la UE

- **NIST AI 600-1, Perfil de Inteligencia Artificial Generativa**: doce riesgos que la IA generativa
  crea o agrava, con acciones sugeridas vinculadas a subcategorías de AI RMF, utilizables como
  nombres de suites de eval. `https://doi.org/10.6028/NIST.AI.600-1` (verificado: primario)
  (audiencia: gobernanza, ingeniería; jurisdicción: US)
- **Libro de Jugadas de NIST AI RMF**: acciones sugeridas y preguntas de documentación por
  subcategoría; las preguntas de documentación hacen buenos criterios de aceptación para controles.
  `https://airc.nist.gov/airmf-resources/playbook/govern/` (verificado: primario) (audiencia:
  gobernanza, ingeniería; jurisdicción: US)
- **Libro de Jugadas de NIST AI RMF: MANAGE**: monitoreo post-despliegue, riesgo de terceros y
  desactivación, subcategoría por subcategoría.
  `https://airc.nist.gov/airmf-resources/playbook/manage/` (verificado: primario) (audiencia:
  gobernanza, ingeniería; jurisdicción: US)
- **Correspondencia: AI RMF (1.0) e ISO/IEC FDIS 23894 (NIST, 2023)**: un mapa de dos páginas de las
  cuatro funciones de AI RMF a cláusulas de ISO/IEC 23894; la forma más rápida de ver que describen
  un proceso.
  `https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf`
  (verificado: primario) (audiencia: gobernanza; jurisdicción: US)
- **NIST SP 1270, "Hacia un Estándar para Identificar y Gestionar Sesgos en Inteligencia Artificial"**:
  el mapa más breve y autorizado de dónde proviene el sesgo de IA (sistémico, estadístico, humano).
  `https://doi.org/10.6028/NIST.SP.1270` (verificado: primario) (audiencia: ingeniería, gobernanza;
  jurisdicción: US)
- **NIST IR 8312, "Cuatro Principios de Inteligencia Artificial Explicable"**: cuatro principios,
  incluida la precisión de la explicación y los límites del conocimiento, que se traducen en
  criterios de eval para explicaciones. `https://doi.org/10.6028/NIST.IR.8312` (verificado:
  primario) (audiencia: ingeniería, investigación; jurisdicción: US)
- **NIST AI 100-2 E2025, "Aprendizaje Automático Adversarial: Una Taxonomía y Terminología de Ataques y Mitigaciones"**:
  el vocabulario compartido de ataques en IA predictiva y generativa que planes de red team y
  modelos de amenaza pueden citar. `https://doi.org/10.6028/NIST.AI.100-2e2025` (verificado:
  primario) (audiencia: ingeniería, investigación; jurisdicción: US)
- **NIST SP 800-61 Rev. 3, "Recomendaciones de Respuesta a Incidentes y Consideraciones para Gestión de Riesgos de Ciberseguridad"**:
  respuesta a incidentes replanteada alrededor de las funciones de CSF 2.0; la base que el ciclo de
  vida específico de IA adapta. `https://csrc.nist.gov/pubs/sp/800/61/r3/final` (verificado:
  primario) (audiencia: ingeniería, gobernanza; jurisdicción: US)
- **NIST SP 800-226, "Directrices para Evaluar Garantías de Privacidad Diferencial"**: cómo evaluar
  una afirmación de privacidad diferencial y los peligros que la rompen en la práctica.
  `https://csrc.nist.gov/pubs/sp/800/226/final` (verificado: primario) (audiencia: ingeniería,
  legal; jurisdicción: US)
- **Memorándum OMB M-25-21**: la definición federal de EE.UU. de IA de alto impacto, sus prácticas
  mínimas y una plantilla pública para los deberes de un Director de IA y una junta de gobernanza de
  IA.
  `https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf`
  (verificado: primario) (audiencia: gobernanza, liderazgo; jurisdicción: US)
- **SR 26-2, Orientación Revisada sobre Gestión de Riesgo de Modelos (Reserva Federal, OCC, FDIC)**:
  supersede a SR 11-7; desafío efectivo y validación, adaptados al perfil de riesgo, con IA
  generativa y agéntica explícitamente fuera del alcance.
  `https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm` (verificado: primario)
  (audiencia: gobernanza, legal; jurisdicción: US)
- **Circular 2022-03 de la CFPB: acciones adversas y algoritmos complejos**: por qué la complejidad
  del modelo no excusa razones inexactas de acción adversa; retirada por la CFPB el 12 de mayo de
  2025, mientras que el deber de la Regulación B que interpretaba se mantiene.
  `https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/`
  (verificado: primario) (audiencia: legal, ingeniería; jurisdicción: EE.UU.)
- **Boletín modelo de la NAIC: Uso de sistemas de inteligencia artificial por aseguradoras**: una
  plantilla escrita por reguladores para un programa de gobernanza de IA en una industria regulada,
  incluida la IA de terceros.
  `https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Adopted_0.pdf`
  (verificado: primario) (audiencia: gobernanza, legal; jurisdicción: EE.UU.)
- **Derechos de autor e inteligencia artificial (Oficina de Derechos de Autor de EE.UU.)**: la
  posición de la Oficina sobre la autoría de resultados de IA y sobre el entrenamiento, con la guía
  de registro. `https://copyright.gov/ai/` (verificado: primario) (audiencia: legal; jurisdicción:
  EE.UU.)
- **ICO, Orientación sobre IA y protección de datos**: la perspectiva del Reino Unido sobre
  legalidad, inferencias, equidad y derechos individuales en IA; en revisión tras la Data (Use and
  Access) Act a partir del 2026-09-24.
  `https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/`
  (verificado: primario) (audiencia: legal, gobernanza; jurisdicción: Reino Unido)
- **ICO e Instituto Alan Turing, "Explicación de decisiones tomadas con IA"**: seis tipos de
  explicación y un método tarea por tarea para explicar decisiones de IA a las personas afectadas;
  en revisión a partir del 2026-09-24.
  `https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/explaining-decisions-made-with-artificial-intelligence/`
  (verificado: primario) (audiencia: ingeniería, legal; jurisdicción: Reino Unido)
- **Entendimiento general sobre IA y derechos de autor en Japón (Oficina de Derechos de Autor de Japón)**:
  una lectura oficial breve del artículo 30-4 que muestra dónde termina la excepción de
  entrenamiento japonesa. `https://www.bunka.go.jp/english/policy/copyright/pdf/94055801_01.pdf`
  (verificado: primario) (audiencia: legal; jurisdicción: Japón)
- **Directiva sobre toma de decisiones automatizada (Secretaría de la Junta del Tesoro de Canadá)**:
  un régimen de evaluación de impacto maduro y publicado con requisitos escalados por nivel de
  impacto. `https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592` (verificado: primario)
  (audiencia: gobernanza, legal; jurisdicción: Canadá)
- **Marco de gobernanza de IA modelo para IA agencial, v1.5 (IMDA)**: un marco gubernamental para
  agentes organizado en cuatro dimensiones prácticas, desde acotar el riesgo hasta la
  responsabilidad del usuario final.
  `https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf`
  (verificado: primario) (audiencia: gobernanza, ingeniería; jurisdicción: Singapur)
- **Ley básica de IA de Corea y decreto de ejecución (Centro de información jurídica de Corea)**: el
  texto primario de la ley de IA horizontal no europea con más deberes del operador; el decreto
  contiene los umbrales; en coreano. `https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543`
  (verificado: primario) (audiencia: legal; jurisdicción: Corea del Sur)

## Marcos de seguridad de frontera (compromisos propios de los laboratorios)

- **Política de escalado responsable de Anthropic**: el marco de seguridad de frontera propio de
  Anthropic de umbrales de capacidad y salvaguardas requeridas; la página indica versión 3.4,
  efectiva 8 de julio de 2026. `https://www.anthropic.com/responsible-scaling-policy` (verificado:
  primario) (audiencia: gobernanza, investigación; jurisdicción: global)
- **Marco de preparación de OpenAI**: el marco propio de OpenAI para rastrear y prepararse para
  capacidades de frontera que podrían causar daño grave; el documento indica versión 2, última
  actualización 15 de abril de 2025.
  `https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf`
  (verificado: primario) (audiencia: gobernanza, investigación; jurisdicción: global)
- **Marco de seguridad de frontera de Google DeepMind**: el marco propio de DeepMind de niveles de
  capacidad crítica y mitigaciones; la página indica versión 3.1, actualizada 17 de abril de 2026.
  `https://deepmind.google/discover/blog/strengthening-our-frontier-safety-framework/` (verificado:
  primario) (audiencia: gobernanza, investigación; jurisdicción: global)

## Artículos (evidencia legible por máquina y gobernanza de agentes)

- **"Hacer evidencia de cumplimiento de IA legible por máquina" (arXiv 2604.13767)**: extiende
  `OSCAL` para IA y argumenta que los marcos especifican *qué* asegurar pero no *cómo* ejecutable.
  `https://arxiv.org/html/2604.13767v1` (verificado: primario) (audiencia: ingeniería,
  investigación; jurisdicción: global)
- **"Auditoría como código" (Frontiers in AI)**: una puntuación de preparación asegurada con puertas
  proceder/remediar/bloquear; salida de auditoría como artefacto de compilación.
  `https://pubmed.ncbi.nlm.nih.gov/41837238/` (verificado: primario) (audiencia: ingeniería,
  investigación; jurisdicción: global)
- **Fichas de política (arXiv 2510.24383)**: artefactos de gobernanza en tiempo de ejecución
  legibles por máquina con esquema JSON para agentes. `https://arxiv.org/abs/2510.24383`
  (verificado: primario) (audiencia: ingeniería, investigación; jurisdicción: global)
- **TAIP (arXiv 2603.03340)**: trata salidas NIST TEVV como objetos de aseguramiento de IA.
  `https://arxiv.org/abs/2603.03340` (verificado: primario) (audiencia: ingeniería, investigación;
  jurisdicción: global)
- **AI Trust OS (arXiv 2604.04749)**: un marco de sistema operativo para confianza y aseguramiento
  continuo de IA. `https://arxiv.org/abs/2604.04749` (verificado: primario) (audiencia: ingeniería,
  investigación; jurisdicción: global)
- **AAGATE (arXiv 2510.25863)**: un diseño de plataforma de gobernanza de agentes alineado con NIST
  AI RMF. `https://arxiv.org/abs/2510.25863` (verificado: primario) (audiencia: ingeniería,
  investigación; jurisdicción: global)
- **"Hacia desarrollo de IA confiable: mecanismos para respaldar afirmaciones verificables" (Brundage et al., 2020)**:
  mecanismos institucionales, de software y hardware que convierten la afirmación de un
  desarrollador en algo que un tercero puede verificar; el argumento detrás de la evidencia sobre la
  afirmación. `https://arxiv.org/abs/2004.07213` (verificado: primario) (audiencia: gobernanza,
  investigación; jurisdicción: global)
- **"Prácticas para gobernar sistemas de IA agencial" (Shavit et al., OpenAI, 2023)**: una
  definición de sistemas agenciales, las partes en su ciclo de vida y prácticas de base como acotar
  el espacio de acción, legibilidad de la actividad y la capacidad de interrumpir.
  `https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf` (verificado:
  primario) (audiencia: ingeniería, gobernanza; jurisdicción: global)
- **"Visibilidad en agentes de IA" (Chan et al., 2024)**: identificadores de agentes, monitoreo en
  tiempo real y registro de actividades como las tres medidas que hacen visibles los agentes
  desplegados. `https://arxiv.org/abs/2401.13138` (verificado: primario) (audiencia: ingeniería,
  gobernanza; jurisdicción: global)

## Artículos canónicos: documentación, auditoría y responsabilidad

- **"Hojas de datos para conjuntos de datos" (Gebru et al.)**: el origen de la documentación
  estructurada de conjuntos de datos; la mitad legible por humanos de un registro de admisión de
  conjunto de datos. `https://arxiv.org/abs/1803.09010` (verificado: primario) (audiencia:
  ingeniería, investigación; jurisdicción: global)
- **"Fichas de modelo para informes de modelo" (Mitchell et al., 2018)**: uso previsto y evaluación
  entre grupos y condiciones, reportados junto al modelo; la plantilla detrás de cada ficha de
  modelo desde entonces. `https://arxiv.org/abs/1810.03993` (verificado: primario) (audiencia:
  ingeniería, gobernanza; jurisdicción: global)
- **"Cerrando la brecha de responsabilidad de IA: definición de un marco de extremo a extremo para auditoría algorítmica interna" (Raji et al., 2020)**:
  una auditoría interna ejecutada junto al desarrollo, etapa por etapa, con un artefacto documentado
  en cada paso. `https://arxiv.org/abs/2001.00973` (verificado: primario) (audiencia: gobernanza,
  ingeniería; jurisdicción: global)
- **"Auditoría accionable" (Raji y Buolamwini, 2019)**: qué sucedió después de nombrar públicamente
  las brechas de rendimiento de sistemas comerciales; evidencia de que las auditorías externas
  mueven a los proveedores. `https://doi.org/10.1145/3306618.3314244` (verificado: primario)
  (audiencia: gobernanza, investigación; jurisdicción: global)
- **"Auditoría de modelos de lenguaje grandes: un enfoque de tres capas" (Mökander et al., 2023)**:
  auditorías de gobernanza, modelo y aplicación como tres capas complementarias.
  `https://arxiv.org/abs/2302.08500` (verificado: primario) (audiencia: gobernanza, investigación;
  jurisdicción: global)
- **"El gradiente de lanzamiento de IA generativa" (Irene Solaiman, 2023)**: un vocabulario para
  decisiones de lanzamiento, desde completamente cerrado hasta completamente abierto.
  `https://arxiv.org/abs/2302.04844` (verificado: primario) (audiencia: gobernanza, liderazgo;
  jurisdicción: global)
- **"Cómo 'piensa' la máquina: Comprensión de la opacidad en algoritmos de aprendizaje automático" (Burrell, 2016)**:
  tres fuentes de opacidad, cada una necesitando una solución diferente.
  `https://doi.org/10.1177/2053951715622512` (verificado: primario) (audiencia: gobernanza,
  investigación; jurisdicción: global)
- **"Equidad y abstracción en sistemas sociotécnicos" (Selbst et al., 2019)**: cinco trampas en las
  que cae una intervención técnica de equidad cuando abstrae el contexto social.
  `https://doi.org/10.1145/3287560.3287598` (verificado: primario) (audiencia: ingeniería,
  investigación; jurisdicción: global)
- **"Sobre los peligros de los loros estocásticos" (Bender, Gebru et al., 2021)**: los costos y
  riesgos de modelos de lenguaje cada vez más grandes, desde datos de entrenamiento no documentados
  hasta costo ambiental. `https://doi.org/10.1145/3442188.3445922` (verificado: primario)
  (audiencia: investigación, liderazgo; jurisdicción: global)
- **"Riesgos éticos y sociales del daño de modelos de lenguaje" (Weidinger et al., 2021)**: una
  taxonomía estructurada de daños de modelos de lenguaje, una lista de inicio lista para un registro
  de riesgos. `https://arxiv.org/abs/2112.04359` (verificado: primario) (audiencia: gobernanza,
  investigación; jurisdicción: global)
- **"Problemas concretos en seguridad de IA" (Amodei et al., 2016)**: cinco modos de fallo prácticos
  (efectos secundarios, recompensa hackeada, supervisión, exploración segura, cambio distribucional)
  enunciados como problemas de ingeniería. `https://arxiv.org/abs/1606.06565` (verificado: primario)
  (audiencia: ingeniería, investigación; jurisdicción: global)

## Artículos canónicos: medición, equidad y evaluación

- **"Gender Shades: disparidades de precisión interseccionales en clasificación de género comercial" (Buolamwini y Gebru, 2018)**:
  la auditoría que hizo que la evaluación desagregada e interseccional fuera la norma.
  `https://proceedings.mlr.press/v81/buolamwini18a.html` (verificado: primario) (audiencia:
  ingeniería, investigación; jurisdicción: global)
- **"Disección del sesgo racial en un algoritmo usado para gestionar la salud de poblaciones" (Obermeyer et al., Science, 2019)**:
  el fallo canónico de etiqueta proxy: un modelo preciso en costo y sesgado en necesidad; la razón
  por la que una ficha de modelo debe indicar la construcción.
  `https://doi.org/10.1126/science.aax2342` (verificado: primario) (audiencia: ingeniería,
  gobernanza; jurisdicción: EE.UU.)
- **"Disparidades raciales en reconocimiento de voz automatizado" (Koenecke et al., PNAS, 2020)**:
  por qué un promedio oculta el servicio peor de un grupo; el argumento para evals desagregadas.
  `https://doi.org/10.1073/pnas.1915768117` (verificado: primario) (audiencia: ingeniería,
  investigación; jurisdicción: EE.UU.)
- **"Compensaciones inherentes en la determinación justa de puntuaciones de riesgo" (Kleinberg, Mullainathan y Raghavan)**:
  el resultado de imposibilidad que hace que la elección de métrica de equidad sea una decisión de
  gobernanza en lugar de una técnica. `https://arxiv.org/abs/1609.05807` (verificado: primario)
  (audiencia: gobernanza, investigación; jurisdicción: global)
- **"Dejar de explicar modelos de aprendizaje automático de caja negra para decisiones de alto riesgo y usar modelos interpretables en su lugar" (Rudin)**:
  el caso para modelos interpretables por diseño en decisiones de alto riesgo.
  `https://arxiv.org/abs/1811.10154` (verificado: primario) (audiencia: ingeniería, gobernanza;
  jurisdicción: global)
- **"La mitología de la interpretabilidad del modelo" (Lipton, 2016)**: por qué "interpretable"
  nombra varias propiedades diferentes, y cuál debería pedir un requisito.
  `https://arxiv.org/abs/1606.03490` (verificado: primario) (audiencia: ingeniería, investigación;
  jurisdicción: global)
- **«On Calibration of Modern Neural Networks» (Guo et al., 2017)**: por qué una puntuación de
  modelo no es una probabilidad hasta que se mide la calibración. `https://arxiv.org/abs/1706.04599`
  (verificado: primario) (audiencia: ingeniería, investigación; jurisdicción: global)
- **«A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification» (Angelopoulos and Bates)**:
  una forma práctica y sin distribución de convertir puntuaciones en conjuntos con garantía de
  cobertura. `https://arxiv.org/abs/2107.07511` (verificado: primario) (audiencia: ingeniería,
  investigación; jurisdicción: global)
- **«What's Wrong with Risk Matrices?» (L. A. Cox Jr., Risk Analysis, 2008)**: la crítica estándar
  de las matrices de probabilidad por severidad y por qué se necesita una pista catastrófica.
  `https://doi.org/10.1111/j.1539-6924.2008.01030.x` (verificado: primario) (audiencia: gobernanza,
  investigación; jurisdicción: global)
- **«Adding Error Bars to Evals» (Evan Miller, 2024)**: evals tratadas como experimentos: errores
  estándar, comparación de modelos y planificación del tamaño de muestra para puertas de eval.
  `https://arxiv.org/abs/2411.00640` (verificado: primario) (audiencia: ingeniería, investigación;
  jurisdicción: global)
- **«Holistic Evaluation of Language Models» (Liang et al., 2022)**: muchas métricas en muchos
  escenarios, reportadas juntas, en lugar de un único número de clasificación.
  `https://arxiv.org/abs/2211.09110` (verificado: primario) (audiencia: ingeniería, investigación;
  jurisdicción: global)
- **«Model evaluation for extreme risks» (Shevlane et al., 2023)**: evaluaciones de capacidades
  peligrosas y alineación como entradas para decisiones de entrenamiento, despliegue y seguridad.
  `https://arxiv.org/abs/2305.15324` (verificado: primario) (audiencia: gobernanza, investigación;
  jurisdicción: global)
- **«Red Teaming Language Models with Language Models» (Perez et al., 2022)**: red teaming
  automatizado, un modelo generando casos de prueba para otro. `https://arxiv.org/abs/2202.03286`
  (verificado: primario) (audiencia: ingeniería, investigación; jurisdicción: global)
- **«Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection» (Greshake et al., 2023)**:
  el artículo que nombró la inyección de prompts indirecta, la amenaza central para agentes que leen
  contenido no confiable. `https://arxiv.org/abs/2302.12173` (verificado: primario) (audiencia:
  ingeniería, investigación; jurisdicción: global)
- **«Extracting Training Data from Large Language Models» (Carlini et al.)**: la demostración
  canónica de que los modelos de lenguaje regurgitan datos de entrenamiento, y por qué las evals de
  extracción pertenecen a la puerta. `https://arxiv.org/abs/2012.07805` (verificado: primario)
  (audiencia: ingeniería, legal; jurisdicción: global)
- **«Power Hungry Processing: Watts Driving the Cost of AI Deployment?» (Luccioni, Jernite, Strubell)**:
  mide la brecha de energía de inferencia entre modelos generativos de uso general y específicos de
  tarea. `https://arxiv.org/abs/2311.16863` (verificado: primario) (audiencia: ingeniería,
  liderazgo; jurisdicción: global)
- **«The Leaderboard Illusion» (Singh et al., 2025)**: por qué una clasificación pública no puede
  decidir una elección de modelo. `https://arxiv.org/abs/2504.20879` (verificado: primario)
  (audiencia: ingeniería, liderazgo; jurisdicción: global)
- **«Hidden Technical Debt in Machine Learning Systems» (Sculley et al., NeurIPS 2015)**: por qué el
  modelo es la caja pequeña en un sistema ML de producción, y dónde se acumula la deuda alrededor de
  él.
  `https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html`
  (verificado: primario) (audiencia: ingeniería; jurisdicción: global)

## Informes (el mercado y la profesión)

- **IAPP AI Governance Profession Report 2025 (with Credo AI)**: dónde se sitúa la función y cómo se
  dota de personal; el censo de referencia de la profesión.
  `https://iapp.org/resources/article/ai-governance-profession-report/` (verificado: primario)
  (audiencia: liderazgo, gobernanza; jurisdicción: global)
- **IAPP Salary & Jobs Report 2025-26**: las bandas salariales que anclan el capítulo 06, incluyendo
  la prima de gobernanza técnica de IA. `https://iapp.org/resources/article/salary-survey-summary/`
  (verificado: primario) (audiencia: liderazgo, gobernanza; jurisdicción: global)
- **IAPP AI Governance Vendor Report 2026**: las cuatro categorías de proveedores y la afirmación de
  que la gobernanza de IA «no es una única función, disciplina o tecnología».
  `https://iapp.org/resources/article/ai-governance-vendor-report` (verificado: primario)
  (audiencia: gobernanza, liderazgo; jurisdicción: global)
- **State of GRC 2026**: la encuesta de profesionales detrás de la realidad de que «la hoja de
  cálculo sigue siendo la herramienta GRC número 1» contra la que reacciona la disciplina.
  `https://grcengineer.com/report/` (verificado: primario) (audiencia: gobernanza; jurisdicción:
  global)
- **«Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms» (Gartner)**: el
  propio encuadre del analista de la categoría de plataforma, incluyendo la aplicación de políticas
  en tiempo de ejecución, y su pronóstico de gasto.
  `https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms`
  (verificado: primario) (audiencia: liderazgo; jurisdicción: global)
- **Gartner Magic Quadrant for AI Governance Platforms, June 2026 (via IBM)**: la cuenta de un
  proveedor nombrado del primer MQ para la categoría; el informe en sí está licenciado, así que lee
  esto como un resumen del proveedor.
  `https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms`
  (verificado: secundario) (audiencia: liderazgo; jurisdicción: global)
- **HiddenLayer 2026 AI Threat Landscape Report**: la encuesta de un proveedor de seguridad y la
  fuente del hallazgo «uno de cada ocho brechas fueron agentes»; léelo como una encuesta de
  proveedor. `https://www.hiddenlayer.com/report-and-guide/threatreport2026` (verificado: primario)
  (audiencia: ingeniería, liderazgo; jurisdicción: global)
- **International AI Safety Report 2026**: la segunda edición (3 de febrero de 2026) de la
  evaluación científica de capacidades de IA de uso general, riesgos y gestión de riesgos, presidida
  por Yoshua Bengio y respaldada por más de 30 países y organizaciones internacionales.
  `https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026`
  (verificado: primario) (audiencia: liderazgo, investigación, gobernanza; jurisdicción: global)
- **The 2026 AI Index Report (Stanford HAI)**: el registro de datos anual de IA en investigación,
  desempeño técnico, IA responsable, la economía, política y opinión pública; el lugar para
  verificar una tendencia antes de citarla. `https://hai.stanford.edu/ai-index/2026-ai-index-report`
  (verificado: primario) (audiencia: liderazgo, investigación; jurisdicción: global)

## Repositorios de incidentes y riesgos (el registro empírico)

- **AI Incident Database**: el catálogo de la Responsible AI Collaborative de daños reales de IA y
  casi-daños; un corpus de referencia para modelado de amenazas y acompañamiento
  poscomercialización. `https://incidentdatabase.ai/` (verificado: primario) (audiencia: gobernanza,
  ingeniería, investigación; jurisdicción: global)
- **AIAAIC Repository**: un registro abierto e independiente de incidentes y controversias de IA,
  algoritmos y automatización en todos los sectores. `https://www.aiaaic.org/aiaaic-repository`
  (verificado: primario) (audiencia: gobernanza, investigación; jurisdicción: global)
- **OECD.AI Incidents & Hazards Monitor (AIM)**: el monitor en vivo de la OCDE de incidentes y
  peligros de IA extraídos de medios globales, construido para informar la política.
  `https://oecd.ai/en/incidents` (verificado: primario) (audiencia: gobernanza, liderazgo;
  jurisdicción: global)
- **AI Vulnerability Database (AVID)**: la base de conocimiento abierta de la AI Risk and
  Vulnerability Alliance de modos de fallo para sistemas de IA de uso general. `https://avidml.org/`
  (verificado: primario) (audiencia: ingeniería, investigación; jurisdicción: global)
- **MIT AI Risk Repository**: la base de datos viva de MIT FutureTech de más de 1.700 riesgos de IA
  clasificados en 65 marcos; una taxonomía para intake y niveles de riesgo.
  `https://airisk.mit.edu/` (verificado: primario) (audiencia: gobernanza, investigación;
  jurisdicción: global)
- **NJCM et al. v. The State of the Netherlands (SyRI), The Hague District Court, 5 Feb 2020**: un
  tribunal anulando un sistema de puntuación de riesgo porque no era lo suficientemente transparente
  y verificable para sopesar. `https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBDHA:2020:1878`
  (verificado: primario) (audiencia: legal, gobernanza; jurisdicción: UE, Países Bajos)
- **«Xenophobic machines» (Amnesty International, 2021)**: la cuenta pública más completa de cómo un
  indicador de nacionalidad entró en el sistema de riesgo de prestaciones de cuidado infantil
  holandés. `https://www.amnesty.org/en/documents/eur35/4686/2021/en/` (verificado: primario)
  (audiencia: gobernanza, legal; jurisdicción: UE, Países Bajos)

## Práctica de ingeniería y aseguramiento

- **The IIA's Three Lines Model (2020)**: la división entre órgano de gobierno, primera y segunda
  línea de la dirección y auditoría interna independiente, que un programa de gobernanza de IA tiene
  que mapear, incluyendo quién acepta el riesgo residual.
  `https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/`
  (verificado: primario) (audiencia: gobernanza, liderazgo; jurisdicción: global)
- **«Postmortem Culture: Learning from Failure» (Google SRE book)**: el texto de referencia para
  post-mortems sin culpa y para establecer disparadores de post-mortem por adelantado, que las
  revisiones de incidentes y casi-incidentes de IA deberían tomar prestado.
  `https://sre.google/sre-book/postmortem-culture/` (verificado: primario) (audiencia: ingeniería,
  gobernanza; jurisdicción: global)
- **«Canarying Releases» (The Site Reliability Workbook, Google)**: la base de ingeniería para
  entrega progresiva como control de gobernanza. `https://sre.google/workbook/canarying-releases/`
  (verificado: primario) (audiencia: ingeniería; jurisdicción: global)
- **Fairlearn user guide, «Fairness in machine learning»**: una introducción práctica a daños de
  asignación y calidad de servicio y a métricas de disparidad, con ejemplos ejecutables.
  `https://fairlearn.org/main/user_guide/fairness_in_machine_learning.html` (verificado: primario)
  (audiencia: ingeniería; jurisdicción: global)
- **«Responsible Sourcing of Data Enrichment Services» (Partnership on AI)**: orientación práctica
  sobre condiciones de anotadores (pilotos, instrucciones, pago, comunicación, aseguramiento de
  calidad), el lado laboral de la gobernanza de datos.
  `https://partnershiponai.org/paper/responsible-sourcing-considerations/` (verificado: primario)
  (audiencia: gobernanza, liderazgo; jurisdicción: global)
- **JSON Schema Draft 2020-12**: la especificación en la que está escrita la biblioteca de
  plantillas; cualquier validador conforme verifica los registros.
  `https://json-schema.org/draft/2020-12` (verificado: primario) (audiencia: ingeniería;
  jurisdicción: global)

## Herramientas (categorías ilustrativas, no respaldos)

- **Inspect AI (UK AI Security Institute)**: un marco de eval abierto, el ejemplo de referencia para
  evals como evidencia y puertas de eval. `https://github.com/UKGovernmentBEIS/inspect_ai`
  (verificado: primario) (audiencia: ingeniería; jurisdicción: global)
- **Awesome Responsible AI (AthenaCore)**: un índice amplio y mantenido de recursos de IA
  responsable, confiable y centrada en el ser humano que abarca cada capa del stack.
  `https://github.com/AthenaCore/AwesomeResponsibleAI` (verificado: primario) (audiencia:
  ingeniería, gobernanza; jurisdicción: global)
- **Awesome Production Machine Learning (EthicalML)**: el índice de referencia de bibliotecas de
  código abierto para desplegar, monitorear, versionar y escalar ML; el mapa de herramientas para
  las capas 02 y 04. `https://github.com/EthicalML/awesome-production-machine-learning` (verificado:
  primario) (audiencia: ingeniería; jurisdicción: global)
- **awesome-opa (Open Policy Agent)**: el índice propio del ecosistema OPA de herramientas de
  política como código e integraciones para la capa 01.
  `https://github.com/open-policy-agent/awesome-opa` (verificado: primario) (audiencia: ingeniería;
  jurisdicción: global)
- **Awesome OSCAL (OSCAL Club)**: un índice curado de herramientas y recursos OSCAL para la
  evidencia legible por máquina de la capa 05. `https://github.com/oscal-club/awesome-oscal`
  (verificado: primario) (audiencia: ingeniería, gobernanza; jurisdicción: global)
- **awesome-ml-security (Trail of Bits)**: un índice curado de recursos de seguridad de aprendizaje
  automático que alimentan el red teaming de la capa 03 y los controles en tiempo de ejecución de la
  capa 04. `https://github.com/trailofbits/awesome-ml-security` (verificado: primario) (audiencia:
  ingeniería; jurisdicción: global)

## Libros

- **Fairness and Machine Learning: Limitations and Opportunities (Barocas, Hardt and Narayanan; MIT Press, 2023)**:
  el texto de referencia sobre qué pueden y qué no pueden decir los criterios de equidad; legible en
  línea en su totalidad. `https://fairmlbook.org/` (verificado: primario) (audiencia: ingeniería,
  investigación; jurisdicción: global)
- **Interpretable Machine Learning (Christoph Molnar)**: una guía práctica de modelos interpretables
  y métodos de explicación post-hoc, con sus limitaciones; legible en línea en su totalidad.
  `https://christophm.github.io/interpretable-ml-book/` (verificado: primario) (audiencia:
  ingeniería; jurisdicción: global)
- **Patterns, Predictions, and Actions (Hardt and Recht; Princeton University Press)**: aprendizaje
  automático desde la predicción hasta la acción, incluyendo los conjuntos de datos y benchmarks en
  los que se basa el campo; hay un preprint completo en línea. `https://mlstory.org/` (verificado:
  primario) (audiencia: ingeniería, investigación; jurisdicción: global)
- **Introduction to AI Safety, Ethics and Society (Dan Hendrycks; Taylor & Francis, 2024)**: un
  manual amplio sobre riesgos de IA, desde fallos de sistemas individuales hasta gobernanza; legible
  en línea. `https://www.aisafetybook.com/` (verificado: primario) (audiencia: gobernanza,
  liderazgo, investigación; jurisdicción: global)
- **The Algorithmic Foundations of Differential Privacy (Dwork and Roth, 2014)**: la referencia
  formal detrás de toda afirmación sobre privacidad diferencial que hace un proveedor.
  `https://www.cis.upenn.edu/~aaroth/Papers/privacybook.pdf` (verificado: primario) (audiencia:
  ingeniería, investigación; jurisdicción: global)
- **Site Reliability Engineering (Google)**: la disciplina operativa de la que toman prestados los
  controles en tiempo de ejecución, la respuesta a incidentes y los presupuestos de error; legible
  en línea en su totalidad. `https://sre.google/sre-book/table-of-contents/` (verificado: primario)
  (audiencia: ingeniería; jurisdicción: global)
- **Designing Machine Learning Systems (Chip Huyen; O'Reilly, 2022)**: el ciclo de vida en
  producción de sistemas de ML, desde datos hasta monitorización; enlazado aquí a través del
  repositorio complementario del autor. `https://github.com/chiphuyen/dmls-book` (verificado:
  primario) (audiencia: ingeniería; jurisdicción: global)
- **AI Engineering (Chip Huyen, 2025)**: construcción de aplicaciones sobre modelos fundacionales,
  con un tratamiento extenso de evaluación; enlazado aquí a través del repositorio complementario
  del autor. `https://github.com/chiphuyen/aie-book` (verificado: primario) (audiencia: ingeniería;
  jurisdicción: global)
- **Responsible AI: Best Practices for Creating Trustworthy AI Systems (Lu, Zhu, Whittle and Xu; Addison-Wesley, 2023)**:
  el tratamiento del equipo de CSIRO a nivel de libro sobre patrones de IA responsable y mecanismos
  de gobernanza.
  `https://www.informit.com/store/responsible-ai-best-practices-for-creating-trustworthy-9780138073923`
  (verificado: primario) (audiencia: ingeniería, gobernanza; jurisdicción: global)

## Cursos

- **Elements of AI (University of Helsinki and MinnaLearn)**: cursos en línea gratuitos que
  introducen IA a no expertos; una forma de iniciar el programa de alfabetización en IA que el
  artículo 4 solicita. `https://www.elementsofai.com/` (verificado: primario) (audiencia: liderazgo,
  gobernanza; jurisdicción: global)
- **Practical Data Ethics (fast.ai)**: un curso impartido por primera vez en el Data Institute de la
  University of San Francisco en 2020, sobre desinformación, sesgo y equidad, privacidad y
  vigilancia, y métricas. `https://ethics.fast.ai/` (verificado: primario) (audiencia: ingeniería,
  gobernanza; jurisdicción: global)
- **Made With ML (Goku Mohandas)**: un curso sobre diseño, desarrollo, despliegue e iteración en ML
  en producción, el pipeline en el que se conectan las puertas de gobernanza.
  `https://madewithml.com/` (verificado: primario) (audiencia: ingeniería; jurisdicción: global)
- **Frontier AI Governance (BlueDot Impact)**: un curso basado en cohortes sobre política y
  gobernanza de IA fronteriza. `https://bluedot.org/courses/ai-governance` (verificado: primario)
  (audiencia: gobernanza, liderazgo; jurisdicción: global)
- **AI Safety, Ethics and Society virtual course (Center for AI Safety)**: el curso que sigue al
  manual de Hendrycks anterior. `https://www.aisafetybook.com/virtual-course` (verificado: primario)
  (audiencia: gobernanza, investigación; jurisdicción: global)
- **Red Teaming LLM Applications (DeepLearning.AI, with Giskard)**: un curso corto y práctico sobre
  cómo encontrar y automatizar fallos de aplicaciones LLM.
  `https://www.deeplearning.ai/courses/red-teaming-llm-applications` (verificado: primario)
  (audiencia: ingeniería; jurisdicción: global)
- **Secure AI/ML-Driven Software Development, LFEL1012 (Linux Foundation)**: un curso corto y a tu
  propio ritmo sobre la seguridad del software construido con y alrededor de IA.
  `https://training.linuxfoundation.org/express-learning/secure-ai-ml-driven-software-development-lfel1012/`
  (verificado: primario) (audiencia: ingeniería; jurisdicción: global)
- **Machine Learning Crash Course: Fairness (Google for Developers)**: un módulo corto sobre tipos
  de sesgo y sobre identificación, mitigación y evaluación del sesgo.
  `https://developers.google.com/machine-learning/crash-course/fairness` (verificado: primario)
  (audiencia: ingeniería; jurisdicción: global)

## Comunidades y boletines

- **GRC Engineer (grcengineer.com)**: el centro de la comunidad matriz; el marco
  analista-vs-ingeniero y las definiciones de rol que este libro adapta. `https://grcengineer.com/`
  (verificado: primario) (audiencia: gobernanza, ingeniería; jurisdicción: global)
- **blog.grc.engineering, "GRC Engineering in 2026" (Justin Pagano)**: la visión prospectiva:
  guardrails de política como código en CI/CD, centros de operaciones de confianza, extensiones
  agentes. `https://blog.grc.engineering/p/grc-engineering-in-2026` (verificado: primario)
  (audiencia: gobernanza, ingeniería; jurisdicción: global)
- **IAPP (iapp.org)**: el organismo profesional cuyos informes, certificaciones y eventos mapean la
  profesión de gobernanza de IA. `https://iapp.org/` (verificado: primario) (audiencia: gobernanza,
  legal, liderazgo; jurisdicción: global)

**Correspondencias:** este capítulo no hace ninguna afirmación normativa; los estándares y marcos
que lista se tratan en profundidad en los capítulos 04, 05, 07 y 08. Los mapeos en otros lugares del
libro son ilustrativos, no una afirmación de conformidad.

## Sources

The reading list is its own source set: each entry above carries its URL and a verification tag
inline, and every URL is recorded as a row in this chapter's section of `sources/SOURCES.md`. Items
whose URL could not be drawn from the research digest or verified for this edition were left out.
The v0.5.0 additions were checked on 2026-09-24: each URL answered, arXiv entries were matched
against the arXiv API and DOIs against Crossref.
