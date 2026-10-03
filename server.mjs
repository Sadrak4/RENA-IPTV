import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, process.argv[2] || '.')
const port = Number(process.env.PORT || 5173)
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.jpg':'image/jpeg', '.png':'image/png', '.webmanifest':'application/manifest+json' }

const server = http.createServer((req, res) => {
  let pathname = decodeURIComponent((req.url || '/').split('?')[0])
  if (pathname === '/') pathname = '/index.html'
  const file = path.resolve(root, '.' + pathname)
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden') }
  fs.stat(file, (err, stat) => {
    const target = !err && stat.isDirectory() ? path.join(file, 'index.html') : file
    fs.readFile(target, (readErr, data) => {
      if (readErr) {
        fs.readFile(path.join(root, 'index.html'), (fallbackErr, fallback) => {
          if (fallbackErr) { res.writeHead(404); return res.end('Not found') }
          res.writeHead(200, { 'Content-Type':'text/html; charset=utf-8' }); res.end(fallback)
        })
        return
      }
      res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' })
      res.end(data)
    })
  })
})

server.listen(port, () => console.log(`RENA IPTV: http://localhost:${port}`))
