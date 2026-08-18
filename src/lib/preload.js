// Lets the build-time prerender script hand a page its data synchronously,
// so the static HTML snapshot contains real content instead of a loading
// state. Normal client-side navigation ignores this (nothing sets it at
// runtime) and falls back to the existing fetch-on-mount behavior.
let store = {};

export function setPreload(key, value) {
  store[key] = value;
}

export function getPreload(key) {
  return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : undefined;
}

export function clearPreload() {
  store = {};
}
