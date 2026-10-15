import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../lib/analytics.js';

// Visibility Deep-Dive add-on. Shown on the homepage Services section and on
// /services. Pricing is shared on request (no price on the page by design).
// The CTA opens /contact with the Deep-Dive inquiry type preselected.

const points = [
  "A Google Maps ranking report for the search terms and areas that matter most, shown as local visibility maps of where customers can and can't find you",
  'A local competitor analysis: how the top businesses in your market show up next to you',
  "Review sentiment analysis of your reviews and your competitors', so you know what customers praise and where the gaps are",
  'A walkthrough of the findings with a prioritized plan',
];

const flow = ['1 Free audit', '2 Deep-Dive (optional)', '3 Build or ongoing management'];

// Raw CSS, injected via dangerouslySetInnerHTML (see the note in Services.jsx
// about prerendering and HTML-escaped quotes).
const styles = `
        .deep-dive {
          margin: 28px auto 0;
          max-width: 720px;
          background: rgba(58,173,100,0.06);
          border: 1px solid rgba(58,173,100,0.25);
          border-radius: 12px;
          padding: 30px 36px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .deep-dive-check {
          color: var(--green-hi);
          font-size: 0.9rem;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .deep-dive-flow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px 10px;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.04em;
          color: var(--mid);
          border-top: 1px solid rgba(58,173,100,0.3);
          padding-top: 14px;
        }
        @media (max-width: 840px) {
          .deep-dive { padding: 24px 20px; }
        }
`;

export default function DeepDivePanel() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div id="deep-dive" className="deep-dive reveal reveal-delay-2">
        <span
          style={{
            alignSelf: 'flex-start',
            background: 'var(--navy)',
            color: 'var(--white)',
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '3px',
          }}
        >
          ADD-ON · CREDITED TOWARD YOUR PROJECT
        </span>
        <h3
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: '1.6rem',
            textTransform: 'uppercase',
            color: 'var(--navy)',
            letterSpacing: '0.03em',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Visibility Deep-Dive
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.65, margin: 0 }}>
          Your free audit gives you a Visibility Score and shows where you stand. The Deep-Dive shows why, and how you compare with the businesses customers choose instead of you.
        </p>
        <div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--slate)',
              marginBottom: '10px',
            }}
          >
            What you get
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {points.map((point) => (
              <li key={point} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span className="deep-dive-check">✓</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.55 }}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.82rem',
            color: 'var(--green)',
            fontStyle: 'italic',
            lineHeight: 1.55,
            margin: 0,
            borderTop: '1px solid rgba(58,173,100,0.3)',
            paddingTop: '14px',
          }}
        >
          Credited toward a build or ongoing management engagement if you move forward.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 22px' }}>
          <Link
            to="/contact?interest=deep-dive"
            className="btn-primary"
            onClick={() => trackEvent('deep_dive_cta_click', { location: typeof window !== 'undefined' ? window.location.pathname : '' })}
          >
            Ask About a Deep-Dive →
          </Link>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'var(--mid)' }}>
            Pricing shared on request. No obligation.
          </span>
        </div>
        <div className="deep-dive-flow">
          {flow.map((step, i) => (
            <React.Fragment key={step}>
              {i > 0 && <span style={{ color: 'var(--slate)' }}>→</span>}
              <span style={{ color: 'var(--navy)' }}>{step}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
