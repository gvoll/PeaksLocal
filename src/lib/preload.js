// Lets the build-time prerender script hand a page its data synchronously,
// so the static HTML snapshot contains real content instead of a loading
// state. Normal client-side navigation ignores this (nothing sets it at
// runtime) and falls back to the existing fetch-on-mount behavior.
let store = {};

// The prerender script also serializes this same data into the HTML as
// window.__PEAKS_PRELOAD__. Without it the browser's first render of a blog
// route would be the "Loading post..." state while the server-rendered HTML
// holds the real post — a hydration mismatch, which makes React discard the
// prerendered markup and client-render the whole page instead. Seeding the
// store from the serialized copy keeps the two renders identical.
if (typeof window !== 'undefined' && window.__PEAKS_PRELOAD__) {
  store = window.__PEAKS_PRELOAD__;
}

export function setPreload(key, value) {
  store[key] = value;
}

export function getPreload(key) {
  return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : undefined;
}

export function clearPreload() {
  store = {};
}
