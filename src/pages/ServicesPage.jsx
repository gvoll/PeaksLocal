import React from 'react';
import Nav from '../components/Nav.jsx';
import System from '../components/System.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';
import { jsonLdProps } from '../lib/jsonLd.js';

const provider = {
  "@type": "ProfessionalService",
  "@id": "https://www.peakslocal.com",
  "name": "PeaksLocal",
  "url": "https://www.peakslocal.com",
};

// Mirrors System.jsx's tier1Items/tier2Items and card copy exactly — this is
// the content actually rendered on this page (not Services.jsx's homepage
// section, which uses different tier names and items).
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.peakslocal.com/services#identity-build",
      "name": "Identity Build",
      "serviceType": "Local business digital identity build",
      "description": "We establish your complete verified presence across the major platforms that power modern search. We'll ensure your accurate and consistent business details across all of the relevant data layers to boost your visibility.",
      "provider": provider,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Identity Build — Your Plan May Include",
        "itemListElement": [
          'Google, Apple & Bing profile setup and full optimization',
          'JSON-LD schema deployment on your website',
          'BBB liaison and trust directory claims',
          'Social profile NAP synchronization',
          'Monitoring and reporting',
        ].map((name) => ({ "@type": "Offer", "itemOffered": { "@type": "Service", "name": name } })),
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.peakslocal.com/services#identity-management",
      "name": "Identity Management",
      "serviceType": "Local business presence and reputation management",
      "description": "We strengthen, protect, and monitor your online identity and digital presence. This ensures you maintain strong visibility, regardless of how platforms or AI systems evolve.",
      "provider": provider,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Identity Management — As Your Identity Management Partner",
        "itemListElement": [
          'Monthly profile updates — photos, posts, attributes',
          'Review monitoring and response management',
          'Review velocity strategy',
          'Citation drift detection and correction',
          'Monthly visibility report',
        ].map((name) => ({ "@type": "Offer", "itemOffered": { "@type": "Service", "name": name } })),
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Local Digital Identity Services — PeaksLocal"
        description="See how PeaksLocal builds and strengthens your local visibility across Google Business Profile, Apple Maps, Bing Places, Yelp, social, and directories."
        canonical="/services"
        breadcrumbs={[{ name: 'Services', path: '/services' }]}
      />
      <script type="application/ld+json" {...jsonLdProps(servicesJsonLd)} />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <System headingLevel="h1" />
      </main>
      <Footer />
    </>
  );
}
