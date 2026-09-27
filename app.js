const allProducts=window.PAPERSTORE_PRODUCTS || [];
const categories=window.PAPERSTORE_CATEGORIES || [];
const categoryName=id=>categories.find(c=>c.id===id)?.name||id;
function element(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
function productCard(product){
 const card=element('article','product'); const link=element('a','product-link'); link.href='producto.html?id='+encodeURIComponent(product.id);
 const face=element('div','product-face '+product.tone);
 if(product.image){card.append(productGallery(product,{compact:true,href:link.href}));}
 else {face.append(element('span','eyebrow',product.subcategory),element('strong','product-word',product.detail),element('span','small','FOTOGRAFÍA POR INCORPORAR'));}
 const body=element('div','product-body');body.append(element('p','product-name',categoryName(product.category)),element('h3','',product.name),element('p','',product.description),element('span','text-link','Conocer el producto ↗'));
 if(!product.image)link.append(face);link.append(body);card.append(link);return card;
}
const home=document.querySelector('#products');
if(home){for(const id of window.PAPERSTORE_FEATURED||[]){const product=allProducts.find(p=>p.id===id);if(product)home.append(productCard(product));}}
const catalog=document.querySelector('#catalog-grid');
if(catalog){
 document.querySelector('#catalog-note').textContent='Catálogo en preparación: '+allProducts.length+' fichas cargadas. Incorporaremos el inventario completo de la tienda.';
 const form=document.querySelector('#catalog-filters');const search=form.elements.q,cat=form.elements.category,sub=form.elements.subcategory,brand=form.elements.brand,sort=form.elements.sort;
 for(const c of categories)cat.add(new Option(c.name,c.id));
 for(const value of [...new Set(allProducts.map(p=>p.brand))].filter(x=>x&&x!=='Por confirmar').sort())brand.add(new Option(value,value));
 function subcategories(value=''){sub.replaceChildren(new Option('Todas las subcategorías',''));const groups=cat.value?categories.filter(c=>c.id===cat.value):categories;for(const name of [...new Set(groups.flatMap(c=>c.children))])sub.add(new Option(name,name));sub.value=value;}
 function state(){return {q:search.value,category:cat.value,subcategory:sub.value,brand:brand.value,sort:sort.value};}
 function render(page=1,update=true){
  const result=PaperCatalog.select(allProducts,{...state(),page});catalog.replaceChildren(...result.items.map(productCard));
  document.querySelector('#result-count').textContent=result.total+' '+(result.total===1?'producto':'productos')+' · '+(result.total?'Página '+result.page+' de '+result.pages:'Sin coincidencias');
  const empty=document.querySelector('#catalog-empty');empty.hidden=result.total>0;
  document.querySelector('#empty-description').textContent=cat.value&&!allProducts.some(p=>p.category===cat.value)?'Todavía no hemos cargado productos de esta categoría en la propuesta.':'Prueba otro nombre o quita algún filtro.';
  const pagination=document.querySelector('#pagination');pagination.replaceChildren();
  if(result.pages>1){for(const [label,next,disabled] of [['Anterior',result.page-1,result.page===1],['Siguiente',result.page+1,result.page===result.pages]]){const button=element('button','button outline',label);button.disabled=disabled;button.type='button';button.addEventListener('click',()=>{render(next);document.querySelector('#result-count').focus();});pagination.append(button);}}
  if(update){const params=new URLSearchParams();for(const [key,value] of Object.entries(state()))if(value&&(key!=='sort'||value!=='az'))params.set(key,value);if(result.page>1)params.set('page',result.page);history.replaceState(null,'',location.pathname+(params.size?'?'+params:''));}
 }
 function restore(){const params=new URLSearchParams(location.search);search.value=params.get('q')||'';cat.value=params.get('category')||'';brand.value=params.get('brand')||'';sort.value=params.get('sort')==='za'?'za':'az';subcategories(params.get('subcategory')||'');render(params.get('page')||1,false);}
 form.addEventListener('submit',event=>{event.preventDefault();render();});search.addEventListener('input',()=>render());
 cat.addEventListener('change',()=>{subcategories();render();});for(const control of [sub,brand,sort])control.addEventListener('change',()=>render());
 for(const reset of document.querySelectorAll('[data-clear]'))reset.addEventListener('click',()=>{form.reset();subcategories();render();search.focus();});
 window.addEventListener('popstate',restore);restore();
}
