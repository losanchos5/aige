---
lang: es
source: bok/patterns/training-data-rights-ledger.md
sourceHash: "9b631239e9232bef3b67a7cf72410a930581d03bdd7d48f616d6851aea3fd522"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: training-data-rights-ledger
title: Training-Data Rights Ledger
layer: 2
order: 20
summary: "Un registro por fuente del derecho a entrenar: canal de adquisición, licencia, verificación de exclusión y usos permitidos, unido a linaje para que cada modelo conozca sus fuentes."
---

# Patrón: Training-Data Rights Ledger

**Resumen:** Mantén una fila de registro por fuente de entrenamiento (no por dataset fusionado) que
registre cómo se adquirieron los datos, bajo qué licencia o base legal, si se verificaron las
reservas de derechos y cómo, y qué usos están permitidos; luego une el registro al linaje para que
cada versión de modelo liste las filas en las que se entrenó. El registro responde "¿teníamos
derecho a usar esto?" por fuente, y "¿qué modelos se ven afectados?" cuando una licencia, una
exclusión u una orden cambia la respuesta.

## Objetivos
Haz del derecho a entrenar un hecho registrado y consultable antes del entrenamiento, y mantenlo
verdadero después, para que una retirada, una solicitud de borrado o una orden judicial puedan
cumplirse solo para los modelos afectados, y probarse.

## Usuarios objetivo
Ingeniero de gobernanza de IA, responsables de adquisición de datos y licencias, administradores de
datos, asesor legal y de privacidad, equipo de plataforma ML.

## Partes interesadas afectadas
Titulares de derechos y editores, interesados, proveedores de modelos y responsables del despliegue
posterior, la Oficina de IA y otras autoridades, tribunales y reguladores.

## Principios relevantes
Instrumenta la compilación para producir su propia prueba; construye el control en el punto más
temprano en que pueda bloquear; comienza desde un modo de fallo o daño nombrado.

## Contexto
Un proveedor que entrena o ajusta modelos en una mezcla de datos internos, corpora licenciados,
datasets abiertos, contenido web rastreado y datos de usuarios, ensamblados por diferentes equipos
en diferentes momentos. Los derechos se adjuntan por fuente y a veces por registro, pero el
entrenamiento consume corpora fusionados.

## Problema
Las cuestiones legales se deciden por fuente; la evidencia generalmente se mantiene, si es que se
mantiene, por proyecto.

- **Fuerzas.** Para contenido puesto a disposición pública en línea, la excepción de minería de
  texto y datos de la UE se mantiene solo donde el titular de derechos no ha reservado sus derechos
  "de manera apropiada, como por medios legibles por máquina" (Directiva DSM `Art. 4(3)`) [1], y un
  tribunal de Hamburgo sostuvo en diciembre de 2025 que una reserva escrita en términos de uso en
  lenguaje natural no cumplía ese estándar, con una apelación adicional permitida [2]. Un proveedor
  de modelo de uso general debe mantener una política de derechos de autor que identifique y cumpla
  con tales reservas y debe publicar un resumen suficientemente detallado del contenido de
  entrenamiento (`Art. 53(1)(c)` y `(d)`) [3]. Cómo se adquirieron los datos importa tanto como su
  licencia: en *Bartz v. Anthropic* el tribunal separó libros comprados y escaneados legalmente de
  descargas pirateadas [4]. Los datos personales traen limitación de propósito y la prueba de
  compatibilidad para procesamiento adicional (RGPD `Art. 5(1)(b)`, `Art. 6(4)`) [5].
- **Modo de fallo.** Nadie puede decir qué fuentes entrenaron qué versión de modelo, o en qué
  términos. Una única fuente sin licencia u obtenida ilícitamente contamina cada modelo entrenado en
  ella, y los remedios pueden alcanzar el modelo mismo: la orden de la FTC a Everalbum requería la
  eliminación de "cualquier modelo o algoritmo desarrollado en todo o en parte usando" los datos
  utilizados ilícitamente [6]. Sin linaje por fuente, la única respuesta segura es eliminar todo.

