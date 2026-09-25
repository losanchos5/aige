# Spec Delta

## Purpose

Los lectores pueden seguir los cambios del libro desde donde leen, y el propietario puede medir las
acciones clave (descargas, suscripciones, búsquedas, citas) sin scripts nuevos en el cliente.

## ADDED Requirements

### Requirement: Newsletter donde se lee
El formulario de newsletter existente SHALL mostrarse en la portada (en una sección propia antes de
la banda final), al final de cada capítulo del Body of Knowledge y en `/about`, solo cuando
`site.newsletter.action` está definido. Cada instancia MUST tener un id de campo único en su página
y MUST NOT indexarse en la búsqueda del sitio cuando va dentro de un capítulo.

#### Scenario: Final de capítulo
- **WHEN** se carga `/bok/the-stack`
- **THEN** tras las fuentes del capítulo hay un formulario que envía a Buttondown, fuera del índice
  de Pagefind

### Requirement: Eventos de analítica declarativos
Las descargas de ficheros enlazadas desde el footer y desde `/about`, el envío de la newsletter, los
botones que abren la búsqueda y los botones de copiar una cita SHALL llevar `data-umami-event` con
un nombre en kebab-case de 50 caracteres o menos y sus propiedades en `data-umami-event-*`. El
cambio MUST NOT añadir scripts ni modificar la CSP; sin identificador de Umami en la build los
atributos no tienen efecto.

#### Scenario: Envío de la newsletter
- **WHEN** se inspecciona el botón de suscripción de la portada
- **THEN** lleva `data-umami-event="newsletter-subscribe"` y `data-umami-event-location="home"`

#### Scenario: Apertura de la búsqueda
- **WHEN** se inspecciona el botón de búsqueda del header
- **THEN** lleva `data-umami-event="search-open"`
