import React from 'react';
import { Link } from 'react-router-dom';

// Raw CSS, injected via dangerouslySetInnerHTML rather than as a JSX text
// child. <style> content is HTML "raw text" -- browsers never decode entities
// inside it -- but React's normal text-child serialization HTML-escapes
// quotes/apostrophes (e.g. 'DM Sans' -> &#x27;DM Sans&#x27;), which broke
// prerendered CSS and caused an SSR/client hydration mismatch wherever this
// component renders.
const heroStyles = `
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-fade {
          opacity: 0;
          animation: heroFadeUp 0.65s ease forwards;
        }
        .hero-fade:nth-child(1) { animation-delay: 120ms; }
        .hero-fade:nth-child(2) { animation-delay: 250ms; }
        .hero-fade:nth-child(3) { animation-delay: 380ms; }
        .hero-fade:nth-child(4) { animation-delay: 510ms; }
        .hero-fade:nth-child(5) { animation-delay: 640ms; }
        .hero-fade:nth-child(6) { animation-delay: 770ms; }
        @media (max-width: 960px) {
          .hero-grid { flex-direction: column !important; }
        }
        @media (max-width: 600px) {
          .hero-h1 { font-size: 3.2rem !important; }
          .hero-cta-row { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
        }
        .hero-find-path-link {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          color: var(--green-hi);
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
        }
        .hero-find-path-link:hover {
          color: var(--white);
        }
`;

export default function Hero() {
  const scrollToAudienceNav = () => {
    const el = document.getElementById('audience-nav');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />
      <section
        id="hero"
        style={{
          background: 'var(--navy)',
          minHeight: '100vh',
          paddingTop: '120px',
          paddingBottom: '56px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-grid" style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>
            {/* LEFT COLUMN */}
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              {/* Kicker */}
              <div className="hero-fade" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.72rem',
                color: 'var(--green-hi)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '28px',
                background: 'rgba(58,173,100,0.1)',
                border: '1px solid rgba(58,173,100,0.2)',
                padding: '6px 12px',
                borderRadius: '4px',
              }}>
                {/* Wrapped in one span so flex `gap` (meant for the space
                    before the blink-dot) doesn't also insert itself between
                    the Link and the surrounding text as separate flex items. */}
                <span>
                  Serving Denver,{' '}
                  <Link to="/serve" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    the Front Range
                  </Link>, and Local Businesses Nationwide
                </span>
                <span className="blink-dot" />
              </div>

              {/* H1 — intentionally not .hero-fade: this is the LCP element,
                  it renders at full opacity immediately instead of fading in. */}
              <h1
                className="hero-h1"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: '5rem',
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                  marginBottom: '32px',
                  letterSpacing: '-0.01em',
                }}
              >
                One Trusted Identity.<br />
                <span style={{ color: 'var(--green-hi)' }}>Built for Local Search</span><br />
                and Found by AI.
              </h1>

              {/* Sub */}
              <p className="hero-fade" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1.05rem',
                color: 'var(--slate)',
                lineHeight: 1.7,
                marginBottom: '28px',
                maxWidth: '520px',
              }}>
                PeaksLocal builds and maintains your verified business data for local search across Google, Apple Maps, Bing, and AI...so customers find you, not your competitor.
              </p>

              {/* Alternate path for visitors who aren't ready to convert yet */}
              <p className="hero-fade" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.95rem',
                color: 'var(--slate)',
                marginBottom: '36px',
              }}>
                Not sure where to start? Click{' '}
                <button
                  type="button"
                  className="hero-find-path-link"
                  onClick={scrollToAudienceNav}
                >
                  Find My Path
                </button>
              </p>

              {/* CTA + trust points: side by side on larger screens,
                  stacked on mobile via the .hero-cta-row media query below */}
              <div className="hero-fade hero-cta-row" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '28px',
                flexWrap: 'wrap',
                marginBottom: '18px',
              }}>
                <Link
                  to="/audit"
                  className="btn-primary"
                  style={{ fontSize: '1rem', padding: '15px 28px', textDecoration: 'none' }}
                >
                  Get My Free Visibility Score
                </Link>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'No commitment required',
                    'Response within one business day',
                  ].map((item) => (
                    <span key={item} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.8rem',
                      color: 'var(--slate)',
                    }}>
                      <span style={{ color: 'var(--green-hi)', fontSize: '0.9rem' }}>✓</span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
