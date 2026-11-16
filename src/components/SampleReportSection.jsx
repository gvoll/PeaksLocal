import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SampleShowcase from './SampleShowcase.jsx';

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

        <SampleShowcase />

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
