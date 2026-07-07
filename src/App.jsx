import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import AuditPage from './pages/AuditPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import ReviewFunnelsPage from './pages/ReviewFunnelsPage.jsx';
import PartnersPage from './pages/PartnersPage.jsx';
import { trackPageView } from './lib/analytics.js';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
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
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
    </>
  );
}
