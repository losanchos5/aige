---
lang: es
source: bok/patterns/rights-requests-against-models.md
sourceHash: "c0fce81a2c4fab7c428580e9c3ace2207604d6cba85f6b01897785da414b2a7b"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: rights-requests-against-models
title: Rights Requests Against Models
layer: 2
secondaryLayer: 5
order: 27
summary: "Enruta cada solicitud de titular de datos a cada lugar donde residen los datos de la persona, desde sistemas de origen hasta pesos del modelo, y ciérrala con un registro de cumplimiento."
---

# Patrón: Rights Requests Against Models

**Resumen:** Enruta cada solicitud de titular de datos (acceso, rectificación, supresión, oposición)
a cada lugar donde residen los datos de la persona en un sistema de IA: sistemas de origen,
instantáneas de entrenamiento y ajuste fino, índices de recuperación, registros de prompts y
salidas, conjuntos de eval y, donde el modelo no es anónimo, los pesos. Cada ubicación tiene una
respuesta preacodada en una escala que va desde la eliminación inmediata hasta el reentrenamiento
programado, y la solicitud se cierra con un registro de cumplimiento que dice qué se hizo dónde y
cuándo se cierra la brecha restante.

## Objetivos
Respeta los derechos de los titulares de datos dentro del plazo en todo el patrimonio de datos de
IA, no solo en la base de datos, y sé capaz de mostrar por cada solicitud qué ubicaciones se
alcanzaron, qué se hizo en cada una y qué versiones de modelo aún contienen los datos de la persona
hasta el próximo reentrenamiento.

## Usuarios objetivo
DPO, ingeniero de gobernanza de IA, equipo de plataforma de datos, ingeniero de ML.

## Partes interesadas afectadas
Titulares de datos, responsables del tratamiento y encargados del tratamiento en la cadena de
suministro de IA, autoridades de supervisión, propietarios de modelos.

## Principios relevantes
Registra y acota cada actor antes de que actúe; instrumenta la compilación para producir su propia
prueba; construye el control en el punto más temprano en el que puede bloquear.

## Contexto
El RGPD otorga a las personas derechos de acceso, rectificación, supresión y oposición, y el
responsable del tratamiento debe actuar sobre una solicitud dentro de un mes, prorrogable por dos
meses más para solicitudes complejas [1]. En un sistema de IA, los datos de la persona ya no residen
en una sola tabla. Si un modelo entrenado es anónimo se evalúa caso por caso: la opinión del CEPD
sobre modelos de IA establece cuándo un modelo entrenado con datos personales puede considerarse
anónimo y qué evidencia necesita el responsable del tratamiento, y un modelo que no supera la prueba
está en el alcance de los derechos [2]. La guía de la CNIL añade que un responsable del tratamiento
que no puede identificar a una persona en un conjunto de entrenamiento puede decirlo, que la persona
puede proporcionar información que hace posible la identificación, que el reentrenamiento responde a
una solicitud donde los datos aún se conservan, y que los filtros de salida son aceptables donde el
reentrenamiento es desproporcionado, si se demuestra que son efectivos [3]. La autoridad de
protección de datos de Hamburgo comienza en otro lugar, considerando que almacenar un modelo de
lenguaje grande no es un tratamiento y que los derechos se adhieren a las entradas y salidas del
sistema [4]. Un responsable del despliegue tiene que trabajar bajo cualquiera de estas
interpretaciones.

## Problema
Las herramientas de solicitud construidas para bases de datos se detienen en el CRM. El registro de
la misma persona también reside en una instantánea de ajuste fino, un índice de recuperación, tres
meses de registros de prompts y un conjunto de eval, y un modelo ajustado en esa instantánea puede
reproducirlo. Sin un mapa de la persona a esas ubicaciones, una supresión se cierra a tiempo y sigue
siendo incompleta; sin un registro por ubicación, nadie puede decir por qué se eligió la supresión
de salida sobre el reentrenamiento, o cuándo se enviará el reentrenamiento que cierra la brecha.

### Fuerzas
- **Completitud contra costo.** Eliminar una fila es barato; reentrenar un modelo grande para una
  solicitud no lo es, por lo que la respuesta a los pesos generalmente se realiza por etapas.
- **Plazo contra lote.** El reloj de un mes favorece medidas parciales rápidas ahora y completas en
  un cronograma.
- **Retención contra supresión.** Los responsables del despliegue de alto riesgo mantienen registros
  generados automáticamente durante al menos seis meses a menos que otra ley lo disponga de otro
  modo [5], mientras que la limitación del almacenamiento empuja en la otra dirección.
- **Verificabilidad.** Los métodos aproximados de desaprendizaje son difíciles de verificar, por lo
  que una afirmación de que la influencia de un registro ha desaparecido necesita una prueba, no una
  afirmación.

## Solución
Trata la solicitud como un trabajo de expansión sobre un mapa de datos, y el modelo como una
ubicación más.

1. **Un mapa de datos indexado por titular.** Construye el mapa a partir de la linealidad que ya
   mantienes: las fichas de datos, los registros de admisión de conjuntos de datos y el
   [AIBOM](/patterns/aibom) dicen qué instantáneas alimentaron qué versión de modelo, y el registro
   dice qué índices y registros escribe cada sistema. Mantén una clave de titular seudónima para que
   una solicitud pueda coincidir sin copiar identidades en el mapa.
