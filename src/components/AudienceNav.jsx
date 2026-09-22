import React, { useState } from 'react';
import { trackEvent } from '../lib/analytics.js';

const FAMILIARITY_OPTIONS = [
  { value: 'know', label: 'I know what I need', target: 'services' },
  { value: 'new', label: 'New to local SEO', target: 'problem' },
  { value: 'diy', label: 'Tried DIY or an agency', target: 'system' },
  { value: 'not_sure', label: 'Not sure', target: 'problem', isOther: true },
];

const BUSINESS_SETUP_OPTIONS = [
  { value: 'single', label: 'Single location', target: 'who', highlightId: 'who-single' },
  { value: 'sab', label: 'Service area', target: 'who', highlightId: 'who-sab' },
  { value: 'multi', label: 'Multi-location', target: 'who', highlightId: 'who-multi' },
  { value: 'not_sure', label: 'Not sure', target: 'who', isOther: true },
];

const SEO_STATUS_OPTIONS = [
  { value: 'none', label: 'Nothing set up', target: 'audit' },
  { value: 'inconsistent', label: 'Inconsistent', target: 'audit' },
  { value: 'managed', label: 'Managed, not working', target: 'audit' },
  { value: 'not_sure', label: 'Not sure', target: 'audit', isOther: true },
];

const PARTNERSHIP_OPTIONS = [
  { value: 'referral', label: 'Warm referral', target: 'partners' },
  { value: 'white_label', label: 'White-label support', target: 'partners' },
  { value: 'handoff', label: 'Project handoff', target: 'partners' },
  { value: 'not_sure', label: 'Not sure', target: 'partners', isOther: true },
];

// Raw CSS, injected via dangerouslySetInnerHTML rather than as a JSX text
// child. <style> content is HTML "raw text" -- browsers never decode entities
// inside it -- but React's normal text-child serialization HTML-escapes
// quotes/apostrophes (e.g. 'DM Sans' -> &#x27;DM Sans&#x27;), which broke
// prerendered CSS and caused an SSR/client hydration mismatch wherever this
// component renders.
const audienceNavStyles = `
        .ep-eyebrow-copy {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: var(--white);
          margin: 0;
          max-width: 640px;
        }
        .ep-actions-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 14px 0;
        }
        .ep-start-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--navy);
          background: var(--green-hi);
          border: none;
          border-radius: 6px;
          padding: 12px 18px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s ease;
        }
        .ep-start-btn:hover { background: #4fc178; }
        .ep-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.04);
          color: var(--slate);
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .ep-icon-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.28);
          color: var(--white);
        }
        .ep-chevron {
          display: inline-block;
          font-size: 0.95rem;
          transition: transform 0.25s ease;
        }
        .ep-rel-row { text-align: center; margin-bottom: 26px; }
        .ep-rel-toggle {
          display: inline-flex;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 30px;
          padding: 4px;
        }
        .ep-rel-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--slate);
          background: none;
          border: none;
          border-radius: 24px;
          padding: 9px 18px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .ep-rel-pill.is-active { background: var(--green-hi); color: var(--navy); }
        .ep-view { text-align: center; }
        .ep-view-intro {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: var(--slate);
          line-height: 1.6;
          margin: 0 auto 20px;
          max-width: 52ch;
        }
        .ep-rank-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }
        .ep-rank-cluster { text-align: center; }
        .ep-rank-label {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--white);
          margin: 0 0 14px;
          font-size: 1.15rem;
        }
        .ep-rank-num {
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          color: var(--green-hi);
          font-size: 1.05rem;
        }
        @media (max-width: 480px) {
          .ep-rank-label { flex-direction: column; gap: 2px; }
        }
        .ep-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
        .ep-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: var(--slate);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 20px;
          padding: 8px 15px;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
        }
        .ep-chip:hover, .ep-chip.is-active {
          border-color: rgba(58,173,100,0.55);
          background: rgba(58,173,100,0.12);
          color: var(--white);
        }
        .ep-chip-other { border-style: dashed; color: rgba(138,160,184,0.6); }
        .ep-bottom-row {
          text-align: center;
          margin-top: 28px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .ep-bottom-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--slate);
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 4px;
          transition: color 0.15s ease;
        }
        .ep-bottom-btn:hover { color: var(--white); }
        @media (prefers-reduced-motion: reduce) {
          .ep-body, .ep-chevron { transition: none !important; }
        }
`;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function flashHighlight(id) {
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('is-highlighted');
  window.setTimeout(() => el.classList.remove('is-highlighted'), 1600);
}

