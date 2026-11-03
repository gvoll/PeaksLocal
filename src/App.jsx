import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
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
  }, [pathname, hash]);
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
