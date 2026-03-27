import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const initialForm = {
  name: '',
  business: '',
  email: '',
  website: '',
  challenge: '',
};

export default function ContactForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          business: form.business,
          reply_to: form.email,
          website: form.website,
          challenge: form.challenge || 'Not provided',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .contact-form-card {
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 16px;
          padding: 40px 40px;
          box-shadow: 0 8px 40px rgba(15,36,64,0.1);
        }
        .contact-input {
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
          box-sizing: border-box;
        }
        .contact-input:focus {
          border-color: var(--green-hi);
          box-shadow: 0 0 0 3px rgba(58,173,100,0.12);
        }
        .contact-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 6px;
          display: block;
        }
        .contact-label .optional {
          color: var(--slate);
          font-weight: 400;
          font-size: 0.78rem;
          margin-left: 4px;
        }
        .contact-info-card {
          background: var(--navy);
          border-radius: 14px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .contact-info-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .contact-info-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(58,173,100,0.2);
          border: 1px solid rgba(58,173,100,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-info-link {
          color: var(--slate);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          transition: color 0.2s;
        }
        .contact-info-link:hover { color: var(--white); }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 32px;
          align-items: start;
        }
        .contact-trust-row:last-child { border-bottom: none !important; }
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr; }
          .contact-form-card { padding: 28px 20px !important; }
          .contact-name-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        style={{ background: 'var(--ash)', padding: '100px 0' }}
      >
        <div className="container">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-eyebrow reveal" style={{ color: 'var(--green)', justifyContent: 'center' }}>
              GET IN TOUCH
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
              Let's Talk About Your Online Visibility
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
Questions about how PeaksLocal services can enhance your online visibility? Please reach out and we'll respond promptly - Thank You!            </p>
          </div>

          {/* Grid */}
          <div className="contact-grid reveal reveal-delay-1" style={{ maxWidth: '960px', margin: '0 auto' }}>

            {/* Left — Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="contact-info-card">
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'var(--slate)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Direct Contact
                </div>

                {/* Email */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3aad64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.75rem', color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                      Email
                    </div>
                    <a href="mailto:contact@peakslocal.com" className="contact-info-link">
                      contact@peakslocal.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3aad64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.4 2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.88-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.75rem', color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                      Call or Text
                    </div>
                    <a href="tel:+17204413167" className="contact-info-link">
                      720.441.3167
                    </a>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'rgba(138,160,184,0.7)', lineHeight: 1.65 }}>
                    Based in Denver, Colorado — serving local businesses across the U.S.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Audit form (same fields) */}
            <div className="contact-form-card">
              {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="contact-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label className="contact-label" htmlFor="c-name">Your name</label>
                      <input
                        className="contact-input"
                        id="c-name"
                        name="name"
                        type="text"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="contact-label" htmlFor="c-business">Business name</label>
                      <input
                        className="contact-input"
                        id="c-business"
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
                    <label className="contact-label" htmlFor="c-email">Email address</label>
                    <input
                      className="contact-input"
                      id="c-email"
                      name="email"
                      type="email"
                      placeholder="jane@acmeplumbing.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="contact-label" htmlFor="c-website">Business website or location</label>
                    <input
                      className="contact-input"
                      id="c-website"
                      name="website"
                      type="text"
                      placeholder="acmeplumbing.com or Denver, CO"
                      value={form.website}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="contact-label" htmlFor="c-challenge">
                      What's your biggest visibility challenge?
                      <span className="optional">(optional)</span>
                    </label>
                    <textarea
                      className="contact-input"
                      id="c-challenge"
                      name="challenge"
                      placeholder="What's your biggest visibility challenge? (optional — helps us tailor your audit)"
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

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {['Free audit', 'No contracts', 'Prompt Response'].map((t) => (
                      <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'var(--slate)' }}>
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
                    color: 'var(--green-hi)',
                  }}>
                    ✓
                  </div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '12px' }}>
                    We'll Be in Touch Soon
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.7, maxWidth: '380px', margin: '0 auto 24px' }}>
                    Your request has been received. We'll have your Local Visibility Score ready within 24 hours.
                  </p>
                  <button
                    style={{ background: 'none', border: 'none', color: 'var(--green)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => { setSubmitted(false); setForm(initialForm); }}
                  >
                    Submit another request
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
