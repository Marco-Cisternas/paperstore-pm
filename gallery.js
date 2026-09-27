// Shared gallery: mouse previews are temporary; buttons work with touch and keyboard.
window.productGallery=function(product,{compact=false,href}={}){
 const photos=product.images?.length?product.images:[{src:product.image,alt:product.name}];
 const root=document.createElement('div');root.className='photo-gallery'+(compact?' compact':'');
 const stage=document.createElement(href?'a':'button');stage.className='gallery-stage';if(href){stage.href=href;stage.setAttribute('aria-label','Conocer '+product.name);}if(!href){stage.type='button';stage.setAttribute('aria-label','Ampliar imágenes de '+product.name);stage.setAttribute('aria-haspopup','dialog');}root.append(stage);
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
 if(!href){
  let dialog;
  stage.addEventListener('click',()=>{
   const initial=preview&&ready.has(1)?1:selected;
   if(!dialog){
    dialog=document.createElement('dialog');dialog.className='image-viewer';dialog.setAttribute('aria-label','Imágenes ampliadas de '+product.name);
    const heading=document.createElement('p');heading.className='viewer-title';heading.textContent=product.name;
    const close=document.createElement('button');close.type='button';close.className='viewer-close';close.textContent='Cerrar ×';close.setAttribute('aria-label','Cerrar imágenes ampliadas');close.autofocus=true;
    const picture=document.createElement('img');picture.className='viewer-image';picture.draggable=false;
    const controls=document.createElement('div');controls.className='viewer-controls';
    const previous=document.createElement('button');previous.type='button';previous.textContent='←';previous.setAttribute('aria-label','Foto anterior');
    const next=document.createElement('button');next.type='button';next.textContent='→';next.setAttribute('aria-label','Foto siguiente');
    const count=document.createElement('span');count.setAttribute('aria-live','polite');
    const thumbs=document.createElement('div');thumbs.className='viewer-thumbnails';thumbs.setAttribute('role','group');thumbs.setAttribute('aria-label','Elegir imagen ampliada');
    const thumbButtons=photos.map((photo,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Ampliar foto '+(i+1));const img=document.createElement('img');img.src=photo.src;img.alt='';b.append(img);b.addEventListener('click',()=>show(i));thumbs.append(b);return b;});
    function show(i){selected=(i+photos.length)%photos.length;preview=false;picture.src=photos[selected].src;picture.alt=photos[selected].alt;count.textContent=(selected+1)+' / '+photos.length;thumbButtons.forEach((b,n)=>b.setAttribute('aria-pressed',String(n===selected)));render();}
    close.addEventListener('click',()=>dialog.close());previous.addEventListener('click',()=>show(selected-1));next.addEventListener('click',()=>show(selected+1));
    dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(selected+(e.key==='ArrowLeft'?-1:1));}});
    let start;
    picture.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'&&e.isPrimary){start={x:e.clientX,y:e.clientY,id:e.pointerId};picture.setPointerCapture(e.pointerId);}});
    picture.addEventListener('pointerup',e=>{if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)show(selected+(dx<0?1:-1));});
    picture.addEventListener('pointercancel',()=>{start=null;});
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
    dialog.addEventListener('close',()=>{document.body.classList.remove('viewer-open');stage.focus({preventScroll:true});});
    previous.hidden=next.hidden=thumbs.hidden=photos.length<2;
    controls.append(previous,count,next);dialog.append(heading,close,picture,controls,thumbs);document.body.append(dialog);
    dialog.showPhoto=show;
   }
   dialog.showPhoto(initial);document.body.classList.add('viewer-open');dialog.showModal();
  });
 }
 render();return root;
};
