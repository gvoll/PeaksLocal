import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToAudit = () => {
    const el = document.getElementById('audit');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      background: 'var(--navy)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '48px 0 32px',
    }}>
      <div className="container">
        {/* Main footer row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '32px',
          marginBottom: '32px',
          paddingBottom: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          {/* Left — brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/logopeaks.png"
              alt="PeaksLocal"
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
            />
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '1.2rem',
              color: 'var(--white)',
              textTransform: 'uppercase',
              fontVariant: 'small-caps',
              letterSpacing: '0.06em',
            }}>
              PeaksLocal
            </span>
          </div>

          {/* Center — tagline + copyright */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.75rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.08em',
              marginBottom: '6px',
            }}>
              Be Seen on Search, Maps + AI.
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.78rem',
              color: 'var(--slate)',
            }}>
              © 2026 PeaksLocal · Denver, Colorado
            </div>
          </div>

          {/* Right — links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link
              to="/privacy"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                color: 'var(--slate)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--white)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--slate)'}
            >
              Privacy Policy
            </Link>
            <button
              onClick={scrollToAudit}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                color: 'var(--slate)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--white)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--slate)'}
            >
              Contact
            </button>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.72rem',
          color: 'rgba(138,160,184,0.5)',
          textAlign: 'center',
          lineHeight: 1.6,
        }}>
          PeaksLocal is an independent local visibility consultancy. Google, Apple, Bing, and all other platform names are trademarks of their respective owners.
        </p>
      </div>
    </footer>
  );
}
