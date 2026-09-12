import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';

const NAV_LINKS = [
  { label: 'Why a Review Funnel', href: '#why' },
  { label: 'See It in Action', href: '#demo' },
  { label: 'Platform Notes', href: '#apple' },
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
          action: 'Find us on Apple Maps',
          sub: "Reviews shown here are pulled from Yelp",
          bg: '#1c1c1e',
          border: 'none',
          icon: (
            <svg width="20" height="20" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
              <path fill="#fff" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-122.7c-58.1-92.3-105.2-236.4-105.2-373.6 0-222.4 145.2-339.5 288.3-339.5 74.9 0 137.2 49.2 184.3 49.2 44.5 0 115.4-52 202.7-52 32.6 0 133.4 3.2 198.8 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
            </svg>
          ),
        },
        {
          name: 'Bing',
          action: 'Find us on Bing',
          sub: 'Reviews shown here are pulled from Yelp too',
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
      ];

  const platformNote = (
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
        Yelp isn't shown above, see why in <a href="#apple" style={{ color: 'var(--green-hi)' }}>Platform Notes</a> below.
        {!isLocation && ' Apple Maps and Bing aren\'t shown either, a separate, SAB-specific gap covered there too.'}
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

      {isLocation && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.6,
          margin: '12px 0 0',
        }}>
          Apple Maps and Bing don't have review systems of their own, both are showing your Yelp reviews. Managing your Yelp profile is what actually keeps all three in sync.
        </p>
      )}

      <div style={{ marginTop: '16px' }}>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.65rem',
          color: 'var(--green-hi)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          Connect to Other Platforms, Such As
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            {
              name: 'Facebook',
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#1877F2"/>
                  <path fill="#fff" d="M15.5 12.5h-2v7h-3v-7H9V10h1.5V8.7c0-1.6.7-2.7 2.7-2.7h1.9v2.4h-1.2c-.6 0-.9.3-.9.9V10h2.1l-.3 2.5z"/>
                </svg>
              ),
            },
            {
              name: 'Instagram',
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0">
                      <stop offset="0" stopColor="#FED576"/>
                      <stop offset="0.35" stopColor="#F47133"/>
                      <stop offset="0.65" stopColor="#BC3081"/>
                      <stop offset="1" stopColor="#4F5BD5"/>
                    </linearGradient>
                  </defs>
                  <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
                  <rect x="6" y="6" width="12" height="12" rx="3.5" fill="none" stroke="#fff" strokeWidth="1.4"/>
                  <circle cx="12" cy="12" r="3" fill="none" stroke="#fff" strokeWidth="1.4"/>
                  <circle cx="16" cy="8" r="0.9" fill="#fff"/>
                </svg>
              ),
            },
            {
              name: 'LinkedIn',
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="#0A66C2"/>
                  <path fill="#fff" d="M7.3 9.6h2.4V17H7.3V9.6zM8.5 8.4c-.8 0-1.3-.5-1.3-1.2S7.7 6 8.5 6s1.3.5 1.3 1.2-.5 1.2-1.3 1.2zM11.3 9.6h2.3v1h.03c.32-.6 1.1-1.2 2.27-1.2 2.43 0 2.87 1.5 2.87 3.5V17h-2.4v-3.7c0-.9 0-2-1.24-2s-1.43.95-1.43 1.94V17h-2.4V9.6z"/>
                </svg>
              ),
            },
            {
              name: 'Clutch',
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="#EF5A28"/>
                  <path fill="#fff" d="M12 6a6 6 0 100 12 6 6 0 000-12zm0 2.2a3.8 3.8 0 110 7.6 3.8 3.8 0 010-7.6z"/>
                </svg>
              ),
            },
          ].map(({ name, icon }) => (
            <div key={name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.78rem',
              color: 'var(--slate)',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '6px 14px 6px 8px',
            }}>
              {icon}
              {name}
            </div>
          ))}
        </div>
      </div>
      {platformNote}
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