## Solución
Haz del registro el boleto de admisión para cada fuente de entrenamiento, y haz que el linaje apunte
de vuelta a él.

1. **Una fila por fuente.** Registra el id y versión de la fuente, el canal de adquisición (entrega
   licenciada, API, rastreo, carga de usuario, sistema interno), el licenciante, la referencia de
   licencia y sus términos para entrenamiento, uso comercial y distribución de modelos derivados, la
   base legal donde los datos son personales, y los usos permitidos. Para contenido rastreado,
   registra la identidad del rastreador, la ventana y la verificación de reserva de derechos: el
   método (por ejemplo `robots.txt` y metadatos de página leídos en el momento de la búsqueda), el
   resultado y la fecha. Los deberes de gobernanza de datos del Reglamento de IA de la UE para
   sistemas de alto riesgo nombran los mismos hechos: "procesos de recopilación de datos y el origen
   de los datos" y, para datos personales, "el propósito original de la recopilación de datos"
   (`Art. 10(2)(b)`) [3].
2. **Puerta en la fila.** La compilación del corpus y el
   [Dataset Admission Gate](/patterns/dataset-admission-gate) fallan cuando una fuente no tiene fila
   de registro, cuando sus términos no permiten el uso declarado, o cuando su verificación de
   reserva falta o está obsoleta.
3. **Une el registro al linaje.** Cada ejecución de entrenamiento registra las filas de registro (id
   y versión) que leyó, y el [AIBOM](/patterns/aibom) lista los datasets por versión. El linaje
   hacia atrás responde "¿qué entrenó este modelo?"; el linaje hacia adelante responde "¿qué modelos
   usaron esta fuente?", que es la pregunta que hace una retirada u una orden.
4. **Genera las divulgaciones.** Construye el resumen de contenido de entrenamiento de GPAI en la
   plantilla de la Comisión (obligatorio bajo `Art. 53(1)(d)`, aplicable desde el 2 de agosto de
   2025, con modelos ya en el mercado antes del 2 de agosto de 2027) [7] y la documentación de
   California AB 2013 (en vigor desde el 1 de enero de 2026, incluyendo fuentes, información
   personal y el uso de datos sintéticos) [8] como consultas sobre el registro, no como documentos
   escritos de memoria.
5. **Maneja el cambio como un evento.** Una expiración o retirada de licencia, una nueva reserva,
   una solicitud de borrado u una orden marca las filas afectadas; el linaje hacia adelante lista
   los modelos afectados; y la remediación (reentrenamiento sin la fuente, retiro del modelo, o una
   decisión documentada de confiar en otra base) se registra contra las mismas filas con una fecha y
   un aprobador.

El AI RMF pide políticas sobre riesgos de terceros, "incluyendo riesgos de infracción de la
propiedad intelectual u otros derechos de terceros" (GOVERN 6.1), y para mapear los riesgos legales
de componentes, "incluyendo el uso de datos o software de terceros" (MAP 4.1) [9].

Fila de registro ilustrativa para una fuente rastreada:

```json
{
  "source_id": "src-crawl-techdocs-2026q2",
  "version": "2026-06-30",
  "acquisition_channel": "crawl",
  "crawl": { "user_agent": "corp-trainbot/2.1", "window": "2026-04-01/2026-06-30" },
  "legal_basis": { "copyright": "DSM Directive Art. 4 (commercial TDM exception)",
                   "personal_data": "GDPR Art. 6(1)(f); assessment LIA-2026-019" },
  "reservation_check": { "method": "robots.txt and page metadata at fetch time",
                         "result": "412 domains excluded", "checked_at": "2026-06-30" },
  "licence": { "ref": null, "training": "exception_relied_on", "derived_model_distribution": "permitted" },
  "permitted_uses": ["pre-training of the doc-lm model family"],
  "trained_models": ["doc-lm@1.4.0"],
  "owner": "data-acquisition-lead",
  "reviewed": "2026-09-15"
}
```

