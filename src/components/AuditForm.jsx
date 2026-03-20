import React, { useState, useEffect, useRef } from 'react';

const initialForm = {
  name: '',
  business: '',
  email: '',
  website: '',
  challenge: '',
};

export default function AuditForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Audit form submission:', form);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <>
      <style>{`
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
        .audit-label .optional {
          color: var(--slate);
          font-weight: 400;
          font-size: 0.78rem;
          margin-left: 4px;
        }
        @media (max-width: 560px) {
          .audit-form-card { padding: 28px 20px !important; }
          .audit-name-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
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
              FREE VISIBILITY AUDIT
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
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              Find Out Where You're Invisible.
            </h2>
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
              We'll show you exactly where your business stands across Google, Maps, and AI platforms — and what it would take to improve. No obligation, no jargon.
            </p>
          </div>

          {/* Form card */}
          <div className="audit-form-card reveal reveal-delay-2">
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="audit-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="audit-label" htmlFor="name">Your name</label>
                    <input
                      className="audit-input"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="audit-label" htmlFor="business">Business name</label>
                    <input
                      className="audit-input"
                      id="business"
                      name="business"
                      type="text"
                      placeholder="Acme Plumbing Co."
                      value={form.business}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="audit-label" htmlFor="email">Email address</label>
                  <input
                    className="audit-input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@acmeplumbing.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="audit-label" htmlFor="website">Business website or location</label>
                  <input
                    className="audit-input"
                    id="website"
                    name="website"
                    type="text"
                    placeholder="acmeplumbing.com or Denver, CO"
                    value={form.website}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="audit-label" htmlFor="challenge">
                    Biggest challenge
                    <span className="optional">(optional)</span>
                  </label>
                  <textarea
                    className="audit-input"
                    id="challenge"
                    name="challenge"
                    placeholder="What's your biggest challenge with local visibility right now?"
                    rows={4}
                    value={form.challenge}
                    onChange={handleChange}
                    style={{ resize: 'vertical' }}
                  />
                </div>

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
                  {['Free audit', 'No contracts', 'Response within 24 hours'].map((t) => (
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
                  Your request has been received. We'll have your Local Visibility Score ready within 24 hours.
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
