import { chromium } from 'playwright-core';
import axe from 'axe-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SHOP_URL, RECIPE_SLUG } from '../src/data.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4321';
const chrome = process.env.CHROME_PATH || 'chrome';
const widths = [320, 360, 375, 390, 393, 430, 768, 1024, 1440, 1920, 2560];
const routes = ['/', '/collections/all', '/collections/pesto', '/collections/dressing', '/collections/aioli',
  '/products/o-some-taste-pesto-basilikum', '/products/dressing-zitrone-salbei',
  '/pages/uber-uns', '/pages/geschaftskunden', '/pages/private-label', '/pages/contact',
  '/pages/rezepte', '/blogs/rezepte', '/policies/legal-notice', '/policies/privacy-policy'];
const evidence = join(root, 'evidence');
const screenshots = process.env.QA_SCREENSHOTS === '1';
const problems = [];
const result = { at: new Date().toISOString(), browser: chrome, base, widths, routes, checked: 0, problems, axe: [], timings: [] };
const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: chrome } : { channel: 'chrome' }), headless: true, timeout: 15000 });
await mkdir(evidence, { recursive: true });

try {
  for (const width of widths) {
    console.log(`width ${width}`);
    const height = width <= 375 ? 667 : width <= 430 ? 844 : 900;
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'no-preference' });
    page.on('pageerror', error => problems.push({ width, type: 'pageerror', message: error.message }));
    page.on('console', message => { if (message.type() === 'error') problems.push({ width, type: 'console', message: message.text() }); });
    page.on('request', request => { if (!request.url().startsWith(base) && !request.url().startsWith('data:')) problems.push({ width, type: 'third-party-request', url: request.url() }); });
    page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) problems.push({ width, type: 'resource', status: response.status(), url: response.url() }); });
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      const state = await page.evaluate(() => {
        const header = document.querySelector('.site-header').getBoundingClientRect();
        const logo = document.querySelector('.brand').getBoundingClientRect();
        const shop = document.querySelector('.header-shop').getBoundingClientRect();
        const menu = document.querySelector('.mobile-menu>summary').getBoundingClientRect();
        return { client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth,
          h1: document.querySelectorAll('h1').length, shopLinks: [...document.querySelectorAll('[data-shop-link]')].map(a => a.href),
          header: { top: header.top, bottom: header.bottom }, logo: { right: logo.right, bottom: logo.bottom },
          shop: { left: shop.left, right: shop.right, bottom: shop.bottom }, menu: { left: menu.left, right: menu.right, bottom: menu.bottom } };
      });
      result.checked++;
      if (response.status() !== 200) problems.push({ width, route, type: 'http', status: response.status() });
      if (state.scroll > state.client + 1) problems.push({ width, route, type: 'overflow', ...state });
      if (state.h1 !== 1) problems.push({ width, route, type: 'heading', h1: state.h1 });
      if (state.shopLinks.some(href => href !== SHOP_URL)) problems.push({ width, route, type: 'shop-url', links: state.shopLinks });
      if (state.logo.right > state.shop.left - 2 || (width <= 1100 && state.shop.right > state.menu.left - 2)) problems.push({ width, route, type: 'header-collision', ...state });
      if (state.logo.bottom > state.header.bottom + 1 || state.shop.bottom > state.header.bottom + 1) problems.push({ width, route, type: 'header-height', ...state });
      const capture = (width === 390 && ['/', '/collections/all', '/collections/dressing', '/products/o-some-taste-pesto-basilikum', '/pages/uber-uns', '/pages/geschaftskunden', '/pages/private-label', '/pages/contact', '/pages/rezepte', '/policies/legal-notice'].includes(route)) ||
        (width === 1440 && ['/', '/collections/all', '/products/o-some-taste-pesto-basilikum'].includes(route)) ||
        (width === 320 && route === '/') || (width === 2560 && route === '/');
      if (screenshots && capture) {
        await page.locator('img').evaluateAll(images => Promise.all(images.map(image => {
          image.loading = 'eager';
          return image.decode().catch(() => {});
        })));
        await page.screenshot({ path: join(evidence, `qa-${route === '/' ? 'home' : route.split('/').pop()}-${width}.png`), fullPage: true });
      }
      if ((width === 390 && ['/', '/collections/all', '/pages/contact', '/policies/privacy-policy'].includes(route)) || (width === 1440 && route === '/')) {
        await page.addScriptTag({ content: axe.source });
        const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })));
        result.axe.push({ width, route, violations });
        for (const violation of violations) problems.push({ width, route, type: 'axe', ...violation });
      }
    }
    await page.close();
  }

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  console.log('interactions');
  await mobile.goto(base);
  await mobile.keyboard.press('Tab');
  if (!await mobile.locator('.skip-link').evaluate(el => el === document.activeElement)) problems.push({ type: 'skip-link-focus' });
  await mobile.keyboard.press('Enter');
  if (!await mobile.locator('#inhalt').evaluate(el => el === document.activeElement)) problems.push({ type: 'skip-link-target' });
  const menu = mobile.locator('[data-mobile-menu]');
  await menu.locator('summary').click();
  if (!await menu.evaluate(el => el.open)) problems.push({ type: 'menu-open' });
  await menu.locator('summary').press('Escape');
  if (await menu.evaluate(el => el.open)) problems.push({ type: 'menu-escape' });
  if (!await menu.locator('summary').evaluate(el => el === document.activeElement)) problems.push({ type: 'menu-focus' });
  await menu.locator('summary').click();
  await mobile.setViewportSize({ width: 1440, height: 900 });
  await mobile.waitForFunction(() => !document.querySelector('[data-mobile-menu]').open, null, { timeout: 1000 }).catch(() => null);
  if (await menu.evaluate(el => el.open)) problems.push({ type: 'menu-breakpoint' });
  await mobile.close();

  const noJs = await browser.newPage({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  console.log('no-js');
  await noJs.route(SHOP_URL, route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Shop navigation observed</title>' }));
  await noJs.goto(base);
  await noJs.locator('[data-mobile-menu] summary').click();
  if (!await noJs.locator('[data-mobile-menu]').evaluate(el => el.open)) problems.push({ type: 'no-js-menu' });
  await noJs.locator('.header-shop').click();
  if (noJs.url() !== SHOP_URL) problems.push({ type: 'no-js-shop-navigation', url: noJs.url() });
  await noJs.close();

  const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  console.log('reduced-motion');
  await reduced.goto(base);
  const motion = await reduced.evaluate(() => ({ ready: document.body.classList.contains('motion-ready'), hidden: [...document.querySelectorAll('.reveal')].some(el => getComputedStyle(el).opacity === '0') }));
  if (motion.ready || motion.hidden) problems.push({ type: 'reduced-motion', ...motion });
  await reduced.close();

  const zoom = await browser.newPage({ viewport: { width: 390, height: 844 } });
  console.log('text zoom');
  await zoom.goto(base);
  await zoom.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  const zoomWidth = await zoom.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  if (zoomWidth.scroll > zoomWidth.client + 1) problems.push({ type: 'text-200-overflow', ...zoomWidth });
  if (screenshots) await zoom.screenshot({ path: join(evidence, 'qa-home-390-text200.png'), fullPage: true });
  await zoom.close();

  const missing = await browser.newPage();
  console.log('404');
  const missingResponse = await missing.goto(base + '/unbekannte-seite', { waitUntil: 'domcontentloaded', timeout: 10000 });
  console.log('404 loaded');
  if (missingResponse.status() !== 404 || await missing.locator('h1').count() !== 1) problems.push({ type: '404-route', status: missingResponse.status() });
  const recipeResponse = await missing.goto(base + RECIPE_SLUG + '/', { waitUntil: 'domcontentloaded', timeout: 10000 });
  if (recipeResponse.status() !== 200) problems.push({ type: 'encoded-recipe-route', status: recipeResponse.status() });
  await missing.close();
  console.log('404 closed');
} finally {
  console.log('closing browser');
  await browser.close();
  await writeFile(join(evidence, 'browser-qa.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ checked: result.checked, axeRuns: result.axe.length, problems: problems.length, types: [...new Set(problems.map(p => p.type))] }));
  if (problems.length) console.log(JSON.stringify(problems.slice(0, 12), null, 2));
}
if (problems.length) process.exitCode = 1;
