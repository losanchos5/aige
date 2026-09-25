# certifications-overview Specification

## Purpose
Una página neutral explica qué evalúa cada certificación personal relevante para el gobierno de la
IA, quién es el propietario de cada esquema y cómo se relaciona este libro con ella, sin ranking,
sin recomendación y sin material de estudio.

## Requirements

### Requirement: Resumen neutral y verificado de certificaciones
La página `/for/certifications` SHALL describir AIGP, ISO/IEC 42001 Lead Implementer, ISO/IEC 42001
Lead Auditor, ISACA AAISM e ISACA AAIA solo con hechos leídos en las fuentes del propietario de
cada esquema, de ISO o de EUR-Lex, cada uno con una fuente numerada en el formato de la casa. La
página MUST NOT ordenar ni recomendar esquemas, MUST NOT citar guías de estudio comerciales y MUST
decir que el sitio no está afiliado ni respaldado por ningún propietario de esquema.

#### Scenario: Hecho sin fuente
- **WHEN** se añade un dato sobre un examen (formato, puntuación, requisitos)
- **THEN** lleva su número de fuente y la fila correspondiente en `sources/SOURCES.md`

#### Scenario: Dos tipos de certificado
- **WHEN** el lector compara ISO/IEC 42001 Lead Auditor con la certificación 42001 de una
  organización
- **THEN** la página explica que el primero es un certificado de una persona emitido por un
  organismo, que ISO no emite certificados y que la certificación de un AIMS la hacen organismos
  que trabajan con ISO/IEC 42006

### Requirement: Relación con el libro coherente con la crítica del capítulo 06
Para cada esquema, la página SHALL señalar las secciones del libro más cercanas y MUST dejar claro
que un certificado personal acredita conocimiento en un momento dado y no que un control funcione,
en línea con la crítica del capítulo 06 a las certificaciones como sustituto de la capacidad.

#### Scenario: Alfabetización en IA
- **WHEN** el lector pregunta si la Ley de IA de la UE exige un certificado para la alfabetización
  en IA
- **THEN** la página cita el artículo 4 en EUR-Lex y las preguntas y respuestas de la Comisión, que
  dicen que no hace falta certificado
