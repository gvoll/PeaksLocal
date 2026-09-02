import React from 'react';
import { Helmet } from 'react-helmet-async';
import { jsonLdProps } from '../lib/jsonLd.js';

const BASE_URL = 'https://www.peakslocal.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const DEFAULT_DESCRIPTION = 'PeaksLocal manages your verified local presence across Google, Apple Maps, Bing, and AI search — so customers find you, not your competitor.';

// `breadcrumbs` is the trail after Home, e.g. [{ name: 'Serve', path: '/serve' },
// { name: 'Denver', path: '/serve/denver' }]. Rendered as a plain sibling
// <script>, not inside <Helmet>, because scripts/prerender.mjs only pulls
// helmet.title/meta/link into the prerendered <head> — a script tag placed
// inside Helmet would work for client-side navigation but silently vanish
// from the static HTML crawlers actually receive.
export default function SEO({ title, description, canonical, image, noindex, breadcrumbs }) {
  const fullTitle = title ? `${title} | PeaksLocal` : 'PeaksLocal — Be Seen on Search, Maps + AI';
  const desc = description || DEFAULT_DESCRIPTION;
  const img = image || DEFAULT_IMAGE;
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <>
      <Helmet defer={false}>
        <title>{fullTitle}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        {noindex && <meta name="robots" content="noindex, follow" />}

        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={img} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={img} />
      </Helmet>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json" {...jsonLdProps({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "PeaksLocal", "item": `${BASE_URL}/` },
            ...breadcrumbs.map((crumb, i) => ({
              "@type": "ListItem",
              "position": i + 2,
              "name": crumb.name,
              "item": `${BASE_URL}${crumb.path}`,
            })),
          ],
        })} />
      )}
    </>
  );
}
