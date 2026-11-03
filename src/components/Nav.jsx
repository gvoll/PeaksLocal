import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trackEvent } from '../lib/analytics.js';

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
  getStartedLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 600,
    color: 'var(--green-hi)',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    transition: 'color 0.2s ease',
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
};

// Raw CSS, injected via dangerouslySetInnerHTML rather than as a JSX text
// child. <style> content is HTML "raw text" — browsers never decode entities
// inside it — but React's normal text-child serialization HTML-escapes
// apostrophes (e.g. 'DM Sans' -> &#x27;DM Sans&#x27;). As a JSX text child that
// mismatch shipped broken font-family CSS in prerendered HTML and produced a
// SSR/client hydration mismatch on every page (Nav renders on all of them).
const navDropdownStyles = `
  .nav-fmp-mobile { display: none; }
  @media (max-width: 768px) {
    .nav-links { display: none !important; }
    .nav-hamburger { display: flex !important; }
    .nav-divider { display: none !important; }
    .nav-fmp-mobile { display: inline-block !important; font-size: 0.78rem !important; white-space: nowrap; }
    .nav-cta-persistent { padding: 7px 10px !important; font-size: 0.78rem !important; white-space: nowrap; }
    .nav-inner { padding: 0 16px !important; gap: 10px !important; }
    .nav-brand { flex-shrink: 1 !important; min-width: 0; overflow: hidden; gap: 8px !important; }
    .nav-brand img { height: 48px !important; }
    .nav-wordmark { font-size: 1.1rem !important; }
    .nav-tagline { font-size: 0.6rem !important; letter-spacing: 0.04em !important; white-space: nowrap; }
    .nav-right { gap: 12px !important; flex-shrink: 0; }
  }
  @media (max-width: 560px) {
    .nav-brand-text { display: none !important; }
  }
  .nav-divider {
    display: inline-block;
    width: 1px;
    height: 22px;
    background: rgba(255,255,255,0.14);
    flex-shrink: 0;
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
  .nav-dropdown-menu::before {
    content: '';
    position: absolute;
    top: -14px;
    left: 0;
    right: 0;
    height: 14px;
  }
  .nav-dropdown-trigger {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .nav-dropdown-toggle {
    background: none;
    border: none;
    padding: 4px 2px;
    cursor: pointer;
    color: var(--slate);
    line-height: 1;
  }
  .nav-dropdown-toggle:hover { color: var(--white); }
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
  .nav-pulse {
    position: relative;
  }
  .nav-pulse::after {
    content: '';
    position: absolute;
    inset: -6px -10px;
    border-radius: 12px;
    border: 1.5px solid var(--green-hi);
    opacity: 0;
    animation: navGetStartedPulse 1.8s ease-out 3;
    pointer-events: none;
  }
  @keyframes navGetStartedPulse {
    0% { transform: scale(1); opacity: 0.55; }
    100% { transform: scale(1.3); opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .nav-pulse::after { animation: none; }
  }
  .nav-get-started:hover { color: var(--white) !important; }
`;

