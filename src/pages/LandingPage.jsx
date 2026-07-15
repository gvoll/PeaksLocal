import React, { useEffect } from 'react';
import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import PlatformStrip from '../components/PlatformStrip.jsx';
import Problem from '../components/Problem.jsx';
import Pipeline from '../components/Pipeline.jsx';
import System from '../components/System.jsx';
import WhoWeHelp, { PartnerSection } from '../components/WhoWeHelp.jsx';
import AuditForm from '../components/AuditForm.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';

export default function LandingPage() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 150);
    }
  }, []);

  return (
    <>
      <SEO canonical="/" />
      <Nav />
      <main>
        <Hero />
        <PlatformStrip />
        <Problem />
        <Pipeline />
        <System />
        <WhoWeHelp />
        <PartnerSection />
        <AuditForm />
      </main>
      <Footer />
    </>
  );
}
