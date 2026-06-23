import React from 'react';
import Nav from '../components/Nav.jsx';
import Pipeline from '../components/Pipeline.jsx';
import Footer from '../components/Footer.jsx';

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <Pipeline />
      </main>
      <Footer />
    </>
  );
}
