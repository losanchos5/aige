---
lang: es
source: bok/patterns/decision-notice-contest-path.md
sourceHash: "0c90b68790ca1efb894ab8be4670c23c1957277b6e7b9e71472e60313bff602b"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: decision-notice-contest-path
title: "Decision Notice & Contest Path"
layer: 4
secondaryLayer: 5
order: 26
summary: "Un aviso en el punto de una decisión automatizada, vinculado a su registro de decisión, y una ruta de contestación a un revisor con el poder de cambiar el resultado."
---

# Patrón: Decision Notice & Contest Path

**Resumen:** Cuando un sistema de IA toma o forma una decisión sobre una persona, envía un aviso en
el punto de decisión, generado desde el registro de decisión, que dice que un sistema estuvo
involucrado, da las razones principales y dice cómo contestar; y ejecuta una ruta de contestación a
un revisor con la autoridad y la información para cambiar el resultado. El aviso, la contestación y
el resultado de la revisión son todos registros, por lo que el derecho a contestar se evidencia
decisión por decisión en lugar de afirmarse en una política.

## Objetivos
Haz cada decisión automatizada consecuente explicable a, y contestable por, la persona a la que
afecta, y deja un registro que muestre que el aviso se envió, que la contestación fue escuchada y
que el resultado se mantuvo o cambió por una razón establecida.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de producto, DPO, el propietario de operaciones de la
decisión (crédito, reclamaciones, contratación).

## Partes interesadas afectadas
Solicitantes, clientes, empleados y otras personas afectadas; revisores humanos; autoridades de
supervisión y vigilancia del mercado; auditores.

## Principios relevantes
Comienza desde un modo de fallo nombrado o daño; instrumenta la construcción para producir su propia
prueba; da a cada control dientes.

## Contexto
Un sistema desplegado decide, o forma una decisión, sobre una persona: crédito, seguros, un trabajo,
acceso a un servicio. Varios regímenes adjuntan deberes a ese mismo momento. Bajo el Artículo 22 del
RGPD una decisión únicamente automatizada con efectos legales o similarmente significativos se
permite solo en una base estrecha, y entonces con al menos el derecho a obtener intervención humana,
a expresar un punto de vista y a contestar la decisión; los Artículos 13(2)(f) y 15(1)(h) añaden
información significativa sobre la lógica involucrada [1]. El Tribunal de Justicia ha sostenido que
una puntuación de crédito es en sí misma tal decisión cuando los prestamistas le dan un papel
determinante [2]. En el Reino Unido, los Artículos 22A a 22D, en vigor desde el 5 de febrero de
2026, requieren información sobre la decisión, la oportunidad de hacer representaciones,
intervención humana y una forma de contestar [3].

Bajo el Reglamento de IA, los responsables del despliegue de sistemas de alto riesgo del Anexo III
que toman o asisten decisiones sobre personas deben decirles que el sistema se usa (`Art. 26(11)`),
y una persona afectada puede obtener una explicación clara y significativa del papel del sistema y
los elementos principales de la decisión (`Art. 86`), un derecho que se aplica solo donde el derecho
de la Unión no lo proporciona ya [4]. A partir del 2024-09-24 los requisitos del Anexo III se
aplican desde el 2 de diciembre de 2027 [5]. `Art. 86` en sí mismo ha aplicado desde el 2 de agosto
de 2026 (`Art. 113`) [4], pero se adjunta a decisiones basadas en sistemas de alto riesgo del Anexo
III, por lo que en la lectura de este sitio tiene trabajo que hacer solo desde el 2 de diciembre
de 2027. Un acreedor estadounidense que toma una acción adversa debe notificar al solicitante dentro
de 30 días de una solicitud completada, con las razones principales específicas [6]. La CFPB dijo en
2022 que un algoritmo complejo no excusa razones vagas [7], pero retiró esa circular el 12 de mayo
de 2025; el deber de Regulación B en sí mismo no ha cambiado [6][12]. Colorado añade, desde el 1 de
enero de 2027, un aviso de uso, una explicación en lenguaje claro de un resultado adverso y revisión
humana para decisiones automatizadas en áreas consecuentes [8].

## Problema
Cada régimen tiende a ser respondido por su cuenta: una plantilla de carta propiedad de operaciones,
una bandeja de apelaciones propiedad del servicio al cliente, una página de explicación propiedad de
legal. Ninguno de ellos está vinculado al registro de decisión, por lo que nadie puede mostrar qué
aviso recibió una persona dada, qué razones dio, si esas razones fueron los factores que el modelo
realmente usó, o qué hizo el revisor con la contestación. Una ruta de contestación que termina en un
revisor que confirma casi cada salida en segundos no es una participación humana significativa; es
una cola.

### Fuerzas
- **Fidelidad contra legibilidad.** Las razones deben ser los factores que el modelo realmente usó,
  pero lo suficientemente cortas y claras para que una persona actúe sobre ellas.
- **Relojes contra capacidad.** Los avisos se ejecutan en plazos (30 días bajo Regulación B), y una
  revisión real cuesta tiempo de personal que escala con la tasa de contestación.
- **Divulgación contra protección.** La información significativa sobre la lógica tiene que
  coexistir con secretos comerciales y con no enseñar a las personas a jugar con el modelo; el
  Tribunal de Justicia deja ese equilibrio a la autoridad o tribunal, no al responsable del
  tratamiento solo [9].
- **Una decisión, muchos regímenes.** El mismo rechazo puede caer bajo el RGPD, el Reglamento de IA,
  una ley sectorial y una ley estatal estadounidense a la vez, cada una con su propio contenido,
  audiencia y reloj.

