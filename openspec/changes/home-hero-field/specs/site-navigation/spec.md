# Spec Delta

## Purpose

Añade a la capacidad `site-navigation` el modo de cabecera superpuesta que usa la portada: la barra
flota transparente sobre el hero de `/` hasta que la página se desplaza, y en el resto de páginas se
comporta exactamente igual que hoy.

## ADDED Requirements

### Requirement: Cabecera superpuesta exclusiva de la portada

La cabecera SHALL admitir un modo superpuesto en el que, sin haber desplazado la página, no lleva
fondo, desenfoque, línea ni sombra, y sus textos secundarios mantienen el mismo nivel de contraste que
en el resto del sitio. Este modo SHALL activarse únicamente en `/`; todas las demás páginas SHALL
mostrar la cabecera sticky habitual (fondo, desenfoque en escritorio, línea, sombra) desde el primer
pintado. En ambos modos SHALL existir un único control de tema y un único botón de búsqueda dentro de
la cabecera.

#### Scenario: Portada sin desplazamiento
- **WHEN** se abre `/` sin haber hecho scroll
- **THEN** la cabecera no tiene fondo, desenfoque, línea ni sombra, y sus enlaces y textos secundarios
  mantienen contraste AA sobre lo que haya detrás

#### Scenario: Portada tras desplazamiento
- **WHEN** el usuario desplaza `/` más de 8px
- **THEN** la cabecera pasa a mostrar fondo, línea y sombra como en el resto del sitio

#### Scenario: Página distinta de la portada
- **WHEN** se abre `/thesis`, `/bok`, `/resources` o cualquier otra ruta distinta de `/`
- **THEN** la cabecera muestra su fondo, línea y sombra habituales desde el primer pintado, sin pasar
  por el modo transparente
