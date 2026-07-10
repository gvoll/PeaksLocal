import React from 'react';
import Nav from '../components/Nav.jsx';
import System from '../components/System.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Local Digital Identity Services — PeaksLocal"
        description="PeaksLocal manages your verified presence across Google, Apple Maps, Bing, and AI search. See how our local identity system works for service area and physical location businesses."
        canonical="/services"
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <System />
      </main>
      <Footer />
    </>
  );
}
