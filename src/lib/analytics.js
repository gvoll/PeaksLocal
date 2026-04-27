import ReactGA from 'react-ga4';

let isAnalyticsInitialized = false;

export function initAnalytics(measurementId) {
  if (!measurementId || isAnalyticsInitialized) {
    return;
  }

  ReactGA.initialize(measurementId);
  isAnalyticsInitialized = true;
}


export function trackPageView(path) {
  if (!isAnalyticsInitialized || !path) {
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
