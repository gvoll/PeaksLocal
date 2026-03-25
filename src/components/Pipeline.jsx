import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { num: '46%', label: 'of all Google searches have local intent', source: 'Think With Google' },
  { num: '76%', label: 'of people who search "near me" visit a business within 24 hours', source: 'Think With Google' },
  { num: '78%', label: 'of local mobile searches result in an offline purchase', source: 'BrightLocal' },
  { num: '$0', label: 'what you capture from a customer who searched for your service but found your competitor instead', source: '' },
];

const pipelineNodes = [
  { label: 'YOUR BUSINESS', sub: 'The source of truth: name, address, phone, services, hours', style: 'filled' },
  { label: 'CORE PLATFORMS', sub: 'Google Business Profile· Bing Places and Apple Business Connect', style: 'outline' },
  { label: 'TRUST SIGNALS', sub: 'Reviews · BBB · Industry Directories', style: 'outline' },
  { label: 'DATA AGGREGATORS', sub: 'Website Schema JSON-LD · Structured Data', style: 'outline' },
  { label: 'SEARCH  MAPS + AI SYSTEMS', sub: 'Google · Siri · ChatGPT · Gemini · Perplexity', style: 'green' },
];

const rightItems = [
  {
    title: 'Why Every Layer Matters',
    body: "AI assistants don't have a single database they check. They cross-check multiple independent sources to confirm a business is real, active, and trustworthy. A gap at any layer weakens their trust signal.",
  },
  {
    title: 'The Consistency Problem',
    body: "If your phone number on Google differs from what's in a data aggregator, or your address on Apple Maps doesn't match your website schema, AI systems treat those discrepancies as reliability signals — and often skip your business entirely.",
  },
  {
    title: 'Untapped Potential',
    body: 'Most local businesses have not yet managed this data layer. The ones that do gain a compounding advantage in every search, map, and AI recommendation.',
  },
];

const nearMeFactors = [
  {
    name: 'Relevance',
    desc: 'How well the business matches the query. Optimize this with accurate categories, detailed service descriptions, and structured data.',
  },
  {
    name: 'Distance',
    desc: 'Proximity to the searcher. Boost this by ensuring precise, consistent location verification across all online platforms.',
  },
  {
    name: 'Prominence',
    desc: "The business's authority and trust. This is established by:",
    bullets: [
      'Volume and recency of reviews.',
      'Consistent NAP (Name, Address, Phone number) data across directories.',
      'Verified presence across multiple independent platforms.',
    ],
  },
];

