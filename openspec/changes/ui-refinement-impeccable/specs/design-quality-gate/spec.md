# Spec Delta

## Purpose
Mantener documentado el sistema visual del sitio en ficheros que las herramientas de diseño puedan
leer, y comprobar en cada build que el HTML generado no introduce anti-patrones de diseño nuevos.

## ADDED Requirements

### Requirement: Documentación del sistema visual
El sitio SHALL incluir `site/DESIGN.md` con los tokens de color (claro y oscuro), la escala tipográfica,
las tres familias de fuente, las primitivas de efectos disponibles y las tres restricciones duras
(solo transform en el fold, texto nunca atenuado con opacity, `--muted` re-escopado en bandas).
`site/PRODUCT.md` SHALL describir el producto, la audiencia y la voz editorial. Ambos MUST estar
versionados en git.

#### Scenario: Herramienta de diseño lee el sistema
- **WHEN** una auditoría de diseño se ejecuta sobre `site/`
- **THEN** propone cambios usando únicamente los tokens listados en `DESIGN.md` y no introduce
  colores ni fuentes nuevos

### Requirement: Gate del detector de anti-patrones
Tras cada build completo, el detector de anti-patrones SHALL ejecutarse sobre `dist/`. El número de
hallazgos MUST NOT superar el del baseline registrado antes de este cambio.

#### Scenario: Comparación con el baseline
- **WHEN** se ejecuta el detector sobre `dist/` al terminar los bloques de mejora
- **THEN** el recuento total de hallazgos es menor o igual al del baseline y no aparece ninguna regla
  nueva que no estuviera en él