// Raw CSS, injected via dangerouslySetInnerHTML rather than as a JSX text
// child. <style> content is HTML "raw text" -- browsers never decode entities
// inside it -- but React's normal text-child serialization HTML-escapes
// quotes/apostrophes (e.g. 'DM Sans' -> &#x27;DM Sans&#x27;), which broke
// prerendered CSS and caused an SSR/client hydration mismatch wherever this
// component renders.
const reviewFunnelsPageStyles = `
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
`;

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
        title="Review Funnels — More Reviews, Less Friction"
        description="Improve your online reputation with PeaksLocal's review funnel: one branded link to grow your Google reviews, with Yelp, Apple Maps, and Bing profile management built in."
        canonical="/review-funnels"
        breadcrumbs={[{ name: 'Review Funnels', path: '/review-funnels' }]}
      />
      <style dangerouslySetInnerHTML={{ __html: reviewFunnelsPageStyles }} />

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
              marginBottom: '16px',
            }}>
              Every PeaksLocal client receives a free branded, custom review page:
            </p>
            <ul style={{
              listStyle: 'disc',
              paddingLeft: '20px',
              margin: '0 0 40px',
              maxWidth: '640px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              {[
                {
                  text: 'This single link safely directs customers to platforms where review requests are allowed.',
                },
                {
                  text: "Your page's platform options depend on your business type: physical location vs. service-area business (SAB).",
                  subItems: [
                    {
                      text: 'Yelp prohibits direct review requests entirely, so we handle profile management there instead.',
                      subItems: [
                        "Note that Apple and Bing Maps do not have their own reviews feature but use your business' Yelp profile for reviews.",
                      ],
                    },
                    "SABs also lose Apple and Bing Maps visibility since they don't have physical locations and they don't provide a Place Card needed to be displayed on their maps.",
                    <>For more details, see our <a href="#apple" style={{ color: 'var(--green-hi)' }}>Platform Notes</a> section below.</>,
                  ],
                },
                {
                  text: 'Also, we provide templates to help your customers write authentic feedback without the blank-page anxiety.',
                  subItems: [
                    <>For more details, see our <a href="#templates" style={{ color: 'var(--green-hi)' }}>Review Templates</a> section below.</>,
                  ],
                },
              ].map((item, i) => (
                <li key={i} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1rem',
                  color: 'var(--slate)',
                  lineHeight: 1.75,
                }}>
                  {item.text}
                  {item.subItems && (
                    <ul style={{
                      listStyle: 'circle',
                      paddingLeft: '20px',
                      margin: '10px 0 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      {item.subItems.map((sub, j) => {
                        const subText = typeof sub === 'object' && !React.isValidElement(sub) ? sub.text : sub;
                        const nested = typeof sub === 'object' && !React.isValidElement(sub) ? sub.subItems : null;
                        return (
                          <li key={j} style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.92rem',
                            color: 'rgba(138,160,184,0.85)',
                            lineHeight: 1.7,
                          }}>
                            {subText}
                            {nested && (
                              <ul style={{
                                listStyle: '"– "',
                                paddingLeft: '20px',
                                margin: '8px 0 0',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px',
                              }}>
                                {nested.map((n, k) => (
                                  <li key={k} style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: '0.88rem',
                                    color: 'rgba(138,160,184,0.7)',
                                    lineHeight: 1.65,
                                  }}>
                                    {n}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

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
                  body: "Every review page comes with a downloadable QR code pointing at it, ready for invoices, business cards, table tents, or anywhere a URL is awkward to type. It's also a link in email signatures, a button in follow-up messages, and a destination in print materials — one URL handles all of it.",
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
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              color: 'var(--slate)',
              marginTop: '28px',
            }}>
              This isn't hypothetical — <Link to="/reviews" style={{ color: 'var(--green-hi)', fontWeight: 600 }}>see PeaksLocal's own review page</Link>, QR code included, as a live example.
            </p>
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
                  Businesses with a verified physical location get a Place Card on Apple Maps, giving them a presence there, but Apple Maps has no written-review system of its own, it displays Yelp's reviews instead. Google is the only true direct request here; Apple Maps and Bing are informational, and Yelp is handled through profile management rather than a direct ask (see Platform Notes below).
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
                  Service-area businesses operate without a public address and don't qualify for an Apple Maps Place Card, and Bing runs into the same problem since it imports its listing data from your Google Business Profile. Google is the only platform available here for a direct request; Yelp is handled through profile management rather than a direct ask (see Platform Notes below).
                </p>
                <AcmeDemo type="sab" />
              </div>
            )}
          </div>
        </section>

        {/* Platform Notes section */}
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
              marginBottom: '40px',
            }}>
              Platform Notes
            </h2>

            {/* Yelp: universal, applies to every client */}
            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '1.3rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              letterSpacing: '0.02em',
              marginBottom: '8px',
            }}>
              Yelp: Managed, Not Solicited
            </h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              color: 'rgba(138,160,184,0.6)',
              fontStyle: 'italic',
              marginBottom: '16px',
            }}>
              Applies to every client, physical location or service area.
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '48px',
            }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  "Yelp prohibits asking anyone for a review, direct or indirect. Doing so risks your reviews being excluded from their algorithm, or a public Consumer Alert on your own listing.",
                  "That's why Yelp is never a button in a PeaksLocal review funnel, for a physical location or a service-area business.",
                  "Instead, we keep your Yelp profile complete and accurate and respond to what comes in naturally. Yelp is also a primary review source for Apple Maps and Bing, so a well-maintained Yelp profile helps there too.",
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--slate)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--green-hi)', flexShrink: 0, marginTop: '2px' }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Apple + Bing: SAB-specific technical gap */}
            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '1.3rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              letterSpacing: '0.02em',
              marginBottom: '8px',
            }}>
              Service-Area Businesses: The Apple + Bing Gap
            </h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              color: 'rgba(138,160,184,0.6)',
              fontStyle: 'italic',
              marginBottom: '24px',
            }}>
              Only relevant if you're a service-area business, physical-location clients aren't affected.
            </p>

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
                  Apple Maps
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    "Apple Maps has no written-review system of its own, for any business. It displays Yelp's reviews instead, and offers a thumbs-up/thumbs-down that's currently private to the person who gave it in the US.",
                    'A Place Card is what determines whether you show up on Apple Maps at all, not whether you get your own reviews there.',
                    'Place Cards require a verified physical address.',
                    "SABs (home-based, mobile, remote) don't qualify, so they don't appear on Apple Maps at all, not even with Yelp's reviews surfaced.",
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--slate)', lineHeight: 1.5 }}>
                      <span style={{ color: 'rgba(255,120,110,0.8)', flexShrink: 0, marginTop: '1px' }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

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
                  Bing
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    "Bing has no written-review system of its own either, for any business, it also just displays Yelp's (and other third parties') reviews.",
                    'Bing imports its listing data from your Google Business Profile rather than offering independent address controls',
                    "Since an SAB has no public address in GBP, Bing doesn't create a proper map location for it either",
                    'No map location means no reviews surfaced there at all, the same practical result as Apple, for a different reason',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--slate)', lineHeight: 1.5 }}>
                      <span style={{ color: 'rgba(255,120,110,0.8)', flexShrink: 0, marginTop: '1px' }}>·</span>
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
              Note: these are starting points, not templates to copy verbatim. If a lot of reviews sound too similar, review platforms can flag that pattern as inauthentic, even when every review is genuine. Encourage clients to make it their own. Curious how platforms actually evaluate reviews? <Link to="/blog/google-review-policy-confirmed-vs-speculated" style={{ color: 'rgba(138,160,184,0.85)', textDecoration: 'underline' }}>Read what's confirmed, and what's just rumor.</Link>
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
              margin: '0 auto 16px',
            }}>
              Every PeaksLocal client receives a free branded review funnel built for your business type and the appropriate platform(s) with a link you can use anywhere.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              maxWidth: '520px',
              margin: '0 auto 32px',
            }}>
              · Start with a free Visibility Score to see where you stand, your review funnel comes standard once you're a client.
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
