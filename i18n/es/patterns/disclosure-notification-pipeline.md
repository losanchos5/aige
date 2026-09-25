---
lang: es
source: bok/patterns/disclosure-notification-pipeline.md
sourceHash: "75d5ce887866ae0d4a4feb2e51693f55cd836ceeb2c2162e40ccf2c1d8501291"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: disclosure-notification-pipeline
title: "Disclosure & Notification Pipeline"
layer: 5
secondaryLayer: 2
order: 32
summary: "Divulgaciones y notificaciones generadas desde el registro, desde plantillas versionadas por audiencia y reloj, con cada notificación enviada registrada como evidencia."
---

# Patrón: Disclosure & Notification Pipeline

**Resumen:** Genera cada declaración dirigida hacia el exterior sobre un sistema de IA desde una
única fuente de verdad, el registro: las divulgaciones proactivas (un aviso de interacción con IA,
etiquetas de contenido, la página de transparencia y la ficha de sistema en lenguaje sencillo,
notificaciones a trabajadores y a personas sujetas a decisiones) y las notificaciones reactivas (al
proveedor, autoridades, personas afectadas, clientes y el público) que un disparador inicia en un
reloj. Las plantillas se versionan como código, las aprobaciones se registran, y cada notificación
enviada es un registro de evidencia con su audiencia, versión de plantilla e indicación de hora.

## Objetivos
Asegúrate de que las personas y organismos que deben saber sobre un sistema de IA reciban la
información correcta, a tiempo, desde una única voz, y puedan probar qué se dijo a quién y cuándo.

## Usuarios objetivo
Ingeniero de gobernanza de IA, responsable de comunicaciones, legal y cumplimiento, DPD, ingeniero
de producto.

## Partes interesadas afectadas
Usuarios, trabajadores y sus representantes, personas afectadas, clientes comerciales y socios,
proveedores y responsables del despliegue en toda la cadena, autoridades de supervisión y vigilancia
del mercado, el público y los medios.

## Principios relevantes
Instrumenta la construcción para producir su propia prueba; haz que el camino gobernado sea el
camino más fácil; da dientes a cada control.

## Contexto
Los deberes de transparencia ahora se adjuntan a superficies y relojes específicos. Conforme al
Reglamento de IA de la UE, los proveedores deben diseñar sistemas que interactúen con personas para
que sepan que es un sistema de IA, y deben marcar las salidas sintéticas; los responsables del
despliegue deben informar a las personas expuestas al reconocimiento de emociones o categorización
biométrica y divulgar falsificaciones profundas; y la información debe llegar a las personas a más
tardar en la primera interacción o exposición (`Art. 50(1)`–`(5)`) [1]. El artículo 50 se ha
aplicado desde el 2 de agosto de 2026, y los sistemas generativos ya en el mercado antes de esa
fecha tienen hasta el 2 de diciembre de 2026 para marcar salidas [2]. Los responsables del
despliegue de alto riesgo también deben informar a los trabajadores antes del uso en el lugar de
trabajo, informar a las personas sujetas a decisiones del Anexo III, e informar al proveedor y a las
autoridades cuando un sistema presenta un riesgo (`Art. 26(5)`, `(7)`, `(11)`) [1]. El RGPD añade la
notificación de violación a la autoridad en el plazo de 72 horas cuando sea viable y a las personas
afectadas sin demora indebida cuando el riesgo para ellas sea alto [3]. Fuera de la UE, la Ley
Básica de IA de Corea ha requerido notificación previa de IA generativa e IA de alto impacto y
etiquetas en salidas generadas desde el 22 de enero de 2026 [4]; la Ley de Transparencia de IA de
California, operativa desde el 2 de agosto de 2026, pide a los grandes proveedores de IA generativa
divulgaciones latentes y opcionales manifiestas [5]; y Utah requiere una respuesta clara cuando un
consumidor pregunta si está hablando con IA [6]. Establecer planes de comunicación externa es parte
de gobernar el despliegue y el uso en el Body of Knowledge AIGP de IAPP (competencia IV.C) [7].

## Problema
Las divulgaciones se escriben una vez, a mano, por superficie, y se desvían de lo que se ejecuta: la
página de transparencia describe el modelo del año pasado, el aviso del widget de chat desapareció
en un rediseño, y nadie puede decir qué trabajadores fueron informados antes de que el sistema se
pusiera en marcha. Las notificaciones reactivas se redactan bajo presión cuando el reloj ya está
corriendo, por quien esté disponible, sin un registro de lo que se envió. El deber de cada
jurisdicción es manejado por un equipo diferente con una plantilla diferente.

### Fuerzas
- **Una voz contra muchas audiencias.** Un regulador, un cliente y la prensa necesitan contenido
  diferente de los mismos hechos.
- **Velocidad contra precisión.** Los relojes corren desde la conciencia, mientras que los hechos
  llegan tarde; una declaración provisional debe decir solo lo que se sabe.
- **Consistencia contra localización.** Los deberes y los idiomas difieren por jurisdicción, pero
  los hechos no deben hacerlo.
- **Proactivo contra reactivo.** Los deberes de divulgación son continuos; los deberes de
  notificación se activan en eventos.

## Solución
Trata la divulgación como un pipeline desde el registro a cada audiencia, con evidencia al final.

1. **Una única fuente de verdad.** La entrada del registro contiene los hechos en los que se basan
   las divulgaciones: propósito, proveedor, versión del modelo, jurisdicciones, si el sistema
   interactúa con personas, genera contenido, toma decisiones sobre personas o se usa en el trabajo.
   La página de transparencia y la ficha de sistema en lenguaje sencillo se generan desde ella en
   cada lanzamiento, por lo que no pueden desviarse de lo que se ejecuta.
