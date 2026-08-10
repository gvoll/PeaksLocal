import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have moved."
        noindex
      />
      <Nav />
      <main style={{ background: 'var(--navy)', minHeight: '70vh', paddingTop: '68px', display: 'flex', alignItems: 'center' }}>
        <div className="container-narrow" style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.65rem',
            color: 'var(--green-hi)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            404
          </div>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: '3rem',
            textTransform: 'uppercase',
            color: 'var(--white)',
            lineHeight: 1.05,
            marginBottom: '16px',
            letterSpacing: '-0.01em',
          }}>
            Page Not Found
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            color: 'var(--slate)',
            lineHeight: 1.75,
            maxWidth: '480px',
            margin: '0 auto 32px',
          }}>
            The page you're looking for doesn't exist or may have moved.
          </p>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
