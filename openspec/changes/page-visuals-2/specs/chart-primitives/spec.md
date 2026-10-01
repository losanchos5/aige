# Spec Delta

## ADDED Requirements

### Requirement: Primitivas de flujo, anillos, teselas y espina
El kit SHALL incluir, con el mismo contrato `{ svg, table }` y las mismas reglas de medición de texto,
tema y estado por forma que el resto de primitivas:
- Flow: Sankey o aluvial de 2 o 3 columnas con layout determinista calculado en build, grosor de cinta
  proporcional al recuento y como mucho 9 nodos por columna; el color de capa solo cuando la columna es
  la capa. Su variante estrecha lista los flujos por nodo de origen sin cintas cruzadas.
- Rings: anillos concéntricos con sectores y marcas clavadas en su anillo, anillo de ciclo de vida por
  etapas y anillo de progreso.
- Treemap: teselas squarified calculadas en build, agrupadas con cabecera y enlazables, con el estado
  por trama.
- BookSpine: los capítulos del libro agrupados por parte en tintas neutras (nunca colores de capa),
  con una variante mini que resalta capítulos.

#### Scenario: Flujo que conserva los recuentos
- **WHEN** Flow dibuja un conjunto de pares origen y destino
- **THEN** la suma de cintas que sale de cada nodo y la que entra en cada nodo coinciden con la tabla alternativa

#### Scenario: Demasiados nodos
- **WHEN** una columna de Flow recibe más de 9 nodos sin agrupar el resto
- **THEN** la build falla nombrando la columna

#### Scenario: Teselas proporcionales
- **WHEN** Treemap recibe valores positivos
- **THEN** el área de cada tesela es proporcional a su valor dentro de un margen de redondeo de 1 px por lado, y ninguna tesela solapa a otra

### Requirement: Texto legible en la variante estrecha
Todo gráfico que se muestre por debajo del punto de cambio SHALL conservar al menos 12 px de texto
efectivo con una pantalla de 320 px. La variante estrecha MUST dibujarse a 280 unidades con texto
mínimo de 12,5, y Chart.astro MUST hacer fallar la build, nombrando el gráfico, si el tamaño de texto
menor de un SVG visible en móvil multiplicado por el ancho del lienzo a 320 px entre el ancho del
viewBox baja de 12.

#### Scenario: Gráfico estrecho a 320 px
- **WHEN** una página con un par ancho y estrecho se abre a 320 px
- **THEN** ningún texto del SVG estrecho mide menos de 12 px y la página no tiene scroll horizontal

### Requirement: Marca «As of» compartida
Las gráficas temporales SHALL dibujar la marca de fecha del dataset con un único helper del kit, con el
rótulo «As of YYYY-MM-DD» (o «A fecha de» en español) y la fecha as-of del dataset, nunca el reloj de
la build.

#### Scenario: Misma marca en todas
- **WHEN** timeStrip, beeswarm, timeLanes y dumbbell reciben la misma fecha as-of
- **THEN** las cuatro dibujan la marca con el mismo rótulo y la misma clase
