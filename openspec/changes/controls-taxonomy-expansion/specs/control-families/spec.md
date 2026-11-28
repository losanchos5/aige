# Spec Delta

## Purpose

Define las familias temáticas del catálogo de controles: un registro de 18 familias con id estable y
justificación por fuente primaria, la clasificación de cada control por familia y por actor, y la
página pública que las presenta.

## ADDED Requirements

### Requirement: Registro de familias de control
El sitio SHALL publicar un registro de 18 familias de control. Cada familia MUST tener un id estable
en kebab-case, un número de orden, un título, una definición de una o dos frases, lo que queda fuera
de ella y al menos dos anclas en fuentes primarias, cada ancla con nombre del marco, referencia
exacta, URL y fecha de lectura. Las familias SHALL ser, en este orden: `governance`, `inventory`,
`risk-and-impact`, `data-and-privacy`, `lifecycle-and-change`, `evaluation-and-testing`, `fairness`,
`transparency`, `rights-and-redress`, `human-oversight`, `agent-controls`, `ai-security`,
`third-party`, `monitoring-and-logging`, `incidents-and-shutdown`, `documentation-and-evidence`,
`literacy-and-use-policy`, `gpai-and-frontier`. El id de una familia MUST NOT cambiar ni reutilizarse
una vez publicado.

#### Scenario: Registro completo
- **WHEN** se valida el registro en el build
- **THEN** hay 18 familias con ids únicos, y cada una tiene definición, exclusiones y al menos dos
  anclas con URL y fecha

#### Scenario: Ancla sin fuente
- **WHEN** una familia tiene un ancla sin URL o sin fecha de lectura
- **THEN** el build falla y nombra la familia y el ancla

### Requirement: Clasificación de cada control
Cada control MUST declarar exactamente una familia primaria, y MAY declarar hasta dos familias
secundarias distintas de la primaria. Cada control MUST declarar al menos un actor en `appliesTo`,
con valores del conjunto `provider`, `deployer`, `gpai-provider`. La clasificación MUST NOT alterar
el id, el perfil ni el orden de ningún control existente.

#### Scenario: Los 93 controles clasificados sin cambiar de id
- **WHEN** se compara el registro tras la fase 0 con el de `origin/main` en el commit `4af2900`
- **THEN** los 93 ids, sus perfiles y su orden son idénticos, y cada control tiene familia primaria
  y `appliesTo`

#### Scenario: Familia desconocida
- **WHEN** un control nombra una familia que no está en el registro, repite una familia o no declara
  actor
- **THEN** el build falla y nombra el control

### Requirement: Página de familias
El sitio SHALL servir `/controls/families` con las 18 familias en orden: título, definición, anclas
con enlace a su fuente, número de controles por familia calculado de los datos y enlaces a esos
controles. Una familia sin controles SHALL aparecer con el recuento cero y un texto que diga que
aún no tiene controles. La página SHALL decir que los controles son borradores abiertos a revisión
técnica y no una declaración de conformidad. Cada control SHALL mostrar su familia primaria, con
enlace a la página de familias, en su página de perfil y en su página propia.

#### Scenario: Recuentos derivados
- **WHEN** se añade un control a una familia y se vuelve a construir el sitio
- **THEN** el recuento de esa familia en `/controls/families` sube en uno sin editar ningún texto

#### Scenario: Familia vacía visible
- **WHEN** una familia no tiene ningún control
- **THEN** la página la muestra con recuento cero y no la oculta

#### Scenario: Accesibilidad y texto
- **WHEN** se ejecutan los tests de accesibilidad y el lint de contenido sobre `/controls/families`
- **THEN** no hay violaciones de axe ni ninguna raya larga
