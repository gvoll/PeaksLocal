import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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

export const partnerTypes = [
  'Web design & development agencies',
  'Branding & creative studios',
  'PR & communications firms',
  'Marketing consultants & freelancers',
  'Business coaches & advisors',
];

export function PartnerSection() {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

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
    <section
      id="partners"
      ref={sectionRef}
      style={{ background: 'var(--navy)', padding: '80px 0' }}
    >
      <div className="container">
        <div className="reveal" style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(58,173,100,0.25)',
          borderRadius: '12px',
          padding: '36px 40px',
          overflow: 'hidden',
        }}>
          {/* Header row */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap',
            paddingBottom: '28px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '28px',
          }}>
            <div>
              <div className="section-eyebrow" style={{ color: 'var(--green-hi)', marginBottom: '12px' }}>
                WORK WITH PEAKSLOCAL
              </div>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '2rem',
                textTransform: 'uppercase',
                color: 'var(--white)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                <span style={{ color: 'var(--green-hi)' }}>Partners:</span> Agency + Referral
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
              <Link
                to="/partners"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--slate)',
                  textDecoration: 'none',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  whiteSpace: 'nowrap',
                }}
              >
                Learn more →
              </Link>
              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Partner Types
                <span style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--green-hi)',
                  display: 'inline-block',
                  transition: 'transform 0.25s ease',
                  transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)',
                  lineHeight: 1,
                }}>+</span>
              </button>
              <Link
                to="/contact"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--navy)',
                  background: 'var(--green-hi)',
                  textDecoration: 'none',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                Let's talk →
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div style={{ marginBottom: '0' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--white)',
              marginBottom: '16px',
            }}>
              Benefits
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {[
                'Local digital identity falls outside your core offering — we handle it so you stay focused.',
                'Your clients get a dedicated expert; you stay in your lane without losing the relationship.',
                'No formal program or revenue share required — just a conversation about what works for both of us.',
                'Flexible arrangements: warm referrals, white-label support, or project handoffs.',
              ].map((item) => (
                <li key={item} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.87rem',
                  color: 'var(--slate)',
                  lineHeight: 1.6,
                }}>
                  <span style={{ color: 'var(--green-hi)', fontSize: '0.85rem', marginTop: '2px', flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Expandable partner types */}
          <div style={{
            maxHeight: expanded ? '200px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              marginTop: '28px',
              paddingTop: '20px',
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}>
              {partnerTypes.map((item) => (
                <span key={item} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.82rem',
                  color: 'var(--slate)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '6px 14px',
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
        style={{ background: 'var(--ash)', padding: '100px 0 80px' }}
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

          {/* Audit chip */}
          <div className="reveal reveal-delay-2" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              textAlign: 'center',
              padding: '28px 40px',
              border: '1px solid var(--rule)',
              borderRadius: '12px',
              background: 'var(--white)',
              boxShadow: 'var(--shadow-card)',
              maxWidth: '67%',
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.95rem',
                color: 'var(--navy)',
                lineHeight: 1.6,
                margin: '0 0 20px',
              }}>
                <strong>Unsure if PeaksLocal is the right fit?</strong><br />
                Our free audit gives you clarity on your current online presence.
              </p>
              <Link to="/audit" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Start with a Free Audit
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
