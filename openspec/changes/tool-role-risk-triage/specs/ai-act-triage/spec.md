# Spec Delta

## Purpose

El triaje de papel y clase de riesgo convierte la lectura del AI Act del capítulo 18 en un grafo de
preguntas versionado que se responde en el navegador. Devuelve papeles y clases orientativos con la
razón de cada respuesta y un registro de decisión de clasificación validable, y entrega los papeles
y clases al planificador de obligaciones. Nunca emite un veredicto de conformidad.

## ADDED Requirements

### Requirement: Grafo de preguntas versionado y anclado al capítulo 18
El sitio SHALL mantener en `site/src/data/triage.ts` un conjunto de preguntas con `id`, `version`
(semver), fecha `asOf` y base normativa, con entre 15 y 25 preguntas. Cada pregunta MUST llevar el
artículo en que se apoya, su ancla en el texto consolidado de EUR-Lex, la sección del capítulo 18 y
al menos un fragmento literal del capítulo que la sostiene; cada regla derivada (papel, clase,
alcance, nota) MUST llevar su razón, su artículo y sus fragmentos. La build MUST fallar si un
fragmento no está en `bok/18-eu-ai-act.md` o si una sección citada no existe.

#### Scenario: Fragmento que deja de estar en el capítulo
- **WHEN** el capítulo 18 cambia y un fragmento citado por una pregunta ya no aparece en él
- **THEN** `npm run build` falla nombrando la pregunta y el fragmento

#### Scenario: Cobertura del grafo
- **WHEN** se lee el conjunto de preguntas
- **THEN** cubre el alcance del `Art. 2(1)`, la definición del `Art. 3(1)`, las exclusiones del
  `Art. 2`, los disparadores del `Art. 25(1)`, el `Art. 5` con los puntos `(ba)` y `(bb)` desde
  2026-12-02, el `Art. 6(1)` con el Anexo I, el Anexo III, el filtro del `Art. 6(3)` con la excepción
  del perfilado, el `Art. 50` y el modelo GPAI con la presunción de 10^25 FLOP

### Requirement: Resultado orientativo con la razón de cada respuesta
`/toolkit/ai-act-triage` SHALL mostrar el alcance (dentro, fuera o por decidir), los papeles de la UE
y las clases que se derivan de las respuestas, cada uno con sus razones y su artículo, la fecha desde
la que aplica cada clase, los puntos abiertos y una tabla con cada respuesta, su artículo y lo que
significa. La herramienta MUST NOT mostrar un veredicto de conformidad, la palabra "compliant",
insignias ni sellos, y MUST repetir el aviso fijo del toolkit.

#### Scenario: Sistema del Anexo III con perfilado
- **WHEN** un sistema que la organización desarrolla y usa, en el área 4 del Anexo III, invoca la
  condición preparatoria del `Art. 6(3)` y perfila a personas físicas
- **THEN** el resultado da los papeles de proveedor y responsable del despliegue y la clase de alto
  riesgo del Anexo III desde 2027-12-02, con la razón "the override beats all four conditions"

#### Scenario: Filtro del Art. 6(3) sin perfilado
- **WHEN** un sistema del Anexo III invoca una condición del `Art. 6(3)` y no perfila
- **THEN** no se asigna la clase de alto riesgo y una nota exige documentar la evaluación antes de
  comercializarlo y registrarlo (`Art. 6(4)`, `Art. 49(2)`)

#### Scenario: Fuera del ámbito
- **WHEN** no hay comercialización en la UE, ni uso por una organización establecida en la UE, ni
  uso en la UE de la salida
- **THEN** el alcance es "fuera" con la razón del `Art. 2(1)`, no se asignan papeles ni clases y no se
  ofrece el enlace al planificador

#### Scenario: Pregunta condicional
- **WHEN** el lector no marca ninguna área del Anexo III
- **THEN** las preguntas del filtro del `Art. 6(3)` y del perfilado quedan ocultas y sus respuestas no
  cuentan

### Requirement: Registro de decisión de clasificación validable
La herramienta SHALL exportar el registro en JSON y en YAML con `kind:
"aige.classification-decision-record"`, `version: 1`, el conjunto de preguntas y su versión, las
respuestas, el resultado con sus razones, el revisor, la fecha, el estado de la revisión jurídica y
los disparadores de nueva revisión. El sitio SHALL publicar
`/schemas/classification-decision-record.v1.json` con un ejemplo que valida en `schemas-check` y una
plantilla humana. Al importar un registro, la herramienta MUST validar `kind`, `version` y el
conjunto de preguntas y MUST recalcular el resultado en lugar de leerlo del fichero.

#### Scenario: Exportar sin revisor
- **WHEN** se pide el registro sin indicar el papel revisor
- **THEN** un error junto al campo lo pide, el campo recibe el foco y no se descarga nada

#### Scenario: Ida y vuelta
- **WHEN** se exporta el registro en JSON y se importa ese fichero
- **THEN** las respuestas, los papeles y las clases son los mismos

#### Scenario: Otra versión del conjunto de preguntas
- **WHEN** se importa un registro hecho con otra versión del conjunto de preguntas
- **THEN** se cargan las respuestas cuyas preguntas y opciones siguen existiendo y un aviso pide
  revisarlas

### Requirement: Estado en el enlace y entrega al planificador
La herramienta SHALL guardar las respuestas y los datos del registro en el fragmento de la URL, de
modo que el enlace copiado reproduzca el resultado, y ningún script MUST enviar a la red lo que
escribe el lector. Cuando el registro del toolkit marca `obligations-planner` como `live`, el resultado
SHALL enlazar `/toolkit/obligations-planner` con el fragmento que el planificador lee,
`#v=1&r=<códigos de papel>&c=<códigos de clase>&d=<fecha de la decisión>`, más `from` y `qs` como
procedencia; si no, SHALL remitir al registro de obligaciones sin enlazar una página inexistente.
Fuera del ámbito, o sin ningún papel que el planificador conozca, MUST NOT ofrecer el enlace.

#### Scenario: Enlace reproducible
- **WHEN** se abre un enlace copiado con todas las preguntas visibles respondidas
- **THEN** el formulario muestra las mismas respuestas y el mismo resultado sin volver a enviarlo

#### Scenario: Códigos del planificador
- **WHEN** el triaje da proveedor y responsable del despliegue con alto riesgo del Anexo III, decidido
  el 2026-09-24
- **THEN** el fragmento del enlace es `v=1&r=pr.de&c=h3&d=2026-09-24&from=ai-act-triage&qs=1.0.0`

#### Scenario: Planificador aún no publicado
- **WHEN** el registro del toolkit no tiene `obligations-planner` en estado `live`
- **THEN** el resultado no contiene ningún enlace a `/toolkit/obligations-planner` y remite a
  `/obligations`
