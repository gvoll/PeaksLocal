import React from 'react';
import Nav from '../components/Nav.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Footer from '../components/Footer.jsx';

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
