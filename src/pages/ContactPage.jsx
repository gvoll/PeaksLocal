import React from 'react';
import Nav from '../components/Nav.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact PeaksLocal"
        description="Get in touch with PeaksLocal to discuss your local digital identity, a free audit, or a potential partnership. We work with businesses across Denver, the Front Range, and nationwide."
        canonical="/contact"
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