> **Ejemplo (ilustrativo)** Se construyó un asistente de recuperación de un editor sobre un corpus
> que tres equipos habían reunido. El registro se añadió después, una fila por fuente: dos fuentes
> no tenían licencia registrada y una había sido rastreada desde un sitio cuyo `robots.txt` prohibía
> el rastreador. La construcción del corpus ahora falla en una fuente sin fila, las dos fuentes sin
> licencia fueron eliminadas y el índice reconstruido, y la reconstrucción se registra contra el
> mismo id de registro. Cuando un licenciante retiró posteriormente un archivo, la linealidad hacia
> adelante nombró los dos modelos ajustados que lo habían leído.

## Consecuencias
El derecho a entrenar se convierte en evidencia que existe antes del entrenamiento, las
divulgaciones se generan en lugar de redactarse, y un cambio en los derechos afecta solo a los
modelos que utilizaron la fuente. Los costes: una fila por fuente es trabajo real para rastreos
grandes, por lo que el pipeline de rastreo debe escribir filas por sí mismo; las comprobaciones de
reserva son solo tan buenas como el método registrado; y el registro registra la posición de la
organización, no resuelve cuestiones legales abiertas.

## Patrones relacionados
[Dataset Admission Gate](/patterns/dataset-admission-gate); [AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondencias:** Reglamento de IA Art. 10(2)(b), Art. 53(1)(c)–(d) · Directiva (UE) 2019/790
Art. 4(3) · RGPD Art. 5(1)(b), Art. 6(4) · ISO/IEC 42001 A.7.3, A.7.5 · NIST AI RMF (Govern 6.1; Map
4.1) · Layer 02 Inventory & Transparency.

Las etiquetas de función y subcategoría siguen el NIST AI RMF [9]; los ids de ISO/IEC 42001 Anexo A
siguen un crosswalk publicado, no el texto del estándar [10]. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Sources

[1] Directive (EU) 2019/790 on copyright in the Digital Single Market, Art. 4 (text and data mining exception; 4(3) reservation of rights by machine-readable means for content made publicly available online). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[2] "Machine-readable opt-outs and AI training: Hamburg Court clarifies copyright exceptions" (Kneschke v. LAION, OLG Hamburg 5 U 104/24, 10 Dec 2025; natural-language reservations in terms of use insufficient; further appeal to the BGH allowed). Norton Rose Fulbright, Inside Tech Law. 2025-12. https://www.insidetechlaw.com/blog/2025/12/machine-readable-opt-outs-and-ai-training-hamburg-court-clarifies-copyright-exceptions (verified: secondary)
[3] Regulation (EU) 2024/1689 (AI Act): Art. 10(2)(b) data collection processes, origin of data and original purpose of collection; Art. 53(1)(c) copyright policy identifying reservations under Art. 4(3) of Directive (EU) 2019/790; Art. 53(1)(d) public summary of training content on the AI Office template (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] Bartz v. Anthropic PBC, No. 4:24-cv-05417 (N.D. Cal.): Order on Fair Use (Alsup, J., 23 Jun 2025, ECF 231) and Order Granting Final Approval of Class Action Settlement (Martínez-Olguín, J., 20 Jul 2026, ECF 680). CourtListener (court docket). 2026-07-20. https://www.courtlistener.com/docket/69058235/bartz-v-anthropic-pbc/ (verified: primary)
[5] Regulation (EU) 2016/679 (GDPR): Art. 5(1)(b) purpose limitation; Art. 6(4) compatibility of further processing. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[6] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed using users' biometric information, to be deleted within 90 days with a sworn statement). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[7] Template for general-purpose AI model providers to summarise their training content (template mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027; sources incl. scraped, user and synthetic data). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[8] AB 2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28; operative 2026-01-01; developers post training-data documentation incl. sources, personal information, copyright status and use of synthetic data). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 6.1 third-party risks incl. infringement of intellectual property or other rights; MAP 4.1 legal risks of components incl. third-party data or software). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.7.3 acquisition of data, B.7.5 data provenance; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
