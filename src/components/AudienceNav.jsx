import React, { useState } from 'react';
import { trackEvent } from '../lib/analytics.js';

const FAMILIARITY_OPTIONS = [
  { value: 'know', label: 'I know what I need', target: 'services', stop: { title: 'Services', note: 'You know what you need' } },
  { value: 'new', label: 'New to local SEO', target: 'problem', stop: { title: 'The Visibility Problem', note: 'A plain-language start' } },
  { value: 'diy', label: 'Tried DIY or an agency', target: 'system', stop: { title: 'The PeaksLocal System', note: 'How this differs from a past attempt' } },
  { value: 'not_sure', label: 'Not sure', target: 'problem', isOther: true, stop: { title: 'The Visibility Problem', note: 'A plain-language start' } },
];

const BUSINESS_SETUP_OPTIONS = [
  { value: 'single', label: 'Single location', target: 'who', highlightId: 'who-single', stop: { title: 'Who PeaksLocal Helps', note: 'Single-location card, highlighted' } },
  { value: 'sab', label: 'Service area', target: 'who', highlightId: 'who-sab', stop: { title: 'Who PeaksLocal Helps', note: 'Service-area card, highlighted' } },
  { value: 'multi', label: 'Multi-location', target: 'who', highlightId: 'who-multi', stop: { title: 'Who PeaksLocal Helps', note: 'Multi-location card, highlighted' } },
  { value: 'not_sure', label: 'Not sure', target: 'who', isOther: true, stop: { title: 'Who PeaksLocal Helps', note: 'All three business shapes' } },
];

const SEO_STATUS_OPTIONS = [
  { value: 'none', label: 'Nothing set up', target: 'audit', stop: { title: 'Free Visibility Audit', note: 'Nothing is set up yet' } },
  { value: 'inconsistent', label: 'Inconsistent', target: 'audit', stop: { title: 'Free Visibility Audit', note: 'Details do not match everywhere' } },
  { value: 'managed', label: 'Managed, not working', target: 'audit', stop: { title: 'Free Visibility Audit', note: 'Managed, but not producing results' } },
  { value: 'not_sure', label: 'Not sure', target: 'audit', isOther: true, stop: { title: 'Free Visibility Audit', note: 'Start with a free audit' } },
];

const PARTNERSHIP_OPTIONS = [
  { value: 'referral', label: 'Warm referral', target: 'partners', stop: { title: 'Work With PeaksLocal', note: 'How warm referrals work' } },
  { value: 'white_label', label: 'White-label support', target: 'partners', stop: { title: 'Work With PeaksLocal', note: 'How white-label support works' } },
  { value: 'handoff', label: 'Project handoff', target: 'partners', stop: { title: 'Work With PeaksLocal', note: 'How project handoffs work' } },
  { value: 'not_sure', label: 'Not sure', target: 'partners', isOther: true, stop: { title: 'Work With PeaksLocal', note: 'The ways we partner' } },
];

const OWNER_QUESTIONS = [
  { axis: 'familiarity', num: '01', label: 'Local SEO Familiarity', options: FAMILIARITY_OPTIONS },
  { axis: 'business_setup', num: '02', label: 'Your Current Business Setup/Structure', options: BUSINESS_SETUP_OPTIONS },
  { axis: 'seo_status', num: '03', label: 'Current Status of your Local SEO Setup', options: SEO_STATUS_OPTIONS },
];