2. **Una matriz de deberes por sistema.** Un conjunto de reglas mapea hechos del registro a deberes:
   divulgación de interacción, marcado de contenido y etiquetas, información a trabajadores,
   notificaciones de decisión (ver
   [Decision Notice & Contest Path](/patterns/decision-notice-contest-path)), notificaciones locales
   por jurisdicción. Cada deber nombra una superficie, una plantilla y una prueba de que la
   notificación se renderiza allí.
3. **Plantillas como código.** Las plantillas por audiencia e idioma viven en control de versiones
   con un propietario y una regla de aprobación; un cambio de plantilla es un diff revisado. Las
   declaraciones provisionales existen en esqueleto antes de cualquier incidente.
4. **Disparadores con relojes.** Un incidente, una violación, un cambio material, una depreciación o
   una retirada emite un disparador; el pipeline selecciona las audiencias de la matriz y el
   [Downstream Use Register](/patterns/downstream-use-register), inicia cada reloj y redacta cada
   notificación. Los incidentes llegan desde el [Incident Pipeline](/patterns/incident-pipeline).
5. **Evidencia por notificación.** Cada notificación enviada escribe un registro: audiencia,
   disparador, versión de plantilla, aprobador, canal, indicación de hora. El registro de decisión
   de despliegue apunta a los proactivos (sus deberes `workers_informed` y
   `affected_persons_informed`, en el
   [esquema de registro de decisión de despliegue](/resources/templates#schema-deployment-decision-record)),
   y el bloque de informe del registro de incidente apunta a los reactivos.

Manifiesto de divulgación ilustrativo generado desde el registro, con una notificación enviada:

```json
{
  "subject": "csa-01@2026-09-18",
  "generated_at": "2026-09-18T07:00:00Z",
  "proactive": [
    { "duty": "EU AI Act Art. 50(1)", "surface": "chat widget", "template": "ai-disclosure.es-en.v3", "test": "e2e:disclosure-renders" },
    { "duty": "Korea AI Basic Act Art. 31(1)", "surface": "terms of service (KR)", "template": "kr-prior-notice.ko.v1", "test": "e2e:kr-terms-notice" },
    { "duty": "transparency page", "surface": "/ai/csa-01", "template": "system-card.v2", "test": "build:card-matches-registry" }
  ],
  "reactive": [
    { "trigger": "serious_incident", "audience": "provider", "clock": "immediately", "template": "si-notice.v2" },
    { "trigger": "personal_data_breach", "audience": "supervisory_authority", "clock": "72h where feasible", "template": "breach-art33.v4" },
    { "trigger": "material_change", "audience": "business_customers", "clock": "30 days before, per contract", "template": "change-notice.v2" }
  ],
  "sent": [
    {
      "notice_id": "ntc-2026-0091",
      "trigger": "material_change",
      "audience": "business_customers",
      "template": "change-notice.v2",
      "approved_by": "communications-owner",
      "sent_at": "2026-09-01T10:00:00Z"
    }
  ]
}
```

> **Ejemplo (ilustrativo)** Un asistente de soporte se traslada a un nuevo modelo de proveedor. El
> lanzamiento regenera la ficha de sistema y la página de transparencia desde el registro, el
> pipeline envía la notificación de cambio contractual a clientes comerciales 30 días antes desde la
> plantilla aprobada, y una comprobación en CI falla la construcción cuando un widget de chat
> rediseñado ya no renderiza el aviso de interacción con IA.

## Consecuencias
Lo que la organización dice sobre su IA coincide con lo que se ejecuta, las notificaciones salen a
tiempo desde plantillas aprobadas, y cada una es comprobable. El coste es la matriz de deberes a
mantener conforme cambien las leyes, la propiedad de plantillas entre legal, comunicaciones y
producto, y pruebas de renderizado en cada superficie. El pipeline produce la notificación; si la
notificación se entiende aún necesita pruebas con sus lectores.

## Patrones relacionados
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[Incident Pipeline](/patterns/incident-pipeline);
[Downstream Use Register](/patterns/downstream-use-register);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Correspondencias:** Reglamento de IA Art. 26(5), Art. 26(7), Art. 26(11), Art. 50 · RGPD Art. 33,
Art. 34 · Ley Básica de IA de Corea Art. 31 · ISO/IEC 42001 A.8.2, A.8.3, A.8.4, A.8.5 · NIST AI RMF
MANAGE 4.3, GOVERN 4.2, GOVERN 5.1 · Layer 05 Assurance & Continuous Compliance / Layer 02 Inventory
& Transparency.

Los ids de control siguen ISO/IEC 42001 Annex A [8] y los ids de subcategoría el NIST AI RMF [9].
Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(5), (7) and (11) deployer information duties; Art. 50(1)–(5) transparency obligations). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Art. 111(4): Art. 50(2) marking for generative systems placed on the market before 2 Aug 2026 from 2 Dec 2026); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 33 notification to the supervisory authority within 72 hours where feasible; Art. 34 communication to the data subject). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[4] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Act No. 20676, in force 2026-01-22; Art. 31 prior notice, output labelling and realistic synthetic content). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[5] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[6] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (disclosure on clear request; high-risk AI interaction; effective 2025-05-07). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[7] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: establish external communication plans; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[8] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.8.3 external reporting; A.8.4 communication of incidents; A.8.5 information for interested parties). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 4.2 impacts documented and communicated more broadly; GOVERN 5.1 feedback from those external to the team; MANAGE 4.3 incidents and errors communicated to relevant AI actors, including affected communities). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
