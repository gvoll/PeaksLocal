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
        description="PeaksLocal was founded by a Denver-based consultant with 20+ years of experience building operational systems. Learn about our program management approach to local digital identity."
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
