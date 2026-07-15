import React, { useState, useEffect, useRef } from 'react';
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
    fontFamily: "'Ysabeau SC', sans-serif",
    fontWeight: 700,
    fontSize: '1.4rem',
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
  const [whoOpen, setWhoOpen] = useState(false);
  const [mobileWhoOpen, setMobileWhoOpen] = useState(false);
  const [systemOpen, setSystemOpen] = useState(false);
  const [mobileSystemOpen, setMobileSystemOpen] = useState(false);
  const whoRef = useRef(null);
  const systemRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleClickOutside = (e) => {
      if (whoRef.current && !whoRef.current.contains(e.target)) setWhoOpen(false);
      if (systemRef.current && !systemRef.current.contains(e.target)) setSystemOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    { label: 'Local Search', id: 'pipeline' },
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
        .nav-dropdown {
          position: relative;
        }
        .nav-dropdown-menu {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--navy);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 6px;
          min-width: 160px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          z-index: 200;
        }
        .nav-dropdown-item {
          display: block;
          width: 100%;
          padding: 9px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--slate);
          background: none;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          text-align: left;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .nav-dropdown-item:hover { background: rgba(255,255,255,0.06); color: var(--white); }
        .nav-dropdown-chevron {
          display: inline-block;
          margin-left: 4px;
          font-size: 0.65rem;
          transition: transform 0.2s;
          vertical-align: middle;
        }
      `}</style>
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.inner}>
          {/* Brand */}
          <a href="/" style={styles.brand}>
            <img src="/peaks-local-without-tagline.png" alt="PeaksLocal logo" style={styles.logoImg} />
            <div style={styles.brandText}>
              <span style={styles.wordmark}>PeaksLocal</span>
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

            {/* PeaksLocal System dropdown */}
            <div className="nav-dropdown" ref={systemRef}>
              <button
                className="nav-link-item"
                style={{ ...styles.link, display: 'flex', alignItems: 'center' }}
                onClick={() => setSystemOpen(!systemOpen)}
              >
                PeaksLocal System
                <span className="nav-dropdown-chevron" style={{ transform: systemOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
              </button>
              {systemOpen && (
                <div className="nav-dropdown-menu">
                  <button
                    className="nav-dropdown-item"
                    onClick={() => { setSystemOpen(false); scrollTo('system'); }}
                  >
                    Our Process
                  </button>
                  <button
                    className="nav-dropdown-item"
                    onClick={() => { setSystemOpen(false); scrollTo('services'); }}
                  >
                    Service Options
                  </button>
                  <Link
                    to="/review-funnels"
                    className="nav-dropdown-item"
                    onClick={() => setSystemOpen(false)}
                  >
                    Review Funnels
                  </Link>
                </div>
              )}
            </div>

            {/* Who We Help dropdown */}
            <div
              className="nav-dropdown"
              ref={whoRef}
            >
              <button
                className="nav-link-item"
                style={{ ...styles.link, display: 'flex', alignItems: 'center' }}
                onClick={() => setWhoOpen(!whoOpen)}
              >
                Who We Help
                <span className="nav-dropdown-chevron" style={{ transform: whoOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
              </button>
              {whoOpen && (
                <div className="nav-dropdown-menu">
                  <button
                    className="nav-dropdown-item"
                    onClick={() => { setWhoOpen(false); scrollTo('who'); }}
                  >
                    Clients
                  </button>
                  <Link
                    to="/partners"
                    className="nav-dropdown-item"
                    onClick={() => setWhoOpen(false)}
                  >
                    Partners
                  </Link>
                </div>
              )}
            </div>

            <Link to="/blog" className="nav-link-item" style={styles.link}>
              Blog
            </Link>
            <Link to="/about" className="nav-link-item" style={styles.link}>
              About
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
            {/* PeaksLocal System mobile */}
            <button
              style={{ ...styles.mobileLink, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
              onClick={() => setMobileSystemOpen(!mobileSystemOpen)}
            >
              PeaksLocal System
              <span style={{ fontSize: '0.7rem', color: 'var(--slate)', transition: 'transform 0.2s', display: 'inline-block', transform: mobileSystemOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
            </button>
            {mobileSystemOpen && (
              <>
                <button
                  style={{ ...styles.mobileLink, paddingLeft: '20px', fontSize: '0.88rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onClick={() => { setMobileOpen(false); setMobileSystemOpen(false); scrollTo('system'); }}
                >
                  Our Process
                </button>
                <button
                  style={{ ...styles.mobileLink, paddingLeft: '20px', fontSize: '0.88rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onClick={() => { setMobileOpen(false); setMobileSystemOpen(false); scrollTo('services'); }}
                >
                  Service Options
                </button>
                <Link
                  to="/review-funnels"
                  style={{ ...styles.mobileLink, paddingLeft: '20px', fontSize: '0.88rem', textDecoration: 'none', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onClick={() => { setMobileOpen(false); setMobileSystemOpen(false); }}
                >
                  Review Funnels
                </Link>
              </>
            )}

            {/* Who We Help mobile */}
            <button
              style={{ ...styles.mobileLink, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
              onClick={() => setMobileWhoOpen(!mobileWhoOpen)}
            >
              Who We Help
              <span style={{ fontSize: '0.7rem', color: 'var(--slate)', transition: 'transform 0.2s', display: 'inline-block', transform: mobileWhoOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
            </button>
            {mobileWhoOpen && (
              <>
                <button
                  style={{ ...styles.mobileLink, paddingLeft: '20px', fontSize: '0.88rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onClick={() => { setMobileOpen(false); setMobileWhoOpen(false); scrollTo('who'); }}
                >
                  Clients
                </button>
                <Link
                  to="/partners"
                  style={{ ...styles.mobileLink, paddingLeft: '20px', fontSize: '0.88rem', textDecoration: 'none', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onClick={() => { setMobileOpen(false); setMobileWhoOpen(false); }}
                >
                  Partners
                </Link>
              </>
            )}

            <Link
              to="/blog"
              style={{ ...styles.mobileLink, textDecoration: 'none' }}
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              style={{ ...styles.mobileLink, textDecoration: 'none' }}
              onClick={() => setMobileOpen(false)}
            >
              About
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
