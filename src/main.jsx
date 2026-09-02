import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';
import { initAnalytics } from './lib/analytics.js';

// Deferred off the critical path: gtag.js is ~165KB and was loading eagerly,
// competing with hydration and first paint for bandwidth and main-thread time
// on every visit. requestIdleCallback runs it once the browser is actually
// idle, with a timeout so it still fires within 2s even under sustained load;
// Safari lacks the API, so it falls back to a macrotask delay there.
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => initAnalytics(measurementId), { timeout: 2000 });
} else {
  setTimeout(() => initAnalytics(measurementId), 0);
}

const rootElement = document.getElementById('root');

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// In production every route is prerendered to static HTML, so #root already
// holds the real markup. createRoot() would throw that away and re-render the
// whole tree from scratch, which re-creates the LCP element and pushes LCP out
// to whenever the JS bundle finishes executing. hydrateRoot() adopts the
// existing DOM instead. `npm run dev` serves the unprerendered index.html with
// an empty #root, so there's nothing to hydrate there.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}