function ChipGroup({ axis, options, selected, onSelect }) {
  return (
    <div className="ep-chips">
      {options.map((opt) => {
        const classes = ['ep-chip'];
        if (opt.isOther) classes.push('ep-chip-other');
        if (selected === opt.value) classes.push('is-active');
        return (
          <button
            key={opt.value}
            type="button"
            className={classes.join(' ')}
            onClick={() => onSelect(axis, opt)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function AudienceNav() {
  const [open, setOpen] = useState(true);
  const [relationship, setRelationship] = useState('owner');
  const [familiarity, setFamiliarity] = useState(null);
  const [businessSetup, setBusinessSetup] = useState(null);
  const [seoStatus, setSeoStatus] = useState(null);
  const [partnershipType, setPartnershipType] = useState(null);

  const selectionSetters = {
    familiarity: setFamiliarity,
    business_setup: setBusinessSetup,
    seo_status: setSeoStatus,
    partnership_type: setPartnershipType,
  };

  const handleSelect = (axis, opt) => {
    selectionSetters[axis](opt.value);
    trackEvent('entry_point_select', { axis, value: opt.value });
    scrollToId(opt.target);
    if (opt.highlightId) flashHighlight(opt.highlightId);
  };

  const handleRelationship = (value) => {
    setRelationship(value);
    trackEvent('entry_point_relationship', { value });
  };

  const handleStartHere = () => {
    if (!open) {
      setOpen(true);
      trackEvent('entry_point_visibility', { open: true, source: 'start_here' });
    }
    scrollToId('audience-nav');
  };

  const handleToggleIcon = () => {
    const next = !open;
    setOpen(next);
    trackEvent('entry_point_visibility', { open: next, source: 'icon' });
  };

  const handleHideBottom = () => {
    setOpen(false);
    trackEvent('entry_point_visibility', { open: false, source: 'bottom' });
    scrollToId('audience-nav');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: audienceNavStyles }} />
      <section id="audience-nav" style={{ background: 'var(--navy)', padding: '56px 0 24px' }}>
        <div className="container">
          <div>
            <span className="section-eyebrow">Not sure where to start?</span>
            <div className="ep-actions-buttons">
              <button type="button" className="ep-start-btn" onClick={handleStartHere}>
                Start Here
              </button>
              <button
                type="button"
                className="ep-icon-btn"
                aria-expanded={open}
                aria-controls="audience-nav-body"
                aria-label="Collapse this section"
                onClick={handleToggleIcon}
              >
                <span
                  className="ep-chevron"
                  style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  &#8964;
                </span>
              </button>
            </div>
            <p className="ep-eyebrow-copy">
              Please tell us about your business and we&rsquo;ll highlight your relevant content:
            </p>
          </div>

          <div
            id="audience-nav-body"
            className="ep-body"
            style={{
              maxHeight: open ? '2400px' : '0',
              opacity: open ? 1 : 0,
              overflow: 'hidden',
              marginTop: open ? '30px' : '0',
              transition: 'max-height 0.35s ease, opacity 0.25s ease, margin-top 0.35s ease',
            }}
          >
            <div className="ep-rel-row">
              <div className="ep-rel-toggle">
                <button
                  type="button"
                  className={`ep-rel-pill${relationship === 'owner' ? ' is-active' : ''}`}
                  onClick={() => handleRelationship('owner')}
                >
                  Business Owner
                </button>
                <button
                  type="button"
                  className={`ep-rel-pill${relationship === 'partner' ? ' is-active' : ''}`}
                  onClick={() => handleRelationship('partner')}
                >
                  Agency / Referral Partner
                </button>
              </div>
            </div>

            {relationship === 'owner' ? (
              <div className="ep-view">
                <div className="ep-rank-stack">
                  <div className="ep-rank-cluster ep-rank-1">
                    <p className="ep-rank-label">
                      <span className="ep-rank-num">01</span> Local SEO Familiarity
                    </p>
                    <ChipGroup
                      axis="familiarity"
                      options={FAMILIARITY_OPTIONS}
                      selected={familiarity}
                      onSelect={handleSelect}
                    />
                  </div>
                  <div className="ep-rank-cluster ep-rank-2">
                    <p className="ep-rank-label">
                      <span className="ep-rank-num">02</span> Your Current Business Setup/Structure
                    </p>
                    <ChipGroup
                      axis="business_setup"
                      options={BUSINESS_SETUP_OPTIONS}
                      selected={businessSetup}
                      onSelect={handleSelect}
                    />
                  </div>
                  <div className="ep-rank-cluster ep-rank-3">
                    <p className="ep-rank-label">
                      <span className="ep-rank-num">03</span> Current Status of your Local SEO Setup
                    </p>
                    <ChipGroup
                      axis="seo_status"
                      options={SEO_STATUS_OPTIONS}
                      selected={seoStatus}
                      onSelect={handleSelect}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="ep-view">
                <p className="ep-view-intro">
                  Local digital identity falls outside your core offering. We handle it so you stay
                  focused, and your client gets a dedicated expert.
                </p>
                <div className="ep-rank-stack">
                  <div className="ep-rank-cluster ep-rank-1">
                    <p className="ep-rank-label">Partnership Type</p>
                    <ChipGroup
                      axis="partnership_type"
                      options={PARTNERSHIP_OPTIONS}
                      selected={partnershipType}
                      onSelect={handleSelect}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="ep-bottom-row">
              <button type="button" className="ep-bottom-btn" onClick={handleHideBottom}>
                <span className="ep-chevron" style={{ transform: 'rotate(180deg)' }}>
                  &#8964;
                </span>
                Hide This Section
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
