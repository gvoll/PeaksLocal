import React from 'react';
import Nav from '../components/Nav.jsx';
import AuditForm from '../components/AuditForm.jsx';
import Footer from '../components/Footer.jsx';

export default function AuditPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <AuditForm />
      </main>
      <Footer />
    </>
  );
}

