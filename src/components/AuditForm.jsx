import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../lib/analytics.js';

const initialForm = {
  name: '',
  email: '',
  businessName: '',
  websiteURL: '',
  cityState: '',
  address: '',
  businessPhone: '',
  customerAccess: 'storefront',
  locations: 'one',
  industry: '',
  searchTerm: '',
  competitors: '',
  profiles: [],
  otherProfiles: '',
  challenge: '',
  fax: '', // honeypot: real users never see or fill this in
};

const customerAccessOptions = [
  { value: 'storefront', label: 'Storefront', hint: 'Customers visit you' },
  { value: 'service_area', label: 'Service area', hint: 'You travel to them' },
  { value: 'both', label: 'Both', hint: 'Shop and on-site' },
];

const locationOptions = [
  { value: 'one', label: 'One location' },
  { value: 'multiple', label: 'More than one' },
];

const profileOptions = [
  { value: 'google', label: 'Google Business Profile' },
  { value: 'apple', label: 'Apple Business Connect' },
  { value: 'bing', label: 'Bing Places' },
  { value: 'not_sure', label: 'Not sure' },
];

// Raw CSS, injected via dangerouslySetInnerHTML rather than as a JSX text
// child. <style> content is HTML "raw text" -- browsers never decode entities
// inside it -- but React's normal text-child serialization HTML-escapes
// quotes/apostrophes (e.g. 'DM Sans' -> &#x27;DM Sans&#x27;), which broke
// prerendered CSS and caused an SSR/client hydration mismatch wherever this
// component renders.
const auditFormStyles = `
        .audit-form-card {
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 16px;
          padding: 40px 40px;
          box-shadow: 0 8px 40px rgba(15,36,64,0.1);
          max-width: 640px;
          margin: 0 auto;
        }
        .audit-input {
          padding: 12px 16px;
          border: 1.5px solid var(--rule);
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          background: var(--white);
          width: 100%;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .audit-input:focus {
          border-color: var(--green-hi);
          box-shadow: 0 0 0 3px rgba(58,173,100,0.12);
        }
        .audit-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 6px;
          display: block;
        }
        .audit-label .required-asterisk {
          color: #c62828;
          font-weight: 700;
          margin-left: 2px;
        }
        .audit-optional {
          font-weight: 400;
          font-size: 0.78rem;
          color: var(--slate);
          margin-left: 6px;
        }
        .audit-hint {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: var(--mid);
          margin-top: 6px;
          line-height: 1.5;
        }
        .audit-group-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--slate);
          border-top: 1px solid var(--rule);
          padding-top: 18px;
          margin: 0;
        }
        .audit-fieldset {
          border: none;
          padding: 0;
          margin: 0;
          min-width: 0;
        }
        .audit-choice-grid {
          display: grid;
          gap: 8px;
        }
        .audit-choice-grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .audit-choice-grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .audit-choice {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          border: 1.5px solid var(--rule);
          border-radius: 6px;
          padding: 10px 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: var(--ink);
          background: var(--white);
          cursor: pointer;
        }
        .audit-choice input { margin-top: 3px; }
        .audit-choice:focus-within {
          border-color: var(--green-hi);
          box-shadow: 0 0 0 3px rgba(58,173,100,0.12);
        }
        .audit-choice-hint {
          display: block;
          font-size: 0.78rem;
          color: var(--mid);
        }
        .audit-checks {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 18px;
        }
        .audit-check {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: var(--ink);
          cursor: pointer;
        }
        .audit-two-col {
          display: grid;
          grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
          gap: 8px;
        }
        .audit-error {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: #c62828;
          margin: 0;
        }
        @media (max-width: 560px) {
          .audit-form-card { padding: 28px 20px !important; }
          .audit-choice-grid.three { grid-template-columns: minmax(0, 1fr); }
          .audit-two-col { grid-template-columns: minmax(0, 1fr); }
        }
`;

