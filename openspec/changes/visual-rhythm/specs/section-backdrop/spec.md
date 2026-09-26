## MODIFIED Requirements

### Requirement: Ninguna sección de contenido de la home es plana
Las secciones de la home SHALL pintar un fondo con color, sin ninguna banda plana:

| Sección | Tinte | Composición del mesh | Intensidad |
|---|---|---|---|
| "The discipline, defined." | sin tinte | `b` | 0.85 |
| "Three questions define the discipline." | azul (`l1`) | `d` | 0.6 |
| El stack ("A build order...") | sin tinte | `e`, quieta | 0.8 |
| "Eight values..." | ámbar (`l4`) | `b` | 0.5 |
| Capítulos por partes ("<n> chapters in five parts...", con el número calculado desde los datos) | lima (`l5`) | `c` | 0.5 |
| Resources | sin tinte | `d`, quieta | 0.8 |
| Newsletter ("Follow the changes.") | sin tinte | `c`, quieta | 0.75 |
| El rol | sin tinte | la composición por defecto, con deriva | 0.9 |

El verdict beat y la banda final no cambian.

#### Scenario: Secciones con mesh
- **WHEN** se carga `/`
- **THEN** todas las secciones de contenido salvo el verdict beat contienen una capa de mesh visible
  y decorativa, oculta a tecnologías de apoyo y sin recibir eventos de puntero

#### Scenario: El rol no cambia
- **WHEN** se carga `/`
- **THEN** la capa de mesh de la sección del rol usa la composición por defecto
- **THEN** su opacidad es igual a `--mesh-alpha` × 0.9

#### Scenario: Newsletter sin deriva
- **WHEN** se carga `/` sin movimiento reducido
- **THEN** la sección de newsletter usa una composición quieta distinta de la de Resources
- **THEN** solo el mesh del rol deriva
