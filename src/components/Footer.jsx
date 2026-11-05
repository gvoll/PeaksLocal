import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'var(--slate)', textDecoration: 'none', transition: 'color 0.2s' };

// Raw CSS, injected via dangerouslySetInnerHTML rather than as a JSX text
// child. <style> content is HTML "raw text" -- browsers never decode entities
// inside it -- but React's normal text-child serialization HTML-escapes
// quotes/apostrophes (e.g. 'DM Sans' -> &#x27;DM Sans&#x27;), which broke
// prerendered CSS and caused an SSR/client hydration mismatch wherever this
// component renders.
const footerStyles = `
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
`;

export default function Footer() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: footerStyles }} />
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
                <picture>
                  <source type="image/webp" srcSet="/peaks-local-without-tagline.webp" />
                  <img
                    src="/peaks-local-without-tagline.png"
                    width="241"
                    height="200"
                    alt="PeaksLocal logo"
                    className="footer-logo"
                    loading="lazy"
                    style={{ height: '70px', width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto 12px' }}
                  />
                </picture>
              </Link>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'var(--green-hi)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Be Seen on Search, Maps + AI
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'var(--slate)' }}>
                  Based in Denver, CO · serving{' '}
                  <Link to="/serve" className="footer-link" style={{ color: 'var(--slate)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                    the Front Range
                  </Link>
                  {' '}and local businesses nationwide
                </span>
                <a href="tel:+17204413167" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'var(--slate)', textDecoration: 'none', marginTop: '2px' }}>
                  720.441.3167
                </a>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'var(--slate)', marginTop: '2px' }}>
                  Mon–Fri, 7am–6pm · Closed Sat &amp; Sun
                </span>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '10px' }}>
                  <a
                    href="https://www.linkedin.com/company/peakslocal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PeaksLocal on LinkedIn"
                    title="PeaksLocal on LinkedIn"
                    className="footer-link"
                    style={{ ...linkStyle, display: 'inline-flex' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/PeaksLocal"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PeaksLocal on Facebook"
                    title="PeaksLocal on Facebook"
                    className="footer-link"
                    style={{ ...linkStyle, display: 'inline-flex' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/peakslocal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PeaksLocal on Instagram"
                    title="PeaksLocal on Instagram"
                    className="footer-link"
                    style={{ ...linkStyle, display: 'inline-flex' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="footer-divider" />

            {/* Col 3 — Right links */}
            <div className="footer-links-right" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
              <Link to="/about" className="footer-link" style={linkStyle}>About</Link>
              <Link to="/services" className="footer-link" style={linkStyle}>Services</Link>
              <Link to="/how-it-works" className="footer-link" style={linkStyle}>How It Works</Link>
              <Link to="/privacy" target="_blank" rel="noreferrer" className="footer-link" style={linkStyle}>Privacy Policy</Link>
              <Link to="/contact" target="_blank" rel="noreferrer" className="footer-link" style={linkStyle}>Contact</Link>
            </div>

          </div>

          {/* Service links: sitewide internal links to the keyword-targeted Denver service pages */}
          <nav aria-label="Denver services" style={{ padding: '20px 0 0', textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 24px' }}>
            <Link to="/local-seo-denver" className="footer-link" style={linkStyle}>Local SEO Denver</Link>
            <Link to="/google-business-profile-management-denver" className="footer-link" style={linkStyle}>Google Business Profile Management</Link>
            <Link to="/ai-search-optimization-denver" className="footer-link" style={linkStyle}>AI Search Optimization</Link>
          </nav>

          {/* Bottom bar — copyright + legal */}
          <div style={{ padding: '20px 0 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--slate)', margin: '0 0 6px', fontStyle: 'italic' }}>
              © 2026 PeaksLocal · Denver, Colorado
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: 'var(--slate)', margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
              PeaksLocal is an independent online identity firm. Google, Apple, Bing, and all platform names are trademarks of their respective owners.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
