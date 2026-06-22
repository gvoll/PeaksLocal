import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const faqLink = { color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(58,173,100,0.5)', textUnderlineOffset: '3px' };

const problems = [
  {
    num: '01',
    title: 'Invisible to \'Near Me\' Searches',
    body: 'When someone searches "best [service] near me" — on Google, through Siri, or by asking ChatGPT — the results come from verified business data. If your information is incomplete or inconsistent, AI systems skip you. Silently, every time.',
  },
  {
    num: '02',
    title: 'Conflicting Business Information',
    body: null,
    renderBody: () => (
      <>
        Inconsistent <Link to="/faq#nap-consistency" style={faqLink}>names, addresses, or phone numbers</Link> across online directories can damage your trust rating with search engines. This confusion can cause your business to display incorrect information or not show up in search results at all.
      </>
    ),
  },
  {
    num: '03',
    title: 'Competitive Advantage',
    body: null,
    renderBody: () => (
      <>
        If competitors proactively verify and manage their <Link to="/faq#what-is-digital-identity" style={faqLink}>digital identity</Link>, they can surpass your visibility in search results, on maps, and within AI recommendations.
      </>
    ),
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
              Most Businesses Assume They Show Up. Many Don't.
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
              Even the best businesses can be invisible to the customers actively searching for products or services — not because of their reputation, but because of gaps in their <Link to="/faq#data-layer" style={faqLink}>data layer</Link> that powers modern search.
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
                  {p.renderBody ? p.renderBody() : p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
