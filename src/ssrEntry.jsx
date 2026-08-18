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
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

export function renderRoute(routePath) {
  const helmetContext = {};
  const bodyHtml = renderToStaticMarkup(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={routePath}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  return { bodyHtml, helmet: helmetContext.helmet };
}
