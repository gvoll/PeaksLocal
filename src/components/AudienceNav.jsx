import React, { useRef } from 'react';

const paths = [
  {
    label: 'I know what I need',
    sub: 'Skip the explainer and see our services, packages, and pricing.',
    cta: 'View Services →',
    target: 'services',
  },
  {
    label: "I'm new to local SEO",
    sub: 'Not sure why this matters yet? See how customers actually find local businesses today.',
    cta: 'Show Me Why It Matters →',
    target: 'problem',
  },
  {
    label: "I've tried DIY or an agency before",
    sub: 'Already have listings set up somewhere? See the structured system that keeps them accurate.',
    cta: 'See The System →',
    target: 'system',
  },
];

export default function AudienceNav() {
  const navRef = useRef(null);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        .audience-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .audience-grid { grid-template-columns: 1fr; }
        }
        .audience-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 28px 26px;
          text-align: left;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .audience-card:hover {
          border-color: rgba(58,173,100,0.4);
          background: rgba(255,255,255,0.07);
          transform: translateY(-2px);
        }
        .audience-card:hover .audience-cta {
          color: var(--green-hi);
        }
      `}</style>
      <section
        id="audience-nav"
        ref={navRef}
        style={{ background: 'var(--navy)', padding: '56px 0 72px' }}
      >
        <div className="container">
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--slate)',
            textAlign: 'center',
            marginBottom: '24px',
          }}>
            Not sure where to start? Pick what fits.
          </p>
          <div className="audience-grid">
            {paths.map((p) => (
              <button
                key={p.target}
                className="audience-card"
                onClick={() => scrollToId(p.target)}
              >
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                  letterSpacing: '0.01em',
                  marginBottom: '10px',
                }}>
                  {p.label}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.88rem',
                  color: 'var(--slate)',
                  lineHeight: 1.6,
                  marginBottom: '18px',
                  flexGrow: 1,
                }}>
                  {p.sub}
                </p>
                <span
                  className="audience-cta"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--slate)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {p.cta}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
