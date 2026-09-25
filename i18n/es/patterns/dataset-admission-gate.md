---
lang: es
source: bok/patterns/dataset-admission-gate.md
sourceHash: "2e990980e7b5e71079ebe1f603a788526c6583e366dfbe7ac2ee5cf6fc972584"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: dataset-admission-gate
title: Dataset Admission Gate
layer: 1
secondaryLayer: 2
order: 21
summary: "Una puerta de política como código que permite que un trabajo de entrenamiento, evaluación o recuperación lea solo conjuntos de datos con un registro de admisión completo y firmado para ese uso."
---

# Patrón: Dataset Admission Gate

**Resumen:** Coloca una puerta delante de cada trabajo que lee datos para entrenar, ajustar,
validar, probar, evaluar o construir un índice de recuperación: el trabajo puede leer una versión de
conjunto de datos solo si existe un registro de admisión para ella, nombra el caso de uso del
trabajo entre sus usos permitidos y muestra que las comprobaciones de derechos, calidad,
representatividad, sesgo e integridad pasaron o fueron renunciadas por alguien autorizado a
renunciar a ellas. La comprobación es política como código en la tubería, por lo que un campo
faltante falla la ejecución en lugar de un recordatorio en una wiki.

## Objetivos
Decide si los datos pueden usarse y si son adecuados para el propósito, antes de que un modelo
aprenda de ellos, porque un problema de calidad puede corregirse después y un problema de derechos o
envenenamiento a menudo no.

## Usuarios objetivo
Ingeniero de gobernanza de IA, propietarios y administradores de datos, equipo de plataforma ML,
asesor de privacidad, ingeniero de seguridad.

## Partes interesadas afectadas
Interesados y titulares de derechos, personas afectadas por los resultados del modelo (especialmente
grupos que los datos subrepresentan), propietarios del modelo, auditores y organismos notificados.

## Principios relevantes
Construye el control en el punto más temprano en el que pueda bloquear; da a cada control poder;
instrumenta la compilación para producir su propia prueba.

## Contexto
Plataformas de datos que permiten que cualquier equipo lea cualquier tabla a la que puedan acceder,
almacenes de características compartidos entre modelos y trabajos de entrenamiento lanzados desde
cuadernos. Para sistemas de alto riesgo, el Reglamento de IA de la UE convierte la gobernanza de
datos en requisitos: los conjuntos de entrenamiento, validación y prueba deben estar sujetos a
prácticas que cubran, entre otras, su origen, preparación, el «examen con vistas a posibles sesgos»
y «medidas apropiadas para detectar, prevenir y mitigar posibles sesgos» (`Art. 10(2)(f)` y `(g)`),
y deben ser «pertinentes, suficientemente representativos y, en la mayor medida posible, libres de
errores y completos con vistas a la finalidad prevista» (`Art. 10(3)`) [1]. Después del Omnibus
Digital, la base estrecha para el tratamiento de categorías especiales de datos personales para
detectar y corregir sesgos se encuentra en un nuevo `Art. 4a` [2].

## Problema
Los datos entran en los modelos a través del camino de menor resistencia, y las razones por las que
no deberían hacerlo se descubren después del entrenamiento.

- **Fuerzas.** Los científicos de datos necesitan datos rápidamente e iteran a menudo. La persona
  que quiere que se use un conjunto de datos no debe ser la única que decide que puede serlo. Las
  comprobaciones de derechos, calidad y sesgo se encuentran con diferentes propietarios. El
  tratamiento ilícito en la fase de desarrollo puede afectar la legalidad del uso posterior del
  modelo: la EDPB lo dijo así en su Opinión 28/2024 [3]. Los datos de entrenamiento también son una
  superficie de ataque: ATLAS cataloga el envenenamiento de datos de entrenamiento (`AML.T0020`) [4]
  y OWASP enumera el envenenamiento de datos y modelos como `LLM05:2026` [5].
- **Modo de fallo.** Un modelo se entrena con datos fuera de su alcance de consentimiento, en una
  muestra que pierde la población a la que servirá, en etiquetas que nadie auditó o en una
  instantánea que alguien alteró. El problema surge en producción o en una auditoría, y la solución
  es un reentrenamiento con datos que deberían haber sido rechazados en primer lugar.

## Solución
Dale a cada versión de conjunto de datos un registro de admisión, y haz que cada trabajo que lee
datos presente uno.

