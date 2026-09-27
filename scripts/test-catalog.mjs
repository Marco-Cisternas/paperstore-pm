import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
const sandbox={window:{}};
runInNewContext(await readFile(new URL('../content.js',import.meta.url),'utf8'),sandbox);
runInNewContext(await readFile(new URL('../catalog-engine.js',import.meta.url),'utf8'),sandbox);
const {select}=sandbox.PaperCatalog;
const actual=sandbox.window.PAPERSTORE_PRODUCTS;
assert.equal(select(actual,{q:'organización'}).items[0].id,'ohuhu');
assert.equal(select(actual,{q:'stábilo'}).items[0].id,'stabilo');
assert.equal(select(actual,{category:'escritura',brand:'Ohuhu'}).total,0);
assert.equal(select(actual,{category:'escritura',subcategory:'Destacadores',brand:'STABILO'}).total,3);
assert.equal(select(actual,{category:'oficina'}).total,0);
// Fixtures used only in this test; never included in site output.
const fixtures=Array.from({length:350},(_,i)=>({id:`fixture-${i}`,name:`Producto ${String(i).padStart(3,'0')}`,category:i%2?'arte':'oficina',brand:'Prueba',tags:[]}));
const ids=[];for(let page=1;page<=30;page++)ids.push(...select(fixtures,{page}).items.map(p=>p.id));
assert.equal(ids.length,350);assert.equal(new Set(ids).size,350);
assert.equal(select(fixtures,{page:999}).page,30);
assert.equal(select(fixtures,{page:-2}).page,1);
assert.equal(select(fixtures,{category:'arte',page:30}).page,15);
assert.equal(select(fixtures,{sort:'za'}).items[0].id,'fixture-349');
assert.equal(new Set(actual.map(p=>p.id)).size,actual.length);
for(const product of actual){
 assert.ok(sandbox.window.PAPERSTORE_CATEGORIES.some(c=>c.id===product.category&&c.children.includes(product.subcategory)));
 for(const record of [...product.reviews,...product.works,...product.comments])assert.ok(record.status==='approved'||(record.status==='demo'&&record.demo===true),'Solo aportes aprobados o ejemplos explícitos; nunca aportes privados');
}
for(const id of sandbox.window.PAPERSTORE_FEATURED)assert.ok(actual.some(p=>p.id===id));
console.log('Catálogo: filtros combinados, tildes, categorías, IDs y paginación con 350 registros verificados.');

assert.equal(select(actual,{activity:'organizar'}).items[0].id,'ohuhu');
assert.equal(select(actual,{activity:'colorear',brand:'POSCA'}).total,1);
assert.equal(select(actual,{activity:'tecnica'}).total,0);
assert.equal(select(actual,{activity:'escribir',brand:'LAMY'}).total,2);
