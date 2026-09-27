document.querySelector('#review').addEventListener('submit',event=>{
 event.preventDefault(); const data=new FormData(event.target);
 const text=['PAPERSTORE PM — REVISIÓN DE PROPUESTA V2','Fecha: '+new Date().toLocaleDateString('es-CL'),'Nombre: '+data.get('name'),'Sección: '+data.get('section'),'Estado: '+data.get('decision'),'','COMENTARIOS',data.get('comments'),'','Este archivo no ha sido enviado automáticamente.'].join('\n');
 document.querySelector('#review-copy').hidden=false; document.querySelector('#review-summary').value=text;
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
 const link=document.createElement('a'); link.href=url; link.download='paperstore-comentarios-v2.txt'; document.body.append(link); link.click(); link.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
 document.querySelector('#review-status').textContent='Se preparó el archivo. Si tu navegador no lo descarga, copia el resumen que aparece abajo y compártelo con quien desarrolla la página.';
});