1. **Escribe el registro de admisión.** Por versión de conjunto de datos y por tubería permitida,
   reutiliza el
   [esquema de registro de admisión de conjunto de datos](/resources/templates#schema-dataset-admission-record)
   publicado (`dataset-admission-record.v1`): el asunto, la tubería (entrenamiento, ajuste fino,
   validación, prueba, evaluación o índice de recuperación), el sistema objetivo, la ficha de datos
   vinculada, la decisión (admitir, admitir con condiciones, rechazar), las comprobaciones con la
   obligación que cada una impone, el hash de contenido de la instantánea admitida, el actor y una
   firma.
2. **Comprueba los derechos primero.** La base legal y la compatibilidad de propósito para datos
   personales, la licencia y la comprobación de reserva de derechos provienen del
   [Registro de Derechos de Datos de Entrenamiento](/patterns/training-data-rights-ledger); una
   fuente sin una fila de registro falla la admisión.
3. **Comprueba la idoneidad para el propósito.** Medidas de calidad (precisión de etiquetas,
   integridad, consistencia, actualidad) en el vocabulario de la serie ISO/IEC 5259 [6]; cantidad
   por clase y por grupo contra los tamaños mínimos de celda en el plan de prueba; representatividad
   contra la población de despliegue indicada en el registro de caso de uso; un examen de proxy y
   sesgo con el resultado registrado; y, donde se utilizan datos de categoría especial para la
   detección de sesgos, las condiciones `Art. 4a` [2].
4. **Comprueba la integridad.** Admite una instantánea dirigida por contenido y firmada; reverifica
   el hash cuando el trabajo la lee; ejecuta comprobaciones de anomalías en datos nuevos o añadidos.
   ATLAS enumera «Sanitize Training Data» (`AML.M0007`) y «Maintain AI Dataset Provenance»
   (`AML.M0025`) entre sus mitigaciones [4]. Registra la procedencia en términos W3C PROV
   (entidades, actividades y agentes) [7] y emite eventos de linaje (conjuntos de datos, trabajos y
   ejecuciones) para que cada ejecución de entrenamiento nombre los registros de admisión que leyó
   [8].
5. **Separa los deberes.** El propietario de los datos es responsable y firma; el administrador de
   datos opera las comprobaciones; una pequeña junta de revisión resuelve las admisiones
   controvertidas. La lista de verificación mínima vive como código, por lo que agregar una
   comprobación es un cambio revisado.
6. **Aplica en tiempo de lectura.** El trabajo presenta su id de caso de uso y sistema objetivo; la
   política deniega la lectura a menos que el registro admita esa tubería para ese uso. Una hoja de
   datos legible viaja con el registro, cubriendo motivación, composición, recopilación,
   preprocesamiento, usos, distribución y mantenimiento [9].
7. **Readmite en caso de cambio.** Una nueva versión, una nueva fuente, deriva de calidad, un cambio
   de licencia, una solicitud de borrado o un nuevo caso de uso reabre la admisión.

El AI RMF pide que las consideraciones de recopilación y selección de datos (disponibilidad,
representatividad, idoneidad) sean «identificadas y documentadas» (MAP 2.3) y que los riesgos
legales de datos de terceros se mapeen (MAP 4.1) [10].

Registro de admisión ilustrativo, válido contra `dataset-admission-record.v1`:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/dataset-admission-record.v1.json",
  "control_id": "data.admission.v2",
  "subject": "claims-2019-2025@v4",
  "pipeline": "training",
  "target_system": "fraud-triage@3.0.0",
  "dataset_card": "https://evidence.example.org/cards/claims-2019-2025/v4",
  "decision": "admit_with_conditions",
  "checks": [
    { "check_id": "ledger.rows_present", "requirement": "Training-data rights ledger", "result": "pass" },
    { "check_id": "lawful_basis.compatible", "requirement": "GDPR Art. 6(4)", "result": "pass",
      "detail": "compatibility assessment CA-2026-014" },
    { "check_id": "use_case.permitted", "requirement": "uc-fraud-triage-03", "result": "pass" },
    { "check_id": "quality.label_agreement", "requirement": "EU AI Act Art. 10(3)", "result": "pass",
      "detail": "0.91 inter-annotator agreement" },
    { "check_id": "representativeness.region", "requirement": "EU AI Act Art. 10(3)", "result": "waived",
      "detail": "islands region below minimum cell; waiver W-2026-007 signed by data owner" },
    { "check_id": "bias.examination", "requirement": "EU AI Act Art. 10(2)(f)-(g)", "result": "pass" },
    { "check_id": "integrity.snapshot_hash", "result": "pass" }
  ],
  "conditions": ["collect islands-region claims before the next retrain", "report the islands cell as insufficient data"],
  "input_hash": "sha256:3b7e9c2a41f08d6e5c1b2a9f7e3d4c5b6a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d",
  "actor": "ci-data-gate",
  "timestamp": "2026-09-20T10:12:00Z",
  "signature": "ed25519:Hk3v8QpZ2sL7dT4rW9xY1aB6cE0fG5jM"
}
```

> **Ejemplo (ilustrativo)** Un equipo de clasificación de fraude apuntó un trabajo de entrenamiento
> al almacén de reclamaciones completo. La puerta lo rechazó: el almacén no tenía registro de
> admisión para entrenamiento, y dos de sus fuentes no tenían fila de registro. El equipo admitió
> una instantánea más estrecha en su lugar, con una comprobación de representatividad renunciada por
> escrito y una condición para recopilar datos para la región faltante antes del próximo
> reentrenamiento. La renuncia y la condición ahora aparecen en la ficha del modelo, y el próximo
> reentrenamiento no puede comenzar hasta que se cierre la condición.

## Consecuencias
Ningún modelo aprende de datos que nunca fueron admitidos para su uso; las comprobaciones de
derechos, calidad y sesgo dejan evidencia antes del entrenamiento en lugar de explicaciones después;
y la linaje hacia adelante puede encontrar cada modelo que un conjunto de datos deficiente alcanzó.
Los costos: la puerta ralentiza el trabajo exploratorio a menos que exista una tubería de espacio
aislado con su propia admisión más ligera; las renuncias necesitan un propietario y una fecha de
vencimiento o se convierten en la norma; y las comprobaciones son solo tan buenas como los umbrales
detrás de ellas.

## Patrones relacionados
[Training-Data Rights Ledger](/patterns/training-data-rights-ledger);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering);
[Fairness Eval Suite](/patterns/fairness-eval-suite); [AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card); [AI Threat Model](/patterns/ai-threat-model).

**Correspondencias:** Reglamento de IA de la UE Art. 10(2)–(4), Art. 4a · RGPD Art. 5(1)(b), Art.
6(4) · ISO/IEC 42001 A.7.2, A.7.4, A.7.5, A.7.6 · NIST AI RMF (Map 2.3, 4.1) · OWASP LLM05:2026 ·
Layer 01 Govern-as-Code / Layer 02 Inventory & Transparency.

Los IDs de amenaza siguen el OWASP Top 10 para Aplicaciones LLM 2026 [5] y MITRE ATLAS [4]; las
etiquetas de función y subcategoría siguen el NIST AI RMF [10]; los ids del Anexo A de ISO/IEC 42001
siguen un mapa cruzado publicado, no el texto del estándar [11]. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 10 (data and data governance: 10(2)(f) examination in view of possible biases, 10(2)(g) measures to detect, prevent and mitigate them; 10(3) relevant, sufficiently representative, free of errors and complete; 10(4) setting of use) (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on processing special categories of personal data for bias detection and correction, replacing Art. 10(5)); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity of models; legitimate interest; consequences of unlawful processing in development). European Data Protection Board. 2024-12. https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en (verified: primary)
[4] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0020 Training Data Poisoning; mitigations AML.M0007 Sanitize Training Data and AML.M0025 Maintain AI Dataset Provenance). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[5] OWASP Top 10 for LLM Applications 2026 (LLM05:2026 Data and Model Poisoning). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[6] ISO/IEC 5259 series, Data quality for analytics and machine learning (ML): Part 1 overview, terminology and examples (2024); Part 2 data quality measures (2024); Part 3 data quality management requirements and guidelines (2024); Part 4 data quality process framework (2024); Part 5 data quality governance framework (2025). ISO/IEC. 2024–2025. https://www.iso.org/standard/81088.html (verified: primary)
[7] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[8] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs, with facets). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[9] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[10] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 2.3 data collection and selection considerations "identified and documented"; MAP 4.1 legal risks of components incl. third-party data). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[11] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.7.2 data for development and enhancement, B.7.4 quality of data, B.7.5 data provenance, B.7.6 data preparation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
