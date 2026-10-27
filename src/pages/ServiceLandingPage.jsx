import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';
import { jsonLdProps } from '../lib/jsonLd.js';
import { getServicePage } from '../data/servicePages.js';

const BASE_URL = 'https://www.peakslocal.com';

const linkStyle = { color: 'var(--green)', textDecoration: 'none', fontWeight: 600 };

function Paragraph({ parts, style }) {
  return (
    <p style={style}>
      {parts.map((part, i) => (
        part.to
          ? <Link key={i} to={part.to} style={linkStyle}>{part.text}</Link>
          : <React.Fragment key={i}>{part.text}</React.Fragment>
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

const h2Style = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 800,
  fontSize: '1.6rem',
  textTransform: 'uppercase',
  color: 'var(--navy)',
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  marginBottom: '20px',
};

const labelStyle = {
  fontFamily: "'DM Mono', monospace",
  fontSize: '0.65rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--slate)',
  marginBottom: '14px',
};

export default function ServiceLandingPage({ slug }) {
  const page = getServicePage(slug);
  const path = `/${page.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${BASE_URL}${path}#service`,
        "name": page.name,
        "serviceType": page.serviceType,
        "description": page.seoDescription,
        "url": `${BASE_URL}${path}`,
        "areaServed": { "@type": "City", "name": "Denver", "containedInPlace": { "@type": "State", "name": "Colorado" } },
        "provider": {
          "@type": "ProfessionalService",
          "@id": BASE_URL,
          "name": "PeaksLocal",
          "url": BASE_URL,
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": page.faqs.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a },
        })),
      },
    ],
  };

  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        canonical={path}
        breadcrumbs={[{ name: 'Services', path: '/services' }, { name: page.name, path }]}
      />
      <script type="application/ld+json" {...jsonLdProps(jsonLd)} />
      <Nav />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: 'var(--navy)', padding: '80px 0 72px' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="section-eyebrow light" style={{ marginBottom: '20px' }}>
              <Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link> / Denver
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '3rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: '14px',
            }}>
              {page.h1.before}<span style={{ color: 'var(--green-hi)' }}>{page.h1.highlight}</span>
            </h1>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--green-hi)',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}>
              {page.subline}
            </p>
            {page.intro.map((parts, i) => (
              <Paragraph
                key={i}
                parts={parts}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--slate)', lineHeight: 1.75, maxWidth: '640px', marginBottom: '16px' }}
              />
            ))}
            <Link to="/audit" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '12px' }}>
              Get My Free Visibility Score
            </Link>
          </div>
        </section>

        {/* Body sections */}
        {page.sections.map((section, i) => (
          <section key={section.heading} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--ash)', padding: '64px 0' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
              <h2 style={h2Style}>{section.heading}</h2>
              {section.paragraphs.map((parts, j) => (
                <Paragraph key={j} parts={parts} style={bodyTextStyle} />
              ))}
              {section.bullets && (
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
                  {section.bullets.map((item, j) => (
                    <li key={j} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '10px 0',
                      borderBottom: j < section.bullets.length - 1 ? '1px solid var(--rule)' : 'none',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.92rem',
                      color: 'var(--mid)',
                      lineHeight: 1.6,
                    }}>
                      <span style={{ color: 'var(--green-hi)', fontSize: '0.9rem', marginTop: '2px', flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.after && section.after.map((parts, j) => (
                <Paragraph key={j} parts={parts} style={bodyTextStyle} />
              ))}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section style={{ background: page.sections.length % 2 === 0 ? 'var(--white)' : 'var(--ash)', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={h2Style}>Common Questions</h2>
            {page.faqs.map((item) => (
              <div key={item.q} style={{ padding: '18px 0', borderBottom: '1px solid var(--rule)' }}>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--navy)',
                  marginBottom: '8px',
                }}>
                  {item.q}
                </h3>
                <p style={{ ...bodyTextStyle, marginBottom: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section style={{ background: page.sections.length % 2 === 0 ? 'var(--ash)' : 'var(--white)', padding: '48px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={labelStyle}>Related</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {page.related.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.9rem',
                    color: 'var(--navy)',
                    textDecoration: 'none',
                    padding: '10px 0',
                  }}
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              marginBottom: '28px',
            }}>
              See how your business shows up across Google, Apple Maps, Bing, and AI search today. Free, no commitment.
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
