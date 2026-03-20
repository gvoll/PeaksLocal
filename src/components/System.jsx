import React, { useEffect, useRef } from 'react';

const layers = [
  {
    num: '01',
    title: 'Core Infrastructure',
    body: 'The primary platforms search engines and AI systems use to identify real businesses. These are non-negotiable — everything else builds on top of them.',
    tags: ['Google Business Profile', 'Apple Business Connect', 'Bing Places', 'JSON-LD Schema'],
  },
  {
    num: '02',
    title: 'Trust Network',
    body: 'Independent signals that AI models cross-reference to confirm your business is legitimate. This is what moves you from "found" to "recommended."',
    tags: ['BBB', 'Yelp', 'Angi / Houzz', 'Industry Directories', 'Review Presence'],
  },
  {
    num: '03',
    title: 'Distribution Layer',
    body: 'The system that keeps your data consistent everywhere it appears — including GPS units, car dashboards, and hundreds of secondary directories most businesses don\'t know exist.',
    tags: ['Data Axle', 'Localeze', 'Foursquare', 'Acxiom', '300+ endpoints'],
  },
];

export default function System() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .system-card {
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 14px;
          padding: 32px 28px;
          box-shadow: var(--shadow-card);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .system-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
        }
        .tag-chip {
          display: inline-block;
          background: var(--ash);
          border: 1px solid var(--rule);
          color: var(--mid);
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.04em;
          padding: 4px 10px;
          border-radius: 4px;
        }
      `}</style>
      <section
        id="system"
        ref={sectionRef}
        style={{ background: 'var(--ash)', padding: '100px 0' }}
      >
        <div className="container">
          {/* Header */}
          <div style={{ maxWidth: '600px', marginBottom: '64px' }}>
            <div className="section-eyebrow reveal" style={{ color: 'var(--green)' }}>
              THE PEAKSLOCAL SYSTEM
            </div>
            <h2
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '2.8rem',
                textTransform: 'uppercase',
                color: 'var(--navy)',
                lineHeight: 1.05,
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              Three Layers. One Verified Identity.
            </h2>
            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                color: 'var(--mid)',
                lineHeight: 1.7,
                marginBottom: '12px',
              }}
            >
              We don't treat local visibility as a marketing tactic. We treat it as infrastructure.
            </p>
            <p
              className="reveal reveal-delay-3"
              style={{
                fontFamily: "'Lora', serif",
                fontStyle: 'italic',
                fontSize: '0.95rem',
                color: 'var(--mid)',
                lineHeight: 1.7,
              }}
            >
              Built once, maintained always, and engineered to compound over time — the way a good IT partner treats your network.
            </p>
          </div>

          {/* Cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {layers.map((layer, i) => (
              <div
                key={layer.num}
                className={`system-card reveal reveal-delay-${i + 1}`}
              >
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: '3rem',
                  color: 'rgba(30,107,60,0.15)',
                  lineHeight: 1,
                  marginBottom: '12px',
                }}>
                  {layer.num}
                </div>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  textTransform: 'uppercase',
                  color: 'var(--navy)',
                  letterSpacing: '0.03em',
                  marginBottom: '14px',
                }}>
                  {layer.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  color: 'var(--mid)',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                }}>
                  {layer.body}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {layer.tags.map((tag) => (
                    <span key={tag} className="tag-chip">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
