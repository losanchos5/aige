# Spec Delta

## Purpose

El capítulo 19 del Body of Knowledge explica cómo la ley de protección de datos se aplica a los
sistemas de IA en entrenamiento e inferencia, y traduce cada deber a un artefacto, una capa del stack
y un registro de evidencia, con fuentes verificadas y el estado fechado de las normas en movimiento.

## ADDED Requirements

### Requirement: Capítulo 19 completo con la plantilla del libro
El fichero `bok/19-privacy-and-ai.md` SHALL conservar el H1 `# 19. Privacy and data protection law
applied to AI`, abrir con un blockquote de una frase que sirve de entradilla, y contener secciones H2
con anclas estables para: principios aplicados a la IA; minimización, privacidad desde el diseño y
PETs; deberes del responsable; decisiones automatizadas; derechos frente a modelos entrenados; si un
modelo contiene datos personales; categorías especiales, datos inferidos y biometría; brechas
específicas de IA; la parte RGPD del Digital Omnibus; contrastes fuera de la UE; un mapa obligación →
artefacto → capa; `## What you can do this week` con entre tres y cinco acciones; y `## Sources` al
final. El capítulo MUST incluir al menos un callout `**In practice**` y al menos una línea
`**Maps to:**` con la frase "Mappings are illustrative, not a claim of conformity".

#### Scenario: Estructura visible en el sitio
- **WHEN** un lector abre `/bok/privacy-and-ai`
- **THEN** ve el título del capítulo, la entradilla, las secciones H2 en el orden anterior con sus
  anclas, callouts renderizados como `aside.callout` y la sección de fuentes numeradas

#### Scenario: Acciones de la semana antes de las fuentes
- **WHEN** se lee el final del capítulo
- **THEN** `## What you can do this week` aparece inmediatamente antes de `## Sources` y contiene una
  lista numerada de tres a cinco acciones concretas

### Requirement: Cada deber resuelto a artefacto, capa y evidencia
Cada deber jurídico que el capítulo describe SHALL nombrar el artefacto que lo evidencia, la capa del
stack que lo produce (01 Govern-as-Code, 02 Inventory & Transparency, 03 Evals & Red Teaming as
Evidence, 04 Runtime Controls & Observability, 05 Assurance & Continuous Compliance) y el registro de
evidencia que una consulta puede devolver. El mapa final MUST tener las columnas obligación,
artefacto, capa, sujeto obligado y registro de evidencia.

#### Scenario: Consulta del mapa
- **WHEN** un lector busca en el mapa una obligación como `GDPR Art. 22` o `CCPA ADMT regulations`
- **THEN** encuentra una fila con artefacto, capas 1–5, sujeto obligado y registro de evidencia

### Requirement: Fuentes verificadas y estados fechados
Toda afirmación factual, jurídica o numérica SHALL llevar un marcador `[n]` que exista en `## Sources`
con el formato `[n] Title (short gloss). Publisher. Date. URL (verified: primary|secondary|reported)`.
Lo que no pudo confirmarse MUST ir matizado en la prosa y marcado "(verify)". Las afirmaciones que
dependen de la fecha MUST llevar "as of 2026-09-24". El capítulo MUST NOT contener el carácter raya
(U+2014).

#### Scenario: Estado del Digital Omnibus
- **WHEN** se lee la sección sobre la parte RGPD del Digital Omnibus
- **THEN** distingue el Reglamento (UE) 2026/1744, que es ley, de la propuesta COM(2025) 837, que
  sigue siendo propuesta as of 2026-09-24, y cita la propuesta y su estado legislativo

#### Scenario: Hecho reportado
- **WHEN** la prosa usa una fuente con tag `reported`
- **THEN** la frase contiene la palabra "reported"

#### Scenario: El build valida citas y enlaces
- **WHEN** se ejecuta el build compartido (`astro check`, `astro build`, content-lint, check-links,
  pagefind)
- **THEN** termina con código 0: no hay rayas, ni anclas de cita colgantes, ni enlaces internos a
  rutas o anclas inexistentes

### Requirement: Neutralidad y límites editoriales
El capítulo SHALL ser neutral respecto a proveedores (herramientas solo como ejemplos de categoría)
y MUST NOT reproducir texto de normas ISO/IEC más allá del identificador y el título corto.

#### Scenario: Revisión editorial
- **WHEN** se revisa el capítulo antes de publicar
- **THEN** no aparece ningún producto privado ni recomendación de proveedor, y las normas ISO/IEC se
  nombran solo por identificador
