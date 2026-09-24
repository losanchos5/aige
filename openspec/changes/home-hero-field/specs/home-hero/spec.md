# Spec Delta

## Purpose

El hero de la portada (`/`) cubre la primera pantalla completa con un campo de gradiente animado, un
titular centrado en una tipografía serif dedicada, una sola llamada a la acción y una franja de
cifras del sitio; la cabecera flota transparente sobre él hasta que la página se desplaza. Debajo, una
sección aparte presenta la definición de la disciplina junto con la figura del bucle de gobernanza.

## ADDED Requirements

### Requirement: Hero a pantalla completa con cabecera superpuesta

El hero de la portada SHALL ocupar como mínimo el alto del viewport (`100svh`) y SHALL empezar en el
borde superior real de la página. La cabecera del sitio SHALL flotar fija sobre el hero, sin fondo,
desenfoque, línea ni sombra mientras el usuario no haya desplazado la página más de 8px, y SHALL
adoptar el mismo aspecto que en el resto del sitio (fondo, desenfoque en escritorio, línea, sombra)
en cuanto se supere ese umbral. Ninguna otra página del sitio SHALL usar la cabecera superpuesta.

#### Scenario: Carga inicial de la portada
- **WHEN** se abre `/` sin haber hecho scroll
- **THEN** el hero mide al menos el alto del viewport y la cabecera no tiene fondo, desenfoque, línea
  ni sombra

#### Scenario: Tras desplazar la página
- **WHEN** el usuario desplaza `/` más de 8px hacia abajo
- **THEN** la cabecera pasa a mostrar su fondo, línea y sombra habituales

#### Scenario: Otra página no usa la cabecera superpuesta
- **WHEN** se abre cualquier página distinta de `/`
- **THEN** la cabecera es la barra sticky normal desde el primer pintado, sin modo transparente

### Requirement: Titular centrado en tipografía dedicada

El titular del hero SHALL renderizarse en la familia `--font-serif` (Newsreader Display), centrado, y
SHALL ser la única superficie del sitio que use esa familia. El tamaño del titular SHALL escalar con
el viewport y SHALL quedar acotado de forma que el texto ampliado al 200% siga cabiendo en un
viewport de 390px de ancho sin desbordar horizontalmente.

#### Scenario: Familia tipográfica exclusiva
- **WHEN** se inspecciona el CSS computado de cualquier elemento fuera del titular del hero
- **THEN** ningún elemento usa `--font-serif`

#### Scenario: Zoom al 200% en un viewport estrecho
- **WHEN** se abre `/` a 390px de ancho con el texto ampliado al 200%
- **THEN** el titular no produce scroll horizontal del documento

### Requirement: Campo de gradiente animado con control de movimiento

El fondo del hero SHALL ser un campo de gradiente que se mueve continuamente mientras
`prefers-reduced-motion` sea `no-preference`, y SHALL mostrarse como una única imagen fija cuando el
usuario prefiera menos movimiento, desde el primer pintado. El hero SHALL exponer un control de
pausa alcanzable con el teclado que detenga el campo (y cualquier otro movimiento continuo del hero) y
lo reanude; el control SHALL quedar fuera de la vista hasta que reciba el foco; el campo SHALL detenerse también cuando el hero sale del viewport o la pestaña queda oculta.
Sin JavaScript o sin WebGL, el hero SHALL mostrar un fondo estático construido con los mismos tres
tonos que el campo animado.

#### Scenario: Movimiento por defecto
- **WHEN** se abre `/` sin preferencia de movimiento reducido
- **THEN** el campo de fondo cambia de forma continua y el control de pausa existe, no marcado como
  pulsado, fuera de la vista hasta que el teclado lo enfoca

#### Scenario: Movimiento reducido
- **WHEN** se abre `/` con `prefers-reduced-motion: reduce`
- **THEN** el campo de fondo se muestra como una imagen fija desde el primer pintado y el control de
  pausa no se muestra

#### Scenario: Pausar el movimiento
- **WHEN** el usuario activa el control de pausa
- **THEN** el campo de fondo deja de animarse y el control queda marcado como pulsado; al activarlo de
  nuevo el movimiento se reanuda

#### Scenario: Sin WebGL disponible
- **WHEN** el navegador no puede crear un contexto WebGL
- **THEN** el hero muestra el fondo estático de respaldo con los tonos `--field-1..3`, sin dejar el
  hero sin fondo

### Requirement: Legibilidad AA del titular y de la cabecera sobre el campo

En cualquier instante de la animación y en ambos temas, el contraste entre el texto del titular y el
fondo bajo él SHALL cumplir al menos el mínimo AA para texto grande (3:1), y el contraste entre el
texto de la cabecera superpuesta y el fondo bajo ella SHALL cumplir al menos el mínimo AA para texto
normal (4.5:1).

#### Scenario: Auditoría de accesibilidad sobre el hero
- **WHEN** se ejecuta la auditoría axe sobre `/` en tema claro y oscuro, con el campo animado en
  distintos instantes
- **THEN** no se reportan violaciones serias o críticas de contraste sobre el titular ni sobre la
  cabecera

### Requirement: Franja de cifras calculada desde el contenido

El hero SHALL mostrar una franja de pares etiqueta/valor con cifras del sitio (número de capas del
stack, workflows, capítulos, valores, frameworks mapeados, patrones, versión del Body of Knowledge y
licencia), y cada valor SHALL calcularse a partir de los módulos de contenido tipados del sitio, nunca
escribirse como literal. Mientras haya movimiento (ver el requisito anterior) la franja SHALL
desplazarse en bucle continuo mediante `transform`; en caso contrario SHALL mostrarse como una lista
estática que envuelve línea.

#### Scenario: Cifra coherente con el contenido
- **WHEN** se añade o quita un capítulo del Body of Knowledge
- **THEN** el valor "Chapters" de la franja del hero cambia sin editar `pages/index.astro`

#### Scenario: Franja bajo movimiento reducido
- **WHEN** se abre `/` con `prefers-reduced-motion: reduce`
- **THEN** la franja se muestra como una lista estática que envuelve línea, sin desplazamiento

### Requirement: Sección de la definición y el bucle bajo el hero

Inmediatamente bajo el hero, una sección independiente SHALL presentar la definición de la disciplina
junto con la figura del bucle de gobernanza de siete pasos. La animación de la figura SHALL arrancar
su única pasada cuando la figura entra en el viewport, no al cargar la página.

#### Scenario: La figura no anima antes de tiempo
- **WHEN** se carga `/` y el usuario no desplaza la página
- **THEN** la figura del bucle permanece en su estado inicial hasta que entra en el viewport

#### Scenario: Una sola pasada
- **WHEN** la figura del bucle entra y vuelve a salir del viewport varias veces
- **THEN** la animación no se repite tras su primera pasada
