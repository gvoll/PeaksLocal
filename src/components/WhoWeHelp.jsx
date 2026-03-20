import React, { useEffect, useRef } from 'react';

const professional = [
  'Law firms & legal practices',
  'Medical & dental practices',
  'Real estate professionals',
  'Financial advisors & CPAs',
  'Consultants & agencies',
];

const commerce = [
  'Contractors & home services',
  'Restaurants & hospitality',
  'Local retail & boutiques',
  'Wellness & fitness studios',
  'Auto services & trades',
];

export default function WhoWeHelp() {
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
        .who-list-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: var(--mid);
          padding: 9px 0;
          border-bottom: 1px solid var(--rule);
        }
        .who-list-item:last-child { border-bottom: none; }
        .who-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .who-cols { flex-direction: column !important; }
        }
      `}</style>
      <section
        id="who"
        ref={sectionRef}
        style={{ background: 'var(--ash)', padding: '100px 0' }}
      >
        <div className="container">
          {/* Header */}
          <div style={{ maxWidth: '640px', marginBottom: '56px' }}>
            <div className="section-eyebrow reveal" style={{ color: 'var(--green)' }}>
              WHO PEAKSLOCAL HELPS
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
              Built for Businesses That Win on Local Reputation.
            </h2>
            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                color: 'var(--mid)',
                lineHeight: 1.75,
              }}
            >
              PeaksLocal works best for businesses where being found locally is directly tied to revenue. If your customers search "near me," visibility is not optional.
            </p>
          </div>

          {/* Two columns */}
          <div
            className="who-cols"
            style={{ display: 'flex', gap: '32px', marginBottom: '40px' }}
          >
            {/* Professional Services */}
            <div
              className="reveal"
              style={{
                flex: 1,
                background: 'var(--white)',
                border: '1px solid var(--rule)',
                borderRadius: '12px',
                padding: '28px 24px',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                color: 'var(--navy)',
                letterSpacing: '0.05em',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '2px solid var(--green-pale)',
              }}>
                Professional Services
              </div>
              <ul>
                {professional.map((item) => (
                  <li key={item} className="who-list-item">
                    <span className="who-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Local Commerce */}
            <div
              className="reveal reveal-delay-1"
              style={{
                flex: 1,
                background: 'var(--white)',
                border: '1px solid var(--rule)',
                borderRadius: '12px',
                padding: '28px 24px',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                color: 'var(--navy)',
                letterSpacing: '0.05em',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '2px solid var(--green-pale)',
              }}>
                Local Commerce
              </div>
              <ul>
                {commerce.map((item) => (
                  <li key={item} className="who-list-item">
                    <span className="who-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Note */}
          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontStyle: 'italic',
              fontSize: '0.88rem',
              color: 'var(--slate)',
              textAlign: 'center',
            }}
          >
            Not sure if PeaksLocal is right for you? The free audit will tell you — and if your presence is already strong, we'll say so.
          </p>
        </div>
      </section>
    </>
  );
}
