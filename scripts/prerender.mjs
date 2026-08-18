#!/usr/bin/env node
// Runs after `vite build`. Fixes the root cause of the site's near-zero
// organic traffic: this is a pure client-side SPA, so every route served
// the same empty <div id="root"> and the same homepage <title>/meta tags
// until JavaScript ran. Crawlers that don't execute JS (and Googlebot's
// slower secondary render pass) saw nothing useful.
//
// This script renders every real route (static pages, /serve/:city pages,
// and every published Contentful blog post) to static HTML with the
// correct per-page title/meta/OG tags and full body content already
// present, and writes each to dist/<route>/index.html. Vercel serves an
// exact-match static file ahead of the SPA catch-all rewrite in
// vercel.json, so these prerendered files are what crawlers (and users)
// get on first load; the client JS bundle still boots normally on top for
// interactivity.
//
// It also generates dist/sitemap.xml from this same route list, sourced
// live from Contentful, so the sitemap can no longer silently drift out
// of sync with what's actually published (it previously did: two live
// posts were missing from the hand-maintained public/sitemap.xml).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { serveCities } from '../src/data/serveCities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE_URL = 'https://www.peakslocal.com';

const STATIC_ROUTES = [
  { routePath: '/', priority: '1.0', changefreq: 'weekly' },
  { routePath: '/about', priority: '0.7', changefreq: 'monthly' },
  { routePath: '/services', priority: '0.8', changefreq: 'monthly' },
  { routePath: '/how-it-works', priority: '0.7', changefreq: 'monthly' },
  { routePath: '/audit', priority: '0.9', changefreq: 'monthly' },
  { routePath: '/faq', priority: '0.7', changefreq: 'monthly' },
  { routePath: '/reviews', priority: '0.6', changefreq: 'monthly' },
  { routePath: '/review-funnels', priority: '0.8', changefreq: 'monthly' },
  { routePath: '/partners', priority: '0.8', changefreq: 'monthly' },
  { routePath: '/serve', priority: '0.8', changefreq: 'monthly' },
  { routePath: '/contact', priority: '0.7', changefreq: 'monthly' },
  { routePath: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

async function main() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('[prerender] dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }
  const baseTemplate = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

  // Middleware-mode Vite server: gives us the app's own modules (JSX
  // transformed, import.meta.env populated from .env.local exactly like a
  // real build) without bundling, so prerendering can never drift from
  // what the app actually does.
  const vite = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'warn',
    // Force these through Vite's transform pipeline instead of Node's native
    // ESM/CJS interop, which fails to detect react-helmet-async's named
    // exports (Helmet, HelmetProvider) when the package is left external.
    ssr: { noExternal: ['react-helmet-async'] },
  });

  let posts = [];
  let renderRoute, setPreload, clearPreload;
  try {
    const contentfulMod = await vite.ssrLoadModule('/src/lib/contentful.js');
    const preloadMod = await vite.ssrLoadModule('/src/lib/preload.js');
    const ssrEntryMod = await vite.ssrLoadModule('/src/ssrEntry.jsx');
    renderRoute = ssrEntryMod.renderRoute;
    setPreload = preloadMod.setPreload;
    clearPreload = preloadMod.clearPreload;

    posts = await contentfulMod.getAllPosts();
  } catch (err) {
    await vite.close();
    console.error('[prerender] Failed to load app modules or fetch Contentful posts:');
    console.error(err);
    process.exit(1);
  }

  const missingSlugPosts = posts.filter((p) => !p.slug);
  if (missingSlugPosts.length) {
    console.warn(`[prerender] ${missingSlugPosts.length} published post(s) have no slug and will be skipped:`,
      missingSlugPosts.map((p) => p.title));
  }
  const validPosts = posts.filter((p) => p.slug);

  const routes = [
    ...STATIC_ROUTES,
    { routePath: '/blog', priority: '0.9', changefreq: 'daily', preload: { key: 'posts:all', value: validPosts } },
    ...serveCities.map((c) => ({ routePath: `/serve/${c.slug}`, priority: '0.8', changefreq: 'monthly' })),
    ...validPosts.map((p) => ({
      routePath: `/blog/${p.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: p.publishedDate || undefined,
      preload: { key: `post:${p.slug}`, value: p },
    })),
  ];

  let rendered = 0;
  for (const route of routes) {
    clearPreload();
    if (route.preload) setPreload(route.preload.key, route.preload.value);

    let bodyHtml, helmet;
    try {
      ({ bodyHtml, helmet } = renderRoute(route.routePath));
    } catch (err) {
      await vite.close();
      console.error(`[prerender] Failed rendering ${route.routePath}:`);
      console.error(err);
      process.exit(1);
    }

    const html = buildPageHtml(baseTemplate, helmet, bodyHtml);
    writeRoute(route.routePath, html);
    rendered += 1;
  }

  await vite.close();

  const sitemapXml = buildSitemap(routes);
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml);

  console.log(`[prerender] Wrote ${rendered} prerendered route(s) and dist/sitemap.xml (${routes.length} URLs, ${validPosts.length} from Contentful).`);
}

function buildPageHtml(baseTemplate, helmet, bodyHtml) {
  const startMarker = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
  const endMarker = '<link rel="preconnect" href="https://fonts.googleapis.com" />';
  const startIdx = baseTemplate.indexOf(startMarker);
  const endIdx = baseTemplate.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || !baseTemplate.includes('<div id="root"></div>')) {
    throw new Error(
      'dist/index.html no longer matches the markers this script expects (viewport meta / preconnect link / empty #root div). ' +
      'Update the markers in scripts/prerender.mjs to match the current index.html structure.'
    );
  }

  const before = baseTemplate.slice(0, startIdx + startMarker.length);
  const after = baseTemplate.slice(endIdx);
  const helmetHead = [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString()].join('\n    ');

  const withHead = `${before}\n    ${helmetHead}\n    ${after}`;
  return withHead.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}

function writeRoute(routePath, html) {
  const outDir = routePath === '/' ? DIST : path.join(DIST, routePath.replace(/^\//, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
}

function buildSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((r) => {
      const loc = r.routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${r.routePath}`;
      const lastmod = r.lastmod || today;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${r.priority}</priority>\n    <changefreq>${r.changefreq}</changefreq>\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

main();
