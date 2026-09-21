# Spec Delta

## Purpose

La página `/map` muestra la disciplina del AI Governance Engineer como un mapa mental navegable y
un índice por cluster, generados desde los mismos datos que el resto del sitio, y produce la
infografía vertical que se publica en LinkedIn.

## ADDED Requirements

### Requirement: Mapa de la disciplina en `/map`
El sitio SHALL publicar la ruta `/map` con una figura SVG inline que represente la disciplina como
un árbol a dos lados: un nodo central "AI Governance Engineer" y ocho ramas (Foundations, Values &
principles, The Stack, Patterns, The Role, Obligations, Maturity, Learning path), cada una con sus
hojas de segundo nivel y, cuando el diseño lo indica, chips de tercer nivel. Cada nodo MUST ser un
enlace a la página o ancla del sitio que lo desarrolla. La figura MUST tener título y descripción
accesibles y una leyenda que asocie cada rama con sus capítulos.

#### Scenario: La figura se renderiza con todas las ramas enlazadas
- **WHEN** un usuario abre `/map`
- **THEN** la figura contiene ocho ramas, cuatro por lado, y todo nodo visible es un enlace con
  texto visible como nombre accesible

#### Scenario: Navegación por teclado dentro del mapa
- **WHEN** el usuario tabula desde la cabecera hasta el primer nodo del mapa y pulsa Enter
- **THEN** el foco es visible sobre el nodo y el navegador va a la página o ancla enlazada

### Requirement: Etiquetas fieles y enlaces resolubles
Las etiquetas del mapa MUST ser verbatim las de los módulos de datos del sitio o de los encabezados
y tablas de `bok/*.md`; las etiquetas cortas MUST ser subcadenas de la etiqueta completa. Todo
`href` del mapa y del índice, incluidas las anclas `#id`, MUST resolver contra el sitio construido.

#### Scenario: Una ancla inexistente rompe la build
- **WHEN** un nodo apunta a un ancla que no existe en la página destino
- **THEN** `npm run build` falla en la comprobación de enlaces indicando el href

#### Scenario: Las etiquetas escritas a mano existen en la fuente
- **WHEN** se ejecuta la suite de tests del mapa
- **THEN** cada etiqueta escrita a mano aparece en el fichero `bok/*.md` declarado como fuente

### Requirement: Índice por cluster como alternativa textual
Debajo del mapa, la página SHALL ofrecer un índice plegable por rama con, como mínimo, tres grupos
por rama (el árbol del mapa en texto, las secciones de capítulo, y diagramas/figuras, nodos de la
ruta de aprendizaje o recursos), donde cada elemento es un enlace. El índice MUST funcionar sin
JavaScript; con JavaScript SHALL ofrecer expandir/plegar todo y abrir la rama indicada en el hash.

#### Scenario: Lector sin JavaScript
- **WHEN** la página se carga con JavaScript deshabilitado
- **THEN** las ocho secciones plegables existen, se abren con el control nativo y todos sus enlaces
  funcionan

#### Scenario: Enlace directo a una rama
- **WHEN** se abre `/map#cluster-patterns` con JavaScript
- **THEN** la sección de Patterns queda abierta y su resumen recibe el foco

### Requirement: Comportamiento responsive y accesible
La página MUST NOT producir scroll horizontal a 390, 834 y 1440 px de ancho. A 390 px el lienzo del
mapa SHALL desplazarse lateralmente dentro de una región enfocable y etiquetada, con un aviso visible
de que existe la alternativa en lista. El mapa SHALL pasar la auditoría axe (sin violaciones serias o
críticas) en tema claro y oscuro; el resalte de rama al pasar el cursor o enfocar MUST NOT reducir
el contraste del estado estático.

#### Scenario: Móvil estrecho
- **WHEN** la página se muestra a 390 px
- **THEN** el ancho de scroll del documento es igual al ancho del viewport y el ancho de scroll de
  la región del mapa es mayor que el viewport

### Requirement: SVG generado desde datos, en dos variantes
El SVG del mapa MUST generarse en build desde un módulo de datos puro alimentado por los módulos
existentes (valores, stack, patrones, rol, madurez, frameworks, crosswalk, ruta), sin edición manual.
La variante web SHALL usar solo clases de color ligadas a los tokens del sitio (sin hex), pesar como
máximo 48 KB y declararse en el manifiesto de figuras con exención documentada del presupuesto de
nodos. La variante vertical SHALL ser un SVG autónomo (`role="img"`, título y descripción, colores
hex del tema claro, `viewBox` de 1200 de ancho, sin título ni pie, sin `foreignObject` ni `var()`)
escrito en la ruta indicada por línea de comandos junto con un fichero de metadatos (versión del
BoK, viewBox, recuentos).

#### Scenario: Drift del SVG versionado
- **WHEN** cambian los datos del mapa sin regenerar el SVG
- **THEN** la comprobación de figuras en modo `--check` falla y `prebuild` no continúa

#### Scenario: Etiqueta que no cabe
- **WHEN** una etiqueta necesita más de dos líneas en su columna o un chip excede el ancho de columna
- **THEN** el generador falla indicando el id del nodo, en lugar de emitir texto desbordado

### Requirement: Integración en el sitio
`/map` SHALL aparecer en la navegación principal y en el sitemap del footer, tener imagen OG propia,
estar incluida en la auditoría de Lighthouse y en el sitemap XML, y enlazarse desde la portada y
desde el hub de Resources.

#### Scenario: Descubrimiento
- **WHEN** un usuario está en cualquier página
- **THEN** encuentra "The map" en la barra de navegación (o en el drawer móvil) y en el footer

### Requirement: Descarga PNG coherente con la versión
Cuando exista un PNG publicado y su fichero de metadatos, `/map` SHALL mostrar un enlace de descarga
con dimensiones y tamaño; si faltan, la página MUST construirse sin el enlace. La versión del BoK
registrada en los metadatos MUST coincidir con la versión del sitio.

#### Scenario: Descarga disponible
- **WHEN** existen los metadatos y el PNG
- **THEN** el enlace responde 200 con `image/png` y las dimensiones del PNG coinciden con los metadatos

### Requirement: Infografía para LinkedIn
El kit externo SHALL producir un PNG vertical de 2400×3000 px (marco de 1200×1500 a escala 2) a
partir de la variante vertical del SVG, con las tres fuentes de marca cargadas, la marca "register
mark" pequeña en una esquina, la URL del mapa y la versión del BoK al pie, todo el texto dentro de
un área segura, sin solapes con la marca, tamaño de fuente efectivo mínimo de 22 px y peso inferior a
3 MB. El render MUST fallar si alguna guarda no se cumple o si los datos fuente tienen cambios sin
confirmar (salvo indicación explícita).

#### Scenario: Fuente no cargada
- **WHEN** alguna de las tres familias no está cargada al renderizar
- **THEN** el render termina con error en lugar de producir el PNG con fuentes de reserva
