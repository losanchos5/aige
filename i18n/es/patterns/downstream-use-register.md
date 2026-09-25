---
lang: es
source: bok/patterns/downstream-use-register.md
sourceHash: "f84d166dd4281cb06775468258a2e6c681be6b23130230ce233dc30679fcb3c7"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: downstream-use-register
title: Downstream Use Register
layer: 2
secondaryLayer: 1
order: 31
summary: "Usos previstos y prohibidos como una Policy Card, cada consumidor de las salidas de un sistema registrado contra su entrada de registro, y procedencia marcada en las salidas."
---

# Patrón: Downstream Use Register

**Resumen:** Registra, contra la entrada de registro de cada sistema, para qué sus salidas pueden y
no pueden usarse y quién realmente las consume: otros sistemas, equipos, socios y modelos entrenados
con ellas. Los usos previstos y prohibidos se escriben como una Policy Card; cada consumidor se
registra con su uso, su aprobación y la re-prueba que lo autorizó; las salidas llevan procedencia y
advertencias para que un consumidor sepa qué está usando; y el uso fuera de propósito se monitorea
en tiempo de ejecución. El uso secundario, la expansión de funciones y el daño descendente se hacen
visibles, y un cambio o retirada puede llegar a todos los que afecta.

## Objetivos
Pronostica y limita los usos para los que un sistema no fue aprobado, haz que cada consumidor
descendente de sus salidas sea conocido y responsable, y da a los procesos de cambio, incidente y
retirada una lista de a quién informar.

## Usuarios objetivo
Ingeniero de gobernanza de IA, propietario del sistema, equipo de plataforma de datos, gestor de
producto.

## Partes interesadas afectadas
Personas afectadas por decisiones descendentes, equipos y socios consumidores, responsables del
despliegue de un sistema de un proveedor, auditores y autoridades de vigilancia del mercado.

## Principios relevantes
Registra y limita cada actor antes de que actúe; comienza desde un modo de fallo o daño nombrado;
haz que el camino gobernado sea el camino más fácil.

## Contexto
Los sistemas se usan para más de lo que fueron aprobados. El Reglamento de IA de la UE nombra el
concepto: la utilización indevida razonablemente previsible es el uso no conforme a la finalidad
prevista que puede resultar del comportamiento humano razonablemente previsible o de la interacción
con otros sistemas (`Art. 3(13)`), los proveedores deben evaluar riesgos bajo ella (`Art. 9(2)(b)`),
y un responsable del despliegue que cambie la finalidad prevista de un sistema de modo que se
convierta en de alto riesgo asume los deberes del proveedor (`Art. 25(1)(c)`) [1]. Los proveedores
de sistemas generativos deben marcar las salidas sintéticas de manera legible por máquina
(`Art. 50(2)`) [1], que es procedencia que un consumidor puede leer. Las salidas que alimentan otros
componentes son una superficie de ataque también: el manejo impropio de salidas, donde las salidas
del modelo pasan descendentes sin validación, es una clase de riesgo nombrada [2], y en sistemas
agénticos el error de un agente puede cascada a través de otros [3]. Gobernar el despliegue y el uso
ahora incluye pronosticar y reducir daños secundarios y descendentes; el Body of Knowledge AIGP de
IAPP lo enumera bajo la competencia IV.C [4].

## Problema
Un registro documenta sistemas, no en qué se convierten sus salidas. Una puntuación de riesgo
aprobada para priorizar revisiones manuales se convierte, un año después, en un rechazo automático
en el pipeline de otro equipo; las salidas de un modelo de resumen se recopilan como datos de
entrenamiento; un socio recibe salidas bajo un contrato que nadie conectado al registro conoce.
Ninguno de estos consumidores fue evaluado, ninguno es notificado cuando el modelo cambia, y el
runbook de retirada no puede encontrarlos. Donde las salidas moldean los datos de los que aprende la
siguiente versión, el bucle de retroalimentación tampoco es visible.

### Fuerzas
- **Reutilización contra propósito.** Reutilizar un buen modelo es barato y útil; cada reutilización
  puede ser también un nuevo propósito sin evaluar.
- **Apertura contra control.** Las salidas publicadas a través de una API o una plataforma de datos
  son fáciles de consumir y difíciles de rastrear.
- **Advertencias contra usabilidad.** Marcar la procedencia y los límites en cada salida añade peso
  que los consumidores pueden eliminar.
- **Predicción contra certeza.** El uso indebido debe imaginarse antes de que ocurra, sin datos que
  prueben la predicción.

## Solución
Dale al uso posterior un registro, y haz que el registro sea la única forma de obtener las salidas.

1. **Usos como [Policy Card](/patterns/policy-card).** Los usos previstos del sistema y su espacio
   negativo (usos prohibidos, poblaciones y contextos para los que no fue validado) son reglas en
   una tarjeta almacenada con la entrada del registro del
   [Agent Registry](/patterns/agent-registry), no un párrafo en una ficha de modelo.
