# Spec Delta

## Purpose

Cuando el libro gana capítulos, el resto del libro los conoce: cada capítulo tiene resumen y
«at a glance» en el manifiesto, los capítulos se enlazan por sección, la tabla consolidada de fuentes
cubre cada capítulo y cada página de datos, y el capítulo 08 sigue siendo un índice inverso correcto.

## ADDED Requirements

### Requirement: Resumen y «at a glance» por capítulo
Cada entrada de `site/src/data/chapters.ts` para los capítulos 01 a 08 y 11 a 22 SHALL tener un
`summary` de una sola frase completa de 160 caracteres o menos, fiel a la entradilla del capítulo,
y un `glance` de tres o cuatro frases. Los campos `part` y `order` MUST NOT cambiar en esta pasada.

#### Scenario: Capítulo nuevo con resumen propio
- **WHEN** se abre `/bok/incidents`
- **THEN** la cabecera muestra el resumen de una frase y el bloque «At a glance» con cuatro puntos,
  antes del primer H2

#### Scenario: Resumen del capítulo 02 sin la afirmación retirada
- **WHEN** se lee el resumen del capítulo 02
- **THEN** dice que el mercado empezó a contratar por capacidades de ingeniería y no que «renombró
  el rol»

### Requirement: Enlaces profundos entre capítulos
Los enlaces entre capítulos que remiten a un tema concreto SHALL apuntar al ancla de la sección que
lo desarrolla (`/bok/<slug>#<ancla>`); solo las referencias de orientación a un capítulo entero MAY
quedarse en la ruta. Ningún H2 o H3 existente MUST renombrarse. Todo enlace interno MUST resolver a
una ruta y un ancla existentes en la rama.

#### Scenario: El build valida los enlaces
- **WHEN** se ejecuta el build completo (astro check, build, content-lint, check-links)
- **THEN** termina con código 0 y check-links no informa de ningún enlace o ancla rotos

#### Scenario: Un enlace de tema llega a su sección
- **WHEN** el capítulo 13 remite a la relación entre incidentes y riesgos
- **THEN** el enlace apunta a `/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite`

### Requirement: Tabla consolidada de fuentes completa
`sources/SOURCES.md` SHALL tener una sección por cada capítulo con lista `## Sources`, cuya fila `n`
tenga la misma URL y la misma etiqueta de verificación que la entrada `[n]` del capítulo, y una
parte «Site data pages» con las fuentes del atlas de daños, de cada caso y de la página de
plantillas. Ninguna sección MUST aparecer dos veces.

#### Scenario: Comprobación mecánica
- **WHEN** se compara cada `[n]` de los capítulos 00 a 22 con su fila en `SOURCES.md`
- **THEN** no hay filas que falten, URL distintas ni etiquetas distintas

### Requirement: El capítulo 08 al día con los capítulos que lo desarrollan
La prosa de `bok/08-regulatory-map.md` SHALL: abrir la sección de la UE con un puntero al capítulo
18; contar los plazos exteriores de 15, 2 y 10 días del art. 73 desde que el proveedor o, en su
caso, el deployer tiene conocimiento del incidente, con el deber inmediato al establecer el nexo
causal, y nombrar al deployer cuando no localiza al proveedor (art. 26(5)); citar la ley coreana y
su decreto en law.go.kr como fuentes primarias y describir el periodo de orientación; remitir al
capítulo 21 para las medidas chinas de interacción antropomórfica y para las leyes estatales de
EE. UU.; dar el estado de los borradores de JTC 21 fechado a 2026-09-24; y anotar que NIST revisa
el AI RMF 1.0. Las tablas de obligaciones que espeja `frameworks.ts` MUST NOT cambiar en esta pasada.

#### Scenario: Reloj del art. 73
- **WHEN** un lector consulta la tabla del reloj del art. 73
- **THEN** cada fila dice «after awareness» para el plazo exterior y la columna de quién informa
  incluye al deployer que no localiza al proveedor

#### Scenario: Los anclas del mapa siguen vivas
- **WHEN** `data.spec.ts` comprueba que cada `anchor` de `frameworks.ts` existe en el capítulo 08
- **THEN** todas existen, porque ningún encabezado cambió
