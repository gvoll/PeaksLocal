import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProcessFlow from './ProcessFlow.jsx';

const auditRows = [
  { cat: 'Google Business Profile', status: 'Verified', pill: 'green', points: '23 / 23' },
  { cat: 'Apple Business Connect', status: 'Missing', pill: 'red', points: '0 / 18' },
  { cat: 'Bing Places', status: 'Needs Work', pill: 'amber', points: '6 / 12' },
  { cat: 'Website Identity Schema', status: 'Needs Work', pill: 'amber', points: '9 / 18' },
  { cat: 'Trust Directories', status: 'Needs Work', pill: 'amber', points: '7 / 14' },
  { cat: 'Review Profile', status: 'Needs Work', pill: 'amber', points: '4 / 9' },
  { cat: 'Social Profile Sync', status: 'Verified', pill: 'green', points: '6 / 6' },
];

const tier1Items = [
  'Google, Apple & Bing profile setup and full optimization',
  'JSON-LD schema deployment on your website',
  'BBB liaison and trust directory claims',
  'Social profile NAP synchronization',
  'Monitoring and reporting',
];

const tier2Items = [
  'Monthly profile updates — photos, posts, attributes',
  'Review monitoring and response management',
  'Review velocity strategy',
  'Citation drift detection and correction',
  'Monthly visibility report',
];

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
        .service-list-item:last-child { border-bottom: none; }
        .service-check { color: var(--green-hi); font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
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
        .who-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
        .plan-card {
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 14px;
          padding: 32px 28px;
          box-shadow: var(--shadow-card);
        }
        .pill-green { display: inline-block; background: rgba(58,173,100,0.12); color: var(--green-hi); border: 1px solid rgba(58,173,100,0.25); font-family: 'DM Mono', monospace; font-size: 0.62rem; letter-spacing: 0.06em; padding: 3px 8px; border-radius: 3px; }
        .pill-red { display: inline-block; background: rgba(200,50,50,0.1); color: #c03030; border: 1px solid rgba(200,50,50,0.2); font-family: 'DM Mono', monospace; font-size: 0.62rem; letter-spacing: 0.06em; padding: 3px 8px; border-radius: 3px; }
        .pill-amber { display: inline-block; background: rgba(224,138,26,0.12); color: #a0620a; border: 1px solid rgba(224,138,26,0.25); font-family: 'DM Mono', monospace; font-size: 0.62rem; letter-spacing: 0.06em; padding: 3px 8px; border-radius: 3px; }
        .system-intro {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
          gap: 48px;
          align-items: center;
          margin-bottom: 72px;
        }
        .system-intro-copy { max-width: 520px; }
        .system-heading-line { display: block; }
        .system-heading-accent { color: #3aad64; }
        @media (max-width: 840px) {
          .services-grid { flex-direction: column !important; }
          .who-cols { flex-direction: column !important; }
          .system-intro {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        @media (max-width: 768px) {
          .who-cols {
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
      `}</style>
      <section
        id="system"
        ref={sectionRef}
        style={{ background: 'var(--ash)', padding: '100px 0' }}
      >
        <div className="container">

          {/* Section Header + process flow */}
          <div className="system-intro">
            <div className="system-intro-copy">
              <div className="section-eyebrow reveal" style={{ color: 'var(--green)' }}>
                THE PEAKSLOCAL SYSTEM
              </div>
              <h2
                className="reveal reveal-delay-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '2.8rem', textTransform: 'uppercase', color: 'var(--navy)', lineHeight: 1.05, marginBottom: '18px', letterSpacing: '-0.01em' }}
              >
                <span className="system-heading-line">A STRUCTURED PROCESS.</span>
                <span className="system-heading-line">A VERIFIED IDENTITY.</span>
                <span className="system-heading-line">
                  A <span className="system-heading-accent">COMPETITIVE</span> ADVANTAGE.
                </span>
              </h2>
              <p
                className="reveal reveal-delay-2"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.75 }}
              >
                Local visibility is not an isolated task — it's infrastructure. We build it with program management discipline, maintain it like a systematic process, and monitor its performance with detailed reporting.
              </p>
              
            <ProcessFlow className="reveal reveal-delay-2"/>
              
          </div>
              

          {/* 4a — The Audit */}
          <div style={{ marginBottom: '72px' }}>
            <h3
              className="reveal"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--navy)', letterSpacing: '0.03em', marginBottom: '14px' }}
            >
              First, Let's Assess Your Current Presence
            </h3>
            <p
              className="reveal reveal-delay-1"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, marginBottom: '36px', maxWidth: '640px' }}
            >
              We begin with a comprehensive Digital Identity Audit — this assesses your business across the essential platforms and signals influencing recommendations from search engines and AI assistants. The result is your Local Visibility Score (0–100 rating) — this shows your current online presence and highlights targeted opportunities to boost your visibility.
            </p>

            <div className="reveal reveal-delay-1" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--slate)', lineHeight: 1.7 }}>
                The example below is a pattern we see often — one strong platform and notable gaps elsewhere. The free audit shows you yours.
              </p>
            </div>
            <div style={{ marginTop: '24px' }}>

              {/* Audit card */}
              <div className="reveal">
                <div style={{ background: 'var(--white)', borderRadius: '14px', overflow: 'hidden', boxShadow: 'var(--shadow-card)', border: '1px solid var(--rule)' }}>
                  {/* Card header */}
                  <div style={{ background: 'var(--navy)', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--slate)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                      LOCAL VISIBILITY AUDIT — SAMPLE
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '1rem', color: 'var(--white)', marginBottom: '2px' }}>
                          Acme Plumbing Co.
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'var(--slate)' }}>
                          Denver, CO
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '2.4rem', color: '#e08a1a', lineHeight: 1 }}>
                          42
                        </div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--slate)', letterSpacing: '0.08em' }}>
                          / 100
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', background: 'var(--ash)', borderBottom: '1px solid var(--rule)' }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--slate)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Category</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--slate)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Status</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--slate)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Points</span>
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
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'var(--ink)', flex: 1, minWidth: 0 }}>
                          {row.cat}
                        </span>
                        <span className={`pill-${row.pill}`} style={{ flexShrink: 0 }}>
                          {row.status}
                        </span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'var(--mid)', flexShrink: 0, minWidth: '48px', textAlign: 'right' }}>
                          {row.points}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Card footer */}
                  <div style={{ background: 'var(--navy)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'var(--slate)', letterSpacing: '0.08em' }}>
                      LOCAL VISIBILITY SCORE
                    </span>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#e08a1a', letterSpacing: '0.04em' }}>
                      42 / 100 · Needs Work
                    </span>
                  </div>
                </div>
              </div>

              {/* Note below card */}

              <button className="btn-primary" style={{ flexShrink: 0, marginTop: '24px' }} onClick={scrollToAudit}>
                Get My Free Visibility Score
              </button>
            </div>
          </div>

          {/* 4b — The Plan */}
          <div className="plan-card reveal" style={{ marginBottom: '72px' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--navy)', letterSpacing: '0.03em', marginBottom: '14px' }}>
              Strategy to Achieve Your Goals.
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, maxWidth: '700px', marginBottom: '12px' }}>
              Since every business is unique, we audit your current state, review findings, prioritize high-impact actions, and define a project scope aligned with your goals.
            </p>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.65 }}>
              The audit drives the scope. No predetermined packages forced onto situations they don't fit.
            </p>
          </div>

          {/* 4c — Two Service Tiers */}
          <div style={{ marginBottom: '72px' }}>
            <h3
              className="reveal"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--navy)', letterSpacing: '0.03em', marginBottom: '8px' }}
            >
              Build Once. Maintain Always.
            </h3>
            <p
              className="reveal reveal-delay-1"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, marginBottom: '32px' }}
            >
              Two phases designed around your business — not a one-size-fits-all package.
            </p>

            <div className="services-grid" style={{ display: 'flex', gap: '28px', alignItems: 'stretch' }}>
              {/* Tier 1 */}
              <div className="services-card reveal" style={{ flex: 1 }}>
                <div style={{ background: 'var(--navy)', padding: '28px 28px 24px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: 'var(--white)', fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '3px' }}>ONE-TIME PROJECT</span>
                    <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: 'var(--white)', fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '3px' }}>FOUNDATIONAL STEP</span>
                  </div>
                  <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--white)', letterSpacing: '0.03em', marginBottom: '12px' }}>
                    Identity Build
                  </h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--slate)', lineHeight: 1.65 }}>
                    We establish your complete verified presence across the major platforms that power modern search. We'll ensure your accurate and consistent business details across all of the relevant data layers to boost your visibility.
                  </p>
                </div>
                <div style={{ padding: '24px 28px', flex: 1 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: '14px' }}>
                    Your Plan May Include
                  </div>
                  <ul>
                    {tier1Items.map((item) => (
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

              {/* Tier 2 */}
              <div className="services-card reveal reveal-delay-1" style={{ flex: 1 }}>
                <div style={{ background: 'var(--green)', padding: '28px 28px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: 'var(--white)', fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '3px' }}>MONTHLY ONGOING</span>
                    <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: 'var(--white)', fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '3px' }}>BUILD + PROFILE MANAGEMENT</span>
                  </div>
                  <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--white)', letterSpacing: '0.03em', marginBottom: '12px' }}>
                    Identity Management
                  </h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
                    We strengthen, protect, and monitor your online identity and digital presence. This ensures you maintain strong visibility, regardless of how platforms or AI systems evolve.
                  </p>
                </div>
                <div style={{ padding: '24px 28px', flex: 1 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: '14px' }}>
                    As Your Identity Management Partner
                  </div>
                  <ul>
                    {tier2Items.map((item) => (
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

            <div
              className="reveal reveal-delay-2"
              style={{
                marginTop: '28px',
                maxWidth: '720px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  padding: '24px 28px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 24px rgba(15, 36, 64, 0.1)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '18px',
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#1a3a5c',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  <span style={{ display: 'block', marginBottom: '6px' }}>Need something different?</span>
                  <span style={{ fontWeight: 500 }}>
                    While our standard tiers are flexible, we can create a custom plan for specific services or unique project needs. Contact us to discuss a tailored solution.
                  </span>
                </p>
                <Link
                  to="/contact"
                  className="btn-primary"
                  style={{
                    background: '#2E7D4F',
                    color: '#ffffff',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    justifyContent: 'center',
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* 4d — Who We Help */}
          <div>
            <div style={{ maxWidth: '640px', marginBottom: '40px' }}>
              <div className="section-eyebrow reveal" style={{ color: 'var(--green)' }}>
                WHO WE HELP
              </div>
              <h3
                className="reveal reveal-delay-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '2rem', textTransform: 'uppercase', color: 'var(--navy)', lineHeight: 1.05, marginBottom: '16px', letterSpacing: '-0.01em' }}
              >
                Built for Businesses To Win on Local Reputation.
              </h3>
              <p
                className="reveal reveal-delay-2"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.75 }}
              >
                PeaksLocal is ideal for established businesses whose bottom line relies on local visibility. If your customers are searching for services "near me," being found online is essential for your success.
              </p>
            </div>


            <div className="who-cols" style={{ display: 'flex', gap: '32px', marginBottom: '32px', maxWidth: '100%', boxSizing: 'border-box' }}>
              {/* Professional Services */}
              <div className="reveal" style={{ flex: 1, minWidth: 0, background: 'var(--white)', border: '1px solid var(--rule)', borderRadius: '12px', padding: '28px 24px', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.1rem', textTransform: 'uppercase', color: 'var(--navy)', letterSpacing: '0.05em', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid var(--green-pale)' }}>
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
              <div className="reveal reveal-delay-1" style={{ flex: 1, minWidth: 0, background: 'var(--white)', border: '1px solid var(--rule)', borderRadius: '12px', padding: '28px 24px', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.1rem', textTransform: 'uppercase', color: 'var(--navy)', letterSpacing: '0.05em', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid var(--green-pale)' }}>
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

            <div
              className="reveal reveal-delay-2"
              style={{
                marginTop: '28px',
                maxWidth: '720px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  padding: '24px 28px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 24px rgba(15, 36, 64, 0.1)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '18px',
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#1a3a5c',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  Unsure if PeaksLocal is the right fit? Our free audit gives you clarity on your current online presence.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    background: '#2E7D4F',
                    color: '#ffffff',
                    display: 'inline-flex',
                    justifyContent: 'center',
                  }}
                  onClick={scrollToAudit}
                >
                  Start with a Free Audit
                </button>
              </div>
            </div>
          </div>
        </div>


      </section>
    </>
  );
}

