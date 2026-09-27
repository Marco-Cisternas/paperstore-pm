import { readFile, access } from 'node:fs/promises';
import { Script } from 'node:vm';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
for(const name of ['app.js','gallery.js','content.js','catalog-engine.js','producto.js','participa.js','revision.js']) new Script(await readFile(resolve(root,name),'utf8'),{filename:name});
for(const name of ['index.html','catalogo.html','producto.html','participa.html','revision.html']) {
 const html=await readFile(resolve(root,name),'utf8');
 for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
  const target=match[1]; if (/^(https?:|data:)/.test(target)) continue;
  const [path,anchor]=target.split('#'); const file=path.split('?')[0]; await access(resolve(root,file));
  if(anchor) {const destination=await readFile(resolve(root,file),'utf8'); if(!destination.includes(`id="${anchor}"`)) throw new Error(`Ancla ausente: ${target}`);}
 }
 if(!html.includes('lang="es-CL"')) throw new Error('Falta idioma en '+name);
}
console.log('Sintaxis y enlaces locales verificados.');