export default function Pipeline() {
  const sectionRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  const scrollToSystem = () => {
    const el = document.getElementById('system');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        .pipeline-node-filled { background: var(--navy); border: 2px solid var(--navy); color: var(--white); }
        .pipeline-node-outline { background: transparent; border: 2px solid var(--rule); color: var(--ink); }
        .pipeline-node-green { background: var(--green); border: 2px solid var(--green); color: var(--white); }
        .pipeline-arrow { display: flex; align-items: center; justify-content: center; height: 28px; color: var(--slate); font-size: 1.2rem; flex-shrink: 0; }
        .nearme-factor { background: var(--white); border: 1px solid var(--rule); border-radius: 10px; padding: 20px 22px; }
        .nearme-factor-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 1rem; text-transform: uppercase; color: var(--navy); letter-spacing: 0.04em; margin-bottom: 6px; }
        .stat-card-pipeline { background: var(--ash); border: 1px solid var(--rule); border-radius: 10px; padding: 24px 20px; }
        @media (max-width: 900px) {
          .pipeline-grid { flex-direction: column !important; }
          .pipeline-left { width: 100% !important; }
          .stats-grid-4 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .stats-grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <section
        id="pipeline"
        ref={sectionRef}
        style={{ background: 'var(--white)', padding: '100px 0' }}
      >
        <div className="container">

          {/* Section Header */}
          <div style={{ maxWidth: '680px', marginBottom: '72px' }}>
            <div className="section-eyebrow reveal" style={{ color: 'var(--green)' }}>
              HOW MODERN SEARCH ACTUALLY WORKS
            </div>
            <h2
              className="reveal reveal-delay-1"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '2.8rem', textTransform: 'uppercase', color: 'var(--navy)', lineHeight: 1.05, marginBottom: '18px', letterSpacing: '-0.01em' }}
            >
              Search Isn't Just Google Anymore. And It's Getting More Complex.
            </h2>
            <p
              className="reveal reveal-delay-2"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.75 }}
            >
              The way customers find local businesses has fundamentally changed — and most businesses haven't kept up. Here's what's actually happening behind every search.
            </p>
          </div>

          {/* Visibility Ecosystem Drawing */}
          <div className="reveal" style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.62rem',
              color: 'var(--slate)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              PeaksLocal Visibility Ecosystem
            </div>
            <div
              onClick={() => setLightboxOpen(true)}
              style={{
                border: '1px solid var(--rule)',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                maxWidth: '520px',
                width: '100%',
                background: 'var(--white)',
                cursor: 'zoom-in',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-card)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <img
                src="/drawing.jpeg"
                alt="PeaksLocal Visibility Ecosystem"
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: 'var(--slate)' }}>
              Click to enlarge
            </div>
          </div>

          {/* Lightbox */}
          {lightboxOpen && (
            <div
              onClick={() => setLightboxOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                background: 'rgba(0,0,0,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                cursor: 'zoom-out',
              }}
            >
              <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
                <button
                  onClick={() => setLightboxOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    right: '-14px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--white)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    color: 'var(--ink)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                    zIndex: 1,
                  }}
                >
                  ×
                </button>
                <img
                  src="/drawing.jpeg"
                  alt="PeaksLocal Visibility Ecosystem"
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: 'block',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    borderRadius: '12px',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                  }}
                />
              </div>
            </div>
          )}

          {/* 3a — The "Near Me" Reality */}
          <div className="reveal" style={{ background: 'var(--ash)', borderRadius: '16px', padding: '40px', marginBottom: '72px' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--navy)', letterSpacing: '0.03em', marginBottom: '16px' }}>
              When Someone Searches "Near Me," Here's What Decides Who Shows Up.
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, marginBottom: '28px', maxWidth: '700px' }}>
              "Near me" searches are one of the most valuable queries a local business can appear in — and one of the most misunderstood. The results aren't random. Every platform uses the same three criteria to decide which businesses to recommend:
            </p>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--slate)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Key Factors for Local Search Ranking
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {nearMeFactors.map((f) => (
                <div key={f.name} className="nearme-factor">
                  <div className="nearme-factor-name">{f.name}</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--mid)', lineHeight: 1.65 }}>{f.desc}</p>
                  {f.bullets && (
                    <ul style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {f.bullets.map((b) => (
                        <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--mid)' }}>
                          <span style={{ color: 'var(--green-hi)', flexShrink: 0 }}>·</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.65 }}>
              PeaksLocal directly impacts all of these three factors. That's why this is infrastructure, not marketing.
            </p>
          </div>

          {/* 3b — Stats */}
          <div
            className="stats-grid-4 reveal"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '80px' }}
          >
            {stats.map((stat) => (
              <div key={stat.num} className="stat-card-pipeline">
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '2.4rem', color: 'var(--navy)', lineHeight: 1, marginBottom: '10px' }}>
                  {stat.num}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'var(--mid)', lineHeight: 1.5, marginBottom: stat.source ? '8px' : 0 }}>
                  {stat.label}
                </p>
                {stat.source && (
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--slate)', letterSpacing: '0.06em' }}>
                    — {stat.source}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* 3c — How AI Finds Local Businesses */}
          <div style={{ marginBottom: '64px' }}>
            <h3 className="reveal" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--navy)', letterSpacing: '0.03em', marginBottom: '14px' }}>
              AI Assistants Don't Guess. They Follow a Data Trail.
            </h3>
            <p className="reveal reveal-delay-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.75, marginBottom: '48px', maxWidth: '640px' }}>
              Search engines and AI assistants build recommendations by cross-referencing multiple layers of verified business data. When your information is consistent and trusted at every layer, you get recommended. When it isn't, you don't.
            </p>

            <div className="pipeline-grid" style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>
              {/* Pipeline diagram */}
              <div className="pipeline-left reveal" style={{ width: '280px', flexShrink: 0 }}>
                {pipelineNodes.map((node, i) => (
                  <React.Fragment key={node.label}>
                    <div
                      className={`pipeline-node-${node.style}`}
                      style={{ borderRadius: '10px', padding: '16px 18px' }}
                    >
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {node.label}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', opacity: 0.7, lineHeight: 1.4 }}>
                        {node.sub}
                      </div>
                    </div>
                    {i < pipelineNodes.length - 1 && <div className="pipeline-arrow">↓</div>}
                  </React.Fragment>
                ))}
              </div>

              {/* Right — supporting points + warning */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {rightItems.map((item, i) => (
                    <div
                      key={item.title}
                      className={`reveal reveal-delay-${i + 1}`}
                      style={{ borderLeft: '3px solid var(--green-pale)', paddingLeft: '20px' }}
                    >
                      <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.1rem', textTransform: 'uppercase', color: 'var(--navy)', letterSpacing: '0.04em', marginBottom: '8px' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', color: 'var(--mid)', lineHeight: 1.7 }}>
                        {item.body}
                      </p>
                    </div>
                  ))}

                  {/* Warning callout */}
                  <div
                    className="reveal reveal-delay-4"
                    style={{ borderLeft: '4px solid var(--green)', background: 'var(--ash)', borderRadius: '0 10px 10px 0', padding: '20px 22px', marginTop: '4px' }}
                  >
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>
                      <strong style={{ color: 'var(--navy)' }}>If your information is incomplete or inconsistent anywhere in this chain, AI systems may skip your business entirely</strong> — including when a customer is actively looking for exactly what you offer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3d — Transition to Solution */}
          <div
            className="reveal"
            style={{ borderTop: '1px solid var(--rule)', paddingTop: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}
          >
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.75, maxWidth: '620px' }}>
              This is what PeaksLocal is built to fix. We establish and maintain your verified presence at every layer of this pipeline — so by the time a recommendation engine asks "can I trust this business data?", the answer is a consistent, verified yes.
            </p>
            <button className="btn-primary" onClick={scrollToSystem}>
              See How We Work →
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
