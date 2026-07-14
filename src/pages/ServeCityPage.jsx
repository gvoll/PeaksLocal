import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';
import { serveCities, getServeCity } from '../data/serveCities.js';

function RichText({ parts, slug, style }) {
  return (
    <p style={style}>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part.text}
          {part.citation && (
            <sup>
              <a
                href={`#source-${slug}-${part.citation}`}
                style={{ color: 'var(--green)', textDecoration: 'none', fontWeight: 600, marginLeft: '1px' }}
              >
                {part.citation}
              </a>
            </sup>
          )}
        </React.Fragment>
      ))}
    </p>
  );
}

const bodyTextStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.95rem',
  color: 'var(--mid)',
  lineHeight: 1.75,
  marginBottom: '20px',
};

const h3Style = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 800,
  fontSize: '1.6rem',
  textTransform: 'uppercase',
  color: 'var(--navy)',
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  marginBottom: '20px',
};

export default function ServeCityPage() {
  const { city: slug } = useParams();
  const city = getServeCity(slug);

  if (!city) {
    return <Navigate to="/serve" replace />;
  }

  const otherCities = serveCities.filter((c) => c.slug !== city.slug);

  return (
    <>
      <SEO
        title={city.seoTitle}
        description={city.seoDescription}
        canonical={`/serve/${city.slug}`}
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: 'var(--navy)', padding: '80px 0 72px' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="section-eyebrow light" style={{ marginBottom: '20px' }}>
              <Link to="/serve" style={{ color: 'inherit', textDecoration: 'none' }}>Areas We Serve</Link> / {city.name}
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '3rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}>
              Local Digital Identity for <span style={{ color: 'var(--green-hi)' }}>{city.name}</span> Businesses
            </h1>
            <RichText
              parts={city.intro}
              slug={city.slug}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--slate)', lineHeight: 1.75, maxWidth: '640px' }}
            />
          </div>
        </section>

        {/* Local Market Snapshot */}
        {city.snapshot && (
          <section style={{ background: 'var(--ash)', padding: '64px 0' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
              <div style={{
                background: 'var(--white)',
                border: '1px solid var(--rule)',
                borderRadius: '12px',
                padding: '32px 28px',
                boxShadow: 'var(--shadow-card)',
              }}>
                <h2 style={h3Style}>Local Market Snapshot</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {city.snapshot.map((parts, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '10px 0',
                      borderBottom: i < city.snapshot.length - 1 ? '1px solid var(--rule)' : 'none',
                    }}>
                      <span style={{ color: 'var(--green-hi)', fontSize: '0.9rem', marginTop: '2px', flexShrink: 0 }}>✓</span>
                      <RichText parts={parts} slug={city.slug} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.6, margin: 0 }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Landscape narrative */}
        <section style={{ background: city.snapshot ? 'var(--white)' : 'var(--ash)', padding: '72px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={h3Style}>{city.landscapeHeading}</h2>
            {city.landscape.map((parts, i) => (
              <RichText key={i} parts={parts} slug={city.slug} style={bodyTextStyle} />
            ))}
          </div>
        </section>

        {/* Service Area Business callout (Denver only) */}
        {city.sab && (
          <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
              <h2 style={{ ...h3Style, color: 'var(--white)' }}>{city.sabHeading}</h2>
              {city.sab.map((parts, i) => (
                <RichText
                  key={i}
                  parts={parts}
                  slug={city.slug}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: 'var(--slate)', lineHeight: 1.75, marginBottom: 0 }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Areas We Serve */}
        <section style={{ background: city.sab ? 'var(--ash)' : 'var(--white)', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={h3Style}>Areas We Serve</h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
              {city.areas.map((area) => (
                <span key={area} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem',
                  color: 'var(--navy)',
                  background: 'var(--white)',
                  border: '1px solid var(--rule)',
                  borderRadius: '20px',
                  padding: '7px 16px',
                }}>
                  {area}
                </span>
              ))}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--mid)' }}>
              Also serving{' '}
              {otherCities.map((c, i) => (
                <React.Fragment key={c.slug}>
                  <Link to={`/serve/${c.slug}`} style={{ color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>
                    {c.name}
                  </Link>
                  {i < otherCities.length - 1 ? ' and ' : ''}
                </React.Fragment>
              ))}
              . See all <Link to="/serve" style={{ color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>areas we serve</Link>.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <Link to="/audit" className="btn-primary" style={{ textDecoration: 'none' }}>
              Get My Free Visibility Score
            </Link>
          </div>
        </section>

        {/* Sources */}
        <section style={{ background: 'var(--white)', padding: '40px 0 64px' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--slate)',
              marginBottom: '12px',
            }}>
              Sources
            </div>
            <ol style={{ padding: 0, margin: 0, listStylePosition: 'inside' }}>
              {city.sources.map((source, i) => (
                <li
                  key={i}
                  id={`source-${city.slug}-${i + 1}`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.75rem',
                    color: 'var(--slate)',
                    lineHeight: 1.6,
                    marginBottom: '6px',
                    scrollMarginTop: '88px',
                  }}
                >
                  {source}
                </li>
              ))}
            </ol>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
