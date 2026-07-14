import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';
import { serveCities } from '../data/serveCities.js';

export default function ServePage() {
  return (
    <>
      <SEO
        title="Areas We Serve — Local Digital Identity Management in Colorado"
        description="PeaksLocal manages verified local presence for businesses across Denver, Boulder, and Colorado Springs. See how we approach each market."
        canonical="/serve"
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: 'var(--navy)', padding: '80px 0 72px' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="section-eyebrow light" style={{ marginBottom: '20px' }}>
              Areas We Serve
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '3.2rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}>
              Local Digital Identity, <span style={{ color: 'var(--green-hi)' }}>Built for Your Market</span>
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              maxWidth: '620px',
            }}>
              PeaksLocal is a Denver-based local digital identity firm serving businesses across Colorado's Front Range. We manage your verified presence across Google, Apple Maps, Bing, and AI search so customers find you when it matters, whether you run a physical location or a service area business.
            </p>
          </div>
        </section>

        {/* City cards */}
        <section style={{ background: 'var(--ash)', padding: '80px 0' }}>
          <div className="container">
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem',
              color: 'var(--mid)',
              lineHeight: 1.75,
              maxWidth: '680px',
              marginBottom: '48px',
            }}>
              We focus on three primary markets where local search competition is highest and the stakes for getting your digital identity right are clearest.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              {serveCities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/serve/${city.slug}`}
                  style={{
                    display: 'block',
                    background: 'var(--white)',
                    border: '1px solid var(--rule)',
                    borderRadius: '12px',
                    padding: '28px 24px',
                    boxShadow: 'var(--shadow-card)',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    textTransform: 'uppercase',
                    color: 'var(--navy)',
                    letterSpacing: '0.02em',
                    marginBottom: '10px',
                  }}>
                    {city.name}
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.9rem',
                    color: 'var(--mid)',
                    lineHeight: 1.6,
                    marginBottom: '16px',
                  }}>
                    {city.tagline}
                  </p>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--green)',
                  }}>
                    View market details →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--navy)', padding: '72px 0' }}>
          <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              marginBottom: '28px',
            }}>
              Not sure where your business fits? Get a free, no-commitment look at your current visibility.
            </p>
            <Link to="/audit" className="btn-primary" style={{ textDecoration: 'none' }}>
              Get My Free Visibility Score
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
