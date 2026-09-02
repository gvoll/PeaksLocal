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

// A Contentful→Vercel deploy hook means every content edit triggers a full
// site build, and this build fetches posts from Contentful live. Without a
// retry, a single transient blip (rate limit, network hiccup) here fails
// the ENTIRE build — not just the blog — blocking every pending deploy,
// including unrelated code fixes, until the next successful run.
async function fetchPostsWithRetry(contentfulMod, attempts = 3, delayMs = 2000) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await contentfulMod.getAllPosts();
    } catch (err) {
      if (attempt === attempts) throw err;
      console.warn(`[prerender] Contentful fetch failed (attempt ${attempt}/${attempts}), retrying in ${delayMs}ms:`, err.message);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      delayMs *= 2;
    }
  }
}

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
  const baseTemplate = inlineStylesheet(fs.readFileSync(path.join(DIST, 'index.html'), 'utf8'));

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
    // react-router-dom/react-router hit the exact same issue starting with
    // v7's restructured package exports.
    ssr: {
      noExternal: ['react-helmet-async', 'react-router-dom', 'react-router'],
      // react-router(-dom) v7's package exports offer a "module-sync"
      // condition Vite doesn't request by default, so without this it falls
      // through to the CJS "default" build, which breaks when forced
      // through the ESM-only SSR transform pipeline above.
      resolve: { conditions: ['module-sync'] },
    },
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

    posts = await fetchPostsWithRetry(contentfulMod);
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

    const html = buildPageHtml(baseTemplate, helmet, bodyHtml, route.preload);
    writeRoute(route.routePath, html);
    rendered += 1;
  }

  // Prerender the catch-all NotFoundPage to dist/404.html. Any path that
  // doesn't match one of the routes above (and isn't handled by the
  // /blog/:slug or /blog-preview/:id rewrites in vercel.json for
  // not-yet-prerendered Contentful posts) falls through to Vercel's
  // built-in 404.html handling, which serves this file with a genuine
  // HTTP 404 status. Without this, an unmatched path previously fell
  // through vercel.json's old catch-all rewrite straight to dist/index.html
  // (the homepage) with a 200 status — a textbook soft-404 that's invisible
  // to a quick manual check but gets flagged by Search Console.
  clearPreload();
  let notFoundHtml;
  try {
    const { bodyHtml, helmet } = renderRoute('/__prerender_404_marker__');
    notFoundHtml = buildPageHtml(baseTemplate, helmet, bodyHtml);
  } catch (err) {
    await vite.close();
    console.error('[prerender] Failed rendering the 404 page:');
    console.error(err);
    process.exit(1);
  }
  fs.writeFileSync(path.join(DIST, '404.html'), notFoundHtml);

  await vite.close();

  const sitemapXml = buildSitemap(routes);
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml);

  console.log(`[prerender] Wrote ${rendered} prerendered route(s), dist/404.html, and dist/sitemap.xml (${routes.length} URLs, ${validPosts.length} from Contentful).`);
}

// Vite links the built CSS as a plain stylesheet, which blocks the first paint
// on a second round trip. The bundle is small enough (~13KB, and it compresses
// with the HTML) that inlining it is a clear win on a high-latency mobile
// connection: the page can paint straight from the HTML response. Falls back to
// leaving the link alone if anything about the markup isn't what we expect.
function inlineStylesheet(template) {
  const linkPattern = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/;
  const match = template.match(linkPattern);
  if (!match) {
    console.warn('[prerender] No built stylesheet link found — leaving CSS as-is.');
    return template;
  }

  const cssFile = path.join(DIST, match[1]);
  if (!fs.existsSync(cssFile)) {
    console.warn(`[prerender] ${match[1]} not found on disk — leaving CSS as-is.`);
    return template;
  }

  const css = fs.readFileSync(cssFile, 'utf8');
  // A literal "</style" in the CSS would close the tag early. Nothing in this
  // codebase does that, but bail rather than emit a broken page if it ever does.
  if (/<\/style/i.test(css)) {
    console.warn('[prerender] CSS contains "</style" — leaving it as an external link.');
    return template;
  }

  console.log(`[prerender] Inlined ${match[1]} (${(css.length / 1024).toFixed(1)} kB) to drop a render-blocking request.`);
  return template.replace(linkPattern, `<style>${css}</style>`);
}

// Serialized into the page so the browser's first render starts from the same
// data the server rendered with. "<" is escaped so a "</script>" inside any
// CMS string can't close the tag early.
function buildPreloadScript(preload) {
  if (!preload) return '';
  const json = JSON.stringify({ [preload.key]: preload.value }).replace(/</g, '\\u003c');
  return `<script>window.__PEAKS_PRELOAD__=${json}</script>`;
}

function buildPageHtml(baseTemplate, helmet, bodyHtml, preload) {
  const startMarker = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
  // A purpose-built comment, not tied to any specific asset (fonts, meta
  // tags, etc.) that might change later — see the matching comment in
  // index.html. The previous marker was the Google Fonts preconnect link,
  // which broke this exact way the day fonts were self-hosted and it was
  // removed.
  const endMarker = "<!-- scripts/prerender.mjs splices in each route's own title/meta/link";
  const startIdx = baseTemplate.indexOf(startMarker);
  const endIdx = baseTemplate.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || !baseTemplate.includes('<div id="root"></div>')) {
    throw new Error(
      'dist/index.html no longer matches the markers this script expects (viewport meta / prerender-marker comment / empty #root div). ' +
      'Update the markers in scripts/prerender.mjs to match the current index.html structure.'
    );
  }

  const before = baseTemplate.slice(0, startIdx + startMarker.length);
  const after = baseTemplate.slice(endIdx);
  const helmetHead = [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString()].join('\n    ');

  const withHead = `${before}\n    ${helmetHead}\n    ${after}`;
  return withHead.replace(
    '<div id="root"></div>',
    `${buildPreloadScript(preload)}<div id="root">${bodyHtml}</div>`
  );
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
