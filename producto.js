const target=document.querySelector('#product-detail');
const id=new URLSearchParams(location.search).get('id');
const product=(window.PAPERSTORE_PRODUCTS||[]).find(p=>p.id===id);
function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
function link(text,url,cls='text-link'){const node=el('a',cls,text);node.href=url;return node;}
if(!product){target.append(el('h1','','No encontramos ese producto.'),el('p','','Puedes buscarlo por nombre o categoría en el catálogo.'),link('Explorar catálogo','catalogo.html','button dark'));}
else{
 document.title=product.name+' · Paper Store';document.querySelector('#crumb').textContent=product.name;
 const top=el('section','product-overview'),visual=el('div','detail-visual '+product.tone);
 if(product.image){visual.append(productGallery(product));}else{visual.append(el('span','eyebrow',product.subcategory),el('strong','product-word',product.detail),el('span','small','Fotografía del producto por incorporar'));}
 const summary=el('div','product-summary');summary.append(el('p','eyebrow',(window.PAPERSTORE_CATEGORIES||[]).find(c=>c.id===product.category)?.name),el('h1','',product.name),el('p','detail-description',product.description));
 const specs=el('dl','specs');for(const [label,value] of product.specs){specs.append(el('dt','',label),el('dd','',value));}summary.append(specs,el('p','small','Consulta variedades y disponibilidad con la tienda.'));
 if(product.image){visual.classList.add('has-photo');visual.append(el('p','photo-credit',product.imageNote||'Fotografía de referencia del producto.'));}
 top.append(visual,summary);target.append(top);
 const navigation=el('nav','detail-nav');navigation.setAttribute('aria-label','Información del producto');for(const [name,anchor] of [['Usos e ideas','usos'],['Reseñas','resenas'],['Trabajos','trabajos'],['Comentarios','comentarios']])navigation.append(link(name,'#'+anchor));target.append(navigation);
 const uses=el('section','detail-section');uses.id='usos';uses.append(el('p','eyebrow','PARA EMPEZAR'),el('h2','','Usos e ideas'));const ul=el('ul','usage-list');for(const idea of product.uses)ul.append(el('li','',idea));uses.append(ul,el('p','small',product.usageNote));target.append(uses);
 const sections=[['resenas','Reseñas del producto','Aún no hay reseñas publicadas de este producto.','Compartir mi reseña','opinion',product.reviews],['trabajos','Creado con este producto','Aquí aparecerán los trabajos aprobados que usen este material.','Compartir un trabajo','trabajo',product.works],['comentarios','Comentarios y consultas','¿Has probado este producto o quieres saber cómo usarlo?','Dejar un comentario','comentario',product.comments]];
 for(const [anchor,title,empty,action,kind,records] of sections){
  const section=el('section','detail-section');section.id=anchor;
  const visible=records.filter(record=>record.status==='approved');
  section.append(el('h2','',title),el('p','small',visible.length+' publicaciones'));
  if(!visible.length)section.append(el('p','',empty));
  for(const record of visible){const entry=el('article','community-entry');entry.append(el('h3','',record.title),el('p','',record.text),el('p','small','Por '+record.author));if(record.image){const img=el('img','community-image');img.src=record.image;img.alt=record.title;entry.append(img);}section.append(entry);}
  section.append(link(action,'participa.html?producto='+encodeURIComponent(product.id)+'&tipo='+kind,'button outline'));target.append(section);
 }
 const note=el('p','notice','En esta propuesta puedes probar el envío y la revisión. Las reseñas, trabajos y comentarios reales se publicarán aquí solo después de la aprobación del equipo de Paper Store.');target.append(note);
}
