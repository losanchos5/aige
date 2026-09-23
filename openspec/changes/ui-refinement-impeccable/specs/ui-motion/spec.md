# Spec Delta

## Purpose
Define cómo se mueve la interfaz del sitio: qué interacciones tienen animación, cómo se degradan con
`prefers-reduced-motion`, y las restricciones que protegen el contraste, la política de contenido y el
presupuesto de peso.

## ADDED Requirements

### Requirement: Reducción de movimiento
Toda animación de la UI, sea CSS o script, SHALL desactivarse cuando el usuario tiene activada la
preferencia de reducción de movimiento. En ese caso el elemento MUST mostrarse directamente en su
estado final, sin transición ni retraso.

#### Scenario: Toggle de tema con reducción de movimiento
- **WHEN** el sistema emula `prefers-reduced-motion: reduce` y se pulsa el toggle de tema
- **THEN** el icono nuevo aparece de inmediato y el atributo `data-theme` cambia en el mismo tick

#### Scenario: Drawer con reducción de movimiento
- **WHEN** se abre un drawer de `/path` o `/resources/crosswalk` con reducción de movimiento activa
- **THEN** el panel y su contenido están en posición final sin transform residual

### Requirement: Solo transform en elementos del fold
Ninguna animación de entrada aplicada a elementos que puedan quedar dentro del viewport inicial
SHALL modificar la opacidad del texto. Las animaciones de entrada MUST usar únicamente transform.
La opacidad SHALL usarse solo en scrims y fondos sin texto.

#### Scenario: Auditoría de accesibilidad con animaciones activas
- **WHEN** axe recorre todas las rutas construidas a 1440 y 390 px en claro y oscuro
- **THEN** no hay violaciones serious ni critical de contraste atribuibles a opacidad fraccional

#### Scenario: Lighthouse sin emular reducción de movimiento
- **WHEN** Lighthouse CI audita las nueve URLs configuradas
- **THEN** la puntuación de accesibilidad es 1

### Requirement: Scripts servidos desde el propio origen
El HTML generado MUST NOT contener elementos `<script>` sin atributo `src`. Todo script de
animación SHALL cargarse desde `/_astro/` o desde `public/` y cumplir la CSP `script-src 'self'` sin
cambios en las cabeceras.

#### Scenario: Comprobación de infraestructura
- **WHEN** se ejecuta el test de infraestructura sobre `dist/index.html` y `dist/bok/the-stack.html`
- **THEN** no aparece ningún `<script>` inline y la CSP de `_headers` es la misma que antes del cambio

### Requirement: Presupuesto de peso del motor de animación
El chunk de JavaScript que aporta el motor de animación SHALL pesar como máximo 8 KB comprimido
(gzip). La puntuación de rendimiento de Lighthouse en desktop MUST mantenerse ≥ 0,95 en todas las
URLs auditadas.

#### Scenario: Medida tras el build
- **WHEN** se mide el fichero `dist/_astro/motion-ui.*.js` comprimido
- **THEN** su tamaño es ≤ 8 KB

### Requirement: Interacciones animadas
Las siguientes interacciones SHALL tener animación cuando la reducción de movimiento no está activa:
el toggle de tema (icono entrante con rebote), la apertura de drawers (panel y luego contenido
escalonado), el conteo de los StatTile al entrar en el viewport, y la aparición escalonada de las
capas del stack en `/stack` bajo el fold. El search dialog SHALL entrar con transform y scrim. El
header SHALL mostrar una sombra cuando la página está desplazada. Los chevrons de grupo del nav
SHALL rotar con `aria-expanded`.

#### Scenario: Count-up en StatTile
- **WHEN** un StatTile entra en el viewport en `/role`
- **THEN** el número recorre de 0 a su valor final en menos de 1,2 s y termina en el valor exacto
  con dígitos tabulares

#### Scenario: Capas del stack escalonadas
- **WHEN** se hace scroll hasta el diagrama de capas de `/stack`
- **THEN** las cinco capas llegan a su posición final en orden, y ningún ancestro de `.story-pin`
  recibe transform

#### Scenario: Header desplazado
- **WHEN** el documento se desplaza más de 8 px
- **THEN** el header lleva la clase `is-scrolled` y una sombra visible

### Requirement: Textos secundarios sin opacidad
Ningún texto de la UI SHALL atenuarse con opacity. Los textos secundarios MUST usar `--muted` o
`--ink-2`, con el re-escopado en bandas tintadas u oscuras, y cumplir AA (4,5:1).

#### Scenario: Fuente de un StatTile en banda tintada
- **WHEN** un StatTile se renderiza dentro de una sección `tint`
- **THEN** el texto de la fuente tiene ratio ≥ 4,5:1 sobre el fondo de la banda