// Menu config. A menu with `to` has a clickable label that links to a real
// page (hover/chevron opens the submenu); a menu without it is a toggle only.
// Items are either a route (`to`) or a homepage section scroll (`scroll`).
const MENUS = [
  {
    id: 'services',
    label: 'Our Services',
    to: '/services',
    items: [
      { label: 'Identity Build and Management', to: '/services' },
      { label: 'Review Funnels', to: '/review-funnels' },
      { label: 'Visibility Deep-Dive', to: '/deep-dive' },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    items: [
      { label: 'How Local Search Works', to: '/how-it-works' },
      { label: 'Blog', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    id: 'about',
    label: 'About',
    to: '/about',
    items: [
      { label: 'Our Story', to: '/about' },
      { label: 'Who We Help', scroll: 'who' },
      { label: 'Partners', to: '/partners' },
    ],
  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);
  const menuRefs = useRef({});
  const openMenuRef = useRef(null);
  openMenuRef.current = openMenu;
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleClickOutside = (e) => {
      const el = openMenuRef.current && menuRefs.current[openMenuRef.current];
      if (el && !el.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener('mousedown', handleClickOutside);

    const handleKey = (e) => { if (e.key === 'Escape') setOpenMenu(null); };
    document.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const hoverCapable = () =>
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover)').matches;

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

  const handleGetStarted = () => {
    trackEvent('entry_point_nav_click');
    setMobileOpen(false);
    scrollTo('audience-nav');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: navDropdownStyles }} />
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div className="nav-inner" style={styles.inner}>
          {/* Brand */}
          <a href="/" className="nav-brand" style={styles.brand} aria-label="PeaksLocal home">
            <picture>
              <source type="image/webp" srcSet="/peaks-local-without-tagline.webp" />
              <img
                src="/peaks-local-without-tagline.png"
                width="241"
                height="200"
                alt="PeaksLocal logo"
                style={styles.logoImg}
              />
            </picture>
            <div className="nav-brand-text" style={styles.brandText}>
              <span className="nav-wordmark" style={styles.wordmark}>PeaksLocal</span>
              <span className="nav-tagline" style={styles.tagline}>Be Seen on Search, Maps + AI</span>
            </div>
          </a>

          {/* Right side: nav links (desktop only), divider, persistent CTA, hamburger (mobile only) */}
          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="nav-links" style={styles.links}>
              <button
                className="nav-pulse nav-get-started"
                style={styles.getStartedLink}
                onClick={handleGetStarted}
              >
                Find My Path
              </button>

              {MENUS.map((menu) => (
                <div
                  key={menu.id}
                  className="nav-dropdown"
                  ref={(el) => { menuRefs.current[menu.id] = el; }}
                  onMouseEnter={() => { if (hoverCapable()) setOpenMenu(menu.id); }}
                  onMouseLeave={() => { if (hoverCapable()) setOpenMenu(null); }}
                >
                  <div className="nav-dropdown-trigger">
                    {menu.to ? (
                      <Link
                        to={menu.to}
                        className="nav-link-item"
                        style={styles.link}
                        onClick={() => setOpenMenu(null)}
                      >
                        {menu.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="nav-link-item"
                        style={styles.link}
                        aria-expanded={openMenu === menu.id}
                        aria-haspopup="true"
                        onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                      >
                        {menu.label}
                      </button>
                    )}
                    <button
                      type="button"
                      className="nav-dropdown-toggle"
                      aria-label={`${menu.label} menu`}
                      aria-expanded={openMenu === menu.id}
                      aria-haspopup="true"
                      onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                    >
                      <span className="nav-dropdown-chevron" style={{ transform: openMenu === menu.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                    </button>
                  </div>
                  {openMenu === menu.id && (
                    <div className="nav-dropdown-menu">
                      {menu.items.map((item) =>
                        item.to ? (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="nav-dropdown-item"
                            onClick={() => setOpenMenu(null)}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            key={item.label}
                            type="button"
                            className="nav-dropdown-item"
                            onClick={() => { setOpenMenu(null); scrollTo(item.scroll); }}
                          >
                            {item.label}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              className="nav-pulse nav-get-started nav-fmp-mobile"
              style={styles.getStartedLink}
              onClick={handleGetStarted}
            >
              Find My Path
            </button>

            <span className="nav-divider" />

            <Link
              to="/audit"
              className="nav-cta nav-cta-persistent"
              style={styles.ctaBtn}
            >
              Free Audit
            </Link>

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
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={styles.mobileMenu}>
            {MENUS.map((menu) => (
              <React.Fragment key={menu.id}>
                <button
                  style={{ ...styles.mobileLink, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                  aria-expanded={mobileMenu === menu.id}
                  onClick={() => setMobileMenu(mobileMenu === menu.id ? null : menu.id)}
                >
                  {menu.label}
                  <span style={{ fontSize: '0.7rem', color: 'var(--slate)', transition: 'transform 0.2s', display: 'inline-block', transform: mobileMenu === menu.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                </button>
                {mobileMenu === menu.id && (
                  <>
                    {menu.to && (
                      <Link
                        to={menu.to}
                        style={{ ...styles.mobileLink, paddingLeft: '20px', fontSize: '0.88rem', textDecoration: 'none', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--white)' }}
                        onClick={() => { setMobileOpen(false); setMobileMenu(null); }}
                      >
                        {menu.id === 'services' ? 'Services overview' : (menu.items.find((i) => i.to === menu.to) || menu).label}
                      </Link>
                    )}
                    {menu.items.filter((item) => !(menu.to && item.to === menu.to)).map((item) =>
                      item.to ? (
                        <Link
                          key={item.label}
                          to={item.to}
                          style={{ ...styles.mobileLink, paddingLeft: '20px', fontSize: '0.88rem', textDecoration: 'none', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                          onClick={() => { setMobileOpen(false); setMobileMenu(null); }}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          key={item.label}
                          style={{ ...styles.mobileLink, paddingLeft: '20px', fontSize: '0.88rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                          onClick={() => { setMobileOpen(false); setMobileMenu(null); scrollTo(item.scroll); }}
                        >
                          {item.label}
                        </button>
                      )
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
