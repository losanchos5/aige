# Spec Delta

## Purpose

Define cómo el sitio usa cuadros de dominio público como única fuente de color decorativo: en qué lugares aparecen, cómo se acreditan y qué límites de contraste y de peso respetan.

## ADDED Requirements

### Requirement: Los cuadros son la única fuente de color decorativo
El color decorativo del sitio SHALL venir solo de cuadros de dominio público. Un cuadro SHALL aparecer en uno de estos usos: marco alrededor de un panel de papel opaco, imagen superior de una tarjeta, franja ancha sobre un índice, imagen de un bloque a dos columnas, o fondo velado de la banda de cierre.

#### Scenario: Panel sobre cuadro
- **WHEN** se carga `/`
- **THEN** la figura del bucle se muestra en un panel opaco rodeado por un cuadro visible en sus cuatro lados

#### Scenario: Cierre con cuadro
- **WHEN** se carga `/`
- **THEN** la banda de cierre muestra un cuadro velado detrás del texto

### Requirement: Alternancia en la portada
En la portada, las secciones con imagen SHALL alternarse con secciones de filas sin imagen; dos secciones con imagen MUST NOT ser contiguas, salvo la hero y la primera sección.

#### Scenario: Orden alterno
- **WHEN** se recorren las secciones de `/` bajo la primera
- **THEN** ninguna sección con cuadro sigue inmediatamente a otra sección con cuadro

### Requirement: Texto legible junto a un cuadro
Ningún texto SHALL colocarse directamente sobre un cuadro sin un panel opaco o un velo que garantice un contraste de al menos 4.5:1. En tema oscuro los cuadros SHALL llevar un velo que evite el deslumbramiento sin dejarlos sin color.

#### Scenario: Banda de cierre legible
- **WHEN** se mide el contraste del titular y del botón de la banda de cierre en claro y en oscuro
- **THEN** el contraste más bajo es de al menos 4.5:1

#### Scenario: Cuadros visibles en oscuro
- **WHEN** se carga `/` en tema oscuro
- **THEN** las tarjetas con cuadro muestran la imagen y no un bloque de color plano

### Requirement: Marco de cuadro con color
Un cuadro usado como marco fino (firma de autor, tarjeta de cita) SHALL recortarse sobre una zona con matiz y pincelada visibles, de modo que el marco no se lea como gris plano.

#### Scenario: Marco de la firma
- **WHEN** se abre un capítulo
- **THEN** la firma de autor está dentro de un panel opaco rodeado por un marco de cuadro visible en sus cuatro lados, también a 390 px

### Requirement: Créditos y procedencia
Cada cuadro SHALL ser de dominio público y SHALL acreditarse con autor, título y año, en un pie junto a la imagen o en un colofón del pie de página. El repositorio SHALL guardar la procedencia y la licencia de cada archivo.

#### Scenario: Colofón
- **WHEN** se carga `/`
- **THEN** el pie de página incluye una línea que acredita los cuadros y su condición de dominio público

### Requirement: Peso y carga de las imágenes
Los cuadros SHALL servirse en variantes responsivas con dimensiones declaradas; los que quedan fuera de la primera pantalla SHALL cargarse de forma diferida. La portada MUST mantener el rendimiento de Lighthouse en 0.95 o más y no introducir desplazamiento de maquetación.

#### Scenario: Presupuesto de Lighthouse
- **WHEN** se ejecuta Lighthouse sobre `/`
- **THEN** el rendimiento es de al menos 0.95 y accesibilidad, buenas prácticas y SEO valen 1

#### Scenario: Carga diferida
- **WHEN** se inspeccionan las imágenes de cuadros de `/` bajo la hero
- **THEN** todas declaran ancho y alto y carga diferida
