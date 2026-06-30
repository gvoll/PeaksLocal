import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.peakslocal.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const DEFAULT_DESCRIPTION = 'PeaksLocal manages your verified local presence across Google, Apple Maps, Bing, and AI search — so customers find you, not your competitor.';

export default function SEO({ title, description, canonical, image }) {
  const fullTitle = title ? `${title} | PeaksLocal` : 'PeaksLocal — Be Seen on Search, Maps + AI';
  const desc = description || DEFAULT_DESCRIPTION;
  const img = image || DEFAULT_IMAGE;
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

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
  );
}
