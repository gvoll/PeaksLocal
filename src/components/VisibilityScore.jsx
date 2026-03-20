import React, { useEffect, useRef } from 'react';

const auditRows = [
  { cat: 'Google Business Profile', status: 'Verified', pill: 'green', points: '20/20' },
  { cat: 'Website Identity Schema', status: 'Missing', pill: 'red', points: '0/15' },
  { cat: 'Apple Business Connect', status: 'Missing', pill: 'red', points: '0/15' },
  { cat: 'Data Distribution', status: 'Missing', pill: 'red', points: '0/15' },
  { cat: 'Trust Directories', status: 'At Risk', pill: 'amber', points: '6/12' },
  { cat: 'Bing Places', status: 'At Risk', pill: 'amber', points: '5/10' },
  { cat: 'Review Profile', status: 'At Risk', pill: 'amber', points: '4/8' },
  { cat: 'Social Profile Sync', status: 'At Risk', pill: 'amber', points: '7/5' },
];

const stats = [
  { num: '46%', label: 'of all Google searches have local intent', source: 'Think With Google' },
  { num: '78%', label: 'of local mobile searches result in an offline purchase', source: 'BrightLocal' },
  { num: '76%', label: 'of people who search nearby visit within 24 hours', source: 'Think With Google' },
  { num: '300+', label: 'data endpoints updated when we build your identity', source: 'PeaksLocal' },
];

export default function VisibilityScore() {
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
    <section
      id="score"
      ref={sectionRef}
      style={{ background: 'var(--ash)', padding: '100px 0' }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '640px', marginBottom: '64px' }}>
          <div className="section-eyebrow reveal" style={{ color: 'var(--green)' }}>
            YOUR LOCAL VISIBILITY SCORE
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
              marginBottom: '18px',
              letterSpacing: '-0.01em',
            }}
          >
            Most Businesses Assume They Show Up. Many Don't.
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
            PeaksLocal evaluates your business across the eight platforms and signals that determine whether search engines and AI assistants recommend you. You receive a Local Visibility Score from 0 to 100 — showing exactly where your presence stands today.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: '48px',
          alignItems: 'start',
        }}>
          {/* LEFT — Mock Audit Card */}
          <div className="reveal" style={{
            background: 'var(--white)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--rule)',
          }}>
            {/* Card header */}
            <div style={{
              background: 'var(--navy)',
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.65rem',
                color: 'var(--slate)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                LOCAL VISIBILITY AUDIT
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '1rem',
                    color: 'var(--white)',
                    marginBottom: '2px',
                  }}>
                    Acme Plumbing Co.
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.8rem',
                    color: 'var(--slate)',
                  }}>
                    Denver, CO
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: '2.4rem',
                    color: '#e08a1a',
                    lineHeight: 1,
                  }}>
                    42
                  </div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.6rem',
                    color: 'var(--slate)',
                    letterSpacing: '0.08em',
                  }}>
                    / 100
                  </div>
                </div>
              </div>
            </div>

            {/* Rows */}
            <div>
              {auditRows.map((row, i) => (
                <div
                  key={row.cat}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '11px 20px',
                    borderBottom: i < auditRows.length - 1 ? '1px solid var(--rule)' : 'none',
                    gap: '10px',
                    background: i % 2 === 0 ? 'var(--white)' : '#fafbfc',
                  }}
                >
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.82rem',
                    color: 'var(--ink)',
                    flex: 1,
                    minWidth: 0,
                  }}>
                    {row.cat}
                  </span>
                  <span className={`pill-${row.pill}`} style={{ flexShrink: 0 }}>
                    {row.status}
                  </span>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.75rem',
                    color: 'var(--mid)',
                    flexShrink: 0,
                    minWidth: '40px',
                    textAlign: 'right',
                  }}>
                    {row.points}
                  </span>
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div style={{
              background: 'var(--navy)',
              padding: '14px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.62rem',
                color: 'var(--slate)',
                letterSpacing: '0.08em',
              }}>
                LOCAL VISIBILITY SCORE
              </span>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                color: '#e08a1a',
                letterSpacing: '0.04em',
              }}>
                42 / 100 · AT RISK
              </span>
            </div>
          </div>

          {/* RIGHT — Stats + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Stats grid */}
            <div
              className="reveal reveal-delay-1"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.num}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--rule)',
                    borderRadius: '10px',
                    padding: '20px 16px',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: '2.2rem',
                    color: 'var(--navy)',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}>
                    {stat.num}
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.78rem',
                    color: 'var(--mid)',
                    lineHeight: 1.5,
                    marginBottom: '8px',
                  }}>
                    {stat.label}
                  </p>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.6rem',
                    color: 'var(--slate)',
                    letterSpacing: '0.08em',
                  }}>
                    — {stat.source}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA block */}
            <div
              className="reveal reveal-delay-2"
              style={{
                background: 'var(--navy)',
                borderRadius: '12px',
                padding: '28px 24px',
              }}
            >
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9rem',
                color: 'var(--slate)',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}>
                Your Local Visibility Score reveals exactly where you're strong, where you're at risk, and what it would take to improve. It's free, and we'll have it back to you within 24 hours.
              </p>
              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={scrollToAudit}
              >
                Get My Free Visibility Score
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          #score .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
