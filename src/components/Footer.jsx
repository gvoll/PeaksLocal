import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 720px) {
          .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-contact-col { align-items: center !important; }
          .footer-links-col { align-items: center !important; }
        }
        .footer-link:hover { color: var(--white) !important; }
        .footer-contact-link:hover { color: var(--green-hi) !important; }
      `}</style>
      <footer style={{
        background: 'var(--navy)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '56px 0 32px',
      }}>
        <div className="container">
          <div className="footer-grid" style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

            {/* Col 1 — Brand */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                <img
                  src="/logopeaks.png"
                  alt="PeaksLocal"
                  style={{ height: '80px', width: 'auto', objectFit: 'contain' }}
                />
                <div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    color: 'var(--white)',
                    letterSpacing: '0.06em',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'baseline',
                  }}>
                    <span style={{ fontSize: '1.7rem' }}>P</span>EAKS<span style={{ fontSize: '1.7rem' }}>L</span>OCAL
                  </div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.7rem',
                    color: 'var(--green-hi)',
                    letterSpacing: '0.1em',
                    marginTop: '3px',
                  }}>
                    Be Seen on Search, Maps + AI.
                  </div>
                </div>
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.82rem',
                color: 'var(--slate)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '220px',
              }}>
                Local visibility consulting for businesses that want to dominate search, maps, and AI platforms.
              </p>
            </div>

            {/* Col 2 — Contact */}
            <div className="footer-contact-col" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.78rem',
                color: 'var(--white)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                Contact
              </div>
              <a
                href="mailto:contact@peakslocal.com"
                className="footer-contact-link"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.88rem',
                  color: 'var(--slate)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: 'var(--green-hi)', fontSize: '0.8rem' }}>✉</span>
                contact@peakslocal.com
              </a>
              <a
                href="tel:7204413167"
                className="footer-contact-link"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.88rem',
                  color: 'var(--slate)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: 'var(--green-hi)', fontSize: '0.8rem' }}>✆</span>
                720.441.3167
              </a>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem',
                color: 'rgba(138,160,184,0.55)',
                margin: 0,
              }}>
                Call or text anytime
              </p>
            </div>

            {/* Col 3 — Links */}
            <div className="footer-links-col" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.78rem',
                color: 'var(--white)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                Quick Links
              </div>
              <Link
                to="/audit"
                className="footer-link"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.88rem',
                  color: 'var(--slate)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Free Visibility Audit
              </Link>
              <Link
                to="/privacy"
                className="footer-link"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.88rem',
                  color: 'var(--slate)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Privacy Policy
              </Link>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem',
                color: 'rgba(138,160,184,0.55)',
                margin: 0,
              }}>
                Denver, Colorado
              </p>
            </div>

          </div>

          {/* Bottom bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem',
              color: 'rgba(138,160,184,0.45)',
              margin: 0,
            }}>
              © 2026 PeaksLocal · Denver, Colorado
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem',
              color: 'rgba(138,160,184,0.45)',
              margin: 0,
              textAlign: 'right',
            }}>
              PeaksLocal is an independent local visibility consultancy. Google, Apple, Bing, and all platform names are trademarks of their respective owners.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
