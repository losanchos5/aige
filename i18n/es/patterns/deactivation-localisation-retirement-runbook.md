---
lang: es
source: bok/patterns/deactivation-localisation-retirement-runbook.md
sourceHash: "b3bd2689b5ce44e9a23c2fb7e6824d011975d7e17d8518ec6dc57e8ddd53488c"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: deactivation-localisation-retirement-runbook
title: "Deactivation, Localisation & Retirement Runbook"
layer: 4
secondaryLayer: 2
order: 33
summary: "Un manual de procedimientos perforado para degradar, apagar por jurisdicción o retirar un sistema de IA, con desencadenantes nombrados, una autoridad de decisión y evidencia en cada paso."
---

# Patrón: Deactivation, Localisation & Retirement Runbook

**Resumen:** Escribe, antes de que sea necesario, cómo se degrada un sistema de IA, se apaga, se
restringe a las jurisdicciones donde puede ejecutarse y finalmente se retira: el umbral y los
desencadenantes legales, el rol que decide, la evidencia preservada primero, los modos graduados
cortos de apagado, los interruptores por jurisdicción y los pasos de retiro desde el análisis de
dependencia hasta una entrada de registro retirada. Construye los interruptores como alternadores
probados, realiza simulacros en un calendario y registra cada decisión y paso como evidencia.

## Objetivos
Haz que detener, restringir y retirar un sistema de IA sea un procedimiento ejecutable y probado con
un propietario de decisión nombrado, para que un desencadenante regulatorio o de rendimiento
conduzca a una acción acotada dentro de horas, y una retirada no deje ninguna copia en ejecución,
ninguna credencial activa y ninguna evidencia perdida.

## Usuarios objetivo
Ingeniero de gobernanza de IA, propietario del sistema, SRE, ingeniero de seguridad, legal.

## Partes interesadas afectadas
Usuarios y personas afectadas, trabajadores que dependen del sistema, consumidores posteriores,
proveedores e implementadores en la cadena, autoridades de vigilancia del mercado.

## Principios relevantes
Da a cada control poder; registra y limita cada actor antes de que actúe; instrumenta la compilación
para producir su propia prueba.

## Contexto
Algunos desencadenantes para detener un sistema son legales, no técnicos. Bajo el Reglamento de IA
de la UE, un responsable del despliegue de alto riesgo que tenga razones para considerar que el
sistema presenta un riesgo debe informar al proveedor y a la autoridad y suspender el uso
(`Art. 26(5)`); un proveedor debe tomar medidas correctivas, incluida la retirada, desactivación o
recuperación de un sistema no conforme (`Art. 20`); una autoridad puede exigir lo mismo para un
sistema que presenta un riesgo (`Art. 79`); y una práctica puede convertirse en prohibida (`Art. 5`)
[1]. El NIST AI RMF pide mecanismos, con responsabilidades asignadas, para reemplazar, desconectar o
desactivar sistemas cuyo rendimiento o resultados sean inconsistentes con el uso previsto, y
procesos para desmantelar sistemas de manera segura, de una manera que no aumente el riesgo [2]. Los
registros sobreviven al sistema: los proveedores mantienen documentación durante diez años e
implementadores mantienen registros durante al menos seis meses [1]. Crear una política y controles
para desactivar o localizar un sistema cuando la regulación o el rendimiento lo requieren es parte
de gobernar el despliegue y el uso en el Cuerpo de Conocimiento IAPP AIGP (competencia IV.C) [3].
Para agentes, el [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) es la forma
instantánea de este manual de procedimientos.

## Problema
La mayoría de los sistemas tienen un interruptor de encendido y una esperanza. Cuando se dispara un
desencadenante, nadie sabe quién puede decidir, los registros se sobrescriben mientras se ejecuta la
reunión, y la única acción disponible es apagar todo, en todas partes, lo que a menudo es peor que
el fallo. Un clasificador integrado en un producto de proveedor no tiene interruptor en absoluto. En
el retiro, una entrada se elimina del inventario mientras una copia sigue sirviendo, una cuenta de
servicio permanece activa y la evidencia de que el sistema fue alguna vez gobernado se pierde con
ella.

### Fuerzas
- **Velocidad contra deliberación.** Un desencadenante legal exige una acción rápida; un apagado con
  dependientes necesita un plan de contingencia listo.
- **Precisión contra simplicidad.** Apagar una región, idioma o grupo limita el daño y añade
  interruptores para construir y probar.
- **Preservación contra eliminación.** La evidencia debe congelarse antes de que se detenga nada,
  mientras que la protección de datos impulsa a eliminar lo que ya no es necesario.
- **Sistemas integrados en proveedores.** Cuando el modelo está dentro del producto de un proveedor,
  el interruptor depende del contrato.

## Solución
Mantén un runbook por sistema, almacenado con su entrada de registro y ejercitado en el calendario
de mantenimiento.

1. **Desencadenantes y autoridad.** Lista los desencadenantes de umbral (un piso incumplido y no
   recuperado en una ventana, una brecha de equidad por encima de su límite, una gravedad de
   incidente) y desencadenantes legales (el deber `Art. 26(5)`, una acción correctiva del proveedor,
   una medida de una autoridad, una práctica recién prohibida), cada uno con el rol que decide y el
   tiempo permitido. Las brechas llegan desde el
   [Drift & Fairness Monitor](/patterns/drift-fairness-monitor).
2. **Preservar primero.** El primer paso de cada ruta congela los registros, aplica una retención
   legal e instantánea las versiones fijadas, para que la evidencia sobreviva al apagado.
3. **Modos graduados.** Construye los modos intermedios como alternadores operacionales y pruébalos:
   solo asesoramiento, umbrales de confianza elevados con abstención a una persona, respuestas solo
   fundamentadas, desactivadas para un grupo, idioma, región o función, de vuelta a la cohorte
   piloto, y apagadas con el proceso de contingencia.
