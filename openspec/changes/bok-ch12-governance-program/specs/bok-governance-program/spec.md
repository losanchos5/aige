# Spec Delta

## Purpose

El capítulo 12 del Body of Knowledge trata la organización como objeto de gobierno y las políticas a
lo largo del ciclo de vida de la IA, con la misma voz de ingeniería que el resto del libro: cada deber
o práctica se ata al artefacto que lo evidencia, a la capa del stack que lo produce y al registro de
evidencia.

## ADDED Requirements

### Requirement: Estructura y formato del capítulo 12
El fichero `bok/12-governance-program.md` SHALL conservar el H1 `# 12. Running the AI governance
program`, SHALL abrir con una entradilla en blockquote de una sola frase, y SHALL terminar con una
sección `## What you can do this week` de tres a cinco acciones concretas seguida de `## Sources`. El
fichero MUST NOT contener el carácter raya (U+2014) y MUST seguir `STYLEGUIDE.md` (inglés británico,
términos canónicos, nombres exactos de las cinco capas).

#### Scenario: La build valida el capítulo
- **WHEN** se ejecuta `bash D:/Documents/aige-wt/build.sh`
- **THEN** astro check, build, content-lint, check-links y pagefind terminan con código 0 y la ruta
  `/bok/governance-program` muestra el capítulo completo

#### Scenario: Cierre del capítulo
- **WHEN** un lector llega al final del capítulo
- **THEN** encuentra `## What you can do this week` con entre tres y cinco acciones numeradas justo
  antes de `## Sources`

### Requirement: La organización como objeto de gobierno
El capítulo SHALL incluir un mapa de partes interesadas en tabla (consejo, dirección, CAIO/CDAO,
comité de gobierno de IA, legal, privacidad/DPO, CISO, riesgos, auditoría interna, producto,
ingeniería, ingeniero de gobierno de IA, compras, RR. HH., operadores, personas afectadas y
proveedores) con deber, derecho de decisión y artefacto; una tabla RACI por fase del ciclo de vida
con un único responsable final por fila; y el diseño del comité bajo la regla "the committee decides,
the gates enforce" (propósito, estatuto y composición, consultivo o vinculante, aceptación de riesgo
residual, excepciones como datos que lee la puerta con caducidad, disparadores de revisión, cadencia y
escalado).

#### Scenario: Una excepción caducada vuelve a bloquear
- **WHEN** un lector sigue el ejemplo de registro de excepción y la comprobación de política
- **THEN** ve que la regla devuelve `allow` citando la excepción mientras está vigente y vuelve a
  fallar la build al caducar, sin intervención manual

#### Scenario: Cada parte interesada tiene un artefacto
- **WHEN** un lector consulta cualquier fila del mapa de partes interesadas
- **THEN** la fila nombra el artefacto que esa parte posee o firma

### Requirement: Riesgo corporativo, tres líneas y auditoría interna
El capítulo SHALL explicar la integración del riesgo de IA en el registro de riesgos corporativo, el
modelo de las tres líneas aplicado a la IA con la evidencia que produce cada línea, y las pruebas que
debe hacer auditoría interna sobre las puertas (reejecución, búsqueda de bypass, higiene de
excepciones).

#### Scenario: Independencia de la tercera línea
- **WHEN** un lector consulta el RACI y la sección de tres líneas
- **THEN** auditoría interna figura como informada en todas las fases y nunca como responsable de
  ejecución, con la cita al modelo de las tres líneas

### Requirement: Alfabetización en IA como código
El capítulo SHALL describir el `Art. 4` del AI Act en su redacción posterior al Reglamento (UE)
2026/1744 con fecha "as of 2026-09-24", currículos por perfil, un registro de formación estructurado
con caducidad y una regla de política que condiciona el acceso a herramientas o sistemas a una
atestación vigente, enlazando con el `Art. 26(2)`.

#### Scenario: Estado legal fechado
- **WHEN** un lector lee la subsección sobre el `Art. 4`
- **THEN** la redacción enmendada, la fecha de entrada en vigor y la supervisión nacional llevan cita
  numerada y la marca "as of 2026-09-24"

### Requirement: Canal de preocupaciones, indicadores y mejora continua
El capítulo SHALL incluir un canal interno para plantear preocupaciones con los requisitos del
`Art. 87` y la Directiva (UE) 2019/1937, las protecciones del SB 53 de California y el control A.3.3 de
ISO/IEC 42001 (solo por número); una tabla de KPI y KRI calculados desde sistemas vivos con la capa o
flujo que los produce; y la revisión por la dirección y la mejora continua (ISO/IEC 42001 cláusulas 9
y 10 solo por número) con salidas registradas como datos.

#### Scenario: Indicador trazable a su fuente
- **WHEN** un lector consulta cualquier fila de la tabla de KPI y KRI
- **THEN** la fila indica la capa, el patrón o el flujo de trabajo que produce el dato

### Requirement: Políticas a lo largo del ciclo de vida
El capítulo SHALL incluir la jerarquía política, estándar, procedimiento y código; una tabla de
requisitos por fase (entrada, diseño, datos, construcción, prueba, lanzamiento, operación, cambio,
retirada) con la puerta que lo hace cumplir, la evidencia y la capa; un ejemplo de política como
código con una única fuente YAML compilada a prosa y a una comprobación `Rego`; un método de análisis
de brechas para actualizar las políticas de privacidad, seguridad, gobierno del dato y propiedad
intelectual; una política de adquisición de datos; una política de IA de terceros con niveles de
proveedor y cláusulas contractuales como controles; y una política de uso aceptable por la plantilla
que trate el shadow AI.

#### Scenario: Una sola fuente, dos salidas
- **WHEN** un lector compara la prosa compilada y la comprobación `Rego` del ejemplo de política
- **THEN** ambas expresan el mismo umbral, el mismo alcance por nivel y la misma vía de excepción

#### Scenario: Cláusula como control
- **WHEN** un lector consulta la tabla de cláusulas contractuales
- **THEN** cada cláusula nombra el control que crea y la evidencia o el monitor que la comprueba

### Requirement: Fuentes verificadas y límites editoriales
Toda afirmación factual, legal o numérica del capítulo MUST llevar una referencia `[n]` que exista en
`## Sources` con el formato de `STYLEGUIDE.md` §6 (título con glosa, editor, fecha, URL y etiqueta de
verificación `primary`, `secondary` o `reported`). Los estándares ISO/IEC MUST citarse solo por
identificador y número de cláusula, sin reproducir texto. El capítulo MUST NOT mencionar productos
privados ni material de estudio comercial, y MUST marcar los ejemplos como ilustrativos.

#### Scenario: Cita sin fuente
- **WHEN** se busca en el cuerpo del capítulo un marcador `[n]`
- **THEN** existe una entrada `[n]` en `## Sources` y ningún número de la lista queda sin usar

#### Scenario: Ejemplos ilustrativos
- **WHEN** un lector encuentra un bloque "In practice" o "Example"
- **THEN** la etiqueta indica "(illustrative)" y el ejemplo no identifica ninguna organización real
