import React from 'react';
import Nav from '../components/Nav.jsx';
import Pipeline from '../components/Pipeline.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';

export default function HowItWorksPage() {
  return (
    <>
      <SEO
        title="How Local Search Actually Works"
        description="See how Google, Apple Maps, Bing, and AI assistants decide which local businesses to recommend, and where PeaksLocal fits into building that visibility."
        canonical="/how-it-works"
        breadcrumbs={[{ name: 'How It Works', path: '/how-it-works' }]}
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <Pipeline headingLevel="h1" />
      </main>
      <Footer />
    </>
  );
}
