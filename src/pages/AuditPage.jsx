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
        description="Get a free Local Visibility Score for your business — see exactly how you show up across Google, Apple Maps, Bing, and AI search, and what to fix first."
        canonical="/audit"
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <AuditForm />
      </main>
      <Footer />
    </>
  );
}
