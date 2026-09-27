(() => {
 const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 function select(items,{q='',category='',subcategory='',brand='',sort='az',page=1,pageSize=12}={}) {
  const words=normalize(q).split(/\s+/).filter(Boolean);
  const filtered=items.filter(p=>(!category||p.category===category)&&(!subcategory||p.subcategory===subcategory)&&(!brand||p.brand===brand)&&words.every(word=>normalize([p.name,p.description,p.brand,p.category,p.categoryLabel,p.subcategory,...(p.tags||[])].join(' ')).includes(word)));
  filtered.sort((a,b)=>sort==='za'?b.name.localeCompare(a.name,'es'):a.name.localeCompare(b.name,'es'));
  const size=Number.isFinite(Number(pageSize))?Math.max(1,Math.floor(Number(pageSize))):12;
  const pages=Math.max(1,Math.ceil(filtered.length/size)); const current=Math.min(pages,Math.max(1,parseInt(page,10)||1));
  return {items:filtered.slice((current-1)*size,current*size),total:filtered.length,pages,page:current};
 }
 globalThis.PaperCatalog={normalize,select};
})();
