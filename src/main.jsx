import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';
import { initAnalytics } from './lib/analytics.js';

initAnalytics(import.meta.env.VITE_GA_MEASUREMENT_ID);

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

