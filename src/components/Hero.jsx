import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const items = heroRef.current?.querySelectorAll('.hero-fade');
    if (!items) return;
    items.forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 120 + i * 130);
    });
  }, []);

  const scrollToAudit = () => {
    const el = document.getElementById('audit');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToPipeline = () => {
    const el = document.getElementById('pipeline');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        .hero-fade {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        @media (max-width: 960px) {
          .hero-grid { flex-direction: column !important; }
        }
        @media (max-width: 600px) {
          .hero-h1 { font-size: 3.2rem !important; }
          .hero-trust { flex-direction: column; gap: 8px !important; }
        }
      `}</style>
      <section
        id="hero"
        ref={heroRef}
        style={{
          background: 'var(--navy)',
          minHeight: '100vh',
          paddingTop: '120px',
          paddingBottom: '80px',
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
                Local Visibility for the AI Era
                <span className="blink-dot" />
              </div>

              {/* H1 */}
              <h1
                className="hero-fade hero-h1"
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
                Stop Being the<br />
                Best-Kept Secret<br />
                <span style={{ color: 'var(--green-hi)' }}>in Town.</span>
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
                PeaksLocal builds and maintains the verified digital identity that search engines, Apple Maps, and AI assistants rely on to recommend your business — not your competitor's.
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

              {/* CTAs */}
              <div className="hero-fade" style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <button
                  className="btn-primary"
                  style={{ fontSize: '1rem', padding: '15px 28px' }}
                  onClick={scrollToAudit}
                >
                  Get My Free Visibility Score
                </button>
                <button
                  className="btn-ghost"
                  onClick={scrollToPipeline}
                >
                  See How It Works →
                </button>
              </div>

              {/* Trust line */}
              <div className="hero-fade hero-trust" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
              }}>
                {[
                  'Free visibility score (0–100)',
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

          </div>
        </div>
      </section>
    </>
  );
}