4. **Localización por jurisdicción.** Mantén la jurisdicción como entrada de política: conjuntos de
   reglas por jurisdicción como código, instancias regionales donde la residencia las requiere, y
   banderas por región para que un mercado pueda apagarse sin tocar los otros. Lanza en una
   jurisdicción solo cuando se demuestre que se cumplen sus deberes.
5. **Retiro como runbook.** Analiza dependencias (el
   [Downstream Use Register](/patterns/downstream-use-register) lista consumidores), mueve usuarios
   al plan de contingencia, envía avisos de fin de vida a través del
   [Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline), archiva la
   instantánea de evidencia final, mantén o desecha pesos, corpus y registros según la licencia,
   base legal y retención decidan, revoca cada identidad y credencial, establece la entrada de
   registro en `retired`, y deja que [Shadow-AI Discovery](/patterns/shadow-ai-discovery) confirme
   que ninguna copia sigue ejecutándose. El registro utiliza el
   [esquema de runbook de desmantelamiento](/resources/templates#schema-decommissioning-runbook).
6. **Pruébalo.** Ejecuta un simulacro de desactivación al menos anualmente por sistema: tiempo para
   decidir, tiempo hasta el modo degradado, tiempo hasta apagado, y si la evidencia fue preservada.

Registro de retiro ilustrativo, como runbook de desmantelamiento:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/decommissioning-runbook.v1.json",
  "runbook_id": "rb-retire-csa-01",
  "subject": "csa-01@2026-09-18",
  "reason": "replaced",
  "replaced_by": "csa-02",
  "decision_ref": "ddr-csa-02-v1",
  "dependencies": ["contact-centre routing", "weekly quality report"],
  "notifications": [
    { "party": "users", "method": "Release note to contact-centre agents", "sent_at": "2027-03-01" },
    { "party": "deployers", "method": "Change notice to the PT business unit", "sent_at": "2027-03-01" }
  ],
  "steps": [
    { "step_id": "S1", "action": "archive_evidence", "detail": "Freeze logs and snapshot pinned versions.", "owner": "ai-governance", "status": "done", "completed_at": "2027-03-29T08:00:00Z" },
    { "step_id": "S2", "action": "disable_traffic", "detail": "Flag csa01.serve off in every region.", "owner": "ml-platform", "status": "done", "completed_at": "2027-03-31T06:00:00Z" },
    { "step_id": "S3", "action": "revoke_identity", "detail": "Revoke the workload identity and API keys.", "owner": "platform-identity", "status": "done", "completed_at": "2027-03-31T07:00:00Z" },
    { "step_id": "S4", "action": "retire_register_entry", "detail": "Set status to retired; keep the entry.", "owner": "ai-governance", "status": "done", "completed_at": "2027-03-31T09:00:00Z" },
    { "step_id": "S5", "action": "other", "detail": "Discovery sweep confirms no copy still serves.", "owner": "security-operations", "status": "pending" }
  ],
  "data_disposition": [
    { "dataset": "chat logs", "action": "retain", "basis": "log retention rule and open complaints", "until": "2027-09-30" },
    { "dataset": "retrieval index csa-kb", "action": "delete" }
  ],
  "evidence_archive": { "location": "https://archive.example.org/ai/csa-01", "retain_until": "2033-03-31" },
  "status": "in_progress"
}
```

> **Ejemplo (ilustrativo)** Una regla nacional recién aplicable restringe respuestas automatizadas
> sobre temas de salud en un mercado. El runbook nombra al jefe de la unidad de negocio como
> propietario de la decisión; dentro del día la evidencia se congela, la bandera regional cambia el
> asistente a respuestas solo fundamentadas allí con temas de salud desactivados, otros mercados no
> se tocan, y la decisión, los alternadores y los avisos están en el almacén de aseguramiento.

## Consecuencias
El apagado se vuelve proporcionado y rápido, la localización es un interruptor en lugar de un
redesplegamiento, y el retiro deja un registro completo y retenido en lugar de una brecha. El costo
es construir y probar los modos y banderas, conjuntos de reglas por jurisdicción para mantener
actualizados, términos de contrato que den un interruptor sobre IA integrada en proveedores, y
tiempo de simulacro. Un modo no probado no es un control: el simulacro es lo que lo convierte en
uno.

## Patrones relacionados
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Downstream Use Register](/patterns/downstream-use-register);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).

**Correspondencias:** Reglamento de IA Art. 5, Art. 18, Art. 20, Art. 26(5), Art. 26(6), Art. 79 ·
ISO/IEC 42001 A.6.2.5, A.6.2.6 · NIST AI RMF GOVERN 1.7, MANAGE 2.4, MANAGE 4.1 · OWASP Agentic
ASI10 · Layer 04 Runtime Controls & Observability / Layer 02 Inventory & Transparency.

Los ids de amenaza siguen el OWASP Top 10 for Agentic Applications 2026 [4], los ids de control
ISO/IEC 42001 Annex A [5] y los ids de subcategoría el NIST AI RMF [2]. Los mapeos son ilustrativos,
no una afirmación de conformidad.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 5 prohibited practices; Art. 18(1) documentation kept ten years; Art. 20 corrective actions; Art. 26(5) suspend and inform; Art. 26(6) logs kept at least six months; Art. 79 systems presenting a risk). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.7 decommissioning and phasing out safely; MANAGE 2.4 supersede, disengage or deactivate; MANAGE 4.1 post-deployment monitoring plans, including decommissioning). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[3] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: a policy and controls to deactivate or localise an AI system as necessary; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[4] Top 10 for Agentic Applications 2026 (ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.6.2.5 AI system deployment; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
