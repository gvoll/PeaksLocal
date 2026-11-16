import React from 'react';
import Nav from '../components/Nav.jsx';
import AuditForm from '../components/AuditForm.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';

export default function AuditPage() {
  return (
    <>
      <SEO
        title="Free Local Visibility Audit"
        description="Get a free Visibility Score for your business. See how you show up across Google, Apple Maps, Bing, and AI search, with a free walkthrough of your results."
        canonical="/audit"
        breadcrumbs={[{ name: 'Free Audit', path: '/audit' }]}
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <AuditForm headingLevel="h1" />
      </main>
      <Footer />
    </>
  );
}
