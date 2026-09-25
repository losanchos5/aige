---
lang: es
source: bok/patterns/sanctioned-ai-gateway.md
sourceHash: "88e9d0d9330fb56a063e5432a1a541f0b365831e5eb900ce73567c56aa2083c9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: sanctioned-ai-gateway
title: Sanctioned AI Gateway
layer: 4
secondaryLayer: 2
order: 28
summary: "Herramientas de IA aprobadas detrás de un inicio de sesión único y una puerta de enlace que aplica reglas de clase de datos, registra el uso y comprueba una atestación de uso aceptable actual."
---

# Patrón: Sanctioned AI Gateway

**Resumen:** Coloca las herramientas de IA aprobadas de la organización y las APIs de modelos detrás
de un inicio de sesión único y una puerta de enlace que aplica la política de uso aceptable como
código: reglas de clase de datos sobre qué se puede enviar, redacción o bloqueo donde la clase lo
requiere, un evento de decisión por llamada y acceso condicionado a una atestación de uso aceptable
actual. La puerta de enlace es la ruta sancionada y está construida para ser la más fácil; el
descubrimiento encuentra lo que la rodea.

## Objetivos
Permite que el personal use herramientas de IA de forma productiva mientras mantiene los datos
regulados, confidenciales y secretos fuera de herramientas que no están aprobadas para ello, y
convierte la política de uso aceptable de una página de manual en un control que decide y deja
evidencia.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de seguridad, equipo de plataforma, compras.

## Partes interesadas afectadas
Empleados y contratistas, clientes cuyos datos maneja el personal, comités de empresa o
representantes de empleados, el DPD, proveedores de herramientas de IA.

## Principios relevantes
Haz que la ruta gobernada sea la ruta más fácil; construye el control en el punto más temprano en el
que puede bloquear; registra y limita cada actor antes de que actúe.

