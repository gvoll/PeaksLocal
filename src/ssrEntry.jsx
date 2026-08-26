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
// react-router-dom v7 removed the `/server.js` subpath — StaticRouter now
// lives in the base react-router package instead.
import { StaticRouter } from 'react-router';
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