## Solución
Construye el aviso y la contestación como dos servicios alrededor de un registro de decisión.

1. **Registro de decisión primero.** En tiempo de ejecución, escribe un registro por decisión:
   sistema y versión de modelo, entradas por referencia, resultado, códigos de razón, si la decisión
   fue únicamente automatizada, la base legal y los regímenes que aplican. El lado de revisión sigue
   el [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).
2. **Aviso de plantillas versionadas.** Un servicio de aviso lee el registro y renderiza el aviso
   desde una plantilla por régimen e idioma: que un sistema fue usado, las razones principales, qué
   puede hacer la persona y por cuándo. La versión de plantilla y la hora de envío se escriben de
   vuelta al registro. Una eval de fidelidad de código de razón, ejecutada como un
   [Eval Gate in CI](/patterns/eval-gate-in-ci), verifica que las razones que un aviso da sean los
   factores que el modelo usó.
3. **Una ruta de contestación con autoridad.** Una contestación abre un caso vinculado al id de
   decisión y enrutado a un revisor que no tomó la decisión original, que ve las entradas, las
   razones y las representaciones de la persona, y que puede cambiar el resultado. El tiempo para
   decidir y las tasas de reversión se monitorean por grupo: un revisor que confirma casi todo es
   una señal, no una salvaguarda.
4. **Cierra el bucle.** El resultado de la revisión, su razón y cualquier corrección se escriben al
   registro. Las tasas de contestación y reversión alimentan el
   [Drift & Fairness Monitor](/patterns/drift-fairness-monitor), y un grupo de decisiones anuladas
   en un código de razón abre un problema contra el modelo.

Registro de aviso de decisión ilustrativo, escrito por el servicio de aviso y completado por la ruta
de contestación:

```json
{
  "decision_id": "cc4-2026-09-18-0192",
  "subject": "credit-check-04@3.2",
  "solely_automated": true,
  "regimes": ["GDPR Art. 22", "Regulation B 1002.9"],
  "outcome": "declined",
  "reason_codes": ["R07 payment arrears", "R12 short credit history"],
  "notice": {
    "template": "adverse-action.en.v5",
    "sent_at": "2026-09-18T10:02:11Z",
    "due_by": "2026-10-18"
  },
  "contest": {
    "opened_at": "2026-09-20T08:14:00Z",
    "reviewer_role": "credit-review-l2",
    "outcome": "overturned",
    "reason": "Arrears cleared; the applicant supplied the settlement statement.",
    "closed_at": "2026-09-23T15:40:00Z"
  }
}
```

> **Ejemplo (ilustrativo)** Un servicio de financiación de terminales de una operadora rechaza a un
> solicitante. El servicio de notificación envía el rechazo con dos códigos de razón y un enlace de
> impugnación en el plazo de una hora. El solicitante impugna con un extracto de liquidación, un
> revisor de segunda línea revoca el rechazo, y la tasa de revocación del código de razón R07 entra
> en la siguiente revisión de umbral del modelo.

## Consecuencias
La notificación y la impugnación de cada persona pueden producirse bajo solicitud, y el canal de
impugnación se convierte en un sensor de error del modelo e injusticia. El coste es un servicio de
notificación con plantillas por régimen para mantener actualizado, capacidad de revisores con
autoridad real, y una eval de fidelidad de código de razón. Las razones fieles pero poco útiles
siguen sin resolver el problema de la persona, así que prueba las notificaciones con las personas
que las reciben.

## Patrones relacionados
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Rights Requests Against Models](/patterns/rights-requests-against-models).

**Correspondencias:** Reglamento de IA Art. 26(11), Art. 86 · RGPD Art. 13(2)(f), Art. 15(1)(h),
Art. 22 · RGPD del Reino Unido Arts. 22A–22D · ECOA / Regulation B 12 CFR 1002.9 · ISO/IEC 42001
A.8.2, A.9.2 · NIST AI RMF MEASURE 3.3, MANAGE 4.1, MAP 3.5 · Layer 04 Runtime Controls &
Observability / Layer 05 Assurance & Continuous Compliance.

Los ids de control siguen ISO/IEC 42001 Annex A [10] y los ids de subcategoría el NIST AI RMF [11].
Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 13(2)(f), 14(2)(g), 15(1)(h), 22). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[3] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[4] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(11) informing persons subject to Annex III decisions; Art. 86(1) and (3) right to explanation, subsidiary to other Union law; Art. 113, general application from 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Annex III high-risk requirements from 2 Dec 2027); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[6] 12 CFR 1002.9 (Regulation B, notifications: 1002.9(a)(1) action taken notified within 30 days of a completed application; 1002.9(b)(2) specific principal reasons). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[7] Consumer Financial Protection Circular 2022-03, Adverse action notification requirements in connection with credit decisions based on complex algorithms (ECOA and Regulation B; withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14, although the page shows no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[8] SB26-189, Automated Decision-Making Technology (repeals and re-enacts SB 24-205; signed 2026-05-14; effective 2027-01-01; deployer notice, 30-day explanation, human review, three-year records). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[9] Press release No 22/25: judgment in Case C-203/22, Dun & Bradstreet Austria (explanation of the procedure and principles actually applied; an algorithm alone is not an explanation; trade secrets balanced by the authority or court). Court of Justice of the EU. 2025-02-27. https://curia.europa.eu/site/upload/docs/application/pdf/2025-02/cp250022en.pdf (verified: primary)
[10] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.9.2 processes for responsible use of AI systems). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[11] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 3.5 human oversight processes; MEASURE 3.3 feedback and appeal processes for end users and impacted communities; MANAGE 4.1 post-deployment monitoring plans, including appeal and override). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[12] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
