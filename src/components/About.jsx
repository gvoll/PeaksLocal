import React, { useEffect, useRef } from 'react';

const credentials = [
  'SAFe Certified POPM',
  'ScrumMaster',
  'CU Boulder',
  'MIS',
  'Akamai',
  'Valtech',
  'Accenture',
  'Denver, CO',
];

const callouts = [
  {
    title: 'Verified Agency Partner',
    body: 'Active Google Agency ID. Apple partner registration in process. No password sharing — role-based access only.',
    icon: '✓',
  },
  {
    title: 'Program Management Background',
    body: '20+ years delivering complex systems projects. Structured process, clear milestones, documented deliverables — every engagement.',
    icon: '⊙',
  },
  {
    title: 'Denver-Based, Nationally Focused',
    body: 'Local roots. Remote-capable delivery. PeaksLocal serves local businesses across the country with the same structured approach.',
    icon: '◎',
  },
];

export default function About() {
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
    <section
      id="about"
      ref={sectionRef}
      style={{ background: 'var(--navy)', padding: '100px 0' }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: '72px',
          alignItems: 'start',
        }}>
          {/* LEFT */}
          <div>
            <div className="section-eyebrow light reveal">WHY PEAKSLOCAL</div>
            <h2
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '2.8rem',
                textTransform: 'uppercase',
                color: 'var(--white)',
                lineHeight: 1.05,
                marginBottom: '20px',
                letterSpacing: '-0.01em',
              }}
            >
              An Engineering Mindset. A Consulting Background.
            </h2>

            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                color: 'var(--slate)',
                lineHeight: 1.75,
                marginBottom: '20px',
              }}
            >
              PeaksLocal was founded by <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Greg Voll</strong>, a Denver-based consultant with 20+ years of experience building operational systems and managing complex programs — from early-stage startups to Fortune 500 enterprises.
            </p>

            <p
              className="reveal reveal-delay-3"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.92rem',
                color: 'var(--slate)',
                lineHeight: 1.75,
                marginBottom: '20px',
              }}
            >
              Where most local marketing agencies focus on tactics, Greg brings a program manager's discipline to the problem: map the system, identify the gaps, build the infrastructure, and maintain it. The result is a service that treats your digital identity the way a good IT partner treats your network — built right, kept running, and documented throughout.
            </p>

            <p
              className="reveal reveal-delay-4"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.92rem',
                color: 'var(--slate)',
                lineHeight: 1.75,
                marginBottom: '28px',
              }}
            >
              His background includes work at Akamai Technologies, Valtech (formerly Kin + Carta), and Accenture — building the operational processes and systems infrastructure that complex organizations rely on. That same rigor now applies to the platforms that determine whether local customers find you.
            </p>

            {/* Credential tags */}
            <div className="reveal reveal-delay-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {credentials.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.65rem',
                    letterSpacing: '0.06em',
                    color: 'var(--slate)',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    padding: '4px 10px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Callout boxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '52px' }}>
            {callouts.map((c, i) => (
              <div
                key={c.title}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '22px 22px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(58,173,100,0.12)',
                  border: '1px solid rgba(58,173,100,0.25)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--green-hi)',
                  fontSize: '1rem',
                  flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    color: 'var(--white)',
                    letterSpacing: '0.04em',
                    marginBottom: '8px',
                  }}>
                    {c.title}
                  </h4>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.85rem',
                    color: 'var(--slate)',
                    lineHeight: 1.65,
                  }}>
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #about .container > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #about .container > div > div:last-child {
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
