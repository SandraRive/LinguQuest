# ENGLISH QUEST

Academia de inglés de cero absoluto a B2, ambientada en un apocalipsis zombie en tonos pastel.
Funciona entera en el navegador: sin servidor, sin base de datos y sin internet una vez cargada.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube esta carpeta (rama `main`).
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Listo: cada vez que subas cambios, GitHub pasa los tests, construye la web y la publica solo
   (pestaña **Actions** para ver el progreso). La dirección aparece en Settings → Pages.

## Trabajar en local

```bash
npm install
npm run dev          # desarrollo en http://localhost:5173
npm test             # tests: corrección, repasos, contenido, escritura, traspaso, gamificación
npm run build        # web lista para publicar en dist/
```

## Tu progreso

Se guarda en el navegador de cada dispositivo. Para pasarlo del ordenador al móvil (o al revés):
**Ficha → Pasar a otro dispositivo**. Un dispositivo enseña unos códigos QR y el otro los escanea
con la cámara. También se puede copiar y pegar como texto. Antes de reemplazar nada se muestra un
resumen, y el progreso anterior queda guardado para poder deshacer.

## Qué incluye

**Contenido PRE-A1 completo** (los 15 temas del MCER del spec), en 16 salas y 4 unidades con su horda:

| Unidad | Salas |
| --- | --- |
| La primera noche | Pronombres · TO BE afirmativo · TO BE negativo y preguntas |
| Señales de radio | Alfabeto · Pronunciación inicial · Sonidos básicos · Números |
| El almacén | Sustantivos · Artículos · Singular y plural · Objetos cotidianos · Colores |
| Supervivientes | Familia y posesivos · Días y meses · Saludos y presentaciones · Frases sencillas |

Además: jefe final de PRE-A1 (examen por competencias) y unas 115 palabras con IPA UK/US.

**Módulos**: Refugio · Taller · hordas y jefe final · comparaciones · Radio (listening) · Diarios (reading) ·
Banco de fabricación (writing guiado con corrector) · Walkie-talkie (speaking con el reconocimiento de voz del navegador) ·
Mantenimiento (repetición espaciada FSRS) · Saqueo · Manual · Encargos · Trofeos · Árbol de habilidades · Taquilla · Diario · Ficha.
Botón «NO LO ENTIENDO» con explicaciones alternativas escritas para cada sala.

## Qué falta

| Pieza | Estado |
| --- | --- |
| Contenido A1, A2, B1 y B2 | Por construir, nivel a nivel. |
| Nota de pronunciación | No se puntúa: haría falta un servicio que analice el audio. |
| Voz | Es la del navegador; la calidad depende del dispositivo. |
| Revisión del contenido | Conviene que lo revise alguien con nivel C1/C2. |

## Estructura

```
src/
  app/        layout y rutas (#refugio, #taller, #sala-<id>, #radio…)
  features/   un módulo por carpeta
  engine/     ejercicios, FSRS + dominio, corrector de escritura, gamificación
  content/    contenido tipado y validado con Zod (pre-a1/unit1-4, vocab, skills, exams)
  lib/        store (localStorage), voz, router, traspaso entre dispositivos
  ui/         componentes reutilizables
tests/        Vitest
.github/workflows/deploy.yml   publicación automática en GitHub Pages
```
