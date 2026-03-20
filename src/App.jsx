import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import AuditPage from './pages/AuditPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/audit" element={<AuditPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
