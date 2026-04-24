import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import AuditPage from './pages/AuditPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { trackPageView } from './lib/analytics.js';

export default function App() {
  const location = useLocation();

  React.useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    trackPageView(path);
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/audit" element={<AuditPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
