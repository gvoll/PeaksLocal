import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SampleReportCard from './SampleReportCard.jsx';
import SampleVisibilityMap from './SampleVisibilityMap.jsx';

// Raw CSS via dangerouslySetInnerHTML (see AuditForm for why).
const styles = `
  .srs-samples { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 40px; max-width: 960px; margin: 0 auto; align-items: start; }
  .srs-label { font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.1em; color: var(--green); font-weight: 500; margin: 0 0 10px; text-align: center; }
  .srs-table { width: 100%; max-width: 440px; margin: 16px auto 0; border-collapse: collapse; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; }
  .srs-table td { padding: 10px 0; border-top: 1px solid var(--rule); vertical-align: top; line-height: 1.5; color: var(--ink); }
  .srs-table td:first-child { width: 82px; padding-right: 12px; color: var(--green); font-weight: 500; }
  .srs-table ul { margin: 0; padding-left: 18px; list-style: disc; }
  .srs-table li { margin: 0 0 6px; }
  .srs-table li:last-child { margin-bottom: 0; }
  @media (max-width: 820px) {
    .srs-samples { grid-template-columns: minmax(0, 1fr); gap: 48px; }
  }
`;

export default function SampleReportSection() {
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
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="sample-report" style={{ background: 'var(--ash)', padding: '100px 0' }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 48px' }}>
          <div className="section-eyebrow reveal" style={{ color: 'var(--green)', justifyContent: 'center' }}>
            FREE VISIBILITY AUDIT
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
            Check Your Visibility Today<span style={{ color: 'var(--green)' }}>...Free!</span>
          </h2>
          <p
            className="reveal reveal-delay-2"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', color: 'var(--mid)', lineHeight: 1.6, margin: 0 }}
          >
            Your free audit gives you two things: a clear status for each area we check, and a map of where customers can actually find you.
          </p>
        </div>

        <div className="srs-samples">
          <div className="reveal reveal-delay-2">
            <p className="srs-label">1 · YOUR REPORT CARD</p>
            <SampleReportCard caption="" />
            <table className="srs-table">
              <tbody>
                <tr>
                  <td>Shows</td>
                  <td>Your current status across these 7 key areas listed.</td>
                </tr>
                <tr>
                  <td>Helps you</td>
                  <td>Get a targeted snapshot of your strengths and gaps to boost your local search visibility.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="reveal reveal-delay-3">
            <p className="srs-label">2 · YOUR VISIBILITY MAP</p>
            <SampleVisibilityMap />
            <table className="srs-table">
              <tbody>
                <tr>
                  <td>Shows</td>
                  <td>
                    <ul>
                      <li>Your current local search rankings across your area, seen through a customer's eyes.</li>
                      <li>AI Snapshot: Tests your keywords across leading AI models to see how often you're named.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>Helps you</td>
                  <td>Spot the neighborhoods where nearby customers can't find you.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="reveal reveal-delay-3" style={{ textAlign: 'center', marginTop: '44px' }}>
          <Link to="/audit" className="btn-primary" style={{ textDecoration: 'none' }}>
            Get your free audit <span aria-hidden="true">&rarr;</span>
          </Link>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--mid)', margin: '12px 0 0' }}>
            Quick and simple to request. Your report arrives by email within one business day.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'var(--slate)', margin: '6px 0 0' }}>
            Samples shown for a fictional business.
          </p>
        </div>
      </div>
    </section>
  );
}
