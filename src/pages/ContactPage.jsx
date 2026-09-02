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
        description="Contact PeaksLocal to boost your digital identity and online visibility across Google, Apple Maps, Bing, Yelp, social, directories, and reviews."
        canonical="/contact"
        breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
