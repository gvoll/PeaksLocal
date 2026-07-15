import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--slate)', textDecoration: 'none', transition: 'color 0.2s' };

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          gap: 0;
          align-items: center;
        }
        .footer-divider {
          width: 1px;
          height: 60px;
          background: rgba(255,255,255,0.1);
          margin: 0 32px;
        }
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr; text-align: center; gap: 24px; }
          .footer-divider { display: none; }
          .footer-links-left { align-items: center !important; }
          .footer-links-right { align-items: center !important; }
          .footer-logo { margin: 0 auto; }
        }
        .footer-link:hover { color: var(--white) !important; }
      `}</style>
      <footer style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 0 0' }}>
        <div className="container">
          <div className="footer-grid" style={{ paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

            {/* Col 1 — Left links */}
            <div className="footer-links-left" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <Link to="/reviews" className="footer-link" style={linkStyle}>Leave a Review</Link>
              <Link to="/partners" className="footer-link" style={linkStyle}>Interested in Partnering?</Link>
              <Link to="/faq" className="footer-link" style={linkStyle}>FAQ</Link>
              <Link to="/serve" className="footer-link" style={linkStyle}>Areas We Serve</Link>
            </div>

            {/* Divider */}
            <div className="footer-divider" />

            {/* Col 2 — Logo + tagline + service area */}
            <div style={{ textAlign: 'center' }}>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <img src="/peaks-local-without-tagline.png" alt="PeaksLocal" className="footer-logo" style={{ height: '70px', width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto 12px' }} />
              </Link>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'var(--green-hi)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Be Seen on Search, Maps + AI
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'var(--slate)' }}>
                  Serving Denver,{' '}
                  <Link to="/serve" className="footer-link" style={{ color: 'var(--slate)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                    the Front Range
                  </Link>
                  , and Local Businesses Nationwide
                </span>
                <a href="tel:+17204413167" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'var(--slate)', textDecoration: 'none', marginTop: '2px' }}>
                  720.441.3167
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="footer-divider" />

            {/* Col 3 — Right links */}
            <div className="footer-links-right" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
              <Link to="/about" className="footer-link" style={linkStyle}>About</Link>
              <Link to="/privacy" target="_blank" rel="noreferrer" className="footer-link" style={linkStyle}>Privacy Policy</Link>
              <Link to="/contact" target="_blank" rel="noreferrer" className="footer-link" style={linkStyle}>Contact</Link>
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
