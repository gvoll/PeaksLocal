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
        .btn-ghost.hero-not-sure {
          color: var(--green-hi);
          font-size: 1rem;
        }
        .btn-ghost.hero-not-sure:hover {
          color: var(--white);
        }
`;

export default function Hero() {
  const scrollToAudit = () => {
    const el = document.getElementById('audit');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

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
                Serving Denver,{' '}
                <Link to="/serve" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  the Front Range
                </Link>
                , and Local Businesses Nationwide
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
                PeaksLocal manages your verified local presence across Google, Apple Maps, Bing, and AI search so Denver customers find you, not your competitor.
              </p>

              {/* Pull quote */}
              <blockquote className="hero-fade" style={{
                borderLeft: '3px solid var(--green)',
                paddingLeft: '20px',
                marginBottom: '36px',
                maxWidth: '500px',
              }}>
                <p style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: 'rgba(138,160,184,0.85)',
                  lineHeight: 1.65,
                }}>
                  "If your business information isn't verified, consistent, and trusted across the platforms that power modern search, your competitors are being recommended instead of you."
                </p>
              </blockquote>

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
                  Get My FREE Visibility Score
                </Link>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'No commitment required',
                    'Response within 24 hours',
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

              {/* Alternate path for visitors who aren't ready to convert yet */}
              <button
                className="hero-fade btn-ghost hero-not-sure"
                onClick={scrollToAudienceNav}
                style={{ padding: 0 }}
              >
                Not Sure Where to Start? →
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
