import React, { useEffect, useRef } from 'react';

const pipelineNodes = [
  {
    label: 'YOUR BUSINESS',
    sub: 'The source of truth: your name, address, phone, services',
    style: 'filled',
  },
  {
    label: 'CORE PLATFORMS',
    sub: 'Google · Apple Maps · Bing',
    style: 'outline',
  },
  {
    label: 'TRUST SIGNALS',
    sub: 'Reviews · BBB · Industry Directories',
    style: 'outline',
  },
  {
    label: 'DATA AGGREGATORS',
    sub: 'Data Axle · Foursquare · Acxiom · 300+ endpoints',
    style: 'outline',
  },
  {
    label: 'SEARCH + AI SYSTEMS',
    sub: 'Google · Siri · ChatGPT · Gemini · Perplexity',
    style: 'green',
  },
];

const rightItems = [
  {
    title: 'Why each layer matters',
    body: 'AI assistants don\'t have a single database they check. They cross-reference multiple independent sources to confirm a business is real, active, and trustworthy. A gap at any layer weakens the signal.',
  },
  {
    title: 'The consistency problem',
    body: 'If your phone number on Google says one thing and your listing on a data aggregator says another, AI models treat the discrepancy as a reliability signal — and often skip your business entirely in recommendations.',
  },
  {
    title: 'What PeaksLocal does',
    body: 'We build and synchronize your identity at every layer — so by the time a recommendation engine asks "can I trust this business data?" the answer across every source is a consistent, verified yes.',
  },
];

export default function Pipeline() {
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
    <>
      <style>{`
        .pipeline-node-filled {
          background: var(--navy);
          border: 2px solid var(--navy);
          color: var(--white);
        }
        .pipeline-node-outline {
          background: transparent;
          border: 2px solid var(--rule);
          color: var(--ink);
        }
        .pipeline-node-green {
          background: var(--green);
          border: 2px solid var(--green);
          color: var(--white);
        }
        .pipeline-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 28px;
          color: var(--slate);
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .pipeline-grid { flex-direction: column !important; }
          .pipeline-left { width: 100% !important; }
        }
      `}</style>
      <section
        id="pipeline"
        ref={sectionRef}
        style={{ background: 'var(--white)', padding: '100px 0' }}
      >
        <div className="container">
          {/* Header */}
          <div style={{ maxWidth: '620px', marginBottom: '64px' }}>
            <div className="section-eyebrow reveal" style={{ color: 'var(--green)' }}>
              HOW MODERN SEARCH WORKS
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
                marginBottom: '18px',
                letterSpacing: '-0.01em',
              }}
            >
              AI Assistants Don't Guess. They Follow a Data Trail.
            </h2>
            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                color: 'var(--mid)',
                lineHeight: 1.75,
              }}
            >
              Search engines and AI assistants build recommendations by analyzing multiple layers of verified business data. When your information is consistent and trusted at every layer, you get recommended. When it isn't, you don't.
            </p>
          </div>

          {/* Two-column body */}
          <div className="pipeline-grid" style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>
            {/* LEFT — Pipeline diagram */}
            <div className="pipeline-left reveal" style={{ width: '280px', flexShrink: 0 }}>
              {pipelineNodes.map((node, i) => (
                <React.Fragment key={node.label}>
                  <div
                    className={`pipeline-node-${node.style}`}
                    style={{
                      borderRadius: '10px',
                      padding: '16px 18px',
                    }}
                  >
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}>
                      {node.label}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.78rem',
                      opacity: 0.7,
                      lineHeight: 1.4,
                    }}>
                      {node.sub}
                    </div>
                  </div>
                  {i < pipelineNodes.length - 1 && (
                    <div className="pipeline-arrow">↓</div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* RIGHT — Copy + warning */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {rightItems.map((item, i) => (
                  <div
                    key={item.title}
                    className={`reveal reveal-delay-${i + 1}`}
                    style={{
                      borderLeft: '3px solid var(--green-pale)',
                      paddingLeft: '20px',
                    }}
                  >
                    <h4 style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      textTransform: 'uppercase',
                      color: 'var(--navy)',
                      letterSpacing: '0.04em',
                      marginBottom: '8px',
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.92rem',
                      color: 'var(--mid)',
                      lineHeight: 1.7,
                    }}>
                      {item.body}
                    </p>
                  </div>
                ))}

                {/* Warning box */}
                <div
                  className="reveal reveal-delay-4"
                  style={{
                    borderLeft: '4px solid var(--green)',
                    background: 'var(--ash)',
                    borderRadius: '0 10px 10px 0',
                    padding: '20px 22px',
                    marginTop: '4px',
                  }}
                >
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.88rem',
                    color: 'var(--ink)',
                    lineHeight: 1.7,
                  }}>
                    <strong style={{ color: 'var(--navy)' }}>If your information is incomplete or inconsistent anywhere in this chain, AI systems may skip your business entirely.</strong> PeaksLocal ensures your identity is verified, consistent, and trusted at every layer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
