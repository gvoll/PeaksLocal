import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const faqLink = { color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(58,173,100,0.5)', textUnderlineOffset: '3px' };
import ProcessFlow from './ProcessFlow.jsx';

const auditRows = [
  { cat: 'Google Business Profile', platform: 'Maps · Search · Gemini AI', status: 'Passed', pill: 'green', note: 'Claimed, complete, and consistent with your other listings. No action needed here.' },
  { cat: 'Website Schema / JSON-LD', platform: 'Structured data on site', status: 'Critical Gap', pill: 'red', note: "No structured data on your site, so AI assistants and search engines can't confidently read your business details." },
  { cat: 'Apple Business Connect', platform: 'Apple Maps · Siri', status: 'Critical Gap', pill: 'red', note: "No confirmed listing, so Siri and Apple Maps can't confidently recommend you." },
  { cat: 'Trust Directories', platform: 'BBB · Yelp · Industry listings', status: 'Needs Attention', pill: 'amber', note: 'Inconsistent details across 2 of the directories we checked, which dilutes a key trust signal.' },
  { cat: 'Review Profile', platform: 'Recency · Volume · Response rate', status: 'Optimization Gap', pill: 'teal', note: 'Review activity is healthy, with room to tighten response consistency.' },
  { cat: 'Bing Places', platform: 'Bing Maps · ChatGPT results', status: 'Needs Attention', pill: 'amber', note: "At least one listed detail doesn't match your other primary profiles." },
  { cat: 'Social Profile Sync', platform: 'NAP consistency across platforms', status: 'Optimization Gap', pill: 'teal', note: 'Profiles are consistent, with some room to strengthen how complete each one is.' },
];

const scoreFill = 5;
const scoreLabel = 'Fair';

const priorityNextSteps = [
  'Claim and complete your Apple Business Connect listing',
  'Add structured data (JSON-LD) to your website',
  'Standardize your info across Bing, BBB, and industry directories',
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

export default function System({ headingLevel = 'h2' }) {
  const MainHeading = headingLevel;
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
        .pill-teal { display: inline-block; background: rgba(42,122,150,0.12); color: #1f6f8a; border: 1px solid rgba(42,122,150,0.25); font-family: 'DM Mono', monospace; font-size: 0.62rem; letter-spacing: 0.06em; padding: 3px 8px; border-radius: 3px; }
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
          <div className="system-intro" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            
            {/* The Eyebrow */}
            <div 
              className="section-eyebrow reveal" 
              style={{ 
                color: 'var(--green)', 
                marginBottom: '12px',
                width: '100%',
                maxWidth: '800px',
                textAlign: 'left'
              }}
            >
              THE PEAKSLOCAL SYSTEM
            </div>

            {/* Main Heading */}
            <MainHeading
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '2.8rem',
                textTransform: 'uppercase',
                color: 'var(--navy)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                width: '100%',
                maxWidth: '800px',
                marginBottom: '18px',
                textAlign: 'left'
              }}
            >
              <span className="system-heading-line" style={{ display: 'block' }}>A STRUCTURED PROCESS.</span>
              <span className="system-heading-line" style={{ display: 'block' }}>A VERIFIED IDENTITY.</span>
              <span className="system-heading-line" style={{ display: 'block' }}>
                A <span className="system-heading-accent">COMPETITIVE</span> ADVANTAGE.
              </span>
            </MainHeading>

            {/* Description Paragraph */}
            <p
              className="reveal reveal-delay-2"
              style={{ 
                fontFamily: "'DM Sans', sans-serif", 
                fontSize: '1rem', 
                color: 'var(--mid)', 
                lineHeight: 1.75,
                width: '100%',
                maxWidth: '800px', 
                marginBottom: '40px', 
                textAlign: 'left' 
              }}
            >
              Local visibility is not an isolated task — it's infrastructure. We build it with program management discipline, maintain it like a systematic process, and monitor its performance with detailed reporting.
            </p>

            {/* Dedicated Flow Graphic Wrapper */}
            <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'flex-start' }}>
              <ProcessFlow className="reveal reveal-delay-2"/>
            </div>

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
              We begin with a comprehensive Digital Identity Audit, assessing your business across the essential platforms and signals that influence recommendations from search engines and AI assistants. Whether you operate from a physical location or as a service area business, we provide this detailed audit as a current snapshot of your digital identity, highlighting targeted opportunities to boost your visibility.
            </p>

            <div className="reveal reveal-delay-1" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--slate)', lineHeight: 1.7 }}>
                The example below is a pattern we see often: one strong platform and notable gaps elsewhere. The free audit shows you yours.
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '1rem', color: 'var(--white)', marginBottom: '2px' }}>
                          Acme Plumbing Co.
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'var(--slate)' }}>
                          Denver, CO
                        </div>
                      </div>
                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--slate)', letterSpacing: '0.08em', marginBottom: '6px' }}>
                          IDENTITY SCORE
                        </div>
                        <div style={{ display: 'flex', gap: '3px', justifyContent: 'flex-end', width: '110px' }}>
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div
                              key={i}
                              style={{
                                flex: 1,
                                height: '5px',
                                borderRadius: '2px',
                                background: i < scoreFill ? '#e08a1a' : 'rgba(255,255,255,0.12)',
                              }}
                            />
                          ))}
                        </div>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#e08a1a', letterSpacing: '0.04em', marginTop: '6px' }}>
                          {scoreLabel}
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
                          padding: '14px 20px',
                          borderBottom: i < auditRows.length - 1 ? '1px solid var(--rule)' : 'none',
                          background: i % 2 === 0 ? 'var(--white)' : '#fafbfc',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '3px' }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.85rem', color: 'var(--ink)' }}>
                            {row.cat}
                          </span>
                          <span className={`pill-${row.pill}`} style={{ flexShrink: 0 }}>
                            {row.status}
                          </span>
                        </div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--slate)', letterSpacing: '0.02em', marginBottom: '5px' }}>
                          {row.platform}
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'var(--mid)', lineHeight: 1.5 }}>
                          {row.note}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card footer */}
                  <div style={{ background: 'var(--navy)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'var(--slate)', letterSpacing: '0.08em' }}>
                      LOCAL VISIBILITY SCORE
                    </span>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#e08a1a', letterSpacing: '0.04em' }}>
                      {scoreLabel}
                    </span>
                  </div>

                  {/* Priority next steps */}
                  <div style={{ padding: '20px 20px 22px', background: 'var(--ash)' }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'var(--slate)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                      Priority Next Steps
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {priorityNextSteps.map((step, i) => (
                        <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{
                            flexShrink: 0,
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: 'var(--green-hi)',
                            color: 'var(--white)',
                            fontFamily: "'DM Mono', monospace",
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            {i + 1}
                          </span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.5 }}>
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
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
                    We establish your complete verified presence across the major platforms that power modern search. We'll ensure your accurate and consistent business details across all of the relevant <Link to="/faq#data-layer" style={faqLink}>data layers</Link> to boost your visibility.
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
        </div>


      </section>
    </>
  );
}

