# obligation-evidence-chain Specification

## Purpose
Cada página `/obligations/<id>` abre con la cadena de la obligación a la evidencia generada desde su
fila del registro (cláusula, sujeto obligado, fecha, artefacto, capa y esquema del registro de
evidencia), con su propia tarjeta Open Graph, para que la obligación se lea como algo que se construye.

## Requirements

### Requirement: Figura de cabecera de la cadena de evidencia
Cada página `/obligations/<id>` SHALL llevar como figura de cabecera la cadena cláusula → titular
del deber → fecha → artefacto → capa → registro de evidencia, generada en build desde la fila del
registro, con los hermanos del crosswalk debajo. El nodo final MUST ser el registro de evidencia
(los esquemas de `/schemas` cuyo `x-evidences` nombra la cláusula, o el registro de evidencia común)
con el glifo de documento con marca. La figura SHALL seguir `site/VISUAL-GUIDE.md`: seis nodos y
cinco aristas, etiquetas cortadas a cuatro palabras, colores solo por las clases `.figc` (las capas
con `--l1` a `--l5`), `role="img"` con `title` y `desc`, "As of" y "illustrative, not a claim of
conformity" dentro de la imagen, lectura de izquierda a derecha desde 960 px y de arriba abajo por
debajo, y una alternativa textual con cada nodo en las palabras de la fila.

#### Scenario: Pantalla ancha
- **WHEN** se abre `/obligations/aige-obl-euaia-art9` a 1440 px
- **THEN** se ve la cadena horizontal con "Risk register as code" como artefacto y la alternativa
  textual enlaza `/schemas/risk-register-entry.v1.json`

#### Scenario: Móvil
- **WHEN** se abre la misma página a 390 px
- **THEN** se ve la cadena vertical y la página no tiene desplazamiento horizontal

### Requirement: Tarjeta Open Graph por obligación y por herramienta
Cada página de obligación SHALL declarar como `og:image` su propia tarjeta
`/og/obligations/<id>.png` (1200 × 630), que muestra el título de la página, de modo que
`og:image:alt` (el título) la describe. Cada herramienta publicada del toolkit SHALL tener
`/og/toolkit/<id>.png`. Ambas MUST usar la plantilla de `src/lib/og.ts` sin modificar
`src/pages/og/[...slug].png.ts`.

#### Scenario: Tarjeta de una obligación
- **WHEN** se pide `/og/obligations/aige-obl-euaia-art9.png`
- **THEN** responde un PNG de 1200 × 630

### Requirement: Ningún estado caducado en el registro
`site/tests/obligation-status-dates.spec.ts` SHALL fallar cuando una fila con `appliesStatus`
`applies-later` o `deferred` tiene un `appliesFrom` igual o anterior a la fecha en que se ejecutan
las pruebas, y MUST nombrar cada fila caducada.

#### Scenario: Fecha pasada
- **WHEN** llega el 2027-01-01 y una fila con `applies-later` y `appliesFrom` 2027-01-01 no se ha
  revisado
- **THEN** la prueba falla con el id de la fila hasta que se cambia su estado y su `reviewed`
