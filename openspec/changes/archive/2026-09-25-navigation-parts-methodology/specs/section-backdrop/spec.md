# Spec Delta

## MODIFIED Requirements

### Requirement: Ninguna sección de contenido de la home es plana
Las secciones de la home "The discipline, defined.", "Three questions define the discipline.",
"Eight values...", la sección de capítulos por partes ("<n> chapters in five parts...", con el número
calculado desde los datos) y la sección de newsletter ("Follow the changes.") SHALL pintar el mesh de
halos, y las secciones del stack ("A build order...") y Resources SHALL pintar un mesh suave y
quieto sobre su tinte. La sección del rol SHALL conservar su mesh actual (composición por defecto,
intensidad 0.6, con deriva). El verdict beat y la banda final no cambian.

#### Scenario: Secciones con mesh
- **WHEN** se carga `/`
- **THEN** las secciones de contenido con mesh, el stack y Resources contienen una capa de mesh
  visible y decorativa (oculta a tecnologías de apoyo y sin recibir eventos de puntero)

#### Scenario: El rol no cambia
- **WHEN** se carga `/`
- **THEN** la capa de mesh de la sección del rol usa la composición por defecto y una opacidad igual
  a `--mesh-alpha` × 0.6

#### Scenario: Newsletter sin deriva
- **WHEN** se carga `/` sin movimiento reducido
- **THEN** la sección de newsletter usa una composición quieta distinta de la de Resources, y solo
  el mesh del rol deriva
