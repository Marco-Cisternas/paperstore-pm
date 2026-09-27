import './check.mjs';
import { mkdir, copyFile, cp } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const out=resolve(root,'dist'); await mkdir(out,{recursive:true});
for(const name of ['index.html','catalogo.html','producto.html','participa.html','revision.html','styles.css','app.js','gallery.js','content.js','catalog-engine.js','producto.js','participa.js','revision.js']) await copyFile(resolve(root,name),resolve(out,name));
await cp(resolve(root,'assets'),resolve(out,'assets'),{recursive:true});
console.log('Sitio estático preparado en dist/. No se ha publicado.');