const PARTNER_QUESTIONS = [
  { axis: 'partnership_type', num: null, label: 'Partnership Type', options: PARTNERSHIP_OPTIONS },
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
          max-width: 520px;
          text-align: center;
        }
        .ep-eyebrow-copy .section-eyebrow {
          justify-content: center;
        }
        .ep-actions-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 16px;
        }
        .ep-start-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--green-hi);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.15s ease;
        }
        .ep-start-btn:hover { color: var(--white); }
        .ep-start-btn .arrow {
          font-size: 1.35em;
          line-height: 1;
        }
        .ep-start-btn::after {
          content: '';
          position: absolute;
          inset: -8px -12px;
          border-radius: 10px;
          border: 1.5px solid var(--green-hi);
          opacity: 0;
          animation: startHerePulse 1.8s ease-out 3;
          pointer-events: none;
        }
        @keyframes startHerePulse {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(1.3); opacity: 0; }
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
        .ep-slot {
          margin: 14px auto 0;
          max-width: 440px;
          min-height: 92px;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }
        .ep-slot-card {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px 14px;
          text-align: left;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          padding: 12px 16px;
        }
        .ep-slot-card.is-empty {
          justify-content: center;
          border-style: dashed;
          border-color: rgba(255,255,255,0.12);
          background: transparent;
        }
        .ep-slot-empty { font-family: 'DM Sans', sans-serif; font-size: 0.8rem; color: rgba(138,160,184,0.75); }
        .ep-slot-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .ep-slot-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--slate);
        }
        .ep-slot-title { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 600; color: var(--white); }
        .ep-slot-note { font-family: 'DM Sans', sans-serif; font-size: 0.78rem; color: var(--slate); }
        .ep-slot-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; margin-left: auto; }
        .ep-go-link {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--green-hi);
          background: none;
          border: none;
          padding: 6px 0;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.15s ease;
        }
        .ep-go-link:hover { color: var(--white); }
        .ep-next-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.74rem;
          color: rgba(138,160,184,0.9);
          background: none;
          border: none;
          padding: 3px 0;
          cursor: pointer;
          transition: color 0.15s ease;
        }
        .ep-next-link:hover { color: var(--white); }
        .ep-go-link:focus-visible, .ep-next-link:focus-visible, .ep-chip:focus-visible {
          outline: 2px solid var(--green-hi);
          outline-offset: 3px;
        }
        @media (max-width: 520px) {
          .ep-slot-actions { align-items: flex-start; margin-left: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ep-body, .ep-chevron { transition: none !important; }
          .ep-start-btn::after { animation: none; }
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
        const isActive = selected === opt.value;
        if (isActive) classes.push('is-active');
        return (
          <button
            key={opt.value}
            type="button"
            className={classes.join(' ')}
            aria-pressed={isActive}
            onClick={() => onSelect(axis, opt)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function DestinationCard({ question, nextQuestion, selected, onGo, onNext }) {
  const opt = question.options.find((o) => o.value === selected);
  return (
    <div className="ep-slot" aria-live="polite">
      {opt ? (
        <div className="ep-slot-card">
          <div className="ep-slot-text">
            <span className="ep-slot-label">Takes you to</span>
            <span className="ep-slot-title">{opt.stop.title}</span>
            <span className="ep-slot-note">{opt.stop.note}</span>
          </div>
          <div className="ep-slot-actions">
            <button type="button" className="ep-go-link" onClick={() => onGo(question, opt)}>
              Take me there &rarr;
            </button>
            {nextQuestion && (
              <button type="button" className="ep-next-link" onClick={() => onNext(question, nextQuestion)}>
                Or answer question {nextQuestion.num} &darr;
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="ep-slot-card is-empty">
          <span className="ep-slot-empty">Pick one to see where it leads</span>
        </div>
      )}
    </div>
  );
}

export default function AudienceNav() {
  const [open, setOpen] = useState(true);
  const [relationship, setRelationship] = useState('owner');
  const [selections, setSelections] = useState({});

  const handleSelect = (axis, opt) => {
    const isSame = selections[axis] === opt.value;
    setSelections((prev) => ({ ...prev, [axis]: isSame ? null : opt.value }));
    if (!isSame) trackEvent('entry_point_select', { axis, value: opt.value });
  };

  const handleGo = (question, opt) => {
    const list = relationship === 'owner' ? OWNER_QUESTIONS : PARTNER_QUESTIONS;
    const answeredCount = list.filter((q) => selections[q.axis]).length;
    trackEvent('entry_point_go', { axis: question.axis, value: opt.value, answered_count: answeredCount });
    scrollToId(opt.target);
    if (opt.highlightId) flashHighlight(opt.highlightId);
  };

  const handleNext = (fromQuestion, nextQuestion) => {
    trackEvent('entry_point_next', { axis: fromQuestion.axis });
    const cluster = document.getElementById(`ep-q-${nextQuestion.axis}`);
    if (!cluster) return;
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    cluster.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'center' });
    const firstChip = cluster.querySelector('.ep-chip');
    if (firstChip) firstChip.focus({ preventScroll: true });
  };

  const renderQuestions = (list) =>
    list.map((q, i) => (
      <div key={q.axis} id={`ep-q-${q.axis}`} className={`ep-rank-cluster ep-rank-${i + 1}`}>
        <p className="ep-rank-label">
          {q.num && <span className="ep-rank-num">{q.num}</span>} {q.label}
        </p>
        <ChipGroup axis={q.axis} options={q.options} selected={selections[q.axis]} onSelect={handleSelect} />
        <DestinationCard
          question={q}
          nextQuestion={list[i + 1]}
          selected={selections[q.axis]}
          onGo={handleGo}
          onNext={handleNext}
        />
      </div>
    ));

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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <p className="ep-eyebrow-copy">
              <span className="section-eyebrow">Find My Path</span>
              Please tell us about your business so we can route you faster to your solution or relevant content:
            </p>
            <div className="ep-actions-buttons">
              <button
                type="button"
                className="ep-start-btn"
                onClick={handleStartHere}
                aria-expanded={open}
                aria-controls="audience-nav-body"
              >
                Start Here <span className="arrow">&darr;</span>
              </button>
            </div>
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
                <div className="ep-rank-stack">{renderQuestions(OWNER_QUESTIONS)}</div>
              </div>
            ) : (
              <div className="ep-view">
                <p className="ep-view-intro">
                  Local digital identity falls outside your core offering. We handle it so you stay
                  focused, and your client gets a dedicated expert.
                </p>
                <div className="ep-rank-stack">{renderQuestions(PARTNER_QUESTIONS)}</div>
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
