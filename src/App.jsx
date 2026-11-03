import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import LandingPage from './pages/LandingPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import AuditPage from './pages/AuditPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';
import DeepDivePage from './pages/DeepDivePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import ReviewFunnelsPage from './pages/ReviewFunnelsPage.jsx';
import PartnersPage from './pages/PartnersPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServePage from './pages/ServePage.jsx';
import ServeCityPage from './pages/ServeCityPage.jsx';
import ServiceLandingPage from './pages/ServiceLandingPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { trackPageView } from './lib/analytics.js';
import { servicePages } from './data/servicePages.js';

// Scroll positions are saved per history entry (location.key) so Back/Forward
// returns to where the visitor left off. New navigations (links) still start
// at the top, or at the #hash target.
const SCROLL_PREFIX = 'pl-scroll:';

function readScrollPosition(key) {
  try {
    const raw = sessionStorage.getItem(SCROLL_PREFIX + key);
    return raw === null ? null : Number(raw);
  } catch {
    return null;
  }
}

function saveScrollPosition(key, y) {
  try {
    sessionStorage.setItem(SCROLL_PREFIX + key, String(Math.round(y)));
  } catch {
    // Storage can be unavailable (private mode); Back then falls back to the top.
  }
}

// Pages can finish growing after the route renders (images, Contentful posts),
// so keep trying for a short while until the page is tall enough.
function restoreScroll(y) {
  let frames = 0;
  const step = () => {
    window.scrollTo({ top: y, left: 0, behavior: 'instant' });
    frames += 1;
    const reached = Math.abs(window.scrollY - y) < 2;
    if (!reached && frames < 60) requestAnimationFrame(step);
  };
  step();
}

// useLayoutEffect warns during server rendering (the prerender step), so fall
// back to useEffect there. In the browser the layout effect matters: it runs
// before the scroll event that a route swap triggers, so that event is saved
// under the right history entry.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();
  const keyRef = useRef(`${key}|${pathname}`);
  const prevRef = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    const onScroll = () => saveScrollPosition(keyRef.current, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useIsoLayoutEffect(() => {
    // The first entry of a page load always has the key 'default', so include
    // the path to keep different URLs loaded in one tab from sharing a position.
    const storeKey = `${key}|${pathname}`;
    keyRef.current = storeKey;
    const prev = prevRef.current;
    const urlChanged = !prev || prev.pathname !== pathname || prev.hash !== hash;
    prevRef.current = { pathname, hash };

    if (navType === 'POP') {
      const saved = readScrollPosition(storeKey);
      if (saved !== null && !Number.isNaN(saved)) {
        restoreScroll(saved);
        return undefined;
      }
    }
    // Same-URL entries pushed by Find My Path must not jump to the top.
    if (!urlChanged) return undefined;

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }
    // The homepage handles its own hash scrolling (LandingPage); other pages
    // (e.g. /services#diy from Find My Path) are handled here.
    if (pathname === '/') return undefined;
    const timer = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname, hash, key, navType]);
  return null;
}

export default function App() {
  const location = useLocation();

  React.useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    trackPageView(path);
  }, [location.pathname, location.search]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog-preview/:id" element={<BlogPost />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/review-funnels" element={<ReviewFunnelsPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/deep-dive" element={<DeepDivePage />} />
        <Route path="/serve" element={<ServePage />} />
        <Route path="/serve/:city" element={<ServeCityPage />} />
        {servicePages.map((p) => (
          <Route key={p.slug} path={`/${p.slug}`} element={<ServiceLandingPage slug={p.slug} />} />
        ))}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
    </>
  );
}
