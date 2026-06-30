import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';

const NAV_LINKS = [
  { label: 'Why a Review Funnel', href: '#why' },
  { label: 'See It in Action', href: '#demo' },
  { label: 'Apple Maps + SABs', href: '#apple' },
  { label: 'Review Templates', href: '#templates' },
  { label: 'Get Yours', href: '#cta' },
];

const TEMPLATES = [
  {
    id: 'quick',
    label: 'The Quick One',
    sub: 'For clients who want to say something but don\'t know where to start',
    prompt: 'Working with [Business Name] was straightforward from the start. They helped us with [what you worked on] and the results were clear: [one outcome]. Easy to recommend.',
    note: 'Just fill in the brackets — the rest is already there.',
  },
  {
    id: 'detailed',
    label: 'The Detailed One',
    sub: 'For clients who want to be thorough',
    prompt: 'We came to [Business Name] because [the problem you were trying to solve]. The process was [how it went — communication, timeline, etc.]. What stood out was [one specific thing]. Since working with them, [the result or change]. If you\'re dealing with something similar, they\'re worth a conversation.',
    note: 'Answer each prompt in a sentence or two — it writes itself.',
  },
  {
    id: 'skeptic',
    label: 'The Honest One',
    sub: 'For clients who feel awkward writing reviews',
    prompt: 'I don\'t usually write reviews, but [Business Name] earned one. They [what they did] and it made a real difference for [your business or situation]. Honest feedback: [one thing that worked well]. Worth it.',
    note: 'Honest reviews are the most useful ones — for future clients and for the business.',
  },
];

function AcmeDemo({ type }) {
  const isLocation = type === 'location';

  const platforms = isLocation
    ? [
        {
          name: 'Google',
          action: 'Review us on Google',
          sub: 'Takes about 1 minute',
          bg: '#fff',
          border: '1.5px solid rgba(0,0,0,0.1)',
          icon: (
            <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          ),
        },
        {
          name: 'Apple Maps',
          action: 'Review us on Apple Maps',
          sub: 'For iPhone and Mac users',
          bg: '#1c1c1e',
          border: 'none',
          icon: (
            <svg width="20" height="20" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
              <path fill="#fff" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-122.7c-58.1-92.3-105.2-236.4-105.2-373.6 0-222.4 145.2-339.5 288.3-339.5 74.9 0 137.2 49.2 184.3 49.2 44.5 0 115.4-52 202.7-52 32.6 0 133.4 3.2 198.8 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
            </svg>
          ),
        },
        {
          name: 'Yelp',
          action: 'Review us on Yelp',
          sub: 'Also supports Apple Maps',
          bg: '#D32323',
          border: 'none',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#D32323"/>
              <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="serif">y</text>
            </svg>
          ),
        },
        {
          name: 'Bing',
          action: 'Find us on Bing',
          sub: 'For Windows and Edge users',
          bg: '#008373',
          border: 'none',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#fff" d="M5 3l4 1.5v13l5-2.8-2-1.2 1-6 5 1.8V15l-9 5-4-2.3z"/>
            </svg>
          ),
        },
      ]
    : [
        {
          name: 'Google',
          action: 'Review us on Google',
          sub: 'Takes about 1 minute',
          bg: '#fff',
          border: '1.5px solid rgba(0,0,0,0.1)',
          icon: (
            <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          ),
        },
        {
          name: 'Yelp',
          action: 'Review us on Yelp',
          sub: 'Also supports our Apple Maps presence',
          bg: '#D32323',
          border: 'none',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#D32323"/>
              <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="serif">y</text>
            </svg>
          ),
        },
        {
          name: 'Bing',
          action: 'Find us on Bing',
          sub: 'For Windows and Edge users',
          bg: '#008373',
          border: 'none',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#fff" d="M5 3l4 1.5v13l5-2.8-2-1.2 1-6 5 1.8V15l-9 5-4-2.3z"/>
            </svg>
          ),
        },
      ];

  const appleNote = !isLocation && (
    <div style={{
      marginTop: '12px',
      padding: '12px 16px',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '8px',
    }}>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.6,
        margin: 0,
      }}>
        <strong style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>A note on Apple Maps:</strong> Apple does not currently support direct reviews for service-area businesses. Leaving a review on Yelp is the best way to support our Apple Maps presence in the meantime.
      </p>
    </div>
  );

  return (
    <div style={{
      background: 'var(--navy)',
      borderRadius: '16px',
      padding: '32px 28px',
      border: '1px solid rgba(255,255,255,0.08)',
      minWidth: 0,
    }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.65rem',
          color: 'var(--green-hi)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          {isLocation ? 'Example: Business with a location' : 'Example: Service-area business'}
        </div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: '1.6rem',
          textTransform: 'uppercase',
          color: 'var(--white)',
        }}>
          {isLocation ? 'Acme Co.' : 'Acme Services'}
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.82rem',
          color: 'var(--slate)',
          marginTop: '4px',
        }}>
          {isLocation ? 'Denver, CO · A storefront or office location' : 'Denver Metro Area · No public address'}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {platforms.map((p) => (
          <div
            key={p.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              background: '#fff',
              border: '1.5px solid rgba(0,0,0,0.08)',
              borderRadius: '10px',
              padding: '14px 18px',
              cursor: 'default',
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: p.bg,
              border: p.border,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {p.icon}
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.9rem', color: '#1a1a1a' }}>
                {p.action}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#999' }}>
                {p.sub}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', color: '#ccc' }}>→</div>
          </div>
        ))}
      </div>
      {appleNote}
    </div>
  );
}

