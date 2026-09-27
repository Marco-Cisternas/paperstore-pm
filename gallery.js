// Shared gallery: mouse previews are temporary; buttons work with touch and keyboard.
window.productGallery=function(product,{compact=false,href}={}){
 const photos=product.images?.length?product.images:[{src:product.image,alt:product.name}];
 const root=document.createElement('div');root.className='photo-gallery'+(compact?' compact':'');
 const stage=document.createElement(href?'a':'div');stage.className='gallery-stage';if(href){stage.href=href;stage.setAttribute('aria-label','Conocer '+product.name);}root.append(stage);
 let selected=0,preview=false;const buttons=[];const ready=new Set();
 const images=photos.map((photo,i)=>{const img=document.createElement('img');img.src=photo.src;img.alt=photo.alt;img.className='gallery-image';img.addEventListener('load',()=>{ready.add(i);render();});img.addEventListener('error',()=>{ready.delete(i);if(buttons[i])buttons[i].disabled=true;if(selected===i)selected=0;render();});stage.append(img);return img;});
 const status=document.createElement('span');status.className='gallery-status';status.setAttribute('aria-live','polite');
 function render(){const index=preview&&ready.has(1)?1:selected;images.forEach((img,i)=>{img.classList.toggle('is-active',i===index);img.setAttribute('aria-hidden',String(i!==index));});buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));status.textContent=(selected+1)+' / '+photos.length;}
 if(photos.length>1){
  const controls=document.createElement('div');controls.className='gallery-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','Vistas de '+product.name);
  photos.forEach((photo,i)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label','Ver foto '+(i+1)+' de '+product.name);if(compact){button.textContent=String(i+1);}else{const thumb=document.createElement('img');thumb.src=photo.src;thumb.alt='';button.append(thumb);}button.addEventListener('click',()=>{selected=i;preview=false;render();});buttons.push(button);controls.append(button);});controls.append(status);root.append(controls);
  stage.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'&&matchMedia('(hover: hover)').matches){preview=true;render();}});
  stage.addEventListener('pointerleave',()=>{preview=false;render();});
 }
 render();return root;
};
