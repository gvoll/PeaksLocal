import React, { useEffect, useRef } from 'react';
import ProcessFlow from './ProcessFlow.jsx';

const callouts = [
  {
    title: 'Verified Agency Partner',
    body: 'Established as a Google Agency Partner, with Apple partner registration underway. This ensures secure, role-based access to your accounts (No password sharing).',
    icon: '✓',
  },
  {
    title: 'Program Management Approach',
    body: 'Benefit from 20+ years of experience delivering complex systems projects. Expect a clear, structured process with documented deliverables and defined milestones.',
    icon: '⊙',
  },
  {
    title: 'Local Roots, National Reach',
    body: 'While Denver-based, we are fully remote-capable. We serve businesses across the country, providing the same high-level, structured approach as we do to our local partners.',
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
    <section id="about" ref={sectionRef}>
      <div className="about-mindset">
        <div className="container">
          <h2 className="about-mindset-heading reveal">
            <span className="about-mindset-line">AN ENGINEERING MINDSET.</span>
            <span className="about-mindset-line">A CONSULTING BACKGROUND.</span>
            <span className="about-mindset-line">
              A <span className="about-mindset-local">LOCAL</span> FOCUS.
            </span>
          </h2>

          <p className="about-mindset-body reveal reveal-delay-1">
            PeaksLocal was founded by a Denver-based consultant with 20+ years of experience building operational systems and managing complex programs — from early-stage startups to Fortune 500 enterprises.
          </p>

          <p className="about-mindset-body reveal reveal-delay-2">
            Where most local marketing agencies focus on tactics, we bring a program manager's discipline to the problem:
          </p>

          <ProcessFlow className="reveal reveal-delay-3" />

          <blockquote className="about-pull-quote reveal reveal-delay-4">
            The result is a service that treats your digital identity the way a good IT partner treats your network — built right, kept running, and documented throughout.
          </blockquote>
        </div>
      </div>

      <div className="about-callouts-wrapper">
        <div className="container about-callouts-grid">
          <div aria-hidden="true" />
          <div className="about-callouts">
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
    </section>
  );
}
