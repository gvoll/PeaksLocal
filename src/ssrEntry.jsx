// Entry point loaded via Vite's SSR module graph (vite.ssrLoadModule) by
// scripts/prerender.mjs. Keeping the actual renderToStaticMarkup call in
// here, rather than in the plain-Node prerender script, matters: it makes
// React, react-router-dom, and react-helmet-async all resolve through the
// same Vite-transformed module instances that App.jsx itself uses. Calling
// this from raw Node with separately-imported copies of those packages
// creates two different React Context singletons (Vite's transformed copy
// vs. Node's native resolution) that can't see each other, which breaks
// react-helmet-async's SSR context lookup.
import React from 'react';
import { renderToString } from 'react-dom/server';
// react-router-dom v7 removed the `/server.js` subpath — StaticRouter now
// lives in the base react-router package instead.
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

export function renderRoute(routePath) {
  const helmetContext = {};
  // renderToString, not renderToStaticMarkup: this output is hydrated on the
  // client (main.jsx calls hydrateRoot on it). React's docs are explicit that
  // renderToStaticMarkup's output "cannot be hydrated" — it omits the marker
  // comments hydration needs, which caused every page to fail hydration and
  // silently fall back to a full client-side re-render.
  const bodyHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={routePath}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  return { bodyHtml, helmet: helmetContext.helmet };
}
