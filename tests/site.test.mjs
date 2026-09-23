import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SHOP_URL, products, dressingArchive, categories, RECIPE_SLUG } from '../src/data.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const basePath = process.env.SITE_BASE_PATH || '/';
const publicOrigin = process.env.PUBLIC_ORIGIN || '';
const legalReferences = new Set([
  'https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages',
  'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
  'https://www.chelonaki.eu/datenschutz/'
]);
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(async entry => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]))).flat();
}
const htmlFiles = (await files(dist)).filter(file => file.endsWith('.html'));
const pages = await Promise.all(htmlFiles.map(async file => [file, await readFile(file, 'utf8')]));

test('all required editorial routes are built', async () => {
  const routes = ['/', '/collections/all', ...categories.map(c => c.path),
    ...products.map(p => `/products/${p.slug}`), ...dressingArchive.map(p => `/products/${p.slug}`),
    '/pages/uber-uns', '/pages/geschaftskunden', '/pages/private-label', '/pages/contact',
    '/pages/rezepte', '/blogs/rezepte', RECIPE_SLUG, '/policies/legal-notice', '/policies/privacy-policy'];
  for (const route of routes) {
    const path = route === '/' ? join(dist, 'index.html') : join(dist, decodeURI(route.slice(1)), 'index.html');
    assert.ok((await stat(path)).isFile(), route);
  }
  assert.ok((await stat(join(dist, '404.html'))).isFile());
});

test('every page has one heading, preview robots, and the exact external shop destination', () => {
  assert.ok(pages.length >= 20);
  for (const [file, html] of pages) {
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, file);
    assert.match(html, /<meta name="robots" content="noindex, nofollow">/, file);
    assert.match(html, /<a class="shop-link [^"]*" href="https:\/\/www\.chelonaki\.eu\/shop" data-shop-link/, file);
    for (const tag of html.match(/<a\b[^>]*data-shop-link[^>]*>/g) || []) {
      assert.match(tag, new RegExp(`href="${SHOP_URL.replaceAll('.', '\\.')}"`), file);
    }
    assert.doesNotMatch(html, /(?:\/cart|\/checkout|shopify\.js|stripe\.js)/i, file);
  }
});

test('local image and navigation targets exist; no hidden external dependencies', async () => {
  for (const [file, html] of pages) {
    for (const [, src] of html.matchAll(/<img\b[^>]*src="([^"]+)"/g)) {
      assert.ok(src.startsWith(`${basePath}images/`), `${file}: ${src}`);
      assert.ok((await stat(join(dist, src.slice(basePath.length)))).isFile(), `${file}: ${src}`);
    }
    for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      if (href.startsWith(basePath)) {
        const target = href.split('#')[0].split('?')[0];
        assert.ok((await stat(join(dist, decodeURI(target.slice(basePath.length)), 'index.html'))).isFile(), `${file}: ${href}`);
      } else assert.ok(href.startsWith('mailto:') || href.startsWith('tel:') || href === SHOP_URL || legalReferences.has(href) || href.startsWith('#'), `${file}: ${href}`);
    }
    assert.doesNotMatch(html, /<script[^>]+src="https?:|<link rel="stylesheet"[^>]+href="https?:/i, file);
  }
});

test('assets have a source and rights status in the manifest', async () => {
  const manifest = JSON.parse(await readFile(join(root, 'docs/assets.json'), 'utf8'));
  const entries = Array.isArray(manifest) ? manifest : manifest.assets;
  assert.ok(Array.isArray(entries));
  for (const asset of entries) {
    assert.ok(asset.originalSource, JSON.stringify(asset));
    assert.ok(asset.rights, JSON.stringify(asset));
  }
});

test('published pages have their own canonical and absolute social image', () => {
  if (!publicOrigin) return;
  for (const [file, html] of pages) {
    if (file.endsWith('/404.html')) continue;
    const route = file.slice(dist.length + 1).replace(/index\.html$/, '');
    const canonical = `${publicOrigin}${basePath}${encodeURI(route)}`;
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`), file);
    assert.ok(html.includes(`<meta property="og:url" content="${canonical}">`), file);
    assert.ok(html.includes(`<meta property="og:image" content="${publicOrigin}${basePath}images/logo.png">`), file);
  }
});
