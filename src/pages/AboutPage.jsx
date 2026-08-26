import React from 'react';
import Nav from '../components/Nav.jsx';
import About from '../components/About.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About PeaksLocal — Denver-Based Digital Identity Firm"
        description="PeaksLocal improves your digital identity and online visibility across Google, Apple Maps, Bing, Yelp, social, and directories, plus reviews."
        canonical="/about"
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <About />
      </main>
      <Footer />
    </>
  );
}