2. **Una solicitud, muchos manejadores.** El enrutador abre un ticket y lo expande a un manejador
   por ubicación, cada uno con una respuesta preacodada: eliminar de sistemas de origen e
   instantáneas; eliminar o reindexar fragmentos de recuperación de inmediato; eliminar o
   seudonimizar registros dentro de la regla de retención; reemplazar registros de eval con
   sintéticos; marcar cada versión de modelo entrenada en una instantánea afectada.
3. **Una escala para los pesos.** Supresión de salida primero, como un filtro construido sobre
   reglas generales en lugar de una lista de nombres, probado como cualquier control. Luego
   reentrenamiento sin los datos, en un cronograma que agrupa solicitudes. Desaprendizaje automático
   solo como una afirmación a probar: métodos exactos como el entrenamiento fragmentado limitan lo
   que debe reentrenarse [6], y una prueba de inferencia de membresía en los registros eliminados
   verifica el resultado [7].
4. **Cierra la próxima versión.** La puerta de versión verifica que las supresiones pendientes se
   apliquen al conjunto de entrenamiento de la versión candidata, por lo que un reentrenamiento no
   puede reintroducir silenciosamente los datos.
5. **Un registro de cumplimiento por solicitud.** El flujo de trabajo lo escribe, no el DPO: cada
   ubicación, la acción tomada, las versiones de modelo afectadas, el reentrenamiento programado y
   si se cumplió el plazo.

Registro de cumplimiento ilustrativo para una solicitud de supresión contra `csa-01`:

```json
{
  "request_id": "dsr-2026-0412",
  "right": "erasure",
  "subject_key": "hash:7c1e09b4",
  "received_at": "2026-09-02",
  "due_by": "2026-10-02",
  "locations": [
    { "store": "crm", "action": "deleted" },
    { "store": "rag_index:csa-kb@2026-09", "action": "deleted_and_reindexed" },
    { "store": "fine_tune_set:csa-ft-07", "action": "deleted" },
    { "store": "logs:csa-01", "action": "deleted" },
    { "store": "eval_set:csa-regression-v9", "action": "replaced_with_synthetic" },
    { "store": "weights:csa-01@2026-08-30", "action": "output_suppression", "rule": "dsr-0412" }
  ],
  "models_flagged": ["csa-01@2026-08-30"],
  "retrain_scheduled": "csa-01@2026-10-15",
  "closed_at": "2026-09-30",
  "within_deadline": true
}
```

> **Ejemplo (ilustrativo)** Un cliente pide al operador de un asistente de soporte que borre sus
> datos. El enrutador encuentra a la persona en el CRM, un índice de recuperación, una instantánea
> de ajuste fino y 90 días de registros. Cuatro manejadores eliminan dentro de un día; los pesos
> obtienen un filtro de salida, probado contra los propios registros del cliente, y el próximo
> reentrenamiento programado descarta la instantánea. El registro de cumplimiento va al archivo del
> cliente y al almacén de garantía.

## Consecuencias
Las solicitudes se cierran a tiempo con evidencia por ubicación, y la brecha entre supresión y
reentrenamiento es visible y fechada en lugar de oculta. El costo es la linealidad lo
suficientemente buena para construir el mapa de datos, manejadores para cada almacén y capacidad de
reentrenamiento. Los filtros de supresión se filtran bajo prompts adversariales, por lo que son una
medida provisional con una fecha de vencimiento, no la respuesta.

## Patrones relacionados
[AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondencias:** RGPD Art. 12(3), Arts. 15–17, Art. 21 · Reglamento de IA Art. 26(6) · ISO/IEC
42001 A.7 · NIST AI RMF MEASURE 2.10, GOVERN 1.1 · OWASP LLM02:2026 · Layer 02 Inventory &
Transparency / Layer 05 Assurance & Continuous Compliance.

Los ids de amenaza siguen el OWASP Top 10 para Aplicaciones LLM 2026 [8], los ids de control ISO/IEC
42001 Anexo A [9] y los ids de subcategoría el NIST AI RMF [10]. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 12(3) one month, extendable by two further months; Arts. 15, 16, 17, 21). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity test at para 43; elements and documentation for the controller's evidence at paras 49–58). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[3] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; identification in training sets; retraining; output filters based on general rules; one month plus two). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[4] Discussion Paper: Large Language Models and Personal Data (storing an LLM is not processing; rights attach to system inputs and outputs). Hamburg Commissioner for Data Protection and Freedom of Information. 2024-07-15. https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf (verified: primary)
[5] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(6) deployers keep automatically generated logs for at least six months, unless Union or national law provides otherwise). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[6] Bourtoule et al., "Machine Unlearning" (SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[7] Shokri et al., "Membership Inference Attacks against Machine Learning Models" (arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[8] OWASP Top 10 for LLM Applications 2026 (LLM02 Sensitive Information Disclosure). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[9] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.7 data for AI systems). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[10] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.1 legal and regulatory requirements understood, managed and documented; MEASURE 2.10 privacy risk examined and documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