function TemplateCard({ template, isOpen, onToggle }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(template.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '24px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
          textAlign: 'left',
        }}
      >
        <div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: '1.15rem',
            textTransform: 'uppercase',
            color: 'var(--white)',
            letterSpacing: '0.02em',
            marginBottom: '4px',
          }}>
            {template.label}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.82rem',
            color: 'var(--slate)',
          }}>
            {template.sub}
          </div>
        </div>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '1.1rem',
          color: 'var(--green-hi)',
          flexShrink: 0,
          transition: 'transform 0.25s ease',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>
          +
        </span>
      </button>

      <div style={{
        maxHeight: isOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
      }}>
        <div style={{ paddingBottom: '28px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '20px 24px',
            marginBottom: '12px',
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.92rem',
              color: 'var(--white)',
              lineHeight: 1.75,
              margin: 0,
              fontStyle: 'italic',
            }}>
              "{template.prompt}"
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              color: 'var(--slate)',
              margin: 0,
            }}>
              {template.note}
            </p>
            <button
              onClick={handleCopy}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: copied ? 'var(--green-hi)' : 'var(--slate)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '8px 14px',
                cursor: 'pointer',
                transition: 'color 0.2s',
                flexShrink: 0,
              }}
            >
              {copied ? '✓ Copied' : 'Copy prompt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewFunnelsPage() {
  const [demoTab, setDemoTab] = useState('location');
  const [openTemplate, setOpenTemplate] = useState(null);

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Review Funnels — Get More Reviews with Less Friction"
        description="Every PeaksLocal client gets a branded review page that makes it easy for customers to leave a review on Google, Yelp, and Bing — with templates to reduce blank-page anxiety."
        canonical="/review-funnels"
      />
      <style>{`
        .rf-jump-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: var(--slate);
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
          cursor: pointer;
          background: none;
        }
        .rf-jump-link:hover { color: var(--white); border-color: rgba(255,255,255,0.3); }
        .rf-tab {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 10px 20px;
          border-radius: 8px;
          border: 1.5px solid rgba(255,255,255,0.12);
          background: none;
          color: var(--slate);
          cursor: pointer;
          transition: all 0.2s;
        }
        .rf-tab.active {
          background: var(--green-hi);
          border-color: var(--green-hi);
          color: var(--navy);
          font-weight: 600;
        }
        .rf-why-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 28px 24px;
        }
        @media (max-width: 720px) {
          .rf-demo-grid { grid-template-columns: 1fr !important; }
          .rf-why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Nav />
      <main style={{ paddingTop: '68px', background: 'var(--navy)' }}>

        {/* Hero */}
        <section style={{ padding: '80px 0 64px' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Client Tools
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '3.6rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}>
              The Review Funnel:<br />
              <span style={{ color: 'var(--green-hi)' }}>More Reviews, Less Friction.</span>
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              maxWidth: '640px',
              marginBottom: '40px',
            }}>
              Every PeaksLocal client gets a branded review page built for their business — one link that works across every platform, with templates to help clients say something real without the blank-page anxiety.
            </p>

            {/* Jump nav */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="rf-jump-link"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Why a review funnel */}
        <section id="why" style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.07)', scrollMarginTop: '88px' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Why it matters
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2.2rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '40px',
            }}>
              More Than a Link
            </h2>
            <div className="rf-why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                {
                  n: '01',
                  title: 'Branded trust, not a raw URL',
                  body: 'Sending a bare Google link works, but a branded page with your name, a clear headline, and a personal ask converts better. It signals that you take your reputation seriously.',
                },
                {
                  n: '02',
                  title: 'One link for everything',
                  body: 'Your review page works as a QR code on invoices, a link in email signatures, a button in follow-up messages, and a destination in print materials. One URL handles all of it.',
                },
                {
                  n: '03',
                  title: 'Recency beats volume',
                  body: 'Platforms weight recent reviews more heavily than an old burst. A consistent stream of feedback, even at low volume, outperforms a one-time push that goes quiet. The funnel keeps the ask easy over time.',
                },
                {
                  n: '04',
                  title: 'Responding is part of the signal',
                  body: 'Owner responses to reviews are a ranking signal, not just a courtesy. The review page is the start of the loop: collect, respond, repeat. PeaksLocal tracks and supports this as part of Identity Management.',
                },
              ].map((card) => (
                <div key={card.n} className="rf-why-card">
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.65rem',
                    color: 'var(--green-hi)',
                    letterSpacing: '0.1em',
                    marginBottom: '12px',
                  }}>
                    {card.n}
                  </div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    textTransform: 'uppercase',
                    color: 'var(--white)',
                    marginBottom: '10px',
                    letterSpacing: '0.02em',
                  }}>
                    {card.title}
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.88rem',
                    color: 'var(--slate)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo */}
        <section id="demo" style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.07)', scrollMarginTop: '88px' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              See it in action
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2.2rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '12px',
            }}>
              Built for Your Business Type
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem',
              color: 'var(--slate)',
              lineHeight: 1.7,
              maxWidth: '600px',
              marginBottom: '32px',
            }}>
              The platform options on your review page depend on how your business operates. Toggle between the two scenarios below to see the difference.
            </p>

            {/* Tab toggle */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
              <button
                className={`rf-tab${demoTab === 'location' ? ' active' : ''}`}
                onClick={() => setDemoTab('location')}
              >
                Business with a location
              </button>
              <button
                className={`rf-tab${demoTab === 'sab' ? ' active' : ''}`}
                onClick={() => setDemoTab('sab')}
              >
                Service-area business (no public address)
              </button>
            </div>

            {demoTab === 'location' ? (
              <div style={{ maxWidth: '440px' }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.82rem',
                  color: 'var(--slate)',
                  lineHeight: 1.65,
                  marginBottom: '16px',
                }}>
                  Businesses with a verified physical location can have a Place Card on Apple Maps, which supports direct reviews. All four major platforms are available.
                </p>
                <AcmeDemo type="location" />
              </div>
            ) : (
              <div style={{ maxWidth: '440px' }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.82rem',
                  color: 'var(--slate)',
                  lineHeight: 1.65,
                  marginBottom: '16px',
                }}>
                  Service-area businesses operate without a public address and don't qualify for an Apple Maps Place Card. Google is primary, Yelp covers the Apple gap, and Bing extends reach into AI-powered search.
                </p>
                <AcmeDemo type="sab" />
              </div>
            )}
          </div>
        </section>

        {/* Apple SAB section */}
        <section id="apple" style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.07)', scrollMarginTop: '88px' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Platform nuance
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2.2rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '24px',
            }}>
              Apple Maps + Service-Area Businesses
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '32px',
            }}
            className="rf-demo-grid"
            >
              <div style={{
                background: 'rgba(255,59,48,0.07)',
                border: '1px solid rgba(255,59,48,0.2)',
                borderRadius: '12px',
                padding: '24px',
              }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  color: 'rgba(255,120,110,0.9)',
                  letterSpacing: '0.06em',
                  marginBottom: '12px',
                }}>
                  The limitation
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Apple reviews require a Place Card',
                    'Place Cards require a verified physical address',
                    "SABs (home-based, mobile, remote) don't qualify",
                    'No Place Card = no Apple review profile',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--slate)', lineHeight: 1.5 }}>
                      <span style={{ color: 'rgba(255,120,110,0.8)', flexShrink: 0, marginTop: '1px' }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                background: 'rgba(58,173,100,0.07)',
                border: '1px solid rgba(58,173,100,0.2)',
                borderRadius: '12px',
                padding: '24px',
              }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  color: 'var(--green-hi)',
                  letterSpacing: '0.06em',
                  marginBottom: '12px',
                }}>
                  The workaround
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Yelp reviews feed Apple Maps in certain cases',
                    'Strong Yelp presence = best indirect Apple signal',
                    'Builds your Yelp profile directly',
                    'Apple Maps visibility improves over time',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--slate)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--green-hi)', flexShrink: 0, marginTop: '1px' }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              padding: '20px 24px',
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.88rem',
                color: 'var(--slate)',
                lineHeight: 1.7,
                margin: 0,
              }}>
                <strong style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Worth knowing:</strong> Apple has indicated that SAB support is on their roadmap, but there is no confirmed timeline. PeaksLocal monitors platform changes across all major systems and will update client pages when Apple support becomes available.
              </p>
            </div>
          </div>
        </section>

        {/* Review templates */}
        <section id="templates" style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.07)', scrollMarginTop: '88px' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Review templates
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2.2rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '12px',
            }}>
              Reduce the Blank-Page Problem
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem',
              color: 'var(--slate)',
              lineHeight: 1.7,
              maxWidth: '620px',
              marginBottom: '8px',
            }}>
              Most clients want to leave a review and don't know how to start. These prompts give them a frame, not a script. The words should be theirs — these just remove the friction.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              color: 'rgba(138,160,184,0.6)',
              fontStyle: 'italic',
              marginBottom: '40px',
            }}>
              Note: these are starting points, not templates to copy verbatim. Authentic, specific feedback is more useful for future clients and more trusted by platforms.
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {TEMPLATES.map((t, i) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  isOpen={openTemplate === i}
                  onToggle={() => setOpenTemplate(openTemplate === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.07)', scrollMarginTop: '88px' }}>
          <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2.4rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '16px',
            }}>
              Get Your Own Review Page
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              maxWidth: '520px',
              margin: '0 auto 32px',
            }}>
              Every PeaksLocal engagement includes a branded review funnel built for your business type, with the right platforms, the right framing, and a link you can use anywhere.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/audit" className="btn-primary" style={{ textDecoration: 'none' }}>
                Get My Free Visibility Score
              </Link>
              <Link to="/contact" className="btn-ghost" style={{ textDecoration: 'none' }}>
                Talk to Us →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
