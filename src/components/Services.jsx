import React, { useEffect, useRef } from 'react';

const oneTimeItems = [
  'Google, Apple & Bing profile setup and full optimization',
  'JSON-LD schema deployment on your website',
  'BBB liaison and trust directory claims',
  'Data aggregator submission — 300+ endpoints',
  'Social profile NAP synchronization',
  'Completion report with before/after Identity Score',
];

const ongoingItems = [
  'Monthly profile updates — photos, posts, attributes',
  'Review monitoring and response management',
  'Review velocity strategy',
  'Citation drift detection and correction',
  'Monthly visibility report',
  'Your dedicated Director of Digital Presence',
];

export default function Services() {
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

  const scrollToAudit = () => {
    const el = document.getElementById('audit');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        .services-card {
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .services-card:hover {
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-3px);
        }
        .service-list-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: var(--mid);
          line-height: 1.5;
          padding: 5px 0;
          border-bottom: 1px solid var(--rule);
        }
        .service-list-item:last-child {
          border-bottom: none;
        }
        .service-check {
          color: var(--green-hi);
          font-size: 0.9rem;
          flex-shrink: 0;
          margin-top: 1px;
        }
        @media (max-width: 840px) {
          .services-grid { flex-direction: column !important; }
        }
      `}</style>
      <section
        id="services"
        ref={sectionRef}
        style={{ background: 'var(--white)', padding: '100px 0' }}
      >
        <div className="container">
          {/* Header */}
          <div style={{ maxWidth: '600px', marginBottom: '64px' }}>
            <div className="section-eyebrow reveal" style={{ color: 'var(--green)' }}>
              HOW WE WORK TOGETHER
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
              Build Once. Maintain Always.
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
              Two phases designed around your business — not a one-size-fits-all package.
            </p>
          </div>

          {/* Cards */}
          <div
            className="services-grid"
            style={{ display: 'flex', gap: '28px', alignItems: 'stretch' }}
          >
            {/* Card 1 */}
            <div className="services-card reveal" style={{ flex: 1 }}>
              <div style={{
                background: 'var(--navy)',
                padding: '28px 28px 24px',
              }}>
                <span className="badge-navy" style={{ marginBottom: '14px', display: 'inline-block' }}>
                  ONE-TIME PROJECT
                </span>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.6rem',
                  textTransform: 'uppercase',  
                  color: 'var(--white)',
                  letterSpacing: '0.03em',
                  marginBottom: '12px',
                }}>
                  
                  Digital Identity Build
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.88rem',
                  color: 'var(--slate)',
                  lineHeight: 1.65,
                }}>
                  We establish your complete verified presence across every platform that powers modern search. You receive a completion report with a before-and-after Identity Score.
                </p>
              </div>
              <div style={{ padding: '24px 28px', flex: 1 }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--slate)',
                  marginBottom: '14px',
                }}>
                  Includes
                </div>
                <ul>
                  {oneTimeItems.map((item) => (
                    <li key={item} className="service-list-item">
                      <span className="service-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '20px 28px', borderTop: '1px solid var(--rule)' }}>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={scrollToAudit}>
                  Start with a Free Audit
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="services-card reveal reveal-delay-1" style={{ flex: 1 }}>
              <div style={{
                background: 'var(--green)',
                padding: '28px 28px 24px',
              }}>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'var(--white)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '3px',
                  marginBottom: '14px',
                }}>
                  MONTHLY ONGOING
                </span>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.6rem',
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                  letterSpacing: '0.03em',
                  marginBottom: '12px',
                }}>
                  Presence &amp; Reputation Management
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.88rem',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.65,
                }}>
                  Your digital identity needs active maintenance. We monitor, strengthen, and protect your presence so you stay visible as platforms and AI systems evolve.
                </p>
              </div>
              <div style={{ padding: '24px 28px', flex: 1 }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--slate)',
                  marginBottom: '14px',
                }}>
                  Includes
                </div>
                <ul>
                  {ongoingItems.map((item) => (
                    <li key={item} className="service-list-item">
                      <span className="service-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '20px 28px', borderTop: '1px solid var(--rule)' }}>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={scrollToAudit}>
                  Start with a Free Audit
                </button>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontStyle: 'italic',
              fontSize: '0.85rem',
              color: 'var(--slate)',
              textAlign: 'center',
              marginTop: '32px',
            }}
          >
            À la carte options available. Not ready for full management? Start with the free audit — no commitment required.
          </p>
        </div>
      </section>
    </>
  );
}
