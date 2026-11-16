import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SampleReportCard from './SampleReportCard.jsx';

const faqLink = { color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(58,173,100,0.5)', textUnderlineOffset: '3px' };
import ProcessFlow from './ProcessFlow.jsx';

const diyDifferences = [
  {
    label: 'It Drifts Out of Sync',
    text: 'A DIY fix or a one-time agency cleanup starts accurate. Without monitoring, listings quietly fall out of sync, and one wrong detail chips away at the trust signal all the others were building.',
  },
  {
    label: 'It Rarely Covers Everything',
    text: 'Most attempts focus on Google alone. Apple, Bing, structured data, and trust directories, the signals that increasingly shape AI-assisted search, usually go untouched.',
  },
  {
    label: "It Doesn't Stick",
    text: 'A one-time fix decays. Our monthly phase exists because maintenance has to be built in, not bolted on.',
  },
];

// Raw CSS, injected via dangerouslySetInnerHTML rather than as a JSX text
// child. <style> content is HTML "raw text" -- browsers never decode entities
// inside it -- but React's normal text-child serialization HTML-escapes
// quotes/apostrophes (e.g. 'DM Sans' -> &#x27;DM Sans&#x27;), which broke
// prerendered CSS and caused an SSR/client hydration mismatch wherever this
// component renders.
const systemStyles = `
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
`;

export default function System({ headingLevel = 'h2', variant = 'full', children = null }) {
  const MainHeading = headingLevel;
  const teaser = variant === 'teaser';
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

  const navigate = useNavigate();
  const goToAudit = () => navigate('/audit');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: systemStyles }} />
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
              Local visibility runs on the same discipline as any other business system, built with program management rigor, maintained as a repeatable process, and monitored with detailed reporting across local SEO and AI search optimization alike.
            </p>

            {/* Dedicated Flow Graphic Wrapper */}
            <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'flex-start' }}>
              <ProcessFlow className="reveal reveal-delay-2"/>
            </div>

            {teaser && (
              <div className="reveal" style={{ marginTop: '32px' }}>
                <Link
                  to="/services"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}
                >
                  See our full process and services →
                </Link>
              </div>
            )}

          </div>

          {!teaser && (
          <>
          {/* Tried DIY or an agency before */}
          <div
            id="diy"
            className="plan-card reveal"
            style={{ maxWidth: '900px', marginBottom: '72px', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--green)' }}>
              TRIED DIY OR AN AGENCY BEFORE?
            </div>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.7rem', textTransform: 'uppercase', color: 'var(--navy)', letterSpacing: '0.02em', margin: 0 }}>
              Why This Might Look Different From What You Tried Before
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.7, margin: 0, maxWidth: '660px' }}>
              Most DIY fixes and one-time agency cleanups look fine on day one. The trouble tends to come from what the first pass didn't cover, and from what happens after.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '6px' }}>
              {diyDifferences.map((item, i) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <span style={{
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--green-hi)',
                    color: 'var(--white)',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {i + 1}
                  </span>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '2px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--mid)', lineHeight: 1.55 }}>
                      {item.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.65, margin: '8px 0 0' }}>
              This is why the engagement has two phases: an audit to find what's actually wrong, then ongoing management so it stays fixed.
            </p>
            <div>
              <Link
                to="/blog/diy-local-seo-vs-hiring-an-agency"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--green-hi)', textDecoration: 'none' }}
              >
                Read the full comparison →
              </Link>
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
                Here's what the free audit looks like: a status for each area we check.
              </p>
            </div>
            <div style={{ marginTop: '24px' }}>

              <div className="reveal">
                <SampleReportCard caption="Sample report for a fictional business. The free audit shows you yours." />
              </div>

              {/* Note below card */}

              <button className="btn-primary" style={{ flexShrink: 0, marginTop: '24px' }} onClick={goToAudit}>
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
              The audit comes first. What we recommend after that is scoped to what your business actually needs.
            </p>
          </div>

          {children}
          </>
          )}

        </div>


      </section>
    </>
  );
}

