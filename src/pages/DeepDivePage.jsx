import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import DeepDivePanel from '../components/DeepDivePanel.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';

const eyebrowStyle = {
  fontFamily: "'DM Mono', monospace",
  fontSize: '0.72rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--green)',
  marginBottom: '12px',
};

const bodyStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '1rem',
  color: 'var(--mid)',
  lineHeight: 1.75,
  maxWidth: '720px',
};

const linkStyle = {
  color: 'var(--green)',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  fontWeight: 600,
};

export default function DeepDivePage() {
  const sectionRef = useRef(null);

  // The panel's .reveal elements stay hidden until something marks them
  // visible; sections elsewhere on the site do this with their own observer.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="Visibility Deep-Dive: Local Competitor Analysis"
        description="Find out why you rank where you do. A Google Maps ranking report, local competitor analysis, and review sentiment analysis, credited toward your project."
        canonical="/deep-dive"
        breadcrumbs={[
          { name: 'Services', path: '/services' },
          { name: 'Visibility Deep-Dive', path: '/deep-dive' },
        ]}
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <section ref={sectionRef} style={{ background: 'var(--white)', padding: '80px 0 100px' }}>
          <div className="container">
            <div style={{ maxWidth: '760px', marginBottom: '40px' }}>
              <div style={eyebrowStyle}>ADD-ON TO YOUR FREE AUDIT</div>
              <p style={{ ...bodyStyle, marginBottom: '12px' }}>
                Already have listings, or an agency, but aren't seeing results? Start here.
              </p>
              <p style={bodyStyle}>
                Not sure whether you need it yet? The{' '}
                <Link to="/audit" style={linkStyle}>free visibility audit</Link>
                {' '}comes first, and it shows you where you stand.
              </p>
            </div>
            <DeepDivePanel flush headingLevel="h1" />
            <p style={{ ...bodyStyle, marginTop: '32px', fontSize: '0.95rem' }}>
              Ready to build or manage what the Deep-Dive finds? See our{' '}
              <Link to="/services" style={linkStyle}>services</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
