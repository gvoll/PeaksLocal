import React from 'react';
import Nav from '../components/Nav.jsx';
import System from '../components/System.jsx';
import Services, { oneTimeItems, ongoingItems } from '../components/Services.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';
import { jsonLdProps } from '../lib/jsonLd.js';

const provider = {
  "@type": "ProfessionalService",
  "@id": "https://www.peakslocal.com",
  "name": "PeaksLocal",
  "url": "https://www.peakslocal.com",
};

// Mirrors the Identity Build / Identity Management cards rendered by
// Services.jsx on this page (items are imported, so the two cannot drift).
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.peakslocal.com/services#identity-build",
      "name": "Identity Build",
      "serviceType": "Local business digital identity build",
      "description": "We establish your complete verified presence across every platform that powers modern search. You receive a completion report with a before-and-after Visibility Rating.",
      "provider": provider,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Identity Build: Includes",
        "itemListElement": oneTimeItems.map((name) => ({ "@type": "Offer", "itemOffered": { "@type": "Service", "name": name } })),
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.peakslocal.com/services#identity-management",
      "name": "Identity Management",
      "serviceType": "Local business presence and reputation management",
      "description": "Presence and reputation management that keeps your digital identity active. We monitor, strengthen, and protect your presence so you stay visible as platforms and AI systems evolve.",
      "provider": provider,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Identity Management: Includes",
        "itemListElement": ongoingItems.map((name) => ({ "@type": "Offer", "itemOffered": { "@type": "Service", "name": name } })),
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Local Digital Identity Services"
        description="See how PeaksLocal builds and strengthens your local visibility across Google Business Profile, Apple Maps, Bing Places, Yelp, social, and directories."
        canonical="/services"
        breadcrumbs={[{ name: 'Services', path: '/services' }]}
      />
      <script type="application/ld+json" {...jsonLdProps(servicesJsonLd)} />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <section style={{ background: 'var(--white)', padding: '72px 0 0' }}>
          <div className="container">
            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '2.8rem',
                textTransform: 'uppercase',
                color: 'var(--navy)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                maxWidth: '800px',
                marginBottom: '18px',
              }}
            >
              Local Digital Identity Services
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', color: 'var(--mid)', lineHeight: 1.75, maxWidth: '720px' }}>
              Local digital identity management in two phases. First we build your verified presence across Google, Apple Maps, Bing, and the major directories. Then we manage it, so it stays accurate and visible as platforms change.
            </p>
          </div>
        </section>
        <Services />
        <System />
      </main>
      <Footer />
    </>
  );
}
