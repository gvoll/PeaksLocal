// Renders JSON-LD as dangerouslySetInnerHTML instead of a JSX text child.
// A text child gets HTML-entity-escaped by React's server renderer (" becomes
// &quot;), which browsers never decode inside <script> tags, so the prerendered
// HTML crawlers actually see is invalid JSON. dangerouslySetInnerHTML writes
// the raw string instead. The `<` escape below prevents a `</script>` inside
// any embedded string (e.g. a CMS title) from prematurely closing the tag.
export function jsonLdProps(data) {
  return { dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, '\\u003c') } };
}
