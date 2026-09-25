# Tasks

Worktree `D:/Documents/aige-wt/c20-existing-law`, rama `wt/c20-existing-law`. Un solo implementador;
el orquestador integra. Sin cambios en ficheros compartidos: lo que les toca va al handoff.

## 1. Preparación

- [x] 1.1 Leer `STYLEGUIDE.md`, los capítulos 01, 04, 05, 06 y 08 y `site/src/lib/remark-callouts.ts`; anotar nombres exactos de las capas, anclas `#pattern-*` y sintaxis de callouts
- [x] 1.2 Revisar la lista privada de temas (Dominio II, II.B.1–II.B.4) solo como lista de cobertura, sin copiar redacción ni citarla

## 2. Verificación de fuentes

- [x] 2.1 Verificar en texto legal los artículos de la UE citados (DSM 3–4, AI Act 5, 50, 53 y Anexo III, PLD 2024/2853, Directiva de plataformas 2024/2831, CCD2, UCPD, Directiva 2019/2161, DSA, 96/9, 2016/943, 2000/43, 2000/78)
- [x] 2.2 Verificar en fuente primaria las normas de EE. UU. y Reino Unido (17 USC 107, 42 USC 2000e-2(k), 29 CFR 1607.4(D), 12 CFR 1002.9, 15 USC 45(n) y 1681m, 18 USC 1839, EO 14281, propuestas de HUD, TAKE IT DOWN Act, CDPA 29A y 9(3), DMCC s. 225 y Sch. 20, SOA 2003 s. 66B, DUAA s. 138)
- [x] 2.3 Verificar el estado de los casos a 2026-09-24 en los expedientes (Ross, Bartz, Kadrey, Andersen, Midjourney, Mobley, Garcia) y en fuentes secundarias (NYT, LAION, GEMA, Like Company, Getty, Thaler cert)
- [x] 2.4 Marcar «(verify)» y listar en el informe lo que no se pudo confirmar (apelación GEMA, opinión del AG en Like Company, ley de Illinois, reglas de Colorado por ramo, detalle de la orden en Garcia, leyes estatales de deepfakes, fecha de aplicación de CCD2)

## 3. Capítulo

- [x] 3.1 Escribir `bok/20-existing-law.md` con H1, entradilla de una frase, las secciones H2 del spec y tablas fechadas, sin rayas y con el inglés británico de la casa
- [x] 3.2 Vincular cada deber a artefacto, capa y patrón existente; presentar Training-Data Rights Ledger y Claims Substantiation Gate como propuestos, sin enlace
- [x] 3.3 Añadir los callouts «In practice (illustrative)» y «Example (illustrative)», la línea «Maps to» con «Mappings are illustrative, not a claim of conformity» y «What you can do this week»
- [x] 3.4 Numerar las fuentes por orden de aparición con el formato del capítulo 08 y comprobar que no quedan claves sin usar
- [x] 3.5 Ajustar el cuerpo a 4.000–7.000 palabras y reenvolver la prosa a unos 100 caracteres

## 4. Handoff y verificación

- [x] 4.1 Escribir `D:/Documents/aige-wt/handoffs/c20-existing-law.json` (resumen, glance, glosario, obligaciones, crosswalk, figuras, patrones, enlaces cruzados, lecturas, rutas, notas y filas para `sources/SOURCES.md`) y validarlo como JSON
- [x] 4.2 Ejecutar `bash D:/Documents/aige-wt/build.sh` y dejarlo en verde (astro check, build, content-lint, check-links, pagefind)
- [x] 4.3 Ejecutar `openspec validate bok-ch20-existing-law --strict` hasta que pase
- [x] 4.4 Commit con rutas explícitas y mensaje convencional en español, sin atribuciones ni `--no-verify`
