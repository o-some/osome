import { createServer } from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, join, sep, extname } from 'node:path';

const root = resolve('dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
const port = Number(process.env.PORT || 4321);
const basePath = process.env.SITE_BASE_PATH || '/';
const files = new Map();
async function load(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await load(path);
    else files.set('/' + path.slice(root.length + 1).split(sep).join('/'), await readFile(path));
  }
}
await load(root);
createServer((request,response) => {
  let pathname;
  try { pathname = decodeURI(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end('Bad request'); return; }
  const localPath = pathname.startsWith(basePath) ? pathname.slice(basePath.length - 1) : '/not-found';
  const key = localPath.endsWith('/') ? localPath + 'index.html' : extname(localPath) ? localPath : localPath + '/index.html';
  const body = files.get(key);
  const found = Boolean(body);
  response.writeHead(found ? 200 : 404, {
    'Content-Type': types[extname(found ? key : '/404.html')] || 'application/octet-stream',
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex, nofollow'
  }).end(found ? body : files.get('/404.html'));
}).listen(port, '127.0.0.1', () => console.log(`O-SOME preview: http://127.0.0.1:${port}${basePath} (${files.size} files cached)`));
