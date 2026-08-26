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
        description="See how PeaksLocal builds and strengthens your local visibility across Google Business Profile, Apple Maps, Bing Places, Yelp, social, and directories."
        canonical="/services"
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <System headingLevel="h1" />
      </main>
      <Footer />
    </>
  );
}
