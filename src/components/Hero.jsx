import React, { useEffect, useRef } from 'react';

const platformCards = [
  {
    iconImg: 'https://img.icons8.com/color/1200/my-bussiness.jpg',
    iconBg: '#fff',
    name: 'Google Business',
    sub: 'Search, Maps & Gemini AI',
    badge: 'CORE',
    badgeType: 'core',
  },
  {
    iconImg: 'https://www.tailorbrands.com/wp-content/uploads/2021/01/apple_logo_1988.jpg',
    iconBg: '#fff',
    name: 'Apple Business Connect',
    sub: 'Apple Maps & Siri',
    badge: 'CORE',
    badgeType: 'core',
  },
  {
    iconImg: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/21937385/binglogo.jpg?quality=90&strip=all&crop=0,0,100,100',
    iconBg: '#fff',
    name: 'Bing Places',
    sub: 'Bing Maps & ChatGPT',
    badge: 'CORE',
    badgeType: 'core',
  },
  { divider: true, label: '+ Trust & Distribution Layer' },
  {
    icon: 'BBB',
    iconBg: '#1a3a6b',
    iconColor: '#fff',
    name: 'BBB + Directories',
    sub: 'Verified trust signals',
    badge: 'TRUST',
    badgeType: 'trust',
  },
  {
    icon: '⊕',
    iconBg: '#1e4976',
    iconColor: 'var(--slate)',
    name: 'Data Aggregators',
    sub: '300+ endpoints & GPS systems',
    badge: 'REACH',
    badgeType: 'reach',
  },
];

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
        .platform-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
          cursor: default;
        }
        .platform-card:hover {
          background: rgba(255,255,255,0.09);
          transform: translateX(4px);
          border-color: rgba(58,173,100,0.3);
        }
        @media (max-width: 960px) {
          .hero-grid { flex-direction: column !important; }
          .hero-right { width: 100% !important; }
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

            {/* RIGHT COLUMN — Platform stack */}
            <div className="hero-right" style={{ width: '300px', flexShrink: 0 }}>
              <div className="hero-fade" style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.62rem',
                color: 'var(--slate)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}>
                Your Visibility Network
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {platformCards.map((card, i) => {
                  if (card.divider) {
                    return (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px 0',
                      }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                        <span style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '0.6rem',
                          color: 'var(--slate)',
                          letterSpacing: '0.08em',
                        }}>
                          {card.label}
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="platform-card hero-fade">
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '7px',
                        background: card.iconBg,
                        color: card.iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: card.icon === 'BBB' ? '0.6rem' : '1rem',
                        flexShrink: 0,
                        letterSpacing: card.icon === 'BBB' ? '-0.02em' : 0,
                        overflow: 'hidden',
                      }}>
                        {card.iconImg ? (
                          <img src={card.iconImg} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        ) : card.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: '0.8rem',
                          color: 'var(--white)',
                          lineHeight: 1.2,
                          marginBottom: '2px',
                        }}>
                          {card.name}
                        </div>
                        <div style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.7rem',
                          color: 'var(--slate)',
                        }}>
                          {card.sub}
                        </div>
                      </div>
                      <span className={`badge badge-${card.badgeType}`}>
                        {card.badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