export default function AuditForm({ headingLevel = 'h2', showWhatHappensNext = false }) {
  const MainHeading = headingLevel;
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleProfile = (value) => {
    setForm((prev) => ({
      ...prev,
      profiles: prev.profiles.includes(value)
        ? prev.profiles.filter((p) => p !== value)
        : [...prev.profiles, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, businessName, websiteURL, cityState } = form;
    if (!name.trim() || !email.trim() || !businessName.trim() || !websiteURL.trim() || !cityState.trim()) {
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sourcePage: window.location.pathname }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(res.status === 400 && data.error ? data.error : 'Failed');
      }
      trackEvent('audit_request_submit', { customer_access: form.customerAccess, locations: form.locations });
      setSubmitted(true);
    } catch (err) {
      setError(err.message && err.message !== 'Failed' ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: auditFormStyles }} />
      <section
        id="audit"
        ref={sectionRef}
        style={{ background: 'var(--ash)', padding: '100px 0' }}
      >
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div
              className="section-eyebrow reveal"
              style={{
                color: 'var(--green)',
                justifyContent: 'center',
              }}
            >
              FREE VISIBILITY AUDIT REQUEST
            </div>
            <MainHeading
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '2.8rem',
                textTransform: 'uppercase',
                color: 'var(--navy)',
                lineHeight: 1.05,
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              Check Your Current Visibility
            </MainHeading>
            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                color: 'var(--mid)',
                lineHeight: 1.7,
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              See how your business currently shows up across Google, Maps, and AI platforms. We work with small, local businesses across Denver, the Front Range, and anywhere in the US ready to take their digital identity seriously.
            </p>
            <p className="reveal reveal-delay-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.82rem', letterSpacing: '0.1em', color: '#1a3a5c', marginTop: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
  No Obligation. No Sales Pressure.
</p>
            <p className="reveal reveal-delay-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--mid)', marginTop: '10px' }}>
              Your report, including a map of where customers can find you, arrives by email within one business day.
            </p>
          </div>

          {showWhatHappensNext && (
            <div className="reveal reveal-delay-2" style={{ maxWidth: '600px', margin: '0 auto 48px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                color: 'var(--green)',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: '4px',
              }}>
                What Happens After You Submit
              </div>
              {[
                {
                  title: 'We review it, within one business day.',
                  body: 'Greg personally checks your current presence across Google, Apple Maps, Bing, and AI search.',
                },
                {
                  title: 'You get your Visibility Score.',
                  body: "A personalized report showing exactly where you're strong, where you have gaps, a map of where customers can find you, and what to fix first.",
                },
                {
                  title: 'We walk you through it.',
                  body: 'A quick call or email to go over your results together. No contracts to sign, no sales pitch.',
                },
              ].map((item, i) => (
                <div key={item.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{
                    flexShrink: 0,
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(58,173,100,0.12)',
                    border: '1.5px solid var(--green-hi)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: 'var(--green)',
                  }}>
                    {i + 1}
                  </span>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.92rem', color: 'var(--ink)', marginBottom: '2px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--mid)', lineHeight: 1.6 }}>
                      {item.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Form card */}
          <div className="audit-form-card reveal reveal-delay-2">
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Honeypot: hidden from real users, bots that auto-fill every field will populate it */}
                <input
                  type="text"
                  name="fax"
                  value={form.fax}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />
                <div>
                  <label className="audit-label" htmlFor="name">
                    Your Name
                    <span className="required-asterisk" aria-hidden="true">*</span>
                  </label>
                  <input
                    className="audit-input"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Smith"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="audit-label" htmlFor="email">
                    Email
                    <span className="required-asterisk" aria-hidden="true">*</span>
                  </label>
                  <input
                    className="audit-input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@acmeplumbing.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <p className="audit-hint">
                    Where we send your report. We never share it. See our <Link to="/privacy" style={{ color: 'var(--green)' }}>privacy policy</Link>.
                  </p>
                </div>

                <div>
                  <label className="audit-label" htmlFor="businessName">
                    Business Name
                    <span className="required-asterisk" aria-hidden="true">*</span>
                  </label>
                  <input
                    className="audit-input"
                    id="businessName"
                    name="businessName"
                    type="text"
                    placeholder="Acme Plumbing Co."
                    autoComplete="organization"
                    value={form.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="audit-label" htmlFor="websiteURL">
                    Business Website
                    <span className="required-asterisk" aria-hidden="true">*</span>
                  </label>
                  <input
                    className="audit-input"
                    id="websiteURL"
                    name="websiteURL"
                    type="text"
                    inputMode="url"
                    placeholder="acmeplumbing.com"
                    autoComplete="url"
                    autoCapitalize="none"
                    value={form.websiteURL}
                    onChange={handleChange}
                    required
                  />
                  <p className="audit-hint">Use your main site, not a Facebook page. We add https:// for you.</p>
                </div>

                <div>
                  <label className="audit-label" htmlFor="cityState">
                    City &amp; State
                    <span className="required-asterisk" aria-hidden="true">*</span>
                  </label>
                  <input
                    className="audit-input"
                    id="cityState"
                    name="cityState"
                    type="text"
                    placeholder="Denver, CO"
                    autoComplete="address-level2"
                    value={form.cityState}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="audit-label" htmlFor="address">
                    Street Address and Business Phone
                    <span className="audit-optional">optional</span>
                  </label>
                  <div className="audit-two-col">
                    <input
                      className="audit-input"
                      id="address"
                      name="address"
                      type="text"
                      placeholder="1234 Main St, Denver, CO 80202"
                      autoComplete="street-address"
                      aria-label="Street address"
                      value={form.address}
                      onChange={handleChange}
                    />
                    <input
                      className="audit-input"
                      id="businessPhone"
                      name="businessPhone"
                      type="tel"
                      placeholder="(720) 555-0142"
                      autoComplete="tel"
                      aria-label="Business phone"
                      value={form.businessPhone}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="audit-hint">Helps us check that your listings match what you'd like customers to see.</p>
                </div>

                <fieldset className="audit-fieldset">
                  <legend className="audit-label">
                    How do customers find you?
                    <span className="required-asterisk" aria-hidden="true">*</span>
                  </legend>
                  <div className="audit-choice-grid three">
                    {customerAccessOptions.map((opt) => (
                      <label key={opt.value} className="audit-choice">
                        <input
                          type="radio"
                          name="customerAccess"
                          value={opt.value}
                          checked={form.customerAccess === opt.value}
                          onChange={handleChange}
                        />
                        <span>
                          {opt.label}
                          <span className="audit-choice-hint">{opt.hint}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="audit-fieldset">
                  <legend className="audit-label">
                    Locations
                    <span className="required-asterisk" aria-hidden="true">*</span>
                  </legend>
                  <div className="audit-choice-grid two">
                    {locationOptions.map((opt) => (
                      <label key={opt.value} className="audit-choice">
                        <input
                          type="radio"
                          name="locations"
                          value={opt.value}
                          checked={form.locations === opt.value}
                          onChange={handleChange}
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <p className="audit-group-label">Helps us build your map</p>

                <div>
                  <label className="audit-label" htmlFor="industry">
                    What do you do?
                    <span className="audit-optional">optional</span>
                  </label>
                  <input
                    className="audit-input"
                    id="industry"
                    name="industry"
                    type="text"
                    placeholder="Plumbing, martial arts school, accounting"
                    value={form.industry}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="audit-label" htmlFor="searchTerm">
                    What would a customer search for to find you?
                    <span className="audit-optional">optional</span>
                  </label>
                  <input
                    className="audit-input"
                    id="searchTerm"
                    name="searchTerm"
                    type="text"
                    placeholder="plumber in Denver"
                    value={form.searchTerm}
                    onChange={handleChange}
                  />
                  <p className="audit-hint">We use this to show where you appear on the map. Not sure? Leave it blank and we'll choose.</p>
                </div>

                <div>
                  <label className="audit-label" htmlFor="competitors">
                    Competitors you keep an eye on
                    <span className="audit-optional">optional</span>
                  </label>
                  <input
                    className="audit-input"
                    id="competitors"
                    name="competitors"
                    type="text"
                    placeholder="Business names or websites"
                    value={form.competitors}
                    onChange={handleChange}
                  />
                  <p className="audit-hint">We'll keep them in mind when we follow up.</p>
                </div>

                <p className="audit-group-label">What you've already set up</p>

                <fieldset className="audit-fieldset">
                  <legend className="audit-label">
                    Profiles you've already set up
                    <span className="audit-optional">optional</span>
                  </legend>
                  <div className="audit-checks">
                    {profileOptions.map((opt) => (
                      <label key={opt.value} className="audit-check">
                        <input
                          type="checkbox"
                          checked={form.profiles.includes(opt.value)}
                          onChange={() => toggleProfile(opt.value)}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label className="audit-label" htmlFor="otherProfiles">
                    Other profiles or directories
                    <span className="audit-optional">optional</span>
                  </label>
                  <input
                    className="audit-input"
                    id="otherProfiles"
                    name="otherProfiles"
                    type="text"
                    placeholder="Yelp, Facebook, Houzz, or a profile link"
                    value={form.otherProfiles}
                    onChange={handleChange}
                  />
                  <p className="audit-hint">Anything else you'd like us to look at.</p>
                </div>

                <div>
                  <label className="audit-label" htmlFor="challenge">
                    Biggest Visibility Challenge
                    <span className="audit-optional">optional</span>
                  </label>
                  <textarea
                    className="audit-input"
                    id="challenge"
                    name="challenge"
                    placeholder="What’s holding your online visibility back?"
                    rows={4}
                    value={form.challenge}
                    onChange={handleChange}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {error && <p className="audit-error" role="alert">{error}</p>}

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    padding: '15px',
                    opacity: loading ? 0.75 : 1,
                  }}
                  disabled={loading}
                >
                  {loading ? 'Submitting…' : 'Get My Free Visibility Score'}
                </button>

                {/* Trust line */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}>
                  {['Free audit', 'No contracts', 'Prompt Response'].map((t) => (
                    <span key={t} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.78rem',
                      color: 'var(--slate)',
                    }}>
                      <span style={{ color: 'var(--green-hi)' }}>✓</span>
                      {t}
                    </span>
                  ))}
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(58,173,100,0.12)',
                  border: '2px solid var(--green-hi)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '1.5rem',
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.8rem',
                  textTransform: 'uppercase',
                  color: 'var(--navy)',
                  marginBottom: '12px',
                }}>
                  We'll Be in Touch Soon
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.95rem',
                  color: 'var(--mid)',
                  lineHeight: 1.7,
                  maxWidth: '380px',
                  margin: '0 auto 24px',
                }}>
                  Your request has been received and a confirmation is on its way to your email. You'll hear from a PeaksLocal rep within one business day with your Visibility Score.
                </p>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--green)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => { setSubmitted(false); setForm(initialForm); }}
                >
                  Submit another request
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
