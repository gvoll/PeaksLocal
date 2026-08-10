import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProcessFlow from './ProcessFlow.jsx';

const faqLink = { color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(58,173,100,0.5)', textUnderlineOffset: '3px' };

const callouts = [
  {
    title: 'Verified Agency Partner',
    icon: '✓',
    points: [
      'Google & Apple Agency Partner',
      'Secure, role-based access to your accounts',
      'No password sharing, ever',
    ],
  },
  {
    title: 'Program Management Approach',
    icon: '⊙',
    points: [
      '20+ years delivering complex systems projects',
      'Clear, structured process',
      'Documented deliverables & defined milestones',
    ],
  },
  {
    title: 'Local Roots, National Reach',
    icon: '◎',
    points: [
      'Based in Denver, serving Colorado & nationwide',
      'Any business ready to grow, near or far',
      'In-person appointments for local clients',
      'Virtual consultations available for everyone',
    ],
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
          <h1 className="about-mindset-heading reveal">
            <span className="about-mindset-line">AN ENGINEERING MINDSET.</span>
            <span className="about-mindset-line">A CONSULTING BACKGROUND.</span>
            <span className="about-mindset-line">
              A <span className="about-mindset-local">LOCAL</span> FOCUS.
            </span>
          </h1>

          <p className="about-mindset-body reveal reveal-delay-1">
            PeaksLocal was founded by a Denver-based consultant with 20+ years of experience building operational systems and managing complex programs, from early-stage startups to Fortune 500 enterprises.
          </p>

          <blockquote className="about-pull-quote reveal reveal-delay-4">
            Where most local marketing agencies focus on tactics, we bring a program manager's discipline to the problem...<br />
            The result is a service that treats your <Link to="/faq#what-is-digital-identity" style={faqLink}>digital identity</Link> the way a good IT partner treats your network: built right, kept running, and documented throughout.
          </blockquote>
        </div>
      </div>

      <div className="about-callouts-wrapper">
        <div className="container about-callouts-grid"
        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
      
          <div className="about-callouts"
          style={{ 
        width: '100%', 
        maxWidth: '1200px', // A wider maxWidth allows 3 columns to sit comfortably side-by-side
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'row', // Aligns the boxes horizontally on the same line
        gap: '20px', // Puts space between the boxes
        justifyContent: 'center' // Keeps them tightly centered if the screen is huge
      }}
          >
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
                  flex: '1 1 0px',
                  minWidth: '280px'
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
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {c.points.map((point) => (
                      <li
                        key={point}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.85rem',
                          color: 'var(--slate)',
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ color: 'var(--green-hi)', fontSize: '0.8rem', marginTop: '2px', flexShrink: 0 }}>✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
