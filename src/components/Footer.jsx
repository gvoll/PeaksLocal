import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr; text-align: center; }
          .footer-right-col { align-items: center !important; }
          .footer-logo { margin: 0 auto; }
        }
        .footer-link:hover { color: var(--white) !important; }
      `}</style>
      <footer style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 0 0' }}>
        <div className="container">
          <div className="footer-grid" style={{ paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

            {/* Col 1 — Logo */}
            <div>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <img src="/peaks-local-without-tagline.png" alt="PeaksLocal" className="footer-logo" style={{ height: '80px', width: 'auto', objectFit: 'contain', display: 'block' }} />
              </Link>
            </div>

            {/* Col 2 — Tagline + service area + phone */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'var(--green-hi)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Be Seen on Search, Maps + AI
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--slate)' }}>
                  Serving the Front Range and local businesses nationwide
                </span>
                <a href="tel:+17204413167" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--slate)', textDecoration: 'none', marginTop: '4px' }}>
                  720.441.3167
                </a>
              </div>
            </div>

            {/* Col 3 — Links */}
            <div className="footer-right-col" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
              <Link to="/faq" className="footer-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--slate)', textDecoration: 'none', transition: 'color 0.2s' }}>
                FAQ
              </Link>
              <Link to="/privacy" target="_blank" rel="noreferrer" className="footer-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--slate)', textDecoration: 'none', transition: 'color 0.2s' }}>
                Privacy Policy
              </Link>
              <Link to="/contact" target="_blank" rel="noreferrer" className="footer-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--slate)', textDecoration: 'none', transition: 'color 0.2s' }}>
                Contact
              </Link>
            </div>

          </div>

          {/* Bottom bar — copyright + legal */}
          <div style={{ padding: '20px 0 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(138,160,184,0.7)', margin: '0 0 6px', fontStyle: 'italic' }}>
              © 2026 PeaksLocal · Denver, Colorado
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: 'rgba(138,160,184,0.55)', margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
              PeaksLocal is an independent online identity firm. Google, Apple, Bing, and all platform names are trademarks of their respective owners.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
