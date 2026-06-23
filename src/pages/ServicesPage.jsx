import React from 'react';
import Nav from '../components/Nav.jsx';
import System from '../components/System.jsx';
import Footer from '../components/Footer.jsx';

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <System />
      </main>
      <Footer />
    </>
  );
}