2. **Predicción antes del lanzamiento.** Ejecuta un premortem ("dentro de un año esto causó daño:
   ¿cómo?"), casos de abuso escritos junto a las historias de usuario, y un mapa de impacto de
   partes interesadas que incluya personas que nunca tocan la interfaz. Cada uso indebido plausible
   se convierte en una regla de uso prohibido o un monitor.
3. **Consumidores como entradas.** Cada consumidor (un sistema, un equipo, un socio, un pipeline de
   entrenamiento) se registra contra el sistema productor con su propósito, su aprobación, la
   reprueba que autorizó las salidas para ese nuevo contexto y el contrato que vincula a una parte
   externa. El acceso a la API de salida o tabla se otorga por consumidor registrado, por lo que un
   consumidor no registrado no tiene credencial.
4. **Procedencia en salidas.** Las salidas llevan el sistema productor y versión, el uso previsto y
   una advertencia, como metadatos que un consumidor puede leer (para contenido generativo, la marca
   que el Reglamento de IA requiere de los proveedores).
5. **Uso fuera de propósito como señal.** Clasifica el tráfico y las solicitudes de consumidores
   contra el espacio negativo y alerta sobre lo que cae fuera de él; observa las salidas que
   regresan como datos de entrenamiento (bucles de retroalimentación).
6. **Propagación en cambio.** Un cambio de modelo, un incidente o una retirada lee el registro y
   notifica a cada consumidor a través del
   [Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline).

Entrada ilustrativa del registro de uso posterior:

```json
{
  "subject": "risk-score-02@4.1",
  "policy_card": "uses.risk-score-02.v3",
  "intended_uses": ["prioritise claims for manual review"],
  "prohibited_uses": ["automatic decline of a claim", "pricing", "use on commercial policies"],
  "consumers": [
    {
      "consumer": "claims-triage-service",
      "type": "system",
      "use": "queue ordering for human review",
      "approved_at": "2026-03-02",
      "retest": "eval:rs2-claims-triage-v3",
      "credential": "svc-claims-triage"
    },
    {
      "consumer": "reinsurance-partner-a",
      "type": "partner",
      "use": "aggregate statistics only, no row-level scores",
      "approved_at": "2026-05-11",
      "contract": "dpa-2026-017 schedule 3"
    }
  ],
  "output_stamp": ["producer", "version", "intended_use", "caveat"],
  "feedback_loop_check": "scores excluded from the training labels of risk-score-03",
  "reviewed_at": "2026-09-10"
}
```

> **Ejemplo (ilustrativo)** Un equipo de fraude solicita puntuaciones de riesgo a nivel de fila para
> rechazar reclamaciones automáticamente. La solicitud llega como un registro de consumidor, se
> encuentra con una regla de uso prohibido en la tarjeta y va al comité como un nuevo propósito,
> donde es rechazada; el equipo obtiene un feed de prioridad de revisión en su lugar. Cuando el
> modelo se reentrena, ambos consumidores registrados reciben el aviso de cambio y vuelven a
> ejecutar sus pruebas de aceptación.

## Consecuencias
El uso secundario se decide en lugar de descubrirse, los consumidores se conocen cuando el modelo
cambia o se retira, y los bucles de retroalimentación se verifican a propósito. El costo es el
registro en sí, el control de acceso por consumidor en las salidas, la reprueba para nuevos
contextos y la fricción de decir no a la reutilización útil. El registro vincula bien a los
consumidores internos; los externos dependen de los términos del contrato y los derechos de
auditoría.

## Patrones relacionados
[Policy Card](/patterns/policy-card);
[Agent Registry](/patterns/agent-registry);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Correspondencias:** Reglamento de IA Art. 3(13), Art. 9(2)(b), Art. 25(1)(c), Art. 50(2) · ISO/IEC
42001 A.8.2, A.9.4, A.10.4 · NIST AI RMF MAP 1.1, MAP 3.3, MANAGE 1.4 · OWASP LLM10:2026, OWASP
Agentic ASI08 · Layer 02 Inventory & Transparency / Layer 01 Govern-as-Code.

Los ids de amenaza siguen el OWASP Top 10 para Aplicaciones LLM 2026 [2] y el OWASP Top 10 para
Aplicaciones Agentes 2026 [3], los ids de control ISO/IEC 42001 Anexo A [5] y los ids de
subcategoría el NIST AI RMF [6]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 3(13) reasonably foreseeable misuse; Art. 9(2)(b) risks under reasonably foreseeable misuse; Art. 25(1)(c) changed intended purpose; Art. 50(2) machine-readable marking of synthetic outputs). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] OWASP Top 10 for LLM Applications 2026 (LLM10 Improper Output Handling). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI08 Cascading Failures). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: forecast and reduce risks of secondary or unintended uses and downstream harms; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.9.4 intended use of the AI system; A.10.4 customers). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[6] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 1.1 intended purposes and prospective settings documented; MAP 3.3 targeted application scope specified; MANAGE 1.4 negative residual risks to downstream acquirers and end users documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
