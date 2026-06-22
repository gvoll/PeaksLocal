import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'rgba(15, 36, 64, 0.96)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    transition: 'box-shadow 0.2s ease',
  },
  navScrolled: {
    boxShadow: '0 2px 24px rgba(0,0,0,0.3)',
  },
  inner: {
    maxWidth: '1140px',
    margin: '0 auto',
    padding: '0 24px',
    height: '68px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    flexShrink: 0,
  },
  logoImg: {
    height: '54px',
    width: 'auto',
    objectFit: 'contain',
    borderRadius: '2px',
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
  },
  wordmark: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: '1.3rem',
    color: 'var(--white)',
    letterSpacing: '0.06em',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'baseline',
  },
  tagline: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.72rem',
    color: 'var(--green-hi)',
    letterSpacing: '0.1em',
    lineHeight: 1,
    fontWeight: 700,
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  link: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 400,
    color: 'var(--slate)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  ctaBtn: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 500,
    color: 'var(--white)',
    background: 'var(--green)',
    border: 'none',
    borderRadius: '5px',
    padding: '9px 18px',
    cursor: 'pointer',
    transition: 'background 0.2s ease, transform 0.15s ease',
    textDecoration: 'none',
    display: 'inline-block',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: '5px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '4px',
  },
  hamburgerLine: {
    width: '22px',
    height: '2px',
    background: 'var(--white)',
    borderRadius: '2px',
    transition: 'opacity 0.2s',
  },
  mobileMenu: {
    background: 'var(--navy)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '16px 24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  mobileLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    color: 'var(--slate)',
    padding: '10px 0',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    width: '100%',
    display: 'block',
  },
  mobileCta: {
    marginTop: '12px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 500,
    color: 'var(--white)',
    background: 'var(--green)',
    border: 'none',
    borderRadius: '5px',
    padding: '12px 18px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center',
  },
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'How It Works', id: 'pipeline' },
    { label: 'Our System', id: 'system' },
    { label: 'About', id: 'about' },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        .nav-link-item:hover { color: var(--white) !important; }
        .nav-cta:hover { background: var(--green-mid) !important; transform: translateY(-1px); }
      `}</style>
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.inner}>
          {/* Brand */}
          <a href="/" style={styles.brand}>
            <img src="/peaks-local-without-tagline.png" alt="PeaksLocal logo" style={styles.logoImg} />
            <div style={styles.brandText}>
              <span style={styles.wordmark}>
                <span style={{ fontSize: '1.45rem' }}>P</span>
                <span style={{ fontSize: '0.95rem' }}>EAKS</span>
                <span style={{ fontSize: '1.45rem' }}>L</span>
                <span style={{ fontSize: '0.95rem' }}>OCAL</span>
              </span>
              <span style={styles.tagline}>Be Seen on Search, Maps + AI</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="nav-links" style={styles.links}>
            {navItems.map((item) => (
              <button
                key={item.id}
                className="nav-link-item"
                style={styles.link}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
            <Link to="/blog" className="nav-link-item" style={styles.link}>
              Blog
            </Link>
            <Link
              to="/audit"
              className="nav-cta"
              style={styles.ctaBtn}
            >
              Free Audit
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            style={{ ...styles.hamburger, display: 'none' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span style={styles.hamburgerLine} />
            <span style={styles.hamburgerLine} />
            <span style={styles.hamburgerLine} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={styles.mobileMenu}>
            {navItems.map((item) => (
              <button
                key={item.id}
                style={styles.mobileLink}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/blog"
              style={{ ...styles.mobileLink, textDecoration: 'none' }}
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/audit"
              style={{ ...styles.mobileCta, textDecoration: 'none', display: 'block', textAlign: 'center' }}
              onClick={() => setMobileOpen(false)}
            >
              Free Audit
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
