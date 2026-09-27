const form = document.querySelector('#submission');
const panel = document.querySelector('#moderation');
const photo = document.querySelector('#photo');
let imageUrl;
photo.addEventListener('change', () => { photo.setCustomValidity(''); document.querySelector('#file-error').textContent=''; });
form.addEventListener('submit', event => {
 event.preventDefault();
 const file = photo.files[0];
 if (file && (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 5*1024*1024)) {
  const message='Elige una imagen JPG, PNG o WebP de hasta 5 MB.'; photo.setCustomValidity(message); document.querySelector('#file-error').textContent=message; photo.reportValidity(); return;
 }
 const data = new FormData(form);
 document.querySelector('#submitted-kind').textContent=({trabajo:'Trabajo o proyecto',opinion:'Opinión de producto',comentario:'Comentario o consulta'})[data.get('kind')];
 document.querySelector('#submitted-title').textContent=data.get('title');
 document.querySelector('#submitted-author').textContent='Por '+data.get('name');
 document.querySelector('#submitted-materials').textContent='Materiales: '+data.get('materials');
 document.querySelector('#submitted-story').textContent=data.get('story');
 const image=document.querySelector('#submitted-image');
 if (imageUrl) URL.revokeObjectURL(imageUrl);
 image.hidden=!file; if(file) { imageUrl=URL.createObjectURL(file); image.src=imageUrl; } else { image.removeAttribute('src'); }
 document.querySelector('#state').textContent='Pendiente de revisión';
 document.querySelector('#decisions').hidden=false;
 document.querySelector('#decision-result').textContent='Todavía no es público. Esta prueba no tiene almacenamiento ni acceso privado.';
 panel.hidden=false; form.hidden=true; panel.setAttribute('tabindex','-1'); panel.focus();
});
function decide(approved) {
 document.querySelector('#state').textContent=approved?'Aprobado · simulación':'Rechazado · simulación';
 document.querySelector('#decision-result').textContent=approved?'En la plataforma conectada, este contenido aparecería en la comunidad. No se ha publicado nada en esta prueba.':'En la plataforma conectada, este contenido permanecería fuera de la página pública. No se ha enviado ninguna notificación.';
 document.querySelector('#decisions').hidden=true;
}
document.querySelector('#approve').addEventListener('click',()=>decide(true));
document.querySelector('#reject').addEventListener('click',()=>decide(false));
document.querySelector('#restart').addEventListener('click',()=>{form.reset(); applyProductContext(); photo.setCustomValidity(''); if(imageUrl) URL.revokeObjectURL(imageUrl); panel.hidden=true; form.hidden=false; document.querySelector('#name').focus();});

function applyProductContext(){
 const params=new URLSearchParams(location.search);const product=(window.PAPERSTORE_PRODUCTS||[]).find(p=>p.id===params.get('producto'));
 const kind=params.get('tipo');if(['trabajo','opinion','comentario'].includes(kind))document.querySelector('#kind').value=kind;
 if(product){document.querySelector('#product-id').value=product.id;document.querySelector('#materials').value=product.name;document.querySelector('#materials').readOnly=true;const context=document.querySelector('#product-context');context.hidden=false;context.textContent='Tu envío quedará asociado a: '+product.name;const back=document.querySelector('#product-return');back.hidden=false;back.href='producto.html?id='+encodeURIComponent(product.id);}
}
applyProductContext();
