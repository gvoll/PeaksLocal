import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SampleReportCard from './SampleReportCard.jsx';

const bullets = [
  'Your Visibility Score, rated across 7 areas',
  'A map of where customers can find you',
  'A free 15-minute walkthrough of your results',
  'No obligation, no sales pressure',
];

// Raw CSS via dangerouslySetInnerHTML (see AuditForm for why).
const styles = `
  .srs-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 56px; align-items: center; max-width: 960px; margin: 0 auto; }
  .srs-bullets { list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 10px; }
  .srs-bullets li { display: flex; gap: 12px; align-items: flex-start; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; color: var(--ink); line-height: 1.45; }
  .srs-tick { flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; background: rgba(58,173,100,0.12); border: 1.5px solid var(--green-hi); color: var(--green); display: inline-flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; margin-top: 1px; }
  @media (max-width: 820px) {
    .srs-grid { grid-template-columns: minmax(0, 1fr); gap: 36px; }
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
        <div className="srs-grid">
          <div>
            <div className="section-eyebrow reveal" style={{ color: 'var(--green)' }}>
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
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', color: 'var(--mid)', lineHeight: 1.6, marginBottom: '22px' }}
            >
              Your free report shows how your business currently shows up on Google, Maps, Bing, and AI search.
            </p>
            <ul className="srs-bullets reveal reveal-delay-3">
              {bullets.map((text) => (
                <li key={text}>
                  <span className="srs-tick" aria-hidden="true">&#10003;</span>
                  {text}
                </li>
              ))}
            </ul>
            <Link to="/audit" className="btn-primary reveal reveal-delay-3" style={{ textDecoration: 'none' }}>
              Get your free audit <span aria-hidden="true">&rarr;</span>
            </Link>
            <p
              className="reveal reveal-delay-3"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--mid)', marginTop: '12px' }}
            >
              Quick and simple to request. Your report arrives by email within one business day.
            </p>
          </div>
          <div className="reveal reveal-delay-2">
            <SampleReportCard />
          </div>
        </div>
      </div>
    </section>
  );
}
