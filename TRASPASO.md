# Ruta de implementación y entrega

## Estado de esta entrega

Hecho: estructura navegable, adaptación móvil, selección de tres productos con fuente, contacto, demostración de envío→pendiente→aprobado/rechazado, descarga de observaciones, contenido separado del diseño y preparación automática del sitio estático.

Pendiente: repositorio remoto, alojamiento de revisión, recepción real, panel privado, almacenamiento, publicación pública y conexión con la cuenta de la dueña. Ninguna automatización de negocio está activa. La demostración no es un panel administrativo seguro y no debe usarse en producción.

## Automatización prioritaria elegida por el usuario

Recibir trabajos y opiniones para que la dueña los apruebe.

Propuesta para la siguiente etapa:
1. Formulario público: tipo (trabajo/opinión), nombre a mostrar, producto/materiales, título, descripción, foto opcional y autorización de publicación.
2. El servidor valida campos y archivo, asigna identificador y registra estado `pending`. Los archivos pendientes permanecen privados. Responde recepción confirmada únicamente después de guardar correctamente.
3. Panel de la dueña con inicio de sesión. Bandeja de pendientes con texto, autor, materiales y vista de imagen. Acciones: aprobar, rechazar y retirar una publicación previamente aprobada.
4. Aprobación mediante operación del servidor autorizada: registrar quién y cuándo aprobó, y mostrar solo registros `approved` y su imagen correspondiente en la web pública. Nunca confiar en un estado enviado por el visitante.
5. Rechazo: el material no es público. Retirar aprobación debe retirar también el acceso público a la foto.
6. Un aviso por correo a la dueña puede incorporarse después de que indique el destinatario y se configure el proveedor. No requiere publicar automáticamente ni enviar mensajes desde sus redes.

Arquitectura propuesta, por implementar: sitio estático y API en Cloudflare Workers, datos en D1, fotos en R2 privado, acceso de la dueña con Cloudflare Access u otra autenticación equivalente. Validar cuentas, plan y documentación vigente antes de implementar. Para la maqueta estática en GitHub Pages, estas funciones permanecen demostrativas hasta conectar la API.

Criterios de aceptación antes de activar:
- Solo la dueña autenticada puede consultar pendientes y tomar decisiones.
- Ningún visitante puede ver datos o imágenes pendientes/rechazadas, adivinando URL o identificador.
- Aprobar publica una sola vez; rechazar o retirar impide la publicación.
- Validación real de imagen (tipo y tamaño) en el servidor; límites de solicitudes y protección contra abuso.
- Registro de consentimiento y reglas claras para datos, retiro y eliminación.
- El formulario informa errores de red sin afirmar una recepción que no ocurrió.
- Sin claves, tokens ni datos privados en el código público.

## Entrega a la dueña

1. Acordar diseño, textos, categorías, fotografías y política de publicación.
2. Crear el repositorio en la cuenta del usuario y una vista de revisión. La clienta puede descargar sus comentarios desde `revision.html`; para revisión compartida en línea se necesitaría otro servicio.
3. Implementar y probar recepción y moderación con las cuentas que serán de la dueña.
4. Transferir el repositorio y conservar historial. Entregar fuentes, activos, documentación, configuración y una copia de respaldo.
5. Configurar Cloudflare y dominio bajo titularidad de la dueña. Revisar primero el enlace existente a `paperstore.cl`.
6. Conectar su cuenta de Codex al repositorio. Este traspaso no transfiere esta conversación ni conecta automáticamente ChatGPT. `AGENTS.md` y este documento permiten continuar sin depender del chat original.
7. Probar con ella: pedir un cambio de contenido, revisarlo, publicar, recibir una prueba real y aprobarla. Solo entonces dar la entrega por terminada.

## Instrucción de continuidad sugerida

“Este repositorio contiene la web de PaperStore PM. Lee README.md, FUENTES.md, TRASPASO.md y AGENTS.md antes de hacer cambios. Conserva el catálogo informativo y la aprobación humana de trabajos y opiniones. Muéstrame los cambios antes de publicarlos.”

## Ampliación v2: catálogo y comunidad por producto

- Se agregó un catálogo separado de los destacados semanales, fichas internas, búsqueda normalizada, filtros por categoría, subcategoría y marca, orden y páginas de 12 resultados.
- Los destacados son referencias a los mismos productos; cambiar la selección no elimina el resto del catálogo.
- Cada aporte lleva `productId` y tipo (trabajo, opinión o comentario). El futuro servidor debe validar ese identificador y consultar publicaciones aprobadas del producto solicitado.
- No incluir registros pendientes, rechazados ni datos privados dentro de `content.js`: es público. El filtro visual de la maqueta no equivale a protección de datos.
- La tienda aún no tiene inventario digital. Seguir CATALOGO.md para reunirlo. No generar cientos de productos ficticios.
- Las fichas iniciales STABILO y Florecer requieren completar modelo/variante y ficha técnica con la dueña antes de tratarlas como inventario definitivo.
