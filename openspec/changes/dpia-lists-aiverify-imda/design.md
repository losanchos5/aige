# Design

## Contexto

El sitio publica sus registros como módulos TypeScript tipados bajo `site/src/data/`, una página
por registro y un conjunto de datos en la API estática `/api/v1/`, cuyo registro único
(`site/src/lib/api.ts`) genera a la vez el endpoint, el esquema, el catálogo, la descripción
OpenAPI y la tabla de `/resources/data`. El crosswalk de temas añade columnas cambiando solo
`columns` y las referencias de `site/src/data/crosswalk.ts` (precedente: la columna GAO).

## Decisiones

### Un módulo de datos, no un JSON suelto
Las listas viven en `site/src/data/dpia-lists.ts` con tipos cerrados: `DpiaList` (país, código ISO,
autoridad, fecha de adopción, número de dictamen del CEPD si lo hay, URL, idioma, estado de la
extracción) y `DpiaItem` (número tal como lo imprime la fuente, resumen propio, cita literal breve
cuando la fuente la da, etiquetas de tema y áreas del anexo III). Los indicadores por lista (IA,
decisión automatizada, perfilado, biometría, vigilancia de empleados, puntuación) se derivan de las
etiquetas de sus ítems, de modo que el recuento de los hallazgos no puede contradecir la tabla. Una
lista cuyo texto no se extrajo lleva `extraction: 'metadata-only'` y sus indicadores se muestran como
"not extracted", nunca como "no".

### Honestidad de los recuentos
Los hallazgos se calculan de los datos (cuántas listas nombran la IA de forma expresa, cuántas
tienen ítems de perfilado, rango de fechas de adopción). La discrepancia 22 frente a 18 se explica
con sus dos fuentes: 22 autoridades presentaron proyectos para los dictámenes del CEPD de 25 de
septiembre de 2018 (IAPP) y 18 listas figuran hoy en el registro filtrado del CEPD.

### Texto de la Ley de IA verificado
El art. 26(9) y el art. 27(4) se citan del texto consolidado de EUR-Lex de 2026-07-27. El art. 27(4)
fue modificado por el Reglamento (UE) 2026/1744 (Digital Omnibus): la redacción de 2024 ("shall
complement that data protection impact assessment") ya no es la vigente, y la página cita la nueva
(el responsable del despliegue puede incluir referencias cruzadas a las secciones de la DPIA o partes
de ella en la FRIA).

### Crédito y metadatos de contribución
La página muestra "Idea: Aurélie Pols · Research and data: Jorge García Aibar". El conjunto de la
API lleva `contributors` (nombre, rol CRediT y etiqueta) y `reviewers` (lista vacía). Una revisión
futura se registra añadiendo a `reviewers` y, solo entonces, la página muestra "Reviewed by". El
JSON-LD `Dataset` de la página lleva `contributor` para la idea. La autoría del sitio no cambia.

### Columna AI Verify
Nuevo instrumento `sg-ai-verify` en `frameworks.ts`, sin filas de obligación (es un marco de
pruebas voluntario), en la familia de Singapur de `map.ts`, y columna `aiverify` en el grupo
`codes`. Cada referencia nombra el principio de AI Verify y su número de comprobación (numeración del
checklist de 2025), enlaza la página del marco y lleva una nota que dice qué fila de qué crosswalk
oficial la sostiene. Se descartan las celdas que solo se apoyaban en la redacción de la comprobación
o en el crosswalk NIST de 2023 (numeración anterior), y las de los cuatro temas sin respaldo sólido
(identidad de agentes, sandboxes, evaluación de la conformidad, prácticas prohibidas).

### IMDA como fuente, no como autor de "kill switch"
Las citas del IMDA van en las secciones de fuentes de los patrones (formato de la casa, con la
página en la glosa) y en `references` y `mappings.other` de los controles que el mapeo respalda. La
referencia cruzada de los controles vive en un solo módulo (`controls/imda-agentic.ts`) que
`controls/index.ts` aplica a cada control, y la fuente es una constante compartida
(`IMDA_AGENTIC` en `site/src/lib/sources.ts`). El
patrón Kill Switch / Circuit Breaker no cita al IMDA por el término, porque el documento no lo usa.

## Riesgos

- **Registro del CEPD cambiante**: la fecha de consulta se publica con el dataset (`asOf`).
- **Capturas visuales**: la columna nueva cambia la matriz del crosswalk; las capturas regeneradas
  por ejecución no se confirman (convención del repositorio).
