# PaperStore PM · Propuesta v3

Maqueta portable y sin dependencias. Repositorio: https://github.com/Marco-Cisternas/paperstore-pm. GitHub Pages está configurado con el flujo pages.yml. No hay dominio propio contratado.

## Ver y revisar

Abrir `index.html` directamente en el navegador, o servir esta carpeta con un servidor estático. En esta sesión la vista previa es http://127.0.0.1:4173.

- Inicio: estrellas de la semana, comunidad, dirección y contacto.
- `catalogo.html`: catálogo independiente con búsqueda, categorías/subcategorías, marca, orden y paginación de 12 productos. Filtros conservados en la URL.
- `producto.html?id=...`: ficha propia con características, usos sugeridos, reseñas, trabajos y comentarios.
- El formulario recibe el identificador de producto para asociar el aporte a su ficha.
- `participa.html`: demostración de envío y decisión de la dueña. No hay envío al servidor, cuentas, persistencia, correos ni publicación. La foto permanece en memoria del navegador y se pierde al salir.
- `revision.html`: descarga comentarios en un archivo de texto que la clienta puede enviar manualmente. No constituye una aprobación contractual ni activa publicación.

## Preparar la publicación

Con Node 20 o superior: `npm run build`. Esto verifica sintaxis y enlaces locales y genera `dist/`, que contiene exclusivamente archivos del sitio. No publica nada. El flujo check.yml valida cambios. El flujo pages.yml publica dist/ en GitHub Pages cuando se actualiza main, una vez habilitado Pages con GitHub Actions en el repositorio.

La maqueta incluye el despliegue de `dist/` preparado para GitHub Pages. Para Cloudflare, configurar el comando `npm run build` y la carpeta de salida `dist` en la cuenta de la dueña. La versión estática permite mostrar la propuesta, pero no recibir ni moderar envíos reales.

## Editar

- Contenido del catálogo: `content.js` (conservar fuentes). `PAPERSTORE_FEATURED` selecciona los destacados por ID sin eliminar productos.
- Búsqueda y paginación: `catalog-engine.js`; fichas: `producto.js`.
- Levantamiento del catálogo desde cero: `CATALOGO.md`.
- Estructura pública: `index.html`.
- Diseño y ajustes móviles: `styles.css`.
- Flujo demostrativo: `participa.html` y `participa.js`.
- Revisión: `revision.html` y `revision.js`.
- Datos de investigación y pendientes: `FUENTES.md`.
- Plan de recepción real, aprobación y entrega: `TRASPASO.md`.

Marca digitalizada en SVG a partir del logo proporcionado por el usuario: símbolo, lettering y composición separados, con fondo transparente. El lettering está convertido a curvas; no se ha identificado su fuente original. Ver assets/marca/LEEME.md. Las fichas abren dentro del sitio; sus fuentes quedan en el archivo de contenido. Se cargaron siete fichas desde redes, seis con fotografías oficiales. Florecer conserva su fotografía pendiente. Falta completar el inventario real. Consultar IMAGENES-PRODUCTOS.md para correspondencias y créditos. No hay opiniones ni proyectos inventados. La paleta de acento y textos de presentación son una propuesta, no una guía de marca confirmada.

Antes de publicar la versión definitiva: validar contenidos y autorización de activos con la dueña, conectar la recepción real y la moderación privada, retirar la banda de propuesta y el formulario de revisión, reemplazar la demostración y retirar `noindex` solo cuando corresponda. `noindex` no hace privada una página.

## Galerías

Ohuhu y las dos LAMY tienen dos vistas oficiales. `images` en `content.js` contiene cada ruta y su descripción. `gallery.js` muestra una vista temporal con el mouse, restaura la seleccionada al salir y permite elegir con botones/miniaturas mediante teclado o tacto. Los productos con una foto no muestran controles. Se respeta la preferencia de movimiento reducido. Las galerías usan fotografías del mismo modelo; no representan variantes de compra ni stock.
