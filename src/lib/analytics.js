import ReactGA from 'react-ga4';

let isAnalyticsInitialized = false;
// initAnalytics runs on an idle callback now (see main.jsx), so App.jsx's
// mount-time trackPageView call for the very first page almost always fires
// before initialization finishes. Without this, that first pageview would be
// silently dropped instead of just delayed. Only the latest path is kept —
// if the route changes again before init completes, the page the visitor is
// actually on is what's worth recording, not an intermediate one.
let pendingPageViewPath = null;

export function initAnalytics(measurementId) {
  if (!measurementId || isAnalyticsInitialized) {
    return;
  }

  ReactGA.initialize(measurementId);
  isAnalyticsInitialized = true;

  if (pendingPageViewPath) {
    ReactGA.send({ hitType: 'pageview', page: pendingPageViewPath });
    pendingPageViewPath = null;
  }
}


export function trackPageView(path) {
  if (!path) {
    return;
  }

  if (!isAnalyticsInitialized) {
    pendingPageViewPath = path;
    return;
  }

  ReactGA.send({
    hitType: 'pageview',
    page: path,
  });
}

export function trackEvent(eventName, params = {}) {
  if (!isAnalyticsInitialized || !eventName) {
    return;
  }

  ReactGA.event(eventName, params);
}

let isClarityInitialized = false;

export function initClarity(projectId) {
  if (!projectId || isClarityInitialized) {
    return;
  }

  isClarityInitialized = true;

  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', projectId);
}