## Contexto
El personal adopta herramientas de IA más rápido de lo que las compras pueden aprobarlas. En una
encuesta de proveedores de 2024 a 31.000 trabajadores del conocimiento en 31 países, el 78% de los
usuarios de IA dijeron que traen sus propias herramientas de IA al trabajo [1]. La organización ya
tiene una política de uso aceptable que enumera las herramientas aprobadas y las entradas prohibidas
por clase de datos (véase
[uso aceptable de IA por parte del personal](/bok/governance-program#acceptable-use-of-ai-by-staff)),
y el Reglamento de IA de la UE, modificado por el Omnibus Digital, pide a los proveedores y
responsables del despliegue que adopten medidas para apoyar la alfabetización en materia de IA del
personal que utiliza IA en su nombre [2]. El modo de fallo es conocido: el caso de
[código fuente pegado en un chatbot público](/cases/chatbot-code-leak-reported) (reportado) es la
versión cotidiana, y la divulgación de información sensible es una clase de riesgo nombrada para
aplicaciones LLM [3].

## Problema
Una política que vive en un manual no tiene fuerza: se lee una vez, se atestigua una vez y nunca se
evalúa en el momento en que alguien pega un archivo de cliente en una herramienta pública. Bloquear
cada herramienta pública empuja el uso a dispositivos personales, donde nada se ve. El
descubrimiento solo encuentra la fuga después de que ha ocurrido.

### Fuerzas
- **Conveniencia contra control.** Cada paso adicional en la ruta aprobada devuelve a las personas a
  la no aprobada.
- **Inspección contra privacidad.** Registrar los prompts del personal es en sí mismo un tratamiento
  de datos personales de los empleados, por lo que la puerta de enlace mantiene lo que el control
  necesita, durante el tiempo que lo necesita [4].
- **Latencia contra redacción.** La clasificación de contenido y la redacción añaden tiempo a cada
  llamada.
- **Términos del proveedor contra drift.** Una herramienta aprobada solo es segura en los términos
  en los que fue aprobada, como sin entrenamiento en entradas de clientes, y esos términos cambian.

## Solución
Haz que una puerta de enlace sea la ruta sancionada hacia la IA y hazla la ruta más rápida.

1. **Un catálogo de herramientas aprobadas como [Policy Card](/patterns/policy-card).** Cada entrada
   nombra la herramienta, los términos del contrato en los que fue aprobada, las clases de datos y
   casos de uso para los que está permitida, y su fecha de revisión. El
   [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) la alimenta.
2. **Una ruta de entrada.** Las APIs de modelos se alcanzan a través de una puerta de enlace de IA o
   proxy LLM, y las herramientas basadas en navegador a través de inicio de sesión único y una
   puerta de enlace web segura o política de navegador (categorías ilustrativas, no una lista de
   productos). Las cuentas personales en herramientas aprobadas se reemplazan por tenencias
   empresariales.
3. **Reglas de clase de datos en la puerta de enlace.** Un clasificador de contenido etiqueta cada
   solicitud por clase de datos y la tarjeta decide: permitir, permitir con redacción o bloquear con
   una razón y una ruta a la herramienta correcta. La matriz de clase de datos contra herramienta
   proviene de la política de uso aceptable.
4. **Acceso en atestación.** El proveedor de identidad otorga el rol de puerta de enlace solo
   mientras una atestación de uso aceptable actual y su módulo de capacitación estén registrados (el
   [esquema de registro de capacitación](/resources/templates#schema-training-record)).
5. **Un evento de decisión por llamada.** La puerta de enlace escribe un registro de evidencia
   firmado (decisión, clase de datos, herramienta, redacciones, un hash de la entrada en lugar de la
   entrada) en el almacén de aseguramiento, en la forma del
   [esquema de registro de evidencia](/resources/templates#schema-evidence-record).
6. **Descubrimiento como bucle de retroalimentación.**
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery) lee datos de identidad, red y gastos para
   herramientas fuera de la puerta de enlace; cada hallazgo se convierte en una solicitud de
   admisión (registrar, clasificar, aprobar o reemplazar) antes de convertirse en una sanción.

Evento de decisión de puerta de enlace ilustrativo, como registro de evidencia:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/evidence-record.v1.json",
  "control_id": "gateway.data-class.confidential.v4",
  "subject": "genai-gateway@2026.09.2",
  "decision": "allow",
  "obligation": "ISO/IEC 42001 A.9.2",
  "failure_mode": "customer data sent to a tool not approved for it",
  "input_hash": "sha256:4be1c07e9d52",
  "actor": "user:pseudo-8841",
  "timestamp": "2026-09-18T09:12:44Z",
  "signature": "ed25519:MEUCIQDx3k",
  "extensions": {
    "tool": "drafting-assistant@enterprise",
    "data_class": "confidential",
    "action": "allowed_with_redaction",
    "redactions": 2,
    "attestation": "tr-2026-0877"
  }
}
```

> **Ejemplo (ilustrativo)** Un equipo legal comienza a usar un asistente de redacción público para
> resúmenes de contratos. El descubrimiento marca el tráfico; en lugar de bloquear el dominio, el
> programa de gobernanza firma un acuerdo empresarial sin entrenamiento en datos de clientes, añade
> la herramienta al catálogo para datos confidenciales con redacción de identificadores personales y
> la enruta a través de la puerta de enlace. El uso se traslada a la ruta sancionada en cuestión de
> semanas porque ahora es la más fácil.

## Consecuencias
El uso aceptable se vuelve exigible y medible: la organización puede mostrar qué se envió dónde,
bajo qué regla y cuánto uso ocurre fuera de la puerta de enlace. El coste es la puerta de enlace en
sí, el ajuste del clasificador (los bloqueos falsos erosionan la confianza rápidamente), el
mantenimiento del catálogo a medida que cambian los términos del proveedor y el trabajo de
privacidad para registrar proporcionadamente. La puerta de enlace cubre las herramientas que
frontal; los modelos locales y dispositivos personales siguen siendo un problema de descubrimiento.

## Patrones relacionados
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Policy Card](/patterns/policy-card);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondencias:** Reglamento de IA Art. 4 · RGPD Art. 5(1)(c) · ISO/IEC 42001 A.2, A.9.2, A.10.3
· NIST AI RMF GOVERN 2.2, GOVERN 6.1, MANAGE 3.1 · OWASP LLM02:2026 · Layer 04 Runtime Controls &
Observability / Layer 02 Inventory & Transparency.

Los IDs de amenaza siguen el OWASP Top 10 for LLM Applications 2026 [3], los IDs de control ISO/IEC
42001 Annex A [5] y los IDs de subcategoría el NIST AI RMF [6]. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Sources

[1] "AI at Work Is Here. Now Comes the Hard Part" (2024 Work Trend Index; 31,000 people in 31 countries; 78% of AI users bring their own AI tools to work). Microsoft and LinkedIn. 2024-05-08. https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Art. 4 replaced: providers and deployers take measures to support the development of AI literacy); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] OWASP Top 10 for LLM Applications 2026 (LLM02 Sensitive Information Disclosure; ids used in the Maps to line). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[4] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 5(1)(c) data minimisation). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.2 policies related to AI; A.9.2 processes for responsible use of AI systems; A.10.3 suppliers). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[6] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 2.2 personnel and partners receive AI risk management training; GOVERN 6.1 policies for third-party AI risks; MANAGE 3.1 third-party risks regularly monitored). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
