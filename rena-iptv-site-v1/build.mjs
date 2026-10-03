import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(root, 'dist')
fs.rmSync(dist, { recursive:true, force:true })
fs.mkdirSync(dist, { recursive:true })
for (const name of ['index.html', 'src', 'public']) {
  fs.cpSync(path.join(root, name), path.join(dist, name === 'public' ? '.' : name), { recursive:true })
}
console.log('Build concluído em dist/')
