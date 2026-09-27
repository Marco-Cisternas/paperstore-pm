# Levantar el catálogo de Paper Store

La dueña aún no tiene un listado digital. La web ya dispone de estructura para consultar cientos de fichas; el contenido real debe levantarse por etapas.

## Organización inicial propuesta

- Arte y creatividad: libros para colorear, pintura, dibujo.
- Escritura y papelería: destacadores, lápices y marcadores, cuadernos y papeles.
- Organización: organizadores de materiales.
- Oficina: accesorios de escritorio, archivo y organización.
- Librería técnica: materiales técnicos (precisar familias con la dueña).
- Juguetes y regalos: juguetes, regalos.

Validar estas familias recorriendo los estantes. Una categoría vacía en la maqueta significa que no hemos cargado su contenido, no que la tienda esté sin existencias.

## Datos a recoger por producto

1. Código estable de la tienda (o asignar uno), nombre comercial y marca.
2. Categoría y subcategoría.
3. Modelo, presentación y variantes: unidades del set, tamaño, color, tipo de punta, etc., solo lo que corresponda y esté confirmado.
4. Descripción breve y características comprobadas en el envase o con el proveedor.
5. Fotografía real de frente y, cuando aporte información, reverso o detalle.
6. Usos sugeridos, compatibles con la ficha técnica.
7. Estado editorial: pendiente de completar, listo para revisar, aprobado para mostrar.

No es necesario publicar precios ni llevar stock en esta primera versión informativa. No marcar “disponible” sin un proceso de actualización acordado.

## Método de carga

Trabajar por estante o familia en lotes de 20–30 artículos. Registrar cada producto una sola vez y asociar fotos al código. Revisar duplicados y variantes antes de aprobar el lote. Esos datos alimentarán el catálogo; usar las publicaciones de Instagram como punto de partida y completar con un recorrido de la tienda para cubrir los productos que nunca aparecen en redes.

La estructura actual usa `content.js`. Cada producto contiene un ID estable, categoría, subcategoría, marca, nombre, descripción, imagen, palabras de búsqueda, características y usos. Las reseñas, trabajos y comentarios públicos quedan asociados al mismo ID. El sistema real almacenará estos aportes y su moderación por separado.

Los IDs actuales son provisionales. Si se cambian al incorporar códigos reales, mantener las URLs previas o redirigirlas para no romper enlaces ni asociaciones de reseñas.

## Estrellas de la semana

Editar `PAPERSTORE_FEATURED` con los IDs elegidos. Un producto puede dejar de ser destacado y seguirá apareciendo en su categoría y en la búsqueda. No hay rotación automática activa; la selección semanal debe definirla la dueña. Se puede automatizar más adelante con fechas de inicio y fin.

## Fotografías y reseñas pendientes

La primera carga reúne siete fichas: seis tienen fotografías oficiales de fabricantes y Florecer indica fotografía pendiente. Ver IMAGENES-PRODUCTOS.md. Los listados de reseñas, trabajos y comentarios están vacíos: no se inventaron contenidos de clientes ni puntuaciones. Al recibir fotos y datos confirmados, las fichas se completan conservando su estructura.
