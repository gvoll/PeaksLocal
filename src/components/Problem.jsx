import React, { useEffect, useRef } from 'react';

const problems = [
  {
    num: '01',
    title: 'Invisible to AI Recommendations',
    body: 'AI assistants answer questions like "best plumber near me" by pulling from verified business data. If your data isn\'t clean and consistent, AI systems skip you — silently, every time someone asks.',
  },
  {
    num: '02',
    title: 'Conflicting Business Information',
    body: 'Different phone numbers, outdated hours, or inconsistent addresses across directories confuse search engines. When platforms can\'t trust your data, they stop showing your business.',
  },
  {
    num: '03',
    title: 'Your Competitors Are Fixing This',
    body: 'Businesses actively managing their digital identity appear more often in search, maps, and AI recommendations. The ones who don\'t are slowly disappearing — without even knowing it.',
  },
];

export default function Problem() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .problem-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .problem-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--green);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s ease;
        }
        .problem-card:hover::before {
          transform: scaleY(1);
        }
        .problem-card:hover {
          border-color: rgba(58,173,100,0.25);
          background: rgba(255,255,255,0.06);
        }
      `}</style>
      <section
        id="problem"
        ref={sectionRef}
        style={{ background: 'var(--navy)', padding: '100px 0' }}
      >
        <div className="container">
          {/* Header */}
          <div style={{ maxWidth: '680px', marginBottom: '64px' }}>
            <div className="section-eyebrow reveal">THE VISIBILITY PROBLEM</div>
            <h2
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '3rem',
                textTransform: 'uppercase',
                color: 'var(--white)',
                lineHeight: 1.05,
                marginBottom: '20px',
                letterSpacing: '-0.01em',
              }}
            >
              Search Has Changed.<br />Most Businesses Haven't.
            </h2>
            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                color: 'var(--slate)',
                lineHeight: 1.75,
              }}
            >
              Search isn't just Google anymore. Customers discover businesses through Google, Apple Maps, Bing, ChatGPT, Gemini, Siri, and Perplexity. These platforms don't just list results — they <em style={{ color: 'rgba(138,160,184,0.9)' }}>recommend</em> businesses. If yours isn't verified and consistent across all of them, you may not make the list at all.
            </p>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {problems.map((p, i) => (
              <div
                key={p.num}
                className={`problem-card reveal reveal-delay-${i + 1}`}
              >
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: '2.8rem',
                  color: 'rgba(58,173,100,0.18)',
                  lineHeight: 1,
                  marginBottom: '16px',
                  letterSpacing: '-0.02em',
                }}>
                  {p.num}
                </div>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                  letterSpacing: '0.02em',
                  marginBottom: '12px',
                  lineHeight: 1.2,
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  color: 'var(--slate)',
                  lineHeight: 1.7,
                }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
