# Spec Delta

## Purpose

Añade a la capacidad `site-navigation` el selector de idioma de la cabecera y el enlace del pie a las
portadas de idioma, y fija cómo cuenta el test de cobertura del pie las páginas traducidas.

## ADDED Requirements

### Requirement: Selector de idioma

La cabecera SHALL mostrar un selector de idioma solo cuando la página existe en más de un idioma,
listando únicamente esos idiomas por su nombre propio, con el actual marcado. El selector MUST
funcionar sin JavaScript (CSP `script-src 'self'`) y su nombre accesible MUST contener el código
visible. En una página que solo existe en inglés la cabecera MUST NOT cambiar.

#### Scenario: Capítulo traducido al español y al alemán
- **WHEN** se abre `/es/bok/values-and-principles`
- **THEN** la cabecera ofrece English, Español y Deutsch, con Español marcado como actual, y cada
  opción enlaza su versión

#### Scenario: Página sin traducción
- **WHEN** se abre `/stack`
- **THEN** la cabecera no muestra selector de idioma

### Requirement: Portadas de idioma en el pie y cobertura

El pie SHALL enlazar la portada `/<lang>` de cada idioma que tenga traducciones, bajo un grupo de
idiomas que no se muestra si no hay ninguna. El test de cobertura del pie SHALL tratar las páginas de
un idioma como detalle de su portada `/<lang>` y los capítulos traducidos como detalle de
`/<lang>/bok`, siempre que ese índice exista; si no existe (por ejemplo `/es/thesis` sin traducciones
automáticas al español), la página MUST seguir enlazada desde el pie.

#### Scenario: Build con fixtures
- **WHEN** se construye con traducciones al español y al alemán
- **THEN** el pie enlaza `/es` y `/de`, `/es` enlaza `/es/bok`, `/es/thesis` y los patrones
  traducidos, y `/es/bok` enlaza cada capítulo traducido
